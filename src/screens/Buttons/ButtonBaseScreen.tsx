/**
 * ButtonBase Demo Screen
 * 
 * This screen demonstrates all functionalities of the ButtonBase component,
 * including different sizes, states (disabled, loading), animations, event handlers,
 * custom rendering, and configurations. It is designed to work on both iOS and Android.
 * 
 * @module ButtonBase
 * @version 1.0.0
 * @since 2024
 */

import React, { useState } from 'react';
import { View, ScrollView, Text, ActivityIndicator, Alert, Animated } from 'react-native';
import { ButtonBase, ButtonBaseProps, ButtonBaseConfig, ButtonBaseLoadingState, ButtonBaseState } from '../../components/buttons/ButtonBase'; // Adjust path if necessary
import { ProfessionalGrays } from '../../components/foundations/tokens/colors/ProfessionalGrays'; // Assume this is available from the library
import NextButton from '../../components/NextButton';
import ScreenHeading from '../../components/ScreenHeading';

const ButtonBaseScreen: React.FC = () => {
  const [loadingExample, setLoadingExample] = useState(false);
  const [customScaleValue] = useState(new Animated.Value(1));

  const handlePress = () => {
    Alert.alert('Button Pressed', 'Standard press event triggered.');
  };

  const handleLongPress = () => {
    Alert.alert('Long Press', 'Long press event triggered.');
  };

  const handleLoadingPress = () => {
    setLoadingExample(true);
    setTimeout(() => setLoadingExample(false), 2000); // Simulate loading for 2 seconds
  };

  // Custom animations example: Manually animate scale
  const customAnimations: Partial<ButtonBaseProps['customAnimations']> = {
    scaleValue: customScaleValue,
  };

  // Example configs
  const noAnimationConfig: Partial<ButtonBaseConfig> = { enablePressAnimation: false };
  const noHapticsConfig: Partial<ButtonBaseConfig> = { enableHaptics: false };
  const customDurationConfig: Partial<ButtonBaseConfig> = { animationDuration: 300, pressScale: 0.95 };

  // Loading states
  const basicLoading: ButtonBaseLoadingState = { isLoading: true };
  const customTextLoading: ButtonBaseLoadingState = { isLoading: true, loadingText: 'Processing...' };
  const spinnerLoading: ButtonBaseLoadingState = { isLoading: true, showSpinner: true }; // Used in custom render

  return (
    <ScrollView contentContainerClassName="p-5 items-center">
      <ScreenHeading title="ButtonBase Demo" />
      <Text className="text-lg font-bold mt-5 mb-2.5 self-start">Button Sizes</Text>
      
      <ButtonBase onPress={handlePress} config={{ size: 'small' }} buttonStyle={{ backgroundColor: '#007AFF' }}>
        Small Button
      </ButtonBase>
      
      <ButtonBase onPress={handlePress} config={{ size: 'medium' }} buttonStyle={{ backgroundColor: '#007AFF' }}>
        Medium Button
      </ButtonBase>
      
      <ButtonBase onPress={handlePress} config={{ size: 'large' }} buttonStyle={{ backgroundColor: '#007AFF' }}>
        Large Button
      </ButtonBase>

      <Text className="text-lg font-bold mt-5 mb-2.5 self-start">Disabled State</Text>
      
      <ButtonBase onPress={handlePress} disabled buttonStyle={{ backgroundColor: '#007AFF' }}>
        Disabled Button
      </ButtonBase>

      <Text className="text-lg font-bold mt-5 mb-2.5 self-start">Loading States</Text>
      
      <ButtonBase onPress={handlePress} loading={basicLoading} buttonStyle={{ backgroundColor: '#007AFF' }}>
        Loading Button
      </ButtonBase>
      
      <ButtonBase onPress={handlePress} loading={customTextLoading} buttonStyle={{ backgroundColor: '#007AFF' }}>
        Custom Text Loading
      </ButtonBase>
      
      {/* Custom render for spinner (since showSpinner is in interface but not implemented natively) */}
      <ButtonBase
        onPress={handlePress}
        loading={spinnerLoading}
        renderContent={(state: ButtonBaseState) => (
          <View className="flex-row items-center">
            {state.isLoading && spinnerLoading.showSpinner && <ActivityIndicator color={ProfessionalGrays.light} className="mr-2" />}
            <Text className="text-white">{state.isLoading ? (spinnerLoading.loadingText || 'Loading...') : 'Button with Spinner'}</Text>
          </View>
        )}
        buttonStyle={{ backgroundColor: '#007AFF' }}
      >
        Button with Spinner
      </ButtonBase>
      
      {/* Simulated dynamic loading */}
      <ButtonBase onPress={handleLoadingPress} loading={{ isLoading: loadingExample }} buttonStyle={{ backgroundColor: '#007AFF' }}>
        Trigger Loading (2s)
      </ButtonBase>

      <Text className="text-lg font-bold mt-5 mb-2.5 self-start">Event Handlers</Text>
      
      <ButtonBase
        onPress={handlePress}
        onLongPress={handleLongPress}
        onPressIn={() => console.log('Press In')}
        onPressOut={() => console.log('Press Out')}
        onFocus={() => console.log('Focus')}
        onBlur={() => console.log('Blur')}
        buttonStyle={{ backgroundColor: '#007AFF' }}
      >
        All Handlers Button
      </ButtonBase>

      <Text className="text-lg font-bold mt-5 mb-2.5 self-start">Configurations</Text>
      
      <ButtonBase onPress={handlePress} config={noAnimationConfig} buttonStyle={{ backgroundColor: '#007AFF' }}>
        No Press Animation
      </ButtonBase>
      
      <ButtonBase onPress={handlePress} config={noHapticsConfig} buttonStyle={{ backgroundColor: '#007AFF' }}>
        No Haptics
      </ButtonBase>
      
      <ButtonBase onPress={handlePress} config={customDurationConfig} buttonStyle={{ backgroundColor: '#007AFF' }}>
        Custom Duration & Scale
      </ButtonBase>

      <Text className="text-lg font-bold mt-5 mb-2.5 self-start">Custom Animations & Content</Text>
      
      <ButtonBase
        onPress={handlePress}
        customAnimations={customAnimations}
        renderContent={(state: ButtonBaseState) => (
          <Text className="text-white">
            {state.isPressed ? 'Pressed!' : (state.isFocused ? 'Focused!' : 'Custom Render')}
          </Text>
        )}
        buttonStyle={{ backgroundColor: '#007AFF' }}
      >
        Custom Animations
      </ButtonBase>

      <Text className="text-lg font-bold mt-5 mb-2.5 self-start">Accessibility Props</Text>
      
      <ButtonBase
        onPress={handlePress}
        accessibilityLabel="Accessible Button"
        accessibilityHint="Demonstrates accessibility props"
        buttonStyle={{ backgroundColor: '#007AFF' }}
      >
        Accessible Button
      </ButtonBase>
      <NextButton nextScreen="ButtonFloatingScreen" label="Go Next" />
    </ScrollView>
  );
};

export default ButtonBaseScreen;