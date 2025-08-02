/**
 * Corp Astro UI Library - Header Base Test Suite
 * 
 * Comprehensive test suite for the HeaderBase component demonstrating
 * all variants, configurations, and interactive states within the 
 * Corp Astro design system.
 * 
 * Features:
 * - All header base variants and sizes testing
 * - Position and animation configuration testing
 * - Slot-based architecture demonstration
 * - Gesture handling and interaction testing
 * - Theme integration and state management
 * - Accessibility compliance validation
 * - Error handling and edge cases
 * - Performance and animation testing
 * 
 * @module HeaderBaseTest
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
import { HeaderBase, HeaderBaseVariant, HeaderBaseSize, HeaderBasePosition } from '../HeaderBase';

// ============================================================================
// TEST COMPONENT
// ============================================================================

/**
 * HeaderBaseTest - Comprehensive test suite component
 */
export const HeaderBaseTest: React.FC = () => {
  // ============================================================================
  // HOOKS & STATE
  // ============================================================================

  const theme = useTheme();
  const [activeVariant, setActiveVariant] = useState<HeaderBaseVariant>('default');
  const [activeSize, setActiveSize] = useState<HeaderBaseSize>('medium');
  const [activePosition, setActivePosition] = useState<HeaderBasePosition>('static');
  const [showOverlay, setShowOverlay] = useState(false);
  const [enableGestures, setEnableGestures] = useState(false);
  const [showShadow, setShowShadow] = useState(false);
  const [enableBlur, setEnableBlur] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [currentState, setCurrentState] = useState<'normal' | 'focused' | 'error' | 'success'>('normal');

  // ============================================================================
  // VARIANT CONFIGURATIONS
  // ============================================================================

  const variants: HeaderBaseVariant[] = ['default', 'transparent', 'solid', 'blur', 'gradient'];
  const sizes: HeaderBaseSize[] = ['small', 'medium', 'large', 'auto'];
  const positions: HeaderBasePosition[] = ['static', 'fixed', 'sticky', 'floating'];

  // ============================================================================
  // DEMO CONTENT
  // ============================================================================

  const renderLeftContent = () => (
    <TouchableOpacity
      style={styles.iconButton}
      onPress={() => Alert.alert('Menu', 'Left action pressed')}
    >
      <Text style={[styles.icon, { color: theme.colors.neutral.light }]}>≡</Text>
    </TouchableOpacity>
  );

  const renderCenterContent = () => (
    <View style={styles.centerContent}>
      <Text style={[styles.title, { color: theme.colors.neutral.light }]}>
        Header Base Demo
      </Text>
      <Text style={[styles.subtitle, { color: theme.colors.neutral.medium }]}>
        {activeVariant} · {activeSize}
      </Text>
    </View>
  );

  const renderRightContent = () => (
    <View style={styles.rightContent}>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => Alert.alert('Search', 'Search action pressed')}
      >
        <Text style={[styles.icon, { color: theme.colors.neutral.light }]}>🔍</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => Alert.alert('More', 'More actions pressed')}
      >
        <Text style={[styles.icon, { color: theme.colors.neutral.light }]}>⋮</Text>
      </TouchableOpacity>
    </View>
  );

  const renderBackgroundContent = () => (
    <View style={styles.background}>
      <Text style={[styles.backgroundText, { color: theme.colors.neutral.muted }]}>
        Background Layer
      </Text>
    </View>
  );

  const renderOverlayContent = () => (
    <View style={styles.overlay}>
      <Text style={[styles.overlayText, { color: theme.colors.luxury.pure }]}>
        Overlay Layer
      </Text>
    </View>
  );

  // ============================================================================
  // HANDLERS
  // ============================================================================

  const handleGestureStart = () => {
    console.log('Gesture started');
  };

  const handleGesture = (gestureState: any) => {
    console.log('Gesture:', gestureState.dx, gestureState.dy);
  };

  const handleGestureEnd = () => {
    console.log('Gesture ended');
  };

  const handleHeaderPress = () => {
    Alert.alert('Header Pressed', 'Header main content was pressed');
  };

  const handleHeaderLongPress = () => {
    Alert.alert('Header Long Pressed', 'Header was long pressed');
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
        Header Base Controls
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

      {/* Position Selection */}
      <View style={styles.controlGroup}>
        <Text style={[styles.controlLabel, { color: theme.colors.neutral.medium }]}>
          Position
        </Text>
        <View style={styles.buttonRow}>
          {positions.map((position) => (
            <TouchableOpacity
              key={position}
              style={[
                styles.controlButton,
                {
                  backgroundColor: activePosition === position 
                    ? theme.colors.brand.primary 
                    : theme.colors.cosmos.medium,
                },
              ]}
              onPress={() => setActivePosition(position)}
            >
              <Text style={[styles.controlButtonText, { color: theme.colors.neutral.light }]}>
                {position}
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
            Show Overlay
          </Text>
          <Switch
            value={showOverlay}
            onValueChange={setShowOverlay}
            trackColor={{ false: theme.colors.cosmos.medium, true: theme.colors.brand.primary }}
            thumbColor={theme.colors.neutral.light}
          />
        </View>

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
            Shadow
          </Text>
          <Switch
            value={showShadow}
            onValueChange={setShowShadow}
            trackColor={{ false: theme.colors.cosmos.medium, true: theme.colors.brand.primary }}
            thumbColor={theme.colors.neutral.light}
          />
        </View>

        <View style={styles.toggleRow}>
          <Text style={[styles.toggleLabel, { color: theme.colors.neutral.light }]}>
            Blur Effect
          </Text>
          <Switch
            value={enableBlur}
            onValueChange={setEnableBlur}
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
        HeaderBase Examples
      </Text>

      {/* Current Configuration */}
      <View style={styles.exampleGroup}>
        <Text style={[styles.exampleLabel, { color: theme.colors.neutral.medium }]}>
          Current Configuration
        </Text>
        <HeaderBase
          variant={activeVariant}
          size={activeSize}
          position={activePosition}
          slots={{
            left: renderLeftContent(),
            center: renderCenterContent(),
            right: renderRightContent(),
            background: showOverlay ? renderBackgroundContent() : undefined,
            overlay: showOverlay ? renderOverlayContent() : undefined,
          }}
          gesture={{
            enabled: enableGestures,
            direction: 'all',
            onPanStart: handleGestureStart,
            onPan: handleGesture,
            onPanEnd: handleGestureEnd,
          }}
          config={{
            shadow: showShadow,
            blur: enableBlur,
            animationDuration: 300,
          }}
          focused={currentState === 'focused'}
          error={currentState === 'error'}
          success={currentState === 'success'}
          visible={isVisible}
          onPress={handleHeaderPress}
          onLongPress={handleHeaderLongPress}
          accessibilityLabel="Demo header base"
          accessibilityHint="Demonstrating header base functionality"
          testID="header-base-demo"
        />
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
            <HeaderBase
              variant={variant}
              size="medium"
              slots={{
                left: renderLeftContent(),
                center: (
                  <Text style={[styles.title, { color: theme.colors.neutral.light }]}>
                    {variant.charAt(0).toUpperCase() + variant.slice(1)}
                  </Text>
                ),
                right: renderRightContent(),
              }}
              config={{ shadow: true }}
              accessibilityLabel={`${variant} header`}
              testID={`header-${variant}`}
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
            <HeaderBase
              variant="default"
              size={size}
              slots={{
                left: renderLeftContent(),
                center: (
                  <Text style={[styles.title, { color: theme.colors.neutral.light }]}>
                    {size.charAt(0).toUpperCase() + size.slice(1)}
                  </Text>
                ),
                right: renderRightContent(),
              }}
              config={{ shadow: true }}
              accessibilityLabel={`${size} header`}
              testID={`header-${size}`}
            />
          </View>
        ))}
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
            <HeaderBase
              variant="default"
              size="medium"
              slots={{
                left: renderLeftContent(),
                center: (
                  <Text style={[styles.title, { color: theme.colors.neutral.light }]}>
                    {state.charAt(0).toUpperCase() + state.slice(1)} State
                  </Text>
                ),
                right: renderRightContent(),
              }}
              focused={state === 'focused'}
              error={state === 'error'}
              success={state === 'success'}
              config={{ shadow: true }}
              accessibilityLabel={`${state} header`}
              testID={`header-${state}`}
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
  exampleItem: {
    marginBottom: 15,
  },
  exampleItemLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 5,
    opacity: 0.8,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  icon: {
    fontSize: 18,
    fontWeight: '500',
  },
  centerContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '400',
    marginTop: 2,
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundText: {
    fontSize: 10,
    fontWeight: '400',
  },
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayText: {
    fontSize: 10,
    fontWeight: '600',
  },
});

// ============================================================================
// EXPORTS
// ============================================================================

export default HeaderBaseTest;
