import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { SignatureBlues } from '../../foundations/tokens/colors/SignatureBlues';
import { deepSpaceColors } from '../../foundations/tokens/colors/DeepSpaceColors';
import type { Particle } from './ParticleField';

export interface ParticleInteractionProps {
  /** Particles to interact with */
  particles: Particle[];
  /** Update particles callback */
  onUpdateParticles: (particles: Particle[]) => void;
  /** Interaction type */
  interactionType?: 'repel' | 'attract' | 'magnetic' | 'gravity' | 'orbit' | 'scatter';
  /** Interaction strength */
  interactionStrength?: number;
  /** Interaction radius */
  interactionRadius?: number;
  /** Mouse/touch interaction enabled */
  touchInteraction?: boolean;
  /** Hover effects enabled */
  hoverEffects?: boolean;
  /** Click effects enabled */
  clickEffects?: boolean;
  /** Drag effects enabled */
  dragEffects?: boolean;
  /** Particle creation on click */
  createOnClick?: boolean;
  /** Particle removal on click */
  removeOnClick?: boolean;
  /** Maximum particles */
  maxParticles?: number;
  /** Interaction decay time */
  decayTime?: number;
  /** Container size */
  containerSize?: { width: number; height: number };
  /** Callback when interaction starts */
  onInteractionStart?: (position: { x: number; y: number }) => void;
  /** Callback when interaction ends */
  onInteractionEnd?: (position: { x: number; y: number }) => void;
  /** Callback when particle is created */
  onParticleCreate?: (particle: Particle) => void;
  /** Callback when particle is removed */
  onParticleRemove?: (particle: Particle) => void;
  /** Test ID for testing */
  testID?: string;
}

interface InteractionForce {
  x: number;
  y: number;
  strength: number;
  radius: number;
  type: 'repel' | 'attract' | 'magnetic' | 'gravity' | 'orbit' | 'scatter';
  decay: number;
}

/**
 * ParticleInteraction - Particle interaction system component
 * 
 * Features:
 * - Multiple interaction types (repel, attract, magnetic, gravity, orbit, scatter)
 * - Touch and gesture-based interactions
 * - Hover effects with particle responses
 * - Click effects for particle creation/removal
 * - Drag interactions for dynamic particle manipulation
 * - Configurable interaction strength and radius
 * - Smooth interaction decay
 * - Real-time particle force calculations
 * 
 * @param particles - Array of particles to interact with
 * @param onUpdateParticles - Callback to update particles
 * @param interactionType - Type of interaction (default: 'repel')
 * @param interactionStrength - Interaction strength (default: 50)
 * @param interactionRadius - Interaction radius (default: 100)
 * @param touchInteraction - Touch interaction enabled (default: true)
 * @param hoverEffects - Hover effects enabled (default: true)
 * @param clickEffects - Click effects enabled (default: true)
 * @param dragEffects - Drag effects enabled (default: true)
 * @param createOnClick - Create particle on click (default: false)
 * @param removeOnClick - Remove particle on click (default: false)
 * @param maxParticles - Maximum particles (default: 100)
 * @param decayTime - Interaction decay time in seconds (default: 1)
 * @param containerSize - Container size (default: screen dimensions)
 * @param onInteractionStart - Callback when interaction starts
 * @param onInteractionEnd - Callback when interaction ends
 * @param onParticleCreate - Callback when particle is created
 * @param onParticleRemove - Callback when particle is removed
 * @param testID - Test ID for testing
 * 
 * @returns ParticleInteraction component
 */
export const ParticleInteraction: React.FC<ParticleInteractionProps> = ({
  particles,
  onUpdateParticles,
  interactionType = 'repel',
  interactionStrength = 50,
  interactionRadius = 100,
  touchInteraction = true,
  hoverEffects = true,
  clickEffects = true,
  dragEffects = true,
  createOnClick = false,
  removeOnClick = false,
  maxParticles = 100,
  decayTime = 1,
  containerSize = { width: 400, height: 400 },
  onInteractionStart,
  onInteractionEnd,
  onParticleCreate,
  onParticleRemove,
  testID
}) => {
  const [interactionForces, setInteractionForces] = useState<InteractionForce[]>([]);
  const [isInteracting, setIsInteracting] = useState(false);
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
  const animationRef = useRef<number | null>(null);
  const forceIdRef = useRef(0);

  // Calculate distance between two points
  const calculateDistance = (p1: { x: number; y: number }, p2: { x: number; y: number }): number => {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Calculate force on particle
  const calculateForce = (particle: Particle, force: InteractionForce): { x: number; y: number } => {
    const distance = calculateDistance(particle, force);
    
    if (distance > force.radius) {
      return { x: 0, y: 0 };
    }

    const normalizedDistance = distance / force.radius;
    const strengthMultiplier = (1 - normalizedDistance) * force.strength * force.decay;

    const dx = particle.x - force.x;
    const dy = particle.y - force.y;
    const magnitude = Math.sqrt(dx * dx + dy * dy);

    if (magnitude === 0) {
      return { x: 0, y: 0 };
    }

    const normalizedDx = dx / magnitude;
    const normalizedDy = dy / magnitude;

    switch (force.type) {
      case 'repel':
        return {
          x: normalizedDx * strengthMultiplier,
          y: normalizedDy * strengthMultiplier
        };

      case 'attract':
        return {
          x: -normalizedDx * strengthMultiplier,
          y: -normalizedDy * strengthMultiplier
        };

      case 'magnetic':
        const magneticStrength = strengthMultiplier * (1 - normalizedDistance);
        return {
          x: -normalizedDx * magneticStrength,
          y: -normalizedDy * magneticStrength
        };

      case 'gravity':
        const gravityStrength = strengthMultiplier / (distance * distance + 1);
        return {
          x: -normalizedDx * gravityStrength,
          y: -normalizedDy * gravityStrength
        };

      case 'orbit':
        const orbitStrength = strengthMultiplier * normalizedDistance;
        return {
          x: -normalizedDy * orbitStrength,
          y: normalizedDx * orbitStrength
        };

      case 'scatter':
        const scatterAngle = Math.random() * Math.PI * 2;
        const scatterStrength = strengthMultiplier * (Math.random() * 0.5 + 0.5);
        return {
          x: Math.cos(scatterAngle) * scatterStrength,
          y: Math.sin(scatterAngle) * scatterStrength
        };

      default:
        return { x: 0, y: 0 };
    }
  };

  // Apply forces to particles
  const applyForces = () => {
    const updatedParticles = particles.map(particle => {
      let totalForceX = 0;
      let totalForceY = 0;

      interactionForces.forEach(force => {
        const { x, y } = calculateForce(particle, force);
        totalForceX += x;
        totalForceY += y;
      });

      // Apply forces to velocity
      const newVx = particle.vx + totalForceX * 0.01;
      const newVy = particle.vy + totalForceY * 0.01;

      // Apply velocity damping
      const dampingFactor = 0.99;
      const dampedVx = newVx * dampingFactor;
      const dampedVy = newVy * dampingFactor;

      // Update position
      const newX = particle.x + dampedVx;
      const newY = particle.y + dampedVy;

      // Boundary checking
      const constrainedX = Math.max(0, Math.min(containerSize.width, newX));
      const constrainedY = Math.max(0, Math.min(containerSize.height, newY));

      return {
        ...particle,
        x: constrainedX,
        y: constrainedY,
        vx: dampedVx,
        vy: dampedVy,
      };
    });

    onUpdateParticles(updatedParticles);
  };

  // Update interaction forces decay
  const updateForces = () => {
    setInteractionForces(prevForces => {
      const updatedForces = prevForces.map(force => ({
        ...force,
        decay: Math.max(0, force.decay - (1 / (decayTime * 60))) // Assuming 60fps
      })).filter(force => force.decay > 0);

      return updatedForces;
    });
  };

  // Animation loop
  const animate = () => {
    applyForces();
    updateForces();
    animationRef.current = requestAnimationFrame(animate);
  };

  // Start animation
  useEffect(() => {
    if (interactionForces.length > 0) {
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [interactionForces]);

  // Handle touch start
  const handleTouchStart = (x: number, y: number) => {
    if (!touchInteraction) return;

    setIsInteracting(true);
    setCurrentPosition({ x, y });
    
    const newForce: InteractionForce = {
      x,
      y,
      strength: interactionStrength,
      radius: interactionRadius,
      type: interactionType,
      decay: 1
    };

    setInteractionForces(prev => [...prev, newForce]);
    onInteractionStart?.({ x, y });
  };

  // Handle touch move
  const handleTouchMove = (x: number, y: number) => {
    if (!touchInteraction || !isInteracting) return;

    setCurrentPosition({ x, y });

    if (dragEffects) {
      const newForce: InteractionForce = {
        x,
        y,
        strength: interactionStrength,
        radius: interactionRadius,
        type: interactionType,
        decay: 1
      };

      setInteractionForces(prev => [...prev, newForce]);
    }
  };

  // Handle touch end
  const handleTouchEnd = (x: number, y: number) => {
    if (!touchInteraction) return;

    setIsInteracting(false);
    onInteractionEnd?.({ x, y });

    if (clickEffects) {
      if (createOnClick && particles.length < maxParticles) {
        const newParticle: Particle = {
          id: `interaction-${Date.now()}-${Math.random()}`,
          x,
          y,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          size: 4,
          color: SignatureBlues.primary as string,
          opacity: 0.8,
          life: 1,
          maxLife: 1,
          type: 'cosmic'
        };

        onUpdateParticles([...particles, newParticle]);
        onParticleCreate?.(newParticle);
      }

      if (removeOnClick) {
        // Find closest particle and remove it
        let closestParticle: Particle | null = null;
        let closestDistance = Infinity;

        particles.forEach(particle => {
          const distance = calculateDistance(particle, { x, y });
          if (distance < closestDistance && distance < 30) {
            closestDistance = distance;
            closestParticle = particle;
          }
        });

        if (closestParticle) {
          const updatedParticles = particles.filter(p => p.id !== closestParticle!.id);
          onUpdateParticles(updatedParticles);
          onParticleRemove?.(closestParticle);
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.interactionArea,
          { width: containerSize.width, height: containerSize.height }
        ]}
        testID={testID}
        onTouchStart={(event) => {
          const { pageX, pageY } = event.nativeEvent;
          handleTouchStart(pageX, pageY);
        }}
        onTouchMove={(event) => {
          const { pageX, pageY } = event.nativeEvent;
          handleTouchMove(pageX, pageY);
        }}
        onTouchEnd={(event) => {
          const { pageX, pageY } = event.nativeEvent;
          handleTouchEnd(pageX, pageY);
        }}
      >
        {/* Interaction visualizer */}
        {isInteracting && hoverEffects && (
          <View
            style={[
              styles.interactionIndicator,
              {
                left: currentPosition.x - interactionRadius,
                top: currentPosition.y - interactionRadius,
                width: interactionRadius * 2,
                height: interactionRadius * 2,
                borderRadius: interactionRadius,
                backgroundColor: `${SignatureBlues.primary as string}20`,
                borderColor: `${SignatureBlues.primary as string}40`,
              }
            ]}
          />
        )}

        {/* Force visualizers */}
        {interactionForces.map((force, index) => (
          <View
            key={index}
            style={[
              styles.forceIndicator,
              {
                left: force.x - force.radius,
                top: force.y - force.radius,
                width: force.radius * 2,
                height: force.radius * 2,
                borderRadius: force.radius,
                backgroundColor: `${SignatureBlues.glow as string}${Math.floor(force.decay * 30).toString(16).padStart(2, '0')}`,
                borderColor: `${SignatureBlues.glow as string}${Math.floor(force.decay * 60).toString(16).padStart(2, '0')}`,
              }
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  interactionArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
  },
  interactionIndicator: {
    position: 'absolute',
    borderWidth: 2,
    borderStyle: 'dashed',
    opacity: 0.6,
  },
  forceIndicator: {
    position: 'absolute',
    borderWidth: 1,
    borderStyle: 'solid',
    opacity: 0.4,
  },
});

export default ParticleInteraction;
