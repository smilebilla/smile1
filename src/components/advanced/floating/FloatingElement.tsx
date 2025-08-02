import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing } from 'react-native';
import { SignatureBlues } from '../../foundations/tokens/colors/SignatureBlues';

interface FloatingElementProps {
  id?: string;
  x?: number;
  y?: number;
  size?: number;
  color?: string;
  opacity?: number;
  blurRadius?: number;
  floatEnabled?: boolean;
  rotateEnabled?: boolean;
  pulseEnabled?: boolean;
  floatDistance?: number;
  floatDuration?: number;
  rotateDuration?: number;
  pulseDuration?: number;
  children?: React.ReactNode;
  style?: any;
  onPress?: () => void;
}

export const FloatingElement: React.FC<FloatingElementProps> = ({
  id = 'floating-element',
  x = 0,
  y = 0,
  size = 32,
  color = SignatureBlues.primary,
  opacity = 0.8,
  blurRadius = 8,
  floatEnabled = true,
  rotateEnabled = false,
  pulseEnabled = false,
  floatDistance = 15,
  floatDuration = 4000,
  rotateDuration = 10000,
  pulseDuration = 2000,
  children,
  style,
  onPress,
}) => {
  const floatAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    let floatAnimation: Animated.CompositeAnimation | null = null;
    let rotateAnimation: Animated.CompositeAnimation | null = null;
    let pulseAnimation: Animated.CompositeAnimation | null = null;

    if (floatEnabled) {
      floatAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(floatAnim, {
            toValue: 1,
            duration: floatDuration / 2,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(floatAnim, {
            toValue: 0,
            duration: floatDuration / 2,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ])
      );
      floatAnimation.start();
    }

    if (rotateEnabled) {
      rotateAnimation = Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: rotateDuration,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      );
      rotateAnimation.start();
    }

    if (pulseEnabled) {
      pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: pulseDuration / 2,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: pulseDuration / 2,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );
      pulseAnimation.start();
    }

    return () => {
      floatAnimation?.stop();
      rotateAnimation?.stop();
      pulseAnimation?.stop();
    };
  }, [
    floatEnabled,
    rotateEnabled,
    pulseEnabled,
    floatDuration,
    rotateDuration,
    pulseDuration,
    floatAnim,
    rotateAnim,
    pulseAnim,
  ]);

  const translateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -floatDistance],
  });

  const rotateZ = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const elementStyle = {
    position: 'absolute' as const,
    left: x - size / 2,
    top: y - size / 2,
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: color,
    opacity,
    shadowColor: color,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: blurRadius,
    elevation: blurRadius,
  };

  return (
    <Animated.View
      style={[
        elementStyle,
        {
          transform: [
            { translateY },
            { rotate: rotateZ },
            { scale: pulseAnim },
          ],
        },
        style,
      ]}
    >
      {children}
    </Animated.View>
  );
};

export default FloatingElement;
