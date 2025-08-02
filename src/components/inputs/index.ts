/**
 * Corp Astro UI Library - Input Primitives Index
 * 
 * Centralized exports for all input primitive components.
 * 
 * @module InputPrimitivesIndex
 * @version 1.0.0
 * @since 2024
 */

// Base input component
export { InputBase } from './InputBase';
export type {
  InputBaseProps,
  InputBaseSize,
  InputBaseVariant,
  InputBaseValidationState,
  InputBaseConfig,
  InputBaseLabelConfig,
  InputBaseValidationConfig,
  InputBaseIconConfig,
  InputBaseAnimationConfig,
  InputBaseHelperConfig,
  InputBaseStylingConfig,
  InputBaseValidationResult,
  InputBaseHandlers,
} from './InputBase';

// Text input components
export { TextInput } from './TextInput';
export type { 
  TextInputProps, 
  TextInputSize, 
  TextInputVariant,
  TextInputValidationState,
  TextInputLabelConfig,
  TextInputValidationConfig,
  TextInputAnimationConfig,
  TextInputConfig,
  TextInputState,
  TextInputHandlers
} from './TextInput';

// Email input components
export { EmailInput } from './EmailInput';
export type { 
  EmailInputProps, 
  EmailValidationConfig
} from './EmailInput';

// Password input components
export { PasswordInput } from './PasswordInput';
export type { 
  PasswordInputProps, 
  PasswordStrength,
  PasswordValidationConfig,
  PasswordVisibilityConfig
} from './PasswordInput';

// Number input components
export { NumberInput } from './NumberInput';
export type { 
  NumberInputProps, 
  NumberInputSize, 
  NumberInputVariant,
  NumberInputValidationState,
  NumberInputLabelConfig,
  NumberInputValidationConfig,
  NumberInputFormatConfig,
  NumberInputIconConfig,
  NumberInputHelperConfig
} from './NumberInput';

// Search input components
export { SearchInput } from './SearchInput';
export type { 
  SearchInputProps, 
  SearchInputSize, 
  SearchInputVariant,
  SearchInputValidationState,
  SearchInputLabelConfig,
  SearchInputSuggestionItem,
  SearchInputSearchConfig,
  SearchInputIconConfig,
  SearchInputHelperConfig
} from './SearchInput';

// TextArea components
export { TextArea } from './TextArea';
export type { 
  TextAreaProps, 
  TextAreaSize, 
  TextAreaVariant,
  TextAreaValidationState,
  TextAreaResizeMode,
  TextAreaLabelConfig,
  TextAreaValidationConfig,
  TextAreaAutoResizeConfig,
  TextAreaScrollConfig,
  TextAreaHelperConfig
} from './TextArea';

// Select input components
export { SelectInput } from './SelectInput';
export type {
  SelectInputProps,
  SelectInputSize,
  SelectInputVariant,
  SelectInputValidationState,
  SelectOption
} from './SelectInput';

// Date input components
export { DateInput } from './DateInput';
export type {
  DateInputProps,
  DateInputSize,
  DateInputVariant,
  DateInputValidationState,
  DateInputFormat,
  DateInputMode
} from './DateInput';

// Time input components
export { TimeInput } from './TimeInput';
export type {
  TimeInputProps,
  TimeInputSize,
  TimeInputVariant,
  TimeInputValidationState,
  TimeInputFormat,
  TimeInputMode,
  TimeValue
} from './TimeInput';

// File input components
export { FileInput } from './FileInput';
export type {
  FileInputProps,
  FileInputSize,
  FileInputVariant,
  FileInputValidationState,
  FileObject,
  FileUploadStatus,
  FileType,
  FileValidationRules
} from './FileInput';

// Slider input components
export { SliderInput } from './SliderInput';
export type {
  SliderInputProps,
  SliderInputSize,
  SliderInputVariant,
  SliderInputValidationState,
  SliderStep,
  SliderValueFormatter
} from './SliderInput';

// Phone input components
export { PhoneInput } from './PhoneInput';
export type {
  PhoneInputProps,
  PhoneInputSize,
  PhoneInputVariant,
  PhoneInputValidationState,
  CountryCode,
  PhoneInputLabelConfig,
  PhoneInputValidationConfig,
  PhoneInputFormatConfig,
  PhoneInputAnimationConfig,
  PhoneInputConfig,
  PhoneInputState,
  PhoneInputHandlers
} from './PhoneInput';

// URL input components
export { URLInput } from './URLInput';
export type {
  URLInputProps,
  URLInputSize,
  URLInputVariant,
  URLInputValidationState,
  URLProtocol,
  URLValidationConfig,
  URLInputLabelConfig,
  URLInputValidationConfig,
  URLInputFormatConfig,
  URLInputAnimationConfig,
  URLInputConfig,
  URLInputState,
  URLInputHandlers
} from './URLInput';

// Code input components
export { CodeInput } from './CodeInput';
export type {
  CodeInputProps,
  CodeInputSize,
  CodeInputVariant,
  CodeInputValidationState,
  CodeInputType,
  CodeInputLabelConfig,
  CodeInputValidationConfig,
  CodeInputSecurityConfig,
  CodeInputAnimationConfig,
  CodeInputConfig,
  CodeInputState,
  CodeInputHandlers
} from './CodeInput';