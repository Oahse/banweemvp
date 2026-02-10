
import { cn } from '../../utils/utils';
import { Text } from '@/components/ui/Text/Text';



export const Slider = ({
  label,
  error,
  id,
  className,
  type = 'range',
  ...props
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <Label weight="medium">{label}</Label>
      )}
      <input
        type={type}
        id={id}
        className={cn(
          'w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary',
          className
        )}
        {...props}
      />
      {error && <Text variant="body-sm" className="text-red-500">{error}</Text>}
    </div>
  );
};
