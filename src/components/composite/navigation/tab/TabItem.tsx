/**
 * Corp Astro UI Library - Tab Item Component
 * 
 * Professional tab item component providing individual tab functionality
 * for Corp Astro applications with theme integration and space-inspired design.
 * Serves as the building block for tab navigation systems with advanced features.
 * 
 * Features:
 * - Individual tab item with comprehensive configuration
 * - Multiple tab item variants and states
 * - Icon and badge support with customizable positioning
 * - Animation system with smooth transitions
 * - Ripple effects and interactive feedback
 * - Accessibility compliance with ARIA attributes
 * - Theme-aware styling with Corp Astro design tokens
 * - Responsive design with adaptive sizing
 * - Custom content support and flexible layouts
 * - Performance optimizations with native driver
 * - Platform-specific enhancements
 * 
 * @module TabItem
 * @version 1.0.0
 * @author Corp Astro Design System
 * @since 2024
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Animated,
  Platform,
  ViewStyle,
  TextStyle,
  ColorValue,
  Dimensions,
  LayoutChangeEvent,
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
 * Tab item variants
 */
export type TabItemVariant = 'default' | 'pill' | 'underline' | 'card' | 'chip' | 'ghost';

/**
 * Tab item sizes
 */
export type TabItemSize = 'small' | 'medium' | 'large' | 'xlarge';

/**
 * Tab item orientations
 */
export type TabItemOrientation = 'horizontal' | 'vertical';

/**
 * Tab item animation types
 */
export type TabItemAnimation = 'fade' | 'slide' | 'scale' | 'bounce' | 'elastic' | 'none';

/**
 * Tab item icon positions
 */
export type TabItemIconPosition = 'left' | 'right' | 'top' | 'bottom';

/**
 * Tab item badge positions
 */
export type TabItemBadgePosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

/**
 * Tab item badge configuration
 */
export interface TabItemBadge {
  /** Badge content */
  content: string | number;
  /** Badge color */
  color?: ColorValue;
  /** Badge text color */
  textColor?: ColorValue;
  /** Badge size */
  size?: number;
  /** Badge position */
  position?: TabItemBadgePosition;
  /** Badge visibility */
  visible?: boolean;
  /** Badge maximum value */
  max?: number;
  /** Badge show zero */
  showZero?: boolean;
  /** Badge dot mode */
  dot?: boolean;
}

/**
 * Tab item ripple configuration
 */
export interface TabItemRipple {
  /** Enable ripple effect */
  enabled?: boolean;
  /** Ripple color */
  color?: ColorValue;
  /** Ripple opacity */
  opacity?: number;
  /** Ripple duration */
  duration?: number;
  /** Ripple radius */
  radius?: number;
  /** Ripple center */
  centered?: boolean;
}

/**
 * Tab item indicator configuration
 */
export interface TabItemIndicator {
  /** Enable indicator */
  enabled?: boolean;
  /** Indicator color */
  color?: ColorValue;
  /** Indicator width */
  width?: number;
  /** Indicator height */
  height?: number;
  /** Indicator position */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /** Indicator border radius */
  borderRadius?: number;
  /** Indicator animation duration */
  animationDuration?: number;
}

/**
 * Tab item properties
 */
export interface TabItemProps {
  /** Tab item identifier */
  id: string;
  /** Tab item label */
  label: string;
  /** Tab item variant */
  variant?: TabItemVariant;
  /** Tab item size */
  size?: TabItemSize;
  /** Tab item orientation */
  orientation?: TabItemOrientation;
  /** Tab item animation */
  animation?: TabItemAnimation;
  /** Tab item icon */
  icon?: React.ReactNode;
  /** Tab item icon position */
  iconPosition?: TabItemIconPosition;
  /** Tab item badge */
  badge?: TabItemBadge;
  /** Tab item ripple */
  ripple?: TabItemRipple;
  /** Tab item indicator */
  indicator?: TabItemIndicator;
  /** Tab item background color */
  backgroundColor?: ColorValue;
  /** Tab item text color */
  textColor?: ColorValue;
  /** Tab item active text color */
  activeTextColor?: ColorValue;
  /** Tab item border color */
  borderColor?: ColorValue;
  /** Tab item accent color */
  accentColor?: ColorValue;
  /** Tab item active state */
  active?: boolean;
  /** Tab item disabled state */
  disabled?: boolean;
  /** Tab item loading state */
  loading?: boolean;
  /** Tab item error state */
  error?: boolean;
  /** Tab item success state */
  success?: boolean;
  /** Tab item focused state */
  focused?: boolean;
  /** Tab item hovered state */
  hovered?: boolean;
  /** Tab item pressed state */
  pressed?: boolean;
  /** Tab item selected state */
  selected?: boolean;
  /** Tab item visible state */
  visible?: boolean;
  /** Tab item accessibility label */
  accessibilityLabel?: string;
  /** Tab item accessibility hint */
  accessibilityHint?: string;
  /** Tab item test identifier */
  testID?: string;
  /** Tab item style override */
  style?: ViewStyle;
  /** Tab item content style */
  contentStyle?: ViewStyle;
  /** Tab item text style */
  textStyle?: TextStyle;
  /** Tab item children */
  children?: React.ReactNode;
  /** Tab item press handler */
  onPress?: (id: string) => void;
  /** Tab item long press handler */
  onLongPress?: (id: string) => void;
  /** Tab item press in handler */
  onPressIn?: (id: string) => void;
  /** Tab item press out handler */
  onPressOut?: (id: string) => void;
  /** Tab item layout handler */
  onLayout?: (event: LayoutChangeEvent) => void;
  /** Tab item mount handler */
  onMount?: (id: string) => void;
  /** Tab item unmount handler */
  onUnmount?: (id: string) => void;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const TAB_ITEM_SIZES = {
  small: { height: 36, padding: 8, fontSize: 12 },
  medium: { height: 44, padding: 12, fontSize: 14 },
  large: { height: 52, padding: 16, fontSize: 16 },
  xlarge: { height: 60, padding: 20, fontSize: 18 },
};

const ANIMATION_DURATIONS = {
  fast: 150,
  normal: 250,
  slow: 350,
};

const RIPPLE_DURATION = 400;
const INDICATOR_DURATION = 200;

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * TabItem component providing individual tab functionality
 * with theme integration and space-inspired design.
 */
export const TabItem: React.FC<TabItemProps> = ({
  id,
  label,
  variant = 'default',
  size = 'medium',
  orientation = 'horizontal',
  animation = 'fade',
  icon,
  iconPosition = 'left',
  badge,
  ripple = { enabled: true },
  indicator = { enabled: true },
  backgroundColor,
  textColor,
  activeTextColor,
  borderColor,
  accentColor,
  active = false,
  disabled = false,
  loading = false,
  error = false,
  success = false,
  focused = false,
  hovered = false,
  pressed = false,
  selected = false,
  visible = true,
  accessibilityLabel,
  accessibilityHint,
  testID,
  style,
  contentStyle,
  textStyle,
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
  const rippleValue = useRef(new Animated.Value(0)).current;
  const indicatorValue = useRef(new Animated.Value(active ? 1 : 0)).current;
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [rippleLayout, setRippleLayout] = useState({ width: 0, height: 0 });
  const [ripplePosition, setRipplePosition] = useState({ x: 0, y: 0 });

  // ============================================================================
  // ANIMATIONS
  // ============================================================================

  const animateIn = useCallback(() => {
    const duration = ANIMATION_DURATIONS.normal;

    Animated.parallel([
      Animated.timing(animationValue, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }),
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();
  }, [animationValue, scaleValue]);

  const animateOut = useCallback(() => {
    const duration = ANIMATION_DURATIONS.normal;

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
    ]).start();
  }, [animationValue, scaleValue]);

  const animatePress = useCallback(() => {
    if (disabled || loading) return;

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
  }, [scaleValue, disabled, loading]);

  const animateRipple = useCallback((event: GestureResponderEvent) => {
    if (!ripple.enabled) return;

    let locationX = event.nativeEvent.locationX ?? rippleLayout.width / 2;
    let locationY = event.nativeEvent.locationY ?? rippleLayout.height / 2;

    if (ripple.centered) {
      locationX = rippleLayout.width / 2;
      locationY = rippleLayout.height / 2;
    }

    setRipplePosition({ x: locationX, y: locationY });

    rippleValue.setValue(0);
    Animated.timing(rippleValue, {
      toValue: 1,
      duration: ripple.duration || RIPPLE_DURATION,
      useNativeDriver: true,
    }).start();
  }, [ripple, rippleValue, rippleLayout]);

  const animateIndicator = useCallback((show: boolean) => {
    if (!indicator.enabled) return;

    Animated.timing(indicatorValue, {
      toValue: show ? 1 : 0,
      duration: indicator.animationDuration || INDICATOR_DURATION,
      useNativeDriver: true,
    }).start();
  }, [indicator, indicatorValue]);

  // ============================================================================
  // HANDLERS
  // ============================================================================

  const handlePress = useCallback((event: GestureResponderEvent) => {
    if (disabled || loading) return;

    animatePress();
    animateRipple(event);
    onPress?.(id);
  }, [disabled, loading, id, onPress, animatePress, animateRipple]);

  const handleLongPress = useCallback(() => {
    if (disabled || loading) return;

    onLongPress?.(id);
  }, [disabled, loading, id, onLongPress]);

  const handlePressIn = useCallback(() => {
    if (disabled || loading) return;

    setIsPressed(true);
    onPressIn?.(id);
  }, [disabled, loading, id, onPressIn]);

  const handlePressOut = useCallback(() => {
    setIsPressed(false);
    onPressOut?.(id);
  }, [id, onPressOut]);

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setRippleLayout({ width, height });
    onLayout?.(event);
  }, [onLayout]);

  const handleDimensionsChange = ({ window }: { window: any }) => {
    setDimensions(window);
  };

  // ============================================================================
  // EFFECTS
  // ============================================================================

  useEffect(() => {
    onMount?.(id);
    
    const subscription = Dimensions.addEventListener('change', handleDimensionsChange);
    
    return () => {
      subscription?.remove();
      onUnmount?.(id);
    };
  }, [id, onMount, onUnmount]);

  useEffect(() => {
    if (visible) {
      animateIn();
    } else {
      animateOut();
    }
  }, [visible, animateIn, animateOut]);

  useEffect(() => {
    animateIndicator(active || selected);
  }, [active, selected, animateIndicator]);

  useEffect(() => {
    setIsHovered(hovered);
  }, [hovered]);

  // ============================================================================
  // STYLES
  // ============================================================================

  const getContainerStyle = (): ViewStyle => {
    const sizeConfig = TAB_ITEM_SIZES[size];
    
    return {
      height: orientation === 'horizontal' ? sizeConfig.height : undefined,
      width: orientation === 'vertical' ? sizeConfig.height : undefined,
      paddingHorizontal: sizeConfig.padding,
      paddingVertical: sizeConfig.padding / 2,
      backgroundColor: backgroundColor || getBackgroundColor(),
      borderColor: borderColor || getBorderColor(),
      ...getVariantStyle(),
      ...getStateStyle(),
      ...style,
    };
  };

  const getContentStyle = (): ViewStyle => ({
    flex: 1,
    flexDirection: getContentDirection(),
    alignItems: 'center',
    justifyContent: 'center',
    ...contentStyle,
  });

  const getTextStyle = (): TextStyle => {
    const sizeConfig = TAB_ITEM_SIZES[size];
    
    return {
      fontSize: sizeConfig.fontSize,
      fontWeight: active || selected ? '600' : '500',
      color: getTextColor(),
      textAlign: 'center',
      ...textStyle,
    };
  };

  const getAnimatedStyle = (): ViewStyle => {
    const transform = [];
    
    if (animation === 'scale') {
      transform.push({ scale: scaleValue });
    }
    
    return {
      opacity: animation === 'fade' ? animationValue : 1,
      transform: transform.length > 0 ? transform : undefined,
    };
  };

  const getRippleStyle = (): ViewStyle => {
    const rippleSize = Math.max(rippleLayout.width, rippleLayout.height) * 2;
    const rippleRadius = ripple.radius || rippleSize / 2;
    
    return {
      position: 'absolute',
      top: ripplePosition.y - rippleRadius,
      left: ripplePosition.x - rippleRadius,
      width: rippleSize,
      height: rippleSize,
      borderRadius: rippleRadius,
      backgroundColor: ripple.color || theme.colors.neutral.light,
      opacity: rippleValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, ripple.opacity || 0.2, 0],
      }),
      transform: [
        {
          scale: rippleValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          }),
        },
      ],
    };
  };

  const getIndicatorStyle = (): ViewStyle => {
    const indicatorConfig = indicator;
    const position = indicatorConfig.position || 'bottom';
    
    const baseStyle: ViewStyle = {
      position: 'absolute',
      backgroundColor: indicatorConfig.color || accentColor || theme.colors.brand.primary,
      borderRadius: indicatorConfig.borderRadius || 2,
    };
    
    if (position === 'bottom') {
      return {
        ...baseStyle,
        bottom: 0,
        left: 0,
        right: 0,
        height: indicatorConfig.height || 3,
        opacity: indicatorValue,
      };
    } else if (position === 'top') {
      return {
        ...baseStyle,
        top: 0,
        left: 0,
        right: 0,
        height: indicatorConfig.height || 3,
        opacity: indicatorValue,
      };
    } else if (position === 'left') {
      return {
        ...baseStyle,
        left: 0,
        top: 0,
        bottom: 0,
        width: indicatorConfig.width || 3,
        opacity: indicatorValue,
      };
    } else if (position === 'right') {
      return {
        ...baseStyle,
        right: 0,
        top: 0,
        bottom: 0,
        width: indicatorConfig.width || 3,
        opacity: indicatorValue,
      };
    }
    
    return baseStyle;
  };

  const getBadgeStyle = (): ViewStyle => {
    const badgeConfig = badge;
    const position = badgeConfig?.position || 'top-right';
    const size = badgeConfig?.size || 18;
    
    const baseStyle: ViewStyle = {
      position: 'absolute',
      minWidth: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: badgeConfig?.color || theme.colors.mystical.deep,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 4,
    };
    
    if (position === 'top-right') {
      return {
        ...baseStyle,
        top: -size / 2,
        right: -size / 2,
      };
    } else if (position === 'top-left') {
      return {
        ...baseStyle,
        top: -size / 2,
        left: -size / 2,
      };
    } else if (position === 'bottom-right') {
      return {
        ...baseStyle,
        bottom: -size / 2,
        right: -size / 2,
      };
    } else if (position === 'bottom-left') {
      return {
        ...baseStyle,
        bottom: -size / 2,
        left: -size / 2,
      };
    }
    
    return baseStyle;
  };

  const getBackgroundColor = (): ColorValue => {
    if (active || selected) {
      if (variant === 'pill') {
        return theme.colors.brand.primary;
      } else if (variant === 'card') {
        return theme.colors.cosmos.medium;
      } else if (variant === 'chip') {
        return theme.colors.cosmos.medium;
      }
    }
    
    if (variant === 'card') {
      return theme.colors.cosmos.deep;
    }
    
    return 'transparent';
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

  const getTextColor = (): ColorValue => {
    if (active || selected) {
      return activeTextColor || theme.colors.neutral.light;
    }
    
    if (disabled) {
      return theme.colors.neutral.muted;
    }
    
    return textColor || theme.colors.neutral.medium;
  };

  const getVariantStyle = (): ViewStyle => {
    const styles: ViewStyle = {};
    
    if (variant === 'pill') {
      styles.borderRadius = 20;
    } else if (variant === 'card') {
      styles.borderRadius = 8;
      styles.shadowColor = theme.colors.cosmos.void;
      styles.shadowOffset = { width: 0, height: 2 };
      styles.shadowOpacity = 0.1;
      styles.shadowRadius = 4;
      styles.elevation = 2;
    } else if (variant === 'chip') {
      styles.borderRadius = 16;
    } else if (variant === 'underline') {
      styles.borderBottomWidth = active || selected ? 2 : 0;
      styles.borderBottomColor = accentColor || theme.colors.brand.primary;
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
    
    if (isPressed || pressed) {
      styles.opacity = 0.9;
    }
    
    if (isHovered) {
      styles.opacity = 0.95;
    }
    
    return styles;
  };

  const getContentDirection = (): 'row' | 'column' => {
    if (orientation === 'vertical') {
      return 'column';
    }
    
    if (iconPosition === 'top' || iconPosition === 'bottom') {
      return 'column';
    }
    
    return 'row';
  };

  const getIconMargin = (): ViewStyle => {
    const margin = 8;
    
    if (iconPosition === 'left') {
      return { marginRight: margin };
    } else if (iconPosition === 'right') {
      return { marginLeft: margin };
    } else if (iconPosition === 'top') {
      return { marginBottom: margin };
    } else if (iconPosition === 'bottom') {
      return { marginTop: margin };
    }
    
    return {};
  };

  const formatBadgeContent = (): string => {
    if (!badge) return '';
    
    const content = badge.content;
    const max = badge.max || 99;
    
    if (typeof content === 'number') {
      if (content === 0 && !badge.showZero) {
        return '';
      }
      
      if (content > max) {
        return `${max}+`;
      }
      
      return content.toString();
    }
    
    return content.toString();
  };

  // ============================================================================
  // RENDER HELPERS
  // ============================================================================

  const renderIcon = () => {
    if (!icon) return null;
    
    return (
      <View style={[styles.iconContainer, getIconMargin()]}>
        {icon}
      </View>
    );
  };

  const renderLabel = () => {
    if (!label && !children) return null;
    
    return (
      <Text style={getTextStyle()}>
        {children || label}
      </Text>
    );
  };

  const renderBadge = () => {
    if (!badge || !badge.visible) return null;
    
    const badgeContent = formatBadgeContent();
    if (!badgeContent && !badge.dot) return null;
    
    return (
      <View style={getBadgeStyle()}>
        {!badge.dot && (
          <Text style={[styles.badgeText, { color: badge.textColor || 'white' }]}>
            {badgeContent}
          </Text>
        )}
      </View>
    );
  };

  const renderRipple = () => {
    if (!ripple.enabled) return null;
    
    return <Animated.View style={getRippleStyle()} />;
  };

  const renderIndicator = () => {
    if (!indicator.enabled) return null;
    
    return <Animated.View style={getIndicatorStyle()} />;
  };

  const renderContent = () => {
    const contentDirection = getContentDirection();
    const iconFirst = iconPosition === 'left' || iconPosition === 'top';
    
    return (
      <View style={getContentStyle()}>
        {iconFirst && renderIcon()}
        {renderLabel()}
        {!iconFirst && renderIcon()}
        {renderBadge()}
      </View>
    );
  };

  // ============================================================================
  // RENDER
  // ============================================================================

  if (!visible) {
    return null;
  }

  const TouchableComponent = Platform.OS === 'android' && ripple.enabled ? TouchableNativeFeedback : TouchableOpacity;

  const touchableProps = Platform.OS === 'android' && ripple.enabled ? {
    background: TouchableNativeFeedback.Ripple(ripple.color || theme.colors.neutral.light, ripple.centered ?? true, ripple.radius),
  } : {};

  return (
    <Animated.View style={[getContainerStyle(), getAnimatedStyle()]}>
      <TouchableComponent
        style={styles.touchable}
        onPress={handlePress}
        onLongPress={handleLongPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onLayout={handleLayout}
        disabled={disabled || loading}
        activeOpacity={0.8}
        accessibilityLabel={accessibilityLabel || label}
        accessibilityHint={accessibilityHint}
        accessibilityRole="tab"
        accessibilityState={{ 
          selected: active || selected,
          disabled: disabled || loading,
        }}
        testID={testID}
        {...touchableProps}
      >
        {renderContent()}
        {Platform.OS !== 'android' && renderRipple()}
        {renderIndicator()}
      </TouchableComponent>
    </Animated.View>
  );
};

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  touchable: {
    flex: 1,
    overflow: 'hidden',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
  },
});

// ============================================================================
// EXPORTS
// ============================================================================

export default TabItem;