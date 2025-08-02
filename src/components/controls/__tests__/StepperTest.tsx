import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Stepper, StepperProps } from '../Stepper';

/**
 * Comprehensive test component for Stepper
 * 
 * Tests all features including:
 * - Basic increment/decrement functionality
 * - Size variants (small, medium, large)
 * - Orientation (horizontal, vertical)
 * - Value constraints (min, max, step)
 * - Custom styling and colors
 * - Auto-repeat functionality
 * - Controlled/uncontrolled modes
 * - Accessibility features
 * - Custom rendering
 * - Decimal values
 * - Loading and disabled states
 */

const StepperTest: React.FC = () => {
  const [basicValue, setBasicValue] = useState(0);
  const [constrainedValue, setConstrainedValue] = useState(50);
  const [decimalValue, setDecimalValue] = useState(2.5);
  const [customValue, setCustomValue] = useState(10);

  const handleValueChange = (value: number) => {
    console.log('Value changed to:', value);
  };

  const handleValueChangeComplete = (value: number) => {
    console.log('Value change complete:', value);
  };

  const showAlert = (message: string) => {
    Alert.alert('Stepper Test', message);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Stepper Component Tests</Text>
      
      {/* Basic Stepper */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Stepper</Text>
        <Text style={styles.label}>Value: {basicValue}</Text>
        <Stepper
          value={basicValue}
          onValueChange={setBasicValue}
          onValueChangeComplete={handleValueChangeComplete}
        />
      </View>

      {/* Size Variants */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Size Variants</Text>
        
        <Text style={styles.label}>Small Size</Text>
        <Stepper
          defaultValue={0}
          size="small"
          onValueChange={handleValueChange}
        />
        
        <Text style={styles.label}>Medium Size (Default)</Text>
        <Stepper
          defaultValue={0}
          size="medium"
          onValueChange={handleValueChange}
        />
        
        <Text style={styles.label}>Large Size</Text>
        <Stepper
          defaultValue={0}
          size="large"
          onValueChange={handleValueChange}
        />
      </View>

      {/* Orientation */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Orientation</Text>
        
        <Text style={styles.label}>Horizontal (Default)</Text>
        <Stepper
          defaultValue={0}
          orientation="horizontal"
          onValueChange={handleValueChange}
        />
        
        <Text style={styles.label}>Vertical</Text>
        <Stepper
          defaultValue={0}
          orientation="vertical"
          onValueChange={handleValueChange}
        />
      </View>

      {/* Value Constraints */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Value Constraints</Text>
        <Text style={styles.label}>Value: {constrainedValue} (Range: 0-100, Step: 5)</Text>
        <Stepper
          value={constrainedValue}
          onValueChange={setConstrainedValue}
          min={0}
          max={100}
          step={5}
        />
      </View>

      {/* Decimal Values */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Decimal Values</Text>
        <Text style={styles.label}>Value: {decimalValue} (Step: 0.5, 1 decimal place)</Text>
        <Stepper
          value={decimalValue}
          onValueChange={setDecimalValue}
          step={0.5}
          allowDecimal={true}
          decimalPlaces={1}
          min={0}
          max={10}
        />
      </View>

      {/* Custom Styling */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Styling</Text>
        <Stepper
          defaultValue={0}
          buttonColor="#E74C3C"
          buttonTextColor="#FFFFFF"
          valueBackgroundColor="rgba(231, 76, 60, 0.2)"
          valueTextColor="#E74C3C"
          containerStyle={styles.customContainer}
          buttonStyle={styles.customButton}
          valueStyle={styles.customValue}
          size="large"
          onValueChange={handleValueChange}
        />
      </View>

      {/* Auto-repeat Configuration */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Auto-repeat Configuration</Text>
        <Text style={styles.label}>Fast Auto-repeat (100ms interval)</Text>
        <Stepper
          defaultValue={0}
          autoRepeat={true}
          autoRepeatDelay={300}
          autoRepeatIntervalMs={100}
          onValueChange={handleValueChange}
        />
      </View>

      {/* Custom Rendering */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Rendering</Text>
        <Text style={styles.label}>Value: {customValue}</Text>
        <Stepper
          value={customValue}
          onValueChange={setCustomValue}
          renderIncrementButton={({ onPress, disabled, style }) => (
            <View style={[style, styles.customIncrementButton]}>
              <Text style={styles.customButtonText} onPress={onPress}>
                ⬆️
              </Text>
            </View>
          )}
          renderDecrementButton={({ onPress, disabled, style }) => (
            <View style={[style, styles.customDecrementButton]}>
              <Text style={styles.customButtonText} onPress={onPress}>
                ⬇️
              </Text>
            </View>
          )}
          renderValue={({ value, formattedValue, style }) => (
            <View style={[style, styles.customValueDisplay]}>
              <Text style={styles.customValueText}>
                🔢 {formattedValue}
              </Text>
            </View>
          )}
        />
      </View>

      {/* States */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>States</Text>
        
        <Text style={styles.label}>Disabled</Text>
        <Stepper
          defaultValue={0}
          disabled={true}
          onValueChange={handleValueChange}
        />
        
        <Text style={styles.label}>Loading</Text>
        <Stepper
          defaultValue={0}
          loading={true}
          onValueChange={handleValueChange}
        />
        
        <Text style={styles.label}>Read-only</Text>
        <Stepper
          defaultValue={42}
          readOnly={true}
          onValueChange={handleValueChange}
        />
      </View>

      {/* Value Formatting */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Value Formatting</Text>
        <Stepper
          defaultValue={0}
          formatValue={(value) => `${value}%`}
          onValueChange={handleValueChange}
        />
      </View>

      {/* Without Value Display */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Without Value Display</Text>
        <Stepper
          defaultValue={0}
          showValue={false}
          onValueChange={handleValueChange}
        />
      </View>

      {/* Accessibility */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Accessibility</Text>
        <Stepper
          defaultValue={0}
          accessibilityLabel="Volume stepper"
          accessibilityHint="Adjust volume level"
          testID="volume-stepper"
          onValueChange={handleValueChange}
        />
      </View>

      {/* Glow Effect */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Glow Effect</Text>
        
        <Text style={styles.label}>With Glow (Default)</Text>
        <Stepper
          defaultValue={0}
          glowEffect={true}
          onValueChange={handleValueChange}
        />
        
        <Text style={styles.label}>Without Glow</Text>
        <Stepper
          defaultValue={0}
          glowEffect={false}
          onValueChange={handleValueChange}
        />
      </View>

      {/* Animation Speed */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Animation Speed</Text>
        <Stepper
          defaultValue={0}
          animationDuration={500}
          onValueChange={handleValueChange}
        />
      </View>

      {/* Haptic Feedback */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Haptic Feedback</Text>
        <Stepper
          defaultValue={0}
          hapticFeedback={true}
          onValueChange={(value) => {
            showAlert(`Value changed to ${value} with haptic feedback`);
          }}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Test all interactions including tap, hold, and auto-repeat functionality
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0E23',
    padding: 16,
  },
  
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 20,
  },
  
  section: {
    marginBottom: 32,
    padding: 16,
    backgroundColor: 'rgba(22, 33, 62, 0.3)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  
  label: {
    fontSize: 14,
    color: '#B0B0B0',
    marginBottom: 8,
    marginTop: 12,
  },
  
  customContainer: {
    backgroundColor: 'rgba(231, 76, 60, 0.1)',
    borderRadius: 16,
    padding: 8,
  },
  
  customButton: {
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#E74C3C',
  },
  
  customValue: {
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#E74C3C',
  },
  
  customIncrementButton: {
    backgroundColor: '#27AE60',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  customDecrementButton: {
    backgroundColor: '#E74C3C',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  customButtonText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  
  customValueDisplay: {
    backgroundColor: 'rgba(52, 152, 219, 0.2)',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#3498DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  customValueText: {
    fontSize: 16,
    color: '#3498DB',
    fontWeight: 'bold',
  },
  
  footer: {
    marginTop: 32,
    marginBottom: 48,
    padding: 16,
    backgroundColor: 'rgba(22, 33, 62, 0.2)',
    borderRadius: 8,
  },
  
  footerText: {
    fontSize: 14,
    color: '#B0B0B0',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default StepperTest;
