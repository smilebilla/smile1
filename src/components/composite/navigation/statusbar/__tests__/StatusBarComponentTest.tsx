/**
 * Corp Astro UI Library - Status Bar Component Test
 * 
 * Comprehensive test suite for the StatusBarComponent demonstrating all features,
 * variants, and functionality. This test component validates the proper implementation
 * of status bar styling, theming, and responsive behavior.
 * 
 * @module StatusBarComponentTest
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
  SafeAreaView,
  Switch,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { StatusBarComponent } from '../StatusBarComponent';
import type { StatusBarVariant, StatusBarTheme, StatusBarAnimation } from '../StatusBarComponent';

// ============================================================================
// TEST COMPONENT
// ============================================================================

/**
 * StatusBarComponent Test Suite
 * 
 * Comprehensive test component showcasing all StatusBarComponent features.
 * Demonstrates variants, animations, theming, and interactive behavior.
 */
export const StatusBarComponentTest: React.FC = () => {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================

  const [currentVariant, setCurrentVariant] = useState<StatusBarVariant>('default');
  const [currentTheme, setCurrentTheme] = useState<StatusBarTheme>('auto');
  const [currentAnimation, setCurrentAnimation] = useState<StatusBarAnimation>('fade');
  const [isAnimated, setIsAnimated] = useState(true);
  const [isHidden, setIsHidden] = useState(false);
  const [isImmersive, setIsImmersive] = useState(false);
  const [animationDuration, setAnimationDuration] = useState(300);

  // ============================================================================
  // VARIANTS CONFIGURATION
  // ============================================================================

  const variants: StatusBarVariant[] = ['default', 'light-content', 'dark-content', 'transparent'];
  const themes: StatusBarTheme[] = ['dark', 'light', 'auto'];
  const animations: StatusBarAnimation[] = ['fade', 'slide', 'none'];

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  const handleVariantChange = (variant: StatusBarVariant) => {
    setCurrentVariant(variant);
    Alert.alert('Status Bar Variant Changed', `Changed to: ${variant}`);
  };

  const handleThemeChange = (theme: StatusBarTheme) => {
    setCurrentTheme(theme);
    Alert.alert('Status Bar Theme Changed', `Changed to: ${theme}`);
  };

  const handleAnimationChange = (animation: StatusBarAnimation) => {
    setCurrentAnimation(animation);
    Alert.alert('Status Bar Animation Changed', `Changed to: ${animation}`);
  };

  // ============================================================================
  // RENDER HELPERS
  // ============================================================================

  const renderVariantButtons = () => (
    <View style={styles.buttonGroup}>
      <Text style={styles.sectionTitle}>Variants</Text>
      <View style={styles.buttonRow}>
        {variants.map((variant) => (
          <TouchableOpacity
            key={variant}
            style={[
              styles.button,
              currentVariant === variant && styles.buttonActive,
            ]}
            onPress={() => handleVariantChange(variant)}
          >
            <Text style={[
              styles.buttonText,
              currentVariant === variant && styles.buttonTextActive,
            ]}>
              {variant}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderThemeButtons = () => (
    <View style={styles.buttonGroup}>
      <Text style={styles.sectionTitle}>Themes</Text>
      <View style={styles.buttonRow}>
        {themes.map((theme) => (
          <TouchableOpacity
            key={theme}
            style={[
              styles.button,
              currentTheme === theme && styles.buttonActive,
            ]}
            onPress={() => handleThemeChange(theme)}
          >
            <Text style={[
              styles.buttonText,
              currentTheme === theme && styles.buttonTextActive,
            ]}>
              {theme}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderAnimationButtons = () => (
    <View style={styles.buttonGroup}>
      <Text style={styles.sectionTitle}>Animations</Text>
      <View style={styles.buttonRow}>
        {animations.map((animation) => (
          <TouchableOpacity
            key={animation}
            style={[
              styles.button,
              currentAnimation === animation && styles.buttonActive,
            ]}
            onPress={() => handleAnimationChange(animation)}
          >
            <Text style={[
              styles.buttonText,
              currentAnimation === animation && styles.buttonTextActive,
            ]}>
              {animation}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderControlsSection = () => (
    <View style={styles.controlsSection}>
      <Text style={styles.sectionTitle}>Controls</Text>
      
      <View style={styles.controlRow}>
        <Text style={styles.controlLabel}>Animated</Text>
        <Switch
          value={isAnimated}
          onValueChange={setIsAnimated}
          trackColor={{ false: '#767577', true: '#2E86DE' }}
          thumbColor={isAnimated ? '#54A0FF' : '#f4f3f4'}
        />
      </View>

      <View style={styles.controlRow}>
        <Text style={styles.controlLabel}>Hidden</Text>
        <Switch
          value={isHidden}
          onValueChange={setIsHidden}
          trackColor={{ false: '#767577', true: '#2E86DE' }}
          thumbColor={isHidden ? '#54A0FF' : '#f4f3f4'}
        />
      </View>

      <View style={styles.controlRow}>
        <Text style={styles.controlLabel}>Immersive</Text>
        <Switch
          value={isImmersive}
          onValueChange={setIsImmersive}
          trackColor={{ false: '#767577', true: '#2E86DE' }}
          thumbColor={isImmersive ? '#54A0FF' : '#f4f3f4'}
        />
      </View>

      <View style={styles.controlRow}>
        <Text style={styles.controlLabel}>Animation Duration: {animationDuration}ms</Text>
        <View style={styles.durationButtons}>
          {[200, 300, 500, 1000].map((duration) => (
            <TouchableOpacity
              key={duration}
              style={[
                styles.durationButton,
                animationDuration === duration && styles.durationButtonActive,
              ]}
              onPress={() => setAnimationDuration(duration)}
            >
              <Text style={[
                styles.durationButtonText,
                animationDuration === duration && styles.durationButtonTextActive,
              ]}>
                {duration}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  const renderCurrentConfigSection = () => (
    <View style={styles.configSection}>
      <Text style={styles.sectionTitle}>Current Configuration</Text>
      <View style={styles.configDetails}>
        <Text style={styles.configText}>Variant: {currentVariant}</Text>
        <Text style={styles.configText}>Theme: {currentTheme}</Text>
        <Text style={styles.configText}>Animation: {currentAnimation}</Text>
        <Text style={styles.configText}>Duration: {animationDuration}ms</Text>
        <Text style={styles.configText}>Animated: {isAnimated ? 'Yes' : 'No'}</Text>
        <Text style={styles.configText}>Hidden: {isHidden ? 'Yes' : 'No'}</Text>
        <Text style={styles.configText}>Immersive: {isImmersive ? 'Yes' : 'No'}</Text>
      </View>
    </View>
  );

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  return (
    <SafeAreaView style={styles.container}>
      <StatusBarComponent
        variant={currentVariant}
        theme={currentTheme}
        animation={currentAnimation}
        animationDuration={animationDuration}
        animated={isAnimated}
        hidden={isHidden}
        immersive={isImmersive}
        testID="status-bar-test"
      />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>StatusBarComponent Test</Text>
          <Text style={styles.subtitle}>
            Test all variants, themes, and animations for the Corp Astro status bar
          </Text>
        </View>

        {renderVariantButtons()}
        {renderThemeButtons()}
        {renderAnimationButtons()}
        {renderControlsSection()}
        {renderCurrentConfigSection()}

        <View style={styles.usageSection}>
          <Text style={styles.sectionTitle}>Usage Examples</Text>
          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTitle}>Basic Usage</Text>
            <View style={styles.codeBlock}>
              <Text style={styles.codeText}>
                {`<StatusBarComponent variant="light-content" />`}
              </Text>
            </View>
          </View>

          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTitle}>With Animation</Text>
            <View style={styles.codeBlock}>
              <Text style={styles.codeText}>
                {`<StatusBarComponent 
  variant="transparent"
  theme="dark"
  animation="fade"
  animationDuration={300}
/>`}
              </Text>
            </View>
          </View>

          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTitle}>Custom Background</Text>
            <View style={styles.codeBlock}>
              <Text style={styles.codeText}>
                {`<StatusBarComponent 
  backgroundColor="rgba(8,8,15,0.95)"
  barStyle="light-content"
/>`}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Corp Astro UI Library - Status Bar Component
          </Text>
        </View>
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
    backgroundColor: '#08080F',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(46,134,222,0.2)',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#B8B8C0',
    textAlign: 'center',
    lineHeight: 20,
  },
  buttonGroup: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: 'rgba(22,33,62,0.3)',
    borderWidth: 1,
    borderColor: 'rgba(46,134,222,0.2)',
  },
  buttonActive: {
    backgroundColor: 'rgba(46,134,222,0.3)',
    borderColor: '#2E86DE',
  },
  buttonText: {
    fontSize: 14,
    color: '#B8B8C0',
    fontWeight: '500',
  },
  buttonTextActive: {
    color: '#54A0FF',
  },
  controlsSection: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  controlLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  durationButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  durationButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: 'rgba(22,33,62,0.3)',
    borderWidth: 1,
    borderColor: 'rgba(46,134,222,0.2)',
  },
  durationButtonActive: {
    backgroundColor: 'rgba(46,134,222,0.3)',
    borderColor: '#2E86DE',
  },
  durationButtonText: {
    fontSize: 12,
    color: '#B8B8C0',
  },
  durationButtonTextActive: {
    color: '#54A0FF',
  },
  configSection: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  configDetails: {
    backgroundColor: 'rgba(22,33,62,0.3)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(46,134,222,0.2)',
  },
  configText: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 4,
    fontFamily: 'Menlo',
  },
  usageSection: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  exampleContainer: {
    marginBottom: 20,
  },
  exampleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#54A0FF',
    marginBottom: 8,
  },
  codeBlock: {
    backgroundColor: 'rgba(15,15,26,0.8)',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(46,134,222,0.2)',
  },
  codeText: {
    fontSize: 14,
    color: '#B8B8C0',
    fontFamily: 'Menlo',
    lineHeight: 20,
  },
  footer: {
    padding: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#6C757D',
    textAlign: 'center',
  },
});

// ============================================================================
// EXPORTS
// ============================================================================

export default StatusBarComponentTest;
