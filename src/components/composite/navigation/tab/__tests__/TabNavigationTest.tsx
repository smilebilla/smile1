/**
 * Corp Astro UI Library - Tab Navigation Test Suite
 * 
 * Comprehensive test suite for the TabNavigation component demonstrating
 * all variants, configurations, and interactive states within the 
 * Corp Astro design system.
 * 
 * Features:
 * - All tab navigation variants and orientations testing
 * - Size and alignment configuration testing
 * - Gesture handling and swipe navigation testing
 * - Indicator animation and styling testing
 * - Scrollable tab containers testing
 * - Badge system and icon support testing
 * - Theme integration and state management
 * - Accessibility compliance validation
 * - Performance and animation testing
 * 
 * @module TabNavigationTest
 * @version 1.0.0
 * @author Corp Astro Design System
 * @since 2024
 */

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
  Switch,
} from 'react-native';
import { useTheme } from '../../../../foundations/themes/useTheme';
import { 
  TabNavigation, 
  TabNavigationVariant, 
  TabNavigationSize, 
  TabNavigationOrientation,
  TabNavigationAlignment,
  TabNavigationItem
} from '../TabNavigation';

// ============================================================================
// TEST COMPONENT
// ============================================================================

/**
 * TabNavigationTest - Comprehensive test suite component
 */
export const TabNavigationTest: React.FC = () => {
  // ============================================================================
  // HOOKS & STATE
  // ============================================================================

  const theme = useTheme();
  const [activeVariant, setActiveVariant] = useState<TabNavigationVariant>('default');
  const [activeSize, setActiveSize] = useState<TabNavigationSize>('medium');
  const [activeOrientation, setActiveOrientation] = useState<TabNavigationOrientation>('horizontal');
  const [activeAlignment, setActiveAlignment] = useState<TabNavigationAlignment>('center');
  const [activeTab, setActiveTab] = useState(0);
  const [enableGestures, setEnableGestures] = useState(false);
  const [enableScroll, setEnableScroll] = useState(true);
  const [showIndicator, setShowIndicator] = useState(true);
  const [showBadges, setShowBadges] = useState(true);
  const [showIcons, setShowIcons] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [currentState, setCurrentState] = useState<'normal' | 'focused' | 'error' | 'success'>('normal');

  // ============================================================================
  // VARIANT CONFIGURATIONS
  // ============================================================================

  const variants: TabNavigationVariant[] = ['default', 'pills', 'underline', 'card', 'segmented'];
  const sizes: TabNavigationSize[] = ['small', 'medium', 'large'];
  const orientations: TabNavigationOrientation[] = ['horizontal', 'vertical'];
  const alignments: TabNavigationAlignment[] = ['start', 'center', 'end', 'stretch'];

  // ============================================================================
  // TAB CONFIGURATIONS
  // ============================================================================

  const basicTabs: TabNavigationItem[] = [
    {
      id: 'home',
      label: 'Home',
      icon: showIcons ? <Text style={styles.tabIcon}>🏠</Text> : undefined,
      badge: showBadges ? '3' : undefined,
      accessibilityLabel: 'Home tab',
      testID: 'tab-home',
      onPress: () => Alert.alert('Home Tab', 'Home tab pressed'),
    },
    {
      id: 'search',
      label: 'Search',
      icon: showIcons ? <Text style={styles.tabIcon}>🔍</Text> : undefined,
      badge: showBadges ? '12' : undefined,
      accessibilityLabel: 'Search tab',
      testID: 'tab-search',
      onPress: () => Alert.alert('Search Tab', 'Search tab pressed'),
    },
    {
      id: 'favorites',
      label: 'Favorites',
      icon: showIcons ? <Text style={styles.tabIcon}>⭐</Text> : undefined,
      badge: showBadges ? '99+' : undefined,
      accessibilityLabel: 'Favorites tab',
      testID: 'tab-favorites',
      onPress: () => Alert.alert('Favorites Tab', 'Favorites tab pressed'),
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: showIcons ? <Text style={styles.tabIcon}>👤</Text> : undefined,
      accessibilityLabel: 'Profile tab',
      testID: 'tab-profile',
      onPress: () => Alert.alert('Profile Tab', 'Profile tab pressed'),
    },
  ];

  const scrollableTabs: TabNavigationItem[] = [
    { id: 'all', label: 'All', icon: showIcons ? <Text style={styles.tabIcon}>📋</Text> : undefined },
    { id: 'active', label: 'Active', icon: showIcons ? <Text style={styles.tabIcon}>🔥</Text> : undefined },
    { id: 'completed', label: 'Completed', icon: showIcons ? <Text style={styles.tabIcon}>✅</Text> : undefined },
    { id: 'pending', label: 'Pending', icon: showIcons ? <Text style={styles.tabIcon}>⏳</Text> : undefined },
    { id: 'archived', label: 'Archived', icon: showIcons ? <Text style={styles.tabIcon}>📁</Text> : undefined },
    { id: 'starred', label: 'Starred', icon: showIcons ? <Text style={styles.tabIcon}>⭐</Text> : undefined },
    { id: 'recent', label: 'Recent', icon: showIcons ? <Text style={styles.tabIcon}>🕐</Text> : undefined },
    { id: 'shared', label: 'Shared', icon: showIcons ? <Text style={styles.tabIcon}>🔗</Text> : undefined },
  ];

  const disabledTabs: TabNavigationItem[] = [
    { id: 'enabled1', label: 'Enabled' },
    { id: 'disabled1', label: 'Disabled', disabled: true },
    { id: 'enabled2', label: 'Enabled' },
    { id: 'disabled2', label: 'Disabled', disabled: true },
    { id: 'enabled3', label: 'Enabled' },
  ];

  // ============================================================================
  // HANDLERS
  // ============================================================================

  const handleTabChange = (index: number, item: TabNavigationItem) => {
    setActiveTab(index);
    console.log('Tab changed:', index, item.label);
  };

  const handleTabPress = (index: number, item: TabNavigationItem) => {
    console.log('Tab pressed:', index, item.label);
  };

  const handleTabLongPress = (index: number, item: TabNavigationItem) => {
    Alert.alert('Long Press', `Long pressed: ${item.label}`);
  };

  const handleSwipe = (direction: string) => {
    console.log('Swipe detected:', direction);
    Alert.alert('Swipe', `Swiped ${direction}`);
  };

  const handleStateChange = (state: 'normal' | 'focused' | 'error' | 'success') => {
    setCurrentState(state);
  };

  // ============================================================================
  // RENDER CONTROLS
  // ============================================================================

  const renderControls = () => (
    <View style={styles.controls}>
      <Text style={[styles.controlTitle, { color: theme.colors.neutral.light }]}>
        Tab Navigation Controls
      </Text>

      {/* Variant Selection */}
      <View style={styles.controlGroup}>
        <Text style={[styles.controlLabel, { color: theme.colors.neutral.medium }]}>
          Variant
        </Text>
        <View style={styles.buttonRow}>
          {variants.map((variant) => (
            <TouchableOpacity
              key={variant}
              style={[
                styles.controlButton,
                {
                  backgroundColor: activeVariant === variant 
                    ? theme.colors.brand.primary 
                    : theme.colors.cosmos.medium,
                },
              ]}
              onPress={() => setActiveVariant(variant)}
            >
              <Text style={[styles.controlButtonText, { color: theme.colors.neutral.light }]}>
                {variant}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Size Selection */}
      <View style={styles.controlGroup}>
        <Text style={[styles.controlLabel, { color: theme.colors.neutral.medium }]}>
          Size
        </Text>
        <View style={styles.buttonRow}>
          {sizes.map((size) => (
            <TouchableOpacity
              key={size}
              style={[
                styles.controlButton,
                {
                  backgroundColor: activeSize === size 
                    ? theme.colors.brand.primary 
                    : theme.colors.cosmos.medium,
                },
              ]}
              onPress={() => setActiveSize(size)}
            >
              <Text style={[styles.controlButtonText, { color: theme.colors.neutral.light }]}>
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Orientation Selection */}
      <View style={styles.controlGroup}>
        <Text style={[styles.controlLabel, { color: theme.colors.neutral.medium }]}>
          Orientation
        </Text>
        <View style={styles.buttonRow}>
          {orientations.map((orientation) => (
            <TouchableOpacity
              key={orientation}
              style={[
                styles.controlButton,
                {
                  backgroundColor: activeOrientation === orientation 
                    ? theme.colors.brand.primary 
                    : theme.colors.cosmos.medium,
                },
              ]}
              onPress={() => setActiveOrientation(orientation)}
            >
              <Text style={[styles.controlButtonText, { color: theme.colors.neutral.light }]}>
                {orientation}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Alignment Selection */}
      <View style={styles.controlGroup}>
        <Text style={[styles.controlLabel, { color: theme.colors.neutral.medium }]}>
          Alignment
        </Text>
        <View style={styles.buttonRow}>
          {alignments.map((alignment) => (
            <TouchableOpacity
              key={alignment}
              style={[
                styles.controlButton,
                {
                  backgroundColor: activeAlignment === alignment 
                    ? theme.colors.brand.primary 
                    : theme.colors.cosmos.medium,
                },
              ]}
              onPress={() => setActiveAlignment(alignment)}
            >
              <Text style={[styles.controlButtonText, { color: theme.colors.neutral.light }]}>
                {alignment}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* State Selection */}
      <View style={styles.controlGroup}>
        <Text style={[styles.controlLabel, { color: theme.colors.neutral.medium }]}>
          State
        </Text>
        <View style={styles.buttonRow}>
          {['normal', 'focused', 'error', 'success'].map((state) => (
            <TouchableOpacity
              key={state}
              style={[
                styles.controlButton,
                {
                  backgroundColor: currentState === state 
                    ? theme.colors.brand.primary 
                    : theme.colors.cosmos.medium,
                },
              ]}
              onPress={() => handleStateChange(state as any)}
            >
              <Text style={[styles.controlButtonText, { color: theme.colors.neutral.light }]}>
                {state}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Toggle Controls */}
      <View style={styles.controlGroup}>
        <Text style={[styles.controlLabel, { color: theme.colors.neutral.medium }]}>
          Options
        </Text>
        
        <View style={styles.toggleRow}>
          <Text style={[styles.toggleLabel, { color: theme.colors.neutral.light }]}>
            Enable Gestures
          </Text>
          <Switch
            value={enableGestures}
            onValueChange={setEnableGestures}
            trackColor={{ false: theme.colors.cosmos.medium, true: theme.colors.brand.primary }}
            thumbColor={theme.colors.neutral.light}
          />
        </View>

        <View style={styles.toggleRow}>
          <Text style={[styles.toggleLabel, { color: theme.colors.neutral.light }]}>
            Enable Scroll
          </Text>
          <Switch
            value={enableScroll}
            onValueChange={setEnableScroll}
            trackColor={{ false: theme.colors.cosmos.medium, true: theme.colors.brand.primary }}
            thumbColor={theme.colors.neutral.light}
          />
        </View>

        <View style={styles.toggleRow}>
          <Text style={[styles.toggleLabel, { color: theme.colors.neutral.light }]}>
            Show Indicator
          </Text>
          <Switch
            value={showIndicator}
            onValueChange={setShowIndicator}
            trackColor={{ false: theme.colors.cosmos.medium, true: theme.colors.brand.primary }}
            thumbColor={theme.colors.neutral.light}
          />
        </View>

        <View style={styles.toggleRow}>
          <Text style={[styles.toggleLabel, { color: theme.colors.neutral.light }]}>
            Show Badges
          </Text>
          <Switch
            value={showBadges}
            onValueChange={setShowBadges}
            trackColor={{ false: theme.colors.cosmos.medium, true: theme.colors.brand.primary }}
            thumbColor={theme.colors.neutral.light}
          />
        </View>

        <View style={styles.toggleRow}>
          <Text style={[styles.toggleLabel, { color: theme.colors.neutral.light }]}>
            Show Icons
          </Text>
          <Switch
            value={showIcons}
            onValueChange={setShowIcons}
            trackColor={{ false: theme.colors.cosmos.medium, true: theme.colors.brand.primary }}
            thumbColor={theme.colors.neutral.light}
          />
        </View>

        <View style={styles.toggleRow}>
          <Text style={[styles.toggleLabel, { color: theme.colors.neutral.light }]}>
            Visible
          </Text>
          <Switch
            value={isVisible}
            onValueChange={setIsVisible}
            trackColor={{ false: theme.colors.cosmos.medium, true: theme.colors.brand.primary }}
            thumbColor={theme.colors.neutral.light}
          />
        </View>
      </View>
    </View>
  );

  // ============================================================================
  // RENDER EXAMPLES
  // ============================================================================

  const renderExamples = () => (
    <View style={styles.examples}>
      <Text style={[styles.exampleTitle, { color: theme.colors.neutral.light }]}>
        Tab Navigation Examples
      </Text>

      {/* Current Configuration */}
      <View style={styles.exampleGroup}>
        <Text style={[styles.exampleLabel, { color: theme.colors.neutral.medium }]}>
          Current Configuration
        </Text>
        <View style={[styles.exampleContainer, { flexDirection: activeOrientation === 'horizontal' ? 'column' : 'row' }]}>
          <TabNavigation
            variant={activeVariant}
            size={activeSize}
            orientation={activeOrientation}
            alignment={activeAlignment}
            items={basicTabs}
            activeIndex={activeTab}
            indicator={{
              enabled: showIndicator,
              style: 'line',
              color: theme.colors.brand.primary,
            }}
            gesture={{
              enabled: enableGestures,
              onSwipe: handleSwipe,
            }}
            scroll={{
              enabled: enableScroll,
              centerActiveTab: true,
            }}
            focused={currentState === 'focused'}
            error={currentState === 'error'}
            success={currentState === 'success'}
            visible={isVisible}
            onTabChange={handleTabChange}
            onTabPress={handleTabPress}
            onTabLongPress={handleTabLongPress}
            accessibilityLabel="Demo tab navigation"
            testID="tab-navigation-demo"
          />
          <Text style={[styles.activeTabText, { color: theme.colors.neutral.medium }]}>
            Active Tab: {basicTabs[activeTab]?.label}
          </Text>
        </View>
      </View>

      {/* Variant Examples */}
      <View style={styles.exampleGroup}>
        <Text style={[styles.exampleLabel, { color: theme.colors.neutral.medium }]}>
          All Variants
        </Text>
        {variants.map((variant) => (
          <View key={variant} style={styles.exampleItem}>
            <Text style={[styles.exampleItemLabel, { color: theme.colors.neutral.light }]}>
              {variant}
            </Text>
            <TabNavigation
              variant={variant}
              size="medium"
              orientation="horizontal"
              items={basicTabs.slice(0, 3)}
              activeIndex={0}
              indicator={{ enabled: true, style: 'line' }}
              accessibilityLabel={`${variant} tab navigation`}
              testID={`tab-navigation-${variant}`}
            />
          </View>
        ))}
      </View>

      {/* Size Examples */}
      <View style={styles.exampleGroup}>
        <Text style={[styles.exampleLabel, { color: theme.colors.neutral.medium }]}>
          All Sizes
        </Text>
        {sizes.map((size) => (
          <View key={size} style={styles.exampleItem}>
            <Text style={[styles.exampleItemLabel, { color: theme.colors.neutral.light }]}>
              {size}
            </Text>
            <TabNavigation
              variant="default"
              size={size}
              orientation="horizontal"
              items={basicTabs.slice(0, 3)}
              activeIndex={0}
              indicator={{ enabled: true, style: 'line' }}
              accessibilityLabel={`${size} tab navigation`}
              testID={`tab-navigation-${size}`}
            />
          </View>
        ))}
      </View>

      {/* Orientation Examples */}
      <View style={styles.exampleGroup}>
        <Text style={[styles.exampleLabel, { color: theme.colors.neutral.medium }]}>
          Orientations
        </Text>
        {orientations.map((orientation) => (
          <View key={orientation} style={styles.exampleItem}>
            <Text style={[styles.exampleItemLabel, { color: theme.colors.neutral.light }]}>
              {orientation}
            </Text>
            <View style={[styles.orientationContainer, { flexDirection: orientation === 'horizontal' ? 'column' : 'row' }]}>
              <TabNavigation
                variant="default"
                size="medium"
                orientation={orientation}
                items={basicTabs.slice(0, 3)}
                activeIndex={0}
                indicator={{ enabled: true, style: 'line' }}
                accessibilityLabel={`${orientation} tab navigation`}
                testID={`tab-navigation-${orientation}`}
              />
            </View>
          </View>
        ))}
      </View>

      {/* Scrollable Example */}
      <View style={styles.exampleGroup}>
        <Text style={[styles.exampleLabel, { color: theme.colors.neutral.medium }]}>
          Scrollable Tabs
        </Text>
        <TabNavigation
          variant="pills"
          size="medium"
          orientation="horizontal"
          items={scrollableTabs}
          activeIndex={0}
          indicator={{ enabled: true, style: 'line' }}
          scroll={{ enabled: true, centerActiveTab: true }}
          accessibilityLabel="Scrollable tab navigation"
          testID="tab-navigation-scrollable"
        />
      </View>

      {/* Disabled Example */}
      <View style={styles.exampleGroup}>
        <Text style={[styles.exampleLabel, { color: theme.colors.neutral.medium }]}>
          Disabled Tabs
        </Text>
        <TabNavigation
          variant="default"
          size="medium"
          orientation="horizontal"
          items={disabledTabs}
          activeIndex={0}
          indicator={{ enabled: true, style: 'line' }}
          accessibilityLabel="Disabled tab navigation"
          testID="tab-navigation-disabled"
        />
      </View>

      {/* State Examples */}
      <View style={styles.exampleGroup}>
        <Text style={[styles.exampleLabel, { color: theme.colors.neutral.medium }]}>
          State Examples
        </Text>
        {['normal', 'focused', 'error', 'success'].map((state) => (
          <View key={state} style={styles.exampleItem}>
            <Text style={[styles.exampleItemLabel, { color: theme.colors.neutral.light }]}>
              {state}
            </Text>
            <TabNavigation
              variant="default"
              size="medium"
              orientation="horizontal"
              items={basicTabs.slice(0, 3)}
              activeIndex={0}
              indicator={{ enabled: true, style: 'line' }}
              focused={state === 'focused'}
              error={state === 'error'}
              success={state === 'success'}
              accessibilityLabel={`${state} tab navigation`}
              testID={`tab-navigation-${state}`}
            />
          </View>
        ))}
      </View>
    </View>
  );

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.cosmos.void }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {renderControls()}
        {renderExamples()}
      </ScrollView>
    </View>
  );
};

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  controls: {
    marginBottom: 30,
  },
  controlTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  controlGroup: {
    marginBottom: 20,
  },
  controlLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  controlButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  controlButtonText: {
    fontSize: 12,
    fontWeight: '500',
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  toggleLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  examples: {
    marginTop: 20,
  },
  exampleTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  exampleGroup: {
    marginBottom: 25,
  },
  exampleLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
  },
  exampleContainer: {
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  exampleItem: {
    marginBottom: 15,
  },
  exampleItemLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 5,
    opacity: 0.8,
  },
  orientationContainer: {
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  activeTabText: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 8,
    textAlign: 'center',
  },
  tabIcon: {
    fontSize: 16,
  },
});

// ============================================================================
// EXPORTS
// ============================================================================

export default TabNavigationTest;
