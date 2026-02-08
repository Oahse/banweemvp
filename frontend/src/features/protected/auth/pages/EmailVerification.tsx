import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, XCircle, Loader } from 'lucide-react';
import { extractErrorMessage } from '../../../../utils/api-response';

export const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [verificationStatus, setVerificationStatus] = useState('pending');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setVerificationStatus('error');
      setMessage('No verification token found.');
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch(`/v1/auth/verify-email?token=${token}`);
        const data = await response.json();

        if (response.ok) {
          setVerificationStatus('success');
          setMessage(data.message || 'Email verified successfully!');
        } else {
          setVerificationStatus('error');
          setMessage(extractErrorMessage(data) || 'Failed to verify email.');
        }
      } catch (error) {
        setVerificationStatus('error');
        setMessage(extractErrorMessage(error) || 'An error occurred while verifying your email.');
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="container mx-auto px-4 py-8 text-copy">
      <div className="max-w-md mx-auto bg-surface p-6 rounded-lg shadow-sm border border-border-light text-center">
        <h1 className="text-xl font-bold text-main mb-4">Email Verification</h1>
        
        {verificationStatus === 'pending' && (
          <div className="space-y-3">
            <Loader size={48} className="mx-auto text-primary animate-spin" />
            <p className="text-sm text-copy-light">Verifying your email...</p>
          </div>
        )}
        
        {verificationStatus === 'success' && (
          <div className="space-y-3">
            <CheckCircle size={48} className="mx-auto text-green-500" />
            <p className="text-sm text-copy">{message}</p>
            <Link 
              to="/login" 
              className="inline-block w-full bg-primary hover:bg-primary-dark text-white py-2 rounded-md transition-colors text-sm mt-3"
            >
              Go to Login
            </Link>
          </div>
        )}
        
        {verificationStatus === 'error' && (
          <div className="space-y-3">
            <XCircle size={48} className="mx-auto text-red-500" />
            <p className="text-sm text-red-600">{message}</p>
            <Link 
              to="/login" 
              className="inline-block text-primary hover:underline text-xs mt-2"
            >
              Back to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;
