/**
 * Corp Astro UI Library - Dark Theme Configuration
 * 
 * Complete dark theme configuration combining all foundational tokens into a cohesive theme object.
 * This is the primary theme for Corp Astro, designed for the cosmic dark aesthetic.
 * 
 * @module DarkTheme
 * @version 1.0.0
 * @since 2024
 * 
 * UI Documentation Reference:
 * - Design Tokens: Complete theme object combining all tokens
 * - Design System: Theme usage patterns and guidelines
 * - Developer Handoff: Theme implementation requirements
 */

import { ColorValue } from 'react-native';

// Import all foundational tokens
import { deepSpaceColors } from '../tokens/colors/DeepSpaceColors';
import { SignatureBlues } from '../tokens/colors/SignatureBlues';
import { RoyalPurples } from '../tokens/colors/RoyalPurples';
import { LuxuryGolds } from '../tokens/colors/LuxuryGolds';
import { ProfessionalGrays } from '../tokens/colors/ProfessionalGrays';

import { heroGradients } from '../tokens/gradients/HeroGradients';
import { buttonGradients } from '../tokens/gradients/ButtonGradients';
import { navigationGradients } from '../tokens/gradients/NavigationGradients';
import { floatingGradients } from '../tokens/gradients/FloatingGradients';

import { fontFamilies } from '../tokens/typography/FontFamilies';
import { fontSizes } from '../tokens/typography/FontSizes';
import { fontWeights } from '../tokens/typography/FontWeights';
import { lineHeights } from '../tokens/typography/LineHeights';
import { letterSpacings } from '../tokens/typography/LetterSpacing';

import { spacing } from '../tokens/spacing/SpacingScale';

// ============================================================================
// THEME STRUCTURE TYPES
// ============================================================================

/**
 * Color system interface for theme
 */
export interface ThemeColors {
  // Deep Space Colors (Primary Background System)
  cosmos: {
    void: ColorValue;
    deep: ColorValue;
    dark: ColorValue;
    medium: ColorValue;
  };
  
  // Signature Blues (Brand System)
  brand: {
    primary: ColorValue;
    light: ColorValue;
    glow: ColorValue;
    accent: ColorValue;
  };
  
  // Royal Purples (Mystical System)
  mystical: {
    deep: ColorValue;
    royal: ColorValue;
    light: ColorValue;
    glow: ColorValue;
  };
  
  // Luxury Golds (Premium System)
  luxury: {
    pure: ColorValue;
    champagne: ColorValue;
    bronze: ColorValue;
    shimmer: ColorValue;
  };
  
  // Professional Grays (Text System)
  neutral: {
    light: ColorValue;
    medium: ColorValue;
    text: ColorValue;
    muted: ColorValue;
  };
}

/**
 * Gradient system interface for theme
 */
export interface ThemeGradients {
  hero: typeof heroGradients;
  button: typeof buttonGradients;
  navigation: typeof navigationGradients;
  floating: typeof floatingGradients;
}

/**
 * Typography system interface for theme
 */
export interface ThemeTypography {
  fontFamily: typeof fontFamilies;
  fontSize: typeof fontSizes;
  fontWeight: typeof fontWeights;
  lineHeight: typeof lineHeights;
  letterSpacing: typeof letterSpacings;
}

/**
 * Spacing system interface for theme
 */
export interface ThemeSpacing {
  xxs: number;
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
  xxxl: number;
  huge: number;
  base: number;
}

/**
 * Border radius system for theme
 */
export interface ThemeBorderRadius {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
  full: number;
}

/**
 * Shadow system for theme
 */
export interface ThemeShadows {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  cosmic: string;
  glow: string;
}

/**
 * Animation system for theme
 */
export interface ThemeAnimation {
  duration: {
    fast: number;
    normal: number;
    slow: number;
    orbital: number;
  };
  easing: {
    ease: string;
    easeIn: string;
    easeOut: string;
    easeInOut: string;
    orbital: string;
  };
}

/**
 * Z-index system for theme
 */
export interface ThemeZIndex {
  base: number;
  dropdown: number;
  modal: number;
  popover: number;
  toast: number;
  tooltip: number;
  overlay: number;
  max: number;
}

/**
 * Opacity system for theme
 */
export interface ThemeOpacity {
  disabled: number;
  hover: number;
  focus: number;
  backdrop: number;
  glassMorphism: number;
}

/**
 * Breakpoints system for theme
 */
export interface ThemeBreakpoints {
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

/**
 * Component-specific theme configurations
 */
export interface ThemeComponents {
  button: {
    height: {
      sm: number;
      md: number;
      lg: number;
    };
    borderRadius: number;
    padding: {
      sm: number;
      md: number;
      lg: number;
    };
  };
  
  card: {
    borderRadius: number;
    padding: number;
    shadow: string;
    backdrop: string;
  };
  
  input: {
    height: number;
    borderRadius: number;
    padding: number;
    border: string;
    focusBorder: string;
  };
  
  navigation: {
    height: number;
    padding: number;
    backdrop: string;
  };
  
  glassMorphism: {
    backdrop: string;
    border: string;
    shadow: string;
  };
}

/**
 * Complete Corp Astro Dark Theme interface
 */
export interface CorpAstroDarkTheme {
  colors: ThemeColors;
  gradients: ThemeGradients;
  typography: ThemeTypography;
  spacing: ThemeSpacing;
  borderRadius: ThemeBorderRadius;
  shadows: ThemeShadows;
  animation: ThemeAnimation;
  zIndex: ThemeZIndex;
  opacity: ThemeOpacity;
  breakpoints: ThemeBreakpoints;
  components: ThemeComponents;
}

// ============================================================================
// CORP ASTRO DARK THEME IMPLEMENTATION
// ============================================================================

/**
 * Complete Corp Astro Dark Theme Configuration
 * Combines all foundational tokens into a cohesive theme object
 * 
 * @validated-against UI Docs/Design Tokens .md lines 1149-1197
 * @validated-against UI Docs/Design Sytem.md lines 2920-2980
 */
export const corpAstroDarkTheme: CorpAstroDarkTheme = {
  // Color System
  colors: {
    cosmos: {
      void: deepSpaceColors.void,
      deep: deepSpaceColors.deep,
      dark: deepSpaceColors.dark,
      medium: deepSpaceColors.medium,
    },
    brand: {
      primary: SignatureBlues.primary,
      light: SignatureBlues.light,
      glow: SignatureBlues.glow,
      accent: SignatureBlues.accent,
    },
    mystical: {
      deep: RoyalPurples.deep,
      royal: RoyalPurples.royal,
      light: RoyalPurples.light,
      glow: RoyalPurples.glow,
    },
    luxury: {
      pure: LuxuryGolds.pure,
      champagne: LuxuryGolds.champagne,
      bronze: LuxuryGolds.bronze,
      shimmer: LuxuryGolds.shimmer,
    },
    neutral: {
      light: ProfessionalGrays.light,
      medium: ProfessionalGrays.medium,
      text: ProfessionalGrays.text,
      muted: ProfessionalGrays.muted,
    },
  },
  
  // Gradient System
  gradients: {
    hero: heroGradients,
    button: buttonGradients,
    navigation: navigationGradients,
    floating: floatingGradients,
  },
  
  // Typography System
  typography: {
    fontFamily: fontFamilies,
    fontSize: fontSizes,
    fontWeight: fontWeights,
    lineHeight: lineHeights,
    letterSpacing: letterSpacings,
  },
  
  // Spacing System
  spacing: {
    xxs: spacing.xxs,
    xs: spacing.xs,
    sm: spacing.sm,
    md: spacing.md,
    lg: spacing.lg,
    xl: spacing.xl,
    xxl: spacing.xxl,
    xxxl: spacing.xxxl,
    huge: spacing.huge,
    base: spacing.base,
  },
  
  // Border Radius System
  borderRadius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
    full: 9999,
  },
  
  // Shadow System
  shadows: {
    sm: '0 2px 4px rgba(0, 0, 0, 0.1)',
    md: '0 4px 8px rgba(0, 0, 0, 0.15)',
    lg: '0 8px 16px rgba(0, 0, 0, 0.2)',
    xl: '0 16px 32px rgba(0, 0, 0, 0.25)',
    cosmic: '0 20px 60px rgba(0, 0, 0, 0.5)',
    glow: '0 0 20px rgba(46, 134, 222, 0.5)',
  },
  
  // Animation System
  animation: {
    duration: {
      fast: 150,
      normal: 300,
      slow: 500,
      orbital: 20000,
    },
    easing: {
      ease: 'ease',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
      orbital: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
  },
  
  // Z-Index System
  zIndex: {
    base: 0,
    dropdown: 1000,
    modal: 1050,
    popover: 1060,
    toast: 1070,
    tooltip: 1080,
    overlay: 1090,
    max: 2147483647,
  },
  
  // Opacity System
  opacity: {
    disabled: 0.5,
    hover: 0.8,
    focus: 0.9,
    backdrop: 0.8,
    glassMorphism: 0.1,
  },
  
  // Breakpoints System
  breakpoints: {
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
  },
  
  // Component-Specific Configurations
  components: {
    button: {
      height: {
        sm: 44,
        md: 56,
        lg: 64,
      },
      borderRadius: 16,
      padding: {
        sm: 12,
        md: 16,
        lg: 20,
      },
    },
    card: {
      borderRadius: 24,
      padding: 24,
      shadow: '0 16px 48px rgba(46, 134, 222, 0.2)',
      backdrop: 'rgba(22, 33, 62, 0.3)',
    },
    input: {
      height: 56,
      borderRadius: 16,
      padding: 16,
      border: '1px solid rgba(255, 255, 255, 0.1)',
      focusBorder: '1px solid rgba(46, 134, 222, 0.5)',
    },
    navigation: {
      height: 90,
      padding: 16,
      backdrop: 'rgba(8, 8, 15, 0.9)',
    },
    glassMorphism: {
      backdrop: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      shadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    },
  },
} as const;

// ============================================================================
// THEME UTILITIES
// ============================================================================

/**
 * Get color value from theme
 * @param colorPath - Path to color (e.g., 'cosmos.void', 'brand.primary')
 * @returns Color value
 */
export const getThemeColor = (colorPath: string): ColorValue => {
  const paths = colorPath.split('.');
  let value: any = corpAstroDarkTheme.colors;
  
  for (const path of paths) {
    value = value[path];
    if (value === undefined) {
      console.warn(`Color path '${colorPath}' not found in theme`);
      return '#000000';
    }
  }
  
  return value as ColorValue;
};

/**
 * Get spacing value from theme
 * @param spacingKey - Spacing key (e.g., 'xs', 'md', 'lg')
 * @returns Spacing value in pixels
 */
export const getThemeSpacing = (spacingKey: keyof ThemeSpacing): number => {
  return corpAstroDarkTheme.spacing[spacingKey];
};

/**
 * Get component configuration from theme
 * @param componentKey - Component key (e.g., 'button', 'card')
 * @returns Component configuration object
 */
export const getThemeComponent = (componentKey: keyof ThemeComponents) => {
  return corpAstroDarkTheme.components[componentKey];
};

// ============================================================================
// THEME VALIDATION
// ============================================================================

/**
 * Validate theme completeness
 * Ensures all required theme properties are present
 */
export const validateTheme = (): boolean => {
  const requiredKeys = [
    'colors', 'gradients', 'typography', 'spacing', 'borderRadius',
    'shadows', 'animation', 'zIndex', 'opacity', 'breakpoints', 'components'
  ];
  
  for (const key of requiredKeys) {
    if (!(key in corpAstroDarkTheme)) {
      console.error(`Missing theme property: ${key}`);
      return false;
    }
  }
  
  return true;
};

// ============================================================================
// EXPORTS
// ============================================================================

// Freeze the theme object to prevent mutations
export default Object.freeze(corpAstroDarkTheme);

// Export type for theme consumers
export type { CorpAstroDarkTheme as CorpAstroTheme };

// Export individual theme sections
export const themeColors = corpAstroDarkTheme.colors;
export const themeGradients = corpAstroDarkTheme.gradients;
export const themeTypography = corpAstroDarkTheme.typography;
export const themeSpacing = corpAstroDarkTheme.spacing;
export const themeComponents = corpAstroDarkTheme.components;
