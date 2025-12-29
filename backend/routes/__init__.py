# Consolidated route imports
from .admin import router as admin_router
from .notifications import router as notifications_router
from .payments import router as payments_router
from .orders import router as orders_router
from .subscriptions import router as subscriptions_router
from .inventories import router as inventories_router
from .products import router as products_router
from .user import router as user_router
from .auth import router as auth_router
from .cart import router as cart_router
from .blog import router as blog_router
from .health import router as health_router
from .review import router as review_router
from .wishlist import router as wishlist_router
from .search import router as search_router
from .loyalty import router as loyalty_router
from .websockets import ws_router as websockets_router
from .social_auth import router as social_auth_router  
# from .negotiator import router as negotiator_router
