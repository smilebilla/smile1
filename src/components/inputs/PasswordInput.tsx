/**
 * Corp Astro UI Library - PasswordInput Primitive
 * 
 * Password input component with visibility toggle, strength validation, and premium styling.
 * Extends TextInput with password-specific features and security enhancements.
 * 
 * @module PasswordInput
 * @version 1.0.0
 * @since 2024
 */

import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { TextInput, TextInputProps, TextInputValidationState } from './TextInput';

/**
 * Password strength levels
 */
export type PasswordStrength = 'weak' | 'medium' | 'strong' | 'very-strong';

/**
 * Password validation configuration
 */
export interface PasswordValidationConfig {
  /** Minimum password length */
  minLength?: number;
  /** Maximum password length */
  maxLength?: number;
  /** Require uppercase letters */
  requireUppercase?: boolean;
  /** Require lowercase letters */
  requireLowercase?: boolean;
  /** Require numbers */
  requireNumbers?: boolean;
  /** Require special characters */
  requireSpecialChars?: boolean;
  /** Custom special characters pattern */
  specialCharsPattern?: RegExp;
  /** Real-time strength validation */
  realTimeValidation?: boolean;
  /** Show strength indicator */
  showStrengthIndicator?: boolean;
  /** Show password requirements */
  showRequirements?: boolean;
  /** Custom validation messages */
  messages?: {
    required?: string;
    tooShort?: string;
    tooLong?: string;
    missingUppercase?: string;
    missingLowercase?: string;
    missingNumbers?: string;
    missingSpecialChars?: string;
    weak?: string;
    medium?: string;
    strong?: string;
    veryStrong?: string;
  };
}

/**
 * Password visibility toggle configuration
 */
export interface PasswordVisibilityConfig {
  /** Show visibility toggle button */
  showToggle?: boolean;
  /** Custom show icon */
  showIcon?: React.ReactNode;
  /** Custom hide icon */
  hideIcon?: React.ReactNode;
  /** Toggle button size */
  toggleSize?: number;
  /** Toggle button color */
  toggleColor?: string;
  /** Toggle button active color */
  toggleActiveColor?: string;
}

/**
 * Password input component props
 */
export interface PasswordInputProps extends Omit<TextInputProps, 'secureTextEntry'> {
  /** Password validation configuration */
  passwordConfig?: PasswordValidationConfig;
  /** Visibility toggle configuration */
  visibilityConfig?: PasswordVisibilityConfig;
  /** Confirm password mode */
  confirmMode?: boolean;
  /** Original password for confirmation */
  originalPassword?: string;
  /** Password change handler */
  onPasswordChange?: (password: string, strength: PasswordStrength) => void;
  /** Password validation handler */
  onPasswordValidation?: (isValid: boolean, strength: PasswordStrength, message?: string) => void;
  /** Visibility toggle handler */
  onVisibilityToggle?: (isVisible: boolean) => void;
}

/**
 * Default password validation configuration
 */
const defaultPasswordConfig: Required<PasswordValidationConfig> = {
  minLength: 8,
  maxLength: 128,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
  specialCharsPattern: /[!@#$%^&*(),.?":{}|<>]/,
  realTimeValidation: true,
  showStrengthIndicator: true,
  showRequirements: true,
  messages: {
    required: 'Password is required',
    tooShort: 'Password must be at least 8 characters long',
    tooLong: 'Password must be less than 128 characters long',
    missingUppercase: 'Password must contain at least one uppercase letter',
    missingLowercase: 'Password must contain at least one lowercase letter',
    missingNumbers: 'Password must contain at least one number',
    missingSpecialChars: 'Password must contain at least one special character',
    weak: 'Password strength: Weak',
    medium: 'Password strength: Medium',
    strong: 'Password strength: Strong',
    veryStrong: 'Password strength: Very Strong'
  }
};

/**
 * Default visibility configuration
 */
const defaultVisibilityConfig: Required<PasswordVisibilityConfig> = {
  showToggle: true,
  showIcon: null,
  hideIcon: null,
  toggleSize: 24,
  toggleColor: 'rgba(255,255,255,0.6)',
  toggleActiveColor: 'rgba(46,134,222,0.8)'
};

/**
 * Password strength colors
 */
const strengthColors = {
  weak: '#FF7052',
  medium: '#FFA500',
  strong: '#34C759',
  'very-strong': '#00D4AA'
};

/**
 * Calculate password strength
 */
const calculatePasswordStrength = (
  password: string,
  config: Required<PasswordValidationConfig>
): PasswordStrength => {
  let score = 0;
  
  // Length check
  if (password.length >= config.minLength) score += 1;
  if (password.length >= 12) score += 1;
  
  // Character variety checks
  if (config.requireUppercase && /[A-Z]/.test(password)) score += 1;
  if (config.requireLowercase && /[a-z]/.test(password)) score += 1;
  if (config.requireNumbers && /[0-9]/.test(password)) score += 1;
  if (config.requireSpecialChars && config.specialCharsPattern.test(password)) score += 1;
  
  // Additional complexity checks
  if (password.length >= 16) score += 1;
  if (/[A-Z].*[A-Z]/.test(password)) score += 1; // Multiple uppercase
  if (/[0-9].*[0-9]/.test(password)) score += 1; // Multiple numbers
  
  // Determine strength based on score
  if (score <= 2) return 'weak';
  if (score <= 4) return 'medium';
  if (score <= 6) return 'strong';
  return 'very-strong';
};

/**
 * Validate password requirements
 */
const validatePassword = (
  password: string,
  config: Required<PasswordValidationConfig>,
  confirmMode: boolean = false,
  originalPassword?: string
): { isValid: boolean; message: string; strength: PasswordStrength } => {
  if (!password || password.length === 0) {
    return {
      isValid: false,
      message: config.messages.required || 'Password is required',
      strength: 'weak'
    };
  }
  
  // Confirm password mode
  if (confirmMode && originalPassword) {
    if (password !== originalPassword) {
      return {
        isValid: false,
        message: 'Passwords do not match',
        strength: 'weak'
      };
    }
    return {
      isValid: true,
      message: 'Passwords match',
      strength: calculatePasswordStrength(password, config)
    };
  }
  
  // Length validation
  if (password.length < config.minLength) {
    return {
      isValid: false,
      message: config.messages.tooShort || `Password must be at least ${config.minLength} characters long`,
      strength: 'weak'
    };
  }
  
  if (password.length > config.maxLength) {
    return {
      isValid: false,
      message: config.messages.tooLong || `Password must be less than ${config.maxLength} characters long`,
      strength: 'weak'
    };
  }
  
  // Character requirements
  if (config.requireUppercase && !/[A-Z]/.test(password)) {
    return {
      isValid: false,
      message: config.messages.missingUppercase || 'Password must contain at least one uppercase letter',
      strength: 'weak'
    };
  }
  
  if (config.requireLowercase && !/[a-z]/.test(password)) {
    return {
      isValid: false,
      message: config.messages.missingLowercase || 'Password must contain at least one lowercase letter',
      strength: 'weak'
    };
  }
  
  if (config.requireNumbers && !/[0-9]/.test(password)) {
    return {
      isValid: false,
      message: config.messages.missingNumbers || 'Password must contain at least one number',
      strength: 'weak'
    };
  }
  
  if (config.requireSpecialChars && !config.specialCharsPattern.test(password)) {
    return {
      isValid: false,
      message: config.messages.missingSpecialChars || 'Password must contain at least one special character',
      strength: 'weak'
    };
  }
  
  // Calculate strength
  const strength = calculatePasswordStrength(password, config);
  const strengthKey = strength === 'very-strong' ? 'veryStrong' : strength;
  const strengthMessage = config.messages[strengthKey as keyof typeof config.messages] || `Password strength: ${strength}`;
  
  return {
    isValid: true,
    message: strengthMessage,
    strength
  };
};

/**
 * PasswordInput Component
 * 
 * Premium password input with visibility toggle, strength validation, and requirements.
 * 
 * Features:
 * - Secure text entry with visibility toggle
 * - Real-time password strength validation
 * - Comprehensive password requirements checking
 * - Visual strength indicator with color coding
 * - Password confirmation mode
 * - Accessibility support with proper labeling
 * - Glass morphism styling with validation colors
 * - Smooth animations for toggle and strength indicator
 * - Custom validation messages and requirements
 * 
 * @param props - PasswordInput component props
 * @returns JSX.Element
 */
export const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  defaultValue,
  placeholder = 'Enter your password',
  label,
  validation,
  required = false,
  disabled = false,
  confirmMode = false,
  originalPassword,
  passwordConfig = {},
  visibilityConfig = {},
  onPasswordChange,
  onPasswordValidation,
  onVisibilityToggle,
  onChangeText,
  onValidation,
  ...props
}) => {
  // Merge configurations with defaults
  const mergedPasswordConfig = { ...defaultPasswordConfig, ...passwordConfig };
  const mergedVisibilityConfig = { ...defaultVisibilityConfig, ...visibilityConfig };
  
  // Component state
  const [passwordValue, setPasswordValue] = useState(value || defaultValue || '');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>('weak');
  const [validationState, setValidationState] = useState<TextInputValidationState>(
    validation?.state || 'default'
  );
  const [validationMessage, setValidationMessage] = useState(validation?.message || '');
  
  // Animation values
  const strengthAnimation = React.useRef(new Animated.Value(0)).current;
  const toggleAnimation = React.useRef(new Animated.Value(0)).current;
  
  // Validate password function
  const validatePasswordInput = useCallback((password: string) => {
    const result = validatePassword(password, mergedPasswordConfig, confirmMode, originalPassword);
    
    setPasswordStrength(result.strength);
    setValidationState(result.isValid ? 'success' : 'error');
    setValidationMessage(result.message);
    
    // Animate strength indicator
    const strengthValue = result.strength === 'weak' ? 0.25 : 
                         result.strength === 'medium' ? 0.5 : 
                         result.strength === 'strong' ? 0.75 : 1;
    
    Animated.timing(strengthAnimation, {
      toValue: strengthValue,
      duration: 300,
      useNativeDriver: false
    }).start();
    
    // Call validation handlers
    onPasswordValidation?.(result.isValid, result.strength, result.message);
    onValidation?.(result.isValid ? 'success' : 'error', result.message);
    
    return result;
  }, [mergedPasswordConfig, confirmMode, originalPassword, onPasswordValidation, onValidation, strengthAnimation]);
  
  // Handle password change
  const handlePasswordChange = useCallback((text: string) => {
    setPasswordValue(text);
    
    // Real-time validation if enabled
    if (mergedPasswordConfig.realTimeValidation && text.length > 0) {
      const result = validatePasswordInput(text);
      onPasswordChange?.(text, result.strength);
    } else {
      onPasswordChange?.(text, passwordStrength);
    }
    
    onChangeText?.(text);
  }, [mergedPasswordConfig.realTimeValidation, validatePasswordInput, passwordStrength, onPasswordChange, onChangeText]);
  
  // Handle password blur validation
  const handlePasswordBlur = useCallback((event: any) => {
    // Always validate on blur
    validatePasswordInput(passwordValue);
    props.onBlur?.(event);
  }, [passwordValue, validatePasswordInput, props]);
  
  // Handle visibility toggle
  const handleVisibilityToggle = useCallback(() => {
    const newVisibility = !isPasswordVisible;
    setIsPasswordVisible(newVisibility);
    
    // Animate toggle button
    Animated.timing(toggleAnimation, {
      toValue: newVisibility ? 1 : 0,
      duration: 200,
      useNativeDriver: false
    }).start();
    
    onVisibilityToggle?.(newVisibility);
  }, [isPasswordVisible, toggleAnimation, onVisibilityToggle]);
  
  // Effect to handle external value changes
  useEffect(() => {
    if (value !== undefined && value !== passwordValue) {
      setPasswordValue(value);
      if (mergedPasswordConfig.realTimeValidation) {
        validatePasswordInput(value);
      }
    }
  }, [value, passwordValue, mergedPasswordConfig.realTimeValidation, validatePasswordInput]);
  
  // Effect to handle original password changes for confirmation
  useEffect(() => {
    if (confirmMode && originalPassword !== undefined && passwordValue.length > 0) {
      validatePasswordInput(passwordValue);
    }
  }, [confirmMode, originalPassword, passwordValue, validatePasswordInput]);
  
  // Prepare validation configuration
  const inputValidation = {
    state: validationState,
    message: validationMessage,
    showIcon: true
  };
  
  // Prepare label configuration
  const inputLabel = label || {
    text: confirmMode ? 'Confirm Password' : 'Password',
    required: required
  };
  
  // Render visibility toggle icon
  const renderToggleIcon = () => {
    if (mergedVisibilityConfig.showIcon && mergedVisibilityConfig.hideIcon) {
      return isPasswordVisible ? mergedVisibilityConfig.hideIcon : mergedVisibilityConfig.showIcon;
    }
    
    return (
      <Animated.Text style={[
        styles.toggleIcon,
        {
          color: toggleAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [mergedVisibilityConfig.toggleColor, mergedVisibilityConfig.toggleActiveColor]
          })
        }
      ]}>
        {isPasswordVisible ? '🙈' : '👁️'}
      </Animated.Text>
    );
  };
  
  // Render strength indicator
  const renderStrengthIndicator = () => {
    if (!mergedPasswordConfig.showStrengthIndicator || passwordValue.length === 0) {
      return null;
    }
    
    return (
      <View style={styles.strengthContainer}>
        <View style={styles.strengthBar}>
          <Animated.View 
            style={[
              styles.strengthFill,
              {
                width: strengthAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%']
                }),
                backgroundColor: strengthColors[passwordStrength]
              }
            ]}
          />
        </View>
        <Text style={[
          styles.strengthText,
          { color: strengthColors[passwordStrength] }
        ]}>
          {passwordStrength.charAt(0).toUpperCase() + passwordStrength.slice(1).replace('-', ' ')}
        </Text>
      </View>
    );
  };
  
  // Render password requirements
  const renderRequirements = () => {
    if (!mergedPasswordConfig.showRequirements || passwordValue.length === 0) {
      return null;
    }
    
    const requirements = [
      { check: passwordValue.length >= mergedPasswordConfig.minLength, text: `At least ${mergedPasswordConfig.minLength} characters` },
      { check: !mergedPasswordConfig.requireUppercase || /[A-Z]/.test(passwordValue), text: 'One uppercase letter' },
      { check: !mergedPasswordConfig.requireLowercase || /[a-z]/.test(passwordValue), text: 'One lowercase letter' },
      { check: !mergedPasswordConfig.requireNumbers || /[0-9]/.test(passwordValue), text: 'One number' },
      { check: !mergedPasswordConfig.requireSpecialChars || mergedPasswordConfig.specialCharsPattern.test(passwordValue), text: 'One special character' }
    ];
    
    return (
      <View style={styles.requirementsContainer}>
        <Text style={styles.requirementsTitle}>Requirements:</Text>
        {requirements.map((req, index) => (
          <View key={index} style={styles.requirementItem}>
            <Text style={[
              styles.requirementIcon,
              { color: req.check ? '#34C759' : '#FF7052' }
            ]}>
              {req.check ? '✅' : '❌'}
            </Text>
            <Text style={[
              styles.requirementText,
              { color: req.check ? '#34C759' : 'rgba(255,255,255,0.6)' }
            ]}>
              {req.text}
            </Text>
          </View>
        ))}
      </View>
    );
  };
  
  return (
    <View style={styles.container}>
      <TextInput
        {...props}
        value={passwordValue}
        placeholder={placeholder}
        label={inputLabel}
        validation={inputValidation}
        required={required}
        disabled={disabled}
        secureTextEntry={!isPasswordVisible}
        keyboardType="default"
        autoCapitalize="none"
        autoCorrect={false}
        maxLength={mergedPasswordConfig.maxLength}
        onChangeText={handlePasswordChange}
        onBlur={handlePasswordBlur}
        rightIcon={
          mergedVisibilityConfig.showToggle ? (
            <TouchableOpacity 
              onPress={handleVisibilityToggle}
              style={styles.toggleButton}
              accessibilityLabel={isPasswordVisible ? 'Hide password' : 'Show password'}
              accessibilityRole="button"
            >
              <Animated.View>
                {renderToggleIcon()}
              </Animated.View>
            </TouchableOpacity>
          ) : undefined
        }
        config={{
          ...props.config,
          enableFloatingLabel: true,
          enableCharacterCounter: false,
          debounceDelay: 300
        }}
      />
      
      {/* Strength Indicator */}
      {renderStrengthIndicator()}
      
      {/* Password Requirements */}
      {renderRequirements()}
    </View>
  );
};

// Component styles
const styles = StyleSheet.create({
  container: {
    position: 'relative'
  },
  toggleButton: {
    padding: 4,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  toggleIcon: {
    fontSize: 20
  },
  strengthContainer: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  strengthBar: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    overflow: 'hidden'
  },
  strengthFill: {
    height: '100%',
    borderRadius: 2
  },
  strengthText: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '500',
    minWidth: 60
  },
  requirementsContainer: {
    marginTop: 12,
    padding: 12,
    backgroundColor: 'rgba(22,33,62,0.3)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)'
  },
  requirementsTitle: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 8
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4
  },
  requirementIcon: {
    fontSize: 12,
    marginRight: 8
  },
  requirementText: {
    fontFamily: 'Inter',
    fontSize: 12,
    flex: 1
  }
});

// Set display name for debugging
PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
