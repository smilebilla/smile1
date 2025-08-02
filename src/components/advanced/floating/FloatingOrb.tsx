import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SignatureBlues } from '../../foundations/tokens/colors/SignatureBlues';
// import { useTheme } from '../../foundations/theme/ThemeContext';

interface FloatingOrbProps {
  size?: number;
  color?: string;
  blurRadius?: number;
  floatDuration?: number;
  rotateDuration?: number;
  pulseDuration?: number;
  initialY?: number;
  initialX?: number;
  children?: React.ReactNode;
  style?: any;
  onPress?: () => void;
}

export const FloatingOrb: React.FC<FloatingOrbProps> = ({
  size = 64,
  color = SignatureBlues.primary,
  blurRadius = 0.5,
  floatDuration = 6000,
  rotateDuration = 20000,
  pulseDuration = 3000,
  initialY = 0,
  initialX = 0,
  children,
  style,
  onPress,
}) => {
  // const { theme } = useTheme();
  const floatAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Float animation
    const floatAnimation = Animated.loop(
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

    // Rotation animation
    const rotationAnimation = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: rotateDuration,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    // Pulse animation
    const pulseAnimation = Animated.loop(
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

    floatAnimation.start();
    rotationAnimation.start();
    pulseAnimation.start();

    return () => {
      floatAnimation.stop();
      rotationAnimation.stop();
      pulseAnimation.stop();
    };
  }, [floatAnim, rotateAnim, pulseAnim, floatDuration, rotateDuration, pulseDuration]);

  const floatY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [initialY, initialY - 20],
  });

  const floatX = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [initialX, initialX + 10],
  });

  const rotateZ = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const orbStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    position: 'absolute' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    shadowColor: color,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 8,
  };

  const gradientColors: [string, string] = [
    `rgba(46,134,222,0.8)`, // 80% opacity
    `rgba(46,134,222,0)`, // 0% opacity
  ];

  return (
    <Animated.View
      style={[
        orbStyle,
        {
          transform: [
            { translateY: floatY },
            { translateX: floatX },
            { rotate: rotateZ },
            { scale: pulseAnim },
          ],
        },
        style,
      ]}
    >
      <LinearGradient
        colors={gradientColors}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: size / 2,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {children}
      </LinearGradient>
    </Animated.View>
  );
};

export default FloatingOrb;
