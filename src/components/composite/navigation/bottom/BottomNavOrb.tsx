/**
 * Corp Astro UI Library - Bottom Navigation Orb Component
 * 
 * A floating orb element for bottom navigation that provides premium interactive features
 * with cosmic design aesthetics and advanced animations.
 * 
 * Features:
 * - Floating orb with radial gradient backgrounds
 * - Orbital rotation and pulse animations
 * - Premium indicator system
 * - Magnetic hover effects
 * - Gesture support with haptic feedback
 * - Multiple size and position variants
 * - Accessibility compliant with proper ARIA attributes
 * - Theme-aware styling with Corp Astro design system
 * 
 * @module BottomNavOrb
 * @version 1.0.0
 * @since 2024
 * 
 * UI Documentation Reference:
 * - Design System: floatingOrb specifications (size: 64px, radial gradient, animations)
 * - Animation: float (6s), rotate (20s), pulse (3s)
 * - Position: center, right, custom positioning
 * - Premium: enhanced glow and shimmer effects
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

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Bottom navigation orb size variants
 */
export type BottomNavOrbSize = 'small' | 'medium' | 'large';

/**
 * Bottom navigation orb position variants
 */
export type BottomNavOrbPosition = 'center' | 'right' | 'left' | 'custom';

/**
 * Bottom navigation orb animation variants
 */
export type BottomNavOrbAnimation = 'float' | 'orbital' | 'pulse' | 'magnetic' | 'none';

/**
 * Bottom navigation orb variant styles
 */
export type BottomNavOrbVariant = 'default' | 'premium' | 'cosmic' | 'minimal' | 'glass';

/**
 * Icon configuration for the orb
 */
export interface BottomNavOrbIcon {
  /** Icon component or string identifier */
  component?: React.ComponentType<any>;
  /** Icon name for string-based icons */
  name?: string;
  /** Icon size (default: auto-calculated) */
  size?: number;
  /** Icon color (default: theme-based) */
  color?: string;
}

/**
 * Animation configuration for the orb
 */
export interface BottomNavOrbAnimationConfig {
  /** Animation type */
  type: BottomNavOrbAnimation;
  /** Animation duration in milliseconds */
  duration?: number;
  /** Animation easing function */
  easing?: string;
  /** Whether to start animation automatically */
  autoStart?: boolean;
  /** Animation intensity (0-1) */
  intensity?: number;
  /** Whether to loop animation */
  loop?: boolean;
}

/**
 * Position configuration for the orb
 */
export interface BottomNavOrbPositionConfig {
  /** Position type */
  type: BottomNavOrbPosition;
  /** Custom position (when type is 'custom') */
  custom?: {
    x?: number;
    y?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
  /** Whether to respect safe area */
  respectSafeArea?: boolean;
}

/**
 * Gesture configuration for the orb
 */
export interface BottomNavOrbGestureConfig {
  /** Whether to enable pan gestures */
  enablePan?: boolean;
  /** Whether to enable magnetic effects */
  enableMagnetic?: boolean;
  /** Whether to enable haptic feedback */
  enableHaptics?: boolean;
  /** Pan gesture bounds */
  panBounds?: {
    minX?: number;
    maxX?: number;
    minY?: number;
    maxY?: number;
  };
  /** Magnetic effect strength */
  magneticStrength?: number;
}

/**
 * Premium features configuration
 */
export interface BottomNavOrbPremiumConfig {
  /** Whether this is a premium orb */
  enabled?: boolean;
  /** Premium indicator position */
  indicatorPosition?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  /** Premium glow intensity */
  glowIntensity?: number;
  /** Premium shimmer effect */
  shimmerEnabled?: boolean;
  /** Premium animation enhancements */
  enhancedAnimations?: boolean;
}

/**
 * Accessibility configuration
 */
export interface BottomNavOrbAccessibilityConfig {
  /** Whether accessibility is enabled */
  enabled?: boolean;
  /** Accessibility label */
  label?: string;
  /** Accessibility hint */
  hint?: string;
  /** Accessibility role */
  role?: string;
  /** Whether to announce state changes */
  announceChanges?: boolean;
}

/**
 * Main component props interface
 */
export interface BottomNavOrbProps {
  /** Orb size variant */
  size?: BottomNavOrbSize;
  /** Orb visual variant */
  variant?: BottomNavOrbVariant;
  /** Orb position configuration */
  position?: BottomNavOrbPositionConfig;
  /** Orb icon configuration */
  icon?: BottomNavOrbIcon;
  /** Animation configuration */
  animation?: BottomNavOrbAnimationConfig;
  /** Gesture configuration */
  gesture?: BottomNavOrbGestureConfig;
  /** Premium features configuration */
  premium?: BottomNavOrbPremiumConfig;
  /** Whether the orb is disabled */
  disabled?: boolean;
  /** Whether the orb is hidden */
  hidden?: boolean;
  /** Press handler */
  onPress?: (event: GestureResponderEvent) => void;
  /** Long press handler */
  onLongPress?: (event: GestureResponderEvent) => void;
  /** Position change handler (for draggable orbs) */
  onPositionChange?: (position: { x: number; y: number }) => void;
  /** Custom styling */
  style?: ViewStyle;
  /** Accessibility configuration */
  accessibility?: BottomNavOrbAccessibilityConfig;
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
  float: { duration: 6000, intensity: 0.8, loop: true },
  orbital: { duration: 20000, intensity: 1.0, loop: true },
  pulse: { duration: 3000, intensity: 0.6, loop: true },
  magnetic: { duration: 300, intensity: 0.5, loop: false },
};

/**
 * Default colors for fallback
 */
const DEFAULT_COLORS = {
  primary: '#2E86DE',
  secondary: '#54A0FF',
  glow: '#54A0FF',
  background: '#1a1a2e',
  premium: '#DDA0FF',
  surface: '#16213e',
};

// ============================================================================
// STYLE CREATORS
// ============================================================================

/**
 * Create orb styles based on theme and configuration
 */
const createOrbStyles = (
  theme: any,
  config: {
    size: BottomNavOrbSize;
    variant: BottomNavOrbVariant;
    position: BottomNavOrbPositionConfig;
    premium?: BottomNavOrbPremiumConfig;
    disabled?: boolean;
  }
) => {
  const { size, variant, position, premium, disabled } = config;
  const dimensions = ORB_DIMENSIONS[size];
  
  // Get theme colors with fallbacks
  const colors = {
    primary: theme?.colors?.brand?.primary || DEFAULT_COLORS.primary,
    secondary: theme?.colors?.brand?.secondary || DEFAULT_COLORS.secondary,
    glow: theme?.colors?.brand?.glow || DEFAULT_COLORS.glow,
    background: theme?.colors?.background?.primary || DEFAULT_COLORS.background,
    premium: theme?.colors?.luxury?.pure || DEFAULT_COLORS.premium,
    surface: theme?.colors?.surface?.primary || DEFAULT_COLORS.surface,
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
  
  // Position-specific styles
  const positionStyles: ViewStyle = (() => {
    switch (position.type) {
      case 'center':
        return {
          bottom: position.respectSafeArea ? 20 : 10,
          left: '50%',
          transform: [{ translateX: -dimensions.size / 2 }],
        };
      case 'right':
        return {
          bottom: position.respectSafeArea ? 20 : 10,
          right: 20,
        };
      case 'left':
        return {
          bottom: position.respectSafeArea ? 20 : 10,
          left: 20,
        };
      case 'custom':
        return {
          ...(position.custom?.bottom !== undefined && { bottom: position.custom.bottom }),
          ...(position.custom?.left !== undefined && { left: position.custom.left }),
          ...(position.custom?.right !== undefined && { right: position.custom.right }),
          ...(position.custom?.x !== undefined && { left: position.custom.x }),
          ...(position.custom?.y !== undefined && { top: position.custom.y }),
        };
      default:
        return {
          bottom: 20,
          left: '50%',
          transform: [{ translateX: -dimensions.size / 2 }],
        };
    }
  })();
  
  // Variant-specific styles
  const variantStyles: ViewStyle = (() => {
    switch (variant) {
      case 'premium':
        return {
          backgroundColor: colors.premium,
          shadowColor: colors.premium,
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.6,
          shadowRadius: 16,
          elevation: 12,
        };
      case 'cosmic':
        return {
          backgroundColor: colors.primary,
          shadowColor: colors.glow,
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.5,
          shadowRadius: 12,
          elevation: 10,
        };
      case 'minimal':
        return {
          backgroundColor: colors.surface,
          shadowColor: colors.primary,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 6,
        };
      case 'glass':
        return {
          backgroundColor: `${colors.surface}40`,
          borderWidth: 1,
          borderColor: `${colors.primary}30`,
          shadowColor: colors.primary,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 6,
        };
      default:
        return {
          backgroundColor: colors.primary,
          shadowColor: colors.glow,
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.4,
          shadowRadius: 10,
          elevation: 8,
        };
    }
  })();
  
  return StyleSheet.create({
    container: {
      ...baseContainer,
      ...positionStyles,
      ...variantStyles,
    },
    icon: {
      width: dimensions.iconSize,
      height: dimensions.iconSize,
      tintColor: variant === 'premium' ? colors.background : colors.background,
    },
    premiumIndicator: {
      position: 'absolute',
      top: premium?.indicatorPosition?.includes('top') ? -4 : undefined,
      bottom: premium?.indicatorPosition?.includes('bottom') ? -4 : undefined,
      right: premium?.indicatorPosition?.includes('right') ? -4 : undefined,
      left: premium?.indicatorPosition?.includes('left') ? -4 : undefined,
      width: 16,
      height: 16,
      borderRadius: 8,
      backgroundColor: colors.premium,
      borderWidth: 2,
      borderColor: colors.background,
    },
    glow: {
      position: 'absolute',
      width: dimensions.size + 20,
      height: dimensions.size + 20,
      borderRadius: dimensions.borderRadius + 10,
      backgroundColor: premium?.enabled ? colors.premium : colors.glow,
      opacity: 0.3,
      zIndex: -1,
    },
    trail: {
      position: 'absolute',
      width: dimensions.size * 0.8,
      height: dimensions.size * 0.8,
      borderRadius: dimensions.borderRadius * 0.8,
      backgroundColor: colors.primary,
      opacity: 0.2,
      zIndex: -2,
    },
  });
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Bottom Navigation Orb Component
 */
export const BottomNavOrb: React.FC<BottomNavOrbProps> = ({
  size = 'medium',
  variant = 'default',
  position = { type: 'center', respectSafeArea: true },
  icon,
  animation = { type: 'float', autoStart: true, loop: true },
  gesture = { enablePan: false, enableMagnetic: false, enableHaptics: true },
  premium = { enabled: false, indicatorPosition: 'top-right', glowIntensity: 1.0 },
  disabled = false,
  hidden = false,
  onPress,
  onLongPress,
  onPositionChange,
  style,
  accessibility = { enabled: true, role: 'button' },
  testID = 'corp-astro-bottom-nav-orb',
}) => {
  const { theme } = useTheme();
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
  
  // Animation values
  const scaleValue = useRef(new Animated.Value(1)).current;
  const opacityValue = useRef(new Animated.Value(hidden ? 0 : 1)).current;
  const glowValue = useRef(new Animated.Value(0)).current;
  const floatValue = useRef(new Animated.Value(0)).current;
  const pulseValue = useRef(new Animated.Value(1)).current;
  const magneticValue = useRef(new Animated.Value(0)).current;
  
  // Orbital rotation hook
  const { animatedStyle: orbitalStyle, start: startOrbital, stop: stopOrbital } = useOrbitalRotation({
    speed: animation.duration || DEFAULT_ANIMATIONS.orbital.duration,
    direction: 'normal',
    autoStart: animation.autoStart && animation.type === 'orbital',
  });
  
  // Styles
  const styles = useMemo(() => createOrbStyles(theme, {
    size,
    variant,
    position,
    premium,
    disabled,
  }), [theme, size, variant, position, premium, disabled]);
  
  // ============================================================================
  // ANIMATION EFFECTS
  // ============================================================================
  
  // Float animation
  useEffect(() => {
    if (animation.type === 'float' && animation.autoStart && !disabled) {
      const floatAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(floatValue, {
            toValue: 1,
            duration: (animation.duration || DEFAULT_ANIMATIONS.float.duration) / 2,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(floatValue, {
            toValue: 0,
            duration: (animation.duration || DEFAULT_ANIMATIONS.float.duration) / 2,
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
    if (animation.type === 'pulse' && animation.autoStart && !disabled) {
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseValue, {
            toValue: 1.1,
            duration: (animation.duration || DEFAULT_ANIMATIONS.pulse.duration) / 2,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseValue, {
            toValue: 1,
            duration: (animation.duration || DEFAULT_ANIMATIONS.pulse.duration) / 2,
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
    if (premium.enabled && premium.glowIntensity && !disabled) {
      const glowAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(glowValue, {
            toValue: premium.glowIntensity,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
          Animated.timing(glowValue, {
            toValue: 0.3,
            duration: 2000,
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
  }, [premium, disabled, glowValue]);
  
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
  // GESTURE HANDLERS
  // ============================================================================
  
  // Pan responder for drag gestures
  const panResponder = useMemo(() => {
    if (!gesture.enablePan) return null;
    
    return PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setIsPressed(true);
        
        // Haptic feedback
        if (gesture.enableHaptics && Platform.OS === 'ios') {
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
        
        // Apply bounds if specified
        if (gesture.panBounds) {
          newPosition.x = Math.max(
            gesture.panBounds.minX || 0,
            Math.min(gesture.panBounds.maxX || SCREEN_DIMENSIONS.width, newPosition.x)
          );
          newPosition.y = Math.max(
            gesture.panBounds.minY || 0,
            Math.min(gesture.panBounds.maxY || SCREEN_DIMENSIONS.height, newPosition.y)
          );
        }
        
        setCurrentPosition(newPosition);
        onPositionChange?.(newPosition);
      },
      onPanResponderRelease: () => {
        setIsPressed(false);
      },
    });
  }, [gesture, currentPosition, onPositionChange]);
  
  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================
  
  const handlePressIn = useCallback(() => {
    if (disabled) return;
    
    setIsPressed(true);
    
    // Haptic feedback
    if (gesture.enableHaptics && Platform.OS === 'ios') {
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
        toValue: premium.enabled ? (premium.glowIntensity || 1.0) : 0.8,
        duration: 150,
        easing: Easing.out(Easing.quad),
        useNativeDriver: false,
      }),
    ]).start();
  }, [disabled, gesture.enableHaptics, scaleValue, glowValue, premium]);
  
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
        toValue: premium.enabled ? (premium.glowIntensity || 1.0) * 0.5 : 0.3,
        duration: 200,
        easing: Easing.out(Easing.quad),
        useNativeDriver: false,
      }),
    ]).start();
  }, [disabled, scaleValue, glowValue, premium]);
  
  const handlePress = useCallback((event: GestureResponderEvent) => {
    if (disabled) return;
    
    // Accessibility announcement
    if (accessibility.enabled && accessibility.announceChanges) {
      AccessibilityInfo.announceForAccessibility('Orb activated');
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
          color={icon.color || (variant === 'premium' ? DEFAULT_COLORS.background : DEFAULT_COLORS.background)}
          style={styles.icon}
        />
      );
    }
    
    // Fallback icon placeholder
    return (
      <View style={[styles.icon, { backgroundColor: icon.color || DEFAULT_COLORS.background }]} />
    );
  };
  
  const renderPremiumIndicator = () => {
    if (!premium.enabled) return null;
    
    return (
      <View style={styles.premiumIndicator} />
    );
  };
  
  const renderGlow = () => {
    if (!premium.enabled && animation.type !== 'pulse') return null;
    
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
  
  // ============================================================================
  // ANIMATED STYLES
  // ============================================================================
  
  const animatedContainerStyle = useMemo(() => {
    const baseTransform: any[] = [
      { scale: scaleValue },
      ...(animation.type === 'pulse' ? [{ scale: pulseValue }] : []),
    ];
    
    // Add float animation
    if (animation.type === 'float') {
      baseTransform.push({
        translateY: floatValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -8],
        }),
      });
    }
    
    // Add magnetic animation
    if (gesture.enableMagnetic) {
      baseTransform.push({
        translateX: magneticValue.interpolate({
          inputRange: [-1, 1],
          outputRange: [-10, 10],
        }),
      });
    }
    
    return {
      transform: baseTransform,
      opacity: opacityValue,
    };
  }, [
    scaleValue,
    pulseValue,
    floatValue,
    magneticValue,
    opacityValue,
    animation.type,
    gesture.enableMagnetic,
  ]);
  
  const finalOrbitalStyle = animation.type === 'orbital' ? orbitalStyle : {};
  
  // ============================================================================
  // RENDER
  // ============================================================================
  
  if (hidden) {
    return null;
  }
  
  return (
    <Animated.View
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
      
      {renderPremiumIndicator()}
    </Animated.View>
  );
};

// ============================================================================
// EXPORTS
// ============================================================================

export default BottomNavOrb;
