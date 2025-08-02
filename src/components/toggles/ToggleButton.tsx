/**
 * Corp Astro UI Library - Toggle Button Component
 * 
 * A toggle button component with cosmic design aesthetics.
 * Different from Switch - this is a button that can be toggled on/off.
 * 
 * Features:
 * - Cosmic styling with gradient states
 * - Smooth toggle animations
 * - Accessibility support
 * - Theme-aware styling
 * - Haptic feedback
 * - Icon and text support
 * 
 * Design System Compliance:
 * - Height: 44px default, 36px small, 52px large
 * - BorderRadius: 22px for pill shape
 * - Active: cosmic gradient background
 * - Inactive: rgba(22,33,62,0.2) background
 * - Typography: Inter font, proper weights
 * 
 * @module ToggleButton
 * @version 1.0.0
 * @since 2024
 */

import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity,
  Text,
  Animated,
  StyleSheet,
  ViewStyle,
  TextStyle,
  AccessibilityProps,
  GestureResponderEvent,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../foundations/themes/useTheme';
import { SignatureBlues } from '../foundations/tokens/colors/SignatureBlues';
import { ProfessionalGrays } from '../foundations/tokens/colors/ProfessionalGrays';
import { spacing } from '../foundations/tokens/spacing/SpacingScale';

/**
 * Toggle button size types
 */
export type ToggleButtonSize = 'small' | 'medium' | 'large';

/**
 * Toggle button variant types
 */
export type ToggleButtonVariant = 'default' | 'outlined' | 'ghost';

/**
 * Toggle button component props
 */
export interface ToggleButtonProps extends AccessibilityProps {
  /** Button label */
  children: React.ReactNode;
  /** Whether button is toggled */
  toggled?: boolean;
  /** Default toggled state (uncontrolled) */
  defaultToggled?: boolean;
  /** Button size */
  size?: ToggleButtonSize;
  /** Button variant */
  variant?: ToggleButtonVariant;
  /** Whether button is disabled */
  disabled?: boolean;
  /** Whether button is loading */
  loading?: boolean;
  /** Left icon */
  leftIcon?: React.ReactNode;
  /** Right icon */
  rightIcon?: React.ReactNode;
  /** Toggle change handler */
  onToggle?: (toggled: boolean) => void;
  /** Press handler */
  onPress?: (event: GestureResponderEvent) => void;
  /** Enable haptic feedback */
  hapticFeedback?: boolean;
  /** Custom container styling */
  style?: ViewStyle;
  /** Custom text styling */
  textStyle?: TextStyle;
  /** Test ID for testing */
  testID?: string;
}

/**
 * Toggle button component with cosmic design aesthetics
 */
export const ToggleButton: React.FC<ToggleButtonProps> = ({
  children,
  toggled,
  defaultToggled = false,
  size = 'medium',
  variant = 'default',
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  onToggle,
  onPress,
  hapticFeedback = true,
  style,
  textStyle,
  testID,
  ...accessibilityProps
}) => {
  const { theme } = useTheme();
  const [isToggled, setIsToggled] = useState(toggled ?? defaultToggled);
  const [scaleValue] = useState(new Animated.Value(1));
  const [glowValue] = useState(new Animated.Value(0));

  // Update internal state when controlled prop changes
  useEffect(() => {
    if (toggled !== undefined) {
      setIsToggled(toggled);
    }
  }, [toggled]);

  // Animate glow effect
  useEffect(() => {
    Animated.timing(glowValue, {
      toValue: isToggled ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isToggled, glowValue]);

  // Get size styles
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          height: 36,
          paddingHorizontal: 16,
          borderRadius: 18,
        };
      case 'large':
        return {
          height: 52,
          paddingHorizontal: 24,
          borderRadius: 26,
        };
      default:
        return {
          height: 44,
          paddingHorizontal: 20,
          borderRadius: 22,
        };
    }
  };

  // Get text size styles
  const getTextSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          fontSize: 14,
          lineHeight: 18,
        };
      case 'large':
        return {
          fontSize: 18,
          lineHeight: 22,
        };
      default:
        return {
          fontSize: 16,
          lineHeight: 20,
        };
    }
  };

  // Get variant styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'outlined':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: isToggled ? SignatureBlues.primary : 'rgba(255, 255, 255, 0.2)',
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
        };
      default:
        return {
          backgroundColor: isToggled ? 'transparent' : 'rgba(22, 33, 62, 0.2)',
        };
    }
  };

  // Handle press
  const handlePress = (event: GestureResponderEvent) => {
    if (disabled || loading) return;

    // Haptic feedback
    if (hapticFeedback && Platform.OS === 'ios') {
      // HapticFeedback.impactAsync(HapticFeedback.ImpactFeedbackStyle.Light);
    }

    // Scale animation
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Toggle state
    const newToggled = !isToggled;
    if (toggled === undefined) {
      setIsToggled(newToggled);
    }

    // Callbacks
    onToggle?.(newToggled);
    onPress?.(event);
  };

  // Get disabled styles
  const getDisabledStyles = () => {
    if (disabled) {
      return { opacity: 0.5 };
    }
    return {};
  };

  // Render gradient background for active state
  const renderBackground = () => {
    if (isToggled && variant === 'default') {
      return (
        <LinearGradient
          colors={[SignatureBlues.primary, SignatureBlues.light]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={StyleSheet.absoluteFillObject}
        />
      );
    }
    return null;
  };

  // Combine styles
  const buttonStyles = [
    styles.button,
    getSizeStyles(),
    getVariantStyles(),
    getDisabledStyles(),
    style,
    {
      transform: [{ scale: scaleValue }],
    },
  ];

  const textStyles = [
    styles.text,
    getTextSizeStyles(),
    {
      color: isToggled ? '#FFFFFF' : ProfessionalGrays.light,
      fontWeight: isToggled ? ('600' as const) : ('400' as const),
    },
    textStyle,
  ];

  return (
    <Animated.View style={buttonStyles}>
      {renderBackground()}
      <TouchableOpacity
        style={styles.touchable}
        onPress={handlePress}
        disabled={disabled || loading}
        activeOpacity={0.9}
        testID={testID}
        accessibilityRole="button"
        accessibilityState={{ selected: isToggled }}
        {...accessibilityProps}
      >
        {leftIcon && <>{leftIcon}</>}
        <Text style={textStyles}>{children}</Text>
        {rightIcon && <>{rightIcon}</>}
      </TouchableOpacity>
    </Animated.View>
  );
};

/**
 * Toggle button component styles
 */
const styles = StyleSheet.create({
  button: {
    position: 'relative',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchable: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  text: {
    fontFamily: 'Inter',
    fontWeight: '400',
    textAlign: 'center',
  },
});

export default ToggleButton;
