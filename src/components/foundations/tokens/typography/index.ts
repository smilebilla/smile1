/**
 * Corp Astro UI Library - Typography Index
 */

// Font Families
export {
  fontFamilies,
  displayFont,
  headingFont,
  bodyFont,
  accentFont,
  monospaceFont,
  getFontFamily,
  getFontFamilyCSS,
  getPlatformFontFamily,
  getFontWeights,
  isFontWeightAvailable,
  getClosestFontWeight,
  loadFonts,
  validateFontFamily,
} from './FontFamilies';

// Font Family Types
export type {
  FontFamilyConfig,
  FontFamilyVariant,
  FontWeight,
  Platform,
} from './FontFamilies';

// Font Sizes
export {
  fontSizes,
  getResponsiveFontSize,
  scaleFontSize,
  validateFontSize,
} from './FontSizes';

// Font Size Types
export type {
  ResponsiveBreakpoint,
} from './FontSizes';

// Font Weights
export {
  fontWeights,
  FontWeightVariant,
  validateFontWeight,
} from './FontWeights';

// Letter Spacing
export {
  letterSpacings,
  getLetterSpacing,
  calculateLetterSpacing,
} from './LetterSpacing';

// Line Heights
export {
  lineHeights,
  getLineHeight,
  calculateLineHeightPixels,
  validateLineHeight,
} from './LineHeights';
