#!/usr/bin/env python3
"""
Test script to verify Mailjet payload format
"""

def test_mailjet_payload():
    """Test the corrected Mailjet payload format"""
    
    # Simulate the payload that should be generated
    payload = {
        "Messages": [
            {
                "FromEmail": "oscarchiagoziem@gmail.com",
                "FromName": "BanweeTest",
                "Recipients": [
                    {
                        "Email": "oscaroguledo06@gmail.com",
                        "Name": "Test User"
                    }
                ],
                "Subject": "Your email flight plan----00!",
                "Text-part": "Dear passenger, welcome to Mailjet!",
                "Html-part": "<h3>Dear passenger, welcome to Mailjet!</h3>"
            }
        ]
    }
    
    # Expected format (from your example)
    expected = {
        "FromEmail": "oscarchiagoziem@gmail.com",
        "FromName": "BanweeTest",
        "Recipients": [
            {
                "Email": "oscaroguledo06@gmail.com",
                "Name": "Test User"
            }
        ],
        "Subject": "Your email flight plan----00!",
        "Text-part": "Dear passenger, welcome to Mailjet!",
        "Html-part": "<h3>Dear passenger, welcome to Mailjet!</h3>"
    }
    
    # Compare the message content
    actual_message = payload["Messages"][0]
    
    print("✅ Mailjet Payload Format Test")
    print("=" * 50)
    
    # Check each field
    checks = [
        ("FromEmail", actual_message.get("FromEmail"), expected.get("FromEmail")),
        ("FromName", actual_message.get("FromName"), expected.get("FromName")),
        ("Subject", actual_message.get("Subject"), expected.get("Subject")),
        ("Text-part", actual_message.get("Text-part"), expected.get("Text-part")),
        ("Html-part", actual_message.get("Html-part"), expected.get("Html-part")),
    ]
    
    all_passed = True
    for field, actual, expected_value in checks:
        if actual == expected_value:
            print(f"✅ {field}: {actual}")
        else:
            print(f"❌ {field}: Expected '{expected_value}', got '{actual}'")
            all_passed = False
    
    # Check recipients
    actual_recipients = actual_message.get("Recipients", [])
    expected_recipients = expected.get("Recipients", [])
    
    if (len(actual_recipients) == len(expected_recipients) == 1 and
        actual_recipients[0].get("Email") == expected_recipients[0].get("Email") and
        actual_recipients[0].get("Name") == expected_recipients[0].get("Name")):
        print(f"✅ Recipients: {actual_recipients[0]}")
    else:
        print(f"❌ Recipients: Expected {expected_recipients}, got {actual_recipients}")
        all_passed = False
    
    print("=" * 50)
    if all_passed:
        print("🎉 All checks passed! Payload format is correct.")
    else:
        print("❌ Some checks failed. Please review the format.")
    
    return all_passed

if __name__ == "__main__":
    test_mailjet_payload()
