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
 * Checkbox component size variants
 */
export type CheckboxSize = 'small' | 'medium' | 'large';

/**
 * Checkbox component state
 */
export type CheckboxState = 'unchecked' | 'checked' | 'indeterminate';

/**
 * Checkbox component props
 */
export interface CheckboxProps {
  /** Checkbox checked state (controlled) */
  checked?: boolean;
  /** Default checkbox state (uncontrolled) */
  defaultChecked?: boolean;
  /** Indeterminate state for partial selections */
  indeterminate?: boolean;
  /** Size variant */
  size?: CheckboxSize;
  /** Whether the checkbox is disabled */
  disabled?: boolean;
  /** Whether the checkbox is loading */
  loading?: boolean;
  /** Checkbox change handler */
  onCheckedChange?: (checked: boolean) => void;
  /** Checkbox press handler */
  onPress?: () => void;
  /** Label text */
  label?: string;
  /** Label position */
  labelPosition?: 'left' | 'right';
  /** Custom checkbox style */
  checkboxStyle?: ViewStyle;
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
  /** Checkbox color when unchecked */
  uncheckedColor?: string;
  /** Checkbox color when checked */
  checkedColor?: string;
  /** Checkbox border color */
  borderColor?: string;
  /** Checkmark color */
  checkmarkColor?: string;
  /** Custom checkmark icon */
  checkmarkIcon?: React.ReactNode;
  /** Custom render function for checkbox */
  renderCheckbox?: (props: { 
    checked: boolean; 
    indeterminate: boolean;
    size: CheckboxSize; 
    style: ViewStyle; 
    animatedStyle: {
      backgroundColor: any;
      borderColor: any;
    };
  }) => React.ReactNode;
}

/**
 * Size configuration for different checkbox sizes
 */
const sizeConfigs = {
  small: {
    size: 20,
    borderRadius: 6,
    checkmarkSize: 12,
    labelSize: 14,
    labelSpacing: 8,
  },
  medium: {
    size: 24,
    borderRadius: 8,
    checkmarkSize: 16,
    labelSize: 16,
    labelSpacing: 12,
  },
  large: {
    size: 28,
    borderRadius: 10,
    checkmarkSize: 20,
    labelSize: 18,
    labelSpacing: 16,
  },
};

/**
 * Checkbox component
 * 
 * A custom checkbox component following Corp Astro design system.
 * Features glass morphism effects, smooth animations, and cosmic glow.
 * 
 * @param props - Checkbox component props
 * @returns JSX.Element
 */
export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  defaultChecked = false,
  indeterminate = false,
  size = 'medium',
  disabled = false,
  loading = false,
  onCheckedChange,
  onPress,
  label,
  labelPosition = 'right',
  checkboxStyle,
  labelStyle,
  containerStyle,
  testID,
  accessibilityLabel,
  accessibilityHint,
  animationDuration = 200,
  glowEffect = true,
  uncheckedColor = 'rgba(255, 255, 255, 0.1)',
  checkedColor = '#2E86DE',
  borderColor = 'rgba(255, 255, 255, 0.2)',
  checkmarkColor = '#FFFFFF',
  checkmarkIcon,
  renderCheckbox,
}) => {
  // State management
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isControlled = checked !== undefined;
  const checkboxValue = isControlled ? checked : internalChecked;
  
  // Animation values
  const scaleAnimation = useRef(new Animated.Value(1)).current;
  const checkmarkScale = useRef(new Animated.Value(checkboxValue ? 1 : 0)).current;
  const glowOpacity = useRef(new Animated.Value(0)).current;
  const backgroundOpacity = useRef(new Animated.Value(checkboxValue ? 1 : 0)).current;
  const indeterminateScale = useRef(new Animated.Value(indeterminate ? 1 : 0)).current;
  
  // Size configuration
  const sizeConfig = sizeConfigs[size];

  // Update animations when value changes
  useEffect(() => {
    const toValue = checkboxValue ? 1 : 0;
    const indeterminateValue = indeterminate ? 1 : 0;
    
    Animated.parallel([
      Animated.timing(checkmarkScale, {
        toValue: indeterminate ? 0 : toValue,
        duration: animationDuration,
        useNativeDriver: true,
      }),
      Animated.timing(backgroundOpacity, {
        toValue: (checkboxValue || indeterminate) ? 1 : 0,
        duration: animationDuration,
        useNativeDriver: false,
      }),
      Animated.timing(indeterminateScale, {
        toValue: indeterminateValue,
        duration: animationDuration,
        useNativeDriver: true,
      }),
    ]).start();
  }, [checkboxValue, indeterminate, animationDuration, checkmarkScale, backgroundOpacity, indeterminateScale]);

  // Handle checkbox press
  const handlePress = useCallback(() => {
    if (disabled || loading) return;

    const newValue = !checkboxValue;
    
    if (!isControlled) {
      setInternalChecked(newValue);
    }
    
    onCheckedChange?.(newValue);
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
        toValue: 0.9,
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
    checkboxValue,
    isControlled,
    onCheckedChange,
    onPress,
    glowEffect,
    glowOpacity,
    scaleAnimation,
  ]);

  // Animated styles
  const animatedBackgroundColor = backgroundOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [uncheckedColor, checkedColor],
  });

  const animatedBorderColor = backgroundOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [borderColor, checkedColor],
  });

  const glowColor = backgroundOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(255, 255, 255, 0.2)', 'rgba(46, 134, 222, 0.4)'],
  });

  // Styles
  const containerStyles: ViewStyle = StyleSheet.flatten([
    styles.container,
    {
      flexDirection: labelPosition === 'left' ? 'row-reverse' : 'row',
    },
    containerStyle,
  ]);

  const checkboxStyles = StyleSheet.flatten([
    styles.checkbox,
    {
      width: sizeConfig.size,
      height: sizeConfig.size,
      borderRadius: sizeConfig.borderRadius,
      transform: [{ scale: scaleAnimation }],
    },
    disabled && styles.checkbox_disabled,
    checkboxStyle,
  ]);

  const labelStyles: TextStyle = StyleSheet.flatten([
    styles.label,
    {
      fontSize: sizeConfig.labelSize,
      marginLeft: labelPosition === 'right' ? sizeConfig.labelSpacing : 0,
      marginRight: labelPosition === 'left' ? sizeConfig.labelSpacing : 0,
    },
    disabled && styles.label_disabled,
    labelStyle,
  ]);

  // Render checkmark
  const renderCheckmark = () => {
    if (checkmarkIcon) {
      return (
        <Animated.View style={{ transform: [{ scale: checkmarkScale }] }}>
          {checkmarkIcon}
        </Animated.View>
      );
    }

    return (
      <Animated.View 
        style={[
          styles.checkmark,
          {
            transform: [{ scale: checkmarkScale }],
            width: sizeConfig.checkmarkSize,
            height: sizeConfig.checkmarkSize,
          },
        ]}
      >
        <View style={[styles.checkmarkIcon, { borderColor: checkmarkColor }]} />
      </Animated.View>
    );
  };

  // Render indeterminate mark
  const renderIndeterminateMark = () => {
    return (
      <Animated.View 
        style={[
          styles.indeterminateMark,
          {
            transform: [{ scale: indeterminateScale }],
            width: sizeConfig.checkmarkSize,
            height: 2,
            backgroundColor: checkmarkColor,
          },
        ]}
      />
    );
  };

  // Render checkbox
  const renderCheckboxComponent = () => {
    if (renderCheckbox) {
      return renderCheckbox({
        checked: checkboxValue,
        indeterminate,
        size,
        style: checkboxStyles,
        animatedStyle: { 
          backgroundColor: animatedBackgroundColor,
          borderColor: animatedBorderColor,
        },
      });
    }

    return (
      <Animated.View 
        style={[
          checkboxStyles,
          {
            backgroundColor: animatedBackgroundColor,
            borderColor: animatedBorderColor,
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
        {indeterminate ? renderIndeterminateMark() : renderCheckmark()}
      </Animated.View>
    );
  };

  return (
    <TouchableOpacity
      style={containerStyles}
      onPress={handlePress}
      disabled={disabled || loading}
      testID={testID}
      accessibilityRole="checkbox"
      accessibilityState={{ 
        checked: indeterminate ? 'mixed' : checkboxValue,
        disabled: disabled || loading,
      }}
      accessibilityLabel={accessibilityLabel || label}
      accessibilityHint={accessibilityHint}
      activeOpacity={0.8}
    >
      {renderCheckboxComponent()}
      {label && (
        <Text style={labelStyles}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

/**
 * Styles
 */
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  checkbox: {
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
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
  checkbox_disabled: {
    opacity: 0.5,
  },
  label: {
    color: '#FFFFFF',
    fontFamily: 'Inter',
    fontWeight: '400',
  },
  label_disabled: {
    opacity: 0.5,
    color: '#B8B8C0',
  },
  checkmark: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkIcon: {
    width: '60%',
    height: '30%',
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#FFFFFF',
    transform: [{ rotate: '-45deg' }],
    marginTop: -2,
  },
  indeterminateMark: {
    borderRadius: 1,
  },
});

export default Checkbox;
