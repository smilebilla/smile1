/**
 * Corp Astro UI Library - Accordion Component
 * Module 169: Accordion.tsx
 * 
 * A sophisticated accordion container component with cosmic design aesthetics
 * that manages collapsible content sections following Corp Astro design system.
 * 
 * Features:
 * - Cosmic accordion styling with gradient backgrounds
 * - Single or multiple panel expansion modes
 * - Smooth animations with customizable timing
 * - Icon support for expand/collapse indicators
 * - Accessibility compliance with proper ARIA attributes
 * - Theme-aware styling with Corp Astro colors
 * - Keyboard navigation support
 * - Custom content and styling support
 * 
 * Design System Compliance:
 * - Background: rgba(22,33,62,0.2) with cosmic styling
 * - BorderRadius: 16px with proper spacing
 * - Typography: Corp Astro text styles with hierarchy
 * - Spacing: 16px gaps between items
 * - Animations: smooth expand/collapse transitions
 * - Colors: Corp Astro palette with semantic usage
 * - Shadows: cosmic depth with proper elevation
 * 
 * @module Accordion
 * @version 1.0.0
 * @since 2024
 */

import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  AccessibilityProps,
} from 'react-native';
import { useTheme } from '../../foundations/themes/useTheme';
import { spacing } from '../../foundations/tokens/spacing/SpacingScale';
import { deepSpaceColors } from '../../foundations/tokens/colors/DeepSpaceColors';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type AccordionVariant = 'default' | 'bordered' | 'filled' | 'cosmic';
export type AccordionMode = 'single' | 'multiple';
export type AccordionAnimation = 'smooth' | 'spring' | 'elastic' | 'none';

export interface AccordionItem {
  /** Unique identifier for the item */
  id: string;
  /** Header title */
  title: string;
  /** Header subtitle */
  subtitle?: string;
  /** Header icon */
  icon?: string;
  /** Content to display when expanded */
  content: React.ReactNode;
  /** Whether item is disabled */
  disabled?: boolean;
  /** Whether item is initially expanded */
  defaultExpanded?: boolean;
  /** Custom header component */
  customHeader?: React.ComponentType<AccordionItemHeaderProps>;
  /** Custom content wrapper */
  customContent?: React.ComponentType<{ children: React.ReactNode }>;
  /** Accessibility label */
  accessibilityLabel?: string;
  /** Test ID */
  testID?: string;
}

export interface AccordionItemHeaderProps {
  title: string;
  subtitle?: string;
  icon?: string;
  isExpanded: boolean;
  isDisabled: boolean;
  onPress: () => void;
}

export interface AccordionProps extends AccessibilityProps {
  /** Array of accordion items */
  items: AccordionItem[];
  /** Accordion variant */
  variant?: AccordionVariant;
  /** Expansion mode */
  mode?: AccordionMode;
  /** Animation type */
  animation?: AccordionAnimation;
  /** Animation duration in milliseconds */
  animationDuration?: number;
  /** Initially expanded item IDs */
  defaultExpandedItems?: string[];
  /** Controlled expanded item IDs */
  expandedItems?: string[];
  /** Expansion change handler */
  onExpandedChange?: (expandedItems: string[]) => void;
  /** Individual item expansion handler */
  onItemToggle?: (itemId: string, isExpanded: boolean) => void;
  /** Whether to show dividers between items */
  showDividers?: boolean;
  /** Custom gap between items */
  itemGap?: number;
  /** Custom container styling */
  style?: ViewStyle;
  /** Custom item styling */
  itemStyle?: ViewStyle;
  /** Disable all interactions */
  disabled?: boolean;
  /** Test ID for testing */
  testID?: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * Accordion - Sophisticated accordion container component
 */
export const Accordion: React.FC<AccordionProps> = ({
  items,
  variant = 'default',
  mode = 'single',
  animation = 'smooth',
  animationDuration = 300,
  defaultExpandedItems = [],
  expandedItems: controlledExpandedItems,
  onExpandedChange,
  onItemToggle,
  showDividers = false,
  itemGap = spacing.md,
  style,
  itemStyle,
  disabled = false,
  testID = 'corp-astro-accordion',
  accessibilityLabel = 'Accordion',
  accessibilityHint = 'Expandable content sections',
  ...accessibilityProps
}) => {
  // ============================================================================
  // HOOKS & STATE
  // ============================================================================

  const { theme } = useTheme();
  
  // Internal state for uncontrolled mode
  const [internalExpandedItems, setInternalExpandedItems] = useState<string[]>(
    defaultExpandedItems
  );
  
  // Use controlled or internal state
  const expandedItems = controlledExpandedItems ?? internalExpandedItems;
  const setExpandedItems = onExpandedChange ?? setInternalExpandedItems;

  // ============================================================================
  // COMPUTED VALUES
  // ============================================================================

  /**
   * Get variant-specific styles
   */
  const variantStyles = useMemo(() => {
    const baseStyle = {
      backgroundColor: 'rgba(22, 33, 62, 0.2)',
      borderRadius: 16,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.1)',
    };

    switch (variant) {
      case 'bordered':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderColor: 'rgba(46, 134, 222, 0.3)',
        };
      case 'filled':
        return {
          ...baseStyle,
          backgroundColor: 'rgba(22, 33, 62, 0.4)',
          borderColor: 'rgba(255, 255, 255, 0.2)',
        };
      case 'cosmic':
        return {
          ...baseStyle,
          backgroundColor: 'rgba(26, 26, 46, 0.6)',
          borderColor: 'rgba(46, 134, 222, 0.4)',
          shadowColor: '#2E86DE',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 12,
          elevation: 8,
        };
      default:
        return baseStyle;
    }
  }, [variant]);

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  /**
   * Handle item toggle
   */
  const handleItemToggle = useCallback((itemId: string) => {
    if (disabled) return;
    
    const item = items.find(item => item.id === itemId);
    if (item?.disabled) return;

    const isCurrentlyExpanded = expandedItems.includes(itemId);
    const newExpandedItems = [...expandedItems];

    if (mode === 'single') {
      // Single mode: close all others, toggle current
      if (isCurrentlyExpanded) {
        setExpandedItems([]);
      } else {
        setExpandedItems([itemId]);
      }
    } else {
      // Multiple mode: toggle current item
      if (isCurrentlyExpanded) {
        const index = newExpandedItems.indexOf(itemId);
        newExpandedItems.splice(index, 1);
      } else {
        newExpandedItems.push(itemId);
      }
      setExpandedItems(newExpandedItems);
    }

    // Call individual item toggle handler
    onItemToggle?.(itemId, !isCurrentlyExpanded);
  }, [disabled, items, expandedItems, mode, setExpandedItems, onItemToggle]);

  // ============================================================================
  // RENDER HELPERS
  // ============================================================================

  /**
   * Render divider between items
   */
  const renderDivider = () => {
    if (!showDividers) return null;
    
    return (
      <View
        style={[
          styles.divider,
          { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
        ]}
      />
    );
  };

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  return (
    <View
      style={[
        styles.container,
        variantStyles,
        style,
      ]}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityRole="tablist"
      {...accessibilityProps}
    >
      {items.map((item, index) => {
        const isExpanded = expandedItems.includes(item.id);
        const isLast = index === items.length - 1;
        
        return (
          <View key={item.id}>
            {/* Import AccordionItem component */}
            <AccordionItemComponent
              item={item}
              isExpanded={isExpanded}
              onToggle={() => handleItemToggle(item.id)}
              animation={animation}
              animationDuration={animationDuration}
              disabled={disabled || item.disabled || false}
              style={itemStyle}
              testID={item.testID || `${testID}-item-${item.id}`}
            />
            
            {/* Divider */}
            {!isLast && renderDivider()}
            
            {/* Gap */}
            {!isLast && !showDividers && (
              <View style={{ height: itemGap }} />
            )}
          </View>
        );
      })}
    </View>
  );
};

// ============================================================================
// ACCORDION ITEM COMPONENT (Internal)
// ============================================================================

interface AccordionItemComponentProps {
  item: AccordionItem;
  isExpanded: boolean;
  onToggle: () => void;
  animation: AccordionAnimation;
  animationDuration: number;
  disabled: boolean;
  style?: ViewStyle;
  testID?: string;
}

const AccordionItemComponent: React.FC<AccordionItemComponentProps> = ({
  item,
  isExpanded,
  onToggle,
  animation,
  animationDuration,
  disabled,
  style,
  testID,
}) => {
  // Dynamic import to avoid circular dependency
  const AccordionItem = require('./AccordionItem').AccordionItem;
  
  return (
    <AccordionItem
      title={item.title}
      subtitle={item.subtitle}
      icon={item.icon}
      content={item.content}
      isExpanded={isExpanded}
      onToggle={onToggle}
      animation={animation}
      animationDuration={animationDuration}
      disabled={disabled}
      customHeader={item.customHeader}
      customContent={item.customContent}
      style={style}
      testID={testID}
      accessibilityLabel={item.accessibilityLabel}
    />
  );
};

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  divider: {
    height: 1,
    marginHorizontal: spacing.md,
    marginVertical: spacing.xs,
  },
});

// ============================================================================
// EXPORTS
// ============================================================================

export default Accordion;
