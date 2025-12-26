"""
Simple event structure to replace EventContract
"""
from dataclasses import dataclass
from typing import Dict, Any, Optional
import json
from datetime import datetime
import uuid


@dataclass
class SimpleEvent:
    """Simple event structure"""
    event_type: str
    data: Dict[str, Any]
    event_id: str = None
    timestamp: str = None
    correlation_id: Optional[str] = None
    causation_id: Optional[str] = None
    metadata: Optional[Dict[str, Any]] = None

    def __post_init__(self):
        if not self.event_id:
            self.event_id = str(uuid.uuid4())
        if not self.timestamp:
            self.timestamp = datetime.utcnow().isoformat()

    @classmethod
    def create(cls, event_type: str, data: Dict[str, Any], **kwargs):
        return cls(event_type=event_type, data=data, **kwargs)

    def to_dict(self) -> Dict[str, Any]:
        return {
            'event_type': self.event_type,
            'data': self.data,
            'event_id': self.event_id,
            'timestamp': self.timestamp,
            'correlation_id': self.correlation_id,
            'causation_id': self.causation_id,
            'metadata': self.metadata
        }

    @classmethod
    def from_dict(cls, data: Dict[str, Any]):
        return cls(**data)

    def to_json(self) -> str:
        return json.dumps(self.to_dict())

    @classmethod
    def from_json(cls, json_str: str):
        return cls.from_dict(json.loads(json_str))