import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import Svg, { 
  Circle, 
  Path, 
  Ellipse,
  Defs, 
  RadialGradient, 
  Stop, 
  Filter, 
  FeGaussianBlur, 
  FeMorphology,
  FeOffset,
  FeFlood,
  FeComposite,
  LinearGradient
} from 'react-native-svg';
import { SignatureBlues } from '../../foundations/tokens/colors/SignatureBlues';
import { deepSpaceColors } from '../../foundations/tokens/colors/DeepSpaceColors';
import type { OrbitalBody } from './OrbitalPhysics';

export interface OrbitalRendererProps {
  /** Orbital bodies to render */
  bodies: OrbitalBody[];
  /** Center element */
  center?: {
    position: { x: number; y: number };
    radius: number;
    color: string;
    glow?: boolean;
    pulse?: boolean;
  };
  /** Orbital rings */
  rings?: {
    radius: number;
    width: number;
    color: string;
    opacity: number;
    dashed?: boolean;
    animated?: boolean;
  }[];
  /** Rendering mode */
  renderMode?: 'svg' | 'native' | 'canvas';
  /** Show trails */
  showTrails?: boolean;
  /** Trail style */
  trailStyle?: 'solid' | 'gradient' | 'dotted' | 'fading';
  /** Trail opacity */
  trailOpacity?: number;
  /** Show glow effects */
  showGlow?: boolean;
  /** Glow intensity */
  glowIntensity?: number;
  /** Show orbital paths */
  showOrbitalPaths?: boolean;
  /** Orbital path style */
  orbitalPathStyle?: 'solid' | 'dashed' | 'dotted' | 'invisible';
  /** Animation enabled */
  animationEnabled?: boolean;
  /** Performance optimization */
  optimizePerformance?: boolean;
  /** Container size */
  containerSize?: { width: number; height: number };
  /** Background effects */
  showBackground?: boolean;
  /** Background star count */
  backgroundStarCount?: number;
  /** Zoom level */
  zoomLevel?: number;
  /** Pan offset */
  panOffset?: { x: number; y: number };
  /** Test ID for testing */
  testID?: string;
}

interface BackgroundStar {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkle: Animated.Value;
}

/**
 * OrbitalRenderer - Advanced orbital element rendering engine
 * 
 * Features:
 * - SVG and native rendering modes
 * - Orbital body rendering with trails and glow effects
 * - Center element with pulse animation
 * - Orbital ring visualization
 * - Background star field
 * - Performance optimizations
 * - Zoom and pan support
 * - Configurable visual effects
 * - Real-time rendering updates
 * 
 * @param bodies - Array of orbital bodies to render
 * @param center - Center element configuration
 * @param rings - Orbital rings configuration
 * @param renderMode - Rendering mode (default: 'svg')
 * @param showTrails - Show orbital trails (default: true)
 * @param trailStyle - Trail style (default: 'gradient')
 * @param trailOpacity - Trail opacity (default: 0.6)
 * @param showGlow - Show glow effects (default: true)
 * @param glowIntensity - Glow intensity (default: 1)
 * @param showOrbitalPaths - Show orbital paths (default: false)
 * @param orbitalPathStyle - Orbital path style (default: 'dashed')
 * @param animationEnabled - Animation enabled (default: true)
 * @param optimizePerformance - Performance optimization (default: true)
 * @param containerSize - Container size (default: screen dimensions)
 * @param showBackground - Show background effects (default: true)
 * @param backgroundStarCount - Background star count (default: 100)
 * @param zoomLevel - Zoom level (default: 1)
 * @param panOffset - Pan offset (default: { x: 0, y: 0 })
 * @param testID - Test ID for testing
 * 
 * @returns OrbitalRenderer component
 */
export const OrbitalRenderer: React.FC<OrbitalRendererProps> = ({
  bodies,
  center,
  rings = [],
  renderMode = 'svg',
  showTrails = true,
  trailStyle = 'gradient',
  trailOpacity = 0.6,
  showGlow = true,
  glowIntensity = 1,
  showOrbitalPaths = false,
  orbitalPathStyle = 'dashed',
  animationEnabled = true,
  optimizePerformance = true,
  containerSize = { width: 400, height: 400 },
  showBackground = true,
  backgroundStarCount = 100,
  zoomLevel = 1,
  panOffset = { x: 0, y: 0 },
  testID
}) => {
  const [backgroundStars, setBackgroundStars] = useState<BackgroundStar[]>([]);
  const [visibleBodies, setVisibleBodies] = useState<OrbitalBody[]>([]);
  const animationRef = useRef<number | null>(null);
  const lastFrameTime = useRef<number>(0);

  // Generate background stars
  const generateBackgroundStars = () => {
    const stars: BackgroundStar[] = [];
    for (let i = 0; i < backgroundStarCount; i++) {
      stars.push({
        x: Math.random() * containerSize.width,
        y: Math.random() * containerSize.height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        twinkle: new Animated.Value(Math.random()),
      });
    }
    setBackgroundStars(stars);
  };

  // Filter visible bodies for performance
  const filterVisibleBodies = (bodies: OrbitalBody[]): OrbitalBody[] => {
    if (!optimizePerformance) return bodies;

    const viewportBounds = {
      left: -panOffset.x / zoomLevel,
      right: (-panOffset.x + containerSize.width) / zoomLevel,
      top: -panOffset.y / zoomLevel,
      bottom: (-panOffset.y + containerSize.height) / zoomLevel,
    };

    return bodies.filter(body => {
      const margin = body.radius * 2;
      return (
        body.position.x + margin >= viewportBounds.left &&
        body.position.x - margin <= viewportBounds.right &&
        body.position.y + margin >= viewportBounds.top &&
        body.position.y - margin <= viewportBounds.bottom
      );
    });
  };

  // Animate background stars
  const animateBackgroundStars = () => {
    backgroundStars.forEach(star => {
      Animated.sequence([
        Animated.timing(star.twinkle, {
          toValue: 0.2,
          duration: 2000 + Math.random() * 3000,
          useNativeDriver: false,
        }),
        Animated.timing(star.twinkle, {
          toValue: 1,
          duration: 2000 + Math.random() * 3000,
          useNativeDriver: false,
        }),
      ]).start();
    });
  };

  // Render background stars
  const renderBackgroundStars = () => {
    if (!showBackground) return null;

    return backgroundStars.map((star, index) => (
      <Animated.View key={index}>
        <Circle
          cx={star.x}
          cy={star.y}
          r={star.size}
          fill={SignatureBlues.primary as string}
          opacity={star.opacity}
        />
      </Animated.View>
    ));
  };

  // Render orbital rings
  const renderOrbitalRings = () => {
    if (!center || rings.length === 0) return null;

    return rings.map((ring, index) => (
      <Circle
        key={`ring-${index}`}
        cx={center.position.x}
        cy={center.position.y}
        r={ring.radius}
        fill="none"
        stroke={ring.color}
        strokeWidth={ring.width}
        strokeOpacity={ring.opacity}
        strokeDasharray={ring.dashed ? '5,5' : undefined}
      />
    ));
  };

  // Render orbital trails
  const renderOrbitalTrails = (body: OrbitalBody) => {
    if (!showTrails || body.trail.length < 2) return null;

    const pathData = body.trail.map((point, index) => 
      `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
    ).join(' ');

    switch (trailStyle) {
      case 'solid':
        return (
          <Path
            key={`trail-${body.id}`}
            d={pathData}
            stroke={body.color}
            strokeWidth={1}
            strokeOpacity={trailOpacity}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );

      case 'gradient':
        return (
          <Path
            key={`trail-${body.id}`}
            d={pathData}
            stroke={`url(#trail-gradient-${body.id})`}
            strokeWidth={1}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );

      case 'dotted':
        return (
          <Path
            key={`trail-${body.id}`}
            d={pathData}
            stroke={body.color}
            strokeWidth={1}
            strokeOpacity={trailOpacity}
            strokeDasharray="2,2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );

      case 'fading':
        return body.trail.map((point, index) => {
          const opacity = (index / body.trail.length) * trailOpacity;
          return (
            <Circle
              key={`trail-point-${body.id}-${index}`}
              cx={point.x}
              cy={point.y}
              r={0.5}
              fill={body.color}
              opacity={opacity}
            />
          );
        });

      default:
        return null;
    }
  };

  // Render orbital body
  const renderOrbitalBody = (body: OrbitalBody) => {
    return (
      <Circle
        key={body.id}
        cx={body.position.x}
        cy={body.position.y}
        r={body.radius}
        fill={showGlow ? `url(#body-gradient-${body.id})` : body.color}
        filter={showGlow ? `url(#glow-${body.id})` : undefined}
      />
    );
  };

  // Render center element
  const renderCenter = () => {
    if (!center) return null;

    return (
      <Circle
        cx={center.position.x}
        cy={center.position.y}
        r={center.radius}
        fill={showGlow ? `url(#center-gradient)` : center.color}
        filter={showGlow ? `url(#center-glow)` : undefined}
      />
    );
  };

  // Render SVG gradients and filters
  const renderDefs = () => {
    return (
      <Defs>
        {/* Center gradients */}
        {center && (
          <>
            <RadialGradient id="center-gradient" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor={center.color} stopOpacity={1} />
              <Stop offset="100%" stopColor={center.color} stopOpacity={0.6} />
            </RadialGradient>
            
            {showGlow && (
              <Filter id="center-glow">
                <FeGaussianBlur stdDeviation={glowIntensity * 3} result="coloredBlur" />
                <FeMorphology operator="dilate" radius={glowIntensity * 2} />
                <FeOffset dx={0} dy={0} result="offset" />
                <FeFlood floodColor={center.color} floodOpacity={0.8} />
                <FeComposite in="SourceGraphic" operator="over" />
              </Filter>
            )}
          </>
        )}

        {/* Body gradients and filters */}
        {visibleBodies.map(body => (
          <React.Fragment key={`defs-${body.id}`}>
            <RadialGradient id={`body-gradient-${body.id}`} cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor={body.color} stopOpacity={1} />
              <Stop offset="100%" stopColor={body.color} stopOpacity={0.7} />
            </RadialGradient>
            
            {showGlow && (
              <Filter id={`glow-${body.id}`}>
                <FeGaussianBlur stdDeviation={glowIntensity * 2} result="coloredBlur" />
                <FeMorphology operator="dilate" radius={glowIntensity} />
                <FeOffset dx={0} dy={0} result="offset" />
                <FeFlood floodColor={body.color} floodOpacity={0.6} />
                <FeComposite in="SourceGraphic" operator="over" />
              </Filter>
            )}

            {/* Trail gradients */}
            {trailStyle === 'gradient' && (
              <LinearGradient id={`trail-gradient-${body.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <Stop offset="0%" stopColor={body.color} stopOpacity={0} />
                <Stop offset="100%" stopColor={body.color} stopOpacity={trailOpacity} />
              </LinearGradient>
            )}
          </React.Fragment>
        ))}
      </Defs>
    );
  };

  // Render SVG mode
  const renderSVG = () => {
    return (
      <Svg 
        width={containerSize.width} 
        height={containerSize.height}
        viewBox={`${-panOffset.x / zoomLevel} ${-panOffset.y / zoomLevel} ${containerSize.width / zoomLevel} ${containerSize.height / zoomLevel}`}
      >
        {renderDefs()}
        
        {/* Background stars */}
        {renderBackgroundStars()}
        
        {/* Orbital rings */}
        {renderOrbitalRings()}
        
        {/* Orbital trails */}
        {visibleBodies.map(body => renderOrbitalTrails(body))}
        
        {/* Center element */}
        {renderCenter()}
        
        {/* Orbital bodies */}
        {visibleBodies.map(body => renderOrbitalBody(body))}
      </Svg>
    );
  };

  // Render native mode
  const renderNative = () => {
    return (
      <View style={styles.nativeContainer}>
        {/* Background stars */}
        {showBackground && backgroundStars.map((star, index) => (
          <Animated.View
            key={`bg-star-${index}`}
            style={[
              styles.backgroundStar,
              {
                left: star.x * zoomLevel + panOffset.x,
                top: star.y * zoomLevel + panOffset.y,
                width: star.size * zoomLevel,
                height: star.size * zoomLevel,
                opacity: star.twinkle,
              }
            ]}
          />
        ))}

        {/* Center element */}
        {center && (
          <View
            style={[
              styles.nativeBody,
              {
                left: center.position.x * zoomLevel + panOffset.x - center.radius,
                top: center.position.y * zoomLevel + panOffset.y - center.radius,
                width: center.radius * 2 * zoomLevel,
                height: center.radius * 2 * zoomLevel,
                backgroundColor: center.color,
                shadowColor: showGlow ? center.color : 'transparent',
                shadowOpacity: showGlow ? 0.8 : 0,
                shadowRadius: showGlow ? glowIntensity * 8 : 0,
              }
            ]}
          />
        )}

        {/* Orbital bodies */}
        {visibleBodies.map(body => (
          <View
            key={body.id}
            style={[
              styles.nativeBody,
              {
                left: body.position.x * zoomLevel + panOffset.x - body.radius,
                top: body.position.y * zoomLevel + panOffset.y - body.radius,
                width: body.radius * 2 * zoomLevel,
                height: body.radius * 2 * zoomLevel,
                backgroundColor: body.color,
                shadowColor: showGlow ? body.color : 'transparent',
                shadowOpacity: showGlow ? 0.6 : 0,
                shadowRadius: showGlow ? glowIntensity * 4 : 0,
              }
            ]}
          />
        ))}
      </View>
    );
  };

  // Update visible bodies
  useEffect(() => {
    setVisibleBodies(filterVisibleBodies(bodies));
  }, [bodies, zoomLevel, panOffset, optimizePerformance]);

  // Generate background stars on mount
  useEffect(() => {
    generateBackgroundStars();
  }, [containerSize, backgroundStarCount]);

  // Animate background stars
  useEffect(() => {
    if (animationEnabled && showBackground) {
      animateBackgroundStars();
    }
  }, [backgroundStars, animationEnabled, showBackground]);

  return (
    <View style={[styles.container, { width: containerSize.width, height: containerSize.height }]} testID={testID}>
      {renderMode === 'svg' ? renderSVG() : renderNative()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    overflow: 'hidden',
  },
  nativeContainer: {
    flex: 1,
    position: 'relative',
  },
  nativeBody: {
    position: 'absolute',
    borderRadius: 9999,
    shadowOffset: { width: 0, height: 0 },
  },
  backgroundStar: {
    position: 'absolute',
    borderRadius: 9999,
    backgroundColor: SignatureBlues.primary as string,
  },
});

export default OrbitalRenderer;
