/**
 * Corp Astro UI Library - ButtonBase Test Component
 * 
 * Basic test component for ButtonBase primitive demonstrating
 * core functionality and states.
 * 
 * @module ButtonBaseTest
 * @version 1.0.0
 * @since 2024
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import { ButtonBase, ButtonBaseProps, ButtonBaseSize, ButtonBaseAnimation, ButtonBaseLoadingState } from '../ButtonBase';

/**
 * ButtonBase Test Component
 * 
 * Interactive test interface for ButtonBase primitive
 */
const ButtonBaseTest: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handlePress = () => {
    console.log('ButtonBase pressed');
  };

  const handleLongPress = () => {
    console.log('ButtonBase long pressed');
  };

  const handleLoadingToggle = () => {
    setIsLoading(!isLoading);
    if (!isLoading) {
      setTimeout(() => setIsLoading(false), 3000);
    }
  };

  const loadingState: ButtonBaseLoadingState = {
    isLoading,
    loadingText: 'Loading...',
    showSpinner: true,
    showPulse: false,
    showShimmer: false
  };

  const baseProps: ButtonBaseProps = {
    onPress: handlePress,
    onLongPress: handleLongPress,
    disabled: isDisabled,
    loading: loadingState,
    config: {
      size: 'medium',
      enableHaptics: true,
      enablePressAnimation: true,
      enableHoverEffects: true,
      enableLoadingStates: true,
      animationDuration: 150,
      pressScale: 0.95,
      disabledOpacity: 0.5,
      minTouchTarget: 44
    },
    accessibilityLabel: 'Test Button Base',
    accessibilityRole: 'button',
    children: <Text style={styles.buttonText}>Test Button</Text>
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>ButtonBase Test Component</Text>
      <Text style={styles.subtitle}>Module 47 - Base Button Logic</Text>

      {/* Controls */}
      <View style={styles.controlsSection}>
        <Text style={styles.sectionTitle}>Controls</Text>

        <View style={styles.controlRow}>
          <Text style={styles.controlLabel}>Loading:</Text>
          <Switch value={isLoading} onValueChange={handleLoadingToggle} />
        </View>

        <View style={styles.controlRow}>
          <Text style={styles.controlLabel}>Disabled:</Text>
          <Switch value={isDisabled} onValueChange={setIsDisabled} />
        </View>
      </View>

      {/* Test Buttons */}
      <View style={styles.testSection}>
        <Text style={styles.sectionTitle}>Test Buttons</Text>

        <ButtonBase
          {...baseProps}
          containerStyle={styles.testButton}
          buttonStyle={styles.primaryButton}
        >
          <Text style={styles.buttonText}>Primary Button</Text>
        </ButtonBase>

        <ButtonBase
          {...baseProps}
          containerStyle={styles.testButton}
          buttonStyle={styles.secondaryButton}
        >
          <Text style={styles.buttonText}>Secondary Button</Text>
        </ButtonBase>

        <ButtonBase
          {...baseProps}
          containerStyle={styles.testButton}
          buttonStyle={styles.iconButton}
        >
          <Text style={styles.iconText}>⚡</Text>
        </ButtonBase>
      </View>

      {/* Status */}
      <View style={styles.statusSection}>
        <Text style={styles.sectionTitle}>Status</Text>
        <Text style={styles.statusText}>Loading: {isLoading ? 'Yes' : 'No'}</Text>
        <Text style={styles.statusText}>Disabled: {isDisabled ? 'Yes' : 'No'}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center'
  },
  controlsSection: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16
  },
  controlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  controlLabel: {
    fontSize: 16,
    color: '#333'
  },
  testSection: {
    marginBottom: 24
  },
  testButton: {
    marginBottom: 16
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  secondaryButton: {
    backgroundColor: '#34C759',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconButton: {
    backgroundColor: '#FF9500',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600'
  },
  iconText: {
    fontSize: 24,
    color: '#fff'
  },
  statusSection: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1
  },
  statusText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8
  }
});

export default ButtonBaseTest;
