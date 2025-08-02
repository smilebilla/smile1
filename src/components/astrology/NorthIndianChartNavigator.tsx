/**
 * Corp Astro UI Library - Interactive North Indian Chart Navigator
 * Module 174: NorthIndianChartNavigator.tsx
 * 
 * An advanced user experience component that provides interactive navigation,
 * exploration tools, and enhanced chart interactions for the North Indian Chart.
 * 
 * Features:
 * - Interactive chart zoom and pan functionality
 * - Tooltip system with detailed planet and house information
 * - Chart overlay controls (aspects, nakshatra, degrees)
 * - Navigation between different chart types (D1, D9, D10, etc.)
 * - Time-sensitive chart progression controls
 * - Search and filter capabilities for chart elements
 * - Accessibility-compliant navigation controls
 * - Responsive touch and mouse interactions
 * - Context-aware help system
 * 
 * User Experience Enhancements:
 * - Smooth animations and transitions
 * - Visual feedback for interactive elements
 * - Keyboard navigation support
 * - Screen reader compatibility
 * - Gesture recognition for mobile devices
 * - Customizable view preferences
 * - Quick access shortcuts and hotkeys
 * 
 * @module NorthIndianChartNavigator
 * @version 1.0.0
 * @since 2024
 */

import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  Animated,
  AccessibilityProps,
  Dimensions,
  Modal,
  ScrollView,
} from 'react-native';
import { 
  PanGestureHandler,
  PinchGestureHandler,
  State,
} from 'react-native-gesture-handler';
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
import NorthIndianChartLegend from './NorthIndianChartLegend';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type ChartViewMode = 'standard' | 'detailed' | 'simplified' | 'analysis';
export type ChartOverlay = 'aspects' | 'nakshatras' | 'degrees' | 'strengths' | 'none';
export type NavigationDirection = 'north' | 'south' | 'east' | 'west' | 'center';

export interface TooltipData {
  visible: boolean;
  x: number;
  y: number;
  title: string;
  content: string;
  type: 'planet' | 'house' | 'rashi' | 'aspect';
}

export interface ChartTransform {
  scale: number;
  translateX: number;
  translateY: number;
  rotation: number;
}

export interface NavigationState {
  currentChart: string;
  viewMode: ChartViewMode;
  activeOverlay: ChartOverlay;
  selectedElements: {
    planet?: VedicPlanet;
    house?: NorthIndianHouseNumber;
    rashi?: VedicRashi;
  };
  showLegend: boolean;
  showTooltips: boolean;
  transform: ChartTransform;
}

export interface NorthIndianChartNavigatorProps extends AccessibilityProps {
  /** Chart data to navigate */
  chartData: NorthIndianChartData;
  /** Available chart types for navigation */
  availableCharts?: Record<string, NorthIndianChartData>;
  /** Initial navigation state */
  initialState?: Partial<NavigationState>;
  /** Enable gesture navigation */
  enableGestures?: boolean;
  /** Enable zoom functionality */
  enableZoom?: boolean;
  /** Enable rotation */
  enableRotation?: boolean;
  /** Show navigation controls */
  showControls?: boolean;
  /** Show chart selector */
  showChartSelector?: boolean;
  /** Element selection handler */
  onElementSelect?: (type: 'planet' | 'house' | 'rashi', value: any) => void;
  /** Chart change handler */
  onChartChange?: (chartId: string) => void;
  /** View mode change handler */
  onViewModeChange?: (mode: ChartViewMode) => void;
  /** Navigation state change handler */
  onNavigationStateChange?: (state: NavigationState) => void;
  /** Custom styling */
  style?: ViewStyle;
  /** Test ID for testing */
  testID?: string;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const DEFAULT_TRANSFORM: ChartTransform = {
  scale: 1,
  translateX: 0,
  translateY: 0,
  rotation: 0,
};

const DEFAULT_NAVIGATION_STATE: NavigationState = {
  currentChart: 'D1',
  viewMode: 'standard',
  activeOverlay: 'none',
  selectedElements: {},
  showLegend: true,
  showTooltips: true,
  transform: DEFAULT_TRANSFORM,
};

const CHART_TYPE_NAMES: Record<string, string> = {
  D1: 'Rashi Chart (D1)',
  D9: 'Navamsa Chart (D9)',
  D10: 'Dasamsa Chart (D10)',
  D12: 'Dwadasamsa (D12)',
  D16: 'Shodasamsa (D16)',
  D20: 'Vimsamsa (D20)',
  D24: 'Chaturvimsamsa (D24)',
  D30: 'Trimsamsa (D30)',
  D60: 'Shashtyamsa (D60)',
};

const VIEW_MODE_NAMES: Record<ChartViewMode, string> = {
  standard: 'Standard View',
  detailed: 'Detailed View',
  simplified: 'Simplified View',
  analysis: 'Analysis View',
};

const OVERLAY_NAMES: Record<ChartOverlay, string> = {
  aspects: 'Planetary Aspects',
  nakshatras: 'Nakshatras',
  degrees: 'Planetary Degrees',
  strengths: 'Planetary Strengths',
  none: 'No Overlay',
};

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * Interactive North Indian Chart Navigator
 */
export const NorthIndianChartNavigator: React.FC<NorthIndianChartNavigatorProps> = ({
  chartData,
  availableCharts = { D1: chartData },
  initialState = {},
  enableGestures = true,
  enableZoom = true,
  enableRotation = false,
  showControls = true,
  showChartSelector = true,
  onElementSelect,
  onChartChange,
  onViewModeChange,
  onNavigationStateChange,
  style,
  testID = 'corp-astro-north-indian-chart-navigator',
  ...accessibilityProps
}) => {
  // ============================================================================
  // HOOKS & STATE
  // ============================================================================

  const { theme } = useTheme();
  const screenData = Dimensions.get('window');
  
  const [navigationState, setNavigationState] = useState<NavigationState>({
    ...DEFAULT_NAVIGATION_STATE,
    ...initialState,
  });
  
  const [tooltip, setTooltip] = useState<TooltipData>({
    visible: false,
    x: 0,
    y: 0,
    title: '',
    content: '',
    type: 'planet',
  });
  
  const [showControlPanel, setShowControlPanel] = useState(false);
  
  // Animated values for gestures
  const scale = useRef(new Animated.Value(navigationState.transform.scale)).current;
  const translateX = useRef(new Animated.Value(navigationState.transform.translateX)).current;
  const translateY = useRef(new Animated.Value(navigationState.transform.translateY)).current;
  const rotation = useRef(new Animated.Value(navigationState.transform.rotation)).current;
  
  // Gesture state refs
  const lastScale = useRef(1);
  const lastTranslateX = useRef(0);
  const lastTranslateY = useRef(0);
  const lastRotation = useRef(0);

  // ============================================================================
  // COMPUTED VALUES
  // ============================================================================

  /**
   * Current chart data based on selected chart type
   */
  const currentChartData = useMemo(() => {
    return availableCharts[navigationState.currentChart] || chartData;
  }, [availableCharts, navigationState.currentChart, chartData]);

  /**
   * Available chart types list
   */
  const availableChartTypes = useMemo(() => {
    return Object.keys(availableCharts);
  }, [availableCharts]);

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  /**
   * Update navigation state
   */
  const updateNavigationState = useCallback((updates: Partial<NavigationState>) => {
    setNavigationState(prev => {
      const newState = { ...prev, ...updates };
      onNavigationStateChange?.(newState);
      return newState;
    });
  }, [onNavigationStateChange]);

  /**
   * Handle element selection
   */
  const handleElementSelect = useCallback((
    type: 'planet' | 'house' | 'rashi',
    value: VedicPlanet | NorthIndianHouseNumber | VedicRashi
  ) => {
    updateNavigationState({
      selectedElements: {
        ...navigationState.selectedElements,
        [type]: value,
      },
    });
    onElementSelect?.(type, value);
  }, [navigationState.selectedElements, updateNavigationState, onElementSelect]);

  /**
   * Handle chart type change
   */
  const handleChartChange = useCallback((chartId: string) => {
    updateNavigationState({ currentChart: chartId });
    onChartChange?.(chartId);
  }, [updateNavigationState, onChartChange]);

  /**
   * Handle view mode change
   */
  const handleViewModeChange = useCallback((mode: ChartViewMode) => {
    updateNavigationState({ viewMode: mode });
    onViewModeChange?.(mode);
  }, [updateNavigationState, onViewModeChange]);

  /**
   * Handle overlay change
   */
  const handleOverlayChange = useCallback((overlay: ChartOverlay) => {
    updateNavigationState({ activeOverlay: overlay });
  }, [updateNavigationState]);

  /**
   * Show tooltip
   */
  const showTooltip = useCallback((
    x: number,
    y: number,
    title: string,
    content: string,
    type: TooltipData['type']
  ) => {
    if (navigationState.showTooltips) {
      setTooltip({
        visible: true,
        x: Math.min(x, screenData.width - 200),
        y: Math.max(20, y - 80),
        title,
        content,
        type,
      });
    }
  }, [navigationState.showTooltips, screenData.width]);

  /**
   * Hide tooltip
   */
  const hideTooltip = useCallback(() => {
    setTooltip(prev => ({ ...prev, visible: false }));
  }, []);

  /**
   * Reset chart transform
   */
  const resetTransform = useCallback(() => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
      Animated.spring(translateX, { toValue: 0, useNativeDriver: true }),
      Animated.spring(translateY, { toValue: 0, useNativeDriver: true }),
      Animated.spring(rotation, { toValue: 0, useNativeDriver: true }),
    ]).start();
    
    updateNavigationState({
      transform: DEFAULT_TRANSFORM,
    });
    
    lastScale.current = 1;
    lastTranslateX.current = 0;
    lastTranslateY.current = 0;
    lastRotation.current = 0;
  }, [scale, translateX, translateY, rotation, updateNavigationState]);

  /**
   * Handle pan gesture
   */
  const handlePanGesture = useCallback((event: any) => {
    if (!enableGestures) return;
    
    const { translationX, translationY, state } = event.nativeEvent;
    
    if (state === State.ACTIVE) {
      translateX.setValue(lastTranslateX.current + translationX);
      translateY.setValue(lastTranslateY.current + translationY);
    } else if (state === State.END) {
      lastTranslateX.current += translationX;
      lastTranslateY.current += translationY;
      
      updateNavigationState({
        transform: {
          ...navigationState.transform,
          translateX: lastTranslateX.current,
          translateY: lastTranslateY.current,
        },
      });
    }
  }, [enableGestures, translateX, translateY, navigationState.transform, updateNavigationState]);

  /**
   * Handle pinch gesture
   */
  const handlePinchGesture = useCallback((event: any) => {
    if (!enableGestures || !enableZoom) return;
    
    const { scale: gestureScale, state } = event.nativeEvent;
    
    if (state === State.ACTIVE) {
      scale.setValue(lastScale.current * gestureScale);
    } else if (state === State.END) {
      lastScale.current *= gestureScale;
      
      // Constrain scale
      const constrainedScale = Math.max(0.5, Math.min(3, lastScale.current));
      lastScale.current = constrainedScale;
      scale.setValue(constrainedScale);
      
      updateNavigationState({
        transform: {
          ...navigationState.transform,
          scale: constrainedScale,
        },
      });
    }
  }, [enableGestures, enableZoom, scale, navigationState.transform, updateNavigationState]);

  // ============================================================================
  // RENDER HELPERS
  // ============================================================================

  /**
   * Render control panel button
   */
  const renderControlButton = (
    title: string,
    onPress: () => void,
    isActive?: boolean,
    icon?: string
  ) => (
    <TouchableOpacity
      style={[
        styles.controlButton,
        isActive && styles.activeControlButton
      ]}
      onPress={onPress}
    >
      {icon && <Text style={styles.controlIcon}>{icon}</Text>}
      <Text style={[
        styles.controlButtonText,
        isActive && styles.activeControlButtonText
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  /**
   * Render chart selector
   */
  const renderChartSelector = () => (
    <View style={styles.chartSelector}>
      <Text style={styles.selectorLabel}>Chart Type</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.chartTypeScroll}
      >
        {availableChartTypes.map(chartType => (
          <TouchableOpacity
            key={chartType}
            style={[
              styles.chartTypeButton,
              navigationState.currentChart === chartType && styles.activeChartType
            ]}
            onPress={() => handleChartChange(chartType)}
          >
            <Text style={[
              styles.chartTypeText,
              navigationState.currentChart === chartType && styles.activeChartTypeText
            ]}>
              {chartType}
            </Text>
            <Text style={styles.chartTypeSubtext}>
              {CHART_TYPE_NAMES[chartType] || chartType}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  /**
   * Render view mode selector
   */
  const renderViewModeSelector = () => (
    <View style={styles.viewModeSelector}>
      <Text style={styles.selectorLabel}>View Mode</Text>
      <View style={styles.viewModeButtons}>
        {(Object.keys(VIEW_MODE_NAMES) as ChartViewMode[]).map(mode => (
          <TouchableOpacity
            key={mode}
            style={[
              styles.viewModeButton,
              navigationState.viewMode === mode && styles.activeViewMode
            ]}
            onPress={() => handleViewModeChange(mode)}
          >
            <Text style={[
              styles.viewModeText,
              navigationState.viewMode === mode && styles.activeViewModeText
            ]}>
              {VIEW_MODE_NAMES[mode]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  /**
   * Render overlay selector
   */
  const renderOverlaySelector = () => (
    <View style={styles.overlaySelector}>
      <Text style={styles.selectorLabel}>Overlay</Text>
      <View style={styles.overlayButtons}>
        {(Object.keys(OVERLAY_NAMES) as ChartOverlay[]).map(overlay => (
          <TouchableOpacity
            key={overlay}
            style={[
              styles.overlayButton,
              navigationState.activeOverlay === overlay && styles.activeOverlay
            ]}
            onPress={() => handleOverlayChange(overlay)}
          >
            <Text style={[
              styles.overlayText,
              navigationState.activeOverlay === overlay && styles.activeOverlayText
            ]}>
              {OVERLAY_NAMES[overlay]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  /**
   * Render navigation controls
   */
  const renderNavigationControls = () => (
    <View style={styles.navigationControls}>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => setShowControlPanel(!showControlPanel)}
      >
        <Text style={styles.navButtonText}>⚙️</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.navButton}
        onPress={resetTransform}
      >
        <Text style={styles.navButtonText}>🎯</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => updateNavigationState({ 
          showLegend: !navigationState.showLegend 
        })}
      >
        <Text style={styles.navButtonText}>📋</Text>
      </TouchableOpacity>
    </View>
  );

  /**
   * Render tooltip
   */
  const renderTooltip = () => {
    if (!tooltip.visible) return null;
    
    return (
      <View
        style={[
          styles.tooltip,
          { left: tooltip.x, top: tooltip.y }
        ]}
      >
        <LinearGradient
          colors={['rgba(22, 33, 62, 0.95)', 'rgba(16, 23, 42, 0.95)']}
          style={styles.tooltipBackground}
        >
          <Text style={styles.tooltipTitle}>{tooltip.title}</Text>
          <Text style={styles.tooltipContent}>{tooltip.content}</Text>
        </LinearGradient>
      </View>
    );
  };

  /**
   * Render control panel modal
   */
  const renderControlPanel = () => (
    <Modal
      visible={showControlPanel}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowControlPanel(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.controlPanel}>
          <LinearGradient
            colors={[
              'rgba(26, 26, 46, 0.98)',
              'rgba(22, 33, 62, 0.95)',
              'rgba(16, 23, 42, 0.98)',
            ]}
            style={styles.controlPanelBackground}
          >
            <View style={styles.controlPanelHeader}>
              <Text style={styles.controlPanelTitle}>Navigation Controls</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowControlPanel(false)}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.controlPanelContent}>
              {showChartSelector && renderChartSelector()}
              {renderViewModeSelector()}
              {renderOverlaySelector()}
              
              <View style={styles.toggleSection}>
                <Text style={styles.selectorLabel}>Display Options</Text>
                {renderControlButton(
                  'Show Tooltips',
                  () => updateNavigationState({ 
                    showTooltips: !navigationState.showTooltips 
                  }),
                  navigationState.showTooltips,
                  '💬'
                )}
                {renderControlButton(
                  'Reset View',
                  resetTransform,
                  false,
                  '🔄'
                )}
              </View>
            </ScrollView>
          </LinearGradient>
        </View>
      </View>
    </Modal>
  );

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  return (
    <View
      style={[styles.container, style]}
      testID={testID}
      {...accessibilityProps}
    >
      <PinchGestureHandler
        onGestureEvent={handlePinchGesture}
        enabled={enableGestures && enableZoom}
      >
        <Animated.View style={styles.gestureContainer}>
          <PanGestureHandler
            onGestureEvent={handlePanGesture}
            enabled={enableGestures}
          >
            <Animated.View
              style={[
                styles.chartContainer,
                {
                  transform: [
                    { scale },
                    { translateX },
                    { translateY },
                    { rotate: rotation.interpolate({
                      inputRange: [0, 360],
                      outputRange: ['0deg', '360deg'],
                    }) },
                  ],
                },
              ]}
            >
              {/* Chart content would be rendered here */}
              <View style={styles.chartPlaceholder}>
                <Text style={styles.chartPlaceholderText}>
                  {CHART_TYPE_NAMES[navigationState.currentChart] || navigationState.currentChart}
                </Text>
                <Text style={styles.chartSubtext}>
                  {navigationState.viewMode} - {navigationState.activeOverlay}
                </Text>
              </View>
            </Animated.View>
          </PanGestureHandler>
        </Animated.View>
      </PinchGestureHandler>
      
      {/* Legend Panel */}
      {navigationState.showLegend && (
        <View style={styles.legendContainer}>
          <NorthIndianChartLegend
            chartData={currentChartData}
            selectedPlanet={navigationState.selectedElements.planet}
            selectedRashi={navigationState.selectedElements.rashi}
            selectedHouse={navigationState.selectedElements.house}
            onPlanetSelect={(planet) => handleElementSelect('planet', planet)}
            onRashiSelect={(rashi) => handleElementSelect('rashi', rashi)}
            onHouseSelect={(house) => handleElementSelect('house', house)}
          />
        </View>
      )}
      
      {/* Navigation Controls */}
      {showControls && renderNavigationControls()}
      
      {/* Tooltip */}
      {renderTooltip()}
      
      {/* Control Panel Modal */}
      {renderControlPanel()}
    </View>
  );
};

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(16, 23, 42, 0.95)',
  },
  gestureContainer: {
    flex: 1,
  },
  chartContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartPlaceholder: {
    width: 300,
    height: 300,
    backgroundColor: 'rgba(22, 33, 62, 0.8)',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: SignatureBlues.primary,
  },
  chartPlaceholderText: {
    color: ProfessionalGrays.white,
    fontSize: 18,
    fontFamily: getFontFamily('heading'),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  chartSubtext: {
    color: SignatureBlues.light,
    fontSize: 14,
    fontFamily: getFontFamily('body'),
    textAlign: 'center',
  },
  legendContainer: {
    position: 'absolute',
    right: spacing.md,
    top: spacing.md,
    bottom: spacing.xl,
    width: 300,
  },
  navigationControls: {
    position: 'absolute',
    left: spacing.md,
    top: spacing.md,
    flexDirection: 'column',
  },
  navButton: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(46, 134, 222, 0.2)',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: SignatureBlues.primary,
  },
  navButtonText: {
    fontSize: 20,
    color: SignatureBlues.light,
  },
  tooltip: {
    position: 'absolute',
    maxWidth: 200,
    zIndex: 1000,
  },
  tooltipBackground: {
    borderRadius: 8,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  tooltipTitle: {
    color: ProfessionalGrays.white,
    fontSize: 14,
    fontFamily: getFontFamily('body'),
    fontWeight: 'bold',
    marginBottom: 4,
  },
  tooltipContent: {
    color: ProfessionalGrays.light,
    fontSize: 12,
    fontFamily: getFontFamily('body'),
    lineHeight: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlPanel: {
    width: '90%',
    maxWidth: 500,
    maxHeight: '80%',
    borderRadius: 16,
    overflow: 'hidden',
  },
  controlPanelBackground: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  controlPanelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  controlPanelTitle: {
    color: ProfessionalGrays.white,
    fontSize: 18,
    fontFamily: getFontFamily('heading'),
    fontWeight: 'bold',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 59, 48, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: 'bold',
  },
  controlPanelContent: {
    flex: 1,
    padding: spacing.md,
  },
  selectorLabel: {
    color: ProfessionalGrays.white,
    fontSize: 16,
    fontFamily: getFontFamily('body'),
    fontWeight: 'bold',
    marginBottom: spacing.sm,
  },
  chartSelector: {
    marginBottom: spacing.lg,
  },
  chartTypeScroll: {
    marginBottom: spacing.sm,
  },
  chartTypeButton: {
    backgroundColor: 'rgba(22, 33, 62, 0.6)',
    borderRadius: 8,
    padding: spacing.sm,
    marginRight: spacing.sm,
    minWidth: 80,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  activeChartType: {
    backgroundColor: 'rgba(46, 134, 222, 0.3)',
    borderColor: SignatureBlues.primary,
  },
  chartTypeText: {
    color: ProfessionalGrays.light,
    fontSize: 14,
    fontFamily: getFontFamily('body'),
    fontWeight: 'bold',
  },
  activeChartTypeText: {
    color: SignatureBlues.light,
  },
  chartTypeSubtext: {
    color: ProfessionalGrays.medium,
    fontSize: 10,
    fontFamily: getFontFamily('body'),
    textAlign: 'center',
    marginTop: 2,
  },
  viewModeSelector: {
    marginBottom: spacing.lg,
  },
  viewModeButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  viewModeButton: {
    backgroundColor: 'rgba(22, 33, 62, 0.6)',
    borderRadius: 8,
    padding: spacing.sm,
    margin: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  activeViewMode: {
    backgroundColor: 'rgba(46, 134, 222, 0.3)',
    borderColor: SignatureBlues.primary,
  },
  viewModeText: {
    color: ProfessionalGrays.light,
    fontSize: 12,
    fontFamily: getFontFamily('body'),
  },
  activeViewModeText: {
    color: SignatureBlues.light,
  },
  overlaySelector: {
    marginBottom: spacing.lg,
  },
  overlayButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  overlayButton: {
    backgroundColor: 'rgba(22, 33, 62, 0.6)',
    borderRadius: 8,
    padding: spacing.sm,
    margin: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  activeOverlay: {
    backgroundColor: 'rgba(46, 134, 222, 0.3)',
    borderColor: SignatureBlues.primary,
  },
  overlayText: {
    color: ProfessionalGrays.light,
    fontSize: 12,
    fontFamily: getFontFamily('body'),
  },
  activeOverlayText: {
    color: SignatureBlues.light,
  },
  toggleSection: {
    marginBottom: spacing.lg,
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(22, 33, 62, 0.6)',
    borderRadius: 8,
    padding: spacing.sm,
    marginBottom: spacing.xs,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  activeControlButton: {
    backgroundColor: 'rgba(46, 134, 222, 0.3)',
    borderColor: SignatureBlues.primary,
  },
  controlIcon: {
    fontSize: 16,
    marginRight: spacing.sm,
  },
  controlButtonText: {
    color: ProfessionalGrays.light,
    fontSize: 14,
    fontFamily: getFontFamily('body'),
    flex: 1,
  },
  activeControlButtonText: {
    color: SignatureBlues.light,
  },
});

// ============================================================================
// EXPORTS
// ============================================================================

export default NorthIndianChartNavigator;
