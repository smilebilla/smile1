import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { SignatureBlues } from '../../foundations/tokens/colors/SignatureBlues';
import { deepSpaceColors } from '../../foundations/tokens/colors/DeepSpaceColors';

export interface Particle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
  life: number;
  maxLife: number;
  type: 'star' | 'dot' | 'sparkle' | 'cosmic';
}

export interface ParticleFieldProps {
  /** Container size */
  containerSize?: { width: number; height: number };
  /** Number of particles */
  particleCount?: number;
  /** Particle size range */
  particleSizeRange?: [number, number];
  /** Particle colors */
  particleColors?: string[];
  /** Particle types */
  particleTypes?: Array<'star' | 'dot' | 'sparkle' | 'cosmic'>;
  /** Movement speed range */
  speedRange?: [number, number];
  /** Particle lifetime range in seconds */
  lifetimeRange?: [number, number];
  /** Spawn rate (particles per second) */
  spawnRate?: number;
  /** Gravity effect */
  gravity?: { x: number; y: number };
  /** Wind effect */
  wind?: { x: number; y: number };
  /** Bounce off edges */
  bounceEdges?: boolean;
  /** Fade out particles */
  fadeOut?: boolean;
  /** Animation enabled */
  animationEnabled?: boolean;
  /** Background effects */
  showBackground?: boolean;
  /** Test ID for testing */
  testID?: string;
}

/**
 * ParticleField - Animated particle system component
 * 
 * Features:
 * - Configurable particle count and properties
 * - Multiple particle types and colors
 * - Physics simulation with gravity and wind
 * - Particle lifecycle management
 * - Edge bouncing and fade effects
 * - Performance optimized rendering
 * - Corp Astro design system integration
 */
export const ParticleField: React.FC<ParticleFieldProps> = ({
  containerSize = Dimensions.get('window'),
  particleCount = 50,
  particleSizeRange = [2, 6],
  particleColors = [
    String(SignatureBlues.primary),
    String(SignatureBlues.light),
    String(SignatureBlues.glow),
  ],
  particleTypes = ['star', 'dot', 'sparkle'],
  speedRange = [0.5, 2],
  lifetimeRange = [5, 15],
  spawnRate = 5,
  gravity = { x: 0, y: 0.1 },
  wind = { x: 0.05, y: 0 },
  bounceEdges = true,
  fadeOut = true,
  animationEnabled = true,
  showBackground = false,
  testID = 'particle-field',
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const animationRef = useRef<number | undefined>(undefined);
  const lastUpdateRef = useRef<number>(0);
  const lastSpawnRef = useRef<number>(0);
  const fieldOpacity = useRef(new Animated.Value(0)).current;

  // Initialize particle field
  useEffect(() => {
    if (animationEnabled) {
      Animated.timing(fieldOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    } else {
      fieldOpacity.setValue(1);
    }
  }, [animationEnabled]);

  // Create initial particles
  useEffect(() => {
    const initialParticles = Array.from({ length: particleCount }, (_, index) =>
      createParticle(index.toString())
    );
    setParticles(initialParticles);
  }, [particleCount]);

  // Create a new particle
  const createParticle = (id: string): Particle => {
    const size = particleSizeRange[0] + Math.random() * (particleSizeRange[1] - particleSizeRange[0]);
    const speed = speedRange[0] + Math.random() * (speedRange[1] - speedRange[0]);
    const angle = Math.random() * Math.PI * 2;
    const lifetime = lifetimeRange[0] + Math.random() * (lifetimeRange[1] - lifetimeRange[0]);
    
    return {
      id,
      x: Math.random() * containerSize.width,
      y: Math.random() * containerSize.height,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size,
      color: particleColors[Math.floor(Math.random() * particleColors.length)],
      opacity: Math.random() * 0.8 + 0.2,
      life: lifetime,
      maxLife: lifetime,
      type: particleTypes[Math.floor(Math.random() * particleTypes.length)],
    };
  };

  // Update particle physics
  const updateParticle = (particle: Particle, deltaTime: number): Particle => {
    // Apply gravity
    particle.vx += gravity.x * deltaTime;
    particle.vy += gravity.y * deltaTime;

    // Apply wind
    particle.vx += wind.x * deltaTime;
    particle.vy += wind.y * deltaTime;

    // Update position
    particle.x += particle.vx * deltaTime * 60; // 60 FPS normalization
    particle.y += particle.vy * deltaTime * 60;

    // Bounce off edges
    if (bounceEdges) {
      if (particle.x <= 0 || particle.x >= containerSize.width) {
        particle.vx *= -0.8; // Dampening
        particle.x = Math.max(0, Math.min(containerSize.width, particle.x));
      }
      if (particle.y <= 0 || particle.y >= containerSize.height) {
        particle.vy *= -0.8; // Dampening
        particle.y = Math.max(0, Math.min(containerSize.height, particle.y));
      }
    } else {
      // Wrap around edges
      if (particle.x < 0) particle.x = containerSize.width;
      if (particle.x > containerSize.width) particle.x = 0;
      if (particle.y < 0) particle.y = containerSize.height;
      if (particle.y > containerSize.height) particle.y = 0;
    }

    // Update lifetime
    particle.life -= deltaTime;

    // Update opacity based on life (fade out)
    if (fadeOut) {
      particle.opacity = Math.max(0, (particle.life / particle.maxLife) * 0.8);
    }

    return particle;
  };

  // Animation loop
  const animate = (currentTime: number) => {
    if (!animationEnabled) return;

    const deltaTime = (currentTime - lastUpdateRef.current) / 1000;
    lastUpdateRef.current = currentTime;

    setParticles(prevParticles => {
      let updatedParticles = prevParticles
        .map(particle => updateParticle({ ...particle }, deltaTime))
        .filter(particle => particle.life > 0);

      // Spawn new particles
      const timeSinceLastSpawn = currentTime - lastSpawnRef.current;
      const spawnInterval = 1000 / spawnRate;
      
      if (timeSinceLastSpawn >= spawnInterval) {
        const newParticle = createParticle(`particle-${currentTime}`);
        updatedParticles.push(newParticle);
        lastSpawnRef.current = currentTime;
      }

      // Limit particle count
      if (updatedParticles.length > particleCount * 2) {
        updatedParticles = updatedParticles.slice(-particleCount * 2);
      }

      return updatedParticles;
    });

    animationRef.current = requestAnimationFrame(animate);
  };

  // Start animation
  useEffect(() => {
    if (animationEnabled) {
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animationEnabled]);

  // Render particle based on type
  const renderParticle = (particle: Particle) => {
    const baseStyle = {
      position: 'absolute' as const,
      left: particle.x - particle.size / 2,
      top: particle.y - particle.size / 2,
      width: particle.size,
      height: particle.size,
      opacity: particle.opacity,
    };

    switch (particle.type) {
      case 'star':
        return (
          <View
            key={particle.id}
            style={[
              baseStyle,
              styles.starParticle,
              {
                backgroundColor: particle.color,
                borderRadius: particle.size / 2,
                shadowColor: particle.color,
                shadowOpacity: 0.8,
                shadowRadius: particle.size,
                shadowOffset: { width: 0, height: 0 },
              },
            ]}
          />
        );

      case 'sparkle':
        return (
          <View
            key={particle.id}
            style={[
              baseStyle,
              styles.sparkleParticle,
              {
                backgroundColor: particle.color,
                transform: [{ rotate: `${particle.life * 45}deg` }],
              },
            ]}
          />
        );

      case 'cosmic':
        return (
          <View
            key={particle.id}
            style={[
              baseStyle,
              styles.cosmicParticle,
              {
                backgroundColor: particle.color,
                borderRadius: particle.size / 4,
                shadowColor: particle.color,
                shadowOpacity: 0.6,
                shadowRadius: particle.size * 2,
                shadowOffset: { width: 0, height: 0 },
              },
            ]}
          />
        );

      default: // dot
        return (
          <View
            key={particle.id}
            style={[
              baseStyle,
              styles.dotParticle,
              {
                backgroundColor: particle.color,
                borderRadius: particle.size / 2,
              },
            ]}
          />
        );
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          width: containerSize.width,
          height: containerSize.height,
          opacity: fieldOpacity,
        },
      ]}
      testID={testID}
    >
      {showBackground && (
        <View style={styles.background} />
      )}
      
      {particles.map(renderParticle)}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: deepSpaceColors.void,
    opacity: 0.1,
  },
  starParticle: {
    elevation: 5,
  },
  dotParticle: {
    elevation: 2,
  },
  sparkleParticle: {
    elevation: 3,
  },
  cosmicParticle: {
    elevation: 4,
  },
});

export default ParticleField;
