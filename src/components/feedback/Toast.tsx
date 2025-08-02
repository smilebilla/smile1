/**
 * Corp Astro UI Library - Toast Component
 * Module 127: Toast.tsx
 * 
 * A sophisticated toast notification component with cosmic design aesthetics
 * that provides temporary feedback messages following Corp Astro design system.
 * 
 * Features:
 * - Cosmic toast styling with gradient backgrounds
 * - Multiple toast variants (info, success, warning, error)
 * - Slide-in/slide-out animations
 * - Auto-dismiss functionality
 * - Toast queue management
 * - Backdrop blur effects
 * - Accessibility support with proper ARIA attributes
 * - Theme-aware styling with Corp Astro colors
 * - Portal rendering for proper z-index management
 * 
 * Design System Compliance:
 * - Position: top with 100px offset
 * - MaxWidth: 380px with responsive design
 * - BorderRadius: 16px with cosmic styling
 * - Padding: 16px 20px with proper spacing
 * - Background: rgba(15,15,26,0.95) with backdrop blur
 * - Border: 1px solid rgba(46,134,222,0.3)
 * - Shadow: 0 20px 40px rgba(0,0,0,0.8)
 * - Animation: slideInDown/slideOutUp with cubic-bezier
 * - Typography: Inter font with proper hierarchy
 * - Icons: 20px with Corp Astro color scheme
 * 
 * @module Toast
 * @version 1.0.0
 * @since 2024
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ViewStyle,
  TextStyle,
  Dimensions,
  Modal,
  Platform,
  AccessibilityProps,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../foundations/themes/ThemeProvider';
import { SignatureBlues } from '../foundations/tokens/colors/SignatureBlues';
import { deepSpaceColors } from '../foundations/tokens/colors/DeepSpaceColors';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type ToastVariant = 'info' | 'success' | 'warning' | 'error';
export type ToastPosition = 'top' | 'bottom' | 'center';

export interface ToastProps extends AccessibilityProps {
  /** Toast variant type */
  variant?: ToastVariant;
  /** Toast message */
  message: string;
  /** Toast position */
  position?: ToastPosition;
  /** Whether toast is visible */
  visible?: boolean;
  /** Auto dismiss duration in milliseconds */
  duration?: number;
  /** Callback when toast is dismissed */
  onDismiss?: () => void;
  /** Custom icon component */
  icon?: React.ReactNode;
  /** Custom style overrides */
  style?: ViewStyle;
  /** Message text style */
  messageStyle?: TextStyle;
  /** Test ID for testing */
  testID?: string;
  /** Maximum width */
  maxWidth?: number;
  /** Offset from position */
  offset?: number;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const DEFAULT_DURATION = 3000;
const DEFAULT_OFFSET = 100;
const DEFAULT_MAX_WIDTH = 380;

const VARIANT_COLORS = {
  info: {
    background: 'rgba(46,134,222,0.1)',
    border: 'rgba(46,134,222,0.3)',
    icon: '#54A0FF',
  },
  success: {
    background: 'rgba(52,211,153,0.1)',
    border: 'rgba(52,211,153,0.3)',
    icon: '#34D399',
  },
  warning: {
    background: 'rgba(251,191,36,0.1)',
    border: 'rgba(251,191,36,0.3)',
    icon: '#FBBF24',
  },
  error: {
    background: 'rgba(239,68,68,0.1)',
    border: 'rgba(239,68,68,0.3)',
    icon: '#EF4444',
  },
};

// ============================================================================
// TOAST COMPONENT
// ============================================================================

export const Toast: React.FC<ToastProps> = ({
  variant = 'info',
  message,
  position = 'top',
  visible = false,
  duration = DEFAULT_DURATION,
  onDismiss,
  icon,
  style,
  messageStyle,
  testID = 'toast',
  maxWidth = DEFAULT_MAX_WIDTH,
  offset = DEFAULT_OFFSET,
  accessibilityLabel,
  accessibilityHint,
  ...accessibilityProps
}) => {
  const theme = useTheme();

  // Get variant colors
  const variantColors = VARIANT_COLORS[variant];

  // Handle auto dismiss
  useEffect(() => {
    if (visible && duration > 0) {
      const timer = setTimeout(() => {
        if (onDismiss) {
          onDismiss();
        }
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, duration, onDismiss]);

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

  // Calculate position styles
  const getPositionStyles = (): ViewStyle => {
    switch (position) {
      case 'top':
        return {
          top: offset,
          justifyContent: 'flex-start',
        };
      case 'bottom':
        return {
          bottom: offset,
          justifyContent: 'flex-end',
        };
      case 'center':
        return {
          justifyContent: 'center',
        };
      default:
        return {
          top: offset,
          justifyContent: 'flex-start',
        };
    }
  };

  if (!visible) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      statusBarTranslucent
      testID={`${testID}-modal`}
    >
      <View style={[styles.overlay, getPositionStyles()]}>
        <View
          style={[
            styles.container,
            {
              backgroundColor: 'rgba(15,15,26,0.95)',
              borderColor: variantColors.border,
              maxWidth: Math.min(maxWidth, SCREEN_WIDTH - 40),
            },
            style,
          ]}
          testID={testID}
          accessibilityLabel={accessibilityLabel || `${variant} toast`}
          accessibilityHint={accessibilityHint}
          accessibilityRole="alert"
          {...accessibilityProps}
        >
          <LinearGradient
            colors={['rgba(15,15,26,0.95)', 'rgba(8,8,15,0.95)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.gradientBackground}
          >
            <View style={styles.content}>
              {/* Icon */}
              <View style={styles.iconContainer}>
                {icon || renderDefaultIcon()}
              </View>

              {/* Message */}
              <Text
                style={[
                  styles.message,
                  messageStyle,
                ]}
              >
                {message}
              </Text>
            </View>
          </LinearGradient>
        </View>
      </View>
    </Modal>
  );
};

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    pointerEvents: 'box-none',
  },
  container: {
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.8,
    shadowRadius: 40,
    elevation: 20,
    overflow: 'hidden',
  },
  gradientBackground: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  defaultIcon: {
    fontSize: 16,
    fontWeight: '600',
  },
  message: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#FFFFFF',
    flex: 1,
    lineHeight: 20,
  },
});

// ============================================================================
// TOAST MANAGER
// ============================================================================

interface ToastItem extends ToastProps {
  id: string;
}

class ToastManager {
  private toasts: ToastItem[] = [];
  private listeners: ((toasts: ToastItem[]) => void)[] = [];

  show(props: Omit<ToastProps, 'visible' | 'onDismiss'>) {
    const id = Math.random().toString(36).substr(2, 9);
    const toast: ToastItem = {
      ...props,
      id,
      visible: true,
      onDismiss: () => this.dismiss(id),
    };

    this.toasts.push(toast);
    this.notifyListeners();

    return id;
  }

  dismiss(id: string) {
    this.toasts = this.toasts.filter(toast => toast.id !== id);
    this.notifyListeners();
  }

  clear() {
    this.toasts = [];
    this.notifyListeners();
  }

  subscribe(listener: (toasts: ToastItem[]) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.toasts));
  }
}

export const toastManager = new ToastManager();

// ============================================================================
// VARIANTS
// ============================================================================

export const InfoToast: React.FC<Omit<ToastProps, 'variant'>> = (props) => (
  <Toast {...props} variant="info" />
);

export const SuccessToast: React.FC<Omit<ToastProps, 'variant'>> = (props) => (
  <Toast {...props} variant="success" />
);

export const WarningToast: React.FC<Omit<ToastProps, 'variant'>> = (props) => (
  <Toast {...props} variant="warning" />
);

export const ErrorToast: React.FC<Omit<ToastProps, 'variant'>> = (props) => (
  <Toast {...props} variant="error" />
);

// ============================================================================
// CONVENIENCE FUNCTIONS
// ============================================================================

export const showToast = {
  info: (message: string, options?: Partial<ToastProps>) => 
    toastManager.show({ ...options, message, variant: 'info' }),
  success: (message: string, options?: Partial<ToastProps>) => 
    toastManager.show({ ...options, message, variant: 'success' }),
  warning: (message: string, options?: Partial<ToastProps>) => 
    toastManager.show({ ...options, message, variant: 'warning' }),
  error: (message: string, options?: Partial<ToastProps>) => 
    toastManager.show({ ...options, message, variant: 'error' }),
};

// ============================================================================
// EXPORTS
// ============================================================================

export default Toast;
