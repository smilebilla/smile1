/**
 * DepthEffectsScreen - Demonstration screen for DepthEffects module
 * 
 * This screen showcases various depth effects from the DepthEffects module,
 * including elevation, perspective, multi-layered shadows, glow, and more.
 * Uses NativeWind for styling and works on both iOS and Android (with limitations on native for tilt).
 * 
 * @component
 * @example
 * <DepthEffectsScreen />
 */

import React, { useEffect, useRef, useState } from 'react';
import { Animated, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import {
  createAccessibleDepth,
  createCardElevation,
  createDepthFromPreset,
  createGlowDepth,
  createInteractiveTilt,
  DepthEffectsResult,
  ElevationLevel,
  PARALLAX_DEPTH_PRESET
} from '../../components/foundations/effects/DepthEffects'; // Assuming same directory
import NextButton from '../../components/NextButton';
import ScreenHeading from '../../components/ScreenHeading';

const DepthEffectsScreen: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [elevationLevel, setElevationLevel] = useState<ElevationLevel>('md');

  // Create instances
  const cardElevation: DepthEffectsResult = createCardElevation();
  const interactiveTilt: DepthEffectsResult = createInteractiveTilt();
  const glowDepth: DepthEffectsResult = createGlowDepth();
  const parallaxDepth: DepthEffectsResult = createDepthFromPreset(PARALLAX_DEPTH_PRESET);
  const accessibleDepth: DepthEffectsResult = createAccessibleDepth({ respectReducedMotion: reducedMotion });

  // Example for motion (perspective)
  const motionDepth: DepthEffectsResult = createInteractiveTilt({ type: 'perspective' });

  // Batch or init
  useEffect(() => {
    // Example add layer
    cardElevation.addLayer({
      index: 2,
      offset: 4,
      opacity: 0.1,
      blur: 8,
      scale: 1.05,
      tint: '#FF0000',
      blendMode: 'overlay',
    });
  }, []);

  // Scroll for parallax simulation (simple translate based on scroll)
  const scrollY = useRef(new Animated.Value(0)).current;
  const handleScroll = Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false });

  useEffect(() => {
    const listener = scrollY.addListener(({ value }) => {
      // For parallax, set perspective based on scroll (example)
      const rotX = Math.min(15, value / 10);
      parallaxDepth.setPerspective(rotX, 0);
    });
    return () => scrollY.removeListener(listener);
  }, [parallaxDepth]);

  // Toggle elevation example
  const toggleElevation = () => {
    const levels: ElevationLevel[] = ['sm', 'md', 'lg', 'xl'];
    const currentIndex = levels.indexOf(elevationLevel);
    const nextLevel = levels[(currentIndex + 1) % levels.length];
    setElevationLevel(nextLevel);
    cardElevation.setElevation(nextLevel);
  };

  // Reset on unmount
  useEffect(() => {
    return () => {
      cardElevation.cleanup();
      interactiveTilt.cleanup();
      glowDepth.cleanup();
      parallaxDepth.cleanup();
      accessibleDepth.cleanup();
      motionDepth.cleanup();
    };
  }, []);

  return (
    <View className="flex-1 bg-gray-900">
      {/* Primary Header with Depth */}
      <Animated.View
        ref={cardElevation.ref}
        style={cardElevation.style}
        {...cardElevation.handlers}
        className="h-16 justify-center items-center border-b border-gray-700 bg-gray-800"
      >
        <ScreenHeading title="Depth Effects Demo" />
      </Animated.View>

      {/* ScrollView with content */}
      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        className="flex-1"
      >
        {/* Depth Card Gallery */}
        <View className="p-4">
          <Text className="text-white text-xl font-bold mb-4">Depth Card Gallery</Text>
          <View className="flex flex-col md:flex-row gap-4 justify-center items-stretch">
            {/* Card with Elevation */}
            <View className="flex-1">
              <Text className="text-white text-center mb-2">Elevation</Text>
              <Animated.View
                ref={cardElevation.ref}
                style={cardElevation.style}
                {...cardElevation.handlers}
                className="h-32 rounded-lg bg-white justify-center items-center mb-2"
              >
                <Text className="text-gray-900 font-bold">Card Elevation</Text>
              </Animated.View>
            </View>
            {/* Tilt Card */}
            <View className="flex-1">
              <Text className="text-white text-center mb-2">Tilt</Text>
              <Animated.View
                ref={interactiveTilt.ref}
                style={interactiveTilt.style}
                {...interactiveTilt.handlers}
                className="h-32 rounded-lg bg-white justify-center items-center mb-2"
              >
                <Text className="text-gray-900 font-bold">Tilt Card</Text>
              </Animated.View>
            </View>
            {/* Glow Card */}
            <View className="flex-1">
              <Text className="text-white text-center mb-2">Glow</Text>
              <Animated.View
                ref={glowDepth.ref}
                style={glowDepth.style}
                {...glowDepth.handlers}
                className="h-32 rounded-lg bg-white justify-center items-center mb-2"
              >
                <Text className="text-gray-900 font-bold">Glow Card</Text>
              </Animated.View>
            </View>
          </View>
        </View>

        {/* Card Elevation Demo */}
        <View className="p-4">
          <Text className="text-white text-lg mb-2">Card Elevation (Toggle Level)</Text>
          <TouchableOpacity onPress={toggleElevation} className="bg-blue-600 p-3 rounded-lg mb-4">
            <Text className="text-white text-center">Toggle Elevation ({elevationLevel})</Text>
          </TouchableOpacity>
          <Animated.View
            ref={cardElevation.ref}
            style={cardElevation.style}
            {...cardElevation.handlers}
            className="h-24 rounded-lg bg-white justify-center items-center"
          >
            <Text className="text-gray-900">Card with Elevation</Text>
          </Animated.View>
        </View>

        {/* Interactive Tilt Demo (Web-only for tilt) */}
        <View className="p-4">
          <Text className="text-white text-lg mb-2">Interactive Tilt (Hover on Web)</Text>
          <Animated.View
            ref={interactiveTilt.ref}
            style={interactiveTilt.style}
            {...interactiveTilt.handlers}
            className="h-24 rounded-lg bg-white justify-center items-center"
          >
            <Text className="text-gray-900">Tilt Card</Text>
          </Animated.View>
        </View>

        {/* Glow Depth Demo */}
        <View className="p-4">
          <Text className="text-white text-lg mb-2">Glow Depth</Text>
          <Animated.View
            ref={glowDepth.ref}
            style={glowDepth.style}
            {...glowDepth.handlers}
            className="h-24 rounded-lg bg-white justify-center items-center"
          >
            <Text className="text-gray-900">Glow Effect</Text>
          </Animated.View>
        </View>

        {/* Parallax Depth Demo (Scroll to see perspective change) */}
        <View className="p-4">
          <Text className="text-white text-lg mb-2">Parallax Depth (Scroll to Tilt)</Text>
          <Animated.View
            ref={parallaxDepth.ref}
            style={parallaxDepth.style}
            {...parallaxDepth.handlers}
            className="h-24 rounded-lg bg-white justify-center items-center"
          >
            <Text className="text-gray-900">Parallax Layer</Text>
          </Animated.View>
        </View>

        {/* Accessible Depth */}
        <View className="p-4">
          <Text className="text-white text-lg mb-2">Accessible Depth (Toggle Reduced Motion)</Text>
          <TouchableOpacity
            onPress={() => setReducedMotion(!reducedMotion)}
            className="bg-purple-600 p-3 rounded-lg mb-4"
          >
            <Text className="text-white text-center">
              {reducedMotion ? 'Enable Motion' : 'Reduce Motion'}
            </Text>
          </TouchableOpacity>
          <Animated.View
            ref={accessibleDepth.ref}
            style={accessibleDepth.style}
            {...accessibleDepth.handlers}
            className="h-24 rounded-lg bg-white justify-center items-center"
          >
            <Text className="text-gray-900">Accessible Card</Text>
          </Animated.View>
        </View>

        {/* Motion Depth Demo */}
        <View className="p-4">
          <Text className="text-white text-lg mb-2">Motion Depth</Text>
          <Animated.View
            ref={motionDepth.ref}
            style={motionDepth.style}
            {...motionDepth.handlers}
            className="h-24 rounded-lg bg-white justify-center items-center"
          >
            <Text className="text-gray-900">Motion Effect</Text>
          </Animated.View>
        </View>

        {/* Dummy content for scrolling */}
        <View className="h-96 bg-gray-800 m-4 rounded-lg justify-center items-center">
          <Text className="text-white">Scroll Down</Text>
        </View>
        <View className="h-96 bg-gray-700 m-4 rounded-lg justify-center items-center">
          <Text className="text-white">More Content</Text>
        </View>
        <View className="h-96 bg-gray-600 m-4 rounded-lg justify-center items-center">
          <Text className="text-white">End of Scroll</Text>
        </View>
      </ScrollView>
      {/* Next Button to navigate to BlurEffectsScreen */}
      <NextButton nextScreen="GlassMorphismScreen" label="Next" />

      {/* Modal Demo */}
      <Modal visible={showModal} transparent animationType="fade" onRequestClose={() => setShowModal(false)}>
        <View className="flex-1 justify-center items-center bg-black/50">
          <Animated.View
            ref={glowDepth.ref}
            style={glowDepth.style}
            {...glowDepth.handlers}
            className="bg-white p-8 rounded-lg w-4/5 max-w-sm"
          >
            <Text className="text-gray-900 text-xl mb-4 text-center">Modal with Glow Depth</Text>
            <TouchableOpacity onPress={() => setShowModal(false)} className="bg-red-600 p-3 rounded-lg">
              <Text className="text-white text-center">Close</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

export default DepthEffectsScreen;