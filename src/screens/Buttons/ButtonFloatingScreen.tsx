/**
 * ButtonFloating Demo Screen
 * 
 * This screen demonstrates all functionalities of the ButtonFloating component,
 * including different sizes, animations, states (disabled), custom gradients, 
 * haptic feedback, shadow effects, animation speeds, shadow intensities, and event handlers.
 * It is designed to work on both iOS and Android.
 * 
 * @module ButtonFloating
 * @version 1.0.0
 * @since 2024
 */

import React, { useState } from 'react';
import { ScrollView, Text, Alert } from 'react-native';
import { ButtonFloating, ButtonFloatingProps } from '../../components/buttons/ButtonFloating'; // Adjust path if necessary, assuming component is in same file or separate
import NextButton from '../../components/NextButton';
import ScreenHeading from '../../components/ScreenHeading';

const ButtonFloatingScreen: React.FC = () => {
  const handlePress = () => {
    Alert.alert('FAB Pressed', 'Floating Action Button press event triggered.');
  };

  // Example custom gradient
  const customGradient: [string, string] = ['#FF0000', '#00FF00']; // Red to Green for demo

  return (
    <ScrollView contentContainerClassName="p-5 items-center">
      <ScreenHeading title="ButtonFloating Demo" />
      <Text className="text-lg font-bold mt-5 mb-2.5 self-start">Button Sizes</Text>
      
      <ButtonFloating onPress={handlePress} size="standard" style={{ marginBottom: 10 }}>
        <Text className="text-white text-3xl font-bold">+</Text>
      </ButtonFloating>
      
      <ButtonFloating onPress={handlePress} size="mini" style={{ marginBottom: 10 }}>
        <Text className="text-white text-xl font-bold">+</Text>
      </ButtonFloating>

      <Text className="text-lg font-bold mt-5 mb-2.5 self-start">Animation Types</Text>
      
      <ButtonFloating onPress={handlePress} animation="pulse" style={{ marginBottom: 10 }}>
        <Text className="text-white text-3xl font-bold">P</Text>
      </ButtonFloating>
      
      <ButtonFloating onPress={handlePress} animation="orbital" style={{ marginBottom: 10 }}>
        <Text className="text-white text-3xl font-bold">O</Text>
      </ButtonFloating>
      
      <ButtonFloating onPress={handlePress} animation="static" style={{ marginBottom: 10 }}>
        <Text className="text-white text-3xl font-bold">S</Text>
      </ButtonFloating>

      <Text className="text-lg font-bold mt-5 mb-2.5 self-start">Disabled State</Text>
      
      <ButtonFloating onPress={handlePress} disabled style={{ marginBottom: 10 }}>
        <Text className="text-white text-3xl font-bold">D</Text>
      </ButtonFloating>

      <Text className="text-lg font-bold mt-5 mb-2.5 self-start">Custom Gradient</Text>
      
      <ButtonFloating onPress={handlePress} gradientColors={customGradient} style={{ marginBottom: 10 }}>
        <Text className="text-white text-3xl font-bold">G</Text>
      </ButtonFloating>

      <Text className="text-lg font-bold mt-5 mb-2.5 self-start">Configurations</Text>
      
      <ButtonFloating onPress={handlePress} enableHaptics={false} style={{ marginBottom: 10 }}>
        <Text className="text-white text-3xl font-bold">No Haptics</Text>
      </ButtonFloating>
      
      <ButtonFloating onPress={handlePress} enableShadow={false} style={{ marginBottom: 10 }}>
        <Text className="text-white text-3xl font-bold">No Shadow</Text>
      </ButtonFloating>
      
      <ButtonFloating onPress={handlePress} animationSpeed={2.0} animation="pulse" style={{ marginBottom: 10 }}>
        <Text className="text-white text-3xl font-bold">Fast Pulse</Text>
      </ButtonFloating>
      
      <ButtonFloating onPress={handlePress} shadowIntensity={1.5} style={{ marginBottom: 10 }}>
        <Text className="text-white text-3xl font-bold">High Shadow</Text>
      </ButtonFloating>

      <Text className="text-lg font-bold mt-5 mb-2.5 self-start">Accessibility Props</Text>
      
      <ButtonFloating
        onPress={handlePress}
        accessibilityLabel="Accessible FAB"
        accessibilityHint="Demonstrates accessibility props for floating action button"
        style={{ marginBottom: 10 }}
      >
        <Text className="text-white text-3xl font-bold">A</Text>
      </ButtonFloating>

      <Text className="text-lg font-bold mt-5 mb-2.5 self-start">Custom Style</Text>
      
      <ButtonFloating onPress={handlePress} style={{ margin: 20, marginBottom: 10 }}>
        <Text className="text-white text-3xl font-bold">C</Text>
      </ButtonFloating>
      <NextButton nextScreen="ButtonGhostScreen" label="Next" />
    </ScrollView>
  );
};

export default ButtonFloatingScreen;