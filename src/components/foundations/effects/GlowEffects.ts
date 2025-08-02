/**
 * Glow Effects System
 * 
 * Comprehensive glow effect system for Corp Astro UI components featuring pulse animations,
 * hover effects, static glows, and color harmony with the signature brand palette.
 * 
 * Features:
 * - Pulse glow with scale and opacity animation
 * - Hover glow with spread and intensity control
 * - Static glow with blur and spread effects
 * - Color harmony with signature blues, royal purples, and luxury golds
 * - Accessibility support with reduced motion
 * - Performance optimizations for smooth animations
 * 
 * Design System Compliance:
 * - Pulse: keyframes: '0%': opacity: 0.5, scale: 1, '50%': opacity: 1, scale: 1.05, '100%': opacity: 0.5, scale: 1
 * - Duration: '3s', timing: 'ease-in-out', iterations: 'infinite'
 * - Hover: spread: 40, intensity: 0.6, color: 'currentColor'
 * - Static: blur: 20, spread: 10, opacity: 0.5
 * 
 * @fileoverview Glow Effects system implementing Corp Astro's luminous design language
 * @author Corp Astro Design System
 * @version 1.0.0
 */

import { Animated, ViewStyle, ColorValue } from 'react-native';
import { SignatureBlues } from '../tokens/colors/SignatureBlues';
import { RoyalPurples } from '../tokens/colors/RoyalPurples';
import { LuxuryGolds } from '../tokens/colors/LuxuryGolds';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * Glow effect types
 */
export type GlowType = 'pulse' | 'hover' | 'static' | 'subtle';

/**
 * Color harmony themes
 */
export type ColorHarmonyTheme = 'signature' | 'mystic' | 'luxury' | 'cosmic';

/**
 * Pulse animation configuration
 */
export interface PulseGlowConfig {
  /** Base opacity (0-1) */
  opacity: number;
  /** Maximum scale factor */
  scale: number;
  /** Animation duration in milliseconds */
  duration: number;
  /** Timing function */
  timing: 'ease-in-out' | 'ease-in' | 'ease-out' | 'linear';
  /** Number of iterations (-1 for infinite) */
  iterations: number;
  /** Glow color */
  color: string;
  /** Glow blur radius */
  blur: number;
  /** Glow spread */
  spread: number;
}

/**
 * Hover glow configuration
 */
export interface HoverGlowConfig {
  /** Glow spread in pixels */
  spread: number;
  /** Glow intensity (0-1) */
  intensity: number;
  /** Glow color */
  color: string;
  /** Blur radius */
  blur: number;
  /** Transition duration */
  duration: number;
  /** Timing function */
  timing: string;
}

/**
 * Static glow configuration
 */
export interface StaticGlowConfig {
  /** Blur radius */
  blur: number;
  /** Glow spread */
  spread: number;
  /** Glow opacity */
  opacity: number;
  /** Glow color */
  color: string;
}

/**
 * Glow effect result
 */
export interface GlowEffectResult {
  /** Animated style for the component */
  style: ViewStyle;
  /** Animation controls */
  animation?: {
    start: () => void;
    stop: () => void;
    reset: () => void;
  };
  /** Glow configuration */
  config: PulseGlowConfig | HoverGlowConfig | StaticGlowConfig;
}

/**
 * Color harmony palette
 */
export interface ColorHarmonyPalette {
  /** Primary glow color */
  primary: string;
  /** Secondary glow color */
  secondary: string;
  /** Accent glow color */
  accent: string;
  /** Glow variant */
  glow: string;
}

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Default pulse glow configuration
 */
const DEFAULT_PULSE_GLOW: PulseGlowConfig = {
  opacity: 0.5,
  scale: 1.05,
  duration: 3000,
  timing: 'ease-in-out',
  iterations: -1,
  color: SignatureBlues.glow as string,
  blur: 20,
  spread: 10,
};

/**
 * Default hover glow configuration
 */
const DEFAULT_HOVER_GLOW: HoverGlowConfig = {
  spread: 40,
  intensity: 0.6,
  color: 'currentColor',
  blur: 20,
  duration: 300,
  timing: 'cubic-bezier(0.4, 0, 0.2, 1)',
};

/**
 * Default static glow configuration
 */
const DEFAULT_STATIC_GLOW: StaticGlowConfig = {
  blur: 20,
  spread: 10,
  opacity: 0.5,
  color: SignatureBlues.glow as string,
};

// ============================================================================
// COLOR HARMONY SYSTEM
// ============================================================================

/**
 * Color harmony palettes for different themes
 */
const COLOR_HARMONY_PALETTES: Record<ColorHarmonyTheme, ColorHarmonyPalette> = {
  signature: {
    primary: SignatureBlues.primary as string,
    secondary: SignatureBlues.light as string,
    accent: SignatureBlues.accent as string,
    glow: SignatureBlues.glow as string,
  },
  mystic: {
    primary: RoyalPurples.royal as string,
    secondary: RoyalPurples.light as string,
    accent: RoyalPurples.deep as string,
    glow: RoyalPurples.glow as string,
  },
  luxury: {
    primary: LuxuryGolds.pure as string,
    secondary: LuxuryGolds.champagne as string,
    accent: LuxuryGolds.bronze as string,
    glow: LuxuryGolds.shimmer as string,
  },
  cosmic: {
    primary: SignatureBlues.primary as string,
    secondary: RoyalPurples.royal as string,
    accent: LuxuryGolds.pure as string,
    glow: SignatureBlues.glow as string,
  },
};

/**
 * Get color harmony palette for theme
 */
const getColorHarmonyPalette = (theme: ColorHarmonyTheme): ColorHarmonyPalette => {
  return COLOR_HARMONY_PALETTES[theme];
};

// ============================================================================
// GLOW EFFECT PRESETS
// ============================================================================

/**
 * Signature blue glow presets
 */
const SIGNATURE_BLUE_GLOWS = {
  pulse: {
    ...DEFAULT_PULSE_GLOW,
    color: SignatureBlues.glow as string,
  },
  hover: {
    ...DEFAULT_HOVER_GLOW,
    color: SignatureBlues.glow as string,
  },
  static: {
    ...DEFAULT_STATIC_GLOW,
    color: SignatureBlues.glow as string,
  },
  subtle: {
    ...DEFAULT_STATIC_GLOW,
    color: SignatureBlues.glow as string,
    opacity: 0.3,
    blur: 15,
    spread: 5,
  },
};

/**
 * Royal purple glow presets
 */
const ROYAL_PURPLE_GLOWS = {
  pulse: {
    ...DEFAULT_PULSE_GLOW,
    color: RoyalPurples.glow as string,
  },
  hover: {
    ...DEFAULT_HOVER_GLOW,
    color: RoyalPurples.glow as string,
  },
  static: {
    ...DEFAULT_STATIC_GLOW,
    color: RoyalPurples.glow as string,
  },
  subtle: {
    ...DEFAULT_STATIC_GLOW,
    color: RoyalPurples.glow as string,
    opacity: 0.3,
    blur: 15,
    spread: 5,
  },
};

/**
 * Luxury gold glow presets
 */
const LUXURY_GOLD_GLOWS = {
  pulse: {
    ...DEFAULT_PULSE_GLOW,
    color: LuxuryGolds.shimmer as string,
  },
  hover: {
    ...DEFAULT_HOVER_GLOW,
    color: LuxuryGolds.shimmer as string,
  },
  static: {
    ...DEFAULT_STATIC_GLOW,
    color: LuxuryGolds.shimmer as string,
  },
  subtle: {
    ...DEFAULT_STATIC_GLOW,
    color: LuxuryGolds.shimmer as string,
    opacity: 0.3,
    blur: 15,
    spread: 5,
  },
};

/**
 * Cosmic harmony glow presets
 */
const COSMIC_HARMONY_GLOWS = {
  pulse: {
    ...DEFAULT_PULSE_GLOW,
    color: SignatureBlues.glow as string,
  },
  hover: {
    ...DEFAULT_HOVER_GLOW,
    color: RoyalPurples.glow as string,
  },
  static: {
    ...DEFAULT_STATIC_GLOW,
    color: LuxuryGolds.shimmer as string,
  },
  subtle: {
    ...DEFAULT_STATIC_GLOW,
    color: SignatureBlues.glow as string,
    opacity: 0.2,
    blur: 12,
    spread: 3,
  },
};

// ============================================================================
// GLOW EFFECT GENERATORS
// ============================================================================

/**
 * Create pulse glow effect
 */
const createPulseGlow = (
  config: Partial<PulseGlowConfig> = {}
): GlowEffectResult => {
  const finalConfig = { ...DEFAULT_PULSE_GLOW, ...config };
  
  // Create animated values
  const opacity = new Animated.Value(finalConfig.opacity);
  const scale = new Animated.Value(1);
  
  // Create animation sequence
  const createAnimation = () => {
    return Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: finalConfig.duration / 2,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: finalConfig.scale,
        duration: finalConfig.duration / 2,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: finalConfig.opacity,
        duration: finalConfig.duration / 2,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: finalConfig.duration / 2,
        useNativeDriver: true,
      }),
    ]);
  };
  
  // Create looped animation
  const animation = finalConfig.iterations === -1 
    ? Animated.loop(createAnimation())
    : Animated.loop(createAnimation(), { iterations: finalConfig.iterations });
  
  return {
    style: {
      opacity,
      transform: [{ scale }],
      shadowColor: finalConfig.color,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: finalConfig.opacity,
      shadowRadius: finalConfig.blur,
      elevation: 0,
    },
    animation: {
      start: () => animation.start(),
      stop: () => animation.stop(),
      reset: () => {
        opacity.setValue(finalConfig.opacity);
        scale.setValue(1);
      },
    },
    config: finalConfig,
  };
};

/**
 * Create hover glow effect
 */
const createHoverGlow = (
  config: Partial<HoverGlowConfig> = {}
): GlowEffectResult => {
  const finalConfig = { ...DEFAULT_HOVER_GLOW, ...config };
  
  // Create animated values
  const glowIntensity = new Animated.Value(0);
  const glowSpread = new Animated.Value(finalConfig.spread * 0.5);
  
  // Create hover animation
  const animateIn = () => {
    Animated.parallel([
      Animated.timing(glowIntensity, {
        toValue: finalConfig.intensity,
        duration: finalConfig.duration,
        useNativeDriver: false,
      }),
      Animated.timing(glowSpread, {
        toValue: finalConfig.spread,
        duration: finalConfig.duration,
        useNativeDriver: false,
      }),
    ]).start();
  };
  
  const animateOut = () => {
    Animated.parallel([
      Animated.timing(glowIntensity, {
        toValue: 0,
        duration: finalConfig.duration,
        useNativeDriver: false,
      }),
      Animated.timing(glowSpread, {
        toValue: finalConfig.spread * 0.5,
        duration: finalConfig.duration,
        useNativeDriver: false,
      }),
    ]).start();
  };
  
  return {
    style: {
      shadowColor: finalConfig.color,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: glowIntensity,
      shadowRadius: finalConfig.blur,
      elevation: 0,
    },
    animation: {
      start: animateIn,
      stop: animateOut,
      reset: () => {
        glowIntensity.setValue(0);
        glowSpread.setValue(finalConfig.spread * 0.5);
      },
    },
    config: finalConfig,
  };
};

/**
 * Create static glow effect
 */
const createStaticGlow = (
  config: Partial<StaticGlowConfig> = {}
): GlowEffectResult => {
  const finalConfig = { ...DEFAULT_STATIC_GLOW, ...config };
  
  return {
    style: {
      shadowColor: finalConfig.color,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: finalConfig.opacity,
      shadowRadius: finalConfig.blur,
      elevation: 0,
    },
    config: finalConfig,
  };
};

/**
 * Create subtle glow effect
 */
const createSubtleGlow = (
  config: Partial<StaticGlowConfig> = {}
): GlowEffectResult => {
  const finalConfig = {
    ...DEFAULT_STATIC_GLOW,
    opacity: 0.3,
    blur: 15,
    spread: 5,
    ...config,
  };
  
  return createStaticGlow(finalConfig);
};

// ============================================================================
// GLOW EFFECT UTILITIES
// ============================================================================

/**
 * Create glow effect by type
 */
const createGlowEffect = (
  type: GlowType,
  config: Partial<PulseGlowConfig | HoverGlowConfig | StaticGlowConfig> = {}
): GlowEffectResult => {
  switch (type) {
    case 'pulse':
      return createPulseGlow(config as Partial<PulseGlowConfig>);
    case 'hover':
      return createHoverGlow(config as Partial<HoverGlowConfig>);
    case 'static':
      return createStaticGlow(config as Partial<StaticGlowConfig>);
    case 'subtle':
      return createSubtleGlow(config as Partial<StaticGlowConfig>);
    default:
      return createStaticGlow(config as Partial<StaticGlowConfig>);
  }
};

/**
 * Create themed glow effect
 */
const createThemedGlow = (
  type: GlowType,
  theme: ColorHarmonyTheme,
  config: Partial<PulseGlowConfig | HoverGlowConfig | StaticGlowConfig> = {}
): GlowEffectResult => {
  const palette = getColorHarmonyPalette(theme);
  
  const themedConfig = {
    ...config,
    color: palette.glow,
  };
  
  return createGlowEffect(type, themedConfig);
};

/**
 * Create combined glow effects
 */
const createCombinedGlow = (
  effects: Array<{
    type: GlowType;
    config?: Partial<PulseGlowConfig | HoverGlowConfig | StaticGlowConfig>;
  }>
): GlowEffectResult[] => {
  return effects.map(effect => createGlowEffect(effect.type, effect.config));
};

/**
 * Create responsive glow intensity
 */
const createResponsiveGlowIntensity = (
  baseIntensity: number,
  screenSize: 'small' | 'medium' | 'large' = 'medium'
): number => {
  const intensityMultipliers = {
    small: 0.8,
    medium: 1.0,
    large: 1.2,
  };
  
  return Math.max(0, Math.min(1, baseIntensity * intensityMultipliers[screenSize]));
};

/**
 * Create accessibility-compliant glow
 */
const createAccessibleGlow = (
  type: GlowType,
  config: Partial<PulseGlowConfig | HoverGlowConfig | StaticGlowConfig> = {},
  reducedMotion: boolean = false
): GlowEffectResult => {
  if (reducedMotion && type === 'pulse') {
    // Convert pulse to static for reduced motion
    return createStaticGlow(config as Partial<StaticGlowConfig>);
  }
  
  return createGlowEffect(type, config);
};

// ============================================================================
// COMPONENT-SPECIFIC PRESETS
// ============================================================================

/**
 * Button glow presets
 */
const BUTTON_GLOW_PRESETS = {
  primary: createThemedGlow('hover', 'signature'),
  secondary: createThemedGlow('subtle', 'signature'),
  premium: createThemedGlow('pulse', 'luxury'),
  mystical: createThemedGlow('hover', 'mystic'),
};

/**
 * Card glow presets
 */
const CARD_GLOW_PRESETS = {
  default: createThemedGlow('subtle', 'signature'),
  featured: createThemedGlow('static', 'signature'),
  premium: createThemedGlow('pulse', 'luxury'),
  mystical: createThemedGlow('static', 'mystic'),
};

/**
 * Icon glow presets
 */
const ICON_GLOW_PRESETS = {
  active: createThemedGlow('static', 'signature'),
  notification: createThemedGlow('pulse', 'signature'),
  premium: createThemedGlow('pulse', 'luxury'),
  mystical: createThemedGlow('pulse', 'mystic'),
};

/**
 * Text glow presets
 */
const TEXT_GLOW_PRESETS = {
  heading: createThemedGlow('subtle', 'signature'),
  link: createThemedGlow('hover', 'signature'),
  premium: createThemedGlow('subtle', 'luxury'),
  mystical: createThemedGlow('subtle', 'mystic'),
};

// ============================================================================
// PERFORMANCE OPTIMIZATIONS
// ============================================================================

/**
 * Optimize glow for performance
 */
const optimizeGlowForPerformance = (
  glowResult: GlowEffectResult,
  performanceLevel: 'low' | 'medium' | 'high' = 'medium'
): GlowEffectResult => {
  const { style, animation, config } = glowResult;
  
  const optimizationSettings = {
    low: {
      shadowRadius: Math.min(10, (style.shadowRadius as number) || 10),
      elevation: 0,
    },
    medium: {
      shadowRadius: Math.min(20, (style.shadowRadius as number) || 20),
      elevation: 0,
    },
    high: {
      shadowRadius: (style.shadowRadius as number) || 20,
      elevation: 0,
    },
  };
  
  return {
    style: {
      ...style,
      ...optimizationSettings[performanceLevel],
    },
    animation,
    config,
  };
};

/**
 * Batch glow animations for performance
 */
const batchGlowAnimations = (
  glows: GlowEffectResult[],
  staggerDelay: number = 100
): void => {
  glows.forEach((glow, index) => {
    if (glow.animation) {
      setTimeout(() => {
        glow.animation?.start();
      }, index * staggerDelay);
    }
  });
};

// ============================================================================
// EXPORTS
// ============================================================================

export {
  // Main glow creators
  createPulseGlow,
  createHoverGlow,
  createStaticGlow,
  createSubtleGlow,
  
  // Utility functions
  createGlowEffect,
  createThemedGlow,
  createCombinedGlow,
  createResponsiveGlowIntensity,
  createAccessibleGlow,
  
  // Color harmony
  getColorHarmonyPalette,
  
  // Presets
  SIGNATURE_BLUE_GLOWS,
  ROYAL_PURPLE_GLOWS,
  LUXURY_GOLD_GLOWS,
  COSMIC_HARMONY_GLOWS,
  
  // Component presets
  BUTTON_GLOW_PRESETS,
  CARD_GLOW_PRESETS,
  ICON_GLOW_PRESETS,
  TEXT_GLOW_PRESETS,
  
  // Performance utilities
  optimizeGlowForPerformance,
  batchGlowAnimations,
  
  // Default configurations
  DEFAULT_PULSE_GLOW,
  DEFAULT_HOVER_GLOW,
  DEFAULT_STATIC_GLOW,
  
  // Color harmony palettes
  COLOR_HARMONY_PALETTES,
};
