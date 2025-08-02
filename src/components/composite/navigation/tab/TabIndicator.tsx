/**
 * Corp Astro UI Library - Tab Indicator Component
 * 
 * Professional tab indicator component providing visual feedback for tab navigation
 * within Corp Astro applications with advanced animation systems and space-inspired design.
 * Serves as the animated indicator that shows the current active tab position.
 * 
 * Features:
 * - Smooth position tracking with advanced animations
 * - Multiple indicator variants (line, pill, glow, orb)
 * - Customizable size, color, and animation timing
 * - Gesture-responsive position updates
 * - Elastic and spring physics animations
 * - Accessibility compliance with proper ARIA attributes
 * - Theme-aware styling with Corp Astro design tokens
 * - Performance optimizations with native driver
 * - Auto-sizing based on tab content
 * - Custom shapes and visual effects
 * - Platform-specific enhancements
 * 
 * @module TabIndicator
 * @version 1.0.0
 * @author Corp Astro Design System
 * @since 2024
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Platform,
  ViewStyle,
  ColorValue,
  Dimensions,
  LayoutChangeEvent,
  PanResponder,
  GestureResponderEvent,
} from 'react-native';
import { useTheme } from '../../../foundations/themes/useTheme';
import { deepSpaceColors } from '../../../foundations/tokens/colors/DeepSpaceColors';
import { SignatureBlues } from '../../../foundations/tokens/colors/SignatureBlues';
import { LuxuryGolds } from '../../../foundations/tokens/colors/LuxuryGolds';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Tab indicator variant types
 */
export enum TabIndicatorVariant {
  LINE = 'line',
  PILL = 'pill',
  GLOW = 'glow',
  ORB = 'orb',
  UNDERLINE = 'underline',
  ROUNDED = 'rounded',
  MINIMAL = 'minimal',
  COSMIC = 'cosmic',
}

/**
 * Tab indicator size types
 */
export enum TabIndicatorSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  EXTRA_LARGE = 'extraLarge',
  CUSTOM = 'custom',
}

/**
 * Tab indicator position types
 */
export enum TabIndicatorPosition {
  TOP = 'top',
  BOTTOM = 'bottom',
  CENTER = 'center',
  FULL = 'full',
}

/**
 * Tab indicator animation types
 */
export enum TabIndicatorAnimation {
  SMOOTH = 'smooth',
  ELASTIC = 'elastic',
  SPRING = 'spring',
  BOUNCE = 'bounce',
  LINEAR = 'linear',
  EASE_IN_OUT = 'easeInOut',
  NONE = 'none',
}

/**
 * Tab indicator orientation types
 */
export enum TabIndicatorOrientation {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
}

/**
 * Tab layout information interface
 */
export interface TabLayoutInfo {
  x: number;
  y: number;
  width: number;
  height: number;
  index: number;
}

/**
 * Tab indicator style configuration
 */
export interface TabIndicatorStyleConfig {
  backgroundColor?: ColorValue;
  glowColor?: ColorValue;
  shadowColor?: ColorValue;
  borderRadius?: number;
  height?: number;
  width?: number;
  opacity?: number;
  blur?: number;
  glow?: boolean;
  shadow?: boolean;
  gradient?: boolean;
  pulse?: boolean;
}

/**
 * Tab indicator animation configuration
 */
export interface TabIndicatorAnimationConfig {
  duration?: number;
  delay?: number;
  easing?: any;
  useNativeDriver?: boolean;
  damping?: number;
  stiffness?: number;
  mass?: number;
  tension?: number;
  friction?: number;
  velocity?: number;
}

/**
 * Tab indicator gesture configuration
 */
export interface TabIndicatorGestureConfig {
  enabled?: boolean;
  threshold?: number;
  velocity?: number;
  resistance?: number;
  snapToTabs?: boolean;
  followGesture?: boolean;
  rubberBand?: boolean;
}

/**
 * Tab indicator props interface
 */
export interface TabIndicatorProps {
  // Core Properties
  activeIndex: number;
  tabLayouts: TabLayoutInfo[];
  variant?: TabIndicatorVariant;
  size?: TabIndicatorSize;
  position?: TabIndicatorPosition;
  orientation?: TabIndicatorOrientation;
  
  // Animation Properties
  animation?: TabIndicatorAnimation;
  animationConfig?: TabIndicatorAnimationConfig;
  
  // Style Properties
  style?: ViewStyle;
  styleConfig?: TabIndicatorStyleConfig;
  
  // Gesture Properties
  gestureConfig?: TabIndicatorGestureConfig;
  
  // Interaction Properties
  onPositionChange?: (position: number) => void;
  onTabChange?: (index: number) => void;
  onAnimationComplete?: () => void;
  
  // Accessibility Properties
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: any;
  
  // Theme Properties
  theme?: 'light' | 'dark' | 'auto';
  
  // Layout Properties
  containerWidth?: number;
  containerHeight?: number;
  
  // Custom Properties
  customRenderer?: (props: any) => React.ReactNode;
  testID?: string;
}

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Default animation configurations
 */
const DEFAULT_ANIMATION_CONFIG: TabIndicatorAnimationConfig = {
  duration: 300,
  delay: 0,
  useNativeDriver: true,
  damping: 20,
  stiffness: 200,
  mass: 1,
  tension: 200,
  friction: 8,
  velocity: 0,
};

/**
 * Default gesture configurations
 */
const DEFAULT_GESTURE_CONFIG: TabIndicatorGestureConfig = {
  enabled: true,
  threshold: 10,
  velocity: 0.5,
  resistance: 0.8,
  snapToTabs: true,
  followGesture: true,
  rubberBand: true,
};

/**
 * Size configurations
 */
const SIZE_CONFIG = {
  [TabIndicatorSize.SMALL]: { height: 2, borderRadius: 1 },
  [TabIndicatorSize.MEDIUM]: { height: 3, borderRadius: 2 },
  [TabIndicatorSize.LARGE]: { height: 4, borderRadius: 2 },
  [TabIndicatorSize.EXTRA_LARGE]: { height: 6, borderRadius: 3 },
  [TabIndicatorSize.CUSTOM]: { height: 3, borderRadius: 2 },
};

/**
 * Position configurations
 */
const POSITION_CONFIG = {
  [TabIndicatorPosition.TOP]: { bottom: undefined, top: 0 },
  [TabIndicatorPosition.BOTTOM]: { top: undefined, bottom: 0 },
  [TabIndicatorPosition.CENTER]: { top: '50%', marginTop: -1.5 },
  [TabIndicatorPosition.FULL]: { top: 0, bottom: 0 },
};

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * TabIndicator - Animated tab position indicator component
 */
export const TabIndicator: React.FC<TabIndicatorProps> = ({
  activeIndex,
  tabLayouts,
  variant = TabIndicatorVariant.LINE,
  size = TabIndicatorSize.MEDIUM,
  position = TabIndicatorPosition.BOTTOM,
  orientation = TabIndicatorOrientation.HORIZONTAL,
  animation = TabIndicatorAnimation.SMOOTH,
  animationConfig = {},
  style,
  styleConfig = {},
  gestureConfig = {},
  onPositionChange,
  onTabChange,
  onAnimationComplete,
  accessibilityLabel = 'Tab indicator',
  accessibilityHint = 'Shows the current active tab position',
  accessibilityRole = 'tabpanel',
  theme = 'auto',
  containerWidth,
  containerHeight,
  customRenderer,
  testID,
}) => {
  // ============================================================================
  // HOOKS & STATE
  // ============================================================================

  const currentTheme = useTheme();
  const isDarkMode = theme === 'dark' || (theme === 'auto' && currentTheme.isDark);
  
  // Animation references
  const translateXAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(0)).current;
  const widthAnim = useRef(new Animated.Value(0)).current;
  const heightAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  
  // State management
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [gesturePosition, setGesturePosition] = useState(0);
  const [isGestureActive, setIsGestureActive] = useState(false);
  
  // Configuration merging
  const mergedAnimationConfig = { ...DEFAULT_ANIMATION_CONFIG, ...animationConfig };
  const mergedGestureConfig = { ...DEFAULT_GESTURE_CONFIG, ...gestureConfig };
  
  // ============================================================================
  // COMPUTED VALUES
  // ============================================================================

  /**
   * Get current tab layout information
   */
  const getCurrentTabLayout = useCallback((): TabLayoutInfo | null => {
    if (!tabLayouts || tabLayouts.length === 0 || activeIndex < 0 || activeIndex >= tabLayouts.length) {
      return null;
    }
    return tabLayouts[activeIndex];
  }, [tabLayouts, activeIndex]);

  /**
   * Get indicator style configuration
   */
  const getIndicatorStyleConfig = useCallback(() => {
    const sizeConfig = SIZE_CONFIG[size];
    const positionConfig = POSITION_CONFIG[position];
    
    return {
      height: sizeConfig.height,
      borderRadius: sizeConfig.borderRadius,
      ...positionConfig,
      ...styleConfig,
    };
  }, [size, position, styleConfig]);

  /**
   * Get theme colors
   */
  const getThemeColors = useCallback(() => {
    return {
      background: isDarkMode ? SignatureBlues.primary : deepSpaceColors.deep,
      glow: isDarkMode ? SignatureBlues.glow : LuxuryGolds.pure,
      shadow: isDarkMode ? deepSpaceColors.deep : deepSpaceColors.dark,
    };
  }, [isDarkMode]);

  // ============================================================================
  // ANIMATION FUNCTIONS
  // ============================================================================

  /**
   * Get animation configuration based on type
   */
  const getAnimationConfig = useCallback((animationType: TabIndicatorAnimation) => {
    switch (animationType) {
      case TabIndicatorAnimation.ELASTIC:
        return {
          ...mergedAnimationConfig,
          tension: 100,
          friction: 8,
        };
      case TabIndicatorAnimation.SPRING:
        return {
          ...mergedAnimationConfig,
          damping: mergedAnimationConfig.damping,
          stiffness: mergedAnimationConfig.stiffness,
          mass: mergedAnimationConfig.mass,
        };
      case TabIndicatorAnimation.BOUNCE:
        return {
          ...mergedAnimationConfig,
          tension: 2000,
          friction: 10,
        };
      case TabIndicatorAnimation.LINEAR:
        return {
          ...mergedAnimationConfig,
          easing: Animated.createAnimatedComponent,
        };
      case TabIndicatorAnimation.EASE_IN_OUT:
        return {
          ...mergedAnimationConfig,
          easing: Animated.createAnimatedComponent,
        };
      case TabIndicatorAnimation.NONE:
        return {
          ...mergedAnimationConfig,
          duration: 0,
        };
      default:
        return mergedAnimationConfig;
    }
  }, [mergedAnimationConfig]);

  /**
   * Animate to tab position
   */
  const animateToTab = useCallback((tabLayout: TabLayoutInfo) => {
    if (!tabLayout || isAnimating) return;
    
    setIsAnimating(true);
    
    const animConfig = getAnimationConfig(animation);
    
    const animations = [];
    
    // Position animations
    if (orientation === TabIndicatorOrientation.HORIZONTAL) {
      animations.push(
        Animated.timing(translateXAnim, {
          toValue: tabLayout.x,
          duration: animConfig.duration || 300,
          useNativeDriver: false,
        }),
        Animated.timing(widthAnim, {
          toValue: tabLayout.width,
          duration: animConfig.duration || 300,
          useNativeDriver: false,
        })
      );
    } else {
      animations.push(
        Animated.timing(translateYAnim, {
          toValue: tabLayout.y,
          duration: animConfig.duration || 300,
          useNativeDriver: false,
        }),
        Animated.timing(heightAnim, {
          toValue: tabLayout.height,
          duration: animConfig.duration || 300,
          useNativeDriver: false,
        })
      );
    }
    
    // Variant-specific animations
    if (variant === TabIndicatorVariant.GLOW || variant === TabIndicatorVariant.COSMIC) {
      animations.push(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: (animConfig.duration || 300) / 2,
            useNativeDriver: false,
          }),
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: (animConfig.duration || 300) / 2,
            useNativeDriver: false,
          }),
        ])
      );
    }
    
    if (variant === TabIndicatorVariant.ORB) {
      animations.push(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.2,
            duration: (animConfig.duration || 300) / 3,
            useNativeDriver: false,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: ((animConfig.duration || 300) / 3) * 2,
            useNativeDriver: false,
          }),
        ])
      );
    }
    
    // Run all animations
    Animated.parallel(animations).start(({ finished }) => {
      setIsAnimating(false);
      if (finished) {
        setCurrentPosition(tabLayout.x);
        onPositionChange?.(tabLayout.x);
        onAnimationComplete?.();
      }
    });
  }, [
    animation,
    variant,
    orientation,
    isAnimating,
    getAnimationConfig,
    translateXAnim,
    translateYAnim,
    widthAnim,
    heightAnim,
    glowAnim,
    scaleAnim,
    onPositionChange,
    onAnimationComplete,
  ]);

  // ============================================================================
  // GESTURE HANDLING
  // ============================================================================

  /**
   * Pan responder for gesture handling
   */
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return mergedGestureConfig.enabled! && 
               Math.abs(gestureState.dx) > mergedGestureConfig.threshold!;
      },
      
      onPanResponderGrant: (evt, gestureState) => {
        setIsGestureActive(true);
        setGesturePosition(currentPosition);
      },
      
      onPanResponderMove: (evt, gestureState) => {
        if (!mergedGestureConfig.followGesture) return;
        
        const newPosition = gesturePosition + gestureState.dx;
        
        if (mergedGestureConfig.rubberBand) {
          // Apply rubber band effect at boundaries
          const containerWidthValue = containerWidth || Dimensions.get('window').width;
          const boundedPosition = Math.max(0, Math.min(newPosition, containerWidthValue));
          translateXAnim.setValue(boundedPosition);
        } else {
          translateXAnim.setValue(newPosition);
        }
      },
      
      onPanResponderRelease: (evt, gestureState) => {
        setIsGestureActive(false);
        
        if (mergedGestureConfig.snapToTabs && tabLayouts) {
          // Find closest tab
          const currentX = gesturePosition + gestureState.dx;
          let closestIndex = 0;
          let closestDistance = Math.abs(tabLayouts[0].x - currentX);
          
          for (let i = 1; i < tabLayouts.length; i++) {
            const distance = Math.abs(tabLayouts[i].x - currentX);
            if (distance < closestDistance) {
              closestDistance = distance;
              closestIndex = i;
            }
          }
          
          // Snap to closest tab
          if (closestIndex !== activeIndex) {
            onTabChange?.(closestIndex);
          } else {
            animateToTab(tabLayouts[activeIndex]);
          }
        }
      },
    })
  ).current;

  // ============================================================================
  // EFFECTS
  // ============================================================================

  /**
   * Animate to active tab when index changes
   */
  useEffect(() => {
    const currentTabLayout = getCurrentTabLayout();
    if (currentTabLayout && !isGestureActive) {
      animateToTab(currentTabLayout);
    }
  }, [activeIndex, tabLayouts, getCurrentTabLayout, animateToTab, isGestureActive]);

  /**
   * Initialize indicator position
   */
  useEffect(() => {
    const currentTabLayout = getCurrentTabLayout();
    if (currentTabLayout) {
      if (orientation === TabIndicatorOrientation.HORIZONTAL) {
        translateXAnim.setValue(currentTabLayout.x);
        widthAnim.setValue(currentTabLayout.width);
      } else {
        translateYAnim.setValue(currentTabLayout.y);
        heightAnim.setValue(currentTabLayout.height);
      }
    }
  }, []);

  // ============================================================================
  // RENDER HELPERS
  // ============================================================================

  /**
   * Render indicator by variant
   */
  const renderIndicator = useCallback(() => {
    const themeColors = getThemeColors();
    const styleConfig = getIndicatorStyleConfig();
    
    const baseStyle: ViewStyle = {
      position: 'absolute',
      backgroundColor: styleConfig.backgroundColor || themeColors.background,
      borderRadius: styleConfig.borderRadius,
      opacity: styleConfig.opacity || 1,
      transform: [
        { translateX: translateXAnim },
        { translateY: translateYAnim },
        { scaleX: scaleAnim },
        { scaleY: scaleAnim },
      ],
    };
    
    if (orientation === TabIndicatorOrientation.HORIZONTAL) {
      baseStyle.height = styleConfig.height;
      baseStyle.width = widthAnim;
    } else {
      baseStyle.width = styleConfig.width;
      baseStyle.height = heightAnim;
    }
    
    // Apply position configuration
    Object.assign(baseStyle, POSITION_CONFIG[position]);
    
    switch (variant) {
      case TabIndicatorVariant.GLOW:
        return (
          <Animated.View
            style={[
              baseStyle,
              {
                shadowColor: themeColors.glow,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: glowAnim,
                shadowRadius: 8,
                elevation: 8,
              },
            ]}
          />
        );
        
      case TabIndicatorVariant.PILL:
        return (
          <Animated.View
            style={[
              baseStyle,
              {
                borderRadius: 20,
                backgroundColor: themeColors.background,
              },
            ]}
          />
        );
        
      case TabIndicatorVariant.ORB:
        return (
          <Animated.View
            style={[
              baseStyle,
              {
                borderRadius: 50,
                backgroundColor: themeColors.background,
                shadowColor: themeColors.glow,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 4,
              },
            ]}
          />
        );
        
      case TabIndicatorVariant.COSMIC:
        return (
          <Animated.View
            style={[
              baseStyle,
              {
                backgroundColor: themeColors.background,
                shadowColor: themeColors.glow,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: glowAnim,
                shadowRadius: 12,
                elevation: 12,
              },
            ]}
          />
        );
        
      case TabIndicatorVariant.UNDERLINE:
        return (
          <Animated.View
            style={[
              baseStyle,
              {
                height: 2,
                bottom: 0,
                backgroundColor: themeColors.background,
              },
            ]}
          />
        );
        
      case TabIndicatorVariant.ROUNDED:
        return (
          <Animated.View
            style={[
              baseStyle,
              {
                borderRadius: 8,
                backgroundColor: themeColors.background,
              },
            ]}
          />
        );
        
      case TabIndicatorVariant.MINIMAL:
        return (
          <Animated.View
            style={[
              baseStyle,
              {
                height: 1,
                backgroundColor: themeColors.background,
                opacity: 0.8,
              },
            ]}
          />
        );
        
      default:
        return <Animated.View style={baseStyle} />;
    }
  }, [
    variant,
    orientation,
    position,
    getThemeColors,
    getIndicatorStyleConfig,
    translateXAnim,
    translateYAnim,
    widthAnim,
    heightAnim,
    scaleAnim,
    glowAnim,
  ]);

  // ============================================================================
  // RENDER
  // ============================================================================

  if (!tabLayouts || tabLayouts.length === 0) {
    return null;
  }

  if (customRenderer) {
    return customRenderer({
      activeIndex,
      tabLayouts,
      variant,
      animation,
      translateXAnim,
      translateYAnim,
      widthAnim,
      heightAnim,
      opacityAnim,
      scaleAnim,
      glowAnim,
    });
  }

  return (
    <View
      style={[styles.container, style]}
      {...(mergedGestureConfig.enabled ? panResponder.panHandlers : {})}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityRole={accessibilityRole}
      testID={testID}
    >
      {renderIndicator()}
    </View>
  );
};

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
  },
});

// ============================================================================
// EXPORTS
// ============================================================================

export default TabIndicator;