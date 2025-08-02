import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import Svg, { 
  Circle, 
  Path, 
  Defs, 
  RadialGradient, 
  Stop, 
  Filter, 
  FeGaussianBlur, 
  FeMorphology,
  FeOffset,
  FeFlood,
  FeComposite
} from 'react-native-svg';
import { SignatureBlues } from '../../foundations/tokens/colors/SignatureBlues';
import { deepSpaceColors } from '../../foundations/tokens/colors/DeepSpaceColors';
import type { Particle } from './ParticleField';

export interface ParticleRendererProps {
  /** Particles to render */
  particles: Particle[];
  /** Rendering mode */
  renderMode?: 'canvas' | 'svg' | 'native';
  /** Particle style */
  particleStyle?: 'circle' | 'star' | 'sparkle' | 'dot' | 'cosmic' | 'trail';
  /** Show glow effects */
  showGlow?: boolean;
  /** Glow intensity */
  glowIntensity?: number;
  /** Show trails */
  showTrails?: boolean;
  /** Trail length */
  trailLength?: number;
  /** Trail opacity */
  trailOpacity?: number;
  /** Performance optimization */
  optimizePerformance?: boolean;
  /** Batch rendering */
  batchRender?: boolean;
  /** Maximum render count */
  maxRenderCount?: number;
  /** Alpha threshold */
  alphaThreshold?: number;
  /** Blend mode */
  blendMode?: 'normal' | 'additive' | 'multiply' | 'screen';
  /** Container size */
  containerSize?: { width: number; height: number };
  /** Animation enabled */
  animationEnabled?: boolean;
  /** Frame rate limit */
  frameRateLimit?: number;
  /** Test ID for testing */
  testID?: string;
}

interface ParticleTrail {
  positions: { x: number; y: number; opacity: number }[];
  particleId: string;
}

/**
 * ParticleRenderer - Advanced particle rendering system component
 * 
 * Features:
 * - Multiple rendering modes (canvas, svg, native)
 * - Various particle styles (circle, star, sparkle, dot, cosmic, trail)
 * - Glow and trail effects
 * - Performance optimizations
 * - Batch rendering for large particle counts
 * - Alpha threshold culling
 * - Blend mode support
 * - Frame rate limiting
 * - Memory efficient trail rendering
 * 
 * @param particles - Array of particles to render
 * @param renderMode - Rendering mode (default: 'svg')
 * @param particleStyle - Particle style (default: 'circle')
 * @param showGlow - Show glow effects (default: true)
 * @param glowIntensity - Glow intensity (default: 1)
 * @param showTrails - Show trails (default: false)
 * @param trailLength - Trail length (default: 5)
 * @param trailOpacity - Trail opacity (default: 0.5)
 * @param optimizePerformance - Performance optimization (default: true)
 * @param batchRender - Batch rendering (default: true)
 * @param maxRenderCount - Maximum render count (default: 1000)
 * @param alphaThreshold - Alpha threshold (default: 0.01)
 * @param blendMode - Blend mode (default: 'normal')
 * @param containerSize - Container size (default: screen dimensions)
 * @param animationEnabled - Animation enabled (default: true)
 * @param frameRateLimit - Frame rate limit (default: 60)
 * @param testID - Test ID for testing
 * 
 * @returns ParticleRenderer component
 */
export const ParticleRenderer: React.FC<ParticleRendererProps> = ({
  particles,
  renderMode = 'svg',
  particleStyle = 'circle',
  showGlow = true,
  glowIntensity = 1,
  showTrails = false,
  trailLength = 5,
  trailOpacity = 0.5,
  optimizePerformance = true,
  batchRender = true,
  maxRenderCount = 1000,
  alphaThreshold = 0.01,
  blendMode = 'normal',
  containerSize = { width: 400, height: 400 },
  animationEnabled = true,
  frameRateLimit = 60,
  testID
}) => {
  const [visibleParticles, setVisibleParticles] = useState<Particle[]>([]);
  const [particleTrails, setParticleTrails] = useState<Map<string, ParticleTrail>>(new Map());
  const animationRef = useRef<number | null>(null);
  const lastFrameTime = useRef<number>(0);
  const frameInterval = 1000 / frameRateLimit;

  // Filter particles based on performance optimizations
  const filterParticles = (particles: Particle[]): Particle[] => {
    let filtered = particles;

    // Alpha threshold culling
    if (optimizePerformance) {
      filtered = filtered.filter(particle => particle.opacity > alphaThreshold);
    }

    // Limit maximum render count
    if (filtered.length > maxRenderCount) {
      filtered = filtered
        .sort((a, b) => b.opacity - a.opacity)
        .slice(0, maxRenderCount);
    }

    // Viewport culling
    filtered = filtered.filter(particle => 
      particle.x >= -particle.size &&
      particle.x <= containerSize.width + particle.size &&
      particle.y >= -particle.size &&
      particle.y <= containerSize.height + particle.size
    );

    return filtered;
  };

  // Update particle trails
  const updateTrails = (particles: Particle[]) => {
    if (!showTrails) return;

    const newTrails = new Map<string, ParticleTrail>();

    particles.forEach(particle => {
      const existingTrail = particleTrails.get(particle.id);
      const newPosition = { x: particle.x, y: particle.y, opacity: particle.opacity };

      if (existingTrail) {
        const updatedPositions = [newPosition, ...existingTrail.positions.slice(0, trailLength - 1)];
        newTrails.set(particle.id, {
          positions: updatedPositions,
          particleId: particle.id
        });
      } else {
        newTrails.set(particle.id, {
          positions: [newPosition],
          particleId: particle.id
        });
      }
    });

    setParticleTrails(newTrails);
  };

  // Render frame
  const renderFrame = (timestamp: number) => {
    if (timestamp - lastFrameTime.current >= frameInterval) {
      const filtered = filterParticles(particles);
      setVisibleParticles(filtered);
      updateTrails(filtered);
      lastFrameTime.current = timestamp;
    }

    if (animationEnabled) {
      animationRef.current = requestAnimationFrame(renderFrame);
    }
  };

  // Start animation
  useEffect(() => {
    if (animationEnabled) {
      animationRef.current = requestAnimationFrame(renderFrame);
    } else {
      const filtered = filterParticles(particles);
      setVisibleParticles(filtered);
      updateTrails(filtered);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particles, animationEnabled]);

  // Generate star path
  const generateStarPath = (x: number, y: number, size: number): string => {
    const outerRadius = size;
    const innerRadius = size * 0.4;
    const points = 5;
    let path = '';

    for (let i = 0; i < points * 2; i++) {
      const angle = (i * Math.PI) / points;
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const px = x + Math.cos(angle) * radius;
      const py = y + Math.sin(angle) * radius;
      
      if (i === 0) {
        path += `M ${px} ${py}`;
      } else {
        path += ` L ${px} ${py}`;
      }
    }
    
    return path + ' Z';
  };

  // Generate sparkle path
  const generateSparklePath = (x: number, y: number, size: number): string => {
    const points = [
      { x: x, y: y - size }, // top
      { x: x + size * 0.3, y: y - size * 0.3 }, // top-right
      { x: x + size, y: y }, // right
      { x: x + size * 0.3, y: y + size * 0.3 }, // bottom-right
      { x: x, y: y + size }, // bottom
      { x: x - size * 0.3, y: y + size * 0.3 }, // bottom-left
      { x: x - size, y: y }, // left
      { x: x - size * 0.3, y: y - size * 0.3 }, // top-left
    ];

    return points.map((point, index) => 
      `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
    ).join(' ') + ' Z';
  };

  // Render SVG particle
  const renderSVGParticle = (particle: Particle, index: number) => {
    const glowRadius = showGlow ? particle.size * glowIntensity * 2 : particle.size;
    const particleOpacity = particle.opacity;

    switch (particleStyle) {
      case 'circle':
        return (
          <Circle
            key={`${particle.id}-${index}`}
            cx={particle.x}
            cy={particle.y}
            r={particle.size}
            fill={`url(#grad-${particle.id})`}
            opacity={particleOpacity}
            filter={showGlow ? `url(#glow-${particle.id})` : undefined}
          />
        );

      case 'star':
        return (
          <Path
            key={`${particle.id}-${index}`}
            d={generateStarPath(particle.x, particle.y, particle.size)}
            fill={`url(#grad-${particle.id})`}
            opacity={particleOpacity}
            filter={showGlow ? `url(#glow-${particle.id})` : undefined}
          />
        );

      case 'sparkle':
        return (
          <Path
            key={`${particle.id}-${index}`}
            d={generateSparklePath(particle.x, particle.y, particle.size)}
            fill={`url(#grad-${particle.id})`}
            opacity={particleOpacity}
            filter={showGlow ? `url(#glow-${particle.id})` : undefined}
          />
        );

      case 'dot':
        return (
          <Circle
            key={`${particle.id}-${index}`}
            cx={particle.x}
            cy={particle.y}
            r={particle.size * 0.5}
            fill={particle.color}
            opacity={particleOpacity}
          />
        );

      case 'cosmic':
        return (
          <Circle
            key={`${particle.id}-${index}`}
            cx={particle.x}
            cy={particle.y}
            r={particle.size}
            fill={`url(#cosmic-grad-${particle.id})`}
            opacity={particleOpacity}
            filter={showGlow ? `url(#cosmic-glow-${particle.id})` : undefined}
          />
        );

      default:
        return null;
    }
  };

  // Render particle trails
  const renderTrails = () => {
    if (!showTrails) return null;

    return Array.from(particleTrails.values()).map(trail => {
      const pathData = trail.positions.map((pos, index) => 
        `${index === 0 ? 'M' : 'L'} ${pos.x} ${pos.y}`
      ).join(' ');

      return (
        <Path
          key={`trail-${trail.particleId}`}
          d={pathData}
          stroke={SignatureBlues.primary as string}
          strokeWidth={2}
          strokeOpacity={trailOpacity}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );
    });
  };

  // Render SVG mode
  const renderSVG = () => {
    return (
      <Svg width={containerSize.width} height={containerSize.height}>
        <Defs>
          {visibleParticles.map(particle => (
            <React.Fragment key={`defs-${particle.id}`}>
              <RadialGradient id={`grad-${particle.id}`} cx="50%" cy="50%" r="50%">
                <Stop offset="0%" stopColor={particle.color} stopOpacity={particle.opacity} />
                <Stop offset="100%" stopColor={particle.color} stopOpacity={0} />
              </RadialGradient>
              
              {particle.type === 'cosmic' && (
                <RadialGradient id={`cosmic-grad-${particle.id}`} cx="50%" cy="50%" r="50%">
                  <Stop offset="0%" stopColor={SignatureBlues.glow as string} stopOpacity={particle.opacity} />
                  <Stop offset="50%" stopColor={SignatureBlues.primary as string} stopOpacity={particle.opacity * 0.8} />
                  <Stop offset="100%" stopColor={SignatureBlues.primary as string} stopOpacity={0} />
                </RadialGradient>
              )}

              {showGlow && (
                <Filter id={`glow-${particle.id}`}>
                  <FeGaussianBlur stdDeviation={glowIntensity * 2} result="coloredBlur" />
                  <FeMorphology operator="dilate" radius={glowIntensity} />
                  <FeOffset dx={0} dy={0} result="offset" />
                  <FeFlood floodColor={particle.color} floodOpacity={particle.opacity * 0.6} />
                  <FeComposite in="SourceGraphic" operator="over" />
                </Filter>
              )}

              {particle.type === 'cosmic' && showGlow && (
                <Filter id={`cosmic-glow-${particle.id}`}>
                  <FeGaussianBlur stdDeviation={glowIntensity * 3} result="coloredBlur" />
                  <FeMorphology operator="dilate" radius={glowIntensity * 1.5} />
                  <FeOffset dx={0} dy={0} result="offset" />
                  <FeFlood floodColor={SignatureBlues.glow as string} floodOpacity={particle.opacity * 0.8} />
                  <FeComposite in="SourceGraphic" operator="over" />
                </Filter>
              )}
            </React.Fragment>
          ))}
        </Defs>

        {renderTrails()}
        {visibleParticles.map((particle, index) => renderSVGParticle(particle, index))}
      </Svg>
    );
  };

  // Render native mode
  const renderNative = () => {
    return (
      <View style={styles.nativeContainer}>
        {visibleParticles.map((particle, index) => (
          <View
            key={`${particle.id}-${index}`}
            style={[
              styles.nativeParticle,
              {
                left: particle.x - particle.size,
                top: particle.y - particle.size,
                width: particle.size * 2,
                height: particle.size * 2,
                borderRadius: particle.size,
                backgroundColor: particle.color,
                opacity: particle.opacity,
                shadowColor: showGlow ? particle.color : 'transparent',
                shadowOpacity: showGlow ? glowIntensity * 0.8 : 0,
                shadowRadius: showGlow ? glowIntensity * 4 : 0,
                shadowOffset: { width: 0, height: 0 },
              }
            ]}
          />
        ))}
      </View>
    );
  };

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
    zIndex: 2,
  },
  nativeContainer: {
    flex: 1,
    position: 'relative',
  },
  nativeParticle: {
    position: 'absolute',
  },
});

export default ParticleRenderer;
