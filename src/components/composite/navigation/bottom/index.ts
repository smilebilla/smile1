/**
 * Corp Astro UI Library - Bottom Navigation Module
 * 
 * Bottom navigation components for comprehensive navigation functionality.
 * Provides theme-aware bottom navigation with Corp Astro design system.
 * 
 * @module BottomNavigation
 * @version 1.0.0
 * @author Corp Astro Design System
 * @since 2024
 */

// ============================================================================
// EXPORTS
// ============================================================================

// Main Components
export { BottomNavigation } from './BottomNavigation';
export { default as BottomNavigationDefault } from './BottomNavigation';

export { BottomNavContainer } from './BottomNavContainer';
export { default as BottomNavContainerDefault } from './BottomNavContainer';

export { BottomNavItem } from './BottomNavItem';
export { default as BottomNavItemDefault } from './BottomNavItem';

export { BottomNavOrb } from './BottomNavOrb';
export { default as BottomNavOrbDefault } from './BottomNavOrb';

// Test Components
// Test components are excluded from production exports
// They are available for testing purposes but not bundled in production builds
// export { sampleNavigationItems, TestWrapper, renderWithTheme } from './__tests__/BottomNavigationTest';
// export { BottomNavContainerTest, BottomNavContainerTestWrapper } from './__tests__/BottomNavContainerTest';
// export { BottomNavItemTest } from './__tests__/BottomNavItemTest';
// export { BottomNavOrbTest } from './__tests__/BottomNavOrbTest';

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type {
  BottomNavigationProps,
  NavigationItem,
} from './BottomNavigation';

export type {
  BottomNavContainerProps,
  BottomNavContainerVariant,
  BottomNavContainerSize,
  BottomNavContainerAnimation,
  BottomNavContainerPosition,
  BottomNavContainerSafeArea,
  BottomNavContainerLayoutConfig,
  BottomNavContainerAnimationConfig,
  BottomNavContainerGestureConfig,
  BottomNavContainerBackdropConfig,
  BottomNavContainerSafeAreaConfig,
} from './BottomNavContainer';

export type {
  BottomNavItemProps,
  BottomNavItemSize,
  BottomNavItemVariant,
  BottomNavItemState,
  BottomNavItemBadgeConfig,
  BottomNavItemIconConfig,
  BottomNavItemAnimationConfig,
  BottomNavItemGestureConfig,
  BottomNavItemAccessibilityConfig,
  BottomNavItemStyleConfig,
} from './BottomNavItem';

export type {
  BottomNavOrbProps,
  BottomNavOrbSize,
  BottomNavOrbPosition,
  BottomNavOrbAnimation,
  BottomNavOrbVariant,
  BottomNavOrbIcon,
  BottomNavOrbAnimationConfig,
  BottomNavOrbPositionConfig,
  BottomNavOrbGestureConfig,
  BottomNavOrbPremiumConfig,
  BottomNavOrbAccessibilityConfig,
} from './BottomNavOrb';

// ============================================================================
// RE-EXPORTS FOR CONVENIENCE
// ============================================================================

// Default exports
export { BottomNavigation as default } from './BottomNavigation';
