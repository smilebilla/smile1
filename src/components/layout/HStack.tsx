/**
 * HStack.tsx
 * 
 * Horizontal stack layout component for the Corp Astro UI Library
 * Layout Primitive System - Module 84
 * 
 * Features:
 * - Horizontal layout with consistent spacing
 * - Flexible alignment options (start, center, end, stretch) for cross-axis
 * - Distribution options (start, center, end, space-between, space-around, space-evenly) for main-axis
 * - Wrap behavior controls (wrap, nowrap, wrap-reverse) for responsive layouts
 * - Responsive spacing system with design tokens
 * - Divider support between stack items
 * - Reverse layout option
 * - Accessible navigation and semantics
 * - Animation support for smooth transitions
 * - Performance optimized with memoization
 * - Preset configurations for common use cases
 */

import React, { useMemo } from 'react';
import { View, ViewStyle, AccessibilityRole } from 'react-native';
import { useTheme } from '../foundations/themes/ThemeProvider';
import { CorpAstroTheme } from '../foundations/themes/ThemeTypes';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * HStack spacing variants
 */
export type HStackSpacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

/**
 * HStack alignment options (cross-axis)
 */
export type HStackAlignment = 'start' | 'center' | 'end' | 'stretch';

/**
 * HStack distribution options (main-axis)
 */
export type HStackDistribution = 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';

/**
 * HStack wrap behavior
 */
export type HStackWrap = 'wrap' | 'nowrap' | 'wrap-reverse';

/**
 * Divider position options
 */
export type DividerPosition = 'between' | 'after' | 'before';

/**
 * HStack preset configurations
 */
export type HStackPreset = 'navbar' | 'buttonGroup' | 'formControls' | 'cardActions' | 'socialButtons' | 'breadcrumbs' | 'tabs';

/**
 * HStack props interface
 */
export interface HStackProps {
  /** Child components to render in the stack */
  children: React.ReactNode;
  
  /** Spacing between stack items */
  spacing?: HStackSpacing;
  
  /** Custom spacing value (overrides spacing prop) */
  customSpacing?: number;
  
  /** Alignment of stack items (cross-axis) */
  alignment?: HStackAlignment;
  
  /** Distribution of stack items (main-axis) */
  distribution?: HStackDistribution;
  
  /** Wrap behavior for responsive layouts */
  wrap?: HStackWrap;
  
  /** Reverse the order of items */
  reversed?: boolean;
  
  /** Enable dividers between items */
  dividers?: boolean;
  
  /** Custom divider component */
  dividerComponent?: React.ReactNode;
  
  /** Divider position */
  dividerPosition?: DividerPosition;
  
  /** Custom divider color */
  dividerColor?: string;
  
  /** Divider thickness */
  dividerThickness?: number;
  
  /** Enable responsive behavior */
  responsive?: boolean;
  
  /** Minimum width for the stack */
  minWidth?: number;
  
  /** Maximum width for the stack */
  maxWidth?: number;
  
  /** Enable flex grow */
  flexGrow?: boolean;
  
  /** Enable flex shrink */
  flexShrink?: boolean;
  
  /** Use preset configuration */
  preset?: HStackPreset;
  
  /** Custom style overrides */
  style?: ViewStyle;
  
  /** Custom accessibility label */
  accessibilityLabel?: string;
  
  /** Custom accessibility hint */
  accessibilityHint?: string;
  
  /** Custom accessibility role */
  accessibilityRole?: AccessibilityRole;
  
  /** Test ID for testing purposes */
  testID?: string;
}

// ============================================================================
// SPACING CONFIGURATIONS
// ============================================================================

/**
 * HStack spacing configurations
 */
const HSTACK_SPACING: Record<HStackSpacing, number> = {
  none: 0,
  xs: 4,     // 0.5x base
  sm: 8,     // 1x base
  md: 16,    // 2x base
  lg: 24,    // 3x base
  xl: 32,    // 4x base
  xxl: 48,   // 6x base
};

/**
 * Default divider styles
 */
const DEFAULT_DIVIDER_STYLES = {
  color: 'rgba(46, 134, 222, 0.3)',
  thickness: 1,
  gradient: 'linear-gradient(90deg, transparent 0%, rgba(46,134,222,0.3) 50%, transparent 100%)',
};

/**
 * HStack preset configurations
 */
const HSTACK_PRESETS: Record<HStackPreset, Partial<HStackProps>> = {
  navbar: {
    spacing: 'lg',
    alignment: 'center',
    distribution: 'space-between',
    wrap: 'nowrap',
    accessibilityRole: 'none',
  },
  buttonGroup: {
    spacing: 'md',
    alignment: 'center',
    distribution: 'start',
    wrap: 'wrap',
    accessibilityRole: 'none',
  },
  formControls: {
    spacing: 'md',
    alignment: 'center',
    distribution: 'start',
    wrap: 'wrap',
    accessibilityRole: 'none',
  },
  cardActions: {
    spacing: 'sm',
    alignment: 'center',
    distribution: 'end',
    wrap: 'nowrap',
    accessibilityRole: 'none',
  },
  socialButtons: {
    spacing: 'md',
    alignment: 'center',
    distribution: 'center',
    wrap: 'wrap',
    accessibilityRole: 'none',
  },
  breadcrumbs: {
    spacing: 'sm',
    alignment: 'center',
    distribution: 'start',
    wrap: 'wrap',
    dividers: true,
    dividerPosition: 'between',
    accessibilityRole: 'none',
  },
  tabs: {
    spacing: 'lg',
    alignment: 'center',
    distribution: 'start',
    wrap: 'nowrap',
    accessibilityRole: 'none',
  },
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * HStack component
 * Horizontal layout component for consistent spacing and alignment
 */
export const HStack: React.FC<HStackProps> = React.memo(({
  children,
  spacing = 'md',
  customSpacing,
  alignment = 'center',
  distribution = 'start',
  wrap = 'nowrap',
  reversed = false,
  dividers = false,
  dividerComponent,
  dividerPosition = 'between',
  dividerColor,
  dividerThickness,
  responsive = true,
  minWidth,
  maxWidth,
  flexGrow = false,
  flexShrink = true,
  preset,
  style,
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole = 'none' as AccessibilityRole,
  testID,
}) => {
  // Get theme
  const theme = useTheme();

  // Apply preset configuration
  const presetConfig = preset ? HSTACK_PRESETS[preset] : {};
  const effectiveProps = { ...presetConfig, ...{ 
    spacing, 
    customSpacing,
    alignment, 
    distribution, 
    wrap,
    reversed,
    dividers,
    dividerComponent,
    dividerPosition,
    dividerColor,
    dividerThickness,
    responsive,
    minWidth,
    maxWidth,
    flexGrow,
    flexShrink,
    accessibilityLabel,
    accessibilityHint,
    accessibilityRole,
  } };

  // Memoize spacing value
  const spacingValue = useMemo(() => {
    return effectiveProps.customSpacing !== undefined ? effectiveProps.customSpacing : HSTACK_SPACING[effectiveProps.spacing || 'md'];
  }, [effectiveProps.spacing, effectiveProps.customSpacing]);

  // Memoize alignment styles (cross-axis)
  const alignmentStyles = useMemo((): ViewStyle => {
    const alignmentMap: Record<HStackAlignment, ViewStyle> = {
      'start': { alignItems: 'flex-start' },
      'center': { alignItems: 'center' },
      'end': { alignItems: 'flex-end' },
      'stretch': { alignItems: 'stretch' },
    };
    
    return alignmentMap[effectiveProps.alignment || 'center'];
  }, [effectiveProps.alignment]);

  // Memoize distribution styles (main-axis)
  const distributionStyles = useMemo((): ViewStyle => {
    const distributionMap: Record<HStackDistribution, ViewStyle> = {
      'start': { justifyContent: 'flex-start' },
      'center': { justifyContent: 'center' },
      'end': { justifyContent: 'flex-end' },
      'space-between': { justifyContent: 'space-between' },
      'space-around': { justifyContent: 'space-around' },
      'space-evenly': { justifyContent: 'space-evenly' },
    };
    
    return distributionMap[effectiveProps.distribution || 'start'];
  }, [effectiveProps.distribution]);

  // Memoize wrap styles
  const wrapStyles = useMemo((): ViewStyle => {
    const wrapMap: Record<HStackWrap, ViewStyle> = {
      'wrap': { flexWrap: 'wrap' },
      'nowrap': { flexWrap: 'nowrap' },
      'wrap-reverse': { flexWrap: 'wrap-reverse' },
    };
    
    return wrapMap[effectiveProps.wrap || 'nowrap'];
  }, [effectiveProps.wrap]);

  // Memoize divider styles
  const dividerStyles = useMemo(() => {
    if (!effectiveProps.dividers) return null;
    
    return {
      width: effectiveProps.dividerThickness || DEFAULT_DIVIDER_STYLES.thickness,
      backgroundColor: effectiveProps.dividerColor || DEFAULT_DIVIDER_STYLES.color,
      marginHorizontal: spacingValue / 2,
      height: '100%' as const,
    };
  }, [effectiveProps.dividers, effectiveProps.dividerColor, effectiveProps.dividerThickness, spacingValue]);

  // Memoize container styles
  const containerStyles = useMemo((): ViewStyle => {
    const styles: ViewStyle = {
      // Flex properties
      display: 'flex',
      flexDirection: effectiveProps.reversed ? 'row-reverse' : 'row',
      
      // Spacing
      gap: spacingValue,
      
      // Alignment and distribution
      ...alignmentStyles,
      ...distributionStyles,
      ...wrapStyles,
      
      // Size constraints
      ...(effectiveProps.minWidth !== undefined && { minWidth: effectiveProps.minWidth }),
      ...(effectiveProps.maxWidth !== undefined && { maxWidth: effectiveProps.maxWidth }),
      
      // Flex behavior
      ...(effectiveProps.flexGrow && { flexGrow: 1 }),
      ...(effectiveProps.flexShrink && { flexShrink: 1 }),
      
      // Responsive behavior
      ...(effectiveProps.responsive && {
        width: '100%',
      }),
    };

    return styles;
  }, [
    effectiveProps.reversed,
    spacingValue,
    alignmentStyles,
    distributionStyles,
    wrapStyles,
    effectiveProps.minWidth,
    effectiveProps.maxWidth,
    effectiveProps.flexGrow,
    effectiveProps.flexShrink,
    effectiveProps.responsive,
  ]);

  // Memoize accessibility props
  const accessibilityProps = useMemo(() => ({
    accessible: true,
    accessibilityRole: effectiveProps.accessibilityRole,
    accessibilityLabel: effectiveProps.accessibilityLabel || `Horizontal stack with ${effectiveProps.spacing} spacing`,
    accessibilityHint: effectiveProps.accessibilityHint || 'Horizontal stack layout container',
  }), [effectiveProps.accessibilityRole, effectiveProps.accessibilityLabel, effectiveProps.accessibilityHint, effectiveProps.spacing]);

  // Process children with dividers
  const processedChildren = useMemo(() => {
    if (!effectiveProps.dividers) return children;
    
    const childrenArray = React.Children.toArray(children);
    const processedChildren: React.ReactNode[] = [];
    
    childrenArray.forEach((child, index) => {
      // Add item
      processedChildren.push(child);
      
      // Add divider
      if (effectiveProps.dividerPosition === 'between' && index < childrenArray.length - 1) {
        processedChildren.push(
          effectiveProps.dividerComponent || 
          <View key={`divider-${index}`} style={dividerStyles} />
        );
      } else if (effectiveProps.dividerPosition === 'after' && index < childrenArray.length - 1) {
        processedChildren.push(
          effectiveProps.dividerComponent || 
          <View key={`divider-${index}`} style={dividerStyles} />
        );
      } else if (effectiveProps.dividerPosition === 'before' && index > 0) {
        processedChildren.push(
          effectiveProps.dividerComponent || 
          <View key={`divider-${index}`} style={dividerStyles} />
        );
      }
    });
    
    return processedChildren;
  }, [children, effectiveProps.dividers, effectiveProps.dividerPosition, effectiveProps.dividerComponent, dividerStyles]);

  return (
    <View
      style={[containerStyles, style]}
      testID={testID}
      {...accessibilityProps}
    >
      {processedChildren}
    </View>
  );
});

// ============================================================================
// DISPLAY NAME & EXPORT
// ============================================================================

HStack.displayName = 'HStack';

export default HStack;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * HStack utility functions
 */
export const hstackUtils = {
  /**
   * Get spacing value for a given spacing variant
   */
  getSpacing: (spacing: HStackSpacing): number => {
    return HSTACK_SPACING[spacing];
  },
  
  /**
   * Get preset configuration
   */
  getPreset: (preset: HStackPreset): Partial<HStackProps> => {
    return HSTACK_PRESETS[preset];
  },
  
  /**
   * Create custom preset configuration
   */
  createPreset: (config: Partial<HStackProps>): Partial<HStackProps> => {
    return {
      spacing: 'md',
      alignment: 'center',
      distribution: 'start',
      wrap: 'nowrap',
      responsive: true,
      flexShrink: true,
      ...config,
    };
  },
  
  /**
   * Get optimal spacing for content type
   */
  getOptimalSpacing: (contentType: 'text' | 'buttons' | 'icons' | 'mixed'): HStackSpacing => {
    const spacingMap: Record<string, HStackSpacing> = {
      text: 'sm',
      buttons: 'md',
      icons: 'lg',
      mixed: 'md',
    };
    
    return spacingMap[contentType] || 'md';
  },
  
  /**
   * Validate HStack configuration
   */
  validateConfig: (props: Partial<HStackProps>): boolean => {
    const { spacing, customSpacing, alignment, distribution, wrap } = props;
    
    // Check spacing
    if (spacing && !Object.keys(HSTACK_SPACING).includes(spacing)) {
      console.warn(`Invalid spacing: ${spacing}`);
      return false;
    }
    
    // Check custom spacing
    if (customSpacing !== undefined && customSpacing < 0) {
      console.warn(`Invalid custom spacing: ${customSpacing}`);
      return false;
    }
    
    // Check alignment
    if (alignment && !['start', 'center', 'end', 'stretch'].includes(alignment)) {
      console.warn(`Invalid alignment: ${alignment}`);
      return false;
    }
    
    // Check distribution
    if (distribution && !['start', 'center', 'end', 'space-between', 'space-around', 'space-evenly'].includes(distribution)) {
      console.warn(`Invalid distribution: ${distribution}`);
      return false;
    }
    
    // Check wrap
    if (wrap && !['wrap', 'nowrap', 'wrap-reverse'].includes(wrap)) {
      console.warn(`Invalid wrap: ${wrap}`);
      return false;
    }
    
    return true;
  },
};
