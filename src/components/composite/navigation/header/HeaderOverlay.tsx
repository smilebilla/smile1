/**
 * Corp Astro UI Library - Header Overlay Component
 * 
 * Professional header overlay component providing dynamic overlay functionality
 * with Corp Astro design system integration and space-inspired aesthetics.
 * Creates immersive overlay experiences with smooth animations and intelligent layering.
 * 
 * Features:
 * - Multiple header overlay variants and positions
 * - Dynamic overlay content and backgrounds
 * - Smooth animations and transitions
 * - Scroll-responsive overlay behavior
 * - Theme-aware styling with Corp Astro design tokens
 * - Responsive design with adaptive sizing
 * - Accessibility compliance with ARIA attributes
 * - Platform-specific optimizations
 * - Custom styling and theming
 * - Performance-optimized rendering
 * 
 * @module HeaderOverlay
 * @version 1.0.0
 * @author Corp Astro Design System
 * @since 2024
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Platform,
  ViewStyle,
  TextStyle,
  ColorValue,
  Dimensions,
  ScrollView,
  PanResponder,
  StatusBar,
} from 'react-native';
import { useTheme } from '../../../foundations/themes/useTheme';
import { deepSpaceColors } from '../../../foundations/tokens/colors/DeepSpaceColors';
import { SignatureBlues } from '../../../foundations/tokens/colors/SignatureBlues';
import { LuxuryGolds } from '../../../foundations/tokens/colors/LuxuryGolds';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Header overlay variants
 */
export type HeaderOverlayVariant = 'default' | 'blur' | 'gradient' | 'solid' | 'transparent';

/**
 * Header overlay positions
 */
export type HeaderOverlayPosition = 'top' | 'bottom' | 'floating' | 'sticky' | 'fixed';

/**
 * Header overlay animation types
 */
export type HeaderOverlayAnimation = 'fade' | 'slide' | 'scale' | 'blur' | 'none';

/**
 * Header overlay triggers
 */
export type HeaderOverlayTrigger = 'scroll' | 'timer' | 'manual' | 'hover' | 'focus';

/**
 * Header overlay backdrop configuration
 */
export interface HeaderOverlayBackdrop {
  /** Backdrop color */
  color?: ColorValue;
  /** Backdrop opacity */
  opacity?: number;
  /** Backdrop blur radius */
  blurRadius?: number;
  /** Backdrop press to dismiss */
  dismissible?: boolean;
  /** Backdrop animation duration */
  animationDuration?: number;
}

/**
 * Header overlay component props interface
 */
export interface HeaderOverlayProps {
  /** Header overlay variant */
  variant?: HeaderOverlayVariant;
  /** Header overlay position */
  position?: HeaderOverlayPosition;
  /** Overlay visibility */
  visible?: boolean;
  /** Overlay content */
  content?: React.ReactNode;
  /** Header component to overlay */
  header?: React.ReactNode;
  /** Overlay height */
  height?: number;
  /** Overlay width */
  width?: number | string;
  /** Overlay z-index */
  zIndex?: number;
  /** Scroll offset threshold */
  scrollThreshold?: number;
  /** Scroll offset for activation */
  scrollOffset?: number;
  /** Show/hide animation trigger */
  trigger?: HeaderOverlayTrigger;
  /** Auto-hide after timer */
  autoHide?: boolean;
  /** Auto-hide duration in milliseconds */
  autoHideDuration?: number;
  /** Background color override */
  backgroundColor?: ColorValue;
  /** Text color override */
  textColor?: ColorValue;
  /** Border color override */
  borderColor?: ColorValue;
  /** Border width */
  borderWidth?: number;
  /** Border radius */
  borderRadius?: number;
  /** Enable shadow */
  shadow?: boolean;
  /** Shadow configuration */
  shadowConfig?: {
    color?: ColorValue;
    opacity?: number;
    radius?: number;
    elevation?: number;
  };
  /** Backdrop configuration */
  backdrop?: HeaderOverlayBackdrop;
  /** Animation type */
  animation?: HeaderOverlayAnimation;
  /** Animation duration in milliseconds */
  animationDuration?: number;
  /** Animation easing */
  animationEasing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
  /** Enable smooth transitions */
  animated?: boolean;
  /** Overlay show handler */
  onShow?: () => void;
  /** Overlay hide handler */
  onHide?: () => void;
  /** Overlay press handler */
  onPress?: () => void;
  /** Backdrop press handler */
  onBackdropPress?: () => void;
  /** Scroll event handler */
  onScroll?: (event: { nativeEvent: { contentOffset: { y: number } } }) => void;
  /** Custom style overrides */
  style?: ViewStyle;
  /** Container style overrides */
  containerStyle?: ViewStyle;
  /** Content style overrides */
  contentStyle?: ViewStyle;
  /** Backdrop style overrides */
  backdropStyle?: ViewStyle;
  /** Enable safe area */
  safeArea?: boolean;
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
 * Header Overlay Component
 * 
 * Professional header overlay component providing dynamic overlay functionality
 * with theme integration and space-inspired design aesthetics.
 */
export const HeaderOverlay: React.FC<HeaderOverlayProps> = ({
  variant = 'default',
  position = 'top',
  visible = false,
  content,
  header,
  height = 200,
  width = '100%',
  zIndex = 1000,
  scrollThreshold = 100,
  scrollOffset = 0,
  trigger = 'manual',
  autoHide = false,
  autoHideDuration = 5000,
  backgroundColor,
  textColor,
  borderColor,
  borderWidth = 0,
  borderRadius = 0,
  shadow = false,
  shadowConfig = {},
  backdrop,
  animation = 'fade',
  animationDuration = 300,
  animationEasing = 'ease-in-out',
  animated = true,
  onShow,
  onHide,
  onPress,
  onBackdropPress,
  onScroll,
  style,
  containerStyle,
  contentStyle,
  backdropStyle,
  safeArea = true,
  accessibilityLabel,
  testID = 'header-overlay',
  children,
}) => {
  // ============================================================================
  // HOOKS & STATE
  // ============================================================================

  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(visible);
  const [currentScrollOffset, setCurrentScrollOffset] = useState(0);
  const [isScrollTriggered, setIsScrollTriggered] = useState(false);
  
  const overlayAnim = useRef(new Animated.Value(visible ? 1 : 0)).current;
  const backdropAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const blurAnim = useRef(new Animated.Value(0)).current;
  const autoHideTimer = useRef<NodeJS.Timeout | null>(null);

  // ============================================================================
  // COMPUTED VALUES
  // ============================================================================

  /**
   * Compute overlay background color based on variant
   */
  const computedBackgroundColor = React.useMemo(() => {
    if (backgroundColor) return backgroundColor;
    
    const variantColorMap = {
      default: theme.colors.cosmos.medium,
      blur: 'rgba(0, 0, 0, 0.6)',
      gradient: `linear-gradient(180deg, ${String(theme.colors.cosmos.dark)} 0%, ${String(theme.colors.cosmos.medium)} 100%)`,
      solid: theme.colors.cosmos.dark,
      transparent: 'transparent',
    };
    
    return variantColorMap[variant] || theme.colors.cosmos.medium;
  }, [variant, backgroundColor, theme.colors.cosmos]);

  /**
   * Compute text color
   */
  const computedTextColor = React.useMemo(() => {
    if (textColor) return textColor;
    return theme.colors.neutral.light;
  }, [textColor, theme.colors.neutral.light]);

  /**
   * Compute border color
   */
  const computedBorderColor = React.useMemo(() => {
    if (borderColor) return borderColor;
    return theme.colors.neutral.muted;
  }, [borderColor, theme.colors.neutral.muted]);

  /**
   * Compute shadow style
   */
  const shadowStyle = React.useMemo(() => {
    if (!shadow) return {};
    
    const config = {
      color: deepSpaceColors.void,
      opacity: 0.3,
      radius: 8,
      elevation: 8,
      ...shadowConfig,
    };
    
    return {
      shadowColor: config.color,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: config.opacity,
      shadowRadius: config.radius,
      elevation: config.elevation,
    };
  }, [shadow, shadowConfig]);

  /**
   * Compute position styles
   */
  const positionStyles = React.useMemo(() => {
    const safeAreaTop = safeArea ? (StatusBar.currentHeight || 0) : 0;
    
    switch (position) {
      case 'top':
        return {
          position: 'absolute' as const,
          top: safeAreaTop,
          left: 0,
          right: 0,
        };
      case 'bottom':
        return {
          position: 'absolute' as const,
          bottom: 0,
          left: 0,
          right: 0,
        };
      case 'floating':
        return {
          position: 'absolute' as const,
          top: safeAreaTop + 20,
          left: 20,
          right: 20,
          borderRadius: 16,
        };
      case 'sticky':
        return {
          position: 'absolute' as const,
          top: safeAreaTop,
          left: 0,
          right: 0,
        };
      case 'fixed':
        return {
          position: 'absolute' as const,
          top: safeAreaTop,
          left: 0,
          right: 0,
        };
      default:
        return {
          position: 'absolute' as const,
          top: safeAreaTop,
          left: 0,
          right: 0,
        };
    }
  }, [position, safeArea]);

  /**
   * Compute backdrop styles
   */
  const backdropStyles = React.useMemo(() => {
    if (!backdrop) return {};
    
    return {
      backgroundColor: backdrop.color || 'rgba(0, 0, 0, 0.5)',
      opacity: backdrop.opacity || 0.5,
    };
  }, [backdrop]);

  // ============================================================================
  // EFFECTS
  // ============================================================================

  /**
   * Update visibility when prop changes
   */
  useEffect(() => {
    if (visible !== isVisible) {
      setIsVisible(visible);
    }
  }, [visible, isVisible]);

  /**
   * Handle scroll-based trigger
   */
  useEffect(() => {
    if (trigger === 'scroll') {
      const shouldShow = currentScrollOffset > scrollThreshold;
      if (shouldShow !== isScrollTriggered) {
        setIsScrollTriggered(shouldShow);
        setIsVisible(shouldShow);
      }
    }
  }, [currentScrollOffset, scrollThreshold, trigger, isScrollTriggered]);

  /**
   * Handle auto-hide timer
   */
  useEffect(() => {
    if (autoHide && isVisible && autoHideDuration > 0) {
      autoHideTimer.current = setTimeout(() => {
        setIsVisible(false);
        onHide?.();
      }, autoHideDuration);
    }
    
    return () => {
      if (autoHideTimer.current) {
        clearTimeout(autoHideTimer.current);
      }
    };
  }, [autoHide, isVisible, autoHideDuration, onHide]);

  /**
   * Animate overlay visibility
   */
  useEffect(() => {
    if (!animated) return;
    
    const animations = [];
    
    if (animation === 'fade') {
      animations.push(
        Animated.timing(overlayAnim, {
          toValue: isVisible ? 1 : 0,
          duration: animationDuration,
          useNativeDriver: true,
        })
      );
    }
    
    if (animation === 'slide') {
      const slideValue = position === 'bottom' ? height : -height;
      animations.push(
        Animated.timing(slideAnim, {
          toValue: isVisible ? 0 : slideValue,
          duration: animationDuration,
          useNativeDriver: true,
        })
      );
    }
    
    if (animation === 'scale') {
      animations.push(
        Animated.timing(scaleAnim, {
          toValue: isVisible ? 1 : 0.9,
          duration: animationDuration,
          useNativeDriver: true,
        })
      );
    }
    
    if (animation === 'blur') {
      animations.push(
        Animated.timing(blurAnim, {
          toValue: isVisible ? 1 : 0,
          duration: animationDuration,
          useNativeDriver: false,
        })
      );
    }
    
    // Backdrop animation
    if (backdrop) {
      animations.push(
        Animated.timing(backdropAnim, {
          toValue: isVisible ? 1 : 0,
          duration: animationDuration,
          useNativeDriver: true,
        })
      );
    }
    
    if (animations.length > 0) {
      Animated.parallel(animations).start(() => {
        if (isVisible) {
          onShow?.();
        } else {
          onHide?.();
        }
      });
    }
  }, [
    isVisible,
    animated,
    animation,
    animationDuration,
    position,
    height,
    backdrop,
    onShow,
    onHide,
  ]);

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  /**
   * Handle scroll events
   */
  const handleScroll = (event: { nativeEvent: { contentOffset: { y: number } } }) => {
    const { y } = event.nativeEvent.contentOffset;
    setCurrentScrollOffset(y);
    onScroll?.(event);
  };

  /**
   * Handle backdrop press
   */
  const handleBackdropPress = () => {
    if (backdrop?.dismissible) {
      setIsVisible(false);
      onHide?.();
    }
    onBackdropPress?.();
  };

  /**
   * Handle overlay press
   */
  const handleOverlayPress = () => {
    onPress?.();
  };

  // ============================================================================
  // ANIMATION STYLES
  // ============================================================================

  const animationStyles = {
    opacity: animation === 'fade' ? overlayAnim : 1,
    transform: [
      animation === 'slide' ? { translateY: slideAnim } : { translateY: 0 },
      animation === 'scale' ? { scale: scaleAnim } : { scale: 1 },
    ],
  };

  const backdropAnimationStyles = {
    opacity: backdropAnim,
  };

  // ============================================================================
  // RENDER HELPERS
  // ============================================================================

  /**
   * Render backdrop
   */
  const renderBackdrop = () => {
    if (!backdrop || !isVisible) return null;
    
    return (
      <Animated.View
        style={[
          styles.backdrop,
          backdropStyles,
          backdropAnimationStyles,
          backdropStyle,
        ]}
        onTouchEnd={handleBackdropPress}
      />
    );
  };

  /**
   * Render overlay content
   */
  const renderContent = () => {
    if (content) return content;
    if (children) return children;
    return null;
  };

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  if (!isVisible && !animated) {
    return null;
  }

  return (
    <>
      {renderBackdrop()}
      
      <Animated.View
        style={[
          styles.container,
          positionStyles,
          shadowStyle,
          animationStyles,
          {
            height,
            width: typeof width === 'string' ? width as any : width,
            zIndex,
            backgroundColor: computedBackgroundColor,
            borderColor: computedBorderColor,
            borderWidth,
            borderRadius,
          },
          containerStyle,
          style,
        ]}
        onTouchEnd={handleOverlayPress}
        accessibilityLabel={accessibilityLabel || 'Header overlay'}
        testID={testID}
      >
        {/* Header Content */}
        {header && (
          <View style={styles.headerContainer}>
            {header}
          </View>
        )}
        
        {/* Main Content */}
        <View style={[styles.content, contentStyle]}>
          {renderContent()}
        </View>
      </Animated.View>
    </>
  );
};

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  },
  
  headerContainer: {
    flexShrink: 0,
  },
  
  content: {
    flex: 1,
    padding: 16,
  },
});

// ============================================================================
// EXPORTS
// ============================================================================

export default HeaderOverlay;
