import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions, ScrollView } from 'react-native';
import { ConstellationPattern, ConstellationPoint, ConstellationConnection } from './ConstellationPattern';
import { ConstellationInteraction } from './ConstellationInteraction';
import { SignatureBlues } from '../../foundations/tokens/colors/SignatureBlues';
import { deepSpaceColors } from '../../foundations/tokens/colors/DeepSpaceColors';

export interface ConstellationMapProps {
  /** Map size */
  mapSize?: { width: number; height: number };
  /** Multiple constellation patterns */
  patterns?: Array<{
    id: string;
    type: 'circle' | 'organic' | 'grid' | 'random' | 'user-profile' | 'data-points';
    position: { x: number; y: number };
    starCount: number;
    radius: number;
    color?: string;
  }>;
  /** Interactive mode */
  isInteractive?: boolean;
  /** Zoom enabled */
  zoomEnabled?: boolean;
  /** Pan enabled */
  panEnabled?: boolean;
  /** Animation enabled */
  isAnimated?: boolean;
  /** Animation duration */
  animationDuration?: number;
  /** Background effects */
  showBackground?: boolean;
  /** Particle effects */
  showParticles?: boolean;
  /** Glow effects */
  showGlow?: boolean;
  /** Callback when constellation is selected */
  onConstellationSelect?: (patternId: string, point: ConstellationPoint) => void;
  /** Callback when map is updated */
  onMapUpdate?: (patterns: any[]) => void;
  /** Test ID for testing */
  testID?: string;
}

/**
 * ConstellationMap - Interactive constellation map component
 * 
 * Features:
 * - Multiple constellation patterns
 * - Interactive star selection
 * - Zoom and pan controls
 * - Animated pattern transitions
 * - Background cosmic effects
 * - Particle system integration
 * - Corp Astro design system integration
 */
export const ConstellationMap: React.FC<ConstellationMapProps> = ({
  mapSize = Dimensions.get('window'),
  patterns = [],
  isInteractive = true,
  zoomEnabled = true,
  panEnabled = true,
  isAnimated = true,
  animationDuration = 2000,
  showBackground = true,
  showParticles = true,
  showGlow = true,
  onConstellationSelect,
  onMapUpdate,
  testID = 'constellation-map',
}) => {
  const [currentPatterns, setCurrentPatterns] = useState(patterns);
  const [selectedPatternId, setSelectedPatternId] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  
  const mapOpacity = useRef(new Animated.Value(0)).current;
  const backgroundAnimation = useRef(new Animated.Value(0)).current;
  const glowAnimation = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  // Default patterns if none provided
  const defaultPatterns = [
    {
      id: 'orion',
      type: 'organic' as const,
      position: { x: mapSize.width * 0.3, y: mapSize.height * 0.3 },
      starCount: 7,
      radius: 80,
      color: String(SignatureBlues.primary),
    },
    {
      id: 'cassiopeia',
      type: 'circle' as const,
      position: { x: mapSize.width * 0.7, y: mapSize.height * 0.2 },
      starCount: 5,
      radius: 60,
      color: String(SignatureBlues.light),
    },
    {
      id: 'ursa-major',
      type: 'organic' as const,
      position: { x: mapSize.width * 0.5, y: mapSize.height * 0.7 },
      starCount: 9,
      radius: 100,
      color: String(SignatureBlues.glow),
    },
  ];

  // Initialize patterns
  useEffect(() => {
    if (patterns.length === 0) {
      setCurrentPatterns(defaultPatterns);
    } else {
      setCurrentPatterns(patterns);
    }
  }, [patterns]);

  // Animate map appearance
  useEffect(() => {
    if (isAnimated) {
      Animated.parallel([
        Animated.timing(mapOpacity, {
          toValue: 1,
          duration: animationDuration,
          useNativeDriver: true,
        }),
        Animated.timing(backgroundAnimation, {
          toValue: 1,
          duration: animationDuration * 1.5,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      mapOpacity.setValue(1);
      backgroundAnimation.setValue(1);
    }
  }, [isAnimated, animationDuration]);

  // Animate glow effects
  useEffect(() => {
    if (showGlow) {
      const glowLoop = Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnimation, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(glowAnimation, {
            toValue: 0.3,
            duration: 3000,
            useNativeDriver: true,
          }),
        ])
      );
      glowLoop.start();
    }
  }, [showGlow]);

  // Handle constellation selection
  const handleConstellationSelect = (patternId: string, point: ConstellationPoint) => {
    setSelectedPatternId(patternId);
    onConstellationSelect?.(patternId, point);
  };

  // Handle pattern interactions
  const handlePatternInteraction = (patternId: string, type: string, point: ConstellationPoint, data?: any) => {
    // Update pattern state based on interaction
    const updatedPatterns = currentPatterns.map(pattern => {
      if (pattern.id === patternId) {
        return {
          ...pattern,
          // Update pattern properties based on interaction
        };
      }
      return pattern;
    });

    setCurrentPatterns(updatedPatterns);
    onMapUpdate?.(updatedPatterns);
  };

  // Handle zoom
  const handleZoom = (scale: number) => {
    if (zoomEnabled) {
      setZoomLevel(Math.max(0.5, Math.min(3, scale)));
    }
  };

  // Handle pan
  const handlePan = (deltaX: number, deltaY: number) => {
    if (panEnabled) {
      setPanOffset(prev => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY,
      }));
    }
  };

  // Render background effects
  const renderBackground = () => {
    if (!showBackground) return null;

    return (
      <Animated.View
        style={[
          styles.backgroundLayer,
          {
            opacity: backgroundAnimation,
            transform: [
              { scale: backgroundAnimation },
            ],
          },
        ]}
      >
        {/* Cosmic background gradient */}
        <View style={styles.cosmicBackground} />
        
        {/* Star field */}
        {showParticles && (
          <View style={styles.starField}>
            {Array.from({ length: 50 }, (_, i) => (
              <Animated.View
                key={i}
                style={[
                  styles.backgroundStar,
                  {
                    left: Math.random() * mapSize.width,
                    top: Math.random() * mapSize.height,
                    opacity: glowAnimation,
                    transform: [
                      { scale: glowAnimation },
                    ],
                  },
                ]}
              />
            ))}
          </View>
        )}
      </Animated.View>
    );
  };

  // Render constellation patterns
  const renderPatterns = () => {
    return currentPatterns.map(pattern => (
      <View
        key={pattern.id}
        style={[
          styles.patternContainer,
          {
            left: pattern.position.x - pattern.radius,
            top: pattern.position.y - pattern.radius,
            width: pattern.radius * 2,
            height: pattern.radius * 2,
          },
        ]}
      >
        <ConstellationPattern
          patternType={pattern.type}
          starCount={pattern.starCount}
          radius={pattern.radius}
          containerSize={{ width: pattern.radius * 2, height: pattern.radius * 2 }}
          isAnimated={isAnimated}
          animationDuration={animationDuration}
          isInteractive={isInteractive}
          onStarPress={(point) => handleConstellationSelect(pattern.id, point)}
          onPatternChange={(points, connections) => {
            handlePatternInteraction(pattern.id, 'pattern-change', points[0], { points, connections });
          }}
          testID={`constellation-pattern-${pattern.id}`}
        />
        
        {isInteractive && (
          <ConstellationInteraction
            points={[]} // Would be populated from pattern state
            connections={[]} // Would be populated from pattern state
            interactionType="hover"
            onHover="connect-nearest"
            onClick="expand-connections"
            glowIntensity={1.5}
            containerSize={{ width: pattern.radius * 2, height: pattern.radius * 2 }}
            onInteraction={(type, point, data) => {
              handlePatternInteraction(pattern.id, type, point, data);
            }}
            testID={`constellation-interaction-${pattern.id}`}
          />
        )}
      </View>
    ));
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          width: mapSize.width,
          height: mapSize.height,
          opacity: mapOpacity,
        },
      ]}
      testID={testID}
    >
      {renderBackground()}
      
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollContainer}
        contentContainerStyle={[
          styles.scrollContent,
          {
            width: mapSize.width * zoomLevel,
            height: mapSize.height * zoomLevel,
            transform: [
              { scale: zoomLevel },
              { translateX: panOffset.x },
              { translateY: panOffset.y },
            ],
          },
        ]}
        scrollEnabled={panEnabled}
        maximumZoomScale={3}
        minimumZoomScale={0.5}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        bounces={false}
        bouncesZoom={false}
      >
        {renderPatterns()}
      </ScrollView>
      
      {/* Glow overlay */}
      {showGlow && (
        <Animated.View
          style={[
            styles.glowOverlay,
            {
              opacity: Animated.multiply(glowAnimation, 0.1),
            },
          ]}
        />
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: deepSpaceColors.void,
    overflow: 'hidden',
  },
  backgroundLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  cosmicBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: deepSpaceColors.void,
    opacity: 0.9,
  },
  starField: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  backgroundStar: {
    position: 'absolute',
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: SignatureBlues.primary,
    shadowColor: SignatureBlues.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    position: 'relative',
  },
  patternContainer: {
    position: 'absolute',
  },
  glowOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: SignatureBlues.glow,
    pointerEvents: 'none',
  },
});

export default ConstellationMap;
