import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Alert,
  TouchableOpacity,
} from 'react-native';
import { RadioButton, RadioButtonProps, RadioButtonSize } from '../RadioButton';

/**
 * Comprehensive test component for RadioButton
 * Tests: basic functionality, size variants, states, animations, custom styling
 */
export const RadioButtonTest: React.FC = () => {
  const [basicValue, setBasicValue] = useState<string | number>('option1');
  const [sizeValue, setSizeValue] = useState<string | number>('medium');
  const [colorValue, setColorValue] = useState<string | number>('blue');
  const [positionValue, setPositionValue] = useState<string | number>('right');
  const [customValue, setCustomValue] = useState<string | number>('custom1');

  const handleValueChange = (value: string | number, groupName: string) => {
    console.log(`${groupName} changed to:`, value);
    Alert.alert('RadioButton Changed', `${groupName} selected: ${value}`);
  };

  const handlePress = (value: string | number) => {
    console.log(`RadioButton pressed:`, value);
  };

  const customRadioRender = (props: any) => (
    <View style={[props.style, { 
      backgroundColor: props.selected ? 'rgba(255, 215, 0, 0.2)' : 'rgba(255, 255, 255, 0.05)',
      borderColor: props.selected ? '#FFD700' : 'rgba(255, 255, 255, 0.3)',
      borderWidth: 2,
    }]}>
      <View style={{
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: props.selected ? '#FFD700' : 'transparent',
        transform: [{ scale: props.selected ? 1 : 0 }],
      }} />
    </View>
  );

  const customDotRender = (props: any) => (
    <View style={[props.style, {
      backgroundColor: '#6C5CE7',
      transform: [{ scale: props.animatedStyle.scale }],
      opacity: props.animatedStyle.opacity,
    }]} />
  );

  const customLabelRender = (props: any) => (
    <Text style={[props.style, {
      color: props.selected ? '#FFD700' : '#FFFFFF',
      fontWeight: props.selected ? 'bold' : 'normal',
    }]}>
      {props.label}
    </Text>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>RadioButton Component Tests</Text>
      
      {/* Basic RadioButton Group */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic RadioButton Group</Text>
        <View style={styles.radioGroup}>
          <RadioButton
            value="option1"
            selectedValue={basicValue}
            onValueChange={setBasicValue}
            label="Option 1"
            onPress={() => handlePress('option1')}
            testID="basic-option1"
          />
          <RadioButton
            value="option2"
            selectedValue={basicValue}
            onValueChange={setBasicValue}
            label="Option 2"
            onPress={() => handlePress('option2')}
            testID="basic-option2"
          />
          <RadioButton
            value="option3"
            selectedValue={basicValue}
            onValueChange={setBasicValue}
            label="Option 3"
            onPress={() => handlePress('option3')}
            testID="basic-option3"
          />
        </View>
        <Text style={styles.stateText}>
          Selected: {basicValue}
        </Text>
      </View>

      {/* Size Variants */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Size Variants</Text>
        <View style={styles.radioGroup}>
          {(['small', 'medium', 'large'] as RadioButtonSize[]).map((size) => (
            <RadioButton
              key={size}
              value={size}
              selectedValue={sizeValue}
              onValueChange={(value) => {
                setSizeValue(value);
                handleValueChange(value, 'Size');
              }}
              size={size}
              label={`${size.charAt(0).toUpperCase() + size.slice(1)} Size`}
              testID={`size-${size}`}
            />
          ))}
        </View>
        <Text style={styles.stateText}>
          Selected Size: {sizeValue}
        </Text>
      </View>

      {/* State Variants */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>State Variants</Text>
        <View style={styles.radioGroup}>
          <RadioButton
            value="normal"
            selectedValue="normal"
            label="Normal (Selected)"
            testID="state-normal"
          />
          <RadioButton
            value="unselected"
            selectedValue="normal"
            label="Normal (Unselected)"
            testID="state-unselected"
          />
          <RadioButton
            value="disabled-selected"
            selectedValue="disabled-selected"
            disabled
            label="Disabled (Selected)"
            testID="state-disabled-selected"
          />
          <RadioButton
            value="disabled-unselected"
            selectedValue="disabled-selected"
            disabled
            label="Disabled (Unselected)"
            testID="state-disabled-unselected"
          />
          <RadioButton
            value="loading"
            selectedValue="loading"
            loading
            label="Loading State"
            testID="state-loading"
          />
        </View>
      </View>

      {/* Label Positions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Label Positions</Text>
        <View style={styles.radioGroup}>
          <RadioButton
            value="right"
            selectedValue={positionValue}
            onValueChange={setPositionValue}
            label="Label on Right"
            labelPosition="right"
            testID="position-right"
          />
          <RadioButton
            value="left"
            selectedValue={positionValue}
            onValueChange={setPositionValue}
            label="Label on Left"
            labelPosition="left"
            testID="position-left"
          />
        </View>
        <Text style={styles.stateText}>
          Selected Position: {positionValue}
        </Text>
      </View>

      {/* Custom Colors */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Colors</Text>
        <View style={styles.radioGroup}>
          <RadioButton
            value="blue"
            selectedValue={colorValue}
            onValueChange={setColorValue}
            label="Corporate Blue"
            borderColorUnselected="rgba(255, 255, 255, 0.3)"
            borderColorSelected="#2E86DE"
            dotColor="#2E86DE"
            testID="color-blue"
          />
          <RadioButton
            value="gold"
            selectedValue={colorValue}
            onValueChange={setColorValue}
            label="Luxury Gold"
            borderColorUnselected="rgba(255, 255, 255, 0.3)"
            borderColorSelected="#FFD700"
            dotColor="#FFD700"
            testID="color-gold"
          />
          <RadioButton
            value="purple"
            selectedValue={colorValue}
            onValueChange={setColorValue}
            label="Royal Purple"
            borderColorUnselected="rgba(255, 255, 255, 0.3)"
            borderColorSelected="#6C5CE7"
            dotColor="#6C5CE7"
            testID="color-purple"
          />
          <RadioButton
            value="green"
            selectedValue={colorValue}
            onValueChange={setColorValue}
            label="Success Green"
            borderColorUnselected="rgba(255, 255, 255, 0.3)"
            borderColorSelected="#51CF66"
            dotColor="#51CF66"
            testID="color-green"
          />
        </View>
        <Text style={styles.stateText}>
          Selected Color: {colorValue}
        </Text>
      </View>

      {/* Animation Variants */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Animation Variants</Text>
        <View style={styles.radioGroup}>
          <RadioButton
            value="fast"
            selectedValue="fast"
            label="Fast Animation (100ms)"
            animationDuration={100}
            testID="animation-fast"
          />
          <RadioButton
            value="normal"
            selectedValue="normal"
            label="Normal Animation (200ms)"
            animationDuration={200}
            testID="animation-normal"
          />
          <RadioButton
            value="slow"
            selectedValue="slow"
            label="Slow Animation (500ms)"
            animationDuration={500}
            testID="animation-slow"
          />
          <RadioButton
            value="no-glow"
            selectedValue="no-glow"
            label="No Glow Effect"
            glowEffect={false}
            testID="animation-no-glow"
          />
        </View>
      </View>

      {/* Custom Styling */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Styling</Text>
        <View style={styles.radioGroup}>
          <RadioButton
            value="custom1"
            selectedValue={customValue}
            onValueChange={setCustomValue}
            label="Custom Container"
            containerStyle={styles.customContainer}
            testID="custom-container"
          />
          <RadioButton
            value="custom2"
            selectedValue={customValue}
            onValueChange={setCustomValue}
            label="Custom Radio"
            radioStyle={styles.customRadio}
            testID="custom-radio"
          />
          <RadioButton
            value="custom3"
            selectedValue={customValue}
            onValueChange={setCustomValue}
            label="Custom Label"
            labelStyle={styles.customLabel}
            testID="custom-label"
          />
        </View>
        <Text style={styles.stateText}>
          Selected Custom: {customValue}
        </Text>
      </View>

      {/* Custom Render Functions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Render Functions</Text>
        <View style={styles.radioGroup}>
          <RadioButton
            value="render1"
            selectedValue="render1"
            label="Custom Radio Render"
            renderRadio={customRadioRender}
            testID="render-radio"
          />
          <RadioButton
            value="render2"
            selectedValue="render2"
            label="Custom Dot Render"
            renderDot={customDotRender}
            testID="render-dot"
          />
          <RadioButton
            value="render3"
            selectedValue="render3"
            label="Custom Label Render"
            renderLabel={customLabelRender}
            testID="render-label"
          />
        </View>
      </View>

      {/* Accessibility */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Accessibility</Text>
        <View style={styles.radioGroup}>
          <RadioButton
            value="accessibility1"
            selectedValue="accessibility1"
            label="Accessibility Example"
            accessibilityLabel="Select accessibility option"
            accessibilityHint="Double tap to select this option"
            testID="accessibility-example"
          />
          <RadioButton
            value="accessibility2"
            selectedValue="accessibility1"
            label="Another Option"
            accessibilityLabel="Select another option"
            accessibilityHint="Double tap to select another option"
            testID="accessibility-another"
          />
        </View>
      </View>

      {/* Without Labels */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Without Labels</Text>
        <View style={styles.radioGroup}>
          <View style={styles.radioRow}>
            <RadioButton
              value="no-label1"
              selectedValue="no-label1"
              accessibilityLabel="First option without label"
              testID="no-label1"
            />
            <Text style={styles.externalLabel}>External Label 1</Text>
          </View>
          <View style={styles.radioRow}>
            <RadioButton
              value="no-label2"
              selectedValue="no-label1"
              accessibilityLabel="Second option without label"
              testID="no-label2"
            />
            <Text style={styles.externalLabel}>External Label 2</Text>
          </View>
        </View>
      </View>

      {/* Interactive Example */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Interactive Example</Text>
        <View style={styles.radioGroup}>
          <RadioButton
            value="interactive1"
            selectedValue="interactive1"
            label="Click to toggle others"
            onPress={() => Alert.alert('Interactive', 'This radio button has custom press behavior')}
            testID="interactive1"
          />
          <RadioButton
            value="interactive2"
            selectedValue="interactive1"
            label="Another interactive option"
            onPress={() => Alert.alert('Interactive', 'Second interactive option pressed')}
            testID="interactive2"
          />
        </View>
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
    fontFamily: 'Futura PT',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2E86DE',
    marginBottom: 16,
    fontFamily: 'Futura PT',
  },
  radioGroup: {
    gap: 8,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  stateText: {
    fontSize: 14,
    color: '#B8B8C0',
    marginTop: 12,
    fontFamily: 'Inter',
  },
  externalLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Inter',
  },
  customContainer: {
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    borderRadius: 8,
    padding: 8,
  },
  customRadio: {
    borderWidth: 3,
    borderColor: '#2E86DE',
    shadowColor: '#2E86DE',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.3,
  },
  customLabel: {
    color: '#FFD700',
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'Futura PT',
  },
});

export default RadioButtonTest;
