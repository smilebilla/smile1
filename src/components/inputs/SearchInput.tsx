/**
 * Corp Astro UI Library - SearchInput Primitive
 * 
 * Search input component with search icon, clear button, and debounced input.
 * Provides search functionality with filtering, suggestions, and performance optimization.
 * 
 * @module SearchInput
 * @version 1.0.0
 * @since 2024
 */

import { Search, X } from 'lucide-react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    AccessibilityProps,
    Animated,
    Keyboard,
    NativeSyntheticEvent,
    TextInput as RNTextInput,
    TextInputProps as RNTextInputProps,
    StyleSheet,
    Text,
    TextInputFocusEventData,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle
} from 'react-native';

/**
 * SearchInput size variants
 */
export type SearchInputSize = 'small' | 'medium' | 'large';

/**
 * SearchInput variant styles
 */
export type SearchInputVariant = 'default' | 'outlined' | 'filled' | 'ghost';

/**
 * SearchInput validation state
 */
export type SearchInputValidationState = 'default' | 'error' | 'success' | 'warning';

/**
 * SearchInput label configuration
 */
export interface SearchInputLabelConfig {
  /** Label text */
  text: string;
  /** Floating label behavior */
  floating?: boolean;
  /** Label position */
  position?: 'top' | 'inside';
  /** Label font size */
  fontSize?: number;
  /** Label color */
  color?: string;
}

/**
 * SearchInput suggestion item
 */
export interface SearchInputSuggestionItem {
  /** Suggestion ID */
  id: string;
  /** Suggestion text */
  text: string;
  /** Secondary text */
  secondary?: string;
  /** Suggestion category */
  category?: string;
  /** Icon name */
  icon?: string;
  /** Custom data */
  data?: any;
}

/**
 * SearchInput search configuration
 */
export interface SearchInputSearchConfig {
  /** Debounce delay in milliseconds */
  debounceDelay?: number;
  /** Minimum characters to trigger search */
  minLength?: number;
  /** Maximum number of suggestions */
  maxSuggestions?: number;
  /** Search placeholder text */
  placeholder?: string;
  /** Show search icon */
  showSearchIcon?: boolean;
  /** Show clear button */
  showClearButton?: boolean;
  /** Enable suggestions */
  enableSuggestions?: boolean;
  /** Case sensitive search */
  caseSensitive?: boolean;
  /** Search history */
  enableHistory?: boolean;
  /** Maximum history items */
  maxHistoryItems?: number;
}

/**
 * SearchInput icon configuration
 */
export interface SearchInputIconConfig {
  /** Icon name */
  name: string;
  /** Icon size */
  size?: number;
  /** Icon color */
  color?: string;
  /** Icon position */
  position?: 'left' | 'right';
  /** Icon press handler */
  onPress?: () => void;
  /** Icon accessibility label */
  accessibilityLabel?: string;
}

/**
 * SearchInput helper text configuration
 */
export interface SearchInputHelperConfig {
  /** Helper text */
  text?: string;
  /** Helper text color */
  color?: string;
  /** Helper text font size */
  fontSize?: number;
  /** Show helper text */
  show?: boolean;
}

/**
 * SearchInput props interface
 */
export interface SearchInputProps extends Omit<RNTextInputProps, 'onChangeText'> {
  /** Search value */
  value?: string;
  /** Search change handler */
  onSearchChange?: (query: string) => void;
  /** Search submit handler */
  onSearchSubmit?: (query: string) => void;
  /** Search clear handler */
  onSearchClear?: () => void;
  /** Suggestion select handler */
  onSuggestionSelect?: (suggestion: SearchInputSuggestionItem) => void;
  /** Suggestions data */
  suggestions?: SearchInputSuggestionItem[];
  /** Search history */
  searchHistory?: string[];
  /** Size variant */
  size?: SearchInputSize;
  /** Style variant */
  variant?: SearchInputVariant;
  /** Validation state */
  validationState?: SearchInputValidationState;
  /** Label configuration */
  label?: SearchInputLabelConfig;
  /** Search configuration */
  search?: SearchInputSearchConfig;
  /** Left icon configuration */
  leftIcon?: SearchInputIconConfig;
  /** Right icon configuration */
  rightIcon?: SearchInputIconConfig;
  /** Helper text configuration */
  helper?: SearchInputHelperConfig;
  /** Error message */
  errorMessage?: string;
  /** Success message */
  successMessage?: string;
  /** Warning message */
  warningMessage?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Glass morphism effect */
  glassMorphism?: boolean;
  /** Glow effect */
  glowEffect?: boolean;
  /** Animation enabled */
  animated?: boolean;
  /** Container style */
  containerStyle?: ViewStyle;
  /** Input style */
  inputStyle?: TextStyle;
  /** Label style */
  labelStyle?: TextStyle;
  /** Helper text style */
  helperStyle?: TextStyle;
  /** Suggestions container style */
  suggestionsStyle?: ViewStyle;
  /** Accessibility props */
  accessibilityProps?: AccessibilityProps;
}

/**
 * SearchInput Component
 * 
 * Premium search input with suggestions, history, and debounced search.
 * Provides glass morphism effects, floating labels, and comprehensive search functionality.
 */
export const SearchInput: React.FC<SearchInputProps> = ({
  value = '',
  onSearchChange,
  onSearchSubmit,
  onSearchClear,
  onSuggestionSelect,
  suggestions = [],
  searchHistory = [],
  size = 'medium',
  variant = 'default',
  validationState = 'default',
  label,
  search = {},
  leftIcon,
  rightIcon,
  helper,
  errorMessage,
  successMessage,
  warningMessage,
  disabled = false,
  loading = false,
  glassMorphism = true,
  glowEffect = true,
  animated = true,
  containerStyle,
  inputStyle,
  labelStyle,
  helperStyle,
  suggestionsStyle,
  accessibilityProps,
  ...props
}) => {
  // Search configuration with defaults
  const searchConfig = {
    debounceDelay: 300,
    minLength: 1,
    maxSuggestions: 5,
    placeholder: 'Search...',
    showSearchIcon: true,
    showClearButton: true,
    enableSuggestions: true,
    caseSensitive: false,
    enableHistory: true,
    maxHistoryItems: 10,
    ...search
  };

  // State management
  const [internalValue, setInternalValue] = useState<string>(value);
  const [focused, setFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<SearchInputSuggestionItem[]>([]);
  const [searchTimer, setSearchTimer] = useState<NodeJS.Timeout | null>(null);

  // Refs
  const inputRef = useRef<RNTextInput>(null);
  const focusAnimation = useRef(new Animated.Value(0)).current;
  const scaleAnimation = useRef(new Animated.Value(1)).current;
  const glowAnimation = useRef(new Animated.Value(0)).current;
  const suggestionsAnimation = useRef(new Animated.Value(0)).current;

  // Debounced search handler
  const handleDebouncedSearch = useCallback((query: string) => {
    if (searchTimer) {
      clearTimeout(searchTimer);
    }

    const timer = setTimeout(() => {
      if (query.length >= searchConfig.minLength) {
        onSearchChange?.(query);
        
        // Filter suggestions
        if (searchConfig.enableSuggestions && suggestions.length > 0) {
          const filtered = suggestions.filter(suggestion => {
            const searchText = searchConfig.caseSensitive ? suggestion.text : suggestion.text.toLowerCase();
            const searchQuery = searchConfig.caseSensitive ? query : query.toLowerCase();
            return searchText.includes(searchQuery);
          }).slice(0, searchConfig.maxSuggestions);
          
          setFilteredSuggestions(filtered);
          setShowSuggestions(filtered.length > 0);
        }
      } else {
        setShowSuggestions(false);
        setFilteredSuggestions([]);
      }
    }, searchConfig.debounceDelay);

    setSearchTimer(timer);
  }, [searchConfig, onSearchChange, suggestions, searchTimer]);

  // Handle value change
  const handleValueChange = useCallback((text: string) => {
    setInternalValue(text);
    handleDebouncedSearch(text);
  }, [handleDebouncedSearch]);

  // Handle focus
  const handleFocus = useCallback((e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setFocused(true);
    
    if (animated) {
      Animated.parallel([
        Animated.timing(focusAnimation, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(scaleAnimation, {
          toValue: 1.02,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnimation, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        })
      ]).start();
    }

    // Show suggestions if available
    if (searchConfig.enableSuggestions && (filteredSuggestions.length > 0 || searchHistory.length > 0)) {
      setShowSuggestions(true);
      
      if (animated) {
        Animated.timing(suggestionsAnimation, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }).start();
      }
    }

    props.onFocus?.(e);
  }, [animated, focusAnimation, scaleAnimation, glowAnimation, suggestionsAnimation, searchConfig.enableSuggestions, filteredSuggestions.length, searchHistory.length, props.onFocus]);

  // Handle blur
  const handleBlur = useCallback((e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setFocused(false);
    
    if (animated) {
      Animated.parallel([
        Animated.timing(focusAnimation, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(scaleAnimation, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnimation, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        })
      ]).start();
    }

    // Hide suggestions with delay
    setTimeout(() => {
      setShowSuggestions(false);
      
      if (animated) {
        Animated.timing(suggestionsAnimation, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }).start();
      }
    }, 150);

    props.onBlur?.(e);
  }, [animated, focusAnimation, scaleAnimation, glowAnimation, suggestionsAnimation, props.onBlur]);

  // Handle search submit
  const handleSearchSubmit = useCallback(() => {
    if (internalValue.trim()) {
      onSearchSubmit?.(internalValue.trim());
      setShowSuggestions(false);
      Keyboard.dismiss();
    }
  }, [internalValue, onSearchSubmit]);

  // Handle clear search
  const handleClearSearch = useCallback(() => {
    setInternalValue('');
    setShowSuggestions(false);
    setFilteredSuggestions([]);
    onSearchClear?.();
    inputRef.current?.focus();
  }, [onSearchClear]);

  // Handle suggestion select
  const handleSuggestionSelect = useCallback((suggestion: SearchInputSuggestionItem) => {
    setInternalValue(suggestion.text);
    setShowSuggestions(false);
    onSuggestionSelect?.(suggestion);
    inputRef.current?.blur();
  }, [onSuggestionSelect]);

  // Handle history select
  const handleHistorySelect = useCallback((historyItem: string) => {
    setInternalValue(historyItem);
    setShowSuggestions(false);
    onSearchChange?.(historyItem);
    inputRef.current?.blur();
  }, [onSearchChange]);

  // Initialize internal value
  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  // Cleanup timer
  useEffect(() => {
    return () => {
      if (searchTimer) {
        clearTimeout(searchTimer);
      }
    };
  }, [searchTimer]);

  // Get current validation state
  const getCurrentValidationState = useCallback((): SearchInputValidationState => {
    if (errorMessage) return 'error';
    if (successMessage) return 'success';
    if (warningMessage) return 'warning';
    return validationState;
  }, [errorMessage, successMessage, warningMessage, validationState]);

  // Get current message
  const getCurrentMessage = useCallback((): string => {
    if (errorMessage) return errorMessage;
    if (successMessage) return successMessage;
    if (warningMessage) return warningMessage;
    return helper?.text || '';
  }, [errorMessage, successMessage, warningMessage, helper?.text]);

  // Size configurations
  const sizeConfigs = {
    small: { height: 44, fontSize: 14, paddingHorizontal: 16, borderRadius: 12 },
    medium: { height: 56, fontSize: 16, paddingHorizontal: 20, borderRadius: 16 },
    large: { height: 64, fontSize: 18, paddingHorizontal: 24, borderRadius: 20 }
  };

  const sizeConfig = sizeConfigs[size];
  const currentValidationState = getCurrentValidationState();
  const currentMessage = getCurrentMessage();

  // Styles
  const containerStyles = StyleSheet.create({
    container: {
      position: 'relative',
      width: '100%',
      ...(containerStyle as object),
    },
    labelContainer: {
      marginBottom: label?.position === 'top' ? 8 : 0,
    },
    inputContainer: {
      position: 'relative',
      height: sizeConfig.height,
      borderRadius: sizeConfig.borderRadius,
      backgroundColor: glassMorphism ? 'rgba(22,33,62,0.2)' : 'rgba(255,255,255,0.05)',
      borderWidth: 1,
      borderColor: focused 
        ? (currentValidationState === 'error' ? 'rgba(255,112,82,0.5)' : 'rgba(46,134,222,0.5)')
        : currentValidationState === 'error' 
        ? 'rgba(255,112,82,0.3)'
        : 'rgba(255,255,255,0.1)',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: sizeConfig.paddingHorizontal,
      overflow: 'hidden',
    },
    input: {
      flex: 1,
      height: '100%',
      fontSize: sizeConfig.fontSize,
      color: disabled ? 'rgba(255,255,255,0.3)' : '#FFFFFF',
      fontFamily: 'Inter',
      includeFontPadding: false,
      textAlignVertical: 'center',
      paddingLeft: searchConfig.showSearchIcon ? 8 : 0,
      paddingRight: searchConfig.showClearButton ? 8 : 0,
      ...(inputStyle as object),
    },
    label: {
      fontSize: label?.fontSize || 14,
      fontWeight: '500' as const,
      color: label?.color || '#B8B8C0',
      fontFamily: 'Inter',
      ...(labelStyle as object),
    },
    helperText: {
      fontSize: helper?.fontSize || 12,
      color: currentValidationState === 'error' 
        ? '#FF7052' 
        : currentValidationState === 'success'
        ? '#34D399'
        : currentValidationState === 'warning'
        ? '#FBBF24'
        : helper?.color || '#B8B8C0',
      fontFamily: 'Inter',
      marginTop: 4,
      ...(helperStyle as object),
    },
    iconContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 24,
      height: 24,
    },
    clearButton: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: 'rgba(255,255,255,0.1)',
    },
    glowEffect: {
      position: 'absolute',
      top: -2,
      left: -2,
      right: -2,
      bottom: -2,
      borderRadius: sizeConfig.borderRadius + 2,
      opacity: glowAnimation,
    },
    suggestionsContainer: {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      backgroundColor: 'rgba(15,15,26,0.98)',
      borderRadius: 16,
      marginTop: 8,
      maxHeight: 200,
      borderWidth: 1,
      borderColor: 'rgba(46,134,222,0.3)',
      opacity: suggestionsAnimation,
      zIndex: 1000,
      ...(suggestionsStyle as object),
    },
    suggestionItem: {
      height: 44,
      paddingHorizontal: 16,
      justifyContent: 'center',
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(255,255,255,0.05)',
    },
    suggestionText: {
      fontSize: 16,
      color: '#FFFFFF',
      fontFamily: 'Inter',
    },
    suggestionSecondary: {
      fontSize: 14,
      color: '#B8B8C0',
      fontFamily: 'Inter',
      marginTop: 2,
    },
    historyHeader: {
      height: 32,
      paddingHorizontal: 16,
      justifyContent: 'center',
      backgroundColor: 'rgba(255,255,255,0.02)',
    },
    historyHeaderText: {
      fontSize: 12,
      color: '#B8B8C0',
      fontFamily: 'Inter',
      fontWeight: '500',
    },
  });

  // Glow effect color
  const glowColor = currentValidationState === 'error' 
    ? 'rgba(255,112,82,0.2)'
    : currentValidationState === 'success'
    ? 'rgba(52,211,153,0.2)'
    : 'rgba(46,134,222,0.2)';

  return (
    <View style={containerStyles.container}>
      {/* Label */}
      {label && label.position === 'top' && (
        <View style={containerStyles.labelContainer}>
          <Text style={containerStyles.label}>{label.text}</Text>
        </View>
      )}

      {/* Input Container */}
      <Animated.View 
        style={[
          containerStyles.inputContainer,
          { transform: [{ scale: scaleAnimation }] }
        ]}
      >
        {/* Glow Effect */}
        {glowEffect && focused && (
          <Animated.View 
            style={[
              containerStyles.glowEffect,
              { 
                shadowColor: glowColor,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 1,
                shadowRadius: 8,
                elevation: 8,
              }
            ]} 
          />
        )}

        {/* Search Icon */}
        {searchConfig.showSearchIcon && (
          <View style={containerStyles.iconContainer}>
            <Search size={20} color={focused ? '#54A0FF' : '#B8B8C0'} />
          </View>
        )}

        {/* Input */}
        <RNTextInput
          ref={inputRef}
          value={internalValue}
          onChangeText={handleValueChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onSubmitEditing={handleSearchSubmit}
          style={containerStyles.input}
          placeholder={searchConfig.placeholder}
          placeholderTextColor="rgba(255,255,255,0.4)"
          keyboardType="default"
          returnKeyType="search"
          editable={!disabled && !loading}
          selectTextOnFocus={!disabled}
          accessible={true}
          accessibilityLabel={label?.text || 'Search input'}
          accessibilityHint="Enter text to search"
          accessibilityRole="search"
          accessibilityState={{
            disabled: disabled,
            selected: focused,
          }}
          {...accessibilityProps}
          {...props}
        />

        {/* Clear Button */}
        {searchConfig.showClearButton && internalValue.length > 0 && (
          <TouchableOpacity 
            style={containerStyles.clearButton}
            onPress={handleClearSearch}
            accessible={true}
            accessibilityLabel="Clear search"
            accessibilityRole="button"
          >
            <X size={16} color="#B8B8C0" />
          </TouchableOpacity>
        )}
      </Animated.View>

      {/* Suggestions */}
      {showSuggestions && (
        <Animated.View style={containerStyles.suggestionsContainer}>
          {/* Search History */}
          {searchConfig.enableHistory && searchHistory.length > 0 && internalValue.length === 0 && (
            <>
              <View style={containerStyles.historyHeader}>
                <Text style={containerStyles.historyHeaderText}>RECENT SEARCHES</Text>
              </View>
              {searchHistory.slice(0, searchConfig.maxHistoryItems).map((item, index) => (
                <TouchableOpacity 
                  key={`history-${index}`}
                  style={containerStyles.suggestionItem}
                  onPress={() => handleHistorySelect(item)}
                >
                  <Text style={containerStyles.suggestionText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </>
          )}

          {/* Filtered Suggestions */}
          {filteredSuggestions.map((suggestion, index) => (
            <TouchableOpacity 
              key={suggestion.id || index}
              style={containerStyles.suggestionItem}
              onPress={() => handleSuggestionSelect(suggestion)}
            >
              <Text style={containerStyles.suggestionText}>{suggestion.text}</Text>
              {suggestion.secondary && (
                <Text style={containerStyles.suggestionSecondary}>{suggestion.secondary}</Text>
              )}
            </TouchableOpacity>
          ))}
        </Animated.View>
      )}

      {/* Helper Text */}
      {(currentMessage || helper?.show) && (
        <Text style={containerStyles.helperText}>
          {currentMessage}
        </Text>
      )}
    </View>
  );
};

// Default export
export default SearchInput;
