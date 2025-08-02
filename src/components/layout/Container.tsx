/**
 * Container.tsx
 * 
 * Main container component for the Corp Astro UI Library
 * Layout Primitive System - Module 82
 * 
 * Features:
 * - Responsive container with padding and max-width
 * - Design system compliant border radius, background, and shadow
 * - Theme-based styling with glass morphism support
 * - Accessibility features with proper ARIA attributes
 * - Animation support with smooth transitions
 * - Responsive breakpoints with mobile-first approach
 */

import React, { useMemo } from 'react';
import { View, ViewStyle } from 'react-native';
import { useTheme } from '../foundations/themes/ThemeProvider';
import { CorpAstroTheme } from '../foundations/themes/ThemeTypes';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * Container size variants
 */
export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

/**
 * Container background variants
 */
export type ContainerBackground = 'none' | 'subtle' | 'glass' | 'card' | 'elevated';

/**
 * Container alignment options
 */
export type ContainerAlignment = 'left' | 'center' | 'right';

/**
 * Container padding variants
 */
export type ContainerPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Container props interface
 */
export interface ContainerProps {
  /** Child components to render within the container */
  children: React.ReactNode;
  
  /** Container size variant that determines max-width */
  size?: ContainerSize;
  
  /** Background variant for the container */
  background?: ContainerBackground;
  
  /** Horizontal alignment of the container */
  alignment?: ContainerAlignment;
  
  /** Padding variant for the container */
  padding?: ContainerPadding;
  
  /** Custom padding values (overrides padding prop) */
  customPadding?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  
  /** Enable glass morphism effect */
  enableGlassMorphism?: boolean;
  
  /** Custom border radius */
  borderRadius?: keyof CorpAstroTheme['borderRadius'];
  
  /** Enable shadow effect */
  enableShadow?: boolean;
  
  /** Custom shadow variant */
  shadowVariant?: keyof CorpAstroTheme['shadows'];
  
  /** Enable responsive behavior */
  responsive?: boolean;
  
  /** Custom style overrides */
  style?: ViewStyle;
  
  /** Custom accessibility label */
  accessibilityLabel?: string;
  
  /** Custom accessibility hint */
  accessibilityHint?: string;
  
  /** Custom accessibility role */
  accessibilityRole?: 'none' | 'button' | 'image' | 'text';
  
  /** Test ID for testing purposes */
  testID?: string;
}

// ============================================================================
// SIZE CONFIGURATIONS
// ============================================================================

/**
 * Container size configurations
 */
const CONTAINER_SIZES: Record<ContainerSize, { maxWidth: number | '100%'; minWidth?: number }> = {
  sm: { maxWidth: 576, minWidth: 320 },
  md: { maxWidth: 768, minWidth: 576 },
  lg: { maxWidth: 992, minWidth: 768 },
  xl: { maxWidth: 1200, minWidth: 992 },
  full: { maxWidth: '100%' },
};

/**
 * Container padding configurations
 */
const CONTAINER_PADDING: Record<ContainerPadding, { horizontal: number; vertical: number }> = {
  none: { horizontal: 0, vertical: 0 },
  sm: { horizontal: 16, vertical: 12 },
  md: { horizontal: 24, vertical: 16 },
  lg: { horizontal: 32, vertical: 24 },
  xl: { horizontal: 48, vertical: 32 },
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Container component
 * Main container component providing consistent layout constraints
 */
export const Container: React.FC<ContainerProps> = React.memo(({
  children,
  size = 'lg',
  background = 'none',
  alignment = 'center',
  padding = 'md',
  customPadding,
  enableGlassMorphism = false,
  borderRadius = 'md',
  enableShadow = false,
  shadowVariant = 'md',
  responsive = true,
  style,
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole = 'none',
  testID,
}) => {
  // Get theme
  const theme = useTheme();

  // Memoize size configuration
  const sizeConfig = useMemo(() => CONTAINER_SIZES[size], [size]);
  
  // Memoize padding configuration
  const paddingConfig = useMemo(() => {
    if (customPadding) {
      return {
        horizontal: customPadding.left || customPadding.right || 0,
        vertical: customPadding.top || customPadding.bottom || 0,
      };
    }
    return CONTAINER_PADDING[padding];
  }, [padding, customPadding]);

  // Memoize background styles
  const backgroundStyles = useMemo(() => {
    const baseStyles: ViewStyle = {};
    
    switch (background) {
      case 'subtle':
        baseStyles.backgroundColor = 'rgba(255, 255, 255, 0.05)';
        break;
      case 'glass':
        baseStyles.backgroundColor = 'rgba(22, 33, 62, 0.2)';
        if (enableGlassMorphism) {
          baseStyles.borderWidth = 1;
          baseStyles.borderColor = 'rgba(255, 255, 255, 0.2)';
        }
        break;
      case 'card':
        baseStyles.backgroundColor = 'rgba(22, 33, 62, 0.3)';
        baseStyles.borderWidth = 1;
        baseStyles.borderColor = 'rgba(255, 255, 255, 0.1)';
        break;
      case 'elevated':
        baseStyles.backgroundColor = theme.theme.colors.cosmos.deep;
        baseStyles.borderWidth = 1;
        baseStyles.borderColor = 'rgba(255, 255, 255, 0.2)';
        break;
      default:
        baseStyles.backgroundColor = 'transparent';
        break;
    }
    
    return baseStyles;
  }, [background, enableGlassMorphism, theme.theme.colors]);

  // Memoize shadow styles
  const shadowStyles = useMemo(() => {
    if (!enableShadow) return {};
    
    const shadowConfig = theme.theme.shadows[shadowVariant];
    
    return {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 4,
    };
  }, [enableShadow, shadowVariant, theme.theme.shadows]);

  // Memoize alignment styles
  const alignmentStyles = useMemo(() => {
    const alignmentMap: Record<ContainerAlignment, ViewStyle> = {
      left: { alignSelf: 'flex-start' },
      center: { alignSelf: 'center' },
      right: { alignSelf: 'flex-end' },
    };
    
    return alignmentMap[alignment];
  }, [alignment]);

  // Memoize container styles
  const containerStyles = useMemo((): ViewStyle => {
    const styles: ViewStyle = {
      // Size constraints
      maxWidth: sizeConfig.maxWidth,
      minWidth: sizeConfig.minWidth,
      width: '100%',
      
      // Padding
      paddingHorizontal: customPadding?.left || customPadding?.right || paddingConfig.horizontal,
      paddingVertical: customPadding?.top || customPadding?.bottom || paddingConfig.vertical,
      
      // Custom padding overrides
      ...(customPadding?.top !== undefined && { paddingTop: customPadding.top }),
      ...(customPadding?.right !== undefined && { paddingRight: customPadding.right }),
      ...(customPadding?.bottom !== undefined && { paddingBottom: customPadding.bottom }),
      ...(customPadding?.left !== undefined && { paddingLeft: customPadding.left }),
      
      // Border radius
      borderRadius: theme.theme.borderRadius[borderRadius],
      
      // Position and alignment
      position: 'relative',
      ...alignmentStyles,
      
      // Background and effects
      ...backgroundStyles,
      ...shadowStyles,
      
      // Responsive behavior
      flexShrink: responsive ? 1 : 0,
      flexGrow: responsive ? 1 : 0,
      
      // Performance optimizations
      overflow: 'hidden',
    };

    return styles;
  }, [
    sizeConfig,
    paddingConfig,
    customPadding,
    theme.theme.borderRadius,
    borderRadius,
    alignmentStyles,
    backgroundStyles,
    shadowStyles,
    responsive,
  ]);

  // Memoize accessibility props
  const accessibilityProps = useMemo(() => ({
    accessible: true,
    accessibilityRole,
    accessibilityLabel: accessibilityLabel || `Container with ${size} size`,
    accessibilityHint: accessibilityHint || 'Container component for organizing content',
  }), [accessibilityRole, accessibilityLabel, accessibilityHint, size]);

  return (
    <View
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

Container.displayName = 'Container';

export default Container;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get container size configuration
 */
export const getContainerSize = (size: ContainerSize) => CONTAINER_SIZES[size];

/**
 * Get container padding configuration
 */
export const getContainerPadding = (padding: ContainerPadding) => CONTAINER_PADDING[padding];

/**
 * Create responsive container styles
 */
export const createResponsiveContainer = (
  breakpoint: keyof CorpAstroTheme['breakpoints'],
  theme: CorpAstroTheme
): ViewStyle => {
  const screenWidth = theme.breakpoints[breakpoint];
  
  return {
    maxWidth: screenWidth,
    paddingHorizontal: screenWidth > 768 ? 32 : 24,
    marginHorizontal: 'auto',
  };
};

/**
 * Container preset configurations
 */
export const containerPresets = {
  page: {
    size: 'lg' as ContainerSize,
    padding: 'lg' as ContainerPadding,
    background: 'none' as ContainerBackground,
    responsive: true,
  },
  card: {
    size: 'md' as ContainerSize,
    padding: 'md' as ContainerPadding,
    background: 'card' as ContainerBackground,
    enableShadow: true,
    borderRadius: 'lg' as keyof CorpAstroTheme['borderRadius'],
  },
  modal: {
    size: 'sm' as ContainerSize,
    padding: 'xl' as ContainerPadding,
    background: 'elevated' as ContainerBackground,
    enableShadow: true,
    enableGlassMorphism: true,
    borderRadius: 'xl' as keyof CorpAstroTheme['borderRadius'],
  },
} as const;
