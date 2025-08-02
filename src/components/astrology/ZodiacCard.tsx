/**
 * Corp Astro UI Library - Zodiac Card Component
 * 
 * A specialized card component for displaying zodiac sign information.
 * Features cosmic design aesthetics with zodiac-specific styling.
 * 
 * Features:
 * - Zodiac sign display with symbol and name
 * - Element-based color coding (Fire, Earth, Air, Water)
 * - Cosmic glow effects
 * - Interactive hover states
 * - Accessibility support
 * - Date range display
 * - Responsive design
 * 
 * Design System Compliance:
 * - Element Colors: Fire(#FF6B6B), Earth(#4ECDC4), Air(#45B7D1), Water(#96CEB4)
 * - Card: 280px width, 320px height, 24px border radius
 * - Typography: Futura PT for zodiac name, Inter for details
 * - Cosmic gradients with element-specific accents
 * 
 * @module ZodiacCard
 * @version 1.0.0
 * @since 2024
 */

import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  AccessibilityProps,
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native';
import { ProfessionalGrays } from '../foundations/tokens/colors/ProfessionalGrays';
import { spacing } from '../foundations/tokens/spacing/SpacingScale';

/**
 * Zodiac elements
 */
export type ZodiacElement = 'fire' | 'earth' | 'air' | 'water';

/**
 * Zodiac signs
 */
export type ZodiacSign = 
  | 'aries' | 'taurus' | 'gemini' | 'cancer' | 'leo' | 'virgo'
  | 'libra' | 'scorpio' | 'sagittarius' | 'capricorn' | 'aquarius' | 'pisces';

/**
 * Zodiac card component props
 */
export interface ZodiacCardProps extends AccessibilityProps {
  /** Zodiac sign */
  sign: ZodiacSign;
  /** Zodiac name */
  name: string;
  /** Zodiac symbol */
  symbol: string;
  /** Zodiac element */
  element: ZodiacElement;
  /** Date range */
  dateRange: string;
  /** Description */
  description?: string;
  /** Whether card is selected */
  selected?: boolean;
  /** Whether card is pressable */
  pressable?: boolean;
  /** Press handler */
  onPress?: (sign: ZodiacSign, event: GestureResponderEvent) => void;
  /** Long press handler */
  onLongPress?: (sign: ZodiacSign, event: GestureResponderEvent) => void;
  /** Custom container styling */
  style?: ViewStyle;
  /** Test ID for testing */
  testID?: string;
}

/**
 * Element color mapping
 */
const elementColors = {
  fire: {
    primary: '#FF6B6B',
    secondary: '#FF8787',
    glow: 'rgba(255, 107, 107, 0.4)',
    gradient: ['#FF6B6B', '#FF8787'],
  },
  earth: {
    primary: '#4ECDC4',
    secondary: '#6BCF7F',
    glow: 'rgba(78, 205, 196, 0.4)',
    gradient: ['#4ECDC4', '#6BCF7F'],
  },
  air: {
    primary: '#45B7D1',
    secondary: '#96CEB4',
    glow: 'rgba(69, 183, 209, 0.4)',
    gradient: ['#45B7D1', '#96CEB4'],
  },
  water: {
    primary: '#96CEB4',
    secondary: '#FFEAA7',
    glow: 'rgba(150, 206, 180, 0.4)',
    gradient: ['#96CEB4', '#FFEAA7'],
  },
};

/**
 * Zodiac card component with cosmic design aesthetics
 */
export const ZodiacCard: React.FC<ZodiacCardProps> = ({
  sign,
  name,
  symbol,
  element,
  dateRange,
  description,
  selected = false,
  pressable = true,
  onPress,
  onLongPress,
  style,
  testID,
  ...accessibilityProps
}) => {
  const elementColor = elementColors[element];

  // Handle press
  const handlePress = (event: GestureResponderEvent) => {
    if (pressable) {
      onPress?.(sign, event);
    }
  };

  // Handle long press
  const handleLongPress = (event: GestureResponderEvent) => {
    if (pressable) {
      onLongPress?.(sign, event);
    }
  };

  // Get container styles
  const getContainerStyles = () => {
    if (selected) {
      return [
        styles.container,
        {
          borderColor: elementColor.primary,
          shadowColor: elementColor.glow,
          borderWidth: 2,
        },
      ];
    }
    
    return [styles.container];
  };

  // Render cosmic background
  const renderBackground = () => (
    <LinearGradient
      colors={[
        'rgba(26, 26, 46, 0.9)',
        'rgba(22, 33, 62, 0.8)',
        'rgba(15, 52, 96, 0.7)',
      ]}
      locations={[0, 0.5, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={StyleSheet.absoluteFillObject}
    />
  );

  // Render element accent
  const renderElementAccent = () => (
    <LinearGradient
      colors={elementColor.gradient as [string, string]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.elementAccent}
    />
  );

  // Render content
  const renderContent = () => (
    <View style={styles.content}>
      {/* Symbol */}
      <View style={styles.symbolContainer}>
        <Text style={[styles.symbol, { color: elementColor.primary }]}>
          {symbol}
        </Text>
      </View>

      {/* Name */}
      <Text style={styles.name}>{name}</Text>

      {/* Date Range */}
      <Text style={styles.dateRange}>{dateRange}</Text>

      {/* Element */}
      <View style={[styles.elementBadge, { backgroundColor: elementColor.glow }]}>
        <Text style={[styles.elementText, { color: elementColor.primary }]}>
          {element.toUpperCase()}
        </Text>
      </View>

      {/* Description */}
      {description && (
        <Text style={styles.description} numberOfLines={3}>
          {description}
        </Text>
      )}

      {/* Glow effect for selected state */}
      {selected && (
        <View 
          style={[
            styles.glowEffect,
            { backgroundColor: elementColor.glow }
          ]} 
        />
      )}
    </View>
  );

  if (pressable) {
    return (
      <TouchableOpacity
        style={[getContainerStyles(), style]}
        onPress={handlePress}
        onLongPress={handleLongPress}
        activeOpacity={0.8}
        testID={testID}
        accessibilityRole="button"
        accessibilityLabel={`${name} zodiac sign`}
        accessibilityHint={`${element} element, ${dateRange}`}
        accessibilityState={{ selected }}
        {...accessibilityProps}
      >
        {renderBackground()}
        {renderElementAccent()}
        {renderContent()}
      </TouchableOpacity>
    );
  }

  return (
    <View
      style={[getContainerStyles(), style]}
      testID={testID}
      accessibilityLabel={`${name} zodiac sign`}
      {...accessibilityProps}
    >
      {renderBackground()}
      {renderElementAccent()}
      {renderContent()}
    </View>
  );
};

/**
 * Zodiac card component styles
 */
const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 140,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'rgba(22, 33, 62, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 4,
  },
  elementAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
  },
  content: {
    flex: 1,
    padding: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  symbolContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  symbol: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Futura PT',
    color: ProfessionalGrays.white,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  dateRange: {
    fontSize: 10,
    fontWeight: '500',
    fontFamily: 'Inter',
    color: ProfessionalGrays.medium,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  elementBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: 10,
    marginBottom: spacing.xs,
  },
  elementText: {
    fontSize: 9,
    fontWeight: '600',
    fontFamily: 'Inter',
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 10,
    fontWeight: '400',
    fontFamily: 'Inter',
    color: ProfessionalGrays.text,
    textAlign: 'center',
    lineHeight: 13,
  },
  glowEffect: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 24,
    opacity: 0.3,
    zIndex: -1,
  },
});

export default ZodiacCard;