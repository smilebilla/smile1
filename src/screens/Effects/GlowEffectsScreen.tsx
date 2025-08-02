/**
 * GlowEffectsScreen - Demonstration screen for GlowEffects module
 * 
 * This screen showcases various glow effects from the GlowEffects module,
 * including pulse, hover, static, subtle, themed glows, combined effects,
 * responsive intensity, accessible glows, performance optimizations,
 * and batch animations. Uses NativeWind for styling and works on both iOS and Android.
 * 
 * @component
 * @example
 * <GlowEffectsScreen />
 */

import React, { useEffect, useState } from 'react';
import { Animated, Modal, ScrollView, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import {
    batchGlowAnimations,
    BUTTON_GLOW_PRESETS,
    CARD_GLOW_PRESETS,
    COLOR_HARMONY_PALETTES,
    ColorHarmonyTheme,
    COSMIC_HARMONY_GLOWS,
    createAccessibleGlow,
    createCombinedGlow,
    createGlowEffect,
    createHoverGlow,
    createPulseGlow,
    createResponsiveGlowIntensity,
    createStaticGlow,
    createSubtleGlow,
    createThemedGlow,
    DEFAULT_HOVER_GLOW,
    DEFAULT_PULSE_GLOW,
    DEFAULT_STATIC_GLOW,
    getColorHarmonyPalette,
    GlowEffectResult,
    ICON_GLOW_PRESETS,
    LUXURY_GOLD_GLOWS,
    optimizeGlowForPerformance,
    PulseGlowConfig,
    ROYAL_PURPLE_GLOWS,
    SIGNATURE_BLUE_GLOWS,
    TEXT_GLOW_PRESETS
} from '../../components/foundations/effects/GlowEffects'; // Assuming same directory
import NextButton from '../../components/NextButton';
import ScreenHeading from '../../components/ScreenHeading';

// Mock color palettes if not defined
const SignatureBlues = { glow: '#2E86DE' };
const RoyalPurples = { glow: '#6C5CE7' };
const LuxuryGolds = { shimmer: '#FFD700' };

const GlowEffectsScreen: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [theme, setTheme] = useState<ColorHarmonyTheme>('signature');
  const [performanceLevel, setPerformanceLevel] = useState<'low' | 'medium' | 'high'>('medium');
  const [screenSize, setScreenSize] = useState<'small' | 'medium' | 'large'>('medium');
  const dimensions = useWindowDimensions();

  useEffect(() => {
    // Mock screen size
    if (dimensions.width < 400) setScreenSize('small');
    else if (dimensions.width < 800) setScreenSize('medium');
    else setScreenSize('large');
  }, [dimensions.width]);

  // Create instances of main glow creators
  const pulseGlow: GlowEffectResult = createPulseGlow({ color: '#FF0000' });
  const hoverGlow: GlowEffectResult = createHoverGlow({ color: '#00FF00' });
  const staticGlow: GlowEffectResult = createStaticGlow({ color: '#0000FF' });
  const subtleGlow: GlowEffectResult = createSubtleGlow();

  // Header glow
  const headerGlow: GlowEffectResult = createStaticGlow({ color: '#2E86DE', opacity: 0.5, blur: 24 });

  // Create glow effect by type
  const typedGlow: GlowEffectResult = createGlowEffect('pulse', { duration: 2000 });

  // Themed glow
  const themedGlow: GlowEffectResult = createThemedGlow('static', theme);

  // Combined glows
  const combinedGlows: GlowEffectResult[] = createCombinedGlow([
    { type: 'pulse', config: { color: '#FF00FF' } },
    { type: 'static', config: { opacity: 0.4 } },
  ]);

  // Responsive intensity
  const responsiveIntensity = createResponsiveGlowIntensity(0.7, screenSize);

  // Accessible glow
  const accessibleGlow: GlowEffectResult = createAccessibleGlow('pulse', {}, reducedMotion);

  // Color harmony palette
  const harmonyPalette = getColorHarmonyPalette(theme);

  // Presets
  const signaturePulse = createPulseGlow(SIGNATURE_BLUE_GLOWS.pulse);
  const royalHover = createHoverGlow(ROYAL_PURPLE_GLOWS.hover);
  const luxuryStatic = createStaticGlow(LUXURY_GOLD_GLOWS.static);
  const cosmicSubtle = createSubtleGlow(COSMIC_HARMONY_GLOWS.subtle);

  // Component presets
  const buttonPrimary = createHoverGlow(BUTTON_GLOW_PRESETS.primary.config);
  const cardFeatured = createStaticGlow(CARD_GLOW_PRESETS.featured.config);
  const iconNotification = createPulseGlow(ICON_GLOW_PRESETS.notification.config as Partial<PulseGlowConfig>);
  const textLink = createHoverGlow(TEXT_GLOW_PRESETS.link.config);

  // Optimized glow
  const optimizedGlow: GlowEffectResult = optimizeGlowForPerformance(pulseGlow, performanceLevel);

  // Batch animations
  const batchGlows = [pulseGlow, signaturePulse, iconNotification];
  useEffect(() => {
    batchGlowAnimations(batchGlows, 200);
  }, []);

  // Start animations on mount
  useEffect(() => {
    pulseGlow.animation?.start();
    typedGlow.animation?.start();
    signaturePulse.animation?.start();
    iconNotification.animation?.start();
    return () => {
      pulseGlow.animation?.stop();
      typedGlow.animation?.stop();
      signaturePulse.animation?.stop();
      iconNotification.animation?.stop();
    };
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const themes: ColorHarmonyTheme[] = ['signature', 'mystic', 'luxury', 'cosmic'];
    const currentIndex = themes.indexOf(theme);
    setTheme(themes[(currentIndex + 1) % themes.length]);
  };

  // Toggle performance
  const togglePerformance = () => {
    const levels = ['low', 'medium', 'high'];
    const currentIndex = levels.indexOf(performanceLevel);
    setPerformanceLevel(levels[(currentIndex + 1) % levels.length] as 'low' | 'medium' | 'high');
  };

  // Simulate hover with touch for mobile
  const simulateHoverIn = (glow: GlowEffectResult) => {
    glow.animation?.start();
  };

  const simulateHoverOut = (glow: GlowEffectResult) => {
    glow.animation?.stop();
  };

  return (
    <View className="flex-1 bg-gray-900">
      {/* Header with Glow */}
      <Animated.View style={headerGlow.style} className="h-16 justify-center items-center border-b border-gray-700 bg-gray-800">
        <ScreenHeading title="Glow Effects Demo" />
      </Animated.View>

      {/* ScrollView with content */}
      <ScrollView className="flex-1">
        {/* Pulse Glow Demo */}
        <View className="p-4">
          <Text className="text-white text-lg mb-2">Pulse Glow</Text>
          <Animated.View style={pulseGlow.style} className="h-24 rounded-lg bg-blue-600 justify-center items-center" />
        </View>

        {/* Hover Glow Demo (Simulate with touch) */}
        <View className="p-4">
          <Text className="text-white text-lg mb-2">Hover Glow (Touch to Activate)</Text>
          <TouchableOpacity
            onPressIn={() => simulateHoverIn(hoverGlow)}
            onPressOut={() => simulateHoverOut(hoverGlow)}
          >
            <Animated.View style={hoverGlow.style} className="h-24 rounded-lg bg-green-600 justify-center items-center" />
          </TouchableOpacity>
        </View>

        {/* Static Glow Demo */}
        <View className="p-4">
          <Text className="text-white text-lg mb-2">Static Glow</Text>
          <Animated.View style={staticGlow.style} className="h-24 rounded-lg bg-red-600 justify-center items-center" />
        </View>

        {/* Subtle Glow Demo */}
        <View className="p-4">
          <Text className="text-white text-lg mb-2">Subtle Glow</Text>
          <Animated.View style={subtleGlow.style} className="h-24 rounded-lg bg-purple-600 justify-center items-center" />
        </View>

        {/* Typed Glow Demo */}
        <View className="p-4">
          <Text className="text-white text-lg mb-2">Typed Glow (Pulse)</Text>
          <Animated.View style={typedGlow.style} className="h-24 rounded-lg bg-cyan-600 justify-center items-center" />
        </View>

        {/* Themed Glow Demo */}
        <View className="p-4">
          <Text className="text-white text-lg mb-2">Themed Glow ({theme})</Text>
          <TouchableOpacity onPress={toggleTheme} className="bg-blue-600 p-3 rounded-lg mb-4">
            <Text className="text-white text-center">Toggle Theme</Text>
          </TouchableOpacity>
          <Animated.View style={themedGlow.style} className="h-24 rounded-lg bg-indigo-600 justify-center items-center" />
        </View>

        {/* Combined Glows Demo */}
        <View className="p-4">
          <Text className="text-white text-lg mb-2">Combined Glows</Text>
          {combinedGlows.map((glow, index) => (
            <Animated.View key={index} style={glow.style} className="h-24 rounded-lg bg-pink-600 justify-center items-center mb-2" />
          ))}
        </View>

        {/* Responsive Intensity */}
        <View className="p-4">
          <Text className="text-white text-lg mb-2">Responsive Intensity: {responsiveIntensity} ({screenSize})</Text>
          {/* Apply to a glow config opacity or intensity */}
        </View>

        {/* Accessible Glow */}
        <View className="p-4">
          <Text className="text-white text-lg mb-2">Accessible Glow (Toggle Reduced Motion)</Text>
          <TouchableOpacity onPress={() => setReducedMotion(!reducedMotion)} className="bg-purple-600 p-3 rounded-lg mb-4">
            <Text className="text-white text-center">{reducedMotion ? 'Enable Motion' : 'Reduce Motion'}</Text>
          </TouchableOpacity>
          <Animated.View style={accessibleGlow.style} className="h-24 rounded-lg bg-teal-600 justify-center items-center" />
        </View>

        {/* Color Harmony Palette */}
        <View className="p-4">
          <Text className="text-white text-lg mb-2">Color Harmony Palette</Text>
          <Text className="text-white">Primary: {harmonyPalette.primary}</Text>
          <Text className="text-white">Secondary: {harmonyPalette.secondary}</Text>
          <Text className="text-white">Accent: {harmonyPalette.accent}</Text>
          <Text className="text-white">Glow: {harmonyPalette.glow}</Text>
        </View>

        {/* Preset Glows */}
        <View className="p-4">
          <Text className="text-white text-lg mb-2">Preset Glows</Text>
          <Animated.View style={signaturePulse.style} className="h-20 rounded-lg bg-blue-800 mb-2" />
          <Animated.View style={royalHover.style} className="h-20 rounded-lg bg-purple-800 mb-2" />
          <Animated.View style={luxuryStatic.style} className="h-20 rounded-lg bg-yellow-800 mb-2" />
          <Animated.View style={cosmicSubtle.style} className="h-20 rounded-lg bg-indigo-800 mb-2" />
        </View>

        {/* Component Presets */}
        <View className="p-4">
          <Text className="text-white text-lg mb-2">Component Presets</Text>
          <Animated.View style={buttonPrimary.style} className="h-20 rounded-lg bg-blue-700 mb-2" />
          <Animated.View style={cardFeatured.style} className="h-20 rounded-lg bg-gray-700 mb-2" />
          <Animated.View style={iconNotification.style} className="h-20 rounded-lg bg-red-700 mb-2" />
          <Animated.View style={textLink.style} className="h-20 rounded-lg bg-green-700 mb-2" />
        </View>

        {/* Optimized Glow */}
        <View className="p-4">
          <Text className="text-white text-lg mb-2">Optimized Glow ({performanceLevel})</Text>
          <TouchableOpacity onPress={togglePerformance} className="bg-blue-600 p-3 rounded-lg mb-4">
            <Text className="text-white text-center">Toggle Performance</Text>
          </TouchableOpacity>
          <Animated.View style={optimizedGlow.style} className="h-24 rounded-lg bg-orange-600 justify-center items-center" />
        </View>

        {/* Defaults and Palettes */}
        <View className="p-4">
          <Text className="text-white text-lg mb-2">Defaults</Text>
          <Text className="text-white">Pulse Duration: {DEFAULT_PULSE_GLOW.duration}</Text>
          <Text className="text-white">Hover Intensity: {DEFAULT_HOVER_GLOW.intensity}</Text>
          <Text className="text-white">Static Opacity: {DEFAULT_STATIC_GLOW.opacity}</Text>
          <Text className="text-white mb-2">Color Harmony Palettes</Text>
          {Object.keys(COLOR_HARMONY_PALETTES).map((key) => (
            <Text key={key} className="text-white">{key}: Primary - {COLOR_HARMONY_PALETTES[key as ColorHarmonyTheme].primary}</Text>
          ))}
        </View>
      </ScrollView>

      {/* Modal Demo */}
      <Modal visible={showModal} transparent animationType="fade" onRequestClose={() => setShowModal(false)}>
        <View className="flex-1 justify-center items-center bg-black/50">
          <Animated.View style={cardFeatured.style} className="bg-white p-8 rounded-lg w-4/5 max-w-sm">
            <Text className="text-gray-900 text-xl mb-4 text-center">Modal with Glow</Text>
            <TouchableOpacity onPress={() => setShowModal(false)} className="bg-red-600 p-3 rounded-lg">
              <Text className="text-white text-center">Close</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>

      {/* Button to Open Modal */}
      <TouchableOpacity onPress={() => setShowModal(true)} className="bg-green-600 p-4 m-4 rounded-lg">
        <Text className="text-white text-center text-lg">Open Modal with Glow</Text>
      </TouchableOpacity>
      <NextButton nextScreen="MagneticHoverScreen" label="Next" />
    </View>
  );
};

export default GlowEffectsScreen;