/**
 * Corp Astro UI Library - Chip Component
 * 
 * Interactive chip component for tags, filters, and selections.
 * Supports various states, animations, and cosmic styling effects.
 * 
 * @module Chip
 * @version 1.0.0
 * @since 2024
 * 
 * UI Documentation Reference:
 * - Rounded pill-shaped interactive elements
 * - Support for text, icons, and close buttons
 * - Multiple states (default, selected, disabled)
 * - Filter and choice chip variants
 * - Cosmic styling with gradients and glow effects
 * - Smooth animations and transitions
 * 
 * Features:
 * - Multiple variants (filter, choice, action, input)
 * - Size variations (small, medium, large)
 * - Interactive states (selected, disabled, loading)
 * - Icon and close button support
 * - Animation and hover effects
 * - Accessibility compliance
 * - Theme integration
 */

import React, { useState, useRef, useCallback } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Animated,
  AccessibilityProps,
  GestureResponderEvent,
} from 'react-native';
import { useTheme } from '../../foundations/themes/useTheme';
import { deepSpaceColors } from '../../foundations/tokens/colors/DeepSpaceColors';
import { SignatureBlues } from '../../foundations/tokens/colors/SignatureBlues';
import { RoyalPurples } from '../../foundations/tokens/colors/RoyalPurples';
import { ProfessionalGrays } from '../../foundations/tokens/colors/ProfessionalGrays';
import { spacing } from '../../foundations/tokens/spacing/SpacingScale';

/**
 * Chip variant types
 */
export type ChipVariant = 'filter' | 'choice' | 'action' | 'input';

/**
 * Chip size types
 */
export type ChipSize = 'small' | 'medium' | 'large';

/**
 * Chip color types
 */
export type ChipColor = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';

/**
 * Chip state types
 */
export type ChipState = 'default' | 'selected' | 'disabled' | 'loading';

/**
 * Chip icon configuration
 */
export interface ChipIcon {
  /** Icon name or component */
  name: string;
  /** Icon size */
  size?: number;
  /** Icon color */
  color?: string;
  /** Icon position */
  position?: 'left' | 'right';
}

/**
 * Chip component props
 */
export interface ChipProps extends AccessibilityProps {
  /** Chip content */
  children: React.ReactNode;
  /** Chip variant */
  variant?: ChipVariant;
  /** Chip size */
  size?: ChipSize;
  /** Chip color */
  color?: ChipColor;
  /** Chip state */
  state?: ChipState;
  /** Whether chip is selected */
  selected?: boolean;
  /** Whether chip is disabled */
  disabled?: boolean;
  /** Whether chip is loading */
  loading?: boolean;
  /** Whether chip is closable */
  closable?: boolean;
  /** Left icon configuration */
  leftIcon?: ChipIcon;
  /** Right icon configuration */
  rightIcon?: ChipIcon;
  /** Chip press handler */
  onPress?: (event: GestureResponderEvent) => void;
  /** Chip close handler */
  onClose?: (event: GestureResponderEvent) => void;
  /** Chip selection handler */
  onSelect?: (selected: boolean) => void;
  /** Enable haptic feedback */
  hapticFeedback?: boolean;
  /** Enable glow effect */
  showGlow?: boolean;
  /** Custom background color */
  backgroundColor?: string;
  /** Custom text color */
  textColor?: string;
  /** Custom border color */
  borderColor?: string;
  /** Custom styling */
  style?: ViewStyle;
  /** Custom text styling */
  textStyle?: TextStyle;
  /** Custom icon styling */
  iconStyle?: ViewStyle;
  /** Test ID for testing */
  testID?: string;
}

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Chip color mappings
 */
const chipColors = {
  default: deepSpaceColors.dark,
  primary: SignatureBlues.primary,
  secondary: deepSpaceColors.medium,
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
};

/**
 * Chip text colors
 */
const chipTextColors = {
  default: ProfessionalGrays.text,
  primary: '#FFFFFF',
  secondary: ProfessionalGrays.text,
  success: '#FFFFFF',
  warning: '#FFFFFF',
  error: '#FFFFFF',
};

/**
 * Chip border colors
 */
const chipBorderColors = {
  default: 'rgba(255,255,255,0.1)',
  primary: 'rgba(46,134,222,0.3)',
  secondary: 'rgba(255,255,255,0.08)',
  success: 'rgba(16,185,129,0.3)',
  warning: 'rgba(245,158,11,0.3)',
  error: 'rgba(239,68,68,0.3)',
};

// ============================================================================
// COMPONENT IMPLEMENTATION
// ============================================================================

/**
 * Chip component
 * 
 * An interactive chip component with cosmic design aesthetics.
 * Supports multiple variants, states, and interaction patterns.
 * 
 * @param props - Chip component props
 * @returns Chip component
 */
export const Chip: React.FC<ChipProps> = ({
  children,
  variant = 'filter',
  size = 'medium',
  color = 'default',
  state = 'default',
  selected = false,
  disabled = false,
  loading = false,
  closable = false,
  leftIcon,
  rightIcon,
  onPress,
  onClose,
  onSelect,
  hapticFeedback = true,
  showGlow = false,
  backgroundColor,
  textColor,
  borderColor,
  style,
  textStyle,
  iconStyle,
  testID,
  ...accessibilityProps
}) => {
  const { theme } = useTheme();
  const [isPressed, setIsPressed] = useState(false);
  const [internalSelected, setInternalSelected] = useState(selected);
  const scaleValue = useRef(new Animated.Value(1)).current;
  const glowValue = useRef(new Animated.Value(0)).current;

  // Determine final state
  const finalState = disabled ? 'disabled' : loading ? 'loading' : (selected || internalSelected) ? 'selected' : state;

  // ============================================================================
  // ANIMATION LOGIC
  // ============================================================================

  const animatePress = useCallback((pressed: boolean) => {
    Animated.spring(scaleValue, {
      toValue: pressed ? 0.95 : 1,
      useNativeDriver: true,
    }).start();
  }, [scaleValue]);

  const animateGlow = useCallback(() => {
    if (!showGlow) return;

    Animated.sequence([
      Animated.timing(glowValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(glowValue, {
        toValue: 0,
        duration: 800,
        useNativeDriver: false,
      }),
    ]).start();
  }, [showGlow, glowValue]);

  // ============================================================================
  // HANDLERS
  // ============================================================================

  const handlePressIn = useCallback(() => {
    if (disabled || loading) return;
    setIsPressed(true);
    animatePress(true);
  }, [disabled, loading, animatePress]);

  const handlePressOut = useCallback(() => {
    if (disabled || loading) return;
    setIsPressed(false);
    animatePress(false);
  }, [disabled, loading, animatePress]);

  const handlePress = useCallback((event: GestureResponderEvent) => {
    if (disabled || loading) return;

    // Handle selection for filter and choice chips
    if (variant === 'filter' || variant === 'choice') {
      const newSelected = !internalSelected;
      setInternalSelected(newSelected);
      onSelect?.(newSelected);
    }

    // Trigger glow animation
    animateGlow();

    // Call external press handler
    onPress?.(event);
  }, [disabled, loading, variant, internalSelected, onSelect, animateGlow, onPress]);

  const handleClose = useCallback((event: GestureResponderEvent) => {
    if (disabled || loading) return;
    
    event.stopPropagation();
    onClose?.(event);
  }, [disabled, loading, onClose]);

  // ============================================================================
  // STYLES
  // ============================================================================

  const sizeConfig = getSizeConfig(size);
  const colorConfig = getColorConfig(color, finalState);
  const containerStyles = getContainerStyles(sizeConfig, colorConfig, finalState);
  const textStyles = getTextStyles(sizeConfig, colorConfig, textColor);
  const glowStyles = getGlowStyles(showGlow, glowValue, color);

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <TouchableOpacity
      style={[
        styles.container,
        containerStyles,
        glowStyles,
        {
          transform: [{ scale: scaleValue }],
        },
        style,
      ]}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      testID={testID}
      accessibilityRole="button"
      accessibilityState={{
        disabled: disabled || loading,
        selected: finalState === 'selected',
      }}
      {...accessibilityProps}
    >
      {/* Left Icon */}
      {leftIcon && (
        <View style={[styles.icon, styles.leftIcon, iconStyle]}>
          {/* Icon implementation would go here */}
          <Text style={[styles.iconText, { color: colorConfig.textColor }]}>
            {leftIcon.name}
          </Text>
        </View>
      )}

      {/* Content */}
      <Text style={[textStyles, textStyle]}>
        {children}
      </Text>

      {/* Right Icon */}
      {rightIcon && (
        <View style={[styles.icon, styles.rightIcon, iconStyle]}>
          {/* Icon implementation would go here */}
          <Text style={[styles.iconText, { color: colorConfig.textColor }]}>
            {rightIcon.name}
          </Text>
        </View>
      )}

      {/* Close Button */}
      {closable && (
        <TouchableOpacity
          style={styles.closeButton}
          onPress={handleClose}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={[styles.closeText, { color: colorConfig.textColor }]}>
            ×
          </Text>
        </TouchableOpacity>
      )}

      {/* Loading Indicator */}
      {loading && (
        <View style={styles.loadingIndicator}>
          <Text style={[styles.loadingText, { color: colorConfig.textColor }]}>
            ...
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get size configuration
 */
const getSizeConfig = (size: ChipSize) => {
  switch (size) {
    case 'small':
      return {
        height: 28,
        paddingHorizontal: spacing.sm,
        fontSize: 12,
        iconSize: 14,
        borderRadius: 14,
      };
    case 'large':
      return {
        height: 40,
        paddingHorizontal: spacing.lg,
        fontSize: 16,
        iconSize: 20,
        borderRadius: 20,
      };
    case 'medium':
    default:
      return {
        height: 32,
        paddingHorizontal: spacing.md,
        fontSize: 14,
        iconSize: 16,
        borderRadius: 16,
      };
  }
};

/**
 * Get color configuration
 */
const getColorConfig = (color: ChipColor, state: ChipState) => {
  const baseColor = chipColors[color];
  const textColor = chipTextColors[color];
  const borderColor = chipBorderColors[color];

  switch (state) {
    case 'selected':
      return {
        backgroundColor: baseColor,
        textColor: '#FFFFFF',
        borderColor: baseColor,
        opacity: 1,
      };
    case 'disabled':
      return {
        backgroundColor: 'rgba(255,255,255,0.05)',
        textColor: 'rgba(255,255,255,0.3)',
        borderColor: 'rgba(255,255,255,0.08)',
        opacity: 0.5,
      };
    case 'loading':
      return {
        backgroundColor: 'rgba(255,255,255,0.08)',
        textColor: 'rgba(255,255,255,0.6)',
        borderColor: 'rgba(255,255,255,0.1)',
        opacity: 0.8,
      };
    default:
      return {
        backgroundColor: 'rgba(255,255,255,0.05)',
        textColor: textColor,
        borderColor: borderColor,
        opacity: 1,
      };
  }
};

/**
 * Get container styles
 */
const getContainerStyles = (sizeConfig: any, colorConfig: any, state: ChipState): ViewStyle => {
  return {
    height: sizeConfig.height,
    paddingHorizontal: sizeConfig.paddingHorizontal,
    borderRadius: sizeConfig.borderRadius,
    backgroundColor: colorConfig.backgroundColor,
    borderWidth: 1,
    borderColor: colorConfig.borderColor,
    opacity: colorConfig.opacity,
  };
};

/**
 * Get text styles
 */
const getTextStyles = (sizeConfig: any, colorConfig: any, customTextColor?: string): TextStyle => {
  return {
    fontSize: sizeConfig.fontSize,
    fontWeight: '500',
    color: customTextColor || colorConfig.textColor,
  };
};

/**
 * Get glow styles
 */
const getGlowStyles = (showGlow: boolean, glowValue: Animated.Value, color: ChipColor): ViewStyle => {
  if (!showGlow) return {};

  const glowOpacity = glowValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.6],
  });

  return {
    shadowColor: chipColors[color],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: glowOpacity,
    shadowRadius: 8,
    elevation: 4,
  };
};

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 44,
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftIcon: {
    marginRight: spacing.xs,
  },
  rightIcon: {
    marginLeft: spacing.xs,
  },
  iconText: {
    fontSize: 16,
    fontWeight: '500',
  },
  closeButton: {
    marginLeft: spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
    width: 20,
    height: 20,
  },
  closeText: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
  },
  loadingIndicator: {
    marginLeft: spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 12,
    fontWeight: '500',
  },
});

// ============================================================================
// EXPORTS
// ============================================================================

export default Chip;
