/**
 * Corp Astro UI Library - Planet Indicator Component
 * 
 * A component for displaying planetary positions and information
 * with cosmic design aesthetics.
 * 
 * Features:
 * - Cosmic styling with planet-specific colors
 * - Animated planet indicators
 * - Retrograde status display
 * - Position and angle information
 * - Smooth transitions
 * - Accessibility support
 * 
 * Design System Compliance:
 * - Uses cosmic color palette and gradients
 * - Consistent spacing and typography
 * - Proper elevation and shadows
 * - Theme-aware styling
 * 
 * @module PlanetIndicator
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
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../foundations/themes/useTheme';
import { SignatureBlues } from '../foundations/tokens/colors/SignatureBlues';
import { ProfessionalGrays } from '../foundations/tokens/colors/ProfessionalGrays';
import { spacing } from '../foundations/tokens/spacing/SpacingScale';
import { ZodiacSign } from './ZodiacCard';

/**
 * Planet types
 */
export type Planet = 
  | 'sun'
  | 'moon'
  | 'mercury'
  | 'venus'
  | 'mars'
  | 'jupiter'
  | 'saturn'
  | 'uranus'
  | 'neptune'
  | 'pluto';

/**
 * Planet data structure
 */
export interface PlanetData {
  /** Planet name */
  planet: Planet;
  /** Position in degrees (0-360) */
  position: number;
  /** Zodiac sign the planet is in */
  sign: ZodiacSign;
  /** House number (1-12) */
  house: number;
  /** Whether planet is retrograde */
  retrograde: boolean;
  /** Planet's influence strength (0-100) */
  influence: number;
  /** Additional notes */
  notes?: string;
}

/**
 * Planet indicator component props
 */
export interface PlanetIndicatorProps extends AccessibilityProps {
  /** Planet data */
  data: PlanetData;
  /** Indicator size */
  size?: 'small' | 'medium' | 'large';
  /** Whether to show detailed information */
  showDetails?: boolean;
  /** Whether indicator is interactive */
  interactive?: boolean;
  /** Whether to animate on mount */
  animate?: boolean;
  /** Press handler */
  onPress?: (planet: Planet, event: GestureResponderEvent) => void;
  /** Custom container styling */
  style?: ViewStyle;
  /** Test ID for testing */
  testID?: string;
}

/**
 * Planet information
 */
const planetInfo = {
  sun: {
    name: 'Sun',
    symbol: '☉',
    color: '#FFD700',
    secondary: '#FFA500',
    description: 'Core self, ego, vitality',
  },
  moon: {
    name: 'Moon',
    symbol: '☽',
    color: '#C0C0C0',
    secondary: '#E6E6FA',
    description: 'Emotions, intuition, subconscious',
  },
  mercury: {
    name: 'Mercury',
    symbol: '☿',
    color: '#87CEEB',
    secondary: '#ADD8E6',
    description: 'Communication, intellect, travel',
  },
  venus: {
    name: 'Venus',
    symbol: '♀',
    color: '#FFB6C1',
    secondary: '#FF69B4',
    description: 'Love, beauty, harmony',
  },
  mars: {
    name: 'Mars',
    symbol: '♂',
    color: '#FF4500',
    secondary: '#DC143C',
    description: 'Energy, action, desire',
  },
  jupiter: {
    name: 'Jupiter',
    symbol: '♃',
    color: '#DAA520',
    secondary: '#B8860B',
    description: 'Expansion, wisdom, luck',
  },
  saturn: {
    name: 'Saturn',
    symbol: '♄',
    color: '#708090',
    secondary: '#2F4F4F',
    description: 'Discipline, responsibility, limits',
  },
  uranus: {
    name: 'Uranus',
    symbol: '♅',
    color: '#40E0D0',
    secondary: '#00CED1',
    description: 'Innovation, rebellion, change',
  },
  neptune: {
    name: 'Neptune',
    symbol: '♆',
    color: '#4169E1',
    secondary: '#0000CD',
    description: 'Dreams, illusion, spirituality',
  },
  pluto: {
    name: 'Pluto',
    symbol: '♇',
    color: '#8B0000',
    secondary: '#A0522D',
    description: 'Transformation, power, rebirth',
  },
};

/**
 * Zodiac sign information
 */
const zodiacInfo = {
  aries: { name: 'Aries', symbol: '♈' },
  taurus: { name: 'Taurus', symbol: '♉' },
  gemini: { name: 'Gemini', symbol: '♊' },
  cancer: { name: 'Cancer', symbol: '♋' },
  leo: { name: 'Leo', symbol: '♌' },
  virgo: { name: 'Virgo', symbol: '♍' },
  libra: { name: 'Libra', symbol: '♎' },
  scorpio: { name: 'Scorpio', symbol: '♏' },
  sagittarius: { name: 'Sagittarius', symbol: '♐' },
  capricorn: { name: 'Capricorn', symbol: '♑' },
  aquarius: { name: 'Aquarius', symbol: '♒' },
  pisces: { name: 'Pisces', symbol: '♓' },
};

/**
 * Planet indicator component with cosmic design aesthetics
 */
export const PlanetIndicator: React.FC<PlanetIndicatorProps> = ({
  data,
  size = 'medium',
  showDetails = true,
  interactive = true,
  animate = true,
  onPress,
  style,
  testID,
  ...accessibilityProps
}) => {
  const { theme } = useTheme();
  const [scaleValue] = useState(new Animated.Value(0));
  const [pulseValue] = useState(new Animated.Value(1));
  const [influenceValue] = useState(new Animated.Value(0));

  const planet = planetInfo[data.planet];
  const sign = zodiacInfo[data.sign];

  // Get size configurations
  const getSizeConfig = () => {
    switch (size) {
      case 'small':
        return {
          containerSize: 60,
          symbolSize: 20,
          fontSize: 10,
          detailFontSize: 8,
        };
      case 'large':
        return {
          containerSize: 120,
          symbolSize: 40,
          fontSize: 16,
          detailFontSize: 12,
        };
      default:
        return {
          containerSize: 80,
          symbolSize: 28,
          fontSize: 12,
          detailFontSize: 10,
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

      // Influence animation
      Animated.timing(influenceValue, {
        toValue: data.influence,
        duration: 1000,
        useNativeDriver: false,
      }).start();

      // Pulse animation for high influence
      if (data.influence > 70) {
        Animated.loop(
          Animated.sequence([
            Animated.timing(pulseValue, {
              toValue: 1.1,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(pulseValue, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
            }),
          ])
        ).start();
      }
    } else {
      scaleValue.setValue(1);
      influenceValue.setValue(data.influence);
    }
  }, [animate, data.influence, scaleValue, pulseValue, influenceValue]);

  // Handle press
  const handlePress = (event: GestureResponderEvent) => {
    if (interactive) {
      onPress?.(data.planet, event);
    }
  };

  // Get position text
  const getPositionText = () => {
    const degrees = Math.floor(data.position);
    const minutes = Math.floor((data.position - degrees) * 60);
    return `${degrees}°${minutes}'`;
  };

  // Get influence color
  const getInfluenceColor = () => {
    if (data.influence >= 80) return '#4ECDC4';
    if (data.influence >= 60) return '#45B7D1';
    if (data.influence >= 40) return '#FFD93D';
    return '#FF6B6B';
  };

  // Render planet symbol
  const renderPlanetSymbol = () => (
    <View style={[styles.symbolContainer, { width: sizeConfig.containerSize, height: sizeConfig.containerSize }]}>
      <LinearGradient
        colors={[planet.color, planet.secondary] as [string, string]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />
      
      <Text style={[styles.symbol, { fontSize: sizeConfig.symbolSize }]}>
        {planet.symbol}
      </Text>
      
      {data.retrograde && (
        <View style={styles.retrogradeIndicator}>
          <Text style={[styles.retrogradeText, { fontSize: sizeConfig.detailFontSize }]}>
            R
          </Text>
        </View>
      )}
    </View>
  );

  // Render planet info
  const renderPlanetInfo = () => (
    <View style={styles.infoContainer}>
      <Text style={[styles.planetName, { fontSize: sizeConfig.fontSize }]}>
        {planet.name}
      </Text>
      
      <View style={styles.signContainer}>
        <Text style={[styles.signSymbol, { fontSize: sizeConfig.fontSize }]}>
          {sign.symbol}
        </Text>
        <Text style={[styles.signName, { fontSize: sizeConfig.detailFontSize }]}>
          {sign.name}
        </Text>
      </View>
      
      <Text style={[styles.house, { fontSize: sizeConfig.detailFontSize }]}>
        House {data.house}
      </Text>
    </View>
  );

  // Render influence meter
  const renderInfluenceMeter = () => {
    if (!showDetails) return null;

    return (
      <View style={styles.influenceContainer}>
        <Text style={[styles.influenceLabel, { fontSize: sizeConfig.detailFontSize }]}>
          Influence
        </Text>
        
        <View style={styles.influenceBar}>
          <View style={styles.influenceBarBackground} />
          <Animated.View
            style={[
              styles.influenceBarFill,
              {
                width: influenceValue.interpolate({
                  inputRange: [0, 100],
                  outputRange: ['0%', '100%'],
                }),
                backgroundColor: getInfluenceColor(),
              },
            ]}
          />
        </View>
        
        <Animated.Text
          style={[
            styles.influenceValue,
            {
              fontSize: sizeConfig.detailFontSize,
              color: getInfluenceColor(),
            },
          ]}
        >
          {influenceValue.interpolate({
            inputRange: [0, 100],
            outputRange: [0, data.influence],
          }).interpolate({
            inputRange: [0, 100],
            outputRange: ['0%', `${Math.round(data.influence)}%`],
          })}
        </Animated.Text>
      </View>
    );
  };

  // Render details
  const renderDetails = () => {
    if (!showDetails) return null;

    return (
      <View style={styles.detailsContainer}>
        <Text style={[styles.position, { fontSize: sizeConfig.detailFontSize }]}>
          {getPositionText()}
        </Text>
        
        {data.notes && (
          <Text style={[styles.notes, { fontSize: sizeConfig.detailFontSize }]}>
            {data.notes}
          </Text>
        )}
        
        <Text style={[styles.description, { fontSize: sizeConfig.detailFontSize }]}>
          {planet.description}
        </Text>
      </View>
    );
  };

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

  const Component = interactive ? TouchableOpacity : View;

  return (
    <Animated.View
      style={[
        styles.container,
        style,
        {
          transform: [
            { scale: scaleValue },
            { scale: pulseValue },
          ],
        },
      ]}
      testID={testID}
      accessibilityLabel={`${planet.name} in ${sign.name}, ${data.influence}% influence`}
      accessibilityHint={interactive ? 'Tap for more details' : undefined}
      {...accessibilityProps}
    >
      {renderBackground()}
      
      <Component
        style={styles.content}
        onPress={handlePress}
        activeOpacity={0.8}
        disabled={!interactive}
      >
        {renderPlanetSymbol()}
        {renderPlanetInfo()}
        {renderInfluenceMeter()}
        {renderDetails()}
      </Component>
    </Animated.View>
  );
};

/**
 * Planet indicator component styles
 */
const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'rgba(22, 33, 62, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    margin: spacing.xs,
  },
  content: {
    padding: spacing.md,
    alignItems: 'center',
  },
  symbolContainer: {
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  symbol: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  retrogradeIndicator: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  retrogradeText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  planetName: {
    fontWeight: '600',
    fontFamily: 'Futura PT',
    color: ProfessionalGrays.white,
    marginBottom: spacing.xs,
  },
  signContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  signSymbol: {
    marginRight: spacing.xs,
    color: SignatureBlues.light,
  },
  signName: {
    fontWeight: '500',
    fontFamily: 'Inter',
    color: ProfessionalGrays.light,
  },
  house: {
    fontWeight: '400',
    fontFamily: 'Inter',
    color: ProfessionalGrays.medium,
  },
  influenceContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  influenceLabel: {
    fontWeight: '500',
    fontFamily: 'Inter',
    color: ProfessionalGrays.medium,
    marginBottom: spacing.xs,
  },
  influenceBar: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: spacing.xs,
  },
  influenceBarBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  influenceBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  influenceValue: {
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  detailsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  position: {
    fontWeight: '500',
    fontFamily: 'Inter',
    color: ProfessionalGrays.light,
    marginBottom: spacing.xs,
  },
  notes: {
    fontWeight: '400',
    fontFamily: 'Inter',
    color: ProfessionalGrays.text,
    textAlign: 'center',
    marginBottom: spacing.xs,
    fontStyle: 'italic',
  },
  description: {
    fontWeight: '400',
    fontFamily: 'Inter',
    color: ProfessionalGrays.medium,
    textAlign: 'center',
    lineHeight: 14,
  },
});

export default PlanetIndicator;
