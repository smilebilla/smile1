/**
 * Corp Astro UI Library - Skeleton Loader Component
 * Module 123: SkeletonLoader.tsx
 * 
 * A sophisticated skeleton loader component with cosmic shimmer effects
 * that provides loading placeholders following Corp Astro design system.
 * 
 * Features:
 * - Cosmic shimmer animation with Corp Astro gradient
 * - Multiple skeleton variants (text, title, avatar, card, image)
 * - Animated gradient background with shimmer effect
 * - Responsive sizing and proper accessibility
 * - Theme-aware styling with Corp Astro colors
 * - Performance optimized with hardware acceleration
 * 
 * Design System Compliance:
 * - Background: linear-gradient(90deg, rgba(46,134,222,0.1) 0%, rgba(46,134,222,0.2) 50%, rgba(46,134,222,0.1) 100%)
 * - Animation: shimmer 1.5s ease-in-out infinite
 * - Variants: text(16px), title(24px), avatar(48px), card(120px), image(16:9)
 * - Corp Astro color palette and theming
 * 
 * @module SkeletonLoader
 * @version 1.0.0
 * @since 2024
 */

import React, { useEffect, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  Animated, 
  ViewStyle, 
  AccessibilityProps 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../foundations/themes/useTheme';
import { SignatureBlues } from '../../foundations/tokens/colors/SignatureBlues';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type SkeletonVariant = 'text' | 'title' | 'avatar' | 'card' | 'image';

export interface SkeletonLoaderProps extends AccessibilityProps {
  /** Skeleton variant type */
  variant?: SkeletonVariant;
  /** Custom width - overrides variant default */
  width?: number;
  /** Custom height - overrides variant default */
  height?: number;
  /** Custom border radius - overrides variant default */
  borderRadius?: number;
  /** Whether to show shimmer animation */
  animated?: boolean;
  /** Animation duration in milliseconds */
  animationDuration?: number;
  /** Number of skeleton rows (for text variants) */
  rows?: number;
  /** Custom style overrides */
  style?: ViewStyle;
  /** Test ID for testing */
  testID?: string;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const ANIMATION_DURATION = 1500;
const SHIMMER_COLORS = [
  'rgba(46,134,222,0.1)',
  'rgba(46,134,222,0.2)',
  'rgba(46,134,222,0.1)',
] as const;

const VARIANT_STYLES: Record<SkeletonVariant, ViewStyle> = {
  text: {
    height: 16,
    borderRadius: 4,
  },
  title: {
    height: 24,
    borderRadius: 4,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  card: {
    height: 120,
    borderRadius: 16,
  },
  image: {
    aspectRatio: 16 / 9,
    borderRadius: 12,
  },
};

// ============================================================================
// SKELETON LOADER COMPONENT
// ============================================================================

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  variant = 'text',
  width,
  height,
  borderRadius,
  animated = true,
  animationDuration = ANIMATION_DURATION,
  rows = 1,
  style,
  testID = 'skeleton-loader',
  accessibilityLabel = 'Loading content',
  ...accessibilityProps
}) => {
  const theme = useTheme();
  const shimmerValue = useRef(new Animated.Value(0)).current;

  // Start shimmer animation
  useEffect(() => {
    if (animated) {
      const startShimmer = () => {
        shimmerValue.setValue(0);
        Animated.timing(shimmerValue, {
          toValue: 1,
          duration: animationDuration,
          useNativeDriver: true,
        }).start(() => startShimmer());
      };
      startShimmer();
    }
  }, [animated, animationDuration, shimmerValue]);

  // Get variant styles
  const variantStyle = VARIANT_STYLES[variant];
  
  // Calculate final styles
  const skeletonStyle: ViewStyle = {
    ...variantStyle,
    ...(width && { width }),
    ...(height && { height }),
    ...(borderRadius && { borderRadius }),
  };

  // Animation transform
  const shimmerTransform = {
    transform: [
      {
        translateX: shimmerValue.interpolate({
          inputRange: [0, 1],
          outputRange: [-100, 100],
        }),
      },
    ],
  };

  // Render single skeleton
  const renderSkeleton = (index: number = 0) => (
    <View
      key={index}
      style={[
        styles.skeleton,
        skeletonStyle,
        style,
        index > 0 && styles.skeletonSpacing,
      ]}
      testID={`${testID}-${index}`}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="none"
      {...accessibilityProps}
    >
      <LinearGradient
        colors={SHIMMER_COLORS}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientBase}
      />
      {animated && (
        <Animated.View
          style={[
            styles.shimmerOverlay,
            shimmerTransform,
          ]}
        >
          <LinearGradient
            colors={[
              'transparent',
              'rgba(46,134,222,0.3)',
              'transparent',
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.shimmerGradient}
          />
        </Animated.View>
      )}
    </View>
  );

  // Render multiple rows if specified
  if (rows > 1) {
    return (
      <View style={styles.container}>
        {Array.from({ length: rows }).map((_, index) => renderSkeleton(index))}
      </View>
    );
  }

  return renderSkeleton();
};

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  skeleton: {
    backgroundColor: 'rgba(46,134,222,0.1)',
    overflow: 'hidden',
    position: 'relative',
  },
  skeletonSpacing: {
    marginTop: 8,
  },
  gradientBase: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  shimmerOverlay: {
    position: 'absolute',
    top: 0,
    left: '-50%',
    right: '-50%',
    bottom: 0,
  },
  shimmerGradient: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

// ============================================================================
// VARIANTS
// ============================================================================

export const SkeletonText: React.FC<Omit<SkeletonLoaderProps, 'variant'>> = (props) => (
  <SkeletonLoader {...props} variant="text" />
);

export const SkeletonTitle: React.FC<Omit<SkeletonLoaderProps, 'variant'>> = (props) => (
  <SkeletonLoader {...props} variant="title" />
);

export const SkeletonAvatar: React.FC<Omit<SkeletonLoaderProps, 'variant'>> = (props) => (
  <SkeletonLoader {...props} variant="avatar" />
);

export const SkeletonCard: React.FC<Omit<SkeletonLoaderProps, 'variant'>> = (props) => (
  <SkeletonLoader {...props} variant="card" />
);

export const SkeletonImage: React.FC<Omit<SkeletonLoaderProps, 'variant'>> = (props) => (
  <SkeletonLoader {...props} variant="image" />
);

// ============================================================================
// EXPORTS
// ============================================================================

export default SkeletonLoader;
