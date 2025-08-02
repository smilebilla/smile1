/**
 * Corp Astro UI Library - Bottom Navigation Item
 * 
 * A comprehensive individual item component for bottom navigation systems.
 * Provides advanced styling, animations, badges, and accessibility features
 * for navigation items within bottom navigation containers.
 * 
 * @module BottomNavItem
 * @version 1.0.0
 * @author Corp Astro Design System
 * @since 2025
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  Animated,
  PanResponder,
  PanResponderInstance,
  GestureResponderEvent,
  PanResponderGestureState,
  AccessibilityInfo,
  AccessibilityRole,
  AccessibilityState,
  Platform,
  Vibration,
} from 'react-native';
import { useTheme } from '../../../foundations/themes/useTheme';
import { spacing } from '../../../foundations/tokens/spacing/SpacingScale';
import { fontSizes } from '../../../foundations/tokens/typography/FontSizes';

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
 * Bottom navigation item variant types
 */
export enum BottomNavItemVariant {
  DEFAULT = 'default',
  COMPACT = 'compact',
  MINIMAL = 'minimal',
  ROUNDED = 'rounded',
  SQUARE = 'square',
  FLOATING = 'floating',
  COSMIC = 'cosmic',
  PILL = 'pill',
}

/**
 * Bottom navigation item size types
 */
export enum BottomNavItemSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  EXTRA_LARGE = 'extraLarge',
  CUSTOM = 'custom',
}

/**
 * Bottom navigation item animation types
 */
export enum BottomNavItemAnimation {
  SMOOTH = 'smooth',
  ELASTIC = 'elastic',
  SPRING = 'spring',
  BOUNCE = 'bounce',
  PULSE = 'pulse',
  SCALE = 'scale',
  FADE = 'fade',
  NONE = 'none',
}

/**
 * Bottom navigation item state types
 */
export enum BottomNavItemState {
  NORMAL = 'normal',
  ACTIVE = 'active',
  DISABLED = 'disabled',
  LOADING = 'loading',
  PRESSED = 'pressed',
  FOCUSED = 'focused',
}

/**
 * Badge configuration interface
 */
export interface BottomNavItemBadgeConfig {
  enabled: boolean;
  count?: number;
  text?: string;
  maxCount?: number;
  showZero?: boolean;
  color?: string;
  backgroundColor?: string;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  size?: 'small' | 'medium' | 'large';
  animated?: boolean;
}

/**
 * Icon configuration interface
 */
export interface BottomNavItemIconConfig {
  name: string;
  size?: number;
  color?: string;
  activeColor?: string;
  library?: 'ionicons' | 'material' | 'feather' | 'custom';
  component?: React.ComponentType<any>;
  activeComponent?: React.ComponentType<any>;
}

/**
 * Animation configuration interface
 */
export interface BottomNavItemAnimationConfig {
  duration: number;
  delay: number;
  easing: string;
  damping: number;
  stiffness: number;
  mass: number;
  tension: number;
  friction: number;
  useNativeDriver: boolean;
}

/**
 * Gesture configuration interface
 */
export interface BottomNavItemGestureConfig {
  enabled: boolean;
  longPressEnabled: boolean;
  swipeEnabled: boolean;
  panEnabled: boolean;
  longPressDuration: number;
  swipeThreshold: number;
  panThreshold: number;
  hapticFeedback: boolean;
  soundFeedback: boolean;
}

/**
 * Accessibility configuration interface
 */
export interface BottomNavItemAccessibilityConfig {
  enabled: boolean;
  label?: string;
  hint?: string;
  role?: AccessibilityRole;
  state?: AccessibilityState;
  announceStateChanges?: boolean;
  groupLabel?: string;
  reducedMotion?: boolean;
}

/**
 * Style configuration interface
 */
export interface BottomNavItemStyleConfig {
  containerStyle?: ViewStyle;
  contentStyle?: ViewStyle;
  iconStyle?: ViewStyle;
  labelStyle?: TextStyle;
  badgeStyle?: ViewStyle;
  badgeTextStyle?: TextStyle;
  activeContainerStyle?: ViewStyle;
  activeContentStyle?: ViewStyle;
  activeIconStyle?: ViewStyle;
  activeLabelStyle?: TextStyle;
  disabledContainerStyle?: ViewStyle;
  disabledContentStyle?: ViewStyle;
  disabledIconStyle?: ViewStyle;
  disabledLabelStyle?: TextStyle;
}

/**
 * Bottom navigation item props interface
 */
export interface BottomNavItemProps {
  id: string;
  label?: string;
  icon?: BottomNavItemIconConfig;
  badge?: BottomNavItemBadgeConfig;
  variant?: BottomNavItemVariant;
  size?: BottomNavItemSize;
  animation?: BottomNavItemAnimation;
  state?: BottomNavItemState;
  active?: boolean;
  disabled?: boolean;
  loading?: boolean;
  selected?: boolean;
  customStyle?: BottomNavItemStyleConfig;
  animationConfig?: Partial<BottomNavItemAnimationConfig>;
  gestureConfig?: Partial<BottomNavItemGestureConfig>;
  accessibilityConfig?: Partial<BottomNavItemAccessibilityConfig>;
  showLabel?: boolean;
  showBadge?: boolean;
  showRipple?: boolean;
  allowFontScaling?: boolean;
  numberOfLines?: number;
  onPress?: (id: string) => void;
  onLongPress?: (id: string) => void;
  onSwipeLeft?: (id: string) => void;
  onSwipeRight?: (id: string) => void;
  onSwipeUp?: (id: string) => void;
  onSwipeDown?: (id: string) => void;
  onPressIn?: (id: string) => void;
  onPressOut?: (id: string) => void;
  onFocus?: (id: string) => void;
  onBlur?: (id: string) => void;
  onStateChange?: (id: string, state: BottomNavItemState) => void;
  testID?: string;
  children?: React.ReactNode;
}

// ============================================================================
// COMPONENT IMPLEMENTATION
// ============================================================================

/**
 * BottomNavItem Component
 * 
 * A comprehensive individual item component for bottom navigation systems
 * with advanced styling, animations, badges, and accessibility features.
 */
export const BottomNavItem: React.FC<BottomNavItemProps> = ({
  id,
  label,
  icon,
  badge,
  variant = BottomNavItemVariant.DEFAULT,
  size = BottomNavItemSize.MEDIUM,
  animation = BottomNavItemAnimation.SMOOTH,
  state = BottomNavItemState.NORMAL,
  active = false,
  disabled = false,
  loading = false,
  selected = false,
  customStyle,
  animationConfig,
  gestureConfig,
  accessibilityConfig,
  showLabel = true,
  showBadge = true,
  showRipple = true,
  allowFontScaling = true,
  numberOfLines = 1,
  onPress,
  onLongPress,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  onPressIn,
  onPressOut,
  onFocus,
  onBlur,
  onStateChange,
  testID,
  children,
}) => {
  // ============================================================================
  // HOOKS AND CONTEXT
  // ============================================================================

  const { theme } = useTheme();
  const [currentState, setCurrentState] = useState<BottomNavItemState>(
    disabled ? BottomNavItemState.DISABLED : state
  );
  const [rippleEffect, setRippleEffect] = useState(false);

  // ============================================================================
  // ANIMATION VALUES
  // ============================================================================

  const scaleValue = useRef(new Animated.Value(1)).current;
  const opacityValue = useRef(new Animated.Value(1)).current;
  const translateYValue = useRef(new Animated.Value(0)).current;
  const rotateValue = useRef(new Animated.Value(0)).current;
  const badgeScaleValue = useRef(new Animated.Value(1)).current;
  const rippleOpacityValue = useRef(new Animated.Value(0)).current;
  const rippleScaleValue = useRef(new Animated.Value(0)).current;

  // ============================================================================
  // CONFIGURATION OBJECTS
  // ============================================================================

  const defaultAnimationConfig: BottomNavItemAnimationConfig = useMemo(() => ({
    duration: animation === BottomNavItemAnimation.SMOOTH ? 200 : 
             animation === BottomNavItemAnimation.ELASTIC ? 300 : 
             animation === BottomNavItemAnimation.SPRING ? 250 : 
             animation === BottomNavItemAnimation.BOUNCE ? 400 : 
             animation === BottomNavItemAnimation.PULSE ? 150 : 
             animation === BottomNavItemAnimation.SCALE ? 200 : 
             animation === BottomNavItemAnimation.FADE ? 150 : 200,
    delay: 0,
    easing: 'ease-in-out',
    damping: 15,
    stiffness: 150,
    mass: 1,
    tension: 40,
    friction: 7,
    useNativeDriver: true,
  }), [animation]);

  const defaultGestureConfig: BottomNavItemGestureConfig = useMemo(() => ({
    enabled: true,
    longPressEnabled: true,
    swipeEnabled: false,
    panEnabled: false,
    longPressDuration: 500,
    swipeThreshold: 50,
    panThreshold: 10,
    hapticFeedback: true,
    soundFeedback: false,
  }), []);

  const defaultAccessibilityConfig: BottomNavItemAccessibilityConfig = useMemo(() => ({
    enabled: true,
    label: label || `Navigation item ${id}`,
    hint: `Tap to navigate to ${label || id}`,
    role: 'tab',
    state: { selected: active || selected },
    announceStateChanges: true,
    groupLabel: 'Bottom Navigation',
    reducedMotion: false,
  }), [id, label, active, selected]);

  // Merge configurations
  const finalAnimationConfig = useMemo(() => ({
    ...defaultAnimationConfig,
    ...animationConfig,
  }), [defaultAnimationConfig, animationConfig]);

  const finalGestureConfig = useMemo(() => ({
    ...defaultGestureConfig,
    ...gestureConfig,
  }), [defaultGestureConfig, gestureConfig]);

  const finalAccessibilityConfig = useMemo(() => ({
    ...defaultAccessibilityConfig,
    ...accessibilityConfig,
  }), [defaultAccessibilityConfig, accessibilityConfig]);

  // ============================================================================
  // ANIMATION HELPERS
  // ============================================================================

  const animateToState = useCallback((newState: BottomNavItemState) => {
    if (animation === BottomNavItemAnimation.NONE) return;

    const config = finalAnimationConfig;
    const animations: Animated.CompositeAnimation[] = [];

    switch (newState) {
      case BottomNavItemState.ACTIVE:
        animations.push(
          Animated.timing(scaleValue, {
            toValue: 1.1,
            duration: config.duration,
            useNativeDriver: config.useNativeDriver,
          }),
          Animated.timing(opacityValue, {
            toValue: 1,
            duration: config.duration,
            useNativeDriver: config.useNativeDriver,
          })
        );
        break;

      case BottomNavItemState.PRESSED:
        animations.push(
          Animated.timing(scaleValue, {
            toValue: 0.95,
            duration: config.duration * 0.5,
            useNativeDriver: config.useNativeDriver,
          })
        );
        break;

      case BottomNavItemState.DISABLED:
        animations.push(
          Animated.timing(opacityValue, {
            toValue: 0.5,
            duration: config.duration,
            useNativeDriver: config.useNativeDriver,
          })
        );
        break;

      case BottomNavItemState.LOADING:
        animations.push(
          Animated.loop(
            Animated.sequence([
              Animated.timing(opacityValue, {
                toValue: 0.5,
                duration: config.duration,
                useNativeDriver: config.useNativeDriver,
              }),
              Animated.timing(opacityValue, {
                toValue: 1,
                duration: config.duration,
                useNativeDriver: config.useNativeDriver,
              }),
            ])
          )
        );
        break;

      case BottomNavItemState.NORMAL:
      default:
        animations.push(
          Animated.timing(scaleValue, {
            toValue: 1,
            duration: config.duration,
            useNativeDriver: config.useNativeDriver,
          }),
          Animated.timing(opacityValue, {
            toValue: 1,
            duration: config.duration,
            useNativeDriver: config.useNativeDriver,
          })
        );
        break;
    }

    if (animations.length > 0) {
      Animated.parallel(animations).start();
    }
  }, [
    animation,
    finalAnimationConfig,
    scaleValue,
    opacityValue,
    translateYValue,
    rotateValue,
  ]);

  const animateRipple = useCallback(() => {
    if (!showRipple) return;

    rippleOpacityValue.setValue(0.3);
    rippleScaleValue.setValue(0);

    Animated.parallel([
      Animated.timing(rippleOpacityValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(rippleScaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [showRipple, rippleOpacityValue, rippleScaleValue]);

  const animateBadge = useCallback(() => {
    if (!badge?.enabled || !showBadge) return;

    Animated.sequence([
      Animated.timing(badgeScaleValue, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(badgeScaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, [badge?.enabled, showBadge, badgeScaleValue]);

  // ============================================================================
  // GESTURE HANDLERS
  // ============================================================================

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => finalGestureConfig.enabled && finalGestureConfig.panEnabled,
        onMoveShouldSetPanResponder: (event, gestureState) => {
          return finalGestureConfig.enabled && 
                 finalGestureConfig.panEnabled && 
                 Math.abs(gestureState.dx) > finalGestureConfig.panThreshold;
        },
        onPanResponderGrant: () => {
          if (finalGestureConfig.hapticFeedback) {
            Vibration.vibrate(10);
          }
        },
        onPanResponderMove: (event, gestureState) => {
          // Handle pan movement if needed
        },
        onPanResponderRelease: (event, gestureState) => {
          const { dx, dy, vx, vy } = gestureState;
          
          if (Math.abs(dx) > finalGestureConfig.swipeThreshold) {
            if (dx > 0) {
              onSwipeRight?.(id);
            } else {
              onSwipeLeft?.(id);
            }
          } else if (Math.abs(dy) > finalGestureConfig.swipeThreshold) {
            if (dy > 0) {
              onSwipeDown?.(id);
            } else {
              onSwipeUp?.(id);
            }
          }
        },
      }),
    [
      finalGestureConfig,
      id,
      onSwipeLeft,
      onSwipeRight,
      onSwipeUp,
      onSwipeDown,
    ]
  );

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  const handlePress = useCallback(() => {
    if (disabled || currentState === BottomNavItemState.DISABLED) return;

    if (finalGestureConfig.hapticFeedback) {
      Vibration.vibrate(10);
    }

    animateRipple();
    onPress?.(id);

    if (finalAccessibilityConfig.enabled && finalAccessibilityConfig.announceStateChanges) {
      AccessibilityInfo.announceForAccessibility(
        `${label || id} selected`
      );
    }
  }, [
    disabled,
    currentState,
    finalGestureConfig.hapticFeedback,
    animateRipple,
    onPress,
    id,
    finalAccessibilityConfig.enabled,
    finalAccessibilityConfig.announceStateChanges,
    label,
  ]);

  const handleLongPress = useCallback(() => {
    if (disabled || currentState === BottomNavItemState.DISABLED) return;
    if (!finalGestureConfig.longPressEnabled) return;

    if (finalGestureConfig.hapticFeedback) {
      Vibration.vibrate(20);
    }

    onLongPress?.(id);
  }, [
    disabled,
    currentState,
    finalGestureConfig.longPressEnabled,
    finalGestureConfig.hapticFeedback,
    onLongPress,
    id,
  ]);

  const handlePressIn = useCallback(() => {
    if (disabled || currentState === BottomNavItemState.DISABLED) return;

    setCurrentState(BottomNavItemState.PRESSED);
    animateToState(BottomNavItemState.PRESSED);
    onPressIn?.(id);
  }, [disabled, currentState, animateToState, onPressIn, id]);

  const handlePressOut = useCallback(() => {
    if (disabled || currentState === BottomNavItemState.DISABLED) return;

    const newState = active ? BottomNavItemState.ACTIVE : BottomNavItemState.NORMAL;
    setCurrentState(newState);
    animateToState(newState);
    onPressOut?.(id);
  }, [disabled, currentState, active, animateToState, onPressOut, id]);

  // ============================================================================
  // EFFECTS
  // ============================================================================

  // Handle state changes
  useEffect(() => {
    const newState = disabled ? BottomNavItemState.DISABLED : 
                    loading ? BottomNavItemState.LOADING : 
                    active ? BottomNavItemState.ACTIVE : 
                    BottomNavItemState.NORMAL;

    if (newState !== currentState) {
      setCurrentState(newState);
      animateToState(newState);
      onStateChange?.(id, newState);
    }
  }, [disabled, loading, active, currentState, animateToState, onStateChange, id]);

  // Handle badge animation
  useEffect(() => {
    if (badge?.enabled && badge?.count && badge.count > 0) {
      animateBadge();
    }
  }, [badge?.enabled, badge?.count, animateBadge]);

  // ============================================================================
  // STYLES
  // ============================================================================

  const containerStyle = useMemo((): ViewStyle => {
    const baseStyle: ViewStyle = {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: size === BottomNavItemSize.SMALL ? spacing.xs : 
                      size === BottomNavItemSize.MEDIUM ? spacing.sm : 
                      size === BottomNavItemSize.LARGE ? spacing.md : 
                      size === BottomNavItemSize.EXTRA_LARGE ? spacing.lg : spacing.sm,
      paddingHorizontal: spacing.xs,
      borderRadius: variant === BottomNavItemVariant.ROUNDED ? borderRadius.md : 
                   variant === BottomNavItemVariant.SQUARE ? borderRadius.none : 
                   variant === BottomNavItemVariant.FLOATING ? borderRadius.lg : 
                   variant === BottomNavItemVariant.PILL ? borderRadius.xxl : 
                   borderRadius.sm,
      backgroundColor: variant === BottomNavItemVariant.FLOATING ? 
                      String(theme.colors.cosmos.medium) : 
                      'transparent',
      minHeight: size === BottomNavItemSize.SMALL ? 48 : 
                size === BottomNavItemSize.MEDIUM ? 56 : 
                size === BottomNavItemSize.LARGE ? 64 : 
                size === BottomNavItemSize.EXTRA_LARGE ? 72 : 56,
    };

    if (active || selected) {
      baseStyle.backgroundColor = variant === BottomNavItemVariant.FLOATING ? 
                                 String(theme.colors.brand.primary) : 
                                 String(theme.colors.cosmos.medium);
    }

    return baseStyle;
  }, [size, variant, theme, active, selected]);

  const contentStyle = useMemo((): ViewStyle => ({
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  }), []);

  const iconStyle = useMemo((): ViewStyle => ({
    width: size === BottomNavItemSize.SMALL ? 20 : 
           size === BottomNavItemSize.MEDIUM ? 24 : 
           size === BottomNavItemSize.LARGE ? 28 : 
           size === BottomNavItemSize.EXTRA_LARGE ? 32 : 24,
    height: size === BottomNavItemSize.SMALL ? 20 : 
            size === BottomNavItemSize.MEDIUM ? 24 : 
            size === BottomNavItemSize.LARGE ? 28 : 
            size === BottomNavItemSize.EXTRA_LARGE ? 32 : 24,
  }), [size]);

  const labelStyle = useMemo((): TextStyle => ({
    fontSize: size === BottomNavItemSize.SMALL ? 10 : 
              size === BottomNavItemSize.MEDIUM ? 12 : 
              size === BottomNavItemSize.LARGE ? 14 : 
              size === BottomNavItemSize.EXTRA_LARGE ? 16 : 12,
    color: active || selected ? String(theme.colors.neutral.light) : String(theme.colors.neutral.text),
    textAlign: 'center',
    fontWeight: active || selected ? '600' : '400',
  }), [size, theme, active, selected]);

  const badgeStyle = useMemo((): ViewStyle => ({
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: String(theme.colors.luxury.pure),
    borderRadius: 10,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  }), [theme]);

  const badgeTextStyle = useMemo((): TextStyle => ({
    fontSize: 10,
    color: String(theme.colors.neutral.text),
    fontWeight: '600',
  }), [theme]);

  const rippleStyle = useMemo((): ViewStyle => ({
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: containerStyle.borderRadius as number,
    backgroundColor: String(theme.colors.brand.primary),
  }), [containerStyle.borderRadius, theme]);

  const animatedStyle = useMemo(() => ({
    transform: [
      { scale: scaleValue },
      { translateY: translateYValue },
      { rotate: rotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
      }) },
    ],
    opacity: opacityValue,
  }), [scaleValue, translateYValue, rotateValue, opacityValue]);

  const animatedBadgeStyle = useMemo(() => ({
    transform: [{ scale: badgeScaleValue }],
  }), [badgeScaleValue]);

  const animatedRippleStyle = useMemo(() => ({
    transform: [{ scale: rippleScaleValue }],
    opacity: rippleOpacityValue,
  }), [rippleScaleValue, rippleOpacityValue]);

  // ============================================================================
  // RENDER HELPERS
  // ============================================================================

  const renderIcon = () => {
    if (!icon) return null;

    const IconComponent = (active || selected) && icon.activeComponent ? 
                         icon.activeComponent : icon.component;

    if (IconComponent) {
      return (
        <IconComponent
          name={icon.name}
          size={icon.size || iconStyle.width}
          color={(active || selected) && icon.activeColor ? 
                icon.activeColor : icon.color || String(theme.colors.neutral.text)}
        />
      );
    }

    return (
      <View style={iconStyle}>
        <Text style={labelStyle}>{icon.name}</Text>
      </View>
    );
  };

  const renderLabel = () => {
    if (!showLabel || !label) return null;

    return (
      <Text
        style={[labelStyle, customStyle?.labelStyle]}
        allowFontScaling={allowFontScaling}
        numberOfLines={numberOfLines}
      >
        {label}
      </Text>
    );
  };

  const renderBadge = () => {
    if (!showBadge || !badge?.enabled) return null;

    let badgeContent = '';
    if (badge.text) {
      badgeContent = badge.text;
    } else if (badge.count !== undefined) {
      if (badge.count === 0 && !badge.showZero) return null;
      badgeContent = badge.count > (badge.maxCount || 99) ? 
                     `${badge.maxCount || 99}+` : 
                     badge.count.toString();
    }

    if (!badgeContent) return null;

    return (
      <Animated.View
        style={[
          badgeStyle,
          customStyle?.badgeStyle,
          animatedBadgeStyle,
          {
            backgroundColor: badge.backgroundColor || badgeStyle.backgroundColor,
          },
        ]}
      >
        <Text
          style={[
            badgeTextStyle,
            customStyle?.badgeTextStyle,
            {
              color: badge.color || badgeTextStyle.color,
            },
          ]}
        >
          {badgeContent}
        </Text>
      </Animated.View>
    );
  };

  const renderRipple = () => {
    if (!showRipple) return null;

    return (
      <Animated.View
        style={[rippleStyle, animatedRippleStyle]}
        pointerEvents="none"
      />
    );
  };

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  return (
    <TouchableOpacity
      style={[containerStyle, customStyle?.containerStyle]}
      onPress={handlePress}
      onLongPress={handleLongPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || currentState === BottomNavItemState.DISABLED}
      accessibilityRole={finalAccessibilityConfig.role}
      accessibilityLabel={finalAccessibilityConfig.label}
      accessibilityHint={finalAccessibilityConfig.hint}
      accessibilityState={finalAccessibilityConfig.state}
      testID={testID}
      {...panResponder.panHandlers}
    >
      {renderRipple()}
      
      <Animated.View
        style={[
          contentStyle,
          customStyle?.contentStyle,
          animatedStyle,
        ]}
      >
        <View style={[iconStyle, customStyle?.iconStyle]}>
          {renderIcon()}
          {renderBadge()}
        </View>
        
        {renderLabel()}
        
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
};

// ============================================================================
// EXPORTS
// ============================================================================

export default BottomNavItem;
