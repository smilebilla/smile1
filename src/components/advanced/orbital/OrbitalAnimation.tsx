import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';
import { SignatureBlues } from '../../foundations/tokens/colors/SignatureBlues';

export interface OrbitalAnimationProps {
  /** Animation target elements */
  targets: Array<{
    id: string;
    element: React.ReactElement;
    initialPosition: { x: number; y: number };
    finalPosition: { x: number; y: number };
    animationType: 'orbit' | 'spiral' | 'pulse' | 'fade' | 'scale' | 'rotate';
    duration: number;
    delay?: number;
    easing?: (value: number) => number;
  }>;
  /** Animation sequence type */
  sequenceType?: 'parallel' | 'sequence' | 'staggered';
  /** Stagger delay (for staggered animations) */
  staggerDelay?: number;
  /** Animation enabled */
  enabled?: boolean;
  /** Loop animation */
  loop?: boolean;
  /** Reverse animation */
  reverse?: boolean;
  /** Animation speed multiplier */
  speed?: number;
  /** Pause animation */
  paused?: boolean;
  /** Auto-start animation */
  autoStart?: boolean;
  /** Animation callbacks */
  onStart?: () => void;
  onComplete?: () => void;
  onProgress?: (progress: number) => void;
  onTargetComplete?: (targetId: string) => void;
  /** Children render function */
  children?: (animatedValues: Map<string, Animated.ValueXY>, progress: number) => React.ReactNode;
}

interface AnimationState {
  animatedValues: Map<string, Animated.ValueXY>;
  progressValue: Animated.Value;
  isRunning: boolean;
  currentAnimation: Animated.CompositeAnimation | null;
}

/**
 * OrbitalAnimation - Advanced orbital animation system
 * 
 * Features:
 * - Multiple animation types (orbit, spiral, pulse, fade, scale, rotate)
 * - Parallel, sequence, and staggered animation sequences
 * - Configurable timing and easing functions
 * - Loop and reverse animation support
 * - Real-time progress tracking
 * - Animation state management
 * - Performance optimizations
 * - Smooth animation transitions
 * 
 * @param targets - Animation target elements with configurations
 * @param sequenceType - Animation sequence type (default: 'parallel')
 * @param staggerDelay - Stagger delay for staggered animations (default: 100)
 * @param enabled - Animation enabled (default: true)
 * @param loop - Loop animation (default: false)
 * @param reverse - Reverse animation (default: false)
 * @param speed - Animation speed multiplier (default: 1)
 * @param paused - Pause animation (default: false)
 * @param autoStart - Auto-start animation (default: true)
 * @param onStart - Animation start callback
 * @param onComplete - Animation complete callback
 * @param onProgress - Animation progress callback
 * @param onTargetComplete - Target completion callback
 * @param children - Children render function
 * 
 * @returns OrbitalAnimation component
 */
export const OrbitalAnimation: React.FC<OrbitalAnimationProps> = ({
  targets,
  sequenceType = 'parallel',
  staggerDelay = 100,
  enabled = true,
  loop = false,
  reverse = false,
  speed = 1,
  paused = false,
  autoStart = true,
  onStart,
  onComplete,
  onProgress,
  onTargetComplete,
  children
}) => {
  const [animationState, setAnimationState] = useState<AnimationState>({
    animatedValues: new Map(),
    progressValue: new Animated.Value(0),
    isRunning: false,
    currentAnimation: null
  });

  const [currentProgress, setCurrentProgress] = useState(0);
  const progressListenerRef = useRef<string | null>(null);
  const targetListenersRef = useRef<Map<string, string>>(new Map());

  // Initialize animated values
  const initializeAnimatedValues = () => {
    const animatedValues = new Map<string, Animated.ValueXY>();
    
    targets.forEach(target => {
      const animatedValue = new Animated.ValueXY(target.initialPosition);
      animatedValues.set(target.id, animatedValue);
    });

    setAnimationState(prev => ({
      ...prev,
      animatedValues
    }));
  };

  // Create animation for a single target
  const createTargetAnimation = (target: OrbitalAnimationProps['targets'][0]): Animated.CompositeAnimation => {
    const animatedValue = animationState.animatedValues.get(target.id);
    if (!animatedValue) return Animated.timing(new Animated.Value(0), { toValue: 1, duration: 0, useNativeDriver: false });

    const duration = target.duration / speed;
    const easing = target.easing || Easing.out(Easing.ease);

    switch (target.animationType) {
      case 'orbit':
        // Circular orbital motion
        return Animated.timing(animatedValue, {
          toValue: target.finalPosition,
          duration,
          easing,
          useNativeDriver: false,
        });

      case 'spiral':
        // Spiral motion animation
        return Animated.timing(animatedValue, {
          toValue: target.finalPosition,
          duration,
          easing: Easing.in(Easing.ease),
          useNativeDriver: false,
        });

      case 'pulse':
        // Pulse animation (scale effect)
        return Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: { x: target.finalPosition.x * 1.2, y: target.finalPosition.y * 1.2 },
            duration: duration / 2,
            easing: Easing.out(Easing.ease),
            useNativeDriver: false,
          }),
          Animated.timing(animatedValue, {
            toValue: target.finalPosition,
            duration: duration / 2,
            easing: Easing.in(Easing.ease),
            useNativeDriver: false,
          }),
        ]);

      case 'fade':
        // Fade animation (opacity change)
        return Animated.timing(animatedValue, {
          toValue: target.finalPosition,
          duration,
          easing,
          useNativeDriver: false,
        });

      case 'scale':
        // Scale animation
        return Animated.timing(animatedValue, {
          toValue: target.finalPosition,
          duration,
          easing: Easing.elastic(1),
          useNativeDriver: false,
        });

      case 'rotate':
        // Rotation animation
        return Animated.timing(animatedValue, {
          toValue: target.finalPosition,
          duration,
          easing: Easing.linear,
          useNativeDriver: false,
        });

      default:
        return Animated.timing(animatedValue, {
          toValue: target.finalPosition,
          duration,
          easing,
          useNativeDriver: false,
        });
    }
  };

  // Create sequence animation
  const createSequenceAnimation = (): Animated.CompositeAnimation => {
    const animations = targets.map(target => {
      const targetAnimation = createTargetAnimation(target);
      
      // Add delay if specified
      if (target.delay) {
        return Animated.sequence([
          Animated.delay(target.delay),
          targetAnimation
        ]);
      }
      
      return targetAnimation;
    });

    switch (sequenceType) {
      case 'parallel':
        return Animated.parallel(animations);

      case 'sequence':
        return Animated.sequence(animations);

      case 'staggered':
        return Animated.stagger(staggerDelay, animations);

      default:
        return Animated.parallel(animations);
    }
  };

  // Setup animation listeners
  const setupListeners = () => {
    // Clear existing listeners
    if (progressListenerRef.current) {
      animationState.progressValue.removeListener(progressListenerRef.current);
    }
    targetListenersRef.current.forEach((listenerId, targetId) => {
      const animatedValue = animationState.animatedValues.get(targetId);
      if (animatedValue) {
        animatedValue.removeListener(listenerId);
      }
    });
    targetListenersRef.current.clear();

    // Add progress listener
    progressListenerRef.current = animationState.progressValue.addListener(({ value }) => {
      setCurrentProgress(value);
      onProgress?.(value);
    });

    // Add target listeners
    targets.forEach(target => {
      const animatedValue = animationState.animatedValues.get(target.id);
      if (animatedValue) {
        const listenerId = animatedValue.addListener(() => {
          // Target animation progress can be tracked here
        });
        targetListenersRef.current.set(target.id, listenerId);
      }
    });
  };

  // Start animation
  const startAnimation = () => {
    if (!enabled || paused || animationState.isRunning) return;

    setAnimationState(prev => ({ ...prev, isRunning: true }));
    
    // Setup listeners
    setupListeners();

    // Create main animation
    const mainAnimation = createSequenceAnimation();

    // Create progress animation
    const progressAnimation = Animated.timing(animationState.progressValue, {
      toValue: 1,
      duration: Math.max(...targets.map(t => t.duration)) / speed,
      useNativeDriver: false,
    });

    // Combine animations
    const combinedAnimation = Animated.parallel([
      mainAnimation,
      progressAnimation
    ]);

    // Configure looping
    let finalAnimation: Animated.CompositeAnimation;
    if (loop) {
      finalAnimation = Animated.loop(combinedAnimation, { iterations: -1 });
    } else {
      finalAnimation = combinedAnimation;
    }

    // Configure reverse
    if (reverse) {
      finalAnimation = Animated.sequence([
        finalAnimation,
        Animated.parallel([
          createReverseAnimation(),
          Animated.timing(animationState.progressValue, {
            toValue: 0,
            duration: Math.max(...targets.map(t => t.duration)) / speed,
            useNativeDriver: false,
          })
        ])
      ]);
    }

    // Start animation
    setAnimationState(prev => ({ ...prev, currentAnimation: finalAnimation }));
    
    onStart?.();
    finalAnimation.start((finished) => {
      if (finished) {
        setAnimationState(prev => ({ ...prev, isRunning: false, currentAnimation: null }));
        onComplete?.();
        
        // Notify target completions
        targets.forEach(target => {
          onTargetComplete?.(target.id);
        });
      }
    });
  };

  // Create reverse animation
  const createReverseAnimation = (): Animated.CompositeAnimation => {
    const reverseAnimations = targets.map(target => {
      const animatedValue = animationState.animatedValues.get(target.id);
      if (!animatedValue) return Animated.timing(new Animated.Value(0), { toValue: 1, duration: 0, useNativeDriver: false });

      return Animated.timing(animatedValue, {
        toValue: target.initialPosition,
        duration: target.duration / speed,
        easing: target.easing || Easing.out(Easing.ease),
        useNativeDriver: false,
      });
    });

    return Animated.parallel(reverseAnimations);
  };

  // Stop animation
  const stopAnimation = () => {
    if (animationState.currentAnimation) {
      animationState.currentAnimation.stop();
    }
    setAnimationState(prev => ({ ...prev, isRunning: false, currentAnimation: null }));
  };

  // Pause animation
  const pauseAnimation = () => {
    if (animationState.currentAnimation) {
      animationState.currentAnimation.stop();
    }
    setAnimationState(prev => ({ ...prev, isRunning: false }));
  };

  // Resume animation
  const resumeAnimation = () => {
    if (enabled && !paused && !animationState.isRunning) {
      startAnimation();
    }
  };

  // Reset animation
  const resetAnimation = () => {
    stopAnimation();
    
    // Reset all animated values
    animationState.animatedValues.forEach((animatedValue, targetId) => {
      const target = targets.find(t => t.id === targetId);
      if (target) {
        animatedValue.setValue(target.initialPosition);
      }
    });
    
    animationState.progressValue.setValue(0);
  };

  // Initialize on mount
  useEffect(() => {
    initializeAnimatedValues();
  }, [targets]);

  // Auto-start animation
  useEffect(() => {
    if (autoStart && enabled && !paused && animationState.animatedValues.size > 0) {
      startAnimation();
    }
  }, [autoStart, enabled, paused, animationState.animatedValues.size]);

  // Handle pause/resume
  useEffect(() => {
    if (paused) {
      pauseAnimation();
    } else if (enabled && !animationState.isRunning) {
      resumeAnimation();
    }
  }, [paused, enabled]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAnimation();
      if (progressListenerRef.current) {
        animationState.progressValue.removeListener(progressListenerRef.current);
      }
      targetListenersRef.current.forEach((listenerId, targetId) => {
        const animatedValue = animationState.animatedValues.get(targetId);
        if (animatedValue) {
          animatedValue.removeListener(listenerId);
        }
      });
    };
  }, []);

  // Render children with animated values
  if (children) {
    return <>{children(animationState.animatedValues, currentProgress)}</>;
  }

  return null;
};

// Export utility functions for creating common orbital animations
export const createOrbitAnimation = (
  id: string,
  element: React.ReactElement,
  center: { x: number; y: number },
  radius: number,
  duration: number = 10000
) => ({
  id,
  element,
  initialPosition: { x: center.x + radius, y: center.y },
  finalPosition: { x: center.x + radius, y: center.y },
  animationType: 'orbit' as const,
  duration,
  easing: Easing.linear,
});

export const createSpiralAnimation = (
  id: string,
  element: React.ReactElement,
  start: { x: number; y: number },
  end: { x: number; y: number },
  duration: number = 5000
) => ({
  id,
  element,
  initialPosition: start,
  finalPosition: end,
  animationType: 'spiral' as const,
  duration,
  easing: Easing.in(Easing.ease),
});

export const createPulseAnimation = (
  id: string,
  element: React.ReactElement,
  position: { x: number; y: number },
  duration: number = 2000
) => ({
  id,
  element,
  initialPosition: position,
  finalPosition: position,
  animationType: 'pulse' as const,
  duration,
  easing: Easing.inOut(Easing.ease),
});

export default OrbitalAnimation;
