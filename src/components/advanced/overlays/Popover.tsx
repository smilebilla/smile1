/**
 * Corp Astro UI Library - Popover Component
 * Module 117: Popover.tsx
 * 
 * An advanced popover component with cosmic design aesthetics,
 * positioning logic, and interactive content following Corp Astro design system.
 * 
 * Features:
 * - Cosmic popover styling with gradient backgrounds
 * - Smart positioning with boundary detection
 * - Click and hover trigger support
 * - Smooth animations with fade and scale effects
 * - Arrow indicators with cosmic styling
 * - Accessibility features with proper ARIA attributes
 * - Portal rendering for proper z-index management
 * - Responsive design and touch-friendly interactions
 * - TypeScript support with comprehensive interfaces
 * 
 * Design System Compliance:
 * - Background: linear-gradient with Corp Astro colors
 * - Border radius: 16px with cosmic styling
 * - Typography: Corp Astro text styles
 * - Spacing: 16px padding with proper margins
 * - Animations: smooth fade and scale transitions
 * - Colors: Corp Astro palette with semantic usage
 * - Shadows: cosmic depth with proper elevation
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ViewStyle,
  LayoutChangeEvent,
  Modal,
  Platform,
  AccessibilityInfo,
  BackHandler,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../foundations/themes/useTheme';
import { deepSpaceColors } from '../../foundations/tokens/colors/DeepSpaceColors';
import { SignatureBlues } from '../../foundations/tokens/colors/SignatureBlues';

// Type definitions
interface PopoverProps {
  content: React.ReactNode;
  children: React.ReactNode;
  visible?: boolean;
  onVisibilityChange?: (visible: boolean) => void;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'auto';
  trigger?: 'click' | 'hover' | 'longPress' | 'manual';
  animationType?: 'fade' | 'scale' | 'slide';
  animationDuration?: number;
  delay?: number;
  backgroundColor?: string;
  borderRadius?: number;
  maxWidth?: number;
  maxHeight?: number;
  showArrow?: boolean;
  arrowSize?: number;
  offset?: number;
  dismissOnOutsidePress?: boolean;
  dismissOnBackdropPress?: boolean;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  testID?: string;
  accessibilityLabel?: string;
  disabled?: boolean;
}

interface PopoverState {
  isVisible: boolean;
  opacity: Animated.Value;
  scale: Animated.Value;
  translateY: Animated.Value;
  translateX: Animated.Value;
  position: 'top' | 'bottom' | 'left' | 'right';
  popoverLayout: { width: number; height: number };
  targetLayout: { x: number; y: number; width: number; height: number };
}

interface PopoverPosition {
  top: number;
  left: number;
  arrowStyle: ViewStyle;
  transformOrigin: string;
}

// Constants
const SCREEN_DIMENSIONS = Dimensions.get('window');
const DEFAULT_ANIMATION_DURATION = 250;
const DEFAULT_DELAY = 0;
const DEFAULT_ARROW_SIZE = 8;
const DEFAULT_BORDER_RADIUS = 16;
const DEFAULT_MAX_WIDTH = 300;
const DEFAULT_MAX_HEIGHT = 400;
const DEFAULT_OFFSET = 8;

// Default colors and styling
const DEFAULT_BACKGROUND_COLOR = 'rgba(26,26,46,0.95)';
const BACKDROP_COLOR = 'rgba(8,8,15,0.4)';

/**
 * Popover Component
 * 
 * A sophisticated popover component with cosmic design aesthetics,
 * positioning logic, and interactive content.
 */
export const Popover: React.FC<PopoverProps> = ({
  content,
  children,
  visible: controlledVisible,
  onVisibilityChange,
  position = 'auto',
  trigger = 'click',
  animationType = 'scale',
  animationDuration = DEFAULT_ANIMATION_DURATION,
  delay = DEFAULT_DELAY,
  backgroundColor = DEFAULT_BACKGROUND_COLOR,
  borderRadius = DEFAULT_BORDER_RADIUS,
  maxWidth = DEFAULT_MAX_WIDTH,
  maxHeight = DEFAULT_MAX_HEIGHT,
  showArrow = true,
  arrowSize = DEFAULT_ARROW_SIZE,
  offset = DEFAULT_OFFSET,
  dismissOnOutsidePress = true,
  dismissOnBackdropPress = true,
  style,
  contentStyle,
  testID = 'popover',
  accessibilityLabel = 'Popover content',
  disabled = false,
}) => {
  const { theme } = useTheme();
  const [popoverState, setPopoverState] = useState<PopoverState>({
    isVisible: controlledVisible || false,
    opacity: new Animated.Value(0),
    scale: new Animated.Value(0.8),
    translateY: new Animated.Value(0),
    translateX: new Animated.Value(0),
    position: position === 'auto' ? 'bottom' : position,
    popoverLayout: { width: 0, height: 0 },
    targetLayout: { x: 0, y: 0, width: 0, height: 0 },
  });

  const targetRef = useRef<View>(null);
  const popoverRef = useRef<View>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);

  // Handle controlled visibility
  useEffect(() => {
    if (controlledVisible !== undefined) {
      setPopoverState(prev => ({ ...prev, isVisible: controlledVisible }));
    }
  }, [controlledVisible]);

  // Handle back button on Android
  useEffect(() => {
    if (Platform.OS === 'android' && popoverState.isVisible) {
      const backAction = () => {
        if (dismissOnBackdropPress) {
          hidePopover();
        }
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction
      );

      return () => backHandler.remove();
    }
  }, [popoverState.isVisible, dismissOnBackdropPress]);

  // Calculate optimal position
  const calculatePosition = (): PopoverPosition => {
    const { targetLayout, popoverLayout } = popoverState;
    let finalPosition = popoverState.position;

    // Auto-position logic
    if (position === 'auto') {
      const spaceAbove = targetLayout.y;
      const spaceBelow = SCREEN_DIMENSIONS.height - (targetLayout.y + targetLayout.height);
      const spaceLeft = targetLayout.x;
      const spaceRight = SCREEN_DIMENSIONS.width - (targetLayout.x + targetLayout.width);

      if (spaceBelow >= popoverLayout.height + offset) {
        finalPosition = 'bottom';
      } else if (spaceAbove >= popoverLayout.height + offset) {
        finalPosition = 'top';
      } else if (spaceRight >= popoverLayout.width + offset) {
        finalPosition = 'right';
      } else if (spaceLeft >= popoverLayout.width + offset) {
        finalPosition = 'left';
      } else {
        finalPosition = 'bottom'; // Default fallback
      }
    }

    // Calculate popover position
    let top = 0;
    let left = 0;
    let arrowStyle: ViewStyle = {};
    let transformOrigin = 'center';

    switch (finalPosition) {
      case 'top':
        top = targetLayout.y - popoverLayout.height - offset;
        left = targetLayout.x + (targetLayout.width - popoverLayout.width) / 2;
        transformOrigin = 'bottom';
        arrowStyle = {
          position: 'absolute',
          bottom: -arrowSize,
          left: popoverLayout.width / 2 - arrowSize,
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
        top = targetLayout.y + targetLayout.height + offset;
        left = targetLayout.x + (targetLayout.width - popoverLayout.width) / 2;
        transformOrigin = 'top';
        arrowStyle = {
          position: 'absolute',
          top: -arrowSize,
          left: popoverLayout.width / 2 - arrowSize,
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
        top = targetLayout.y + (targetLayout.height - popoverLayout.height) / 2;
        left = targetLayout.x - popoverLayout.width - offset;
        transformOrigin = 'right';
        arrowStyle = {
          position: 'absolute',
          right: -arrowSize,
          top: popoverLayout.height / 2 - arrowSize,
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
        top = targetLayout.y + (targetLayout.height - popoverLayout.height) / 2;
        left = targetLayout.x + targetLayout.width + offset;
        transformOrigin = 'left';
        arrowStyle = {
          position: 'absolute',
          left: -arrowSize,
          top: popoverLayout.height / 2 - arrowSize,
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

    // Ensure popover stays within screen bounds
    left = Math.max(16, Math.min(left, SCREEN_DIMENSIONS.width - popoverLayout.width - 16));
    top = Math.max(16, Math.min(top, SCREEN_DIMENSIONS.height - popoverLayout.height - 16));

    return { top, left, arrowStyle, transformOrigin };
  };

  // Show popover
  const showPopover = () => {
    if (animationRef.current) {
      animationRef.current.stop();
    }

    const animations: Animated.CompositeAnimation[] = [];

    // Configure animations based on type
    switch (animationType) {
      case 'fade':
        animations.push(
          Animated.timing(popoverState.opacity, {
            toValue: 1,
            duration: animationDuration,
            useNativeDriver: true,
          })
        );
        break;

      case 'scale':
        animations.push(
          Animated.parallel([
            Animated.timing(popoverState.opacity, {
              toValue: 1,
              duration: animationDuration,
              useNativeDriver: true,
            }),
            Animated.spring(popoverState.scale, {
              toValue: 1,
              tension: 100,
              friction: 8,
              useNativeDriver: true,
            }),
          ])
        );
        break;

      case 'slide':
        const slideDistance = 20;
        animations.push(
          Animated.parallel([
            Animated.timing(popoverState.opacity, {
              toValue: 1,
              duration: animationDuration,
              useNativeDriver: true,
            }),
            Animated.spring(popoverState.translateY, {
              toValue: 0,
              tension: 100,
              friction: 8,
              useNativeDriver: true,
            }),
          ])
        );
        // Set initial slide position
        popoverState.translateY.setValue(slideDistance);
        break;
    }

    if (animations.length > 0) {
      animationRef.current = animations[0];
      animationRef.current.start();
    }
  };

  // Hide popover
  const hidePopover = () => {
    if (animationRef.current) {
      animationRef.current.stop();
    }

    const animations: Animated.CompositeAnimation[] = [];

    // Configure animations based on type
    switch (animationType) {
      case 'fade':
        animations.push(
          Animated.timing(popoverState.opacity, {
            toValue: 0,
            duration: animationDuration,
            useNativeDriver: true,
          })
        );
        break;

      case 'scale':
        animations.push(
          Animated.parallel([
            Animated.timing(popoverState.opacity, {
              toValue: 0,
              duration: animationDuration,
              useNativeDriver: true,
            }),
            Animated.timing(popoverState.scale, {
              toValue: 0.8,
              duration: animationDuration,
              useNativeDriver: true,
            }),
          ])
        );
        break;

      case 'slide':
        const slideDistance = 20;
        animations.push(
          Animated.parallel([
            Animated.timing(popoverState.opacity, {
              toValue: 0,
              duration: animationDuration,
              useNativeDriver: true,
            }),
            Animated.timing(popoverState.translateY, {
              toValue: slideDistance,
              duration: animationDuration,
              useNativeDriver: true,
            }),
          ])
        );
        break;
    }

    if (animations.length > 0) {
      animationRef.current = animations[0];
      animationRef.current.start(({ finished }) => {
        if (finished) {
          setPopoverState(prev => ({ ...prev, isVisible: false }));
        }
      });
    }
  };

  // Handle visibility changes
  useEffect(() => {
    if (popoverState.isVisible) {
      showPopover();
    } else {
      hidePopover();
    }
  }, [popoverState.isVisible]);

  // Handle target layout
  const handleTargetLayout = (event: LayoutChangeEvent) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    setPopoverState(prev => ({
      ...prev,
      targetLayout: { x, y, width, height },
    }));
  };

  // Handle popover layout
  const handlePopoverLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setPopoverState(prev => ({
      ...prev,
      popoverLayout: { width, height },
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
        setPopoverState(prev => ({ ...prev, isVisible: true }));
        if (onVisibilityChange) {
          onVisibilityChange(true);
        }
      }, delay);
    } else {
      setPopoverState(prev => ({ ...prev, isVisible: false }));
      if (onVisibilityChange) {
        onVisibilityChange(false);
      }
    }
  };

  // Handle backdrop press
  const handleBackdropPress = () => {
    if (dismissOnBackdropPress) {
      handleTrigger(false);
    }
  };

  // Create trigger props
  const getTriggerProps = () => {
    const props: any = {};

    if (trigger === 'click') {
      props.onPress = () => handleTrigger(!popoverState.isVisible);
    } else if (trigger === 'hover') {
      props.onMouseEnter = () => handleTrigger(true);
      props.onMouseLeave = () => handleTrigger(false);
    } else if (trigger === 'longPress') {
      props.onLongPress = () => handleTrigger(true);
    }

    return props;
  };

  // Calculate final position
  const popoverPosition = calculatePosition();

  // Get transform array
  const getTransform = () => {
    const transform: any[] = [];

    if (animationType === 'scale') {
      transform.push({ scale: popoverState.scale });
    }

    if (animationType === 'slide') {
      transform.push({ translateY: popoverState.translateY });
    }

    return transform;
  };

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
          accessibilityHint="Shows popover with additional content"
        >
          {children}
        </TouchableOpacity>
      </View>

      {/* Popover Modal */}
      {popoverState.isVisible && (
        <Modal
          visible={popoverState.isVisible}
          transparent
          animationType="none"
          testID={`${testID}-modal`}
        >
          {/* Backdrop */}
          <TouchableWithoutFeedback onPress={handleBackdropPress}>
            <View style={styles.backdrop} />
          </TouchableWithoutFeedback>

          {/* Popover */}
          <Animated.View
            ref={popoverRef}
            style={[
              styles.popover,
              {
                position: 'absolute',
                top: popoverPosition.top,
                left: popoverPosition.left,
                borderRadius,
                maxWidth,
                maxHeight,
                opacity: popoverState.opacity,
                transform: getTransform(),
              },
              style,
            ]}
            onLayout={handlePopoverLayout}
            testID={`${testID}-content`}
          >
            <LinearGradient
              colors={['#1A1A2E', '#08080F']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={[styles.gradientContainer, { borderRadius }]}
            >
              <View style={[styles.content, contentStyle]}>
                {content}
              </View>
            </LinearGradient>
            {showArrow && <View style={popoverPosition.arrowStyle} />}
          </Animated.View>
        </Modal>
      )}
    </>
  );
};

// Styles
const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: BACKDROP_COLOR,
  },
  popover: {
    zIndex: 1000,
    shadowColor: deepSpaceColors.void,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 12,
  },
  gradientContainer: {
    flex: 1,
    minHeight: 40,
  },
  content: {
    padding: 16,
  },
});

// Default export
export default Popover;

// Named exports for specific use cases
export const PopoverTop: React.FC<Omit<PopoverProps, 'position'>> = (props) => (
  <Popover {...props} position="top" />
);

export const PopoverBottom: React.FC<Omit<PopoverProps, 'position'>> = (props) => (
  <Popover {...props} position="bottom" />
);

export const PopoverLeft: React.FC<Omit<PopoverProps, 'position'>> = (props) => (
  <Popover {...props} position="left" />
);

export const PopoverRight: React.FC<Omit<PopoverProps, 'position'>> = (props) => (
  <Popover {...props} position="right" />
);

export const PopoverClick: React.FC<Omit<PopoverProps, 'trigger'>> = (props) => (
  <Popover {...props} trigger="click" />
);

export const PopoverHover: React.FC<Omit<PopoverProps, 'trigger'>> = (props) => (
  <Popover {...props} trigger="hover" />
);

export const PopoverLongPress: React.FC<Omit<PopoverProps, 'trigger'>> = (props) => (
  <Popover {...props} trigger="longPress" />
);

export const PopoverFade: React.FC<Omit<PopoverProps, 'animationType'>> = (props) => (
  <Popover {...props} animationType="fade" />
);

export const PopoverScale: React.FC<Omit<PopoverProps, 'animationType'>> = (props) => (
  <Popover {...props} animationType="scale" />
);

export const PopoverSlide: React.FC<Omit<PopoverProps, 'animationType'>> = (props) => (
  <Popover {...props} animationType="slide" />
);

// Type exports
export type { PopoverProps, PopoverState, PopoverPosition };
export { 
  DEFAULT_ANIMATION_DURATION, 
  DEFAULT_DELAY, 
  DEFAULT_ARROW_SIZE, 
  DEFAULT_BORDER_RADIUS,
  DEFAULT_MAX_WIDTH,
  DEFAULT_MAX_HEIGHT,
  DEFAULT_OFFSET,
  BACKDROP_COLOR 
};
