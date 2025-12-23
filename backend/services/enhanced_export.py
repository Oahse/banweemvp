"""
Enhanced Export Service using Jinja templates
"""
import io
import csv
import json
from typing import List, Dict, Any, Optional, Tuple
from datetime import datetime, date
from decimal import Decimal

from services.jinja_template import JinjaTemplateService
from pydantic import BaseModel


class ExportFilters(BaseModel):
    """Filters for export data"""
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    customer_id: Optional[str] = None
    subscription_status: Optional[str] = None
    payment_status: Optional[str] = None
    variant_ids: Optional[List[str]] = None


class ExportResult(BaseModel):
    """Result of export operation"""
    content: bytes
    content_type: str
    filename: str
    format_type: str
    generated_at: datetime


class PDFResult(BaseModel):
    """Result of PDF generation"""
    content: bytes
    filename: str
    generated_at: datetime


class ReportConfig(BaseModel):
    """Configuration for custom reports"""
    title: str
    description: Optional[str] = None
    data_sources: List[str]
    filters: ExportFilters
    format_type: str
    template_name: Optional[str] = None


class EnhancedExportService:
    """Enhanced export service using Jinja templates"""
    
    def __init__(self):
        self.template_service = JinjaTemplateService(template_dir="templates")
    
    async def export_subscription_data(
        self,
        subscriptions_data: List[Dict[str, Any]],
        filters: ExportFilters,
        format_type: str,
        template_name: Optional[str] = None
    ) -> ExportResult:
        """
        Export subscription data in various formats
        
        Args:
            subscriptions_data: List of subscription data dictionaries
            filters: Export filters applied
            format_type: Output format ("csv", "json", "html")
            template_name: Optional custom template name
            
        Returns:
            ExportResult with exported content
        """
        timestamp = datetime.now()
        
        if format_type == "csv":
            return await self._export_subscriptions_csv(subscriptions_data, filters, timestamp)
        elif format_type == "json":
            return await self._export_subscriptions_json(subscriptions_data, filters, timestamp)
        elif format_type == "html":
            template = template_name or "exports/subscriptions_export.html"
            return await self._export_subscriptions_html(subscriptions_data, filters, timestamp, template)
        else:
            raise ValueError(f"Unsupported format type: {format_type}")
    
    async def _export_subscriptions_csv(
        self,
        subscriptions_data: List[Dict[str, Any]],
        filters: ExportFilters,
        timestamp: datetime
    ) -> ExportResult:
        """Export subscriptions to CSV format"""
        output = io.StringIO()
        
        if not subscriptions_data:
            output.write("No subscription data to export\n")
        else:
            # Define CSV headers
            headers = [
                'Subscription ID', 'Customer Name', 'Customer Email', 'Status',
                'Total Cost', 'Currency', 'Delivery Type', 'Billing Cycle',
                'Variants', 'Admin Fee', 'Delivery Cost', 'Tax Amount',
                'Loyalty Discount', 'Created At', 'Next Billing Date'
            ]
            
            writer = csv.DictWriter(output, fieldnames=headers)
            writer.writeheader()
            
            for subscription in subscriptions_data:
                user = subscription.get('user', {})
                cost_breakdown = subscription.get('cost_breakdown', {})
                
                # Format variants list
                variants = subscription.get('variants', [])
                variant_names = [v.get('name', 'Unknown') for v in variants]
                
                writer.writerow({
                    'Subscription ID': subscription.get('id', ''),
                    'Customer Name': f"{user.get('firstname', '')} {user.get('lastname', '')}".strip(),
                    'Customer Email': user.get('email', ''),
                    'Status': subscription.get('status', ''),
                    'Total Cost': cost_breakdown.get('total_amount', 0),
                    'Currency': cost_breakdown.get('currency', 'USD'),
                    'Delivery Type': subscription.get('delivery_type', ''),
                    'Billing Cycle': subscription.get('billing_cycle', ''),
                    'Variants': '; '.join(variant_names),
                    'Admin Fee': cost_breakdown.get('admin_fee', 0),
                    'Delivery Cost': cost_breakdown.get('delivery_cost', 0),
                    'Tax Amount': cost_breakdown.get('tax_amount', 0),
                    'Loyalty Discount': cost_breakdown.get('loyalty_discount', 0),
                    'Created At': subscription.get('created_at', ''),
                    'Next Billing Date': subscription.get('next_billing_date', '')
                })
        
        content = output.getvalue().encode('utf-8')
        filename = f"subscriptions_export_{timestamp.strftime('%Y%m%d_%H%M%S')}.csv"
        
        return ExportResult(
            content=content,
            content_type='text/csv',
            filename=filename,
            format_type='csv',
            generated_at=timestamp
        )
    
    async def _export_subscriptions_json(
        self,
        subscriptions_data: List[Dict[str, Any]],
        filters: ExportFilters,
        timestamp: datetime
    ) -> ExportResult:
        """Export subscriptions to JSON format"""
        
        # Prepare export metadata
        export_data = {
            'metadata': {
                'generated_at': timestamp.isoformat(),
                'format': 'json',
                'filters_applied': filters.dict(exclude_none=True),
                'total_records': len(subscriptions_data)
            },
            'subscriptions': subscriptions_data
        }
        
        # Convert to JSON with proper serialization
        json_content = json.dumps(export_data, indent=2, default=self._json_serializer)
        content = json_content.encode('utf-8')
        filename = f"subscriptions_export_{timestamp.strftime('%Y%m%d_%H%M%S')}.json"
        
        return ExportResult(
            content=content,
            content_type='application/json',
            filename=filename,
            format_type='json',
            generated_at=timestamp
        )
    
    async def _export_subscriptions_html(
        self,
        subscriptions_data: List[Dict[str, Any]],
        filters: ExportFilters,
        timestamp: datetime,
        template_name: str
    ) -> ExportResult:
        """Export subscriptions to HTML format using Jinja template"""
        
        # Calculate summary statistics
        total_revenue = sum(
            sub.get('cost_breakdown', {}).get('total_amount', 0) 
            for sub in subscriptions_data
        )
        
        active_subscriptions = len([
            sub for sub in subscriptions_data 
            if sub.get('status') == 'active'
        ])
        
        context = {
            'subscriptions': subscriptions_data,
            'filters': filters.dict(exclude_none=True),
            'summary': {
                'total_subscriptions': len(subscriptions_data),
                'active_subscriptions': active_subscriptions,
                'total_revenue': total_revenue,
                'generated_at': timestamp
            },
            'company_name': 'Banwee'
        }
        
        rendered = await self.template_service.render_export_template(
            template_name=template_name,
            data=context,
            format_type='html'
        )
        
        content = rendered.content.encode('utf-8')
        filename = f"subscriptions_export_{timestamp.strftime('%Y%m%d_%H%M%S')}.html"
        
        return ExportResult(
            content=content,
            content_type='text/html',
            filename=filename,
            format_type='html',
            generated_at=timestamp
        )
    
    async def generate_invoice_pdf(
        self,
        subscription_id: str,
        subscription_data: Dict[str, Any],
        template_name: str = "exports/invoice_template.html"
    ) -> PDFResult:
        """
        Generate invoice PDF using Jinja template
        
        Args:
            subscription_id: ID of the subscription
            subscription_data: Subscription data including cost breakdown
            template_name: Template to use for invoice generation
            
        Returns:
            PDFResult with PDF content
        """
        timestamp = datetime.now()
        
        # Prepare invoice context
        context = {
            'subscription': subscription_data,
            'invoice_number': f"INV-{subscription_id[:8]}-{timestamp.strftime('%Y%m%d')}",
            'invoice_date': timestamp.strftime('%B %d, %Y'),
            'due_date': timestamp.strftime('%B %d, %Y'),  # Immediate for subscriptions
            'company_name': 'Banwee',
            'company_address': {
                'line1': '123 Business Street',
                'city': 'Business City',
                'state': 'BC',
                'zip': '12345',
                'country': 'USA'
            }
        }
        
        # Render HTML template
        rendered = await self.template_service.render_export_template(
            template_name=template_name,
            data=context,
            format_type='html'
        )
        
        # Convert HTML to PDF using WeasyPrint
        try:
            from weasyprint import HTML
            pdf_bytes = HTML(string=rendered.content).write_pdf()
        except ImportError:
            raise ImportError("WeasyPrint is required for PDF generation. Install it with: pip install weasyprint")
        
        filename = f"invoice_{subscription_id[:8]}_{timestamp.strftime('%Y%m%d')}.pdf"
        
        return PDFResult(
            content=pdf_bytes,
            filename=filename,
            generated_at=timestamp
        )
    
    async def create_custom_report(
        self,
        report_config: ReportConfig,
        data: Dict[str, Any]
    ) -> ExportResult:
        """
        Create a custom report using specified configuration
        
        Args:
            report_config: Report configuration
            data: Data to include in the report
            
        Returns:
            ExportResult with the generated report
        """
        timestamp = datetime.now()
        
        # Use custom template or default based on format
        if report_config.template_name:
            template_name = report_config.template_name
        else:
            template_name = f"exports/custom_report.{report_config.format_type}"
        
        context = {
            'report_config': report_config.dict(),
            'data': data,
            'generated_at': timestamp,
            'company_name': 'Banwee'
        }
        
        if report_config.format_type == "html":
            rendered = await self.template_service.render_export_template(
                template_name=template_name,
                data=context,
                format_type='html'
            )
            
            content = rendered.content.encode('utf-8')
            content_type = 'text/html'
            
        elif report_config.format_type == "json":
            json_content = json.dumps(context, indent=2, default=self._json_serializer)
            content = json_content.encode('utf-8')
            content_type = 'application/json'
            
        else:
            raise ValueError(f"Unsupported custom report format: {report_config.format_type}")
        
        filename = f"custom_report_{timestamp.strftime('%Y%m%d_%H%M%S')}.{report_config.format_type}"
        
        return ExportResult(
            content=content,
            content_type=content_type,
            filename=filename,
            format_type=report_config.format_type,
            generated_at=timestamp
        )
    
    def _json_serializer(self, obj):
        """JSON serializer for special types"""
        if isinstance(obj, (datetime, date)):
            return obj.isoformat()
        elif isinstance(obj, Decimal):
            return float(obj)
        raise TypeError(f"Object of type {type(obj)} is not JSON serializable")
    
    async def export_payment_data(
        self,
        payments_data: List[Dict[str, Any]],
        filters: ExportFilters,
        format_type: str,
        include_stripe_details: bool = True
    ) -> ExportResult:
        """
        Export payment data with Stripe transaction details
        
        Args:
            payments_data: List of payment data dictionaries
            filters: Export filters applied
            format_type: Output format ("csv", "json", "html")
            include_stripe_details: Whether to include Stripe transaction details
            
        Returns:
            ExportResult with exported payment data
        """
        timestamp = datetime.now()
        
        if format_type == "csv":
            return await self._export_payments_csv(payments_data, filters, timestamp, include_stripe_details)
        elif format_type == "json":
            return await self._export_payments_json(payments_data, filters, timestamp, include_stripe_details)
        elif format_type == "html":
            return await self._export_payments_html(payments_data, filters, timestamp, include_stripe_details)
        else:
            raise ValueError(f"Unsupported format type: {format_type}")
    
    async def _export_payments_csv(
        self,
        payments_data: List[Dict[str, Any]],
        filters: ExportFilters,
        timestamp: datetime,
        include_stripe_details: bool
    ) -> ExportResult:
        """Export payments to CSV format"""
        output = io.StringIO()
        
        if not payments_data:
            output.write("No payment data to export\n")
        else:
            # Define CSV headers
            headers = [
                'Payment ID', 'Subscription ID', 'Customer Name', 'Customer Email',
                'Amount', 'Currency', 'Status', 'Payment Method', 'Created At'
            ]
            
            if include_stripe_details:
                headers.extend([
                    'Stripe Payment Intent ID', 'Stripe Status', 'Stripe Fee',
                    'Net Amount', 'Failure Reason'
                ])
            
            writer = csv.DictWriter(output, fieldnames=headers)
            writer.writeheader()
            
            for payment in payments_data:
                user = payment.get('user', {})
                stripe_details = payment.get('stripe_details', {}) if include_stripe_details else {}
                
                row_data = {
                    'Payment ID': payment.get('id', ''),
                    'Subscription ID': payment.get('subscription_id', ''),
                    'Customer Name': f"{user.get('firstname', '')} {user.get('lastname', '')}".strip(),
                    'Customer Email': user.get('email', ''),
                    'Amount': payment.get('amount', 0),
                    'Currency': payment.get('currency', 'USD'),
                    'Status': payment.get('status', ''),
                    'Payment Method': payment.get('payment_method', ''),
                    'Created At': payment.get('created_at', '')
                }
                
                if include_stripe_details:
                    row_data.update({
                        'Stripe Payment Intent ID': stripe_details.get('payment_intent_id', ''),
                        'Stripe Status': stripe_details.get('status', ''),
                        'Stripe Fee': stripe_details.get('fee', 0),
                        'Net Amount': stripe_details.get('net_amount', 0),
                        'Failure Reason': stripe_details.get('failure_reason', '')
                    })
                
                writer.writerow(row_data)
        
        content = output.getvalue().encode('utf-8')
        filename = f"payments_export_{timestamp.strftime('%Y%m%d_%H%M%S')}.csv"
        
        return ExportResult(
            content=content,
            content_type='text/csv',
            filename=filename,
            format_type='csv',
            generated_at=timestamp
        )
    
    async def _export_payments_json(
        self,
        payments_data: List[Dict[str, Any]],
        filters: ExportFilters,
        timestamp: datetime,
        include_stripe_details: bool
    ) -> ExportResult:
        """Export payments to JSON format"""
        
        export_data = {
            'metadata': {
                'generated_at': timestamp.isoformat(),
                'format': 'json',
                'filters_applied': filters.dict(exclude_none=True),
                'total_records': len(payments_data),
                'includes_stripe_details': include_stripe_details
            },
            'payments': payments_data
        }
        
        json_content = json.dumps(export_data, indent=2, default=self._json_serializer)
        content = json_content.encode('utf-8')
        filename = f"payments_export_{timestamp.strftime('%Y%m%d_%H%M%S')}.json"
        
        return ExportResult(
            content=content,
            content_type='application/json',
            filename=filename,
            format_type='json',
            generated_at=timestamp
        )
    
    async def _export_payments_html(
        self,
        payments_data: List[Dict[str, Any]],
        filters: ExportFilters,
        timestamp: datetime,
        include_stripe_details: bool
    ) -> ExportResult:
        """Export payments to HTML format"""
        
        # Calculate summary statistics
        total_amount = sum(payment.get('amount', 0) for payment in payments_data)
        successful_payments = len([p for p in payments_data if p.get('status') == 'succeeded'])
        
        context = {
            'payments': payments_data,
            'filters': filters.dict(exclude_none=True),
            'include_stripe_details': include_stripe_details,
            'summary': {
                'total_payments': len(payments_data),
                'successful_payments': successful_payments,
                'total_amount': total_amount,
                'success_rate': (successful_payments / len(payments_data) * 100) if payments_data else 0,
                'generated_at': timestamp
            },
            'company_name': 'Banwee'
        }
        
        rendered = await self.template_service.render_export_template(
            template_name="exports/payments_export.html",
            data=context,
            format_type='html'
        )
        
        content = rendered.content.encode('utf-8')
        filename = f"payments_export_{timestamp.strftime('%Y%m%d_%H%M%S')}.html"
        
        return ExportResult(
            content=content,
            content_type='text/html',
            filename=filename,
            format_type='html',
            generated_at=timestamp
        )