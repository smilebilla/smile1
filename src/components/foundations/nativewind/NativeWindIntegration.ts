/**
 * Corp Astro UI Library - NativeWind Integration System
 * 
 * This module integrates Corp Astro foundational tokens into NativeWind (Tailwind CSS for React Native)
 * Creates a complete theme extension for seamless NativeWind compatibility
 * 
 * @module NativeWindIntegration
 * @version 1.0.0
 * @since 2024
 */

// ============================================================================
// IMPORTS
// ============================================================================

import { deepSpaceColors } from '../tokens/colors/DeepSpaceColors';
import { SignatureBlues } from '../tokens/colors/SignatureBlues';
import { RoyalPurples } from '../tokens/colors/RoyalPurples';
import { LuxuryGolds } from '../tokens/colors/LuxuryGolds';
import { ProfessionalGrays } from '../tokens/colors/ProfessionalGrays';
import { spacing } from '../tokens/spacing/SpacingScale';

// ============================================================================
// NATIVEWIND THEME EXTENSION
// ============================================================================

/**
 * Complete Corp Astro theme extension for NativeWind
 * This object should be merged into the Tailwind config theme.extend
 */
export const corpAstroThemeExtension = {
  colors: {
    // Deep Space Colors
    'deep-space': {
      'void': deepSpaceColors.void,
      'deep': deepSpaceColors.deep,
      'dark': deepSpaceColors.dark,
      'medium': deepSpaceColors.medium,
    },
    
    // Signature Blues
    'signature-blue': {
      'primary': SignatureBlues.primary,
      'light': SignatureBlues.light,
      'glow': SignatureBlues.glow,
      'accent': SignatureBlues.accent,
    },
    
    // Royal Purples
    'royal-purple': {
      'deep': RoyalPurples.deep,
      'royal': RoyalPurples.royal,
      'light': RoyalPurples.light,
      'glow': RoyalPurples.glow,
    },
    
    // Luxury Golds
    'luxury-gold': {
      'pure': LuxuryGolds.pure,
      'champagne': LuxuryGolds.champagne,
      'bronze': LuxuryGolds.bronze,
      'shimmer': LuxuryGolds.shimmer,
    },
    
    // Professional Grays
    'professional-gray': {
      'light': ProfessionalGrays.light,
      'medium': ProfessionalGrays.medium,
      'text': ProfessionalGrays.text,
      'muted': ProfessionalGrays.muted,
    },
  },
  
  spacing: {
    'corp-xxs': `${spacing.xxs}px`,
    'corp-xs': `${spacing.xs}px`,
    'corp-sm': `${spacing.sm}px`,
    'corp-md': `${spacing.md}px`,
    'corp-lg': `${spacing.lg}px`,
    'corp-xl': `${spacing.xl}px`,
    'corp-xxl': `${spacing.xxl}px`,
    'corp-xxxl': `${spacing.xxxl}px`,
    'corp-huge': `${spacing.huge}px`,
  },
  
  fontFamily: {
    'corp-display': ['Didot', 'serif'],
    'corp-heading': ['Futura PT', 'sans-serif'],
    'corp-body': ['Inter', 'sans-serif'],
    'corp-accent': ['Cinzel', 'serif'],
  },
  
  fontSize: {
    'corp-xs': '12px',
    'corp-sm': '14px',
    'corp-base': '16px',
    'corp-lg': '18px',
    'corp-xl': '20px',
    'corp-2xl': '24px',
    'corp-3xl': '28px',
    'corp-4xl': '32px',
    'corp-5xl': '38px',
    'corp-6xl': '48px',
    'corp-7xl': '64px',
  },
  
  lineHeight: {
    'corp-tight': '1.2',
    'corp-normal': '1.4',
    'corp-relaxed': '1.6',
    'corp-loose': '1.8',
  },
  
  letterSpacing: {
    'corp-tight': '0px',
    'corp-normal': '0.5px',
    'corp-wide': '1px',
    'corp-wider': '1.5px',
  },
} as const;

// ============================================================================
// TAILWIND CONFIG UPDATE FUNCTION
// ============================================================================

/**
 * Function to update tailwind.config.js with Corp Astro theme
 * This should be called to integrate Corp Astro tokens into NativeWind
 */
export const updateTailwindConfig = () => {
  return {
    content: [
      "./App.{js,jsx,ts,tsx}",
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    presets: [require("nativewind/preset")],
    theme: {
      extend: corpAstroThemeExtension,
    },
    plugins: [],
  };
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get NativeWind class name for Corp Astro color
 */
export const getCorpAstroColorClass = (
  colorGroup: string,
  colorName: string,
  property: 'text' | 'bg' | 'border' = 'text'
): string => {
  return `${property}-${colorGroup}-${colorName}`;
};

/**
 * Get NativeWind class name for Corp Astro spacing
 */
export const getCorpAstroSpacingClass = (
  spacingKey: string,
  property: 'p' | 'm' | 'gap' | 'w' | 'h' = 'p'
): string => {
  return `${property}-corp-${spacingKey}`;
};

// ============================================================================
// EXPORTS
// ============================================================================

export default corpAstroThemeExtension;

// Export individual theme sections
export const corpAstroColors = corpAstroThemeExtension.colors;
export const corpAstroSpacing = corpAstroThemeExtension.spacing;
export const corpAstroFontFamily = corpAstroThemeExtension.fontFamily;
export const corpAstroFontSize = corpAstroThemeExtension.fontSize;
