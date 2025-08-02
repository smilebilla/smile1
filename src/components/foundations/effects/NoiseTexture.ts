/**
 * Corp Astro UI Library - Noise Texture System
 * 
 * Comprehensive noise texture overlay system for adding depth and premium feel to UI elements.
 * Provides procedural noise generation with configurable opacity and patterns,
 * perfectly aligned with Corp Astro's premium visual depth philosophy.
 * 
 * @module NoiseTexture
 * @version 1.0.0
 * @since 2024
 * 
 * UI Documentation Reference:
 * - Visual Language: "Noise: 3-5% opacity for depth"
 * - Design System: "Add noise texture overlay at 5% opacity for depth"
 * - Hero Card: noise: 'url(noise.png) 5% opacity'
 * - Allowed Textures: Noise 3-5% opacity for depth, subtle, purposeful
 * 
 * Features:
 * - Procedural noise generation
 * - Configurable opacity (3-5% range)
 * - Multiple noise patterns
 * - Performance optimized canvas rendering
 * - Accessibility support
 * - Memory efficient caching
 */

import { ColorValue } from 'react-native';
import { deepSpaceColors } from '../tokens/colors/DeepSpaceColors';
import { ProfessionalGrays } from '../tokens/colors/ProfessionalGrays';

/**
 * Noise texture types
 */
export type NoiseType = 'perlin' | 'white' | 'brownian' | 'cellular' | 'simplex' | 'fbm';

/**
 * Noise texture patterns
 */
export type NoisePattern = 'fine' | 'medium' | 'coarse' | 'ultra-fine' | 'custom';

/**
 * Noise opacity levels (Design System: 3-5% opacity)
 */
export type NoiseOpacity = 3 | 4 | 5 | 'custom';

/**
 * Noise texture blending modes
 */
export type NoiseBlendMode = 'multiply' | 'overlay' | 'soft-light' | 'hard-light' | 'color-burn' | 'normal';

/**
 * Noise texture configuration
 */
export interface NoiseTextureConfig {
  /** Noise type */
  type: NoiseType;
  /** Noise pattern scale */
  pattern: NoisePattern;
  /** Noise opacity percentage (3-5% per Design System) */
  opacity: NoiseOpacity | number;
  /** Noise density (0-1) */
  density: number;
  /** Noise color tint */
  tint: string;
  /** Blending mode */
  blendMode: NoiseBlendMode;
  /** Texture dimensions */
  dimensions: {
    width: number;
    height: number;
  };
  /** Enable caching */
  caching: boolean;
  /** Enable accessibility features */
  accessibilityEnabled: boolean;
  /** Respect reduced motion preference */
  respectReducedMotion: boolean;
}

/**
 * Noise texture state
 */
export interface NoiseTextureState {
  /** Canvas element */
  canvas: HTMLCanvasElement | null;
  /** Rendering context */
  context: CanvasRenderingContext2D | null;
  /** Generated texture data */
  textureData: ImageData | null;
  /** Cached texture URL */
  textureUrl: string | null;
  /** Rendering status */
  isRendering: boolean;
  /** Cache key */
  cacheKey: string;
}

/**
 * Noise texture result
 */
export interface NoiseTextureResult {
  /** Apply noise texture to element */
  apply: (element: HTMLElement) => void;
  /** Remove noise texture from element */
  remove: (element: HTMLElement) => void;
  /** Update noise configuration */
  updateConfig: (config: Partial<NoiseTextureConfig>) => void;
  /** Regenerate noise texture */
  regenerate: () => void;
  /** Get texture data URL */
  getTextureUrl: () => string | null;
  /** Get current state */
  getState: () => NoiseTextureState;
  /** Cleanup resources */
  cleanup: () => void;
}

/**
 * Noise texture preset
 */
export interface NoiseTexturePreset {
  /** Preset name */
  name: string;
  /** Preset description */
  description: string;
  /** Noise configuration */
  config: NoiseTextureConfig;
  /** Use cases */
  useCases: string[];
}

/**
 * Noise pattern configurations
 */
const NOISE_PATTERN_CONFIGS: Record<NoisePattern, { scale: number; octaves: number; persistence: number }> = {
  'ultra-fine': { scale: 0.005, octaves: 4, persistence: 0.5 },
  'fine': { scale: 0.01, octaves: 3, persistence: 0.6 },
  'medium': { scale: 0.02, octaves: 2, persistence: 0.7 },
  'coarse': { scale: 0.05, octaves: 1, persistence: 0.8 },
  'custom': { scale: 0.015, octaves: 2, persistence: 0.65 },
};

/**
 * Noise texture cache
 */
const noiseTextureCache = new Map<string, string>();

/**
 * Generate cache key for noise configuration
 */
const generateCacheKey = (config: NoiseTextureConfig): string => {
  return `noise_${config.type}_${config.pattern}_${config.opacity}_${config.density}_${config.dimensions.width}x${config.dimensions.height}`;
};

/**
 * Generate Perlin noise value
 */
const generatePerlinNoise = (x: number, y: number, scale: number): number => {
  const xi = Math.floor(x * scale);
  const yi = Math.floor(y * scale);
  const xf = x * scale - xi;
  const yf = y * scale - yi;
  
  // Simple noise function (simplified for performance)
  const a = Math.sin(xi * 12.9898 + yi * 78.233) * 43758.5453;
  const b = Math.sin((xi + 1) * 12.9898 + yi * 78.233) * 43758.5453;
  const c = Math.sin(xi * 12.9898 + (yi + 1) * 78.233) * 43758.5453;
  const d = Math.sin((xi + 1) * 12.9898 + (yi + 1) * 78.233) * 43758.5453;
  
  const i1 = a * (1 - xf) + b * xf;
  const i2 = c * (1 - xf) + d * xf;
  
  return (i1 * (1 - yf) + i2 * yf) % 1;
};

/**
 * Generate white noise value
 */
const generateWhiteNoise = (x: number, y: number): number => {
  const seed = x * 374761 + y * 668265263;
  return (Math.sin(seed) * 43758.5453) % 1;
};

/**
 * Generate noise texture
 */
const generateNoiseTexture = (config: NoiseTextureConfig): HTMLCanvasElement => {
  const canvas = document.createElement('canvas');
  canvas.width = config.dimensions.width;
  canvas.height = config.dimensions.height;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Failed to get canvas context');
  
  const imageData = ctx.createImageData(canvas.width, canvas.height);
  const data = imageData.data;
  
  const patternConfig = NOISE_PATTERN_CONFIGS[config.pattern];
  const opacityValue = typeof config.opacity === 'number' ? config.opacity : 5;
  const alpha = Math.floor((opacityValue / 100) * 255);
  
  // Parse tint color
  const tintColor = hexToRgb(config.tint);
  
  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const index = (y * canvas.width + x) * 4;
      
      let noise = 0;
      
      // Generate noise based on type
      switch (config.type) {
        case 'perlin':
          noise = generatePerlinNoise(x, y, patternConfig.scale);
          break;
        case 'white':
          noise = generateWhiteNoise(x, y);
          break;
        case 'brownian':
          // Brownian motion (fractal noise)
          for (let i = 0; i < patternConfig.octaves; i++) {
            const frequency = Math.pow(2, i);
            const amplitude = Math.pow(patternConfig.persistence, i);
            noise += generatePerlinNoise(x * frequency, y * frequency, patternConfig.scale) * amplitude;
          }
          break;
        case 'cellular':
          // Cellular automata-like pattern
          noise = Math.random() > config.density ? 1 : 0;
          break;
        case 'simplex':
          // Simplified simplex noise
          noise = generatePerlinNoise(x, y, patternConfig.scale * 0.5);
          break;
        case 'fbm':
          // Fractional Brownian Motion
          for (let i = 0; i < patternConfig.octaves; i++) {
            const frequency = Math.pow(2, i);
            const amplitude = Math.pow(0.5, i);
            noise += generatePerlinNoise(x * frequency, y * frequency, patternConfig.scale) * amplitude;
          }
          break;
      }
      
      // Normalize noise value
      noise = Math.abs(noise);
      if (noise > 1) noise = 1;
      
      // Apply density filter
      if (Math.random() > config.density) {
        noise *= 0.5;
      }
      
      // Apply tint and opacity
      const intensity = Math.floor(noise * 255);
      data[index] = Math.floor(tintColor.r * (intensity / 255)); // Red
      data[index + 1] = Math.floor(tintColor.g * (intensity / 255)); // Green
      data[index + 2] = Math.floor(tintColor.b * (intensity / 255)); // Blue
      data[index + 3] = Math.floor(alpha * (intensity / 255)); // Alpha
    }
  }
  
  ctx.putImageData(imageData, 0, 0);
  return canvas;
};

/**
 * Convert hex color to RGB
 */
const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 255, g: 255, b: 255 };
};

/**
 * Create noise texture effect
 */
const createNoiseTexture = (
  config: Partial<NoiseTextureConfig> = {}
): NoiseTextureResult => {
  // Default configuration
  const defaultConfig: NoiseTextureConfig = {
    type: 'perlin',
    pattern: 'fine',
    opacity: 5, // Design System: 5% opacity
    density: 0.7,
    tint: ProfessionalGrays.light as string,
    blendMode: 'multiply',
    dimensions: { width: 256, height: 256 },
    caching: true,
    accessibilityEnabled: true,
    respectReducedMotion: true,
  };

  let currentConfig = { ...defaultConfig, ...config };
  let state: NoiseTextureState = {
    canvas: null,
    context: null,
    textureData: null,
    textureUrl: null,
    isRendering: false,
    cacheKey: '',
  };

  // Check for reduced motion preference
  const prefersReducedMotion = () => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  };

  // Generate texture
  const generateTexture = (): void => {
    if (currentConfig.respectReducedMotion && prefersReducedMotion()) {
      return;
    }

    state.isRendering = true;
    state.cacheKey = generateCacheKey(currentConfig);

    // Check cache first
    if (currentConfig.caching && noiseTextureCache.has(state.cacheKey)) {
      state.textureUrl = noiseTextureCache.get(state.cacheKey) || null;
      state.isRendering = false;
      return;
    }

    try {
      // Generate new texture
      state.canvas = generateNoiseTexture(currentConfig);
      state.context = state.canvas.getContext('2d');
      state.textureUrl = state.canvas.toDataURL();

      // Cache the texture
      if (currentConfig.caching && state.textureUrl) {
        noiseTextureCache.set(state.cacheKey, state.textureUrl);
      }
    } catch (error) {
      console.warn('Failed to generate noise texture:', error);
    } finally {
      state.isRendering = false;
    }
  };

  // Apply noise texture to element
  const apply = (element: HTMLElement): void => {
    if (!state.textureUrl) {
      generateTexture();
    }

    if (state.textureUrl) {
      element.style.position = 'relative';
      
      // Create overlay element
      const overlay = document.createElement('div');
      overlay.style.position = 'absolute';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.backgroundImage = `url(${state.textureUrl})`;
      overlay.style.backgroundRepeat = 'repeat';
      overlay.style.backgroundSize = `${currentConfig.dimensions.width}px ${currentConfig.dimensions.height}px`;
      overlay.style.mixBlendMode = currentConfig.blendMode;
      overlay.style.pointerEvents = 'none';
      overlay.style.zIndex = '1';
      overlay.setAttribute('data-noise-texture', 'true');
      
      // Insert overlay
      element.insertBefore(overlay, element.firstChild);
      
      // Ensure content is above overlay
      Array.from(element.children).forEach((child, index) => {
        if (index > 0) {
          (child as HTMLElement).style.position = 'relative';
          (child as HTMLElement).style.zIndex = '2';
        }
      });
    }
  };

  // Remove noise texture from element
  const remove = (element: HTMLElement): void => {
    const overlay = element.querySelector('[data-noise-texture="true"]');
    if (overlay) {
      overlay.remove();
    }
  };

  // Update configuration
  const updateConfig = (newConfig: Partial<NoiseTextureConfig>): void => {
    currentConfig = { ...currentConfig, ...newConfig };
    state.textureUrl = null; // Force regeneration
  };

  // Regenerate texture
  const regenerate = (): void => {
    state.textureUrl = null;
    generateTexture();
  };

  // Get texture data URL
  const getTextureUrl = (): string | null => {
    if (!state.textureUrl) {
      generateTexture();
    }
    return state.textureUrl;
  };

  // Get current state
  const getState = (): NoiseTextureState => ({ ...state });

  // Cleanup resources
  const cleanup = (): void => {
    state.canvas = null;
    state.context = null;
    state.textureData = null;
    state.textureUrl = null;
  };

  // Generate initial texture
  generateTexture();

  return {
    apply,
    remove,
    updateConfig,
    regenerate,
    getTextureUrl,
    getState,
    cleanup,
  };
};

/**
 * Hero card noise preset
 * Design System: noise: 'url(noise.png) 5% opacity'
 */
const HERO_CARD_NOISE_PRESET: NoiseTexturePreset = {
  name: 'Hero Card',
  description: 'Subtle noise texture for hero card depth',
  config: {
    type: 'perlin',
    pattern: 'fine',
    opacity: 5,
    density: 0.6,
    tint: deepSpaceColors.dark as string,
    blendMode: 'multiply',
    dimensions: { width: 512, height: 512 },
    caching: true,
    accessibilityEnabled: true,
    respectReducedMotion: true,
  },
  useCases: ['Hero cards', 'Featured content', 'Premium backgrounds'],
};

/**
 * Depth overlay noise preset
 * Design System: "Add noise texture overlay at 5% opacity for depth"
 */
const DEPTH_OVERLAY_NOISE_PRESET: NoiseTexturePreset = {
  name: 'Depth Overlay',
  description: 'General purpose depth overlay noise',
  config: {
    type: 'brownian',
    pattern: 'medium',
    opacity: 5,
    density: 0.7,
    tint: ProfessionalGrays.medium as string,
    blendMode: 'overlay',
    dimensions: { width: 256, height: 256 },
    caching: true,
    accessibilityEnabled: true,
    respectReducedMotion: true,
  },
  useCases: ['Background overlays', 'Depth enhancement', 'Surface textures'],
};

/**
 * Subtle texture noise preset
 * Design System: "Noise: 3-5% opacity for depth"
 */
const SUBTLE_TEXTURE_NOISE_PRESET: NoiseTexturePreset = {
  name: 'Subtle Texture',
  description: 'Minimal noise for subtle texture',
  config: {
    type: 'white',
    pattern: 'ultra-fine',
    opacity: 3,
    density: 0.5,
    tint: ProfessionalGrays.light as string,
    blendMode: 'soft-light',
    dimensions: { width: 128, height: 128 },
    caching: true,
    accessibilityEnabled: true,
    respectReducedMotion: true,
  },
  useCases: ['Subtle backgrounds', 'Minimal textures', 'Light overlays'],
};

/**
 * Premium surface noise preset
 */
const PREMIUM_SURFACE_NOISE_PRESET: NoiseTexturePreset = {
  name: 'Premium Surface',
  description: 'Premium surface texture noise',
  config: {
    type: 'fbm',
    pattern: 'fine',
    opacity: 4,
    density: 0.8,
    tint: '#1A1A2E',
    blendMode: 'multiply',
    dimensions: { width: 512, height: 512 },
    caching: true,
    accessibilityEnabled: true,
    respectReducedMotion: true,
  },
  useCases: ['Premium surfaces', 'Card backgrounds', 'Interactive elements'],
};

/**
 * Create noise texture from preset
 */
const createNoiseFromPreset = (
  preset: NoiseTexturePreset,
  overrides: Partial<NoiseTextureConfig> = {}
): NoiseTextureResult => {
  return createNoiseTexture({ ...preset.config, ...overrides });
};

/**
 * Create hero card noise texture
 */
const createHeroCardNoise = (
  config: Partial<NoiseTextureConfig> = {}
): NoiseTextureResult => {
  return createNoiseTexture({
    type: 'perlin',
    pattern: 'fine',
    opacity: 5,
    density: 0.6,
    tint: deepSpaceColors.dark as string,
    blendMode: 'multiply',
    ...config,
  });
};

/**
 * Create depth overlay noise texture
 */
const createDepthOverlayNoise = (
  config: Partial<NoiseTextureConfig> = {}
): NoiseTextureResult => {
  return createNoiseTexture({
    type: 'brownian',
    pattern: 'medium',
    opacity: 5,
    density: 0.7,
    tint: ProfessionalGrays.medium as string,
    blendMode: 'overlay',
    ...config,
  });
};

/**
 * Create subtle texture noise
 */
const createSubtleTextureNoise = (
  config: Partial<NoiseTextureConfig> = {}
): NoiseTextureResult => {
  return createNoiseTexture({
    type: 'white',
    pattern: 'ultra-fine',
    opacity: 3,
    density: 0.5,
    tint: ProfessionalGrays.light as string,
    blendMode: 'soft-light',
    ...config,
  });
};

/**
 * Create batch noise textures
 */
const createBatchNoiseTextures = (
  elements: HTMLElement[],
  config: Partial<NoiseTextureConfig> = {}
): NoiseTextureResult[] => {
  return elements.map(() => createNoiseTexture(config));
};

/**
 * Create responsive noise texture
 */
const createResponsiveNoiseTexture = (
  config: Partial<NoiseTextureConfig> = {}
): NoiseTextureResult => {
  const responsiveConfig = {
    ...config,
    dimensions: {
      width: window.innerWidth < 768 ? 128 : 256,
      height: window.innerWidth < 768 ? 128 : 256,
    },
  };
  
  return createNoiseTexture(responsiveConfig);
};

/**
 * Create accessible noise texture
 */
const createAccessibleNoiseTexture = (
  config: Partial<NoiseTextureConfig> = {}
): NoiseTextureResult => {
  const accessibleConfig = {
    ...config,
    accessibilityEnabled: true,
    respectReducedMotion: true,
    opacity: Math.min(typeof config.opacity === 'number' ? config.opacity : 5, 3), // Reduce opacity for accessibility
  };
  
  return createNoiseTexture(accessibleConfig);
};

// Export all functionality
export {
  // Main creator
  createNoiseTexture,
  
  // Presets
  HERO_CARD_NOISE_PRESET,
  DEPTH_OVERLAY_NOISE_PRESET,
  SUBTLE_TEXTURE_NOISE_PRESET,
  PREMIUM_SURFACE_NOISE_PRESET,
  
  // Specialized creators
  createNoiseFromPreset,
  createHeroCardNoise,
  createDepthOverlayNoise,
  createSubtleTextureNoise,
  
  // Utility creators
  createBatchNoiseTextures,
  createResponsiveNoiseTexture,
  createAccessibleNoiseTexture,
  
  // Configuration objects
  NOISE_PATTERN_CONFIGS,
};
