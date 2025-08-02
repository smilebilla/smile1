/**
 * Corp Astro UI Library - Status Bar Blur Component Test
 * 
 * Comprehensive test suite for the StatusBarBlur component demonstrating
 * all features, variants, and functionality. This test component validates
 * the proper implementation of blur effects, scroll responsiveness, and theming.
 * 
 * @module StatusBarBlurTest
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
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { StatusBarBlur, createBlurScrollHandler } from '../StatusBarBlur';
import type { 
  StatusBarBlurVariant, 
  StatusBarBlurIntensity, 
  StatusBarBlurAnimation 
} from '../StatusBarBlur';

// ============================================================================
// TEST COMPONENT
// ============================================================================

/**
 * StatusBarBlur Test Suite
 * 
 * Comprehensive test component showcasing all StatusBarBlur features.
 * Demonstrates variants, animations, scroll responsiveness, and interactive behavior.
 */
export const StatusBarBlurTest: React.FC = () => {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================

  const [currentVariant, setCurrentVariant] = useState<StatusBarBlurVariant>('scroll');
  const [currentIntensity, setCurrentIntensity] = useState<StatusBarBlurIntensity>('medium');
  const [currentAnimation, setCurrentAnimation] = useState<StatusBarBlurAnimation>('fade');
  const [isAnimated, setIsAnimated] = useState(true);
  const [isAbsolute, setIsAbsolute] = useState(true);
  const [safeArea, setSafeArea] = useState(true);
  const [height, setHeight] = useState(44);
  const [opacity, setOpacity] = useState(1);
  const [scrollThreshold, setScrollThreshold] = useState(50);
  const [animationDuration, setAnimationDuration] = useState(300);
  const [blurRadius, setBlurRadius] = useState(20);
  const [scrollY, setScrollY] = useState(0);
  const [isBlurred, setIsBlurred] = useState(false);

  // ============================================================================
  // REFS
  // ============================================================================

  const scrollViewRef = useRef<ScrollView>(null);

  // ============================================================================
  // VARIANTS CONFIGURATION
  // ============================================================================

  const variants: StatusBarBlurVariant[] = ['static', 'scroll', 'dynamic', 'none'];
  const intensities: StatusBarBlurIntensity[] = ['light', 'medium', 'strong', 'ultra'];
  const animations: StatusBarBlurAnimation[] = ['fade', 'slide', 'scale', 'none'];

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  const handleVariantChange = (variant: StatusBarBlurVariant) => {
    setCurrentVariant(variant);
    Alert.alert('Blur Variant Changed', `Changed to: ${variant}`);
  };

  const handleIntensityChange = (intensity: StatusBarBlurIntensity) => {
    setCurrentIntensity(intensity);
    Alert.alert('Blur Intensity Changed', `Changed to: ${intensity}`);
  };

  const handleAnimationChange = (animation: StatusBarBlurAnimation) => {
    setCurrentAnimation(animation);
    Alert.alert('Blur Animation Changed', `Changed to: ${animation}`);
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    setScrollY(currentScrollY);
  };

  const handleBlurChange = (blurred: boolean) => {
    setIsBlurred(blurred);
  };

  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  const scrollToMiddle = () => {
    scrollViewRef.current?.scrollTo({ y: 300, animated: true });
  };

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
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

  const renderIntensityButtons = () => (
    <View style={styles.buttonGroup}>
      <Text style={styles.sectionTitle}>Intensity</Text>
      <View style={styles.buttonRow}>
        {intensities.map((intensity) => (
          <TouchableOpacity
            key={intensity}
            style={[
              styles.button,
              currentIntensity === intensity && styles.buttonActive,
            ]}
            onPress={() => handleIntensityChange(intensity)}
          >
            <Text style={[
              styles.buttonText,
              currentIntensity === intensity && styles.buttonTextActive,
            ]}>
              {intensity}
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
        <Text style={styles.controlLabel}>Absolute Positioning</Text>
        <Switch
          value={isAbsolute}
          onValueChange={setIsAbsolute}
          trackColor={{ false: '#767577', true: '#2E86DE' }}
          thumbColor={isAbsolute ? '#54A0FF' : '#f4f3f4'}
        />
      </View>

      <View style={styles.controlRow}>
        <Text style={styles.controlLabel}>Safe Area</Text>
        <Switch
          value={safeArea}
          onValueChange={setSafeArea}
          trackColor={{ false: '#767577', true: '#2E86DE' }}
          thumbColor={safeArea ? '#54A0FF' : '#f4f3f4'}
        />
      </View>

      <View style={styles.controlRow}>
        <Text style={styles.controlLabel}>Height: {height}px</Text>
        <View style={styles.durationButtons}>
          {[24, 44, 60, 80].map((h) => (
            <TouchableOpacity
              key={h}
              style={[
                styles.durationButton,
                height === h && styles.durationButtonActive,
              ]}
              onPress={() => setHeight(h)}
            >
              <Text style={[
                styles.durationButtonText,
                height === h && styles.durationButtonTextActive,
              ]}>
                {h}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.controlRow}>
        <Text style={styles.controlLabel}>Scroll Threshold: {scrollThreshold}px</Text>
        <View style={styles.durationButtons}>
          {[25, 50, 100, 150].map((threshold) => (
            <TouchableOpacity
              key={threshold}
              style={[
                styles.durationButton,
                scrollThreshold === threshold && styles.durationButtonActive,
              ]}
              onPress={() => setScrollThreshold(threshold)}
            >
              <Text style={[
                styles.durationButtonText,
                scrollThreshold === threshold && styles.durationButtonTextActive,
              ]}>
                {threshold}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.controlRow}>
        <Text style={styles.controlLabel}>Blur Radius: {blurRadius}px</Text>
        <View style={styles.durationButtons}>
          {[10, 20, 30, 40].map((radius) => (
            <TouchableOpacity
              key={radius}
              style={[
                styles.durationButton,
                blurRadius === radius && styles.durationButtonActive,
              ]}
              onPress={() => setBlurRadius(radius)}
            >
              <Text style={[
                styles.durationButtonText,
                blurRadius === radius && styles.durationButtonTextActive,
              ]}>
                {radius}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  const renderScrollControls = () => (
    <View style={styles.scrollControlsSection}>
      <Text style={styles.sectionTitle}>Scroll Controls</Text>
      <View style={styles.scrollButtonsRow}>
        <TouchableOpacity style={styles.scrollButton} onPress={scrollToTop}>
          <Text style={styles.scrollButtonText}>Top</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.scrollButton} onPress={scrollToMiddle}>
          <Text style={styles.scrollButtonText}>Middle</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.scrollButton} onPress={scrollToBottom}>
          <Text style={styles.scrollButtonText}>Bottom</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderStatusSection = () => (
    <View style={styles.statusSection}>
      <Text style={styles.sectionTitle}>Status</Text>
      <View style={styles.statusDetails}>
        <Text style={styles.statusText}>Scroll Y: {scrollY.toFixed(0)}px</Text>
        <Text style={styles.statusText}>Threshold: {scrollThreshold}px</Text>
        <Text style={styles.statusText}>Blur State: {isBlurred ? 'Active' : 'Inactive'}</Text>
        <Text style={styles.statusText}>
          Blur Trigger: {scrollY > scrollThreshold ? 'Yes' : 'No'}
        </Text>
      </View>
    </View>
  );

  const renderCurrentConfigSection = () => (
    <View style={styles.configSection}>
      <Text style={styles.sectionTitle}>Current Configuration</Text>
      <View style={styles.configDetails}>
        <Text style={styles.configText}>Variant: {currentVariant}</Text>
        <Text style={styles.configText}>Intensity: {currentIntensity}</Text>
        <Text style={styles.configText}>Animation: {currentAnimation}</Text>
        <Text style={styles.configText}>Height: {height}px</Text>
        <Text style={styles.configText}>Opacity: {opacity.toFixed(2)}</Text>
        <Text style={styles.configText}>Scroll Threshold: {scrollThreshold}px</Text>
        <Text style={styles.configText}>Blur Radius: {blurRadius}px</Text>
        <Text style={styles.configText}>Duration: {animationDuration}ms</Text>
        <Text style={styles.configText}>Animated: {isAnimated ? 'Yes' : 'No'}</Text>
        <Text style={styles.configText}>Absolute: {isAbsolute ? 'Yes' : 'No'}</Text>
        <Text style={styles.configText}>Safe Area: {safeArea ? 'Yes' : 'No'}</Text>
      </View>
    </View>
  );

  // ============================================================================
  // DEMO CONTENT
  // ============================================================================

  const renderDemoContent = () => (
    <View style={styles.demoContent}>
      {Array.from({ length: 50 }, (_, index) => (
        <View key={index} style={styles.demoItem}>
          <Text style={styles.demoItemText}>
            Demo Content Item {index + 1}
          </Text>
          <Text style={styles.demoItemSubtext}>
            {index < 5 ? 'Scroll down to see blur effect' : 
             index === 25 ? 'Middle of content' : 
             'Demo content for testing scroll blur'}
          </Text>
        </View>
      ))}
    </View>
  );

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  return (
    <SafeAreaView style={styles.container}>
      <StatusBarBlur
        variant={currentVariant}
        intensity={currentIntensity}
        animation={currentAnimation}
        height={height}
        opacity={opacity}
        scrollThreshold={scrollThreshold}
        blurRadius={blurRadius}
        animationDuration={animationDuration}
        animated={isAnimated}
        absolute={isAbsolute}
        safeArea={safeArea}
        onBlurChange={handleBlurChange}
        testID="status-bar-blur-test"
      />
      
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View style={styles.header}>
          <Text style={styles.title}>StatusBarBlur Test</Text>
          <Text style={styles.subtitle}>
            Test all variants, intensities, and animations for status bar blur effects
          </Text>
        </View>

        {renderVariantButtons()}
        {renderIntensityButtons()}
        {renderAnimationButtons()}
        {renderControlsSection()}
        {renderScrollControls()}
        {renderStatusSection()}
        {renderCurrentConfigSection()}

        <View style={styles.usageSection}>
          <Text style={styles.sectionTitle}>Usage Examples</Text>
          
          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTitle}>Basic Scroll Blur</Text>
            <View style={styles.codeBlock}>
              <Text style={styles.codeText}>
                {`<StatusBarBlur variant="scroll" />`}
              </Text>
            </View>
          </View>

          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTitle}>Custom Intensity</Text>
            <View style={styles.codeBlock}>
              <Text style={styles.codeText}>
                {`<StatusBarBlur 
  variant="scroll"
  intensity="strong"
  scrollThreshold={50}
/>`}
              </Text>
            </View>
          </View>

          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTitle}>With Animation</Text>
            <View style={styles.codeBlock}>
              <Text style={styles.codeText}>
                {`<StatusBarBlur 
  variant="dynamic"
  animation="fade"
  animationDuration={300}
  onBlurChange={(blurred) => console.log(blurred)}
/>`}
              </Text>
            </View>
          </View>

          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTitle}>Custom Blur Radius</Text>
            <View style={styles.codeBlock}>
              <Text style={styles.codeText}>
                {`<StatusBarBlur 
  variant="static"
  blurRadius={30}
  backgroundColor="rgba(8,8,15,0.9)"
/>`}
              </Text>
            </View>
          </View>
        </View>

        {renderDemoContent()}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Corp Astro UI Library - Status Bar Blur Component
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
    marginTop: 44, // Account for status bar blur
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
    flex: 1,
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
  scrollControlsSection: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  scrollButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 12,
  },
  scrollButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(46,134,222,0.3)',
    borderWidth: 1,
    borderColor: '#2E86DE',
    alignItems: 'center',
  },
  scrollButtonText: {
    fontSize: 16,
    color: '#54A0FF',
    fontWeight: '600',
  },
  statusSection: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  statusDetails: {
    backgroundColor: 'rgba(22,33,62,0.3)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(46,134,222,0.2)',
  },
  statusText: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 4,
    fontFamily: 'Menlo',
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
  demoContent: {
    padding: 24,
  },
  demoItem: {
    backgroundColor: 'rgba(22,33,62,0.2)',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(46,134,222,0.2)',
    marginBottom: 16,
  },
  demoItemText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  demoItemSubtext: {
    fontSize: 14,
    color: '#B8B8C0',
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

export default StatusBarBlurTest;
