/**
 * FlexTest.tsx
 * 
 * Test component for the Flex primitive
 * Tests all variants, presets, and features of the Flex component
 */

import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Flex } from '../Flex';
import { useTheme } from '../../../foundations/themes/useTheme';

/**
 * Test component for Flex primitive
 */
const FlexTest: React.FC = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.cosmos.deep,
    },
    section: {
      padding: theme.spacing.lg,
      marginBottom: theme.spacing.md,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.brand.light,
      marginBottom: theme.spacing.md,
    },
    testItem: {
      backgroundColor: theme.colors.brand.primary,
      padding: theme.spacing.sm,
      borderRadius: 8,
      minWidth: 60,
      minHeight: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    testText: {
      color: theme.colors.neutral.light,
      fontSize: 12,
      fontWeight: '500',
    },
    placeholder: {
      backgroundColor: theme.colors.cosmos.medium,
      padding: theme.spacing.md,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 60,
    },
    placeholderText: {
      color: theme.colors.neutral.text,
      fontSize: 14,
    },
  });

  const TestItem = ({ children, ...props }: { children: React.ReactNode }) => (
    <View style={styles.testItem} {...props}>
      <Text style={styles.testText}>{children}</Text>
    </View>
  );

  const PlaceholderItem = ({ children }: { children: React.ReactNode }) => (
    <View style={styles.placeholder}>
      <Text style={styles.placeholderText}>{children}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Direction Tests */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Direction Variants</Text>
        
        <Flex direction="row" gap="md" marginBottom="md">
          <TestItem>Row 1</TestItem>
          <TestItem>Row 2</TestItem>
          <TestItem>Row 3</TestItem>
        </Flex>
        
        <Flex direction="column" gap="md" marginBottom="md">
          <TestItem>Col 1</TestItem>
          <TestItem>Col 2</TestItem>
          <TestItem>Col 3</TestItem>
        </Flex>
        
        <Flex direction="row-reverse" gap="md" marginBottom="md">
          <TestItem>Rev 1</TestItem>
          <TestItem>Rev 2</TestItem>
          <TestItem>Rev 3</TestItem>
        </Flex>
        
        <Flex direction="column-reverse" gap="md">
          <TestItem>ColRev 1</TestItem>
          <TestItem>ColRev 2</TestItem>
          <TestItem>ColRev 3</TestItem>
        </Flex>
      </View>

      {/* Alignment Tests */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Alignment Options</Text>
        
        <Flex direction="row" alignItems="start" gap="md" marginBottom="md" minHeight={80}>
          <TestItem>Start</TestItem>
          <TestItem>Start</TestItem>
          <TestItem>Start</TestItem>
        </Flex>
        
        <Flex direction="row" alignItems="center" gap="md" marginBottom="md" minHeight={80}>
          <TestItem>Center</TestItem>
          <TestItem>Center</TestItem>
          <TestItem>Center</TestItem>
        </Flex>
        
        <Flex direction="row" alignItems="end" gap="md" marginBottom="md" minHeight={80}>
          <TestItem>End</TestItem>
          <TestItem>End</TestItem>
          <TestItem>End</TestItem>
        </Flex>
        
        <Flex direction="row" alignItems="stretch" gap="md" minHeight={80}>
          <TestItem>Stretch</TestItem>
          <TestItem>Stretch</TestItem>
          <TestItem>Stretch</TestItem>
        </Flex>
      </View>

      {/* Justification Tests */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Justification Options</Text>
        
        <Flex direction="row" justifyContent="start" gap="md" marginBottom="md">
          <TestItem>Start</TestItem>
          <TestItem>Start</TestItem>
        </Flex>
        
        <Flex direction="row" justifyContent="center" gap="md" marginBottom="md">
          <TestItem>Center</TestItem>
          <TestItem>Center</TestItem>
        </Flex>
        
        <Flex direction="row" justifyContent="end" gap="md" marginBottom="md">
          <TestItem>End</TestItem>
          <TestItem>End</TestItem>
        </Flex>
        
        <Flex direction="row" justifyContent="space-between" marginBottom="md">
          <TestItem>Between</TestItem>
          <TestItem>Between</TestItem>
        </Flex>
        
        <Flex direction="row" justifyContent="space-around" marginBottom="md">
          <TestItem>Around</TestItem>
          <TestItem>Around</TestItem>
        </Flex>
        
        <Flex direction="row" justifyContent="space-evenly">
          <TestItem>Evenly</TestItem>
          <TestItem>Evenly</TestItem>
        </Flex>
      </View>

      {/* Wrap Tests */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Wrap Behavior</Text>
        
        <Flex direction="row" wrap="wrap" gap="md" marginBottom="md">
          <TestItem>Wrap 1</TestItem>
          <TestItem>Wrap 2</TestItem>
          <TestItem>Wrap 3</TestItem>
          <TestItem>Wrap 4</TestItem>
          <TestItem>Wrap 5</TestItem>
          <TestItem>Wrap 6</TestItem>
        </Flex>
        
        <Flex direction="row" wrap="nowrap" gap="md" marginBottom="md">
          <TestItem>No Wrap 1</TestItem>
          <TestItem>No Wrap 2</TestItem>
          <TestItem>No Wrap 3</TestItem>
          <TestItem>No Wrap 4</TestItem>
        </Flex>
        
        <Flex direction="row" wrap="wrap-reverse" gap="md">
          <TestItem>WrapRev 1</TestItem>
          <TestItem>WrapRev 2</TestItem>
          <TestItem>WrapRev 3</TestItem>
          <TestItem>WrapRev 4</TestItem>
          <TestItem>WrapRev 5</TestItem>
        </Flex>
      </View>

      {/* Gap Tests */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Gap Variants</Text>
        
        <Flex direction="row" gap="none" marginBottom="md">
          <TestItem>None</TestItem>
          <TestItem>None</TestItem>
          <TestItem>None</TestItem>
        </Flex>
        
        <Flex direction="row" gap="xs" marginBottom="md">
          <TestItem>XS</TestItem>
          <TestItem>XS</TestItem>
          <TestItem>XS</TestItem>
        </Flex>
        
        <Flex direction="row" gap="sm" marginBottom="md">
          <TestItem>SM</TestItem>
          <TestItem>SM</TestItem>
          <TestItem>SM</TestItem>
        </Flex>
        
        <Flex direction="row" gap="md" marginBottom="md">
          <TestItem>MD</TestItem>
          <TestItem>MD</TestItem>
          <TestItem>MD</TestItem>
        </Flex>
        
        <Flex direction="row" gap="lg" marginBottom="md">
          <TestItem>LG</TestItem>
          <TestItem>LG</TestItem>
          <TestItem>LG</TestItem>
        </Flex>
        
        <Flex direction="row" gap="xl" marginBottom="md">
          <TestItem>XL</TestItem>
          <TestItem>XL</TestItem>
          <TestItem>XL</TestItem>
        </Flex>
        
        <Flex direction="row" gap="xxl" marginBottom="md">
          <TestItem>XXL</TestItem>
          <TestItem>XXL</TestItem>
          <TestItem>XXL</TestItem>
        </Flex>
        
        <Flex direction="row" customGap={20}>
          <TestItem>Custom</TestItem>
          <TestItem>Custom</TestItem>
          <TestItem>Custom</TestItem>
        </Flex>
      </View>

      {/* Flex Properties Tests */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Flex Properties</Text>
        
        <Flex direction="row" gap="md" marginBottom="md">
          <TestItem>Normal</TestItem>
          <Flex grow={1} backgroundColor={theme.colors.mystical.deep} padding="sm">
            <Text style={styles.testText}>Flex Grow 1</Text>
          </Flex>
          <TestItem>Normal</TestItem>
        </Flex>
        
        <Flex direction="row" gap="md" marginBottom="md">
          <Flex shrink={1} backgroundColor={theme.colors.mystical.deep} padding="sm" minWidth={200}>
            <Text style={styles.testText}>Flex Shrink 1</Text>
          </Flex>
          <TestItem>Normal</TestItem>
          <TestItem>Normal</TestItem>
        </Flex>
        
        <Flex direction="row" gap="md">
          <Flex basis={100} backgroundColor={theme.colors.mystical.deep} padding="sm">
            <Text style={styles.testText}>Basis 100</Text>
          </Flex>
          <TestItem>Normal</TestItem>
          <TestItem>Normal</TestItem>
        </Flex>
      </View>

      {/* Size Constraints */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Size Constraints</Text>
        
        <Flex direction="row" gap="md" marginBottom="md">
          <Flex minWidth={120} backgroundColor={theme.colors.mystical.deep} padding="sm">
            <Text style={styles.testText}>Min Width 120</Text>
          </Flex>
          <TestItem>Normal</TestItem>
        </Flex>
        
        <Flex direction="row" gap="md" marginBottom="md">
          <Flex maxWidth={80} backgroundColor={theme.colors.mystical.deep} padding="sm">
            <Text style={styles.testText}>Max Width 80 with long text</Text>
          </Flex>
          <TestItem>Normal</TestItem>
        </Flex>
        
        <Flex direction="row" gap="md" marginBottom="md">
          <Flex minHeight={80} backgroundColor={theme.colors.mystical.deep} padding="sm">
            <Text style={styles.testText}>Min Height 80</Text>
          </Flex>
          <TestItem>Normal</TestItem>
        </Flex>
        
        <Flex direction="row" gap="md">
          <Flex width={100} height={60} backgroundColor={theme.colors.mystical.deep} padding="sm">
            <Text style={styles.testText}>Fixed Size</Text>
          </Flex>
          <TestItem>Normal</TestItem>
        </Flex>
      </View>

      {/* Preset Tests */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preset Configurations</Text>
        
        <Flex preset="column" marginBottom="md">
          <TestItem>Column Preset</TestItem>
          <TestItem>Item 2</TestItem>
          <TestItem>Item 3</TestItem>
        </Flex>
        
        <Flex preset="row" marginBottom="md">
          <TestItem>Row Preset</TestItem>
          <TestItem>Item 2</TestItem>
          <TestItem>Item 3</TestItem>
        </Flex>
        
        <Flex preset="center" marginBottom="md" minHeight={100}>
          <TestItem>Center Preset</TestItem>
        </Flex>
        
        <Flex preset="spaceBetween" marginBottom="md">
          <TestItem>Space Between</TestItem>
          <TestItem>Item 2</TestItem>
          <TestItem>Item 3</TestItem>
        </Flex>
        
        <Flex preset="spaceAround" marginBottom="md">
          <TestItem>Space Around</TestItem>
          <TestItem>Item 2</TestItem>
          <TestItem>Item 3</TestItem>
        </Flex>
        
        <Flex preset="spaceEvenly" marginBottom="md">
          <TestItem>Space Evenly</TestItem>
          <TestItem>Item 2</TestItem>
          <TestItem>Item 3</TestItem>
        </Flex>
        
        <Flex preset="header" marginBottom="md">
          <TestItem>Header Left</TestItem>
          <TestItem>Header Right</TestItem>
        </Flex>
        
        <Flex preset="navbar" marginBottom="md">
          <TestItem>Nav Left</TestItem>
          <TestItem>Nav Right</TestItem>
        </Flex>
        
        <Flex preset="card" marginBottom="md">
          <PlaceholderItem>Card Content</PlaceholderItem>
          <PlaceholderItem>Card Content</PlaceholderItem>
        </Flex>
        
        <Flex preset="form" marginBottom="md">
          <PlaceholderItem>Form Field 1</PlaceholderItem>
          <PlaceholderItem>Form Field 2</PlaceholderItem>
          <PlaceholderItem>Form Field 3</PlaceholderItem>
        </Flex>
        
        <Flex preset="grid" marginBottom="md">
          <TestItem>Grid 1</TestItem>
          <TestItem>Grid 2</TestItem>
          <TestItem>Grid 3</TestItem>
          <TestItem>Grid 4</TestItem>
          <TestItem>Grid 5</TestItem>
          <TestItem>Grid 6</TestItem>
        </Flex>
        
        <Flex preset="hero" marginBottom="md">
          <PlaceholderItem>Hero Content</PlaceholderItem>
          <PlaceholderItem>Call to Action</PlaceholderItem>
        </Flex>
        
        <Flex preset="footer">
          <PlaceholderItem>Footer Content</PlaceholderItem>
          <PlaceholderItem>Footer Links</PlaceholderItem>
        </Flex>
      </View>

      {/* Styling Tests */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Styling Options</Text>
        
        <Flex 
          direction="row" 
          gap="md" 
          padding="lg" 
          backgroundColor={theme.colors.mystical.deep}
          borderRadius="md"
          marginBottom="md"
        >
          <TestItem>Styled</TestItem>
          <TestItem>Container</TestItem>
        </Flex>
        
        <Flex 
          direction="row" 
          gap="md" 
          padding="lg" 
          backgroundColor={theme.colors.cosmos.medium}
          borderRadius="lg"
          shadow
          marginBottom="md"
        >
          <TestItem>With</TestItem>
          <TestItem>Shadow</TestItem>
        </Flex>
        
        <Flex 
          direction="row" 
          gap="md" 
          margin="md"
          padding="lg" 
          backgroundColor={theme.colors.luxury.bronze}
          customBorderRadius={20}
        >
          <TestItem>Custom</TestItem>
          <TestItem>Styling</TestItem>
        </Flex>
      </View>

      {/* Complex Layout Tests */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Complex Layouts</Text>
        
        <Flex direction="column" gap="md" marginBottom="md">
          <Flex direction="row" justifyContent="space-between" alignItems="center">
            <TestItem>Header Left</TestItem>
            <TestItem>Header Right</TestItem>
          </Flex>
          
          <Flex direction="row" gap="md" wrap="wrap">
            <Flex direction="column" gap="sm" grow={1}>
              <TestItem>Main Content</TestItem>
              <TestItem>Content 2</TestItem>
              <TestItem>Content 3</TestItem>
            </Flex>
            
            <Flex direction="column" gap="sm" basis={120}>
              <TestItem>Sidebar</TestItem>
              <TestItem>Sidebar</TestItem>
            </Flex>
          </Flex>
          
          <Flex direction="row" justifyContent="center" gap="md">
            <TestItem>Footer 1</TestItem>
            <TestItem>Footer 2</TestItem>
            <TestItem>Footer 3</TestItem>
          </Flex>
        </Flex>
      </View>

      {/* Performance Test */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Performance Test</Text>
        
        <Flex direction="row" wrap="wrap" gap="sm">
          {Array.from({ length: 50 }, (_, i) => (
            <TestItem key={i}>Item {i + 1}</TestItem>
          ))}
        </Flex>
      </View>
    </ScrollView>
  );
};

export default FlexTest;
