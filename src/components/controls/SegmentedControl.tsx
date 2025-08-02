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
  LayoutChangeEvent,
  Dimensions,
} from 'react-native';

/**
 * Segmented control option
 */
export interface SegmentedControlOption {
  /** Option value */
  value: string | number;
  /** Option label */
  label: string;
  /** Option icon */
  icon?: React.ReactNode;
  /** Whether option is disabled */
  disabled?: boolean;
  /** Custom style for this option */
  style?: ViewStyle;
  /** Custom text style for this option */
  textStyle?: TextStyle;
}

/**
 * Segmented control size variants
 */
export type SegmentedControlSize = 'small' | 'medium' | 'large';

/**
 * Segmented control style variants
 */
export type SegmentedControlVariant = 'default' | 'outline' | 'solid' | 'ghost';

/**
 * Segmented control props
 */
export interface SegmentedControlProps {
  /** Options array */
  options: SegmentedControlOption[];
  /** Current selected value (controlled) */
  value?: string | number;
  /** Default selected value (uncontrolled) */
  defaultValue?: string | number;
  /** Size variant */
  size?: SegmentedControlSize;
  /** Style variant */
  variant?: SegmentedControlVariant;
  /** Whether the control is disabled */
  disabled?: boolean;
  /** Whether the control is loading */
  loading?: boolean;
  /** Whether the control is read-only */
  readOnly?: boolean;
  /** Value change handler */
  onValueChange?: (value: string | number) => void;
  /** Custom container style */
  containerStyle?: ViewStyle;
  /** Custom segment style */
  segmentStyle?: ViewStyle;
  /** Custom selected segment style */
  selectedSegmentStyle?: ViewStyle;
  /** Custom text style */
  textStyle?: TextStyle;
  /** Custom selected text style */
  selectedTextStyle?: TextStyle;
  /** Custom background color */
  backgroundColor?: string;
  /** Custom selected background color */
  selectedBackgroundColor?: string;
  /** Custom text color */
  textColor?: string;
  /** Custom selected text color */
  selectedTextColor?: string;
  /** Custom border color */
  borderColor?: string;
  /** Custom selected border color */
  selectedBorderColor?: string;
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
  /** Custom render function for segment */
  renderSegment?: (props: {
    option: SegmentedControlOption;
    index: number;
    isSelected: boolean;
    isDisabled: boolean;
    style: ViewStyle;
    textStyle: TextStyle;
  }) => React.ReactNode;
  /** Custom render function for selected indicator */
  renderSelectedIndicator?: (props: {
    style: ViewStyle;
    animatedStyle: any;
  }) => React.ReactNode;
  /** Enable smooth animation */
  smoothAnimation?: boolean;
  /** Custom easing function */
  easing?: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';
  /** Border radius */
  borderRadius?: number;
  /** Segment spacing */
  segmentSpacing?: number;
  /** Allow multiple selection */
  multiple?: boolean;
  /** Multiple selection values */
  multipleValues?: (string | number)[];
  /** Multiple selection change handler */
  onMultipleValueChange?: (values: (string | number)[]) => void;
  /** Minimum selection count for multiple mode */
  minSelection?: number;
  /** Maximum selection count for multiple mode */
  maxSelection?: number;
  /** Enable full width segments */
  fullWidth?: boolean;
  /** Custom indicator color */
  indicatorColor?: string;
  /** Show icons */
  showIcons?: boolean;
  /** Icon position */
  iconPosition?: 'left' | 'right' | 'top' | 'bottom';
  /** Icon size */
  iconSize?: number;
}

/**
 * Size configuration for different segmented control sizes
 */
const sizeConfigs = {
  small: {
    height: 32,
    fontSize: 14,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    iconSize: 16,
    minWidth: 60,
  },
  medium: {
    height: 40,
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    iconSize: 20,
    minWidth: 80,
  },
  large: {
    height: 48,
    fontSize: 18,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    iconSize: 24,
    minWidth: 100,
  },
};

/**
 * Segmented control component
 * 
 * A segmented control component for selecting between multiple options.
 * Features smooth indicator animation, customizable styling, and accessibility support.
 * 
 * @param props - Segmented control component props
 * @returns JSX.Element
 */
export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  options,
  value,
  defaultValue,
  size = 'medium',
  variant = 'default',
  disabled = false,
  loading = false,
  readOnly = false,
  onValueChange,
  containerStyle,
  segmentStyle,
  selectedSegmentStyle,
  textStyle,
  selectedTextStyle,
  backgroundColor = 'rgba(22, 33, 62, 0.3)',
  selectedBackgroundColor = '#2E86DE',
  textColor = '#B8B8C0',
  selectedTextColor = '#FFFFFF',
  borderColor = 'rgba(255, 255, 255, 0.1)',
  selectedBorderColor = 'rgba(46, 134, 222, 0.3)',
  glowEffect = true,
  animationDuration = 200,
  testID,
  accessibilityLabel,
  accessibilityHint,
  hapticFeedback = true,
  renderSegment,
  renderSelectedIndicator,
  smoothAnimation = true,
  easing = 'ease-out',
  borderRadius,
  segmentSpacing = 0,
  multiple = false,
  multipleValues = [],
  onMultipleValueChange,
  minSelection = 0,
  maxSelection = options.length,
  fullWidth = true,
  indicatorColor = '#2E86DE',
  showIcons = true,
  iconPosition = 'left',
  iconSize,
}) => {
  // State management
  const [internalValue, setInternalValue] = useState<string | number | undefined>(defaultValue);
  const [internalMultipleValues, setInternalMultipleValues] = useState<(string | number)[]>(multipleValues);
  const [segmentWidths, setSegmentWidths] = useState<number[]>([]);
  const [segmentPositions, setSegmentPositions] = useState<number[]>([]);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  
  const isControlled = value !== undefined;
  const isMultipleControlled = multiple && multipleValues.length > 0;
  const currentValue = isControlled ? value : internalValue;
  const currentMultipleValues = isMultipleControlled ? multipleValues : internalMultipleValues;
  
  // Animation values
  const indicatorPosition = useRef(new Animated.Value(0)).current;
  const indicatorWidth = useRef(new Animated.Value(0)).current;
  const indicatorOpacity = useRef(new Animated.Value(1)).current;
  
  // Refs for measuring
  const segmentRefs = useRef<View[]>([]);
  const containerRef = useRef<View>(null);
  
  // Size configuration
  const sizeConfig = sizeConfigs[size];
  const finalBorderRadius = borderRadius || sizeConfig.borderRadius;
  const finalIconSize = iconSize || sizeConfig.iconSize;
  
  // Find selected index
  const selectedIndex = options.findIndex(option => option.value === currentValue);
  
  // Handle value change
  const handleValueChange = useCallback((newValue: string | number, optionIndex: number) => {
    if (disabled || loading || readOnly) return;
    
    const option = options[optionIndex];
    if (option.disabled) return;
    
    // Handle multiple selection
    if (multiple) {
      let newValues = [...currentMultipleValues];
      
      if (newValues.includes(newValue)) {
        // Remove if already selected (if minimum selection allows)
        if (newValues.length > minSelection) {
          newValues = newValues.filter(v => v !== newValue);
        }
      } else {
        // Add if not selected (if maximum selection allows)
        if (newValues.length < maxSelection) {
          newValues.push(newValue);
        }
      }
      
      // Update internal state if uncontrolled
      if (!isMultipleControlled) {
        setInternalMultipleValues(newValues);
      }
      
      // Call external handler
      onMultipleValueChange?.(newValues);
      
      // Haptic feedback
      if (hapticFeedback) {
        // Add haptic feedback here if needed
      }
      
      return;
    }
    
    // Single selection
    if (newValue === currentValue) return;
    
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
  }, [
    disabled,
    loading,
    readOnly,
    options,
    multiple,
    currentMultipleValues,
    minSelection,
    maxSelection,
    isMultipleControlled,
    onMultipleValueChange,
    hapticFeedback,
    currentValue,
    isControlled,
    onValueChange,
  ]);
  
  // Animate indicator
  const animateIndicator = useCallback((toIndex: number) => {
    if (toIndex < 0 || toIndex >= segmentPositions.length || toIndex >= segmentWidths.length) return;
    
    const toPosition = segmentPositions[toIndex];
    const toWidth = segmentWidths[toIndex];
    
    Animated.parallel([
      Animated.timing(indicatorPosition, {
        toValue: toPosition,
        duration: animationDuration,
        useNativeDriver: false,  // Changed to false to match the width animation and avoid driver conflict
      }),
      Animated.timing(indicatorWidth, {
        toValue: toWidth,
        duration: animationDuration,
        useNativeDriver: false,
      }),
    ]).start();
  }, [segmentPositions, segmentWidths, indicatorPosition, indicatorWidth, animationDuration]);
  
  // Handle segment layout
  const handleSegmentLayout = useCallback((event: LayoutChangeEvent, index: number) => {
    const { width, x } = event.nativeEvent.layout;
    
    setSegmentWidths(prev => {
      const newWidths = [...prev];
      newWidths[index] = width;
      return newWidths;
    });
    
    setSegmentPositions(prev => {
      const newPositions = [...prev];
      newPositions[index] = x;
      return newPositions;
    });
  }, []);
  
  // Handle container layout
  const handleContainerLayout = useCallback((event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  }, []);
  
  // Update indicator position when selection changes
  useEffect(() => {
    if (selectedIndex >= 0 && segmentPositions.length > 0 && segmentWidths.length > 0) {
      animateIndicator(selectedIndex);
    }
  }, [selectedIndex, segmentPositions, segmentWidths, animateIndicator]);
  
  // Check if option is selected
  const isOptionSelected = useCallback((optionValue: string | number) => {
    if (multiple) {
      return currentMultipleValues.includes(optionValue);
    }
    return optionValue === currentValue;
  }, [multiple, currentMultipleValues, currentValue]);
  
  // Render segment
  const renderSegmentElement = useCallback((option: SegmentedControlOption, index: number) => {
    const isSelected = isOptionSelected(option.value);
    const isDisabled = disabled || (option.disabled ?? false);
    const isLastSegment = index === options.length - 1;
    
    const segmentStyles = [
      styles.segment,
      {
        height: sizeConfig.height,
        paddingHorizontal: sizeConfig.paddingHorizontal,
        paddingVertical: sizeConfig.paddingVertical,
        minWidth: fullWidth ? undefined : sizeConfig.minWidth,
        flex: fullWidth ? 1 : 0,
        marginRight: !isLastSegment ? segmentSpacing : 0,
        borderRadius: segmentSpacing > 0 ? finalBorderRadius : 0,
        backgroundColor: isSelected && segmentSpacing > 0 ? selectedBackgroundColor : 'transparent',
        borderColor: isSelected && segmentSpacing > 0 ? selectedBorderColor : 'transparent',
        borderWidth: segmentSpacing > 0 ? 1 : 0,
        opacity: isDisabled ? 0.5 : 1,
      },
      segmentStyle,
      isSelected && selectedSegmentStyle,
      option.style,
    ];
    
    const textStyles = [
      styles.segmentText,
      {
        fontSize: sizeConfig.fontSize,
        color: isSelected ? selectedTextColor : textColor,
        fontWeight: isSelected ? '600' as const : '400' as const,
      },
      textStyle,
      isSelected && selectedTextStyle,
      option.textStyle,
    ];
    
    // Use custom render function if provided
    if (renderSegment) {
      return renderSegment({
        option,
        index,
        isSelected,
        isDisabled,
        style: StyleSheet.flatten(segmentStyles),
        textStyle: StyleSheet.flatten(textStyles),
      });
    }
    
    return (
      <TouchableOpacity
        key={option.value}
        ref={ref => segmentRefs.current[index] = ref as any}
        style={segmentStyles}
        onPress={() => handleValueChange(option.value, index)}
        onLayout={(event) => handleSegmentLayout(event, index)}
        disabled={isDisabled}
        activeOpacity={0.7}
        accessible={true}
        accessibilityRole="button"
        accessibilityState={{
          selected: isSelected,
          disabled: isDisabled,
        }}
      >
        <View style={[
          styles.segmentContent,
          {
            flexDirection: iconPosition === 'left' || iconPosition === 'right' ? 'row' : 'column',
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}>
          {showIcons && option.icon && (iconPosition === 'left' || iconPosition === 'top') && (
            <View style={[
              styles.iconContainer,
              {
                marginRight: iconPosition === 'left' ? 6 : 0,
                marginBottom: iconPosition === 'top' ? 4 : 0,
              },
            ]}>
              {option.icon}
            </View>
          )}
          
          <Text style={textStyles} numberOfLines={1}>
            {option.label}
          </Text>
          
          {showIcons && option.icon && (iconPosition === 'right' || iconPosition === 'bottom') && (
            <View style={[
              styles.iconContainer,
              {
                marginLeft: iconPosition === 'right' ? 6 : 0,
                marginTop: iconPosition === 'bottom' ? 4 : 0,
              },
            ]}>
              {option.icon}
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  }, [
    isOptionSelected,
    disabled,
    options.length,
    sizeConfig,
    fullWidth,
    segmentSpacing,
    finalBorderRadius,
    selectedBackgroundColor,
    selectedBorderColor,
    segmentStyle,
    selectedSegmentStyle,
    selectedTextColor,
    textColor,
    textStyle,
    selectedTextStyle,
    renderSegment,
    handleValueChange,
    handleSegmentLayout,
    showIcons,
    iconPosition,
  ]);
  
  // Render selected indicator
  const renderSelectedIndicatorElement = useCallback(() => {
    if (segmentSpacing > 0 || multiple) return null;
    
    const indicatorStyles = [
      styles.selectedIndicator,
      {
        height: sizeConfig.height - 4,
        backgroundColor: selectedBackgroundColor,
        borderRadius: finalBorderRadius - 2,
        borderColor: selectedBorderColor,
        borderWidth: 1,
      },
    ];
    
    const animatedStyle = {
      transform: [{ translateX: indicatorPosition }],
      width: indicatorWidth,
      opacity: indicatorOpacity,
    };
    
    // Use custom render function if provided
    if (renderSelectedIndicator) {
      return renderSelectedIndicator({
        style: StyleSheet.flatten(indicatorStyles),
        animatedStyle,
      });
    }
    
    return (
      <Animated.View
        style={[
          indicatorStyles,
          animatedStyle,
          glowEffect && {
            shadowColor: indicatorColor,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.5,
            shadowRadius: 8,
            elevation: 4,
          },
        ]}
      />
    );
  }, [
    segmentSpacing,
    multiple,
    sizeConfig,
    selectedBackgroundColor,
    finalBorderRadius,
    selectedBorderColor,
    indicatorPosition,
    indicatorWidth,
    indicatorOpacity,
    renderSelectedIndicator,
    glowEffect,
    indicatorColor,
  ]);
  
  return (
    <View
      style={[
        styles.container,
        {
          height: sizeConfig.height,
          backgroundColor: backgroundColor,
          borderRadius: finalBorderRadius,
          borderColor: borderColor,
          borderWidth: 1,
          opacity: disabled ? 0.5 : 1,
        },
        containerStyle,
      ]}
      ref={containerRef}
      onLayout={handleContainerLayout}
      testID={testID}
      accessible={true}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityRole="radiogroup"
    >
      {renderSelectedIndicatorElement()}
      
      <View style={[
        styles.segmentsContainer,
        {
          paddingHorizontal: segmentSpacing > 0 ? 4 : 2,
          paddingVertical: segmentSpacing > 0 ? 4 : 2,
        },
      ]}>
        {options.map((option, index) => renderSegmentElement(option, index))}
      </View>
      
      {loading && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingIndicator} />
        </View>
      )}
    </View>
  );
};

/**
 * Segmented control component styles
 */
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(22, 33, 62, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  
  segmentsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  
  segment: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  
  segmentContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  segmentText: {
    textAlign: 'center',
    color: '#B8B8C0',
    fontWeight: '400',
  },
  
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  selectedIndicator: {
    position: 'absolute',
    top: 2,
    left: 2,
    backgroundColor: '#2E86DE',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(46, 134, 222, 0.3)',
    zIndex: 0,
    shadowColor: '#2E86DE',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 4,
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
    borderRadius: 10,
    zIndex: 2,
  },
  
  loadingIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#2E86DE',
    opacity: 0.7,
  },
});

export default SegmentedControl;