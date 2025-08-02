/**
 * Corp Astro UI Library - CodeInput Primitive
 * 
 * Code/PIN input component with individual digit inputs, validation,
 * and security features. Supports OTP, PIN, and verification codes.
 * 
 * @module CodeInput
 * @version 1.0.0
 * @since 2024
 */

import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  TextInput as RNTextInput,
  StyleSheet,
  ViewStyle,
  TextStyle,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  AccessibilityProps,
  Platform,
  Animated,
  Vibration,
} from 'react-native';

/**
 * CodeInput size variants
 */
export type CodeInputSize = 'small' | 'medium' | 'large';

/**
 * CodeInput variant styles
 */
export type CodeInputVariant = 'default' | 'outlined' | 'filled' | 'underlined';

/**
 * CodeInput validation state
 */
export type CodeInputValidationState = 'default' | 'error' | 'success' | 'warning';

/**
 * CodeInput type
 */
export type CodeInputType = 'numeric' | 'alphanumeric' | 'alphabetic';

/**
 * CodeInput label configuration
 */
export interface CodeInputLabelConfig {
  /** Label text */
  text: string;
  /** Label position */
  position?: 'top' | 'bottom' | 'floating';
  /** Label styling */
  style?: TextStyle;
  /** Required indicator */
  required?: boolean;
  /** Required indicator color */
  requiredColor?: string;
}

/**
 * CodeInput validation configuration
 */
export interface CodeInputValidationConfig {
  /** Validation function */
  validate?: (code: string) => boolean | string;
  /** Validation triggers */
  triggers?: Array<'onChange' | 'onComplete' | 'onSubmit'>;
  /** Real-time validation */
  realTime?: boolean;
  /** Debounce delay for real-time validation */
  debounceMs?: number;
  /** Custom validation message */
  message?: string;
  /** Validation message styling */
  messageStyle?: TextStyle;
  /** Minimum length validation */
  minLength?: number;
  /** Maximum length validation */
  maxLength?: number;
  /** Pattern validation */
  pattern?: RegExp;
}

/**
 * CodeInput security configuration
 */
export interface CodeInputSecurityConfig {
  /** Mask input after typing */
  maskInput?: boolean;
  /** Mask delay in milliseconds */
  maskDelay?: number;
  /** Mask character */
  maskCharacter?: string;
  /** Clear on app backgrounding */
  clearOnBackground?: boolean;
  /** Prevent screenshots */
  preventScreenshots?: boolean;
}

/**
 * CodeInput animation configuration
 */
export interface CodeInputAnimationConfig {
  /** Enable focus animations */
  focusAnimation?: boolean;
  /** Animation duration */
  duration?: number;
  /** Animation easing */
  easing?: any;
  /** Digit entry animation */
  digitAnimation?: boolean;
  /** Error shake animation */
  errorShake?: boolean;
  /** Success pulse animation */
  successPulse?: boolean;
}

/**
 * CodeInput configuration object
 */
export interface CodeInputConfig {
  /** Label configuration */
  label?: CodeInputLabelConfig;
  /** Validation configuration */
  validation?: CodeInputValidationConfig;
  /** Security configuration */
  security?: CodeInputSecurityConfig;
  /** Animation configuration */
  animation?: CodeInputAnimationConfig;
  /** Accessibility configuration */
  accessibility?: AccessibilityProps;
}

/**
 * CodeInput component state
 */
export interface CodeInputState {
  /** Current code values */
  values: string[];
  /** Current focused index */
  focusedIndex: number;
  /** Validation state */
  validationState: CodeInputValidationState;
  /** Validation message */
  validationMessage: string;
  /** Is code complete */
  isComplete: boolean;
  /** Is code valid */
  isValid: boolean;
  /** Masked values for security */
  maskedValues: string[];
}

/**
 * CodeInput event handlers
 */
export interface CodeInputHandlers {
  /** Code change handler */
  onCodeChange?: (code: string, isComplete: boolean) => void;
  /** Code complete handler */
  onCodeComplete?: (code: string) => void;
  /** Validation handler */
  onValidation?: (isValid: boolean, message: string) => void;
  /** Focus handler */
  onFocus?: (index: number) => void;
  /** Blur handler */
  onBlur?: (index: number) => void;
  /** Submit handler */
  onSubmit?: (code: string) => void;
}

/**
 * CodeInput component props
 */
export interface CodeInputProps extends CodeInputHandlers {
  /** Number of code digits */
  length?: number;
  /** Initial code value */
  value?: string;
  /** Component size */
  size?: CodeInputSize;
  /** Component variant */
  variant?: CodeInputVariant;
  /** Input type */
  type?: CodeInputType;
  /** Validation state */
  validationState?: CodeInputValidationState;
  /** Placeholder character */
  placeholder?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether the input is read-only */
  readOnly?: boolean;
  /** Whether the input is required */
  required?: boolean;
  /** Auto-focus first input */
  autoFocus?: boolean;
  /** Select text on focus */
  selectTextOnFocus?: boolean;
  /** Enable haptic feedback */
  enableHaptics?: boolean;
  /** Component configuration */
  config?: CodeInputConfig;
  /** Custom styling */
  style?: ViewStyle;
  /** Custom input styling */
  inputStyle?: TextStyle;
  /** Custom container styling */
  containerStyle?: ViewStyle;
  /** Test ID for testing */
  testID?: string;
}

/**
 * CodeInput primitive component
 */
export const CodeInput: React.FC<CodeInputProps> = ({
  length = 4,
  value = '',
  size = 'medium',
  variant = 'default',
  type = 'numeric',
  validationState = 'default',
  placeholder = '',
  disabled = false,
  readOnly = false,
  required = false,
  autoFocus = false,
  selectTextOnFocus = true,
  enableHaptics = true,
  config = {},
  style,
  inputStyle,
  containerStyle,
  testID = 'code-input',
  onCodeChange,
  onCodeComplete,
  onValidation,
  onFocus,
  onBlur,
  onSubmit,
}) => {
  // Initialize values array
  const initializeValues = useCallback(() => {
    const values = new Array(length).fill('');
    if (value) {
      const chars = value.split('');
      chars.forEach((char, index) => {
        if (index < length) {
          values[index] = char;
        }
      });
    }
    return values;
  }, [length, value]);

  // State management
  const [state, setState] = useState<CodeInputState>({
    values: initializeValues(),
    focusedIndex: -1,
    validationState,
    validationMessage: '',
    isComplete: false,
    isValid: false,
    maskedValues: initializeValues(),
  });

  // Refs for input elements
  const inputRefs = useRef<Array<RNTextInput | null>>([]);
  const animationRefs = useRef<Array<Animated.Value>>([]);
  const shakeAnimationRef = useRef(new Animated.Value(0)).current;

  // Initialize animation refs
  useEffect(() => {
    animationRefs.current = Array(length).fill(null).map(() => new Animated.Value(0));
  }, [length]);

  // Get keyboard type based on input type
  const getKeyboardType = () => {
    switch (type) {
      case 'numeric':
        return 'number-pad';
      case 'alphanumeric':
        return 'default';
      case 'alphabetic':
        return 'default';
      default:
        return 'number-pad';
    }
  };

  // Validate character input
  const isValidCharacter = useCallback((char: string): boolean => {
    switch (type) {
      case 'numeric':
        return /^\d$/.test(char);
      case 'alphanumeric':
        return /^[a-zA-Z0-9]$/.test(char);
      case 'alphabetic':
        return /^[a-zA-Z]$/.test(char);
      default:
        return true;
    }
  }, [type]);

  // Validate complete code
  const validateCode = useCallback((code: string): { isValid: boolean; message: string } => {
    if (!code && required) {
      return { isValid: false, message: 'Code is required' };
    }

    if (!code) {
      return { isValid: true, message: '' };
    }

    const validation = config.validation;
    if (!validation) {
      return { isValid: true, message: '' };
    }

    // Length validation
    if (validation.minLength && code.length < validation.minLength) {
      return { isValid: false, message: `Code must be at least ${validation.minLength} characters` };
    }

    if (validation.maxLength && code.length > validation.maxLength) {
      return { isValid: false, message: `Code must not exceed ${validation.maxLength} characters` };
    }

    // Pattern validation
    if (validation.pattern && !validation.pattern.test(code)) {
      return { isValid: false, message: validation.message || 'Invalid code format' };
    }

    // Custom validation
    if (validation.validate) {
      const result = validation.validate(code);
      if (typeof result === 'string') {
        return { isValid: false, message: result };
      }
      return { isValid: result, message: result ? '' : 'Invalid code' };
    }

    return { isValid: true, message: '' };
  }, [required, config.validation]);

  // Handle character input
  const handleCharacterInput = useCallback((text: string, index: number) => {
    if (disabled || readOnly) return;

    const char = text.slice(-1);
    if (!isValidCharacter(char)) return;

    const newValues = [...state.values];
    newValues[index] = char;

    // Handle masking
    const newMaskedValues = [...state.maskedValues];
    newMaskedValues[index] = char;

    // Apply masking with delay
    if (config.security?.maskInput) {
      setTimeout(() => {
        setState(prev => ({
          ...prev,
          maskedValues: prev.maskedValues.map((val, i) => 
            i === index ? (config.security?.maskCharacter || '●') : val
          ),
        }));
      }, config.security.maskDelay || 500);
    }

    const code = newValues.join('');
    const isComplete = newValues.every(val => val !== '');
    
    // Validation
    let validationResult = { isValid: true, message: '' };
    if (config.validation?.realTime || (isComplete && config.validation?.triggers?.includes('onComplete'))) {
      validationResult = validateCode(code);
    }

    setState(prev => ({
      ...prev,
      values: newValues,
      maskedValues: newMaskedValues,
      isComplete,
      isValid: validationResult.isValid,
      validationState: validationResult.isValid ? 'success' : 'error',
      validationMessage: validationResult.message,
    }));

    // Haptic feedback
    if (enableHaptics && Platform.OS === 'ios') {
      Vibration.vibrate(50);
    }

    // Animate digit entry
    if (config.animation?.digitAnimation) {
      Animated.sequence([
        Animated.timing(animationRefs.current[index], {
          toValue: 1,
          duration: config.animation.duration || 150,
          useNativeDriver: true,
        }),
        Animated.timing(animationRefs.current[index], {
          toValue: 0,
          duration: config.animation.duration || 150,
          useNativeDriver: true,
        }),
      ]).start();
    }

    // Move to next input
    if (char && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Callbacks
    onCodeChange?.(code, isComplete);
    onValidation?.(validationResult.isValid, validationResult.message);

    if (isComplete) {
      onCodeComplete?.(code);
      
      // Success animation
      if (validationResult.isValid && config.animation?.successPulse) {
        animationRefs.current.forEach(ref => {
          Animated.sequence([
            Animated.timing(ref, {
              toValue: 1,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(ref, {
              toValue: 0,
              duration: 200,
              useNativeDriver: true,
            }),
          ]).start();
        });
      }
      
      // Error animation
      if (!validationResult.isValid && config.animation?.errorShake) {
        Animated.sequence([
          Animated.timing(shakeAnimationRef, {
            toValue: 10,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(shakeAnimationRef, {
            toValue: -10,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(shakeAnimationRef, {
            toValue: 10,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(shakeAnimationRef, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
          }),
        ]).start();
      }
    }
  }, [state.values, state.maskedValues, disabled, readOnly, isValidCharacter, config, length, validateCode, enableHaptics, onCodeChange, onCodeComplete, onValidation]);

  // Handle key press
  const handleKeyPress = useCallback((event: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
    if (event.nativeEvent.key === 'Backspace') {
      if (state.values[index] === '' && index > 0) {
        // Move to previous input if current is empty
        inputRefs.current[index - 1]?.focus();
      } else {
        // Clear current input
        const newValues = [...state.values];
        newValues[index] = '';
        
        const newMaskedValues = [...state.maskedValues];
        newMaskedValues[index] = '';

        setState(prev => ({
          ...prev,
          values: newValues,
          maskedValues: newMaskedValues,
          isComplete: false,
          validationState: 'default',
          validationMessage: '',
        }));

        const code = newValues.join('');
        onCodeChange?.(code, false);
      }
    }
  }, [state.values, onCodeChange]);

  // Handle focus
  const handleFocus = useCallback((index: number) => {
    setState(prev => ({ ...prev, focusedIndex: index }));
    
    if (config.animation?.focusAnimation) {
      Animated.timing(animationRefs.current[index], {
        toValue: 1,
        duration: config.animation.duration || 200,
        useNativeDriver: true,
      }).start();
    }
    
    onFocus?.(index);
  }, [config.animation, onFocus]);

  // Handle blur
  const handleBlur = useCallback((index: number) => {
    setState(prev => ({ ...prev, focusedIndex: -1 }));
    
    if (config.animation?.focusAnimation) {
      Animated.timing(animationRefs.current[index], {
        toValue: 0,
        duration: config.animation.duration || 200,
        useNativeDriver: true,
      }).start();
    }
    
    onBlur?.(index);
  }, [config.animation, onBlur]);

  // Handle submit
  const handleSubmit = useCallback(() => {
    const code = state.values.join('');
    const validationResult = validateCode(code);
    
    setState(prev => ({
      ...prev,
      validationState: validationResult.isValid ? 'success' : 'error',
      validationMessage: validationResult.message,
      isValid: validationResult.isValid,
    }));
    
    if (validationResult.isValid) {
      onSubmit?.(code);
    }
    
    onValidation?.(validationResult.isValid, validationResult.message);
  }, [state.values, validateCode, onSubmit, onValidation]);

  // Get input styles
  const getInputStyles = (index: number): ViewStyle => {
    const baseStyles = [
      styles.input,
      styles[`input_${size}`],
      styles[`input_${variant}`],
      styles[`input_${state.validationState}`],
    ];

    if (state.focusedIndex === index) {
      baseStyles.push(styles.input_focused);
    }

    if (disabled) {
      baseStyles.push(styles.input_disabled);
    }

    return StyleSheet.flatten(baseStyles);
  };

  // Get text styles
  const getTextStyles = (): TextStyle => {
    const baseStyles: TextStyle[] = [
      styles.text,
      styles[`text_${size}`],
    ];

    if (disabled) {
      baseStyles.push(styles.text_disabled);
    }

    return StyleSheet.flatten([...baseStyles, inputStyle]);
  };

  // Render label
  const renderLabel = () => {
    if (!config.label?.text) return null;

    return (
      <View style={styles.labelContainer}>
        <Text style={[styles.label, config.label.style]}>
          {config.label.text}
          {(config.label.required || required) && (
            <Text style={[styles.required, { color: config.label.requiredColor || '#FF6B6B' }]}>
              {' *'}
            </Text>
          )}
        </Text>
      </View>
    );
  };

  // Render validation message
  const renderValidationMessage = () => {
    if (!state.validationMessage) return null;

    return (
      <Text style={[
        styles.validationMessage,
        styles[`validationMessage_${state.validationState}`],
        config.validation?.messageStyle
      ]}>
        {state.validationMessage}
      </Text>
    );
  };

  // Render input
  const renderInput = (index: number) => {
    const displayValue = config.security?.maskInput ? state.maskedValues[index] : state.values[index];
    
    return (
      <Animated.View
        key={index}
        style={[
          getInputStyles(index),
          {
            transform: [
              {
                scale: animationRefs.current[index]?.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.1],
                }) || 1,
              },
              {
                translateX: index === 0 ? shakeAnimationRef : 0,
              },
            ],
          },
        ]}
      >
        <RNTextInput
          ref={(ref) => { inputRefs.current[index] = ref; }}
          style={getTextStyles()}
          value={displayValue}
          placeholder={placeholder}
          placeholderTextColor="rgba(184, 184, 192, 0.6)"
          onChangeText={(text) => handleCharacterInput(text, index)}
          onKeyPress={(event) => handleKeyPress(event, index)}
          onFocus={() => handleFocus(index)}
          onBlur={() => handleBlur(index)}
          onSubmitEditing={handleSubmit}
          editable={!disabled && !readOnly}
          maxLength={1}
          keyboardType={getKeyboardType()}
          autoCapitalize="none"
          autoCorrect={false}
          spellCheck={false}
          selectTextOnFocus={selectTextOnFocus}
          autoFocus={autoFocus && index === 0}
          secureTextEntry={config.security?.maskInput}
          textAlign="center"
          {...config.accessibility}
        />
      </Animated.View>
    );
  };

  return (
    <View style={[styles.container, containerStyle, style]} testID={testID}>
      {config.label?.position === 'top' && renderLabel()}
      
      <Animated.View
        style={[
          styles.inputContainer,
          {
            transform: [{ translateX: shakeAnimationRef }],
          },
        ]}
      >
        {Array(length).fill(null).map((_, index) => renderInput(index))}
      </Animated.View>
      
      {config.label?.position === 'bottom' && renderLabel()}
      {renderValidationMessage()}
    </View>
  );
};

/**
 * CodeInput styles
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
  required: {
    color: '#FF6B6B',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  input: {
    backgroundColor: 'rgba(22, 33, 62, 0.2)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input_small: {
    width: 40,
    height: 40,
  },
  input_medium: {
    width: 56,
    height: 56,
  },
  input_large: {
    width: 64,
    height: 64,
  },
  input_default: {
    // Default input styles
  },
  input_outlined: {
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
  input_filled: {
    backgroundColor: 'rgba(22, 33, 62, 0.4)',
  },
  input_underlined: {
    borderWidth: 0,
    borderBottomWidth: 2,
    borderRadius: 0,
    backgroundColor: 'transparent',
  },
  input_focused: {
    borderColor: 'rgba(46, 134, 222, 0.5)',
    shadowColor: '#2E86DE',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.3,
    elevation: 25,
  },
  input_disabled: {
    opacity: 0.5,
  },
  input_error: {
    borderColor: '#FF6B6B',
  },
  input_success: {
    borderColor: '#51CF66',
  },
  input_warning: {
    borderColor: '#FFD43B',
  },
  text: {
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'Inter',
    fontWeight: '600',
  },
  text_small: {
    fontSize: 18,
  },
  text_medium: {
    fontSize: 24,
  },
  text_large: {
    fontSize: 32,
  },
  text_disabled: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
  validationMessage: {
    fontSize: 12,
    marginTop: 8,
    paddingHorizontal: 4,
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'Inter',
  },
  validationMessage_default: {
    color: 'rgba(184, 184, 192, 0.8)',
  },
  validationMessage_error: {
    color: '#FF6B6B',
  },
  validationMessage_success: {
    color: '#51CF66',
  },
  validationMessage_warning: {
    color: '#FFD43B',
  },
});

export default CodeInput;
