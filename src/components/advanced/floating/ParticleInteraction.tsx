import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { PanGestureHandler, TapGestureHandler } from 'react-native-gesture-handler';
import { SignatureBlues } from '../../foundations/tokens/colors/SignatureBlues';

interface Particle {
  id: string;
  x: number;
  y: number;
  size: number;
  velocityX: number;
  velocityY: number;
  animatedValue: Animated.Value;
}

interface ParticleInteractionProps {
  particles: Particle[];
  onParticleUpdate?: (particles: Particle[]) => void;
  hoverRepel?: boolean;
  repelDistance?: number;
  repelStrength?: number;
  clickToAdd?: boolean;
  clickToRemove?: boolean;
  dragEnabled?: boolean;
  children?: React.ReactNode;
  style?: any;
}

export const ParticleInteraction: React.FC<ParticleInteractionProps> = ({
  particles = [],
  onParticleUpdate,
  hoverRepel = true,
  repelDistance = 50,
  repelStrength = 0.5,
  clickToAdd = true,
  clickToRemove = false,
  dragEnabled = true,
  children,
  style,
}) => {
  const interactionRef = useRef<View>(null);
  const currentTouch = useRef<{ x: number; y: number } | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!hoverRepel || !currentTouch.current) return;

    const applyRepelForce = () => {
      const touch = currentTouch.current;
      if (!touch) return;

      const updatedParticles = particles.map((particle) => {
        const dx = particle.x - touch.x;
        const dy = particle.y - touch.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < repelDistance && distance > 0) {
          const force = (1 - distance / repelDistance) * repelStrength;
          const forceX = (dx / distance) * force;
          const forceY = (dy / distance) * force;

          return {
            ...particle,
            velocityX: particle.velocityX + forceX,
            velocityY: particle.velocityY + forceY,
          };
        }

        return particle;
      });

      onParticleUpdate?.(updatedParticles);
    };

    const animate = () => {
      applyRepelForce();
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particles, hoverRepel, repelDistance, repelStrength, onParticleUpdate]);

  const handlePanGestureEvent = (event: any) => {
    if (!dragEnabled) return;

    const { x, y } = event.nativeEvent;
    currentTouch.current = { x, y };
  };

  const handlePanGestureEnd = () => {
    currentTouch.current = null;
  };

  const handleTap = (event: any) => {
    const { x, y } = event.nativeEvent;

    if (clickToAdd) {
      const newParticle: Particle = {
        id: `particle-${Date.now()}`,
        x,
        y,
        size: 4,
        velocityX: (Math.random() - 0.5) * 2,
        velocityY: (Math.random() - 0.5) * 2,
        animatedValue: new Animated.Value(0),
      };

      // Animate new particle appearance
      Animated.spring(newParticle.animatedValue, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }).start();

      const updatedParticles = [...particles, newParticle];
      onParticleUpdate?.(updatedParticles);
    }

    if (clickToRemove) {
      // Find nearest particle to remove
      let nearestParticle: Particle | null = null;
      let minDistance = Infinity;

      particles.forEach((particle) => {
        const dx = particle.x - x;
        const dy = particle.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < minDistance && distance < 30) {
          minDistance = distance;
          nearestParticle = particle;
        }
      });

      if (nearestParticle) {
        // Animate particle removal
        const animatedParticle = nearestParticle as any;
        if (animatedParticle.animatedValue) {
          Animated.timing(animatedParticle.animatedValue, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }).start(() => {
            const updatedParticles = particles.filter(
              (p) => p.id !== nearestParticle!.id
            );
            onParticleUpdate?.(updatedParticles);
          });
        } else {
          // Direct removal if no animation
          const updatedParticles = particles.filter(
            (p) => p.id !== nearestParticle!.id
          );
          onParticleUpdate?.(updatedParticles);
        }
      }
    }
  };

  return (
    <View ref={interactionRef} style={[{ flex: 1 }, style]}>
      <TapGestureHandler onHandlerStateChange={handleTap}>
        <PanGestureHandler
          onGestureEvent={handlePanGestureEvent}
          onHandlerStateChange={handlePanGestureEnd}
        >
          <Animated.View style={{ flex: 1 }}>
            {children}
          </Animated.View>
        </PanGestureHandler>
      </TapGestureHandler>
    </View>
  );
};

export default ParticleInteraction;
