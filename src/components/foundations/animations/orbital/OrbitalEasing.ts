/**
 * Corp Astro UI Library - Orbital Easing Curves
 * 
 * Custom easing curves for orbital motion effects that simulate natural
 * celestial physics and provide smooth, realistic orbital animations
 * following the exact specifications from the Design System and Visual Language.
 * 
 * @module OrbitalEasing
 * @version 1.0.0
 * @since 2024
 * 
 * UI Documentation Reference:
 * - Visual Language: Orbital Entry easing cubic-bezier(0.34, 1.56, 0.64, 1) (line 425)
 * - Design Tokens: Complete easing system (lines 741-753)
 * - Design System: Natural easing principles (line 411)
 */

import { Easing } from 'react-native';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Easing function type compatible with React Native
 */
export type EasingFunction = (t: number) => number;

/**
 * Orbital easing curve names
 */
export type OrbitalEasingCurve = 
  | 'orbital'
  | 'celestial'
  | 'satellite'
  | 'constellation'
  | 'cosmic'
  | 'stellar'
  | 'lunar'
  | 'solar'
  | 'planetary'
  | 'asteroid'
  | 'comet'
  | 'nebula';

/**
 * Orbital easing category
 */
export type OrbitalEasingCategory = 'entry' | 'exit' | 'loop' | 'pulse' | 'transition';

/**
 * Orbital easing configuration
 */
export interface OrbitalEasingConfig {
  /** Easing function */
  easing: EasingFunction;
  /** Category of easing */
  category: OrbitalEasingCategory;
  /** Physics-based properties */
  physics: {
    /** Acceleration factor */
    acceleration: number;
    /** Deceleration factor */
    deceleration: number;
    /** Orbital momentum */
    momentum: number;
    /** Gravitational influence */
    gravity: number;
  };
  /** Performance characteristics */
  performance: {
    /** CPU optimization level */
    optimization: 'low' | 'medium' | 'high';
    /** Memory footprint */
    memory: 'minimal' | 'standard' | 'extended';
  };
}

/**
 * Orbital easing preset definition
 */
export interface OrbitalEasingPreset {
  /** Display name */
  name: string;
  /** Easing configuration */
  config: OrbitalEasingConfig;
  /** Usage description */
  description: string;
  /** Recommended use cases */
  useCases: string[];
}

// ============================================================================
// ORBITAL EASING CONSTANTS
// ============================================================================

/**
 * Cubic-bezier curves for orbital motion
 * Based on Design Tokens: exact cubic-bezier specifications (lines 741-753)
 */
const ORBITAL_CUBIC_BEZIER_CURVES = {
  // Core orbital curves from Design Tokens
  linear: [0, 0, 1, 1],                          // Linear motion
  easeIn: [0.4, 0, 1, 1],                        // Standard ease in
  easeOut: [0, 0, 0.2, 1],                       // Standard ease out
  easeInOut: [0.4, 0, 0.2, 1],                   // Standard ease in-out
  easeInQuad: [0.55, 0.085, 0.68, 0.53],         // Quadratic ease in
  easeOutQuad: [0.25, 0.46, 0.45, 0.94],         // Quadratic ease out
  easeInOutQuad: [0.455, 0.03, 0.515, 0.955],    // Quadratic ease in-out
  bounce: [0.34, 1.56, 0.64, 1],                 // Bounce effect (Visual Language line 425)
  anticipate: [0.175, 0.885, 0.32, 1.275],       // Anticipation curve
  
  // Specialized orbital curves
  orbital: [0.34, 1.56, 0.64, 1],                // Primary orbital entry (Visual Language)
  celestial: [0.25, 0.46, 0.45, 0.94],           // Natural celestial motion
  satellite: [0.42, 0, 0.58, 1],                 // Satellite orbital motion
  constellation: [0.4, 0.0, 0.2, 1],             // Constellation reveal
  cosmic: [0.19, 1, 0.22, 1],                    // Cosmic expansion
  stellar: [0.68, -0.55, 0.265, 1.55],           // Stellar pulse
  lunar: [0.77, 0, 0.175, 1],                    // Lunar cycle
  solar: [0.55, 0.085, 0.68, 0.53],              // Solar flare
  planetary: [0.645, 0.045, 0.355, 1],           // Planetary motion
  asteroid: [0.895, 0.03, 0.685, 0.22],          // Asteroid trajectory
  comet: [0.165, 0.84, 0.44, 1],                 // Comet tail
  nebula: [0.23, 1, 0.32, 1],                    // Nebula drift
} as const;

/**
 * Physics parameters type
 */
export type PhysicsParameters = {
  acceleration: number;
  deceleration: number;
  momentum: number;
  gravity: number;
};

/**
 * Physics-based easing parameters
 * Based on Visual Language: Natural easing and physics principles
 */
const ORBITAL_PHYSICS_PARAMETERS = {
  orbital: {
    acceleration: 0.3,
    deceleration: 0.7,
    momentum: 0.8,
    gravity: 0.5,
  },
  celestial: {
    acceleration: 0.2,
    deceleration: 0.8,
    momentum: 0.9,
    gravity: 0.3,
  },
  satellite: {
    acceleration: 0.4,
    deceleration: 0.6,
    momentum: 0.7,
    gravity: 0.6,
  },
  constellation: {
    acceleration: 0.5,
    deceleration: 0.5,
    momentum: 0.6,
    gravity: 0.4,
  },
  cosmic: {
    acceleration: 0.1,
    deceleration: 0.9,
    momentum: 1.0,
    gravity: 0.2,
  },
  stellar: {
    acceleration: 0.6,
    deceleration: 0.4,
    momentum: 0.5,
    gravity: 0.7,
  },
  lunar: {
    acceleration: 0.3,
    deceleration: 0.7,
    momentum: 0.8,
    gravity: 0.4,
  },
  solar: {
    acceleration: 0.7,
    deceleration: 0.3,
    momentum: 0.4,
    gravity: 0.8,
  },
  planetary: {
    acceleration: 0.2,
    deceleration: 0.8,
    momentum: 0.9,
    gravity: 0.5,
  },
  asteroid: {
    acceleration: 0.8,
    deceleration: 0.2,
    momentum: 0.3,
    gravity: 0.9,
  },
  comet: {
    acceleration: 0.4,
    deceleration: 0.6,
    momentum: 0.7,
    gravity: 0.6,
  },
  nebula: {
    acceleration: 0.1,
    deceleration: 0.9,
    momentum: 1.0,
    gravity: 0.1,
  },
} as const;

// ============================================================================
// ORBITAL EASING FUNCTIONS
// ============================================================================

/**
 * Create cubic-bezier easing function from curve points
 */
const createCubicBezier = (x1: number, y1: number, x2: number, y2: number): EasingFunction => {
  return Easing.bezier(x1, y1, x2, y2);
};

/**
 * Create orbital easing function from curve name
 */
const createOrbitalEasing = (curve: OrbitalEasingCurve): EasingFunction => {
  const bezierCurve = ORBITAL_CUBIC_BEZIER_CURVES[curve];
  return createCubicBezier(bezierCurve[0], bezierCurve[1], bezierCurve[2], bezierCurve[3]);
};

/**
 * Apply physics-based modification to easing function
 */
const applyPhysicsToEasing = (
  baseEasing: EasingFunction,
  physics: PhysicsParameters
): EasingFunction => {
  return (t: number) => {
    const baseValue = baseEasing(t);
    
    // Apply acceleration/deceleration curves
    const accelerationPhase = t < 0.5 ? 
      Math.pow(t * 2, physics.acceleration) * 0.5 : 
      1 - Math.pow((1 - t) * 2, physics.deceleration) * 0.5;
    
    // Apply momentum and gravity
    const momentumFactor = physics.momentum;
    const gravityFactor = physics.gravity;
    
    // Combine base easing with physics
    return baseValue * (1 - gravityFactor) + accelerationPhase * gravityFactor * momentumFactor;
  };
};

/**
 * Create physics-aware orbital easing configuration
 */
const createOrbitalEasingConfig = (
  curve: OrbitalEasingCurve,
  category: OrbitalEasingCategory,
  applyPhysics: boolean = true
): OrbitalEasingConfig => {
  const baseEasing = createOrbitalEasing(curve);
  const physics = ORBITAL_PHYSICS_PARAMETERS[curve];
  
  const finalEasing = applyPhysics ? 
    applyPhysicsToEasing(baseEasing, physics) : 
    baseEasing;
  
  return {
    easing: finalEasing,
    category,
    physics,
    performance: {
      optimization: 'high',
      memory: 'minimal',
    },
  };
};

// ============================================================================
// ORBITAL EASING PRESETS
// ============================================================================

/**
 * Orbital entry easing preset
 * Based on Visual Language: cubic-bezier(0.34, 1.56, 0.64, 1) for orbital entry
 */
const orbitalEntryEasing: OrbitalEasingPreset = {
  name: 'Orbital Entry',
  config: createOrbitalEasingConfig('orbital', 'entry', true),
  description: 'Smooth orbital entry with natural physics',
  useCases: ['Element entrance', 'Modal opening', 'Navigation transitions'],
};

/**
 * Orbital exit easing preset
 * Smooth exit following orbital path
 */
const orbitalExitEasing: OrbitalEasingPreset = {
  name: 'Orbital Exit',
  config: createOrbitalEasingConfig('orbital', 'exit', true),
  description: 'Natural orbital exit with physics-based deceleration',
  useCases: ['Element exit', 'Modal closing', 'Navigation back'],
};

/**
 * Celestial loop easing preset
 * Natural, continuous celestial motion
 */
const celestialLoopEasing: OrbitalEasingPreset = {
  name: 'Celestial Loop',
  config: createOrbitalEasingConfig('celestial', 'loop', true),
  description: 'Continuous celestial motion with natural rhythm',
  useCases: ['Background animations', 'Infinite rotations', 'Ambient effects'],
};

/**
 * Constellation reveal easing preset
 * Based on Design Tokens: constellation easing curves
 */
const constellationRevealEasing: OrbitalEasingPreset = {
  name: 'Constellation Reveal',
  config: createOrbitalEasingConfig('constellation', 'transition', true),
  description: 'Smooth constellation point and line reveal',
  useCases: ['Point connections', 'Line drawings', 'Pattern reveals'],
};

/**
 * Satellite orbit easing preset
 * Consistent orbital motion for satellites
 */
const satelliteOrbitEasing: OrbitalEasingPreset = {
  name: 'Satellite Orbit',
  config: createOrbitalEasingConfig('satellite', 'loop', true),
  description: 'Consistent satellite orbital motion',
  useCases: ['Satellite animations', 'Circular motions', 'Orbital elements'],
};

/**
 * Cosmic pulse easing preset
 * Gentle pulsing with stellar physics
 */
const cosmicPulseEasing: OrbitalEasingPreset = {
  name: 'Cosmic Pulse',
  config: createOrbitalEasingConfig('cosmic', 'pulse', true),
  description: 'Gentle cosmic pulsing with stellar physics',
  useCases: ['Pulse animations', 'Breathing effects', 'Stellar pulsing'],
};

/**
 * Stellar pulse easing preset
 * Natural stellar pulsing rhythm
 */
const stellarPulseEasing: OrbitalEasingPreset = {
  name: 'Stellar Pulse',
  config: createOrbitalEasingConfig('stellar', 'pulse', true),
  description: 'Natural stellar pulsing with variable intensity',
  useCases: ['Star pulsing', 'Glow effects', 'Intensity variations'],
};

/**
 * Lunar cycle easing preset
 * Smooth lunar cycle motion
 */
const lunarCycleEasing: OrbitalEasingPreset = {
  name: 'Lunar Cycle',
  config: createOrbitalEasingConfig('lunar', 'loop', true),
  description: 'Smooth lunar cycle with natural timing',
  useCases: ['Phase transitions', 'Cyclical animations', 'Periodic effects'],
};

/**
 * Solar flare easing preset
 * Intense solar activity motion
 */
const solarFlareEasing: OrbitalEasingPreset = {
  name: 'Solar Flare',
  config: createOrbitalEasingConfig('solar', 'transition', true),
  description: 'Intense solar flare with rapid acceleration',
  useCases: ['Burst animations', 'Rapid transitions', 'Energy effects'],
};

/**
 * Planetary motion easing preset
 * Stable planetary orbital motion
 */
const planetaryMotionEasing: OrbitalEasingPreset = {
  name: 'Planetary Motion',
  config: createOrbitalEasingConfig('planetary', 'loop', true),
  description: 'Stable planetary motion with consistent orbit',
  useCases: ['Large element rotations', 'Stable orbits', 'Consistent motion'],
};

/**
 * Asteroid trajectory easing preset
 * Erratic asteroid motion
 */
const asteroidTrajectoryEasing: OrbitalEasingPreset = {
  name: 'Asteroid Trajectory',
  config: createOrbitalEasingConfig('asteroid', 'transition', true),
  description: 'Erratic asteroid trajectory with variable speed',
  useCases: ['Irregular motion', 'Unpredictable paths', 'Debris effects'],
};

/**
 * Comet tail easing preset
 * Comet with trailing effects
 */
const cometTailEasing: OrbitalEasingPreset = {
  name: 'Comet Tail',
  config: createOrbitalEasingConfig('comet', 'transition', true),
  description: 'Comet motion with trailing effects',
  useCases: ['Trail animations', 'Streak effects', 'Particle trails'],
};

/**
 * Nebula drift easing preset
 * Slow nebula drift motion
 */
const nebulaDriftEasing: OrbitalEasingPreset = {
  name: 'Nebula Drift',
  config: createOrbitalEasingConfig('nebula', 'loop', true),
  description: 'Slow nebula drift with gentle motion',
  useCases: ['Background drift', 'Ambient motion', 'Gentle effects'],
};

// ============================================================================
// ORBITAL EASING UTILITIES
// ============================================================================

/**
 * Get easing function by curve name
 */
const getOrbitalEasing = (curve: OrbitalEasingCurve): EasingFunction => {
  return createOrbitalEasing(curve);
};

/**
 * Get easing preset by curve name
 */
const getOrbitalEasingPreset = (curve: OrbitalEasingCurve): OrbitalEasingPreset | null => {
  const presets = {
    orbital: orbitalEntryEasing,
    celestial: celestialLoopEasing,
    satellite: satelliteOrbitEasing,
    constellation: constellationRevealEasing,
    cosmic: cosmicPulseEasing,
    stellar: stellarPulseEasing,
    lunar: lunarCycleEasing,
    solar: solarFlareEasing,
    planetary: planetaryMotionEasing,
    asteroid: asteroidTrajectoryEasing,
    comet: cometTailEasing,
    nebula: nebulaDriftEasing,
  };
  
  return presets[curve] || null;
};

/**
 * Create custom orbital easing with physics
 */
const createCustomOrbitalEasing = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  physics?: Partial<PhysicsParameters>
): EasingFunction => {
  const baseEasing = createCubicBezier(x1, y1, x2, y2);
  
  if (!physics) {
    return baseEasing;
  }
  
  const physicsParams: PhysicsParameters = {
    acceleration: physics.acceleration || 0.5,
    deceleration: physics.deceleration || 0.5,
    momentum: physics.momentum || 0.7,
    gravity: physics.gravity || 0.5,
  };
  
  return applyPhysicsToEasing(baseEasing, physicsParams);
};

/**
 * Validate easing curve parameters
 */
const validateEasingCurve = (x1: number, y1: number, x2: number, y2: number): boolean => {
  // Validate cubic-bezier constraints
  return (
    x1 >= 0 && x1 <= 1 &&
    x2 >= 0 && x2 <= 1 &&
    !isNaN(y1) && !isNaN(y2) &&
    isFinite(y1) && isFinite(y2)
  );
};

// ============================================================================
// EXPORTS
// ============================================================================

export {
  // Core easing functions
  createCubicBezier,
  createOrbitalEasing,
  createOrbitalEasingConfig,
  
  // Easing presets
  orbitalEntryEasing,
  orbitalExitEasing,
  celestialLoopEasing,
  constellationRevealEasing,
  satelliteOrbitEasing,
  cosmicPulseEasing,
  stellarPulseEasing,
  lunarCycleEasing,
  solarFlareEasing,
  planetaryMotionEasing,
  asteroidTrajectoryEasing,
  cometTailEasing,
  nebulaDriftEasing,
  
  // Utilities
  getOrbitalEasing,
  getOrbitalEasingPreset,
  createCustomOrbitalEasing,
  validateEasingCurve,
  
  // Constants
  ORBITAL_CUBIC_BEZIER_CURVES,
  ORBITAL_PHYSICS_PARAMETERS,
};

export default createOrbitalEasing;
