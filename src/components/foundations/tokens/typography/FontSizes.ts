/**
 * Font Sizes - Corp Astro Design System
 * 
 * Font size scale based on mathematical progression and UI documentation specifications.
 * Based on exact specifications from UI documentation.
 * 
 * @format
 */

export interface FontSizeConfig {
  size: number;
  lineHeight: number;
  usage: string;
  responsive?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
}

/**
 * Font size scale from UI documentation
 * 
 * From UI Docs: "// Size Scale (Golden Ratio)
 * sizes: {
 *   hero: 61,       // Massive hero statements
 *   h1: 38,         // Page titles
 *   h2: 31,         // Section headers
 *   h3: 25,         // Card titles
 *   h4: 20,         // Subsection headers
 *   body: 16,       // Default body text
 *   small: 14,      // Secondary text
 *   caption: 13,    // Captions, labels
 *   micro: 11,      // Tiny labels
 * }"
 */

/**
 * Hero font size for massive statements
 */
export const heroSize: FontSizeConfig = {
  size: 61,
  lineHeight: 1.2,
  usage: 'Massive hero statements',
  responsive: {
    mobile: 48,
    tablet: 56,
    desktop: 61
  }
};

/**
 * H1 font size for page titles
 */
export const h1Size: FontSizeConfig = {
  size: 38,
  lineHeight: 1.2,
  usage: 'Page titles',
  responsive: {
    mobile: 32,
    tablet: 36,
    desktop: 38
  }
};

/**
 * H2 font size for section headers
 */
export const h2Size: FontSizeConfig = {
  size: 31,
  lineHeight: 1.3,
  usage: 'Section headers',
  responsive: {
    mobile: 28,
    tablet: 30,
    desktop: 31
  }
};

/**
 * H3 font size for card titles
 */
export const h3Size: FontSizeConfig = {
  size: 25,
  lineHeight: 1.3,
  usage: 'Card titles',
  responsive: {
    mobile: 24,
    tablet: 25,
    desktop: 25
  }
};

/**
 * H4 font size for subsection headers
 */
export const h4Size: FontSizeConfig = {
  size: 20,
  lineHeight: 1.4,
  usage: 'Subsection headers',
  responsive: {
    mobile: 18,
    tablet: 20,
    desktop: 20
  }
};

/**
 * H5 font size for smaller headings
 */
export const h5Size: FontSizeConfig = {
  size: 18,
  lineHeight: 1.4,
  usage: 'Smaller headings',
  responsive: {
    mobile: 16,
    tablet: 18,
    desktop: 18
  }
};

/**
 * H6 font size for smallest headings
 */
export const h6Size: FontSizeConfig = {
  size: 16,
  lineHeight: 1.5,
  usage: 'Smallest headings',
  responsive: {
    mobile: 14,
    tablet: 16,
    desktop: 16
  }
};

/**
 * Body font size for default text
 */
export const bodySize: FontSizeConfig = {
  size: 16,
  lineHeight: 1.5,
  usage: 'Default body text',
  responsive: {
    mobile: 16,
    tablet: 16,
    desktop: 16
  }
};

/**
 * Small font size for secondary text
 */
export const smallSize: FontSizeConfig = {
  size: 14,
  lineHeight: 1.5,
  usage: 'Secondary text',
  responsive: {
    mobile: 14,
    tablet: 14,
    desktop: 14
  }
};

/**
 * Caption font size for captions and labels
 */
export const captionSize: FontSizeConfig = {
  size: 13,
  lineHeight: 1.6,
  usage: 'Captions, labels',
  responsive: {
    mobile: 12,
    tablet: 13,
    desktop: 13
  }
};

/**
 * Micro font size for tiny labels
 */
export const microSize: FontSizeConfig = {
  size: 11,
  lineHeight: 1.6,
  usage: 'Tiny labels',
  responsive: {
    mobile: 10,
    tablet: 11,
    desktop: 11
  }
};

/**
 * Button font size for button text
 */
export const buttonSize: FontSizeConfig = {
  size: 16,
  lineHeight: 1.2,
  usage: 'Button text',
  responsive: {
    mobile: 16,
    tablet: 16,
    desktop: 16
  }
};

/**
 * Input font size for form inputs
 */
export const inputSize: FontSizeConfig = {
  size: 16,
  lineHeight: 1.5,
  usage: 'Form inputs',
  responsive: {
    mobile: 16, // Important: iOS won't zoom if 16px or larger
    tablet: 16,
    desktop: 16
  }
};

/**
 * Font size variants collection
 */
export const fontSizes = {
  hero: heroSize,
  h1: h1Size,
  h2: h2Size,
  h3: h3Size,
  h4: h4Size,
  h5: h5Size,
  h6: h6Size,
  body: bodySize,
  small: smallSize,
  caption: captionSize,
  micro: microSize,
  button: buttonSize,
  input: inputSize
} as const;

/**
 * Get font size for a variant
 */
export const getFontSize = (variant: keyof typeof fontSizes): number => {
  return fontSizes[variant].size;
};

/**
 * Get responsive font size
 */
export const getResponsiveFontSize = (
  variant: keyof typeof fontSizes,
  breakpoint: 'mobile' | 'tablet' | 'desktop'
): number => {
  const sizeConfig = fontSizes[variant];
  return sizeConfig.responsive?.[breakpoint] || sizeConfig.size;
};

/**
 * Get line height for a variant
 */
export const getLineHeight = (variant: keyof typeof fontSizes): number => {
  return fontSizes[variant].lineHeight;
};

/**
 * Convert px to rem (assuming 16px base)
 */
export const pxToRem = (px: number): string => {
  return `${px / 16}rem`;
};

/**
 * Convert px to em (relative to parent)
 */
export const pxToEm = (px: number, parentSize: number = 16): string => {
  return `${px / parentSize}em`;
};

/**
 * Scale font size by ratio
 */
export const scaleFontSize = (baseSize: number, ratio: number): number => {
  return Math.round(baseSize * ratio);
};

/**
 * Generate font size scale
 */
export const generateFontScale = (
  baseSize: number = 16,
  ratio: number = 1.25,
  steps: number = 8
): number[] => {
  const sizes: number[] = [];
  
  for (let i = 0; i < steps; i++) {
    sizes.push(Math.round(baseSize * Math.pow(ratio, i)));
  }
  
  return sizes;
};

/**
 * Get font size with line height as CSS string
 */
export const getFontSizeCSS = (variant: keyof typeof fontSizes): string => {
  const config = fontSizes[variant];
  return `${config.size}px/${config.lineHeight}`;
};

/**
 * Get responsive font size CSS
 */
export const getResponsiveFontSizeCSS = (variant: keyof typeof fontSizes): string => {
  const config = fontSizes[variant];
  const mobile = config.responsive?.mobile || config.size;
  const tablet = config.responsive?.tablet || config.size;
  const desktop = config.responsive?.desktop || config.size;
  
  return `
    font-size: ${mobile}px;
    
    @media (min-width: 768px) {
      font-size: ${tablet}px;
    }
    
    @media (min-width: 1024px) {
      font-size: ${desktop}px;
    }
  `;
};

/**
 * Typography scale based on mathematical progression
 */
export const typographyScale = {
  // Golden ratio progression
  golden: [11, 13, 16, 20, 25, 31, 38, 48, 61],
  // Major third progression
  majorThird: [12, 15, 19, 24, 30, 37, 47, 59, 74],
  // Perfect fourth progression
  perfectFourth: [12, 16, 21, 28, 37, 50, 67, 89, 118],
  // Major second progression
  majorSecond: [14, 16, 18, 20, 22, 25, 28, 32, 36]
} as const;

/**
 * Type definitions
 */
export type FontSizeVariant = keyof typeof fontSizes;
export type ResponsiveBreakpoint = 'mobile' | 'tablet' | 'desktop';

/**
 * Validation utilities
 */
export const validateFontSize = (config: FontSizeConfig): boolean => {
  return (
    typeof config.size === 'number' &&
    config.size > 0 &&
    typeof config.lineHeight === 'number' &&
    config.lineHeight > 0 &&
    typeof config.usage === 'string' &&
    config.usage.length > 0
  );
};

export default fontSizes;
