/**
 * Corp Astro UI Library - North Indian Chart Example Usage
 * Module 175: NorthIndianChartExample.tsx
 * 
 * A comprehensive example demonstrating how to use all North Indian Chart
 * components together for enhanced user experience and data visualization.
 * 
 * This example shows:
 * - Complete North Indian chart setup with sample data
 * - Integration of chart, legend, data processor, and navigator
 * - Interactive chart exploration features
 * - Real-world usage patterns and best practices
 * - Performance optimization techniques
 * - Responsive design considerations
 * 
 * Features Demonstrated:
 * - Chart data processing from raw astrological data
 * - Interactive navigation and exploration
 * - Legend integration for enhanced understanding
 * - Multiple chart type support (D1, D9, etc.)
 * - Aspect visualization and analysis
 * - Planetary dignity calculations
 * - User experience enhancements
 * 
 * @module NorthIndianChartExample
 * @version 1.0.0
 * @since 2024
 */

import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  AccessibilityProps,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../foundations/themes/useTheme';
import { SignatureBlues } from '../foundations/tokens/colors/SignatureBlues';
import { ProfessionalGrays } from '../foundations/tokens/colors/ProfessionalGrays';
import { deepSpaceColors } from '../foundations/tokens/colors/DeepSpaceColors';
import { spacing } from '../foundations/tokens/spacing/SpacingScale';
import { getFontFamily } from '../foundations/tokens/typography/FontFamilies';

// Import North Indian Chart components
import { 
  NorthIndianChart,
  NorthIndianChartLegend,
  NorthIndianChartDataProcessor,
  NorthIndianChartNavigator,
  type VedicPlanet,
  type VedicRashi,
  type NorthIndianHouseNumber,
  type NorthIndianChartData,
  type RawAstrologicalData,
  type ChartViewMode,
} from './index';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface NorthIndianChartExampleProps extends AccessibilityProps {
  /** Custom styling */
  style?: ViewStyle;
  /** Enable interactive mode */
  interactive?: boolean;
  /** Show example controls */
  showControls?: boolean;
  /** Test ID for testing */
  testID?: string;
}

export interface ExampleState {
  selectedChart: string;
  viewMode: ChartViewMode;
  showLegend: boolean;
  showNavigator: boolean;
  selectedPlanet?: VedicPlanet;
  selectedHouse?: NorthIndianHouseNumber;
}

// ============================================================================
// SAMPLE DATA
// ============================================================================

/**
 * Sample raw astrological data for demonstration
 * This represents a typical birth chart in Vedic astrology
 */
const sampleRawData: RawAstrologicalData = {
  datetime: '1990-07-15T14:30:00Z',
  location: 'New Delhi, India (28°36\'N, 77°12\'E)',
  title: 'Sample Birth Chart',
  // Planetary positions in degrees (0-360)
  planets: {
    sun: 83.5,        // Cancer
    moon: 245.2,      // Sagittarius
    mercury: 95.7,    // Cancer
    venus: 125.3,     // Leo
    mars: 310.8,      // Aquarius
    jupiter: 115.9,   // Leo
    saturn: 285.4,    // Capricorn
    rahu: 335.1,      // Pisces
    ketu: 155.1,      // Virgo
    uranus: 305.6,    // Aquarius
    neptune: 285.9,   // Capricorn
    pluto: 225.3,     // Scorpio
  },
  // House cusps in degrees
  houseCusps: [
    75,   // 1st house cusp (Ascendant)
    105,  // 2nd house cusp
    135,  // 3rd house cusp
    165,  // 4th house cusp
    195,  // 5th house cusp
    225,  // 6th house cusp
    255,  // 7th house cusp
    285,  // 8th house cusp
    315,  // 9th house cusp
    345,  // 10th house cusp
    15,   // 11th house cusp
    45,   // 12th house cusp
  ],
  ascendant: 75,      // Ascendant degree
  ayanamsa: 'Lahiri', // Ayanamsa system
  chartType: 'D1',    // Chart type
};

/**
 * Sample Navamsa (D9) chart data
 */
const sampleNavamsaData: RawAstrologicalData = {
  ...sampleRawData,
  chartType: 'D9',
  title: 'Sample Navamsa Chart (D9)',
  // Modified planetary positions for D9
  planets: {
    sun: 245.5,       // Sagittarius
    moon: 83.2,       // Cancer
    mercury: 155.7,   // Virgo
    venus: 185.3,     // Libra
    mars: 70.8,       // Cancer
    jupiter: 275.9,   // Capricorn
    saturn: 145.4,    // Virgo
    rahu: 95.1,       // Cancer
    ketu: 275.1,      // Capricorn
    uranus: 65.6,     // Gemini
    neptune: 45.9,    // Taurus
    pluto: 85.3,      // Cancer
  },
};

/**
 * Sample Dasamsa (D10) chart data
 */
const sampleDasamsaData: RawAstrologicalData = {
  ...sampleRawData,
  chartType: 'D10',
  title: 'Sample Dasamsa Chart (D10)',
  // Modified planetary positions for D10
  planets: {
    sun: 125.5,       // Leo
    moon: 305.2,      // Aquarius
    mercury: 215.7,   // Scorpio
    venus: 245.3,     // Sagittarius
    mars: 130.8,      // Leo
    jupiter: 335.9,   // Pisces
    saturn: 205.4,    // Scorpio
    rahu: 155.1,      // Virgo
    ketu: 335.1,      // Pisces
    uranus: 125.6,    // Leo
    neptune: 105.9,   // Cancer
    pluto: 145.3,     // Leo
  },
};

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * North Indian Chart Example Usage Component
 */
export const NorthIndianChartExample: React.FC<NorthIndianChartExampleProps> = ({
  style,
  interactive = true,
  showControls = true,
  testID = 'corp-astro-north-indian-chart-example',
  ...accessibilityProps
}) => {
  // ============================================================================
  // HOOKS & STATE
  // ============================================================================

  const { theme } = useTheme();
  
  const [exampleState, setExampleState] = useState<ExampleState>({
    selectedChart: 'D1',
    viewMode: 'standard',
    showLegend: true,
    showNavigator: false,
    selectedPlanet: undefined,
    selectedHouse: undefined,
  });

  // ============================================================================
  // COMPUTED VALUES
  // ============================================================================

  /**
   * Available chart data for navigation
   */
  const availableCharts = useMemo(() => ({
    D1: sampleRawData,
    D9: sampleNavamsaData,
    D10: sampleDasamsaData,
  }), []);

  /**
   * Current raw data based on selected chart
   */
  const currentRawData = useMemo(() => {
    return availableCharts[exampleState.selectedChart as keyof typeof availableCharts] || sampleRawData;
  }, [availableCharts, exampleState.selectedChart]);

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  /**
   * Update example state
   */
  const updateState = useCallback((updates: Partial<ExampleState>) => {
    setExampleState(prev => ({ ...prev, ...updates }));
  }, []);

  /**
   * Handle chart selection
   */
  const handleChartSelection = useCallback((chartType: string) => {
    updateState({ selectedChart: chartType });
  }, [updateState]);

  /**
   * Handle view mode change
   */
  const handleViewModeChange = useCallback((mode: ChartViewMode) => {
    updateState({ viewMode: mode });
  }, [updateState]);

  /**
   * Handle element selection
   */
  const handleElementSelection = useCallback((
    type: 'planet' | 'house' | 'rashi',
    value: any
  ) => {
    if (type === 'planet') {
      updateState({ selectedPlanet: value });
      Alert.alert(
        'Planet Selected',
        `You selected ${value}. Check the legend for detailed information.`,
        [{ text: 'OK' }]
      );
    } else if (type === 'house') {
      updateState({ selectedHouse: value });
      Alert.alert(
        'House Selected',
        `You selected House ${value}. This house represents specific life areas.`,
        [{ text: 'OK' }]
      );
    }
  }, [updateState]);

  /**
   * Handle processed data demonstration
   */
  const handleShowAnalysis = useCallback((analysis: any) => {
    const {
      planetCount,
      dominantElement,
      dominantModality,
      exaltedPlanets,
      debilitatedPlanets,
      strongAspects,
    } = analysis;

    Alert.alert(
      'Chart Analysis Summary',
      `Planets: ${planetCount}\nDominant Element: ${dominantElement}\nDominant Modality: ${dominantModality}\nExalted Planets: ${exaltedPlanets.length}\nDebilitated Planets: ${debilitatedPlanets.length}\nStrong Aspects: ${strongAspects}`,
      [{ text: 'OK' }]
    );
  }, []);

  // ============================================================================
  // RENDER HELPERS
  // ============================================================================

  /**
   * Render example controls
   */
  const renderControls = () => (
    <View style={styles.controlsContainer}>
      <LinearGradient
        colors={[
          'rgba(26, 26, 46, 0.95)',
          'rgba(22, 33, 62, 0.9)',
        ]}
        style={styles.controlsBackground}
      >
        <Text style={styles.controlsTitle}>Example Controls</Text>
        
        <View style={styles.controlSection}>
          <Text style={styles.controlLabel}>Chart Type:</Text>
          <View style={styles.buttonRow}>
            {Object.keys(availableCharts).map(chartType => (
              <TouchableOpacity
                key={chartType}
                style={[
                  styles.controlButton,
                  exampleState.selectedChart === chartType && styles.activeButton
                ]}
                onPress={() => handleChartSelection(chartType)}
              >
                <Text style={[
                  styles.buttonText,
                  exampleState.selectedChart === chartType && styles.activeButtonText
                ]}>
                  {chartType}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.controlSection}>
          <Text style={styles.controlLabel}>View Options:</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[
                styles.controlButton,
                exampleState.showLegend && styles.activeButton
              ]}
              onPress={() => updateState({ showLegend: !exampleState.showLegend })}
            >
              <Text style={[
                styles.buttonText,
                exampleState.showLegend && styles.activeButtonText
              ]}>
                Legend
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.controlButton,
                exampleState.showNavigator && styles.activeButton
              ]}
              onPress={() => updateState({ showNavigator: !exampleState.showNavigator })}
            >
              <Text style={[
                styles.buttonText,
                exampleState.showNavigator && styles.activeButtonText
              ]}>
                Navigator
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.controlSection}>
          <Text style={styles.controlLabel}>Selected Elements:</Text>
          {exampleState.selectedPlanet && (
            <Text style={styles.selectedText}>
              Planet: {exampleState.selectedPlanet}
            </Text>
          )}
          {exampleState.selectedHouse && (
            <Text style={styles.selectedText}>
              House: {exampleState.selectedHouse}
            </Text>
          )}
          {!exampleState.selectedPlanet && !exampleState.selectedHouse && (
            <Text style={styles.noSelectionText}>
              Tap on chart elements to select them
            </Text>
          )}
        </View>
      </LinearGradient>
    </View>
  );

  /**
   * Render chart with data processor
   */
  const renderChartWithProcessor = () => (
    <NorthIndianChartDataProcessor
      rawData={currentRawData}
      includeAspects={true}
      includeDignities={true}
    >
      {({ chartData, dignities, aspects, analysis, isProcessing, error }) => {
        if (isProcessing) {
          return (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Processing chart data...</Text>
            </View>
          );
        }

        if (error) {
          return (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>Error: {error}</Text>
            </View>
          );
        }

        return (
          <View style={styles.chartContainer}>
            {/* Show analysis button */}
            <TouchableOpacity
              style={styles.analysisButton}
              onPress={() => handleShowAnalysis(analysis)}
            >
              <Text style={styles.analysisButtonText}>
                📊 Show Analysis ({analysis.planetCount} planets)
              </Text>
            </TouchableOpacity>

            {/* Chart with Navigator or Standard Display */}
            {exampleState.showNavigator ? (
              <NorthIndianChartNavigator
                chartData={chartData}
                availableCharts={Object.fromEntries(
                  Object.entries(availableCharts).map(([key, rawData]) => [
                    key,
                    chartData, // In real usage, you'd process each chart separately
                  ])
                )}
                enableGestures={interactive}
                onElementSelect={handleElementSelection}
                onChartChange={handleChartSelection}
                onViewModeChange={handleViewModeChange}
                style={styles.navigator}
              />
            ) : (
              <View style={styles.standardChartContainer}>
                <NorthIndianChart
                  data={chartData}
                  interactive={interactive}
                  showPlanetSymbols={true}
                  showHouseNumbers={true}
                  onPlanetPress={(planet, house) => handleElementSelection('planet', planet)}
                  onHousePress={(house) => handleElementSelection('house', house.number)}
                  style={styles.chart}
                />

                {/* Legend */}
                {exampleState.showLegend && (
                  <View style={styles.legendWrapper}>
                    <NorthIndianChartLegend
                      chartData={chartData}
                      selectedPlanet={exampleState.selectedPlanet}
                      selectedHouse={exampleState.selectedHouse}
                      onPlanetSelect={(planet) => handleElementSelection('planet', planet)}
                      onHouseSelect={(house) => handleElementSelection('house', house)}
                      style={styles.legend}
                    />
                  </View>
                )}
              </View>
            )}

            {/* Dignities Info */}
            {dignities.length > 0 && (
              <View style={styles.dignitiesContainer}>
                <Text style={styles.dignitiesTitle}>Planetary Dignities:</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {dignities.map(dignity => (
                    <View key={dignity.planet} style={styles.dignityItem}>
                      <Text style={styles.dignityPlanet}>{dignity.planet}</Text>
                      <Text style={styles.dignityStatus}>{dignity.dignity}</Text>
                      <Text style={styles.dignityStrength}>{dignity.strength}%</Text>
                    </View>
                  ))}
                </ScrollView>
              </View>
            )}

            {/* Aspects Info */}
            {aspects.length > 0 && (
              <View style={styles.aspectsContainer}>
                <Text style={styles.aspectsTitle}>
                  Major Aspects ({aspects.filter(a => a.strength > 70).length} strong):
                </Text>
                <Text style={styles.aspectsSummary}>
                  {aspects.slice(0, 3).map(aspect => 
                    `${aspect.fromPlanet}-${aspect.toPlanet} (${aspect.type})`
                  ).join(', ')}
                  {aspects.length > 3 && '...'}
                </Text>
              </View>
            )}
          </View>
        );
      }}
    </NorthIndianChartDataProcessor>
  );

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  return (
    <SafeAreaView
      style={[styles.container, style]}
      testID={testID}
      {...accessibilityProps}
    >
      <LinearGradient
        colors={[
          'rgba(16, 23, 42, 1)',
          'rgba(22, 33, 62, 0.95)',
          'rgba(26, 26, 46, 0.9)',
        ]}
        style={styles.backgroundGradient}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>North Indian Chart Example</Text>
            <Text style={styles.subtitle}>
              Comprehensive demonstration of Vedic astrology chart components
            </Text>
          </View>

          {/* Controls */}
          {showControls && renderControls()}

          {/* Chart Display */}
          {renderChartWithProcessor()}

          {/* Usage Notes */}
          <View style={styles.notesContainer}>
            <Text style={styles.notesTitle}>Usage Notes:</Text>
            <Text style={styles.notesText}>
              • This example demonstrates all North Indian chart components working together{'\n'}
              • Tap chart elements to select and explore them{'\n'}
              • Switch between different chart types (D1, D9, D10){'\n'}
              • Use the navigator for advanced interactions{'\n'}
              • Check the analysis button for computed chart insights{'\n'}
              • All components follow Corp Astro design system guidelines
            </Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  title: {
    color: ProfessionalGrays.white,
    fontSize: 24,
    fontFamily: getFontFamily('heading'),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    color: SignatureBlues.light,
    fontSize: 16,
    fontFamily: getFontFamily('body'),
    textAlign: 'center',
    lineHeight: 22,
  },
  controlsContainer: {
    margin: spacing.md,
    borderRadius: 12,
    overflow: 'hidden',
  },
  controlsBackground: {
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  controlsTitle: {
    color: ProfessionalGrays.white,
    fontSize: 18,
    fontFamily: getFontFamily('heading'),
    fontWeight: 'bold',
    marginBottom: spacing.md,
  },
  controlSection: {
    marginBottom: spacing.md,
  },
  controlLabel: {
    color: ProfessionalGrays.light,
    fontSize: 14,
    fontFamily: getFontFamily('body'),
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  controlButton: {
    backgroundColor: 'rgba(22, 33, 62, 0.6)',
    borderRadius: 8,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    marginRight: spacing.sm,
    marginBottom: spacing.xs,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  activeButton: {
    backgroundColor: 'rgba(46, 134, 222, 0.3)',
    borderColor: SignatureBlues.primary,
  },
  buttonText: {
    color: ProfessionalGrays.light,
    fontSize: 12,
    fontFamily: getFontFamily('body'),
    fontWeight: '500',
  },
  activeButtonText: {
    color: SignatureBlues.light,
  },
  selectedText: {
    color: SignatureBlues.light,
    fontSize: 12,
    fontFamily: getFontFamily('body'),
    marginBottom: 4,
  },
  noSelectionText: {
    color: ProfessionalGrays.medium,
    fontSize: 12,
    fontFamily: getFontFamily('body'),
    fontStyle: 'italic',
  },
  chartContainer: {
    margin: spacing.md,
  },
  loadingContainer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  loadingText: {
    color: ProfessionalGrays.light,
    fontSize: 16,
    fontFamily: getFontFamily('body'),
  },
  errorContainer: {
    padding: spacing.lg,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 59, 48, 0.3)',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    fontFamily: getFontFamily('body'),
    textAlign: 'center',
  },
  analysisButton: {
    backgroundColor: 'rgba(46, 134, 222, 0.2)',
    borderRadius: 8,
    padding: spacing.sm,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: SignatureBlues.primary,
    alignItems: 'center',
  },
  analysisButtonText: {
    color: SignatureBlues.light,
    fontSize: 14,
    fontFamily: getFontFamily('body'),
    fontWeight: '600',
  },
  navigator: {
    height: 600,
  },
  standardChartContainer: {
    flexDirection: 'row',
  },
  chart: {
    flex: 1,
    height: 400,
  },
  legendWrapper: {
    width: 300,
    marginLeft: spacing.md,
  },
  legend: {
    height: 400,
  },
  dignitiesContainer: {
    marginTop: spacing.md,
    padding: spacing.sm,
    backgroundColor: 'rgba(22, 33, 62, 0.4)',
    borderRadius: 8,
  },
  dignitiesTitle: {
    color: ProfessionalGrays.white,
    fontSize: 14,
    fontFamily: getFontFamily('body'),
    fontWeight: 'bold',
    marginBottom: spacing.sm,
  },
  dignityItem: {
    alignItems: 'center',
    marginRight: spacing.md,
    padding: spacing.xs,
    backgroundColor: 'rgba(46, 134, 222, 0.1)',
    borderRadius: 6,
    minWidth: 60,
  },
  dignityPlanet: {
    color: ProfessionalGrays.white,
    fontSize: 11,
    fontFamily: getFontFamily('body'),
    fontWeight: 'bold',
  },
  dignityStatus: {
    color: SignatureBlues.light,
    fontSize: 10,
    fontFamily: getFontFamily('body'),
  },
  dignityStrength: {
    color: ProfessionalGrays.light,
    fontSize: 9,
    fontFamily: getFontFamily('body'),
  },
  aspectsContainer: {
    marginTop: spacing.sm,
    padding: spacing.sm,
    backgroundColor: 'rgba(22, 33, 62, 0.4)',
    borderRadius: 8,
  },
  aspectsTitle: {
    color: ProfessionalGrays.white,
    fontSize: 14,
    fontFamily: getFontFamily('body'),
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  aspectsSummary: {
    color: ProfessionalGrays.light,
    fontSize: 12,
    fontFamily: getFontFamily('body'),
    lineHeight: 16,
  },
  notesContainer: {
    margin: spacing.md,
    padding: spacing.md,
    backgroundColor: 'rgba(26, 26, 46, 0.6)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  notesTitle: {
    color: ProfessionalGrays.white,
    fontSize: 16,
    fontFamily: getFontFamily('body'),
    fontWeight: 'bold',
    marginBottom: spacing.sm,
  },
  notesText: {
    color: ProfessionalGrays.light,
    fontSize: 13,
    fontFamily: getFontFamily('body'),
    lineHeight: 18,
  },
});

// ============================================================================
// EXPORTS
// ============================================================================

export default NorthIndianChartExample;
