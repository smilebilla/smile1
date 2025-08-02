/**
 * ButtonGhost Demo Screen
 * 
 * This screen demonstrates all functionalities of the ButtonGhost component,
 * including different sizes, variants, states (disabled, loading with spinner and pulse), 
 * configurations (haptics, hover effects, press effects, loading states, custom colors), 
 * custom styles, and accessibility props. It is designed to work on both iOS and Android.
 * 
 * @module ButtonGhost
 * @version 1.0.0
 * @since 2024
 */

import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, Alert } from 'react-native';
import { ButtonGhost, ButtonGhostConfig, ButtonGhostLoadingState, ButtonGhostProps } from '../../components/buttons/ButtonGhost'; // Adjust path if necessary
import NextButton from '../../components/NextButton';
import ScreenHeading from '../../components/ScreenHeading';

const ButtonGhostScreen: React.FC = () => {
  const [loadingExample, setLoadingExample] = useState(false);

  const handlePress = () => {
    Alert.alert('Button Pressed', 'Ghost button press event triggered.');
  };

  const handleLoadingPress = () => {
    setLoadingExample(true);
    setTimeout(() => setLoadingExample(false), 2000); // Simulate loading for 2 seconds
  };

  // Loading states
  const basicLoading: ButtonGhostLoadingState = { isLoading: true, showSpinner: false, showPulse: false };
  const customTextLoading: ButtonGhostLoadingState = { isLoading: true, loadingText: 'Processing...', showSpinner: false, showPulse: false };
  const spinnerLoading: ButtonGhostLoadingState = { isLoading: true, showSpinner: true, showPulse: false };
  const pulseLoading: ButtonGhostLoadingState = { isLoading: true, showSpinner: false, showPulse: true };
  const dynamicLoading: ButtonGhostLoadingState = { isLoading: loadingExample, showSpinner: true, showPulse: true };

  // Configurations
  const noHapticsConfig: Partial<ButtonGhostConfig> = { enableHaptics: false };
  const noHoverConfig: Partial<ButtonGhostConfig> = { enableHoverEffects: false };
  const noPressConfig: Partial<ButtonGhostConfig> = { enablePressEffects: false };
  const noLoadingConfig: Partial<ButtonGhostConfig> = { enableLoadingStates: false };
  const customColorsConfig: Partial<ButtonGhostConfig> = { 
    textColor: '#FF0000', 
    hoverTextColor: '#00FF00', 
    hoverBackgroundColor: 'rgba(0, 0, 255, 0.1)' 
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ScreenHeading title="ButtonGhost Demo" />
      <Text style={styles.sectionTitle}>Button Sizes</Text>
      
      <ButtonGhost onPress={handlePress} config={{ size: 'small' }} style={{ ...styles.buttonBorder, ...styles.marginBottom }}>
        Small Ghost
      </ButtonGhost>
      
      <ButtonGhost onPress={handlePress} config={{ size: 'medium' }} style={{ ...styles.buttonBorder, ...styles.marginBottom }}>
        Medium Ghost
      </ButtonGhost>
      
      <ButtonGhost onPress={handlePress} config={{ size: 'large' }} style={{ ...styles.buttonBorder, ...styles.marginBottom }}>
        Large Ghost
      </ButtonGhost>

      <Text style={styles.sectionTitle}>Button Variants</Text>
      
      <ButtonGhost onPress={handlePress} config={{ variant: 'default' }} style={{ ...styles.buttonBorder, ...styles.marginBottom }}>
        Default Variant
      </ButtonGhost>
      
      <ButtonGhost onPress={handlePress} config={{ variant: 'minimal' }} style={{ ...styles.buttonBorder, ...styles.marginBottom }}>
        Minimal Variant
      </ButtonGhost>
      
      <ButtonGhost onPress={handlePress} config={{ variant: 'subtle' }} style={{ ...styles.buttonBorder, ...styles.marginBottom }}>
        Subtle Variant
      </ButtonGhost>

      <Text style={styles.sectionTitle}>Disabled State</Text>
      
      <ButtonGhost onPress={handlePress} disabled style={{ ...styles.buttonBorder, ...styles.marginBottom }}>
        Disabled Ghost
      </ButtonGhost>

      <Text style={styles.sectionTitle}>Loading States</Text>
      
      <ButtonGhost onPress={handlePress} loading={basicLoading} style={{ ...styles.buttonBorder, ...styles.marginBottom }}>
        Basic Loading
      </ButtonGhost>
      
      <ButtonGhost onPress={handlePress} loading={customTextLoading} style={{ ...styles.buttonBorder, ...styles.marginBottom }}>
        Custom Text Loading
      </ButtonGhost>
      
      <ButtonGhost onPress={handlePress} loading={spinnerLoading} style={{ ...styles.buttonBorder, ...styles.marginBottom }}>
        Spinner Loading
      </ButtonGhost>
      
      <ButtonGhost onPress={handlePress} loading={pulseLoading} style={{ ...styles.buttonBorder, ...styles.marginBottom }}>
        Pulse Loading
      </ButtonGhost>
      
      <ButtonGhost onPress={handleLoadingPress} loading={dynamicLoading} style={{ ...styles.buttonBorder, ...styles.marginBottom }}>
        Dynamic Loading (2s)
      </ButtonGhost>

      <Text style={styles.sectionTitle}>Configurations</Text>
      
      <ButtonGhost onPress={handlePress} config={noHapticsConfig} style={{ ...styles.buttonBorder, ...styles.marginBottom }}>
        No Haptics
      </ButtonGhost>
      
      <ButtonGhost onPress={handlePress} config={noHoverConfig} style={{ ...styles.buttonBorder, ...styles.marginBottom }}>
        No Hover Effects
      </ButtonGhost>
      
      <ButtonGhost onPress={handlePress} config={noPressConfig} style={{ ...styles.buttonBorder, ...styles.marginBottom }}>
        No Press Effects
      </ButtonGhost>
      
      <ButtonGhost onPress={handlePress} config={noLoadingConfig} style={{ ...styles.buttonBorder, ...styles.marginBottom }}>
        No Loading States
      </ButtonGhost>
      
      <ButtonGhost onPress={handlePress} config={customColorsConfig} style={{ ...styles.buttonBorder, ...styles.marginBottom }}>
        Custom Colors
      </ButtonGhost>

      <Text style={styles.sectionTitle}>Custom Styles</Text>
      
      <ButtonGhost onPress={handlePress} style={{ ...styles.buttonBorder, ...styles.marginBottom, borderColor: 'red', borderRadius: 20 }} textStyle={{ fontStyle: 'italic' }}>
        Custom Style & Text
      </ButtonGhost>

      <Text style={styles.sectionTitle}>Accessibility Props</Text>
      
      <ButtonGhost
        onPress={handlePress}
        accessibilityLabel="Accessible Ghost Button"
        accessibilityHint="Demonstrates accessibility props"
        style={{ ...styles.buttonBorder, ...styles.marginBottom }}
      >
        Accessible Button
      </ButtonGhost>
      <NextButton nextScreen="ButtonGroupScreen" label="Next" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  buttonBorder: {
    borderWidth: 1,
    borderColor: 'gray',
  },
  marginBottom: {
    marginBottom: 10,
  },
});

export default ButtonGhostScreen;