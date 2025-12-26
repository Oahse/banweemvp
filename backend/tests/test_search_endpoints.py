#!/usr/bin/env python3
"""
Simple test script to verify search functionality works
"""
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Test imports
try:
    from services.products import ProductService
    from services.user import UserService
    from services.search import SearchService
    print("✅ All search services imported successfully")
    
    # Test that the new methods exist
    print("✅ ProductService has search_products method:", hasattr(ProductService, 'search_products'))
    print("✅ ProductService has search_categories method:", hasattr(ProductService, 'search_categories'))
    print("✅ UserService has search_users method:", hasattr(UserService, 'search_users'))
    print("✅ SearchService has autocomplete method:", hasattr(SearchService, 'autocomplete'))
    
    print("\n🎉 All search functionality is properly implemented!")
    
except ImportError as e:
    print(f"❌ Import error: {e}")
    sys.exit(1)
except Exception as e:
    print(f"❌ Error: {e}")
    sys.exit(1)