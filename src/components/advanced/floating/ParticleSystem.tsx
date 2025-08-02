import React, { useEffect, useRef } from 'react';
import { View, Animated, Dimensions } from 'react-native';
import { SignatureBlues } from '../../foundations/tokens/colors/SignatureBlues';

interface Particle {
  id: string;
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  direction: number;
  animatedValue: Animated.Value;
  velocityX: number;
  velocityY: number;
}

interface ParticleSystemProps {
  count?: number;
  particleSize?: number[];
  color?: string;
  speed?: number[];
  direction?: 'random' | 'up' | 'down' | 'left' | 'right';
  bounds?: 'viewport' | 'container';
  collision?: boolean;
  glowRadius?: number;
  opacity?: number;
  children?: React.ReactNode;
  style?: any;
}

export const ParticleSystem: React.FC<ParticleSystemProps> = ({
  count = 50,
  particleSize = [2, 4, 6],
  color = SignatureBlues.primary,
  speed = [0.5, 1, 1.5],
  direction = 'random',
  bounds = 'viewport',
  collision = false,
  glowRadius = 8,
  opacity = 0.6,
  children,
  style,
}) => {
  const particles = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);
  const containerRef = useRef<View>(null);
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  useEffect(() => {
    // Initialize particles
    particles.current = Array(count).fill(0).map((_, index) => {
      const size = particleSize[Math.floor(Math.random() * particleSize.length)];
      const particleSpeed = speed[Math.floor(Math.random() * speed.length)];
      
      let velocityX = 0;
      let velocityY = 0;
      
      switch (direction) {
        case 'up':
          velocityY = -particleSpeed;
          break;
        case 'down':
          velocityY = particleSpeed;
          break;
        case 'left':
          velocityX = -particleSpeed;
          break;
        case 'right':
          velocityX = particleSpeed;
          break;
        default: // random
          const angle = Math.random() * Math.PI * 2;
          velocityX = Math.cos(angle) * particleSpeed;
          velocityY = Math.sin(angle) * particleSpeed;
      }

      return {
        id: `particle-${index}`,
        x: Math.random() * screenWidth,
        y: Math.random() * screenHeight,
        size,
        color: typeof color === 'string' ? color : '#2E86DE',
        speed: particleSpeed,
        direction: direction === 'random' ? Math.random() * Math.PI * 2 : 0,
        animatedValue: new Animated.Value(1),
        velocityX,
        velocityY,
      };
    });

    // Start animation loop
    const animate = () => {
      particles.current.forEach((particle) => {
        // Update position
        particle.x += particle.velocityX;
        particle.y += particle.velocityY;

        // Handle bounds
        if (bounds === 'viewport') {
          if (particle.x < -particle.size) {
            particle.x = screenWidth + particle.size;
          } else if (particle.x > screenWidth + particle.size) {
            particle.x = -particle.size;
          }

          if (particle.y < -particle.size) {
            particle.y = screenHeight + particle.size;
          } else if (particle.y > screenHeight + particle.size) {
            particle.y = -particle.size;
          }
        }

        // Handle collision (simple bounce)
        if (collision) {
          if (particle.x <= 0 || particle.x >= screenWidth) {
            particle.velocityX *= -1;
          }
          if (particle.y <= 0 || particle.y >= screenHeight) {
            particle.velocityY *= -1;
          }
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [count, particleSize, color, speed, direction, bounds, collision, screenWidth, screenHeight]);

  const renderParticle = (particle: Particle) => {
    return (
      <Animated.View
        key={particle.id}
        style={[
          {
            position: 'absolute',
            left: particle.x - particle.size / 2,
            top: particle.y - particle.size / 2,
            width: particle.size,
            height: particle.size,
            borderRadius: particle.size / 2,
            backgroundColor: particle.color,
            opacity: opacity,
            shadowColor: particle.color,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.8,
            shadowRadius: glowRadius,
            elevation: glowRadius,
          },
          {
            transform: [
              {
                scale: particle.animatedValue,
              },
            ],
          },
        ]}
      />
    );
  };

  return (
    <View ref={containerRef} style={[{ position: 'relative', overflow: 'hidden' }, style]}>
      {particles.current.map(renderParticle)}
      {children}
    </View>
  );
};

export default ParticleSystem;
