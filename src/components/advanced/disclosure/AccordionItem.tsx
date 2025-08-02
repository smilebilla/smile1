/**
 * Corp Astro UI Library - Accordion Item Component
 * Module 170: AccordionItem.tsx
 * 
 * An individual accordion item component with cosmic design aesthetics
 * that provides expandable content sections following Corp Astro design system.
 * 
 * Features:
 * - Cosmic accordion item styling with smooth animations
 * - Customizable header with title, subtitle, and icon
 * - Smooth expand/collapse animations
 * - Interactive header with hover and press states
 * - Accessibility compliance with proper ARIA attributes
 * - Theme-aware styling with Corp Astro colors
 * - Custom content support
 * - Disabled state handling
 * 
 * Design System Compliance:
 * - Header: 56px min height with proper padding
 * - Background: rgba(22,33,62,0.1) with cosmic styling
 * - BorderRadius: 12px for header, smooth transitions
 * - Typography: Inter for content, hierarchy maintained
 * - Spacing: 16px padding with proper margins
 * - Animations: smooth height transitions
 * - Colors: Corp Astro palette with semantic usage
 * 
 * @module AccordionItem
 * @version 1.0.0
 * @since 2024
 */

import React, { useRef, useState, useEffect, useCallback } from 'react';
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
} from 'react-native';
import { useTheme } from '../../foundations/themes/useTheme';
import { spacing } from '../../foundations/tokens/spacing/SpacingScale';
import { SignatureBlues } from '../../foundations/tokens/colors/SignatureBlues';
import { ProfessionalGrays } from '../../foundations/tokens/colors/ProfessionalGrays';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type AccordionItemAnimation = 'smooth' | 'spring' | 'elastic' | 'none';

export interface AccordionItemHeaderProps {
  title: string;
  subtitle?: string;
  icon?: string;
  isExpanded: boolean;
  isDisabled: boolean;
  onPress: () => void;
}

export interface AccordionItemProps extends AccessibilityProps {
  /** Header title */
  title: string;
  /** Header subtitle */
  subtitle?: string;
  /** Header icon */
  icon?: string;
  /** Content to display when expanded */
  content: React.ReactNode;
  /** Whether item is expanded */
  isExpanded: boolean;
  /** Toggle expansion handler */
  onToggle: () => void;
  /** Animation type */
  animation?: AccordionItemAnimation;
  /** Animation duration in milliseconds */
  animationDuration?: number;
  /** Whether item is disabled */
  disabled?: boolean;
  /** Custom header component */
  customHeader?: React.ComponentType<AccordionItemHeaderProps>;
  /** Custom content wrapper */
  customContent?: React.ComponentType<{ children: React.ReactNode }>;
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
  /** Test ID for testing */
  testID?: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * AccordionItem - Individual accordion item component
 */
export const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  subtitle,
  icon,
  content,
  isExpanded,
  onToggle,
  animation = 'smooth',
  animationDuration = 300,
  disabled = false,
  customHeader: CustomHeader,
  customContent: CustomContent,
  style,
  headerStyle,
  titleStyle,
  subtitleStyle,
  contentStyle,
  testID = 'accordion-item',
  accessibilityLabel,
  accessibilityHint = 'Double tap to expand or collapse',
  ...accessibilityProps
}) => {
  // ============================================================================
  // HOOKS & STATE
  // ============================================================================

  const { theme } = useTheme();
  
  // Animation values
  const heightAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  
  // Content height tracking
  const [contentHeight, setContentHeight] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // ============================================================================
  // EFFECTS
  // ============================================================================

  /**
   * Animate expansion/collapse
   */
  useEffect(() => {
    if (animation === 'none') {
      heightAnim.setValue(isExpanded ? contentHeight : 0);
      opacityAnim.setValue(isExpanded ? 1 : 0);
      rotateAnim.setValue(isExpanded ? 1 : 0);
      return;
    }

    setIsAnimating(true);
    
    const animations: Animated.CompositeAnimation[] = [];
    
    // Height animation
    if (animation === 'spring') {
      animations.push(
        Animated.spring(heightAnim, {
          toValue: isExpanded ? contentHeight : 0,
          tension: 100,
          friction: 8,
          useNativeDriver: false,
        })
      );
    } else if (animation === 'elastic') {
      animations.push(
        Animated.spring(heightAnim, {
          toValue: isExpanded ? contentHeight : 0,
          tension: 50,
          friction: 6,
          useNativeDriver: false,
        })
      );
    } else {
      animations.push(
        Animated.timing(heightAnim, {
          toValue: isExpanded ? contentHeight : 0,
          duration: animationDuration,
          useNativeDriver: false,
        })
      );
    }

    // Opacity animation
    animations.push(
      Animated.timing(opacityAnim, {
        toValue: isExpanded ? 1 : 0,
        duration: animationDuration * 0.8,
        delay: isExpanded ? animationDuration * 0.2 : 0,
        useNativeDriver: true,
      })
    );

    // Rotation animation for indicator
    animations.push(
      Animated.timing(rotateAnim, {
        toValue: isExpanded ? 1 : 0,
        duration: animationDuration,
        useNativeDriver: true,
      })
    );

    Animated.parallel(animations).start(() => {
      setIsAnimating(false);
    });
  }, [isExpanded, contentHeight, animation, animationDuration]);

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  /**
   * Handle content layout to measure height
   */
  const handleContentLayout = useCallback((event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setContentHeight(height);
  }, []);

  /**
   * Handle header press
   */
  const handleHeaderPress = useCallback(() => {
    if (!disabled && !isAnimating) {
      onToggle();
    }
  }, [disabled, isAnimating, onToggle]);

  /**
   * Handle header press in/out for scale animation
   */
  const handlePressIn = useCallback(() => {
    if (!disabled) {
      Animated.spring(scaleAnim, {
        toValue: 0.98,
        tension: 300,
        friction: 20,
        useNativeDriver: true,
      }).start();
    }
  }, [disabled]);

  const handlePressOut = useCallback(() => {
    if (!disabled) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 300,
        friction: 20,
        useNativeDriver: true,
      }).start();
    }
  }, [disabled]);

  // ============================================================================
  // RENDER HELPERS
  // ============================================================================

  /**
   * Render default header
   */
  const renderDefaultHeader = () => (
    <View style={styles.headerContent}>
      {/* Icon */}
      {icon && (
        <View style={styles.iconContainer}>
          <Text style={[styles.icon, { color: SignatureBlues.light }]}>
            {icon}
          </Text>
        </View>
      )}
      
      {/* Text Content */}
      <View style={styles.textContainer}>
        <Text
          style={[
            styles.title,
            { color: ProfessionalGrays.white },
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
              { color: ProfessionalGrays.medium },
              disabled && styles.disabledText,
              subtitleStyle,
            ]}
            numberOfLines={1}
          >
            {subtitle}
          </Text>
        )}
      </View>
      
      {/* Expand Indicator */}
      <Animated.View
        style={[
          styles.expandIndicator,
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
            styles.expandIcon,
            { color: disabled ? ProfessionalGrays.muted : SignatureBlues.light },
          ]}
        >
          ▼
        </Text>
      </Animated.View>
    </View>
  );

  /**
   * Render header content
   */
  const renderHeader = () => {
    if (CustomHeader) {
      return (
        <CustomHeader
          title={title}
          subtitle={subtitle}
          icon={icon}
          isExpanded={isExpanded}
          isDisabled={disabled}
          onPress={handleHeaderPress}
        />
      );
    }

    return renderDefaultHeader();
  };

  /**
   * Render content wrapper
   */
  const renderContent = () => {
    const contentElement = CustomContent ? (
      <CustomContent>{content}</CustomContent>
    ) : (
      <View style={[styles.contentWrapper, contentStyle]}>
        {content}
      </View>
    );

    return (
      <View style={styles.contentContainer}>
        <Animated.View
          style={[
            styles.animatedContent,
            {
              height: heightAnim,
              opacity: opacityAnim,
            },
          ]}
        >
          <View
            style={styles.contentMeasure}
            onLayout={handleContentLayout}
          >
            {contentElement}
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
        { transform: [{ scale: scaleAnim }] },
        style,
      ]}
      testID={testID}
    >
      {/* Header */}
      <TouchableOpacity
        style={[
          styles.header,
          disabled && styles.disabledHeader,
          headerStyle,
        ]}
        onPress={handleHeaderPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        activeOpacity={0.8}
        accessibilityLabel={accessibilityLabel || `${title}${subtitle ? `, ${subtitle}` : ''}`}
        accessibilityHint={accessibilityHint}
        accessibilityRole="button"
        accessibilityState={{
          expanded: isExpanded,
          disabled: disabled,
        }}
        testID={`${testID}-header`}
        {...accessibilityProps}
      >
        {renderHeader()}
      </TouchableOpacity>

      {/* Content */}
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
    minHeight: 56,
    backgroundColor: 'rgba(22, 33, 62, 0.1)',
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  disabledHeader: {
    opacity: 0.5,
    backgroundColor: 'rgba(22, 33, 62, 0.05)',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(46, 134, 222, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  icon: {
    fontSize: 18,
    lineHeight: 22,
  },
  textContainer: {
    flex: 1,
    marginRight: spacing.sm,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter',
    lineHeight: 22,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Inter',
    lineHeight: 18,
    marginTop: 2,
    opacity: 0.8,
  },
  disabledText: {
    opacity: 0.5,
  },
  expandIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(46, 134, 222, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  expandIcon: {
    fontSize: 12,
    lineHeight: 16,
  },
  contentContainer: {
    overflow: 'hidden',
  },
  animatedContent: {
    overflow: 'hidden',
  },
  contentMeasure: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    opacity: 0,
  },
  contentWrapper: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: 'rgba(22, 33, 62, 0.05)',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    marginTop: spacing.xs,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
});

// ============================================================================
// EXPORTS
// ============================================================================

export default AccordionItem;
