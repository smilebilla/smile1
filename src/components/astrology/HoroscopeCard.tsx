/**
 * Corp Astro UI Library - Horoscope Card Component
 * 
 * A card component for displaying daily/weekly horoscope information
 * with cosmic design aesthetics.
 * 
 * Features:
 * - Cosmic styling with gradient backgrounds
 * - Support for daily/weekly/monthly horoscopes
 * - Zodiac sign integration
 * - Expandable content
 * - Smooth animations
 * - Accessibility support
 * 
 * Design System Compliance:
 * - Uses cosmic color palette and gradients
 * - Consistent spacing and typography
 * - Proper elevation and shadows
 * - Theme-aware styling
 * 
 * @module HoroscopeCard
 * @version 1.0.0
 * @since 2024
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  AccessibilityProps,
  GestureResponderEvent,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../foundations/themes/useTheme';
import { SignatureBlues } from '../foundations/tokens/colors/SignatureBlues';
import { ProfessionalGrays } from '../foundations/tokens/colors/ProfessionalGrays';
import { spacing } from '../foundations/tokens/spacing/SpacingScale';
import { ZodiacSign } from './ZodiacCard';

/**
 * Horoscope period types
 */
export type HoroscopePeriod = 'daily' | 'weekly' | 'monthly';

/**
 * Horoscope category types
 */
export type HoroscopeCategory = 'general' | 'love' | 'career' | 'health' | 'money';

/**
 * Horoscope data structure
 */
export interface HoroscopeData {
  /** Horoscope content */
  content: string;
  /** Horoscope period */
  period: HoroscopePeriod;
  /** Date range */
  dateRange: string;
  /** Luck rating (1-5) */
  luckRating?: number;
  /** Lucky numbers */
  luckyNumbers?: number[];
  /** Lucky colors */
  luckyColors?: string[];
  /** Mood indicator */
  mood?: 'excellent' | 'good' | 'average' | 'challenging';
  /** Key themes */
  themes?: string[];
}

/**
 * Horoscope card component props
 */
export interface HoroscopeCardProps extends AccessibilityProps {
  /** Zodiac sign */
  sign: ZodiacSign;
  /** Horoscope data */
  horoscope: HoroscopeData;
  /** Horoscope category */
  category?: HoroscopeCategory;
  /** Whether content is expandable */
  expandable?: boolean;
  /** Whether card is expanded */
  expanded?: boolean;
  /** Whether to show additional info */
  showExtras?: boolean;
  /** Expand/collapse handler */
  onToggle?: (expanded: boolean) => void;
  /** Press handler */
  onPress?: (event: GestureResponderEvent) => void;
  /** Custom container styling */
  style?: ViewStyle;
  /** Test ID for testing */
  testID?: string;
}

/**
 * Zodiac signs mapping
 */
const zodiacInfo = {
  aries: { name: 'Aries', symbol: '♈', element: 'fire' },
  taurus: { name: 'Taurus', symbol: '♉', element: 'earth' },
  gemini: { name: 'Gemini', symbol: '♊', element: 'air' },
  cancer: { name: 'Cancer', symbol: '♋', element: 'water' },
  leo: { name: 'Leo', symbol: '♌', element: 'fire' },
  virgo: { name: 'Virgo', symbol: '♍', element: 'earth' },
  libra: { name: 'Libra', symbol: '♎', element: 'air' },
  scorpio: { name: 'Scorpio', symbol: '♏', element: 'water' },
  sagittarius: { name: 'Sagittarius', symbol: '♐', element: 'fire' },
  capricorn: { name: 'Capricorn', symbol: '♑', element: 'earth' },
  aquarius: { name: 'Aquarius', symbol: '♒', element: 'air' },
  pisces: { name: 'Pisces', symbol: '♓', element: 'water' },
};

/**
 * Category colors
 */
const categoryColors = {
  general: { primary: '#6C63FF', secondary: '#8B7FFF' },
  love: { primary: '#FF6B9D', secondary: '#FF8FAD' },
  career: { primary: '#4ECDC4', secondary: '#6BCF7F' },
  health: { primary: '#45B7D1', secondary: '#5BC0DE' },
  money: { primary: '#FFD93D', secondary: '#FFE066' },
};

/**
 * Mood colors
 */
const moodColors = {
  excellent: { color: '#4ECDC4', bg: 'rgba(78, 205, 196, 0.1)' },
  good: { color: '#6BCF7F', bg: 'rgba(107, 207, 127, 0.1)' },
  average: { color: '#FFD93D', bg: 'rgba(255, 217, 61, 0.1)' },
  challenging: { color: '#FF6B6B', bg: 'rgba(255, 107, 107, 0.1)' },
};

/**
 * Horoscope card component with cosmic design aesthetics
 */
export const HoroscopeCard: React.FC<HoroscopeCardProps> = ({
  sign,
  horoscope,
  category = 'general',
  expandable = true,
  expanded = false,
  showExtras = true,
  onToggle,
  onPress,
  style,
  testID,
  ...accessibilityProps
}) => {
  const { theme } = useTheme();
  const [isExpanded, setIsExpanded] = useState(expanded);
  const [rotateValue] = useState(new Animated.Value(expanded ? 1 : 0));

  const signInfo = zodiacInfo[sign];
  const categoryColor = categoryColors[category];
  const moodColor = horoscope.mood ? moodColors[horoscope.mood] : moodColors.average;

  // Handle toggle
  const handleToggle = () => {
    if (!expandable) return;

    const newExpanded = !isExpanded;
    setIsExpanded(newExpanded);
    
    // Animate rotation
    Animated.timing(rotateValue, {
      toValue: newExpanded ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();

    onToggle?.(newExpanded);
  };

  // Handle press
  const handlePress = (event: GestureResponderEvent) => {
    if (expandable && !onPress) {
      handleToggle();
    } else {
      onPress?.(event);
    }
  };

  // Get period label
  const getPeriodLabel = () => {
    switch (horoscope.period) {
      case 'daily':
        return 'Today';
      case 'weekly':
        return 'This Week';
      case 'monthly':
        return 'This Month';
      default:
        return 'Horoscope';
    }
  };

  // Render header
  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.signInfo}>
        <Text style={[styles.symbol, { color: categoryColor.primary }]}>
          {signInfo.symbol}
        </Text>
        <View style={styles.titleContainer}>
          <Text style={styles.signName}>{signInfo.name}</Text>
          <Text style={styles.period}>{getPeriodLabel()}</Text>
        </View>
      </View>
      
      {expandable && (
        <Animated.View
          style={[
            styles.expandIcon,
            {
              transform: [
                {
                  rotate: rotateValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '180deg'],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.expandText}>▼</Text>
        </Animated.View>
      )}
    </View>
  );

  // Render date range
  const renderDateRange = () => (
    <Text style={styles.dateRange}>{horoscope.dateRange}</Text>
  );

  // Render mood indicator
  const renderMoodIndicator = () => {
    if (!horoscope.mood) return null;
    
    return (
      <View style={[styles.moodIndicator, { backgroundColor: moodColor.bg }]}>
        <Text style={[styles.moodText, { color: moodColor.color }]}>
          {horoscope.mood.charAt(0).toUpperCase() + horoscope.mood.slice(1)}
        </Text>
      </View>
    );
  };

  // Render luck rating
  const renderLuckRating = () => {
    if (!horoscope.luckRating) return null;
    
    const stars = Array.from({ length: 5 }, (_, i) => (
      <Text
        key={i}
        style={[
          styles.star,
          { color: i < horoscope.luckRating! ? '#FFD93D' : 'rgba(255, 255, 255, 0.2)' },
        ]}
      >
        ★
      </Text>
    ));
    
    return (
      <View style={styles.luckRating}>
        <Text style={styles.luckLabel}>Luck:</Text>
        <View style={styles.stars}>{stars}</View>
      </View>
    );
  };

  // Render content
  const renderContent = () => (
    <View style={styles.content}>
      <Text style={styles.horoscopeText}>{horoscope.content}</Text>
    </View>
  );

  // Render extras
  const renderExtras = () => {
    if (!showExtras || !isExpanded) return null;
    
    return (
      <View style={styles.extras}>
        {horoscope.luckyNumbers && (
          <View style={styles.extraItem}>
            <Text style={styles.extraLabel}>Lucky Numbers:</Text>
            <Text style={styles.extraValue}>
              {horoscope.luckyNumbers.join(', ')}
            </Text>
          </View>
        )}
        
        {horoscope.luckyColors && (
          <View style={styles.extraItem}>
            <Text style={styles.extraLabel}>Lucky Colors:</Text>
            <View style={styles.colorDots}>
              {horoscope.luckyColors.map((color, index) => (
                <View
                  key={index}
                  style={[styles.colorDot, { backgroundColor: color }]}
                />
              ))}
            </View>
          </View>
        )}
        
        {horoscope.themes && (
          <View style={styles.extraItem}>
            <Text style={styles.extraLabel}>Key Themes:</Text>
            <Text style={styles.extraValue}>
              {horoscope.themes.join(' • ')}
            </Text>
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

  // Render accent
  const renderAccent = () => (
    <LinearGradient
      colors={[categoryColor.primary, categoryColor.secondary] as [string, string]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.accent}
    />
  );

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={handlePress}
      activeOpacity={0.95}
      testID={testID}
      accessibilityLabel={`${signInfo.name} ${horoscope.period} horoscope`}
      accessibilityHint={expandable ? 'Tap to expand details' : undefined}
      {...accessibilityProps}
    >
      {renderBackground()}
      {renderAccent()}
      
      <View style={styles.cardContent}>
        {renderHeader()}
        {renderDateRange()}
        
        <View style={styles.info}>
          {renderMoodIndicator()}
          {renderLuckRating()}
        </View>
        
        {renderContent()}
        {renderExtras()}
      </View>
    </TouchableOpacity>
  );
};

/**
 * Horoscope card component styles
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
    marginVertical: spacing.sm,
  },
  accent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
  },
  cardContent: {
    padding: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  signInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  symbol: {
    fontSize: 32,
    fontWeight: 'bold',
    marginRight: spacing.md,
  },
  titleContainer: {
    flex: 1,
  },
  signName: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Futura PT',
    color: ProfessionalGrays.white,
  },
  period: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Inter',
    color: ProfessionalGrays.medium,
  },
  expandIcon: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  expandText: {
    fontSize: 12,
    color: ProfessionalGrays.medium,
  },
  dateRange: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Inter',
    color: ProfessionalGrays.light,
    marginBottom: spacing.md,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  moodIndicator: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 12,
  },
  moodText: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Inter',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  luckRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  luckLabel: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Inter',
    color: ProfessionalGrays.light,
    marginRight: spacing.xs,
  },
  stars: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 14,
    marginHorizontal: 1,
  },
  content: {
    marginBottom: spacing.md,
  },
  horoscopeText: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Inter',
    color: ProfessionalGrays.text,
    lineHeight: 24,
  },
  extras: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: spacing.md,
  },
  extraItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  extraLabel: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Inter',
    color: ProfessionalGrays.light,
    marginRight: spacing.sm,
    minWidth: 100,
  },
  extraValue: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Inter',
    color: ProfessionalGrays.text,
    flex: 1,
  },
  colorDots: {
    flexDirection: 'row',
    flex: 1,
  },
  colorDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: spacing.xs,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
});

export default HoroscopeCard;
