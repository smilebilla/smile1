/**
 * Corp Astro UI Library - Constellation Formation Logic
 * 
 * Advanced constellation pattern system for creating dynamic star formations.
 * Provides geometric algorithms, connection logic, and interactive patterns
 * that match the Corp Astro cosmic theme. Supports user profile patterns,
 * data point visualizations, and organic constellation formations.
 * 
 * @module ConstellationLogic
 * @version 1.0.0
 * @since 2024
 * 
 * UI Documentation Reference:
 * - Visual Language: Constellation reveals, star patterns (lines 425-427)
 * - Design System: Constellation system specifications (lines 2780-2827)
 * - Connection patterns: Nearest-neighbor, organic shapes (lines 2810-2816)
 * - Interactive behavior: Hover connect, click expand (lines 2819-2825)
 */

import { Animated } from 'react-native';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Point in 2D space
 */
export interface Point {
  x: number;
  y: number;
}

/**
 * Star configuration
 */
export interface Star {
  /** Unique identifier */
  id: string;
  /** Position in constellation */
  position: Point;
  /** Star size (4-6px) */
  size: number;
  /** Star opacity (0-1) */
  opacity: number;
  /** Star brightness (0-1) */
  brightness: number;
  /** Whether star is active/selected */
  active: boolean;
  /** Custom star data */
  data?: any;
}

/**
 * Connection between two stars
 */
export interface Connection {
  /** Unique identifier */
  id: string;
  /** Source star ID */
  fromStarId: string;
  /** Target star ID */
  toStarId: string;
  /** Connection strength (0-1) */
  strength: number;
  /** Connection width (1-2px) */
  width: number;
  /** Connection opacity (0-1) */
  opacity: number;
  /** Whether connection is active */
  active: boolean;
  /** Animation progress (0-1) */
  drawProgress: number;
}

/**
 * Constellation pattern configuration
 */
export interface ConstellationPattern {
  /** Pattern identifier */
  id: string;
  /** Pattern name */
  name: string;
  /** Pattern type */
  type: 'userProfile' | 'dataPoints' | 'custom';
  /** Number of stars (or 'dynamic') */
  starCount: number | 'dynamic';
  /** Pattern shape */
  shape: 'circle' | 'organic' | 'grid' | 'spiral' | 'custom';
  /** Pattern radius/size */
  radius: number;
  /** Connection algorithm */
  connectionType: 'nearest-neighbor' | 'delaunay' | 'mst' | 'complete' | 'custom';
  /** Maximum connection distance */
  maxConnectionDistance?: number;
  /** Minimum connection distance */
  minConnectionDistance?: number;
  /** Maximum connections per star */
  maxConnectionsPerStar?: number;
}

/**
 * Constellation state
 */
export interface ConstellationState {
  /** All stars in constellation */
  stars: Star[];
  /** All connections in constellation */
  connections: Connection[];
  /** Constellation bounds */
  bounds: {
    width: number;
    height: number;
    centerX: number;
    centerY: number;
  };
  /** Animation state */
  animationState: 'idle' | 'forming' | 'revealing' | 'active' | 'transforming';
  /** Interactive state */
  interactionState: {
    hoveredStarId?: string;
    selectedStarId?: string;
    nearestConnections: string[];
    expandedConnections: string[];
  };
}

/**
 * Constellation configuration
 */
export interface ConstellationConfig {
  /** Container dimensions */
  bounds: {
    width: number;
    height: number;
  };
  /** Star configuration */
  stars: {
    /** Default star size */
    size: number;
    /** Star color */
    color: string;
    /** Star glow effect */
    glow: string;
    /** Hover state configuration */
    hover: {
      size: number;
      glow: string;
    };
  };
  /** Connection configuration */
  connections: {
    /** Default connection width */
    width: number;
    /** Connection color */
    color: string;
    /** Connection dash pattern */
    dashArray: string;
    /** Connection animation */
    animation: string;
    /** Active connection configuration */
    active: {
      width: number;
      color: string;
      dashArray: string;
    };
  };
  /** Interaction configuration */
  interaction: {
    /** Hover behavior */
    onHover: 'connect-nearest' | 'highlight-star' | 'expand-connections';
    /** Click behavior */
    onClick: 'expand-connections' | 'select-star' | 'toggle-connections';
    /** Glow intensity multiplier */
    glowIntensity: number;
  };
}

// ============================================================================
// GEOMETRY UTILITIES
// ============================================================================

/**
 * Calculate distance between two points
 */
const calculateDistance = (p1: Point, p2: Point): number => {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
};

/**
 * Calculate angle between two points
 */
const calculateAngle = (p1: Point, p2: Point): number => {
  return Math.atan2(p2.y - p1.y, p2.x - p1.x);
};

/**
 * Generate points in a circle
 */
const generateCirclePoints = (
  center: Point,
  radius: number,
  count: number,
  startAngle: number = 0
): Point[] => {
  const points: Point[] = [];
  const angleStep = (2 * Math.PI) / count;
  
  for (let i = 0; i < count; i++) {
    const angle = startAngle + i * angleStep;
    points.push({
      x: center.x + radius * Math.cos(angle),
      y: center.y + radius * Math.sin(angle),
    });
  }
  
  return points;
};

/**
 * Generate points in a spiral
 */
const generateSpiralPoints = (
  center: Point,
  maxRadius: number,
  count: number,
  turns: number = 2
): Point[] => {
  const points: Point[] = [];
  const angleStep = (turns * 2 * Math.PI) / count;
  
  for (let i = 0; i < count; i++) {
    const angle = i * angleStep;
    const radius = (maxRadius * i) / count;
    points.push({
      x: center.x + radius * Math.cos(angle),
      y: center.y + radius * Math.sin(angle),
    });
  }
  
  return points;
};

/**
 * Generate organic/random points within bounds
 */
const generateOrganicPoints = (
  bounds: { width: number; height: number },
  count: number,
  minDistance: number = 20
): Point[] => {
  const points: Point[] = [];
  const maxAttempts = count * 10;
  
  for (let attempts = 0; attempts < maxAttempts && points.length < count; attempts++) {
    const candidate: Point = {
      x: Math.random() * bounds.width,
      y: Math.random() * bounds.height,
    };
    
    // Check minimum distance to existing points
    const tooClose = points.some(
      point => calculateDistance(point, candidate) < minDistance
    );
    
    if (!tooClose) {
      points.push(candidate);
    }
  }
  
  return points;
};

/**
 * Generate grid points
 */
const generateGridPoints = (
  bounds: { width: number; height: number },
  rows: number,
  cols: number,
  padding: number = 20
): Point[] => {
  const points: Point[] = [];
  const stepX = (bounds.width - 2 * padding) / (cols - 1);
  const stepY = (bounds.height - 2 * padding) / (rows - 1);
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      points.push({
        x: padding + col * stepX,
        y: padding + row * stepY,
      });
    }
  }
  
  return points;
};

// ============================================================================
// CONNECTION ALGORITHMS
// ============================================================================

/**
 * Find nearest neighbors for each star
 */
const findNearestNeighbors = (
  stars: Star[],
  maxDistance: number,
  maxConnections: number = 3
): Connection[] => {
  const connections: Connection[] = [];
  
  stars.forEach(star => {
    // Calculate distances to all other stars
    const distances = stars
      .filter(other => other.id !== star.id)
      .map(other => ({
        star: other,
        distance: calculateDistance(star.position, other.position),
      }))
      .filter(item => item.distance <= maxDistance)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, maxConnections);
    
    // Create connections to nearest neighbors
    distances.forEach(({ star: other, distance }) => {
      // Avoid duplicate connections
      const existingConnection = connections.find(
        conn =>
          (conn.fromStarId === star.id && conn.toStarId === other.id) ||
          (conn.fromStarId === other.id && conn.toStarId === star.id)
      );
      
      if (!existingConnection) {
        connections.push({
          id: `${star.id}-${other.id}`,
          fromStarId: star.id,
          toStarId: other.id,
          strength: 1 - distance / maxDistance,
          width: 1,
          opacity: 0.2,
          active: false,
          drawProgress: 0,
        });
      }
    });
  });
  
  return connections;
};

/**
 * Create minimum spanning tree connections
 */
const createMSTConnections = (stars: Star[]): Connection[] => {
  if (stars.length < 2) return [];
  
  const connections: Connection[] = [];
  const edges: Array<{
    from: Star;
    to: Star;
    distance: number;
  }> = [];
  
  // Generate all possible edges
  for (let i = 0; i < stars.length; i++) {
    for (let j = i + 1; j < stars.length; j++) {
      edges.push({
        from: stars[i],
        to: stars[j],
        distance: calculateDistance(stars[i].position, stars[j].position),
      });
    }
  }
  
  // Sort edges by distance
  edges.sort((a, b) => a.distance - b.distance);
  
  // Kruskal's algorithm
  const parent = new Map<string, string>();
  const rank = new Map<string, number>();
  
  // Initialize disjoint set
  stars.forEach(star => {
    parent.set(star.id, star.id);
    rank.set(star.id, 0);
  });
  
  const find = (x: string): string => {
    if (parent.get(x) !== x) {
      parent.set(x, find(parent.get(x)!));
    }
    return parent.get(x)!;
  };
  
  const union = (x: string, y: string): boolean => {
    const rootX = find(x);
    const rootY = find(y);
    
    if (rootX === rootY) return false;
    
    const rankX = rank.get(rootX)!;
    const rankY = rank.get(rootY)!;
    
    if (rankX < rankY) {
      parent.set(rootX, rootY);
    } else if (rankX > rankY) {
      parent.set(rootY, rootX);
    } else {
      parent.set(rootY, rootX);
      rank.set(rootX, rankX + 1);
    }
    
    return true;
  };
  
  // Add edges to MST
  for (const edge of edges) {
    if (union(edge.from.id, edge.to.id)) {
      connections.push({
        id: `${edge.from.id}-${edge.to.id}`,
        fromStarId: edge.from.id,
        toStarId: edge.to.id,
        strength: 1,
        width: 1,
        opacity: 0.2,
        active: false,
        drawProgress: 0,
      });
      
      if (connections.length === stars.length - 1) break;
    }
  }
  
  return connections;
};

/**
 * Create complete graph connections (all-to-all)
 */
const createCompleteConnections = (
  stars: Star[],
  maxDistance?: number
): Connection[] => {
  const connections: Connection[] = [];
  
  for (let i = 0; i < stars.length; i++) {
    for (let j = i + 1; j < stars.length; j++) {
      const distance = calculateDistance(stars[i].position, stars[j].position);
      
      if (!maxDistance || distance <= maxDistance) {
        connections.push({
          id: `${stars[i].id}-${stars[j].id}`,
          fromStarId: stars[i].id,
          toStarId: stars[j].id,
          strength: maxDistance ? 1 - distance / maxDistance : 1,
          width: 1,
          opacity: 0.2,
          active: false,
          drawProgress: 0,
        });
      }
    }
  }
  
  return connections;
};

// ============================================================================
// PATTERN GENERATORS
// ============================================================================

/**
 * Generate user profile constellation pattern
 */
const generateUserProfilePattern = (
  bounds: { width: number; height: number },
  starCount: number = 7
): { stars: Star[]; connections: Connection[] } => {
  const center = {
    x: bounds.width / 2,
    y: bounds.height / 2,
  };
  
  const radius = Math.min(bounds.width, bounds.height) * 0.3;
  const positions = generateCirclePoints(center, radius, starCount);
  
  const stars: Star[] = positions.map((position, index) => ({
    id: `user-star-${index}`,
    position,
    size: 4 + Math.random() * 2, // 4-6px
    opacity: 0.6 + Math.random() * 0.4, // 0.6-1.0
    brightness: 0.8 + Math.random() * 0.2, // 0.8-1.0
    active: false,
  }));
  
  const connections = findNearestNeighbors(stars, radius * 0.8, 2);
  
  return { stars, connections };
};

/**
 * Generate data points constellation pattern
 */
const generateDataPointsPattern = (
  bounds: { width: number; height: number },
  dataPoints: any[],
  connectionType: 'nearest-neighbor' | 'mst' | 'complete' = 'nearest-neighbor'
): { stars: Star[]; connections: Connection[] } => {
  const positions = generateOrganicPoints(bounds, dataPoints.length, 30);
  
  const stars: Star[] = positions.map((position, index) => ({
    id: `data-star-${index}`,
    position,
    size: 4 + Math.random() * 2,
    opacity: 0.6,
    brightness: 0.8,
    active: false,
    data: dataPoints[index],
  }));
  
  let connections: Connection[] = [];
  
  switch (connectionType) {
    case 'nearest-neighbor':
      connections = findNearestNeighbors(stars, 150, 3);
      break;
    case 'mst':
      connections = createMSTConnections(stars);
      break;
    case 'complete':
      connections = createCompleteConnections(stars, 100);
      break;
  }
  
  return { stars, connections };
};

/**
 * Generate custom constellation pattern
 */
const generateCustomPattern = (
  pattern: ConstellationPattern,
  bounds: { width: number; height: number },
  data?: any[]
): { stars: Star[]; connections: Connection[] } => {
  const center = {
    x: bounds.width / 2,
    y: bounds.height / 2,
  };
  
  const starCount = pattern.starCount === 'dynamic' 
    ? (data?.length || 5) 
    : pattern.starCount;
  
  let positions: Point[] = [];
  
  // Generate positions based on shape
  switch (pattern.shape) {
    case 'circle':
      positions = generateCirclePoints(center, pattern.radius, starCount);
      break;
    case 'spiral':
      positions = generateSpiralPoints(center, pattern.radius, starCount);
      break;
    case 'grid':
      const size = Math.ceil(Math.sqrt(starCount));
      positions = generateGridPoints(bounds, size, size).slice(0, starCount);
      break;
    case 'organic':
      positions = generateOrganicPoints(bounds, starCount, 30);
      break;
    default:
      positions = generateCirclePoints(center, pattern.radius, starCount);
  }
  
  const stars: Star[] = positions.map((position, index) => ({
    id: `${pattern.id}-star-${index}`,
    position,
    size: 4 + Math.random() * 2,
    opacity: 0.6,
    brightness: 0.8,
    active: false,
    data: data?.[index],
  }));
  
  let connections: Connection[] = [];
  
  // Generate connections based on type
  switch (pattern.connectionType) {
    case 'nearest-neighbor':
      connections = findNearestNeighbors(
        stars,
        pattern.maxConnectionDistance || 150,
        pattern.maxConnectionsPerStar || 3
      );
      break;
    case 'mst':
      connections = createMSTConnections(stars);
      break;
    case 'complete':
      connections = createCompleteConnections(
        stars,
        pattern.maxConnectionDistance
      );
      break;
    case 'delaunay':
      // Simplified Delaunay - use nearest neighbor for now
      connections = findNearestNeighbors(stars, pattern.maxConnectionDistance || 150, 6);
      break;
  }
  
  return { stars, connections };
};

// ============================================================================
// INTERACTION LOGIC
// ============================================================================

/**
 * Handle star hover interaction
 */
const handleStarHover = (
  starId: string,
  constellation: ConstellationState,
  config: ConstellationConfig
): Partial<ConstellationState> => {
  const star = constellation.stars.find(s => s.id === starId);
  if (!star) return {};
  
  const updates: Partial<ConstellationState> = {
    interactionState: {
      ...constellation.interactionState,
      hoveredStarId: starId,
    },
  };
  
  switch (config.interaction.onHover) {
    case 'connect-nearest':
      // Find nearest connections
      const nearestConnections = constellation.connections
        .filter(conn => conn.fromStarId === starId || conn.toStarId === starId)
        .map(conn => conn.id);
      
      updates.interactionState!.nearestConnections = nearestConnections;
      break;
    
    case 'highlight-star':
      // Just highlight the star (handled by renderer)
      break;
    
    case 'expand-connections':
      // Find all connections within a larger radius
      const expandedConnections = constellation.connections
        .filter(conn => {
          const connectedStarId = conn.fromStarId === starId ? conn.toStarId : 
                                 conn.toStarId === starId ? conn.fromStarId : null;
          if (!connectedStarId) return false;
          
          const connectedStar = constellation.stars.find(s => s.id === connectedStarId);
          if (!connectedStar) return false;
          
          const distance = calculateDistance(star.position, connectedStar.position);
          return distance <= 200; // Expanded radius
        })
        .map(conn => conn.id);
      
      updates.interactionState!.expandedConnections = expandedConnections;
      break;
  }
  
  return updates;
};

/**
 * Handle star click interaction
 */
const handleStarClick = (
  starId: string,
  constellation: ConstellationState,
  config: ConstellationConfig
): Partial<ConstellationState> => {
  const updates: Partial<ConstellationState> = {
    interactionState: {
      ...constellation.interactionState,
      selectedStarId: starId,
    },
  };
  
  switch (config.interaction.onClick) {
    case 'expand-connections':
      // Expand all connections from this star
      const expandedConnections = constellation.connections
        .filter(conn => conn.fromStarId === starId || conn.toStarId === starId)
        .map(conn => conn.id);
      
      updates.interactionState!.expandedConnections = expandedConnections;
      break;
    
    case 'select-star':
      // Select star and highlight its connections
      const selectedConnections = constellation.connections
        .filter(conn => conn.fromStarId === starId || conn.toStarId === starId)
        .map(conn => conn.id);
      
      updates.interactionState!.nearestConnections = selectedConnections;
      break;
    
    case 'toggle-connections':
      // Toggle connections on/off
      const currentConnections = constellation.interactionState.expandedConnections || [];
      const starConnections = constellation.connections
        .filter(conn => conn.fromStarId === starId || conn.toStarId === starId)
        .map(conn => conn.id);
      
      const isExpanded = starConnections.some(id => currentConnections.includes(id));
      updates.interactionState!.expandedConnections = isExpanded ? [] : starConnections;
      break;
  }
  
  return updates;
};

/**
 * Clear interaction state
 */
const clearInteractionState = (
  constellation: ConstellationState
): Partial<ConstellationState> => {
  return {
    interactionState: {
      hoveredStarId: undefined,
      selectedStarId: undefined,
      nearestConnections: [],
      expandedConnections: [],
    },
  };
};

// ============================================================================
// ANIMATION UTILITIES
// ============================================================================

/**
 * Calculate stagger delays for constellation reveal
 */
const calculateConstellationStagger = (
  stars: Star[],
  center: Point,
  baseDelay: number = 0,
  increment: number = 50
): number[] => {
  // Calculate distances from center
  const distances = stars.map(star => ({
    id: star.id,
    distance: calculateDistance(star.position, center),
  }));
  
  // Sort by distance (closest first)
  distances.sort((a, b) => a.distance - b.distance);
  
  // Assign delays
  const delays: number[] = [];
  stars.forEach(star => {
    const index = distances.findIndex(d => d.id === star.id);
    delays.push(baseDelay + index * increment);
  });
  
  return delays;
};

/**
 * Create constellation reveal animation
 */
const createConstellationRevealAnimation = (
  stars: Star[],
  connections: Connection[],
  bounds: { width: number; height: number },
  duration: number = 1000
): {
  starAnimations: Animated.CompositeAnimation[];
  connectionAnimations: Animated.CompositeAnimation[];
} => {
  const center = {
    x: bounds.width / 2,
    y: bounds.height / 2,
  };
  
  const staggerDelays = calculateConstellationStagger(stars, center);
  
  const starAnimations = stars.map((star, index) => {
    const opacity = new Animated.Value(0);
    const scale = new Animated.Value(0);
    
    return Animated.parallel([
      Animated.timing(opacity, {
        toValue: star.opacity,
        duration: 300,
        delay: staggerDelays[index],
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        delay: staggerDelays[index],
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]);
  });
  
  const connectionAnimations = connections.map((connection, index) => {
    const drawProgress = new Animated.Value(0);
    const opacity = new Animated.Value(0);
    
    return Animated.sequence([
      Animated.delay(Math.max(...staggerDelays) + 200), // Wait for stars
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: connection.opacity,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(drawProgress, {
          toValue: 1,
          duration: 500,
          delay: index * 50,
          useNativeDriver: true,
        }),
      ]),
    ]);
  });
  
  return { starAnimations, connectionAnimations };
};

// ============================================================================
// EXPORTS
// ============================================================================

export {
  // Geometry utilities
  calculateDistance,
  calculateAngle,
  generateCirclePoints,
  generateSpiralPoints,
  generateOrganicPoints,
  generateGridPoints,
  
  // Connection algorithms
  findNearestNeighbors,
  createMSTConnections,
  createCompleteConnections,
  
  // Pattern generators
  generateUserProfilePattern,
  generateDataPointsPattern,
  generateCustomPattern,
  
  // Interaction logic
  handleStarHover,
  handleStarClick,
  clearInteractionState,
  
  // Animation utilities
  calculateConstellationStagger,
  createConstellationRevealAnimation,
};
