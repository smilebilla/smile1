/**
 * Corp Astro UI Library - Search Header Component Test
 * 
 * Comprehensive test suite for the SearchHeader component demonstrating
 * all features, variants, and functionality. This test component validates
 * the proper implementation of search headers, functionality, and theming.
 * 
 * @module SearchHeaderTest
 * @version 1.0.0
 * @author Corp Astro Design System
 * @since 2024
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Switch,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { SearchHeader } from '../SearchHeader';
import type { 
  SearchHeaderVariant, 
  SearchHeaderSize, 
  SearchHeaderAnimation,
  SearchSuggestion,
  SearchFilter,
  SearchHeaderAction,
} from '../SearchHeader';

// ============================================================================
// MOCK DATA
// ============================================================================

const mockSuggestions: SearchSuggestion[] = [
  {
    id: 'suggestion-1',
    text: 'React components',
    type: 'suggestion',
    icon: '💡',
    metadata: 'Popular search',
  },
  {
    id: 'suggestion-2',
    text: 'TypeScript interfaces',
    type: 'history',
    icon: '🕐',
    metadata: 'Recent search',
  },
  {
    id: 'suggestion-3',
    text: 'CSS animations',
    type: 'category',
    icon: '🎨',
    metadata: 'Design category',
  },
  {
    id: 'suggestion-4',
    text: 'Corp Astro themes',
    type: 'suggestion',
    icon: '🌌',
    metadata: 'Design system',
  },
];

const mockFilters: SearchFilter[] = [
  {
    id: 'filter-1',
    label: 'Documentation',
    value: 'docs',
    icon: '📚',
    active: false,
  },
  {
    id: 'filter-2',
    label: 'Code',
    value: 'code',
    icon: '💻',
    active: true,
  },
  {
    id: 'filter-3',
    label: 'Examples',
    value: 'examples',
    icon: '📝',
    active: false,
  },
  {
    id: 'filter-4',
    label: 'Tutorials',
    value: 'tutorials',
    icon: '🎓',
    active: false,
  },
];

const mockActions: SearchHeaderAction[] = [
  {
    id: 'action-1',
    icon: '⚙️',
    onPress: () => Alert.alert('Settings', 'Search settings pressed'),
    accessibilityLabel: 'Settings',
  },
  {
    id: 'action-2',
    icon: '🔍',
    onPress: () => Alert.alert('Advanced', 'Advanced search pressed'),
    accessibilityLabel: 'Advanced search',
  },
];

// ============================================================================
// TEST COMPONENT
// ============================================================================

/**
 * SearchHeader Test Suite
 * 
 * Comprehensive test component showcasing all SearchHeader features.
 * Demonstrates variants, animations, search functionality, and interactive behavior.
 */
export const SearchHeaderTest: React.FC = () => {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================

  const [currentVariant, setCurrentVariant] = useState<SearchHeaderVariant>('default');
  const [currentSize, setCurrentSize] = useState<SearchHeaderSize>('medium');
  const [currentAnimation, setCurrentAnimation] = useState<SearchHeaderAnimation>('fade');
  const [searchValue, setSearchValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [enableVoiceSearch, setEnableVoiceSearch] = useState(false);
  const [enableHistory, setEnableHistory] = useState(false);
  const [enableAnimations, setEnableAnimations] = useState(true);
  const [enableShadow, setEnableShadow] = useState(false);
  const [autoFocus, setAutoFocus] = useState(false);
  const [searchResults, setSearchResults] = useState<string[]>([]);

  // ============================================================================
  // VARIANT OPTIONS
  // ============================================================================

  const variants: SearchHeaderVariant[] = ['default', 'prominent', 'minimal', 'floating', 'overlay'];
  const sizes: SearchHeaderSize[] = ['small', 'medium', 'large'];
  const animations: SearchHeaderAnimation[] = ['fade', 'slide', 'scale', 'elastic', 'none'];

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  const handleSearchChange = (text: string) => {
    setSearchValue(text);
    
    // Simulate search results
    const results = mockSuggestions
      .filter(s => s.text.toLowerCase().includes(text.toLowerCase()))
      .map(s => s.text);
    setSearchResults(results);
  };

  const handleSearchSubmit = (text: string) => {
    Alert.alert('Search Submitted', `Searching for: "${text}"`);
    setSearchResults([]);
  };

  const handleSearchClear = () => {
    setSearchValue('');
    setSearchResults([]);
  };

  const handleSearchFocus = () => {
    console.log('Search focused');
  };

  const handleSearchBlur = () => {
    console.log('Search blurred');
  };

  // ============================================================================
  // RENDER HELPERS
  // ============================================================================

  const renderVariantSelector = () => (
    <View style={styles.selectorContainer}>
      <Text style={styles.selectorLabel}>Variant:</Text>
      <View style={styles.selectorOptions}>
        {variants.map((variant) => (
          <TouchableOpacity
            key={variant}
            style={[
              styles.selectorOption,
              currentVariant === variant && styles.selectorOptionActive,
            ]}
            onPress={() => setCurrentVariant(variant)}
          >
            <Text
              style={[
                styles.selectorOptionText,
                currentVariant === variant && styles.selectorOptionTextActive,
              ]}
            >
              {variant}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderSizeSelector = () => (
    <View style={styles.selectorContainer}>
      <Text style={styles.selectorLabel}>Size:</Text>
      <View style={styles.selectorOptions}>
        {sizes.map((size) => (
          <TouchableOpacity
            key={size}
            style={[
              styles.selectorOption,
              currentSize === size && styles.selectorOptionActive,
            ]}
            onPress={() => setCurrentSize(size)}
          >
            <Text
              style={[
                styles.selectorOptionText,
                currentSize === size && styles.selectorOptionTextActive,
              ]}
            >
              {size}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderAnimationSelector = () => (
    <View style={styles.selectorContainer}>
      <Text style={styles.selectorLabel}>Animation:</Text>
      <View style={styles.selectorOptions}>
        {animations.map((animation) => (
          <TouchableOpacity
            key={animation}
            style={[
              styles.selectorOption,
              currentAnimation === animation && styles.selectorOptionActive,
            ]}
            onPress={() => setCurrentAnimation(animation)}
          >
            <Text
              style={[
                styles.selectorOptionText,
                currentAnimation === animation && styles.selectorOptionTextActive,
              ]}
            >
              {animation}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderToggleControls = () => (
    <View style={styles.controlsContainer}>
      <View style={styles.controlRow}>
        <Text style={styles.controlLabel}>Show Suggestions</Text>
        <Switch
          value={showSuggestions}
          onValueChange={setShowSuggestions}
          trackColor={{ false: '#767577', true: '#0066cc' }}
          thumbColor={showSuggestions ? '#ffffff' : '#f4f3f4'}
        />
      </View>
      
      <View style={styles.controlRow}>
        <Text style={styles.controlLabel}>Show Filters</Text>
        <Switch
          value={showFilters}
          onValueChange={setShowFilters}
          trackColor={{ false: '#767577', true: '#0066cc' }}
          thumbColor={showFilters ? '#ffffff' : '#f4f3f4'}
        />
      </View>
      
      <View style={styles.controlRow}>
        <Text style={styles.controlLabel}>Voice Search</Text>
        <Switch
          value={enableVoiceSearch}
          onValueChange={setEnableVoiceSearch}
          trackColor={{ false: '#767577', true: '#0066cc' }}
          thumbColor={enableVoiceSearch ? '#ffffff' : '#f4f3f4'}
        />
      </View>
      
      <View style={styles.controlRow}>
        <Text style={styles.controlLabel}>Search History</Text>
        <Switch
          value={enableHistory}
          onValueChange={setEnableHistory}
          trackColor={{ false: '#767577', true: '#0066cc' }}
          thumbColor={enableHistory ? '#ffffff' : '#f4f3f4'}
        />
      </View>
      
      <View style={styles.controlRow}>
        <Text style={styles.controlLabel}>Animations</Text>
        <Switch
          value={enableAnimations}
          onValueChange={setEnableAnimations}
          trackColor={{ false: '#767577', true: '#0066cc' }}
          thumbColor={enableAnimations ? '#ffffff' : '#f4f3f4'}
        />
      </View>
      
      <View style={styles.controlRow}>
        <Text style={styles.controlLabel}>Shadow</Text>
        <Switch
          value={enableShadow}
          onValueChange={setEnableShadow}
          trackColor={{ false: '#767577', true: '#0066cc' }}
          thumbColor={enableShadow ? '#ffffff' : '#f4f3f4'}
        />
      </View>
      
      <View style={styles.controlRow}>
        <Text style={styles.controlLabel}>Auto Focus</Text>
        <Switch
          value={autoFocus}
          onValueChange={setAutoFocus}
          trackColor={{ false: '#767577', true: '#0066cc' }}
          thumbColor={autoFocus ? '#ffffff' : '#f4f3f4'}
        />
      </View>
    </View>
  );

  const renderSearchResults = () => {
    if (searchResults.length === 0) return null;
    
    return (
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsTitle}>Search Results:</Text>
        {searchResults.map((result, index) => (
          <Text key={index} style={styles.resultItem}>
            • {result}
          </Text>
        ))}
      </View>
    );
  };

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>SearchHeader Component Test</Text>
          <Text style={styles.subtitle}>
            Comprehensive test suite for all SearchHeader features
          </Text>
        </View>

        {/* Controls */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Configuration</Text>
          
          {renderVariantSelector()}
          {renderSizeSelector()}
          {renderAnimationSelector()}
          {renderToggleControls()}
        </View>

        {/* Current Search Value */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Search Value</Text>
          <Text style={styles.valueText}>"{searchValue}"</Text>
        </View>

        {/* Demo Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Search Header Demo</Text>
          
          {/* Basic Example */}
          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTitle}>Basic Search Header</Text>
            <SearchHeader
              variant={currentVariant}
              size={currentSize}
              animation={currentAnimation}
              value={searchValue}
              placeholder="Search Corp Astro..."
              onChangeText={handleSearchChange}
              onSubmit={handleSearchSubmit}
              onClear={handleSearchClear}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              suggestions={mockSuggestions}
              filters={mockFilters}
              actions={mockActions}
              showSuggestions={showSuggestions}
              showFilters={showFilters}
              enableVoiceSearch={enableVoiceSearch}
              enableHistory={enableHistory}
              animated={enableAnimations}
              shadow={enableShadow}
              autoFocus={autoFocus}
            />
          </View>

          {/* Custom Styled Example */}
          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTitle}>Custom Styled</Text>
            <SearchHeader
              variant="prominent"
              size="large"
              placeholder="Custom search..."
              backgroundColor="rgba(0, 102, 204, 0.1)"
              textColor="#0066cc"
              borderColor="#0066cc"
              shadow={true}
              showSuggestions={false}
              showFilters={false}
              style={styles.customSearchHeader}
            />
          </View>

          {/* Minimal Example */}
          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTitle}>Minimal Search</Text>
            <SearchHeader
              variant="minimal"
              size="small"
              placeholder="Quick search..."
              showSuggestions={false}
              showFilters={false}
              enableVoiceSearch={false}
            />
          </View>

          {/* Floating Example */}
          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTitle}>Floating Search</Text>
            <SearchHeader
              variant="floating"
              size="medium"
              placeholder="Floating search..."
              shadow={true}
              suggestions={mockSuggestions.slice(0, 2)}
              showSuggestions={true}
              showFilters={false}
            />
          </View>

          {/* With All Features */}
          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTitle}>Full Featured</Text>
            <SearchHeader
              variant="default"
              size="large"
              placeholder="Full featured search..."
              suggestions={mockSuggestions}
              filters={mockFilters}
              actions={mockActions}
              showSuggestions={true}
              showFilters={true}
              enableVoiceSearch={true}
              enableHistory={true}
              shadow={true}
              animation="elastic"
              animationDuration={400}
            />
          </View>
        </View>

        {/* Search Results */}
        {renderSearchResults()}

        {/* Features Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features Demonstrated</Text>
          <View style={styles.featuresList}>
            <Text style={styles.featureItem}>✓ Multiple search header variants</Text>
            <Text style={styles.featureItem}>✓ Different sizes and animations</Text>
            <Text style={styles.featureItem}>✓ Real-time search suggestions</Text>
            <Text style={styles.featureItem}>✓ Search filters and categories</Text>
            <Text style={styles.featureItem}>✓ Voice search integration</Text>
            <Text style={styles.featureItem}>✓ Search history support</Text>
            <Text style={styles.featureItem}>✓ Custom actions and buttons</Text>
            <Text style={styles.featureItem}>✓ Smooth animations and transitions</Text>
            <Text style={styles.featureItem}>✓ Theme integration</Text>
            <Text style={styles.featureItem}>✓ Accessibility compliance</Text>
            <Text style={styles.featureItem}>✓ Responsive design</Text>
            <Text style={styles.featureItem}>✓ Custom styling options</Text>
          </View>
        </View>

        {/* Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Component Info</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              The SearchHeader component provides advanced search functionality with
              multiple variants, real-time suggestions, filters, and smooth animations.
              It integrates seamlessly with the Corp Astro design system and supports
              extensive customization options.
            </Text>
          </View>
        </View>

        {/* Spacer for bottom padding */}
        <View style={styles.spacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  
  scrollView: {
    flex: 1,
  },
  
  header: {
    padding: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  
  subtitle: {
    fontSize: 16,
    color: '#cccccc',
    textAlign: 'center',
    lineHeight: 24,
  },
  
  section: {
    marginHorizontal: 20,
    marginBottom: 30,
  },
  
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
  },
  
  selectorContainer: {
    marginBottom: 20,
  },
  
  selectorLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    marginBottom: 12,
  },
  
  selectorOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  
  selectorOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#333333',
  },
  
  selectorOptionActive: {
    backgroundColor: '#0066cc',
    borderColor: '#0066cc',
  },
  
  selectorOptionText: {
    fontSize: 14,
    color: '#cccccc',
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  
  selectorOptionTextActive: {
    color: '#ffffff',
  },
  
  controlsContainer: {
    gap: 12,
  },
  
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  
  controlLabel: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
  },
  
  valueText: {
    fontSize: 16,
    color: '#0066cc',
    fontWeight: '500',
    fontStyle: 'italic',
  },
  
  exampleContainer: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333333',
  },
  
  exampleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 12,
  },
  
  customSearchHeader: {
    marginHorizontal: 0,
  },
  
  resultsContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333333',
  },
  
  resultsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 12,
  },
  
  resultItem: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 4,
  },
  
  featuresList: {
    gap: 8,
  },
  
  featureItem: {
    fontSize: 14,
    color: '#cccccc',
    lineHeight: 20,
  },
  
  infoContainer: {
    padding: 16,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333333',
  },
  
  infoText: {
    fontSize: 14,
    color: '#cccccc',
    lineHeight: 20,
  },
  
  spacer: {
    height: 40,
  },
});

// ============================================================================
// EXPORTS
// ============================================================================

export default SearchHeaderTest;
