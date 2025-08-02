/**
 * Corp Astro UI Library - Theme Utilities
 * 
 * Comprehensive theme utility functions for color manipulation, alpha blending, 
 * contrast calculation, and theme-specific operations. These utilities extend 
 * the core theme system with advanced color processing capabilities.
 * 
 * @module ThemeUtils
 * @version 1.0.0
 * @since 2024
 * 
 * UI Documentation Reference:
 * - Design Tokens: Color manipulation utilities and alpha handling
 * - Design System: Theme utility patterns and accessibility requirements
 * - Accessibility Standards: Color contrast ratios and high contrast modes
 * - Developer Handoff: Theme utility implementation requirements
 */

import { ColorValue } from 'react-native';
import { CorpAstroTheme } from './DarkTheme';

// ============================================================================
// COLOR MANIPULATION UTILITIES
// ============================================================================

/**
 * Convert hex color to RGB values
 * @param hex - Hex color string (with or without #)
 * @returns RGB object with r, g, b values (0-255)
 */
export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  // Remove # if present and validate hex
  const cleanHex = hex.replace('#', '');
  
  if (!/^[0-9A-Fa-f]{6}$/.test(cleanHex)) {
    return null;
  }
  
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  
  return { r, g, b };
};

/**
 * Convert RGB values to hex color
 * @param r - Red value (0-255)
 * @param g - Green value (0-255)
 * @param b - Blue value (0-255)
 * @returns Hex color string with #
 */
export const rgbToHex = (r: number, g: number, b: number): string => {
  const toHex = (value: number): string => {
    const hex = Math.round(Math.max(0, Math.min(255, value))).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

/**
 * Convert hex color to HSL values
 * @param hex - Hex color string
 * @returns HSL object with h (0-360), s (0-100), l (0-100)
 */
export const hexToHsl = (hex: string): { h: number; s: number; l: number } | null => {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;
  
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h: number, s: number, l: number;
  
  l = (max + min) / 2;
  
  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
      default: h = 0;
    }
    
    h /= 6;
  }
  
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
};

/**
 * Convert HSL values to hex color
 * @param h - Hue (0-360)
 * @param s - Saturation (0-100)
 * @param l - Lightness (0-100)
 * @returns Hex color string with #
 */
export const hslToHex = (h: number, s: number, l: number): string => {
  h = h % 360;
  s = Math.max(0, Math.min(100, s)) / 100;
  l = Math.max(0, Math.min(100, l)) / 100;
  
  const hue = h / 60;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((hue % 2) - 1));
  const m = l - c / 2;
  
  let r: number, g: number, b: number;
  
  if (hue < 1) {
    r = c; g = x; b = 0;
  } else if (hue < 2) {
    r = x; g = c; b = 0;
  } else if (hue < 3) {
    r = 0; g = c; b = x;
  } else if (hue < 4) {
    r = 0; g = x; b = c;
  } else if (hue < 5) {
    r = x; g = 0; b = c;
  } else {
    r = c; g = 0; b = x;
  }
  
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);
  
  return rgbToHex(r, g, b);
};

// ============================================================================
// ALPHA BLENDING UTILITIES
// ============================================================================

/**
 * Add alpha transparency to a color
 * @param color - Hex color string
 * @param alpha - Alpha value (0-1)
 * @returns RGBA color string
 */
export const withAlpha = (color: ColorValue, alpha: number): string => {
  const hex = color.toString().replace('#', '');
  const rgb = hexToRgb(`#${hex}`);
  
  if (!rgb) {
    return `rgba(0, 0, 0, ${alpha})`;
  }
  
  const clampedAlpha = Math.max(0, Math.min(1, alpha));
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${clampedAlpha})`;
};

/**
 * Blend two colors with alpha compositing
 * @param background - Background color (hex)
 * @param foreground - Foreground color (hex)
 * @param alpha - Alpha of foreground (0-1)
 * @returns Blended color as hex
 */
export const blendColors = (background: string, foreground: string, alpha: number): string => {
  const bgRgb = hexToRgb(background);
  const fgRgb = hexToRgb(foreground);
  
  if (!bgRgb || !fgRgb) {
    return background;
  }
  
  const clampedAlpha = Math.max(0, Math.min(1, alpha));
  const invAlpha = 1 - clampedAlpha;
  
  const r = Math.round(fgRgb.r * clampedAlpha + bgRgb.r * invAlpha);
  const g = Math.round(fgRgb.g * clampedAlpha + bgRgb.g * invAlpha);
  const b = Math.round(fgRgb.b * clampedAlpha + bgRgb.b * invAlpha);
  
  return rgbToHex(r, g, b);
};

/**
 * Create alpha variants of a color
 * @param color - Base color (hex)
 * @param alphas - Array of alpha values (0-1)
 * @returns Object with alpha variants
 */
export const createAlphaVariants = (
  color: string, 
  alphas: number[]
): Record<string, string> => {
  const variants: Record<string, string> = {};
  
  alphas.forEach((alpha, index) => {
    const alphaKey = `alpha${Math.round(alpha * 100)}`;
    variants[alphaKey] = withAlpha(color, alpha);
  });
  
  return variants;
};

// ============================================================================
// CONTRAST CALCULATION UTILITIES
// ============================================================================

/**
 * Calculate relative luminance of a color
 * @param color - Hex color string
 * @returns Relative luminance (0-1)
 */
export const getRelativeLuminance = (color: string): number => {
  const rgb = hexToRgb(color);
  if (!rgb) return 0;
  
  const normalize = (value: number): number => {
    const normalized = value / 255;
    return normalized <= 0.03928 
      ? normalized / 12.92 
      : Math.pow((normalized + 0.055) / 1.055, 2.4);
  };
  
  const r = normalize(rgb.r);
  const g = normalize(rgb.g);
  const b = normalize(rgb.b);
  
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

/**
 * Calculate contrast ratio between two colors
 * @param color1 - First color (hex)
 * @param color2 - Second color (hex)
 * @returns Contrast ratio (1-21)
 */
export const getContrastRatio = (color1: string, color2: string): number => {
  const lum1 = getRelativeLuminance(color1);
  const lum2 = getRelativeLuminance(color2);
  
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  
  return (lighter + 0.05) / (darker + 0.05);
};

/**
 * Check if color combination meets WCAG contrast requirements
 * @param foreground - Foreground color (hex)
 * @param background - Background color (hex)
 * @param level - WCAG level ('AA' or 'AAA')
 * @param size - Text size ('normal' or 'large')
 * @returns Boolean indicating if contrast requirement is met
 */
export const meetsContrastRequirement = (
  foreground: string,
  background: string,
  level: 'AA' | 'AAA' = 'AA',
  size: 'normal' | 'large' = 'normal'
): boolean => {
  const ratio = getContrastRatio(foreground, background);
  
  const requirements = {
    AA: { normal: 4.5, large: 3.0 },
    AAA: { normal: 7.0, large: 4.5 }
  };
  
  return ratio >= requirements[level][size];
};

/**
 * Find the best contrasting color from a set of options
 * @param background - Background color (hex)
 * @param colors - Array of color options (hex)
 * @param level - WCAG level ('AA' or 'AAA')
 * @returns Best contrasting color or null if none meet requirements
 */
export const getBestContrastColor = (
  background: string,
  colors: string[],
  level: 'AA' | 'AAA' = 'AA'
): string | null => {
  let bestColor: string | null = null;
  let bestRatio = 0;
  
  colors.forEach(color => {
    const ratio = getContrastRatio(background, color);
    if (ratio > bestRatio && meetsContrastRequirement(color, background, level)) {
      bestRatio = ratio;
      bestColor = color;
    }
  });
  
  return bestColor;
};

// ============================================================================
// COLOR ADJUSTMENT UTILITIES
// ============================================================================

/**
 * Lighten a color by a percentage
 * @param color - Hex color string
 * @param percentage - Percentage to lighten (0-100)
 * @returns Lightened color as hex
 */
export const lighten = (color: string, percentage: number): string => {
  const hsl = hexToHsl(color);
  if (!hsl) return color;
  
  const newLightness = Math.min(100, hsl.l + percentage);
  return hslToHex(hsl.h, hsl.s, newLightness);
};

/**
 * Darken a color by a percentage
 * @param color - Hex color string
 * @param percentage - Percentage to darken (0-100)
 * @returns Darkened color as hex
 */
export const darken = (color: string, percentage: number): string => {
  const hsl = hexToHsl(color);
  if (!hsl) return color;
  
  const newLightness = Math.max(0, hsl.l - percentage);
  return hslToHex(hsl.h, hsl.s, newLightness);
};

/**
 * Saturate a color by a percentage
 * @param color - Hex color string
 * @param percentage - Percentage to saturate (0-100)
 * @returns Saturated color as hex
 */
export const saturate = (color: string, percentage: number): string => {
  const hsl = hexToHsl(color);
  if (!hsl) return color;
  
  const newSaturation = Math.min(100, hsl.s + percentage);
  return hslToHex(hsl.h, newSaturation, hsl.l);
};

/**
 * Desaturate a color by a percentage
 * @param color - Hex color string
 * @param percentage - Percentage to desaturate (0-100)
 * @returns Desaturated color as hex
 */
export const desaturate = (color: string, percentage: number): string => {
  const hsl = hexToHsl(color);
  if (!hsl) return color;
  
  const newSaturation = Math.max(0, hsl.s - percentage);
  return hslToHex(hsl.h, newSaturation, hsl.l);
};

/**
 * Adjust hue of a color
 * @param color - Hex color string
 * @param degrees - Degrees to adjust hue (-360 to 360)
 * @returns Color with adjusted hue as hex
 */
export const adjustHue = (color: string, degrees: number): string => {
  const hsl = hexToHsl(color);
  if (!hsl) return color;
  
  const newHue = (hsl.h + degrees) % 360;
  return hslToHex(newHue < 0 ? newHue + 360 : newHue, hsl.s, hsl.l);
};

/**
 * Get complementary color
 * @param color - Hex color string
 * @returns Complementary color as hex
 */
export const getComplementary = (color: string): string => {
  return adjustHue(color, 180);
};

/**
 * Get triadic colors
 * @param color - Hex color string
 * @returns Array of three triadic colors including the original
 */
export const getTriadic = (color: string): string[] => {
  return [
    color,
    adjustHue(color, 120),
    adjustHue(color, 240)
  ];
};

/**
 * Get analogous colors
 * @param color - Hex color string
 * @param angle - Angle between colors (default: 30)
 * @returns Array of three analogous colors including the original
 */
export const getAnalogous = (color: string, angle: number = 30): string[] => {
  return [
    adjustHue(color, -angle),
    color,
    adjustHue(color, angle)
  ];
};

// ============================================================================
// THEME-SPECIFIC UTILITIES
// ============================================================================

/**
 * Create Corp Astro signature gradient variants
 * @param baseColor - Base color for gradient
 * @param intensity - Intensity of gradient (0-1)
 * @returns Gradient color stops
 */
export const createCorpAstroGradient = (
  baseColor: string, 
  intensity: number = 1
): { start: string; end: string; middle?: string } => {
  const clampedIntensity = Math.max(0, Math.min(1, intensity));
  
  // Create Corp Astro signature gradient pattern
  const start = lighten(baseColor, 10 * clampedIntensity);
  const end = darken(baseColor, 20 * clampedIntensity);
  const middle = saturate(baseColor, 15 * clampedIntensity);
  
  return { start, end, middle };
};

/**
 * Create glass morphism background color
 * @param baseColor - Base color for glass effect
 * @param alpha - Alpha transparency (0-1)
 * @returns RGBA color for glass morphism
 */
export const createGlassMorphism = (baseColor: string, alpha: number = 0.1): string => {
  return withAlpha(baseColor, alpha);
};

/**
 * Create orbital glow effect colors
 * @param baseColor - Base color for glow
 * @param intensity - Glow intensity (0-1)
 * @returns Object with glow variants
 */
export const createOrbitalGlow = (
  baseColor: string, 
  intensity: number = 0.8
): { inner: string; outer: string; core: string } => {
  const clampedIntensity = Math.max(0, Math.min(1, intensity));
  
  return {
    core: saturate(baseColor, 20 * clampedIntensity),
    inner: withAlpha(baseColor, 0.6 * clampedIntensity),
    outer: withAlpha(baseColor, 0.3 * clampedIntensity)
  };
};

/**
 * Create constellation connection colors
 * @param baseColor - Base color for connections
 * @param distance - Distance factor (0-1)
 * @returns Color for constellation connections
 */
export const createConstellationConnection = (
  baseColor: string, 
  distance: number = 0.5
): string => {
  const alpha = Math.max(0.1, Math.min(0.8, 1 - distance));
  return withAlpha(baseColor, alpha);
};

/**
 * Create theme-aware text color
 * @param backgroundColor - Background color
 * @param theme - Theme object
 * @returns Appropriate text color for background
 */
export const getThemeTextColor = (
  backgroundColor: string, 
  theme: CorpAstroTheme
): string => {
  const lightText = theme.colors.neutral.light.toString();
  const darkText = theme.colors.cosmos.dark.toString();
  
  const lightRatio = getContrastRatio(lightText, backgroundColor);
  const darkRatio = getContrastRatio(darkText, backgroundColor);
  
  // Return color with better contrast ratio
  return lightRatio > darkRatio ? lightText : darkText;
};

/**
 * Create responsive opacity based on theme
 * @param baseOpacity - Base opacity value
 * @param theme - Theme object
 * @returns Adjusted opacity for theme
 */
export const getThemeOpacity = (
  baseOpacity: number, 
  theme: CorpAstroTheme
): number => {
  // Adjust opacity based on theme characteristics
  // Corp Astro uses higher opacity for better cosmic effect
  return Math.min(1, baseOpacity * 1.2);
};

// ============================================================================
// UTILITY VALIDATION
// ============================================================================

/**
 * Validate if a string is a valid hex color
 * @param color - Color string to validate
 * @returns Boolean indicating if valid hex color
 */
export const isValidHexColor = (color: string): boolean => {
  const hex = color.replace('#', '');
  return /^[0-9A-Fa-f]{6}$/.test(hex);
};

/**
 * Validate if a number is a valid alpha value
 * @param alpha - Alpha value to validate
 * @returns Boolean indicating if valid alpha
 */
export const isValidAlpha = (alpha: number): boolean => {
  return typeof alpha === 'number' && alpha >= 0 && alpha <= 1;
};

/**
 * Sanitize color input
 * @param color - Color input to sanitize
 * @param fallback - Fallback color if invalid
 * @returns Sanitized color string
 */
export const sanitizeColor = (color: string, fallback: string = '#000000'): string => {
  return isValidHexColor(color) ? color : fallback;
};

/**
 * Sanitize alpha input
 * @param alpha - Alpha input to sanitize
 * @param fallback - Fallback alpha if invalid
 * @returns Sanitized alpha value
 */
export const sanitizeAlpha = (alpha: number, fallback: number = 1): number => {
  return isValidAlpha(alpha) ? alpha : fallback;
};

// ============================================================================
// EXPORTS
// ============================================================================

export const themeUtils = {
  // Color conversion
  hexToRgb,
  rgbToHex,
  hexToHsl,
  hslToHex,
  
  // Alpha blending
  withAlpha,
  blendColors,
  createAlphaVariants,
  
  // Contrast calculation
  getRelativeLuminance,
  getContrastRatio,
  meetsContrastRequirement,
  getBestContrastColor,
  
  // Color adjustment
  lighten,
  darken,
  saturate,
  desaturate,
  adjustHue,
  getComplementary,
  getTriadic,
  getAnalogous,
  
  // Theme-specific utilities
  createCorpAstroGradient,
  createGlassMorphism,
  createOrbitalGlow,
  createConstellationConnection,
  getThemeTextColor,
  getThemeOpacity,
  
  // Validation
  isValidHexColor,
  isValidAlpha,
  sanitizeColor,
  sanitizeAlpha
} as const;

export default themeUtils;
