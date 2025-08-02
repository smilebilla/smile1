/**
 * GlassMorphismScreen - Demonstration screen for GlassMorphism module
 * 
 * This screen showcases various glass morphism effects from the GlassMorphism module,
 * including intensity presets, component-specific presets, custom configurations,
 * layered effects, gradient depth, animations, and optimizations for mobile and accessibility.
 * Uses NativeWind for styling and works on both iOS and Android with fallbacks.
 * 
 * @component
 * @example
 * <GlassMorphismScreen />
 */

import React, { useEffect, useState } from 'react';
import { Animated, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import {
    BUTTON_GLASS_PRESET,
    CARD_GLASS_PRESET,
    COSMIC_GLASS_PRESET,
    createAccessibleGlassMorphism,
    createAnimatedGlassMorphism,
    createCustomGlassMorphism,
    createDepthGradientGlass,
    createGlassMorphismStyle,
    createLayeredGlassMorphism,
    createMobileOptimizedGlass,
    FLOATING_GLASS_PRESET,
    getComponentGlassPreset,
    getGlassMorphismPreset,
    getOptimizedBlurValue,
    GlassMorphismIntensity,
    GlassMorphismPreset,
    HEADER_GLASS_PRESET,
    LIGHT_GLASS_PRESET,
    MEDIUM_GLASS_PRESET,
    MODAL_GLASS_PRESET,
    NAVIGATION_GLASS_PRESET,
    OVERLAY_GLASS_PRESET,
    SIDEBAR_GLASS_PRESET,
    STRONG_GLASS_PRESET,
    SUBTLE_GLASS_PRESET,
    supportsBackdropFilter
} from '../../components/foundations/effects/GlassMorphism'; // Assuming same directory
import NextButton from '../../components/NextButton';
import ScreenHeading from '../../components/ScreenHeading';

const GlassMorphismScreen: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [highPerformance, setHighPerformance] = useState(false);
  const [intensity, setIntensity] = useState<GlassMorphismIntensity>('medium');
  const [preset, setPreset] = useState<GlassMorphismPreset>('card');
  const [supportsBlur, setSupportsBlur] = useState(false);
  const [animatedBlur, setAnimatedBlur] = useState(new Animated.Value(0));

  // Custom config example
  const customConfig = createCustomGlassMorphism('rgba(0, 255, 0, 0.2)', 15, 'rgba(0, 255, 0, 0.5)', 2, 20);
  const customStyle = createGlassMorphismStyle(customConfig);

  // Animated config example
  const animatedConfig = createAnimatedGlassMorphism(MEDIUM_GLASS_PRESET, {
    duration: 500,
    easing: 'ease-in-out',
    properties: ['blur', 'opacity'],
  });

  // Layered example
  const layeredConfigs = createLayeredGlassMorphism(3, 'strong');

  // Gradient depth example
  const gradientConfig = createDepthGradientGlass(STRONG_GLASS_PRESET, 0.7);

  // Mobile optimized example
  const mobileOptimizedStyle = createMobileOptimizedGlass(COSMIC_GLASS_PRESET, highPerformance);

  // Accessible example
  const accessibleStyle = createAccessibleGlassMorphism(SUBTLE_GLASS_PRESET, highContrast);

  // Preset styles
  const lightStyle = createGlassMorphismStyle(LIGHT_GLASS_PRESET);
  const mediumStyle = createGlassMorphismStyle(MEDIUM_GLASS_PRESET);
  const strongStyle = createGlassMorphismStyle(STRONG_GLASS_PRESET);
  const subtleStyle = createGlassMorphismStyle(SUBTLE_GLASS_PRESET);
  const cosmicStyle = createGlassMorphismStyle(COSMIC_GLASS_PRESET);

  // Component presets
  const cardStyle = createGlassMorphismStyle(CARD_GLASS_PRESET);
  const modalStyle = createGlassMorphismStyle(MODAL_GLASS_PRESET);
  const navigationStyle = createGlassMorphismStyle(NAVIGATION_GLASS_PRESET);
  const headerStyle = createGlassMorphismStyle(HEADER_GLASS_PRESET);
  const buttonStyle = createGlassMorphismStyle(BUTTON_GLASS_PRESET);
  const sidebarStyle = createGlassMorphismStyle(SIDEBAR_GLASS_PRESET);
  const floatingStyle = createGlassMorphismStyle(FLOATING_GLASS_PRESET);
  const overlayStyle = createGlassMorphismStyle(OVERLAY_GLASS_PRESET);

  // Get preset examples
  const presetIntensityStyle = createGlassMorphismStyle(getGlassMorphismPreset(intensity));
  const presetComponentStyle = createGlassMorphismStyle(getComponentGlassPreset(preset));

  // Optimized blur example
  const optimizedBlur = getOptimizedBlurValue('blur(20px)');

  useEffect(() => {
    setSupportsBlur(supportsBackdropFilter());

    // Animate example
    Animated.timing(animatedBlur, {
      toValue: 1,
      duration: animatedConfig.animation.duration,
      useNativeDriver: false,
    }).start();
  }, []);

  // Toggle intensity
  const toggleIntensity = () => {
    const intensities: GlassMorphismIntensity[] = ['light', 'medium', 'strong', 'subtle', 'cosmic'];
    const currentIndex = intensities.indexOf(intensity);
    setIntensity(intensities[(currentIndex + 1) % intensities.length]);
  };

  // Toggle preset
  const togglePreset = () => {
    const presets: GlassMorphismPreset[] = ['card', 'modal', 'navigation', 'header', 'button', 'sidebar', 'floating', 'overlay'];
    const currentIndex = presets.indexOf(preset);
    setPreset(presets[(currentIndex + 1) % presets.length]);
  };

  return (
    <View className="flex-1 bg-gray-900">
      {/* Header with Glass */}
      <View style={headerStyle} className="h-16 justify-center items-center border-b border-gray-700">
        <ScreenHeading title="Glass Morphism Demo" />
      </View>

      {/* ScrollView with content */}
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Intensity Presets Section */}
        <View className="p-4">
          <Text className="text-white text-lg mb-2">Intensity Presets</Text>
          <View style={lightStyle} className="h-20 mb-2 rounded-lg justify-center items-center">
            <Text className="text-white">Light</Text>
          </View>
          <View style={mediumStyle} className="h-20 mb-2 rounded-lg justify-center items-center">
            <Text className="text-white">Medium</Text>
          </View>
          <View style={strongStyle} className="h-20 mb-2 rounded-lg justify-center items-center">
            <Text className="text-white">Strong</Text>
          </View>
          <View style={subtleStyle} className="h-20 mb-2 rounded-lg justify-center items-center">
            <Text className="text-white">Subtle</Text>
          </View>
          <View style={cosmicStyle} className="h-20 mb-2 rounded-lg justify-center items-center">
            <Text className="text-white">Cosmic</Text>
          </View>
        </View>

        {/* Component Presets Section */}
        <View className="p-4">
          <Text className="text-white text-lg mb-2">Component Presets</Text>
          <View style={cardStyle} className="h-20 mb-2 rounded-lg justify-center items-center">
            <Text className="text-white">Card</Text>
          </View>
          <View style={navigationStyle} className="h-20 mb-2 rounded-lg justify-center items-center">
            <Text className="text-white">Navigation</Text>
          </View>
          <View style={buttonStyle} className="h-20 mb-2 rounded-lg justify-center items-center">
            <Text className="text-white">Button</Text>
          </View>
          <View style={sidebarStyle} className="h-20 mb-2 rounded-lg justify-center items-center">
            <Text className="text-white">Sidebar</Text>
          </View>
          <View style={floatingStyle} className="h-20 mb-2 rounded-lg justify-center items-center">
            <Text className="text-white">Floating</Text>
          </View>
        </View>

        {/* Get Preset Examples */}
        <View className="p-4">
          <Text className="text-white text-lg mb-2">Dynamic Presets (Toggle)</Text>
          <TouchableOpacity onPress={toggleIntensity} className="bg-blue-600 p-3 rounded-lg mb-4">
            <Text className="text-white text-center">Toggle Intensity ({intensity})</Text>
          </TouchableOpacity>
          <View style={presetIntensityStyle} className="h-20 mb-2 rounded-lg justify-center items-center">
            <Text className="text-white">Intensity Preset</Text>
          </View>
          <TouchableOpacity onPress={togglePreset} className="bg-blue-600 p-3 rounded-lg mb-4">
            <Text className="text-white text-center">Toggle Preset ({preset})</Text>
          </TouchableOpacity>
          <View style={presetComponentStyle} className="h-20 mb-2 rounded-lg justify-center items-center">
            <Text className="text-white">Component Preset</Text>
          </View>
        </View>

        {/* Custom and Utilities */}
        <View className="p-4">
          <Text className="text-white text-lg mb-2">Custom Glass</Text>
          <View style={customStyle} className="h-20 mb-2 rounded-lg justify-center items-center">
            <Text className="text-white">Custom</Text>
          </View>
          <Text className="text-white text-lg mb-2">Optimized Blur: {optimizedBlur}</Text>
          <Text className="text-white text-lg mb-2">Supports Backdrop: {supportsBlur ? 'Yes' : 'No'}</Text>
        </View>

        {/* Layered Glass */}
        <View className="p-4">
          <Text className="text-white text-lg mb-2">Layered Glass</Text>
          {layeredConfigs.map((layerConfig, index) => (
            <View key={index} style={createGlassMorphismStyle(layerConfig)} className="h-20 mb-2 rounded-lg justify-center items-center absolute top-0 left-0 right-0">
              <Text className="text-white">Layer {index + 1}</Text>
            </View>
          ))}
        </View>

        {/* Gradient Depth */}
        <View className="p-4">
          <Text className="text-white text-lg mb-2">Gradient Depth</Text>
          <View style={createGlassMorphismStyle(gradientConfig)} className="h-20 mb-2 rounded-lg justify-center items-center">
            <Text className="text-white">Gradient</Text>
          </View>
        </View>

        {/* Mobile Optimized */}
        <View className="p-4">
          <Text className="text-white text-lg mb-2">Mobile Optimized (Toggle Perf)</Text>
          <TouchableOpacity onPress={() => setHighPerformance(!highPerformance)} className="bg-purple-600 p-3 rounded-lg mb-4">
            <Text className="text-white text-center">{highPerformance ? 'Low Perf' : 'High Perf'}</Text>
          </TouchableOpacity>
          <View style={mobileOptimizedStyle} className="h-20 mb-2 rounded-lg justify-center items-center">
            <Text className="text-white">Optimized</Text>
          </View>
        </View>

        {/* Accessible */}
        <View className="p-4">
          <Text className="text-white text-lg mb-2">Accessible (Toggle Contrast)</Text>
          <TouchableOpacity onPress={() => setHighContrast(!highContrast)} className="bg-purple-600 p-3 rounded-lg mb-4">
            <Text className="text-white text-center">{highContrast ? 'Normal' : 'High Contrast'}</Text>
          </TouchableOpacity>
          <View style={accessibleStyle} className="h-20 mb-2 rounded-lg justify-center items-center">
            <Text className="text-white">Accessible</Text>
          </View>
        </View>
      </ScrollView>
      {/* Next Button to navigate to MainDemo */}
      <NextButton nextScreen="GlowEffectsScreen" label="Next" />

      {/* Button to Open Modal */}
      <TouchableOpacity onPress={() => setShowModal(true)} className="bg-green-600 p-4 m-4 rounded-lg">
        <Text className="text-white text-center text-lg">Open Modal with Glass</Text>
      </TouchableOpacity>

      {/* Button to Open Overlay */}
      <TouchableOpacity onPress={() => setShowOverlay(true)} className="bg-yellow-600 p-4 m-4 rounded-lg">
        <Text className="text-white text-center text-lg">Open Overlay with Glass</Text>
      </TouchableOpacity>

      {/* Modal Demo */}
      <Modal visible={showModal} transparent animationType="fade" onRequestClose={() => setShowModal(false)}>
        <View style={modalStyle} className="flex-1 justify-center items-center">
          <View className="bg-transparent p-8 rounded-lg w-4/5 max-w-sm">
            <Text className="text-white text-xl mb-4 text-center">Modal with Glass Backdrop</Text>
            <TouchableOpacity onPress={() => setShowModal(false)} className="bg-red-600 p-3 rounded-lg">
              <Text className="text-white text-center">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Overlay Demo */}
      <Modal visible={showOverlay} transparent animationType="slide" onRequestClose={() => setShowOverlay(false)}>
        <View style={overlayStyle} className="flex-1 justify-end items-center">
          <View className="bg-transparent p-8 rounded-t-lg w-full">
            <Text className="text-white text-xl mb-4 text-center">Overlay with Glass</Text>
            <TouchableOpacity onPress={() => setShowOverlay(false)} className="bg-red-600 p-3 rounded-lg">
              <Text className="text-white text-center">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default GlassMorphismScreen;