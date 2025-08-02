/**
 * Corp Astro UI Library - Header Overlay Component Test
 * 
 * Comprehensive test suite for the HeaderOverlay component demonstrating
 * all features, variants, and functionality. This test component validates
 * the proper implementation of header overlays, animations, and theming.
 * 
 * @module HeaderOverlayTest
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
  Dimensions,
  Button,
} from 'react-native';
import { HeaderOverlay } from '../HeaderOverlay';
import type { 
  HeaderOverlayVariant, 
  HeaderOverlayPosition, 
  HeaderOverlayAnimation,
  HeaderOverlayTrigger,
  HeaderOverlayBackdrop,
} from '../HeaderOverlay';

// ============================================================================
// TEST COMPONENT
// ============================================================================

/**
 * HeaderOverlay Test Suite
 * 
 * Comprehensive test component showcasing all HeaderOverlay features.
 * Demonstrates variants, animations, positions, and interactive behavior.
 */
export const HeaderOverlayTest: React.FC = () => {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================

  const [currentVariant, setCurrentVariant] = useState<HeaderOverlayVariant>('default');
  const [currentPosition, setCurrentPosition] = useState<HeaderOverlayPosition>('top');
  const [currentAnimation, setCurrentAnimation] = useState<HeaderOverlayAnimation>('fade');
  const [currentTrigger, setCurrentTrigger] = useState<HeaderOverlayTrigger>('manual');
  const [isVisible, setIsVisible] = useState(false);
  const [overlayHeight, setOverlayHeight] = useState(200);
  const [overlayWidth, setOverlayWidth] = useState('100%');
  const [scrollThreshold, setScrollThreshold] = useState(100);
  const [autoHide, setAutoHide] = useState(false);
  const [autoHideDuration, setAutoHideDuration] = useState(3000);
  const [enableBackdrop, setEnableBackdrop] = useState(false);
  const [enableShadow, setEnableShadow] = useState(true);
  const [enableAnimations, setEnableAnimations] = useState(true);
  const [enableSafeArea, setEnableSafeArea] = useState(true);
  const [borderWidth, setBorderWidth] = useState(1);
  const [borderRadius, setBorderRadius] = useState(12);
  const [animationDuration, setAnimationDuration] = useState(300);
  const [scrollPosition, setScrollPosition] = useState(0);

  const scrollViewRef = useRef<ScrollView>(null);

  // ============================================================================
  // MOCK DATA
  // ============================================================================

  const mockContent = (
    <View style={styles.mockContent}>
      <Text style={styles.mockTitle}>Overlay Content</Text>
      <Text style={styles.mockDescription}>
        This is the overlay content that appears when the header overlay is visible.
        It can contain any React Native components.
      </Text>
      <TouchableOpacity style={styles.mockButton} onPress={() => Alert.alert('Button', 'Overlay button pressed')}>
        <Text style={styles.mockButtonText}>Action Button</Text>
      </TouchableOpacity>
    </View>
  );

  const mockHeader = (
    <View style={styles.mockHeader}>
      <Text style={styles.mockHeaderText}>Header Component</Text>
    </View>
  );

  const mockBackdrop: HeaderOverlayBackdrop = {
    color: 'rgba(0, 0, 0, 0.7)',
    opacity: 0.8,
    blurRadius: 10,
    dismissible: true,
    animationDuration: 300,
  };

  // ============================================================================
  // VARIANT OPTIONS
  // ============================================================================

  const variants: HeaderOverlayVariant[] = ['default', 'blur', 'gradient', 'solid', 'transparent'];
  const positions: HeaderOverlayPosition[] = ['top', 'bottom', 'floating', 'sticky', 'fixed'];
  const animations: HeaderOverlayAnimation[] = ['fade', 'slide', 'scale', 'blur', 'none'];
  const triggers: HeaderOverlayTrigger[] = ['manual', 'scroll', 'timer', 'hover', 'focus'];

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  const handleShow = () => {
    console.log('Header overlay shown');
    setIsVisible(true);
  };

  const handleHide = () => {
    console.log('Header overlay hidden');
    setIsVisible(false);
  };

  const handlePress = () => {
    Alert.alert('Overlay Pressed', 'Header overlay was pressed');
  };

  const handleBackdropPress = () => {
    Alert.alert('Backdrop Pressed', 'Backdrop was pressed');
  };

  const handleScroll = (event: { nativeEvent: { contentOffset: { y: number } } }) => {
    const { y } = event.nativeEvent.contentOffset;
    setScrollPosition(y);
  };

  const simulateScroll = (targetY: number) => {
    scrollViewRef.current?.scrollTo({ y: targetY, animated: true });
  };

  // ============================================================================
  // RENDER HELPERS
  // ============================================================================

  const renderVariantSelector = () => (
    <View style={styles.selectorContainer}>
      <Text style={styles.selectorLabel}>Variant:</Text>
      <View style={styles.selectorOptions}>
        {variants.map((variant) => (
          <TouchableOpacity
            key={variant}
            style={[
              styles.selectorOption,
              currentVariant === variant && styles.selectorOptionActive,
            ]}
            onPress={() => setCurrentVariant(variant)}
          >
            <Text
              style={[
                styles.selectorOptionText,
                currentVariant === variant && styles.selectorOptionTextActive,
              ]}
            >
              {variant}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderPositionSelector = () => (
    <View style={styles.selectorContainer}>
      <Text style={styles.selectorLabel}>Position:</Text>
      <View style={styles.selectorOptions}>
        {positions.map((position) => (
          <TouchableOpacity
            key={position}
            style={[
              styles.selectorOption,
              currentPosition === position && styles.selectorOptionActive,
            ]}
            onPress={() => setCurrentPosition(position)}
          >
            <Text
              style={[
                styles.selectorOptionText,
                currentPosition === position && styles.selectorOptionTextActive,
              ]}
            >
              {position}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderAnimationSelector = () => (
    <View style={styles.selectorContainer}>
      <Text style={styles.selectorLabel}>Animation:</Text>
      <View style={styles.selectorOptions}>
        {animations.map((animation) => (
          <TouchableOpacity
            key={animation}
            style={[
              styles.selectorOption,
              currentAnimation === animation && styles.selectorOptionActive,
            ]}
            onPress={() => setCurrentAnimation(animation)}
          >
            <Text
              style={[
                styles.selectorOptionText,
                currentAnimation === animation && styles.selectorOptionTextActive,
              ]}
            >
              {animation}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderTriggerSelector = () => (
    <View style={styles.selectorContainer}>
      <Text style={styles.selectorLabel}>Trigger:</Text>
      <View style={styles.selectorOptions}>
        {triggers.map((trigger) => (
          <TouchableOpacity
            key={trigger}
            style={[
              styles.selectorOption,
              currentTrigger === trigger && styles.selectorOptionActive,
            ]}
            onPress={() => setCurrentTrigger(trigger)}
          >
            <Text
              style={[
                styles.selectorOptionText,
                currentTrigger === trigger && styles.selectorOptionTextActive,
              ]}
            >
              {trigger}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderToggleControls = () => (
    <View style={styles.controlsContainer}>
      <View style={styles.controlRow}>
        <Text style={styles.controlLabel}>Auto Hide</Text>
        <Switch
          value={autoHide}
          onValueChange={setAutoHide}
          trackColor={{ false: '#767577', true: '#0066cc' }}
          thumbColor={autoHide ? '#ffffff' : '#f4f3f4'}
        />
      </View>
      
      <View style={styles.controlRow}>
        <Text style={styles.controlLabel}>Enable Backdrop</Text>
        <Switch
          value={enableBackdrop}
          onValueChange={setEnableBackdrop}
          trackColor={{ false: '#767577', true: '#0066cc' }}
          thumbColor={enableBackdrop ? '#ffffff' : '#f4f3f4'}
        />
      </View>
      
      <View style={styles.controlRow}>
        <Text style={styles.controlLabel}>Enable Shadow</Text>
        <Switch
          value={enableShadow}
          onValueChange={setEnableShadow}
          trackColor={{ false: '#767577', true: '#0066cc' }}
          thumbColor={enableShadow ? '#ffffff' : '#f4f3f4'}
        />
      </View>
      
      <View style={styles.controlRow}>
        <Text style={styles.controlLabel}>Animations</Text>
        <Switch
          value={enableAnimations}
          onValueChange={setEnableAnimations}
          trackColor={{ false: '#767577', true: '#0066cc' }}
          thumbColor={enableAnimations ? '#ffffff' : '#f4f3f4'}
        />
      </View>
      
      <View style={styles.controlRow}>
        <Text style={styles.controlLabel}>Safe Area</Text>
        <Switch
          value={enableSafeArea}
          onValueChange={setEnableSafeArea}
          trackColor={{ false: '#767577', true: '#0066cc' }}
          thumbColor={enableSafeArea ? '#ffffff' : '#f4f3f4'}
        />
      </View>
    </View>
  );

  const renderSliderControls = () => (
    <View style={styles.controlsContainer}>
      <View style={styles.sliderContainer}>
        <Text style={styles.sliderLabel}>Height: {overlayHeight}px</Text>
        <View style={styles.sliderButtonContainer}>
          <Button title="-" onPress={() => setOverlayHeight(Math.max(100, overlayHeight - 50))} />
          <Button title="+" onPress={() => setOverlayHeight(Math.min(400, overlayHeight + 50))} />
        </View>
      </View>
      
      <View style={styles.sliderContainer}>
        <Text style={styles.sliderLabel}>Scroll Threshold: {scrollThreshold}px</Text>
        <View style={styles.sliderButtonContainer}>
          <Button title="-" onPress={() => setScrollThreshold(Math.max(0, scrollThreshold - 50))} />
          <Button title="+" onPress={() => setScrollThreshold(scrollThreshold + 50)} />
        </View>
      </View>
      
      <View style={styles.sliderContainer}>
        <Text style={styles.sliderLabel}>Animation Duration: {animationDuration}ms</Text>
        <View style={styles.sliderButtonContainer}>
          <Button title="-" onPress={() => setAnimationDuration(Math.max(100, animationDuration - 100))} />
          <Button title="+" onPress={() => setAnimationDuration(Math.min(1000, animationDuration + 100))} />
        </View>
      </View>
    </View>
  );

  const renderActionButtons = () => (
    <View style={styles.actionButtonsContainer}>
      <TouchableOpacity
        style={[styles.actionButton, styles.showButton]}
        onPress={() => setIsVisible(true)}
      >
        <Text style={styles.actionButtonText}>Show Overlay</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.actionButton, styles.hideButton]}
        onPress={() => setIsVisible(false)}
      >
        <Text style={styles.actionButtonText}>Hide Overlay</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.actionButton, styles.scrollButton]}
        onPress={() => simulateScroll(scrollThreshold + 50)}
      >
        <Text style={styles.actionButtonText}>Scroll to Trigger</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.actionButton, styles.resetButton]}
        onPress={() => simulateScroll(0)}
      >
        <Text style={styles.actionButtonText}>Reset Scroll</Text>
      </TouchableOpacity>
    </View>
  );

  const renderStatusInfo = () => (
    <View style={styles.statusContainer}>
      <Text style={styles.statusTitle}>Status Information</Text>
      <Text style={styles.statusText}>Overlay Visible: {isVisible ? 'Yes' : 'No'}</Text>
      <Text style={styles.statusText}>Scroll Position: {scrollPosition.toFixed(0)}px</Text>
      <Text style={styles.statusText}>Scroll Threshold: {scrollThreshold}px</Text>
      <Text style={styles.statusText}>Current Variant: {currentVariant}</Text>
      <Text style={styles.statusText}>Current Position: {currentPosition}</Text>
      <Text style={styles.statusText}>Current Animation: {currentAnimation}</Text>
      <Text style={styles.statusText}>Current Trigger: {currentTrigger}</Text>
    </View>
  );

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        ref={scrollViewRef}
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>HeaderOverlay Component Test</Text>
          <Text style={styles.subtitle}>
            Comprehensive test suite for all HeaderOverlay features
          </Text>
        </View>

        {/* Controls */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Configuration</Text>
          
          {renderVariantSelector()}
          {renderPositionSelector()}
          {renderAnimationSelector()}
          {renderTriggerSelector()}
          {renderToggleControls()}
          {renderSliderControls()}
        </View>

        {/* Action Buttons */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actions</Text>
          {renderActionButtons()}
        </View>

        {/* Status Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Status</Text>
          {renderStatusInfo()}
        </View>

        {/* Demo Content */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Demo Content</Text>
          <View style={styles.demoContent}>
            <Text style={styles.demoText}>
              This is the main content of the page. The header overlay will appear
              based on the configured trigger and settings.
            </Text>
            <Text style={styles.demoText}>
              Scroll down to test scroll-based triggers or use the action buttons
              to manually control the overlay visibility.
            </Text>
          </View>
        </View>

        {/* Filler Content for Scrolling */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Scroll Content</Text>
          {Array.from({ length: 20 }, (_, index) => (
            <View key={index} style={styles.fillerItem}>
              <Text style={styles.fillerText}>Scroll Item {index + 1}</Text>
              <Text style={styles.fillerSubtext}>
                This is filler content to demonstrate scrolling behavior.
              </Text>
            </View>
          ))}
        </View>

        {/* Features Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features Demonstrated</Text>
          <View style={styles.featuresList}>
            <Text style={styles.featureItem}>✓ Multiple header overlay variants</Text>
            <Text style={styles.featureItem}>✓ Different positions and animations</Text>
            <Text style={styles.featureItem}>✓ Scroll-based triggers</Text>
            <Text style={styles.featureItem}>✓ Auto-hide functionality</Text>
            <Text style={styles.featureItem}>✓ Backdrop support</Text>
            <Text style={styles.featureItem}>✓ Custom content and headers</Text>
            <Text style={styles.featureItem}>✓ Smooth animations and transitions</Text>
            <Text style={styles.featureItem}>✓ Theme integration</Text>
            <Text style={styles.featureItem}>✓ Accessibility compliance</Text>
            <Text style={styles.featureItem}>✓ Performance optimization</Text>
          </View>
        </View>

        {/* Spacer for bottom padding */}
        <View style={styles.spacer} />
      </ScrollView>

      {/* Header Overlay */}
      <HeaderOverlay
        variant={currentVariant}
        position={currentPosition}
        visible={isVisible}
        content={mockContent}
        header={mockHeader}
        height={overlayHeight}
        width={overlayWidth}
        trigger={currentTrigger}
        scrollThreshold={scrollThreshold}
        autoHide={autoHide}
        autoHideDuration={autoHideDuration}
        backdrop={enableBackdrop ? mockBackdrop : undefined}
        shadow={enableShadow}
        animation={currentAnimation}
        animationDuration={animationDuration}
        animated={enableAnimations}
        safeArea={enableSafeArea}
        borderWidth={borderWidth}
        borderRadius={borderRadius}
        onShow={handleShow}
        onHide={handleHide}
        onPress={handlePress}
        onBackdropPress={handleBackdropPress}
        onScroll={handleScroll}
      />
    </SafeAreaView>
  );
};

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  
  scrollView: {
    flex: 1,
  },
  
  header: {
    padding: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  
  subtitle: {
    fontSize: 16,
    color: '#cccccc',
    textAlign: 'center',
    lineHeight: 24,
  },
  
  section: {
    marginHorizontal: 20,
    marginBottom: 30,
  },
  
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
  },
  
  selectorContainer: {
    marginBottom: 20,
  },
  
  selectorLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    marginBottom: 12,
  },
  
  selectorOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  
  selectorOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#333333',
  },
  
  selectorOptionActive: {
    backgroundColor: '#0066cc',
    borderColor: '#0066cc',
  },
  
  selectorOptionText: {
    fontSize: 14,
    color: '#cccccc',
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  
  selectorOptionTextActive: {
    color: '#ffffff',
  },
  
  controlsContainer: {
    gap: 12,
  },
  
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  
  controlLabel: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
  },
  
  sliderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  
  sliderLabel: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
  },
  
  sliderButtonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  
  actionButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  
  actionButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  
  showButton: {
    backgroundColor: '#0066cc',
  },
  
  hideButton: {
    backgroundColor: '#cc3300',
  },
  
  scrollButton: {
    backgroundColor: '#009900',
  },
  
  resetButton: {
    backgroundColor: '#666666',
  },
  
  actionButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  
  statusContainer: {
    padding: 16,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333333',
  },
  
  statusTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 12,
  },
  
  statusText: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 4,
  },
  
  demoContent: {
    padding: 16,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333333',
  },
  
  demoText: {
    fontSize: 14,
    color: '#cccccc',
    lineHeight: 20,
    marginBottom: 12,
  },
  
  fillerItem: {
    padding: 16,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333333',
    marginBottom: 12,
  },
  
  fillerText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
    marginBottom: 4,
  },
  
  fillerSubtext: {
    fontSize: 14,
    color: '#cccccc',
  },
  
  featuresList: {
    gap: 8,
  },
  
  featureItem: {
    fontSize: 14,
    color: '#cccccc',
    lineHeight: 20,
  },
  
  spacer: {
    height: 40,
  },
  
  // Mock content styles
  mockContent: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  
  mockTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  
  mockDescription: {
    fontSize: 14,
    color: '#cccccc',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  
  mockButton: {
    backgroundColor: '#0066cc',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  
  mockButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  
  mockHeader: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  
  mockHeaderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});

// ============================================================================
// EXPORTS
// ============================================================================

export default HeaderOverlayTest;
