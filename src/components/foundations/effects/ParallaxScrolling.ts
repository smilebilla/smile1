/**
 * Corp Astro UI Library - Parallax Scrolling Effects
 * 
 * Advanced parallax scrolling system with layered depth effects, smooth animations, and performance optimization.
 * Provides comprehensive parallax effects for creating immersive depth experiences in Corp Astro interfaces.
 * 
 * @module ParallaxScrolling
 * @version 1.0.0
 * @since 2024
 * 
 * UI Documentation Reference:
 * - Design System: Parallax layers: 3, speeds: [0.1, 0.3, 0.5], opacities: [0.3, 0.6, 1], blur: [2, 1, 0]
 * - Design System: Layer names: ['background', 'midground', 'foreground'], smoothness: 0.8, threshold: 50
 * - Visual Language: Background: 0.1x speed, Midground: 0.5x speed, Foreground: 1x speed
 * - Performance: Optimized for smooth 60fps scrolling with native driver when possible
 * 
 * Design System Compliance:
 * - Parallax layers: 3 (background, midground, foreground)
 * - Speeds: [0.1, 0.3, 0.5] (background slow, foreground faster)
 * - Opacities: [0.3, 0.6, 1] (background faint, foreground full opacity)
 * - Blur: [2, 1, 0] (background blurred, foreground sharp)
 * - Smoothness: 0.8 (smooth interpolation)
 * - Threshold: 50 pixels before effect starts
 */

import { Animated, Platform, ViewStyle, ScrollView, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { useRef, useCallback, useEffect, useMemo } from 'react';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Parallax layer configuration
 */
export interface ParallaxLayer {
  /** Parallax speed multiplier (0.1 = slow, 1 = normal) */
  speed: number;
  /** Layer opacity (0-1) */
  opacity: number;
  /** Blur amount in pixels */
  blur: number;
  /** Layer name identifier */
  name: string;
}

/**
 * Parallax scrolling configuration
 */
export interface ParallaxScrollingConfig {
  /** Array of parallax layers */
  layers: ParallaxLayer[];
  /** Animation smoothness (0-1) */
  smoothness: number;
  /** Scroll threshold in pixels before effect starts */
  threshold: number;
  /** Enable performance optimizations */
  optimizePerformance?: boolean;
  /** Disable animations for reduced motion */
  disableAnimations?: boolean;
  /** Maximum parallax effect */
  maxParallax?: number;
  /** Viewport height for calculations */
  viewportHeight?: number;
}

/**
 * Parallax scroll state
 */
export interface ParallaxScrollState {
  /** Current scroll position */
  scrollY: number;
  /** Parallax progress (0-1) */
  progress: number;
  /** Active layer transformations */
  layerTransforms: Record<string, ViewStyle>;
  /** Is parallax active */
  isActive: boolean;
}

/**
 * Parallax effect result
 */
export interface ParallaxEffectResult {
  /** Scroll event handler */
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  /** Get layer style for specific layer */
  getLayerStyle: (layerName: string) => ViewStyle;
  /** Get all layer styles */
  getAllLayerStyles: () => Record<string, ViewStyle>;
  /** Current scroll state */
  scrollState: ParallaxScrollState;
  /** Animation controls */
  animation: {
    /** Start parallax animation */
    start: () => void;
    /** Stop parallax animation */
    stop: () => void;
    /** Reset parallax state */
    reset: () => void;
  };
  /** Configuration used */
  config: ParallaxScrollingConfig;
}

/**
 * Parallax layer preset names
 */
export type ParallaxLayerPreset = 'background' | 'midground' | 'foreground';

/**
 * Performance optimization level
 */
export type ParallaxPerformanceLevel = 'low' | 'medium' | 'high';

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Default parallax layers (Design System specification)
 */
const DEFAULT_PARALLAX_LAYERS: ParallaxLayer[] = [
  { speed: 0.1, opacity: 0.3, blur: 2, name: 'background' },
  { speed: 0.3, opacity: 0.6, blur: 1, name: 'midground' },
  { speed: 0.5, opacity: 1, blur: 0, name: 'foreground' },
];

/**
 * Default parallax configuration
 */
const DEFAULT_PARALLAX_CONFIG: ParallaxScrollingConfig = {
  layers: DEFAULT_PARALLAX_LAYERS,
  smoothness: 0.8,
  threshold: 50,
  optimizePerformance: true,
  disableAnimations: false,
  maxParallax: 1000,
  viewportHeight: 800,
};

/**
 * Performance optimization settings
 */
const PERFORMANCE_SETTINGS = {
  low: {
    maxLayers: 2,
    reduceBlur: true,
    throttleMs: 100,
    useNativeDriver: false,
  },
  medium: {
    maxLayers: 3,
    reduceBlur: false,
    throttleMs: 16,
    useNativeDriver: true,
  },
  high: {
    maxLayers: 5,
    reduceBlur: false,
    throttleMs: 8,
    useNativeDriver: true,
  },
} as const;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Calculate parallax offset for a layer
 */
const calculateParallaxOffset = (
  scrollY: number,
  layerSpeed: number,
  threshold: number,
  smoothness: number,
  maxParallax: number
): number => {
  if (scrollY < threshold) return 0;
  
  const adjustedScrollY = scrollY - threshold;
  const baseOffset = adjustedScrollY * layerSpeed;
  const clampedOffset = Math.min(baseOffset, maxParallax);
  
  // Apply smoothness interpolation
  return clampedOffset * smoothness;
};

/**
 * Calculate layer opacity based on scroll position
 */
const calculateLayerOpacity = (
  scrollY: number,
  baseOpacity: number,
  threshold: number,
  layerSpeed: number
): number => {
  if (scrollY < threshold) return baseOpacity;
  
  const scrollProgress = (scrollY - threshold) / 500; // Fade over 500px
  const speedAdjustment = 1 - (layerSpeed * 0.3); // Faster layers fade less
  
  return Math.max(0.1, baseOpacity - (scrollProgress * speedAdjustment));
};

/**
 * Get optimized blur value for performance
 */
const getOptimizedBlur = (
  originalBlur: number,
  performanceLevel: ParallaxPerformanceLevel
): number => {
  const settings = PERFORMANCE_SETTINGS[performanceLevel];
  
  if (settings.reduceBlur && originalBlur > 0) {
    return Math.max(0, originalBlur * 0.5);
  }
  
  return originalBlur;
};

/**
 * Create layer transform style
 */
const createLayerTransform = (
  offset: number,
  opacity: number,
  blur: number,
  optimizedBlur: number
): ViewStyle => {
  const transform = [
    { translateY: -offset },
  ];
  
  const style: ViewStyle = {
    transform,
    opacity: Math.max(0, Math.min(1, opacity)),
  };
  
  // Add blur filter for web
  if (Platform.OS === 'web' && optimizedBlur > 0) {
    (style as any).filter = `blur(${optimizedBlur}px)`;
  }
  
  return style;
};

/**
 * Throttle function for performance optimization
 */
const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean;
  return function(this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// ============================================================================
// PARALLAX EFFECT CREATORS
// ============================================================================

/**
 * Create parallax scrolling effect
 */
const createParallaxScrolling = (
  config: Partial<ParallaxScrollingConfig> = {}
): ParallaxEffectResult => {
  const finalConfig = { ...DEFAULT_PARALLAX_CONFIG, ...config };
  
  // Animated values for each layer
  const layerAnimatedValues = useRef<Record<string, Animated.Value>>({});
  const scrollAnimatedValue = useRef(new Animated.Value(0)).current;
  const isAnimating = useRef(false);
  
  // Performance optimization
  const performanceLevel: ParallaxPerformanceLevel = finalConfig.optimizePerformance ? 'medium' : 'high';
  const settings = PERFORMANCE_SETTINGS[performanceLevel];
  
  // Initialize animated values for layers
  useEffect(() => {
    finalConfig.layers.forEach((layer) => {
      if (!layerAnimatedValues.current[layer.name]) {
        layerAnimatedValues.current[layer.name] = new Animated.Value(0);
      }
    });
  }, [finalConfig.layers]);
  
  // Current scroll state
  const scrollState = useRef<ParallaxScrollState>({
    scrollY: 0,
    progress: 0,
    layerTransforms: {},
    isActive: false,
  });
  
  // Update layer transforms
  const updateLayerTransforms = useCallback((scrollY: number) => {
    const newTransforms: Record<string, ViewStyle> = {};
    
    finalConfig.layers.forEach((layer) => {
      const parallaxOffset = calculateParallaxOffset(
        scrollY,
        layer.speed,
        finalConfig.threshold,
        finalConfig.smoothness,
        finalConfig.maxParallax || 1000
      );
      
      const layerOpacity = calculateLayerOpacity(
        scrollY,
        layer.opacity,
        finalConfig.threshold,
        layer.speed
      );
      
      const optimizedBlur = getOptimizedBlur(layer.blur, performanceLevel);
      
      newTransforms[layer.name] = createLayerTransform(
        parallaxOffset,
        layerOpacity,
        layer.blur,
        optimizedBlur
      );
    });
    
    scrollState.current.layerTransforms = newTransforms;
    scrollState.current.scrollY = scrollY;
    scrollState.current.progress = Math.min(1, Math.max(0, scrollY / finalConfig.threshold));
    scrollState.current.isActive = scrollY > finalConfig.threshold;
  }, [finalConfig.layers, finalConfig.threshold, finalConfig.smoothness, finalConfig.maxParallax, performanceLevel]);
  
  // Throttled update function
  const throttledUpdate = useMemo(
    () => throttle(updateLayerTransforms, settings.throttleMs),
    [updateLayerTransforms, settings.throttleMs]
  );
  
  // Scroll event handler
  const onScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    
    if (finalConfig.disableAnimations) {
      return;
    }
    
    // Update scroll animated value
    scrollAnimatedValue.setValue(scrollY);
    
    // Update layer transforms (throttled)
    throttledUpdate(scrollY);
    
    // Animate layer values
    if (settings.useNativeDriver && !isAnimating.current) {
      isAnimating.current = true;
      
      const animations = finalConfig.layers.map((layer) => {
        const layerValue = layerAnimatedValues.current[layer.name];
        if (!layerValue) return null;
        
        const parallaxOffset = calculateParallaxOffset(
          scrollY,
          layer.speed,
          finalConfig.threshold,
          finalConfig.smoothness,
          finalConfig.maxParallax || 1000
        );
        
        return Animated.timing(layerValue, {
          toValue: parallaxOffset,
          duration: 16, // 60fps
          useNativeDriver: settings.useNativeDriver,
        });
      }).filter(Boolean) as Animated.CompositeAnimation[];
      
      if (animations.length > 0) {
        Animated.parallel(animations).start(() => {
          isAnimating.current = false;
        });
      } else {
        isAnimating.current = false;
      }
    }
  }, [finalConfig.disableAnimations, finalConfig.layers, finalConfig.threshold, finalConfig.smoothness, finalConfig.maxParallax, settings.useNativeDriver, throttledUpdate]);
  
  // Get layer style function
  const getLayerStyle = useCallback((layerName: string): ViewStyle => {
    return scrollState.current.layerTransforms[layerName] || {};
  }, []);
  
  // Get all layer styles
  const getAllLayerStyles = useCallback((): Record<string, ViewStyle> => {
    return { ...scrollState.current.layerTransforms };
  }, []);
  
  // Animation controls
  const startAnimation = useCallback(() => {
    // Initialize transforms if needed
    if (Object.keys(scrollState.current.layerTransforms).length === 0) {
      updateLayerTransforms(0);
    }
  }, [updateLayerTransforms]);
  
  const stopAnimation = useCallback(() => {
    // Stop any running animations
    Object.values(layerAnimatedValues.current).forEach((animatedValue) => {
      animatedValue.stopAnimation();
    });
    scrollAnimatedValue.stopAnimation();
    isAnimating.current = false;
  }, []);
  
  const resetAnimation = useCallback(() => {
    stopAnimation();
    
    // Reset all animated values
    Object.values(layerAnimatedValues.current).forEach((animatedValue) => {
      animatedValue.setValue(0);
    });
    scrollAnimatedValue.setValue(0);
    
    // Reset scroll state
    scrollState.current = {
      scrollY: 0,
      progress: 0,
      layerTransforms: {},
      isActive: false,
    };
  }, [stopAnimation]);
  
  return {
    onScroll,
    getLayerStyle,
    getAllLayerStyles,
    scrollState: scrollState.current,
    animation: {
      start: startAnimation,
      stop: stopAnimation,
      reset: resetAnimation,
    },
    config: finalConfig,
  };
};

/**
 * Create simple parallax effect with default layers
 */
const createSimpleParallax = (
  customConfig: Partial<ParallaxScrollingConfig> = {}
): ParallaxEffectResult => {
  const config = { ...DEFAULT_PARALLAX_CONFIG, ...customConfig };
  return createParallaxScrolling(config);
};

/**
 * Create performance-optimized parallax
 */
const createOptimizedParallax = (
  customConfig: Partial<ParallaxScrollingConfig> = {}
): ParallaxEffectResult => {
  const config = {
    ...DEFAULT_PARALLAX_CONFIG,
    optimizePerformance: true,
    layers: DEFAULT_PARALLAX_LAYERS.slice(0, 2), // Only background and midground
    ...customConfig,
  };
  return createParallaxScrolling(config);
};

/**
 * Create custom parallax with specified layers
 */
const createCustomParallax = (
  layers: ParallaxLayer[],
  customConfig: Partial<ParallaxScrollingConfig> = {}
): ParallaxEffectResult => {
  const config = {
    ...DEFAULT_PARALLAX_CONFIG,
    layers,
    ...customConfig,
  };
  return createParallaxScrolling(config);
};

// ============================================================================
// PRESET PARALLAX EFFECTS
// ============================================================================

/**
 * Card parallax preset (Design System: interactiveCard)
 */
const createCardParallax = (
  customConfig: Partial<ParallaxScrollingConfig> = {}
): ParallaxEffectResult => {
  const cardLayers: ParallaxLayer[] = [
    { speed: 0.1, opacity: 0.3, blur: 2, name: 'background' },
    { speed: 0.5, opacity: 1, blur: 0, name: 'content' },
  ];
  
  const config = {
    layers: cardLayers,
    smoothness: 0.8,
    threshold: 50,
    ...customConfig,
  };
  
  return createParallaxScrolling(config);
};

/**
 * Hero section parallax preset
 */
const createHeroParallax = (
  customConfig: Partial<ParallaxScrollingConfig> = {}
): ParallaxEffectResult => {
  const heroLayers: ParallaxLayer[] = [
    { speed: 0.1, opacity: 0.2, blur: 3, name: 'background' },
    { speed: 0.3, opacity: 0.5, blur: 1, name: 'midground' },
    { speed: 0.7, opacity: 0.9, blur: 0, name: 'content' },
    { speed: 1.2, opacity: 1, blur: 0, name: 'foreground' },
  ];
  
  const config = {
    layers: heroLayers,
    smoothness: 0.9,
    threshold: 30,
    maxParallax: 1500,
    ...customConfig,
  };
  
  return createParallaxScrolling(config);
};

/**
 * Subtle parallax preset for performance
 */
const createSubtleParallax = (
  customConfig: Partial<ParallaxScrollingConfig> = {}
): ParallaxEffectResult => {
  const subtleLayers: ParallaxLayer[] = [
    { speed: 0.2, opacity: 0.4, blur: 1, name: 'background' },
    { speed: 0.8, opacity: 1, blur: 0, name: 'content' },
  ];
  
  const config = {
    layers: subtleLayers,
    smoothness: 0.6,
    threshold: 100,
    optimizePerformance: true,
    ...customConfig,
  };
  
  return createParallaxScrolling(config);
};

// ============================================================================
// ACCESSIBILITY SUPPORT
// ============================================================================

/**
 * Create accessible parallax (respects reduced motion preference)
 */
const createAccessibleParallax = (
  config: Partial<ParallaxScrollingConfig> = {},
  reducedMotion: boolean = false
): ParallaxEffectResult => {
  const accessibleConfig = {
    ...config,
    disableAnimations: reducedMotion,
    smoothness: reducedMotion ? 0 : (config.smoothness || 0.8),
  };
  
  if (reducedMotion) {
    // Provide static positioning for reduced motion
    accessibleConfig.layers = (config.layers || DEFAULT_PARALLAX_LAYERS).map(layer => ({
      ...layer,
      speed: 0, // No parallax movement
      blur: 0, // No blur effects
    }));
  }
  
  return createParallaxScrolling(accessibleConfig);
};

// ============================================================================
// PERFORMANCE UTILITIES
// ============================================================================

/**
 * Optimize parallax for device performance
 */
const optimizeParallaxForPerformance = (
  parallaxResult: ParallaxEffectResult,
  performanceLevel: ParallaxPerformanceLevel = 'medium'
): ParallaxEffectResult => {
  const settings = PERFORMANCE_SETTINGS[performanceLevel];
  const { config } = parallaxResult;
  
  // Optimize configuration
  const optimizedConfig = {
    ...config,
    layers: config.layers.slice(0, settings.maxLayers),
    optimizePerformance: true,
  };
  
  // Apply optimizations
  if (settings.reduceBlur) {
    optimizedConfig.layers = optimizedConfig.layers.map(layer => ({
      ...layer,
      blur: Math.max(0, layer.blur * 0.5),
    }));
  }
  
  return createParallaxScrolling(optimizedConfig);
};

/**
 * Create mobile-optimized parallax
 */
const createMobileOptimizedParallax = (
  customConfig: Partial<ParallaxScrollingConfig> = {}
): ParallaxEffectResult => {
  const mobileConfig = {
    ...DEFAULT_PARALLAX_CONFIG,
    layers: DEFAULT_PARALLAX_LAYERS.slice(0, 2), // Only 2 layers
    smoothness: 0.6, // Reduced smoothness for performance
    optimizePerformance: true,
    ...customConfig,
  };
  
  // Remove blur effects on mobile
  mobileConfig.layers = mobileConfig.layers.map(layer => ({
    ...layer,
    blur: 0,
  }));
  
  return createParallaxScrolling(mobileConfig);
};

// ============================================================================
// COMPONENT PRESETS
// ============================================================================

/**
 * Component-specific parallax presets
 */
const COMPONENT_PARALLAX_PRESETS = {
  card: () => createCardParallax(),
  hero: () => createHeroParallax(),
  subtle: () => createSubtleParallax(),
  mobile: () => createMobileOptimizedParallax(),
};

/**
 * Performance-specific parallax presets
 */
const PERFORMANCE_PARALLAX_PRESETS = {
  lowEnd: (config: Partial<ParallaxScrollingConfig> = {}) => 
    optimizeParallaxForPerformance(createParallaxScrolling(config), 'low'),
  medium: (config: Partial<ParallaxScrollingConfig> = {}) => 
    optimizeParallaxForPerformance(createParallaxScrolling(config), 'medium'),
  highEnd: (config: Partial<ParallaxScrollingConfig> = {}) => 
    optimizeParallaxForPerformance(createParallaxScrolling(config), 'high'),
};

// ============================================================================
// EXPORTS
// ============================================================================

export {
  // Main parallax creators
  createParallaxScrolling,
  createSimpleParallax,
  createOptimizedParallax,
  createCustomParallax,
  
  // Preset creators
  createCardParallax,
  createHeroParallax,
  createSubtleParallax,
  
  // Performance utilities
  optimizeParallaxForPerformance,
  createMobileOptimizedParallax,
  
  // Accessibility
  createAccessibleParallax,
  
  // Component presets
  COMPONENT_PARALLAX_PRESETS,
  PERFORMANCE_PARALLAX_PRESETS,
  
  // Utility functions
  calculateParallaxOffset,
  calculateLayerOpacity,
  
  // Constants
  DEFAULT_PARALLAX_CONFIG,
  DEFAULT_PARALLAX_LAYERS,
  PERFORMANCE_SETTINGS,
};
