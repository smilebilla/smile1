/**
 * Corp Astro UI Library - Bottom Navigation Item Test
 * 
 * Interactive test suite for the BottomNavItem component.
 * Provides comprehensive testing scenarios for all variants,
 * animations, states, and configuration options.
 * 
 * @module BottomNavItemTest
 * @version 1.0.0
 * @author Corp Astro Design System
 * @since 2025
 */

import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { BottomNavItem } from '../BottomNavItem';
import {
  BottomNavItemVariant,
  BottomNavItemSize,
  BottomNavItemAnimation,
  BottomNavItemState,
  BottomNavItemProps,
} from '../BottomNavItem';

import { ThemeProvider } from '../../../../foundations/themes/ThemeProvider';
import { spacing } from '../../../../foundations/tokens/spacing/SpacingScale';

// Basic colors for testing
const colors = {
  background: '#1a1a1a',
  surface: '#2a2a2a',
  accent: '#3a3a3a',
  text: '#ffffff',
  textSecondary: '#cccccc',
  primary: '#4a90e2',
  success: '#4caf50',
  warning: '#ff9800',
  error: '#f44336',
};

// ============================================================================
// TYPES
// ============================================================================

interface TestScenario {
  id: string;
  name: string;
  description: string;
  props: Partial<BottomNavItemProps>;
}

interface TestConfiguration {
  variant: BottomNavItemVariant;
  size: BottomNavItemSize;
  animation: BottomNavItemAnimation;
  state: BottomNavItemState;
  active: boolean;
  disabled: boolean;
  loading: boolean;
  selected: boolean;
  showLabel: boolean;
  showBadge: boolean;
  showRipple: boolean;
  badgeCount: number;
  badgeText: string;
  hapticFeedback: boolean;
  longPressEnabled: boolean;
}

// ============================================================================
// TEST SCENARIOS
// ============================================================================

const testScenarios: TestScenario[] = [
  {
    id: 'default',
    name: 'Default Item',
    description: 'Basic bottom navigation item with default settings',
    props: {
      id: 'default',
      label: 'Home',
      icon: { name: 'home', size: 24 },
      variant: BottomNavItemVariant.DEFAULT,
      size: BottomNavItemSize.MEDIUM,
      animation: BottomNavItemAnimation.SMOOTH,
    },
  },
  {
    id: 'active',
    name: 'Active Item',
    description: 'Active navigation item with highlighted state',
    props: {
      id: 'active',
      label: 'Search',
      icon: { name: 'search', size: 24 },
      variant: BottomNavItemVariant.DEFAULT,
      size: BottomNavItemSize.MEDIUM,
      animation: BottomNavItemAnimation.SMOOTH,
      active: true,
    },
  },
  {
    id: 'with-badge',
    name: 'With Badge',
    description: 'Navigation item with notification badge',
    props: {
      id: 'with-badge',
      label: 'Messages',
      icon: { name: 'message', size: 24 },
      variant: BottomNavItemVariant.DEFAULT,
      size: BottomNavItemSize.MEDIUM,
      animation: BottomNavItemAnimation.SMOOTH,
      badge: {
        enabled: true,
        count: 5,
        maxCount: 99,
        showZero: false,
        animated: true,
      },
    },
  },
  {
    id: 'floating',
    name: 'Floating Item',
    description: 'Floating navigation item with elevated appearance',
    props: {
      id: 'floating',
      label: 'Profile',
      icon: { name: 'user', size: 24 },
      variant: BottomNavItemVariant.FLOATING,
      size: BottomNavItemSize.LARGE,
      animation: BottomNavItemAnimation.SPRING,
    },
  },
  {
    id: 'cosmic',
    name: 'Cosmic Item',
    description: 'Space-themed navigation item with cosmic effects',
    props: {
      id: 'cosmic',
      label: 'Explore',
      icon: { name: 'rocket', size: 24 },
      variant: BottomNavItemVariant.COSMIC,
      size: BottomNavItemSize.LARGE,
      animation: BottomNavItemAnimation.BOUNCE,
    },
  },
  {
    id: 'minimal',
    name: 'Minimal Item',
    description: 'Clean minimal navigation item',
    props: {
      id: 'minimal',
      label: 'Settings',
      icon: { name: 'settings', size: 24 },
      variant: BottomNavItemVariant.MINIMAL,
      size: BottomNavItemSize.SMALL,
      animation: BottomNavItemAnimation.FADE,
    },
  },
  {
    id: 'disabled',
    name: 'Disabled Item',
    description: 'Disabled navigation item that cannot be interacted with',
    props: {
      id: 'disabled',
      label: 'Disabled',
      icon: { name: 'lock', size: 24 },
      variant: BottomNavItemVariant.DEFAULT,
      size: BottomNavItemSize.MEDIUM,
      animation: BottomNavItemAnimation.SMOOTH,
      disabled: true,
    },
  },
  {
    id: 'loading',
    name: 'Loading Item',
    description: 'Navigation item in loading state',
    props: {
      id: 'loading',
      label: 'Loading',
      icon: { name: 'refresh', size: 24 },
      variant: BottomNavItemVariant.DEFAULT,
      size: BottomNavItemSize.MEDIUM,
      animation: BottomNavItemAnimation.PULSE,
      loading: true,
    },
  },
];

// ============================================================================
// SAMPLE ICON COMPONENT
// ============================================================================

const SampleIcon: React.FC<{ name: string; size: number; color: string }> = ({
  name,
  size,
  color,
}) => (
  <View
    style={{
      width: size,
      height: size,
      backgroundColor: color,
      borderRadius: size / 2,
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Text style={{ color: '#fff', fontSize: size * 0.4, fontWeight: 'bold' }}>
      {name.charAt(0).toUpperCase()}
    </Text>
  </View>
);

// ============================================================================
// TEST COMPONENT
// ============================================================================

const BottomNavItemTest: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<TestScenario>(testScenarios[0]);
  const [configuration, setConfiguration] = useState<TestConfiguration>({
    variant: BottomNavItemVariant.DEFAULT,
    size: BottomNavItemSize.MEDIUM,
    animation: BottomNavItemAnimation.SMOOTH,
    state: BottomNavItemState.NORMAL,
    active: false,
    disabled: false,
    loading: false,
    selected: false,
    showLabel: true,
    showBadge: true,
    showRipple: true,
    badgeCount: 5,
    badgeText: '',
    hapticFeedback: true,
    longPressEnabled: true,
  });

  const [eventLog, setEventLog] = useState<string[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);

  // ============================================================================
  // HANDLERS
  // ============================================================================

  const handleScenarioChange = useCallback((scenario: TestScenario) => {
    setSelectedScenario(scenario);
    setConfiguration(prev => ({
      ...prev,
      variant: scenario.props.variant || prev.variant,
      size: scenario.props.size || prev.size,
      animation: scenario.props.animation || prev.animation,
      state: scenario.props.state || prev.state,
      active: scenario.props.active || false,
      disabled: scenario.props.disabled || false,
      loading: scenario.props.loading || false,
      selected: scenario.props.selected || false,
      badgeCount: scenario.props.badge?.count || prev.badgeCount,
    }));
  }, []);

  const handleConfigurationChange = useCallback((key: keyof TestConfiguration, value: any) => {
    setConfiguration(prev => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const logEvent = useCallback((event: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setEventLog(prev => [...prev, `[${timestamp}] ${event}`]);
  }, []);

  const clearEventLog = useCallback(() => {
    setEventLog([]);
  }, []);

  // ============================================================================
  // RENDER HELPERS
  // ============================================================================

  const renderScenarios = () => (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Test Scenarios
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scenarioList}>
        {testScenarios.map((scenario) => (
          <TouchableOpacity
            key={scenario.id}
            style={[
              styles.scenarioItem,
              {
                backgroundColor: selectedScenario.id === scenario.id 
                  ? colors.primary 
                  : colors.surface,
              },
            ]}
            onPress={() => handleScenarioChange(scenario)}
          >
            <Text style={[styles.scenarioName, { color: colors.text }]}>
              {scenario.name}
            </Text>
            <Text style={[styles.scenarioDescription, { color: colors.textSecondary }]}>
              {scenario.description}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderConfiguration = () => (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Configuration
      </Text>
      
      <View style={styles.configRow}>
        <Text style={[styles.configLabel, { color: colors.text }]}>
          Variant
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {Object.values(BottomNavItemVariant).map((variant) => (
            <TouchableOpacity
              key={variant}
              style={[
                styles.configButton,
                {
                  backgroundColor: configuration.variant === variant 
                    ? colors.primary 
                    : colors.surface,
                },
              ]}
              onPress={() => handleConfigurationChange('variant', variant)}
            >
              <Text style={[styles.configButtonText, { color: colors.text }]}>
                {variant}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.configRow}>
        <Text style={[styles.configLabel, { color: colors.text }]}>
          Size
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {Object.values(BottomNavItemSize).map((size) => (
            <TouchableOpacity
              key={size}
              style={[
                styles.configButton,
                {
                  backgroundColor: configuration.size === size 
                    ? colors.primary 
                    : colors.surface,
                },
              ]}
              onPress={() => handleConfigurationChange('size', size)}
            >
              <Text style={[styles.configButtonText, { color: colors.text }]}>
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.configRow}>
        <Text style={[styles.configLabel, { color: colors.text }]}>
          Animation
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {Object.values(BottomNavItemAnimation).map((animation) => (
            <TouchableOpacity
              key={animation}
              style={[
                styles.configButton,
                {
                  backgroundColor: configuration.animation === animation 
                    ? colors.primary 
                    : colors.surface,
                },
              ]}
              onPress={() => handleConfigurationChange('animation', animation)}
            >
              <Text style={[styles.configButtonText, { color: colors.text }]}>
                {animation}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.configRow}>
        <Text style={[styles.configLabel, { color: colors.text }]}>
          Active
        </Text>
        <Switch
          value={configuration.active}
          onValueChange={(value) => handleConfigurationChange('active', value)}
          trackColor={{ false: colors.surface, true: colors.primary }}
          thumbColor={configuration.active ? colors.text : colors.textSecondary}
        />
      </View>

      <View style={styles.configRow}>
        <Text style={[styles.configLabel, { color: colors.text }]}>
          Disabled
        </Text>
        <Switch
          value={configuration.disabled}
          onValueChange={(value) => handleConfigurationChange('disabled', value)}
          trackColor={{ false: colors.surface, true: colors.primary }}
          thumbColor={configuration.disabled ? colors.text : colors.textSecondary}
        />
      </View>

      <View style={styles.configRow}>
        <Text style={[styles.configLabel, { color: colors.text }]}>
          Loading
        </Text>
        <Switch
          value={configuration.loading}
          onValueChange={(value) => handleConfigurationChange('loading', value)}
          trackColor={{ false: colors.surface, true: colors.primary }}
          thumbColor={configuration.loading ? colors.text : colors.textSecondary}
        />
      </View>

      <View style={styles.configRow}>
        <Text style={[styles.configLabel, { color: colors.text }]}>
          Show Label
        </Text>
        <Switch
          value={configuration.showLabel}
          onValueChange={(value) => handleConfigurationChange('showLabel', value)}
          trackColor={{ false: colors.surface, true: colors.primary }}
          thumbColor={configuration.showLabel ? colors.text : colors.textSecondary}
        />
      </View>

      <View style={styles.configRow}>
        <Text style={[styles.configLabel, { color: colors.text }]}>
          Show Badge
        </Text>
        <Switch
          value={configuration.showBadge}
          onValueChange={(value) => handleConfigurationChange('showBadge', value)}
          trackColor={{ false: colors.surface, true: colors.primary }}
          thumbColor={configuration.showBadge ? colors.text : colors.textSecondary}
        />
      </View>

      <View style={styles.configRow}>
        <Text style={[styles.configLabel, { color: colors.text }]}>
          Show Ripple
        </Text>
        <Switch
          value={configuration.showRipple}
          onValueChange={(value) => handleConfigurationChange('showRipple', value)}
          trackColor={{ false: colors.surface, true: colors.primary }}
          thumbColor={configuration.showRipple ? colors.text : colors.textSecondary}
        />
      </View>
    </View>
  );

  const renderEventLog = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Event Log
        </Text>
        <TouchableOpacity
          style={[styles.clearButton, { backgroundColor: colors.primary }]}
          onPress={clearEventLog}
        >
          <Text style={[styles.clearButtonText, { color: colors.text }]}>
            Clear
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        ref={scrollViewRef}
        style={[styles.eventLog, { backgroundColor: colors.surface }]}
        nestedScrollEnabled
      >
        {eventLog.map((event, index) => (
          <Text key={index} style={[styles.eventLogItem, { color: colors.textSecondary }]}>
            {event}
          </Text>
        ))}
        {eventLog.length === 0 && (
          <Text style={[styles.eventLogEmpty, { color: colors.textSecondary }]}>
            No events logged yet
          </Text>
        )}
      </ScrollView>
    </View>
  );

  const renderTestItem = () => (
    <View style={styles.testItemContainer}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Test Item
      </Text>
      <View style={[styles.testItem, { backgroundColor: colors.surface }]}>
        <BottomNavItem
          id="test-item"
          label="Test Item"
          icon={{
            name: 'test',
            size: 24,
            component: SampleIcon,
          }}
          variant={configuration.variant}
          size={configuration.size}
          animation={configuration.animation}
          state={configuration.state}
          active={configuration.active}
          disabled={configuration.disabled}
          loading={configuration.loading}
          selected={configuration.selected}
          showLabel={configuration.showLabel}
          showBadge={configuration.showBadge}
          showRipple={configuration.showRipple}
          badge={{
            enabled: configuration.showBadge,
            count: configuration.badgeCount,
            text: configuration.badgeText,
            maxCount: 99,
            showZero: false,
            animated: true,
          }}
          gestureConfig={{
            hapticFeedback: configuration.hapticFeedback,
            longPressEnabled: configuration.longPressEnabled,
          }}
          onPress={(id) => logEvent(`Item pressed: ${id}`)}
          onLongPress={(id) => logEvent(`Item long pressed: ${id}`)}
          onPressIn={(id) => logEvent(`Item press in: ${id}`)}
          onPressOut={(id) => logEvent(`Item press out: ${id}`)}
          onStateChange={(id, state) => logEvent(`Item state changed: ${id} -> ${state}`)}
          testID="test-bottom-nav-item"
        />
      </View>
    </View>
  );

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>
          BottomNavItem Test
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Interactive test suite for bottom navigation items
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderScenarios()}
        {renderConfiguration()}
        {renderTestItem()}
        {renderEventLog()}
      </ScrollView>
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
  header: {
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.7,
  },
  content: {
    flex: 1,
    padding: spacing.md,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  scenarioList: {
    marginTop: spacing.sm,
  },
  scenarioItem: {
    padding: spacing.md,
    marginRight: spacing.sm,
    borderRadius: 8,
    minWidth: 200,
  },
  scenarioName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: spacing.xs,
  },
  scenarioDescription: {
    fontSize: 12,
    opacity: 0.8,
  },
  configRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  configLabel: {
    fontSize: 14,
    fontWeight: '500',
    width: 120,
  },
  configButton: {
    padding: spacing.sm,
    marginRight: spacing.xs,
    borderRadius: 6,
    minWidth: 80,
    alignItems: 'center',
  },
  configButtonText: {
    fontSize: 12,
    fontWeight: '500',
  },
  clearButton: {
    padding: spacing.sm,
    borderRadius: 6,
    minWidth: 60,
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 12,
    fontWeight: '500',
  },
  eventLog: {
    height: 200,
    borderRadius: 8,
    padding: spacing.md,
  },
  eventLogItem: {
    fontSize: 12,
    marginBottom: spacing.xs,
    fontFamily: 'monospace',
  },
  eventLogEmpty: {
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: spacing.lg,
  },
  testItemContainer: {
    marginBottom: spacing.xl,
  },
  testItem: {
    marginTop: spacing.md,
    padding: spacing.lg,
    borderRadius: 8,
    alignItems: 'center',
    minHeight: 100,
    justifyContent: 'center',
  },
});

// ============================================================================
// EXPORT WRAPPER
// ============================================================================

const BottomNavItemTestWrapper: React.FC = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <BottomNavItemTest />
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default BottomNavItemTestWrapper;
export { BottomNavItemTest, BottomNavItemTestWrapper };
export { testScenarios, SampleIcon };
