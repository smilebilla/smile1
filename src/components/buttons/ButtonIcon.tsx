/**
 * Corp Astro UI Library - Icon Button Component
 * 
 * Icon-only button with glass morphism background and optimal touch targets.
 * Designed for actions where an icon provides clear visual meaning.
 * 
 * @module ButtonIcon
 * @version 1.0.0
 * @since 2024
 * 
 * UI Documentation Reference:
 * - Size: 44px (ensures minimum touch target)
 * - Background: Glass morphism with blur and transparency
 * - Icon centering: Perfect center alignment
 * - Touch target: Minimum 44px for accessibility
 * - Hover: Enhanced glass morphism effect
 * - Press: Scale animation with haptic feedback
 * 
 * Features:
 * - Glass morphism background
 * - Perfect icon centering
 * - Accessibility compliance
 * - Responsive touch targets
 * - Haptic feedback
 * - Theme integration
 * - Size variants
 * - Loading states
 * - Error states
 */

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
import {
  BUTTON_GLASS_PRESET,
  createGlassMorphismStyle,
  GlassMorphismIntensity
} from '../foundations/effects/GlassMorphism';
import { useTheme } from '../foundations/themes/ThemeProvider';
import { SignatureBlues } from '../foundations/tokens/colors/SignatureBlues';

/**
 * Icon button size variants
 */
export type ButtonIconSize = 'small' | 'medium' | 'large';

/**
 * Icon button variant types
 */
export type ButtonIconVariant = 'default' | 'primary' | 'secondary' | 'ghost';

/**
 * Icon button state types
 */
export type ButtonIconState = 'default' | 'loading' | 'success' | 'error';

/**
 * Icon button configuration
 */
export interface ButtonIconConfig {
  /** Button size */
  size: ButtonIconSize;
  /** Button variant */
  variant: ButtonIconVariant;
  /** Button state */
  state: ButtonIconState;
  /** Enable haptic feedback */
  enableHaptics: boolean;
  /** Enable glass morphism */
  enableGlassMorphism: boolean;
  /** Glass morphism intensity */
  glassMorphismIntensity: GlassMorphismIntensity;
  /** Enable hover effects */
  enableHoverEffects: boolean;
  /** Enable press animation */
  enablePressAnimation: boolean;
  /** Enable loading animation */
  enableLoadingAnimation: boolean;
  /** Custom background color */
  backgroundColor?: string;
  /** Custom border color */
  borderColor?: string;
  /** Custom icon color */
  iconColor?: string;
}

/**
 * Icon button component props
 */
export interface ButtonIconProps extends AccessibilityProps {
  /** Icon component (React element) */
  children: React.ReactNode;
  
  /** Button press handler */
  onPress: (event: GestureResponderEvent) => void;
  
  /** Button size */
  size?: ButtonIconSize;
  
  /** Button variant */
  variant?: ButtonIconVariant;
  
  /** Button state */
  state?: ButtonIconState;
  
  /** Disabled state */
  disabled?: boolean;
  
  /** Loading state */
  loading?: boolean;
  
  /** Custom style */
  style?: ViewStyle;
  
  /** Enable haptic feedback */
  enableHaptics?: boolean;
  
  /** Enable glass morphism */
  enableGlassMorphism?: boolean;
  
  /** Glass morphism intensity */
  glassMorphismIntensity?: GlassMorphismIntensity;
  
  /** Custom background color */
  backgroundColor?: string;
  
  /** Custom border color */
  borderColor?: string;
  
  /** Custom icon color */
  iconColor?: string;
  
  /** Test ID for testing */
  testID?: string;
}

/**
 * Default icon button configuration
 */
const defaultConfig: ButtonIconConfig = {
  size: 'medium',
  variant: 'default',
  state: 'default',
  enableHaptics: true,
  enableGlassMorphism: true,
  glassMorphismIntensity: 'light',
  enableHoverEffects: true,
  enablePressAnimation: true,
  enableLoadingAnimation: true,
};

/**
 * Icon Button Component
 * 
 * @param props - Component props
 * @returns Icon button component
 */
export const ButtonIcon: React.FC<ButtonIconProps> = ({
  children,
  onPress,
  size = 'medium',
  variant = 'default',
  state = 'default',
  disabled = false,
  loading = false,
  style,
  enableHaptics = true,
  enableGlassMorphism = true,
  glassMorphismIntensity = 'light',
  backgroundColor,
  borderColor,
  iconColor,
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
  const opacityValue = useRef(new Animated.Value(1)).current;
  const rotationValue = useRef(new Animated.Value(0)).current;
  
  // Loading animation
  useEffect(() => {
    if (loading) {
      const startLoadingAnimation = () => {
        Animated.loop(
          Animated.timing(rotationValue, {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
          })
        ).start();
      };
      startLoadingAnimation();
    } else {
      rotationValue.setValue(0);
    }
  }, [loading, rotationValue]);
  
  /**
   * Handle press in event
   */
  const handlePressIn = () => {
    if (disabled || loading) return;
    
    setIsPressed(true);
    
    // Haptic feedback (iOS only)
    if (enableHaptics && Platform.OS === 'ios') {
      try {
        const { HapticFeedback } = require('react-native');
        HapticFeedback?.selectionAsync?.();
      } catch (error) {
        // Haptic feedback not available
      }
    }
    
    // Press animation
    Animated.parallel([
      Animated.timing(scaleValue, {
        toValue: 0.95,
        duration: 150,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 0.8,
        duration: 150,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  };
  
  /**
   * Handle press out event
   */
  const handlePressOut = () => {
    if (disabled || loading) return;
    
    setIsPressed(false);
    
    // Release animation
    Animated.parallel([
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 200,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 200,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  };
  
  // Calculate dimensions
  const dimensions = {
    small: {
      size: 32,
      borderRadius: 16,
      iconSize: 16,
      padding: 8,
    },
    medium: {
      size: 44,
      borderRadius: 22,
      iconSize: 20,
      padding: 12,
    },
    large: {
      size: 56,
      borderRadius: 28,
      iconSize: 24,
      padding: 16,
    },
  };
  
  const currentDimensions = dimensions[size];
  
  // Calculate glass morphism style
  const glassMorphismStyle = enableGlassMorphism 
    ? createGlassMorphismStyle({
        ...BUTTON_GLASS_PRESET,
        backgroundColor: backgroundColor || 'rgba(22,33,62,0.2)',
        borderColor: borderColor || 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        borderRadius: currentDimensions.borderRadius,
      })
    : {};
  
  // Calculate variant-specific styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: backgroundColor || SignatureBlues.primary,
          borderColor: borderColor || SignatureBlues.primary,
          glassMorphism: false,
        };
      case 'secondary':
        return {
          backgroundColor: backgroundColor || 'rgba(46,134,222,0.1)',
          borderColor: borderColor || 'rgba(46,134,222,0.3)',
          glassMorphism: true,
        };
      case 'ghost':
        return {
          backgroundColor: backgroundColor || 'transparent',
          borderColor: borderColor || 'transparent',
          glassMorphism: false,
        };
      default:
        return {
          backgroundColor: backgroundColor || 'rgba(22,33,62,0.2)',
          borderColor: borderColor || 'rgba(255,255,255,0.1)',
          glassMorphism: true,
        };
    }
  };
  
  const variantStyles = getVariantStyles();
  
  // Calculate state-specific styles
  const getStateStyles = () => {
    switch (state) {
      case 'loading':
        return {
          opacity: 0.7,
          pointerEvents: 'none' as const,
        };
      case 'success':
        return {
          borderColor: '#4CAF50',
          backgroundColor: 'rgba(76,175,80,0.1)',
        };
      case 'error':
        return {
          borderColor: '#F44336',
          backgroundColor: 'rgba(244,67,54,0.1)',
        };
      default:
        return {};
    }
  };
  
  const stateStyles = getStateStyles();
  
  // Calculate final styles
  const buttonStyle: ViewStyle = {
    width: currentDimensions.size,
    height: currentDimensions.size,
    borderRadius: currentDimensions.borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
    padding: currentDimensions.padding,
    ...(variantStyles.glassMorphism && enableGlassMorphism 
      ? glassMorphismStyle 
      : {
          backgroundColor: variantStyles.backgroundColor,
          borderColor: variantStyles.borderColor,
          borderWidth: 1,
        }),
    ...stateStyles,
  };
  
  const animatedStyle: ViewStyle = {
    transform: [
      { scale: scaleValue },
      ...(loading ? [{
        rotate: rotationValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        }),
      }] : []),
    ],
    opacity: opacityValue,
  };
  
  const disabledStyle: ViewStyle = disabled ? {
    opacity: 0.5,
    pointerEvents: 'none',
  } : {};
  
  const iconWrapperStyle: ViewStyle = {
    width: currentDimensions.iconSize,
    height: currentDimensions.iconSize,
    justifyContent: 'center',
    alignItems: 'center',
  };
  
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
        disabled={disabled || loading}
        activeOpacity={0.8}
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
        accessibilityRole={accessibilityRole}
        accessibilityState={{ disabled: disabled || loading }}
        {...accessibilityProps}
        style={styles.touchable}
      >
        <View style={iconWrapperStyle}>
          {children}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

/**
 * Component styles
 */
const styles = StyleSheet.create({
  touchable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22, // Default medium size
  },
});

/**
 * Default export
 */
export default ButtonIcon;
