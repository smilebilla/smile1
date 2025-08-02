/**
 * Flex.tsx
 * 
 * Flexible layout component for the Corp Astro UI Library
 * Layout Primitive System - Module 89
 * 
 * Features:
 * - Comprehensive flexbox layout control
 * - Direction control (row, column, row-reverse, column-reverse)
 * - Alignment options (start, center, end, stretch) for cross-axis
 * - Justification options (start, center, end, space-between, space-around, space-evenly) for main-axis
 * - Wrap behavior controls (wrap, nowrap, wrap-reverse)
 * - Responsive spacing system with design tokens
 * - Flexible sizing controls (flex, grow, shrink, basis)
 * - Gap control with responsive support
 * - Accessible navigation and semantics
 * - Performance optimized with memoization
 * - Preset configurations for common use cases
 * - Full TypeScript support with comprehensive type definitions
 */

import React, { useMemo } from 'react';
import { View, ViewStyle, AccessibilityRole, DimensionValue, ColorValue } from 'react-native';
import { useTheme } from '../foundations/themes/ThemeProvider';
import type { ThemeContextType } from '../foundations/themes/ThemeProvider';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * Flex direction options
 */
export type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';

/**
 * Flex wrap behavior
 */
export type FlexWrap = 'wrap' | 'nowrap' | 'wrap-reverse';

/**
 * Flex alignment options (cross-axis)
 */
export type FlexAlignment = 'start' | 'center' | 'end' | 'stretch' | 'baseline';

/**
 * Flex justification options (main-axis)
 */
export type FlexJustification = 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';

/**
 * Flex spacing variants
 */
export type FlexSpacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

/**
 * Flex size options
 */
export type FlexSize = 'auto' | 'fill' | 'none' | number;

/**
 * Flex preset configurations
 */
export type FlexPreset = 
  | 'column' 
  | 'row' 
  | 'center' 
  | 'spaceBetween' 
  | 'spaceAround' 
  | 'spaceEvenly' 
  | 'header' 
  | 'sidebar' 
  | 'card' 
  | 'form' 
  | 'grid' 
  | 'navbar' 
  | 'hero' 
  | 'footer';

/**
 * Responsive flex configuration
 */
export interface ResponsiveFlexConfig {
  mobile?: Partial<FlexProps>;
  tablet?: Partial<FlexProps>;
  desktop?: Partial<FlexProps>;
}

/**
 * Flex props interface
 */
export interface FlexProps {
  /** Child components to render in the flex container */
  children: React.ReactNode;
  
  /** Flex direction */
  direction?: FlexDirection;
  
  /** Flex wrap behavior */
  wrap?: FlexWrap;
  
  /** Alignment of flex items (cross-axis) */
  alignItems?: FlexAlignment;
  
  /** Justification of flex items (main-axis) */
  justifyContent?: FlexJustification;
  
  /** Align content when wrapping */
  alignContent?: FlexAlignment;
  
  /** Alignment of this flex item within its parent */
  alignSelf?: FlexAlignment;
  
  /** Gap between flex items */
  gap?: FlexSpacing;
  
  /** Custom gap value (overrides gap prop) */
  customGap?: number;
  
  /** Row gap for wrapped items */
  rowGap?: FlexSpacing;
  
  /** Column gap for wrapped items */
  columnGap?: FlexSpacing;
  
  /** Flex grow factor */
  grow?: number;
  
  /** Flex shrink factor */
  shrink?: number;
  
  /** Flex basis */
  basis?: DimensionValue;
  
  /** Shorthand for flex grow, shrink, and basis */
  flex?: number;
  
  /** Minimum width */
  minWidth?: DimensionValue;
  
  /** Maximum width */
  maxWidth?: DimensionValue;
  
  /** Minimum height */
  minHeight?: DimensionValue;
  
  /** Maximum height */
  maxHeight?: DimensionValue;
  
  /** Fixed width */
  width?: DimensionValue;
  
  /** Fixed height */
  height?: DimensionValue;
  
  /** Padding */
  padding?: FlexSpacing;
  
  /** Custom padding value */
  customPadding?: number;
  
  /** Margin */
  margin?: FlexSpacing;
  
  /** Custom margin value */
  customMargin?: number;
  
  /** Background color */
  backgroundColor?: ColorValue;
  
  /** Border radius */
  borderRadius?: FlexSpacing;
  
  /** Custom border radius value */
  customBorderRadius?: number;
  
  /** Shadow */
  shadow?: boolean;
  
  /** Custom shadow style */
  shadowStyle?: ViewStyle;
  
  /** Apply preset configuration */
  preset?: FlexPreset;
  
  /** Responsive configuration */
  responsive?: ResponsiveFlexConfig;
  
  /** Custom style overrides */
  style?: ViewStyle;
  
  /** Accessibility role */
  accessibilityRole?: AccessibilityRole;
  
  /** Accessibility label */
  accessibilityLabel?: string;
  
  /** Accessibility hint */
  accessibilityHint?: string;
  
  /** Test ID for testing */
  testID?: string;
  
  /** Additional props to pass to the underlying View */
  [key: string]: any;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get spacing value from theme
 */
const getSpacingValue = (theme: ThemeContextType, spacing: FlexSpacing): number => {
  const spacingMap = {
    none: 0,
    xs: theme.theme.spacing.xs,
    sm: theme.theme.spacing.sm,
    md: theme.theme.spacing.md,
    lg: theme.theme.spacing.lg,
    xl: theme.theme.spacing.xl,
    xxl: theme.theme.spacing.xxl,
  };
  return spacingMap[spacing] || 0;
};

/**
 * Convert flex alignment to React Native style (for alignContent)
 */
const convertAlignmentForContent = (alignment: FlexAlignment): ViewStyle['alignContent'] => {
  switch (alignment) {
    case 'start': return 'flex-start';
    case 'center': return 'center';
    case 'end': return 'flex-end';
    case 'stretch': return 'stretch';
    case 'baseline': return 'flex-start'; // alignContent doesn't support baseline
    default: return 'flex-start';
  }
};

/**
 * Convert flex alignment to React Native style
 */
const convertAlignment = (alignment: FlexAlignment): ViewStyle['alignItems'] => {
  switch (alignment) {
    case 'start': return 'flex-start';
    case 'center': return 'center';
    case 'end': return 'flex-end';
    case 'stretch': return 'stretch';
    case 'baseline': return 'baseline';
    default: return 'flex-start';
  }
};

/**
 * Convert flex justification to React Native style
 */
const convertJustification = (justification: FlexJustification): ViewStyle['justifyContent'] => {
  switch (justification) {
    case 'start': return 'flex-start';
    case 'center': return 'center';
    case 'end': return 'flex-end';
    case 'space-between': return 'space-between';
    case 'space-around': return 'space-around';
    case 'space-evenly': return 'space-evenly';
    default: return 'flex-start';
  }
};

/**
 * Convert flex size to React Native style
 */
const convertFlexSize = (size: FlexSize): DimensionValue => {
  switch (size) {
    case 'auto': return 'auto';
    case 'fill': return '100%';
    case 'none': return 0;
    default: return typeof size === 'number' ? size : 'auto';
  }
};

/**
 * Get preset configuration
 */
const getPresetConfig = (preset: FlexPreset): Partial<FlexProps> => {
  switch (preset) {
    case 'column':
      return {
        direction: 'column',
        alignItems: 'stretch',
        gap: 'md',
      };
    case 'row':
      return {
        direction: 'row',
        alignItems: 'center',
        gap: 'md',
      };
    case 'center':
      return {
        direction: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'md',
      };
    case 'spaceBetween':
      return {
        direction: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      };
    case 'spaceAround':
      return {
        direction: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
      };
    case 'spaceEvenly':
      return {
        direction: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
      };
    case 'header':
      return {
        direction: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'lg',
        minHeight: 64,
      };
    case 'sidebar':
      return {
        direction: 'column',
        alignItems: 'stretch',
        gap: 'sm',
        padding: 'lg',
        minWidth: 240,
      };
    case 'card':
      return {
        direction: 'column',
        alignItems: 'stretch',
        gap: 'md',
        padding: 'lg',
        borderRadius: 'md',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
      };
    case 'form':
      return {
        direction: 'column',
        alignItems: 'stretch',
        gap: 'lg',
        padding: 'lg',
      };
    case 'grid':
      return {
        direction: 'row',
        wrap: 'wrap',
        gap: 'md',
        alignItems: 'stretch',
      };
    case 'navbar':
      return {
        direction: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'md',
        minHeight: 56,
      };
    case 'hero':
      return {
        direction: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'xl',
        padding: 'xxl',
        minHeight: 400,
      };
    case 'footer':
      return {
        direction: 'column',
        alignItems: 'center',
        gap: 'md',
        padding: 'xl',
      };
    default:
      return {};
  }
};

/**
 * Generate shadow style
 */
const generateShadowStyle = (theme: ThemeContextType): ViewStyle => {
  return {
    shadowColor: theme.theme.colors.cosmos.void,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  };
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Flex component for flexible layout control
 */
export const Flex: React.FC<FlexProps> = ({
  children,
  direction = 'row',
  wrap = 'nowrap',
  alignItems = 'start',
  justifyContent = 'start',
  alignContent,
  alignSelf,
  gap = 'none',
  customGap,
  rowGap,
  columnGap,
  grow,
  shrink,
  basis,
  flex,
  minWidth,
  maxWidth,
  minHeight,
  maxHeight,
  width,
  height,
  padding = 'none',
  customPadding,
  margin = 'none',
  customMargin,
  backgroundColor,
  borderRadius = 'none',
  customBorderRadius,
  shadow = false,
  shadowStyle,
  preset,
  responsive,
  style,
  accessibilityRole = 'none',
  accessibilityLabel,
  accessibilityHint,
  testID,
  ...rest
}) => {
  const theme = useTheme();
  
  // Apply preset configuration
  const presetConfig = preset ? getPresetConfig(preset) : {};
  
  // Merge preset with explicit props (explicit props take precedence)
  const finalProps = {
    direction,
    wrap,
    alignItems,
    justifyContent,
    alignContent,
    alignSelf,
    gap,
    customGap,
    rowGap,
    columnGap,
    grow,
    shrink,
    basis,
    flex,
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
    width,
    height,
    padding,
    customPadding,
    margin,
    customMargin,
    backgroundColor,
    borderRadius,
    customBorderRadius,
    shadow,
    shadowStyle,
    ...presetConfig,
    // Explicit props override preset
    ...(direction !== 'row' && { direction }),
    ...(wrap !== 'nowrap' && { wrap }),
    ...(alignItems !== 'start' && { alignItems }),
    ...(justifyContent !== 'start' && { justifyContent }),
    ...(alignContent && { alignContent }),
    ...(alignSelf && { alignSelf }),
    ...(gap !== 'none' && { gap }),
    ...(customGap !== undefined && { customGap }),
    ...(rowGap && { rowGap }),
    ...(columnGap && { columnGap }),
    ...(grow !== undefined && { grow }),
    ...(shrink !== undefined && { shrink }),
    ...(basis !== undefined && { basis }),
    ...(flex !== undefined && { flex }),
    ...(minWidth !== undefined && { minWidth }),
    ...(maxWidth !== undefined && { maxWidth }),
    ...(minHeight !== undefined && { minHeight }),
    ...(maxHeight !== undefined && { maxHeight }),
    ...(width !== undefined && { width }),
    ...(height !== undefined && { height }),
    ...(padding !== 'none' && { padding }),
    ...(customPadding !== undefined && { customPadding }),
    ...(margin !== 'none' && { margin }),
    ...(customMargin !== undefined && { customMargin }),
    ...(backgroundColor && { backgroundColor }),
    ...(borderRadius !== 'none' && { borderRadius }),
    ...(customBorderRadius !== undefined && { customBorderRadius }),
    ...(shadow && { shadow }),
    ...(shadowStyle && { shadowStyle }),
  };
  
  // Generate flex style
  const flexStyle = useMemo<ViewStyle>(() => {
    const baseStyle: ViewStyle = {
      display: 'flex',
      flexDirection: finalProps.direction,
      flexWrap: finalProps.wrap,
      alignItems: convertAlignment(finalProps.alignItems),
      justifyContent: convertJustification(finalProps.justifyContent),
    };
    
    // Align content (for wrapped items)
    if (finalProps.alignContent) {
      baseStyle.alignContent = convertAlignmentForContent(finalProps.alignContent);
    }
    
    // Align self
    if (finalProps.alignSelf) {
      baseStyle.alignSelf = convertAlignment(finalProps.alignSelf);
    }
    
    // Gap handling
    if (finalProps.customGap !== undefined) {
      baseStyle.gap = finalProps.customGap;
    } else if (finalProps.gap && finalProps.gap !== 'none') {
      baseStyle.gap = getSpacingValue(theme, finalProps.gap);
    }
    
    // Row gap
    if (finalProps.rowGap) {
      baseStyle.rowGap = getSpacingValue(theme, finalProps.rowGap);
    }
    
    // Column gap
    if (finalProps.columnGap) {
      baseStyle.columnGap = getSpacingValue(theme, finalProps.columnGap);
    }
    
    // Flex properties
    if (finalProps.grow !== undefined) {
      baseStyle.flexGrow = finalProps.grow;
    }
    
    if (finalProps.shrink !== undefined) {
      baseStyle.flexShrink = finalProps.shrink;
    }
    
    if (finalProps.basis !== undefined) {
      baseStyle.flexBasis = finalProps.basis;
    }
    
    if (finalProps.flex !== undefined) {
      baseStyle.flex = finalProps.flex;
    }
    
    // Size constraints
    if (finalProps.minWidth !== undefined) {
      baseStyle.minWidth = finalProps.minWidth;
    }
    
    if (finalProps.maxWidth !== undefined) {
      baseStyle.maxWidth = finalProps.maxWidth;
    }
    
    if (finalProps.minHeight !== undefined) {
      baseStyle.minHeight = finalProps.minHeight;
    }
    
    if (finalProps.maxHeight !== undefined) {
      baseStyle.maxHeight = finalProps.maxHeight;
    }
    
    if (finalProps.width !== undefined) {
      baseStyle.width = finalProps.width;
    }
    
    if (finalProps.height !== undefined) {
      baseStyle.height = finalProps.height;
    }
    
    // Padding
    if (finalProps.customPadding !== undefined) {
      baseStyle.padding = finalProps.customPadding;
    } else if (finalProps.padding && finalProps.padding !== 'none') {
      baseStyle.padding = getSpacingValue(theme, finalProps.padding);
    }
    
    // Margin
    if (finalProps.customMargin !== undefined) {
      baseStyle.margin = finalProps.customMargin;
    } else if (finalProps.margin && finalProps.margin !== 'none') {
      baseStyle.margin = getSpacingValue(theme, finalProps.margin);
    }
    
    // Background color
    if (finalProps.backgroundColor) {
      baseStyle.backgroundColor = finalProps.backgroundColor;
    }
    
    // Border radius
    if (finalProps.customBorderRadius !== undefined) {
      baseStyle.borderRadius = finalProps.customBorderRadius;
    } else if (finalProps.borderRadius && finalProps.borderRadius !== 'none') {
      baseStyle.borderRadius = getSpacingValue(theme, finalProps.borderRadius);
    }
    
    // Shadow
    if (finalProps.shadow) {
      const shadowProps = finalProps.shadowStyle || generateShadowStyle(theme);
      Object.assign(baseStyle, shadowProps);
    }
    
    return baseStyle;
  }, [theme, finalProps]);
  
  // Apply responsive configuration
  // For now, we'll use a simple responsive approach
  // In a production app, you'd typically use a responsive hook or context
  const currentBreakpoint = 'mobile' as keyof ResponsiveFlexConfig;
  
  // Apply responsive configuration
  const responsiveProps = responsive?.[currentBreakpoint] || {};
  const finalFlexStyle = { ...flexStyle };
  
  // Apply responsive style overrides
  if (responsiveProps.style) {
    Object.assign(finalFlexStyle, responsiveProps.style);
  }
  
  return (
    <View
      style={[finalFlexStyle, style]}
      accessibilityRole={accessibilityRole}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      testID={testID}
      {...rest}
    >
      {children}
    </View>
  );
};

// ============================================================================
// UTILITY FUNCTIONS & EXPORTS
// ============================================================================

/**
 * Flex utilities for common operations
 */
export const flexUtils = {
  /**
   * Create a flex style object
   */
  createFlexStyle: (config: Partial<FlexProps>, theme: ThemeContextType): ViewStyle => {
    const {
      direction = 'row',
      wrap = 'nowrap',
      alignItems = 'start',
      justifyContent = 'start',
      gap = 'none',
      customGap,
      padding = 'none',
      customPadding,
      margin = 'none',
      customMargin,
    } = config;
    
    const style: ViewStyle = {
      display: 'flex',
      flexDirection: direction,
      flexWrap: wrap,
      alignItems: convertAlignment(alignItems),
      justifyContent: convertJustification(justifyContent),
    };
    
    // Gap
    if (customGap !== undefined) {
      style.gap = customGap;
    } else if (gap && gap !== 'none') {
      style.gap = getSpacingValue(theme, gap);
    }
    
    // Padding
    if (customPadding !== undefined) {
      style.padding = customPadding;
    } else if (padding && padding !== 'none') {
      style.padding = getSpacingValue(theme, padding);
    }
    
    // Margin
    if (customMargin !== undefined) {
      style.margin = customMargin;
    } else if (margin && margin !== 'none') {
      style.margin = getSpacingValue(theme, margin);
    }
    
    return style;
  },
  
  /**
   * Get preset configuration
   */
  getPreset: (preset: FlexPreset): Partial<FlexProps> => {
    return getPresetConfig(preset);
  },
  
  /**
   * Validate flex props
   */
  validateProps: (props: FlexProps): boolean => {
    const { direction, wrap, alignItems, justifyContent, gap } = props;
    
    const validDirections: FlexDirection[] = ['row', 'column', 'row-reverse', 'column-reverse'];
    const validWraps: FlexWrap[] = ['wrap', 'nowrap', 'wrap-reverse'];
    const validAlignments: FlexAlignment[] = ['start', 'center', 'end', 'stretch', 'baseline'];
    const validJustifications: FlexJustification[] = ['start', 'center', 'end', 'space-between', 'space-around', 'space-evenly'];
    const validSpacing: FlexSpacing[] = ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
    
    if (direction && !validDirections.includes(direction)) {
      console.warn(`Invalid flex direction: ${direction}`);
      return false;
    }
    
    if (wrap && !validWraps.includes(wrap)) {
      console.warn(`Invalid flex wrap: ${wrap}`);
      return false;
    }
    
    if (alignItems && !validAlignments.includes(alignItems)) {
      console.warn(`Invalid flex alignItems: ${alignItems}`);
      return false;
    }
    
    if (justifyContent && !validJustifications.includes(justifyContent)) {
      console.warn(`Invalid flex justifyContent: ${justifyContent}`);
      return false;
    }
    
    if (gap && !validSpacing.includes(gap)) {
      console.warn(`Invalid flex gap: ${gap}`);
      return false;
    }
    
    return true;
  },
  
  /**
   * Get responsive flex configuration
   */
  getResponsiveConfig: (
    mobile?: Partial<FlexProps>,
    tablet?: Partial<FlexProps>,
    desktop?: Partial<FlexProps>
  ): ResponsiveFlexConfig => {
    return {
      mobile,
      tablet,
      desktop,
    };
  },
};

export default Flex;
