/**
 * Corp Astro UI Library - URLInput Test Component
 * 
 * Test component for validating URLInput functionality, styling, and behavior.
 * 
 * @module URLInputTest
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
import { URLInput, URLInputProps, URLProtocol } from '../URLInput';

/**
 * URLInput test component
 */
export const URLInputTest: React.FC = () => {
  const [basicValue, setBasicValue] = useState('');
  const [validatedValue, setValidatedValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [customValue, setCustomValue] = useState('');
  const [detectedProtocol, setDetectedProtocol] = useState<URLProtocol | null>(null);

  // Custom validation function
  const customValidation = (url: string): boolean | string => {
    if (!url) return true;
    if (url.includes('example.com')) return 'example.com URLs are not allowed';
    if (!url.includes('.')) return 'URL must contain a domain';
    return true;
  };

  // Handle value changes
  const handleValueChange = (value: string, formattedURL: string, isValid: boolean) => {
    console.log('URL Input Value Changed:', { value, formattedURL, isValid });
  };

  // Handle protocol change
  const handleProtocolChange = (protocol: URLProtocol | null) => {
    setDetectedProtocol(protocol);
    console.log('Protocol Detected:', protocol);
  };

  // Handle validation
  const handleValidation = (isValid: boolean, message: string) => {
    console.log('Validation Result:', { isValid, message });
  };

  // Handle submit
  const handleSubmit = (value: string, formattedURL: string) => {
    Alert.alert(
      'URL Submitted',
      `Original: ${value}\nFormatted: ${formattedURL}`,
      [{ text: 'OK', style: 'default' }]
    );
  };

  // Handle URL press
  const handleURLPress = (url: string) => {
    Alert.alert(
      'Opening URL',
      `Opening: ${url}`,
      [{ text: 'OK', style: 'default' }]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>URLInput Component Test</Text>
        <Text style={styles.subtitle}>Testing URL input validation and formatting</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic URLInput</Text>
        <URLInput
          value={basicValue}
          placeholder="Enter a URL"
          onValueChange={(value) => setBasicValue(value)}
          onProtocolChange={handleProtocolChange}
          config={{
            label: {
              text: 'Website URL',
              required: true,
            },
            formatting: {
              autoProtocol: true,
              defaultProtocol: 'https',
              trimWhitespace: true,
            },
            animation: {
              focusAnimation: true,
              borderGlow: true,
              protocolAnimation: true,
            },
          }}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Validated URLInput</Text>
        <URLInput
          value={validatedValue}
          placeholder="Enter URL with validation"
          onValueChange={(value) => setValidatedValue(value)}
          onValidation={handleValidation}
          required
          config={{
            label: {
              text: 'Validated URL',
              required: true,
            },
            validation: {
              customValidator: customValidation,
              triggers: ['onChange', 'onBlur'],
              realTime: true,
              urlRules: {
                requiredProtocols: ['https', 'http'],
                requireTLD: true,
                allowLocalhost: false,
                allowIP: false,
              },
            },
            formatting: {
              autoProtocol: true,
              formatOnBlur: true,
              toLowerCase: true,
            },
            animation: {
              focusAnimation: true,
              borderGlow: true,
            },
          }}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Auto-formatted URLInput</Text>
        <URLInput
          value={formattedValue}
          placeholder="Auto-formatted URL"
          onValueChange={(value) => setFormattedValue(value)}
          showProtocol
          showValidationStatus
          config={{
            label: {
              text: 'Auto-formatted URL',
            },
            formatting: {
              autoProtocol: true,
              defaultProtocol: 'https',
              formatOnBlur: true,
              trimWhitespace: true,
              toLowerCase: true,
            },
            animation: {
              focusAnimation: true,
              borderGlow: true,
              protocolAnimation: true,
            },
          }}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Size Variants</Text>
        <View style={styles.variantContainer}>
          <URLInput
            size="small"
            placeholder="Small URL input"
            config={{
              label: { text: 'Small Size' },
              formatting: { autoProtocol: true },
            }}
          />
          <URLInput
            size="medium"
            placeholder="Medium URL input"
            config={{
              label: { text: 'Medium Size' },
              formatting: { autoProtocol: true },
            }}
          />
          <URLInput
            size="large"
            placeholder="Large URL input"
            config={{
              label: { text: 'Large Size' },
              formatting: { autoProtocol: true },
            }}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Validation States</Text>
        <View style={styles.variantContainer}>
          <URLInput
            validationState="default"
            placeholder="Default state"
            config={{
              label: { text: 'Default State' },
              formatting: { autoProtocol: true },
            }}
          />
          <URLInput
            validationState="error"
            placeholder="Error state"
            config={{
              label: { text: 'Error State' },
              formatting: { autoProtocol: true },
            }}
          />
          <URLInput
            validationState="success"
            placeholder="Success state"
            config={{
              label: { text: 'Success State' },
              formatting: { autoProtocol: true },
            }}
          />
          <URLInput
            validationState="warning"
            placeholder="Warning state"
            config={{
              label: { text: 'Warning State' },
              formatting: { autoProtocol: true },
            }}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Configuration</Text>
        <URLInput
          value={customValue}
          placeholder="Custom configured URL"
          onValueChange={(value) => setCustomValue(value)}
          onProtocolChange={handleProtocolChange}
          onValidation={handleValidation}
          onSubmit={handleSubmit}
          onURLPress={handleURLPress}
          showProtocol
          showValidationStatus
          enableURLOpening
          config={{
            label: {
              text: 'Custom URLInput',
              required: true,
              requiredColor: '#FF6B6B',
            },
            validation: {
              customValidator: customValidation,
              triggers: ['onChange', 'onBlur'],
              realTime: true,
              urlRules: {
                requiredProtocols: ['https'],
                requireTLD: true,
                allowLocalhost: false,
                allowIP: false,
                allowCustomPorts: false,
              },
            },
            formatting: {
              autoProtocol: true,
              defaultProtocol: 'https',
              formatOnBlur: true,
              trimWhitespace: true,
              toLowerCase: true,
            },
            animation: {
              focusAnimation: true,
              borderGlow: true,
              protocolAnimation: true,
              duration: 300,
            },
          }}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Disabled States</Text>
        <URLInput
          value="https://example.com"
          disabled
          placeholder="Disabled input"
          config={{
            label: { text: 'Disabled URLInput' },
            formatting: { autoProtocol: true },
          }}
        />
        <URLInput
          value="https://example.com"
          readOnly
          placeholder="Read-only input"
          config={{
            label: { text: 'Read-only URLInput' },
            formatting: { autoProtocol: true },
          }}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Protocol Detection</Text>
        {detectedProtocol && (
          <View style={styles.protocolInfo}>
            <Text style={styles.protocolInfoText}>
              Detected Protocol: {detectedProtocol.toUpperCase()}
            </Text>
          </View>
        )}
        <URLInput
          placeholder="Enter URL to detect protocol"
          onProtocolChange={handleProtocolChange}
          showProtocol
          config={{
            label: { text: 'Protocol Detection Test' },
            formatting: { autoProtocol: false },
            animation: { protocolAnimation: true },
          }}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Protocol-Specific Inputs</Text>
        <View style={styles.variantContainer}>
          <URLInput
            placeholder="https://example.com"
            config={{
              label: { text: 'HTTPS Only' },
              validation: {
                urlRules: {
                  requiredProtocols: ['https'],
                },
              },
              formatting: { autoProtocol: true, defaultProtocol: 'https' },
            }}
          />
          <URLInput
            placeholder="mailto:user@example.com"
            config={{
              label: { text: 'Email URLs' },
              validation: {
                urlRules: {
                  requiredProtocols: ['mailto'],
                },
              },
            }}
          />
          <URLInput
            placeholder="ftp://files.example.com"
            config={{
              label: { text: 'FTP URLs' },
              validation: {
                urlRules: {
                  requiredProtocols: ['ftp', 'ftps'],
                },
              },
            }}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Integration Test</Text>
        <Text style={styles.infoText}>
          This component demonstrates the URLInput's comprehensive features:
        </Text>
        <Text style={styles.featureText}>• Automatic protocol detection and indication</Text>
        <Text style={styles.featureText}>• URL validation with custom rules</Text>
        <Text style={styles.featureText}>• Auto-formatting and normalization</Text>
        <Text style={styles.featureText}>• Protocol-specific validation</Text>
        <Text style={styles.featureText}>• Glass morphism design</Text>
        <Text style={styles.featureText}>• Multiple size variants</Text>
        <Text style={styles.featureText}>• Validation states</Text>
        <Text style={styles.featureText}>• URL opening capability</Text>
        <Text style={styles.featureText}>• Real-time validation feedback</Text>
        <Text style={styles.featureText}>• Accessibility support</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          URLInput Component - Corp Astro UI Library
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
  protocolInfo: {
    backgroundColor: 'rgba(22, 33, 62, 0.2)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(46, 134, 222, 0.2)',
  },
  protocolInfoText: {
    fontSize: 14,
    color: '#54A0FF',
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'Inter',
    fontWeight: '600',
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

export default URLInputTest;
