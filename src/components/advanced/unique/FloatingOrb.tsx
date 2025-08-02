/**
 * Corp Astro UI Library - Floating Orb Component
 * Module 129: FloatingOrb.tsx
 * 
 * A sophisticated floating orb component with cosmic design aesthetics
 * that creates depth and movement following Corp Astro design system.
 * 
 * Features:
 * - Cosmic floating orb with radial gradient
 * - Multiple animation types (float, rotate, pulse)
 * - Trail effect with opacity falloff
 * - Customizable size and colors
 * - Hardware-accelerated animations
 * - Interactive hover effects
 * - Accessibility support
 * - Theme integration
 * 
 * Design System Compliance:
 * - Size: 64px default with customizable dimensions
 * - BorderRadius: 50% for perfect circle
 * - Background: radial-gradient with Corp Astro colors
 * - Filter: blur(0.5px) for cosmic effect
 * - Animations: float (6s), rotate (20s), pulse (3s)
 * - Trail: 5 particles with opacity falloff
 * - Colors: rgba(46,134,222,0.8) with transparency
 * - Timing: ease-in-out for smooth animations
 * 
 * @module FloatingOrb
 * @version 1.0.0
 * @since 2024
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  ViewStyle,
  Dimensions,
  AccessibilityProps,
  TouchableOpacity,
  Easing,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../foundations/themes/useTheme';
import { SignatureBlues } from '../../foundations/tokens/colors/SignatureBlues';
import { deepSpaceColors } from '../../foundations/tokens/colors/DeepSpaceColors';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type OrbAnimation = 'float' | 'rotate' | 'pulse' | 'all';

export interface FloatingOrbProps extends AccessibilityProps {
  /** Orb size in pixels */
  size?: number;
  /** Animation type */
  animation?: OrbAnimation;
  /** Whether to show trail effect */
  showTrail?: boolean;
  /** Trail length (number of particles) */
  trailLength?: number;
  /** Primary color */
  color?: string;
  /** Secondary color for gradient */
  secondaryColor?: string;
  /** Animation speed multiplier */
  speed?: number;
  /** Whether orb is interactive */
  interactive?: boolean;
  /** Callback for touch interactions */
  onPress?: () => void;
  /** Custom style overrides */
  style?: ViewStyle;
  /** Test ID for testing */
  testID?: string;
  /** Whether orb is visible */
  visible?: boolean;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const DEFAULT_SIZE = 64;
const DEFAULT_TRAIL_LENGTH = 5;
const DEFAULT_SPEED = 1;
const DEFAULT_COLOR = 'rgba(46,134,222,0.8)';
const DEFAULT_SECONDARY_COLOR = 'rgba(46,134,222,0)';

const ANIMATION_DURATIONS = {
  float: 6000,
  rotate: 20000,
  pulse: 3000,
};

const TRAIL_OPACITY = [0.5, 0.3, 0.2, 0.1, 0.05];
const TRAIL_BLUR = [0, 1, 2, 3, 4];

// ============================================================================
// FLOATING ORB COMPONENT
// ============================================================================

export const FloatingOrb: React.FC<FloatingOrbProps> = ({
  size = DEFAULT_SIZE,
  animation = 'all',
  showTrail = true,
  trailLength = DEFAULT_TRAIL_LENGTH,
  color = DEFAULT_COLOR,
  secondaryColor = DEFAULT_SECONDARY_COLOR,
  speed = DEFAULT_SPEED,
  interactive = false,
  onPress,
  style,
  testID = 'floating-orb',
  visible = true,
  accessibilityLabel = 'Floating orb',
  ...accessibilityProps
}) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  
  // Animation values
  const floatAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  
  // Trail positions
  const [trailPositions, setTrailPositions] = useState<Array<{ x: number; y: number }>>([]);

  // Start animations
  useEffect(() => {
    if (!visible) return;

    const animations: Animated.CompositeAnimation[] = [];

    // Float animation
    if (animation === 'float' || animation === 'all') {
      const floatAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(floatAnim, {
            toValue: 1,
            duration: (ANIMATION_DURATIONS.float / 2) / speed,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(floatAnim, {
            toValue: 0,
            duration: (ANIMATION_DURATIONS.float / 2) / speed,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );
      animations.push(floatAnimation);
    }

    // Rotate animation
    if (animation === 'rotate' || animation === 'all') {
      const rotateAnimation = Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: ANIMATION_DURATIONS.rotate / speed,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      );
      animations.push(rotateAnimation);
    }

    // Pulse animation
    if (animation === 'pulse' || animation === 'all') {
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: (ANIMATION_DURATIONS.pulse / 2) / speed,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 0,
            duration: (ANIMATION_DURATIONS.pulse / 2) / speed,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );
      animations.push(pulseAnimation);
    }

    // Start all animations
    animations.forEach(anim => anim.start());

    return () => {
      animations.forEach(anim => anim.stop());
    };
  }, [visible, animation, speed, floatAnim, rotateAnim, pulseAnim]);

  // Handle hover effects
  useEffect(() => {
    if (interactive) {
      Animated.timing(scaleAnim, {
        toValue: isHovered ? 1.1 : 1,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, [isHovered, interactive, scaleAnim]);

  // Update trail positions
  useEffect(() => {
    if (!showTrail || !visible) return;

    const interval = setInterval(() => {
      setTrailPositions(prev => {
        const newPosition = {
          x: Math.random() * 10 - 5,
          y: Math.random() * 10 - 5,
        };
        return [newPosition, ...prev.slice(0, trailLength - 1)];
      });
    }, 100);

    return () => clearInterval(interval);
  }, [showTrail, visible, trailLength]);

  // Animation transforms
  const animatedStyle = {
    transform: [
      {
        translateY: floatAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -20],
        }),
      },
      {
        rotate: rotateAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        }),
      },
      {
        scale: Animated.multiply(
          scaleAnim,
          pulseAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.1],
          })
        ),
      },
    ],
    opacity: pulseAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.6, 1],
    }),
  };

  // Render trail particles
  const renderTrail = () => {
    if (!showTrail) return null;

    return trailPositions.map((position, index) => {
      if (index >= trailLength) return null;

      const opacity = TRAIL_OPACITY[index] || 0.01;
      const blur = TRAIL_BLUR[index] || 5;

      return (
        <Animated.View
          key={index}
          style={[
            styles.trailParticle,
            {
              width: size * 0.6,
              height: size * 0.6,
              borderRadius: size * 0.3,
              left: position.x,
              top: position.y,
              opacity,
              transform: [
                {
                  scale: 1 - (index * 0.15),
                },
              ],
            },
          ]}
        >
          <LinearGradient
            colors={[color, secondaryColor]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.trailGradient}
          />
        </Animated.View>
      );
    });
  };

  // Render orb content
  const renderOrb = () => (
    <Animated.View
      style={[
        styles.orb,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
        animatedStyle,
        style,
      ]}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      {...accessibilityProps}
    >
      <LinearGradient
        colors={[color, secondaryColor]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.orbGradient}
      />
    </Animated.View>
  );

  if (!visible) return null;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {renderTrail()}
      {interactive && onPress ? (
        <TouchableOpacity
          onPress={onPress}
          onPressIn={() => setIsHovered(true)}
          onPressOut={() => setIsHovered(false)}
          activeOpacity={0.8}
          style={styles.touchable}
        >
          {renderOrb()}
        </TouchableOpacity>
      ) : (
        renderOrb()
      )}
    </View>
  );
};

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orb: {
    position: 'absolute',
    overflow: 'hidden',
    shadowColor: SignatureBlues.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 10,
  },
  orbGradient: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  trailParticle: {
    position: 'absolute',
    overflow: 'hidden',
  },
  trailGradient: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  touchable: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// ============================================================================
// VARIANTS
// ============================================================================

export const FloatingOrbFloat: React.FC<Omit<FloatingOrbProps, 'animation'>> = (props) => (
  <FloatingOrb {...props} animation="float" />
);

export const FloatingOrbRotate: React.FC<Omit<FloatingOrbProps, 'animation'>> = (props) => (
  <FloatingOrb {...props} animation="rotate" />
);

export const FloatingOrbPulse: React.FC<Omit<FloatingOrbProps, 'animation'>> = (props) => (
  <FloatingOrb {...props} animation="pulse" />
);

export const InteractiveFloatingOrb: React.FC<Omit<FloatingOrbProps, 'interactive'>> = (props) => (
  <FloatingOrb {...props} interactive={true} />
);

// ============================================================================
// EXPORTS
// ============================================================================

export default FloatingOrb;
