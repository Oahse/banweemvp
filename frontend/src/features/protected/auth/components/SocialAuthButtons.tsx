/**
 * Social Authentication Buttons Component
 * Supports Google, Facebook, and TikTok OAuth
 */

import React, { useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import FacebookLogin from '@greatsumini/react-facebook-login';
import { FaFacebook, FaTiktok } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { apiClient } from '@/api';
import { Button } from '@/components/ui/Button';
import { Heading, Body, Text } from '@/components/ui/Text/Text';

// Extend Window interface for Facebook SDK
declare global {
  interface Window {
    fbAsyncInit?: () => void;
    FB?: {
      init: (params: {
        appId: string;
        cookie: boolean;
        xfbml: boolean;
        version: string;
      }) => void;
    };
  }
}

// Define proper TypeScript interfaces
interface User {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  role: string;
}

interface AuthError {
  message: string;
  code?: string;
}

interface SocialAuthButtonsProps {
  mode?: 'login' | 'register';
  onSuccess?: (user: User) => void;
  onError?: (error: AuthError) => void;
}

interface GoogleCredentialResponse {
  credential: string;
  select_by?: string;
}

interface FacebookAuthResponse {
  accessToken: string;
  userID: string;
}

interface FacebookLoginResponse {
  accessToken?: string;
  userID?: string;
}

// Type guard utilities for error handling
const isError = (error: unknown): error is Error => {
  return error instanceof Error;
};

const isErrorWithMessage = (error: unknown): error is { message: string } => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as { message: unknown }).message === 'string'
  );
};

const getErrorMessage = (error: unknown): string => {
  if (isError(error)) {
    return error.message;
  }
  if (isErrorWithMessage(error)) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'An unknown error occurred';
};

const SocialAuthButtons: React.FC<SocialAuthButtonsProps> = ({
  mode = 'login',
  onSuccess,
  onError
}) => {
  const facebookAppId = import.meta.env.VITE_FACEBOOK_APP_ID;
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const isHttps = window.location.protocol === 'https:';

  // Check if we have valid (non-placeholder) credentials
  const hasValidGoogleClientId = googleClientId && 
    googleClientId !== 'placeholder_google_client_id' && 
    googleClientId.includes('.googleusercontent.com');
  const hasValidFacebookAppId = facebookAppId && 
    facebookAppId !== 'your_facebook_app_id';

  // Initialize Facebook SDK
  useEffect(() => {
    if (!hasValidFacebookAppId || !isHttps) return;

    // Load Facebook SDK
    window.fbAsyncInit = function() {
      if (window.FB) {
        window.FB.init({
          appId: facebookAppId,
          cookie: true,
          xfbml: true,
          version: 'v18.0'
        });
      }
    };

    // Load the SDK asynchronously
    (function(d, s, id) {
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      const js = d.createElement(s) as HTMLScriptElement;
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      if (fjs && fjs.parentNode) {
        fjs.parentNode.insertBefore(js, fjs);
      }
    }(document, 'script', 'facebook-jssdk'));
  }, [hasValidFacebookAppId, isHttps, facebookAppId]);

  // Google OAuth Success Handler
  const handleGoogleSuccess = async (credentialResponse: GoogleCredentialResponse) => {
    try {
      const response = await apiClient.post('/auth/social/google', {
        credential: credentialResponse.credential,
        mode
      });

      if (response.success) {
        // Store tokens and user data
        localStorage.setItem('banwee_access_token', response.data.access_token);
        localStorage.setItem('banwee_user', JSON.stringify(response.data.user));
        
        toast.success(`Successfully ${mode === 'login' ? 'logged in' : 'registered'} with Google!`);
        onSuccess?.(response.data.user);
      }
    } catch (error: unknown) {
      const authError: AuthError = {
        message: getErrorMessage(error),
        code: 'GOOGLE_AUTH_ERROR'
      };
      toast.error(authError.message);
      onError?.(authError);
    }
  };

  // Google OAuth Error Handler
  const handleGoogleError = () => {
    const authError: AuthError = {
      message: `Google ${mode} failed`,
      code: 'GOOGLE_AUTH_ERROR'
    };
    toast.error(authError.message);
    onError?.(authError);
  };

  // Facebook OAuth Success Handler
  const handleFacebookSuccess = async (response: FacebookLoginResponse) => {
    try {
      if (response.accessToken) {
        const apiResponse = await apiClient.post('/auth/social/facebook', {
          access_token: response.accessToken,
          user_id: response.userID,
          mode
        });

        if (apiResponse.success) {
          // Store tokens and user data
          localStorage.setItem('banwee_access_token', apiResponse.data.access_token);
          localStorage.setItem('banwee_user', JSON.stringify(apiResponse.data.user));
          
          toast.success(`Successfully ${mode === 'login' ? 'logged in' : 'registered'} with Facebook!`);
          onSuccess?.(apiResponse.data.user);
        }
      }
    } catch (error: unknown) {
      const authError: AuthError = {
        message: getErrorMessage(error),
        code: 'FACEBOOK_AUTH_ERROR'
      };
      toast.error(authError.message);
      onError?.(authError);
    }
  };

  // Facebook OAuth Error Handler
  const handleFacebookError = () => {
    const authError: AuthError = {
      message: `Facebook ${mode} failed`,
      code: 'FACEBOOK_AUTH_ERROR'
    };
    toast.error(authError.message);
    onError?.(authError);
  };

  // TikTok OAuth Handler (Custom implementation)
  const handleTikTokAuth = async () => {
    try {
      // TikTok OAuth flow - redirect to backend endpoint
      const clientId = import.meta.env.VITE_TIKTOK_CLIENT_ID;
      const redirectUri = `${window.location.origin}/auth/tiktok/callback`;
      const state = Math.random().toString(36).substring(7);
      
      // Store state for verification
      localStorage.setItem('tiktok_oauth_state', state);
      
      const tiktokAuthUrl = `https://www.tiktok.com/auth/authorize/` +
        `?client_key=${clientId}` +
        `&scope=user.info.basic` +
        `&response_type=code` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}` +
        `&state=${state}`;
      
      // Redirect to TikTok OAuth
      window.location.href = tiktokAuthUrl;
    } catch (error: unknown) {
      const authError: AuthError = {
        message: getErrorMessage(error),
        code: 'TIKTOK_AUTH_ERROR'
      };
      toast.error(authError.message);
      onError?.(authError);
    }
  };

  return (
    <div className="space-y-3">
      {/* Show warning if social auth is not properly configured */}
      {(!hasValidGoogleClientId && !hasValidFacebookAppId) && (
        <div className="text-sm text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg mb-3 border border-amber-200 dark:border-amber-800">
          <Body className="font-medium mb-1">⚙️ Social Authentication Setup Required</Body>
          <Body>Add your OAuth credentials to the .env file to enable social login.</Body>
        </div>
      )}

      {/* Show HTTPS warning for Facebook - More prominent */}
      {hasValidFacebookAppId && !isHttps && (
        <div className="text-sm text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg mb-3 border border-red-200 dark:border-red-800">
          <Body className="font-medium mb-1">🔒 HTTPS Required for Facebook Login</Body>
          <Body>Facebook OAuth requires a secure HTTPS connection. Please access this site via HTTPS or use alternative login methods.</Body>
        </div>
      )}

      {/* Google OAuth */}
      {hasValidGoogleClientId && (
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          useOneTap={false}
          theme="outline"
          size="large"
          text={mode === 'login' ? 'signin_with' : 'signup_with'}
          cancel_on_tap_outside={true}
        />
      )}

      {/* Facebook OAuth */}
      {hasValidFacebookAppId && (
        <FacebookLogin
          appId={facebookAppId}
          onSuccess={handleFacebookSuccess}
          onFail={handleFacebookError}
          render={(renderProps: any) => (
            <Button
              onClick={renderProps.onClick}
              variant="outline"
              fullWidth={true}
              leftIcon={<FaFacebook className="w-5 h-5 text-blue-600" />}
              className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              disabled={renderProps.isDisabled}
            >
              {mode === 'login' ? 'Sign in' : 'Sign up'} with Facebook
            </Button>
          )}
        />
      )}

      {/* TikTok OAuth */}
      <Button
        onClick={handleTikTokAuth}
        variant="outline"
        fullWidth={true}
        leftIcon={<FaTiktok className="w-5 h-5 text-black dark:text-white" />}
        className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
      >
        {mode === 'login' ? 'Sign in' : 'Sign up'} with TikTok
      </Button>
    </div>
  );
};

export default SocialAuthButtons;