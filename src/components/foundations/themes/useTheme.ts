/**
 * Corp Astro UI Library - Theme Access Hook
 * 
 * Optimized React hook for accessing Corp Astro theme values throughout components.
 * Provides efficient theme access with performance optimizations and memoization.
 * 
 * @module useTheme
 * @version 1.0.0
 * @since 2024
 * 
 * UI Documentation Reference:
 * - Design System: Theme usage patterns (lines 2944-2970)
 * - Developer Handoff Guide: Theme hook implementation
 * - Design Tokens: Theme access requirements and best practices
 */

import { useMemo } from 'react';
import { CorpAstroDarkTheme as CorpAstroTheme } from './DarkTheme';
import { useTheme as useThemeProvider } from './ThemeProvider';

// ============================================================================
// THEME HOOK TYPES
// ============================================================================

/**
 * Theme hook return type
 * Defines the structure returned by the useTheme hook
 */
export interface UseThemeReturn {
  /** Complete theme object */
  theme: CorpAstroTheme;
  /** Theme colors */
  colors: CorpAstroTheme['colors'];
  /** Theme spacing */
  spacing: CorpAstroTheme['spacing'];
  /** Theme typography */
  typography: CorpAstroTheme['typography'];
  /** Theme gradients */
  gradients: CorpAstroTheme['gradients'];
  /** Theme border radius */
  borderRadius: CorpAstroTheme['borderRadius'];
  /** Theme shadows */
  shadows: CorpAstroTheme['shadows'];
  /** Theme animation */
  animation: CorpAstroTheme['animation'];
  /** Theme component tokens */
  components: CorpAstroTheme['components'];
  /** Whether current theme is dark */
  isDark: boolean;
  /** Theme utilities */
  utils: {
    /** Get color with alpha */
    getColorWithAlpha: (color: string, alpha: number) => string;
    /** Get responsive spacing */
    getSpacing: (size: keyof CorpAstroTheme['spacing']) => number;
    /** Get typography style */
    getTypography: (variant: string) => object;
    /** Get gradient string */
    getGradient: (gradient: string) => string;
  };
}

/**
 * Theme hook configuration options
 */
export interface UseThemeOptions {
  /** Enable memoization for performance */
  memoize?: boolean;
  /** Include theme utilities */
  includeUtils?: boolean;
  /** Track theme changes */
  trackChanges?: boolean;
}

// ============================================================================
// CORE THEME HOOK
// ============================================================================

/**
 * Corp Astro Theme Hook
 * 
 * Primary hook for accessing Corp Astro theme values in components.
 * Provides optimized access to theme tokens with built-in utilities.
 * 
 * @param options - Optional configuration for the hook
 * @returns Complete theme object with utilities
 * 
 * @example
 * ```tsx
 * import { useTheme } from '@/foundations/themes/useTheme';
 * 
 * function MyComponent() {
 *   const theme = useTheme();
 *   
 *   return (
 *     <View style={{
 *       backgroundColor: theme.colors.cosmos.deep,
 *       padding: theme.spacing.lg,
 *     }}>
 *       <Text style={{ color: theme.colors.text.primary }}>
 *         Corp Astro UI
 *       </Text>
 *     </View>
 *   );
 * }
 * ```
 * 
 * @example
 * ```tsx
 * // With destructuring for specific sections
 * function StyledComponent() {
 *   const { colors, spacing, typography } = useTheme();
 *   
 *   return (
 *     <View style={{
 *       backgroundColor: colors.cosmos.deep,
 *       padding: spacing.md,
 *     }}>
 *       <Text style={typography.body.regular}>
 *         Optimized theme access
 *       </Text>
 *     </View>
 *   );
 * }
 * ```
 * 
 * @validated-against UI Docs/Design Sytem.md lines 2944-2970
 */
export const useTheme = (options: UseThemeOptions = {}): UseThemeReturn => {
  const { memoize = true, includeUtils = true, trackChanges = false } = options;
  
  // Get theme context
  const { theme, isDark } = useThemeProvider();
  
  // Utility functions for theme manipulation
  const utils = useMemo(() => ({
    /**
     * Get color with alpha transparency
     * @param color - Base color hex value
     * @param alpha - Alpha value (0-1)
     * @returns RGBA color string
     */
    getColorWithAlpha: (color: string, alpha: number): string => {
      // Remove # if present
      const hex = color.replace('#', '');
      
      // Parse hex to RGB
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);
      
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    },
    
    /**
     * Get responsive spacing value
     * @param size - Spacing token key
     * @returns Spacing value in pixels
     */
    getSpacing: (size: keyof CorpAstroTheme['spacing']): number => {
      return theme.spacing[size];
    },
    
    /**
     * Get typography style object
     * @param variant - Typography variant path (e.g., 'heading.h1')
     * @returns Typography style object
     */
    getTypography: (variant: string): object => {
      const parts = variant.split('.');
      let current: any = theme.typography;
      
      for (const part of parts) {
        if (current && typeof current === 'object' && part in current) {
          current = current[part];
        } else {
          return {};
        }
      }
      
      return current || {};
    },
    
    /**
     * Get gradient CSS string
     * @param gradient - Gradient key
     * @returns CSS gradient string
     */
    getGradient: (gradient: string): string => {
      const gradientObj = theme.gradients[gradient as keyof typeof theme.gradients];
      if (!gradientObj) return '';
      
      // Handle different gradient structures
      if (typeof gradientObj === 'object' && 'primary' in gradientObj) {
        return (gradientObj as any).primary || '';
      }
      
      // Handle direct gradient objects
      if (typeof gradientObj === 'object' && 'colors' in gradientObj) {
        const { colors, locations, angle } = gradientObj as any;
        const colorStops = colors.map((color: string, index: number) => 
          `${color} ${(locations[index] * 100).toFixed(0)}%`
        ).join(', ');
        return `linear-gradient(${angle}deg, ${colorStops})`;
      }
      
      return '';
    },
  }), [theme]);
  
  // Memoized theme return object
  const themeReturn = useMemo<UseThemeReturn>(() => ({
    theme,
    colors: theme.colors,
    spacing: theme.spacing,
    typography: theme.typography,
    gradients: theme.gradients,
    borderRadius: theme.borderRadius,
    shadows: theme.shadows,
    animation: theme.animation,
    components: theme.components,
    isDark,
    utils: includeUtils ? utils : {} as any,
  }), memoize ? [theme, isDark, utils, includeUtils] : []);
  
  // Track theme changes if enabled
  if (trackChanges && typeof window !== 'undefined') {
    // Development-only theme change tracking
    if (process.env.NODE_ENV === 'development') {
      console.log('Corp Astro Theme Changed:', { isDark });
    }
  }
  
  return memoize ? themeReturn : {
    theme,
    colors: theme.colors,
    spacing: theme.spacing,
    typography: theme.typography,
    gradients: theme.gradients,
    borderRadius: theme.borderRadius,
    shadows: theme.shadows,
    animation: theme.animation,
    components: theme.components,
    isDark,
    utils: includeUtils ? utils : {} as any,
  };
};

// ============================================================================
// SPECIALIZED THEME HOOKS
// ============================================================================

/**
 * Hook for accessing only theme colors
 * Optimized for components that only need color values
 * 
 * @returns Theme colors object
 * 
 * @example
 * ```tsx
 * import { useThemeColors } from '@/foundations/themes/useTheme';
 * 
 * function ColoredComponent() {
 *   const colors = useThemeColors();
 *   
 *   return (
 *     <View style={{ backgroundColor: colors.cosmos.deep }}>
 *       <Text style={{ color: colors.text.primary }}>
 *         Colored text
 *       </Text>
 *     </View>
 *   );
 * }
 * ```
 */
const useThemeColors = (): CorpAstroTheme['colors'] => {
  const { colors } = useTheme({ memoize: true, includeUtils: false });
  return colors;
};

/**
 * Hook for accessing only theme spacing
 * Optimized for layout components
 * 
 * @returns Theme spacing object
 */
const useThemeSpacing = (): CorpAstroTheme['spacing'] => {
  const { spacing } = useTheme({ memoize: true, includeUtils: false });
  return spacing;
};

/**
 * Hook for accessing only theme typography
 * Optimized for text components
 * 
 * @returns Theme typography object
 */
const useThemeTypography = (): CorpAstroTheme['typography'] => {
  const { typography } = useTheme({ memoize: true, includeUtils: false });
  return typography;
};

/**
 * Hook for accessing only theme gradients
 * Optimized for gradient components
 * 
 * @returns Theme gradients object
 */
const useThemeGradients = (): CorpAstroTheme['gradients'] => {
  const { gradients } = useTheme({ memoize: true, includeUtils: false });
  return gradients;
};

/**
 * Hook for accessing theme border radius
 * Optimized for border components
 * 
 * @returns Theme border radius object
 */
const useThemeBorderRadius = (): CorpAstroTheme['borderRadius'] => {
  const { borderRadius } = useTheme({ memoize: true, includeUtils: false });
  return borderRadius;
};

/**
 * Hook for accessing theme shadows
 * Optimized for shadow components
 * 
 * @returns Theme shadows object
 */
const useThemeShadows = (): CorpAstroTheme['shadows'] => {
  const { shadows } = useTheme({ memoize: true, includeUtils: false });
  return shadows;
};

/**
 * Hook for accessing theme animation
 * Optimized for animation components
 * 
 * @returns Theme animation object
 */
const useThemeAnimation = (): CorpAstroTheme['animation'] => {
  const { animation } = useTheme({ memoize: true, includeUtils: false });
  return animation;
};

// ============================================================================
// UTILITY HOOKS
// ============================================================================

/**
 * Hook for getting responsive values based on screen size
 * 
 * @param values - Object with breakpoint values
 * @returns Current responsive value
 */
const useResponsiveValue = <T extends any>(values: {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
}): T | undefined => {
  const { theme } = useTheme({ memoize: true, includeUtils: false });
  
  // This would typically use screen dimensions or breakpoint hooks
  // For now, return medium value as default
  return values.md || values.sm || values.xs;
};

/**
 * Hook for creating theme-aware styles
 * 
 * @param stylesFn - Function that receives theme and returns styles
 * @returns Memoized styles
 */
const useThemeStyles = <T extends any>(
  stylesFn: (theme: CorpAstroTheme) => T
): T => {
  const { theme } = useTheme({ memoize: true, includeUtils: false });
  return useMemo(() => stylesFn(theme), [theme, stylesFn]);
};

/**
 * Hook for creating conditional styles based on theme
 * 
 * @param condition - Condition function
 * @param trueStyles - Styles when condition is true
 * @param falseStyles - Styles when condition is false
 * @returns Conditional styles
 */
const useConditionalStyles = <T extends any>(
  condition: (theme: CorpAstroTheme) => boolean,
  trueStyles: T,
  falseStyles: T
): T => {
  const { theme } = useTheme({ memoize: true, includeUtils: false });
  return useMemo(() => {
    return condition(theme) ? trueStyles : falseStyles;
  }, [theme, condition, trueStyles, falseStyles]);
};

// ============================================================================
// DEVELOPMENT UTILITIES
// ============================================================================

/**
 * Development-only hook for theme debugging
 * Only available in development mode
 * 
 * @returns Theme debug information
 */
const useThemeDebug = (): {
  theme: CorpAstroTheme;
  isDark: boolean;
  performance: {
    renderCount: number;
    lastRenderTime: number;
  };
} | null => {
  const { theme, isDark } = useTheme({ memoize: false, trackChanges: true });
  
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }
  
  const performance = useMemo(() => ({
    renderCount: 0, // Would be tracked in actual implementation
    lastRenderTime: Date.now(),
  }), []);
  
  return {
    theme,
    isDark,
    performance,
  };
};

// ============================================================================
// EXPORTS
// ============================================================================

export default useTheme;

// Export specialized hooks
export {
  useConditionalStyles, useResponsiveValue, useThemeAnimation, useThemeBorderRadius, useThemeColors, useThemeDebug, useThemeGradients, useThemeShadows, useThemeSpacing, useThemeStyles, useThemeTypography
};

// Export types