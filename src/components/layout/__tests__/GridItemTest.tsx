/**
 * GridItemTest.tsx
 * 
 * Test component for GridItem primitive
 * Layout Primitive System - Module 86 Test
 * 
 * Features tested:
 * - Basic grid item positioning with column and row span
 * - Named grid area placement
 * - Responsive grid item configurations
 * - Alignment and justification controls
 * - Auto-sizing behavior
 * - Order control for positioning
 * - Size constraints and aspect ratio
 * - Overflow handling
 * - Preset configurations
 * - Accessibility features
 * - Performance with multiple grid items
 * - Custom styling and theme integration
 */

import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import Grid from '../Grid';
import GridItem, { GridItemProps, GridItemAlignment, GridItemJustification, GridItemOverflow, GridItemPreset } from '../GridItem';
import { useTheme } from '../../../foundations/themes/useTheme';

// Test data
const gridItemsData = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `Item ${i + 1}`,
  color: `hsl(${(i * 25) % 360}, 70%, 60%)`,
  content: `Grid item ${i + 1} with content`,
}));

// Test Grid Item Component
const TestGridItem: React.FC<{
  item: { id: number; title: string; color: string; content: string };
  height?: number;
  children?: React.ReactNode;
}> = ({ item, height = 80, children }) => (
  <View style={[styles.gridItem, { backgroundColor: item.color, height }]}>
    <Text style={styles.gridItemTitle}>{item.title}</Text>
    <Text style={styles.gridItemContent}>{item.content}</Text>
    {children}
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
 * GridItemTest Component
 * 
 * Comprehensive test suite for GridItem primitive
 */
const GridItemTest: React.FC = () => {
  const theme = useTheme();
  const [selectedAlignment, setSelectedAlignment] = useState<GridItemAlignment>('stretch');
  const [selectedJustification, setSelectedJustification] = useState<GridItemJustification>('stretch');
  const [selectedOverflow, setSelectedOverflow] = useState<GridItemOverflow>('visible');
  const [selectedPreset, setSelectedPreset] = useState<GridItemPreset>('card');

  const alignmentVariants: GridItemAlignment[] = ['start', 'center', 'end', 'stretch'];
  const justificationVariants: GridItemJustification[] = ['start', 'center', 'end', 'stretch'];
  const overflowVariants: GridItemOverflow[] = ['visible', 'hidden', 'scroll'];
  const presetVariants: GridItemPreset[] = ['card', 'hero', 'sidebar', 'header', 'footer', 'banner', 'tile', 'feature'];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.cosmos.void }]}>
      <Text style={[styles.title, { color: theme.colors.neutral.text }]}>
        GridItem Component Test Suite
      </Text>

      {/* Basic Grid Item Positioning */}
      <TestSection title="Basic Grid Item Positioning">
        <View style={styles.testGroup}>
          <Text style={[styles.testLabel, { color: theme.colors.neutral.medium }]}>
            Column and Row Spans
          </Text>
          <Grid columns={4} gap="md" testID="grid-item-spans">
            <GridItem columnSpan={1} rowSpan={1} testID="grid-item-1x1">
              <TestGridItem item={gridItemsData[0]} />
            </GridItem>
            <GridItem columnSpan={2} rowSpan={1} testID="grid-item-2x1">
              <TestGridItem item={gridItemsData[1]} />
            </GridItem>
            <GridItem columnSpan={1} rowSpan={2} testID="grid-item-1x2">
              <TestGridItem item={gridItemsData[2]} height={160} />
            </GridItem>
            <GridItem columnSpan={1} rowSpan={1} testID="grid-item-1x1-2">
              <TestGridItem item={gridItemsData[3]} />
            </GridItem>
            <GridItem columnSpan={2} rowSpan={1} testID="grid-item-2x1-2">
              <TestGridItem item={gridItemsData[4]} />
            </GridItem>
            <GridItem columnSpan={1} rowSpan={1} testID="grid-item-1x1-3">
              <TestGridItem item={gridItemsData[5]} />
            </GridItem>
          </Grid>
        </View>

        <View style={styles.testGroup}>
          <Text style={[styles.testLabel, { color: theme.colors.neutral.medium }]}>
            Explicit Positioning
          </Text>
          <Grid columns={3} gap="md" testID="grid-item-positioning">
            <GridItem columnStart={1} columnEnd={3} rowStart={1} rowEnd={1} testID="grid-item-span-cols">
              <TestGridItem item={gridItemsData[6]} />
            </GridItem>
            <GridItem columnStart={3} columnEnd={4} rowStart={1} rowEnd={3} testID="grid-item-span-rows">
              <TestGridItem item={gridItemsData[7]} height={160} />
            </GridItem>
            <GridItem columnStart={1} columnEnd={2} rowStart={2} rowEnd={3} testID="grid-item-positioned">
              <TestGridItem item={gridItemsData[8]} height={160} />
            </GridItem>
            <GridItem columnStart={2} columnEnd={3} rowStart={2} rowEnd={3} testID="grid-item-positioned-2">
              <TestGridItem item={gridItemsData[9]} height={160} />
            </GridItem>
          </Grid>
        </View>
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

        <Grid columns={2} gap="lg" testID={`grid-item-alignment-${selectedAlignment}-${selectedJustification}`}>
          <GridItem 
            columnSpan={1} 
            rowSpan={1} 
            alignment={selectedAlignment}
            justification={selectedJustification}
            testID="grid-item-align-test-1"
          >
            <TestGridItem item={gridItemsData[10]} height={120} />
          </GridItem>
          <GridItem 
            columnSpan={1} 
            rowSpan={1} 
            alignment={selectedAlignment}
            justification={selectedJustification}
            testID="grid-item-align-test-2"
          >
            <TestGridItem item={gridItemsData[11]} height={100} />
          </GridItem>
        </Grid>
      </TestSection>

      {/* Overflow Handling */}
      <TestSection title="Overflow Handling">
        <View style={styles.controlGroup}>
          <Text style={[styles.controlLabel, { color: theme.colors.neutral.medium }]}>
            Overflow: {selectedOverflow}
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {overflowVariants.map(overflow => (
              <View key={overflow} style={styles.controlButton}>
                <Text 
                  style={[
                    styles.controlButtonText,
                    { 
                      color: selectedOverflow === overflow ? theme.colors.brand.primary : theme.colors.neutral.medium 
                    }
                  ]}
                  onPress={() => setSelectedOverflow(overflow)}
                >
                  {overflow}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <Grid columns={2} gap="md" testID={`grid-item-overflow-${selectedOverflow}`}>
          <GridItem 
            columnSpan={1} 
            rowSpan={1} 
            overflow={selectedOverflow}
            testID="grid-item-overflow-test-1"
          >
            <TestGridItem item={gridItemsData[12]} height={80}>
              <Text style={styles.overflowText}>
                This is a long text that might overflow the container bounds. 
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Text>
            </TestGridItem>
          </GridItem>
          <GridItem 
            columnSpan={1} 
            rowSpan={1} 
            overflow={selectedOverflow}
            testID="grid-item-overflow-test-2"
          >
            <TestGridItem item={gridItemsData[13]} height={80}>
              <Text style={styles.overflowText}>
                Another long text example for overflow testing purposes. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </Text>
            </TestGridItem>
          </GridItem>
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

        <Grid columns={4} gap="md" testID={`grid-item-preset-${selectedPreset}`}>
          <GridItem preset={selectedPreset} testID="grid-item-preset-test">
            <TestGridItem item={gridItemsData[14]} height={selectedPreset === 'hero' ? 160 : 80} />
          </GridItem>
          {/* Fill remaining space with regular items */}
          {gridItemsData.slice(15, 19).map(item => (
            <GridItem key={item.id} columnSpan={1} rowSpan={1} testID={`grid-item-fill-${item.id}`}>
              <TestGridItem item={item} height={80} />
            </GridItem>
          ))}
        </Grid>
      </TestSection>

      {/* Size Constraints and Aspect Ratio */}
      <TestSection title="Size Constraints and Aspect Ratio">
        <View style={styles.testGroup}>
          <Text style={[styles.testLabel, { color: theme.colors.neutral.medium }]}>
            Size Constraints
          </Text>
          <Grid columns={3} gap="md" testID="grid-item-size-constraints">
            <GridItem 
              columnSpan={1} 
              rowSpan={1} 
              minWidth={100} 
              maxWidth={150}
              testID="grid-item-width-constraints"
            >
              <TestGridItem item={gridItemsData[15]} height={80} />
            </GridItem>
            <GridItem 
              columnSpan={1} 
              rowSpan={1} 
              minHeight={100} 
              maxHeight={120}
              testID="grid-item-height-constraints"
            >
              <TestGridItem item={gridItemsData[16]} height={120} />
            </GridItem>
            <GridItem 
              columnSpan={1} 
              rowSpan={1} 
              aspectRatio={1.5}
              testID="grid-item-aspect-ratio"
            >
              <TestGridItem item={gridItemsData[17]} height={80} />
            </GridItem>
          </Grid>
        </View>

        <View style={styles.testGroup}>
          <Text style={[styles.testLabel, { color: theme.colors.neutral.medium }]}>
            Square Aspect Ratio (1:1)
          </Text>
          <Grid columns={4} gap="sm" testID="grid-item-square-ratio">
            {gridItemsData.slice(0, 4).map(item => (
              <GridItem 
                key={item.id} 
                columnSpan={1} 
                rowSpan={1} 
                aspectRatio={1}
                testID={`grid-item-square-${item.id}`}
              >
                <TestGridItem item={item} height={80} />
              </GridItem>
            ))}
          </Grid>
        </View>
      </TestSection>

      {/* Order Control */}
      <TestSection title="Order Control">
        <View style={styles.testGroup}>
          <Text style={[styles.testLabel, { color: theme.colors.neutral.medium }]}>
            Visual Order vs Source Order
          </Text>
          <Grid columns={3} gap="md" testID="grid-item-order">
            <GridItem columnSpan={1} rowSpan={1} order={3} testID="grid-item-order-3">
              <TestGridItem item={{ ...gridItemsData[0], title: 'Order 3' }} />
            </GridItem>
            <GridItem columnSpan={1} rowSpan={1} order={1} testID="grid-item-order-1">
              <TestGridItem item={{ ...gridItemsData[1], title: 'Order 1' }} />
            </GridItem>
            <GridItem columnSpan={1} rowSpan={1} order={2} testID="grid-item-order-2">
              <TestGridItem item={{ ...gridItemsData[2], title: 'Order 2' }} />
            </GridItem>
          </Grid>
        </View>
      </TestSection>

      {/* Responsive Grid Items */}
      <TestSection title="Responsive Grid Items">
        <View style={styles.testGroup}>
          <Text style={[styles.testLabel, { color: theme.colors.neutral.medium }]}>
            Responsive Configuration
          </Text>
          <Grid columns={4} gap="md" testID="grid-item-responsive">
            <GridItem 
              columnSpan={2}
              rowSpan={1}
              enableResponsive={true}
              responsive={{
                xs: { columnSpan: 4, rowSpan: 1 },
                sm: { columnSpan: 2, rowSpan: 1 },
                md: { columnSpan: 1, rowSpan: 1 },
                lg: { columnSpan: 2, rowSpan: 1 },
                xl: { columnSpan: 1, rowSpan: 1 },
              }}
              testID="grid-item-responsive-main"
            >
              <TestGridItem item={gridItemsData[18]} />
            </GridItem>
            <GridItem columnSpan={1} rowSpan={1} testID="grid-item-responsive-side-1">
              <TestGridItem item={gridItemsData[19]} />
            </GridItem>
            <GridItem columnSpan={1} rowSpan={1} testID="grid-item-responsive-side-2">
              <TestGridItem item={gridItemsData[0]} />
            </GridItem>
          </Grid>
        </View>
      </TestSection>

      {/* Complex Layout Example */}
      <TestSection title="Complex Layout Example">
        <View style={styles.testGroup}>
          <Text style={[styles.testLabel, { color: theme.colors.neutral.medium }]}>
            Dashboard Layout with Various Grid Items
          </Text>
          <Grid columns={6} gap="md" testID="grid-item-complex-layout">
            {/* Header */}
            <GridItem preset="header" testID="grid-item-header">
              <TestGridItem item={{ ...gridItemsData[0], title: 'Header' }} />
            </GridItem>
            
            {/* Sidebar */}
            <GridItem preset="sidebar" testID="grid-item-sidebar">
              <TestGridItem item={{ ...gridItemsData[1], title: 'Sidebar' }} height={200} />
            </GridItem>
            
            {/* Main content area */}
            <GridItem columnSpan={3} rowSpan={2} testID="grid-item-main-content">
              <TestGridItem item={{ ...gridItemsData[2], title: 'Main Content' }} height={200} />
            </GridItem>
            
            {/* Feature card */}
            <GridItem preset="feature" testID="grid-item-feature">
              <TestGridItem item={{ ...gridItemsData[3], title: 'Feature' }} />
            </GridItem>
            
            {/* Small tiles */}
            <GridItem preset="tile" testID="grid-item-tile-1">
              <TestGridItem item={{ ...gridItemsData[4], title: 'Tile 1' }} />
            </GridItem>
            <GridItem preset="tile" testID="grid-item-tile-2">
              <TestGridItem item={{ ...gridItemsData[5], title: 'Tile 2' }} />
            </GridItem>
            
            {/* Footer */}
            <GridItem preset="footer" testID="grid-item-footer">
              <TestGridItem item={{ ...gridItemsData[6], title: 'Footer' }} />
            </GridItem>
          </Grid>
        </View>
      </TestSection>

      {/* Accessibility Test */}
      <TestSection title="Accessibility">
        <View style={styles.testGroup}>
          <Text style={[styles.testLabel, { color: theme.colors.neutral.medium }]}>
            Accessible Grid Items with Labels
          </Text>
          <Grid columns={2} gap="md" testID="grid-item-accessibility">
            <GridItem 
              columnSpan={1} 
              rowSpan={1}
              accessibilityLabel="Main article grid item"
              accessibilityHint="Contains main article content"
              testID="grid-item-accessible-1"
            >
              <TestGridItem item={gridItemsData[7]} />
            </GridItem>
            <GridItem 
              columnSpan={1} 
              rowSpan={1}
              accessibilityLabel="Sidebar grid item"
              accessibilityHint="Contains sidebar navigation"
              testID="grid-item-accessible-2"
            >
              <TestGridItem item={gridItemsData[8]} />
            </GridItem>
          </Grid>
        </View>
      </TestSection>

      {/* Performance Test */}
      <TestSection title="Performance Test">
        <View style={styles.testGroup}>
          <Text style={[styles.testLabel, { color: theme.colors.neutral.medium }]}>
            Multiple Grid Items Performance
          </Text>
          <Grid columns={4} gap="sm" testID="grid-item-performance">
            {gridItemsData.map(item => (
              <GridItem 
                key={item.id} 
                columnSpan={1} 
                rowSpan={1}
                testID={`grid-item-perf-${item.id}`}
              >
                <TestGridItem item={item} height={60} />
              </GridItem>
            ))}
          </Grid>
        </View>
      </TestSection>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: theme.colors.neutral.muted }]}>
          GridItem Component Test Suite Complete
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
  gridItemTitle: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  gridItemContent: {
    color: '#fff',
    fontSize: 10,
    textAlign: 'center',
    opacity: 0.9,
  },
  overflowText: {
    color: '#fff',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 4,
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

export default GridItemTest;
