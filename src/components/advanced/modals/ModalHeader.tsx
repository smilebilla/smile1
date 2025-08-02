/**
 * Corp Astro UI Library - Modal Header Component
 * 
 * A comprehensive modal header component that provides title and action functionality
 * for Corp Astro modal dialogs with cosmic design aesthetics and professional styling.
 * 
 * Features:
 * - Configurable title with Corp Astro typography
 * - Optional subtitle and description support
 * - Action buttons (close, back, custom actions)
 * - Divider line with cosmic styling
 * - Accessibility compliant with proper ARIA attributes
 * - Responsive text sizing and spacing
 * - Theme-aware styling with Corp Astro design system
 * 
 * @module ModalHeader
 * @version 1.0.0
 * @since 2024
 * 
 * UI Documentation Reference:
 * - height: 80px, padding: '0 32px', borderBottom: '1px solid rgba(255,255,255,0.08)'
 * - title: font: 'Futura PT', size: 24px, weight: 600, color: '#FFFFFF'
 * - actions: proper spacing and hover states
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
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
 * Modal header action button interface
 */
export interface ModalHeaderAction {
  /** Unique identifier for the action */
  id: string;
  /** Action label */
  label: string;
  /** Action icon (text or component) */
  icon?: string | React.ComponentType<any>;
  /** Action press handler */
  onPress: () => void;
  /** Whether the action is destructive */
  destructive?: boolean;
  /** Whether the action is disabled */
  disabled?: boolean;
  /** Custom accessibility label */
  accessibilityLabel?: string;
  /** Test ID for testing */
  testID?: string;
}

/**
 * Modal header component props interface
 */
export interface ModalHeaderProps {
  /** Header title */
  title: string;
  /** Optional subtitle */
  subtitle?: string;
  /** Optional description */
  description?: string;
  /** Whether to show close button */
  showCloseButton?: boolean;
  /** Close button press handler */
  onClose?: () => void;
  /** Whether to show back button */
  showBackButton?: boolean;
  /** Back button press handler */
  onBack?: () => void;
  /** Custom action buttons */
  actions?: ModalHeaderAction[];
  /** Whether to show bottom divider */
  showDivider?: boolean;
  /** Custom styles for header container */
  style?: ViewStyle;
  /** Custom styles for title */
  titleStyle?: TextStyle;
  /** Custom styles for subtitle */
  subtitleStyle?: TextStyle;
  /** Custom styles for description */
  descriptionStyle?: TextStyle;
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
// MODAL HEADER COMPONENT
// ============================================================================

/**
 * Modal header component
 * 
 * A comprehensive modal header component with Corp Astro design aesthetics.
 * Provides title, subtitle, actions, and proper spacing according to UI Documentation.
 * 
 * @param props - Modal header component props
 * @returns Modal header component
 */
export const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  subtitle,
  description,
  showCloseButton = true,
  onClose,
  showBackButton = false,
  onBack,
  actions = [],
  showDivider = true,
  style,
  titleStyle,
  subtitleStyle,
  descriptionStyle,
  backgroundColor,
  textColor,
  testID,
  accessibilityLabel,
}) => {
  const { theme } = useTheme();

  // ============================================================================
  // STYLES
  // ============================================================================

  const styles = getStyles(theme, backgroundColor, textColor);

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <View
      style={[styles.container, style]}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="header"
    >
      {/* Main Header Content */}
      <View style={styles.content}>
        {/* Left Side - Back Button */}
        {showBackButton && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBack}
            accessibilityLabel="Go back"
            accessibilityRole="button"
            testID={`${testID}-back-button`}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
        )}

        {/* Center - Title and Subtitle */}
        <View style={[styles.titleContainer, !showBackButton && styles.titleContainerFull]}>
          <Text
            style={[styles.title, titleStyle]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {title}
          </Text>
          {subtitle && (
            <Text
              style={[styles.subtitle, subtitleStyle]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {subtitle}
            </Text>
          )}
        </View>

        {/* Right Side - Actions */}
        <View style={styles.actionsContainer}>
          {/* Custom Actions */}
          {actions.map((action, index) => (
            <TouchableOpacity
              key={action.id}
              style={[
                styles.actionButton,
                action.destructive && styles.destructiveButton,
                action.disabled && styles.disabledButton,
                index > 0 && styles.actionButtonSpacing,
              ]}
              onPress={action.onPress}
              disabled={action.disabled}
              accessibilityLabel={action.accessibilityLabel || action.label}
              accessibilityRole="button"
              testID={action.testID || `${testID}-action-${action.id}`}
            >
              {typeof action.icon === 'string' ? (
                <Text style={[styles.actionIcon, action.destructive && styles.destructiveText]}>
                  {action.icon}
                </Text>
              ) : action.icon ? (
                <action.icon />
              ) : (
                <Text style={[styles.actionLabel, action.destructive && styles.destructiveText]}>
                  {action.label}
                </Text>
              )}
            </TouchableOpacity>
          ))}

          {/* Close Button */}
          {showCloseButton && (
            <TouchableOpacity
              style={[styles.closeButton, actions.length > 0 && styles.actionButtonSpacing]}
              onPress={onClose}
              accessibilityLabel="Close modal"
              accessibilityRole="button"
              testID={`${testID}-close-button`}
            >
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Description */}
      {description && (
        <View style={styles.descriptionContainer}>
          <Text style={[styles.description, descriptionStyle]}>
            {description}
          </Text>
        </View>
      )}

      {/* Divider */}
      {showDivider && <View style={styles.divider} />}
    </View>
  );
};

// ============================================================================
// STYLES
// ============================================================================

const getStyles = (
  theme: CorpAstroTheme,
  backgroundColor?: ColorValue,
  textColor?: ColorValue
): { [key: string]: ViewStyle | TextStyle } => {
  return StyleSheet.create({
    container: {
      backgroundColor: backgroundColor || 'transparent',
      minHeight: 80,
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 32,
      paddingVertical: 20,
      minHeight: 80,
    },
    backButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: 'rgba(255,255,255,0.05)',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    backButtonText: {
      fontSize: 20,
      color: textColor || '#FFFFFF',
      fontWeight: '300',
    },
    titleContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    titleContainerFull: {
      paddingRight: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: '600',
      color: textColor || '#FFFFFF',
      fontFamily: 'Futura PT',
      lineHeight: 28,
    },
    subtitle: {
      fontSize: 16,
      fontWeight: '400',
      color: textColor ? `${String(textColor)}CC` : 'rgba(255,255,255,0.8)',
      fontFamily: 'Inter',
      lineHeight: 20,
      marginTop: 4,
    },
    actionsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    actionButton: {
      height: 44,
      paddingHorizontal: 16,
      borderRadius: 22,
      backgroundColor: 'rgba(255,255,255,0.05)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    actionButtonSpacing: {
      marginLeft: 12,
    },
    destructiveButton: {
      backgroundColor: 'rgba(255,59,48,0.1)',
    },
    disabledButton: {
      opacity: 0.5,
    },
    actionIcon: {
      fontSize: 18,
      color: textColor || '#FFFFFF',
    },
    actionLabel: {
      fontSize: 14,
      fontWeight: '500',
      color: textColor || '#FFFFFF',
      fontFamily: 'Inter',
    },
    destructiveText: {
      color: '#FF3B30',
    },
    closeButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: 'rgba(255,255,255,0.05)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    closeButtonText: {
      fontSize: 24,
      color: textColor || '#FFFFFF',
      fontWeight: '300',
      lineHeight: 24,
    },
    descriptionContainer: {
      paddingHorizontal: 32,
      paddingBottom: 20,
    },
    description: {
      fontSize: 14,
      fontWeight: '400',
      color: textColor ? `${String(textColor)}B3` : 'rgba(255,255,255,0.7)',
      fontFamily: 'Inter',
      lineHeight: 20,
    },
    divider: {
      height: 1,
      backgroundColor: 'rgba(255,255,255,0.08)',
      marginHorizontal: 0,
    },
  });
};

// ============================================================================
// EXPORTS
// ============================================================================

export default ModalHeader;
