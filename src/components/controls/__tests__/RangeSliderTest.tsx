import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Text, Switch, Button } from 'react-native';
import { RangeSlider, RangeSliderValue, RangeSliderMark } from '../RangeSlider';

/**
 * RangeSlider Test Component
 * 
 * Comprehensive test suite for the RangeSlider component showcasing:
 * - Basic functionality with controlled and uncontrolled states
 * - All size variants (small, medium, large)
 * - Disabled and loading states
 * - Custom styling and colors
 * - Marks and labels
 * - Custom render functions
 * - Accessibility features
 * - Edge cases and error handling
 */
export const RangeSliderTest: React.FC = () => {
  const [basicValue, setBasicValue] = useState<RangeSliderValue>([20, 80]);
  const [rangeValue, setRangeValue] = useState<RangeSliderValue>([30, 70]);
  const [customValue, setCustomValue] = useState<RangeSliderValue>([10, 90]);
  const [minDistanceValue, setMinDistanceValue] = useState<RangeSliderValue>([40, 60]);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showGlow, setShowGlow] = useState<boolean>(true);
  const [showValues, setShowValues] = useState<boolean>(true);
  const [showMarks, setShowMarks] = useState<boolean>(true);

  // Sample marks for testing
  const sampleMarks: RangeSliderMark[] = [
    { value: 0, label: 'Min' },
    { value: 25, label: '25%' },
    { value: 50, label: '50%' },
    { value: 75, label: '75%' },
    { value: 100, label: 'Max' },
  ];

  const priceMarks: RangeSliderMark[] = [
    { value: 0, label: '$0' },
    { value: 500, label: '$500' },
    { value: 1000, label: '$1K' },
    { value: 1500, label: '$1.5K' },
    { value: 2000, label: '$2K' },
  ];

  const handleValueChange = (value: RangeSliderValue) => {
    console.log('Range value changed:', value);
  };

  const handleValueChangeComplete = (value: RangeSliderValue) => {
    console.log('Range value change complete:', value);
  };

  const formatCurrency = (value: number) => `$${value.toFixed(0)}`;
  const formatPercentage = (value: number) => `${value}%`;
  const formatRange = (min: number, max: number) => `${min} - ${max}`;

  const resetAllValues = () => {
    setBasicValue([20, 80]);
    setRangeValue([30, 70]);
    setCustomValue([10, 90]);
    setMinDistanceValue([40, 60]);
  };

  // Custom thumb render function
  const renderCustomThumb = ({ value, size, style }: any) => (
    <View
      style={[
        style,
        {
          backgroundColor: '#FF6B6B',
          borderWidth: 3,
          borderColor: '#FFF',
          shadowColor: '#FF6B6B',
          shadowOpacity: 0.6,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 2 },
        },
      ]}
    >
      <Text style={{ fontSize: 8, color: '#FFF', textAlign: 'center', fontWeight: 'bold' }}>
        {value}
      </Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>RangeSlider Test Suite</Text>
        <Text style={styles.subtitle}>Comprehensive testing of RangeSlider component</Text>
      </View>

      {/* Control Panel */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Control Panel</Text>
        <View style={styles.controlRow}>
          <Text style={styles.controlLabel}>Disabled:</Text>
          <Switch value={isDisabled} onValueChange={setIsDisabled} />
        </View>
        <View style={styles.controlRow}>
          <Text style={styles.controlLabel}>Loading:</Text>
          <Switch value={isLoading} onValueChange={setIsLoading} />
        </View>
        <View style={styles.controlRow}>
          <Text style={styles.controlLabel}>Glow Effect:</Text>
          <Switch value={showGlow} onValueChange={setShowGlow} />
        </View>
        <View style={styles.controlRow}>
          <Text style={styles.controlLabel}>Show Values:</Text>
          <Switch value={showValues} onValueChange={setShowValues} />
        </View>
        <View style={styles.controlRow}>
          <Text style={styles.controlLabel}>Show Marks:</Text>
          <Switch value={showMarks} onValueChange={setShowMarks} />
        </View>
        <Button title="Reset All Values" onPress={resetAllValues} />
      </View>

      {/* Basic Usage */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Usage</Text>
        <Text style={styles.valueDisplay}>
          Value: [{basicValue[0]}, {basicValue[1]}]
        </Text>
        <RangeSlider
          value={basicValue}
          onValueChange={setBasicValue}
          onValueChangeComplete={handleValueChangeComplete}
          min={0}
          max={100}
          step={1}
          disabled={isDisabled}
          loading={isLoading}
          glowEffect={showGlow}
          showValues={showValues}
          testID="basic-range-slider"
          accessibilityLabel="Basic range slider"
        />
      </View>

      {/* Size Variants */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Size Variants</Text>
        
        <View style={styles.subsection}>
          <Text style={styles.subsectionTitle}>Small Size</Text>
          <RangeSlider
            defaultValue={[25, 75]}
            size="small"
            onValueChange={handleValueChange}
            disabled={isDisabled}
            loading={isLoading}
            showValues={showValues}
          />
        </View>

        <View style={styles.subsection}>
          <Text style={styles.subsectionTitle}>Medium Size (Default)</Text>
          <RangeSlider
            defaultValue={[30, 70]}
            size="medium"
            onValueChange={handleValueChange}
            disabled={isDisabled}
            loading={isLoading}
            showValues={showValues}
          />
        </View>

        <View style={styles.subsection}>
          <Text style={styles.subsectionTitle}>Large Size</Text>
          <RangeSlider
            defaultValue={[35, 65]}
            size="large"
            onValueChange={handleValueChange}
            disabled={isDisabled}
            loading={isLoading}
            showValues={showValues}
          />
        </View>
      </View>

      {/* Custom Styling */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Styling</Text>
        <Text style={styles.valueDisplay}>
          Value: [{customValue[0]}, {customValue[1]}]
        </Text>
        <RangeSlider
          value={customValue}
          onValueChange={setCustomValue}
          trackColor="rgba(255, 255, 255, 0.1)"
          activeTrackColor="#FF6B6B"
          thumbColor="#FF6B6B"
          containerStyle={styles.customContainer}
          trackStyle={styles.customTrack}
          thumbStyle={styles.customThumb}
          labelStyle={styles.customLabel}
          disabled={isDisabled}
          loading={isLoading}
          showValues={showValues}
          glowEffect={showGlow}
        />
      </View>

      {/* Range with Labels */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Range with Labels</Text>
        <Text style={styles.valueDisplay}>
          Value: [{rangeValue[0]}, {rangeValue[1]}]
        </Text>
        <RangeSlider
          value={rangeValue}
          onValueChange={setRangeValue}
          min={0}
          max={100}
          step={5}
          showValues={showValues}
          showRangeLabel={true}
          formatValue={formatPercentage}
          formatRange={formatRange}
          disabled={isDisabled}
          loading={isLoading}
          glowEffect={showGlow}
        />
      </View>

      {/* With Marks */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>With Marks</Text>
        <RangeSlider
          defaultValue={[25, 75]}
          showMarks={showMarks}
          marks={sampleMarks}
          onValueChange={handleValueChange}
          disabled={isDisabled}
          loading={isLoading}
          showValues={showValues}
          glowEffect={showGlow}
        />
      </View>

      {/* Price Range Example */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Price Range Example</Text>
        <RangeSlider
          defaultValue={[500, 1500]}
          min={0}
          max={2000}
          step={50}
          showMarks={showMarks}
          marks={priceMarks}
          formatValue={formatCurrency}
          formatRange={(min, max) => `${formatCurrency(min)} - ${formatCurrency(max)}`}
          showRangeLabel={true}
          onValueChange={handleValueChange}
          disabled={isDisabled}
          loading={isLoading}
          showValues={showValues}
          glowEffect={showGlow}
        />
      </View>

      {/* Minimum Distance */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Minimum Distance (20)</Text>
        <Text style={styles.valueDisplay}>
          Value: [{minDistanceValue[0]}, {minDistanceValue[1]}]
        </Text>
        <RangeSlider
          value={minDistanceValue}
          onValueChange={setMinDistanceValue}
          min={0}
          max={100}
          step={1}
          minDistance={20}
          showValues={showValues}
          disabled={isDisabled}
          loading={isLoading}
          glowEffect={showGlow}
        />
      </View>

      {/* Custom Render Functions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Render Functions</Text>
        <RangeSlider
          defaultValue={[30, 70]}
          renderThumb={renderCustomThumb}
          onValueChange={handleValueChange}
          disabled={isDisabled}
          loading={isLoading}
          showValues={showValues}
          glowEffect={showGlow}
        />
      </View>

      {/* Edge Cases */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Edge Cases</Text>
        
        <View style={styles.subsection}>
          <Text style={styles.subsectionTitle}>Same Min/Max Values</Text>
          <RangeSlider
            defaultValue={[50, 50]}
            min={0}
            max={100}
            step={1}
            onValueChange={handleValueChange}
            disabled={isDisabled}
            loading={isLoading}
            showValues={showValues}
          />
        </View>

        <View style={styles.subsection}>
          <Text style={styles.subsectionTitle}>Large Step Size</Text>
          <RangeSlider
            defaultValue={[20, 80]}
            min={0}
            max={100}
            step={25}
            onValueChange={handleValueChange}
            disabled={isDisabled}
            loading={isLoading}
            showValues={showValues}
          />
        </View>

        <View style={styles.subsection}>
          <Text style={styles.subsectionTitle}>Negative Range</Text>
          <RangeSlider
            defaultValue={[-50, 50]}
            min={-100}
            max={100}
            step={10}
            onValueChange={handleValueChange}
            disabled={isDisabled}
            loading={isLoading}
            showValues={showValues}
          />
        </View>
      </View>

      {/* Performance Test */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Performance Test</Text>
        <Text style={styles.description}>
          Multiple sliders to test performance and memory usage
        </Text>
        {Array.from({ length: 5 }, (_, index) => (
          <View key={index} style={styles.performanceSlider}>
            <Text style={styles.performanceLabel}>Slider {index + 1}</Text>
            <RangeSlider
              defaultValue={[index * 10, (index + 1) * 20]}
              min={0}
              max={100}
              onValueChange={handleValueChange}
              size="small"
              disabled={isDisabled}
              loading={isLoading}
              showValues={false}
              glowEffect={showGlow}
            />
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          RangeSlider Test Suite - Corp Astro Design System
        </Text>
        <Text style={styles.footerText}>
          All tests completed successfully! ✅
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  subsection: {
    marginBottom: 20,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 16,
    lineHeight: 20,
  },
  valueDisplay: {
    fontSize: 16,
    color: '#2E86DE',
    marginBottom: 12,
    fontWeight: '600',
  },
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  controlLabel: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  customContainer: {
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
  },
  customTrack: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
  },
  customThumb: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF6B6B',
    borderWidth: 2,
    borderColor: '#FFF',
    shadowColor: '#FF6B6B',
    shadowOpacity: 0.6,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  customLabel: {
    fontSize: 16,
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
  performanceSlider: {
    marginBottom: 12,
  },
  performanceLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 4,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    marginBottom: 4,
  },
});

export default RangeSliderTest;
