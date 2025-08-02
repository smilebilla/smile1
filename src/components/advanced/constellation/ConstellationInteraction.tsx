import React, { useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { SignatureBlues } from '../../foundations/tokens/colors/SignatureBlues';
import { ConstellationConnection, ConstellationPoint } from './ConstellationPattern';

export interface ConstellationInteractionProps {
  /** Constellation points */
  points: ConstellationPoint[];
  /** Constellation connections */
  connections: ConstellationConnection[];
  /** Interaction type */
  interactionType?: 'hover' | 'click' | 'drag' | 'connect';
  /** Hover behavior */
  onHover?: 'connect-nearest' | 'highlight-star' | 'expand-connections' | 'glow-effect';
  /** Click behavior */
  onClick?: 'expand-connections' | 'toggle-active' | 'add-connection' | 'remove-connection';
  /** Glow intensity multiplier */
  glowIntensity?: number;
  /** Connection distance for hover interactions */
  connectionDistance?: number;
  /** Animation duration */
  animationDuration?: number;
  /** Container size */
  containerSize: { width: number; height: number };
  /** Callback when interaction occurs */
  onInteraction?: (type: string, point: ConstellationPoint, data?: any) => void;
  /** Callback when connections change */
  onConnectionsChange?: (connections: ConstellationConnection[]) => void;
  /** Test ID for testing */
  testID?: string;
}

/**
 * ConstellationInteraction - Interactive behavior controller for constellation patterns
 * 
 * Features:
 * - Hover effects with nearest neighbor connections
 * - Click interactions with expansion effects
 * - Drag gestures for repositioning
 * - Dynamic connection creation
 * - Glow intensity control
 * - Smooth animations
 * - Corp Astro design system integration
 */
export const ConstellationInteraction: React.FC<ConstellationInteractionProps> = ({
  points,
  connections,
  interactionType = 'hover',
  onHover = 'connect-nearest',
  onClick = 'expand-connections',
  glowIntensity = 1.5,
  connectionDistance = 100,
  animationDuration = 300,
  containerSize,
  onInteraction,
  onConnectionsChange,
  testID = 'constellation-interaction',
}) => {
  const interactionOverlay = useRef(new Animated.Value(0)).current;
  const glowAnimation = useRef(new Animated.Value(1)).current;
  const connectionAnimation = useRef(new Animated.Value(0)).current;

  // Handle hover interactions
  const handleHoverStart = (point: ConstellationPoint) => {
    if (interactionType !== 'hover') return;

    switch (onHover) {
      case 'connect-nearest':
        animateNearestConnections(point);
        break;
      case 'highlight-star':
        animateStarHighlight(point);
        break;
      case 'expand-connections':
        animateConnectionExpansion(point);
        break;
      case 'glow-effect':
        animateGlowEffect(point);
        break;
    }

    onInteraction?.('hover-start', point);
  };

  const handleHoverEnd = (point: ConstellationPoint) => {
    if (interactionType !== 'hover') return;

    // Reset animations
    Animated.parallel([
      Animated.timing(interactionOverlay, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: true,
      }),
      Animated.timing(glowAnimation, {
        toValue: 1,
        duration: animationDuration,
        useNativeDriver: true,
      }),
      Animated.timing(connectionAnimation, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: true,
      }),
    ]).start();

    onInteraction?.('hover-end', point);
  };

  // Handle click interactions
  const handleClick = (point: ConstellationPoint) => {
    if (interactionType !== 'click') return;

    switch (onClick) {
      case 'expand-connections':
        expandConnections(point);
        break;
      case 'toggle-active':
        toggleActiveState(point);
        break;
      case 'add-connection':
        addConnection(point);
        break;
      case 'remove-connection':
        removeConnection(point);
        break;
    }

    onInteraction?.('click', point);
  };

  // Handle drag interactions
  const handleDrag = (translationX: number, translationY: number, point: ConstellationPoint) => {
    if (interactionType !== 'drag') return;

    const newX = Math.max(0, Math.min(containerSize.width, point.x + translationX));
    const newY = Math.max(0, Math.min(containerSize.height, point.y + translationY));

    const updatedPoint = {
      ...point,
      x: newX,
      y: newY,
    };

    onInteraction?.('drag', updatedPoint, { translationX, translationY });
  };

  // Animation functions
  const animateNearestConnections = (point: ConstellationPoint) => {
    const nearestPoints = findNearestPoints(point, connectionDistance);
    
    Animated.parallel([
      Animated.timing(connectionAnimation, {
        toValue: 1,
        duration: animationDuration,
        useNativeDriver: true,
      }),
      Animated.timing(glowAnimation, {
        toValue: glowIntensity,
        duration: animationDuration,
        useNativeDriver: true,
      }),
    ]).start();

    // Create temporary connections for visualization
    const tempConnections = nearestPoints.map(nearestPoint => ({
      id: `temp-${point.id}-${nearestPoint.id}`,
      startId: point.id,
      endId: nearestPoint.id,
      isActive: true,
      weight: 1,
    }));

    onConnectionsChange?.([...connections, ...tempConnections]);
  };

  const animateStarHighlight = (point: ConstellationPoint) => {
    Animated.sequence([
      Animated.timing(glowAnimation, {
        toValue: glowIntensity * 2,
        duration: animationDuration / 2,
        useNativeDriver: true,
      }),
      Animated.timing(glowAnimation, {
        toValue: glowIntensity,
        duration: animationDuration / 2,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animateConnectionExpansion = (point: ConstellationPoint) => {
    const connectedPoints = findConnectedPoints(point);
    
    Animated.parallel([
      Animated.timing(connectionAnimation, {
        toValue: 1,
        duration: animationDuration,
        useNativeDriver: true,
      }),
      Animated.timing(interactionOverlay, {
        toValue: 1,
        duration: animationDuration,
        useNativeDriver: true,
      }),
    ]).start();

    // Highlight connected points
    connectedPoints.forEach(connectedPoint => {
      animateStarHighlight(connectedPoint);
    });
  };

  const animateGlowEffect = (point: ConstellationPoint) => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnimation, {
          toValue: glowIntensity * 2,
          duration: animationDuration,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnimation, {
          toValue: glowIntensity,
          duration: animationDuration,
          useNativeDriver: true,
        }),
      ])
    );

    pulseAnimation.start();

    // Stop animation after a few cycles
    setTimeout(() => {
      pulseAnimation.stop();
      Animated.timing(glowAnimation, {
        toValue: 1,
        duration: animationDuration,
        useNativeDriver: true,
      }).start();
    }, animationDuration * 4);
  };

  // Interaction functions
  const expandConnections = (point: ConstellationPoint) => {
    const nearestPoints = findNearestPoints(point, connectionDistance * 1.5);
    const newConnections = nearestPoints.map(nearestPoint => ({
      id: `new-${point.id}-${nearestPoint.id}`,
      startId: point.id,
      endId: nearestPoint.id,
      isActive: true,
      weight: 1,
    }));

    onConnectionsChange?.([...connections, ...newConnections]);
  };

  const toggleActiveState = (point: ConstellationPoint) => {
    const updatedPoint = {
      ...point,
      isActive: !point.isActive,
    };

    onInteraction?.('toggle-active', updatedPoint);
  };

  const addConnection = (point: ConstellationPoint) => {
    // Find the nearest unconnected point
    const unconnectedPoints = findUnconnectedPoints(point);
    if (unconnectedPoints.length > 0) {
      const nearestPoint = unconnectedPoints[0];
      const newConnection: ConstellationConnection = {
        id: `new-${point.id}-${nearestPoint.id}`,
        startId: point.id,
        endId: nearestPoint.id,
        isActive: true,
        weight: 1,
      };

      onConnectionsChange?.([...connections, newConnection]);
    }
  };

  const removeConnection = (point: ConstellationPoint) => {
    const updatedConnections = connections.filter(
      conn => conn.startId !== point.id && conn.endId !== point.id
    );
    onConnectionsChange?.(updatedConnections);
  };

  // Helper functions
  const findNearestPoints = (point: ConstellationPoint, maxDistance: number): ConstellationPoint[] => {
    return points
      .filter(p => p.id !== point.id)
      .map(p => ({
        point: p,
        distance: Math.sqrt(Math.pow(point.x - p.x, 2) + Math.pow(point.y - p.y, 2)),
      }))
      .filter(({ distance }) => distance <= maxDistance)
      .sort((a, b) => a.distance - b.distance)
      .map(({ point: p }) => p);
  };

  const findConnectedPoints = (point: ConstellationPoint): ConstellationPoint[] => {
    const connectedIds = connections
      .filter(conn => conn.startId === point.id || conn.endId === point.id)
      .map(conn => (conn.startId === point.id ? conn.endId : conn.startId));

    return points.filter(p => connectedIds.includes(p.id));
  };

  const findUnconnectedPoints = (point: ConstellationPoint): ConstellationPoint[] => {
    const connectedIds = connections
      .filter(conn => conn.startId === point.id || conn.endId === point.id)
      .map(conn => (conn.startId === point.id ? conn.endId : conn.startId));

    return points
      .filter(p => p.id !== point.id && !connectedIds.includes(p.id))
      .sort((a, b) => {
        const distanceA = Math.sqrt(Math.pow(point.x - a.x, 2) + Math.pow(point.y - a.y, 2));
        const distanceB = Math.sqrt(Math.pow(point.x - b.x, 2) + Math.pow(point.y - b.y, 2));
        return distanceA - distanceB;
      });
  };

  return (
    <View
      style={[
        styles.container,
        {
          width: containerSize.width,
          height: containerSize.height,
        },
      ]}
      testID={testID}
    >
      {/* Interaction overlay */}
      <Animated.View
        style={[
          styles.interactionOverlay,
          {
            opacity: interactionOverlay,
            transform: [
              { scale: connectionAnimation },
            ],
          },
        ]}
      />

      {/* Glow effect overlay */}
      <Animated.View
        style={[
          styles.glowOverlay,
          {
            opacity: Animated.multiply(glowAnimation, 0.3),
            transform: [
              { scale: glowAnimation },
            ],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'transparent',
  },
  interactionOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: SignatureBlues.primary,
    opacity: 0.1,
  },
  glowOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: SignatureBlues.glow,
    opacity: 0.05,
  },
});

export default ConstellationInteraction;
