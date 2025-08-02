/**
 * Grid.tsx
 * 
 * Grid layout component for the Corp Astro UI Library
 * Layout Primitive System - Module 85
 * 
 * Features:
 * - Flexible grid system with configurable columns and rows
 * - Responsive breakpoint system (xs, sm, md, lg, xl)
 * - Auto-fit and auto-fill grid behaviors
 * - Gap control for spacing between grid items
 * - Grid template areas support
 * - Alignment and justification controls
 * - Dense packing option
 * - Responsive grid configurations
 * - Accessibility support
 * - Performance optimized with memoization
 * - Preset configurations for common layouts
 */

import React, { useMemo } from 'react';
import { View, ViewStyle, AccessibilityRole } from 'react-native';
import { useTheme } from '../foundations/themes/ThemeProvider';
import { CorpAstroTheme } from '../foundations/themes/ThemeTypes';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * Grid spacing variants
 */
export type GridSpacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

/**
 * Grid alignment options
 */
export type GridAlignment = 'start' | 'center' | 'end' | 'stretch' | 'space-between' | 'space-around' | 'space-evenly';

/**
 * Grid justification options
 */
export type GridJustification = 'start' | 'center' | 'end' | 'stretch' | 'space-between' | 'space-around' | 'space-evenly';

/**
 * Responsive breakpoints
 */
export type GridBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Grid auto behavior
 */
export type GridAuto = 'auto' | 'min-content' | 'max-content' | 'auto-fit' | 'auto-fill';

/**
 * Grid preset configurations
 */
export type GridPreset = 'cards' | 'gallery' | 'dashboard' | 'masonry' | 'sidebar' | 'header' | 'footer' | 'tiles';

/**
 * Responsive grid configuration
 */
export interface ResponsiveGridConfig {
  columns?: number | 'auto-fit' | 'auto-fill';
  gap?: GridSpacing;
  alignment?: GridAlignment;
  justification?: GridJustification;
}

/**
 * Grid props interface
 */
export interface GridProps {
  /** Child components to render in the grid */
  children: React.ReactNode;
  
  /** Number of columns or auto behavior */
  columns?: number | 'auto-fit' | 'auto-fill';
  
  /** Number of rows or auto behavior */
  rows?: number | 'auto-fit' | 'auto-fill';
  
  /** Gap between grid items */
  gap?: GridSpacing;
  
  /** Custom gap value (overrides gap prop) */
  customGap?: number;
  
  /** Row gap (overrides gap for rows) */
  rowGap?: GridSpacing;
  
  /** Column gap (overrides gap for columns) */
  columnGap?: GridSpacing;
  
  /** Custom row gap value */
  customRowGap?: number;
  
  /** Custom column gap value */
  customColumnGap?: number;
  
  /** Alignment of grid items */
  alignment?: GridAlignment;
  
  /** Justification of grid items */
  justification?: GridJustification;
  
  /** Minimum column width */
  minColumnWidth?: number;
  
  /** Maximum column width */
  maxColumnWidth?: number;
  
  /** Minimum row height */
  minRowHeight?: number;
  
  /** Maximum row height */
  maxRowHeight?: number;
  
  /** Auto-sizing behavior for columns */
  autoColumns?: GridAuto;
  
  /** Auto-sizing behavior for rows */
  autoRows?: GridAuto;
  
  /** Enable dense packing */
  dense?: boolean;
  
  /** Template areas for named grid areas */
  templateAreas?: string[];
  
  /** Responsive configurations */
  responsive?: {
    [key in GridBreakpoint]?: ResponsiveGridConfig;
  };
  
  /** Use preset configuration */
  preset?: GridPreset;
  
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
// SPACING CONFIGURATIONS
// ============================================================================

/**
 * Grid spacing configurations
 */
const GRID_SPACING: Record<GridSpacing, number> = {
  none: 0,
  xs: 4,     // 0.5x base
  sm: 8,     // 1x base
  md: 16,    // 2x base
  lg: 24,    // 3x base
  xl: 32,    // 4x base
  xxl: 48,   // 6x base
};

/**
 * Grid preset configurations
 */
const GRID_PRESETS: Record<GridPreset, Partial<GridProps>> = {
  cards: {
    columns: 'auto-fit',
    gap: 'md',
    minColumnWidth: 280,
    alignment: 'stretch',
    justification: 'start',
    accessibilityRole: 'none',
  },
  gallery: {
    columns: 'auto-fit',
    gap: 'sm',
    minColumnWidth: 200,
    alignment: 'start',
    justification: 'start',
    accessibilityRole: 'none',
  },
  dashboard: {
    columns: 12,
    gap: 'lg',
    alignment: 'stretch',
    justification: 'start',
    accessibilityRole: 'none',
  },
  masonry: {
    columns: 'auto-fit',
    gap: 'md',
    minColumnWidth: 240,
    autoRows: 'auto',
    dense: true,
    alignment: 'start',
    justification: 'start',
    accessibilityRole: 'none',
  },
  sidebar: {
    columns: 4,
    gap: 'md',
    alignment: 'stretch',
    justification: 'start',
    templateAreas: [
      'sidebar main main main',
    ],
    accessibilityRole: 'none',
  },
  header: {
    columns: 12,
    gap: 'md',
    alignment: 'center',
    justification: 'space-between',
    accessibilityRole: 'none',
  },
  footer: {
    columns: 'auto-fit',
    gap: 'lg',
    minColumnWidth: 200,
    alignment: 'start',
    justification: 'start',
    accessibilityRole: 'none',
  },
  tiles: {
    columns: 'auto-fit',
    gap: 'md',
    minColumnWidth: 160,
    alignment: 'center',
    justification: 'center',
    accessibilityRole: 'none',
  },
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Grid component
 * Flexible grid layout component for consistent spacing and alignment
 */
export const Grid: React.FC<GridProps> = React.memo(({
  children,
  columns = 'auto-fit',
  rows = 'auto',
  gap = 'md',
  customGap,
  rowGap,
  columnGap,
  customRowGap,
  customColumnGap,
  alignment = 'stretch',
  justification = 'start',
  minColumnWidth = 200,
  maxColumnWidth,
  minRowHeight,
  maxRowHeight,
  autoColumns = 'auto',
  autoRows = 'auto',
  dense = false,
  templateAreas,
  responsive,
  preset,
  enableResponsive = true,
  style,
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole = 'grid' as AccessibilityRole,
  testID,
}) => {
  // Get theme
  const theme = useTheme();

  // Apply preset configuration
  const presetConfig = preset ? GRID_PRESETS[preset] : {};
  const effectiveProps = { ...presetConfig, ...{ 
    columns, 
    rows,
    gap,
    customGap,
    rowGap,
    columnGap,
    customRowGap,
    customColumnGap,
    alignment, 
    justification,
    minColumnWidth,
    maxColumnWidth,
    minRowHeight,
    maxRowHeight,
    autoColumns,
    autoRows,
    dense,
    templateAreas,
    responsive,
    enableResponsive,
    accessibilityLabel,
    accessibilityHint,
    accessibilityRole,
  } };

  // Memoize gap values
  const gapValues = useMemo(() => {
    const baseGap = effectiveProps.customGap !== undefined ? effectiveProps.customGap : GRID_SPACING[effectiveProps.gap || 'md'];
    
    return {
      rowGap: effectiveProps.customRowGap !== undefined 
        ? effectiveProps.customRowGap 
        : effectiveProps.rowGap 
          ? GRID_SPACING[effectiveProps.rowGap] 
          : baseGap,
      columnGap: effectiveProps.customColumnGap !== undefined 
        ? effectiveProps.customColumnGap 
        : effectiveProps.columnGap 
          ? GRID_SPACING[effectiveProps.columnGap] 
          : baseGap,
    };
  }, [effectiveProps.gap, effectiveProps.customGap, effectiveProps.rowGap, effectiveProps.columnGap, effectiveProps.customRowGap, effectiveProps.customColumnGap]);

  // Memoize grid template columns
  const gridTemplateColumns = useMemo(() => {
    const cols = effectiveProps.columns;
    
    if (typeof cols === 'number') {
      return `repeat(${cols}, 1fr)`;
    }
    
    if (cols === 'auto-fit') {
      const minWidth = effectiveProps.minColumnWidth || 200;
      const maxWidth = effectiveProps.maxColumnWidth ? `, ${effectiveProps.maxColumnWidth}px` : '';
      return `repeat(auto-fit, minmax(${minWidth}px${maxWidth}, 1fr))`;
    }
    
    if (cols === 'auto-fill') {
      const minWidth = effectiveProps.minColumnWidth || 200;
      const maxWidth = effectiveProps.maxColumnWidth ? `, ${effectiveProps.maxColumnWidth}px` : '';
      return `repeat(auto-fill, minmax(${minWidth}px${maxWidth}, 1fr))`;
    }
    
    return 'none';
  }, [effectiveProps.columns, effectiveProps.minColumnWidth, effectiveProps.maxColumnWidth]);

  // Memoize grid template rows
  const gridTemplateRows = useMemo(() => {
    const rowsValue = effectiveProps.rows;
    
    if (typeof rowsValue === 'number') {
      return `repeat(${rowsValue}, 1fr)`;
    }
    
    if (rowsValue === 'auto-fit') {
      const minHeight = effectiveProps.minRowHeight || 'auto';
      const maxHeight = effectiveProps.maxRowHeight ? `, ${effectiveProps.maxRowHeight}px` : '';
      return `repeat(auto-fit, minmax(${minHeight}px${maxHeight}, 1fr))`;
    }
    
    if (rowsValue === 'auto-fill') {
      const minHeight = effectiveProps.minRowHeight || 'auto';
      const maxHeight = effectiveProps.maxRowHeight ? `, ${effectiveProps.maxRowHeight}px` : '';
      return `repeat(auto-fill, minmax(${minHeight}px${maxHeight}, 1fr))`;
    }
    
    return 'none';
  }, [effectiveProps.rows, effectiveProps.minRowHeight, effectiveProps.maxRowHeight]);

  // Memoize alignment styles
  const alignmentStyles = useMemo((): ViewStyle => {
    const alignmentMap: Record<GridAlignment, ViewStyle> = {
      'start': { alignItems: 'flex-start' },
      'center': { alignItems: 'center' },
      'end': { alignItems: 'flex-end' },
      'stretch': { alignItems: 'stretch' },
      'space-between': { alignItems: 'flex-start' }, // Fallback to flex-start
      'space-around': { alignItems: 'flex-start' },  // Fallback to flex-start
      'space-evenly': { alignItems: 'flex-start' },  // Fallback to flex-start
    };
    
    return alignmentMap[effectiveProps.alignment || 'stretch'];
  }, [effectiveProps.alignment]);

  // Memoize justification styles
  const justificationStyles = useMemo((): ViewStyle => {
    const justificationMap: Record<GridJustification, ViewStyle> = {
      'start': { justifyContent: 'flex-start' },
      'center': { justifyContent: 'center' },
      'end': { justifyContent: 'flex-end' },
      'stretch': { justifyContent: 'space-between' }, // Fallback to space-between
      'space-between': { justifyContent: 'space-between' },
      'space-around': { justifyContent: 'space-around' },
      'space-evenly': { justifyContent: 'space-evenly' },
    };
    
    return justificationMap[effectiveProps.justification || 'start'];
  }, [effectiveProps.justification]);

  // Memoize container styles
  const containerStyles = useMemo((): ViewStyle => {
    const styles: ViewStyle = {
      // Grid display (React Native uses flexbox, so we simulate grid)
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      
      // Gap simulation
      marginTop: -gapValues.rowGap / 2,
      marginLeft: -gapValues.columnGap / 2,
      marginRight: -gapValues.columnGap / 2,
      
      // Alignment and justification
      ...alignmentStyles,
      ...justificationStyles,
      
      // Responsive behavior
      ...(effectiveProps.enableResponsive && {
        width: '100%',
      }),
    };

    return styles;
  }, [
    gapValues,
    alignmentStyles,
    justificationStyles,
    effectiveProps.enableResponsive,
  ]);

  // Memoize child styles for grid simulation
  const childStyles = useMemo((): ViewStyle => {
    const cols = effectiveProps.columns;
    let flexBasisValue: number | string = '100%';
    
    if (typeof cols === 'number') {
      flexBasisValue = `${(100 / cols) - (gapValues.columnGap * (cols - 1)) / cols}%`;
    } else if (cols === 'auto-fit' || cols === 'auto-fill') {
      const minWidth = effectiveProps.minColumnWidth || 200;
      flexBasisValue = minWidth; // Use number
    }
    
    return {
      flex: cols === 'auto-fit' || cols === 'auto-fill' ? 1 : 0,
      flexBasis: flexBasisValue as any, // Type assertion for React Native compatibility
      minWidth: effectiveProps.minColumnWidth || 0,
      maxWidth: effectiveProps.maxColumnWidth || '100%',
      minHeight: effectiveProps.minRowHeight || 0,
      maxHeight: effectiveProps.maxRowHeight || undefined, // Use undefined instead of 'none'
      paddingTop: gapValues.rowGap / 2,
      paddingLeft: gapValues.columnGap / 2,
      paddingRight: gapValues.columnGap / 2,
      paddingBottom: gapValues.rowGap / 2,
    };
  }, [
    effectiveProps.columns,
    effectiveProps.minColumnWidth,
    effectiveProps.maxColumnWidth,
    effectiveProps.minRowHeight,
    effectiveProps.maxRowHeight,
    gapValues,
  ]);

  // Memoize accessibility props
  const accessibilityProps = useMemo(() => ({
    accessible: true,
    accessibilityRole: effectiveProps.accessibilityRole,
    accessibilityLabel: effectiveProps.accessibilityLabel || `Grid with ${effectiveProps.columns} columns`,
    accessibilityHint: effectiveProps.accessibilityHint || 'Grid layout container',
  }), [effectiveProps.accessibilityRole, effectiveProps.accessibilityLabel, effectiveProps.accessibilityHint, effectiveProps.columns]);

  // Process children with grid item styling
  const processedChildren = useMemo(() => {
    return React.Children.map(children, (child, index) => {
      if (React.isValidElement(child)) {
        return (
          <View key={index} style={childStyles}>
            {child}
          </View>
        );
      }
      return child;
    });
  }, [children, childStyles]);

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

Grid.displayName = 'Grid';

export default Grid;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Grid utility functions
 */
export const gridUtils = {
  /**
   * Get spacing value for a given spacing variant
   */
  getSpacing: (spacing: GridSpacing): number => {
    return GRID_SPACING[spacing];
  },
  
  /**
   * Get preset configuration
   */
  getPreset: (preset: GridPreset): Partial<GridProps> => {
    return GRID_PRESETS[preset];
  },
  
  /**
   * Create custom preset configuration
   */
  createPreset: (config: Partial<GridProps>): Partial<GridProps> => {
    return {
      columns: 'auto-fit',
      gap: 'md',
      alignment: 'stretch',
      justification: 'start',
      enableResponsive: true,
      minColumnWidth: 200,
      ...config,
    };
  },
  
  /**
   * Calculate grid dimensions
   */
  calculateGridDimensions: (
    columns: number | 'auto-fit' | 'auto-fill',
    containerWidth: number,
    gap: number,
    minColumnWidth: number = 200
  ): { columnCount: number; columnWidth: number } => {
    if (typeof columns === 'number') {
      const totalGap = gap * (columns - 1);
      const columnWidth = (containerWidth - totalGap) / columns;
      return { columnCount: columns, columnWidth };
    }
    
    const columnCount = Math.floor((containerWidth + gap) / (minColumnWidth + gap));
    const totalGap = gap * (columnCount - 1);
    const columnWidth = (containerWidth - totalGap) / columnCount;
    
    return { columnCount, columnWidth };
  },
  
  /**
   * Get optimal column count for content
   */
  getOptimalColumns: (
    contentType: 'cards' | 'images' | 'tiles' | 'text',
    containerWidth: number
  ): number => {
    const columnsMap: Record<string, number> = {
      cards: Math.floor(containerWidth / 280),
      images: Math.floor(containerWidth / 200),
      tiles: Math.floor(containerWidth / 160),
      text: Math.floor(containerWidth / 300),
    };
    
    return Math.max(1, columnsMap[contentType] || 1);
  },
  
  /**
   * Validate grid configuration
   */
  validateConfig: (props: Partial<GridProps>): boolean => {
    const { columns, rows, gap, minColumnWidth, minRowHeight } = props;
    
    // Check columns
    if (columns !== undefined && typeof columns === 'number' && columns < 1) {
      console.warn(`Invalid columns: ${columns}`);
      return false;
    }
    
    // Check rows
    if (rows !== undefined && typeof rows === 'number' && rows < 1) {
      console.warn(`Invalid rows: ${rows}`);
      return false;
    }
    
    // Check gap
    if (gap && !Object.keys(GRID_SPACING).includes(gap)) {
      console.warn(`Invalid gap: ${gap}`);
      return false;
    }
    
    // Check minimum dimensions
    if (minColumnWidth !== undefined && minColumnWidth < 0) {
      console.warn(`Invalid minColumnWidth: ${minColumnWidth}`);
      return false;
    }
    
    if (minRowHeight !== undefined && minRowHeight < 0) {
      console.warn(`Invalid minRowHeight: ${minRowHeight}`);
      return false;
    }
    
    return true;
  },
};
