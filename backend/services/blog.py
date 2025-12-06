from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import desc, func, or_
from typing import Optional, List
from backend.models.blog import BlogPost, BlogCategory, BlogTag, BlogPostTag, Comment
from backend.models.user import User # To get user info for comments
from backend.schemas.blog import (
    BlogPostCreate, BlogPostUpdate, BlogPostResponse,
    BlogCategoryCreate, BlogCategoryUpdate, BlogCategoryResponse,
    BlogTagCreate, BlogTagUpdate, BlogTagResponse,
    CommentCreate, CommentUpdate, CommentResponse
)
from backend.core.exceptions import APIException
from uuid import uuid4, UUID
from datetime import datetime
from sqlalchemy.orm import selectinload, joinedload
from slugify import slugify # Need to install python-slugify

class BlogService:
    def __init__(self, db: AsyncSession):
        self.db = db

    # --- Helper Methods ---
    async def _get_or_create_tags(self, tags: List[str]) -> List[BlogTag]:
        """Fetches existing tags or creates new ones if they don't exist."""
        blog_tags = []
        for tag_name in tags:
            tag_slug = slugify(tag_name)
            stmt = select(BlogTag).filter(BlogTag.slug == tag_slug)
            result = await self.db.execute(stmt)
            tag = result.scalars().first()
            if not tag:
                tag = BlogTag(id=uuid4(), name=tag_name, slug=tag_slug)
                self.db.add(tag)
            blog_tags.append(tag)
        return blog_tags

    async def _get_blog_category_by_id(self, category_id: UUID) -> Optional[BlogCategory]:
        """Retrieves a blog category by its ID."""
        stmt = select(BlogCategory).filter(BlogCategory.id == category_id)
        result = await self.db.execute(stmt)
        return result.scalars().first()

    async def _get_blog_category_by_slug(self, category_slug: str) -> Optional[BlogCategory]:
        """Retrieves a blog category by its slug."""
        stmt = select(BlogCategory).filter(BlogCategory.slug == category_slug)
        result = await self.db.execute(stmt)
        return result.scalars().first()

    async def _get_blog_tag_by_slug(self, tag_slug: str) -> Optional[BlogTag]:
        """Retrieves a blog tag by its slug."""
        stmt = select(BlogTag).filter(BlogTag.slug == tag_slug)
        result = await self.db.execute(stmt)
        return result.scalars().first()

    async def _get_blog_post_by_slug(self, post_slug: str) -> Optional[BlogPost]:
        """Retrieves a blog post by its slug."""
        stmt = select(BlogPost).filter(BlogPost.slug == post_slug).options(
            joinedload(BlogPost.author),
            joinedload(BlogPost.category),
            joinedload(BlogPost.tags).joinedload(BlogPostTag.blog_tag),
            joinedload(BlogPost.comments).joinedload(Comment.author)
        )
        result = await self.db.execute(stmt)
        return result.scalars().first()

    # --- Blog Post CRUD ---
    async def create_blog_post(self, post_data: BlogPostCreate, author_id: UUID) -> BlogPost:
        if post_data.category_id:
            category = await self._get_blog_category_by_id(post_data.category_id)
            if not category:
                raise APIException(status_code=404, message="Blog category not found")

        slug = slugify(post_data.title)
        stmt = select(BlogPost).filter(BlogPost.slug == slug)
        existing_post = await self.db.execute(stmt)
        if existing_post.scalars().first():
            raise APIException(status_code=400, message="Blog post with this slug already exists")

        new_post = BlogPost(
            id=uuid4(),
            author_id=author_id,
            title=post_data.title,
            slug=slug,
            content=post_data.content,
            excerpt=post_data.excerpt,
            category_id=post_data.category_id,
            image_url=post_data.image_url,
            is_published=post_data.is_published,
            published_at=datetime.utcnow() if post_data.is_published else None,
            seo_title=post_data.seo_title,
            seo_description=post_data.seo_description,
            seo_keywords=post_data.seo_keywords
        )
        self.db.add(new_post)
        await self.db.flush() # Flush to get new_post.id for tags

        if post_data.tags:
            blog_tags = await self._get_or_create_tags(post_data.tags)
            for tag in blog_tags:
                new_post.tags.append(BlogPostTag(blog_post_id=new_post.id, blog_tag_id=tag.id))

        await self.db.commit()
        await self.db.refresh(new_post)
        return new_post

    async def get_blog_posts(self, page: int = 1, limit: int = 10, is_published: Optional[bool] = True, search: Optional[str] = None, category_slug: Optional[str] = None, tag_slug: Optional[str] = None) -> dict:
        offset = (page - 1) * limit
        query = select(BlogPost).options(
            joinedload(BlogPost.author),
            joinedload(BlogPost.category),
            joinedload(BlogPost.tags).joinedload(BlogPostTag.blog_tag)
        )
        total_query = select(func.count()).select_from(BlogPost)

        if is_published is not None:
            query = query.filter(BlogPost.is_published == is_published)
            total_query = total_query.filter(BlogPost.is_published == is_published)

        if search:
            search_pattern = f"%{search}%"
            query = query.filter(
                (BlogPost.title.ilike(search_pattern)) |
                (BlogPost.content.ilike(search_pattern)) |
                (BlogPost.excerpt.ilike(search_pattern))
            )
            total_query = total_query.filter(
                (BlogPost.title.ilike(search_pattern)) |
                (BlogPost.content.ilike(search_pattern)) |
                (BlogPost.excerpt.ilike(search_pattern))
            )
        
        if category_slug:
            query = query.join(BlogCategory).filter(BlogCategory.slug == category_slug)
            total_query = total_query.join(BlogCategory).filter(BlogCategory.slug == category_slug)

        if tag_slug:
            query = query.join(BlogPostTag).join(BlogTag).filter(BlogTag.slug == tag_slug)
            total_query = total_query.join(BlogPostTag).join(BlogTag).filter(BlogTag.slug == tag_slug)

        query = query.order_by(desc(BlogPost.published_at))

        total_posts = (await self.db.execute(total_query)).scalar_one()
        posts = (await self.db.execute(query.offset(offset).limit(limit))).scalars().all()

        return {
            "total": total_posts,
            "page": page,
            "limit": limit,
            "data": [BlogPostResponse.model_validate(p) for p in posts] # Use model_validate
        }

    async def get_blog_post_by_id(self, post_id: UUID) -> Optional[BlogPost]:
        stmt = select(BlogPost).filter(BlogPost.id == post_id).options(
            joinedload(BlogPost.author),
            joinedload(BlogPost.category),
            joinedload(BlogPost.tags).joinedload(BlogPostTag.blog_tag),
            joinedload(BlogPost.comments).joinedload(Comment.author)
        )
        result = await self.db.execute(stmt)
        return result.scalars().first()

    async def get_blog_post_by_slug(self, post_slug: str) -> Optional[BlogPost]:
        return await self._get_blog_post_by_slug(post_slug)

    async def update_blog_post(self, post_id: UUID, post_data: BlogPostUpdate, author_id: UUID) -> BlogPost:
        post = await self.get_blog_post_by_id(post_id)
        if not post:
            raise APIException(status_code=404, message="Blog post not found")

        # Allow admins to update any post, otherwise only author
        if str(post.author_id) != str(author_id) and not await self._is_user_admin(author_id):
            raise APIException(status_code=403, message="Not authorized to update this post")

        update_data = post_data.model_dump(exclude_unset=True)

        if 'title' in update_data:
            post.slug = slugify(update_data['title'])

        if 'is_published' in update_data and update_data['is_published'] and not post.published_at:
            post.published_at = datetime.utcnow()
        elif 'is_published' in update_data and not update_data['is_published']:
            post.published_at = None

        if 'tags' in update_data:
            # Clear existing tags
            await self.db.execute(BlogPostTag.__table__.delete().where(BlogPostTag.blog_post_id == post.id))
            if update_data['tags']:
                blog_tags = await self._get_or_create_tags(update_data['tags'])
                for tag in blog_tags:
                    post.tags.append(BlogPostTag(blog_post_id=post.id, blog_tag_id=tag.id))
            del update_data['tags'] # Remove from update_data to prevent direct assignment

        for key, value in update_data.items():
            setattr(post, key, value)
        
        post.updated_at = datetime.utcnow()
        await self.db.commit()
        await self.db.refresh(post)
        return post

    async def delete_blog_post(self, post_id: UUID, current_user_id: UUID, is_admin: bool) -> None:
        post = await self.get_blog_post_by_id(post_id)
        if not post:
            raise APIException(status_code=404, message="Blog post not found")

        if str(post.author_id) != str(current_user_id) and not is_admin:
            raise APIException(status_code=403, message="Not authorized to delete this post")

        await self.db.delete(post)
        await self.db.commit()

    # --- Blog Category CRUD ---
    async def create_blog_category(self, category_data: BlogCategoryCreate) -> BlogCategory:
        slug = slugify(category_data.name)
        stmt = select(BlogCategory).filter(BlogCategory.slug == slug)
        existing_category = await self.db.execute(stmt)
        if existing_category.scalars().first():
            raise APIException(status_code=400, message="Blog category with this slug already exists")

        new_category = BlogCategory(id=uuid4(), slug=slug, **category_data.model_dump())
        self.db.add(new_category)
        await self.db.commit()
        await self.db.refresh(new_category)
        return new_category

    async def get_blog_categories(self) -> List[BlogCategory]:
        stmt = select(BlogCategory).order_by(BlogCategory.name)
        result = await self.db.execute(stmt)
        return result.scalars().all()

    async def get_blog_category_by_id(self, category_id: UUID) -> Optional[BlogCategory]:
        stmt = select(BlogCategory).filter(BlogCategory.id == category_id)
        result = await self.db.execute(stmt)
        return result.scalars().first()
    
    async def get_blog_category_by_slug(self, category_slug: str) -> Optional[BlogCategory]:
        return await self._get_blog_category_by_slug(category_slug)


    async def update_blog_category(self, category_id: UUID, category_data: BlogCategoryUpdate) -> BlogCategory:
        category = await self.get_blog_category_by_id(category_id)
        if not category:
            raise APIException(status_code=404, message="Blog category not found")

        update_data = category_data.model_dump(exclude_unset=True)
        if 'name' in update_data:
            category.slug = slugify(update_data['name'])

        for key, value in update_data.items():
            setattr(category, key, value)
        
        category.updated_at = datetime.utcnow()
        await self.db.commit()
        await self.db.refresh(category)
        return category

    async def delete_blog_category(self, category_id: UUID) -> None:
        category = await self.get_blog_category_by_id(category_id)
        if not category:
            raise APIException(status_code=404, message="Blog category not found")
        
        # Check if category has any posts
        stmt = select(func.count()).select_from(BlogPost).filter(BlogPost.category_id == category_id)
        post_count = (await self.db.execute(stmt)).scalar_one()
        if post_count > 0:
            raise APIException(status_code=400, message="Cannot delete category with associated blog posts")

        await self.db.delete(category)
        await self.db.commit()

    # --- Blog Tag CRUD ---
    async def create_blog_tag(self, tag_data: BlogTagCreate) -> BlogTag:
        slug = slugify(tag_data.name)
        stmt = select(BlogTag).filter(BlogTag.slug == slug)
        existing_tag = await self.db.execute(stmt)
        if existing_tag.scalars().first():
            raise APIException(status_code=400, message="Blog tag with this slug already exists")

        new_tag = BlogTag(id=uuid4(), slug=slug, **tag_data.model_dump())
        self.db.add(new_tag)
        await self.db.commit()
        await self.db.refresh(new_tag)
        return new_tag

    async def get_blog_tags(self) -> List[BlogTag]:
        stmt = select(BlogTag).order_by(BlogTag.name)
        result = await self.db.execute(stmt)
        return result.scalars().all()

    async def get_blog_tag_by_id(self, tag_id: UUID) -> Optional[BlogTag]:
        stmt = select(BlogTag).filter(BlogTag.id == tag_id)
        result = await self.db.execute(stmt)
        return result.scalars().first()

    async def get_blog_tag_by_slug(self, tag_slug: str) -> Optional[BlogTag]:
        return await self._get_blog_tag_by_slug(tag_slug)

    async def update_blog_tag(self, tag_id: UUID, tag_data: BlogTagUpdate) -> BlogTag:
        tag = await self.get_blog_tag_by_id(tag_id)
        if not tag:
            raise APIException(status_code=404, message="Blog tag not found")

        update_data = tag_data.model_dump(exclude_unset=True)
        if 'name' in update_data:
            tag.slug = slugify(update_data['name'])
        
        for key, value in update_data.items():
            setattr(tag, key, value)
        
        tag.updated_at = datetime.utcnow()
        await self.db.commit()
        await self.db.refresh(tag)
        return tag

    async def delete_blog_tag(self, tag_id: UUID) -> None:
        tag = await self.get_blog_tag_by_id(tag_id)
        if not tag:
            raise APIException(status_code=404, message="Blog tag not found")
        
        # Tags can be deleted even if associated with posts, as the association table entry will cascade delete.
        await self.db.delete(tag)
        await self.db.commit()

    # --- Comment CRUD ---
    async def create_comment(self, comment_data: CommentCreate, author_id: UUID) -> Comment:
        post = await self.get_blog_post_by_id(comment_data.blog_post_id)
        if not post:
            raise APIException(status_code=404, message="Blog post not found for commenting")

        if comment_data.parent_id:
            parent_comment = await self.get_comment_by_id(comment_data.parent_id)
            if not parent_comment:
                raise APIException(status_code=404, message="Parent comment not found")

        new_comment = Comment(id=uuid4(), author_id=author_id, **comment_data.model_dump())
        self.db.add(new_comment)
        await self.db.commit()
        await self.db.refresh(new_comment)
        return new_comment

    async def get_comments_for_post(self, post_id: UUID) -> List[Comment]:
        stmt = select(Comment).filter(Comment.blog_post_id == post_id, Comment.parent_id == None).options(
            joinedload(Comment.author),
            joinedload(Comment.replies).joinedload(Comment.author) # Eager load first level replies and their authors
        ).order_by(Comment.created_at)
        result = await self.db.execute(stmt)
        return result.scalars().unique().all() # .unique() to handle duplicates from joinedload

    async def get_comment_by_id(self, comment_id: UUID) -> Optional[Comment]:
        stmt = select(Comment).filter(Comment.id == comment_id).options(
            joinedload(Comment.author),
            joinedload(Comment.replies).joinedload(Comment.author)
        )
        result = await self.db.execute(stmt)
        return result.scalars().first()

    async def update_comment(self, comment_id: UUID, comment_data: CommentUpdate, current_user_id: UUID, is_admin: bool) -> Comment:
        comment = await self.get_comment_by_id(comment_id)
        if not comment:
            raise APIException(status_code=404, message="Comment not found")

        if str(comment.author_id) != str(current_user_id) and not is_admin:
            raise APIException(status_code=403, message="Not authorized to update this comment")

        update_data = comment_data.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(comment, key, value)
        
        comment.updated_at = datetime.utcnow()
        await self.db.commit()
        await self.db.refresh(comment)
        return comment

    async def delete_comment(self, comment_id: UUID, current_user_id: UUID, is_admin: bool) -> None:
        comment = await self.get_comment_by_id(comment_id)
        if not comment:
            raise APIException(status_code=404, message="Comment not found")

        if str(comment.author_id) != str(current_user_id) and not is_admin:
            raise APIException(status_code=403, message="Not authorized to delete this comment")

        await self.db.delete(comment)
        await self.db.commit()

    async def _is_user_admin(self, user_id: UUID) -> bool:
        """Helper to check if a user is an admin."""
        stmt = select(User).filter(User.id == user_id, User.role == "Admin")
        result = await self.db.execute(stmt)
        return result.scalars().first() is not None