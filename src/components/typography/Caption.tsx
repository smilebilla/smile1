import React, { forwardRef, useRef, useEffect } from 'react';
import {
  Text,
  TextProps,
  StyleSheet,
  TextStyle,
  Animated,
  Platform,
} from 'react-native';

/**
 * Caption size variants
 */
export type CaptionSize = 'small' | 'medium' | 'large';

/**
 * Caption weight variants
 */
export type CaptionWeight = 'light' | 'regular' | 'medium' | 'semibold' | 'bold';

/**
 * Caption alignment options
 */
export type CaptionAlign = 'left' | 'center' | 'right' | 'justify';

/**
 * Caption color variants
 */
export type CaptionColor = 'primary' | 'secondary' | 'accent' | 'muted' | 'inverse' | 'error' | 'warning' | 'success';

/**
 * Caption animation types
 */
export type CaptionAnimation = 'none' | 'fade' | 'slide' | 'scale' | 'glow' | 'shimmer';

/**
 * Caption variant types
 */
export type CaptionVariant = 'default' | 'subtitle' | 'label' | 'helper' | 'timestamp' | 'metadata';

/**
 * Caption component props
 */
export interface CaptionProps extends Omit<TextProps, 'style'> {
  /** Caption text content */
  children: React.ReactNode;
  /** Caption variant */
  variant?: CaptionVariant;
  /** Size variant */
  size?: CaptionSize;
  /** Font weight */
  weight?: CaptionWeight;
  /** Text alignment */
  align?: CaptionAlign;
  /** Color variant */
  color?: CaptionColor;
  /** Animation type */
  animation?: CaptionAnimation;
  /** Whether the caption is animated */
  animated?: boolean;
  /** Custom text color */
  customColor?: string;
  /** Custom font size */
  customSize?: number;
  /** Custom line height */
  customLineHeight?: number;
  /** Custom letter spacing */
  customLetterSpacing?: number;
  /** Whether to use uppercase */
  uppercase?: boolean;
  /** Whether to use lowercase */
  lowercase?: boolean;
  /** Whether to use capitalize */
  capitalize?: boolean;
  /** Whether to truncate text */
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
  /** Whether the caption is muted */
  muted?: boolean;
  /** Whether to show with reduced opacity */
  dimmed?: boolean;
  /** Custom opacity value */
  opacity?: number;
  /** Bottom margin spacing */
  marginBottom?: number;
  /** Top margin spacing */
  marginTop?: number;
  /** Test ID for testing */
  testID?: string;
}

/**
 * Caption component ref
 */
export interface CaptionRef {
  /** Focus the caption */
  focus: () => void;
  /** Blur the caption */
  blur: () => void;
  /** Animate the caption */
  animate: (toValue: number, duration?: number) => void;
  /** Measure the caption */
  measure: () => Promise<{
    width: number;
    height: number;
    x: number;
    y: number;
  }>;
}

/**
 * Variant configuration for different caption variants
 */
const variantConfigs = {
  default: {
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0,
    fontWeight: '400' as const,
    marginBottom: 4,
    opacity: 0.8,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.25,
    fontWeight: '500' as const,
    marginBottom: 8,
    opacity: 0.9,
  },
  label: {
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.5,
    fontWeight: '500' as const,
    marginBottom: 4,
    opacity: 0.7,
  },
  helper: {
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.25,
    fontWeight: '400' as const,
    marginBottom: 4,
    opacity: 0.6,
  },
  timestamp: {
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 0.5,
    fontWeight: '400' as const,
    marginBottom: 2,
    opacity: 0.5,
  },
  metadata: {
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 0.75,
    fontWeight: '500' as const,
    marginBottom: 2,
    opacity: 0.6,
  },
};

/**
 * Size configuration for different caption sizes
 */
const sizeConfigs = {
  small: {
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 0.5,
  },
  medium: {
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0,
  },
  large: {
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: 0,
  },
};

/**
 * Weight configuration for different font weights
 */
const weightConfigs = {
  light: '300' as const,
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

/**
 * Color configuration for different caption colors
 */
const colorConfigs = {
  primary: '#FFFFFF',
  secondary: '#B8B8C0',
  accent: '#2E86DE',
  muted: '#6C757D',
  inverse: '#08080F',
  error: '#DC3545',
  warning: '#FFC107',
  success: '#28A745',
};

/**
 * Corp Astro Caption Component
 * 
 * A foundational caption component for small, secondary text content
 * with proper typography hierarchy and Corp Astro design system integration.
 * 
 * Features:
 * - Multiple caption variants (default, subtitle, label, helper, timestamp, metadata)
 * - Inter font family (fallback to system fonts)
 * - Size variants (small, medium, large)
 * - Weight variants (light, regular, medium, semibold, bold)
 * - Color variants with Corp Astro theme
 * - Animation support (fade, slide, scale, glow, shimmer)
 * - Text transformations and truncation
 * - Accessibility integration
 * - Opacity and dimming controls
 * - Custom styling options
 * - Proper spacing for secondary content
 * 
 * @param props - Caption component props
 * @param ref - Forward ref for imperative methods
 * @returns JSX.Element
 */
const Caption = forwardRef<CaptionRef, CaptionProps>(({
  children,
  variant = 'default',
  size,
  weight,
  align = 'left',
  color = 'muted',
  animation = 'none',
  animated = false,
  customColor,
  customSize,
  customLineHeight,
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
  enableGlow = false,
  glowColor = '#2E86DE',
  glowIntensity = 0.2,
  animationDuration = 1000,
  animationDelay = 0,
  animationLoop = false,
  muted = false,
  dimmed = false,
  opacity,
  marginBottom,
  marginTop,
  testID,
  ...props
}, ref) => {
  const textRef = useRef<Text>(null);
  const animatedValue = useRef(new Animated.Value(0)).current;

  // Get configuration based on variant or size
  const config = size ? sizeConfigs[size] : variantConfigs[variant];

  // Apply text transformations
  const processedChildren = React.useMemo(() => {
    if (typeof children === 'string') {
      let text = children;
      
      if (uppercase) text = text.toUpperCase();
      if (lowercase) text = text.toLowerCase();
      if (capitalize) text = text.charAt(0).toUpperCase() + text.slice(1);
      
      return text;
    }

    return children;
  }, [children, uppercase, lowercase, capitalize]);

  // Calculate final opacity
  const finalOpacity = opacity !== undefined ? opacity : 
    dimmed ? 0.4 : 
    muted ? 0.6 : 
    (variant && !size ? (variantConfigs[variant] as any).opacity : 0.8);

  // Create base style
  const baseStyle: TextStyle = {
    fontFamily: Platform.select({
      ios: 'Inter',
      android: 'sans-serif',
      default: 'system-ui',
    }),
    fontSize: customSize || config.fontSize,
    lineHeight: customLineHeight || config.lineHeight,
    letterSpacing: customLetterSpacing || config.letterSpacing,
    fontWeight: weight ? weightConfigs[weight] : (config as any).fontWeight || weightConfigs.regular,
    color: customColor || colorConfigs[color],
    textAlign: align,
    opacity: finalOpacity,
    marginBottom: marginBottom !== undefined ? marginBottom : (variant && !size ? (variantConfigs[variant] as any).marginBottom : 4),
    marginTop: marginTop || 0,
  };

  // Apply text shadow
  if (textShadow) {
    baseStyle.textShadowColor = textShadow.color || 'rgba(0, 0, 0, 0.2)';
    baseStyle.textShadowOffset = textShadow.offset || { width: 0, height: 1 };
    baseStyle.textShadowRadius = textShadow.radius || 1;
  }

  // Apply glow effect through text shadow
  if (enableGlow) {
    baseStyle.textShadowColor = glowColor;
    baseStyle.textShadowOffset = { width: 0, height: 0 };
    baseStyle.textShadowRadius = 4 * glowIntensity;
  }

  // Animation styles
  const getAnimationStyle = (): TextStyle => {
    switch (animation) {
      case 'fade':
        return {
          opacity: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, finalOpacity],
          }),
        };
      case 'slide':
        return {
          transform: [
            {
              translateY: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [4, 0],
              }),
            },
          ],
          opacity: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, finalOpacity],
          }),
        };
      case 'scale':
        return {
          transform: [
            {
              scale: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0.98, 1],
              }),
            },
          ],
          opacity: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, finalOpacity],
          }),
        };
      case 'glow':
        return {
          opacity: animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [finalOpacity * 0.7, finalOpacity, finalOpacity * 0.7],
          }),
        };
      case 'shimmer':
        return {
          opacity: animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [finalOpacity * 0.8, finalOpacity, finalOpacity * 0.8],
          }),
        };
      default:
        return {};
    }
  };

  // Start animation
  useEffect(() => {
    if (animated && animation !== 'none') {
      const startAnimation = () => {
        animatedValue.setValue(0);
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: animationDuration,
          delay: animationDelay,
          useNativeDriver: true,
        }).start(() => {
          if (animationLoop) {
            startAnimation();
          }
        });
      };

      startAnimation();
    }
  }, [animated, animation, animationDuration, animationDelay, animationLoop, animatedValue]);

  // Imperative methods
  React.useImperativeHandle(ref, () => ({
    focus: () => {
      textRef.current?.focus();
    },
    blur: () => {
      textRef.current?.blur();
    },
    animate: (toValue: number, duration = 300) => {
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

  // Render animated or static text
  if (animated && animation !== 'none') {
    return (
      <Animated.Text
        ref={textRef}
        style={[baseStyle, getAnimationStyle(), style]}
        numberOfLines={truncate ? 1 : numberOfLines}
        ellipsizeMode={truncate ? 'tail' : 'tail'}
        selectable={selectable}
        adjustsFontSizeToFit={adjustsFontSizeToFit}
        minimumFontScale={minimumFontScale}
        testID={testID}
        accessible={true}
        accessibilityRole="text"
        accessibilityLabel={typeof processedChildren === 'string' ? processedChildren : undefined}
        accessibilityHint={`Caption text${variant !== 'default' ? ` in ${variant} style` : ''}`}
        {...props}
      >
        {processedChildren}
      </Animated.Text>
    );
  }

  return (
    <Text
      ref={textRef}
      style={[baseStyle, style]}
      numberOfLines={truncate ? 1 : numberOfLines}
      ellipsizeMode={truncate ? 'tail' : 'tail'}
      selectable={selectable}
      adjustsFontSizeToFit={adjustsFontSizeToFit}
      minimumFontScale={minimumFontScale}
      testID={testID}
      accessible={true}
      accessibilityRole="text"
      accessibilityLabel={typeof processedChildren === 'string' ? processedChildren : undefined}
      accessibilityHint={`Caption text${variant !== 'default' ? ` in ${variant} style` : ''}`}
      {...props}
    >
      {processedChildren}
    </Text>
  );
});

Caption.displayName = 'Caption';

export default Caption;
