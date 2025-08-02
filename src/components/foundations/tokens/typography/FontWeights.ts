/**
 * Font Weights - Corp Astro Design System
 * 
 * Font weight definitions for all typography elements.
 * Based on exact specifications from UI documentation.
 * 
 * @format
 */

export interface FontWeightConfig {
  weight: number;
  name: string;
  usage: string;
  fallback?: number;
  cssValue?: string;
}

/**
 * Font weight definitions from UI documentation
 * 
 * From UI Docs: 
 * - Display: weights: [300, 400]
 * - Heading: weights: [400, 500, 600, 700]
 * - Body: weights: [300, 400, 500, 600]
 * - Accent: weights: [400, 600]
 */

/**
 * Light font weight (300)
 */
export const lightWeight: FontWeightConfig = {
  weight: 300,
  name: 'Light',
  usage: 'Light body text, captions',
  fallback: 400,
  cssValue: '300'
};

/**
 * Regular font weight (400)
 */
export const regularWeight: FontWeightConfig = {
  weight: 400,
  name: 'Regular',
  usage: 'Default body text, display text',
  fallback: 400,
  cssValue: 'normal'
};

/**
 * Medium font weight (500)
 */
export const mediumWeight: FontWeightConfig = {
  weight: 500,
  name: 'Medium',
  usage: 'Emphasized text, headings',
  fallback: 600,
  cssValue: '500'
};

/**
 * Semi-bold font weight (600)
 */
export const semiBoldWeight: FontWeightConfig = {
  weight: 600,
  name: 'SemiBold',
  usage: 'Headings, important text',
  fallback: 700,
  cssValue: '600'
};

/**
 * Bold font weight (700)
 */
export const boldWeight: FontWeightConfig = {
  weight: 700,
  name: 'Bold',
  usage: 'Strong emphasis, headings',
  fallback: 600,
  cssValue: 'bold'
};

/**
 * Font weight variants collection
 */
export const fontWeights = {
  light: lightWeight,
  regular: regularWeight,
  medium: mediumWeight,
  semiBold: semiBoldWeight,
  bold: boldWeight
} as const;

/**
 * Font weight mapping by font family
 */
export const fontWeightsByFamily = {
  display: {
    light: 300,
    regular: 400
  },
  heading: {
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700
  },
  body: {
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600
  },
  accent: {
    regular: 400,
    semiBold: 600
  },
  monospace: {
    regular: 400,
    medium: 500,
    semiBold: 600
  }
} as const;

/**
 * Get font weight value
 */
export const getFontWeight = (variant: keyof typeof fontWeights): number => {
  return fontWeights[variant].weight;
};

/**
 * Get font weight for specific family
 */
export const getFontWeightForFamily = (
  family: keyof typeof fontWeightsByFamily,
  weight: keyof typeof fontWeights
): number => {
  const familyWeights = fontWeightsByFamily[family];
  return (familyWeights as any)[weight] || fontWeights.regular.weight;
};

/**
 * Get CSS font weight value
 */
export const getFontWeightCSS = (variant: keyof typeof fontWeights): string => {
  return fontWeights[variant].cssValue || fontWeights[variant].weight.toString();
};

/**
 * Get closest available font weight for family
 */
export const getClosestFontWeight = (
  family: keyof typeof fontWeightsByFamily,
  targetWeight: number
): number => {
  const familyWeights = Object.values(fontWeightsByFamily[family]);
  
  let closest = familyWeights[0];
  let minDiff = Math.abs(targetWeight - closest);
  
  for (const weight of familyWeights) {
    const diff = Math.abs(targetWeight - weight);
    if (diff < minDiff) {
      minDiff = diff;
      closest = weight;
    }
  }
  
  return closest;
};

/**
 * Check if font weight is available for family
 */
export const isFontWeightAvailable = (
  family: keyof typeof fontWeightsByFamily,
  weight: keyof typeof fontWeights
): boolean => {
  const familyWeights = fontWeightsByFamily[family];
  return weight in familyWeights;
};

/**
 * Get fallback font weight
 */
export const getFallbackFontWeight = (variant: keyof typeof fontWeights): number => {
  return fontWeights[variant].fallback || fontWeights.regular.weight;
};

/**
 * Font weight semantic mapping
 */
export const semanticFontWeights = {
  // Text hierarchy
  heroTitle: 'light',
  pageTitle: 'medium',
  sectionTitle: 'semiBold',
  cardTitle: 'medium',
  subTitle: 'regular',
  
  // Body text
  bodyDefault: 'regular',
  bodyEmphasized: 'medium',
  bodyStrong: 'semiBold',
  bodyLight: 'light',
  
  // UI elements
  buttonPrimary: 'medium',
  buttonSecondary: 'regular',
  buttonGhost: 'regular',
  
  // Form elements
  inputText: 'regular',
  inputLabel: 'medium',
  inputError: 'regular',
  inputHelp: 'regular',
  
  // Navigation
  navItem: 'regular',
  navActive: 'medium',
  tabItem: 'regular',
  tabActive: 'medium',
  
  // Feedback
  alertTitle: 'medium',
  alertMessage: 'regular',
  toastMessage: 'regular',
  
  // Data display
  metricValue: 'semiBold',
  metricLabel: 'regular',
  badgeText: 'medium',
  chipText: 'regular'
} as const;

/**
 * Get semantic font weight
 */
export const getSemanticFontWeight = (
  semantic: keyof typeof semanticFontWeights
): number => {
  const weightKey = semanticFontWeights[semantic] as keyof typeof fontWeights;
  return fontWeights[weightKey].weight;
};

/**
 * Get semantic font weight for family
 */
export const getSemanticFontWeightForFamily = (
  family: keyof typeof fontWeightsByFamily,
  semantic: keyof typeof semanticFontWeights
): number => {
  const weightKey = semanticFontWeights[semantic] as keyof typeof fontWeights;
  return getFontWeightForFamily(family, weightKey);
};

/**
 * Font weight utility functions
 */
export const fontWeightUtils = {
  /**
   * Convert numeric weight to name
   */
  getWeightName: (weight: number): string => {
    const entry = Object.entries(fontWeights).find(([_, config]) => config.weight === weight);
    return entry?.[1].name || 'Regular';
  },
  
  /**
   * Convert name to numeric weight
   */
  getWeightValue: (name: string): number => {
    const entry = Object.entries(fontWeights).find(([_, config]) => 
      config.name.toLowerCase() === name.toLowerCase()
    );
    return entry?.[1].weight || 400;
  },
  
  /**
   * Get weight range for family
   */
  getWeightRange: (family: keyof typeof fontWeightsByFamily): [number, number] => {
    const weights = Object.values(fontWeightsByFamily[family]);
    return [Math.min(...weights), Math.max(...weights)];
  },
  
  /**
   * Interpolate between weights
   */
  interpolateWeight: (from: number, to: number, factor: number): number => {
    return Math.round(from + (to - from) * factor);
  }
};

/**
 * Type definitions
 */
export type FontWeightVariant = keyof typeof fontWeights;
export type FontFamilyVariant = keyof typeof fontWeightsByFamily;
export type SemanticFontWeight = keyof typeof semanticFontWeights;

/**
 * Validation utilities
 */
export const validateFontWeight = (config: FontWeightConfig): boolean => {
  return (
    typeof config.weight === 'number' &&
    config.weight >= 100 &&
    config.weight <= 900 &&
    typeof config.name === 'string' &&
    config.name.length > 0 &&
    typeof config.usage === 'string' &&
    config.usage.length > 0
  );
};

export default fontWeights;
