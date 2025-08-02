/**
 * Corp Astro UI Library - Star Map Component
 * 
 * A component for displaying star positions and constellations
 * with cosmic design aesthetics.
 * 
 * Features:
 * - Cosmic styling with star field visualization
 * - Interactive star and constellation display
 * - Magnitude-based star brightness
 * - Constellation lines
 * - Smooth animations and twinkling effects
 * - Accessibility support
 * 
 * Design System Compliance:
 * - Uses cosmic color palette and gradients
 * - Consistent spacing and typography
 * - Proper elevation and shadows
 * - Theme-aware styling
 * 
 * @module StarMap
 * @version 1.0.0
 * @since 2024
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  AccessibilityProps,
  Animated,
  TouchableOpacity,
  GestureResponderEvent,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../foundations/themes/useTheme';
import { SignatureBlues } from '../foundations/tokens/colors/SignatureBlues';
import { ProfessionalGrays } from '../foundations/tokens/colors/ProfessionalGrays';
import { spacing } from '../foundations/tokens/spacing/SpacingScale';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

/**
 * Star data structure
 */
export interface StarData {
  /** Star identifier */
  id: string;
  /** Star name */
  name?: string;
  /** X coordinate (0-1) */
  x: number;
  /** Y coordinate (0-1) */
  y: number;
  /** Star magnitude (lower = brighter) */
  magnitude: number;
  /** Star color */
  color?: string;
  /** Constellation this star belongs to */
  constellation?: string;
}

/**
 * Constellation data structure
 */
export interface ConstellationData {
  /** Constellation identifier */
  id: string;
  /** Constellation name */
  name: string;
  /** Star connections (star IDs) */
  connections: string[][];
  /** Constellation description */
  description?: string;
  /** Constellation mythology */
  mythology?: string;
}

/**
 * Star map data structure
 */
export interface StarMapData {
  /** Stars in the map */
  stars: StarData[];
  /** Constellations */
  constellations: ConstellationData[];
  /** Map title */
  title?: string;
  /** Map date/time */
  datetime?: string;
  /** Viewing location */
  location?: string;
}

/**
 * Star map component props
 */
export interface StarMapProps extends AccessibilityProps {
  /** Star map data */
  data: StarMapData;
  /** Map size */
  size?: 'small' | 'medium' | 'large' | 'fullscreen';
  /** Whether to show constellation lines */
  showConstellations?: boolean;
  /** Whether to show star names */
  showStarNames?: boolean;
  /** Whether to show constellation names */
  showConstellationNames?: boolean;
  /** Whether stars twinkle */
  twinkling?: boolean;
  /** Whether map is interactive */
  interactive?: boolean;
  /** Star press handler */
  onStarPress?: (star: StarData) => void;
  /** Constellation press handler */
  onConstellationPress?: (constellation: ConstellationData) => void;
  /** Custom container styling */
  style?: ViewStyle;
  /** Test ID for testing */
  testID?: string;
}

/**
 * Star map component with cosmic design aesthetics
 */
export const StarMap: React.FC<StarMapProps> = ({
  data,
  size = 'medium',
  showConstellations = true,
  showStarNames = false,
  showConstellationNames = true,
  twinkling = true,
  interactive = true,
  onStarPress,
  onConstellationPress,
  style,
  testID,
  ...accessibilityProps
}) => {
  const { theme } = useTheme();
  const [twinkleValues] = useState(
    data.stars.map(() => new Animated.Value(1))
  );
  const [scaleValue] = useState(new Animated.Value(0));

  // Get size configurations
  const getSizeConfig = () => {
    switch (size) {
      case 'small':
        return {
          width: 200,
          height: 200,
          starSize: 2,
          fontSize: 8,
        };
      case 'large':
        return {
          width: 400,
          height: 400,
          starSize: 6,
          fontSize: 12,
        };
      case 'fullscreen':
        return {
          width: screenWidth,
          height: screenHeight,
          starSize: 8,
          fontSize: 14,
        };
      default:
        return {
          width: 300,
          height: 300,
          starSize: 4,
          fontSize: 10,
        };
    }
  };

  const sizeConfig = getSizeConfig();

  // Start twinkling animation
  useEffect(() => {
    // Scale animation
    Animated.spring(scaleValue, {
      toValue: 1,
      tension: 50,
      friction: 8,
      useNativeDriver: true,
    }).start();

    if (twinkling) {
      const startTwinkling = () => {
        twinkleValues.forEach((value, index) => {
          const delay = Math.random() * 2000;
          const duration = 1000 + Math.random() * 2000;
          
          Animated.loop(
            Animated.sequence([
              Animated.timing(value, {
                toValue: 0.3 + Math.random() * 0.7,
                duration: duration / 2,
                useNativeDriver: false,
              }),
              Animated.timing(value, {
                toValue: 1,
                duration: duration / 2,
                useNativeDriver: false,
              }),
            ])
          ).start();
        });
      };

      startTwinkling();
    }
  }, [twinkling, twinkleValues, scaleValue]);

  // Get star size based on magnitude
  const getStarSize = (magnitude: number) => {
    const baseSize = sizeConfig.starSize;
    // Brighter stars (lower magnitude) are larger
    const sizeFactor = Math.max(0.3, 2 - magnitude / 2);
    return baseSize * sizeFactor;
  };

  // Get star opacity based on magnitude
  const getStarOpacity = (magnitude: number) => {
    return Math.max(0.3, 1 - magnitude / 6);
  };

  // Get star color based on magnitude and type
  const getStarColor = (star: StarData) => {
    if (star.color) return star.color;
    
    // Default color based on magnitude
    if (star.magnitude <= 1) return '#FFD700'; // Gold for bright stars
    if (star.magnitude <= 2) return '#FFFFFF'; // White for medium stars
    if (star.magnitude <= 3) return '#E6E6FA'; // Light purple for dim stars
    return '#C0C0C0'; // Silver for very dim stars
  };

  // Find star by ID
  const findStar = (id: string) => data.stars.find(star => star.id === id);

  // Render stars
  const renderStars = () => {
    return data.stars.map((star, index) => {
      const starSize = getStarSize(star.magnitude);
      const starOpacity = getStarOpacity(star.magnitude);
      const starColor = getStarColor(star);
      
      return (
        <Animated.View
          key={star.id}
          style={[
            styles.star,
            {
              left: star.x * sizeConfig.width - starSize / 2,
              top: star.y * sizeConfig.height - starSize / 2,
              width: starSize,
              height: starSize,
              borderRadius: starSize / 2,
              backgroundColor: starColor,
              opacity: twinkling 
                ? Animated.multiply(twinkleValues[index], starOpacity)
                : starOpacity,
              shadowColor: starColor,
              shadowOpacity: twinkling 
                ? Animated.multiply(twinkleValues[index], 0.8)
                : 0.8,
              shadowRadius: starSize,
              elevation: 3,
            },
          ]}
        >
          {interactive && (
            <TouchableOpacity
              style={[
                styles.starTouchable,
                {
                  width: Math.max(starSize, 20),
                  height: Math.max(starSize, 20),
                  borderRadius: Math.max(starSize, 20) / 2,
                  left: (starSize - Math.max(starSize, 20)) / 2,
                  top: (starSize - Math.max(starSize, 20)) / 2,
                },
              ]}
              onPress={() => onStarPress?.(star)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            />
          )}
          
          {showStarNames && star.name && (
            <Text
              style={[
                styles.starName,
                {
                  fontSize: sizeConfig.fontSize,
                  left: starSize + 5,
                  top: -sizeConfig.fontSize / 2,
                  color: starColor,
                },
              ]}
            >
              {star.name}
            </Text>
          )}
        </Animated.View>
      );
    });
  };

  // Render constellation lines
  const renderConstellationLines = () => {
    if (!showConstellations) return null;

    return data.constellations.map((constellation) => {
      return constellation.connections.map((connection, index) => {
        const star1 = findStar(connection[0]);
        const star2 = findStar(connection[1]);
        
        if (!star1 || !star2) return null;

        const x1 = star1.x * sizeConfig.width;
        const y1 = star1.y * sizeConfig.height;
        const x2 = star2.x * sizeConfig.width;
        const y2 = star2.y * sizeConfig.height;

        const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

        return (
          <View
            key={`${constellation.id}-${index}`}
            style={[
              styles.constellationLine,
              {
                left: x1,
                top: y1,
                width: length,
                height: 1,
                transform: [{ rotate: `${angle}deg` }],
                backgroundColor: 'rgba(135, 206, 235, 0.4)',
              },
            ]}
          />
        );
      });
    });
  };

  // Render constellation names
  const renderConstellationNames = () => {
    if (!showConstellationNames) return null;

    return data.constellations.map((constellation) => {
      // Find center of constellation
      const stars = constellation.connections.flat()
        .map(id => findStar(id))
        .filter(Boolean) as StarData[];
      
      if (stars.length === 0) return null;

      const centerX = stars.reduce((sum, star) => sum + star.x, 0) / stars.length;
      const centerY = stars.reduce((sum, star) => sum + star.y, 0) / stars.length;

      return (
        <TouchableOpacity
          key={`name-${constellation.id}`}
          style={[
            styles.constellationName,
            {
              left: centerX * sizeConfig.width - 50,
              top: centerY * sizeConfig.height - sizeConfig.fontSize,
              width: 100,
              height: sizeConfig.fontSize * 2,
            },
          ]}
          onPress={() => onConstellationPress?.(constellation)}
          disabled={!interactive}
        >
          <Text
            style={[
              styles.constellationText,
              {
                fontSize: sizeConfig.fontSize,
                color: SignatureBlues.light,
              },
            ]}
          >
            {constellation.name}
          </Text>
        </TouchableOpacity>
      );
    });
  };

  // Render info panel
  const renderInfoPanel = () => {
    if (!data.title && !data.datetime && !data.location) return null;

    return (
      <View style={styles.infoPanel}>
        {data.title && (
          <Text style={[styles.infoTitle, { fontSize: sizeConfig.fontSize + 2 }]}>
            {data.title}
          </Text>
        )}
        {data.datetime && (
          <Text style={[styles.infoText, { fontSize: sizeConfig.fontSize }]}>
            {data.datetime}
          </Text>
        )}
        {data.location && (
          <Text style={[styles.infoText, { fontSize: sizeConfig.fontSize }]}>
            {data.location}
          </Text>
        )}
      </View>
    );
  };

  // Render background
  const renderBackground = () => (
    <LinearGradient
      colors={[
        '#000011',
        '#000033',
        '#001144',
        '#002266',
      ]}
      locations={[0, 0.3, 0.7, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={StyleSheet.absoluteFillObject}
    />
  );

  return (
    <Animated.View
      style={[
        styles.container,
        {
          width: sizeConfig.width,
          height: sizeConfig.height,
          transform: [{ scale: scaleValue }],
        },
        style,
      ]}
      testID={testID}
      accessibilityLabel={`Star map showing ${data.stars.length} stars and ${data.constellations.length} constellations`}
      {...accessibilityProps}
    >
      {renderBackground()}
      
      <View style={styles.mapContainer}>
        {renderStars()}
        {renderConstellationLines()}
        {renderConstellationNames()}
        {renderInfoPanel()}
      </View>
    </Animated.View>
  );
};

/**
 * Star map component styles
 */
const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#000011',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
    margin: spacing.sm,
  },
  mapContainer: {
    position: 'relative',
    flex: 1,
  },
  star: {
    position: 'absolute',
    shadowOffset: { width: 0, height: 0 },
  },
  starTouchable: {
    position: 'absolute',
  },
  starName: {
    position: 'absolute',
    fontWeight: '400',
    fontFamily: 'Inter',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  constellationLine: {
    position: 'absolute',
    transformOrigin: 'left center',
    opacity: 0.6,
  },
  constellationName: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 17, 0.8)',
    borderRadius: 8,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  constellationText: {
    fontWeight: '500',
    fontFamily: 'Inter',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  infoPanel: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    backgroundColor: 'rgba(0, 0, 17, 0.9)',
    borderRadius: 12,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    minWidth: 120,
  },
  infoTitle: {
    fontWeight: '600',
    fontFamily: 'Futura PT',
    color: ProfessionalGrays.white,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  infoText: {
    fontWeight: '400',
    fontFamily: 'Inter',
    color: ProfessionalGrays.light,
    textAlign: 'center',
    marginBottom: 2,
  },
});

export default StarMap;
