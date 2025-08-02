/**
 * Corp Astro UI Library - SearchInput Test Component
 * 
 * Test component for validating SearchInput functionality, suggestions,
 * debounced search, and search history.
 * 
 * @module SearchInputTest
 * @version 1.0.0
 * @since 2024
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { SearchInput, SearchInputSuggestionItem } from '../SearchInput';

/**
 * SearchInput Test Component
 * 
 * Comprehensive test suite for SearchInput component validation.
 */
export const SearchInputTest: React.FC = () => {
  // Test state
  const [basicSearch, setBasicSearch] = useState<string>('');
  const [suggestionSearch, setSuggestionSearch] = useState<string>('');
  const [historySearch, setHistorySearch] = useState<string>('');
  const [debounceSearch, setDebounceSearch] = useState<string>('');
  
  // Search history
  const [searchHistory, setSearchHistory] = useState<string[]>([
    'React Native',
    'TypeScript',
    'UI Components',
    'Design System',
    'Mobile Development'
  ]);

  // Sample suggestions
  const sampleSuggestions: SearchInputSuggestionItem[] = [
    {
      id: '1',
      text: 'React Native',
      secondary: 'Mobile framework',
      category: 'Technology'
    },
    {
      id: '2',
      text: 'TypeScript',
      secondary: 'Programming language',
      category: 'Technology'
    },
    {
      id: '3',
      text: 'UI Components',
      secondary: 'Design elements',
      category: 'Design'
    },
    {
      id: '4',
      text: 'Animation',
      secondary: 'Motion graphics',
      category: 'Design'
    },
    {
      id: '5',
      text: 'Performance',
      secondary: 'Optimization',
      category: 'Development'
    },
    {
      id: '6',
      text: 'Testing',
      secondary: 'Quality assurance',
      category: 'Development'
    },
    {
      id: '7',
      text: 'Documentation',
      secondary: 'Technical writing',
      category: 'Development'
    },
    {
      id: '8',
      text: 'Dark Theme',
      secondary: 'UI appearance',
      category: 'Design'
    }
  ];

  // Search handlers
  const handleBasicSearch = (query: string) => {
    setBasicSearch(query);
    console.log('Basic search:', query);
  };

  const handleBasicSearchSubmit = (query: string) => {
    Alert.alert('Search Submitted', `Query: "${query}"`);
    
    // Add to history
    if (query && !searchHistory.includes(query)) {
      setSearchHistory(prev => [query, ...prev.slice(0, 9)]);
    }
  };

  const handleSuggestionSearch = (query: string) => {
    setSuggestionSearch(query);
    console.log('Suggestion search:', query);
  };

  const handleSuggestionSelect = (suggestion: SearchInputSuggestionItem) => {
    Alert.alert('Suggestion Selected', `Selected: "${suggestion.text}"\nCategory: ${suggestion.category}`);
    setSuggestionSearch(suggestion.text);
    
    // Add to history
    if (!searchHistory.includes(suggestion.text)) {
      setSearchHistory(prev => [suggestion.text, ...prev.slice(0, 9)]);
    }
  };

  const handleHistorySearch = (query: string) => {
    setHistorySearch(query);
    console.log('History search:', query);
  };

  const handleDebounceSearch = (query: string) => {
    setDebounceSearch(query);
    console.log('Debounced search triggered:', query);
  };

  const handleSearchClear = () => {
    console.log('Search cleared');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>SearchInput Test Component</Text>
      
      {/* Basic Search Input */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Search Input</Text>
        <SearchInput
          value={basicSearch}
          onSearchChange={handleBasicSearch}
          onSearchSubmit={handleBasicSearchSubmit}
          onSearchClear={handleSearchClear}
          label={{ text: 'Basic Search', position: 'top' }}
          helper={{ text: 'Enter search query', show: true }}
          size="medium"
          variant="outlined"
          search={{
            placeholder: 'Search anything...',
            debounceDelay: 300,
            minLength: 1
          }}
        />
      </View>

      {/* Search with Suggestions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Search with Suggestions</Text>
        <SearchInput
          value={suggestionSearch}
          onSearchChange={handleSuggestionSearch}
          onSearchSubmit={handleBasicSearchSubmit}
          onSuggestionSelect={handleSuggestionSelect}
          suggestions={sampleSuggestions}
          label={{ text: 'Search with Suggestions', position: 'top' }}
          helper={{ text: 'Start typing to see suggestions', show: true }}
          size="medium"
          variant="outlined"
          search={{
            placeholder: 'Search technologies...',
            enableSuggestions: true,
            maxSuggestions: 5,
            debounceDelay: 200,
            minLength: 1
          }}
        />
      </View>

      {/* Search with History */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Search with History</Text>
        <SearchInput
          value={historySearch}
          onSearchChange={handleHistorySearch}
          onSearchSubmit={handleBasicSearchSubmit}
          searchHistory={searchHistory}
          label={{ text: 'Search with History', position: 'top' }}
          helper={{ text: 'Focus to see recent searches', show: true }}
          size="medium"
          variant="outlined"
          search={{
            placeholder: 'Search with history...',
            enableHistory: true,
            maxHistoryItems: 5,
            debounceDelay: 300
          }}
        />
      </View>

      {/* Debounced Search */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Debounced Search (1s delay)</Text>
        <SearchInput
          value={debounceSearch}
          onSearchChange={handleDebounceSearch}
          onSearchSubmit={handleBasicSearchSubmit}
          label={{ text: 'Debounced Search', position: 'top' }}
          helper={{ text: 'Search triggers after 1 second of inactivity', show: true }}
          size="medium"
          variant="outlined"
          search={{
            placeholder: 'Type to test debounce...',
            debounceDelay: 1000,
            minLength: 2
          }}
        />
      </View>

      {/* Size Variants */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Size Variants</Text>
        
        <View style={styles.subSection}>
          <SearchInput
            value=""
            onSearchChange={() => {}}
            label={{ text: 'Small Size', position: 'top' }}
            size="small"
            variant="outlined"
            search={{ placeholder: 'Small search...' }}
          />
        </View>

        <View style={styles.subSection}>
          <SearchInput
            value=""
            onSearchChange={() => {}}
            label={{ text: 'Medium Size', position: 'top' }}
            size="medium"
            variant="outlined"
            search={{ placeholder: 'Medium search...' }}
          />
        </View>

        <View style={styles.subSection}>
          <SearchInput
            value=""
            onSearchChange={() => {}}
            label={{ text: 'Large Size', position: 'top' }}
            size="large"
            variant="outlined"
            search={{ placeholder: 'Large search...' }}
          />
        </View>
      </View>

      {/* Validation States */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Validation States</Text>
        
        <View style={styles.subSection}>
          <SearchInput
            value=""
            onSearchChange={() => {}}
            label={{ text: 'Default State', position: 'top' }}
            size="medium"
            variant="outlined"
            search={{ placeholder: 'Default search...' }}
          />
        </View>

        <View style={styles.subSection}>
          <SearchInput
            value=""
            onSearchChange={() => {}}
            label={{ text: 'Error State', position: 'top' }}
            errorMessage="Search query is invalid"
            size="medium"
            variant="outlined"
            search={{ placeholder: 'Error search...' }}
          />
        </View>

        <View style={styles.subSection}>
          <SearchInput
            value=""
            onSearchChange={() => {}}
            label={{ text: 'Success State', position: 'top' }}
            successMessage="Search completed successfully"
            size="medium"
            variant="outlined"
            search={{ placeholder: 'Success search...' }}
          />
        </View>

        <View style={styles.subSection}>
          <SearchInput
            value=""
            onSearchChange={() => {}}
            label={{ text: 'Warning State', position: 'top' }}
            warningMessage="Search query is too broad"
            size="medium"
            variant="outlined"
            search={{ placeholder: 'Warning search...' }}
          />
        </View>
      </View>

      {/* Custom Configuration */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Configuration</Text>
        
        <View style={styles.subSection}>
          <SearchInput
            value=""
            onSearchChange={() => {}}
            label={{ text: 'No Icons', position: 'top' }}
            size="medium"
            variant="outlined"
            search={{
              placeholder: 'No icons search...',
              showSearchIcon: false,
              showClearButton: false
            }}
          />
        </View>

        <View style={styles.subSection}>
          <SearchInput
            value=""
            onSearchChange={() => {}}
            label={{ text: 'Case Sensitive', position: 'top' }}
            suggestions={sampleSuggestions}
            size="medium"
            variant="outlined"
            search={{
              placeholder: 'Case sensitive search...',
              caseSensitive: true,
              enableSuggestions: true
            }}
          />
        </View>

        <View style={styles.subSection}>
          <SearchInput
            value=""
            onSearchChange={() => {}}
            label={{ text: 'Minimum 3 Characters', position: 'top' }}
            suggestions={sampleSuggestions}
            size="medium"
            variant="outlined"
            search={{
              placeholder: 'Min 3 chars search...',
              minLength: 3,
              enableSuggestions: true
            }}
          />
        </View>
      </View>

      {/* Disabled State */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Disabled State</Text>
        <SearchInput
          value="Disabled search"
          onSearchChange={() => {}}
          label={{ text: 'Disabled Search', position: 'top' }}
          disabled={true}
          size="medium"
          variant="outlined"
          search={{ placeholder: 'Disabled...' }}
        />
      </View>

      {/* Loading State */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Loading State</Text>
        <SearchInput
          value=""
          onSearchChange={() => {}}
          label={{ text: 'Loading Search', position: 'top' }}
          loading={true}
          size="medium"
          variant="outlined"
          search={{ placeholder: 'Loading...' }}
        />
      </View>

      {/* Current Search History */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Current Search History</Text>
        <View style={styles.historyContainer}>
          {searchHistory.map((item, index) => (
            <View key={index} style={styles.historyItem}>
              <Text style={styles.historyText}>{item}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          SearchInput Test Component - All variants and functionality
        </Text>
      </View>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0F',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 32,
    fontFamily: 'Inter',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
    fontFamily: 'Inter',
  },
  subSection: {
    marginBottom: 16,
  },
  historyContainer: {
    backgroundColor: 'rgba(22,33,62,0.2)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  historyItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(46,134,222,0.1)',
    borderRadius: 8,
    marginBottom: 8,
  },
  historyText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'Inter',
  },
  footer: {
    marginTop: 32,
    marginBottom: 64,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#B8B8C0',
    textAlign: 'center',
    fontFamily: 'Inter',
  },
});

export default SearchInputTest;
