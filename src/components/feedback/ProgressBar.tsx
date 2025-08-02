/**
 * Corp Astro UI Library - Progress Bar Component
 * Module 125: ProgressBar.tsx
 * 
 * A sophisticated progress bar component with cosmic design aesthetics
 * that provides progress indicators following Corp Astro design system.
 * 
 * Features:
 * - Cosmic progress bar with gradient fill
 * - Smooth animation transitions
 * - Multiple variants (linear, circular, cosmic)
 * - Customizable colors and sizes
 * - Progress text indicators
 * - Accessibility support with proper ARIA attributes
 * - Theme-aware styling with Corp Astro colors
 * - Performance optimized animations
 * 
 * Design System Compliance:
 * - Background: rgba(46,134,222,0.1) with Corp Astro styling
 * - Fill: linear gradient with signature blues
 * - Animation: smooth progress transitions
 * - Sizes: thin(4px), medium(8px), thick(12px)
 * - Colors: Corp Astro signature blues and cosmic gradients
 * 
 * @module ProgressBar
 * @version 1.0.0
 * @since 2024
 */

import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text,
  StyleSheet, 
  Animated, 
  ViewStyle,
  TextStyle,
  AccessibilityProps,
  ColorValue,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../foundations/themes/ThemeProvider';
import { SignatureBlues } from '../foundations/tokens/colors/SignatureBlues';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type ProgressVariant = 'linear' | 'circular' | 'cosmic';
export type ProgressSize = 'thin' | 'medium' | 'thick';

export interface ProgressBarProps extends AccessibilityProps {
  /** Progress value (0-100) */
  progress: number;
  /** Progress bar variant */
  variant?: ProgressVariant;
  /** Progress bar size */
  size?: ProgressSize | number;
  /** Track color */
  trackColor?: ColorValue;
  /** Progress fill color */
  fillColor?: ColorValue;
  /** Secondary fill color for gradients */
  secondaryFillColor?: ColorValue;
  /** Whether to show progress text */
  showProgress?: boolean;
  /** Custom progress text */
  progressText?: string;
  /** Animation duration in milliseconds */
  animationDuration?: number;
  /** Whether progress is indeterminate */
  indeterminate?: boolean;
  /** Custom width for linear variants */
  width?: number;
  /** Custom height for linear variants */
  height?: number;
  /** Custom style overrides */
  style?: ViewStyle;
  /** Progress text style */
  progressTextStyle?: TextStyle;
  /** Test ID for testing */
  testID?: string;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const ANIMATION_DURATION = 500;

const SIZE_VALUES = {
  thin: 4,
  medium: 8,
  thick: 12,
};

const DEFAULT_TRACK_COLOR = 'rgba(46,134,222,0.1)';
const DEFAULT_FILL_COLORS = [SignatureBlues.primary, SignatureBlues.light];

// ============================================================================
// PROGRESS BAR COMPONENT
// ============================================================================

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress = 0,
  variant = 'linear',
  size = 'medium',
  trackColor = DEFAULT_TRACK_COLOR,
  fillColor = SignatureBlues.primary,
  secondaryFillColor = SignatureBlues.light,
  showProgress = false,
  progressText,
  animationDuration = ANIMATION_DURATION,
  indeterminate = false,
  width = 200,
  height,
  style,
  progressTextStyle,
  testID = 'progress-bar',
  accessibilityLabel = 'Progress indicator',
  ...accessibilityProps
}) => {
  const theme = useTheme();
  const progressValue = useRef(new Animated.Value(0)).current;
  const indeterminateValue = useRef(new Animated.Value(0)).current;

  // Calculate size
  const progressSize = typeof size === 'number' ? size : SIZE_VALUES[size];
  const progressHeight = height || progressSize;

  // Clamp progress value
  const clampedProgress = Math.max(0, Math.min(100, progress));

  // Animate progress
  useEffect(() => {
    if (!indeterminate) {
      Animated.timing(progressValue, {
        toValue: clampedProgress,
        duration: animationDuration,
        useNativeDriver: false,
      }).start();
    }
  }, [clampedProgress, animationDuration, indeterminate, progressValue]);

  // Animate indeterminate progress
  useEffect(() => {
    if (indeterminate) {
      const startIndeterminate = () => {
        indeterminateValue.setValue(0);
        Animated.loop(
          Animated.timing(indeterminateValue, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: false,
          })
        ).start();
      };
      startIndeterminate();
    }
  }, [indeterminate, indeterminateValue]);

  // Calculate progress text
  const displayText = progressText || `${Math.round(clampedProgress)}%`;

  // Base container style
  const containerStyle: ViewStyle = {
    width: variant === 'circular' ? progressSize * 6 : width,
    height: variant === 'circular' ? progressSize * 6 : progressHeight,
  };

  // Render linear progress bar
  const renderLinear = () => {
    const fillWidth = progressValue.interpolate({
      inputRange: [0, 100],
      outputRange: ['0%', '100%'],
      extrapolate: 'clamp',
    });

    const indeterminateWidth = indeterminateValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: ['0%', '50%', '100%'],
      extrapolate: 'clamp',
    });

    const indeterminateLeft = indeterminateValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: ['0%', '25%', '50%'],
      extrapolate: 'clamp',
    });

    return (
      <View style={[styles.linearContainer, containerStyle, style]}>
        <View
          style={[
            styles.linearTrack,
            {
              height: progressHeight,
              backgroundColor: trackColor,
              borderRadius: progressHeight / 2,
            },
          ]}
        >
          {indeterminate ? (
            <Animated.View
              style={[
                styles.linearFill,
                {
                  width: indeterminateWidth,
                  left: indeterminateLeft,
                  height: progressHeight,
                  borderRadius: progressHeight / 2,
                },
              ]}
            >
              <LinearGradient
                colors={[String(fillColor), String(secondaryFillColor)]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientFill}
              />
            </Animated.View>
          ) : (
            <Animated.View
              style={[
                styles.linearFill,
                {
                  width: fillWidth,
                  height: progressHeight,
                  borderRadius: progressHeight / 2,
                },
              ]}
            >
              <LinearGradient
                colors={[String(fillColor), String(secondaryFillColor)]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientFill}
              />
            </Animated.View>
          )}
        </View>
        
        {showProgress && !indeterminate && (
          <Text style={[styles.progressText, progressTextStyle]}>
            {displayText}
          </Text>
        )}
      </View>
    );
  };

  // Render circular progress bar
  const renderCircular = () => {
    const radius = (progressSize * 6) / 2 - progressSize;
    const circumference = 2 * Math.PI * radius;
    
    const strokeDashoffset = progressValue.interpolate({
      inputRange: [0, 100],
      outputRange: [circumference, 0],
      extrapolate: 'clamp',
    });

    return (
      <View style={[styles.circularContainer, containerStyle, style]}>
        {/* SVG would be used here for actual circular progress */}
        <View style={styles.circularPlaceholder}>
          <Text style={[styles.progressText, progressTextStyle]}>
            Circular Progress
          </Text>
          <Text style={[styles.progressText, progressTextStyle]}>
            {displayText}
          </Text>
        </View>
      </View>
    );
  };

  // Render cosmic progress bar
  const renderCosmic = () => {
    const fillWidth = progressValue.interpolate({
      inputRange: [0, 100],
      outputRange: ['0%', '100%'],
      extrapolate: 'clamp',
    });

    return (
      <View style={[styles.cosmicContainer, containerStyle, style]}>
        <View
          style={[
            styles.cosmicTrack,
            {
              height: progressHeight,
              backgroundColor: trackColor,
              borderRadius: progressHeight / 2,
            },
          ]}
        >
          <Animated.View
            style={[
              styles.cosmicFill,
              {
                width: fillWidth,
                height: progressHeight,
                borderRadius: progressHeight / 2,
              },
            ]}
          >
            <LinearGradient
              colors={[
                String(fillColor),
                String(secondaryFillColor),
                String(fillColor),
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientFill}
            />
          </Animated.View>
        </View>
        
        {showProgress && (
          <Text style={[styles.progressText, progressTextStyle]}>
            {displayText}
          </Text>
        )}
      </View>
    );
  };

  // Render based on variant
  return (
    <View
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: clampedProgress }}
      {...accessibilityProps}
    >
      {variant === 'linear' && renderLinear()}
      {variant === 'circular' && renderCircular()}
      {variant === 'cosmic' && renderCosmic()}
    </View>
  );
};

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  linearContainer: {
    alignItems: 'center',
  },
  linearTrack: {
    width: '100%',
    overflow: 'hidden',
  },
  linearFill: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  circularContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circularPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cosmicContainer: {
    alignItems: 'center',
  },
  cosmicTrack: {
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
  },
  cosmicFill: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  gradientFill: {
    flex: 1,
    borderRadius: 'inherit' as any,
  },
  progressText: {
    fontSize: 14,
    color: '#FFFFFF',
    marginTop: 8,
    fontWeight: '500',
    textAlign: 'center',
  },
});

// ============================================================================
// VARIANTS
// ============================================================================

export const LinearProgressBar: React.FC<Omit<ProgressBarProps, 'variant'>> = (props) => (
  <ProgressBar {...props} variant="linear" />
);

export const CircularProgressBar: React.FC<Omit<ProgressBarProps, 'variant'>> = (props) => (
  <ProgressBar {...props} variant="circular" />
);

export const CosmicProgressBar: React.FC<Omit<ProgressBarProps, 'variant'>> = (props) => (
  <ProgressBar {...props} variant="cosmic" />
);

// ============================================================================
// EXPORTS
// ============================================================================

export default ProgressBar;
