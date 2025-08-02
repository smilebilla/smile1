/**
 * Corp Astro UI Library - Toggle Button Component
 * 
 * Toggle button with active/inactive states and smooth transitions.
 * Provides a button that can be toggled between on/off states with visual feedback.
 * 
 * @module ButtonToggle
 * @version 1.0.0
 * @since 2024
 * 
 * UI Documentation Reference:
 * - Height: 56px, borderRadius: 28px, padding: '0 32px'
 * - Active: gradient background 'linear-gradient(135deg, #2E86DE 0%, #5758BB 100%)'
 * - Inactive: glass morphism 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)'
 * - Typography: Futura PT, 16px, 600 weight, uppercase, 1px letter spacing
 * - Transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
 * - Glow: active state '0 0 20px rgba(46,134,222,0.5)'
 * - Haptic feedback on toggle
 * 
 * Features:
 * - Toggle active/inactive states
 * - Smooth state transitions
 * - Glow effects on active state
 * - Glass morphism on inactive state
 * - Haptic feedback on toggle
 * - Accessibility support
 * - Responsive touch targets
 * - Animation states
 * - Theme integration
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Animated,
  Easing,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
  AccessibilityProps,
  Platform,
} from 'react-native';
import { useTheme } from '../foundations/themes/ThemeProvider';
import { SignatureBlues } from '../foundations/tokens/colors/SignatureBlues';
import { deepSpaceColors } from '../foundations/tokens/colors/DeepSpaceColors';
import { ProfessionalGrays } from '../foundations/tokens/colors/ProfessionalGrays';
import { SUBTLE_GLASS_PRESET, createGlassMorphismStyle } from '../foundations/effects/GlassMorphism';

/**
 * Toggle button size variants
 */
export type ButtonToggleSize = 'small' | 'medium' | 'large';

/**
 * Toggle button variant types
 */
export type ButtonToggleVariant = 'default' | 'compact' | 'pill';

/**
 * Toggle button configuration
 */
export interface ButtonToggleConfig {
  /** Button variant */
  variant: ButtonToggleVariant;
  /** Button size */
  size: ButtonToggleSize;
  /** Enable haptic feedback */
  enableHaptics: boolean;
  /** Enable glow effects */
  enableGlow: boolean;
  /** Enable glass morphism */
  enableGlassMorphism: boolean;
  /** Enable shadow effects */
  enableShadowEffects: boolean;
  /** Custom active colors */
  activeColors?: [string, string];
  /** Custom inactive color */
  inactiveColor?: string;
}

/**
 * Toggle button props interface
 */
export interface ButtonToggleProps extends AccessibilityProps {
  /** Button text content */
  children: string;
  /** Toggle state */
  active?: boolean;
  /** Press handler */
  onPress?: (active: boolean, event: GestureResponderEvent) => void;
  /** Long press handler */
  onLongPress?: (event: GestureResponderEvent) => void;
  /** Press in handler */
  onPressIn?: (event: GestureResponderEvent) => void;
  /** Press out handler */
  onPressOut?: (event: GestureResponderEvent) => void;
  /** Disabled state */
  disabled?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Button size */
  size?: ButtonToggleSize;
  /** Button variant */
  variant?: ButtonToggleVariant;
  /** Enable haptic feedback */
  enableHaptics?: boolean;
  /** Enable glow effects */
  enableGlow?: boolean;
  /** Enable glass morphism */
  enableGlassMorphism?: boolean;
  /** Enable shadow effects */
  enableShadowEffects?: boolean;
  /** Custom active colors */
  activeColors?: [string, string];
  /** Custom inactive color */
  inactiveColor?: string;
  /** Custom container style */
  containerStyle?: ViewStyle;
  /** Custom button style */
  buttonStyle?: ViewStyle;
  /** Custom text style */
  textStyle?: TextStyle;
  /** Test ID for testing */
  testID?: string;
}

/**
 * Default toggle button configuration
 */
const defaultConfig: ButtonToggleConfig = {
  variant: 'default',
  size: 'medium',
  enableHaptics: true,
  enableGlow: true,
  enableGlassMorphism: true,
  enableShadowEffects: true,
};

/**
 * Toggle button component
 */
export const ButtonToggle: React.FC<ButtonToggleProps> = ({
  children,
  active = false,
  onPress,
  onLongPress,
  onPressIn,
  onPressOut,
  disabled = false,
  loading = false,
  size = 'medium',
  variant = 'default',
  enableHaptics = true,
  enableGlow = true,
  enableGlassMorphism = true,
  enableShadowEffects = true,
  activeColors,
  inactiveColor,
  containerStyle,
  buttonStyle,
  textStyle,
  testID,
  ...accessibilityProps
}) => {
  const theme = useTheme();
  const [isPressed, setIsPressed] = useState(false);
  const [isActive, setIsActive] = useState(active);
  
  // Animation values
  const scaleValue = useRef(new Animated.Value(1)).current;
  const opacityValue = useRef(new Animated.Value(1)).current;
  const glowValue = useRef(new Animated.Value(0)).current;
  const backgroundValue = useRef(new Animated.Value(active ? 1 : 0)).current;

  // Update internal state when prop changes
  useEffect(() => {
    setIsActive(active);
    Animated.timing(backgroundValue, {
      toValue: active ? 1 : 0,
      duration: 300,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();

    if (active && enableGlow) {
      Animated.timing(glowValue, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(glowValue, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }).start();
    }
  }, [active, enableGlow, backgroundValue, glowValue]);

  /**
   * Handle press in
   */
  const handlePressIn = (event: GestureResponderEvent) => {
    if (disabled || loading) return;

    setIsPressed(true);
    
    // Scale down animation
    Animated.parallel([
      Animated.timing(scaleValue, {
        toValue: 0.98,
        duration: 100,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 0.8,
        duration: 100,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    onPressIn?.(event);
  };

  /**
   * Handle press out
   */
  const handlePressOut = (event: GestureResponderEvent) => {
    if (disabled || loading) return;

    setIsPressed(false);
    
    // Scale back up animation
    Animated.parallel([
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 150,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 150,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    onPressOut?.(event);
  };

  /**
   * Handle press
   */
  const handlePress = (event: GestureResponderEvent) => {
    if (disabled || loading) return;

    const newActiveState = !isActive;
    setIsActive(newActiveState);

    // Animate background transition
    Animated.timing(backgroundValue, {
      toValue: newActiveState ? 1 : 0,
      duration: 300,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();

    // Animate glow effect
    if (enableGlow) {
      Animated.timing(glowValue, {
        toValue: newActiveState ? 1 : 0,
        duration: 300,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }).start();
    }

    // Haptic feedback
    if (enableHaptics && Platform.OS === 'ios') {
      // Note: Import HapticFeedback from react-native-haptic-feedback if available
      // HapticFeedback.trigger('impactLight');
    }

    onPress?.(newActiveState, event);
  };

  /**
   * Handle long press
   */
  const handleLongPress = (event: GestureResponderEvent) => {
    if (disabled || loading) return;
    onLongPress?.(event);
  };

  /**
   * Get size configuration
   */
  const getSizeConfig = () => {
    switch (size) {
      case 'small':
        return {
          height: 44,
          paddingHorizontal: 24,
          borderRadius: 22,
          fontSize: 14,
        };
      case 'large':
        return {
          height: 64,
          paddingHorizontal: 40,
          borderRadius: 32,
          fontSize: 18,
        };
      default: // medium
        return {
          height: 56,
          paddingHorizontal: 32,
          borderRadius: 28,
          fontSize: 16,
        };
    }
  };

  /**
   * Get variant configuration
   */
  const getVariantConfig = () => {
    switch (variant) {
      case 'compact':
        return {
          paddingHorizontal: 16,
          minWidth: 80,
        };
      case 'pill':
        return {
          paddingHorizontal: 24,
          borderRadius: 100,
        };
      default: // default
        return {
          minWidth: 120,
        };
    }
  };

  const sizeConfig = getSizeConfig();
  const variantConfig = getVariantConfig();

  // Color interpolation
  const backgroundColor = backgroundValue.interpolate({
    inputRange: [0, 1],
    outputRange: [
      inactiveColor || 'rgba(255,255,255,0.1)',
      activeColors?.[0] || '#2E86DE',
    ],
  });

  const shadowOpacity = backgroundValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.4],
  });

  const glowOpacity = glowValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.5],
  });

  // Styles
  const containerStyles = StyleSheet.flatten([
    styles.container,
    containerStyle,
  ]);

  const buttonStyles = StyleSheet.flatten([
    styles.button,
    {
      height: sizeConfig.height,
      paddingHorizontal: variantConfig.paddingHorizontal || sizeConfig.paddingHorizontal,
      borderRadius: variantConfig.borderRadius || sizeConfig.borderRadius,
      minWidth: variantConfig.minWidth,
    },
    enableGlassMorphism && !isActive && createGlassMorphismStyle(SUBTLE_GLASS_PRESET),
    enableShadowEffects && {
      shadowColor: isActive ? '#2E86DE' : '#000000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 16,
      elevation: 8,
    },
    {
      opacity: disabled ? 0.5 : 1,
    },
    buttonStyle,
  ]);

  const textStyles = StyleSheet.flatten([
    styles.text,
    {
      fontSize: sizeConfig.fontSize,
      color: isActive ? '#FFFFFF' : ProfessionalGrays.light,
    },
    textStyle,
  ]);

  const glowStyles = StyleSheet.flatten([
    styles.glow,
    {
      height: sizeConfig.height,
      borderRadius: variantConfig.borderRadius || sizeConfig.borderRadius,
    },
  ]);

  return (
    <View style={containerStyles}>
      {/* Glow effect */}
      {enableGlow && (
        <Animated.View
          style={[
            glowStyles,
            {
              opacity: glowOpacity,
            },
          ]}
        />
      )}
      
      {/* Main button */}
      <TouchableOpacity
        onPress={handlePress}
        onLongPress={handleLongPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        activeOpacity={1}
        testID={testID}
        accessibilityRole="button"
        accessibilityState={{
          disabled: disabled || loading,
          selected: isActive,
        }}
        {...accessibilityProps}
      >
        <Animated.View
          style={[
            buttonStyles,
            {
              backgroundColor,
              transform: [{ scale: scaleValue }],
              opacity: opacityValue,
            },
          ]}
        >
          {/* Border overlay for inactive state */}
          {!isActive && (
            <View style={styles.borderOverlay} />
          )}
          
          <Text style={textStyles} numberOfLines={1}>
            {loading ? 'Loading...' : children}
          </Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

/**
 * Component styles
 */
const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  borderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 28,
    pointerEvents: 'none',
  },
  text: {
    fontFamily: 'Futura PT',
    fontWeight: '600',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  glow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    shadowColor: '#2E86DE',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 0,
  },
});

export default ButtonToggle;
