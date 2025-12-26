"""
Event-driven architecture core module for Kafka events.
Implements immutable events, versioning, idempotency, and dead letter queues.
"""

from .producer import EventProducer
from .consumer import EventConsumer
from .topics import TopicManager
from .handlers import EventHandler, DeadLetterHandler
from .replay import EventReplayService

__all__ = [
    'EventProducer',
    'EventConsumer',
    'TopicManager',
    'EventHandler',
    'DeadLetterHandler',
    'EventReplayService'
]