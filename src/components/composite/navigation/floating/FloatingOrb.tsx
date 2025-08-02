/**
 * Corp Astro UI Library - Floating Orb Component
 * 
 * A sophisticated floating orb element that provides ambient navigation and interactive features
 * with cosmic design aesthetics and advanced animations.
 * 
 * Features:
 * - Floating orb with radial gradient backgrounds
 * - Multi-layered orbital rotation animations
 * - Float animation with 6-second duration
 * - Pulse animation with 3-second duration
 * - Trail effects for enhanced visual feedback
 * - Magnetic hover interactions
 * - Multi-position support with smooth transitions
 * - Premium glow and shimmer effects
 * - Accessibility compliant with proper ARIA attributes
 * - Theme-aware styling with Corp Astro design system
 * 
 * @module FloatingOrb
 * @version 1.0.0
 * @since 2024
 * 
 * UI Documentation Reference:
 * - Design System: FloatingOrb specifications (size: 64px, radial gradient, 3 animations)
 * - Animation: float (6s ease-in-out), rotate (20s linear), pulse (3s ease-in-out)
 * - Position: Viewport floating with collision detection
 * - Trail: 5-point trail with opacity and blur effects
 * - Interactions: Magnetic hover, click ripple, drag support
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
} from 'react-native';

// Internal imports
import { useTheme } from '../../../foundations/themes/useTheme';
import { useOrbitalRotation } from '../../../foundations/animations/orbital/OrbitalRotation';
import { createPulseAnimation } from '../../../foundations/effects/PulseAnimation';
import { createTrailEffect } from '../../../foundations/effects/TrailEffects';
import { createGlowEffect } from '../../../foundations/effects/GlowEffects';
import { createDepthEffects } from '../../../foundations/effects/DepthEffects';
import { useMagneticHover } from '../../../foundations/effects/MagneticHover';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Floating orb size variants
 */
export type FloatingOrbSize = 'small' | 'medium' | 'large';

/**
 * Floating orb animation variants
 */
export type FloatingOrbAnimation = 'float' | 'orbital' | 'pulse' | 'trail' | 'magnetic' | 'all' | 'none';

/**
 * Floating orb variant styles
 */
export type FloatingOrbVariant = 'default' | 'premium' | 'cosmic' | 'ambient' | 'interactive';

/**
 * Floating orb position constraints
 */
export type FloatingOrbPosition = 'free' | 'bounded' | 'corner' | 'edge' | 'center';

/**
 * Icon configuration for the orb
 */
export interface FloatingOrbIcon {
  /** Icon component or string identifier */
  component?: React.ComponentType<any>;
  /** Icon name for string-based icons */
  name?: string;
  /** Icon size (default: auto-calculated) */
  size?: number;
  /** Icon color (default: theme-based) */
  color?: string;
  /** Whether to rotate with orb */
  rotateWithOrb?: boolean;
}

/**
 * Animation configuration for the orb
 */
export interface FloatingOrbAnimationConfig {
  /** Animation types to enable */
  enabled: FloatingOrbAnimation[];
  /** Float animation duration (default: 6000ms) */
  floatDuration?: number;
  /** Orbital rotation duration (default: 20000ms) */
  orbitalDuration?: number;
  /** Pulse animation duration (default: 3000ms) */
  pulseDuration?: number;
  /** Trail length (default: 5) */
  trailLength?: number;
  /** Whether to start animations automatically */
  autoStart?: boolean;
  /** Animation intensity (0-1) */
  intensity?: number;
}

/**
 * Position configuration for the orb
 */
export interface FloatingOrbPositionConfig {
  /** Position constraint type */
  type: FloatingOrbPosition;
  /** Initial position */
  initial?: { x: number; y: number };
  /** Movement boundaries */
  bounds?: {
    minX?: number;
    maxX?: number;
    minY?: number;
    maxY?: number;
  };
  /** Whether to respect safe area */
  respectSafeArea?: boolean;
  /** Edge padding */
  edgePadding?: number;
}

/**
 * Interaction configuration for the orb
 */
export interface FloatingOrbInteractionConfig {
  /** Whether to enable drag interactions */
  enableDrag?: boolean;
  /** Whether to enable magnetic hover */
  enableMagnetic?: boolean;
  /** Whether to enable haptic feedback */
  enableHaptics?: boolean;
  /** Whether to enable collision detection */
  enableCollision?: boolean;
  /** Magnetic effect strength */
  magneticStrength?: number;
  /** Collision bounds */
  collisionBounds?: 'viewport' | 'custom';
}

/**
 * Trail configuration for the orb
 */
export interface FloatingOrbTrailConfig {
  /** Whether trail is enabled */
  enabled?: boolean;
  /** Trail length (number of points) */
  length?: number;
  /** Trail opacity values */
  opacity?: number[];
  /** Trail blur values */
  blur?: number[];
  /** Trail color */
  color?: string;
}

/**
 * Glow configuration for the orb
 */
export interface FloatingOrbGlowConfig {
  /** Whether glow is enabled */
  enabled?: boolean;
  /** Glow color */
  color?: string;
  /** Glow intensity */
  intensity?: number;
  /** Glow blur radius */
  blur?: number;
  /** Glow animation duration */
  animationDuration?: number;
}

/**
 * Accessibility configuration
 */
export interface FloatingOrbAccessibilityConfig {
  /** Whether accessibility is enabled */
  enabled?: boolean;
  /** Accessibility label */
  label?: string;
  /** Accessibility hint */
  hint?: string;
  /** Accessibility role */
  role?: string;
  /** Whether to announce interactions */
  announceInteractions?: boolean;
}

/**
 * Main component props interface
 */
export interface FloatingOrbProps {
  /** Orb size variant */
  size?: FloatingOrbSize;
  /** Orb visual variant */
  variant?: FloatingOrbVariant;
  /** Orb icon configuration */
  icon?: FloatingOrbIcon;
  /** Animation configuration */
  animation?: FloatingOrbAnimationConfig;
  /** Position configuration */
  position?: FloatingOrbPositionConfig;
  /** Interaction configuration */
  interaction?: FloatingOrbInteractionConfig;
  /** Trail configuration */
  trail?: FloatingOrbTrailConfig;
  /** Glow configuration */
  glow?: FloatingOrbGlowConfig;
  /** Whether the orb is disabled */
  disabled?: boolean;
  /** Whether the orb is hidden */
  hidden?: boolean;
  /** Press handler */
  onPress?: (event: GestureResponderEvent) => void;
  /** Long press handler */
  onLongPress?: (event: GestureResponderEvent) => void;
  /** Position change handler */
  onPositionChange?: (position: { x: number; y: number }) => void;
  /** Collision handler */
  onCollision?: (boundary: 'top' | 'bottom' | 'left' | 'right') => void;
  /** Custom styling */
  style?: ViewStyle;
  /** Accessibility configuration */
  accessibility?: FloatingOrbAccessibilityConfig;
  /** Test ID for testing */
  testID?: string;
}

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Screen dimensions
 */
const SCREEN_DIMENSIONS = Dimensions.get('window');

/**
 * Default orb dimensions by size
 */
const ORB_DIMENSIONS = {
  small: { size: 48, iconSize: 20, borderRadius: 24 },
  medium: { size: 64, iconSize: 24, borderRadius: 32 },
  large: { size: 80, iconSize: 32, borderRadius: 40 },
};

/**
 * Default animation configurations
 */
const DEFAULT_ANIMATIONS = {
  float: { duration: 6000, intensity: 0.8 },
  orbital: { duration: 20000, intensity: 1.0 },
  pulse: { duration: 3000, intensity: 0.6 },
  trail: { length: 5, opacity: [0.5, 0.3, 0.2, 0.1, 0.05], blur: [0, 1, 2, 3, 4] },
  magnetic: { strength: 0.5, range: 100 },
};

/**
 * Default colors for fallback
 */
const DEFAULT_COLORS = {
  primary: '#2E86DE',
  secondary: '#54A0FF',
  accent: '#DDA0FF',
  background: '#1a1a2e',
  surface: '#16213e',
  glow: '#54A0FF',
  trail: '#54A0FF',
};

// ============================================================================
// STYLE CREATORS
// ============================================================================

/**
 * Create floating orb styles based on theme and configuration
 */
const createFloatingOrbStyles = (
  theme: any,
  config: {
    size: FloatingOrbSize;
    variant: FloatingOrbVariant;
    disabled?: boolean;
  }
) => {
  const { size, variant, disabled } = config;
  const dimensions = ORB_DIMENSIONS[size];
  
  // Get theme colors with fallbacks
  const colors = {
    primary: theme?.colors?.brand?.primary || DEFAULT_COLORS.primary,
    secondary: theme?.colors?.brand?.light || DEFAULT_COLORS.secondary,
    accent: theme?.colors?.luxury?.pure || DEFAULT_COLORS.accent,
    background: theme?.colors?.cosmos?.void || DEFAULT_COLORS.background,
    surface: theme?.colors?.cosmos?.deep || DEFAULT_COLORS.surface,
    glow: theme?.colors?.brand?.glow || DEFAULT_COLORS.glow,
    trail: theme?.colors?.brand?.light || DEFAULT_COLORS.trail,
  };
  
  // Base container styles
  const baseContainer: ViewStyle = {
    position: 'absolute',
    width: dimensions.size,
    height: dimensions.size,
    borderRadius: dimensions.borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: disabled ? 0.5 : 1,
    pointerEvents: disabled ? 'none' : 'auto',
  };
  
  // Variant-specific styles
  const variantStyles: ViewStyle = (() => {
    switch (variant) {
      case 'premium':
        return {
          backgroundColor: colors.accent,
          shadowColor: colors.accent,
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.6,
          shadowRadius: 20,
          elevation: 16,
        };
      case 'cosmic':
        return {
          backgroundColor: colors.primary,
          shadowColor: colors.glow,
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.5,
          shadowRadius: 16,
          elevation: 12,
        };
      case 'ambient':
        return {
          backgroundColor: `${String(colors.surface)}80`,
          borderWidth: 1,
          borderColor: `${String(colors.primary)}40`,
          shadowColor: colors.primary,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 12,
          elevation: 8,
        };
      case 'interactive':
        return {
          backgroundColor: colors.secondary,
          shadowColor: colors.glow,
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.4,
          shadowRadius: 14,
          elevation: 10,
        };
      default:
        return {
          backgroundColor: colors.primary,
          shadowColor: colors.glow,
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.4,
          shadowRadius: 12,
          elevation: 10,
        };
    }
  })();
  
  return StyleSheet.create({
    container: {
      ...baseContainer,
      ...variantStyles,
    },
    icon: {
      width: dimensions.iconSize,
      height: dimensions.iconSize,
      tintColor: variant === 'premium' ? colors.background : colors.background,
    },
    glow: {
      position: 'absolute',
      width: dimensions.size + 24,
      height: dimensions.size + 24,
      borderRadius: dimensions.borderRadius + 12,
      backgroundColor: colors.glow,
      opacity: 0.3,
      zIndex: -1,
    },
    trail: {
      position: 'absolute',
      borderRadius: dimensions.borderRadius,
      backgroundColor: colors.trail,
      zIndex: -2,
    },
    magneticField: {
      position: 'absolute',
      width: dimensions.size * 2,
      height: dimensions.size * 2,
      borderRadius: dimensions.size,
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: `${String(colors.glow)}20`,
      zIndex: -3,
    },
  });
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Floating Orb Component
 */
export const FloatingOrb: React.FC<FloatingOrbProps> = ({
  size = 'medium',
  variant = 'default',
  icon,
  animation = {
    enabled: ['float', 'orbital', 'pulse'],
    autoStart: true,
  },
  position = {
    type: 'free',
    respectSafeArea: true,
    edgePadding: 20,
  },
  interaction = {
    enableDrag: true,
    enableMagnetic: true,
    enableHaptics: true,
    enableCollision: true,
    magneticStrength: 0.5,
    collisionBounds: 'viewport',
  },
  trail = {
    enabled: true,
    length: 5,
    opacity: [0.5, 0.3, 0.2, 0.1, 0.05],
    blur: [0, 1, 2, 3, 4],
  },
  glow = {
    enabled: true,
    intensity: 0.8,
    blur: 20,
    animationDuration: 2000,
  },
  disabled = false,
  hidden = false,
  onPress,
  onLongPress,
  onPositionChange,
  onCollision,
  style,
  accessibility = { enabled: true, role: 'button' },
  testID = 'corp-astro-floating-orb',
}) => {
  const { theme } = useTheme();
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(
    position.initial || { x: SCREEN_DIMENSIONS.width / 2, y: SCREEN_DIMENSIONS.height / 2 }
  );
  const [trailPoints, setTrailPoints] = useState<Array<{ x: number; y: number; opacity: number }>>([]);
  
  // Animation values
  const scaleValue = useRef(new Animated.Value(1)).current;
  const opacityValue = useRef(new Animated.Value(hidden ? 0 : 1)).current;
  const glowValue = useRef(new Animated.Value(0)).current;
  const floatValue = useRef(new Animated.Value(0)).current;
  const pulseValue = useRef(new Animated.Value(1)).current;
  const magneticValue = useRef(new Animated.Value(0)).current;
  const trailOpacityValue = useRef(new Animated.Value(0)).current;
  
  // Orbital rotation hook
  const { animatedStyle: orbitalStyle, start: startOrbital, stop: stopOrbital } = useOrbitalRotation({
    speed: animation.orbitalDuration || DEFAULT_ANIMATIONS.orbital.duration,
    direction: 'normal',
    autoStart: animation.autoStart && animation.enabled.includes('orbital'),
  });
  
  // Magnetic hover hook
  const orbRef = useRef<View>(null);
  const magneticHover = useMagneticHover({
    strength: interaction.magneticStrength || DEFAULT_ANIMATIONS.magnetic.strength,
    smoothness: 0.3,
  }, orbRef);
  
  // Styles
  const styles = useMemo(() => createFloatingOrbStyles(theme, {
    size,
    variant,
    disabled,
  }), [theme, size, variant, disabled]);
  
  // ============================================================================
  // ANIMATION EFFECTS
  // ============================================================================
  
  // Float animation
  useEffect(() => {
    if (animation.enabled.includes('float') && animation.autoStart && !disabled) {
      const floatAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(floatValue, {
            toValue: 1,
            duration: (animation.floatDuration || DEFAULT_ANIMATIONS.float.duration) / 2,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(floatValue, {
            toValue: 0,
            duration: (animation.floatDuration || DEFAULT_ANIMATIONS.float.duration) / 2,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );
      
      floatAnimation.start();
      
      return () => {
        floatAnimation.stop();
      };
    }
  }, [animation, disabled, floatValue]);
  
  // Pulse animation
  useEffect(() => {
    if (animation.enabled.includes('pulse') && animation.autoStart && !disabled) {
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseValue, {
            toValue: 1.1,
            duration: (animation.pulseDuration || DEFAULT_ANIMATIONS.pulse.duration) / 2,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseValue, {
            toValue: 1,
            duration: (animation.pulseDuration || DEFAULT_ANIMATIONS.pulse.duration) / 2,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );
      
      pulseAnimation.start();
      
      return () => {
        pulseAnimation.stop();
      };
    }
  }, [animation, disabled, pulseValue]);
  
  // Glow animation
  useEffect(() => {
    if (glow.enabled && !disabled) {
      const glowAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(glowValue, {
            toValue: glow.intensity || 0.8,
            duration: glow.animationDuration || 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
          Animated.timing(glowValue, {
            toValue: 0.3,
            duration: glow.animationDuration || 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
        ])
      );
      
      glowAnimation.start();
      
      return () => {
        glowAnimation.stop();
      };
    }
  }, [glow, disabled, glowValue]);
  
  // Trail animation
  useEffect(() => {
    if (animation.enabled.includes('trail') && trail.enabled && !disabled) {
      const trailAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(trailOpacityValue, {
            toValue: 1,
            duration: 500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
          Animated.timing(trailOpacityValue, {
            toValue: 0,
            duration: 1500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
        ])
      );
      
      trailAnimation.start();
      
      return () => {
        trailAnimation.stop();
      };
    }
  }, [animation, trail, disabled, trailOpacityValue]);
  
  // Hide/show animation
  useEffect(() => {
    Animated.timing(opacityValue, {
      toValue: hidden ? 0 : 1,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [hidden, opacityValue]);
  
  // ============================================================================
  // COLLISION DETECTION
  // ============================================================================
  
  const checkCollision = useCallback((newPosition: { x: number; y: number }) => {
    if (!interaction.enableCollision) return newPosition;
    
    const orbSize = ORB_DIMENSIONS[size].size;
    const padding = position.edgePadding || 20;
    
    let adjustedPosition = { ...newPosition };
    
    // Check boundaries
    if (adjustedPosition.x < padding) {
      adjustedPosition.x = padding;
      onCollision?.('left');
    } else if (adjustedPosition.x > SCREEN_DIMENSIONS.width - orbSize - padding) {
      adjustedPosition.x = SCREEN_DIMENSIONS.width - orbSize - padding;
      onCollision?.('right');
    }
    
    if (adjustedPosition.y < padding) {
      adjustedPosition.y = padding;
      onCollision?.('top');
    } else if (adjustedPosition.y > SCREEN_DIMENSIONS.height - orbSize - padding) {
      adjustedPosition.y = SCREEN_DIMENSIONS.height - orbSize - padding;
      onCollision?.('bottom');
    }
    
    return adjustedPosition;
  }, [interaction.enableCollision, size, position.edgePadding, onCollision]);
  
  // ============================================================================
  // TRAIL MANAGEMENT
  // ============================================================================
  
  const updateTrail = useCallback((newPosition: { x: number; y: number }) => {
    if (!trail.enabled || !animation.enabled.includes('trail')) return;
    
    setTrailPoints(prev => {
      const newPoints = [
        { ...newPosition, opacity: 1 },
        ...prev.slice(0, (trail.length || 5) - 1).map((point, index) => ({
          ...point,
          opacity: (trail.opacity || DEFAULT_ANIMATIONS.trail.opacity)[index + 1] || 0,
        })),
      ];
      return newPoints;
    });
  }, [trail, animation]);
  
  // ============================================================================
  // GESTURE HANDLERS
  // ============================================================================
  
  // Pan responder for drag gestures
  const panResponder = useMemo(() => {
    if (!interaction.enableDrag) return null;
    
    return PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setIsPressed(true);
        
        // Haptic feedback
        if (interaction.enableHaptics && Platform.OS === 'ios') {
          try {
            const { HapticFeedback } = require('react-native');
            HapticFeedback?.impactAsync?.(HapticFeedback.ImpactFeedbackStyle.Light);
          } catch (error) {
            // Haptic feedback not available
          }
        }
      },
      onPanResponderMove: (event, gestureState) => {
        const { dx, dy } = gestureState;
        const newPosition = {
          x: currentPosition.x + dx,
          y: currentPosition.y + dy,
        };
        
        // Check collision and boundaries
        const adjustedPosition = checkCollision(newPosition);
        
        setCurrentPosition(adjustedPosition);
        updateTrail(adjustedPosition);
        onPositionChange?.(adjustedPosition);
      },
      onPanResponderRelease: () => {
        setIsPressed(false);
      },
    });
  }, [interaction, currentPosition, checkCollision, updateTrail, onPositionChange]);
  
  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================
  
  const handlePressIn = useCallback(() => {
    if (disabled) return;
    
    setIsPressed(true);
    
    // Haptic feedback
    if (interaction.enableHaptics && Platform.OS === 'ios') {
      try {
        const { HapticFeedback } = require('react-native');
        HapticFeedback?.impactAsync?.(HapticFeedback.ImpactFeedbackStyle.Medium);
      } catch (error) {
        // Haptic feedback not available
      }
    }
    
    // Press animation
    Animated.parallel([
      Animated.timing(scaleValue, {
        toValue: 0.95,
        duration: 150,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(glowValue, {
        toValue: (glow.intensity || 0.8) * 1.2,
        duration: 150,
        easing: Easing.out(Easing.quad),
        useNativeDriver: false,
      }),
    ]).start();
  }, [disabled, interaction.enableHaptics, scaleValue, glowValue, glow.intensity]);
  
  const handlePressOut = useCallback(() => {
    if (disabled) return;
    
    setIsPressed(false);
    
    // Release animation
    Animated.parallel([
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 200,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(glowValue, {
        toValue: (glow.intensity || 0.8) * 0.8,
        duration: 200,
        easing: Easing.out(Easing.quad),
        useNativeDriver: false,
      }),
    ]).start();
  }, [disabled, scaleValue, glowValue, glow.intensity]);
  
  const handlePress = useCallback((event: GestureResponderEvent) => {
    if (disabled) return;
    
    // Accessibility announcement
    if (accessibility.enabled && accessibility.announceInteractions) {
      AccessibilityInfo.announceForAccessibility('Floating orb activated');
    }
    
    onPress?.(event);
  }, [disabled, onPress, accessibility]);
  
  const handleLongPress = useCallback((event: GestureResponderEvent) => {
    if (disabled) return;
    
    onLongPress?.(event);
  }, [disabled, onLongPress]);
  
  // ============================================================================
  // RENDER HELPERS
  // ============================================================================
  
  const renderIcon = () => {
    if (!icon) return null;
    
    const IconComponent = icon.component;
    
    if (IconComponent) {
      return (
        <IconComponent
          name={icon.name}
          size={icon.size || ORB_DIMENSIONS[size].iconSize}
          color={icon.color || DEFAULT_COLORS.background}
          style={[styles.icon, !icon.rotateWithOrb && { transform: [] }]}
        />
      );
    }
    
    // Fallback icon placeholder
    return (
      <View style={[styles.icon, { backgroundColor: icon.color || DEFAULT_COLORS.background }]} />
    );
  };
  
  const renderGlow = () => {
    if (!glow.enabled) return null;
    
    return (
      <Animated.View
        style={[
          styles.glow,
          {
            opacity: glowValue,
            transform: [{ scale: pulseValue }],
          },
        ]}
      />
    );
  };
  
  const renderTrail = () => {
    if (!trail.enabled || !animation.enabled.includes('trail')) return null;
    
    return trailPoints.map((point, index) => (
      <Animated.View
        key={index}
        style={[
          styles.trail,
          {
            left: point.x,
            top: point.y,
            width: ORB_DIMENSIONS[size].size * (1 - index * 0.1),
            height: ORB_DIMENSIONS[size].size * (1 - index * 0.1),
            opacity: trailOpacityValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0, point.opacity],
            }),
          },
        ]}
      />
    ));
  };
  
  const renderMagneticField = () => {
    if (!interaction.enableMagnetic) return null;
    
    return (
      <View style={styles.magneticField} />
    );
  };
  
  // ============================================================================
  // ANIMATED STYLES
  // ============================================================================
  
  const animatedContainerStyle = useMemo(() => {
    const baseTransform: any[] = [
      { scale: scaleValue },
      ...(animation.enabled.includes('pulse') ? [{ scale: pulseValue }] : []),
    ];
    
    // Add float animation
    if (animation.enabled.includes('float')) {
      baseTransform.push({
        translateY: floatValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -12],
        }),
      });
    }
    
    // Add magnetic effects
    if (interaction.enableMagnetic && magneticHover) {
      // Magnetic hover effects would be applied here
      // For now, we'll use the magnetic value animation
      baseTransform.push({
        translateX: magneticValue.interpolate({
          inputRange: [-1, 1],
          outputRange: [-5, 5],
        }),
      });
    }
    
    return {
      transform: baseTransform,
      opacity: opacityValue,
      left: currentPosition.x,
      top: currentPosition.y,
    };
  }, [
    scaleValue,
    pulseValue,
    floatValue,
    opacityValue,
    currentPosition,
    animation.enabled,
    interaction.enableMagnetic,
    magneticHover,
  ]);
  
  const finalOrbitalStyle = animation.enabled.includes('orbital') ? orbitalStyle : {};
  
  // ============================================================================
  // RENDER
  // ============================================================================
  
  if (hidden) {
    return null;
  }
  
  return (
    <>
      {renderTrail()}
      {renderMagneticField()}
      
      <Animated.View
        ref={orbRef}
        style={[
          styles.container,
          animatedContainerStyle,
          finalOrbitalStyle,
          style,
        ]}
        {...(panResponder?.panHandlers || {})}
        testID={testID}
      >
        {renderGlow()}
        
        <TouchableOpacity
          style={{
            width: '100%',
            height: '100%',
            borderRadius: ORB_DIMENSIONS[size].borderRadius,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={handlePress}
          onLongPress={handleLongPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={disabled}
          accessible={accessibility.enabled}
          accessibilityRole={accessibility.role as any}
          accessibilityLabel={accessibility.label}
          accessibilityHint={accessibility.hint}
          accessibilityState={{ disabled }}
          testID={`${testID}-button`}
        >
          {renderIcon()}
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

// ============================================================================
// EXPORTS
// ============================================================================

export default FloatingOrb;
