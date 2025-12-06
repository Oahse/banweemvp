from enum import Enum

class UserRole(str, Enum):
    ADMIN = "admin"
    CUSTOMER = "customer"
    SUPPLIER = "supplier"

# Other constants can be added here
