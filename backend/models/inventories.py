"""
Consolidated inventory models with atomic stock operations
Includes: WarehouseLocation, Inventory, StockAdjustment, InventoryReservation
"""
from sqlalchemy import Column, String, Integer, ForeignKey, Text, DateTime, Boolean, Index, select, update
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from core.database import BaseModel, CHAR_LENGTH, GUID
from datetime import datetime, timedelta
from typing import Dict, Any, Optional, List
from uuid import UUID as UUIDType
import logging

logger = logging.getLogger(__name__)


class WarehouseLocation(BaseModel):
    """Warehouse locations for inventory management"""
    __tablename__ = "warehouse_locations"
    __table_args__ = (
        # Indexes for search and performance
        Index('idx_warehouse_locations_name', 'name'),
        {'extend_existing': True}
    )

    name = Column(String(CHAR_LENGTH), nullable=False)
    address = Column(String(CHAR_LENGTH), nullable=True)
    description = Column(Text, nullable=True)

    inventories = relationship("Inventory", back_populates="location")


class Inventory(BaseModel):
    """Product variant inventory tracking with atomic operations"""
    __tablename__ = "inventory"
    __table_args__ = (
        # Optimized indexes for atomic operations
        Index('idx_inventory_variant_id', 'variant_id'),
        Index('idx_inventory_location_id', 'location_id'),
        Index('idx_inventory_quantity_available', 'quantity_available'),
        Index('idx_inventory_quantity_reserved', 'quantity_reserved'),
        Index('idx_inventory_low_stock', 'low_stock_threshold'),
        Index('idx_inventory_status', 'inventory_status'),
        # Composite indexes for common atomic queries
        Index('idx_inventory_variant_status', 'variant_id', 'inventory_status'),
        Index('idx_inventory_location_quantity', 'location_id', 'quantity_available'),
        {'extend_existing': True}
    )

    variant_id = Column(GUID(), ForeignKey("product_variants.id"), nullable=False, unique=True)
    location_id = Column(GUID(), ForeignKey("warehouse_locations.id"), nullable=False)
    
    # Atomic stock tracking fields
    quantity_available = Column(Integer, default=0, nullable=False)  # Available for sale
    quantity_reserved = Column(Integer, default=0, nullable=False)   # Reserved for orders
    quantity_committed = Column(Integer, default=0, nullable=False)  # Committed to orders
    
    # Thresholds
    low_stock_threshold = Column(Integer, default=10, nullable=False)
    reorder_point = Column(Integer, default=5, nullable=False)
    
    # Status tracking
    inventory_status = Column(String(50), default="active", nullable=False)
    
    # Timestamps for tracking
    last_restocked_at = Column(DateTime(timezone=True), nullable=True)
    last_sold_at = Column(DateTime(timezone=True), nullable=True)
    
    # Optimistic locking for atomic operations
    version = Column(Integer, default=1, nullable=False)
    
    # Legacy field for backward compatibility
    quantity = Column(Integer, default=0, nullable=False)

    # Relationships
    variant = relationship("ProductVariant", back_populates="inventory")
    location = relationship("WarehouseLocation", back_populates="inventories")
    adjustments = relationship("StockAdjustment", back_populates="inventory", cascade="all, delete-orphan")
    reservations = relationship("InventoryReservation", back_populates="inventory", cascade="all, delete-orphan")

    @classmethod
    async def get_with_lock(cls, db: AsyncSession, variant_id: UUIDType) -> Optional['Inventory']:
        """
        Get inventory record with SELECT ... FOR UPDATE lock
        Prevents concurrent modifications during stock operations
        """
        try:
            query = select(cls).where(cls.variant_id == variant_id).with_for_update()
            result = await db.execute(query)
            return result.scalar_one_or_none()
        except Exception as e:
            logger.error(f"Error getting inventory with lock for variant {variant_id}: {e}")
            raise

    @classmethod
    async def get_multiple_with_lock(cls, db: AsyncSession, variant_ids: List[UUIDType]) -> List['Inventory']:
        """
        Get multiple inventory records with locks in consistent order
        Orders by variant_id to prevent deadlocks
        """
        try:
            query = select(cls).where(
                cls.variant_id.in_(variant_ids)
            ).order_by(cls.variant_id).with_for_update()
            
            result = await db.execute(query)
            return result.scalars().all()
        except Exception as e:
            logger.error(f"Error getting multiple inventories with lock: {e}")
            raise

    async def atomic_update_stock(
        self, 
        db: AsyncSession,
        quantity_change: int, 
        reason: str,
        user_id: Optional[UUIDType] = None,
        notes: Optional[str] = None
    ) -> 'StockAdjustment':
        """
        Atomically update stock with proper validation and audit trail
        Must be called within a transaction with the inventory already locked
        
        Args:
            db: Database session
            quantity_change: Positive for increase, negative for decrease
            reason: Reason for stock change
            user_id: User making the change
            notes: Additional notes
        
        Returns:
            Created StockAdjustment record
        """
        # Calculate new quantities
        new_available = self.quantity_available + quantity_change
        
        # Validate stock levels
        if new_available < 0:
            from core.exceptions import APIException
            raise APIException(
                status_code=400,
                message=f"Insufficient stock. Available: {self.quantity_available}, Requested: {abs(quantity_change)}"
            )
        
        # Update inventory atomically
        old_quantity = self.quantity_available
        self.quantity_available = new_available
        self.quantity = new_available  # Update legacy field
        self.version += 1  # Optimistic locking
        
        # Update timestamps
        if quantity_change < 0:
            self.last_sold_at = datetime.utcnow()
        elif quantity_change > 0:
            self.last_restocked_at = datetime.utcnow()
        
        # Create audit record
        adjustment = StockAdjustment(
            inventory_id=self.id,
            quantity_change=quantity_change,
            reason=reason,
            adjusted_by_user_id=user_id,
            notes=notes or f"Stock changed from {old_quantity} to {new_available}"
        )
        
        db.add(adjustment)
        
        logger.info(f"Stock updated atomically: variant={self.variant_id}, change={quantity_change}, new_stock={new_available}")
        
        return adjustment

    async def atomic_reserve_stock(
        self, 
        db: AsyncSession,
        quantity: int,
        order_id: Optional[UUIDType] = None,
        expiry_minutes: int = 15
    ) -> 'InventoryReservation':
        """
        Atomically reserve stock for an order
        Must be called within a transaction with the inventory already locked
        
        Args:
            db: Database session
            quantity: Quantity to reserve
            order_id: Associated order ID
            expiry_minutes: Minutes until reservation expires
        
        Returns:
            Created InventoryReservation record
        """
        # Check available stock (available - reserved)
        available_for_reservation = self.quantity_available - self.quantity_reserved
        
        if available_for_reservation < quantity:
            from core.exceptions import APIException
            raise APIException(
                status_code=400,
                message=f"Insufficient stock for reservation. Available: {available_for_reservation}, Requested: {quantity}"
            )
        
        # Update reserved quantity
        self.quantity_reserved += quantity
        self.version += 1
        
        # Create reservation
        expires_at = datetime.utcnow() + timedelta(minutes=expiry_minutes)
        reservation = InventoryReservation(
            inventory_id=self.id,
            order_id=order_id,
            quantity=quantity,
            status="reserved",
            expires_at=expires_at
        )
        
        db.add(reservation)
        
        logger.info(f"Stock reserved: variant={self.variant_id}, quantity={quantity}, expires_at={expires_at}")
        
        return reservation

    async def atomic_confirm_reservation(
        self, 
        db: AsyncSession,
        reservation: 'InventoryReservation',
        user_id: Optional[UUIDType] = None
    ) -> 'StockAdjustment':
        """
        Atomically confirm a reservation and convert to committed stock
        Must be called within a transaction with the inventory already locked
        
        Args:
            db: Database session
            reservation: Reservation to confirm
            user_id: User confirming the reservation
        
        Returns:
            Created StockAdjustment record
        """
        if reservation.status != "reserved":
            from core.exceptions import APIException
            raise APIException(
                status_code=400,
                message=f"Reservation {reservation.id} is not in reserved status"
            )
        
        # Update inventory quantities atomically
        self.quantity_available -= reservation.quantity
        self.quantity_reserved -= reservation.quantity
        self.quantity_committed += reservation.quantity
        self.quantity = self.quantity_available  # Update legacy field
        self.version += 1
        self.last_sold_at = datetime.utcnow()
        
        # Update reservation status
        reservation.status = "confirmed"
        reservation.confirmed_at = datetime.utcnow()
        
        # Create stock adjustment record
        adjustment = StockAdjustment(
            inventory_id=self.id,
            quantity_change=-reservation.quantity,
            reason="order_confirmed",
            adjusted_by_user_id=user_id,
            notes=f"Confirmed reservation {reservation.id}"
        )
        
        db.add(adjustment)
        
        logger.info(f"Reservation confirmed: {reservation.id}, quantity={reservation.quantity}")
        
        return adjustment

    async def atomic_cancel_reservation(
        self, 
        db: AsyncSession,
        reservation: 'InventoryReservation'
    ) -> None:
        """
        Atomically cancel a reservation and release reserved stock
        Must be called within a transaction with the inventory already locked
        
        Args:
            db: Database session
            reservation: Reservation to cancel
        """
        if reservation.status != "reserved":
            from core.exceptions import APIException
            raise APIException(
                status_code=400,
                message=f"Reservation {reservation.id} is not in reserved status"
            )
        
        # Release reserved stock
        self.quantity_reserved -= reservation.quantity
        self.version += 1
        
        # Update reservation status
        reservation.status = "cancelled"
        reservation.cancelled_at = datetime.utcnow()
        
        logger.info(f"Reservation cancelled: {reservation.id}, quantity={reservation.quantity}")

    @property
    def available_for_sale(self) -> int:
        """Calculate stock available for sale (available - reserved)"""
        return max(0, self.quantity_available - self.quantity_reserved)

    @property
    def total_stock(self) -> int:
        """Calculate total stock (available + committed)"""
        return self.quantity_available + self.quantity_committed

    @property
    def stock_status(self) -> str:
        """Determine stock status based on available quantity"""
        available = self.available_for_sale
        
        if available <= 0:
            return "out_of_stock"
        elif available <= self.low_stock_threshold:
            return "low_stock"
        else:
            return "in_stock"

    def to_dict(self) -> Dict[str, Any]:
        """Convert inventory to dictionary for API responses"""
        return {
            "id": str(self.id),
            "variant_id": str(self.variant_id),
            "location_id": str(self.location_id),
            "quantity_available": self.quantity_available,
            "quantity_reserved": self.quantity_reserved,
            "quantity_committed": self.quantity_committed,
            "available_for_sale": self.available_for_sale,
            "total_stock": self.total_stock,
            "low_stock_threshold": self.low_stock_threshold,
            "reorder_point": self.reorder_point,
            "inventory_status": self.inventory_status,
            "stock_status": self.stock_status,
            "last_restocked_at": self.last_restocked_at.isoformat() if self.last_restocked_at else None,
            "last_sold_at": self.last_sold_at.isoformat() if self.last_sold_at else None,
            "version": self.version,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }


class StockAdjustment(BaseModel):
    """Stock adjustment records for audit trail"""
    __tablename__ = "stock_adjustments"
    __table_args__ = (
        # Indexes for search and performance
        Index('idx_stock_adjustments_inventory_id', 'inventory_id'),
        Index('idx_stock_adjustments_reason', 'reason'),
        Index('idx_stock_adjustments_user_id', 'adjusted_by_user_id'),
        Index('idx_stock_adjustments_created_at', 'created_at'),
        # Composite indexes for common queries
        Index('idx_stock_adjustments_inventory_created', 'inventory_id', 'created_at'),
        {'extend_existing': True}
    )

    inventory_id = Column(GUID(), ForeignKey("inventory.id"), nullable=False)
    quantity_change = Column(Integer, nullable=False)  # Positive for add, negative for remove
    reason = Column(String(CHAR_LENGTH), nullable=False)  # e.g., "initial_stock", "received", "sold", "returned", "damaged"
    adjusted_by_user_id = Column(GUID(), ForeignKey("users.id"), nullable=True)
    notes = Column(Text, nullable=True)

    # Relationships
    inventory = relationship("Inventory", back_populates="adjustments")
    adjusted_by = relationship("User")


class InventoryReservation(BaseModel):
    """
    Atomic inventory reservations with SELECT ... FOR UPDATE support
    Prevents overselling by reserving inventory before payment confirmation
    """
    __tablename__ = "inventory_reservations"
    __table_args__ = (
        # Optimized indexes for atomic operations
        Index('idx_inventory_reservations_inventory_id', 'inventory_id'),
        Index('idx_inventory_reservations_order_id', 'order_id'),
        Index('idx_inventory_reservations_status', 'status'),
        Index('idx_inventory_reservations_expires_at', 'expires_at'),
        Index('idx_inventory_reservations_created_at', 'created_at'),
        # Composite indexes for atomic queries
        Index('idx_inventory_reservations_status_expires', 'status', 'expires_at'),
        Index('idx_inventory_reservations_inventory_status', 'inventory_id', 'status'),
        {'extend_existing': True}
    )
    
    inventory_id = Column(GUID(), ForeignKey("inventory.id"), nullable=False)
    order_id = Column(GUID(), ForeignKey("orders.id"), nullable=True)
    quantity = Column(Integer, nullable=False)
    # reserved, confirmed, cancelled, expired
    status = Column(String(50), nullable=False, default="reserved")
    expires_at = Column(DateTime(timezone=True), nullable=False)
    confirmed_at = Column(DateTime(timezone=True), nullable=True)
    cancelled_at = Column(DateTime(timezone=True), nullable=True)
    
    # Relationships
    inventory = relationship("Inventory", back_populates="reservations")
    order = relationship("Order")

    @classmethod
    async def cleanup_expired(cls, db: AsyncSession) -> int:
        """
        Clean up expired reservations atomically
        Returns number of reservations cleaned up
        """
        try:
            # Find expired reservations
            query = select(cls).where(
                cls.status == "reserved",
                cls.expires_at < datetime.utcnow()
            )
            
            result = await db.execute(query)
            expired_reservations = result.scalars().all()
            
            if not expired_reservations:
                return 0
            
            # Get unique inventory IDs and lock them
            inventory_ids = list(set(res.inventory_id for res in expired_reservations))
            inventories = await Inventory.get_multiple_with_lock(db, inventory_ids)
            inventory_map = {inv.id: inv for inv in inventories}
            
            cleaned_count = 0
            
            for reservation in expired_reservations:
                inventory = inventory_map.get(reservation.inventory_id)
                if inventory:
                    # Release reserved stock atomically
                    await inventory.atomic_cancel_reservation(db, reservation)
                    reservation.status = "expired"  # Override status to expired
                    cleaned_count += 1
            
            logger.info(f"Cleaned up {cleaned_count} expired reservations")
            return cleaned_count
            
        except Exception as e:
            logger.error(f"Error cleaning up expired reservations: {e}")
            raise
    
    def is_expired(self) -> bool:
        """Check if reservation has expired"""
        return datetime.utcnow() > self.expires_at
    
    def to_dict(self) -> Dict[str, Any]:
        return {
            "id": str(self.id),
            "inventory_id": str(self.inventory_id),
            "order_id": str(self.order_id) if self.order_id else None,
            "quantity": self.quantity,
            "status": self.status,
            "expires_at": self.expires_at.isoformat() if self.expires_at else None,
            "confirmed_at": self.confirmed_at.isoformat() if self.confirmed_at else None,
            "cancelled_at": self.cancelled_at.isoformat() if self.cancelled_at else None,
            "is_expired": self.is_expired(),
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }


# Utility functions for atomic operations
async def atomic_stock_operation(
    db: AsyncSession,
    variant_id: UUIDType,
    operation: str,
    **kwargs
) -> Dict[str, Any]:
    """
    Perform atomic stock operations with proper locking
    
    Args:
        db: Database session
        variant_id: Product variant ID
        operation: Operation type ('update', 'reserve', 'confirm', 'cancel')
        **kwargs: Operation-specific parameters
    
    Returns:
        Operation result dictionary
    """
    try:
        # Get inventory with lock
        inventory = await Inventory.get_with_lock(db, variant_id)
        
        if not inventory:
            from core.exceptions import APIException
            raise APIException(
                status_code=404,
                message=f"Inventory not found for variant {variant_id}"
            )
        
        if operation == "update":
            adjustment = await inventory.atomic_update_stock(
                db=db,
                quantity_change=kwargs['quantity_change'],
                reason=kwargs['reason'],
                user_id=kwargs.get('user_id'),
                notes=kwargs.get('notes')
            )
            await db.commit()
            return {
                "operation": "update",
                "inventory": inventory.to_dict(),
                "adjustment_id": str(adjustment.id)
            }
        
        elif operation == "reserve":
            reservation = await inventory.atomic_reserve_stock(
                db=db,
                quantity=kwargs['quantity'],
                order_id=kwargs.get('order_id'),
                expiry_minutes=kwargs.get('expiry_minutes', 15)
            )
            await db.commit()
            return {
                "operation": "reserve",
                "inventory": inventory.to_dict(),
                "reservation": reservation.to_dict()
            }
        
        elif operation == "confirm":
            reservation = kwargs['reservation']
            adjustment = await inventory.atomic_confirm_reservation(
                db=db,
                reservation=reservation,
                user_id=kwargs.get('user_id')
            )
            await db.commit()
            return {
                "operation": "confirm",
                "inventory": inventory.to_dict(),
                "reservation": reservation.to_dict(),
                "adjustment_id": str(adjustment.id)
            }
        
        elif operation == "cancel":
            reservation = kwargs['reservation']
            await inventory.atomic_cancel_reservation(db, reservation)
            await db.commit()
            return {
                "operation": "cancel",
                "inventory": inventory.to_dict(),
                "reservation": reservation.to_dict()
            }
        
        else:
            from core.exceptions import APIException
            raise APIException(
                status_code=400,
                message=f"Unknown operation: {operation}"
            )
    
    except Exception as e:
        await db.rollback()
        logger.error(f"Error in atomic stock operation {operation}: {e}")
        raise


async def atomic_bulk_stock_update(
    db: AsyncSession,
    stock_changes: List[Dict],
    reason: str,
    user_id: Optional[UUIDType] = None
) -> List[Dict]:
    """
    Atomically update multiple stock levels in a single transaction
    
    Args:
        db: Database session
        stock_changes: List of dicts with 'variant_id', 'quantity_change', 'notes'
        reason: Reason for stock changes
        user_id: User making the changes
    
    Returns:
        List of operation results
    """
    try:
        # Extract variant IDs and get locks in consistent order
        variant_ids = [change['variant_id'] for change in stock_changes]
        inventories = await Inventory.get_multiple_with_lock(db, variant_ids)
        
        # Create lookup for faster access
        inventory_map = {inv.variant_id: inv for inv in inventories}
        
        results = []
        
        # Process each stock change atomically
        for change in stock_changes:
            variant_id = change['variant_id']
            quantity_change = change['quantity_change']
            notes = change.get('notes')
            
            inventory = inventory_map.get(variant_id)
            if not inventory:
                from core.exceptions import APIException
                raise APIException(
                    status_code=404,
                    message=f"Inventory not found for variant {variant_id}"
                )
            
            # Perform atomic update
            adjustment = await inventory.atomic_update_stock(
                db=db,
                quantity_change=quantity_change,
                reason=reason,
                user_id=user_id,
                notes=notes
            )
            
            results.append({
                "variant_id": str(variant_id),
                "quantity_change": quantity_change,
                "new_quantity": inventory.quantity_available,
                "adjustment_id": str(adjustment.id)
            })
        
        # Commit all changes atomically
        await db.commit()
        
        logger.info(f"Bulk stock update completed: {len(stock_changes)} variants updated")
        
        return results
        
    except Exception as e:
        await db.rollback()
        logger.error(f"Error in bulk stock update: {e}")
        raise