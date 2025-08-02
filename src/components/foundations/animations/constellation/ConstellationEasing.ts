/**
 * Corp Astro UI Library - Constellation Easing
 * 
 * Custom easing functions for constellation formation animations.
 * Provides organic, cosmic-inspired easing curves for natural
 * star connection patterns.
 * 
 * @module ConstellationEasing
 * @version 1.0.0
 * @since 2024
 * 
 * UI Documentation Reference:
 * - Design System: Constellation easing curves and connection patterns
 * - Animation: Organic formation algorithms and easing functions
 * - Timing: Custom cubic-bezier curves for cosmic animations
 */

import { Easing } from 'react-native';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Easing function type
 */
export type EasingFunction = (t: number) => number;

/**
 * Constellation easing types
 */
export type ConstellationEasingType = 
  | 'organic'
  | 'cosmic'
  | 'stellar'
  | 'galactic'
  | 'nebula'
  | 'supernova';

// ============================================================================
// CUSTOM EASING FUNCTIONS
// ============================================================================

/**
 * Organic easing for natural constellation formation
 * Based on natural growth patterns and organic curves
 */
export const organicEasing: EasingFunction = (t: number): number => {
  // Cubic bezier approximation of organic growth
  return t * t * (3 - 2 * t);
};

/**
 * Cosmic easing for space-like motion
 * Simulates the gentle acceleration of celestial bodies
 */
export const cosmicEasing: EasingFunction = (t: number): number => {
  // Sine wave with exponential decay for cosmic motion
  return 1 - Math.cos(t * Math.PI * 0.5) * Math.exp(-t * 2);
};

/**
 * Stellar easing for star birth animations
 * Mimics the explosive formation of stars
 */
export const stellarEasing: EasingFunction = (t: number): number => {
  // Exponential with bounce for stellar formation
  if (t < 0.5) {
    return 2 * t * t * t;
  }
  return 1 - 2 * (1 - t) * (1 - t) * (1 - t);
};

/**
 * Galactic easing for large-scale formations
 * Slow start with gradual acceleration
 */
export const galacticEasing: EasingFunction = (t: number): number => {
  // Quartic easing for galactic scale
  return t * t * t * t;
};

/**
 * Nebula easing for soft, flowing animations
 * Gentle, cloud-like movement patterns
 */
export const nebulaEasing: EasingFunction = (t: number): number => {
  // Sine wave for soft, flowing motion
  return 0.5 * (1 - Math.cos(t * Math.PI));
};

/**
 * Supernova easing for explosive animations
 * Rapid acceleration with explosive finish
 */
export const supernovaEasing: EasingFunction = (t: number): number => {
  // Exponential burst for explosive motion
  return t < 0.8 ? 0.1 * t : 10 * (t - 0.8) * (t - 0.8) + 0.08;
};

// ============================================================================
// EASING CONFIGURATIONS
// ============================================================================

/**
 * Constellation easing configurations
 */
export const constellationEasings: Record<ConstellationEasingType, EasingFunction> = {
  organic: organicEasing,
  cosmic: cosmicEasing,
  stellar: stellarEasing,
  galactic: galacticEasing,
  nebula: nebulaEasing,
  supernova: supernovaEasing,
};

/**
 * React Native Easing configurations for constellation animations
 */
export const rnEasings: Record<ConstellationEasingType, any> = {
  organic: Easing.bezier(0.23, 1, 0.32, 1), // Organic curve
  cosmic: Easing.bezier(0.25, 0.46, 0.45, 0.94), // Cosmic motion
  stellar: Easing.bezier(0.68, -0.55, 0.265, 1.55), // Stellar formation
  galactic: Easing.bezier(0.55, 0.055, 0.675, 0.19), // Galactic scale
  nebula: Easing.bezier(0.445, 0.05, 0.55, 0.95), // Nebula flow
  supernova: Easing.bezier(0.19, 1, 0.22, 1), // Supernova explosion
};

/**
 * Connection easing patterns
 */
export const connectionEasings = {
  straight: Easing.linear,
  curved: Easing.bezier(0.25, 0.46, 0.45, 0.94),
  organic: Easing.bezier(0.23, 1, 0.32, 1),
  elastic: Easing.bezier(0.68, -0.55, 0.265, 1.55),
  bounce: Easing.bounce,
};

/**
 * Formation sequence easings
 */
export const sequenceEasings = {
  linear: Easing.linear,
  sequential: Easing.out(Easing.ease),
  cascading: Easing.bezier(0.25, 0.46, 0.45, 0.94),
  ripple: Easing.bezier(0.68, -0.55, 0.265, 1.55),
  wave: Easing.inOut(Easing.sin),
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get easing function by type
 */
export function getConstellationEasing(type: ConstellationEasingType): EasingFunction {
  return constellationEasings[type] || constellationEasings.organic;
}

/**
 * Get React Native easing by type
 */
export function getRNEasing(type: ConstellationEasingType): any {
  return rnEasings[type] || rnEasings.organic;
}

/**
 * Create custom easing curve
 */
export function createCustomEasing(
  x1: number, 
  y1: number, 
  x2: number, 
  y2: number
): any {
  return Easing.bezier(x1, y1, x2, y2);
}

/**
 * Combine multiple easing functions
 */
export function combineEasings(
  easings: EasingFunction[],
  weights: number[] = []
): EasingFunction {
  const normalizedWeights = weights.length === easings.length 
    ? weights 
    : easings.map(() => 1 / easings.length);
  
  return (t: number): number => {
    let result = 0;
    for (let i = 0; i < easings.length; i++) {
      result += easings[i](t) * normalizedWeights[i];
    }
    return result;
  };
}

/**
 * Create easing sequence for multiple phases
 */
export function createEasingSequence(
  phases: Array<{
    duration: number;
    easing: EasingFunction;
  }>
): EasingFunction {
  const totalDuration = phases.reduce((sum, phase) => sum + phase.duration, 0);
  
  return (t: number): number => {
    let currentTime = t * totalDuration;
    let accumulatedTime = 0;
    
    for (const phase of phases) {
      if (currentTime <= accumulatedTime + phase.duration) {
        const phaseProgress = (currentTime - accumulatedTime) / phase.duration;
        return phase.easing(phaseProgress);
      }
      accumulatedTime += phase.duration;
    }
    
    return 1; // Complete
  };
}

// ============================================================================
// EXPORTS
// ============================================================================

export default constellationEasings;
