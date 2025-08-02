/**
 * Corp Astro UI Library - TextArea Test Component
 * 
 * Test component for validating TextArea functionality, auto-resize,
 * validation, and character counting.
 * 
 * @module TextAreaTest
 * @version 1.0.0
 * @since 2024
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextArea } from '../TextArea';

/**
 * TextArea Test Component
 * 
 * Comprehensive test suite for TextArea component validation.
 */
export const TextAreaTest: React.FC = () => {
  // Test state
  const [basicText, setBasicText] = useState<string>('');
  const [autoResizeText, setAutoResizeText] = useState<string>('');
  const [validationText, setValidationText] = useState<string>('');
  const [characterLimitText, setCharacterLimitText] = useState<string>('');
  const [readOnlyText, setReadOnlyText] = useState<string>('This is a read-only text area that cannot be edited. It demonstrates how the component behaves when in read-only mode.');

  // Handle text changes
  const handleBasicTextChange = (text: string) => {
    setBasicText(text);
    console.log('Basic text changed:', text.length, 'characters');
  };

  const handleAutoResizeTextChange = (text: string) => {
    setAutoResizeText(text);
    console.log('Auto-resize text changed:', text.length, 'characters');
  };

  const handleValidationTextChange = (text: string) => {
    setValidationText(text);
    console.log('Validation text changed:', text.length, 'characters');
  };

  const handleCharacterLimitTextChange = (text: string) => {
    setCharacterLimitText(text);
    console.log('Character limit text changed:', text.length, 'characters');
  };

  // Custom validation function
  const validateNoNumbers = (text: string): string | null => {
    if (/\d/.test(text)) {
      return 'Numbers are not allowed in this text area';
    }
    return null;
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>TextArea Test Component</Text>
      
      {/* Basic TextArea */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic TextArea</Text>
        <TextArea
          value={basicText}
          onChangeText={handleBasicTextChange}
          label={{ text: 'Basic TextArea', position: 'top' }}
          placeholder="Enter your text here..."
          helper={{ text: 'This is a basic multi-line text area', show: true }}
          size="medium"
          variant="outlined"
        />
      </View>

      {/* Auto-Resize TextArea */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Auto-Resize TextArea</Text>
        <TextArea
          value={autoResizeText}
          onChangeText={handleAutoResizeTextChange}
          label={{ text: 'Auto-Resize TextArea', position: 'top' }}
          placeholder="Start typing to see auto-resize in action..."
          helper={{ text: 'This text area will automatically resize as you type', show: true }}
          size="medium"
          variant="outlined"
          autoResize={{
            enabled: true,
            minHeight: 100,
            maxHeight: 200,
            animated: true,
            animationDuration: 300
          }}
        />
      </View>

      {/* Validation TextArea */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Validation TextArea</Text>
        <TextArea
          value={validationText}
          onChangeText={handleValidationTextChange}
          label={{ text: 'Validation TextArea', position: 'top' }}
          placeholder="Enter text without numbers..."
          helper={{ text: 'This text area validates input (no numbers allowed)', show: true }}
          size="medium"
          variant="outlined"
          validation={{
            required: true,
            minLength: 10,
            maxLength: 100,
            validator: validateNoNumbers,
            validateOnChange: true,
            showCharacterCount: true
          }}
        />
      </View>

      {/* Character Limit TextArea */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Character Limit TextArea</Text>
        <TextArea
          value={characterLimitText}
          onChangeText={handleCharacterLimitTextChange}
          label={{ text: 'Character Limit TextArea', position: 'top' }}
          placeholder="Type up to 200 characters..."
          helper={{ text: 'Maximum 200 characters allowed', show: true }}
          size="medium"
          variant="outlined"
          validation={{
            maxLength: 200,
            showCharacterCount: true,
            validateOnChange: true
          }}
        />
      </View>

      {/* Size Variants */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Size Variants</Text>
        
        <View style={styles.subSection}>
          <TextArea
            value=""
            onChangeText={() => {}}
            label={{ text: 'Small Size', position: 'top' }}
            placeholder="Small text area..."
            size="small"
            variant="outlined"
          />
        </View>

        <View style={styles.subSection}>
          <TextArea
            value=""
            onChangeText={() => {}}
            label={{ text: 'Medium Size', position: 'top' }}
            placeholder="Medium text area..."
            size="medium"
            variant="outlined"
          />
        </View>

        <View style={styles.subSection}>
          <TextArea
            value=""
            onChangeText={() => {}}
            label={{ text: 'Large Size', position: 'top' }}
            placeholder="Large text area..."
            size="large"
            variant="outlined"
          />
        </View>
      </View>

      {/* Validation States */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Validation States</Text>
        
        <View style={styles.subSection}>
          <TextArea
            value=""
            onChangeText={() => {}}
            label={{ text: 'Default State', position: 'top' }}
            placeholder="Default text area..."
            size="medium"
            variant="outlined"
          />
        </View>

        <View style={styles.subSection}>
          <TextArea
            value=""
            onChangeText={() => {}}
            label={{ text: 'Error State', position: 'top' }}
            placeholder="Error text area..."
            errorMessage="This text area has an error"
            size="medium"
            variant="outlined"
          />
        </View>

        <View style={styles.subSection}>
          <TextArea
            value=""
            onChangeText={() => {}}
            label={{ text: 'Success State', position: 'top' }}
            placeholder="Success text area..."
            successMessage="This text area is valid"
            size="medium"
            variant="outlined"
          />
        </View>

        <View style={styles.subSection}>
          <TextArea
            value=""
            onChangeText={() => {}}
            label={{ text: 'Warning State', position: 'top' }}
            placeholder="Warning text area..."
            warningMessage="This text area has a warning"
            size="medium"
            variant="outlined"
          />
        </View>
      </View>

      {/* Fixed Height with Scroll */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Fixed Height with Scroll</Text>
        <TextArea
          value=""
          onChangeText={() => {}}
          label={{ text: 'Fixed Height TextArea', position: 'top' }}
          placeholder="This text area has a fixed height and will scroll when content exceeds the height..."
          helper={{ text: 'Fixed height with scroll enabled', show: true }}
          size="medium"
          variant="outlined"
          autoResize={{
            enabled: false
          }}
          scroll={{
            enabled: true,
            showScrollIndicator: true,
            keyboardShouldPersistTaps: 'handled'
          }}
        />
      </View>

      {/* Read-Only TextArea */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Read-Only TextArea</Text>
        <TextArea
          value={readOnlyText}
          onChangeText={() => {}}
          label={{ text: 'Read-Only TextArea', position: 'top' }}
          helper={{ text: 'This text area is read-only', show: true }}
          readOnly={true}
          size="medium"
          variant="outlined"
        />
      </View>

      {/* Disabled TextArea */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Disabled TextArea</Text>
        <TextArea
          value="This is a disabled text area"
          onChangeText={() => {}}
          label={{ text: 'Disabled TextArea', position: 'top' }}
          helper={{ text: 'This text area is disabled', show: true }}
          disabled={true}
          size="medium"
          variant="outlined"
        />
      </View>

      {/* Custom Styling */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Styling</Text>
        <TextArea
          value=""
          onChangeText={() => {}}
          label={{ text: 'Custom Styled TextArea', position: 'top' }}
          placeholder="Custom styled text area..."
          helper={{ text: 'This text area has custom styling', show: true }}
          size="medium"
          variant="outlined"
          validation={{
            showCharacterCount: true,
            maxLength: 150
          }}
          containerStyle={{
            backgroundColor: 'rgba(83,52,131,0.1)',
            borderRadius: 20,
            padding: 4,
          }}
          inputStyle={{
            fontFamily: 'Inter',
            fontSize: 16,
            lineHeight: 24,
          }}
          labelStyle={{
            color: '#A29BFE',
            fontWeight: '600',
          }}
          helperStyle={{
            color: '#74B9FF',
          }}
          characterCountStyle={{
            color: '#DDA0FF',
            fontWeight: '500',
          }}
        />
      </View>

      {/* Long Content Example */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Long Content Example</Text>
        <TextArea
          value={`This is a longer text area example that demonstrates how the component handles extended content. 

You can type multiple paragraphs here, and the text area will automatically adjust its height (if auto-resize is enabled) or provide scrolling capabilities (if auto-resize is disabled).

The component maintains smooth animations and proper styling regardless of the content length.

Try typing more content to see how it behaves!`}
          onChangeText={() => {}}
          label={{ text: 'Long Content TextArea', position: 'top' }}
          helper={{ text: 'This demonstrates long content handling', show: true }}
          size="medium"
          variant="outlined"
          autoResize={{
            enabled: true,
            minHeight: 120,
            maxHeight: 250,
            animated: true
          }}
          validation={{
            showCharacterCount: true
          }}
        />
      </View>

      {/* Current Text Values */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Current Values</Text>
        <View style={styles.valuesContainer}>
          <View style={styles.valueItem}>
            <Text style={styles.valueLabel}>Basic Text:</Text>
            <Text style={styles.valueText}>{basicText || 'Empty'}</Text>
          </View>
          <View style={styles.valueItem}>
            <Text style={styles.valueLabel}>Auto-Resize Text:</Text>
            <Text style={styles.valueText}>{autoResizeText || 'Empty'}</Text>
          </View>
          <View style={styles.valueItem}>
            <Text style={styles.valueLabel}>Validation Text:</Text>
            <Text style={styles.valueText}>{validationText || 'Empty'}</Text>
          </View>
          <View style={styles.valueItem}>
            <Text style={styles.valueLabel}>Character Limit Text:</Text>
            <Text style={styles.valueText}>{characterLimitText || 'Empty'}</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          TextArea Test Component - All variants and functionality
        </Text>
      </View>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0F',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 32,
    fontFamily: 'Inter',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
    fontFamily: 'Inter',
  },
  subSection: {
    marginBottom: 16,
  },
  valuesContainer: {
    backgroundColor: 'rgba(22,33,62,0.2)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  valueItem: {
    marginBottom: 12,
  },
  valueLabel: {
    fontSize: 14,
    color: '#B8B8C0',
    fontFamily: 'Inter',
    marginBottom: 4,
  },
  valueText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Inter',
    paddingLeft: 8,
    fontStyle: 'italic',
  },
  footer: {
    marginTop: 32,
    marginBottom: 64,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#B8B8C0',
    textAlign: 'center',
    fontFamily: 'Inter',
  },
});

export default TextAreaTest;
