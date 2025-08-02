/**
 * Corp Astro UI Library - Feedback Components Index
 * 
 * Central export point for all feedback-related components in the Corp Astro design system.
 * Provides alerts, toasts, and notification components with cosmic aesthetics.
 * 
 * @module Feedback
 * @version 1.0.0
 * @since 2024
 */

// ============================================================================
// ALERT COMPONENTS
// ============================================================================

export { default as Alert } from './Alert';
export { 
  InfoAlert,
  SuccessAlert,
  WarningAlert,
  ErrorAlert,
} from './Alert';

// ============================================================================
// TOAST COMPONENTS
// ============================================================================

export { default as Toast } from './Toast';
export { 
  InfoToast,
  SuccessToast,
  WarningToast,
  ErrorToast,
  toastManager,
  showToast,
} from './Toast';

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type { AlertProps, AlertVariant } from './Alert';
export type { ToastProps, ToastVariant, ToastPosition } from './Toast';
