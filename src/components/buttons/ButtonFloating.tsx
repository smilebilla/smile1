/**
 * Corp Astro UI Library - Floating Action Button Component
 * 
 * Floating Action Button with radial gradient, pulse animation, and orbital shadow.
 * Represents the primary floating action element in the Corp Astro design system.
 * 
 * @module ButtonFloating
 * @version 1.0.0
 * @since 2024
 * 
 * UI Documentation Reference:
 * - Size: 64px (standard), 48px (mini), borderRadius: 32px (standard), 24px (mini)
 * - Background: 'radial-gradient(circle, #2E86DE 0%, #533483 100%)'
 * - Icon size: 28px (standard), 20px (mini)
 * - Animation: 'pulse-glow 2s ease-in-out infinite'
 * - Shadow: '0 8px 40px rgba(46,134,222,0.5)'
 * - Accessibility: 44px minimum touch target
 * - Hover: Enhanced glow and elevation
 * - Pressed: Scale down with haptic feedback
 * 
 * Features:
 * - Radial gradient background
 * - Pulse-glow animation
 * - Orbital shadow effects
 * - Icon support
 * - Mini and standard sizes
 * - Haptic feedback
 * - Accessibility compliant
 * - Theme integration
 * - Performance optimized
 */

import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import {
  AccessibilityProps,
  Animated,
  Easing,
  GestureResponderEvent,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../foundations/themes/ThemeProvider';
import { RoyalPurples } from '../foundations/tokens/colors/RoyalPurples';
import { SignatureBlues } from '../foundations/tokens/colors/SignatureBlues';

/**
 * Floating button size variants
 */
export type ButtonFloatingSize = 'standard' | 'mini';

/**
 * Floating button animation types
 */
export type ButtonFloatingAnimation = 'pulse' | 'orbital' | 'static';

/**
 * Floating button configuration
 */
export interface ButtonFloatingConfig {
  /** Button size variant */
  size: ButtonFloatingSize;
  /** Animation type */
  animation: ButtonFloatingAnimation;
  /** Enable haptic feedback */
  enableHaptics: boolean;
  /** Enable shadow effects */
  enableShadow: boolean;
  /** Custom gradient colors */
  gradientColors?: [string, string];
  /** Animation speed multiplier */
  animationSpeed: number;
  /** Shadow intensity */
  shadowIntensity: number;
}

/**
 * Floating button component props
 */
export interface ButtonFloatingProps extends AccessibilityProps {
  /** Child component (typically an icon) */
  children: React.ReactNode;
  
  /** Button press handler */
  onPress: (event: GestureResponderEvent) => void;
  
  /** Button size */
  size?: ButtonFloatingSize;
  
  /** Animation type */
  animation?: ButtonFloatingAnimation;
  
  /** Disabled state */
  disabled?: boolean;
  
  /** Custom style */
  style?: ViewStyle;
  
  /** Custom gradient colors */
  gradientColors?: [string, string];
  
  /** Enable haptic feedback */
  enableHaptics?: boolean;
  
  /** Enable shadow effects */
  enableShadow?: boolean;
  
  /** Animation speed multiplier */
  animationSpeed?: number;
  
  /** Shadow intensity */
  shadowIntensity?: number;
  
  /** Test ID for testing */
  testID?: string;
}

/**
 * Default floating button configuration
 */
const defaultConfig: ButtonFloatingConfig = {
  size: 'standard',
  animation: 'pulse',
  enableHaptics: true,
  enableShadow: true,
  animationSpeed: 1.0,
  shadowIntensity: 1.0,
};

/**
 * Floating Action Button Component
 * 
 * @param props - Component props
 * @returns Floating action button component
 */
export const ButtonFloating: React.FC<ButtonFloatingProps> = ({
  children,
  onPress,
  size = 'standard',
  animation = 'pulse',
  disabled = false,
  style,
  gradientColors,
  enableHaptics = true,
  enableShadow = true,
  animationSpeed = 1.0,
  shadowIntensity = 1.0,
  testID,
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole = 'button',
  ...accessibilityProps
}) => {
  const theme = useTheme();
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Animation values
  const scaleValue = useRef(new Animated.Value(1)).current;
  const elevationValue = useRef(new Animated.Value(0)).current;
  const rotationValue = useRef(new Animated.Value(0)).current;
  const pulseScale = useRef(new Animated.Value(1)).current;
  const pulseOpacity = useRef(new Animated.Value(1)).current;
  
  // Pulse animation using direct implementation
  const pulseAnimationRef = useRef<any>(null);
  
  useEffect(() => {
    if (animation === 'pulse' && !disabled) {
      const startPulse = () => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(pulseScale, {
              toValue: 1.05,
              duration: 1000,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(pulseScale, {
              toValue: 1,
              duration: 1000,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
          ])
        ).start();
      };
      
      startPulse();
      
      return () => {
        pulseScale.setValue(1);
      };
    }
  }, [animation, disabled, animationSpeed, pulseScale]);
  
  // Orbital animation
  useEffect(() => {
    if (animation === 'orbital' && !disabled) {
      const startOrbitalAnimation = () => {
        Animated.loop(
          Animated.timing(rotationValue, {
            toValue: 1,
            duration: 4000 / animationSpeed,
            easing: Easing.linear,
            useNativeDriver: true,
          })
        ).start();
      };
      startOrbitalAnimation();
    }
  }, [animation, disabled, animationSpeed, rotationValue]);
  
  /**
   * Handle press in event
   */
  const handlePressIn = () => {
    if (disabled) return;
    
    setIsPressed(true);
    
    // Haptic feedback (iOS only)
    if (enableHaptics && Platform.OS === 'ios') {
      // Using iOS haptic feedback
      const { HapticFeedback } = require('react-native');
      HapticFeedback?.impactAsync?.(HapticFeedback.ImpactFeedbackStyle?.Medium);
    }
    
    // Press animation - separate native and JS animations
    Animated.timing(scaleValue, {
      toValue: 0.95,
      duration: 150,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
    
    Animated.timing(elevationValue, {
      toValue: -2,
      duration: 150,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start();
  };
  
  /**
   * Handle press out event
   */
  const handlePressOut = () => {
    if (disabled) return;
    
    setIsPressed(false);
    
    // Release animation - separate native and JS animations
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 200,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
    
    Animated.timing(elevationValue, {
      toValue: 0,
      duration: 200,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start();
  };
  
  // Calculate dimensions
  const dimensions = {
    standard: {
      size: 64,
      borderRadius: 32,
      iconSize: 28,
      shadowBlur: 40,
      shadowOffset: 8,
    },
    mini: {
      size: 48,
      borderRadius: 24,
      iconSize: 20,
      shadowBlur: 30,
      shadowOffset: 6,
    },
  };
  
  const currentDimensions = dimensions[size];
  
  // Calculate gradient colors
  const finalGradientColors = gradientColors || [
    SignatureBlues.primary,
    RoyalPurples.deep,
  ];
  
  // Calculate styles
  const buttonStyle: ViewStyle = {
    width: currentDimensions.size,
    height: currentDimensions.size,
    borderRadius: currentDimensions.borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: finalGradientColors[0], // Fallback for older devices
    ...(enableShadow && {
      shadowColor: SignatureBlues.primary,
      shadowOffset: { width: 0, height: currentDimensions.shadowOffset },
      shadowOpacity: shadowIntensity * 0.5,
      shadowRadius: currentDimensions.shadowBlur,
      elevation: currentDimensions.shadowOffset,
    }),
  };
  
  const animatedStyle: ViewStyle = {
    transform: [
      { scale: Animated.multiply(scaleValue, pulseScale) },
      ...(animation === 'orbital' ? [{
        rotate: rotationValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        }),
      }] : []),
    ],
  };
  
  const gradientStyle: ViewStyle = {
    width: '100%',
    height: '100%',
    borderRadius: currentDimensions.borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
  };
  
  const disabledStyle: ViewStyle = disabled ? {
    opacity: 0.5,
    shadowOpacity: 0,
    elevation: 0,
  } : {};
  
  return (
    <Animated.View
      style={[
        buttonStyle,
        animatedStyle,
        disabledStyle,
        style,
      ]}
      testID={testID}
    >
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        activeOpacity={0.8}
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
        accessibilityRole={accessibilityRole}
        accessibilityState={{ disabled }}
        {...accessibilityProps}
        style={styles.touchableBase}
      >
        <LinearGradient
          colors={finalGradientColors}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={gradientStyle}
        >
          <View style={styles.iconContainer}>
            {children}
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

/**
 * Component styles
 */
const styles = StyleSheet.create({
  touchableBase: {
    width: '100%',
    height: '100%',
    borderRadius: 32,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});

/**
 * Default export
 */
export default ButtonFloating;
