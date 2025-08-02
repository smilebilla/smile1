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
 * RangeSlider component size variants
 */
export type RangeSliderSize = 'small' | 'medium' | 'large';

/**
 * RangeSlider component value type
 */
export type RangeSliderValue = [number, number];

/**
 * RangeSlider mark configuration
 */
export interface RangeSliderMark {
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
 * RangeSlider component props
 */
export interface RangeSliderProps {
  /** Current value range (controlled) */
  value?: RangeSliderValue;
  /** Default value range (uncontrolled) */
  defaultValue?: RangeSliderValue;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step size */
  step?: number;
  /** Size variant */
  size?: RangeSliderSize;
  /** Whether the slider is disabled */
  disabled?: boolean;
  /** Whether the slider is loading */
  loading?: boolean;
  /** Value change handler */
  onValueChange?: (value: RangeSliderValue) => void;
  /** Value change complete handler */
  onValueChangeComplete?: (value: RangeSliderValue) => void;
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
  /** Show value labels */
  showValues?: boolean;
  /** Value label format function */
  formatValue?: (value: number) => string;
  /** Show range label */
  showRangeLabel?: boolean;
  /** Range label format function */
  formatRange?: (min: number, max: number) => string;
  /** Show marks */
  showMarks?: boolean;
  /** Marks configuration */
  marks?: RangeSliderMark[];
  /** Enable glow effect */
  glowEffect?: boolean;
  /** Animation duration in milliseconds */
  animationDuration?: number;
  /** Minimum distance between thumbs */
  minDistance?: number;
  /** Test ID for testing */
  testID?: string;
  /** Accessibility label */
  accessibilityLabel?: string;
  /** Accessibility hint */
  accessibilityHint?: string;
  /** Enable haptic feedback */
  hapticFeedback?: boolean;
  /** Custom render function for thumbs */
  renderThumb?: (props: { 
    value: number; 
    index: number;
    size: RangeSliderSize; 
    style: ViewStyle; 
    animatedStyle: any;
  }) => React.ReactNode;
  /** Custom render function for track */
  renderTrack?: (props: { 
    size: RangeSliderSize; 
    style: ViewStyle; 
  }) => React.ReactNode;
  /** Custom render function for active track */
  renderActiveTrack?: (props: { 
    startProgress: number;
    endProgress: number;
    size: RangeSliderSize; 
    style: ViewStyle; 
  }) => React.ReactNode;
  /** Custom render function for marks */
  renderMark?: (props: { 
    mark: RangeSliderMark; 
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
 * RangeSlider component
 * 
 * A dual-thumb range slider component following Corp Astro design system.
 * Features glass morphism effects, smooth animations, and collision handling.
 * 
 * @param props - RangeSlider component props
 * @returns JSX.Element
 */
export const RangeSlider: React.FC<RangeSliderProps> = ({
  value,
  defaultValue = [0, 100],
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
  showValues = true,
  formatValue = (val: number) => val.toString(),
  showRangeLabel = false,
  formatRange = (minVal: number, maxVal: number) => `${minVal} - ${maxVal}`,
  showMarks = false,
  marks = [],
  glowEffect = true,
  animationDuration = 200,
  minDistance = 0,
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
  const [internalValue, setInternalValue] = useState<RangeSliderValue>(defaultValue as RangeSliderValue);
  const [trackWidth, setTrackWidth] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activeThumb, setActiveThumb] = useState<number | null>(null);
  
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  const [minValue, maxValue] = currentValue;
  
  // Animation values
  const minThumbPosition = useRef(new Animated.Value(0)).current;
  const maxThumbPosition = useRef(new Animated.Value(0)).current;
  const minThumbScale = useRef(new Animated.Value(1)).current;
  const maxThumbScale = useRef(new Animated.Value(1)).current;
  const minThumbGlow = useRef(new Animated.Value(0)).current;
  const maxThumbGlow = useRef(new Animated.Value(0)).current;
  
  // Size configuration
  const sizeConfig = sizeConfigs[size];
  
  // Calculate progress (0-1)
  const minProgress = (minValue - min) / (max - min);
  const maxProgress = (maxValue - min) / (max - min);
  
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
    if (trackWidth === 0) return min;
    
    const ratio = position / trackWidth;
    const rawValue = min + (max - min) * ratio;
    return snapToStep(clampValue(rawValue));
  }, [trackWidth, min, max, snapToStep, clampValue]);
  
  // Convert value to position
  const valueToPosition = useCallback((val: number) => {
    const ratio = (val - min) / (max - min);
    return ratio * trackWidth;
  }, [min, max, trackWidth]);
  
  // Handle collision between thumbs
  const handleCollision = useCallback((newValue: RangeSliderValue, thumbIndex: number) => {
    const [newMin, newMax] = newValue;
    const distance = Math.abs(newMax - newMin);
    
    if (distance < minDistance) {
      if (thumbIndex === 0) {
        // Moving min thumb, adjust it
        return [newMax - minDistance, newMax];
      } else {
        // Moving max thumb, adjust it
        return [newMin, newMin + minDistance];
      }
    }
    
    return newValue;
  }, [minDistance]);
  
  // Update thumb positions when values change
  useEffect(() => {
    if (trackWidth > 0) {
      const minPosition = valueToPosition(minValue);
      const maxPosition = valueToPosition(maxValue);
      
      Animated.parallel([
        Animated.timing(minThumbPosition, {
          toValue: minPosition,
          duration: isDragging ? 0 : animationDuration,
          useNativeDriver: false,
        }),
        Animated.timing(maxThumbPosition, {
          toValue: maxPosition,
          duration: isDragging ? 0 : animationDuration,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [minValue, maxValue, trackWidth, valueToPosition, minThumbPosition, maxThumbPosition, isDragging, animationDuration]);
  
  // Update animations when dragging changes
  useEffect(() => {
    const minScaleValue = isDragging && activeThumb === 0 ? 1.1 : 1;
    const maxScaleValue = isDragging && activeThumb === 1 ? 1.1 : 1;
    const minGlowValue = isDragging && activeThumb === 0 ? 1 : 0;
    const maxGlowValue = isDragging && activeThumb === 1 ? 1 : 0;
    
    Animated.parallel([
      Animated.timing(minThumbScale, {
        toValue: minScaleValue,
        duration: animationDuration,
        useNativeDriver: true,
      }),
      Animated.timing(maxThumbScale, {
        toValue: maxScaleValue,
        duration: animationDuration,
        useNativeDriver: true,
      }),
      Animated.timing(minThumbGlow, {
        toValue: minGlowValue,
        duration: animationDuration,
        useNativeDriver: true,
      }),
      Animated.timing(maxThumbGlow, {
        toValue: maxGlowValue,
        duration: animationDuration,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isDragging, activeThumb, minThumbScale, maxThumbScale, minThumbGlow, maxThumbGlow, animationDuration]);
  
  // Handle value change
  const handleValueChange = useCallback((newValue: RangeSliderValue) => {
    if (disabled || loading) return;
    
    const clampedValue: RangeSliderValue = [clampValue(newValue[0]), clampValue(newValue[1])];
    const sortedValue: RangeSliderValue = [Math.min(clampedValue[0], clampedValue[1]), Math.max(clampedValue[0], clampedValue[1])];
    const finalValue = handleCollision(sortedValue, activeThumb || 0) as RangeSliderValue;
    
    // Haptic feedback
    if (hapticFeedback && (finalValue[0] !== currentValue[0] || finalValue[1] !== currentValue[1])) {
      // Add haptic feedback here if needed
    }
    
    // Update internal state if uncontrolled
    if (!isControlled) {
      setInternalValue(finalValue);
    }
    
    // Call external handler
    onValueChange?.(finalValue);
  }, [disabled, loading, clampValue, handleCollision, activeThumb, hapticFeedback, currentValue, isControlled, onValueChange]);
  
  // Determine which thumb is closer to touch point
  const getCloserThumb = useCallback((touchX: number) => {
    const minThumbX = valueToPosition(minValue);
    const maxThumbX = valueToPosition(maxValue);
    
    const minDistance = Math.abs(touchX - minThumbX);
    const maxDistance = Math.abs(touchX - maxThumbX);
    
    return minDistance <= maxDistance ? 0 : 1;
  }, [minValue, maxValue, valueToPosition]);
  
  // Handle pan gesture
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => !disabled && !loading,
      onPanResponderGrant: (event: GestureResponderEvent) => {
        const { locationX } = event.nativeEvent;
        const closerThumb = getCloserThumb(locationX);
        
        setIsDragging(true);
        setActiveThumb(closerThumb);
      },
      onPanResponderMove: (event: GestureResponderEvent) => {
        if (disabled || loading || trackWidth === 0 || activeThumb === null) return;
        
        const { locationX } = event.nativeEvent;
        const clampedX = Math.max(0, Math.min(trackWidth, locationX));
        const newValue = positionToValue(clampedX);
        
        if (activeThumb === 0) {
          handleValueChange([newValue, maxValue]);
        } else {
          handleValueChange([minValue, newValue]);
        }
      },
      onPanResponderRelease: () => {
        setIsDragging(false);
        setActiveThumb(null);
        onValueChangeComplete?.(currentValue);
      },
      onPanResponderTerminate: () => {
        setIsDragging(false);
        setActiveThumb(null);
      },
    })
  ).current;
  
  // Handle track layout
  const handleTrackLayout = useCallback((event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setTrackWidth(width);
  }, []);
  
  // Render thumb
  const renderThumbElement = useCallback((thumbIndex: number) => {
    const thumbValue = thumbIndex === 0 ? minValue : maxValue;
    const thumbPosition = thumbIndex === 0 ? minThumbPosition : maxThumbPosition;
    const thumbScale = thumbIndex === 0 ? minThumbScale : maxThumbScale;
    const thumbGlow = thumbIndex === 0 ? minThumbGlow : maxThumbGlow;
    
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
    } as any;
    
    const thumbStyles = [
      styles.thumb,
      {
        width: sizeConfig.thumbSize,
        height: sizeConfig.thumbSize,
        borderRadius: sizeConfig.thumbSize / 2,
        backgroundColor: thumbColor,
        shadowRadius: sizeConfig.thumbShadowRadius,
        zIndex: activeThumb === thumbIndex ? 2 : 1,
      },
      thumbStyle,
    ];
    
    // Use custom render function if provided
    if (renderThumb) {
      return renderThumb({
        value: thumbValue,
        index: thumbIndex,
        size,
        style: StyleSheet.flatten(thumbStyles),
        animatedStyle,
      });
    }
    
    return (
      <Animated.View
        key={thumbIndex}
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
    minValue,
    maxValue,
    minThumbPosition,
    maxThumbPosition,
    minThumbScale,
    maxThumbScale,
    minThumbGlow,
    maxThumbGlow,
    trackWidth,
    sizeConfig,
    thumbColor,
    thumbStyle,
    glowEffect,
    activeThumb,
    renderThumb,
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
    
    return <View style={StyleSheet.flatten(trackStyles)} />;
  }, [sizeConfig, trackColor, trackStyle, renderTrack, size]);
  
  // Render active track
  const renderActiveTrackElement = useCallback(() => {
    const activeTrackStyles = [
      styles.activeTrack,
      {
        height: sizeConfig.trackHeight,
        backgroundColor: activeTrackColor,
        borderRadius: sizeConfig.trackHeight / 2,
        left: minProgress * trackWidth,
        width: (maxProgress - minProgress) * trackWidth,
      },
      activeTrackStyle,
    ];
    
    // Use custom render function if provided
    if (renderActiveTrack) {
      return renderActiveTrack({
        startProgress: minProgress,
        endProgress: maxProgress,
        size,
        style: StyleSheet.flatten(activeTrackStyles),
      });
    }
    
    return <View style={StyleSheet.flatten(activeTrackStyles)} />;
  }, [sizeConfig, activeTrackColor, minProgress, maxProgress, trackWidth, activeTrackStyle, renderActiveTrack, size]);
  
  // Render marks
  const renderMarksElement = useCallback(() => {
    if (!showMarks || marks.length === 0) return null;
    
    return (
      <View style={styles.marksContainer}>
        {marks.map((mark, index) => {
          const markProgress = (mark.value - min) / (max - min);
          const isActive = mark.value >= minValue && mark.value <= maxValue;
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
            return (
              <View key={index} style={styles.markWrapper}>
                {renderMark({
                  mark,
                  index,
                  isActive,
                  style: StyleSheet.flatten(markStyles),
                })}
              </View>
            );
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
    minValue,
    maxValue,
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
        now: (minValue + maxValue) / 2,
      }}
    >
      {/* Value labels */}
      {showValues && (
        <View style={styles.valuesContainer}>
          <Text style={[styles.valueLabel, { fontSize: sizeConfig.fontSize }, labelStyle]}>
            {formatValue(minValue)}
          </Text>
          <Text style={[styles.valueLabel, { fontSize: sizeConfig.fontSize }, labelStyle]}>
            {formatValue(maxValue)}
          </Text>
        </View>
      )}
      
      {/* Range label */}
      {showRangeLabel && (
        <Text style={[styles.rangeLabel, { fontSize: sizeConfig.fontSize }, labelStyle]}>
          {formatRange(minValue, maxValue)}
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
          
          {/* Thumbs */}
          {renderThumbElement(0)}
          {renderThumbElement(1)}
        </View>
        
        {/* Marks */}
        {renderMarksElement()}
      </View>
    </View>
  );
};

/**
 * RangeSlider component styles
 */
const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  
  valuesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  
  valueLabel: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
  },
  
  rangeLabel: {
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

export default RangeSlider;
