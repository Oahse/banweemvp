#!/usr/bin/env python3
"""
Debug template rendering to see actual output
"""
import asyncio
from core.utils.messages.email import render_email

async def debug_template():
    """Debug template rendering"""
    print("🔍 Debugging Template Rendering...")
    
    # Dummy data
    dummy_context = {
        "customer_name": "Amina Johnson",
        "verification_link": "https://banwee.com/verify-email?token=C427A86xeZDpJUAIoRFeC9t6N29SizcOBPKeD77NFPg",
        "expiry_time": "24 hours",
        "company_name": "Banwee",
        "current_year": 2026,
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
    
    try:
        html_content = await render_email("account/activation.html", dummy_context)
        
        # Save to file
        with open("debug_activation.html", 'w', encoding='utf-8') as f:
            f.write(html_content)
        
        print(f"✅ Debug template saved: debug_activation.html")
        print(f"📊 Content length: {len(html_content)} characters")
        
        # Check for CSS variables
        if "var(--banwee-primary)" in html_content:
            print(f"✅ CSS variables found in template")
        else:
            print(f"❌ CSS variables NOT found in template")
            
        # Check for CSS styles
        if "<style>" in html_content:
            print(f"✅ CSS styles found in template")
        else:
            print(f"❌ CSS styles NOT found in template")
            
        # Show first 500 characters
        print(f"\n🔍 First 500 characters:")
        print(html_content[:500])
        
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    asyncio.run(debug_template())
