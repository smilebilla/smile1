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
 * Body text size variants
 */
export type BodyTextSize = 'small' | 'medium' | 'large' | 'xlarge';

/**
 * Body text weight variants
 */
export type BodyTextWeight = 'light' | 'regular' | 'medium' | 'semibold' | 'bold';

/**
 * Body text alignment options
 */
export type BodyTextAlign = 'left' | 'center' | 'right' | 'justify';

/**
 * Body text color variants
 */
export type BodyTextColor = 'primary' | 'secondary' | 'accent' | 'muted' | 'inverse' | 'error' | 'warning' | 'success';

/**
 * Body text animation types
 */
export type BodyTextAnimation = 'none' | 'fade' | 'slide' | 'scale' | 'glow' | 'shimmer';

/**
 * Body text variant types
 */
export type BodyTextVariant = 'body1' | 'body2' | 'paragraph' | 'caption' | 'overline';

/**
 * Body text component props
 */
export interface BodyTextProps extends Omit<TextProps, 'style'> {
  /** Text content */
  children: React.ReactNode;
  /** Text variant */
  variant?: BodyTextVariant;
  /** Size variant */
  size?: BodyTextSize;
  /** Font weight */
  weight?: BodyTextWeight;
  /** Text alignment */
  align?: BodyTextAlign;
  /** Color variant */
  color?: BodyTextColor;
  /** Animation type */
  animation?: BodyTextAnimation;
  /** Whether the text is animated */
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
  /** Whether to enable first letter drop cap */
  dropCap?: boolean;
  /** Whether to enable text justification */
  justified?: boolean;
  /** Paragraph spacing */
  paragraphSpacing?: number;
  /** Test ID for testing */
  testID?: string;
}

/**
 * Body text component ref
 */
export interface BodyTextRef {
  /** Focus the text */
  focus: () => void;
  /** Blur the text */
  blur: () => void;
  /** Animate the text */
  animate: (toValue: number, duration?: number) => void;
  /** Measure the text */
  measure: () => Promise<{
    width: number;
    height: number;
    x: number;
    y: number;
  }>;
}

/**
 * Variant configuration for different body text variants
 */
const variantConfigs = {
  body1: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
    fontWeight: '400' as const,
    marginBottom: 16,
  },
  body2: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.25,
    fontWeight: '400' as const,
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 26,
    letterSpacing: 0,
    fontWeight: '400' as const,
    marginBottom: 16,
  },
  caption: {
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 0.5,
    fontWeight: '400' as const,
    marginBottom: 8,
  },
  overline: {
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 1,
    fontWeight: '500' as const,
    marginBottom: 4,
  },
};

/**
 * Size configuration for different body text sizes
 */
const sizeConfigs = {
  small: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.25,
  },
  medium: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
  },
  large: {
    fontSize: 18,
    lineHeight: 28,
    letterSpacing: 0,
  },
  xlarge: {
    fontSize: 20,
    lineHeight: 32,
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
 * Color configuration for different text colors
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
 * Corp Astro Body Text Component
 * 
 * A foundational body text component that provides readable text content
 * with Inter font, multiple variants, and Corp Astro design system integration.
 * 
 * Features:
 * - Multiple text variants (body1, body2, paragraph, caption, overline)
 * - Inter font family (fallback to system fonts)
 * - Size variants (small, medium, large, xlarge)
 * - Weight variants (light, regular, medium, semibold, bold)
 * - Color variants with Corp Astro theme
 * - Animation support (fade, slide, scale, glow, shimmer)
 * - Text transformations and truncation
 * - Accessibility integration
 * - Custom styling options
 * - Drop cap support for first letter
 * - Justified text alignment
 * - Paragraph spacing control
 * 
 * @param props - Body text component props
 * @param ref - Forward ref for imperative methods
 * @returns JSX.Element
 */
const BodyText = forwardRef<BodyTextRef, BodyTextProps>(({
  children,
  variant = 'body1',
  size,
  weight,
  align = 'left',
  color = 'primary',
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
  selectable = true,
  adjustsFontSizeToFit = false,
  minimumFontScale = 0.5,
  style,
  textShadow,
  enableGlow = false,
  glowColor = '#2E86DE',
  glowIntensity = 0.3,
  animationDuration = 1000,
  animationDelay = 0,
  animationLoop = false,
  dropCap = false,
  justified = false,
  paragraphSpacing = 0,
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
      if (uppercase) return children.toUpperCase();
      if (lowercase) return children.toLowerCase();
      if (capitalize) return children.charAt(0).toUpperCase() + children.slice(1);
    }
    return children;
  }, [children, uppercase, lowercase, capitalize]);

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
    textAlign: justified ? 'justify' : align,
    marginBottom: variant && !size ? (variantConfigs[variant] as any).marginBottom + paragraphSpacing : paragraphSpacing,
  };

  // Apply text shadow
  if (textShadow) {
    baseStyle.textShadowColor = textShadow.color || 'rgba(0, 0, 0, 0.2)';
    baseStyle.textShadowOffset = textShadow.offset || { width: 0, height: 1 };
    baseStyle.textShadowRadius = textShadow.radius || 2;
  }

  // Apply glow effect through text shadow
  if (enableGlow) {
    baseStyle.textShadowColor = glowColor;
    baseStyle.textShadowOffset = { width: 0, height: 0 };
    baseStyle.textShadowRadius = 6 * glowIntensity;
  }

  // Apply drop cap styling
  if (dropCap && typeof children === 'string') {
    // This is a simplified approach - in production you might want to use a more sophisticated drop cap solution
    baseStyle.textAlignVertical = 'top';
  }

  // Animation styles
  const getAnimationStyle = (): TextStyle => {
    switch (animation) {
      case 'fade':
        return {
          opacity: animatedValue,
        };
      case 'slide':
        return {
          transform: [
            {
              translateY: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [10, 0],
              }),
            },
          ],
          opacity: animatedValue,
        };
      case 'scale':
        return {
          transform: [
            {
              scale: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0.95, 1],
              }),
            },
          ],
          opacity: animatedValue,
        };
      case 'glow':
        return {
          opacity: animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0.8, 1, 0.8],
          }),
        };
      case 'shimmer':
        return {
          opacity: animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0.9, 1, 0.9],
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
      {...props}
    >
      {processedChildren}
    </Text>
  );
});

BodyText.displayName = 'BodyText';

export default BodyText;
