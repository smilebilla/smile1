/**
 * Corp Astro UI Library - Slide Transition Presets
 * 
 * Comprehensive slide transition system for modals, navigation, and UI elements.
 * Provides directional slide animations with timing consistency and performance
 * optimization following Corp Astro's cosmic motion philosophy.
 * 
 * @module SlideTransitions
 * @version 1.0.0
 * @since 2024
 * 
 * UI Documentation Reference:
 * - Design System: Modal slide animations (slideUp 0.3s ease-out)
 * - Design System: Toast slide animations (slideInDown 0.3s ease-out, slideOutUp 0.2s ease-in)
 * - Motion Philosophy: Direction consistency, performance optimization
 * - Accessibility: Prefers-reduced-motion support
 */

import { Animated, Easing, Dimensions } from 'react-native';
import { useEffect, useRef } from 'react';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Slide transition direction
 */
export type SlideDirection = 
  | 'up'         // Slide up from bottom
  | 'down'       // Slide down from top
  | 'left'       // Slide left from right
  | 'right'      // Slide right from left
  | 'inUp'       // Slide in from bottom
  | 'inDown'     // Slide in from top
  | 'inLeft'     // Slide in from right
  | 'inRight'    // Slide in from left
  | 'outUp'      // Slide out to top
  | 'outDown'    // Slide out to bottom
  | 'outLeft'    // Slide out to left
  | 'outRight';  // Slide out to right

/**
 * Slide transition timing
 */
export type SlideTimingPreset = 
  | 'instant'    // 100ms - Quick micro-interactions
  | 'quick'      // 200ms - UI feedback
  | 'normal'     // 300ms - Standard modal/navigation
  | 'slow'       // 500ms - Emphasis transitions
  | 'gentle';    // 600ms - Smooth, gentle slides

/**
 * Slide transition configuration
 */
export interface SlideTransitionConfig {
  /** Transition direction */
  direction: SlideDirection;
  /** Transition duration in milliseconds */
  duration: number;
  /** Easing function */
  easing: (value: number) => number;
  /** Delay before animation starts */
  delay?: number;
  /** Distance for slide animation (defaults to screen dimension) */
  distance?: number;
  /** Whether to use native driver */
  useNativeDriver?: boolean;
  /** Animation completion callback */
  onComplete?: () => void;
}

/**
 * Slide animation result
 */
export interface SlideAnimationResult {
  /** Animated transform value */
  transform: Animated.Value;
  /** Animated opacity value (for fade-slide combinations) */
  opacity: Animated.Value;
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
    direction: SlideDirection;
  };
}

/**
 * Slide transition preset
 */
export interface SlideTransitionPreset {
  /** Preset name */
  name: string;
  /** Transition configuration */
  config: SlideTransitionConfig;
  /** Accessibility considerations */
  accessibility: {
    respectsReducedMotion: boolean;
    fallbackDuration: number;
  };
}

// ============================================================================
// SCREEN DIMENSIONS
// ============================================================================

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// ============================================================================
// TIMING PRESETS
// ============================================================================

/**
 * Instant slide timing (100ms)
 */
const INSTANT_TIMING = {
  duration: 100,
  easing: Easing.ease,
};

/**
 * Quick slide timing (200ms)
 */
const QUICK_TIMING = {
  duration: 200,
  easing: Easing.out(Easing.ease),
};

/**
 * Normal slide timing (300ms) - Design System standard
 */
const NORMAL_TIMING = {
  duration: 300,
  easing: Easing.out(Easing.ease),
};

/**
 * Slow slide timing (500ms)
 */
const SLOW_TIMING = {
  duration: 500,
  easing: Easing.bezier(0.4, 0, 0.2, 1),
};

/**
 * Gentle slide timing (600ms)
 */
const GENTLE_TIMING = {
  duration: 600,
  easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
};

/**
 * Get timing preset by name
 */
const getTimingPreset = (preset: SlideTimingPreset) => {
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
// SLIDE TRANSITION PRESETS
// ============================================================================

/**
 * Slide up preset - Standard modal entrance (Design System: slideUp 0.3s ease-out)
 */
const SLIDE_UP_PRESET: SlideTransitionPreset = {
  name: 'slideUp',
  config: {
    direction: 'up',
    duration: 300,
    easing: Easing.out(Easing.ease),
    delay: 0,
    useNativeDriver: true,
  },
  accessibility: {
    respectsReducedMotion: true,
    fallbackDuration: 150,
  },
};

/**
 * Slide down preset - Standard modal exit or top sheet entrance
 */
const SLIDE_DOWN_PRESET: SlideTransitionPreset = {
  name: 'slideDown',
  config: {
    direction: 'down',
    duration: 250,
    easing: Easing.in(Easing.ease),
    delay: 0,
    useNativeDriver: true,
  },
  accessibility: {
    respectsReducedMotion: true,
    fallbackDuration: 125,
  },
};

/**
 * Slide left preset - Navigation transitions
 */
const SLIDE_LEFT_PRESET: SlideTransitionPreset = {
  name: 'slideLeft',
  config: {
    direction: 'left',
    duration: 300,
    easing: Easing.out(Easing.ease),
    delay: 0,
    useNativeDriver: true,
  },
  accessibility: {
    respectsReducedMotion: true,
    fallbackDuration: 150,
  },
};

/**
 * Slide right preset - Navigation back transitions
 */
const SLIDE_RIGHT_PRESET: SlideTransitionPreset = {
  name: 'slideRight',
  config: {
    direction: 'right',
    duration: 300,
    easing: Easing.out(Easing.ease),
    delay: 0,
    useNativeDriver: true,
  },
  accessibility: {
    respectsReducedMotion: true,
    fallbackDuration: 150,
  },
};

/**
 * Slide in up preset - Enter from bottom
 */
const SLIDE_IN_UP_PRESET: SlideTransitionPreset = {
  name: 'slideInUp',
  config: {
    direction: 'inUp',
    duration: 300,
    easing: Easing.out(Easing.ease),
    delay: 0,
    useNativeDriver: true,
  },
  accessibility: {
    respectsReducedMotion: true,
    fallbackDuration: 150,
  },
};

/**
 * Slide in down preset - Enter from top (Design System: slideInDown 0.3s ease-out)
 */
const SLIDE_IN_DOWN_PRESET: SlideTransitionPreset = {
  name: 'slideInDown',
  config: {
    direction: 'inDown',
    duration: 300,
    easing: Easing.out(Easing.ease),
    delay: 0,
    useNativeDriver: true,
  },
  accessibility: {
    respectsReducedMotion: true,
    fallbackDuration: 150,
  },
};

/**
 * Slide in left preset - Enter from right
 */
const SLIDE_IN_LEFT_PRESET: SlideTransitionPreset = {
  name: 'slideInLeft',
  config: {
    direction: 'inLeft',
    duration: 300,
    easing: Easing.out(Easing.ease),
    delay: 0,
    useNativeDriver: true,
  },
  accessibility: {
    respectsReducedMotion: true,
    fallbackDuration: 150,
  },
};

/**
 * Slide in right preset - Enter from left
 */
const SLIDE_IN_RIGHT_PRESET: SlideTransitionPreset = {
  name: 'slideInRight',
  config: {
    direction: 'inRight',
    duration: 300,
    easing: Easing.out(Easing.ease),
    delay: 0,
    useNativeDriver: true,
  },
  accessibility: {
    respectsReducedMotion: true,
    fallbackDuration: 150,
  },
};

/**
 * Slide out up preset - Exit to top (Design System: slideOutUp 0.2s ease-in)
 */
const SLIDE_OUT_UP_PRESET: SlideTransitionPreset = {
  name: 'slideOutUp',
  config: {
    direction: 'outUp',
    duration: 200,
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
 * Slide out down preset - Exit to bottom
 */
const SLIDE_OUT_DOWN_PRESET: SlideTransitionPreset = {
  name: 'slideOutDown',
  config: {
    direction: 'outDown',
    duration: 200,
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
 * Slide out left preset - Exit to left
 */
const SLIDE_OUT_LEFT_PRESET: SlideTransitionPreset = {
  name: 'slideOutLeft',
  config: {
    direction: 'outLeft',
    duration: 200,
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
 * Slide out right preset - Exit to right
 */
const SLIDE_OUT_RIGHT_PRESET: SlideTransitionPreset = {
  name: 'slideOutRight',
  config: {
    direction: 'outRight',
    duration: 200,
    easing: Easing.in(Easing.ease),
    delay: 0,
    useNativeDriver: true,
  },
  accessibility: {
    respectsReducedMotion: true,
    fallbackDuration: 100,
  },
};

// ============================================================================
// COSMIC SLIDE PRESETS
// ============================================================================

/**
 * Cosmic slide up preset - Gentle cosmic timing for modal entrance
 */
const COSMIC_SLIDE_UP_PRESET: SlideTransitionPreset = {
  name: 'cosmicSlideUp',
  config: {
    direction: 'inUp',
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
 * Cosmic slide down preset - Gentle cosmic timing for modal exit
 */
const COSMIC_SLIDE_DOWN_PRESET: SlideTransitionPreset = {
  name: 'cosmicSlideDown',
  config: {
    direction: 'outDown',
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
 * Orbital slide preset - Orbital entry animation
 */
const ORBITAL_SLIDE_PRESET: SlideTransitionPreset = {
  name: 'orbitalSlide',
  config: {
    direction: 'inUp',
    duration: 600,
    easing: Easing.bezier(0.34, 1.56, 0.64, 1), // Orbital entry easing from Visual Language
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
 * Create slide transition animation
 */
const createSlideTransition = (config: SlideTransitionConfig): SlideAnimationResult => {
  const transform = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);
  const stateRef = useRef({
    isAnimating: false,
    isVisible: true,
    direction: config.direction,
  });

  const getTransformDistance = (direction: SlideDirection, customDistance?: number) => {
    if (customDistance !== undefined) {
      return customDistance;
    }
    
    switch (direction) {
      case 'up':
      case 'inUp':
      case 'outUp':
        return SCREEN_HEIGHT;
      case 'down':
      case 'inDown':
      case 'outDown':
        return SCREEN_HEIGHT;
      case 'left':
      case 'inLeft':
      case 'outLeft':
        return SCREEN_WIDTH;
      case 'right':
      case 'inRight':
      case 'outRight':
        return SCREEN_WIDTH;
      default:
        return SCREEN_HEIGHT;
    }
  };

  const getInitialTransformValue = (direction: SlideDirection, distance: number) => {
    const isEntering = direction.includes('in') || (!direction.includes('in') && !direction.includes('out'));
    
    if (!isEntering) {
      return 0; // Start from original position for exit animations
    }
    
    switch (direction) {
      case 'up':
      case 'inUp':
        return distance; // Start from bottom
      case 'down':
      case 'inDown':
        return -distance; // Start from top
      case 'left':
      case 'inLeft':
        return distance; // Start from right
      case 'right':
      case 'inRight':
        return -distance; // Start from left
      default:
        return 0;
    }
  };

  const getTargetTransformValue = (direction: SlideDirection, distance: number) => {
    const isEntering = direction.includes('in') || (!direction.includes('in') && !direction.includes('out'));
    
    if (isEntering) {
      return 0; // End at original position for entrance animations
    }
    
    switch (direction) {
      case 'up':
      case 'outUp':
        return -distance; // Exit to top
      case 'down':
      case 'outDown':
        return distance; // Exit to bottom
      case 'left':
      case 'outLeft':
        return -distance; // Exit to left
      case 'right':
      case 'outRight':
        return distance; // Exit to right
      default:
        return 0;
    }
  };

  const getTransformStyle = (direction: SlideDirection, value: Animated.Value) => {
    if (direction.includes('Up') || direction.includes('Down') || direction === 'up' || direction === 'down') {
      return { translateY: value };
    } else if (direction.includes('Left') || direction.includes('Right') || direction === 'left' || direction === 'right') {
      return { translateX: value };
    }
    return { translateY: value };
  };

  const distance = getTransformDistance(config.direction, config.distance);
  const initialValue = getInitialTransformValue(config.direction, distance);
  
  // Set initial transform value
  useEffect(() => {
    transform.setValue(initialValue);
    
    // Set initial opacity for entering animations
    const isEntering = config.direction.includes('in') || (!config.direction.includes('in') && !config.direction.includes('out'));
    if (isEntering) {
      opacity.setValue(0);
      stateRef.current.isVisible = false;
    } else {
      opacity.setValue(1);
      stateRef.current.isVisible = true;
    }
  }, []);

  const controls = {
    start: () => {
      if (stateRef.current.isAnimating) return;
      
      stateRef.current.isAnimating = true;
      
      const isEntering = config.direction.includes('in') || (!config.direction.includes('in') && !config.direction.includes('out'));
      const targetTransform = getTargetTransformValue(config.direction, distance);
      const targetOpacity = isEntering ? 1 : 0;
      
      const animations = [
        Animated.timing(transform, {
          toValue: targetTransform,
          duration: config.duration,
          easing: config.easing,
          delay: config.delay,
          useNativeDriver: config.useNativeDriver ?? true,
        }),
        Animated.timing(opacity, {
          toValue: targetOpacity,
          duration: config.duration,
          easing: config.easing,
          delay: config.delay,
          useNativeDriver: config.useNativeDriver ?? true,
        }),
      ];
      
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
      transform.setValue(initialValue);
      const isEntering = config.direction.includes('in') || (!config.direction.includes('in') && !config.direction.includes('out'));
      opacity.setValue(isEntering ? 0 : 1);
      stateRef.current.isVisible = !isEntering;
    },
  };

  return {
    transform,
    opacity,
    controls,
    state: stateRef.current,
  };
};

/**
 * Create custom slide transition
 */
const createCustomSlideTransition = (
  direction: SlideDirection,
  duration: number,
  easing?: (value: number) => number,
  options?: Partial<SlideTransitionConfig>
): SlideAnimationResult => {
  const config: SlideTransitionConfig = {
    direction,
    duration,
    easing: easing || Easing.out(Easing.ease),
    delay: options?.delay || 0,
    distance: options?.distance,
    useNativeDriver: options?.useNativeDriver ?? true,
    onComplete: options?.onComplete,
  };
  
  return createSlideTransition(config);
};

/**
 * Get slide transition preset
 */
const getSlideTransitionPreset = (presetName: string): SlideTransitionPreset | null => {
  const presets = {
    slideUp: SLIDE_UP_PRESET,
    slideDown: SLIDE_DOWN_PRESET,
    slideLeft: SLIDE_LEFT_PRESET,
    slideRight: SLIDE_RIGHT_PRESET,
    slideInUp: SLIDE_IN_UP_PRESET,
    slideInDown: SLIDE_IN_DOWN_PRESET,
    slideInLeft: SLIDE_IN_LEFT_PRESET,
    slideInRight: SLIDE_IN_RIGHT_PRESET,
    slideOutUp: SLIDE_OUT_UP_PRESET,
    slideOutDown: SLIDE_OUT_DOWN_PRESET,
    slideOutLeft: SLIDE_OUT_LEFT_PRESET,
    slideOutRight: SLIDE_OUT_RIGHT_PRESET,
    cosmicSlideUp: COSMIC_SLIDE_UP_PRESET,
    cosmicSlideDown: COSMIC_SLIDE_DOWN_PRESET,
    orbitalSlide: ORBITAL_SLIDE_PRESET,
  };
  
  return presets[presetName as keyof typeof presets] || null;
};

/**
 * Create slide transition from preset
 */
const createSlideTransitionFromPreset = (
  presetName: string,
  overrides?: Partial<SlideTransitionConfig>
): SlideAnimationResult | null => {
  const preset = getSlideTransitionPreset(presetName);
  if (!preset) return null;
  
  const config = {
    ...preset.config,
    ...overrides,
  };
  
  return createSlideTransition(config);
};

/**
 * Create accessible slide transition
 */
const createAccessibleSlideTransition = (
  config: SlideTransitionConfig,
  respectsReducedMotion: boolean = true
): SlideAnimationResult => {
  const accessibleConfig = {
    ...config,
    duration: respectsReducedMotion ? Math.min(config.duration, 200) : config.duration,
    easing: respectsReducedMotion ? Easing.ease : config.easing,
  };
  
  return createSlideTransition(accessibleConfig);
};

// ============================================================================
// MODAL SLIDE UTILITIES
// ============================================================================

/**
 * Create modal slide up animation (Design System standard)
 */
const createModalSlideUp = (
  duration: number = 300,
  delay: number = 0,
  onComplete?: () => void
): SlideAnimationResult => {
  return createCustomSlideTransition('inUp', duration, Easing.out(Easing.ease), {
    delay,
    onComplete,
  });
};

/**
 * Create modal slide down animation (exit)
 */
const createModalSlideDown = (
  duration: number = 250,
  delay: number = 0,
  onComplete?: () => void
): SlideAnimationResult => {
  return createCustomSlideTransition('outDown', duration, Easing.in(Easing.ease), {
    delay,
    onComplete,
  });
};

// ============================================================================
// NAVIGATION SLIDE UTILITIES
// ============================================================================

/**
 * Create navigation slide left animation (forward)
 */
const createNavigationSlideLeft = (
  duration: number = 300,
  delay: number = 0,
  onComplete?: () => void
): SlideAnimationResult => {
  return createCustomSlideTransition('inLeft', duration, Easing.out(Easing.ease), {
    delay,
    onComplete,
  });
};

/**
 * Create navigation slide right animation (back)
 */
const createNavigationSlideRight = (
  duration: number = 300,
  delay: number = 0,
  onComplete?: () => void
): SlideAnimationResult => {
  return createCustomSlideTransition('inRight', duration, Easing.out(Easing.ease), {
    delay,
    onComplete,
  });
};

// ============================================================================
// TOAST SLIDE UTILITIES
// ============================================================================

/**
 * Create toast slide in down animation (Design System: slideInDown 0.3s ease-out)
 */
const createToastSlideInDown = (
  duration: number = 300,
  delay: number = 0,
  onComplete?: () => void
): SlideAnimationResult => {
  return createCustomSlideTransition('inDown', duration, Easing.out(Easing.ease), {
    delay,
    onComplete,
    distance: 100, // Reduced distance for toast
  });
};

/**
 * Create toast slide out up animation (Design System: slideOutUp 0.2s ease-in)
 */
const createToastSlideOutUp = (
  duration: number = 200,
  delay: number = 0,
  onComplete?: () => void
): SlideAnimationResult => {
  return createCustomSlideTransition('outUp', duration, Easing.in(Easing.ease), {
    delay,
    onComplete,
    distance: 100, // Reduced distance for toast
  });
};

// ============================================================================
// STAGGERED SLIDE UTILITIES
// ============================================================================

/**
 * Create staggered slide in animation
 */
const createStaggeredSlideIn = (
  count: number,
  direction: SlideDirection = 'inUp',
  baseDelay: number = 0,
  staggerDelay: number = 100,
  duration: number = 300
): SlideAnimationResult[] => {
  const animations: SlideAnimationResult[] = [];
  
  for (let i = 0; i < count; i++) {
    const delay = baseDelay + (i * staggerDelay);
    animations.push(
      createCustomSlideTransition(direction, duration, Easing.out(Easing.ease), { delay })
    );
  }
  
  return animations;
};

/**
 * Create sequence slide animation
 */
const createSequenceSlideAnimation = (
  directions: SlideDirection[],
  duration: number = 300,
  gap: number = 0
): SlideAnimationResult[] => {
  const animations: SlideAnimationResult[] = [];
  let cumulativeDelay = 0;
  
  directions.forEach(direction => {
    animations.push(
      createCustomSlideTransition(direction, duration, Easing.out(Easing.ease), {
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
  SLIDE_UP_PRESET,
  SLIDE_DOWN_PRESET,
  SLIDE_LEFT_PRESET,
  SLIDE_RIGHT_PRESET,
  SLIDE_IN_UP_PRESET,
  SLIDE_IN_DOWN_PRESET,
  SLIDE_IN_LEFT_PRESET,
  SLIDE_IN_RIGHT_PRESET,
  SLIDE_OUT_UP_PRESET,
  SLIDE_OUT_DOWN_PRESET,
  SLIDE_OUT_LEFT_PRESET,
  SLIDE_OUT_RIGHT_PRESET,
  COSMIC_SLIDE_UP_PRESET,
  COSMIC_SLIDE_DOWN_PRESET,
  ORBITAL_SLIDE_PRESET,
  
  // Utility functions
  createSlideTransition,
  createCustomSlideTransition,
  getSlideTransitionPreset,
  createSlideTransitionFromPreset,
  createAccessibleSlideTransition,
  getTimingPreset,
  
  // Modal utilities
  createModalSlideUp,
  createModalSlideDown,
  
  // Navigation utilities
  createNavigationSlideLeft,
  createNavigationSlideRight,
  
  // Toast utilities
  createToastSlideInDown,
  createToastSlideOutUp,
  
  // Staggered utilities
  createStaggeredSlideIn,
  createSequenceSlideAnimation,
};
