/**
 * Corp Astro UI Library - SliderInput Test Component
 * 
 * Test component for the SliderInput primitive showcasing all variants,
 * sizes, states, and functionality.
 * 
 * @module SliderInputTest
 * @version 1.0.0
 * @since 2024
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Switch,
  Alert,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import { SliderInput, SliderInputSize, SliderInputVariant, SliderInputValidationState } from '../SliderInput';

/**
 * Test component for SliderInput primitive
 */
export const SliderInputTest: React.FC = () => {
  // State for different test scenarios
  const [basicValue, setBasicValue] = useState(50);
  const [volumeValue, setVolumeValue] = useState(75);
  const [temperatureValue, setTemperatureValue] = useState(22);
  const [brightnessValue, setBrightnessValue] = useState(80);
  const [priceValue, setPriceValue] = useState(500);
  const [customValue, setCustomValue] = useState(3);
  
  // Configuration states
  const [disabled, setDisabled] = useState(false);
  const [showValue, setShowValue] = useState(true);
  const [showSteps, setShowSteps] = useState(false);
  const [allowDecimal, setAllowDecimal] = useState(false);
  const [snapToStep, setSnapToStep] = useState(true);

  // Event handlers
  const handleValueChange = (value: number) => {
    console.log('Value changed:', value);
  };

  const handleGestureStart = (value: number) => {
    console.log('Gesture started at value:', value);
  };

  const handleGestureEnd = (value: number) => {
    console.log('Gesture ended at value:', value);
    Alert.alert('Gesture Complete', `Final value: ${value}`);
  };

  // Custom value formatter
  const formatTemperature = (value: number): string => {
    return `${value.toFixed(1)}°C`;
  };

  const formatPrice = (value: number): string => {
    return `$${value.toFixed(0)}`;
  };

  const formatRating = (value: number): string => {
    const stars = '★'.repeat(Math.floor(value)) + '☆'.repeat(5 - Math.floor(value));
    return `${stars} (${value}/5)`;
  };

  const sizes: SliderInputSize[] = ['small', 'medium', 'large'];
  const variants: SliderInputVariant[] = ['default', 'gradient', 'stepped'];
  const validationStates: SliderInputValidationState[] = ['default', 'error', 'success', 'warning'];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>SliderInput Test Component</Text>
        <Text style={styles.subtitle}>
          Comprehensive testing of SliderInput primitive with all variants, sizes, states, and functionality.
        </Text>

        {/* Configuration Controls */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Configuration</Text>
          <View style={styles.controlRow}>
            <Text style={styles.controlLabel}>Disabled:</Text>
            <Switch value={disabled} onValueChange={setDisabled} />
          </View>
          <View style={styles.controlRow}>
            <Text style={styles.controlLabel}>Show Value:</Text>
            <Switch value={showValue} onValueChange={setShowValue} />
          </View>
          <View style={styles.controlRow}>
            <Text style={styles.controlLabel}>Show Steps:</Text>
            <Switch value={showSteps} onValueChange={setShowSteps} />
          </View>
          <View style={styles.controlRow}>
            <Text style={styles.controlLabel}>Allow Decimal:</Text>
            <Switch value={allowDecimal} onValueChange={setAllowDecimal} />
          </View>
          <View style={styles.controlRow}>
            <Text style={styles.controlLabel}>Snap to Step:</Text>
            <Switch value={snapToStep} onValueChange={setSnapToStep} />
          </View>
        </View>

        {/* Basic SliderInput */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic SliderInput</Text>
          <SliderInput
            value={basicValue}
            onValueChange={setBasicValue}
            onGestureStart={handleGestureStart}
            onGestureEnd={handleGestureEnd}
            label="Basic Slider"
            helperText="A simple slider from 0 to 100"
            disabled={disabled}
            showValue={showValue}
            showSteps={showSteps}
            allowDecimal={allowDecimal}
            snapToStep={snapToStep}
            testID="basic-slider"
          />
        </View>

        {/* Size Variants */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Size Variants</Text>
          {sizes.map((size) => (
            <View key={size} style={styles.variantContainer}>
              <Text style={styles.variantLabel}>{size.charAt(0).toUpperCase() + size.slice(1)}</Text>
              <SliderInput
                size={size}
                value={50}
                label={`${size.charAt(0).toUpperCase() + size.slice(1)} Slider`}
                helperText={`This is a ${size} slider`}
                disabled={disabled}
                showValue={showValue}
                showSteps={showSteps}
                allowDecimal={allowDecimal}
                snapToStep={snapToStep}
                testID={`${size}-slider`}
              />
            </View>
          ))}
        </View>

        {/* Variant Styles */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Variant Styles</Text>
          {variants.map((variant) => (
            <View key={variant} style={styles.variantContainer}>
              <Text style={styles.variantLabel}>{variant.charAt(0).toUpperCase() + variant.slice(1)}</Text>
              <SliderInput
                variant={variant}
                value={60}
                label={`${variant.charAt(0).toUpperCase() + variant.slice(1)} Slider`}
                helperText={`This is a ${variant} slider`}
                disabled={disabled}
                showValue={showValue}
                showSteps={showSteps}
                allowDecimal={allowDecimal}
                snapToStep={snapToStep}
                testID={`${variant}-slider`}
              />
            </View>
          ))}
        </View>

        {/* Validation States */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Validation States</Text>
          {validationStates.map((state) => (
            <View key={state} style={styles.variantContainer}>
              <Text style={styles.variantLabel}>{state.charAt(0).toUpperCase() + state.slice(1)}</Text>
              <SliderInput
                validationState={state}
                value={50}
                label={`${state.charAt(0).toUpperCase() + state.slice(1)} Slider`}
                helperText={state === 'default' ? 'This is a default slider' : undefined}
                errorMessage={state === 'error' ? 'Value is too high' : undefined}
                successMessage={state === 'success' ? 'Perfect value!' : undefined}
                warningMessage={state === 'warning' ? 'Consider adjusting the value' : undefined}
                disabled={disabled}
                showValue={showValue}
                showSteps={showSteps}
                allowDecimal={allowDecimal}
                snapToStep={snapToStep}
                testID={`${state}-slider`}
              />
            </View>
          ))}
        </View>

        {/* Practical Examples */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Practical Examples</Text>
          
          {/* Volume Control */}
          <View style={styles.variantContainer}>
            <Text style={styles.variantLabel}>Volume Control</Text>
            <SliderInput
              value={volumeValue}
              onValueChange={setVolumeValue}
              onGestureStart={handleGestureStart}
              onGestureEnd={handleGestureEnd}
              min={0}
              max={100}
              step={5}
              label="Volume"
              unit="%"
              helperText="Adjust system volume"
              activeTrackColor="#2E86DE"
              thumbColor="#2E86DE"
              disabled={disabled}
              showValue={showValue}
              showSteps={showSteps}
              allowDecimal={allowDecimal}
              snapToStep={snapToStep}
              testID="volume-slider"
            />
          </View>

          {/* Temperature Control */}
          <View style={styles.variantContainer}>
            <Text style={styles.variantLabel}>Temperature Control</Text>
            <SliderInput
              value={temperatureValue}
              onValueChange={setTemperatureValue}
              onGestureStart={handleGestureStart}
              onGestureEnd={handleGestureEnd}
              min={15}
              max={30}
              step={0.5}
              label="Temperature"
              valueFormatter={formatTemperature}
              helperText="Set room temperature"
              activeTrackColor="#FF6B6B"
              thumbColor="#FF6B6B"
              allowDecimal={true}
              disabled={disabled}
              showValue={showValue}
              showSteps={showSteps}
              snapToStep={snapToStep}
              testID="temperature-slider"
            />
          </View>

          {/* Brightness Control */}
          <View style={styles.variantContainer}>
            <Text style={styles.variantLabel}>Brightness Control</Text>
            <SliderInput
              value={brightnessValue}
              onValueChange={setBrightnessValue}
              onGestureStart={handleGestureStart}
              onGestureEnd={handleGestureEnd}
              min={0}
              max={100}
              step={1}
              label="Brightness"
              unit="%"
              helperText="Adjust screen brightness"
              size="large"
              activeTrackColor="#FFA500"
              thumbColor="#FFA500"
              trackColor="rgba(255,165,0,0.1)"
              disabled={disabled}
              showValue={showValue}
              showSteps={showSteps}
              allowDecimal={allowDecimal}
              snapToStep={snapToStep}
              testID="brightness-slider"
            />
          </View>

          {/* Price Range */}
          <View style={styles.variantContainer}>
            <Text style={styles.variantLabel}>Price Range</Text>
            <SliderInput
              value={priceValue}
              onValueChange={setPriceValue}
              onGestureStart={handleGestureStart}
              onGestureEnd={handleGestureEnd}
              min={0}
              max={1000}
              step={50}
              label="Price Range"
              valueFormatter={formatPrice}
              helperText="Set maximum price"
              activeTrackColor="#2EDD75"
              thumbColor="#2EDD75"
              disabled={disabled}
              showValue={showValue}
              showSteps={showSteps}
              allowDecimal={allowDecimal}
              snapToStep={snapToStep}
              testID="price-slider"
            />
          </View>

          {/* Star Rating */}
          <View style={styles.variantContainer}>
            <Text style={styles.variantLabel}>Star Rating</Text>
            <SliderInput
              value={customValue}
              onValueChange={setCustomValue}
              onGestureStart={handleGestureStart}
              onGestureEnd={handleGestureEnd}
              min={1}
              max={5}
              step={1}
              label="Rating"
              valueFormatter={formatRating}
              helperText="Rate this product"
              variant="stepped"
              size="large"
              activeTrackColor="#FFD700"
              thumbColor="#FFD700"
              trackColor="rgba(255,215,0,0.1)"
              showSteps={true}
              steps={[
                { value: 1, label: '1★' },
                { value: 2, label: '2★' },
                { value: 3, label: '3★' },
                { value: 4, label: '4★' },
                { value: 5, label: '5★' },
              ]}
              disabled={disabled}
              showValue={showValue}
              allowDecimal={allowDecimal}
              snapToStep={snapToStep}
              testID="rating-slider"
            />
          </View>
        </View>

        {/* Custom Styling */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Custom Styling</Text>
          <SliderInput
            value={75}
            label="Custom Styled Slider"
            helperText="This slider has custom styling"
            size="large"
            variant="gradient"
            style={styles.customSlider}
            containerStyle={styles.customContainer}
            labelStyle={styles.customLabel}
            valueStyle={styles.customValue}
            helperTextStyle={styles.customHelperText}
            activeTrackColor="#E91E63"
            thumbColor="#E91E63"
            trackColor="rgba(233,30,99,0.1)"
            disabled={disabled}
            showValue={showValue}
            showSteps={showSteps}
            allowDecimal={allowDecimal}
            snapToStep={snapToStep}
            testID="custom-styled-slider"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0E27',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  variantContainer: {
    marginBottom: 16,
  },
  variantLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  controlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(22,33,62,0.3)',
    borderRadius: 8,
    marginBottom: 8,
  },
  controlLabel: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  customContainer: {
    backgroundColor: 'rgba(22,33,62,0.5)',
    borderRadius: 12,
    padding: 16,
  },
  customSlider: {
    borderRadius: 12,
  },
  customLabel: {
    color: '#E91E63',
    fontWeight: 'bold',
  },
  customValue: {
    color: '#E91E63',
    fontWeight: 'bold',
  },
  customHelperText: {
    color: '#E91E63',
    fontStyle: 'italic',
  },
});

export default SliderInputTest;
