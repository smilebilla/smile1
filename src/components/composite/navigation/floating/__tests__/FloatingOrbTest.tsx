/**
 * Corp Astro UI Library - Floating Orb Test Suite
 * 
 * Interactive test suite for FloatingOrb component with comprehensive scenario coverage,
 * animation testing, and visual validation.
 * 
 * @module FloatingOrbTest
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
  SafeAreaView,
  Platform,
  Dimensions,
} from 'react-native';

// Component imports
import FloatingOrb, {
  FloatingOrbProps,
  FloatingOrbSize,
  FloatingOrbAnimation,
  FloatingOrbVariant,
  FloatingOrbPosition,
  FloatingOrbAnimationConfig,
  FloatingOrbPositionConfig,
  FloatingOrbInteractionConfig,
  FloatingOrbTrailConfig,
  FloatingOrbGlowConfig,
  FloatingOrbAccessibilityConfig,
} from '../FloatingOrb';

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
  config: FloatingOrbProps;
  category: 'basic' | 'animation' | 'interaction' | 'premium' | 'accessibility';
}

/**
 * Test configuration state
 */
interface TestConfig {
  size: FloatingOrbSize;
  variant: FloatingOrbVariant;
  position: FloatingOrbPosition;
  animations: FloatingOrbAnimation[];
  enableDrag: boolean;
  enableMagnetic: boolean;
  enableTrail: boolean;
  enableGlow: boolean;
  disabled: boolean;
  hidden: boolean;
  accessibility: boolean;
}

/**
 * Event log entry
 */
interface EventLogEntry {
  timestamp: number;
  type: 'press' | 'long_press' | 'position_change' | 'collision' | 'config_change';
  data: any;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const SCREEN_DIMENSIONS = Dimensions.get('window');

/**
 * Test scenarios
 */
const TEST_SCENARIOS: TestScenario[] = [
  {
    name: 'Basic Floating Orb',
    description: 'Simple floating orb with default animations',
    category: 'basic',
    config: {
      size: 'medium',
      variant: 'default',
      animation: {
        enabled: ['float', 'orbital', 'pulse'],
        autoStart: true,
      },
      position: {
        type: 'free',
        initial: { x: 100, y: 200 },
        respectSafeArea: true,
      },
      onPress: () => Alert.alert('Basic Orb', 'Floating orb pressed!'),
    },
  },
  {
    name: 'Premium Cosmic Orb',
    description: 'Premium orb with all animations and effects',
    category: 'premium',
    config: {
      size: 'large',
      variant: 'premium',
      animation: {
        enabled: ['float', 'orbital', 'pulse', 'trail'],
        autoStart: true,
        floatDuration: 4000,
        orbitalDuration: 15000,
        pulseDuration: 2500,
      },
      position: {
        type: 'free',
        initial: { x: 200, y: 300 },
        respectSafeArea: true,
      },
      trail: {
        enabled: true,
        length: 7,
        opacity: [0.8, 0.6, 0.4, 0.3, 0.2, 0.1, 0.05],
      },
      glow: {
        enabled: true,
        intensity: 1.2,
        blur: 30,
        animationDuration: 1500,
      },
      onPress: () => Alert.alert('Premium Orb', 'Premium cosmic orb activated!'),
    },
  },
  {
    name: 'Interactive Draggable Orb',
    description: 'Orb with drag gestures and magnetic effects',
    category: 'interaction',
    config: {
      size: 'medium',
      variant: 'interactive',
      animation: {
        enabled: ['float', 'pulse', 'magnetic'],
        autoStart: true,
      },
      position: {
        type: 'bounded',
        initial: { x: 150, y: 250 },
        bounds: { minX: 50, maxX: 300, minY: 100, maxY: 500 },
        respectSafeArea: true,
      },
      interaction: {
        enableDrag: true,
        enableMagnetic: true,
        enableHaptics: true,
        enableCollision: true,
        magneticStrength: 0.8,
      },
      onPress: () => Alert.alert('Interactive Orb', 'Drag me around!'),
      onPositionChange: (position) => console.log('Position changed:', position),
      onCollision: (boundary) => console.log('Collision detected:', boundary),
    },
  },
  {
    name: 'Ambient Background Orb',
    description: 'Subtle ambient orb for background decoration',
    category: 'basic',
    config: {
      size: 'small',
      variant: 'ambient',
      animation: {
        enabled: ['float', 'orbital'],
        autoStart: true,
        floatDuration: 8000,
        orbitalDuration: 30000,
      },
      position: {
        type: 'corner',
        initial: { x: 50, y: 150 },
        respectSafeArea: true,
      },
      interaction: {
        enableDrag: false,
        enableMagnetic: false,
        enableHaptics: false,
      },
      glow: {
        enabled: true,
        intensity: 0.4,
        blur: 15,
      },
      onPress: () => Alert.alert('Ambient Orb', 'Background orb touched!'),
    },
  },
  {
    name: 'Trail Effects Orb',
    description: 'Orb with prominent trail effects',
    category: 'animation',
    config: {
      size: 'medium',
      variant: 'cosmic',
      animation: {
        enabled: ['float', 'orbital', 'trail'],
        autoStart: true,
        floatDuration: 5000,
        orbitalDuration: 18000,
      },
      position: {
        type: 'free',
        initial: { x: 180, y: 320 },
        respectSafeArea: true,
      },
      trail: {
        enabled: true,
        length: 8,
        opacity: [0.9, 0.7, 0.5, 0.4, 0.3, 0.2, 0.1, 0.05],
        blur: [0, 1, 2, 3, 4, 5, 6, 7],
      },
      interaction: {
        enableDrag: true,
        enableMagnetic: false,
        enableHaptics: true,
      },
      onPress: () => Alert.alert('Trail Orb', 'Watch my trail!'),
    },
  },
  {
    name: 'Accessible Orb',
    description: 'Orb with full accessibility features',
    category: 'accessibility',
    config: {
      size: 'large',
      variant: 'default',
      animation: {
        enabled: ['float', 'pulse'],
        autoStart: true,
      },
      position: {
        type: 'center',
        initial: { x: SCREEN_DIMENSIONS.width / 2, y: SCREEN_DIMENSIONS.height / 2 },
        respectSafeArea: true,
      },
      accessibility: {
        enabled: true,
        label: 'Floating Navigation Orb',
        hint: 'Double tap to activate, drag to move',
        role: 'button',
        announceInteractions: true,
      },
      onPress: () => Alert.alert('Accessible Orb', 'Accessibility features active!'),
    },
  },
  {
    name: 'Disabled Orb',
    description: 'Orb in disabled state',
    category: 'basic',
    config: {
      size: 'medium',
      variant: 'default',
      animation: {
        enabled: ['none'],
        autoStart: false,
      },
      position: {
        type: 'free',
        initial: { x: 120, y: 180 },
        respectSafeArea: true,
      },
      disabled: true,
      onPress: () => Alert.alert('Disabled Orb', 'This should not appear!'),
    },
  },
];

/**
 * Configuration options
 */
const CONFIG_OPTIONS = {
  sizes: ['small', 'medium', 'large'] as FloatingOrbSize[],
  variants: ['default', 'premium', 'cosmic', 'ambient', 'interactive'] as FloatingOrbVariant[],
  positions: ['free', 'bounded', 'corner', 'edge', 'center'] as FloatingOrbPosition[],
  animations: ['float', 'orbital', 'pulse', 'trail', 'magnetic', 'all', 'none'] as FloatingOrbAnimation[],
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
 * Floating Orb Test Component
 */
export const FloatingOrbTest: React.FC = () => {
  const { theme } = useTheme();
  const [selectedScenario, setSelectedScenario] = useState<TestScenario>(TEST_SCENARIOS[0]);
  const [customConfig, setCustomConfig] = useState<TestConfig>({
    size: 'medium',
    variant: 'default',
    position: 'free',
    animations: ['float', 'orbital', 'pulse'],
    enableDrag: true,
    enableMagnetic: true,
    enableTrail: true,
    enableGlow: true,
    disabled: false,
    hidden: false,
    accessibility: true,
  });
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [eventLog, setEventLog] = useState<EventLogEntry[]>([]);
  const [orbPosition, setOrbPosition] = useState({ x: 100, y: 200 });
  const [collisionCount, setCollisionCount] = useState(0);

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

  const handleCollision = useCallback((boundary: 'top' | 'bottom' | 'left' | 'right') => {
    setCollisionCount(prev => prev + 1);
    logEvent('collision', { boundary, count: collisionCount + 1 });
  }, [logEvent, collisionCount]);

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
                  { backgroundColor: colors.surface, borderColor: colors.primary },
                  selectedScenario.name === scenario.name && !isCustomMode && {
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
              <Text style={[styles.configLabel, { color: colors.textSecondary }]}>Animations</Text>
              <View style={styles.configOptions}>
                {CONFIG_OPTIONS.animations.map((animation) => (
                  <TouchableOpacity
                    key={animation}
                    style={[
                      styles.configOption,
                      { backgroundColor: colors.surface, borderColor: colors.primary },
                      customConfig.animations.includes(animation) && {
                        backgroundColor: `${String(colors.primary)}20`,
                        borderColor: colors.primary,
                      },
                    ]}
                    onPress={() => {
                      const newAnimations = customConfig.animations.includes(animation)
                        ? customConfig.animations.filter(a => a !== animation)
                        : [...customConfig.animations, animation];
                      handleConfigChange('animations', newAnimations);
                    }}
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
                <Text style={[styles.toggleLabel, { color: colors.textSecondary }]}>Enable Drag</Text>
                <Switch
                  value={customConfig.enableDrag}
                  onValueChange={(value) => handleConfigChange('enableDrag', value)}
                  thumbColor={customConfig.enableDrag ? colors.primary : colors.textSecondary}
                  trackColor={{ false: colors.surface, true: `${String(colors.primary)}40` }}
                />
              </View>
              
              <View style={styles.toggleRow}>
                <Text style={[styles.toggleLabel, { color: colors.textSecondary }]}>Enable Magnetic</Text>
                <Switch
                  value={customConfig.enableMagnetic}
                  onValueChange={(value) => handleConfigChange('enableMagnetic', value)}
                  thumbColor={customConfig.enableMagnetic ? colors.secondary : colors.textSecondary}
                  trackColor={{ false: colors.surface, true: `${String(colors.secondary)}40` }}
                />
              </View>
              
              <View style={styles.toggleRow}>
                <Text style={[styles.toggleLabel, { color: colors.textSecondary }]}>Enable Trail</Text>
                <Switch
                  value={customConfig.enableTrail}
                  onValueChange={(value) => handleConfigChange('enableTrail', value)}
                  thumbColor={customConfig.enableTrail ? colors.accent : colors.textSecondary}
                  trackColor={{ false: colors.surface, true: `${String(colors.accent)}40` }}
                />
              </View>
              
              <View style={styles.toggleRow}>
                <Text style={[styles.toggleLabel, { color: colors.textSecondary }]}>Enable Glow</Text>
                <Switch
                  value={customConfig.enableGlow}
                  onValueChange={(value) => handleConfigChange('enableGlow', value)}
                  thumbColor={customConfig.enableGlow ? colors.success : colors.textSecondary}
                  trackColor={{ false: colors.surface, true: `${String(colors.success)}40` }}
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
            Collisions:
          </Text>
          <Text style={[styles.statusValue, { color: colors.warning }]}>
            {collisionCount}
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
      const config: FloatingOrbProps = {
        size: customConfig.size,
        variant: customConfig.variant,
        animation: {
          enabled: customConfig.animations,
          autoStart: true,
        },
        position: {
          type: customConfig.position,
          initial: { x: 150, y: 250 },
          respectSafeArea: true,
        },
        interaction: {
          enableDrag: customConfig.enableDrag,
          enableMagnetic: customConfig.enableMagnetic,
          enableHaptics: true,
          enableCollision: true,
        },
        trail: {
          enabled: customConfig.enableTrail,
          length: 6,
        },
        glow: {
          enabled: customConfig.enableGlow,
          intensity: 0.8,
        },
        disabled: customConfig.disabled,
        hidden: customConfig.hidden,
        onPress: handleOrbPress,
        onLongPress: handleOrbLongPress,
        onPositionChange: handlePositionChange,
        onCollision: handleCollision,
        accessibility: {
          enabled: customConfig.accessibility,
          label: 'Custom Test Floating Orb',
          hint: 'Test orb with custom configuration',
        },
        testID: 'custom-floating-orb',
      };
      return <FloatingOrb {...config} />;
    } else {
      const config: FloatingOrbProps = {
        ...selectedScenario.config,
        onPress: handleOrbPress,
        onLongPress: handleOrbLongPress,
        onPositionChange: handlePositionChange,
        onCollision: handleCollision,
        testID: `scenario-floating-orb-${selectedScenario.name.replace(/\s+/g, '-').toLowerCase()}`,
      };
      return <FloatingOrb {...config} />;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>
          FloatingOrb Test Suite
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

export default FloatingOrbTest;
