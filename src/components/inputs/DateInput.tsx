/**
 * Corp Astro UI Library - DateInput Primitive
 * 
 * Date input component with calendar picker, glass morphism effects,
 * and comprehensive validation states. Provides foundation for all date inputs.
 * 
 * @module DateInput
 * @version 1.0.0
 * @since 2024
 */

import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  StyleSheet,
  ViewStyle,
  TextStyle,
  AccessibilityProps,
  Platform,
  Alert
} from 'react-native';

/**
 * DateInput size variants
 */
export type DateInputSize = 'small' | 'medium' | 'large';

/**
 * DateInput variant styles
 */
export type DateInputVariant = 'default' | 'outlined' | 'filled' | 'ghost';

/**
 * DateInput validation state
 */
export type DateInputValidationState = 'default' | 'error' | 'success' | 'warning';

/**
 * DateInput format options
 */
export type DateInputFormat = 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD' | 'DD MMM YYYY' | 'MMM DD, YYYY';

/**
 * DateInput mode
 */
export type DateInputMode = 'date' | 'datetime' | 'time';

/**
 * DateInput component props
 */
export interface DateInputProps extends AccessibilityProps {
  /** Currently selected date */
  value?: Date;
  /** Default selected date */
  defaultValue?: Date;
  /** Placeholder text */
  placeholder?: string;
  /** Size variant */
  size?: DateInputSize;
  /** Visual variant */
  variant?: DateInputVariant;
  /** Validation state */
  validationState?: DateInputValidationState;
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
  /** Date format */
  format?: DateInputFormat;
  /** Input mode */
  mode?: DateInputMode;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Whether to show clear button */
  clearable?: boolean;
  /** Whether to show today button */
  showToday?: boolean;
  /** Custom today button text */
  todayButtonText?: string;
  /** Custom date validation function */
  isDateValid?: (date: Date) => boolean;
  /** Custom date formatter function */
  formatDate?: (date: Date) => string;
  /** Custom date parser function */
  parseDate?: (dateString: string) => Date | null;
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
  /** Callback when date changes */
  onDateChange?: (date: Date | null) => void;
  /** Callback when picker opens */
  onPickerOpen?: () => void;
  /** Callback when picker closes */
  onPickerClose?: () => void;
  /** Callback when focus state changes */
  onFocusChange?: (focused: boolean) => void;
}

/**
 * DateInput Component
 * 
 * A premium date input component with calendar picker, glass morphism effects,
 * and comprehensive validation states.
 * 
 * @example
 * ```tsx
 * <DateInput
 *   value={selectedDate}
 *   onDateChange={setSelectedDate}
 *   placeholder="Select date"
 *   label="Date"
 *   format="MM/DD/YYYY"
 * />
 * ```
 */
export const DateInput: React.FC<DateInputProps> = ({
  value,
  defaultValue,
  placeholder = 'Select date',
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
  format = 'MM/DD/YYYY',
  mode = 'date',
  minDate,
  maxDate,
  clearable = false,
  showToday = true,
  todayButtonText = 'Today',
  isDateValid,
  formatDate,
  parseDate,
  style,
  containerStyle,
  pickerStyle,
  labelStyle,
  helperTextStyle,
  testID,
  onDateChange,
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
  const [selectedDate, setSelectedDate] = useState<Date | null>(value || defaultValue || null);
  const [currentMonth, setCurrentMonth] = useState<Date>(() => {
    const today = new Date();
    return value || defaultValue || today;
  });

  // Refs
  const inputRef = useRef<View>(null);

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const focusAnim = useRef(new Animated.Value(0)).current;

  // Date utilities
  const formatDateValue = useCallback((date: Date) => {
    if (formatDate) {
      return formatDate(date);
    }

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const monthNamesLong = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    switch (format) {
      case 'MM/DD/YYYY':
        return `${month}/${day}/${year}`;
      case 'DD/MM/YYYY':
        return `${day}/${month}/${year}`;
      case 'YYYY-MM-DD':
        return `${year}-${month}-${day}`;
      case 'DD MMM YYYY':
        return `${day} ${monthNames[date.getMonth()]} ${year}`;
      case 'MMM DD, YYYY':
        return `${monthNames[date.getMonth()]} ${day}, ${year}`;
      default:
        return `${month}/${day}/${year}`;
    }
  }, [format, formatDate]);

  const isValidDate = useCallback((date: Date) => {
    if (isDateValid) {
      return isDateValid(date);
    }

    if (minDate && date < minDate) return false;
    if (maxDate && date > maxDate) return false;
    return true;
  }, [isDateValid, minDate, maxDate]);

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
  }, [fadeAnim, scaleAnim, focusAnim, onPickerOpen, onFocusChange]);

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

  // Handle date selection
  const handleDateSelect = useCallback((date: Date) => {
    if (!isValidDate(date)) return;

    setSelectedDate(date);
    onDateChange?.(date);
    handleClosePicker();
  }, [isValidDate, onDateChange, handleClosePicker]);

  // Handle today button
  const handleTodayPress = useCallback(() => {
    const today = new Date();
    if (isValidDate(today)) {
      handleDateSelect(today);
    } else {
      Alert.alert('Invalid Date', 'Today\'s date is not within the allowed range.');
    }
  }, [isValidDate, handleDateSelect]);

  // Handle clear button
  const handleClear = useCallback(() => {
    setSelectedDate(null);
    onDateChange?.(null);
  }, [onDateChange]);

  // Handle month navigation
  const handlePrevMonth = useCallback(() => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(newMonth.getMonth() - 1);
      return newMonth;
    });
  }, []);

  const handleNextMonth = useCallback(() => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(newMonth.getMonth() + 1);
      return newMonth;
    });
  }, []);

  // Generate calendar days
  const generateCalendarDays = useCallback(() => {
    const days: Date[] = [];
    const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }

    return days;
  }, [currentMonth]);

  // Update selected date when value prop changes
  useEffect(() => {
    if (value !== undefined) {
      setSelectedDate(value);
    }
  }, [value]);

  // Update current month when selected date changes
  useEffect(() => {
    if (selectedDate && selectedDate instanceof Date) {
      setCurrentMonth(selectedDate);
    }
  }, [selectedDate]);

  const calendarDays = generateCalendarDays();

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Label */}
      {label && (
        <Text style={[styles.label, labelStyle]}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}

      {/* Date Input */}
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
        {/* Date Value */}
        <View style={styles.dateValueContainer}>
          <Text style={[
            styles.dateValue,
            !selectedDate && styles.placeholder,
          ]}>
            {selectedDate ? formatDateValue(selectedDate) : placeholder}
          </Text>
        </View>

        {/* Actions */}
        <View style={styles.actionsContainer}>
          {/* Clear Button */}
          {clearable && selectedDate && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={handleClear}
              accessibilityRole="button"
              accessibilityLabel="Clear date"
            >
              <Text style={styles.clearIcon}>×</Text>
            </TouchableOpacity>
          )}

          {/* Calendar Icon */}
          <View style={styles.calendarIcon}>
            <Text style={styles.calendarIconText}>📅</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Helper Text */}
      {getHelperText() && (
        <Text style={[styles.helperText, styles[`helperText${validationState}`], helperTextStyle]}>
          {getHelperText()}
        </Text>
      )}

      {/* Date Picker Modal */}
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
              <TouchableOpacity
                style={styles.navButton}
                onPress={handlePrevMonth}
                accessibilityRole="button"
                accessibilityLabel="Previous month"
              >
                <Text style={styles.navButtonText}>‹</Text>
              </TouchableOpacity>

              <Text style={styles.monthYear}>
                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </Text>

              <TouchableOpacity
                style={styles.navButton}
                onPress={handleNextMonth}
                accessibilityRole="button"
                accessibilityLabel="Next month"
              >
                <Text style={styles.navButtonText}>›</Text>
              </TouchableOpacity>
            </View>

            {/* Days of Week */}
            <View style={styles.daysOfWeek}>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <View key={day} style={styles.dayOfWeekItem}>
                  <Text style={styles.dayOfWeekText}>{day}</Text>
                </View>
              ))}
            </View>

            {/* Calendar Grid */}
            <View style={styles.calendarGrid}>
              {calendarDays.map((date, index) => {
                const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
                const isSelected = selectedDate && 
                  date.toDateString() === selectedDate.toDateString();
                const isToday = date.toDateString() === new Date().toDateString();
                const isDisabled = !isValidDate(date);

                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.calendarDay,
                      !isCurrentMonth && styles.calendarDayOtherMonth,
                      isSelected && styles.calendarDaySelected,
                      isToday && styles.calendarDayToday,
                      isDisabled && styles.calendarDayDisabled,
                    ]}
                    onPress={() => handleDateSelect(date)}
                    disabled={isDisabled}
                    accessibilityRole="button"
                    accessibilityLabel={date.toDateString()}
                    accessibilityState={{ selected: !!isSelected, disabled: isDisabled }}
                  >
                    <Text style={[
                      styles.calendarDayText,
                      !isCurrentMonth && styles.calendarDayTextOtherMonth,
                      isSelected && styles.calendarDayTextSelected,
                      isToday && styles.calendarDayTextToday,
                      isDisabled && styles.calendarDayTextDisabled,
                    ]}>
                      {date.getDate()}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Footer */}
            <View style={styles.pickerFooter}>
              {showToday && (
                <TouchableOpacity
                  style={styles.todayButton}
                  onPress={handleTodayPress}
                  accessibilityRole="button"
                  accessibilityLabel="Select today"
                >
                  <Text style={styles.todayButtonText}>{todayButtonText}</Text>
                </TouchableOpacity>
              )}
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
  dateValueContainer: {
    flex: 1,
    marginRight: 8,
  },
  dateValue: {
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
  calendarIcon: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarIconText: {
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
    maxWidth: 350,
    minWidth: 300,
  },
  pickerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  navButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(46,134,222,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonText: {
    fontSize: 24,
    color: '#54A0FF',
    fontWeight: 'bold',
  },
  monthYear: {
    fontSize: 18,
    fontWeight: '600',
    color: '#F8F9FA',
  },
  daysOfWeek: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  dayOfWeekItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  dayOfWeekText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '600',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
  },
  calendarDay: {
    width: '14.28%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginBottom: 4,
  },
  calendarDayOtherMonth: {
    opacity: 0.3,
  },
  calendarDaySelected: {
    backgroundColor: '#54A0FF',
  },
  calendarDayToday: {
    backgroundColor: 'rgba(46,134,222,0.2)',
  },
  calendarDayDisabled: {
    opacity: 0.3,
  },
  calendarDayText: {
    fontSize: 16,
    color: '#F8F9FA',
    fontWeight: '500',
  },
  calendarDayTextOtherMonth: {
    color: 'rgba(255,255,255,0.3)',
  },
  calendarDayTextSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  calendarDayTextToday: {
    color: '#54A0FF',
    fontWeight: '600',
  },
  calendarDayTextDisabled: {
    color: 'rgba(255,255,255,0.3)',
  },
  pickerFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
  },
  todayButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: 'rgba(46,134,222,0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(46,134,222,0.3)',
  },
  todayButtonText: {
    fontSize: 16,
    color: '#54A0FF',
    fontWeight: '600',
  },
});

export default DateInput;
