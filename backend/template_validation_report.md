# Template Validation Report

Generated: 2025-12-23T22:08:49.881193

## Summary

- Total templates: 8
- Valid templates: 8
- Invalid templates: 0

## Template Details

### emails/payment_confirmation.html - ✓ VALID

**Variables used:** subscription_id, payment_amount, payment_method, company_name, subscription_management_url, payment_date, cost_breakdown, user_name

### emails/payment_failure.html - ✓ VALID

**Variables used:** subscription_id, failure_reason, support_email, company_name, subscription_management_url, retry_url, user_name

### emails/subscription_cost_change.html - ✓ VALID

**Variables used:** change_reason, cost_difference, subscription_management_url, new_cost, company_name, old_cost, user_name

### emails/payment_method_expiring.html - ✓ VALID

**Variables used:** payment_method_last_four, payment_method_provider, expiry_date, company_name, update_payment_url, user_name

### emails/base_email.html - ✓ VALID

**Variables used:** company_name, subject, current_year, support_email

### exports/subscriptions_export.html - ✓ VALID

**Variables used:** subscriptions, summary, generated_at, company_name, current_year, filters

### exports/invoice_template.html - ✓ VALID

**Variables used:** subscription, company_name, due_date, company_address, current_year, invoice_date, invoice_number

### exports/payments_export.html - ✓ VALID

**Variables used:** include_stripe_details, payments, summary, generated_at, company_name, current_year, filters

