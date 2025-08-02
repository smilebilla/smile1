import React, { useEffect, useRef, useState } from 'react';
import { Animated, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import {
  batchBlurEffects,
  BlurEffectResult,
  createAccessibleBlur,
  createBackdropBlur,
  createGradientBlur,
  createHeaderScrollBlur,
  createModalBackdropBlur,
  createOverlayBackdropBlur,
  createPrimaryHeaderBlur,
  createScrollBlur,
  createStaticBlur,
  createStatusBarScrollBlur,
  optimizeBlurForPerformance
} from '../../components/foundations/effects/BlurEffects'; // Assuming same directory
import NextButton from '../../components/NextButton';
import ScreenHeading from '../../components/ScreenHeading';

const BlurEffectsScreen: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [blurActive, setBlurActive] = useState(false);
  const [accessibleReducedMotion, setAccessibleReducedMotion] = useState(false);

  // Create instances of all main blur creators
  const staticBlur: BlurEffectResult = createStaticBlur({ intensity: 'medium', saturation: 150 });
  const backdropBlur: BlurEffectResult = createBackdropBlur({ animated: true, duration: 400 });
  const scrollBlur: BlurEffectResult = createScrollBlur({ scrollThreshold: 100, intensity: 'light' });
  const gradientBlur: BlurEffectResult = createGradientBlur({ intensity: 'strong' });
  const motionBlur: BlurEffectResult = createBackdropBlur({ type: 'motion', animated: true }); // Example for motion

  // Preset creators
  const primaryHeaderBlur: BlurEffectResult = createPrimaryHeaderBlur();
  const modalBackdropBlur: BlurEffectResult = createModalBackdropBlur({ opacity: 0.98 });
  const overlayBackdropBlur: BlurEffectResult = createOverlayBackdropBlur({ intensity: 'subtle' });
  const statusBarScrollBlur: BlurEffectResult = createStatusBarScrollBlur({ scrollThreshold: 20 });
  const headerScrollBlur: BlurEffectResult = createHeaderScrollBlur();

  // Performance optimizations
  const lowPerfBlur: BlurEffectResult = optimizeBlurForPerformance(createBackdropBlur(), 'low');
  const mediumPerfBlur: BlurEffectResult = optimizeBlurForPerformance(createStaticBlur(), 'medium');
  const highPerfBlur: BlurEffectResult = optimizeBlurForPerformance(createGradientBlur(), 'high');

  // Accessibility
  const accessibleBlur: BlurEffectResult = createAccessibleBlur({}, accessibleReducedMotion);

  // Batch effects example
  useEffect(() => {
    const blursToBatch = [backdropBlur, modalBackdropBlur, overlayBackdropBlur];
    batchBlurEffects(blursToBatch, 150); // Stagger by 150ms
  }, []);

  // Scroll handling for progressive-like activation
  const scrollY = useRef(new Animated.Value(0)).current;
  const handleScroll = Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false });

  // Listener for scrollY
  useEffect(() => {
    const listener = scrollY.addListener(({ value }) => {
      const threshold = scrollBlur.config.scrollThreshold || 50;
      if (value > threshold) {
        scrollBlur.animation.start();
        statusBarScrollBlur.animation.start();
        headerScrollBlur.animation.start();
      } else {
        scrollBlur.animation.stop();
        statusBarScrollBlur.animation.stop();
        headerScrollBlur.animation.stop();
      }
    });
    return () => scrollY.removeListener(listener);
  }, [scrollBlur, statusBarScrollBlur, headerScrollBlur]);

  // Toggle animated blur
  const toggleBackdropBlur = () => {
    setBlurActive(!blurActive);
    if (!blurActive) {
      backdropBlur.animation.start();
      motionBlur.animation.start(); // Include motion as example
    } else {
      backdropBlur.animation.stop();
      motionBlur.animation.stop();
    }
  };

  // Reset all on unmount
  useEffect(() => {
    return () => {
      staticBlur.animation.reset();
      backdropBlur.animation.reset();
      scrollBlur.animation.reset();
      gradientBlur.animation.reset();
      primaryHeaderBlur.animation.reset();
      modalBackdropBlur.animation.reset();
      overlayBackdropBlur.animation.reset();
      statusBarScrollBlur.animation.reset();
      headerScrollBlur.animation.reset();
      lowPerfBlur.animation.reset();
      mediumPerfBlur.animation.reset();
      highPerfBlur.animation.reset();
      accessibleBlur.animation.reset();
      motionBlur.animation.reset();
    };
  }, []);

  return (
    <View className="flex-1 bg-gray-900">
      {/* Primary Header with Blur */}
      <Animated.View
        style={[primaryHeaderBlur.style, { height: 60 }]}
        className="justify-center items-center border-b border-gray-700"
      >
        <ScreenHeading title="Blur Effects Demo" />
      </Animated.View>

      {/* Status Bar Scroll Blur Example (simulated as top bar) */}
      <Animated.View
        style={[statusBarScrollBlur.style, { position: 'absolute', top: 0, left: 0, right: 0, height: 30, zIndex: 20 }]}
        className="justify-center items-center"
      >
        <Text className="text-white text-xs">Status Bar Blur</Text>
      </Animated.View>

      {/* ScrollView with content */}
      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        className="flex-1"
        contentContainerStyle={{ paddingTop: 80 }} // Spacer for headers
      >
        {/* Header Scroll Blur */}
        <Animated.View
          style={[headerScrollBlur.style, { position: 'absolute', top: 60, left: 0, right: 0, height: 50, zIndex: 10 }]}
          className="justify-center items-center bg-transparent"
        >
          <Text className="text-white text-base">Scroll Header Blur</Text>
        </Animated.View>

        {/* Static Blur Demo */}
        <View className="p-4">
          <Text className="text-white text-lg mb-2">Static Blur</Text>
          <Animated.View style={staticBlur.style} className="h-24 rounded-lg" />
        </View>

        {/* Gradient Blur Demo */}
        <View className="p-4">
          <Text className="text-white text-lg mb-2">Gradient Blur</Text>
          <Animated.View style={gradientBlur.style} className="h-24 rounded-lg" />
        </View>

        {/* Animated Backdrop Blur Demo */}
        <View className="p-4">
          <Text className="text-white text-lg mb-2">Animated Backdrop/Motion Blur</Text>
          <TouchableOpacity onPress={toggleBackdropBlur} className="bg-blue-600 p-3 rounded-lg mb-4">
            <Text className="text-white text-center">Toggle Blur</Text>
          </TouchableOpacity>
          <Animated.View style={backdropBlur.style} className="h-24 rounded-lg" />
        </View>

        {/* Performance Optimized Blurs */}
        <View className="p-4">
          <Text className="text-white text-lg mb-2">Low Perf Blur</Text>
          <Animated.View style={lowPerfBlur.style} className="h-16 rounded-lg mb-4" />
          <Text className="text-white text-lg mb-2">Medium Perf Blur</Text>
          <Animated.View style={mediumPerfBlur.style} className="h-16 rounded-lg mb-4" />
          <Text className="text-white text-lg mb-2">High Perf Blur</Text>
          <Animated.View style={highPerfBlur.style} className="h-16 rounded-lg" />
        </View>

        {/* Accessible Blur */}
        <View className="p-4">
          <Text className="text-white text-lg mb-2">Accessible Blur (Toggle Reduced Motion)</Text>
          <TouchableOpacity
            onPress={() => setAccessibleReducedMotion(!accessibleReducedMotion)}
            className="bg-purple-600 p-3 rounded-lg mb-4"
          >
            <Text className="text-white text-center">
              {accessibleReducedMotion ? 'Enable Motion' : 'Reduce Motion'}
            </Text>
          </TouchableOpacity>
          <Animated.View style={accessibleBlur.style} className="h-24 rounded-lg" />
        </View>

        {/* Scroll Blur Demo Section */}
        <View className="p-4">
          <Text className="text-white text-lg mb-2">Scroll Blur (Scroll to Activate)</Text>
          <Animated.View style={scrollBlur.style} className="h-24 rounded-lg" />
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

      {/* Button to Open Modal */}
      <TouchableOpacity onPress={() => setShowModal(true)} className="bg-green-600 p-4 m-4 rounded-lg">
        <Text className="text-white text-center text-lg">Open Modal with Blur Backdrop</Text>
      </TouchableOpacity>

      {/* Button to Open Overlay */}
      <TouchableOpacity onPress={() => setShowOverlay(true)} className="bg-yellow-600 p-4 m-4 rounded-lg">
        <Text className="text-white text-center text-lg">Open Overlay with Blur</Text>
      </TouchableOpacity>

      {/* Modal Demo */}
      <Modal visible={showModal} transparent animationType="fade" onRequestClose={() => setShowModal(false)}>
        <Animated.View style={[modalBackdropBlur.style, { flex: 1 }]} onLayout={modalBackdropBlur.animation.start}>
          <View className="flex-1 justify-center items-center">
            <View className="bg-white p-8 rounded-lg w-4/5 max-w-sm">
              <Text className="text-gray-900 text-xl mb-4 text-center">Modal with Blur Backdrop</Text>
              <TouchableOpacity onPress={() => setShowModal(false)} className="bg-red-600 p-3 rounded-lg">
                <Text className="text-white text-center">Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </Modal>

      {/* Overlay Demo (simulated as another modal-like) */}
      <Modal visible={showOverlay} transparent animationType="slide" onRequestClose={() => setShowOverlay(false)}>
        <Animated.View style={[overlayBackdropBlur.style, { flex: 1 }]} onLayout={overlayBackdropBlur.animation.start}>
          <View className="flex-1 justify-end items-center">
            <View className="bg-white p-8 rounded-t-lg w-full">
              <Text className="text-gray-900 text-xl mb-4 text-center">Overlay with Blur Backdrop</Text>
              <TouchableOpacity onPress={() => setShowOverlay(false)} className="bg-red-600 p-3 rounded-lg">
                <Text className="text-white text-center">Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </Modal>
      {/* Next Button to navigate to DemoHomePage */}
      <NextButton nextScreen="DepthEffectsScreen" label="Next" />
    </View>
  );
};

export default BlurEffectsScreen;