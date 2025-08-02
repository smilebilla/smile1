import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { SignatureBlues } from '../../foundations/tokens/colors/SignatureBlues';

export interface ParticleEmitterProps {
  /** Emitter position */
  position: { x: number; y: number };
  /** Emitter size */
  size?: number;
  /** Emission rate (particles per second) */
  emissionRate?: number;
  /** Particle initial velocity */
  initialVelocity?: { x: number; y: number };
  /** Velocity randomness */
  velocityRandomness?: number;
  /** Particle colors */
  particleColors?: string[];
  /** Particle size range */
  particleSizeRange?: [number, number];
  /** Particle lifetime range in seconds */
  lifetimeRange?: [number, number];
  /** Emission angle in degrees */
  emissionAngle?: number;
  /** Emission spread in degrees */
  emissionSpread?: number;
  /** Burst mode */
  burstMode?: boolean;
  /** Burst count */
  burstCount?: number;
  /** Burst interval in seconds */
  burstInterval?: number;
  /** Emitter enabled */
  enabled?: boolean;
  /** Show emitter visual */
  showEmitter?: boolean;
  /** Emitter color */
  emitterColor?: string;
  /** Callback when particle is emitted */
  onParticleEmit?: (particle: any) => void;
  /** Test ID for testing */
  testID?: string;
}

/**
 * ParticleEmitter - Particle emission system component
 * 
 * Features:
 * - Configurable emission rate and patterns
 * - Burst and continuous emission modes
 * - Directional particle emission
 * - Velocity and size randomization
 * - Visual emitter indicator
 * - Performance optimized emission
 * - Corp Astro design system integration
 */
export const ParticleEmitter: React.FC<ParticleEmitterProps> = ({
  position,
  size = 10,
  emissionRate = 10,
  initialVelocity = { x: 0, y: -1 },
  velocityRandomness = 0.5,
  particleColors = [String(SignatureBlues.primary), String(SignatureBlues.light)],
  particleSizeRange = [2, 4],
  lifetimeRange = [2, 5],
  emissionAngle = 270, // Up
  emissionSpread = 30,
  burstMode = false,
  burstCount = 20,
  burstInterval = 2,
  enabled = true,
  showEmitter = true,
  emitterColor = String(SignatureBlues.primary),
  onParticleEmit,
  testID = 'particle-emitter',
}) => {
  const [particles, setParticles] = useState<any[]>([]);
  const emissionRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const burstRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const emitterOpacity = useRef(new Animated.Value(0)).current;
  const emitterScale = useRef(new Animated.Value(1)).current;
  const particleCounter = useRef(0);

  // Initialize emitter
  useEffect(() => {
    if (enabled && showEmitter) {
      Animated.parallel([
        Animated.timing(emitterOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.loop(
          Animated.sequence([
            Animated.timing(emitterScale, {
              toValue: 1.2,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(emitterScale, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
            }),
          ])
        ),
      ]).start();
    }
  }, [enabled, showEmitter]);

  // Create particle
  const createParticle = () => {
    const id = `particle-${particleCounter.current++}`;
    const size = particleSizeRange[0] + Math.random() * (particleSizeRange[1] - particleSizeRange[0]);
    const lifetime = lifetimeRange[0] + Math.random() * (lifetimeRange[1] - lifetimeRange[0]);
    
    // Calculate emission direction
    const spreadRadians = (emissionSpread * Math.PI) / 180;
    const angleRadians = (emissionAngle * Math.PI) / 180;
    const randomAngle = angleRadians + (Math.random() - 0.5) * spreadRadians;
    
    // Calculate velocity with randomness
    const velocityMagnitude = Math.sqrt(initialVelocity.x ** 2 + initialVelocity.y ** 2);
    const randomVelocityMagnitude = velocityMagnitude * (1 + (Math.random() - 0.5) * velocityRandomness);
    
    const vx = Math.cos(randomAngle) * randomVelocityMagnitude;
    const vy = Math.sin(randomAngle) * randomVelocityMagnitude;
    
    const particle = {
      id,
      x: position.x,
      y: position.y,
      vx,
      vy,
      size,
      color: particleColors[Math.floor(Math.random() * particleColors.length)],
      opacity: Math.random() * 0.8 + 0.2,
      life: lifetime,
      maxLife: lifetime,
      creationTime: Date.now(),
    };
    
    onParticleEmit?.(particle);
    
    return particle;
  };

  // Emit particles continuously
  const startContinuousEmission = () => {
    if (!enabled || burstMode) return;
    
    const interval = 1000 / emissionRate;
    emissionRef.current = setInterval(() => {
      const newParticle = createParticle();
      setParticles(prev => [...prev, newParticle]);
    }, interval);
  };

  // Emit particles in bursts
  const startBurstEmission = () => {
    if (!enabled || !burstMode) return;
    
    const emitBurst = () => {
      const burstParticles = Array.from({ length: burstCount }, createParticle);
      setParticles(prev => [...prev, ...burstParticles]);
    };
    
    // Initial burst
    emitBurst();
    
    // Subsequent bursts
    burstRef.current = setInterval(emitBurst, burstInterval * 1000);
  };

  // Start emission
  useEffect(() => {
    if (enabled) {
      if (burstMode) {
        startBurstEmission();
      } else {
        startContinuousEmission();
      }
    }
    
    return () => {
      if (emissionRef.current) {
        clearInterval(emissionRef.current);
      }
      if (burstRef.current) {
        clearInterval(burstRef.current);
      }
    };
  }, [enabled, burstMode, emissionRate, burstCount, burstInterval]);

  // Update particles
  useEffect(() => {
    const updateInterval = setInterval(() => {
      setParticles(prev => {
        const now = Date.now();
        return prev
          .map(particle => {
            const age = (now - particle.creationTime) / 1000;
            const remainingLife = particle.maxLife - age;
            
            // Update position
            particle.x += particle.vx * (1/60); // 60 FPS
            particle.y += particle.vy * (1/60);
            
            // Apply gravity
            particle.vy += 0.1;
            
            // Update opacity based on life
            particle.opacity = Math.max(0, (remainingLife / particle.maxLife) * 0.8);
            
            return {
              ...particle,
              life: remainingLife,
            };
          })
          .filter(particle => particle.life > 0);
      });
    }, 1000 / 60); // 60 FPS
    
    return () => clearInterval(updateInterval);
  }, []);

  // Render particles
  const renderParticles = () => {
    return particles.map(particle => (
      <Animated.View
        key={particle.id}
        style={[
          styles.particle,
          {
            left: particle.x - particle.size / 2,
            top: particle.y - particle.size / 2,
            width: particle.size,
            height: particle.size,
            borderRadius: particle.size / 2,
            backgroundColor: particle.color,
            opacity: particle.opacity,
          },
        ]}
      />
    ));
  };

  return (
    <View
      style={[
        styles.container,
        {
          left: position.x - size / 2,
          top: position.y - size / 2,
          width: size,
          height: size,
        },
      ]}
      testID={testID}
    >
      {renderParticles()}
      
      {showEmitter && (
        <Animated.View
          style={[
            styles.emitter,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: emitterColor,
              opacity: emitterOpacity,
              transform: [{ scale: emitterScale }],
            },
          ]}
        />
      )}
      
      {showEmitter && (
        <Animated.View
          style={[
            styles.emitterGlow,
            {
              width: size * 2,
              height: size * 2,
              borderRadius: size,
              backgroundColor: emitterColor,
              opacity: Animated.multiply(emitterOpacity, 0.3),
              left: -size / 2,
              top: -size / 2,
              transform: [{ scale: emitterScale }],
            },
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  particle: {
    position: 'absolute',
    shadowOpacity: 0.8,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 0 },
    elevation: 3,
  },
  emitter: {
    position: 'absolute',
    shadowOpacity: 0.8,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    elevation: 5,
  },
  emitterGlow: {
    position: 'absolute',
    shadowOpacity: 0.6,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },
});

export default ParticleEmitter;
