/**
 * ButtonSecondary Demo Screen
 * 
 * This screen demonstrates all functionalities of the ButtonSecondary component,
 * including different sizes, variants, states (disabled, loading with spinner and pulse), 
 * configurations (haptics, glass morphism, border animation, glow effects, backdrop blur, custom colors), 
 * custom styles, and accessibility props. It is designed to work on both iOS and Android.
 * 
 * @module ButtonSecondary
 * @version 1.0.0
 * @since 2024
 */

import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, Alert } from 'react-native';
import { ButtonSecondary, ButtonSecondaryProps, ButtonSecondaryConfig, ButtonSecondaryLoadingState } from '../../components/buttons/ButtonSecondary'; // Adjust path if necessary
import NextButton from '@/src/components/NextButton';
import ScreenHeading from '@/src/components/ScreenHeading';
const ButtonSecondaryScreen: React.FC = () => {
  const [loadingExample, setLoadingExample] = useState(false);

  const handlePress = () => {
    Alert.alert('Button Pressed', 'Secondary button press event triggered.');
  };

  const handleLoadingPress = () => {
    setLoadingExample(true);
    setTimeout(() => setLoadingExample(false), 2000); // Simulate loading for 2 seconds
  };

  // Loading states
  const basicLoading: ButtonSecondaryLoadingState = { isLoading: true, showSpinner: false, showPulse: false };
  const customTextLoading: ButtonSecondaryLoadingState = { isLoading: true, loadingText: 'Processing...', showSpinner: false, showPulse: false };
  const spinnerLoading: ButtonSecondaryLoadingState = { isLoading: true, showSpinner: true, showPulse: false };
  const pulseLoading: ButtonSecondaryLoadingState = { isLoading: true, showSpinner: false, showPulse: true };
  const dynamicLoading: ButtonSecondaryLoadingState = { isLoading: loadingExample, showSpinner: true, showPulse: true };

  // Configurations
  const noHapticsConfig: Partial<ButtonSecondaryConfig> = { enableHaptics: false };
  const noGlassConfig: Partial<ButtonSecondaryConfig> = { enableGlassMorphism: false };
  const noBorderAnimConfig: Partial<ButtonSecondaryConfig> = { enableBorderAnimation: false };
  const noGlowConfig: Partial<ButtonSecondaryConfig> = { enableGlowEffects: false };
  const noBlurConfig: Partial<ButtonSecondaryConfig> = { enableBackdropBlur: false };
  const customColorsConfig: Partial<ButtonSecondaryConfig> = { 
    backgroundColor: 'rgba(255,0,0,0.1)', 
    borderColor: 'rgba(255,0,0,0.3)', 
    textColor: '#FF0000' 
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ScreenHeading title="ButtonSecondary Demo" />
      <Text style={styles.sectionTitle}>Button Sizes</Text>
      
      <ButtonSecondary onPress={handlePress} config={{ size: 'small' }} style={styles.marginBottom}>
        Small Button
      </ButtonSecondary>
      
      <ButtonSecondary onPress={handlePress} config={{ size: 'medium' }} style={styles.marginBottom}>
        Medium Button
      </ButtonSecondary>
      
      <ButtonSecondary onPress={handlePress} config={{ size: 'large' }} style={styles.marginBottom}>
        Large Button
      </ButtonSecondary>

      <Text style={styles.sectionTitle}>Button Variants</Text>
      
      <ButtonSecondary onPress={handlePress} config={{ variant: 'default' }} style={styles.marginBottom}>
        Default Variant
      </ButtonSecondary>
      
      <ButtonSecondary onPress={handlePress} config={{ variant: 'outlined' }} style={styles.marginBottom}>
        Outlined Variant
      </ButtonSecondary>
      
      <ButtonSecondary onPress={handlePress} config={{ variant: 'glass' }} style={styles.marginBottom}>
        Glass Variant
      </ButtonSecondary>

      <Text style={styles.sectionTitle}>Disabled State</Text>
      
      <ButtonSecondary onPress={handlePress} disabled style={styles.marginBottom}>
        Disabled Button
      </ButtonSecondary>

      <Text style={styles.sectionTitle}>Loading States</Text>
      
      <ButtonSecondary onPress={handlePress} loading={basicLoading} style={styles.marginBottom}>
        Basic Loading
      </ButtonSecondary>
      
      <ButtonSecondary onPress={handlePress} loading={customTextLoading} style={styles.marginBottom}>
        Custom Text Loading
      </ButtonSecondary>
      
      <ButtonSecondary onPress={handlePress} loading={spinnerLoading} style={styles.marginBottom}>
        Spinner Loading
      </ButtonSecondary>
      
      <ButtonSecondary onPress={handlePress} loading={pulseLoading} style={styles.marginBottom}>
        Pulse Loading
      </ButtonSecondary>
      
      <ButtonSecondary onPress={handleLoadingPress} loading={dynamicLoading} style={styles.marginBottom}>
        Dynamic Loading (2s)
      </ButtonSecondary>

      <Text style={styles.sectionTitle}>Configurations</Text>
      
      <ButtonSecondary onPress={handlePress} config={noHapticsConfig} style={styles.marginBottom}>
        No Haptics
      </ButtonSecondary>
      
      <ButtonSecondary onPress={handlePress} config={noGlassConfig} style={styles.marginBottom}>
        No Glass Morphism
      </ButtonSecondary>
      
      <ButtonSecondary onPress={handlePress} config={noBorderAnimConfig} style={styles.marginBottom}>
        No Border Animation
      </ButtonSecondary>
      
      <ButtonSecondary onPress={handlePress} config={noGlowConfig} style={styles.marginBottom}>
        No Glow Effects
      </ButtonSecondary>
      
      <ButtonSecondary onPress={handlePress} config={noBlurConfig} style={styles.marginBottom}>
        No Backdrop Blur
      </ButtonSecondary>
      
      <ButtonSecondary onPress={handlePress} config={customColorsConfig} style={styles.marginBottom}>
        Custom Colors
      </ButtonSecondary>

      <Text style={styles.sectionTitle}>Custom Styles</Text>
      
      <ButtonSecondary onPress={handlePress} style={{ borderRadius: 10, marginBottom: 10 }} textStyle={{ fontStyle: 'italic' }
    }>
        Custom Style Button
      </ButtonSecondary>

      <Text style={styles.sectionTitle}>Accessibility Props</Text>
      
      <ButtonSecondary
        onPress={handlePress}
        accessibilityLabel="Accessible Secondary Button"
        accessibilityHint="Press to perform secondary action"
        style={styles.marginBottom}
      >
        Accessible Button
      </ButtonSecondary>
      <NextButton nextScreen="ButtonToggleScreen" label="Next" />
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
  marginBottom: {
    marginBottom: 10,
  },
});

export default ButtonSecondaryScreen;