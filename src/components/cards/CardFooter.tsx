/**
 * Corp Astro UI Library - Card Footer Component
 * 
 * A footer component for cards with cosmic design aesthetics.
 * Provides action buttons and secondary content for astrology cards.
 * 
 * Features:
 * - Flexible action layout
 * - Primary and secondary actions
 * - Proper spacing and alignment
 * - Accessibility support
 * - Theme-aware styling
 * - Responsive design
 * 
 * Design System Compliance:
 * - Padding: 20px horizontal, 16px vertical
 * - Actions: Right-aligned, proper spacing
 * - Divider: rgba(255,255,255,0.1) color
 * - Buttons: Corp Astro button styles
 * 
 * @module CardFooter
 * @version 1.0.0
 * @since 2024
 */

import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  AccessibilityProps,
} from 'react-native';
import { useTheme } from '../foundations/themes/ThemeProvider';
import { spacing } from '../foundations/tokens/spacing/SpacingScale';

/**
 * Card footer alignment types
 */
export type CardFooterAlignment = 'left' | 'center' | 'right' | 'space-between';

/**
 * Card footer component props
 */
export interface CardFooterProps extends AccessibilityProps {
  /** Footer children */
  children: React.ReactNode;
  /** Whether to show divider */
  showDivider?: boolean;
  /** Footer alignment */
  alignment?: CardFooterAlignment;
  /** Custom container styling */
  style?: ViewStyle;
  /** Custom content styling */
  contentStyle?: ViewStyle;
  /** Test ID for testing */
  testID?: string;
}

/**
 * Card footer component with cosmic design aesthetics
 */
export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  showDivider = false,
  alignment = 'right',
  style,
  contentStyle,
  testID,
  ...accessibilityProps
}) => {
  const { theme } = useTheme();

  // Get alignment styles
  const getAlignmentStyles = (): ViewStyle => {
    switch (alignment) {
      case 'left':
        return { justifyContent: 'flex-start' };
      case 'center':
        return { justifyContent: 'center' };
      case 'right':
        return { justifyContent: 'flex-end' };
      case 'space-between':
        return { justifyContent: 'space-between' };
      default:
        return { justifyContent: 'flex-end' };
    }
  };

  return (
    <View style={[styles.container, style]} testID={testID} {...accessibilityProps}>
      {/* Divider */}
      {showDivider && <View style={styles.divider} />}

      {/* Footer Content */}
      <View style={[styles.content, getAlignmentStyles(), contentStyle]}>
        {children}
      </View>
    </View>
  );
};

/**
 * Card footer component styles
 */
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: spacing.md,
  },
});

export default CardFooter;
