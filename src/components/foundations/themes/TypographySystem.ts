/**
 * Typography System Implementation - Module 2
 * 
 * Comprehensive typography utility system that applies the cosmic dark theme
 * typography tokens throughout the Corp Astro mobile app.
 * 
 * @module TypographySystem
 * @version 1.0.0
 * @author GitHub Copilot - Cosmic Transformation Project
 * @created 2025-07-01
 */

import { StyleSheet, TextStyle, Platform } from 'react-native';
import DarkTheme from './DarkTheme';

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export type TypographyVariant = 
  | 'hero'
  | 'h1' 
  | 'h2'
  | 'h3'
  | 'h4'
  | 'body'
  | 'small'
  | 'caption'
  | 'micro';

export type FontFamily = 
  | 'display'
  | 'heading'
  | 'body'
  | 'accent'
  | 'mono';

export type FontWeight = 
  | 'light'
  | 'regular'
  | 'medium'
  | 'semibold'
  | 'bold';

export type TextColor = 
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'accent'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'mystic'
  | 'gold'
  | 'white';

export interface TypographyStyle {
  fontSize: number;
  fontFamily: string;
  fontWeight: '300' | '400' | '500' | '600' | '700';
  lineHeight: number;  
  letterSpacing: number;
  color: string;
}

// =============================================================================
// FONT FAMILY SYSTEM
// =============================================================================

/**
 * Font family utilities with fallbacks for cross-platform compatibility
 */
export const fontFamilies = {
  display: DarkTheme.typography.fontFamily.display.family,
  heading: DarkTheme.typography.fontFamily.heading.family,
  body: DarkTheme.typography.fontFamily.body.family,
  accent: DarkTheme.typography.fontFamily.accent.family,
  monospace: DarkTheme.typography.fontFamily.monospace.family,
};

// =============================================================================
// COLOR SYSTEM FOR TYPOGRAPHY
// =============================================================================

/**
 * Semantic color system for typography in dark cosmic theme
 */
export const textColors = {
  primary: DarkTheme.colors.neutral.text,        // Main readable text
  secondary: DarkTheme.colors.neutral.light,     // Light text
  tertiary: DarkTheme.colors.neutral.muted,      // Muted/disabled text
  accent: DarkTheme.colors.brand.accent,         // Accent blue
  success: DarkTheme.colors.brand.primary,       // Use brand primary for success
  warning: DarkTheme.colors.luxury.champagne,    // Use champagne gold for warning
  error: DarkTheme.colors.mystical.royal,        // Use royal purple for error
  info: DarkTheme.colors.brand.light,            // Use brand light for info
  mystic: DarkTheme.colors.mystical.light,       // Mystical elements
  gold: DarkTheme.colors.luxury.pure,            // Premium elements
  white: DarkTheme.colors.neutral.light,         // Pure white (light gray)
};

// =============================================================================
// TYPOGRAPHY VARIANTS
// =============================================================================

/**
 * Complete typography variant system following design tokens
 */
export const typographyVariants: Record<TypographyVariant, TypographyStyle> = {
  hero: {
    fontSize: DarkTheme.typography.fontSize.hero.size,
    fontFamily: fontFamilies.display,
    fontWeight: DarkTheme.typography.fontWeight.bold.weight.toString() as TypographyStyle['fontWeight'],
    lineHeight: DarkTheme.typography.lineHeight.tight.value,
    letterSpacing: DarkTheme.typography.letterSpacing.tight.value,
    color: textColors.primary.toString(),
  },
  h1: {
    fontSize: DarkTheme.typography.fontSize.h1.size,
    fontFamily: fontFamilies.heading,
    fontWeight: DarkTheme.typography.fontWeight.bold.weight.toString() as TypographyStyle['fontWeight'],
    lineHeight: DarkTheme.typography.lineHeight.tight.value,
    letterSpacing: DarkTheme.typography.letterSpacing.tight.value,
    color: textColors.primary.toString(),
  },
  h2: {
    fontSize: DarkTheme.typography.fontSize.h2.size,
    fontFamily: fontFamilies.heading,
    fontWeight: DarkTheme.typography.fontWeight.semiBold.weight.toString() as TypographyStyle['fontWeight'],
    lineHeight: DarkTheme.typography.lineHeight.tight.value,
    letterSpacing: DarkTheme.typography.letterSpacing.normal.value,
    color: textColors.primary.toString(),
  },
  h3: {
    fontSize: DarkTheme.typography.fontSize.h3.size,
    fontFamily: fontFamilies.heading,
    fontWeight: DarkTheme.typography.fontWeight.semiBold.weight.toString() as TypographyStyle['fontWeight'],
    lineHeight: DarkTheme.typography.lineHeight.normal.value,
    letterSpacing: DarkTheme.typography.letterSpacing.normal.value,
    color: textColors.primary.toString(),
  },
  h4: {
    fontSize: DarkTheme.typography.fontSize.h4.size,
    fontFamily: fontFamilies.heading,
    fontWeight: DarkTheme.typography.fontWeight.medium.weight.toString() as TypographyStyle['fontWeight'],
    lineHeight: DarkTheme.typography.lineHeight.normal.value,
    letterSpacing: DarkTheme.typography.letterSpacing.normal.value,
    color: textColors.primary.toString(),
  },
  body: {
    fontSize: DarkTheme.typography.fontSize.body.size,
    fontFamily: fontFamilies.body,
    fontWeight: DarkTheme.typography.fontWeight.regular.weight.toString() as TypographyStyle['fontWeight'],
    lineHeight: DarkTheme.typography.lineHeight.normal.value,
    letterSpacing: DarkTheme.typography.letterSpacing.normal.value,
    color: textColors.secondary.toString(),
  },
  small: {
    fontSize: DarkTheme.typography.fontSize.small.size,
    fontFamily: fontFamilies.body,
    fontWeight: DarkTheme.typography.fontWeight.regular.weight.toString() as TypographyStyle['fontWeight'],
    lineHeight: DarkTheme.typography.lineHeight.normal.value,
    letterSpacing: DarkTheme.typography.letterSpacing.normal.value,
    color: textColors.secondary.toString(),
  },
  caption: {
    fontSize: DarkTheme.typography.fontSize.caption.size,
    fontFamily: fontFamilies.body,
    fontWeight: DarkTheme.typography.fontWeight.medium.weight.toString() as TypographyStyle['fontWeight'],
    lineHeight: DarkTheme.typography.lineHeight.normal.value,
    letterSpacing: DarkTheme.typography.letterSpacing.wide.value,
    color: textColors.tertiary.toString(),
  },
  micro: {
    fontSize: DarkTheme.typography.fontSize.micro.size,
    fontFamily: fontFamilies.body,
    fontWeight: DarkTheme.typography.fontWeight.medium.weight.toString() as TypographyStyle['fontWeight'],
    lineHeight: DarkTheme.typography.lineHeight.normal.value,
    letterSpacing: DarkTheme.typography.letterSpacing.wide.value,
    color: textColors.tertiary.toString(),
  },
};

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Get typography style for a specific variant
 */
export const getTypographyStyle = (
  variant: TypographyVariant,
  color?: TextColor,
  customProps?: Partial<TypographyStyle>
): TextStyle => {
  const baseStyle = typographyVariants[variant];
  const finalColor = color ? textColors[color].toString() : baseStyle.color;

  return {
    ...baseStyle,
    color: finalColor,
    ...customProps,
  };
};

/**
 * Get font family for a specific type
 */
export const getFontFamily = (type: FontFamily): string => {
  // Map 'mono' to 'monospace' for backward compatibility
  const key = type === 'mono' ? 'monospace' : type;
  return fontFamilies[key];
};

/**
 * Get text color by semantic meaning
 */
export const getTextColor = (color: TextColor): string => {
  return textColors[color].toString();
};

/**
 * Create custom typography style from design tokens
 */
export const createTypographyStyle = (
  fontSize: number,
  fontFamily: FontFamily = 'body',
  fontWeight: FontWeight = 'regular',
  color: TextColor = 'secondary',
  customProps?: Partial<TypographyStyle>
): TextStyle => {
  const fwObj = DarkTheme.typography.fontWeight[fontWeight === 'semibold' ? 'semiBold' : fontWeight];
  let fw = typeof fwObj === 'object' && 'weight' in fwObj ? fwObj.weight.toString() : '400';
  const allowed: TypographyStyle['fontWeight'][] = ['300', '400', '500', '600', '700'];
  if (!allowed.includes(fw as any)) fw = '400';
  return {
    fontSize,
    fontFamily: getFontFamily(fontFamily),
    fontWeight: fw as TypographyStyle['fontWeight'],
    lineHeight: DarkTheme.typography.lineHeight.normal.value,
    letterSpacing: DarkTheme.typography.letterSpacing.normal.value,
    color: getTextColor(color),
    ...customProps,
  };
};

// =============================================================================
// PREDEFINED STYLES
// =============================================================================

/**
 * Predefined StyleSheet for common typography patterns
 */
export const typographyStyles = StyleSheet.create({
  // Hero styles
  hero: getTypographyStyle('hero'),
  heroAccent: getTypographyStyle('hero', 'accent'),
  heroMystic: getTypographyStyle('hero', 'mystic'),
  
  // Heading styles
  h1: getTypographyStyle('h1'),
  h1Accent: getTypographyStyle('h1', 'accent'),
  h2: getTypographyStyle('h2'),
  h2Accent: getTypographyStyle('h2', 'accent'),
  h3: getTypographyStyle('h3'),
  h3Accent: getTypographyStyle('h3', 'accent'),
  h4: getTypographyStyle('h4'),
  h4Accent: getTypographyStyle('h4', 'accent'),
  
  // Body styles
  body: getTypographyStyle('body'),
  bodyPrimary: getTypographyStyle('body', 'primary'),
  bodyAccent: getTypographyStyle('body', 'accent'),
  
  // Small and caption styles
  small: getTypographyStyle('small'),
  smallPrimary: getTypographyStyle('small', 'primary'),
  caption: getTypographyStyle('caption'),
  captionAccent: getTypographyStyle('caption', 'accent'),
  micro: getTypographyStyle('micro'),
  
  // Semantic styles
  success: getTypographyStyle('body', 'success'),
  warning: getTypographyStyle('body', 'warning'),
  error: getTypographyStyle('body', 'error'),
  info: getTypographyStyle('body', 'info'),
  
  // Special cosmic styles
  mysticText: getTypographyStyle('body', 'mystic'),
  goldText: getTypographyStyle('body', 'gold'),
  accentText: getTypographyStyle('body', 'accent'),
  
  // Accent font styles for mystical elements
  mysticAccent: {
    ...getTypographyStyle('body', 'mystic'),
    fontFamily: fontFamilies.accent,
  },
  goldAccent: {
    ...getTypographyStyle('body', 'gold'),
    fontFamily: fontFamilies.accent,
  },
  
  // Interactive text styles
  link: {
    ...getTypographyStyle('body', 'accent'),
    textDecorationLine: 'underline',
  },
  button: getTypographyStyle('body', 'primary', {
    fontWeight: DarkTheme.typography.fontWeight.medium.weight.toString() as TypographyStyle['fontWeight'],
  }),
  
  // Input field styles
  inputText: getTypographyStyle('body', 'primary'),
  inputPlaceholder: getTypographyStyle('body', 'tertiary'),
  inputLabel: getTypographyStyle('small', 'secondary'),
  
  // Card styles
  cardTitle: getTypographyStyle('h3', 'primary'),
  cardSubtitle: getTypographyStyle('small', 'secondary'),
  cardBody: getTypographyStyle('body', 'secondary'),
});

// =============================================================================
// RESPONSIVE TYPOGRAPHY
// =============================================================================

/**
 * Responsive typography utilities for different screen sizes
 */
export const getResponsiveTypography = (
  variant: TypographyVariant,
  screenWidth: number
): TypographyStyle => {
  const baseStyle = typographyVariants[variant];
  
  // Scale factor based on screen width
  let scaleFactor = 1;
  if (screenWidth < 375) {
    scaleFactor = 0.9; // Smaller screens
  } else if (screenWidth > 414) {
    scaleFactor = 1.1; // Larger screens
  }
  
  return {
    ...baseStyle,
    fontSize: Math.round(baseStyle.fontSize * scaleFactor),
  };
};

// =============================================================================
// VALIDATION AND TESTING
// =============================================================================

/**
 * Validate typography system implementation
 */
export const validateTypographySystem = (): boolean => {
  try {
    // Test that all variants exist and are accessible
    const variants: TypographyVariant[] = ['hero', 'h1', 'h2', 'h3', 'h4', 'body', 'small', 'caption', 'micro'];
    const colors: TextColor[] = ['primary', 'secondary', 'tertiary', 'accent', 'success', 'warning', 'error', 'info'];
    const families: FontFamily[] = ['display', 'heading', 'body', 'accent', 'mono'];
    
    // Test variant access
    for (const variant of variants) {
      const style = getTypographyStyle(variant);
      if (!style || !style.fontSize || !style.fontFamily || !style.color) {
        console.error(`Typography variant ${variant} validation failed`);
        return false;
      }
    }
    
    // Test color access
    for (const color of colors) {
      const textColor = getTextColor(color);
      if (!textColor) {
        console.error(`Text color ${color} validation failed`);
        return false;
      }
    }
    
    // Test font family access
    for (const family of families) {
      const fontFamily = getFontFamily(family);
      if (!fontFamily) {
        console.error(`Font family ${family} validation failed`);
        return false;
      }
    }
    
    console.log('✅ Typography system validation passed!');
    return true;
  } catch (error) {
    console.error('❌ Typography system validation failed:', error);
    return false;
  }
};

/**
 * Default export for easy consumption
 */
export default {
  getTypographyStyle,
  getFontFamily,
  getTextColor,
  createTypographyStyle,
  getResponsiveTypography,
  validateTypographySystem,
  styles: typographyStyles,
  variants: typographyVariants,
  colors: textColors,
  families: fontFamilies,
};
