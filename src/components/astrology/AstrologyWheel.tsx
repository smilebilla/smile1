/**
 * Corp Astro UI Library - Astrology Wheel Component
 * 
 * A comprehensive zodiac wheel component for displaying astrological charts
 * with cosmic design aesthetics.
 * 
 * Features:
 * - Cosmic styling with zodiac wheel visualization
 * - Interactive zodiac signs and houses
 * - Planet position indicators
 * - Aspect lines
 * - Smooth animations and transitions
 * - Accessibility support
 * 
 * Design System Compliance:
 * - Uses cosmic color palette and gradients
 * - Consistent spacing and typography
 * - Proper elevation and shadows
 * - Theme-aware styling
 * 
 * @module AstrologyWheel
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
import { ZodiacSign } from './ZodiacCard';
import { Planet } from './PlanetIndicator';

const { width: screenWidth } = Dimensions.get('window');

/**
 * House data structure
 */
export interface HouseData {
  /** House number (1-12) */
  number: number;
  /** House sign */
  sign: ZodiacSign;
  /** House cusp degree */
  cusp: number;
  /** House description */
  description?: string;
}

/**
 * Planet position data
 */
export interface PlanetPosition {
  /** Planet */
  planet: Planet;
  /** Zodiac sign */
  sign: ZodiacSign;
  /** Degree position (0-360) */
  degree: number;
  /** House number */
  house: number;
  /** Whether retrograde */
  retrograde?: boolean;
}

/**
 * Aspect data structure
 */
export interface AspectData {
  /** First planet */
  planet1: Planet;
  /** Second planet */
  planet2: Planet;
  /** Aspect type */
  type: 'conjunction' | 'opposition' | 'trine' | 'square' | 'sextile' | 'quincunx';
  /** Aspect degree */
  degree: number;
  /** Aspect strength (0-100) */
  strength: number;
}

/**
 * Astrology wheel data structure
 */
export interface AstrologyWheelData {
  /** Houses data */
  houses: HouseData[];
  /** Planet positions */
  planets: PlanetPosition[];
  /** Aspects between planets */
  aspects?: AspectData[];
  /** Chart type */
  chartType?: 'natal' | 'transit' | 'synastry' | 'composite';
  /** Chart title */
  title?: string;
  /** Chart date */
  date?: string;
}

/**
 * Astrology wheel component props
 */
export interface AstrologyWheelProps extends AccessibilityProps {
  /** Wheel data */
  data: AstrologyWheelData;
  /** Wheel size */
  size?: 'small' | 'medium' | 'large';
  /** Whether to show aspects */
  showAspects?: boolean;
  /** Whether to show house numbers */
  showHouses?: boolean;
  /** Whether wheel is interactive */
  interactive?: boolean;
  /** Whether to animate on mount */
  animate?: boolean;
  /** Planet press handler */
  onPlanetPress?: (planet: Planet, position: PlanetPosition) => void;
  /** Sign press handler */
  onSignPress?: (sign: ZodiacSign) => void;
  /** House press handler */
  onHousePress?: (house: HouseData) => void;
  /** Custom container styling */
  style?: ViewStyle;
  /** Test ID for testing */
  testID?: string;
}

/**
 * Zodiac sign information
 */
const zodiacInfo = {
  aries: { name: 'Aries', symbol: '♈', color: '#FF6B6B', startDegree: 0 },
  taurus: { name: 'Taurus', symbol: '♉', color: '#4ECDC4', startDegree: 30 },
  gemini: { name: 'Gemini', symbol: '♊', color: '#45B7D1', startDegree: 60 },
  cancer: { name: 'Cancer', symbol: '♋', color: '#96CEB4', startDegree: 90 },
  leo: { name: 'Leo', symbol: '♌', color: '#FF8787', startDegree: 120 },
  virgo: { name: 'Virgo', symbol: '♍', color: '#6BCF7F', startDegree: 150 },
  libra: { name: 'Libra', symbol: '♎', color: '#5BC0DE', startDegree: 180 },
  scorpio: { name: 'Scorpio', symbol: '♏', color: '#FF6B9D', startDegree: 210 },
  sagittarius: { name: 'Sagittarius', symbol: '♐', color: '#FFD93D', startDegree: 240 },
  capricorn: { name: 'Capricorn', symbol: '♑', color: '#4ECDC4', startDegree: 270 },
  aquarius: { name: 'Aquarius', symbol: '♒', color: '#45B7D1', startDegree: 300 },
  pisces: { name: 'Pisces', symbol: '♓', color: '#96CEB4', startDegree: 330 },
};

/**
 * Planet information
 */
const planetInfo = {
  sun: { name: 'Sun', symbol: '☉', color: '#FFD700', size: 16 },
  moon: { name: 'Moon', symbol: '☽', color: '#C0C0C0', size: 14 },
  mercury: { name: 'Mercury', symbol: '☿', color: '#87CEEB', size: 10 },
  venus: { name: 'Venus', symbol: '♀', color: '#FFB6C1', size: 12 },
  mars: { name: 'Mars', symbol: '♂', color: '#FF4500', size: 12 },
  jupiter: { name: 'Jupiter', symbol: '♃', color: '#DAA520', size: 14 },
  saturn: { name: 'Saturn', symbol: '♄', color: '#708090', size: 14 },
  uranus: { name: 'Uranus', symbol: '♅', color: '#40E0D0', size: 12 },
  neptune: { name: 'Neptune', symbol: '♆', color: '#4169E1', size: 12 },
  pluto: { name: 'Pluto', symbol: '♇', color: '#8B0000', size: 10 },
};

/**
 * Aspect colors
 */
const aspectColors = {
  conjunction: '#FFD700',
  opposition: '#FF6B6B',
  trine: '#4ECDC4',
  square: '#FF8787',
  sextile: '#45B7D1',
  quincunx: '#96CEB4',
};

/**
 * Astrology wheel component with cosmic design aesthetics
 */
export const AstrologyWheel: React.FC<AstrologyWheelProps> = ({
  data,
  size = 'medium',
  showAspects = true,
  showHouses = true,
  interactive = true,
  animate = true,
  onPlanetPress,
  onSignPress,
  onHousePress,
  style,
  testID,
  ...accessibilityProps
}) => {
  const { theme } = useTheme();
  const [scaleValue] = useState(new Animated.Value(0));
  const [rotateValue] = useState(new Animated.Value(0));
  const [planetValues] = useState(
    data.planets.map(() => new Animated.Value(0))
  );

  // Get size configurations
  const getSizeConfig = () => {
    const maxSize = Math.min(screenWidth * 0.9, 400);
    switch (size) {
      case 'small':
        return {
          wheelSize: Math.min(maxSize, 200),
          outerRadius: Math.min(maxSize, 200) / 2,
          innerRadius: Math.min(maxSize, 200) / 4,
          fontSize: 10,
          symbolSize: 14,
        };
      case 'large':
        return {
          wheelSize: maxSize,
          outerRadius: maxSize / 2,
          innerRadius: maxSize / 4,
          fontSize: 14,
          symbolSize: 20,
        };
      default:
        return {
          wheelSize: Math.min(maxSize, 300),
          outerRadius: Math.min(maxSize, 300) / 2,
          innerRadius: Math.min(maxSize, 300) / 4,
          fontSize: 12,
          symbolSize: 16,
        };
    }
  };

  const sizeConfig = getSizeConfig();

  // Animate on mount
  useEffect(() => {
    if (animate) {
      // Scale animation
      Animated.spring(scaleValue, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }).start();

      // Rotation animation
      Animated.loop(
        Animated.timing(rotateValue, {
          toValue: 1,
          duration: 60000, // 1 minute rotation
          useNativeDriver: true,
        })
      ).start();

      // Planet animations
      const planetAnimations = planetValues.map((animatedValue, index) =>
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          delay: index * 100,
          useNativeDriver: true,
        })
      );

      Animated.stagger(100, planetAnimations).start();
    } else {
      scaleValue.setValue(1);
      planetValues.forEach(value => value.setValue(1));
    }
  }, [animate, scaleValue, rotateValue, planetValues]);

  // Convert degree to radians
  const degToRad = (degrees: number) => (degrees * Math.PI) / 180;

  // Get position on circle
  const getPositionOnCircle = (degree: number, radius: number) => {
    const adjustedDegree = degree - 90; // Start from top
    const radian = degToRad(adjustedDegree);
    return {
      x: radius * Math.cos(radian),
      y: radius * Math.sin(radian),
    };
  };

  // Render zodiac signs
  const renderZodiacSigns = () => {
    const signs = Object.entries(zodiacInfo);
    const radius = sizeConfig.outerRadius - 30;

    return signs.map(([key, sign]) => {
      const position = getPositionOnCircle(sign.startDegree + 15, radius);
      
      return (
        <TouchableOpacity
          key={key}
          style={[
            styles.signContainer,
            {
              left: sizeConfig.outerRadius + position.x - 15,
              top: sizeConfig.outerRadius + position.y - 15,
              width: 30,
              height: 30,
            },
          ]}
          onPress={() => onSignPress?.(key as ZodiacSign)}
          disabled={!interactive}
        >
          <Text style={[styles.signSymbol, { fontSize: sizeConfig.symbolSize, color: sign.color }]}>
            {sign.symbol}
          </Text>
        </TouchableOpacity>
      );
    });
  };

  // Render houses
  const renderHouses = () => {
    if (!showHouses) return null;

    return data.houses.map((house, index) => {
      const position = getPositionOnCircle(house.cusp, sizeConfig.innerRadius + 20);
      
      return (
        <TouchableOpacity
          key={house.number}
          style={[
            styles.houseContainer,
            {
              left: sizeConfig.outerRadius + position.x - 12,
              top: sizeConfig.outerRadius + position.y - 12,
              width: 24,
              height: 24,
            },
          ]}
          onPress={() => onHousePress?.(house)}
          disabled={!interactive}
        >
          <Text style={[styles.houseNumber, { fontSize: sizeConfig.fontSize }]}>
            {house.number}
          </Text>
        </TouchableOpacity>
      );
    });
  };

  // Render planets
  const renderPlanets = () => {
    return data.planets.map((planetPos, index) => {
      const planet = planetInfo[planetPos.planet];
      const radius = sizeConfig.outerRadius - 60;
      const position = getPositionOnCircle(planetPos.degree, radius);
      
      return (
        <Animated.View
          key={`${planetPos.planet}-${index}`}
          style={[
            styles.planetContainer,
            {
              left: sizeConfig.outerRadius + position.x - planet.size / 2,
              top: sizeConfig.outerRadius + position.y - planet.size / 2,
              width: planet.size,
              height: planet.size,
              transform: [{ scale: planetValues[index] }],
            },
          ]}
        >
          <TouchableOpacity
            style={[
              styles.planetButton,
              {
                backgroundColor: planet.color,
                borderRadius: planet.size / 2,
                width: planet.size,
                height: planet.size,
              },
            ]}
            onPress={(event) => onPlanetPress?.(planetPos.planet, planetPos)}
            disabled={!interactive}
          >
            <Text style={[styles.planetSymbol, { fontSize: planet.size * 0.6 }]}>
              {planet.symbol}
            </Text>
            
            {planetPos.retrograde && (
              <View style={styles.retrogradeIndicator}>
                <Text style={styles.retrogradeR}>R</Text>
              </View>
            )}
          </TouchableOpacity>
        </Animated.View>
      );
    });
  };

  // Render aspects
  const renderAspects = () => {
    if (!showAspects || !data.aspects) return null;

    return data.aspects.map((aspect, index) => {
      const planet1Pos = data.planets.find(p => p.planet === aspect.planet1);
      const planet2Pos = data.planets.find(p => p.planet === aspect.planet2);
      
      if (!planet1Pos || !planet2Pos) return null;

      const radius = sizeConfig.outerRadius - 60;
      const pos1 = getPositionOnCircle(planet1Pos.degree, radius);
      const pos2 = getPositionOnCircle(planet2Pos.degree, radius);

      const lineLength = Math.sqrt(
        Math.pow(pos2.x - pos1.x, 2) + Math.pow(pos2.y - pos1.y, 2)
      );
      const angle = Math.atan2(pos2.y - pos1.y, pos2.x - pos1.x) * (180 / Math.PI);

      return (
        <View
          key={`aspect-${index}`}
          style={[
            styles.aspectLine,
            {
              left: sizeConfig.outerRadius + pos1.x,
              top: sizeConfig.outerRadius + pos1.y,
              width: lineLength,
              height: 2,
              backgroundColor: aspectColors[aspect.type],
              opacity: aspect.strength / 100,
              transform: [{ rotate: `${angle}deg` }],
            },
          ]}
        />
      );
    });
  };

  // Render wheel rings
  const renderWheelRings = () => (
    <>
      {/* Outer ring */}
      <View
        style={[
          styles.wheelRing,
          {
            width: sizeConfig.outerRadius * 2,
            height: sizeConfig.outerRadius * 2,
            borderRadius: sizeConfig.outerRadius,
            borderWidth: 2,
            borderColor: 'rgba(255, 255, 255, 0.3)',
          },
        ]}
      />
      
      {/* Inner ring */}
      <View
        style={[
          styles.wheelRing,
          {
            width: sizeConfig.innerRadius * 2,
            height: sizeConfig.innerRadius * 2,
            borderRadius: sizeConfig.innerRadius,
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.2)',
          },
        ]}
      />
      
      {/* Zodiac ring */}
      <View
        style={[
          styles.wheelRing,
          {
            width: (sizeConfig.outerRadius - 15) * 2,
            height: (sizeConfig.outerRadius - 15) * 2,
            borderRadius: sizeConfig.outerRadius - 15,
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.1)',
          },
        ]}
      />
    </>
  );

  // Render center content
  const renderCenterContent = () => (
    <View style={styles.centerContent}>
      {data.title && (
        <Text style={[styles.chartTitle, { fontSize: sizeConfig.fontSize }]}>
          {data.title}
        </Text>
      )}
      {data.date && (
        <Text style={[styles.chartDate, { fontSize: sizeConfig.fontSize - 2 }]}>
          {data.date}
        </Text>
      )}
      {data.chartType && (
        <Text style={[styles.chartType, { fontSize: sizeConfig.fontSize - 2 }]}>
          {data.chartType.toUpperCase()}
        </Text>
      )}
    </View>
  );

  // Render background
  const renderBackground = () => (
    <LinearGradient
      colors={[
        'rgba(26, 26, 46, 0.95)',
        'rgba(22, 33, 62, 0.9)',
        'rgba(15, 52, 96, 0.85)',
      ]}
      locations={[0, 0.5, 1]}
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
          width: sizeConfig.wheelSize + 40,
          height: sizeConfig.wheelSize + 40,
          transform: [{ scale: scaleValue }],
        },
        style,
      ]}
      testID={testID}
      accessibilityLabel="Astrology wheel chart"
      {...accessibilityProps}
    >
      {renderBackground()}
      
      <Animated.View
        style={[
          styles.wheelContainer,
          {
            width: sizeConfig.wheelSize,
            height: sizeConfig.wheelSize,
            transform: [
              {
                rotate: rotateValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg'],
                }),
              },
            ],
          },
        ]}
      >
        {renderWheelRings()}
        {renderZodiacSigns()}
        {renderHouses()}
        {renderPlanets()}
        {renderAspects()}
        {renderCenterContent()}
      </Animated.View>
    </Animated.View>
  );
};

/**
 * Astrology wheel component styles
 */
const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: 'rgba(22, 33, 62, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'center',
    margin: spacing.md,
  },
  wheelContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wheelRing: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -1,
    marginLeft: -1,
  },
  signContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  signSymbol: {
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  houseContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  houseNumber: {
    fontWeight: '600',
    fontFamily: 'Inter',
    color: ProfessionalGrays.light,
  },
  planetContainer: {
    position: 'absolute',
  },
  planetButton: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  planetSymbol: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  retrogradeIndicator: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF6B6B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  retrogradeR: {
    fontSize: 6,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  aspectLine: {
    position: 'absolute',
    transformOrigin: 'left center',
  },
  centerContent: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(22, 33, 62, 0.8)',
    borderRadius: 50,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  chartTitle: {
    fontWeight: '600',
    fontFamily: 'Futura PT',
    color: ProfessionalGrays.white,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  chartDate: {
    fontWeight: '400',
    fontFamily: 'Inter',
    color: ProfessionalGrays.medium,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  chartType: {
    fontWeight: '500',
    fontFamily: 'Inter',
    color: SignatureBlues.light,
    textAlign: 'center',
    letterSpacing: 1,
  },
});

export default AstrologyWheel;
