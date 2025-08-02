/**
 * Corp Astro UI Library - Segmented Tabs Test Suite
 * 
 * Comprehensive test suite for the SegmentedTabs component demonstrating
 * all variants, configurations, and interactive states within the 
 * Corp Astro design system.
 * 
 * Features:
 * - All segmented tabs variants and sizes testing
 * - Segment distribution and animation testing
 * - Icon, badge, and custom content testing
 * - Theme integration and accessibility testing
 * - Performance validation and visual feedback testing
 * - Interactive controls for all configuration options
 * 
 * @module SegmentedTabsTest
 * @version 1.0.0
 * @author Corp Astro Design System
 * @since 2024
 */

import React, { useState, useEffect } from 'react';
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
  SegmentedTabs, 
  SegmentedTabsVariant, 
  SegmentedTabsSize, 
  SegmentedTabsAnimation,
  SegmentedTabsDistribution,
  SegmentedTabsSegment,
  SegmentedTabsStyleConfig,
  SegmentedTabsAnimationConfig,
  SegmentedTabsGestureConfig
} from '../SegmentedTabs';

// ============================================================================
// MOCK ICONS
// ============================================================================

const HomeIcon = () => (
  <View style={{ width: 16, height: 16, backgroundColor: '#00D4AA', borderRadius: 8 }} />
);

const SearchIcon = () => (
  <View style={{ width: 16, height: 16, backgroundColor: '#64FFDA', borderRadius: 8 }} />
);

const ProfileIcon = () => (
  <View style={{ width: 16, height: 16, backgroundColor: '#FFD700', borderRadius: 8 }} />
);

const SettingsIcon = () => (
  <View style={{ width: 16, height: 16, backgroundColor: '#FF6B6B', borderRadius: 8 }} />
);

// ============================================================================
// TEST COMPONENT
// ============================================================================

/**
 * SegmentedTabsTest - Comprehensive test suite component
 */
const SegmentedTabsTest: React.FC = () => {
  // ============================================================================
  // HOOKS & STATE
  // ============================================================================

  const theme = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [variant, setVariant] = useState<SegmentedTabsVariant>(SegmentedTabsVariant.DEFAULT);
  const [size, setSize] = useState<SegmentedTabsSize>(SegmentedTabsSize.MEDIUM);
  const [animation, setAnimation] = useState<SegmentedTabsAnimation>(SegmentedTabsAnimation.SMOOTH);
  const [distribution, setDistribution] = useState<SegmentedTabsDistribution>(SegmentedTabsDistribution.EQUAL);
  
  // Configuration states
  const [iconsEnabled, setIconsEnabled] = useState(true);
  const [badgesEnabled, setBadgesEnabled] = useState(true);
  const [customStyling, setCustomStyling] = useState(false);
  const [shadowEnabled, setShadowEnabled] = useState(true);
  const [gestureEnabled, setGestureEnabled] = useState(true);
  const [hapticFeedback, setHapticFeedback] = useState(true);
  
  // Animation configuration
  const [animationDuration, setAnimationDuration] = useState(300);
  const [animationDelay, setAnimationDelay] = useState(0);
  
  // Sample segments data
  const [segments, setSegments] = useState<SegmentedTabsSegment[]>([
    {
      id: 'home',
      label: 'Home',
      icon: iconsEnabled ? <HomeIcon /> : undefined,
      badge: badgesEnabled ? { count: 3, variant: 'count' } : undefined,
      accessibilityLabel: 'Home tab',
      testID: 'home-segment',
    },
    {
      id: 'search',
      label: 'Search',
      icon: iconsEnabled ? <SearchIcon /> : undefined,
      badge: badgesEnabled ? { variant: 'dot', color: '#64FFDA' } : undefined,
      accessibilityLabel: 'Search tab',
      testID: 'search-segment',
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: iconsEnabled ? <ProfileIcon /> : undefined,
      badge: badgesEnabled ? { count: 12, variant: 'count', color: '#FFD700' } : undefined,
      accessibilityLabel: 'Profile tab',
      testID: 'profile-segment',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: iconsEnabled ? <SettingsIcon /> : undefined,
      disabled: false,
      accessibilityLabel: 'Settings tab',
      testID: 'settings-segment',
    },
  ]);
  
  // Performance tracking
  const [selectionChangeCount, setSelectionChangeCount] = useState(0);
  const [pressCount, setPressCount] = useState(0);
  const [longPressCount, setLongPressCount] = useState(0);
  const [lastSelectedSegment, setLastSelectedSegment] = useState<SegmentedTabsSegment | null>(null);

  // ============================================================================
  // EFFECTS
  // ============================================================================

  /**
   * Update segments when icon/badge settings change
   */
  useEffect(() => {
    setSegments(prev => prev.map(segment => ({
      ...segment,
      icon: iconsEnabled ? (
        segment.id === 'home' ? <HomeIcon /> :
        segment.id === 'search' ? <SearchIcon /> :
        segment.id === 'profile' ? <ProfileIcon /> :
        segment.id === 'settings' ? <SettingsIcon /> : undefined
      ) : undefined,
      badge: badgesEnabled ? (
        segment.id === 'home' ? { count: 3, variant: 'count' } :
        segment.id === 'search' ? { variant: 'dot', color: '#64FFDA' } :
        segment.id === 'profile' ? { count: 12, variant: 'count', color: '#FFD700' } :
        undefined
      ) : undefined,
    })));
  }, [iconsEnabled, badgesEnabled]);

  // ============================================================================
  // HANDLERS
  // ============================================================================

  /**
   * Handle segment selection change
   */
  const handleSelectionChange = (index: number, segment: SegmentedTabsSegment) => {
    setSelectedIndex(index);
    setSelectionChangeCount(prev => prev + 1);
    setLastSelectedSegment(segment);
    Alert.alert('Selection Changed', `Selected: ${segment.label} (${segment.id})`);
  };

  /**
   * Handle segment press
   */
  const handlePress = (index: number, segment: SegmentedTabsSegment) => {
    setPressCount(prev => prev + 1);
    console.log('Segment pressed:', segment.label);
  };

  /**
   * Handle segment long press
   */
  const handleLongPress = (index: number, segment: SegmentedTabsSegment) => {
    setLongPressCount(prev => prev + 1);
    Alert.alert('Long Press', `Long pressed: ${segment.label}`);
  };

  /**
   * Handle press in
   */
  const handlePressIn = (index: number, segment: SegmentedTabsSegment) => {
    console.log('Press in:', segment.label);
  };

  /**
   * Handle press out
   */
  const handlePressOut = (index: number, segment: SegmentedTabsSegment) => {
    console.log('Press out:', segment.label);
  };

  /**
   * Reset all counters
   */
  const resetCounters = () => {
    setSelectionChangeCount(0);
    setPressCount(0);
    setLongPressCount(0);
    setLastSelectedSegment(null);
  };

  /**
   * Add new segment
   */
  const addSegment = () => {
    const newSegment: SegmentedTabsSegment = {
      id: `segment-${Date.now()}`,
      label: `Tab ${segments.length + 1}`,
      icon: iconsEnabled ? <HomeIcon /> : undefined,
      badge: badgesEnabled ? { count: Math.floor(Math.random() * 10) + 1, variant: 'count' } : undefined,
      accessibilityLabel: `Tab ${segments.length + 1}`,
      testID: `segment-${segments.length + 1}`,
    };
    
    setSegments(prev => [...prev, newSegment]);
  };

  /**
   * Remove last segment
   */
  const removeSegment = () => {
    if (segments.length > 2) {
      setSegments(prev => prev.slice(0, -1));
      if (selectedIndex >= segments.length - 1) {
        setSelectedIndex(segments.length - 2);
      }
    }
  };

  /**
   * Toggle segment disabled state
   */
  const toggleSegmentDisabled = (index: number) => {
    setSegments(prev => prev.map((segment, i) => 
      i === index ? { ...segment, disabled: !segment.disabled } : segment
    ));
  };

  // ============================================================================
  // CONFIGURATION OBJECTS
  // ============================================================================

  /**
   * Current style configuration
   */
  const styleConfig: SegmentedTabsStyleConfig = {
    backgroundColor: customStyling ? theme.colors.cosmos.deep : undefined,
    selectedBackgroundColor: customStyling ? theme.colors.brand.primary : undefined,
    borderColor: customStyling ? theme.colors.brand.glow : undefined,
    selectedBorderColor: customStyling ? theme.colors.brand.glow : undefined,
    textColor: customStyling ? theme.colors.neutral.text : undefined,
    selectedTextColor: customStyling ? theme.colors.neutral.light : undefined,
    borderRadius: customStyling ? 16 : undefined,
    borderWidth: customStyling ? 2 : undefined,
    padding: customStyling ? 16 : undefined,
    shadow: shadowEnabled,
    shadowColor: customStyling ? theme.colors.cosmos.void : undefined,
    shadowOpacity: customStyling ? 0.2 : undefined,
    shadowRadius: customStyling ? 8 : undefined,
    shadowOffset: customStyling ? { width: 0, height: 4 } : undefined,
    elevation: customStyling ? 8 : undefined,
  };

  /**
   * Current animation configuration
   */
  const animationConfig: SegmentedTabsAnimationConfig = {
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
  const gestureConfig: SegmentedTabsGestureConfig = {
    enabled: gestureEnabled,
    swipeEnabled: gestureEnabled,
    longPressEnabled: gestureEnabled,
    threshold: 10,
    velocity: 0.5,
    resistance: 0.8,
    hapticFeedback: hapticFeedback,
  };

  // ============================================================================
  // RENDER HELPERS
  // ============================================================================

  /**
   * Render variant controls
   */
  const renderVariantControls = () => (
    <View style={styles.controlSection}>
      <Text style={[styles.controlTitle, { color: theme.colors.neutral.text }]}>
        Segmented Tabs Variant
      </Text>
      <View style={styles.buttonGrid}>
        {Object.values(SegmentedTabsVariant).map((variantValue) => (
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
        Segmented Tabs Size
      </Text>
      <View style={styles.buttonGrid}>
        {Object.values(SegmentedTabsSize).map((sizeValue) => (
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
   * Render animation controls
   */
  const renderAnimationControls = () => (
    <View style={styles.controlSection}>
      <Text style={[styles.controlTitle, { color: theme.colors.neutral.text }]}>
        Animation Type
      </Text>
      <View style={styles.buttonGrid}>
        {Object.values(SegmentedTabsAnimation).map((animationValue) => (
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
   * Render distribution controls
   */
  const renderDistributionControls = () => (
    <View style={styles.controlSection}>
      <Text style={[styles.controlTitle, { color: theme.colors.neutral.text }]}>
        Distribution Type
      </Text>
      <View style={styles.buttonGrid}>
        {Object.values(SegmentedTabsDistribution).map((distributionValue) => (
          <TouchableOpacity
            key={distributionValue}
            style={[
              styles.distributionButton,
              {
                backgroundColor: distribution === distributionValue 
                  ? theme.colors.brand.primary 
                  : theme.colors.cosmos.medium,
              },
            ]}
            onPress={() => setDistribution(distributionValue)}
          >
            <Text style={[
              styles.distributionButtonText,
              {
                color: distribution === distributionValue 
                  ? theme.colors.neutral.light 
                  : theme.colors.neutral.text,
              },
            ]}>
              {distributionValue}
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
          Icons Enabled
        </Text>
        <Switch
          value={iconsEnabled}
          onValueChange={setIconsEnabled}
          trackColor={{ false: theme.colors.cosmos.medium, true: theme.colors.brand.primary }}
        />
      </View>
      
      <View style={styles.switchContainer}>
        <Text style={[styles.switchLabel, { color: theme.colors.neutral.text }]}>
          Badges Enabled
        </Text>
        <Switch
          value={badgesEnabled}
          onValueChange={setBadgesEnabled}
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
          Haptic Feedback
        </Text>
        <Switch
          value={hapticFeedback}
          onValueChange={setHapticFeedback}
          trackColor={{ false: theme.colors.cosmos.medium, true: theme.colors.brand.primary }}
        />
      </View>
    </View>
  );

  /**
   * Render segment management
   */
  const renderSegmentManagement = () => (
    <View style={styles.controlSection}>
      <Text style={[styles.controlTitle, { color: theme.colors.neutral.text }]}>
        Segment Management
      </Text>
      
      <View style={styles.buttonGrid}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: theme.colors.brand.primary }]}
          onPress={addSegment}
        >
          <Text style={[styles.actionButtonText, { color: theme.colors.neutral.light }]}>
            Add Segment
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: theme.colors.brand.primary }]}
          onPress={removeSegment}
          disabled={segments.length <= 2}
        >
          <Text style={[styles.actionButtonText, { color: theme.colors.neutral.light }]}>
            Remove Segment
          </Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.segmentList}>
        {segments.map((segment, index) => (
          <View key={segment.id} style={styles.segmentItem}>
            <Text style={[styles.segmentItemText, { color: theme.colors.neutral.text }]}>
              {segment.label} ({segment.id})
            </Text>
            <TouchableOpacity
              style={[
                styles.segmentToggle,
                {
                  backgroundColor: segment.disabled 
                    ? theme.colors.cosmos.medium 
                    : theme.colors.brand.primary,
                },
              ]}
              onPress={() => toggleSegmentDisabled(index)}
            >
              <Text style={[styles.segmentToggleText, { color: theme.colors.neutral.light }]}>
                {segment.disabled ? 'Enable' : 'Disable'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
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
          Selection Changes: {selectionChangeCount}
        </Text>
        <Text style={[styles.statLabel, { color: theme.colors.neutral.muted }]}>
          Press Count: {pressCount}
        </Text>
        <Text style={[styles.statLabel, { color: theme.colors.neutral.muted }]}>
          Long Press Count: {longPressCount}
        </Text>
        <Text style={[styles.statLabel, { color: theme.colors.neutral.muted }]}>
          Current Index: {selectedIndex}
        </Text>
        <Text style={[styles.statLabel, { color: theme.colors.neutral.muted }]}>
          Last Selected: {lastSelectedSegment?.label || 'None'}
        </Text>
        <Text style={[styles.statLabel, { color: theme.colors.neutral.muted }]}>
          Total Segments: {segments.length}
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
          SegmentedTabs Test Suite
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.neutral.muted }]}>
          Interactive segmented tabs component testing
        </Text>
      </View>

      {/* Live Demo */}
      <View style={styles.demoSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.neutral.text }]}>
          Live Demo
        </Text>
        
        <View style={styles.segmentedTabsDemo}>
          <SegmentedTabs
            segments={segments}
            selectedIndex={selectedIndex}
            onSelectionChange={handleSelectionChange}
            variant={variant}
            size={size}
            animation={animation}
            distribution={distribution}
            styleConfig={styleConfig}
            animationConfig={animationConfig}
            gestureConfig={gestureConfig}
            onPress={handlePress}
            onLongPress={handleLongPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            testID="segmented-tabs-demo"
          />
        </View>
      </View>

      {/* Controls */}
      {renderVariantControls()}
      {renderSizeControls()}
      {renderAnimationControls()}
      {renderDistributionControls()}
      {renderConfigurationSwitches()}
      {renderSegmentManagement()}
      {renderPerformanceStats()}

      {/* Usage Examples */}
      <View style={styles.controlSection}>
        <Text style={[styles.controlTitle, { color: theme.colors.neutral.text }]}>
          Usage Examples
        </Text>
        
        <View style={styles.codeContainer}>
          <Text style={[styles.codeText, { color: theme.colors.neutral.muted }]}>
            {`// Basic usage
<SegmentedTabs
  segments={[
    { id: 'home', label: 'Home' },
    { id: 'search', label: 'Search' },
    { id: 'profile', label: 'Profile' },
  ]}
  selectedIndex={0}
  onSelectionChange={handleSelectionChange}
  variant={SegmentedTabsVariant.DEFAULT}
  size={SegmentedTabsSize.MEDIUM}
  animation={SegmentedTabsAnimation.SMOOTH}
/>

// Advanced configuration
<SegmentedTabs
  segments={segments}
  selectedIndex={selectedIndex}
  onSelectionChange={handleSelectionChange}
  variant={SegmentedTabsVariant.COSMIC}
  size={SegmentedTabsSize.LARGE}
  animation={SegmentedTabsAnimation.ELASTIC}
  distribution={SegmentedTabsDistribution.EQUAL}
  styleConfig={{
    backgroundColor: '#1A1A2E',
    selectedBackgroundColor: '#00D4AA',
    borderRadius: 16,
    shadow: true,
  }}
  animationConfig={{
    duration: 500,
    damping: 15,
    stiffness: 150,
  }}
  gestureConfig={{
    enabled: true,
    hapticFeedback: true,
  }}
  onPress={handlePress}
  onLongPress={handleLongPress}
/>`}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: theme.colors.neutral.muted }]}>
          SegmentedTabs Test Suite - Corp Astro Design System
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
  segmentedTabsDemo: {
    paddingVertical: 16,
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
  distributionButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    margin: 4,
  },
  distributionButtonText: {
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
  segmentList: {
    marginTop: 16,
  },
  segmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  segmentItemText: {
    fontSize: 14,
    flex: 1,
  },
  segmentToggle: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  segmentToggleText: {
    fontSize: 12,
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

export default SegmentedTabsTest;
export { SegmentedTabsTest };
