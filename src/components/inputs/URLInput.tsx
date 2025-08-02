/**
 * Corp Astro UI Library - URLInput Primitive
 * 
 * URL input component with validation, protocol handling, and domain verification.
 * Provides comprehensive URL validation with visual feedback and accessibility.
 * 
 * @module URLInput
 * @version 1.0.0
 * @since 2024
 */

import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  TextInput as RNTextInput,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInputChangeEventData,
  TextInputProps as RNTextInputProps,
  AccessibilityProps,
  Keyboard,
  Platform,
  Animated,
  Linking,
} from 'react-native';

/**
 * URLInput size variants
 */
export type URLInputSize = 'small' | 'medium' | 'large';

/**
 * URLInput variant styles
 */
export type URLInputVariant = 'default' | 'outlined' | 'filled' | 'ghost';

/**
 * URLInput validation state
 */
export type URLInputValidationState = 'default' | 'error' | 'success' | 'warning';

/**
 * URL protocol types
 */
export type URLProtocol = 'http' | 'https' | 'ftp' | 'ftps' | 'mailto' | 'tel' | 'sms';

/**
 * URL validation configuration
 */
export interface URLValidationConfig {
  /** Required protocols */
  requiredProtocols?: URLProtocol[];
  /** Allow IP addresses */
  allowIP?: boolean;
  /** Allow localhost */
  allowLocalhost?: boolean;
  /** Allow custom ports */
  allowCustomPorts?: boolean;
  /** Require TLD */
  requireTLD?: boolean;
  /** Custom validation function */
  customValidator?: (url: string) => boolean | string;
  /** Validation message */
  message?: string;
}

/**
 * URLInput label configuration
 */
export interface URLInputLabelConfig {
  /** Label text */
  text: string;
  /** Label position */
  position?: 'top' | 'floating' | 'inline';
  /** Label styling */
  style?: TextStyle;
  /** Required indicator */
  required?: boolean;
  /** Required indicator color */
  requiredColor?: string;
}

/**
 * URLInput validation configuration
 */
export interface URLInputValidationConfig {
  /** Validation function */
  validate?: (value: string) => boolean | string;
  /** Validation triggers */
  triggers?: Array<'onChange' | 'onBlur' | 'onSubmit'>;
  /** Real-time validation */
  realTime?: boolean;
  /** Debounce delay for real-time validation */
  debounceMs?: number;
  /** Custom validation message */
  message?: string;
  /** Validation message styling */
  messageStyle?: TextStyle;
  /** URL validation rules */
  urlRules?: URLValidationConfig;
  /** Custom validator function */
  customValidator?: (url: string) => boolean | string;
}

/**
 * URLInput formatting configuration
 */
export interface URLInputFormatConfig {
  /** Auto-prepend protocol */
  autoProtocol?: boolean;
  /** Default protocol */
  defaultProtocol?: URLProtocol;
  /** Format on blur */
  formatOnBlur?: boolean;
  /** Convert to lowercase */
  toLowerCase?: boolean;
  /** Trim whitespace */
  trimWhitespace?: boolean;
}

/**
 * URLInput animation configuration
 */
export interface URLInputAnimationConfig {
  /** Enable focus animations */
  focusAnimation?: boolean;
  /** Animation duration */
  duration?: number;
  /** Animation easing */
  easing?: any;
  /** Border glow animation */
  borderGlow?: boolean;
  /** Label float animation */
  labelFloat?: boolean;
  /** Protocol indicator animation */
  protocolAnimation?: boolean;
}

/**
 * URLInput configuration object
 */
export interface URLInputConfig {
  /** Label configuration */
  label?: URLInputLabelConfig;
  /** Validation configuration */
  validation?: URLInputValidationConfig;
  /** Formatting configuration */
  formatting?: URLInputFormatConfig;
  /** Animation configuration */
  animation?: URLInputAnimationConfig;
  /** Accessibility configuration */
  accessibility?: AccessibilityProps;
}

/**
 * URLInput component state
 */
export interface URLInputState {
  /** Current URL value */
  value: string;
  /** Original input value */
  originalValue: string;
  /** Focus state */
  isFocused: boolean;
  /** Validation state */
  validationState: URLInputValidationState;
  /** Validation message */
  validationMessage: string;
  /** Detected protocol */
  protocol: URLProtocol | null;
  /** Is valid URL */
  isValidURL: boolean;
  /** Formatted URL */
  formattedURL: string;
}

/**
 * URLInput event handlers
 */
export interface URLInputHandlers {
  /** Value change handler */
  onValueChange?: (value: string, formattedURL: string, isValid: boolean) => void;
  /** Focus handler */
  onFocus?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  /** Blur handler */
  onBlur?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  /** URL validation handler */
  onValidation?: (isValid: boolean, message: string) => void;
  /** Submit handler */
  onSubmit?: (value: string, formattedURL: string) => void;
  /** Protocol change handler */
  onProtocolChange?: (protocol: URLProtocol | null) => void;
  /** URL press handler */
  onURLPress?: (url: string) => void;
}

/**
 * URLInput component props
 */
export interface URLInputProps extends URLInputHandlers {
  /** Initial URL value */
  value?: string;
  /** Component size */
  size?: URLInputSize;
  /** Component variant */
  variant?: URLInputVariant;
  /** Validation state */
  validationState?: URLInputValidationState;
  /** Placeholder text */
  placeholder?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether the input is read-only */
  readOnly?: boolean;
  /** Whether the input is required */
  required?: boolean;
  /** Show protocol indicator */
  showProtocol?: boolean;
  /** Show URL validation status */
  showValidationStatus?: boolean;
  /** Enable URL opening */
  enableURLOpening?: boolean;
  /** Component configuration */
  config?: URLInputConfig;
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
 * URLInput primitive component
 */
export const URLInput: React.FC<URLInputProps> = ({
  value = '',
  size = 'medium',
  variant = 'default',
  validationState = 'default',
  placeholder = 'Enter URL',
  disabled = false,
  readOnly = false,
  required = false,
  showProtocol = true,
  showValidationStatus = true,
  enableURLOpening = false,
  config = {},
  style,
  inputStyle,
  containerStyle,
  testID = 'url-input',
  onValueChange,
  onFocus,
  onBlur,
  onValidation,
  onSubmit,
  onProtocolChange,
  onURLPress,
}) => {
  // State management
  const [state, setState] = useState<URLInputState>({
    value,
    originalValue: value,
    isFocused: false,
    validationState,
    validationMessage: '',
    protocol: null,
    isValidURL: false,
    formattedURL: value,
  });

  // Refs
  const inputRef = useRef<RNTextInput>(null);
  const animationRef = useRef(new Animated.Value(0)).current;
  const borderGlowRef = useRef(new Animated.Value(0)).current;
  const protocolAnimationRef = useRef(new Animated.Value(0)).current;

  // URL validation regex patterns
  const urlPatterns = {
    protocol: /^(https?|ftp|ftps|mailto|tel|sms):\/\//i,
    domain: /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    ip: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
    localhost: /^(localhost|127\.0\.0\.1)$/i,
    port: /:\d{1,5}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    tel: /^tel:\+?[\d\s\-\(\)]+$/i,
    sms: /^sms:\+?[\d\s\-\(\)]+$/i,
  };

  // Detect protocol from URL
  const detectProtocol = useCallback((url: string): URLProtocol | null => {
    const match = url.match(urlPatterns.protocol);
    if (match) {
      return match[1].toLowerCase() as URLProtocol;
    }
    
    // Check for implicit protocols
    if (urlPatterns.email.test(url)) return 'mailto';
    if (urlPatterns.tel.test(url)) return 'tel';
    if (urlPatterns.sms.test(url)) return 'sms';
    
    return null;
  }, []);

  // Format URL
  const formatURL = useCallback((url: string): string => {
    if (!url) return '';
    
    let formatted = url;
    
    // Trim whitespace
    if (config.formatting?.trimWhitespace !== false) {
      formatted = formatted.trim();
    }
    
    // Convert to lowercase
    if (config.formatting?.toLowerCase) {
      formatted = formatted.toLowerCase();
    }
    
    // Auto-prepend protocol
    if (config.formatting?.autoProtocol && !urlPatterns.protocol.test(formatted)) {
      const defaultProtocol = config.formatting?.defaultProtocol || 'https';
      if (!urlPatterns.email.test(formatted) && !urlPatterns.tel.test(formatted) && !urlPatterns.sms.test(formatted)) {
        formatted = `${defaultProtocol}://${formatted}`;
      }
    }
    
    return formatted;
  }, [config.formatting]);

  // Validate URL
  const validateURL = useCallback((url: string): { isValid: boolean; message: string } => {
    if (!url && required) {
      return { isValid: false, message: 'URL is required' };
    }
    
    if (!url) {
      return { isValid: true, message: '' };
    }
    
    // Custom validation first
    if (config.validation?.customValidator) {
      const result = config.validation.customValidator(url);
      if (typeof result === 'string') {
        return { isValid: false, message: result };
      }
      if (!result) {
        return { isValid: false, message: 'Invalid URL' };
      }
    }
    
    // URL validation rules
    const rules = config.validation?.urlRules || {};
    
    // Check protocol
    const protocol = detectProtocol(url);
    if (rules.requiredProtocols && (!protocol || !rules.requiredProtocols.includes(protocol))) {
      return { isValid: false, message: `URL must use one of: ${rules.requiredProtocols.join(', ')}` };
    }
    
    // Basic URL validation
    try {
      const urlObj = new URL(url);
      const hostname = urlObj.hostname;
      
      // Check localhost
      if (!rules.allowLocalhost && urlPatterns.localhost.test(hostname)) {
        return { isValid: false, message: 'Localhost URLs are not allowed' };
      }
      
      // Check IP addresses
      if (!rules.allowIP && urlPatterns.ip.test(hostname)) {
        return { isValid: false, message: 'IP addresses are not allowed' };
      }
      
      // Check custom ports
      if (!rules.allowCustomPorts && urlObj.port) {
        return { isValid: false, message: 'Custom ports are not allowed' };
      }
      
      // Check TLD requirement
      if (rules.requireTLD && !hostname.includes('.')) {
        return { isValid: false, message: 'URL must include a top-level domain' };
      }
      
      return { isValid: true, message: '' };
    } catch (error) {
      return { isValid: false, message: 'Invalid URL format' };
    }
  }, [required, config.validation, detectProtocol]);

  // Handle value change
  const handleValueChange = useCallback((text: string) => {
    const protocol = detectProtocol(text);
    const formatted = formatURL(text);
    
    const newState = {
      ...state,
      value: text,
      originalValue: text,
      protocol,
      formattedURL: formatted,
    };
    
    if (config.validation?.realTime) {
      const validation = validateURL(text);
      newState.validationState = validation.isValid ? 'success' : 'error';
      newState.validationMessage = validation.message;
      newState.isValidURL = validation.isValid;
      onValidation?.(validation.isValid, validation.message);
    }
    
    setState(newState);
    onValueChange?.(text, formatted, newState.isValidURL);
    
    // Protocol change animation
    if (protocol !== state.protocol) {
      onProtocolChange?.(protocol);
      if (config.animation?.protocolAnimation) {
        Animated.timing(protocolAnimationRef, {
          toValue: 1,
          duration: config.animation?.duration || 200,
          useNativeDriver: false,
        }).start(() => {
          Animated.timing(protocolAnimationRef, {
            toValue: 0,
            duration: config.animation?.duration || 200,
            useNativeDriver: false,
          }).start();
        });
      }
    }
  }, [state, detectProtocol, formatURL, validateURL, config.validation, config.animation, onValueChange, onValidation, onProtocolChange]);

  // Handle focus
  const handleFocus = useCallback((event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setState(prev => ({ ...prev, isFocused: true }));
    
    if (config.animation?.focusAnimation) {
      Animated.timing(animationRef, {
        toValue: 1,
        duration: config.animation.duration || 200,
        useNativeDriver: false,
      }).start();
    }
    
    if (config.animation?.borderGlow) {
      Animated.timing(borderGlowRef, {
        toValue: 1,
        duration: config.animation.duration || 200,
        useNativeDriver: false,
      }).start();
    }
    
    onFocus?.(event);
  }, [config.animation, animationRef, borderGlowRef, onFocus]);

  // Handle blur
  const handleBlur = useCallback((event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setState(prev => ({ ...prev, isFocused: false }));
    
    if (config.animation?.focusAnimation) {
      Animated.timing(animationRef, {
        toValue: 0,
        duration: config.animation.duration || 200,
        useNativeDriver: false,
      }).start();
    }
    
    if (config.animation?.borderGlow) {
      Animated.timing(borderGlowRef, {
        toValue: 0,
        duration: config.animation.duration || 200,
        useNativeDriver: false,
      }).start();
    }
    
    // Format on blur
    if (config.formatting?.formatOnBlur) {
      const formatted = formatURL(state.value);
      if (formatted !== state.value) {
        setState(prev => ({ ...prev, value: formatted, formattedURL: formatted }));
        onValueChange?.(formatted, formatted, state.isValidURL);
      }
    }
    
    if (config.validation?.triggers?.includes('onBlur')) {
      const validation = validateURL(state.value);
      setState(prev => ({
        ...prev,
        validationState: validation.isValid ? 'success' : 'error',
        validationMessage: validation.message,
        isValidURL: validation.isValid,
      }));
      onValidation?.(validation.isValid, validation.message);
    }
    
    onBlur?.(event);
  }, [state.value, state.isValidURL, config.animation, config.formatting, config.validation, formatURL, validateURL, animationRef, borderGlowRef, onBlur, onValueChange, onValidation]);

  // Handle submit
  const handleSubmit = useCallback(() => {
    const validation = validateURL(state.value);
    setState(prev => ({
      ...prev,
      validationState: validation.isValid ? 'success' : 'error',
      validationMessage: validation.message,
      isValidURL: validation.isValid,
    }));
    
    if (validation.isValid) {
      onSubmit?.(state.value, state.formattedURL);
    }
    
    onValidation?.(validation.isValid, validation.message);
  }, [state.value, state.formattedURL, validateURL, onSubmit, onValidation]);

  // Handle URL press
  const handleURLPress = useCallback(() => {
    if (enableURLOpening && state.isValidURL) {
      Linking.openURL(state.formattedURL).catch(err => {
        console.error('Failed to open URL:', err);
      });
      onURLPress?.(state.formattedURL);
    }
  }, [enableURLOpening, state.isValidURL, state.formattedURL, onURLPress]);

  // Get container styles
  const getContainerStyles = (): ViewStyle => {
    const baseStyles = [
      styles.container,
      styles[`container_${size}`],
      styles[`container_${variant}`],
      styles[`container_${state.validationState}`],
    ];

    if (state.isFocused) {
      baseStyles.push(styles.container_focused);
    }

    if (disabled) {
      baseStyles.push(styles.container_disabled);
    }

    return StyleSheet.flatten([...baseStyles, containerStyle]);
  };

  // Get input styles
  const getInputStyles = (): TextStyle => {
    const baseStyles = [
      styles.input,
      styles[`input_${size}`],
      styles[`input_${variant}`],
    ];

    if (disabled) {
      baseStyles.push(styles.input_disabled);
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

  // Render protocol indicator
  const renderProtocolIndicator = () => {
    if (!showProtocol || !state.protocol) return null;

    return (
      <Animated.View
        style={[
          styles.protocolIndicator,
          {
            opacity: protocolAnimationRef.interpolate({
              inputRange: [0, 1],
              outputRange: [0.7, 1],
            }),
            transform: [{
              scale: protocolAnimationRef.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.1],
              }),
            }],
          },
        ]}
      >
        <Text style={styles.protocolText}>{state.protocol.toUpperCase()}</Text>
      </Animated.View>
    );
  };

  // Render validation status
  const renderValidationStatus = () => {
    if (!showValidationStatus) return null;

    const getStatusColor = () => {
      switch (state.validationState) {
        case 'success': return '#51CF66';
        case 'error': return '#FF6B6B';
        case 'warning': return '#FFD43B';
        default: return 'rgba(184, 184, 192, 0.6)';
      }
    };

    const getStatusIcon = () => {
      switch (state.validationState) {
        case 'success': return '✓';
        case 'error': return '✗';
        case 'warning': return '⚠';
        default: return '○';
      }
    };

    return (
      <View style={styles.statusIndicator}>
        <Text style={[styles.statusIcon, { color: getStatusColor() }]}>
          {getStatusIcon()}
        </Text>
      </View>
    );
  };

  // Render URL opener
  const renderURLOpener = () => {
    if (!enableURLOpening || !state.isValidURL) return null;

    return (
      <TouchableOpacity
        style={styles.urlOpener}
        onPress={handleURLPress}
      >
        <Text style={styles.urlOpenerText}>↗</Text>
      </TouchableOpacity>
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

  return (
    <View style={[getContainerStyles(), style]} testID={testID}>
      {renderLabel()}
      
      <Animated.View
        style={[
          styles.inputContainer,
          config.animation?.borderGlow && {
            shadowOpacity: borderGlowRef.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.3],
            }),
          },
        ]}
      >
        {renderProtocolIndicator()}
        
        <RNTextInput
          ref={inputRef}
          style={getInputStyles()}
          value={state.value}
          placeholder={placeholder}
          placeholderTextColor="rgba(184, 184, 192, 0.6)"
          onChangeText={handleValueChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onSubmitEditing={handleSubmit}
          editable={!disabled && !readOnly}
          keyboardType="url"
          autoComplete="url"
          textContentType="URL"
          returnKeyType="go"
          autoCapitalize="none"
          autoCorrect={false}
          spellCheck={false}
          {...config.accessibility}
        />
        
        {renderValidationStatus()}
        {renderURLOpener()}
      </Animated.View>

      {renderValidationMessage()}
    </View>
  );
};

/**
 * URLInput styles
 */
const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 8,
  },
  container_small: {
    marginVertical: 4,
  },
  container_medium: {
    marginVertical: 8,
  },
  container_large: {
    marginVertical: 12,
  },
  container_default: {
    // Default container styles
  },
  container_outlined: {
    // Outlined container styles
  },
  container_filled: {
    // Filled container styles
  },
  container_ghost: {
    // Ghost container styles
  },
  container_focused: {
    // Focused container styles
  },
  container_disabled: {
    opacity: 0.5,
  },
  container_error: {
    // Error container styles
  },
  container_success: {
    // Success container styles
  },
  container_warning: {
    // Warning container styles
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
    height: 56,
    backgroundColor: 'rgba(22, 33, 62, 0.2)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    shadowColor: '#2E86DE',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0,
    elevation: 0,
  },
  protocolIndicator: {
    backgroundColor: 'rgba(46, 134, 222, 0.2)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
  },
  protocolText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#54A0FF',
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'Inter',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'Inter',
    paddingVertical: 0,
  },
  input_small: {
    fontSize: 14,
  },
  input_medium: {
    fontSize: 16,
  },
  input_large: {
    fontSize: 18,
  },
  input_default: {
    // Default input styles
  },
  input_outlined: {
    // Outlined input styles
  },
  input_filled: {
    // Filled input styles
  },
  input_ghost: {
    // Ghost input styles
  },
  input_disabled: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
  statusIndicator: {
    marginLeft: 8,
  },
  statusIcon: {
    fontSize: 16,
    fontWeight: '600',
  },
  urlOpener: {
    marginLeft: 8,
    padding: 4,
    backgroundColor: 'rgba(46, 134, 222, 0.2)',
    borderRadius: 8,
  },
  urlOpenerText: {
    fontSize: 14,
    color: '#54A0FF',
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'Inter',
  },
  validationMessage: {
    fontSize: 12,
    marginTop: 4,
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

export default URLInput;
