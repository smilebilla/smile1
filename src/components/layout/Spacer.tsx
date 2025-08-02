import React from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';

export interface SpacerProps extends Omit<ViewProps, 'style'> {
  /**
   * Size of the spacer in logical pixels
   * @default 16
   */
  size?: number;
  
  /**
   * Custom width for horizontal spacing
   * Supports responsive values
   */
  width?: number | {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    '2xl'?: number;
  };
  
  /**
   * Custom height for vertical spacing
   * Supports responsive values
   */
  height?: number | {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    '2xl'?: number;
  };
  
  /**
   * Direction of the spacer
   * @default 'both'
   */
  direction?: 'horizontal' | 'vertical' | 'both';
  
  /**
   * Whether the spacer should be flexible (take available space)
   * @default false
   */
  flexible?: boolean;
  
  /**
   * Flex value when flexible is true
   * @default 1
   */
  flex?: number;
  
  /**
   * Minimum width constraint
   */
  minWidth?: number;
  
  /**
   * Maximum width constraint
   */
  maxWidth?: number;
  
  /**
   * Minimum height constraint
   */
  minHeight?: number;
  
  /**
   * Maximum height constraint
   */
  maxHeight?: number;
  
  /**
   * Whether to show debug visualization
   * @default false
   */
  debug?: boolean;
  
  /**
   * Custom style overrides
   */
  style?: ViewStyle;
  
  /**
   * Responsive configuration
   */
  responsive?: {
    xs?: Partial<SpacerProps>;
    sm?: Partial<SpacerProps>;
    md?: Partial<SpacerProps>;
    lg?: Partial<SpacerProps>;
    xl?: Partial<SpacerProps>;
    '2xl'?: Partial<SpacerProps>;
  };
  
  /**
   * Preset configurations
   */
  preset?: 'minimal' | 'compact' | 'comfortable' | 'spacious' | 'section' | 'page';
}

const sizeMap = {
  minimal: 4,
  compact: 8,
  comfortable: 16,
  spacious: 24,
  section: 48,
  page: 80
};

const presetMap = {
  minimal: { size: 4, direction: 'both' as const },
  compact: { size: 8, direction: 'both' as const },
  comfortable: { size: 16, direction: 'both' as const },
  spacious: { size: 24, direction: 'both' as const },
  section: { size: 48, direction: 'vertical' as const },
  page: { size: 80, direction: 'vertical' as const }
};

const getResponsiveValue = (
  value: number | { [key: string]: number } | undefined,
  breakpoint: string = 'md'
): number | undefined => {
  if (typeof value === 'number') {
    return value;
  }
  
  if (typeof value === 'object' && value) {
    // For simplicity, we'll use the provided breakpoint or fallback to 'md'
    return value[breakpoint] || value.md || value.sm || value.xs;
  }
  
  return undefined;
};

const generateStyles = (props: SpacerProps): ViewStyle => {
  const {
    size = 16,
    width,
    height,
    direction = 'both',
    flexible = false,
    flex = 1,
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
    debug = false,
    style,
    preset
  } = props;
  
  // Apply preset if provided
  const finalProps = preset ? { ...presetMap[preset], ...props } : props;
  const finalSize = finalProps.size || size;
  const finalDirection = finalProps.direction || direction;
  
  const baseStyle: ViewStyle = {
    // Default spacing based on size and direction
    width: finalDirection === 'vertical' ? 0 : (getResponsiveValue(width) || finalSize),
    height: finalDirection === 'horizontal' ? 0 : (getResponsiveValue(height) || finalSize),
    
    // Flexible behavior
    ...(flexible && { flex }),
    
    // Size constraints
    ...(minWidth && { minWidth }),
    ...(maxWidth && { maxWidth }),
    ...(minHeight && { minHeight }),
    ...(maxHeight && { maxHeight }),
    
    // Debug visualization
    ...(debug && {
      backgroundColor: 'rgba(255, 0, 0, 0.2)',
      borderWidth: 1,
      borderColor: 'rgba(255, 0, 0, 0.5)',
      borderStyle: 'dashed'
    })
  };
  
  return {
    ...baseStyle,
    ...style
  };
};

export const Spacer = React.forwardRef<View, SpacerProps>((props, ref) => {
  const {
    responsive,
    ...rest
  } = props;
  
  // For now, we'll use a simple responsive approach
  // In a production app, you'd typically use a responsive hook or context
  const currentBreakpoint = 'md'; // This would come from a responsive hook
  
  // Apply responsive configuration
  const responsiveProps = responsive?.[currentBreakpoint] || {};
  const finalProps = { ...rest, ...responsiveProps };
  
  const spacerStyle = generateStyles(finalProps);
  
  return (
    <View
      ref={ref}
      style={spacerStyle}
      accessibilityRole="none"
      importantForAccessibility="no"
      {...rest}
    />
  );
});

Spacer.displayName = 'Spacer';

export default Spacer;
