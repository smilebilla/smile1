/**
 * Corp Astro UI Library - Tab Indicator Test Suite
 * 
 * Comprehensive test suite for the TabIndicator component demonstrating
 * all variants, animations, and interactive states within the 
 * Corp Astro design system.
 * 
 * Features:
 * - All indicator variants and sizes testing
 * - Animation timing and gesture interaction testing
 * - Position tracking and tab layout testing
 * - Theme integration and accessibility testing
 * - Performance validation and visual feedback testing
 * - Custom styling and configuration testing
 * 
 * @module TabIndicatorTest
 * @version 1.0.0
 * @author Corp Astro Design System
 * @since 2024
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Switch,
  Dimensions,
} from 'react-native';
import { useTheme } from '../../../../foundations/themes/useTheme';
import { 
  TabIndicator, 
  TabIndicatorVariant, 
  TabIndicatorSize, 
  TabIndicatorPosition,
  TabIndicatorAnimation,
  TabIndicatorOrientation,
  TabLayoutInfo,
  TabIndicatorStyleConfig,
  TabIndicatorAnimationConfig,
  TabIndicatorGestureConfig
} from '../TabIndicator';

// ============================================================================
// TEST COMPONENT
// ============================================================================

/**
 * TabIndicatorTest - Comprehensive test suite component
 */
const TabIndicatorTest: React.FC = () => {
  // ============================================================================
  // HOOKS & STATE
  // ============================================================================

  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const [variant, setVariant] = useState<TabIndicatorVariant>(TabIndicatorVariant.LINE);
  const [size, setSize] = useState<TabIndicatorSize>(TabIndicatorSize.MEDIUM);
  const [position, setPosition] = useState<TabIndicatorPosition>(TabIndicatorPosition.BOTTOM);
  const [animation, setAnimation] = useState<TabIndicatorAnimation>(TabIndicatorAnimation.SMOOTH);
  const [orientation, setOrientation] = useState<TabIndicatorOrientation>(TabIndicatorOrientation.HORIZONTAL);
  
  // Configuration states
  const [gestureEnabled, setGestureEnabled] = useState(true);
  const [followGesture, setFollowGesture] = useState(true);
  const [snapToTabs, setSnapToTabs] = useState(true);
  const [glowEnabled, setGlowEnabled] = useState(true);
  const [shadowEnabled, setShadowEnabled] = useState(true);
  const [customStyling, setCustomStyling] = useState(false);
  
  // Animation configuration
  const [animationDuration, setAnimationDuration] = useState(300);
  const [animationDelay, setAnimationDelay] = useState(0);
  
  // Sample tab layouts
  const [tabLayouts, setTabLayouts] = useState<TabLayoutInfo[]>([
    { x: 0, y: 0, width: 80, height: 40, index: 0 },
    { x: 90, y: 0, width: 100, height: 40, index: 1 },
    { x: 200, y: 0, width: 90, height: 40, index: 2 },
    { x: 300, y: 0, width: 110, height: 40, index: 3 },
    { x: 420, y: 0, width: 80, height: 40, index: 4 },
  ]);
  
  // Performance tracking
  const [positionChangeCount, setPositionChangeCount] = useState(0);
  const [animationCompleteCount, setAnimationCompleteCount] = useState(0);
  const [lastPositionChange, setLastPositionChange] = useState(0);

  // ============================================================================
  // HANDLERS
  // ============================================================================

  /**
   * Handle tab selection
   */
  const handleTabPress = (index: number) => {
    setActiveIndex(index);
    Alert.alert('Tab Selected', `Tab ${index + 1} activated`);
  };

  /**
   * Handle position change
   */
  const handlePositionChange = (position: number) => {
    setPositionChangeCount(prev => prev + 1);
    setLastPositionChange(position);
  };

  /**
   * Handle animation complete
   */
  const handleAnimationComplete = () => {
    setAnimationCompleteCount(prev => prev + 1);
  };

  /**
   * Handle tab change via gesture
   */
  const handleTabChange = (index: number) => {
    setActiveIndex(index);
    Alert.alert('Gesture Tab Change', `Switched to tab ${index + 1}`);
  };

  /**
   * Reset all counters
   */
  const resetCounters = () => {
    setPositionChangeCount(0);
    setAnimationCompleteCount(0);
    setLastPositionChange(0);
  };

  /**
   * Generate random tab layouts
   */
  const generateRandomLayouts = () => {
    const screenWidth = Dimensions.get('window').width;
    const tabCount = Math.floor(Math.random() * 6) + 3; // 3-8 tabs
    const layouts: TabLayoutInfo[] = [];
    let currentX = 0;
    
    for (let i = 0; i < tabCount; i++) {
      const width = Math.floor(Math.random() * 60) + 60; // 60-120px width
      layouts.push({
        x: currentX,
        y: 0,
        width,
        height: 40,
        index: i,
      });
      currentX += width + 10; // 10px gap
    }
    
    setTabLayouts(layouts);
    setActiveIndex(0);
  };

  // ============================================================================
  // CONFIGURATION OBJECTS
  // ============================================================================

  /**
   * Current style configuration
   */
  const styleConfig: TabIndicatorStyleConfig = {
    backgroundColor: customStyling ? theme.colors.brand.primary : undefined,
    glowColor: customStyling ? theme.colors.brand.glow : undefined,
    shadowColor: customStyling ? theme.colors.cosmos.deep : undefined,
    borderRadius: customStyling ? 12 : undefined,
    height: customStyling ? 5 : undefined,
    opacity: customStyling ? 0.9 : undefined,
    glow: glowEnabled,
    shadow: shadowEnabled,
    gradient: customStyling,
    pulse: customStyling,
  };

  /**
   * Current animation configuration
   */
  const animationConfig: TabIndicatorAnimationConfig = {
    duration: animationDuration,
    delay: animationDelay,
    useNativeDriver: true,
    damping: 20,
    stiffness: 200,
    mass: 1,
    tension: 200,
    friction: 8,
  };

  /**
   * Current gesture configuration
   */
  const gestureConfig: TabIndicatorGestureConfig = {
    enabled: gestureEnabled,
    threshold: 10,
    velocity: 0.5,
    resistance: 0.8,
    snapToTabs: snapToTabs,
    followGesture: followGesture,
    rubberBand: true,
  };

  // ============================================================================
  // RENDER HELPERS
  // ============================================================================

  /**
   * Render sample tabs
   */
  const renderSampleTabs = () => (
    <View style={styles.tabContainer}>
      {tabLayouts.map((layout, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.sampleTab,
            {
              width: layout.width,            backgroundColor: activeIndex === index 
              ? theme.colors.brand.primary 
              : theme.colors.cosmos.medium,
            },
          ]}
          onPress={() => handleTabPress(index)}
        >
          <Text style={[
            styles.sampleTabText,
            {            color: activeIndex === index 
              ? theme.colors.neutral.light 
              : theme.colors.neutral.text,
            },
          ]}>
            Tab {index + 1}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  /**
   * Render variant controls
   */
  const renderVariantControls = () => (
    <View style={styles.controlSection}>
      <Text style={[styles.controlTitle, { color: theme.colors.neutral.text }]}>
        Indicator Variant
      </Text>
      <View style={styles.buttonGrid}>
        {Object.values(TabIndicatorVariant).map((variantValue) => (
          <TouchableOpacity
            key={variantValue}
            style={[
              styles.variantButton,
              {
                backgroundColor: variant === variantValue 
                  ? theme.colors.brand.primary 
                  : theme.colors.cosmos.medium,
              },
            ]}
            onPress={() => setVariant(variantValue)}
          >
            <Text style={[
              styles.variantButtonText,
              {
                color: variant === variantValue 
                  ? theme.colors.neutral.light 
                  : theme.colors.neutral.text,
              },
            ]}>
              {variantValue}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  /**
   * Render size controls
   */
  const renderSizeControls = () => (
    <View style={styles.controlSection}>
      <Text style={[styles.controlTitle, { color: theme.colors.neutral.text }]}>
        Indicator Size
      </Text>
      <View style={styles.buttonGrid}>
        {Object.values(TabIndicatorSize).map((sizeValue) => (
          <TouchableOpacity
            key={sizeValue}
            style={[
              styles.sizeButton,
              {
                backgroundColor: size === sizeValue 
                  ? theme.colors.brand.primary 
                  : theme.colors.cosmos.medium,
              },
            ]}
            onPress={() => setSize(sizeValue)}
          >
            <Text style={[
              styles.sizeButtonText,
              {
                color: size === sizeValue 
                  ? theme.colors.neutral.light 
                  : theme.colors.neutral.text,
              },
            ]}>
              {sizeValue}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  /**
   * Render position controls
   */
  const renderPositionControls = () => (
    <View style={styles.controlSection}>
      <Text style={[styles.controlTitle, { color: theme.colors.neutral.text }]}>
        Indicator Position
      </Text>
      <View style={styles.buttonGrid}>
        {Object.values(TabIndicatorPosition).map((positionValue) => (
          <TouchableOpacity
            key={positionValue}
            style={[
              styles.positionButton,
              {
                backgroundColor: position === positionValue 
                  ? theme.colors.brand.primary 
                  : theme.colors.cosmos.medium,
              },
            ]}
            onPress={() => setPosition(positionValue)}
          >
            <Text style={[
              styles.positionButtonText,
              {
                color: position === positionValue 
                  ? theme.colors.neutral.light 
                  : theme.colors.neutral.text,
              },
            ]}>
              {positionValue}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  /**
   * Render animation controls
   */
  const renderAnimationControls = () => (
    <View style={styles.controlSection}>
      <Text style={[styles.controlTitle, { color: theme.colors.neutral.text }]}>
        Animation Type
      </Text>
      <View style={styles.buttonGrid}>
        {Object.values(TabIndicatorAnimation).map((animationValue) => (
          <TouchableOpacity
            key={animationValue}
            style={[
              styles.animationButton,
              {
                backgroundColor: animation === animationValue 
                  ? theme.colors.brand.primary 
                  : theme.colors.cosmos.medium,
              },
            ]}
            onPress={() => setAnimation(animationValue)}
          >
            <Text style={[
              styles.animationButtonText,
              {
                color: animation === animationValue 
                  ? theme.colors.neutral.light 
                  : theme.colors.neutral.text,
              },
            ]}>
              {animationValue}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  /**
   * Render configuration switches
   */
  const renderConfigurationSwitches = () => (
    <View style={styles.controlSection}>
      <Text style={[styles.controlTitle, { color: theme.colors.neutral.text }]}>
        Configuration Options
      </Text>
      
      <View style={styles.switchContainer}>
        <Text style={[styles.switchLabel, { color: theme.colors.neutral.text }]}>
          Gesture Enabled
        </Text>
        <Switch
          value={gestureEnabled}
          onValueChange={setGestureEnabled}
          trackColor={{ false: theme.colors.cosmos.medium, true: theme.colors.brand.primary }}
        />
      </View>
      
      <View style={styles.switchContainer}>
        <Text style={[styles.switchLabel, { color: theme.colors.neutral.text }]}>
          Follow Gesture
        </Text>
        <Switch
          value={followGesture}
          onValueChange={setFollowGesture}
          trackColor={{ false: theme.colors.cosmos.medium, true: theme.colors.brand.primary }}
        />
      </View>
      
      <View style={styles.switchContainer}>
        <Text style={[styles.switchLabel, { color: theme.colors.neutral.text }]}>
          Snap to Tabs
        </Text>
        <Switch
          value={snapToTabs}
          onValueChange={setSnapToTabs}
          trackColor={{ false: theme.colors.cosmos.medium, true: theme.colors.brand.primary }}
        />
      </View>
      
      <View style={styles.switchContainer}>
        <Text style={[styles.switchLabel, { color: theme.colors.neutral.text }]}>
          Glow Effect
        </Text>
        <Switch
          value={glowEnabled}
          onValueChange={setGlowEnabled}
          trackColor={{ false: theme.colors.cosmos.medium, true: theme.colors.brand.primary }}
        />
      </View>
      
      <View style={styles.switchContainer}>
        <Text style={[styles.switchLabel, { color: theme.colors.neutral.text }]}>
          Shadow Effect
        </Text>
        <Switch
          value={shadowEnabled}
          onValueChange={setShadowEnabled}
          trackColor={{ false: theme.colors.cosmos.medium, true: theme.colors.brand.primary }}
        />
      </View>
      
      <View style={styles.switchContainer}>
        <Text style={[styles.switchLabel, { color: theme.colors.neutral.text }]}>
          Custom Styling
        </Text>
        <Switch
          value={customStyling}
          onValueChange={setCustomStyling}
          trackColor={{ false: theme.colors.cosmos.medium, true: theme.colors.brand.primary }}
        />
      </View>
    </View>
  );

  /**
   * Render performance stats
   */
  const renderPerformanceStats = () => (
    <View style={styles.controlSection}>
      <Text style={[styles.controlTitle, { color: theme.colors.neutral.text }]}>
        Performance Statistics
      </Text>
      
      <View style={styles.statContainer}>
        <Text style={[styles.statLabel, { color: theme.colors.neutral.muted }]}>
          Position Changes: {positionChangeCount}
        </Text>
        <Text style={[styles.statLabel, { color: theme.colors.neutral.muted }]}>
          Animation Completions: {animationCompleteCount}
        </Text>
        <Text style={[styles.statLabel, { color: theme.colors.neutral.muted }]}>
          Last Position: {lastPositionChange.toFixed(2)}px
        </Text>
        <Text style={[styles.statLabel, { color: theme.colors.neutral.muted }]}>
          Active Tab: {activeIndex + 1} of {tabLayouts.length}
        </Text>
      </View>
      
      <TouchableOpacity
        style={[styles.resetButton, { backgroundColor: theme.colors.brand.primary }]}
        onPress={resetCounters}
      >
        <Text style={[styles.resetButtonText, { color: theme.colors.neutral.light }]}>
          Reset Statistics
        </Text>
      </TouchableOpacity>
    </View>
  );

  /**
   * Render action buttons
   */
  const renderActionButtons = () => (
    <View style={styles.controlSection}>
      <Text style={[styles.controlTitle, { color: theme.colors.neutral.text }]}>
        Test Actions
      </Text>
      
      <View style={styles.buttonGrid}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: theme.colors.brand.primary }]}
          onPress={() => setActiveIndex(Math.floor(Math.random() * tabLayouts.length))}
        >
          <Text style={[styles.actionButtonText, { color: theme.colors.neutral.light }]}>
            Random Tab
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: theme.colors.brand.primary }]}
          onPress={generateRandomLayouts}
        >
          <Text style={[styles.actionButtonText, { color: theme.colors.neutral.light }]}>
            Random Layouts
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: theme.colors.brand.primary }]}
          onPress={() => setActiveIndex(0)}
        >
          <Text style={[styles.actionButtonText, { color: theme.colors.neutral.light }]}>
            Reset to First
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.cosmos.void }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.neutral.text }]}>
          TabIndicator Test Suite
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.neutral.muted }]}>
          Interactive tab indicator component testing
        </Text>
      </View>

      {/* Live Demo */}
      <View style={styles.demoSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.neutral.text }]}>
          Live Demo
        </Text>
        
        <View style={styles.tabDemo}>
          {renderSampleTabs()}
          
          <View style={styles.indicatorContainer}>
            <TabIndicator
              activeIndex={activeIndex}
              tabLayouts={tabLayouts}
              variant={variant}
              size={size}
              position={position}
              orientation={orientation}
              animation={animation}
              animationConfig={animationConfig}
              styleConfig={styleConfig}
              gestureConfig={gestureConfig}
              onPositionChange={handlePositionChange}
              onTabChange={handleTabChange}
              onAnimationComplete={handleAnimationComplete}
              testID="tab-indicator-demo"
            />
          </View>
        </View>
      </View>

      {/* Controls */}
      {renderVariantControls()}
      {renderSizeControls()}
      {renderPositionControls()}
      {renderAnimationControls()}
      {renderConfigurationSwitches()}
      {renderPerformanceStats()}
      {renderActionButtons()}

      {/* Usage Examples */}
      <View style={styles.controlSection}>
        <Text style={[styles.controlTitle, { color: theme.colors.neutral.text }]}>
          Usage Examples
        </Text>
        
        <View style={styles.codeContainer}>
          <Text style={[styles.codeText, { color: theme.colors.neutral.muted }]}>
            {`// Basic usage
<TabIndicator
  activeIndex={0}
  tabLayouts={tabLayouts}
  variant={TabIndicatorVariant.LINE}
  size={TabIndicatorSize.MEDIUM}
  position={TabIndicatorPosition.BOTTOM}
  animation={TabIndicatorAnimation.SMOOTH}
  onPositionChange={handlePositionChange}
  onTabChange={handleTabChange}
/>

// Advanced configuration
<TabIndicator
  activeIndex={activeIndex}
  tabLayouts={tabLayouts}
  variant={TabIndicatorVariant.GLOW}
  size={TabIndicatorSize.LARGE}
  position={TabIndicatorPosition.BOTTOM}
  animation={TabIndicatorAnimation.ELASTIC}
  animationConfig={{
    duration: 500,
    damping: 15,
    stiffness: 150,
  }}
  gestureConfig={{
    enabled: true,
    followGesture: true,
    snapToTabs: true,
  }}
  styleConfig={{
    backgroundColor: '#00D4AA',
    glowColor: '#64FFDA',
    borderRadius: 8,
  }}
  onPositionChange={handlePositionChange}
  onTabChange={handleTabChange}
  onAnimationComplete={handleAnimationComplete}
/>`}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: theme.colors.neutral.muted }]}>
          TabIndicator Test Suite - Corp Astro Design System
        </Text>
      </View>
    </ScrollView>
  );
};

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  demoSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  tabDemo: {
    position: 'relative',
  },
  tabContainer: {
    flexDirection: 'row',
    height: 40,
    marginBottom: 16,
  },
  sampleTab: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderRadius: 8,
  },
  sampleTabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  indicatorContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 40,
  },
  controlSection: {
    marginBottom: 32,
  },
  controlTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  variantButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    margin: 4,
  },
  variantButtonText: {
    fontSize: 12,
    fontWeight: '500',
  },
  sizeButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    margin: 4,
  },
  sizeButtonText: {
    fontSize: 12,
    fontWeight: '500',
  },
  positionButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    margin: 4,
  },
  positionButtonText: {
    fontSize: 12,
    fontWeight: '500',
  },
  animationButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    margin: 4,
  },
  animationButtonText: {
    fontSize: 12,
    fontWeight: '500',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  statContainer: {
    marginBottom: 16,
  },
  statLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  resetButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    margin: 4,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  codeContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  codeText: {
    fontSize: 12,
    fontFamily: 'monospace',
    lineHeight: 16,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  footerText: {
    fontSize: 12,
  },
});

// ============================================================================
// EXPORTS
// ============================================================================

export default TabIndicatorTest;
export { TabIndicatorTest };
