/**
 * Corp Astro UI Library - FloatingFAB Interactive Test Suite
 * 
 * A comprehensive test suite for the FloatingFAB component demonstrating all features,
 * configurations, and interaction patterns with real-time feedback.
 * 
 * Test Categories:
 * - Basic FAB functionality
 * - Expandable menu behavior
 * - Drag and positioning
 * - Animation states
 * - Accessibility features
 * - Theme integration
 * - Premium features
 * - Edge cases and error handling
 * 
 * @module FloatingFABTest
 * @version 1.0.0
 * @since 2024
 */

import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Switch,
  Dimensions,
  Alert,
} from 'react-native';

// Component imports
import { FloatingFAB, FloatingFABProps, FloatingFABAction, FloatingFABPosition } from '../FloatingFAB';

// Screen dimensions
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Color constants for test stability
const COLORS = {
  primary: '#3B82F6',
  secondary: '#8B5CF6',
  accent: '#10B981',
  background: '#1F2937',
  surface: '#374151',
  text: '#FFFFFF',
  textSecondary: '#9CA3AF',
  border: '#4B5563',
  error: '#EF4444',
  warning: '#F59E0B',
  success: '#10B981',
  info: '#3B82F6',
};

// Test scenarios interface
interface TestScenario {
  id: string;
  name: string;
  description: string;
  props: Partial<FloatingFABProps>;
}

// Test configuration state
interface TestConfig {
  scenario: string;
  autoCollapse: boolean;
  dragEnabled: boolean;
  pulseEnabled: boolean;
  trailEnabled: boolean;
  glowEnabled: boolean;
  magneticSnap: boolean;
  premium: boolean;
  disabled: boolean;
  showLogs: boolean;
}

// Event log entry interface
interface LogEntry {
  id: string;
  timestamp: string;
  event: string;
  details: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

/**
 * FloatingFAB Interactive Test Suite Component
 */
export const FloatingFABTest: React.FC = () => {
  // State management
  const [config, setConfig] = useState<TestConfig>({
    scenario: 'basic',
    autoCollapse: true,
    dragEnabled: true,
    pulseEnabled: true,
    trailEnabled: true,
    glowEnabled: true,
    magneticSnap: true,
    premium: false,
    disabled: false,
    showLogs: true,
  });
  
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [position, setPosition] = useState<FloatingFABPosition>({
    x: screenWidth - 76,
    y: screenHeight - 180,
  });
  
  // Refs
  const logIdCounter = useRef(0);
  
  // Logging function
  const addLog = useCallback((event: string, details: string, type: LogEntry['type'] = 'info') => {
    const newLog: LogEntry = {
      id: `log-${logIdCounter.current++}`,
      timestamp: new Date().toLocaleTimeString(),
      event,
      details,
      type,
    };
    
    setLogs(prev => [newLog, ...prev.slice(0, 49)]); // Keep last 50 logs
  }, []);
  
  // Sample actions for expandable menu
  const sampleActions: FloatingFABAction[] = [
    {
      id: 'profile',
      icon: '👤',
      label: 'Profile',
      onPress: () => addLog('Action Pressed', 'Profile action triggered', 'info'),
    },
    {
      id: 'settings',
      icon: '⚙️',
      label: 'Settings',
      onPress: () => addLog('Action Pressed', 'Settings action triggered', 'info'),
    },
    {
      id: 'notifications',
      icon: '🔔',
      label: 'Notifications',
      badge: '3',
      onPress: () => addLog('Action Pressed', 'Notifications action triggered', 'info'),
    },
    {
      id: 'help',
      icon: '❓',
      label: 'Help',
      onPress: () => addLog('Action Pressed', 'Help action triggered', 'info'),
    },
  ];
  
  // Test scenarios
  const scenarios: TestScenario[] = [
    {
      id: 'basic',
      name: 'Basic FAB',
      description: 'Simple floating action button with basic functionality',
      props: {
        icon: '+',
        expandedIcon: '✕',
        backgroundColor: COLORS.primary,
      },
    },
    {
      id: 'expandable',
      name: 'Expandable Menu',
      description: 'FAB with expandable radial menu',
      props: {
        icon: '☰',
        expandedIcon: '✕',
        actions: sampleActions,
        backgroundColor: COLORS.secondary,
      },
    },
    {
      id: 'custom_position',
      name: 'Custom Position',
      description: 'FAB with custom starting position',
      props: {
        icon: '📍',
        position: { x: 50, y: 200 },
        backgroundColor: COLORS.accent,
      },
    },
    {
      id: 'large_size',
      name: 'Large Size',
      description: 'Larger FAB with custom size',
      props: {
        icon: '⭐',
        size: 72,
        backgroundColor: COLORS.warning,
      },
    },
    {
      id: 'custom_colors',
      name: 'Custom Colors',
      description: 'FAB with custom color scheme',
      props: {
        icon: '🎨',
        backgroundColor: '#FF6B6B',
        iconColor: '#FFFFFF',
        glowColor: '#FF6B6B',
        trailColor: '#FF6B6B',
      },
    },
    {
      id: 'premium',
      name: 'Premium Features',
      description: 'FAB with premium visual effects',
      props: {
        icon: '💎',
        premium: true,
        backgroundColor: COLORS.primary,
        glowEnabled: true,
        pulseIntensity: 0.5,
      },
    },
    {
      id: 'mini',
      name: 'Mini Variant',
      description: 'Mini FAB variant (48px) as per UI Docs',
      props: {
        icon: '🔹',
        variant: 'mini',
        backgroundColor: COLORS.accent,
      },
    },
  ];
  
  // Event handlers
  const handleFABPress = useCallback(() => {
    addLog('FAB Pressed', 'Main FAB button was pressed', 'info');
  }, [addLog]);
  
  const handleFABExpand = useCallback(() => {
    addLog('FAB Expanded', 'FAB menu expanded', 'success');
  }, [addLog]);
  
  const handleFABCollapse = useCallback(() => {
    addLog('FAB Collapsed', 'FAB menu collapsed', 'success');
  }, [addLog]);
  
  const handlePositionChange = useCallback((newPosition: FloatingFABPosition) => {
    setPosition(newPosition);
    addLog('Position Changed', `New position: (${Math.round(newPosition.x)}, ${Math.round(newPosition.y)})`, 'info');
  }, [addLog]);
  
  const handleActionPress = useCallback((action: FloatingFABAction) => {
    addLog('Action Pressed', `Action "${action.label}" was pressed`, 'info');
  }, [addLog]);
  
  // Configuration update functions
  const updateConfig = useCallback((key: keyof TestConfig, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
    addLog('Config Updated', `${key} changed to ${value}`, 'info');
  }, [addLog]);
  
  const resetPosition = useCallback(() => {
    const newPosition = {
      x: screenWidth - 76,
      y: screenHeight - 180,
    };
    setPosition(newPosition);
    addLog('Position Reset', 'FAB position reset to default', 'info');
  }, [addLog]);
  
  const clearLogs = useCallback(() => {
    setLogs([]);
    addLog('Logs Cleared', 'Event logs cleared', 'info');
  }, [addLog]);
  
  // Get current scenario
  const currentScenario = scenarios.find(s => s.id === config.scenario) || scenarios[0];
  
  // Build FAB props
  const fabProps: FloatingFABProps = {
    ...currentScenario.props,
    position,
    actions: config.scenario === 'expandable' ? sampleActions : currentScenario.props.actions,
    autoCollapse: config.autoCollapse,
    dragEnabled: config.dragEnabled,
    pulseEnabled: config.pulseEnabled,
    trailEnabled: config.trailEnabled,
    glowEnabled: config.glowEnabled,
    magneticSnap: config.magneticSnap,
    premium: config.premium,
    disabled: config.disabled,
    onPress: handleFABPress,
    onExpand: handleFABExpand,
    onCollapse: handleFABCollapse,
    onPositionChange: handlePositionChange,
    onActionPress: handleActionPress,
  };
  
  // Render configuration controls
  const renderConfigControls = () => (
    <View style={styles.configSection}>
      <Text style={styles.sectionTitle}>Configuration</Text>
      
      {/* Scenario Selection */}
      <View style={styles.configGroup}>
        <Text style={styles.configLabel}>Test Scenario</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.scenarioRow}>
            {scenarios.map(scenario => (
              <TouchableOpacity
                key={scenario.id}
                style={[
                  styles.scenarioButton,
                  config.scenario === scenario.id && styles.scenarioButtonActive,
                ]}
                onPress={() => updateConfig('scenario', scenario.id)}
              >
                <Text style={[
                  styles.scenarioButtonText,
                  config.scenario === scenario.id && styles.scenarioButtonTextActive,
                ]}>
                  {scenario.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <Text style={styles.configDescription}>
          {currentScenario.description}
        </Text>
      </View>
      
      {/* Boolean Controls */}
      <View style={styles.configGroup}>
        <Text style={styles.configLabel}>Features</Text>
        <View style={styles.switchGrid}>
          {[
            { key: 'autoCollapse', label: 'Auto Collapse' },
            { key: 'dragEnabled', label: 'Drag Enabled' },
            { key: 'pulseEnabled', label: 'Pulse Animation' },
            { key: 'trailEnabled', label: 'Trail Effects' },
            { key: 'glowEnabled', label: 'Glow Effects' },
            { key: 'magneticSnap', label: 'Magnetic Snap' },
            { key: 'premium', label: 'Premium Features' },
            { key: 'disabled', label: 'Disabled' },
          ].map(item => (
            <View key={item.key} style={styles.switchRow}>
              <Text style={styles.switchLabel}>{item.label}</Text>
              <Switch
                value={config[item.key as keyof TestConfig] as boolean}
                onValueChange={(value) => updateConfig(item.key as keyof TestConfig, value)}
                trackColor={{ false: COLORS.surface, true: COLORS.primary }}
                thumbColor={config[item.key as keyof TestConfig] ? COLORS.text : COLORS.textSecondary}
              />
            </View>
          ))}
        </View>
      </View>
      
      {/* Action Buttons */}
      <View style={styles.configGroup}>
        <Text style={styles.configLabel}>Actions</Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: COLORS.accent }]}
            onPress={resetPosition}
          >
            <Text style={styles.actionButtonText}>Reset Position</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: COLORS.warning }]}
            onPress={clearLogs}
          >
            <Text style={styles.actionButtonText}>Clear Logs</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
  
  // Render event logs
  const renderEventLogs = () => (
    <View style={styles.logSection}>
      <View style={styles.logHeader}>
        <Text style={styles.sectionTitle}>Event Logs</Text>
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => updateConfig('showLogs', !config.showLogs)}
        >
          <Text style={styles.toggleButtonText}>
            {config.showLogs ? 'Hide' : 'Show'}
          </Text>
        </TouchableOpacity>
      </View>
      
      {config.showLogs && (
        <ScrollView style={styles.logContainer} showsVerticalScrollIndicator={false}>
          {logs.map(log => (
            <View
              key={log.id}
              style={[
                styles.logEntry,
                { borderLeftColor: getLogColor(log.type) },
              ]}
            >
              <View style={styles.logHeader}>
                <Text style={styles.logEvent}>{log.event}</Text>
                <Text style={styles.logTime}>{log.timestamp}</Text>
              </View>
              <Text style={styles.logDetails}>{log.details}</Text>
            </View>
          ))}
          
          {logs.length === 0 && (
            <Text style={styles.emptyLogs}>No events logged yet</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
  
  // Get log color based on type
  const getLogColor = (type: LogEntry['type']) => {
    switch (type) {
      case 'success': return COLORS.success;
      case 'warning': return COLORS.warning;
      case 'error': return COLORS.error;
      default: return COLORS.info;
    }
  };
  
  // Render status indicator
  const renderStatusIndicator = () => (
    <View style={styles.statusIndicator}>
      <View style={[styles.statusDot, { backgroundColor: config.disabled ? COLORS.error : COLORS.success }]} />
      <Text style={styles.statusText}>
        {config.disabled ? 'Disabled' : 'Active'} • Position: ({Math.round(position.x)}, {Math.round(position.y)})
      </Text>
    </View>
  );
  
  // Main render
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>FloatingFAB Test Suite</Text>
        <Text style={styles.subtitle}>Interactive Component Testing</Text>
        {renderStatusIndicator()}
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderConfigControls()}
        {renderEventLogs()}
      </ScrollView>
      
      {/* FloatingFAB Component */}
      <FloatingFAB {...fabProps} />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  content: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 16,
  },
  configSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  configGroup: {
    marginBottom: 20,
  },
  configLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: 8,
  },
  configDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 8,
    fontStyle: 'italic',
  },
  scenarioRow: {
    flexDirection: 'row',
    gap: 8,
  },
  scenarioButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  scenarioButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  scenarioButtonText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  scenarioButtonTextActive: {
    color: COLORS.text,
  },
  switchGrid: {
    gap: 8,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  switchLabel: {
    fontSize: 15,
    color: COLORS.text,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  logSection: {
    padding: 20,
  },
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  toggleButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: COLORS.surface,
  },
  toggleButtonText: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '500',
  },
  logContainer: {
    maxHeight: 300,
  },
  logEntry: {
    padding: 12,
    marginBottom: 8,
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    borderLeftWidth: 4,
  },
  logEvent: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  logTime: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  logDetails: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  emptyLogs: {
    textAlign: 'center',
    color: COLORS.textSecondary,
    fontStyle: 'italic',
    padding: 20,
  },
});

// Export default
export default FloatingFABTest;
