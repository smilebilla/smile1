import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { SegmentedControl, SegmentedControlProps, SegmentedControlOption } from '../SegmentedControl';

/**
 * Comprehensive test component for SegmentedControl
 * 
 * Tests all features including:
 * - Basic segment selection
 * - Size variants (small, medium, large)
 * - Style variants (default, outline, solid, ghost)
 * - Custom styling and colors
 * - Icons in segments
 * - Multiple selection mode
 * - Controlled/uncontrolled modes
 * - Accessibility features
 * - Custom rendering
 * - Loading and disabled states
 * - Smooth animations
 */

const SegmentedControlTest: React.FC = () => {
  const [basicValue, setBasicValue] = useState<string | number>('option1');
  const [customValue, setCustomValue] = useState<string | number>('red');
  const [multipleValues, setMultipleValues] = useState<(string | number)[]>(['option1', 'option2']);
  const [iconValue, setIconValue] = useState<string | number>('home');

  const handleValueChange = (value: string | number) => {
    console.log('SegmentedControl value changed to:', value);
  };

  const handleMultipleValueChange = (values: (string | number)[]) => {
    console.log('SegmentedControl multiple values changed to:', values);
  };

  const showAlert = (message: string) => {
    Alert.alert('SegmentedControl Test', message);
  };

  // Basic options
  const basicOptions: SegmentedControlOption[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  // Size test options
  const sizeOptions: SegmentedControlOption[] = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
  ];

  // Color options
  const colorOptions: SegmentedControlOption[] = [
    { value: 'red', label: 'Red' },
    { value: 'green', label: 'Green' },
    { value: 'blue', label: 'Blue' },
    { value: 'yellow', label: 'Yellow' },
  ];

  // Icon options
  const iconOptions: SegmentedControlOption[] = [
    { 
      value: 'home', 
      label: 'Home',
      icon: <Text style={{ color: '#2E86DE', fontSize: 16 }}>🏠</Text>
    },
    { 
      value: 'search', 
      label: 'Search',
      icon: <Text style={{ color: '#2E86DE', fontSize: 16 }}>🔍</Text>
    },
    { 
      value: 'profile', 
      label: 'Profile',
      icon: <Text style={{ color: '#2E86DE', fontSize: 16 }}>👤</Text>
    },
    { 
      value: 'settings', 
      label: 'Settings',
      icon: <Text style={{ color: '#2E86DE', fontSize: 16 }}>⚙️</Text>
    },
  ];

  // Long text options
  const longTextOptions: SegmentedControlOption[] = [
    { value: 'short', label: 'Short' },
    { value: 'medium', label: 'Medium Text' },
    { value: 'long', label: 'Very Long Text Here' },
  ];

  // Options with disabled
  const disabledOptions: SegmentedControlOption[] = [
    { value: 'enabled1', label: 'Enabled 1' },
    { value: 'disabled', label: 'Disabled', disabled: true },
    { value: 'enabled2', label: 'Enabled 2' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>SegmentedControl Component Tests</Text>
      
      {/* Basic SegmentedControl */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic SegmentedControl</Text>
        <SegmentedControl
          options={basicOptions}
          value={basicValue}
          onValueChange={setBasicValue}
        />
        <Text style={styles.statusText}>
          Selected: {basicValue}
        </Text>
      </View>

      {/* Size Variants */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Size Variants</Text>
        
        <Text style={styles.label}>Small Size</Text>
        <SegmentedControl
          options={sizeOptions}
          defaultValue="small"
          size="small"
          onValueChange={handleValueChange}
        />
        
        <Text style={styles.label}>Medium Size (Default)</Text>
        <SegmentedControl
          options={sizeOptions}
          defaultValue="medium"
          size="medium"
          onValueChange={handleValueChange}
        />
        
        <Text style={styles.label}>Large Size</Text>
        <SegmentedControl
          options={sizeOptions}
          defaultValue="large"
          size="large"
          onValueChange={handleValueChange}
        />
      </View>

      {/* Custom Styling */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Styling</Text>
        <SegmentedControl
          options={colorOptions}
          value={customValue}
          onValueChange={setCustomValue}
          backgroundColor="rgba(231, 76, 60, 0.2)"
          selectedBackgroundColor="#E74C3C"
          textColor="#BDC3C7"
          selectedTextColor="#FFFFFF"
          borderColor="rgba(231, 76, 60, 0.3)"
          selectedBorderColor="rgba(231, 76, 60, 0.5)"
          size="large"
          containerStyle={styles.customContainer}
          segmentStyle={styles.customSegment}
          selectedSegmentStyle={styles.customSelectedSegment}
          textStyle={styles.customText}
          selectedTextStyle={styles.customSelectedText}
        />
      </View>

      {/* Icons */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Icons</Text>
        
        <Text style={styles.label}>Icons Left</Text>
        <SegmentedControl
          options={iconOptions}
          value={iconValue}
          onValueChange={setIconValue}
          showIcons={true}
          iconPosition="left"
          size="large"
        />
        
        <Text style={styles.label}>Icons Right</Text>
        <SegmentedControl
          options={iconOptions}
          defaultValue="home"
          showIcons={true}
          iconPosition="right"
          size="large"
          onValueChange={handleValueChange}
        />
        
        <Text style={styles.label}>Icons Top</Text>
        <SegmentedControl
          options={iconOptions}
          defaultValue="home"
          showIcons={true}
          iconPosition="top"
          size="large"
          onValueChange={handleValueChange}
        />
      </View>

      {/* Multiple Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Multiple Selection</Text>
        <SegmentedControl
          options={basicOptions}
          multiple={true}
          multipleValues={multipleValues}
          onMultipleValueChange={setMultipleValues}
          minSelection={1}
          maxSelection={2}
          size="large"
        />
        <Text style={styles.statusText}>
          Selected: {multipleValues.join(', ')}
        </Text>
      </View>

      {/* Segment Spacing */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Segment Spacing</Text>
        
        <Text style={styles.label}>No Spacing (Default)</Text>
        <SegmentedControl
          options={basicOptions}
          defaultValue="option1"
          segmentSpacing={0}
          onValueChange={handleValueChange}
        />
        
        <Text style={styles.label}>With Spacing</Text>
        <SegmentedControl
          options={basicOptions}
          defaultValue="option1"
          segmentSpacing={4}
          onValueChange={handleValueChange}
        />
      </View>

      {/* Full Width vs Fixed Width */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Width Options</Text>
        
        <Text style={styles.label}>Full Width (Default)</Text>
        <SegmentedControl
          options={basicOptions}
          defaultValue="option1"
          fullWidth={true}
          onValueChange={handleValueChange}
        />
        
        <Text style={styles.label}>Fixed Width</Text>
        <SegmentedControl
          options={basicOptions}
          defaultValue="option1"
          fullWidth={false}
          onValueChange={handleValueChange}
        />
      </View>

      {/* Custom Rendering */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Rendering</Text>
        <SegmentedControl
          options={colorOptions}
          defaultValue="red"
          renderSegment={({ option, isSelected, style, textStyle }) => (
            <View
              style={[
                style,
                {
                  backgroundColor: isSelected ? '#9B59B6' : 'transparent',
                  borderColor: isSelected ? '#8E44AD' : 'transparent',
                  borderWidth: 2,
                  borderRadius: 8,
                },
              ]}
            >
              <Text
                style={[
                  textStyle,
                  {
                    color: isSelected ? '#FFFFFF' : '#9B59B6',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                  },
                ]}
              >
                {option.label} {isSelected ? '✓' : '○'}
              </Text>
            </View>
          )}
          renderSelectedIndicator={({ style, animatedStyle }) => (
            <View style={[style, animatedStyle, { backgroundColor: '#9B59B6' }]} />
          )}
          onValueChange={handleValueChange}
        />
      </View>

      {/* States */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>States</Text>
        
        <Text style={styles.label}>Disabled</Text>
        <SegmentedControl
          options={basicOptions}
          defaultValue="option1"
          disabled={true}
          onValueChange={handleValueChange}
        />
        
        <Text style={styles.label}>Loading</Text>
        <SegmentedControl
          options={basicOptions}
          defaultValue="option1"
          loading={true}
          onValueChange={handleValueChange}
        />
        
        <Text style={styles.label}>Read-only</Text>
        <SegmentedControl
          options={basicOptions}
          defaultValue="option2"
          readOnly={true}
          onValueChange={handleValueChange}
        />
        
        <Text style={styles.label}>Individual Disabled Options</Text>
        <SegmentedControl
          options={disabledOptions}
          defaultValue="enabled1"
          onValueChange={handleValueChange}
        />
      </View>

      {/* Long Text Handling */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Long Text Handling</Text>
        <SegmentedControl
          options={longTextOptions}
          defaultValue="short"
          onValueChange={handleValueChange}
        />
      </View>

      {/* Animation Options */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Animation Options</Text>
        
        <Text style={styles.label}>Fast Animation</Text>
        <SegmentedControl
          options={basicOptions}
          defaultValue="option1"
          animationDuration={100}
          onValueChange={handleValueChange}
        />
        
        <Text style={styles.label}>Slow Animation</Text>
        <SegmentedControl
          options={basicOptions}
          defaultValue="option1"
          animationDuration={500}
          onValueChange={handleValueChange}
        />
      </View>

      {/* Glow Effects */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Glow Effects</Text>
        
        <Text style={styles.label}>With Glow (Default)</Text>
        <SegmentedControl
          options={basicOptions}
          defaultValue="option1"
          glowEffect={true}
          onValueChange={handleValueChange}
        />
        
        <Text style={styles.label}>Without Glow</Text>
        <SegmentedControl
          options={basicOptions}
          defaultValue="option1"
          glowEffect={false}
          onValueChange={handleValueChange}
        />
      </View>

      {/* Border Radius */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Border Radius</Text>
        
        <Text style={styles.label}>Default Border Radius</Text>
        <SegmentedControl
          options={basicOptions}
          defaultValue="option1"
          onValueChange={handleValueChange}
        />
        
        <Text style={styles.label}>Custom Border Radius</Text>
        <SegmentedControl
          options={basicOptions}
          defaultValue="option1"
          borderRadius={20}
          onValueChange={handleValueChange}
        />
        
        <Text style={styles.label}>Square (No Border Radius)</Text>
        <SegmentedControl
          options={basicOptions}
          defaultValue="option1"
          borderRadius={0}
          onValueChange={handleValueChange}
        />
      </View>

      {/* Accessibility */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Accessibility</Text>
        <SegmentedControl
          options={basicOptions}
          defaultValue="option1"
          accessibilityLabel="View mode selector"
          accessibilityHint="Select the view mode for the content"
          testID="view-mode-selector"
          onValueChange={handleValueChange}
        />
      </View>

      {/* Haptic Feedback */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Haptic Feedback</Text>
        <SegmentedControl
          options={basicOptions}
          defaultValue="option1"
          hapticFeedback={true}
          onValueChange={(value) => {
            showAlert(`Selected: ${value} with haptic feedback`);
          }}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Test all interactions including tap, animations, and accessibility features
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
  
  statusText: {
    fontSize: 14,
    color: '#B0B0B0',
    marginTop: 8,
    textAlign: 'center',
  },
  
  customContainer: {
    backgroundColor: 'rgba(231, 76, 60, 0.1)',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'rgba(231, 76, 60, 0.3)',
  },
  
  customSegment: {
    backgroundColor: 'rgba(231, 76, 60, 0.05)',
  },
  
  customSelectedSegment: {
    backgroundColor: 'rgba(231, 76, 60, 0.2)',
  },
  
  customText: {
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  
  customSelectedText: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
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

export default SegmentedControlTest;
