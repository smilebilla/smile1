/**
 * Corp Astro UI Library - Compatibility Chart Component
 * 
 * A chart component for displaying relationship compatibility between zodiac signs
 * with cosmic design aesthetics.
 * 
 * Features:
 * - Cosmic styling with gradient visualizations
 * - Compatibility scoring and breakdown
 * - Interactive compatibility rings
 * - Detailed compatibility aspects
 * - Smooth animations
 * - Accessibility support
 * 
 * Design System Compliance:
 * - Uses cosmic color palette and gradients
 * - Consistent spacing and typography
 * - Proper elevation and shadows
 * - Theme-aware styling
 * 
 * @module CompatibilityChart
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
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../foundations/themes/useTheme';
import { SignatureBlues } from '../foundations/tokens/colors/SignatureBlues';
import { ProfessionalGrays } from '../foundations/tokens/colors/ProfessionalGrays';
import { spacing } from '../foundations/tokens/spacing/SpacingScale';
import { ZodiacSign } from './ZodiacCard';

const { width: screenWidth } = Dimensions.get('window');

/**
 * Compatibility aspects
 */
export type CompatibilityAspect = 'love' | 'friendship' | 'communication' | 'trust' | 'values' | 'overall';

/**
 * Compatibility score structure
 */
export interface CompatibilityScore {
  /** Aspect name */
  aspect: CompatibilityAspect;
  /** Score percentage (0-100) */
  score: number;
  /** Descriptive text */
  description: string;
}

/**
 * Compatibility data structure
 */
export interface CompatibilityData {
  /** First zodiac sign */
  sign1: ZodiacSign;
  /** Second zodiac sign */
  sign2: ZodiacSign;
  /** Overall compatibility score */
  overallScore: number;
  /** Detailed scores by aspect */
  scores: CompatibilityScore[];
  /** Key strengths */
  strengths: string[];
  /** Key challenges */
  challenges: string[];
  /** Compatibility description */
  description: string;
}

/**
 * Compatibility chart component props
 */
export interface CompatibilityChartProps extends AccessibilityProps {
  /** Compatibility data */
  data: CompatibilityData;
  /** Chart size */
  size?: 'small' | 'medium' | 'large';
  /** Whether to show detailed breakdown */
  showDetails?: boolean;
  /** Whether to animate on mount */
  animate?: boolean;
  /** Custom container styling */
  style?: ViewStyle;
  /** Test ID for testing */
  testID?: string;
}

/**
 * Zodiac signs info
 */
const zodiacInfo = {
  aries: { name: 'Aries', symbol: '♈', element: 'fire', color: '#FF6B6B' },
  taurus: { name: 'Taurus', symbol: '♉', element: 'earth', color: '#4ECDC4' },
  gemini: { name: 'Gemini', symbol: '♊', element: 'air', color: '#45B7D1' },
  cancer: { name: 'Cancer', symbol: '♋', element: 'water', color: '#96CEB4' },
  leo: { name: 'Leo', symbol: '♌', element: 'fire', color: '#FF8787' },
  virgo: { name: 'Virgo', symbol: '♍', element: 'earth', color: '#6BCF7F' },
  libra: { name: 'Libra', symbol: '♎', element: 'air', color: '#5BC0DE' },
  scorpio: { name: 'Scorpio', symbol: '♏', element: 'water', color: '#FF6B9D' },
  sagittarius: { name: 'Sagittarius', symbol: '♐', element: 'fire', color: '#FFD93D' },
  capricorn: { name: 'Capricorn', symbol: '♑', element: 'earth', color: '#4ECDC4' },
  aquarius: { name: 'Aquarius', symbol: '♒', element: 'air', color: '#45B7D1' },
  pisces: { name: 'Pisces', symbol: '♓', element: 'water', color: '#96CEB4' },
};

/**
 * Compatibility level colors
 */
const compatibilityColors = {
  excellent: { primary: '#4ECDC4', secondary: '#6BCF7F', glow: 'rgba(78, 205, 196, 0.3)' },
  good: { primary: '#45B7D1', secondary: '#5BC0DE', glow: 'rgba(69, 183, 209, 0.3)' },
  average: { primary: '#FFD93D', secondary: '#FFE066', glow: 'rgba(255, 217, 61, 0.3)' },
  challenging: { primary: '#FF6B6B', secondary: '#FF8787', glow: 'rgba(255, 107, 107, 0.3)' },
};

/**
 * Compatibility chart component with cosmic design aesthetics
 */
export const CompatibilityChart: React.FC<CompatibilityChartProps> = ({
  data,
  size = 'medium',
  showDetails = true,
  animate = true,
  style,
  testID,
  ...accessibilityProps
}) => {
  const { theme } = useTheme();
  const [animatedValues] = useState(
    data.scores.map(() => new Animated.Value(0))
  );
  const [overallAnimated] = useState(new Animated.Value(0));
  const [scaleValue] = useState(new Animated.Value(0));

  const sign1Info = zodiacInfo[data.sign1];
  const sign2Info = zodiacInfo[data.sign2];

  // Get size configurations
  const getSizeConfig = () => {
    switch (size) {
      case 'small':
        return { chartSize: 120, fontSize: 12, symbolSize: 24 };
      case 'large':
        return { chartSize: 200, fontSize: 16, symbolSize: 40 };
      default:
        return { chartSize: 160, fontSize: 14, symbolSize: 32 };
    }
  };

  const sizeConfig = getSizeConfig();

  // Get compatibility level
  const getCompatibilityLevel = (score: number) => {
    if (score >= 85) return 'excellent';
    if (score >= 70) return 'good';
    if (score >= 50) return 'average';
    return 'challenging';
  };

  const compatibilityLevel = getCompatibilityLevel(data.overallScore);
  const levelColors = compatibilityColors[compatibilityLevel];

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

      // Overall score animation
      Animated.timing(overallAnimated, {
        toValue: data.overallScore,
        duration: 1000,
        useNativeDriver: false,
      }).start();

      // Individual scores animation
      const animations = animatedValues.map((animatedValue, index) =>
        Animated.timing(animatedValue, {
          toValue: data.scores[index].score,
          duration: 800,
          delay: index * 100,
          useNativeDriver: false,
        })
      );

      Animated.stagger(100, animations).start();
    } else {
      scaleValue.setValue(1);
      overallAnimated.setValue(data.overallScore);
      animatedValues.forEach((value, index) => {
        value.setValue(data.scores[index].score);
      });
    }
  }, [animate, data.overallScore, data.scores, animatedValues, overallAnimated, scaleValue]);

  // Render compatibility ring
  const renderCompatibilityRing = () => {
    const radius = sizeConfig.chartSize / 2 - 20;
    const circumference = 2 * Math.PI * radius;
    const strokeWidth = 8;

    return (
      <View style={[styles.chartContainer, { width: sizeConfig.chartSize, height: sizeConfig.chartSize }]}>
        <View style={styles.ring}>
          {/* Background ring */}
          <View
            style={[
              styles.ringBackground,
              {
                width: radius * 2,
                height: radius * 2,
                borderRadius: radius,
                borderWidth: strokeWidth,
                borderColor: 'rgba(255, 255, 255, 0.1)',
              },
            ]}
          />
          
          {/* Progress ring */}
          <Animated.View
            style={[
              styles.ringProgress,
              {
                width: radius * 2,
                height: radius * 2,
                borderRadius: radius,
                borderWidth: strokeWidth,
                borderColor: levelColors.primary,
                transform: [
                  {
                    rotate: overallAnimated.interpolate({
                      inputRange: [0, 100],
                      outputRange: ['-90deg', '180deg'],
                    }),
                  },
                ],
              },
            ]}
          />
        </View>
        
        {/* Center content */}
        <View style={styles.centerContent}>
          <Animated.Text
            style={[
              styles.overallScore,
              {
                fontSize: sizeConfig.fontSize + 8,
                color: levelColors.primary,
              },
            ]}
          >
            {overallAnimated.interpolate({
              inputRange: [0, 100],
              outputRange: [0, data.overallScore],
            }).interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', `${Math.round(data.overallScore)}%`],
            })}
          </Animated.Text>
          <Text style={[styles.compatibilityLabel, { fontSize: sizeConfig.fontSize - 2 }]}>
            Compatibility
          </Text>
        </View>
      </View>
    );
  };

  // Render zodiac signs
  const renderZodiacSigns = () => (
    <View style={styles.signsContainer}>
      <View style={styles.signContainer}>
        <View style={[styles.signCircle, { backgroundColor: sign1Info.color }]}>
          <Text style={[styles.signSymbol, { fontSize: sizeConfig.symbolSize }]}>
            {sign1Info.symbol}
          </Text>
        </View>
        <Text style={[styles.signName, { fontSize: sizeConfig.fontSize }]}>
          {sign1Info.name}
        </Text>
      </View>
      
      <View style={styles.connector}>
        <LinearGradient
          colors={[sign1Info.color, sign2Info.color] as [string, string]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.connectorLine}
        />
        <View style={styles.heartContainer}>
          <Text style={[styles.heartSymbol, { color: levelColors.primary }]}>💫</Text>
        </View>
      </View>
      
      <View style={styles.signContainer}>
        <View style={[styles.signCircle, { backgroundColor: sign2Info.color }]}>
          <Text style={[styles.signSymbol, { fontSize: sizeConfig.symbolSize }]}>
            {sign2Info.symbol}
          </Text>
        </View>
        <Text style={[styles.signName, { fontSize: sizeConfig.fontSize }]}>
          {sign2Info.name}
        </Text>
      </View>
    </View>
  );

  // Render score breakdown
  const renderScoreBreakdown = () => {
    if (!showDetails) return null;

    return (
      <View style={styles.breakdown}>
        <Text style={styles.breakdownTitle}>Compatibility Breakdown</Text>
        
        {data.scores.map((scoreData, index) => (
          <View key={scoreData.aspect} style={styles.scoreItem}>
            <View style={styles.scoreHeader}>
              <Text style={styles.aspectName}>
                {scoreData.aspect.charAt(0).toUpperCase() + scoreData.aspect.slice(1)}
              </Text>
              <Animated.Text style={styles.scoreValue}>
                {animatedValues[index].interpolate({
                  inputRange: [0, 100],
                  outputRange: [0, scoreData.score],
                }).interpolate({
                  inputRange: [0, 100],
                  outputRange: ['0%', `${Math.round(scoreData.score)}%`],
                })}
              </Animated.Text>
            </View>
            
            <View style={styles.scoreBar}>
              <View style={styles.scoreBarBackground} />
              <Animated.View
                style={[
                  styles.scoreBarFill,
                  {
                    width: animatedValues[index].interpolate({
                      inputRange: [0, 100],
                      outputRange: ['0%', `${scoreData.score}%`],
                    }),
                    backgroundColor: getCompatibilityLevel(scoreData.score) === 'excellent' 
                      ? compatibilityColors.excellent.primary
                      : getCompatibilityLevel(scoreData.score) === 'good'
                      ? compatibilityColors.good.primary
                      : getCompatibilityLevel(scoreData.score) === 'average'
                      ? compatibilityColors.average.primary
                      : compatibilityColors.challenging.primary,
                  },
                ]}
              />
            </View>
            
            <Text style={styles.scoreDescription}>{scoreData.description}</Text>
          </View>
        ))}
      </View>
    );
  };

  // Render highlights
  const renderHighlights = () => {
    if (!showDetails) return null;

    return (
      <View style={styles.highlights}>
        {data.strengths.length > 0 && (
          <View style={styles.highlightSection}>
            <Text style={[styles.highlightTitle, { color: compatibilityColors.excellent.primary }]}>
              ✨ Strengths
            </Text>
            {data.strengths.map((strength, index) => (
              <Text key={index} style={styles.highlightText}>
                • {strength}
              </Text>
            ))}
          </View>
        )}
        
        {data.challenges.length > 0 && (
          <View style={styles.highlightSection}>
            <Text style={[styles.highlightTitle, { color: compatibilityColors.challenging.primary }]}>
              ⚠️ Challenges
            </Text>
            {data.challenges.map((challenge, index) => (
              <Text key={index} style={styles.highlightText}>
                • {challenge}
              </Text>
            ))}
          </View>
        )}
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

  return (
    <Animated.View
      style={[
        styles.container,
        style,
        {
          transform: [{ scale: scaleValue }],
        },
      ]}
      testID={testID}
      accessibilityLabel={`${sign1Info.name} and ${sign2Info.name} compatibility: ${data.overallScore}%`}
      {...accessibilityProps}
    >
      {renderBackground()}
      
      <View style={styles.content}>
        {renderZodiacSigns()}
        {renderCompatibilityRing()}
        
        <Text style={styles.description}>{data.description}</Text>
        
        {renderScoreBreakdown()}
        {renderHighlights()}
      </View>
    </Animated.View>
  );
};

/**
 * Compatibility chart component styles
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
    marginVertical: spacing.md,
  },
  content: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  signsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: spacing.xl,
  },
  signContainer: {
    alignItems: 'center',
  },
  signCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  signSymbol: {
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  signName: {
    fontWeight: '600',
    fontFamily: 'Futura PT',
    color: ProfessionalGrays.white,
    marginTop: spacing.sm,
  },
  connector: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: spacing.md,
  },
  connectorLine: {
    height: 2,
    width: '100%',
    borderRadius: 1,
  },
  heartContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(22, 33, 62, 0.9)',
    borderRadius: 16,
    padding: spacing.xs,
  },
  heartSymbol: {
    fontSize: 20,
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  ring: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringBackground: {
    position: 'absolute',
  },
  ringProgress: {
    position: 'absolute',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  overallScore: {
    fontWeight: 'bold',
    fontFamily: 'Futura PT',
  },
  compatibilityLabel: {
    fontWeight: '500',
    fontFamily: 'Inter',
    color: ProfessionalGrays.medium,
    marginTop: spacing.xs,
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Inter',
    color: ProfessionalGrays.text,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: spacing.xl,
  },
  breakdown: {
    width: '100%',
    marginBottom: spacing.xl,
  },
  breakdownTitle: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Futura PT',
    color: ProfessionalGrays.white,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  scoreItem: {
    marginBottom: spacing.lg,
  },
  scoreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  aspectName: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Inter',
    color: ProfessionalGrays.light,
  },
  scoreValue: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Inter',
    color: ProfessionalGrays.white,
  },
  scoreBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: spacing.xs,
  },
  scoreBarBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  scoreBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  scoreDescription: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Inter',
    color: ProfessionalGrays.medium,
    fontStyle: 'italic',
  },
  highlights: {
    width: '100%',
  },
  highlightSection: {
    marginBottom: spacing.lg,
  },
  highlightTitle: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter',
    marginBottom: spacing.md,
  },
  highlightText: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Inter',
    color: ProfessionalGrays.text,
    lineHeight: 20,
    marginBottom: spacing.xs,
  },
});

export default CompatibilityChart;
