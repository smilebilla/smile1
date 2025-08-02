/**
 * Corp Astro UI Library - Orbital Timing Functions
 * 
 * Timing functions for orbital motion that provide natural, celestial feel
 * with custom easing curves and synchronized timing patterns following
 * the exact specifications from the Design System and Visual Language.
 * 
 * @module OrbitalTiming
 * @version 1.0.0
 * @since 2024
 * 
 * UI Documentation Reference:
 * - Visual Language: Celestial Timing principles (lines 409-430)
 * - Design System: Orbital animation timing specifications (lines 2870-2900)
 * - Developer Handoff: Timing implementation examples (lines 1131-1173)
 */

import { Easing } from 'react-native';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Orbital timing function type
 */
export type OrbitalTimingFunction = (t: number) => number;

/**
 * Orbital timing preset names
 */
export type OrbitalTimingPreset = 
  | 'celestial'
  | 'orbital'
  | 'satellite'
  | 'constellation'
  | 'cosmic'
  | 'stellar'
  | 'lunar'
  | 'solar';

/**
 * Orbital timing category
 */
export type OrbitalTimingCategory = 'entrance' | 'exit' | 'loop' | 'pulse' | 'transition';

/**
 * Orbital timing configuration
 */
export interface OrbitalTimingConfig {
  /** Base duration in milliseconds */
  duration: number;
  /** Easing function */
  easing: OrbitalTimingFunction;
  /** Category of timing */
  category: OrbitalTimingCategory;
  /** Delay before animation starts */
  delay?: number;
  /** Stagger timing for multiple elements */
  stagger?: number;
  /** Whether timing respects physics */
  respectPhysics?: boolean;
}

/**
 * Orbital timing sequence configuration
 */
export interface OrbitalTimingSequence {
  /** Array of timing configurations */
  timings: OrbitalTimingConfig[];
  /** Total sequence duration */
  totalDuration: number;
  /** Whether sequence loops */
  loops?: boolean;
  /** Loop count (-1 for infinite) */
  loopCount?: number;
}

/**
 * Orbital timing hierarchy levels
 */
export interface OrbitalTimingHierarchy {
  /** Background timing (slow, continuous) */
  background: OrbitalTimingConfig;
  /** Mid-ground timing (moderate, reactive) */
  midground: OrbitalTimingConfig;
  /** Foreground timing (quick, responsive) */
  foreground: OrbitalTimingConfig;
}

// ============================================================================
// ORBITAL TIMING CONSTANTS
// ============================================================================

/**
 * Minimum timing threshold (200ms as per Visual Language)
 */
export const MIN_TIMING_THRESHOLD = 200;

/**
 * Base timing durations for different categories
 * Based on Visual Language: Background (20-30s), Mid-ground (2-3s), Foreground (200-400ms)
 */
export const BASE_TIMING_DURATIONS = {
  background: 25000,   // 25 seconds - slow, continuous
  midground: 2500,     // 2.5 seconds - moderate, reactive
  foreground: 300,     // 300ms - quick, responsive
  entrance: 600,       // 600ms - orbital entry
  exit: 400,           // 400ms - orbital exit
  pulse: 4000,         // 4 seconds - orbital pulse
  transition: 1000,    // 1 second - constellation reveal
} as const;

/**
 * Stagger timing for different elements
 * Based on Visual Language: Constellation stagger 50ms between points
 */
export const STAGGER_TIMINGS = {
  constellation: 50,   // 50ms between constellation points
  orbital: 100,        // 100ms between orbital elements
  satellite: 120,      // 120ms between satellites (0, 120, 240 degrees)
  sequence: 200,       // 200ms between sequence elements
} as const;

/**
 * Cubic-bezier timing curves for orbital motion
 * Based on Visual Language: Orbital entry cubic-bezier(0.34, 1.56, 0.64, 1)
 */
export const ORBITAL_CUBIC_BEZIER = {
  orbital: [0.34, 1.56, 0.64, 1],        // Orbital entry easing
  celestial: [0.25, 0.46, 0.45, 0.94],   // Celestial natural easing
  constellation: [0.4, 0.0, 0.2, 1],     // Constellation reveal easing
  satellite: [0.42, 0, 0.58, 1],         // Satellite motion easing
  cosmic: [0.19, 1, 0.22, 1],            // Cosmic expansion easing
  stellar: [0.68, -0.55, 0.265, 1.55],   // Stellar pulse easing
  lunar: [0.77, 0, 0.175, 1],            // Lunar cycle easing
  solar: [0.55, 0.085, 0.68, 0.53],      // Solar flare easing
} as const;

// ============================================================================
// ORBITAL TIMING FUNCTIONS
// ============================================================================

/**
 * Create cubic-bezier easing function
 */
const createCubicBezier = (x1: number, y1: number, x2: number, y2: number): OrbitalTimingFunction => {
  return Easing.bezier(x1, y1, x2, y2);
};

/**
 * Create orbital timing function from preset
 */
const createOrbitalTiming = (preset: OrbitalTimingPreset): OrbitalTimingFunction => {
  const curve = ORBITAL_CUBIC_BEZIER[preset];
  return createCubicBezier(curve[0], curve[1], curve[2], curve[3]);
};

/**
 * Validate timing duration against minimum threshold
 */
const validateTimingDuration = (duration: number): number => {
  return Math.max(duration, MIN_TIMING_THRESHOLD);
};

/**
 * Calculate staggered timing for multiple elements
 */
const calculateStaggeredTiming = (
  baseTiming: OrbitalTimingConfig,
  elementCount: number,
  staggerType: keyof typeof STAGGER_TIMINGS = 'sequence'
): OrbitalTimingConfig[] => {
  const staggerDelay = STAGGER_TIMINGS[staggerType];
  const timings: OrbitalTimingConfig[] = [];
  
  for (let i = 0; i < elementCount; i++) {
    timings.push({
      ...baseTiming,
      delay: (baseTiming.delay || 0) + (i * staggerDelay),
    });
  }
  
  return timings;
};

/**
 * Calculate total sequence duration
 */
const calculateSequenceDuration = (sequence: OrbitalTimingConfig[]): number => {
  let totalDuration = 0;
  
  for (const timing of sequence) {
    const elementDuration = (timing.delay || 0) + timing.duration;
    totalDuration = Math.max(totalDuration, elementDuration);
  }
  
  return totalDuration;
};

// ============================================================================
// ORBITAL TIMING PRESETS
// ============================================================================

/**
 * Celestial timing preset
 * Natural, organic timing that respects cosmic rhythms
 */
const celestialTiming: OrbitalTimingConfig = {
  duration: BASE_TIMING_DURATIONS.midground,
  easing: createOrbitalTiming('celestial'),
  category: 'loop',
  respectPhysics: true,
};

/**
 * Orbital entry timing preset
 * Based on Visual Language: 600ms orbital entry
 */
const orbitalEntryTiming: OrbitalTimingConfig = {
  duration: BASE_TIMING_DURATIONS.entrance,
  easing: createOrbitalTiming('orbital'),
  category: 'entrance',
  respectPhysics: true,
};

/**
 * Orbital exit timing preset
 * Smooth exit following orbital path
 */
const orbitalExitTiming: OrbitalTimingConfig = {
  duration: BASE_TIMING_DURATIONS.exit,
  easing: createOrbitalTiming('orbital'),
  category: 'exit',
  respectPhysics: true,
};

/**
 * Constellation reveal timing preset
 * Based on Visual Language: 1000ms constellation reveal with 50ms stagger
 */
const constellationRevealTiming: OrbitalTimingConfig = {
  duration: BASE_TIMING_DURATIONS.transition,
  easing: createOrbitalTiming('constellation'),
  category: 'transition',
  stagger: STAGGER_TIMINGS.constellation,
  respectPhysics: true,
};

/**
 * Satellite orbit timing preset
 * Continuous orbital motion for satellite elements
 */
const satelliteOrbitTiming: OrbitalTimingConfig = {
  duration: 10000, // 10 seconds as per Design System
  easing: createOrbitalTiming('satellite'),
  category: 'loop',
  respectPhysics: true,
};

/**
 * Orbital pulse timing preset
 * Based on Design System: 4s pulse duration
 */
const orbitalPulseTiming: OrbitalTimingConfig = {
  duration: BASE_TIMING_DURATIONS.pulse,
  easing: createOrbitalTiming('stellar'),
  category: 'pulse',
  respectPhysics: true,
};

/**
 * Cosmic expansion timing preset
 * For expanding/contracting cosmic elements
 */
const cosmicExpansionTiming: OrbitalTimingConfig = {
  duration: BASE_TIMING_DURATIONS.midground,
  easing: createOrbitalTiming('cosmic'),
  category: 'transition',
  respectPhysics: true,
};

/**
 * Stellar pulse timing preset
 * Natural stellar pulsing rhythm
 */
const stellarPulseTiming: OrbitalTimingConfig = {
  duration: BASE_TIMING_DURATIONS.pulse,
  easing: createOrbitalTiming('stellar'),
  category: 'pulse',
  respectPhysics: true,
};

// ============================================================================
// ORBITAL TIMING HIERARCHY
// ============================================================================

/**
 * Default orbital timing hierarchy
 * Based on Visual Language: Background (20-30s), Mid-ground (2-3s), Foreground (200-400ms)
 */
const defaultOrbitalTimingHierarchy: OrbitalTimingHierarchy = {
  background: {
    duration: BASE_TIMING_DURATIONS.background,
    easing: createOrbitalTiming('celestial'),
    category: 'loop',
    respectPhysics: true,
  },
  midground: {
    duration: BASE_TIMING_DURATIONS.midground,
    easing: createOrbitalTiming('orbital'),
    category: 'transition',
    respectPhysics: true,
  },
  foreground: {
    duration: BASE_TIMING_DURATIONS.foreground,
    easing: createOrbitalTiming('constellation'),
    category: 'transition',
    respectPhysics: true,
  },
};

/**
 * Create custom orbital timing hierarchy
 */
const createOrbitalTimingHierarchy = (
  backgroundPreset: OrbitalTimingPreset = 'celestial',
  midgroundPreset: OrbitalTimingPreset = 'orbital',
  foregroundPreset: OrbitalTimingPreset = 'constellation'
): OrbitalTimingHierarchy => {
  return {
    background: {
      duration: BASE_TIMING_DURATIONS.background,
      easing: createOrbitalTiming(backgroundPreset),
      category: 'loop',
      respectPhysics: true,
    },
    midground: {
      duration: BASE_TIMING_DURATIONS.midground,
      easing: createOrbitalTiming(midgroundPreset),
      category: 'transition',
      respectPhysics: true,
    },
    foreground: {
      duration: BASE_TIMING_DURATIONS.foreground,
      easing: createOrbitalTiming(foregroundPreset),
      category: 'transition',
      respectPhysics: true,
    },
  };
};

// ============================================================================
// ORBITAL TIMING SEQUENCES
// ============================================================================

/**
 * Create orbital entrance sequence
 * Orchestrated sequence for orbital elements entering
 */
const createOrbitalEntranceSequence = (elementCount: number): OrbitalTimingSequence => {
  const baseTimings = calculateStaggeredTiming(
    orbitalEntryTiming,
    elementCount,
    'orbital'
  );
  
  return {
    timings: baseTimings,
    totalDuration: calculateSequenceDuration(baseTimings),
    loops: false,
  };
};

/**
 * Create constellation reveal sequence
 * Based on Visual Language: Points appear first, connections draw between
 */
const createConstellationRevealSequence = (starCount: number): OrbitalTimingSequence => {
  const starTimings = calculateStaggeredTiming(
    constellationRevealTiming,
    starCount,
    'constellation'
  );
  
  // Connection timing starts after stars are revealed
  const connectionDelay = calculateSequenceDuration(starTimings);
  const connectionTiming: OrbitalTimingConfig = {
    ...constellationRevealTiming,
    delay: connectionDelay,
    duration: BASE_TIMING_DURATIONS.transition,
  };
  
  return {
    timings: [...starTimings, connectionTiming],
    totalDuration: calculateSequenceDuration([...starTimings, connectionTiming]),
    loops: false,
  };
};

/**
 * Create satellite orbit sequence
 * Synchronized orbital motion for multiple satellites
 */
const createSatelliteOrbitSequence = (satelliteCount: number = 3): OrbitalTimingSequence => {
  const timings: OrbitalTimingConfig[] = [];
  
  for (let i = 0; i < satelliteCount; i++) {
    const offset = (360 / satelliteCount) * i; // Evenly distributed
    timings.push({
      ...satelliteOrbitTiming,
      delay: (offset / 360) * satelliteOrbitTiming.duration,
    });
  }
  
  return {
    timings,
    totalDuration: satelliteOrbitTiming.duration,
    loops: true,
    loopCount: -1, // Infinite loops
  };
};

/**
 * Create cosmic pulse sequence
 * Rhythmic pulsing for cosmic elements
 */
const createCosmicPulseSequence = (pulseCount: number = 1): OrbitalTimingSequence => {
  const timings: OrbitalTimingConfig[] = [];
  
  for (let i = 0; i < pulseCount; i++) {
    timings.push({
      ...orbitalPulseTiming,
      delay: i * orbitalPulseTiming.duration,
    });
  }
  
  return {
    timings,
    totalDuration: pulseCount * orbitalPulseTiming.duration,
    loops: true,
    loopCount: -1, // Infinite loops
  };
};

// ============================================================================
// ORBITAL TIMING UTILITIES
// ============================================================================

/**
 * Apply physics-based timing adjustment
 * Ensures timing respects natural physics principles
 */
const applyPhysicsAdjustment = (timing: OrbitalTimingConfig): OrbitalTimingConfig => {
  if (!timing.respectPhysics) {
    return timing;
  }
  
  // Apply minimum timing threshold
  const adjustedDuration = validateTimingDuration(timing.duration);
  
  // Ensure natural acceleration/deceleration
  const physicsEasing = timing.category === 'entrance' || timing.category === 'exit'
    ? createOrbitalTiming('orbital')
    : timing.easing;
  
  return {
    ...timing,
    duration: adjustedDuration,
    easing: physicsEasing,
  };
};

/**
 * Synchronize timing with orbital periods
 * Ensures timing aligns with orbital rhythm
 */
const synchronizeWithOrbit = (
  timing: OrbitalTimingConfig,
  orbitalPeriod: number
): OrbitalTimingConfig => {
  const synchronizedDuration = Math.round(timing.duration / orbitalPeriod) * orbitalPeriod;
  
  return {
    ...timing,
    duration: synchronizedDuration,
  };
};

/**
 * Create responsive timing based on element size
 * Larger elements move slower, smaller elements move faster
 */
const createResponsiveTiming = (
  baseTiming: OrbitalTimingConfig,
  elementSize: number,
  baseSize: number = 64
): OrbitalTimingConfig => {
  const sizeRatio = elementSize / baseSize;
  const adjustedDuration = baseTiming.duration * Math.sqrt(sizeRatio);
  
  return {
    ...baseTiming,
    duration: validateTimingDuration(adjustedDuration),
  };
};

// ============================================================================
// ORBITAL TIMING FACTORY FUNCTIONS
// ============================================================================

/**
 * Create orbital timing configuration
 */
const createOrbitalTimingConfig = (
  preset: OrbitalTimingPreset,
  category: OrbitalTimingCategory,
  duration?: number
): OrbitalTimingConfig => {
  // Map timing categories to BASE_TIMING_DURATIONS keys
  const getDurationForCategory = (cat: OrbitalTimingCategory): number => {
    switch (cat) {
      case 'entrance':
        return BASE_TIMING_DURATIONS.entrance;
      case 'exit':
        return BASE_TIMING_DURATIONS.exit;
      case 'loop':
        return BASE_TIMING_DURATIONS.midground;
      case 'pulse':
        return BASE_TIMING_DURATIONS.pulse;
      case 'transition':
        return BASE_TIMING_DURATIONS.transition;
      default:
        return BASE_TIMING_DURATIONS.midground;
    }
  };
  
  const baseDuration = duration || getDurationForCategory(category);
  
  return {
    duration: validateTimingDuration(baseDuration),
    easing: createOrbitalTiming(preset),
    category,
    respectPhysics: true,
  };
};

/**
 * Create multi-element orbital timing
 */
const createMultiElementTiming = (
  elementCount: number,
  baseTiming: OrbitalTimingConfig,
  staggerType: keyof typeof STAGGER_TIMINGS = 'sequence'
): OrbitalTimingSequence => {
  const timings = calculateStaggeredTiming(baseTiming, elementCount, staggerType);
  
  return {
    timings,
    totalDuration: calculateSequenceDuration(timings),
    loops: baseTiming.category === 'loop',
    loopCount: baseTiming.category === 'loop' ? -1 : 1,
  };
};

// ============================================================================
// EXPORTS
// ============================================================================

export {
  // Core timing functions
  createCubicBezier,
  createOrbitalTiming,
  validateTimingDuration,
  
  // Timing calculations
  calculateStaggeredTiming,
  calculateSequenceDuration,
  
  // Timing presets
  celestialTiming,
  orbitalEntryTiming,
  orbitalExitTiming,
  constellationRevealTiming,
  satelliteOrbitTiming,
  orbitalPulseTiming,
  cosmicExpansionTiming,
  stellarPulseTiming,
  
  // Timing hierarchy
  defaultOrbitalTimingHierarchy,
  createOrbitalTimingHierarchy,
  
  // Timing sequences
  createOrbitalEntranceSequence,
  createConstellationRevealSequence,
  createSatelliteOrbitSequence,
  createCosmicPulseSequence,
  
  // Timing utilities
  applyPhysicsAdjustment,
  synchronizeWithOrbit,
  createResponsiveTiming,
  
  // Factory functions
  createOrbitalTimingConfig,
  createMultiElementTiming,
};

export default createOrbitalTiming;
