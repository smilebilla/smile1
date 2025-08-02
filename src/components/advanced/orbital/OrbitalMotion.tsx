import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';
import { SignatureBlues } from '../../foundations/tokens/colors/SignatureBlues';
import { deepSpaceColors } from '../../foundations/tokens/colors/DeepSpaceColors';

export interface OrbitalMotionProps {
  /** Motion duration in seconds */
  duration?: number;
  /** Orbital path type */
  pathType?: 'circular' | 'elliptical' | 'spiral' | 'figure8' | 'irregular';
  /** Orbital radius */
  radius?: number;
  /** Ellipse aspect ratio (for elliptical paths) */
  aspectRatio?: number;
  /** Motion direction */
  direction?: 'clockwise' | 'counterclockwise';
  /** Starting angle in degrees */
  startAngle?: number;
  /** Speed variation */
  speedVariation?: number;
  /** Easing function */
  easing?: (value: number) => number;
  /** Animation enabled */
  enabled?: boolean;
  /** Loop animation */
  loop?: boolean;
  /** Reverse animation */
  reverse?: boolean;
  /** Pause animation */
  paused?: boolean;
  /** Progress callback */
  onProgress?: (progress: number, position: { x: number; y: number }) => void;
  /** Animation complete callback */
  onComplete?: () => void;
  /** Animation start callback */
  onStart?: () => void;
  /** Center position */
  center?: { x: number; y: number };
  /** Custom path function */
  customPath?: (progress: number) => { x: number; y: number };
  /** Children render function */
  children?: (position: { x: number; y: number }, progress: number) => React.ReactNode;
}

/**
 * OrbitalMotion - Orbital motion animation component
 * 
 * Features:
 * - Multiple orbital path types (circular, elliptical, spiral, figure8, irregular)
 * - Configurable motion duration and easing
 * - Direction control (clockwise, counterclockwise)
 * - Speed variation and animation controls
 * - Custom path function support
 * - Real-time position callbacks
 * - Loop and reverse animation support
 * - Pause/resume functionality
 * - Smooth animation transitions
 * 
 * @param duration - Motion duration in seconds (default: 10)
 * @param pathType - Orbital path type (default: 'circular')
 * @param radius - Orbital radius (default: 50)
 * @param aspectRatio - Ellipse aspect ratio (default: 1)
 * @param direction - Motion direction (default: 'clockwise')
 * @param startAngle - Starting angle in degrees (default: 0)
 * @param speedVariation - Speed variation (default: 0)
 * @param easing - Easing function (default: linear)
 * @param enabled - Animation enabled (default: true)
 * @param loop - Loop animation (default: true)
 * @param reverse - Reverse animation (default: false)
 * @param paused - Pause animation (default: false)
 * @param onProgress - Progress callback
 * @param onComplete - Animation complete callback
 * @param onStart - Animation start callback
 * @param center - Center position (default: { x: 0, y: 0 })
 * @param customPath - Custom path function
 * @param children - Children render function
 * 
 * @returns OrbitalMotion component
 */
export const OrbitalMotion: React.FC<OrbitalMotionProps> = ({
  duration = 10,
  pathType = 'circular',
  radius = 50,
  aspectRatio = 1,
  direction = 'clockwise',
  startAngle = 0,
  speedVariation = 0,
  easing = Easing.linear,
  enabled = true,
  loop = true,
  reverse = false,
  paused = false,
  onProgress,
  onComplete,
  onStart,
  center = { x: 0, y: 0 },
  customPath,
  children
}) => {
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
  const [animationProgress, setAnimationProgress] = useState(0);
  const animationValue = useRef(new Animated.Value(0)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);
  const listenerRef = useRef<string | null>(null);

  // Convert degrees to radians
  const toRadians = (degrees: number): number => (degrees * Math.PI) / 180;

  // Calculate position based on path type and progress
  const calculatePosition = (progress: number): { x: number; y: number } => {
    if (customPath) {
      return customPath(progress);
    }

    // Apply direction and reverse
    let adjustedProgress = progress;
    if (direction === 'counterclockwise') {
      adjustedProgress = 1 - progress;
    }
    if (reverse) {
      adjustedProgress = 1 - adjustedProgress;
    }

    // Convert to angle
    const angle = toRadians(startAngle + adjustedProgress * 360);

    // Apply speed variation
    const speedOffset = speedVariation * Math.sin(progress * Math.PI * 4);
    const finalAngle = angle + speedOffset;

    let x: number, y: number;

    switch (pathType) {
      case 'circular':
        x = center.x + radius * Math.cos(finalAngle);
        y = center.y + radius * Math.sin(finalAngle);
        break;

      case 'elliptical':
        x = center.x + radius * Math.cos(finalAngle);
        y = center.y + (radius * aspectRatio) * Math.sin(finalAngle);
        break;

      case 'spiral':
        const spiralRadius = radius * (1 + progress * 0.5);
        x = center.x + spiralRadius * Math.cos(finalAngle);
        y = center.y + spiralRadius * Math.sin(finalAngle);
        break;

      case 'figure8':
        const scale = radius * (1 + 0.5 * Math.sin(finalAngle));
        x = center.x + scale * Math.cos(finalAngle);
        y = center.y + scale * Math.sin(finalAngle * 2);
        break;

      case 'irregular':
        const irregularRadius = radius * (1 + 0.3 * Math.sin(finalAngle * 3) + 0.2 * Math.cos(finalAngle * 5));
        x = center.x + irregularRadius * Math.cos(finalAngle);
        y = center.y + irregularRadius * Math.sin(finalAngle);
        break;

      default:
        x = center.x + radius * Math.cos(finalAngle);
        y = center.y + radius * Math.sin(finalAngle);
        break;
    }

    return { x, y };
  };

  // Update position based on animation progress
  const updatePosition = (progress: number) => {
    const position = calculatePosition(progress);
    setCurrentPosition(position);
    setAnimationProgress(progress);
    onProgress?.(progress, position);
  };

  // Start animation
  const startAnimation = () => {
    if (!enabled || paused) return;

    // Clean up existing listener
    if (listenerRef.current) {
      animationValue.removeListener(listenerRef.current);
    }

    // Add listener for progress updates
    listenerRef.current = animationValue.addListener(({ value }) => {
      updatePosition(value);
    });

    // Create animation
    const animation = Animated.timing(animationValue, {
      toValue: 1,
      duration: duration * 1000,
      easing,
      useNativeDriver: false,
    });

    // Handle animation completion
    const animationWithCallbacks = Animated.sequence([
      animation,
      Animated.timing(animationValue, {
        toValue: 0,
        duration: 0,
        useNativeDriver: false,
      }),
    ]);

    // Configure looping
    if (loop) {
      animationRef.current = Animated.loop(animationWithCallbacks, {
        iterations: -1,
      });
    } else {
      animationRef.current = animationWithCallbacks;
    }

    // Start animation
    onStart?.();
    animationRef.current.start((finished) => {
      if (finished && !loop) {
        onComplete?.();
      }
    });
  };

  // Stop animation
  const stopAnimation = () => {
    if (animationRef.current) {
      animationRef.current.stop();
    }
    if (listenerRef.current) {
      animationValue.removeListener(listenerRef.current);
      listenerRef.current = null;
    }
  };

  // Pause animation
  const pauseAnimation = () => {
    if (animationRef.current) {
      animationRef.current.stop();
    }
  };

  // Resume animation
  const resumeAnimation = () => {
    if (enabled && !paused) {
      startAnimation();
    }
  };

  // Reset animation
  const resetAnimation = () => {
    stopAnimation();
    animationValue.setValue(0);
    updatePosition(0);
  };

  // Effect for animation control
  useEffect(() => {
    if (enabled && !paused) {
      startAnimation();
    } else if (paused) {
      pauseAnimation();
    }

    return () => {
      stopAnimation();
    };
  }, [enabled, paused, duration, pathType, radius, aspectRatio, direction, startAngle, speedVariation, loop, reverse]);

  // Effect for center position changes
  useEffect(() => {
    updatePosition(animationProgress);
  }, [center]);

  // Initialize position
  useEffect(() => {
    updatePosition(0);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAnimation();
    };
  }, []);

  // Render children with position
  if (children) {
    return <>{children(currentPosition, animationProgress)}</>;
  }

  return null;
};

// Export additional utility functions
export const createOrbitalPath = (
  pathType: OrbitalMotionProps['pathType'],
  radius: number,
  center: { x: number; y: number },
  aspectRatio: number = 1
) => {
  return (progress: number): { x: number; y: number } => {
    const angle = progress * 2 * Math.PI;
    
    switch (pathType) {
      case 'circular':
        return {
          x: center.x + radius * Math.cos(angle),
          y: center.y + radius * Math.sin(angle),
        };
      case 'elliptical':
        return {
          x: center.x + radius * Math.cos(angle),
          y: center.y + (radius * aspectRatio) * Math.sin(angle),
        };
      case 'spiral':
        const spiralRadius = radius * (1 + progress * 0.5);
        return {
          x: center.x + spiralRadius * Math.cos(angle),
          y: center.y + spiralRadius * Math.sin(angle),
        };
      case 'figure8':
        const scale = radius * (1 + 0.5 * Math.sin(angle));
        return {
          x: center.x + scale * Math.cos(angle),
          y: center.y + scale * Math.sin(angle * 2),
        };
      case 'irregular':
        const irregularRadius = radius * (1 + 0.3 * Math.sin(angle * 3) + 0.2 * Math.cos(angle * 5));
        return {
          x: center.x + irregularRadius * Math.cos(angle),
          y: center.y + irregularRadius * Math.sin(angle),
        };
      default:
        return {
          x: center.x + radius * Math.cos(angle),
          y: center.y + radius * Math.sin(angle),
        };
    }
  };
};

export default OrbitalMotion;
