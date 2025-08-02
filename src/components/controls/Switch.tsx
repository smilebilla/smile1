import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
  AccessibilityInfo,
} from 'react-native';

/**
 * Switch component size variants
 */
export type SwitchSize = 'small' | 'medium' | 'large';

/**
 * Switch component style variants
 */
export type SwitchVariant = 'default' | 'ios' | 'material' | 'custom';

/**
 * Switch component props
 */
export interface SwitchProps {
  /** Current value (controlled) */
  value?: boolean;
  /** Default value (uncontrolled) */
  defaultValue?: boolean;
  /** Size variant */
  size?: SwitchSize;
  /** Style variant */
  variant?: SwitchVariant;
  /** Whether the switch is disabled */
  disabled?: boolean;
  /** Whether the switch is loading */
  loading?: boolean;
  /** Whether the switch is read-only */
  readOnly?: boolean;
  /** Value change handler */
  onValueChange?: (value: boolean) => void;
  /** Custom switch container style */
  containerStyle?: ViewStyle;
  /** Custom track style */
  trackStyle?: ViewStyle;
  /** Custom thumb style */
  thumbStyle?: ViewStyle;
  /** Custom label style */
  labelStyle?: TextStyle;
  /** Custom track color when active */
  activeTrackColor?: string;
  /** Custom track color when inactive */
  inactiveTrackColor?: string;
  /** Custom thumb color when active */
  activeThumbColor?: string;
  /** Custom thumb color when inactive */
  inactiveThumbColor?: string;
  /** Custom border color when active */
  activeBorderColor?: string;
  /** Custom border color when inactive */
  inactiveBorderColor?: string;
  /** Switch label text */
  label?: string;
  /** Label position */
  labelPosition?: 'left' | 'right' | 'top' | 'bottom';
  /** Enable glow effect */
  glowEffect?: boolean;
  /** Animation duration in milliseconds */
  animationDuration?: number;
  /** Test ID for testing */
  testID?: string;
  /** Accessibility label */
  accessibilityLabel?: string;
  /** Accessibility hint */
  accessibilityHint?: string;
  /** Enable haptic feedback */
  hapticFeedback?: boolean;
  /** Custom render function for track */
  renderTrack?: (props: {
    isActive: boolean;
    isDisabled: boolean;
    size: SwitchSize;
    style: ViewStyle;
  }) => React.ReactNode;
  /** Custom render function for thumb */
  renderThumb?: (props: {
    isActive: boolean;
    isDisabled: boolean;
    size: SwitchSize;
    style: ViewStyle;
  }) => React.ReactNode;
  /** Custom render function for label */
  renderLabel?: (props: {
    label: string;
    isActive: boolean;
    isDisabled: boolean;
    style: TextStyle;
  }) => React.ReactNode;
  /** Enable press animation */
  pressAnimation?: boolean;
  /** Custom icons for on/off states */
  onIcon?: React.ReactNode;
  offIcon?: React.ReactNode;
  /** Show icons inside thumb */
  showIcons?: boolean;
  /** Enable gradient track */
  gradientTrack?: boolean;
  /** Custom gradient colors */
  gradientColors?: [string, string];
  /** Track border width */
  borderWidth?: number;
  /** Thumb shadow */
  thumbShadow?: boolean;
  /** Custom thumb shadow color */
  thumbShadowColor?: string;
  /** Enable smooth animation */
  smoothAnimation?: boolean;
  /** Custom easing function */
  easing?: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';
}

/**
 * Size configuration for different switch sizes
 */
const sizeConfigs = {
  small: {
    trackWidth: 40,
    trackHeight: 24,
    thumbSize: 20,
    thumbOffset: 2,
    borderRadius: 12,
    thumbBorderRadius: 10,
    labelFontSize: 14,
    iconSize: 12,
  },
  medium: {
    trackWidth: 52,
    trackHeight: 32,
    thumbSize: 28,
    thumbOffset: 2,
    borderRadius: 16,
    thumbBorderRadius: 14,
    labelFontSize: 16,
    iconSize: 14,
  },
  large: {
    trackWidth: 64,
    trackHeight: 40,
    thumbSize: 36,
    thumbOffset: 2,
    borderRadius: 20,
    thumbBorderRadius: 18,
    labelFontSize: 18,
    iconSize: 16,
  },
};

/**
 * Switch component
 * 
 * An alternative switch design following Corp Astro design system.
 * Features smooth animations, customizable styling, and accessibility support.
 * 
 * @param props - Switch component props
 * @returns JSX.Element
 */
export const Switch: React.FC<SwitchProps> = ({
  value,
  defaultValue = false,
  size = 'medium',
  variant = 'default',
  disabled = false,
  loading = false,
  readOnly = false,
  onValueChange,
  containerStyle,
  trackStyle,
  thumbStyle,
  labelStyle,
  activeTrackColor = '#2E86DE',
  inactiveTrackColor = 'rgba(22, 33, 62, 0.3)',
  activeThumbColor = '#FFFFFF',
  inactiveThumbColor = '#B8B8C0',
  activeBorderColor = 'rgba(46, 134, 222, 0.3)',
  inactiveBorderColor = 'rgba(255, 255, 255, 0.1)',
  label,
  labelPosition = 'right',
  glowEffect = true,
  animationDuration = 200,
  testID,
  accessibilityLabel,
  accessibilityHint,
  hapticFeedback = true,
  renderTrack,
  renderThumb,
  renderLabel,
  pressAnimation = true,
  onIcon,
  offIcon,
  showIcons = false,
  gradientTrack = false,
  gradientColors = ['#2E86DE', '#533483'],
  borderWidth = 1,
  thumbShadow = true,
  thumbShadowColor = 'rgba(0, 0, 0, 0.3)',
  smoothAnimation = true,
  easing = 'ease-out',
}) => {
  // State management
  const [internalValue, setInternalValue] = useState<boolean>(defaultValue);
  const [isPressed, setIsPressed] = useState<boolean>(false);
  
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  
  // Animation values
  const thumbPosition = useRef(new Animated.Value(currentValue ? 1 : 0)).current;
  const trackOpacity = useRef(new Animated.Value(currentValue ? 1 : 0.6)).current;
  const thumbScale = useRef(new Animated.Value(1)).current;
  const glowOpacity = useRef(new Animated.Value(0)).current;
  const pressScale = useRef(new Animated.Value(1)).current;
  
  // Size configuration
  const sizeConfig = sizeConfigs[size];
  
  // Calculate thumb position range
  const thumbRange = sizeConfig.trackWidth - sizeConfig.thumbSize - (sizeConfig.thumbOffset * 2);
  
  // Handle value change
  const handleValueChange = useCallback((newValue: boolean) => {
    if (disabled || loading || readOnly) return;
    
    // Haptic feedback
    if (hapticFeedback && newValue !== currentValue) {
      // Add haptic feedback here if needed
    }
    
    // Update internal state if uncontrolled
    if (!isControlled) {
      setInternalValue(newValue);
    }
    
    // Call external handler
    onValueChange?.(newValue);
  }, [disabled, loading, readOnly, hapticFeedback, currentValue, isControlled, onValueChange]);
  
  // Animate switch
  const animateSwitch = useCallback((toValue: boolean) => {
    const animations = [
      Animated.timing(thumbPosition, {
        toValue: toValue ? 1 : 0,
        duration: animationDuration,
        useNativeDriver: true,
      }),
      Animated.timing(trackOpacity, {
        toValue: toValue ? 1 : 0.6,
        duration: animationDuration,
        useNativeDriver: true,
      }),
    ];
    
    if (glowEffect) {
      animations.push(
        Animated.timing(glowOpacity, {
          toValue: toValue ? 1 : 0,
          duration: animationDuration,
          useNativeDriver: true,
        })
      );
    }
    
    Animated.parallel(animations).start();
  }, [thumbPosition, trackOpacity, glowOpacity, animationDuration, glowEffect]);
  
  // Handle press
  const handlePress = useCallback((event: GestureResponderEvent) => {
    if (disabled || loading || readOnly) return;
    
    const newValue = !currentValue;
    handleValueChange(newValue);
    animateSwitch(newValue);
  }, [disabled, loading, readOnly, currentValue, handleValueChange, animateSwitch]);
  
  // Handle press in
  const handlePressIn = useCallback(() => {
    if (disabled || loading || readOnly) return;
    
    setIsPressed(true);
    
    if (pressAnimation) {
      Animated.parallel([
        Animated.timing(thumbScale, {
          toValue: 1.1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(pressScale, {
          toValue: 0.98,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [disabled, loading, readOnly, pressAnimation, thumbScale, pressScale]);
  
  // Handle press out
  const handlePressOut = useCallback(() => {
    setIsPressed(false);
    
    if (pressAnimation) {
      Animated.parallel([
        Animated.timing(thumbScale, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(pressScale, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [pressAnimation, thumbScale, pressScale]);
  
  // Update animation when value changes externally
  useEffect(() => {
    animateSwitch(currentValue);
  }, [currentValue, animateSwitch]);
  
  // Get track colors
  const getTrackColor = useCallback(() => {
    if (gradientTrack) {
      return currentValue ? gradientColors[0] : gradientColors[1];
    }
    return currentValue ? activeTrackColor : inactiveTrackColor;
  }, [currentValue, gradientTrack, gradientColors, activeTrackColor, inactiveTrackColor]);
  
  // Get thumb color
  const getThumbColor = useCallback(() => {
    return currentValue ? activeThumbColor : inactiveThumbColor;
  }, [currentValue, activeThumbColor, inactiveThumbColor]);
  
  // Get border color
  const getBorderColor = useCallback(() => {
    return currentValue ? activeBorderColor : inactiveBorderColor;
  }, [currentValue, activeBorderColor, inactiveBorderColor]);
  
  // Render track
  const renderTrackElement = useCallback(() => {
    const trackStyles = [
      styles.track,
      {
        width: sizeConfig.trackWidth,
        height: sizeConfig.trackHeight,
        borderRadius: sizeConfig.borderRadius,
        backgroundColor: getTrackColor(),
        borderColor: getBorderColor(),
        borderWidth,
        opacity: disabled ? 0.5 : 1,
      },
      trackStyle,
    ];
    
    const animatedStyle = {
      opacity: trackOpacity,
      transform: [{ scale: pressScale }],
    };
    
    // Use custom render function if provided
    if (renderTrack) {
      return renderTrack({
        isActive: currentValue,
        isDisabled: disabled,
        size,
        style: StyleSheet.flatten(trackStyles),
      });
    }
    
    return (
      <Animated.View
        style={[
          trackStyles,
          animatedStyle,
          glowEffect && currentValue && {
            shadowColor: activeTrackColor,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: glowOpacity,
            shadowRadius: 8,
            elevation: 4,
          },
        ]}
      />
    );
  }, [
    sizeConfig,
    getTrackColor,
    getBorderColor,
    borderWidth,
    disabled,
    trackStyle,
    trackOpacity,
    pressScale,
    renderTrack,
    currentValue,
    size,
    glowEffect,
    activeTrackColor,
    glowOpacity,
  ]);
  
  // Render thumb
  const renderThumbElement = useCallback(() => {
    const thumbStyles = [
      styles.thumb,
      {
        width: sizeConfig.thumbSize,
        height: sizeConfig.thumbSize,
        borderRadius: sizeConfig.thumbBorderRadius,
        backgroundColor: getThumbColor(),
        opacity: disabled ? 0.5 : 1,
      },
      thumbStyle,
    ];
    
    const animatedStyle = {
      transform: [
        {
          translateX: thumbPosition.interpolate({
            inputRange: [0, 1],
            outputRange: [0, thumbRange],
          }),
        },
        { scale: thumbScale },
      ],
    };
    
    // Use custom render function if provided
    if (renderThumb) {
      return renderThumb({
        isActive: currentValue,
        isDisabled: disabled,
        size,
        style: StyleSheet.flatten(thumbStyles),
      });
    }
    
    return (
      <Animated.View
        style={[
          thumbStyles,
          animatedStyle,
          thumbShadow && {
            shadowColor: thumbShadowColor,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 4,
          },
        ]}
      >
        {showIcons && (
          <View style={styles.iconContainer}>
            {currentValue ? onIcon : offIcon}
          </View>
        )}
      </Animated.View>
    );
  }, [
    sizeConfig,
    getThumbColor,
    disabled,
    thumbStyle,
    thumbPosition,
    thumbRange,
    thumbScale,
    renderThumb,
    currentValue,
    size,
    thumbShadow,
    thumbShadowColor,
    showIcons,
    onIcon,
    offIcon,
  ]);
  
  // Render label
  const renderLabelElement = useCallback(() => {
    if (!label) return null;
    
    const labelStyles = [
      styles.label,
      {
        fontSize: sizeConfig.labelFontSize,
        color: disabled ? '#6C757D' : '#FFFFFF',
        opacity: disabled ? 0.5 : 1,
      },
      labelStyle,
    ];
    
    // Use custom render function if provided
    if (renderLabel) {
      return renderLabel({
        label,
        isActive: currentValue,
        isDisabled: disabled,
        style: StyleSheet.flatten(labelStyles),
      });
    }
    
    return (
      <Text style={labelStyles}>
        {label}
      </Text>
    );
  }, [
    label,
    sizeConfig,
    disabled,
    labelStyle,
    renderLabel,
    currentValue,
  ]);
  
  // Determine layout based on label position
  const isHorizontal = labelPosition === 'left' || labelPosition === 'right';
  const labelFirst = labelPosition === 'left' || labelPosition === 'top';
  
  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: isHorizontal ? 'row' : 'column',
          alignItems: isHorizontal ? 'center' : 'flex-start',
        },
        containerStyle,
      ]}
      testID={testID}
    >
      {labelFirst && renderLabelElement()}
      
      <TouchableOpacity
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading || readOnly}
        activeOpacity={1}
        style={[
          styles.switchContainer,
          {
            width: sizeConfig.trackWidth,
            height: sizeConfig.trackHeight,
            marginLeft: labelFirst && isHorizontal ? 12 : 0,
            marginRight: !labelFirst && isHorizontal ? 12 : 0,
            marginTop: labelFirst && !isHorizontal ? 8 : 0,
            marginBottom: !labelFirst && !isHorizontal ? 8 : 0,
          },
        ]}
        accessible={true}
        accessibilityLabel={accessibilityLabel || label}
        accessibilityHint={accessibilityHint}
        accessibilityRole="switch"
        accessibilityState={{
          checked: currentValue,
          disabled: disabled || loading || readOnly,
        }}
        accessibilityValue={{
          text: currentValue ? 'On' : 'Off',
        }}
      >
        {renderTrackElement()}
        <View
          style={[
            styles.thumbContainer,
            {
              top: sizeConfig.thumbOffset,
              left: sizeConfig.thumbOffset,
            },
          ]}
        >
          {renderThumbElement()}
        </View>
        
        {loading && (
          <View style={styles.loadingOverlay}>
            <View style={styles.loadingIndicator} />
          </View>
        )}
      </TouchableOpacity>
      
      {!labelFirst && renderLabelElement()}
    </View>
  );
};

/**
 * Switch component styles
 */
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  
  switchContainer: {
    position: 'relative',
    justifyContent: 'center',
  },
  
  track: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  
  thumbContainer: {
    position: 'absolute',
    zIndex: 1,
  },
  
  thumb: {
    backgroundColor: '#FFFFFF',
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  label: {
    fontWeight: '500',
    color: '#FFFFFF',
  },
  
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 16,
  },
  
  loadingIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#2E86DE',
    opacity: 0.7,
  },
});

export default Switch;
