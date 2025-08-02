import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Switch, SwitchProps } from '../Switch';

/**
 * Comprehensive test component for Switch
 * 
 * Tests all features including:
 * - Basic on/off functionality
 * - Size variants (small, medium, large)
 * - Style variants (default, ios, material, custom)
 * - Label positioning (left, right, top, bottom)
 * - Custom styling and colors
 * - Gradient tracks
 * - Icons in thumb
 * - Controlled/uncontrolled modes
 * - Accessibility features
 * - Custom rendering
 * - Loading and disabled states
 * - Press animations and glow effects
 */

const SwitchTest: React.FC = () => {
  const [basicValue, setBasicValue] = useState(false);
  const [customValue, setCustomValue] = useState(true);
  const [gradientValue, setGradientValue] = useState(false);
  const [iconValue, setIconValue] = useState(true);

  const handleValueChange = (value: boolean) => {
    console.log('Switch value changed to:', value);
  };

  const showAlert = (message: string) => {
    Alert.alert('Switch Test', message);
  };

  // Custom icons
  const OnIcon = () => (
    <Text style={{ color: '#2E86DE', fontSize: 12, fontWeight: 'bold' }}>✓</Text>
  );
  
  const OffIcon = () => (
    <Text style={{ color: '#6C757D', fontSize: 12, fontWeight: 'bold' }}>✕</Text>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Switch Component Tests</Text>
      
      {/* Basic Switch */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Switch</Text>
        <Switch
          value={basicValue}
          onValueChange={setBasicValue}
          label="Basic Switch"
          labelPosition="right"
        />
        <Text style={styles.statusText}>
          Status: {basicValue ? 'ON' : 'OFF'}
        </Text>
      </View>

      {/* Size Variants */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Size Variants</Text>
        
        <View style={styles.switchRow}>
          <Switch
            defaultValue={false}
            size="small"
            label="Small"
            labelPosition="right"
            onValueChange={handleValueChange}
          />
        </View>
        
        <View style={styles.switchRow}>
          <Switch
            defaultValue={false}
            size="medium"
            label="Medium"
            labelPosition="right"
            onValueChange={handleValueChange}
          />
        </View>
        
        <View style={styles.switchRow}>
          <Switch
            defaultValue={false}
            size="large"
            label="Large"
            labelPosition="right"
            onValueChange={handleValueChange}
          />
        </View>
      </View>

      {/* Label Positioning */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Label Positioning</Text>
        
        <View style={styles.switchRow}>
          <Switch
            defaultValue={false}
            label="Left Label"
            labelPosition="left"
            onValueChange={handleValueChange}
          />
        </View>
        
        <View style={styles.switchRow}>
          <Switch
            defaultValue={false}
            label="Right Label"
            labelPosition="right"
            onValueChange={handleValueChange}
          />
        </View>
        
        <View style={styles.switchRow}>
          <Switch
            defaultValue={false}
            label="Top Label"
            labelPosition="top"
            onValueChange={handleValueChange}
          />
        </View>
        
        <View style={styles.switchRow}>
          <Switch
            defaultValue={false}
            label="Bottom Label"
            labelPosition="bottom"
            onValueChange={handleValueChange}
          />
        </View>
      </View>

      {/* Custom Styling */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Styling</Text>
        <Switch
          value={customValue}
          onValueChange={setCustomValue}
          label="Custom Colors"
          labelPosition="right"
          activeTrackColor="#E74C3C"
          inactiveTrackColor="rgba(231, 76, 60, 0.3)"
          activeThumbColor="#FFFFFF"
          inactiveThumbColor="#BDC3C7"
          activeBorderColor="rgba(231, 76, 60, 0.5)"
          inactiveBorderColor="rgba(189, 195, 199, 0.3)"
          size="large"
          containerStyle={styles.customContainer}
          trackStyle={styles.customTrack}
          thumbStyle={styles.customThumb}
          labelStyle={styles.customLabel}
        />
      </View>

      {/* Gradient Track */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Gradient Track</Text>
        <Switch
          value={gradientValue}
          onValueChange={setGradientValue}
          label="Gradient Switch"
          labelPosition="right"
          gradientTrack={true}
          gradientColors={['#FF6B6B', '#4ECDC4']}
          size="large"
          glowEffect={true}
        />
      </View>

      {/* Icons in Thumb */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Icons in Thumb</Text>
        <Switch
          value={iconValue}
          onValueChange={setIconValue}
          label="Icon Switch"
          labelPosition="right"
          showIcons={true}
          onIcon={<OnIcon />}
          offIcon={<OffIcon />}
          size="large"
          activeTrackColor="#27AE60"
          inactiveTrackColor="rgba(108, 117, 125, 0.3)"
        />
      </View>

      {/* Custom Rendering */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Rendering</Text>
        <Switch
          defaultValue={false}
          label="Custom Rendered"
          labelPosition="right"
          renderTrack={({ isActive, style }) => (
            <View
              style={[
                style,
                {
                  backgroundColor: isActive ? '#9B59B6' : 'rgba(155, 89, 182, 0.3)',
                  borderColor: isActive ? '#8E44AD' : 'rgba(142, 68, 173, 0.3)',
                  borderWidth: 2,
                  borderStyle: 'dashed',
                },
              ]}
            />
          )}
          renderThumb={({ isActive, style }) => (
            <View
              style={[
                style,
                {
                  backgroundColor: isActive ? '#F39C12' : '#95A5A6',
                  borderColor: isActive ? '#E67E22' : '#7F8C8D',
                  borderWidth: 2,
                },
              ]}
            >
              <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: 'bold' }}>
                {isActive ? '●' : '○'}
              </Text>
            </View>
          )}
          renderLabel={({ label, isActive, style }) => (
            <Text
              style={[
                style,
                {
                  color: isActive ? '#9B59B6' : '#95A5A6',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                },
              ]}
            >
              {label} {isActive ? '🟢' : '🔴'}
            </Text>
          )}
          onValueChange={handleValueChange}
        />
      </View>

      {/* States */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>States</Text>
        
        <View style={styles.switchRow}>
          <Switch
            defaultValue={false}
            disabled={true}
            label="Disabled"
            labelPosition="right"
            onValueChange={handleValueChange}
          />
        </View>
        
        <View style={styles.switchRow}>
          <Switch
            defaultValue={false}
            loading={true}
            label="Loading"
            labelPosition="right"
            onValueChange={handleValueChange}
          />
        </View>
        
        <View style={styles.switchRow}>
          <Switch
            defaultValue={true}
            readOnly={true}
            label="Read-only"
            labelPosition="right"
            onValueChange={handleValueChange}
          />
        </View>
      </View>

      {/* Animation Options */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Animation Options</Text>
        
        <View style={styles.switchRow}>
          <Switch
            defaultValue={false}
            label="Fast Animation"
            labelPosition="right"
            animationDuration={100}
            onValueChange={handleValueChange}
          />
        </View>
        
        <View style={styles.switchRow}>
          <Switch
            defaultValue={false}
            label="Slow Animation"
            labelPosition="right"
            animationDuration={500}
            onValueChange={handleValueChange}
          />
        </View>
        
        <View style={styles.switchRow}>
          <Switch
            defaultValue={false}
            label="No Press Animation"
            labelPosition="right"
            pressAnimation={false}
            onValueChange={handleValueChange}
          />
        </View>
      </View>

      {/* Glow Effects */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Glow Effects</Text>
        
        <View style={styles.switchRow}>
          <Switch
            defaultValue={false}
            label="With Glow"
            labelPosition="right"
            glowEffect={true}
            onValueChange={handleValueChange}
          />
        </View>
        
        <View style={styles.switchRow}>
          <Switch
            defaultValue={false}
            label="Without Glow"
            labelPosition="right"
            glowEffect={false}
            onValueChange={handleValueChange}
          />
        </View>
      </View>

      {/* Thumb Shadow */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thumb Shadow</Text>
        
        <View style={styles.switchRow}>
          <Switch
            defaultValue={false}
            label="With Shadow"
            labelPosition="right"
            thumbShadow={true}
            onValueChange={handleValueChange}
          />
        </View>
        
        <View style={styles.switchRow}>
          <Switch
            defaultValue={false}
            label="Without Shadow"
            labelPosition="right"
            thumbShadow={false}
            onValueChange={handleValueChange}
          />
        </View>
        
        <View style={styles.switchRow}>
          <Switch
            defaultValue={false}
            label="Custom Shadow"
            labelPosition="right"
            thumbShadow={true}
            thumbShadowColor="#E74C3C"
            onValueChange={handleValueChange}
          />
        </View>
      </View>

      {/* Accessibility */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Accessibility</Text>
        <Switch
          defaultValue={false}
          label="Accessible Switch"
          labelPosition="right"
          accessibilityLabel="Notification switch"
          accessibilityHint="Turn notifications on or off"
          testID="notification-switch"
          onValueChange={handleValueChange}
        />
      </View>

      {/* Haptic Feedback */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Haptic Feedback</Text>
        <Switch
          defaultValue={false}
          label="Haptic Feedback"
          labelPosition="right"
          hapticFeedback={true}
          onValueChange={(value) => {
            showAlert(`Switch ${value ? 'ON' : 'OFF'} with haptic feedback`);
          }}
        />
      </View>

      {/* Border Customization */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Border Customization</Text>
        
        <View style={styles.switchRow}>
          <Switch
            defaultValue={false}
            label="Thin Border"
            labelPosition="right"
            borderWidth={1}
            onValueChange={handleValueChange}
          />
        </View>
        
        <View style={styles.switchRow}>
          <Switch
            defaultValue={false}
            label="Thick Border"
            labelPosition="right"
            borderWidth={3}
            activeBorderColor="#2E86DE"
            inactiveBorderColor="#6C757D"
            onValueChange={handleValueChange}
          />
        </View>
        
        <View style={styles.switchRow}>
          <Switch
            defaultValue={false}
            label="No Border"
            labelPosition="right"
            borderWidth={0}
            onValueChange={handleValueChange}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Test all interactions including tap, press animations, and accessibility features
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
  
  switchRow: {
    marginBottom: 16,
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
    padding: 8,
  },
  
  customTrack: {
    borderWidth: 2,
    borderStyle: 'solid',
  },
  
  customThumb: {
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  
  customLabel: {
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

export default SwitchTest;
