/**
 * Corp Astro UI Library - InputBase Primitive
 * 
 * Base input component providing shared input logic, validation framework,
 * and common input functionality. Serves as the foundation for all input primitives.
 * 
 * @module InputBase
 * @version 1.0.0
 * @since 2024
 */

import React, { useState, useRef, useCallback, useEffect, forwardRef } from 'react';
import {
  View,
  Text,
  TextInput as RNTextInput,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInputChangeEventData,
  TextInputKeyPressEventData,
  TextInputProps as RNTextInputProps,
  AccessibilityProps,
  Keyboard,
  Platform,
  Animated,
} from 'react-native';

/**
 * InputBase size variants
 */
export type InputBaseSize = 'small' | 'medium' | 'large';

/**
 * InputBase variant styles
 */
export type InputBaseVariant = 'default' | 'outlined' | 'filled' | 'ghost' | 'underlined';

/**
 * InputBase validation state
 */
export type InputBaseValidationState = 'default' | 'error' | 'success' | 'warning';

/**
 * InputBase validation result
 */
export interface InputBaseValidationResult {
  /** Is the input valid */
  isValid: boolean;
  /** Validation state */
  state: InputBaseValidationState;
  /** Validation message */
  message: string;
}

/**
 * InputBase label configuration
 */
export interface InputBaseLabelConfig {
  /** Label text */
  text: string;
  /** Label position */
  position?: 'top' | 'floating' | 'inside';
  /** Label styling */
  style?: TextStyle;
  /** Required indicator */
  required?: boolean;
  /** Required indicator color */
  requiredColor?: string;
  /** Animate label */
  animate?: boolean;
  /** Animation duration */
  animationDuration?: number;
}

/**
 * InputBase validation configuration
 */
export interface InputBaseValidationConfig {
  /** Required field validation */
  required?: boolean;
  /** Minimum length validation */
  minLength?: number;
  /** Maximum length validation */
  maxLength?: number;
  /** Pattern validation */
  pattern?: RegExp;
  /** Custom validation function */
  validate?: (value: string) => boolean | string;
  /** Validation triggers */
  triggers?: Array<'onChange' | 'onBlur' | 'onFocus' | 'onSubmit'>;
  /** Real-time validation */
  realTime?: boolean;
  /** Debounce delay for real-time validation */
  debounceMs?: number;
  /** Show character count */
  showCharacterCount?: boolean;
  /** Custom validation messages */
  messages?: {
    required?: string;
    minLength?: string;
    maxLength?: string;
    pattern?: string;
    custom?: string;
  };
}

/**
 * InputBase icon configuration
 */
export interface InputBaseIconConfig {
  /** Left icon */
  left?: React.ReactNode;
  /** Right icon */
  right?: React.ReactNode;
  /** Icon size */
  size?: number;
  /** Icon color */
  color?: string;
  /** Icon press handler */
  onPress?: () => void;
  /** Icon accessibility label */
  accessibilityLabel?: string;
}

/**
 * InputBase animation configuration
 */
export interface InputBaseAnimationConfig {
  /** Enable focus animations */
  focusAnimation?: boolean;
  /** Enable scale animation */
  scaleAnimation?: boolean;
  /** Enable glow animation */
  glowAnimation?: boolean;
  /** Animation duration */
  duration?: number;
  /** Animation easing */
  easing?: any;
  /** Label animation duration */
  labelDuration?: number;
}

/**
 * InputBase helper configuration
 */
export interface InputBaseHelperConfig {
  /** Helper text */
  text?: string;
  /** Helper text position */
  position?: 'bottom' | 'top';
  /** Helper text style */
  style?: TextStyle;
  /** Show helper text only on focus */
  showOnFocus?: boolean;
  /** Show helper text only on error */
  showOnError?: boolean;
}

/**
 * InputBase styling configuration
 */
export interface InputBaseStylingConfig {
  /** Enable glass morphism */
  glassMorphism?: boolean;
  /** Enable glow effect */
  glowEffect?: boolean;
  /** Enable hover effects */
  hoverEffect?: boolean;
  /** Enable animations */
  animated?: boolean;
  /** Border radius */
  borderRadius?: number;
  /** Background opacity */
  backgroundOpacity?: number;
  /** Border opacity */
  borderOpacity?: number;
}

/**
 * InputBase configuration object
 */
export interface InputBaseConfig {
  /** Label configuration */
  label?: InputBaseLabelConfig;
  /** Validation configuration */
  validation?: InputBaseValidationConfig;
  /** Icon configuration */
  icon?: InputBaseIconConfig;
  /** Animation configuration */
  animation?: InputBaseAnimationConfig;
  /** Helper configuration */
  helper?: InputBaseHelperConfig;
  /** Styling configuration */
  styling?: InputBaseStylingConfig;
}

/**
 * InputBase state interface
 */
export interface InputBaseState {
  /** Current value */
  value: string;
  /** Is focused */
  isFocused: boolean;
  /** Is valid */
  isValid: boolean;
  /** Validation state */
  validationState: InputBaseValidationState;
  /** Validation message */
  validationMessage: string;
  /** Character count */
  characterCount: number;
  /** Is empty */
  isEmpty: boolean;
  /** Has error */
  hasError: boolean;
}

/**
 * InputBase event handlers
 */
export interface InputBaseHandlers {
  /** Value change handler */
  onValueChange?: (value: string) => void;
  /** Focus handler */
  onFocus?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  /** Blur handler */
  onBlur?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  /** Validation handler */
  onValidation?: (result: InputBaseValidationResult) => void;
  /** Clear handler */
  onClear?: () => void;
  /** Submit handler */
  onSubmit?: (value: string) => void;
  /** Key press handler */
  onKeyPress?: (event: NativeSyntheticEvent<TextInputKeyPressEventData>) => void;
}

/**
 * InputBase component props
 */
export interface InputBaseProps extends 
  Omit<RNTextInputProps, 'value' | 'onChangeText' | 'onFocus' | 'onBlur' | 'style'>,
  InputBaseHandlers,
  AccessibilityProps 
{
  /** Input value (controlled) */
  value?: string;
  /** Default value (uncontrolled) */
  defaultValue?: string;
  /** Component size */
  size?: InputBaseSize;
  /** Component variant */
  variant?: InputBaseVariant;
  /** Validation state */
  validationState?: InputBaseValidationState;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether the input is read-only */
  readOnly?: boolean;
  /** Whether the input is required */
  required?: boolean;
  /** Whether the input is loading */
  loading?: boolean;
  /** Component configuration */
  config?: InputBaseConfig;
  /** Custom container styling */
  containerStyle?: ViewStyle;
  /** Custom input styling */
  inputStyle?: TextStyle;
  /** Custom label styling */
  labelStyle?: TextStyle;
  /** Custom helper styling */
  helperStyle?: TextStyle;
  /** Test ID for testing */
  testID?: string;
  /** Custom render function for container */
  renderContainer?: (props: {
    children: React.ReactNode;
    style: ViewStyle;
    testID?: string;
  }) => React.ReactNode;
  /** Custom render function for input */
  renderInput?: (props: {
    style: TextStyle;
    value: string;
    onChangeText: (text: string) => void;
    onFocus: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
    onBlur: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
    ref: React.RefObject<RNTextInput | null>;
    [key: string]: any;
  }) => React.ReactNode;
}

/**
 * Default configuration
 */
const defaultConfig: Required<InputBaseConfig> = {
  label: {
    text: '',
    position: 'top',
    style: {},
    required: false,
    requiredColor: '#FF6B6B',
    animate: true,
    animationDuration: 200,
  },
  validation: {
    required: false,
    minLength: 0,
    maxLength: 0,
    pattern: undefined,
    validate: undefined,
    triggers: ['onChange', 'onBlur'],
    realTime: false,
    debounceMs: 300,
    showCharacterCount: false,
    messages: {
      required: 'This field is required',
      minLength: 'Minimum length not met',
      maxLength: 'Maximum length exceeded',
      pattern: 'Invalid format',
      custom: 'Validation failed',
    },
  },
  icon: {
    left: undefined,
    right: undefined,
    size: 20,
    color: 'rgba(255, 255, 255, 0.6)',
    onPress: undefined,
    accessibilityLabel: '',
  },
  animation: {
    focusAnimation: true,
    scaleAnimation: true,
    glowAnimation: true,
    duration: 200,
    easing: undefined,
    labelDuration: 200,
  },
  helper: {
    text: '',
    position: 'bottom',
    style: {},
    showOnFocus: false,
    showOnError: false,
  },
  styling: {
    glassMorphism: true,
    glowEffect: true,
    hoverEffect: true,
    animated: true,
    borderRadius: 16,
    backgroundOpacity: 0.2,
    borderOpacity: 0.1,
  },
};

/**
 * Size configuration
 */
const sizeConfigs = {
  small: {
    height: 44,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    iconSize: 16,
  },
  medium: {
    height: 56,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    iconSize: 20,
  },
  large: {
    height: 68,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 18,
    iconSize: 24,
  },
};

/**
 * Validation colors
 */
const validationColors = {
  default: 'rgba(255, 255, 255, 0.1)',
  error: '#FF6B6B',
  success: '#51CF66',
  warning: '#FFD43B',
};

/**
 * Validation glow colors
 */
const validationGlowColors = {
  default: 'rgba(46, 134, 222, 0.2)',
  error: 'rgba(255, 107, 107, 0.3)',
  success: 'rgba(81, 207, 102, 0.3)',
  warning: 'rgba(255, 212, 59, 0.3)',
};

/**
 * InputBase primitive component
 */
export const InputBase = forwardRef<RNTextInput, InputBaseProps>(({
  value: controlledValue,
  defaultValue = '',
  size = 'medium',
  variant = 'default',
  validationState: propValidationState = 'default',
  disabled = false,
  readOnly = false,
  required = false,
  loading = false,
  config = {},
  containerStyle,
  inputStyle,
  labelStyle,
  helperStyle,
  testID = 'input-base',
  renderContainer,
  renderInput,
  onValueChange,
  onFocus,
  onBlur,
  onValidation,
  onClear,
  onSubmit,
  onKeyPress,
  ...inputProps
}, ref) => {
  // Merge configuration with defaults
  const mergedConfig = { ...defaultConfig, ...config };
  const sizeConfig = sizeConfigs[size];

  // Component state
  const [internalValue, setInternalValue] = useState(controlledValue || defaultValue);
  const [isFocused, setIsFocused] = useState(false);
  const [validationState, setValidationState] = useState<InputBaseValidationState>(propValidationState);
  const [validationMessage, setValidationMessage] = useState('');

  // Use controlled or internal value
  const currentValue = controlledValue !== undefined ? controlledValue : internalValue;
  const isEmpty = !currentValue || currentValue.length === 0;
  const characterCount = currentValue ? currentValue.length : 0;
  const hasError = validationState === 'error';

  // Animation values
  const focusAnimation = useRef(new Animated.Value(0)).current;
  const glowAnimation = useRef(new Animated.Value(0)).current;
  const labelAnimation = useRef(new Animated.Value(isEmpty ? 0 : 1)).current;
  const scaleAnimation = useRef(new Animated.Value(1)).current;

  // Refs
  const inputRef = useRef<RNTextInput>(null);
  const debounceTimer = useRef<NodeJS.Timeout | undefined>(undefined);

  // Expose input ref
  React.useImperativeHandle(ref, () => inputRef.current!, []);

  // Get current state
  const getCurrentState = useCallback((): InputBaseState => {
    return {
      value: currentValue,
      isFocused,
      isValid: validationState !== 'error',
      validationState,
      validationMessage,
      characterCount,
      isEmpty,
      hasError,
    };
  }, [currentValue, isFocused, validationState, validationMessage, characterCount, isEmpty, hasError]);

  // Validate input
  const validateInput = useCallback((inputValue: string): InputBaseValidationResult => {
    let isValid = true;
    let state: InputBaseValidationState = 'default';
    let message = '';

    const validation = mergedConfig.validation;

    // Required validation
    if (validation.required && (!inputValue || inputValue.trim().length === 0)) {
      isValid = false;
      state = 'error';
      message = validation.messages?.required || 'This field is required';
    }
    // Min length validation
    else if (validation.minLength && inputValue.length < validation.minLength) {
      isValid = false;
      state = 'error';
      message = validation.messages?.minLength || `Minimum ${validation.minLength} characters required`;
    }
    // Max length validation
    else if (validation.maxLength && inputValue.length > validation.maxLength) {
      isValid = false;
      state = 'error';
      message = validation.messages?.maxLength || `Maximum ${validation.maxLength} characters allowed`;
    }
    // Pattern validation
    else if (validation.pattern && !validation.pattern.test(inputValue)) {
      isValid = false;
      state = 'error';
      message = validation.messages?.pattern || 'Invalid format';
    }
    // Custom validation
    else if (validation.validate) {
      const result = validation.validate(inputValue);
      if (typeof result === 'string') {
        isValid = false;
        state = 'error';
        message = result;
      } else if (!result) {
        isValid = false;
        state = 'error';
        message = validation.messages?.custom || 'Validation failed';
      }
    }

    // Success state
    if (isValid && inputValue.length > 0) {
      state = 'success';
    }

    return { isValid, state, message };
  }, [mergedConfig.validation]);

  // Handle value change
  const handleValueChange = useCallback((text: string) => {
    if (disabled || readOnly) return;

    // Update internal value if uncontrolled
    if (controlledValue === undefined) {
      setInternalValue(text);
    }

    // Debounced validation
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (mergedConfig.validation.realTime) {
      debounceTimer.current = setTimeout(() => {
        const result = validateInput(text);
        setValidationState(result.state);
        setValidationMessage(result.message);
        onValidation?.(result);
      }, mergedConfig.validation.debounceMs);
    }

    // Animate label based on content
    if (mergedConfig.label.animate && mergedConfig.label.position === 'floating') {
      const shouldFloat = !isEmpty || text.length > 0;
      Animated.timing(labelAnimation, {
        toValue: shouldFloat ? 1 : 0,
        duration: mergedConfig.animation.labelDuration,
        useNativeDriver: false,
      }).start();
    }

    onValueChange?.(text);
  }, [
    disabled,
    readOnly,
    controlledValue,
    mergedConfig.validation.realTime,
    mergedConfig.validation.debounceMs,
    mergedConfig.label.animate,
    mergedConfig.label.position,
    mergedConfig.animation.labelDuration,
    isEmpty,
    validateInput,
    onValidation,
    onValueChange,
  ]);

  // Handle focus
  const handleFocus = useCallback((event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (disabled || readOnly) return;

    setIsFocused(true);

    // Animate focus
    if (mergedConfig.animation.focusAnimation) {
      const animations = [
        Animated.timing(focusAnimation, {
          toValue: 1,
          duration: mergedConfig.animation.duration,
          useNativeDriver: false,
        }),
      ];

      if (mergedConfig.animation.glowAnimation) {
        animations.push(
          Animated.timing(glowAnimation, {
            toValue: 1,
            duration: mergedConfig.animation.duration,
            useNativeDriver: false,
          })
        );
      }

      if (mergedConfig.animation.scaleAnimation) {
        animations.push(
          Animated.timing(scaleAnimation, {
            toValue: 1.02,
            duration: mergedConfig.animation.duration,
            useNativeDriver: true,
          })
        );
      }

      Animated.parallel(animations).start();
    }

    // Validate on focus if configured
    if (mergedConfig.validation.triggers?.includes('onFocus')) {
      const result = validateInput(currentValue);
      setValidationState(result.state);
      setValidationMessage(result.message);
      onValidation?.(result);
    }

    onFocus?.(event);
  }, [
    disabled,
    readOnly,
    mergedConfig.animation.focusAnimation,
    mergedConfig.animation.duration,
    mergedConfig.animation.glowAnimation,
    mergedConfig.animation.scaleAnimation,
    mergedConfig.validation.triggers,
    validateInput,
    currentValue,
    onValidation,
    onFocus,
  ]);

  // Handle blur
  const handleBlur = useCallback((event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false);

    // Animate blur
    if (mergedConfig.animation.focusAnimation) {
      const animations = [
        Animated.timing(focusAnimation, {
          toValue: 0,
          duration: mergedConfig.animation.duration,
          useNativeDriver: false,
        }),
      ];

      if (mergedConfig.animation.glowAnimation) {
        animations.push(
          Animated.timing(glowAnimation, {
            toValue: 0,
            duration: mergedConfig.animation.duration,
            useNativeDriver: false,
          })
        );
      }

      if (mergedConfig.animation.scaleAnimation) {
        animations.push(
          Animated.timing(scaleAnimation, {
            toValue: 1,
            duration: mergedConfig.animation.duration,
            useNativeDriver: true,
          })
        );
      }

      Animated.parallel(animations).start();
    }

    // Validate on blur if configured
    if (mergedConfig.validation.triggers?.includes('onBlur')) {
      const result = validateInput(currentValue);
      setValidationState(result.state);
      setValidationMessage(result.message);
      onValidation?.(result);
    }

    onBlur?.(event);
  }, [
    mergedConfig.animation.focusAnimation,
    mergedConfig.animation.duration,
    mergedConfig.animation.glowAnimation,
    mergedConfig.animation.scaleAnimation,
    mergedConfig.validation.triggers,
    validateInput,
    currentValue,
    onValidation,
    onBlur,
  ]);

  // Handle clear
  const handleClear = useCallback(() => {
    if (disabled || readOnly) return;

    const newValue = '';

    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }

    // Reset validation
    setValidationState('default');
    setValidationMessage('');

    // Animate label
    if (mergedConfig.label.animate && mergedConfig.label.position === 'floating') {
      Animated.timing(labelAnimation, {
        toValue: 0,
        duration: mergedConfig.animation.labelDuration,
        useNativeDriver: false,
      }).start();
    }

    onValueChange?.(newValue);
    onClear?.();
  }, [
    disabled,
    readOnly,
    controlledValue,
    mergedConfig.label.animate,
    mergedConfig.label.position,
    mergedConfig.animation.labelDuration,
    onValueChange,
    onClear,
  ]);

  // Handle submit
  const handleSubmit = useCallback(() => {
    if (disabled || readOnly) return;

    // Validate on submit if configured
    if (mergedConfig.validation.triggers?.includes('onSubmit')) {
      const result = validateInput(currentValue);
      setValidationState(result.state);
      setValidationMessage(result.message);
      onValidation?.(result);

      if (result.isValid) {
        onSubmit?.(currentValue);
      }
    } else {
      onSubmit?.(currentValue);
    }
  }, [
    disabled,
    readOnly,
    mergedConfig.validation.triggers,
    validateInput,
    currentValue,
    onValidation,
    onSubmit,
  ]);

  // Focus input programmatically
  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  // Blur input programmatically
  const blurInput = useCallback(() => {
    inputRef.current?.blur();
  }, []);

  // Public methods
  const publicMethods = {
    focus: focusInput,
    blur: blurInput,
    clear: handleClear,
    validate: () => validateInput(currentValue),
    getState: getCurrentState,
  };

  // Effect to handle validation prop changes
  useEffect(() => {
    if (propValidationState !== validationState) {
      setValidationState(propValidationState);
    }
  }, [propValidationState, validationState]);

  // Effect to handle value changes
  useEffect(() => {
    if (controlledValue !== undefined && controlledValue !== internalValue) {
      setInternalValue(controlledValue);
    }
  }, [controlledValue, internalValue]);

  // Cleanup debounce timer
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  // Calculate styles
  const containerStyles: ViewStyle = StyleSheet.flatten([
    styles.container,
    containerStyle,
    mergedConfig.animation.scaleAnimation && {
      transform: [{ scale: scaleAnimation }],
    },
  ]);

  const inputContainerStyles: ViewStyle = StyleSheet.flatten([
    styles.inputContainer,
    styles[`inputContainer_${size}`],
    styles[`inputContainer_${variant}`],
    {
      borderRadius: mergedConfig.styling.borderRadius,
      borderColor: validationColors[validationState],
      backgroundColor: mergedConfig.styling.glassMorphism
        ? isFocused
          ? `rgba(22, 33, 62, ${(mergedConfig.styling.backgroundOpacity ?? 0.2) + 0.1})`
          : `rgba(22, 33, 62, ${mergedConfig.styling.backgroundOpacity ?? 0.2})`
        : 'rgba(255, 255, 255, 0.05)',
      shadowColor: validationGlowColors[validationState],
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: isFocused ? 8 : 4,
      shadowOpacity: isFocused ? 0.3 : 0.1,
      elevation: isFocused ? 5 : 2,
    },
    disabled && styles.inputContainer_disabled,
  ]);

  const inputStyles: TextStyle = StyleSheet.flatten([
    styles.input,
    styles[`input_${size}`],
    {
      fontSize: sizeConfig.fontSize,
      paddingHorizontal: sizeConfig.paddingHorizontal,
      paddingVertical: sizeConfig.paddingVertical,
    },
    disabled && styles.input_disabled,
    inputStyle,
  ]);

  const labelStyles: TextStyle = StyleSheet.flatten([
    styles.label,
    styles[`label_${size}`],
    mergedConfig.label.position === 'floating' && {
      transform: [
        {
          translateY: labelAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -25],
          }),
        },
        {
          scale: labelAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0.8],
          }),
        },
      ],
    },
    labelStyle,
    mergedConfig.label.style,
  ]);

  const helperStyles: TextStyle = StyleSheet.flatten([
    styles.helper,
    styles[`helper_${validationState}`],
    helperStyle,
    mergedConfig.helper.style,
  ]);

  // Render label
  const renderLabel = () => {
    if (!mergedConfig.label.text) return null;

    const shouldShow = mergedConfig.label.position !== 'floating' || 
      (mergedConfig.label.position === 'floating' && (isFocused || !isEmpty));

    if (!shouldShow) return null;

    return (
      <Animated.View style={styles.labelContainer}>
        <Animated.Text style={labelStyles}>
          {mergedConfig.label.text}
          {(mergedConfig.label.required || required) && (
            <Text style={[styles.required, { color: mergedConfig.label.requiredColor }]}>
              {' *'}
            </Text>
          )}
        </Animated.Text>
      </Animated.View>
    );
  };

  // Render helper text
  const renderHelper = () => {
    const shouldShowHelper = mergedConfig.helper.text && 
      (!mergedConfig.helper.showOnFocus || isFocused) &&
      (!mergedConfig.helper.showOnError || hasError);

    const shouldShowValidation = validationMessage && 
      (validationState === 'error' || validationState === 'success');

    const shouldShowCharacterCount = mergedConfig.validation.showCharacterCount &&
      mergedConfig.validation.maxLength;

    if (!shouldShowHelper && !shouldShowValidation && !shouldShowCharacterCount) {
      return null;
    }

    return (
      <View style={styles.helperContainer}>
        <View style={styles.helperTextContainer}>
          {shouldShowHelper && (
            <Text style={helperStyles}>
              {mergedConfig.helper.text}
            </Text>
          )}
          {shouldShowValidation && (
            <Text style={[helperStyles, styles[`helper_${validationState}`]]}>
              {validationMessage}
            </Text>
          )}
        </View>
        {shouldShowCharacterCount && (
          <Text style={[styles.characterCount, characterCount > mergedConfig.validation.maxLength! && styles.characterCountError]}>
            {characterCount}/{mergedConfig.validation.maxLength}
          </Text>
        )}
      </View>
    );
  };

  // Render icons
  const renderLeftIcon = () => {
    if (!mergedConfig.icon.left) return null;

    return (
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={mergedConfig.icon.onPress}
        disabled={!mergedConfig.icon.onPress}
        accessibilityLabel={mergedConfig.icon.accessibilityLabel}
      >
        {mergedConfig.icon.left}
      </TouchableOpacity>
    );
  };

  const renderRightIcon = () => {
    if (!mergedConfig.icon.right) return null;

    return (
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={mergedConfig.icon.onPress}
        disabled={!mergedConfig.icon.onPress}
        accessibilityLabel={mergedConfig.icon.accessibilityLabel}
      >
        {mergedConfig.icon.right}
      </TouchableOpacity>
    );
  };

  // Render input component
  const renderInputComponent = () => {
    const baseInputProps = {
      style: inputStyles,
      value: currentValue,
      onChangeText: handleValueChange,
      onFocus: handleFocus,
      onBlur: handleBlur,
      onSubmitEditing: handleSubmit,
      onKeyPress,
      ref: inputRef,
      editable: !disabled && !readOnly,
    };

    const inputProps = {
      ...baseInputProps,
      // Add any additional props that might be passed
    };

    if (renderInput) {
      return renderInput(inputProps);
    }

    return (
      <RNTextInput
        {...inputProps}
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
      />
    );
  };

  // Render container
  const containerProps = {
    children: (
      <>
        {mergedConfig.label.position === 'top' && renderLabel()}
        <Animated.View style={inputContainerStyles}>
          {renderLeftIcon()}
          <View style={styles.inputWrapper}>
            {mergedConfig.label.position === 'floating' && renderLabel()}
            {renderInputComponent()}
          </View>
          {renderRightIcon()}
        </Animated.View>
        {renderHelper()}
      </>
    ),
    style: containerStyles,
    testID,
  };

  if (renderContainer) {
    return renderContainer(containerProps);
  }

  return (
    <View {...containerProps}>
      {containerProps.children}
    </View>
  );
});

// Add display name for debugging
InputBase.displayName = 'InputBase';

/**
 * InputBase styles
 */
const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 8,
  },
  labelContainer: {
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'ios' ? 'Futura' : 'Inter',
  },
  label_small: {
    fontSize: 12,
  },
  label_medium: {
    fontSize: 14,
  },
  label_large: {
    fontSize: 16,
  },
  required: {
    color: '#FF6B6B',
  },
  inputContainer: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: 'rgba(22, 33, 62, 0.2)',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  inputContainer_small: {
    minHeight: 44,
  },
  inputContainer_medium: {
    minHeight: 56,
  },
  inputContainer_large: {
    minHeight: 68,
  },
  inputContainer_default: {
    backgroundColor: 'rgba(22, 33, 62, 0.2)',
  },
  inputContainer_outlined: {
    backgroundColor: 'transparent',
    borderWidth: 2,
  },
  inputContainer_filled: {
    backgroundColor: 'rgba(22, 33, 62, 0.4)',
  },
  inputContainer_ghost: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  inputContainer_underlined: {
    borderWidth: 0,
    borderBottomWidth: 2,
    borderRadius: 0,
    backgroundColor: 'transparent',
  },
  inputContainer_disabled: {
    opacity: 0.5,
  },
  inputWrapper: {
    flex: 1,
    position: 'relative',
  },
  input: {
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'Inter',
    fontSize: 16,
    fontWeight: '400',
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  input_small: {
    fontSize: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  input_medium: {
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  input_large: {
    fontSize: 18,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  input_disabled: {
    opacity: 0.5,
  },
  iconContainer: {
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  helperContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 8,
    paddingHorizontal: 4,
  },
  helperTextContainer: {
    flex: 1,
  },
  helper: {
    fontSize: 12,
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'Inter',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  helper_default: {
    color: 'rgba(255, 255, 255, 0.6)',
  },
  helper_error: {
    color: '#FF6B6B',
  },
  helper_success: {
    color: '#51CF66',
  },
  helper_warning: {
    color: '#FFD43B',
  },
  characterCount: {
    fontSize: 12,
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'Inter',
    color: 'rgba(255, 255, 255, 0.4)',
    marginLeft: 8,
  },
  characterCountError: {
    color: '#FF6B6B',
  },
});

export default InputBase;

// Export public methods interface
export interface InputBaseRef {
  focus: () => void;
  blur: () => void;
  clear: () => void;
  validate: () => InputBaseValidationResult;
  getState: () => InputBaseState;
}
