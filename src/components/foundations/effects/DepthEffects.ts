/**
 * Corp Astro UI Library - Depth Effects System
 * 
 * Comprehensive multi-layered depth effects system for creating premium visual depth.
 * Implements elevation, perspective, and layered shadow systems following Corp Astro's
 * "Depth Over Decoration" philosophy.
 * 
 * @module DepthEffects
 * @version 1.0.0
 * @since 2024
 * 
 * UI Documentation Reference:
 * - Visual Language: "Depth Over Decoration - Multi-layered depth with purpose"
 * - Design System: "Shadows create depth and hierarchy in the interface"
 * - Elevation: Cards float 8-16px above background, hover states lift elements 4-8px
 * - Perspective: 3D transforms on interaction, tilt effects on drag, depth-based scaling
 * - Shadow Philosophy: Soft, diffused shadows, multiple shadow layers for depth
 * 
 * Features:
 * - Multi-layered shadow system
 * - Elevation management
 * - Perspective transforms
 * - Depth-based scaling
 * - Performance optimized
 * - Accessibility support
 * - GPU-accelerated effects
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Platform, ViewStyle } from 'react-native';

// Utility function to check for reduced motion preference
const prefersReducedMotion = (): boolean => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  return false;
};

// Assume color tokens are defined elsewhere
const deepSpaceColors = { void: '#000000', dark: '#111111' };
const SignatureBlues = { primary: '#2E86DE', glow: '#6C5CE7' };
const ProfessionalGrays = { text: '#333333' };

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type DepthEffectType = 'elevation' | 'perspective' | 'parallax' | 'shadow' | 'glow' | 'inner';

export type ElevationLevel = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'custom';

export type ShadowType = 'soft' | 'hard' | 'glow' | 'inner' | 'multiple';

export type PerspectiveDirection = 'x' | 'y' | 'both';

export interface DepthLayerConfig {
  index: number;
  offset: number;
  opacity: number;
  blur: number;
  scale: number;
  tint: string;
  blendMode: 'normal' | 'multiply' | 'overlay' | 'soft-light' | 'hard-light';
}

export interface ElevationConfig {
  level: ElevationLevel;
  customElevation?: number;
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  enableGlow: boolean;
  glowColor?: string;
  glowIntensity?: number;
}

export interface PerspectiveConfig {
  perspective: number;
  rotateX: [number, number];
  rotateY: [number, number];
  scaleRange: [number, number];
  transformOrigin: string;
  duration: number;
  easing: string;
  enableTilt: boolean;
}

export interface DepthEffectsConfig {
  type: DepthEffectType;
  layers: DepthLayerConfig[];
  elevation: ElevationConfig;
  perspective: PerspectiveConfig;
  enableDepthBlur: boolean;
  blurIntensity: number;
  accessibilityEnabled: boolean;
  respectReducedMotion: boolean;
  enableGPUAcceleration: boolean;
}

export interface DepthEffectsState {
  currentElevation: number;
  currentPerspective: { rotateX: number; rotateY: number; scale: number };
  activeLayers: DepthLayerConfig[];
  isAnimating: boolean;
  isInteracting: boolean;
  reducedMotion: boolean;
}

export interface DepthEffectsResult {
  style: ViewStyle;
  ref: React.RefObject<any>;
  handlers: {
    onMouseEnter: (e: any) => void;
    onMouseLeave: (e: any) => void;
    onMouseDown: (e: any) => void;
    onMouseUp: (e: any) => void;
    onMouseMove: (e: any) => void;
  };
  setElevation: (level: ElevationLevel) => void;
  setPerspective: (rotateX: number, rotateY: number, scale?: number) => void;
  addLayer: (layer: DepthLayerConfig) => void;
  removeLayer: (index: number) => void;
  animateToElevation: (level: ElevationLevel, duration?: number) => void;
  reset: () => void;
  getState: () => DepthEffectsState;
  cleanup: () => void;
  apply: (element: any) => void;
  remove: (element: any) => void;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const ELEVATION_LEVELS: Record<ElevationLevel, ElevationConfig> = {
  none: {
    level: 'none',
    shadowColor: 'rgba(0, 0, 0, 0)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    enableGlow: false,
  },
  sm: {
    level: 'sm',
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    enableGlow: false,
  },
  md: {
    level: 'md',
    shadowColor: 'rgba(0, 0, 0, 0.4)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    enableGlow: false,
  },
  lg: {
    level: 'lg',
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    enableGlow: false,
  },
  xl: {
    level: 'xl',
    shadowColor: 'rgba(0, 0, 0, 0.6)',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.6,
    shadowRadius: 24,
    enableGlow: false,
  },
  custom: {
    level: 'custom',
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    enableGlow: false,
  },
};

const GLOW_EFFECTS = {
  blue: 'rgba(46, 134, 222, 0.5)',
  purple: 'rgba(108, 92, 231, 0.5)',
  gold: 'rgba(255, 215, 0, 0.5)',
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const hexToRgba = (hex: string, alpha: number): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return `rgba(0, 0, 0, ${alpha})`;
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const generateLayeredShadow = (layers: DepthLayerConfig[]): string => {
  return layers
    .sort((a, b) => a.index - b.index)
    .map(layer => `0 ${layer.offset}px ${layer.blur}px ${hexToRgba(layer.tint, layer.opacity)}`)
    .join(', ');
};

const calculateCombinedShadow = (layers: DepthLayerConfig[]): { shadowColor: string; shadowOffset: { width: number; height: number }; shadowOpacity: number; shadowRadius: number } => {
  if (layers.length === 0) return { shadowColor: 'rgba(0,0,0,0)', shadowOffset: {width:0,height:0}, shadowOpacity: 0, shadowRadius: 0 };
  const sorted = layers.sort((a, b) => a.index - b.index);
  let offset = 0;
  let blur = 0;
  let opacity = 0;
  for (const layer of sorted) {
    offset += layer.offset;
    blur += layer.blur;
    opacity += layer.opacity;
  }
  opacity = Math.min(1, opacity / sorted.length);
  blur /= sorted.length;
  offset /= sorted.length;
  const tint = sorted[sorted.length - 1].tint;
  return {
    shadowColor: hexToRgba(tint, opacity),
    shadowOffset: { width: 0, height: offset },
    shadowOpacity: opacity,
    shadowRadius: blur,
  };
};

// ============================================================================
// DEPTH EFFECTS CREATOR
// ============================================================================

const createDepthEffects = (
  config: Partial<DepthEffectsConfig> = {}
): DepthEffectsResult => {
  const defaultConfig: DepthEffectsConfig = {
    type: 'elevation',
    layers: [
      {
        index: 0,
        offset: 2,
        opacity: 0.3,
        blur: 4,
        scale: 1,
        tint: deepSpaceColors.void as string,
        blendMode: 'normal',
      },
      {
        index: 1,
        offset: 8,
        opacity: 0.2,
        blur: 16,
        scale: 1.02,
        tint: SignatureBlues.primary as string,
        blendMode: 'multiply',
      },
    ],
    elevation: ELEVATION_LEVELS.md,
    perspective: {
      perspective: 1000,
      rotateX: [-15, 15],
      rotateY: [-15, 15],
      scaleRange: [0.98, 1.02],
      transformOrigin: 'center center',
      duration: 300,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      enableTilt: false,
    },
    enableDepthBlur: false,
    blurIntensity: 0.5,
    accessibilityEnabled: true,
    respectReducedMotion: true,
    enableGPUAcceleration: true,
  };

  const finalConfig = { ...defaultConfig, ...config };

  const [currentState, setCurrentState] = useState<DepthEffectsState>({
    currentElevation: ELEVATION_LEVELS[finalConfig.elevation.level].shadowRadius,
    currentPerspective: { rotateX: 0, rotateY: 0, scale: 1 },
    activeLayers: [...finalConfig.layers],
    isAnimating: false,
    isInteracting: false,
    reducedMotion: finalConfig.respectReducedMotion && prefersReducedMotion(),
  });

  const elementRef = useRef<any>(null);

  const rotateXValue = useRef(new Animated.Value(0)).current;
  const rotateYValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const translateYValue = useRef(new Animated.Value(0)).current;

  const animatedShadowOffsetH = useRef(new Animated.Value(finalConfig.elevation.shadowOffset.height)).current;
  const animatedShadowOpacity = useRef(new Animated.Value(finalConfig.elevation.shadowOpacity)).current;
  const animatedShadowRadius = useRef(new Animated.Value(finalConfig.elevation.shadowRadius)).current;



  useEffect(() => {
    if (finalConfig.respectReducedMotion) {
      setCurrentState((s) => ({ ...s, reducedMotion: prefersReducedMotion() }));
    }
  }, [finalConfig.respectReducedMotion]);

  const getElevationStyle = useCallback((): ViewStyle => {
    let eleStyle: ViewStyle = {};

    let shadowColor = finalConfig.elevation.shadowColor;

    let glowAdd = '';

    if (finalConfig.elevation.enableGlow && finalConfig.elevation.glowColor) {
      glowAdd = `, 0 0 ${(finalConfig.elevation.glowIntensity || 1) * 20}px ${finalConfig.elevation.glowColor}`;
      shadowColor = finalConfig.elevation.glowColor;
    }

    if (finalConfig.layers.length > 0) {
      if (Platform.OS === 'web') {
        let layered = generateLayeredShadow(finalConfig.layers);
        layered += glowAdd;
        eleStyle.boxShadow = layered;
      } else {
        let combined = calculateCombinedShadow(finalConfig.layers);
        combined.shadowColor = shadowColor || combined.shadowColor;
        combined.shadowRadius += (finalConfig.elevation.glowIntensity || 0) * 20;
        if (Platform.OS === 'ios') {
          eleStyle = combined;
        } else if (Platform.OS === 'android') {
          eleStyle.elevation = combined.shadowRadius;
        }
      }
    } else {
      if (Platform.OS === 'web') {
        eleStyle.boxShadow = `0 ${finalConfig.elevation.shadowOffset.height}px ${finalConfig.elevation.shadowRadius}px ${finalConfig.elevation.shadowColor}` + glowAdd;
      } else if (Platform.OS === 'ios') {
        eleStyle.shadowColor = shadowColor;
        eleStyle.shadowOffset = finalConfig.elevation.shadowOffset;
        eleStyle.shadowOpacity = finalConfig.elevation.shadowOpacity;
        eleStyle.shadowRadius = finalConfig.elevation.shadowRadius;
      } else if (Platform.OS === 'android') {
        eleStyle.elevation = finalConfig.elevation.shadowRadius;
      }
    }

    return eleStyle;
  }, [finalConfig]);

  const getPerspectiveStyle = useCallback((): ViewStyle => {
    const p = finalConfig.perspective;

    const rotateXInterpol = rotateXValue.interpolate({
      inputRange: p.rotateX,
      outputRange: p.rotateX.map((r) => `${r}deg`),
    });

    const rotateYInterpol = rotateYValue.interpolate({
      inputRange: p.rotateY,
      outputRange: p.rotateY.map((r) => `${r}deg`),
    });

    const scaleInterpol = scaleValue.interpolate({
      inputRange: p.scaleRange,
      outputRange: p.scaleRange,
    });

    return {
      transform: [
        { perspective: p.perspective },
        { rotateX: rotateXInterpol },
        { rotateY: rotateYInterpol },
        { scale: scaleInterpol },
        { translateY: translateYValue },
      ],
    };
  }, [finalConfig.perspective]);

  const getBlurStyle = useCallback((): ViewStyle => {
    if (finalConfig.enableDepthBlur && Platform.OS === 'web') {
      return { filter: `blur(${finalConfig.blurIntensity * 2}px)` };
    }
    return {};
  }, [finalConfig.enableDepthBlur, finalConfig.blurIntensity]);

  const style: ViewStyle = {
    ...getElevationStyle(),
    ...getPerspectiveStyle(),
    ...getBlurStyle(),
  };

  if (finalConfig.enableGPUAcceleration && Platform.OS === 'web') {
    style.transform = style.transform || [];
    (style.transform as any).push({ translateZ: 0 });
  }

  if (Platform.OS === 'web') {
    (style as any).willChange = 'transform, box-shadow, filter';
    (style as any).transformStyle = 'preserve-3d';
    (style as any).transition = `transform ${finalConfig.perspective.duration}ms ${finalConfig.perspective.easing}, box-shadow ${finalConfig.perspective.duration}ms ${finalConfig.perspective.easing}`;
  }

  const handleMouseEnter = useCallback((e: any) => {
    if (currentState.reducedMotion) return;

    Animated.timing(translateYValue, {
      toValue: -4,
      duration: 200,
      useNativeDriver: true,
    }).start();

    setCurrentState((s) => ({ ...s, isInteracting: true }));
  }, [currentState.reducedMotion]);

  const handleMouseLeave = useCallback((e: any) => {
    if (currentState.reducedMotion) return;

    Animated.parallel([
      Animated.timing(translateYValue, { toValue: 0, duration: 200, useNativeDriver: true }),
      Animated.timing(rotateXValue, { toValue: 0, duration: 200, useNativeDriver: true }),
      Animated.timing(rotateYValue, { toValue: 0, duration: 200, useNativeDriver: true }),
    ]).start();

    setCurrentState((s) => ({ ...s, isInteracting: false }));
  }, [currentState.reducedMotion]);

  const handleMouseDown = useCallback((e: any) => {
    if (currentState.reducedMotion) return;

    Animated.timing(translateYValue, { toValue: 2, duration: 100, useNativeDriver: true }).start();
  }, [currentState.reducedMotion]);

  const handleMouseUp = useCallback((e: any) => {
    if (currentState.reducedMotion) return;

    Animated.timing(translateYValue, { toValue: -4, duration: 100, useNativeDriver: true }).start();
  }, [currentState.reducedMotion]);

  const handleMouseMove = useCallback((e: any) => {
    if (currentState.reducedMotion || !finalConfig.perspective.enableTilt || !elementRef.current) return;

    const rect = elementRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const percentX = (x - centerX) / centerX;
    const percentY = (y - centerY) / centerY;
    const rotY = percentX * finalConfig.perspective.rotateY[1];
    const rotX = -percentY * finalConfig.perspective.rotateX[1]; // invert for natural tilt

    Animated.parallel([
      Animated.timing(rotateXValue, { toValue: rotX, duration: 0, useNativeDriver: true }),
      Animated.timing(rotateYValue, { toValue: rotY, duration: 0, useNativeDriver: true }),
    ]).start();
  }, [currentState.reducedMotion, finalConfig.perspective]);

  const setElevation = useCallback((level: ElevationLevel) => {
    const newLevel = ELEVATION_LEVELS[level];
    finalConfig.elevation = newLevel;

    const duration = currentState.reducedMotion ? 0 : 300;

    Animated.parallel([
      Animated.timing(animatedShadowOffsetH, { toValue: newLevel.shadowOffset.height, duration, useNativeDriver: false }),
      Animated.timing(animatedShadowOpacity, { toValue: newLevel.shadowOpacity, duration, useNativeDriver: false }),
      Animated.timing(animatedShadowRadius, { toValue: newLevel.shadowRadius, duration, useNativeDriver: false }),
    ]).start();

    setCurrentState((s) => ({ ...s, currentElevation: newLevel.shadowRadius }));
  }, [currentState.reducedMotion]);

  const setPerspective = useCallback((rotateX: number, rotateY: number, scale = 1) => {
    const duration = currentState.reducedMotion ? 0 : finalConfig.perspective.duration;

    Animated.parallel([
      Animated.timing(rotateXValue, { toValue: rotateX, duration, useNativeDriver: true }),
      Animated.timing(rotateYValue, { toValue: rotateY, duration, useNativeDriver: true }),
      Animated.timing(scaleValue, { toValue: scale, duration, useNativeDriver: true }),
    ]).start();

    setCurrentState((s) => ({ ...s, currentPerspective: { rotateX, rotateY, scale } }));
  }, [currentState.reducedMotion, finalConfig.perspective.duration]);

  const addLayer = useCallback((layer: DepthLayerConfig) => {
    finalConfig.layers.push(layer);
    setCurrentState((s) => ({ ...s, activeLayers: [...s.activeLayers, layer].sort((a, b) => a.index - b.index) }));
  }, [finalConfig.layers]);

  const removeLayer = useCallback((index: number) => {
    finalConfig.layers = finalConfig.layers.filter((l) => l.index !== index);
    setCurrentState((s) => ({ ...s, activeLayers: s.activeLayers.filter((l) => l.index !== index) }));
  }, [finalConfig.layers]);

  const animateToElevation = useCallback((level: ElevationLevel, duration = 300) => {
    setCurrentState((s) => ({ ...s, isAnimating: true }));
    setElevation(level);
    setTimeout(() => {
      setCurrentState((s) => ({ ...s, isAnimating: false }));
    }, duration);
  }, [setElevation]);

  const reset = useCallback(() => {
    finalConfig.layers = defaultConfig.layers;
    finalConfig.elevation = defaultConfig.elevation;
    finalConfig.perspective = defaultConfig.perspective;
    setCurrentState({
      currentElevation: 0,
      currentPerspective: { rotateX: 0, rotateY: 0, scale: 1 },
      activeLayers: [...defaultConfig.layers],
      isAnimating: false,
      isInteracting: false,
      reducedMotion: currentState.reducedMotion,
    });
    Animated.parallel([
      Animated.timing(rotateXValue, { toValue: 0, duration: 200, useNativeDriver: true }),
      Animated.timing(rotateYValue, { toValue: 0, duration: 200, useNativeDriver: true }),
      Animated.timing(scaleValue, { toValue: 1, duration: 200, useNativeDriver: true }),
      Animated.timing(translateYValue, { toValue: 0, duration: 200, useNativeDriver: true }),
      Animated.timing(animatedShadowOffsetH, { toValue: 0, duration: 200, useNativeDriver: false }),
      Animated.timing(animatedShadowOpacity, { toValue: 0, duration: 200, useNativeDriver: false }),
      Animated.timing(animatedShadowRadius, { toValue: 0, duration: 200, useNativeDriver: false }),
    ]).start();
  }, [currentState.reducedMotion]);

  const getState = useCallback(() => currentState, [currentState]);

  const cleanup = useCallback(() => {
    rotateXValue.stopAnimation();
    rotateYValue.stopAnimation();
    scaleValue.stopAnimation();
    translateYValue.stopAnimation();
    animatedShadowOffsetH.stopAnimation();
    animatedShadowOpacity.stopAnimation();
    animatedShadowRadius.stopAnimation();
  }, []);

  // Dummy for compatibility
  const apply = (element: any) => {};
  const remove = (element: any) => {};

  return {
    style,
    ref: elementRef,
    handlers: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onMouseDown: handleMouseDown,
      onMouseUp: handleMouseUp,
      onMouseMove: handleMouseMove,
    },
    setElevation,
    setPerspective,
    addLayer,
    removeLayer,
    animateToElevation,
    reset,
    getState,
    cleanup,
    apply,
    remove,
  };
};

// ============================================================================
// PRESETS
// ============================================================================

const CARD_ELEVATION_PRESET = {
  name: 'Card Elevation',
  description: 'Standard card elevation with hover effects',
  config: {
    type: 'elevation',
    layers: [
      {
        index: 0,
        offset: 8,
        opacity: 0.3,
        blur: 16,
        scale: 1,
        tint: deepSpaceColors.void as string,
        blendMode: 'normal',
      },
      {
        index: 1,
        offset: 16,
        opacity: 0.2,
        blur: 32,
        scale: 1.01,
        tint: SignatureBlues.primary as string,
        blendMode: 'multiply',
      },
    ],
    elevation: ELEVATION_LEVELS.lg,
    perspective: {
      perspective: 1000,
      rotateX: [-5, 5],
      rotateY: [-5, 5],
      scaleRange: [0.98, 1.02],
      transformOrigin: 'center center',
      duration: 300,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      enableTilt: false,
    },
    enableDepthBlur: false,
    blurIntensity: 0.5,
    accessibilityEnabled: true,
    respectReducedMotion: true,
    enableGPUAcceleration: true,
  },
  useCases: ['Data cards', 'Content cards', 'Interactive cards'],
};

const INTERACTIVE_TILT_PRESET = {
  name: 'Interactive Tilt',
  description: 'Tilt effects with perspective transforms',
  config: {
    type: 'perspective',
    layers: [
      {
        index: 0,
        offset: 4,
        opacity: 0.2,
        blur: 8,
        scale: 1,
        tint: deepSpaceColors.dark as string,
        blendMode: 'normal',
      },
    ],
    elevation: ELEVATION_LEVELS.md,
    perspective: {
      perspective: 1000,
      rotateX: [-15, 15],
      rotateY: [-15, 15],
      scaleRange: [0.98, 1.02],
      transformOrigin: 'center center',
      duration: 200,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      enableTilt: true,
    },
    enableDepthBlur: false,
    blurIntensity: 0.3,
    accessibilityEnabled: true,
    respectReducedMotion: true,
    enableGPUAcceleration: true,
  },
  useCases: ['Interactive elements', 'Hover cards', 'Draggable items'],
};

const GLOW_DEPTH_PRESET = {
  name: 'Glow Depth',
  description: 'Depth effects with glow enhancement',
  config: {
    type: 'shadow',
    layers: [
      {
        index: 0,
        offset: 8,
        opacity: 0.4,
        blur: 20,
        scale: 1,
        tint: SignatureBlues.primary as string,
        blendMode: 'normal',
      },
      {
        index: 1,
        offset: 16,
        opacity: 0.3,
        blur: 40,
        scale: 1.02,
        tint: SignatureBlues.glow as string,
        blendMode: 'soft-light',
      },
    ],
    elevation: {
      ...ELEVATION_LEVELS.lg,
      enableGlow: true,
      glowColor: GLOW_EFFECTS.blue,
      glowIntensity: 1,
    },
    perspective: {
      perspective: 1000,
      rotateX: [-10, 10],
      rotateY: [-10, 10],
      scaleRange: [0.99, 1.01],
      transformOrigin: 'center center',
      duration: 400,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      enableTilt: false,
    },
    enableDepthBlur: false,
    blurIntensity: 0.5,
    accessibilityEnabled: true,
    respectReducedMotion: true,
    enableGPUAcceleration: true,
  },
  useCases: ['Hero elements', 'Call-to-action buttons', 'Featured content'],
};

const PARALLAX_DEPTH_PRESET = {
  name: 'Parallax Depth',
  description: 'Multi-layer parallax depth effects',
  config: {
    type: 'parallax',
    layers: [
      {
        index: 0,
        offset: 2,
        opacity: 0.3,
        blur: 2,
        scale: 0.98,
        tint: deepSpaceColors.void as string,
        blendMode: 'normal',
      },
      {
        index: 1,
        offset: 6,
        opacity: 0.6,
        blur: 1,
        scale: 0.99,
        tint: deepSpaceColors.dark as string,
        blendMode: 'multiply',
      },
      {
        index: 2,
        offset: 12,
        opacity: 1,
        blur: 0,
        scale: 1,
        tint: ProfessionalGrays.text as string,
        blendMode: 'normal',
      },
    ],
    elevation: ELEVATION_LEVELS.md,
    perspective: {
      perspective: 1000,
      rotateX: [-5, 5],
      rotateY: [-5, 5],
      scaleRange: [0.98, 1.02],
      transformOrigin: 'center center',
      duration: 600,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      enableTilt: false,
    },
    enableDepthBlur: true,
    blurIntensity: 0.8,
    accessibilityEnabled: true,
    respectReducedMotion: true,
    enableGPUAcceleration: true,
  },
  useCases: ['Background layers', 'Scrolling sections', 'Depth backgrounds'],
};

// ============================================================================
// PRESET CREATORS
// ============================================================================

const createDepthFromPreset = (
  preset: any,
  overrides: Partial<DepthEffectsConfig> = {}
): DepthEffectsResult => {
  return createDepthEffects({ ...preset.config, ...overrides });
};

const createCardElevation = (
  config: Partial<DepthEffectsConfig> = {}
): DepthEffectsResult => {
  return createDepthFromPreset(CARD_ELEVATION_PRESET, config);
};

const createInteractiveTilt = (
  config: Partial<DepthEffectsConfig> = {}
): DepthEffectsResult => {
  return createDepthFromPreset(INTERACTIVE_TILT_PRESET, config);
};

const createGlowDepth = (
  config: Partial<DepthEffectsConfig> = {}
): DepthEffectsResult => {
  return createDepthFromPreset(GLOW_DEPTH_PRESET, config);
};

const createAccessibleDepth = (
  config: Partial<DepthEffectsConfig> = {}
): DepthEffectsResult => {
  return createDepthEffects({
    type: 'elevation',
    elevation: ELEVATION_LEVELS.sm,
    accessibilityEnabled: true,
    respectReducedMotion: true,
    enableGPUAcceleration: false,
    ...config,
  });
};

// ============================================================================
// EXPORTS
// ============================================================================

export {
  CARD_ELEVATION_PRESET, createAccessibleDepth, createCardElevation, createDepthEffects, createDepthFromPreset, createGlowDepth, createInteractiveTilt, ELEVATION_LEVELS, GLOW_DEPTH_PRESET, GLOW_EFFECTS, INTERACTIVE_TILT_PRESET, PARALLAX_DEPTH_PRESET
};

