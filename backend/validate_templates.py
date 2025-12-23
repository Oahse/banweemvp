#!/usr/bin/env python3
"""
Template Validation Script

This script validates all existing Jinja templates to ensure they render correctly
and are compatible with the enhanced subscription payment system.

Requirements addressed:
- 16.5: Ensure all dynamic data renders correctly in migrated templates
- 16.6: Add template validation to prevent rendering errors
"""

import sys
import asyncio
import os
from pathlib import Path
from datetime import datetime
from typing import Dict, List, Set, Any

# Minimal imports to avoid Kafka initialization issues
from jinja2 import Environment, FileSystemLoader, select_autoescape, Template, TemplateError
from jinja2.meta import find_undeclared_variables


def validate_template(template_path: Path, env: Environment) -> Dict[str, Any]:
    """Validate a single template"""
    try:
        with open(template_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Parse template
        template = env.from_string(content)
        ast = env.parse(content)
        
        # Find variables
        undeclared = find_undeclared_variables(ast)
        
        # Generate sample data
        sample_data = {
            'company_name': 'Banwee',
            'support_email': 'support@banwee.com',
            'current_year': '2024',
            'user_name': 'John Doe',
            'user_email': 'john.doe@example.com',
            'subscription_id': 'sub_123456789',
            'amount': 29.99,
            'currency': 'USD',
            'generated_at': datetime.now(),
            'items': [
                {'name': 'Sample Item', 'price': 19.99, 'quantity': 2}
            ],
            'total_amount': 39.98,
            'subtotal': 39.98,
            'tax_amount': 3.20,
            'delivery_cost': 5.00,
            'cost_difference': 5.00,
            'old_cost': 34.98,
            'new_cost': 39.98,
            'change_reason': 'Admin percentage adjustment',
            'subscription_management_url': 'https://example.com/manage',
            'filters': {
                'date_range': 'Last 30 days',
                'status': 'active'
            },
            'summary': {
                'total_subscriptions': 150,
                'active_subscriptions': 120,
                'total_revenue': 4500.00,
                'total_payments': 200,
                'successful_payments': 195,
                'total_amount': 5000.00,
                'success_rate': 97.5
            },
            'subscriptions': [
                {
                    'id': 'sub_123456789',
                    'status': 'active',
                    'cost_breakdown': {
                        'total_amount': 39.98,
                        'subtotal': 34.98,
                        'admin_fee': 3.50,
                        'delivery_cost': 5.00,
                        'tax_amount': 3.20,
                        'loyalty_discount': 2.70,
                        'currency': 'USD'
                    },
                    'user': {
                        'firstname': 'John',
                        'lastname': 'Doe',
                        'email': 'john.doe@example.com'
                    },
                    'variants': [
                        {'name': 'Sample Variant 1'},
                        {'name': 'Sample Variant 2'}
                    ],
                    'billing_cycle': 'monthly',
                    'next_billing_date': datetime.now()
                }
            ],
            'payments': [
                {
                    'id': 'pay_123456789',
                    'subscription_id': 'sub_123456789',
                    'amount': 39.98,
                    'currency': 'USD',
                    'status': 'succeeded',
                    'payment_method': 'card',
                    'created_at': datetime.now(),
                    'user': {
                        'firstname': 'John',
                        'lastname': 'Doe',
                        'email': 'john.doe@example.com'
                    },
                    'stripe_details': {
                        'payment_intent_id': 'pi_1234567890abcdef',
                        'status': 'succeeded',
                        'fee': 1.20,
                        'net_amount': 38.78
                    }
                }
            ]
        }
        
        # Add any missing variables with defaults
        for var in undeclared:
            if var not in sample_data:
                sample_data[var] = f'sample_{var}'
        
        # Try to render
        rendered = template.render(**sample_data)
        
        return {
            'valid': True,
            'errors': [],
            'warnings': [],
            'variables': list(undeclared),
            'rendered_size': len(rendered)
        }
        
    except TemplateError as e:
        return {
            'valid': False,
            'errors': [f"Template syntax error: {e}"],
            'warnings': [],
            'variables': [],
            'rendered_size': 0
        }
    except Exception as e:
        return {
            'valid': False,
            'errors': [f"Validation error: {e}"],
            'warnings': [],
            'variables': [],
            'rendered_size': 0
        }


def main():
    """Main validation function"""
    print("Starting template validation...")
    
    # Setup Jinja environment
    template_dir = Path("templates")
    if not template_dir.exists():
        print(f"Template directory not found: {template_dir}")
        return 1
    
    env = Environment(
        loader=FileSystemLoader(str(template_dir)),
        autoescape=select_autoescape(['html', 'xml']),
        trim_blocks=True,
        lstrip_blocks=True
    )
    
    # Add custom filters
    def format_currency(value, currency="USD"):
        try:
            if currency == "USD":
                return f"${float(value):.2f}"
            return f"{float(value):.2f} {currency}"
        except:
            return str(value)
    
    def format_date(value):
        if hasattr(value, 'strftime'):
            return value.strftime('%B %d, %Y')
        return str(value)
    
    def format_datetime(value):
        if hasattr(value, 'strftime'):
            return value.strftime('%B %d, %Y at %I:%M %p')
        return str(value)
    
    env.filters['currency'] = format_currency
    env.filters['date'] = format_date
    env.filters['datetime'] = format_datetime
    
    # Find all templates
    templates = []
    for template_path in template_dir.rglob("*.html"):
        templates.append(template_path)
    
    print(f"Found {len(templates)} templates to validate")
    
    # Validate each template
    results = {}
    for template_path in templates:
        relative_path = template_path.relative_to(template_dir)
        print(f"Validating: {relative_path}")
        
        result = validate_template(template_path, env)
        results[str(relative_path)] = result
        
        if result['valid']:
            print(f"  ✓ Valid ({result['rendered_size']} chars, {len(result['variables'])} vars)")
        else:
            print(f"  ✗ Invalid")
            for error in result['errors']:
                print(f"    - {error}")
    
    # Generate summary
    total_templates = len(results)
    valid_templates = sum(1 for r in results.values() if r['valid'])
    
    print(f"\n{'='*50}")
    print("VALIDATION SUMMARY")
    print(f"{'='*50}")
    print(f"Total templates: {total_templates}")
    print(f"Valid templates: {valid_templates}")
    print(f"Invalid templates: {total_templates - valid_templates}")
    
    # List invalid templates
    invalid_templates = {k: v for k, v in results.items() if not v['valid']}
    if invalid_templates:
        print("\nInvalid templates:")
        for template_name, result in invalid_templates.items():
            print(f"  - {template_name}")
            for error in result['errors']:
                print(f"    {error}")
    
    # Generate documentation
    doc_content = f"""# Template Validation Report

Generated: {datetime.now().isoformat()}

## Summary

- Total templates: {total_templates}
- Valid templates: {valid_templates}
- Invalid templates: {total_templates - valid_templates}

## Template Details

"""
    
    for template_name, result in results.items():
        status = "✓ VALID" if result['valid'] else "✗ INVALID"
        doc_content += f"### {template_name} - {status}\n\n"
        
        if result['variables']:
            doc_content += f"**Variables used:** {', '.join(result['variables'])}\n\n"
        
        if result['errors']:
            doc_content += "**Errors:**\n"
            for error in result['errors']:
                doc_content += f"- {error}\n"
            doc_content += "\n"
        
        if result['warnings']:
            doc_content += "**Warnings:**\n"
            for warning in result['warnings']:
                doc_content += f"- {warning}\n"
            doc_content += "\n"
    
    # Save report
    with open('template_validation_report.md', 'w', encoding='utf-8') as f:
        f.write(doc_content)
    
    print(f"\nValidation report saved to: template_validation_report.md")
    
    if valid_templates == total_templates:
        print("✓ All templates are valid and ready for use")
        return 0
    else:
        print("✗ Some templates have validation issues")
        return 1


if __name__ == '__main__':
    sys.exit(main())