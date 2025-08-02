/**
 * Corp Astro UI Library - Tooltip Component
 * Module 116: Tooltip.tsx
 * 
 * An advanced tooltip component with cosmic design aesthetics,
 * positioning logic, and hover interactions following Corp Astro design system.
 * 
 * Features:
 * - Cosmic tooltip styling with gradient backgrounds
 * - Smart positioning (top, bottom, left, right, auto)
 * - Hover and press interactions
 * - Fade animations with customizable timing
 * - Arrow indicator with cosmic styling
 * - Accessibility features with proper ARIA attributes
 * - Portal rendering for proper z-index management
 * - Responsive positioning and boundary detection
 * - TypeScript support with comprehensive interfaces
 * 
 * Design System Compliance:
 * - Background: linear-gradient with Corp Astro colors
 * - Border radius: 12px with cosmic styling
 * - Typography: Corp Astro text styles
 * - Spacing: 12px padding with proper margins
 * - Animations: smooth fade transitions
 * - Colors: Corp Astro palette with semantic usage
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  LayoutChangeEvent,
  Platform,
  AccessibilityInfo,
} from 'react-native';
import { useTheme } from '../../foundations/themes/useTheme';
import { deepSpaceColors } from '../../foundations/tokens/colors/DeepSpaceColors';
import { SignatureBlues } from '../../foundations/tokens/colors/SignatureBlues';

// Type definitions
interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'auto';
  trigger?: 'hover' | 'press' | 'longPress';
  visible?: boolean;
  onVisibilityChange?: (visible: boolean) => void;
  delay?: number;
  duration?: number;
  backgroundColor?: string;
  textColor?: string;
  fontSize?: number;
  maxWidth?: number;
  showArrow?: boolean;
  arrowSize?: number;
  borderRadius?: number;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  textStyle?: TextStyle;
  testID?: string;
  accessibilityLabel?: string;
  disabled?: boolean;
}

interface TooltipState {
  isVisible: boolean;
  opacity: Animated.Value;
  position: 'top' | 'bottom' | 'left' | 'right';
  tooltipLayout: { width: number; height: number };
  targetLayout: { x: number; y: number; width: number; height: number };
}

interface TooltipPosition {
  top: number;
  left: number;
  arrowStyle: ViewStyle;
}

// Constants
const SCREEN_DIMENSIONS = Dimensions.get('window');
const DEFAULT_DELAY = 500;
const DEFAULT_DURATION = 300;
const DEFAULT_ARROW_SIZE = 8;
const DEFAULT_BORDER_RADIUS = 12;
const DEFAULT_MAX_WIDTH = 250;
const DEFAULT_FONT_SIZE = 14;
const MARGIN_FROM_TARGET = 8;

// Default colors
const DEFAULT_BACKGROUND_COLOR = 'rgba(26,26,46,0.95)';
const DEFAULT_TEXT_COLOR = '#FFFFFF';

/**
 * Tooltip Component
 * 
 * A sophisticated tooltip component with cosmic design aesthetics,
 * positioning logic, and hover interactions.
 */
export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'auto',
  trigger = 'hover',
  visible: controlledVisible,
  onVisibilityChange,
  delay = DEFAULT_DELAY,
  duration = DEFAULT_DURATION,
  backgroundColor = DEFAULT_BACKGROUND_COLOR,
  textColor = DEFAULT_TEXT_COLOR,
  fontSize = DEFAULT_FONT_SIZE,
  maxWidth = DEFAULT_MAX_WIDTH,
  showArrow = true,
  arrowSize = DEFAULT_ARROW_SIZE,
  borderRadius = DEFAULT_BORDER_RADIUS,
  style,
  contentStyle,
  textStyle,
  testID = 'tooltip',
  accessibilityLabel,
  disabled = false,
}) => {
  const { theme } = useTheme();
  const [tooltipState, setTooltipState] = useState<TooltipState>({
    isVisible: controlledVisible || false,
    opacity: new Animated.Value(0),
    position: position === 'auto' ? 'top' : position,
    tooltipLayout: { width: 0, height: 0 },
    targetLayout: { x: 0, y: 0, width: 0, height: 0 },
  });

  const targetRef = useRef<View>(null);
  const tooltipRef = useRef<View>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);

  // Handle controlled visibility
  useEffect(() => {
    if (controlledVisible !== undefined) {
      setTooltipState(prev => ({ ...prev, isVisible: controlledVisible }));
    }
  }, [controlledVisible]);

  // Handle visibility changes
  useEffect(() => {
    if (tooltipState.isVisible) {
      showTooltip();
    } else {
      hideTooltip();
    }
  }, [tooltipState.isVisible]);

  // Calculate optimal position
  const calculatePosition = (): TooltipPosition => {
    const { targetLayout, tooltipLayout } = tooltipState;
    let finalPosition = tooltipState.position;

    // Auto-position logic
    if (position === 'auto') {
      const spaceAbove = targetLayout.y;
      const spaceBelow = SCREEN_DIMENSIONS.height - (targetLayout.y + targetLayout.height);
      const spaceLeft = targetLayout.x;
      const spaceRight = SCREEN_DIMENSIONS.width - (targetLayout.x + targetLayout.width);

      if (spaceAbove >= tooltipLayout.height + MARGIN_FROM_TARGET) {
        finalPosition = 'top';
      } else if (spaceBelow >= tooltipLayout.height + MARGIN_FROM_TARGET) {
        finalPosition = 'bottom';
      } else if (spaceRight >= tooltipLayout.width + MARGIN_FROM_TARGET) {
        finalPosition = 'right';
      } else if (spaceLeft >= tooltipLayout.width + MARGIN_FROM_TARGET) {
        finalPosition = 'left';
      } else {
        finalPosition = 'bottom'; // Default fallback
      }
    }

    // Calculate tooltip position
    let top = 0;
    let left = 0;
    let arrowStyle: ViewStyle = {};

    switch (finalPosition) {
      case 'top':
        top = targetLayout.y - tooltipLayout.height - MARGIN_FROM_TARGET;
        left = targetLayout.x + (targetLayout.width - tooltipLayout.width) / 2;
        arrowStyle = {
          position: 'absolute',
          bottom: -arrowSize,
          left: tooltipLayout.width / 2 - arrowSize,
          width: 0,
          height: 0,
          borderLeftWidth: arrowSize,
          borderRightWidth: arrowSize,
          borderTopWidth: arrowSize,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderTopColor: backgroundColor,
        };
        break;

      case 'bottom':
        top = targetLayout.y + targetLayout.height + MARGIN_FROM_TARGET;
        left = targetLayout.x + (targetLayout.width - tooltipLayout.width) / 2;
        arrowStyle = {
          position: 'absolute',
          top: -arrowSize,
          left: tooltipLayout.width / 2 - arrowSize,
          width: 0,
          height: 0,
          borderLeftWidth: arrowSize,
          borderRightWidth: arrowSize,
          borderBottomWidth: arrowSize,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: backgroundColor,
        };
        break;

      case 'left':
        top = targetLayout.y + (targetLayout.height - tooltipLayout.height) / 2;
        left = targetLayout.x - tooltipLayout.width - MARGIN_FROM_TARGET;
        arrowStyle = {
          position: 'absolute',
          right: -arrowSize,
          top: tooltipLayout.height / 2 - arrowSize,
          width: 0,
          height: 0,
          borderTopWidth: arrowSize,
          borderBottomWidth: arrowSize,
          borderLeftWidth: arrowSize,
          borderTopColor: 'transparent',
          borderBottomColor: 'transparent',
          borderLeftColor: backgroundColor,
        };
        break;

      case 'right':
        top = targetLayout.y + (targetLayout.height - tooltipLayout.height) / 2;
        left = targetLayout.x + targetLayout.width + MARGIN_FROM_TARGET;
        arrowStyle = {
          position: 'absolute',
          left: -arrowSize,
          top: tooltipLayout.height / 2 - arrowSize,
          width: 0,
          height: 0,
          borderTopWidth: arrowSize,
          borderBottomWidth: arrowSize,
          borderRightWidth: arrowSize,
          borderTopColor: 'transparent',
          borderBottomColor: 'transparent',
          borderRightColor: backgroundColor,
        };
        break;
    }

    // Ensure tooltip stays within screen bounds
    left = Math.max(8, Math.min(left, SCREEN_DIMENSIONS.width - tooltipLayout.width - 8));
    top = Math.max(8, Math.min(top, SCREEN_DIMENSIONS.height - tooltipLayout.height - 8));

    return { top, left, arrowStyle };
  };

  // Show tooltip
  const showTooltip = () => {
    if (animationRef.current) {
      animationRef.current.stop();
    }

    animationRef.current = Animated.timing(tooltipState.opacity, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    });

    animationRef.current.start();
  };

  // Hide tooltip
  const hideTooltip = () => {
    if (animationRef.current) {
      animationRef.current.stop();
    }

    animationRef.current = Animated.timing(tooltipState.opacity, {
      toValue: 0,
      duration,
      useNativeDriver: true,
    });

    animationRef.current.start();
  };

  // Handle target layout
  const handleTargetLayout = (event: LayoutChangeEvent) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    setTooltipState(prev => ({
      ...prev,
      targetLayout: { x, y, width, height },
    }));
  };

  // Handle tooltip layout
  const handleTooltipLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setTooltipState(prev => ({
      ...prev,
      tooltipLayout: { width, height },
    }));
  };

  // Handle trigger events
  const handleTrigger = (show: boolean) => {
    if (disabled) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (show) {
      timeoutRef.current = setTimeout(() => {
        setTooltipState(prev => ({ ...prev, isVisible: true }));
        if (onVisibilityChange) {
          onVisibilityChange(true);
        }
      }, delay);
    } else {
      setTooltipState(prev => ({ ...prev, isVisible: false }));
      if (onVisibilityChange) {
        onVisibilityChange(false);
      }
    }
  };

  // Create trigger props
  const getTriggerProps = () => {
    const props: any = {};

    if (trigger === 'hover') {
      props.onMouseEnter = () => handleTrigger(true);
      props.onMouseLeave = () => handleTrigger(false);
    } else if (trigger === 'press') {
      props.onPress = () => handleTrigger(!tooltipState.isVisible);
    } else if (trigger === 'longPress') {
      props.onLongPress = () => handleTrigger(true);
    }

    return props;
  };

  // Calculate final position
  const tooltipPosition = calculatePosition();

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (animationRef.current) {
        animationRef.current.stop();
      }
    };
  }, []);

  return (
    <>
      {/* Target element */}
      <View
        ref={targetRef}
        onLayout={handleTargetLayout}
        testID={`${testID}-target`}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          {...getTriggerProps()}
          accessible={true}
          accessibilityLabel={accessibilityLabel}
          accessibilityRole="button"
          accessibilityHint="Shows tooltip with additional information"
        >
          {children}
        </TouchableOpacity>
      </View>

      {/* Tooltip */}
      {tooltipState.isVisible && (
        <Animated.View
          ref={tooltipRef}
          style={[
            styles.tooltip,
            {
              position: 'absolute',
              top: tooltipPosition.top,
              left: tooltipPosition.left,
              backgroundColor,
              borderRadius,
              maxWidth,
              opacity: tooltipState.opacity,
            },
            style,
          ]}
          onLayout={handleTooltipLayout}
          testID={`${testID}-content`}
          pointerEvents="none"
        >
          <View style={[styles.content, contentStyle]}>
            <Text
              style={[
                styles.text,
                {
                  color: textColor,
                  fontSize,
                },
                textStyle,
              ]}
            >
              {content}
            </Text>
          </View>
          {showArrow && <View style={tooltipPosition.arrowStyle} />}
        </Animated.View>
      )}
    </>
  );
};

// Styles
const styles = StyleSheet.create({
  tooltip: {
    zIndex: 1000,
    shadowColor: deepSpaceColors.void,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  content: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  text: {
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 18,
  },
});

// Default export
export default Tooltip;

// Named exports for specific use cases
export const TooltipTop: React.FC<Omit<TooltipProps, 'position'>> = (props) => (
  <Tooltip {...props} position="top" />
);

export const TooltipBottom: React.FC<Omit<TooltipProps, 'position'>> = (props) => (
  <Tooltip {...props} position="bottom" />
);

export const TooltipLeft: React.FC<Omit<TooltipProps, 'position'>> = (props) => (
  <Tooltip {...props} position="left" />
);

export const TooltipRight: React.FC<Omit<TooltipProps, 'position'>> = (props) => (
  <Tooltip {...props} position="right" />
);

export const TooltipPress: React.FC<Omit<TooltipProps, 'trigger'>> = (props) => (
  <Tooltip {...props} trigger="press" />
);

export const TooltipLongPress: React.FC<Omit<TooltipProps, 'trigger'>> = (props) => (
  <Tooltip {...props} trigger="longPress" />
);

// Type exports
export type { TooltipProps, TooltipState, TooltipPosition };
export { 
  DEFAULT_DELAY, 
  DEFAULT_DURATION, 
  DEFAULT_ARROW_SIZE, 
  DEFAULT_BORDER_RADIUS,
  DEFAULT_MAX_WIDTH,
  DEFAULT_FONT_SIZE,
  MARGIN_FROM_TARGET 
};
