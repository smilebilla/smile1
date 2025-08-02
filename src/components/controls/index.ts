/**
 * Corp Astro UI Library - Control Primitives Index
 * 
 * Centralized exports for all control primitive components.
 * 
 * @module ControlPrimitivesIndex
 * @version 1.0.0
 * @since 2024
 */

// Toggle control component
export { Toggle } from './Toggle';
export type { 
  ToggleProps, 
  ToggleSize, 
  ToggleState,
} from './Toggle';

// Checkbox control component
export { Checkbox } from './Checkbox';
export type { 
  CheckboxProps, 
  CheckboxSize, 
  CheckboxState,
} from './Checkbox';

// RadioButton control component
export { RadioButton } from './RadioButton';
export type { 
  RadioButtonProps, 
  RadioButtonSize, 
  RadioButtonState,
} from './RadioButton';

// RadioGroup control component
export { RadioGroup } from './RadioGroup';
export type { 
  RadioGroupProps, 
  RadioGroupValue,
  RadioGroupOption,
  RadioGroupDirection,
} from './RadioGroup';

// Slider control component
export { Slider } from './Slider';
export type { 
  SliderProps, 
  SliderSize, 
  SliderValue,
  SliderMark,
} from './Slider';

// RangeSlider control component
export { RangeSlider } from './RangeSlider';
export type { 
  RangeSliderProps, 
  RangeSliderSize, 
  RangeSliderValue,
  RangeSliderMark,
} from './RangeSlider';

// Rating control component
export { Rating } from './Rating';
export type { 
  RatingProps, 
  RatingSize,
} from './Rating';

// Stepper control component
export { Stepper } from './Stepper';
export type { 
  StepperProps, 
  StepperSize, 
  StepperOrientation,
} from './Stepper';

// Switch control component
export { Switch } from './Switch';
export type { 
  SwitchProps, 
  SwitchSize, 
  SwitchVariant,
} from './Switch';

// SegmentedControl component
export { SegmentedControl } from './SegmentedControl';
export type { 
  SegmentedControlProps, 
  SegmentedControlOption,
  SegmentedControlSize, 
  SegmentedControlVariant,
} from './SegmentedControl';

// ColorPicker control component
export { default as ColorPicker } from './ColorPicker';
export type { 
  ColorPickerProps, 
  ColorPickerSize, 
  ColorPickerVariant,
  ColorValue,
  ColorFormat,
  ColorSwatch,
} from './ColorPicker';

// ControlBase component
export { default as ControlBase } from './ControlBase';
export type { 
  ControlBaseProps, 
  ControlBaseRef,
  ControlBaseSize, 
  ControlBaseState,
  ControlBaseInteractionMode,
  ControlBaseAnimation,
} from './ControlBase';

/**
 * Control primitive component types
 */
export type ControlPrimitiveComponent = 
  | 'Toggle'
  | 'Checkbox'
  | 'RadioButton'
  | 'RadioGroup'
  | 'Slider'
  | 'RangeSlider'
  | 'Rating'
  | 'Stepper'
  | 'Switch'
  | 'SegmentedControl'
  | 'ColorPicker'
  | 'ControlBase';

/**
 * Common control primitive sizes
 */
export type ControlPrimitiveSize = 'small' | 'medium' | 'large';

/**
 * Common control primitive states
 */
export type ControlPrimitiveState = 'default' | 'active' | 'disabled' | 'loading';

/**
 * Control primitive configuration
 */
export interface ControlPrimitiveConfig {
  /** Animation duration */
  animationDuration?: number;
  /** Enable glow effects */
  glowEffect?: boolean;
  /** Enable haptic feedback */
  hapticFeedback?: boolean;
  /** Enable accessibility features */
  accessibility?: boolean;
}

/**
 * Control primitive theme configuration
 */
export interface ControlPrimitiveTheme {
  /** Primary color */
  primaryColor?: string;
  /** Secondary color */
  secondaryColor?: string;
  /** Disabled color */
  disabledColor?: string;
  /** Background color */
  backgroundColor?: string;
  /** Border color */
  borderColor?: string;
  /** Shadow color */
  shadowColor?: string;
}

/**
 * Control primitive validation
 */
export interface ControlPrimitiveValidation {
  /** Required validation */
  required?: boolean;
  /** Custom validation function */
  validate?: (value: any) => boolean | string;
  /** Error message */
  errorMessage?: string;
}

/**
 * Control primitive event handlers
 */
export interface ControlPrimitiveHandlers {
  /** Value change handler */
  onValueChange?: (value: any) => void;
  /** Press handler */
  onPress?: () => void;
  /** Focus handler */
  onFocus?: () => void;
  /** Blur handler */
  onBlur?: () => void;
  /** Long press handler */
  onLongPress?: () => void;
}

/**
 * Control primitive accessibility props
 */
export interface ControlPrimitiveAccessibility {
  /** Accessibility label */
  accessibilityLabel?: string;
  /** Accessibility hint */
  accessibilityHint?: string;
  /** Accessibility role */
  accessibilityRole?: string;
  /** Accessibility state */
  accessibilityState?: object;
}

/**
 * All control primitive exports
 */
export * from './Toggle';
// Future exports will be added here as components are implemented
