import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SignatureBlues } from '../../foundations/tokens/colors/SignatureBlues';

export interface OrbitalSatelliteProps {
  /** Orbit radius in pixels */
  orbitRadius: number;
  /** Satellite size in pixels */
  size?: number;
  /** Satellite color */
  color?: string;
  /** Orbit duration in seconds */
  orbitDuration?: number;
  /** Orbit path type */
  orbitPath?: 'circular' | 'elliptical';
  /** Orbit direction */
  orbitDirection?: 'clockwise' | 'counter-clockwise';
  /** Starting angle offset in degrees */
  startAngle?: number;
  /** Ellipse aspect ratio (height/width) */
  ellipseRatio?: number;
  /** Glow effect enabled */
  glowEnabled?: boolean;
  /** Glow intensity */
  glowIntensity?: number;
  /** Trail effect enabled */
  trailEnabled?: boolean;
  /** Trail length */
  trailLength?: number;
  /** Animation enabled */
  animationEnabled?: boolean;
  /** Container center position */
  center: { x: number; y: number };
  /** Callback when orbit completes */
  onOrbitComplete?: () => void;
  /** Test ID for testing */
  testID?: string;
}

/**
 * OrbitalSatellite - Animated satellite component for orbital motion systems
 * 
 * Features:
 * - Circular and elliptical orbit paths
 * - Configurable orbit duration and direction
 * - Glow effects with intensity control
 * - Trail effects for motion visualization
 * - Starting angle offset for positioning
 * - Corp Astro design system integration
 */
export const OrbitalSatellite: React.FC<OrbitalSatelliteProps> = ({
  orbitRadius,
  size = 8,
  color = SignatureBlues.light,
  orbitDuration = 10,
  orbitPath = 'circular',
  orbitDirection = 'clockwise',
  startAngle = 0,
  ellipseRatio = 0.6,
  glowEnabled = true,
  glowIntensity = 0.8,
  trailEnabled = false,
  trailLength = 5,
  animationEnabled = true,
  center,
  onOrbitComplete,
  testID = 'orbital-satellite',
}) => {
  const orbitAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(glowIntensity)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const trailPositions = useRef<Array<{ x: number; y: number; opacity: number }>>([]).current;

  // Orbit animation
  useEffect(() => {
    if (animationEnabled) {
      const orbitLoop = Animated.loop(
        Animated.timing(orbitAnim, {
          toValue: 1,
          duration: orbitDuration * 1000,
          useNativeDriver: true,
        })
      );
      orbitLoop.start();

      return () => {
        orbitLoop.stop();
      };
    }
  }, [animationEnabled, orbitDuration]);

  // Glow animation
  useEffect(() => {
    if (glowEnabled) {
      const glowLoop = Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: glowIntensity * 1.5,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(glowAnim, {
            toValue: glowIntensity,
            duration: 2000,
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

  // Scale animation for pulse effect
  useEffect(() => {
    const scaleLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    );
    scaleLoop.start();

    return () => {
      scaleLoop.stop();
    };
  }, []);

  // Calculate satellite position
  const calculatePosition = (animationValue: number) => {
    const angle = startAngle + (orbitDirection === 'clockwise' ? animationValue * 360 : -animationValue * 360);
    const radians = (angle * Math.PI) / 180;

    if (orbitPath === 'elliptical') {
      const ellipseWidth = orbitRadius;
      const ellipseHeight = orbitRadius * ellipseRatio;
      
      return {
        x: center.x + ellipseWidth * Math.cos(radians),
        y: center.y + ellipseHeight * Math.sin(radians),
      };
    } else {
      return {
        x: center.x + orbitRadius * Math.cos(radians),
        y: center.y + orbitRadius * Math.sin(radians),
      };
    }
  };

  // Animation listener for orbit completion
  useEffect(() => {
    const listenerId = orbitAnim.addListener(({ value }) => {
      if (value >= 1) {
        onOrbitComplete?.();
      }
      
      // Update trail positions
      if (trailEnabled) {
        const currentPosition = calculatePosition(value);
        trailPositions.unshift({
          x: currentPosition.x,
          y: currentPosition.y,
          opacity: 1,
        });
        
        // Keep only the specified trail length
        if (trailPositions.length > trailLength) {
          trailPositions.splice(trailLength);
        }
        
        // Update trail opacity
        trailPositions.forEach((pos, index) => {
          pos.opacity = (trailLength - index) / trailLength;
        });
      }
    });

    return () => {
      orbitAnim.removeListener(listenerId);
    };
  }, [onOrbitComplete, trailEnabled, trailLength]);

  // Animated position interpolation
  const animatedPosition = {
    transform: [
      {
        translateX: orbitAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [
            calculatePosition(0).x - center.x,
            calculatePosition(1).x - center.x,
          ],
        }),
      },
      {
        translateY: orbitAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [
            calculatePosition(0).y - center.y,
            calculatePosition(1).y - center.y,
          ],
        }),
      },
      { scale: scaleAnim },
    ],
  };

  // Render trail effect
  const renderTrail = () => {
    if (!trailEnabled) return null;

    return trailPositions.map((position, index) => (
      <Animated.View
        key={`trail-${index}`}
        style={[
          styles.trailPoint,
          {
            left: position.x - size / 4,
            top: position.y - size / 4,
            width: size / 2,
            height: size / 2,
            borderRadius: size / 4,
            backgroundColor: color,
            opacity: position.opacity * 0.5,
          },
        ]}
      />
    ));
  };

  return (
    <>
      {renderTrail()}
      
      <Animated.View
        style={[
          styles.container,
          {
            left: center.x - size / 2,
            top: center.y - size / 2,
            width: size,
            height: size,
          },
          animatedPosition,
        ]}
        testID={testID}
      >
        {/* Glow effect */}
        {glowEnabled && (
          <Animated.View
            style={[
              styles.glowEffect,
              {
                width: size * 3,
                height: size * 3,
                borderRadius: (size * 3) / 2,
                backgroundColor: color,
                opacity: Animated.multiply(glowAnim, 0.3),
                left: -size,
                top: -size,
              },
            ]}
          />
        )}
        
        {/* Satellite core */}
        <LinearGradient
          colors={[String(color), `${String(color)}80`]}
          style={[
            styles.satellite,
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
        
        {/* Pulse ring */}
        <Animated.View
          style={[
            styles.pulseRing,
            {
              width: size * 1.5,
              height: size * 1.5,
              borderRadius: (size * 1.5) / 2,
              borderColor: color,
              borderWidth: 1,
              opacity: Animated.multiply(scaleAnim, 0.5),
              left: -size * 0.25,
              top: -size * 0.25,
            },
          ]}
        />
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowEffect: {
    position: 'absolute',
    shadowOpacity: 0.8,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8,
  },
  satellite: {
    position: 'absolute',
    shadowOpacity: 0.8,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    elevation: 5,
  },
  innerCore: {
    position: 'absolute',
    shadowOpacity: 0.6,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 0 },
    elevation: 3,
  },
  pulseRing: {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderStyle: 'solid',
  },
  trailPoint: {
    position: 'absolute',
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 0 },
    elevation: 2,
  },
});

export default OrbitalSatellite;
