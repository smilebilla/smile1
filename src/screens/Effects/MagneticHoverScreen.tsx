/**
 * MagneticHoverScreen - Demonstration screen for MagneticHover module
 * 
 * This screen showcases various magnetic hover effects from the MagneticHover module,
 * including the main hook, preset hooks for card/button/floating, custom configurations,
 * state management, controls, and utilities like createMagneticHoverConfig and
 * calculateMagneticBoundaries. Uses NativeWind for styling and works on both iOS and Android
 * (simulates hover with touch gestures).
 * 
 * @component
 * @example
 * <MagneticHoverScreen />
 */

import React, { useEffect, useRef, useState } from 'react';
import { Animated, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import {
    calculateMagneticBoundaries,
    createMagneticHoverConfig,
    MagneticHoverState,
    MagneticSmoothness,
    MagneticStrength,
    useButtonMagneticHover,
    useCardMagneticHover,
    useFloatingMagneticHover,
    useMagneticHover
} from '../../components/foundations/effects/MagneticHover'; // Assuming same directory
import NextButton from '../../components/NextButton';
import ScreenHeading from '../../components/ScreenHeading';

const MagneticHoverScreen: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [strength, setStrength] = useState<MagneticStrength>('normal');
  const [smoothness, setSmoothness] = useState<MagneticSmoothness>('normal');
  const [hoverState, setHoverState] = useState<MagneticHoverState | null>(null);

  // Main hook usage
  const mainRef = useRef<View>(null);
  const mainHover = useMagneticHover({
    strength: strength,
    smoothness: smoothness,
    perspective: 1200,
    transform: {
      rotateX: [-20, 20],
      rotateY: [-20, 20],
      scale: [0.95, 1.05],
    },
    magneticRadius: 250,
    duration: 400,
    enable3D: true,
    boundary: 'bounce',
    performance: {
      reducedMotion: reducedMotion,
      useNativeDriver: true,
      throttle: 20,
    },
  }, mainRef);

  // Card preset
  const cardRef = useRef<View>(null);
  const cardHover = useCardMagneticHover(cardRef);

  // Button preset
  const buttonRef = useRef<View>(null);
  const buttonHover = useButtonMagneticHover(buttonRef);

  // Floating preset
  const floatingRef = useRef<View>(null);
  const floatingHover = useFloatingMagneticHover(floatingRef);

  // Custom config using utility
  const customConfig = createMagneticHoverConfig('strong', 'smooth', 1500);
  const customRef = useRef<View>(null);
  const customHover = useMagneticHover(customConfig, customRef);

  // Calculate boundaries example
  const elementSize = { width: 200, height: 100 };
  const boundaries = calculateMagneticBoundaries(elementSize, 150);

  // Toggle strength
  const toggleStrength = () => {
    const strengths: MagneticStrength[] = ['subtle', 'normal', 'strong', 'extreme'];
    const index = strengths.indexOf(strength);
    const next = strengths[(index + 1) % strengths.length];
    setStrength(next);
    mainHover.controls.updateConfig({ strength: next });
  };

  // Toggle smoothness
  const toggleSmoothness = () => {
    const smooths: MagneticSmoothness[] = ['instant', 'fast', 'normal', 'smooth', 'slow'];
    const index = smooths.indexOf(smoothness);
    const next = smooths[(index + 1) % smooths.length];
    setSmoothness(next);
    mainHover.controls.updateConfig({ smoothness: next });
  };

  // Monitor state for one hover
  useEffect(() => {
    const interval = setInterval(() => {
      setHoverState(mainHover.state);
    }, 500);
    return () => clearInterval(interval);
  }, [mainHover.state]);

  // Activate/Deactivate example
  const toggleActivate = () => {
    if (mainHover.state.isHovering) {
      mainHover.controls.deactivate();
    } else {
      mainHover.controls.activate();
    }
  };

  // Reset example
  const resetAll = () => {
    mainHover.controls.reset();
    cardHover.controls.reset();
    buttonHover.controls.reset();
    floatingHover.controls.reset();
    customHover.controls.reset();
  };

  return (
    <View className="flex-1 bg-gray-900">
      {/* Header */}
      <View className="h-16 justify-center items-center border-b border-gray-700 bg-gray-800">
        <ScreenHeading title="Magnetic Hover Demo" />
      </View>

      {/* ScrollView with demos */}
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Main Hook Demo */}
        <View className="p-4">
          <Text className="text-white text-lg mb-2">Main Magnetic Hover (Touch to Interact)</Text>
          <TouchableOpacity onPress={toggleActivate} className="bg-blue-600 p-3 rounded-lg mb-4">
            <Text className="text-white text-center">Toggle Activate/Deactivate</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleStrength} className="bg-green-600 p-3 rounded-lg mb-4">
            <Text className="text-white text-center">Toggle Strength ({strength})</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleSmoothness} className="bg-yellow-600 p-3 rounded-lg mb-4">
            <Text className="text-white text-center">Toggle Smoothness ({smoothness})</Text>
          </TouchableOpacity>
          <Animated.View
            ref={mainRef}
            {...mainHover.panResponder.panHandlers}
            style={mainHover.animatedStyle}
            className="h-32 rounded-lg bg-blue-600 justify-center items-center"
          >
            <Text className="text-white">Main Hover</Text>
          </Animated.View>
          {hoverState && (
            <Text className="text-white mt-2">Current Strength: {hoverState.magneticStrength.toFixed(2)}</Text>
          )}
        </View>

        {/* Card Preset Demo */}
        <View className="p-4">
          <Text className="text-white text-lg mb-2">Card Magnetic Hover</Text>
          <Animated.View
            ref={cardRef}
            {...cardHover.panResponder.panHandlers}
            style={cardHover.animatedStyle}
            className="h-32 rounded-lg bg-green-600 justify-center items-center"
          >
            <Text className="text-white">Card Preset</Text>
          </Animated.View>
        </View>

        {/* Button Preset Demo */}
        <View className="p-4">
          <Text className="text-white text-lg mb-2">Button Magnetic Hover</Text>
          <Animated.View
            ref={buttonRef}
            {...buttonHover.panResponder.panHandlers}
            style={buttonHover.animatedStyle}
            className="h-32 rounded-lg bg-red-600 justify-center items-center"
          >
            <Text className="text-white">Button Preset</Text>
          </Animated.View>
        </View>

        {/* Floating Preset Demo */}
        <View className="p-4">
          <Text className="text-white text-lg mb-2">Floating Magnetic Hover</Text>
          <Animated.View
            ref={floatingRef}
            {...floatingHover.panResponder.panHandlers}
            style={floatingHover.animatedStyle}
            className="h-32 rounded-lg bg-purple-600 justify-center items-center"
          >
            <Text className="text-white">Floating Preset</Text>
          </Animated.View>
        </View>

        {/* Custom Config Demo */}
        <View className="p-4">
          <Text className="text-white text-lg mb-2">Custom Config Magnetic Hover</Text>
          <Animated.View
            ref={customRef}
            {...customHover.panResponder.panHandlers}
            style={customHover.animatedStyle}
            className="h-32 rounded-lg bg-orange-600 justify-center items-center"
          >
            <Text className="text-white">Custom Config</Text>
          </Animated.View>
        </View>

        {/* Utilities Demo */}
        <View className="p-4">
          <Text className="text-white text-lg mb-2">Utilities</Text>
          <Text className="text-white">Boundaries: Left {boundaries.left}, Right {boundaries.right}</Text>
          <TouchableOpacity onPress={resetAll} className="bg-red-600 p-3 rounded-lg mt-4">
            <Text className="text-white text-center">Reset All</Text>
          </TouchableOpacity>
        </View>

        {/* Reduced Motion Toggle */}
        <View className="p-4">
          <TouchableOpacity onPress={() => setReducedMotion(!reducedMotion)} className="bg-purple-600 p-3 rounded-lg">
            <Text className="text-white text-center">{reducedMotion ? 'Enable Motion' : 'Reduce Motion'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal Demo */}
      <Modal visible={showModal} transparent animationType="fade" onRequestClose={() => setShowModal(false)}>
        <View className="flex-1 justify-center items-center bg-black/50">
          <Animated.View
            {...cardHover.panResponder.panHandlers}
            style={cardHover.animatedStyle}
            className="bg-white p-8 rounded-lg w-4/5 max-w-sm"
          >
            <Text className="text-gray-900 text-xl mb-4 text-center">Modal with Magnetic Hover</Text>
            <TouchableOpacity onPress={() => setShowModal(false)} className="bg-red-600 p-3 rounded-lg">
              <Text className="text-white text-center">Close</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>

      {/* Button to Open Modal */}
      <TouchableOpacity onPress={() => setShowModal(true)} className="bg-green-600 p-4 m-4 rounded-lg">
        <Text className="text-white text-center text-lg">Open Modal with Magnetic Hover</Text>
      </TouchableOpacity>
      <NextButton nextScreen="MainDemo" label="Next" />
    </View>
  );
};

export default MagneticHoverScreen;