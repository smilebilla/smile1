/**
 * Corp Astro UI Library - Bottom Navigation Component
 * 
 * A comprehensive bottom navigation component that provides primary navigation
 * for Corp Astro applications with cosmic design aesthetics and professional functionality.
 * 
 * Features:
 * - Configurable navigation items with icons and labels
 * - Active state management with cosmic visual feedback
 * - Floating orb support for premium features
 * - Blur and glass morphism effects
 * - Accessibility compliant with proper ARIA attributes
 * - Smooth animations and transitions
 * - Theme-aware styling with Corp Astro design system
 * 
 * @module BottomNavigation
 * @version 1.0.0
 * @since 2024
 * 
 * UI Documentation Reference:
 * - Design System: Bottom navigation patterns and cosmic aesthetics
 * - Navigation Components: Bottom navigation implementation
 * - Accessibility: Navigation accessibility requirements
 */

import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Animated,
  Platform,
  AccessibilityInfo,
  ColorValue,
} from 'react-native';
import { useTheme } from '../../../foundations/themes';
import { CorpAstroTheme } from '../../../foundations/themes/DarkTheme';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Navigation item configuration interface
 */
export interface NavigationItem {
  /** Unique identifier for the navigation item */
  id: string;
  /** Display label for the navigation item */
  label: string;
  /** Icon component or icon name */
  icon?: React.ComponentType<any> | string;
  /** Badge count for notifications (optional) */
  badge?: number;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Custom accessibility label */
  accessibilityLabel?: string;
  /** Custom test ID for testing */
  testID?: string;
  /** Custom press handler */
  onPress?: () => void;
}

/**
 * Bottom navigation configuration interface
 */
export interface BottomNavigationProps {
  /** Array of navigation items */
  items: NavigationItem[];
  /** Currently active item ID */
  activeItemId?: string;
  /** Callback for navigation item selection */
  onItemSelect?: (itemId: string) => void;
  /** Whether to show labels (default: true) */
  showLabels?: boolean;
  /** Whether to show badges (default: true) */
  showBadges?: boolean;
  /** Navigation variant */
  variant?: 'default' | 'floating' | 'blur' | 'compact';
  /** Background opacity (0-1) */
  backgroundOpacity?: number;
  /** Whether to show floating orb for premium features */
  showFloatingOrb?: boolean;
  /** Floating orb configuration */
  floatingOrb?: {
    position?: 'center' | 'right';
    icon?: React.ComponentType<any> | string;
    onPress?: () => void;
    premium?: boolean;
  };
  /** Safe area handling */
  safeAreaInsets?: {
    bottom?: number;
    left?: number;
    right?: number;
  };
  /** Custom styling */
  style?: ViewStyle;
  /** Custom content styling */
  contentStyle?: ViewStyle;
  /** Custom item styling */
  itemStyle?: ViewStyle;
  /** Custom label styling */
  labelStyle?: TextStyle;
  /** Whether the navigation is hidden */
  hidden?: boolean;
  /** Animation configuration */
  animation?: {
    enabled?: boolean;
    duration?: number;
    easing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';
  };
  /** Accessibility configuration */
  accessibility?: {
    enabled?: boolean;
    announceSelection?: boolean;
    navigationLabel?: string;
  };
  /** Test ID for testing */
  testID?: string;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Create navigation bar styles based on theme and configuration
 */
const createNavigationStyles = (
  theme: CorpAstroTheme,
  config: {
    variant?: 'default' | 'floating' | 'blur' | 'compact';
    backgroundOpacity?: number;
    safeAreaInsets?: { bottom?: number; left?: number; right?: number; };
  }
): { container: ViewStyle; content: ViewStyle; item: ViewStyle; label: TextStyle } => {
  const { variant = 'default', backgroundOpacity = 0.95, safeAreaInsets } = config;
  
  const baseBackgroundColor = theme.colors.cosmos.deep;
  const blurBackgroundColor = `${String(baseBackgroundColor)}${Math.round(backgroundOpacity * 255).toString(16).padStart(2, '0')}`;
  
  return {
    container: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: variant === 'blur' ? blurBackgroundColor : baseBackgroundColor,
      borderTopWidth: 1,
      borderTopColor: `${String(theme.colors.brand.primary)}20`,
      paddingBottom: safeAreaInsets?.bottom || 0,
      paddingLeft: safeAreaInsets?.left || 0,
      paddingRight: safeAreaInsets?.right || 0,
      elevation: variant === 'floating' ? 8 : 4,
      shadowColor: theme.colors.cosmos.void,
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      ...(variant === 'blur' && {
        backdropFilter: 'blur(20px)',
      }),
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingHorizontal: 16,
      paddingVertical: variant === 'compact' ? 8 : 12,
      minHeight: variant === 'compact' ? 56 : 90,
      // Inner container height specification per UI Documentation
      ...(variant === 'floating' && {
        height: 70,
        marginHorizontal: 20,
        borderRadius: 35,
        backgroundColor: 'rgba(22,33,62,0.3)',
        borderWidth: 1,
        borderColor: 'rgba(46,134,222,0.2)',
        backdropFilter: 'blur(20px)',
      }),
    },
    item: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 8,
      paddingHorizontal: 4,
      borderRadius: 8,
      minHeight: 40,
    },
    label: {
      fontSize: variant === 'compact' ? 10 : 12,
      fontWeight: '500',
      color: theme.colors.neutral.text,
      marginTop: 4,
      textAlign: 'center',
    },
  };
};

/**
 * Create active item indicator styles
 */
const createActiveIndicatorStyles = (
  theme: CorpAstroTheme,
  animated: boolean = true
): ViewStyle => ({
  position: 'absolute',
  top: -2,
  left: '50%',
  transform: [{ translateX: -12 }],
  width: 24,
  height: 3,
  backgroundColor: theme.colors.brand.primary,
  borderRadius: 2,
  shadowColor: theme.colors.brand.glow,
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.8,
  shadowRadius: 4,
  elevation: 2,
  ...(animated && {
    opacity: 1,
  }),
});

// ============================================================================
// BOTTOM NAVIGATION COMPONENT
// ============================================================================

/**
 * Bottom Navigation Component
 * 
 * Primary navigation component for Corp Astro applications with cosmic design
 * and comprehensive functionality including floating orb support.
 * 
 * @param props - Bottom navigation configuration
 * @returns React component
 * 
 * @example
 * ```tsx
 * import { BottomNavigation } from '@/composite/navigation/bottom/BottomNavigation';
 * 
 * const navigationItems = [
 *   { id: 'dashboard', label: 'Dashboard', icon: 'home' },
 *   { id: 'insights', label: 'Insights', icon: 'analytics' },
 *   { id: 'profile', label: 'Profile', icon: 'user' },
 * ];
 * 
 * function AppNavigation() {
 *   const [activeId, setActiveId] = useState('dashboard');
 *   
 *   return (
 *     <BottomNavigation
 *       items={navigationItems}
 *       activeItemId={activeId}
 *       onItemSelect={setActiveId}
 *       showFloatingOrb={true}
 *       floatingOrb={{
 *         position: 'center',
 *         icon: 'star',
 *         premium: true,
 *         onPress: () => console.log('Premium feature')
 *       }}
 *     />
 *   );
 * }
 * ```
 */
export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  items,
  activeItemId,
  onItemSelect,
  showLabels = true,
  showBadges = true,
  variant = 'default',
  backgroundOpacity = 0.95,
  showFloatingOrb = false,
  floatingOrb,
  safeAreaInsets,
  style,
  contentStyle,
  itemStyle,
  labelStyle,
  hidden = false,
  animation = { enabled: true, duration: 200, easing: 'ease-out' },
  accessibility = { enabled: true, announceSelection: true, navigationLabel: 'Bottom Navigation' },
  testID = 'corp-astro-bottom-navigation',
}) => {
  const { theme } = useTheme();
  const [animatedValue] = useState(new Animated.Value(hidden ? 0 : 1));
  
  // Memoized styles
  const styles = useMemo(() => createNavigationStyles(theme, {
    variant,
    backgroundOpacity,
    safeAreaInsets,
  }), [theme, variant, backgroundOpacity, safeAreaInsets]);
  
  // Handle item selection
  const handleItemSelect = useCallback((itemId: string) => {
    if (accessibility.announceSelection) {
      const item = items.find(item => item.id === itemId);
      if (item) {
        AccessibilityInfo.announceForAccessibility(`${item.label} selected`);
      }
    }
    
    onItemSelect?.(itemId);
  }, [items, onItemSelect, accessibility.announceSelection]);
  
  // Handle floating orb press
  const handleFloatingOrbPress = useCallback(() => {
    if (floatingOrb?.onPress) {
      floatingOrb.onPress();
    }
  }, [floatingOrb]);
  
  // Navigation visibility animation
  React.useEffect(() => {
    if (animation.enabled) {
      Animated.timing(animatedValue, {
        toValue: hidden ? 0 : 1,
        duration: animation.duration || 200,
        useNativeDriver: true,
      }).start();
    }
  }, [hidden, animatedValue, animation]);
  
  // Render navigation item
  const renderNavigationItem = useCallback((item: NavigationItem) => {
    const isActive = activeItemId === item.id;
    const isDisabled = item.disabled || false;
    
    const itemStyles: ViewStyle = {
      ...styles.item,
      opacity: isDisabled ? 0.5 : 1,
      backgroundColor: isActive ? `${String(theme.colors.brand.primary)}10` : 'transparent',
      ...itemStyle,
    };
    
    const labelStyles: TextStyle = {
      ...styles.label,
      color: isActive ? theme.colors.brand.primary : theme.colors.neutral.text,
      ...labelStyle,
    };
    
    return (
      <TouchableOpacity
        key={item.id}
        style={itemStyles}
        onPress={() => !isDisabled && (item.onPress?.() || handleItemSelect(item.id))}
        disabled={isDisabled}
        accessible={accessibility.enabled}
        accessibilityRole="tab"
        accessibilityLabel={item.accessibilityLabel || item.label}
        accessibilityState={{ selected: isActive, disabled: isDisabled }}
        testID={item.testID || `${testID}-item-${item.id}`}
      >
        {isActive && (
          <View style={createActiveIndicatorStyles(theme, animation.enabled)} />
        )}
        
        {/* Icon placeholder - would be replaced with actual icon component */}
        {item.icon && (
          <View style={{
            width: 24,
            height: 24,
            backgroundColor: isActive ? theme.colors.brand.primary : theme.colors.neutral.text,
            borderRadius: 12,
            marginBottom: showLabels ? 4 : 0,
          }} />
        )}
        
        {/* Badge */}
        {showBadges && item.badge && item.badge > 0 && (
          <View style={{
            position: 'absolute',
            top: item.icon ? 4 : 8,
            right: item.icon ? 8 : 16,
            minWidth: 16,
            height: 16,
            backgroundColor: theme.colors.luxury.pure,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 4,
          }}>
            <Text style={{
              fontSize: 10,
              fontWeight: '600',
              color: theme.colors.cosmos.void,
            }}>
              {item.badge > 99 ? '99+' : item.badge}
            </Text>
          </View>
        )}
        
        {/* Label */}
        {showLabels && (
          <Text style={labelStyles} numberOfLines={1}>
            {item.label}
          </Text>
        )}
      </TouchableOpacity>
    );
  }, [
    activeItemId,
    styles,
    theme,
    itemStyle,
    labelStyle,
    showLabels,
    showBadges,
    handleItemSelect,
    accessibility,
    testID,
    animation,
  ]);
  
  // Render floating orb
  const renderFloatingOrb = useCallback(() => {
    if (!showFloatingOrb || !floatingOrb) return null;
    
    const orbPosition = floatingOrb.position || 'center';
    const orbStyles: ViewStyle = {
      position: 'absolute',
      bottom: 20,
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: floatingOrb.premium ? theme.colors.luxury.pure : theme.colors.brand.primary,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 8,
      shadowColor: floatingOrb.premium ? theme.colors.luxury.pure : theme.colors.brand.glow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.6,
      shadowRadius: 8,
      ...(orbPosition === 'center' && {
        left: '50%',
        transform: [{ translateX: -28 }],
      }),
      ...(orbPosition === 'right' && {
        right: 20,
      }),
    };
    
    return (
      <TouchableOpacity
        style={orbStyles}
        onPress={handleFloatingOrbPress}
        accessible={accessibility.enabled}
        accessibilityRole="button"
        accessibilityLabel={floatingOrb.premium ? 'Premium Feature' : 'Floating Action'}
        testID={`${testID}-floating-orb`}
      >
        {/* Orb icon placeholder */}
        <View style={{
          width: 24,
          height: 24,
          backgroundColor: theme.colors.cosmos.void,
          borderRadius: 12,
        }} />
        
        {/* Premium indicator */}
        {floatingOrb.premium && (
          <View style={{
            position: 'absolute',
            top: -2,
            right: -2,
            width: 16,
            height: 16,
            backgroundColor: theme.colors.luxury.shimmer,
            borderRadius: 8,
            borderWidth: 2,
            borderColor: theme.colors.cosmos.deep,
          }} />
        )}
      </TouchableOpacity>
    );
  }, [showFloatingOrb, floatingOrb, theme, handleFloatingOrbPress, accessibility, testID]);
  
  if (hidden && !animation.enabled) {
    return null;
  }
  
  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: animatedValue,
          transform: [
            {
              translateY: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [100, 0],
              }),
            },
          ],
        },
        style,
      ]}
      accessible={accessibility.enabled}
      accessibilityRole="tablist"
      accessibilityLabel={accessibility.navigationLabel}
      testID={testID}
      collapsable={false}
    >
      <View style={[styles.content, contentStyle]}>
        {items?.map((item, index) => (
          <View key={item.id || index}>
            {renderNavigationItem(item)}
          </View>
        )) || []}
      </View>
      
      {renderFloatingOrb()}
    </Animated.View>
  );
};

// ============================================================================
// EXPORTS
// ============================================================================

export default BottomNavigation;
