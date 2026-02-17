#!/usr/bin/env python3
"""
Email Template Preview - View all templates with dummy data in browser
"""
import asyncio
import webbrowser
import os
from core.utils.messages.email import render_email

async def preview_templates():
    """Preview all email templates with dummy data"""
    print("🎨 Email Template Preview")
    print("=" * 50)
    
    # Dummy data for templates
    dummy_context = {
        "customer_name": "Amina Johnson",
        "verification_link": "https://banwee.com/verify-email?token=C427A86xeZDpJUAIoRFeC9t6N29SizcOBPKeD77NFPg",
        "expiry_time": "24 hours",
        "company_name": "Banwee",
        "current_year": 2026,
        "order_number": "BW-2024-12345",
        "reset_link": "https://banwee.com/reset-password?token=67890ABCDEF",
        "product_name": "Authentic African Handwoven Basket",
        "tracking_number": "1Z999AA1012345678",
        "support_email": "support@banwee.com",
        "total_amount": "$89.99",
        "shipping_address": "123 Main St, Nairobi, Kenya",
        "frontend_url": "https://banwee.com",
        "help_url": "https://banwee.com/help",
        "contact_url": "https://banwee.com/contact",
        "unsubscribe_url": "https://banwee.com/unsubscribe",
        "privacy_url": "https://banwee.com/privacy",
        "terms_url": "https://banwee.com/terms",
        "social_facebook": "https://facebook.com/banwee",
        "social_instagram": "https://instagram.com/banwee",
        "social_twitter": "https://twitter.com/banwee",
        "social_tiktok": "https://tiktok.com/@banwee",
        "social_youtube": "https://youtube.com/@banwee"
    }
    
    templates = [
        ("account/activation.html", "📧 Email Verification"),
        ("account/welcome.html", "👋 Welcome Email"),
        ("account/password_reset.html", "🔐 Password Reset"),
        ("purchase/order_confirmation.html", "📦 Order Confirmation"),
        ("purchase/shipping_update.html", "🚚 Shipping Update"),
        ("system/low_stock_alert.html", "⚠️ Low Stock Alert")
    ]
    
    preview_files = []
    
    for template_path, description in templates:
        print(f"\n{description} - {template_path}")
        print("-" * 50)
        
        try:
            html_content = await render_email(template_path, dummy_context)
            
            # Save to file for viewing
            output_file = f"preview_{template_path.replace('/', '_').replace('.html', '')}.html"
            with open(output_file, 'w', encoding='utf-8') as f:
                f.write(html_content)
            
            preview_files.append(output_file)
            print(f"✅ Saved preview: {output_file}")
            print(f"📊 Content length: {len(html_content)} characters")
            
        except Exception as e:
            print(f"❌ Error rendering {template_path}: {e}")
    
    print(f"\n🎯 Opening templates in browser...")
    
    # Open each preview file in the default browser
    for preview_file in preview_files:
        try:
            file_path = os.path.abspath(preview_file)
            webbrowser.open(f"file://{file_path}")
            print(f"🌐 Opened: {preview_file}")
        except Exception as e:
            print(f"❌ Could not open {preview_file}: {e}")
    
    print(f"\n📁 Preview files saved in: {os.getcwd()}")
    print(f"📧 Check your browser tabs to see the templates!")

if __name__ == "__main__":
    asyncio.run(preview_templates())
