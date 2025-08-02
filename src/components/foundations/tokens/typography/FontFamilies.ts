/**
 * Font Families - Corp Astro Design System
 * 
 * Font family definitions for all text elements in the application.
 * Based on exact specifications from UI documentation.
 * 
 * @format
 */

export interface FontFamilyConfig {
  family: string;
  weights: readonly number[];
  usage: string;
  fallback: readonly string[];
  platformSpecific?: {
    ios?: string;
    android?: string;
    web?: string;
  };
}

/**
 * Display font for luxury fashion magazine feel
 * 
 * From UI Docs: "display: {
 *   family: 'Didot', // or 'Bodoni Moda'
 *   weights: [300, 400],
 *   usage: 'Hero headlines, feature titles'
 * }"
 */
export const displayFont: FontFamilyConfig = {
  family: 'Didot',
  weights: [300, 400] as const,
  usage: 'Hero headlines, feature titles',
  fallback: ['Bodoni Moda', 'Times New Roman', 'serif'] as const,
  platformSpecific: {
    ios: 'Didot',
    android: 'serif',
    web: 'Didot, "Bodoni Moda", "Times New Roman", serif'
  }
};

/**
 * Heading font for clean, geometric, professional appearance
 * 
 * From UI Docs: "heading: {
 *   family: 'Futura PT',
 *   weights: [400, 500, 600, 700],
 *   usage: 'Section headers, card titles'
 * }"
 */
export const headingFont: FontFamilyConfig = {
  family: 'Futura PT',
  weights: [400, 500, 600, 700] as const,
  usage: 'Section headers, card titles',
  fallback: ['Futura', 'Helvetica Neue', 'Arial', 'sans-serif'] as const,
  platformSpecific: {
    ios: 'Futura',
    android: 'sans-serif',
    web: '"Futura PT", Futura, "Helvetica Neue", Arial, sans-serif'
  }
};

/**
 * Body font for perfect readability
 * 
 * From UI Docs: "body: {
 *   family: 'Inter',
 *   weights: [300, 400, 500, 600],
 *   usage: 'All body text, buttons, inputs'
 * }"
 */
export const bodyFont: FontFamilyConfig = {
  family: 'Inter',
  weights: [300, 400, 500, 600] as const,
  usage: 'All body text, buttons, inputs',
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'] as const,
  platformSpecific: {
    ios: 'system-ui',
    android: 'Roboto',
    web: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  }
};

/**
 * Accent font for mystical elements
 * 
 * From UI Docs: "accent: {
 *   family: 'Cinzel',
 *   weights: [400, 600],
 *   usage: 'Special mystical text, quotes'
 * }"
 */
export const accentFont: FontFamilyConfig = {
  family: 'Cinzel',
  weights: [400, 600] as const,
  usage: 'Special mystical text, quotes',
  fallback: ['Trajan Pro', 'Times New Roman', 'serif'] as const,
  platformSpecific: {
    ios: 'Trajan Pro',
    android: 'serif',
    web: 'Cinzel, "Trajan Pro", "Times New Roman", serif'
  }
};

/**
 * Monospace font for code and technical text
 */
export const monospaceFont: FontFamilyConfig = {
  family: 'SF Mono',
  weights: [400, 500, 600] as const,
  usage: 'Code snippets, technical data',
  fallback: ['Monaco', 'Menlo', 'Consolas', 'Courier New', 'monospace'] as const,
  platformSpecific: {
    ios: 'SF Mono',
    android: 'monospace',
    web: '"SF Mono", Monaco, Menlo, Consolas, "Courier New", monospace'
  }
};

/**
 * Font family variants collection
 */
export const fontFamilies = {
  display: displayFont,
  heading: headingFont,
  body: bodyFont,
  accent: accentFont,
  monospace: monospaceFont
} as const;

/**
 * Get font family string for React Native
 */
export const getFontFamily = (variant: keyof typeof fontFamilies): string => {
  const font = fontFamilies[variant];
  // For React Native, we typically use the primary family name
  return font.family;
};

/**
 * Get font family string for web (CSS)
 */
export const getFontFamilyCSS = (variant: keyof typeof fontFamilies): string => {
  const font = fontFamilies[variant];
  return font.platformSpecific?.web || `${font.family}, ${font.fallback.join(', ')}`;
};

/**
 * Get platform-specific font family
 */
export const getPlatformFontFamily = (
  variant: keyof typeof fontFamilies,
  platform: 'ios' | 'android' | 'web'
): string => {
  const font = fontFamilies[variant];
  return font.platformSpecific?.[platform] || font.family;
};

/**
 * Get available font weights for a family
 */
export const getFontWeights = (variant: keyof typeof fontFamilies): readonly number[] => {
  return fontFamilies[variant].weights;
};

/**
 * Check if font weight is available for a family
 */
export const isFontWeightAvailable = (
  variant: keyof typeof fontFamilies,
  weight: number
): boolean => {
  return fontFamilies[variant].weights.includes(weight);
};

/**
 * Get the closest available font weight
 */
export const getClosestFontWeight = (
  variant: keyof typeof fontFamilies,
  targetWeight: number
): number => {
  const weights = fontFamilies[variant].weights;
  
  // Find the closest weight
  let closest = weights[0];
  let minDiff = Math.abs(targetWeight - closest);
  
  for (const weight of weights) {
    const diff = Math.abs(targetWeight - weight);
    if (diff < minDiff) {
      minDiff = diff;
      closest = weight;
    }
  }
  
  return closest;
};

/**
 * Font loading utilities
 */
export const loadFonts = async (): Promise<void> => {
  // This would typically load custom fonts for the platform
  // Implementation depends on the platform (React Native, Web, etc.)
  console.log('Loading Corp Astro fonts...');
};

/**
 * Type definitions
 */
export type FontFamilyVariant = keyof typeof fontFamilies;
export type FontWeight = 300 | 400 | 500 | 600 | 700;
export type Platform = 'ios' | 'android' | 'web';

/**
 * Validation utilities
 */
export const validateFontFamily = (config: FontFamilyConfig): boolean => {
  return (
    typeof config.family === 'string' &&
    config.family.length > 0 &&
    Array.isArray(config.weights) &&
    config.weights.length > 0 &&
    config.weights.every(weight => typeof weight === 'number' && weight > 0) &&
    typeof config.usage === 'string' &&
    Array.isArray(config.fallback) &&
    config.fallback.length > 0
  );
};

export default fontFamilies;
