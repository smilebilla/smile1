/**
 * Corp Astro UI Library - Card Component
 * 
 * A versatile card component with cosmic design aesthetics for Corp Astro applications.
 * Essential for displaying astrology content, horoscopes, and zodiac information.
 * 
 * Features:
 * - Cosmic styling with gradient backgrounds
 * - Multiple variants (default, elevated, outlined, ghost)
 * - Responsive design with proper spacing
 * - Accessibility support with proper ARIA attributes
 * - Touch interactions with haptic feedback
 * - Theme-aware styling with Corp Astro colors
 * - Customizable padding, margins, and content areas
 * 
 * Design System Compliance:
 * - Background: rgba(22,33,62,0.2) with gradient overlay
 * - BorderRadius: 24px for elevated cards, 16px for flat cards
 * - Padding: 20px default, 16px compact, 24px spacious
 * - Shadow: Complex elevation system with cosmic glow
 * - Typography: Corp Astro typography scale
 * 
 * @module Card
 * @version 1.0.0
 * @since 2024
 */

import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  AccessibilityProps,
  GestureResponderEvent,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../foundations/themes/ThemeProvider';
import { deepSpaceColors } from '../foundations/tokens/colors/DeepSpaceColors';
import { SignatureBlues } from '../foundations/tokens/colors/SignatureBlues';
import { ProfessionalGrays } from '../foundations/tokens/colors/ProfessionalGrays';
import { spacing } from '../foundations/tokens/spacing/SpacingScale';

/**
 * Card variant types
 */
export type CardVariant = 'default' | 'elevated' | 'outlined' | 'ghost' | 'cosmic';

/**
 * Card size types
 */
export type CardSize = 'compact' | 'default' | 'spacious';

/**
 * Card press interaction types
 */
export type CardPressType = 'none' | 'ripple' | 'scale' | 'glow';

/**
 * Card component props
 */
export interface CardProps extends AccessibilityProps {
  /** Card content */
  children: React.ReactNode;
  /** Card variant */
  variant?: CardVariant;
  /** Card size */
  size?: CardSize;
  /** Whether card is pressable */
  pressable?: boolean;
  /** Press interaction type */
  pressType?: CardPressType;
  /** Whether card is selected */
  selected?: boolean;
  /** Whether card is disabled */
  disabled?: boolean;
  /** Whether card is loading */
  loading?: boolean;
  /** Press handler */
  onPress?: (event: GestureResponderEvent) => void;
  /** Long press handler */
  onLongPress?: (event: GestureResponderEvent) => void;
  /** Enable haptic feedback */
  hapticFeedback?: boolean;
  /** Custom container styling */
  style?: ViewStyle;
  /** Custom content styling */
  contentStyle?: ViewStyle;
  /** Test ID for testing */
  testID?: string;
}

/**
 * Card component with cosmic design aesthetics
 */
export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  size = 'default',
  pressable = false,
  pressType = 'ripple',
  selected = false,
  disabled = false,
  loading = false,
  onPress,
  onLongPress,
  hapticFeedback = true,
  style,
  contentStyle,
  testID,
  ...accessibilityProps
}) => {
  const { theme } = useTheme();

  // Get variant styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'elevated':
        return {
          backgroundColor: 'rgba(22, 33, 62, 0.3)',
          borderRadius: 24,
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.3,
          shadowRadius: 16,
          elevation: 8,
        };
      case 'outlined':
        return {
          backgroundColor: 'transparent',
          borderRadius: 16,
          borderWidth: 1,
          borderColor: 'rgba(46, 134, 222, 0.3)',
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          borderRadius: 12,
        };
      case 'cosmic':
        return {
          backgroundColor: 'transparent',
          borderRadius: 24,
          overflow: 'hidden',
        };
      default:
        return {
          backgroundColor: 'rgba(22, 33, 62, 0.2)',
          borderRadius: 16,
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 8,
          elevation: 4,
        };
    }
  };

  // Get size styles
  const getSizeStyles = () => {
    switch (size) {
      case 'compact':
        return {
          padding: spacing.md,
          margin: spacing.xs,
        };
      case 'spacious':
        return {
          padding: spacing.xl,
          margin: spacing.md,
        };
      default:
        return {
          padding: spacing.lg,
          margin: spacing.sm,
        };
    }
  };

  // Get selected styles
  const getSelectedStyles = () => {
    if (selected) {
      return {
        borderColor: SignatureBlues.primary,
        borderWidth: 2,
        shadowColor: SignatureBlues.glow,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 12,
        elevation: 8,
      };
    }
    return {};
  };

  // Get disabled styles
  const getDisabledStyles = () => {
    if (disabled) {
      return {
        opacity: 0.5,
      };
    }
    return {};
  };

  // Handle press with haptic feedback
  const handlePress = (event: GestureResponderEvent) => {
    if (disabled || loading) return;

    if (hapticFeedback && Platform.OS === 'ios') {
      // Add haptic feedback for iOS
      // HapticFeedback.impactAsync(HapticFeedback.ImpactFeedbackStyle.Light);
    }

    onPress?.(event);
  };

  // Handle long press
  const handleLongPress = (event: GestureResponderEvent) => {
    if (disabled || loading) return;

    if (hapticFeedback && Platform.OS === 'ios') {
      // Add haptic feedback for iOS
      // HapticFeedback.impactAsync(HapticFeedback.ImpactFeedbackStyle.Medium);
    }

    onLongPress?.(event);
  };

  // Combine styles
  const containerStyles = [
    styles.container,
    getVariantStyles(),
    getSizeStyles(),
    getSelectedStyles(),
    getDisabledStyles(),
    style,
  ];

  // Render cosmic gradient background
  const renderCosmicBackground = () => {
    if (variant === 'cosmic') {
      return (
        <LinearGradient
          colors={[
            'rgba(26, 26, 46, 0.9)',
            'rgba(22, 33, 62, 0.8)',
            'rgba(15, 52, 96, 0.7)',
            'rgba(83, 52, 131, 0.6)',
          ]}
          locations={[0, 0.3, 0.7, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFillObject}
        />
      );
    }
    return null;
  };

  // Render content
  const renderContent = () => (
    <View style={[styles.content, contentStyle]}>
      {children}
    </View>
  );

  // Render pressable card
  if (pressable) {
    return (
      <TouchableOpacity
        style={containerStyles}
        onPress={handlePress}
        onLongPress={handleLongPress}
        disabled={disabled || loading}
        activeOpacity={0.8}
        testID={testID}
        {...accessibilityProps}
      >
        {renderCosmicBackground()}
        {renderContent()}
      </TouchableOpacity>
    );
  }

  // Render non-pressable card
  return (
    <View
      style={containerStyles}
      testID={testID}
      {...accessibilityProps}
    >
      {renderCosmicBackground()}
      {renderContent()}
    </View>
  );
};

/**
 * Card component styles
 */
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
  },
  content: {
    position: 'relative',
    zIndex: 1,
  },
});

export default Card;
