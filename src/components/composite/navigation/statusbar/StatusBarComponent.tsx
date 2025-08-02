/**
 * Corp Astro UI Library - Status Bar Component
 * 
 * Professional status bar component with Corp Astro design system integration.
 * Provides consistent status bar styling across the application with proper
 * theming, accessibility, and responsive design support.
 * 
 * Features:
 * - Light content style for dark backgrounds
 * - Transparent background integration
 * - Theme-aware styling
 * - Accessibility compliance
 * - Responsive design support
 * - Animation support
 * - Platform-specific adaptations
 * 
 * @module StatusBarComponent
 * @version 1.0.0
 * @author Corp Astro Design System
 * @since 2024
 */

import React, { useEffect, useRef } from 'react';
import {
  StatusBar,
  StatusBarStyle,
  Platform,
  Animated,
  StatusBarProps,
  ColorValue,
} from 'react-native';
import { useTheme } from '../../../foundations/themes';
import { SignatureBlues } from '../../../foundations/tokens/colors/SignatureBlues';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Status bar style variants
 */
export type StatusBarVariant = 'default' | 'light-content' | 'dark-content' | 'transparent';

/**
 * Status bar theme variants
 */
export type StatusBarTheme = 'dark' | 'light' | 'auto';

/**
 * Status bar animation types
 */
export type StatusBarAnimation = 'fade' | 'slide' | 'none';

/**
 * Status bar component props interface
 */
export interface StatusBarComponentProps extends Omit<StatusBarProps, 'barStyle' | 'backgroundColor'> {
  /** Status bar style variant */
  variant?: StatusBarVariant;
  /** Theme variant */
  theme?: StatusBarTheme;
  /** Background color override */
  backgroundColor?: ColorValue;
  /** Status bar content style */
  barStyle?: StatusBarStyle;
  /** Animation type for transitions */
  animation?: StatusBarAnimation;
  /** Animation duration in milliseconds */
  animationDuration?: number;
  /** Enable smooth transitions */
  animated?: boolean;
  /** Custom status bar height (Android) */
  customHeight?: number;
  /** Enable immersive mode */
  immersive?: boolean;
  /** Safe area integration */
  safeArea?: boolean;
  /** Custom styling */
  style?: object;
  /** Accessibility props */
  accessibilityLabel?: string;
  /** Test ID for testing */
  testID?: string;
}

// ============================================================================
// COMPONENT IMPLEMENTATION
// ============================================================================

/**
 * StatusBarComponent - Professional status bar with Corp Astro styling
 * 
 * A comprehensive status bar component that provides consistent styling
 * across the application with proper theming, accessibility, and responsive
 * design support.
 * 
 * @param props - Component props
 * @returns React component
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <StatusBarComponent variant="light-content" />
 * 
 * // With custom styling
 * <StatusBarComponent 
 *   variant="transparent"
 *   theme="dark"
 *   animation="fade"
 *   animationDuration={300}
 * />
 * 
 * // With background color
 * <StatusBarComponent 
 *   backgroundColor="rgba(8,8,15,0.95)"
 *   barStyle="light-content"
 * />
 * ```
 */
export const StatusBarComponent: React.FC<StatusBarComponentProps> = ({
  variant = 'default',
  theme = 'auto',
  backgroundColor,
  barStyle,
  animation = 'fade',
  animationDuration = 300,
  animated = true,
  customHeight,
  immersive = false,
  safeArea = true,
  style,
  accessibilityLabel = 'Status Bar',
  testID = 'status-bar-component',
  ...props
}) => {
  // ============================================================================
  // HOOKS & STATE
  // ============================================================================

  const { theme: currentTheme } = useTheme();
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // ============================================================================
  // COMPUTED VALUES
  // ============================================================================

  /**
   * Compute status bar style based on variant and theme
   */
  const computedBarStyle: StatusBarStyle = React.useMemo(() => {
    if (barStyle) return barStyle;
    
    const effectiveTheme = theme === 'auto' ? 'dark' : theme; // Corp Astro is primarily dark
    
    switch (variant) {
      case 'light-content':
        return 'light-content';
      case 'dark-content':
        return 'dark-content';
      case 'transparent':
        return 'light-content'; // Default for transparent on dark backgrounds
      default:
        return effectiveTheme === 'dark' ? 'light-content' : 'dark-content';
    }
  }, [variant, theme, barStyle]);

  /**
   * Compute background color based on variant and theme
   */
  const computedBackgroundColor: ColorValue = React.useMemo(() => {
    if (backgroundColor) return backgroundColor;
    
    switch (variant) {
      case 'transparent':
        return 'transparent';
      case 'light-content':
        return 'transparent'; // Corp Astro uses transparent for light content
      case 'dark-content':
        return '#FFFFFF';
      default:
        return 'transparent'; // Corp Astro default
    }
  }, [variant, backgroundColor]);

  /**
   * Compute if status bar should be hidden
   */
  const shouldHide = React.useMemo(() => {
    return immersive || props.hidden || false;
  }, [immersive, props.hidden]);

  // ============================================================================
  // ANIMATION EFFECTS
  // ============================================================================

  /**
   * Handle status bar animation
   */
  useEffect(() => {
    if (!animated || animation === 'none') return;

    const animateStatusBar = () => {
      if (animation === 'fade') {
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: animationDuration / 2,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: animationDuration / 2,
            useNativeDriver: true,
          }),
        ]).start();
      }
    };

    animateStatusBar();
  }, [variant, theme, animation, animationDuration, animated, fadeAnim]);

  // ============================================================================
  // PLATFORM-SPECIFIC ADJUSTMENTS
  // ============================================================================

  /**
   * Platform-specific props
   */
  const platformProps = React.useMemo(() => {
    const baseProps = {
      barStyle: computedBarStyle,
      backgroundColor: computedBackgroundColor,
      animated: animated,
      hidden: shouldHide,
      ...props,
    };

    if (Platform.OS === 'android') {
      return {
        ...baseProps,
        translucent: props.translucent !== undefined ? props.translucent : (variant === 'transparent' || safeArea),
        showHideTransition: (animation === 'slide' ? 'slide' : 'fade') as 'slide' | 'fade' | 'none',
      };
    }

    return baseProps;
  }, [
    computedBarStyle,
    computedBackgroundColor,
    animated,
    shouldHide,
    variant,
    safeArea,
    animation,
    props,
  ]);

  // ============================================================================
  // ACCESSIBILITY
  // ============================================================================

  /**
   * Accessibility configuration
   */
  const accessibilityConfig = React.useMemo(() => ({
    accessibilityLabel,
    accessibilityRole: 'none' as const,
    accessibilityHint: 'Status bar with Corp Astro styling',
    testID,
  }), [accessibilityLabel, testID]);

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <Animated.View
      style={[
        {
          opacity: animation === 'fade' ? fadeAnim : 1,
          height: customHeight || (Platform.OS === 'android' ? 0 : undefined),
        },
        style,
      ]}
      {...accessibilityConfig}
    >
      <StatusBar {...platformProps} />
    </Animated.View>
  );
};

// ============================================================================
// EXPORTS
// ============================================================================

export default StatusBarComponent;
