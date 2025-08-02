/**
 * Corp Astro UI Library - NumberInput Primitive
 * 
 * Numeric input component with validation, formatting, and numeric constraints.
 * Provides number keyboard, value formatting, min/max validation, and decimal precision.
 * 
 * @module NumberInput
 * @version 1.0.0
 * @since 2024
 */

import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  TextInput as RNTextInput,
  View,
  Text,
  Animated,
  StyleSheet,
  ViewStyle,
  TextStyle,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInputChangeEventData,
  TextInputProps as RNTextInputProps,
  AccessibilityProps,
  Keyboard,
  Platform
} from 'react-native';

/**
 * NumberInput size variants
 */
export type NumberInputSize = 'small' | 'medium' | 'large';

/**
 * NumberInput variant styles
 */
export type NumberInputVariant = 'default' | 'outlined' | 'filled' | 'ghost';

/**
 * NumberInput validation state
 */
export type NumberInputValidationState = 'default' | 'error' | 'success' | 'warning';

/**
 * NumberInput label configuration
 */
export interface NumberInputLabelConfig {
  /** Label text */
  text: string;
  /** Floating label behavior */
  floating?: boolean;
  /** Label position */
  position?: 'top' | 'inside';
  /** Label font size */
  fontSize?: number;
  /** Label color */
  color?: string;
}

/**
 * NumberInput validation configuration
 */
export interface NumberInputValidationConfig {
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Number of decimal places */
  decimals?: number;
  /** Allow negative numbers */
  allowNegative?: boolean;
  /** Custom validation function */
  validator?: (value: number) => string | null;
  /** Show validation on blur */
  validateOnBlur?: boolean;
  /** Show validation on change */
  validateOnChange?: boolean;
}

/**
 * NumberInput formatting configuration
 */
export interface NumberInputFormatConfig {
  /** Thousand separators */
  thousandSeparator?: string;
  /** Decimal separator */
  decimalSeparator?: string;
  /** Currency symbol */
  currency?: string;
  /** Currency position */
  currencyPosition?: 'before' | 'after';
  /** Unit symbol */
  unit?: string;
  /** Unit position */
  unitPosition?: 'before' | 'after';
  /** Format display value */
  formatDisplay?: boolean;
}

/**
 * NumberInput icon configuration
 */
export interface NumberInputIconConfig {
  /** Icon name */
  name: string;
  /** Icon size */
  size?: number;
  /** Icon color */
  color?: string;
  /** Icon position */
  position?: 'left' | 'right';
  /** Icon press handler */
  onPress?: () => void;
  /** Icon accessibility label */
  accessibilityLabel?: string;
}

/**
 * NumberInput helper text configuration
 */
export interface NumberInputHelperConfig {
  /** Helper text */
  text?: string;
  /** Helper text color */
  color?: string;
  /** Helper text font size */
  fontSize?: number;
  /** Show helper text */
  show?: boolean;
}

/**
 * NumberInput props interface
 */
export interface NumberInputProps extends Omit<RNTextInputProps, 'value' | 'onChangeText'> {
  /** Input value */
  value?: number;
  /** Value change handler */
  onValueChange?: (value: number) => void;
  /** Text change handler */
  onTextChange?: (text: string) => void;
  /** Size variant */
  size?: NumberInputSize;
  /** Style variant */
  variant?: NumberInputVariant;
  /** Validation state */
  validationState?: NumberInputValidationState;
  /** Label configuration */
  label?: NumberInputLabelConfig;
  /** Validation configuration */
  validation?: NumberInputValidationConfig;
  /** Formatting configuration */
  format?: NumberInputFormatConfig;
  /** Left icon configuration */
  leftIcon?: NumberInputIconConfig;
  /** Right icon configuration */
  rightIcon?: NumberInputIconConfig;
  /** Helper text configuration */
  helper?: NumberInputHelperConfig;
  /** Error message */
  errorMessage?: string;
  /** Success message */
  successMessage?: string;
  /** Warning message */
  warningMessage?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Glass morphism effect */
  glassMorphism?: boolean;
  /** Glow effect */
  glowEffect?: boolean;
  /** Animation enabled */
  animated?: boolean;
  /** Container style */
  containerStyle?: ViewStyle;
  /** Input style */
  inputStyle?: TextStyle;
  /** Label style */
  labelStyle?: TextStyle;
  /** Helper text style */
  helperStyle?: TextStyle;
  /** Accessibility props */
  accessibilityProps?: AccessibilityProps;
}

/**
 * NumberInput validation result
 */
interface NumberInputValidationResult {
  isValid: boolean;
  message?: string;
  state: NumberInputValidationState;
}

/**
 * NumberInput Component
 * 
 * Premium numeric input with validation, formatting, and constraints.
 * Provides glass morphism effects, floating labels, and comprehensive validation.
 */
export const NumberInput: React.FC<NumberInputProps> = ({
  value = 0,
  onValueChange,
  onTextChange,
  size = 'medium',
  variant = 'default',
  validationState = 'default',
  label,
  validation,
  format,
  leftIcon,
  rightIcon,
  helper,
  errorMessage,
  successMessage,
  warningMessage,
  disabled = false,
  loading = false,
  glassMorphism = true,
  glowEffect = true,
  animated = true,
  containerStyle,
  inputStyle,
  labelStyle,
  helperStyle,
  accessibilityProps,
  ...props
}) => {
  // State management
  const [internalValue, setInternalValue] = useState<number>(value);
  const [displayValue, setDisplayValue] = useState<string>('');
  const [focused, setFocused] = useState(false);
  const [validationResult, setValidationResult] = useState<NumberInputValidationResult>({
    isValid: true,
    state: 'default'
  });

  // Refs
  const inputRef = useRef<RNTextInput>(null);
  const focusAnimation = useRef(new Animated.Value(0)).current;
  const scaleAnimation = useRef(new Animated.Value(1)).current;
  const glowAnimation = useRef(new Animated.Value(0)).current;

  // Format number for display
  const formatNumber = useCallback((num: number): string => {
    if (!format?.formatDisplay) return num.toString();

    let formatted = num.toString();

    // Apply decimal places
    if (validation?.decimals !== undefined) {
      formatted = num.toFixed(validation.decimals);
    }

    // Add thousand separators
    if (format.thousandSeparator) {
      const parts = formatted.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, format.thousandSeparator);
      formatted = parts.join(format.decimalSeparator || '.');
    }

    // Add currency
    if (format.currency) {
      formatted = format.currencyPosition === 'after' 
        ? `${formatted}${format.currency}`
        : `${format.currency}${formatted}`;
    }

    // Add unit
    if (format.unit) {
      formatted = format.unitPosition === 'after'
        ? `${formatted}${format.unit}`
        : `${format.unit}${formatted}`;
    }

    return formatted;
  }, [format, validation?.decimals]);

  // Parse text input to number
  const parseNumber = useCallback((text: string): number => {
    // Remove formatting characters
    let cleanText = text;
    
    if (format?.currency) {
      cleanText = cleanText.replace(format.currency, '');
    }
    
    if (format?.unit) {
      cleanText = cleanText.replace(format.unit, '');
    }
    
    if (format?.thousandSeparator) {
      cleanText = cleanText.replace(new RegExp(`\\${format.thousandSeparator}`, 'g'), '');
    }
    
    if (format?.decimalSeparator && format.decimalSeparator !== '.') {
      cleanText = cleanText.replace(format.decimalSeparator, '.');
    }

    const parsed = parseFloat(cleanText);
    return isNaN(parsed) ? 0 : parsed;
  }, [format]);

  // Validate number input
  const validateNumber = useCallback((num: number): NumberInputValidationResult => {
    let isValid = true;
    let message = '';
    let state: NumberInputValidationState = 'default';

    // Min validation
    if (validation?.min !== undefined && num < validation.min) {
      isValid = false;
      message = `Value must be at least ${validation.min}`;
      state = 'error';
    }

    // Max validation
    if (validation?.max !== undefined && num > validation.max) {
      isValid = false;
      message = `Value must be at most ${validation.max}`;
      state = 'error';
    }

    // Negative validation
    if (!validation?.allowNegative && num < 0) {
      isValid = false;
      message = 'Negative values are not allowed';
      state = 'error';
    }

    // Custom validation
    if (validation?.validator && isValid) {
      const customResult = validation.validator(num);
      if (customResult) {
        isValid = false;
        message = customResult;
        state = 'error';
      }
    }

    // Success state
    if (isValid && (validation?.min !== undefined || validation?.max !== undefined)) {
      state = 'success';
    }

    return { isValid, message, state };
  }, [validation]);

  // Handle value change
  const handleValueChange = useCallback((text: string) => {
    const numericValue = parseNumber(text);
    setInternalValue(numericValue);
    setDisplayValue(text);

    // Validation
    if (validation?.validateOnChange) {
      const result = validateNumber(numericValue);
      setValidationResult(result);
    }

    // Callbacks
    onValueChange?.(numericValue);
    onTextChange?.(text);
  }, [parseNumber, validateNumber, validation?.validateOnChange, onValueChange, onTextChange]);

  // Handle focus
  const handleFocus = useCallback((e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setFocused(true);
    
    if (animated) {
      Animated.parallel([
        Animated.timing(focusAnimation, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(scaleAnimation, {
          toValue: 1.02,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnimation, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        })
      ]).start();
    }

    props.onFocus?.(e);
  }, [animated, focusAnimation, scaleAnimation, glowAnimation, props.onFocus]);

  // Handle blur
  const handleBlur = useCallback((e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setFocused(false);
    
    if (animated) {
      Animated.parallel([
        Animated.timing(focusAnimation, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(scaleAnimation, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnimation, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        })
      ]).start();
    }

    // Validation on blur
    if (validation?.validateOnBlur) {
      const result = validateNumber(internalValue);
      setValidationResult(result);
    }

    // Format display value
    if (format?.formatDisplay) {
      setDisplayValue(formatNumber(internalValue));
    }

    props.onBlur?.(e);
  }, [animated, focusAnimation, scaleAnimation, glowAnimation, validation?.validateOnBlur, validateNumber, internalValue, format?.formatDisplay, formatNumber, props.onBlur]);

  // Initialize display value
  useEffect(() => {
    setInternalValue(value);
    setDisplayValue(format?.formatDisplay ? formatNumber(value) : value.toString());
  }, [value, format?.formatDisplay, formatNumber]);

  // Get current validation state
  const getCurrentValidationState = useCallback((): NumberInputValidationState => {
    if (errorMessage || validationResult.state === 'error') return 'error';
    if (successMessage || validationResult.state === 'success') return 'success';
    if (warningMessage || validationResult.state === 'warning') return 'warning';
    return validationState;
  }, [errorMessage, successMessage, warningMessage, validationState, validationResult.state]);

  // Get current message
  const getCurrentMessage = useCallback((): string => {
    if (errorMessage) return errorMessage;
    if (validationResult.message) return validationResult.message;
    if (successMessage) return successMessage;
    if (warningMessage) return warningMessage;
    return helper?.text || '';
  }, [errorMessage, successMessage, warningMessage, helper?.text, validationResult.message]);

  // Size configurations
  const sizeConfigs = {
    small: { height: 44, fontSize: 14, paddingHorizontal: 16, borderRadius: 12 },
    medium: { height: 56, fontSize: 16, paddingHorizontal: 20, borderRadius: 16 },
    large: { height: 64, fontSize: 18, paddingHorizontal: 24, borderRadius: 20 }
  };

  const sizeConfig = sizeConfigs[size];
  const currentValidationState = getCurrentValidationState();
  const currentMessage = getCurrentMessage();

  // Styles
  const containerStyles = StyleSheet.create({
    container: {
      width: '100%',
      ...(containerStyle as object),
    },
    labelContainer: {
      marginBottom: label?.position === 'top' ? 8 : 0,
    },
    inputContainer: {
      position: 'relative',
      height: sizeConfig.height,
      borderRadius: sizeConfig.borderRadius,
      backgroundColor: glassMorphism ? 'rgba(22,33,62,0.2)' : 'rgba(255,255,255,0.05)',
      borderWidth: 1,
      borderColor: focused 
        ? (currentValidationState === 'error' ? 'rgba(255,112,82,0.5)' : 'rgba(46,134,222,0.5)')
        : currentValidationState === 'error' 
        ? 'rgba(255,112,82,0.3)'
        : 'rgba(255,255,255,0.1)',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: sizeConfig.paddingHorizontal,
      overflow: 'hidden',
    },
    input: {
      flex: 1,
      height: '100%',
      fontSize: sizeConfig.fontSize,
      color: disabled ? 'rgba(255,255,255,0.3)' : '#FFFFFF',
      fontFamily: 'Inter',
      includeFontPadding: false,
      textAlignVertical: 'center',
      ...(inputStyle as object),
    },
    label: {
      fontSize: label?.fontSize || 14,
      fontWeight: '500' as const,
      color: label?.color || '#B8B8C0',
      fontFamily: 'Inter',
      ...(labelStyle as object),
    },
    helperText: {
      fontSize: helper?.fontSize || 12,
      color: currentValidationState === 'error' 
        ? '#FF7052' 
        : currentValidationState === 'success'
        ? '#34D399'
        : currentValidationState === 'warning'
        ? '#FBBF24'
        : helper?.color || '#B8B8C0',
      fontFamily: 'Inter',
      marginTop: 4,
      ...(helperStyle as object),
    },
    iconContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 8,
    },
    glowEffect: {
      position: 'absolute',
      top: -2,
      left: -2,
      right: -2,
      bottom: -2,
      borderRadius: sizeConfig.borderRadius + 2,
      opacity: glowAnimation,
    },
  });

  // Glow effect color
  const glowColor = currentValidationState === 'error' 
    ? 'rgba(255,112,82,0.2)'
    : currentValidationState === 'success'
    ? 'rgba(52,211,153,0.2)'
    : 'rgba(46,134,222,0.2)';

  return (
    <View style={containerStyles.container}>
      {/* Label */}
      {label && label.position === 'top' && (
        <View style={containerStyles.labelContainer}>
          <Text style={containerStyles.label}>{label.text}</Text>
        </View>
      )}

      {/* Input Container */}
      <Animated.View 
        style={[
          containerStyles.inputContainer,
          { transform: [{ scale: scaleAnimation }] }
        ]}
      >
        {/* Glow Effect */}
        {glowEffect && focused && (
          <Animated.View 
            style={[
              containerStyles.glowEffect,
              { 
                shadowColor: glowColor,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 1,
                shadowRadius: 8,
                elevation: 8,
              }
            ]} 
          />
        )}

        {/* Left Icon */}
        {leftIcon && (
          <View style={containerStyles.iconContainer}>
            {/* Icon implementation would go here */}
          </View>
        )}

        {/* Input */}
        <RNTextInput
          ref={inputRef}
          value={displayValue}
          onChangeText={handleValueChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={containerStyles.input}
          placeholderTextColor="rgba(255,255,255,0.4)"
          keyboardType="numeric"
          editable={!disabled && !loading}
          selectTextOnFocus={!disabled}
          accessible={true}
          accessibilityLabel={label?.text}
          accessibilityHint={`Enter a number${validation?.min !== undefined ? ` between ${validation.min}` : ''}${validation?.max !== undefined ? ` and ${validation.max}` : ''}`}
          accessibilityRole="none"
          accessibilityState={{
            disabled: disabled,
            selected: focused,
          }}
          {...accessibilityProps}
          {...props}
        />

        {/* Right Icon */}
        {rightIcon && (
          <View style={containerStyles.iconContainer}>
            {/* Icon implementation would go here */}
          </View>
        )}
      </Animated.View>

      {/* Helper Text */}
      {(currentMessage || helper?.show) && (
        <Text style={containerStyles.helperText}>
          {currentMessage}
        </Text>
      )}
    </View>
  );
};

// Default export
export default NumberInput;
