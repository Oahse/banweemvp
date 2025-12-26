"""
Topic management for Kafka events with proper naming conventions.
Handles topic creation, naming, and configuration.
"""

import logging
from typing import Dict, List, Optional
from enum import Enum
from dataclasses import dataclass

logger = logging.getLogger(__name__)


class TopicType(Enum):
    """Topic type enumeration"""
    EVENT = "event"
    COMMAND = "command"
    DEAD_LETTER = "dead_letter"
    REPLAY = "replay"


@dataclass
class TopicConfig:
    """Topic configuration"""
    name: str
    partitions: int = 3
    replication_factor: int = 1
    retention_ms: int = 604800000  # 7 days
    cleanup_policy: str = "delete"
    compression_type: str = "gzip"
    max_message_bytes: int = 1048576  # 1MB


class TopicManager:
    """
    Manages Kafka topic naming and configuration.
    Follows domain.entity.action naming convention.
    """
    
    # Topic naming patterns
    EVENT_TOPIC_PATTERN = "{domain}.{entity}.{action}"
    DEAD_LETTER_PATTERN = "{original_topic}.dead_letter"
    REPLAY_PATTERN = "{original_topic}.replay"
    
    # Domain definitions
    DOMAINS = {
        "order": "Order management domain",
        "inventory": "Inventory management domain", 
        "user": "User management domain",
        "payment": "Payment processing domain",
        "cart": "Shopping cart domain",
        "notification": "Notification domain",
        "loyalty": "Loyalty program domain",
        "product": "Product catalog domain"
    }
    
    # Entity definitions per domain
    ENTITIES = {
        "order": ["order", "shipment", "return"],
        "inventory": ["stock", "adjustment"],
        "user": ["user", "profile", "preference"],
        "payment": ["payment", "refund", "transaction"],
        "cart": ["cart", "item", "session"],
        "notification": ["notification", "alert", "message"],
        "loyalty": ["points", "reward", "tier"],
        "product": ["product", "variant", "category"]
    }
    
    # Action definitions
    ACTIONS = {
        # Lifecycle actions
        "created", "updated", "deleted", "archived",
        # State changes
        "activated", "deactivated", "suspended", "restored",
        # Process actions
        "initiated", "processed", "completed", "failed", "cancelled",
        # Business actions
        "paid", "shipped", "delivered", "returned", "refunded",
        "reserved", "released", "allocated", "adjusted",
        "registered", "verified", "authenticated", "logged_out",
        "added", "removed", "modified", "cleared",
        "earned", "redeemed", "expired", "transferred",
        "published", "unpublished", "featured", "discounted",
        # Alert actions
        "low", "out", "replenished", "threshold_reached"
    }

    def __init__(self):
        self.topic_configs: Dict[str, TopicConfig] = {}
        self._initialize_standard_topics()

    def _initialize_standard_topics(self):
        """Initialize standard topic configurations"""
        
        # Order domain topics
        order_topics = [
            "order.order.created", "order.order.updated", "order.order.paid",
            "order.order.failed", "order.order.shipped", "order.order.delivered",
            "order.order.cancelled", "order.order.returned",
            "order.shipment.created", "order.shipment.updated", "order.shipment.delivered",
            "order.return.initiated", "order.return.processed", "order.return.completed"
        ]
        
        # Inventory domain topics
        inventory_topics = [
            "inventory.stock.updated", "inventory.stock.low", "inventory.stock.out",
            "inventory.stock.replenished", 
            "inventory.adjustment.created", "inventory.adjustment.processed"
        ]
        
        # User domain topics
        user_topics = [
            "user.user.registered", "user.user.verified", "user.user.updated",
            "user.user.deactivated", "user.user.deleted",
            "user.profile.updated", "user.profile.completed",
            "user.preference.updated"
        ]
        
        # Payment domain topics
        payment_topics = [
            "payment.payment.initiated", "payment.payment.processed",
            "payment.payment.succeeded", "payment.payment.failed",
            "payment.payment.cancelled", "payment.refund.initiated",
            "payment.refund.processed", "payment.refund.completed",
            "payment.transaction.created", "payment.transaction.updated"
        ]
        
        # Cart domain topics
        cart_topics = [
            "cart.cart.created", "cart.cart.updated", "cart.cart.cleared",
            "cart.cart.abandoned", "cart.item.added", "cart.item.removed",
            "cart.item.updated", "cart.session.started", "cart.session.expired"
        ]
        
        # Notification domain topics
        notification_topics = [
            "notification.notification.created", "notification.notification.sent",
            "notification.notification.delivered", "notification.notification.failed",
            "notification.alert.created", "notification.alert.resolved",
            "notification.message.queued", "notification.message.processed"
        ]
        
        # Loyalty domain topics
        loyalty_topics = [
            "loyalty.points.earned", "loyalty.points.redeemed", "loyalty.points.expired",
            "loyalty.points.transferred", "loyalty.reward.created", "loyalty.reward.claimed",
            "loyalty.tier.upgraded", "loyalty.tier.downgraded"
        ]
        
        # Product domain topics
        product_topics = [
            "product.product.created", "product.product.updated", "product.product.deleted",
            "product.product.published", "product.product.unpublished",
            "product.variant.created", "product.variant.updated", "product.variant.deleted",
            "product.category.created", "product.category.updated"
        ]
        
        all_topics = (
            order_topics + inventory_topics + user_topics + payment_topics +
            cart_topics + notification_topics + loyalty_topics + product_topics
        )
        
        # Create configurations for all topics
        for topic in all_topics:
            self.topic_configs[topic] = self._create_topic_config(topic)
            
            # Create dead letter topic
            dead_letter_topic = self.get_dead_letter_topic(topic)
            self.topic_configs[dead_letter_topic] = self._create_dead_letter_config(dead_letter_topic)
            
            # Create replay topic
            replay_topic = self.get_replay_topic(topic)
            self.topic_configs[replay_topic] = self._create_replay_config(replay_topic)

    def _create_topic_config(self, topic_name: str) -> TopicConfig:
        """Create standard topic configuration"""
        return TopicConfig(
            name=topic_name,
            partitions=3,
            replication_factor=1,
            retention_ms=604800000,  # 7 days
            cleanup_policy="delete",
            compression_type="gzip"
        )

    def _create_dead_letter_config(self, topic_name: str) -> TopicConfig:
        """Create dead letter topic configuration"""
        return TopicConfig(
            name=topic_name,
            partitions=1,  # Single partition for dead letters
            replication_factor=1,
            retention_ms=2592000000,  # 30 days
            cleanup_policy="delete",
            compression_type="gzip"
        )

    def _create_replay_config(self, topic_name: str) -> TopicConfig:
        """Create replay topic configuration"""
        return TopicConfig(
            name=topic_name,
            partitions=1,  # Single partition for replay
            replication_factor=1,
            retention_ms=31536000000,  # 1 year
            cleanup_policy="compact",  # Keep latest version
            compression_type="gzip"
        )

    def get_topic_name(self, domain: str, entity: str, action: str) -> str:
        """Generate topic name following naming convention"""
        if domain not in self.DOMAINS:
            raise ValueError(f"Unknown domain: {domain}")
        
        if entity not in self.ENTITIES.get(domain, []):
            raise ValueError(f"Unknown entity '{entity}' for domain '{domain}'")
        
        if action not in self.ACTIONS:
            raise ValueError(f"Unknown action: {action}")
        
        return self.EVENT_TOPIC_PATTERN.format(
            domain=domain,
            entity=entity,
            action=action
        )

    def get_dead_letter_topic(self, original_topic: str) -> str:
        """Get dead letter topic name for original topic"""
        return self.DEAD_LETTER_PATTERN.format(original_topic=original_topic)

    def get_replay_topic(self, original_topic: str) -> str:
        """Get replay topic name for original topic"""
        return self.REPLAY_PATTERN.format(original_topic=original_topic)

    def get_topic_config(self, topic_name: str) -> Optional[TopicConfig]:
        """Get topic configuration"""
        return self.topic_configs.get(topic_name)

    def add_custom_topic(self, topic_name: str, config: TopicConfig):
        """Add custom topic configuration"""
        self.topic_configs[topic_name] = config
        
        # Also create dead letter and replay topics
        dead_letter_topic = self.get_dead_letter_topic(topic_name)
        self.topic_configs[dead_letter_topic] = self._create_dead_letter_config(dead_letter_topic)
        
        replay_topic = self.get_replay_topic(topic_name)
        self.topic_configs[replay_topic] = self._create_replay_config(replay_topic)

    def list_topics_by_domain(self, domain: str) -> List[str]:
        """List all topics for a specific domain"""
        return [
            topic for topic in self.topic_configs.keys()
            if topic.startswith(f"{domain}.")
        ]

    def list_all_topics(self) -> List[str]:
        """List all configured topics"""
        return list(self.topic_configs.keys())

    def validate_topic_name(self, topic_name: str) -> bool:
        """Validate topic name follows naming convention"""
        parts = topic_name.split(".")
        
        # Check for dead letter or replay topics
        if topic_name.endswith(".dead_letter") or topic_name.endswith(".replay"):
            return True
        
        if len(parts) != 3:
            return False
        
        domain, entity, action = parts
        
        return (
            domain in self.DOMAINS and
            entity in self.ENTITIES.get(domain, []) and
            action in self.ACTIONS
        )

    def get_topic_metadata(self, topic_name: str) -> Dict[str, str]:
        """Get topic metadata including domain, entity, action"""
        if not self.validate_topic_name(topic_name):
            return {}
        
        # Handle special topics
        if topic_name.endswith(".dead_letter"):
            original_topic = topic_name.replace(".dead_letter", "")
            metadata = self.get_topic_metadata(original_topic)
            metadata["type"] = "dead_letter"
            return metadata
        
        if topic_name.endswith(".replay"):
            original_topic = topic_name.replace(".replay", "")
            metadata = self.get_topic_metadata(original_topic)
            metadata["type"] = "replay"
            return metadata
        
        parts = topic_name.split(".")
        if len(parts) == 3:
            domain, entity, action = parts
            return {
                "domain": domain,
                "entity": entity,
                "action": action,
                "type": "event",
                "description": f"{action.title()} {entity} in {domain} domain"
            }
        
        return {}


# Global topic manager instance
topic_manager = TopicManager()