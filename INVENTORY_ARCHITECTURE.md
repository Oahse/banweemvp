# Inventory System Architecture

## Data Model

```
┌─────────────────┐
│    Product      │
│   (name, slug)  │
└────────┬────────┘
         │
         │ 1:Many (cascade delete-orphan)
         │
         ↓
┌─────────────────────────────────────┐
│      ProductVariant                 │
│  (sku, name, base_price, sale_price)│
│  stock = property (from inventory)  │
└──────────┬──────────────────────────┘
           │
           │ 1:1 (cascade delete-orphan)
           │
           ↓
┌──────────────────────────────────────────┐
│         Inventory                        │
│  quantity_available (source of truth)   │
│  low_stock_threshold = 10               │
│  inventory_status = "active"            │
│  location_id → WarehouseLocation        │
└──────────────────────────────────────────┘
```

## API Response Example

```json
{
  "variant": {
    "id": "uuid",
    "sku": "RICE-BSM-2KG",
    "name": "2kg Bag",
    "base_price": 5.99,
    "current_price": 5.99,
    "stock": 15,  // ← Computed from inventory
    "inventory": {
      "id": "uuid",
      "quantity_available": 15,  // ← Source of truth
      "low_stock_threshold": 10,
      "inventory_status": "active"
    }
  }
}
```

## Frontend Component Flow

```
┌─────────────────────────────────────┐
│   Home Page / Products List          │
│  (ProductCard Component)             │
└─────────┬───────────────────────────┘
          │
          │ Checks: inventory.quantity_available
          │
          ├─ quantity_available === 0
          │  └─→ Show "Out of Stock" badge
          │
          ├─ 0 < quantity_available <= 5
          │  └─→ Show "Only X left" badge
          │
          └─ quantity_available > 5
             └─→ Show "In Stock" / Normal state
             └─→ Enable "Add to Cart" button

┌─────────────────────────────────────┐
│   Product Details Page               │
│  (ProductDetails Component)          │
└─────────┬───────────────────────────┘
          │
          │ Checks: inventory.quantity_available
          │
          ├─ Show "In Stock (X available)" or "Out of Stock"
          │
          ├─ Quantity controls limited to quantity_available
          │  └─→ Increment button disabled when quantity >= quantity_available
          │
          └─ Add to Cart / Subscribe
             └─→ Disabled when inventory.quantity_available === 0
```

## Backend Service Flow

```
┌─────────────────────────────────────────────┐
│  API Request: POST /products (Create)        │
└─────────────┬───────────────────────────────┘
              │
              ↓
┌─────────────────────────────────────────────┐
│  ProductService.create_product()            │
│  ├─ Create Product record                   │
│  ├─ For each variant:                       │
│  │  ├─ Create ProductVariant record         │
│  │  └─ CREATE INVENTORY RECORD ALWAYS       │
│  │     (even if stock = 0)                  │
│  └─ Return ProductResponse                  │
└─────────────┬───────────────────────────────┘
              │
              ↓
        Result: Product with
        all variants having
        corresponding inventory
        records
```

## Inventory Management Flow

```
1. CREATE PRODUCT
   ├─ Backend: create_product() → creates inventory with stock=0
   └─ Frontend: Product created with 0 stock
   
2. UPDATE INVENTORY
   ├─ Admin updates quantity_available in Inventory page
   ├─ Backend: POST /inventory/{id} → updates quantity_available
   ├─ Frontend: Refetches updated inventory value
   └─ Products page shows updated stock
   
3. DISPLAY PRODUCTS
   ├─ API query with eager-loaded inventory
   ├─ Returns both stock (computed) and inventory object
   ├─ Frontend uses inventory.quantity_available
   └─ Shows correct badges and button states
   
4. DELETE PRODUCT
   ├─ User deletes product
   ├─ SQLAlchemy cascade delete triggers:
   │  ├─ Product record deleted
   │  ├─ ProductVariant records deleted
   │  └─ Inventory records deleted
   └─ No orphaned data remains
```

## Query Pattern (Optimized)

```python
# ✓ CORRECT - Eager loads inventory to avoid N+1
products = await session.execute(
    select(Product)
    .options(
        selectinload(Product.variants)
        .selectinload(ProductVariant.inventory)
    )
)

# In response, each variant has inventory object:
# variant.inventory.quantity_available ← Use this for display
# variant.stock ← Computed from inventory (fallback)
```

## State Management

```
┌──────────────────────────────────────────────┐
│  Inventory Change                            │
│  (e.g., stock level updated from 10 → 15)   │
└──────┬───────────────────────────────────────┘
       │
       ↓
┌──────────────────────────────────────────────┐
│  Backend Database Updated                    │
│  Inventory.quantity_available = 15           │
└──────┬───────────────────────────────────────┘
       │
       ↓
┌──────────────────────────────────────────────┐
│  Cache Invalidation                          │
│  requestCache.clear() after POST/PUT/DELETE  │
└──────┬───────────────────────────────────────┘
       │
       ↓
┌──────────────────────────────────────────────┐
│  Frontend Refetch                            │
│  API returns variant with inventory object   │
└──────┬───────────────────────────────────────┘
       │
       ↓
┌──────────────────────────────────────────────┐
│  UI Update                                   │
│  Components re-render with new quantity      │
└──────────────────────────────────────────────┘
```

## Cascade Delete Protection

```
Product.delete()
│
├─ ON CASCADE DELETE-ORPHAN
│  └─ ProductVariant records deleted
│
└─ For each ProductVariant:
   └─ ON CASCADE DELETE-ORPHAN
      └─ Inventory record deleted
      
Result: Complete cleanup, no orphaned records
```

## Data Consistency Rules

✓ **Every ProductVariant MUST have exactly 1 Inventory record**
  - Enforced at model level with uselist=False, cascade delete-orphan
  - Enforced at service level in create_product()
  - Enforced at database level with FK constraints

✓ **Inventory.quantity_available is the source of truth for stock**
  - ProductVariant.stock is a computed property
  - All display logic uses inventory.quantity_available
  - No separate stock column in product_variants table

✓ **Inventory is created with default warehouse location**
  - All new inventory goes to "Main Warehouse"
  - Default values: stock=0, low_stock_threshold=10, status=active
  - Can be updated through admin Inventory page

✓ **All updates are atomic**
  - Inventory update triggers cache invalidation
  - Frontend refetches data after any inventory change
  - No stale data shown to users
