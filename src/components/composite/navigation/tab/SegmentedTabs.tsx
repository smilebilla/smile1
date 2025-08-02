/**
 * Corp Astro UI Library - Segmented Tabs Component
 * 
 * Professional segmented tabs component providing segmented control functionality
 * for Corp Astro applications with advanced styling and space-inspired design.
 * Serves as an alternative to traditional tab navigation with segment-based selection.
 * 
 * Features:
 * - Segmented control with multiple segments and selection states
 * - Multiple segment variants (default, pills, underline, cards)
 * - Animated segment transitions with smooth indicators
 * - Icon and badge support for individual segments
 * - Customizable segment sizing and spacing
 * - Accessibility compliance with ARIA attributes
 * - Theme-aware styling with Corp Astro design tokens
 * - Performance optimizations with native driver
 * - Gesture support for segment selection
 * - Custom segment content and layouts
 * - Platform-specific enhancements
 * 
 * @module SegmentedTabs
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
  Animated,
  Platform,
  ViewStyle,
  TextStyle,
  ColorValue,
  Dimensions,
  LayoutChangeEvent,
  GestureResponderEvent,
} from 'react-native';
import { useTheme } from '../../../foundations/themes/useTheme';
import { deepSpaceColors } from '../../../foundations/tokens/colors/DeepSpaceColors';
import { SignatureBlues } from '../../../foundations/tokens/colors/SignatureBlues';
import { LuxuryGolds } from '../../../foundations/tokens/colors/LuxuryGolds';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Segmented tabs variant types
 */
export enum SegmentedTabsVariant {
  DEFAULT = 'default',
  PILLS = 'pills',
  UNDERLINE = 'underline',
  CARDS = 'cards',
  MINIMAL = 'minimal',
  ROUNDED = 'rounded',
  COSMIC = 'cosmic',
  FLOATING = 'floating',
}

/**
 * Segmented tabs size types
 */
export enum SegmentedTabsSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  EXTRA_LARGE = 'extraLarge',
  CUSTOM = 'custom',
}

/**
 * Segmented tabs animation types
 */
export enum SegmentedTabsAnimation {
  SMOOTH = 'smooth',
  ELASTIC = 'elastic',
  SPRING = 'spring',
  BOUNCE = 'bounce',
  LINEAR = 'linear',
  EASE_IN_OUT = 'easeInOut',
  NONE = 'none',
}

/**
 * Segmented tabs distribution types
 */
export enum SegmentedTabsDistribution {
  EQUAL = 'equal',
  CONTENT = 'content',
  WEIGHTED = 'weighted',
  CUSTOM = 'custom',
}

/**
 * Individual segment interface
 */
export interface SegmentedTabsSegment {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: {
    count?: number;
    color?: ColorValue;
    textColor?: ColorValue;
    variant?: 'dot' | 'count' | 'custom';
    content?: React.ReactNode;
  };
  disabled?: boolean;
  weight?: number;
  width?: number;
  customContent?: React.ReactNode;
  accessibilityLabel?: string;
  testID?: string;
}

/**
 * Segmented tabs style configuration
 */
export interface SegmentedTabsStyleConfig {
  backgroundColor?: ColorValue;
  selectedBackgroundColor?: ColorValue;
  borderColor?: ColorValue;
  selectedBorderColor?: ColorValue;
  textColor?: ColorValue;
  selectedTextColor?: ColorValue;
  borderRadius?: number;
  borderWidth?: number;
  padding?: number;
  margin?: number;
  shadow?: boolean;
  shadowColor?: ColorValue;
  shadowOpacity?: number;
  shadowRadius?: number;
  shadowOffset?: { width: number; height: number };
  elevation?: number;
}

/**
 * Segmented tabs animation configuration
 */
export interface SegmentedTabsAnimationConfig {
  duration?: number;
  delay?: number;
  easing?: any;
  useNativeDriver?: boolean;
  damping?: number;
  stiffness?: number;
  mass?: number;
  tension?: number;
  friction?: number;
  velocity?: number;
}

/**
 * Segmented tabs gesture configuration
 */
export interface SegmentedTabsGestureConfig {
  enabled?: boolean;
  swipeEnabled?: boolean;
  longPressEnabled?: boolean;
  threshold?: number;
  velocity?: number;
  resistance?: number;
  hapticFeedback?: boolean;
}

/**
 * Segmented tabs props interface
 */
export interface SegmentedTabsProps {
  // Core Properties
  segments: SegmentedTabsSegment[];
  selectedIndex: number;
  onSelectionChange: (index: number, segment: SegmentedTabsSegment) => void;
  
  // Variant Properties
  variant?: SegmentedTabsVariant;
  size?: SegmentedTabsSize;
  animation?: SegmentedTabsAnimation;
  distribution?: SegmentedTabsDistribution;
  
  // Style Properties
  style?: ViewStyle;
  styleConfig?: SegmentedTabsStyleConfig;
  
  // Animation Properties
  animationConfig?: SegmentedTabsAnimationConfig;
  
  // Gesture Properties
  gestureConfig?: SegmentedTabsGestureConfig;
  
  // Interaction Properties
  onPress?: (index: number, segment: SegmentedTabsSegment) => void;
  onLongPress?: (index: number, segment: SegmentedTabsSegment) => void;
  onPressIn?: (index: number, segment: SegmentedTabsSegment) => void;
  onPressOut?: (index: number, segment: SegmentedTabsSegment) => void;
  
  // Accessibility Properties
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: any;
  
  // Theme Properties
  theme?: 'light' | 'dark' | 'auto';
  
  // Layout Properties
  containerWidth?: number;
  containerHeight?: number;
  
  // Custom Properties
  customRenderer?: (segment: SegmentedTabsSegment, index: number, isSelected: boolean) => React.ReactNode;
  testID?: string;
}

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Default animation configurations
 */
const DEFAULT_ANIMATION_CONFIG: SegmentedTabsAnimationConfig = {
  duration: 300,
  delay: 0,
  useNativeDriver: true,
  damping: 20,
  stiffness: 200,
  mass: 1,
  tension: 200,
  friction: 8,
  velocity: 0,
};

/**
 * Default gesture configurations
 */
const DEFAULT_GESTURE_CONFIG: SegmentedTabsGestureConfig = {
  enabled: true,
  swipeEnabled: true,
  longPressEnabled: true,
  threshold: 10,
  velocity: 0.5,
  resistance: 0.8,
  hapticFeedback: true,
};

/**
 * Size configurations
 */
const SIZE_CONFIG = {
  [SegmentedTabsSize.SMALL]: { height: 32, fontSize: 12, padding: 8 },
  [SegmentedTabsSize.MEDIUM]: { height: 40, fontSize: 14, padding: 12 },
  [SegmentedTabsSize.LARGE]: { height: 48, fontSize: 16, padding: 16 },
  [SegmentedTabsSize.EXTRA_LARGE]: { height: 56, fontSize: 18, padding: 20 },
  [SegmentedTabsSize.CUSTOM]: { height: 40, fontSize: 14, padding: 12 },
};

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * SegmentedTabs - Professional segmented tabs component
 */
export const SegmentedTabs: React.FC<SegmentedTabsProps> = ({
  segments,
  selectedIndex,
  onSelectionChange,
  variant = SegmentedTabsVariant.DEFAULT,
  size = SegmentedTabsSize.MEDIUM,
  animation = SegmentedTabsAnimation.SMOOTH,
  distribution = SegmentedTabsDistribution.EQUAL,
  style,
  styleConfig = {},
  animationConfig = {},
  gestureConfig = {},
  onPress,
  onLongPress,
  onPressIn,
  onPressOut,
  accessibilityLabel = 'Segmented tabs',
  accessibilityHint = 'Select a tab segment',
  accessibilityRole = 'tablist',
  theme = 'auto',
  containerWidth,
  containerHeight,
  customRenderer,
  testID,
}) => {
  // ============================================================================
  // HOOKS & STATE
  // ============================================================================

  const currentTheme = useTheme();
  const isDarkMode = theme === 'dark' || (theme === 'auto' && currentTheme.isDark);
  
  // Animation references
  const selectionAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const segmentAnims = useRef(segments.map(() => ({
    scale: new Animated.Value(1),
    opacity: new Animated.Value(1),
    backgroundColor: new Animated.Value(0),
  }))).current;
  
  // State management
  const [segmentLayouts, setSegmentLayouts] = useState<Array<{
    x: number;
    y: number;
    width: number;
    height: number;
  }>>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [pressedIndex, setPressedIndex] = useState<number | null>(null);
  
  // Configuration merging
  const mergedAnimationConfig = { ...DEFAULT_ANIMATION_CONFIG, ...animationConfig };
  const mergedGestureConfig = { ...DEFAULT_GESTURE_CONFIG, ...gestureConfig };
  
  // ============================================================================
  // COMPUTED VALUES
  // ============================================================================

  /**
   * Get theme colors
   */
  const getThemeColors = useCallback(() => {
    return {
      background: isDarkMode ? deepSpaceColors.deep : deepSpaceColors.void,
      selectedBackground: isDarkMode ? SignatureBlues.primary : SignatureBlues.glow,
      border: isDarkMode ? deepSpaceColors.dark : deepSpaceColors.medium,
      selectedBorder: isDarkMode ? SignatureBlues.glow : SignatureBlues.primary,
      text: isDarkMode ? currentTheme.colors.neutral.light : currentTheme.colors.neutral.text,
      selectedText: isDarkMode ? currentTheme.colors.neutral.light : currentTheme.colors.neutral.light,
      shadow: isDarkMode ? deepSpaceColors.void : deepSpaceColors.dark,
    };
  }, [isDarkMode, currentTheme]);

  /**
   * Get size configuration
   */
  const getSizeConfig = useCallback(() => {
    return SIZE_CONFIG[size];
  }, [size]);

  /**
   * Get segment width based on distribution
   */
  const getSegmentWidth = useCallback((segment: SegmentedTabsSegment, index: number) => {
    const totalWidth = containerWidth || Dimensions.get('window').width - 32;
    
    switch (distribution) {
      case SegmentedTabsDistribution.EQUAL:
        return totalWidth / segments.length;
      case SegmentedTabsDistribution.CONTENT:
        return segment.width || 'auto';
      case SegmentedTabsDistribution.WEIGHTED:
        const totalWeight = segments.reduce((sum, seg) => sum + (seg.weight || 1), 0);
        return (totalWidth * (segment.weight || 1)) / totalWeight;
      case SegmentedTabsDistribution.CUSTOM:
        return segment.width || totalWidth / segments.length;
      default:
        return totalWidth / segments.length;
    }
  }, [distribution, segments, containerWidth]);

  // ============================================================================
  // ANIMATION FUNCTIONS
  // ============================================================================

  /**
   * Get animation configuration based on type
   */
  const getAnimationConfig = useCallback((animationType: SegmentedTabsAnimation) => {
    switch (animationType) {
      case SegmentedTabsAnimation.ELASTIC:
        return {
          ...mergedAnimationConfig,
          tension: 100,
          friction: 8,
        };
      case SegmentedTabsAnimation.SPRING:
        return {
          ...mergedAnimationConfig,
          damping: mergedAnimationConfig.damping || 20,
          stiffness: mergedAnimationConfig.stiffness || 200,
          mass: mergedAnimationConfig.mass || 1,
        };
      case SegmentedTabsAnimation.BOUNCE:
        return {
          ...mergedAnimationConfig,
          tension: 2000,
          friction: 10,
        };
      case SegmentedTabsAnimation.LINEAR:
        return {
          ...mergedAnimationConfig,
        };
      case SegmentedTabsAnimation.EASE_IN_OUT:
        return {
          ...mergedAnimationConfig,
        };
      case SegmentedTabsAnimation.NONE:
        return {
          ...mergedAnimationConfig,
          duration: 0,
        };
      default:
        return mergedAnimationConfig;
    }
  }, [mergedAnimationConfig]);

  /**
   * Animate to selected segment
   */
  const animateToSegment = useCallback((index: number) => {
    if (isAnimating || !segmentLayouts[index]) return;
    
    setIsAnimating(true);
    
    const animConfig = getAnimationConfig(animation);
    const targetLayout = segmentLayouts[index];
    
    const animations = [];
    
    // Selection indicator animation
    animations.push(
      Animated.timing(selectionAnim, {
        toValue: targetLayout.x,
        duration: animConfig.duration || 300,
        useNativeDriver: true,
      })
    );
    
    // Individual segment animations
    segmentAnims.forEach((segmentAnim, segIndex) => {
      const isSelected = segIndex === index;
      
      animations.push(
        Animated.parallel([
          Animated.timing(segmentAnim.scale, {
            toValue: isSelected ? 1.05 : 1,
            duration: (animConfig.duration || 300) / 2,
            useNativeDriver: true,
          }),
          Animated.timing(segmentAnim.opacity, {
            toValue: isSelected ? 1 : 0.7,
            duration: (animConfig.duration || 300) / 2,
            useNativeDriver: true,
          }),
          Animated.timing(segmentAnim.backgroundColor, {
            toValue: isSelected ? 1 : 0,
            duration: animConfig.duration || 300,
            useNativeDriver: false,
          }),
        ])
      );
    });
    
    // Run all animations
    Animated.parallel(animations).start(({ finished }) => {
      setIsAnimating(false);
    });
  }, [
    isAnimating,
    segmentLayouts,
    animation,
    getAnimationConfig,
    selectionAnim,
    segmentAnims,
  ]);

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  /**
   * Handle segment press
   */
  const handleSegmentPress = useCallback((index: number) => {
    if (segments[index].disabled || isAnimating) return;
    
    // Haptic feedback
    if (mergedGestureConfig.hapticFeedback && Platform.OS === 'ios') {
      // HapticFeedback.selection();
    }
    
    onPress?.(index, segments[index]);
    onSelectionChange(index, segments[index]);
  }, [segments, isAnimating, mergedGestureConfig, onPress, onSelectionChange]);

  /**
   * Handle segment long press
   */
  const handleSegmentLongPress = useCallback((index: number) => {
    if (segments[index].disabled || !mergedGestureConfig.longPressEnabled) return;
    
    onLongPress?.(index, segments[index]);
  }, [segments, mergedGestureConfig, onLongPress]);

  /**
   * Handle press in
   */
  const handlePressIn = useCallback((index: number) => {
    setPressedIndex(index);
    onPressIn?.(index, segments[index]);
  }, [segments, onPressIn]);

  /**
   * Handle press out
   */
  const handlePressOut = useCallback((index: number) => {
    setPressedIndex(null);
    onPressOut?.(index, segments[index]);
  }, [segments, onPressOut]);

  /**
   * Handle segment layout
   */
  const handleSegmentLayout = useCallback((index: number, event: LayoutChangeEvent) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    
    setSegmentLayouts(prev => {
      const newLayouts = [...prev];
      newLayouts[index] = { x, y, width, height };
      return newLayouts;
    });
  }, []);

  // ============================================================================
  // EFFECTS
  // ============================================================================

  /**
   * Animate to selected segment when index changes
   */
  useEffect(() => {
    if (segmentLayouts.length === segments.length && segmentLayouts[selectedIndex]) {
      animateToSegment(selectedIndex);
    }
  }, [selectedIndex, segmentLayouts, segments.length, animateToSegment]);

  /**
   * Initialize segment animations
   */
  useEffect(() => {
    segmentAnims.forEach((segmentAnim, index) => {
      const isSelected = index === selectedIndex;
      segmentAnim.scale.setValue(isSelected ? 1.05 : 1);
      segmentAnim.opacity.setValue(isSelected ? 1 : 0.7);
      segmentAnim.backgroundColor.setValue(isSelected ? 1 : 0);
    });
  }, []);

  // ============================================================================
  // RENDER HELPERS
  // ============================================================================

  /**
   * Render segment badge
   */
  const renderBadge = useCallback((badge: SegmentedTabsSegment['badge']) => {
    if (!badge) return null;
    
    const themeColors = getThemeColors();
    
    if (badge.variant === 'dot') {
      return (
        <View style={[
          styles.badgeDot,
          {
            backgroundColor: badge.color || themeColors.selectedBackground,
          },
        ]} />
      );
    }
    
    if (badge.variant === 'custom' && badge.content) {
      return badge.content;
    }
    
    return (
      <View style={[
        styles.badgeContainer,
        {
          backgroundColor: badge.color || themeColors.selectedBackground,
        },
      ]}>
        <Text style={[
          styles.badgeText,
          {
            color: badge.textColor || themeColors.selectedText,
          },
        ]}>
          {badge.count}
        </Text>
      </View>
    );
  }, [getThemeColors]);

  /**
   * Render individual segment
   */
  const renderSegment = useCallback((segment: SegmentedTabsSegment, index: number) => {
    const themeColors = getThemeColors();
    const sizeConfig = getSizeConfig();
    const isSelected = index === selectedIndex;
    const isPressed = pressedIndex === index;
    const segmentWidth = getSegmentWidth(segment, index);
    
    if (customRenderer) {
      return customRenderer(segment, index, isSelected);
    }
    
    const segmentStyle: ViewStyle = {
      height: sizeConfig.height,
      width: segmentWidth,
      backgroundColor: isSelected 
        ? (styleConfig.selectedBackgroundColor || themeColors.selectedBackground)
        : (styleConfig.backgroundColor || 'transparent'),
      borderColor: isSelected 
        ? (styleConfig.selectedBorderColor || themeColors.selectedBorder)
        : (styleConfig.borderColor || themeColors.border),
      borderWidth: styleConfig.borderWidth || 1,
      borderRadius: styleConfig.borderRadius || 8,
      padding: styleConfig.padding || sizeConfig.padding,
      margin: styleConfig.margin || 2,
      opacity: segment.disabled ? 0.5 : (isPressed ? 0.8 : 1),
    };
    
    const textStyle: TextStyle = {
      fontSize: sizeConfig.fontSize,
      color: isSelected 
        ? (styleConfig.selectedTextColor || themeColors.selectedText)
        : (styleConfig.textColor || themeColors.text),
      fontWeight: isSelected ? '600' : '400',
    };
    
    return (
      <Animated.View
        key={segment.id}
        style={[
          styles.segment,
          segmentStyle,
          {
            transform: [
              { scale: segmentAnims[index]?.scale || 1 },
            ],
            opacity: segmentAnims[index]?.opacity || 1,
          },
        ]}
        onLayout={(event) => handleSegmentLayout(index, event)}
      >
        <TouchableOpacity
          style={styles.segmentTouchable}
          onPress={() => handleSegmentPress(index)}
          onLongPress={() => handleSegmentLongPress(index)}
          onPressIn={() => handlePressIn(index)}
          onPressOut={() => handlePressOut(index)}
          disabled={segment.disabled}
          accessibilityLabel={segment.accessibilityLabel || segment.label}
          accessibilityRole="tab"
          accessibilityState={{ selected: isSelected }}
          testID={segment.testID}
        >
          <View style={styles.segmentContent}>
            {segment.icon && (
              <View style={styles.segmentIcon}>
                {segment.icon}
              </View>
            )}
            
            <Text style={[styles.segmentText, textStyle]}>
              {segment.label}
            </Text>
            
            {segment.badge && renderBadge(segment.badge)}
          </View>
          
          {segment.customContent && (
            <View style={styles.segmentCustomContent}>
              {segment.customContent}
            </View>
          )}
        </TouchableOpacity>
      </Animated.View>
    );
  }, [
    getThemeColors,
    getSizeConfig,
    selectedIndex,
    pressedIndex,
    getSegmentWidth,
    customRenderer,
    styleConfig,
    segmentAnims,
    handleSegmentLayout,
    handleSegmentPress,
    handleSegmentLongPress,
    handlePressIn,
    handlePressOut,
    renderBadge,
  ]);

  /**
   * Render selection indicator
   */
  const renderSelectionIndicator = useCallback(() => {
    if (variant === SegmentedTabsVariant.MINIMAL || !segmentLayouts[selectedIndex]) {
      return null;
    }
    
    const themeColors = getThemeColors();
    const selectedLayout = segmentLayouts[selectedIndex];
    
    let indicatorStyle: ViewStyle = {
      position: 'absolute',
      height: selectedLayout.height,
      width: selectedLayout.width,
      backgroundColor: styleConfig.selectedBackgroundColor || themeColors.selectedBackground,
      borderRadius: styleConfig.borderRadius || 8,
      transform: [
        { translateX: selectionAnim },
      ],
    };
    
    if (variant === SegmentedTabsVariant.UNDERLINE) {
      indicatorStyle = {
        ...indicatorStyle,
        height: 2,
        bottom: 0,
        top: undefined,
      };
    }
    
    if (styleConfig.shadow) {
      indicatorStyle = {
        ...indicatorStyle,
        shadowColor: styleConfig.shadowColor || themeColors.shadow,
        shadowOffset: styleConfig.shadowOffset || { width: 0, height: 2 },
        shadowOpacity: styleConfig.shadowOpacity || 0.1,
        shadowRadius: styleConfig.shadowRadius || 4,
        elevation: styleConfig.elevation || 4,
      };
    }
    
    return (
      <Animated.View
        style={[styles.selectionIndicator, indicatorStyle]}
        pointerEvents="none"
      />
    );
  }, [
    variant,
    segmentLayouts,
    selectedIndex,
    getThemeColors,
    styleConfig,
    selectionAnim,
  ]);

  // ============================================================================
  // RENDER
  // ============================================================================

  if (!segments || segments.length === 0) {
    return null;
  }

  const themeColors = getThemeColors();
  const sizeConfig = getSizeConfig();
  
  const containerStyle: ViewStyle = {
    height: containerHeight || sizeConfig.height + 4,
    backgroundColor: styleConfig.backgroundColor || themeColors.background,
    borderRadius: styleConfig.borderRadius || 10,
    borderWidth: styleConfig.borderWidth || 1,
    borderColor: styleConfig.borderColor || themeColors.border,
    padding: 2,
  };

  return (
    <View
      style={[styles.container, containerStyle, style]}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityRole={accessibilityRole}
      testID={testID}
      collapsable={false}
    >
      {renderSelectionIndicator()}
      
      <View style={styles.segmentsContainer}>
        {segments.map((segment, index) => (
          <View key={segment.id || index}>
            {renderSegment(segment, index)}
          </View>
        ))}
      </View>
    </View>
  );
};

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  segmentsContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  segment: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  segmentTouchable: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  segmentContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentIcon: {
    marginRight: 4,
  },
  segmentText: {
    textAlign: 'center',
  },
  segmentCustomContent: {
    marginTop: 4,
  },
  selectionIndicator: {
    zIndex: 0,
  },
  badgeContainer: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
  },
});

// ============================================================================
// EXPORTS
// ============================================================================

export default SegmentedTabs;