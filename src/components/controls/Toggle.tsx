import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  StyleSheet,
  AccessibilityInfo,
  Platform,
  ViewStyle,
  TextStyle,
} from 'react-native';

/**
 * Toggle component size variants
 */
export type ToggleSize = 'small' | 'medium' | 'large';

/**
 * Toggle component state
 */
export type ToggleState = 'on' | 'off';

/**
 * Toggle component props
 */
export interface ToggleProps {
  /** Toggle state (controlled) */
  value?: boolean;
  /** Default toggle state (uncontrolled) */
  defaultValue?: boolean;
  /** Size variant */
  size?: ToggleSize;
  /** Whether the toggle is disabled */
  disabled?: boolean;
  /** Whether the toggle is loading */
  loading?: boolean;
  /** Toggle change handler */
  onValueChange?: (value: boolean) => void;
  /** Toggle press handler */
  onPress?: () => void;
  /** Custom track style */
  trackStyle?: ViewStyle;
  /** Custom thumb style */
  thumbStyle?: ViewStyle;
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
  /** Track color when off */
  trackColorOff?: string;
  /** Track color when on */
  trackColorOn?: string;
  /** Thumb color when off */
  thumbColorOff?: string;
  /** Thumb color when on */
  thumbColorOn?: string;
  /** Custom render function for thumb */
  renderThumb?: (props: { 
    isOn: boolean; 
    size: ToggleSize; 
    style: ViewStyle; 
    animatedStyle: ViewStyle;
  }) => React.ReactNode;
  /** Custom render function for track */
  renderTrack?: (props: { 
    isOn: boolean; 
    size: ToggleSize; 
    style: ViewStyle; 
    children: React.ReactNode;
  }) => React.ReactNode;
}

/**
 * Size configuration for different toggle sizes
 */
const sizeConfigs = {
  small: {
    width: 42,
    height: 24,
    thumbSize: 18,
    padding: 3,
    borderRadius: 12,
    thumbRadius: 9,
  },
  medium: {
    width: 52,
    height: 32,
    thumbSize: 26,
    padding: 3,
    borderRadius: 16,
    thumbRadius: 13,
  },
  large: {
    width: 62,
    height: 38,
    thumbSize: 32,
    padding: 3,
    borderRadius: 19,
    thumbRadius: 16,
  },
};

/**
 * Toggle component
 * 
 * A custom toggle switch component following Corp Astro design system.
 * Features glass morphism effects, smooth animations, and cosmic glow.
 * 
 * @param props - Toggle component props
 * @returns JSX.Element
 */
export const Toggle: React.FC<ToggleProps> = ({
  value,
  defaultValue = false,
  size = 'medium',
  disabled = false,
  loading = false,
  onValueChange,
  onPress,
  trackStyle,
  thumbStyle,
  containerStyle,
  testID,
  accessibilityLabel,
  accessibilityHint,
  animationDuration = 200,
  glowEffect = true,
  trackColorOff = 'rgba(255, 255, 255, 0.1)',
  trackColorOn = 'rgba(46, 134, 222, 0.3)',
  thumbColorOff = 'rgba(255, 255, 255, 0.8)',
  thumbColorOn = '#2E86DE',
  renderThumb,
  renderTrack,
}) => {
  // State management
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const toggleValue = isControlled ? value : internalValue;
  
  // Animation values
  const thumbPosition = useRef(new Animated.Value(toggleValue ? 1 : 0)).current;
  const trackColor = useRef(new Animated.Value(toggleValue ? 1 : 0)).current;
  const glowOpacity = useRef(new Animated.Value(0)).current;
  const scaleAnimation = useRef(new Animated.Value(1)).current;
  
  // Size configuration
  const sizeConfig = sizeConfigs[size];

  // Update animations when value changes
  useEffect(() => {
    const toValue = toggleValue ? 1 : 0;
    
    Animated.parallel([
      Animated.timing(thumbPosition, {
        toValue,
        duration: animationDuration,
        useNativeDriver: false,
      }),
      Animated.timing(trackColor, {
        toValue,
        duration: animationDuration,
        useNativeDriver: false,
      }),
    ]).start();
  }, [toggleValue, animationDuration, thumbPosition, trackColor]);

  // Handle toggle press
  const handlePress = useCallback(() => {
    if (disabled || loading) return;

    const newValue = !toggleValue;
    
    if (!isControlled) {
      setInternalValue(newValue);
    }
    
    onValueChange?.(newValue);
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
    toggleValue,
    isControlled,
    onValueChange,
    onPress,
    glowEffect,
    glowOpacity,
    scaleAnimation,
  ]);

  // Animated styles
  const thumbTranslateX = thumbPosition.interpolate({
    inputRange: [0, 1],
    outputRange: [0, sizeConfig.width - sizeConfig.thumbSize - (sizeConfig.padding * 2)],
  });

  const animatedTrackColor = trackColor.interpolate({
    inputRange: [0, 1],
    outputRange: [trackColorOff, trackColorOn],
  });

  const animatedThumbColor = trackColor.interpolate({
    inputRange: [0, 1],
    outputRange: [thumbColorOff, thumbColorOn],
  });

  const glowColor = trackColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(255, 255, 255, 0.2)', 'rgba(46, 134, 222, 0.4)'],
  });

  // Styles
  const containerStyles: ViewStyle = StyleSheet.flatten([
    styles.container,
    containerStyle,
    {
      transform: [{ scale: scaleAnimation }],
    },
  ]);

  const trackStyles = StyleSheet.flatten([
    styles.track,
    {
      width: sizeConfig.width,
      height: sizeConfig.height,
      borderRadius: sizeConfig.borderRadius,
    },
    disabled && styles.track_disabled,
    trackStyle,
  ]);

  const thumbStyles = StyleSheet.flatten([
    styles.thumb,
    {
      width: sizeConfig.thumbSize,
      height: sizeConfig.thumbSize,
      borderRadius: sizeConfig.thumbRadius,
      top: sizeConfig.padding,
      left: sizeConfig.padding,
    },
    disabled && styles.thumb_disabled,
    thumbStyle,
  ]);

  // Render thumb
  const renderThumbComponent = () => {
    if (renderThumb) {
      return renderThumb({
        isOn: toggleValue,
        size,
        style: thumbStyles,
        animatedStyle: { transform: [{ translateX: thumbTranslateX }] },
      });
    }

    return (
      <Animated.View 
        style={[
          thumbStyles,
          {
            backgroundColor: animatedThumbColor,
            transform: [{ translateX: thumbTranslateX }],
          },
        ]} 
      />
    );
  };

  // Render track
  const renderTrackComponent = () => {
    const thumbComponent = renderThumbComponent();

    if (renderTrack) {
      return renderTrack({
        isOn: toggleValue,
        size,
        style: trackStyles,
        children: thumbComponent,
      });
    }

    return (
      <Animated.View 
        style={[
          trackStyles,
          {
            backgroundColor: animatedTrackColor,
          },
        ]}
      >
        {thumbComponent}
      </Animated.View>
    );
  };

  return (
    <TouchableOpacity
      style={containerStyles}
      onPress={handlePress}
      disabled={disabled || loading}
      testID={testID}
      accessibilityRole="switch"
      accessibilityState={{ 
        checked: toggleValue,
        disabled: disabled || loading,
      }}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      activeOpacity={0.8}
    >
      {renderTrackComponent()}
    </TouchableOpacity>
  );
};

/**
 * Styles
 */
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  track: {
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
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
  track_disabled: {
    opacity: 0.5,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  thumb: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        shadowOpacity: 1,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  thumb_disabled: {
    opacity: 0.6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
});

export default Toggle;
