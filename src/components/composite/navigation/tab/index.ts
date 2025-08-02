/**
 * Corp Astro UI Library - Tab Module
 * 
 * Tab navigation components for comprehensive tab system functionality.
 * Provides theme-aware tab configurations with Corp Astro design system.
 * 
 * @module Tab
 * @version 1.0.0
 * @author Corp Astro Design System
 * @since 2024
 */

// ============================================================================
// EXPORTS
// ============================================================================

// Main Components
export { TabNavigation } from './TabNavigation';
export { default as TabNavigationDefault } from './TabNavigation';

export { TabItem } from './TabItem';
export { default as TabItemDefault } from './TabItem';

export { TabIndicator } from './TabIndicator';
export { default as TabIndicatorDefault } from './TabIndicator';

export { SegmentedTabs } from './SegmentedTabs';
export { default as SegmentedTabsDefault } from './SegmentedTabs';

// Test Components
// Test components are excluded from production exports
// They are available for testing purposes but not bundled in production builds
// export { TabNavigationTest } from './__tests__/TabNavigationTest';
// export { default as TabNavigationTestDefault } from './__tests__/TabNavigationTest';
// 
// export { TabItemTest } from './__tests__/TabItemTest';
// export { default as TabItemTestDefault } from './__tests__/TabItemTest';
// 
// export { TabIndicatorTest } from './__tests__/TabIndicatorTest';
// export { default as TabIndicatorTestDefault } from './__tests__/TabIndicatorTest';
// 
// export { SegmentedTabsTest } from './__tests__/SegmentedTabsTest';
// export { default as SegmentedTabsTestDefault } from './__tests__/SegmentedTabsTest';

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type {
  TabNavigationProps,
  TabNavigationVariant,
  TabNavigationSize,
  TabNavigationOrientation,
  TabNavigationAlignment,
  TabNavigationAnimation,
  TabNavigationItem,
  TabNavigationIndicator,
  TabNavigationGesture,
} from './TabNavigation';

export type {
  TabItemProps,
  TabItemVariant,
  TabItemSize,
  TabItemOrientation,
  TabItemIconPosition,
  TabItemBadgePosition,
  TabItemAnimation,
} from './TabItem';

export type {
  TabIndicatorProps,
  TabIndicatorVariant,
  TabIndicatorSize,
  TabIndicatorPosition,
  TabIndicatorAnimation,
  TabIndicatorOrientation,
  TabLayoutInfo,
  TabIndicatorStyleConfig,
  TabIndicatorAnimationConfig,
  TabIndicatorGestureConfig,
} from './TabIndicator';

export type {
  SegmentedTabsProps,
  SegmentedTabsVariant,
  SegmentedTabsSize,
  SegmentedTabsAnimation,
  SegmentedTabsDistribution,
  SegmentedTabsSegment,
  SegmentedTabsStyleConfig,
  SegmentedTabsAnimationConfig,
  SegmentedTabsGestureConfig,
} from './SegmentedTabs';

// ============================================================================
// RE-EXPORTS FOR CONVENIENCE
// ============================================================================

// Default exports
export { TabNavigation as default } from './TabNavigation';
