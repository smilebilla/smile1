/**
 * Corp Astro UI Library - Search Header Component
 * 
 * Professional search header component providing advanced search functionality
 * with Corp Astro design system integration and space-inspired aesthetics.
 * Creates immersive search experiences with smooth animations and intelligent features.
 * 
 * Features:
 * - Multiple search header variants and layouts
 * - Advanced search input with real-time filtering
 * - Search suggestions and autocomplete
 * - Voice search integration capability
 * - Search history and recent searches
 * - Filter integration and advanced options
 * - Theme-aware styling with Corp Astro design tokens
 * - Responsive design with adaptive sizing
 * - Smooth animations and transitions
 * - Accessibility compliance with ARIA attributes
 * - Platform-specific optimizations
 * - Custom styling and theming
 * 
 * @module SearchHeader
 * @version 1.0.0
 * @author Corp Astro Design System
 * @since 2024
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Animated,
  Platform,
  ViewStyle,
  TextStyle,
  ColorValue,
  Dimensions,
  FlatList,
  Keyboard,
} from 'react-native';
import { useTheme } from '../../../foundations/themes/useTheme';
import { deepSpaceColors } from '../../../foundations/tokens/colors/DeepSpaceColors';
import { SignatureBlues } from '../../../foundations/tokens/colors/SignatureBlues';
import { LuxuryGolds } from '../../../foundations/tokens/colors/LuxuryGolds';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Search header variants
 */
export type SearchHeaderVariant = 'default' | 'prominent' | 'minimal' | 'floating' | 'overlay';

/**
 * Search header sizes
 */
export type SearchHeaderSize = 'small' | 'medium' | 'large';

/**
 * Search header animation types
 */
export type SearchHeaderAnimation = 'fade' | 'slide' | 'scale' | 'elastic' | 'none';

/**
 * Search suggestion item
 */
export interface SearchSuggestion {
  /** Suggestion identifier */
  id: string;
  /** Suggestion text */
  text: string;
  /** Suggestion type */
  type?: 'history' | 'suggestion' | 'category' | 'result';
  /** Suggestion icon */
  icon?: string;
  /** Suggestion metadata */
  metadata?: string;
  /** Suggestion press handler */
  onPress?: () => void;
}

/**
 * Search filter option
 */
export interface SearchFilter {
  /** Filter identifier */
  id: string;
  /** Filter label */
  label: string;
  /** Filter value */
  value: string;
  /** Filter active state */
  active?: boolean;
  /** Filter icon */
  icon?: string;
}

/**
 * Search header action button
 */
export interface SearchHeaderAction {
  /** Action identifier */
  id: string;
  /** Action icon */
  icon?: string;
  /** Action text */
  text?: string;
  /** Action press handler */
  onPress: () => void;
  /** Action accessibility label */
  accessibilityLabel?: string;
  /** Action disabled state */
  disabled?: boolean;
  /** Action test ID */
  testID?: string;
}

/**
 * Search header component props interface
 */
export interface SearchHeaderProps {
  /** Search header variant */
  variant?: SearchHeaderVariant;
  /** Search header size */
  size?: SearchHeaderSize;
  /** Search placeholder text */
  placeholder?: string;
  /** Search value */
  value?: string;
  /** Search change handler */
  onChangeText?: (text: string) => void;
  /** Search submit handler */
  onSubmit?: (text: string) => void;
  /** Search clear handler */
  onClear?: () => void;
  /** Search focus handler */
  onFocus?: () => void;
  /** Search blur handler */
  onBlur?: () => void;
  /** Search suggestions */
  suggestions?: SearchSuggestion[];
  /** Search filters */
  filters?: SearchFilter[];
  /** Search actions */
  actions?: SearchHeaderAction[];
  /** Show search suggestions */
  showSuggestions?: boolean;
  /** Show search filters */
  showFilters?: boolean;
  /** Enable voice search */
  enableVoiceSearch?: boolean;
  /** Enable search history */
  enableHistory?: boolean;
  /** Auto focus on mount */
  autoFocus?: boolean;
  /** Background color override */
  backgroundColor?: ColorValue;
  /** Text color override */
  textColor?: ColorValue;
  /** Border color override */
  borderColor?: ColorValue;
  /** Enable shadow */
  shadow?: boolean;
  /** Animation type */
  animation?: SearchHeaderAnimation;
  /** Animation duration in milliseconds */
  animationDuration?: number;
  /** Enable smooth transitions */
  animated?: boolean;
  /** Custom style overrides */
  style?: ViewStyle;
  /** Container style overrides */
  containerStyle?: ViewStyle;
  /** Input style overrides */
  inputStyle?: TextStyle;
  /** Suggestions style overrides */
  suggestionsStyle?: ViewStyle;
  /** Z-index for layering */
  zIndex?: number;
  /** Accessibility props */
  accessibilityLabel?: string;
  /** Test ID for testing */
  testID?: string;
  /** Children components */
  children?: React.ReactNode;
}

// ============================================================================
// COMPONENT IMPLEMENTATION
// ============================================================================

/**
 * Search Header Component
 * 
 * Professional search header component providing advanced search functionality
 * with theme integration and space-inspired design aesthetics.
 */
export const SearchHeader: React.FC<SearchHeaderProps> = ({
  variant = 'default',
  size = 'medium',
  placeholder = 'Search...',
  value = '',
  onChangeText,
  onSubmit,
  onClear,
  onFocus,
  onBlur,
  suggestions = [],
  filters = [],
  actions = [],
  showSuggestions = true,
  showFilters = false,
  enableVoiceSearch = false,
  enableHistory = false,
  autoFocus = false,
  backgroundColor,
  textColor,
  borderColor,
  shadow = false,
  animation = 'fade',
  animationDuration = 300,
  animated = true,
  style,
  containerStyle,
  inputStyle,
  suggestionsStyle,
  zIndex = 1000,
  accessibilityLabel,
  testID = 'search-header',
  children,
}) => {
  // ============================================================================
  // HOOKS & STATE
  // ============================================================================

  const { theme } = useTheme();
  const [internalValue, setInternalValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [activeSuggestions, setActiveSuggestions] = useState<SearchSuggestion[]>([]);
  const [activeFilters, setActiveFilters] = useState<SearchFilter[]>(filters);
  
  const inputRef = useRef<TextInput>(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const elasticAnim = useRef(new Animated.Value(1)).current;
  const suggestionsAnim = useRef(new Animated.Value(0)).current;
  const filtersAnim = useRef(new Animated.Value(0)).current;

  // ============================================================================
  // COMPUTED VALUES
  // ============================================================================

  /**
   * Compute search header dimensions based on size
   */
  const dimensions = React.useMemo(() => {
    const sizeMap = {
      small: { height: 44, padding: 12, fontSize: 14, borderRadius: 8 },
      medium: { height: 48, padding: 16, fontSize: 16, borderRadius: 12 },
      large: { height: 56, padding: 20, fontSize: 18, borderRadius: 16 },
    };
    
    return sizeMap[size];
  }, [size]);

  /**
   * Compute background color based on variant
   */
  const computedBackgroundColor = React.useMemo(() => {
    if (backgroundColor) return backgroundColor;
    
    const variantColorMap = {
      default: theme.colors.cosmos.medium,
      prominent: theme.colors.cosmos.dark,
      minimal: 'transparent',
      floating: theme.colors.cosmos.medium,
      overlay: 'rgba(0, 0, 0, 0.8)',
    };
    
    return variantColorMap[variant] || theme.colors.cosmos.medium;
  }, [variant, backgroundColor, theme.colors.cosmos]);

  /**
   * Compute text color
   */
  const computedTextColor = React.useMemo(() => {
    if (textColor) return textColor;
    return theme.colors.neutral.light;
  }, [textColor, theme.colors.neutral.light]);

  /**
   * Compute border color
   */
  const computedBorderColor = React.useMemo(() => {
    if (borderColor) return borderColor;
    return isFocused ? theme.colors.brand.primary : theme.colors.neutral.muted;
  }, [borderColor, isFocused, theme.colors.brand.primary, theme.colors.neutral.muted]);

  /**
   * Compute shadow style
   */
  const shadowStyle = React.useMemo(() => {
    if (!shadow) return {};
    
    return {
      shadowColor: deepSpaceColors.void,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 4,
    };
  }, [shadow]);

  /**
   * Compute variant-specific styles
   */
  const variantStyles = React.useMemo(() => {
    const baseStyle = {
      backgroundColor: computedBackgroundColor,
      height: dimensions.height,
      borderRadius: dimensions.borderRadius,
      paddingHorizontal: dimensions.padding,
    };

    switch (variant) {
      case 'prominent':
        return {
          ...baseStyle,
          borderWidth: 2,
          borderColor: computedBorderColor,
        };
      case 'minimal':
        return {
          ...baseStyle,
          borderBottomWidth: 1,
          borderBottomColor: computedBorderColor,
          borderRadius: 0,
        };
      case 'floating':
        return {
          ...baseStyle,
          marginHorizontal: 16,
          marginVertical: 8,
        };
      case 'overlay':
        return {
          ...baseStyle,
          position: 'absolute' as const,
          top: 0,
          left: 0,
          right: 0,
        };
      default:
        return {
          ...baseStyle,
          borderWidth: 1,
          borderColor: computedBorderColor,
        };
    }
  }, [variant, computedBackgroundColor, computedBorderColor, dimensions]);

  // ============================================================================
  // EFFECTS
  // ============================================================================

  /**
   * Update internal value when prop changes
   */
  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  /**
   * Auto focus on mount
   */
  useEffect(() => {
    if (autoFocus) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [autoFocus]);

  /**
   * Update active suggestions based on search text
   */
  useEffect(() => {
    if (showSuggestions && internalValue.length > 0) {
      const filtered = suggestions.filter(suggestion =>
        suggestion.text.toLowerCase().includes(internalValue.toLowerCase())
      );
      setActiveSuggestions(filtered);
    } else {
      setActiveSuggestions([]);
    }
  }, [internalValue, suggestions, showSuggestions]);

  /**
   * Animate component visibility
   */
  useEffect(() => {
    if (!animated) return;
    
    const animations = [];
    
    if (animation === 'fade') {
      animations.push(
        Animated.timing(fadeAnim, {
          toValue: isVisible ? 1 : 0,
          duration: animationDuration,
          useNativeDriver: true,
        })
      );
    }
    
    if (animation === 'slide') {
      animations.push(
        Animated.timing(slideAnim, {
          toValue: isVisible ? 0 : -dimensions.height,
          duration: animationDuration,
          useNativeDriver: true,
        })
      );
    }
    
    if (animation === 'scale') {
      animations.push(
        Animated.timing(scaleAnim, {
          toValue: isVisible ? 1 : 0.9,
          duration: animationDuration,
          useNativeDriver: true,
        })
      );
    }
    
    if (animation === 'elastic') {
      animations.push(
        Animated.spring(elasticAnim, {
          toValue: isVisible ? 1 : 0.8,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        })
      );
    }
    
    if (animations.length > 0) {
      Animated.parallel(animations).start();
    }
  }, [isVisible, animated, animation, animationDuration, dimensions.height]);

  /**
   * Animate suggestions visibility
   */
  useEffect(() => {
    if (!animated) return;
    
    Animated.timing(suggestionsAnim, {
      toValue: activeSuggestions.length > 0 && isFocused ? 1 : 0,
      duration: animationDuration,
      useNativeDriver: false,
    }).start();
  }, [activeSuggestions.length, isFocused, animated, animationDuration]);

  /**
   * Animate filters visibility
   */
  useEffect(() => {
    if (!animated) return;
    
    Animated.timing(filtersAnim, {
      toValue: showFilters && isFocused ? 1 : 0,
      duration: animationDuration,
      useNativeDriver: false,
    }).start();
  }, [showFilters, isFocused, animated, animationDuration]);

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  /**
   * Handle text change
   */
  const handleChangeText = (text: string) => {
    setInternalValue(text);
    onChangeText?.(text);
  };

  /**
   * Handle search submit
   */
  const handleSubmit = () => {
    onSubmit?.(internalValue);
    Keyboard.dismiss();
  };

  /**
   * Handle search clear
   */
  const handleClear = () => {
    setInternalValue('');
    onClear?.();
    setActiveSuggestions([]);
  };

  /**
   * Handle input focus
   */
  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  /**
   * Handle input blur
   */
  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  /**
   * Handle suggestion press
   */
  const handleSuggestionPress = (suggestion: SearchSuggestion) => {
    setInternalValue(suggestion.text);
    onChangeText?.(suggestion.text);
    suggestion.onPress?.();
    setActiveSuggestions([]);
  };

  /**
   * Handle filter toggle
   */
  const handleFilterToggle = (filter: SearchFilter) => {
    const updatedFilters = activeFilters.map(f =>
      f.id === filter.id ? { ...f, active: !f.active } : f
    );
    setActiveFilters(updatedFilters);
  };

  // ============================================================================
  // RENDER HELPERS
  // ============================================================================

  /**
   * Render search icon
   */
  const renderSearchIcon = () => (
    <TouchableOpacity
      style={styles.searchIcon}
      onPress={handleSubmit}
      accessibilityLabel="Search"
    >
      <Text style={[styles.iconText, { color: computedTextColor }]}>
        🔍
      </Text>
    </TouchableOpacity>
  );

  /**
   * Render clear button
   */
  const renderClearButton = () => {
    if (internalValue.length === 0) return null;
    
    return (
      <TouchableOpacity
        style={styles.clearButton}
        onPress={handleClear}
        accessibilityLabel="Clear search"
      >
        <Text style={[styles.iconText, { color: computedTextColor }]}>
          ✕
        </Text>
      </TouchableOpacity>
    );
  };

  /**
   * Render voice search button
   */
  const renderVoiceButton = () => {
    if (!enableVoiceSearch) return null;
    
    return (
      <TouchableOpacity
        style={styles.voiceButton}
        onPress={() => {}} // Voice search implementation would go here
        accessibilityLabel="Voice search"
      >
        <Text style={[styles.iconText, { color: computedTextColor }]}>
          🎤
        </Text>
      </TouchableOpacity>
    );
  };

  /**
   * Render action buttons
   */
  const renderActions = () => {
    if (actions.length === 0) return null;
    
    return (
      <View style={styles.actionsContainer}>
        {actions.map((action) => (
          <TouchableOpacity
            key={action.id}
            style={[
              styles.actionButton,
              action.disabled && styles.actionButtonDisabled,
            ]}
            onPress={action.onPress}
            disabled={action.disabled}
            accessibilityLabel={action.accessibilityLabel}
            testID={action.testID}
          >
            {action.icon && (
              <Text style={[styles.iconText, { color: computedTextColor }]}>
                {action.icon}
              </Text>
            )}
            {action.text && (
              <Text style={[styles.actionText, { color: computedTextColor }]}>
                {action.text}
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  /**
   * Render suggestion item
   */
  const renderSuggestion = ({ item }: { item: SearchSuggestion }) => (
    <TouchableOpacity
      style={styles.suggestionItem}
      onPress={() => handleSuggestionPress(item)}
      accessibilityLabel={`Search suggestion: ${item.text}`}
    >
      {item.icon && (
        <Text style={[styles.suggestionIcon, { color: computedTextColor }]}>
          {item.icon}
        </Text>
      )}
      <View style={styles.suggestionContent}>
        <Text style={[styles.suggestionText, { color: computedTextColor }]}>
          {item.text}
        </Text>
        {item.metadata && (
          <Text style={[styles.suggestionMetadata, { color: computedTextColor }]}>
            {item.metadata}
          </Text>
        )}
      </View>
      <Text style={[styles.suggestionType, { color: computedTextColor }]}>
        {item.type === 'history' ? '🕐' : '💡'}
      </Text>
    </TouchableOpacity>
  );

  /**
   * Render suggestions list
   */
  const renderSuggestions = () => {
    if (!showSuggestions || activeSuggestions.length === 0) return null;
    
    return (
      <Animated.View
        style={[
          styles.suggestionsContainer,
          suggestionsStyle,
          {
            opacity: suggestionsAnim,
            maxHeight: suggestionsAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 300],
            }),
          },
        ]}
      >
        <FlatList
          data={activeSuggestions}
          renderItem={renderSuggestion}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        />
      </Animated.View>
    );
  };

  /**
   * Render filter item
   */
  const renderFilter = (filter: SearchFilter) => (
    <TouchableOpacity
      key={filter.id}
      style={[
        styles.filterItem,
        filter.active && styles.filterItemActive,
      ]}
      onPress={() => handleFilterToggle(filter)}
      accessibilityLabel={`Filter: ${filter.label}`}
    >
      {filter.icon && (
        <Text style={[styles.filterIcon, { color: computedTextColor }]}>
          {filter.icon}
        </Text>
      )}
      <Text
        style={[
          styles.filterText,
          { color: computedTextColor },
          filter.active && styles.filterTextActive,
        ]}
      >
        {filter.label}
      </Text>
    </TouchableOpacity>
  );

  /**
   * Render filters list
   */
  const renderFilters = () => {
    if (!showFilters || activeFilters.length === 0) return null;
    
    return (
      <Animated.View
        style={[
          styles.filtersContainer,
          {
            opacity: filtersAnim,
            maxHeight: filtersAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 60],
            }),
          },
        ]}
      >
        <FlatList
          data={activeFilters}
          renderItem={({ item }) => renderFilter(item)}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContent}
        />
      </Animated.View>
    );
  };

  // ============================================================================
  // ANIMATION STYLES
  // ============================================================================

  const animationStyles = {
    opacity: animation === 'fade' ? fadeAnim : 1,
    transform: [
      animation === 'slide' ? { translateY: slideAnim } : { translateY: 0 },
      animation === 'scale' ? { scale: scaleAnim } : { scale: 1 },
      animation === 'elastic' ? { scale: elasticAnim } : { scale: 1 },
    ],
  };

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  return (
    <Animated.View
      style={[
        styles.container,
        shadowStyle,
        animationStyles,
        {
          zIndex,
        },
        containerStyle,
        style,
      ]}
    >
      {/* Search Input Container */}
      <View style={[styles.inputContainer, variantStyles]}>
        {renderSearchIcon()}
        
        <TextInput
          ref={inputRef}
          style={[
            styles.input,
            {
              color: computedTextColor,
              fontSize: dimensions.fontSize,
            },
            inputStyle,
          ]}
          placeholder={placeholder}
          placeholderTextColor={`${String(computedTextColor)}80`}
          value={internalValue}
          onChangeText={handleChangeText}
          onSubmitEditing={handleSubmit}
          onFocus={handleFocus}
          onBlur={handleBlur}
          returnKeyType="search"
          clearButtonMode="never"
          autoCorrect={false}
          autoCapitalize="none"
          accessibilityLabel={accessibilityLabel || 'Search input'}
          testID={testID}
        />
        
        {renderClearButton()}
        {renderVoiceButton()}
        {renderActions()}
      </View>
      
      {/* Filters */}
      {renderFilters()}
      
      {/* Suggestions */}
      {renderSuggestions()}
      
      {/* Custom Children */}
      {children}
    </Animated.View>
  );
};

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  
  searchIcon: {
    padding: 8,
    marginRight: 8,
  },
  
  input: {
    flex: 1,
    fontWeight: '400',
    lineHeight: 20,
  },
  
  clearButton: {
    padding: 8,
    marginLeft: 8,
  },
  
  voiceButton: {
    padding: 8,
    marginLeft: 4,
  },
  
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 4,
  },
  
  actionButtonDisabled: {
    opacity: 0.5,
  },
  
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  
  iconText: {
    fontSize: 16,
    lineHeight: 20,
  },
  
  filtersContainer: {
    overflow: 'hidden',
    marginTop: 8,
  },
  
  filtersContent: {
    paddingHorizontal: 16,
  },
  
  filterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    marginRight: 8,
  },
  
  filterItemActive: {
    backgroundColor: 'rgba(0, 102, 204, 0.3)',
    borderColor: '#0066cc',
  },
  
  filterIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  
  filterText: {
    fontSize: 14,
    fontWeight: '400',
  },
  
  filterTextActive: {
    fontWeight: '500',
  },
  
  suggestionsContainer: {
    backgroundColor: 'rgba(26, 26, 26, 0.95)',
    borderRadius: 12,
    marginTop: 8,
    overflow: 'hidden',
  },
  
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  
  suggestionIcon: {
    fontSize: 16,
    marginRight: 12,
  },
  
  suggestionContent: {
    flex: 1,
  },
  
  suggestionText: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 20,
  },
  
  suggestionMetadata: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    opacity: 0.7,
    marginTop: 2,
  },
  
  suggestionType: {
    fontSize: 14,
    marginLeft: 8,
    opacity: 0.6,
  },
});

// ============================================================================
// EXPORTS
// ============================================================================

export default SearchHeader;
