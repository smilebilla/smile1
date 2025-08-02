/**
 * Corp Astro UI Library - Header Base Component
 * 
 * Foundational header base component providing core header functionality
 * for Corp Astro applications with theme integration and space-inspired design.
 * Serves as the building block for all header variants and specialized headers.
 * 
 * Features:
 * - Core header foundation with flexible layout system
 * - Theme-aware styling with Corp Astro design tokens
 * - Responsive design with adaptive content arrangement
 * - Smooth animations and transitions
 * - Accessibility compliance with ARIA attributes
 * - Platform-specific optimizations
 * - Safe area handling and status bar integration
 * - Customizable height and styling
 * - Slot-based architecture for flexible content
 * - Background effects and overlay support
 * - Gesture handling and interaction states
 * 
 * @module HeaderBase
 * @version 1.0.0
 * @author Corp Astro Design System
 * @since 2024
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Platform,
  ViewStyle,
  TextStyle,
  ColorValue,
  StatusBar,
  SafeAreaView,
  Dimensions,
  PanResponder,
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';
import { useTheme } from '../../../foundations/themes/useTheme';
import { deepSpaceColors } from '../../../foundations/tokens/colors/DeepSpaceColors';
import { SignatureBlues } from '../../../foundations/tokens/colors/SignatureBlues';
import { LuxuryGolds } from '../../../foundations/tokens/colors/LuxuryGolds';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Header base variants
 */
export type HeaderBaseVariant = 'default' | 'transparent' | 'solid' | 'blur' | 'gradient';

/**
 * Header base sizes
 */
export type HeaderBaseSize = 'small' | 'medium' | 'large' | 'auto';

/**
 * Header base positions
 */
export type HeaderBasePosition = 'static' | 'fixed' | 'sticky' | 'floating';

/**
 * Header base animation types
 */
export type HeaderBaseAnimation = 'fade' | 'slide' | 'scale' | 'elastic' | 'none';

/**
 * Header base content slots
 */
export interface HeaderBaseSlots {
  /** Left content slot */
  left?: React.ReactNode;
  /** Center content slot */
  center?: React.ReactNode;
  /** Right content slot */
  right?: React.ReactNode;
  /** Background content slot */
  background?: React.ReactNode;
  /** Overlay content slot */
  overlay?: React.ReactNode;
}

/**
 * Header base gesture configuration
 */
export interface HeaderBaseGesture {
  /** Enable pan gestures */
  enabled?: boolean;
  /** Pan threshold */
  threshold?: number;
  /** Pan direction */
  direction?: 'horizontal' | 'vertical' | 'all';
  /** Pan handler */
  onPan?: (gestureState: PanResponderGestureState) => void;
  /** Pan start handler */
  onPanStart?: (gestureState: PanResponderGestureState) => void;
  /** Pan end handler */
  onPanEnd?: (gestureState: PanResponderGestureState) => void;
}

/**
 * Header base configuration
 */
export interface HeaderBaseConfig {
  /** Header height */
  height?: number;
  /** Header padding */
  padding?: number;
  /** Header margin */
  margin?: number;
  /** Header border radius */
  borderRadius?: number;
  /** Header elevation */
  elevation?: number;
  /** Header shadow */
  shadow?: boolean;
  /** Header blur effect */
  blur?: boolean;
  /** Header gradient */
  gradient?: boolean;
  /** Header animation duration */
  animationDuration?: number;
  /** Header animation delay */
  animationDelay?: number;
}

/**
 * Header base properties
 */
export interface HeaderBaseProps {
  /** Header variant */
  variant?: HeaderBaseVariant;
  /** Header size */
  size?: HeaderBaseSize;
  /** Header position */
  position?: HeaderBasePosition;
  /** Header animation */
  animation?: HeaderBaseAnimation;
  /** Header content slots */
  slots?: HeaderBaseSlots;
  /** Header gesture configuration */
  gesture?: HeaderBaseGesture;
  /** Header configuration */
  config?: HeaderBaseConfig;
  /** Header background color */
  backgroundColor?: ColorValue;
  /** Header text color */
  textColor?: ColorValue;
  /** Header border color */
  borderColor?: ColorValue;
  /** Header accent color */
  accentColor?: ColorValue;
  /** Header disabled state */
  disabled?: boolean;
  /** Header loading state */
  loading?: boolean;
  /** Header error state */
  error?: boolean;
  /** Header success state */
  success?: boolean;
  /** Header focused state */
  focused?: boolean;
  /** Header active state */
  active?: boolean;
  /** Header visible state */
  visible?: boolean;
  /** Header accessibility label */
  accessibilityLabel?: string;
  /** Header accessibility hint */
  accessibilityHint?: string;
  /** Header accessibility role */
  accessibilityRole?: 'header' | 'none';
  /** Header test identifier */
  testID?: string;
  /** Header style override */
  style?: ViewStyle;
  /** Header content style */
  contentStyle?: ViewStyle;
  /** Header children */
  children?: React.ReactNode;
  /** Header press handler */
  onPress?: () => void;
  /** Header long press handler */
  onLongPress?: () => void;
  /** Header press in handler */
  onPressIn?: () => void;
  /** Header press out handler */
  onPressOut?: () => void;
  /** Header layout handler */
  onLayout?: (event: any) => void;
  /** Header mount handler */
  onMount?: () => void;
  /** Header unmount handler */
  onUnmount?: () => void;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const HEADER_HEIGHTS = {
  small: 48,
  medium: 56,
  large: 64,
  auto: 'auto' as const,
};

const ANIMATION_DURATIONS = {
  fast: 150,
  normal: 250,
  slow: 350,
};

const GESTURE_THRESHOLD = 10;

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * HeaderBase component providing foundational header functionality
 * with theme integration and space-inspired design.
 */
export const HeaderBase: React.FC<HeaderBaseProps> = ({
  variant = 'default',
  size = 'medium',
  position = 'static',
  animation = 'fade',
  slots = {},
  gesture = { enabled: false },
  config = {},
  backgroundColor,
  textColor,
  borderColor,
  accentColor,
  disabled = false,
  loading = false,
  error = false,
  success = false,
  focused = false,
  active = false,
  visible = true,
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole = 'header',
  testID,
  style,
  contentStyle,
  children,
  onPress,
  onLongPress,
  onPressIn,
  onPressOut,
  onLayout,
  onMount,
  onUnmount,
}) => {
  // ============================================================================
  // HOOKS
  // ============================================================================

  const theme = useTheme();
  const animationValue = useRef(new Animated.Value(visible ? 1 : 0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const positionValue = useRef(new Animated.Value(0)).current;
  const blurValue = useRef(new Animated.Value(0)).current;
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);

  // ============================================================================
  // ANIMATIONS
  // ============================================================================

  const animateIn = () => {
    const duration = config.animationDuration || ANIMATION_DURATIONS.normal;
    const delay = config.animationDelay || 0;

    Animated.parallel([
      Animated.timing(animationValue, {
        toValue: 1,
        duration,
        delay,
        useNativeDriver: true,
      }),
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.timing(positionValue, {
        toValue: 0,
        duration,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animateOut = () => {
    const duration = config.animationDuration || ANIMATION_DURATIONS.normal;

    Animated.parallel([
      Animated.timing(animationValue, {
        toValue: 0,
        duration,
        useNativeDriver: true,
      }),
      Animated.spring(scaleValue, {
        toValue: 0.95,
        useNativeDriver: true,
      }),
      Animated.timing(positionValue, {
        toValue: -50,
        duration,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animatePress = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.98,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animateBlur = (toValue: number) => {
    Animated.timing(blurValue, {
      toValue,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  // ============================================================================
  // GESTURE HANDLERS
  // ============================================================================

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      if (!gesture.enabled) return false;
      
      const { dx, dy } = gestureState;
      const threshold = gesture.threshold || GESTURE_THRESHOLD;
      
      if (gesture.direction === 'horizontal') {
        return Math.abs(dx) > threshold;
      } else if (gesture.direction === 'vertical') {
        return Math.abs(dy) > threshold;
      }
      
      return Math.abs(dx) > threshold || Math.abs(dy) > threshold;
    },
    
    onPanResponderGrant: (evt, gestureState) => {
      gesture.onPanStart?.(gestureState);
    },
    
    onPanResponderMove: (evt, gestureState) => {
      gesture.onPan?.(gestureState);
    },
    
    onPanResponderRelease: (evt, gestureState) => {
      gesture.onPanEnd?.(gestureState);
    },
  });

  // ============================================================================
  // HANDLERS
  // ============================================================================

  const handlePress = () => {
    if (disabled || loading) return;
    
    animatePress();
    onPress?.();
  };

  const handleLongPress = () => {
    if (disabled || loading) return;
    
    onLongPress?.();
  };

  const handlePressIn = () => {
    if (disabled || loading) return;
    
    setIsPressed(true);
    onPressIn?.();
  };

  const handlePressOut = () => {
    setIsPressed(false);
    onPressOut?.();
  };

  const handleLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    setHeaderHeight(height);
    onLayout?.(event);
  };

  const handleDimensionsChange = ({ window }: { window: any }) => {
    setDimensions(window);
  };

  // ============================================================================
  // EFFECTS
  // ============================================================================

  useEffect(() => {
    onMount?.();
    
    const subscription = Dimensions.addEventListener('change', handleDimensionsChange);
    
    return () => {
      subscription?.remove();
      onUnmount?.();
    };
  }, []);

  useEffect(() => {
    if (visible) {
      animateIn();
    } else {
      animateOut();
    }
  }, [visible]);

  useEffect(() => {
    if (config.blur) {
      animateBlur(1);
    } else {
      animateBlur(0);
    }
  }, [config.blur]);

  // ============================================================================
  // STYLES
  // ============================================================================

  const getContainerStyle = (): ViewStyle => {
    const baseHeight = HEADER_HEIGHTS[size];
    const height = config.height || baseHeight;
    
    return {
      height,
      backgroundColor: backgroundColor || getBackgroundColor(),
      borderColor: borderColor || getBorderColor(),
      ...getPositionStyle(),
      ...getVariantStyle(),
      ...getSizeStyle(),
      ...getStateStyle(),
      ...style,
    };
  };

  const getContentStyle = (): ViewStyle => ({
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: config.padding || 16,
    paddingVertical: config.padding || 8,
    ...contentStyle,
  });

  const getAnimatedStyle = (): ViewStyle => {
    const translateY = animation === 'slide' ? positionValue : 0;
    const scale = animation === 'scale' ? scaleValue : 1;
    const opacity = animation === 'fade' ? animationValue : 1;

    return {
      transform: [
        { translateY },
        { scale },
      ],
      opacity,
    };
  };

  const getBackgroundColor = (): ColorValue => {
    if (variant === 'transparent') {
      return 'transparent';
    }
    
    if (variant === 'solid') {
      return theme.colors.cosmos.deep;
    }
    
    if (variant === 'blur') {
      return `${String(theme.colors.cosmos.deep)}80`;
    }
    
    if (variant === 'gradient') {
      return theme.colors.brand.primary;
    }
    
    return theme.colors.cosmos.deep;
  };

  const getBorderColor = (): ColorValue => {
    if (error) {
      return theme.colors.mystical.deep;
    }
    
    if (success) {
      return theme.colors.luxury.pure;
    }
    
    if (focused) {
      return theme.colors.brand.primary;
    }
    
    return theme.colors.neutral.medium;
  };

  const getPositionStyle = (): ViewStyle => {
    const styles: ViewStyle = {};
    
    if (position === 'fixed') {
      styles.position = 'absolute';
      styles.top = 0;
      styles.left = 0;
      styles.right = 0;
      styles.zIndex = 1000;
    } else if (position === 'floating') {
      styles.position = 'absolute';
      styles.top = 20;
      styles.left = 16;
      styles.right = 16;
      styles.zIndex = 1000;
      styles.borderRadius = config.borderRadius || 12;
    }
    
    return styles;
  };

  const getVariantStyle = (): ViewStyle => {
    const styles: ViewStyle = {};
    
    if (variant === 'blur') {
      styles.backgroundColor = `${String(theme.colors.cosmos.deep)}80`;
    }
    
    if (variant === 'gradient') {
      styles.backgroundColor = theme.colors.brand.primary;
    }
    
    if (config.shadow) {
      styles.shadowColor = theme.colors.cosmos.void;
      styles.shadowOffset = {
        width: 0,
        height: 2,
      };
      styles.shadowOpacity = 0.1;
      styles.shadowRadius = 4;
      styles.elevation = config.elevation || 4;
    }
    
    return styles;
  };

  const getSizeStyle = (): ViewStyle => {
    const styles: ViewStyle = {};
    
    if (size === 'small') {
      styles.paddingHorizontal = 12;
      styles.paddingVertical = 6;
    } else if (size === 'large') {
      styles.paddingHorizontal = 20;
      styles.paddingVertical = 12;
    }
    
    return styles;
  };

  const getStateStyle = (): ViewStyle => {
    const styles: ViewStyle = {};
    
    if (disabled) {
      styles.opacity = 0.5;
    }
    
    if (loading) {
      styles.opacity = 0.8;
    }
    
    if (isPressed) {
      styles.opacity = 0.9;
    }
    
    return styles;
  };

  const getSlotStyle = (slot: 'left' | 'center' | 'right'): ViewStyle => {
    const baseStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
    };
    
    if (slot === 'left') {
      return {
        ...baseStyle,
        justifyContent: 'flex-start',
        flex: 1,
      };
    }
    
    if (slot === 'center') {
      return {
        ...baseStyle,
        justifyContent: 'center',
        flex: 2,
      };
    }
    
    if (slot === 'right') {
      return {
        ...baseStyle,
        justifyContent: 'flex-end',
        flex: 1,
      };
    }
    
    return baseStyle;
  };

  // ============================================================================
  // RENDER
  // ============================================================================

  if (!visible) {
    return null;
  }

  const TouchableComponent = onPress || onLongPress ? TouchableOpacity : View;

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View
        style={[getContainerStyle(), getAnimatedStyle()]}
        onLayout={handleLayout}
        {...panResponder.panHandlers}
        {...(accessibilityLabel && { accessibilityLabel })}
        {...(accessibilityHint && { accessibilityHint })}
        {...(accessibilityRole && { accessibilityRole })}
        {...(testID && { testID })}
      >
        {slots.background && (
          <View style={styles.backgroundSlot}>
            {slots.background}
          </View>
        )}
        
        <TouchableComponent
          style={getContentStyle()}
          onPress={handlePress}
          onLongPress={handleLongPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={disabled || loading}
          activeOpacity={0.8}
        >
          {slots.left && (
            <View style={getSlotStyle('left')}>
              {slots.left}
            </View>
          )}
          
          {slots.center && (
            <View style={getSlotStyle('center')}>
              {slots.center}
            </View>
          )}
          
          {children && !slots.center && (
            <View style={getSlotStyle('center')}>
              {children}
            </View>
          )}
          
          {slots.right && (
            <View style={getSlotStyle('right')}>
              {slots.right}
            </View>
          )}
        </TouchableComponent>
        
        {slots.overlay && (
          <View style={styles.overlaySlot}>
            {slots.overlay}
          </View>
        )}
      </Animated.View>
    </SafeAreaView>
  );
};

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: 'transparent',
  },
  backgroundSlot: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  overlaySlot: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 3,
  },
});

// ============================================================================
// EXPORTS
// ============================================================================

export default HeaderBase;
