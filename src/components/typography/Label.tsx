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
 * Label size variants
 */
export type LabelSize = 'small' | 'medium' | 'large';

/**
 * Label weight variants
 */
export type LabelWeight = 'light' | 'regular' | 'medium' | 'semibold' | 'bold';

/**
 * Label alignment options
 */
export type LabelAlign = 'left' | 'center' | 'right' | 'justify';

/**
 * Label color variants
 */
export type LabelColor = 'primary' | 'secondary' | 'accent' | 'muted' | 'inverse' | 'error' | 'warning' | 'success';

/**
 * Label animation types
 */
export type LabelAnimation = 'none' | 'fade' | 'slide' | 'scale' | 'glow' | 'shimmer';

/**
 * Label variant types
 */
export type LabelVariant = 'default' | 'floating' | 'inline' | 'required' | 'optional';

/**
 * Label component props
 */
export interface LabelProps extends Omit<TextProps, 'style'> {
  /** Label text content */
  children: React.ReactNode;
  /** Label variant */
  variant?: LabelVariant;
  /** Size variant */
  size?: LabelSize;
  /** Font weight */
  weight?: LabelWeight;
  /** Text alignment */
  align?: LabelAlign;
  /** Color variant */
  color?: LabelColor;
  /** Animation type */
  animation?: LabelAnimation;
  /** Whether the label is animated */
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
  /** Whether the field is required */
  required?: boolean;
  /** Whether the field is optional */
  optional?: boolean;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Whether the field has an error */
  error?: boolean;
  /** Whether the field has a warning */
  warning?: boolean;
  /** Whether the field is focused */
  focused?: boolean;
  /** Custom required indicator */
  requiredIndicator?: string;
  /** Custom optional indicator */
  optionalIndicator?: string;
  /** Bottom margin spacing */
  marginBottom?: number;
  /** Test ID for testing */
  testID?: string;
}

/**
 * Label component ref
 */
export interface LabelRef {
  /** Focus the label */
  focus: () => void;
  /** Blur the label */
  blur: () => void;
  /** Animate the label */
  animate: (toValue: number, duration?: number) => void;
  /** Measure the label */
  measure: () => Promise<{
    width: number;
    height: number;
    x: number;
    y: number;
  }>;
}

/**
 * Variant configuration for different label variants
 */
const variantConfigs = {
  default: {
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0,
    fontWeight: '500' as const,
    marginBottom: 8,
  },
  floating: {
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.5,
    fontWeight: '500' as const,
    marginBottom: 4,
  },
  inline: {
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0,
    fontWeight: '500' as const,
    marginBottom: 0,
  },
  required: {
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0,
    fontWeight: '600' as const,
    marginBottom: 8,
  },
  optional: {
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0,
    fontWeight: '400' as const,
    marginBottom: 8,
  },
};

/**
 * Size configuration for different label sizes
 */
const sizeConfigs = {
  small: {
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  medium: {
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0,
  },
  large: {
    fontSize: 16,
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
 * Color configuration for different label colors
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
 * State-based color modifications
 */
const getStateColor = (
  baseColor: string,
  disabled: boolean,
  error: boolean,
  warning: boolean,
  focused: boolean
): string => {
  if (disabled) return '#6C757D';
  if (error) return '#DC3545';
  if (warning) return '#FFC107';
  if (focused) return '#2E86DE';
  return baseColor;
};

/**
 * Corp Astro Label Component
 * 
 * A foundational label component for form fields and UI elements
 * with proper spacing, semantic meaning, and Corp Astro design system integration.
 * 
 * Features:
 * - Multiple label variants (default, floating, inline, required, optional)
 * - Inter font family (fallback to system fonts)
 * - Size variants (small, medium, large)
 * - Weight variants (light, regular, medium, semibold, bold)
 * - Color variants with Corp Astro theme
 * - Animation support (fade, slide, scale, glow, shimmer)
 * - Text transformations and truncation
 * - Accessibility integration
 * - State management (disabled, error, warning, focused)
 * - Required/optional indicators
 * - Custom styling options
 * - Proper form field spacing
 * 
 * @param props - Label component props
 * @param ref - Forward ref for imperative methods
 * @returns JSX.Element
 */
const Label = forwardRef<LabelRef, LabelProps>(({
  children,
  variant = 'default',
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
  selectable = false,
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
  required = false,
  optional = false,
  disabled = false,
  error = false,
  warning = false,
  focused = false,
  requiredIndicator = ' *',
  optionalIndicator = ' (optional)',
  marginBottom,
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
      
      // Add required/optional indicators
      if (required && !optional) {
        text = `${text}${requiredIndicator}`;
      } else if (optional && !required) {
        text = `${text}${optionalIndicator}`;
      }
      
      return text;
    }

    return children;
  }, [children, uppercase, lowercase, capitalize, required, optional, requiredIndicator, optionalIndicator]);

  // Determine final color based on state
  const baseColor = customColor || colorConfigs[color];
  const finalColor = getStateColor(baseColor, disabled, error, warning, focused);

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
    fontWeight: weight ? weightConfigs[weight] : (config as any).fontWeight || weightConfigs.medium,
    color: finalColor,
    textAlign: align,
    marginBottom: marginBottom !== undefined ? marginBottom : (variant && !size ? (variantConfigs[variant] as any).marginBottom : 8),
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

  // Apply variant-specific styles
  if (variant === 'floating') {
    baseStyle.transform = [{ translateY: focused ? -2 : 0 }];
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
                outputRange: [8, 0],
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
        accessibilityLabel={typeof processedChildren === 'string' ? processedChildren : undefined}
        accessibilityHint={
          required ? 'Required field' : 
          optional ? 'Optional field' : 
          undefined
        }
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
      accessibilityHint={
        required ? 'Required field' : 
        optional ? 'Optional field' : 
        undefined
      }
      {...props}
    >
      {processedChildren}
    </Text>
  );
});

Label.displayName = 'Label';

export default Label;
