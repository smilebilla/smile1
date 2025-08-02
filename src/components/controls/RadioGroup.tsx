import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  LayoutChangeEvent,
  Animated,
} from 'react-native';
import { RadioButton, RadioButtonProps, RadioButtonSize } from './RadioButton';

/**
 * RadioGroup layout direction
 */
export type RadioGroupDirection = 'horizontal' | 'vertical';

/**
 * RadioGroup value type
 */
export type RadioGroupValue = string | number;

/**
 * RadioGroup option configuration
 */
export interface RadioGroupOption {
  /** Option value */
  value: RadioGroupValue;
  /** Option label */
  label?: string;
  /** Whether this option is disabled */
  disabled?: boolean;
  /** Custom styling for this option */
  style?: ViewStyle;
  /** Custom label styling for this option */
  labelStyle?: TextStyle;
  /** Custom radio button props for this option */
  radioProps?: Partial<RadioButtonProps>;
}

/**
 * RadioGroup component props
 */
export interface RadioGroupProps {
  /** Array of radio button options */
  options: RadioGroupOption[];
  /** Selected value (controlled) */
  value?: RadioGroupValue;
  /** Default selected value (uncontrolled) */
  defaultValue?: RadioGroupValue;
  /** Layout direction */
  direction?: RadioGroupDirection;
  /** Size variant for all radio buttons */
  size?: RadioButtonSize;
  /** Whether the entire group is disabled */
  disabled?: boolean;
  /** Whether the entire group is loading */
  loading?: boolean;
  /** Label position for all radio buttons */
  labelPosition?: 'left' | 'right';
  /** Selection change handler */
  onValueChange?: (value: RadioGroupValue) => void;
  /** Custom group style */
  groupStyle?: ViewStyle;
  /** Custom option container style */
  optionStyle?: ViewStyle;
  /** Custom label style for all options */
  labelStyle?: TextStyle;
  /** Custom radio button style for all options */
  radioStyle?: ViewStyle;
  /** Space between radio buttons */
  spacing?: number;
  /** Enable glow effect for all radio buttons */
  glowEffect?: boolean;
  /** Border color when unselected */
  borderColorUnselected?: string;
  /** Border color when selected */
  borderColorSelected?: string;
  /** Dot color when selected */
  dotColor?: string;
  /** Animation duration in milliseconds */
  animationDuration?: number;
  /** Group title */
  title?: string;
  /** Group title style */
  titleStyle?: TextStyle;
  /** Group description */
  description?: string;
  /** Group description style */
  descriptionStyle?: TextStyle;
  /** Error message */
  error?: string;
  /** Error message style */
  errorStyle?: TextStyle;
  /** Test ID for testing */
  testID?: string;
  /** Accessibility label */
  accessibilityLabel?: string;
  /** Accessibility hint */
  accessibilityHint?: string;
  /** Enable haptic feedback */
  hapticFeedback?: boolean;
  /** Custom render function for radio button */
  renderRadio?: RadioButtonProps['renderRadio'];
  /** Custom render function for dot */
  renderDot?: RadioButtonProps['renderDot'];
  /** Custom render function for label */
  renderLabel?: RadioButtonProps['renderLabel'];
  /** Custom render function for option container */
  renderOption?: (props: {
    option: RadioGroupOption;
    index: number;
    isSelected: boolean;
    radioButton: React.ReactNode;
  }) => React.ReactNode;
}

/**
 * Default spacing values for different directions
 */
const defaultSpacing = {
  horizontal: 24,
  vertical: 16,
};

/**
 * RadioGroup component
 * 
 * A group of radio buttons with single selection capability.
 * Follows Corp Astro design system with glass morphism effects.
 * 
 * @param props - RadioGroup component props
 * @returns JSX.Element
 */
export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  value,
  defaultValue,
  direction = 'vertical',
  size = 'medium',
  disabled = false,
  loading = false,
  labelPosition = 'right',
  onValueChange,
  groupStyle,
  optionStyle,
  labelStyle,
  radioStyle,
  spacing = defaultSpacing[direction],
  glowEffect = true,
  borderColorUnselected = 'rgba(255, 255, 255, 0.3)',
  borderColorSelected = '#2E86DE',
  dotColor = '#2E86DE',
  animationDuration = 200,
  title,
  titleStyle,
  description,
  descriptionStyle,
  error,
  errorStyle,
  testID,
  accessibilityLabel,
  accessibilityHint,
  hapticFeedback = true,
  renderRadio,
  renderDot,
  renderLabel,
  renderOption,
}) => {
  // State management
  const [internalValue, setInternalValue] = useState<RadioGroupValue | undefined>(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  
  // Animation values
  const glowOpacity = useRef(new Animated.Value(0)).current;
  const scaleAnimation = useRef(new Animated.Value(1)).current;
  
  // Handle value change
  const handleValueChange = useCallback((newValue: RadioGroupValue) => {
    if (disabled || loading) return;
    
    // Haptic feedback
    if (hapticFeedback) {
      // Add haptic feedback here if needed
    }
    
    // Update internal state if uncontrolled
    if (!isControlled) {
      setInternalValue(newValue);
    }
    
    // Call external handler
    onValueChange?.(newValue);
    
    // Animate selection feedback
    Animated.sequence([
      Animated.timing(scaleAnimation, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnimation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, [disabled, loading, hapticFeedback, isControlled, onValueChange, scaleAnimation]);
  
  // Create radio button for each option
  const renderRadioButton = useCallback((option: RadioGroupOption, index: number) => {
    const isSelected = currentValue === option.value;
    const isOptionDisabled = disabled || option.disabled || loading;
    
    const radioButton = (
      <RadioButton
        key={`${option.value}-${index}`}
        value={option.value}
        selectedValue={currentValue}
        size={size}
        disabled={isOptionDisabled}
        loading={loading}
        label={option.label}
        labelPosition={labelPosition}
        onValueChange={handleValueChange}
        radioStyle={StyleSheet.flatten([radioStyle, option.style])}
        labelStyle={StyleSheet.flatten([labelStyle, option.labelStyle])}
        containerStyle={StyleSheet.flatten([
          styles.optionContainer,
          direction === 'horizontal' ? styles.horizontalOption : styles.verticalOption,
          { marginBottom: direction === 'vertical' ? spacing : 0 },
          { marginRight: direction === 'horizontal' ? spacing : 0 },
          optionStyle,
        ])}
        animationDuration={animationDuration}
        glowEffect={glowEffect}
        borderColorUnselected={borderColorUnselected}
        borderColorSelected={borderColorSelected}
        dotColor={dotColor}
        renderRadio={renderRadio}
        renderDot={renderDot}
        renderLabel={renderLabel}
        testID={testID ? `${testID}-option-${index}` : undefined}
        {...option.radioProps}
      />
    );
    
    // Use custom render function if provided
    if (renderOption) {
      return renderOption({
        option,
        index,
        isSelected,
        radioButton,
      });
    }
    
    return radioButton;
  }, [
    currentValue,
    disabled,
    loading,
    size,
    labelPosition,
    handleValueChange,
    radioStyle,
    labelStyle,
    direction,
    spacing,
    optionStyle,
    animationDuration,
    glowEffect,
    borderColorUnselected,
    borderColorSelected,
    dotColor,
    renderRadio,
    renderDot,
    renderLabel,
    renderOption,
    testID,
  ]);
  
  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ scale: scaleAnimation }] },
        groupStyle,
      ]}
      testID={testID}
      accessible={true}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityRole="radiogroup"
    >
      {/* Title */}
      {title && (
        <Text style={[styles.title, titleStyle]}>
          {title}
        </Text>
      )}
      
      {/* Description */}
      {description && (
        <Text style={[styles.description, descriptionStyle]}>
          {description}
        </Text>
      )}
      
      {/* Radio buttons */}
      <View
        style={[
          styles.optionsContainer,
          direction === 'horizontal' ? styles.horizontalContainer : styles.verticalContainer,
        ]}
      >
        {options.map((option, index) => renderRadioButton(option, index))}
      </View>
      
      {/* Error message */}
      {error && (
        <Text style={[styles.error, errorStyle]}>
          {error}
        </Text>
      )}
    </Animated.View>
  );
};

/**
 * RadioGroup component styles
 */
const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 8,
  },
  
  description: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 16,
    lineHeight: 20,
  },
  
  optionsContainer: {
    width: '100%',
  },
  
  horizontalContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  
  verticalContainer: {
    flexDirection: 'column',
  },
  
  optionContainer: {
    flexShrink: 0,
  },
  
  horizontalOption: {
    marginBottom: 0,
  },
  
  verticalOption: {
    width: '100%',
  },
  
  error: {
    fontSize: 12,
    color: '#FF6B6B',
    marginTop: 8,
    fontWeight: '500',
  },
});

export default RadioGroup;
