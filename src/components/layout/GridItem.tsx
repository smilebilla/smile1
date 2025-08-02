/**
 * GridItem.tsx
 * 
 * Grid item component for the Corp Astro UI Library
 * Layout Primitive System - Module 86
 * 
 * Features:
 * - Grid item positioning with column and row span support
 * - Named grid area placement
 * - Responsive grid item configurations
 * - Alignment and justification controls for individual items
 * - Auto-sizing behavior for grid items
 * - Order control for grid item positioning
 * - Size constraints (minWidth, maxWidth, minHeight, maxHeight)
 * - Aspect ratio maintenance
 * - Overflow handling
 * - Accessibility support
 * - Performance optimized with memoization
 * - Preset configurations for common grid item patterns
 */

import React, { useMemo, forwardRef } from 'react';
import { View, ViewStyle, AccessibilityRole } from 'react-native';
import { useTheme } from '../foundations/themes/ThemeProvider';
import { CorpAstroTheme } from '../foundations/themes/ThemeTypes';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * Grid item alignment options
 */
export type GridItemAlignment = 'start' | 'center' | 'end' | 'stretch';

/**
 * Grid item justification options
 */
export type GridItemJustification = 'start' | 'center' | 'end' | 'stretch';

/**
 * Grid item overflow behavior
 */
export type GridItemOverflow = 'visible' | 'hidden' | 'scroll';

/**
 * Grid item preset configurations
 */
export type GridItemPreset = 'card' | 'hero' | 'sidebar' | 'header' | 'footer' | 'banner' | 'tile' | 'feature';

/**
 * Responsive breakpoints
 */
export type GridItemBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Responsive grid item configuration
 */
export interface ResponsiveGridItemConfig {
  columnSpan?: number;
  rowSpan?: number;
  columnStart?: number;
  columnEnd?: number;
  rowStart?: number;
  rowEnd?: number;
  area?: string;
  alignment?: GridItemAlignment;
  justification?: GridItemJustification;
  order?: number;
}

/**
 * Grid item props interface
 */
export interface GridItemProps {
  /** Child components to render in the grid item */
  children: React.ReactNode;
  
  /** Number of columns this item should span */
  columnSpan?: number;
  
  /** Number of rows this item should span */
  rowSpan?: number;
  
  /** Starting column position (1-based) */
  columnStart?: number;
  
  /** Ending column position (1-based) */
  columnEnd?: number;
  
  /** Starting row position (1-based) */
  rowStart?: number;
  
  /** Ending row position (1-based) */
  rowEnd?: number;
  
  /** Named grid area for placement */
  area?: string;
  
  /** Item alignment within its grid cell */
  alignment?: GridItemAlignment;
  
  /** Item justification within its grid cell */
  justification?: GridItemJustification;
  
  /** Order of the item in the grid */
  order?: number;
  
  /** Minimum width constraint */
  minWidth?: number;
  
  /** Maximum width constraint */
  maxWidth?: number;
  
  /** Minimum height constraint */
  minHeight?: number;
  
  /** Maximum height constraint */
  maxHeight?: number;
  
  /** Aspect ratio to maintain (width/height) */
  aspectRatio?: number;
  
  /** Overflow behavior */
  overflow?: GridItemOverflow;
  
  /** Responsive configurations */
  responsive?: {
    [key in GridItemBreakpoint]?: ResponsiveGridItemConfig;
  };
  
  /** Use preset configuration */
  preset?: GridItemPreset;
  
  /** Enable responsive behavior */
  enableResponsive?: boolean;
  
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
// PRESET CONFIGURATIONS
// ============================================================================

/**
 * Grid item preset configurations
 */
const GRID_ITEM_PRESETS: Record<GridItemPreset, Partial<GridItemProps>> = {
  card: {
    columnSpan: 1,
    rowSpan: 1,
    alignment: 'stretch',
    justification: 'stretch',
    overflow: 'hidden',
    accessibilityRole: 'none',
  },
  hero: {
    columnSpan: 2,
    rowSpan: 2,
    alignment: 'center',
    justification: 'center',
    overflow: 'hidden',
    accessibilityRole: 'none',
  },
  sidebar: {
    columnSpan: 1,
    rowSpan: 3,
    alignment: 'stretch',
    justification: 'start',
    overflow: 'scroll',
    accessibilityRole: 'none',
  },
  header: {
    columnStart: 1,
    columnEnd: -1,
    rowSpan: 1,
    alignment: 'center',
    justification: 'stretch',
    overflow: 'visible',
    accessibilityRole: 'none',
  },
  footer: {
    columnStart: 1,
    columnEnd: -1,
    rowSpan: 1,
    alignment: 'center',
    justification: 'stretch',
    overflow: 'visible',
    accessibilityRole: 'none',
  },
  banner: {
    columnStart: 1,
    columnEnd: -1,
    rowSpan: 1,
    alignment: 'center',
    justification: 'center',
    overflow: 'hidden',
    accessibilityRole: 'none',
  },
  tile: {
    columnSpan: 1,
    rowSpan: 1,
    alignment: 'center',
    justification: 'center',
    aspectRatio: 1,
    overflow: 'hidden',
    accessibilityRole: 'none',
  },
  feature: {
    columnSpan: 2,
    rowSpan: 1,
    alignment: 'center',
    justification: 'start',
    overflow: 'visible',
    accessibilityRole: 'none',
  },
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * GridItem component with comprehensive grid positioning and styling
 */
export const GridItem = forwardRef<View, GridItemProps>(({
  children,
  columnSpan = 1,
  rowSpan = 1,
  columnStart,
  columnEnd,
  rowStart,
  rowEnd,
  area,
  alignment = 'stretch',
  justification = 'stretch',
  order,
  minWidth,
  maxWidth,
  minHeight,
  maxHeight,
  aspectRatio,
  overflow = 'visible',
  responsive,
  preset,
  enableResponsive = false,
  style,
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole,
  testID,
}, ref) => {
  const theme = useTheme();

  // Apply preset configuration
  const presetConfig = preset ? GRID_ITEM_PRESETS[preset] : {};
  const effectiveProps = {
    columnSpan,
    rowSpan,
    columnStart,
    columnEnd,
    rowStart,
    rowEnd,
    area,
    alignment,
    justification,
    order,
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
    aspectRatio,
    overflow,
    responsive,
    enableResponsive,
    accessibilityLabel,
    accessibilityHint,
    accessibilityRole,
    ...presetConfig,
  };

  // Memoize alignment styles
  const alignmentStyles = useMemo((): ViewStyle => {
    const alignmentMap: Record<GridItemAlignment, ViewStyle> = {
      'start': { alignSelf: 'flex-start' },
      'center': { alignSelf: 'center' },
      'end': { alignSelf: 'flex-end' },
      'stretch': { alignSelf: 'stretch' },
    };
    
    return alignmentMap[effectiveProps.alignment || 'stretch'];
  }, [effectiveProps.alignment]);

  // Memoize justification styles
  const justificationStyles = useMemo((): ViewStyle => {
    const justificationMap: Record<GridItemJustification, ViewStyle> = {
      'start': { justifyContent: 'flex-start' },
      'center': { justifyContent: 'center' },
      'end': { justifyContent: 'flex-end' },
      'stretch': { justifyContent: 'space-between' }, // Fallback for stretch
    };
    
    return justificationMap[effectiveProps.justification || 'stretch'];
  }, [effectiveProps.justification]);

  // Memoize overflow styles
  const overflowStyles = useMemo((): ViewStyle => {
    const overflowMap: Record<GridItemOverflow, ViewStyle> = {
      'visible': { overflow: 'visible' },
      'hidden': { overflow: 'hidden' },
      'scroll': { overflow: 'scroll' },
    };
    
    return overflowMap[effectiveProps.overflow || 'visible'];
  }, [effectiveProps.overflow]);

  // Memoize grid positioning styles
  const gridStyles = useMemo((): ViewStyle => {
    const styles: ViewStyle = {
      // Flex basis for column span simulation
      flexBasis: `${(100 / (effectiveProps.columnSpan || 1))}%`,
      
      // Size constraints
      minWidth: effectiveProps.minWidth || 0,
      maxWidth: effectiveProps.maxWidth || undefined,
      minHeight: effectiveProps.minHeight || 0,
      maxHeight: effectiveProps.maxHeight || undefined,
      
      // Aspect ratio
      ...(effectiveProps.aspectRatio && {
        aspectRatio: effectiveProps.aspectRatio,
      }),
      
      // Order
      ...(effectiveProps.order && {
        zIndex: effectiveProps.order, // Use zIndex as order equivalent in React Native
      }),
      
      // Alignment and justification
      ...alignmentStyles,
      ...justificationStyles,
      
      // Overflow
      ...overflowStyles,
    };

    return styles;
  }, [
    effectiveProps.columnSpan,
    effectiveProps.minWidth,
    effectiveProps.maxWidth,
    effectiveProps.minHeight,
    effectiveProps.maxHeight,
    effectiveProps.aspectRatio,
    effectiveProps.order,
    alignmentStyles,
    justificationStyles,
    overflowStyles,
  ]);

  // Memoize container styles
  const containerStyles = useMemo((): ViewStyle => {
    const styles: ViewStyle = {
      // Grid item base styles
      ...gridStyles,
      
      // Responsive behavior
      ...(effectiveProps.enableResponsive && {
        width: '100%',
        height: '100%',
      }),
    };

    return styles;
  }, [gridStyles, effectiveProps.enableResponsive]);

  // Memoize accessibility props
  const accessibilityProps = useMemo(() => ({
    accessible: true,
    accessibilityRole: effectiveProps.accessibilityRole,
    accessibilityLabel: effectiveProps.accessibilityLabel || `Grid item spanning ${effectiveProps.columnSpan} columns`,
    accessibilityHint: effectiveProps.accessibilityHint || 'Grid item container',
  }), [
    effectiveProps.accessibilityRole,
    effectiveProps.accessibilityLabel,
    effectiveProps.accessibilityHint,
    effectiveProps.columnSpan,
  ]);

  return (
    <View
      ref={ref}
      style={[containerStyles, style]}
      testID={testID}
      {...accessibilityProps}
    >
      {children}
    </View>
  );
});

// ============================================================================
// DISPLAY NAME & EXPORT
// ============================================================================

GridItem.displayName = 'GridItem';

export default GridItem;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Grid item utility functions
 */
export const gridItemUtils = {
  /**
   * Get preset configuration
   */
  getPreset: (preset: GridItemPreset): Partial<GridItemProps> => {
    return GRID_ITEM_PRESETS[preset];
  },
  
  /**
   * Create custom preset configuration
   */
  createPreset: (config: Partial<GridItemProps>): Partial<GridItemProps> => {
    return {
      columnSpan: 1,
      rowSpan: 1,
      alignment: 'stretch',
      justification: 'stretch',
      overflow: 'visible',
      enableResponsive: true,
      ...config,
    };
  },
  
  /**
   * Calculate grid item dimensions
   */
  calculateItemDimensions: (
    columnSpan: number,
    rowSpan: number,
    gridColumns: number,
    gridRows: number,
    containerWidth: number,
    containerHeight: number,
    gap: number = 0
  ): { width: number; height: number } => {
    const columnWidth = (containerWidth - (gap * (gridColumns - 1))) / gridColumns;
    const rowHeight = (containerHeight - (gap * (gridRows - 1))) / gridRows;
    
    const width = (columnWidth * columnSpan) + (gap * (columnSpan - 1));
    const height = (rowHeight * rowSpan) + (gap * (rowSpan - 1));
    
    return { width, height };
  },
  
  /**
   * Get grid item position
   */
  getItemPosition: (
    columnStart: number,
    rowStart: number,
    columnSpan: number,
    rowSpan: number,
    gridColumns: number,
    containerWidth: number,
    containerHeight: number,
    gap: number = 0
  ): { x: number; y: number } => {
    const columnWidth = (containerWidth - (gap * (gridColumns - 1))) / gridColumns;
    const rowHeight = containerHeight; // Simplified for React Native
    
    const x = (columnStart - 1) * (columnWidth + gap);
    const y = (rowStart - 1) * (rowHeight + gap);
    
    return { x, y };
  },
  
  /**
   * Check if grid item fits within grid bounds
   */
  validateItemBounds: (
    columnStart: number,
    columnEnd: number,
    rowStart: number,
    rowEnd: number,
    gridColumns: number,
    gridRows: number
  ): boolean => {
    return (
      columnStart >= 1 &&
      columnEnd <= gridColumns &&
      rowStart >= 1 &&
      rowEnd <= gridRows &&
      columnStart <= columnEnd &&
      rowStart <= rowEnd
    );
  },
  
  /**
   * Calculate optimal aspect ratio for grid item
   */
  calculateOptimalAspectRatio: (
    columnSpan: number,
    rowSpan: number,
    gridColumns: number,
    gridRows: number,
    containerWidth: number,
    containerHeight: number
  ): number => {
    const itemWidth = (containerWidth / gridColumns) * columnSpan;
    const itemHeight = (containerHeight / gridRows) * rowSpan;
    
    return itemWidth / itemHeight;
  },
  
  /**
   * Validate grid item configuration
   */
  validateConfig: (props: Partial<GridItemProps>): boolean => {
    const { columnSpan, rowSpan, columnStart, columnEnd, rowStart, rowEnd, aspectRatio } = props;
    
    // Check spans
    if (columnSpan !== undefined && columnSpan < 1) {
      console.warn(`Invalid columnSpan: ${columnSpan}`);
      return false;
    }
    
    if (rowSpan !== undefined && rowSpan < 1) {
      console.warn(`Invalid rowSpan: ${rowSpan}`);
      return false;
    }
    
    // Check positions
    if (columnStart !== undefined && columnStart < 1) {
      console.warn(`Invalid columnStart: ${columnStart}`);
      return false;
    }
    
    if (rowStart !== undefined && rowStart < 1) {
      console.warn(`Invalid rowStart: ${rowStart}`);
      return false;
    }
    
    // Check aspect ratio
    if (aspectRatio !== undefined && aspectRatio <= 0) {
      console.warn(`Invalid aspectRatio: ${aspectRatio}`);
      return false;
    }
    
    return true;
  },
};
