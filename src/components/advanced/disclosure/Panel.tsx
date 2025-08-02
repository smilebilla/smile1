/**
 * Corp Astro UI Library - Panel Component
 * Module 171: Panel.tsx
 * 
 * A collapsible panel component with cosmic design aesthetics
 * that provides organized content sections following Corp Astro design system.
 * 
 * Features:
 * - Cosmic panel styling with gradient backgrounds
 * - Collapsible content with smooth animations
 * - Multiple panel variants and sizes
 * - Header with title, subtitle, and actions
 * - Accessibility compliance with proper ARIA attributes
 * - Theme-aware styling with Corp Astro colors
 * - Custom content and action support
 * - Loading and empty states
 * 
 * Design System Compliance:
 * - Container: borderRadius 20px with cosmic styling
 * - Header: 64px min height with proper padding
 * - Background: rgba(22,33,62,0.3) with cosmic gradients
 * - Typography: Corp Astro text styles with hierarchy
 * - Spacing: 20px padding with proper margins
 * - Animations: smooth expand/collapse transitions
 * - Colors: Corp Astro palette with semantic usage
 * - Shadows: cosmic depth with proper elevation
 * 
 * @module Panel
 * @version 1.0.0
 * @since 2024
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ViewStyle,
  TextStyle,
  LayoutChangeEvent,
  AccessibilityProps,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../foundations/themes/useTheme';
import { spacing } from '../../foundations/tokens/spacing/SpacingScale';
import { SignatureBlues } from '../../foundations/tokens/colors/SignatureBlues';
import { ProfessionalGrays } from '../../foundations/tokens/colors/ProfessionalGrays';
import { deepSpaceColors } from '../../foundations/tokens/colors/DeepSpaceColors';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type PanelVariant = 'default' | 'elevated' | 'bordered' | 'cosmic' | 'glass';
export type PanelSize = 'small' | 'medium' | 'large';
export type PanelAnimation = 'smooth' | 'spring' | 'elastic' | 'none';

export interface PanelAction {
  /** Unique identifier */
  id: string;
  /** Action icon */
  icon?: string;
  /** Action text */
  text?: string;
  /** Action handler */
  onPress: () => void;
  /** Whether action is disabled */
  disabled?: boolean;
  /** Accessibility label */
  accessibilityLabel?: string;
  /** Test ID */
  testID?: string;
}

export interface PanelProps extends AccessibilityProps {
  /** Panel title */
  title: string;
  /** Panel subtitle */
  subtitle?: string;
  /** Panel description */
  description?: string;
  /** Header icon */
  icon?: string;
  /** Panel content */
  children: React.ReactNode;
  /** Panel variant */
  variant?: PanelVariant;
  /** Panel size */
  size?: PanelSize;
  /** Animation type */
  animation?: PanelAnimation;
  /** Animation duration in milliseconds */
  animationDuration?: number;
  /** Whether panel is collapsible */
  collapsible?: boolean;
  /** Whether panel is collapsed */
  collapsed?: boolean;
  /** Collapse state change handler */
  onCollapseChange?: (collapsed: boolean) => void;
  /** Panel actions */
  actions?: PanelAction[];
  /** Whether panel is loading */
  loading?: boolean;
  /** Loading text */
  loadingText?: string;
  /** Whether content is empty */
  isEmpty?: boolean;
  /** Empty state component */
  emptyState?: React.ReactNode;
  /** Custom container styling */
  style?: ViewStyle;
  /** Custom header styling */
  headerStyle?: ViewStyle;
  /** Custom title styling */
  titleStyle?: TextStyle;
  /** Custom subtitle styling */
  subtitleStyle?: TextStyle;
  /** Custom content styling */
  contentStyle?: ViewStyle;
  /** Whether panel is disabled */
  disabled?: boolean;
  /** Test ID for testing */
  testID?: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * Panel - Collapsible panel component with cosmic aesthetics
 */
export const Panel: React.FC<PanelProps> = ({
  title,
  subtitle,
  description,
  icon,
  children,
  variant = 'default',
  size = 'medium',
  animation = 'smooth',
  animationDuration = 300,
  collapsible = true,
  collapsed: controlledCollapsed,
  onCollapseChange,
  actions = [],
  loading = false,
  loadingText = 'Loading...',
  isEmpty = false,
  emptyState,
  style,
  headerStyle,
  titleStyle,
  subtitleStyle,
  contentStyle,
  disabled = false,
  testID = 'corp-astro-panel',
  accessibilityLabel,
  accessibilityHint = 'Panel with collapsible content',
  ...accessibilityProps
}) => {
  // ============================================================================
  // HOOKS & STATE
  // ============================================================================

  const { theme } = useTheme();
  
  // Internal collapse state
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const collapsed = controlledCollapsed ?? internalCollapsed;
  const setCollapsed = onCollapseChange ?? setInternalCollapsed;
  
  // Animation values
  const heightAnim = useRef(new Animated.Value(collapsed ? 0 : 1)).current;
  const opacityAnim = useRef(new Animated.Value(collapsed ? 0 : 1)).current;
  const rotateAnim = useRef(new Animated.Value(collapsed ? 0 : 1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  
  // Content height tracking
  const [contentHeight, setContentHeight] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // ============================================================================
  // COMPUTED VALUES
  // ============================================================================

  /**
   * Get size-specific configurations
   */
  const sizeConfig = React.useMemo(() => {
    switch (size) {
      case 'small':
        return {
          headerHeight: 56,
          padding: spacing.sm,
          titleSize: 16,
          subtitleSize: 14,
          iconSize: 20,
        };
      case 'large':
        return {
          headerHeight: 72,
          padding: spacing.xl,
          titleSize: 20,
          subtitleSize: 16,
          iconSize: 28,
        };
      default:
        return {
          headerHeight: 64,
          padding: spacing.lg,
          titleSize: 18,
          subtitleSize: 15,
          iconSize: 24,
        };
    }
  }, [size]);

  /**
   * Get variant-specific styles
   */
  const variantStyles = React.useMemo(() => {
    const baseStyle = {
      backgroundColor: 'rgba(22, 33, 62, 0.3)',
      borderRadius: 20,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.1)',
    };

    switch (variant) {
      case 'elevated':
        return {
          ...baseStyle,
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.3,
          shadowRadius: 16,
          elevation: 8,
        };
      case 'bordered':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderColor: 'rgba(46, 134, 222, 0.4)',
          borderWidth: 2,
        };
      case 'cosmic':
        return {
          ...baseStyle,
          backgroundColor: 'rgba(26, 26, 46, 0.8)',
          borderColor: 'rgba(46, 134, 222, 0.6)',
          shadowColor: '#2E86DE',
          shadowOffset: { width: 0, height: 12 },
          shadowOpacity: 0.4,
          shadowRadius: 20,
          elevation: 12,
        };
      case 'glass':
        return {
          ...baseStyle,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderColor: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(20px)',
        };
      default:
        return baseStyle;
    }
  }, [variant]);

  // ============================================================================
  // EFFECTS
  // ============================================================================

  /**
   * Animate collapse/expand
   */
  useEffect(() => {
    if (!collapsible || animation === 'none') {
      heightAnim.setValue(collapsed ? 0 : contentHeight);
      opacityAnim.setValue(collapsed ? 0 : 1);
      rotateAnim.setValue(collapsed ? 0 : 1);
      return;
    }

    setIsAnimating(true);
    
    const animations: Animated.CompositeAnimation[] = [];
    
    // Height animation
    if (animation === 'spring') {
      animations.push(
        Animated.spring(heightAnim, {
          toValue: collapsed ? 0 : contentHeight,
          tension: 100,
          friction: 8,
          useNativeDriver: false,
        })
      );
    } else if (animation === 'elastic') {
      animations.push(
        Animated.spring(heightAnim, {
          toValue: collapsed ? 0 : contentHeight,
          tension: 50,
          friction: 6,
          useNativeDriver: false,
        })
      );
    } else {
      animations.push(
        Animated.timing(heightAnim, {
          toValue: collapsed ? 0 : contentHeight,
          duration: animationDuration,
          useNativeDriver: false,
        })
      );
    }

    // Opacity animation
    animations.push(
      Animated.timing(opacityAnim, {
        toValue: collapsed ? 0 : 1,
        duration: animationDuration * 0.8,
        delay: collapsed ? 0 : animationDuration * 0.2,
        useNativeDriver: true,
      })
    );

    // Rotation animation for collapse indicator
    animations.push(
      Animated.timing(rotateAnim, {
        toValue: collapsed ? 0 : 1,
        duration: animationDuration,
        useNativeDriver: true,
      })
    );

    Animated.parallel(animations).start(() => {
      setIsAnimating(false);
    });
  }, [collapsed, contentHeight, collapsible, animation, animationDuration]);

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  /**
   * Handle content layout to measure height
   */
  const handleContentLayout = useCallback((event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    if (height !== contentHeight) {
      setContentHeight(height);
    }
  }, [contentHeight]);

  /**
   * Handle header press
   */
  const handleHeaderPress = useCallback(() => {
    if (!disabled && !isAnimating && collapsible) {
      const newCollapsed = !collapsed;
      setCollapsed(newCollapsed);
    }
  }, [disabled, isAnimating, collapsible, collapsed, setCollapsed]);

  /**
   * Handle press animations
   */
  const handlePressIn = useCallback(() => {
    if (!disabled && collapsible) {
      Animated.spring(scaleAnim, {
        toValue: 0.98,
        tension: 300,
        friction: 20,
        useNativeDriver: true,
      }).start();
    }
  }, [disabled, collapsible]);

  const handlePressOut = useCallback(() => {
    if (!disabled && collapsible) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 300,
        friction: 20,
        useNativeDriver: true,
      }).start();
    }
  }, [disabled, collapsible]);

  // ============================================================================
  // RENDER HELPERS
  // ============================================================================

  /**
   * Render panel header
   */
  const renderHeader = () => (
    <TouchableOpacity
      style={[
        styles.header,
        { 
          minHeight: sizeConfig.headerHeight,
          paddingHorizontal: sizeConfig.padding,
        },
        disabled && styles.disabledHeader,
        headerStyle,
      ]}
      onPress={handleHeaderPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || !collapsible}
      activeOpacity={collapsible ? 0.8 : 1}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityHint={collapsible ? 'Double tap to expand or collapse' : undefined}
      accessibilityRole={collapsible ? 'button' : 'header'}
      accessibilityState={{
        expanded: collapsible ? !collapsed : undefined,
        disabled: disabled,
      }}
      testID={`${testID}-header`}
    >
      <LinearGradient
        colors={[
          'rgba(22, 33, 62, 0.1)',
          'rgba(26, 26, 46, 0.1)',
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={StyleSheet.absoluteFillObject}
      />
      
      <View style={styles.headerContent}>
        {/* Icon */}
        {icon && (
          <View style={[
            styles.iconContainer,
            { width: sizeConfig.iconSize + 16, height: sizeConfig.iconSize + 16 }
          ]}>
            <Text style={[
              styles.icon,
              { fontSize: sizeConfig.iconSize, color: SignatureBlues.light }
            ]}>
              {icon}
            </Text>
          </View>
        )}
        
        {/* Text Content */}
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.title,
              {
                fontSize: sizeConfig.titleSize,
                color: ProfessionalGrays.white,
              },
              disabled && styles.disabledText,
              titleStyle,
            ]}
            numberOfLines={1}
          >
            {title}
          </Text>
          
          {subtitle && (
            <Text
              style={[
                styles.subtitle,
                {
                  fontSize: sizeConfig.subtitleSize,
                  color: ProfessionalGrays.medium,
                },
                disabled && styles.disabledText,
                subtitleStyle,
              ]}
              numberOfLines={1}
            >
              {subtitle}
            </Text>
          )}
          
          {description && !collapsed && (
            <Text
              style={[
                styles.description,
                {
                  fontSize: sizeConfig.subtitleSize - 1,
                  color: ProfessionalGrays.light,
                },
                disabled && styles.disabledText,
              ]}
              numberOfLines={2}
            >
              {description}
            </Text>
          )}
        </View>
        
        {/* Actions */}
        {actions.length > 0 && (
          <View style={styles.actionsContainer}>
            {actions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={[
                  styles.actionButton,
                  action.disabled && styles.disabledAction,
                ]}
                onPress={action.onPress}
                disabled={action.disabled || disabled}
                accessibilityLabel={action.accessibilityLabel}
                testID={action.testID}
              >
                {action.icon && (
                  <Text style={[
                    styles.actionIcon,
                    { color: action.disabled ? ProfessionalGrays.muted : SignatureBlues.light }
                  ]}>
                    {action.icon}
                  </Text>
                )}
                {action.text && (
                  <Text style={[
                    styles.actionText,
                    { color: action.disabled ? ProfessionalGrays.muted : SignatureBlues.light }
                  ]}>
                    {action.text}
                  </Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}
        
        {/* Collapse Indicator */}
        {collapsible && (
          <Animated.View
            style={[
              styles.collapseIndicator,
              {
                transform: [
                  {
                    rotate: rotateAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '180deg'],
                    }),
                  },
                ],
              },
            ]}
          >
            <Text
              style={[
                styles.collapseIcon,
                { color: disabled ? ProfessionalGrays.muted : SignatureBlues.light },
              ]}
            >
              ▼
            </Text>
          </Animated.View>
        )}
      </View>
    </TouchableOpacity>
  );

  /**
   * Render panel content
   */
  const renderContent = () => {
    if (collapsible && collapsed) {
      return null;
    }

    // Loading state
    if (loading) {
      return (
        <View style={[
          styles.contentWrapper,
          { padding: sizeConfig.padding },
          contentStyle,
        ]}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator
              size="large"
              color={SignatureBlues.primary}
            />
            <Text style={[
              styles.loadingText,
              { color: ProfessionalGrays.medium }
            ]}>
              {loadingText}
            </Text>
          </View>
        </View>
      );
    }

    // Empty state
    if (isEmpty && emptyState) {
      return (
        <View style={[
          styles.contentWrapper,
          { padding: sizeConfig.padding },
          contentStyle,
        ]}>
          {emptyState}
        </View>
      );
    }

    // Content with animation
    return (
      <View style={styles.contentContainer}>
        <Animated.View
          style={[
            styles.animatedContent,
            {
              height: collapsible ? heightAnim : 'auto',
              opacity: collapsible ? opacityAnim : 1,
            },
          ]}
        >
          <View
            style={[
              styles.contentWrapper,
              { padding: sizeConfig.padding },
              contentStyle,
            ]}
            onLayout={handleContentLayout}
          >
            {children}
          </View>
        </Animated.View>
      </View>
    );
  };

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  return (
    <Animated.View
      style={[
        styles.container,
        variantStyles,
        { transform: [{ scale: scaleAnim }] },
        style,
      ]}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      {...accessibilityProps}
    >
      {renderHeader()}
      {renderContent()}
    </Animated.View>
  );
};

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  header: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  disabledHeader: {
    opacity: 0.5,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    zIndex: 1,
  },
  iconContainer: {
    borderRadius: 20,
    backgroundColor: 'rgba(46, 134, 222, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  icon: {
    lineHeight: 28,
  },
  textContainer: {
    flex: 1,
    marginRight: spacing.sm,
  },
  title: {
    fontWeight: '600',
    fontFamily: 'Inter',
    lineHeight: 24,
  },
  subtitle: {
    fontWeight: '500',
    fontFamily: 'Inter',
    lineHeight: 20,
    marginTop: 2,
    opacity: 0.9,
  },
  description: {
    fontWeight: '400',
    fontFamily: 'Inter',
    lineHeight: 18,
    marginTop: 4,
    opacity: 0.8,
  },
  disabledText: {
    opacity: 0.5,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xs,
    borderRadius: 8,
    marginLeft: spacing.xs,
    minWidth: 32,
    minHeight: 32,
  },
  disabledAction: {
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
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(46, 134, 222, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  collapseIcon: {
    fontSize: 14,
    lineHeight: 18,
  },
  contentContainer: {
    overflow: 'hidden',
  },
  animatedContent: {
    overflow: 'hidden',
  },
  contentWrapper: {
    backgroundColor: 'rgba(22, 33, 62, 0.1)',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Inter',
    marginTop: spacing.sm,
    textAlign: 'center',
  },
});

// ============================================================================
// EXPORTS
// ============================================================================

export default Panel;
