import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { RadioGroup, RadioGroupOption, RadioGroupValue } from '../RadioGroup';

/**
 * RadioGroup Test Component
 * 
 * Comprehensive test suite for RadioGroup component covering all features:
 * - Basic usage with different directions
 * - Controlled and uncontrolled states
 * - Size variants
 * - Custom styling
 * - Disabled and loading states
 * - Title, description, and error states
 * - Custom render functions
 * - Accessibility features
 */
const RadioGroupTest: React.FC = () => {
  // State for controlled components
  const [basicValue, setBasicValue] = useState<RadioGroupValue>('option1');
  const [horizontalValue, setHorizontalValue] = useState<RadioGroupValue>('small');
  const [customValue, setCustomValue] = useState<RadioGroupValue>('premium');
  const [disabledValue, setDisabledValue] = useState<RadioGroupValue>('option2');
  const [errorValue, setErrorValue] = useState<RadioGroupValue>('');

  // Basic options
  const basicOptions: RadioGroupOption[] = [
    { value: 'option1', label: 'First Option' },
    { value: 'option2', label: 'Second Option' },
    { value: 'option3', label: 'Third Option' },
  ];

  // Size options
  const sizeOptions: RadioGroupOption[] = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
  ];

  // Custom styled options
  const customOptions: RadioGroupOption[] = [
    {
      value: 'basic',
      label: 'Basic Plan',
      style: { backgroundColor: 'rgba(46, 134, 222, 0.1)' },
    },
    {
      value: 'premium',
      label: 'Premium Plan',
      style: { backgroundColor: 'rgba(108, 92, 231, 0.1)' },
      labelStyle: { color: '#6C5CE7', fontWeight: '600' },
    },
    {
      value: 'enterprise',
      label: 'Enterprise Plan',
      style: { backgroundColor: 'rgba(255, 215, 0, 0.1)' },
      labelStyle: { color: '#FFD700', fontWeight: '700' },
    },
  ];

  // Disabled options
  const disabledOptions: RadioGroupOption[] = [
    { value: 'option1', label: 'Available Option' },
    { value: 'option2', label: 'Disabled Option', disabled: true },
    { value: 'option3', label: 'Another Available Option' },
  ];

  // Options with error
  const errorOptions: RadioGroupOption[] = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
    { value: 'maybe', label: 'Maybe' },
  ];

  // Custom render options
  const renderOptions: RadioGroupOption[] = [
    { value: 'option1', label: 'Custom Render 1' },
    { value: 'option2', label: 'Custom Render 2' },
    { value: 'option3', label: 'Custom Render 3' },
  ];

  // Handle value changes
  const handleBasicChange = (value: RadioGroupValue) => {
    setBasicValue(value);
    console.log('Basic value changed:', value);
  };

  const handleHorizontalChange = (value: RadioGroupValue) => {
    setHorizontalValue(value);
    console.log('Horizontal value changed:', value);
  };

  const handleCustomChange = (value: RadioGroupValue) => {
    setCustomValue(value);
    console.log('Custom value changed:', value);
  };

  const handleDisabledChange = (value: RadioGroupValue) => {
    setDisabledValue(value);
    console.log('Disabled group value changed:', value);
  };

  const handleErrorChange = (value: RadioGroupValue) => {
    setErrorValue(value);
    console.log('Error group value changed:', value);
  };

  // Custom render function for option
  const renderCustomOption = ({ option, index, isSelected, radioButton }: any) => (
    <View
      key={index}
      style={[
        styles.customOptionContainer,
        isSelected && styles.selectedCustomOption,
      ]}
    >
      {radioButton}
      <Text style={styles.customOptionIndex}>#{index + 1}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>RadioGroup Test Suite</Text>
      
      {/* Basic Usage */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Usage (Vertical)</Text>
        <RadioGroup
          options={basicOptions}
          value={basicValue}
          onValueChange={handleBasicChange}
          title="Choose an option"
          description="Select one of the available options below"
        />
        <Text style={styles.result}>Selected: {basicValue}</Text>
      </View>

      {/* Horizontal Layout */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Horizontal Layout</Text>
        <RadioGroup
          options={sizeOptions}
          value={horizontalValue}
          onValueChange={handleHorizontalChange}
          direction="horizontal"
          title="Size Selection"
          size="small"
          spacing={20}
        />
        <Text style={styles.result}>Selected: {horizontalValue}</Text>
      </View>

      {/* Size Variants */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Size Variants</Text>
        
        <Text style={styles.subsectionTitle}>Small</Text>
        <RadioGroup
          options={basicOptions}
          defaultValue="option1"
          size="small"
          onValueChange={(value) => console.log('Small size:', value)}
        />
        
        <Text style={styles.subsectionTitle}>Medium (Default)</Text>
        <RadioGroup
          options={basicOptions}
          defaultValue="option2"
          size="medium"
          onValueChange={(value) => console.log('Medium size:', value)}
        />
        
        <Text style={styles.subsectionTitle}>Large</Text>
        <RadioGroup
          options={basicOptions}
          defaultValue="option3"
          size="large"
          onValueChange={(value) => console.log('Large size:', value)}
        />
      </View>

      {/* Custom Styling */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Styling</Text>
        <RadioGroup
          options={customOptions}
          value={customValue}
          onValueChange={handleCustomChange}
          title="Select Plan"
          description="Choose your subscription plan"
          borderColorSelected="#6C5CE7"
          dotColor="#6C5CE7"
          groupStyle={styles.customGroup}
          optionStyle={styles.customOption}
          titleStyle={styles.customTitle}
        />
        <Text style={styles.result}>Selected: {customValue}</Text>
      </View>

      {/* Disabled State */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Disabled States</Text>
        <RadioGroup
          options={disabledOptions}
          value={disabledValue}
          onValueChange={handleDisabledChange}
          title="Disabled Options"
          description="Some options are disabled"
        />
        <Text style={styles.result}>Selected: {disabledValue}</Text>
      </View>

      {/* Loading State */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Loading State</Text>
        <RadioGroup
          options={basicOptions}
          defaultValue="option1"
          loading={true}
          title="Loading Group"
          description="All options are in loading state"
        />
      </View>

      {/* Error State */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Error State</Text>
        <RadioGroup
          options={errorOptions}
          value={errorValue}
          onValueChange={handleErrorChange}
          title="Required Selection"
          description="Please select an option"
          error={!errorValue ? 'This field is required' : ''}
          errorStyle={styles.customError}
        />
        <Text style={styles.result}>Selected: {errorValue}</Text>
      </View>

      {/* Label Positions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Label Positions</Text>
        
        <Text style={styles.subsectionTitle}>Left Labels</Text>
        <RadioGroup
          options={basicOptions}
          defaultValue="option1"
          labelPosition="left"
          title="Left Labels"
        />
        
        <Text style={styles.subsectionTitle}>Right Labels (Default)</Text>
        <RadioGroup
          options={basicOptions}
          defaultValue="option2"
          labelPosition="right"
          title="Right Labels"
        />
      </View>

      {/* Custom Render */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Render</Text>
        <RadioGroup
          options={renderOptions}
          defaultValue="option1"
          title="Custom Option Render"
          description="Options with custom rendering"
          renderOption={renderCustomOption}
        />
      </View>

      {/* Uncontrolled */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Uncontrolled</Text>
        <RadioGroup
          options={basicOptions}
          defaultValue="option2"
          title="Uncontrolled Group"
          description="Uses defaultValue and internal state"
          onValueChange={(value) => {
            console.log('Uncontrolled value changed:', value);
            Alert.alert('Value Changed', `Selected: ${value}`);
          }}
        />
      </View>

      {/* Accessibility */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Accessibility</Text>
        <RadioGroup
          options={basicOptions}
          defaultValue="option1"
          title="Accessible Group"
          description="Includes proper accessibility attributes"
          accessibilityLabel="Radio button group for accessibility testing"
          accessibilityHint="Select one option from the available choices"
          testID="accessible-radio-group"
        />
      </View>

      {/* No Glow Effect */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>No Glow Effect</Text>
        <RadioGroup
          options={basicOptions}
          defaultValue="option1"
          title="No Glow Effect"
          description="Radio buttons without glow effect"
          glowEffect={false}
        />
      </View>

      {/* Custom Colors */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Colors</Text>
        <RadioGroup
          options={basicOptions}
          defaultValue="option1"
          title="Custom Colors"
          description="Custom border and dot colors"
          borderColorUnselected="rgba(255, 255, 255, 0.2)"
          borderColorSelected="#FF6B6B"
          dotColor="#FF6B6B"
        />
      </View>

      {/* Fast Animation */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Fast Animation</Text>
        <RadioGroup
          options={basicOptions}
          defaultValue="option1"
          title="Fast Animation"
          description="Radio buttons with fast animation"
          animationDuration={100}
        />
      </View>

      {/* Large Spacing */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Large Spacing</Text>
        <RadioGroup
          options={basicOptions}
          defaultValue="option1"
          title="Large Spacing"
          description="Radio buttons with large spacing"
          spacing={32}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#08080F',
  },
  
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
    textShadowColor: 'rgba(46, 134, 222, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  
  section: {
    marginBottom: 40,
    padding: 20,
    backgroundColor: 'rgba(22, 33, 62, 0.3)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(46, 134, 222, 0.2)',
  },
  
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 15,
  },
  
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 20,
    marginBottom: 10,
  },
  
  result: {
    fontSize: 14,
    color: '#2E86DE',
    marginTop: 10,
    fontWeight: '500',
  },
  
  customGroup: {
    backgroundColor: 'rgba(108, 92, 231, 0.1)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(108, 92, 231, 0.3)',
  },
  
  customOption: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  
  customTitle: {
    color: '#6C5CE7',
    fontSize: 18,
    fontWeight: '700',
  },
  
  customError: {
    color: '#FF6B6B',
    fontSize: 13,
    fontWeight: '600',
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    padding: 8,
    borderRadius: 6,
    marginTop: 10,
  },
  
  customOptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  
  selectedCustomOption: {
    backgroundColor: 'rgba(46, 134, 222, 0.1)',
    borderColor: 'rgba(46, 134, 222, 0.3)',
  },
  
  customOptionIndex: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '500',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
});

export default RadioGroupTest;
