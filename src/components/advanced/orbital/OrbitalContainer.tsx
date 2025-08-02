import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';
import { OrbitalRing } from './OrbitalRing';
import { OrbitalSatellite } from './OrbitalSatellite';
import { OrbitalCenter } from './OrbitalCenter';
import { SignatureBlues } from '../../foundations/tokens/colors/SignatureBlues';
import { deepSpaceColors } from '../../foundations/tokens/colors/DeepSpaceColors';

export interface OrbitalRingConfig {
  radius: number;
  width?: number;
  color?: string;
  rotationDuration?: number;
  rotationDirection?: 'clockwise' | 'counter-clockwise';
  variant?: 'solid' | 'dashed' | 'dotted' | 'gradient';
}

export interface OrbitalSatelliteConfig {
  orbitRadius: number;
  size?: number;
  color?: string;
  orbitDuration?: number;
  orbitPath?: 'circular' | 'elliptical';
  orbitDirection?: 'clockwise' | 'counter-clockwise';
  startAngle?: number;
  trailEnabled?: boolean;
}

export interface OrbitalContainerProps {
  /** Container size */
  containerSize?: { width: number; height: number };
  /** Orbital rings configuration */
  rings?: OrbitalRingConfig[];
  /** Orbital satellites configuration */
  satellites?: OrbitalSatelliteConfig[];
  /** Center configuration */
  centerConfig?: {
    size?: number;
    color?: string;
    interactive?: boolean;
    showMagneticField?: boolean;
  };
  /** Animation enabled */
  animationEnabled?: boolean;
  /** Background effects */
  showBackground?: boolean;
  /** Particle effects */
  showParticles?: boolean;
  /** Interactive mode */
  interactive?: boolean;
  /** Callback when center is pressed */
  onCenterPress?: () => void;
  /** Callback when satellite completes orbit */
  onSatelliteOrbit?: (satelliteIndex: number) => void;
  /** Test ID for testing */
  testID?: string;
}

/**
 * OrbitalContainer - Complete orbital animation system container
 * 
 * Features:
 * - Multiple orbital rings with different configurations
 * - Multiple satellites with independent orbits
 * - Interactive center with magnetic field visualization
 * - Background cosmic effects
 * - Particle system integration
 * - Configurable animations and interactions
 * - Corp Astro design system integration
 */
export const OrbitalContainer: React.FC<OrbitalContainerProps> = ({
  containerSize = Dimensions.get('window'),
  rings = [
    { radius: 50, rotationDuration: 20, rotationDirection: 'clockwise' },
    { radius: 75, rotationDuration: 30, rotationDirection: 'counter-clockwise' },
    { radius: 100, rotationDuration: 40, rotationDirection: 'clockwise' },
  ],
  satellites = [
    { orbitRadius: 50, orbitDuration: 10, startAngle: 0 },
    { orbitRadius: 75, orbitDuration: 15, startAngle: 120 },
    { orbitRadius: 100, orbitDuration: 20, startAngle: 240 },
  ],
  centerConfig = {
    size: 20,
    color: String(SignatureBlues.primary),
    interactive: true,
    showMagneticField: true,
  },
  animationEnabled = true,
  showBackground = true,
  showParticles = true,
  interactive = true,
  onCenterPress,
  onSatelliteOrbit,
  testID = 'orbital-container',
}) => {
  const [isActive, setIsActive] = useState(false);
  const [centerPosition, setCenterPosition] = useState({
    x: containerSize.width / 2,
    y: containerSize.height / 2,
  });
  
  const containerOpacity = useRef(new Animated.Value(0)).current;
  const backgroundAnimation = useRef(new Animated.Value(0)).current;
  const particleAnimations = useRef(
    Array.from({ length: 20 }, () => new Animated.Value(0))
  ).current;

  // Initialize container animation
  useEffect(() => {
    if (animationEnabled) {
      Animated.parallel([
        Animated.timing(containerOpacity, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(backgroundAnimation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      containerOpacity.setValue(1);
      backgroundAnimation.setValue(1);
    }
  }, [animationEnabled]);

  // Particle animations
  useEffect(() => {
    if (showParticles && animationEnabled) {
      const particleLoops = particleAnimations.map((anim, index) =>
        Animated.loop(
          Animated.sequence([
            Animated.timing(anim, {
              toValue: 1,
              duration: 3000 + index * 200,
              useNativeDriver: true,
            }),
            Animated.timing(anim, {
              toValue: 0,
              duration: 3000 + index * 200,
              useNativeDriver: true,
            }),
          ])
        )
      );

      particleLoops.forEach(loop => loop.start());

      return () => {
        particleLoops.forEach(loop => loop.stop());
      };
    }
  }, [showParticles, animationEnabled]);

  // Handle center press
  const handleCenterPress = () => {
    setIsActive(!isActive);
    onCenterPress?.();
  };

  // Handle satellite orbit completion
  const handleSatelliteOrbit = (index: number) => {
    onSatelliteOrbit?.(index);
  };

  // Render background effects
  const renderBackground = () => {
    if (!showBackground) return null;

    return (
      <Animated.View
        style={[
          styles.backgroundLayer,
          {
            opacity: backgroundAnimation,
          },
        ]}
      >
        {/* Cosmic background */}
        <View style={styles.cosmicBackground} />
        
        {/* Radial gradient overlay */}
        <Animated.View
          style={[
            styles.radialOverlay,
            {
              opacity: backgroundAnimation,
            },
          ]}
        />
      </Animated.View>
    );
  };

  // Render particles
  const renderParticles = () => {
    if (!showParticles) return null;

    return particleAnimations.map((anim, index) => (
      <Animated.View
        key={`particle-${index}`}
        style={[
          styles.particle,
          {
            left: Math.random() * containerSize.width,
            top: Math.random() * containerSize.height,
            opacity: anim,
            transform: [
              { scale: anim },
              {
                rotate: anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg'],
                }),
              },
            ],
          },
        ]}
      />
    ));
  };

  // Render orbital rings
  const renderRings = () => {
    return rings.map((ring, index) => (
      <OrbitalRing
        key={`ring-${index}`}
        radius={ring.radius}
        width={ring.width || 2}
        color={ring.color || String(SignatureBlues.primary)}
        rotationDuration={ring.rotationDuration || 20}
        rotationDirection={ring.rotationDirection || 'clockwise'}
        variant={ring.variant || 'solid'}
        center={centerPosition}
        testID={`orbital-ring-${index}`}
      />
    ));
  };

  // Render satellites
  const renderSatellites = () => {
    return satellites.map((satellite, index) => (
      <OrbitalSatellite
        key={`satellite-${index}`}
        orbitRadius={satellite.orbitRadius}
        size={satellite.size || 8}
        color={satellite.color || String(SignatureBlues.light)}
        orbitDuration={satellite.orbitDuration || 10}
        orbitPath={satellite.orbitPath || 'circular'}
        orbitDirection={satellite.orbitDirection || 'clockwise'}
        startAngle={satellite.startAngle || 0}
        trailEnabled={satellite.trailEnabled || false}
        animationEnabled={animationEnabled}
        center={centerPosition}
        onOrbitComplete={() => handleSatelliteOrbit(index)}
        testID={`orbital-satellite-${index}`}
      />
    ));
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          width: containerSize.width,
          height: containerSize.height,
          opacity: containerOpacity,
        },
      ]}
      testID={testID}
    >
      {renderBackground()}
      {renderParticles()}
      {renderRings()}
      {renderSatellites()}
      
      {/* Orbital center */}
      <OrbitalCenter
        size={centerConfig.size}
        color={centerConfig.color ? String(centerConfig.color) : undefined}
        interactive={centerConfig.interactive && interactive}
        showMagneticField={centerConfig.showMagneticField}
        center={centerPosition}
        onPress={handleCenterPress}
        testID="orbital-center"
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  backgroundLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  cosmicBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: deepSpaceColors.void,
    opacity: 0.1,
  },
  radialOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    opacity: 0.3,
  },
  particle: {
    position: 'absolute',
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: SignatureBlues.primary,
    shadowColor: SignatureBlues.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 2,
  },
});

export default OrbitalContainer;
