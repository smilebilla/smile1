/**
 * Corp Astro UI Library - Tab Navigation Component
 * 
 * Professional tab navigation component providing comprehensive tab system
 * for Corp Astro applications with theme integration and space-inspired design.
 * Creates immersive navigation experiences with smooth animations and intelligent features.
 * 
 * Features:
 * - Horizontal and vertical tab navigation layouts
 * - Multiple tab navigation variants and styles
 * - Tab indicators with smooth animations
 * - Scrollable tab containers for overflow handling
 * - Badge system for tab notifications
 * - Icon and text support for tab items
 * - Active state management and visual feedback
 * - Gesture support for swipe navigation
 * - Theme-aware styling with Corp Astro design tokens
 * - Responsive design with adaptive sizing
 * - Smooth animations and transitions
 * - Accessibility compliance with ARIA attributes
 * - Platform-specific optimizations
 * - Custom styling and theming
 * 
 * @module TabNavigation
 * @version 1.0.0
 * @author Corp Astro Design System
 * @since 2024
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Platform,
  ViewStyle,
  TextStyle,
  ColorValue,
  Dimensions,
  PanResponder,
  GestureResponderEvent,
  PanResponderGestureState,
  LayoutChangeEvent,
} from 'react-native';
import { useTheme } from '../../../foundations/themes/useTheme';
import { deepSpaceColors } from '../../../foundations/tokens/colors/DeepSpaceColors';
import { SignatureBlues } from '../../../foundations/tokens/colors/SignatureBlues';
import { LuxuryGolds } from '../../../foundations/tokens/colors/LuxuryGolds';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Tab navigation variants
 */
export type TabNavigationVariant = 'default' | 'pills' | 'underline' | 'card' | 'segmented';

/**
 * Tab navigation sizes
 */
export type TabNavigationSize = 'small' | 'medium' | 'large';

/**
 * Tab navigation orientations
 */
export type TabNavigationOrientation = 'horizontal' | 'vertical';

/**
 * Tab navigation animation types
 */
export type TabNavigationAnimation = 'fade' | 'slide' | 'scale' | 'elastic' | 'none';

/**
 * Tab navigation alignment
 */
export type TabNavigationAlignment = 'start' | 'center' | 'end' | 'stretch';

/**
 * Tab item configuration
 */
export interface TabNavigationItem {
  /** Tab identifier */
  id: string;
  /** Tab label */
  label: string;
  /** Tab icon */
  icon?: React.ReactNode;
  /** Tab badge */
  badge?: string | number;
  /** Tab disabled state */
  disabled?: boolean;
  /** Tab hidden state */
  hidden?: boolean;
  /** Tab accessibility label */
  accessibilityLabel?: string;
  /** Tab test identifier */
  testID?: string;
  /** Tab custom content */
  content?: React.ReactNode;
  /** Tab press handler */
  onPress?: () => void;
  /** Tab long press handler */
  onLongPress?: () => void;
}

/**
 * Tab navigation indicator configuration
 */
export interface TabNavigationIndicator {
  /** Enable indicator */
  enabled?: boolean;
  /** Indicator style */
  style?: 'line' | 'pill' | 'dot' | 'custom';
  /** Indicator color */
  color?: ColorValue;
  /** Indicator width */
  width?: number;
  /** Indicator height */
  height?: number;
  /** Indicator border radius */
  borderRadius?: number;
  /** Indicator animation duration */
  animationDuration?: number;
  /** Indicator offset */
  offset?: number;
  /** Custom indicator component */
  component?: React.ReactNode;
}

/**
 * Tab navigation gesture configuration
 */
export interface TabNavigationGesture {
  /** Enable swipe gestures */
  enabled?: boolean;
  /** Swipe threshold */
  threshold?: number;
  /** Swipe velocity threshold */
  velocityThreshold?: number;
  /** Swipe direction */
  direction?: 'horizontal' | 'vertical' | 'both';
  /** Swipe handler */
  onSwipe?: (direction: 'left' | 'right' | 'up' | 'down') => void;
}

/**
 * Tab navigation scroll configuration
 */
export interface TabNavigationScroll {
  /** Enable scrolling */
  enabled?: boolean;
  /** Show scroll indicators */
  showIndicators?: boolean;
  /** Scroll to center active tab */
  centerActiveTab?: boolean;
  /** Scroll animation duration */
  animationDuration?: number;
  /** Scroll threshold */
  threshold?: number;
}

/**
 * Tab navigation properties
 */
export interface TabNavigationProps {
  /** Tab navigation variant */
  variant?: TabNavigationVariant;
  /** Tab navigation size */
  size?: TabNavigationSize;
  /** Tab navigation orientation */
  orientation?: TabNavigationOrientation;
  /** Tab navigation animation */
  animation?: TabNavigationAnimation;
  /** Tab navigation alignment */
  alignment?: TabNavigationAlignment;
  /** Tab navigation items */
  items: TabNavigationItem[];
  /** Active tab index */
  activeIndex?: number;
  /** Tab navigation indicator */
  indicator?: TabNavigationIndicator;
  /** Tab navigation gesture */
  gesture?: TabNavigationGesture;
  /** Tab navigation scroll */
  scroll?: TabNavigationScroll;
  /** Tab navigation background color */
  backgroundColor?: ColorValue;
  /** Tab navigation border color */
  borderColor?: ColorValue;
  /** Tab navigation accent color */
  accentColor?: ColorValue;
  /** Tab navigation text color */
  textColor?: ColorValue;
  /** Tab navigation active text color */
  activeTextColor?: ColorValue;
  /** Tab navigation disabled state */
  disabled?: boolean;
  /** Tab navigation loading state */
  loading?: boolean;
  /** Tab navigation error state */
  error?: boolean;
  /** Tab navigation success state */
  success?: boolean;
  /** Tab navigation focused state */
  focused?: boolean;
  /** Tab navigation visible state */
  visible?: boolean;
  /** Tab navigation accessibility label */
  accessibilityLabel?: string;
  /** Tab navigation accessibility hint */
  accessibilityHint?: string;
  /** Tab navigation test identifier */
  testID?: string;
  /** Tab navigation style override */
  style?: ViewStyle;
  /** Tab navigation content style */
  contentStyle?: ViewStyle;
  /** Tab navigation tab style */
  tabStyle?: ViewStyle;
  /** Tab navigation children */
  children?: React.ReactNode;
  /** Tab change handler */
  onTabChange?: (index: number, item: TabNavigationItem) => void;
  /** Tab press handler */
  onTabPress?: (index: number, item: TabNavigationItem) => void;
  /** Tab long press handler */
  onTabLongPress?: (index: number, item: TabNavigationItem) => void;
  /** Tab navigation layout handler */
  onLayout?: (event: LayoutChangeEvent) => void;
  /** Tab navigation mount handler */
  onMount?: () => void;
  /** Tab navigation unmount handler */
  onUnmount?: () => void;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const TAB_HEIGHTS = {
  small: 40,
  medium: 48,
  large: 56,
};

const TAB_WIDTHS = {
  small: 80,
  medium: 100,
  large: 120,
};

const ANIMATION_DURATIONS = {
  fast: 150,
  normal: 250,
  slow: 350,
};

const SWIPE_THRESHOLD = 50;
const SWIPE_VELOCITY_THRESHOLD = 0.3;

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * TabNavigation component providing comprehensive tab navigation
 * with theme integration and space-inspired design.
 */
export const TabNavigation: React.FC<TabNavigationProps> = ({
  variant = 'default',
  size = 'medium',
  orientation = 'horizontal',
  animation = 'slide',
  alignment = 'center',
  items,
  activeIndex = 0,
  indicator = { enabled: true, style: 'line' },
  gesture = { enabled: false },
  scroll = { enabled: true },
  backgroundColor,
  borderColor,
  accentColor,
  textColor,
  activeTextColor,
  disabled = false,
  loading = false,
  error = false,
  success = false,
  focused = false,
  visible = true,
  accessibilityLabel,
  accessibilityHint,
  testID,
  style,
  contentStyle,
  tabStyle,
  children,
  onTabChange,
  onTabPress,
  onTabLongPress,
  onLayout,
  onMount,
  onUnmount,
}) => {
  // ============================================================================
  // HOOKS
  // ============================================================================

  const theme = useTheme();
  const scrollViewRef = useRef<ScrollView>(null);
  const animationValue = useRef(new Animated.Value(visible ? 1 : 0)).current;
  const indicatorPosition = useRef(new Animated.Value(0)).current;
  const indicatorWidth = useRef(new Animated.Value(0)).current;
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [currentIndex, setCurrentIndex] = useState(activeIndex);
  const [tabLayouts, setTabLayouts] = useState<{ [key: string]: any }>({});
  const [containerLayout, setContainerLayout] = useState({ width: 0, height: 0 });
  const [isPressed, setIsPressed] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState<number | null>(null);

  // ============================================================================
  // ANIMATIONS
  // ============================================================================

  const animateIn = useCallback(() => {
    const duration = ANIMATION_DURATIONS.normal;

    Animated.timing(animationValue, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    }).start();
  }, [animationValue]);

  const animateOut = useCallback(() => {
    const duration = ANIMATION_DURATIONS.normal;

    Animated.timing(animationValue, {
      toValue: 0,
      duration,
      useNativeDriver: true,
    }).start();
  }, [animationValue]);

  const animateIndicator = useCallback((index: number) => {
    if (!indicator.enabled) return;

    const tabLayout = tabLayouts[items[index]?.id];
    if (!tabLayout) return;

    const position = orientation === 'horizontal' ? tabLayout.x : tabLayout.y;
    const width = orientation === 'horizontal' ? tabLayout.width : tabLayout.height;
    const duration = indicator.animationDuration || ANIMATION_DURATIONS.normal;

    Animated.parallel([
      Animated.timing(indicatorPosition, {
        toValue: position,
        duration,
        useNativeDriver: false,
      }),
      Animated.timing(indicatorWidth, {
        toValue: width,
        duration,
        useNativeDriver: false,
      }),
    ]).start();
  }, [indicator, tabLayouts, items, orientation, indicatorPosition, indicatorWidth]);

  // ============================================================================
  // GESTURE HANDLERS
  // ============================================================================

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      if (!gesture.enabled) return false;
      
      const { dx, dy } = gestureState;
      const threshold = gesture.threshold || SWIPE_THRESHOLD;
      
      if (orientation === 'horizontal') {
        return Math.abs(dx) > threshold && Math.abs(dy) < threshold;
      } else {
        return Math.abs(dy) > threshold && Math.abs(dx) < threshold;
      }
    },
    
    onPanResponderGrant: () => {
      // Gesture started
    },
    
    onPanResponderMove: (evt, gestureState) => {
      // Handle gesture movement
    },
    
    onPanResponderRelease: (evt, gestureState) => {
      const { dx, dy, vx, vy } = gestureState;
      const velocityThreshold = gesture.velocityThreshold || SWIPE_VELOCITY_THRESHOLD;
      
      let direction: 'left' | 'right' | 'up' | 'down' | null = null;
      
      if (orientation === 'horizontal') {
        if (Math.abs(vx) > velocityThreshold) {
          direction = vx > 0 ? 'right' : 'left';
        } else if (Math.abs(dx) > (gesture.threshold || SWIPE_THRESHOLD)) {
          direction = dx > 0 ? 'right' : 'left';
        }
      } else {
        if (Math.abs(vy) > velocityThreshold) {
          direction = vy > 0 ? 'down' : 'up';
        } else if (Math.abs(dy) > (gesture.threshold || SWIPE_THRESHOLD)) {
          direction = dy > 0 ? 'down' : 'up';
        }
      }
      
      if (direction) {
        handleSwipe(direction);
      }
    },
  });

  const handleSwipe = (direction: 'left' | 'right' | 'up' | 'down') => {
    gesture.onSwipe?.(direction);
    
    let newIndex = currentIndex;
    
    if (orientation === 'horizontal') {
      if (direction === 'left') {
        newIndex = Math.min(currentIndex + 1, items.length - 1);
      } else if (direction === 'right') {
        newIndex = Math.max(currentIndex - 1, 0);
      }
    } else {
      if (direction === 'up') {
        newIndex = Math.min(currentIndex + 1, items.length - 1);
      } else if (direction === 'down') {
        newIndex = Math.max(currentIndex - 1, 0);
      }
    }
    
    if (newIndex !== currentIndex) {
      handleTabChange(newIndex);
    }
  };

  // ============================================================================
  // HANDLERS
  // ============================================================================

  const handleTabChange = (index: number) => {
    if (disabled || loading || items[index]?.disabled) return;
    
    setCurrentIndex(index);
    animateIndicator(index);
    
    if (scroll.enabled && scroll.centerActiveTab) {
      scrollToTab(index);
    }
    
    const item = items[index];
    onTabChange?.(index, item);
  };

  const handleTabPress = (index: number) => {
    if (disabled || loading || items[index]?.disabled) return;
    
    setIsPressed(index);
    
    const item = items[index];
    item.onPress?.();
    onTabPress?.(index, item);
    
    if (index !== currentIndex) {
      handleTabChange(index);
    }
    
    setTimeout(() => setIsPressed(null), 150);
  };

  const handleTabLongPress = (index: number) => {
    if (disabled || loading || items[index]?.disabled) return;
    
    const item = items[index];
    item.onLongPress?.();
    onTabLongPress?.(index, item);
  };

  const handleTabLayout = (index: number, layout: any) => {
    const item = items[index];
    if (!item) return;
    
    setTabLayouts(prev => ({
      ...prev,
      [item.id]: layout,
    }));
  };

  const handleContainerLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setContainerLayout({ width, height });
    onLayout?.(event);
  };

  const scrollToTab = (index: number) => {
    if (!scrollViewRef.current) return;
    
    const tabLayout = tabLayouts[items[index]?.id];
    if (!tabLayout) return;
    
    const containerWidth = containerLayout.width;
    const tabWidth = tabLayout.width;
    const tabX = tabLayout.x;
    
    const scrollX = Math.max(0, tabX - (containerWidth - tabWidth) / 2);
    
    scrollViewRef.current.scrollTo({
      x: scrollX,
      y: 0,
      animated: true,
    });
  };

  const handleDimensionsChange = ({ window }: { window: any }) => {
    setDimensions(window);
  };

  // ============================================================================
  // EFFECTS
  // ============================================================================

  useEffect(() => {
    onMount?.();
    
    const subscription = Dimensions.addEventListener('change', handleDimensionsChange);
    
    return () => {
      subscription?.remove();
      onUnmount?.();
    };
  }, []);

  useEffect(() => {
    if (visible) {
      animateIn();
    } else {
      animateOut();
    }
  }, [visible, animateIn, animateOut]);

  useEffect(() => {
    if (activeIndex !== currentIndex) {
      setCurrentIndex(activeIndex);
      animateIndicator(activeIndex);
    }
  }, [activeIndex, currentIndex, animateIndicator]);

  useEffect(() => {
    if (Object.keys(tabLayouts).length > 0) {
      animateIndicator(currentIndex);
    }
  }, [tabLayouts, currentIndex, animateIndicator]);

  // ============================================================================
  // STYLES
  // ============================================================================

  const getContainerStyle = (): ViewStyle => ({
    flexDirection: orientation === 'horizontal' ? 'row' : 'column',
    backgroundColor: backgroundColor || getBackgroundColor(),
    borderColor: borderColor || getBorderColor(),
    ...getVariantStyle(),
    ...getSizeStyle(),
    ...getAlignmentStyle(),
    ...getStateStyle(),
    ...style,
  });

  const getContentStyle = (): ViewStyle => ({
    flexDirection: orientation === 'horizontal' ? 'row' : 'column',
    ...contentStyle,
  });

  const getTabStyle = (index: number): ViewStyle => ({
    ...getBaseTabStyle(),
    ...getTabStateStyle(index),
    ...tabStyle,
  });

  const getTabTextStyle = (index: number): TextStyle => ({
    ...getBaseTabTextStyle(),
    ...getTabTextStateStyle(index),
  });

  const getIndicatorStyle = (): ViewStyle => {
    if (!indicator.enabled) return {};
    
    return {
      position: 'absolute',
      backgroundColor: indicator.color || accentColor || theme.colors.brand.primary,
      width: orientation === 'horizontal' ? indicatorWidth : (indicator.width || 3),
      height: orientation === 'horizontal' ? (indicator.height || 3) : indicatorWidth,
      borderRadius: indicator.borderRadius || 1.5,
      bottom: orientation === 'horizontal' ? (indicator.offset || 0) : undefined,
      left: orientation === 'horizontal' ? indicatorPosition : (indicator.offset || 0),
      top: orientation === 'vertical' ? indicatorPosition : undefined,
      right: orientation === 'vertical' ? undefined : undefined,
    };
  };

  const getAnimatedStyle = (): ViewStyle => ({
    opacity: animationValue,
    transform: [
      {
        scale: animation === 'scale' ? animationValue : 1,
      },
    ],
  });

  const getBackgroundColor = (): ColorValue => {
    if (variant === 'pills') {
      return theme.colors.cosmos.medium;
    }
    
    if (variant === 'card') {
      return theme.colors.cosmos.deep;
    }
    
    return 'transparent';
  };

  const getBorderColor = (): ColorValue => {
    if (error) {
      return theme.colors.mystical.deep;
    }
    
    if (success) {
      return theme.colors.luxury.pure;
    }
    
    if (focused) {
      return theme.colors.brand.primary;
    }
    
    return theme.colors.neutral.medium;
  };

  const getVariantStyle = (): ViewStyle => {
    const styles: ViewStyle = {};
    
    if (variant === 'pills') {
      styles.borderRadius = 25;
      styles.padding = 4;
    } else if (variant === 'card') {
      styles.borderRadius = 12;
      styles.padding = 8;
      styles.shadowColor = theme.colors.cosmos.void;
      styles.shadowOffset = { width: 0, height: 2 };
      styles.shadowOpacity = 0.1;
      styles.shadowRadius = 4;
      styles.elevation = 4;
    } else if (variant === 'underline') {
      styles.borderBottomWidth = 1;
      styles.borderBottomColor = theme.colors.neutral.medium;
    }
    
    return styles;
  };

  const getSizeStyle = (): ViewStyle => {
    const styles: ViewStyle = {};
    
    if (orientation === 'horizontal') {
      styles.height = TAB_HEIGHTS[size];
    } else {
      styles.width = TAB_WIDTHS[size];
    }
    
    return styles;
  };

  const getAlignmentStyle = (): ViewStyle => {
    const styles: ViewStyle = {};
    
    if (alignment === 'start') {
      styles.justifyContent = 'flex-start';
    } else if (alignment === 'center') {
      styles.justifyContent = 'center';
    } else if (alignment === 'end') {
      styles.justifyContent = 'flex-end';
    } else if (alignment === 'stretch') {
      styles.justifyContent = 'space-between';
    }
    
    return styles;
  };

  const getStateStyle = (): ViewStyle => {
    const styles: ViewStyle = {};
    
    if (disabled) {
      styles.opacity = 0.5;
    }
    
    if (loading) {
      styles.opacity = 0.8;
    }
    
    return styles;
  };

  const getBaseTabStyle = (): ViewStyle => ({
    flex: alignment === 'stretch' ? 1 : 0,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: variant === 'pills' ? 20 : 0,
    marginHorizontal: variant === 'pills' ? 2 : 0,
    marginVertical: variant === 'pills' ? 2 : 0,
  });

  const getTabStateStyle = (index: number): ViewStyle => {
    const styles: ViewStyle = {};
    const isActive = index === currentIndex;
    const isDisabled = items[index]?.disabled;
    const isCurrentPressed = isPressed === index;
    const isCurrentHovered = isHovered === index;
    
    if (isActive) {
      if (variant === 'pills') {
        styles.backgroundColor = theme.colors.brand.primary;
      } else if (variant === 'card') {
        styles.backgroundColor = theme.colors.cosmos.medium;
      }
    }
    
    if (isCurrentPressed) {
      styles.opacity = 0.8;
    }
    
    if (isCurrentHovered) {
      styles.opacity = 0.9;
    }
    
    if (isDisabled) {
      styles.opacity = 0.5;
    }
    
    return styles;
  };

  const getBaseTabTextStyle = (): TextStyle => ({
    fontSize: size === 'small' ? 12 : size === 'medium' ? 14 : 16,
    fontWeight: '500',
    textAlign: 'center',
  });

  const getTabTextStateStyle = (index: number): TextStyle => {
    const styles: TextStyle = {};
    const isActive = index === currentIndex;
    
    if (isActive) {
      styles.color = activeTextColor || theme.colors.neutral.light;
      styles.fontWeight = '600';
    } else {
      styles.color = textColor || theme.colors.neutral.medium;
    }
    
    return styles;
  };

  // ============================================================================
  // RENDER HELPERS
  // ============================================================================

  const renderTab = (item: TabNavigationItem, index: number) => {
    if (item.hidden) return null;
    
    return (
      <TouchableOpacity
        key={item.id}
        style={getTabStyle(index)}
        onPress={() => handleTabPress(index)}
        onLongPress={() => handleTabLongPress(index)}
        onLayout={(event) => handleTabLayout(index, event.nativeEvent.layout)}
        disabled={disabled || loading || item.disabled}
        activeOpacity={0.8}
        accessibilityLabel={item.accessibilityLabel || item.label}
        accessibilityRole="tab"
        accessibilityState={{ selected: index === currentIndex }}
        testID={item.testID}
      >
        <View style={styles.tabContent}>
          {item.icon && (
            <View style={styles.tabIcon}>
              {item.icon}
            </View>
          )}
          <Text style={getTabTextStyle(index)}>
            {item.label}
          </Text>
          {item.badge && (
            <View style={styles.tabBadge}>
              <Text style={styles.tabBadgeText}>
                {item.badge}
              </Text>
            </View>
          )}
        </View>
        {item.content && (
          <View style={styles.tabCustomContent}>
            {item.content}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderIndicator = () => {
    if (!indicator.enabled) return null;
    
    if (indicator.component) {
      return (
        <Animated.View style={getIndicatorStyle()}>
          {indicator.component}
        </Animated.View>
      );
    }
    
    return <Animated.View style={getIndicatorStyle()} />;
  };

  const renderContent = () => {
    const content = items?.map((item, index) => (
      <View key={item.id || index}>
        {renderTab(item, index)}
      </View>
    )) || [];
    
    if (scroll.enabled) {
      return (
        <ScrollView
          ref={scrollViewRef}
          horizontal={orientation === 'horizontal'}
          showsHorizontalScrollIndicator={scroll.showIndicators}
          showsVerticalScrollIndicator={scroll.showIndicators}
          contentContainerStyle={getContentStyle()}
          style={styles.scrollView}
          removeClippedSubviews={true}
        >
          {content}
        </ScrollView>
      );
    }
    
    return (
      <View style={getContentStyle()}>
        {content}
      </View>
    );
  };

  // ============================================================================
  // RENDER
  // ============================================================================

  if (!visible) {
    return null;
  }

  return (
    <Animated.View
      style={[getContainerStyle(), getAnimatedStyle()]}
      onLayout={handleContainerLayout}
      {...panResponder.panHandlers}
      {...(accessibilityLabel && { accessibilityLabel })}
      {...(accessibilityHint && { accessibilityHint })}
      accessibilityRole="tablist"
      {...(testID && { testID })}
      collapsable={false}
    >
      {renderContent()}
      {renderIndicator()}
      {children}
    </Animated.View>
  );
};

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    marginRight: 8,
  },
  tabBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#FF4444',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  tabBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  tabCustomContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// ============================================================================
// EXPORTS
// ============================================================================

export default TabNavigation;
