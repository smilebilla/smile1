/**
 * Corp Astro UI Library - Status Bar Overlay Component
 * 
 * Professional status bar overlay component providing gradient overlay effects
 * for enhanced visual hierarchy and seamless integration with Corp Astro design.
 * Creates smooth transitions between status bar and content areas.
 * 
 * Features:
 * - Fixed 44px height for consistent status bar area
 * - Gradient overlay effects with Corp Astro colors
 * - Multiple overlay variants (fade, gradient, blur)
 * - Theme-aware styling and colors
 * - Accessibility compliance
 * - Responsive design support
 * - Animation support
 * - Platform-specific adaptations
 * 
 * @module StatusBarOverlay
 * @version 1.0.0
 * @author Corp Astro Design System
 * @since 2024
 */

import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Platform,
  ViewStyle,
  ColorValue,
  StatusBar,
} from 'react-native';
import { useTheme } from '../../../foundations/themes/useTheme';
import { deepSpaceColors } from '../../../foundations/tokens/colors/DeepSpaceColors';
import { SignatureBlues } from '../../../foundations/tokens/colors/SignatureBlues';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Status bar overlay variants
 */
export type StatusBarOverlayVariant = 'fade' | 'gradient' | 'blur' | 'solid' | 'none';

/**
 * Status bar overlay position
 */
export type StatusBarOverlayPosition = 'top' | 'bottom' | 'both';

/**
 * Status bar overlay animation types
 */
export type StatusBarOverlayAnimation = 'fade' | 'slide' | 'scale' | 'none';

/**
 * Status bar overlay component props interface
 */
export interface StatusBarOverlayProps {
  /** Overlay variant type */
  variant?: StatusBarOverlayVariant;
  /** Overlay position */
  position?: StatusBarOverlayPosition;
  /** Custom height override */
  height?: number;
  /** Custom gradient colors */
  colors?: ColorValue[];
  /** Custom gradient locations */
  locations?: number[];
  /** Background color override */
  backgroundColor?: ColorValue;
  /** Overlay opacity */
  opacity?: number;
  /** Animation type */
  animation?: StatusBarOverlayAnimation;
  /** Animation duration in milliseconds */
  animationDuration?: number;
  /** Enable smooth transitions */
  animated?: boolean;
  /** Blur intensity (0-10) */
  blurIntensity?: number;
  /** Custom style overrides */
  style?: ViewStyle;
  /** Container style overrides */
  containerStyle?: ViewStyle;
  /** Gradient style overrides */
  gradientStyle?: ViewStyle;
  /** Enable safe area integration */
  safeArea?: boolean;
  /** Enable absolute positioning */
  absolute?: boolean;
  /** Z-index for layering */
  zIndex?: number;
  /** Accessibility props */
  accessibilityLabel?: string;
  /** Test ID for testing */
  testID?: string;
  /** Children components */
  children?: React.ReactNode;
}

// ============================================================================
// COMPONENT IMPLEMENTATION
// ============================================================================

/**
 * StatusBarOverlay - Professional status bar overlay with gradient effects
 * 
 * A comprehensive status bar overlay component that provides consistent
 * gradient overlay effects for enhanced visual hierarchy and seamless
 * integration with Corp Astro design.
 * 
 * @param props - Component props
 * @returns React component
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <StatusBarOverlay variant="gradient" />
 * 
 * // With custom colors
 * <StatusBarOverlay 
 *   variant="gradient"
 *   colors={['transparent', 'rgba(8,8,15,0.8)']}
 *   height={44}
 * />
 * 
 * // With animation
 * <StatusBarOverlay 
 *   variant="fade"
 *   animation="slide"
 *   animationDuration={300}
 * />
 * ```
 */
export const StatusBarOverlay: React.FC<StatusBarOverlayProps> = ({
  variant = 'fade',
  position = 'top',
  height = 44,
  colors,
  locations,
  backgroundColor,
  opacity = 1,
  animation = 'fade',
  animationDuration = 300,
  animated = true,
  blurIntensity = 5,
  style,
  containerStyle,
  gradientStyle,
  safeArea = true,
  absolute = true,
  zIndex = 1000,
  accessibilityLabel = 'Status Bar Overlay',
  testID = 'status-bar-overlay',
  children,
}) => {
  // ============================================================================
  // HOOKS & STATE
  // ============================================================================

  const { theme } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-height)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  // ============================================================================
  // COMPUTED VALUES
  // ============================================================================

  /**
   * Compute effective height including status bar
   */
  const effectiveHeight = React.useMemo(() => {
    const statusBarHeight = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 24;
    return safeArea ? height + statusBarHeight : height;
  }, [height, safeArea]);

  /**
   * Compute gradient colors based on variant
   */
  const computedColors = React.useMemo((): ColorValue[] => {
    if (colors) return colors;
    
    const baseColors = {
      fade: ['transparent', 'rgba(8,8,15,0.8)'],
      gradient: ['rgba(8,8,15,0)', 'rgba(8,8,15,0.9)', '#08080F'],
      blur: ['rgba(22,33,62,0.1)', 'rgba(22,33,62,0.3)'],
      solid: ['rgba(8,8,15,0.95)', 'rgba(8,8,15,0.95)'],
      none: ['transparent', 'transparent'],
    };
    
    return baseColors[variant] || baseColors.fade;
  }, [variant, colors]);

  /**
   * Compute gradient locations
   */
  const computedLocations = React.useMemo((): number[] => {
    if (locations) return locations;
    
    const baseLocations = {
      fade: [0, 1],
      gradient: [0, 0.5, 1],
      blur: [0, 1],
      solid: [0, 1],
      none: [0, 1],
    };
    
    return baseLocations[variant] || baseLocations.fade;
  }, [variant, locations]);

  /**
   * Compute container styles
   */
  const containerStyles = React.useMemo((): ViewStyle => {
    const baseStyle: ViewStyle = {
      height: effectiveHeight,
      opacity,
      zIndex,
    };

    if (absolute) {
      baseStyle.position = 'absolute';
      baseStyle.left = 0;
      baseStyle.right = 0;
      
      if (position === 'top' || position === 'both') {
        baseStyle.top = 0;
      }
      if (position === 'bottom' || position === 'both') {
        baseStyle.bottom = 0;
      }
    }

    if (backgroundColor) {
      baseStyle.backgroundColor = backgroundColor;
    }

    return {
      ...baseStyle,
      ...containerStyle,
    };
  }, [
    effectiveHeight,
    opacity,
    zIndex,
    absolute,
    position,
    backgroundColor,
    containerStyle,
  ]);

  /**
   * Compute gradient styles
   */
  const gradientStyles = React.useMemo((): ViewStyle => ({
    flex: 1,
    width: '100%',
    ...gradientStyle,
  }), [gradientStyle]);

  // ============================================================================
  // ANIMATION EFFECTS
  // ============================================================================

  /**
   * Initialize animations
   */
  useEffect(() => {
    if (!animated) return;

    const initAnimation = () => {
      switch (animation) {
        case 'fade':
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: animationDuration,
            useNativeDriver: true,
          }).start();
          break;
        case 'slide':
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: animationDuration,
            useNativeDriver: true,
          }).start();
          break;
        case 'scale':
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: animationDuration,
            useNativeDriver: true,
          }).start();
          break;
      }
    };

    initAnimation();
  }, [animated, animation, animationDuration, fadeAnim, slideAnim, scaleAnim]);

  /**
   * Get animated style based on animation type
   */
  const getAnimatedStyle = React.useCallback((): ViewStyle => {
    switch (animation) {
      case 'fade':
        return { opacity: fadeAnim };
      case 'slide':
        return { transform: [{ translateY: slideAnim }] };
      case 'scale':
        return { transform: [{ scale: scaleAnim }] };
      default:
        return {};
    }
  }, [animation, fadeAnim, slideAnim, scaleAnim]);

  // ============================================================================
  // ACCESSIBILITY
  // ============================================================================

  /**
   * Accessibility configuration
   */
  const accessibilityConfig = React.useMemo(() => ({
    accessibilityLabel,
    accessibilityRole: 'none' as const,
    accessibilityHint: 'Status bar overlay with gradient effect',
    testID,
  }), [accessibilityLabel, testID]);

  // ============================================================================
  // RENDER HELPERS
  // ============================================================================

  /**
   * Render gradient overlay
   */
  const renderGradientOverlay = () => {
    if (variant === 'none') return null;
    
    // For now, use a simple View with background color
    // TODO: Replace with proper gradient once expo-linear-gradient is available
    const gradientColor = computedColors[computedColors.length - 1];
    
    return (
      <View
        style={[
          gradientStyles,
          {
            backgroundColor: gradientColor,
          },
        ]}
      />
    );
  };

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  return (
    <Animated.View
      style={[
        containerStyles,
        animated ? getAnimatedStyle() : {},
        style,
      ]}
      {...accessibilityConfig}
    >
      {renderGradientOverlay()}
      {children}
    </Animated.View>
  );
};

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  // Additional styles if needed
});

// ============================================================================
// EXPORTS
// ============================================================================

export default StatusBarOverlay;
