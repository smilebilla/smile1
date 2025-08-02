/**
 * Corp Astro UI Library - Header Module
 * 
 * Header components for comprehensive navigation and page structure.
 * Provides theme-aware header configurations with Corp Astro design system.
 * 
 * @module Header
 * @version 1.0.0
 * @author Corp Astro Design System
 * @since 2024
 */

// ============================================================================
// EXPORTS
// ============================================================================

// Main Components
export { PrimaryHeader } from './PrimaryHeader';
export { default as PrimaryHeaderDefault } from './PrimaryHeader';
export { SectionHeader } from './SectionHeader';
export { default as SectionHeaderDefault } from './SectionHeader';
export { SearchHeader } from './SearchHeader';
export { default as SearchHeaderDefault } from './SearchHeader';
export { HeaderOverlay } from './HeaderOverlay';
export { default as HeaderOverlayDefault } from './HeaderOverlay';
export { HeaderBase } from './HeaderBase';
export { default as HeaderBaseDefault } from './HeaderBase';

// Test Components
// Test components are excluded from production exports
// They are available for testing purposes but not bundled in production builds
// export { PrimaryHeaderTest } from './__tests__/PrimaryHeaderTest';
// export { default as PrimaryHeaderTestDefault } from './__tests__/PrimaryHeaderTest';
// export { SectionHeaderTest } from './__tests__/SectionHeaderTest';
// export { default as SectionHeaderTestDefault } from './__tests__/SectionHeaderTest';
// export { SearchHeaderTest } from './__tests__/SearchHeaderTest';
// export { default as SearchHeaderTestDefault } from './__tests__/SearchHeaderTest';
// export { HeaderOverlayTest } from './__tests__/HeaderOverlayTest';
// export { default as HeaderOverlayTestDefault } from './__tests__/HeaderOverlayTest';
// export { HeaderBaseTest } from './__tests__/HeaderBaseTest';
// export { default as HeaderBaseTestDefault } from './__tests__/HeaderBaseTest';

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type {
  PrimaryHeaderProps,
  PrimaryHeaderVariant,
  PrimaryHeaderHeight,
  PrimaryHeaderAnimation,
  PrimaryHeaderButton,
} from './PrimaryHeader';

export type {
  SectionHeaderProps,
  SectionHeaderVariant,
  SectionHeaderSize,
  SectionHeaderAnimation,
  SectionHeaderAction,
  SectionHeaderBreadcrumb,
} from './SectionHeader';

export type {
  SearchHeaderProps,
  SearchHeaderVariant,
  SearchHeaderSize,
  SearchHeaderAnimation,
  SearchSuggestion,
  SearchFilter,
  SearchHeaderAction,
} from './SearchHeader';

export type {
  HeaderOverlayProps,
  HeaderOverlayVariant,
  HeaderOverlayPosition,
  HeaderOverlayAnimation,
  HeaderOverlayTrigger,
  HeaderOverlayBackdrop,
} from './HeaderOverlay';

export type {
  HeaderBaseProps,
  HeaderBaseVariant,
  HeaderBaseSize,
  HeaderBasePosition,
  HeaderBaseAnimation,
  HeaderBaseSlots,
  HeaderBaseGesture,
  HeaderBaseConfig,
} from './HeaderBase';

// ============================================================================
// RE-EXPORTS FOR CONVENIENCE
// ============================================================================

// Default exports
export { PrimaryHeader as default } from './PrimaryHeader';
