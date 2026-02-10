import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { Heading, Body, Text } from '@/components/ui/Text/Text';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReload = (): void => {
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3 text-center">
            <div className="mb-3">
              <svg
                className="mx-auto h-12 w-12 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <Heading level={5} className="mb-1">
              Oops! Something went wrong
            </Heading>
            <Body tone="secondary" className="mb-3">
              We encountered an unexpected error. Please try reloading the page.
            </Body>
            {this.state.error && (
              <details className="mb-3 text-left">
                <Text variant="caption" className="cursor-pointer" tone="secondary">Error details</Text>
                <Text variant="caption" className="mt-2 bg-gray-50 dark:bg-gray-700 p-3 rounded overflow-auto max-h-40">
                  {this.state.error.toString()}
                </Text>
              </details>
            )}
            <Button
              onClick={this.handleReload}
              variant="primary"
              size="sm"
              className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
            >
              <Text variant="body-sm">Reload Page</Text>
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
export default ErrorBoundary;
