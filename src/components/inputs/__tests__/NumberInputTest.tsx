/**
 * Corp Astro UI Library - NumberInput Test Component
 * 
 * Test component for validating NumberInput functionality, validation,
 * formatting, and constraints.
 * 
 * @module NumberInputTest
 * @version 1.0.0
 * @since 2024
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NumberInput } from '../NumberInput';

/**
 * NumberInput Test Component
 * 
 * Comprehensive test suite for NumberInput component validation.
 */
export const NumberInputTest: React.FC = () => {
  // Test state
  const [basicValue, setBasicValue] = useState<number>(0);
  const [rangeValue, setRangeValue] = useState<number>(50);
  const [currencyValue, setCurrencyValue] = useState<number>(1234.56);
  const [unitValue, setUnitValue] = useState<number>(100);
  const [validationValue, setValidationValue] = useState<number>(0);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>NumberInput Test Component</Text>
      
      {/* Basic Number Input */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Number Input</Text>
        <NumberInput
          value={basicValue}
          onValueChange={setBasicValue}
          label={{ text: 'Basic Number', position: 'top' }}
          helper={{ text: 'Enter any number', show: true }}
          size="medium"
          variant="outlined"
        />
      </View>

      {/* Range Validation */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Range Validation (0-100)</Text>
        <NumberInput
          value={rangeValue}
          onValueChange={setRangeValue}
          label={{ text: 'Range Value', position: 'top' }}
          validation={{
            min: 0,
            max: 100,
            validateOnChange: true,
            validateOnBlur: true
          }}
          helper={{ text: 'Value must be between 0 and 100', show: true }}
          size="medium"
          variant="outlined"
        />
      </View>

      {/* Currency Formatting */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Currency Formatting</Text>
        <NumberInput
          value={currencyValue}
          onValueChange={setCurrencyValue}
          label={{ text: 'Currency Amount', position: 'top' }}
          format={{
            currency: '$',
            currencyPosition: 'before',
            thousandSeparator: ',',
            decimalSeparator: '.',
            formatDisplay: true
          }}
          validation={{
            decimals: 2,
            min: 0,
            validateOnChange: true
          }}
          helper={{ text: 'Enter currency amount', show: true }}
          size="medium"
          variant="outlined"
        />
      </View>

      {/* Unit Formatting */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Unit Formatting</Text>
        <NumberInput
          value={unitValue}
          onValueChange={setUnitValue}
          label={{ text: 'Temperature', position: 'top' }}
          format={{
            unit: '°C',
            unitPosition: 'after',
            formatDisplay: true
          }}
          validation={{
            min: -273.15,
            max: 1000,
            decimals: 1,
            validateOnChange: true
          }}
          helper={{ text: 'Enter temperature in Celsius', show: true }}
          size="medium"
          variant="outlined"
        />
      </View>

      {/* Custom Validation */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Validation</Text>
        <NumberInput
          value={validationValue}
          onValueChange={setValidationValue}
          label={{ text: 'Even Numbers Only', position: 'top' }}
          validation={{
            validator: (value) => value % 2 !== 0 ? 'Only even numbers allowed' : null,
            validateOnChange: true
          }}
          helper={{ text: 'Enter an even number', show: true }}
          size="medium"
          variant="outlined"
        />
      </View>

      {/* Size Variants */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Size Variants</Text>
        
        <View style={styles.subSection}>
          <NumberInput
            value={0}
            onValueChange={() => {}}
            label={{ text: 'Small Size', position: 'top' }}
            size="small"
            variant="outlined"
          />
        </View>

        <View style={styles.subSection}>
          <NumberInput
            value={0}
            onValueChange={() => {}}
            label={{ text: 'Medium Size', position: 'top' }}
            size="medium"
            variant="outlined"
          />
        </View>

        <View style={styles.subSection}>
          <NumberInput
            value={0}
            onValueChange={() => {}}
            label={{ text: 'Large Size', position: 'top' }}
            size="large"
            variant="outlined"
          />
        </View>
      </View>

      {/* Validation States */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Validation States</Text>
        
        <View style={styles.subSection}>
          <NumberInput
            value={0}
            onValueChange={() => {}}
            label={{ text: 'Default State', position: 'top' }}
            size="medium"
            variant="outlined"
          />
        </View>

        <View style={styles.subSection}>
          <NumberInput
            value={0}
            onValueChange={() => {}}
            label={{ text: 'Error State', position: 'top' }}
            errorMessage="Invalid number entered"
            size="medium"
            variant="outlined"
          />
        </View>

        <View style={styles.subSection}>
          <NumberInput
            value={0}
            onValueChange={() => {}}
            label={{ text: 'Success State', position: 'top' }}
            successMessage="Valid number entered"
            size="medium"
            variant="outlined"
          />
        </View>

        <View style={styles.subSection}>
          <NumberInput
            value={0}
            onValueChange={() => {}}
            label={{ text: 'Warning State', position: 'top' }}
            warningMessage="Number is near limit"
            size="medium"
            variant="outlined"
          />
        </View>
      </View>

      {/* Disabled State */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Disabled State</Text>
        <NumberInput
          value={123}
          onValueChange={() => {}}
          label={{ text: 'Disabled Input', position: 'top' }}
          disabled={true}
          size="medium"
          variant="outlined"
        />
      </View>

      {/* Decimal Precision */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Decimal Precision</Text>
        <NumberInput
          value={3.14159}
          onValueChange={() => {}}
          label={{ text: 'Pi Value (3 decimals)', position: 'top' }}
          validation={{
            decimals: 3,
            validateOnChange: true
          }}
          helper={{ text: 'Limited to 3 decimal places', show: true }}
          size="medium"
          variant="outlined"
        />
      </View>

      {/* No Negative Numbers */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Positive Numbers Only</Text>
        <NumberInput
          value={0}
          onValueChange={() => {}}
          label={{ text: 'Positive Only', position: 'top' }}
          validation={{
            allowNegative: false,
            validateOnChange: true
          }}
          helper={{ text: 'Only positive numbers allowed', show: true }}
          size="medium"
          variant="outlined"
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          NumberInput Test Component - All variants and states
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

export default NumberInputTest;
