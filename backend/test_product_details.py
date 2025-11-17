import requests
import json

# Test getting a product
response = requests.get('http://localhost:8000/products')
if response.status_code == 200:
    products = response.json()
    if products and len(products) > 0:
        product_id = products[0]['id']
        print(f'Testing product ID: {product_id}')
        
        # Get product details
        detail_response = requests.get(f'http://localhost:8000/products/{product_id}')
        print(f'Status: {detail_response.status_code}')
        if detail_response.status_code == 200:
            product = detail_response.json()
            print(json.dumps(product, indent=2))
        else:
            print(f'Error: {detail_response.text}')
    else:
        print('No products found')
else:
    print(f'Failed to get products: {response.status_code}')
