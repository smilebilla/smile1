/**
 * Corp Astro UI Library - EmailInput Primitive
 * 
 * Email input component with validation, keyboard optimization, and premium styling.
 * Extends TextInput with email-specific features and validation logic.
 * 
 * @module EmailInput
 * @version 1.0.0
 * @since 2024
 */

import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { TextInput, TextInputProps, TextInputValidationState } from './TextInput';

/**
 * Email validation configuration
 */
export interface EmailValidationConfig {
  /** Enable real-time validation */
  realTimeValidation?: boolean;
  /** Custom email regex pattern */
  customPattern?: RegExp;
  /** Show email suggestions */
  showSuggestions?: boolean;
  /** Common email domains for suggestions */
  commonDomains?: string[];
  /** Validation message customization */
  messages?: {
    required?: string;
    invalid?: string;
    valid?: string;
  };
}

/**
 * Email input component props
 */
export interface EmailInputProps extends Omit<TextInputProps, 'keyboardType' | 'autoCapitalize' | 'autoCorrect'> {
  /** Email validation configuration */
  emailConfig?: EmailValidationConfig;
  /** Email value change handler */
  onEmailChange?: (email: string, isValid: boolean) => void;
  /** Email validation handler */
  onEmailValidation?: (isValid: boolean, message?: string) => void;
}

/**
 * Default email validation configuration
 */
const defaultEmailConfig: Required<EmailValidationConfig> = {
  realTimeValidation: true,
  customPattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  showSuggestions: true,
  commonDomains: [
    'gmail.com',
    'yahoo.com',
    'hotmail.com',
    'outlook.com',
    'icloud.com',
    'apple.com',
    'protonmail.com',
    'corporateastro.com'
  ],
  messages: {
    required: 'Email address is required',
    invalid: 'Please enter a valid email address',
    valid: 'Email address is valid'
  }
};

/**
 * Email validation utility
 */
const validateEmail = (email: string, pattern: RegExp): boolean => {
  if (!email || email.trim().length === 0) {
    return false;
  }
  
  // Basic format validation
  const basicValidation = pattern.test(email.trim());
  
  // Additional validation checks
  if (basicValidation) {
    const [localPart, domain] = email.split('@');
    
    // Check for valid local part
    if (localPart.length > 64) return false;
    
    // Check for valid domain
    if (domain.length > 253) return false;
    
    // Check for consecutive dots
    if (email.includes('..')) return false;
    
    // Check for leading/trailing dots
    if (email.startsWith('.') || email.endsWith('.')) return false;
    
    // Check for @ at start or end
    if (email.startsWith('@') || email.endsWith('@')) return false;
    
    return true;
  }
  
  return false;
};

/**
 * Generate email suggestions based on input
 */
const generateEmailSuggestions = (
  email: string,
  domains: string[]
): string[] => {
  if (!email.includes('@')) return [];
  
  const [localPart, domainPart] = email.split('@');
  if (!localPart || !domainPart) return [];
  
  const suggestions: string[] = [];
  
  // Find similar domains
  domains.forEach(domain => {
    if (domain.toLowerCase().includes(domainPart.toLowerCase()) && 
        domain !== domainPart) {
      suggestions.push(`${localPart}@${domain}`);
    }
  });
  
  return suggestions.slice(0, 3); // Limit to 3 suggestions
};

/**
 * EmailInput Component
 * 
 * Premium email input with validation, suggestions, and optimization.
 * 
 * Features:
 * - Real-time email validation with comprehensive checks
 * - Email keyboard optimization for mobile
 * - Common domain suggestions
 * - Visual validation states (error, success, warning)
 * - Debounced validation to prevent excessive checks
 * - Accessibility support with proper labeling
 * - Glass morphism styling with validation colors
 * - Auto-correction disabled for email accuracy
 * - Case-insensitive validation
 * 
 * @param props - EmailInput component props
 * @returns JSX.Element
 */
export const EmailInput: React.FC<EmailInputProps> = ({
  value,
  defaultValue,
  placeholder = 'Enter your email address',
  label,
  validation,
  required = false,
  disabled = false,
  emailConfig = {},
  onEmailChange,
  onEmailValidation,
  onChangeText,
  onValidation,
  ...props
}) => {
  // Merge email configuration with defaults
  const mergedConfig = { ...defaultEmailConfig, ...emailConfig };
  
  // Component state
  const [emailValue, setEmailValue] = useState(value || defaultValue || '');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [emailSuggestions, setEmailSuggestions] = useState<string[]>([]);
  const [validationState, setValidationState] = useState<TextInputValidationState>(
    validation?.state || 'default'
  );
  const [validationMessage, setValidationMessage] = useState(validation?.message || '');
  
  // Validate email function
  const validateEmailInput = useCallback((email: string) => {
    let isValid = false;
    let message = '';
    let state: TextInputValidationState = 'default';
    
    if (!email || email.trim().length === 0) {
      if (required) {
        state = 'error';
        message = mergedConfig.messages.required || 'Email address is required';
      }
    } else {
      isValid = validateEmail(email, mergedConfig.customPattern);
      
      if (isValid) {
        state = 'success';
        message = mergedConfig.messages.valid || 'Email address is valid';
      } else {
        state = 'error';
        message = mergedConfig.messages.invalid || 'Please enter a valid email address';
      }
    }
    
    setIsValidEmail(isValid);
    setValidationState(state);
    setValidationMessage(message);
    
    // Generate suggestions if enabled
    if (mergedConfig.showSuggestions && !isValid && email.includes('@')) {
      const suggestions = generateEmailSuggestions(email, mergedConfig.commonDomains);
      setEmailSuggestions(suggestions);
    } else {
      setEmailSuggestions([]);
    }
    
    // Call validation handlers
    onEmailValidation?.(isValid, message);
    onValidation?.(state, message);
    
    return { isValid, message, state };
  }, [required, mergedConfig, onEmailValidation, onValidation]);
  
  // Handle email change
  const handleEmailChange = useCallback((text: string) => {
    const trimmedText = text.trim();
    setEmailValue(trimmedText);
    
    // Real-time validation if enabled
    if (mergedConfig.realTimeValidation && trimmedText.length > 0) {
      validateEmailInput(trimmedText);
    }
    
    // Call change handlers
    onEmailChange?.(trimmedText, isValidEmail);
    onChangeText?.(trimmedText);
  }, [mergedConfig.realTimeValidation, validateEmailInput, isValidEmail, onEmailChange, onChangeText]);
  
  // Handle email blur validation
  const handleEmailBlur = useCallback((event: any) => {
    // Always validate on blur
    validateEmailInput(emailValue);
    props.onBlur?.(event);
  }, [emailValue, validateEmailInput, props]);
  
  // Handle suggestion selection
  const handleSuggestionSelect = useCallback((suggestion: string) => {
    setEmailValue(suggestion);
    setEmailSuggestions([]);
    validateEmailInput(suggestion);
    onEmailChange?.(suggestion, validateEmail(suggestion, mergedConfig.customPattern));
    onChangeText?.(suggestion);
  }, [mergedConfig.customPattern, validateEmailInput, onEmailChange, onChangeText]);
  
  // Effect to handle external value changes
  useEffect(() => {
    if (value !== undefined && value !== emailValue) {
      setEmailValue(value);
      if (mergedConfig.realTimeValidation) {
        validateEmailInput(value);
      }
    }
  }, [value, emailValue, mergedConfig.realTimeValidation, validateEmailInput]);
  
  // Prepare validation configuration
  const inputValidation = {
    state: validationState,
    message: validationMessage,
    showIcon: true
  };
  
  // Prepare label configuration
  const inputLabel = label || {
    text: 'Email Address',
    required: required
  };
  
  return (
    <View style={styles.container}>
      <TextInput
        {...props}
        value={emailValue}
        placeholder={placeholder}
        label={inputLabel}
        validation={inputValidation}
        required={required}
        disabled={disabled}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={handleEmailChange}
        onBlur={handleEmailBlur}
        config={{
          ...props.config,
          enableFloatingLabel: true,
          enableCharacterCounter: false,
          debounceDelay: 300
        }}
      />
      
      {/* Email Suggestions */}
      {emailSuggestions.length > 0 && (
        <View style={styles.suggestionsContainer}>
          <Text style={styles.suggestionsTitle}>Did you mean:</Text>
          {emailSuggestions.map((suggestion, index) => (
            <Text
              key={index}
              style={styles.suggestionItem}
              onPress={() => handleSuggestionSelect(suggestion)}
            >
              {suggestion}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

// Component styles
const styles = StyleSheet.create({
  container: {
    position: 'relative'
  },
  suggestionsContainer: {
    marginTop: 8,
    padding: 12,
    backgroundColor: 'rgba(22,33,62,0.3)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(46,134,222,0.2)'
  },
  suggestionsTitle: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 8
  },
  suggestionItem: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: 'rgba(46,134,222,0.8)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginBottom: 4
  }
});

// Set display name for debugging
EmailInput.displayName = 'EmailInput';

export default EmailInput;
