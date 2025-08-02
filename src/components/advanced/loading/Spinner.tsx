/**
 * Corp Astro UI Library - Spinner Component
 * Module 124: Spinner.tsx
 * 
 * A sophisticated spinner component with cosmic orbital animations
 * that provides loading indicators following Corp Astro design system.
 * 
 * Features:
 * - Cosmic orbital rotation animation
 * - Multiple spinner variants (orbital, pulse, dots, ring)
 * - Customizable colors and sizes
 * - Smooth animation with hardware acceleration
 * - Accessibility support with proper ARIA attributes
 * - Theme-aware styling with Corp Astro colors
 * - Performance optimized animations
 * 
 * Design System Compliance:
 * - Colors: Corp Astro signature blues and cosmic gradients
 * - Animation: smooth orbital rotation with easing
 * - Sizes: small(24px), medium(32px), large(48px)
 * - Variants: orbital, pulse, dots, ring
 * - Corp Astro color palette and theming
 * 
 * @module Spinner
 * @version 1.0.0
 * @since 2024
 */

import React, { useEffect, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  Animated, 
  ViewStyle, 
  AccessibilityProps,
  ColorValue,
} from 'react-native';
import { useTheme } from '../../foundations/themes/useTheme';
import { SignatureBlues } from '../../foundations/tokens/colors/SignatureBlues';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type SpinnerVariant = 'orbital' | 'pulse' | 'dots' | 'ring';
export type SpinnerSize = 'small' | 'medium' | 'large';

export interface SpinnerProps extends AccessibilityProps {
  /** Spinner variant type */
  variant?: SpinnerVariant;
  /** Spinner size */
  size?: SpinnerSize | number;
  /** Primary color */
  color?: ColorValue;
  /** Secondary color (for gradients) */
  secondaryColor?: ColorValue;
  /** Animation duration in milliseconds */
  duration?: number;
  /** Whether the spinner is visible */
  visible?: boolean;
  /** Custom style overrides */
  style?: ViewStyle;
  /** Test ID for testing */
  testID?: string;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const ANIMATION_DURATION = 1000;

const SIZE_VALUES = {
  small: 24,
  medium: 32,
  large: 48,
};

const DOT_COUNT = 3;

// ============================================================================
// SPINNER COMPONENT
// ============================================================================

export const Spinner: React.FC<SpinnerProps> = ({
  variant = 'orbital',
  size = 'medium',
  color = SignatureBlues.primary,
  secondaryColor = SignatureBlues.light,
  duration = ANIMATION_DURATION,
  visible = true,
  style,
  testID = 'spinner',
  accessibilityLabel = 'Loading',
  ...accessibilityProps
}) => {
  const theme = useTheme();
  const rotationValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const opacityValue = useRef(new Animated.Value(1)).current;

  // Calculate size
  const spinnerSize = typeof size === 'number' ? size : SIZE_VALUES[size];

  // Start rotation animation
  useEffect(() => {
    if (visible) {
      const startRotation = () => {
        rotationValue.setValue(0);
        Animated.loop(
          Animated.timing(rotationValue, {
            toValue: 1,
            duration,
            useNativeDriver: true,
          })
        ).start();
      };
      startRotation();
    }
  }, [visible, duration, rotationValue]);

  // Start pulse animation for pulse variant
  useEffect(() => {
    if (visible && variant === 'pulse') {
      const startPulse = () => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(scaleValue, {
              toValue: 1.2,
              duration: duration / 2,
              useNativeDriver: true,
            }),
            Animated.timing(scaleValue, {
              toValue: 1,
              duration: duration / 2,
              useNativeDriver: true,
            }),
          ])
        ).start();
      };
      startPulse();
    }
  }, [visible, variant, duration, scaleValue]);

  // Start dots animation
  useEffect(() => {
    if (visible && variant === 'dots') {
      const startDots = () => {
        Animated.loop(
          Animated.stagger(200, [
            Animated.sequence([
              Animated.timing(opacityValue, {
                toValue: 0.3,
                duration: 300,
                useNativeDriver: true,
              }),
              Animated.timing(opacityValue, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
              }),
            ]),
          ])
        ).start();
      };
      startDots();
    }
  }, [visible, variant, duration, opacityValue]);

  // Animation transforms
  const rotationTransform = {
    transform: [
      {
        rotate: rotationValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        }),
      },
    ],
  };

  const scaleTransform = {
    transform: [{ scale: scaleValue }],
  };

  const opacityTransform = {
    opacity: opacityValue,
  };

  // Base container style
  const containerStyle: ViewStyle = {
    width: spinnerSize,
    height: spinnerSize,
    justifyContent: 'center',
    alignItems: 'center',
  };

  if (!visible) {
    return null;
  }

  // Render different variants
  const renderOrbital = () => (
    <Animated.View
      style={[
        styles.orbital,
        containerStyle,
        rotationTransform,
        style,
      ]}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="progressbar"
      {...accessibilityProps}
    >
      <View
        style={[
          styles.orbitalRing,
          {
            width: spinnerSize,
            height: spinnerSize,
            borderRadius: spinnerSize / 2,
            borderColor: color,
            borderWidth: 2,
          },
        ]}
      />
      <View
        style={[
          styles.orbitalDot,
          {
            width: spinnerSize / 4,
            height: spinnerSize / 4,
            borderRadius: spinnerSize / 8,
            backgroundColor: secondaryColor,
            top: -spinnerSize / 8,
            left: spinnerSize / 2 - spinnerSize / 8,
          },
        ]}
      />
    </Animated.View>
  );

  const renderPulse = () => (
    <Animated.View
      style={[
        styles.pulse,
        containerStyle,
        scaleTransform,
        style,
      ]}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="progressbar"
      {...accessibilityProps}
    >
      <View
        style={[
          styles.pulseCircle,
          {
            width: spinnerSize,
            height: spinnerSize,
            borderRadius: spinnerSize / 2,
            backgroundColor: color,
          },
        ]}
      />
    </Animated.View>
  );

  const renderDots = () => (
    <View
      style={[
        styles.dots,
        containerStyle,
        style,
      ]}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="progressbar"
      {...accessibilityProps}
    >
      {Array.from({ length: DOT_COUNT }).map((_, index) => (
        <Animated.View
          key={index}
          style={[
            styles.dot,
            {
              width: spinnerSize / 4,
              height: spinnerSize / 4,
              borderRadius: spinnerSize / 8,
              backgroundColor: color,
              marginHorizontal: 2,
            },
            opacityTransform,
          ]}
        />
      ))}
    </View>
  );

  const renderRing = () => (
    <Animated.View
      style={[
        styles.ring,
        containerStyle,
        rotationTransform,
        style,
      ]}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="progressbar"
      {...accessibilityProps}
    >
      <View
        style={[
          styles.ringOuter,
          {
            width: spinnerSize,
            height: spinnerSize,
            borderRadius: spinnerSize / 2,
            borderColor: color,
            borderWidth: 3,
            borderTopColor: 'transparent',
          },
        ]}
      />
    </Animated.View>
  );

  // Render based on variant
  switch (variant) {
    case 'orbital':
      return renderOrbital();
    case 'pulse':
      return renderPulse();
    case 'dots':
      return renderDots();
    case 'ring':
      return renderRing();
    default:
      return renderOrbital();
  }
};

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  orbital: {
    position: 'relative',
  },
  orbitalRing: {
    borderStyle: 'solid',
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  orbitalDot: {
    position: 'absolute',
  },
  pulse: {
    // No additional styles needed
  },
  pulseCircle: {
    // No additional styles needed
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    // No additional styles needed
  },
  ring: {
    // No additional styles needed
  },
  ringOuter: {
    borderStyle: 'solid',
  },
});

// ============================================================================
// VARIANTS
// ============================================================================

export const OrbitalSpinner: React.FC<Omit<SpinnerProps, 'variant'>> = (props) => (
  <Spinner {...props} variant="orbital" />
);

export const PulseSpinner: React.FC<Omit<SpinnerProps, 'variant'>> = (props) => (
  <Spinner {...props} variant="pulse" />
);

export const DotsSpinner: React.FC<Omit<SpinnerProps, 'variant'>> = (props) => (
  <Spinner {...props} variant="dots" />
);

export const RingSpinner: React.FC<Omit<SpinnerProps, 'variant'>> = (props) => (
  <Spinner {...props} variant="ring" />
);

// ============================================================================
// EXPORTS
// ============================================================================

export default Spinner;
