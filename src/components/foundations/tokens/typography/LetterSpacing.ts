/**
 * Letter Spacing - Corp Astro Design System
 * 
 * Letter spacing definitions for optimal readability and brand consistency.
 * Based on exact specifications from UI documentation.
 * 
 * @format
 */

export interface LetterSpacingConfig {
  value: number;
  name: string;
  usage: string;
  unit: 'px' | 'em' | '%';
  responsive?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
}

/**
 * Letter spacing definitions from UI documentation
 * 
 * From UI Docs: "// Letter Spacing
 * letterSpacing: {
 *   tight: -0.5,    // Large headlines
 *   normal: 0,      // Body text
 *   wide: 0.5,      // Small uppercase labels
 *   wider: 1.5,     // Special emphasis
 * }"
 */

/**
 * Tight letter spacing for large headlines
 */
export const tightLetterSpacing: LetterSpacingConfig = {
  value: -0.5,
  name: 'Tight',
  usage: 'Large headlines, display text',
  unit: 'px',
  responsive: {
    mobile: -0.25,
    tablet: -0.375,
    desktop: -0.5
  }
};

/**
 * Normal letter spacing for body text
 */
export const normalLetterSpacing: LetterSpacingConfig = {
  value: 0,
  name: 'Normal',
  usage: 'Body text, default spacing',
  unit: 'px',
  responsive: {
    mobile: 0,
    tablet: 0,
    desktop: 0
  }
};

/**
 * Wide letter spacing for small uppercase labels
 */
export const wideLetterSpacing: LetterSpacingConfig = {
  value: 0.5,
  name: 'Wide',
  usage: 'Small uppercase labels, buttons',
  unit: 'px',
  responsive: {
    mobile: 0.25,
    tablet: 0.375,
    desktop: 0.5
  }
};

/**
 * Wider letter spacing for special emphasis
 */
export const widerLetterSpacing: LetterSpacingConfig = {
  value: 1.5,
  name: 'Wider',
  usage: 'Special emphasis, luxury branding',
  unit: 'px',
  responsive: {
    mobile: 1.0,
    tablet: 1.25,
    desktop: 1.5
  }
};

/**
 * Extra tight letter spacing for very large text
 */
export const extraTightLetterSpacing: LetterSpacingConfig = {
  value: -1.0,
  name: 'Extra Tight',
  usage: 'Very large display text, hero titles',
  unit: 'px',
  responsive: {
    mobile: -0.5,
    tablet: -0.75,
    desktop: -1.0
  }
};

/**
 * Extra wide letter spacing for luxury feel
 */
export const extraWideLetterSpacing: LetterSpacingConfig = {
  value: 2.0,
  name: 'Extra Wide',
  usage: 'Luxury brand elements, spacious layouts',
  unit: 'px',
  responsive: {
    mobile: 1.5,
    tablet: 1.75,
    desktop: 2.0
  }
};

/**
 * Letter spacing variants collection
 */
export const letterSpacings = {
  extraTight: extraTightLetterSpacing,
  tight: tightLetterSpacing,
  normal: normalLetterSpacing,
  wide: wideLetterSpacing,
  wider: widerLetterSpacing,
  extraWide: extraWideLetterSpacing
} as const;

/**
 * Letter spacing mapping by font size and context
 */
export const letterSpacingByContext = {
  // Display text
  hero: 'extraTight',
  h1: 'tight',
  h2: 'tight',
  h3: 'normal',
  h4: 'normal',
  h5: 'normal',
  h6: 'normal',
  
  // Body text
  body: 'normal',
  bodyLarge: 'normal',
  bodySmall: 'normal',
  
  // UI elements
  button: 'wide',
  buttonSmall: 'wide',
  input: 'normal',
  label: 'normal',
  
  // Small text
  caption: 'normal',
  micro: 'wide',
  
  // Special contexts
  logo: 'wider',
  brand: 'wider',
  uppercase: 'wide',
  code: 'normal',
  
  // Navigation
  navItem: 'normal',
  tabItem: 'normal',
  breadcrumb: 'normal',
  
  // Data display
  metricValue: 'tight',
  metricLabel: 'wide',
  tableHeader: 'wide',
  
  // Luxury contexts
  luxury: 'extraWide',
  premium: 'wider',
  elegant: 'wider'
} as const;

/**
 * Get letter spacing value
 */
export const getLetterSpacing = (variant: keyof typeof letterSpacings): number => {
  return letterSpacings[variant].value;
};

/**
 * Get letter spacing for context
 */
export const getLetterSpacingForContext = (
  context: keyof typeof letterSpacingByContext
): number => {
  const spacingKey = letterSpacingByContext[context] as keyof typeof letterSpacings;
  return letterSpacings[spacingKey].value;
};

/**
 * Get responsive letter spacing
 */
export const getResponsiveLetterSpacing = (
  variant: keyof typeof letterSpacings,
  breakpoint: 'mobile' | 'tablet' | 'desktop'
): number => {
  const config = letterSpacings[variant];
  return config.responsive?.[breakpoint] || config.value;
};

/**
 * Get letter spacing as CSS value
 */
export const getLetterSpacingCSS = (variant: keyof typeof letterSpacings): string => {
  const config = letterSpacings[variant];
  return `${config.value}${config.unit}`;
};

/**
 * Get responsive letter spacing CSS
 */
export const getResponsiveLetterSpacingCSS = (variant: keyof typeof letterSpacings): string => {
  const config = letterSpacings[variant];
  const mobile = config.responsive?.mobile || config.value;
  const tablet = config.responsive?.tablet || config.value;
  const desktop = config.responsive?.desktop || config.value;
  
  return `
    letter-spacing: ${mobile}${config.unit};
    
    @media (min-width: 768px) {
      letter-spacing: ${tablet}${config.unit};
    }
    
    @media (min-width: 1024px) {
      letter-spacing: ${desktop}${config.unit};
    }
  `;
};

/**
 * Calculate letter spacing for font size
 */
export const calculateLetterSpacing = (
  fontSize: number,
  variant: keyof typeof letterSpacings
): number => {
  const baseSpacing = letterSpacings[variant].value;
  // Scale letter spacing based on font size
  const scaleFactor = fontSize / 16; // 16px is base
  return baseSpacing * scaleFactor;
};

/**
 * Convert letter spacing units
 */
export const convertLetterSpacing = {
  /**
   * Convert px to em
   */
  pxToEm: (px: number, fontSize: number): number => {
    return px / fontSize;
  },
  
  /**
   * Convert em to px
   */
  emToPx: (em: number, fontSize: number): number => {
    return em * fontSize;
  },
  
  /**
   * Convert px to percentage
   */
  pxToPercent: (px: number, fontSize: number): number => {
    return (px / fontSize) * 100;
  },
  
  /**
   * Convert percentage to px
   */
  percentToPx: (percent: number, fontSize: number): number => {
    return (percent / 100) * fontSize;
  }
};

/**
 * Semantic letter spacing mapping
 */
export const semanticLetterSpacings = {
  // Typography hierarchy
  heroTitle: 'extraTight',
  pageTitle: 'tight',
  sectionTitle: 'tight',
  cardTitle: 'normal',
  subTitle: 'normal',
  
  // Body content
  bodyDefault: 'normal',
  bodyReading: 'normal',
  bodyCompact: 'normal',
  
  // UI elements
  buttonPrimary: 'wide',
  buttonSecondary: 'wide',
  buttonGhost: 'normal',
  inputText: 'normal',
  labelText: 'normal',
  
  // Navigation
  navItem: 'normal',
  tabItem: 'normal',
  breadcrumb: 'normal',
  
  // Data display
  metricValue: 'tight',
  metricLabel: 'wide',
  tableCell: 'normal',
  tableHeader: 'wide',
  
  // Brand elements
  logoText: 'wider',
  brandText: 'wider',
  luxuryText: 'extraWide',
  
  // Special contexts
  uppercaseText: 'wide',
  codeText: 'normal',
  quotationText: 'normal'
} as const;

/**
 * Get semantic letter spacing
 */
export const getSemanticLetterSpacing = (
  semantic: keyof typeof semanticLetterSpacings
): number => {
  const spacingKey = semanticLetterSpacings[semantic] as keyof typeof letterSpacings;
  return letterSpacings[spacingKey].value;
};

/**
 * Letter spacing utility functions
 */
export const letterSpacingUtils = {
  /**
   * Check if letter spacing is appropriate for font size
   */
  isAppropriate: (spacing: number, fontSize: number): boolean => {
    // Avoid too tight spacing on small text
    if (fontSize <= 14 && spacing < -0.25) return false;
    // Avoid too wide spacing on large text
    if (fontSize >= 32 && spacing > 1.0) return false;
    return true;
  },
  
  /**
   * Get optimal letter spacing for readability
   */
  getOptimal: (fontSize: number, isUppercase: boolean = false): number => {
    if (isUppercase) {
      return fontSize <= 14 ? 0.5 : 0.25;
    }
    
    if (fontSize <= 14) return 0;
    if (fontSize <= 18) return 0;
    if (fontSize <= 24) return -0.25;
    if (fontSize <= 32) return -0.5;
    return -0.75;
  },
  
  /**
   * Scale letter spacing proportionally
   */
  scale: (baseSpacing: number, fontSize: number, baseSize: number = 16): number => {
    const scale = fontSize / baseSize;
    return baseSpacing * scale;
  },
  
  /**
   * Get letter spacing for tracking effect
   */
  getTracking: (level: 'subtle' | 'moderate' | 'dramatic'): number => {
    switch (level) {
      case 'subtle': return 0.25;
      case 'moderate': return 0.5;
      case 'dramatic': return 1.0;
      default: return 0;
    }
  }
};

/**
 * Type definitions
 */
export type LetterSpacingVariant = keyof typeof letterSpacings;
export type LetterSpacingContext = keyof typeof letterSpacingByContext;
export type SemanticLetterSpacing = keyof typeof semanticLetterSpacings;
export type ResponsiveBreakpoint = 'mobile' | 'tablet' | 'desktop';

/**
 * Validation utilities
 */
export const validateLetterSpacing = (config: LetterSpacingConfig): boolean => {
  return (
    typeof config.value === 'number' &&
    config.value >= -2 &&
    config.value <= 5 &&
    typeof config.name === 'string' &&
    config.name.length > 0 &&
    typeof config.usage === 'string' &&
    config.usage.length > 0 &&
    ['px', 'em', '%'].includes(config.unit)
  );
};

export default letterSpacings;
