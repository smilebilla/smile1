/**
 * Corp Astro UI Library - Floating Navigation Components
 * 
 * Barrel export for all floating navigation components including floating action buttons,
 * floating orbs, and their associated interfaces, types, and test suites.
 * 
 * @module FloatingNavigation
 * @version 1.0.0
 * @since 2024
 */

// Component exports
export { FloatingOrb } from './FloatingOrb';
export { FloatingFAB } from './FloatingFAB';

// Type exports
export type {
  FloatingOrbProps,
  FloatingOrbIcon,
  FloatingOrbAnimationConfig,
  FloatingOrbPositionConfig,
  FloatingOrbInteractionConfig,
  FloatingOrbTrailConfig,
  FloatingOrbGlowConfig,
  FloatingOrbAccessibilityConfig,
} from './FloatingOrb';

export type {
  FloatingFABProps,
  FloatingFABAction,
  FloatingFABPosition,
  FloatingFABAnimationState,
} from './FloatingFAB';

// Test suite exports
// Test components are excluded from production exports
// They are available for testing purposes but not bundled in production builds
// export { FloatingOrbTest } from './__tests__/FloatingOrbTest';
// export { FloatingFABTest } from './__tests__/FloatingFABTest';
