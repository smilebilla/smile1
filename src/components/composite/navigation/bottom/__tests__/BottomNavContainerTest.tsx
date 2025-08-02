/**
 * Corp Astro UI Library - Bottom Navigation Container Test
 * 
 * Interactive test suite for the BottomNavContainer component.
 * Provides comprehensive testing scenarios for all variants,
 * animations, gestures, and configuration options.
 * 
 * @module BottomNavContainerTest
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
  Dimensions,
  Switch,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { BottomNavContainer } from '../BottomNavContainer';
import {
  BottomNavContainerVariant,
  BottomNavContainerSize,
  BottomNavContainerAnimation,
  BottomNavContainerPosition,
  BottomNavContainerSafeArea,
  BottomNavContainerProps,
} from '../BottomNavContainer';

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
};
// TYPES
// ============================================================================

interface TestScenario {
  id: string;
  name: string;
  description: string;
  props: Partial<BottomNavContainerProps>;
}

interface TestConfiguration {
  variant: BottomNavContainerVariant;
  size: BottomNavContainerSize;
  animation: BottomNavContainerAnimation;
  position: BottomNavContainerPosition;
  safeArea: BottomNavContainerSafeArea;
  visible: boolean;
  autoHide: boolean;
  hideOnKeyboard: boolean;
  hideOnScroll: boolean;
  gesturesEnabled: boolean;
  backdropEnabled: boolean;
}

// ============================================================================
// TEST SCENARIOS
// ============================================================================

const testScenarios: TestScenario[] = [
  {
    id: 'default',
    name: 'Default Container',
    description: 'Basic bottom navigation container with default settings',
    props: {
      variant: BottomNavContainerVariant.DEFAULT,
      size: BottomNavContainerSize.MEDIUM,
      animation: BottomNavContainerAnimation.SMOOTH,
    },
  },
  {
    id: 'floating',
    name: 'Floating Container',
    description: 'Floating container with rounded corners and elevation',
    props: {
      variant: BottomNavContainerVariant.FLOATING,
      size: BottomNavContainerSize.MEDIUM,
      animation: BottomNavContainerAnimation.SPRING,
      position: BottomNavContainerPosition.FLOATING,
    },
  },
  {
    id: 'glass',
    name: 'Glass Container',
    description: 'Glass morphism container with backdrop blur',
    props: {
      variant: BottomNavContainerVariant.GLASS,
      size: BottomNavContainerSize.LARGE,
      animation: BottomNavContainerAnimation.ELASTIC,
      backdropConfig: {
        enabled: true,
        opacity: 0.3,
        blurRadius: 15,
      },
    },
  },
  {
    id: 'cosmic',
    name: 'Cosmic Container',
    description: 'Space-themed container with cosmic effects',
    props: {
      variant: BottomNavContainerVariant.COSMIC,
      size: BottomNavContainerSize.LARGE,
      animation: BottomNavContainerAnimation.BOUNCE,
    },
  },
  {
    id: 'minimal',
    name: 'Minimal Container',
    description: 'Clean minimal container with subtle styling',
    props: {
      variant: BottomNavContainerVariant.MINIMAL,
      size: BottomNavContainerSize.SMALL,
      animation: BottomNavContainerAnimation.LINEAR,
    },
  },
  {
    id: 'transparent',
    name: 'Transparent Container',
    description: 'Transparent container with no background',
    props: {
      variant: BottomNavContainerVariant.TRANSPARENT,
      size: BottomNavContainerSize.MEDIUM,
      animation: BottomNavContainerAnimation.NONE,
    },
  },
  {
    id: 'immersive',
    name: 'Immersive Container',
    description: 'Full-width immersive container',
    props: {
      variant: BottomNavContainerVariant.IMMERSIVE,
      size: BottomNavContainerSize.EXTRA_LARGE,
      animation: BottomNavContainerAnimation.EASE_IN_OUT,
      position: BottomNavContainerPosition.STICKY,
    },
  },
  {
    id: 'gesture-enabled',
    name: 'Gesture Enabled',
    description: 'Container with full gesture support',
    props: {
      variant: BottomNavContainerVariant.FLOATING,
      size: BottomNavContainerSize.MEDIUM,
      animation: BottomNavContainerAnimation.SPRING,
      gestureConfig: {
        enabled: true,
        panEnabled: true,
        swipeEnabled: true,
        hideOnSwipeDown: true,
        showOnSwipeUp: true,
      },
    },
  },
];

// ============================================================================
// SAMPLE CONTENT
// ============================================================================

const SampleContent: React.FC = () => {
  return (
    <View style={[styles.sampleContent, { backgroundColor: colors.surface }]}>
      <Text style={[styles.sampleText, { color: colors.text }]}>
        Navigation Content
      </Text>
      <View style={styles.sampleItems}>
        <View style={[styles.sampleItem, { backgroundColor: colors.primary }]}>
          <Text style={[styles.sampleItemText, { color: colors.text }]}>
            Home
          </Text>
        </View>
        <View style={[styles.sampleItem, { backgroundColor: colors.primary }]}>
          <Text style={[styles.sampleItemText, { color: colors.text }]}>
            Search
          </Text>
        </View>
        <View style={[styles.sampleItem, { backgroundColor: colors.primary }]}>
          <Text style={[styles.sampleItemText, { color: colors.text }]}>
            Profile
          </Text>
        </View>
      </View>
    </View>
  );
};

// ============================================================================
// TEST COMPONENT
// ============================================================================

const BottomNavContainerTest: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<TestScenario>(testScenarios[0]);
  const [configuration, setConfiguration] = useState<TestConfiguration>({
    variant: BottomNavContainerVariant.DEFAULT,
    size: BottomNavContainerSize.MEDIUM,
    animation: BottomNavContainerAnimation.SMOOTH,
    position: BottomNavContainerPosition.BOTTOM,
    safeArea: BottomNavContainerSafeArea.AUTO,
    visible: true,
    autoHide: false,
    hideOnKeyboard: true,
    hideOnScroll: false,
    gesturesEnabled: true,
    backdropEnabled: false,
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
      position: scenario.props.position || prev.position,
      safeArea: scenario.props.safeArea || prev.safeArea,
      backdropEnabled: scenario.props.backdropConfig?.enabled || false,
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
          {Object.values(BottomNavContainerVariant).map((variant) => (
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
          {Object.values(BottomNavContainerSize).map((size) => (
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
          {Object.values(BottomNavContainerAnimation).map((animation) => (
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
          Visible
        </Text>
        <Switch
          value={configuration.visible}
          onValueChange={(value) => handleConfigurationChange('visible', value)}
          trackColor={{ false: colors.surface, true: colors.primary }}
          thumbColor={configuration.visible ? colors.text : colors.textSecondary}
        />
      </View>

      <View style={styles.configRow}>
        <Text style={[styles.configLabel, { color: colors.text }]}>
          Hide on Keyboard
        </Text>
        <Switch
          value={configuration.hideOnKeyboard}
          onValueChange={(value) => handleConfigurationChange('hideOnKeyboard', value)}
          trackColor={{ false: colors.surface, true: colors.primary }}
          thumbColor={configuration.hideOnKeyboard ? colors.text : colors.textSecondary}
        />
      </View>

      <View style={styles.configRow}>
        <Text style={[styles.configLabel, { color: colors.text }]}>
          Gestures Enabled
        </Text>
        <Switch
          value={configuration.gesturesEnabled}
          onValueChange={(value) => handleConfigurationChange('gesturesEnabled', value)}
          trackColor={{ false: colors.surface, true: colors.primary }}
          thumbColor={configuration.gesturesEnabled ? colors.text : colors.textSecondary}
        />
      </View>

      <View style={styles.configRow}>
        <Text style={[styles.configLabel, { color: colors.text }]}>
          Backdrop Enabled
        </Text>
        <Switch
          value={configuration.backdropEnabled}
          onValueChange={(value) => handleConfigurationChange('backdropEnabled', value)}
          trackColor={{ false: colors.surface, true: colors.primary }}
          thumbColor={configuration.backdropEnabled ? colors.text : colors.textSecondary}
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

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>
          BottomNavContainer Test
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Interactive test suite for bottom navigation container
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderScenarios()}
        {renderConfiguration()}
        {renderEventLog()}
      </ScrollView>

      <BottomNavContainer
        variant={configuration.variant}
        size={configuration.size}
        animation={configuration.animation}
        position={configuration.position}
        safeArea={configuration.safeArea}
        visible={configuration.visible}
        autoHide={configuration.autoHide}
        hideOnKeyboard={configuration.hideOnKeyboard}
        hideOnScroll={configuration.hideOnScroll}
        gestureConfig={{
          enabled: configuration.gesturesEnabled,
          panEnabled: configuration.gesturesEnabled,
          swipeEnabled: configuration.gesturesEnabled,
          hideOnSwipeDown: true,
          showOnSwipeUp: true,
        }}
        backdropConfig={{
          enabled: configuration.backdropEnabled,
          opacity: 0.3,
          blurRadius: 15,
        }}
        onShow={() => logEvent('Container shown')}
        onHide={() => logEvent('Container hidden')}
        onGestureStart={() => logEvent('Gesture started')}
        onGestureEnd={() => logEvent('Gesture ended')}
        testID="bottom-nav-container-test"
      >
        <SampleContent />
      </BottomNavContainer>
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
  sampleContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
  },
  sampleText: {
    fontSize: 14,
    fontWeight: '500',
  },
  sampleItems: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  sampleItem: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 6,
  },
  sampleItemText: {
    fontSize: 12,
    fontWeight: '500',
  },
});

// ============================================================================
// EXPORT WRAPPER
// ============================================================================

const BottomNavContainerTestWrapper: React.FC = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <BottomNavContainerTest />
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default BottomNavContainerTestWrapper;
export { BottomNavContainerTest, BottomNavContainerTestWrapper };
export { testScenarios, SampleContent };
