/**
 * Corp Astro UI Library - Status Bar Overlay Component Test
 * 
 * Comprehensive test suite for the StatusBarOverlay component demonstrating
 * all features, variants, and functionality. This test component validates
 * the proper implementation of gradient overlays, animations, and theming.
 * 
 * @module StatusBarOverlayTest
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
import { StatusBarOverlay } from '../StatusBarOverlay';
import type { 
  StatusBarOverlayVariant, 
  StatusBarOverlayPosition, 
  StatusBarOverlayAnimation 
} from '../StatusBarOverlay';

// ============================================================================
// TEST COMPONENT
// ============================================================================

/**
 * StatusBarOverlay Test Suite
 * 
 * Comprehensive test component showcasing all StatusBarOverlay features.
 * Demonstrates variants, animations, positioning, and interactive behavior.
 */
export const StatusBarOverlayTest: React.FC = () => {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================

  const [currentVariant, setCurrentVariant] = useState<StatusBarOverlayVariant>('gradient');
  const [currentPosition, setCurrentPosition] = useState<StatusBarOverlayPosition>('top');
  const [currentAnimation, setCurrentAnimation] = useState<StatusBarOverlayAnimation>('fade');
  const [isAnimated, setIsAnimated] = useState(true);
  const [isAbsolute, setIsAbsolute] = useState(true);
  const [safeArea, setSafeArea] = useState(true);
  const [height, setHeight] = useState(44);
  const [opacity, setOpacity] = useState(1);
  const [animationDuration, setAnimationDuration] = useState(300);
  const [zIndex, setZIndex] = useState(1000);

  // ============================================================================
  // VARIANTS CONFIGURATION
  // ============================================================================

  const variants: StatusBarOverlayVariant[] = ['fade', 'gradient', 'blur', 'solid', 'none'];
  const positions: StatusBarOverlayPosition[] = ['top', 'bottom', 'both'];
  const animations: StatusBarOverlayAnimation[] = ['fade', 'slide', 'scale', 'none'];

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  const handleVariantChange = (variant: StatusBarOverlayVariant) => {
    setCurrentVariant(variant);
    Alert.alert('Overlay Variant Changed', `Changed to: ${variant}`);
  };

  const handlePositionChange = (position: StatusBarOverlayPosition) => {
    setCurrentPosition(position);
    Alert.alert('Overlay Position Changed', `Changed to: ${position}`);
  };

  const handleAnimationChange = (animation: StatusBarOverlayAnimation) => {
    setCurrentAnimation(animation);
    Alert.alert('Overlay Animation Changed', `Changed to: ${animation}`);
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

  const renderPositionButtons = () => (
    <View style={styles.buttonGroup}>
      <Text style={styles.sectionTitle}>Positions</Text>
      <View style={styles.buttonRow}>
        {positions.map((position) => (
          <TouchableOpacity
            key={position}
            style={[
              styles.button,
              currentPosition === position && styles.buttonActive,
            ]}
            onPress={() => handlePositionChange(position)}
          >
            <Text style={[
              styles.buttonText,
              currentPosition === position && styles.buttonTextActive,
            ]}>
              {position}
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
          {[24, 44, 60, 80, 100].map((h) => (
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
        <Text style={styles.controlLabel}>Opacity: {opacity.toFixed(1)}</Text>
        <View style={styles.durationButtons}>
          {[0.3, 0.5, 0.7, 1.0].map((o) => (
            <TouchableOpacity
              key={o}
              style={[
                styles.durationButton,
                opacity === o && styles.durationButtonActive,
              ]}
              onPress={() => setOpacity(o)}
            >
              <Text style={[
                styles.durationButtonText,
                opacity === o && styles.durationButtonTextActive,
              ]}>
                {o.toFixed(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.controlRow}>
        <Text style={styles.controlLabel}>Duration: {animationDuration}ms</Text>
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
        <Text style={styles.configText}>Position: {currentPosition}</Text>
        <Text style={styles.configText}>Animation: {currentAnimation}</Text>
        <Text style={styles.configText}>Height: {height}px</Text>
        <Text style={styles.configText}>Opacity: {opacity.toFixed(2)}</Text>
        <Text style={styles.configText}>Duration: {animationDuration}ms</Text>
        <Text style={styles.configText}>Animated: {isAnimated ? 'Yes' : 'No'}</Text>
        <Text style={styles.configText}>Absolute: {isAbsolute ? 'Yes' : 'No'}</Text>
        <Text style={styles.configText}>Safe Area: {safeArea ? 'Yes' : 'No'}</Text>
        <Text style={styles.configText}>Z-Index: {zIndex}</Text>
      </View>
    </View>
  );

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  return (
    <SafeAreaView style={styles.container}>
      <StatusBarOverlay
        variant={currentVariant}
        position={currentPosition}
        animation={currentAnimation}
        height={height}
        opacity={opacity}
        animationDuration={animationDuration}
        animated={isAnimated}
        absolute={isAbsolute}
        safeArea={safeArea}
        zIndex={zIndex}
        testID="status-bar-overlay-test"
      />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>StatusBarOverlay Test</Text>
          <Text style={styles.subtitle}>
            Test all variants, positions, and animations for status bar overlays
          </Text>
        </View>

        {renderVariantButtons()}
        {renderPositionButtons()}
        {renderAnimationButtons()}
        {renderControlsSection()}
        {renderCurrentConfigSection()}

        <View style={styles.usageSection}>
          <Text style={styles.sectionTitle}>Usage Examples</Text>
          
          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTitle}>Basic Gradient Overlay</Text>
            <View style={styles.codeBlock}>
              <Text style={styles.codeText}>
                {`<StatusBarOverlay variant="gradient" />`}
              </Text>
            </View>
          </View>

          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTitle}>Custom Colors</Text>
            <View style={styles.codeBlock}>
              <Text style={styles.codeText}>
                {`<StatusBarOverlay 
  variant="gradient"
  colors={['transparent', 'rgba(8,8,15,0.8)']}
  height={44}
/>`}
              </Text>
            </View>
          </View>

          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTitle}>With Animation</Text>
            <View style={styles.codeBlock}>
              <Text style={styles.codeText}>
                {`<StatusBarOverlay 
  variant="fade"
  animation="slide"
  animationDuration={300}
  position="top"
/>`}
              </Text>
            </View>
          </View>

          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTitle}>Bottom Overlay</Text>
            <View style={styles.codeBlock}>
              <Text style={styles.codeText}>
                {`<StatusBarOverlay 
  variant="blur"
  position="bottom"
  opacity={0.8}
/>`}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.previewSection}>
          <Text style={styles.sectionTitle}>Visual Preview</Text>
          <View style={styles.previewContainer}>
            <View style={styles.previewBox}>
              <Text style={styles.previewText}>
                Content Area
              </Text>
              <Text style={styles.previewSubtext}>
                The overlay appears {currentPosition === 'top' ? 'above' : 
                currentPosition === 'bottom' ? 'below' : 'above and below'} this content
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Corp Astro UI Library - Status Bar Overlay Component
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
    marginTop: 44, // Account for status bar overlay
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
  previewSection: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  previewContainer: {
    backgroundColor: 'rgba(22,33,62,0.2)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(46,134,222,0.2)',
    overflow: 'hidden',
  },
  previewBox: {
    padding: 40,
    alignItems: 'center',
    minHeight: 200,
    justifyContent: 'center',
  },
  previewText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  previewSubtext: {
    fontSize: 14,
    color: '#B8B8C0',
    textAlign: 'center',
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

export default StatusBarOverlayTest;
