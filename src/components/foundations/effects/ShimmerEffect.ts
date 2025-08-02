/**
 * Corp Astro UI Library - Shimmer Effect System
 * 
 * Comprehensive shimmer effect system for loading states and premium visual elements.
 * Provides left-to-right gradient animations with precise timing control and
 * customizable shimmer patterns, perfectly aligned with Corp Astro's premium aesthetic.
 * 
 * @module ShimmerEffect
 * @version 1.0.0
 * @since 2024
 * 
 * UI Documentation Reference:
 * - Skeleton Loader: background: 'linear-gradient(90deg, rgba(46,134,222,0.1) 0%, rgba(46,134,222,0.2) 50%, rgba(46,134,222,0.1) 100%)', animation: 'shimmer 1.5s ease-in-out infinite'
 * - Loading States: shimmer: 'left-to-right 1.5s infinite'
 * - Progress Bar: animation: 'shimmer 1.5s ease-in-out infinite'
 * - Premium Badge: shimmer: 'gold-shimmer 3s linear infinite'
 * - Luxury Gold shimmer: '#FFF3CD' for highlights
 * 
 * Features:
 * - Skeleton loading shimmer effects
 * - Premium gold shimmer animations
 * - Progress bar shimmer overlays
 * - Customizable shimmer patterns
 * - Performance optimized animations
 * - Accessibility support
 */

import { ColorValue } from 'react-native';
import { SignatureBlues } from '../tokens/colors/SignatureBlues';
import { LuxuryGolds } from '../tokens/colors/LuxuryGolds';
import { ProfessionalGrays } from '../tokens/colors/ProfessionalGrays';

/**
 * Shimmer effect types
 */
export type ShimmerType = 'skeleton' | 'premium' | 'progress' | 'loading' | 'gold' | 'custom';

/**
 * Shimmer direction types
 */
export type ShimmerDirection = 'left-to-right' | 'right-to-left' | 'top-to-bottom' | 'bottom-to-top';

/**
 * Shimmer timing presets
 */
export type ShimmerTimingPreset = 'fast' | 'normal' | 'slow' | 'premium' | 'loading' | 'custom';

/**
 * Shimmer intensity levels
 */
export type ShimmerIntensity = 'subtle' | 'normal' | 'intense' | 'premium';

/**
 * Shimmer gradient configuration
 */
export interface ShimmerGradient {
  /** Start color with opacity */
  start: string;
  /** Middle color with opacity (shimmer highlight) */
  middle: string;
  /** End color with opacity */
  end: string;
  /** Color stops (0-1) */
  stops: [number, number, number];
}

/**
 * Shimmer animation configuration
 */
export interface ShimmerAnimationConfig {
  /** Animation duration in milliseconds */
  duration: number;
  /** Animation timing function */
  easing: string;
  /** Animation iteration count */
  iterations: number | 'infinite';
  /** Animation delay in milliseconds */
  delay: number;
  /** Animation direction */
  direction: ShimmerDirection;
}

/**
 * Shimmer effect configuration
 */
export interface ShimmerEffectConfig {
  /** Shimmer type */
  type: ShimmerType;
  /** Shimmer gradient configuration */
  gradient: ShimmerGradient;
  /** Animation configuration */
  animation: ShimmerAnimationConfig;
  /** Shimmer intensity */
  intensity: ShimmerIntensity;
  /** Border radius in pixels */
  borderRadius: number;
  /** Enable accessibility features */
  accessibilityEnabled: boolean;
  /** Respect reduced motion preference */
  respectReducedMotion: boolean;
}

/**
 * Shimmer animation state
 */
export interface ShimmerAnimationState {
  /** Current animation progress (0-1) */
  progress: number;
  /** Animation running state */
  isRunning: boolean;
  /** Current shimmer position */
  position: number;
  /** Animation start time */
  startTime: number;
  /** Animation ID for cleanup */
  animationId: number | null;
}

/**
 * Shimmer effect result
 */
export interface ShimmerEffectResult {
  /** Start shimmer animation */
  start: () => void;
  /** Stop shimmer animation */
  stop: () => void;
  /** Pause shimmer animation */
  pause: () => void;
  /** Resume shimmer animation */
  resume: () => void;
  /** Update shimmer configuration */
  updateConfig: (config: Partial<ShimmerEffectConfig>) => void;
  /** Get current animation state */
  getState: () => ShimmerAnimationState;
  /** Cleanup resources */
  cleanup: () => void;
}

/**
 * Shimmer preset configuration
 */
export interface ShimmerPreset {
  /** Preset name */
  name: string;
  /** Preset description */
  description: string;
  /** Shimmer configuration */
  config: ShimmerEffectConfig;
  /** Use cases */
  useCases: string[];
}

/**
 * Shimmer timing configurations
 */
const SHIMMER_TIMING_CONFIGS: Record<ShimmerTimingPreset, ShimmerAnimationConfig> = {
  fast: {
    duration: 1000,
    easing: 'ease-in-out',
    iterations: 'infinite',
    delay: 0,
    direction: 'left-to-right',
  },
  normal: {
    duration: 1500,
    easing: 'ease-in-out',
    iterations: 'infinite',
    delay: 0,
    direction: 'left-to-right',
  },
  slow: {
    duration: 2000,
    easing: 'ease-in-out',
    iterations: 'infinite',
    delay: 0,
    direction: 'left-to-right',
  },
  premium: {
    duration: 3000,
    easing: 'linear',
    iterations: 'infinite',
    delay: 0,
    direction: 'left-to-right',
  },
  loading: {
    duration: 1500,
    easing: 'ease-in-out',
    iterations: 'infinite',
    delay: 0,
    direction: 'left-to-right',
  },
  custom: {
    duration: 1500,
    easing: 'ease-in-out',
    iterations: 'infinite',
    delay: 0,
    direction: 'left-to-right',
  },
};

/**
 * Shimmer gradient configurations
 */
const SHIMMER_GRADIENT_CONFIGS: Record<ShimmerType, ShimmerGradient> = {
  skeleton: {
    start: 'rgba(46,134,222,0.1)',
    middle: 'rgba(46,134,222,0.2)',
    end: 'rgba(46,134,222,0.1)',
    stops: [0, 0.5, 1],
  },
  premium: {
    start: 'rgba(255,215,0,0.1)',
    middle: 'rgba(255,215,0,0.4)',
    end: 'rgba(255,215,0,0.1)',
    stops: [0, 0.5, 1],
  },
  progress: {
    start: SignatureBlues.primary as string,
    middle: 'rgba(221,160,255,1)',
    end: SignatureBlues.primary as string,
    stops: [0, 0.5, 1],
  },
  loading: {
    start: 'rgba(46,134,222,0.1)',
    middle: 'rgba(46,134,222,0.3)',
    end: 'rgba(46,134,222,0.1)',
    stops: [0, 0.5, 1],
  },
  gold: {
    start: 'rgba(255,215,0,0.2)',
    middle: LuxuryGolds.shimmer as string,
    end: 'rgba(255,215,0,0.2)',
    stops: [0, 0.5, 1],
  },
  custom: {
    start: 'rgba(46,134,222,0.1)',
    middle: 'rgba(46,134,222,0.2)',
    end: 'rgba(46,134,222,0.1)',
    stops: [0, 0.5, 1],
  },
};

/**
 * Create shimmer effect with configuration
 */
const createShimmerEffect = (
  element: HTMLElement | null,
  config: Partial<ShimmerEffectConfig> = {}
): ShimmerEffectResult => {
  if (!element) {
    // Return no-op result for null elements
    return {
      start: () => {},
      stop: () => {},
      pause: () => {},
      resume: () => {},
      updateConfig: () => {},
      getState: () => ({
        progress: 0,
        isRunning: false,
        position: 0,
        startTime: 0,
        animationId: null,
      }),
      cleanup: () => {},
    };
  }

  // Default configuration
  const defaultConfig: ShimmerEffectConfig = {
    type: 'skeleton',
    gradient: SHIMMER_GRADIENT_CONFIGS.skeleton,
    animation: SHIMMER_TIMING_CONFIGS.normal,
    intensity: 'normal',
    borderRadius: 8,
    accessibilityEnabled: true,
    respectReducedMotion: true,
  };

  let currentConfig = { ...defaultConfig, ...config };
  let animationState: ShimmerAnimationState = {
    progress: 0,
    isRunning: false,
    position: 0,
    startTime: 0,
    animationId: null,
  };

  // Check for reduced motion preference
  const prefersReducedMotion = () => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  };

  // Create shimmer gradient
  const createGradient = (position: number): string => {
    const { gradient } = currentConfig;
    const offset = position * 100;
    
    return `linear-gradient(90deg, 
      ${gradient.start} ${Math.max(0, offset - 50)}%, 
      ${gradient.middle} ${offset}%, 
      ${gradient.end} ${Math.min(100, offset + 50)}%
    )`;
  };

  // Animation loop
  const animate = (timestamp: number) => {
    if (!animationState.startTime) {
      animationState.startTime = timestamp;
    }

    const elapsed = timestamp - animationState.startTime;
    const progress = (elapsed % currentConfig.animation.duration) / currentConfig.animation.duration;
    
    // Update animation state
    animationState.progress = progress;
    animationState.position = progress;

    // Apply shimmer effect
    const shimmerGradient = createGradient(progress);
    element.style.background = shimmerGradient;
    element.style.backgroundSize = '200% 100%';
    element.style.backgroundPosition = `${progress * 200 - 100}% 0`;

    // Continue animation if running
    if (animationState.isRunning) {
      animationState.animationId = requestAnimationFrame(animate);
    }
  };

  // Start shimmer animation
  const start = () => {
    if (currentConfig.respectReducedMotion && prefersReducedMotion()) {
      return;
    }

    if (animationState.isRunning) return;

    animationState.isRunning = true;
    animationState.startTime = 0;
    
    // Apply initial styles
    element.style.borderRadius = `${currentConfig.borderRadius}px`;
    element.style.overflow = 'hidden';
    element.style.position = 'relative';

    // Start animation
    animationState.animationId = requestAnimationFrame(animate);
  };

  // Stop shimmer animation
  const stop = () => {
    animationState.isRunning = false;
    if (animationState.animationId) {
      cancelAnimationFrame(animationState.animationId);
      animationState.animationId = null;
    }
    
    // Reset styles
    element.style.background = '';
    element.style.backgroundSize = '';
    element.style.backgroundPosition = '';
  };

  // Pause shimmer animation
  const pause = () => {
    if (animationState.animationId) {
      cancelAnimationFrame(animationState.animationId);
      animationState.animationId = null;
    }
    animationState.isRunning = false;
  };

  // Resume shimmer animation
  const resume = () => {
    if (!animationState.isRunning && !prefersReducedMotion()) {
      animationState.isRunning = true;
      animationState.animationId = requestAnimationFrame(animate);
    }
  };

  // Update configuration
  const updateConfig = (newConfig: Partial<ShimmerEffectConfig>) => {
    currentConfig = { ...currentConfig, ...newConfig };
    
    // Update gradient if type changed
    if (newConfig.type) {
      currentConfig.gradient = SHIMMER_GRADIENT_CONFIGS[newConfig.type];
    }
  };

  // Get current state
  const getState = (): ShimmerAnimationState => ({ ...animationState });

  // Cleanup resources
  const cleanup = () => {
    stop();
    element.style.borderRadius = '';
    element.style.overflow = '';
    element.style.position = '';
  };

  return {
    start,
    stop,
    pause,
    resume,
    updateConfig,
    getState,
    cleanup,
  };
};

/**
 * Skeleton loader shimmer preset
 * Design System: background: 'linear-gradient(90deg, rgba(46,134,222,0.1) 0%, rgba(46,134,222,0.2) 50%, rgba(46,134,222,0.1) 100%)', animation: 'shimmer 1.5s ease-in-out infinite'
 */
const SKELETON_SHIMMER_PRESET: ShimmerPreset = {
  name: 'Skeleton Loader',
  description: 'Subtle shimmer for skeleton loading states',
  config: {
    type: 'skeleton',
    gradient: SHIMMER_GRADIENT_CONFIGS.skeleton,
    animation: SHIMMER_TIMING_CONFIGS.normal,
    intensity: 'subtle',
    borderRadius: 8,
    accessibilityEnabled: true,
    respectReducedMotion: true,
  },
  useCases: ['Skeleton loading', 'Content placeholders', 'Loading states'],
};

/**
 * Premium gold shimmer preset
 * Design System: shimmer: 'gold-shimmer 3s linear infinite', shimmer: '#FFF3CD'
 */
const PREMIUM_GOLD_SHIMMER_PRESET: ShimmerPreset = {
  name: 'Premium Gold',
  description: 'Luxurious gold shimmer for premium elements',
  config: {
    type: 'premium',
    gradient: SHIMMER_GRADIENT_CONFIGS.gold,
    animation: SHIMMER_TIMING_CONFIGS.premium,
    intensity: 'premium',
    borderRadius: 12,
    accessibilityEnabled: true,
    respectReducedMotion: true,
  },
  useCases: ['Premium badges', 'Luxury elements', 'VIP content'],
};

/**
 * Progress bar shimmer preset
 * Design System: animation: 'shimmer 1.5s ease-in-out infinite'
 */
const PROGRESS_SHIMMER_PRESET: ShimmerPreset = {
  name: 'Progress Bar',
  description: 'Animated shimmer for progress indicators',
  config: {
    type: 'progress',
    gradient: SHIMMER_GRADIENT_CONFIGS.progress,
    animation: SHIMMER_TIMING_CONFIGS.normal,
    intensity: 'normal',
    borderRadius: 4,
    accessibilityEnabled: true,
    respectReducedMotion: true,
  },
  useCases: ['Progress bars', 'Loading indicators', 'Status displays'],
};

/**
 * Loading shimmer preset
 * Design System: shimmer: 'left-to-right 1.5s infinite'
 */
const LOADING_SHIMMER_PRESET: ShimmerPreset = {
  name: 'Loading States',
  description: 'General shimmer for loading states',
  config: {
    type: 'loading',
    gradient: SHIMMER_GRADIENT_CONFIGS.loading,
    animation: SHIMMER_TIMING_CONFIGS.loading,
    intensity: 'normal',
    borderRadius: 6,
    accessibilityEnabled: true,
    respectReducedMotion: true,
  },
  useCases: ['Loading states', 'Data fetching', 'Content loading'],
};

/**
 * Create shimmer effect from preset
 */
const createShimmerFromPreset = (
  element: HTMLElement | null,
  preset: ShimmerPreset,
  overrides: Partial<ShimmerEffectConfig> = {}
): ShimmerEffectResult => {
  return createShimmerEffect(element, { ...preset.config, ...overrides });
};

/**
 * Create skeleton shimmer effect
 */
const createSkeletonShimmer = (
  element: HTMLElement | null,
  config: Partial<ShimmerEffectConfig> = {}
): ShimmerEffectResult => {
  return createShimmerEffect(element, {
    type: 'skeleton',
    gradient: SHIMMER_GRADIENT_CONFIGS.skeleton,
    animation: SHIMMER_TIMING_CONFIGS.normal,
    ...config,
  });
};

/**
 * Create premium gold shimmer effect
 */
const createPremiumShimmer = (
  element: HTMLElement | null,
  config: Partial<ShimmerEffectConfig> = {}
): ShimmerEffectResult => {
  return createShimmerEffect(element, {
    type: 'premium',
    gradient: SHIMMER_GRADIENT_CONFIGS.gold,
    animation: SHIMMER_TIMING_CONFIGS.premium,
    ...config,
  });
};

/**
 * Create progress bar shimmer effect
 */
const createProgressShimmer = (
  element: HTMLElement | null,
  config: Partial<ShimmerEffectConfig> = {}
): ShimmerEffectResult => {
  return createShimmerEffect(element, {
    type: 'progress',
    gradient: SHIMMER_GRADIENT_CONFIGS.progress,
    animation: SHIMMER_TIMING_CONFIGS.normal,
    ...config,
  });
};

/**
 * Create loading shimmer effect
 */
const createLoadingShimmer = (
  element: HTMLElement | null,
  config: Partial<ShimmerEffectConfig> = {}
): ShimmerEffectResult => {
  return createShimmerEffect(element, {
    type: 'loading',
    gradient: SHIMMER_GRADIENT_CONFIGS.loading,
    animation: SHIMMER_TIMING_CONFIGS.loading,
    ...config,
  });
};

/**
 * Create batch shimmer effects
 */
const createBatchShimmerEffects = (
  elements: (HTMLElement | null)[],
  config: Partial<ShimmerEffectConfig> = {},
  staggerDelay: number = 100
): ShimmerEffectResult[] => {
  return elements.map((element, index) => {
    const shimmerConfig = {
      ...config,
      animation: {
        ...SHIMMER_TIMING_CONFIGS.normal,
        ...config.animation,
        delay: index * staggerDelay,
      },
    };
    return createShimmerEffect(element, shimmerConfig);
  });
};

/**
 * Create responsive shimmer effect
 */
const createResponsiveShimmer = (
  element: HTMLElement | null,
  config: Partial<ShimmerEffectConfig> = {}
): ShimmerEffectResult => {
  const responsiveConfig = {
    ...config,
    animation: {
      ...SHIMMER_TIMING_CONFIGS.normal,
      ...config.animation,
      duration: window.innerWidth < 768 ? 1000 : 1500, // Faster on mobile
    },
  };
  
  return createShimmerEffect(element, responsiveConfig);
};

/**
 * Create accessible shimmer effect
 */
const createAccessibleShimmer = (
  element: HTMLElement | null,
  config: Partial<ShimmerEffectConfig> = {}
): ShimmerEffectResult => {
  const accessibleConfig = {
    ...config,
    accessibilityEnabled: true,
    respectReducedMotion: true,
    intensity: 'subtle' as ShimmerIntensity,
  };
  
  return createShimmerEffect(element, accessibleConfig);
};

// Export all functionality
export {
  // Main creator
  createShimmerEffect,
  
  // Presets
  SKELETON_SHIMMER_PRESET,
  PREMIUM_GOLD_SHIMMER_PRESET,
  PROGRESS_SHIMMER_PRESET,
  LOADING_SHIMMER_PRESET,
  
  // Specialized creators
  createShimmerFromPreset,
  createSkeletonShimmer,
  createPremiumShimmer,
  createProgressShimmer,
  createLoadingShimmer,
  
  // Utility creators
  createBatchShimmerEffects,
  createResponsiveShimmer,
  createAccessibleShimmer,
  
  // Configuration objects
  SHIMMER_TIMING_CONFIGS,
  SHIMMER_GRADIENT_CONFIGS,
};
