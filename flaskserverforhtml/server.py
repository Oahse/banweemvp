#!/usr/bin/env python3
"""
Flask server to render Banwee email templates with dummy data.
Run this server to preview all email templates with realistic sample data.
"""

from flask import Flask, render_template, jsonify, send_from_directory
import os
import tempfile
from datetime import datetime, timedelta

# Set temp directory to avoid macOS issues
tempfile.tempdir = '/tmp'

app = Flask(__name__, 
    template_folder='../backend/core/utils/messages/templates',
    static_folder='../backend/core/utils/messages/templates')

# Serve static files (logo)
@app.route('/banwee_logo_green.png')
def serve_logo():
    return send_from_directory('../backend/core/utils/messages/templates', 'banwee_logo_green.png')

# Dummy data generators
def get_account_data():
    return {
        'customer_name': 'Sarah Johnson',
        'verification_link': 'https://banwee.com/verify?token=abc123xyz789',
        'expiry_time': '24 hours',
        'frontend_url': 'https://banwee.com'
    }

def get_cart_data():
    return {
        'customer_name': 'Michael Chen',
        'cart_url': 'https://banwee.com/cart/abc123',
        'frontend_url': 'https://banwee.com',
        'cart_items': [
            {
                'name': 'Organic Ethiopian Coffee Beans',
                'quantity': 2,
                'price': '$24.99',
                'image_url': 'https://via.placeholder.com/80x80/61b482/ffffff?text=Coffee'
            },
            {
                'name': 'Ghanaian Dark Chocolate',
                'quantity': 1,
                'price': '$12.99',
                'image_url': 'https://via.placeholder.com/80x80/253d4e/ffffff?text=Chocolate'
            },
            {
                'name': 'Moroccan Argan Oil',
                'quantity': 1,
                'price': '$18.99',
                'image_url': 'https://via.placeholder.com/80x80/61b482/ffffff?text=Oil'
            }
        ],
        'cart_total': '$56.97',
        'discount_code': 'AFRICA10',
        'discount_amount': '10% off'
    }

def get_order_data():
    return {
        'customer_name': 'Emma Wilson',
        'order_number': 'BW-2024-12345',
        'order_date': 'February 15, 2024',
        'shipping_address': '123 Main St, New York, NY 10001',
        'billing_address': '123 Main St, New York, NY 10001',
        'frontend_url': 'https://banwee.com',
        'items': [
            {
                'name': 'Kenyan Tea Collection',
                'quantity': 3,
                'price': '$15.99',
                'image_url': 'https://via.placeholder.com/80x80/61b482/ffffff?text=Tea'
            },
            {
                'name': 'South African Rooibos',
                'quantity': 2,
                'price': '$8.99',
                'image_url': 'https://via.placeholder.com/80x80/253d4e/ffffff?text=Rooibos'
            }
        ],
        'subtotal': '$65.95',
        'shipping': '$5.99',
        'tax': '$5.76',
        'total': '$77.70',
        'tracking_number': '1Z999AA10123456784',
        'carrier_name': 'UPS',
        'estimated_delivery': 'February 20, 2024'
    }

def get_return_data():
    return {
        'customer_name': 'David Martinez',
        'order_number': 'BW-2024-12345',
        'return_window': '30 days',
        'return_portal_url': 'https://banwee.com/returns/BW-2024-12345',
        'return_policy_url': 'https://banwee.com/return-policy',
        'carrier_name': 'UPS',
        'frontend_url': 'https://banwee.com'
    }

def get_marketing_data():
    return {
        'customer_name': 'Jessica Taylor',
        'sale_end_date': 'February 20, 2024',
        'discount_code': 'AFRICA20',
        'discount_amount': '20% off',
        'frontend_url': 'https://banwee.com',
        'featured_products': [
            {
                'name': 'Tanzanian Vanilla Beans',
                'price': '$29.99',
                'image_url': 'https://via.placeholder.com/200x200/61b482/ffffff?text=Vanilla'
            },
            {
                'name': 'Egyptian Cotton Scarf',
                'price': '$45.99',
                'image_url': 'https://via.placeholder.com/200x200/253d4e/ffffff?text=Scarf'
            }
        ]
    }

def get_legal_data():
    return {
        'customer_name': 'Robert Anderson',
        'policy_name': 'Privacy Policy',
        'effective_date': 'March 1, 2024',
        'changes_summary': 'Updated data processing and cookie usage policies',
        'policy_url': 'https://banwee.com/privacy-policy',
        'frontend_url': 'https://banwee.com'
    }

# Template routes by category
@app.route('/')
def index():
    """Main page listing all available templates."""
    templates = {
        'Account Templates': [
            ('/account/activation', 'Email Activation'),
            ('/account/welcome', 'Welcome Email'),
            ('/account/password_reset', 'Password Reset'),
            ('/account/email_change', 'Email Change Confirmation'),
            ('/account/login_alert', 'Login Alert'),
            ('/account/onboarding', 'Onboarding'),
            ('/account/profile_update', 'Profile Update'),
            ('/account/subscription_renewal', 'Subscription Renewal'),
            ('/account/subscription_shipment', 'Subscription Shipment'),
            ('/account/unsubscribe_confirmation', 'Unsubscribe Confirmation')
        ],
        'Pre-Purchase Templates': [
            ('/pre/cart_abandonment', 'Cart Abandonment'),
            ('/pre/browse_abandonment', 'Browse Abandonment'),
            ('/pre/back_in_stock', 'Back in Stock'),
            ('/pre/price_drop', 'Price Drop'),
            ('/pre/product_launch', 'Product Launch'),
            ('/pre/store_launch', 'Store Launch'),
            ('/pre/wishlist_reminder', 'Wishlist Reminder')
        ],
        'Purchase Templates': [
            ('/purchase/order_confirmation', 'Order Confirmation'),
            ('/purchase/order_delivered', 'Order Delivered'),
            ('/purchase/digital_delivery', 'Digital Delivery')
        ],
        'Post-Purchase Templates': [
            ('/post/thank_you', 'Thank You'),
            ('/post/invoice_template', 'Invoice'),
            ('/post/review_request', 'Review Request'),
            ('/post/referral_request', 'Referral Request'),
            ('/post/reorder_reminder', 'Reorder Reminder'),
            ('/post/product_tips', 'Product Tips'),
            ('/post/return_process', 'Return Process'),
            ('/post/warranty_reminder', 'Warranty Reminder')
        ],
        'Marketing Templates': [
            ('/marketing/newsletter', 'Newsletter'),
            ('/marketing/flash_sale', 'Flash Sale'),
            ('/marketing/holiday_campaign', 'Holiday Campaign'),
            ('/marketing/birthday_offer', 'Birthday Offer'),
            ('/marketing/cross_sell', 'Cross-Sell'),
            ('/marketing/event_invite', 'Event Invite')
        ],
        'Legal Templates': [
            ('/legal/policy_update', 'Policy Update'),
            ('/legal/gdpr_confirmation', 'GDPR Confirmation'),
            ('/legal/cookie_settings', 'Cookie Settings')
        ]
    }
    
    return render_template('template_list.html', templates=templates)

# Account template routes
@app.route('/account/activation')
def account_activation():
    return render_template('account/activation.html', **get_account_data())

@app.route('/account/welcome')
def account_welcome():
    return render_template('account/welcome.html', **get_account_data())

@app.route('/account/password_reset')
def account_password_reset():
    return render_template('account/password_reset.html', **get_account_data())

@app.route('/account/email_change')
def account_email_change():
    data = get_account_data()
    data['new_email'] = 'sarah.johnson.new@example.com'
    data['old_email'] = 'sarah.johnson.old@example.com'
    return render_template('account/email_change.html', **data)

@app.route('/account/login_alert')
def account_login_alert():
    data = get_account_data()
    data['login_time'] = datetime.now().strftime('%B %d, %Y at %I:%M %p')
    data['login_location'] = 'New York, NY'
    data['login_device'] = 'Chrome on macOS'
    data['ip_address'] = '192.168.1.100'
    data['security_page_url'] = 'https://banwee.com/security'
    return render_template('account/login_alert.html', **data)

@app.route('/account/onboarding')
def account_onboarding():
    data = get_account_data()
    data['onboarding_steps'] = [
        {
            'title': 'Complete Your Profile',
            'description': 'Add your shipping preferences and payment methods',
            'url': 'https://banwee.com/profile',
            'cta_text': 'Complete Profile →'
        },
        {
            'title': 'Browse Products',
            'description': 'Explore our selection of authentic African products',
            'url': 'https://banwee.com/products',
            'cta_text': 'Start Shopping →'
        },
        {
            'title': 'Make Your First Purchase',
            'description': 'Get 10% off your first order with code WELCOME10',
            'url': 'https://banwee.com/products?discount=WELCOME10',
            'cta_text': 'Shop Now →'
        }
    ]
    data['main_dashboard_url'] = 'https://banwee.com/dashboard'
    return render_template('account/onboarding.html', **data)

@app.route('/account/profile_update')
def account_profile_update():
    data = get_account_data()
    data['updated_fields'] = {
        'email': 'sarah.johnson.new@example.com',
        'phone_number': '+1 (555) 123-4567'
    }
    data['profile_url'] = 'https://banwee.com/profile'
    return render_template('account/profile_update.html', **data)

@app.route('/account/subscription_renewal')
def account_subscription_renewal():
    data = get_account_data()
    data['renewal_date'] = (datetime.now() + timedelta(days=30)).strftime('%B %d, %Y')
    data['subscription_tier'] = 'Premium'
    data['subscription_price'] = '$19.99/month'
    return render_template('account/subscription_renewal.html', **data)

@app.route('/account/subscription_shipment')
def account_subscription_shipment():
    data = get_order_data()
    data['subscription_box_name'] = 'African Discovery Box - February 2024'
    data['shipment_date'] = datetime.now()
    data['tracking_url'] = f"https://banwee.com/track/{data['tracking_number']}"
    data['renewal_url'] = 'https://banwee.com/account/subscription'
    return render_template('account/subscription_shipment.html', **data)

@app.route('/account/unsubscribe_confirmation')
def account_unsubscribe_confirmation():
    data = get_account_data()
    data['re_subscribe_url'] = 'https://banwee.com/newsletter/signup'
    data['manage_preferences_url'] = 'https://banwee.com/preferences'
    return render_template('account/unsubscribe_confirmation.html', **data)

# Pre-purchase template routes
@app.route('/pre/cart_abandonment')
def pre_cart_abandonment():
    return render_template('pre_purchase/cart_abandonment.html', **get_cart_data())

@app.route('/pre/browse_abandonment')
def pre_browse_abandonment():
    data = get_marketing_data()
    data['browsed_products'] = [
        {
            'name': 'Nigerian Shea Butter',
            'price': '$16.99',
            'image_url': 'https://via.placeholder.com/200x200/61b482/ffffff?text=Shea'
        }
    ]
    return render_template('pre_purchase/browse_abandonment.html', **data)

@app.route('/pre/back_in_stock')
def pre_back_in_stock():
    data = get_marketing_data()
    data['product_name'] = 'Madagascar Vanilla Extract'
    data['product_price'] = '$34.99'
    data['product_url'] = 'https://banwee.com/products/vanilla-extract'
    data['product_image'] = 'https://via.placeholder.com/200x200/61b482/ffffff?text=Vanilla'
    return render_template('pre_purchase/back_in_stock.html', **data)

@app.route('/pre/price_drop')
def pre_price_drop():
    data = get_marketing_data()
    data['product_name'] = 'Ethiopian Honey Wine'
    data['old_price'] = '$45.99'
    data['new_price'] = '$32.99'
    data['discount_percentage'] = '28%'
    return render_template('pre_purchase/price_drop.html', **data)

@app.route('/pre/product_launch')
def pre_product_launch():
    data = get_marketing_data()
    data['product_name'] = 'Ugandan Gorilla Friendly Coffee'
    data['launch_date'] = 'February 25, 2024'
    data['early_bird_discount'] = '15% off'
    return render_template('pre_purchase/product_launch.html', **data)

@app.route('/pre/store_launch')
def pre_store_launch():
    data = get_marketing_data()
    data['launch_date'] = 'March 1, 2024'
    data['grand_opening_discount'] = '25% off'
    return render_template('pre_purchase/store_launch.html', **data)

@app.route('/pre/wishlist_reminder')
def pre_wishlist_reminder():
    data = get_marketing_data()
    data['wishlist_items'] = [
        {
            'name': 'Senegal Baobab Powder',
            'price': '$22.99',
            'image_url': 'https://via.placeholder.com/200x200/61b482/ffffff?text=Baobab'
        }
    ]
    return render_template('pre_purchase/wishlist_reminder.html', **data)

# Purchase template routes
@app.route('/purchase/order_confirmation')
def purchase_order_confirmation():
    return render_template('purchase/order_confirmation.html', **get_order_data())

@app.route('/purchase/order_delivered')
def purchase_order_delivered():
    data = get_order_data()
    data['delivery_date'] = datetime.now().strftime('%B %d, %Y')
    return render_template('purchase/order_delivered.html', **data)

@app.route('/purchase/digital_delivery')
def purchase_digital_delivery():
    data = get_order_data()
    data['digital_products'] = [
        {
            'name': 'African Cooking E-Book',
            'download_url': 'https://banwee.com/downloads/cookbook.pdf'
        }
    ]
    return render_template('purchase/digital_delivery.html', **data)

# Post-purchase template routes
@app.route('/post/thank_you')
def post_thank_you():
    return render_template('post_purchase/thank_you.html', **get_order_data())

@app.route('/post/invoice_template')
def post_invoice_template():
    data = get_order_data()
    data['invoice_number'] = f"INV-{data['order_number']}"
    data['due_date'] = (datetime.now() + timedelta(days=30)).strftime('%B %d, %Y')
    return render_template('post_purchase/invoice_template.html', **data)

@app.route('/post/review_request')
def post_review_request():
    data = get_order_data()
    data['review_url'] = f"https://banwee.com/review/{data['order_number']}"
    return render_template('post_purchase/review_request.html', **data)

@app.route('/post/referral_request')
def post_referral_request():
    data = get_account_data()
    data['referral_code'] = 'FRIEND10'
    data['referral_discount'] = '$10 off'
    return render_template('post_purchase/referral_request.html', **data)

@app.route('/post/reorder_reminder')
def post_reorder_reminder():
    data = get_order_data()
    data['reorder_url'] = 'https://banwee.com/reorder'
    data['days_since_purchase'] = '45'
    return render_template('post_purchase/reorder_reminder.html', **data)

@app.route('/post/product_tips')
def post_product_tips():
    data = get_order_data()
    data['product_tips'] = [
        'Store coffee beans in an airtight container away from sunlight',
        'Grind only what you need for maximum freshness'
    ]
    return render_template('post_purchase/product_tips.html', **data)

@app.route('/post/return_process')
def post_return_process():
    return render_template('post_purchase/return_process.html', **get_return_data())

@app.route('/post/warranty_reminder')
def post_warranty_reminder():
    data = get_order_data()
    data['warranty_expiry'] = (datetime.now() + timedelta(days=365)).strftime('%B %d, %Y')
    data['warranty_url'] = 'https://banwee.com/warranty'
    return render_template('post_purchase/warranty_reminder.html', **data)

# Marketing template routes
@app.route('/marketing/newsletter')
def marketing_newsletter():
    data = get_marketing_data()
    data['newsletter_content'] = 'Discover the finest African products this month!'
    return render_template('marketing/newsletter.html', **data)

@app.route('/marketing/flash_sale')
def marketing_flash_sale():
    data = get_marketing_data()
    data['sale_percentage'] = '40% OFF'
    data['sale_duration'] = '48 hours'
    return render_template('marketing/flash_sale.html', **data)

@app.route('/marketing/holiday_campaign')
def marketing_holiday_campaign():
    data = get_marketing_data()
    data['holiday_name'] = 'African Heritage Day'
    data['special_offer'] = 'Free shipping on orders over $50'
    return render_template('marketing/holiday_campaign.html', **data)

@app.route('/marketing/birthday_offer')
def marketing_birthday_offer():
    data = get_account_data()
    data['birthday_discount'] = '25% OFF'
    data['birthday_gift'] = 'Free shipping'
    return render_template('marketing/birthday_offer.html', **data)

@app.route('/marketing/cross_sell')
def marketing_cross_sell():
    data = get_order_data()
    data['recommended_products'] = [
        {
            'name': 'Tanzanian Spiced Tea',
            'price': '$12.99',
            'image_url': 'https://via.placeholder.com/200x200/61b482/ffffff?text=Tea'
        }
    ]
    return render_template('marketing/cross_sell.html', **data)

@app.route('/marketing/event_invite')
def marketing_event_invite():
    data = get_marketing_data()
    data['event_name'] = 'African Food Tasting Event'
    data['event_date'] = 'March 15, 2024'
    data['event_location'] = 'Banwee Store, New York'
    return render_template('marketing/event_invite.html', **data)

# Legal template routes
@app.route('/legal/policy_update')
def legal_policy_update():
    data = get_legal_data()
    data['changes_summary'] = 'We have updated our privacy policy to enhance transparency about data collection and usage.'
    return render_template('legal/policy_update.html', **data)
@app.route('/legal/cookie_settings')
def legal_cookie_settings():
    data = get_legal_data()
    data['company_name'] = 'Banwee'
    data['performance_cookies_enabled'] = True
    data['functional_cookies_enabled'] = True
    data['targeting_cookies_enabled'] = False
    data['cookie_policy_url'] = 'https://banwee.com/cookie-policy'
    return render_template('legal/cookie_settings.html', **data)

@app.route('/legal/gdpr_confirmation')
def legal_gdpr_confirmation():
    data = get_legal_data()
    data['gdpr_policy_url'] = 'https://banwee.com/gdpr-policy'
    return render_template('legal/gdpr_confirmation.html', **data)

# API endpoint to get all template data as JSON
@app.route('/api/templates')
def api_templates():
    """Return all template data as JSON for easy testing."""
    return jsonify({
        'account': get_account_data(),
        'cart': get_cart_data(),
        'order': get_order_data(),
        'return': get_return_data(),
        'marketing': get_marketing_data(),
        'legal': get_legal_data()
    })

if __name__ == '__main__':
    print("🌍 Starting Banwee Template Server")
    print("=" * 50)
    print("📧 Available at: http://localhost:5001")
    print("📋 Template index: http://localhost:5001/")
    print("🔧 API endpoint: http://localhost:5001/api/templates")
    print("=" * 50)
    print("\n📝 Template Categories:")
    print("  Account: /account/*")
    print("  Pre-Purchase: /pre/*")
    print("  Purchase: /purchase/*")
    print("  Post-Purchase: /post/*")
    print("  Marketing: /marketing/*")
    print("  Legal: /legal/*")
    print("\n🚀 Server starting...")
    
    app.run(debug=True, host='0.0.0.0', port=5001)
