#!/usr/bin/env python3
"""
Standalone test for TaxService to verify implementation without import issues
"""

import asyncio
import sys
import os
from decimal import Decimal
from unittest.mock import AsyncMock, patch, MagicMock
from uuid import uuid4

# Add current directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Import the TaxService directly
from services.tax import TaxService, TaxCalculationResult, TaxType


async def test_tax_service_basic_functionality():
    """Test basic TaxService functionality"""
    print("Testing TaxService basic functionality...")
    
    # Create mock database session
    mock_db = AsyncMock()
    
    # Create TaxService instance
    tax_service = TaxService(mock_db)
    
    try:
        # Test 1: Basic tax calculation with fallback
        print("Test 1: Basic tax calculation with fallback")
        result = await tax_service.calculate_tax(
            subtotal=Decimal('100.00'),
            country_code="US"
        )
        
        assert result.tax_rate == 0.08  # US emergency fallback rate
        assert result.tax_amount == Decimal('8.00')
        assert result.calculation_method == "emergency_fallback"
        assert result.tax_type == TaxType.SALES_TAX
        print("✓ Basic tax calculation works")
        
        # Test 2: Country code mapping
        print("Test 2: Country code mapping")
        assert tax_service._get_country_code("United States") == "US"
        assert tax_service._get_country_code("United Kingdom") == "GB"
        assert tax_service._get_country_code("Germany") == "DE"
        print("✓ Country code mapping works")
        
        # Test 3: State code mapping
        print("Test 3: State code mapping")
        assert tax_service._get_state_code("California") == "CA"
        assert tax_service._get_state_code("New York") == "NY"
        assert tax_service._get_state_code("Ontario") == "ON"
        print("✓ State code mapping works")
        
        # Test 4: Currency support
        print("Test 4: Currency support")
        currencies = tax_service.get_supported_currencies()
        assert "USD" in currencies
        assert "EUR" in currencies
        assert "GBP" in currencies
        assert currencies["USD"] == "$"
        print("✓ Currency support works")
        
        # Test 5: Currency for country
        print("Test 5: Currency for country")
        assert tax_service.get_currency_for_country("US") == "USD"
        assert tax_service.get_currency_for_country("GB") == "GBP"
        assert tax_service.get_currency_for_country("DE") == "EUR"
        print("✓ Currency for country mapping works")
        
        # Test 6: Tax type for country
        print("Test 6: Tax type for country")
        assert tax_service.get_tax_type_for_country("US") == TaxType.SALES_TAX
        assert tax_service.get_tax_type_for_country("CA") == TaxType.GST
        assert tax_service.get_tax_type_for_country("GB") == TaxType.VAT
        print("✓ Tax type for country mapping works")
        
        # Test 7: Product tax codes
        print("Test 7: Product tax codes")
        assert tax_service._get_tax_code_for_product("food") == "40030"
        assert tax_service._get_tax_code_for_product("clothing") == "20010"
        assert tax_service._get_tax_code_for_product("subscription") == "31000"
        print("✓ Product tax codes work")
        
        # Test 8: TaxCalculationResult serialization
        print("Test 8: TaxCalculationResult serialization")
        test_result = TaxCalculationResult(
            tax_rate=0.20,
            tax_amount=Decimal('20.00'),
            tax_type=TaxType.VAT,
            jurisdiction="GB",
            currency="GBP"
        )
        
        data = test_result.to_dict()
        assert data["tax_rate"] == 0.20
        assert data["tax_amount"] == 20.00
        assert data["tax_type"] == "vat"
        assert data["jurisdiction"] == "GB"
        assert data["currency"] == "GBP"
        print("✓ TaxCalculationResult serialization works")
        
        # Test 9: Error handling
        print("Test 9: Error handling")
        # Mock database error
        tax_service.db.get = AsyncMock(side_effect=Exception("Database error"))
        
        result = await tax_service.calculate_tax(
            subtotal=Decimal('100.00'),
            shipping_address_id=uuid4()
        )
        
        # Should return zero tax as ultimate fallback
        assert result.tax_rate == 0.0
        assert result.tax_amount == Decimal('0.00')
        assert result.calculation_method == "error_fallback"
        print("✓ Error handling works")
        
        print("\n🎉 All tests passed! TaxService implementation is working correctly.")
        
    finally:
        # Clean up
        await tax_service.close()


async def test_tax_service_with_mock_apis():
    """Test TaxService with mocked API responses"""
    print("\nTesting TaxService with mocked API responses...")
    
    mock_db = AsyncMock()
    tax_service = TaxService(mock_db)
    
    try:
        # Test VAT API mock
        print("Test 1: VAT API mock")
        tax_service.vat_api_key = "test_key"
        
        mock_response_data = {
            "success": True,
            "standard_rate": 20.0,
            "country_code": "GB"
        }
        
        with patch('aiohttp.ClientSession.get') as mock_get:
            mock_response = AsyncMock()
            mock_response.status = 200
            mock_response.json = AsyncMock(return_value=mock_response_data)
            mock_get.return_value.__aenter__.return_value = mock_response
            
            location_info = {"country_code": "GB"}
            result = await tax_service._calculate_vat_with_api(
                Decimal('100.00'), location_info, "GBP"
            )
            
            assert result is not None
            assert result.tax_rate == 0.20
            assert result.tax_amount == Decimal('20.00')
            assert result.tax_type == TaxType.VAT
            print("✓ VAT API mock works")
        
        # Test TaxJar API mock
        print("Test 2: TaxJar API mock")
        tax_service.tax_api_key = "test_key"
        
        mock_response_data = {
            "tax": {
                "rate": 0.0875,
                "amount_to_collect": 8.75,
                "jurisdictions": {
                    "state": {
                        "tax_name": "CA State Sales Tax",
                        "tax_rate": 0.0625,
                        "tax_collectable": 6.25,
                        "jurisdiction_name": "California"
                    }
                }
            }
        }
        
        with patch('aiohttp.ClientSession.post') as mock_post:
            mock_response = AsyncMock()
            mock_response.status = 200
            mock_response.json = AsyncMock(return_value=mock_response_data)
            mock_post.return_value.__aenter__.return_value = mock_response
            
            location_info = {
                "country_code": "US",
                "state_code": "CA",
                "city": "San Francisco",
                "postal_code": "94102"
            }
            
            result = await tax_service._calculate_with_taxjar(
                Decimal('100.00'), location_info, "subscription", "USD"
            )
            
            assert result is not None
            assert result.tax_rate == 0.0875
            assert result.tax_amount == Decimal('8.75')
            assert result.tax_type == TaxType.SALES_TAX
            print("✓ TaxJar API mock works")
        
        print("\n🎉 All API mock tests passed!")
        
    finally:
        await tax_service.close()


async def main():
    """Run all tests"""
    print("=" * 60)
    print("TaxService Implementation Test Suite")
    print("=" * 60)
    
    try:
        await test_tax_service_basic_functionality()
        await test_tax_service_with_mock_apis()
        
        print("\n" + "=" * 60)
        print("✅ ALL TESTS PASSED - TaxService implementation is complete!")
        print("=" * 60)
        
        return True
        
    except Exception as e:
        print(f"\n❌ TEST FAILED: {str(e)}")
        import traceback
        traceback.print_exc()
        return False


if __name__ == "__main__":
    success = asyncio.run(main())
    sys.exit(0 if success else 1)