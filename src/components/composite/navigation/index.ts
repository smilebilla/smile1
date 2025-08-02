/**
 * Corp Astro UI Library - Navigation System
 * 
 * Comprehensive navigation components for Corp Astro applications.
 * Provides status bars, headers, tabs, and bottom navigation with
 * theme integration and space-inspired design aesthetics.
 * 
 * @module Navigation
 * @version 1.0.0
 * @author Corp Astro Design System
 * @since 2024
 */

// ============================================================================
// EXPORTS
// ============================================================================

// Status Bar Components
export * from './statusbar';

// Header Components
export * from './header';

// Tab Components
export * from './tab';

// Bottom Navigation Components
export * from './bottom';

// Floating Navigation Components
export * from './floating';

// ============================================================================
// RE-EXPORTS FOR CONVENIENCE
// ============================================================================

// Main navigation components
export { StatusBarComponent } from './statusbar/StatusBarComponent';
export { StatusBarOverlay } from './statusbar/StatusBarOverlay';
export { StatusBarBlur } from './statusbar/StatusBarBlur';
export { PrimaryHeader } from './header/PrimaryHeader';
export { SectionHeader } from './header/SectionHeader';
export { SearchHeader } from './header/SearchHeader';
export { HeaderOverlay } from './header/HeaderOverlay';
export { HeaderBase } from './header/HeaderBase';
export { TabNavigation } from './tab/TabNavigation';
export { BottomNavigation } from './bottom/BottomNavigation';
export { BottomNavContainer } from './bottom/BottomNavContainer';
export { BottomNavItem } from './bottom/BottomNavItem';
export { BottomNavOrb } from './bottom/BottomNavOrb';
export { FloatingOrb } from './floating/FloatingOrb';
export { FloatingFAB } from './floating/FloatingFAB';

// Test components are excluded from production exports
// They are available for testing purposes but not bundled in production builds
