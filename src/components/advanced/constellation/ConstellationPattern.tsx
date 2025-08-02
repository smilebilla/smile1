import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { ConstellationStar } from './ConstellationStar';
import { ConstellationLine } from './ConstellationLine';
import { SignatureBlues } from '../../foundations/tokens/colors/SignatureBlues';
import { deepSpaceColors } from '../../foundations/tokens/colors/DeepSpaceColors';

export interface ConstellationPoint {
  id: string;
  x: number;
  y: number;
  isActive?: boolean;
  isConnected?: boolean;
  data?: any;
}

export interface ConstellationConnection {
  id: string;
  startId: string;
  endId: string;
  isActive?: boolean;
  weight?: number;
}

export interface ConstellationPatternProps {
  /** Pattern points */
  points?: ConstellationPoint[];
  /** Pattern connections */
  connections?: ConstellationConnection[];
  /** Pattern type */
  patternType?: 'circle' | 'organic' | 'grid' | 'random' | 'user-profile' | 'data-points';
  /** Container size */
  containerSize?: { width: number; height: number };
  /** Number of stars for generated patterns */
  starCount?: number;
  /** Pattern radius for circle patterns */
  radius?: number;
  /** Connection algorithm */
  connectionAlgorithm?: 'nearest-neighbor' | 'minimum-spanning-tree' | 'delaunay' | 'custom';
  /** Maximum connection distance */
  maxConnectionDistance?: number;
  /** Star size */
  starSize?: number;
  /** Line width */
  lineWidth?: number;
  /** Animation enabled */
  isAnimated?: boolean;
  /** Animation duration */
  animationDuration?: number;
  /** Interactive mode */
  isInteractive?: boolean;
  /** Callback when star is pressed */
  onStarPress?: (point: ConstellationPoint) => void;
  /** Callback when pattern changes */
  onPatternChange?: (points: ConstellationPoint[], connections: ConstellationConnection[]) => void;
  /** Test ID for testing */
  testID?: string;
}

/**
 * ConstellationPattern - Pattern generator for constellation displays
 * 
 * Features:
 * - Multiple pattern types (circle, organic, grid, random)
 * - Dynamic connection algorithms
 * - Interactive star selection
 * - Smooth animations
 * - Data-driven patterns
 * - Corp Astro design system integration
 */
export const ConstellationPattern: React.FC<ConstellationPatternProps> = ({
  points: initialPoints,
  connections: initialConnections,
  patternType = 'circle',
  containerSize = Dimensions.get('window'),
  starCount = 7,
  radius = 100,
  connectionAlgorithm = 'nearest-neighbor',
  maxConnectionDistance = 150,
  starSize = 4,
  lineWidth = 1,
  isAnimated = true,
  animationDuration = 2000,
  isInteractive = true,
  onStarPress,
  onPatternChange,
  testID = 'constellation-pattern',
}) => {
  const [points, setPoints] = useState<ConstellationPoint[]>(initialPoints || []);
  const [connections, setConnections] = useState<ConstellationConnection[]>(initialConnections || []);
  const [activePointId, setActivePointId] = useState<string | null>(null);
  const patternOpacity = useRef(new Animated.Value(0)).current;

  // Generate pattern points based on type
  const generatePoints = (type: string): ConstellationPoint[] => {
    const centerX = containerSize.width / 2;
    const centerY = containerSize.height / 2;
    const newPoints: ConstellationPoint[] = [];

    switch (type) {
      case 'circle':
        for (let i = 0; i < starCount; i++) {
          const angle = (i / starCount) * 2 * Math.PI;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);
          newPoints.push({
            id: `star-${i}`,
            x,
            y,
            isActive: false,
            isConnected: false,
          });
        }
        break;

      case 'organic':
        for (let i = 0; i < starCount; i++) {
          const angle = (i / starCount) * 2 * Math.PI + (Math.random() - 0.5) * 0.5;
          const distance = radius * (0.7 + Math.random() * 0.6);
          const x = centerX + distance * Math.cos(angle);
          const y = centerY + distance * Math.sin(angle);
          newPoints.push({
            id: `star-${i}`,
            x,
            y,
            isActive: false,
            isConnected: false,
          });
        }
        break;

      case 'grid':
        const cols = Math.ceil(Math.sqrt(starCount));
        const rows = Math.ceil(starCount / cols);
        const gridSpacing = Math.min(containerSize.width, containerSize.height) / (Math.max(cols, rows) + 1);
        
        for (let i = 0; i < starCount; i++) {
          const col = i % cols;
          const row = Math.floor(i / cols);
          const x = centerX - (cols - 1) * gridSpacing / 2 + col * gridSpacing;
          const y = centerY - (rows - 1) * gridSpacing / 2 + row * gridSpacing;
          newPoints.push({
            id: `star-${i}`,
            x,
            y,
            isActive: false,
            isConnected: false,
          });
        }
        break;

      case 'random':
        for (let i = 0; i < starCount; i++) {
          const x = 50 + Math.random() * (containerSize.width - 100);
          const y = 50 + Math.random() * (containerSize.height - 100);
          newPoints.push({
            id: `star-${i}`,
            x,
            y,
            isActive: false,
            isConnected: false,
          });
        }
        break;

      case 'user-profile':
        // Generate constellation based on user data
        const profilePattern = generateUserProfilePattern(centerX, centerY, radius);
        newPoints.push(...profilePattern);
        break;

      case 'data-points':
        // Generate constellation based on data points
        const dataPattern = generateDataPointsPattern(centerX, centerY, radius);
        newPoints.push(...dataPattern);
        break;

      default:
        newPoints.push(...generatePoints('circle'));
    }

    return newPoints;
  };

  // Generate user profile constellation pattern
  const generateUserProfilePattern = (centerX: number, centerY: number, radius: number): ConstellationPoint[] => {
    // This would typically use actual user data
    const profilePoints: ConstellationPoint[] = [];
    const traits = ['sun', 'moon', 'rising', 'mercury', 'venus', 'mars', 'jupiter'];
    
    for (let i = 0; i < traits.length; i++) {
      const angle = (i / traits.length) * 2 * Math.PI;
      const distance = radius * (0.8 + Math.random() * 0.4);
      const x = centerX + distance * Math.cos(angle);
      const y = centerY + distance * Math.sin(angle);
      profilePoints.push({
        id: `profile-${traits[i]}`,
        x,
        y,
        isActive: false,
        isConnected: false,
        data: { trait: traits[i], value: Math.random() },
      });
    }
    
    return profilePoints;
  };

  // Generate data points constellation pattern
  const generateDataPointsPattern = (centerX: number, centerY: number, radius: number): ConstellationPoint[] => {
    const dataPoints: ConstellationPoint[] = [];
    
    for (let i = 0; i < starCount; i++) {
      const angle = Math.random() * 2 * Math.PI;
      const distance = radius * Math.random();
      const x = centerX + distance * Math.cos(angle);
      const y = centerY + distance * Math.sin(angle);
      dataPoints.push({
        id: `data-${i}`,
        x,
        y,
        isActive: false,
        isConnected: false,
        data: { value: Math.random(), category: `category-${i % 3}` },
      });
    }
    
    return dataPoints;
  };

  // Generate connections based on algorithm
  const generateConnections = (points: ConstellationPoint[], algorithm: string): ConstellationConnection[] => {
    const newConnections: ConstellationConnection[] = [];

    switch (algorithm) {
      case 'nearest-neighbor':
        points.forEach((point, index) => {
          const distances = points
            .map((otherPoint, otherIndex) => ({
              point: otherPoint,
              index: otherIndex,
              distance: Math.sqrt(
                Math.pow(point.x - otherPoint.x, 2) + Math.pow(point.y - otherPoint.y, 2)
              ),
            }))
            .filter(item => item.index !== index && item.distance <= maxConnectionDistance)
            .sort((a, b) => a.distance - b.distance)
            .slice(0, 2); // Connect to 2 nearest neighbors

          distances.forEach(({ point: otherPoint }) => {
            const connectionId = `${point.id}-${otherPoint.id}`;
            const reverseConnectionId = `${otherPoint.id}-${point.id}`;
            
            if (!newConnections.some(conn => conn.id === connectionId || conn.id === reverseConnectionId)) {
              newConnections.push({
                id: connectionId,
                startId: point.id,
                endId: otherPoint.id,
                isActive: false,
                weight: 1,
              });
            }
          });
        });
        break;

      case 'minimum-spanning-tree':
        // Implement MST algorithm
        newConnections.push(...generateMSTConnections(points));
        break;

      case 'delaunay':
        // Implement Delaunay triangulation
        newConnections.push(...generateDelaunayConnections(points));
        break;

      default:
        newConnections.push(...generateConnections(points, 'nearest-neighbor'));
    }

    return newConnections;
  };

  // Simplified MST implementation
  const generateMSTConnections = (points: ConstellationPoint[]): ConstellationConnection[] => {
    const connections: ConstellationConnection[] = [];
    const visited = new Set<string>();
    
    if (points.length === 0) return connections;
    
    visited.add(points[0].id);
    
    while (visited.size < points.length) {
      let minDistance = Infinity;
      let bestConnection: ConstellationConnection | null = null;
      
      for (const point of points) {
        if (!visited.has(point.id)) continue;
        
        for (const otherPoint of points) {
          if (visited.has(otherPoint.id)) continue;
          
          const distance = Math.sqrt(
            Math.pow(point.x - otherPoint.x, 2) + Math.pow(point.y - otherPoint.y, 2)
          );
          
          if (distance < minDistance) {
            minDistance = distance;
            bestConnection = {
              id: `${point.id}-${otherPoint.id}`,
              startId: point.id,
              endId: otherPoint.id,
              isActive: false,
              weight: distance,
            };
          }
        }
      }
      
      if (bestConnection) {
        connections.push(bestConnection);
        visited.add(bestConnection.endId);
      } else {
        break; // No more connections possible
      }
    }
    
    return connections;
  };

  // Simplified Delaunay implementation
  const generateDelaunayConnections = (points: ConstellationPoint[]): ConstellationConnection[] => {
    // For simplicity, using nearest neighbor with higher connection count
    const connections: ConstellationConnection[] = [];
    
    points.forEach(point => {
      const nearestPoints = points
        .filter(p => p.id !== point.id)
        .map(p => ({
          point: p,
          distance: Math.sqrt(Math.pow(point.x - p.x, 2) + Math.pow(point.y - p.y, 2)),
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 3); // Connect to 3 nearest points
      
      nearestPoints.forEach(({ point: otherPoint }) => {
        const connectionId = `${point.id}-${otherPoint.id}`;
        const reverseConnectionId = `${otherPoint.id}-${point.id}`;
        
        if (!connections.some(conn => conn.id === connectionId || conn.id === reverseConnectionId)) {
          connections.push({
            id: connectionId,
            startId: point.id,
            endId: otherPoint.id,
            isActive: false,
            weight: 1,
          });
        }
      });
    });
    
    return connections;
  };

  // Initialize pattern
  useEffect(() => {
    if (!initialPoints) {
      const newPoints = generatePoints(patternType);
      setPoints(newPoints);
      
      if (!initialConnections) {
        const newConnections = generateConnections(newPoints, connectionAlgorithm);
        setConnections(newConnections);
      }
    }
  }, [patternType, starCount, radius, connectionAlgorithm, maxConnectionDistance]);

  // Animate pattern appearance
  useEffect(() => {
    if (isAnimated) {
      Animated.timing(patternOpacity, {
        toValue: 1,
        duration: animationDuration,
        useNativeDriver: true,
      }).start();
    } else {
      patternOpacity.setValue(1);
    }
  }, [isAnimated, animationDuration]);

  // Handle star press
  const handleStarPress = (point: ConstellationPoint) => {
    setActivePointId(point.id);
    
    // Update point active state
    const updatedPoints = points.map(p => ({
      ...p,
      isActive: p.id === point.id,
    }));
    setPoints(updatedPoints);
    
    // Update connected lines
    const updatedConnections = connections.map(conn => ({
      ...conn,
      isActive: conn.startId === point.id || conn.endId === point.id,
    }));
    setConnections(updatedConnections);
    
    onStarPress?.(point);
    onPatternChange?.(updatedPoints, updatedConnections);
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          width: containerSize.width,
          height: containerSize.height,
          opacity: patternOpacity,
        },
      ]}
      testID={testID}
    >
      {/* Constellation lines */}
      {connections.map(connection => {
        const startPoint = points.find(p => p.id === connection.startId);
        const endPoint = points.find(p => p.id === connection.endId);
        
        if (!startPoint || !endPoint) return null;
        
        return (
          <ConstellationLine
            key={connection.id}
            startPoint={{ x: startPoint.x, y: startPoint.y }}
            endPoint={{ x: endPoint.x, y: endPoint.y }}
            width={lineWidth}
            isActive={connection.isActive}
            isAnimated={isAnimated}
            animationDuration={animationDuration}
            containerSize={containerSize}
            testID={`constellation-line-${connection.id}`}
          />
        );
      })}
      
      {/* Constellation stars */}
      {points.map(point => (
        <ConstellationStar
          key={point.id}
          position={{ x: point.x, y: point.y }}
          size={starSize}
          isActive={point.isActive}
          isConnected={point.isConnected}
          animationDuration={300}
          onPress={isInteractive ? () => handleStarPress(point) : undefined}
          testID={`constellation-star-${point.id}`}
        />
      ))}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'transparent',
  },
});

export default ConstellationPattern;
