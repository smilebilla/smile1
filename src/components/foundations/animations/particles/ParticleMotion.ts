/**
 * Corp Astro UI Library - Particle Motion Algorithms
 * 
 * Advanced particle motion system for cosmic effects. Provides realistic particle
 * physics, floating behaviors, and interactive responses that match the Corp Astro
 * cosmic theme. Supports multiple particle patterns, physics simulations, and
 * performance-optimized animations.
 * 
 * @module ParticleMotion
 * @version 1.0.0
 * @since 2024
 * 
 * UI Documentation Reference:
 * - Visual Language: Particle effects, floating elements (lines 216, 230)
 * - Design System: Cosmic particle animations (lines 1523-1525)
 * - Motion Philosophy: Celestial timing and physics (lines 400-430)
 * - Developer Handoff: Particle system implementation requirements
 */

import { Animated, Easing } from 'react-native';
import { useEffect, useRef, useMemo } from 'react';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Particle motion behavior types
 */
export type ParticleMotionType = 
  | 'float'         // Gentle floating motion
  | 'drift'         // Slow horizontal drift
  | 'orbit'         // Circular orbital motion
  | 'spiral'        // Spiral inward/outward
  | 'brownian'      // Random brownian motion
  | 'field'         // Magnetic field-like motion
  | 'constellation' // Star constellation formation
  | 'stardust';     // Twinkling stardust effect

/**
 * Particle physics configuration
 */
export interface ParticlePhysics {
  /** Gravity strength (0-1) */
  gravity?: number;
  /** Friction coefficient (0-1) */
  friction?: number;
  /** Bounce elasticity (0-1) */
  bounce?: number;
  /** Wind force direction and strength */
  wind?: {
    x: number;
    y: number;
    strength: number;
  };
  /** Magnetic field center and strength */
  magneticField?: {
    x: number;
    y: number;
    strength: number;
    radius: number;
  };
}

/**
 * Individual particle configuration
 */
export interface ParticleConfig {
  /** Particle unique identifier */
  id: string;
  /** Initial position */
  position: {
    x: number;
    y: number;
  };
  /** Initial velocity */
  velocity: {
    x: number;
    y: number;
  };
  /** Particle size (0-1) */
  size: number;
  /** Particle opacity (0-1) */
  opacity: number;
  /** Particle mass (affects physics) */
  mass: number;
  /** Particle color */
  color: string;
  /** Motion behavior type */
  motionType: ParticleMotionType;
  /** Custom motion parameters */
  motionParams?: {
    amplitude?: number;
    frequency?: number;
    phase?: number;
    radius?: number;
    speed?: number;
  };
}

/**
 * Particle system configuration
 */
export interface ParticleSystemConfig {
  /** Number of particles */
  count: number;
  /** Container boundaries */
  bounds: {
    width: number;
    height: number;
  };
  /** Physics configuration */
  physics?: ParticlePhysics;
  /** Global motion settings */
  globalMotion?: {
    type: ParticleMotionType;
    speed: number;
    direction: number; // Angle in radians
  };
  /** Performance settings */
  performance?: {
    maxFPS: number;
    enableOptimization: boolean;
    lowPowerMode: boolean;
  };
}

/**
 * Particle motion state
 */
export interface ParticleMotionState {
  /** Current position */
  position: {
    x: number;
    y: number;
  };
  /** Current velocity */
  velocity: {
    x: number;
    y: number;
  };
  /** Current acceleration */
  acceleration: {
    x: number;
    y: number;
  };
  /** Current rotation */
  rotation: number;
  /** Current scale */
  scale: number;
  /** Current opacity */
  opacity: number;
  /** Animation timestamp */
  timestamp: number;
}

/**
 * Particle motion result
 */
export interface ParticleMotionResult {
  /** Animated values for position */
  position: {
    x: Animated.Value;
    y: Animated.Value;
  };
  /** Animated values for visual properties */
  visual: {
    opacity: Animated.Value;
    scale: Animated.Value;
    rotation: Animated.Value;
  };
  /** Control functions */
  controls: {
    start: () => void;
    stop: () => void;
    pause: () => void;
    resume: () => void;
    reset: () => void;
    updatePhysics: (physics: Partial<ParticlePhysics>) => void;
  };
  /** Current state */
  state: ParticleMotionState;
}

// ============================================================================
// MOTION ALGORITHMS
// ============================================================================

/**
 * Floating motion algorithm
 * Gentle up-and-down motion with slight horizontal drift
 */
const createFloatingMotion = (
  config: ParticleConfig,
  time: number,
  physics: ParticlePhysics
): Partial<ParticleMotionState> => {
  const { motionParams = {} } = config;
  const amplitude = motionParams.amplitude || 20;
  const frequency = motionParams.frequency || 0.5;
  const phase = motionParams.phase || 0;

  const y = Math.sin(time * frequency + phase) * amplitude;
  const x = Math.cos(time * frequency * 0.3 + phase) * (amplitude * 0.3);

  return {
    position: {
      x: config.position.x + x,
      y: config.position.y + y,
    },
    velocity: {
      x: -Math.sin(time * frequency * 0.3 + phase) * amplitude * 0.3 * frequency,
      y: Math.cos(time * frequency + phase) * amplitude * frequency,
    },
  };
};

/**
 * Drift motion algorithm
 * Slow horizontal movement with subtle vertical oscillation
 */
const createDriftMotion = (
  config: ParticleConfig,
  time: number,
  physics: ParticlePhysics
): Partial<ParticleMotionState> => {
  const { motionParams = {} } = config;
  const speed = motionParams.speed || 0.5;
  const amplitude = motionParams.amplitude || 10;
  const frequency = motionParams.frequency || 0.2;

  const x = time * speed;
  const y = Math.sin(time * frequency) * amplitude;

  return {
    position: {
      x: config.position.x + x,
      y: config.position.y + y,
    },
    velocity: {
      x: speed,
      y: Math.cos(time * frequency) * amplitude * frequency,
    },
  };
};

/**
 * Orbital motion algorithm
 * Circular motion around a center point
 */
const createOrbitalMotion = (
  config: ParticleConfig,
  time: number,
  physics: ParticlePhysics
): Partial<ParticleMotionState> => {
  const { motionParams = {} } = config;
  const radius = motionParams.radius || 50;
  const speed = motionParams.speed || 1;
  const phase = motionParams.phase || 0;

  const angle = time * speed + phase;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  return {
    position: {
      x: config.position.x + x,
      y: config.position.y + y,
    },
    velocity: {
      x: -Math.sin(angle) * radius * speed,
      y: Math.cos(angle) * radius * speed,
    },
    rotation: angle,
  };
};

/**
 * Spiral motion algorithm
 * Spiral inward or outward motion
 */
const createSpiralMotion = (
  config: ParticleConfig,
  time: number,
  physics: ParticlePhysics
): Partial<ParticleMotionState> => {
  const { motionParams = {} } = config;
  const initialRadius = motionParams.radius || 50;
  const speed = motionParams.speed || 1;
  const spiralSpeed = motionParams.frequency || 0.1;
  const phase = motionParams.phase || 0;

  const angle = time * speed + phase;
  const radius = initialRadius + time * spiralSpeed;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  return {
    position: {
      x: config.position.x + x,
      y: config.position.y + y,
    },
    velocity: {
      x: -Math.sin(angle) * radius * speed + Math.cos(angle) * spiralSpeed,
      y: Math.cos(angle) * radius * speed + Math.sin(angle) * spiralSpeed,
    },
    rotation: angle,
  };
};

/**
 * Brownian motion algorithm
 * Random walk motion with physics constraints
 */
const createBrownianMotion = (
  config: ParticleConfig,
  time: number,
  physics: ParticlePhysics,
  previousState?: ParticleMotionState
): Partial<ParticleMotionState> => {
  const { motionParams = {} } = config;
  const intensity = motionParams.amplitude || 1;
  const friction = physics.friction || 0.95;

  // Generate random acceleration
  const randomAccelX = (Math.random() - 0.5) * intensity;
  const randomAccelY = (Math.random() - 0.5) * intensity;

  const prevVel = previousState?.velocity || { x: 0, y: 0 };
  const prevPos = previousState?.position || config.position;

  // Apply physics
  const newVelX = prevVel.x * friction + randomAccelX;
  const newVelY = prevVel.y * friction + randomAccelY;

  const newPosX = prevPos.x + newVelX;
  const newPosY = prevPos.y + newVelY;

  return {
    position: {
      x: newPosX,
      y: newPosY,
    },
    velocity: {
      x: newVelX,
      y: newVelY,
    },
    acceleration: {
      x: randomAccelX,
      y: randomAccelY,
    },
  };
};

/**
 * Magnetic field motion algorithm
 * Particles affected by magnetic field forces
 */
const createFieldMotion = (
  config: ParticleConfig,
  time: number,
  physics: ParticlePhysics,
  previousState?: ParticleMotionState
): Partial<ParticleMotionState> => {
  const { magneticField } = physics;
  if (!magneticField) return {};

  const prevPos = previousState?.position || config.position;
  const prevVel = previousState?.velocity || { x: 0, y: 0 };

  // Calculate distance to magnetic field center
  const dx = magneticField.x - prevPos.x;
  const dy = magneticField.y - prevPos.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  // Calculate magnetic force (inverse square law)
  const forceMagnitude = magneticField.strength / (distance * distance + 1);
  const forceX = (dx / distance) * forceMagnitude;
  const forceY = (dy / distance) * forceMagnitude;

  // Apply mass
  const accelX = forceX / config.mass;
  const accelY = forceY / config.mass;

  // Update velocity with friction
  const friction = physics.friction || 0.98;
  const newVelX = prevVel.x * friction + accelX;
  const newVelY = prevVel.y * friction + accelY;

  // Update position
  const newPosX = prevPos.x + newVelX;
  const newPosY = prevPos.y + newVelY;

  return {
    position: {
      x: newPosX,
      y: newPosY,
    },
    velocity: {
      x: newVelX,
      y: newVelY,
    },
    acceleration: {
      x: accelX,
      y: accelY,
    },
  };
};

/**
 * Constellation formation algorithm
 * Particles moving to form constellation patterns
 */
const createConstellationMotion = (
  config: ParticleConfig,
  time: number,
  physics: ParticlePhysics,
  targetPosition?: { x: number; y: number }
): Partial<ParticleMotionState> => {
  if (!targetPosition) return {};

  const { motionParams = {} } = config;
  const attractionStrength = motionParams.speed || 0.1;
  const arrivalRadius = motionParams.radius || 5;

  const dx = targetPosition.x - config.position.x;
  const dy = targetPosition.y - config.position.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < arrivalRadius) {
    // Arrived at target, gentle floating motion
    return createFloatingMotion(config, time, physics);
  }

  // Move towards target
  const directionX = dx / distance;
  const directionY = dy / distance;
  const speed = Math.min(distance * attractionStrength, 2); // Max speed cap

  return {
    position: {
      x: config.position.x + directionX * speed,
      y: config.position.y + directionY * speed,
    },
    velocity: {
      x: directionX * speed,
      y: directionY * speed,
    },
  };
};

/**
 * Stardust twinkling algorithm
 * Particles with twinkling opacity and gentle motion
 */
const createStardustMotion = (
  config: ParticleConfig,
  time: number,
  physics: ParticlePhysics
): Partial<ParticleMotionState> => {
  const { motionParams = {} } = config;
  const twinkleSpeed = motionParams.frequency || 2;
  const twinkleAmplitude = motionParams.amplitude || 0.5;
  const phase = motionParams.phase || 0;

  // Gentle floating motion
  const floatingMotion = createFloatingMotion(config, time, physics);

  // Twinkling opacity
  const opacity = config.opacity * (1 + Math.sin(time * twinkleSpeed + phase) * twinkleAmplitude);

  // Gentle scale pulsing
  const scale = 1 + Math.sin(time * twinkleSpeed * 0.7 + phase) * 0.2;

  return {
    ...floatingMotion,
    opacity: Math.max(0, Math.min(1, opacity)),
    scale,
  };
};

// ============================================================================
// PHYSICS SIMULATION
// ============================================================================

/**
 * Apply physics forces to particle motion
 */
const applyPhysics = (
  state: ParticleMotionState,
  config: ParticleConfig,
  physics: ParticlePhysics,
  bounds: { width: number; height: number },
  deltaTime: number
): ParticleMotionState => {
  let newState = { ...state };

  // Apply gravity
  if (physics.gravity) {
    newState.acceleration.y += physics.gravity * deltaTime;
  }

  // Apply wind
  if (physics.wind) {
    newState.acceleration.x += physics.wind.x * physics.wind.strength * deltaTime;
    newState.acceleration.y += physics.wind.y * physics.wind.strength * deltaTime;
  }

  // Apply friction
  if (physics.friction) {
    newState.velocity.x *= physics.friction;
    newState.velocity.y *= physics.friction;
  }

  // Update velocity
  newState.velocity.x += newState.acceleration.x * deltaTime;
  newState.velocity.y += newState.acceleration.y * deltaTime;

  // Update position
  newState.position.x += newState.velocity.x * deltaTime;
  newState.position.y += newState.velocity.y * deltaTime;

  // Boundary collision with bounce
  if (physics.bounce) {
    if (newState.position.x <= 0 || newState.position.x >= bounds.width) {
      newState.velocity.x *= -physics.bounce;
      newState.position.x = Math.max(0, Math.min(bounds.width, newState.position.x));
    }
    if (newState.position.y <= 0 || newState.position.y >= bounds.height) {
      newState.velocity.y *= -physics.bounce;
      newState.position.y = Math.max(0, Math.min(bounds.height, newState.position.y));
    }
  }

  // Reset acceleration for next frame
  newState.acceleration = { x: 0, y: 0 };

  return newState;
};

// ============================================================================
// MOTION PRESETS
// ============================================================================

/**
 * Floating stardust preset
 */
const FLOATING_STARDUST_PRESET: Partial<ParticleSystemConfig> = {
  count: 20,
  physics: {
    gravity: 0,
    friction: 0.99,
    wind: { x: 0.1, y: 0, strength: 0.5 },
  },
  globalMotion: {
    type: 'stardust',
    speed: 0.5,
    direction: 0,
  },
  performance: {
    maxFPS: 60,
    enableOptimization: true,
    lowPowerMode: false,
  },
};

/**
 * Cosmic drift preset
 */
const COSMIC_DRIFT_PRESET: Partial<ParticleSystemConfig> = {
  count: 15,
  physics: {
    gravity: 0,
    friction: 0.95,
    wind: { x: 1, y: 0.2, strength: 0.3 },
  },
  globalMotion: {
    type: 'drift',
    speed: 1,
    direction: 0,
  },
  performance: {
    maxFPS: 30,
    enableOptimization: true,
    lowPowerMode: true,
  },
};

/**
 * Orbital constellation preset
 */
const ORBITAL_CONSTELLATION_PRESET: Partial<ParticleSystemConfig> = {
  count: 12,
  physics: {
    gravity: 0,
    friction: 0.98,
    magneticField: {
      x: 0.5, // Relative to container center
      y: 0.5,
      strength: 100,
      radius: 200,
    },
  },
  globalMotion: {
    type: 'constellation',
    speed: 0.8,
    direction: 0,
  },
  performance: {
    maxFPS: 60,
    enableOptimization: false,
    lowPowerMode: false,
  },
};

/**
 * Brownian field preset
 */
const BROWNIAN_FIELD_PRESET: Partial<ParticleSystemConfig> = {
  count: 25,
  physics: {
    gravity: 0,
    friction: 0.92,
    bounce: 0.7,
  },
  globalMotion: {
    type: 'brownian',
    speed: 1.5,
    direction: 0,
  },
  performance: {
    maxFPS: 30,
    enableOptimization: true,
    lowPowerMode: false,
  },
};

// ============================================================================
// ANIMATION UTILITIES
// ============================================================================

/**
 * Create particle motion animations
 */
const createParticleMotionAnimation = (
  config: ParticleConfig,
  systemConfig: ParticleSystemConfig
): ParticleMotionResult => {
  const positionX = useRef(new Animated.Value(config.position.x)).current;
  const positionY = useRef(new Animated.Value(config.position.y)).current;
  const opacity = useRef(new Animated.Value(config.opacity)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const rotation = useRef(new Animated.Value(0)).current;

  const animationRef = useRef<Animated.CompositeAnimation | null>(null);
  const stateRef = useRef<ParticleMotionState>({
    position: config.position,
    velocity: { x: 0, y: 0 },
    acceleration: { x: 0, y: 0 },
    rotation: 0,
    scale: 1,
    opacity: config.opacity,
    timestamp: Date.now(),
  });

  const controls = useMemo(() => ({
    start: () => {
      if (animationRef.current) {
        animationRef.current.start();
      }
    },
    stop: () => {
      if (animationRef.current) {
        animationRef.current.stop();
      }
    },
    pause: () => {
      if (animationRef.current) {
        animationRef.current.stop();
      }
    },
    resume: () => {
      if (animationRef.current) {
        animationRef.current.start();
      }
    },
    reset: () => {
      positionX.setValue(config.position.x);
      positionY.setValue(config.position.y);
      opacity.setValue(config.opacity);
      scale.setValue(1);
      rotation.setValue(0);
      stateRef.current = {
        position: config.position,
        velocity: { x: 0, y: 0 },
        acceleration: { x: 0, y: 0 },
        rotation: 0,
        scale: 1,
        opacity: config.opacity,
        timestamp: Date.now(),
      };
    },
    updatePhysics: (newPhysics: Partial<ParticlePhysics>) => {
      Object.assign(systemConfig.physics || {}, newPhysics);
    },
  }), [config, systemConfig, positionX, positionY, opacity, scale, rotation]);

  return {
    position: { x: positionX, y: positionY },
    visual: { opacity, scale, rotation },
    controls,
    state: stateRef.current,
  };
};

/**
 * Get motion algorithm function by type
 */
const getMotionAlgorithm = (type: ParticleMotionType) => {
  switch (type) {
    case 'float':
      return createFloatingMotion;
    case 'drift':
      return createDriftMotion;
    case 'orbit':
      return createOrbitalMotion;
    case 'spiral':
      return createSpiralMotion;
    case 'brownian':
      return createBrownianMotion;
    case 'field':
      return createFieldMotion;
    case 'constellation':
      return createConstellationMotion;
    case 'stardust':
      return createStardustMotion;
    default:
      return createFloatingMotion;
  }
};

// ============================================================================
// EXPORTS
// ============================================================================

export {
  // Motion algorithms
  createFloatingMotion,
  createDriftMotion,
  createOrbitalMotion,
  createSpiralMotion,
  createBrownianMotion,
  createFieldMotion,
  createConstellationMotion,
  createStardustMotion,
  
  // Physics simulation
  applyPhysics,
  
  // Presets
  FLOATING_STARDUST_PRESET,
  COSMIC_DRIFT_PRESET,
  ORBITAL_CONSTELLATION_PRESET,
  BROWNIAN_FIELD_PRESET,
  
  // Animation utilities
  createParticleMotionAnimation,
  getMotionAlgorithm,
};
