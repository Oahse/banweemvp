#!/usr/bin/env python3
"""
Test script to verify email configuration and sending
"""
import asyncio
from core.config import settings

def test_email_config():
    """Test email configuration"""
    print("🔧 Testing Email Configuration...")
    
    print(f"📧 MAILJET_API_KEY: {'✅ Configured' if settings.MAILJET_API_KEY else '❌ Missing'}")
    print(f"🔑 MAILJET_API_SECRET: {'✅ Configured' if settings.MAILJET_API_SECRET else '❌ Missing'}")
    print(f"📤 MAILJET_FROM_EMAIL: {settings.MAILJET_FROM_EMAIL}")
    print(f"🌐 FRONTEND_URL: {settings.FRONTEND_URL}")
    
    if not settings.MAILJET_API_KEY or not settings.MAILJET_API_SECRET:
        print("\n❌ Mailjet API keys not configured!")
        print("Please add the following to your .env file:")
        print("MAILJET_API_KEY=your_mailjet_api_key")
        print("MAILJET_API_SECRET=your_mailjet_api_secret")
        print("MAILJET_FROM_EMAIL=Banwee <noreply@yourdomain.com>")
        return False
    
    print("\n✅ Email configuration looks good!")
    return True

async def test_email_sending():
    """Test actual email sending"""
    print("\n📧 Testing Email Sending...")
    
    try:
        from core.utils.messages.email import send_email_mailjet_legacy
        
        # Test email
        await send_email_mailjet_legacy(
            to_email="test@example.com",
            mail_type='activation',
            context={
                "customer_name": "Test User",
                "verification_link": "https://example.com/verify?token=test",
                "company_name": "Banwee",
                "expiry_time": "24 hours",
                "current_year": 2024
            }
        )
        
        print("✅ Email sent successfully!")
        return True
        
    except Exception as e:
        print(f"❌ Email sending failed: {e}")
        return False

def main():
    print("🚀 Email Configuration Test\n")
    
    # Test configuration
    config_ok = test_email_config()
    
    if config_ok:
        # Test actual sending (uncomment to test)
        # asyncio.run(test_email_sending())
        print("\n📝 To test actual email sending, uncomment the asyncio.run line above")
    
    print("\n📊 Summary:")
    print(f"   Configuration: {'✅ OK' if config_ok else '❌ FAILED'}")

if __name__ == "__main__":
    main()
