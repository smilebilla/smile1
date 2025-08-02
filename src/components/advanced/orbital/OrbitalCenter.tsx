import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SignatureBlues } from '../../foundations/tokens/colors/SignatureBlues';

export interface OrbitalCenterProps {
  /** Center size in pixels */
  size?: number;
  /** Center color */
  color?: string;
  /** Glow effect enabled */
  glowEnabled?: boolean;
  /** Glow intensity */
  glowIntensity?: number;
  /** Pulse animation enabled */
  pulseEnabled?: boolean;
  /** Pulse duration in seconds */
  pulseDuration?: number;
  /** Pulse scale range */
  pulseScaleRange?: [number, number];
  /** Rotation animation enabled */
  rotationEnabled?: boolean;
  /** Rotation duration in seconds */
  rotationDuration?: number;
  /** Interactive mode */
  interactive?: boolean;
  /** Magnetic field visualization */
  showMagneticField?: boolean;
  /** Magnetic field radius */
  magneticFieldRadius?: number;
  /** Container center position */
  center: { x: number; y: number };
  /** Callback when center is pressed */
  onPress?: () => void;
  /** Callback when center is long pressed */
  onLongPress?: () => void;
  /** Test ID for testing */
  testID?: string;
}

/**
 * OrbitalCenter - Central component for orbital motion systems
 * 
 * Features:
 * - Configurable size and styling
 * - Glow effects with intensity control
 * - Pulse animations with scale control
 * - Rotation animations
 * - Interactive touch handling
 * - Magnetic field visualization
 * - Corp Astro design system integration
 */
export const OrbitalCenter: React.FC<OrbitalCenterProps> = ({
  size = 20,
  color = SignatureBlues.primary,
  glowEnabled = true,
  glowIntensity = 0.8,
  pulseEnabled = true,
  pulseDuration = 3,
  pulseScaleRange = [1, 1.2],
  rotationEnabled = false,
  rotationDuration = 15,
  interactive = false,
  showMagneticField = false,
  magneticFieldRadius = 60,
  center,
  onPress,
  onLongPress,
  testID = 'orbital-center',
}) => {
  const pulseAnim = useRef(new Animated.Value(pulseScaleRange[0])).current;
  const glowAnim = useRef(new Animated.Value(glowIntensity)).current;
  const rotationAnim = useRef(new Animated.Value(0)).current;
  const magneticAnim = useRef(new Animated.Value(0)).current;
  const pressAnim = useRef(new Animated.Value(1)).current;

  // Pulse animation
  useEffect(() => {
    if (pulseEnabled) {
      const pulseLoop = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: pulseScaleRange[1],
            duration: (pulseDuration * 1000) / 2,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: pulseScaleRange[0],
            duration: (pulseDuration * 1000) / 2,
            useNativeDriver: true,
          }),
        ])
      );
      pulseLoop.start();

      return () => {
        pulseLoop.stop();
      };
    }
  }, [pulseEnabled, pulseDuration, pulseScaleRange]);

  // Glow animation
  useEffect(() => {
    if (glowEnabled) {
      const glowLoop = Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: glowIntensity * 1.5,
            duration: 2500,
            useNativeDriver: true,
          }),
          Animated.timing(glowAnim, {
            toValue: glowIntensity,
            duration: 2500,
            useNativeDriver: true,
          }),
        ])
      );
      glowLoop.start();

      return () => {
        glowLoop.stop();
      };
    }
  }, [glowEnabled, glowIntensity]);

  // Rotation animation
  useEffect(() => {
    if (rotationEnabled) {
      const rotationLoop = Animated.loop(
        Animated.timing(rotationAnim, {
          toValue: 1,
          duration: rotationDuration * 1000,
          useNativeDriver: true,
        })
      );
      rotationLoop.start();

      return () => {
        rotationLoop.stop();
      };
    }
  }, [rotationEnabled, rotationDuration]);

  // Magnetic field animation
  useEffect(() => {
    if (showMagneticField) {
      const magneticLoop = Animated.loop(
        Animated.sequence([
          Animated.timing(magneticAnim, {
            toValue: 1,
            duration: 4000,
            useNativeDriver: true,
          }),
          Animated.timing(magneticAnim, {
            toValue: 0,
            duration: 4000,
            useNativeDriver: true,
          }),
        ])
      );
      magneticLoop.start();

      return () => {
        magneticLoop.stop();
      };
    }
  }, [showMagneticField]);

  // Handle press animations
  const handlePressIn = () => {
    Animated.timing(pressAnim, {
      toValue: 0.9,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(pressAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  // Rotation interpolation
  const rotationInterpolate = rotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // Magnetic field interpolation
  const magneticOpacity = magneticAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.1, 0.3, 0.1],
  });

  const magneticScale = magneticAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1.2],
  });

  // Render magnetic field
  const renderMagneticField = () => {
    if (!showMagneticField) return null;

    return (
      <Animated.View
        style={[
          styles.magneticField,
          {
            left: center.x - magneticFieldRadius,
            top: center.y - magneticFieldRadius,
            width: magneticFieldRadius * 2,
            height: magneticFieldRadius * 2,
            borderRadius: magneticFieldRadius,
            borderColor: color,
            opacity: magneticOpacity,
            transform: [{ scale: magneticScale }],
          },
        ]}
      />
    );
  };

  const CenterComponent = interactive ? TouchableOpacity : View;

  return (
    <>
      {renderMagneticField()}
      
      <CenterComponent
        style={[
          styles.container,
          {
            left: center.x - size / 2,
            top: center.y - size / 2,
            width: size,
            height: size,
          },
        ]}
        onPress={onPress}
        onLongPress={onLongPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.8}
        testID={testID}
      >
        {/* Outer glow */}
        {glowEnabled && (
          <Animated.View
            style={[
              styles.outerGlow,
              {
                width: size * 4,
                height: size * 4,
                borderRadius: (size * 4) / 2,
                backgroundColor: color,
                opacity: Animated.multiply(glowAnim, 0.1),
                left: -size * 1.5,
                top: -size * 1.5,
              },
            ]}
          />
        )}
        
        {/* Inner glow */}
        {glowEnabled && (
          <Animated.View
            style={[
              styles.innerGlow,
              {
                width: size * 2.5,
                height: size * 2.5,
                borderRadius: (size * 2.5) / 2,
                backgroundColor: color,
                opacity: Animated.multiply(glowAnim, 0.2),
                left: -size * 0.75,
                top: -size * 0.75,
              },
            ]}
          />
        )}
        
        {/* Main center body */}
        <Animated.View
          style={[
            styles.centerBody,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              transform: [
                { scale: Animated.multiply(pulseAnim, pressAnim) },
                { rotate: rotationInterpolate },
              ],
            },
          ]}
        >
          <LinearGradient
            colors={[String(color), `${String(color)}CC`, `${String(color)}80`]}
            style={[
              styles.gradientCenter,
              {
                width: size,
                height: size,
                borderRadius: size / 2,
              },
            ]}
          />
          
          {/* Inner core */}
          <View
            style={[
              styles.innerCore,
              {
                width: size * 0.6,
                height: size * 0.6,
                borderRadius: (size * 0.6) / 2,
                backgroundColor: color,
                left: size * 0.2,
                top: size * 0.2,
              },
            ]}
          />
          
          {/* Center highlight */}
          <View
            style={[
              styles.centerHighlight,
              {
                width: size * 0.3,
                height: size * 0.3,
                borderRadius: (size * 0.3) / 2,
                backgroundColor: `${String(color)}40`,
                left: size * 0.35,
                top: size * 0.35,
              },
            ]}
          />
        </Animated.View>
        
        {/* Pulse rings */}
        <Animated.View
          style={[
            styles.pulseRing,
            {
              width: size * 1.5,
              height: size * 1.5,
              borderRadius: (size * 1.5) / 2,
              borderColor: color,
              borderWidth: 1,
              opacity: Animated.multiply(pulseAnim, 0.3),
              left: -size * 0.25,
              top: -size * 0.25,
            },
          ]}
        />
        
        <Animated.View
          style={[
            styles.pulseRing,
            {
              width: size * 2,
              height: size * 2,
              borderRadius: size,
              borderColor: color,
              borderWidth: 1,
              opacity: Animated.multiply(pulseAnim, 0.2),
              left: -size * 0.5,
              top: -size * 0.5,
            },
          ]}
        />
      </CenterComponent>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerGlow: {
    position: 'absolute',
    shadowOpacity: 0.8,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
    elevation: 10,
  },
  innerGlow: {
    position: 'absolute',
    shadowOpacity: 0.6,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8,
  },
  centerBody: {
    position: 'absolute',
    shadowOpacity: 0.8,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    elevation: 5,
  },
  gradientCenter: {
    position: 'absolute',
  },
  innerCore: {
    position: 'absolute',
    shadowOpacity: 0.6,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 0 },
    elevation: 3,
  },
  centerHighlight: {
    position: 'absolute',
    shadowOpacity: 0.8,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 0 },
    elevation: 2,
  },
  pulseRing: {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderStyle: 'solid',
  },
  magneticField: {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderStyle: 'dashed',
  },
});

export default OrbitalCenter;
