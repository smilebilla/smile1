/**
 * Corp Astro UI Library - Blur Effects System
 * 
 * Comprehensive blur effect system providing backdrop blur for modals, overlays, and scroll interactions.
 * Includes performance optimization for various devices and platform-specific implementations.
 * 
 * @module BlurEffects
 * @version 1.0.0
 * @since 2024
 * 
 * UI Documentation Reference:
 * - Design System: Primary Header blur: 'blur(30px) saturate(180%)'
 * - Design System: Status Bar scrollBlur: backdropFilter 'blur(20px)', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
 * - Design System: Modal/Overlay backdrop blur specifications
 * - Performance: Device-specific optimizations and fallbacks
 * 
 * Design System Compliance:
 * - Primary Header: blur: 'blur(30px) saturate(180%)'
 * - Status Bar: scrollBlur: backdropFilter 'blur(20px)'
 * - Modal/Overlay: Variable blur amounts with saturation
 * - Transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
 * - Performance: Optimized blur values for different device capabilities
 */

import { useCallback, useRef } from 'react';
import { Animated, Platform, ViewStyle } from 'react-native';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Blur effect types
 */
export type BlurEffectType = 
  | 'backdrop'     // Backdrop blur for modals/overlays
  | 'scroll'       // Scroll-activated blur
  | 'static'       // Static blur effect
  | 'gradient'     // Gradient blur effect
  | 'motion';      // Motion-activated blur

/**
 * Blur intensity levels
 */
export type BlurIntensity = 
  | 'subtle'       // 5px blur
  | 'light'        // 10px blur
  | 'medium'       // 20px blur
  | 'strong'       // 30px blur
  | 'extreme';     // 40px blur

/**
 * Device performance levels
 */
export type DevicePerformance = 'low' | 'medium' | 'high';

/**
 * Blur effect configuration
 */
export interface BlurEffectConfig {
  /** Blur intensity level */
  intensity: BlurIntensity;
  /** Saturation percentage (0-200) */
  saturation: number;
  /** Blur effect type */
  type: BlurEffectType;
  /** Animation duration in milliseconds */
  duration: number;
  /** Animation easing function */
  easing: string;
  /** Device performance optimization */
  performance: DevicePerformance;
  /** Enable/disable animations */
  animated: boolean;
  /** Scroll threshold for scroll blur */
  scrollThreshold?: number;
  /** Opacity for backdrop blur */
  opacity?: number;
}

/**
 * Blur effect result
 */
export interface BlurEffectResult {
  /** Style object with blur effects */
  style: ViewStyle;
  /** Animation controls */
  animation: {
    /** Start blur animation */
    start: () => void;
    /** Stop blur animation */
    stop: () => void;
    /** Reset blur state */
    reset: () => void;
  };
  /** Configuration used */
  config: BlurEffectConfig;
}

/**
 * Scroll blur state
 */
export interface ScrollBlurState {
  /** Current scroll position */
  scrollY: number;
  /** Blur animation progress (0-1) */
  blurProgress: number;
  /** Is blur active */
  isActive: boolean;
}

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Blur intensity values in pixels
 */
const BLUR_INTENSITY_VALUES = {
  subtle: 5,
  light: 10,
  medium: 20,
  strong: 30,
  extreme: 40,
} as const;

/**
 * Performance optimization settings
 */
const PERFORMANCE_SETTINGS = {
  low: {
    maxBlur: 10,
    reduceFactorBlur: 0.5,
    reduceSaturation: 0.7,
    disableAnimations: true,
  },
  medium: {
    maxBlur: 20,
    reduceFactorBlur: 0.8,
    reduceSaturation: 0.9,
    disableAnimations: false,
  },
  high: {
    maxBlur: 40,
    reduceFactorBlur: 1.0,
    reduceSaturation: 1.0,
    disableAnimations: false,
  },
} as const;

/**
 * Default blur effect configuration
 */
const DEFAULT_BLUR_CONFIG: BlurEffectConfig = {
  intensity: 'medium',
  saturation: 180,
  type: 'backdrop',
  duration: 300,
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  performance: 'medium',
  animated: true,
  scrollThreshold: 50,
  opacity: 0.95,
};

/**
 * Corp Astro signature blur presets
 */
const SIGNATURE_BLUR_PRESETS = {
  headerScroll: {
    intensity: 'medium' as BlurIntensity,
    saturation: 100,
    type: 'scroll' as BlurEffectType,
    duration: 300,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    scrollThreshold: 50,
  },
  primaryHeader: {
    intensity: 'strong' as BlurIntensity,
    saturation: 180,
    type: 'static' as BlurEffectType,
    duration: 0,
    easing: 'ease',
  },
  modalBackdrop: {
    intensity: 'strong' as BlurIntensity,
    saturation: 180,
    type: 'backdrop' as BlurEffectType,
    duration: 300,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    opacity: 0.95,
  },
  overlayBackdrop: {
    intensity: 'medium' as BlurIntensity,
    saturation: 150,
    type: 'backdrop' as BlurEffectType,
    duration: 200,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    opacity: 0.9,
  },
  statusBarScroll: {
    intensity: 'medium' as BlurIntensity,
    saturation: 100,
    type: 'scroll' as BlurEffectType,
    duration: 300,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    scrollThreshold: 30,
  },
} as const;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get optimized blur value for device performance
 */
const getOptimizedBlurValue = (
  intensity: BlurIntensity,
  performance: DevicePerformance
): number => {
  const baseBlur = BLUR_INTENSITY_VALUES[intensity];
  const settings = PERFORMANCE_SETTINGS[performance];
  
  const optimizedBlur = Math.min(
    settings.maxBlur,
    baseBlur * settings.reduceFactorBlur
  );
  
  return Math.max(2, optimizedBlur); // Minimum 2px blur
};

/**
 * Get optimized saturation value for device performance
 */
const getOptimizedSaturation = (
  baseSaturation: number,
  performance: DevicePerformance
): number => {
  const settings = PERFORMANCE_SETTINGS[performance];
  return Math.max(100, baseSaturation * settings.reduceSaturation);
};

/**
 * Create backdrop filter string
 */
const createBackdropFilter = (
  blurValue: number,
  saturation: number
): string => {
  return `blur(${blurValue}px) saturate(${saturation}%)`;
};

/**
 * Check if device supports backdrop filter
 */
const supportsBackdropFilter = (): boolean => {
  return Platform.OS === 'web';
};

/**
 * Create fallback background for non-supporting devices
 */
const createFallbackBackground = (
  opacity: number = 0.95
): string => {
  return `rgba(8, 8, 15, ${opacity})`;
};

// ============================================================================
// BLUR EFFECT CREATORS
// ============================================================================

/**
 * Create backdrop blur effect
 */
const createBackdropBlur = (
  config: Partial<BlurEffectConfig> = {}
): BlurEffectResult => {
  const finalConfig = { ...DEFAULT_BLUR_CONFIG, ...config };
  const blurOpacity = useRef(new Animated.Value(0)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);
  
  // Get optimized values
  const optimizedBlur = getOptimizedBlurValue(finalConfig.intensity, finalConfig.performance);
  const optimizedSaturation = getOptimizedSaturation(finalConfig.saturation, finalConfig.performance);
  
  // Create animation
  const startAnimation = useCallback(() => {
    if (!finalConfig.animated) return;
    
    animationRef.current = Animated.timing(blurOpacity, {
      toValue: 1,
      duration: finalConfig.duration,
      useNativeDriver: false,
    });
    
    animationRef.current.start();
  }, [finalConfig.animated, finalConfig.duration]);
  
  const stopAnimation = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.stop();
    }
    
    if (finalConfig.animated) {
      Animated.timing(blurOpacity, {
        toValue: 0,
        duration: finalConfig.duration,
        useNativeDriver: false,
      }).start();
    }
  }, [finalConfig.animated, finalConfig.duration]);
  
  const resetAnimation = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.stop();
    }
    blurOpacity.setValue(0);
  }, []);
  
  // Create style
  const style: ViewStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: createFallbackBackground(finalConfig.opacity || 0.95),
  };
  
  // Add backdrop filter for web
  if (supportsBackdropFilter()) {
    (style as any).backdropFilter = createBackdropFilter(optimizedBlur, optimizedSaturation);
  }
  
  // Apply animation if needed
  if (finalConfig.animated) {
    const animatedStyle = {
      ...style,
      opacity: blurOpacity,
    };
    return {
      style: animatedStyle,
      animation: {
        start: startAnimation,
        stop: stopAnimation,
        reset: resetAnimation,
      },
      config: finalConfig,
    };
  }
  
  return {
    style,
    animation: {
      start: startAnimation,
      stop: stopAnimation,
      reset: resetAnimation,
    },
    config: finalConfig,
  };
};

/**
 * Create scroll-activated blur effect
 */
const createScrollBlur = (
  config: Partial<BlurEffectConfig> = {}
): BlurEffectResult => {
  const finalConfig = { ...DEFAULT_BLUR_CONFIG, type: 'scroll', ...config };
  const blurProgress = useRef(new Animated.Value(0)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);
  
  // Get optimized values
  const optimizedBlur = getOptimizedBlurValue(finalConfig.intensity, finalConfig.performance);
  const optimizedSaturation = getOptimizedSaturation(finalConfig.saturation, finalConfig.performance);
  
  // Scroll activation function
  const activateScrollBlur = useCallback((scrollY: number) => {
    const threshold = finalConfig.scrollThreshold || 50;
    const progress = Math.min(1, Math.max(0, scrollY / threshold));
    
    if (animationRef.current) {
      animationRef.current.stop();
    }
    
    animationRef.current = Animated.timing(blurProgress, {
      toValue: progress,
      duration: finalConfig.duration,
      useNativeDriver: false,
    });
    
    animationRef.current.start();
  }, [finalConfig.scrollThreshold, finalConfig.duration]);
  
  const resetScrollBlur = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.stop();
    }
    blurProgress.setValue(0);
  }, []);
  
  // Create style
  const style: ViewStyle = {
    backgroundColor: createFallbackBackground(finalConfig.opacity || 0.95),
  };
  
  // Add backdrop filter for web
  if (supportsBackdropFilter()) {
    (style as any).backdropFilter = blurProgress.interpolate({
      inputRange: [0, 1],
      outputRange: [`blur(0px) saturate(100%)`, createBackdropFilter(optimizedBlur, optimizedSaturation)],
    });
  }
  
  // Apply animation to opacity
  const animatedStyle = {
    ...style,
    opacity: blurProgress,
  };
  
  return {
    style: animatedStyle,
    animation: {
      start: () => activateScrollBlur(finalConfig.scrollThreshold || 50),
      stop: () => activateScrollBlur(0),
      reset: resetScrollBlur,
    },
    config: finalConfig as BlurEffectConfig,
  };
};

/**
 * Create static blur effect
 */
const createStaticBlur = (
  config: Partial<BlurEffectConfig> = {}
): BlurEffectResult => {
  const finalConfig = { ...DEFAULT_BLUR_CONFIG, type: 'static', animated: false, ...config };
  
  // Get optimized values
  const optimizedBlur = getOptimizedBlurValue(finalConfig.intensity, finalConfig.performance);
  const optimizedSaturation = getOptimizedSaturation(finalConfig.saturation, finalConfig.performance);
  
  // Create style
  const style: ViewStyle = {
    backgroundColor: createFallbackBackground(finalConfig.opacity || 0.95),
  };
  
  // Add backdrop filter for web
  if (supportsBackdropFilter()) {
    (style as any).backdropFilter = createBackdropFilter(optimizedBlur, optimizedSaturation);
  }
  
  return {
    style,
    animation: {
      start: () => {},
      stop: () => {},
      reset: () => {},
    },
    config: finalConfig as BlurEffectConfig,
  };
};

/**
 * Create gradient blur effect
 */
const createGradientBlur = (
  config: Partial<BlurEffectConfig> = {}
): BlurEffectResult => {
  const finalConfig = { ...DEFAULT_BLUR_CONFIG, type: 'gradient', ...config };
  const blurOpacity = useRef(new Animated.Value(0)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);
  
  // Get optimized values
  const optimizedBlur = getOptimizedBlurValue(finalConfig.intensity, finalConfig.performance);
  const optimizedSaturation = getOptimizedSaturation(finalConfig.saturation, finalConfig.performance);
  
  // Create animation
  const startAnimation = useCallback(() => {
    if (!finalConfig.animated) return;
    
    animationRef.current = Animated.timing(blurOpacity, {
      toValue: 1,
      duration: finalConfig.duration,
      useNativeDriver: false,
    });
    
    animationRef.current.start();
  }, [finalConfig.animated, finalConfig.duration]);
  
  const stopAnimation = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.stop();
    }
    
    if (finalConfig.animated) {
      Animated.timing(blurOpacity, {
        toValue: 0,
        duration: finalConfig.duration,
        useNativeDriver: false,
      }).start();
    }
  }, [finalConfig.animated, finalConfig.duration]);
  
  const resetAnimation = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.stop();
    }
    blurOpacity.setValue(0);
  }, []);
  
  // Create gradient background
  const gradientBackground = finalConfig.animated 
    ? blurOpacity.interpolate({
        inputRange: [0, 1],
        outputRange: [
          `linear-gradient(180deg, ${createFallbackBackground(0)} 0%, ${createFallbackBackground(0)} 100%)`,
          `linear-gradient(180deg, ${createFallbackBackground(0.8)} 0%, ${createFallbackBackground(0.2)} 100%)`
        ],
      })
    : `linear-gradient(180deg, ${createFallbackBackground(0.8)} 0%, ${createFallbackBackground(0.2)} 100%)`;
  
  // Create style
  const style: ViewStyle = {
    backgroundColor: 'transparent',
  };
  
  // Add backdrop filter for web
  if (supportsBackdropFilter()) {
    (style as any).backdropFilter = createBackdropFilter(optimizedBlur, optimizedSaturation);
    (style as any).background = gradientBackground;
  } else {
    (style as any).background = gradientBackground;
  }
  
  return {
    style,
    animation: {
      start: startAnimation,
      stop: stopAnimation,
      reset: resetAnimation,
    },
    config: finalConfig as BlurEffectConfig,
  };
};

// ============================================================================
// PRESET CREATORS
// ============================================================================

/**
 * Create header scroll blur preset
 */
const createHeaderScrollBlur = (
  customConfig: Partial<BlurEffectConfig> = {}
): BlurEffectResult => {
  const config = { ...SIGNATURE_BLUR_PRESETS.headerScroll, ...customConfig };
  return createScrollBlur(config);
};

/**
 * Create primary header blur preset
 */
const createPrimaryHeaderBlur = (
  customConfig: Partial<BlurEffectConfig> = {}
): BlurEffectResult => {
  const config = { ...SIGNATURE_BLUR_PRESETS.primaryHeader, ...customConfig };
  return createStaticBlur(config);
};

/**
 * Create modal backdrop blur preset
 */
const createModalBackdropBlur = (
  customConfig: Partial<BlurEffectConfig> = {}
): BlurEffectResult => {
  const config = { ...SIGNATURE_BLUR_PRESETS.modalBackdrop, ...customConfig };
  return createBackdropBlur(config);
};

/**
 * Create overlay backdrop blur preset
 */
const createOverlayBackdropBlur = (
  customConfig: Partial<BlurEffectConfig> = {}
): BlurEffectResult => {
  const config = { ...SIGNATURE_BLUR_PRESETS.overlayBackdrop, ...customConfig };
  return createBackdropBlur(config);
};

/**
 * Create status bar scroll blur preset
 */
const createStatusBarScrollBlur = (
  customConfig: Partial<BlurEffectConfig> = {}
): BlurEffectResult => {
  const config = { ...SIGNATURE_BLUR_PRESETS.statusBarScroll, ...customConfig };
  return createScrollBlur(config);
};

// ============================================================================
// PERFORMANCE OPTIMIZATIONS
// ============================================================================

/**
 * Optimize blur for device performance
 */
const optimizeBlurForPerformance = (
  blurResult: BlurEffectResult,
  performanceLevel: DevicePerformance = 'medium'
): BlurEffectResult => {
  const { style, animation, config } = blurResult;
  const settings = PERFORMANCE_SETTINGS[performanceLevel];
  
  // Create optimized config
  const optimizedConfig = {
    ...config,
    performance: performanceLevel,
    animated: config.animated && !settings.disableAnimations,
    duration: settings.disableAnimations ? 0 : config.duration,
  };
  
  // Get optimized blur and saturation
  const optimizedBlur = getOptimizedBlurValue(config.intensity, performanceLevel);
  const optimizedSaturation = getOptimizedSaturation(config.saturation, performanceLevel);
  
  // Create optimized style
  const optimizedStyle = { ...style };
  
  if (supportsBackdropFilter()) {
    (optimizedStyle as any).backdropFilter = createBackdropFilter(optimizedBlur, optimizedSaturation);
  }
  
  return {
    style: optimizedStyle,
    animation: settings.disableAnimations ? {
      start: () => {},
      stop: () => {},
      reset: () => {},
    } : animation,
    config: optimizedConfig,
  };
};

/**
 * Batch multiple blur effects for performance
 */
const batchBlurEffects = (
  blurEffects: BlurEffectResult[],
  staggerDelay: number = 100
): void => {
  blurEffects.forEach((blur, index) => {
    setTimeout(() => {
      blur.animation.start();
    }, index * staggerDelay);
  });
};

// ============================================================================
// ACCESSIBILITY SUPPORT
// ============================================================================

/**
 * Create accessibility-compliant blur effect
 */
const createAccessibleBlur = (
  config: Partial<BlurEffectConfig> = {},
  reducedMotion: boolean = false
): BlurEffectResult => {
  const accessibleConfig = {
    ...config,
    animated: !reducedMotion,
    duration: reducedMotion ? 0 : (config.duration || 300),
  };
  
  if (reducedMotion) {
    // Provide static blur for reduced motion
    return createStaticBlur(accessibleConfig);
  }
  
  return createBackdropBlur(accessibleConfig);
};

// ============================================================================
// COMPONENT-SPECIFIC PRESETS
// ============================================================================

/**
 * Modal blur presets
 */
const MODAL_BLUR_PRESETS = {
  default: () => createModalBackdropBlur(),
  light: () => createModalBackdropBlur({ intensity: 'light', opacity: 0.9 }),
  strong: () => createModalBackdropBlur({ intensity: 'strong', opacity: 0.98 }),
  gradient: () => createGradientBlur({ intensity: 'strong', type: 'gradient' }),
};

/**
 * Header blur presets
 */
const HEADER_BLUR_PRESETS = {
  primary: () => createPrimaryHeaderBlur(),
  scroll: () => createHeaderScrollBlur(),
  statusBar: () => createStatusBarScrollBlur(),
  navigation: () => createHeaderScrollBlur({ intensity: 'light', scrollThreshold: 30 }),
};

/**
 * Overlay blur presets
 */
const OVERLAY_BLUR_PRESETS = {
  default: () => createOverlayBackdropBlur(),
  subtle: () => createOverlayBackdropBlur({ intensity: 'subtle', opacity: 0.8 }),
  strong: () => createOverlayBackdropBlur({ intensity: 'strong', opacity: 0.95 }),
  tooltip: () => createOverlayBackdropBlur({ intensity: 'medium', opacity: 0.9 }),
};

/**
 * Performance blur presets
 */
const PERFORMANCE_BLUR_PRESETS = {
  lowEnd: (config: Partial<BlurEffectConfig> = {}) => 
    optimizeBlurForPerformance(createBackdropBlur(config), 'low'),
  medium: (config: Partial<BlurEffectConfig> = {}) => 
    optimizeBlurForPerformance(createBackdropBlur(config), 'medium'),
  highEnd: (config: Partial<BlurEffectConfig> = {}) => 
    optimizeBlurForPerformance(createBackdropBlur(config), 'high'),
};

// ============================================================================
// EXPORTS
// ============================================================================

export {
  batchBlurEffects, BLUR_INTENSITY_VALUES,
  // Accessibility
  createAccessibleBlur,
  // Main blur creators
  createBackdropBlur, createBackdropFilter, createGradientBlur,

  // Preset creators
  createHeaderScrollBlur, createModalBackdropBlur,
  createOverlayBackdropBlur, createPrimaryHeaderBlur, createScrollBlur,
  createStaticBlur, createStatusBarScrollBlur,
  // Constants
  DEFAULT_BLUR_CONFIG,
  // Utility functions
  getOptimizedBlurValue,
  getOptimizedSaturation, HEADER_BLUR_PRESETS,
  // Component presets
  MODAL_BLUR_PRESETS,
  // Performance utilities
  optimizeBlurForPerformance, OVERLAY_BLUR_PRESETS,
  PERFORMANCE_BLUR_PRESETS, PERFORMANCE_SETTINGS, SIGNATURE_BLUR_PRESETS, supportsBackdropFilter
};

