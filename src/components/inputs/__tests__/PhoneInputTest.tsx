/**
 * Corp Astro UI Library - PhoneInput Test Component
 * 
 * Test component for validating PhoneInput functionality, styling, and behavior.
 * 
 * @module PhoneInputTest
 * @version 1.0.0
 * @since 2024
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { PhoneInput, PhoneInputProps, CountryCode } from '../PhoneInput';

/**
 * PhoneInput test component
 */
export const PhoneInputTest: React.FC = () => {
  const [basicValue, setBasicValue] = useState('');
  const [validatedValue, setValidatedValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [customValue, setCustomValue] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<CountryCode | null>(null);

  // Custom validation function
  const customValidation = (value: string, countryCode: string): boolean | string => {
    const cleanValue = value.replace(/\D/g, '');
    if (cleanValue.length === 0) return true;
    if (cleanValue.length < 10) return 'Phone number is too short';
    if (cleanValue.length > 11) return 'Phone number is too long';
    if (cleanValue.startsWith('0')) return 'Phone number cannot start with 0';
    return true;
  };

  // Handle value changes
  const handleValueChange = (value: string, countryCode: string, formatted: string) => {
    console.log('Phone Input Value Changed:', { value, countryCode, formatted });
  };

  // Handle country change
  const handleCountryChange = (country: CountryCode) => {
    setSelectedCountry(country);
    console.log('Country Changed:', country);
  };

  // Handle validation
  const handleValidation = (isValid: boolean, message: string) => {
    console.log('Validation Result:', { isValid, message });
  };

  // Handle submit
  const handleSubmit = (value: string, countryCode: string) => {
    Alert.alert(
      'Phone Number Submitted',
      `Number: ${value}\nCountry: ${countryCode}`,
      [{ text: 'OK', style: 'default' }]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>PhoneInput Component Test</Text>
        <Text style={styles.subtitle}>Testing phone number input functionality</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic PhoneInput</Text>
        <PhoneInput
          value={basicValue}
          placeholder="Enter your phone number"
          onValueChange={(value) => setBasicValue(value)}
          onCountryChange={handleCountryChange}
          config={{
            label: {
              text: 'Phone Number',
              required: true,
            },
            formatting: {
              enabled: true,
            },
            animation: {
              focusAnimation: true,
              borderGlow: true,
            },
          }}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Validated PhoneInput</Text>
        <PhoneInput
          value={validatedValue}
          placeholder="Enter phone with validation"
          onValueChange={(value) => setValidatedValue(value)}
          onValidation={handleValidation}
          required
          config={{
            label: {
              text: 'Phone Number (Validated)',
              required: true,
            },
            validation: {
              validate: customValidation,
              triggers: ['onChange', 'onBlur'],
              realTime: true,
            },
            formatting: {
              enabled: true,
            },
            animation: {
              focusAnimation: true,
              borderGlow: true,
            },
          }}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Formatted PhoneInput</Text>
        <PhoneInput
          value={formattedValue}
          placeholder="Auto-formatted number"
          onValueChange={(value) => setFormattedValue(value)}
          defaultCountryCode="+1"
          config={{
            label: {
              text: 'Formatted Phone Number',
            },
            formatting: {
              enabled: true,
            },
            animation: {
              focusAnimation: true,
              borderGlow: true,
            },
          }}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Size Variants</Text>
        <View style={styles.variantContainer}>
          <PhoneInput
            size="small"
            placeholder="Small phone input"
            config={{
              label: { text: 'Small Size' },
              formatting: { enabled: true },
            }}
          />
          <PhoneInput
            size="medium"
            placeholder="Medium phone input"
            config={{
              label: { text: 'Medium Size' },
              formatting: { enabled: true },
            }}
          />
          <PhoneInput
            size="large"
            placeholder="Large phone input"
            config={{
              label: { text: 'Large Size' },
              formatting: { enabled: true },
            }}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Validation States</Text>
        <View style={styles.variantContainer}>
          <PhoneInput
            validationState="default"
            placeholder="Default state"
            config={{
              label: { text: 'Default State' },
              formatting: { enabled: true },
            }}
          />
          <PhoneInput
            validationState="error"
            placeholder="Error state"
            config={{
              label: { text: 'Error State' },
              formatting: { enabled: true },
            }}
          />
          <PhoneInput
            validationState="success"
            placeholder="Success state"
            config={{
              label: { text: 'Success State' },
              formatting: { enabled: true },
            }}
          />
          <PhoneInput
            validationState="warning"
            placeholder="Warning state"
            config={{
              label: { text: 'Warning State' },
              formatting: { enabled: true },
            }}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Configuration</Text>
        <PhoneInput
          value={customValue}
          placeholder="Custom configured input"
          onValueChange={(value) => setCustomValue(value)}
          onCountryChange={handleCountryChange}
          onValidation={handleValidation}
          onSubmit={handleSubmit}
          config={{
            label: {
              text: 'Custom PhoneInput',
              required: true,
              requiredColor: '#FF6B6B',
            },
            validation: {
              validate: customValidation,
              triggers: ['onChange', 'onBlur'],
              realTime: true,
              message: 'Please enter a valid phone number',
            },
            formatting: {
              enabled: true,
            },
            animation: {
              focusAnimation: true,
              borderGlow: true,
              duration: 300,
            },
          }}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Disabled States</Text>
        <PhoneInput
          value="1234567890"
          disabled
          placeholder="Disabled input"
          config={{
            label: { text: 'Disabled PhoneInput' },
            formatting: { enabled: true },
          }}
        />
        <PhoneInput
          value="1234567890"
          readOnly
          placeholder="Read-only input"
          config={{
            label: { text: 'Read-only PhoneInput' },
            formatting: { enabled: true },
          }}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Selected Country Information</Text>
        {selectedCountry && (
          <View style={styles.countryInfo}>
            <Text style={styles.countryInfoText}>
              Country: {selectedCountry.flag} {selectedCountry.name}
            </Text>
            <Text style={styles.countryInfoText}>
              Code: {selectedCountry.code}
            </Text>
            <Text style={styles.countryInfoText}>
              ISO: {selectedCountry.iso}
            </Text>
            {selectedCountry.format && (
              <Text style={styles.countryInfoText}>
                Format: {selectedCountry.format}
              </Text>
            )}
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Integration Test</Text>
        <Text style={styles.infoText}>
          This component demonstrates the PhoneInput's comprehensive features:
        </Text>
        <Text style={styles.featureText}>• Country code selection with flags</Text>
        <Text style={styles.featureText}>• Automatic phone number formatting</Text>
        <Text style={styles.featureText}>• Real-time validation</Text>
        <Text style={styles.featureText}>• Glass morphism design</Text>
        <Text style={styles.featureText}>• Multiple size variants</Text>
        <Text style={styles.featureText}>• Validation states</Text>
        <Text style={styles.featureText}>• Accessibility support</Text>
        <Text style={styles.featureText}>• Custom validation functions</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          PhoneInput Component - Corp Astro UI Library
        </Text>
      </View>
    </ScrollView>
  );
};

/**
 * Test component styles
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#08080F',
  },
  header: {
    padding: 24,
    paddingTop: 60,
    backgroundColor: 'rgba(22, 33, 62, 0.3)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(46, 134, 222, 0.2)',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'ios' ? 'Futura' : 'Inter',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(184, 184, 192, 0.8)',
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'Inter',
  },
  section: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'ios' ? 'Futura' : 'Inter',
    marginBottom: 16,
  },
  variantContainer: {
    gap: 16,
  },
  countryInfo: {
    backgroundColor: 'rgba(22, 33, 62, 0.2)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(46, 134, 222, 0.2)',
  },
  countryInfoText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'Inter',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: 'rgba(184, 184, 192, 0.8)',
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'Inter',
    marginBottom: 12,
    lineHeight: 20,
  },
  featureText: {
    fontSize: 14,
    color: '#54A0FF',
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'Inter',
    marginBottom: 4,
    lineHeight: 20,
  },
  footer: {
    padding: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: 'rgba(184, 184, 192, 0.6)',
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'Inter',
  },
});

export default PhoneInputTest;
