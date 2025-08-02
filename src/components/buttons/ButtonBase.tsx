/**
 * Corp Astro UI Library - Base Button Component
 * 
 * Foundation component providing shared button logic, state management, 
 * and common functionality for all button variants in the system.
 * 
 * @module ButtonBase
 * @version 1.0.0
 * @since 2024
 * 
 * Features:
 * - Shared animation state management
 * - Common accessibility implementation
 * - Haptic feedback integration
 * - Loading and disabled state handling
 * - Reusable event handling patterns
 * - Performance-optimized animations
 * - Theme integration support
 * - Extensible configuration system
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    AccessibilityProps,
    Animated,
    Easing,
    GestureResponderEvent,
    NativeSyntheticEvent,
    Platform,
    TargetedEvent,
    Text,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import { useTheme } from '../foundations/themes/ThemeProvider';
import { ProfessionalGrays } from '../foundations/tokens/colors/ProfessionalGrays';

/**
 * Base button size variants
 */
export type ButtonBaseSize = 'small' | 'medium' | 'large';

/**
 * Base button animation types
 */
export type ButtonBaseAnimation = 'scale' | 'opacity' | 'elevation' | 'glow';

/**
 * Base button loading state configuration
 */
export interface ButtonBaseLoadingState {
  /** Show loading state */
  isLoading: boolean;
  /** Loading text override */
  loadingText?: string;
  /** Show spinner */
  showSpinner?: boolean;
  /** Show pulse effect */
  showPulse?: boolean;
  /** Show shimmer effect */
  showShimmer?: boolean;
}

/**
 * Base button configuration
 */
export interface ButtonBaseConfig {
  /** Button size */
  size: ButtonBaseSize;
  /** Enable haptic feedback */
  enableHaptics: boolean;
  /** Enable press animations */
  enablePressAnimation: boolean;
  /** Enable hover effects */
  enableHoverEffects: boolean;
  /** Enable loading states */
  enableLoadingStates: boolean;
  /** Animation duration in ms */
  animationDuration: number;
  /** Press scale factor */
  pressScale: number;
  /** Disabled opacity */
  disabledOpacity: number;
  /** Minimum touch target size */
  minTouchTarget: number;
}

/**
 * Base button animation state
 */
export interface ButtonBaseAnimationState {
  /** Scale animation value */
  scaleValue: Animated.Value;
  /** Opacity animation value */
  opacityValue: Animated.Value;
  /** Elevation animation value */
  elevationValue: Animated.Value;
  /** Glow animation value */
  glowValue: Animated.Value;
}

/**
 * Base button state
 */
export interface ButtonBaseState {
  /** Is currently pressed */
  isPressed: boolean;
  /** Is currently loading */
  isLoading: boolean;
  /** Is currently disabled */
  isDisabled: boolean;
  /** Is currently focused */
  isFocused: boolean;
  /** Is currently hovered */
  isHovered: boolean;
}

/**
 * Base button event handlers
 */
export interface ButtonBaseHandlers {
  /** Handle press start */
  onPressIn: (event: GestureResponderEvent) => void;
  /** Handle press end */
  onPressOut: (event: GestureResponderEvent) => void;
  /** Handle press */
  onPress: (event: GestureResponderEvent) => void;
  /** Handle long press */
  onLongPress?: (event: GestureResponderEvent) => void;
  /** Handle focus */
  onFocus?: (event: NativeSyntheticEvent<TargetedEvent>) => void;
  /** Handle blur */
  onBlur?: (event: NativeSyntheticEvent<TargetedEvent>) => void;
}

/**
 * Base button props
 */
export interface ButtonBaseProps extends AccessibilityProps {
  /** Button content */
  children: React.ReactNode;
  /** Press handler */
  onPress: (event: GestureResponderEvent) => void;
  /** Long press handler */
  onLongPress?: (event: GestureResponderEvent) => void;
  /** Press in handler */
  onPressIn?: (event: GestureResponderEvent) => void;
  /** Press out handler */
  onPressOut?: (event: GestureResponderEvent) => void;
  /** Focus handler */
  onFocus?: (event: NativeSyntheticEvent<TargetedEvent>) => void;
  /** Blur handler */
  onBlur?: (event: NativeSyntheticEvent<TargetedEvent>) => void;
  /** Disabled state */
  disabled?: boolean;
  /** Loading state configuration */
  loading?: ButtonBaseLoadingState;
  /** Button configuration */
  config?: Partial<ButtonBaseConfig>;
  /** Custom container style */
  containerStyle?: ViewStyle;
  /** Custom button style */
  buttonStyle?: ViewStyle;
  /** Custom text style */
  textStyle?: TextStyle;
  /** Test ID for testing */
  testID?: string;
  /** Render custom content */
  renderContent?: (state: ButtonBaseState) => React.ReactNode;
  /** Custom animations */
  customAnimations?: Partial<ButtonBaseAnimationState>;
}

/**
 * Default base button configuration
 */
const defaultConfig: ButtonBaseConfig = {
  size: 'medium',
  enableHaptics: true,
  enablePressAnimation: true,
  enableHoverEffects: true,
  enableLoadingStates: true,
  animationDuration: 150,
  pressScale: 0.98,
  disabledOpacity: 0.5,
  minTouchTarget: 44,
};

/**
 * Base button size configurations
 */
const sizeConfigs = {
  small: {
    height: 44,
    paddingHorizontal: 24,
    borderRadius: 22,
    fontSize: 14,
    fontWeight: '500' as const,
  },
  medium: {
    height: 56,
    paddingHorizontal: 32,
    borderRadius: 28,
    fontSize: 16,
    fontWeight: '600' as const,
  },
  large: {
    height: 64,
    paddingHorizontal: 40,
    borderRadius: 32,
    fontSize: 18,
    fontWeight: '600' as const,
  },
};

/**
 * Base button component
 */
export const ButtonBase: React.FC<ButtonBaseProps> = ({
  children,
  onPress,
  onLongPress,
  onPressIn,
  onPressOut,
  onFocus,
  onBlur,
  disabled = false,
  loading,
  config = {},
  containerStyle,
  buttonStyle,
  textStyle,
  testID,
  renderContent,
  customAnimations,
  ...accessibilityProps
}) => {
  const theme = useTheme();
  const finalConfig = { ...defaultConfig, ...config };
  
  // Component state
  const [componentState, setComponentState] = useState<ButtonBaseState>({
    isPressed: false,
    isLoading: loading?.isLoading || false,
    isDisabled: disabled,
    isFocused: false,
    isHovered: false,
  });

  // Animation values
  const animationState: ButtonBaseAnimationState = {
    scaleValue: useRef(new Animated.Value(1)).current,
    opacityValue: useRef(new Animated.Value(1)).current,
    elevationValue: useRef(new Animated.Value(0)).current,
    glowValue: useRef(new Animated.Value(0)).current,
    ...customAnimations,
  };

  // Update loading state when prop changes
  useEffect(() => {
    setComponentState(prev => ({
      ...prev,
      isLoading: loading?.isLoading || false,
    }));
  }, [loading?.isLoading]);

  // Update disabled state when prop changes
  useEffect(() => {
    setComponentState(prev => ({
      ...prev,
      isDisabled: disabled,
    }));
  }, [disabled]);

  /**
   * Trigger haptic feedback
   */
  const triggerHapticFeedback = useCallback(() => {
    if (finalConfig.enableHaptics && Platform.OS === 'ios') {
      // Note: Import HapticFeedback from react-native-haptic-feedback if available
      // HapticFeedback.trigger('impactLight');
    }
  }, [finalConfig.enableHaptics]);

  /**
   * Animate to pressed state
   */
  const animateToPressed = useCallback(() => {
    if (!finalConfig.enablePressAnimation) return;

    Animated.parallel([
      Animated.timing(animationState.scaleValue, {
        toValue: finalConfig.pressScale,
        duration: finalConfig.animationDuration,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(animationState.opacityValue, {
        toValue: 0.8,
        duration: finalConfig.animationDuration,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [finalConfig, animationState]);

  /**
   * Animate to normal state
   */
  const animateToNormal = useCallback(() => {
    if (!finalConfig.enablePressAnimation) return;

    Animated.parallel([
      Animated.timing(animationState.scaleValue, {
        toValue: 1,
        duration: finalConfig.animationDuration,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(animationState.opacityValue, {
        toValue: 1,
        duration: finalConfig.animationDuration,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [finalConfig, animationState]);

  /**
   * Handle press in
   */
  const handlePressIn = useCallback((event: GestureResponderEvent) => {
    if (componentState.isDisabled || componentState.isLoading) return;

    setComponentState(prev => ({ ...prev, isPressed: true }));
    animateToPressed();
    triggerHapticFeedback();
    onPressIn?.(event);
  }, [componentState.isDisabled, componentState.isLoading, animateToPressed, triggerHapticFeedback, onPressIn]);

  /**
   * Handle press out
   */
  const handlePressOut = useCallback((event: GestureResponderEvent) => {
    if (componentState.isDisabled || componentState.isLoading) return;

    setComponentState(prev => ({ ...prev, isPressed: false }));
    animateToNormal();
    onPressOut?.(event);
  }, [componentState.isDisabled, componentState.isLoading, animateToNormal, onPressOut]);

  /**
   * Handle press
   */
  const handlePress = useCallback((event: GestureResponderEvent) => {
    if (componentState.isDisabled || componentState.isLoading) return;
    onPress(event);
  }, [componentState.isDisabled, componentState.isLoading, onPress]);

  /**
   * Handle long press
   */
  const handleLongPress = useCallback((event: GestureResponderEvent) => {
    if (componentState.isDisabled || componentState.isLoading) return;
    onLongPress?.(event);
  }, [componentState.isDisabled, componentState.isLoading, onLongPress]);

  /**
   * Handle focus
   */
  const handleFocus = useCallback((event: NativeSyntheticEvent<TargetedEvent>) => {
    setComponentState(prev => ({ ...prev, isFocused: true }));
    onFocus?.(event);
  }, [onFocus]);

  /**
   * Handle blur
   */
  const handleBlur = useCallback((event: NativeSyntheticEvent<TargetedEvent>) => {
    setComponentState(prev => ({ ...prev, isFocused: false }));
    onBlur?.(event);
  }, [onBlur]);

  // Get size configuration
  const sizeConfig = sizeConfigs[finalConfig.size];

  // Create event handlers
  const handlers: ButtonBaseHandlers = {
    onPressIn: handlePressIn,
    onPressOut: handlePressOut,
    onPress: handlePress,
    onLongPress: handleLongPress,
    onFocus: handleFocus,
    onBlur: handleBlur,
  };

  // Base container styles
  const baseContainerStyle: ViewStyle = {
    position: 'relative',
    minHeight: Math.max(sizeConfig.height, finalConfig.minTouchTarget),
    minWidth: Math.max(sizeConfig.height, finalConfig.minTouchTarget),
    justifyContent: 'center',
    alignItems: 'center',
  };

  // Base button styles
  const baseButtonStyle: ViewStyle = {
    height: sizeConfig.height,
    paddingHorizontal: sizeConfig.paddingHorizontal,
    borderRadius: sizeConfig.borderRadius,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    opacity: componentState.isDisabled ? finalConfig.disabledOpacity : 1,
  };

  // Base text styles
  const baseTextStyle: TextStyle = {
    fontSize: sizeConfig.fontSize,
    fontWeight: sizeConfig.fontWeight,
    color: ProfessionalGrays.light,
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
  };

  // Merge styles
  const finalContainerStyle = [baseContainerStyle, containerStyle];
  const finalButtonStyle = [baseButtonStyle, buttonStyle];
  const finalTextStyle = [baseTextStyle, textStyle];

  return (
    <View style={finalContainerStyle}>
      <TouchableOpacity
        onPress={handlers.onPress}
        onLongPress={handlers.onLongPress}
        onPressIn={handlers.onPressIn}
        onPressOut={handlers.onPressOut}
        onFocus={handlers.onFocus}
        onBlur={handlers.onBlur}
        disabled={componentState.isDisabled || componentState.isLoading}
        activeOpacity={1}
        testID={testID}
        accessibilityRole="button"
        accessibilityState={{
          disabled: componentState.isDisabled || componentState.isLoading,
          busy: componentState.isLoading,
        }}
        {...accessibilityProps}
      >
        <Animated.View
          style={[
            finalButtonStyle,
            {
              transform: [{ scale: animationState.scaleValue }],
              opacity: animationState.opacityValue,
            },
          ]}
        >
          {renderContent ? (
            renderContent(componentState)
          ) : (
            <>
              {typeof children === 'string' ? (
                <Text style={finalTextStyle} numberOfLines={1}>
                  {componentState.isLoading ? (loading?.loadingText || 'Loading...') : children}
                </Text>
              ) : (
                children
              )}
            </>
          )}
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

/**
 * Hook for using button base functionality
 */
export const useButtonBase = (
  config: Partial<ButtonBaseConfig> = {},
  initialState: Partial<ButtonBaseState> = {}
) => {
  const finalConfig = { ...defaultConfig, ...config };
  const [state, setState] = useState<ButtonBaseState>({
    isPressed: false,
    isLoading: false,
    isDisabled: false,
    isFocused: false,
    isHovered: false,
    ...initialState,
  });

  const animationState: ButtonBaseAnimationState = {
    scaleValue: useRef(new Animated.Value(1)).current,
    opacityValue: useRef(new Animated.Value(1)).current,
    elevationValue: useRef(new Animated.Value(0)).current,
    glowValue: useRef(new Animated.Value(0)).current,
  };

  const updateState = useCallback((updates: Partial<ButtonBaseState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  return {
    state,
    config: finalConfig,
    animationState,
    updateState,
    sizeConfig: sizeConfigs[finalConfig.size],
  };
};

/**
 * Utility function to create button size configuration
 */
export const createButtonSizeConfig = (
  height: number,
  paddingHorizontal: number,
  borderRadius: number,
  fontSize: number,
  fontWeight: '300' | '400' | '500' | '600' | '700' = '500'
) => ({
  height,
  paddingHorizontal,
  borderRadius,
  fontSize,
  fontWeight,
});

/**
 * Utility function to create button animation
 */
export const createButtonAnimation = (
  animatedValue: Animated.Value,
  toValue: number,
  duration: number = 150,
  easing: ((value: number) => number) = Easing.out(Easing.cubic),
  useNativeDriver: boolean = true
) => {
  return Animated.timing(animatedValue, {
    toValue,
    duration,
    easing,
    useNativeDriver,
  });
};

export default ButtonBase;
