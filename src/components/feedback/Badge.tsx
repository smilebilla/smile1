/**
 * Corp Astro UI Library - Badge Component
 * 
 * Versatile badge component for status indicators, notifications, and labels.
 * Supports multiple variants, sizes, and cosmic styling effects.
 * 
 * @module Badge
 * @version 1.0.0
 * @since 2024
 * 
 * UI Documentation Reference:
 * - Small rounded indicators with text or icons
 * - Various colors for different states (success, warning, error, info)
 * - Supports positioning (absolute, relative) and animation
 * - Notification badges with count numbers
 * - Status badges with dot indicators
 * - Premium styling with gradients and glow effects
 * 
 * Features:
 * - Multiple variants (dot, text, number, status)
 * - Size variations (small, medium, large)
 * - Color system integration
 * - Animation and pulsing effects
 * - Positioning utilities
 * - Accessibility support
 * - Theme integration
 */

import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Animated,
  AccessibilityProps,
} from 'react-native';
import { useTheme } from '../foundations/themes/ThemeProvider';
import { deepSpaceColors } from '../foundations/tokens/colors/DeepSpaceColors';
import { SignatureBlues } from '../foundations/tokens/colors/SignatureBlues';
import { RoyalPurples } from '../foundations/tokens/colors/RoyalPurples';
import { LuxuryGolds } from '../foundations/tokens/colors/LuxuryGolds';
import { spacing } from '../foundations/tokens/spacing/SpacingScale';

/**
 * Badge variant types
 */
export type BadgeVariant = 'dot' | 'text' | 'number' | 'status' | 'outline';

/**
 * Badge size types
 */
export type BadgeSize = 'small' | 'medium' | 'large';

/**
 * Badge color types
 */
export type BadgeColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'gold' | 'purple';

/**
 * Badge position types
 */
export type BadgePosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'center';

/**
 * Badge animation types
 */
export type BadgeAnimation = 'none' | 'pulse' | 'bounce' | 'fade' | 'scale';

/**
 * Badge configuration
 */
export interface BadgeConfig {
  /** Badge variant */
  variant: BadgeVariant;
  /** Badge size */
  size: BadgeSize;
  /** Badge color */
  color: BadgeColor;
  /** Badge position */
  position: BadgePosition;
  /** Badge animation */
  animation: BadgeAnimation;
  /** Show glow effect */
  showGlow: boolean;
  /** Maximum number to display (for number badges) */
  maxCount: number;
  /** Whether to show plus sign for overflow */
  showPlus: boolean;
}

/**
 * Badge component props
 */
export interface BadgeProps extends AccessibilityProps {
  /** Badge content (text or number) */
  children?: React.ReactNode;
  /** Badge variant */
  variant?: BadgeVariant;
  /** Badge size */
  size?: BadgeSize;
  /** Badge color */
  color?: BadgeColor;
  /** Badge position */
  position?: BadgePosition;
  /** Badge animation */
  animation?: BadgeAnimation;
  /** Badge count (for number badges) */
  count?: number;
  /** Maximum count to display */
  maxCount?: number;
  /** Show plus sign for overflow */
  showPlus?: boolean;
  /** Show glow effect */
  showGlow?: boolean;
  /** Whether badge is visible */
  visible?: boolean;
  /** Custom background color */
  backgroundColor?: string;
  /** Custom text color */
  textColor?: string;
  /** Custom styling */
  style?: ViewStyle;
  /** Custom text styling */
  textStyle?: TextStyle;
  /** Test ID for testing */
  testID?: string;
}

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Default badge configuration
 */
const defaultConfig: BadgeConfig = {
  variant: 'text',
  size: 'medium',
  color: 'primary',
  position: 'top-right',
  animation: 'none',
  showGlow: false,
  maxCount: 99,
  showPlus: true,
};

/**
 * Badge color mappings
 */
const badgeColors = {
  primary: SignatureBlues.primary,
  secondary: deepSpaceColors.dark,
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  gold: LuxuryGolds.pure,
  purple: RoyalPurples.royal,
};

/**
 * Badge glow colors
 */
const badgeGlowColors = {
  primary: 'rgba(46, 134, 222, 0.5)',
  secondary: 'rgba(22, 33, 62, 0.5)',
  success: 'rgba(16, 185, 129, 0.5)',
  warning: 'rgba(245, 158, 11, 0.5)',
  error: 'rgba(239, 68, 68, 0.5)',
  info: 'rgba(59, 130, 246, 0.5)',
  gold: 'rgba(255, 215, 0, 0.5)',
  purple: 'rgba(108, 92, 231, 0.5)',
};

// ============================================================================
// COMPONENT IMPLEMENTATION
// ============================================================================

/**
 * Badge component
 * 
 * A versatile badge component with cosmic design aesthetics.
 * Supports multiple variants, sizes, and animation patterns.
 * 
 * @param props - Badge component props
 * @returns Badge component
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'text',
  size = 'medium',
  color = 'primary',
  position = 'top-right',
  animation = 'none',
  count,
  maxCount = 99,
  showPlus = true,
  showGlow = false,
  visible = true,
  backgroundColor,
  textColor,
  style,
  textStyle,
  testID,
  ...accessibilityProps
}) => {
  const { theme } = useTheme();
  const animationValue = useRef(new Animated.Value(1)).current;
  const glowValue = useRef(new Animated.Value(0)).current;

  // Final configuration
  const finalConfig: BadgeConfig = {
    variant,
    size,
    color,
    position,
    animation,
    showGlow,
    maxCount,
    showPlus,
  };

  // ============================================================================
  // ANIMATION LOGIC
  // ============================================================================

  useEffect(() => {
    if (!visible) return;

    let animationLoop: Animated.CompositeAnimation | undefined;

    switch (animation) {
      case 'pulse':
        animationLoop = Animated.loop(
          Animated.sequence([
            Animated.timing(animationValue, {
              toValue: 1.2,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(animationValue, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
            }),
          ])
        );
        break;
      case 'bounce':
        animationLoop = Animated.loop(
          Animated.sequence([
            Animated.timing(animationValue, {
              toValue: 1.1,
              duration: 600,
              useNativeDriver: true,
            }),
            Animated.timing(animationValue, {
              toValue: 1,
              duration: 600,
              useNativeDriver: true,
            }),
          ])
        );
        break;
      case 'fade':
        animationLoop = Animated.loop(
          Animated.sequence([
            Animated.timing(animationValue, {
              toValue: 0.5,
              duration: 1500,
              useNativeDriver: true,
            }),
            Animated.timing(animationValue, {
              toValue: 1,
              duration: 1500,
              useNativeDriver: true,
            }),
          ])
        );
        break;
      case 'scale':
        animationLoop = Animated.loop(
          Animated.sequence([
            Animated.timing(animationValue, {
              toValue: 0.8,
              duration: 800,
              useNativeDriver: true,
            }),
            Animated.timing(animationValue, {
              toValue: 1,
              duration: 800,
              useNativeDriver: true,
            }),
          ])
        );
        break;
      default:
        break;
    }

    if (animationLoop) {
      animationLoop.start();
    }

    // Glow animation
    if (showGlow) {
      const glowAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(glowValue, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: false,
          }),
          Animated.timing(glowValue, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: false,
          }),
        ])
      );
      glowAnimation.start();
    }

    return () => {
      if (animationLoop) {
        animationLoop.stop();
      }
    };
  }, [animation, visible, showGlow, animationValue, glowValue]);

  // ============================================================================
  // RENDER HELPERS
  // ============================================================================

  /**
   * Get badge content based on variant
   */
  const getBadgeContent = (): React.ReactNode => {
    switch (variant) {
      case 'dot':
        return null;
      case 'number':
        if (count === undefined) return null;
        const displayCount = count > maxCount ? (showPlus ? `${maxCount}+` : String(maxCount)) : String(count);
        return count > 0 ? displayCount : null;
      case 'text':
      case 'status':
      case 'outline':
      default:
        return children;
    }
  };

  /**
   * Get badge styles
   */
  const getBadgeStyles = (): ViewStyle => {
    const sizeConfig = getSizeConfig(size);
    const colorConfig = getColorConfig(color, variant);
    const positionConfig = getPositionConfig(position);

    return {
      ...sizeConfig,
      ...colorConfig,
      ...positionConfig,
      opacity: visible ? 1 : 0,
    };
  };

  /**
   * Get text styles
   */
  const getTextStyles = (): TextStyle => {
    const sizeConfig = getSizeConfig(size);
    const colorConfig = getColorConfig(color, variant);

    return {
      fontSize: sizeConfig.fontSize,
      fontWeight: '600',
      color: textColor || colorConfig.textColor,
      textAlign: 'center',
    };
  };

  /**
   * Get glow styles
   */
  const getGlowStyles = (): ViewStyle => {
    if (!showGlow) return {};

    const glowOpacity = glowValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    return {
      shadowColor: badgeGlowColors[color],
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: glowOpacity,
      shadowRadius: 10,
      elevation: 5,
    };
  };

  // ============================================================================
  // RENDER
  // ============================================================================

  const content = getBadgeContent();
  const badgeStyles = getBadgeStyles();
  const textStyles = getTextStyles();
  const glowStyles = getGlowStyles();

  if (!visible || (variant === 'number' && (count === undefined || count <= 0))) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.badge,
        badgeStyles,
        glowStyles,
        {
          transform: [{ scale: animationValue }],
        },
        style,
      ]}
      testID={testID}
      {...accessibilityProps}
    >
      {content && (
        <Text style={[textStyles, textStyle]}>
          {content}
        </Text>
      )}
    </Animated.View>
  );
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get size configuration
 */
const getSizeConfig = (size: BadgeSize) => {
  switch (size) {
    case 'small':
      return {
        minWidth: 16,
        height: 16,
        borderRadius: 8,
        paddingHorizontal: 4,
        fontSize: 10,
      };
    case 'large':
      return {
        minWidth: 28,
        height: 28,
        borderRadius: 14,
        paddingHorizontal: 8,
        fontSize: 14,
      };
    case 'medium':
    default:
      return {
        minWidth: 20,
        height: 20,
        borderRadius: 10,
        paddingHorizontal: 6,
        fontSize: 12,
      };
  }
};

/**
 * Get color configuration
 */
const getColorConfig = (color: BadgeColor, variant: BadgeVariant) => {
  const baseColor = badgeColors[color];

  switch (variant) {
    case 'outline':
      return {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: baseColor,
        textColor: baseColor,
      };
    case 'dot':
      return {
        backgroundColor: baseColor,
        textColor: '#FFFFFF',
      };
    default:
      return {
        backgroundColor: baseColor,
        textColor: '#FFFFFF',
      };
  }
};

/**
 * Get position configuration
 */
const getPositionConfig = (position: BadgePosition) => {
  switch (position) {
    case 'top-right':
      return {
        position: 'absolute' as const,
        top: -8,
        right: -8,
      };
    case 'top-left':
      return {
        position: 'absolute' as const,
        top: -8,
        left: -8,
      };
    case 'bottom-right':
      return {
        position: 'absolute' as const,
        bottom: -8,
        right: -8,
      };
    case 'bottom-left':
      return {
        position: 'absolute' as const,
        bottom: -8,
        left: -8,
      };
    case 'center':
    default:
      return {
        position: 'relative' as const,
      };
  }
};

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  badge: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});

// ============================================================================
// EXPORTS
// ============================================================================

export default Badge;
