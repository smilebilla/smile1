/**
 * Corp Astro UI Library - EmailInput Test Component
 * 
 * Interactive test component for EmailInput primitive demonstrating
 * email validation, suggestions, and various configurations.
 * 
 * @module EmailInputTest
 * @version 1.0.0
 * @since 2024
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import { EmailInput, EmailInputProps, EmailValidationConfig } from '../EmailInput';

/**
 * EmailInput Test Component
 * 
 * Interactive test interface for EmailInput primitive
 */
const EmailInputTest: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isRequired, setIsRequired] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [realTimeValidation, setRealTimeValidation] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [validationState, setValidationState] = useState<string>('default');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');

  const handleEmailChange = (email: string, isValid: boolean) => {
    setEmail(email);
    setIsValidEmail(isValid);
    console.log('Email changed:', email, 'Valid:', isValid);
  };

  const handleEmailValidation = (isValid: boolean, message?: string) => {
    setValidationMessage(message || '');
    console.log('Email validation:', isValid, message);
  };

  const emailConfig: EmailValidationConfig = {
    realTimeValidation,
    showSuggestions,
    commonDomains: [
      'gmail.com',
      'yahoo.com',
      'hotmail.com',
      'outlook.com',
      'icloud.com',
      'corporateastro.com',
      'company.com',
      'business.net'
    ],
    messages: {
      required: 'Email address is required',
      invalid: 'Please enter a valid email address',
      valid: 'Email address is valid'
    }
  };

  const baseProps: EmailInputProps = {
    value: email,
    placeholder: 'Enter your email address',
    label: {
      text: 'Email Address',
      required: isRequired
    },
    required: isRequired,
    disabled: isDisabled,
    emailConfig,
    onEmailChange: handleEmailChange,
    onEmailValidation: handleEmailValidation,
    accessibilityLabel: 'Email input field',
    accessibilityHint: 'Enter your email address for validation',
    config: {
      enableFloatingLabel: true,
      enableGlow: true,
      enableGlassMorphism: true
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>EmailInput Test Component</Text>
      <Text style={styles.subtitle}>Module 49 - Email Input with Validation</Text>

      {/* Configuration Controls */}
      <View style={styles.controlsSection}>
        <Text style={styles.sectionTitle}>Configuration</Text>

        <View style={styles.controlRow}>
          <Text style={styles.controlLabel}>Required:</Text>
          <Switch value={isRequired} onValueChange={setIsRequired} />
        </View>

        <View style={styles.controlRow}>
          <Text style={styles.controlLabel}>Disabled:</Text>
          <Switch value={isDisabled} onValueChange={setIsDisabled} />
        </View>

        <View style={styles.controlRow}>
          <Text style={styles.controlLabel}>Real-time Validation:</Text>
          <Switch value={realTimeValidation} onValueChange={setRealTimeValidation} />
        </View>

        <View style={styles.controlRow}>
          <Text style={styles.controlLabel}>Show Suggestions:</Text>
          <Switch value={showSuggestions} onValueChange={setShowSuggestions} />
        </View>
      </View>

      {/* Test Email Input */}
      <View style={styles.testSection}>
        <Text style={styles.sectionTitle}>Email Input</Text>
        
        <EmailInput {...baseProps} />

        {/* Example Test Cases */}
        <View style={styles.examplesContainer}>
          <Text style={styles.examplesTitle}>Test Examples:</Text>
          
          <Text style={styles.exampleItem}>
            • Valid: user@gmail.com
          </Text>
          <Text style={styles.exampleItem}>
            • Invalid: user@invalid
          </Text>
          <Text style={styles.exampleItem}>
            • Suggestion: user@gmai (should suggest gmail.com)
          </Text>
          <Text style={styles.exampleItem}>
            • Corporate: user@corp (should suggest corporateastro.com)
          </Text>
        </View>
      </View>

      {/* Validation Status */}
      <View style={styles.statusSection}>
        <Text style={styles.sectionTitle}>Validation Status</Text>
        <Text style={styles.statusText}>Current Email: {email || 'None'}</Text>
        <Text style={styles.statusText}>Is Valid: {isValidEmail ? 'Yes' : 'No'}</Text>
        <Text style={styles.statusText}>Message: {validationMessage || 'None'}</Text>
        <Text style={styles.statusText}>Required: {isRequired ? 'Yes' : 'No'}</Text>
        <Text style={styles.statusText}>Disabled: {isDisabled ? 'Yes' : 'No'}</Text>
        <Text style={styles.statusText}>Real-time Validation: {realTimeValidation ? 'Yes' : 'No'}</Text>
        <Text style={styles.statusText}>Show Suggestions: {showSuggestions ? 'Yes' : 'No'}</Text>
      </View>

      {/* Validation Features */}
      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>Email Validation Features</Text>
        
        <View style={styles.featureItem}>
          <Text style={styles.featureTitle}>✅ Real-time Validation</Text>
          <Text style={styles.featureDescription}>
            Validates email format as you type
          </Text>
        </View>

        <View style={styles.featureItem}>
          <Text style={styles.featureTitle}>✅ Domain Suggestions</Text>
          <Text style={styles.featureDescription}>
            Suggests common email domains for typos
          </Text>
        </View>

        <View style={styles.featureItem}>
          <Text style={styles.featureTitle}>✅ Comprehensive Validation</Text>
          <Text style={styles.featureDescription}>
            Checks format, length, and domain validity
          </Text>
        </View>

        <View style={styles.featureItem}>
          <Text style={styles.featureTitle}>✅ Mobile Optimization</Text>
          <Text style={styles.featureDescription}>
            Email keyboard type and auto-correction disabled
          </Text>
        </View>

        <View style={styles.featureItem}>
          <Text style={styles.featureTitle}>✅ Visual Feedback</Text>
          <Text style={styles.featureDescription}>
            Color-coded validation states with messages
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center'
  },
  controlsSection: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16
  },
  controlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  controlLabel: {
    fontSize: 16,
    color: '#333'
  },
  testSection: {
    marginBottom: 24
  },
  examplesContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: 'rgba(46,134,222,0.1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(46,134,222,0.2)'
  },
  examplesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12
  },
  exampleItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontFamily: 'monospace'
  },
  statusSection: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1
  },
  statusText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8
  },
  featuresSection: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1
  },
  featureItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20
  }
});

export default EmailInputTest;
