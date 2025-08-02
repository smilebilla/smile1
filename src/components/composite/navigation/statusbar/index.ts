/**
 * Corp Astro UI Library - Status Bar Module
 * 
 * Status bar components for consistent status bar styling across the application.
 * Provides theme-aware status bar configurations with proper platform support.
 * 
 * @module StatusBar
 * @version 1.0.0
 * @author Corp Astro Design System
 * @since 2024
 */

// ============================================================================
// EXPORTS
// ============================================================================

// Main Components
export { StatusBarComponent } from './StatusBarComponent';
export { default as StatusBarComponentDefault } from './StatusBarComponent';
export { StatusBarOverlay } from './StatusBarOverlay';
export { default as StatusBarOverlayDefault } from './StatusBarOverlay';
export { StatusBarBlur, createBlurScrollHandler } from './StatusBarBlur';
export { default as StatusBarBlurDefault } from './StatusBarBlur';

// Test Components (removed to fix bundling issue)
// export { StatusBarComponentTest } from './__tests__/StatusBarComponentTest';
// export { default as StatusBarComponentTestDefault } from './__tests__/StatusBarComponentTest';
// export { StatusBarOverlayTest } from './__tests__/StatusBarOverlayTest';
// export { default as StatusBarOverlayTestDefault } from './__tests__/StatusBarOverlayTest';
// export { StatusBarBlurTest } from './__tests__/StatusBarBlurTest';
// export { default as StatusBarBlurTestDefault } from './__tests__/StatusBarBlurTest';

// Types
export type {
  StatusBarComponentProps,
  StatusBarVariant,
  StatusBarTheme,
  StatusBarAnimation,
} from './StatusBarComponent';

export type {
  StatusBarOverlayProps,
  StatusBarOverlayVariant,
  StatusBarOverlayPosition,
  StatusBarOverlayAnimation,
} from './StatusBarOverlay';

export type {
  StatusBarBlurProps,
  StatusBarBlurVariant,
  StatusBarBlurIntensity,
  StatusBarBlurAnimation,
} from './StatusBarBlur';

// ============================================================================
// RE-EXPORTS FOR CONVENIENCE
// ============================================================================

// Default exports
export { StatusBarComponent as default } from './StatusBarComponent';
