/**
 * Form Controls Module Exports
 * Universal form control system for consistent user input
 */

// Components
export { Input } from './Input';
export { Textarea } from './Textarea';
export { Checkbox } from './Checkbox';
export { CheckboxGroup } from './CheckboxGroup';
export { Radio } from './Radio';
export { RadioGroup } from './RadioGroup';
export { Toggle } from './Toggle';

// Types
export type {
  BaseFormControlProps,
  AffixProps,
  CharacterLimitProps,
  FormControlSize,
  FormControlVariant,
  FormControlState,
  ValidationState,
  FormControlContextValue,
} from './types';

export type { InputProps } from './Input';
export type { TextareaProps } from './Textarea';
export type { CheckboxProps } from './Checkbox';
export type { CheckboxGroupProps, CheckboxGroupOption } from './CheckboxGroup';
export type { RadioProps } from './Radio';
export type { RadioGroupProps, RadioGroupOption } from './RadioGroup';
export type { ToggleProps } from './Toggle';

// Utilities
export {
  generateId,
  getControlState,
  getBaseControlStyles,
  getSizeStyles,
  getIconSize,
  getIconContainerWidth,
  getAffixPadding,
  getLabelStyles,
  getFeedbackStyles,
  getFeedbackIcon,
} from './utils';
