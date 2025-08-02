/**
 * Corp Astro UI Library - PhoneInput Primitive
 * 
 * Phone number input component with country code selection, formatting,
 * validation, and comprehensive accessibility features.
 * 
 * @module PhoneInput
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
  Modal,
  FlatList,
  ScrollView
} from 'react-native';

/**
 * PhoneInput size variants
 */
export type PhoneInputSize = 'small' | 'medium' | 'large';

/**
 * PhoneInput variant styles
 */
export type PhoneInputVariant = 'default' | 'outlined' | 'filled' | 'ghost';

/**
 * PhoneInput validation state
 */
export type PhoneInputValidationState = 'default' | 'error' | 'success' | 'warning';

/**
 * Country code configuration
 */
export interface CountryCode {
  /** Country code (e.g., "+1") */
  code: string;
  /** Country name */
  name: string;
  /** Country flag emoji */
  flag: string;
  /** Country ISO code */
  iso: string;
  /** Phone number length */
  length?: number;
  /** Phone number format pattern */
  format?: string;
}

/**
 * PhoneInput label configuration
 */
export interface PhoneInputLabelConfig {
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
 * PhoneInput validation configuration
 */
export interface PhoneInputValidationConfig {
  /** Validation function */
  validate?: (value: string, countryCode: string) => boolean | string;
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
}

/**
 * PhoneInput formatting configuration
 */
export interface PhoneInputFormatConfig {
  /** Enable automatic formatting */
  enabled?: boolean;
  /** Format pattern (e.g., "(XXX) XXX-XXXX") */
  pattern?: string;
  /** Format mask character */
  mask?: string;
  /** Strip formatting on value change */
  stripFormatting?: boolean;
}

/**
 * PhoneInput animation configuration
 */
export interface PhoneInputAnimationConfig {
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
}

/**
 * PhoneInput configuration object
 */
export interface PhoneInputConfig {
  /** Label configuration */
  label?: PhoneInputLabelConfig;
  /** Validation configuration */
  validation?: PhoneInputValidationConfig;
  /** Formatting configuration */
  formatting?: PhoneInputFormatConfig;
  /** Animation configuration */
  animation?: PhoneInputAnimationConfig;
  /** Accessibility configuration */
  accessibility?: AccessibilityProps;
}

/**
 * PhoneInput component state
 */
export interface PhoneInputState {
  /** Current phone number value */
  value: string;
  /** Current country code */
  countryCode: string;
  /** Focus state */
  isFocused: boolean;
  /** Validation state */
  validationState: PhoneInputValidationState;
  /** Validation message */
  validationMessage: string;
  /** Formatted value */
  formattedValue: string;
  /** Country selector visibility */
  showCountrySelector: boolean;
}

/**
 * PhoneInput event handlers
 */
export interface PhoneInputHandlers {
  /** Value change handler */
  onValueChange?: (value: string, countryCode: string, formattedValue: string) => void;
  /** Focus handler */
  onFocus?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  /** Blur handler */
  onBlur?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  /** Country code change handler */
  onCountryChange?: (countryCode: CountryCode) => void;
  /** Validation handler */
  onValidation?: (isValid: boolean, message: string) => void;
  /** Submit handler */
  onSubmit?: (value: string, countryCode: string) => void;
}

/**
 * PhoneInput component props
 */
export interface PhoneInputProps extends PhoneInputHandlers {
  /** Initial phone number value */
  value?: string;
  /** Initial country code */
  defaultCountryCode?: string;
  /** Component size */
  size?: PhoneInputSize;
  /** Component variant */
  variant?: PhoneInputVariant;
  /** Validation state */
  validationState?: PhoneInputValidationState;
  /** Placeholder text */
  placeholder?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether the input is read-only */
  readOnly?: boolean;
  /** Whether the input is required */
  required?: boolean;
  /** Available country codes */
  countryCodes?: CountryCode[];
  /** Component configuration */
  config?: PhoneInputConfig;
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
 * Default country codes list
 */
const DEFAULT_COUNTRY_CODES: CountryCode[] = [
  { code: '+1', name: 'United States', flag: '🇺🇸', iso: 'US', length: 10, format: '(XXX) XXX-XXXX' },
  { code: '+1', name: 'Canada', flag: '🇨🇦', iso: 'CA', length: 10, format: '(XXX) XXX-XXXX' },
  { code: '+44', name: 'United Kingdom', flag: '🇬🇧', iso: 'GB', length: 10, format: 'XXXX XXX XXXX' },
  { code: '+49', name: 'Germany', flag: '🇩🇪', iso: 'DE', length: 10, format: 'XXX XXX XXXX' },
  { code: '+33', name: 'France', flag: '🇫🇷', iso: 'FR', length: 10, format: 'XX XX XX XX XX' },
  { code: '+91', name: 'India', flag: '🇮🇳', iso: 'IN', length: 10, format: 'XXXXX XXXXX' },
  { code: '+86', name: 'China', flag: '🇨🇳', iso: 'CN', length: 11, format: 'XXX XXXX XXXX' },
  { code: '+81', name: 'Japan', flag: '🇯🇵', iso: 'JP', length: 10, format: 'XX XXXX XXXX' },
  { code: '+61', name: 'Australia', flag: '🇦🇺', iso: 'AU', length: 9, format: 'XXX XXX XXX' },
  { code: '+55', name: 'Brazil', flag: '🇧🇷', iso: 'BR', length: 11, format: 'XX XXXXX XXXX' },
];

/**
 * PhoneInput primitive component
 */
export const PhoneInput: React.FC<PhoneInputProps> = ({
  value = '',
  defaultCountryCode = '+1',
  size = 'medium',
  variant = 'default',
  validationState = 'default',
  placeholder = 'Enter phone number',
  disabled = false,
  readOnly = false,
  required = false,
  countryCodes = DEFAULT_COUNTRY_CODES,
  config = {},
  style,
  inputStyle,
  containerStyle,
  testID = 'phone-input',
  onValueChange,
  onFocus,
  onBlur,
  onCountryChange,
  onValidation,
  onSubmit,
}) => {
  // State management
  const [state, setState] = useState<PhoneInputState>({
    value,
    countryCode: defaultCountryCode,
    isFocused: false,
    validationState,
    validationMessage: '',
    formattedValue: value,
    showCountrySelector: false,
  });

  // Refs
  const inputRef = useRef<RNTextInput>(null);
  const animationRef = useRef(new Animated.Value(0)).current;
  const borderGlowRef = useRef(new Animated.Value(0)).current;

  // Current country code data
  const currentCountry = countryCodes.find(country => country.code === state.countryCode) || countryCodes[0];

  // Phone number formatting
  const formatPhoneNumber = useCallback((number: string, countryCode: string): string => {
    const country = countryCodes.find(c => c.code === countryCode);
    if (!country?.format || !config.formatting?.enabled) return number;

    const cleanNumber = number.replace(/\D/g, '');
    const format = country.format;
    const mask = config.formatting?.mask || 'X';
    
    let formatted = '';
    let numberIndex = 0;
    
    for (let i = 0; i < format.length && numberIndex < cleanNumber.length; i++) {
      if (format[i] === mask) {
        formatted += cleanNumber[numberIndex];
        numberIndex++;
      } else {
        formatted += format[i];
      }
    }
    
    return formatted;
  }, [countryCodes, config.formatting]);

  // Validation
  const validatePhoneNumber = useCallback((phoneNumber: string, countryCode: string): { isValid: boolean; message: string } => {
    if (!phoneNumber && required) {
      return { isValid: false, message: 'Phone number is required' };
    }

    if (!phoneNumber) {
      return { isValid: true, message: '' };
    }

    const cleanNumber = phoneNumber.replace(/\D/g, '');
    const country = countryCodes.find(c => c.code === countryCode);
    
    if (country?.length && cleanNumber.length !== country.length) {
      return { isValid: false, message: `Phone number must be ${country.length} digits` };
    }

    if (config.validation?.validate) {
      const result = config.validation.validate(phoneNumber, countryCode);
      if (typeof result === 'string') {
        return { isValid: false, message: result };
      }
      return { isValid: result, message: result ? '' : 'Invalid phone number' };
    }

    return { isValid: true, message: '' };
  }, [required, countryCodes, config.validation]);

  // Handle value change
  const handleValueChange = useCallback((text: string) => {
    const cleanText = text.replace(/\D/g, '');
    const formatted = formatPhoneNumber(cleanText, state.countryCode);
    
    const newState = {
      ...state,
      value: cleanText,
      formattedValue: formatted,
    };

    if (config.validation?.realTime) {
      const validation = validatePhoneNumber(cleanText, state.countryCode);
      newState.validationState = validation.isValid ? 'success' : 'error';
      newState.validationMessage = validation.message;
      onValidation?.(validation.isValid, validation.message);
    }

    setState(newState);
    onValueChange?.(cleanText, state.countryCode, formatted);
  }, [state, formatPhoneNumber, validatePhoneNumber, config.validation, onValueChange, onValidation]);

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

    if (config.validation?.triggers?.includes('onBlur')) {
      const validation = validatePhoneNumber(state.value, state.countryCode);
      setState(prev => ({
        ...prev,
        validationState: validation.isValid ? 'success' : 'error',
        validationMessage: validation.message,
      }));
      onValidation?.(validation.isValid, validation.message);
    }

    onBlur?.(event);
  }, [state.value, state.countryCode, config.animation, config.validation, validatePhoneNumber, animationRef, borderGlowRef, onBlur, onValidation]);

  // Handle country selection
  const handleCountrySelect = useCallback((country: CountryCode) => {
    setState(prev => ({ 
      ...prev, 
      countryCode: country.code, 
      showCountrySelector: false,
      formattedValue: formatPhoneNumber(prev.value, country.code)
    }));
    onCountryChange?.(country);
    onValueChange?.(state.value, country.code, formatPhoneNumber(state.value, country.code));
  }, [state.value, formatPhoneNumber, onCountryChange, onValueChange]);

  // Handle submit
  const handleSubmit = useCallback(() => {
    const validation = validatePhoneNumber(state.value, state.countryCode);
    setState(prev => ({
      ...prev,
      validationState: validation.isValid ? 'success' : 'error',
      validationMessage: validation.message,
    }));
    
    if (validation.isValid) {
      onSubmit?.(state.value, state.countryCode);
    }
    
    onValidation?.(validation.isValid, validation.message);
  }, [state.value, state.countryCode, validatePhoneNumber, onSubmit, onValidation]);

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

  // Render country selector
  const renderCountrySelector = () => (
    <Modal
      visible={state.showCountrySelector}
      transparent
      animationType="fade"
      onRequestClose={() => setState(prev => ({ ...prev, showCountrySelector: false }))}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Country</Text>
            <TouchableOpacity
              onPress={() => setState(prev => ({ ...prev, showCountrySelector: false }))}
              style={styles.modalCloseButton}
            >
              <Text style={styles.modalCloseText}>×</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={countryCodes}
            keyExtractor={(item, index) => `${item.iso}-${index}`}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.countryItem,
                  item.code === state.countryCode && styles.countryItemSelected
                ]}
                onPress={() => handleCountrySelect(item)}
              >
                <Text style={styles.countryFlag}>{item.flag}</Text>
                <Text style={styles.countryName}>{item.name}</Text>
                <Text style={styles.countryCode}>{item.code}</Text>
              </TouchableOpacity>
            )}
            style={styles.countryList}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </Modal>
  );

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
        <TouchableOpacity
          style={styles.countrySelector}
          onPress={() => setState(prev => ({ ...prev, showCountrySelector: true }))}
          disabled={disabled || readOnly}
        >
          <Text style={styles.countryFlag}>{currentCountry.flag}</Text>
          <Text style={styles.countrySelectorCode}>{currentCountry.code}</Text>
          <Text style={styles.countrySelectorArrow}>▼</Text>
        </TouchableOpacity>
        
        <RNTextInput
          ref={inputRef}
          style={getInputStyles()}
          value={config.formatting?.enabled ? state.formattedValue : state.value}
          placeholder={placeholder}
          placeholderTextColor="rgba(184, 184, 192, 0.6)"
          onChangeText={handleValueChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onSubmitEditing={handleSubmit}
          editable={!disabled && !readOnly}
          keyboardType="phone-pad"
          autoComplete="tel"
          textContentType="telephoneNumber"
          returnKeyType="done"
          blurOnSubmit={false}
          {...config.accessibility}
        />
      </Animated.View>

      {renderValidationMessage()}
      {renderCountrySelector()}
    </View>
  );
};

/**
 * PhoneInput styles
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
  countrySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 12,
    marginRight: 12,
    borderRightWidth: 1,
    borderRightColor: 'rgba(255, 255, 255, 0.1)',
  },
  countryFlag: {
    fontSize: 18,
    marginRight: 8,
  },
  countrySelectorCode: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'Inter',
    marginRight: 4,
  },
  countrySelectorArrow: {
    fontSize: 10,
    color: 'rgba(184, 184, 192, 0.6)',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(8, 8, 15, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'rgba(22, 33, 62, 0.95)',
    borderRadius: 24,
    width: '90%',
    maxHeight: '80%',
    borderWidth: 1,
    borderColor: 'rgba(46, 134, 222, 0.3)',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'ios' ? 'Futura' : 'Inter',
  },
  modalCloseButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '300',
  },
  countryList: {
    maxHeight: 400,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  countryItemSelected: {
    backgroundColor: 'rgba(46, 134, 222, 0.1)',
  },
  countryName: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'Inter',
    marginLeft: 12,
  },
  countryCode: {
    fontSize: 14,
    color: 'rgba(184, 184, 192, 0.8)',
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'Inter',
  },
});

export default PhoneInput;
