/**
 * Corp Astro UI Library - TextArea Primitive
 * 
 * Multi-line text input component with auto-resize functionality, glass morphism effects,
 * and comprehensive validation states. Provides foundation for all multi-line text inputs.
 * 
 * @module TextArea
 * @version 1.0.0
 * @since 2024
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    AccessibilityProps,
    Animated,
    NativeSyntheticEvent,
    TextInput as RNTextInput,
    TextInputProps as RNTextInputProps,
    ScrollView,
    StyleSheet,
    Text,
    TextInputFocusEventData,
    TextStyle,
    View,
    ViewStyle
} from 'react-native';

/**
 * TextArea size variants
 */
export type TextAreaSize = 'small' | 'medium' | 'large';

/**
 * TextArea variant styles
 */
export type TextAreaVariant = 'default' | 'outlined' | 'filled' | 'ghost';

/**
 * TextArea validation state
 */
export type TextAreaValidationState = 'default' | 'error' | 'success' | 'warning';

/**
 * TextArea resize mode
 */
export type TextAreaResizeMode = 'none' | 'vertical' | 'horizontal' | 'both';

/**
 * TextArea label configuration
 */
export interface TextAreaLabelConfig {
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
 * TextArea validation configuration
 */
export interface TextAreaValidationConfig {
  /** Minimum character count */
  minLength?: number;
  /** Maximum character count */
  maxLength?: number;
  /** Required field validation */
  required?: boolean;
  /** Custom validation function */
  validator?: (value: string) => string | null;
  /** Show validation on blur */
  validateOnBlur?: boolean;
  /** Show validation on change */
  validateOnChange?: boolean;
  /** Show character count */
  showCharacterCount?: boolean;
}

/**
 * TextArea auto-resize configuration
 */
export interface TextAreaAutoResizeConfig {
  /** Enable auto-resize */
  enabled?: boolean;
  /** Minimum height */
  minHeight?: number;
  /** Maximum height */
  maxHeight?: number;
  /** Animate resize */
  animated?: boolean;
  /** Resize animation duration */
  animationDuration?: number;
}

/**
 * TextArea scroll configuration
 */
export interface TextAreaScrollConfig {
  /** Enable scrolling */
  enabled?: boolean;
  /** Show scroll indicator */
  showScrollIndicator?: boolean;
  /** Scroll indicator color */
  indicatorColor?: string;
  /** Keyboard should persist taps */
  keyboardShouldPersistTaps?: 'never' | 'always' | 'handled';
}

/**
 * TextArea helper text configuration
 */
export interface TextAreaHelperConfig {
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
 * TextArea props interface
 */
export interface TextAreaProps extends Omit<RNTextInputProps, 'multiline'> {
  /** TextArea value */
  value?: string;
  /** Value change handler */
  onChangeText?: (text: string) => void;
  /** Size variant */
  size?: TextAreaSize;
  /** Style variant */
  variant?: TextAreaVariant;
  /** Validation state */
  validationState?: TextAreaValidationState;
  /** Resize mode */
  resizeMode?: TextAreaResizeMode;
  /** Label configuration */
  label?: TextAreaLabelConfig;
  /** Validation configuration */
  validation?: TextAreaValidationConfig;
  /** Auto-resize configuration */
  autoResize?: TextAreaAutoResizeConfig;
  /** Scroll configuration */
  scroll?: TextAreaScrollConfig;
  /** Helper text configuration */
  helper?: TextAreaHelperConfig;
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
  /** Read-only state */
  readOnly?: boolean;
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
  /** Character count style */
  characterCountStyle?: TextStyle;
  /** Accessibility props */
  accessibilityProps?: AccessibilityProps;
}

/**
 * TextArea validation result
 */
interface TextAreaValidationResult {
  isValid: boolean;
  message?: string;
  state: TextAreaValidationState;
}

/**
 * TextArea Component
 * 
 * Premium multi-line text input with auto-resize, validation, and glass morphism effects.
 * Provides comprehensive text area functionality with smooth animations and accessibility.
 */
export const TextArea: React.FC<TextAreaProps> = ({
  value = '',
  onChangeText,
  size = 'medium',
  variant = 'default',
  validationState = 'default',
  resizeMode = 'vertical',
  label,
  validation,
  autoResize,
  scroll,
  helper,
  errorMessage,
  successMessage,
  warningMessage,
  disabled = false,
  loading = false,
  readOnly = false,
  glassMorphism = true,
  glowEffect = true,
  animated = true,
  containerStyle,
  inputStyle,
  labelStyle,
  helperStyle,
  characterCountStyle,
  accessibilityProps,
  ...props
}) => {
  // Auto-resize configuration with defaults
  const autoResizeConfig = {
    enabled: true,
    minHeight: 120,
    maxHeight: 300,
    animated: true,
    animationDuration: 200,
    ...autoResize
  };

  // Scroll configuration with defaults
  const scrollConfig = {
    enabled: true,
    showScrollIndicator: true,
    indicatorColor: 'rgba(255,255,255,0.3)',
    keyboardShouldPersistTaps: 'handled' as const,
    ...scroll
  };

  // Validation configuration with defaults
  const validationConfig = {
    showCharacterCount: true,
    ...validation
  };

  // State management
  const [internalValue, setInternalValue] = useState<string>(value);
  const [focused, setFocused] = useState(false);
  const [validationResult, setValidationResult] = useState<TextAreaValidationResult>({
    isValid: true,
    state: 'default'
  });
  const [textAreaHeight, setTextAreaHeight] = useState<number>(autoResizeConfig.minHeight);
  const [contentHeight, setContentHeight] = useState<number>(0);

  // Refs
  const inputRef = useRef<RNTextInput>(null);
  const focusAnimation = useRef(new Animated.Value(0)).current;
  const scaleAnimation = useRef(new Animated.Value(1)).current;
  const glowAnimation = useRef(new Animated.Value(0)).current;
  const heightAnimation = useRef(new Animated.Value(autoResizeConfig.minHeight)).current;

  // Validate text area input
  const validateTextArea = useCallback((text: string): TextAreaValidationResult => {
    let isValid = true;
    let message = '';
    let state: TextAreaValidationState = 'default';

    // Required validation
    if (validationConfig.required && !text.trim()) {
      isValid = false;
      message = 'This field is required';
      state = 'error';
    }

    // Min length validation
    if (validationConfig.minLength && text.length < validationConfig.minLength) {
      isValid = false;
      message = `Minimum ${validationConfig.minLength} characters required`;
      state = 'error';
    }

    // Max length validation
    if (validationConfig.maxLength && text.length > validationConfig.maxLength) {
      isValid = false;
      message = `Maximum ${validationConfig.maxLength} characters allowed`;
      state = 'error';
    }

    // Custom validation
    if (validationConfig.validator && isValid) {
      const customResult = validationConfig.validator(text);
      if (customResult) {
        isValid = false;
        message = customResult;
        state = 'error';
      }
    }

    // Success state
    if (isValid && text.length > 0) {
      state = 'success';
    }

    return { isValid, message, state };
  }, [validationConfig]);

  // Handle content size change for auto-resize
  const handleContentSizeChange = useCallback((event: NativeSyntheticEvent<{ contentSize: { width: number; height: number } }>) => {
    if (!autoResizeConfig.enabled) return;

    const newHeight = Math.max(
      autoResizeConfig.minHeight,
      Math.min(autoResizeConfig.maxHeight, event.nativeEvent.contentSize.height + 32) // Add padding
    );

    setContentHeight(event.nativeEvent.contentSize.height);

    if (autoResizeConfig.animated) {
      Animated.timing(heightAnimation, {
        toValue: newHeight,
        duration: autoResizeConfig.animationDuration,
        useNativeDriver: false,
      }).start();
    }

    setTextAreaHeight(newHeight);
  }, [autoResizeConfig, heightAnimation]);

  // Handle value change
  const handleValueChange = useCallback((text: string) => {
    setInternalValue(text);

    // Validation
    if (validationConfig.validateOnChange) {
      const result = validateTextArea(text);
      setValidationResult(result);
    }

    // Callback
    onChangeText?.(text);
  }, [validateTextArea, validationConfig.validateOnChange, onChangeText]);

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
          toValue: 1.01,
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
    if (validationConfig.validateOnBlur) {
      const result = validateTextArea(internalValue);
      setValidationResult(result);
    }

    props.onBlur?.(e);
  }, [animated, focusAnimation, scaleAnimation, glowAnimation, validationConfig.validateOnBlur, validateTextArea, internalValue, props.onBlur]);

  // Initialize internal value
  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  // Initialize height animation
  useEffect(() => {
    heightAnimation.setValue(autoResizeConfig.minHeight);
  }, [heightAnimation, autoResizeConfig.minHeight]);

  // Get current validation state
  const getCurrentValidationState = useCallback((): TextAreaValidationState => {
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

  // Get character count
  const getCharacterCount = useCallback((): string => {
    if (!validationConfig.showCharacterCount) return '';
    
    const current = internalValue.length;
    const max = validationConfig.maxLength;
    
    if (max) {
      return `${current}/${max}`;
    }
    
    return `${current}`;
  }, [internalValue.length, validationConfig.showCharacterCount, validationConfig.maxLength]);

  // Size configurations
  const sizeConfigs = {
    small: { 
      minHeight: 100, 
      fontSize: 14, 
      paddingHorizontal: 16, 
      paddingVertical: 12,
      borderRadius: 12 
    },
    medium: { 
      minHeight: 120, 
      fontSize: 16, 
      paddingHorizontal: 16, 
      paddingVertical: 16,
      borderRadius: 16 
    },
    large: { 
      minHeight: 140, 
      fontSize: 18, 
      paddingHorizontal: 20, 
      paddingVertical: 20,
      borderRadius: 20 
    }
  };

  const sizeConfig = sizeConfigs[size];
  const currentValidationState = getCurrentValidationState();
  const currentMessage = getCurrentMessage();
  const characterCount = getCharacterCount();
  const finalHeight = autoResizeConfig.enabled ? textAreaHeight : sizeConfig.minHeight;

  // Styles
  const containerStyles = StyleSheet.create({
    container: {
      width: '100%',
      ...(containerStyle as object),
    },
    labelContainer: {
      marginBottom: label?.position === 'top' ? 8 : 0,
    },
    textAreaContainer: {
      position: 'relative',
      minHeight: finalHeight,
      borderRadius: sizeConfig.borderRadius,
      backgroundColor: glassMorphism ? 'rgba(22,33,62,0.2)' : 'rgba(255,255,255,0.05)',
      borderWidth: 1,
      borderColor: focused 
        ? (currentValidationState === 'error' ? 'rgba(255,112,82,0.5)' : 'rgba(46,134,222,0.5)')
        : currentValidationState === 'error' 
        ? 'rgba(255,112,82,0.3)'
        : 'rgba(255,255,255,0.1)',
      overflow: 'hidden',
    },
    scrollContainer: {
      flex: 1,
      maxHeight: autoResizeConfig.enabled ? finalHeight : sizeConfig.minHeight,
    },
    textArea: {
      flex: 1,
      fontSize: sizeConfig.fontSize,
      fontFamily: 'Inter',
      includeFontPadding: false,
      textAlignVertical: 'top',
      paddingHorizontal: sizeConfig.paddingHorizontal,
      paddingVertical: sizeConfig.paddingVertical,
      minHeight: finalHeight - (sizeConfig.paddingVertical * 2),
      ...(inputStyle as object),
      // Ensure text color is always white for cosmic theme (applied after inputStyle)
      color: disabled ? 'rgba(255,255,255,0.3)' : '#FFFFFF',
    },
    label: {
      fontSize: label?.fontSize || 14,
      fontWeight: '500' as const,
      color: label?.color || '#B8B8C0',
      fontFamily: 'Inter',
      ...(labelStyle as object),
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 4,
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
      flex: 1,
      ...(helperStyle as object),
    },
    characterCount: {
      fontSize: 12,
      color: validationConfig.maxLength && internalValue.length > validationConfig.maxLength * 0.9
        ? '#FF7052'
        : '#B8B8C0',
      fontFamily: 'Inter',
      marginLeft: 8,
      ...(characterCountStyle as object),
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

      {/* TextArea Container */}
      <Animated.View 
        style={[
          containerStyles.textAreaContainer,
          { 
            height: autoResizeConfig.enabled ? heightAnimation : finalHeight,
            transform: [{ scale: scaleAnimation }] 
          }
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

        {/* TextArea with Scroll */}
        {scrollConfig.enabled && !autoResizeConfig.enabled ? (
          <ScrollView 
            style={containerStyles.scrollContainer}
            showsVerticalScrollIndicator={scrollConfig.showScrollIndicator}
            indicatorStyle="white"
            keyboardShouldPersistTaps={scrollConfig.keyboardShouldPersistTaps}
          >
            <RNTextInput
              ref={inputRef}
              value={internalValue}
              onChangeText={handleValueChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onContentSizeChange={handleContentSizeChange}
              style={containerStyles.textArea}
              placeholderTextColor="rgba(255,255,255,0.4)"
              multiline={true}
              textAlignVertical="top"
              editable={!disabled && !loading && !readOnly}
              selectTextOnFocus={!disabled && !readOnly}
              accessible={true}
              accessibilityLabel={label?.text || 'Text area'}
              accessibilityHint="Enter multiple lines of text"
              accessibilityRole="none"
              accessibilityState={{
                disabled: disabled,
                selected: focused,
              }}
              {...accessibilityProps}
              {...props}
            />
          </ScrollView>
        ) : (
          <RNTextInput
            ref={inputRef}
            value={internalValue}
            onChangeText={handleValueChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onContentSizeChange={handleContentSizeChange}
            style={containerStyles.textArea}
            placeholderTextColor="rgba(255,255,255,0.4)"
            multiline={true}
            textAlignVertical="top"
            editable={!disabled && !loading && !readOnly}
            selectTextOnFocus={!disabled && !readOnly}
            accessible={true}
            accessibilityLabel={label?.text || 'Text area'}
            accessibilityHint="Enter multiple lines of text"
            accessibilityRole="none"
            accessibilityState={{
              disabled: disabled,
              selected: focused,
            }}
            {...accessibilityProps}
            {...props}
          />
        )}
      </Animated.View>

      {/* Footer with Helper Text and Character Count */}
      {(currentMessage || characterCount || helper?.show) && (
        <View style={containerStyles.footer}>
          {currentMessage && (
            <Text style={containerStyles.helperText}>
              {currentMessage}
            </Text>
          )}
          {characterCount && (
            <Text style={containerStyles.characterCount}>
              {characterCount}
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

// Default export
export default TextArea;
