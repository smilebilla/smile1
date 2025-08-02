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
 * Code size variants
 */
export type CodeSize = 'small' | 'medium' | 'large';

/**
 * Code weight variants
 */
export type CodeWeight = 'regular' | 'medium' | 'semibold';

/**
 * Code alignment options
 */
export type CodeAlign = 'left' | 'center' | 'right';

/**
 * Code color variants
 */
export type CodeColor = 'primary' | 'secondary' | 'accent' | 'muted' | 'inverse' | 'error' | 'warning' | 'success' | 'syntax';

/**
 * Code animation types
 */
export type CodeAnimation = 'none' | 'fade' | 'slide' | 'scale' | 'glow' | 'type';

/**
 * Code variant types
 */
export type CodeVariant = 'inline' | 'block' | 'snippet' | 'command' | 'output' | 'highlight';

/**
 * Code syntax highlighting themes
 */
export type CodeTheme = 'dark' | 'light' | 'monokai' | 'solarized' | 'dracula' | 'github';

/**
 * Code component props
 */
export interface CodeProps extends Omit<TextProps, 'style'> {
  /** Code text content */
  children: React.ReactNode;
  /** Code variant */
  variant?: CodeVariant;
  /** Size variant */
  size?: CodeSize;
  /** Font weight */
  weight?: CodeWeight;
  /** Text alignment */
  align?: CodeAlign;
  /** Color variant */
  color?: CodeColor;
  /** Animation type */
  animation?: CodeAnimation;
  /** Whether the code is animated */
  animated?: boolean;
  /** Syntax highlighting theme */
  theme?: CodeTheme;
  /** Programming language for syntax highlighting */
  language?: string;
  /** Custom text color */
  customColor?: string;
  /** Custom font size */
  customSize?: number;
  /** Custom line height */
  customLineHeight?: number;
  /** Custom letter spacing */
  customLetterSpacing?: number;
  /** Whether to use lowercase */
  lowercase?: boolean;
  /** Whether to use uppercase */
  uppercase?: boolean;
  /** Whether to truncate text */
  truncate?: boolean;
  /** Number of lines to show */
  numberOfLines?: number;
  /** Whether text is selectable */
  selectable?: boolean;
  /** Whether to adjust font size to fit */
  adjustsFontSizeToFit?: boolean;
  /** Minimum font scale */
  minimumFontScale?: number;
  /** Custom style */
  style?: TextStyle;
  /** Text shadow configuration */
  textShadow?: {
    color?: string;
    offset?: { width: number; height: number };
    radius?: number;
  };
  /** Enable glow effect */
  enableGlow?: boolean;
  /** Glow color */
  glowColor?: string;
  /** Glow intensity */
  glowIntensity?: number;
  /** Animation duration */
  animationDuration?: number;
  /** Animation delay */
  animationDelay?: number;
  /** Animation loop */
  animationLoop?: boolean;
  /** Whether to show line numbers */
  showLineNumbers?: boolean;
  /** Whether to wrap lines */
  wrapLines?: boolean;
  /** Custom background color */
  backgroundColor?: string;
  /** Custom border color */
  borderColor?: string;
  /** Custom border width */
  borderWidth?: number;
  /** Custom border radius */
  borderRadius?: number;
  /** Custom padding */
  padding?: number;
  /** Custom margin */
  margin?: number;
  /** Test ID for testing */
  testID?: string;
}

/**
 * Code component ref
 */
export interface CodeRef {
  /** Focus the code */
  focus: () => void;
  /** Blur the code */
  blur: () => void;
  /** Animate the code */
  animate: (toValue: number, duration?: number) => void;
  /** Measure the code */
  measure: () => Promise<{
    width: number;
    height: number;
    x: number;
    y: number;
  }>;
}

/**
 * Variant configuration for different code variants
 */
const variantConfigs = {
  inline: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
    fontWeight: '400' as const,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 4,
    padding: 2,
    margin: 0,
  },
  block: {
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0,
    fontWeight: '400' as const,
    backgroundColor: 'rgba(22, 33, 62, 0.3)',
    borderRadius: 8,
    padding: 16,
    margin: 8,
  },
  snippet: {
    fontSize: 13,
    lineHeight: 20,
    letterSpacing: 0,
    fontWeight: '400' as const,
    backgroundColor: 'rgba(22, 33, 62, 0.2)',
    borderRadius: 6,
    padding: 12,
    margin: 4,
  },
  command: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
    fontWeight: '500' as const,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 6,
    padding: 12,
    margin: 4,
  },
  output: {
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0,
    fontWeight: '400' as const,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 4,
    padding: 8,
    margin: 4,
  },
  highlight: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
    fontWeight: '500' as const,
    backgroundColor: 'rgba(46, 134, 222, 0.1)',
    borderRadius: 4,
    padding: 4,
    margin: 0,
  },
};

/**
 * Size configuration for different code sizes
 */
const sizeConfigs = {
  small: {
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0,
  },
  medium: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
  },
  large: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
  },
};

/**
 * Weight configuration for different font weights
 */
const weightConfigs = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
};

/**
 * Color configuration for different code colors
 */
const colorConfigs = {
  primary: '#E1E5E9',
  secondary: '#B8B8C0',
  accent: '#2E86DE',
  muted: '#6C757D',
  inverse: '#08080F',
  error: '#FF6B6B',
  warning: '#FFD43B',
  success: '#51CF66',
  syntax: '#A29BFE',
};

/**
 * Theme configuration for syntax highlighting
 */
const themeConfigs = {
  dark: {
    background: 'rgba(22, 33, 62, 0.3)',
    text: '#E1E5E9',
    comment: '#6C757D',
    keyword: '#2E86DE',
    string: '#51CF66',
    number: '#FFD43B',
    function: '#A29BFE',
    operator: '#FF6B6B',
    border: 'rgba(255, 255, 255, 0.1)',
  },
  light: {
    background: 'rgba(255, 255, 255, 0.95)',
    text: '#1A1A2E',
    comment: '#6C757D',
    keyword: '#2E86DE',
    string: '#28A745',
    number: '#E67E22',
    function: '#8E44AD',
    operator: '#E74C3C',
    border: 'rgba(0, 0, 0, 0.1)',
  },
  monokai: {
    background: 'rgba(39, 40, 34, 0.95)',
    text: '#F8F8F2',
    comment: '#75715E',
    keyword: '#F92672',
    string: '#E6DB74',
    number: '#AE81FF',
    function: '#66D9EF',
    operator: '#F92672',
    border: 'rgba(255, 255, 255, 0.1)',
  },
  solarized: {
    background: 'rgba(0, 43, 54, 0.95)',
    text: '#93A1A1',
    comment: '#586E75',
    keyword: '#268BD2',
    string: '#2AA198',
    number: '#D33682',
    function: '#B58900',
    operator: '#DC322F',
    border: 'rgba(147, 161, 161, 0.2)',
  },
  dracula: {
    background: 'rgba(40, 42, 54, 0.95)',
    text: '#F8F8F2',
    comment: '#6272A4',
    keyword: '#FF79C6',
    string: '#F1FA8C',
    number: '#BD93F9',
    function: '#50FA7B',
    operator: '#FF6E6E',
    border: 'rgba(255, 255, 255, 0.1)',
  },
  github: {
    background: 'rgba(246, 248, 250, 0.95)',
    text: '#24292E',
    comment: '#6A737D',
    keyword: '#D73A49',
    string: '#032F62',
    number: '#005CC5',
    function: '#6F42C1',
    operator: '#D73A49',
    border: 'rgba(27, 31, 35, 0.15)',
  },
};

/**
 * Corp Astro Code Component
 * 
 * A foundational code component for displaying code snippets and technical text
 * with monospace font, syntax highlighting, and Corp Astro design system integration.
 * 
 * Features:
 * - Multiple code variants (inline, block, snippet, command, output, highlight)
 * - Monospace font family with fallbacks
 * - Size variants (small, medium, large)
 * - Weight variants (regular, medium, semibold)
 * - Color variants including syntax highlighting
 * - Theme support (dark, light, monokai, solarized, dracula, github)
 * - Animation support (fade, slide, scale, glow, type)
 * - Accessibility compliance
 * - Custom styling options
 * - Text transformation options
 * - Glow effects and shadows
 * - Selectable text
 * - Responsive design
 * 
 * @param props - Code component props
 * @returns JSX.Element
 */
const Code = forwardRef<CodeRef, CodeProps>(({
  children,
  variant = 'inline',
  size,
  weight,
  align = 'left',
  color = 'primary',
  animation = 'none',
  animated = false,
  theme = 'dark',
  language,
  customColor,
  customSize,
  customLineHeight,
  customLetterSpacing,
  lowercase = false,
  uppercase = false,
  truncate = false,
  numberOfLines,
  selectable = true,
  adjustsFontSizeToFit = false,
  minimumFontScale = 0.8,
  style,
  textShadow,
  enableGlow = false,
  glowColor = '#2E86DE',
  glowIntensity = 0.3,
  animationDuration = 1000,
  animationDelay = 0,
  animationLoop = false,
  showLineNumbers = false,
  wrapLines = false,
  backgroundColor,
  borderColor,
  borderWidth,
  borderRadius,
  padding,
  margin,
  testID,
  ...props
}, ref) => {
  const textRef = useRef<Text>(null);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const typeAnimatedValue = useRef(new Animated.Value(0)).current;

  // Get configuration based on variant or size
  const config = size ? sizeConfigs[size] : variantConfigs[variant];
  const themeConfig = themeConfigs[theme];

  // Apply text transformations
  const processedChildren = React.useMemo(() => {
    if (typeof children === 'string') {
      let text = children;
      
      if (uppercase) text = text.toUpperCase();
      if (lowercase) text = text.toLowerCase();
      
      return text;
    }

    return children;
  }, [children, uppercase, lowercase]);

  // Create base style
  const baseStyle: TextStyle = {
    fontFamily: Platform.select({
      ios: 'Menlo',
      android: 'monospace',
      default: 'monospace',
    }),
    fontSize: customSize || config.fontSize,
    lineHeight: customLineHeight || config.lineHeight,
    letterSpacing: customLetterSpacing || config.letterSpacing,
    fontWeight: weight ? weightConfigs[weight] : (config as any).fontWeight || weightConfigs.regular,
    color: customColor || themeConfig.text || colorConfigs[color],
    textAlign: align,
    backgroundColor: backgroundColor || (variant !== 'inline' ? themeConfig.background : 'transparent'),
    borderRadius: borderRadius || (config as any).borderRadius || 0,
    paddingHorizontal: padding || (config as any).padding || 0,
    paddingVertical: padding || (config as any).padding * 0.5 || 0,
    marginHorizontal: margin || (config as any).margin || 0,
    marginVertical: margin || (config as any).margin * 0.5 || 0,
    borderWidth: borderWidth || (variant !== 'inline' ? 1 : 0),
    borderColor: borderColor || themeConfig.border || 'transparent',
    overflow: wrapLines ? 'visible' : 'hidden',
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
    baseStyle.textShadowRadius = 4 * glowIntensity;
  }

  // Animation styles
  const getAnimationStyle = (): TextStyle => {
    switch (animation) {
      case 'fade':
        return {
          opacity: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          }),
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
          opacity: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          }),
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
          opacity: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          }),
        };
      case 'glow':
        return {
          textShadowColor: glowColor,
          textShadowOffset: { width: 0, height: 0 },
          textShadowRadius: 4 * glowIntensity,
        };
      case 'type':
        return {
          opacity: 1,
        };
      default:
        return {};
    }
  };

  // Setup animations
  useEffect(() => {
    if (animated && animation !== 'none') {
      const startAnimation = () => {
        if (animation === 'type') {
          // Type animation simulates typing effect
          Animated.timing(typeAnimatedValue, {
            toValue: 1,
            duration: animationDuration,
            delay: animationDelay,
            useNativeDriver: false,
          }).start(() => {
            if (animationLoop) {
              typeAnimatedValue.setValue(0);
              startAnimation();
            }
          });
        } else {
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: animationDuration,
            delay: animationDelay,
            useNativeDriver: animation !== 'glow',
          }).start(() => {
            if (animationLoop) {
              animatedValue.setValue(0);
              startAnimation();
            }
          });
        }
      };

      startAnimation();
    }
  }, [animated, animation, animationDuration, animationDelay, animationLoop, animatedValue, typeAnimatedValue, glowIntensity, glowColor]);

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
        useNativeDriver: animation !== 'glow',
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
        accessibilityHint={`Code ${variant}${language ? ` in ${language}` : ''}`}
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
      accessibilityHint={`Code ${variant}${language ? ` in ${language}` : ''}`}
      {...props}
    >
      {processedChildren}
    </Text>
  );
});

Code.displayName = 'Code';

export default Code;
