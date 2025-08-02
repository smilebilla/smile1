/**
 * Corp Astro UI Library - Tabs Component
 * Module 128: Tabs.tsx
 * 
 * A sophisticated tabs component with cosmic design aesthetics
 * that provides navigation between different content sections following Corp Astro design system.
 * 
 * Features:
 * - Cosmic tabs styling with gradient backgrounds
 * - Smooth transition animations
 * - Active state indicator with gradient
 * - Responsive design with proper spacing
 * - Keyboard navigation support
 * - Accessibility support with proper ARIA attributes
 * - Theme-aware styling with Corp Astro colors
 * - Customizable tab content and icons
 * 
 * Design System Compliance:
 * - Container height: 48px with cosmic styling
 * - Background: rgba(22,33,62,0.2) with proper opacity
 * - BorderRadius: 24px for container, 20px for items
 * - Padding: 4px container, proper spacing
 * - Active: linear-gradient(135deg, #2E86DE 0%, #54A0FF 100%)
 * - Shadow: 0 4px 12px rgba(46,134,222,0.4)
 * - Typography: Inter font with proper weights
 * - Transitions: cubic-bezier(0.4, 0, 0.2, 1) for smooth animations
 * - Indicator: bottom gradient bar with slide animation
 * 
 * @module Tabs
 * @version 1.0.0
 * @since 2024
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ViewStyle,
  TextStyle,
  AccessibilityProps,
  LayoutChangeEvent,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../foundations/themes/useTheme';
import { SignatureBlues } from '../../foundations/tokens/colors/SignatureBlues';
import { deepSpaceColors } from '../../foundations/tokens/colors/DeepSpaceColors';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  badge?: string | number;
}

export interface TabsProps extends AccessibilityProps {
  /** Array of tab items */
  items: TabItem[];
  /** Currently active tab ID */
  activeId?: string;
  /** Callback when tab is selected */
  onTabSelect?: (id: string) => void;
  /** Whether to show indicator */
  showIndicator?: boolean;
  /** Custom container style */
  containerStyle?: ViewStyle;
  /** Custom tab item style */
  itemStyle?: ViewStyle;
  /** Custom active tab item style */
  activeItemStyle?: ViewStyle;
  /** Custom tab text style */
  textStyle?: TextStyle;
  /** Custom active tab text style */
  activeTextStyle?: TextStyle;
  /** Whether tabs are scrollable */
  scrollable?: boolean;
  /** Test ID for testing */
  testID?: string;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const ANIMATION_DURATION = 300;
const CONTAINER_HEIGHT = 48;
const ITEM_HEIGHT = 40;
const BORDER_RADIUS = 24;
const ITEM_BORDER_RADIUS = 20;

// ============================================================================
// TABS COMPONENT
// ============================================================================

export const Tabs: React.FC<TabsProps> = ({
  items,
  activeId,
  onTabSelect,
  showIndicator = true,
  containerStyle,
  itemStyle,
  activeItemStyle,
  textStyle,
  activeTextStyle,
  scrollable = false,
  testID = 'tabs',
  accessibilityLabel = 'Tab navigation',
  ...accessibilityProps
}) => {
  const theme = useTheme();
  const [currentActiveId, setCurrentActiveId] = useState(activeId || items[0]?.id);
  const [tabLayouts, setTabLayouts] = useState<Record<string, { x: number; width: number }>>({});
  const indicatorAnim = useRef(new Animated.Value(0)).current;
  const indicatorWidthAnim = useRef(new Animated.Value(0)).current;

  // Update active tab when prop changes
  useEffect(() => {
    if (activeId && activeId !== currentActiveId) {
      setCurrentActiveId(activeId);
    }
  }, [activeId, currentActiveId]);

  // Animate indicator when active tab changes
  useEffect(() => {
    const activeLayout = tabLayouts[currentActiveId];
    if (activeLayout && showIndicator) {
      Animated.parallel([
        Animated.timing(indicatorAnim, {
          toValue: activeLayout.x,
          duration: ANIMATION_DURATION,
          useNativeDriver: false,
        }),
        Animated.timing(indicatorWidthAnim, {
          toValue: activeLayout.width,
          duration: ANIMATION_DURATION,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [currentActiveId, tabLayouts, showIndicator, indicatorAnim, indicatorWidthAnim]);

  // Handle tab selection
  const handleTabSelect = (id: string) => {
    if (id !== currentActiveId) {
      setCurrentActiveId(id);
      if (onTabSelect) {
        onTabSelect(id);
      }
    }
  };

  // Handle tab layout measurement
  const handleTabLayout = (id: string, event: LayoutChangeEvent) => {
    const { x, width } = event.nativeEvent.layout;
    setTabLayouts(prev => ({
      ...prev,
      [id]: { x, width },
    }));
  };

  // Render tab item
  const renderTabItem = (item: TabItem, index: number) => {
    const isActive = item.id === currentActiveId;
    const isDisabled = item.disabled || false;

    return (
      <TouchableOpacity
        key={item.id}
        style={[
          styles.tabItem,
          itemStyle,
          isActive && activeItemStyle,
          isDisabled && styles.disabledItem,
        ]}
        onPress={() => !isDisabled && handleTabSelect(item.id)}
        onLayout={(event) => handleTabLayout(item.id, event)}
        disabled={isDisabled}
        accessibilityLabel={`${item.label} tab`}
        accessibilityRole="tab"
        accessibilityState={{ selected: isActive, disabled: isDisabled }}
        testID={`${testID}-item-${item.id}`}
      >
        {isActive ? (
          <LinearGradient
            colors={['#2E86DE', '#54A0FF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.activeTabGradient}
          >
            <View style={styles.tabContent}>
              {item.icon && (
                <View style={styles.tabIcon}>
                  {item.icon}
                </View>
              )}
              <Text
                style={[
                  styles.tabText,
                  styles.activeTabText,
                  textStyle,
                  activeTextStyle,
                ]}
              >
                {item.label}
              </Text>
              {item.badge && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{item.badge}</Text>
                </View>
              )}
            </View>
          </LinearGradient>
        ) : (
          <View style={styles.tabContent}>
            {item.icon && (
              <View style={styles.tabIcon}>
                {item.icon}
              </View>
            )}
            <Text
              style={[
                styles.tabText,
                styles.inactiveTabText,
                textStyle,
                isDisabled && styles.disabledText,
              ]}
            >
              {item.label}
            </Text>
            {item.badge && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.badge}</Text>
              </View>
            )}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  // Render indicator
  const renderIndicator = () => {
    if (!showIndicator) return null;

    return (
      <Animated.View
        style={[
          styles.indicator,
          {
            left: indicatorAnim,
            width: indicatorWidthAnim,
          },
        ]}
      >
        <LinearGradient
          colors={['#2E86DE', '#54A0FF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.indicatorGradient}
        />
      </Animated.View>
    );
  };

  return (
    <View
      style={[styles.container, containerStyle]}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="tablist"
      {...accessibilityProps}
    >
      <View style={styles.tabsContainer}>
        {items.map((item, index) => renderTabItem(item, index))}
      </View>
      {renderIndicator()}
    </View>
  );
};

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  container: {
    height: CONTAINER_HEIGHT,
    backgroundColor: 'rgba(22,33,62,0.2)',
    borderRadius: BORDER_RADIUS,
    padding: 4,
    position: 'relative',
  },
  tabsContainer: {
    flexDirection: 'row',
    height: '100%',
    gap: 4,
  },
  tabItem: {
    flex: 1,
    height: ITEM_HEIGHT,
    borderRadius: ITEM_BORDER_RADIUS,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  activeTabGradient: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: ITEM_BORDER_RADIUS,
    shadowColor: '#2E86DE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 12,
  },
  tabIcon: {
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  activeTabText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  inactiveTabText: {
    color: '#B8B8C0',
  },
  disabledItem: {
    opacity: 0.5,
  },
  disabledText: {
    color: '#666666',
  },
  badge: {
    backgroundColor: '#EF4444',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  indicator: {
    position: 'absolute',
    bottom: 4,
    height: 3,
    borderRadius: 3,
    overflow: 'hidden',
  },
  indicatorGradient: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

// ============================================================================
// HOOKS
// ============================================================================

export const useTabs = (items: TabItem[], initialActiveId?: string) => {
  const [activeId, setActiveId] = useState(initialActiveId || items[0]?.id);

  const selectTab = (id: string) => {
    setActiveId(id);
  };

  const getActiveTab = () => {
    return items.find(item => item.id === activeId);
  };

  const getActiveIndex = () => {
    return items.findIndex(item => item.id === activeId);
  };

  const selectNext = () => {
    const currentIndex = getActiveIndex();
    const nextIndex = (currentIndex + 1) % items.length;
    setActiveId(items[nextIndex].id);
  };

  const selectPrevious = () => {
    const currentIndex = getActiveIndex();
    const prevIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
    setActiveId(items[prevIndex].id);
  };

  return {
    activeId,
    selectTab,
    getActiveTab,
    getActiveIndex,
    selectNext,
    selectPrevious,
  };
};

// ============================================================================
// EXPORTS
// ============================================================================

export default Tabs;
