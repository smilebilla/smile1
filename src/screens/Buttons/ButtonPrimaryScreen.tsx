/**
 * ButtonPrimary Demo Screen
 * 
 * This screen demonstrates all functionalities of the ButtonPrimary component,
 * including different sizes, variants, states (disabled, loading with spinner and shimmer), 
 * configurations (haptics, gradient animation, hover effects, shadow effects, custom gradients), 
 * custom styles, and accessibility props. It is designed to work on both iOS and Android.
 * 
 * @module ButtonPrimary
 * @version 1.0.0
 * @since 2024
 */

import React, { useState } from 'react';
import { ScrollView, Text, Alert } from 'react-native';
import { ButtonPrimary, ButtonPrimaryLoadingState, ButtonPrimaryConfig, ButtonPrimaryProps } from '../../components/buttons/ButtonPrimary'; // Adjust path if necessary
import NextButton from '../../components/NextButton';
import ScreenHeading from '../../components/ScreenHeading';

const ButtonPrimaryScreen: React.FC = () => {
  const [loadingExample, setLoadingExample] = useState(false);

  const handlePress = () => {
    Alert.alert('Button Pressed', 'Primary button press event triggered.');
  };

  const handleLoadingPress = () => {
    setLoadingExample(true);
    setTimeout(() => setLoadingExample(false), 2000); // Simulate loading for 2 seconds
  };

  // Loading states
  const basicLoading: ButtonPrimaryLoadingState = { isLoading: true, showSpinner: false, showShimmer: false };
  const customTextLoading: ButtonPrimaryLoadingState = { isLoading: true, loadingText: 'Processing...', showSpinner: false, showShimmer: false };
  const spinnerLoading: ButtonPrimaryLoadingState = { isLoading: true, showSpinner: true, showShimmer: false };
  const shimmerLoading: ButtonPrimaryLoadingState = { isLoading: true, showSpinner: false, showShimmer: true };
  const dynamicLoading: ButtonPrimaryLoadingState = { isLoading: loadingExample, showSpinner: true, showShimmer: true };

  // Configurations
  const noHapticsConfig: Partial<ButtonPrimaryConfig> = { enableHaptics: false };
  const noGradientAnimConfig: Partial<ButtonPrimaryConfig> = { enableGradientAnimation: false };
  const noHoverConfig: Partial<ButtonPrimaryConfig> = { enableHoverEffects: false };
  const noShadowConfig: Partial<ButtonPrimaryConfig> = { enableShadowEffects: false };
  const customGradientConfig: Partial<ButtonPrimaryConfig> = { 
    gradientColors: ['#FF0000', '#00FF00'], 
    hoverGradientColors: ['#0000FF', '#FFFF00'] 
  };

  return (
    <ScrollView contentContainerClassName="p-5 items-center">
      <ScreenHeading title="ButtonPrimary Demo" />
      <Text className="text-lg font-bold mt-5 mb-2.5 self-start">Button Sizes</Text>
      
      <ButtonPrimary onPress={handlePress} config={{ size: 'small' }} style={{ marginBottom: 10 }}>
        Small Button
      </ButtonPrimary>
      
      <ButtonPrimary onPress={handlePress} config={{ size: 'medium' }} style={{ marginBottom: 10 }}>
        Medium Button
      </ButtonPrimary>
      
      <ButtonPrimary onPress={handlePress} config={{ size: 'large' }} style={{ marginBottom: 10 }}>
        Large Button
      </ButtonPrimary>

      <Text className="text-lg font-bold mt-5 mb-2.5 self-start">Button Variants</Text>
      
      <ButtonPrimary onPress={handlePress} config={{ variant: 'default' }} style={{ marginBottom: 10 }}>
        Default Variant
      </ButtonPrimary>
      
      <ButtonPrimary onPress={handlePress} config={{ variant: 'wide' }} style={{ marginBottom: 10 }}>
        Wide Variant
      </ButtonPrimary>
      
      <ButtonPrimary onPress={handlePress} config={{ variant: 'compact' }} style={{ marginBottom: 10 }}>
        Compact Variant
      </ButtonPrimary>

      <Text className="text-lg font-bold mt-5 mb-2.5 self-start">Disabled State</Text>
      
      <ButtonPrimary onPress={handlePress} disabled style={{ marginBottom: 10 }}>
        Disabled Button
      </ButtonPrimary>

      <Text className="text-lg font-bold mt-5 mb-2.5 self-start">Loading States</Text>
      
      <ButtonPrimary onPress={handlePress} loading={basicLoading} style={{ marginBottom: 10 }}>
        Basic Loading
      </ButtonPrimary>
      
      <ButtonPrimary onPress={handlePress} loading={customTextLoading} style={{ marginBottom: 10 }}>
        Custom Text Loading
      </ButtonPrimary>
      
      <ButtonPrimary onPress={handlePress} loading={spinnerLoading} style={{ marginBottom: 10 }}>
        Spinner Loading
      </ButtonPrimary>
      
      <ButtonPrimary onPress={handlePress} loading={shimmerLoading} style={{ marginBottom: 10 }}>
        Shimmer Loading
      </ButtonPrimary>
      
      <ButtonPrimary onPress={handleLoadingPress} loading={dynamicLoading} style={{ marginBottom: 10 }}>
        Dynamic Loading (2s)
      </ButtonPrimary>

      <Text className="text-lg font-bold mt-5 mb-2.5 self-start">Configurations</Text>
      
      <ButtonPrimary onPress={handlePress} config={noHapticsConfig} style={{ marginBottom: 10 }}>
        No Haptics
      </ButtonPrimary>
      
      <ButtonPrimary onPress={handlePress} config={noGradientAnimConfig} style={{ marginBottom: 10 }}>
        No Gradient Animation
      </ButtonPrimary>
      
      <ButtonPrimary onPress={handlePress} config={noHoverConfig} style={{ marginBottom: 10 }}>
        No Hover Effects
      </ButtonPrimary>
      
      <ButtonPrimary onPress={handlePress} config={noShadowConfig} style={{ marginBottom: 10 }}>
        No Shadow Effects
      </ButtonPrimary>
      
      <ButtonPrimary onPress={handlePress} config={customGradientConfig} style={{ marginBottom: 10 }}>
        Custom Gradients
      </ButtonPrimary>

      <Text className="text-lg font-bold mt-5 mb-2.5 self-start">Custom Styles</Text>
      
      <ButtonPrimary onPress={handlePress} style={{ borderRadius: 10, marginBottom: 10 }} textStyle={{ fontStyle: 'italic' }}>
        Custom Style Button
      </ButtonPrimary>

      <Text className="text-lg font-bold mt-5 mb-2.5 self-start">Accessibility Props</Text>
      
      <ButtonPrimary
        onPress={handlePress}
        accessibilityLabel="Accessible Primary Button"
        accessibilityHint="Press to perform action"
        style={{ marginBottom: 10 }}
      >
        Accessible Button
      </ButtonPrimary>
      <NextButton nextScreen="ButtonSecondaryScreen" label="Next" />
    </ScrollView>
  );
};

export default ButtonPrimaryScreen;