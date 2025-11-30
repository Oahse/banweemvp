# Banwee Email Template Customization Guide

## Overview
This guide provides instructions for customizing all email templates with Banwee branding, colors, fonts, and logo.

## Brand Identity

### Colors
```css
/* Primary Colors */
--banwee-green: #10b981;        /* Main brand color */
--banwee-green-dark: #059669;   /* Hover states, dark mode */
--banwee-green-light: #34d399;  /* Accents, highlights */
--banwee-green-bg: #d1fae5;     /* Light backgrounds */

/* Neutral Colors */
--background: #f9fafb;          /* Page background */
--surface: #ffffff;             /* Card/container background */
--border: #e5e7eb;              /* Borders */
--text-main: #111827;           /* Primary text */
--text-light: #6b7280;          /* Secondary text */
--text-lighter: #9ca3af;        /* Tertiary text */

/* Status Colors */
--success: #10b981;             /* Success messages */
--error: #ef4444;               /* Error messages */
--warning: #f59e0b;             /* Warning messages */
--info: #3b82f6;                /* Info messages */
```

### Typography
```css
/* Font Family */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;

/* Font Sizes */
--heading-1: 32px;              /* Main headings */
--heading-2: 24px;              /* Section headings */
--heading-3: 20px;              /* Sub-headings */
--body: 16px;                   /* Body text */
--small: 14px;                  /* Small text */
--tiny: 12px;                   /* Footer text */

/* Font Weights */
--regular: 400;
--medium: 500;
--semibold: 600;
--bold: 700;
```

### Logo
- **File:** `frontend/public/banwe_logo_green.png`
- **Recommended Width:** 150-180px for email headers
- **Alt Text:** "Banwee"
- **CDN URL:** Upload to your CDN and use that URL in templates

## Global Template Structure

### Base Template (Apply to All)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ subject }}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #111827;
            background-color: #f9fafb;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background-color: #10b981;
            padding: 40px 40px 30px;
            text-align: center;
        }
        .header img {
            max-width: 150px;
            height: auto;
            margin-bottom: 15px;
        }
        .header h1 {
            color: #ffffff;
            font-size: 28px;
            font-weight: 700;
            margin: 0;
            line-height: 1.2;
        }
        .content {
            padding: 40px;
        }
        .content p {
            margin-bottom: 16px;
            font-size: 16px;
            color: #111827;
        }
        .button {
            display: inline-block;
            background-color: #10b981;
            color: #ffffff;
            padding: 14px 28px;
            text-decoration: none;
            border-radius: 6px;
            font-size: 16px;
            font-weight: 600;
            transition: background-color 0.3s ease;
        }
        .button:hover {
            background-color: #059669;
        }
        .footer {
            background-color: #f9fafb;
            padding: 30px 40px;
            text-align: center;
            border-top: 1px solid: #e5e7eb;
        }
        .footer p {
            margin: 0 0 10px;
            font-size: 14px;
            color: #6b7280;
        }
        .footer a {
            color: #10b981;
            text-decoration: none;
        }
        .footer a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <img src="https://your-cdn.com/banwe_logo_white.png" alt="Banwee">
            <h1>{{ email_title }}</h1>
        </div>

        <!-- Content -->
        <div class="content">
            <!-- Email-specific content here -->
        </div>

        <!-- Footer -->
        <div class="footer">
            <p>&copy; 2024 Banwee. All rights reserved.</p>
            <p>
                <a href="{{ store_url }}">Visit Store</a> |
                <a href="{{ support_url }}">Support</a> |
                <a href="{{ unsubscribe_url }}">Unsubscribe</a>
            </p>
            <p style="font-size: 12px; color: #9ca3af; margin-top: 15px;">
                Banwee E-commerce Platform<br>
                This email was sent to {{ user_email }}
            </p>
        </div>
    </div>
</body>
</html>
```

## Component Styles

### Buttons

```html
<!-- Primary Button -->
<a href="{{ button_url }}" class="button" style="display: inline-block; background-color: #10b981; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: 600;">
    {{ button_text }}
</a>

<!-- Secondary Button -->
<a href="{{ button_url }}" style="display: inline-block; background-color: transparent; color: #10b981; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: 600; border: 2px solid #10b981;">
    {{ button_text }}
</a>
```

### Info Boxes

```html
<!-- Success Box -->
<div style="background-color: #d1fae5; border-left: 4px solid #10b981; padding: 16px; border-radius: 4px; margin: 20px 0;">
    <p style="margin: 0; color: #065f46; font-weight: 600;">{{ success_message }}</p>
</div>

<!-- Warning Box -->
<div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 4px; margin: 20px 0;">
    <p style="margin: 0; color: #92400e; font-weight: 600;">{{ warning_message }}</p>
</div>

<!-- Error Box -->
<div style="background-color: #fee2e2; border-left: 4px solid #ef4444; padding: 16px; border-radius: 4px; margin: 20px 0;">
    <p style="margin: 0; color: #991b1b; font-weight: 600;">{{ error_message }}</p>
</div>

<!-- Info Box -->
<div style="background-color: #dbeafe; border-left: 4px solid #3b82f6; padding: 16px; border-radius: 4px; margin: 20px 0;">
    <p style="margin: 0; color: #1e40af; font-weight: 600;">{{ info_message }}</p>
</div>
```

### Order Summary Table

```html
<table style="width: 100%; border-collapse: collapse; margin: 20px 0; background-color: #f9fafb; border-radius: 8px; overflow: hidden;">
    <thead>
        <tr style="background-color: #10b981;">
            <th style="padding: 12px; text-align: left; color: #ffffff; font-weight: 600;">Item</th>
            <th style="padding: 12px; text-align: center; color: #ffffff; font-weight: 600;">Qty</th>
            <th style="padding: 12px; text-align: right; color: #ffffff; font-weight: 600;">Price</th>
        </tr>
    </thead>
    <tbody>
        {% for item in items %}
        <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px; color: #111827;">{{ item.name }}</td>
            <td style="padding: 12px; text-align: center; color: #6b7280;">{{ item.quantity }}</td>
            <td style="padding: 12px; text-align: right; color: #111827; font-weight: 600;">${{ item.price }}</td>
        </tr>
        {% endfor %}
        <tr style="background-color: #ffffff;">
            <td colspan="2" style="padding: 16px; text-align: right; font-weight: 700; color: #111827;">Total:</td>
            <td style="padding: 16px; text-align: right; font-weight: 700; color: #10b981; font-size: 18px;">${{ total }}</td>
        </tr>
    </tbody>
</table>
```

### Product Card

```html
<table style="width: 100%; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; margin: 20px 0;">
    <tr>
        <td style="width: 120px; padding: 0;">
            <img src="{{ product.image }}" alt="{{ product.name }}" style="width: 120px; height: 120px; object-fit: cover; display: block;">
        </td>
        <td style="padding: 16px;">
            <h3 style="margin: 0 0 8px; font-size: 18px; color: #111827;">{{ product.name }}</h3>
            <p style="margin: 0 0 8px; font-size: 14px; color: #6b7280;">{{ product.description }}</p>
            <p style="margin: 0; font-size: 20px; font-weight: 700; color: #10b981;">${{ product.price }}</p>
        </td>
    </tr>
</table>
```

### Divider

```html
<hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
```

## Template-Specific Customizations

### 1. Order Confirmation
**File:** `purchase/order_confirmation.html`

**Changes:**
- Replace `#28a745` with `#10b981`
- Replace `#4CAF50` with `#10b981`
- Replace `#45a049` with `#059669`
- Update logo URL
- Update company name to "Banwee"

### 2. Payment Receipt
**File:** `purchase/payment_receipt.html`

**Changes:**
- Use Banwee green for success indicators
- Add Banwee logo
- Update footer with Banwee branding

### 3. Shipping Update
**File:** `purchase/shipping_update.html`

**Changes:**
- Use info blue (#3b82f6) for tracking information
- Banwee green for action buttons
- Add tracking timeline with green progress indicators

### 4. Welcome Email
**File:** `account/welcome.html`

**Changes:**
- Large Banwee logo at top
- Warm welcome message
- Green CTA button: "Start Shopping"
- Feature highlights with green icons

### 5. Password Reset
**File:** `account/password_reset.html`

**Changes:**
- Security icon in Banwee green
- Clear reset button in green
- Expiry warning in orange
- Security tips section

## Logo Variations Needed

1. **White Logo** (for green header backgrounds)
   - Create white version of banwe_logo_green.png
   - Upload to CDN
   - Use in email headers

2. **Green Logo** (for white backgrounds)
   - Use existing banwe_logo_green.png
   - Use in email footers or light sections

## Email Footer Template

```html
<div class="footer" style="background-color: #f9fafb; padding: 30px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
    <!-- Logo -->
    <img src="https://your-cdn.com/banwe_logo_green.png" alt="Banwee" style="width: 100px; margin-bottom: 20px;">
    
    <!-- Links -->
    <p style="margin: 0 0 15px; font-size: 14px; color: #6b7280;">
        <a href="{{ store_url }}" style="color: #10b981; text-decoration: none; margin: 0 10px;">Shop</a>
        <a href="{{ store_url }}/about" style="color: #10b981; text-decoration: none; margin: 0 10px;">About</a>
        <a href="{{ store_url }}/contact" style="color: #10b981; text-decoration: none; margin: 0 10px;">Contact</a>
        <a href="{{ store_url }}/faq" style="color: #10b981; text-decoration: none; margin: 0 10px;">FAQ</a>
    </p>
    
    <!-- Social Media -->
    <p style="margin: 0 0 15px;">
        <a href="{{ social.facebook }}" style="margin: 0 8px;">
            <img src="https://your-cdn.com/icons/facebook-green.png" alt="Facebook" style="width: 24px; height: 24px;">
        </a>
        <a href="{{ social.twitter }}" style="margin: 0 8px;">
            <img src="https://your-cdn.com/icons/twitter-green.png" alt="Twitter" style="width: 24px; height: 24px;">
        </a>
        <a href="{{ social.instagram }}" style="margin: 0 8px;">
            <img src="https://your-cdn.com/icons/instagram-green.png" alt="Instagram" style="width: 24px; height: 24px;">
        </a>
    </p>
    
    <!-- Copyright -->
    <p style="margin: 0 0 10px; font-size: 14px; color: #6b7280;">
        &copy; 2024 Banwee. All rights reserved.
    </p>
    
    <!-- Unsubscribe -->
    <p style="margin: 0; font-size: 12px; color: #9ca3af;">
        <a href="{{ unsubscribe_url }}" style="color: #10b981; text-decoration: none;">Unsubscribe</a> |
        <a href="{{ privacy_url }}" style="color: #10b981; text-decoration: none;">Privacy Policy</a>
    </p>
    
    <!-- Address -->
    <p style="margin: 15px 0 0; font-size: 12px; color: #9ca3af;">
        Banwee E-commerce Platform<br>
        This email was sent to {{ user_email }}
    </p>
</div>
```

## Testing Checklist

- [ ] All templates use Banwee green (#10b981)
- [ ] Logo displays correctly (white on green, green on white)
- [ ] Buttons use correct hover states
- [ ] Typography is consistent across all templates
- [ ] Footer includes all necessary links
- [ ] Mobile responsive (test on small screens)
- [ ] Dark mode compatible (if applicable)
- [ ] All links work correctly
- [ ] Unsubscribe link present in all marketing emails
- [ ] Company name is "Banwee" everywhere

## Bulk Update Script

To update all templates at once, use this Python script:

```python
import os
import re

TEMPLATES_DIR = "backend/core/utils/messages/templates"

# Color replacements
COLOR_MAP = {
    '#28a745': '#10b981',  # Green
    '#4CAF50': '#10b981',  # Green
    '#45a049': '#059669',  # Dark green
    '#f4fcf4': '#d1fae5',  # Light green bg
    '#d4edda': '#10b981',  # Green border
}

# Company name replacement
COMPANY_REPLACEMENTS = {
    'Your Company Name': 'Banwee',
    'Our Company': 'Banwee',
    'our store': 'Banwee',
}

def update_template(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Replace colors
    for old_color, new_color in COLOR_MAP.items():
        content = content.replace(old_color, new_color)
    
    # Replace company names
    for old_name, new_name in COMPANY_REPLACEMENTS.items():
        content = content.replace(old_name, new_name)
    
    with open(filepath, 'w') as f:
        f.write(content)
    
    print(f"Updated: {filepath}")

# Walk through all template files
for root, dirs, files in os.walk(TEMPLATES_DIR):
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            update_template(filepath)

print("All templates updated!")
```

## Next Steps

1. Run the bulk update script
2. Manually review each template
3. Upload logo variations to CDN
4. Update logo URLs in templates
5. Test each email type
6. Get stakeholder approval
7. Deploy to production

## Support

For questions about email templates:
- Check Jinja2 documentation: https://jinja.palletsprojects.com/
- Email design best practices: https://www.emailonacid.com/blog/
- Resend documentation: https://resend.com/docs
