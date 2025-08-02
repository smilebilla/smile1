/**
 * Corp Astro UI Library - DateInput Test Component
 * 
 * Test component for validating DateInput functionality, calendar picker,
 * date formatting, and validation states.
 * 
 * @module DateInputTest
 * @version 1.0.0
 * @since 2024
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { DateInput } from '../DateInput';

/**
 * DateInput Test Component
 * 
 * Comprehensive test suite for DateInput component validation.
 */
export const DateInputTest: React.FC = () => {
  // Test state
  const [basicDate, setBasicDate] = useState<Date | null>(null);
  const [formattedDate, setFormattedDate] = useState<Date | null>(null);
  const [validationDate, setValidationDate] = useState<Date | null>(null);
  const [rangeDate, setRangeDate] = useState<Date | null>(null);

  // Date ranges
  const minDate = new Date();
  minDate.setDate(minDate.getDate() - 7); // 7 days ago

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30); // 30 days from now

  // Handle date changes
  const handleBasicDateChange = (date: Date | null) => {
    setBasicDate(date);
    console.log('Basic date changed:', date?.toDateString());
  };

  const handleFormattedDateChange = (date: Date | null) => {
    setFormattedDate(date);
    console.log('Formatted date changed:', date?.toDateString());
  };

  const handleValidationDateChange = (date: Date | null) => {
    setValidationDate(date);
    console.log('Validation date changed:', date?.toDateString());
  };

  const handleRangeDateChange = (date: Date | null) => {
    setRangeDate(date);
    console.log('Range date changed:', date?.toDateString());
  };

  // Custom validation function
  const validateBusinessDay = (date: Date): boolean => {
    const dayOfWeek = date.getDay();
    return dayOfWeek >= 1 && dayOfWeek <= 5; // Monday to Friday
  };

  // Custom date formatter
  const formatCustomDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Event handlers
  const handlePickerOpen = () => {
    console.log('Date picker opened');
  };

  const handlePickerClose = () => {
    console.log('Date picker closed');
  };

  const handleFocusChange = (focused: boolean) => {
    console.log('Focus changed:', focused);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>DateInput Test Suite</Text>
        <Text style={styles.subtitle}>Comprehensive validation of DateInput component</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Date Input</Text>
        <Text style={styles.sectionDescription}>
          Standard date input with calendar picker
        </Text>
        <DateInput
          value={basicDate || undefined}
          onDateChange={handleBasicDateChange}
          placeholder="Select a date"
          label="Basic Date"
          helperText="Click to open calendar picker"
          clearable
        />
        <Text style={styles.valueDisplay}>
          Selected: {basicDate?.toDateString() || 'None'}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Date Formats</Text>
        <Text style={styles.sectionDescription}>
          Different date format options
        </Text>
        
        <DateInput
          value={formattedDate || undefined}
          onDateChange={handleFormattedDateChange}
          placeholder="MM/DD/YYYY"
          label="US Format"
          format="MM/DD/YYYY"
          style={styles.spaceBottom}
        />
        
        <DateInput
          value={formattedDate || undefined}
          onDateChange={handleFormattedDateChange}
          placeholder="DD/MM/YYYY"
          label="European Format"
          format="DD/MM/YYYY"
          style={styles.spaceBottom}
        />
        
        <DateInput
          value={formattedDate || undefined}
          onDateChange={handleFormattedDateChange}
          placeholder="YYYY-MM-DD"
          label="ISO Format"
          format="YYYY-MM-DD"
          style={styles.spaceBottom}
        />
        
        <DateInput
          value={formattedDate || undefined}
          onDateChange={handleFormattedDateChange}
          placeholder="DD MMM YYYY"
          label="Short Month Format"
          format="DD MMM YYYY"
          style={styles.spaceBottom}
        />
        
        <DateInput
          value={formattedDate || undefined}
          onDateChange={handleFormattedDateChange}
          placeholder="MMM DD, YYYY"
          label="Long Month Format"
          format="MMM DD, YYYY"
        />
        
        <Text style={styles.valueDisplay}>
          Selected: {formattedDate?.toDateString() || 'None'}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Date Range Constraints</Text>
        <Text style={styles.sectionDescription}>
          Date input with minimum and maximum date limits
        </Text>
        <DateInput
          value={rangeDate || undefined}
          onDateChange={handleRangeDateChange}
          placeholder="Select date within range"
          label="Range Constrained Date"
          helperText={`From ${minDate.toDateString()} to ${maxDate.toDateString()}`}
          minDate={minDate}
          maxDate={maxDate}
          clearable
        />
        <Text style={styles.valueDisplay}>
          Selected: {rangeDate?.toDateString() || 'None'}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Validation</Text>
        <Text style={styles.sectionDescription}>
          Date input with business day validation (Monday-Friday only)
        </Text>
        <DateInput
          value={validationDate || undefined}
          onDateChange={handleValidationDateChange}
          placeholder="Select business day"
          label="Business Day Selection"
          helperText="Only business days (Monday-Friday) are allowed"
          isDateValid={validateBusinessDay}
          validationState={
            validationDate && !validateBusinessDay(validationDate) ? 'error' : 'default'
          }
          errorMessage="Please select a business day (Monday-Friday)"
          required
        />
        <Text style={styles.valueDisplay}>
          Selected: {validationDate?.toDateString() || 'None'}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Size Variants</Text>
        <Text style={styles.sectionDescription}>
          Different size variants of the date input
        </Text>
        
        <DateInput
          placeholder="Small date input"
          label="Small Size"
          size="small"
          style={styles.spaceBottom}
        />
        
        <DateInput
          placeholder="Medium date input"
          label="Medium Size"
          size="medium"
          style={styles.spaceBottom}
        />
        
        <DateInput
          placeholder="Large date input"
          label="Large Size"
          size="large"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Validation States</Text>
        <Text style={styles.sectionDescription}>
          Date inputs with different validation states
        </Text>
        
        <DateInput
          placeholder="Default state"
          label="Default State"
          helperText="This is the default state"
          validationState="default"
          style={styles.spaceBottom}
        />
        
        <DateInput
          placeholder="Error state"
          label="Error State"
          validationState="error"
          errorMessage="This is an error message"
          style={styles.spaceBottom}
        />
        
        <DateInput
          placeholder="Success state"
          label="Success State"
          validationState="success"
          successMessage="This is a success message"
          style={styles.spaceBottom}
        />
        
        <DateInput
          placeholder="Warning state"
          label="Warning State"
          validationState="warning"
          warningMessage="This is a warning message"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Disabled & Read-Only</Text>
        <Text style={styles.sectionDescription}>
          Date inputs with disabled and read-only states
        </Text>
        
        <DateInput
          placeholder="Disabled date input"
          label="Disabled State"
          disabled
          style={styles.spaceBottom}
        />
        
        <DateInput
          value={new Date()}
          label="Read-Only State"
          readOnly
          helperText="This date input is read-only"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Formatting</Text>
        <Text style={styles.sectionDescription}>
          Date input with custom formatting function
        </Text>
        <DateInput
          placeholder="Custom formatted date"
          label="Custom Format"
          formatDate={formatCustomDate}
          helperText="Custom format: Full weekday, month, day, year"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Event Handling</Text>
        <Text style={styles.sectionDescription}>
          Date input with comprehensive event handling
        </Text>
        <DateInput
          placeholder="Event handling date"
          label="Event Handling"
          onPickerOpen={handlePickerOpen}
          onPickerClose={handlePickerClose}
          onFocusChange={handleFocusChange}
          helperText="Check console for event logs"
          showToday
          todayButtonText="Select Today"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Required Field</Text>
        <Text style={styles.sectionDescription}>
          Date input marked as required
        </Text>
        <DateInput
          placeholder="Required date field"
          label="Required Date"
          required
          helperText="This field is required"
          clearable
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          DateInput Test Suite - All variants and states validated
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

export default DateInputTest;
