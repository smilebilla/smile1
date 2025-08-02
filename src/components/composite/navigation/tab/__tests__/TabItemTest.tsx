/**
 * Corp Astro UI Library - Tab Item Test Suite
 * 
 * Comprehensive test suite for the TabItem component demonstrating
 * all variants, configurations, and interactive states within the 
 * Corp Astro design system.
 * 
 * Features:
 * - All tab item variants and sizes testing
 * - Icon positioning and badge configuration testing
 * - Ripple effects and indicator animation testing
 * - State management and interactive feedback testing
 * - Orientation and accessibility testing
 * - Theme integration and performance validation
 * - Custom styling and animation testing
 * 
 * @module TabItemTest
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
  Alert,
  Switch,
} from 'react-native';
import { useTheme } from '../../../../foundations/themes/useTheme';
import { 
  TabItem, 
  TabItemVariant, 
  TabItemSize, 
  TabItemOrientation,
  TabItemIconPosition,
  TabItemBadgePosition,
  TabItemAnimation
} from '../TabItem';

// ============================================================================
// TEST COMPONENT
// ============================================================================

/**
 * TabItemTest - Comprehensive test suite component
 */
export const TabItemTest: React.FC = () => {
  // ============================================================================
  // HOOKS & STATE
  // ============================================================================

  const theme = useTheme();
  const [activeVariant, setActiveVariant] = useState<TabItemVariant>('default');
  const [activeSize, setActiveSize] = useState<TabItemSize>('medium');
  const [activeOrientation, setActiveOrientation] = useState<TabItemOrientation>('horizontal');
  const [activeIconPosition, setActiveIconPosition] = useState<TabItemIconPosition>('left');
  const [activeBadgePosition, setActiveBadgePosition] = useState<TabItemBadgePosition>('top-right');
  const [activeAnimation, setActiveAnimation] = useState<TabItemAnimation>('fade');
  const [activeTab, setActiveTab] = useState('home');
  const [showIcons, setShowIcons] = useState(true);
  const [showBadges, setShowBadges] = useState(true);
  const [showRipple, setShowRipple] = useState(true);
  const [showIndicator, setShowIndicator] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [currentState, setCurrentState] = useState<'normal' | 'active' | 'disabled' | 'loading'>('normal');

  // ============================================================================
  // VARIANT CONFIGURATIONS
  // ============================================================================

  const variants: TabItemVariant[] = ['default', 'pill', 'underline', 'card', 'chip', 'ghost'];
  const sizes: TabItemSize[] = ['small', 'medium', 'large', 'xlarge'];
  const orientations: TabItemOrientation[] = ['horizontal', 'vertical'];
  const iconPositions: TabItemIconPosition[] = ['left', 'right', 'top', 'bottom'];
  const badgePositions: TabItemBadgePosition[] = ['top-right', 'top-left', 'bottom-right', 'bottom-left'];
  const animations: TabItemAnimation[] = ['fade', 'slide', 'scale', 'bounce', 'elastic', 'none'];

  // ============================================================================
  // HANDLERS
  // ============================================================================

  const handleTabPress = (id: string) => {
    setActiveTab(id);
    Alert.alert('Tab Pressed', `Tab "${id}" was pressed`);
  };

  const handleTabLongPress = (id: string) => {
    Alert.alert('Tab Long Pressed', `Tab "${id}" was long pressed`);
  };

  const handleTabPressIn = (id: string) => {
    console.log('Tab press in:', id);
  };

  const handleTabPressOut = (id: string) => {
    console.log('Tab press out:', id);
  };

  const handleTabMount = (id: string) => {
    console.log('Tab mounted:', id);
  };

  const handleTabUnmount = (id: string) => {
    console.log('Tab unmounted:', id);
  };

  const handleStateChange = (state: 'normal' | 'active' | 'disabled' | 'loading') => {
    setCurrentState(state);
  };

  // ============================================================================
  // DEMO CONTENT
  // ============================================================================

  const renderIcon = (name: string) => {
    const iconMap: { [key: string]: string } = {
      home: '🏠',
      search: '🔍',
      favorites: '⭐',
      profile: '👤',
      settings: '⚙️',
      notifications: '🔔',
      messages: '💬',
      calendar: '📅',
    };
    
    return (
      <Text style={styles.tabIcon}>
        {iconMap[name] || '📄'}
      </Text>
    );
  };

  const getBadgeContent = (id: string) => {
    const badgeMap: { [key: string]: string | number } = {
      home: 3,
      search: 12,
      favorites: 99,
      profile: 5,
      settings: 1,
      notifications: 25,
      messages: 8,
      calendar: 2,
    };
    
    return badgeMap[id] || 0;
  };

  // ============================================================================
  // RENDER CONTROLS
  // ============================================================================

  const renderControls = () => (
    <View style={styles.controls}>
      <Text style={[styles.controlTitle, { color: theme.colors.neutral.light }]}>
        Tab Item Controls
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

      {/* Orientation Selection */}
      <View style={styles.controlGroup}>
        <Text style={[styles.controlLabel, { color: theme.colors.neutral.medium }]}>
          Orientation
        </Text>
        <View style={styles.buttonRow}>
          {orientations.map((orientation) => (
            <TouchableOpacity
              key={orientation}
              style={[
                styles.controlButton,
                {
                  backgroundColor: activeOrientation === orientation 
                    ? theme.colors.brand.primary 
                    : theme.colors.cosmos.medium,
                },
              ]}
              onPress={() => setActiveOrientation(orientation)}
            >
              <Text style={[styles.controlButtonText, { color: theme.colors.neutral.light }]}>
                {orientation}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Icon Position Selection */}
      <View style={styles.controlGroup}>
        <Text style={[styles.controlLabel, { color: theme.colors.neutral.medium }]}>
          Icon Position
        </Text>
        <View style={styles.buttonRow}>
          {iconPositions.map((position) => (
            <TouchableOpacity
              key={position}
              style={[
                styles.controlButton,
                {
                  backgroundColor: activeIconPosition === position 
                    ? theme.colors.brand.primary 
                    : theme.colors.cosmos.medium,
                },
              ]}
              onPress={() => setActiveIconPosition(position)}
            >
              <Text style={[styles.controlButtonText, { color: theme.colors.neutral.light }]}>
                {position}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Badge Position Selection */}
      <View style={styles.controlGroup}>
        <Text style={[styles.controlLabel, { color: theme.colors.neutral.medium }]}>
          Badge Position
        </Text>
        <View style={styles.buttonRow}>
          {badgePositions.map((position) => (
            <TouchableOpacity
              key={position}
              style={[
                styles.controlButton,
                {
                  backgroundColor: activeBadgePosition === position 
                    ? theme.colors.brand.primary 
                    : theme.colors.cosmos.medium,
                },
              ]}
              onPress={() => setActiveBadgePosition(position)}
            >
              <Text style={[styles.controlButtonText, { color: theme.colors.neutral.light }]}>
                {position}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Animation Selection */}
      <View style={styles.controlGroup}>
        <Text style={[styles.controlLabel, { color: theme.colors.neutral.medium }]}>
          Animation
        </Text>
        <View style={styles.buttonRow}>
          {animations.map((animation) => (
            <TouchableOpacity
              key={animation}
              style={[
                styles.controlButton,
                {
                  backgroundColor: activeAnimation === animation 
                    ? theme.colors.brand.primary 
                    : theme.colors.cosmos.medium,
                },
              ]}
              onPress={() => setActiveAnimation(animation)}
            >
              <Text style={[styles.controlButtonText, { color: theme.colors.neutral.light }]}>
                {animation}
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
          {['normal', 'active', 'disabled', 'loading'].map((state) => (
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
            Show Icons
          </Text>
          <Switch
            value={showIcons}
            onValueChange={setShowIcons}
            trackColor={{ false: theme.colors.cosmos.medium, true: theme.colors.brand.primary }}
            thumbColor={theme.colors.neutral.light}
          />
        </View>

        <View style={styles.toggleRow}>
          <Text style={[styles.toggleLabel, { color: theme.colors.neutral.light }]}>
            Show Badges
          </Text>
          <Switch
            value={showBadges}
            onValueChange={setShowBadges}
            trackColor={{ false: theme.colors.cosmos.medium, true: theme.colors.brand.primary }}
            thumbColor={theme.colors.neutral.light}
          />
        </View>

        <View style={styles.toggleRow}>
          <Text style={[styles.toggleLabel, { color: theme.colors.neutral.light }]}>
            Show Ripple
          </Text>
          <Switch
            value={showRipple}
            onValueChange={setShowRipple}
            trackColor={{ false: theme.colors.cosmos.medium, true: theme.colors.brand.primary }}
            thumbColor={theme.colors.neutral.light}
          />
        </View>

        <View style={styles.toggleRow}>
          <Text style={[styles.toggleLabel, { color: theme.colors.neutral.light }]}>
            Show Indicator
          </Text>
          <Switch
            value={showIndicator}
            onValueChange={setShowIndicator}
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
        Tab Item Examples
      </Text>

      {/* Current Configuration */}
      <View style={styles.exampleGroup}>
        <Text style={[styles.exampleLabel, { color: theme.colors.neutral.medium }]}>
          Current Configuration
        </Text>
        <View style={[styles.exampleContainer, { flexDirection: activeOrientation === 'horizontal' ? 'row' : 'column' }]}>
          <TabItem
            id="demo"
            label="Demo Tab"
            variant={activeVariant}
            size={activeSize}
            orientation={activeOrientation}
            animation={activeAnimation}
            icon={showIcons ? renderIcon('home') : undefined}
            iconPosition={activeIconPosition}
            badge={showBadges ? {
              content: getBadgeContent('home'),
              position: activeBadgePosition,
              visible: true,
            } : undefined}
            ripple={{ enabled: showRipple }}
            indicator={{ enabled: showIndicator }}
            active={currentState === 'active'}
            disabled={currentState === 'disabled'}
            loading={currentState === 'loading'}
            visible={isVisible}
            onPress={handleTabPress}
            onLongPress={handleTabLongPress}
            onPressIn={handleTabPressIn}
            onPressOut={handleTabPressOut}
            onMount={handleTabMount}
            onUnmount={handleTabUnmount}
            accessibilityLabel="Demo tab item"
            testID="tab-item-demo"
          />
          <Text style={[styles.activeTabText, { color: theme.colors.neutral.medium }]}>
            Active Tab: {activeTab}
          </Text>
        </View>
      </View>

      {/* Variant Examples */}
      <View style={styles.exampleGroup}>
        <Text style={[styles.exampleLabel, { color: theme.colors.neutral.medium }]}>
          All Variants
        </Text>
        <View style={styles.variantGrid}>
          {variants.map((variant) => (
            <View key={variant} style={styles.exampleItem}>
              <Text style={[styles.exampleItemLabel, { color: theme.colors.neutral.light }]}>
                {variant}
              </Text>
              <TabItem
                id={variant}
                label={variant.charAt(0).toUpperCase() + variant.slice(1)}
                variant={variant}
                size="medium"
                icon={showIcons ? renderIcon('home') : undefined}
                badge={showBadges ? { content: 3, visible: true } : undefined}
                ripple={{ enabled: showRipple }}
                indicator={{ enabled: showIndicator }}
                active={activeTab === variant}
                onPress={handleTabPress}
                accessibilityLabel={`${variant} tab`}
                testID={`tab-item-${variant}`}
              />
            </View>
          ))}
        </View>
      </View>

      {/* Size Examples */}
      <View style={styles.exampleGroup}>
        <Text style={[styles.exampleLabel, { color: theme.colors.neutral.medium }]}>
          All Sizes
        </Text>
        <View style={styles.sizeGrid}>
          {sizes.map((size) => (
            <View key={size} style={styles.exampleItem}>
              <Text style={[styles.exampleItemLabel, { color: theme.colors.neutral.light }]}>
                {size}
              </Text>
              <TabItem
                id={size}
                label={size.charAt(0).toUpperCase() + size.slice(1)}
                variant="default"
                size={size}
                icon={showIcons ? renderIcon('home') : undefined}
                badge={showBadges ? { content: 5, visible: true } : undefined}
                ripple={{ enabled: showRipple }}
                indicator={{ enabled: showIndicator }}
                active={activeTab === size}
                onPress={handleTabPress}
                accessibilityLabel={`${size} tab`}
                testID={`tab-item-${size}`}
              />
            </View>
          ))}
        </View>
      </View>

      {/* Icon Position Examples */}
      <View style={styles.exampleGroup}>
        <Text style={[styles.exampleLabel, { color: theme.colors.neutral.medium }]}>
          Icon Positions
        </Text>
        <View style={styles.iconGrid}>
          {iconPositions.map((position) => (
            <View key={position} style={styles.exampleItem}>
              <Text style={[styles.exampleItemLabel, { color: theme.colors.neutral.light }]}>
                {position}
              </Text>
              <TabItem
                id={position}
                label="Icon"
                variant="default"
                size="medium"
                icon={showIcons ? renderIcon('home') : undefined}
                iconPosition={position}
                ripple={{ enabled: showRipple }}
                indicator={{ enabled: showIndicator }}
                active={activeTab === position}
                onPress={handleTabPress}
                accessibilityLabel={`${position} icon tab`}
                testID={`tab-item-icon-${position}`}
              />
            </View>
          ))}
        </View>
      </View>

      {/* Badge Position Examples */}
      <View style={styles.exampleGroup}>
        <Text style={[styles.exampleLabel, { color: theme.colors.neutral.medium }]}>
          Badge Positions
        </Text>
        <View style={styles.badgeGrid}>
          {badgePositions.map((position) => (
            <View key={position} style={styles.exampleItem}>
              <Text style={[styles.exampleItemLabel, { color: theme.colors.neutral.light }]}>
                {position}
              </Text>
              <TabItem
                id={position}
                label="Badge"
                variant="default"
                size="medium"
                icon={showIcons ? renderIcon('home') : undefined}
                badge={showBadges ? {
                  content: 99,
                  position: position,
                  visible: true,
                } : undefined}
                ripple={{ enabled: showRipple }}
                indicator={{ enabled: showIndicator }}
                active={activeTab === position}
                onPress={handleTabPress}
                accessibilityLabel={`${position} badge tab`}
                testID={`tab-item-badge-${position}`}
              />
            </View>
          ))}
        </View>
      </View>

      {/* State Examples */}
      <View style={styles.exampleGroup}>
        <Text style={[styles.exampleLabel, { color: theme.colors.neutral.medium }]}>
          State Examples
        </Text>
        <View style={styles.stateGrid}>
          {['normal', 'active', 'disabled', 'loading'].map((state) => (
            <View key={state} style={styles.exampleItem}>
              <Text style={[styles.exampleItemLabel, { color: theme.colors.neutral.light }]}>
                {state}
              </Text>
              <TabItem
                id={state}
                label={state.charAt(0).toUpperCase() + state.slice(1)}
                variant="default"
                size="medium"
                icon={showIcons ? renderIcon('home') : undefined}
                badge={showBadges ? { content: 3, visible: true } : undefined}
                ripple={{ enabled: showRipple }}
                indicator={{ enabled: showIndicator }}
                active={state === 'active'}
                disabled={state === 'disabled'}
                loading={state === 'loading'}
                onPress={handleTabPress}
                accessibilityLabel={`${state} tab`}
                testID={`tab-item-${state}`}
              />
            </View>
          ))}
        </View>
      </View>

      {/* Interactive Tab Row */}
      <View style={styles.exampleGroup}>
        <Text style={[styles.exampleLabel, { color: theme.colors.neutral.medium }]}>
          Interactive Tab Row
        </Text>
        <View style={styles.tabRow}>
          {['home', 'search', 'favorites', 'profile'].map((id) => (
            <TabItem
              key={id}
              id={id}
              label={id.charAt(0).toUpperCase() + id.slice(1)}
              variant="pill"
              size="medium"
              icon={showIcons ? renderIcon(id) : undefined}
              badge={showBadges ? {
                content: getBadgeContent(id),
                visible: true,
              } : undefined}
              ripple={{ enabled: showRipple }}
              indicator={{ enabled: showIndicator }}
              active={activeTab === id}
              onPress={handleTabPress}
              accessibilityLabel={`${id} tab`}
              testID={`tab-item-${id}`}
            />
          ))}
        </View>
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
  exampleContainer: {
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  exampleItem: {
    alignItems: 'center',
    marginBottom: 15,
  },
  exampleItemLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 8,
    opacity: 0.8,
    textAlign: 'center',
  },
  variantGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  sizeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  badgeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  stateGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  activeTabText: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 8,
    textAlign: 'center',
  },
  tabIcon: {
    fontSize: 16,
  },
});

// ============================================================================
// EXPORTS
// ============================================================================

export default TabItemTest;
