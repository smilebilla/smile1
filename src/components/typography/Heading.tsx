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
 * Heading level variants (H1-H6)
 */
export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

/**
 * Heading size variants
 */
export type HeadingSize = 'small' | 'medium' | 'large' | 'xlarge';

/**
 * Heading weight variants
 */
export type HeadingWeight = 'light' | 'regular' | 'medium' | 'semibold' | 'bold';

/**
 * Heading alignment options
 */
export type HeadingAlign = 'left' | 'center' | 'right' | 'justify';

/**
 * Heading color variants
 */
export type HeadingColor = 'primary' | 'secondary' | 'accent' | 'muted' | 'inverse' | 'error' | 'warning' | 'success';

/**
 * Heading animation types
 */
export type HeadingAnimation = 'none' | 'fade' | 'slide' | 'scale' | 'glow' | 'shimmer';

/**
 * Heading component props
 */
export interface HeadingProps extends Omit<TextProps, 'style'> {
  /** Text content */
  children: React.ReactNode;
  /** Heading level (H1-H6) */
  level?: HeadingLevel;
  /** Size variant */
  size?: HeadingSize;
  /** Font weight */
  weight?: HeadingWeight;
  /** Text alignment */
  align?: HeadingAlign;
  /** Color variant */
  color?: HeadingColor;
  /** Animation type */
  animation?: HeadingAnimation;
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
  /** Test ID for testing */
  testID?: string;
}

/**
 * Heading component ref
 */
export interface HeadingRef {
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
 * Level configuration for different heading levels (H1-H6)
 */
const levelConfigs = {
  h1: {
    fontSize: 48,
    lineHeight: 56,
    letterSpacing: -1.2,
    fontWeight: '700' as const,
    marginBottom: 24,
  },
  h2: {
    fontSize: 38,
    lineHeight: 44,
    letterSpacing: -0.8,
    fontWeight: '600' as const,
    marginBottom: 20,
  },
  h3: {
    fontSize: 32,
    lineHeight: 36,
    letterSpacing: -0.6,
    fontWeight: '600' as const,
    marginBottom: 16,
  },
  h4: {
    fontSize: 28,
    lineHeight: 32,
    letterSpacing: -0.4,
    fontWeight: '500' as const,
    marginBottom: 12,
  },
  h5: {
    fontSize: 24,
    lineHeight: 28,
    letterSpacing: -0.2,
    fontWeight: '500' as const,
    marginBottom: 8,
  },
  h6: {
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: 0,
    fontWeight: '500' as const,
    marginBottom: 4,
  },
};

/**
 * Size configuration for different heading sizes
 */
const sizeConfigs = {
  small: {
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: 0,
  },
  medium: {
    fontSize: 28,
    lineHeight: 32,
    letterSpacing: -0.4,
  },
  large: {
    fontSize: 38,
    lineHeight: 44,
    letterSpacing: -0.8,
  },
  xlarge: {
    fontSize: 48,
    lineHeight: 56,
    letterSpacing: -1.2,
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
 * Corp Astro Heading Component
 * 
 * A foundational heading component that provides structured text hierarchy
 * with Futura PT font, H1-H6 levels, and Corp Astro design system integration.
 * 
 * Features:
 * - H1-H6 semantic heading levels
 * - Futura PT font family (fallback to system fonts)
 * - Size variants (small, medium, large, xlarge)
 * - Weight variants (light, regular, medium, semibold, bold)
 * - Color variants with Corp Astro theme
 * - Animation support (fade, slide, scale, glow, shimmer)
 * - Text transformations and truncation
 * - Accessibility integration
 * - Custom styling options
 * 
 * @param props - Heading component props
 * @param ref - Forward ref for imperative methods
 * @returns JSX.Element
 */
const Heading = forwardRef<HeadingRef, HeadingProps>(({
  children,
  level = 'h1',
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
  glowIntensity = 0.5,
  animationDuration = 1000,
  animationDelay = 0,
  animationLoop = false,
  testID,
  ...props
}, ref) => {
  const textRef = useRef<Text>(null);
  const animatedValue = useRef(new Animated.Value(0)).current;

  // Get configuration based on level or size
  const config = size ? sizeConfigs[size] : levelConfigs[level];

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
      ios: 'Futura PT',
      android: 'sans-serif-medium',
      default: 'system-ui',
    }),
    fontSize: customSize || config.fontSize,
    lineHeight: customLineHeight || config.lineHeight,
    letterSpacing: customLetterSpacing || config.letterSpacing,
    fontWeight: weight ? weightConfigs[weight] : (config as any).fontWeight || weightConfigs.regular,
    color: customColor || colorConfigs[color],
    textAlign: align,
    marginBottom: level && !size ? (levelConfigs[level] as any).marginBottom : 0,
  };

  // Apply text shadow
  if (textShadow) {
    baseStyle.textShadowColor = textShadow.color || 'rgba(0, 0, 0, 0.3)';
    baseStyle.textShadowOffset = textShadow.offset || { width: 0, height: 2 };
    baseStyle.textShadowRadius = textShadow.radius || 4;
  }

  // Apply glow effect through text shadow
  if (enableGlow) {
    baseStyle.textShadowColor = glowColor;
    baseStyle.textShadowOffset = { width: 0, height: 0 };
    baseStyle.textShadowRadius = 8 * glowIntensity;
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
                outputRange: [20, 0],
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
                outputRange: [0.8, 1],
              }),
            },
          ],
          opacity: animatedValue,
        };
      case 'glow':
        return {
          opacity: animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0.7, 1, 0.7],
          }),
        };
      case 'shimmer':
        return {
          opacity: animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0.8, 1, 0.8],
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
        accessibilityRole="header"
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
      accessibilityRole="header"
      {...props}
    >
      {processedChildren}
    </Text>
  );
});

Heading.displayName = 'Heading';

export default Heading;
