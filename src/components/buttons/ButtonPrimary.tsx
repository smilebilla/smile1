/**
 * Corp Astro UI Library - Primary Button Component
 * 
 * Primary CTA button with gradient background, hover effects, and orbital loading.
 * Represents the main call-to-action element in the Corp Astro design system.
 * 
 * @module ButtonPrimary
 * @version 1.0.0
 * @since 2024
 * 
 * UI Documentation Reference:
 * - Height: 56px, borderRadius: 28px, padding: '0 32px'
 * - Background: 'linear-gradient(135deg, #2E86DE 0%, #5758BB 100%)'
 * - Shadow: '0 8px 32px rgba(46,134,222,0.4)'
 * - Typography: Futura PT, 16px, 600 weight, uppercase, 1px letter spacing
 * - Hover: translateY(-2px), shadow '0 12px 40px rgba(46,134,222,0.6)', gradient shift
 * - Pressed: scale(0.98), shadow '0 4px 20px rgba(46,134,222,0.3)'
 * - Loading: orbital spinner, shimmer effect
 * 
 * Features:
 * - Gradient background with hover shift
 * - Orbital loading spinner
 * - Haptic feedback on press
 * - Accessibility support
 * - Responsive touch targets
 * - Animation states
 * - Theme integration
 */

import React, { useState } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  GestureResponderEvent,
  AccessibilityProps,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../foundations/themes/ThemeProvider';
import { SignatureBlues } from '../foundations/tokens/colors/SignatureBlues';
import { ProfessionalGrays } from '../foundations/tokens/colors/ProfessionalGrays';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

/**
 * Primary button size variants
 */
export type ButtonPrimarySize = 'small' | 'medium' | 'large';

/**
 * Primary button variant types
 */
export type ButtonPrimaryVariant = 'default' | 'wide' | 'compact';

/**
 * Primary button loading state
 */
export interface ButtonPrimaryLoadingState {
  /** Show loading state */
  isLoading: boolean;
  /** Loading text override */
  loadingText?: string;
  /** Show orbital spinner */
  showSpinner: boolean;
  /** Show shimmer effect */
  showShimmer: boolean;
}

/**
 * Primary button configuration
 */
export interface ButtonPrimaryConfig {
  /** Button variant */
  variant: ButtonPrimaryVariant;
  /** Button size */
  size: ButtonPrimarySize;
  /** Enable haptic feedback */
  enableHaptics: boolean;
  /** Enable gradient animation */
  enableGradientAnimation: boolean;
  /** Enable hover effects */
  enableHoverEffects: boolean;
  /** Enable shadow effects */
  enableShadowEffects: boolean;
  /** Custom gradient colors */
  gradientColors?: [string, string];
  /** Custom hover gradient colors */
  hoverGradientColors?: [string, string];
}

/**
 * Primary button component props
 */
export interface ButtonPrimaryProps extends AccessibilityProps {
  /** Button text */
  children: string;
  /** Press handler */
  onPress: (event: GestureResponderEvent) => void;
  /** Disabled state */
  disabled?: boolean;
  /** Loading state configuration */
  loading?: ButtonPrimaryLoadingState;
  /** Button configuration */
  config?: Partial<ButtonPrimaryConfig>;
  /** Custom styles */
  style?: React.CSSProperties;  // Adjusted for React Native (use ViewStyle if TS)
  /** Custom text styles */
  textStyle?: React.CSSProperties;  // Adjusted for React Native (use TextStyle if TS)
  /** Test ID for testing */
  testID?: string;
}

/**
 * Default primary button configuration
 */
const defaultConfig: ButtonPrimaryConfig = {
  variant: 'default',
  size: 'medium',
  enableHaptics: true,
  enableGradientAnimation: true,
  enableHoverEffects: true,
  enableShadowEffects: true,
  gradientColors: [SignatureBlues.primary as string, '#5758BB'],
  hoverGradientColors: [SignatureBlues.light as string, '#6C5CE7'],
};

/**
 * Primary button component
 */
export const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  children,
  onPress,
  disabled = false,
  loading = { isLoading: false, showSpinner: true, showShimmer: true },
  config = {},
  style,
  textStyle,
  testID,
  ...accessibilityProps
}) => {
  const theme = useTheme();
  const finalConfig = { ...defaultConfig, ...config };

  // Reanimated values
  const scale = useSharedValue(1);
  const elevation = useSharedValue(8);
  const shimmer = useSharedValue(0);
  const spinner = useSharedValue(0);

  // State
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Size configurations
  const sizeConfig = {
    small: { height: 44, borderRadius: 22, paddingHorizontal: 24, fontSize: 14 },
    medium: { height: 56, borderRadius: 28, paddingHorizontal: 32, fontSize: 16 },
    large: { height: 64, borderRadius: 32, paddingHorizontal: 40, fontSize: 18 },
  };

  const currentSize = sizeConfig[finalConfig.size];

  // Start loading animations
  React.useEffect(() => {
    if (loading.isLoading) {
      // Shimmer animation
      if (loading.showShimmer) {
        shimmer.value = withRepeat(
          withSequence(
            withTiming(1, { duration: 1500, easing: Easing.ease }),
            withTiming(0, { duration: 1500, easing: Easing.ease })
          ),
          -1
        );
      }

      // Orbital spinner animation
      if (loading.showSpinner) {
        spinner.value = withRepeat(
          withTiming(1, { duration: 2000, easing: Easing.linear }),
          -1
        );
      }
    } else {
      shimmer.value = 0;
      spinner.value = 0;
    }

    // Cleanup on unmount
    return () => {
      shimmer.value = 0;
      spinner.value = 0;
    };
  }, [loading.isLoading, loading.showShimmer, loading.showSpinner]);

  // Handle press in
  const handlePressIn = () => {
    setIsPressed(true);
    
    if (finalConfig.enableHaptics && !disabled && Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    scale.value = withTiming(0.98, { duration: 100 });
    if (Platform.OS !== 'android') {
      elevation.value = withTiming(4, { duration: 100 });
    }
  };

  // Handle press out
  const handlePressOut = () => {
    setIsPressed(false);
    
    scale.value = withTiming(1, { duration: 150 });
    if (Platform.OS !== 'android') {
      elevation.value = withTiming(isHovered ? 12 : 8, { duration: 150 });
    }
  };

  // Handle hover in (web only)
  const handleHoverIn = () => {
    if (Platform.OS === 'web' && finalConfig.enableHoverEffects) {
      setIsHovered(true);
      elevation.value = withTiming(12, { duration: 200 });
    }
  };

  const handleHoverOut = () => {
    if (Platform.OS === 'web' && finalConfig.enableHoverEffects) {
      setIsHovered(false);
      elevation.value = withTiming(8, { duration: 200 });
    }
  };

  // Handle press
  const handlePress = (event: GestureResponderEvent) => {
    if (!disabled && !loading.isLoading) {
      if (finalConfig.enableHaptics && Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
      onPress(event);
    }
  };

  // Gradient colors
  const gradientColors = isHovered && finalConfig.hoverGradientColors
    ? finalConfig.hoverGradientColors
    : (finalConfig.gradientColors ?? ['#2E86DE', '#5758BB']);

  // Animated styles
  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }), []);

  const animatedShadowStyle = useAnimatedStyle(() => ({
    shadowColor: SignatureBlues.primary,
    shadowOffset: { width: 0, height: elevation.value },
    shadowOpacity: isPressed ? 0.3 : (isHovered ? 0.6 : 0.4),
    shadowRadius: isPressed ? 20 : (isHovered ? 40 : 32),
    elevation: elevation.value,
  }), []);

  const animatedShimmerStyle = useAnimatedStyle(() => ({
    backgroundColor: `rgba(255,255,255,${shimmer.value * 0.2})`,
  }));

  const animatedSpinnerStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${spinner.value * 360}deg` }],
  }));

  // Button styles
  const buttonStyles = [
    styles.button,
    {
      height: currentSize.height,
      borderRadius: currentSize.borderRadius,
      paddingHorizontal: currentSize.paddingHorizontal,
      opacity: disabled ? 0.5 : 1,
    },
    style,
  ];

  // Text styles
  const textStyles = [
    styles.text,
    {
      fontSize: currentSize.fontSize,
      color: disabled ? ProfessionalGrays.muted : '#FFFFFF',
    },
    textStyle,
  ];

  return (
    <TouchableOpacity
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading.isLoading}
      activeOpacity={0.95}
      testID={testID}
      {...(Platform.OS === 'web' ? {
        onMouseEnter: handleHoverIn,
        onMouseLeave: handleHoverOut,
      } : {})}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading.isLoading }}
      {...accessibilityProps}
    >
      <Animated.View style={[buttonStyles as any, animatedButtonStyle, animatedShadowStyle]}>
        <LinearGradient
          colors={gradientColors}
          start={[0, 0]}
          end={[1, 1]}
          style={[
            StyleSheet.absoluteFillObject,
            {
              borderRadius: currentSize.borderRadius,
            },
          ]}
        />
        
        {loading.isLoading && loading.showShimmer && (
          <Animated.View
            style={[
              StyleSheet.absoluteFillObject,
              {
                borderRadius: currentSize.borderRadius,
              },
              animatedShimmerStyle,
            ]}
          />
        )}
        
        <View style={styles.content}>
          {loading.isLoading && loading.showSpinner && (
            <Animated.View
              style={[
                styles.spinner,
                animatedSpinnerStyle,
              ]}
            >
              <View style={styles.spinnerRing} />
              <View style={[styles.spinnerRing, styles.spinnerRingInner]} />
            </Animated.View>
          )}
          
          <Text style={textStyles as any}>
            {loading.isLoading && loading.loadingText ? loading.loadingText : children}
          </Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

/**
 * Component styles
 */
const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  text: {
    fontFamily: 'FuturaPT-Medium',
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  spinner: {
    width: 20,
    height: 20,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinnerRing: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    borderTopColor: '#FFFFFF',
  },
  spinnerRingInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    borderTopColor: 'rgba(255,255,255,0.8)',
  },
});

/**
 * Default export
 */
export default ButtonPrimary;