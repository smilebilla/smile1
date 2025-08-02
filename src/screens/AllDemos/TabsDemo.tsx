/**
 * 🌌 COSMIC TRANSFORMATION - Module 17: Navigation System Demo
 * 
 * Interactive demo page showcasing the complete Navigation System with:
 * - All navigation variants (default, floating, cosmic, glass, premium)
 * - Size comparisons and responsiveness
 * - Style variations with cosmic effects
 * - Animation demonstrations
 * - Performance metrics display
 * - Real-time navigation configuration testing
 * 
 * This demo validates all aspects of the Navigation System and serves as
 * a visual testing ground for cosmic navigation transformations.
 * 
 * @since Module 17 - Navigation System Demo
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Animated,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DarkTheme from '../../components/foundations/themes/DarkTheme';
import TypographySystem from '../../components/foundations/themes/TypographySystem';
import { 
  NavigationSystem, 
  NavigationPresets, 
  NavigationUtils,
  getNavigationMetrics,
  type NavigationConfig,
  type NavigationVariant,
  type NavigationSize,
  type TabItemConfig,
} from '../../components/foundations/themes/NavigationSystem';

export default function NavigationDemo() {
  const [selectedVariant, setSelectedVariant] = useState<NavigationVariant>('floating');
  const [selectedSize, setSelectedSize] = useState<NavigationSize>('default');
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [metrics, setMetrics] = useState(getNavigationMetrics());
  const [animatedValues] = useState(() => 
    new Array(5).fill(0).map(() => new Animated.Value(0))
  );

  // Sample navigation tabs for demonstration
  const sampleTabs = [
    { name: 'Home', icon: 'home', iconType: 'home' as const },
    { name: 'Charts', icon: 'chart-donut', iconType: 'charts' as const },
    { name: 'Astro', icon: 'diamond-stone', iconType: 'astro' as const },
    { name: 'Business', icon: 'office-building', iconType: 'business' as const },
    { name: 'Calendar', icon: 'calendar-month', iconType: 'calendar' as const },
  ];

  // Update metrics periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(getNavigationMetrics());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Animate tabs when they become active
  useEffect(() => {
    animatedValues.forEach((animValue, index) => {
      Animated.spring(animValue, {
        toValue: index === activeTabIndex ? 1 : 0,
        useNativeDriver: true,
        tension: 150,
        friction: 8,
      }).start();
    });
  }, [activeTabIndex, animatedValues]);

  // Handle tab press with animation
  const handleTabPress = async (index: number) => {
    await NavigationUtils.triggerHapticFeedback('light');
    setActiveTabIndex(index);
  };

  // Render a demo navigation bar
  const renderDemoNavigation = (config: NavigationConfig) => {
    const navStyles = NavigationSystem.getNavigationStyles(config);
    
    return (
      <View style={[styles.demoNavContainer, navStyles.container]}>
        <View style={navStyles.background}>
          {/* Add overlay for glass effect */}
          {navStyles.overlay && <View style={navStyles.overlay} />}
          
          {sampleTabs.map((tab, index) => {
            const isActive = index === activeTabIndex;
            
            const tabConfig: TabItemConfig = {
              iconType: tab.iconType,
              label: tab.name,
              isActive,
              state: 'default',
            };
            
            const iconColor = NavigationSystem.getIconColor(tabConfig, config.variant);
            const iconSize = NavigationUtils.getIconSize(config.size);
            
            const animatedStyle = {
              transform: [
                {
                  scale: animatedValues[index]?.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.1],
                  }) || 1,
                },
              ],
            };
            
            return (
              <TouchableOpacity
                key={tab.name}
                activeOpacity={0.8}
                onPress={() => handleTabPress(index)}
                style={isActive ? navStyles.activeTab : navStyles.tabItem}
              >
                <View style={navStyles.iconContainer}>
                  <Animated.View style={animatedStyle}>
                    <MaterialCommunityIcons
                      name={tab.icon as any}
                      size={iconSize}
                      color={tab.iconType === 'astro' && isActive ? DarkTheme.colors.luxury.pure : iconColor}
                    />
                  </Animated.View>
                  <Text style={isActive ? navStyles.activeLabel : navStyles.label}>
                    {tab.name}
                  </Text>
                </View>
                
                {/* Add glow effect for active tabs */}
                {isActive && navStyles.glow && <View style={navStyles.glow} />}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  // Helper to get typography style with system font fallback
  const getSystemTypography = (variant: import('../../components/foundations/themes/TypographySystem').TypographyVariant, extra: object = {}) => ({
    ...TypographySystem.getTypographyStyle(variant),
    fontFamily: 'System',
    ...extra,
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={DarkTheme.colors.cosmos.deep} />
      
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={getSystemTypography('h1', { color: DarkTheme.colors.neutral.light })}>
              Navigation System Demo
            </Text>
            <Text style={getSystemTypography('body', { color: DarkTheme.colors.neutral.light })}>
              Module 17: Cosmic navigation transformation and enhancement
            </Text>
          </View>

          {/* Configuration Controls */}
          <View style={styles.section}>
            <Text style={getSystemTypography('h3', { color: DarkTheme.colors.neutral.light })}>
              Configuration
            </Text>
            
            {/* Variant Selection */}
            <View style={styles.controlGroup}>
              <Text style={getSystemTypography('body', { color: DarkTheme.colors.neutral.light })}>
                Variant:
              </Text>
              <View style={styles.buttonGroup}>
                {(['default', 'floating', 'cosmic', 'glass', 'premium'] as NavigationVariant[]).map((variant) => (
                  <TouchableOpacity
                    key={variant}
                    style={[
                      styles.controlButton,
                      selectedVariant === variant && styles.controlButtonActive
                    ]}
                    onPress={() => setSelectedVariant(variant)}
                  >
                    <Text style={[
                      styles.controlButtonText,
                      selectedVariant === variant && styles.controlButtonTextActive
                    ]}>
                      {variant}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Size Selection */}
            <View style={styles.controlGroup}>
              <Text style={getSystemTypography('body', { color: DarkTheme.colors.neutral.light })}>
                Size:
              </Text>
              <View style={styles.buttonGroup}>
                {(['compact', 'default', 'comfortable', 'spacious'] as NavigationSize[]).map((size) => (
                  <TouchableOpacity
                    key={size}
                    style={[
                      styles.controlButton,
                      selectedSize === size && styles.controlButtonActive
                    ]}
                    onPress={() => setSelectedSize(size)}
                  >
                    <Text style={[
                      styles.controlButtonText,
                      selectedSize === size && styles.controlButtonTextActive
                    ]}>
                      {size}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* Live Demo */}
          <View style={styles.section}>
            <Text style={getSystemTypography('h3', { color: DarkTheme.colors.neutral.light })}>
              Live Demo
            </Text>
            <Text style={getSystemTypography('body', { color: DarkTheme.colors.neutral.light })}>
              Interactive navigation with {selectedVariant} variant and {selectedSize} size
            </Text>
            
            {/* The navigation bar is now fixed at the bottom */}
          </View>

          {/* Navigation Presets Showcase */}
          <View style={styles.section}>
            <Text style={getSystemTypography('h3', { color: DarkTheme.colors.neutral.light })}>
              Navigation Presets
            </Text>
            <Text style={getSystemTypography('body', { color: DarkTheme.colors.neutral.light })}>
              Pre-configured navigation styles for different use cases
            </Text>

            {Object.entries({
              'Default': NavigationPresets.default(),
              'Floating': NavigationPresets.floating(),
              'Cosmic': NavigationPresets.cosmic(),
              'Glass': NavigationPresets.glass(),
              'Premium': NavigationPresets.premium(),
            }).map(([presetName, config]) => (
              <View key={presetName} style={styles.presetItem}>
                <Text style={[TypographySystem.getTypographyStyle('h4'), { color: DarkTheme.colors.brand.light }]}>
                  {presetName} Preset
                </Text>
                <View style={styles.presetDemo}>
                  {renderDemoNavigation(config)}
                </View>
              </View>
            ))}
          </View>

          {/* Performance Metrics */}
          <View style={styles.section}>
            <Text style={getSystemTypography('h3', { color: DarkTheme.colors.neutral.light })}>
              Performance Metrics
            </Text>
            <View style={styles.metricsGrid}>
              <View style={styles.metricItem}>
                <Text style={[TypographySystem.getTypographyStyle('h4'), { color: DarkTheme.colors.brand.primary }]}>
                  {metrics.renderCount}
                </Text>
                <Text style={[TypographySystem.getTypographyStyle('caption'), { color: DarkTheme.colors.neutral.light }]}>
                  Render Count
                </Text>
              </View>
              <View style={styles.metricItem}>
                <Text style={[TypographySystem.getTypographyStyle('h4'), { color: DarkTheme.colors.mystical.royal }]}>
                  {metrics.lastRenderTime.toFixed(1)}ms
                </Text>
                <Text style={[TypographySystem.getTypographyStyle('caption'), { color: DarkTheme.colors.neutral.light }]}>
                  Last Render Time
                </Text>
              </View>
              <View style={styles.metricItem}>
                <Text style={[TypographySystem.getTypographyStyle('h4'), { color: DarkTheme.colors.luxury.pure }]}>
                  {metrics.totalNavigations}
                </Text>
                <Text style={[TypographySystem.getTypographyStyle('caption'), { color: DarkTheme.colors.neutral.light }]}>
                  Total Navigations
                </Text>
              </View>
            </View>
          </View>

          {/* Features List */}
          <View style={styles.section}>
            <Text style={getSystemTypography('h3', { color: DarkTheme.colors.neutral.light })}>
              Navigation Features
            </Text>
            <View style={styles.featureList}>
              {[
                'Floating navigation with glass morphism',
                'Cosmic gradient backgrounds and glow effects',
                'Animated tab transitions and interactions',
                'Platform-specific haptic feedback',
                'Performance-optimized rendering',
                'Accessibility-compliant navigation',
                'Cross-platform compatibility',
                'Dynamic icon styling and animations'
              ].map((feature, index) => (
                <Text
                  key={index}
                  style={getSystemTypography('caption', { color: DarkTheme.colors.neutral.text })}
                >
                  • {feature}
                </Text>
              ))}
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={getSystemTypography('caption', { color: DarkTheme.colors.neutral.muted })}>
              🌌 Corp Astro Cosmic Transformation - Module 17 Complete
            </Text>
            <Text style={getSystemTypography('caption', { color: DarkTheme.colors.neutral.muted })}>
              Navigation System: {sampleTabs.length} tabs • Enhanced with cosmic effects
            </Text>
          </View>
        </ScrollView>
        {/* Navigation bar fixed at the bottom */}
        <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
          {renderDemoNavigation({
            variant: selectedVariant,
            size: selectedSize,
            state: 'default',
            hasGlow: selectedVariant === 'cosmic' || selectedVariant === 'premium',
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DarkTheme.colors.cosmos.deep,
  },
  
  scrollView: {
    flex: 1,
  },
  
  header: {
    padding: DarkTheme.spacing.lg,
    backgroundColor: DarkTheme.colors.cosmos.deep,
    borderBottomWidth: 1,
    borderBottomColor: DarkTheme.colors.neutral.muted,
  },
  
  section: {
    padding: DarkTheme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: DarkTheme.colors.neutral.muted,
  },
  
  controlGroup: {
    marginTop: DarkTheme.spacing.md,
  },
  
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: DarkTheme.spacing.sm,
    gap: DarkTheme.spacing.xs,
  },
  
  controlButton: {
    backgroundColor: DarkTheme.colors.cosmos.dark,
    paddingHorizontal: DarkTheme.spacing.md,
    paddingVertical: DarkTheme.spacing.sm,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: DarkTheme.colors.neutral.muted,
  },
  
  controlButtonActive: {
    backgroundColor: DarkTheme.colors.brand.primary,
    borderColor: DarkTheme.colors.brand.light,
  },
  
  controlButtonText: {
    ...TypographySystem.getTypographyStyle('caption'),
    color: DarkTheme.colors.neutral.text,
    textTransform: 'capitalize' as const,
  },
  
  controlButtonTextActive: {
    color: DarkTheme.colors.neutral.light,
    fontWeight: '600',
  },
  
  demoContainer: {
    marginTop: DarkTheme.spacing.lg,
    height: 120,
    backgroundColor: DarkTheme.colors.cosmos.deep,
    borderRadius: 16,
    overflow: 'hidden',
  },
  
  demoNavContainer: {
    flex: 1,
  },
  
  presetItem: {
    marginTop: DarkTheme.spacing.lg,
  },
  
  presetDemo: {
    marginTop: DarkTheme.spacing.md,
    height: 100,
    backgroundColor: DarkTheme.colors.cosmos.deep,
    borderRadius: 12,
    overflow: 'hidden',
  },
  
  metricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: DarkTheme.spacing.md,
  },
  
  metricItem: {
    flex: 1,
    alignItems: 'center',
    padding: DarkTheme.spacing.md,
    backgroundColor: DarkTheme.colors.cosmos.dark,
    borderRadius: 12,
    marginHorizontal: DarkTheme.spacing.xs,
  },
  
  featureList: {
    marginTop: DarkTheme.spacing.md,
    gap: DarkTheme.spacing.sm,
  },
  
  footer: {
    padding: DarkTheme.spacing.lg,
    alignItems: 'center',
    gap: DarkTheme.spacing.xs,
  },
});
