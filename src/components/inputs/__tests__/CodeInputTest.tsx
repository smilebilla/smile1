/**
 * Corp Astro UI Library - CodeInput Test Component
 * 
 * Interactive test component for CodeInput primitive with various configurations,
 * security features, validation, and accessibility testing.
 * 
 * @version 1.0.0
 * @since 2024
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Platform,
  Alert,
} from 'react-native';
import { CodeInput, CodeInputProps } from '../CodeInput';

/**
 * Test configuration for different scenarios
 */
interface TestConfig {
  title: string;
  props: CodeInputProps;
  description: string;
}

/**
 * CodeInput test component
 */
export const CodeInputTest: React.FC = () => {
  const [testResults, setTestResults] = useState<Record<string, string>>({});

  // Handle code completion for testing
  const handleCodeComplete = (testId: string) => (code: string) => {
    setTestResults(prev => ({ ...prev, [testId]: code }));
    Alert.alert('Code Complete', `Test: ${testId}\nCode: ${code}`);
  };

  // Handle validation for testing
  const handleValidation = (testId: string) => (isValid: boolean, message: string) => {
    console.log(`Validation [${testId}]:`, { isValid, message });
  };

  // Test configurations
  const testConfigs: TestConfig[] = [
    {
      title: 'Basic 4-Digit PIN',
      description: 'Standard numeric PIN input with default styling',
      props: {
        length: 4,
        type: 'numeric',
        size: 'medium',
        variant: 'default',
        placeholder: '0',
        autoFocus: true,
        onCodeComplete: handleCodeComplete('basic-pin'),
        onValidation: handleValidation('basic-pin'),
      },
    },
    {
      title: '6-Digit OTP with Masking',
      description: 'OTP input with security masking after 1 second',
      props: {
        length: 6,
        type: 'numeric',
        size: 'large',
        variant: 'outlined',
        placeholder: '•',
        config: {
          security: {
            maskInput: true,
            maskDelay: 1000,
            maskCharacter: '●',
          },
          animation: {
            digitAnimation: true,
            errorShake: true,
            successPulse: true,
          },
        },
        onCodeComplete: handleCodeComplete('otp-masked'),
        onValidation: handleValidation('otp-masked'),
      },
    },
    {
      title: 'Alphanumeric Code',
      description: 'Mixed letters and numbers input',
      props: {
        length: 5,
        type: 'alphanumeric',
        size: 'medium',
        variant: 'filled',
        placeholder: 'X',
        config: {
          label: {
            text: 'Verification Code',
            position: 'top',
            required: true,
          },
          validation: {
            pattern: /^[A-Z0-9]{5}$/,
            message: 'Code must be 5 uppercase letters or numbers',
            realTime: true,
          },
          animation: {
            focusAnimation: true,
            digitAnimation: true,
          },
        },
        onCodeComplete: handleCodeComplete('alphanumeric'),
        onValidation: handleValidation('alphanumeric'),
      },
    },
    {
      title: 'Custom Validation',
      description: 'Code with custom validation rules',
      props: {
        length: 4,
        type: 'numeric',
        size: 'small',
        variant: 'underlined',
        config: {
          label: {
            text: 'Access Code',
            position: 'top',
          },
          validation: {
            validate: (code: string) => {
              if (code.length < 4) return 'Code must be 4 digits';
              if (code === '0000') return 'Code cannot be all zeros';
              if (code === '1234') return 'Code too simple';
              return true;
            },
            triggers: ['onComplete'],
          },
          animation: {
            errorShake: true,
            successPulse: true,
          },
        },
        onCodeComplete: handleCodeComplete('custom-validation'),
        onValidation: handleValidation('custom-validation'),
      },
    },
    {
      title: 'Disabled State',
      description: 'Disabled code input with pre-filled value',
      props: {
        length: 4,
        type: 'numeric',
        size: 'medium',
        variant: 'default',
        value: '1234',
        disabled: true,
        config: {
          label: {
            text: 'Read-only Code',
            position: 'top',
          },
        },
      },
    },
    {
      title: 'Read-only State',
      description: 'Read-only code input with validation message',
      props: {
        length: 6,
        type: 'alphanumeric',
        size: 'medium',
        variant: 'outlined',
        value: 'ABC123',
        readOnly: true,
        validationState: 'success',
        config: {
          label: {
            text: 'Generated Code',
            position: 'top',
          },
          validation: {
            message: 'Code verified successfully',
          },
        },
      },
    },
    {
      title: 'Error State',
      description: 'Code input with error validation',
      props: {
        length: 4,
        type: 'numeric',
        size: 'medium',
        variant: 'default',
        validationState: 'error',
        config: {
          label: {
            text: 'PIN Code',
            position: 'top',
            required: true,
          },
          validation: {
            message: 'Invalid PIN code entered',
            messageStyle: { fontWeight: 'bold' },
          },
        },
        onCodeComplete: handleCodeComplete('error-state'),
        onValidation: handleValidation('error-state'),
      },
    },
    {
      title: 'Alphabetic Only',
      description: 'Letters only input with custom styling',
      props: {
        length: 3,
        type: 'alphabetic',
        size: 'large',
        variant: 'filled',
        config: {
          label: {
            text: 'Initials',
            position: 'top',
          },
          validation: {
            pattern: /^[A-Z]{3}$/,
            message: 'Enter 3 uppercase letters',
          },
          animation: {
            focusAnimation: true,
            digitAnimation: true,
          },
        },
        style: { backgroundColor: 'rgba(46, 134, 222, 0.1)' },
        onCodeComplete: handleCodeComplete('alphabetic'),
        onValidation: handleValidation('alphabetic'),
      },
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>CodeInput Test Suite</Text>
          <Text style={styles.subtitle}>
            Interactive tests for code/PIN input component
          </Text>
        </View>

        {testConfigs.map((config, index) => (
          <View key={index} style={styles.testSection}>
            <Text style={styles.testTitle}>{config.title}</Text>
            <Text style={styles.testDescription}>{config.description}</Text>
            
            <View style={styles.testContainer}>
              <CodeInput
                {...config.props}
                testID={`code-input-${index}`}
              />
            </View>
            
            {testResults[config.props.onCodeComplete?.name || `test-${index}`] && (
              <View style={styles.resultContainer}>
                <Text style={styles.resultLabel}>Last Result:</Text>
                <Text style={styles.resultValue}>
                  {testResults[config.props.onCodeComplete?.name || `test-${index}`]}
                </Text>
              </View>
            )}
          </View>
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Test different input scenarios above
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 * Test component styles
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F1C',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    fontFamily: Platform.OS === 'ios' ? 'Futura' : 'Inter',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'Inter',
  },
  testSection: {
    marginBottom: 32,
    padding: 20,
    backgroundColor: 'rgba(22, 33, 62, 0.3)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  testTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
    fontFamily: Platform.OS === 'ios' ? 'Futura' : 'Inter',
  },
  testDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 16,
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'Inter',
  },
  testContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  resultContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: 'rgba(46, 134, 222, 0.1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(46, 134, 222, 0.3)',
  },
  resultLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 4,
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'Inter',
  },
  resultValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E86DE',
    fontFamily: Platform.OS === 'ios' ? 'Futura' : 'Inter',
  },
  footer: {
    marginTop: 20,
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.5)',
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'Inter',
  },
});

export default CodeInputTest;
