"""
Export service for generating CSV, Excel, and PDF files
"""
import csv
import io
from typing import List, Dict, Any
from datetime import datetime
from openpyxl import Workbook
from openpyxl.styles import Font, Alignment, PatternFill
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter, A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib.enums import TA_CENTER, TA_LEFT


class ExportService:
    """Service for exporting data to various formats"""
    
    @staticmethod
    def export_orders_to_csv(orders: List[Dict[str, Any]]) -> io.BytesIO:
        """Export orders to CSV format"""
        output = io.StringIO()
        
        if not orders:
            return io.BytesIO(b"No orders to export")
        
        # Define CSV headers
        headers = [
            'Order ID', 'Customer Name', 'Customer Email', 'Status', 
            'Payment Status', 'Total Amount', 'Items Count', 'Created At'
        ]
        
        writer = csv.DictWriter(output, fieldnames=headers)
        writer.writeheader()
        
        for order in orders:
            user = order.get('user', {})
            writer.writerow({
                'Order ID': order.get('id', ''),
                'Customer Name': f"{user.get('firstname', '')} {user.get('lastname', '')}".strip(),
                'Customer Email': user.get('email', ''),
                'Status': order.get('status', ''),
                'Payment Status': order.get('payment_status', ''),
                'Total Amount': f"${order.get('total_amount', 0):.2f}",
                'Items Count': len(order.get('items', [])),
                'Created At': order.get('created_at', '')
            })
        
        # Convert StringIO to BytesIO
        bytes_output = io.BytesIO(output.getvalue().encode('utf-8'))
        bytes_output.seek(0)
        return bytes_output
    
    @staticmethod
    def export_orders_to_excel(orders: List[Dict[str, Any]]) -> io.BytesIO:
        """Export orders to Excel format"""
        wb = Workbook()
        ws = wb.active
        ws.title = "Orders"
        
        # Define headers
        headers = [
            'Order ID', 'Customer Name', 'Customer Email', 'Status', 
            'Payment Status', 'Total Amount', 'Items Count', 'Created At'
        ]
        
        # Style for headers
        header_font = Font(bold=True, color="FFFFFF")
        header_fill = PatternFill(start_color="4472C4", end_color="4472C4", fill_type="solid")
        header_alignment = Alignment(horizontal="center", vertical="center")
        
        # Write headers
        for col_num, header in enumerate(headers, 1):
            cell = ws.cell(row=1, column=col_num, value=header)
            cell.font = header_font
            cell.fill = header_fill
            cell.alignment = header_alignment
        
        # Write data
        for row_num, order in enumerate(orders, 2):
            user = order.get('user', {})
            ws.cell(row=row_num, column=1, value=order.get('id', ''))
            ws.cell(row=row_num, column=2, value=f"{user.get('firstname', '')} {user.get('lastname', '')}".strip())
            ws.cell(row=row_num, column=3, value=user.get('email', ''))
            ws.cell(row=row_num, column=4, value=order.get('status', ''))
            ws.cell(row=row_num, column=5, value=order.get('payment_status', ''))
            ws.cell(row=row_num, column=6, value=order.get('total_amount', 0))
            ws.cell(row=row_num, column=7, value=len(order.get('items', [])))
            ws.cell(row=row_num, column=8, value=order.get('created_at', ''))
        
        # Adjust column widths
        column_widths = [15, 20, 30, 15, 15, 15, 12, 20]
        for col_num, width in enumerate(column_widths, 1):
            ws.column_dimensions[chr(64 + col_num)].width = width
        
        # Save to BytesIO
        output = io.BytesIO()
        wb.save(output)
        output.seek(0)
        return output
    
    @staticmethod
    def export_orders_to_pdf(orders: List[Dict[str, Any]]) -> io.BytesIO:
        """Export orders to PDF format"""
        output = io.BytesIO()
        doc = SimpleDocTemplate(output, pagesize=A4)
        elements = []
        
        # Styles
        styles = getSampleStyleSheet()
        title_style = ParagraphStyle(
            'CustomTitle',
            parent=styles['Heading1'],
            fontSize=24,
            textColor=colors.HexColor('#1a1a1a'),
            spaceAfter=30,
            alignment=TA_CENTER
        )
        
        # Title
        title = Paragraph("Orders Export Report", title_style)
        elements.append(title)
        
        # Export date
        date_text = Paragraph(
            f"<para align=center>Generated on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</para>",
            styles['Normal']
        )
        elements.append(date_text)
        elements.append(Spacer(1, 20))
        
        if not orders:
            no_data = Paragraph("<para align=center>No orders to export</para>", styles['Normal'])
            elements.append(no_data)
        else:
            # Summary
            total_revenue = sum(order.get('total_amount', 0) for order in orders)
            summary_text = f"<b>Total Orders:</b> {len(orders)} | <b>Total Revenue:</b> ${total_revenue:.2f}"
            summary = Paragraph(summary_text, styles['Normal'])
            elements.append(summary)
            elements.append(Spacer(1, 20))
            
            # Table data
            data = [['Order ID', 'Customer', 'Status', 'Amount', 'Date']]
            
            for order in orders:
                user = order.get('user', {})
                customer_name = f"{user.get('firstname', '')} {user.get('lastname', '')}".strip() or 'N/A'
                order_id = str(order.get('id', ''))[:8] + '...'  # Truncate for space
                
                data.append([
                    order_id,
                    customer_name,
                    order.get('status', ''),
                    f"${order.get('total_amount', 0):.2f}",
                    order.get('created_at', '')[:10]  # Date only
                ])
            
            # Create table
            table = Table(data, colWidths=[1.5*inch, 2*inch, 1.2*inch, 1*inch, 1.3*inch])
            
            # Table style
            table.setStyle(TableStyle([
                ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#4472C4')),
                ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
                ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
                ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
                ('FONTSIZE', (0, 0), (-1, 0), 12),
                ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
                ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
                ('GRID', (0, 0), (-1, -1), 1, colors.black),
                ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
                ('FONTSIZE', (0, 1), (-1, -1), 9),
                ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.lightgrey]),
            ]))
            
            elements.append(table)
        
        # Build PDF
        doc.build(elements)
        output.seek(0)
        return output
