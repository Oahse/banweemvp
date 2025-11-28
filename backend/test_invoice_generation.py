"""
Test invoice generation with WeasyPrint
"""
from datetime import datetime
from core.utils.invoice_generator import InvoiceGenerator

# Sample order data
sample_order = {
    'order_id': 'a7b3c2d1-4e5f-6789-0abc-def123456789',
    'created_at': datetime.now(),
    'customer_name': 'Alisa Lumbert',
    'customer_email': 'alisa.lumbert@email.com',
    'customer_phone': '+1 (231) 321 4232',
    'subtotal': 210.00,
    'tax_rate': 10,
    'tax_amount': 21.00,
    'discount_amount': 11.55,
    'total_amount': 219.45,
    'items': [
        {
            'product_name': 'Items Name',
            'variant_name': 'Sample item product description',
            'price_per_unit': 20.00,
            'quantity': 3,
            'total_price': 60.00
        },
        {
            'product_name': 'Items Name',
            'variant_name': 'Another Sample item product description',
            'price_per_unit': 5.00,
            'quantity': 1,
            'total_price': 5.00
        },
        {
            'product_name': 'Items Name',
            'variant_name': 'Sample item product description',
            'price_per_unit': 40.00,
            'quantity': 2,
            'total_price': 80.00
        },
        {
            'product_name': 'Items Name',
            'variant_name': 'Another Sample item product description',
            'price_per_unit': 20.00,
            'quantity': 1,
            'total_price': 20.00
        },
        {
            'product_name': 'Items Name',
            'variant_name': 'Another Sample item product description',
            'price_per_unit': 15.00,
            'quantity': 3,
            'total_price': 45.00
        },
    ]
}

# Generate invoice
print("Generating test invoice...")
generator = InvoiceGenerator()

# Generate HTML (for preview)
html = generator.generate_html(sample_order)
print("✓ HTML generated successfully")

# Generate PDF
output_file = "test_invoice.pdf"
generator.generate_pdf(sample_order, output_file)
print(f"✓ PDF generated: {output_file}")

print("\n✅ Invoice generation test completed successfully!")
print(f"   Check the file: {output_file}")
