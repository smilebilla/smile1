/**
 * TimeInput Test Component
 * 
 * Test component for TimeInput primitive validation
 * 
 * @module TimeInputTest
 * @version 1.0.0
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { TimeInput, TimeValue } from '../TimeInput';

/**
 * TimeInputTest Component
 * 
 * Comprehensive test component for TimeInput primitive
 */
export const TimeInputTest: React.FC = () => {
  const [time1, setTime1] = useState<TimeValue | undefined>(undefined);
  const [time2, setTime2] = useState<TimeValue | undefined>({ hours: 2, minutes: 30, period: 'PM' });
  const [time3, setTime3] = useState<TimeValue | undefined>(undefined);
  const [time4, setTime4] = useState<TimeValue | undefined>(undefined);
  const [time5, setTime5] = useState<TimeValue | undefined>(undefined);
  const [time6, setTime6] = useState<TimeValue | undefined>(undefined);

  const handleTimeChange = (timeValue: TimeValue | null, label: string) => {
    console.log(`${label} changed to:`, timeValue);
    Alert.alert('Time Changed', `${label}: ${timeValue ? JSON.stringify(timeValue) : 'null'}`);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>TimeInput Test Component</Text>
      
      {/* Basic TimeInput */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic TimeInput</Text>
        <TimeInput
          value={time1}
          onTimeChange={(value) => setTime1(value || undefined)}
          placeholder="Select time"
          label="Meeting Time"
          helperText="Select your preferred meeting time"
          testID="basic-time-input"
        />
      </View>

      {/* 12-hour format with default value */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>12-hour Format (with default)</Text>
        <TimeInput
          value={time2}
          onTimeChange={(value) => setTime2(value || undefined)}
          placeholder="Select time"
          label="Appointment Time"
          format="12h"
          helperText="12-hour format with AM/PM"
          testID="12h-time-input"
        />
      </View>

      {/* 24-hour format with seconds */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>24-hour Format with Seconds</Text>
        <TimeInput
          value={time3}
          onTimeChange={(value) => setTime3(value || undefined)}
          placeholder="Select time"
          label="Precise Time"
          format="24h"
          showSeconds={true}
          helperText="24-hour format with seconds"
          testID="24h-time-input"
        />
      </View>

      {/* Error state */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Error State</Text>
        <TimeInput
          value={time4}
          onTimeChange={(value) => setTime4(value || undefined)}
          placeholder="Select time"
          label="Error Time"
          validationState="error"
          errorMessage="Please select a valid time"
          testID="error-time-input"
        />
      </View>

      {/* Success state */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Success State</Text>
        <TimeInput
          value={time5}
          onTimeChange={(value) => setTime5(value || undefined)}
          placeholder="Select time"
          label="Success Time"
          validationState="success"
          successMessage="Time selected successfully"
          testID="success-time-input"
        />
      </View>

      {/* Disabled state */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Disabled State</Text>
        <TimeInput
          value={time6}
          onTimeChange={(value) => setTime6(value || undefined)}
          placeholder="Select time"
          label="Disabled Time"
          disabled={true}
          helperText="This input is disabled"
          testID="disabled-time-input"
        />
      </View>

      {/* Size variants */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Size Variants</Text>
        
        <View style={styles.subSection}>
          <TimeInput
            placeholder="Small time input"
            label="Small"
            size="small"
            testID="small-time-input"
          />
        </View>

        <View style={styles.subSection}>
          <TimeInput
            placeholder="Medium time input"
            label="Medium"
            size="medium"
            testID="medium-time-input"
          />
        </View>

        <View style={styles.subSection}>
          <TimeInput
            placeholder="Large time input"
            label="Large"
            size="large"
            testID="large-time-input"
          />
        </View>
      </View>

      {/* Variant styles */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Variant Styles</Text>
        
        <View style={styles.subSection}>
          <TimeInput
            placeholder="Default variant"
            label="Default"
            variant="default"
            testID="default-variant-time-input"
          />
        </View>

        <View style={styles.subSection}>
          <TimeInput
            placeholder="Outlined variant"
            label="Outlined"
            variant="outlined"
            testID="outlined-variant-time-input"
          />
        </View>

        <View style={styles.subSection}>
          <TimeInput
            placeholder="Filled variant"
            label="Filled"
            variant="filled"
            testID="filled-variant-time-input"
          />
        </View>

        <View style={styles.subSection}>
          <TimeInput
            placeholder="Ghost variant"
            label="Ghost"
            variant="ghost"
            testID="ghost-variant-time-input"
          />
        </View>
      </View>

      {/* Custom configurations */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Configurations</Text>
        
        <View style={styles.subSection}>
          <TimeInput
            placeholder="15-minute intervals"
            label="15-minute Steps"
            minuteStep={15}
            helperText="Time selection in 15-minute intervals"
            testID="15min-step-time-input"
          />
        </View>

        <View style={styles.subSection}>
          <TimeInput
            placeholder="With clear button"
            label="Clearable"
            clearable={true}
            helperText="Time input with clear button"
            testID="clearable-time-input"
          />
        </View>

        <View style={styles.subSection}>
          <TimeInput
            placeholder="Custom now button"
            label="Custom Now Text"
            showNow={true}
            nowButtonText="Current Time"
            helperText="Custom now button text"
            testID="custom-now-time-input"
          />
        </View>
      </View>

      {/* Callback testing */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Callback Testing</Text>
        <TimeInput
          placeholder="Test callbacks"
          label="Callback Test"
          onTimeChange={(value) => handleTimeChange(value, 'Callback Test')}
          onPickerOpen={() => console.log('Picker opened')}
          onPickerClose={() => console.log('Picker closed')}
          onFocusChange={(focused) => console.log('Focus changed:', focused)}
          testID="callback-time-input"
        />
      </View>

      <View style={styles.spacer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#333',
  },
  section: {
    marginBottom: 32,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  subSection: {
    marginBottom: 16,
  },
  spacer: {
    height: 50,
  },
});
