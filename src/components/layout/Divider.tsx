import React from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';

export interface DividerProps extends Omit<ViewProps, 'style'> {
  /**
   * Orientation of the divider
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
  
  /**
   * Color of the divider
   * @default 'border'
   */
  color?: 'border' | 'muted' | 'primary' | 'secondary' | 'accent' | 'error' | 'warning' | 'success' | string;
  
  /**
   * Thickness of the divider in pixels
   * @default 1
   */
  thickness?: number;
  
  /**
   * Length of the divider (width for horizontal, height for vertical)
   * @default '100%'
   */
  length?: number | string;
  
  /**
   * Style variant of the divider
   * @default 'solid'
   */
  variant?: 'solid' | 'dashed' | 'dotted' | 'gradient' | 'glow';
  
  /**
   * Spacing around the divider
   * @default 'md'
   */
  spacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  
  /**
   * Opacity of the divider
   * @default 1
   */
  opacity?: number;
  
  /**
   * Whether the divider should be inset from the edges
   * @default false
   */
  inset?: boolean;
  
  /**
   * Inset amount in pixels
   * @default 16
   */
  insetAmount?: number;
  
  /**
   * Gradient colors for gradient variant
   */
  gradientColors?: [string, string];
  
  /**
   * Gradient direction for gradient variant
   * @default 'horizontal'
   */
  gradientDirection?: 'horizontal' | 'vertical' | 'diagonal';
  
  /**
   * Glow effect intensity for glow variant
   * @default 0.5
   */
  glowIntensity?: number;
  
  /**
   * Glow effect radius for glow variant
   * @default 10
   */
  glowRadius?: number;
  
  /**
   * Custom style overrides
   */
  style?: ViewStyle;
  
  /**
   * Responsive configuration
   */
  responsive?: {
    xs?: Partial<DividerProps>;
    sm?: Partial<DividerProps>;
    md?: Partial<DividerProps>;
    lg?: Partial<DividerProps>;
    xl?: Partial<DividerProps>;
    '2xl'?: Partial<DividerProps>;
  };
  
  /**
   * Preset configurations
   */
  preset?: 'subtle' | 'prominent' | 'section' | 'card' | 'list' | 'nav';
}

const colorMap = {
  border: '#E5E7EB',
  muted: '#9CA3AF',
  primary: '#54A0FF',
  secondary: '#A55EEA',
  accent: '#2E86DE',
  error: '#FF6B6B',
  warning: '#FFA726',
  success: '#5CB85C'
};

const spacingMap = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48
};

const presetMap = {
  subtle: {
    color: 'muted' as const,
    thickness: 1,
    opacity: 0.3,
    spacing: 'sm' as const,
    variant: 'solid' as const
  },
  prominent: {
    color: 'primary' as const,
    thickness: 2,
    opacity: 0.8,
    spacing: 'md' as const,
    variant: 'solid' as const
  },
  section: {
    color: 'border' as const,
    thickness: 1,
    opacity: 0.6,
    spacing: 'lg' as const,
    variant: 'solid' as const
  },
  card: {
    color: 'border' as const,
    thickness: 1,
    opacity: 0.2,
    spacing: 'md' as const,
    variant: 'solid' as const,
    inset: true
  },
  list: {
    color: 'muted' as const,
    thickness: 1,
    opacity: 0.4,
    spacing: 'xs' as const,
    variant: 'solid' as const,
    inset: true,
    insetAmount: 16
  },
  nav: {
    color: 'primary' as const,
    thickness: 2,
    opacity: 0.6,
    spacing: 'sm' as const,
    variant: 'glow' as const,
    glowIntensity: 0.3
  }
};

const getDividerColor = (color: string): string => {
  return colorMap[color as keyof typeof colorMap] || color;
};

const generateGradient = (
  colors: [string, string],
  direction: 'horizontal' | 'vertical' | 'diagonal'
): ViewStyle => {
  // React Native doesn't support CSS gradients directly
  // This would need to be implemented with a library like react-native-linear-gradient
  // For now, we'll use the first color as a fallback
  return {
    backgroundColor: colors[0]
  };
};

const generateGlowEffect = (
  color: string,
  intensity: number,
  radius: number
): ViewStyle => {
  return {
    shadowColor: color,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: intensity,
    shadowRadius: radius,
    elevation: 2 // Android shadow
  };
};

const generateStyles = (props: DividerProps): ViewStyle => {
  const {
    orientation = 'horizontal',
    color = 'border',
    thickness = 1,
    length = '100%',
    variant = 'solid',
    spacing = 'md',
    opacity = 1,
    inset = false,
    insetAmount = 16,
    gradientColors,
    gradientDirection = 'horizontal',
    glowIntensity = 0.5,
    glowRadius = 10,
    style,
    preset
  } = props;
  
  // Apply preset if provided
  const finalProps = preset ? { ...presetMap[preset], ...props } : props;
  const finalColor = getDividerColor(finalProps.color || color);
  const finalThickness = finalProps.thickness || thickness;
  const finalOpacity = finalProps.opacity || opacity;
  const finalSpacing = spacingMap[finalProps.spacing || spacing];
  const finalVariant = finalProps.variant || variant;
  const finalInset = finalProps.inset || inset;
  const finalInsetAmount = finalProps.insetAmount || insetAmount;
  
  const baseStyle: ViewStyle = {
    opacity: finalOpacity,
    alignSelf: orientation === 'horizontal' ? 'stretch' : 'flex-start'
  };
  
  // Orientation-specific styles
  if (orientation === 'horizontal') {
    baseStyle.width = typeof length === 'number' ? length : (length as any);
    baseStyle.height = finalThickness;
    baseStyle.marginVertical = finalSpacing;
    
    if (finalInset) {
      baseStyle.marginHorizontal = finalInsetAmount;
    }
  } else {
    baseStyle.height = typeof length === 'number' ? length : (length as any);
    baseStyle.width = finalThickness;
    baseStyle.marginHorizontal = finalSpacing;
    
    if (finalInset) {
      baseStyle.marginVertical = finalInsetAmount;
    }
  }
  
  // Variant-specific styles
  switch (finalVariant) {
    case 'solid':
      baseStyle.backgroundColor = finalColor;
      break;
      
    case 'dashed':
      baseStyle.backgroundColor = finalColor;
      baseStyle.borderStyle = 'dashed';
      baseStyle.borderWidth = finalThickness;
      baseStyle.borderColor = finalColor;
      baseStyle.backgroundColor = 'transparent';
      break;
      
    case 'dotted':
      baseStyle.backgroundColor = finalColor;
      baseStyle.borderStyle = 'dotted';
      baseStyle.borderWidth = finalThickness;
      baseStyle.borderColor = finalColor;
      baseStyle.backgroundColor = 'transparent';
      break;
      
    case 'gradient':
      if (gradientColors) {
        Object.assign(baseStyle, generateGradient(gradientColors, gradientDirection));
      } else {
        baseStyle.backgroundColor = finalColor;
      }
      break;
      
    case 'glow':
      baseStyle.backgroundColor = finalColor;
      Object.assign(baseStyle, generateGlowEffect(finalColor, glowIntensity, glowRadius));
      break;
      
    default:
      baseStyle.backgroundColor = finalColor;
  }
  
  return {
    ...baseStyle,
    ...style
  };
};

export const Divider = React.forwardRef<View, DividerProps>((props, ref) => {
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
  
  const dividerStyle = generateStyles(finalProps);
  
  return (
    <View
      ref={ref}
      style={dividerStyle}
      accessibilityRole="none"
      {...rest}
    />
  );
});

Divider.displayName = 'Divider';

export default Divider;
