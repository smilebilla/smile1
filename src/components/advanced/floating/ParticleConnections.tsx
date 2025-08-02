import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import Svg, { Line } from 'react-native-svg';
import { SignatureBlues } from '../../foundations/tokens/colors/SignatureBlues';

interface Particle {
  id: string;
  x: number;
  y: number;
  size: number;
}

interface Connection {
  id: string;
  from: Particle;
  to: Particle;
  distance: number;
  opacity: number;
}

interface ParticleConnectionsProps {
  particles: Particle[];
  enabled?: boolean;
  maxDistance?: number;
  color?: string;
  width?: number;
  opacity?: number;
  animated?: boolean;
  style?: any;
}

export const ParticleConnections: React.FC<ParticleConnectionsProps> = ({
  particles = [],
  enabled = true,
  maxDistance = 100,
  color = SignatureBlues.primary,
  width = 1,
  opacity = 0.2,
  animated = true,
  style,
}) => {
  const connections = useRef<Connection[]>([]);
  const animationRef = useRef<number | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (enabled) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [enabled, fadeAnim]);

  useEffect(() => {
    if (!enabled || particles.length < 2) return;

    const updateConnections = () => {
      const newConnections: Connection[] = [];

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const particleA = particles[i];
          const particleB = particles[j];

          const dx = particleA.x - particleB.x;
          const dy = particleA.y - particleB.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance <= maxDistance) {
            const connectionOpacity = (1 - distance / maxDistance) * opacity;
            
            newConnections.push({
              id: `connection-${particleA.id}-${particleB.id}`,
              from: particleA,
              to: particleB,
              distance,
              opacity: connectionOpacity,
            });
          }
        }
      }

      connections.current = newConnections;
    };

    if (animated) {
      const animate = () => {
        updateConnections();
        animationRef.current = requestAnimationFrame(animate);
      };
      animate();
    } else {
      updateConnections();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particles, enabled, maxDistance, opacity, animated]);

  const renderConnection = (connection: Connection) => {
    return (
      <Line
        key={connection.id}
        x1={connection.from.x}
        y1={connection.from.y}
        x2={connection.to.x}
        y2={connection.to.y}
        stroke={color}
        strokeWidth={width}
        strokeOpacity={connection.opacity}
        strokeLinecap="round"
      />
    );
  };

  if (!enabled || particles.length < 2) {
    return null;
  }

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: fadeAnim,
        },
        style,
      ]}
    >
      <Svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        width="100%"
        height="100%"
      >
        {connections.current.map(renderConnection)}
      </Svg>
    </Animated.View>
  );
};

export default ParticleConnections;
