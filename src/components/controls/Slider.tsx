import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  ViewStyle,
  TextStyle,
  LayoutChangeEvent,
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';

/**
 * Slider component size variants
 */
export type SliderSize = 'small' | 'medium' | 'large';

/**
 * Slider component value type
 */
export type SliderValue = number;

/**
 * Slider mark configuration
 */
export interface SliderMark {
  /** Mark value */
  value: number;
  /** Mark label */
  label?: string;
  /** Custom mark style */
  style?: ViewStyle;
  /** Custom label style */
  labelStyle?: TextStyle;
}

/**
 * Slider component props
 */
export interface SliderProps {
  /** Current value (controlled) */
  value?: SliderValue;
  /** Default value (uncontrolled) */
  defaultValue?: SliderValue;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step size */
  step?: number;
  /** Size variant */
  size?: SliderSize;
  /** Whether the slider is disabled */
  disabled?: boolean;
  /** Whether the slider is loading */
  loading?: boolean;
  /** Value change handler */
  onValueChange?: (value: SliderValue) => void;
  /** Value change complete handler */
  onValueChangeComplete?: (value: SliderValue) => void;
  /** Custom track style */
  trackStyle?: ViewStyle;
  /** Custom thumb style */
  thumbStyle?: ViewStyle;
  /** Custom active track style */
  activeTrackStyle?: ViewStyle;
  /** Custom container style */
  containerStyle?: ViewStyle;
  /** Custom label style */
  labelStyle?: TextStyle;
  /** Track color */
  trackColor?: string;
  /** Active track color */
  activeTrackColor?: string;
  /** Thumb color */
  thumbColor?: string;
  /** Show value label */
  showValue?: boolean;
  /** Value label format function */
  formatValue?: (value: number) => string;
  /** Show marks */
  showMarks?: boolean;
  /** Marks configuration */
  marks?: SliderMark[];
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
  /** Custom render function for thumb */
  renderThumb?: (props: { 
    value: number; 
    size: SliderSize; 
    style: ViewStyle; 
    animatedStyle: any;
  }) => React.ReactNode;
  /** Custom render function for track */
  renderTrack?: (props: { 
    size: SliderSize; 
    style: ViewStyle; 
  }) => React.ReactNode;
  /** Custom render function for active track */
  renderActiveTrack?: (props: { 
    progress: number; 
    size: SliderSize; 
    style: ViewStyle; 
  }) => React.ReactNode;
  /** Custom render function for marks */
  renderMark?: (props: { 
    mark: SliderMark; 
    index: number; 
    isActive: boolean; 
    style: ViewStyle; 
  }) => React.ReactNode;
}

/**
 * Size configuration for different slider sizes
 */
const sizeConfigs = {
  small: {
    trackHeight: 4,
    thumbSize: 20,
    markSize: 6,
    fontSize: 12,
    spacing: 8,
    thumbShadowRadius: 4,
  },
  medium: {
    trackHeight: 6,
    thumbSize: 24,
    markSize: 8,
    fontSize: 14,
    spacing: 12,
    thumbShadowRadius: 6,
  },
  large: {
    trackHeight: 8,
    thumbSize: 28,
    markSize: 10,
    fontSize: 16,
    spacing: 16,
    thumbShadowRadius: 8,
  },
};

/**
 * Slider component
 * 
 * A custom slider component following Corp Astro design system.
 * Features glass morphism effects, smooth animations, and cosmic glow.
 * 
 * @param props - Slider component props
 * @returns JSX.Element
 */
export const Slider: React.FC<SliderProps> = ({
  value,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  size = 'medium',
  disabled = false,
  loading = false,
  onValueChange,
  onValueChangeComplete,
  trackStyle,
  thumbStyle,
  activeTrackStyle,
  containerStyle,
  labelStyle,
  trackColor = 'rgba(255, 255, 255, 0.2)',
  activeTrackColor = '#2E86DE',
  thumbColor = '#FFFFFF',
  showValue = true,
  formatValue = (val: number) => val.toString(),
  showMarks = false,
  marks = [],
  glowEffect = true,
  animationDuration = 200,
  testID,
  accessibilityLabel,
  accessibilityHint,
  hapticFeedback = true,
  renderThumb,
  renderTrack,
  renderActiveTrack,
  renderMark,
}) => {
  // State management
  const [internalValue, setInternalValue] = useState<SliderValue>(defaultValue);
  const [trackWidth, setTrackWidth] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  
  // Animation values
  const thumbPosition = useRef(new Animated.Value(0)).current;
  const thumbScale = useRef(new Animated.Value(1)).current;
  const thumbGlow = useRef(new Animated.Value(0)).current;
  const trackOpacity = useRef(new Animated.Value(1)).current;
  
  // Size configuration
  const sizeConfig = sizeConfigs[size];
  
  // Calculate progress (0-1)
  const progress = (currentValue - min) / (max - min);
  
  // Clamp value to range
  const clampValue = useCallback((val: number) => {
    return Math.max(min, Math.min(max, val));
  }, [min, max]);
  
  // Snap value to step
  const snapToStep = useCallback((val: number) => {
    return Math.round(val / step) * step;
  }, [step]);
  
  // Convert position to value
  const positionToValue = useCallback((position: number) => {
    if (trackWidth === 0) return currentValue;
    
    const ratio = position / trackWidth;
    const rawValue = min + (max - min) * ratio;
    return snapToStep(clampValue(rawValue));
  }, [trackWidth, min, max, currentValue, snapToStep, clampValue]);
  
  // Convert value to position
  const valueToPosition = useCallback((val: number) => {
    const ratio = (val - min) / (max - min);
    return ratio * trackWidth;
  }, [min, max, trackWidth]);
  
  // Update thumb position when value changes
  useEffect(() => {
    if (trackWidth > 0) {
      const position = valueToPosition(currentValue);
      
      Animated.timing(thumbPosition, {
        toValue: position,
        duration: isDragging ? 0 : animationDuration,
        useNativeDriver: false,
      }).start();
    }
  }, [currentValue, trackWidth, valueToPosition, thumbPosition, isDragging, animationDuration]);
  
  // Update animations when dragging changes
  useEffect(() => {
    const scaleValue = isDragging ? 1.1 : 1;
    const glowValue = isDragging ? 1 : 0;
    
    Animated.parallel([
      Animated.timing(thumbScale, {
        toValue: scaleValue,
        duration: animationDuration,
        useNativeDriver: true,
      }),
      Animated.timing(thumbGlow, {
        toValue: glowValue,
        duration: animationDuration,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isDragging, thumbScale, thumbGlow, animationDuration]);
  
  // Handle value change
  const handleValueChange = useCallback((newValue: SliderValue) => {
    if (disabled || loading) return;
    
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
  }, [disabled, loading, clampValue, hapticFeedback, currentValue, isControlled, onValueChange]);
  
  // Handle pan gesture
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => !disabled && !loading,
      onPanResponderGrant: () => {
        setIsDragging(true);
      },
      onPanResponderMove: (event: GestureResponderEvent, gestureState: PanResponderGestureState) => {
        if (disabled || loading || trackWidth === 0) return;
        
        const { locationX } = event.nativeEvent;
        const clampedX = Math.max(0, Math.min(trackWidth, locationX));
        const newValue = positionToValue(clampedX);
        
        handleValueChange(newValue);
      },
      onPanResponderRelease: () => {
        setIsDragging(false);
        onValueChangeComplete?.(currentValue);
      },
      onPanResponderTerminate: () => {
        setIsDragging(false);
      },
    })
  ).current;
  
  // Handle track layout
  const handleTrackLayout = useCallback((event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setTrackWidth(width);
  }, []);
  
  // Render thumb
  const renderThumbElement = useCallback(() => {
    const animatedStyle = {
      transform: [
        {
          translateX: thumbPosition.interpolate({
            inputRange: [0, trackWidth || 1],
            outputRange: [0, trackWidth || 1],
            extrapolate: 'clamp',
          }),
        },
        { scale: thumbScale },
      ],
    };
    
    const thumbStyles = [
      styles.thumb,
      {
        width: sizeConfig.thumbSize,
        height: sizeConfig.thumbSize,
        borderRadius: sizeConfig.thumbSize / 2,
        backgroundColor: thumbColor,
        shadowRadius: sizeConfig.thumbShadowRadius,
      },
      thumbStyle,
    ];
    
    // Use custom render function if provided
    if (renderThumb) {
      return renderThumb({
        value: currentValue,
        size,
        style: StyleSheet.flatten(thumbStyles),
        animatedStyle,
      });
    }
    
    return (
      <Animated.View
        style={[
          thumbStyles,
          animatedStyle,
          glowEffect && {
            shadowOpacity: thumbGlow.interpolate({
              inputRange: [0, 1],
              outputRange: [0.3, 0.8],
            }),
          },
        ]}
      />
    );
  }, [
    thumbPosition,
    trackWidth,
    thumbScale,
    thumbGlow,
    sizeConfig,
    thumbColor,
    thumbStyle,
    glowEffect,
    renderThumb,
    currentValue,
    size,
  ]);
  
  // Render track
  const renderTrackElement = useCallback(() => {
    const trackStyles = [
      styles.track,
      {
        height: sizeConfig.trackHeight,
        backgroundColor: trackColor,
        borderRadius: sizeConfig.trackHeight / 2,
      },
      trackStyle,
    ];
    
    // Use custom render function if provided
    if (renderTrack) {
      return renderTrack({
        size,
        style: StyleSheet.flatten(trackStyles),
      });
    }
    
    return <View style={trackStyles} />;
  }, [sizeConfig, trackColor, trackStyle, renderTrack, size]);
  
  // Render active track
  const renderActiveTrackElement = useCallback(() => {
    const activeTrackStyles = [
      styles.activeTrack,
      {
        height: sizeConfig.trackHeight,
        backgroundColor: activeTrackColor,
        borderRadius: sizeConfig.trackHeight / 2,
        width: progress * trackWidth,
      },
      activeTrackStyle,
    ];
    
    // Use custom render function if provided
    if (renderActiveTrack) {
      return renderActiveTrack({
        progress,
        size,
        style: StyleSheet.flatten(activeTrackStyles),
      });
    }
    
    return <View style={StyleSheet.flatten(activeTrackStyles)} />;
  }, [sizeConfig, activeTrackColor, progress, trackWidth, activeTrackStyle, renderActiveTrack, size]);
  
  // Render marks
  const renderMarksElement = useCallback(() => {
    if (!showMarks || marks.length === 0) return null;
    
    return (
      <View style={styles.marksContainer}>
        {marks.map((mark, index) => {
          const markProgress = (mark.value - min) / (max - min);
          const isActive = currentValue >= mark.value;
          const leftPosition = markProgress * trackWidth;
          
          const markStyles = [
            styles.mark,
            {
              left: leftPosition,
              width: sizeConfig.markSize,
              height: sizeConfig.markSize,
              borderRadius: sizeConfig.markSize / 2,
              backgroundColor: isActive ? activeTrackColor : trackColor,
            },
            mark.style,
          ];
          
          // Use custom render function if provided
          if (renderMark) {
            return renderMark({
              mark,
              index,
              isActive,
              style: StyleSheet.flatten(markStyles),
            });
          }
          
          return (
            <View key={index} style={styles.markWrapper}>
              <View style={StyleSheet.flatten(markStyles)} />
              {mark.label && (
                <Text
                  style={[
                    styles.markLabel,
                    {
                      fontSize: sizeConfig.fontSize,
                      color: isActive ? activeTrackColor : 'rgba(255, 255, 255, 0.6)',
                    },
                    mark.labelStyle,
                  ]}
                >
                  {mark.label}
                </Text>
              )}
            </View>
          );
        })}
      </View>
    );
  }, [
    showMarks,
    marks,
    min,
    max,
    currentValue,
    trackWidth,
    sizeConfig,
    activeTrackColor,
    trackColor,
    renderMark,
  ]);
  
  return (
    <View
      style={[styles.container, containerStyle]}
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
      {/* Value label */}
      {showValue && (
        <Text style={[styles.valueLabel, { fontSize: sizeConfig.fontSize }, labelStyle]}>
          {formatValue(currentValue)}
        </Text>
      )}
      
      {/* Slider track */}
      <View style={styles.sliderContainer}>
        <View
          {...panResponder.panHandlers}
          style={[
            styles.trackContainer,
            {
              opacity: disabled || loading ? 0.5 : 1,
              paddingVertical: sizeConfig.spacing,
            },
          ]}
          onLayout={handleTrackLayout}
        >
          {/* Background track */}
          {renderTrackElement()}
          
          {/* Active track */}
          {renderActiveTrackElement()}
          
          {/* Thumb */}
          {renderThumbElement()}
        </View>
        
        {/* Marks */}
        {renderMarksElement()}
      </View>
    </View>
  );
};

/**
 * Slider component styles
 */
const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  
  valueLabel: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
  },
  
  sliderContainer: {
    position: 'relative',
  },
  
  trackContainer: {
    position: 'relative',
    justifyContent: 'center',
  },
  
  track: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  
  activeTrack: {
    position: 'absolute',
    left: 0,
    backgroundColor: '#2E86DE',
  },
  
  thumb: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    shadowColor: '#2E86DE',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    marginLeft: -12, // Half of thumb size for centering
    marginTop: -9,   // Center vertically on track
  },
  
  marksContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  
  markWrapper: {
    position: 'absolute',
    alignItems: 'center',
  },
  
  mark: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginLeft: -4, // Half of mark size for centering
  },
  
  markLabel: {
    position: 'absolute',
    top: 20,
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    minWidth: 40,
  },
});

export default Slider;
