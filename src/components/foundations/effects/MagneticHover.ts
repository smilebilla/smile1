/**
 * Corp Astro UI Library - Magnetic Hover Effects
 * 
 * Magnetic hover effects that create smooth 3D transformations when hovering over elements.
 * Provides magnetic attraction, smooth rotation, and scale effects following the exact 
 * specifications from the Design System.
 * 
 * @module MagneticHover
 * @version 1.0.0
 * @since 2024
 * 
 * Design System Reference:
 * - Line 1603: magneticHover: { strength: 30, smoothness: 0.3, perspective: 1000, transform: { rotateX: [-15, 15], rotateY: [-15, 15], scale: [0.98, 1.02] } }
 * - Line 829: interactiveCard: { magneticHover: { enabled: true, strength: 20, perspective: 1000, rotateX: 15, rotateY: 15 } }
 * - UI Documentation: Magnetic hover interaction patterns and 3D transforms
 */

import { Animated, PanResponder, Dimensions, GestureResponderEvent, PanResponderGestureState } from 'react-native';
import { useRef, useMemo, useEffect, useCallback } from 'react';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Magnetic hover strength presets
 */
export type MagneticStrength = 'subtle' | 'normal' | 'strong' | 'extreme';

/**
 * Magnetic hover smoothness presets
 */
export type MagneticSmoothness = 'instant' | 'fast' | 'normal' | 'smooth' | 'slow';

/**
 * Magnetic hover configuration
 */
export interface MagneticHoverConfig {
  /** Magnetic strength (0-100) */
  strength?: MagneticStrength | number;
  /** Animation smoothness (0-1) */
  smoothness?: MagneticSmoothness | number;
  /** 3D perspective value */
  perspective?: number;
  /** Transform ranges */
  transform?: {
    /** Rotation X range in degrees */
    rotateX?: [number, number];
    /** Rotation Y range in degrees */
    rotateY?: [number, number];
    /** Scale range */
    scale?: [number, number];
  };
  /** Enable/disable magnetic effect */
  enabled?: boolean;
  /** Magnetic field radius */
  magneticRadius?: number;
  /** Animation duration in milliseconds */
  duration?: number;
  /** Enable 3D transforms */
  enable3D?: boolean;
  /** Magnetic boundary behavior */
  boundary?: 'clamp' | 'wrap' | 'bounce';
  /** Performance optimization */
  performance?: {
    /** Reduce effects on low-end devices */
    reducedMotion?: boolean;
    /** Use native driver when possible */
    useNativeDriver?: boolean;
    /** Throttle update frequency */
    throttle?: number;
  };
}

/**
 * Magnetic hover state
 */
export interface MagneticHoverState {
  /** Current mouse/touch position */
  position: { x: number; y: number };
  /** Is currently hovering */
  isHovering: boolean;
  /** Current transform values */
  transform: {
    rotateX: number;
    rotateY: number;
    scale: number;
    translateX: number;
    translateY: number;
  };
  /** Animation progress (0-1) */
  progress: number;
  /** Magnetic field strength at current position */
  magneticStrength: number;
}

/**
 * Magnetic hover return type
 */
export interface MagneticHoverReturn {
  /** Animated style object */
  animatedStyle: {
    transform: any[];
  };
  /** Animated values */
  values: {
    rotateX: Animated.Value;
    rotateY: Animated.Value;
    scale: Animated.Value;
    translateX: Animated.Value;
    translateY: Animated.Value;
  };
  /** Pan responder for touch handling */
  panResponder: any;
  /** Current hover state */
  state: MagneticHoverState;
  /** Control functions */
  controls: {
    /** Activate magnetic effect */
    activate: () => void;
    /** Deactivate magnetic effect */
    deactivate: () => void;
    /** Reset to initial state */
    reset: () => void;
    /** Update configuration */
    updateConfig: (newConfig: Partial<MagneticHoverConfig>) => void;
  };
}

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Screen dimensions
 */
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

/**
 * Default magnetic hover configuration
 * Based on Design System: strength: 30, smoothness: 0.3, perspective: 1000
 */
const DEFAULT_MAGNETIC_CONFIG: Required<MagneticHoverConfig> = {
  strength: 30,
  smoothness: 0.3,
  perspective: 1000,
  transform: {
    rotateX: [-15, 15],
    rotateY: [-15, 15],
    scale: [0.98, 1.02],
  },
  enabled: true,
  magneticRadius: 200,
  duration: 300,
  enable3D: true,
  boundary: 'clamp',
  performance: {
    reducedMotion: false,
    useNativeDriver: true,
    throttle: 16, // 60fps
  },
};

/**
 * Magnetic strength presets
 */
const MAGNETIC_STRENGTH_PRESETS: Record<MagneticStrength, number> = {
  subtle: 15,
  normal: 30,    // Design System default
  strong: 50,
  extreme: 80,
} as const;

/**
 * Magnetic smoothness presets
 */
const MAGNETIC_SMOOTHNESS_PRESETS: Record<MagneticSmoothness, number> = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.3,   // Design System default
  smooth: 0.5,
  slow: 0.8,
} as const;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Normalize magnetic strength value
 */
const normalizeMagneticStrength = (strength: MagneticStrength | number): number => {
  if (typeof strength === 'number') {
    return Math.max(0, Math.min(100, strength));
  }
  return MAGNETIC_STRENGTH_PRESETS[strength];
};

/**
 * Normalize magnetic smoothness value
 */
const normalizeMagneticSmoothness = (smoothness: MagneticSmoothness | number): number => {
  if (typeof smoothness === 'number') {
    return Math.max(0, Math.min(1, smoothness));
  }
  return MAGNETIC_SMOOTHNESS_PRESETS[smoothness];
};

/**
 * Calculate magnetic field strength at a given distance
 */
const calculateMagneticStrength = (
  distance: number,
  maxDistance: number,
  baseStrength: number
): number => {
  if (distance >= maxDistance) return 0;
  
  // Inverse square law for magnetic field
  const normalizedDistance = distance / maxDistance;
  const falloff = 1 - (normalizedDistance * normalizedDistance);
  
  return baseStrength * falloff;
};

/**
 * Calculate 3D transform values based on position
 */
const calculateTransformValues = (
  position: { x: number; y: number },
  elementCenter: { x: number; y: number },
  config: Required<MagneticHoverConfig>
): {
  rotateX: number;
  rotateY: number;
  scale: number;
  translateX: number;
  translateY: number;
} => {
  const { strength, transform, magneticRadius } = config;
  const numericStrength = typeof strength === 'number' ? strength : normalizeMagneticStrength(strength);
  
  // Calculate relative position
  const relativeX = position.x - elementCenter.x;
  const relativeY = position.y - elementCenter.y;
  const distance = Math.sqrt(relativeX * relativeX + relativeY * relativeY);
  
  // Calculate magnetic field strength
  const magneticStrength = calculateMagneticStrength(distance, magneticRadius, numericStrength);
  const normalizedStrength = magneticStrength / 100;
  
  // Calculate rotation based on position
  const rotateXRange = transform.rotateX![1] - transform.rotateX![0];
  const rotateYRange = transform.rotateY![1] - transform.rotateY![0];
  
  const rotateX = transform.rotateX![0] + (relativeY / magneticRadius) * rotateXRange * normalizedStrength;
  const rotateY = transform.rotateY![0] + (relativeX / magneticRadius) * rotateYRange * normalizedStrength;
  
  // Calculate scale
  const scaleRange = transform.scale![1] - transform.scale![0];
  const scale = transform.scale![0] + scaleRange * normalizedStrength;
  
  // Calculate magnetic attraction translation
  const attractionStrength = normalizedStrength * 0.1; // Subtle attraction
  const translateX = relativeX * attractionStrength;
  const translateY = relativeY * attractionStrength;
  
  return {
    rotateX: clampValue(rotateX, transform.rotateX![0], transform.rotateX![1]),
    rotateY: clampValue(rotateY, transform.rotateY![0], transform.rotateY![1]),
    scale: clampValue(scale, transform.scale![0], transform.scale![1]),
    translateX: clampValue(translateX, -20, 20),
    translateY: clampValue(translateY, -20, 20),
  };
};

/**
 * Clamp value between min and max
 */
const clampValue = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, value));
};

/**
 * Apply boundary behavior to transform values
 */
const applyBoundaryBehavior = (
  value: number,
  min: number,
  max: number,
  boundary: 'clamp' | 'wrap' | 'bounce'
): number => {
  switch (boundary) {
    case 'clamp':
      return clampValue(value, min, max);
    case 'wrap':
      const range = max - min;
      return min + ((value - min) % range + range) % range;
    case 'bounce':
      const bounceRange = max - min;
      const normalized = (value - min) / bounceRange;
      const bounced = Math.abs(normalized % 2 - 1);
      return min + bounced * bounceRange;
    default:
      return value;
  }
};

// ============================================================================
// MAGNETIC HOVER HOOK
// ============================================================================

/**
 * Primary magnetic hover hook
 * Provides complete magnetic hover functionality with 3D transforms
 */
export const useMagneticHover = (
  config: MagneticHoverConfig = {},
  elementRef?: React.RefObject<any>
): MagneticHoverReturn => {
  const finalConfig = useMemo(() => ({
    ...DEFAULT_MAGNETIC_CONFIG,
    ...config,
    strength: normalizeMagneticStrength(config.strength ?? DEFAULT_MAGNETIC_CONFIG.strength),
    smoothness: normalizeMagneticSmoothness(config.smoothness ?? DEFAULT_MAGNETIC_CONFIG.smoothness),
    transform: {
      ...DEFAULT_MAGNETIC_CONFIG.transform,
      ...config.transform,
    },
    performance: {
      ...DEFAULT_MAGNETIC_CONFIG.performance,
      ...config.performance,
    },
  }), [config]);

  // Animated values
  const rotateX = useRef(new Animated.Value(0)).current;
  const rotateY = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  // State management
  const stateRef = useRef<MagneticHoverState>({
    position: { x: 0, y: 0 },
    isHovering: false,
    transform: {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      translateX: 0,
      translateY: 0,
    },
    progress: 0,
    magneticStrength: 0,
  });

  const elementCenterRef = useRef({ x: 0, y: 0 });
  const lastUpdateRef = useRef(0);

  // Update element center position
  const updateElementCenter = useCallback(() => {
    if (elementRef?.current) {
      elementRef.current.measure((x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
        elementCenterRef.current = {
          x: pageX + width / 2,
          y: pageY + height / 2,
        };
      });
    }
  }, [elementRef]);

  // Animate to target values
  const animateToTarget = useCallback((targetValues: {
    rotateX: number;
    rotateY: number;
    scale: number;
    translateX: number;
    translateY: number;
  }) => {
    const { duration, performance } = finalConfig;
    const useNativeDriver = (performance.useNativeDriver ?? true) && finalConfig.enable3D;

    // Throttle updates for performance
    const now = Date.now();
    if (now - lastUpdateRef.current < (performance.throttle ?? 16)) {
      return;
    }
    lastUpdateRef.current = now;

    // Create animations
    const animations = [
      Animated.timing(rotateX, {
        toValue: targetValues.rotateX,
        duration: duration * finalConfig.smoothness,
        useNativeDriver,
      }),
      Animated.timing(rotateY, {
        toValue: targetValues.rotateY,
        duration: duration * finalConfig.smoothness,
        useNativeDriver,
      }),
      Animated.timing(scale, {
        toValue: targetValues.scale,
        duration: duration * finalConfig.smoothness,
        useNativeDriver,
      }),
      Animated.timing(translateX, {
        toValue: targetValues.translateX,
        duration: duration * finalConfig.smoothness,
        useNativeDriver,
      }),
      Animated.timing(translateY, {
        toValue: targetValues.translateY,
        duration: duration * finalConfig.smoothness,
        useNativeDriver,
      }),
    ];

    // Run animations in parallel
    Animated.parallel(animations).start();

    // Update state
    stateRef.current.transform = targetValues;
  }, [finalConfig, rotateX, rotateY, scale, translateX, translateY]);

  // Handle pointer/touch movement
  const handlePointerMove = useCallback((position: { x: number; y: number }) => {
    if (!finalConfig.enabled) return;

    stateRef.current.position = position;
    stateRef.current.isHovering = true;

    // Calculate transform values
    const transformValues = calculateTransformValues(
      position,
      elementCenterRef.current,
      finalConfig
    );

    // Apply boundary behavior
    const boundedValues = {
      rotateX: applyBoundaryBehavior(
        transformValues.rotateX,
        finalConfig.transform.rotateX![0],
        finalConfig.transform.rotateX![1],
        finalConfig.boundary
      ),
      rotateY: applyBoundaryBehavior(
        transformValues.rotateY,
        finalConfig.transform.rotateY![0],
        finalConfig.transform.rotateY![1],
        finalConfig.boundary
      ),
      scale: applyBoundaryBehavior(
        transformValues.scale,
        finalConfig.transform.scale![0],
        finalConfig.transform.scale![1],
        finalConfig.boundary
      ),
      translateX: transformValues.translateX,
      translateY: transformValues.translateY,
    };

    // Update magnetic strength
    const distance = Math.sqrt(
      (position.x - elementCenterRef.current.x) ** 2 +
      (position.y - elementCenterRef.current.y) ** 2
    );
    stateRef.current.magneticStrength = calculateMagneticStrength(
      distance,
      finalConfig.magneticRadius,
      finalConfig.strength
    );

    // Animate to new values
    animateToTarget(boundedValues);
  }, [finalConfig, animateToTarget]);

  // Handle pointer/touch leave
  const handlePointerLeave = useCallback(() => {
    stateRef.current.isHovering = false;
    stateRef.current.magneticStrength = 0;

    // Return to initial state
    animateToTarget({
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      translateX: 0,
      translateY: 0,
    });
  }, [animateToTarget]);

  // Pan responder for touch handling
  const panResponder = useMemo(() => 
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (event: GestureResponderEvent) => {
        updateElementCenter();
        handlePointerMove({
          x: event.nativeEvent.pageX,
          y: event.nativeEvent.pageY,
        });
      },
      onPanResponderMove: (event: GestureResponderEvent) => {
        handlePointerMove({
          x: event.nativeEvent.pageX,
          y: event.nativeEvent.pageY,
        });
      },
      onPanResponderRelease: () => {
        handlePointerLeave();
      },
      onPanResponderTerminate: () => {
        handlePointerLeave();
      },
    }),
    [handlePointerMove, handlePointerLeave, updateElementCenter]
  );

  // Control functions
  const controls = useMemo(() => ({
    activate: () => {
      finalConfig.enabled = true;
    },
    deactivate: () => {
      finalConfig.enabled = false;
      handlePointerLeave();
    },
    reset: () => {
      handlePointerLeave();
    },
    updateConfig: (newConfig: Partial<MagneticHoverConfig>) => {
      Object.assign(finalConfig, newConfig);
    },
  }), [finalConfig, handlePointerLeave]);

  // Update element center on mount and config changes
  useEffect(() => {
    updateElementCenter();
  }, [updateElementCenter, finalConfig]);

  // Animated style
  const animatedStyle = useMemo(() => ({
    transform: [
      { perspective: finalConfig.perspective },
      { rotateX: rotateX.interpolate({
        inputRange: [-90, 90],
        outputRange: ['-90deg', '90deg'],
      }) },
      { rotateY: rotateY.interpolate({
        inputRange: [-90, 90],
        outputRange: ['-90deg', '90deg'],
      }) },
      { scale },
      { translateX },
      { translateY },
    ],
  }), [finalConfig.perspective, rotateX, rotateY, scale, translateX, translateY]);

  return {
    animatedStyle,
    values: {
      rotateX,
      rotateY,
      scale,
      translateX,
      translateY,
    },
    panResponder,
    state: stateRef.current,
    controls,
  };
};

// ============================================================================
// PRESET HOOKS
// ============================================================================

/**
 * Card magnetic hover preset
 * Optimized for card components with subtle magnetic effects
 */
export const useCardMagneticHover = (
  elementRef?: React.RefObject<any>
): MagneticHoverReturn => {
  return useMagneticHover({
    strength: 20,
    smoothness: 0.4,
    perspective: 1000,
    transform: {
      rotateX: [-10, 10],
      rotateY: [-10, 10],
      scale: [0.99, 1.01],
    },
    magneticRadius: 150,
    duration: 400,
  }, elementRef);
};

/**
 * Button magnetic hover preset
 * Stronger magnetic effect for interactive buttons
 */
export const useButtonMagneticHover = (
  elementRef?: React.RefObject<any>
): MagneticHoverReturn => {
  return useMagneticHover({
    strength: 30,
    smoothness: 0.3,
    perspective: 1000,
    transform: {
      rotateX: [-15, 15],
      rotateY: [-15, 15],
      scale: [0.98, 1.02],
    },
    magneticRadius: 200,
    duration: 300,
  }, elementRef);
};

/**
 * Floating element magnetic hover preset
 * Enhanced magnetic effect for floating elements
 */
export const useFloatingMagneticHover = (
  elementRef?: React.RefObject<any>
): MagneticHoverReturn => {
  return useMagneticHover({
    strength: 50,
    smoothness: 0.2,
    perspective: 1200,
    transform: {
      rotateX: [-20, 20],
      rotateY: [-20, 20],
      scale: [0.96, 1.04],
    },
    magneticRadius: 250,
    duration: 250,
  }, elementRef);
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Create magnetic hover configuration
 */
export const createMagneticHoverConfig = (
  strength: MagneticStrength | number,
  smoothness: MagneticSmoothness | number,
  perspective: number = 1000
): MagneticHoverConfig => {
  return {
    strength,
    smoothness,
    perspective,
    transform: {
      rotateX: [-15, 15],
      rotateY: [-15, 15],
      scale: [0.98, 1.02],
    },
    enabled: true,
    magneticRadius: 200,
    duration: 300,
  };
};

/**
 * Calculate magnetic field boundaries
 */
export const calculateMagneticBoundaries = (
  elementSize: { width: number; height: number },
  magneticRadius: number
): {
  left: number;
  right: number;
  top: number;
  bottom: number;
} => {
  const { width, height } = elementSize;
  
  return {
    left: -magneticRadius,
    right: width + magneticRadius,
    top: -magneticRadius,
    bottom: height + magneticRadius,
  };
};

// ============================================================================
// EXPORTS
// ============================================================================

export default useMagneticHover;
