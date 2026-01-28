#!/usr/bin/env python3
"""
Test if our validation is working by checking debug files
"""

import os
from datetime import datetime

def check_validation_logs():
    """Check if our validation logging is working"""
    
    print("🔍 Checking Order Validation Logs")
    print("=" * 50)
    
    # Check for validation error logs
    error_log = "/tmp/order_validation_errors.log"
    success_log = "/tmp/order_validation_success.log"
    post_commit_error_log = "/tmp/order_post_commit_errors.log"
    post_commit_success_log = "/tmp/order_post_commit_success.log"
    
    logs_to_check = [
        ("Pre-commit Validation Errors", error_log),
        ("Pre-commit Validation Success", success_log),
        ("Post-commit Validation Errors", post_commit_error_log),
        ("Post-commit Validation Success", post_commit_success_log)
    ]
    
    found_any_logs = False
    
    for log_name, log_path in logs_to_check:
        print(f"\n📋 {log_name}:")
        if os.path.exists(log_path):
            found_any_logs = True
            with open(log_path, 'r') as f:
                content = f.read().strip()
                if content:
                    print(f"   ✅ Found log entries:")
                    # Show last few entries
                    lines = content.split('\n')
                    for line in lines[-10:]:  # Last 10 lines
                        if line.strip():
                            print(f"   {line}")
                else:
                    print(f"   📄 Log file exists but is empty")
        else:
            print(f"   ❌ No log file found at {log_path}")
    
    if not found_any_logs:
        print(f"\n🚨 NO VALIDATION LOGS FOUND!")
        print("   This means either:")
        print("   1. No orders have been created since the fix was applied")
        print("   2. The validation code is not being executed")
        print("   3. There's an issue with the logging")
        
        print(f"\n📋 NEXT STEPS:")
        print("   1. Create a test order through the frontend")
        print("   2. Check these log files again")
        print("   3. If still no logs, the validation isn't being triggered")
    else:
        print(f"\n✅ VALIDATION LOGGING IS WORKING!")
        print("   The validation code is being executed.")
        
        # Check if we caught any calculation errors
        if os.path.exists(error_log) and os.path.getsize(error_log) > 0:
            print(f"   🎯 FOUND CALCULATION ERRORS - validation is catching the bug!")
        elif os.path.exists(post_commit_error_log) and os.path.getsize(post_commit_error_log) > 0:
            print(f"   🎯 FOUND POST-COMMIT ERRORS - something is modifying orders after creation!")
        else:
            print(f"   ✅ No calculation errors found - orders are being created correctly")

def clear_logs():
    """Clear all validation logs"""
    logs = [
        "/tmp/order_validation_errors.log",
        "/tmp/order_validation_success.log", 
        "/tmp/order_post_commit_errors.log",
        "/tmp/order_post_commit_success.log"
    ]
    
    print("🧹 Clearing validation logs...")
    for log in logs:
        if os.path.exists(log):
            os.remove(log)
            print(f"   ✅ Cleared {log}")
        else:
            print(f"   ℹ️  {log} doesn't exist")

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) > 1 and sys.argv[1] == "clear":
        clear_logs()
    else:
        check_validation_logs()
        
        print(f"\n💡 TIP: Run 'python3 test_validation_working.py clear' to clear logs")