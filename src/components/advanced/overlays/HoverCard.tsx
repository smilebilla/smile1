/**
 * Corp Astro UI Library - Hover Card Component
 * Module 118: HoverCard.tsx
 * 
 * An advanced hover card component with cosmic design aesthetics,
 * hover interactions, and rich content display following Corp Astro design system.
 * 
 * Features:
 * - Cosmic hover card styling with gradient backgrounds
 * - Hover-based interactions with customizable delays
 * - Rich content support with headers, body, and actions
 * - Smooth animations with fade and scale effects
 * - Smart positioning with boundary detection
 * - Accessibility features with proper ARIA attributes
 * - Portal rendering for proper z-index management
 * - Touch-friendly interactions for mobile devices
 * - TypeScript support with comprehensive interfaces
 * 
 * Design System Compliance:
 * - Background: linear-gradient with Corp Astro colors
 * - Border radius: 20px with cosmic styling
 * - Typography: Corp Astro text styles with hierarchy
 * - Spacing: 20px padding with proper content layout
 * - Animations: smooth fade and scale transitions
 * - Colors: Corp Astro palette with semantic usage
 * - Shadows: cosmic depth with proper elevation
 * - Interactive states: hover, focus, active
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ViewStyle,
  TextStyle,
  LayoutChangeEvent,
  Modal,
  Platform,
  AccessibilityInfo,
  BackHandler,
} from 'react-native';
import { useTheme } from '../../foundations/themes/useTheme';
import { deepSpaceColors } from '../../foundations/tokens/colors/DeepSpaceColors';
import { SignatureBlues } from '../../foundations/tokens/colors/SignatureBlues';

// Type definitions
interface HoverCardProps {
  trigger: React.ReactNode;
  title?: string;
  subtitle?: string;
  content: React.ReactNode;
  actions?: React.ReactNode;
  visible?: boolean;
  onVisibilityChange?: (visible: boolean) => void;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'auto';
  hoverDelay?: number;
  hideDelay?: number;
  animationDuration?: number;
  backgroundColor?: string;
  borderRadius?: number;
  maxWidth?: number;
  maxHeight?: number;
  showArrow?: boolean;
  arrowSize?: number;
  offset?: number;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  headerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
  actionsStyle?: ViewStyle;
  testID?: string;
  accessibilityLabel?: string;
  disabled?: boolean;
}

interface HoverCardState {
  isVisible: boolean;
  isHovered: boolean;
  opacity: Animated.Value;
  scale: Animated.Value;
  position: 'top' | 'bottom' | 'left' | 'right';
  cardLayout: { width: number; height: number };
  targetLayout: { x: number; y: number; width: number; height: number };
}

interface HoverCardPosition {
  top: number;
  left: number;
  arrowStyle: ViewStyle;
  transformOrigin: string;
}

// Constants
const SCREEN_DIMENSIONS = Dimensions.get('window');
const DEFAULT_HOVER_DELAY = 500;
const DEFAULT_HIDE_DELAY = 100;
const DEFAULT_ANIMATION_DURATION = 250;
const DEFAULT_ARROW_SIZE = 8;
const DEFAULT_BORDER_RADIUS = 20;
const DEFAULT_MAX_WIDTH = 320;
const DEFAULT_MAX_HEIGHT = 400;
const DEFAULT_OFFSET = 12;

// Default colors and styling
const DEFAULT_BACKGROUND_COLOR = 'rgba(26,26,46,0.98)';
const BACKDROP_COLOR = 'rgba(8,8,15,0.2)';
const TITLE_COLOR = '#FFFFFF';
const SUBTITLE_COLOR = 'rgba(255,255,255,0.7)';

/**
 * HoverCard Component
 * 
 * A sophisticated hover card component with cosmic design aesthetics,
 * hover interactions, and rich content display.
 */
export const HoverCard: React.FC<HoverCardProps> = ({
  trigger,
  title,
  subtitle,
  content,
  actions,
  visible: controlledVisible,
  onVisibilityChange,
  position = 'auto',
  hoverDelay = DEFAULT_HOVER_DELAY,
  hideDelay = DEFAULT_HIDE_DELAY,
  animationDuration = DEFAULT_ANIMATION_DURATION,
  backgroundColor = DEFAULT_BACKGROUND_COLOR,
  borderRadius = DEFAULT_BORDER_RADIUS,
  maxWidth = DEFAULT_MAX_WIDTH,
  maxHeight = DEFAULT_MAX_HEIGHT,
  showArrow = true,
  arrowSize = DEFAULT_ARROW_SIZE,
  offset = DEFAULT_OFFSET,
  style,
  contentStyle,
  headerStyle,
  titleStyle,
  subtitleStyle,
  actionsStyle,
  testID = 'hover-card',
  accessibilityLabel = 'Hover card content',
  disabled = false,
}) => {
  const { theme } = useTheme();
  const [cardState, setCardState] = useState<HoverCardState>({
    isVisible: controlledVisible || false,
    isHovered: false,
    opacity: new Animated.Value(0),
    scale: new Animated.Value(0.9),
    position: position === 'auto' ? 'bottom' : position,
    cardLayout: { width: 0, height: 0 },
    targetLayout: { x: 0, y: 0, width: 0, height: 0 },
  });

  const targetRef = useRef<View>(null);
  const cardRef = useRef<View>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);

  // Handle controlled visibility
  useEffect(() => {
    if (controlledVisible !== undefined) {
      setCardState(prev => ({ ...prev, isVisible: controlledVisible }));
    }
  }, [controlledVisible]);

  // Handle back button on Android
  useEffect(() => {
    if (Platform.OS === 'android' && cardState.isVisible) {
      const backAction = () => {
        hideCard();
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction
      );

      return () => backHandler.remove();
    }
  }, [cardState.isVisible]);

  // Calculate optimal position
  const calculatePosition = (): HoverCardPosition => {
    const { targetLayout, cardLayout } = cardState;
    let finalPosition = cardState.position;

    // Auto-position logic
    if (position === 'auto') {
      const spaceAbove = targetLayout.y;
      const spaceBelow = SCREEN_DIMENSIONS.height - (targetLayout.y + targetLayout.height);
      const spaceLeft = targetLayout.x;
      const spaceRight = SCREEN_DIMENSIONS.width - (targetLayout.x + targetLayout.width);

      if (spaceBelow >= cardLayout.height + offset) {
        finalPosition = 'bottom';
      } else if (spaceAbove >= cardLayout.height + offset) {
        finalPosition = 'top';
      } else if (spaceRight >= cardLayout.width + offset) {
        finalPosition = 'right';
      } else if (spaceLeft >= cardLayout.width + offset) {
        finalPosition = 'left';
      } else {
        finalPosition = 'bottom'; // Default fallback
      }
    }

    // Calculate card position
    let top = 0;
    let left = 0;
    let arrowStyle: ViewStyle = {};
    let transformOrigin = 'center';

    switch (finalPosition) {
      case 'top':
        top = targetLayout.y - cardLayout.height - offset;
        left = targetLayout.x + (targetLayout.width - cardLayout.width) / 2;
        transformOrigin = 'bottom';
        arrowStyle = {
          position: 'absolute',
          bottom: -arrowSize,
          left: cardLayout.width / 2 - arrowSize,
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
        left = targetLayout.x + (targetLayout.width - cardLayout.width) / 2;
        transformOrigin = 'top';
        arrowStyle = {
          position: 'absolute',
          top: -arrowSize,
          left: cardLayout.width / 2 - arrowSize,
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
        top = targetLayout.y + (targetLayout.height - cardLayout.height) / 2;
        left = targetLayout.x - cardLayout.width - offset;
        transformOrigin = 'right';
        arrowStyle = {
          position: 'absolute',
          right: -arrowSize,
          top: cardLayout.height / 2 - arrowSize,
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
        top = targetLayout.y + (targetLayout.height - cardLayout.height) / 2;
        left = targetLayout.x + targetLayout.width + offset;
        transformOrigin = 'left';
        arrowStyle = {
          position: 'absolute',
          left: -arrowSize,
          top: cardLayout.height / 2 - arrowSize,
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

    // Ensure card stays within screen bounds
    left = Math.max(16, Math.min(left, SCREEN_DIMENSIONS.width - cardLayout.width - 16));
    top = Math.max(16, Math.min(top, SCREEN_DIMENSIONS.height - cardLayout.height - 16));

    return { top, left, arrowStyle, transformOrigin };
  };

  // Show card
  const showCard = () => {
    if (animationRef.current) {
      animationRef.current.stop();
    }

    animationRef.current = Animated.parallel([
      Animated.timing(cardState.opacity, {
        toValue: 1,
        duration: animationDuration,
        useNativeDriver: true,
      }),
      Animated.spring(cardState.scale, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ]);

    animationRef.current.start();
  };

  // Hide card
  const hideCard = () => {
    if (animationRef.current) {
      animationRef.current.stop();
    }

    animationRef.current = Animated.parallel([
      Animated.timing(cardState.opacity, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: true,
      }),
      Animated.timing(cardState.scale, {
        toValue: 0.9,
        duration: animationDuration,
        useNativeDriver: true,
      }),
    ]);

    animationRef.current.start(({ finished }) => {
      if (finished) {
        setCardState(prev => ({ ...prev, isVisible: false }));
      }
    });
  };

  // Handle visibility changes
  useEffect(() => {
    if (cardState.isVisible) {
      showCard();
    } else {
      hideCard();
    }
  }, [cardState.isVisible]);

  // Handle target layout
  const handleTargetLayout = (event: LayoutChangeEvent) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    setCardState(prev => ({
      ...prev,
      targetLayout: { x, y, width, height },
    }));
  };

  // Handle card layout
  const handleCardLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setCardState(prev => ({
      ...prev,
      cardLayout: { width, height },
    }));
  };

  // Handle hover events
  const handleHover = (isHovering: boolean) => {
    if (disabled) return;

    setCardState(prev => ({ ...prev, isHovered: isHovering }));

    // Clear existing timeouts
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }

    if (isHovering) {
      hoverTimeoutRef.current = setTimeout(() => {
        setCardState(prev => ({ ...prev, isVisible: true }));
        if (onVisibilityChange) {
          onVisibilityChange(true);
        }
      }, hoverDelay);
    } else {
      hideTimeoutRef.current = setTimeout(() => {
        setCardState(prev => ({ ...prev, isVisible: false }));
        if (onVisibilityChange) {
          onVisibilityChange(false);
        }
      }, hideDelay);
    }
  };

  // Handle card hover to keep it visible
  const handleCardHover = (isHovering: boolean) => {
    if (isHovering) {
      // Clear hide timeout when hovering over card
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    } else {
      // Start hide timeout when leaving card
      hideTimeoutRef.current = setTimeout(() => {
        setCardState(prev => ({ ...prev, isVisible: false }));
        if (onVisibilityChange) {
          onVisibilityChange(false);
        }
      }, hideDelay);
    }
  };

  // Calculate final position
  const cardPosition = calculatePosition();

  // Render header
  const renderHeader = () => {
    if (!title && !subtitle) return null;

    return (
      <View style={[styles.header, headerStyle]}>
        {title && (
          <Text style={[styles.title, titleStyle]}>
            {title}
          </Text>
        )}
        {subtitle && (
          <Text style={[styles.subtitle, subtitleStyle]}>
            {subtitle}
          </Text>
        )}
      </View>
    );
  };

  // Render actions
  const renderActions = () => {
    if (!actions) return null;

    return (
      <View style={[styles.actions, actionsStyle]}>
        {actions}
      </View>
    );
  };

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
      if (animationRef.current) {
        animationRef.current.stop();
      }
    };
  }, []);

  return (
    <>
      {/* Trigger element */}
      <View
        ref={targetRef}
        onLayout={handleTargetLayout}
        testID={`${testID}-trigger`}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPressIn={() => handleHover(true)}
          onPressOut={() => handleHover(false)}
          onLongPress={() => handleHover(true)}
          accessible={true}
          accessibilityLabel={accessibilityLabel}
          accessibilityRole="button"
          accessibilityHint="Shows hover card with additional information"
        >
          {trigger}
        </TouchableOpacity>
      </View>

      {/* Hover Card Modal */}
      {cardState.isVisible && (
        <Modal
          visible={cardState.isVisible}
          transparent
          animationType="none"
          testID={`${testID}-modal`}
        >
          {/* Backdrop */}
          <TouchableWithoutFeedback onPress={() => handleHover(false)}>
            <View style={styles.backdrop} />
          </TouchableWithoutFeedback>

          {/* Hover Card */}
          <Animated.View
            ref={cardRef}
            style={[
              styles.card,
              {
                position: 'absolute',
                top: cardPosition.top,
                left: cardPosition.left,
                backgroundColor,
                borderRadius,
                maxWidth,
                maxHeight,
                opacity: cardState.opacity,
                transform: [{ scale: cardState.scale }],
              },
              style,
            ]}
            onLayout={handleCardLayout}
            testID={`${testID}-content`}
          >
            {renderHeader()}
            <View style={[styles.content, contentStyle]}>
              {content}
            </View>
            {renderActions()}
            {showArrow && <View style={cardPosition.arrowStyle} />}
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
  card: {
    zIndex: 1000,
    shadowColor: deepSpaceColors.void,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 16,
    borderWidth: 1,
    borderColor: 'rgba(46,134,222,0.2)',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: TITLE_COLOR,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: SUBTITLE_COLOR,
  },
  content: {
    padding: 20,
  },
  actions: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
});

// Default export
export default HoverCard;

// Named exports for specific use cases
export const HoverCardTop: React.FC<Omit<HoverCardProps, 'position'>> = (props) => (
  <HoverCard {...props} position="top" />
);

export const HoverCardBottom: React.FC<Omit<HoverCardProps, 'position'>> = (props) => (
  <HoverCard {...props} position="bottom" />
);

export const HoverCardLeft: React.FC<Omit<HoverCardProps, 'position'>> = (props) => (
  <HoverCard {...props} position="left" />
);

export const HoverCardRight: React.FC<Omit<HoverCardProps, 'position'>> = (props) => (
  <HoverCard {...props} position="right" />
);

export const HoverCardFast: React.FC<Omit<HoverCardProps, 'hoverDelay'>> = (props) => (
  <HoverCard {...props} hoverDelay={200} />
);

export const HoverCardSlow: React.FC<Omit<HoverCardProps, 'hoverDelay'>> = (props) => (
  <HoverCard {...props} hoverDelay={1000} />
);

// Type exports
export type { HoverCardProps, HoverCardState, HoverCardPosition };
export { 
  DEFAULT_HOVER_DELAY, 
  DEFAULT_HIDE_DELAY, 
  DEFAULT_ANIMATION_DURATION, 
  DEFAULT_ARROW_SIZE,
  DEFAULT_BORDER_RADIUS,
  DEFAULT_MAX_WIDTH,
  DEFAULT_MAX_HEIGHT,
  DEFAULT_OFFSET,
  BACKDROP_COLOR,
  TITLE_COLOR,
  SUBTITLE_COLOR 
};
