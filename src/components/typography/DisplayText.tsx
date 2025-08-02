import React, { forwardRef } from 'react';
import {
  Text,
  TextProps,
  StyleSheet,
  TextStyle,
  Animated,
  Platform,
} from 'react-native';

/**
 * Display text size variants
 */
export type DisplayTextSize = 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge';

/**
 * Display text weight variants
 */
export type DisplayTextWeight = 'light' | 'regular' | 'medium' | 'semibold' | 'bold';

/**
 * Display text alignment options
 */
export type DisplayTextAlign = 'left' | 'center' | 'right' | 'justify';

/**
 * Display text color variants
 */
export type DisplayTextColor = 'primary' | 'secondary' | 'accent' | 'muted' | 'inverse' | 'error' | 'warning' | 'success';

/**
 * Display text animation types
 */
export type DisplayTextAnimation = 'none' | 'fade' | 'slide' | 'scale' | 'glow' | 'shimmer';

/**
 * Display text component props
 */
export interface DisplayTextProps extends Omit<TextProps, 'style'> {
  /** Text content */
  children: React.ReactNode;
  /** Size variant */
  size?: DisplayTextSize;
  /** Font weight */
  weight?: DisplayTextWeight;
  /** Text alignment */
  align?: DisplayTextAlign;
  /** Color variant */
  color?: DisplayTextColor;
  /** Animation type */
  animation?: DisplayTextAnimation;
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
  /** Maximum font scale */
  maximumFontScale?: number;
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
 * Display text component ref
 */
export interface DisplayTextRef {
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
 * Size configuration for different display text sizes
 */
const sizeConfigs = {
  small: {
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  medium: {
    fontSize: 40,
    lineHeight: 48,
    letterSpacing: -0.75,
  },
  large: {
    fontSize: 48,
    lineHeight: 56,
    letterSpacing: -1,
  },
  xlarge: {
    fontSize: 56,
    lineHeight: 64,
    letterSpacing: -1.25,
  },
  xxlarge: {
    fontSize: 64,
    lineHeight: 72,
    letterSpacing: -1.5,
  },
};

/**
 * Font weight configuration
 */
const weightConfigs = {
  light: Platform.select({
    ios: '200' as const,
    android: '200' as const,
  }),
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
  bold: Platform.select({
    ios: '700' as const,
    android: '700' as const,
  }),
};

/**
 * Color configuration for different color variants
 */
const colorConfigs = {
  primary: '#FFFFFF',
  secondary: '#B8B8C0',
  accent: '#2E86DE',
  muted: '#8E8E93',
  inverse: '#000000',
  error: '#FF6B6B',
  warning: '#FFD93D',
  success: '#6BCF7F',
};

/**
 * DisplayText Component
 * 
 * A sophisticated display text component for large, prominent text using Didot font.
 * Features multiple sizes, weights, colors, animations, and Corp Astro styling.
 * 
 * @component
 * @example
 * ```tsx
 * <DisplayText
 *   size="large"
 *   weight="bold"
 *   color="primary"
 *   animation="glow"
 *   enableGlow
 * >
 *   Welcome to Corp Astro
 * </DisplayText>
 * ```
 */
const DisplayText = forwardRef<DisplayTextRef, DisplayTextProps>(({
  children,
  size = 'medium',
  weight = 'regular',
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
  maximumFontScale = 1.5,
  style,
  textShadow,
  enableGlow = false,
  glowColor = '#2E86DE',
  glowIntensity = 0.5,
  animationDuration = 1000,
  animationDelay = 0,
  animationLoop = false,
  testID,
  ...textProps
}, ref) => {
  // Animation values
  const fadeAnimation = React.useRef(new Animated.Value(animated ? 0 : 1)).current;
  const slideAnimation = React.useRef(new Animated.Value(animated ? -50 : 0)).current;
  const scaleAnimation = React.useRef(new Animated.Value(animated ? 0.5 : 1)).current;
  const glowAnimation = React.useRef(new Animated.Value(0)).current;
  const shimmerAnimation = React.useRef(new Animated.Value(0)).current;
  
  // Text ref
  const textRef = React.useRef<Text>(null);
  
  // Get size configuration
  const sizeConfig = sizeConfigs[size];
  const weightConfig = weightConfigs[weight];
  const colorConfig = colorConfigs[color];
  
  // Imperative handle for ref methods
  React.useImperativeHandle(ref, () => ({
    focus: () => {
      if (textRef.current) {
        textRef.current.focus?.();
      }
    },
    blur: () => {
      if (textRef.current) {
        textRef.current.blur?.();
      }
    },
    animate: (toValue: number, duration = animationDuration) => {
      const animations = [];
      
      if (animation === 'fade') {
        animations.push(
          Animated.timing(fadeAnimation, {
            toValue,
            duration,
            useNativeDriver: true,
          })
        );
      }
      
      if (animation === 'scale') {
        animations.push(
          Animated.timing(scaleAnimation, {
            toValue,
            duration,
            useNativeDriver: true,
          })
        );
      }
      
      if (animation === 'glow') {
        animations.push(
          Animated.timing(glowAnimation, {
            toValue,
            duration,
            useNativeDriver: false,
          })
        );
      }
      
      if (animations.length > 0) {
        Animated.parallel(animations).start();
      }
    },
    measure: () => {
      return new Promise((resolve) => {
        if (textRef.current) {
          textRef.current.measure((x, y, width, height) => {
            resolve({ x, y, width, height });
          });
        }
      });
    },
  }));
  
  // Animation effects
  React.useEffect(() => {
    if (animated) {
      const animations = [];
      
      if (animation === 'fade') {
        animations.push(
          Animated.timing(fadeAnimation, {
            toValue: 1,
            duration: animationDuration,
            delay: animationDelay,
            useNativeDriver: true,
          })
        );
      }
      
      if (animation === 'slide') {
        animations.push(
          Animated.timing(slideAnimation, {
            toValue: 0,
            duration: animationDuration,
            delay: animationDelay,
            useNativeDriver: true,
          })
        );
      }
      
      if (animation === 'scale') {
        animations.push(
          Animated.timing(scaleAnimation, {
            toValue: 1,
            duration: animationDuration,
            delay: animationDelay,
            useNativeDriver: true,
          })
        );
      }
      
      if (animation === 'glow') {
        const glowLoop = Animated.loop(
          Animated.sequence([
            Animated.timing(glowAnimation, {
              toValue: 1,
              duration: animationDuration / 2,
              useNativeDriver: false,
            }),
            Animated.timing(glowAnimation, {
              toValue: 0,
              duration: animationDuration / 2,
              useNativeDriver: false,
            }),
          ])
        );
        
        if (animationLoop) {
          glowLoop.start();
        } else {
          animations.push(
            Animated.timing(glowAnimation, {
              toValue: 1,
              duration: animationDuration,
              delay: animationDelay,
              useNativeDriver: false,
            })
          );
        }
      }
      
      if (animation === 'shimmer') {
        const shimmerLoop = Animated.loop(
          Animated.timing(shimmerAnimation, {
            toValue: 1,
            duration: animationDuration,
            useNativeDriver: true,
          })
        );
        
        if (animationLoop) {
          shimmerLoop.start();
        } else {
          animations.push(
            Animated.timing(shimmerAnimation, {
              toValue: 1,
              duration: animationDuration,
              delay: animationDelay,
              useNativeDriver: true,
            })
          );
        }
      }
      
      if (animations.length > 0) {
        Animated.parallel(animations).start();
      }
    }
  }, [
    animated,
    animation,
    animationDuration,
    animationDelay,
    animationLoop,
    fadeAnimation,
    slideAnimation,
    scaleAnimation,
    glowAnimation,
    shimmerAnimation,
  ]);
  
  // Text transformation
  const transformText = (text: string) => {
    if (uppercase) return text.toUpperCase();
    if (lowercase) return text.toLowerCase();
    if (capitalize) return text.charAt(0).toUpperCase() + text.slice(1);
    return text;
  };
  
  // Build text style
  const textStyle = [
    styles.text,
    {
      fontSize: customSize || sizeConfig.fontSize,
      lineHeight: customLineHeight || sizeConfig.lineHeight,
      letterSpacing: customLetterSpacing || sizeConfig.letterSpacing,
      fontWeight: weightConfig,
      color: customColor || colorConfig,
      textAlign: align,
      textShadowColor: textShadow?.color || 'rgba(0, 0, 0, 0.3)',
      textShadowOffset: textShadow?.offset || { width: 0, height: 2 },
      textShadowRadius: textShadow?.radius || 4,
    },
    style,
  ];
  
  // Build animated text style (only for animated components)
  const animatedTextStyle = [
    styles.text,
    {
      fontSize: customSize || sizeConfig.fontSize,
      lineHeight: customLineHeight || sizeConfig.lineHeight,
      letterSpacing: customLetterSpacing || sizeConfig.letterSpacing,
      fontWeight: weightConfig,
      color: customColor || colorConfig,
      textAlign: align,
      textShadowColor: textShadow?.color || 'rgba(0, 0, 0, 0.3)',
      textShadowOffset: textShadow?.offset || { width: 0, height: 2 },
      textShadowRadius: textShadow?.radius || 4,
    },
    enableGlow && {
      textShadowColor: glowColor,
      textShadowRadius: glowAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 20 * glowIntensity],
      }),
    },
    style,
  ];
  
  // Build animated style
  const animatedStyle = [
    animatedTextStyle,
    {
      opacity: animation === 'fade' ? fadeAnimation : 1,
      transform: [
        ...(animation === 'slide' ? [{ translateY: slideAnimation }] : []),
        ...(animation === 'scale' ? [{ scale: scaleAnimation }] : []),
        ...(animation === 'shimmer' ? [{
          translateX: shimmerAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [-100, 100],
          }),
        }] : []),
      ],
    },
  ];
  
  // Build text props
  const textConfiguration = {
    ref: textRef,
    style: textStyle,
    numberOfLines: truncate ? 1 : numberOfLines,
    ellipsizeMode: truncate ? 'tail' as const : undefined,
    selectable,
    adjustsFontSizeToFit,
    minimumFontScale,
    maximumFontScale,
    testID,
    ...textProps,
  };
  
  // Build animated text props
  const animatedTextConfiguration = {
    ref: textRef,
    style: animatedStyle,
    numberOfLines: truncate ? 1 : numberOfLines,
    ellipsizeMode: truncate ? 'tail' as const : undefined,
    selectable,
    adjustsFontSizeToFit,
    minimumFontScale,
    maximumFontScale,
    testID,
    ...textProps,
  };
  
  // Render text content
  const renderText = () => {
    if (typeof children === 'string') {
      return transformText(children);
    }
    return children;
  };
  
  // Render component
  if (animation !== 'none' && animated) {
    return (
      <Animated.Text {...animatedTextConfiguration}>
        {renderText()}
      </Animated.Text>
    );
  }
  
  return (
    <Text {...textConfiguration}>
      {renderText()}
    </Text>
  );
});

/**
 * Display text component styles
 */
const styles = StyleSheet.create({
  text: {
    fontFamily: Platform.select({
      ios: 'Didot',
      android: 'serif',
    }),
    color: '#FFFFFF',
    backgroundColor: 'transparent',
  },
});

DisplayText.displayName = 'DisplayText';

export default DisplayText;
