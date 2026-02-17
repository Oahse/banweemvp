#!/usr/bin/env python3
"""
Email Template Viewer - Preview templates with dummy data
"""
import asyncio
from core.utils.messages.email import render_email

async def view_templates():
    """View all email templates with dummy data"""
    print("🎨 Email Template Viewer")
    print("=" * 50)
    
    # Dummy data for templates
    dummy_context = {
        "customer_name": "Amina Johnson",
        "verification_link": "https://banwee.com/verify-email?token=12345",
        "expiry_time": "24 hours",
        "company_name": "Banwee",
        "current_year": 2026,
        "order_number": "BW-2024-12345",
        "reset_link": "https://banwee.com/reset-password?token=67890",
        "product_name": "Authentic African Basket",
        "tracking_number": "1Z999AA1012345678",
        "support_email": "support@banwee.com",
        "total_amount": "$89.99",
        "shipping_address": "123 Main St, Nairobi, Kenya"
    }
    
    templates = [
        ("account/activation.html", "📧 Email Verification"),
        ("account/welcome.html", "👋 Welcome Email"),
        ("account/password_reset.html", "🔐 Password Reset"),
        ("purchase/order_confirmation.html", "📦 Order Confirmation"),
        ("purchase/shipping_update.html", "🚚 Shipping Update"),
        ("system/low_stock_alert.html", "⚠️ Low Stock Alert")
    ]
    
    for template_path, description in templates:
        print(f"\n{description} - {template_path}")
        print("-" * 50)
        
        try:
            html_content = await render_email(template_path, dummy_context)
            
            # Save to file for viewing
            output_file = f"preview_{template_path.replace('/', '_')}.html"
            with open(output_file, 'w', encoding='utf-8') as f:
                f.write(html_content)
            
            print(f"✅ Saved preview: {output_file}")
            print(f"📊 Content length: {len(html_content)} characters")
            
        except Exception as e:
            print(f"❌ Error rendering {template_path}: {e}")
    
    print(f"\n🎯 Open the preview files in your browser to see the templates!")
    import os
    print(f"📁 Files saved in: {os.getcwd()}")

if __name__ == "__main__":
    asyncio.run(view_templates())
