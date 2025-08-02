/**
 * Corp Astro UI Library - Retrograde Badge Component
 * 
 * A badge component for indicating retrograde planetary status
 * with cosmic design aesthetics.
 * 
 * Features:
 * - Cosmic styling with retrograde-specific colors
 * - Animated retrograde indicators
 * - Planet-specific styling
 * - Duration display
 * - Smooth animations
 * - Accessibility support
 * 
 * Design System Compliance:
 * - Uses cosmic color palette and gradients
 * - Consistent spacing and typography
 * - Proper elevation and shadows
 * - Theme-aware styling
 * 
 * @module RetrogradeBadge
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
import { Planet } from './PlanetIndicator';

/**
 * Retrograde status types
 */
export type RetrogradeStatus = 'retrograde' | 'direct' | 'stationary';

/**
 * Retrograde data structure
 */
export interface RetrogradeData {
  /** Planet in retrograde */
  planet: Planet;
  /** Retrograde status */
  status: RetrogradeStatus;
  /** Start date of retrograde */
  startDate?: string;
  /** End date of retrograde */
  endDate?: string;
  /** Duration in days */
  duration?: number;
  /** Days remaining */
  daysRemaining?: number;
  /** Retrograde influence (0-100) */
  influence?: number;
  /** Description of effects */
  effects?: string;
}

/**
 * Retrograde badge component props
 */
export interface RetrogradeBadgeProps extends AccessibilityProps {
  /** Retrograde data */
  data: RetrogradeData;
  /** Badge size */
  size?: 'small' | 'medium' | 'large';
  /** Badge variant */
  variant?: 'compact' | 'detailed' | 'minimal';
  /** Whether to show duration */
  showDuration?: boolean;
  /** Whether badge is interactive */
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
 * Planet information with retrograde colors
 */
const planetInfo = {
  sun: {
    name: 'Sun',
    symbol: '☉',
    color: '#FFD700',
    retroColor: '#FF8C00',
    rarely: true, // Sun doesn't go retrograde
  },
  moon: {
    name: 'Moon',
    symbol: '☽',
    color: '#C0C0C0',
    retroColor: '#708090',
    rarely: true, // Moon doesn't go retrograde
  },
  mercury: {
    name: 'Mercury',
    symbol: '☿',
    color: '#87CEEB',
    retroColor: '#4169E1',
    rarely: false,
  },
  venus: {
    name: 'Venus',
    symbol: '♀',
    color: '#FFB6C1',
    retroColor: '#DC143C',
    rarely: false,
  },
  mars: {
    name: 'Mars',
    symbol: '♂',
    color: '#FF4500',
    retroColor: '#8B0000',
    rarely: false,
  },
  jupiter: {
    name: 'Jupiter',
    symbol: '♃',
    color: '#DAA520',
    retroColor: '#B8860B',
    rarely: false,
  },
  saturn: {
    name: 'Saturn',
    symbol: '♄',
    color: '#708090',
    retroColor: '#2F4F4F',
    rarely: false,
  },
  uranus: {
    name: 'Uranus',
    symbol: '♅',
    color: '#40E0D0',
    retroColor: '#008B8B',
    rarely: false,
  },
  neptune: {
    name: 'Neptune',
    symbol: '♆',
    color: '#4169E1',
    retroColor: '#191970',
    rarely: false,
  },
  pluto: {
    name: 'Pluto',
    symbol: '♇',
    color: '#8B0000',
    retroColor: '#800000',
    rarely: false,
  },
};

/**
 * Status colors
 */
const statusColors = {
  retrograde: {
    primary: '#FF6B6B',
    secondary: '#FF8787',
    glow: 'rgba(255, 107, 107, 0.4)',
    background: 'rgba(255, 107, 107, 0.1)',
  },
  direct: {
    primary: '#4ECDC4',
    secondary: '#6BCF7F',
    glow: 'rgba(78, 205, 196, 0.4)',
    background: 'rgba(78, 205, 196, 0.1)',
  },
  stationary: {
    primary: '#FFD93D',
    secondary: '#FFE066',
    glow: 'rgba(255, 217, 61, 0.4)',
    background: 'rgba(255, 217, 61, 0.1)',
  },
};

/**
 * Retrograde badge component with cosmic design aesthetics
 */
export const RetrogradeBadge: React.FC<RetrogradeBadgeProps> = ({
  data,
  size = 'medium',
  variant = 'detailed',
  showDuration = true,
  interactive = false,
  animate = true,
  onPress,
  style,
  testID,
  ...accessibilityProps
}) => {
  const { theme } = useTheme();
  const [scaleValue] = useState(new Animated.Value(0));
  const [pulseValue] = useState(new Animated.Value(1));
  const [rotateValue] = useState(new Animated.Value(0));
  const [glowValue] = useState(new Animated.Value(0));

  const planet = planetInfo[data.planet];
  const status = statusColors[data.status];

  // Get size configurations
  const getSizeConfig = () => {
    switch (size) {
      case 'small':
        return {
          height: 24,
          padding: spacing.xs,
          fontSize: 10,
          symbolSize: 12,
        };
      case 'large':
        return {
          height: 48,
          padding: spacing.md,
          fontSize: 14,
          symbolSize: 20,
        };
      default:
        return {
          height: 36,
          padding: spacing.sm,
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

      // Glow animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowValue, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: false,
          }),
          Animated.timing(glowValue, {
            toValue: 0.3,
            duration: 1500,
            useNativeDriver: false,
          }),
        ])
      ).start();

      // Pulse animation for retrograde
      if (data.status === 'retrograde') {
        Animated.loop(
          Animated.sequence([
            Animated.timing(pulseValue, {
              toValue: 1.1,
              duration: 800,
              useNativeDriver: true,
            }),
            Animated.timing(pulseValue, {
              toValue: 1,
              duration: 800,
              useNativeDriver: true,
            }),
          ])
        ).start();
      }

      // Rotation animation for retrograde
      if (data.status === 'retrograde') {
        Animated.loop(
          Animated.timing(rotateValue, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          })
        ).start();
      }
    } else {
      scaleValue.setValue(1);
      glowValue.setValue(1);
    }
  }, [animate, data.status, scaleValue, pulseValue, rotateValue, glowValue]);

  // Handle press
  const handlePress = (event: GestureResponderEvent) => {
    if (interactive) {
      onPress?.(data.planet, event);
    }
  };

  // Get status label
  const getStatusLabel = () => {
    switch (data.status) {
      case 'retrograde':
        return 'Retrograde';
      case 'direct':
        return 'Direct';
      case 'stationary':
        return 'Stationary';
      default:
        return 'Unknown';
    }
  };

  // Get status symbol
  const getStatusSymbol = () => {
    switch (data.status) {
      case 'retrograde':
        return '℞';
      case 'direct':
        return '→';
      case 'stationary':
        return '⏸';
      default:
        return '?';
    }
  };

  // Render minimal variant
  const renderMinimal = () => (
    <View style={[styles.minimalContainer, { height: sizeConfig.height }]}>
      <Text style={[styles.planetSymbol, { fontSize: sizeConfig.symbolSize }]}>
        {planet.symbol}
      </Text>
      <Text style={[styles.statusSymbol, { fontSize: sizeConfig.symbolSize, color: status.primary }]}>
        {getStatusSymbol()}
      </Text>
    </View>
  );

  // Render compact variant
  const renderCompact = () => (
    <View style={[styles.compactContainer, { height: sizeConfig.height }]}>
      <Animated.Text
        style={[
          styles.planetSymbol,
          {
            fontSize: sizeConfig.symbolSize,
            transform: [
              {
                rotate: data.status === 'retrograde' 
                  ? rotateValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '-360deg'],
                    })
                  : '0deg',
              },
            ],
          },
        ]}
      >
        {planet.symbol}
      </Animated.Text>
      
      <View style={styles.compactInfo}>
        <Text style={[styles.planetName, { fontSize: sizeConfig.fontSize }]}>
          {planet.name}
        </Text>
        <Text style={[styles.statusLabel, { fontSize: sizeConfig.fontSize - 2, color: status.primary }]}>
          {getStatusLabel()}
        </Text>
      </View>
    </View>
  );

  // Render detailed variant
  const renderDetailed = () => (
    <View style={styles.detailedContainer}>
      <View style={styles.detailedHeader}>
        <Animated.Text
          style={[
            styles.planetSymbol,
            {
              fontSize: sizeConfig.symbolSize,
              transform: [
                {
                  rotate: data.status === 'retrograde' 
                    ? rotateValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '-360deg'],
                      })
                    : '0deg',
                },
              ],
            },
          ]}
        >
          {planet.symbol}
        </Animated.Text>
        
        <View style={styles.detailedInfo}>
          <Text style={[styles.planetName, { fontSize: sizeConfig.fontSize }]}>
            {planet.name}
          </Text>
          <Text style={[styles.statusLabel, { fontSize: sizeConfig.fontSize - 1, color: status.primary }]}>
            {getStatusLabel()}
          </Text>
        </View>
        
        <Text style={[styles.statusSymbol, { fontSize: sizeConfig.symbolSize, color: status.primary }]}>
          {getStatusSymbol()}
        </Text>
      </View>
      
      {showDuration && (data.duration || data.daysRemaining) && (
        <View style={styles.durationContainer}>
          {data.duration && (
            <Text style={[styles.duration, { fontSize: sizeConfig.fontSize - 2 }]}>
              Duration: {data.duration} days
            </Text>
          )}
          {data.daysRemaining && (
            <Text style={[styles.remaining, { fontSize: sizeConfig.fontSize - 2 }]}>
              {data.daysRemaining} days remaining
            </Text>
          )}
        </View>
      )}
      
      {data.effects && (
        <Text style={[styles.effects, { fontSize: sizeConfig.fontSize - 2 }]}>
          {data.effects}
        </Text>
      )}
    </View>
  );

  // Render content based on variant
  const renderContent = () => {
    switch (variant) {
      case 'minimal':
        return renderMinimal();
      case 'compact':
        return renderCompact();
      case 'detailed':
        return renderDetailed();
      default:
        return renderDetailed();
    }
  };

  // Render background
  const renderBackground = () => (
    <LinearGradient
      colors={[
        'rgba(26, 26, 46, 0.95)',
        'rgba(22, 33, 62, 0.9)',
        status.background,
      ]}
      locations={[0, 0.5, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={StyleSheet.absoluteFillObject}
    />
  );

  // Render glow effect
  const renderGlow = () => (
    <Animated.View
      style={[
        styles.glowEffect,
        {
          opacity: glowValue,
          shadowColor: status.primary,
          shadowOpacity: glowValue,
        },
      ]}
    />
  );

  const Component = interactive ? TouchableOpacity : View;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          borderColor: status.primary,
          transform: [
            { scale: scaleValue },
            { scale: pulseValue },
          ],
        },
        style,
      ]}
      testID={testID}
      accessibilityLabel={`${planet.name} ${getStatusLabel().toLowerCase()}`}
      accessibilityHint={interactive ? 'Tap for more details' : undefined}
      {...accessibilityProps}
    >
      {renderBackground()}
      {renderGlow()}
      
      <Component
        style={[styles.content, { padding: sizeConfig.padding }]}
        onPress={handlePress}
        activeOpacity={0.8}
        disabled={!interactive}
      >
        {renderContent()}
      </Component>
    </Animated.View>
  );
};

/**
 * Retrograde badge component styles
 */
const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(22, 33, 62, 0.3)',
    borderWidth: 1,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    margin: spacing.xs,
  },
  content: {
    position: 'relative',
  },
  glowEffect: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
  },
  minimalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  compactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  compactInfo: {
    marginLeft: spacing.sm,
    flex: 1,
  },
  detailedContainer: {
    minWidth: 200,
  },
  detailedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  detailedInfo: {
    marginLeft: spacing.sm,
    flex: 1,
  },
  planetSymbol: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  planetName: {
    fontWeight: '600',
    fontFamily: 'Futura PT',
    color: ProfessionalGrays.white,
    marginBottom: 2,
  },
  statusLabel: {
    fontWeight: '500',
    fontFamily: 'Inter',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statusSymbol: {
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  durationContainer: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: spacing.xs,
    marginBottom: spacing.xs,
  },
  duration: {
    fontWeight: '400',
    fontFamily: 'Inter',
    color: ProfessionalGrays.light,
    marginBottom: 2,
  },
  remaining: {
    fontWeight: '500',
    fontFamily: 'Inter',
    color: ProfessionalGrays.medium,
  },
  effects: {
    fontWeight: '400',
    fontFamily: 'Inter',
    color: ProfessionalGrays.text,
    lineHeight: 16,
    fontStyle: 'italic',
  },
});

export default RetrogradeBadge;
