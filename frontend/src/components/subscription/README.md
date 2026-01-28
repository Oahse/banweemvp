# Subscription Components

## PauseSubscriptionModal

A custom modal component for pausing subscriptions with an optional reason field.

### Features

- **Custom Modal**: Replaces browser `window.alert()` with a styled modal
- **Optional Reason**: Users can provide a reason for pausing (up to 500 characters)
- **Loading States**: Shows loading spinner during pause operation
- **Accessible**: Proper focus management and keyboard navigation
- **Responsive**: Works on all screen sizes

### Props

```typescript
interface PauseSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason?: string) => void;
  subscriptionId: string;
  planName: string;
  loading?: boolean;
}
```

### Usage

```tsx
import { PauseSubscriptionModal } from './PauseSubscriptionModal';

const [showPauseModal, setShowPauseModal] = useState(false);
const [isPausing, setIsPausing] = useState(false);

const handlePauseConfirm = async (reason?: string) => {
  setIsPausing(true);
  try {
    await pauseSubscription(subscriptionId, reason);
    setShowPauseModal(false);
  } finally {
    setIsPausing(false);
  }
};

<PauseSubscriptionModal
  isOpen={showPauseModal}
  onClose={() => setShowPauseModal(false)}
  onConfirm={handlePauseConfirm}
  subscriptionId="sub_123"
  planName="Premium"
  loading={isPausing}
/>
```

## SubscriptionCard Updates

The `SubscriptionCard` component has been updated to use the new pause modal:

### Changes

- **onPause prop**: Now accepts `(subscriptionId: string, reason?: string) => void`
- **Custom Modal**: Uses `PauseSubscriptionModal` instead of `window.confirm()`
- **Better UX**: Provides context and explanation before pausing

### Migration

If you're using `SubscriptionCard` with an `onPause` handler, update it to accept the optional reason parameter:

```tsx
// Before
const handlePause = async (subscriptionId: string) => {
  const reason = prompt('Reason for pausing?');
  await pauseSubscription(subscriptionId, reason);
};

// After
const handlePause = async (subscriptionId: string, reason?: string) => {
  await pauseSubscription(subscriptionId, reason);
};
```

The modal will handle collecting the reason from the user, so you no longer need to use `prompt()` or `window.alert()`.