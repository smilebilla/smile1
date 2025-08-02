/**
 * Corp Astro UI Library - Trail Effects System
 * 
 * Comprehensive trail effects system for creating dynamic motion trails behind
 * floating elements and interactive components. Provides smooth, performant
 * trail rendering with customizable length, opacity gradients, and blur effects.
 * 
 * @module TrailEffects
 * @version 1.0.0
 * @since 2024
 * 
 * UI Documentation Reference:
 * - Design System: FloatingOrb trail: enabled: true, length: 5, opacity: [0.5, 0.3, 0.2, 0.1, 0.05], blur: [0, 1, 2, 3, 4]
 * - Usage: Floating elements, particle systems, interactive components
 * - Performance: Optimized for 60fps with proper cleanup and batch processing
 * 
 * Features:
 * - Configurable trail length and segments
 * - Opacity gradient effects
 * - Blur progression for depth
 * - Performance optimization with pooling
 * - Customizable trail colors and styles
 * - Interactive trail effects
 * - Batch processing for multiple trails
 * - Accessibility support
 * 
 * @example
 * ```typescript
 * // Basic trail effect
 * const trail = createTrailEffect(element, {
 *   length: 5,
 *   opacity: [0.5, 0.3, 0.2, 0.1, 0.05],
 *   blur: [0, 1, 2, 3, 4]
 * });
 * 
 * // Start trail animation
 * trail.start();
 * 
 * // Update trail position
 * trail.update({ x: 100, y: 200 });
 * 
 * // Stop and cleanup
 * trail.stop();
 * ```
 */

import { Animated, ViewStyle } from 'react-native';
import { SignatureBlues } from '../tokens/colors/SignatureBlues';
import { RoyalPurples } from '../tokens/colors/RoyalPurples';
import { LuxuryGolds } from '../tokens/colors/LuxuryGolds';

/**
 * Trail segment configuration
 */
export interface TrailSegment {
  /** Position in the trail (0 = head, 1 = tail) */
  position: number;
  /** X coordinate */
  x: number;
  /** Y coordinate */
  y: number;
  /** Opacity value (0-1) */
  opacity: number;
  /** Blur radius in pixels */
  blur: number;
  /** Size scale (0-1) */
  scale: number;
  /** Rotation in degrees */
  rotation: number;
  /** Timestamp for animation */
  timestamp: number;
}

/**
 * Trail effect configuration
 */
export interface TrailEffectConfig {
  /** Number of trail segments */
  length: number;
  /** Opacity values for each segment */
  opacity: number[];
  /** Blur values for each segment */
  blur: number[];
  /** Trail color */
  color: string;
  /** Trail width */
  width: number;
  /** Trail height */
  height: number;
  /** Animation duration in ms */
  duration: number;
  /** Trail update interval in ms */
  updateInterval: number;
  /** Enable smooth interpolation */
  smoothing: boolean;
  /** Trail fade-out speed */
  fadeSpeed: number;
  /** Maximum trail segments to render */
  maxSegments: number;
  /** Enable size scaling along trail */
  scaleTrail: boolean;
  /** Enable rotation along trail */
  rotateTrail: boolean;
}

/**
 * Trail animation state
 */
export interface TrailAnimationState {
  /** Current trail segments */
  segments: TrailSegment[];
  /** Animation active state */
  isActive: boolean;
  /** Current position */
  position: { x: number; y: number };
  /** Previous position */
  previousPosition: { x: number; y: number };
  /** Trail direction vector */
  direction: { x: number; y: number };
  /** Trail velocity */
  velocity: { x: number; y: number };
  /** Animation start time */
  startTime: number;
  /** Last update time */
  lastUpdateTime: number;
}

/**
 * Trail effect result
 */
export interface TrailEffectResult {
  /** Start trail animation */
  start: () => void;
  /** Stop trail animation */
  stop: () => void;
  /** Update trail position */
  update: (position: { x: number; y: number }) => void;
  /** Get current trail segments */
  getSegments: () => TrailSegment[];
  /** Clear trail segments */
  clear: () => void;
  /** Set trail visibility */
  setVisible: (visible: boolean) => void;
  /** Update trail configuration */
  updateConfig: (config: Partial<TrailEffectConfig>) => void;
  /** Get trail state */
  getState: () => TrailAnimationState;
  /** Cleanup resources */
  cleanup: () => void;
}

/**
 * Trail preset configuration
 */
export interface TrailPreset {
  /** Preset name */
  name: string;
  /** Preset description */
  description: string;
  /** Trail configuration */
  config: TrailEffectConfig;
  /** Use case examples */
  useCases: string[];
}

/**
 * Default trail effect configuration
 * Based on Design System: FloatingOrb trail specifications
 */
export const DEFAULT_TRAIL_CONFIG: TrailEffectConfig = {
  length: 5,
  opacity: [0.5, 0.3, 0.2, 0.1, 0.05],
  blur: [0, 1, 2, 3, 4],
  color: SignatureBlues.primary as string,
  width: 64,
  height: 64,
  duration: 16, // ~60fps
  updateInterval: 16,
  smoothing: true,
  fadeSpeed: 0.95,
  maxSegments: 20,
  scaleTrail: true,
  rotateTrail: false,
};

/**
 * Create trail effect animation
 * 
 * @param element - Target element for trail effect
 * @param config - Trail configuration options
 * @returns Trail effect controller
 */
const createTrailEffect = (
  element: HTMLElement | null,
  config: Partial<TrailEffectConfig> = {}
): TrailEffectResult => {
  const finalConfig = { ...DEFAULT_TRAIL_CONFIG, ...config };
  
  let state: TrailAnimationState = {
    segments: [],
    isActive: false,
    position: { x: 0, y: 0 },
    previousPosition: { x: 0, y: 0 },
    direction: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    startTime: 0,
    lastUpdateTime: 0,
  };
  
  let animationId: number | null = null;
  let trailContainer: HTMLElement | null = null;
  let trailElements: HTMLElement[] = [];
  
  /**
   * Initialize trail visual elements
   */
  const initializeTrail = () => {
    if (!element) return;
    
    // Create trail container
    trailContainer = document.createElement('div');
    trailContainer.style.position = 'absolute';
    trailContainer.style.pointerEvents = 'none';
    trailContainer.style.zIndex = '-1';
    element.parentElement?.appendChild(trailContainer);
    
    // Create trail segments
    for (let i = 0; i < finalConfig.length; i++) {
      const trailElement = document.createElement('div');
      trailElement.style.position = 'absolute';
      trailElement.style.borderRadius = '50%';
      trailElement.style.background = finalConfig.color;
      trailElement.style.width = `${finalConfig.width}px`;
      trailElement.style.height = `${finalConfig.height}px`;
      trailElement.style.transform = 'translate(-50%, -50%)';
      trailElement.style.opacity = '0';
      trailElement.style.transition = 'opacity 0.1s ease-out';
      
      trailContainer.appendChild(trailElement);
      trailElements.push(trailElement);
    }
  };
  
  /**
   * Update trail segment position and style
   */
  const updateTrailSegment = (segment: TrailSegment, index: number) => {
    const trailElement = trailElements[index];
    if (!trailElement) return;
    
    const opacityValue = finalConfig.opacity[index] || 0;
    const blurValue = finalConfig.blur[index] || 0;
    const scaleValue = finalConfig.scaleTrail ? 1 - (index * 0.1) : 1;
    
    trailElement.style.left = `${segment.x}px`;
    trailElement.style.top = `${segment.y}px`;
    trailElement.style.opacity = (opacityValue * segment.opacity).toString();
    trailElement.style.filter = `blur(${blurValue}px)`;
    trailElement.style.transform = `translate(-50%, -50%) scale(${scaleValue * segment.scale})`;
    
    if (finalConfig.rotateTrail) {
      trailElement.style.transform += ` rotate(${segment.rotation}deg)`;
    }
  };
  
  /**
   * Create new trail segment
   */
  const createTrailSegment = (position: { x: number; y: number }, index: number): TrailSegment => {
    const now = Date.now();
    const scale = finalConfig.scaleTrail ? 1 - (index * 0.1) : 1;
    const rotation = finalConfig.rotateTrail ? (index * 15) % 360 : 0;
    
    return {
      position: index / finalConfig.length,
      x: position.x,
      y: position.y,
      opacity: 1,
      blur: 0,
      scale: Math.max(0.1, scale),
      rotation,
      timestamp: now,
    };
  };
  
  /**
   * Update trail animation
   */
  const updateTrail = () => {
    if (!state.isActive) return;
    
    const now = Date.now();
    const deltaTime = now - state.lastUpdateTime;
    
    // Update velocity and direction
    const dx = state.position.x - state.previousPosition.x;
    const dy = state.position.y - state.previousPosition.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance > 0) {
      state.direction.x = dx / distance;
      state.direction.y = dy / distance;
      state.velocity.x = dx / deltaTime;
      state.velocity.y = dy / deltaTime;
    }
    
    // Add new segment at current position
    if (distance > 2) { // Minimum movement threshold
      const newSegment = createTrailSegment(state.position, 0);
      state.segments.unshift(newSegment);
      
      // Remove excess segments
      if (state.segments.length > finalConfig.maxSegments) {
        state.segments = state.segments.slice(0, finalConfig.maxSegments);
      }
    }
    
    // Update existing segments
    state.segments.forEach((segment, index) => {
      // Fade out segments over time
      const age = now - segment.timestamp;
      const fadeProgress = Math.min(age / (finalConfig.duration * finalConfig.length), 1);
      segment.opacity = Math.max(0, 1 - fadeProgress);
      
      // Update segment position with smoothing
      if (finalConfig.smoothing && index > 0) {
        const prevSegment = state.segments[index - 1];
        const lerpFactor = 0.1;
        segment.x = lerp(segment.x, prevSegment.x, lerpFactor);
        segment.y = lerp(segment.y, prevSegment.y, lerpFactor);
      }
      
      // Update visual representation
      updateTrailSegment(segment, index);
    });
    
    // Remove fully faded segments
    state.segments = state.segments.filter(segment => segment.opacity > 0.01);
    
    // Update previous position
    state.previousPosition = { ...state.position };
    state.lastUpdateTime = now;
    
    // Continue animation
    if (state.isActive) {
      animationId = requestAnimationFrame(updateTrail);
    }
  };
  
  /**
   * Linear interpolation helper
   */
  const lerp = (a: number, b: number, t: number): number => {
    return a + (b - a) * t;
  };
  
  /**
   * Start trail animation
   */
  const start = () => {
    if (state.isActive) return;
    
    state.isActive = true;
    state.startTime = Date.now();
    state.lastUpdateTime = state.startTime;
    
    if (!trailContainer) {
      initializeTrail();
    }
    
    updateTrail();
  };
  
  /**
   * Stop trail animation
   */
  const stop = () => {
    state.isActive = false;
    
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  };
  
  /**
   * Update trail position
   */
  const update = (position: { x: number; y: number }) => {
    state.position = { ...position };
  };
  
  /**
   * Get current trail segments
   */
  const getSegments = (): TrailSegment[] => {
    return [...state.segments];
  };
  
  /**
   * Clear trail segments
   */
  const clear = () => {
    state.segments = [];
    trailElements.forEach(el => {
      el.style.opacity = '0';
    });
  };
  
  /**
   * Set trail visibility
   */
  const setVisible = (visible: boolean) => {
    if (trailContainer) {
      trailContainer.style.display = visible ? 'block' : 'none';
    }
  };
  
  /**
   * Update trail configuration
   */
  const updateConfig = (newConfig: Partial<TrailEffectConfig>) => {
    Object.assign(finalConfig, newConfig);
    
    // Recreate trail elements if length changed
    if (newConfig.length && newConfig.length !== trailElements.length) {
      cleanup();
      initializeTrail();
    }
  };
  
  /**
   * Get current trail state
   */
  const getState = (): TrailAnimationState => {
    return { ...state };
  };
  
  /**
   * Cleanup resources
   */
  const cleanup = () => {
    stop();
    
    if (trailContainer) {
      trailContainer.remove();
      trailContainer = null;
    }
    
    trailElements = [];
    state.segments = [];
  };
  
  return {
    start,
    stop,
    update,
    getSegments,
    clear,
    setVisible,
    updateConfig,
    getState,
    cleanup,
  };
};

/**
 * Floating orb trail preset
 * Based on Design System: FloatingOrb trail specifications
 */
const FLOATING_ORB_TRAIL_PRESET: TrailPreset = {
  name: 'Floating Orb Trail',
  description: 'Trail effect for floating orb elements with cosmic glow',
  config: {
    length: 5,
    opacity: [0.5, 0.3, 0.2, 0.1, 0.05],
    blur: [0, 1, 2, 3, 4],
    color: SignatureBlues.primary as string,
    width: 64,
    height: 64,
    duration: 1000,
    updateInterval: 16,
    smoothing: true,
    fadeSpeed: 0.95,
    maxSegments: 10,
    scaleTrail: true,
    rotateTrail: false,
  },
  useCases: ['Floating orbs', 'Navigation elements', 'Interactive buttons'],
};

/**
 * Particle trail preset
 */
const PARTICLE_TRAIL_PRESET: TrailPreset = {
  name: 'Particle Trail',
  description: 'Trail effect for particle systems and cosmic elements',
  config: {
    length: 8,
    opacity: [0.8, 0.6, 0.4, 0.3, 0.2, 0.1, 0.05, 0.02],
    blur: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5],
    color: SignatureBlues.glow as string,
    width: 8,
    height: 8,
    duration: 800,
    updateInterval: 16,
    smoothing: true,
    fadeSpeed: 0.9,
    maxSegments: 15,
    scaleTrail: true,
    rotateTrail: false,
  },
  useCases: ['Particle systems', 'Cosmic effects', 'Loading animations'],
};

/**
 * Cursor trail preset
 */
const CURSOR_TRAIL_PRESET: TrailPreset = {
  name: 'Cursor Trail',
  description: 'Trail effect for cursor interactions and hover states',
  config: {
    length: 6,
    opacity: [0.6, 0.4, 0.3, 0.2, 0.1, 0.05],
    blur: [0, 0.5, 1, 1.5, 2, 2.5],
    color: RoyalPurples.royal as string,
    width: 12,
    height: 12,
    duration: 600,
    updateInterval: 16,
    smoothing: true,
    fadeSpeed: 0.92,
    maxSegments: 12,
    scaleTrail: true,
    rotateTrail: false,
  },
  useCases: ['Cursor effects', 'Hover interactions', 'Touch feedback'],
};

/**
 * Meteor trail preset
 */
const METEOR_TRAIL_PRESET: TrailPreset = {
  name: 'Meteor Trail',
  description: 'Trail effect for meteor-like fast-moving elements',
  config: {
    length: 12,
    opacity: [0.9, 0.7, 0.5, 0.4, 0.3, 0.2, 0.15, 0.1, 0.08, 0.06, 0.04, 0.02],
    blur: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    color: LuxuryGolds.pure as string,
    width: 16,
    height: 4,
    duration: 1200,
    updateInterval: 16,
    smoothing: false,
    fadeSpeed: 0.88,
    maxSegments: 20,
    scaleTrail: true,
    rotateTrail: true,
  },
  useCases: ['Fast animations', 'Transition effects', 'Action feedback'],
};

/**
 * Create multiple trail effects for batch processing
 */
const createBatchTrailEffects = (
  elements: HTMLElement[],
  config: Partial<TrailEffectConfig> = {}
): TrailEffectResult[] => {
  return elements.map(element => createTrailEffect(element, config));
};

/**
 * Create trail effect from preset
 */
const createTrailEffectFromPreset = (
  element: HTMLElement | null,
  preset: TrailPreset,
  overrides: Partial<TrailEffectConfig> = {}
): TrailEffectResult => {
  const config = { ...preset.config, ...overrides };
  return createTrailEffect(element, config);
};

/**
 * Create responsive trail effect that adapts to screen size
 */
const createResponsiveTrailEffect = (
  element: HTMLElement | null,
  config: Partial<TrailEffectConfig> = {}
): TrailEffectResult => {
  const screenWidth = window.innerWidth;
  const isMobile = screenWidth < 768;
  
  const responsiveConfig = {
    ...config,
    length: isMobile ? Math.max(3, (config.length || 5) - 2) : (config.length || 5),
    updateInterval: isMobile ? 32 : 16, // Reduce update frequency on mobile
    maxSegments: isMobile ? 8 : (config.maxSegments || 20),
  };
  
  return createTrailEffect(element, responsiveConfig);
};

/**
 * Create accessible trail effect with reduced motion support
 */
const createAccessibleTrailEffect = (
  element: HTMLElement | null,
  config: Partial<TrailEffectConfig> = {}
): TrailEffectResult => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  const accessibleConfig = {
    ...config,
    length: prefersReducedMotion ? 1 : (config.length || 5),
    duration: prefersReducedMotion ? 0 : (config.duration || 1000),
    fadeSpeed: prefersReducedMotion ? 0.5 : (config.fadeSpeed || 0.95),
  };
  
  return createTrailEffect(element, accessibleConfig);
};

/**
 * Manage multiple trail effects with synchronized timing
 */
const createSynchronizedTrailEffects = (
  elements: HTMLElement[],
  config: Partial<TrailEffectConfig> = {}
): {
  trails: TrailEffectResult[];
  startAll: () => void;
  stopAll: () => void;
  updateAll: (positions: { x: number; y: number }[]) => void;
  cleanupAll: () => void;
} => {
  const trails = createBatchTrailEffects(elements, config);
  
  const startAll = () => {
    trails.forEach(trail => trail.start());
  };
  
  const stopAll = () => {
    trails.forEach(trail => trail.stop());
  };
  
  const updateAll = (positions: { x: number; y: number }[]) => {
    trails.forEach((trail, index) => {
      if (positions[index]) {
        trail.update(positions[index]);
      }
    });
  };
  
  const cleanupAll = () => {
    trails.forEach(trail => trail.cleanup());
  };
  
  return {
    trails,
    startAll,
    stopAll,
    updateAll,
    cleanupAll,
  };
};

// Export all functionality
export {
  // Main creator
  createTrailEffect,
  
  // Presets
  FLOATING_ORB_TRAIL_PRESET,
  PARTICLE_TRAIL_PRESET,
  CURSOR_TRAIL_PRESET,
  METEOR_TRAIL_PRESET,
  
  // Utility creators
  createBatchTrailEffects,
  createTrailEffectFromPreset,
  createResponsiveTrailEffect,
  createAccessibleTrailEffect,
  createSynchronizedTrailEffects,
};
