import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Slider, SliderValue, SliderMark } from '../Slider';

/**
 * Slider Test Component
 * 
 * Comprehensive test suite for Slider component covering all features:
 * - Basic usage with different ranges
 * - Controlled and uncontrolled states
 * - Size variants
 * - Custom styling
 * - Disabled and loading states
 * - Value formatting
 * - Marks and labels
 * - Custom render functions
 * - Step values
 * - Accessibility features
 */
const SliderTest: React.FC = () => {
  // State for controlled components
  const [basicValue, setBasicValue] = useState<SliderValue>(50);
  const [temperatureValue, setTemperatureValue] = useState<SliderValue>(22);
  const [volumeValue, setVolumeValue] = useState<SliderValue>(75);
  const [customValue, setCustomValue] = useState<SliderValue>(30);
  const [stepValue, setStepValue] = useState<SliderValue>(20);

  // Marks for temperature slider
  const temperatureMarks: SliderMark[] = [
    { value: 10, label: 'Cold' },
    { value: 20, label: 'Cool' },
    { value: 25, label: 'Comfortable' },
    { value: 30, label: 'Warm' },
    { value: 35, label: 'Hot' },
  ];

  // Marks for volume slider
  const volumeMarks: SliderMark[] = [
    { value: 0, label: '🔇' },
    { value: 25, label: '🔈' },
    { value: 50, label: '🔉' },
    { value: 75, label: '🔊' },
    { value: 100, label: '🔊' },
  ];

  // Step marks
  const stepMarks: SliderMark[] = [
    { value: 0, label: '0' },
    { value: 25, label: '25' },
    { value: 50, label: '50' },
    { value: 75, label: '75' },
    { value: 100, label: '100' },
  ];

  // Handle value changes
  const handleBasicChange = (value: SliderValue) => {
    setBasicValue(value);
    console.log('Basic value changed:', value);
  };

  const handleTemperatureChange = (value: SliderValue) => {
    setTemperatureValue(value);
    console.log('Temperature changed:', value);
  };

  const handleVolumeChange = (value: SliderValue) => {
    setVolumeValue(value);
    console.log('Volume changed:', value);
  };

  const handleCustomChange = (value: SliderValue) => {
    setCustomValue(value);
    console.log('Custom value changed:', value);
  };

  const handleStepChange = (value: SliderValue) => {
    setStepValue(value);
    console.log('Step value changed:', value);
  };

  // Value formatters
  const formatTemperature = (value: number) => `${value}°C`;
  const formatVolume = (value: number) => `${value}%`;
  const formatCurrency = (value: number) => `$${value.toFixed(2)}`;

  // Custom render functions
  const renderCustomThumb = ({ value, size, style, animatedStyle }: any) => (
    <View style={[style, { backgroundColor: '#FFD700' }]}>
      <Text style={styles.thumbText}>{value}</Text>
    </View>
  );

  const renderCustomMark = ({ mark, index, isActive, style }: any) => (
    <View
      key={index}
      style={[
        style,
        {
          backgroundColor: isActive ? '#FFD700' : 'rgba(255, 255, 255, 0.3)',
          borderWidth: 2,
          borderColor: isActive ? '#FFD700' : 'transparent',
        },
      ]}
    />
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Slider Test Suite</Text>
      
      {/* Basic Usage */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Usage</Text>
        <Slider
          value={basicValue}
          onValueChange={handleBasicChange}
          onValueChangeComplete={(value) => {
            console.log('Basic value change complete:', value);
            Alert.alert('Value Changed', `Final value: ${value}`);
          }}
        />
        <Text style={styles.result}>Value: {basicValue}</Text>
      </View>

      {/* Temperature Control */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Temperature Control</Text>
        <Slider
          value={temperatureValue}
          onValueChange={handleTemperatureChange}
          min={10}
          max={35}
          step={1}
          formatValue={formatTemperature}
          showMarks={true}
          marks={temperatureMarks}
          activeTrackColor="#FF6B6B"
          thumbColor="#FF6B6B"
          trackColor="rgba(255, 107, 107, 0.3)"
        />
        <Text style={styles.result}>Temperature: {formatTemperature(temperatureValue)}</Text>
      </View>

      {/* Volume Control */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Volume Control</Text>
        <Slider
          value={volumeValue}
          onValueChange={handleVolumeChange}
          min={0}
          max={100}
          step={5}
          formatValue={formatVolume}
          showMarks={true}
          marks={volumeMarks}
          activeTrackColor="#6C5CE7"
          thumbColor="#6C5CE7"
          trackColor="rgba(108, 92, 231, 0.3)"
        />
        <Text style={styles.result}>Volume: {formatVolume(volumeValue)}</Text>
      </View>

      {/* Size Variants */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Size Variants</Text>
        
        <Text style={styles.subsectionTitle}>Small</Text>
        <Slider
          defaultValue={25}
          size="small"
          onValueChange={(value) => console.log('Small size:', value)}
        />
        
        <Text style={styles.subsectionTitle}>Medium (Default)</Text>
        <Slider
          defaultValue={50}
          size="medium"
          onValueChange={(value) => console.log('Medium size:', value)}
        />
        
        <Text style={styles.subsectionTitle}>Large</Text>
        <Slider
          defaultValue={75}
          size="large"
          onValueChange={(value) => console.log('Large size:', value)}
        />
      </View>

      {/* Custom Styling */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Styling</Text>
        <Slider
          value={customValue}
          onValueChange={handleCustomChange}
          formatValue={formatCurrency}
          min={0}
          max={100}
          step={5}
          activeTrackColor="#FFD700"
          thumbColor="#FFD700"
          trackColor="rgba(255, 215, 0, 0.3)"
          containerStyle={styles.customContainer}
          labelStyle={styles.customLabel}
          trackStyle={styles.customTrack}
          thumbStyle={styles.customThumb}
        />
        <Text style={styles.result}>Price: {formatCurrency(customValue)}</Text>
      </View>

      {/* Step Values */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Step Values (Step: 25)</Text>
        <Slider
          value={stepValue}
          onValueChange={handleStepChange}
          min={0}
          max={100}
          step={25}
          showMarks={true}
          marks={stepMarks}
          activeTrackColor="#48C9E5"
          thumbColor="#48C9E5"
          trackColor="rgba(72, 201, 229, 0.3)"
        />
        <Text style={styles.result}>Step Value: {stepValue}</Text>
      </View>

      {/* Disabled State */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Disabled State</Text>
        <Slider
          defaultValue={60}
          disabled={true}
          showMarks={true}
          marks={[
            { value: 0, label: '0' },
            { value: 50, label: '50' },
            { value: 100, label: '100' },
          ]}
        />
      </View>

      {/* Loading State */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Loading State</Text>
        <Slider
          defaultValue={40}
          loading={true}
          showMarks={true}
          marks={[
            { value: 0, label: '0' },
            { value: 50, label: '50' },
            { value: 100, label: '100' },
          ]}
        />
      </View>

      {/* No Value Display */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>No Value Display</Text>
        <Slider
          defaultValue={30}
          showValue={false}
          onValueChange={(value) => console.log('Hidden value:', value)}
        />
      </View>

      {/* Custom Range */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Range (-50 to 50)</Text>
        <Slider
          defaultValue={0}
          min={-50}
          max={50}
          step={10}
          formatValue={(value) => `${value > 0 ? '+' : ''}${value}`}
          showMarks={true}
          marks={[
            { value: -50, label: '-50' },
            { value: -25, label: '-25' },
            { value: 0, label: '0' },
            { value: 25, label: '+25' },
            { value: 50, label: '+50' },
          ]}
          onValueChange={(value) => console.log('Custom range:', value)}
        />
      </View>

      {/* Custom Render Functions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Render Functions</Text>
        <Slider
          defaultValue={45}
          renderThumb={renderCustomThumb}
          renderMark={renderCustomMark}
          showMarks={true}
          marks={[
            { value: 0, label: '0' },
            { value: 25, label: '25' },
            { value: 50, label: '50' },
            { value: 75, label: '75' },
            { value: 100, label: '100' },
          ]}
          onValueChange={(value) => console.log('Custom render:', value)}
        />
      </View>

      {/* Uncontrolled */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Uncontrolled</Text>
        <Slider
          defaultValue={70}
          formatValue={(value) => `${value}%`}
          onValueChange={(value) => {
            console.log('Uncontrolled value changed:', value);
          }}
          onValueChangeComplete={(value) => {
            Alert.alert('Uncontrolled Complete', `Final value: ${value}%`);
          }}
        />
      </View>

      {/* Accessibility */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Accessibility</Text>
        <Slider
          defaultValue={55}
          formatValue={(value) => `${value} percent`}
          accessibilityLabel="Volume slider"
          accessibilityHint="Adjust the volume level"
          testID="accessible-slider"
        />
      </View>

      {/* No Glow Effect */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>No Glow Effect</Text>
        <Slider
          defaultValue={35}
          glowEffect={false}
          onValueChange={(value) => console.log('No glow:', value)}
        />
      </View>

      {/* Fast Animation */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Fast Animation</Text>
        <Slider
          defaultValue={65}
          animationDuration={100}
          onValueChange={(value) => console.log('Fast animation:', value)}
        />
      </View>

      {/* Precise Control */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Precise Control (Step: 0.1)</Text>
        <Slider
          defaultValue={5.5}
          min={0}
          max={10}
          step={0.1}
          formatValue={(value) => value.toFixed(1)}
          onValueChange={(value) => console.log('Precise:', value)}
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
  
  customContainer: {
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  
  customLabel: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  
  customTrack: {
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.4)',
  },
  
  customThumb: {
    borderWidth: 3,
    borderColor: '#FFD700',
    shadowColor: '#FFD700',
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 12,
  },
  
  thumbText: {
    fontSize: 10,
    color: '#08080F',
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default SliderTest;
