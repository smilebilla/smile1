/**
 * Corp Astro UI Library - Loading Components Index
 * 
 * Central export point for all loading-related components in the Corp Astro design system.
 * Provides skeletal loaders, spinners, and progress indicators with cosmic aesthetics.
 * 
 * @module Loading
 * @version 1.0.0
 * @since 2024
 */

// ============================================================================
// SKELETON LOADER COMPONENTS
// ============================================================================

export { default as SkeletonLoader } from './SkeletonLoader';
export { 
  SkeletonText,
  SkeletonTitle,
  SkeletonAvatar,
  SkeletonCard,
  SkeletonImage,
} from './SkeletonLoader';

// ============================================================================
// SPINNER COMPONENTS
// ============================================================================

export { default as Spinner } from './Spinner';
export { 
  OrbitalSpinner,
  PulseSpinner,
  DotsSpinner,
  RingSpinner,
} from './Spinner';

// ============================================================================
// PROGRESS BAR COMPONENTS
// ============================================================================

export { default as ProgressBar } from './ProgressBar';
export { 
  LinearProgressBar,
  CircularProgressBar,
  CosmicProgressBar,
} from './ProgressBar';

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type { SkeletonLoaderProps, SkeletonVariant } from './SkeletonLoader';
export type { SpinnerProps, SpinnerVariant, SpinnerSize } from './Spinner';
export type { ProgressBarProps, ProgressVariant, ProgressSize } from './ProgressBar';
