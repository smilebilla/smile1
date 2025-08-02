/**
 * Corp Astro UI Library - Link Typography Component
 * 
 * Interactive link text component with hover effects and Corp Astro design system integration.
 * Provides a foundational link component for navigation and interactive text.
 * 
 * @module Link
 * @version 1.0.0
 * @since 2024
 * 
 * UI Documentation Reference:
 * - Typography: Inter, 14px, 500 weight, color: '#54A0FF'
 * - Hover: glow effect '0 0 10px rgba(84,160,255,0.5)'
 * - Inline behavior: no padding, no background
 * - Accessible touch targets
 * - Text decoration: underline on hover
 * 
 * Features:
 * - Interactive link behavior
 * - Hover glow effects
 * - Text decoration options
 * - Accessibility support
 * - Responsive touch targets
 * - Animation states
 * - Theme integration
 * - Multiple link variants
 * - Size variants
 * - External link support
 * - Disabled states
 */

import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import {
  TouchableOpacity,
  Text,
  Animated,
  Easing,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
  AccessibilityProps,
  Platform,
} from 'react-native';

/**
 * Link size variants
 */
export type LinkSize = 'small' | 'medium' | 'large';

/**
 * Link weight variants
 */
export type LinkWeight = 'regular' | 'medium' | 'semibold';

/**
 * Link alignment options
 */
export type LinkAlign = 'left' | 'center' | 'right';

/**
 * Link color variants
 */
export type LinkColor = 'primary' | 'secondary' | 'accent' | 'muted' | 'inverse' | 'error' | 'warning' | 'success';

/**
 * Link animation types
 */
export type LinkAnimation = 'none' | 'fade' | 'slide' | 'scale' | 'glow' | 'shimmer';

/**
 * Link variant types
 */
export type LinkVariant = 'default' | 'inline' | 'button' | 'nav' | 'external';

/**
 * Link decoration options
 */
export type LinkDecoration = 'none' | 'underline' | 'hover' | 'always';

/**
 * Link component props
 */
export interface LinkProps extends Omit<AccessibilityProps, 'accessibilityRole'> {
  /** Link text content */
  children: string;
  /** Link variant */
  variant?: LinkVariant;
  /** Link size */
  size?: LinkSize;
  /** Link weight */
  weight?: LinkWeight;
  /** Link alignment */
  align?: LinkAlign;
  /** Link color */
  color?: LinkColor;
  /** Link animation */
  animation?: LinkAnimation;
  /** Text decoration */
  decoration?: LinkDecoration;
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
  /** External link indicator */
  external?: boolean;
  /** Visited state */
  visited?: boolean;
  /** Custom text transform */
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  /** Custom letter spacing */
  customLetterSpacing?: number;
  /** Uppercase text */
  uppercase?: boolean;
  /** Lowercase text */
  lowercase?: boolean;
  /** Capitalize text */
  capitalize?: boolean;
  /** Truncate text */
  truncate?: boolean;
  /** Number of lines to show */
  numberOfLines?: number;
  /** Whether to enable selectable text */
  selectable?: boolean;
  /** Whether to enable adjustable font size */
  adjustsFontSizeToFit?: boolean;
  /** Minimum font scale */
  minimumFontScale?: number;
  /** Custom text style */
  style?: TextStyle;
  /** Custom text shadow */
  textShadow?: {
    color?: string;
    offset?: { width: number; height: number };
    radius?: number;
  };
  /** Whether to enable glow effect */
  enableGlow?: boolean;
  /** Glow color */
  glowColor?: string;
  /** Glow intensity */
  glowIntensity?: number;
  /** Animation duration in milliseconds */
  animationDuration?: number;
  /** Animation delay in milliseconds */
  animationDelay?: number;
  /** Whether to loop animation */
  animationLoop?: boolean;
  /** Test ID for testing */
  testID?: string;
}

/**
 * Link component ref
 */
export interface LinkRef {
  /** Focus the link */
  focus: () => void;
  /** Blur the link */
  blur: () => void;
  /** Animate the link */
  animate: (toValue: number, duration?: number) => void;
  /** Measure the link */
  measure: () => Promise<{
    width: number;
    height: number;
    x: number;
    y: number;
  }>;
}

/**
 * Size configuration for different link sizes
 */
const sizeConfigs = {
  small: {
    fontSize: 12,
    lineHeight: 16,
    minHeight: 32,
  },
  medium: {
    fontSize: 14,
    lineHeight: 20,
    minHeight: 40,
  },
  large: {
    fontSize: 16,
    lineHeight: 24,
    minHeight: 48,
  },
};

/**
 * Weight configuration for different font weights
 */
const weightConfigs = {
  regular: Platform.select({
    ios: '400' as const,
    android: '400' as const,
  }),
  medium: Platform.select({
    ios: '500' as const,
    android: '500' as const,
  }),
  semibold: Platform.select({
    ios: '600' as const,
    android: '600' as const,
  }),
};

/**
 * Color configuration for different link colors
 */
const colorConfigs = {
  primary: '#54A0FF',
  secondary: '#B8B8C0',
  accent: '#2E86DE',
  muted: '#8E8E93',
  inverse: '#000000',
  error: '#FF6B6B',
  warning: '#FFD93D',
  success: '#6BCF7F',
};

/**
 * Visited color configuration
 */
const visitedColorConfigs = {
  primary: '#A29BFE',
  secondary: '#9B9B9B',
  accent: '#6C5CE7',
  muted: '#74747A',
  inverse: '#333333',
  error: '#E55353',
  warning: '#E6C84A',
  success: '#5BB970',
};

/**
 * Link Component
 * 
 * A foundational link component that provides interactive text with hover effects,
 * decoration options, and Corp Astro design system integration.
 * 
 * @param props - Link component props
 * @param ref - Forward ref for imperative methods
 * @returns JSX.Element
 */
export const Link = forwardRef<LinkRef, LinkProps>(({
  children,
  variant = 'default',
  size = 'medium',
  weight = 'medium',
  align = 'left',
  color = 'primary',
  animation = 'glow',
  decoration = 'hover',
  onPress,
  onLongPress,
  onPressIn,
  onPressOut,
  disabled = false,
  loading = false,
  external = false,
  visited = false,
  textTransform = 'none',
  customLetterSpacing,
  uppercase = false,
  lowercase = false,
  capitalize = false,
  truncate = false,
  numberOfLines,
  selectable = false,
  adjustsFontSizeToFit = false,
  minimumFontScale = 0.5,
  style,
  textShadow,
  enableGlow = true,
  glowColor = '#54A0FF',
  glowIntensity = 0.5,
  animationDuration = 300,
  animationDelay = 0,
  animationLoop = false,
  testID,
  ...accessibilityProps
}, ref) => {
  const textRef = useRef<Text>(null);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const opacityValue = useRef(new Animated.Value(1)).current;
  const glowValue = useRef(new Animated.Value(0)).current;
  
  // State
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Get configuration based on size
  const config = sizeConfigs[size];
  const weightConfig = weightConfigs[weight];
  const colorConfig = visited ? visitedColorConfigs[color] : colorConfigs[color];

  // Imperative methods
  useImperativeHandle(ref, () => ({
    focus: () => {
      // Focus implementation for accessibility
    },
    blur: () => {
      // Blur implementation for accessibility
    },
    animate: (toValue: number, duration = animationDuration) => {
      Animated.timing(animatedValue, {
        toValue,
        duration,
        useNativeDriver: true,
      }).start();
    },
    measure: () => {
      return new Promise((resolve) => {
        textRef.current?.measure((x, y, width, height) => {
          resolve({ x, y, width, height });
        });
      });
    },
  }));

  // Handle press in
  const handlePressIn = (event: GestureResponderEvent) => {
    if (disabled || loading) return;
    
    setIsPressed(true);
    
    // Scale animation
    Animated.timing(scaleValue, {
      toValue: 0.95,
      duration: 100,
      useNativeDriver: true,
    }).start();
    
    // Glow animation
    if (enableGlow && animation === 'glow') {
      Animated.timing(glowValue, {
        toValue: 1,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
    
    onPressIn?.(event);
  };

  // Handle press out
  const handlePressOut = (event: GestureResponderEvent) => {
    if (disabled || loading) return;
    
    setIsPressed(false);
    
    // Scale animation
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    
    // Glow animation
    if (enableGlow && animation === 'glow') {
      Animated.timing(glowValue, {
        toValue: isHovered ? 0.8 : 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
    
    onPressOut?.(event);
  };

  // Handle hover (web)
  const handleHoverIn = () => {
    if (disabled || loading) return;
    
    setIsHovered(true);
    
    // Glow animation
    if (enableGlow && animation === 'glow') {
      Animated.timing(glowValue, {
        toValue: 0.8,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleHoverOut = () => {
    if (disabled || loading) return;
    
    setIsHovered(false);
    
    // Glow animation
    if (enableGlow && animation === 'glow' && !isPressed) {
      Animated.timing(glowValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  // Start animation on mount if enabled
  React.useEffect(() => {
    if (animation !== 'none' && !disabled) {
      const delay = animationDelay;
      const duration = animationDuration;
      
      const runAnimation = () => {
        switch (animation) {
          case 'fade':
            Animated.sequence([
              Animated.timing(opacityValue, {
                toValue: 0,
                duration: duration / 2,
                useNativeDriver: true,
              }),
              Animated.timing(opacityValue, {
                toValue: 1,
                duration: duration / 2,
                useNativeDriver: true,
              }),
            ]).start(animationLoop ? runAnimation : undefined);
            break;
          case 'scale':
            Animated.sequence([
              Animated.timing(scaleValue, {
                toValue: 1.05,
                duration: duration / 2,
                useNativeDriver: true,
              }),
              Animated.timing(scaleValue, {
                toValue: 1,
                duration: duration / 2,
                useNativeDriver: true,
              }),
            ]).start(animationLoop ? runAnimation : undefined);
            break;
          case 'shimmer':
            Animated.sequence([
              Animated.timing(animatedValue, {
                toValue: 1,
                duration: duration,
                useNativeDriver: true,
              }),
              Animated.timing(animatedValue, {
                toValue: 0,
                duration: duration,
                useNativeDriver: true,
              }),
            ]).start(animationLoop ? runAnimation : undefined);
            break;
          default:
            break;
        }
      };
      
      if (delay > 0) {
        setTimeout(runAnimation, delay);
      } else {
        runAnimation();
      }
    }
  }, [animation, animationDuration, animationDelay, animationLoop, disabled]);

  // Calculate text transform
  const getTextTransform = () => {
    if (uppercase) return 'uppercase';
    if (lowercase) return 'lowercase';
    if (capitalize) return 'capitalize';
    return textTransform;
  };

  // Calculate letter spacing
  const getLetterSpacing = () => {
    if (customLetterSpacing !== undefined) return customLetterSpacing;
    
    // Default letter spacing based on size
    switch (size) {
      case 'small':
        return 0.2;
      case 'medium':
        return 0.3;
      case 'large':
        return 0.4;
      default:
        return 0.3;
    }
  };

  // Calculate text decoration
  const getTextDecoration = () => {
    switch (decoration) {
      case 'always':
        return 'underline';
      case 'hover':
        return isHovered ? 'underline' : 'none';
      case 'underline':
        return 'underline';
      case 'none':
      default:
        return 'none';
    }
  };

  // Base container styles
  const containerStyle: ViewStyle = {
    alignSelf: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start',
    minHeight: config.minHeight,
    justifyContent: 'center',
    alignItems: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start',
    opacity: disabled ? 0.4 : 1,
  };

  // Base text styles
  const textStyle: TextStyle = {
    fontFamily: 'Inter',
    fontSize: config.fontSize,
    lineHeight: config.lineHeight,
    fontWeight: weightConfig,
    color: colorConfig,
    textAlign: align,
    textTransform: getTextTransform(),
    letterSpacing: getLetterSpacing(),
    textDecorationLine: getTextDecoration(),
    textDecorationColor: colorConfig,
    includeFontPadding: false,
    textAlignVertical: 'center',
    ...(textShadow && {
      textShadowColor: textShadow.color || 'rgba(0, 0, 0, 0.3)',
      textShadowOffset: textShadow.offset || { width: 0, height: 1 },
      textShadowRadius: textShadow.radius || 2,
    }),
  };

  // Animation styles
  const animationStyle: ViewStyle = {
    transform: [
      { scale: scaleValue },
      ...(animation === 'slide' ? [{
        translateX: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 10],
        }),
      }] : []),
    ],
    opacity: opacityValue,
  };

  // Glow styles
  const glowStyle: ViewStyle = enableGlow && animation === 'glow' ? {
    shadowColor: glowColor,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: glowValue,
    shadowRadius: 10 * glowIntensity,
    elevation: 0,
  } : {};

  // Variant-specific styles
  const variantStyle: ViewStyle = (() => {
    switch (variant) {
      case 'button':
        return {
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderRadius: 8,
          backgroundColor: isPressed ? 'rgba(84, 160, 255, 0.1)' : 'transparent',
        };
      case 'nav':
        return {
          paddingHorizontal: 16,
          paddingVertical: 12,
        };
      case 'inline':
        return {
          paddingHorizontal: 0,
          paddingVertical: 0,
        };
      case 'external':
        return {
          paddingHorizontal: 4,
          paddingVertical: 2,
        };
      case 'default':
      default:
        return {
          paddingHorizontal: 4,
          paddingVertical: 4,
        };
    }
  })();

  // Combine all styles
  const finalContainerStyle = [
    containerStyle,
    animationStyle,
    glowStyle,
    variantStyle,
  ];

  const finalTextStyle = [
    textStyle,
    style,
  ];

  return (
    <TouchableOpacity
      accessible={true}
      accessibilityRole="link"
      accessibilityState={{ disabled, busy: loading }}
      accessibilityLabel={external ? `${children} (external link)` : children}
      testID={testID}
      style={finalContainerStyle}
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
      <Animated.Text
        ref={textRef}
        style={finalTextStyle}
        numberOfLines={truncate ? (numberOfLines || 1) : numberOfLines}
        ellipsizeMode={truncate ? 'tail' : undefined}
        selectable={selectable}
        adjustsFontSizeToFit={adjustsFontSizeToFit}
        minimumFontScale={minimumFontScale}
      >
        {loading ? 'Loading...' : children}
        {external && !loading && ' ↗'}
      </Animated.Text>
    </TouchableOpacity>
  );
});

// Set display name for debugging
Link.displayName = 'Link';

/**
 * Default export
 */
export default Link;
