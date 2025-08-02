/**
 * Corp Astro UI Library - Pulse Animation System
 * 
 * Comprehensive pulse animation system for breathing life into Corp Astro UI components.
 * Provides scale, opacity, and glow pulsing effects with precise timing control and
 * accessibility support, perfectly aligned with Corp Astro's cosmic motion philosophy.
 * 
 * @module PulseAnimation
 * @version 1.0.0
 * @since 2024
 * 
 * UI Documentation Reference:
 * - Design System: Glow Effects pulse: keyframes: '0%': opacity: 0.5, scale: 1, '50%': opacity: 1, scale: 1.05, '100%': opacity: 0.5, scale: 1
 * - Duration: '3s', timing: 'ease-in-out', iterations: 'infinite'
 * - Loading States: pulse: size: 40, color: '#54A0FF', animation: 'pulse 1.5s ease-in-out infinite'
 * - Orbital Rings: pulse: keyframes: '0%': opacity: 0.3, '50%': opacity: 0.6, '100%': opacity: 0.3, duration: '4s', timing: 'ease-in-out', iterations: 'infinite'
 * - FAB Animation: 'pulse-glow 2s ease-in-out infinite'
 * - Interactive Card: 'glow-pulse 3s ease-in-out infinite'
 * - Avatar: 'pulse 2s ease-in-out infinite'
 * 
 * Design System Compliance:
 * - Consistent timing presets (1.5s, 2s, 3s, 4s)
 * - Accessibility support with reduced motion
 * - Performance optimizations for smooth animations
 * - Proper cleanup and memory management
 * - Scale ranges: 1.00 to 1.05 for subtle effects
 * - Opacity ranges: 0.3 to 1.0 for various contexts
 * - Easing: 'ease-in-out' for natural breathing motion
 */

import { Animated, ViewStyle } from 'react-native';
import { useRef, useEffect, useCallback } from 'react';
import { SignatureBlues } from '../tokens/colors/SignatureBlues';
import { RoyalPurples } from '../tokens/colors/RoyalPurples';
import { LuxuryGolds } from '../tokens/colors/LuxuryGolds';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * Pulse animation types
 */
export type PulseType = 'scale' | 'opacity' | 'glow' | 'combined';

/**
 * Pulse timing presets
 */
export type PulseTimingPreset = 'quick' | 'normal' | 'slow' | 'cosmic';

/**
 * Pulse intensity levels
 */
export type PulseIntensity = 'subtle' | 'moderate' | 'strong';

/**
 * Pulse animation configuration
 */
export interface PulseAnimationConfig {
  /** Animation type */
  type: PulseType;
  /** Duration in milliseconds */
  duration: number;
  /** Timing preset */
  timing: PulseTimingPreset;
  /** Pulse intensity */
  intensity: PulseIntensity;
  /** Minimum scale value */
  minScale: number;
  /** Maximum scale value */
  maxScale: number;
  /** Minimum opacity value */
  minOpacity: number;
  /** Maximum opacity value */
  maxOpacity: number;
  /** Glow color */
  glowColor: string;
  /** Glow blur radius */
  glowBlur: number;
  /** Glow spread */
  glowSpread: number;
  /** Auto-start animation */
  autoStart: boolean;
  /** Iteration count (-1 for infinite) */
  iterations: number;
  /** Animation delay */
  delay: number;
  /** Use native driver */
  useNativeDriver: boolean;
}

/**
 * Pulse animation state
 */
export interface PulseAnimationState {
  /** Current scale value */
  scale: number;
  /** Current opacity value */
  opacity: number;
  /** Current glow intensity */
  glowIntensity: number;
  /** Is animation running */
  isRunning: boolean;
  /** Current iteration */
  iteration: number;
}

/**
 * Pulse animation result
 */
export interface PulseAnimationResult {
  /** Animated style object */
  style: ViewStyle;
  /** Animation controls */
  controls: {
    start: () => void;
    stop: () => void;
    pause: () => void;
    resume: () => void;
    reset: () => void;
  };
  /** Animation state */
  state: PulseAnimationState;
  /** Configuration */
  config: PulseAnimationConfig;
}

/**
 * Pulse preset configuration
 */
export interface PulsePreset {
  /** Preset name */
  name: string;
  /** Preset configuration */
  config: PulseAnimationConfig;
  /** Preset description */
  description: string;
  /** Use cases */
  useCases: string[];
}

// ============================================================================
// CONSTANTS & DEFAULTS
// ============================================================================

/**
 * Default pulse animation configuration
 */
const DEFAULT_PULSE_CONFIG: PulseAnimationConfig = {
  type: 'combined',
  duration: 3000,
  timing: 'normal',
  intensity: 'moderate',
  minScale: 1,
  maxScale: 1.05,
  minOpacity: 0.5,
  maxOpacity: 1,
  glowColor: SignatureBlues.primary as string,
  glowBlur: 20,
  glowSpread: 10,
  autoStart: true,
  iterations: -1,
  delay: 0,
  useNativeDriver: true,
};

/**
 * Pulse timing presets
 */
const PULSE_TIMING_PRESETS = {
  quick: { duration: 1500, easing: 'ease-in-out' },
  normal: { duration: 3000, easing: 'ease-in-out' },
  slow: { duration: 4000, easing: 'ease-in-out' },
  cosmic: { duration: 2000, easing: 'ease-in-out' },
} as const;

/**
 * Pulse intensity presets
 */
const PULSE_INTENSITY_PRESETS = {
  subtle: {
    scaleRange: [1, 1.02],
    opacityRange: [0.7, 1],
    glowIntensity: 0.3,
  },
  moderate: {
    scaleRange: [1, 1.05],
    opacityRange: [0.5, 1],
    glowIntensity: 0.6,
  },
  strong: {
    scaleRange: [1, 1.08],
    opacityRange: [0.3, 1],
    glowIntensity: 1,
  },
} as const;

/**
 * Accessibility configuration
 */
const ACCESSIBILITY_CONFIG = {
  respectsReducedMotion: true,
  fallbackDuration: 200,
  fallbackEasing: 'ease',
  disableAnimations: false,
};

// ============================================================================
// CORE ANIMATION CREATORS
// ============================================================================

/**
 * Create pulse animation
 */
const createPulseAnimation = (
  config: Partial<PulseAnimationConfig> = {}
): PulseAnimationResult => {
  const finalConfig = { ...DEFAULT_PULSE_CONFIG, ...config };
  
  // Create animated values
  const scale = useRef(new Animated.Value(finalConfig.minScale)).current;
  const opacity = useRef(new Animated.Value(finalConfig.minOpacity)).current;
  const glowIntensity = useRef(new Animated.Value(0)).current;
  
  // Animation references
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);
  const stateRef = useRef<PulseAnimationState>({
    scale: finalConfig.minScale,
    opacity: finalConfig.minOpacity,
    glowIntensity: 0,
    isRunning: false,
    iteration: 0,
  });

  // Get timing configuration
  const timingConfig = PULSE_TIMING_PRESETS[finalConfig.timing];
  
  // Create animation sequence
  const createAnimationSequence = useCallback(() => {
    const animations: Animated.CompositeAnimation[] = [];
    
    // Scale animation
    if (finalConfig.type === 'scale' || finalConfig.type === 'combined') {
      animations.push(
        Animated.sequence([
          Animated.timing(scale, {
            toValue: finalConfig.maxScale,
            duration: finalConfig.duration / 2,
            useNativeDriver: finalConfig.useNativeDriver,
          }),
          Animated.timing(scale, {
            toValue: finalConfig.minScale,
            duration: finalConfig.duration / 2,
            useNativeDriver: finalConfig.useNativeDriver,
          }),
        ])
      );
    }
    
    // Opacity animation
    if (finalConfig.type === 'opacity' || finalConfig.type === 'combined') {
      animations.push(
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: finalConfig.maxOpacity,
            duration: finalConfig.duration / 2,
            useNativeDriver: finalConfig.useNativeDriver,
          }),
          Animated.timing(opacity, {
            toValue: finalConfig.minOpacity,
            duration: finalConfig.duration / 2,
            useNativeDriver: finalConfig.useNativeDriver,
          }),
        ])
      );
    }
    
    // Glow animation
    if (finalConfig.type === 'glow' || finalConfig.type === 'combined') {
      animations.push(
        Animated.sequence([
          Animated.timing(glowIntensity, {
            toValue: 1,
            duration: finalConfig.duration / 2,
            useNativeDriver: false,
          }),
          Animated.timing(glowIntensity, {
            toValue: 0,
            duration: finalConfig.duration / 2,
            useNativeDriver: false,
          }),
        ])
      );
    }
    
    return Animated.parallel(animations);
  }, [finalConfig, scale, opacity, glowIntensity]);

  // Animation controls
  const controls = {
    start: () => {
      if (stateRef.current.isRunning) return;
      
      stateRef.current.isRunning = true;
      stateRef.current.iteration = 0;
      
      const runAnimation = () => {
        const animation = createAnimationSequence();
        
        if (finalConfig.iterations === -1) {
          animationRef.current = Animated.loop(animation);
        } else {
          animationRef.current = Animated.loop(animation, { iterations: finalConfig.iterations });
        }
        
        if (finalConfig.delay > 0) {
          setTimeout(() => {
            animationRef.current?.start(({ finished }) => {
              if (finished) {
                stateRef.current.isRunning = false;
              }
            });
          }, finalConfig.delay);
        } else {
          animationRef.current.start(({ finished }) => {
            if (finished) {
              stateRef.current.isRunning = false;
            }
          });
        }
      };
      
      runAnimation();
    },
    
    stop: () => {
      if (animationRef.current) {
        animationRef.current.stop();
        stateRef.current.isRunning = false;
      }
    },
    
    pause: () => {
      if (animationRef.current) {
        animationRef.current.stop();
        stateRef.current.isRunning = false;
      }
    },
    
    resume: () => {
      if (!stateRef.current.isRunning) {
        controls.start();
      }
    },
    
    reset: () => {
      if (animationRef.current) {
        animationRef.current.stop();
      }
      
      scale.setValue(finalConfig.minScale);
      opacity.setValue(finalConfig.minOpacity);
      glowIntensity.setValue(0);
      
      stateRef.current = {
        scale: finalConfig.minScale,
        opacity: finalConfig.minOpacity,
        glowIntensity: 0,
        isRunning: false,
        iteration: 0,
      };
    },
  };

  // Auto-start if enabled
  useEffect(() => {
    if (finalConfig.autoStart) {
      controls.start();
    }
    
    return () => {
      controls.stop();
    };
  }, [finalConfig.autoStart]);

  // Create animated style
  const animatedStyle: ViewStyle = {
    transform: [{ scale }],
    opacity,
    shadowColor: finalConfig.glowColor,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: glowIntensity,
    shadowRadius: finalConfig.glowBlur,
    elevation: 0,
  };

  return {
    style: animatedStyle,
    controls,
    state: stateRef.current,
    config: finalConfig,
  };
};

/**
 * Create scale-only pulse animation
 */
const createScalePulse = (
  config: Partial<PulseAnimationConfig> = {}
): PulseAnimationResult => {
  return createPulseAnimation({
    ...config,
    type: 'scale',
  });
};

/**
 * Create opacity-only pulse animation
 */
const createOpacityPulse = (
  config: Partial<PulseAnimationConfig> = {}
): PulseAnimationResult => {
  return createPulseAnimation({
    ...config,
    type: 'opacity',
  });
};

/**
 * Create glow-only pulse animation
 */
const createGlowPulse = (
  config: Partial<PulseAnimationConfig> = {}
): PulseAnimationResult => {
  return createPulseAnimation({
    ...config,
    type: 'glow',
  });
};

// ============================================================================
// PRESET CONFIGURATIONS
// ============================================================================

/**
 * Glow effects pulse preset (Design System spec)
 */
const GLOW_EFFECTS_PULSE_PRESET: PulsePreset = {
  name: 'Glow Effects Pulse',
  config: {
    ...DEFAULT_PULSE_CONFIG,
    type: 'combined',
    duration: 3000,
    timing: 'normal',
    intensity: 'moderate',
    minScale: 1,
    maxScale: 1.05,
    minOpacity: 0.5,
    maxOpacity: 1,
    glowColor: SignatureBlues.primary as string,
    iterations: -1,
  },
  description: 'Primary glow effects pulse as per Design System specifications',
  useCases: ['Glow effects', 'Card highlights', 'Interactive elements'],
};

/**
 * Loading state pulse preset
 */
const LOADING_PULSE_PRESET: PulsePreset = {
  name: 'Loading State Pulse',
  config: {
    ...DEFAULT_PULSE_CONFIG,
    type: 'opacity',
    duration: 1500,
    timing: 'quick',
    intensity: 'moderate',
    minOpacity: 0.5,
    maxOpacity: 1,
    glowColor: '#54A0FF',
    iterations: -1,
  },
  description: 'Pulse animation for loading states',
  useCases: ['Loading indicators', 'Skeleton loaders', 'Progress states'],
};

/**
 * Orbital rings pulse preset
 */
const ORBITAL_RINGS_PULSE_PRESET: PulsePreset = {
  name: 'Orbital Rings Pulse',
  config: {
    ...DEFAULT_PULSE_CONFIG,
    type: 'opacity',
    duration: 4000,
    timing: 'slow',
    intensity: 'subtle',
    minOpacity: 0.3,
    maxOpacity: 0.6,
    glowColor: SignatureBlues.primary as string,
    iterations: -1,
  },
  description: 'Orbital rings pulse animation',
  useCases: ['Orbital animations', 'Background elements', 'Cosmic effects'],
};

/**
 * FAB pulse preset
 */
const FAB_PULSE_PRESET: PulsePreset = {
  name: 'FAB Pulse',
  config: {
    ...DEFAULT_PULSE_CONFIG,
    type: 'glow',
    duration: 2000,
    timing: 'cosmic',
    intensity: 'strong',
    glowColor: SignatureBlues.primary as string,
    glowBlur: 40,
    glowSpread: 20,
    iterations: -1,
  },
  description: 'Floating Action Button pulse glow',
  useCases: ['FAB buttons', 'Primary actions', 'Call-to-action elements'],
};

/**
 * Interactive card pulse preset
 */
const INTERACTIVE_CARD_PULSE_PRESET: PulsePreset = {
  name: 'Interactive Card Pulse',
  config: {
    ...DEFAULT_PULSE_CONFIG,
    type: 'glow',
    duration: 3000,
    timing: 'normal',
    intensity: 'moderate',
    glowColor: 'rgba(46,134,222,0.4)',
    glowBlur: 40,
    glowSpread: 15,
    iterations: -1,
  },
  description: 'Interactive card glow pulse',
  useCases: ['Interactive cards', 'Hover effects', 'Focus indicators'],
};

/**
 * Avatar pulse preset
 */
const AVATAR_PULSE_PRESET: PulsePreset = {
  name: 'Avatar Pulse',
  config: {
    ...DEFAULT_PULSE_CONFIG,
    type: 'scale',
    duration: 2000,
    timing: 'cosmic',
    intensity: 'subtle',
    minScale: 1,
    maxScale: 1.03,
    iterations: -1,
  },
  description: 'Avatar pulse animation',
  useCases: ['User avatars', 'Profile images', 'Status indicators'],
};

// ============================================================================
// COMPONENT-SPECIFIC CREATORS
// ============================================================================

/**
 * Create button pulse animation
 */
const createButtonPulse = (
  intensity: PulseIntensity = 'moderate'
): PulseAnimationResult => {
  return createPulseAnimation({
    type: 'combined',
    duration: 2000,
    timing: 'cosmic',
    intensity,
    glowColor: SignatureBlues.primary as string,
    glowBlur: 20,
    iterations: -1,
  });
};

/**
 * Create icon pulse animation
 */
const createIconPulse = (
  color: string = SignatureBlues.primary as string
): PulseAnimationResult => {
  return createPulseAnimation({
    type: 'opacity',
    duration: 1500,
    timing: 'quick',
    intensity: 'subtle',
    minOpacity: 0.6,
    maxOpacity: 1,
    glowColor: color,
    iterations: -1,
  });
};

/**
 * Create notification pulse animation
 */
const createNotificationPulse = (): PulseAnimationResult => {
  return createPulseAnimation({
    type: 'combined',
    duration: 1000,
    timing: 'quick',
    intensity: 'strong',
    minScale: 1,
    maxScale: 1.1,
    minOpacity: 0.8,
    maxOpacity: 1,
    glowColor: '#FF6B6B',
    iterations: 3,
  });
};

/**
 * Create loading spinner pulse animation
 */
const createLoadingSpinnerPulse = (): PulseAnimationResult => {
  return createPulseAnimation({
    type: 'opacity',
    duration: 1200,
    timing: 'quick',
    intensity: 'moderate',
    minOpacity: 0.3,
    maxOpacity: 0.9,
    glowColor: SignatureBlues.primary as string,
    iterations: -1,
  });
};

// ============================================================================
// ACCESSIBILITY & UTILITIES
// ============================================================================

/**
 * Create accessible pulse animation
 */
const createAccessiblePulse = (
  config: Partial<PulseAnimationConfig> = {}
): PulseAnimationResult => {
  const respectsReducedMotion = ACCESSIBILITY_CONFIG.respectsReducedMotion;
  
  const accessibleConfig = {
    ...config,
    duration: respectsReducedMotion ? Math.min(config.duration || 3000, 200) : config.duration || 3000,
    iterations: respectsReducedMotion ? 1 : config.iterations || -1,
    intensity: respectsReducedMotion ? 'subtle' : config.intensity || 'moderate',
  };
  
  return createPulseAnimation(accessibleConfig);
};

/**
 * Create responsive pulse intensity
 */
const createResponsivePulseIntensity = (
  baseIntensity: PulseIntensity = 'moderate',
  context: 'mobile' | 'tablet' | 'desktop' = 'mobile'
): PulseIntensity => {
  const intensityMap = {
    mobile: { subtle: 'subtle', moderate: 'moderate', strong: 'moderate' },
    tablet: { subtle: 'subtle', moderate: 'moderate', strong: 'strong' },
    desktop: { subtle: 'moderate', moderate: 'strong', strong: 'strong' },
  };
  
  return intensityMap[context][baseIntensity] as PulseIntensity;
};

/**
 * Create themed pulse animation
 */
const createThemedPulse = (
  theme: 'signature' | 'mystic' | 'luxury' = 'signature',
  config: Partial<PulseAnimationConfig> = {}
): PulseAnimationResult => {
  const themeColors = {
    signature: SignatureBlues.primary as string,
    mystic: RoyalPurples.royal as string,
    luxury: LuxuryGolds.pure as string,
  };
  
  return createPulseAnimation({
    ...config,
    glowColor: themeColors[theme],
  });
};

// ============================================================================
// PERFORMANCE UTILITIES
// ============================================================================

/**
 * Create optimized pulse animation
 */
const createOptimizedPulse = (
  config: Partial<PulseAnimationConfig> = {}
): PulseAnimationResult => {
  return createPulseAnimation({
    ...config,
    useNativeDriver: true,
    type: config.type === 'glow' ? 'opacity' : config.type || 'scale',
  });
};

/**
 * Create batch pulse animations
 */
const createBatchPulseAnimations = (
  count: number,
  baseConfig: Partial<PulseAnimationConfig> = {},
  staggerDelay: number = 200
): PulseAnimationResult[] => {
  const animations: PulseAnimationResult[] = [];
  
  for (let i = 0; i < count; i++) {
    animations.push(
      createPulseAnimation({
        ...baseConfig,
        delay: i * staggerDelay,
        autoStart: false,
      })
    );
  }
  
  return animations;
};

/**
 * Start staggered pulse animations
 */
const startStaggeredPulses = (
  pulses: PulseAnimationResult[],
  staggerDelay: number = 200
): void => {
  pulses.forEach((pulse, index) => {
    setTimeout(() => {
      pulse.controls.start();
    }, index * staggerDelay);
  });
};

// ============================================================================
// EXPORTS
// ============================================================================

export {
  // Main creators
  createPulseAnimation,
  createScalePulse,
  createOpacityPulse,
  createGlowPulse,
  
  // Presets
  GLOW_EFFECTS_PULSE_PRESET,
  LOADING_PULSE_PRESET,
  ORBITAL_RINGS_PULSE_PRESET,
  FAB_PULSE_PRESET,
  INTERACTIVE_CARD_PULSE_PRESET,
  AVATAR_PULSE_PRESET,
  
  // Component creators
  createButtonPulse,
  createIconPulse,
  createNotificationPulse,
  createLoadingSpinnerPulse,
  
  // Utilities
  createAccessiblePulse,
  createResponsivePulseIntensity,
  createThemedPulse,
  createOptimizedPulse,
  createBatchPulseAnimations,
  startStaggeredPulses,
};
