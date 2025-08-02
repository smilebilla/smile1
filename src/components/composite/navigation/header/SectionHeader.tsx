/**
 * Corp Astro UI Library - Section Header Component
 * 
 * Professional section header component for organizing content sections
 * with Corp Astro design system integration and space-inspired aesthetics.
 * Provides contextual navigation and section identification.
 * 
 * Features:
 * - Multiple section header variants
 * - Flexible content layout with icons and actions
 * - Collapsible section support
 * - Navigation breadcrumb integration
 * - Theme-aware styling with Corp Astro design tokens
 * - Responsive design with adaptive sizing
 * - Smooth animations and transitions
 * - Accessibility compliance with ARIA attributes
 * - Platform-specific optimizations
 * - Custom styling and theming
 * 
 * @module SectionHeader
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
  Dimensions,
} from 'react-native';
import { useTheme } from '../../../foundations/themes/useTheme';
import { deepSpaceColors } from '../../../foundations/tokens/colors/DeepSpaceColors';
import { SignatureBlues } from '../../../foundations/tokens/colors/SignatureBlues';
import { LuxuryGolds } from '../../../foundations/tokens/colors/LuxuryGolds';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Section header variants
 */
export type SectionHeaderVariant = 'default' | 'prominent' | 'minimal' | 'bordered' | 'floating';

/**
 * Section header sizes
 */
export type SectionHeaderSize = 'small' | 'medium' | 'large' | 'xlarge';

/**
 * Section header animation types
 */
export type SectionHeaderAnimation = 'fade' | 'slide' | 'scale' | 'bounce' | 'none';

/**
 * Section header action button configuration
 */
export interface SectionHeaderAction {
  /** Action identifier */
  id: string;
  /** Action icon */
  icon?: string;
  /** Action text */
  text?: string;
  /** Action press handler */
  onPress: () => void;
  /** Action accessibility label */
  accessibilityLabel?: string;
  /** Action disabled state */
  disabled?: boolean;
  /** Action test ID */
  testID?: string;
}

/**
 * Section header breadcrumb item
 */
export interface SectionHeaderBreadcrumb {
  /** Breadcrumb identifier */
  id: string;
  /** Breadcrumb text */
  text: string;
  /** Breadcrumb press handler */
  onPress?: () => void;
  /** Whether this is the current/active breadcrumb */
  isActive?: boolean;
}

/**
 * Section header component props interface
 */
export interface SectionHeaderProps {
  /** Section header variant */
  variant?: SectionHeaderVariant;
  /** Section header size */
  size?: SectionHeaderSize;
  /** Section title */
  title: string;
  /** Section subtitle */
  subtitle?: string;
  /** Section description */
  description?: string;
  /** Section icon */
  icon?: string;
  /** Section actions */
  actions?: SectionHeaderAction[];
  /** Breadcrumb navigation */
  breadcrumbs?: SectionHeaderBreadcrumb[];
  /** Whether section is collapsible */
  collapsible?: boolean;
  /** Whether section is collapsed */
  collapsed?: boolean;
  /** Collapse toggle handler */
  onCollapseToggle?: (collapsed: boolean) => void;
  /** Background color override */
  backgroundColor?: ColorValue;
  /** Text color override */
  textColor?: ColorValue;
  /** Border color override */
  borderColor?: ColorValue;
  /** Enable shadow */
  shadow?: boolean;
  /** Animation type */
  animation?: SectionHeaderAnimation;
  /** Animation duration in milliseconds */
  animationDuration?: number;
  /** Enable smooth transitions */
  animated?: boolean;
  /** Sticky header behavior */
  sticky?: boolean;
  /** Custom style overrides */
  style?: ViewStyle;
  /** Container style overrides */
  containerStyle?: ViewStyle;
  /** Title style overrides */
  titleStyle?: TextStyle;
  /** Subtitle style overrides */
  subtitleStyle?: TextStyle;
  /** Description style overrides */
  descriptionStyle?: TextStyle;
  /** Z-index for layering */
  zIndex?: number;
  /** Accessibility props */
  accessibilityLabel?: string;
  /** Test ID for testing */
  testID?: string;
  /** Children components */
  children?: React.ReactNode;
  /** Section press handler */
  onPress?: () => void;
  /** Section long press handler */
  onLongPress?: () => void;
}

// ============================================================================
// COMPONENT IMPLEMENTATION
// ============================================================================

/**
 * Section Header Component
 * 
 * Professional section header component for organizing content
 * with theme integration and space-inspired design aesthetics.
 */
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  variant = 'default',
  size = 'medium',
  title,
  subtitle,
  description,
  icon,
  actions = [],
  breadcrumbs = [],
  collapsible = false,
  collapsed = false,
  onCollapseToggle,
  backgroundColor,
  textColor,
  borderColor,
  shadow = false,
  animation = 'fade',
  animationDuration = 300,
  animated = true,
  sticky = false,
  style,
  containerStyle,
  titleStyle,
  subtitleStyle,
  descriptionStyle,
  zIndex = 100,
  accessibilityLabel,
  testID = 'section-header',
  children,
  onPress,
  onLongPress,
}) => {
  // ============================================================================
  // HOOKS & STATE
  // ============================================================================

  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(true);
  const [internalCollapsed, setInternalCollapsed] = useState(collapsed);
  
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const bounceAnim = useRef(new Animated.Value(1)).current;
  const collapseAnim = useRef(new Animated.Value(collapsed ? 0 : 1)).current;

  // ============================================================================
  // COMPUTED VALUES
  // ============================================================================

  /**
   * Compute section header dimensions based on size
   */
  const dimensions = React.useMemo(() => {
    const sizeMap = {
      small: { minHeight: 48, padding: 12, titleSize: 16, subtitleSize: 12 },
      medium: { minHeight: 56, padding: 16, titleSize: 18, subtitleSize: 14 },
      large: { minHeight: 64, padding: 20, titleSize: 20, subtitleSize: 16 },
      xlarge: { minHeight: 72, padding: 24, titleSize: 24, subtitleSize: 18 },
    };
    
    return sizeMap[size];
  }, [size]);

  /**
   * Compute background color based on variant
   */
  const computedBackgroundColor = React.useMemo(() => {
    if (backgroundColor) return backgroundColor;
    
    const variantColorMap = {
      default: 'transparent',
      prominent: theme.colors.cosmos.dark,
      minimal: 'transparent',
      bordered: 'transparent',
      floating: theme.colors.cosmos.medium,
    };
    
    return variantColorMap[variant] || 'transparent';
  }, [variant, backgroundColor, theme.colors.cosmos]);

  /**
   * Compute text color
   */
  const computedTextColor = React.useMemo(() => {
    if (textColor) return textColor;
    return theme.colors.neutral.light;
  }, [textColor, theme.colors.neutral.light]);

  /**
   * Compute border color
   */
  const computedBorderColor = React.useMemo(() => {
    if (borderColor) return borderColor;
    return theme.colors.brand.accent;
  }, [borderColor, theme.colors.brand.accent]);

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
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 3,
    };
  }, [shadow]);

  /**
   * Compute variant-specific styles
   */
  const variantStyles = React.useMemo(() => {
    const baseStyle = {
      backgroundColor: computedBackgroundColor,
      minHeight: dimensions.minHeight,
      padding: dimensions.padding,
    };

    switch (variant) {
      case 'prominent':
        return {
          ...baseStyle,
          borderRadius: 12,
          marginHorizontal: 16,
          marginVertical: 8,
        };
      case 'minimal':
        return {
          ...baseStyle,
          paddingVertical: dimensions.padding / 2,
        };
      case 'bordered':
        return {
          ...baseStyle,
          borderBottomWidth: 1,
          borderBottomColor: computedBorderColor,
        };
      case 'floating':
        return {
          ...baseStyle,
          borderRadius: 16,
          marginHorizontal: 16,
          marginVertical: 8,
        };
      default:
        return baseStyle;
    }
  }, [variant, computedBackgroundColor, dimensions, computedBorderColor]);

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
          toValue: isVisible ? 0 : -dimensions.minHeight,
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
    
    if (animation === 'bounce') {
      animations.push(
        Animated.spring(bounceAnim, {
          toValue: isVisible ? 1 : 0.8,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        })
      );
    }
    
    if (animations.length > 0) {
      Animated.parallel(animations).start();
    }
  }, [isVisible, animated, animation, animationDuration, dimensions.minHeight]);

  /**
   * Animate collapse state
   */
  useEffect(() => {
    if (!animated || !collapsible) return;
    
    Animated.timing(collapseAnim, {
      toValue: internalCollapsed ? 0 : 1,
      duration: animationDuration,
      useNativeDriver: false,
    }).start();
  }, [internalCollapsed, animated, collapsible, animationDuration]);

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  /**
   * Handle collapse toggle
   */
  const handleCollapseToggle = () => {
    const newCollapsed = !internalCollapsed;
    setInternalCollapsed(newCollapsed);
    onCollapseToggle?.(newCollapsed);
  };

  /**
   * Handle section press
   */
  const handlePress = () => {
    if (collapsible && !onPress) {
      handleCollapseToggle();
    } else {
      onPress?.();
    }
  };

  // ============================================================================
  // RENDER HELPERS
  // ============================================================================

  /**
   * Render section icon
   */
  const renderIcon = () => {
    if (!icon) return null;
    
    return (
      <View style={styles.iconContainer}>
        <Text style={[styles.icon, { color: computedTextColor }]}>
          {icon}
        </Text>
      </View>
    );
  };

  /**
   * Render collapse indicator
   */
  const renderCollapseIndicator = () => {
    if (!collapsible) return null;
    
    return (
      <Animated.View
        style={[
          styles.collapseIndicator,
          {
            transform: [
              {
                rotate: collapseAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '180deg'],
                }),
              },
            ],
          },
        ]}
      >
        <Text style={[styles.collapseIcon, { color: computedTextColor }]}>
          ▼
        </Text>
      </Animated.View>
    );
  };

  /**
   * Render actions
   */
  const renderActions = () => {
    if (actions.length === 0) return null;
    
    return (
      <View style={styles.actionsContainer}>
        {actions.map((action, index) => (
          <TouchableOpacity
            key={action.id}
            style={[
              styles.actionButton,
              action.disabled && styles.actionButtonDisabled,
            ]}
            onPress={action.onPress}
            disabled={action.disabled}
            accessibilityLabel={action.accessibilityLabel}
            testID={action.testID}
          >
            {action.icon && (
              <Text style={[styles.actionIcon, { color: computedTextColor }]}>
                {action.icon}
              </Text>
            )}
            {action.text && (
              <Text style={[styles.actionText, { color: computedTextColor }]}>
                {action.text}
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  /**
   * Render breadcrumbs
   */
  const renderBreadcrumbs = () => {
    if (breadcrumbs.length === 0) return null;
    
    return (
      <View style={styles.breadcrumbsContainer}>
        {breadcrumbs.map((breadcrumb, index) => (
          <React.Fragment key={breadcrumb.id}>
            {index > 0 && (
              <Text style={[styles.breadcrumbSeparator, { color: computedTextColor }]}>
                /
              </Text>
            )}
            <TouchableOpacity
              style={[
                styles.breadcrumbItem,
                breadcrumb.isActive && styles.breadcrumbItemActive,
              ]}
              onPress={breadcrumb.onPress}
              disabled={!breadcrumb.onPress}
            >
              <Text
                style={[
                  styles.breadcrumbText,
                  { color: computedTextColor },
                  breadcrumb.isActive && styles.breadcrumbTextActive,
                ]}
              >
                {breadcrumb.text}
              </Text>
            </TouchableOpacity>
          </React.Fragment>
        ))}
      </View>
    );
  };

  /**
   * Render header content
   */
  const renderContent = () => (
    <Animated.View
      style={[
        styles.contentContainer,
        {
          opacity: collapsible ? collapseAnim : 1,
          maxHeight: collapsible
            ? collapseAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 200],
              })
            : undefined,
        },
      ]}
    >
      {/* Breadcrumbs */}
      {renderBreadcrumbs()}
      
      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Left Section */}
        <View style={styles.leftSection}>
          {renderIcon()}
          <View style={styles.textContainer}>
            <Text
              style={[
                styles.title,
                {
                  color: computedTextColor,
                  fontSize: dimensions.titleSize,
                },
                titleStyle,
              ]}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {title}
            </Text>
            {subtitle && (
              <Text
                style={[
                  styles.subtitle,
                  {
                    color: computedTextColor,
                    fontSize: dimensions.subtitleSize,
                  },
                  subtitleStyle,
                ]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {subtitle}
              </Text>
            )}
          </View>
        </View>
        
        {/* Right Section */}
        <View style={styles.rightSection}>
          {renderActions()}
          {renderCollapseIndicator()}
        </View>
      </View>
      
      {/* Description */}
      {description && (
        <Text
          style={[
            styles.description,
            { color: computedTextColor },
            descriptionStyle,
          ]}
          numberOfLines={3}
          ellipsizeMode="tail"
        >
          {description}
        </Text>
      )}
      
      {/* Custom Children */}
      {children}
    </Animated.View>
  );

  // ============================================================================
  // ANIMATION STYLES
  // ============================================================================

  const animationStyles = {
    opacity: animation === 'fade' ? fadeAnim : 1,
    transform: [
      animation === 'slide' ? { translateY: slideAnim } : { translateY: 0 },
      animation === 'scale' ? { scale: scaleAnim } : { scale: 1 },
      animation === 'bounce' ? { scale: bounceAnim } : { scale: 1 },
    ],
  };

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  return (
    <Animated.View
      style={[
        styles.container,
        variantStyles,
        shadowStyle,
        animationStyles,
        {
          zIndex,
          position: 'relative',
        },
        containerStyle,
        style,
      ]}
    >
      <TouchableOpacity
        style={styles.touchable}
        onPress={handlePress}
        onLongPress={onLongPress}
        disabled={!onPress && !onLongPress && !collapsible}
        activeOpacity={onPress || onLongPress || collapsible ? 0.7 : 1}
        accessibilityLabel={accessibilityLabel || `Section header: ${title}`}
        testID={testID}
      >
        {renderContent()}
      </TouchableOpacity>
    </Animated.View>
  );
};

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
  },
  
  touchable: {
    width: '100%',
  },
  
  contentContainer: {
    width: '100%',
  },
  
  breadcrumbsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  
  breadcrumbItem: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  
  breadcrumbItemActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  
  breadcrumbText: {
    fontSize: 12,
    fontWeight: '400',
    opacity: 0.8,
  },
  
  breadcrumbTextActive: {
    fontWeight: '500',
    opacity: 1,
  },
  
  breadcrumbSeparator: {
    fontSize: 12,
    marginHorizontal: 4,
    opacity: 0.6,
  },
  
  mainContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  
  leftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  iconContainer: {
    marginRight: 12,
  },
  
  icon: {
    fontSize: 20,
    lineHeight: 24,
  },
  
  textContainer: {
    flex: 1,
  },
  
  title: {
    fontWeight: '600',
    lineHeight: 24,
    marginBottom: 2,
  },
  
  subtitle: {
    fontWeight: '400',
    lineHeight: 18,
    opacity: 0.8,
  },
  
  description: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    marginTop: 8,
    opacity: 0.9,
  },
  
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 4,
    minWidth: 32,
    minHeight: 32,
  },
  
  actionButtonDisabled: {
    opacity: 0.5,
  },
  
  actionIcon: {
    fontSize: 16,
    lineHeight: 20,
  },
  
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 18,
    marginLeft: 4,
  },
  
  collapseIndicator: {
    padding: 4,
  },
  
  collapseIcon: {
    fontSize: 12,
    lineHeight: 16,
  },
});

// ============================================================================
// EXPORTS
// ============================================================================

export default SectionHeader;
