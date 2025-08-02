/**
 * Corp Astro UI Library - Bottom Navigation Container
 * 
 * A comprehensive container component for bottom navigation systems.
 * Provides layout management, safe area handling, and container-level
 * animations for bottom navigation components.
 * 
 * @module BottomNavContainer
 * @version 1.0.0
 * @author Corp Astro Design System
 * @since 2025
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  ViewStyle,
  Dimensions,
  Platform,
  StatusBar,
  LayoutChangeEvent,
  PanResponder,
  PanResponderInstance,
  GestureResponderEvent,
  PanResponderGestureState,
  StyleSheet,
  Keyboard,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
  interpolate,
  withDelay,
  useAnimatedReaction,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '../../../foundations/themes/useTheme';
import { spacing } from '../../../foundations/tokens/spacing/SpacingScale';
import { fontSizes } from '../../../foundations/tokens/typography/FontSizes';
import { deepSpaceColors } from '../../../foundations/tokens/colors/DeepSpaceColors';

// Basic constants
const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 20,
};

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Bottom navigation container variant types
 */
export enum BottomNavContainerVariant {
  DEFAULT = 'default',
  FLOATING = 'floating',
  MINIMAL = 'minimal',
  ROUNDED = 'rounded',
  TRANSPARENT = 'transparent',
  GLASS = 'glass',
  COSMIC = 'cosmic',
  IMMERSIVE = 'immersive',
}

/**
 * Bottom navigation container size types
 */
export enum BottomNavContainerSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  EXTRA_LARGE = 'extraLarge',
  CUSTOM = 'custom',
}

/**
 * Bottom navigation container animation types
 */
export enum BottomNavContainerAnimation {
  SMOOTH = 'smooth',
  ELASTIC = 'elastic',
  SPRING = 'spring',
  BOUNCE = 'bounce',
  LINEAR = 'linear',
  EASE_IN_OUT = 'easeInOut',
  NONE = 'none',
}

/**
 * Bottom navigation container position types
 */
export enum BottomNavContainerPosition {
  BOTTOM = 'bottom',
  FLOATING = 'floating',
  STICKY = 'sticky',
  FIXED = 'fixed',
  ABSOLUTE = 'absolute',
}

/**
 * Bottom navigation container safe area types
 */
export enum BottomNavContainerSafeArea {
  AUTO = 'auto',
  ALWAYS = 'always',
  NEVER = 'never',
  CUSTOM = 'custom',
}

/**
 * Container layout configuration interface
 */
export interface BottomNavContainerLayoutConfig {
  height: number;
  width: number;
  paddingHorizontal: number;
  paddingVertical: number;
  marginHorizontal: number;
  marginVertical: number;
  borderRadius: number;
  elevation: number;
  shadowOpacity: number;
  shadowRadius: number;
  shadowOffset: { width: number; height: number };
}

/**
 * Container animation configuration interface
 */
export interface BottomNavContainerAnimationConfig {
  duration: number;
  delay: number;
  easing: string;
  damping: number;
  stiffness: number;
  mass: number;
  overshootClamping: boolean;
  restSpeedThreshold: number;
  restDisplacementThreshold: number;
}

/**
 * Container gesture configuration interface
 */
export interface BottomNavContainerGestureConfig {
  enabled: boolean;
  panEnabled: boolean;
  swipeEnabled: boolean;
  hideOnSwipeDown: boolean;
  showOnSwipeUp: boolean;
  minimumDistance: number;
  velocityThreshold: number;
  gestureResponseDistance: number;
  activeOffsetY: number[];
  failOffsetY: number[];
}

/**
 * Container backdrop configuration interface
 */
export interface BottomNavContainerBackdropConfig {
  enabled: boolean;
  opacity: number;
  color: string;
  blurRadius: number;
  animated: boolean;
  onPress?: () => void;
}

/**
 * Container safe area configuration interface
 */
export interface BottomNavContainerSafeAreaConfig {
  mode: BottomNavContainerSafeArea;
  customPadding: number;
  respectNotch: boolean;
  respectHomeIndicator: boolean;
}

/**
 * Bottom navigation container props interface
 */
export interface BottomNavContainerProps {
  children: React.ReactNode;
  variant?: BottomNavContainerVariant;
  size?: BottomNavContainerSize;
  position?: BottomNavContainerPosition;
  animation?: BottomNavContainerAnimation;
  safeArea?: BottomNavContainerSafeArea;
  visible?: boolean;
  autoHide?: boolean;
  hideOnKeyboard?: boolean;
  hideOnScroll?: boolean;
  scrollThreshold?: number;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  customStyle?: ViewStyle;
  layoutConfig?: Partial<BottomNavContainerLayoutConfig>;
  animationConfig?: Partial<BottomNavContainerAnimationConfig>;
  gestureConfig?: Partial<BottomNavContainerGestureConfig>;
  backdropConfig?: Partial<BottomNavContainerBackdropConfig>;
  safeAreaConfig?: Partial<BottomNavContainerSafeAreaConfig>;
  onLayout?: (event: LayoutChangeEvent) => void;
  onShow?: () => void;
  onHide?: () => void;
  onGestureStart?: () => void;
  onGestureEnd?: () => void;
  testID?: string;
}

// ============================================================================
// COMPONENT IMPLEMENTATION
// ============================================================================

/**
 * BottomNavContainer Component
 * 
 * A comprehensive container for bottom navigation systems with safe area handling,
 * layout management, and advanced animation capabilities.
 */
export const BottomNavContainer: React.FC<BottomNavContainerProps> = ({
  children,
  variant = BottomNavContainerVariant.DEFAULT,
  size = BottomNavContainerSize.MEDIUM,
  position = BottomNavContainerPosition.BOTTOM,
  animation = BottomNavContainerAnimation.SMOOTH,
  safeArea = BottomNavContainerSafeArea.AUTO,
  visible = true,
  autoHide = false,
  hideOnKeyboard = true,
  hideOnScroll = false,
  scrollThreshold = 10,
  backgroundColor,
  borderColor,
  borderWidth,
  customStyle,
  layoutConfig,
  animationConfig,
  gestureConfig,
  backdropConfig,
  safeAreaConfig,
  onLayout,
  onShow,
  onHide,
  onGestureStart,
  onGestureEnd,
  testID,
}) => {
  // ============================================================================
  // HOOKS AND CONTEXT
  // ============================================================================

  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [screenData, setScreenData] = useState(() => Dimensions.get('screen'));
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [containerLayout, setContainerLayout] = useState({ width: 0, height: 0 });

  // ============================================================================
  // ANIMATION VALUES
  // ============================================================================

  const translateY = useSharedValue(0);
  const opacity = useSharedValue(visible ? 1 : 0);
  const scale = useSharedValue(1);
  const backdropOpacity = useSharedValue(0);

  // ============================================================================
  // REFS
  // ============================================================================

  const lastScrollY = useRef(0);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const gestureActiveRef = useRef(false);

  // ============================================================================
  // CONFIGURATION OBJECTS
  // ============================================================================

  const defaultLayoutConfig: BottomNavContainerLayoutConfig = useMemo(() => ({
    height: size === BottomNavContainerSize.SMALL ? 60 : 
           size === BottomNavContainerSize.MEDIUM ? 70 : 
           size === BottomNavContainerSize.LARGE ? 80 : 
           size === BottomNavContainerSize.EXTRA_LARGE ? 90 : 70,
    width: screenData.width,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginHorizontal: variant === BottomNavContainerVariant.FLOATING ? spacing.md : 0,
    marginVertical: variant === BottomNavContainerVariant.FLOATING ? spacing.md : 0,
    borderRadius: variant === BottomNavContainerVariant.ROUNDED ? borderRadius.xl : 
                 variant === BottomNavContainerVariant.FLOATING ? borderRadius.lg : 
                 borderRadius.none,
    elevation: variant === BottomNavContainerVariant.FLOATING ? 8 : 4,
    shadowOpacity: variant === BottomNavContainerVariant.TRANSPARENT ? 0 : 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -2 },
  }), [size, variant, screenData.width]);

  const defaultAnimationConfig: BottomNavContainerAnimationConfig = useMemo(() => ({
    duration: animation === BottomNavContainerAnimation.SMOOTH ? 300 : 
             animation === BottomNavContainerAnimation.ELASTIC ? 400 : 
             animation === BottomNavContainerAnimation.SPRING ? 350 : 
             animation === BottomNavContainerAnimation.BOUNCE ? 500 : 
             animation === BottomNavContainerAnimation.LINEAR ? 200 : 
             animation === BottomNavContainerAnimation.EASE_IN_OUT ? 250 : 200,
    delay: 0,
    easing: 'ease-in-out',
    damping: animation === BottomNavContainerAnimation.SPRING ? 15 : 10,
    stiffness: animation === BottomNavContainerAnimation.SPRING ? 100 : 150,
    mass: 1,
    overshootClamping: false,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001,
  }), [animation]);

  const defaultGestureConfig: BottomNavContainerGestureConfig = useMemo(() => ({
    enabled: true,
    panEnabled: true,
    swipeEnabled: true,
    hideOnSwipeDown: true,
    showOnSwipeUp: true,
    minimumDistance: 20,
    velocityThreshold: 500,
    gestureResponseDistance: 50,
    activeOffsetY: [-10, 10],
    failOffsetY: [-5, 5],
  }), []);

  const defaultBackdropConfig: BottomNavContainerBackdropConfig = useMemo(() => ({
    enabled: variant === BottomNavContainerVariant.GLASS,
    opacity: 0.3,
    color: theme.colors.cosmos.void as string,
    blurRadius: 10,
    animated: true,
  }), [theme, variant]);

  const defaultSafeAreaConfig: BottomNavContainerSafeAreaConfig = useMemo(() => ({
    mode: safeArea,
    customPadding: 0,
    respectNotch: true,
    respectHomeIndicator: true,
  }), [safeArea]);

  // Merge configurations
  const finalLayoutConfig = useMemo(() => ({
    ...defaultLayoutConfig,
    ...layoutConfig,
  }), [defaultLayoutConfig, layoutConfig]);

  const finalAnimationConfig = useMemo(() => ({
    ...defaultAnimationConfig,
    ...animationConfig,
  }), [defaultAnimationConfig, animationConfig]);

  const finalGestureConfig = useMemo(() => ({
    ...defaultGestureConfig,
    ...gestureConfig,
  }), [defaultGestureConfig, gestureConfig]);

  const finalBackdropConfig = useMemo(() => ({
    ...defaultBackdropConfig,
    ...backdropConfig,
  }), [defaultBackdropConfig, backdropConfig]);

  const finalSafeAreaConfig = useMemo(() => ({
    ...defaultSafeAreaConfig,
    ...safeAreaConfig,
  }), [defaultSafeAreaConfig, safeAreaConfig]);

  // ============================================================================
  // ANIMATION HELPERS
  // ============================================================================

  const getAnimationConfig = useCallback((animationType: BottomNavContainerAnimation) => {
    const config = finalAnimationConfig;
    
    switch (animationType) {
      case BottomNavContainerAnimation.SPRING:
        return {
          damping: config.damping,
          stiffness: config.stiffness,
          mass: config.mass,
          overshootClamping: config.overshootClamping,
          restSpeedThreshold: config.restSpeedThreshold,
          restDisplacementThreshold: config.restDisplacementThreshold,
        };
      case BottomNavContainerAnimation.BOUNCE:
        return {
          damping: config.damping * 0.6,
          stiffness: config.stiffness * 1.5,
          mass: config.mass * 1.2,
          overshootClamping: false,
        };
      case BottomNavContainerAnimation.ELASTIC:
        return {
          damping: config.damping * 0.8,
          stiffness: config.stiffness * 1.2,
          mass: config.mass * 0.8,
          overshootClamping: false,
        };
      default:
        return { duration: config.duration };
    }
  }, [finalAnimationConfig]);

  // ============================================================================
  // SHOW/HIDE LOGIC
  // ============================================================================

  const showContainer = useCallback(() => {
    'worklet';
    if (animation === BottomNavContainerAnimation.NONE) {
      translateY.value = 0;
      opacity.value = 1;
      scale.value = 1;
    } else {
      const config = getAnimationConfig(animation);
      
      if (animation === BottomNavContainerAnimation.SPRING || 
          animation === BottomNavContainerAnimation.BOUNCE ||
          animation === BottomNavContainerAnimation.ELASTIC) {
        translateY.value = withSpring(0, config);
        opacity.value = withSpring(1, config);
        scale.value = withSpring(1, config);
      } else {
        translateY.value = withTiming(0, config);
        opacity.value = withTiming(1, config);
        scale.value = withTiming(1, config);
      }
    }
    
    if (finalBackdropConfig.enabled) {
      backdropOpacity.value = withTiming(finalBackdropConfig.opacity, {
        duration: finalAnimationConfig.duration,
      });
    }
    
    runOnJS(() => onShow?.())();
  }, [
    animation,
    getAnimationConfig,
    translateY,
    opacity,
    scale,
    backdropOpacity,
    finalBackdropConfig,
    finalAnimationConfig,
    onShow,
  ]);

  const hideContainer = useCallback(() => {
    'worklet';
    const hideOffset = finalLayoutConfig.height + insets.bottom + finalLayoutConfig.marginVertical;
    
    if (animation === BottomNavContainerAnimation.NONE) {
      translateY.value = hideOffset;
      opacity.value = 0;
      scale.value = 0.9;
    } else {
      const config = getAnimationConfig(animation);
      
      if (animation === BottomNavContainerAnimation.SPRING || 
          animation === BottomNavContainerAnimation.BOUNCE ||
          animation === BottomNavContainerAnimation.ELASTIC) {
        translateY.value = withSpring(hideOffset, config);
        opacity.value = withSpring(0, config);
        scale.value = withSpring(0.9, config);
      } else {
        translateY.value = withTiming(hideOffset, config);
        opacity.value = withTiming(0, config);
        scale.value = withTiming(0.9, config);
      }
    }
    
    if (finalBackdropConfig.enabled) {
      backdropOpacity.value = withTiming(0, {
        duration: finalAnimationConfig.duration,
      });
    }
    
    runOnJS(() => onHide?.())();
  }, [
    animation,
    getAnimationConfig,
    translateY,
    opacity,
    scale,
    backdropOpacity,
    finalLayoutConfig,
    finalAnimationConfig,
    finalBackdropConfig,
    insets.bottom,
    onHide,
  ]);

  // ============================================================================
  // GESTURE HANDLERS
  // ============================================================================

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => finalGestureConfig.enabled,
        onMoveShouldSetPanResponder: (event, gestureState) => {
          return finalGestureConfig.enabled && Math.abs(gestureState.dy) > 5;
        },
        onPanResponderGrant: () => {
          gestureActiveRef.current = true;
          onGestureStart?.();
        },
        onPanResponderMove: (event, gestureState) => {
          if (!finalGestureConfig.enabled || !finalGestureConfig.panEnabled) return;
          
          const { dy } = gestureState;
          translateY.value = Math.max(0, dy);
        },
        onPanResponderRelease: (event, gestureState) => {
          gestureActiveRef.current = false;
          
          if (!finalGestureConfig.enabled) {
            onGestureEnd?.();
            return;
          }
          
          const { dy, vy } = gestureState;
          
          if (finalGestureConfig.hideOnSwipeDown && 
              (dy > finalGestureConfig.minimumDistance || 
               vy > finalGestureConfig.velocityThreshold)) {
            hideContainer();
          } else if (finalGestureConfig.showOnSwipeUp && 
                     (dy < -finalGestureConfig.minimumDistance || 
                      vy < -finalGestureConfig.velocityThreshold)) {
            showContainer();
          } else {
            showContainer();
          }
          
          onGestureEnd?.();
        },
        onPanResponderTerminate: () => {
          gestureActiveRef.current = false;
          showContainer();
          onGestureEnd?.();
        },
      }),
    [
      finalGestureConfig,
      translateY,
      hideContainer,
      showContainer,
      onGestureStart,
      onGestureEnd,
    ]
  );

  // ============================================================================
  // EFFECTS
  // ============================================================================

  // Handle visibility changes
  useEffect(() => {
    if (visible) {
      showContainer();
    } else {
      hideContainer();
    }
  }, [visible, showContainer, hideContainer]);

  // Handle screen dimension changes
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ screen }) => {
      setScreenData(screen);
    });

    return () => subscription?.remove();
  }, []);

  // Handle keyboard visibility
  useEffect(() => {
    if (!hideOnKeyboard) return;

    const keyboardWillShow = (event: any) => {
      setKeyboardHeight(event.endCoordinates.height);
      if (visible) {
        hideContainer();
      }
    };

    const keyboardWillHide = () => {
      setKeyboardHeight(0);
      if (visible) {
        showContainer();
      }
    };

    const showSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      keyboardWillShow
    );
    const hideSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      keyboardWillHide
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [hideOnKeyboard, visible, showContainer, hideContainer]);

  // ============================================================================
  // ANIMATION STYLES
  // ============================================================================

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: translateY.value },
        { scale: scale.value },
      ],
      opacity: opacity.value,
    };
  }, [translateY, scale, opacity]);

  const animatedBackdropStyle = useAnimatedStyle(() => {
    return {
      opacity: backdropOpacity.value,
    };
  }, [backdropOpacity]);

  // ============================================================================
  // STYLES
  // ============================================================================

  const containerStyle = useMemo((): ViewStyle => {
    const baseStyle: ViewStyle = {
      position: position === BottomNavContainerPosition.ABSOLUTE ? 'absolute' : 'relative',
      bottom: position === BottomNavContainerPosition.BOTTOM || 
              position === BottomNavContainerPosition.ABSOLUTE ? 0 : undefined,
      left: 0,
      right: 0,
      height: finalLayoutConfig.height,
      backgroundColor: backgroundColor || 
                      (variant === BottomNavContainerVariant.TRANSPARENT ? 'transparent' : 
                       variant === BottomNavContainerVariant.GLASS ? 
                       `${String(theme.colors.cosmos.void)}CC` : 
                       String(theme.colors.cosmos.void)),
      borderTopWidth: borderWidth || 
                     (variant === BottomNavContainerVariant.TRANSPARENT ? 0 : 1),
      borderTopColor: borderColor || String(theme.colors.neutral.medium),
      borderRadius: finalLayoutConfig.borderRadius,
      paddingHorizontal: finalLayoutConfig.paddingHorizontal,
      paddingVertical: finalLayoutConfig.paddingVertical,
      marginHorizontal: finalLayoutConfig.marginHorizontal,
      marginBottom: finalLayoutConfig.marginVertical,
      paddingBottom: finalSafeAreaConfig.mode === BottomNavContainerSafeArea.ALWAYS ? 
                    insets.bottom : 
                    finalSafeAreaConfig.mode === BottomNavContainerSafeArea.NEVER ? 0 : 
                    finalSafeAreaConfig.mode === BottomNavContainerSafeArea.CUSTOM ? 
                    finalSafeAreaConfig.customPadding : 
                    insets.bottom,
    };

    // Add shadows for non-transparent variants
    if (variant !== BottomNavContainerVariant.TRANSPARENT) {
      if (Platform.OS === 'ios') {
        baseStyle.shadowColor = String(theme.colors.neutral.text);
        baseStyle.shadowOffset = finalLayoutConfig.shadowOffset;
        baseStyle.shadowOpacity = finalLayoutConfig.shadowOpacity;
        baseStyle.shadowRadius = finalLayoutConfig.shadowRadius;
      } else {
        baseStyle.elevation = finalLayoutConfig.elevation;
      }
    }

    return baseStyle;
  }, [
    position,
    finalLayoutConfig,
    backgroundColor,
    variant,
    theme,
    borderWidth,
    borderColor,
    finalSafeAreaConfig,
    insets.bottom,
  ]);

  const backdropStyle = useMemo((): ViewStyle => ({
    ...StyleSheet.absoluteFillObject,
    backgroundColor: finalBackdropConfig.color,
  }), [finalBackdropConfig.color]);

  // ============================================================================
  // HANDLERS
  // ============================================================================

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setContainerLayout({ width, height });
    onLayout?.(event);
  }, [onLayout]);

  const handleBackdropPress = useCallback(() => {
    finalBackdropConfig.onPress?.();
  }, [finalBackdropConfig]);

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <>
      {/* Backdrop */}
      {finalBackdropConfig.enabled && (
        <Animated.View
          style={[backdropStyle, animatedBackdropStyle]}
          pointerEvents="box-none"
        >
          <View
            style={StyleSheet.absoluteFillObject}
            onTouchEnd={handleBackdropPress}
          />
        </Animated.View>
      )}

      {/* Container */}
      <Animated.View
        style={[containerStyle, animatedContainerStyle, customStyle]}
        onLayout={handleLayout}
        testID={testID}
        {...panResponder.panHandlers}
      >
        {children}
      </Animated.View>
    </>
  );
};

// ============================================================================
// EXPORTS
// ============================================================================

export default BottomNavContainer;
