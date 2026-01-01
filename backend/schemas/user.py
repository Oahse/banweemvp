

from pydantic import BaseModel, EmailStr, ConfigDict
from typing import Optional
from datetime import datetime
from uuid import UUID
from enum import Enum

from models.user import UserRole

class AddressBase(BaseModel):
    street: Optional[str]
    city: Optional[str]
    state: Optional[str]
    country: Optional[str]
    post_code: Optional[str]
    kind: str = "Shipping"


class AddressCreate(AddressBase):
    pass


class AddressUpdate(AddressBase):
    pass


class AddressResponse(AddressBase):
    id: UUID
    user_id: UUID
    is_default: bool
    created_at: datetime
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)


class UserBase(BaseModel):
    email: EmailStr
    firstname: str
    lastname: str
    role: Optional[UserRole] = UserRole.CUSTOMER


class UserCreate(UserBase):
    password: str


class UserUpdate(BaseModel):
    firstname: Optional[str] = None
    lastname: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    age: Optional[int] = None
    gender: Optional[str] = None
    country: Optional[str] = None
    language: Optional[str] = None
    timezone: Optional[str] = None
    is_active: Optional[bool] = None


class UserResponse(BaseModel):
    id: UUID
    email: EmailStr
    firstname: str
    lastname: str
    full_name: Optional[str] = None
    phone: Optional[str] = None
    role: str
    verified: bool
    is_active: bool
    age: Optional[int] = None
    gender: Optional[str] = None
    country: Optional[str] = None
    language: Optional[str] = None
    timezone: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)
