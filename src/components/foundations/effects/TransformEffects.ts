/**
 * Corp Astro UI Library - 3D Transform Effects System
 * 
 * Comprehensive 3D transform effects system for interactive elements.
 * Implements perspective, rotation, scaling, and spatial transformations
 * following Corp Astro's true 3D space design philosophy.
 * 
 * @module TransformEffects
 * @version 1.0.0
 * @since 2024
 * 
 * UI Documentation Reference:
 * - Visual Language: "We design in true 3D space, not just X and Y"
 * - Design System: "transformStyle: 'preserve-3d', perspective: 1000, rotateX: 15, rotateY: 15"
 * - Interactive Card: "3D transforms on interaction, tilt effects on drag, depth-based scaling"
 * - Floating Orb: "transform: 'translateY(-20px)', rotate: 'rotate(360deg)'"
 * - Magnetic Hover: "strength: 20, perspective: 1000, rotateX: 15, rotateY: 15"
 * 
 * Features:
 * - Perspective transformations
 * - Rotation effects (X, Y, Z axes)
 * - Scaling transformations
 * - Translation effects
 * - Magnetic hover interactions
 * - Tilt effects on drag
 * - Depth-based scaling
 * - Performance optimized
 * - Accessibility support
 * - GPU-accelerated transforms
 */

import { ColorValue } from 'react-native';
import { deepSpaceColors } from '../tokens/colors/DeepSpaceColors';
import { SignatureBlues } from '../tokens/colors/SignatureBlues';

/**
 * Transform effect types
 */
export type TransformEffectType = 'perspective' | 'rotation' | 'scale' | 'translation' | 'magnetic' | 'tilt' | 'float' | 'orbital';

/**
 * Transform axis
 */
export type TransformAxis = 'x' | 'y' | 'z' | 'all';

/**
 * Transform origin
 */
export type TransformOrigin = 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

/**
 * Transform easing functions
 */
export type TransformEasing = 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'cubic-bezier' | 'custom';

/**
 * Perspective configuration
 */
export interface PerspectiveConfig {
  /** Perspective distance (px) */
  distance: number;
  /** Perspective origin */
  origin: TransformOrigin;
  /** Enable depth perception */
  enableDepth: boolean;
  /** Depth intensity (0-1) */
  depthIntensity: number;
}

/**
 * Rotation configuration
 */
export interface RotationConfig {
  /** Rotation axis */
  axis: TransformAxis;
  /** Rotation angle (degrees) */
  angle: number;
  /** Rotation speed (deg/s) */
  speed: number;
  /** Rotation direction */
  direction: 'clockwise' | 'counterclockwise';
  /** Enable continuous rotation */
  continuous: boolean;
  /** Rotation bounds (for interactive rotation) */
  bounds: [number, number];
}

/**
 * Scale configuration
 */
export interface ScaleConfig {
  /** Scale factor */
  factor: number;
  /** Scale origin */
  origin: TransformOrigin;
  /** Enable depth-based scaling */
  enableDepthScaling: boolean;
  /** Scale bounds */
  bounds: [number, number];
  /** Scale axis */
  axis: TransformAxis;
}

/**
 * Translation configuration
 */
export interface TranslationConfig {
  /** Translation axis */
  axis: TransformAxis;
  /** Translation distance (px) */
  distance: number;
  /** Translation speed (px/s) */
  speed: number;
  /** Translation bounds */
  bounds: [number, number];
  /** Enable oscillation */
  oscillate: boolean;
  /** Oscillation amplitude */
  amplitude: number;
}

/**
 * Magnetic hover configuration
 */
export interface MagneticHoverConfig {
  /** Magnetic strength (0-100) */
  strength: number;
  /** Magnetic range (px) */
  range: number;
  /** Magnetic smoothness (0-1) */
  smoothness: number;
  /** Enable rotation on hover */
  enableRotation: boolean;
  /** Rotation intensity */
  rotationIntensity: number;
  /** Enable scaling on hover */
  enableScaling: boolean;
  /** Scale intensity */
  scaleIntensity: number;
}

/**
 * Tilt configuration
 */
export interface TiltConfig {
  /** Tilt intensity (0-1) */
  intensity: number;
  /** Tilt smoothness (0-1) */
  smoothness: number;
  /** Max tilt angle (degrees) */
  maxAngle: number;
  /** Enable glare effect */
  enableGlare: boolean;
  /** Glare intensity */
  glareIntensity: number;
  /** Enable shadow adjustment */
  enableShadowAdjustment: boolean;
}

/**
 * Float configuration
 */
export interface FloatConfig {
  /** Float amplitude (px) */
  amplitude: number;
  /** Float duration (ms) */
  duration: number;
  /** Float direction */
  direction: 'vertical' | 'horizontal' | 'circular';
  /** Enable randomization */
  enableRandomization: boolean;
  /** Randomization intensity */
  randomizationIntensity: number;
}

/**
 * Orbital configuration
 */
export interface OrbitalConfig {
  /** Orbital radius (px) */
  radius: number;
  /** Orbital speed (deg/s) */
  speed: number;
  /** Orbital direction */
  direction: 'clockwise' | 'counterclockwise';
  /** Orbital center */
  center: { x: number; y: number };
  /** Enable elliptical orbit */
  enableElliptical: boolean;
  /** Elliptical ratio */
  ellipticalRatio: number;
}

/**
 * Transform effects configuration
 */
export interface TransformEffectsConfig {
  /** Effect type */
  type: TransformEffectType;
  /** Perspective settings */
  perspective: PerspectiveConfig;
  /** Rotation settings */
  rotation: RotationConfig;
  /** Scale settings */
  scale: ScaleConfig;
  /** Translation settings */
  translation: TranslationConfig;
  /** Magnetic hover settings */
  magneticHover: MagneticHoverConfig;
  /** Tilt settings */
  tilt: TiltConfig;
  /** Float settings */
  float: FloatConfig;
  /** Orbital settings */
  orbital: OrbitalConfig;
  /** Animation duration (ms) */
  duration: number;
  /** Animation easing */
  easing: TransformEasing;
  /** Enable GPU acceleration */
  enableGPUAcceleration: boolean;
  /** Enable accessibility features */
  accessibilityEnabled: boolean;
  /** Respect reduced motion preference */
  respectReducedMotion: boolean;
  /** Enable interaction */
  enableInteraction: boolean;
}

/**
 * Transform effects state
 */
export interface TransformEffectsState {
  /** Current transform matrix */
  transform: string;
  /** Current perspective */
  perspective: number;
  /** Current rotation */
  rotation: { x: number; y: number; z: number };
  /** Current scale */
  scale: { x: number; y: number; z: number };
  /** Current translation */
  translation: { x: number; y: number; z: number };
  /** Animation state */
  isAnimating: boolean;
  /** Interaction state */
  isInteracting: boolean;
  /** Hover state */
  isHovering: boolean;
  /** Accessibility state */
  reducedMotion: boolean;
}

/**
 * Transform effects result
 */
export interface TransformEffectsResult {
  /** Apply transform effects to element */
  apply: (element: HTMLElement) => void;
  /** Remove transform effects from element */
  remove: (element: HTMLElement) => void;
  /** Set perspective */
  setPerspective: (distance: number, origin?: TransformOrigin) => void;
  /** Set rotation */
  setRotation: (x: number, y: number, z: number) => void;
  /** Set scale */
  setScale: (x: number, y: number, z: number) => void;
  /** Set translation */
  setTranslation: (x: number, y: number, z: number) => void;
  /** Start animation */
  startAnimation: () => void;
  /** Stop animation */
  stopAnimation: () => void;
  /** Reset transforms */
  reset: () => void;
  /** Get current state */
  getState: () => TransformEffectsState;
  /** Cleanup resources */
  cleanup: () => void;
}

/**
 * Transform effects preset
 */
export interface TransformEffectsPreset {
  /** Preset name */
  name: string;
  /** Preset description */
  description: string;
  /** Transform configuration */
  config: TransformEffectsConfig;
  /** Use cases */
  useCases: string[];
}

/**
 * Create transform matrix string
 */
const createTransformMatrix = (
  perspective: number,
  rotation: { x: number; y: number; z: number },
  scale: { x: number; y: number; z: number },
  translation: { x: number; y: number; z: number }
): string => {
  const transforms = [];
  
  if (perspective > 0) {
    transforms.push(`perspective(${perspective}px)`);
  }
  
  if (translation.x !== 0 || translation.y !== 0 || translation.z !== 0) {
    transforms.push(`translate3d(${translation.x}px, ${translation.y}px, ${translation.z}px)`);
  }
  
  if (rotation.x !== 0) {
    transforms.push(`rotateX(${rotation.x}deg)`);
  }
  
  if (rotation.y !== 0) {
    transforms.push(`rotateY(${rotation.y}deg)`);
  }
  
  if (rotation.z !== 0) {
    transforms.push(`rotateZ(${rotation.z}deg)`);
  }
  
  if (scale.x !== 1 || scale.y !== 1 || scale.z !== 1) {
    transforms.push(`scale3d(${scale.x}, ${scale.y}, ${scale.z})`);
  }
  
  return transforms.join(' ');
};

/**
 * Apply perspective effect
 */
const applyPerspective = (element: HTMLElement, config: PerspectiveConfig): void => {
  const container = element.parentElement || element;
  container.style.perspective = `${config.distance}px`;
  container.style.perspectiveOrigin = config.origin;
  
  if (config.enableDepth) {
    element.style.transformStyle = 'preserve-3d';
  }
};

/**
 * Apply magnetic hover effect
 */
const applyMagneticHover = (element: HTMLElement, config: MagneticHoverConfig): void => {
  const handleMouseMove = (event: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const deltaX = x - centerX;
    const deltaY = y - centerY;
    
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    if (distance < config.range) {
      const strength = (config.range - distance) / config.range;
      const magneticStrength = config.strength * strength;
      
      const moveX = (deltaX / distance) * magneticStrength * config.smoothness;
      const moveY = (deltaY / distance) * magneticStrength * config.smoothness;
      
      let transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      
      if (config.enableRotation) {
        const rotateX = (deltaY / centerY) * config.rotationIntensity;
        const rotateY = (deltaX / centerX) * config.rotationIntensity;
        transform += ` rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
      
      if (config.enableScaling) {
        const scale = 1 + (strength * config.scaleIntensity);
        transform += ` scale(${scale})`;
      }
      
      element.style.transform = transform;
    }
  };
  
  const handleMouseLeave = () => {
    element.style.transform = 'translate3d(0, 0, 0) rotateX(0) rotateY(0) scale(1)';
  };
  
  element.addEventListener('mousemove', handleMouseMove);
  element.addEventListener('mouseleave', handleMouseLeave);
};

/**
 * Apply tilt effect
 */
const applyTiltEffect = (element: HTMLElement, config: TiltConfig): void => {
  const handleMouseMove = (event: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * config.maxAngle * config.intensity;
    const rotateY = ((x - centerX) / centerX) * config.maxAngle * config.intensity;
    
    element.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    element.style.transition = `transform ${config.smoothness * 100}ms ease-out`;
    
    if (config.enableGlare) {
      const glareIntensity = Math.abs(rotateX) + Math.abs(rotateY);
      const glareOpacity = (glareIntensity / config.maxAngle) * config.glareIntensity;
      element.style.setProperty('--glare-opacity', glareOpacity.toString());
    }
  };
  
  const handleMouseLeave = () => {
    element.style.transform = 'rotateX(0) rotateY(0)';
    element.style.transition = `transform ${config.smoothness * 200}ms ease-out`;
    
    if (config.enableGlare) {
      element.style.setProperty('--glare-opacity', '0');
    }
  };
  
  element.addEventListener('mousemove', handleMouseMove);
  element.addEventListener('mouseleave', handleMouseLeave);
};

/**
 * Apply float effect
 */
const applyFloatEffect = (element: HTMLElement, config: FloatConfig): void => {
  let animationId: number;
  let startTime: number;
  
  const animate = (currentTime: number) => {
    if (!startTime) startTime = currentTime;
    
    const elapsed = currentTime - startTime;
    const progress = (elapsed % config.duration) / config.duration;
    
    let x = 0;
    let y = 0;
    
    switch (config.direction) {
      case 'vertical':
        y = Math.sin(progress * Math.PI * 2) * config.amplitude;
        break;
      case 'horizontal':
        x = Math.sin(progress * Math.PI * 2) * config.amplitude;
        break;
      case 'circular':
        x = Math.cos(progress * Math.PI * 2) * config.amplitude;
        y = Math.sin(progress * Math.PI * 2) * config.amplitude;
        break;
    }
    
    if (config.enableRandomization) {
      const randomX = (Math.random() - 0.5) * config.randomizationIntensity;
      const randomY = (Math.random() - 0.5) * config.randomizationIntensity;
      x += randomX;
      y += randomY;
    }
    
    element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    
    animationId = requestAnimationFrame(animate);
  };
  
  animationId = requestAnimationFrame(animate);
  
  // Store cleanup function
  (element as any)._cleanupFloat = () => {
    cancelAnimationFrame(animationId);
  };
};

/**
 * Apply orbital effect
 */
const applyOrbitalEffect = (element: HTMLElement, config: OrbitalConfig): void => {
  let animationId: number;
  let startTime: number;
  
  const animate = (currentTime: number) => {
    if (!startTime) startTime = currentTime;
    
    const elapsed = currentTime - startTime;
    const angle = (elapsed / 1000) * config.speed;
    
    const radians = (angle * Math.PI) / 180;
    
    let x = Math.cos(radians) * config.radius;
    let y = Math.sin(radians) * config.radius;
    
    if (config.enableElliptical) {
      y *= config.ellipticalRatio;
    }
    
    if (config.direction === 'counterclockwise') {
      x = -x;
    }
    
    x += config.center.x;
    y += config.center.y;
    
    element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    
    animationId = requestAnimationFrame(animate);
  };
  
  animationId = requestAnimationFrame(animate);
  
  // Store cleanup function
  (element as any)._cleanupOrbital = () => {
    cancelAnimationFrame(animationId);
  };
};

/**
 * Create transform effects
 */
const createTransformEffects = (
  config: Partial<TransformEffectsConfig> = {}
): TransformEffectsResult => {
  // Default configuration
  const defaultConfig: TransformEffectsConfig = {
    type: 'perspective',
    perspective: {
      distance: 1000,
      origin: 'center',
      enableDepth: true,
      depthIntensity: 0.5,
    },
    rotation: {
      axis: 'all',
      angle: 0,
      speed: 0,
      direction: 'clockwise',
      continuous: false,
      bounds: [-180, 180],
    },
    scale: {
      factor: 1,
      origin: 'center',
      enableDepthScaling: false,
      bounds: [0.5, 2],
      axis: 'all',
    },
    translation: {
      axis: 'all',
      distance: 0,
      speed: 0,
      bounds: [-100, 100],
      oscillate: false,
      amplitude: 20,
    },
    magneticHover: {
      strength: 20,
      range: 100,
      smoothness: 0.3,
      enableRotation: true,
      rotationIntensity: 15,
      enableScaling: true,
      scaleIntensity: 0.02,
    },
    tilt: {
      intensity: 0.5,
      smoothness: 0.3,
      maxAngle: 15,
      enableGlare: false,
      glareIntensity: 0.1,
      enableShadowAdjustment: false,
    },
    float: {
      amplitude: 20,
      duration: 6000,
      direction: 'vertical',
      enableRandomization: false,
      randomizationIntensity: 5,
    },
    orbital: {
      radius: 50,
      speed: 30,
      direction: 'clockwise',
      center: { x: 0, y: 0 },
      enableElliptical: false,
      ellipticalRatio: 0.6,
    },
    duration: 300,
    easing: 'ease-out',
    enableGPUAcceleration: true,
    accessibilityEnabled: true,
    respectReducedMotion: true,
    enableInteraction: true,
  };

  let currentConfig = { ...defaultConfig, ...config };
  let state: TransformEffectsState = {
    transform: '',
    perspective: currentConfig.perspective.distance,
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 1, y: 1, z: 1 },
    translation: { x: 0, y: 0, z: 0 },
    isAnimating: false,
    isInteracting: false,
    isHovering: false,
    reducedMotion: false,
  };

  // Check for reduced motion preference
  const prefersReducedMotion = () => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  };

  // Update reduced motion state
  state.reducedMotion = prefersReducedMotion();

  // Apply transform effects to element
  const apply = (element: HTMLElement): void => {
    if (currentConfig.respectReducedMotion && state.reducedMotion) {
      return;
    }

    // Enable GPU acceleration
    if (currentConfig.enableGPUAcceleration) {
      element.style.willChange = 'transform';
      element.style.transform = 'translateZ(0)';
    }

    // Apply perspective
    if (currentConfig.type === 'perspective' || currentConfig.type === 'magnetic' || currentConfig.type === 'tilt') {
      applyPerspective(element, currentConfig.perspective);
    }

    // Apply specific effects
    switch (currentConfig.type) {
      case 'magnetic':
        if (currentConfig.enableInteraction) {
          applyMagneticHover(element, currentConfig.magneticHover);
        }
        break;
      case 'tilt':
        if (currentConfig.enableInteraction) {
          applyTiltEffect(element, currentConfig.tilt);
        }
        break;
      case 'float':
        applyFloatEffect(element, currentConfig.float);
        break;
      case 'orbital':
        applyOrbitalEffect(element, currentConfig.orbital);
        break;
    }

    // Set animation duration and easing
    element.style.transition = `transform ${currentConfig.duration}ms ${currentConfig.easing}`;
    
    // Update transform matrix
    updateTransform(element);
  };

  // Remove transform effects from element
  const remove = (element: HTMLElement): void => {
    element.style.transform = '';
    element.style.willChange = '';
    element.style.transition = '';
    element.style.transformStyle = '';
    element.style.perspective = '';
    element.style.perspectiveOrigin = '';
    
    // Remove event listeners
    element.removeEventListener('mousemove', () => {});
    element.removeEventListener('mouseleave', () => {});
    
    // Cleanup animations
    if ((element as any)._cleanupFloat) {
      (element as any)._cleanupFloat();
    }
    if ((element as any)._cleanupOrbital) {
      (element as any)._cleanupOrbital();
    }
  };

  // Update transform matrix
  const updateTransform = (element: HTMLElement): void => {
    const transform = createTransformMatrix(
      state.perspective,
      state.rotation,
      state.scale,
      state.translation
    );
    
    state.transform = transform;
    element.style.transform = transform;
  };

  // Set perspective
  const setPerspective = (distance: number, origin: TransformOrigin = 'center'): void => {
    state.perspective = distance;
    currentConfig.perspective.distance = distance;
    currentConfig.perspective.origin = origin;
  };

  // Set rotation
  const setRotation = (x: number, y: number, z: number): void => {
    state.rotation = { x, y, z };
  };

  // Set scale
  const setScale = (x: number, y: number, z: number): void => {
    state.scale = { x, y, z };
  };

  // Set translation
  const setTranslation = (x: number, y: number, z: number): void => {
    state.translation = { x, y, z };
  };

  // Start animation
  const startAnimation = (): void => {
    state.isAnimating = true;
  };

  // Stop animation
  const stopAnimation = (): void => {
    state.isAnimating = false;
  };

  // Reset transforms
  const reset = (): void => {
    state.rotation = { x: 0, y: 0, z: 0 };
    state.scale = { x: 1, y: 1, z: 1 };
    state.translation = { x: 0, y: 0, z: 0 };
    state.isAnimating = false;
    state.isInteracting = false;
    state.isHovering = false;
  };

  // Get current state
  const getState = (): TransformEffectsState => ({ ...state });

  // Cleanup resources
  const cleanup = (): void => {
    reset();
  };

  return {
    apply,
    remove,
    setPerspective,
    setRotation,
    setScale,
    setTranslation,
    startAnimation,
    stopAnimation,
    reset,
    getState,
    cleanup,
  };
};

/**
 * Interactive card preset
 * Design System: transformStyle: 'preserve-3d', perspective: 1000, rotateX: 15, rotateY: 15
 */
const INTERACTIVE_CARD_PRESET: TransformEffectsPreset = {
  name: 'Interactive Card',
  description: '3D interactive card with magnetic hover and tilt effects',
  config: {
    type: 'magnetic',
    perspective: {
      distance: 1000,
      origin: 'center',
      enableDepth: true,
      depthIntensity: 0.5,
    },
    rotation: {
      axis: 'all',
      angle: 0,
      speed: 0,
      direction: 'clockwise',
      continuous: false,
      bounds: [-15, 15],
    },
    scale: {
      factor: 1,
      origin: 'center',
      enableDepthScaling: true,
      bounds: [0.98, 1.02],
      axis: 'all',
    },
    translation: {
      axis: 'all',
      distance: 0,
      speed: 0,
      bounds: [-20, 20],
      oscillate: false,
      amplitude: 20,
    },
    magneticHover: {
      strength: 20,
      range: 100,
      smoothness: 0.3,
      enableRotation: true,
      rotationIntensity: 15,
      enableScaling: true,
      scaleIntensity: 0.02,
    },
    tilt: {
      intensity: 0.5,
      smoothness: 0.3,
      maxAngle: 15,
      enableGlare: true,
      glareIntensity: 0.1,
      enableShadowAdjustment: true,
    },
    float: {
      amplitude: 20,
      duration: 6000,
      direction: 'vertical',
      enableRandomization: false,
      randomizationIntensity: 5,
    },
    orbital: {
      radius: 50,
      speed: 30,
      direction: 'clockwise',
      center: { x: 0, y: 0 },
      enableElliptical: false,
      ellipticalRatio: 0.6,
    },
    duration: 300,
    easing: 'ease-out',
    enableGPUAcceleration: true,
    accessibilityEnabled: true,
    respectReducedMotion: true,
    enableInteraction: true,
  },
  useCases: ['Interactive cards', 'Hover effects', 'Premium elements'],
};

/**
 * Floating orb preset
 * Design System: float animation, rotate animation, pulse animation
 */
const FLOATING_ORB_PRESET: TransformEffectsPreset = {
  name: 'Floating Orb',
  description: 'Floating orb with vertical float and rotation',
  config: {
    type: 'float',
    perspective: {
      distance: 1000,
      origin: 'center',
      enableDepth: false,
      depthIntensity: 0.5,
    },
    rotation: {
      axis: 'z',
      angle: 0,
      speed: 18, // 360deg / 20s = 18deg/s
      direction: 'clockwise',
      continuous: true,
      bounds: [0, 360],
    },
    scale: {
      factor: 1,
      origin: 'center',
      enableDepthScaling: false,
      bounds: [0.8, 1.2],
      axis: 'all',
    },
    translation: {
      axis: 'y',
      distance: 0,
      speed: 0,
      bounds: [-20, 20],
      oscillate: true,
      amplitude: 20,
    },
    magneticHover: {
      strength: 20,
      range: 100,
      smoothness: 0.3,
      enableRotation: false,
      rotationIntensity: 15,
      enableScaling: false,
      scaleIntensity: 0.02,
    },
    tilt: {
      intensity: 0.5,
      smoothness: 0.3,
      maxAngle: 15,
      enableGlare: false,
      glareIntensity: 0.1,
      enableShadowAdjustment: false,
    },
    float: {
      amplitude: 20,
      duration: 6000,
      direction: 'vertical',
      enableRandomization: false,
      randomizationIntensity: 5,
    },
    orbital: {
      radius: 50,
      speed: 30,
      direction: 'clockwise',
      center: { x: 0, y: 0 },
      enableElliptical: false,
      ellipticalRatio: 0.6,
    },
    duration: 300,
    easing: 'ease-in-out',
    enableGPUAcceleration: true,
    accessibilityEnabled: true,
    respectReducedMotion: true,
    enableInteraction: false,
  },
  useCases: ['Floating orbs', 'Background elements', 'Decorative effects'],
};

/**
 * Orbital animation preset
 * Design System: Orbital motion with elliptical path
 */
const ORBITAL_ANIMATION_PRESET: TransformEffectsPreset = {
  name: 'Orbital Animation',
  description: 'Orbital motion with elliptical path and rotation',
  config: {
    type: 'orbital',
    perspective: {
      distance: 1000,
      origin: 'center',
      enableDepth: true,
      depthIntensity: 0.3,
    },
    rotation: {
      axis: 'all',
      angle: 0,
      speed: 0,
      direction: 'clockwise',
      continuous: false,
      bounds: [-180, 180],
    },
    scale: {
      factor: 1,
      origin: 'center',
      enableDepthScaling: true,
      bounds: [0.8, 1.2],
      axis: 'all',
    },
    translation: {
      axis: 'all',
      distance: 0,
      speed: 0,
      bounds: [-100, 100],
      oscillate: false,
      amplitude: 20,
    },
    magneticHover: {
      strength: 20,
      range: 100,
      smoothness: 0.3,
      enableRotation: false,
      rotationIntensity: 15,
      enableScaling: false,
      scaleIntensity: 0.02,
    },
    tilt: {
      intensity: 0.5,
      smoothness: 0.3,
      maxAngle: 15,
      enableGlare: false,
      glareIntensity: 0.1,
      enableShadowAdjustment: false,
    },
    float: {
      amplitude: 20,
      duration: 6000,
      direction: 'vertical',
      enableRandomization: false,
      randomizationIntensity: 5,
    },
    orbital: {
      radius: 75,
      speed: 36, // 360deg / 10s = 36deg/s
      direction: 'clockwise',
      center: { x: 0, y: 0 },
      enableElliptical: true,
      ellipticalRatio: 0.6,
    },
    duration: 300,
    easing: 'linear',
    enableGPUAcceleration: true,
    accessibilityEnabled: true,
    respectReducedMotion: true,
    enableInteraction: false,
  },
  useCases: ['Orbital elements', 'Satellite effects', 'Cosmic animations'],
};

/**
 * Tilt interaction preset
 * Design System: Tilt effects on drag, depth-based scaling
 */
const TILT_INTERACTION_PRESET: TransformEffectsPreset = {
  name: 'Tilt Interaction',
  description: 'Tilt effects on hover with glare and shadow adjustment',
  config: {
    type: 'tilt',
    perspective: {
      distance: 1000,
      origin: 'center',
      enableDepth: true,
      depthIntensity: 0.7,
    },
    rotation: {
      axis: 'all',
      angle: 0,
      speed: 0,
      direction: 'clockwise',
      continuous: false,
      bounds: [-25, 25],
    },
    scale: {
      factor: 1,
      origin: 'center',
      enableDepthScaling: true,
      bounds: [0.95, 1.05],
      axis: 'all',
    },
    translation: {
      axis: 'all',
      distance: 0,
      speed: 0,
      bounds: [-10, 10],
      oscillate: false,
      amplitude: 20,
    },
    magneticHover: {
      strength: 20,
      range: 100,
      smoothness: 0.3,
      enableRotation: false,
      rotationIntensity: 15,
      enableScaling: false,
      scaleIntensity: 0.02,
    },
    tilt: {
      intensity: 0.8,
      smoothness: 0.2,
      maxAngle: 25,
      enableGlare: true,
      glareIntensity: 0.2,
      enableShadowAdjustment: true,
    },
    float: {
      amplitude: 20,
      duration: 6000,
      direction: 'vertical',
      enableRandomization: false,
      randomizationIntensity: 5,
    },
    orbital: {
      radius: 50,
      speed: 30,
      direction: 'clockwise',
      center: { x: 0, y: 0 },
      enableElliptical: false,
      ellipticalRatio: 0.6,
    },
    duration: 200,
    easing: 'ease-out',
    enableGPUAcceleration: true,
    accessibilityEnabled: true,
    respectReducedMotion: true,
    enableInteraction: true,
  },
  useCases: ['Tilt cards', 'Interactive elements', 'Drag effects'],
};

/**
 * Create transform effects from preset
 */
const createTransformFromPreset = (
  preset: TransformEffectsPreset,
  overrides: Partial<TransformEffectsConfig> = {}
): TransformEffectsResult => {
  return createTransformEffects({ ...preset.config, ...overrides });
};

/**
 * Create interactive card transform
 */
const createInteractiveCard = (
  config: Partial<TransformEffectsConfig> = {}
): TransformEffectsResult => {
  return createTransformEffects({
    type: 'magnetic',
    perspective: { distance: 1000, origin: 'center', enableDepth: true, depthIntensity: 0.5 },
    magneticHover: { strength: 20, range: 100, smoothness: 0.3, enableRotation: true, rotationIntensity: 15, enableScaling: true, scaleIntensity: 0.02 },
    enableGPUAcceleration: true,
    enableInteraction: true,
    ...config,
  });
};

/**
 * Create floating orb transform
 */
const createFloatingOrb = (
  config: Partial<TransformEffectsConfig> = {}
): TransformEffectsResult => {
  return createTransformEffects({
    type: 'float',
    float: { amplitude: 20, duration: 6000, direction: 'vertical', enableRandomization: false, randomizationIntensity: 5 },
    rotation: { axis: 'z', speed: 18, direction: 'clockwise', continuous: true, angle: 0, bounds: [0, 360] },
    enableGPUAcceleration: true,
    enableInteraction: false,
    ...config,
  });
};

/**
 * Create orbital animation transform
 */
const createOrbitalAnimation = (
  config: Partial<TransformEffectsConfig> = {}
): TransformEffectsResult => {
  return createTransformEffects({
    type: 'orbital',
    orbital: { radius: 75, speed: 36, direction: 'clockwise', center: { x: 0, y: 0 }, enableElliptical: true, ellipticalRatio: 0.6 },
    enableGPUAcceleration: true,
    enableInteraction: false,
    ...config,
  });
};

/**
 * Create tilt interaction transform
 */
const createTiltInteraction = (
  config: Partial<TransformEffectsConfig> = {}
): TransformEffectsResult => {
  return createTransformEffects({
    type: 'tilt',
    perspective: { distance: 1000, origin: 'center', enableDepth: true, depthIntensity: 0.7 },
    tilt: { intensity: 0.8, smoothness: 0.2, maxAngle: 25, enableGlare: true, glareIntensity: 0.2, enableShadowAdjustment: true },
    enableGPUAcceleration: true,
    enableInteraction: true,
    ...config,
  });
};

/**
 * Create accessible transform effects
 */
const createAccessibleTransform = (
  config: Partial<TransformEffectsConfig> = {}
): TransformEffectsResult => {
  return createTransformEffects({
    type: 'perspective',
    perspective: { distance: 1000, origin: 'center', enableDepth: false, depthIntensity: 0.2 },
    accessibilityEnabled: true,
    respectReducedMotion: true,
    enableGPUAcceleration: false,
    enableInteraction: false,
    ...config,
  });
};

// Export all functionality
export {
  // Main creator
  createTransformEffects,
  
  // Presets
  INTERACTIVE_CARD_PRESET,
  FLOATING_ORB_PRESET,
  ORBITAL_ANIMATION_PRESET,
  TILT_INTERACTION_PRESET,
  
  // Specialized creators
  createTransformFromPreset,
  createInteractiveCard,
  createFloatingOrb,
  createOrbitalAnimation,
  createTiltInteraction,
  createAccessibleTransform,
  
  // Utility functions
  createTransformMatrix,
};
