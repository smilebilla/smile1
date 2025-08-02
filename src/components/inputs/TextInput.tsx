/**
 * Corp Astro UI Library - TextInput Primitive
 * 
 * Standard text input component with premium styling, glass morphism effects,
 * and comprehensive validation states. Provides foundation for all text-based inputs.
 * 
 * @module TextInput
 * @version 1.0.0
 * @since 2024
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  AccessibilityProps,
  Animated,
  NativeSyntheticEvent,
  Platform,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleSheet,
  Text,
  TextInputFocusEventData,
  TextStyle,
  View,
  ViewStyle
} from 'react-native';

/**
 * TextInput size variants
 */
export type TextInputSize = 'small' | 'medium' | 'large';

/**
 * TextInput variant styles
 */
export type TextInputVariant = 'default' | 'outlined' | 'filled' | 'ghost';

/**
 * TextInput validation state
 */
export type TextInputValidationState = 'default' | 'error' | 'success' | 'warning';

/**
 * TextInput label configuration
 */
export interface TextInputLabelConfig {
  /** Label text */
  text: string;
  /** Label position */
  position?: 'top' | 'floating' | 'inside';
  /** Label style override */
  style?: TextStyle;
  /** Required indicator */
  required?: boolean;
  /** Required indicator color */
  requiredColor?: string;
}

/**
 * TextInput validation configuration
 */
export interface TextInputValidationConfig {
  /** Validation state */
  state: TextInputValidationState;
  /** Validation message */
  message?: string;
  /** Show validation icon */
  showIcon?: boolean;
  /** Custom validation icon */
  customIcon?: React.ReactNode;
  /** Validation message style */
  messageStyle?: TextStyle;
}

/**
 * TextInput animation configuration
 */
export interface TextInputAnimationConfig {
  /** Focus animation duration */
  focusDuration?: number;
  /** Blur animation duration */
  blurDuration?: number;
  /** Label animation duration */
  labelDuration?: number;
  /** Glow animation duration */
  glowDuration?: number;
  /** Enable spring animation */
  useSpring?: boolean;
}

/**
 * TextInput configuration
 */
export interface TextInputConfig {
  /** Input size */
  size?: TextInputSize;
  /** Input variant */
  variant?: TextInputVariant;
  /** Animation configuration */
  animation?: TextInputAnimationConfig;
  /** Enable glass morphism */
  enableGlassMorphism?: boolean;
  /** Enable glow effects */
  enableGlow?: boolean;
  /** Enable floating label */
  enableFloatingLabel?: boolean;
  /** Enable character counter */
  enableCharacterCounter?: boolean;
  /** Enable haptic feedback */
  enableHaptics?: boolean;
  /** Auto-resize for multiline */
  autoResize?: boolean;
  /** Debounce delay in ms */
  debounceDelay?: number;
}

/**
 * TextInput state management
 */
export interface TextInputState {
  /** Input value */
  value: string;
  /** Focus state */
  isFocused: boolean;
  /** Validation state */
  validation: TextInputValidationState;
  /** Character count */
  characterCount: number;
  /** Is empty state */
  isEmpty: boolean;
  /** Has error state */
  hasError: boolean;
  /** Is disabled state */
  isDisabled: boolean;
}

/**
 * TextInput event handlers
 */
export interface TextInputHandlers {
  /** Text change handler */
  onChangeText?: (text: string) => void;
  /** Focus handler */
  onFocus?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  /** Blur handler */
  onBlur?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  /** Submit handler */
  onSubmitEditing?: (event: NativeSyntheticEvent<{ text: string }>) => void;
  /** Key press handler */
  onKeyPress?: (event: NativeSyntheticEvent<{ key: string }>) => void;
  /** Validation handler */
  onValidation?: (state: TextInputValidationState, message?: string) => void;
  /** Clear handler */
  onClear?: () => void;
}

/**
 * TextInput component props
 */
export interface TextInputProps extends AccessibilityProps, TextInputHandlers {
  /** Input value */
  value?: string;
  /** Default value */
  defaultValue?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Label configuration */
  label?: TextInputLabelConfig;
  /** Validation configuration */
  validation?: TextInputValidationConfig;
  /** Input configuration */
  config?: TextInputConfig;
  /** Maximum length */
  maxLength?: number;
  /** Minimum length for validation */
  minLength?: number;
  /** Required field */
  required?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Readonly state */
  readonly?: boolean;
  /** Multiline input */
  multiline?: boolean;
  /** Number of lines for multiline */
  numberOfLines?: number;
  /** Auto-focus */
  autoFocus?: boolean;
  /** Keyboard type */
  keyboardType?: RNTextInputProps['keyboardType'];
  /** Return key type */
  returnKeyType?: RNTextInputProps['returnKeyType'];
  /** Auto-capitalize */
  autoCapitalize?: RNTextInputProps['autoCapitalize'];
  /** Auto-correct */
  autoCorrect?: boolean;
  /** Secure text entry */
  secureTextEntry?: boolean;
  /** Selection color */
  selectionColor?: string;
  /** Container style */
  containerStyle?: ViewStyle;
  /** Input style */
  inputStyle?: TextStyle;
  /** Left icon */
  leftIcon?: React.ReactNode;
  /** Right icon */
  rightIcon?: React.ReactNode;
  /** Test ID */
  testID?: string;
  /** Ref for the input */
  ref?: React.Ref<RNTextInput>;
}

/**
 * Default TextInput configuration
 */
const defaultConfig: Required<TextInputConfig> = {
  size: 'medium',
  variant: 'default',
  animation: {
    focusDuration: 200,
    blurDuration: 200,
    labelDuration: 200,
    glowDuration: 300,
    useSpring: true
  },
  enableGlassMorphism: true,
  enableGlow: true,
  enableFloatingLabel: true,
  enableCharacterCounter: false,
  enableHaptics: true,
  autoResize: false,
  debounceDelay: 300
};

/**
 * TextInput size configurations
 */
const sizeConfigs = {
  small: {
    height: 48,
    fontSize: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    labelFontSize: 12
  },
  medium: {
    height: 56,
    fontSize: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    labelFontSize: 14
  },
  large: {
    height: 64,
    fontSize: 18,
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderRadius: 20,
    labelFontSize: 16
  }
};

/**
 * TextInput validation colors
 */
const validationColors = {
  default: 'rgba(255,255,255,0.1)',
  error: 'rgba(255,112,82,0.5)',
  success: 'rgba(52,211,153,0.5)',
  warning: 'rgba(255,193,7,0.5)'
};

/**
 * TextInput validation glow colors
 */
const validationGlowColors = {
  default: 'rgba(46,134,222,0.2)',
  error: 'rgba(255,112,82,0.2)',
  success: 'rgba(52,211,153,0.2)',
  warning: 'rgba(255,193,7,0.2)'
};

/**
 * Create glow animation
 */
const createGlowAnimation = (
  animatedValue: Animated.Value,
  toValue: number,
  duration: number = 300
) => {
  return Animated.timing(animatedValue, {
    toValue,
    duration,
    useNativeDriver: false
  });
};

/**
 * Create scale animation
 */
const createScaleAnimation = (
  animatedValue: Animated.Value,
  toValue: number,
  duration: number = 200
) => {
  return Animated.spring(animatedValue, {
    toValue,
    tension: 100,
    friction: 8,
    useNativeDriver: true
  });
};

/**
 * TextInput Component
 * 
 * Premium text input with glass morphism, glow effects, floating labels,
 * comprehensive validation, and smooth animations.
 * 
 * Features:
 * - Glass morphism background with blur effects
 * - Glow animations on focus with validation colors
 * - Floating label with smooth transitions
 * - Comprehensive validation states (error, success, warning)
 * - Character counter with limit validation
 * - Haptic feedback on focus/blur
 * - Auto-resize for multiline inputs
 * - Debounced input handling
 * - Full accessibility support
 * 
 * @param props - TextInput component props
 * @returns JSX.Element
 */
export const TextInput: React.FC<TextInputProps> = React.forwardRef<RNTextInput, TextInputProps>((
  {
    value: controlledValue,
    defaultValue = '',
    placeholder = '',
    label,
    validation,
    config = {},
    maxLength,
    minLength,
    required = false,
    disabled = false,
    readonly = false,
    multiline = false,
    numberOfLines = 1,
    autoFocus = false,
    keyboardType = 'default',
    returnKeyType = 'done',
    autoCapitalize = 'none',
    autoCorrect = false,
    secureTextEntry = false,
    selectionColor = 'rgba(46,134,222,0.5)',
    containerStyle,
    inputStyle,
    leftIcon,
    rightIcon,
    testID,
    onChangeText,
    onFocus,
    onBlur,
    onSubmitEditing,
    onKeyPress,
    onValidation,
    onClear,
    ...accessibilityProps
  },
  ref
) => {
  // Merge configuration with defaults
  const mergedConfig = { ...defaultConfig, ...config };
  const sizeConfig = sizeConfigs[mergedConfig.size];
  
  // Component state
  const [internalValue, setInternalValue] = useState(controlledValue || defaultValue);
  const [isFocused, setIsFocused] = useState(false);
  const [validationState, setValidationState] = useState<TextInputValidationState>(
    validation?.state || 'default'
  );
  
  // Use controlled or internal value
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const isEmpty = !value || value.length === 0;
  const characterCount = value ? value.length : 0;
  const hasError = validationState === 'error';
  
  // Animation values
  const focusAnimation = useRef(new Animated.Value(0)).current;
  const glowAnimation = useRef(new Animated.Value(0)).current;
  const labelAnimation = useRef(new Animated.Value(isEmpty ? 0 : 1)).current;
  const scaleAnimation = useRef(new Animated.Value(1)).current;
  
  // Refs
  const inputRef = useRef<RNTextInput>(null);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  
  // Expose input ref
  React.useImperativeHandle(ref, () => inputRef.current!, []);
  
  // Handle focus
  const handleFocus = useCallback((event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (disabled || readonly) return;
    
    setIsFocused(true);
    
    // Animate focus state
    Animated.parallel([
      createGlowAnimation(focusAnimation, 1, mergedConfig.animation.focusDuration),
      createGlowAnimation(glowAnimation, 1, mergedConfig.animation.glowDuration),
      createScaleAnimation(scaleAnimation, 1.02, mergedConfig.animation.focusDuration)
    ]).start();
    
    // Animate floating label
    if (mergedConfig.enableFloatingLabel && isEmpty) {
      Animated.timing(labelAnimation, {
        toValue: 1,
        duration: mergedConfig.animation.labelDuration,
        useNativeDriver: false
      }).start();
    }
    
    // Haptic feedback
    if (mergedConfig.enableHaptics && Platform.OS === 'ios') {
      const { HapticFeedback } = require('react-native');
      HapticFeedback?.impactAsync?.(HapticFeedback.ImpactFeedbackStyle.Light);
    }
    
    onFocus?.(event);
  }, [disabled, readonly, isEmpty, mergedConfig, onFocus]);
  
  // Handle blur
  const handleBlur = useCallback((event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false);
    
    // Animate blur state
    Animated.parallel([
      createGlowAnimation(focusAnimation, 0, mergedConfig.animation.blurDuration),
      createGlowAnimation(glowAnimation, 0, mergedConfig.animation.glowDuration),
      createScaleAnimation(scaleAnimation, 1, mergedConfig.animation.blurDuration)
    ]).start();
    
    // Animate floating label
    if (mergedConfig.enableFloatingLabel && isEmpty) {
      Animated.timing(labelAnimation, {
        toValue: 0,
        duration: mergedConfig.animation.labelDuration,
        useNativeDriver: false
      }).start();
    }
    
    // Validate on blur
    if (validation?.state === 'default') {
      validateInput(value);
    }
    
    onBlur?.(event);
  }, [isEmpty, mergedConfig, validation, value, onBlur]);
  
  // Handle text change
  const handleChangeText = useCallback((text: string) => {
    // Update internal value if not controlled
    if (controlledValue === undefined) {
      setInternalValue(text);
    }
    
    // Debounced validation
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    
    debounceTimer.current = setTimeout(() => {
      validateInput(text);
    }, mergedConfig.debounceDelay);
    
    // Animate label based on content
    if (mergedConfig.enableFloatingLabel) {
      const shouldFloat = !isEmpty || text.length > 0;
      Animated.timing(labelAnimation, {
        toValue: shouldFloat ? 1 : 0,
        duration: mergedConfig.animation.labelDuration,
        useNativeDriver: false
      }).start();
    }
    
    onChangeText?.(text);
  }, [controlledValue, isEmpty, mergedConfig, onChangeText]);
  
  // Validate input
  const validateInput = useCallback((inputValue: string) => {
    let newValidationState: TextInputValidationState = 'default';
    let validationMessage = '';
    
    // Required validation
    if (required && (!inputValue || inputValue.trim().length === 0)) {
      newValidationState = 'error';
      validationMessage = 'This field is required';
    }
    // Min length validation
    else if (minLength && inputValue.length < minLength) {
      newValidationState = 'error';
      validationMessage = `Minimum ${minLength} characters required`;
    }
    // Max length validation
    else if (maxLength && inputValue.length > maxLength) {
      newValidationState = 'error';
      validationMessage = `Maximum ${maxLength} characters allowed`;
    }
    // Success state
    else if (inputValue.length > 0) {
      newValidationState = 'success';
    }
    
    // Update validation state
    if (newValidationState !== validationState) {
      setValidationState(newValidationState);
      onValidation?.(newValidationState, validationMessage);
    }
  }, [required, minLength, maxLength, validationState, onValidation]);
  
  // Handle clear
  const handleClear = useCallback(() => {
    const newValue = '';
    
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    
    // Reset validation
    setValidationState('default');
    
    // Animate label
    if (mergedConfig.enableFloatingLabel) {
      Animated.timing(labelAnimation, {
        toValue: 0,
        duration: mergedConfig.animation.labelDuration,
        useNativeDriver: false
      }).start();
    }
    
    onChangeText?.(newValue);
    onClear?.();
  }, [controlledValue, mergedConfig, onChangeText, onClear]);
  
  // Focus input programmatically
  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);
  
  // Blur input programmatically
  const blurInput = useCallback(() => {
    inputRef.current?.blur();
  }, []);
  
  // Effect to handle validation prop changes
  useEffect(() => {
    if (validation?.state && validation.state !== validationState) {
      setValidationState(validation.state);
    }
  }, [validation?.state, validationState]);
  
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
  const containerStyles = [
    styles.container,
    containerStyle,
    {
      transform: [{ scale: scaleAnimation }]
    }
  ];
  
  const inputContainerStyles = [
    styles.inputContainer,
    {
      height: multiline ? Math.max(sizeConfig.height, numberOfLines * 24) : sizeConfig.height,
      borderRadius: sizeConfig.borderRadius,
      borderColor: validationColors[validationState],
      backgroundColor: mergedConfig.enableGlassMorphism 
        ? (isFocused ? 'rgba(22,33,62,0.3)' : 'rgba(22,33,62,0.2)')
        : 'rgba(255,255,255,0.05)',
      shadowColor: validationGlowColors[validationState],
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: glowAnimation,
      shadowRadius: 20,
      elevation: 8
    }
  ];
  
  const textInputStyles = [
    styles.textInput,
    {
      fontSize: sizeConfig.fontSize,
      paddingHorizontal: sizeConfig.paddingHorizontal,
      paddingVertical: sizeConfig.paddingVertical,
      paddingLeft: leftIcon ? sizeConfig.paddingHorizontal + 32 : sizeConfig.paddingHorizontal,
      paddingRight: rightIcon ? sizeConfig.paddingHorizontal + 32 : sizeConfig.paddingHorizontal,
      textAlignVertical: multiline ? 'top' as const : 'center' as const,
      minHeight: multiline ? sizeConfig.height : undefined,
      maxHeight: multiline && mergedConfig.autoResize ? 200 : undefined
    },
    inputStyle,
    disabled && styles.disabled
  ];
  
  const labelStyles = [
    styles.label,
    {
      fontSize: labelAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [sizeConfig.fontSize, sizeConfig.labelFontSize]
      }),
      transform: [
        {
          translateY: labelAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [sizeConfig.paddingVertical, -sizeConfig.labelFontSize - 4]
          })
        },
        {
          translateX: labelAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [leftIcon ? 32 : 0, 0]
          })
        }
      ]
    },
    label?.style
  ];
  
  return (
    <Animated.View style={containerStyles}>
      {/* Static Label */}
      {label && !mergedConfig.enableFloatingLabel && (
        <Text style={[styles.staticLabel, { fontSize: sizeConfig.labelFontSize }]}>
          {label.text}
          {(label.required || required) && (
            <Text style={[styles.required, { color: label.requiredColor || '#FF7052' }]}>
              {' *'}
            </Text>
          )}
        </Text>
      )}
      
      {/* Input Container */}
      <Animated.View style={inputContainerStyles}>
        {/* Left Icon */}
        {leftIcon && (
          <View style={[styles.iconContainer, styles.leftIcon]}>
            {leftIcon}
          </View>
        )}
        
        {/* Floating Label */}
        {label && mergedConfig.enableFloatingLabel && (
          <Animated.Text style={labelStyles}>
            {label.text}
            {(label.required || required) && (
              <Text style={[styles.required, { color: label.requiredColor || '#FF7052' }]}>
                {' *'}
              </Text>
            )}
          </Animated.Text>
        )}
        
        {/* Text Input */}
        <RNTextInput
          ref={inputRef}
          value={value}
          placeholder={mergedConfig.enableFloatingLabel ? '' : placeholder}
          placeholderTextColor="rgba(255,255,255,0.4)"
          style={textInputStyles}
          maxLength={maxLength}
          multiline={multiline}
          numberOfLines={numberOfLines}
          autoFocus={autoFocus}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          secureTextEntry={secureTextEntry}
          selectionColor={selectionColor}
          editable={!disabled && !readonly}
          testID={testID}
          onChangeText={handleChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onSubmitEditing={onSubmitEditing}
          onKeyPress={onKeyPress}
          {...accessibilityProps}
        />
        
        {/* Right Icon */}
        {rightIcon && (
          <View style={[styles.iconContainer, styles.rightIcon]}>
            {rightIcon}
          </View>
        )}
      </Animated.View>
      
      {/* Character Counter */}
      {mergedConfig.enableCharacterCounter && maxLength && (
        <Text style={[
          styles.characterCounter,
          characterCount > maxLength && styles.characterCounterError
        ]}>
          {characterCount}/{maxLength}
        </Text>
      )}
      
      {/* Validation Message */}
      {validation?.message && (
        <Text style={[
          styles.validationMessage,
          { color: validationColors[validationState] },
          validation.messageStyle
        ]}>
          {validation.message}
        </Text>
      )}
    </Animated.View>
  );
});

// Set display name for debugging
TextInput.displayName = 'TextInput';

// Component styles
const styles = StyleSheet.create({
  container: {
    marginBottom: 16
  },
  inputContainer: {
    position: 'relative',
    borderWidth: 1,
    overflow: 'hidden'
  },
  textInput: {
    flex: 1,
    fontFamily: 'Inter',
    fontSize: 16,
    lineHeight: 24,
    includeFontPadding: false,
    textAlignVertical: 'center',
    // Ensure text color is always white for cosmic theme
    color: '#FFFFFF',
  },
  label: {
    position: 'absolute',
    left: 20,
    fontFamily: 'Inter',
    fontWeight: '500',
    color: '#B8B8C0',
    zIndex: 1,
    backgroundColor: 'transparent'
  },
  staticLabel: {
    fontFamily: 'Inter',
    fontWeight: '500',
    color: '#B8B8C0',
    marginBottom: 8
  },
  required: {
    fontWeight: '600'
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: 32,
    zIndex: 2
  },
  leftIcon: {
    left: 12
  },
  rightIcon: {
    right: 12
  },
  characterCounter: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'right',
    marginTop: 4
  },
  characterCounterError: {
    color: '#FF7052'
  },
  validationMessage: {
    fontFamily: 'Inter',
    fontSize: 12,
    marginTop: 4,
    lineHeight: 16
  },
  disabled: {
    opacity: 0.5
  }
});

export default TextInput;
