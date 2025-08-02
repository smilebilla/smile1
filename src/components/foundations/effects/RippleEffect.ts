/**
 * Corp Astro UI Library - Ripple Effect System
 * 
 * Touch ripple animation system providing Material Design-inspired ripple effects
 * with Corp Astro's signature color palette and precise timing specifications.
 * Supports multiple variants and platforms with performance optimizations.
 * 
 * @module RippleEffect
 * @version 1.0.0
 * @since 2024
 * 
 * UI Documentation Reference:
 * - Design System: ripple: color: 'rgba(46,134,222,0.3)', duration: 600ms, easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
 * - Platform Specific: Android ripple configuration with Corp Astro colors
 * - Variants: light: 'rgba(255,255,255,0.3)', dark: 'rgba(0,0,0,0.3)', primary: 'rgba(46,134,222,0.3)'
 * - Performance: Proper cleanup and bounded ripple effects
 * 
 * Design System Compliance:
 * - Color: 'rgba(46,134,222,0.3)' - Corp Astro signature blue with 30% opacity
 * - Duration: 600ms - Standard Material Design timing
 * - Easing: 'cubic-bezier(0.4, 0, 0.2, 1)' - Material Design emphasis easing
 * - Variants: Light, dark, and primary color options
 * - Bounds: Masked to component boundaries
 * - Touch response: Immediate start on touch, proper cleanup
 */

import { Animated, View, ViewStyle, PanResponder, Dimensions, Platform } from 'react-native';
import { useRef, useCallback, useMemo } from 'react';
import { SignatureBlues } from '../tokens/colors/SignatureBlues';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * Ripple effect variants
 */
export type RippleVariant = 'light' | 'dark' | 'primary' | 'signature';

/**
 * Ripple effect configuration
 */
export interface RippleEffectConfig {
  /** Ripple color */
  color: string;
  /** Animation duration in milliseconds */
  duration: number;
  /** Animation easing function */
  easing: string;
  /** Maximum ripple radius */
  maxRadius?: number;
  /** Starting opacity */
  opacity: number;
  /** Ripple bounded to container */
  bounded: boolean;
  /** Performance optimization level */
  performance: 'low' | 'medium' | 'high';
  /** Accessibility support */
  accessibility: {
    /** Reduce motion compliance */
    respectReducedMotion: boolean;
    /** Minimum touch target size */
    minTouchTarget: number;
  };
}

/**
 * Ripple effect state
 */
export interface RippleEffectState {
  /** Animation scale value */
  scale: Animated.Value;
  /** Animation opacity value */
  opacity: Animated.Value;
  /** Touch position */
  touchPosition: { x: number; y: number };
  /** Ripple radius */
  radius: number;
  /** Animation instance */
  animation?: Animated.CompositeAnimation;
  /** Is animation running */
  isRunning: boolean;
}

/**
 * Ripple effect result
 */
export interface RippleEffectResult {
  /** Ripple container style */
  containerStyle: ViewStyle;
  /** Ripple circle style */
  rippleStyle: ViewStyle;
  /** Pan responder for touch handling */
  panResponder: any;
  /** Start ripple animation */
  startRipple: (touchX: number, touchY: number) => void;
  /** Stop ripple animation */
  stopRipple: () => void;
  /** Reset ripple state */
  resetRipple: () => void;
  /** Ripple configuration */
  config: RippleEffectConfig;
}

// ============================================================================
// CONSTANTS & CONFIGURATION
// ============================================================================

/**
 * Default ripple effect configuration
 */
const DEFAULT_RIPPLE_CONFIG: RippleEffectConfig = {
  color: 'rgba(46,134,222,0.3)',
  duration: 600,
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  maxRadius: 200,
  opacity: 0.3,
  bounded: true,
  performance: 'medium',
  accessibility: {
    respectReducedMotion: true,
    minTouchTarget: 48,
  },
};

/**
 * Ripple variant configurations
 */
const RIPPLE_VARIANTS: Record<RippleVariant, Partial<RippleEffectConfig>> = {
  light: {
    color: 'rgba(255,255,255,0.3)',
    opacity: 0.3,
  },
  dark: {
    color: 'rgba(0,0,0,0.3)',
    opacity: 0.3,
  },
  primary: {
    color: 'rgba(46,134,222,0.3)',
    opacity: 0.3,
  },
  signature: {
    color: `${String(SignatureBlues.primary)}33`, // 20% opacity
    opacity: 0.2,
  },
};

/**
 * Material Design easing functions
 */
const MATERIAL_EASING = {
  emphasis: 'cubic-bezier(0.4, 0, 0.2, 1)',
  decelerate: 'cubic-bezier(0.0, 0, 0.2, 1)',
  accelerate: 'cubic-bezier(0.4, 0, 1, 1)',
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

// ============================================================================
// RIPPLE EFFECT CREATORS
// ============================================================================

/**
 * Create ripple effect with touch handling
 */
const createRippleEffect = (
  config: Partial<RippleEffectConfig> = {}
): RippleEffectResult => {
  const finalConfig = { ...DEFAULT_RIPPLE_CONFIG, ...config };
  
  // Create animated values
  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(finalConfig.opacity)).current;
  const touchPosition = useRef({ x: 0, y: 0 });
  const radius = useRef(0);
  const currentAnimation = useRef<Animated.CompositeAnimation | null>(null);
  const isRunning = useRef(false);
  
  // Calculate maximum radius based on component size
  const calculateMaxRadius = useCallback((width: number, height: number, touchX: number, touchY: number): number => {
    if (finalConfig.maxRadius) {
      return Math.min(finalConfig.maxRadius, Math.max(width, height));
    }
    
    // Calculate distance to farthest corner
    const corners = [
      { x: 0, y: 0 },
      { x: width, y: 0 },
      { x: 0, y: height },
      { x: width, y: height },
    ];
    
    const distances = corners.map(corner => 
      Math.sqrt(Math.pow(touchX - corner.x, 2) + Math.pow(touchY - corner.y, 2))
    );
    
    return Math.max(...distances);
  }, [finalConfig.maxRadius]);
  
  // Start ripple animation
  const startRipple = useCallback((touchX: number, touchY: number) => {
    if (isRunning.current) {
      stopRipple();
    }
    
    // Store touch position
    touchPosition.current = { x: touchX, y: touchY };
    
    // Calculate ripple radius
    const { width, height } = Dimensions.get('window');
    radius.current = calculateMaxRadius(width, height, touchX, touchY);
    
    // Reset animated values
    scale.setValue(0);
    opacity.setValue(finalConfig.opacity);
    
    // Create ripple animation
    isRunning.current = true;
    currentAnimation.current = Animated.parallel([
      Animated.timing(scale, {
        toValue: 1,
        duration: finalConfig.duration,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: finalConfig.duration,
        useNativeDriver: true,
      }),
    ]);
    
    currentAnimation.current.start(({ finished }) => {
      if (finished) {
        isRunning.current = false;
        currentAnimation.current = null;
      }
    });
  }, [finalConfig.duration, finalConfig.opacity, calculateMaxRadius]);
  
  // Stop ripple animation
  const stopRipple = useCallback(() => {
    if (currentAnimation.current) {
      currentAnimation.current.stop();
      currentAnimation.current = null;
    }
    isRunning.current = false;
  }, []);
  
  // Reset ripple state
  const resetRipple = useCallback(() => {
    stopRipple();
    scale.setValue(0);
    opacity.setValue(finalConfig.opacity);
    touchPosition.current = { x: 0, y: 0 };
    radius.current = 0;
  }, [finalConfig.opacity]);
  
  // Pan responder for touch handling
  const panResponder = useMemo(() => PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => false,
    onPanResponderGrant: (event) => {
      const { locationX, locationY } = event.nativeEvent;
      startRipple(locationX || 0, locationY || 0);
    },
    onPanResponderRelease: () => {
      // Let animation complete naturally
    },
    onPanResponderTerminate: () => {
      stopRipple();
    },
  }), [startRipple, stopRipple]);
  
  // Container style
  const containerStyle: ViewStyle = {
    position: 'relative',
    overflow: finalConfig.bounded ? 'hidden' : 'visible',
  };
  
  // Ripple circle style
  const rippleStyle: ViewStyle = {
    position: 'absolute',
    left: touchPosition.current.x - radius.current,
    top: touchPosition.current.y - radius.current,
    width: radius.current * 2,
    height: radius.current * 2,
    borderRadius: radius.current,
    backgroundColor: finalConfig.color,
    opacity: opacity,
    transform: [{ scale }],
    pointerEvents: 'none',
  };
  
  return {
    containerStyle,
    rippleStyle,
    panResponder,
    startRipple,
    stopRipple,
    resetRipple,
    config: finalConfig,
  };
};

/**
 * Create ripple effect for specific variant
 */
const createVariantRipple = (
  variant: RippleVariant,
  config: Partial<RippleEffectConfig> = {}
): RippleEffectResult => {
  const variantConfig = RIPPLE_VARIANTS[variant];
  const finalConfig = { ...DEFAULT_RIPPLE_CONFIG, ...variantConfig, ...config };
  
  return createRippleEffect(finalConfig);
};

/**
 * Create bounded ripple effect
 */
const createBoundedRipple = (
  config: Partial<RippleEffectConfig> = {}
): RippleEffectResult => {
  return createRippleEffect({
    ...config,
    bounded: true,
  });
};

/**
 * Create unbounded ripple effect
 */
const createUnboundedRipple = (
  config: Partial<RippleEffectConfig> = {}
): RippleEffectResult => {
  return createRippleEffect({
    ...config,
    bounded: false,
  });
};

// ============================================================================
// SPECIALIZED RIPPLE EFFECTS
// ============================================================================

/**
 * Create signature Corp Astro ripple
 */
const createSignatureRipple = (
  config: Partial<RippleEffectConfig> = {}
): RippleEffectResult => {
  return createVariantRipple('signature', {
    duration: 600,
    easing: MATERIAL_EASING.emphasis,
    ...config,
  });
};

/**
 * Create fast ripple for quick interactions
 */
const createFastRipple = (
  config: Partial<RippleEffectConfig> = {}
): RippleEffectResult => {
  return createRippleEffect({
    ...config,
    duration: 300,
    easing: MATERIAL_EASING.sharp,
  });
};

/**
 * Create slow ripple for emphasis
 */
const createSlowRipple = (
  config: Partial<RippleEffectConfig> = {}
): RippleEffectResult => {
  return createRippleEffect({
    ...config,
    duration: 800,
    easing: MATERIAL_EASING.decelerate,
  });
};

/**
 * Create centered ripple (from center of component)
 */
const createCenteredRipple = (
  config: Partial<RippleEffectConfig> = {}
): RippleEffectResult => {
  const rippleResult = createRippleEffect(config);
  
  // Override startRipple to center the effect
  const originalStartRipple = rippleResult.startRipple;
  rippleResult.startRipple = (touchX: number, touchY: number) => {
    // Use center of component instead of touch position
    const { width, height } = Dimensions.get('window');
    originalStartRipple(width / 2, height / 2);
  };
  
  return rippleResult;
};

// ============================================================================
// PERFORMANCE OPTIMIZATIONS
// ============================================================================

/**
 * Optimize ripple for performance
 */
const optimizeRipplePerformance = (
  rippleResult: RippleEffectResult,
  performanceLevel: 'low' | 'medium' | 'high' = 'medium'
): RippleEffectResult => {
  const { config } = rippleResult;
  
  const optimizationSettings = {
    low: {
      duration: Math.min(400, config.duration),
      maxRadius: Math.min(100, config.maxRadius || 200),
      opacity: Math.max(0.2, config.opacity),
    },
    medium: {
      duration: Math.min(600, config.duration),
      maxRadius: Math.min(150, config.maxRadius || 200),
      opacity: config.opacity,
    },
    high: {
      duration: config.duration,
      maxRadius: config.maxRadius || 200,
      opacity: config.opacity,
    },
  };
  
  const optimizedConfig = {
    ...config,
    ...optimizationSettings[performanceLevel],
  };
  
  return createRippleEffect(optimizedConfig);
};

/**
 * Batch multiple ripple effects
 */
const batchRippleEffects = (
  ripples: RippleEffectResult[],
  staggerDelay: number = 50
): void => {
  ripples.forEach((ripple, index) => {
    setTimeout(() => {
      const { width, height } = Dimensions.get('window');
      ripple.startRipple(width / 2, height / 2);
    }, index * staggerDelay);
  });
};

// ============================================================================
// ACCESSIBILITY SUPPORT
// ============================================================================

/**
 * Create accessibility-compliant ripple
 */
const createAccessibleRipple = (
  config: Partial<RippleEffectConfig> = {},
  reducedMotion: boolean = false
): RippleEffectResult => {
  if (reducedMotion) {
    // Provide instant feedback for reduced motion
    return createRippleEffect({
      ...config,
      duration: 100,
      easing: MATERIAL_EASING.sharp,
    });
  }
  
  return createRippleEffect({
    ...config,
    accessibility: {
      respectReducedMotion: true,
      minTouchTarget: 48,
    },
  });
};

/**
 * Create high contrast ripple
 */
const createHighContrastRipple = (
  config: Partial<RippleEffectConfig> = {}
): RippleEffectResult => {
  return createRippleEffect({
    ...config,
    color: 'rgba(255,255,255,0.6)',
    opacity: 0.6,
  });
};

// ============================================================================
// COMPONENT-SPECIFIC PRESETS
// ============================================================================

/**
 * Button ripple presets
 */
const BUTTON_RIPPLE_PRESETS = {
  primary: () => createVariantRipple('primary'),
  secondary: () => createVariantRipple('light', { opacity: 0.2 }),
  text: () => createVariantRipple('signature', { opacity: 0.1 }),
  icon: () => createCenteredRipple({ color: 'rgba(46,134,222,0.2)' }),
};

/**
 * Card ripple presets
 */
const CARD_RIPPLE_PRESETS = {
  default: () => createVariantRipple('signature', { opacity: 0.1 }),
  interactive: () => createVariantRipple('primary', { opacity: 0.15 }),
  premium: () => createVariantRipple('signature', { opacity: 0.2 }),
};

/**
 * List item ripple presets
 */
const LIST_ITEM_RIPPLE_PRESETS = {
  default: () => createBoundedRipple({ color: 'rgba(46,134,222,0.1)' }),
  selected: () => createBoundedRipple({ color: 'rgba(46,134,222,0.2)' }),
  navigation: () => createBoundedRipple({ color: 'rgba(255,255,255,0.1)' }),
};

/**
 * FAB ripple presets
 */
const FAB_RIPPLE_PRESETS = {
  primary: () => createUnboundedRipple({ color: 'rgba(46,134,222,0.3)' }),
  secondary: () => createUnboundedRipple({ color: 'rgba(255,255,255,0.3)' }),
  mini: () => createBoundedRipple({ color: 'rgba(46,134,222,0.2)' }),
};

// ============================================================================
// PLATFORM-SPECIFIC IMPLEMENTATIONS
// ============================================================================

/**
 * Android-specific ripple implementation
 */
const createAndroidRipple = (
  config: Partial<RippleEffectConfig> = {}
): RippleEffectResult => {
  if (Platform.OS !== 'android') {
    return createRippleEffect(config);
  }
  
  return createRippleEffect({
    ...config,
    duration: 600,
    easing: MATERIAL_EASING.emphasis,
    bounded: true,
  });
};

/**
 * iOS-specific ripple implementation (subtle)
 */
const createIOSRipple = (
  config: Partial<RippleEffectConfig> = {}
): RippleEffectResult => {
  if (Platform.OS !== 'ios') {
    return createRippleEffect(config);
  }
  
  return createRippleEffect({
    ...config,
    duration: 400,
    opacity: 0.15,
    easing: MATERIAL_EASING.decelerate,
  });
};

// ============================================================================
// UTILITIES
// ============================================================================

/**
 * Calculate ripple radius for component
 */
const calculateRippleRadius = (
  width: number,
  height: number,
  touchX: number,
  touchY: number
): number => {
  const corners = [
    { x: 0, y: 0 },
    { x: width, y: 0 },
    { x: 0, y: height },
    { x: width, y: height },
  ];
  
  const distances = corners.map(corner => 
    Math.sqrt(Math.pow(touchX - corner.x, 2) + Math.pow(touchY - corner.y, 2))
  );
  
  return Math.max(...distances);
};

/**
 * Convert easing string to React Native easing
 */
const convertEasingToReactNative = (easing: string): any => {
  const easingMap: Record<string, any> = {
    'cubic-bezier(0.4, 0, 0.2, 1)': 'ease-out',
    'cubic-bezier(0.0, 0, 0.2, 1)': 'ease-out',
    'cubic-bezier(0.4, 0, 1, 1)': 'ease-in',
    'cubic-bezier(0.4, 0, 0.6, 1)': 'ease-in-out',
    'linear': 'linear',
  };
  
  return easingMap[easing] || 'ease-out';
};

// ============================================================================
// EXPORTS
// ============================================================================

export {
  // Main ripple creators
  createRippleEffect,
  createVariantRipple,
  createBoundedRipple,
  createUnboundedRipple,
  
  // Specialized ripples
  createSignatureRipple,
  createFastRipple,
  createSlowRipple,
  createCenteredRipple,
  
  // Performance optimizations
  optimizeRipplePerformance,
  batchRippleEffects,
  
  // Accessibility
  createAccessibleRipple,
  createHighContrastRipple,
  
  // Platform-specific
  createAndroidRipple,
  createIOSRipple,
  
  // Presets
  BUTTON_RIPPLE_PRESETS,
  CARD_RIPPLE_PRESETS,
  LIST_ITEM_RIPPLE_PRESETS,
  FAB_RIPPLE_PRESETS,
  
  // Utilities
  calculateRippleRadius,
  convertEasingToReactNative,
  
  // Constants
  DEFAULT_RIPPLE_CONFIG,
  RIPPLE_VARIANTS,
  MATERIAL_EASING,
};
