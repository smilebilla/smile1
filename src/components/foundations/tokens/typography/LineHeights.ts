/**
 * Line Heights - Corp Astro Design System
 * 
 * Line height definitions for optimal readability and vertical rhythm.
 * Based on exact specifications from UI documentation.
 * 
 * @format
 */

export interface LineHeightConfig {
  value: number;
  name: string;
  usage: string;
  unitless: boolean;
  responsive?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
}

/**
 * Line height definitions from UI documentation
 * 
 * From UI Docs: "// Line Heights
 * lineHeights: {
 *   tight: 1.2,     // Headlines
 *   normal: 1.5,    // Body text
 *   relaxed: 1.75,  // Long reading text
 * }"
 */

/**
 * Tight line height for headlines and large text
 */
export const tightLineHeight: LineHeightConfig = {
  value: 1.2,
  name: 'Tight',
  usage: 'Headlines, large text, compact layouts',
  unitless: true,
  responsive: {
    mobile: 1.1,
    tablet: 1.15,
    desktop: 1.2
  }
};

/**
 * Normal line height for body text
 */
export const normalLineHeight: LineHeightConfig = {
  value: 1.5,
  name: 'Normal',
  usage: 'Body text, default reading',
  unitless: true,
  responsive: {
    mobile: 1.4,
    tablet: 1.45,
    desktop: 1.5
  }
};

/**
 * Relaxed line height for long reading text
 */
export const relaxedLineHeight: LineHeightConfig = {
  value: 1.75,
  name: 'Relaxed',
  usage: 'Long reading text, articles',
  unitless: true,
  responsive: {
    mobile: 1.6,
    tablet: 1.7,
    desktop: 1.75
  }
};

/**
 * Condensed line height for compact layouts
 */
export const condensedLineHeight: LineHeightConfig = {
  value: 1.1,
  name: 'Condensed',
  usage: 'Compact layouts, dense information',
  unitless: true,
  responsive: {
    mobile: 1.0,
    tablet: 1.05,
    desktop: 1.1
  }
};

/**
 * Loose line height for airy layouts
 */
export const looseLineHeight: LineHeightConfig = {
  value: 2.0,
  name: 'Loose',
  usage: 'Airy layouts, emphasis',
  unitless: true,
  responsive: {
    mobile: 1.8,
    tablet: 1.9,
    desktop: 2.0
  }
};

/**
 * Line height variants collection
 */
export const lineHeights = {
  condensed: condensedLineHeight,
  tight: tightLineHeight,
  normal: normalLineHeight,
  relaxed: relaxedLineHeight,
  loose: looseLineHeight
} as const;

/**
 * Line height mapping by font size category
 */
export const lineHeightsBySize = {
  // Large display text
  hero: 'tight',
  h1: 'tight',
  h2: 'tight',
  
  // Medium headings
  h3: 'normal',
  h4: 'normal',
  h5: 'normal',
  h6: 'normal',
  
  // Body text
  body: 'normal',
  bodyLarge: 'normal',
  bodySmall: 'normal',
  
  // UI elements
  button: 'condensed',
  input: 'normal',
  label: 'normal',
  
  // Small text
  caption: 'normal',
  micro: 'normal',
  
  // Special contexts
  code: 'normal',
  quote: 'relaxed',
  article: 'relaxed'
} as const;

/**
 * Get line height value
 */
export const getLineHeight = (variant: keyof typeof lineHeights): number => {
  return lineHeights[variant].value;
};

/**
 * Get line height for font size category
 */
export const getLineHeightForSize = (
  sizeCategory: keyof typeof lineHeightsBySize
): number => {
  const lineHeightKey = lineHeightsBySize[sizeCategory] as keyof typeof lineHeights;
  return lineHeights[lineHeightKey].value;
};

/**
 * Get responsive line height
 */
export const getResponsiveLineHeight = (
  variant: keyof typeof lineHeights,
  breakpoint: 'mobile' | 'tablet' | 'desktop'
): number => {
  const config = lineHeights[variant];
  return config.responsive?.[breakpoint] || config.value;
};

/**
 * Get line height as CSS value
 */
export const getLineHeightCSS = (variant: keyof typeof lineHeights): string => {
  const config = lineHeights[variant];
  return config.unitless ? config.value.toString() : `${config.value}px`;
};

/**
 * Get responsive line height CSS
 */
export const getResponsiveLineHeightCSS = (variant: keyof typeof lineHeights): string => {
  const config = lineHeights[variant];
  const mobile = config.responsive?.mobile || config.value;
  const tablet = config.responsive?.tablet || config.value;
  const desktop = config.responsive?.desktop || config.value;
  
  return `
    line-height: ${mobile};
    
    @media (min-width: 768px) {
      line-height: ${tablet};
    }
    
    @media (min-width: 1024px) {
      line-height: ${desktop};
    }
  `;
};

/**
 * Calculate line height for optimal readability
 */
export const calculateOptimalLineHeight = (fontSize: number): number => {
  // Based on typography research for optimal readability
  if (fontSize <= 14) return 1.6;
  if (fontSize <= 18) return 1.5;
  if (fontSize <= 24) return 1.4;
  if (fontSize <= 32) return 1.3;
  return 1.2;
};

/**
 * Calculate line height in pixels
 */
export const calculateLineHeightPixels = (fontSize: number, lineHeight: number): number => {
  return Math.round(fontSize * lineHeight);
};

/**
 * Get vertical rhythm spacing
 */
export const getVerticalRhythm = (
  fontSize: number,
  lineHeight: number,
  multiplier: number = 1
): number => {
  return calculateLineHeightPixels(fontSize, lineHeight) * multiplier;
};

/**
 * Semantic line height mapping
 */
export const semanticLineHeights = {
  // Typography hierarchy
  heroTitle: 'tight',
  pageTitle: 'tight',
  sectionTitle: 'tight',
  cardTitle: 'normal',
  subTitle: 'normal',
  
  // Body content
  bodyDefault: 'normal',
  bodyReading: 'relaxed',
  bodyCompact: 'condensed',
  
  // UI elements
  buttonText: 'condensed',
  inputText: 'normal',
  labelText: 'normal',
  helpText: 'normal',
  errorText: 'normal',
  
  // Navigation
  navItem: 'normal',
  tabItem: 'normal',
  breadcrumb: 'normal',
  
  // Data display
  metricValue: 'condensed',
  metricLabel: 'normal',
  tableCell: 'normal',
  listItem: 'normal',
  
  // Feedback
  alertTitle: 'normal',
  alertMessage: 'normal',
  toastMessage: 'normal',
  
  // Special contexts
  codeBlock: 'normal',
  quotation: 'relaxed',
  articleText: 'relaxed'
} as const;

/**
 * Get semantic line height
 */
export const getSemanticLineHeight = (
  semantic: keyof typeof semanticLineHeights
): number => {
  const lineHeightKey = semanticLineHeights[semantic] as keyof typeof lineHeights;
  return lineHeights[lineHeightKey].value;
};

/**
 * Line height utility functions
 */
export const lineHeightUtils = {
  /**
   * Convert unitless to pixel value
   */
  toPixels: (lineHeight: number, fontSize: number): number => {
    return Math.round(lineHeight * fontSize);
  },
  
  /**
   * Convert pixel to unitless value
   */
  toUnitless: (pixels: number, fontSize: number): number => {
    return pixels / fontSize;
  },
  
  /**
   * Check if line height provides good readability
   */
  isReadable: (lineHeight: number, fontSize: number): boolean => {
    const pixels = lineHeight * fontSize;
    // Minimum 4px leading for readability
    return pixels - fontSize >= 4;
  },
  
  /**
   * Get line height for optimal touch targets
   */
  getTouchTargetLineHeight: (fontSize: number, minHeight: number = 44): number => {
    return Math.max(minHeight / fontSize, 1.2);
  },
  
  /**
   * Calculate vertical spacing between elements
   */
  getVerticalSpacing: (lineHeight: number, fontSize: number, lines: number = 1): number => {
    return Math.round(lineHeight * fontSize * lines);
  }
};

/**
 * Type definitions
 */
export type LineHeightVariant = keyof typeof lineHeights;
export type FontSizeCategory = keyof typeof lineHeightsBySize;
export type SemanticLineHeight = keyof typeof semanticLineHeights;
export type ResponsiveBreakpoint = 'mobile' | 'tablet' | 'desktop';

/**
 * Validation utilities
 */
export const validateLineHeight = (config: LineHeightConfig): boolean => {
  return (
    typeof config.value === 'number' &&
    config.value > 0 &&
    config.value <= 3 &&
    typeof config.name === 'string' &&
    config.name.length > 0 &&
    typeof config.usage === 'string' &&
    config.usage.length > 0 &&
    typeof config.unitless === 'boolean'
  );
};

export default lineHeights;
