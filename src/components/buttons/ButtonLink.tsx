/**
 * Corp Astro UI Library - Link Button Component
 * 
 * Inline text button with link-style appearance and hover effects.
 * Provides a minimal, text-focused button option for inline actions.
 * 
 * @module ButtonLink
 * @version 1.0.0
 * @since 2024
 * 
 * UI Documentation Reference:
 * - Typography: Inter, 14px, 500 weight, color: '#54A0FF'
 * - Hover: glow effect '0 0 10px rgba(84,160,255,0.5)'
 * - Inline behavior: no padding, no background
 * - Accessible touch targets
 * 
 * Features:
 * - Inline text behavior
 * - Hover glow effects
 * - Minimal visual footprint
 * - Accessibility support
 * - Responsive touch targets
 * - Animation states
 * - Theme integration
 */

import React, { useState, useRef } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Animated,
  Easing,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
  AccessibilityProps,
  Platform,
} from 'react-native';
import { useTheme } from '../foundations/themes/ThemeProvider';
import { SignatureBlues } from '../foundations/tokens/colors/SignatureBlues';
import { ProfessionalGrays } from '../foundations/tokens/colors/ProfessionalGrays';

/**
 * Link button size variants
 */
export type ButtonLinkSize = 'small' | 'medium' | 'large';

/**
 * Link button variant types
 */
export type ButtonLinkVariant = 'default' | 'muted' | 'primary';

/**
 * Link button configuration
 */
export interface ButtonLinkConfig {
  /** Button variant */
  variant: ButtonLinkVariant;
  /** Button size */
  size: ButtonLinkSize;
  /** Show underline */
  showUnderline: boolean;
  /** Enable glow effect */
  enableGlow: boolean;
  /** Inline behavior */
  inline: boolean;
}

/**
 * Link button props interface
 */
export interface ButtonLinkProps extends AccessibilityProps {
  /** Button text content */
  children: string;
  /** Press handler */
  onPress?: (event: GestureResponderEvent) => void;
  /** Long press handler */
  onLongPress?: (event: GestureResponderEvent) => void;
  /** Press in handler */
  onPressIn?: (event: GestureResponderEvent) => void;
  /** Press out handler */
  onPressOut?: (event: GestureResponderEvent) => void;
  /** Disabled state */
  disabled?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Button size */
  size?: ButtonLinkSize;
  /** Button variant */
  variant?: ButtonLinkVariant;
  /** Show underline */
  showUnderline?: boolean;
  /** Enable glow effect */
  enableGlow?: boolean;
  /** Inline behavior */
  inline?: boolean;
  /** Custom text style */
  textStyle?: TextStyle;
  /** Custom container style */
  style?: ViewStyle;
  /** Test ID for testing */
  testID?: string;
}

/**
 * Default button configuration
 */
const DEFAULT_CONFIG: ButtonLinkConfig = {
  variant: 'default',
  size: 'medium',
  showUnderline: false,
  enableGlow: true,
  inline: true,
};

/**
 * Link Button Component
 * 
 * Inline text button with link-style appearance and hover effects.
 * Follows Corp Astro design system specifications.
 * 
 * @param props - Button props
 * @returns JSX.Element
 */
export const ButtonLink: React.FC<ButtonLinkProps> = ({
  children,
  onPress,
  onLongPress,
  onPressIn,
  onPressOut,
  disabled = false,
  loading = false,
  size = DEFAULT_CONFIG.size,
  variant = DEFAULT_CONFIG.variant,
  showUnderline = DEFAULT_CONFIG.showUnderline,
  enableGlow = DEFAULT_CONFIG.enableGlow,
  inline = DEFAULT_CONFIG.inline,
  textStyle,
  style,
  testID,
  ...accessibilityProps
}) => {
  // Animation values
  const scaleValue = useRef(new Animated.Value(1)).current;
  const opacityValue = useRef(new Animated.Value(1)).current;
  const glowValue = useRef(new Animated.Value(0)).current;
  
  // State
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Theme
  const theme = useTheme();

  /**
   * Handle press in with animation
   */
  const handlePressIn = (event: GestureResponderEvent) => {
    if (disabled || loading) return;
    
    setIsPressed(true);
    
    // Scale animation
    Animated.timing(scaleValue, {
      toValue: 0.95,
      duration: 100,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
    
    // Glow animation
    if (enableGlow) {
      Animated.timing(glowValue, {
        toValue: 1,
        duration: 150,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }).start();
    }
    
    // Haptic feedback
    if (Platform.OS === 'ios') {
      // Add haptic feedback for iOS
    }
    
    onPressIn?.(event);
  };

  /**
   * Handle press out with animation
   */
  const handlePressOut = (event: GestureResponderEvent) => {
    if (disabled || loading) return;
    
    setIsPressed(false);
    
    // Scale animation
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 200,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
    
    // Glow animation
    if (enableGlow) {
      Animated.timing(glowValue, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }).start();
    }
    
    onPressOut?.(event);
  };

  /**
   * Handle hover in (web)
   */
  const handleHoverIn = () => {
    if (disabled || loading) return;
    
    setIsHovered(true);
    
    // Glow animation
    if (enableGlow) {
      Animated.timing(glowValue, {
        toValue: 0.8,
        duration: 200,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }).start();
    }
  };

  /**
   * Handle hover out (web)
   */
  const handleHoverOut = () => {
    if (disabled || loading) return;
    
    setIsHovered(false);
    
    // Glow animation
    if (enableGlow && !isPressed) {
      Animated.timing(glowValue, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }).start();
    }
  };

  /**
   * Get container style based on state and configuration
   */
  const getContainerStyle = (): ViewStyle => {
    const base: ViewStyle = {
      opacity: disabled ? 0.4 : 1,
      alignSelf: inline ? 'flex-start' : 'stretch',
      minHeight: 44, // Accessibility touch target
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: inline ? 0 : 8,
      paddingVertical: 4,
    };

    return base;
  };

  /**
   * Get text style based on configuration
   */
  const getTextStyle = (): TextStyle => {
    const base: TextStyle = {
      fontFamily: 'Inter',
      fontWeight: '500',
      includeFontPadding: false,
      textAlignVertical: 'center',
    };

    // Size variants
    const sizeStyles: Record<ButtonLinkSize, TextStyle> = {
      small: {
        fontSize: 12,
        lineHeight: 16,
      },
      medium: {
        fontSize: 14,
        lineHeight: 20,
      },
      large: {
        fontSize: 16,
        lineHeight: 24,
      },
    };

    // Variant styles
    const variantStyles: Record<ButtonLinkVariant, TextStyle> = {
      default: {
        color: SignatureBlues.light, // #54A0FF
      },
      muted: {
        color: ProfessionalGrays.text, // #B8B8C0
      },
      primary: {
        color: SignatureBlues.primary, // #2E86DE
      },
    };

    // Underline style
    const underlineStyle: TextStyle = showUnderline ? {
      textDecorationLine: 'underline',
      textDecorationColor: variantStyles[variant].color,
    } : {};

    return {
      ...base,
      ...sizeStyles[size],
      ...variantStyles[variant],
      ...underlineStyle,
    };
  };

  /**
   * Get glow style based on animation
   */
  const getGlowStyle = (): ViewStyle => {
    if (!enableGlow) return {};

    return {
      shadowColor: SignatureBlues.light,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: glowValue,
      shadowRadius: 10,
      elevation: 0,
    };
  };

  return (
    <TouchableOpacity
      accessible={true}
      accessibilityRole="button"
      accessibilityState={{ disabled, busy: loading }}
      testID={testID}
      style={[
        styles.container,
        getContainerStyle(),
        getGlowStyle(),
        style,
      ]}
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      {...(Platform.OS === 'web' && {
        onMouseEnter: handleHoverIn,
        onMouseLeave: handleHoverOut,
      } as any)}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...accessibilityProps}
    >
      <Animated.View
        style={[
          styles.content,
          {
            transform: [{ scale: scaleValue }],
            opacity: opacityValue,
          },
        ]}
      >
        <Text
          style={[
            getTextStyle(),
            textStyle,
          ]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {loading ? 'Loading...' : children}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

/**
 * Component styles
 */
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    borderRadius: 0,
    overflow: 'visible',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

/**
 * Default export
 */
export default ButtonLink;

/**
 * Named exports for convenience
 */
export {
  ButtonLink as LinkButton,
  ButtonLink as TextButton,
};
