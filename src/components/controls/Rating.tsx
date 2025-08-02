import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
  PanResponder,
  PanResponderGestureState,
} from 'react-native';

/**
 * Rating component size variants
 */
export type RatingSize = 'small' | 'medium' | 'large';

/**
 * Rating component props
 */
export interface RatingProps {
  /** Current rating value (controlled) */
  value?: number;
  /** Default rating value (uncontrolled) */
  defaultValue?: number;
  /** Maximum rating value */
  maxRating?: number;
  /** Size variant */
  size?: RatingSize;
  /** Whether the rating is disabled */
  disabled?: boolean;
  /** Whether the rating is read-only */
  readOnly?: boolean;
  /** Whether the rating is loading */
  loading?: boolean;
  /** Allow half-star ratings */
  allowHalf?: boolean;
  /** Show rating value as text */
  showValue?: boolean;
  /** Show rating count */
  showCount?: boolean;
  /** Rating count value */
  count?: number;
  /** Rating change handler */
  onRatingChange?: (rating: number) => void;
  /** Rating change complete handler */
  onRatingChangeComplete?: (rating: number) => void;
  /** Custom star style */
  starStyle?: ViewStyle;
  /** Custom container style */
  containerStyle?: ViewStyle;
  /** Custom label style */
  labelStyle?: TextStyle;
  /** Custom empty star color */
  emptyStarColor?: string;
  /** Custom filled star color */
  filledStarColor?: string;
  /** Custom star border color */
  starBorderColor?: string;
  /** Enable glow effect */
  glowEffect?: boolean;
  /** Animation duration in milliseconds */
  animationDuration?: number;
  /** Value label format function */
  formatValue?: (value: number) => string;
  /** Count label format function */
  formatCount?: (count: number) => string;
  /** Test ID for testing */
  testID?: string;
  /** Accessibility label */
  accessibilityLabel?: string;
  /** Accessibility hint */
  accessibilityHint?: string;
  /** Enable haptic feedback */
  hapticFeedback?: boolean;
  /** Custom render function for star */
  renderStar?: (props: {
    index: number;
    filled: boolean;
    halfFilled: boolean;
    size: RatingSize;
    style: ViewStyle;
    onPress: () => void;
  }) => React.ReactNode;
  /** Custom render function for empty star */
  renderEmptyStar?: (props: {
    index: number;
    size: RatingSize;
    style: ViewStyle;
  }) => React.ReactNode;
}

/**
 * Size configuration for different rating sizes
 */
const sizeConfigs = {
  small: {
    starSize: 16,
    spacing: 4,
    fontSize: 12,
    containerPadding: 8,
  },
  medium: {
    starSize: 24,
    spacing: 6,
    fontSize: 14,
    containerPadding: 12,
  },
  large: {
    starSize: 32,
    spacing: 8,
    fontSize: 16,
    containerPadding: 16,
  },
};

/**
 * Rating component
 * 
 * A star rating component following Corp Astro design system.
 * Features smooth animations, half-star support, and accessibility.
 * 
 * @param props - Rating component props
 * @returns JSX.Element
 */
export const Rating: React.FC<RatingProps> = ({
  value,
  defaultValue = 0,
  maxRating = 5,
  size = 'medium',
  disabled = false,
  readOnly = false,
  loading = false,
  allowHalf = false,
  showValue = false,
  showCount = false,
  count = 0,
  onRatingChange,
  onRatingChangeComplete,
  starStyle,
  containerStyle,
  labelStyle,
  emptyStarColor = 'rgba(255, 255, 255, 0.2)',
  filledStarColor = '#FFD700',
  starBorderColor = 'rgba(255, 255, 255, 0.3)',
  glowEffect = true,
  animationDuration = 200,
  formatValue = (val: number) => val.toFixed(1),
  formatCount = (cnt: number) => `(${cnt})`,
  testID,
  accessibilityLabel,
  accessibilityHint,
  hapticFeedback = true,
  renderStar,
  renderEmptyStar,
}) => {
  // State management
  const [internalValue, setInternalValue] = useState<number>(defaultValue);
  const [hoverValue, setHoverValue] = useState<number>(0);
  const [isPressed, setIsPressed] = useState<boolean>(false);
  
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  const displayValue = hoverValue || currentValue;
  
  // Animation values
  const scaleAnims = useRef(
    Array.from({ length: maxRating }, () => new Animated.Value(1))
  ).current;
  const glowAnims = useRef(
    Array.from({ length: maxRating }, () => new Animated.Value(0))
  ).current;
  
  // Size configuration
  const sizeConfig = sizeConfigs[size];
  
  // Handle value change
  const handleValueChange = useCallback((newValue: number) => {
    if (disabled || readOnly || loading) return;
    
    const clampedValue = Math.max(0, Math.min(maxRating, newValue));
    
    // Haptic feedback
    if (hapticFeedback && clampedValue !== currentValue) {
      // Add haptic feedback here if needed
    }
    
    // Update internal state if uncontrolled
    if (!isControlled) {
      setInternalValue(clampedValue);
    }
    
    // Call external handler
    onRatingChange?.(clampedValue);
  }, [disabled, readOnly, loading, maxRating, hapticFeedback, currentValue, isControlled, onRatingChange]);
  
  // Handle star press
  const handleStarPress = useCallback((index: number) => {
    const newValue = index + 1;
    handleValueChange(newValue);
    onRatingChangeComplete?.(newValue);
  }, [handleValueChange, onRatingChangeComplete]);
  
  // Handle star hover (for half-star support)
  const handleStarHover = useCallback((index: number, position: number) => {
    if (disabled || readOnly || loading) return;
    
    if (allowHalf) {
      const newValue = position < 0.5 ? index + 0.5 : index + 1;
      setHoverValue(newValue);
    } else {
      setHoverValue(index + 1);
    }
  }, [disabled, readOnly, loading, allowHalf]);
  
  // Clear hover
  const clearHover = useCallback(() => {
    setHoverValue(0);
  }, []);
  
  // Animate star
  const animateStar = useCallback((index: number, pressed: boolean) => {
    const scaleValue = pressed ? 1.2 : 1;
    const glowValue = pressed ? 1 : 0;
    
    Animated.parallel([
      Animated.spring(scaleAnims[index], {
        toValue: scaleValue,
        useNativeDriver: true,
      }),
      Animated.timing(glowAnims[index], {
        toValue: glowValue,
        duration: animationDuration,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scaleAnims, glowAnims, animationDuration]);
  
  // Pan responder for gesture handling
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => !disabled && !readOnly && !loading,
      onPanResponderGrant: (event: GestureResponderEvent) => {
        setIsPressed(true);
        const { locationX } = event.nativeEvent;
        const starIndex = Math.floor(locationX / (sizeConfig.starSize + sizeConfig.spacing));
        const starPosition = (locationX % (sizeConfig.starSize + sizeConfig.spacing)) / sizeConfig.starSize;
        
        if (starIndex >= 0 && starIndex < maxRating) {
          animateStar(starIndex, true);
          handleStarHover(starIndex, starPosition);
        }
      },
      onPanResponderMove: (event: GestureResponderEvent) => {
        const { locationX } = event.nativeEvent;
        const starIndex = Math.floor(locationX / (sizeConfig.starSize + sizeConfig.spacing));
        const starPosition = (locationX % (sizeConfig.starSize + sizeConfig.spacing)) / sizeConfig.starSize;
        
        if (starIndex >= 0 && starIndex < maxRating) {
          handleStarHover(starIndex, starPosition);
        }
      },
      onPanResponderRelease: (event: GestureResponderEvent) => {
        setIsPressed(false);
        const { locationX } = event.nativeEvent;
        const starIndex = Math.floor(locationX / (sizeConfig.starSize + sizeConfig.spacing));
        const starPosition = (locationX % (sizeConfig.starSize + sizeConfig.spacing)) / sizeConfig.starSize;
        
        if (starIndex >= 0 && starIndex < maxRating) {
          animateStar(starIndex, false);
          const newValue = allowHalf && starPosition < 0.5 ? starIndex + 0.5 : starIndex + 1;
          handleValueChange(newValue);
          onRatingChangeComplete?.(newValue);
        }
        
        clearHover();
      },
      onPanResponderTerminate: () => {
        setIsPressed(false);
        clearHover();
        scaleAnims.forEach((anim, index) => {
          animateStar(index, false);
        });
      },
    })
  ).current;
  
  // Render star
  const renderStarElement = useCallback((index: number) => {
    const isFilled = displayValue > index;
    const isHalfFilled = allowHalf && displayValue > index && displayValue < index + 1;
    const fillAmount = Math.min(1, Math.max(0, displayValue - index));
    
    const starStyles = [
      styles.star,
      {
        width: sizeConfig.starSize,
        height: sizeConfig.starSize,
        marginRight: index < maxRating - 1 ? sizeConfig.spacing : 0,
      },
      starStyle,
    ];
    
    const animatedStyle = {
      transform: [{ scale: scaleAnims[index] }],
    };
    
    // Use custom render function if provided
    if (renderStar) {
      return renderStar({
        index,
        filled: isFilled,
        halfFilled: isHalfFilled,
        size,
        style: StyleSheet.flatten(starStyles),
        onPress: () => handleStarPress(index),
      });
    }
    
    // Use custom empty star render function if provided
    if (renderEmptyStar && !isFilled && !isHalfFilled) {
      return renderEmptyStar({
        index,
        size,
        style: StyleSheet.flatten(starStyles),
      });
    }
    
    return (
      <TouchableOpacity
        key={index}
        onPress={() => handleStarPress(index)}
        disabled={disabled || readOnly || loading}
        activeOpacity={0.7}
        style={styles.starButton}
      >
        <Animated.View
          style={[
            animatedStyle,
            glowEffect && {
              shadowOpacity: glowAnims[index].interpolate({
                inputRange: [0, 1],
                outputRange: [0.3, 0.8],
              }),
            },
          ]}
        >
          {/* Star background */}
          <View
            style={[
              styles.starBackground,
              {
                width: sizeConfig.starSize,
                height: sizeConfig.starSize,
                borderColor: starBorderColor,
              },
            ]}
          />
          
          {/* Star fill */}
          <View
            style={[
              styles.starFill,
              {
                width: sizeConfig.starSize * fillAmount,
                height: sizeConfig.starSize,
                backgroundColor: filledStarColor,
              },
            ]}
          />
          
          {/* Star glow effect */}
          {glowEffect && isFilled && (
            <Animated.View
              style={[
                styles.starGlow,
                {
                  width: sizeConfig.starSize,
                  height: sizeConfig.starSize,
                  shadowColor: filledStarColor,
                  opacity: glowAnims[index],
                },
              ]}
            />
          )}
        </Animated.View>
      </TouchableOpacity>
    );
  }, [
    displayValue,
    allowHalf,
    maxRating,
    sizeConfig,
    starStyle,
    scaleAnims,
    glowAnims,
    size,
    renderStar,
    renderEmptyStar,
    handleStarPress,
    disabled,
    readOnly,
    loading,
    glowEffect,
    starBorderColor,
    filledStarColor,
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
        min: 0,
        max: maxRating,
        now: currentValue,
      }}
    >
      {/* Rating stars */}
      <View
        {...panResponder.panHandlers}
        style={[
          styles.starsContainer,
          {
            opacity: disabled || loading ? 0.5 : 1,
            padding: sizeConfig.containerPadding,
          },
        ]}
      >
        {Array.from({ length: maxRating }, (_, index) => renderStarElement(index))}
      </View>
      
      {/* Rating value and count */}
      {(showValue || showCount) && (
        <View style={styles.labelsContainer}>
          {showValue && (
            <Text style={[styles.valueLabel, { fontSize: sizeConfig.fontSize }, labelStyle]}>
              {formatValue(currentValue)}
            </Text>
          )}
          {showCount && count > 0 && (
            <Text style={[styles.countLabel, { fontSize: sizeConfig.fontSize }, labelStyle]}>
              {formatCount(count)}
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

/**
 * Rating component styles
 */
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  starButton: {
    position: 'relative',
  },
  
  star: {
    position: 'relative',
    overflow: 'hidden',
  },
  
  starBackground: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    transform: [{ rotate: '45deg' }],
    top: '20%',
    left: '20%',
    width: '60%',
    height: '60%',
  },
  
  starFill: {
    position: 'absolute',
    backgroundColor: '#FFD700',
    borderRadius: 2,
    transform: [{ rotate: '45deg' }],
    top: '20%',
    left: '20%',
    height: '60%',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 4,
  },
  
  starGlow: {
    position: 'absolute',
    borderRadius: 2,
    transform: [{ rotate: '45deg' }],
    top: '20%',
    left: '20%',
    height: '60%',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 8,
  },
  
  labelsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 8,
  },
  
  valueLabel: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
  },
  
  countLabel: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '400',
  },
});

export default Rating;
