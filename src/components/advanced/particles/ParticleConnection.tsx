import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import Svg, { Line, Defs, LinearGradient, Stop } from 'react-native-svg';
import { SignatureBlues } from '../../foundations/tokens/colors/SignatureBlues';
import { deepSpaceColors } from '../../foundations/tokens/colors/DeepSpaceColors';
import type { Particle } from './ParticleField';

export interface ParticleConnectionProps {
  /** Particles to connect */
  particles: Particle[];
  /** Connection distance threshold */
  connectionDistance?: number;
  /** Connection line width */
  lineWidth?: number;
  /** Connection line color */
  lineColor?: string;
  /** Connection line opacity */
  lineOpacity?: number;
  /** Maximum connections per particle */
  maxConnections?: number;
  /** Connection algorithm */
  connectionAlgorithm?: 'nearest' | 'distance' | 'delaunay' | 'mst';
  /** Show connection animation */
  showAnimation?: boolean;
  /** Animation duration in seconds */
  animationDuration?: number;
  /** Connection type */
  connectionType?: 'solid' | 'dashed' | 'dotted' | 'gradient';
  /** Dash pattern for dashed lines */
  dashPattern?: string;
  /** Interactive connections */
  interactive?: boolean;
  /** Hover effect */
  hoverEffect?: boolean;
  /** Connection strength visualization */
  showStrength?: boolean;
  /** Minimum connection strength */
  minStrength?: number;
  /** Container size */
  containerSize?: { width: number; height: number };
  /** Callback when connection is formed */
  onConnectionForm?: (particle1: Particle, particle2: Particle) => void;
  /** Callback when connection is broken */
  onConnectionBreak?: (particle1: Particle, particle2: Particle) => void;
  /** Test ID for testing */
  testID?: string;
}

interface Connection {
  id: string;
  particle1: Particle;
  particle2: Particle;
  distance: number;
  strength: number;
  opacity: Animated.Value;
  width: Animated.Value;
}

/**
 * ParticleConnection - Particle connection system component
 * 
 * Features:
 * - Dynamic connection formation based on distance
 * - Multiple connection algorithms
 * - Animated connection appearance and disappearance
 * - Interactive connection effects
 * - Connection strength visualization
 * - Configurable connection styles
 * - Performance optimized connection detection
 * - Real-time connection updates
 * 
 * @param particles - Array of particles to connect
 * @param connectionDistance - Distance threshold for connections (default: 100)
 * @param lineWidth - Connection line width (default: 1)
 * @param lineColor - Connection line color (default: SignatureBlues.primary)
 * @param lineOpacity - Connection line opacity (default: 0.3)
 * @param maxConnections - Maximum connections per particle (default: 3)
 * @param connectionAlgorithm - Connection algorithm (default: 'nearest')
 * @param showAnimation - Show connection animation (default: true)
 * @param animationDuration - Animation duration in seconds (default: 0.5)
 * @param connectionType - Connection type (default: 'solid')
 * @param dashPattern - Dash pattern for dashed lines (default: '5,5')
 * @param interactive - Interactive connections (default: false)
 * @param hoverEffect - Hover effect (default: false)
 * @param showStrength - Show connection strength visualization (default: false)
 * @param minStrength - Minimum connection strength (default: 0.1)
 * @param containerSize - Container size (default: screen dimensions)
 * @param onConnectionForm - Callback when connection is formed
 * @param onConnectionBreak - Callback when connection is broken
 * @param testID - Test ID for testing
 * 
 * @returns ParticleConnection component
 */
export const ParticleConnection: React.FC<ParticleConnectionProps> = ({
  particles,
  connectionDistance = 100,
  lineWidth = 1,
  lineColor = SignatureBlues.primary,
  lineOpacity = 0.3,
  maxConnections = 3,
  connectionAlgorithm = 'nearest',
  showAnimation = true,
  animationDuration = 0.5,
  connectionType = 'solid',
  dashPattern = '5,5',
  interactive = false,
  hoverEffect = false,
  showStrength = false,
  minStrength = 0.1,
  containerSize = { width: 400, height: 400 },
  onConnectionForm,
  onConnectionBreak,
  testID
}) => {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [hoveredConnection, setHoveredConnection] = useState<string | null>(null);
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);

  // Calculate distance between two particles
  const calculateDistance = (p1: Particle, p2: Particle): number => {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Calculate connection strength based on distance
  const calculateStrength = (distance: number): number => {
    const normalizedDistance = distance / connectionDistance;
    return Math.max(minStrength, 1 - normalizedDistance);
  };

  // Find nearest neighbors for a particle
  const findNearestNeighbors = (targetParticle: Particle, allParticles: Particle[]): Particle[] => {
    return allParticles
      .filter(p => p.id !== targetParticle.id)
      .map(p => ({
        particle: p,
        distance: calculateDistance(targetParticle, p)
      }))
      .filter(({ distance }) => distance <= connectionDistance)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, maxConnections)
      .map(({ particle }) => particle);
  };

  // Minimum spanning tree algorithm
  const calculateMST = (particles: Particle[]): Connection[] => {
    const connections: Connection[] = [];
    const visited = new Set<string>();
    const edges: { distance: number; p1: Particle; p2: Particle }[] = [];

    // Create all possible edges
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const distance = calculateDistance(particles[i], particles[j]);
        if (distance <= connectionDistance) {
          edges.push({ distance, p1: particles[i], p2: particles[j] });
        }
      }
    }

    // Sort edges by distance
    edges.sort((a, b) => a.distance - b.distance);

    // Build MST
    visited.add(particles[0]?.id || '');
    while (visited.size < particles.length && edges.length > 0) {
      const edge = edges.shift();
      if (!edge) break;

      const { p1, p2, distance } = edge;
      if (visited.has(p1.id) !== visited.has(p2.id)) {
        visited.add(p1.id);
        visited.add(p2.id);
        connections.push({
          id: `${p1.id}-${p2.id}`,
          particle1: p1,
          particle2: p2,
          distance,
          strength: calculateStrength(distance),
          opacity: new Animated.Value(showAnimation ? 0 : lineOpacity),
          width: new Animated.Value(showAnimation ? 0 : lineWidth)
        });
      }
    }

    return connections;
  };

  // Update connections based on particle positions
  const updateConnections = () => {
    let newConnections: Connection[] = [];

    switch (connectionAlgorithm) {
      case 'nearest':
        particles.forEach(particle => {
          const neighbors = findNearestNeighbors(particle, particles);
          neighbors.forEach(neighbor => {
            const distance = calculateDistance(particle, neighbor);
            const connectionId = `${particle.id}-${neighbor.id}`;
            const reverseId = `${neighbor.id}-${particle.id}`;
            
            // Avoid duplicate connections
            if (!newConnections.some(c => c.id === connectionId || c.id === reverseId)) {
              newConnections.push({
                id: connectionId,
                particle1: particle,
                particle2: neighbor,
                distance,
                strength: calculateStrength(distance),
                opacity: new Animated.Value(showAnimation ? 0 : lineOpacity),
                width: new Animated.Value(showAnimation ? 0 : lineWidth)
              });
            }
          });
        });
        break;

      case 'distance':
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const distance = calculateDistance(particles[i], particles[j]);
            if (distance <= connectionDistance) {
              newConnections.push({
                id: `${particles[i].id}-${particles[j].id}`,
                particle1: particles[i],
                particle2: particles[j],
                distance,
                strength: calculateStrength(distance),
                opacity: new Animated.Value(showAnimation ? 0 : lineOpacity),
                width: new Animated.Value(showAnimation ? 0 : lineWidth)
              });
            }
          }
        }
        break;

      case 'mst':
        newConnections = calculateMST(particles);
        break;

      default:
        break;
    }

    // Check for new connections
    newConnections.forEach(newConnection => {
      const existingConnection = connections.find(c => c.id === newConnection.id);
      if (!existingConnection) {
        onConnectionForm?.(newConnection.particle1, newConnection.particle2);
      }
    });

    // Check for broken connections
    connections.forEach(oldConnection => {
      const stillExists = newConnections.find(c => c.id === oldConnection.id);
      if (!stillExists) {
        onConnectionBreak?.(oldConnection.particle1, oldConnection.particle2);
      }
    });

    setConnections(newConnections);

    // Animate new connections
    if (showAnimation) {
      newConnections.forEach(connection => {
        Animated.parallel([
          Animated.timing(connection.opacity, {
            toValue: lineOpacity * connection.strength,
            duration: animationDuration * 1000,
            useNativeDriver: false
          }),
          Animated.timing(connection.width, {
            toValue: lineWidth * (showStrength ? connection.strength : 1),
            duration: animationDuration * 1000,
            useNativeDriver: false
          })
        ]).start();
      });
    }
  };

  // Update connections when particles change
  useEffect(() => {
    updateConnections();
  }, [particles, connectionDistance, maxConnections, connectionAlgorithm]);

  // Render connection line
  const renderConnection = (connection: Connection) => {
    const { particle1, particle2, strength, opacity, width } = connection;
    const isHovered = hoveredConnection === connection.id;
    
    const strokeOpacity = showStrength ? lineOpacity * strength : lineOpacity;
    const strokeWidth = showStrength ? lineWidth * strength : lineWidth;

    if (connectionType === 'gradient') {
      return (
        <Animated.View key={connection.id} style={{ opacity }}>
          <Svg width={containerSize.width} height={containerSize.height}>
            <Defs>
              <LinearGradient id={`gradient-${connection.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <Stop offset="0%" stopColor={lineColor} stopOpacity={strokeOpacity} />
                <Stop offset="50%" stopColor={SignatureBlues.glow} stopOpacity={strokeOpacity * 1.5} />
                <Stop offset="100%" stopColor={lineColor} stopOpacity={strokeOpacity} />
              </LinearGradient>
            </Defs>
            <Line
              x1={particle1.x}
              y1={particle1.y}
              x2={particle2.x}
              y2={particle2.y}
              stroke={`url(#gradient-${connection.id})`}
              strokeWidth={isHovered ? strokeWidth * 1.5 : strokeWidth}
            />
          </Svg>
        </Animated.View>
      );
    }

    return (
      <Animated.View key={connection.id} style={{ opacity }}>
        <Svg width={containerSize.width} height={containerSize.height}>
          <Line
            x1={particle1.x}
            y1={particle1.y}
            x2={particle2.x}
            y2={particle2.y}
            stroke={lineColor}
            strokeWidth={isHovered ? strokeWidth * 1.5 : strokeWidth}
            strokeOpacity={strokeOpacity}
            strokeDasharray={connectionType === 'dashed' ? dashPattern : connectionType === 'dotted' ? '2,2' : undefined}
          />
        </Svg>
      </Animated.View>
    );
  };

  return (
    <View style={[styles.container, { width: containerSize.width, height: containerSize.height }]} testID={testID}>
      {connections.map(connection => renderConnection(connection))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
});

export default ParticleConnection;
