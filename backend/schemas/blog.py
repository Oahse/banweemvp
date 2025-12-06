from pydantic import BaseModel, Field, ConfigDict
from typing import Optional, List
from datetime import datetime
from uuid import UUID

# --- BlogCategory Schemas ---
class BlogCategoryBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    slug: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = None

class BlogCategoryCreate(BlogCategoryBase):
    pass

class BlogCategoryUpdate(BaseModel):
    name: Optional[str] = None
    slug: Optional[str] = None
    description: Optional[str] = None

class BlogCategoryResponse(BlogCategoryBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)

# --- BlogTag Schemas ---
class BlogTagBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    slug: str = Field(..., min_length=1, max_length=255)

class BlogTagCreate(BlogTagBase):
    pass

class BlogTagUpdate(BaseModel):
    name: Optional[str] = None
    slug: Optional[str] = None

class BlogTagResponse(BlogTagBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)

# --- User Schemas for Blog (simplified) ---
class BlogAuthor(BaseModel):
    id: UUID
    firstname: str
    lastname: str
    full_name: Optional[str] = None # Added for convenience

    model_config = ConfigDict(from_attributes=True)

# --- Comment Schemas ---
class CommentBase(BaseModel):
    content: str = Field(..., min_length=1)
    author_id: UUID
    blog_post_id: UUID
    parent_id: Optional[UUID] = None
    is_approved: Optional[bool] = False

class CommentCreate(BaseModel):
    content: str = Field(..., min_length=1)
    blog_post_id: UUID
    parent_id: Optional[UUID] = None

class CommentUpdate(BaseModel):
    content: Optional[str] = None
    is_approved: Optional[bool] = None

class CommentResponse(CommentBase):
    id: UUID
    created_at: datetime
    updated_at: datetime
    author: BlogAuthor
    replies: List["CommentResponse"] = [] # Forward reference for nested comments

    model_config = ConfigDict(from_attributes=True)

# --- BlogPost Schemas ---
class BlogPostBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
    slug: str = Field(..., min_length=1, max_length=255) # Added slug
    content: str = Field(..., min_length=1)
    excerpt: Optional[str] = None
    author_id: Optional[UUID] = None # Will be set by service/auth
    category_id: Optional[UUID] = None # Link to BlogCategory
    image_url: Optional[str] = None
    is_published: Optional[bool] = False
    published_at: Optional[datetime] = None
    seo_title: Optional[str] = None
    seo_description: Optional[str] = None
    seo_keywords: Optional[str] = None # Stored as string

class BlogPostCreate(BlogPostBase):
    # Tags will be handled separately in the service by name/slug
    tags: Optional[List[str]] = Field(default_factory=list, description="List of tag names/slugs")
    pass


class BlogPostUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    content: Optional[str] = None
    excerpt: Optional[str] = None
    category_id: Optional[UUID] = None
    image_url: Optional[str] = None
    is_published: Optional[bool] = None
    published_at: Optional[datetime] = None
    seo_title: Optional[str] = None
    seo_description: Optional[str] = None
    seo_keywords: Optional[str] = None
    tags: Optional[List[str]] = Field(default_factory=list, description="List of tag names/slugs")


class BlogPostResponse(BlogPostBase):
    id: UUID
    author: BlogAuthor
    category: Optional[BlogCategoryResponse] = None # New relationship
    tags: List[BlogTagResponse] = [] # Changed to list of BlogTagResponse
    comments: List[CommentResponse] = [] # New relationship
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)

# Update forward refs for nested CommentResponse
CommentResponse.model_rebuild()