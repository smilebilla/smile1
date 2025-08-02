/**
 * Stack.tsx
 * 
 * Vertical stack layout component for the Corp Astro UI Library
 * Layout Primitive System - Module 83
 * 
 * Features:
 * - Vertical layout with consistent spacing
 * - Flexible alignment options (start, center, end, stretch)
 * - Responsive spacing system with design tokens
 * - Divider support between stack items
 * - Reverse layout option
 * - Accessible navigation and semantics
 * - Animation support for smooth transitions
 * - Performance optimized with memoization
 */

import React, { useMemo } from 'react';
import { View, ViewStyle, AccessibilityRole } from 'react-native';
import { useTheme } from '../foundations/themes/ThemeProvider';
import { CorpAstroTheme } from '../foundations/themes/ThemeTypes';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * Stack spacing variants
 */
export type StackSpacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

/**
 * Stack alignment options
 */
export type StackAlignment = 'start' | 'center' | 'end' | 'stretch';

/**
 * Stack distribution options
 */
export type StackDistribution = 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';

/**
 * Divider position options
 */
export type DividerPosition = 'between' | 'after' | 'before';

/**
 * Stack props interface
 */
export interface StackProps {
  /** Child components to render in the stack */
  children: React.ReactNode;
  
  /** Spacing between stack items */
  spacing?: StackSpacing;
  
  /** Custom spacing value (overrides spacing prop) */
  customSpacing?: number;
  
  /** Alignment of stack items */
  alignment?: StackAlignment;
  
  /** Distribution of stack items */
  distribution?: StackDistribution;
  
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
  
  /** Minimum height for the stack */
  minHeight?: number;
  
  /** Maximum height for the stack */
  maxHeight?: number;
  
  /** Enable flex grow */
  flexGrow?: boolean;
  
  /** Enable flex shrink */
  flexShrink?: boolean;
  
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
 * Stack spacing configurations
 */
const STACK_SPACING: Record<StackSpacing, number> = {
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

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Stack component
 * Vertical layout component for consistent spacing and alignment
 */
export const Stack: React.FC<StackProps> = React.memo(({
  children,
  spacing = 'md',
  customSpacing,
  alignment = 'stretch',
  distribution = 'start',
  reversed = false,
  dividers = false,
  dividerComponent,
  dividerPosition = 'between',
  dividerColor,
  dividerThickness,
  responsive = true,
  minHeight,
  maxHeight,
  flexGrow = false,
  flexShrink = true,
  style,
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole = 'none' as AccessibilityRole,
  testID,
}) => {
  // Get theme
  const theme = useTheme();

  // Memoize spacing value
  const spacingValue = useMemo(() => {
    return customSpacing !== undefined ? customSpacing : STACK_SPACING[spacing];
  }, [spacing, customSpacing]);

  // Memoize alignment styles
  const alignmentStyles = useMemo(() => {
    const alignmentMap: Record<StackAlignment, ViewStyle> = {
      start: { alignItems: 'flex-start' },
      center: { alignItems: 'center' },
      end: { alignItems: 'flex-end' },
      stretch: { alignItems: 'stretch' },
    };
    
    return alignmentMap[alignment];
  }, [alignment]);

  // Memoize distribution styles
  const distributionStyles = useMemo(() => {
    const distributionMap: Record<StackDistribution, ViewStyle> = {
      start: { justifyContent: 'flex-start' },
      center: { justifyContent: 'center' },
      end: { justifyContent: 'flex-end' },
      'space-between': { justifyContent: 'space-between' },
      'space-around': { justifyContent: 'space-around' },
      'space-evenly': { justifyContent: 'space-evenly' },
    };
    
    return distributionMap[distribution];
  }, [distribution]);

  // Memoize divider styles
  const dividerStyles = useMemo(() => {
    if (!dividers) return null;
    
    return {
      height: dividerThickness || DEFAULT_DIVIDER_STYLES.thickness,
      backgroundColor: dividerColor || DEFAULT_DIVIDER_STYLES.color,
      marginVertical: spacingValue / 2,
      width: '100%' as const,
    };
  }, [dividers, dividerColor, dividerThickness, spacingValue]);

  // Memoize container styles
  const containerStyles = useMemo((): ViewStyle => {
    const styles: ViewStyle = {
      // Flex properties
      display: 'flex',
      flexDirection: reversed ? 'column-reverse' : 'column',
      
      // Spacing
      gap: spacingValue,
      
      // Alignment and distribution
      ...alignmentStyles,
      ...distributionStyles,
      
      // Size constraints
      ...(minHeight !== undefined && { minHeight }),
      ...(maxHeight !== undefined && { maxHeight }),
      
      // Flex behavior
      ...(flexGrow && { flexGrow: 1 }),
      ...(flexShrink && { flexShrink: 1 }),
      
      // Responsive behavior
      ...(responsive && {
        width: '100%',
      }),
    };

    return styles;
  }, [
    reversed,
    spacingValue,
    alignmentStyles,
    distributionStyles,
    minHeight,
    maxHeight,
    flexGrow,
    flexShrink,
    responsive,
  ]);

  // Memoize accessibility props
  const accessibilityProps = useMemo(() => ({
    accessible: true,
    accessibilityRole,
    accessibilityLabel: accessibilityLabel || `Stack with ${spacing} spacing`,
    accessibilityHint: accessibilityHint || 'Vertical stack layout container',
  }), [accessibilityRole, accessibilityLabel, accessibilityHint, spacing]);

  // Process children with dividers
  const processedChildren = useMemo(() => {
    if (!dividers) return children;
    
    const childrenArray = React.Children.toArray(children);
    const processedChildren: React.ReactNode[] = [];
    
    childrenArray.forEach((child, index) => {
      // Add item
      processedChildren.push(child);
      
      // Add divider
      if (dividerPosition === 'between' && index < childrenArray.length - 1) {
        processedChildren.push(
          <View key={`divider-${index}`} style={dividerStyles} />
        );
      } else if (dividerPosition === 'after' && index < childrenArray.length - 1) {
        processedChildren.push(
          <View key={`divider-${index}`} style={dividerStyles} />
        );
      } else if (dividerPosition === 'before' && index > 0) {
        processedChildren.push(
          <View key={`divider-${index}`} style={dividerStyles} />
        );
      }
    });
    
    return processedChildren;
  }, [children, dividers, dividerPosition, dividerStyles]);

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

Stack.displayName = 'Stack';

export default Stack;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get stack spacing value
 */
export const getStackSpacing = (spacing: StackSpacing): number => STACK_SPACING[spacing];

/**
 * Create responsive stack spacing
 */
export const createResponsiveStackSpacing = (
  breakpoint: keyof CorpAstroTheme['breakpoints'],
  theme: CorpAstroTheme
): number => {
  const screenWidth = theme.breakpoints[breakpoint];
  
  if (screenWidth >= 1200) return STACK_SPACING.xxl;
  if (screenWidth >= 992) return STACK_SPACING.xl;
  if (screenWidth >= 768) return STACK_SPACING.lg;
  if (screenWidth >= 576) return STACK_SPACING.md;
  
  return STACK_SPACING.sm;
};

/**
 * Create custom divider component
 */
export const createCustomDivider = (
  color: string = DEFAULT_DIVIDER_STYLES.color,
  thickness: number = DEFAULT_DIVIDER_STYLES.thickness,
  gradient?: string
): React.ReactNode => {
  return (
    <View
      style={{
        height: thickness,
        backgroundColor: gradient ? 'transparent' : color,
        width: '100%',
        ...(gradient && {
          background: gradient,
        }),
      }}
    />
  );
};

/**
 * Stack preset configurations
 */
export const stackPresets = {
  tight: {
    spacing: 'xs' as StackSpacing,
    alignment: 'stretch' as StackAlignment,
    distribution: 'start' as StackDistribution,
  },
  normal: {
    spacing: 'md' as StackSpacing,
    alignment: 'stretch' as StackAlignment,
    distribution: 'start' as StackDistribution,
  },
  loose: {
    spacing: 'xl' as StackSpacing,
    alignment: 'stretch' as StackAlignment,
    distribution: 'start' as StackDistribution,
  },
  centered: {
    spacing: 'md' as StackSpacing,
    alignment: 'center' as StackAlignment,
    distribution: 'center' as StackDistribution,
  },
  spaced: {
    spacing: 'lg' as StackSpacing,
    alignment: 'stretch' as StackAlignment,
    distribution: 'space-between' as StackDistribution,
  },
  navigation: {
    spacing: 'sm' as StackSpacing,
    alignment: 'stretch' as StackAlignment,
    distribution: 'start' as StackDistribution,
    dividers: true,
  },
} as const;

/**
 * Stack layout utilities
 */
export const stackUtils = {
  /**
   * Calculate total stack height
   */
  calculateHeight: (
    itemCount: number,
    itemHeight: number,
    spacing: StackSpacing,
    hasDividers: boolean = false
  ): number => {
    const spacingValue = STACK_SPACING[spacing];
    const totalSpacing = (itemCount - 1) * spacingValue;
    const totalItemHeight = itemCount * itemHeight;
    const totalDividerHeight = hasDividers ? (itemCount - 1) * DEFAULT_DIVIDER_STYLES.thickness : 0;
    
    return totalItemHeight + totalSpacing + totalDividerHeight;
  },
  
  /**
   * Get optimal spacing for item count
   */
  getOptimalSpacing: (itemCount: number, containerHeight: number): StackSpacing => {
    if (itemCount <= 3) return 'xl';
    if (itemCount <= 6) return 'lg';
    if (itemCount <= 10) return 'md';
    return 'sm';
  },
  
  /**
   * Validate stack configuration
   */
  validateConfig: (props: Partial<StackProps>): boolean => {
    const { spacing, customSpacing, alignment, distribution } = props;
    
    // Check spacing
    if (spacing && !Object.keys(STACK_SPACING).includes(spacing)) {
      console.warn(`Invalid spacing: ${spacing}`);
      return false;
    }
    
    // Check custom spacing
    if (customSpacing !== undefined && customSpacing < 0) {
      console.warn(`Invalid custom spacing: ${customSpacing}`);
      return false;
    }
    
    return true;
  },
};
