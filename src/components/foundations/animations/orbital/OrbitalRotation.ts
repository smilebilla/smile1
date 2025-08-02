/**
 * Corp Astro UI Library - Orbital Rotation Animations
 * 
 * Orbital rotation animations that match the Corp Astro logo's orbital theme.
 * Provides multiple rotation speeds, directions, and orbital patterns following
 * the exact specifications from the Design System.
 * 
 * @module OrbitalRotation
 * @version 1.0.0
 * @since 2024
 * 
 * UI Documentation Reference:
 * - Design System: Orbital Animations specifications (lines 2848-2900)
 * - Developer Handoff: useOrbitalRotation hook implementation (lines 1127-1150)
 * - Design Tokens: Orbital animation configuration
 */

import { Animated, Easing } from 'react-native';
import { useEffect, useRef } from 'react';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Orbital rotation speed presets
 */
export type OrbitalSpeed = 'slow' | 'medium' | 'fast';

/**
 * Orbital rotation direction
 */
export type OrbitalDirection = 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';

/**
 * Orbital rotation easing function
 */
export type OrbitalEasing = 'linear' | 'ease-in-out' | 'ease-in' | 'ease-out';

/**
 * Orbital rotation configuration
 */
export interface OrbitalRotationConfig {
  /** Rotation speed preset or custom duration in milliseconds */
  speed?: OrbitalSpeed | number;
  /** Rotation direction */
  direction?: OrbitalDirection;
  /** Easing function */
  easing?: OrbitalEasing;
  /** Whether to start immediately */
  autoStart?: boolean;
  /** Number of iterations (-1 for infinite) */
  iterations?: number;
  /** Start angle in degrees */
  startAngle?: number;
  /** End angle in degrees */
  endAngle?: number;
}

/**
 * Orbital rotation return type
 */
export interface OrbitalRotationReturn {
  /** Animated value for rotation */
  rotationValue: Animated.Value;
  /** Animated style for the rotating element */
  animatedStyle: {
    transform: {
      rotate: Animated.AnimatedInterpolation<string | number>;
    }[];
  };
  /** Start rotation animation */
  start: () => void;
  /** Stop rotation animation */
  stop: () => void;
  /** Reset rotation to start position */
  reset: () => void;
}

// ============================================================================
// ORBITAL ROTATION CONSTANTS
// ============================================================================

/**
 * Orbital rotation speed presets (in milliseconds)
 * Based on Design System specifications: duration: [20, 30, 40]
 */
export const ORBITAL_SPEEDS: Record<OrbitalSpeed, number> = {
  slow: 40000,    // 40 seconds - outermost ring
  medium: 30000,  // 30 seconds - middle ring
  fast: 20000,    // 20 seconds - innermost ring
} as const;

/**
 * Orbital rotation directions
 * Based on Design System: direction: ['normal', 'reverse', 'normal']
 */
export const ORBITAL_DIRECTIONS: Record<OrbitalDirection, boolean> = {
  normal: false,
  reverse: true,
  alternate: false,
  'alternate-reverse': true,
} as const;

/**
 * Orbital easing functions
 */
export const ORBITAL_EASING: Record<OrbitalEasing, any> = {
  linear: Easing.linear,
  'ease-in-out': Easing.inOut(Easing.ease),
  'ease-in': Easing.in(Easing.ease),
  'ease-out': Easing.out(Easing.ease),
} as const;

/**
 * Default orbital rotation configuration
 */
export const DEFAULT_ORBITAL_CONFIG: Required<OrbitalRotationConfig> = {
  speed: 'medium',
  direction: 'normal',
  easing: 'linear',
  autoStart: true,
  iterations: -1,
  startAngle: 0,
  endAngle: 360,
};

// ============================================================================
// ORBITAL ROTATION UTILITIES
// ============================================================================

/**
 * Get rotation duration from speed configuration
 */
export const getOrbitalDuration = (speed: OrbitalSpeed | number): number => {
  if (typeof speed === 'number') {
    return speed;
  }
  return ORBITAL_SPEEDS[speed];
};

/**
 * Get rotation direction boolean from direction configuration
 */
export const getOrbitalDirection = (direction: OrbitalDirection): boolean => {
  return ORBITAL_DIRECTIONS[direction];
};

/**
 * Get easing function from easing configuration
 */
export const getOrbitalEasing = (easing: OrbitalEasing) => {
  return ORBITAL_EASING[easing];
};

/**
 * Calculate rotation angle based on direction and angle range
 */
export const calculateRotationAngle = (
  direction: OrbitalDirection,
  startAngle: number,
  endAngle: number
): number => {
  const isReverse = getOrbitalDirection(direction);
  if (isReverse) {
    return startAngle - (endAngle - startAngle);
  }
  return endAngle;
};

/**
 * Convert degrees to radians
 */
export const degreesToRadians = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};

/**
 * Convert radians to degrees
 */
export const radiansToDegrees = (radians: number): number => {
  return radians * (180 / Math.PI);
};

// ============================================================================
// ORBITAL ROTATION HOOKS
// ============================================================================

/**
 * Primary orbital rotation hook
 * Provides complete orbital rotation animation with all configuration options
 */
export const useOrbitalRotation = (config: OrbitalRotationConfig = {}): OrbitalRotationReturn => {
  const finalConfig = { ...DEFAULT_ORBITAL_CONFIG, ...config };
  
  const rotationValue = useRef(new Animated.Value(finalConfig.startAngle)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);
  
  const duration = getOrbitalDuration(finalConfig.speed);
  const isReverse = getOrbitalDirection(finalConfig.direction);
  const easingFunc = getOrbitalEasing(finalConfig.easing);
  const targetAngle = calculateRotationAngle(finalConfig.direction, finalConfig.startAngle, finalConfig.endAngle);
  
  const startAnimation = () => {
    const animation = Animated.loop(
      Animated.timing(rotationValue, {
        toValue: targetAngle,
        duration,
        easing: easingFunc,
        useNativeDriver: true,
      }),
      {
        iterations: finalConfig.iterations === -1 ? -1 : finalConfig.iterations,
        resetBeforeIteration: true,
      }
    );
    
    animationRef.current = animation;
    animation.start();
  };
  
  const stopAnimation = () => {
    if (animationRef.current) {
      animationRef.current.stop();
      animationRef.current = null;
    }
  };
  
  const resetAnimation = () => {
    stopAnimation();
    rotationValue.setValue(finalConfig.startAngle);
  };
  
  // Auto-start if enabled
  useEffect(() => {
    if (finalConfig.autoStart) {
      startAnimation();
    }
    
    return () => {
      stopAnimation();
    };
  }, []);
  
  const animatedStyle = {
    transform: [{
      rotate: rotationValue.interpolate({
        inputRange: [0, 360],
        outputRange: ['0deg', '360deg'],
      }),
    }],
  };
  
  return {
    rotationValue,
    animatedStyle,
    start: startAnimation,
    stop: stopAnimation,
    reset: resetAnimation,
  };
};

/**
 * Multi-ring orbital rotation hook
 * Creates multiple orbital rings with different speeds and directions
 * Based on Design System: rings with count: 3, radius: [50, 75, 100]
 */
export const useMultiOrbitalRotation = (
  ringCount: number = 3,
  baseConfigs: OrbitalRotationConfig[] = []
): OrbitalRotationReturn[] => {
  const defaultConfigs: OrbitalRotationConfig[] = [
    { speed: 'fast', direction: 'normal' },     // Inner ring: 20s, normal
    { speed: 'medium', direction: 'reverse' },  // Middle ring: 30s, reverse
    { speed: 'slow', direction: 'normal' },     // Outer ring: 40s, normal
  ];
  
  const configs = baseConfigs.length > 0 ? baseConfigs : defaultConfigs;
  const rings: OrbitalRotationReturn[] = [];
  
  for (let i = 0; i < ringCount; i++) {
    const config = configs[i % configs.length];
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const orbital = useOrbitalRotation(config);
    rings.push(orbital);
  }
  
  return rings;
};

/**
 * Orbital rotation with pulse effect
 * Combines rotation with opacity pulsing as per Design System specifications
 */
export const useOrbitalRotationWithPulse = (
  rotationConfig: OrbitalRotationConfig = {},
  pulseConfig: { duration?: number; minOpacity?: number; maxOpacity?: number } = {}
): OrbitalRotationReturn & { pulseValue: Animated.Value; pulseStyle: any } => {
  const orbital = useOrbitalRotation(rotationConfig);
  
  const pulseValue = useRef(new Animated.Value(pulseConfig.minOpacity || 0.3)).current;
  const pulseDuration = pulseConfig.duration || 4000;
  const minOpacity = pulseConfig.minOpacity || 0.3;
  const maxOpacity = pulseConfig.maxOpacity || 0.6;
  
  useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseValue, {
          toValue: maxOpacity,
          duration: pulseDuration / 2,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseValue, {
          toValue: minOpacity,
          duration: pulseDuration / 2,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
      { iterations: -1 }
    );
    
    pulseAnimation.start();
    
    return () => {
      pulseAnimation.stop();
    };
  }, []);
  
  const pulseStyle = {
    opacity: pulseValue,
  };
  
  return {
    ...orbital,
    pulseValue,
    pulseStyle,
  };
};

// ============================================================================
// ORBITAL ROTATION PRESETS
// ============================================================================

/**
 * Logo orbital rotation preset
 * Matches the Corp Astro logo orbital animation
 */
export const useLogoOrbitalRotation = (): OrbitalRotationReturn => {
  return useOrbitalRotation({
    speed: 'fast',
    direction: 'normal',
    easing: 'linear',
    autoStart: true,
    iterations: -1,
  });
};

/**
 * Button orbital rotation preset
 * For orbital loading states in buttons
 */
export const useButtonOrbitalRotation = (): OrbitalRotationReturn => {
  return useOrbitalRotation({
    speed: 'medium',
    direction: 'normal',
    easing: 'linear',
    autoStart: true,
    iterations: -1,
  });
};

/**
 * Navigation orbital rotation preset
 * For orbital effects in navigation elements
 */
export const useNavigationOrbitalRotation = (): OrbitalRotationReturn => {
  return useOrbitalRotation({
    speed: 'slow',
    direction: 'normal',
    easing: 'ease-in-out',
    autoStart: true,
    iterations: -1,
  });
};

/**
 * Floating orb orbital rotation preset
 * For floating orb navigation elements
 */
export const useFloatingOrbRotation = (): OrbitalRotationReturn & { pulseValue: Animated.Value; pulseStyle: any } => {
  return useOrbitalRotationWithPulse(
    {
      speed: 20000, // 20 seconds as per Design System
      direction: 'normal',
      easing: 'linear',
      autoStart: true,
      iterations: -1,
    },
    {
      duration: 3000, // 3 seconds pulse as per Design System
      minOpacity: 0.3,
      maxOpacity: 0.6,
    }
  );
};

// ============================================================================
// ORBITAL ROTATION FACTORY FUNCTIONS
// ============================================================================

/**
 * Create orbital rotation configuration
 */
export const createOrbitalRotationConfig = (
  speed: OrbitalSpeed | number,
  direction: OrbitalDirection = 'normal',
  easing: OrbitalEasing = 'linear'
): OrbitalRotationConfig => {
  return {
    speed,
    direction,
    easing,
    autoStart: true,
    iterations: -1,
    startAngle: 0,
    endAngle: 360,
  };
};

/**
 * Create multi-ring orbital configuration
 * Based on Design System specifications
 */
export const createMultiRingOrbitalConfig = (): OrbitalRotationConfig[] => {
  return [
    createOrbitalRotationConfig('fast', 'normal'),      // Inner ring: 20s, normal
    createOrbitalRotationConfig('medium', 'reverse'),   // Middle ring: 30s, reverse
    createOrbitalRotationConfig('slow', 'normal'),      // Outer ring: 40s, normal
  ];
};

// ============================================================================
// EXPORTS
// ============================================================================

export default useOrbitalRotation;
