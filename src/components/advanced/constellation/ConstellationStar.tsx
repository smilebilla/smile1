import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { deepSpaceColors } from '../../foundations/tokens/colors/DeepSpaceColors';
import { SignatureBlues } from '../../foundations/tokens/colors/SignatureBlues';

export interface ConstellationStarProps {
  /** Star position coordinates */
  position: { x: number; y: number };
  /** Star size in pixels */
  size?: number;
  /** Star color override */
  color?: string;
  /** Star glow intensity */
  glowIntensity?: number;
  /** Whether star is active/selected */
  isActive?: boolean;
  /** Whether star is connected to others */
  isConnected?: boolean;
  /** Animation duration for transitions */
  animationDuration?: number;
  /** Callback when star is pressed */
  onPress?: () => void;
  /** Callback when star is hovered */
  onHover?: () => void;
  /** Test ID for testing */
  testID?: string;
}

/**
 * ConstellationStar - Interactive star component for constellation patterns
 * 
 * Features:
 * - Configurable size and position
 * - Glow effects with intensity control
 * - Active/connected states
 * - Smooth animations
 * - Touch interactions
 * - Corp Astro design system integration
 */
export const ConstellationStar: React.FC<ConstellationStarProps> = ({
  position,
  size = 4,
  color = SignatureBlues.primary,
  glowIntensity = 0.6,
  isActive = false,
  isConnected = false,
  animationDuration = 300,
  onPress,
  onHover,
  testID = 'constellation-star',
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(glowIntensity)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  // Animation effects
  useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacityAnim, {
          toValue: glowIntensity * 1.5,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: glowIntensity,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );

    pulseAnimation.start();

    return () => {
      pulseAnimation.stop();
    };
  }, [glowIntensity]);

  // Active state animation
  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: isActive ? 1.5 : 1,
        duration: animationDuration,
        useNativeDriver: true,
      }),
      Animated.timing(glowAnim, {
        toValue: isActive ? 1 : 0,
        duration: animationDuration,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isActive, animationDuration]);

  // Connected state animation
  useEffect(() => {
    if (isConnected) {
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: animationDuration,
        useNativeDriver: true,
      }).start();
    }
  }, [isConnected, animationDuration]);

  const handlePress = () => {
    // Scale animation on press
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: isActive ? 1.5 : 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    onPress?.();
  };

  const starSize = isActive ? size * 1.5 : size;
  const glowSize = starSize * 3;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          left: position.x - starSize / 2,
          top: position.y - starSize / 2,
        },
      ]}
      onPress={handlePress}
      onPressIn={onHover}
      activeOpacity={0.7}
      testID={testID}
    >
      {/* Glow effect */}
      <Animated.View
        style={[
          styles.glow,
          {
            width: glowSize,
            height: glowSize,
            borderRadius: glowSize / 2,
            opacity: Animated.multiply(opacityAnim, glowAnim),
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <LinearGradient
          colors={[
            `${String(color)}40`,
            `${String(color)}20`,
            `${String(color)}00`,
          ]}
          style={styles.gradientGlow}
        />
      </Animated.View>

      {/* Star core */}
      <Animated.View
        style={[
          styles.star,
          {
            width: starSize,
            height: starSize,
            borderRadius: starSize / 2,
            backgroundColor: color,
            opacity: opacityAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      />

      {/* Active state indicator */}
      {isActive && (
        <Animated.View
          style={[
            styles.activeIndicator,
            {
              width: starSize * 2,
              height: starSize * 2,
              borderRadius: starSize,
              borderColor: color,
              opacity: glowAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        />
      )}

      {/* Connected state indicator */}
      {isConnected && (
        <Animated.View
          style={[
            styles.connectedIndicator,
            {
              width: starSize * 1.5,
              height: starSize * 1.5,
              borderRadius: starSize * 0.75,
              borderColor: SignatureBlues.glow,
              opacity: 0.5,
            },
          ]}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glow: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientGlow: {
    width: '100%',
    height: '100%',
    borderRadius: 999,
  },
  star: {
    position: 'absolute',
    shadowColor: SignatureBlues.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 8,
  },
  activeIndicator: {
    position: 'absolute',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  connectedIndicator: {
    position: 'absolute',
    borderWidth: 1,
    borderStyle: 'dashed',
  },
});

export default ConstellationStar;
