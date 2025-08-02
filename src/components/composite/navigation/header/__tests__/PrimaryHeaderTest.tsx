/**
 * Corp Astro UI Library - Primary Header Component Test
 * 
 * Comprehensive test suite for the PrimaryHeader component demonstrating
 * all features, variants, and functionality. This test component validates
 * the proper implementation of header layouts, navigation, and theming.
 * 
 * @module PrimaryHeaderTest
 * @version 1.0.0
 * @author Corp Astro Design System
 * @since 2024
 */

import React, { useState } from 'react';
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
} from 'react-native';
import { PrimaryHeader } from '../PrimaryHeader';
import type { 
  PrimaryHeaderVariant, 
  PrimaryHeaderHeight, 
  PrimaryHeaderAnimation,
  PrimaryHeaderButton,
} from '../PrimaryHeader';

// ============================================================================
// TEST COMPONENT
// ============================================================================

/**
 * PrimaryHeader Test Suite
 * 
 * Comprehensive test component showcasing all PrimaryHeader features.
 * Demonstrates variants, animations, navigation, and interactive behavior.
 */
export const PrimaryHeaderTest: React.FC = () => {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================

  const [currentVariant, setCurrentVariant] = useState<PrimaryHeaderVariant>('default');
  const [currentHeight, setCurrentHeight] = useState<PrimaryHeaderHeight>('standard');
  const [currentAnimation, setCurrentAnimation] = useState<PrimaryHeaderAnimation>('fade');
  const [title, setTitle] = useState('Corp Astro');
  const [subtitle, setSubtitle] = useState('Space Design System');
  const [customHeight, setCustomHeight] = useState(56);
  const [animationDuration, setAnimationDuration] = useState(300);
  const [isAnimated, setIsAnimated] = useState(true);
  const [hasShadow, setHasShadow] = useState(true);
  const [hasBlur, setHasBlur] = useState(false);
  const [safeArea, setSafeArea] = useState(true);
  const [statusBar, setStatusBar] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);

  // ============================================================================
  // HEADER CONFIGURATION
  // ============================================================================

  const leftButton: PrimaryHeaderButton = {
    id: 'back',
    icon: '←',
    onPress: () => Alert.alert('Back Button', 'Back navigation pressed'),
    accessibilityLabel: 'Go back',
    testID: 'header-back-button',
  };

  const rightButtons: PrimaryHeaderButton[] = [
    {
      id: 'search',
      icon: '🔍',
      onPress: () => {
        setIsSearchActive(!isSearchActive);
        Alert.alert('Search', 'Search button pressed');
      },
      accessibilityLabel: 'Search',
      testID: 'header-search-button',
    },
    {
      id: 'menu',
      icon: '☰',
      onPress: () => Alert.alert('Menu', 'Menu button pressed'),
      accessibilityLabel: 'Open menu',
      testID: 'header-menu-button',
    },
  ];

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  const handleVariantChange = (variant: PrimaryHeaderVariant) => {
    setCurrentVariant(variant);
    if (variant === 'search') {
      setIsSearchActive(true);
    } else {
      setIsSearchActive(false);
    }
  };

  const handleHeightChange = (height: PrimaryHeaderHeight) => {
    setCurrentHeight(height);
  };

  const handleAnimationChange = (animation: PrimaryHeaderAnimation) => {
    setCurrentAnimation(animation);
  };

  const handleTitlePress = () => {
    Alert.alert('Title Pressed', 'Header title was pressed');
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    console.log('Search value changed:', value);
  };

  const handleSearchSubmit = (value: string) => {
    Alert.alert('Search Submit', `Search submitted: ${value}`);
  };

  // ============================================================================
  // RENDER HELPERS
  // ============================================================================

  /**
   * Render variant selector
   */
  const renderVariantSelector = () => {
    const variants: PrimaryHeaderVariant[] = ['default', 'large', 'minimal', 'search', 'transparent'];
    
    return (
      <View style={styles.selectorContainer}>
        <Text style={styles.selectorTitle}>Variant</Text>
        <View style={styles.selectorButtons}>
          {variants.map((variant) => (
            <TouchableOpacity
              key={variant}
              style={[
                styles.selectorButton,
                currentVariant === variant && styles.selectorButtonActive,
              ]}
              onPress={() => handleVariantChange(variant)}
            >
              <Text
                style={[
                  styles.selectorButtonText,
                  currentVariant === variant && styles.selectorButtonTextActive,
                ]}
              >
                {variant}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  /**
   * Render height selector
   */
  const renderHeightSelector = () => {
    const heights: PrimaryHeaderHeight[] = ['standard', 'large', 'compact', 'custom'];
    
    return (
      <View style={styles.selectorContainer}>
        <Text style={styles.selectorTitle}>Height</Text>
        <View style={styles.selectorButtons}>
          {heights.map((height) => (
            <TouchableOpacity
              key={height}
              style={[
                styles.selectorButton,
                currentHeight === height && styles.selectorButtonActive,
              ]}
              onPress={() => handleHeightChange(height)}
            >
              <Text
                style={[
                  styles.selectorButtonText,
                  currentHeight === height && styles.selectorButtonTextActive,
                ]}
              >
                {height}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  /**
   * Render animation selector
   */
  const renderAnimationSelector = () => {
    const animations: PrimaryHeaderAnimation[] = ['fade', 'slide', 'scale', 'none'];
    
    return (
      <View style={styles.selectorContainer}>
        <Text style={styles.selectorTitle}>Animation</Text>
        <View style={styles.selectorButtons}>
          {animations.map((animation) => (
            <TouchableOpacity
              key={animation}
              style={[
                styles.selectorButton,
                currentAnimation === animation && styles.selectorButtonActive,
              ]}
              onPress={() => handleAnimationChange(animation)}
            >
              <Text
                style={[
                  styles.selectorButtonText,
                  currentAnimation === animation && styles.selectorButtonTextActive,
                ]}
              >
                {animation}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  /**
   * Render configuration controls
   */
  const renderControls = () => (
    <View style={styles.controlsContainer}>
      <Text style={styles.controlsTitle}>Configuration</Text>
      
      <View style={styles.controlRow}>
        <Text style={styles.controlLabel}>Animated</Text>
        <Switch
          value={isAnimated}
          onValueChange={setIsAnimated}
          trackColor={{ false: '#767577', true: '#0066cc' }}
          thumbColor={isAnimated ? '#ffffff' : '#f4f3f4'}
        />
      </View>
      
      <View style={styles.controlRow}>
        <Text style={styles.controlLabel}>Shadow</Text>
        <Switch
          value={hasShadow}
          onValueChange={setHasShadow}
          trackColor={{ false: '#767577', true: '#0066cc' }}
          thumbColor={hasShadow ? '#ffffff' : '#f4f3f4'}
        />
      </View>
      
      <View style={styles.controlRow}>
        <Text style={styles.controlLabel}>Blur</Text>
        <Switch
          value={hasBlur}
          onValueChange={setHasBlur}
          trackColor={{ false: '#767577', true: '#0066cc' }}
          thumbColor={hasBlur ? '#ffffff' : '#f4f3f4'}
        />
      </View>
      
      <View style={styles.controlRow}>
        <Text style={styles.controlLabel}>Safe Area</Text>
        <Switch
          value={safeArea}
          onValueChange={setSafeArea}
          trackColor={{ false: '#767577', true: '#0066cc' }}
          thumbColor={safeArea ? '#ffffff' : '#f4f3f4'}
        />
      </View>
      
      <View style={styles.controlRow}>
        <Text style={styles.controlLabel}>Status Bar</Text>
        <Switch
          value={statusBar}
          onValueChange={setStatusBar}
          trackColor={{ false: '#767577', true: '#0066cc' }}
          thumbColor={statusBar ? '#ffffff' : '#f4f3f4'}
        />
      </View>
      
      <View style={styles.controlRow}>
        <Text style={styles.controlLabel}>
          Animation Duration: {animationDuration}ms
        </Text>
      </View>
      
      <View style={styles.controlRow}>
        <Text style={styles.controlLabel}>
          Custom Height: {customHeight}px
        </Text>
      </View>
    </View>
  );

  /**
   * Render usage examples
   */
  const renderUsageExamples = () => (
    <View style={styles.usageContainer}>
      <Text style={styles.usageTitle}>Usage Examples</Text>
      
      <View style={styles.usageExample}>
        <Text style={styles.usageExampleTitle}>Basic Header</Text>
        <View style={styles.codeBlock}>
          <Text style={styles.codeText}>
            {`<PrimaryHeader
  title="Corp Astro"
  subtitle="Space Design System"
  variant="default"
  height="standard"
/>`}
          </Text>
        </View>
      </View>
      
      <View style={styles.usageExample}>
        <Text style={styles.usageExampleTitle}>Header with Navigation</Text>
        <View style={styles.codeBlock}>
          <Text style={styles.codeText}>
            {`<PrimaryHeader
  title="Dashboard"
  leftButton={{
    id: 'back',
    icon: '←',
    onPress: () => navigation.goBack(),
  }}
  rightButtons={[
    {
      id: 'search',
      icon: '🔍',
      onPress: () => openSearch(),
    },
    {
      id: 'menu',
      icon: '☰',
      onPress: () => openMenu(),
    },
  ]}
/>`}
          </Text>
        </View>
      </View>
      
      <View style={styles.usageExample}>
        <Text style={styles.usageExampleTitle}>Search Header</Text>
        <View style={styles.codeBlock}>
          <Text style={styles.codeText}>
            {`<PrimaryHeader
  variant="search"
  searchValue={searchValue}
  searchPlaceholder="Search products..."
  onSearchChange={setSearchValue}
  onSearchSubmit={handleSearch}
/>`}
          </Text>
        </View>
      </View>
    </View>
  );

  /**
   * Render configuration display
   */
  const renderCurrentConfig = () => (
    <View style={styles.configContainer}>
      <Text style={styles.configTitle}>Current Configuration</Text>
      <View style={styles.configGrid}>
        <View style={styles.configItem}>
          <Text style={styles.configLabel}>Variant</Text>
          <Text style={styles.configValue}>{currentVariant}</Text>
        </View>
        <View style={styles.configItem}>
          <Text style={styles.configLabel}>Height</Text>
          <Text style={styles.configValue}>{currentHeight}</Text>
        </View>
        <View style={styles.configItem}>
          <Text style={styles.configLabel}>Animation</Text>
          <Text style={styles.configValue}>{currentAnimation}</Text>
        </View>
        <View style={styles.configItem}>
          <Text style={styles.configLabel}>Duration</Text>
          <Text style={styles.configValue}>{animationDuration}ms</Text>
        </View>
        <View style={styles.configItem}>
          <Text style={styles.configLabel}>Title</Text>
          <Text style={styles.configValue}>{title}</Text>
        </View>
        <View style={styles.configItem}>
          <Text style={styles.configLabel}>Subtitle</Text>
          <Text style={styles.configValue}>{subtitle || 'None'}</Text>
        </View>
      </View>
    </View>
  );

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  return (
    <SafeAreaView style={styles.container}>
      <PrimaryHeader
        variant={currentVariant}
        height={currentHeight}
        customHeight={currentHeight === 'custom' ? customHeight : undefined}
        title={title}
        subtitle={currentVariant !== 'search' ? subtitle : undefined}
        leftButton={leftButton}
        rightButtons={rightButtons}
        shadow={hasShadow}
        blur={hasBlur}
        animation={currentAnimation}
        animationDuration={animationDuration}
        animated={isAnimated}
        safeArea={safeArea}
        statusBar={statusBar}
        searchValue={searchValue}
        searchPlaceholder="Search Corp Astro..."
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
        onPress={handleTitlePress}
        testID="primary-header-test"
      />
      
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderVariantSelector()}
        {renderHeightSelector()}
        {renderAnimationSelector()}
        {renderControls()}
        {renderCurrentConfig()}
        {renderUsageExamples()}
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
    backgroundColor: '#0a0a0a',
  },
  
  scrollView: {
    flex: 1,
  },
  
  scrollContent: {
    padding: 20,
  },
  
  selectorContainer: {
    marginBottom: 24,
  },
  
  selectorTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 12,
  },
  
  selectorButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  
  selectorButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#333333',
  },
  
  selectorButtonActive: {
    backgroundColor: '#0066cc',
    borderColor: '#0066cc',
  },
  
  selectorButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#cccccc',
    textTransform: 'capitalize',
  },
  
  selectorButtonTextActive: {
    color: '#ffffff',
  },
  
  controlsContainer: {
    marginBottom: 24,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
  },
  
  controlsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
  },
  
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  
  controlLabel: {
    fontSize: 16,
    color: '#cccccc',
  },
  
  configContainer: {
    marginBottom: 24,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
  },
  
  configTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
  },
  
  configGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  
  configItem: {
    flex: 1,
    minWidth: '45%',
  },
  
  configLabel: {
    fontSize: 14,
    color: '#999999',
    marginBottom: 4,
  },
  
  configValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
  },
  
  usageContainer: {
    marginBottom: 24,
  },
  
  usageTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
  },
  
  usageExample: {
    marginBottom: 20,
  },
  
  usageExampleTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#cccccc',
    marginBottom: 8,
  },
  
  codeBlock: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#0066cc',
  },
  
  codeText: {
    fontSize: 14,
    fontFamily: 'monospace',
    color: '#e6e6e6',
    lineHeight: 20,
  },
});

// ============================================================================
// EXPORTS
// ============================================================================

export default PrimaryHeaderTest;
