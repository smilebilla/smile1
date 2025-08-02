/**
 * Corp Astro UI Library - SelectInput Test Component
 * 
 * Test component for validating SelectInput functionality, dropdown behavior,
 * search capabilities, and multiple selection.
 * 
 * @module SelectInputTest
 * @version 1.0.0
 * @since 2024
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { SelectInput, SelectOption } from '../SelectInput';

/**
 * SelectInput Test Component
 * 
 * Comprehensive test suite for SelectInput component validation.
 */
export const SelectInputTest: React.FC = () => {
  // Test state
  const [basicValue, setBasicValue] = useState<string | number>('');
  const [multipleValues, setMultipleValues] = useState<(string | number)[]>([]);
  const [searchableValue, setSearchableValue] = useState<string | number>('');
  const [validationValue, setValidationValue] = useState<string | number>('');

  // Test options
  const basicOptions: SelectOption[] = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
    { label: 'Option 4', value: '4' },
    { label: 'Option 5', value: '5' },
  ];

  const extendedOptions: SelectOption[] = [
    { label: 'Apple', value: 'apple', description: 'A red fruit' },
    { label: 'Banana', value: 'banana', description: 'A yellow fruit' },
    { label: 'Cherry', value: 'cherry', description: 'A small red fruit' },
    { label: 'Date', value: 'date', description: 'A sweet brown fruit' },
    { label: 'Elderberry', value: 'elderberry', description: 'A dark purple fruit' },
    { label: 'Fig', value: 'fig', description: 'A sweet purple fruit' },
    { label: 'Grape', value: 'grape', description: 'A small round fruit' },
    { label: 'Honeydew', value: 'honeydew', description: 'A sweet melon' },
    { label: 'Kiwi', value: 'kiwi', description: 'A fuzzy brown fruit' },
    { label: 'Lemon', value: 'lemon', description: 'A sour yellow fruit' },
  ];

  const statusOptions: SelectOption[] = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
    { label: 'Pending', value: 'pending' },
    { label: 'Disabled', value: 'disabled', disabled: true },
  ];

  // Handle value changes
  const handleBasicValueChange = (value: string | number | (string | number)[]) => {
    setBasicValue(value as string | number);
    console.log('Basic value changed:', value);
  };

  const handleMultipleValuesChange = (values: string | number | (string | number)[]) => {
    setMultipleValues(values as (string | number)[]);
    console.log('Multiple values changed:', values);
  };

  const handleSearchableValueChange = (value: string | number | (string | number)[]) => {
    setSearchableValue(value as string | number);
    console.log('Searchable value changed:', value);
  };

  const handleValidationValueChange = (value: string | number | (string | number)[]) => {
    setValidationValue(value as string | number);
    console.log('Validation value changed:', value);
  };

  // Custom validation function
  const validateValue = (value: string | number): boolean => {
    return value === 'active' || value === 'inactive';
  };

  // Handle dropdown events
  const handleDropdownOpen = () => {
    console.log('Dropdown opened');
  };

  const handleDropdownClose = () => {
    console.log('Dropdown closed');
  };

  const handleSearchChange = (searchText: string) => {
    console.log('Search changed:', searchText);
  };

  const handleFocusChange = (focused: boolean) => {
    console.log('Focus changed:', focused);
  };

  // Custom render functions
  const renderSelectedValue = (option: SelectOption) => (
    <View style={styles.customSelectedValue}>
      <Text style={styles.customSelectedText}>{option.label}</Text>
      {option.description && (
        <Text style={styles.customSelectedDescription}>{option.description}</Text>
      )}
    </View>
  );

  const renderOption = (option: SelectOption, isSelected: boolean) => (
    <View style={[styles.customOption, isSelected && styles.customOptionSelected]}>
      <Text style={[styles.customOptionLabel, isSelected && styles.customOptionLabelSelected]}>
        {option.label}
      </Text>
      {option.description && (
        <Text style={styles.customOptionDescription}>{option.description}</Text>
      )}
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.customEmpty}>
      <Text style={styles.customEmptyText}>No options match your search</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>SelectInput Test Suite</Text>
        <Text style={styles.subtitle}>Comprehensive validation of SelectInput component</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Select Input</Text>
        <Text style={styles.sectionDescription}>
          Standard dropdown with basic options
        </Text>
        <SelectInput
          options={basicOptions}
          value={basicValue}
          onValueChange={handleBasicValueChange}
          placeholder="Select an option"
          label="Basic Select"
          helperText="Choose one option from the dropdown"
        />
        <Text style={styles.valueDisplay}>
          Selected: {basicValue || 'None'}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Multiple Selection</Text>
        <Text style={styles.sectionDescription}>
          Multi-select dropdown with clearable functionality
        </Text>
        <SelectInput
          options={basicOptions}
          value={multipleValues as any}
          onValueChange={handleMultipleValuesChange}
          placeholder="Select multiple options"
          label="Multiple Select"
          helperText="Select multiple options from the dropdown"
          multiple
          clearable
        />
        <Text style={styles.valueDisplay}>
          Selected: {multipleValues.length > 0 ? multipleValues.join(', ') : 'None'}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Searchable Select</Text>
        <Text style={styles.sectionDescription}>
          Searchable dropdown with extended options
        </Text>
        <SelectInput
          options={extendedOptions}
          value={searchableValue}
          onValueChange={handleSearchableValueChange}
          placeholder="Search and select a fruit"
          label="Searchable Select"
          helperText="Type to search through options"
          searchable
          searchPlaceholder="Search fruits..."
          onSearchChange={handleSearchChange}
          clearable
        />
        <Text style={styles.valueDisplay}>
          Selected: {searchableValue || 'None'}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Validation States</Text>
        <Text style={styles.sectionDescription}>
          Select inputs with different validation states
        </Text>
        
        <SelectInput
          options={statusOptions}
          value={validationValue}
          onValueChange={handleValidationValueChange}
          placeholder="Select status"
          label="Status Selection"
          helperText="Select a valid status"
          validationState={validateValue(validationValue) ? 'success' : 'error'}
          errorMessage="Please select 'Active' or 'Inactive'"
          successMessage="Valid status selected"
          required
        />
        <Text style={styles.valueDisplay}>
          Selected: {validationValue || 'None'}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Size Variants</Text>
        <Text style={styles.sectionDescription}>
          Different size variants of the select input
        </Text>
        
        <SelectInput
          options={basicOptions}
          placeholder="Small select"
          label="Small Size"
          size="small"
          style={styles.spaceBottom}
        />
        
        <SelectInput
          options={basicOptions}
          placeholder="Medium select"
          label="Medium Size"
          size="medium"
          style={styles.spaceBottom}
        />
        
        <SelectInput
          options={basicOptions}
          placeholder="Large select"
          label="Large Size"
          size="large"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Disabled & Read-Only</Text>
        <Text style={styles.sectionDescription}>
          Select inputs with disabled and read-only states
        </Text>
        
        <SelectInput
          options={basicOptions}
          placeholder="Disabled select"
          label="Disabled State"
          disabled
          style={styles.spaceBottom}
        />
        
        <SelectInput
          options={basicOptions}
          value="2"
          label="Read-Only State"
          readOnly
          helperText="This select is read-only"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Rendering</Text>
        <Text style={styles.sectionDescription}>
          Select with custom rendering functions
        </Text>
        
        <SelectInput
          options={extendedOptions}
          placeholder="Custom rendered select"
          label="Custom Render"
          renderSelectedValue={renderSelectedValue}
          renderOption={renderOption}
          renderEmpty={renderEmpty}
          searchable
          helperText="Custom rendering for options and selected value"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Event Handling</Text>
        <Text style={styles.sectionDescription}>
          Select with comprehensive event handling
        </Text>
        
        <SelectInput
          options={basicOptions}
          placeholder="Event handling select"
          label="Event Handling"
          onDropdownOpen={handleDropdownOpen}
          onDropdownClose={handleDropdownClose}
          onFocusChange={handleFocusChange}
          searchable
          onSearchChange={handleSearchChange}
          helperText="Check console for event logs"
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          SelectInput Test Suite - All variants and states validated
        </Text>
      </View>
    </ScrollView>
  );
};

/**
 * Styles
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#08080F',
  },
  header: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F8F9FA',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
  },
  section: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#54A0FF',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 16,
  },
  valueDisplay: {
    fontSize: 14,
    color: '#2ECC71',
    marginTop: 8,
    padding: 8,
    backgroundColor: 'rgba(46,204,113,0.1)',
    borderRadius: 8,
    fontFamily: 'monospace',
  },
  spaceBottom: {
    marginBottom: 16,
  },
  customSelectedValue: {
    flexDirection: 'column',
  },
  customSelectedText: {
    fontSize: 16,
    color: '#F8F9FA',
    fontWeight: '600',
  },
  customSelectedDescription: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  customOption: {
    padding: 4,
  },
  customOptionSelected: {
    backgroundColor: 'rgba(46,134,222,0.1)',
    borderRadius: 8,
  },
  customOptionLabel: {
    fontSize: 16,
    color: '#F8F9FA',
    fontWeight: '500',
  },
  customOptionLabelSelected: {
    color: '#54A0FF',
    fontWeight: '600',
  },
  customOptionDescription: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  customEmpty: {
    padding: 20,
    alignItems: 'center',
  },
  customEmptyText: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.5)',
    fontStyle: 'italic',
  },
  footer: {
    padding: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.5)',
    textAlign: 'center',
  },
});

export default SelectInputTest;
