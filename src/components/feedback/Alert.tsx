/**
 * Corp Astro UI Library - Alert Component
 * Module 126: Alert.tsx
 * 
 * A comprehensive alert component with cosmic design aesthetics
 * that provides feedback notifications following Corp Astro design system.
 * 
 * Features:
 * - Cosmic alert styling with gradient backgrounds
 * - Multiple alert variants (info, success, warning, error)
 * - Icon support with Corp Astro color scheme
 * - Dismissible alerts with smooth animations
 * - Backdrop blur effects
 * - Accessibility support with proper ARIA attributes
 * - Theme-aware styling with Corp Astro colors
 * - Responsive design and proper spacing
 * 
 * Design System Compliance:
 * - BorderRadius: 16px with cosmic styling
 * - Padding: 20px with proper spacing
 * - Backdrop filter: blur(20px) for glass morphism
 * - Border: 1px solid with variant-specific colors
 * - Typography: Inter font with proper hierarchy
 * - Icons: 24px with Corp Astro color scheme
 * - Variants: info, success, warning, error with specific colors
 * 
 * @module Alert
 * @version 1.0.0
 * @since 2024
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ViewStyle,
  TextStyle,
  AccessibilityProps,
  ColorValue,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../foundations/themes/ThemeProvider';
import { SignatureBlues } from '../foundations/tokens/colors/SignatureBlues';
import { deepSpaceColors } from '../foundations/tokens/colors/DeepSpaceColors';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps extends AccessibilityProps {
  /** Alert variant type */
  variant?: AlertVariant;
  /** Alert title */
  title?: string;
  /** Alert description */
  description?: string;
  /** Whether alert is dismissible */
  dismissible?: boolean;
  /** Whether alert is visible */
  visible?: boolean;
  /** Callback when alert is dismissed */
  onDismiss?: () => void;
  /** Custom icon component */
  icon?: React.ReactNode;
  /** Custom style overrides */
  style?: ViewStyle;
  /** Title text style */
  titleStyle?: TextStyle;
  /** Description text style */
  descriptionStyle?: TextStyle;
  /** Test ID for testing */
  testID?: string;
  /** Auto dismiss timeout in milliseconds */
  autoDissmissTimeout?: number;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const VARIANT_COLORS = {
  info: {
    background: 'rgba(46,134,222,0.1)',
    border: 'rgba(46,134,222,0.3)',
    icon: '#54A0FF',
    title: '#54A0FF',
  },
  success: {
    background: 'rgba(52,211,153,0.1)',
    border: 'rgba(52,211,153,0.3)',
    icon: '#34D399',
    title: '#34D399',
  },
  warning: {
    background: 'rgba(251,191,36,0.1)',
    border: 'rgba(251,191,36,0.3)',
    icon: '#FBBF24',
    title: '#FBBF24',
  },
  error: {
    background: 'rgba(239,68,68,0.1)',
    border: 'rgba(239,68,68,0.3)',
    icon: '#EF4444',
    title: '#EF4444',
  },
};

// ============================================================================
// ALERT COMPONENT
// ============================================================================

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  description,
  dismissible = false,
  visible = true,
  onDismiss,
  icon,
  style,
  titleStyle,
  descriptionStyle,
  testID = 'alert',
  autoDissmissTimeout,
  accessibilityLabel,
  accessibilityHint,
  ...accessibilityProps
}) => {
  const theme = useTheme();
  const [isVisible, setIsVisible] = useState(visible);
  const fadeAnim = useRef(new Animated.Value(visible ? 1 : 0)).current;
  const slideAnim = useRef(new Animated.Value(visible ? 0 : -50)).current;

  // Get variant colors
  const variantColors = VARIANT_COLORS[variant];

  // Handle visibility changes
  useEffect(() => {
    if (visible) {
      setIsVisible(true);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: -50,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => setIsVisible(false));
    }
  }, [visible, fadeAnim, slideAnim]);

  // Auto dismiss
  useEffect(() => {
    if (autoDissmissTimeout && visible) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, autoDissmissTimeout);
      return () => clearTimeout(timer);
    }
  }, [autoDissmissTimeout, visible]);

  // Handle dismiss
  const handleDismiss = () => {
    if (onDismiss) {
      onDismiss();
    }
  };

  // Render default icon based on variant
  const renderDefaultIcon = () => {
    const iconMap = {
      info: 'ℹ️',
      success: '✅',
      warning: '⚠️',
      error: '❌',
    };
    return (
      <Text style={[styles.defaultIcon, { color: variantColors.icon }]}>
        {iconMap[variant]}
      </Text>
    );
  };

  // Render close button
  const renderCloseButton = () => {
    if (!dismissible) return null;

    return (
      <TouchableOpacity
        style={styles.closeButton}
        onPress={handleDismiss}
        accessibilityLabel="Close alert"
        accessibilityRole="button"
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Text style={styles.closeIcon}>×</Text>
      </TouchableOpacity>
    );
  };

  if (!isVisible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: variantColors.background,
          borderColor: variantColors.border,
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
        style,
      ]}
      testID={testID}
      accessibilityLabel={accessibilityLabel || `${variant} alert`}
      accessibilityHint={accessibilityHint}
      accessibilityRole="alert"
      {...accessibilityProps}
    >
      {/* Icon */}
      <View style={styles.iconContainer}>
        {icon || renderDefaultIcon()}
      </View>

      {/* Content */}
      <View style={styles.content}>
        {title && (
          <Text
            style={[
              styles.title,
              { color: variantColors.title },
              titleStyle,
            ]}
          >
            {title}
          </Text>
        )}
        {description && (
          <Text
            style={[
              styles.description,
              descriptionStyle,
            ]}
          >
            {description}
          </Text>
        )}
      </View>

      {/* Close Button */}
      {renderCloseButton()}
    </Animated.View>
  );
};

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  iconContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  defaultIcon: {
    fontSize: 20,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
  },
  description: {
    fontFamily: 'Inter',
    fontSize: 14,
    lineHeight: 21,
    color: 'rgba(255,255,255,0.8)',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  closeIcon: {
    fontSize: 20,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.6)',
  },
});

// ============================================================================
// VARIANTS
// ============================================================================

export const InfoAlert: React.FC<Omit<AlertProps, 'variant'>> = (props) => (
  <Alert {...props} variant="info" />
);

export const SuccessAlert: React.FC<Omit<AlertProps, 'variant'>> = (props) => (
  <Alert {...props} variant="success" />
);

export const WarningAlert: React.FC<Omit<AlertProps, 'variant'>> = (props) => (
  <Alert {...props} variant="warning" />
);

export const ErrorAlert: React.FC<Omit<AlertProps, 'variant'>> = (props) => (
  <Alert {...props} variant="error" />
);

// ============================================================================
// EXPORTS
// ============================================================================

export default Alert;
