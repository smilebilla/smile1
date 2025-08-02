/**
 * GridTest.tsx
 * 
 * Test component for Grid primitive
 * Layout Primitive System - Module 85 Test
 * 
 * Features tested:
 * - Basic grid layout with different column configurations
 * - Grid spacing (gap) variants
 * - Grid alignment and justification
 * - Auto-fit and auto-fill behaviors
 * - Responsive grid configurations
 * - Grid preset configurations
 * - Minimum and maximum column/row dimensions
 * - Dense packing behavior
 * - Accessibility features
 * - Performance with large grids
 * - Custom styling and theme integration
 */

import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import Grid, { GridProps, GridSpacing, GridAlignment, GridJustification, GridPreset } from '../Grid';
import { useTheme } from '../../../foundations/themes/useTheme';

// Test data
const gridItems = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  title: `Item ${i + 1}`,
  color: `hsl(${(i * 30) % 360}, 70%, 60%)`,
}));

const moreGridItems = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `Item ${i + 1}`,
  color: `hsl(${(i * 15) % 360}, 65%, 55%)`,
}));

// Test Item Component
const GridItem: React.FC<{ item: { id: number; title: string; color: string }; height?: number }> = ({ 
  item, 
  height = 80 
}) => (
  <View style={[styles.gridItem, { backgroundColor: item.color, height }]}>
    <Text style={styles.gridItemText}>{item.title}</Text>
  </View>
);

// Test Section Component
const TestSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

/**
 * GridTest Component
 * 
 * Comprehensive test suite for Grid primitive
 */
const GridTest: React.FC = () => {
  const theme = useTheme();
  const [selectedSpacing, setSelectedSpacing] = useState<GridSpacing>('md');
  const [selectedAlignment, setSelectedAlignment] = useState<GridAlignment>('stretch');
  const [selectedJustification, setSelectedJustification] = useState<GridJustification>('start');
  const [selectedPreset, setSelectedPreset] = useState<GridPreset>('cards');

  const spacingVariants: GridSpacing[] = ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
  const alignmentVariants: GridAlignment[] = ['start', 'center', 'end', 'stretch', 'space-between', 'space-around', 'space-evenly'];
  const justificationVariants: GridJustification[] = ['start', 'center', 'end', 'stretch', 'space-between', 'space-around', 'space-evenly'];
  const presetVariants: GridPreset[] = ['cards', 'gallery', 'dashboard', 'masonry', 'sidebar', 'header', 'footer', 'tiles'];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.cosmos.void }]}>
      <Text style={[styles.title, { color: theme.colors.neutral.text }]}>
        Grid Component Test Suite
      </Text>

      {/* Basic Grid Layouts */}
      <TestSection title="Basic Grid Layouts">
        <View style={styles.testGroup}>
          <Text style={[styles.testLabel, { color: theme.colors.neutral.medium }]}>
            2 Columns
          </Text>
          <Grid columns={2} gap="md" testID="grid-2-columns">
            {gridItems.slice(0, 6).map(item => (
              <GridItem key={item.id} item={item} />
            ))}
          </Grid>
        </View>

        <View style={styles.testGroup}>
          <Text style={[styles.testLabel, { color: theme.colors.neutral.medium }]}>
            3 Columns
          </Text>
          <Grid columns={3} gap="md" testID="grid-3-columns">
            {gridItems.slice(0, 9).map(item => (
              <GridItem key={item.id} item={item} />
            ))}
          </Grid>
        </View>

        <View style={styles.testGroup}>
          <Text style={[styles.testLabel, { color: theme.colors.neutral.medium }]}>
            4 Columns
          </Text>
          <Grid columns={4} gap="sm" testID="grid-4-columns">
            {gridItems.map(item => (
              <GridItem key={item.id} item={item} />
            ))}
          </Grid>
        </View>
      </TestSection>

      {/* Auto-fit and Auto-fill */}
      <TestSection title="Auto-fit and Auto-fill">
        <View style={styles.testGroup}>
          <Text style={[styles.testLabel, { color: theme.colors.neutral.medium }]}>
            Auto-fit (minColumnWidth: 150px)
          </Text>
          <Grid 
            columns="auto-fit" 
            gap="md" 
            minColumnWidth={150}
            testID="grid-auto-fit"
          >
            {gridItems.map(item => (
              <GridItem key={item.id} item={item} />
            ))}
          </Grid>
        </View>

        <View style={styles.testGroup}>
          <Text style={[styles.testLabel, { color: theme.colors.neutral.medium }]}>
            Auto-fill (minColumnWidth: 120px)
          </Text>
          <Grid 
            columns="auto-fill" 
            gap="md" 
            minColumnWidth={120}
            testID="grid-auto-fill"
          >
            {gridItems.slice(0, 8).map(item => (
              <GridItem key={item.id} item={item} />
            ))}
          </Grid>
        </View>
      </TestSection>

      {/* Spacing Variants */}
      <TestSection title="Spacing Variants">
        <View style={styles.controlGroup}>
          <Text style={[styles.controlLabel, { color: theme.colors.neutral.medium }]}>
            Current Spacing: {selectedSpacing}
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {spacingVariants.map(spacing => (
              <View key={spacing} style={styles.controlButton}>
                <Text 
                  style={[
                    styles.controlButtonText,
                    { 
                      color: selectedSpacing === spacing ? theme.colors.brand.primary : theme.colors.neutral.medium 
                    }
                  ]}
                  onPress={() => setSelectedSpacing(spacing)}
                >
                  {spacing}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <Grid 
          columns={3} 
          gap={selectedSpacing} 
          testID={`grid-spacing-${selectedSpacing}`}
        >
          {gridItems.slice(0, 9).map(item => (
            <GridItem key={item.id} item={item} />
          ))}
        </Grid>
      </TestSection>

      {/* Alignment and Justification */}
      <TestSection title="Alignment and Justification">
        <View style={styles.controlGroup}>
          <Text style={[styles.controlLabel, { color: theme.colors.neutral.medium }]}>
            Alignment: {selectedAlignment}
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {alignmentVariants.map(alignment => (
              <View key={alignment} style={styles.controlButton}>
                <Text 
                  style={[
                    styles.controlButtonText,
                    { 
                      color: selectedAlignment === alignment ? theme.colors.brand.primary : theme.colors.neutral.medium 
                    }
                  ]}
                  onPress={() => setSelectedAlignment(alignment)}
                >
                  {alignment}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.controlGroup}>
          <Text style={[styles.controlLabel, { color: theme.colors.neutral.medium }]}>
            Justification: {selectedJustification}
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {justificationVariants.map(justification => (
              <View key={justification} style={styles.controlButton}>
                <Text 
                  style={[
                    styles.controlButtonText,
                    { 
                      color: selectedJustification === justification ? theme.colors.brand.primary : theme.colors.neutral.medium 
                    }
                  ]}
                  onPress={() => setSelectedJustification(justification)}
                >
                  {justification}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <Grid 
          columns={3} 
          gap="md" 
          alignment={selectedAlignment}
          justification={selectedJustification}
          testID={`grid-alignment-${selectedAlignment}-${selectedJustification}`}
        >
          {gridItems.slice(0, 6).map(item => (
            <GridItem key={item.id} item={item} height={60 + (item.id * 10)} />
          ))}
        </Grid>
      </TestSection>

      {/* Preset Configurations */}
      <TestSection title="Preset Configurations">
        <View style={styles.controlGroup}>
          <Text style={[styles.controlLabel, { color: theme.colors.neutral.medium }]}>
            Current Preset: {selectedPreset}
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {presetVariants.map(preset => (
              <View key={preset} style={styles.controlButton}>
                <Text 
                  style={[
                    styles.controlButtonText,
                    { 
                      color: selectedPreset === preset ? theme.colors.brand.primary : theme.colors.neutral.medium 
                    }
                  ]}
                  onPress={() => setSelectedPreset(preset)}
                >
                  {preset}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <Grid 
          preset={selectedPreset}
          testID={`grid-preset-${selectedPreset}`}
        >
          {gridItems.map(item => (
            <GridItem key={item.id} item={item} />
          ))}
        </Grid>
      </TestSection>

      {/* Responsive Grid */}
      <TestSection title="Responsive Grid">
        <View style={styles.testGroup}>
          <Text style={[styles.testLabel, { color: theme.colors.neutral.medium }]}>
            Responsive Configuration
          </Text>
          <Grid 
            columns={2}
            gap="md"
            enableResponsive={true}
            responsive={{
              xs: { columns: 1, gap: 'sm' },
              sm: { columns: 2, gap: 'md' },
              md: { columns: 3, gap: 'lg' },
              lg: { columns: 4, gap: 'xl' },
              xl: { columns: 5, gap: 'xxl' },
            }}
            testID="grid-responsive"
          >
            {gridItems.map(item => (
              <GridItem key={item.id} item={item} />
            ))}
          </Grid>
        </View>
      </TestSection>

      {/* Advanced Grid Features */}
      <TestSection title="Advanced Features">
        <View style={styles.testGroup}>
          <Text style={[styles.testLabel, { color: theme.colors.neutral.medium }]}>
            Custom Gaps (Row: lg, Column: sm)
          </Text>
          <Grid 
            columns={3}
            rowGap="lg"
            columnGap="sm"
            testID="grid-custom-gaps"
          >
            {gridItems.slice(0, 9).map(item => (
              <GridItem key={item.id} item={item} />
            ))}
          </Grid>
        </View>

        <View style={styles.testGroup}>
          <Text style={[styles.testLabel, { color: theme.colors.neutral.medium }]}>
            Min/Max Column Width (min: 100px, max: 200px)
          </Text>
          <Grid 
            columns="auto-fit"
            gap="md"
            minColumnWidth={100}
            maxColumnWidth={200}
            testID="grid-min-max-width"
          >
            {gridItems.slice(0, 8).map(item => (
              <GridItem key={item.id} item={item} />
            ))}
          </Grid>
        </View>

        <View style={styles.testGroup}>
          <Text style={[styles.testLabel, { color: theme.colors.neutral.medium }]}>
            Dense Packing
          </Text>
          <Grid 
            columns={4}
            gap="sm"
            dense={true}
            testID="grid-dense"
          >
            {gridItems.map(item => (
              <GridItem key={item.id} item={item} height={60 + (item.id % 3) * 20} />
            ))}
          </Grid>
        </View>
      </TestSection>

      {/* Performance Test */}
      <TestSection title="Performance Test">
        <View style={styles.testGroup}>
          <Text style={[styles.testLabel, { color: theme.colors.neutral.medium }]}>
            Large Grid (50 items)
          </Text>
          <Grid 
            columns="auto-fit"
            gap="sm"
            minColumnWidth={80}
            testID="grid-performance"
          >
            {moreGridItems.map(item => (
              <GridItem key={item.id} item={item} height={60} />
            ))}
          </Grid>
        </View>
      </TestSection>

      {/* Accessibility Test */}
      <TestSection title="Accessibility">
        <View style={styles.testGroup}>
          <Text style={[styles.testLabel, { color: theme.colors.neutral.medium }]}>
            Accessible Grid with Labels
          </Text>
          <Grid 
            columns={3}
            gap="md"
            accessibilityLabel="Product grid with 3 columns"
            accessibilityHint="Grid containing product cards"
            testID="grid-accessibility"
          >
            {gridItems.slice(0, 6).map(item => (
              <GridItem key={item.id} item={item} />
            ))}
          </Grid>
        </View>
      </TestSection>

      {/* Custom Styling */}
      <TestSection title="Custom Styling">
        <View style={styles.testGroup}>
          <Text style={[styles.testLabel, { color: theme.colors.neutral.medium }]}>
            Custom Styled Grid
          </Text>
          <Grid 
            columns={2}
            gap="lg"
            style={{
              backgroundColor: theme.colors.cosmos.dark,
              padding: 16,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: theme.colors.neutral.medium,
            }}
            testID="grid-custom-style"
          >
            {gridItems.slice(0, 4).map(item => (
              <GridItem key={item.id} item={item} />
            ))}
          </Grid>
        </View>
      </TestSection>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: theme.colors.neutral.muted }]}>
          Grid Component Test Suite Complete
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  testGroup: {
    marginBottom: 24,
  },
  testLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  controlGroup: {
    marginBottom: 16,
  },
  controlLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  controlButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
  },
  controlButtonText: {
    fontSize: 12,
    fontWeight: '500',
  },
  gridItem: {
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  gridItemText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  footer: {
    padding: 32,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    fontStyle: 'italic',
  },
});

export default GridTest;
