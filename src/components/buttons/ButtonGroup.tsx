/**
 * Corp Astro UI Library - Button Group Component
 * 
 * Container component for grouping multiple buttons with proper spacing and layout.
 * Provides consistent alignment and spacing between buttons in horizontal or vertical layouts.
 * 
 * @module ButtonGroup
 * @version 1.0.0
 * @since 2024
 * 
 * UI Documentation Reference:
 * - Horizontal grouping with 12px spacing (1.5x base)
 * - Vertical grouping with 16px spacing (2x base)
 * - Responsive behavior with proper alignment
 * - Border handling for connected buttons
 * - Consistent touch targets
 * 
 * Features:
 * - Horizontal and vertical layouts
 * - Responsive spacing
 * - Button alignment options
 * - Connected button styling
 * - Accessibility support
 * - Theme integration
 */

import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  AccessibilityProps,
  FlexStyle,
} from 'react-native';
import { useTheme } from '../foundations/themes/ThemeProvider';
import { spacing } from '../foundations/tokens/spacing/SpacingScale';

/**
 * Button group layout direction
 */
export type ButtonGroupDirection = 'horizontal' | 'vertical';

/**
 * Button group alignment options
 */
export type ButtonGroupAlignment = 'start' | 'center' | 'end' | 'stretch';

/**
 * Button group spacing variants
 */
export type ButtonGroupSpacing = 'tight' | 'normal' | 'loose';

/**
 * Button group variant types
 */
export type ButtonGroupVariant = 'default' | 'connected' | 'segmented';

/**
 * Button group configuration
 */
export interface ButtonGroupConfig {
  /** Layout direction */
  direction: ButtonGroupDirection;
  /** Alignment of buttons */
  alignment: ButtonGroupAlignment;
  /** Spacing between buttons */
  spacing: ButtonGroupSpacing;
  /** Group variant */
  variant: ButtonGroupVariant;
  /** Enable responsive behavior */
  responsive: boolean;
  /** Enable equal width buttons */
  equalWidth: boolean;
  /** Enable border radius adjustment */
  adjustBorderRadius: boolean;
}

/**
 * Button group props interface
 */
export interface ButtonGroupProps extends AccessibilityProps {
  /** Child button components */
  children: React.ReactNode;
  /** Layout direction */
  direction?: ButtonGroupDirection;
  /** Alignment of buttons */
  alignment?: ButtonGroupAlignment;
  /** Spacing between buttons */
  spacing?: ButtonGroupSpacing;
  /** Group variant */
  variant?: ButtonGroupVariant;
  /** Enable responsive behavior */
  responsive?: boolean;
  /** Enable equal width buttons */
  equalWidth?: boolean;
  /** Enable border radius adjustment */
  adjustBorderRadius?: boolean;
  /** Custom container style */
  style?: ViewStyle;
  /** Test ID for testing */
  testID?: string;
}

/**
 * Default button group configuration
 */
const DEFAULT_CONFIG: ButtonGroupConfig = {
  direction: 'horizontal',
  alignment: 'start',
  spacing: 'normal',
  variant: 'default',
  responsive: true,
  equalWidth: false,
  adjustBorderRadius: false,
};

/**
 * Button Group Component
 * 
 * Container component for grouping multiple buttons with proper spacing.
 * Follows Corp Astro design system specifications for button layouts.
 * 
 * @param props - Button group props
 * @returns JSX.Element
 */
export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  direction = DEFAULT_CONFIG.direction,
  alignment = DEFAULT_CONFIG.alignment,
  spacing: spacingProp = DEFAULT_CONFIG.spacing,
  variant = DEFAULT_CONFIG.variant,
  responsive = DEFAULT_CONFIG.responsive,
  equalWidth = DEFAULT_CONFIG.equalWidth,
  adjustBorderRadius = DEFAULT_CONFIG.adjustBorderRadius,
  style,
  testID,
  ...accessibilityProps
}) => {
  // Theme
  const theme = useTheme();

  /**
   * Get spacing value based on spacing variant
   */
  const getSpacing = (spacingVariant: ButtonGroupSpacing): number => {
    const spacingMap: Record<ButtonGroupSpacing, number> = {
      tight: spacing.xs, // 8px
      normal: spacing.sm, // 12px
      loose: spacing.md, // 16px
    };
    return spacingMap[spacingVariant];
  };

  /**
   * Get flex direction based on direction
   */
  const getFlexDirection = (): FlexStyle['flexDirection'] => {
    return direction === 'horizontal' ? 'row' : 'column';
  };

  /**
   * Get alignment properties
   */
  const getAlignmentProps = (): Partial<FlexStyle> => {
    const alignmentMap: Record<ButtonGroupAlignment, Partial<FlexStyle>> = {
      start: {
        justifyContent: direction === 'horizontal' ? 'flex-start' : 'flex-start',
        alignItems: direction === 'horizontal' ? 'flex-start' : 'flex-start',
      },
      center: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      end: {
        justifyContent: direction === 'horizontal' ? 'flex-end' : 'flex-end',
        alignItems: direction === 'horizontal' ? 'flex-end' : 'flex-end',
      },
      stretch: {
        justifyContent: direction === 'horizontal' ? 'flex-start' : 'flex-start',
        alignItems: 'stretch',
      },
    };
    return alignmentMap[alignment];
  };

  /**
   * Get container style based on configuration
   */
  const getContainerStyle = (): ViewStyle => {
    const spacingValue = getSpacing(spacingProp);
    const flexDirection = getFlexDirection();
    const alignmentProps = getAlignmentProps();

    const base: ViewStyle = {
      flexDirection,
      gap: spacingValue,
      ...alignmentProps,
    };

    // Variant-specific styles
    const variantStyles: Record<ButtonGroupVariant, Partial<ViewStyle>> = {
      default: {},
      connected: {
        gap: 0, // No gap for connected buttons
      },
      segmented: {
        backgroundColor: 'rgba(22,33,62,0.2)',
        borderRadius: 28,
        padding: 4,
        gap: 4,
      },
    };

    // Responsive behavior
    const responsiveStyles: ViewStyle = responsive ? {
      flexWrap: direction === 'horizontal' ? 'wrap' : 'nowrap',
    } : {};

    // Equal width behavior
    const equalWidthStyles: ViewStyle = equalWidth ? {
      flex: 1,
    } : {};

    return {
      ...base,
      ...variantStyles[variant],
      ...responsiveStyles,
      ...equalWidthStyles,
    };
  };

  /**
   * Process children to add group-specific props
   */
  const processChildren = (): React.ReactNode => {
    const childrenArray = React.Children.toArray(children);
    
    return React.Children.map(childrenArray, (child, index) => {
      if (!React.isValidElement(child)) return child;

      const isFirst = index === 0;
      const isLast = index === childrenArray.length - 1;
      const isMiddle = !isFirst && !isLast;

      // Group-specific props to pass to buttons
      const groupProps: any = {
        'data-button-group': true,
        'data-button-position': isFirst ? 'first' : isLast ? 'last' : 'middle',
        'data-button-direction': direction,
        'data-button-variant': variant,
      };

      // Connected button styling
      if (variant === 'connected' && adjustBorderRadius) {
        const borderRadiusStyles: ViewStyle = {};
        
        if (direction === 'horizontal') {
          if (isFirst) {
            borderRadiusStyles.borderTopRightRadius = 0;
            borderRadiusStyles.borderBottomRightRadius = 0;
          } else if (isLast) {
            borderRadiusStyles.borderTopLeftRadius = 0;
            borderRadiusStyles.borderBottomLeftRadius = 0;
          } else if (isMiddle) {
            borderRadiusStyles.borderRadius = 0;
          }
        } else {
          if (isFirst) {
            borderRadiusStyles.borderBottomLeftRadius = 0;
            borderRadiusStyles.borderBottomRightRadius = 0;
          } else if (isLast) {
            borderRadiusStyles.borderTopLeftRadius = 0;
            borderRadiusStyles.borderTopRightRadius = 0;
          } else if (isMiddle) {
            borderRadiusStyles.borderRadius = 0;
          }
        }

        groupProps.style = [
          borderRadiusStyles,
          (child.props as any).style,
        ];
      }

      // Equal width for buttons
      if (equalWidth) {
        groupProps.style = [
          { flex: 1 },
          groupProps.style || (child.props as any).style,
        ];
      }

      return React.cloneElement(child, groupProps);
    });
  };

  return (
    <View
      accessible={true}
      testID={testID}
      style={[
        styles.container,
        getContainerStyle(),
        style,
      ]}
      {...accessibilityProps}
    >
      {processChildren()}
    </View>
  );
};

/**
 * Component styles
 */
const styles = StyleSheet.create({
  container: {
    // Base container styles
  },
});

/**
 * Default export
 */
export default ButtonGroup;

/**
 * Named exports for convenience
 */
export {
  ButtonGroup as Group,
  ButtonGroup as ButtonContainer,
};

/**
 * Utility functions for button groups
 */
export const ButtonGroupUtils = {
  /**
   * Create responsive button group configuration
   */
  createResponsiveConfig: (
    baseConfig: Partial<ButtonGroupConfig>
  ): ButtonGroupConfig => ({
    ...DEFAULT_CONFIG,
    ...baseConfig,
    responsive: true,
  }),

  /**
   * Create connected button group configuration
   */
  createConnectedConfig: (
    direction: ButtonGroupDirection = 'horizontal'
  ): ButtonGroupConfig => ({
    ...DEFAULT_CONFIG,
    direction,
    variant: 'connected',
    adjustBorderRadius: true,
    spacing: 'tight',
  }),

  /**
   * Create segmented button group configuration
   */
  createSegmentedConfig: (
    direction: ButtonGroupDirection = 'horizontal'
  ): ButtonGroupConfig => ({
    ...DEFAULT_CONFIG,
    direction,
    variant: 'segmented',
    equalWidth: true,
    alignment: 'stretch',
  }),
};
