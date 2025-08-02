import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Text,
  Platform,
  ViewStyle,
  TextStyle,
} from 'react-native';

/**
 * RadioButton component size variants
 */
export type RadioButtonSize = 'small' | 'medium' | 'large';

/**
 * RadioButton component state
 */
export type RadioButtonState = 'selected' | 'unselected';

/**
 * RadioButton component props
 */
export interface RadioButtonProps {
  /** RadioButton value */
  value: string | number;
  /** Selected value (controlled) */
  selectedValue?: string | number;
  /** Default selected value (uncontrolled) */
  defaultValue?: string | number;
  /** Size variant */
  size?: RadioButtonSize;
  /** Whether the radio button is disabled */
  disabled?: boolean;
  /** Whether the radio button is loading */
  loading?: boolean;
  /** Label text */
  label?: string;
  /** Label position */
  labelPosition?: 'left' | 'right';
  /** Selection change handler */
  onValueChange?: (value: string | number) => void;
  /** Press handler */
  onPress?: () => void;
  /** Custom radio button style */
  radioStyle?: ViewStyle;
  /** Custom label style */
  labelStyle?: TextStyle;
  /** Custom container style */
  containerStyle?: ViewStyle;
  /** Test ID for testing */
  testID?: string;
  /** Accessibility label */
  accessibilityLabel?: string;
  /** Accessibility hint */
  accessibilityHint?: string;
  /** Animation duration in milliseconds */
  animationDuration?: number;
  /** Enable glow effect */
  glowEffect?: boolean;
  /** Border color when unselected */
  borderColorUnselected?: string;
  /** Border color when selected */
  borderColorSelected?: string;
  /** Dot color when selected */
  dotColor?: string;
  /** Custom render function for radio button */
  renderRadio?: (props: { 
    selected: boolean; 
    size: RadioButtonSize; 
    style: ViewStyle; 
    animatedStyle: {
      borderColor: any;
      backgroundColor: any;
    };
  }) => React.ReactNode;
  /** Custom render function for dot */
  renderDot?: (props: { 
    selected: boolean; 
    size: RadioButtonSize; 
    style: ViewStyle; 
    animatedStyle: {
      scale: any;
      opacity: any;
    };
  }) => React.ReactNode;
  /** Custom render function for label */
  renderLabel?: (props: { 
    label: string; 
    selected: boolean; 
    style: TextStyle; 
  }) => React.ReactNode;
}

/**
 * Size configuration for different radio button sizes
 */
const sizeConfigs = {
  small: {
    size: 18,
    dotSize: 8,
    borderRadius: 9,
    borderWidth: 1.5,
    fontSize: 14,
    spacing: 8,
  },
  medium: {
    size: 24,
    dotSize: 10,
    borderRadius: 12,
    borderWidth: 2,
    fontSize: 16,
    spacing: 12,
  },
  large: {
    size: 28,
    dotSize: 12,
    borderRadius: 14,
    borderWidth: 2.5,
    fontSize: 18,
    spacing: 16,
  },
};

/**
 * RadioButton component
 * 
 * A custom radio button component following Corp Astro design system.
 * Features glass morphism effects, smooth animations, and cosmic glow.
 * 
 * @param props - RadioButton component props
 * @returns JSX.Element
 */
export const RadioButton: React.FC<RadioButtonProps> = ({
  value,
  selectedValue,
  defaultValue,
  size = 'medium',
  disabled = false,
  loading = false,
  label,
  labelPosition = 'right',
  onValueChange,
  onPress,
  radioStyle,
  labelStyle,
  containerStyle,
  testID,
  accessibilityLabel,
  accessibilityHint,
  animationDuration = 200,
  glowEffect = true,
  borderColorUnselected = 'rgba(255, 255, 255, 0.3)',
  borderColorSelected = '#2E86DE',
  dotColor = '#2E86DE',
  renderRadio,
  renderDot,
  renderLabel,
}) => {
  // State management
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = selectedValue !== undefined;
  const currentSelectedValue = isControlled ? selectedValue : internalValue;
  const isSelected = currentSelectedValue === value;
  
  // Animation values
  const dotScale = useRef(new Animated.Value(isSelected ? 1 : 0)).current;
  const dotOpacity = useRef(new Animated.Value(isSelected ? 1 : 0)).current;
  const borderColor = useRef(new Animated.Value(isSelected ? 1 : 0)).current;
  const backgroundColor = useRef(new Animated.Value(isSelected ? 1 : 0)).current;
  const glowOpacity = useRef(new Animated.Value(0)).current;
  const scaleAnimation = useRef(new Animated.Value(1)).current;
  
  // Size configuration
  const sizeConfig = sizeConfigs[size];

  // Update animations when selection changes
  useEffect(() => {
    const toValue = isSelected ? 1 : 0;
    
    Animated.parallel([
      Animated.timing(dotScale, {
        toValue,
        duration: animationDuration,
        useNativeDriver: true,
      }),
      Animated.timing(dotOpacity, {
        toValue,
        duration: animationDuration,
        useNativeDriver: true,
      }),
      Animated.timing(borderColor, {
        toValue,
        duration: animationDuration,
        useNativeDriver: false,
      }),
      Animated.timing(backgroundColor, {
        toValue: isSelected ? 0.1 : 0,
        duration: animationDuration,
        useNativeDriver: false,
      }),
    ]).start();
  }, [isSelected, animationDuration, dotScale, dotOpacity, borderColor, backgroundColor]);

  // Handle radio button press
  const handlePress = useCallback(() => {
    if (disabled || loading) return;

    if (!isControlled) {
      setInternalValue(value);
    }
    
    onValueChange?.(value);
    onPress?.();

    // Haptic feedback
    if (Platform.OS === 'ios') {
      // iOS haptic feedback would go here
    }

    // Glow effect animation
    if (glowEffect) {
      Animated.sequence([
        Animated.timing(glowOpacity, {
          toValue: 1,
          duration: 150,
          useNativeDriver: false,
        }),
        Animated.timing(glowOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    }

    // Scale animation
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
  }, [
    disabled,
    loading,
    value,
    isControlled,
    onValueChange,
    onPress,
    glowEffect,
    glowOpacity,
    scaleAnimation,
  ]);

  // Animated styles
  const animatedBorderColor = borderColor.interpolate({
    inputRange: [0, 1],
    outputRange: [borderColorUnselected, borderColorSelected],
  });

  const animatedBackgroundColor = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(46, 134, 222, 0)', 'rgba(46, 134, 222, 0.1)'],
  });

  const glowColor = borderColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(255, 255, 255, 0.2)', 'rgba(46, 134, 222, 0.4)'],
  });

  // Styles
  const containerStyles: ViewStyle = StyleSheet.flatten([
    styles.container,
    labelPosition === 'left' && styles.containerReverse,
    containerStyle,
  ]);

  const radioStyles = StyleSheet.flatten([
    styles.radio,
    {
      width: sizeConfig.size,
      height: sizeConfig.size,
      borderRadius: sizeConfig.borderRadius,
      borderWidth: sizeConfig.borderWidth,
      transform: [{ scale: scaleAnimation }],
    },
    disabled && styles.radio_disabled,
    radioStyle,
  ]);

  const dotStyles = StyleSheet.flatten([
    styles.dot,
    {
      width: sizeConfig.dotSize,
      height: sizeConfig.dotSize,
      borderRadius: sizeConfig.dotSize / 2,
      backgroundColor: dotColor,
      transform: [{ scale: dotScale }],
      opacity: dotOpacity,
    },
  ]);

  const labelStyles: TextStyle = StyleSheet.flatten([
    styles.label,
    {
      fontSize: sizeConfig.fontSize,
      marginLeft: labelPosition === 'right' ? sizeConfig.spacing : 0,
      marginRight: labelPosition === 'left' ? sizeConfig.spacing : 0,
    },
    disabled && styles.label_disabled,
    labelStyle,
  ]);

  // Render radio button
  const renderRadioComponent = () => {
    if (renderRadio) {
      return renderRadio({
        selected: isSelected,
        size,
        style: radioStyles,
        animatedStyle: {
          borderColor: animatedBorderColor,
          backgroundColor: animatedBackgroundColor,
        },
      });
    }

    return (
      <Animated.View 
        style={[
          radioStyles,
          {
            borderColor: animatedBorderColor,
            backgroundColor: animatedBackgroundColor,
          },
          glowEffect && {
            shadowColor: glowColor,
            shadowOffset: { width: 0, height: 0 },
            shadowRadius: 8,
            shadowOpacity: glowOpacity,
            elevation: 5,
          },
        ]}
      >
        {renderDotComponent()}
      </Animated.View>
    );
  };

  // Render dot
  const renderDotComponent = () => {
    if (renderDot) {
      return renderDot({
        selected: isSelected,
        size,
        style: dotStyles,
        animatedStyle: {
          scale: dotScale,
          opacity: dotOpacity,
        },
      });
    }

    return <Animated.View style={dotStyles} />;
  };

  // Render label
  const renderLabelComponent = () => {
    if (!label) return null;

    if (renderLabel) {
      return renderLabel({
        label,
        selected: isSelected,
        style: labelStyles,
      });
    }

    return (
      <Text style={labelStyles}>
        {label}
      </Text>
    );
  };

  return (
    <TouchableOpacity
      style={containerStyles}
      onPress={handlePress}
      disabled={disabled || loading}
      testID={testID}
      accessibilityRole="radio"
      accessibilityState={{ 
        selected: isSelected,
        disabled: disabled || loading,
      }}
      accessibilityLabel={accessibilityLabel || label}
      accessibilityHint={accessibilityHint}
      activeOpacity={0.8}
    >
      {labelPosition === 'left' && renderLabelComponent()}
      {renderRadioComponent()}
      {labelPosition === 'right' && renderLabelComponent()}
    </TouchableOpacity>
  );
};

/**
 * Styles
 */
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  containerReverse: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
  },
  radio: {
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        shadowOpacity: 1,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  radio_disabled: {
    opacity: 0.5,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  dot: {
    position: 'absolute',
  },
  label: {
    color: '#FFFFFF',
    fontFamily: 'Inter',
    lineHeight: 1.4,
  },
  label_disabled: {
    opacity: 0.5,
    color: 'rgba(255, 255, 255, 0.5)',
  },
});

export default RadioButton;
