import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Text } from 'react-native';
import SegmentedControl, { SegmentedControlOption } from '../../components/controls/SegmentedControl'; // Adjust the import path as needed

const SegmentControls: React.FC = () => {
  // State to manage the selected value
  const [selectedValue, setSelectedValue] = useState<string | number>('1');

  // Define options for the SegmentedControl
  const options: SegmentedControlOption[] = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ];

  // Handle value change
  const handleValueChange = (value: string | number) => {
    setSelectedValue(value);
    console.log('Selected value:', value); // For debugging
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Segmented Control Example</Text>
        <SegmentedControl
          options={options}
          value={selectedValue}
          onValueChange={handleValueChange}
          size="medium"
          variant="default"
          fullWidth={true}
          animationDuration={200}
          testID="segmented-control"
          accessibilityLabel="Select an option"
          accessibilityHint="Choose one of the available options"
        />
        <Text style={styles.selectedText}>
          Selected: {options.find(option => option.value === selectedValue)?.label || 'None'}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#16213E',
  },
  selectedText: {
    fontSize: 16,
    marginTop: 20,
    color: '#16213E',
  },
});

export default SegmentControls;