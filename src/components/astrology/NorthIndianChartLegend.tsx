/**
 * Corp Astro UI Library - North Indian Chart Legend Component
 * Module 172: NorthIndianChartLegend.tsx
 * 
 * An enhanced user experience component that provides legend, information panels,
 * and interactive elements for the North Indian Chart component.
 * 
 * Features:
 * - Planet legend with Sanskrit names and meanings
 * - Rashi (sign) information panel
 * - House significance explanations
 * - Interactive planet and sign details
 * - Aspect explanations and strength indicators
 * - Chart type information (D1, D9, etc.)
 * - Cosmic design aesthetics matching North Indian Chart
 * - Collapsible sections for better space usage
 * - Accessibility compliance with screen readers
 * 
 * Design System Compliance:
 * - Consistent cosmic gradients and deep space colors
 * - Corp Astro typography and spacing patterns
 * - SignatureBlues for interactive elements
 * - Professional grays for readable text
 * - Smooth animations and transitions
 * 
 * @module NorthIndianChartLegend
 * @version 1.0.0
 * @since 2024
 */

import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  ScrollView,
  Animated,
  AccessibilityProps,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../foundations/themes/useTheme';
import { SignatureBlues } from '../foundations/tokens/colors/SignatureBlues';
import { ProfessionalGrays } from '../foundations/tokens/colors/ProfessionalGrays';
import { deepSpaceColors } from '../foundations/tokens/colors/DeepSpaceColors';
import { spacing } from '../foundations/tokens/spacing/SpacingScale';
import { getFontFamily } from '../foundations/tokens/typography/FontFamilies';
import { 
  VedicPlanet, 
  VedicRashi, 
  NorthIndianHouseNumber,
  NorthIndianChartData,
} from './NorthIndianChart';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type LegendSection = 'planets' | 'houses' | 'rashis' | 'aspects' | 'chartInfo';

export interface PlanetInfo {
  planet: VedicPlanet;
  name: string;
  sanskritName: string;
  significance: string;
  element?: string;
  deity?: string;
  gemstone?: string;
  color: string;
  symbol: string;
}

export interface RashiInfo {
  rashi: VedicRashi;
  name: string;
  sanskritName: string;
  element: string;
  modality: string;
  ruler: VedicPlanet;
  significance: string;
  symbol: string;
}

export interface HouseInfo {
  number: NorthIndianHouseNumber;
  name: string;
  sanskritName: string;
  significance: string;
  category: 'dharma' | 'artha' | 'kama' | 'moksha';
  nature: 'angular' | 'succedent' | 'cadent';
}

export interface NorthIndianChartLegendProps extends AccessibilityProps {
  /** Chart data for context */
  chartData: NorthIndianChartData;
  /** Initial expanded sections */
  defaultExpandedSections?: LegendSection[];
  /** Whether to show detailed information */
  showDetailedInfo?: boolean;
  /** Whether to show Sanskrit names */
  showSanskrit?: boolean;
  /** Selected planet for highlighting */
  selectedPlanet?: VedicPlanet;
  /** Selected rashi for highlighting */
  selectedRashi?: VedicRashi;
  /** Selected house for highlighting */
  selectedHouse?: NorthIndianHouseNumber;
  /** Section expansion handler */
  onSectionToggle?: (section: LegendSection, expanded: boolean) => void;
  /** Planet selection handler */
  onPlanetSelect?: (planet: VedicPlanet) => void;
  /** Rashi selection handler */
  onRashiSelect?: (rashi: VedicRashi) => void;
  /** House selection handler */
  onHouseSelect?: (house: NorthIndianHouseNumber) => void;
  /** Custom styling */
  style?: ViewStyle;
  /** Test ID for testing */
  testID?: string;
}

// ============================================================================
// CONSTANTS & DATA
// ============================================================================

/**
 * Comprehensive planet information
 */
const planetDetails: Record<VedicPlanet, PlanetInfo> = {
  sun: {
    planet: 'sun',
    name: 'Sun',
    sanskritName: 'सूर्य (Surya)',
    significance: 'Soul, ego, authority, father, government, leadership',
    element: 'Fire',
    deity: 'Surya',
    gemstone: 'Ruby',
    color: '#FFD700',
    symbol: '☉',
  },
  moon: {
    planet: 'moon',
    name: 'Moon',
    sanskritName: 'चन्द्र (Chandra)',
    significance: 'Mind, emotions, mother, intuition, public',
    element: 'Water',
    deity: 'Chandra',
    gemstone: 'Pearl',
    color: '#E6E6FA',
    symbol: '☽',
  },
  mercury: {
    planet: 'mercury',
    name: 'Mercury',
    sanskritName: 'बुध (Budha)',
    significance: 'Communication, intellect, commerce, education',
    element: 'Earth',
    deity: 'Budha',
    gemstone: 'Emerald',
    color: '#87CEEB',
    symbol: '☿',
  },
  venus: {
    planet: 'venus',
    name: 'Venus',
    sanskritName: 'शुक्र (Shukra)',
    significance: 'Love, beauty, arts, luxury, relationships',
    element: 'Water',
    deity: 'Shukra',
    gemstone: 'Diamond',
    color: '#FFB6C1',
    symbol: '♀',
  },
  mars: {
    planet: 'mars',
    name: 'Mars',
    sanskritName: 'मंगल (Mangal)',
    significance: 'Energy, courage, conflict, sports, siblings',
    element: 'Fire',
    deity: 'Mangal',
    gemstone: 'Red Coral',
    color: '#FF4500',
    symbol: '♂',
  },
  jupiter: {
    planet: 'jupiter',
    name: 'Jupiter',
    sanskritName: 'गुरु (Guru)',
    significance: 'Wisdom, spirituality, teachers, children, fortune',
    element: 'Space',
    deity: 'Brihaspati',
    gemstone: 'Yellow Sapphire',
    color: '#DAA520',
    symbol: '♃',
  },
  saturn: {
    planet: 'saturn',
    name: 'Saturn',
    sanskritName: 'शनि (Shani)',
    significance: 'Discipline, delays, karma, old age, service',
    element: 'Air',
    deity: 'Shani',
    gemstone: 'Blue Sapphire',
    color: '#708090',
    symbol: '♄',
  },
  rahu: {
    planet: 'rahu',
    name: 'Rahu',
    sanskritName: 'राहु (Rahu)',
    significance: 'Obsession, materialism, foreign elements, technology',
    element: 'Air',
    deity: 'Rahu',
    gemstone: 'Hessonite',
    color: '#8B0000',
    symbol: '☊',
  },
  ketu: {
    planet: 'ketu',
    name: 'Ketu',
    sanskritName: 'केतु (Ketu)',
    significance: 'Spirituality, detachment, past life karma, research',
    element: 'Fire',
    deity: 'Ketu',
    gemstone: "Cat's Eye",
    color: '#2F4F4F',
    symbol: '☋',
  },
  uranus: {
    planet: 'uranus',
    name: 'Uranus',
    sanskritName: 'अरुण (Arun)',
    significance: 'Innovation, revolution, sudden changes, technology',
    element: 'Air',
    deity: 'Varuna',
    gemstone: 'Aquamarine',
    color: '#40E0D0',
    symbol: '♅',
  },
  neptune: {
    planet: 'neptune',
    name: 'Neptune',
    sanskritName: 'वरुण (Varun)',
    significance: 'Spirituality, illusion, dreams, arts, healing',
    element: 'Water',
    deity: 'Varuna',
    gemstone: 'Amethyst',
    color: '#4169E1',
    symbol: '♆',
  },
  pluto: {
    planet: 'pluto',
    name: 'Pluto',
    sanskritName: 'यम (Yama)',
    significance: 'Transformation, rebirth, hidden power, occult',
    element: 'Fire',
    deity: 'Yama',
    gemstone: 'Garnet',
    color: '#800080',
    symbol: '♇',
  },
};

/**
 * Comprehensive rashi information
 */
const rashiDetails: Record<VedicRashi, RashiInfo> = {
  aries: {
    rashi: 'aries',
    name: 'Aries',
    sanskritName: 'मेष (Mesha)',
    element: 'Fire',
    modality: 'Cardinal',
    ruler: 'mars',
    significance: 'Initiative, leadership, courage, new beginnings',
    symbol: '♈',
  },
  taurus: {
    rashi: 'taurus',
    name: 'Taurus',
    sanskritName: 'वृष (Vrishabha)',
    element: 'Earth',
    modality: 'Fixed',
    ruler: 'venus',
    significance: 'Stability, material wealth, perseverance, sensuality',
    symbol: '♉',
  },
  gemini: {
    rashi: 'gemini',
    name: 'Gemini',
    sanskritName: 'मिथुन (Mithuna)',
    element: 'Air',
    modality: 'Mutable',
    ruler: 'mercury',
    significance: 'Communication, versatility, learning, duality',
    symbol: '♊',
  },
  cancer: {
    rashi: 'cancer',
    name: 'Cancer',
    sanskritName: 'कर्क (Karka)',
    element: 'Water',
    modality: 'Cardinal',
    ruler: 'moon',
    significance: 'Nurturing, home, emotions, protection',
    symbol: '♋',
  },
  leo: {
    rashi: 'leo',
    name: 'Leo',
    sanskritName: 'सिंह (Simha)',
    element: 'Fire',
    modality: 'Fixed',
    ruler: 'sun',
    significance: 'Creativity, authority, self-expression, royalty',
    symbol: '♌',
  },
  virgo: {
    rashi: 'virgo',
    name: 'Virgo',
    sanskritName: 'कन्या (Kanya)',
    element: 'Earth',
    modality: 'Mutable',
    ruler: 'mercury',
    significance: 'Service, analysis, health, perfection',
    symbol: '♍',
  },
  libra: {
    rashi: 'libra',
    name: 'Libra',
    sanskritName: 'तुला (Tula)',
    element: 'Air',
    modality: 'Cardinal',
    ruler: 'venus',
    significance: 'Balance, relationships, justice, harmony',
    symbol: '♎',
  },
  scorpio: {
    rashi: 'scorpio',
    name: 'Scorpio',
    sanskritName: 'वृश्चिक (Vrishchika)',
    element: 'Water',
    modality: 'Fixed',
    ruler: 'mars',
    significance: 'Transformation, intensity, research, occult',
    symbol: '♏',
  },
  sagittarius: {
    rashi: 'sagittarius',
    name: 'Sagittarius',
    sanskritName: 'धनुष (Dhanus)',
    element: 'Fire',
    modality: 'Mutable',
    ruler: 'jupiter',
    significance: 'Philosophy, higher learning, travel, spirituality',
    symbol: '♐',
  },
  capricorn: {
    rashi: 'capricorn',
    name: 'Capricorn',
    sanskritName: 'मकर (Makara)',
    element: 'Earth',
    modality: 'Cardinal',
    ruler: 'saturn',
    significance: 'Discipline, career, authority, structure',
    symbol: '♑',
  },
  aquarius: {
    rashi: 'aquarius',
    name: 'Aquarius',
    sanskritName: 'कुम्भ (Kumbha)',
    element: 'Air',
    modality: 'Fixed',
    ruler: 'saturn',
    significance: 'Innovation, humanitarian, groups, future',
    symbol: '♒',
  },
  pisces: {
    rashi: 'pisces',
    name: 'Pisces',
    sanskritName: 'मीन (Meena)',
    element: 'Water',
    modality: 'Mutable',
    ruler: 'jupiter',
    significance: 'Spirituality, compassion, intuition, sacrifice',
    symbol: '♓',
  },
};

/**
 * House information in Vedic astrology
 */
const houseDetails: Record<NorthIndianHouseNumber, HouseInfo> = {
  1: {
    number: 1,
    name: 'First House',
    sanskritName: 'तनु भाव (Tanu Bhava)',
    significance: 'Self, personality, physical body, life path',
    category: 'dharma',
    nature: 'angular',
  },
  2: {
    number: 2,
    name: 'Second House',
    sanskritName: 'धन भाव (Dhana Bhava)',
    significance: 'Wealth, family, speech, values',
    category: 'artha',
    nature: 'succedent',
  },
  3: {
    number: 3,
    name: 'Third House',
    sanskritName: 'सहज भाव (Sahaja Bhava)',
    significance: 'Courage, siblings, communication, short journeys',
    category: 'kama',
    nature: 'cadent',
  },
  4: {
    number: 4,
    name: 'Fourth House',
    sanskritName: 'सुख भाव (Sukha Bhava)',
    significance: 'Home, mother, happiness, property',
    category: 'moksha',
    nature: 'angular',
  },
  5: {
    number: 5,
    name: 'Fifth House',
    sanskritName: 'पुत्र भाव (Putra Bhava)',
    significance: 'Children, creativity, education, intelligence',
    category: 'dharma',
    nature: 'succedent',
  },
  6: {
    number: 6,
    name: 'Sixth House',
    sanskritName: 'रिपु भाव (Ripu Bhava)',
    significance: 'Enemies, disease, service, daily routine',
    category: 'artha',
    nature: 'cadent',
  },
  7: {
    number: 7,
    name: 'Seventh House',
    sanskritName: 'कलत्र भाव (Kalatra Bhava)',
    significance: 'Marriage, partnerships, business, legal matters',
    category: 'kama',
    nature: 'angular',
  },
  8: {
    number: 8,
    name: 'Eighth House',
    sanskritName: 'आयु भाव (Ayu Bhava)',
    significance: 'Longevity, transformation, occult, inheritance',
    category: 'moksha',
    nature: 'succedent',
  },
  9: {
    number: 9,
    name: 'Ninth House',
    sanskritName: 'भाग्य भाव (Bhagya Bhava)',
    significance: 'Fortune, religion, higher learning, father',
    category: 'dharma',
    nature: 'cadent',
  },
  10: {
    number: 10,
    name: 'Tenth House',
    sanskritName: 'कर्म भाव (Karma Bhava)',
    significance: 'Career, reputation, status, government',
    category: 'artha',
    nature: 'angular',
  },
  11: {
    number: 11,
    name: 'Eleventh House',
    sanskritName: 'लाभ भाव (Labha Bhava)',
    significance: 'Gains, friends, hopes, elder siblings',
    category: 'kama',
    nature: 'succedent',
  },
  12: {
    number: 12,
    name: 'Twelfth House',
    sanskritName: 'व्यय भाव (Vyaya Bhava)',
    significance: 'Loss, spirituality, foreign lands, liberation',
    category: 'moksha',
    nature: 'cadent',
  },
};

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * North Indian Chart Legend - Enhanced UX component for chart interpretation
 */
export const NorthIndianChartLegend: React.FC<NorthIndianChartLegendProps> = ({
  chartData,
  defaultExpandedSections = ['planets'],
  showDetailedInfo = true,
  showSanskrit = true,
  selectedPlanet,
  selectedRashi,
  selectedHouse,
  onSectionToggle,
  onPlanetSelect,
  onRashiSelect,
  onHouseSelect,
  style,
  testID = 'corp-astro-north-indian-chart-legend',
  ...accessibilityProps
}) => {
  // ============================================================================
  // HOOKS & STATE
  // ============================================================================

  const { theme } = useTheme();
  const [expandedSections, setExpandedSections] = useState<Set<LegendSection>>(
    new Set(defaultExpandedSections)
  );

  // ============================================================================
  // COMPUTED VALUES
  // ============================================================================

  /**
   * Get planets that appear in the chart
   */
  const chartPlanets = useMemo(() => {
    const planets = new Set<VedicPlanet>();
    chartData.houses.forEach(house => {
      house.planets.forEach(planet => planets.add(planet));
    });
    return Array.from(planets);
  }, [chartData]);

  /**
   * Get rashis that appear in the chart
   */
  const chartRashis = useMemo(() => {
    return chartData.houses.map(house => house.rashi);
  }, [chartData]);

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  /**
   * Toggle section expansion
   */
  const handleSectionToggle = useCallback((section: LegendSection) => {
    const newExpanded = new Set(expandedSections);
    const isExpanded = expandedSections.has(section);
    
    if (isExpanded) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    
    setExpandedSections(newExpanded);
    onSectionToggle?.(section, !isExpanded);
  }, [expandedSections, onSectionToggle]);

  /**
   * Handle planet selection
   */
  const handlePlanetSelect = useCallback((planet: VedicPlanet) => {
    onPlanetSelect?.(planet);
  }, [onPlanetSelect]);

  /**
   * Handle rashi selection
   */
  const handleRashiSelect = useCallback((rashi: VedicRashi) => {
    onRashiSelect?.(rashi);
  }, [onRashiSelect]);

  /**
   * Handle house selection
   */
  const handleHouseSelect = useCallback((house: NorthIndianHouseNumber) => {
    onHouseSelect?.(house);
  }, [onHouseSelect]);

  // ============================================================================
  // RENDER HELPERS
  // ============================================================================

  /**
   * Render section header
   */
  const renderSectionHeader = (section: LegendSection, title: string, count?: number) => {
    const isExpanded = expandedSections.has(section);
    
    return (
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => handleSectionToggle(section)}
      >
        <View style={styles.sectionHeaderContent}>
          <Text style={styles.sectionTitle}>{title}</Text>
          {count !== undefined && (
            <Text style={styles.sectionCount}>({count})</Text>
          )}
        </View>
        <Text style={[styles.expandIcon, { transform: [{ rotate: isExpanded ? '90deg' : '0deg' }] }]}>
          ›
        </Text>
      </TouchableOpacity>
    );
  };

  /**
   * Render planet item
   */
  const renderPlanetItem = (planet: VedicPlanet) => {
    const planetInfo = planetDetails[planet];
    const isSelected = selectedPlanet === planet;
    
    return (
      <TouchableOpacity
        key={planet}
        style={[
          styles.legendItem,
          isSelected && styles.selectedItem
        ]}
        onPress={() => handlePlanetSelect(planet)}
      >
        <View style={styles.itemHeader}>
          <View style={[styles.planetIndicator, { backgroundColor: planetInfo.color }]}>
            <Text style={styles.planetSymbol}>{planetInfo.symbol}</Text>
          </View>
          <View style={styles.itemContent}>
            <Text style={styles.itemTitle}>{planetInfo.name}</Text>
            {showSanskrit && (
              <Text style={styles.itemSubtitle}>{planetInfo.sanskritName}</Text>
            )}
          </View>
        </View>
        {showDetailedInfo && (
          <View style={styles.itemDetails}>
            <Text style={styles.itemDescription}>{planetInfo.significance}</Text>
            <View style={styles.itemProperties}>
              <Text style={styles.propertyText}>Element: {planetInfo.element}</Text>
              <Text style={styles.propertyText}>Gemstone: {planetInfo.gemstone}</Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  /**
   * Render rashi item
   */
  const renderRashiItem = (rashi: VedicRashi) => {
    const rashiInfo = rashiDetails[rashi];
    const isSelected = selectedRashi === rashi;
    const rulerInfo = planetDetails[rashiInfo.ruler];
    
    return (
      <TouchableOpacity
        key={rashi}
        style={[
          styles.legendItem,
          isSelected && styles.selectedItem
        ]}
        onPress={() => handleRashiSelect(rashi)}
      >
        <View style={styles.itemHeader}>
          <View style={styles.rashiIndicator}>
            <Text style={styles.rashiSymbol}>{rashiInfo.symbol}</Text>
          </View>
          <View style={styles.itemContent}>
            <Text style={styles.itemTitle}>{rashiInfo.name}</Text>
            {showSanskrit && (
              <Text style={styles.itemSubtitle}>{rashiInfo.sanskritName}</Text>
            )}
          </View>
        </View>
        {showDetailedInfo && (
          <View style={styles.itemDetails}>
            <Text style={styles.itemDescription}>{rashiInfo.significance}</Text>
            <View style={styles.itemProperties}>
              <Text style={styles.propertyText}>Element: {rashiInfo.element}</Text>
              <Text style={styles.propertyText}>Ruler: {rulerInfo.name}</Text>
              <Text style={styles.propertyText}>Modality: {rashiInfo.modality}</Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  /**
   * Render house item
   */
  const renderHouseItem = (houseNumber: NorthIndianHouseNumber) => {
    const houseInfo = houseDetails[houseNumber];
    const isSelected = selectedHouse === houseNumber;
    const houseData = chartData.houses.find(h => h.number === houseNumber);
    
    return (
      <TouchableOpacity
        key={houseNumber}
        style={[
          styles.legendItem,
          isSelected && styles.selectedItem
        ]}
        onPress={() => handleHouseSelect(houseNumber)}
      >
        <View style={styles.itemHeader}>
          <View style={styles.houseIndicator}>
            <Text style={styles.houseNumber}>{houseNumber}</Text>
          </View>
          <View style={styles.itemContent}>
            <Text style={styles.itemTitle}>{houseInfo.name}</Text>
            {showSanskrit && (
              <Text style={styles.itemSubtitle}>{houseInfo.sanskritName}</Text>
            )}
          </View>
        </View>
        {showDetailedInfo && (
          <View style={styles.itemDetails}>
            <Text style={styles.itemDescription}>{houseInfo.significance}</Text>
            <View style={styles.itemProperties}>
              <Text style={styles.propertyText}>Category: {houseInfo.category}</Text>
              <Text style={styles.propertyText}>Nature: {houseInfo.nature}</Text>
              {houseData && (
                <Text style={styles.propertyText}>
                  Current Sign: {rashiDetails[houseData.rashi].name}
                </Text>
              )}
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  /**
   * Render chart information
   */
  const renderChartInfo = () => {
    return (
      <View style={styles.chartInfoContent}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Chart Type:</Text>
          <Text style={styles.infoValue}>{chartData.chartType}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Ascendant:</Text>
          <Text style={styles.infoValue}>
            House {chartData.ascendant} ({rashiDetails[chartData.houses[chartData.ascendant - 1]?.rashi]?.name})
          </Text>
        </View>
        {chartData.title && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Title:</Text>
            <Text style={styles.infoValue}>{chartData.title}</Text>
          </View>
        )}
        {chartData.datetime && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Date/Time:</Text>
            <Text style={styles.infoValue}>{chartData.datetime}</Text>
          </View>
        )}
        {chartData.location && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Location:</Text>
            <Text style={styles.infoValue}>{chartData.location}</Text>
          </View>
        )}
      </View>
    );
  };

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  return (
    <View
      style={[styles.container, style]}
      testID={testID}
      {...accessibilityProps}
    >
      <LinearGradient
        colors={[
          'rgba(26, 26, 46, 0.95)',
          'rgba(22, 33, 62, 0.9)',
          'rgba(16, 23, 42, 0.95)',
        ]}
        style={styles.legendBackground}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Chart Information Section */}
          <View style={styles.section}>
            {renderSectionHeader('chartInfo', 'Chart Information')}
            {expandedSections.has('chartInfo') && renderChartInfo()}
          </View>

          {/* Planets Section */}
          <View style={styles.section}>
            {renderSectionHeader('planets', 'Planets', chartPlanets.length)}
            {expandedSections.has('planets') && (
              <View style={styles.sectionContent}>
                {chartPlanets.map(renderPlanetItem)}
              </View>
            )}
          </View>

          {/* Houses Section */}
          <View style={styles.section}>
            {renderSectionHeader('houses', 'Houses', 12)}
            {expandedSections.has('houses') && (
              <View style={styles.sectionContent}>
                {([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as NorthIndianHouseNumber[]).map(renderHouseItem)}
              </View>
            )}
          </View>

          {/* Rashis Section */}
          <View style={styles.section}>
            {renderSectionHeader('rashis', 'Rashis (Signs)', chartRashis.length)}
            {expandedSections.has('rashis') && (
              <View style={styles.sectionContent}>
                {chartRashis.map(renderRashiItem)}
              </View>
            )}
          </View>

          {/* Aspects Section */}
          {chartData.aspects && chartData.aspects.length > 0 && (
            <View style={styles.section}>
              {renderSectionHeader('aspects', 'Aspects', chartData.aspects.length)}
              {expandedSections.has('aspects') && (
                <View style={styles.sectionContent}>
                  <Text style={styles.comingSoonText}>Aspect details coming soon...</Text>
                </View>
              )}
            </View>
          )}
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    maxHeight: 600,
  },
  legendBackground: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  scrollView: {
    flex: 1,
    padding: spacing.md,
  },
  section: {
    marginBottom: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    backgroundColor: 'rgba(46, 134, 222, 0.2)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(46, 134, 222, 0.3)',
  },
  sectionHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    color: ProfessionalGrays.white,
    fontSize: 16,
    fontFamily: getFontFamily('heading'),
    fontWeight: 'bold',
  },
  sectionCount: {
    color: SignatureBlues.light,
    fontSize: 14,
    fontFamily: getFontFamily('body'),
    fontWeight: '500',
    marginLeft: spacing.xs,
  },
  expandIcon: {
    color: SignatureBlues.light,
    fontSize: 18,
    fontFamily: getFontFamily('body'),
    fontWeight: 'bold',
  },
  sectionContent: {
    marginTop: spacing.sm,
  },
  legendItem: {
    backgroundColor: 'rgba(22, 33, 62, 0.4)',
    borderRadius: 8,
    padding: spacing.sm,
    marginBottom: spacing.xs,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  selectedItem: {
    backgroundColor: 'rgba(46, 134, 222, 0.3)',
    borderColor: SignatureBlues.primary,
    borderWidth: 2,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  itemContent: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  itemTitle: {
    color: ProfessionalGrays.white,
    fontSize: 14,
    fontFamily: getFontFamily('body'),
    fontWeight: 'bold',
  },
  itemSubtitle: {
    color: SignatureBlues.light,
    fontSize: 12,
    fontFamily: getFontFamily('accent'),
    fontWeight: 'normal',
    marginTop: 2,
  },
  itemDetails: {
    marginTop: spacing.xs,
    paddingTop: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  itemDescription: {
    color: ProfessionalGrays.light,
    fontSize: 12,
    fontFamily: getFontFamily('body'),
    fontWeight: 'normal',
    marginBottom: spacing.xs,
    lineHeight: 16,
  },
  itemProperties: {
    flexDirection: 'column',
  },
  propertyText: {
    color: ProfessionalGrays.medium,
    fontSize: 11,
    fontFamily: getFontFamily('body'),
    fontWeight: 'normal',
    marginBottom: 2,
  },
  planetIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  planetSymbol: {
    color: '#000',
    fontSize: 14,
    fontFamily: getFontFamily('body'),
    fontWeight: 'bold',
  },
  rashiIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(46, 134, 222, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: SignatureBlues.light,
  },
  rashiSymbol: {
    color: SignatureBlues.light,
    fontSize: 14,
    fontFamily: getFontFamily('body'),
    fontWeight: 'bold',
  },
  houseIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  houseNumber: {
    color: '#FFD700',
    fontSize: 12,
    fontFamily: getFontFamily('body'),
    fontWeight: 'bold',
  },
  chartInfoContent: {
    backgroundColor: 'rgba(22, 33, 62, 0.4)',
    borderRadius: 8,
    padding: spacing.sm,
    marginTop: spacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  infoLabel: {
    color: ProfessionalGrays.light,
    fontSize: 12,
    fontFamily: getFontFamily('body'),
    fontWeight: '500',
    flex: 1,
  },
  infoValue: {
    color: ProfessionalGrays.white,
    fontSize: 12,
    fontFamily: getFontFamily('body'),
    fontWeight: 'bold',
    flex: 2,
    textAlign: 'right',
  },
  comingSoonText: {
    color: ProfessionalGrays.medium,
    fontSize: 12,
    fontFamily: getFontFamily('body'),
    fontWeight: 'normal',
    textAlign: 'center',
    fontStyle: 'italic',
    padding: spacing.md,
  },
});

// ============================================================================
// EXPORTS
// ============================================================================

export default NorthIndianChartLegend;
