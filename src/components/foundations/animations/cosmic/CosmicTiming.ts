/**
 * Corp Astro UI Library - Cosmic Timing Functions
 * 
 * Comprehensive timing system for cosmic animations. Provides standardized
 * timing values, sequencing functions, and synchronization utilities that
 * align with the Corp Astro cosmic theme and motion philosophy.
 * 
 * @module CosmicTiming
 * @version 1.0.0
 * @since 2024
 * 
 * UI Documentation Reference:
 * - Motion Philosophy: Celestial timing principles (lines 409-415)
 * - Signature Animations: Orbital entry, constellation reveal, cosmic pulse (lines 418-438)
 * - Hierarchy of Motion: Background, mid-ground, foreground timings (lines 414-417)
 * - Design System: Animation timing specifications (lines 1513-1537)
 */

import { Animated, Easing } from 'react-native';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Cosmic animation timing categories
 */
export type CosmicTimingCategory = 
  | 'instant'         // 0-100ms - Micro-interactions
  | 'quick'           // 100-300ms - Immediate responses
  | 'responsive'      // 300-500ms - Standard interactions
  | 'moderate'        // 500-1000ms - Transitions
  | 'slow'            // 1000-3000ms - Reveals and formations
  | 'continuous'      // 3000ms+ - Background loops
  | 'eternal';        // Infinite - Persistent animations

/**
 * Cosmic timing preset
 */
export interface CosmicTimingPreset {
  /** Duration in milliseconds */
  duration: number;
  /** Easing function */
  easing: (value: number) => number;
  /** Delay before animation starts */
  delay?: number;
  /** Animation iterations (null = infinite) */
  iterations?: number | null;
  /** Direction of animation */
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  /** Fill mode after animation */
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
}

/**
 * Staggered animation configuration
 */
export interface StaggerConfig {
  /** Base delay between items */
  baseDelay: number;
  /** Stagger increment per item */
  increment: number;
  /** Maximum stagger delay */
  maxDelay?: number;
  /** Stagger direction */
  direction?: 'forward' | 'reverse' | 'center-out' | 'edge-in';
  /** Easing for stagger timing */
  easing?: (value: number) => number;
}

/**
 * Sequence timing configuration
 */
export interface SequenceConfig {
  /** Array of timing presets */
  steps: CosmicTimingPreset[];
  /** Overall sequence duration */
  totalDuration?: number;
  /** Loop the sequence */
  loop?: boolean;
  /** Pause between loops */
  loopDelay?: number;
}

/**
 * Synchronized timing group
 */
export interface SyncGroup {
  /** Group identifier */
  id: string;
  /** Master timing preset */
  masterTiming: CosmicTimingPreset;
  /** Synchronized animations */
  animations: {
    id: string;
    timing: CosmicTimingPreset;
    offset?: number; // Offset from master
  }[];
}

// ============================================================================
// CORE TIMING PRESETS
// ============================================================================

/**
 * Instant timing - Micro-interactions (0-100ms)
 */
const INSTANT_TIMING: CosmicTimingPreset = {
  duration: 50,
  easing: Easing.linear,
  delay: 0,
  iterations: 1,
  direction: 'normal',
  fillMode: 'forwards',
};

/**
 * Quick timing - Immediate responses (100-300ms)
 */
const QUICK_TIMING: CosmicTimingPreset = {
  duration: 200,
  easing: Easing.ease,
  delay: 0,
  iterations: 1,
  direction: 'normal',
  fillMode: 'forwards',
};

/**
 * Responsive timing - Standard interactions (300-500ms)
 */
const RESPONSIVE_TIMING: CosmicTimingPreset = {
  duration: 400,
  easing: Easing.bezier(0.4, 0, 0.2, 1),
  delay: 0,
  iterations: 1,
  direction: 'normal',
  fillMode: 'forwards',
};

/**
 * Moderate timing - Transitions (500-1000ms)
 */
const MODERATE_TIMING: CosmicTimingPreset = {
  duration: 600,
  easing: Easing.bezier(0.34, 1.56, 0.64, 1),
  delay: 0,
  iterations: 1,
  direction: 'normal',
  fillMode: 'forwards',
};

/**
 * Slow timing - Reveals and formations (1000-3000ms)
 */
const SLOW_TIMING: CosmicTimingPreset = {
  duration: 1500,
  easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
  delay: 0,
  iterations: 1,
  direction: 'normal',
  fillMode: 'forwards',
};

/**
 * Continuous timing - Background loops (3000ms+)
 */
const CONTINUOUS_TIMING: CosmicTimingPreset = {
  duration: 3000,
  easing: Easing.linear,
  delay: 0,
  iterations: null, // Infinite
  direction: 'normal',
  fillMode: 'none',
};

/**
 * Eternal timing - Persistent animations (Very long loops)
 */
const ETERNAL_TIMING: CosmicTimingPreset = {
  duration: 20000,
  easing: Easing.linear,
  delay: 0,
  iterations: null, // Infinite
  direction: 'normal',
  fillMode: 'none',
};

// ============================================================================
// SIGNATURE ANIMATION TIMINGS
// ============================================================================

/**
 * Orbital entry timing - UI Doc specification
 */
const ORBITAL_ENTRY_TIMING: CosmicTimingPreset = {
  duration: 600,
  easing: Easing.bezier(0.34, 1.56, 0.64, 1),
  delay: 0,
  iterations: 1,
  direction: 'normal',
  fillMode: 'forwards',
};

/**
 * Constellation reveal timing - UI Doc specification
 */
const CONSTELLATION_REVEAL_TIMING: CosmicTimingPreset = {
  duration: 1000,
  easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
  delay: 0,
  iterations: 1,
  direction: 'normal',
  fillMode: 'forwards',
};

/**
 * Cosmic pulse timing - UI Doc specification
 */
const COSMIC_PULSE_TIMING: CosmicTimingPreset = {
  duration: 3000,
  easing: Easing.bezier(0.42, 0, 0.58, 1),
  delay: 0,
  iterations: null, // Infinite
  direction: 'alternate',
  fillMode: 'none',
};

/**
 * Orbital spin timing - Design System specification
 */
const ORBITAL_SPIN_TIMING: CosmicTimingPreset = {
  duration: 2000,
  easing: Easing.linear,
  delay: 0,
  iterations: null, // Infinite
  direction: 'normal',
  fillMode: 'none',
};

/**
 * Constellation formation timing - Design System specification
 */
const CONSTELLATION_FORMATION_TIMING: CosmicTimingPreset = {
  duration: 3000,
  easing: Easing.bezier(0.42, 0, 0.58, 1),
  delay: 0,
  iterations: null, // Infinite
  direction: 'normal',
  fillMode: 'none',
};

/**
 * Shimmer timing - Design System specification
 */
const SHIMMER_TIMING: CosmicTimingPreset = {
  duration: 1500,
  easing: Easing.bezier(0.42, 0, 0.58, 1),
  delay: 0,
  iterations: null, // Infinite
  direction: 'normal',
  fillMode: 'none',
};

// ============================================================================
// HIERARCHY TIMINGS
// ============================================================================

/**
 * Background layer timing - Slow, continuous (20-30s loops)
 */
const BACKGROUND_TIMING: CosmicTimingPreset = {
  duration: 25000,
  easing: Easing.linear,
  delay: 0,
  iterations: null, // Infinite
  direction: 'normal',
  fillMode: 'none',
};

/**
 * Mid-ground layer timing - Moderate, reactive (2-3s)
 */
const MIDGROUND_TIMING: CosmicTimingPreset = {
  duration: 2500,
  easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
  delay: 0,
  iterations: 1,
  direction: 'normal',
  fillMode: 'forwards',
};

/**
 * Foreground layer timing - Quick, responsive (200-400ms)
 */
const FOREGROUND_TIMING: CosmicTimingPreset = {
  duration: 300,
  easing: Easing.bezier(0.4, 0, 0.2, 1),
  delay: 0,
  iterations: 1,
  direction: 'normal',
  fillMode: 'forwards',
};

// ============================================================================
// TIMING UTILITIES
// ============================================================================

/**
 * Get timing preset by category
 */
const getTimingByCategory = (category: CosmicTimingCategory): CosmicTimingPreset => {
  switch (category) {
    case 'instant':
      return INSTANT_TIMING;
    case 'quick':
      return QUICK_TIMING;
    case 'responsive':
      return RESPONSIVE_TIMING;
    case 'moderate':
      return MODERATE_TIMING;
    case 'slow':
      return SLOW_TIMING;
    case 'continuous':
      return CONTINUOUS_TIMING;
    case 'eternal':
      return ETERNAL_TIMING;
    default:
      return RESPONSIVE_TIMING;
  }
};

/**
 * Create custom timing preset
 */
const createCustomTiming = (
  duration: number,
  easing: (value: number) => number,
  options: Partial<CosmicTimingPreset> = {}
): CosmicTimingPreset => {
  return {
    duration,
    easing,
    delay: options.delay || 0,
    iterations: options.iterations || 1,
    direction: options.direction || 'normal',
    fillMode: options.fillMode || 'forwards',
  };
};

/**
 * Scale timing based on performance mode
 */
const scaleTimingForPerformance = (
  timing: CosmicTimingPreset,
  performanceMode: 'high' | 'medium' | 'low'
): CosmicTimingPreset => {
  const scaleFactor = performanceMode === 'high' ? 1 : performanceMode === 'medium' ? 0.8 : 0.6;
  
  return {
    ...timing,
    duration: Math.round(timing.duration * scaleFactor),
    delay: timing.delay ? Math.round(timing.delay * scaleFactor) : 0,
  };
};

// ============================================================================
// STAGGERED ANIMATIONS
// ============================================================================

/**
 * Constellation reveal stagger - UI Doc specification (50ms between points)
 */
const CONSTELLATION_STAGGER: StaggerConfig = {
  baseDelay: 0,
  increment: 50,
  maxDelay: 1000,
  direction: 'forward',
  easing: Easing.ease,
};

/**
 * Orbital entry stagger - For multiple elements
 */
const ORBITAL_ENTRY_STAGGER: StaggerConfig = {
  baseDelay: 0,
  increment: 100,
  maxDelay: 800,
  direction: 'forward',
  easing: Easing.bezier(0.34, 1.56, 0.64, 1),
};

/**
 * Particle reveal stagger - For particle systems
 */
const PARTICLE_REVEAL_STAGGER: StaggerConfig = {
  baseDelay: 0,
  increment: 25,
  maxDelay: 500,
  direction: 'center-out',
  easing: Easing.ease,
};

/**
 * Calculate stagger delay for item
 */
const calculateStaggerDelay = (
  index: number,
  totalItems: number,
  config: StaggerConfig
): number => {
  let delay = config.baseDelay;

  switch (config.direction) {
    case 'forward':
      delay += index * config.increment;
      break;
    case 'reverse':
      delay += (totalItems - 1 - index) * config.increment;
      break;
    case 'center-out':
      const center = Math.floor(totalItems / 2);
      const distance = Math.abs(index - center);
      delay += distance * config.increment;
      break;
    case 'edge-in':
      const edgeDistance = Math.min(index, totalItems - 1 - index);
      delay += edgeDistance * config.increment;
      break;
  }

  return config.maxDelay ? Math.min(delay, config.maxDelay) : delay;
};

/**
 * Create staggered animation sequence
 */
const createStaggeredSequence = (
  itemCount: number,
  baseTiming: CosmicTimingPreset,
  staggerConfig: StaggerConfig
): CosmicTimingPreset[] => {
  return Array.from({ length: itemCount }, (_, index) => ({
    ...baseTiming,
    delay: calculateStaggerDelay(index, itemCount, staggerConfig),
  }));
};

// ============================================================================
// SEQUENCE TIMING
// ============================================================================

/**
 * Create animation sequence
 */
const createAnimationSequence = (config: SequenceConfig): SequenceConfig => {
  const totalDuration = config.totalDuration || 
    config.steps.reduce((sum, step) => sum + step.duration + (step.delay || 0), 0);

  return {
    ...config,
    totalDuration,
  };
};

/**
 * Get sequence step timing
 */
const getSequenceStepTiming = (
  sequenceConfig: SequenceConfig,
  stepIndex: number
): CosmicTimingPreset => {
  if (stepIndex >= sequenceConfig.steps.length) {
    return RESPONSIVE_TIMING;
  }

  const step = sequenceConfig.steps[stepIndex];
  let cumulativeDelay = 0;

  // Calculate cumulative delay from previous steps
  for (let i = 0; i < stepIndex; i++) {
    const prevStep = sequenceConfig.steps[i];
    cumulativeDelay += prevStep.duration + (prevStep.delay || 0);
  }

  return {
    ...step,
    delay: cumulativeDelay + (step.delay || 0),
  };
};

// ============================================================================
// SYNCHRONIZATION
// ============================================================================

/**
 * Create synchronized animation group
 */
const createSyncGroup = (
  id: string,
  masterTiming: CosmicTimingPreset,
  animations: Array<{
    id: string;
    timing: CosmicTimingPreset;
    offset?: number;
  }>
): SyncGroup => {
  return {
    id,
    masterTiming,
    animations,
  };
};

/**
 * Get synchronized timing for animation
 */
const getSyncedTiming = (
  syncGroup: SyncGroup,
  animationId: string
): CosmicTimingPreset | null => {
  const animation = syncGroup.animations.find(anim => anim.id === animationId);
  
  if (!animation) return null;

  return {
    ...animation.timing,
    delay: (animation.timing.delay || 0) + (animation.offset || 0),
  };
};

/**
 * Update sync group master timing
 */
const updateSyncGroupMaster = (
  syncGroup: SyncGroup,
  newMasterTiming: CosmicTimingPreset
): SyncGroup => {
  return {
    ...syncGroup,
    masterTiming: newMasterTiming,
  };
};

// ============================================================================
// ANIMATED VALUE UTILITIES
// ============================================================================

/**
 * Create animated value with timing
 */
const createAnimatedValue = (
  initialValue: number,
  timing: CosmicTimingPreset
): {
  value: Animated.Value;
  animate: (toValue: number) => Animated.CompositeAnimation;
} => {
  const animatedValue = new Animated.Value(initialValue);

  const animate = (toValue: number) => {
    return Animated.timing(animatedValue, {
      toValue,
      duration: timing.duration,
      easing: timing.easing,
      delay: timing.delay,
      useNativeDriver: true,
    });
  };

  return { value: animatedValue, animate };
};

/**
 * Create looping animation
 */
const createLoopingAnimation = (
  animatedValue: Animated.Value,
  fromValue: number,
  toValue: number,
  timing: CosmicTimingPreset
): Animated.CompositeAnimation => {
  const animation = Animated.loop(
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue,
        duration: timing.duration,
        easing: timing.easing,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: fromValue,
        duration: timing.duration,
        easing: timing.easing,
        useNativeDriver: true,
      }),
    ]),
    { iterations: timing.iterations || -1 }
  );

  return animation;
};

/**
 * Create spring animation with cosmic timing
 */
const createSpringAnimation = (
  animatedValue: Animated.Value,
  toValue: number,
  config: {
    tension?: number;
    friction?: number;
    mass?: number;
    velocity?: number;
  } = {}
): Animated.CompositeAnimation => {
  return Animated.spring(animatedValue, {
    toValue,
    tension: config.tension || 40,
    friction: config.friction || 7,
    mass: config.mass || 1,
    velocity: config.velocity || 0,
    useNativeDriver: true,
  });
};

// ============================================================================
// EXPORTS
// ============================================================================

export {
  // Core timing presets
  INSTANT_TIMING,
  QUICK_TIMING,
  RESPONSIVE_TIMING,
  MODERATE_TIMING,
  SLOW_TIMING,
  CONTINUOUS_TIMING,
  ETERNAL_TIMING,
  
  // Signature animation timings
  ORBITAL_ENTRY_TIMING,
  CONSTELLATION_REVEAL_TIMING,
  COSMIC_PULSE_TIMING,
  ORBITAL_SPIN_TIMING,
  CONSTELLATION_FORMATION_TIMING,
  SHIMMER_TIMING,
  
  // Hierarchy timings
  BACKGROUND_TIMING,
  MIDGROUND_TIMING,
  FOREGROUND_TIMING,
  
  // Stagger configurations
  CONSTELLATION_STAGGER,
  ORBITAL_ENTRY_STAGGER,
  PARTICLE_REVEAL_STAGGER,
  
  // Utility functions
  getTimingByCategory,
  createCustomTiming,
  scaleTimingForPerformance,
  calculateStaggerDelay,
  createStaggeredSequence,
  createAnimationSequence,
  getSequenceStepTiming,
  createSyncGroup,
  getSyncedTiming,
  updateSyncGroupMaster,
  createAnimatedValue,
  createLoopingAnimation,
  createSpringAnimation,
};
