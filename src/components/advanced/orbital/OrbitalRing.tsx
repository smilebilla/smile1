import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SignatureBlues } from '../../foundations/tokens/colors/SignatureBlues';
import { deepSpaceColors } from '../../foundations/tokens/colors/DeepSpaceColors';

export interface OrbitalRingProps {
  /** Ring radius in pixels */
  radius: number;
  /** Ring width in pixels */
  width?: number;
  /** Ring color */
  color?: string;
  /** Ring opacity */
  opacity?: number;
  /** Rotation animation enabled */
  rotationEnabled?: boolean;
  /** Rotation duration in seconds */
  rotationDuration?: number;
  /** Rotation direction */
  rotationDirection?: 'clockwise' | 'counter-clockwise';
  /** Pulse animation enabled */
  pulseEnabled?: boolean;
  /** Pulse duration in seconds */
  pulseDuration?: number;
  /** Pulse opacity range */
  pulseOpacityRange?: [number, number];
  /** Gradient effects enabled */
  gradientEnabled?: boolean;
  /** Gradient colors */
  gradientColors?: [string, string, ...string[]];
  /** Dash pattern for dashed rings */
  dashPattern?: number[];
  /** Ring style variant */
  variant?: 'solid' | 'dashed' | 'dotted' | 'gradient';
  /** Container center position */
  center: { x: number; y: number };
  /** Test ID for testing */
  testID?: string;
}

/**
 * OrbitalRing - Animated ring component for orbital motion systems
 * 
 * Features:
 * - Configurable radius and styling
 * - Rotation animations with direction control
 * - Pulse animations with opacity control
 * - Gradient effects and styling variants
 * - Dash patterns for visual variety
 * - Corp Astro design system integration
 */
export const OrbitalRing: React.FC<OrbitalRingProps> = ({
  radius,
  width = 2,
  color = SignatureBlues.primary,
  opacity = 0.3,
  rotationEnabled = true,
  rotationDuration = 20,
  rotationDirection = 'clockwise',
  pulseEnabled = true,
  pulseDuration = 4,
  pulseOpacityRange = [0.3, 0.6],
  gradientEnabled = false,
  gradientColors = [String(SignatureBlues.primary), String(SignatureBlues.glow)],
  dashPattern = [5, 5],
  variant = 'solid',
  center,
  testID = 'orbital-ring',
}) => {
  const rotationAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(pulseOpacityRange[0])).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Rotation animation
  useEffect(() => {
    if (rotationEnabled) {
      const rotationLoop = Animated.loop(
        Animated.timing(rotationAnim, {
          toValue: 1,
          duration: rotationDuration * 1000,
          useNativeDriver: true,
        })
      );
      rotationLoop.start();

      return () => {
        rotationLoop.stop();
      };
    }
  }, [rotationEnabled, rotationDuration]);

  // Pulse animation
  useEffect(() => {
    if (pulseEnabled) {
      const pulseLoop = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: pulseOpacityRange[1],
            duration: (pulseDuration * 1000) / 2,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: pulseOpacityRange[0],
            duration: (pulseDuration * 1000) / 2,
            useNativeDriver: true,
          }),
        ])
      );
      pulseLoop.start();

      return () => {
        pulseLoop.stop();
      };
    }
  }, [pulseEnabled, pulseDuration, pulseOpacityRange]);

  // Scale animation for emphasis
  useEffect(() => {
    const scaleLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.02,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    );
    scaleLoop.start();

    return () => {
      scaleLoop.stop();
    };
  }, []);

  // Calculate ring dimensions
  const ringSize = radius * 2;
  const ringLeft = center.x - radius;
  const ringTop = center.y - radius;

  // Rotation interpolation
  const rotationInterpolate = rotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: rotationDirection === 'clockwise' ? ['0deg', '360deg'] : ['360deg', '0deg'],
  });

  // Render ring based on variant
  const renderRingContent = () => {
    switch (variant) {
      case 'gradient':
        return (
          <LinearGradient
            colors={gradientColors}
            style={[
              styles.gradientRing,
              {
                width: ringSize,
                height: ringSize,
                borderRadius: radius,
                borderWidth: width,
              },
            ]}
          />
        );

      case 'dashed':
        return (
          <View
            style={[
              styles.dashedRing,
              {
                width: ringSize,
                height: ringSize,
                borderRadius: radius,
                borderWidth: width,
                borderColor: color,
                borderStyle: 'dashed',
              },
            ]}
          />
        );

      case 'dotted':
        return (
          <View
            style={[
              styles.dottedRing,
              {
                width: ringSize,
                height: ringSize,
                borderRadius: radius,
                borderWidth: width,
                borderColor: color,
                borderStyle: 'dotted',
              },
            ]}
          />
        );

      default: // solid
        return (
          <View
            style={[
              styles.solidRing,
              {
                width: ringSize,
                height: ringSize,
                borderRadius: radius,
                borderWidth: width,
                borderColor: color,
              },
            ]}
          />
        );
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          left: ringLeft,
          top: ringTop,
          width: ringSize,
          height: ringSize,
          opacity: pulseEnabled ? pulseAnim : opacity,
          transform: [
            { rotate: rotationEnabled ? rotationInterpolate : '0deg' },
            { scale: scaleAnim },
          ],
        },
      ]}
      testID={testID}
    >
      {renderRingContent()}
      
      {/* Glow effect */}
      <Animated.View
        style={[
          styles.glowEffect,
          {
            width: ringSize + 20,
            height: ringSize + 20,
            borderRadius: radius + 10,
            backgroundColor: color,
            opacity: pulseEnabled ? Animated.multiply(pulseAnim, 0.1) : 0.1,
            left: -10,
            top: -10,
          },
        ]}
      />
      
      {/* Inner glow */}
      <Animated.View
        style={[
          styles.innerGlow,
          {
            width: ringSize - width * 2,
            height: ringSize - width * 2,
            borderRadius: radius - width,
            backgroundColor: color,
            opacity: pulseEnabled ? Animated.multiply(pulseAnim, 0.05) : 0.05,
            left: width,
            top: width,
          },
        ]}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  solidRing: {
    backgroundColor: 'transparent',
    borderStyle: 'solid',
  },
  dashedRing: {
    backgroundColor: 'transparent',
  },
  dottedRing: {
    backgroundColor: 'transparent',
  },
  gradientRing: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  glowEffect: {
    position: 'absolute',
    backgroundColor: 'transparent',
    shadowOpacity: 0.8,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    elevation: 5,
  },
  innerGlow: {
    position: 'absolute',
    backgroundColor: 'transparent',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 0 },
    elevation: 3,
  },
});

export default OrbitalRing;
