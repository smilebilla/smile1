/**
 * Corp Astro UI Library - Constellation Timing
 * 
 * Timing configurations for constellation formation animations.
 * Provides precise timing control for star connection patterns
 * and formation sequences.
 * 
 * @module ConstellationTiming
 * @version 1.0.0
 * @since 2024
 * 
 * UI Documentation Reference:
 * - Design System: Constellation animation timing specifications
 * - Animation: Formation timing 'draw 2s ease-out'
 * - Timing: Custom timing functions for organic formation
 */

import { Easing } from 'react-native';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Timing configuration interface for constellation animations
 */
export interface ConstellationTimingConfig {
  /** Duration of the formation animation in milliseconds */
  duration: number;
  /** Easing function for the animation */
  easing: any;
  /** Delay between star connections in milliseconds */
  connectionDelay: number;
  /** Stagger delay for multiple constellations */
  staggerDelay: number;
  /** Use native driver for performance */
  useNativeDriver: boolean;
}

/**
 * Formation timing types
 */
export type FormationTiming = 'instant' | 'draw' | 'pulse' | 'organic';

// ============================================================================
// CONSTELLATION TIMING CONFIGURATIONS
// ============================================================================

/**
 * Main constellation timing configuration
 * Based on UI Docs: Formation timing 'draw 2s ease-out'
 */
export const constellationTiming: ConstellationTimingConfig = {
  duration: 2000, // 2s as per UI Docs
  easing: Easing.out(Easing.ease),
  connectionDelay: 150, // Delay between star connections
  staggerDelay: 300, // Stagger delay for multiple constellations
  useNativeDriver: true,
};

/**
 * Formation timing configurations
 */
export const formationTimings: Record<FormationTiming, ConstellationTimingConfig> = {
  instant: {
    duration: 0,
    easing: Easing.linear,
    connectionDelay: 0,
    staggerDelay: 0,
    useNativeDriver: true,
  },
  draw: {
    duration: 2000, // UI Docs: 'draw 2s ease-out'
    easing: Easing.out(Easing.ease),
    connectionDelay: 150,
    staggerDelay: 300,
    useNativeDriver: true,
  },
  pulse: {
    duration: 1500,
    easing: Easing.inOut(Easing.ease),
    connectionDelay: 100,
    staggerDelay: 200,
    useNativeDriver: true,
  },
  organic: {
    duration: 3000,
    easing: Easing.bezier(0.23, 1, 0.32, 1), // Organic curve
    connectionDelay: 200,
    staggerDelay: 400,
    useNativeDriver: true,
  },
};

/**
 * Star connection timing
 */
export const starConnectionTiming = {
  appear: {
    duration: 800,
    easing: Easing.out(Easing.back(1.7)),
    delay: 0,
    useNativeDriver: true,
  },
  connect: {
    duration: 1200,
    easing: Easing.out(Easing.ease),
    delay: 200,
    useNativeDriver: true,
  },
  pulse: {
    duration: 2000,
    easing: Easing.inOut(Easing.ease),
    delay: 0,
    useNativeDriver: true,
  },
};

/**
 * Constellation lifecycle timing
 */
export const lifecycleTiming = {
  formation: {
    duration: 2000,
    easing: Easing.out(Easing.ease),
    useNativeDriver: true,
  },
  idle: {
    duration: 4000,
    easing: Easing.inOut(Easing.ease),
    useNativeDriver: true,
  },
  dissolution: {
    duration: 1500,
    easing: Easing.in(Easing.ease),
    useNativeDriver: true,
  },
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get timing configuration by formation type
 */
export function getFormationTiming(type: FormationTiming): ConstellationTimingConfig {
  return formationTimings[type] || formationTimings.draw;
}

/**
 * Calculate staggered delay for multiple constellations
 */
export function getStaggeredDelay(index: number, baseDelay: number = 300): number {
  return baseDelay * index;
}

/**
 * Get connection delay based on distance between stars
 */
export function getConnectionDelay(distance: number, baseDelay: number = 150): number {
  return baseDelay + (distance * 0.5);
}

/**
 * Create timing sequence for constellation formation
 */
export function createTimingSequence(
  starCount: number,
  formationType: FormationTiming = 'draw'
): number[] {
  const config = getFormationTiming(formationType);
  const sequence: number[] = [];
  
  for (let i = 0; i < starCount; i++) {
    sequence.push(config.connectionDelay * i);
  }
  
  return sequence;
}

// ============================================================================
// EXPORTS
// ============================================================================

export default constellationTiming;
