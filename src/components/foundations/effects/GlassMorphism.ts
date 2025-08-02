/**
 * Corp Astro UI Library - Glass Morphism Effects
 * 
 * Comprehensive glass morphism effect system providing blur, transparency, and 
 * border effects with mobile performance optimization and visual depth control.
 * Includes preset configurations aligned with Corp Astro's design system.
 * 
 * @module GlassMorphism
 * @version 1.0.0
 * @since 2024
 * 
 * UI Documentation Reference:
 * - Design Tokens: glassMorphism presets (light, medium, strong)
 * - Design System: backdropFilter 'blur(10px)', 'blur(20px)', 'blur(30px)'
 * - Performance: Mobile-optimized blur effects with fallbacks
 * - Visual Depth: Transparency levels and border effects
 */

import { Platform } from 'react-native';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Glass morphism intensity levels
 */
export type GlassMorphismIntensity = 
  | 'light'     // 10px blur, subtle transparency
  | 'medium'    // 20px blur, moderate transparency  
  | 'strong'    // 30px blur, prominent transparency
  | 'subtle'    // 5px blur, minimal transparency
  | 'cosmic';   // 40px blur, maximum transparency

/**
 * Glass morphism preset types
 */
export type GlassMorphismPreset = 
  | 'card'      // Card backgrounds
  | 'modal'     // Modal/overlay backgrounds
  | 'navigation' // Navigation container backgrounds
  | 'header'    // Header backgrounds
  | 'button'    // Button backgrounds
  | 'sidebar'   // Sidebar backgrounds
  | 'floating'  // Floating element backgrounds
  | 'overlay';  // General overlay backgrounds

/**
 * Glass morphism configuration
 */
export interface GlassMorphismConfig {
  /** Background color with alpha transparency */
  backgroundColor: string;
  /** Backdrop filter blur amount */
  backdropFilter: string;
  /** Border color */
  borderColor: string;
  /** Border width */
  borderWidth: number;
  /** Border radius */
  borderRadius?: number;
  /** Shadow for depth */
  shadow?: string;
  /** Performance optimization settings */
  performance?: {
    /** Reduce blur on low-end devices */
    reduceBlurOnLowEnd: boolean;
    /** Fallback background for unsupported devices */
    fallbackBackground: string;
    /** Enable hardware acceleration */
    enableHardwareAcceleration: boolean;
  };
}

/**
 * Glass morphism style result
 */
export interface GlassMorphismStyle {
  /** Background color */
  backgroundColor: string;
  /** Backdrop filter (Web only) */
  backdropFilter?: string;
  /** Border color */
  borderColor: string;
  /** Border width */
  borderWidth: number;
  /** Border radius */
  borderRadius?: number;
  /** Shadow */
  shadowColor?: string;
  shadowOffset?: { width: number; height: number };
  shadowOpacity?: number;
  shadowRadius?: number;
  /** Elevation for Android */
  elevation?: number;
  /** Performance fallback properties */
  opacity?: number;
}

/**
 * Glass morphism animation config
 */
export interface GlassMorphismAnimationConfig {
  /** Animation duration in milliseconds */
  duration: number;
  /** Animation easing function */
  easing: string;
  /** Animation delay */
  delay?: number;
  /** Animation properties to animate */
  properties: ('blur' | 'opacity' | 'scale' | 'glow')[];
}

// ============================================================================
// GLASS MORPHISM INTENSITY PRESETS
// ============================================================================

/**
 * Light glass morphism preset (Design System: light)
 */
const LIGHT_GLASS_PRESET: GlassMorphismConfig = {
  backgroundColor: 'rgba(255, 255, 255, 0.08)',
  backdropFilter: 'blur(10px)',
  borderColor: 'rgba(255, 255, 255, 0.1)',
  borderWidth: 1,
  borderRadius: 16,
  shadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
  performance: {
    reduceBlurOnLowEnd: true,
    fallbackBackground: 'rgba(255, 255, 255, 0.05)',
    enableHardwareAcceleration: true,
  },
};

/**
 * Medium glass morphism preset (Design System: medium)
 */
const MEDIUM_GLASS_PRESET: GlassMorphismConfig = {
  backgroundColor: 'rgba(255, 255, 255, 0.15)',
  backdropFilter: 'blur(20px)',
  borderColor: 'rgba(255, 255, 255, 0.2)',
  borderWidth: 1,
  borderRadius: 20,
  shadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
  performance: {
    reduceBlurOnLowEnd: true,
    fallbackBackground: 'rgba(255, 255, 255, 0.1)',
    enableHardwareAcceleration: true,
  },
};

/**
 * Strong glass morphism preset (Design System: strong)
 */
const STRONG_GLASS_PRESET: GlassMorphismConfig = {
  backgroundColor: 'rgba(255, 255, 255, 0.25)',
  backdropFilter: 'blur(30px)',
  borderColor: 'rgba(255, 255, 255, 0.3)',
  borderWidth: 1,
  borderRadius: 24,
  shadow: '0 12px 48px rgba(0, 0, 0, 0.3)',
  performance: {
    reduceBlurOnLowEnd: true,
    fallbackBackground: 'rgba(255, 255, 255, 0.15)',
    enableHardwareAcceleration: true,
  },
};

/**
 * Subtle glass morphism preset (minimal effect)
 */
const SUBTLE_GLASS_PRESET: GlassMorphismConfig = {
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(5px)',
  borderColor: 'rgba(255, 255, 255, 0.08)',
  borderWidth: 1,
  borderRadius: 12,
  shadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
  performance: {
    reduceBlurOnLowEnd: true,
    fallbackBackground: 'rgba(255, 255, 255, 0.03)',
    enableHardwareAcceleration: true,
  },
};

/**
 * Cosmic glass morphism preset (maximum effect)
 */
const COSMIC_GLASS_PRESET: GlassMorphismConfig = {
  backgroundColor: 'rgba(46, 134, 222, 0.1)',
  backdropFilter: 'blur(40px) saturate(180%)',
  borderColor: 'rgba(116, 185, 255, 0.2)',
  borderWidth: 1,
  borderRadius: 32,
  shadow: '0 20px 80px rgba(46, 134, 222, 0.2)',
  performance: {
    reduceBlurOnLowEnd: true,
    fallbackBackground: 'rgba(46, 134, 222, 0.05)',
    enableHardwareAcceleration: true,
  },
};

// ============================================================================
// COMPONENT-SPECIFIC GLASS PRESETS
// ============================================================================

/**
 * Card glass morphism preset (Design System: DataCard)
 */
const CARD_GLASS_PRESET: GlassMorphismConfig = {
  backgroundColor: 'rgba(22, 33, 62, 0.3)',
  backdropFilter: 'blur(20px)',
  borderColor: 'rgba(46, 134, 222, 0.2)',
  borderWidth: 1,
  borderRadius: 24,
  shadow: '0 16px 48px rgba(46, 134, 222, 0.2)',
  performance: {
    reduceBlurOnLowEnd: true,
    fallbackBackground: 'rgba(22, 33, 62, 0.2)',
    enableHardwareAcceleration: true,
  },
};

/**
 * Modal glass morphism preset (Design System: Modal)
 */
const MODAL_GLASS_PRESET: GlassMorphismConfig = {
  backgroundColor: 'rgba(8, 8, 15, 0.8)',
  backdropFilter: 'blur(10px)',
  borderColor: 'rgba(46, 134, 222, 0.3)',
  borderWidth: 1,
  borderRadius: 32,
  shadow: '0 30px 90px rgba(0, 0, 0, 0.9)',
  performance: {
    reduceBlurOnLowEnd: true,
    fallbackBackground: 'rgba(8, 8, 15, 0.9)',
    enableHardwareAcceleration: true,
  },
};

/**
 * Navigation glass morphism preset (Design System: bottomNav)
 */
const NAVIGATION_GLASS_PRESET: GlassMorphismConfig = {
  backgroundColor: 'rgba(22, 33, 62, 0.3)',
  backdropFilter: 'blur(20px)',
  borderColor: 'rgba(46, 134, 222, 0.2)',
  borderWidth: 1,
  borderRadius: 35,
  shadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
  performance: {
    reduceBlurOnLowEnd: true,
    fallbackBackground: 'rgba(22, 33, 62, 0.4)',
    enableHardwareAcceleration: true,
  },
};

/**
 * Header glass morphism preset (Design System: PrimaryHeader)
 */
const HEADER_GLASS_PRESET: GlassMorphismConfig = {
  backgroundColor: 'rgba(8, 8, 15, 0.8)',
  backdropFilter: 'blur(30px) saturate(180%)',
  borderColor: 'rgba(46, 134, 222, 0.1)',
  borderWidth: 0,
  borderRadius: 0,
  shadow: '0 2px 20px rgba(0, 0, 0, 0.2)',
  performance: {
    reduceBlurOnLowEnd: true,
    fallbackBackground: 'rgba(8, 8, 15, 0.9)',
    enableHardwareAcceleration: true,
  },
};

/**
 * Button glass morphism preset (Design System: ButtonSecondary)
 */
const BUTTON_GLASS_PRESET: GlassMorphismConfig = {
  backgroundColor: 'rgba(46, 134, 222, 0.1)',
  backdropFilter: 'blur(10px)',
  borderColor: 'rgba(46, 134, 222, 0.3)',
  borderWidth: 1,
  borderRadius: 16,
  shadow: '0 4px 16px rgba(46, 134, 222, 0.2)',
  performance: {
    reduceBlurOnLowEnd: true,
    fallbackBackground: 'rgba(46, 134, 222, 0.08)',
    enableHardwareAcceleration: true,
  },
};

/**
 * Sidebar glass morphism preset
 */
const SIDEBAR_GLASS_PRESET: GlassMorphismConfig = {
  backgroundColor: 'rgba(15, 15, 26, 0.95)',
  backdropFilter: 'blur(30px)',
  borderColor: 'rgba(46, 134, 222, 0.2)',
  borderWidth: 1,
  borderRadius: 0,
  shadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
  performance: {
    reduceBlurOnLowEnd: true,
    fallbackBackground: 'rgba(15, 15, 26, 0.98)',
    enableHardwareAcceleration: true,
  },
};

/**
 * Floating element glass morphism preset
 */
const FLOATING_GLASS_PRESET: GlassMorphismConfig = {
  backgroundColor: 'rgba(22, 33, 62, 0.2)',
  backdropFilter: 'blur(15px)',
  borderColor: 'rgba(46, 134, 222, 0.3)',
  borderWidth: 1,
  borderRadius: 20,
  shadow: '0 8px 32px rgba(46, 134, 222, 0.3)',
  performance: {
    reduceBlurOnLowEnd: true,
    fallbackBackground: 'rgba(22, 33, 62, 0.3)',
    enableHardwareAcceleration: true,
  },
};

/**
 * Overlay glass morphism preset (Design System: tooltip, popover)
 */
const OVERLAY_GLASS_PRESET: GlassMorphismConfig = {
  backgroundColor: 'rgba(15, 15, 26, 0.95)',
  backdropFilter: 'blur(20px)',
  borderColor: 'rgba(46, 134, 222, 0.3)',
  borderWidth: 1,
  borderRadius: 12,
  shadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
  performance: {
    reduceBlurOnLowEnd: true,
    fallbackBackground: 'rgba(15, 15, 26, 0.98)',
    enableHardwareAcceleration: true,
  },
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get glass morphism preset configuration
 */
const getGlassMorphismPreset = (
  intensity: GlassMorphismIntensity
): GlassMorphismConfig => {
  switch (intensity) {
    case 'light':
      return LIGHT_GLASS_PRESET;
    case 'medium':
      return MEDIUM_GLASS_PRESET;
    case 'strong':
      return STRONG_GLASS_PRESET;
    case 'subtle':
      return SUBTLE_GLASS_PRESET;
    case 'cosmic':
      return COSMIC_GLASS_PRESET;
    default:
      return MEDIUM_GLASS_PRESET;
  }
};

/**
 * Get component-specific glass morphism preset
 */
const getComponentGlassPreset = (
  preset: GlassMorphismPreset
): GlassMorphismConfig => {
  switch (preset) {
    case 'card':
      return CARD_GLASS_PRESET;
    case 'modal':
      return MODAL_GLASS_PRESET;
    case 'navigation':
      return NAVIGATION_GLASS_PRESET;
    case 'header':
      return HEADER_GLASS_PRESET;
    case 'button':
      return BUTTON_GLASS_PRESET;
    case 'sidebar':
      return SIDEBAR_GLASS_PRESET;
    case 'floating':
      return FLOATING_GLASS_PRESET;
    case 'overlay':
      return OVERLAY_GLASS_PRESET;
    default:
      return CARD_GLASS_PRESET;
  }
};

/**
 * Check if device supports backdrop filter
 */
const supportsBackdropFilter = (): boolean => {
  // Web platform supports backdrop filter
  if (Platform.OS === 'web') {
    return true;
  }
  
  // React Native doesn't support backdrop filter natively
  // Use fallback styling for mobile
  return false;
};

/**
 * Get optimized blur value for device performance
 */
const getOptimizedBlurValue = (originalBlur: string): string => {
  if (!supportsBackdropFilter()) {
    return 'none';
  }
  
  // Extract blur amount from backdrop filter
  const blurMatch = originalBlur.match(/blur\((\d+)px\)/);
  if (!blurMatch) {
    return originalBlur;
  }
  
  const blurAmount = parseInt(blurMatch[1], 10);
  
  // Reduce blur on low-end devices (mock detection)
  // In real implementation, you'd check device performance
  const isLowEndDevice = false; // Replace with actual device detection
  
  if (isLowEndDevice) {
    const reducedBlur = Math.max(5, blurAmount * 0.5);
    return originalBlur.replace(/blur\(\d+px\)/, `blur(${reducedBlur}px)`);
  }
  
  return originalBlur;
};

/**
 * Create glass morphism style object
 */
const createGlassMorphismStyle = (
  config: GlassMorphismConfig
): GlassMorphismStyle => {
  const optimizedBlur = getOptimizedBlurValue(config.backdropFilter);
  const supportsBlur = supportsBackdropFilter();
  
  const style: GlassMorphismStyle = {
    backgroundColor: supportsBlur 
      ? config.backgroundColor 
      : (config.performance?.fallbackBackground || config.backgroundColor),
    borderColor: config.borderColor,
    borderWidth: config.borderWidth,
  };
  
  // Add backdrop filter for web
  if (supportsBlur && Platform.OS === 'web') {
    style.backdropFilter = optimizedBlur;
  }
  
  // Add border radius if specified
  if (config.borderRadius !== undefined) {
    style.borderRadius = config.borderRadius;
  }
  
  // Add shadow for depth
  if (config.shadow && Platform.OS === 'web') {
    // Parse shadow string for web
    style.shadowColor = 'rgba(0, 0, 0, 0.3)';
  } else if (config.shadow) {
    // Convert to React Native shadow properties
    style.shadowColor = 'rgba(0, 0, 0, 0.3)';
    style.shadowOffset = { width: 0, height: 4 };
    style.shadowOpacity = 0.3;
    style.shadowRadius = 8;
    style.elevation = 8; // Android elevation
  }
  
  return style;
};

/**
 * Create custom glass morphism configuration
 */
const createCustomGlassMorphism = (
  backgroundColor: string,
  blurAmount: number,
  borderColor: string,
  borderWidth: number = 1,
  borderRadius: number = 16
): GlassMorphismConfig => {
  return {
    backgroundColor,
    backdropFilter: `blur(${blurAmount}px)`,
    borderColor,
    borderWidth,
    borderRadius,
    shadow: `0 ${blurAmount / 2}px ${blurAmount * 2}px rgba(0, 0, 0, 0.2)`,
    performance: {
      reduceBlurOnLowEnd: true,
      fallbackBackground: backgroundColor,
      enableHardwareAcceleration: true,
    },
  };
};

/**
 * Create animated glass morphism configuration
 */
const createAnimatedGlassMorphism = (
  baseConfig: GlassMorphismConfig,
  animationConfig: GlassMorphismAnimationConfig
): GlassMorphismConfig & { animation: GlassMorphismAnimationConfig } => {
  return {
    ...baseConfig,
    animation: animationConfig,
  };
};

// ============================================================================
// MOBILE PERFORMANCE OPTIMIZATIONS
// ============================================================================

/**
 * Mobile-optimized glass morphism style
 */
const createMobileOptimizedGlass = (
  config: GlassMorphismConfig,
  highPerformance: boolean = false
): GlassMorphismStyle => {
  const style = createGlassMorphismStyle(config);
  
  // Apply mobile optimizations
  if (Platform.OS !== 'web') {
    // Remove backdrop filter for mobile
    delete style.backdropFilter;
    
    // Increase background opacity for better visibility
    const alphaMatch = config.backgroundColor.match(/rgba\(([^)]+)\)/);
    if (alphaMatch) {
      const [r, g, b, a] = alphaMatch[1].split(',').map(n => parseFloat(n.trim()));
      const increasedAlpha = Math.min(1, (a || 0.1) * 1.5);
      style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${increasedAlpha})`;
    }
    
    // Reduce shadow for performance
    if (highPerformance) {
      style.shadowOpacity = (style.shadowOpacity || 0.3) * 0.5;
      style.shadowRadius = (style.shadowRadius || 8) * 0.5;
      style.elevation = (style.elevation || 8) * 0.5;
    }
  }
  
  return style;
};

/**
 * Create glass morphism with accessibility support
 */
const createAccessibleGlassMorphism = (
  config: GlassMorphismConfig,
  highContrast: boolean = false
): GlassMorphismStyle => {
  const style = createGlassMorphismStyle(config);
  
  // Apply accessibility improvements
  if (highContrast) {
    // Increase background opacity for better contrast
    const alphaMatch = config.backgroundColor.match(/rgba\(([^)]+)\)/);
    if (alphaMatch) {
      const [r, g, b] = alphaMatch[1].split(',').map(n => parseFloat(n.trim()));
      style.backgroundColor = `rgba(${r}, ${g}, ${b}, 0.8)`;
    }
    
    // Increase border visibility
    style.borderWidth = Math.max(2, config.borderWidth);
    
    // Remove backdrop filter for better readability
    delete style.backdropFilter;
  }
  
  return style;
};

// ============================================================================
// VISUAL DEPTH UTILITIES
// ============================================================================

/**
 * Create layered glass morphism effect
 */
const createLayeredGlassMorphism = (
  layers: number = 3,
  baseIntensity: GlassMorphismIntensity = 'medium'
): GlassMorphismConfig[] => {
  const baseConfig = getGlassMorphismPreset(baseIntensity);
  const layeredConfigs: GlassMorphismConfig[] = [];
  
  for (let i = 0; i < layers; i++) {
    const layerIntensity = 1 - (i / layers);
    const blurAmount = parseInt(baseConfig.backdropFilter.match(/blur\((\d+)px\)/)?.[1] || '20', 10);
    const layerBlur = Math.max(5, blurAmount * layerIntensity);
    
    // Parse background color alpha
    const alphaMatch = baseConfig.backgroundColor.match(/rgba\(([^)]+)\)/);
    let layerBackground = baseConfig.backgroundColor;
    
    if (alphaMatch) {
      const [r, g, b, a] = alphaMatch[1].split(',').map(n => parseFloat(n.trim()));
      const layerAlpha = (a || 0.15) * layerIntensity;
      layerBackground = `rgba(${r}, ${g}, ${b}, ${layerAlpha})`;
    }
    
    layeredConfigs.push({
      ...baseConfig,
      backgroundColor: layerBackground,
      backdropFilter: `blur(${layerBlur}px)`,
      borderColor: baseConfig.borderColor,
      borderWidth: baseConfig.borderWidth * layerIntensity,
    });
  }
  
  return layeredConfigs;
};

/**
 * Create glass morphism with depth gradient
 */
const createDepthGradientGlass = (
  config: GlassMorphismConfig,
  depth: number = 0.5
): GlassMorphismConfig => {
  const clampedDepth = Math.max(0, Math.min(1, depth));
  
  // Create gradient background for depth effect
  const gradientBackground = `linear-gradient(135deg, ${config.backgroundColor} 0%, rgba(0, 0, 0, ${0.1 * clampedDepth}) 100%)`;
  
  return {
    ...config,
    backgroundColor: gradientBackground,
    shadow: `0 ${8 * clampedDepth}px ${32 * clampedDepth}px rgba(0, 0, 0, ${0.3 * clampedDepth})`,
  };
};

// ============================================================================
// EXPORTS
// ============================================================================

export {
  // Preset configurations
  LIGHT_GLASS_PRESET,
  MEDIUM_GLASS_PRESET,
  STRONG_GLASS_PRESET,
  SUBTLE_GLASS_PRESET,
  COSMIC_GLASS_PRESET,
  
  // Component-specific presets
  CARD_GLASS_PRESET,
  MODAL_GLASS_PRESET,
  NAVIGATION_GLASS_PRESET,
  HEADER_GLASS_PRESET,
  BUTTON_GLASS_PRESET,
  SIDEBAR_GLASS_PRESET,
  FLOATING_GLASS_PRESET,
  OVERLAY_GLASS_PRESET,
  
  // Utility functions
  getGlassMorphismPreset,
  getComponentGlassPreset,
  supportsBackdropFilter,
  getOptimizedBlurValue,
  createGlassMorphismStyle,
  createCustomGlassMorphism,
  createAnimatedGlassMorphism,
  
  // Mobile optimizations
  createMobileOptimizedGlass,
  createAccessibleGlassMorphism,
  
  // Visual depth utilities
  createLayeredGlassMorphism,
  createDepthGradientGlass,
};
