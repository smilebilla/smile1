/**
 * Corp Astro UI Library - Card Content Component
 * 
 * A content component for cards with cosmic design aesthetics.
 * Provides flexible content area for astrology cards.
 * 
 * Features:
 * - Flexible content layout
 * - Proper spacing and padding
 * - Scrollable content support
 * - Accessibility support
 * - Theme-aware styling
 * - Responsive design
 * 
 * Design System Compliance:
 * - Padding: 20px horizontal, 16px vertical
 * - Typography: Inter font for body content
 * - Spacing: 4px base unit system
 * - Colors: Corp Astro color palette
 * 
 * @module CardContent
 * @version 1.0.0
 * @since 2024
 */

import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  ViewStyle,
  AccessibilityProps,
} from 'react-native';
import { useTheme } from '../foundations/themes/ThemeProvider';
import { spacing } from '../foundations/tokens/spacing/SpacingScale';

/**
 * Card content component props
 */
export interface CardContentProps extends AccessibilityProps {
  /** Content children */
  children: React.ReactNode;
  /** Whether content is scrollable */
  scrollable?: boolean;
  /** Whether to show scroll indicators */
  showScrollIndicator?: boolean;
  /** Custom container styling */
  style?: ViewStyle;
  /** Custom content styling */
  contentStyle?: ViewStyle;
  /** Test ID for testing */
  testID?: string;
}

/**
 * Card content component with cosmic design aesthetics
 */
export const CardContent: React.FC<CardContentProps> = ({
  children,
  scrollable = false,
  showScrollIndicator = false,
  style,
  contentStyle,
  testID,
  ...accessibilityProps
}) => {
  const { theme } = useTheme();

  // Render scrollable content
  if (scrollable) {
    return (
      <ScrollView
        style={[styles.scrollContainer, style]}
        contentContainerStyle={[styles.scrollContent, contentStyle]}
        showsVerticalScrollIndicator={showScrollIndicator}
        showsHorizontalScrollIndicator={false}
        testID={testID}
        {...accessibilityProps}
      >
        {children}
      </ScrollView>
    );
  }

  // Render regular content
  return (
    <View
      style={[styles.container, style]}
      testID={testID}
      {...accessibilityProps}
    >
      <View style={[styles.content, contentStyle]}>
        {children}
      </View>
    </View>
  );
};

/**
 * Card content component styles
 */
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  content: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  scrollContent: {
    paddingVertical: spacing.md,
    flexGrow: 1,
  },
});

export default CardContent;
