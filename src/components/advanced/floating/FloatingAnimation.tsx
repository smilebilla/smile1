import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

interface AnimationConfig {
  duration: number;
  easing: (value: number) => number;
  delay: number;
  loop: boolean;
  useNativeDriver: boolean;
}

interface AnimatableProperty {
  from: number;
  to: number;
  animatedValue: Animated.Value;
  config: AnimationConfig;
}

interface FloatingAnimationProps {
  properties: {
    x?: AnimatableProperty;
    y?: AnimatableProperty;
    scale?: AnimatableProperty;
    rotation?: AnimatableProperty;
    opacity?: AnimatableProperty;
  };
  onAnimationComplete?: () => void;
  enabled?: boolean;
  autoStart?: boolean;
}

export const FloatingAnimation: React.FC<FloatingAnimationProps> = ({
  properties,
  onAnimationComplete,
  enabled = true,
  autoStart = true,
}) => {
  const animationsRef = useRef<Animated.CompositeAnimation[]>([]);

  useEffect(() => {
    if (!enabled || !autoStart) return;

    const animations: Animated.CompositeAnimation[] = [];

    Object.entries(properties).forEach(([key, property]) => {
      if (!property) return;

      const animation = property.config.loop
        ? Animated.loop(
            Animated.sequence([
              Animated.timing(property.animatedValue, {
                toValue: property.to,
                duration: property.config.duration / 2,
                easing: property.config.easing,
                delay: property.config.delay,
                useNativeDriver: property.config.useNativeDriver,
              }),
              Animated.timing(property.animatedValue, {
                toValue: property.from,
                duration: property.config.duration / 2,
                easing: property.config.easing,
                useNativeDriver: property.config.useNativeDriver,
              }),
            ])
          )
        : Animated.timing(property.animatedValue, {
            toValue: property.to,
            duration: property.config.duration,
            easing: property.config.easing,
            delay: property.config.delay,
            useNativeDriver: property.config.useNativeDriver,
          });

      animations.push(animation);
    });

    animationsRef.current = animations;

    // Start all animations
    Animated.parallel(animations).start(onAnimationComplete);

    return () => {
      // Stop all animations
      animations.forEach((animation) => {
        animation.stop();
      });
    };
  }, [properties, enabled, autoStart, onAnimationComplete]);

  // Animation control methods
  const startAnimation = () => {
    if (animationsRef.current.length > 0) {
      Animated.parallel(animationsRef.current).start(onAnimationComplete);
    }
  };

  const stopAnimation = () => {
    animationsRef.current.forEach((animation) => {
      animation.stop();
    });
  };

  const resetAnimation = () => {
    Object.entries(properties).forEach(([key, property]) => {
      if (property) {
        property.animatedValue.setValue(property.from);
      }
    });
  };

  // This is a logic component, it doesn't render anything
  return null;
};

// Helper functions for creating animation configurations
export const createFloatAnimation = (
  animatedValue: Animated.Value,
  distance: number = 20,
  duration: number = 4000
): AnimatableProperty => ({
  from: 0,
  to: distance,
  animatedValue,
  config: {
    duration,
    easing: Easing.inOut(Easing.sin),
    delay: 0,
    loop: true,
    useNativeDriver: true,
  },
});

export const createRotationAnimation = (
  animatedValue: Animated.Value,
  duration: number = 10000
): AnimatableProperty => ({
  from: 0,
  to: 360,
  animatedValue,
  config: {
    duration,
    easing: Easing.linear,
    delay: 0,
    loop: true,
    useNativeDriver: true,
  },
});

export const createPulseAnimation = (
  animatedValue: Animated.Value,
  scale: number = 1.2,
  duration: number = 2000
): AnimatableProperty => ({
  from: 1,
  to: scale,
  animatedValue,
  config: {
    duration,
    easing: Easing.inOut(Easing.ease),
    delay: 0,
    loop: true,
    useNativeDriver: true,
  },
});

export const createFadeAnimation = (
  animatedValue: Animated.Value,
  duration: number = 1000,
  loop: boolean = false
): AnimatableProperty => ({
  from: 0,
  to: 1,
  animatedValue,
  config: {
    duration,
    easing: Easing.ease,
    delay: 0,
    loop,
    useNativeDriver: true,
  },
});

export default FloatingAnimation;
