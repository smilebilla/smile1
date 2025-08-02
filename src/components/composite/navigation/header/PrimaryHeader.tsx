/**
 * Corp Astro UI Library - Primary Header Component
 * 
 * Professional primary header component providing the main navigation header
 * for Corp Astro applications with theme integration and space-inspired design.
 * Creates immersive navigation experiences with smooth animations and accessibility.
 * 
 * Features:
 * - Professional header layout with title and navigation
 * - Theme-aware styling with Corp Astro design tokens
 * - Responsive design with flexible content arrangement
 * - Smooth animations and transitions
 * - Accessibility compliance with ARIA attributes
 * - Platform-specific optimizations
 * - Search integration and action buttons
 * - Status bar integration
 * - Safe area handling
 * - Customizable height and styling
 * 
 * @module PrimaryHeader
 * @version 1.0.0
 * @author Corp Astro Design System
 * @since 2024
 */

import React, { useEffect, useRef, useState } from 'react';
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
  StatusBar,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { useTheme } from '../../../foundations/themes';
import { deepSpaceColors } from '../../../foundations/tokens/colors/DeepSpaceColors';
import { SignatureBlues } from '../../../foundations/tokens/colors/SignatureBlues';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Primary header variants
 */
export type PrimaryHeaderVariant = 'default' | 'large' | 'minimal' | 'search' | 'transparent';

/**
 * Primary header heights
 */
export type PrimaryHeaderHeight = 'standard' | 'large' | 'compact' | 'custom';

/**
 * Primary header animation types
 */
export type PrimaryHeaderAnimation = 'fade' | 'slide' | 'scale' | 'none';

/**
 * Primary header button configuration
 */
export interface PrimaryHeaderButton {
  /** Button identifier */
  id: string;
  /** Button icon or text */
  icon?: React.ReactNode;
  /** Button text */
  text?: string;
  /** Button press handler */
  onPress: () => void;
  /** Button accessibility label */
  accessibilityLabel?: string;
  /** Button disabled state */
  disabled?: boolean;
  /** Button test ID */
  testID?: string;
}

/**
 * Primary header component props interface
 */
export interface PrimaryHeaderProps {
  /** Header variant */
  variant?: PrimaryHeaderVariant;
  /** Header height preset */
  height?: PrimaryHeaderHeight;
  /** Custom height value */
  customHeight?: number;
  /** Header title (string or ReactNode) */
  title?: React.ReactNode;
  /** Header subtitle */
  subtitle?: string;
  /** Left navigation button */
  leftButton?: PrimaryHeaderButton;
  /** Right action buttons */
  rightButtons?: PrimaryHeaderButton[];
  /** Background color override */
  backgroundColor?: ColorValue;
  /** Text color override */
  textColor?: ColorValue;
  /** Enable shadow */
  shadow?: boolean;
  /** Enable blur background */
  blur?: boolean;
  /** Animation type */
  animation?: PrimaryHeaderAnimation;
  /** Animation duration in milliseconds */
  animationDuration?: number;
  /** Enable smooth transitions */
  animated?: boolean;
  /** Search placeholder text */
  searchPlaceholder?: string;
  /** Search value */
  searchValue?: string;
  /** Search change handler */
  onSearchChange?: (value: string) => void;
  /** Search submit handler */
  onSearchSubmit?: (value: string) => void;
  /** Enable safe area integration */
  safeArea?: boolean;
  /** Enable status bar integration */
  statusBar?: boolean;
  /** Custom style overrides */
  style?: ViewStyle;
  /** Container style overrides */
  containerStyle?: ViewStyle;
  /** Title style overrides */
  titleStyle?: TextStyle;
  /** Subtitle style overrides */
  subtitleStyle?: TextStyle;
  /** Z-index for layering */
  zIndex?: number;
  /** Accessibility props */
  accessibilityLabel?: string;
  /** Test ID for testing */
  testID?: string;
  /** Children components */
  children?: React.ReactNode;
  /** Header press handler */
  onPress?: () => void;
}

// ============================================================================
// COMPONENT IMPLEMENTATION
// ============================================================================

/**
 * Primary Header Component
 * 
 * Professional header component providing main navigation functionality
 * with theme integration and space-inspired design aesthetics.
 */
export const PrimaryHeader: React.FC<PrimaryHeaderProps> = ({
  variant = 'default',
  height = 'standard',
  customHeight,
  title = 'Corp Astro',
  subtitle,
  leftButton,
  rightButtons = [],
  backgroundColor,
  textColor,
  shadow = true,
  blur = false,
  animation = 'fade',
  animationDuration = 300,
  animated = true,
  searchPlaceholder = 'Search...',
  searchValue,
  onSearchChange,
  onSearchSubmit,
  safeArea = true,
  statusBar = true,
  style,
  containerStyle,
  titleStyle,
  subtitleStyle,
  zIndex = 1000,
  accessibilityLabel = 'Primary Header',
  testID = 'primary-header',
  children,
  onPress,
}) => {
  // ============================================================================
  // HOOKS & STATE
  // ============================================================================

  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(true);
  const [searchActive, setSearchActive] = useState(false);
  const [internalSearchValue, setInternalSearchValue] = useState(searchValue || '');
  
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const searchAnim = useRef(new Animated.Value(0)).current;

  // ============================================================================
  // COMPUTED VALUES
  // ============================================================================

  /**
   * Compute effective height based on preset and custom values
   */
  const effectiveHeight = React.useMemo(() => {
    if (customHeight) return customHeight;
    
    const heightMap = {
      standard: 96,
      large: 96,
      compact: 72,
      custom: customHeight || 96,
    };
    
    return heightMap[height];
  }, [height, customHeight]);

  /**
   * Compute safe area height
   */
  const safeAreaHeight = React.useMemo(() => {
    if (!safeArea) return 0;
    return Platform.OS === 'ios' ? 44 : 24;
  }, [safeArea]);

  /**
   * Compute total header height
   */
  const totalHeight = React.useMemo(() => {
    return effectiveHeight + safeAreaHeight;
  }, [effectiveHeight, safeAreaHeight]);

  /**
   * Compute background color
   */
  const computedBackgroundColor = React.useMemo(() => {
    if (backgroundColor) return backgroundColor;
    
    const variantColorMap = {
      default: theme.colors.cosmos.deep,
      large: theme.colors.cosmos.deep,
      minimal: 'transparent',
      search: theme.colors.cosmos.deep,
      transparent: 'transparent',
    };
    
    return variantColorMap[variant] || theme.colors.cosmos.deep;
  }, [variant, backgroundColor, theme.colors.cosmos.deep]);

  /**
   * Compute text color
   */
  const computedTextColor = React.useMemo(() => {
    if (textColor) return textColor;
    
    return theme.colors.neutral.light;
  }, [textColor, theme.colors.neutral.light]);

  /**
   * Compute shadow style
   */
  const shadowStyle = React.useMemo(() => {
    if (!shadow) return {};
    
    return {
      shadowColor: deepSpaceColors.void,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 4,
    };
  }, [shadow]);

  // ============================================================================
  // ANIMATION EFFECTS
  // ============================================================================

  /**
   * Animate header visibility
   */
  useEffect(() => {
    if (!animated) return;
    
    const animations = [];
    
    if (animation === 'fade') {
      animations.push(
        Animated.timing(fadeAnim, {
          toValue: isVisible ? 1 : 0,
          duration: animationDuration,
          useNativeDriver: true,
        })
      );
    }
    
    if (animation === 'slide') {
      animations.push(
        Animated.timing(slideAnim, {
          toValue: isVisible ? 0 : -totalHeight,
          duration: animationDuration,
          useNativeDriver: true,
        })
      );
    }
    
    if (animation === 'scale') {
      animations.push(
        Animated.timing(scaleAnim, {
          toValue: isVisible ? 1 : 0.9,
          duration: animationDuration,
          useNativeDriver: true,
        })
      );
    }
    
    if (animations.length > 0) {
      Animated.parallel(animations).start();
    }
  }, [isVisible, animated, animation, animationDuration, fadeAnim, slideAnim, scaleAnim, totalHeight]);

  /**
   * Animate search activation
   */
  useEffect(() => {
    if (!animated) return;
    
    Animated.timing(searchAnim, {
      toValue: searchActive ? 1 : 0,
      duration: animationDuration,
      useNativeDriver: false,
    }).start();
  }, [searchActive, animated, animationDuration, searchAnim]);

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  /**
   * Handle search value changes
   */
  const handleSearchChange = (value: string) => {
    setInternalSearchValue(value);
    onSearchChange?.(value);
  };

  /**
   * Handle search submit
   */
  const handleSearchSubmit = () => {
    onSearchSubmit?.(internalSearchValue);
  };

  /**
   * Handle search activation
   */
  const handleSearchActivation = () => {
    setSearchActive(true);
  };

  /**
   * Handle search deactivation
   */
  const handleSearchDeactivation = () => {
    setSearchActive(false);
  };

  // ============================================================================
  // RENDER HELPERS
  // ============================================================================

  /**
   * Render header button
   */
  const renderButton = (button: PrimaryHeaderButton, index: number) => (
    <TouchableOpacity
      key={button.id}
      style={[
        styles.button,
        button.disabled && styles.buttonDisabled,
      ]}
      onPress={button.onPress}
      disabled={button.disabled}
      accessibilityLabel={button.accessibilityLabel}
      testID={button.testID}
    >
      {button.icon && (
        <>{button.icon}</>
      )}
      {button.text && (
        <Text style={[styles.buttonText, { color: computedTextColor }]}>
          {button.text}
        </Text>
      )}
    </TouchableOpacity>
  );

  /**
   * Render header title section
   */
  const renderTitleSection = () => {
    if (variant === 'search' && searchActive) {
      return (
        <Animated.View
          style={[
            styles.searchContainer,
            {
              opacity: searchAnim,
              transform: [
                {
                  translateX: searchAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={[styles.searchInput, { color: computedTextColor }]}>
            {internalSearchValue || searchPlaceholder}
          </Text>
        </Animated.View>
      );
    }
    
    return (
      <TouchableOpacity
        style={styles.titleContainer}
        onPress={onPress}
        activeOpacity={onPress ? 0.7 : 1}
        disabled={!onPress}
      >
        {typeof title === 'string' ? (
          <Text
            style={[
              styles.title,
              { color: computedTextColor },
              titleStyle,
            ]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {title}
          </Text>
        ) : (
          title
        )}
        {subtitle && (
          <Text
            style={[
              styles.subtitle,
              { color: computedTextColor },
              subtitleStyle,
            ]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {subtitle}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  // ============================================================================
  // ANIMATION STYLES
  // ============================================================================

  const animationStyles = {
    opacity: animation === 'fade' ? fadeAnim : 1,
    transform: [
      animation === 'slide' ? { translateY: slideAnim } : { translateY: 0 },
      animation === 'scale' ? { scale: scaleAnim } : { scale: 1 },
    ],
  };

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  const headerContent = (
    <Animated.View
      style={[
        styles.container,
        {
          height: effectiveHeight,
          backgroundColor: computedBackgroundColor,
          zIndex,
        },
        shadowStyle,
        animationStyles,
        containerStyle,
      ]}
    >
      {/* Left Button */}
      <View style={styles.leftSection}>
        {leftButton && renderButton(leftButton, 0)}
      </View>

      {/* Title Section */}
      <View style={styles.centerSection}>
        {renderTitleSection()}
      </View>

      {/* Right Buttons */}
      <View style={styles.rightSection}>
        {rightButtons?.map((button, index) => (
          <View key={button.id || index}>
            {renderButton(button, index)}
          </View>
        )) || []}
      </View>

      {/* Custom Children */}
      {children && (
        <View style={styles.childrenContainer}>
          {children}
        </View>
      )}
    </Animated.View>
  );

  if (safeArea) {
    return (
      <SafeAreaView
        style={[
          styles.safeArea,
          {
            backgroundColor: computedBackgroundColor,
            zIndex,
          },
          style,
        ]}
      >
        {statusBar && (
          <StatusBar
            barStyle="light-content"
            backgroundColor={computedBackgroundColor}
            translucent={false}
          />
        )}
        {headerContent}
      </SafeAreaView>
    );
  }

  return (
    <View
      style={[
        styles.wrapper,
        {
          backgroundColor: computedBackgroundColor,
          zIndex,
        },
        style,
      ]}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      collapsable={false}
    >
      {statusBar && (
        <StatusBar
          barStyle="light-content"
          backgroundColor={computedBackgroundColor}
          translucent={false}
        />
      )}
      {headerContent}
    </View>
  );
};

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    width: '100%',
  },
  
  safeArea: {
    position: 'relative',
    width: '100%',
  },
  
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    width: '100%',
  },
  
  leftSection: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 80,
  },
  
  centerSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  
  rightSection: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 80,
    justifyContent: 'flex-end',
  },
  
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 24,
  },
  
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 2,
    opacity: 0.8,
  },
  
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginHorizontal: 4,
    minWidth: 40,
    minHeight: 40,
  },
  
  buttonDisabled: {
    opacity: 0.5,
  },
  
  buttonIcon: {
    fontSize: 20,
    lineHeight: 24,
  },
  
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 20,
    marginLeft: 4,
  },
  
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  
  searchInput: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 20,
  },
  
  childrenContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// ============================================================================
// EXPORTS
// ============================================================================

export default PrimaryHeader;
