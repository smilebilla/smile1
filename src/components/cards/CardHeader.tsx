/**
 * Corp Astro UI Library - Card Header Component
 * 
 * A header component for cards with cosmic design aesthetics.
 * Provides title, subtitle, and optional actions for astrology cards.
 * 
 * Features:
 * - Cosmic typography with proper hierarchy
 * - Optional subtitle and action buttons
 * - Responsive design with proper spacing
 * - Accessibility support with proper ARIA attributes
 * - Theme-aware styling with Corp Astro colors
 * - Customizable icons and actions
 * 
 * Design System Compliance:
 * - Title: Futura PT font, 20px, weight 600
 * - Subtitle: Inter font, 14px, weight 400, muted color
 * - Padding: 20px horizontal, 16px vertical
 * - Actions: Right-aligned, proper spacing
 * 
 * @module CardHeader
 * @version 1.0.0
 * @since 2024
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  AccessibilityProps,
} from 'react-native';
import { useTheme } from '../foundations/themes/ThemeProvider';
import { SignatureBlues } from '../foundations/tokens/colors/SignatureBlues';
import { ProfessionalGrays } from '../foundations/tokens/colors/ProfessionalGrays';
import { spacing } from '../foundations/tokens/spacing/SpacingScale';

/**
 * Card header component props
 */
export interface CardHeaderProps extends AccessibilityProps {
  /** Header title */
  title: string;
  /** Header subtitle */
  subtitle?: string;
  /** Left icon component */
  leftIcon?: React.ReactNode;
  /** Right action component */
  rightAction?: React.ReactNode;
  /** Whether to show divider */
  showDivider?: boolean;
  /** Custom container styling */
  style?: ViewStyle;
  /** Custom title styling */
  titleStyle?: TextStyle;
  /** Custom subtitle styling */
  subtitleStyle?: TextStyle;
  /** Test ID for testing */
  testID?: string;
}

/**
 * Card header component with cosmic design aesthetics
 */
export const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  subtitle,
  leftIcon,
  rightAction,
  showDivider = false,
  style,
  titleStyle,
  subtitleStyle,
  testID,
  ...accessibilityProps
}) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, style]} testID={testID} {...accessibilityProps}>
      <View style={styles.content}>
        {/* Left Icon */}
        {leftIcon && (
          <View style={styles.leftIcon}>
            {leftIcon}
          </View>
        )}

        {/* Title and Subtitle */}
        <View style={styles.textContainer}>
          <Text style={[styles.title, titleStyle]} numberOfLines={1}>
            {title}
          </Text>
          {subtitle && (
            <Text style={[styles.subtitle, subtitleStyle]} numberOfLines={2}>
              {subtitle}
            </Text>
          )}
        </View>

        {/* Right Action */}
        {rightAction && (
          <View style={styles.rightAction}>
            {rightAction}
          </View>
        )}
      </View>

      {/* Divider */}
      {showDivider && <View style={styles.divider} />}
    </View>
  );
};

/**
 * Card header component styles
 */
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftIcon: {
    marginRight: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    marginRight: spacing.sm,
  },
  title: {
    fontFamily: 'Futura PT',
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    lineHeight: 24,
  },
  subtitle: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    color: ProfessionalGrays.medium,
    lineHeight: 18,
    marginTop: 2,
  },
  rightAction: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginTop: spacing.md,
  },
});

export default CardHeader;
