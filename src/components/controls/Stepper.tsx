import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  LayoutChangeEvent,
} from 'react-native';

/**
 * Stepper component size variants
 */
export type StepperSize = 'small' | 'medium' | 'large';

/**
 * Stepper component orientation
 */
export type StepperOrientation = 'horizontal' | 'vertical';

/**
 * Stepper component props
 */
export interface StepperProps {
  /** Current value (controlled) */
  value?: number;
  /** Default value (uncontrolled) */
  defaultValue?: number;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment/decrement amount */
  step?: number;
  /** Size variant */
  size?: StepperSize;
  /** Orientation */
  orientation?: StepperOrientation;
  /** Whether the stepper is disabled */
  disabled?: boolean;
  /** Whether the stepper is loading */
  loading?: boolean;
  /** Whether the stepper is read-only */
  readOnly?: boolean;
  /** Show value display */
  showValue?: boolean;
  /** Value change handler */
  onValueChange?: (value: number) => void;
  /** Value change complete handler */
  onValueChangeComplete?: (value: number) => void;
  /** Custom stepper style */
  stepperStyle?: ViewStyle;
  /** Custom button style */
  buttonStyle?: ViewStyle;
  /** Custom value display style */
  valueStyle?: ViewStyle;
  /** Custom container style */
  containerStyle?: ViewStyle;
  /** Custom label style */
  labelStyle?: TextStyle;
  /** Custom button colors */
  buttonColor?: string;
  /** Custom button text color */
  buttonTextColor?: string;
  /** Custom value background color */
  valueBackgroundColor?: string;
  /** Custom value text color */
  valueTextColor?: string;
  /** Enable glow effect */
  glowEffect?: boolean;
  /** Animation duration in milliseconds */
  animationDuration?: number;
  /** Value format function */
  formatValue?: (value: number) => string;
  /** Decimal places for display */
  decimalPlaces?: number;
  /** Allow decimal values */
  allowDecimal?: boolean;
  /** Auto-repeat on long press */
  autoRepeat?: boolean;
  /** Auto-repeat delay in milliseconds */
  autoRepeatDelay?: number;
  /** Auto-repeat interval in milliseconds */
  autoRepeatIntervalMs?: number;
  /** Test ID for testing */
  testID?: string;
  /** Accessibility label */
  accessibilityLabel?: string;
  /** Accessibility hint */
  accessibilityHint?: string;
  /** Enable haptic feedback */
  hapticFeedback?: boolean;
  /** Custom render function for increment button */
  renderIncrementButton?: (props: {
    onPress: () => void;
    disabled: boolean;
    size: StepperSize;
    style: ViewStyle;
  }) => React.ReactNode;
  /** Custom render function for decrement button */
  renderDecrementButton?: (props: {
    onPress: () => void;
    disabled: boolean;
    size: StepperSize;
    style: ViewStyle;
  }) => React.ReactNode;
  /** Custom render function for value display */
  renderValue?: (props: {
    value: number;
    formattedValue: string;
    size: StepperSize;
    style: ViewStyle;
  }) => React.ReactNode;
}

/**
 * Size configuration for different stepper sizes
 */
const sizeConfigs = {
  small: {
    buttonSize: 32,
    valueWidth: 60,
    valueHeight: 32,
    fontSize: 14,
    iconSize: 12,
    borderRadius: 8,
    spacing: 4,
  },
  medium: {
    buttonSize: 40,
    valueWidth: 80,
    valueHeight: 40,
    fontSize: 16,
    iconSize: 14,
    borderRadius: 10,
    spacing: 6,
  },
  large: {
    buttonSize: 48,
    valueWidth: 100,
    valueHeight: 48,
    fontSize: 18,
    iconSize: 16,
    borderRadius: 12,
    spacing: 8,
  },
};

/**
 * Stepper component
 * 
 * A number stepper component following Corp Astro design system.
 * Features increment/decrement buttons with auto-repeat and animations.
 * 
 * @param props - Stepper component props
 * @returns JSX.Element
 */
export const Stepper: React.FC<StepperProps> = ({
  value,
  defaultValue = 0,
  min = Number.MIN_SAFE_INTEGER,
  max = Number.MAX_SAFE_INTEGER,
  step = 1,
  size = 'medium',
  orientation = 'horizontal',
  disabled = false,
  loading = false,
  readOnly = false,
  showValue = true,
  onValueChange,
  onValueChangeComplete,
  stepperStyle,
  buttonStyle,
  valueStyle,
  containerStyle,
  labelStyle,
  buttonColor = '#2E86DE',
  buttonTextColor = '#FFFFFF',
  valueBackgroundColor = 'rgba(22, 33, 62, 0.3)',
  valueTextColor = '#FFFFFF',
  glowEffect = true,
  animationDuration = 200,
  formatValue = (val: number) => val.toString(),
  decimalPlaces = 0,
  allowDecimal = false,
  autoRepeat = true,
  autoRepeatDelay = 500,
  autoRepeatIntervalMs = 100,
  testID,
  accessibilityLabel,
  accessibilityHint,
  hapticFeedback = true,
  renderIncrementButton,
  renderDecrementButton,
  renderValue,
}) => {
  // State management
  const [internalValue, setInternalValue] = useState<number>(defaultValue);
  const [isIncrementing, setIsIncrementing] = useState<boolean>(false);
  const [isDecrementing, setIsDecrementing] = useState<boolean>(false);
  
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  
  // Animation values
  const incrementScale = useRef(new Animated.Value(1)).current;
  const decrementScale = useRef(new Animated.Value(1)).current;
  const valueScale = useRef(new Animated.Value(1)).current;
  const incrementGlow = useRef(new Animated.Value(0)).current;
  const decrementGlow = useRef(new Animated.Value(0)).current;
  
  // Auto-repeat refs
  const autoRepeatTimeout = useRef<NodeJS.Timeout | null>(null);
  const autoRepeatInterval = useRef<NodeJS.Timeout | null>(null);
  
  // Size configuration
  const sizeConfig = sizeConfigs[size];
  
  // Format value based on settings
  const getFormattedValue = useCallback((val: number) => {
    if (allowDecimal && decimalPlaces > 0) {
      return formatValue(Number(val.toFixed(decimalPlaces)));
    }
    return formatValue(Math.round(val));
  }, [allowDecimal, decimalPlaces, formatValue]);
  
  // Clamp value to range
  const clampValue = useCallback((val: number) => {
    return Math.max(min, Math.min(max, val));
  }, [min, max]);
  
  // Handle value change
  const handleValueChange = useCallback((newValue: number) => {
    if (disabled || loading || readOnly) return;
    
    const clampedValue = clampValue(newValue);
    
    // Haptic feedback
    if (hapticFeedback && clampedValue !== currentValue) {
      // Add haptic feedback here if needed
    }
    
    // Update internal state if uncontrolled
    if (!isControlled) {
      setInternalValue(clampedValue);
    }
    
    // Call external handler
    onValueChange?.(clampedValue);
    
    // Animate value change
    Animated.sequence([
      Animated.timing(valueScale, {
        toValue: 1.1,
        duration: animationDuration / 2,
        useNativeDriver: true,
      }),
      Animated.timing(valueScale, {
        toValue: 1,
        duration: animationDuration / 2,
        useNativeDriver: true,
      }),
    ]).start();
  }, [
    disabled,
    loading,
    readOnly,
    clampValue,
    hapticFeedback,
    currentValue,
    isControlled,
    onValueChange,
    valueScale,
    animationDuration,
  ]);
  
  // Clear auto-repeat timers
  const clearAutoRepeat = useCallback(() => {
    if (autoRepeatTimeout.current) {
      clearTimeout(autoRepeatTimeout.current);
      autoRepeatTimeout.current = null;
    }
    if (autoRepeatInterval.current) {
      clearInterval(autoRepeatInterval.current);
      autoRepeatInterval.current = null;
    }
  }, []);
  
  // Start auto-repeat
  const startAutoRepeat = useCallback((increment: boolean) => {
    if (!autoRepeat || disabled || loading || readOnly) return;
    
    const performStep = () => {
      const newValue = increment ? currentValue + step : currentValue - step;
      handleValueChange(newValue);
    };
    
    autoRepeatTimeout.current = setTimeout(() => {
      autoRepeatInterval.current = setInterval(performStep, autoRepeatIntervalMs);
    }, autoRepeatDelay);
  }, [
    autoRepeat,
    disabled,
    loading,
    readOnly,
    currentValue,
    step,
    handleValueChange,
    autoRepeatDelay,
    autoRepeatIntervalMs,
  ]);
  
  // Handle increment
  const handleIncrement = useCallback(() => {
    if (disabled || loading || readOnly) return;
    
    const newValue = currentValue + step;
    const canIncrement = newValue <= max;
    
    if (canIncrement) {
      handleValueChange(newValue);
      onValueChangeComplete?.(newValue);
    }
  }, [disabled, loading, readOnly, currentValue, step, max, handleValueChange, onValueChangeComplete]);
  
  // Handle decrement
  const handleDecrement = useCallback(() => {
    if (disabled || loading || readOnly) return;
    
    const newValue = currentValue - step;
    const canDecrement = newValue >= min;
    
    if (canDecrement) {
      handleValueChange(newValue);
      onValueChangeComplete?.(newValue);
    }
  }, [disabled, loading, readOnly, currentValue, step, min, handleValueChange, onValueChangeComplete]);
  
  // Animate button
  const animateButton = useCallback((isIncrement: boolean, pressed: boolean) => {
    const scaleAnim = isIncrement ? incrementScale : decrementScale;
    const glowAnim = isIncrement ? incrementGlow : decrementGlow;
    const scaleValue = pressed ? 0.95 : 1;
    const glowValue = pressed ? 1 : 0;
    
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: scaleValue,
        duration: animationDuration,
        useNativeDriver: true,
      }),
      Animated.timing(glowAnim, {
        toValue: glowValue,
        duration: animationDuration,
        useNativeDriver: true,
      }),
    ]).start();
  }, [incrementScale, decrementScale, incrementGlow, decrementGlow, animationDuration]);
  
  // Handle button press in
  const handlePressIn = useCallback((isIncrement: boolean) => {
    if (disabled || loading || readOnly) return;
    
    if (isIncrement) {
      setIsIncrementing(true);
      if (currentValue + step <= max) {
        animateButton(true, true);
        startAutoRepeat(true);
      }
    } else {
      setIsDecrementing(true);
      if (currentValue - step >= min) {
        animateButton(false, true);
        startAutoRepeat(false);
      }
    }
  }, [
    disabled,
    loading,
    readOnly,
    currentValue,
    step,
    max,
    min,
    animateButton,
    startAutoRepeat,
  ]);
  
  // Handle button press out
  const handlePressOut = useCallback((isIncrement: boolean) => {
    if (isIncrement) {
      setIsIncrementing(false);
      animateButton(true, false);
    } else {
      setIsDecrementing(false);
      animateButton(false, false);
    }
    
    clearAutoRepeat();
  }, [animateButton, clearAutoRepeat]);
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      clearAutoRepeat();
    };
  }, [clearAutoRepeat]);
  
  // Check if buttons should be disabled
  const canIncrement = currentValue + step <= max;
  const canDecrement = currentValue - step >= min;
  const incrementDisabled = disabled || loading || readOnly || !canIncrement;
  const decrementDisabled = disabled || loading || readOnly || !canDecrement;
  
  // Render increment button
  const renderIncrementButtonElement = useCallback(() => {
    const buttonStyles = [
      styles.button,
      {
        width: sizeConfig.buttonSize,
        height: sizeConfig.buttonSize,
        borderRadius: sizeConfig.borderRadius,
        backgroundColor: buttonColor,
        opacity: incrementDisabled ? 0.5 : 1,
      },
      buttonStyle,
    ];
    
    const animatedStyle = {
      transform: [{ scale: incrementScale }],
    };
    
    // Use custom render function if provided
    if (renderIncrementButton) {
      return renderIncrementButton({
        onPress: handleIncrement,
        disabled: incrementDisabled,
        size,
        style: StyleSheet.flatten(buttonStyles),
      });
    }
    
    return (
      <TouchableOpacity
        onPress={handleIncrement}
        onPressIn={() => handlePressIn(true)}
        onPressOut={() => handlePressOut(true)}
        disabled={incrementDisabled}
        activeOpacity={0.7}
        style={styles.buttonContainer}
      >
        <Animated.View
          style={[
            buttonStyles,
            animatedStyle,
            glowEffect && {
              shadowOpacity: incrementGlow.interpolate({
                inputRange: [0, 1],
                outputRange: [0.3, 0.8],
              }),
            },
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              {
                fontSize: sizeConfig.iconSize,
                color: buttonTextColor,
              },
            ]}
          >
            +
          </Text>
        </Animated.View>
      </TouchableOpacity>
    );
  }, [
    sizeConfig,
    buttonColor,
    incrementDisabled,
    buttonStyle,
    incrementScale,
    renderIncrementButton,
    handleIncrement,
    handlePressIn,
    handlePressOut,
    size,
    glowEffect,
    incrementGlow,
    buttonTextColor,
  ]);
  
  // Render decrement button
  const renderDecrementButtonElement = useCallback(() => {
    const buttonStyles = [
      styles.button,
      {
        width: sizeConfig.buttonSize,
        height: sizeConfig.buttonSize,
        borderRadius: sizeConfig.borderRadius,
        backgroundColor: buttonColor,
        opacity: decrementDisabled ? 0.5 : 1,
      },
      buttonStyle,
    ];
    
    const animatedStyle = {
      transform: [{ scale: decrementScale }],
    };
    
    // Use custom render function if provided
    if (renderDecrementButton) {
      return renderDecrementButton({
        onPress: handleDecrement,
        disabled: decrementDisabled,
        size,
        style: StyleSheet.flatten(buttonStyles),
      });
    }
    
    return (
      <TouchableOpacity
        onPress={handleDecrement}
        onPressIn={() => handlePressIn(false)}
        onPressOut={() => handlePressOut(false)}
        disabled={decrementDisabled}
        activeOpacity={0.7}
        style={styles.buttonContainer}
      >
        <Animated.View
          style={[
            buttonStyles,
            animatedStyle,
            glowEffect && {
              shadowOpacity: decrementGlow.interpolate({
                inputRange: [0, 1],
                outputRange: [0.3, 0.8],
              }),
            },
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              {
                fontSize: sizeConfig.iconSize,
                color: buttonTextColor,
              },
            ]}
          >
            −
          </Text>
        </Animated.View>
      </TouchableOpacity>
    );
  }, [
    sizeConfig,
    buttonColor,
    decrementDisabled,
    buttonStyle,
    decrementScale,
    renderDecrementButton,
    handleDecrement,
    handlePressIn,
    handlePressOut,
    size,
    glowEffect,
    decrementGlow,
    buttonTextColor,
  ]);
  
  // Render value display
  const renderValueElement = useCallback(() => {
    if (!showValue) return null;
    
    const formattedValue = getFormattedValue(currentValue);
    const valueStyles = [
      styles.valueContainer,
      {
        width: sizeConfig.valueWidth,
        height: sizeConfig.valueHeight,
        backgroundColor: valueBackgroundColor,
        borderRadius: sizeConfig.borderRadius,
      },
      valueStyle,
    ];
    
    const animatedStyle = {
      transform: [{ scale: valueScale }],
    };
    
    // Use custom render function if provided
    if (renderValue) {
      return renderValue({
        value: currentValue,
        formattedValue,
        size,
        style: StyleSheet.flatten(valueStyles),
      });
    }
    
    return (
      <Animated.View style={[valueStyles, animatedStyle]}>
        <Text
          style={[
            styles.valueText,
            {
              fontSize: sizeConfig.fontSize,
              color: valueTextColor,
            },
            labelStyle,
          ]}
        >
          {formattedValue}
        </Text>
      </Animated.View>
    );
  }, [
    showValue,
    currentValue,
    getFormattedValue,
    sizeConfig,
    valueBackgroundColor,
    valueStyle,
    valueScale,
    renderValue,
    size,
    valueTextColor,
    labelStyle,
  ]);
  
  const isHorizontal = orientation === 'horizontal';
  
  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: isHorizontal ? 'row' : 'column',
          alignItems: 'center',
          gap: sizeConfig.spacing,
        },
        containerStyle,
      ]}
      testID={testID}
      accessible={true}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityRole="adjustable"
      accessibilityValue={{
        min,
        max,
        now: currentValue,
      }}
    >
      {/* Decrement button */}
      {renderDecrementButtonElement()}
      
      {/* Value display */}
      {renderValueElement()}
      
      {/* Increment button */}
      {renderIncrementButtonElement()}
    </View>
  );
};

/**
 * Stepper component styles
 */
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  
  buttonContainer: {
    position: 'relative',
  },
  
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2E86DE',
    shadowColor: '#2E86DE',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  
  buttonText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  
  valueContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(22, 33, 62, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  
  valueText: {
    fontWeight: '600',
    textAlign: 'center',
    color: '#FFFFFF',
  },
});

export default Stepper;
