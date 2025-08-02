import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Alert,
  TouchableOpacity,
} from 'react-native';
import { Toggle, ToggleProps, ToggleSize } from '../Toggle';

/**
 * Comprehensive test component for Toggle
 * Tests: basic functionality, size variants, states, animations, custom styling
 */
export const ToggleTest: React.FC = () => {
  const [basicToggle, setBasicToggle] = useState(false);
  const [controlledToggle, setControlledToggle] = useState(true);
  const [customToggle, setCustomToggle] = useState(false);
  const [loadingToggle, setLoadingToggle] = useState(false);

  const handleToggleChange = (value: boolean, label: string) => {
    console.log(`${label} toggled to:`, value);
    Alert.alert('Toggle Changed', `${label} is now ${value ? 'ON' : 'OFF'}`);
  };

  const handleTogglePress = (label: string) => {
    console.log(`${label} pressed`);
  };

  const customThumbRender = (props: any) => (
    <View style={[props.style, { 
      backgroundColor: props.isOn ? '#FFD700' : '#FFF', 
      justifyContent: 'center',
      alignItems: 'center',
    }]}>
      <Text style={{ fontSize: 8, color: props.isOn ? '#000' : '#666' }}>
        {props.isOn ? '✓' : '✗'}
      </Text>
    </View>
  );

  const customTrackRender = (props: any) => (
    <View style={[props.style, { 
      backgroundColor: props.isOn ? 'rgba(255, 215, 0, 0.3)' : 'rgba(255, 255, 255, 0.1)',
      borderWidth: 2,
      borderColor: props.isOn ? '#FFD700' : 'rgba(255, 255, 255, 0.2)',
    }]}>
      {props.children}
    </View>
  );

  const toggleLoadingState = () => {
    setLoadingToggle(!loadingToggle);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Toggle Component Tests</Text>
      
      {/* Basic Toggle */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Toggle</Text>
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Basic Toggle</Text>
          <Toggle
            value={basicToggle}
            onValueChange={setBasicToggle}
            onPress={() => handleTogglePress('Basic Toggle')}
            testID="basic-toggle"
          />
        </View>
        <Text style={styles.stateText}>
          State: {basicToggle ? 'ON' : 'OFF'}
        </Text>
      </View>

      {/* Controlled Toggle */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Controlled Toggle</Text>
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Controlled Toggle</Text>
          <Toggle
            value={controlledToggle}
            onValueChange={(value) => {
              setControlledToggle(value);
              handleToggleChange(value, 'Controlled Toggle');
            }}
            testID="controlled-toggle"
          />
        </View>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => setControlledToggle(!controlledToggle)}
        >
          <Text style={styles.buttonText}>
            Toggle Externally (Current: {controlledToggle ? 'ON' : 'OFF'})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Size Variants */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Size Variants</Text>
        {(['small', 'medium', 'large'] as ToggleSize[]).map((size) => (
          <View key={size} style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>{size.charAt(0).toUpperCase() + size.slice(1)}</Text>
            <Toggle
              size={size}
              defaultValue={size === 'medium'}
              onValueChange={(value) => handleToggleChange(value, `${size} Toggle`)}
              testID={`${size}-toggle`}
            />
          </View>
        ))}
      </View>

      {/* State Variants */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>State Variants</Text>
        
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Disabled (OFF)</Text>
          <Toggle
            value={false}
            disabled
            testID="disabled-off-toggle"
          />
        </View>
        
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Disabled (ON)</Text>
          <Toggle
            value={true}
            disabled
            testID="disabled-on-toggle"
          />
        </View>
        
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Loading</Text>
          <Toggle
            value={loadingToggle}
            loading={true}
            onValueChange={setLoadingToggle}
            testID="loading-toggle"
          />
        </View>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={toggleLoadingState}
        >
          <Text style={styles.buttonText}>
            Toggle Loading State
          </Text>
        </TouchableOpacity>
      </View>

      {/* Animation Variants */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Animation Variants</Text>
        
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Fast Animation</Text>
          <Toggle
            defaultValue={false}
            animationDuration={100}
            onValueChange={(value) => handleToggleChange(value, 'Fast Animation')}
            testID="fast-animation-toggle"
          />
        </View>
        
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Slow Animation</Text>
          <Toggle
            defaultValue={true}
            animationDuration={500}
            onValueChange={(value) => handleToggleChange(value, 'Slow Animation')}
            testID="slow-animation-toggle"
          />
        </View>
        
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>No Glow Effect</Text>
          <Toggle
            defaultValue={false}
            glowEffect={false}
            onValueChange={(value) => handleToggleChange(value, 'No Glow')}
            testID="no-glow-toggle"
          />
        </View>
      </View>

      {/* Custom Colors */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Colors</Text>
        
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Custom Gold</Text>
          <Toggle
            defaultValue={false}
            trackColorOff="rgba(255, 255, 255, 0.05)"
            trackColorOn="rgba(255, 215, 0, 0.3)"
            thumbColorOff="rgba(255, 255, 255, 0.6)"
            thumbColorOn="#FFD700"
            onValueChange={(value) => handleToggleChange(value, 'Custom Gold')}
            testID="custom-gold-toggle"
          />
        </View>
        
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Custom Purple</Text>
          <Toggle
            defaultValue={true}
            trackColorOff="rgba(255, 255, 255, 0.05)"
            trackColorOn="rgba(108, 92, 231, 0.3)"
            thumbColorOff="rgba(255, 255, 255, 0.6)"
            thumbColorOn="#6C5CE7"
            onValueChange={(value) => handleToggleChange(value, 'Custom Purple')}
            testID="custom-purple-toggle"
          />
        </View>
        
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Custom Green</Text>
          <Toggle
            defaultValue={false}
            trackColorOff="rgba(255, 255, 255, 0.05)"
            trackColorOn="rgba(81, 207, 102, 0.3)"
            thumbColorOff="rgba(255, 255, 255, 0.6)"
            thumbColorOn="#51CF66"
            onValueChange={(value) => handleToggleChange(value, 'Custom Green')}
            testID="custom-green-toggle"
          />
        </View>
      </View>

      {/* Custom Styling */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Styling</Text>
        
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Custom Container</Text>
          <Toggle
            defaultValue={false}
            containerStyle={styles.customContainer}
            onValueChange={(value) => handleToggleChange(value, 'Custom Container')}
            testID="custom-container-toggle"
          />
        </View>
        
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Custom Track</Text>
          <Toggle
            defaultValue={true}
            trackStyle={styles.customTrack}
            onValueChange={(value) => handleToggleChange(value, 'Custom Track')}
            testID="custom-track-toggle"
          />
        </View>
        
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Custom Thumb</Text>
          <Toggle
            value={customToggle}
            onValueChange={setCustomToggle}
            thumbStyle={styles.customThumb}
            testID="custom-thumb-toggle"
          />
        </View>
      </View>

      {/* Custom Render Functions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Render Functions</Text>
        
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Custom Thumb Render</Text>
          <Toggle
            defaultValue={false}
            renderThumb={customThumbRender}
            onValueChange={(value) => handleToggleChange(value, 'Custom Thumb Render')}
            testID="custom-thumb-render-toggle"
          />
        </View>
        
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Custom Track Render</Text>
          <Toggle
            defaultValue={true}
            renderTrack={customTrackRender}
            onValueChange={(value) => handleToggleChange(value, 'Custom Track Render')}
            testID="custom-track-render-toggle"
          />
        </View>
      </View>

      {/* Accessibility */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Accessibility</Text>
        
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Accessibility Labels</Text>
          <Toggle
            defaultValue={false}
            accessibilityLabel="Enable notifications"
            accessibilityHint="Double tap to toggle notification settings"
            onValueChange={(value) => handleToggleChange(value, 'Accessibility')}
            testID="accessibility-toggle"
          />
        </View>
      </View>

      {/* Uncontrolled Toggles */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Uncontrolled Toggles</Text>
        
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Default OFF</Text>
          <Toggle
            defaultValue={false}
            onValueChange={(value) => handleToggleChange(value, 'Uncontrolled OFF')}
            testID="uncontrolled-off-toggle"
          />
        </View>
        
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Default ON</Text>
          <Toggle
            defaultValue={true}
            onValueChange={(value) => handleToggleChange(value, 'Uncontrolled ON')}
            testID="uncontrolled-on-toggle"
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
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingVertical: 8,
  },
  toggleLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    flex: 1,
    marginRight: 16,
    fontFamily: 'Inter',
  },
  stateText: {
    fontSize: 14,
    color: '#B8B8C0',
    marginTop: 8,
    fontFamily: 'Inter',
  },
  button: {
    backgroundColor: 'rgba(46, 134, 222, 0.2)',
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: 'rgba(46, 134, 222, 0.3)',
  },
  buttonText: {
    color: '#2E86DE',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    fontFamily: 'Inter',
  },
  customContainer: {
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    borderRadius: 8,
    padding: 4,
  },
  customTrack: {
    borderWidth: 2,
    borderColor: '#2E86DE',
    shadowColor: '#2E86DE',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.3,
  },
  customThumb: {
    borderWidth: 2,
    borderColor: '#FFD700',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.5,
  },
});

export default ToggleTest;
