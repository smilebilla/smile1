/**
 * Corp Astro UI Library - SliderInput Primitive
 * 
 * Range slider input component with custom styling, value formatting,
 * accessibility features, and comprehensive slider functionality.
 * 
 * @module SliderInput
 * @version 1.0.0
 * @since 2024
 */

import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  AccessibilityProps,
  Animated,
  LayoutChangeEvent,
} from 'react-native';

/**
 * SliderInput size variants
 */
export type SliderInputSize = 'small' | 'medium' | 'large';

/**
 * SliderInput variant styles
 */
export type SliderInputVariant = 'default' | 'gradient' | 'stepped';

/**
 * SliderInput validation state
 */
export type SliderInputValidationState = 'default' | 'error' | 'success' | 'warning';

/**
 * Slider step configuration
 */
export interface SliderStep {
  /** Step value */
  value: number;
  /** Step label */
  label?: string;
  /** Step color */
  color?: string;
  /** Whether the step is disabled */
  disabled?: boolean;
}

/**
 * Slider value formatter
 */
export type SliderValueFormatter = (value: number) => string;

/**
 * SliderInput component props
 */
export interface SliderInputProps extends AccessibilityProps {
  /** Current value */
  value?: number;
  /** Default value */
  defaultValue?: number;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step size */
  step?: number;
  /** Size variant */
  size?: SliderInputSize;
  /** Visual variant */
  variant?: SliderInputVariant;
  /** Validation state */
  validationState?: SliderInputValidationState;
  /** Label text */
  label?: string;
  /** Helper text */
  helperText?: string;
  /** Error message */
  errorMessage?: string;
  /** Success message */
  successMessage?: string;
  /** Warning message */
  warningMessage?: string;
  /** Whether the slider is disabled */
  disabled?: boolean;
  /** Whether to show the current value */
  showValue?: boolean;
  /** Whether to show step marks */
  showSteps?: boolean;
  /** Custom steps configuration */
  steps?: SliderStep[];
  /** Value formatter function */
  valueFormatter?: SliderValueFormatter;
  /** Unit text */
  unit?: string;
  /** Track color */
  trackColor?: string;
  /** Active track color */
  activeTrackColor?: string;
  /** Thumb color */
  thumbColor?: string;
  /** Whether to allow decimal values */
  allowDecimal?: boolean;
  /** Whether to snap to steps */
  snapToStep?: boolean;
  /** Custom styles */
  style?: ViewStyle;
  /** Custom container styles */
  containerStyle?: ViewStyle;
  /** Custom track styles */
  trackStyle?: ViewStyle;
  /** Custom thumb styles */
  thumbStyle?: ViewStyle;
  /** Custom label styles */
  labelStyle?: TextStyle;
  /** Custom value styles */
  valueStyle?: TextStyle;
  /** Custom helper text styles */
  helperTextStyle?: TextStyle;
  /** Test ID for testing */
  testID?: string;
  /** Callback when value changes */
  onValueChange?: (value: number) => void;
  /** Callback when gesture starts */
  onGestureStart?: (value: number) => void;
  /** Callback when gesture ends */
  onGestureEnd?: (value: number) => void;
}

/**
 * SliderInput Component
 * 
 * A customizable range slider input component with support for steps, formatting,
 * and comprehensive accessibility features.
 * 
 * @example
 * ```tsx
 * <SliderInput
 *   value={volume}
 *   onValueChange={setVolume}
 *   min={0}
 *   max={100}
 *   step={1}
 *   label="Volume"
 *   unit="%"
 *   showValue={true}
 *   showSteps={true}
 * />
 * ```
 */
export const SliderInput: React.FC<SliderInputProps> = ({
  value: controlledValue,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  size = 'medium',
  variant = 'default',
  validationState = 'default',
  label,
  helperText,
  errorMessage,
  successMessage,
  warningMessage,
  disabled = false,
  showValue = true,
  showSteps = false,
  steps,
  valueFormatter,
  unit,
  trackColor,
  activeTrackColor,
  thumbColor,
  allowDecimal = false,
  snapToStep = true,
  style,
  containerStyle,
  trackStyle,
  thumbStyle,
  labelStyle,
  valueStyle,
  helperTextStyle,
  testID,
  onValueChange,
  onGestureStart,
  onGestureEnd,
  accessibilityLabel,
  accessibilityHint,
  ...accessibilityProps
}) => {
  // State management
  const [internalValue, setInternalValue] = useState(controlledValue ?? defaultValue);
  const [trackWidth, setTrackWidth] = useState(0);
  const [isPressed, setIsPressed] = useState(false);

  // Refs
  const thumbPosition = useRef(new Animated.Value(0)).current;
  const scaleAnimation = useRef(new Animated.Value(1)).current;

  // Get current value
  const currentValue = controlledValue ?? internalValue;

  // Clamp value to bounds
  const clampValue = useCallback((val: number): number => {
    return Math.max(min, Math.min(max, val));
  }, [min, max]);

  // Snap to step if enabled
  const snapValue = useCallback((val: number): number => {
    if (!snapToStep) return val;
    
    const snappedValue = Math.round(val / step) * step;
    return allowDecimal ? snappedValue : Math.round(snappedValue);
  }, [step, snapToStep, allowDecimal]);

  // Process value
  const processValue = useCallback((val: number): number => {
    return snapValue(clampValue(val));
  }, [clampValue, snapValue]);

  // Convert value to position
  const valueToPosition = useCallback((val: number): number => {
    const percentage = (val - min) / (max - min);
    return percentage * trackWidth;
  }, [min, max, trackWidth]);

  // Update thumb position
  const updateThumbPosition = useCallback((val: number, animated: boolean = true) => {
    const position = valueToPosition(val);
    
    if (animated) {
      Animated.spring(thumbPosition, {
        toValue: position,
        useNativeDriver: false,
        tension: 200,
        friction: 10,
      }).start();
    } else {
      thumbPosition.setValue(position);
    }
  }, [valueToPosition, thumbPosition]);

  // Handle value change
  const handleValueChange = useCallback((newValue: number) => {
    const processedValue = processValue(newValue);
    
    if (processedValue !== currentValue) {
      if (controlledValue === undefined) {
        setInternalValue(processedValue);
      }
      onValueChange?.(processedValue);
    }
    
    updateThumbPosition(processedValue);
  }, [processValue, currentValue, controlledValue, onValueChange, updateThumbPosition]);

  // Format value display
  const formatValue = useCallback((val: number): string => {
    if (valueFormatter) {
      return valueFormatter(val);
    }
    
    const formattedValue = allowDecimal ? val.toFixed(1) : Math.round(val).toString();
    return unit ? `${formattedValue}${unit}` : formattedValue;
  }, [valueFormatter, allowDecimal, unit]);

  // Increment/decrement value
  const incrementValue = useCallback(() => {
    if (disabled) return;
    const newValue = Math.min(max, currentValue + step);
    handleValueChange(newValue);
  }, [disabled, max, currentValue, step, handleValueChange]);

  const decrementValue = useCallback(() => {
    if (disabled) return;
    const newValue = Math.max(min, currentValue - step);
    handleValueChange(newValue);
  }, [disabled, min, currentValue, step, handleValueChange]);

  // Handle thumb press
  const handleThumbPress = useCallback(() => {
    if (disabled) return;
    
    setIsPressed(true);
    onGestureStart?.(currentValue);
    
    Animated.spring(scaleAnimation, {
      toValue: 1.2,
      useNativeDriver: false,
      tension: 200,
      friction: 10,
    }).start();
  }, [disabled, currentValue, onGestureStart, scaleAnimation]);

  const handleThumbRelease = useCallback(() => {
    if (disabled) return;
    
    setIsPressed(false);
    onGestureEnd?.(currentValue);
    
    Animated.spring(scaleAnimation, {
      toValue: 1,
      useNativeDriver: false,
      tension: 200,
      friction: 10,
    }).start();
  }, [disabled, currentValue, onGestureEnd, scaleAnimation]);

  // Handle track press
  const handleTrackPress = useCallback((event: any) => {
    if (disabled) return;
    
    const { locationX } = event.nativeEvent;
    const percentage = locationX / trackWidth;
    const newValue = min + percentage * (max - min);
    
    handleValueChange(newValue);
  }, [disabled, trackWidth, min, max, handleValueChange]);

  // Track layout handler
  const handleTrackLayout = useCallback((event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setTrackWidth(width);
  }, []);

  // Update thumb position when value changes
  useEffect(() => {
    updateThumbPosition(currentValue, false);
  }, [currentValue, updateThumbPosition]);

  // Generate step marks
  const generateStepMarks = useCallback(() => {
    if (!showSteps && !steps) return [];
    
    const marks: React.ReactElement[] = [];
    const stepMarks = steps || [];
    
    // Generate default steps if none provided
    if (!steps && showSteps) {
      for (let i = min; i <= max; i += step) {
        stepMarks.push({ value: i });
      }
    }
    
    stepMarks.forEach((stepMark, index) => {
      const position = valueToPosition(stepMark.value);
      const isActive = stepMark.value <= currentValue;
      
      marks.push(
        <View
          key={index}
          style={[
            styles.stepMark,
            { left: position - 2 },
            {
              backgroundColor: isActive ? '#2E86DE' : 'rgba(255,255,255,0.3)',
            },
          ]}
        />
      );
    });
    
    return marks;
  }, [showSteps, steps, valueToPosition, currentValue, min, max, step]);

  // Get styles based on props
  const containerSizeStyle = size === 'small' ? styles.containerSmall : 
                            size === 'large' ? styles.containerLarge : 
                            styles.containerMedium;

  const trackSizeStyle = size === 'small' ? styles.trackSmall : 
                        size === 'large' ? styles.trackLarge : 
                        styles.trackMedium;

  const thumbSizeStyle = size === 'small' ? styles.thumbSmall : 
                        size === 'large' ? styles.thumbLarge : 
                        styles.thumbMedium;

  const labelSizeStyle = size === 'small' ? styles.labelSmall : 
                        size === 'large' ? styles.labelLarge : 
                        styles.labelMedium;

  const valueSizeStyle = size === 'small' ? styles.valueSmall : 
                        size === 'large' ? styles.valueLarge : 
                        styles.valueMedium;

  // Helper text based on validation state
  const getHelperText = () => {
    switch (validationState) {
      case 'error':
        return errorMessage || 'Please adjust the value';
      case 'success':
        return successMessage || 'Value is valid';
      case 'warning':
        return warningMessage || 'Please check the value';
      default:
        return helperText;
    }
  };

  const helperTextValidationStyle = validationState === 'error' ? styles.helperTextError : 
                                   validationState === 'success' ? styles.helperTextSuccess : 
                                   validationState === 'warning' ? styles.helperTextWarning : 
                                   styles.helperTextDefault;

  return (
    <View style={[styles.container, containerSizeStyle, containerStyle]}>
      {/* Header */}
      <View style={styles.header}>
        {/* Label */}
        {label && (
          <Text style={[styles.label, labelSizeStyle, labelStyle]}>
            {label}
          </Text>
        )}
        
        {/* Value Display */}
        {showValue && (
          <Text style={[styles.value, valueSizeStyle, valueStyle]}>
            {formatValue(currentValue)}
          </Text>
        )}
      </View>
      
      {/* Slider Controls */}
      <View style={styles.sliderContainer}>
        {/* Decrement Button */}
        <TouchableOpacity
          style={[styles.controlButton, disabled && styles.controlButtonDisabled]}
          onPress={decrementValue}
          disabled={disabled || currentValue <= min}
        >
          <Text style={styles.controlButtonText}>-</Text>
        </TouchableOpacity>

        {/* Track Container */}
        <View style={styles.trackContainer}>
          <TouchableOpacity
            style={[
              styles.track,
              trackSizeStyle,
              { backgroundColor: trackColor || 'rgba(255,255,255,0.1)' },
              disabled && styles.trackDisabled,
              trackStyle,
              style,
            ]}
            onLayout={handleTrackLayout}
            onPress={handleTrackPress}
            disabled={disabled}
            activeOpacity={0.8}
          >
            {/* Active Track */}
            <Animated.View
              style={[
                styles.activeTrack,
                {
                  width: thumbPosition.interpolate({
                    inputRange: [0, trackWidth],
                    outputRange: ['0%', '100%'],
                    extrapolate: 'clamp',
                  }),
                  backgroundColor: activeTrackColor || '#2E86DE',
                },
              ]}
            />
            
            {/* Step Marks */}
            {generateStepMarks()}
            
            {/* Thumb */}
            <TouchableOpacity
              style={[
                styles.thumb,
                thumbSizeStyle,
                {
                  left: thumbPosition.interpolate({
                    inputRange: [0, trackWidth],
                    outputRange: [0, trackWidth],
                    extrapolate: 'clamp',
                  }),
                  backgroundColor: thumbColor || '#2E86DE',
                  transform: [{ scale: scaleAnimation }],
                },
                disabled && styles.thumbDisabled,
                thumbStyle,
              ]}
              onPressIn={handleThumbPress}
              onPressOut={handleThumbRelease}
              disabled={disabled}
              activeOpacity={0.8}
              accessible={true}
              accessibilityLabel={accessibilityLabel || `${label || 'Slider'} ${formatValue(currentValue)}`}
              accessibilityHint={accessibilityHint || 'Tap to adjust value'}
              accessibilityRole="adjustable"
              testID={testID}
              {...accessibilityProps}
            />
          </TouchableOpacity>
        </View>

        {/* Increment Button */}
        <TouchableOpacity
          style={[styles.controlButton, disabled && styles.controlButtonDisabled]}
          onPress={incrementValue}
          disabled={disabled || currentValue >= max}
        >
          <Text style={styles.controlButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      
      {/* Helper Text */}
      {getHelperText() && (
        <Text style={[
          styles.helperText,
          helperTextValidationStyle,
          helperTextStyle
        ]}>
          {getHelperText()}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  containerSmall: {
    marginBottom: 12,
  },
  containerMedium: {
    marginBottom: 16,
  },
  containerLarge: {
    marginBottom: 20,
  },
  
  // Header styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  labelSmall: {
    fontSize: 12,
  },
  labelMedium: {
    fontSize: 14,
  },
  labelLarge: {
    fontSize: 16,
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2E86DE',
  },
  valueSmall: {
    fontSize: 12,
  },
  valueMedium: {
    fontSize: 14,
  },
  valueLarge: {
    fontSize: 16,
  },
  
  // Slider styles
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 16,
  },
  controlButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(46,134,222,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(46,134,222,0.5)',
  },
  controlButtonDisabled: {
    opacity: 0.3,
  },
  controlButtonText: {
    fontSize: 18,
    color: '#2E86DE',
    fontWeight: 'bold',
  },
  trackContainer: {
    flex: 1,
    position: 'relative',
  },
  track: {
    borderRadius: 8,
    position: 'relative',
    overflow: 'hidden',
  },
  trackSmall: {
    height: 4,
  },
  trackMedium: {
    height: 6,
  },
  trackLarge: {
    height: 8,
  },
  trackDisabled: {
    opacity: 0.5,
  },
  
  // Active track
  activeTrack: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    borderRadius: 8,
    backgroundColor: '#2E86DE',
  },
  
  // Thumb styles
  thumb: {
    position: 'absolute',
    borderRadius: 50,
    backgroundColor: '#2E86DE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    top: -6,
    marginLeft: -12,
  },
  thumbSmall: {
    width: 16,
    height: 16,
    marginLeft: -8,
  },
  thumbMedium: {
    width: 24,
    height: 24,
    marginLeft: -12,
  },
  thumbLarge: {
    width: 32,
    height: 32,
    marginLeft: -16,
  },
  thumbDisabled: {
    opacity: 0.5,
  },
  
  // Step marks
  stepMark: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.3)',
    top: 1,
  },
  
  // Helper text styles
  helperText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 6,
  },
  helperTextDefault: {
    color: 'rgba(255,255,255,0.6)',
  },
  helperTextError: {
    color: '#FF6B6B',
  },
  helperTextSuccess: {
    color: '#2EDD75',
  },
  helperTextWarning: {
    color: '#FF9F43',
  },
});

export default SliderInput;
