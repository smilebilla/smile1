/**
 * Corp Astro UI Library - Bottom Navigation Orb Test Suite
 * 
 * Interactive test suite for BottomNavOrb component with comprehensive scenario coverage,
 * configuration testing, and visual validation.
 * 
 * @module BottomNavOrbTest
 * @version 1.0.0
 * @since 2024
 */

import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Switch,
  ViewStyle,
  TextStyle,
  SafeAreaView,
  Platform,
} from 'react-native';

// Component imports
import BottomNavOrb, {
  BottomNavOrbProps,
  BottomNavOrbSize,
  BottomNavOrbPosition,
  BottomNavOrbAnimation,
  BottomNavOrbVariant,
  BottomNavOrbIcon,
  BottomNavOrbAnimationConfig,
  BottomNavOrbPositionConfig,
  BottomNavOrbGestureConfig,
  BottomNavOrbPremiumConfig,
  BottomNavOrbAccessibilityConfig,
} from '../BottomNavOrb';

// Foundation imports
import { useTheme } from '../../../../foundations/themes/useTheme';

// ============================================================================
// TYPES
// ============================================================================

/**
 * Test scenario configuration
 */
interface TestScenario {
  name: string;
  description: string;
  config: BottomNavOrbProps;
  category: 'basic' | 'advanced' | 'premium' | 'accessibility' | 'gesture';
}

/**
 * Test configuration state
 */
interface TestConfig {
  size: BottomNavOrbSize;
  variant: BottomNavOrbVariant;
  position: BottomNavOrbPosition;
  animation: BottomNavOrbAnimation;
  premium: boolean;
  disabled: boolean;
  hidden: boolean;
  gestures: boolean;
  accessibility: boolean;
}

/**
 * Event log entry
 */
interface EventLogEntry {
  timestamp: number;
  type: 'press' | 'long_press' | 'position_change' | 'config_change';
  data: any;
}

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Test scenarios
 */
const TEST_SCENARIOS: TestScenario[] = [
  {
    name: 'Basic Orb',
    description: 'Simple floating orb with default configuration',
    category: 'basic',
    config: {
      size: 'medium',
      variant: 'default',
      position: { type: 'center', respectSafeArea: true },
      animation: { type: 'float', autoStart: true },
      onPress: () => Alert.alert('Basic Orb', 'Orb pressed!'),
    },
  },
  {
    name: 'Premium Orb',
    description: 'Premium orb with enhanced glow and indicator',
    category: 'premium',
    config: {
      size: 'large',
      variant: 'premium',
      position: { type: 'center', respectSafeArea: true },
      animation: { type: 'pulse', autoStart: true },
      premium: {
        enabled: true,
        indicatorPosition: 'top-right',
        glowIntensity: 1.2,
        shimmerEnabled: true,
        enhancedAnimations: true,
      },
      onPress: () => Alert.alert('Premium Orb', 'Premium feature activated!'),
    },
  },
  {
    name: 'Orbital Animation',
    description: 'Orb with orbital rotation animation',
    category: 'advanced',
    config: {
      size: 'medium',
      variant: 'cosmic',
      position: { type: 'right', respectSafeArea: true },
      animation: { type: 'orbital', autoStart: true, duration: 15000 },
      onPress: () => Alert.alert('Orbital Orb', 'Cosmic orb activated!'),
    },
  },
  {
    name: 'Draggable Orb',
    description: 'Orb with pan gesture support',
    category: 'gesture',
    config: {
      size: 'medium',
      variant: 'glass',
      position: { type: 'left', respectSafeArea: true },
      animation: { type: 'magnetic', autoStart: true },
      gesture: {
        enablePan: true,
        enableMagnetic: true,
        enableHaptics: true,
        panBounds: { minX: 50, maxX: 300, minY: 100, maxY: 600 },
        magneticStrength: 0.8,
      },
      onPress: () => Alert.alert('Draggable Orb', 'Drag me around!'),
      onPositionChange: (position) => console.log('Position changed:', position),
    },
  },
  {
    name: 'Accessible Orb',
    description: 'Orb with full accessibility features',
    category: 'accessibility',
    config: {
      size: 'large',
      variant: 'default',
      position: { type: 'center', respectSafeArea: true },
      animation: { type: 'float', autoStart: true },
      accessibility: {
        enabled: true,
        label: 'Floating Action Button',
        hint: 'Double tap to activate premium features',
        role: 'button',
        announceChanges: true,
      },
      onPress: () => Alert.alert('Accessible Orb', 'Accessibility features active!'),
    },
  },
  {
    name: 'Mini Orb',
    description: 'Small orb for minimal interfaces',
    category: 'basic',
    config: {
      size: 'small',
      variant: 'minimal',
      position: { type: 'custom', custom: { right: 80, bottom: 120 } },
      animation: { type: 'pulse', autoStart: true, duration: 2000 },
      onPress: () => Alert.alert('Mini Orb', 'Small but mighty!'),
    },
  },
  {
    name: 'Disabled Orb',
    description: 'Orb in disabled state',
    category: 'basic',
    config: {
      size: 'medium',
      variant: 'default',
      position: { type: 'center', respectSafeArea: true },
      animation: { type: 'none', autoStart: false },
      disabled: true,
      onPress: () => Alert.alert('Disabled Orb', 'This should not appear!'),
    },
  },
];

/**
 * Configuration options
 */
const CONFIG_OPTIONS = {
  sizes: ['small', 'medium', 'large'] as BottomNavOrbSize[],
  variants: ['default', 'premium', 'cosmic', 'minimal', 'glass'] as BottomNavOrbVariant[],
  positions: ['center', 'right', 'left'] as BottomNavOrbPosition[],
  animations: ['float', 'orbital', 'pulse', 'magnetic', 'none'] as BottomNavOrbAnimation[],
};

/**
 * Default colors for fallback
 */
const DEFAULT_COLORS = {
  primary: '#2E86DE',
  secondary: '#54A0FF',
  accent: '#DDA0FF',
  background: '#1a1a2e',
  surface: '#16213e',
  text: '#ffffff',
  textSecondary: '#B8B8C0',
  success: '#27AE60',
  warning: '#F39C12',
  error: '#E74C3C',
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Bottom Navigation Orb Test Component
 */
export const BottomNavOrbTest: React.FC = () => {
  const { theme } = useTheme();
  const [selectedScenario, setSelectedScenario] = useState<TestScenario>(TEST_SCENARIOS[0]);
  const [customConfig, setCustomConfig] = useState<TestConfig>({
    size: 'medium',
    variant: 'default',
    position: 'center',
    animation: 'float',
    premium: false,
    disabled: false,
    hidden: false,
    gestures: false,
    accessibility: true,
  });
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [eventLog, setEventLog] = useState<EventLogEntry[]>([]);
  const [orbPosition, setOrbPosition] = useState({ x: 0, y: 0 });

  // ============================================================================
  // THEME COLORS
  // ============================================================================

  const colors = useMemo(() => ({
    primary: theme?.colors?.brand?.primary || DEFAULT_COLORS.primary,
    secondary: theme?.colors?.brand?.light || DEFAULT_COLORS.secondary,
    accent: theme?.colors?.luxury?.pure || DEFAULT_COLORS.accent,
    background: theme?.colors?.cosmos?.void || DEFAULT_COLORS.background,
    surface: theme?.colors?.cosmos?.deep || DEFAULT_COLORS.surface,
    text: theme?.colors?.neutral?.text || DEFAULT_COLORS.text,
    textSecondary: theme?.colors?.neutral?.muted || DEFAULT_COLORS.textSecondary,
    success: theme?.colors?.luxury?.bronze || DEFAULT_COLORS.success,
    warning: theme?.colors?.luxury?.champagne || DEFAULT_COLORS.warning,
    error: theme?.colors?.luxury?.shimmer || DEFAULT_COLORS.error,
  }), [theme]);

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  const logEvent = useCallback((type: EventLogEntry['type'], data: any) => {
    const entry: EventLogEntry = {
      timestamp: Date.now(),
      type,
      data,
    };
    setEventLog(prev => [entry, ...prev.slice(0, 49)]); // Keep last 50 entries
  }, []);

  const handleOrbPress = useCallback(() => {
    logEvent('press', { scenario: selectedScenario.name, isCustomMode });
    Alert.alert('Orb Pressed', `${isCustomMode ? 'Custom' : selectedScenario.name} orb activated!`);
  }, [selectedScenario, isCustomMode, logEvent]);

  const handleOrbLongPress = useCallback(() => {
    logEvent('long_press', { scenario: selectedScenario.name, isCustomMode });
    Alert.alert('Orb Long Pressed', `${isCustomMode ? 'Custom' : selectedScenario.name} orb long pressed!`);
  }, [selectedScenario, isCustomMode, logEvent]);

  const handlePositionChange = useCallback((position: { x: number; y: number }) => {
    setOrbPosition(position);
    logEvent('position_change', position);
  }, [logEvent]);

  const handleConfigChange = useCallback((key: keyof TestConfig, value: any) => {
    setCustomConfig(prev => ({ ...prev, [key]: value }));
    logEvent('config_change', { key, value });
  }, [logEvent]);

  // ============================================================================
  // RENDER HELPERS
  // ============================================================================

  const renderScenarioList = () => {
    const groupedScenarios = TEST_SCENARIOS.reduce((acc, scenario) => {
      if (!acc[scenario.category]) {
        acc[scenario.category] = [];
      }
      acc[scenario.category].push(scenario);
      return acc;
    }, {} as Record<string, TestScenario[]>);

    return (
      <View style={styles.scenarioList}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Test Scenarios</Text>
        
        {Object.entries(groupedScenarios).map(([category, scenarios]) => (
          <View key={category} style={styles.categoryGroup}>
            <Text style={[styles.categoryTitle, { color: colors.accent }]}>
              {category.toUpperCase()}
            </Text>
            {scenarios.map((scenario) => (
              <TouchableOpacity
                key={scenario.name}
                style={[
                  styles.scenarioButton,
                  { backgroundColor: colors.surface, borderColor: colors.primary },                selectedScenario.name === scenario.name && !isCustomMode && {
                  backgroundColor: `${String(colors.primary)}20`,
                  borderColor: colors.primary,
                },
                ]}
                onPress={() => {
                  setSelectedScenario(scenario);
                  setIsCustomMode(false);
                }}
              >
                <Text style={[styles.scenarioName, { color: colors.text }]}>
                  {scenario.name}
                </Text>
                <Text style={[styles.scenarioDescription, { color: colors.textSecondary }]}>
                  {scenario.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    );
  };

  const renderCustomConfig = () => {
    return (
      <View style={styles.customConfig}>
        <TouchableOpacity
          style={[
            styles.customModeButton,
            { backgroundColor: colors.surface, borderColor: colors.accent },
            isCustomMode && {
              backgroundColor: `${String(colors.accent)}20`,
              borderColor: colors.accent,
            },
          ]}
          onPress={() => setIsCustomMode(!isCustomMode)}
        >
          <Text style={[styles.customModeText, { color: colors.text }]}>
            {isCustomMode ? 'Using Custom Config' : 'Switch to Custom Config'}
          </Text>
        </TouchableOpacity>

        {isCustomMode && (
          <View style={styles.configPanel}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Custom Configuration</Text>
            
            {/* Size Selection */}
            <View style={styles.configRow}>
              <Text style={[styles.configLabel, { color: colors.textSecondary }]}>Size</Text>
              <View style={styles.configOptions}>
                {CONFIG_OPTIONS.sizes.map((size) => (
                  <TouchableOpacity
                    key={size}
                    style={[
                      styles.configOption,
                      { backgroundColor: colors.surface, borderColor: colors.primary },
                      customConfig.size === size && {
                        backgroundColor: `${String(colors.primary)}20`,
                        borderColor: colors.primary,
                      },
                    ]}
                    onPress={() => handleConfigChange('size', size)}
                  >
                    <Text style={[styles.configOptionText, { color: colors.text }]}>
                      {size}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Variant Selection */}
            <View style={styles.configRow}>
              <Text style={[styles.configLabel, { color: colors.textSecondary }]}>Variant</Text>
              <View style={styles.configOptions}>
                {CONFIG_OPTIONS.variants.map((variant) => (
                  <TouchableOpacity
                    key={variant}
                    style={[
                      styles.configOption,
                      { backgroundColor: colors.surface, borderColor: colors.primary },
                      customConfig.variant === variant && {
                        backgroundColor: `${String(colors.primary)}20`,
                        borderColor: colors.primary,
                      },
                    ]}
                    onPress={() => handleConfigChange('variant', variant)}
                  >
                    <Text style={[styles.configOptionText, { color: colors.text }]}>
                      {variant}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Position Selection */}
            <View style={styles.configRow}>
              <Text style={[styles.configLabel, { color: colors.textSecondary }]}>Position</Text>
              <View style={styles.configOptions}>
                {CONFIG_OPTIONS.positions.map((position) => (
                  <TouchableOpacity
                    key={position}
                    style={[
                      styles.configOption,
                      { backgroundColor: colors.surface, borderColor: colors.primary },
                      customConfig.position === position && {
                        backgroundColor: `${String(colors.primary)}20`,
                        borderColor: colors.primary,
                      },
                    ]}
                    onPress={() => handleConfigChange('position', position)}
                  >
                    <Text style={[styles.configOptionText, { color: colors.text }]}>
                      {position}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Animation Selection */}
            <View style={styles.configRow}>
              <Text style={[styles.configLabel, { color: colors.textSecondary }]}>Animation</Text>
              <View style={styles.configOptions}>
                {CONFIG_OPTIONS.animations.map((animation) => (
                  <TouchableOpacity
                    key={animation}
                    style={[
                      styles.configOption,
                      { backgroundColor: colors.surface, borderColor: colors.primary },
                      customConfig.animation === animation && {
                        backgroundColor: `${String(colors.primary)}20`,
                        borderColor: colors.primary,
                      },
                    ]}
                    onPress={() => handleConfigChange('animation', animation)}
                  >
                    <Text style={[styles.configOptionText, { color: colors.text }]}>
                      {animation}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Toggle Options */}
            <View style={styles.toggleOptions}>
              <View style={styles.toggleRow}>
                <Text style={[styles.toggleLabel, { color: colors.textSecondary }]}>Premium</Text>
                <Switch
                  value={customConfig.premium}
                  onValueChange={(value) => handleConfigChange('premium', value)}
                  thumbColor={customConfig.premium ? colors.accent : colors.textSecondary}
                  trackColor={{ false: colors.surface, true: `${String(colors.accent)}40` }}
                />
              </View>
              
              <View style={styles.toggleRow}>
                <Text style={[styles.toggleLabel, { color: colors.textSecondary }]}>Gestures</Text>
                <Switch
                  value={customConfig.gestures}
                  onValueChange={(value) => handleConfigChange('gestures', value)}
                  thumbColor={customConfig.gestures ? colors.primary : colors.textSecondary}
                  trackColor={{ false: colors.surface, true: `${String(colors.primary)}40` }}
                />
              </View>
              
              <View style={styles.toggleRow}>
                <Text style={[styles.toggleLabel, { color: colors.textSecondary }]}>Disabled</Text>
                <Switch
                  value={customConfig.disabled}
                  onValueChange={(value) => handleConfigChange('disabled', value)}
                  thumbColor={customConfig.disabled ? colors.error : colors.textSecondary}
                  trackColor={{ false: colors.surface, true: `${String(colors.error)}40` }}
                />
              </View>
              
              <View style={styles.toggleRow}>
                <Text style={[styles.toggleLabel, { color: colors.textSecondary }]}>Hidden</Text>
                <Switch
                  value={customConfig.hidden}
                  onValueChange={(value) => handleConfigChange('hidden', value)}
                  thumbColor={customConfig.hidden ? colors.warning : colors.textSecondary}
                  trackColor={{ false: colors.surface, true: `${String(colors.warning)}40` }}
                />
              </View>
            </View>
          </View>
        )}
      </View>
    );
  };

  const renderEventLog = () => {
    return (
      <View style={styles.eventLog}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Event Log</Text>
        <TouchableOpacity
          style={[styles.clearButton, { backgroundColor: colors.error }]}
          onPress={() => setEventLog([])}
        >
          <Text style={[styles.clearButtonText, { color: colors.text }]}>Clear Log</Text>
        </TouchableOpacity>
        
        <ScrollView style={styles.eventList} showsVerticalScrollIndicator={false}>
          {eventLog.map((entry, index) => (
            <View key={index} style={[styles.eventItem, { backgroundColor: colors.surface }]}>
              <Text style={[styles.eventType, { color: colors.accent }]}>
                {entry.type.toUpperCase()}
              </Text>
              <Text style={[styles.eventData, { color: colors.textSecondary }]}>
                {JSON.stringify(entry.data, null, 2)}
              </Text>
              <Text style={[styles.eventTime, { color: colors.textSecondary }]}>
                {new Date(entry.timestamp).toLocaleTimeString()}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };

  const renderStatusInfo = () => {
    return (
      <View style={styles.statusInfo}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Status</Text>
        <View style={styles.statusRow}>
          <Text style={[styles.statusLabel, { color: colors.textSecondary }]}>
            Active Scenario:
          </Text>
          <Text style={[styles.statusValue, { color: colors.success }]}>
            {isCustomMode ? 'Custom Configuration' : selectedScenario.name}
          </Text>
        </View>
        <View style={styles.statusRow}>
          <Text style={[styles.statusLabel, { color: colors.textSecondary }]}>
            Position:
          </Text>
          <Text style={[styles.statusValue, { color: colors.primary }]}>
            x: {orbPosition.x.toFixed(1)}, y: {orbPosition.y.toFixed(1)}
          </Text>
        </View>
        <View style={styles.statusRow}>
          <Text style={[styles.statusLabel, { color: colors.textSecondary }]}>
            Events:
          </Text>
          <Text style={[styles.statusValue, { color: colors.accent }]}>
            {eventLog.length}
          </Text>
        </View>
      </View>
    );
  };

  // ============================================================================
  // RENDER COMPONENT
  // ============================================================================

  const renderActiveOrb = () => {
    if (isCustomMode) {
      const config: BottomNavOrbProps = {
        size: customConfig.size,
        variant: customConfig.variant,
        position: { type: customConfig.position, respectSafeArea: true },
        animation: { type: customConfig.animation, autoStart: true },
        premium: customConfig.premium ? {
          enabled: true,
          indicatorPosition: 'top-right',
          glowIntensity: 1.0,
        } : undefined,
        gesture: customConfig.gestures ? {
          enablePan: true,
          enableMagnetic: true,
          enableHaptics: true,
        } : undefined,
        disabled: customConfig.disabled,
        hidden: customConfig.hidden,
        onPress: handleOrbPress,
        onLongPress: handleOrbLongPress,
        onPositionChange: handlePositionChange,
        accessibility: {
          enabled: customConfig.accessibility,
          label: 'Custom Test Orb',
          hint: 'Test orb with custom configuration',
        },
        testID: 'custom-orb',
      };
      return <BottomNavOrb {...config} />;
    } else {
      const config: BottomNavOrbProps = {
        ...selectedScenario.config,
        onPress: handleOrbPress,
        onLongPress: handleOrbLongPress,
        onPositionChange: handlePositionChange,
        testID: `scenario-orb-${selectedScenario.name.replace(/\s+/g, '-').toLowerCase()}`,
      };
      return <BottomNavOrb {...config} />;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>
          BottomNavOrb Test Suite
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Interactive testing for floating navigation orbs
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderScenarioList()}
        {renderCustomConfig()}
        {renderStatusInfo()}
        {renderEventLog()}
      </ScrollView>

      {renderActiveOrb()}
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
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2E86DE30',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.8,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  scenarioList: {
    marginBottom: 32,
  },
  categoryGroup: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  scenarioButton: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  scenarioName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  scenarioDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  customConfig: {
    marginBottom: 32,
  },
  customModeButton: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 16,
  },
  customModeText: {
    fontSize: 16,
    fontWeight: '600',
  },
  configPanel: {
    marginTop: 8,
  },
  configRow: {
    marginBottom: 20,
  },
  configLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  configOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  configOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  configOptionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  toggleOptions: {
    marginTop: 16,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  toggleLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  statusInfo: {
    marginBottom: 32,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginRight: 8,
  },
  statusValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  eventLog: {
    marginBottom: 32,
  },
  clearButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-end',
    marginBottom: 16,
  },
  clearButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  eventList: {
    maxHeight: 300,
  },
  eventItem: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  eventType: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 4,
  },
  eventData: {
    fontSize: 12,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    marginBottom: 4,
  },
  eventTime: {
    fontSize: 11,
    opacity: 0.7,
  },
});

// ============================================================================
// EXPORT
// ============================================================================

export default BottomNavOrbTest;
