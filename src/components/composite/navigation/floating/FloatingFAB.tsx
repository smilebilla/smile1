/**
 * Corp Astro UI Library - Floating FAB Component
 * 
 * A sophisticated floating action button with advanced animation features,
 * cosmic design aesthetics, and gesture-based interactions.
 * 
 * Features:
 * - Floating action button with expandable menu
 * - Morphing animation between states (FAB to cross)
 * - Radial expanding sub-actions menu
 * - Magnetic positioning with viewport constraints
 * - Cosmic glow and shimmer effects
 * - Pulse animation with configurable intensity
 * - Trail effects for enhanced v      // Constrain to screen bounds
      finalX = Math.max(SAFE_MARGIN, Math.min(SCREEN_WIDTH - finalSize - SAFE_MARGIN, finalX));
      finalY = Math.max(SAFE_MARGIN, Math.min(SCREEN_HEIGHT - finalSize - SAFE_MARGIN, finalY));
      
      // Magnetic snap to edges
      if (magneticSnap) {
        if (finalX < SCREEN_WIDTH / 2) {
          finalX = SAFE_MARGIN;
        } else {
          finalX = SCREEN_WIDTH - finalSize - SAFE_MARGIN;
        }
      }ck
 * - Accessibility compliant with proper ARIA attributes
 * - Theme-aware styling with Corp Astro design system
 * - Gesture-based interactions (drag, hover, long press)
 * - Auto-collapse functionality with customizable timeout
 * 
 * @module FloatingFAB
 * @version 1.0.0
 * @since 2024
 * 
 * UI Documentation Reference:
 * - Design System: FloatingFAB specifications (size: 56px, expandable to 240px radius)
 * - Animation: morph (300ms cubic-bezier), expand (500ms spring), pulse (2s ease-in-out)
 * - Position: Bottom-right default with magnetic constraints
 * - Sub-actions: Radial arrangement with staggered animation
 * - Interactions: Tap expand, drag reposition, long press context menu
 */

import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  ViewStyle,
  GestureResponderEvent,
  Platform,
  AccessibilityInfo,
  PanResponder,
  Dimensions,
  Text,
} from 'react-native';

// Internal imports
import { useTheme } from '../../../foundations/themes';
import { useOrbitalRotation } from '../../../foundations/animations/orbital/OrbitalRotation';
import { createPulseAnimation } from '../../../foundations/effects/PulseAnimation';
import { createTrailEffect } from '../../../foundations/effects/TrailEffects';
import { useMagneticHover } from '../../../foundations/effects/MagneticHover';
import { createGlowEffect } from '../../../foundations/effects/GlowEffects';
import { createShimmerEffect } from '../../../foundations/effects/ShimmerEffect';

// Constants
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const FAB_SIZE = 64; // UI Docs specification
const EXPANDED_RADIUS = 120;
const SAFE_MARGIN = 20;
const ANIMATION_DURATION = 300;
const EXPAND_DURATION = 500;
const PULSE_DURATION = 2000; // UI Docs: 2s ease-in-out infinite
const TRAIL_POINTS = 4;
const AUTO_COLLAPSE_TIMEOUT = 3000;

// Color constants for reliability with UI Docs compliance
const COLORS = {
  primary: '#2E86DE', // UI Docs: Corp Blue primary
  secondary: '#533483', // UI Docs: Royal Purple deep
  accent: '#54A0FF', // UI Docs: Corp Blue light
  background: '#1F2937',
  surface: '#374151',
  text: '#FFFFFF',
  textSecondary: '#B8B8C0', // UI Docs: Professional Gray text
  border: '#4B5563',
  error: '#EF4444',
  warning: '#F59E0B',
  success: '#10B981',
};

// UI Docs FAB gradient specification
const FAB_GRADIENT = {
  colors: ['#2E86DE', '#533483'], // radial-gradient(circle, #2E86DE 0%, #533483 100%)
  type: 'radial',
};

// UI Docs FAB shadow specification
const FAB_SHADOW = {
  shadowColor: '#2E86DE',
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.5,
  shadowRadius: 40,
  elevation: 16,
};

// Sub-action interface
export interface FloatingFABAction {
  id: string;
  icon: string;
  label: string;
  color?: string;
  onPress: () => void;
  disabled?: boolean;
  badge?: string | number;
}

// Position interface
export interface FloatingFABPosition {
  x: number;
  y: number;
}

// Animation state interface
export interface FloatingFABAnimationState {
  isExpanded: boolean;
  isPulsing: boolean;
  isAnimating: boolean;
  isDragging: boolean;
  isHovered: boolean;
}

// Props interface
export interface FloatingFABProps {
  // Core props
  actions?: FloatingFABAction[];
  position?: FloatingFABPosition;
  size?: number;
  variant?: 'normal' | 'mini'; // UI Docs: normal (64px) or mini (48px)
  
  // Behavior props
  autoCollapse?: boolean;
  autoCollapseTimeout?: number;
  magneticSnap?: boolean;
  dragEnabled?: boolean;
  pulseEnabled?: boolean;
  trailEnabled?: boolean;
  glowEnabled?: boolean;
  
  // Style props
  backgroundColor?: string;
  iconColor?: string;
  expandedBackgroundColor?: string;
  glowColor?: string;
  trailColor?: string;
  
  // Animation props
  animationDuration?: number;
  expandDuration?: number;
  pulseIntensity?: number;
  
  // Content props
  icon?: string;
  expandedIcon?: string;
  
  // Event handlers
  onPress?: () => void;
  onExpand?: () => void;
  onCollapse?: () => void;
  onPositionChange?: (position: FloatingFABPosition) => void;
  onActionPress?: (action: FloatingFABAction) => void;
  
  // Accessibility props
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: 'button' | 'imagebutton' | 'link' | 'text';
  
  // Advanced props
  hapticFeedback?: boolean;
  premium?: boolean;
  disabled?: boolean;
  
  // Style overrides
  style?: ViewStyle;
  containerStyle?: ViewStyle;
  actionStyle?: ViewStyle;
  testID?: string;
}

// Component state interface
interface FloatingFABState {
  isExpanded: boolean;
  isPulsing: boolean;
  isAnimating: boolean;
  isDragging: boolean;
  isHovered: boolean;
  currentPosition: FloatingFABPosition;
  autoCollapseTimer: NodeJS.Timeout | null;
}

/**
 * FloatingFAB Component
 * 
 * A sophisticated floating action button with expandable menu functionality.
 */
export const FloatingFAB: React.FC<FloatingFABProps> = ({
  actions = [],
  position = { x: SCREEN_WIDTH - FAB_SIZE - SAFE_MARGIN, y: SCREEN_HEIGHT - FAB_SIZE - SAFE_MARGIN - 100 },
  size = FAB_SIZE,
  variant = 'normal', // UI Docs: normal (64px) or mini (48px)
  autoCollapse = true,
  autoCollapseTimeout = AUTO_COLLAPSE_TIMEOUT,
  magneticSnap = true,
  dragEnabled = true,
  pulseEnabled = true,
  trailEnabled = true,
  glowEnabled = true,
  backgroundColor = FAB_GRADIENT.colors[0], // UI Docs: #2E86DE
  iconColor = COLORS.text,
  expandedBackgroundColor = COLORS.surface,
  glowColor = FAB_GRADIENT.colors[0], // UI Docs: #2E86DE
  trailColor = FAB_GRADIENT.colors[0], // UI Docs: #2E86DE
  animationDuration = ANIMATION_DURATION,
  expandDuration = EXPAND_DURATION,
  pulseIntensity = 0.3,
  icon = '+',
  expandedIcon = '✕',
  onPress,
  onExpand,
  onCollapse,
  onPositionChange,
  onActionPress,
  accessibilityLabel = 'Floating Action Button',
  accessibilityHint = 'Tap to expand menu or drag to reposition',
  accessibilityRole = 'button',
  hapticFeedback = true,
  premium = false,
  disabled = false,
  style,
  containerStyle,
  actionStyle,
  testID = 'floating-fab',
}) => {
  // Theme
  const { theme } = useTheme();
  
  // State
  const [state, setState] = useState<FloatingFABState>({
    isExpanded: false,
    isPulsing: false,
    isAnimating: false,
    isDragging: false,
    isHovered: false,
    currentPosition: position,
    autoCollapseTimer: null,
  });
  
  // Animation values
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const rotationAnim = useRef(new Animated.Value(0)).current;
  const expandAnim = useRef(new Animated.Value(0)).current;
  const positionAnim = useRef(new Animated.ValueXY(position)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const trailAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  
  // Refs
  const containerRef = useRef<View>(null);
  const autoCollapseRef = useRef<NodeJS.Timeout | null>(null);
  const trailPoints = useRef<Array<{ x: number; y: number; opacity: number }>>([]);
  
  // Hooks
  const orbitalRotation = useOrbitalRotation({});
  
  const magneticHover = useMagneticHover({
    enabled: magneticSnap && !state.isDragging,
    strength: 0.3,
  });
  
  // Computed values
  const finalBackgroundColor = useMemo(() => {
    if (disabled) return theme?.colors?.neutral?.medium || COLORS.surface;
    if (state.isExpanded) return expandedBackgroundColor;
    // UI Docs: radial-gradient(circle, #2E86DE 0%, #533483 100%)
    return FAB_GRADIENT.colors[0]; // Primary color for fallback
  }, [disabled, state.isExpanded, expandedBackgroundColor, theme]);
  
  const finalIconColor = useMemo(() => {
    if (disabled) return theme?.colors?.neutral?.text || COLORS.text;
    return iconColor;
  }, [disabled, iconColor, theme]);
  
  const currentIcon = useMemo(() => {
    return state.isExpanded ? expandedIcon : icon;
  }, [state.isExpanded, expandedIcon, icon]);
  
  // UI Docs variant calculations
  const finalSize = useMemo(() => {
    if (variant === 'mini') return 48; // UI Docs: mini size
    return size;
  }, [variant, size]);
  
  const finalIconSize = useMemo(() => {
    if (variant === 'mini') return 20; // UI Docs: mini iconSize
    return 28; // UI Docs: normal iconSize
  }, [variant]);
  
  // Animation functions
  const startPulseAnimation = useCallback(() => {
    if (!pulseEnabled || state.isPulsing) return;
    
    setState(prev => ({ ...prev, isPulsing: true }));
    
    const pulseSequence = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1 + pulseIntensity,
          duration: PULSE_DURATION / 2,
          easing: Easing.out(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: PULSE_DURATION / 2,
          easing: Easing.in(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );
    
    pulseSequence.start();
  }, [pulseEnabled, state.isPulsing, pulseIntensity]);
  
  const stopPulseAnimation = useCallback(() => {
    setState(prev => ({ ...prev, isPulsing: false }));
    pulseAnim.stopAnimation();
    
    Animated.timing(pulseAnim, {
      toValue: 1,
      duration: 200,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  }, []);
  
  const startTrailEffect = useCallback(() => {
    if (!trailEnabled) return;
    
    Animated.timing(trailAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  }, [trailEnabled]);
  
  const startGlowEffect = useCallback(() => {
    if (!glowEnabled) return;
    
    Animated.timing(glowAnim, {
      toValue: 1,
      duration: 300,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  }, [glowEnabled]);
  
  const stopGlowEffect = useCallback(() => {
    Animated.timing(glowAnim, {
      toValue: 0,
      duration: 300,
      easing: Easing.in(Easing.quad),
      useNativeDriver: true,
    }).start();
  }, []);
  
  // Expansion functions
  const expandFAB = useCallback(() => {
    if (state.isExpanded || state.isAnimating || disabled) return;
    
    setState(prev => ({ ...prev, isExpanded: true, isAnimating: true }));
    
    // Clear auto-collapse timer if exists
    if (autoCollapseRef.current) {
      clearTimeout(autoCollapseRef.current);
      autoCollapseRef.current = null;
    }
    
    // Start animations
    const expandAnimations = [
      Animated.timing(expandAnim, {
        toValue: 1,
        duration: expandDuration,
        easing: Easing.out(Easing.back(1.1)),
        useNativeDriver: true,
      }),
      Animated.timing(rotationAnim, {
        toValue: 1,
        duration: animationDuration,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ];
    
    if (glowEnabled) {
      startGlowEffect();
    }
    
    if (trailEnabled) {
      startTrailEffect();
    }
    
    Animated.parallel(expandAnimations).start(() => {
      setState(prev => ({ ...prev, isAnimating: false }));
      
      // Set auto-collapse timer
      if (autoCollapse) {
        autoCollapseRef.current = setTimeout(() => {
          collapseFAB();
        }, autoCollapseTimeout);
      }
      
      onExpand?.();
    });
  }, [
    state.isExpanded,
    state.isAnimating,
    disabled,
    expandDuration,
    animationDuration,
    glowEnabled,
    trailEnabled,
    autoCollapse,
    autoCollapseTimeout,
    onExpand,
    startGlowEffect,
    startTrailEffect,
  ]);
  
  const collapseFAB = useCallback(() => {
    if (!state.isExpanded || state.isAnimating) return;
    
    setState(prev => ({ ...prev, isExpanded: false, isAnimating: true }));
    
    // Clear auto-collapse timer
    if (autoCollapseRef.current) {
      clearTimeout(autoCollapseRef.current);
      autoCollapseRef.current = null;
    }
    
    // Start animations
    const collapseAnimations = [
      Animated.timing(expandAnim, {
        toValue: 0,
        duration: animationDuration,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(rotationAnim, {
        toValue: 0,
        duration: animationDuration,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ];
    
    if (glowEnabled) {
      stopGlowEffect();
    }
    
    Animated.parallel(collapseAnimations).start(() => {
      setState(prev => ({ ...prev, isAnimating: false }));
      onCollapse?.();
    });
  }, [
    state.isExpanded,
    state.isAnimating,
    animationDuration,
    glowEnabled,
    onCollapse,
    stopGlowEffect,
  ]);
  
  // Gesture handlers
  const handlePress = useCallback((event: GestureResponderEvent) => {
    if (disabled) return;
    
    if (state.isExpanded) {
      collapseFAB();
    } else {
      expandFAB();
    }
    
    onPress?.();
  }, [disabled, state.isExpanded, collapseFAB, expandFAB, onPress]);
  
  const handleActionPress = useCallback((action: FloatingFABAction) => {
    if (disabled || action.disabled) return;
    
    action.onPress();
    onActionPress?.(action);
    
    // Collapse after action
    collapseFAB();
  }, [disabled, onActionPress, collapseFAB]);
  
  // Pan responder for drag functionality
  const panResponder = useMemo(() => PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return dragEnabled && !disabled && (
        Math.abs(gestureState.dx) > 10 || Math.abs(gestureState.dy) > 10
      );
    },
    onPanResponderGrant: () => {
      setState(prev => ({ ...prev, isDragging: true }));
      positionAnim.setOffset({
        x: (positionAnim.x as any)._value,
        y: (positionAnim.y as any)._value,
      });
      positionAnim.setValue({ x: 0, y: 0 });
    },
    onPanResponderMove: Animated.event(
      [null, { dx: positionAnim.x, dy: positionAnim.y }],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: (evt, gestureState) => {
      setState(prev => ({ ...prev, isDragging: false }));
      positionAnim.flattenOffset();
      
      // Calculate final position with magnetic snap
      let finalX = state.currentPosition.x + gestureState.dx;
      let finalY = state.currentPosition.y + gestureState.dy;
      
      // Constrain to screen bounds
      finalX = Math.max(SAFE_MARGIN, Math.min(SCREEN_WIDTH - size - SAFE_MARGIN, finalX));
      finalY = Math.max(SAFE_MARGIN, Math.min(SCREEN_HEIGHT - size - SAFE_MARGIN, finalY));
      
      // Magnetic snap to edges
      if (magneticSnap) {
        if (finalX < SCREEN_WIDTH / 2) {
          finalX = SAFE_MARGIN;
        } else {
          finalX = SCREEN_WIDTH - finalSize - SAFE_MARGIN;
        }
      }
      
      const newPosition = { x: finalX, y: finalY };
      setState(prev => ({ ...prev, currentPosition: newPosition }));
      
      // Animate to final position
      Animated.spring(positionAnim, {
        toValue: newPosition,
        useNativeDriver: false,
        tension: 100,
        friction: 8,
      }).start();
      
      onPositionChange?.(newPosition);
    },
  }), [
    dragEnabled,
    disabled,
    state.currentPosition,
    finalSize,
    magneticSnap,
    onPositionChange,
  ]);
  
  // Effects
  useEffect(() => {
    if (pulseEnabled && !state.isExpanded) {
      startPulseAnimation();
    } else {
      stopPulseAnimation();
    }
  }, [pulseEnabled, state.isExpanded, startPulseAnimation, stopPulseAnimation]);
  
  useEffect(() => {
    return () => {
      if (autoCollapseRef.current) {
        clearTimeout(autoCollapseRef.current);
      }
    };
  }, []);
  
  // Render sub-actions
  const renderActions = () => {
    if (!state.isExpanded || actions.length === 0) return null;
    
    return actions.map((action, index) => {
      const angle = (index * (2 * Math.PI)) / actions.length - Math.PI / 2;
      const radius = EXPANDED_RADIUS;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      
      const actionOpacity = expandAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      });
      
      const actionScale = expandAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.5, 1],
      });
      
      return (
        <Animated.View
          key={action.id}
          style={[
            styles.actionContainer,
            {
              transform: [
                { translateX: x },
                { translateY: y },
                { scale: actionScale },
              ],
              opacity: actionOpacity,
            },
          ]}
        >
          <TouchableOpacity
            style={[
              styles.actionButton,
              {
                backgroundColor: action.color || COLORS.secondary,
                opacity: action.disabled ? 0.5 : 1,
              },
              actionStyle,
            ]}
            onPress={() => handleActionPress(action)}
            disabled={action.disabled}
            accessibilityLabel={action.label}
            accessibilityRole="button"
            testID={`${testID}-action-${action.id}`}
          >
            <Text style={styles.actionIcon}>{action.icon}</Text>
            {action.badge && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{action.badge}</Text>
              </View>
            )}
          </TouchableOpacity>
          <Text style={styles.actionLabel}>{action.label}</Text>
        </Animated.View>
      );
    });
  };
  
  // Render trail effect
  const renderTrail = () => {
    if (!trailEnabled || trailPoints.current.length === 0) return null;
    
    return trailPoints.current.map((point, index) => (
      <Animated.View
        key={index}
        style={[
          styles.trailPoint,
          {
            left: point.x,
            top: point.y,
            opacity: point.opacity,
            backgroundColor: trailColor,
          },
        ]}
      />
    ));
  };
  
  // Render glow effect
  const renderGlow = () => {
    if (!glowEnabled) return null;
    
    const glowOpacity = glowAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0.6],
    });
    
    const glowScale = glowAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.8, 1.2],
    });
    
    return (
      <Animated.View
        style={[
          styles.glow,
          {
            width: finalSize * 1.5,
            height: finalSize * 1.5,
            borderRadius: (finalSize * 1.5) / 2,
            backgroundColor: glowColor,
            opacity: glowOpacity,
            transform: [{ scale: glowScale }],
          },
        ]}
      />
    );
  };
  
  // Main render
  return (
    <View style={[styles.container, containerStyle]} testID={testID}>
      {renderTrail()}
      
      <Animated.View
        ref={containerRef}
        style={[
          styles.fabContainer,
          {
            transform: [
              { translateX: positionAnim.x },
              { translateY: positionAnim.y },
            ],
          },
        ]}
        {...panResponder.panHandlers}
      >
        {renderGlow()}
        {renderActions()}
        
        <Animated.View
          style={[
            styles.fab,
            {
              width: finalSize,
              height: finalSize,
              borderRadius: finalSize / 2,
              backgroundColor: finalBackgroundColor,
              transform: [
                { scale: pulseAnim },
                { scale: scaleAnim },
                {
                  rotate: rotationAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '45deg'],
                  }),
                },
              ],
            },
            style,
          ]}
        >
          <TouchableOpacity
            style={styles.fabButton}
            onPress={handlePress}
            disabled={disabled}
            accessibilityLabel={accessibilityLabel}
            accessibilityHint={accessibilityHint}
            accessibilityRole={accessibilityRole as any}
            testID={`${testID}-button`}
          >
            <Text style={[styles.fabIcon, { color: finalIconColor, fontSize: finalIconSize }]}>
              {currentIcon}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'box-none',
  },
  fabContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    alignItems: 'center',
    justifyContent: 'center',
    // UI Docs shadow specification: '0 8px 40px rgba(46,134,222,0.5)'
    ...FAB_SHADOW,
    zIndex: 1000,
  },
  fabButton: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 1000,
  },
  fabIcon: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  actionContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  actionIcon: {
    fontSize: 18,
    color: COLORS.text,
    fontWeight: 'bold',
  },
  actionLabel: {
    marginTop: 4,
    fontSize: 12,
    color: COLORS.text,
    textAlign: 'center',
    fontWeight: '500',
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: COLORS.error,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    fontSize: 10,
    color: COLORS.text,
    fontWeight: 'bold',
  },
  glow: {
    position: 'absolute',
    borderRadius: 1000,
    zIndex: -1,
  },
  trailPoint: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    zIndex: 999,
  },
});

// Export default
export default FloatingFAB;
