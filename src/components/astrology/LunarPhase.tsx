/**
 * Corp Astro UI Library - Lunar Phase Component
 * 
 * A component for displaying moon phases with cosmic design aesthetics.
 * 
 * Features:
 * - Cosmic styling with moon phase visualizations
 * - Animated phase transitions
 * - Phase name and description
 * - Illumination percentage
 * - Smooth animations
 * - Accessibility support
 * 
 * Design System Compliance:
 * - Uses cosmic color palette and gradients
 * - Consistent spacing and typography
 * - Proper elevation and shadows
 * - Theme-aware styling
 * 
 * @module LunarPhase
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

/**
 * Moon phase types
 */
export type MoonPhase = 
  | 'new_moon'
  | 'waxing_crescent'
  | 'first_quarter'
  | 'waxing_gibbous'
  | 'full_moon'
  | 'waning_gibbous'
  | 'last_quarter'
  | 'waning_crescent';

/**
 * Lunar phase data structure
 */
export interface LunarPhaseData {
  /** Current moon phase */
  phase: MoonPhase;
  /** Illumination percentage (0-100) */
  illumination: number;
  /** Phase date */
  date: string;
  /** Next phase name */
  nextPhase?: MoonPhase;
  /** Days until next phase */
  daysUntilNext?: number;
  /** Astrological significance */
  significance?: string;
  /** Recommended activities */
  activities?: string[];
}

/**
 * Lunar phase component props
 */
export interface LunarPhaseProps extends AccessibilityProps {
  /** Lunar phase data */
  data: LunarPhaseData;
  /** Component size */
  size?: 'small' | 'medium' | 'large';
  /** Whether to show detailed information */
  showDetails?: boolean;
  /** Whether component is interactive */
  interactive?: boolean;
  /** Whether to animate on mount */
  animate?: boolean;
  /** Press handler */
  onPress?: (phase: MoonPhase, event: GestureResponderEvent) => void;
  /** Custom container styling */
  style?: ViewStyle;
  /** Test ID for testing */
  testID?: string;
}

/**
 * Moon phase information
 */
const phaseInfo = {
  new_moon: {
    name: 'New Moon',
    symbol: '🌑',
    description: 'New beginnings, fresh starts, setting intentions',
    color: '#2C3E50',
    illumination: 0,
  },
  waxing_crescent: {
    name: 'Waxing Crescent',
    symbol: '🌒',
    description: 'Growth, building momentum, taking action',
    color: '#3498DB',
    illumination: 25,
  },
  first_quarter: {
    name: 'First Quarter',
    symbol: '🌓',
    description: 'Decision making, overcoming challenges',
    color: '#E74C3C',
    illumination: 50,
  },
  waxing_gibbous: {
    name: 'Waxing Gibbous',
    symbol: '🌔',
    description: 'Refinement, adjustment, perseverance',
    color: '#F39C12',
    illumination: 75,
  },
  full_moon: {
    name: 'Full Moon',
    symbol: '🌕',
    description: 'Culmination, completion, heightened energy',
    color: '#F1C40F',
    illumination: 100,
  },
  waning_gibbous: {
    name: 'Waning Gibbous',
    symbol: '🌖',
    description: 'Gratitude, sharing wisdom, giving back',
    color: '#9B59B6',
    illumination: 75,
  },
  last_quarter: {
    name: 'Last Quarter',
    symbol: '🌗',
    description: 'Release, letting go, forgiveness',
    color: '#E67E22',
    illumination: 50,
  },
  waning_crescent: {
    name: 'Waning Crescent',
    symbol: '🌘',
    description: 'Rest, reflection, surrender',
    color: '#95A5A6',
    illumination: 25,
  },
};

/**
 * Lunar phase component with cosmic design aesthetics
 */
export const LunarPhase: React.FC<LunarPhaseProps> = ({
  data,
  size = 'medium',
  showDetails = true,
  interactive = false,
  animate = true,
  onPress,
  style,
  testID,
  ...accessibilityProps
}) => {
  const { theme } = useTheme();
  const [scaleValue] = useState(new Animated.Value(0));
  const [glowValue] = useState(new Animated.Value(0));
  const [rotateValue] = useState(new Animated.Value(0));
  const [illuminationValue] = useState(new Animated.Value(0));

  const phase = phaseInfo[data.phase];

  // Get size configurations
  const getSizeConfig = () => {
    switch (size) {
      case 'small':
        return {
          moonSize: 60,
          fontSize: 12,
          detailFontSize: 10,
        };
      case 'large':
        return {
          moonSize: 120,
          fontSize: 18,
          detailFontSize: 14,
        };
      default:
        return {
          moonSize: 80,
          fontSize: 14,
          detailFontSize: 12,
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

      // Glow animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowValue, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: false,
          }),
          Animated.timing(glowValue, {
            toValue: 0.3,
            duration: 2000,
            useNativeDriver: false,
          }),
        ])
      ).start();

      // Rotation animation
      Animated.loop(
        Animated.timing(rotateValue, {
          toValue: 1,
          duration: 20000,
          useNativeDriver: true,
        })
      ).start();

      // Illumination animation
      Animated.timing(illuminationValue, {
        toValue: data.illumination,
        duration: 1500,
        useNativeDriver: false,
      }).start();
    } else {
      scaleValue.setValue(1);
      glowValue.setValue(1);
      illuminationValue.setValue(data.illumination);
    }
  }, [animate, data.illumination, scaleValue, glowValue, rotateValue, illuminationValue]);

  // Handle press
  const handlePress = (event: GestureResponderEvent) => {
    if (interactive) {
      onPress?.(data.phase, event);
    }
  };

  // Render moon visualization
  const renderMoonVisualization = () => (
    <View style={[styles.moonContainer, { width: sizeConfig.moonSize, height: sizeConfig.moonSize }]}>
      {/* Moon background */}
      <View style={[styles.moonBackground, { borderRadius: sizeConfig.moonSize / 2 }]}>
        <LinearGradient
          colors={['#2C3E50', '#34495E']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFillObject}
        />
      </View>
      
      {/* Moon illumination */}
      <Animated.View
        style={[
          styles.moonIllumination,
          {
            borderRadius: sizeConfig.moonSize / 2,
            width: illuminationValue.interpolate({
              inputRange: [0, 100],
              outputRange: [0, sizeConfig.moonSize],
            }),
            backgroundColor: phase.color,
          },
        ]}
      />
      
      {/* Moon glow */}
      <Animated.View
        style={[
          styles.moonGlow,
          {
            borderRadius: sizeConfig.moonSize / 2 + 10,
            width: sizeConfig.moonSize + 20,
            height: sizeConfig.moonSize + 20,
            opacity: glowValue,
            shadowColor: phase.color,
            shadowOpacity: glowValue,
          },
        ]}
      />
      
      {/* Moon symbol */}
      <View style={styles.moonSymbol}>
        <Text style={[styles.symbolText, { fontSize: sizeConfig.fontSize + 4 }]}>
          {phase.symbol}
        </Text>
      </View>
    </View>
  );

  // Render phase info
  const renderPhaseInfo = () => (
    <View style={styles.phaseInfo}>
      <Text style={[styles.phaseName, { fontSize: sizeConfig.fontSize + 2 }]}>
        {phase.name}
      </Text>
      
      <Text style={[styles.phaseDate, { fontSize: sizeConfig.detailFontSize }]}>
        {data.date}
      </Text>
      
      <View style={styles.illuminationContainer}>
        <Text style={[styles.illuminationLabel, { fontSize: sizeConfig.detailFontSize }]}>
          Illumination
        </Text>
        <Animated.Text
          style={[
            styles.illuminationValue,
            {
              fontSize: sizeConfig.detailFontSize,
              color: phase.color,
            },
          ]}
        >
          {illuminationValue.interpolate({
            inputRange: [0, 100],
            outputRange: [0, data.illumination],
          }).interpolate({
            inputRange: [0, 100],
            outputRange: ['0%', `${Math.round(data.illumination)}%`],
          })}
        </Animated.Text>
      </View>
      
      <Text style={[styles.phaseDescription, { fontSize: sizeConfig.detailFontSize }]}>
        {phase.description}
      </Text>
    </View>
  );

  // Render next phase info
  const renderNextPhaseInfo = () => {
    if (!showDetails || !data.nextPhase) return null;

    const nextPhase = phaseInfo[data.nextPhase];
    
    return (
      <View style={styles.nextPhaseContainer}>
        <Text style={[styles.nextPhaseTitle, { fontSize: sizeConfig.detailFontSize }]}>
          Next Phase
        </Text>
        
        <View style={styles.nextPhaseInfo}>
          <Text style={[styles.nextPhaseName, { fontSize: sizeConfig.detailFontSize }]}>
            {nextPhase.name}
          </Text>
          
          {data.daysUntilNext && (
            <Text style={[styles.nextPhaseTime, { fontSize: sizeConfig.detailFontSize - 1 }]}>
              in {data.daysUntilNext} day{data.daysUntilNext !== 1 ? 's' : ''}
            </Text>
          )}
        </View>
      </View>
    );
  };

  // Render significance
  const renderSignificance = () => {
    if (!showDetails || !data.significance) return null;

    return (
      <View style={styles.significanceContainer}>
        <Text style={[styles.significanceTitle, { fontSize: sizeConfig.detailFontSize }]}>
          Astrological Significance
        </Text>
        <Text style={[styles.significanceText, { fontSize: sizeConfig.detailFontSize }]}>
          {data.significance}
        </Text>
      </View>
    );
  };

  // Render activities
  const renderActivities = () => {
    if (!showDetails || !data.activities?.length) return null;

    return (
      <View style={styles.activitiesContainer}>
        <Text style={[styles.activitiesTitle, { fontSize: sizeConfig.detailFontSize }]}>
          Recommended Activities
        </Text>
        {data.activities.map((activity, index) => (
          <Text
            key={index}
            style={[styles.activityItem, { fontSize: sizeConfig.detailFontSize }]}
          >
            • {activity}
          </Text>
        ))}
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
            {
              rotate: rotateValue.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg'],
              }),
            },
          ],
        },
      ]}
      testID={testID}
      accessibilityLabel={`${phase.name}, ${data.illumination}% illuminated`}
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
        {renderMoonVisualization()}
        {renderPhaseInfo()}
        {renderNextPhaseInfo()}
        {renderSignificance()}
        {renderActivities()}
      </Component>
    </Animated.View>
  );
};

/**
 * Lunar phase component styles
 */
const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'rgba(22, 33, 62, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
    margin: spacing.sm,
  },
  content: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  moonContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  moonBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  moonIllumination: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  moonGlow: {
    position: 'absolute',
    top: -10,
    left: -10,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
  },
  moonSymbol: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  symbolText: {
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  phaseInfo: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  phaseName: {
    fontWeight: '600',
    fontFamily: 'Futura PT',
    color: ProfessionalGrays.white,
    marginBottom: spacing.xs,
  },
  phaseDate: {
    fontWeight: '400',
    fontFamily: 'Inter',
    color: ProfessionalGrays.medium,
    marginBottom: spacing.sm,
  },
  illuminationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  illuminationLabel: {
    fontWeight: '500',
    fontFamily: 'Inter',
    color: ProfessionalGrays.light,
    marginRight: spacing.sm,
  },
  illuminationValue: {
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  phaseDescription: {
    fontWeight: '400',
    fontFamily: 'Inter',
    color: ProfessionalGrays.text,
    textAlign: 'center',
    lineHeight: 18,
    fontStyle: 'italic',
  },
  nextPhaseContainer: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: spacing.md,
    marginBottom: spacing.md,
  },
  nextPhaseTitle: {
    fontWeight: '500',
    fontFamily: 'Inter',
    color: ProfessionalGrays.medium,
    marginBottom: spacing.xs,
  },
  nextPhaseInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nextPhaseName: {
    fontWeight: '500',
    fontFamily: 'Inter',
    color: ProfessionalGrays.light,
  },
  nextPhaseTime: {
    fontWeight: '400',
    fontFamily: 'Inter',
    color: ProfessionalGrays.medium,
  },
  significanceContainer: {
    width: '100%',
    marginBottom: spacing.md,
  },
  significanceTitle: {
    fontWeight: '500',
    fontFamily: 'Inter',
    color: ProfessionalGrays.medium,
    marginBottom: spacing.xs,
  },
  significanceText: {
    fontWeight: '400',
    fontFamily: 'Inter',
    color: ProfessionalGrays.text,
    lineHeight: 16,
  },
  activitiesContainer: {
    width: '100%',
  },
  activitiesTitle: {
    fontWeight: '500',
    fontFamily: 'Inter',
    color: ProfessionalGrays.medium,
    marginBottom: spacing.xs,
  },
  activityItem: {
    fontWeight: '400',
    fontFamily: 'Inter',
    color: ProfessionalGrays.text,
    lineHeight: 16,
    marginBottom: spacing.xs,
  },
});

export default LunarPhase;
