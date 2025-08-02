/**
 * Corp Astro UI Library - Modal Footer Component
 * 
 * A comprehensive modal footer component that provides action buttons and additional content
 * for Corp Astro modal dialogs with cosmic design aesthetics and professional styling.
 * 
 * Features:
 * - Configurable action buttons with proper spacing
 * - Primary and secondary action support
 * - Destructive action styling
 * - Loading state support for actions
 * - Top divider with cosmic styling
 * - Accessibility compliant with proper ARIA attributes
 * - Theme-aware styling with Corp Astro design system
 * 
 * @module ModalFooter
 * @version 1.0.0
 * @since 2024
 * 
 * UI Documentation Reference:
 * - padding: 24px, borderTop: '1px solid rgba(255,255,255,0.08)'
 * - display: 'flex', gap: 12px, justifyContent: 'flex-end'
 * - button styling with proper spacing and hover states
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ColorValue,
} from 'react-native';
import { useTheme } from '../../foundations/themes/useTheme';
import { CorpAstroTheme } from '../../foundations/themes/DarkTheme';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Modal footer action button interface
 */
export interface ModalFooterAction {
  /** Unique identifier for the action */
  id: string;
  /** Action label */
  label: string;
  /** Action press handler */
  onPress: () => void;
  /** Action variant */
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
  /** Whether the action is loading */
  loading?: boolean;
  /** Whether the action is disabled */
  disabled?: boolean;
  /** Custom styles for action button */
  style?: ViewStyle;
  /** Custom styles for action text */
  textStyle?: TextStyle;
  /** Custom accessibility label */
  accessibilityLabel?: string;
  /** Test ID for testing */
  testID?: string;
}

/**
 * Modal footer component props interface
 */
export interface ModalFooterProps {
  /** Footer actions */
  actions?: ModalFooterAction[];
  /** Additional footer content */
  children?: React.ReactNode;
  /** Whether to show top divider */
  showDivider?: boolean;
  /** Action alignment */
  alignment?: 'left' | 'center' | 'right' | 'space-between';
  /** Whether actions are stacked vertically */
  stackActions?: boolean;
  /** Custom styles for footer container */
  style?: ViewStyle;
  /** Custom styles for actions container */
  actionsStyle?: ViewStyle;
  /** Custom background color */
  backgroundColor?: ColorValue;
  /** Custom text color */
  textColor?: ColorValue;
  /** Test ID for testing */
  testID?: string;
  /** Accessibility label */
  accessibilityLabel?: string;
}

// ============================================================================
// MODAL FOOTER COMPONENT
// ============================================================================

/**
 * Modal footer component
 * 
 * A comprehensive modal footer component with action buttons and proper spacing.
 * Provides primary, secondary, and destructive action variants according to UI Documentation.
 * 
 * @param props - Modal footer component props
 * @returns Modal footer component
 */
export const ModalFooter: React.FC<ModalFooterProps> = ({
  actions = [],
  children,
  showDivider = true,
  alignment = 'right',
  stackActions = false,
  style,
  actionsStyle,
  backgroundColor,
  textColor,
  testID,
  accessibilityLabel,
}) => {
  const { theme } = useTheme();

  // ============================================================================
  // STYLES
  // ============================================================================

  const styles = getStyles(theme, backgroundColor, textColor, alignment, stackActions);

  // ============================================================================
  // RENDER ACTION BUTTON
  // ============================================================================

  const renderActionButton = (action: ModalFooterAction, index: number) => {
    const buttonStyles = [
      styles.actionButton,
      styles[`${action.variant || 'secondary'}Button`],
      action.disabled && styles.disabledButton,
      action.loading && styles.loadingButton,
      index > 0 && (stackActions ? styles.stackedButtonSpacing : styles.actionButtonSpacing),
      action.style,
    ];

    const textStyles = [
      styles.actionText,
      styles[`${action.variant || 'secondary'}Text`],
      action.disabled && styles.disabledText,
      action.textStyle,
    ];

    return (
      <TouchableOpacity
        key={action.id}
        style={buttonStyles}
        onPress={action.onPress}
        disabled={action.disabled || action.loading}
        accessibilityLabel={action.accessibilityLabel || action.label}
        accessibilityRole="button"
        testID={action.testID || `${testID}-action-${action.id}`}
      >
        {action.loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator
              size="small"
              color={action.variant === 'primary' ? '#FFFFFF' : '#54A0FF'}
            />
            <Text style={[textStyles, styles.loadingText]}>
              {action.label}
            </Text>
          </View>
        ) : (
          <Text style={textStyles}>
            {action.label}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <View
      style={[styles.container, style]}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
    >
      {/* Top Divider */}
      {showDivider && <View style={styles.divider} />}

      {/* Footer Content */}
      <View style={styles.content}>
        {/* Custom Children */}
        {children}

        {/* Actions */}
        {actions.length > 0 && (
          <View style={[styles.actionsContainer, actionsStyle]}>
            {actions.map((action, index) => renderActionButton(action, index))}
          </View>
        )}
      </View>
    </View>
  );
};

// ============================================================================
// STYLES
// ============================================================================

const getStyles = (
  theme: CorpAstroTheme,
  backgroundColor?: ColorValue,
  textColor?: ColorValue,
  alignment: string = 'right',
  stackActions: boolean = false
): { [key: string]: ViewStyle | TextStyle } => {
  const getJustifyContent = () => {
    switch (alignment) {
      case 'left': return 'flex-start';
      case 'center': return 'center';
      case 'right': return 'flex-end';
      case 'space-between': return 'space-between';
      default: return 'flex-end';
    }
  };

  return StyleSheet.create({
    container: {
      backgroundColor: backgroundColor || 'transparent',
    },
    divider: {
      height: 1,
      backgroundColor: 'rgba(255,255,255,0.08)',
    },
    content: {
      padding: 24,
      flexDirection: stackActions ? 'column' : 'row',
      alignItems: stackActions ? 'stretch' : 'center',
      justifyContent: getJustifyContent(),
    },
    actionsContainer: {
      flexDirection: stackActions ? 'column' : 'row',
      alignItems: stackActions ? 'stretch' : 'center',
      justifyContent: getJustifyContent(),
      gap: 12,
    },
    actionButton: {
      height: 44,
      paddingHorizontal: 24,
      borderRadius: 22,
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: 100,
    },
    actionButtonSpacing: {
      marginLeft: 12,
    },
    stackedButtonSpacing: {
      marginTop: 12,
    },
    // Button Variants
    primaryButton: {
      backgroundColor: '#2E86DE',
      shadowColor: '#2E86DE',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 4,
    },
    secondaryButton: {
      backgroundColor: 'rgba(46,134,222,0.1)',
      borderWidth: 1,
      borderColor: 'rgba(46,134,222,0.3)',
    },
    ghostButton: {
      backgroundColor: 'transparent',
    },
    destructiveButton: {
      backgroundColor: 'rgba(255,59,48,0.1)',
      borderWidth: 1,
      borderColor: 'rgba(255,59,48,0.3)',
    },
    disabledButton: {
      opacity: 0.5,
    },
    loadingButton: {
      opacity: 0.8,
    },
    // Text Variants
    actionText: {
      fontSize: 16,
      fontWeight: '600',
      fontFamily: 'Futura PT',
      textAlign: 'center',
    },
    primaryText: {
      color: '#FFFFFF',
    },
    secondaryText: {
      color: '#54A0FF',
    },
    ghostText: {
      color: textColor || '#FFFFFF',
    },
    destructiveText: {
      color: '#FF3B30',
    },
    disabledText: {
      opacity: 0.5,
    },
    loadingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    loadingText: {
      marginLeft: 8,
    },
  });
};

// ============================================================================
// EXPORTS
// ============================================================================

export default ModalFooter;
