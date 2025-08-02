/**
 * Corp Astro UI Library - TimeInput Primitive
 * 
 * Time input component with time picker, glass morphism effects,
 * and comprehensive validation states. Provides foundation for all time inputs.
 * 
 * @module TimeInput
 * @version 1.0.0
 * @since 2024
 */

import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  Animated,
  StyleSheet,
  ViewStyle,
  TextStyle,
  AccessibilityProps,
  Platform,
  Dimensions
} from 'react-native';

/**
 * TimeInput size variants
 */
export type TimeInputSize = 'small' | 'medium' | 'large';

/**
 * TimeInput variant styles
 */
export type TimeInputVariant = 'default' | 'outlined' | 'filled' | 'ghost';

/**
 * TimeInput validation state
 */
export type TimeInputValidationState = 'default' | 'error' | 'success' | 'warning';

/**
 * TimeInput format options
 */
export type TimeInputFormat = '12h' | '24h';

/**
 * TimeInput mode
 */
export type TimeInputMode = 'time' | 'duration';

/**
 * Time object interface
 */
export interface TimeValue {
  hours: number;
  minutes: number;
  seconds?: number;
  period?: 'AM' | 'PM';
}

/**
 * TimeInput component props
 */
export interface TimeInputProps extends AccessibilityProps {
  /** Currently selected time */
  value?: TimeValue;
  /** Default selected time */
  defaultValue?: TimeValue;
  /** Placeholder text */
  placeholder?: string;
  /** Size variant */
  size?: TimeInputSize;
  /** Visual variant */
  variant?: TimeInputVariant;
  /** Validation state */
  validationState?: TimeInputValidationState;
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
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether the input is required */
  required?: boolean;
  /** Whether the input is read-only */
  readOnly?: boolean;
  /** Time format */
  format?: TimeInputFormat;
  /** Input mode */
  mode?: TimeInputMode;
  /** Whether to show seconds */
  showSeconds?: boolean;
  /** Step for minutes (e.g., 15 for quarter-hour intervals) */
  minuteStep?: number;
  /** Step for seconds */
  secondStep?: number;
  /** Minimum selectable time */
  minTime?: TimeValue;
  /** Maximum selectable time */
  maxTime?: TimeValue;
  /** Whether to show clear button */
  clearable?: boolean;
  /** Whether to show now button */
  showNow?: boolean;
  /** Custom now button text */
  nowButtonText?: string;
  /** Custom time validation function */
  isTimeValid?: (time: TimeValue) => boolean;
  /** Custom time formatter function */
  formatTime?: (time: TimeValue) => string;
  /** Custom time parser function */
  parseTime?: (timeString: string) => TimeValue | null;
  /** Custom styles */
  style?: ViewStyle;
  /** Custom container styles */
  containerStyle?: ViewStyle;
  /** Custom picker styles */
  pickerStyle?: ViewStyle;
  /** Custom label styles */
  labelStyle?: TextStyle;
  /** Custom helper text styles */
  helperTextStyle?: TextStyle;
  /** Test ID for testing */
  testID?: string;
  /** Callback when time changes */
  onTimeChange?: (time: TimeValue | null) => void;
  /** Callback when picker opens */
  onPickerOpen?: () => void;
  /** Callback when picker closes */
  onPickerClose?: () => void;
  /** Callback when focus state changes */
  onFocusChange?: (focused: boolean) => void;
}

/**
 * TimeInput Component
 * 
 * A premium time input component with time picker, glass morphism effects,
 * and comprehensive validation states.
 * 
 * @example
 * ```tsx
 * <TimeInput
 *   value={{ hours: 14, minutes: 30 }}
 *   onTimeChange={setTime}
 *   placeholder="Select time"
 *   label="Time"
 *   format="12h"
 * />
 * ```
 */
export const TimeInput: React.FC<TimeInputProps> = ({
  value,
  defaultValue,
  placeholder = 'Select time',
  size = 'medium',
  variant = 'default',
  validationState = 'default',
  label,
  helperText,
  errorMessage,
  successMessage,
  warningMessage,
  disabled = false,
  required = false,
  readOnly = false,
  format = '12h',
  mode = 'time',
  showSeconds = false,
  minuteStep = 1,
  secondStep = 1,
  minTime,
  maxTime,
  clearable = false,
  showNow = true,
  nowButtonText = 'Now',
  isTimeValid,
  formatTime,
  parseTime,
  style,
  containerStyle,
  pickerStyle,
  labelStyle,
  helperTextStyle,
  testID,
  onTimeChange,
  onPickerOpen,
  onPickerClose,
  onFocusChange,
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole = 'button',
  ...accessibilityProps
}) => {
  // State management
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState<TimeValue | null>(value || defaultValue || null);
  const [tempTime, setTempTime] = useState<TimeValue>(() => {
    const now = new Date();
    return {
      hours: format === '12h' ? (now.getHours() % 12 || 12) : now.getHours(),
      minutes: now.getMinutes(),
      seconds: showSeconds ? now.getSeconds() : undefined,
      period: format === '12h' ? (now.getHours() >= 12 ? 'PM' : 'AM') : undefined,
    };
  });

  // Refs
  const inputRef = useRef<View>(null);
  const hourScrollRef = useRef<ScrollView>(null);
  const minuteScrollRef = useRef<ScrollView>(null);
  const secondScrollRef = useRef<ScrollView>(null);
  const periodScrollRef = useRef<ScrollView>(null);

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const focusAnim = useRef(new Animated.Value(0)).current;

  // Time utilities
  const formatTimeValue = useCallback((time: TimeValue) => {
    if (formatTime) {
      return formatTime(time);
    }

    const hours = time.hours.toString().padStart(2, '0');
    const minutes = time.minutes.toString().padStart(2, '0');
    const seconds = time.seconds?.toString().padStart(2, '0');
    const period = time.period;

    if (format === '12h') {
      let timeString = `${hours}:${minutes}`;
      if (showSeconds && seconds) {
        timeString += `:${seconds}`;
      }
      if (period) {
        timeString += ` ${period}`;
      }
      return timeString;
    } else {
      let timeString = `${hours}:${minutes}`;
      if (showSeconds && seconds) {
        timeString += `:${seconds}`;
      }
      return timeString;
    }
  }, [format, showSeconds, formatTime]);

  const isValidTime = useCallback((time: TimeValue) => {
    if (isTimeValid) {
      return isTimeValid(time);
    }

    // Convert to 24-hour format for comparison
    let hours24 = time.hours;
    if (format === '12h' && time.period === 'PM' && time.hours !== 12) {
      hours24 += 12;
    } else if (format === '12h' && time.period === 'AM' && time.hours === 12) {
      hours24 = 0;
    }

    const timeMinutes = hours24 * 60 + time.minutes;

    if (minTime) {
      let minHours24 = minTime.hours;
      if (format === '12h' && minTime.period === 'PM' && minTime.hours !== 12) {
        minHours24 += 12;
      } else if (format === '12h' && minTime.period === 'AM' && minTime.hours === 12) {
        minHours24 = 0;
      }
      const minMinutes = minHours24 * 60 + minTime.minutes;
      if (timeMinutes < minMinutes) return false;
    }

    if (maxTime) {
      let maxHours24 = maxTime.hours;
      if (format === '12h' && maxTime.period === 'PM' && maxTime.hours !== 12) {
        maxHours24 += 12;
      } else if (format === '12h' && maxTime.period === 'AM' && maxTime.hours === 12) {
        maxHours24 = 0;
      }
      const maxMinutes = maxHours24 * 60 + maxTime.minutes;
      if (timeMinutes > maxMinutes) return false;
    }

    return true;
  }, [isTimeValid, minTime, maxTime, format]);

  // Helper text based on validation state
  const getHelperText = () => {
    switch (validationState) {
      case 'error':
        return errorMessage || helperText;
      case 'success':
        return successMessage || helperText;
      case 'warning':
        return warningMessage || helperText;
      default:
        return helperText;
    }
  };

  // Get container styles
  const getContainerStyles = (): ViewStyle => {
    const baseStyles: ViewStyle = {
      minHeight: getSizeValue('height'),
      borderRadius: 16,
      backgroundColor: 'rgba(22,33,62,0.2)',
      borderWidth: 1,
      borderColor: getBorderColor(),
      paddingHorizontal: 16,
      paddingVertical: 12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    };

    if (disabled) {
      baseStyles.opacity = 0.5;
    }

    return baseStyles;
  };

  // Get border color based on state
  const getBorderColor = () => {
    if (isOpen) return 'rgba(46,134,222,0.5)';
    
    switch (validationState) {
      case 'error':
        return 'rgba(255,107,107,0.5)';
      case 'success':
        return 'rgba(46,204,113,0.5)';
      case 'warning':
        return 'rgba(255,193,7,0.5)';
      default:
        return 'rgba(255,255,255,0.1)';
    }
  };

  // Get size-specific values
  const getSizeValue = (property: 'height' | 'fontSize' | 'padding') => {
    const sizes = {
      small: { height: 44, fontSize: 14, padding: 12 },
      medium: { height: 56, fontSize: 16, padding: 16 },
      large: { height: 64, fontSize: 18, padding: 20 },
    };
    return sizes[size][property];
  };

  // Handle picker open/close
  const handleTogglePicker = useCallback(() => {
    if (disabled || readOnly) return;

    if (isOpen) {
      handleClosePicker();
    } else {
      handleOpenPicker();
    }
  }, [isOpen, disabled, readOnly]);

  const handleOpenPicker = useCallback(() => {
    setIsOpen(true);
    if (selectedTime) {
      setTempTime(selectedTime);
    }
    onPickerOpen?.();
    onFocusChange?.(true);

    // Animate picker appearance
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(focusAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim, focusAnim, selectedTime, onPickerOpen, onFocusChange]);

  const handleClosePicker = useCallback(() => {
    setIsOpen(false);
    onPickerClose?.();
    onFocusChange?.(false);

    // Animate picker disappearance
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(focusAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim, focusAnim, onPickerClose, onFocusChange]);

  // Handle time selection
  const handleTimeConfirm = useCallback(() => {
    if (!isValidTime(tempTime)) return;

    setSelectedTime(tempTime);
    onTimeChange?.(tempTime);
    handleClosePicker();
  }, [tempTime, isValidTime, onTimeChange, handleClosePicker]);

  // Handle now button
  const handleNowPress = useCallback(() => {
    const now = new Date();
    const nowTime: TimeValue = {
      hours: format === '12h' ? (now.getHours() % 12 || 12) : now.getHours(),
      minutes: now.getMinutes(),
      seconds: showSeconds ? now.getSeconds() : undefined,
      period: format === '12h' ? (now.getHours() >= 12 ? 'PM' : 'AM') : undefined,
    };

    if (isValidTime(nowTime)) {
      setTempTime(nowTime);
    }
  }, [format, showSeconds, isValidTime]);

  // Handle clear button
  const handleClear = useCallback(() => {
    setSelectedTime(null);
    onTimeChange?.(null);
  }, [onTimeChange]);

  // Generate time values
  const generateHours = () => {
    const hours = [];
    const maxHours = format === '12h' ? 12 : 23;
    const startHour = format === '12h' ? 1 : 0;

    for (let i = startHour; i <= maxHours; i++) {
      hours.push(i);
    }
    return hours;
  };

  const generateMinutes = () => {
    const minutes = [];
    for (let i = 0; i < 60; i += minuteStep) {
      minutes.push(i);
    }
    return minutes;
  };

  const generateSeconds = () => {
    const seconds = [];
    for (let i = 0; i < 60; i += secondStep) {
      seconds.push(i);
    }
    return seconds;
  };

  const generatePeriods = (): ('AM' | 'PM')[] => ['AM', 'PM'];

  // Handle scroll changes
  const handleHourChange = useCallback((hour: number) => {
    setTempTime(prev => ({ ...prev, hours: hour }));
  }, []);

  const handleMinuteChange = useCallback((minute: number) => {
    setTempTime(prev => ({ ...prev, minutes: minute }));
  }, []);

  const handleSecondChange = useCallback((second: number) => {
    setTempTime(prev => ({ ...prev, seconds: second }));
  }, []);

  const handlePeriodChange = useCallback((period: 'AM' | 'PM') => {
    setTempTime(prev => ({ ...prev, period }));
  }, []);

  // Update selected time when value prop changes
  useEffect(() => {
    if (value !== undefined) {
      setSelectedTime(value);
    }
  }, [value]);

  const hours = generateHours();
  const minutes = generateMinutes();
  const seconds = generateSeconds();
  const periods = generatePeriods();

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Label */}
      {label && (
        <Text style={[styles.label, labelStyle]}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}

      {/* Time Input */}
      <TouchableOpacity
        ref={inputRef}
        style={[getContainerStyles(), style]}
        onPress={handleTogglePicker}
        disabled={disabled}
        accessibilityRole={accessibilityRole}
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
        accessibilityState={{
          expanded: isOpen,
          disabled,
        }}
        testID={testID}
        {...accessibilityProps}
      >
        {/* Time Value */}
        <View style={styles.timeValueContainer}>
          <Text style={[
            styles.timeValue,
            !selectedTime && styles.placeholder,
          ]}>
            {selectedTime ? formatTimeValue(selectedTime) : placeholder}
          </Text>
        </View>

        {/* Actions */}
        <View style={styles.actionsContainer}>
          {/* Clear Button */}
          {clearable && selectedTime && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={handleClear}
              accessibilityRole="button"
              accessibilityLabel="Clear time"
            >
              <Text style={styles.clearIcon}>×</Text>
            </TouchableOpacity>
          )}

          {/* Clock Icon */}
          <View style={styles.clockIcon}>
            <Text style={styles.clockIconText}>🕐</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Helper Text */}
      {getHelperText() && (
        <Text style={[styles.helperText, styles[`helperText${validationState}`], helperTextStyle]}>
          {getHelperText()}
        </Text>
      )}

      {/* Time Picker Modal */}
      <Modal
        visible={isOpen}
        transparent
        animationType="none"
        onRequestClose={handleClosePicker}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={handleClosePicker}
        >
          <Animated.View
            style={[
              styles.picker,
              pickerStyle,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            {/* Header */}
            <View style={styles.pickerHeader}>
              <Text style={styles.pickerTitle}>Select Time</Text>
              {showNow && (
                <TouchableOpacity
                  style={styles.nowButton}
                  onPress={handleNowPress}
                  accessibilityRole="button"
                  accessibilityLabel="Select current time"
                >
                  <Text style={styles.nowButtonText}>{nowButtonText}</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Time Display */}
            <View style={styles.timeDisplay}>
              <Text style={styles.timeDisplayText}>
                {formatTimeValue(tempTime)}
              </Text>
            </View>

            {/* Time Pickers */}
            <View style={styles.timePickers}>
              {/* Hour Picker */}
              <View style={styles.timePickerColumn}>
                <Text style={styles.timePickerLabel}>Hour</Text>
                <ScrollView
                  ref={hourScrollRef}
                  style={styles.timePickerScroll}
                  showsVerticalScrollIndicator={false}
                  snapToInterval={40}
                  decelerationRate="fast"
                >
                  {hours.map((hour) => (
                    <TouchableOpacity
                      key={hour}
                      style={[
                        styles.timePickerItem,
                        tempTime.hours === hour && styles.timePickerItemSelected,
                      ]}
                      onPress={() => handleHourChange(hour)}
                    >
                      <Text style={[
                        styles.timePickerItemText,
                        tempTime.hours === hour && styles.timePickerItemTextSelected,
                      ]}>
                        {hour.toString().padStart(2, '0')}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Minute Picker */}
              <View style={styles.timePickerColumn}>
                <Text style={styles.timePickerLabel}>Minute</Text>
                <ScrollView
                  ref={minuteScrollRef}
                  style={styles.timePickerScroll}
                  showsVerticalScrollIndicator={false}
                  snapToInterval={40}
                  decelerationRate="fast"
                >
                  {minutes.map((minute) => (
                    <TouchableOpacity
                      key={minute}
                      style={[
                        styles.timePickerItem,
                        tempTime.minutes === minute && styles.timePickerItemSelected,
                      ]}
                      onPress={() => handleMinuteChange(minute)}
                    >
                      <Text style={[
                        styles.timePickerItemText,
                        tempTime.minutes === minute && styles.timePickerItemTextSelected,
                      ]}>
                        {minute.toString().padStart(2, '0')}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Second Picker */}
              {showSeconds && (
                <View style={styles.timePickerColumn}>
                  <Text style={styles.timePickerLabel}>Second</Text>
                  <ScrollView
                    ref={secondScrollRef}
                    style={styles.timePickerScroll}
                    showsVerticalScrollIndicator={false}
                    snapToInterval={40}
                    decelerationRate="fast"
                  >
                    {seconds.map((second) => (
                      <TouchableOpacity
                        key={second}
                        style={[
                          styles.timePickerItem,
                          tempTime.seconds === second && styles.timePickerItemSelected,
                        ]}
                        onPress={() => handleSecondChange(second)}
                      >
                        <Text style={[
                          styles.timePickerItemText,
                          tempTime.seconds === second && styles.timePickerItemTextSelected,
                        ]}>
                          {second.toString().padStart(2, '0')}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}

              {/* Period Picker */}
              {format === '12h' && (
                <View style={styles.timePickerColumn}>
                  <Text style={styles.timePickerLabel}>Period</Text>
                  <ScrollView
                    ref={periodScrollRef}
                    style={styles.timePickerScroll}
                    showsVerticalScrollIndicator={false}
                    snapToInterval={40}
                    decelerationRate="fast"
                  >
                    {periods.map((period) => (
                      <TouchableOpacity
                        key={period}
                        style={[
                          styles.timePickerItem,
                          tempTime.period === period && styles.timePickerItemSelected,
                        ]}
                        onPress={() => handlePeriodChange(period)}
                      >
                        <Text style={[
                          styles.timePickerItemText,
                          tempTime.period === period && styles.timePickerItemTextSelected,
                        ]}>
                          {period}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}
            </View>

            {/* Footer */}
            <View style={styles.pickerFooter}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleClosePicker}
                accessibilityRole="button"
                accessibilityLabel="Cancel"
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.confirmButton,
                  !isValidTime(tempTime) && styles.confirmButtonDisabled,
                ]}
                onPress={handleTimeConfirm}
                disabled={!isValidTime(tempTime)}
                accessibilityRole="button"
                accessibilityLabel="Confirm time selection"
              >
                <Text style={[
                  styles.confirmButtonText,
                  !isValidTime(tempTime) && styles.confirmButtonTextDisabled,
                ]}>
                  Confirm
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

/**
 * Styles
 */
const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F8F9FA',
    marginBottom: 8,
  },
  required: {
    color: '#FF6B6B',
  },
  timeValueContainer: {
    flex: 1,
    marginRight: 8,
  },
  timeValue: {
    fontSize: 16,
    color: '#F8F9FA',
  },
  placeholder: {
    color: 'rgba(255,255,255,0.5)',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clearButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  clearIcon: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: 'bold',
  },
  clockIcon: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clockIconText: {
    fontSize: 16,
  },
  helperText: {
    fontSize: 14,
    marginTop: 4,
    color: 'rgba(255,255,255,0.7)',
  },
  helperTextdefault: {
    color: 'rgba(255,255,255,0.7)',
  },
  helperTexterror: {
    color: '#FF6B6B',
  },
  helperTextsuccess: {
    color: '#2ECC71',
  },
  helperTextwarning: {
    color: '#F39C12',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
    backgroundColor: 'rgba(15,15,26,0.98)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(46,134,222,0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.8,
    shadowRadius: 60,
    elevation: 20,
    marginHorizontal: 20,
    maxWidth: 400,
    minWidth: 320,
  },
  pickerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  pickerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#F8F9FA',
  },
  nowButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(46,134,222,0.1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(46,134,222,0.3)',
  },
  nowButtonText: {
    fontSize: 14,
    color: '#54A0FF',
    fontWeight: '600',
  },
  timeDisplay: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  timeDisplayText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#54A0FF',
  },
  timePickers: {
    flexDirection: 'row',
    padding: 20,
    minHeight: 200,
  },
  timePickerColumn: {
    flex: 1,
    marginHorizontal: 4,
  },
  timePickerLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: '600',
  },
  timePickerScroll: {
    maxHeight: 160,
  },
  timePickerItem: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 2,
  },
  timePickerItemSelected: {
    backgroundColor: 'rgba(46,134,222,0.2)',
  },
  timePickerItemText: {
    fontSize: 16,
    color: '#F8F9FA',
    fontWeight: '500',
  },
  timePickerItemTextSelected: {
    color: '#54A0FF',
    fontWeight: '600',
  },
  pickerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  cancelButton: {
    flex: 1,
    marginRight: 8,
    paddingVertical: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '600',
  },
  confirmButton: {
    flex: 1,
    marginLeft: 8,
    paddingVertical: 12,
    backgroundColor: '#54A0FF',
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmButtonDisabled: {
    backgroundColor: 'rgba(84,160,255,0.3)',
  },
  confirmButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  confirmButtonTextDisabled: {
    color: 'rgba(255,255,255,0.5)',
  },
});

export default TimeInput;
