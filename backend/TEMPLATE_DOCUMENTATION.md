# Jinja Template System Documentation

## Overview

The Banwee platform uses Jinja2 templates for generating emails and exports, replacing the previous ReportLab-based system. This provides better maintainability, flexibility, and performance while ensuring backward compatibility with existing APIs.

## Template Structure

### Email Templates

Email templates are located in `templates/emails/` and follow this structure:

```html
{% extends "emails/base_email.html" %}

{% block content %}
<h2>{{ title }}</h2>
<p>Hello {{ user_name }},</p>
<!-- Email content -->
{% endblock %}
```

### Export Templates

Export templates are located in `templates/exports/` and support multiple formats:

- **HTML**: For web display and PDF generation
- **CSV**: For spreadsheet import (future enhancement)
- **JSON**: For API responses (future enhancement)

## Available Variables

### Common Variables

All templates have access to these common variables:

- `company_name`: Company name (default: "Banwee")
- `support_email`: Support email address (default: "support@banwee.com")
- `current_year`: Current year
- `generated_at`: Generation timestamp

### Email-Specific Variables

#### Payment Confirmation Emails
- `user_name`: Recipient's name
- `user_email`: Recipient's email address
- `payment_amount`: Payment amount
- `currency`: Payment currency
- `subscription_id`: Related subscription ID
- `payment_method`: Payment method used
- `transaction_id`: Transaction reference
- `billing_date`: Next billing date

#### Subscription Cost Change Emails
- `user_name`: Customer name
- `old_cost`: Previous subscription cost
- `new_cost`: New subscription cost
- `cost_difference`: Difference in cost (positive or negative)
- `change_reason`: Reason for the cost change
- `subscription_management_url`: Link to manage subscription

#### Payment Failure Emails
- `user_name`: Customer name
- `payment_amount`: Failed payment amount
- `currency`: Payment currency
- `failure_reason`: Reason for payment failure
- `retry_url`: Link to retry payment
- `subscription_id`: Related subscription ID

#### Payment Method Expiring Emails
- `user_name`: Customer name
- `card_last_four`: Last four digits of expiring card
- `expiry_date`: Card expiration date
- `update_payment_url`: Link to update payment method

### Export-Specific Variables

#### Subscription Export
- `subscriptions`: List of subscription objects
- `summary`: Summary statistics object
- `filters`: Applied filters object
- `total_count`: Total number of subscriptions

#### Payment Export
- `payments`: List of payment objects
- `summary`: Payment summary statistics
- `filters`: Applied filters object
- `include_stripe_details`: Whether to include Stripe details

#### Invoice Template
- `invoice_number`: Invoice number
- `invoice_date`: Invoice date
- `due_date`: Payment due date
- `customer`: Customer information object
- `items`: List of invoice items
- `subtotal`: Subtotal amount
- `tax_amount`: Tax amount
- `total_amount`: Total amount due

## Custom Filters

The template system includes custom filters for common formatting:

### Currency Filter

```jinja2
{{ amount | currency }}          <!-- $29.99 -->
{{ amount | currency('EUR') }}   <!-- 29.99 EUR -->
```

### Date Filters

```jinja2
{{ date_value | date }}          <!-- December 23, 2024 -->
{{ datetime_value | datetime }}  <!-- December 23, 2024 at 2:30 PM -->
```

### Number Filters

```jinja2
{{ percentage_value | percentage }}  <!-- 10.5% -->
{{ number_value | number(1) }}       <!-- 123.4 -->
```

## Template Validation

All templates are automatically validated for:

- **Syntax errors**: Jinja2 syntax validation
- **Variable usage**: Required vs optional variables
- **Security issues**: XSS prevention, safe filter usage
- **Performance**: Loop complexity, filter usage
- **Accessibility**: HTML accessibility standards

### Running Template Validation

To validate all templates:

```bash
cd backend
python validate_templates.py
```

This will generate a validation report showing any issues found.

## Migration from ReportLab

### Completed Migration

The system has successfully migrated from ReportLab to Jinja templates:

- ✅ All email templates converted to Jinja2
- ✅ All export templates converted to Jinja2
- ✅ Custom filters implemented for formatting
- ✅ Template validation system implemented
- ✅ Backward compatibility maintained

### Migration Benefits

1. **Better Performance**: Jinja2 is faster than ReportLab for HTML generation
2. **Easier Maintenance**: Templates are easier to read and modify
3. **Better Security**: Built-in XSS protection with autoescape
4. **Flexibility**: Support for template inheritance and includes
5. **No Dependencies**: Removed ReportLab dependency

## API Compatibility

### Existing Export APIs

All existing export APIs continue to work with Jinja templates:

- `/api/exports/subscriptions` - Subscription export
- `/api/exports/payments` - Payment export
- `/api/exports/invoices` - Invoice generation

### Response Formats

APIs support multiple response formats through template selection:

```python
# HTML response (default)
GET /api/exports/subscriptions

# Future enhancements will support:
# CSV response  
GET /api/exports/subscriptions?format=csv

# JSON response
GET /api/exports/subscriptions?format=json
```

## Template Organization

### Current Template Structure

```
templates/
├── emails/
│   ├── base_email.html              # Base template for all emails
│   ├── payment_confirmation.html    # Payment success notification
│   ├── payment_failure.html         # Payment failure notification
│   ├── payment_method_expiring.html # Payment method expiration warning
│   └── subscription_cost_change.html # Subscription cost change notification
└── exports/
    ├── invoice_template.html        # Invoice generation
    ├── payments_export.html         # Payment data export
    └── subscriptions_export.html    # Subscription data export
```

### Template Inheritance

Email templates use inheritance for consistency:

```html
<!-- base_email.html -->
<!DOCTYPE html>
<html>
<head>
    <title>{{ title | default('Email from Banwee') }}</title>
    <!-- Common styles -->
</head>
<body>
    <div class="header">
        <h1>{{ company_name }}</h1>
    </div>
    
    <div class="content">
        {% block content %}{% endblock %}
    </div>
    
    <div class="footer">
        <!-- Common footer -->
    </div>
</body>
</html>
```

## Best Practices

### Template Development

1. **Use descriptive variable names**: `user_name` instead of `name`
2. **Provide default values**: `{{ title | default('Default Title') }}`
3. **Escape user input**: Automatic with autoescape enabled
4. **Use template inheritance**: Extend base templates for consistency
5. **Add comments**: Document complex template logic

### Variable Naming

- Use snake_case for variable names
- Provide default values for optional variables
- Document required variables in template comments
- Use descriptive names that indicate data type

### Performance

- Minimize complex loops and filters
- Pre-process data when possible
- Use template caching for frequently used templates
- Avoid deep nesting of conditionals

### Security

- Always escape user input (automatic with autoescape)
- Use `|safe` filter only with trusted content
- Validate template content before deployment
- Sanitize data before passing to templates

## Troubleshooting

### Common Issues

1. **Template not found**: Check file path and name
2. **Variable undefined**: Ensure all required variables are provided
3. **Rendering errors**: Validate template syntax
4. **Performance issues**: Check for complex loops or filters

### Validation Tools

Use the template validation service to check templates:

```bash
cd backend
python validate_templates.py
```

### Debugging

For development debugging, you can enable detailed error messages:

```python
from jinja2 import Environment, DebugUndefined

env = Environment(
    loader=FileSystemLoader('templates'),
    autoescape=True,
    undefined=DebugUndefined  # Shows undefined variables
)
```

## Template Service Usage

### In Python Code

```python
from services.jinja_template import JinjaTemplateService

# Initialize service
template_service = JinjaTemplateService()

# Render email template
email_result = await template_service.render_email_template(
    'emails/payment_confirmation.html',
    {
        'user_name': 'John Doe',
        'payment_amount': 29.99,
        'currency': 'USD'
    }
)

# Render export template
export_result = await template_service.render_export_template(
    'exports/subscriptions_export.html',
    {
        'subscriptions': subscription_data,
        'summary': summary_stats
    },
    'html'
)
```

### Template Validation

```python
from services.template_migration_service import TemplateMigrationService

# Initialize service
migration_service = TemplateMigrationService()

# Validate specific template
report = migration_service.validate_template_comprehensive('emails/payment_confirmation.html')

# Validate all templates
all_results = migration_service.validate_all_templates()
```

## Future Enhancements

### Planned Features

1. **Multi-format Export**: CSV and JSON template support
2. **Template Editor**: Web-based template editing interface
3. **A/B Testing**: Template variant testing
4. **Localization**: Multi-language template support
5. **Template Analytics**: Usage and performance metrics

### Extension Points

The template system is designed for easy extension:

- **Custom Filters**: Add domain-specific formatting
- **Template Functions**: Add reusable template functions
- **Template Loaders**: Support for database-stored templates
- **Caching**: Add template compilation caching

## Support

For template-related issues:

1. Check template validation report
2. Review template documentation
3. Test with sample data
4. Check server logs for detailed errors
5. Contact development team

## Version History

- **v1.0**: Initial Jinja2 migration from ReportLab
- **v1.1**: Added comprehensive validation system
- **v1.2**: Enhanced error handling and debugging
- **v1.3**: Added template documentation generation

---

*This documentation is automatically generated and updated with each template system change.*
*Last updated: December 23, 2024*