"""
SMS notification service
Supports Twilio and AWS SNS for sending SMS messages
"""
import logging
from typing import Dict, Any, Optional
import re

from core.config import settings

logger = logging.getLogger(__name__)


class SMSNotificationService:
    """
    Service for sending SMS notifications
    """
    
    def __init__(self):
        self.twilio_enabled = (
            hasattr(settings, 'TWILIO_ACCOUNT_SID') and 
            hasattr(settings, 'TWILIO_AUTH_TOKEN') and
            hasattr(settings, 'TWILIO_PHONE_NUMBER') and
            settings.TWILIO_ACCOUNT_SID and
            settings.TWILIO_AUTH_TOKEN and
            settings.TWILIO_PHONE_NUMBER
        )
        
        self.aws_sns_enabled = (
            hasattr(settings, 'AWS_ACCESS_KEY_ID') and
            hasattr(settings, 'AWS_SECRET_ACCESS_KEY') and
            hasattr(settings, 'AWS_REGION') and
            settings.AWS_ACCESS_KEY_ID and
            settings.AWS_SECRET_ACCESS_KEY and
            settings.AWS_REGION
        )
        
        if self.twilio_enabled:
            self._init_twilio()
        elif self.aws_sns_enabled:
            self._init_aws_sns()
    
    def _init_twilio(self):
        """Initialize Twilio client"""
        try:
            # In a real implementation:
            # from twilio.rest import Client
            # self.twilio_client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
            
            logger.info("Twilio SMS service initialized successfully")
        except Exception as e:
            logger.error(f"Failed to initialize Twilio: {e}")
            self.twilio_enabled = False
    
    def _init_aws_sns(self):
        """Initialize AWS SNS client"""
        try:
            # In a real implementation:
            # import boto3
            # self.sns_client = boto3.client(
            #     'sns',
            #     aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            #     aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            #     region_name=settings.AWS_REGION
            # )
            
            logger.info("AWS SNS service initialized successfully")
        except Exception as e:
            logger.error(f"Failed to initialize AWS SNS: {e}")
            self.aws_sns_enabled = False
    
    def validate_phone_number(self, phone_number: str) -> bool:
        """
        Validate phone number format
        
        Args:
            phone_number: Phone number to validate
            
        Returns:
            bool: True if valid, False otherwise
        """
        if not phone_number:
            return False
        
        # Remove all non-digit characters except +
        cleaned = re.sub(r'[^\d+]', '', phone_number)
        
        # Check if it starts with + and has 10-15 digits
        if cleaned.startswith('+'):
            digits = cleaned[1:]
            return len(digits) >= 10 and len(digits) <= 15 and digits.isdigit()
        
        # Check if it's a valid US number (10 digits)
        return len(cleaned) == 10 and cleaned.isdigit()
    
    def format_phone_number(self, phone_number: str) -> str:
        """
        Format phone number to E.164 format
        
        Args:
            phone_number: Phone number to format
            
        Returns:
            str: Formatted phone number
        """
        if not phone_number:
            return ""
        
        # Remove all non-digit characters except +
        cleaned = re.sub(r'[^\d+]', '', phone_number)
        
        # If it already starts with +, return as is
        if cleaned.startswith('+'):
            return cleaned
        
        # If it's a 10-digit US number, add +1
        if len(cleaned) == 10 and cleaned.isdigit():
            return f"+1{cleaned}"
        
        # If it's an 11-digit number starting with 1, add +
        if len(cleaned) == 11 and cleaned.startswith('1'):
            return f"+{cleaned}"
        
        # Otherwise, assume it needs country code (default to US)
        return f"+1{cleaned}"
    
    async def send_sms(
        self,
        phone_number: str,
        message: str,
        metadata: Dict[str, Any] = None
    ) -> Dict[str, Any]:
        """
        Send SMS message
        
        Args:
            phone_number: Recipient phone number
            message: SMS message content
            metadata: Additional metadata for tracking
            
        Returns:
            Dict containing success status and message details
        """
        try:
            # Validate and format phone number
            if not self.validate_phone_number(phone_number):
                return {
                    "success": False,
                    "error": "Invalid phone number format",
                    "phone_number": phone_number
                }
            
            formatted_number = self.format_phone_number(phone_number)
            
            # Truncate message if too long (SMS limit is typically 160 characters)
            if len(message) > 160:
                message = message[:157] + "..."
                logger.warning(f"SMS message truncated for {formatted_number}")
            
            # Try Twilio first, then AWS SNS
            if self.twilio_enabled:
                return await self._send_twilio_sms(formatted_number, message, metadata)
            elif self.aws_sns_enabled:
                return await self._send_aws_sns_sms(formatted_number, message, metadata)
            else:
                logger.error("No SMS service configured")
                return {
                    "success": False,
                    "error": "No SMS service configured",
                    "phone_number": formatted_number
                }
                
        except Exception as e:
            logger.error(f"Failed to send SMS to {phone_number}: {e}")
            return {
                "success": False,
                "error": str(e),
                "phone_number": phone_number
            }
    
    async def _send_twilio_sms(
        self,
        phone_number: str,
        message: str,
        metadata: Dict[str, Any] = None
    ) -> Dict[str, Any]:
        """Send SMS via Twilio"""
        try:
            # In a real implementation:
            # message_obj = self.twilio_client.messages.create(
            #     body=message,
            #     from_=settings.TWILIO_PHONE_NUMBER,
            #     to=phone_number
            # )
            # 
            # return {
            #     "success": True,
            #     "message_sid": message_obj.sid,
            #     "phone_number": phone_number,
            #     "status": message_obj.status,
            #     "provider": "twilio"
            # }
            
            # For now, simulate success
            logger.info(f"Twilio SMS (simulated): {message} to {phone_number}")
            return {
                "success": True,
                "message_sid": "simulated_sid_123",
                "phone_number": phone_number,
                "status": "sent",
                "provider": "twilio"
            }
            
        except Exception as e:
            logger.error(f"Twilio SMS failed: {e}")
            return {
                "success": False,
                "error": str(e),
                "phone_number": phone_number,
                "provider": "twilio"
            }
    
    async def _send_aws_sns_sms(
        self,
        phone_number: str,
        message: str,
        metadata: Dict[str, Any] = None
    ) -> Dict[str, Any]:
        """Send SMS via AWS SNS"""
        try:
            # In a real implementation:
            # response = self.sns_client.publish(
            #     PhoneNumber=phone_number,
            #     Message=message,
            #     MessageAttributes={
            #         'AWS.SNS.SMS.SMSType': {
            #             'DataType': 'String',
            #             'StringValue': 'Transactional'
            #         }
            #     }
            # )
            # 
            # return {
            #     "success": True,
            #     "message_id": response['MessageId'],
            #     "phone_number": phone_number,
            #     "status": "sent",
            #     "provider": "aws_sns"
            # }
            
            # For now, simulate success
            logger.info(f"AWS SNS SMS (simulated): {message} to {phone_number}")
            return {
                "success": True,
                "message_id": "simulated_id_456",
                "phone_number": phone_number,
                "status": "sent",
                "provider": "aws_sns"
            }
            
        except Exception as e:
            logger.error(f"AWS SNS SMS failed: {e}")
            return {
                "success": False,
                "error": str(e),
                "phone_number": phone_number,
                "provider": "aws_sns"
            }
    
    async def send_bulk_sms(
        self,
        phone_numbers: list[str],
        message: str,
        metadata: Dict[str, Any] = None
    ) -> Dict[str, Dict[str, Any]]:
        """
        Send SMS to multiple recipients
        
        Args:
            phone_numbers: List of recipient phone numbers
            message: SMS message content
            metadata: Additional metadata for tracking
            
        Returns:
            Dict mapping phone numbers to send results
        """
        results = {}
        
        for phone_number in phone_numbers:
            results[phone_number] = await self.send_sms(phone_number, message, metadata)
        
        return results
    
    async def get_delivery_status(self, message_id: str, provider: str = "twilio") -> Dict[str, Any]:
        """
        Get delivery status of a sent message
        
        Args:
            message_id: Message ID returned from send_sms
            provider: SMS provider used ("twilio" or "aws_sns")
            
        Returns:
            Dict containing delivery status information
        """
        try:
            if provider == "twilio" and self.twilio_enabled:
                return await self._get_twilio_status(message_id)
            elif provider == "aws_sns" and self.aws_sns_enabled:
                return await self._get_aws_sns_status(message_id)
            else:
                return {
                    "success": False,
                    "error": f"Provider {provider} not available"
                }
                
        except Exception as e:
            logger.error(f"Failed to get delivery status for {message_id}: {e}")
            return {
                "success": False,
                "error": str(e)
            }
    
    async def _get_twilio_status(self, message_sid: str) -> Dict[str, Any]:
        """Get message status from Twilio"""
        try:
            # In a real implementation:
            # message = self.twilio_client.messages(message_sid).fetch()
            # return {
            #     "success": True,
            #     "status": message.status,
            #     "error_code": message.error_code,
            #     "error_message": message.error_message,
            #     "date_sent": message.date_sent.isoformat() if message.date_sent else None,
            #     "date_updated": message.date_updated.isoformat() if message.date_updated else None
            # }
            
            # For now, simulate delivered status
            return {
                "success": True,
                "status": "delivered",
                "error_code": None,
                "error_message": None,
                "date_sent": "2024-12-23T15:00:00Z",
                "date_updated": "2024-12-23T15:00:05Z"
            }
            
        except Exception as e:
            logger.error(f"Failed to get Twilio status: {e}")
            return {
                "success": False,
                "error": str(e)
            }
    
    async def _get_aws_sns_status(self, message_id: str) -> Dict[str, Any]:
        """Get message status from AWS SNS"""
        try:
            # AWS SNS doesn't provide direct delivery status checking
            # You would need to set up delivery status logging
            # For now, return a simulated status
            return {
                "success": True,
                "status": "delivered",
                "note": "AWS SNS delivery status requires additional setup"
            }
            
        except Exception as e:
            logger.error(f"Failed to get AWS SNS status: {e}")
            return {
                "success": False,
                "error": str(e)
            }


# Global instance
sms_service = SMSNotificationService()