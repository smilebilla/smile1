/**
 * Corp Astro UI Library - Spacing Scale Module
 * 
 * Comprehensive spacing system based on 8-point grid from UI Documentation
 * Provides consistent spacing values and utilities for the entire design system
 * 
 * @module SpacingScale
 * @version 1.0.0
 * @since 2024
 * 
 * UI Documentation Reference:
 * - Spacing system based on 8-point grid
 * - Base value: 8px
 * - Multipliers from 0.5x to 12x base
 * - Includes spacing utility functions
 */

// ============================================================================
// TYPES
// ============================================================================

/**
 * Spacing value type definition
 */
export type SpacingValue = number;

/**
 * Spacing scale keys type definition
 */
export type SpacingScaleKey = 
  | 'xxs' 
  | 'xs' 
  | 'sm' 
  | 'md' 
  | 'lg' 
  | 'xl' 
  | 'xxl' 
  | 'xxxl' 
  | 'huge';

// ============================================================================
// SPACING SCALE CONSTANTS
// ============================================================================

/**
 * Primary spacing scale based on 8-point grid system
 * Exact values from UI Documentation
 */
export const spacing = {
  base: 8 as SpacingValue,
  xxs: 4 as SpacingValue,     // 0.5x base
  xs: 8 as SpacingValue,      // 1x base
  sm: 12 as SpacingValue,     // 1.5x base
  md: 16 as SpacingValue,     // 2x base
  lg: 24 as SpacingValue,     // 3x base
  xl: 32 as SpacingValue,     // 4x base
  xxl: 48 as SpacingValue,    // 6x base
  xxxl: 64 as SpacingValue,   // 8x base
  huge: 96 as SpacingValue,   // 12x base
} as const;

// ============================================================================
// SPACING UTILITY FUNCTIONS
// ============================================================================

/**
 * Get spacing value with multiplier
 * @param multiplier - Multiplier for base spacing value
 * @returns Calculated spacing value
 */
export const getSpacing = (multiplier: number): SpacingValue => {
  return spacing.base * multiplier;
};

/**
 * Get spacing value by scale key
 * @param key - Spacing scale key
 * @returns Spacing value for the key
 */
export const getSpacingByKey = (key: SpacingScaleKey): SpacingValue => {
  return spacing[key];
};

/**
 * Create custom spacing value with validation
 * @param value - Custom spacing value
 * @returns Validated spacing value
 */
export const createSpacing = (value: number): SpacingValue => {
  // Validate that value is divisible by 4 (half of base unit)
  if (value % 4 !== 0) {
    console.warn(`Spacing value ${value} is not aligned to 4px grid. Consider using a multiple of 4.`);
  }
  return value as SpacingValue;
};

/**
 * Get closest spacing scale value for a given number
 * @param value - Input value to find closest spacing for
 * @returns Closest spacing scale value
 */
export const getClosestSpacing = (value: number): SpacingValue => {
  const spacingValues = Object.values(spacing).filter(v => typeof v === 'number');
  const closest = spacingValues.reduce((prev, curr) => {
    return Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev;
  });
  return closest;
};

// ============================================================================
// SPACING ARRAYS FOR COMPONENTS
// ============================================================================

/**
 * Spacing scale as array for component props
 */
export const spacingScaleArray = [
  spacing.xxs,
  spacing.xs,
  spacing.sm,
  spacing.md,
  spacing.lg,
  spacing.xl,
  spacing.xxl,
  spacing.xxxl,
  spacing.huge,
] as const;

/**
 * Spacing scale keys as array
 */
export const spacingScaleKeys = [
  'xxs',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  'xxl',
  'xxxl',
  'huge',
] as const;

// ============================================================================
// SEMANTIC SPACING MAPPINGS
// ============================================================================

/**
 * Semantic spacing mappings for common use cases
 */
export const semanticSpacing = {
  // Content spacing
  content: {
    tight: spacing.xxs,      // 4px - Very tight content
    normal: spacing.xs,      // 8px - Normal content spacing
    relaxed: spacing.sm,     // 12px - Relaxed content spacing
    loose: spacing.md,       // 16px - Loose content spacing
  },
  
  // Component spacing
  component: {
    padding: spacing.md,     // 16px - Standard component padding
    margin: spacing.lg,      // 24px - Standard component margin
    gap: spacing.sm,         // 12px - Standard gap between elements
  },
  
  // Layout spacing
  layout: {
    section: spacing.xxl,    // 48px - Section spacing
    container: spacing.xl,   // 32px - Container spacing
    page: spacing.huge,      // 96px - Page-level spacing
  },
  
  // Interactive spacing
  interactive: {
    touch: spacing.xl,       // 32px - Touch target minimum
    hover: spacing.xs,       // 8px - Hover state spacing
    focus: spacing.xxs,      // 4px - Focus indicator spacing
  },
} as const;

// ============================================================================
// EXPORTS
// ============================================================================

export default spacing;
