import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Text/Text';

export const Error = ({ message = 'Something went wrong', onRetry }: { message?: string; onRetry?: () => void }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center text-sm">
      <AlertCircle className="w-12 h-12 text-error mb-4" />
      <Text variant="body-lg" weight="semibold">Error</Text>
      <Text variant="body-sm" tone="secondary">{message}</Text>
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="primary"
          size="sm"
          className="button-text bg-primary text-copy-inverse px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
        >
          <Text variant="body-sm">Try Again</Text>
        </Button>
      )}
    </div>
  );
};

export default Error;