/**
 * Corp Astro UI Library - SelectInput Primitive
 * 
 * Dropdown select input component with glass morphism effects, search functionality,
 * and comprehensive validation states. Provides foundation for all select inputs.
 * 
 * @module SelectInput
 * @version 1.0.0
 * @since 2024
 */

import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Animated,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Modal,
  FlatList,
  AccessibilityProps,
  Platform,
  Dimensions,
  LayoutChangeEvent,
  Keyboard
} from 'react-native';

/**
 * SelectInput size variants
 */
export type SelectInputSize = 'small' | 'medium' | 'large';

/**
 * SelectInput variant styles
 */
export type SelectInputVariant = 'default' | 'outlined' | 'filled' | 'ghost';

/**
 * SelectInput validation state
 */
export type SelectInputValidationState = 'default' | 'error' | 'success' | 'warning';

/**
 * SelectInput option interface
 */
export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  icon?: React.ReactNode;
  description?: string;
}

/**
 * SelectInput component props
 */
export interface SelectInputProps extends AccessibilityProps {
  /** Options for the select dropdown */
  options: SelectOption[];
  /** Currently selected value */
  value?: string | number;
  /** Default selected value */
  defaultValue?: string | number;
  /** Placeholder text */
  placeholder?: string;
  /** Size variant */
  size?: SelectInputSize;
  /** Visual variant */
  variant?: SelectInputVariant;
  /** Validation state */
  validationState?: SelectInputValidationState;
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
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Whether the select is required */
  required?: boolean;
  /** Whether the select is read-only */
  readOnly?: boolean;
  /** Whether the select supports multiple selections */
  multiple?: boolean;
  /** Whether to show search functionality */
  searchable?: boolean;
  /** Search placeholder text */
  searchPlaceholder?: string;
  /** Maximum height for dropdown */
  maxDropdownHeight?: number;
  /** Custom dropdown render position */
  dropdownPosition?: 'auto' | 'top' | 'bottom';
  /** Whether to show clear button */
  clearable?: boolean;
  /** Custom render for selected value */
  renderSelectedValue?: (option: SelectOption) => React.ReactNode;
  /** Custom render for options */
  renderOption?: (option: SelectOption, isSelected: boolean) => React.ReactNode;
  /** Custom render for empty state */
  renderEmpty?: () => React.ReactNode;
  /** Custom styles */
  style?: ViewStyle;
  /** Custom container styles */
  containerStyle?: ViewStyle;
  /** Custom dropdown styles */
  dropdownStyle?: ViewStyle;
  /** Custom label styles */
  labelStyle?: TextStyle;
  /** Custom helper text styles */
  helperTextStyle?: TextStyle;
  /** Test ID for testing */
  testID?: string;
  /** Callback when value changes */
  onValueChange?: (value: string | number | (string | number)[]) => void;
  /** Callback when dropdown opens */
  onDropdownOpen?: () => void;
  /** Callback when dropdown closes */
  onDropdownClose?: () => void;
  /** Callback when search text changes */
  onSearchChange?: (searchText: string) => void;
  /** Callback when focus state changes */
  onFocusChange?: (focused: boolean) => void;
}

/**
 * SelectInput Component
 * 
 * A premium select input component with glass morphism effects, search functionality,
 * and comprehensive validation states.
 * 
 * @example
 * ```tsx
 * <SelectInput
 *   options={[
 *     { label: 'Option 1', value: '1' },
 *     { label: 'Option 2', value: '2' },
 *   ]}
 *   value={selectedValue}
 *   onValueChange={setSelectedValue}
 *   placeholder="Select an option"
 *   label="Select Option"
 * />
 * ```
 */
export const SelectInput: React.FC<SelectInputProps> = ({
  options = [],
  value,
  defaultValue,
  placeholder = 'Select an option',
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
  multiple = false,
  searchable = false,
  searchPlaceholder = 'Search options...',
  maxDropdownHeight = 300,
  dropdownPosition = 'auto',
  clearable = false,
  renderSelectedValue,
  renderOption,
  renderEmpty,
  style,
  containerStyle,
  dropdownStyle,
  labelStyle,
  helperTextStyle,
  onValueChange,
  onDropdownOpen,
  onDropdownClose,
  onSearchChange,
  onFocusChange,
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole = 'button',
  testID,
  ...accessibilityProps
}) => {
  // State management
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedValues, setSelectedValues] = useState<(string | number)[]>(() => {
    if (multiple) {
      return Array.isArray(value) ? value : (value !== undefined ? [value] : []);
    }
    return value !== undefined ? [value] : (defaultValue !== undefined ? [defaultValue] : []);
  });
  const [dropdownLayout, setDropdownLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [containerLayout, setContainerLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });

  // Refs
  const selectRef = useRef<View>(null);
  const searchInputRef = useRef<TextInput>(null);

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const arrowRotation = useRef(new Animated.Value(0)).current;

  // Derived values
  const currentValue = multiple ? selectedValues : selectedValues[0];
  const selectedOption = options.find(option => option.value === currentValue);
  const selectedOptions = multiple ? options.filter(option => selectedValues.includes(option.value)) : [];

  // Filter options based on search
  const filteredOptions = searchable && searchText
    ? options.filter(option => 
        option.label.toLowerCase().includes(searchText.toLowerCase()) ||
        option.description?.toLowerCase().includes(searchText.toLowerCase())
      )
    : options;

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

  // Handle dropdown open/close
  const handleToggleDropdown = useCallback(() => {
    if (disabled || readOnly) return;

    if (isOpen) {
      handleCloseDropdown();
    } else {
      handleOpenDropdown();
    }
  }, [isOpen, disabled, readOnly]);

  const handleOpenDropdown = useCallback(() => {
    setIsOpen(true);
    setSearchText('');
    onDropdownOpen?.();
    onFocusChange?.(true);

    // Animate dropdown appearance
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
      Animated.timing(arrowRotation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    // Focus search input if searchable
    if (searchable) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [fadeAnim, scaleAnim, arrowRotation, onDropdownOpen, onFocusChange, searchable]);

  const handleCloseDropdown = useCallback(() => {
    setIsOpen(false);
    onDropdownClose?.();
    onFocusChange?.(false);
    Keyboard.dismiss();

    // Animate dropdown disappearance
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
      Animated.timing(arrowRotation, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim, arrowRotation, onDropdownClose, onFocusChange]);

  // Handle option selection
  const handleOptionSelect = useCallback((option: SelectOption) => {
    if (option.disabled) return;

    let newValue: string | number | (string | number)[];

    if (multiple) {
      const newValues = selectedValues.includes(option.value)
        ? selectedValues.filter(v => v !== option.value)
        : [...selectedValues, option.value];
      setSelectedValues(newValues);
      newValue = newValues;
    } else {
      setSelectedValues([option.value]);
      newValue = option.value;
      handleCloseDropdown();
    }

    onValueChange?.(newValue);
  }, [multiple, selectedValues, onValueChange, handleCloseDropdown]);

  // Handle clear selection
  const handleClear = useCallback(() => {
    setSelectedValues([]);
    onValueChange?.(multiple ? [] : '' as any);
  }, [multiple, onValueChange]);

  // Handle search change
  const handleSearchChange = useCallback((text: string) => {
    setSearchText(text);
    onSearchChange?.(text);
  }, [onSearchChange]);

  // Handle layout measurement
  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    setContainerLayout({ x, y, width, height });
  }, []);

  // Arrow rotation interpolation
  const arrowRotationInterpolate = arrowRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  // Render selected value
  const renderSelectedValueContent = () => {
    if (renderSelectedValue && selectedOption) {
      return renderSelectedValue(selectedOption);
    }

    if (multiple && selectedOptions.length > 0) {
      if (selectedOptions.length === 1) {
        return (
          <Text style={styles.selectedText} numberOfLines={1}>
            {selectedOptions[0].label}
          </Text>
        );
      } else {
        return (
          <Text style={styles.selectedText} numberOfLines={1}>
            {selectedOptions.length} selected
          </Text>
        );
      }
    }

    if (selectedOption) {
      return (
        <Text style={styles.selectedText} numberOfLines={1}>
          {selectedOption.label}
        </Text>
      );
    }

    return (
      <Text style={styles.placeholder} numberOfLines={1}>
        {placeholder}
      </Text>
    );
  };

  // Render option item
  const renderOptionItem = ({ item: option, index }: { item: SelectOption; index: number }) => {
    const isSelected = selectedValues.includes(option.value);
    
    if (renderOption) {
      return (
        <TouchableOpacity
          style={[
            styles.optionItem,
            isSelected && styles.selectedOption,
            option.disabled && styles.disabledOption,
          ]}
          onPress={() => handleOptionSelect(option)}
          disabled={option.disabled}
          accessibilityRole="button"
          accessibilityState={{ selected: isSelected, disabled: option.disabled }}
        >
          {renderOption(option, isSelected)}
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        style={[
          styles.optionItem,
          isSelected && styles.selectedOption,
          option.disabled && styles.disabledOption,
        ]}
        onPress={() => handleOptionSelect(option)}
        disabled={option.disabled}
        accessibilityRole="button"
        accessibilityState={{ selected: isSelected, disabled: option.disabled }}
      >
        <View style={styles.optionContent}>
          {option.icon && <View style={styles.optionIcon}>{option.icon}</View>}
          <View style={styles.optionTextContainer}>
            <Text style={[
              styles.optionLabel,
              isSelected && styles.selectedOptionLabel,
              option.disabled && styles.disabledOptionLabel,
            ]}>
              {option.label}
            </Text>
            {option.description && (
              <Text style={[
                styles.optionDescription,
                option.disabled && styles.disabledOptionDescription,
              ]}>
                {option.description}
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // Render empty state
  const renderEmptyState = () => {
    if (renderEmpty) {
      return renderEmpty();
    }

    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyText}>
          {searchable && searchText ? 'No results found' : 'No options available'}
        </Text>
      </View>
    );
  };

  // Update selected values when value prop changes
  useEffect(() => {
    if (value !== undefined) {
      if (multiple) {
        setSelectedValues(Array.isArray(value) ? value : [value]);
      } else {
        setSelectedValues([value]);
      }
    }
  }, [value, multiple]);

  return (
    <View style={[styles.container, containerStyle]} onLayout={handleLayout}>
      {/* Label */}
      {label && (
        <Text style={[styles.label, labelStyle]}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}

      {/* Select Input */}
      <TouchableOpacity
        ref={selectRef}
        style={[getContainerStyles(), style]}
        onPress={handleToggleDropdown}
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
        {/* Selected Value */}
        <View style={styles.selectedValueContainer}>
          {renderSelectedValueContent()}
        </View>

        {/* Actions */}
        <View style={styles.actionsContainer}>
          {/* Clear Button */}
          {clearable && selectedValues.length > 0 && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={handleClear}
              accessibilityRole="button"
              accessibilityLabel="Clear selection"
            >
              <Text style={styles.clearIcon}>×</Text>
            </TouchableOpacity>
          )}

          {/* Arrow */}
          <Animated.View
            style={[
              styles.arrow,
              {
                transform: [{ rotate: arrowRotationInterpolate }],
              },
            ]}
          >
            <Text style={styles.arrowIcon}>▼</Text>
          </Animated.View>
        </View>
      </TouchableOpacity>

      {/* Helper Text */}
      {getHelperText() && (
        <Text style={[styles.helperText, styles[`helperText${validationState}`], helperTextStyle]}>
          {getHelperText()}
        </Text>
      )}

      {/* Dropdown Modal */}
      <Modal
        visible={isOpen}
        transparent
        animationType="none"
        onRequestClose={handleCloseDropdown}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={handleCloseDropdown}
        >
          <Animated.View
            style={[
              styles.dropdown,
              dropdownStyle,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
                maxHeight: maxDropdownHeight,
              },
            ]}
          >
            {/* Search Input */}
            {searchable && (
              <View style={styles.searchContainer}>
                <TextInput
                  ref={searchInputRef}
                  style={styles.searchInput}
                  value={searchText}
                  onChangeText={handleSearchChange}
                  placeholder={searchPlaceholder}
                  placeholderTextColor="rgba(255,255,255,0.5)"
                  autoFocus={false}
                />
              </View>
            )}

            {/* Options List */}
            <FlatList
              data={filteredOptions}
              renderItem={renderOptionItem}
              keyExtractor={(item, index) => `${item.value}-${index}`}
              style={styles.optionsList}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={renderEmptyState}
              keyboardShouldPersistTaps="handled"
            />
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
  selectedValueContainer: {
    flex: 1,
    marginRight: 8,
  },
  selectedText: {
    fontSize: 16,
    color: '#F8F9FA',
  },
  placeholder: {
    fontSize: 16,
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
  arrow: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowIcon: {
    fontSize: 12,
    color: '#54A0FF',
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
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    backgroundColor: 'rgba(15,15,26,0.98)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(46,134,222,0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.8,
    shadowRadius: 60,
    elevation: 20,
    marginHorizontal: 20,
    maxWidth: 400,
    minWidth: 280,
  },
  searchContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  searchInput: {
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(22,33,62,0.3)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#F8F9FA',
  },
  optionsList: {
    maxHeight: 250,
  },
  optionItem: {
    height: 48,
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  selectedOption: {
    backgroundColor: 'rgba(46,134,222,0.2)',
  },
  disabledOption: {
    opacity: 0.5,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    marginRight: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionTextContainer: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 16,
    color: '#F8F9FA',
  },
  selectedOptionLabel: {
    color: '#54A0FF',
    fontWeight: '600',
  },
  disabledOptionLabel: {
    color: 'rgba(255,255,255,0.5)',
  },
  optionDescription: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  disabledOptionDescription: {
    color: 'rgba(255,255,255,0.4)',
  },
  emptyState: {
    padding: 32,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.5)',
  },
});

export default SelectInput;
