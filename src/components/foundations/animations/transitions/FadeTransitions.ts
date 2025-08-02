/**
 * Corp Astro UI Library - Fade Transition Presets
 * 
 * Comprehensive fade transition system for smooth, accessible animations.
 * Provides fade in/out variants with various timings, easing functions, and
 * directional options that align with Corp Astro's cosmic motion philosophy.
 * 
 * @module FadeTransitions
 * @version 1.0.0
 * @since 2024
 * 
 * UI Documentation Reference:
 * - Design System: Fade animations (fadeIn 0.3s ease-out, fadeInUp 0.2s ease-out)
 * - Motion Philosophy: Smooth transitions, accessibility (minimum 200ms)
 * - Transition specifications: cubic-bezier timings, direction consistency
 * - Accessibility: Prefers-reduced-motion support
 */

import { Animated, Easing } from 'react-native';
import { useEffect, useRef } from 'react';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Fade transition direction
 */
export type FadeDirection = 
  | 'in'         // Fade in from transparent
  | 'out'        // Fade out to transparent
  | 'inUp'       // Fade in from bottom
  | 'inDown'     // Fade in from top
  | 'inLeft'     // Fade in from right
  | 'inRight'    // Fade in from left
  | 'outUp'      // Fade out to top
  | 'outDown'    // Fade out to bottom
  | 'outLeft'    // Fade out to left
  | 'outRight';  // Fade out to right

/**
 * Fade transition timing
 */
export type FadeTimingPreset = 
  | 'instant'    // 100ms - Micro-interactions
  | 'quick'      // 200ms - UI feedback
  | 'normal'     // 300ms - Standard transitions
  | 'slow'       // 500ms - Emphasis transitions
  | 'gentle';    // 800ms - Subtle transitions

/**
 * Fade transition configuration
 */
export interface FadeTransitionConfig {
  /** Transition direction */
  direction: FadeDirection;
  /** Transition duration in milliseconds */
  duration: number;
  /** Easing function */
  easing: (value: number) => number;
  /** Delay before animation starts */
  delay?: number;
  /** Distance for directional fades */
  distance?: number;
  /** Whether to use native driver */
  useNativeDriver?: boolean;
  /** Animation completion callback */
  onComplete?: () => void;
}

/**
 * Fade animation result
 */
export interface FadeAnimationResult {
  /** Animated opacity value */
  opacity: Animated.Value;
  /** Animated transform value */
  transform: Animated.Value;
  /** Animation controls */
  controls: {
    start: () => void;
    stop: () => void;
    reset: () => void;
  };
  /** Current animation state */
  state: {
    isAnimating: boolean;
    isVisible: boolean;
    direction: FadeDirection;
  };
}

/**
 * Fade transition preset
 */
export interface FadeTransitionPreset {
  /** Preset name */
  name: string;
  /** Transition configuration */
  config: FadeTransitionConfig;
  /** Accessibility considerations */
  accessibility: {
    respectsReducedMotion: boolean;
    fallbackDuration: number;
  };
}

// ============================================================================
// TIMING PRESETS
// ============================================================================

/**
 * Instant fade timing (100ms)
 */
const INSTANT_TIMING = {
  duration: 100,
  easing: Easing.ease,
};

/**
 * Quick fade timing (200ms)
 */
const QUICK_TIMING = {
  duration: 200,
  easing: Easing.out(Easing.ease),
};

/**
 * Normal fade timing (300ms)
 */
const NORMAL_TIMING = {
  duration: 300,
  easing: Easing.out(Easing.ease),
};

/**
 * Slow fade timing (500ms)
 */
const SLOW_TIMING = {
  duration: 500,
  easing: Easing.bezier(0.4, 0, 0.2, 1),
};

/**
 * Gentle fade timing (800ms)
 */
const GENTLE_TIMING = {
  duration: 800,
  easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
};

/**
 * Get timing preset by name
 */
const getTimingPreset = (preset: FadeTimingPreset) => {
  switch (preset) {
    case 'instant':
      return INSTANT_TIMING;
    case 'quick':
      return QUICK_TIMING;
    case 'normal':
      return NORMAL_TIMING;
    case 'slow':
      return SLOW_TIMING;
    case 'gentle':
      return GENTLE_TIMING;
    default:
      return NORMAL_TIMING;
  }
};

// ============================================================================
// FADE TRANSITION PRESETS
// ============================================================================

/**
 * Fade in preset - Standard fade in from transparent
 */
const FADE_IN_PRESET: FadeTransitionPreset = {
  name: 'fadeIn',
  config: {
    direction: 'in',
    duration: 300,
    easing: Easing.out(Easing.ease),
    delay: 0,
    useNativeDriver: true,
  },
  accessibility: {
    respectsReducedMotion: true,
    fallbackDuration: 100,
  },
};

/**
 * Fade out preset - Standard fade out to transparent
 */
const FADE_OUT_PRESET: FadeTransitionPreset = {
  name: 'fadeOut',
  config: {
    direction: 'out',
    duration: 250,
    easing: Easing.in(Easing.ease),
    delay: 0,
    useNativeDriver: true,
  },
  accessibility: {
    respectsReducedMotion: true,
    fallbackDuration: 100,
  },
};

/**
 * Fade in up preset - Fade in from bottom (Design System spec)
 */
const FADE_IN_UP_PRESET: FadeTransitionPreset = {
  name: 'fadeInUp',
  config: {
    direction: 'inUp',
    duration: 200,
    easing: Easing.out(Easing.ease),
    delay: 0,
    distance: 20,
    useNativeDriver: true,
  },
  accessibility: {
    respectsReducedMotion: true,
    fallbackDuration: 100,
  },
};

/**
 * Fade out down preset - Fade out to bottom (Design System spec)
 */
const FADE_OUT_DOWN_PRESET: FadeTransitionPreset = {
  name: 'fadeOutDown',
  config: {
    direction: 'outDown',
    duration: 150,
    easing: Easing.in(Easing.ease),
    delay: 0,
    distance: 20,
    useNativeDriver: true,
  },
  accessibility: {
    respectsReducedMotion: true,
    fallbackDuration: 100,
  },
};

/**
 * Fade in down preset - Fade in from top
 */
const FADE_IN_DOWN_PRESET: FadeTransitionPreset = {
  name: 'fadeInDown',
  config: {
    direction: 'inDown',
    duration: 300,
    easing: Easing.out(Easing.ease),
    delay: 0,
    distance: 30,
    useNativeDriver: true,
  },
  accessibility: {
    respectsReducedMotion: true,
    fallbackDuration: 100,
  },
};

/**
 * Fade out up preset - Fade out to top
 */
const FADE_OUT_UP_PRESET: FadeTransitionPreset = {
  name: 'fadeOutUp',
  config: {
    direction: 'outUp',
    duration: 200,
    easing: Easing.in(Easing.ease),
    delay: 0,
    distance: 30,
    useNativeDriver: true,
  },
  accessibility: {
    respectsReducedMotion: true,
    fallbackDuration: 100,
  },
};

/**
 * Fade in left preset - Fade in from right
 */
const FADE_IN_LEFT_PRESET: FadeTransitionPreset = {
  name: 'fadeInLeft',
  config: {
    direction: 'inLeft',
    duration: 300,
    easing: Easing.out(Easing.ease),
    delay: 0,
    distance: 30,
    useNativeDriver: true,
  },
  accessibility: {
    respectsReducedMotion: true,
    fallbackDuration: 100,
  },
};

/**
 * Fade out left preset - Fade out to left
 */
const FADE_OUT_LEFT_PRESET: FadeTransitionPreset = {
  name: 'fadeOutLeft',
  config: {
    direction: 'outLeft',
    duration: 250,
    easing: Easing.in(Easing.ease),
    delay: 0,
    distance: 30,
    useNativeDriver: true,
  },
  accessibility: {
    respectsReducedMotion: true,
    fallbackDuration: 100,
  },
};

/**
 * Fade in right preset - Fade in from left
 */
const FADE_IN_RIGHT_PRESET: FadeTransitionPreset = {
  name: 'fadeInRight',
  config: {
    direction: 'inRight',
    duration: 300,
    easing: Easing.out(Easing.ease),
    delay: 0,
    distance: 30,
    useNativeDriver: true,
  },
  accessibility: {
    respectsReducedMotion: true,
    fallbackDuration: 100,
  },
};

/**
 * Fade out right preset - Fade out to right
 */
const FADE_OUT_RIGHT_PRESET: FadeTransitionPreset = {
  name: 'fadeOutRight',
  config: {
    direction: 'outRight',
    duration: 250,
    easing: Easing.in(Easing.ease),
    delay: 0,
    distance: 30,
    useNativeDriver: true,
  },
  accessibility: {
    respectsReducedMotion: true,
    fallbackDuration: 100,
  },
};

// ============================================================================
// COSMIC FADE PRESETS
// ============================================================================

/**
 * Cosmic fade in preset - Gentle fade with cosmic timing
 */
const COSMIC_FADE_IN_PRESET: FadeTransitionPreset = {
  name: 'cosmicFadeIn',
  config: {
    direction: 'in',
    duration: 600,
    easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
    delay: 0,
    useNativeDriver: true,
  },
  accessibility: {
    respectsReducedMotion: true,
    fallbackDuration: 200,
  },
};

/**
 * Cosmic fade out preset - Gentle fade with cosmic timing
 */
const COSMIC_FADE_OUT_PRESET: FadeTransitionPreset = {
  name: 'cosmicFadeOut',
  config: {
    direction: 'out',
    duration: 500,
    easing: Easing.bezier(0.4, 0, 0.2, 1),
    delay: 0,
    useNativeDriver: true,
  },
  accessibility: {
    respectsReducedMotion: true,
    fallbackDuration: 200,
  },
};

/**
 * Stardust fade in preset - Twinkling appearance
 */
const STARDUST_FADE_IN_PRESET: FadeTransitionPreset = {
  name: 'stardustFadeIn',
  config: {
    direction: 'in',
    duration: 800,
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
    delay: 0,
    useNativeDriver: true,
  },
  accessibility: {
    respectsReducedMotion: true,
    fallbackDuration: 200,
  },
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Create fade transition animation
 */
const createFadeTransition = (config: FadeTransitionConfig): FadeAnimationResult => {
  const opacity = useRef(new Animated.Value(config.direction.includes('in') ? 0 : 1)).current;
  const transform = useRef(new Animated.Value(0)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);
  const stateRef = useRef({
    isAnimating: false,
    isVisible: config.direction.includes('in') ? false : true,
    direction: config.direction,
  });

  const getTransformValue = (direction: FadeDirection, distance: number = 20) => {
    switch (direction) {
      case 'inUp':
        return distance;
      case 'inDown':
        return -distance;
      case 'inLeft':
        return distance;
      case 'inRight':
        return -distance;
      case 'outUp':
        return -distance;
      case 'outDown':
        return distance;
      case 'outLeft':
        return -distance;
      case 'outRight':
        return distance;
      default:
        return 0;
    }
  };

  const getTransformStyle = (direction: FadeDirection, value: Animated.Value) => {
    if (direction.includes('Up') || direction.includes('Down')) {
      return { translateY: value };
    } else if (direction.includes('Left') || direction.includes('Right')) {
      return { translateX: value };
    }
    return {};
  };

  const controls = {
    start: () => {
      if (stateRef.current.isAnimating) return;
      
      stateRef.current.isAnimating = true;
      
      const isEntering = config.direction.includes('in');
      const targetOpacity = isEntering ? 1 : 0;
      const targetTransform = isEntering ? 0 : getTransformValue(config.direction, config.distance);
      
      // Set initial values for entering animations
      if (isEntering) {
        opacity.setValue(0);
        transform.setValue(getTransformValue(config.direction, config.distance));
      }
      
      const animations = [
        Animated.timing(opacity, {
          toValue: targetOpacity,
          duration: config.duration,
          easing: config.easing,
          delay: config.delay,
          useNativeDriver: config.useNativeDriver ?? true,
        }),
      ];
      
      // Add transform animation for directional fades
      if (config.direction !== 'in' && config.direction !== 'out') {
        animations.push(
          Animated.timing(transform, {
            toValue: targetTransform,
            duration: config.duration,
            easing: config.easing,
            delay: config.delay,
            useNativeDriver: config.useNativeDriver ?? true,
          })
        );
      }
      
      animationRef.current = Animated.parallel(animations);
      
      animationRef.current.start(({ finished }) => {
        if (finished) {
          stateRef.current.isAnimating = false;
          stateRef.current.isVisible = isEntering;
          config.onComplete?.();
        }
      });
    },
    
    stop: () => {
      if (animationRef.current) {
        animationRef.current.stop();
        stateRef.current.isAnimating = false;
      }
    },
    
    reset: () => {
      controls.stop();
      const isEntering = config.direction.includes('in');
      opacity.setValue(isEntering ? 0 : 1);
      transform.setValue(isEntering ? getTransformValue(config.direction, config.distance) : 0);
      stateRef.current.isVisible = !isEntering;
    },
  };

  return {
    opacity,
    transform,
    controls,
    state: stateRef.current,
  };
};

/**
 * Create custom fade transition
 */
const createCustomFadeTransition = (
  direction: FadeDirection,
  duration: number,
  easing?: (value: number) => number,
  options?: Partial<FadeTransitionConfig>
): FadeAnimationResult => {
  const config: FadeTransitionConfig = {
    direction,
    duration,
    easing: easing || Easing.out(Easing.ease),
    delay: options?.delay || 0,
    distance: options?.distance || 20,
    useNativeDriver: options?.useNativeDriver ?? true,
    onComplete: options?.onComplete,
  };
  
  return createFadeTransition(config);
};

/**
 * Get fade transition preset
 */
const getFadeTransitionPreset = (presetName: string): FadeTransitionPreset | null => {
  const presets = {
    fadeIn: FADE_IN_PRESET,
    fadeOut: FADE_OUT_PRESET,
    fadeInUp: FADE_IN_UP_PRESET,
    fadeOutDown: FADE_OUT_DOWN_PRESET,
    fadeInDown: FADE_IN_DOWN_PRESET,
    fadeOutUp: FADE_OUT_UP_PRESET,
    fadeInLeft: FADE_IN_LEFT_PRESET,
    fadeOutLeft: FADE_OUT_LEFT_PRESET,
    fadeInRight: FADE_IN_RIGHT_PRESET,
    fadeOutRight: FADE_OUT_RIGHT_PRESET,
    cosmicFadeIn: COSMIC_FADE_IN_PRESET,
    cosmicFadeOut: COSMIC_FADE_OUT_PRESET,
    stardustFadeIn: STARDUST_FADE_IN_PRESET,
  };
  
  return presets[presetName as keyof typeof presets] || null;
};

/**
 * Create fade transition from preset
 */
const createFadeTransitionFromPreset = (
  presetName: string,
  overrides?: Partial<FadeTransitionConfig>
): FadeAnimationResult | null => {
  const preset = getFadeTransitionPreset(presetName);
  if (!preset) return null;
  
  const config = {
    ...preset.config,
    ...overrides,
  };
  
  return createFadeTransition(config);
};

/**
 * Create accessible fade transition
 */
const createAccessibleFadeTransition = (
  config: FadeTransitionConfig,
  respectsReducedMotion: boolean = true
): FadeAnimationResult => {
  // In a real app, you'd check the user's motion preference
  // For now, we'll just reduce duration if respectsReducedMotion is true
  const accessibleConfig = {
    ...config,
    duration: respectsReducedMotion ? Math.min(config.duration, 200) : config.duration,
    easing: respectsReducedMotion ? Easing.ease : config.easing,
  };
  
  return createFadeTransition(accessibleConfig);
};

// ============================================================================
// BATCH ANIMATIONS
// ============================================================================

/**
 * Create staggered fade in animation
 */
const createStaggeredFadeIn = (
  count: number,
  baseDelay: number = 0,
  staggerDelay: number = 100,
  duration: number = 300
): FadeAnimationResult[] => {
  const animations: FadeAnimationResult[] = [];
  
  for (let i = 0; i < count; i++) {
    const delay = baseDelay + (i * staggerDelay);
    animations.push(
      createCustomFadeTransition('in', duration, Easing.out(Easing.ease), { delay })
    );
  }
  
  return animations;
};

/**
 * Create sequence fade animation
 */
const createSequenceFadeAnimation = (
  directions: FadeDirection[],
  duration: number = 300,
  gap: number = 0
): FadeAnimationResult[] => {
  const animations: FadeAnimationResult[] = [];
  let cumulativeDelay = 0;
  
  directions.forEach(direction => {
    animations.push(
      createCustomFadeTransition(direction, duration, Easing.out(Easing.ease), {
        delay: cumulativeDelay,
      })
    );
    cumulativeDelay += duration + gap;
  });
  
  return animations;
};

// ============================================================================
// EXPORTS
// ============================================================================

export {
  // Presets
  FADE_IN_PRESET,
  FADE_OUT_PRESET,
  FADE_IN_UP_PRESET,
  FADE_OUT_DOWN_PRESET,
  FADE_IN_DOWN_PRESET,
  FADE_OUT_UP_PRESET,
  FADE_IN_LEFT_PRESET,
  FADE_OUT_LEFT_PRESET,
  FADE_IN_RIGHT_PRESET,
  FADE_OUT_RIGHT_PRESET,
  COSMIC_FADE_IN_PRESET,
  COSMIC_FADE_OUT_PRESET,
  STARDUST_FADE_IN_PRESET,
  
  // Utility functions
  createFadeTransition,
  createCustomFadeTransition,
  getFadeTransitionPreset,
  createFadeTransitionFromPreset,
  createAccessibleFadeTransition,
  createStaggeredFadeIn,
  createSequenceFadeAnimation,
  getTimingPreset,
};
