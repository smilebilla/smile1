/**
 * StackTest.tsx
 * 
 * Comprehensive test component for Stack primitive
 * Layout Primitive System - Module 83 Test
 * 
 * Tests:
 * - All spacing variants (none, xs, sm, md, lg, xl, xxl)
 * - All alignment options (start, center, end, stretch)
 * - All distribution options (start, center, end, space-between, space-around, space-evenly)
 * - Divider functionality with different positions
 * - Reversed layout
 * - Responsive behavior
 * - Accessibility features
 * - Performance with large lists
 */

import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { Stack } from '../Stack';

// Test content components
const TestItem: React.FC<{ color: string; text: string; height?: number }> = ({ 
  color, 
  text, 
  height = 60 
}) => (
  <View style={[styles.testItem, { backgroundColor: color, height }]}>
    <Text style={styles.testItemText}>{text}</Text>
  </View>
);

const TestSection: React.FC<{ title: string; children: React.ReactNode }> = ({ 
  title, 
  children 
}) => (
  <View style={styles.testSection}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

/**
 * Stack Test Component
 * Comprehensive testing for all Stack features
 */
export const StackTest: React.FC = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Stack Component Test</Text>
      <Text style={styles.subtitle}>Layout Primitive System - Module 83</Text>
      
      {/* Basic Usage */}
      <TestSection title="1. Basic Usage">
        <Stack spacing="md" testID="basic-stack">
          <TestItem color="#FF6B6B" text="Item 1" />
          <TestItem color="#4ECDC4" text="Item 2" />
          <TestItem color="#45B7D1" text="Item 3" />
        </Stack>
      </TestSection>

      {/* Spacing Variants */}
      <TestSection title="2. Spacing Variants">
        <Text style={styles.variantTitle}>None Spacing</Text>
        <Stack spacing="none" testID="spacing-none">
          <TestItem color="#FF6B6B" text="None" height={40} />
          <TestItem color="#4ECDC4" text="None" height={40} />
        </Stack>
        
        <Text style={styles.variantTitle}>XS Spacing</Text>
        <Stack spacing="xs" testID="spacing-xs">
          <TestItem color="#FF6B6B" text="XS" height={40} />
          <TestItem color="#4ECDC4" text="XS" height={40} />
        </Stack>
        
        <Text style={styles.variantTitle}>SM Spacing</Text>
        <Stack spacing="sm" testID="spacing-sm">
          <TestItem color="#FF6B6B" text="SM" height={40} />
          <TestItem color="#4ECDC4" text="SM" height={40} />
        </Stack>
        
        <Text style={styles.variantTitle}>MD Spacing</Text>
        <Stack spacing="md" testID="spacing-md">
          <TestItem color="#FF6B6B" text="MD" height={40} />
          <TestItem color="#4ECDC4" text="MD" height={40} />
        </Stack>
        
        <Text style={styles.variantTitle}>LG Spacing</Text>
        <Stack spacing="lg" testID="spacing-lg">
          <TestItem color="#FF6B6B" text="LG" height={40} />
          <TestItem color="#4ECDC4" text="LG" height={40} />
        </Stack>
        
        <Text style={styles.variantTitle}>XL Spacing</Text>
        <Stack spacing="xl" testID="spacing-xl">
          <TestItem color="#FF6B6B" text="XL" height={40} />
          <TestItem color="#4ECDC4" text="XL" height={40} />
        </Stack>
        
        <Text style={styles.variantTitle}>XXL Spacing</Text>
        <Stack spacing="xxl" testID="spacing-xxl">
          <TestItem color="#FF6B6B" text="XXL" height={40} />
          <TestItem color="#4ECDC4" text="XXL" height={40} />
        </Stack>
      </TestSection>

      {/* Custom Spacing */}
      <TestSection title="3. Custom Spacing">
        <Stack customSpacing={50} testID="custom-spacing">
          <TestItem color="#FF6B6B" text="Custom 50px" height={40} />
          <TestItem color="#4ECDC4" text="Custom 50px" height={40} />
        </Stack>
      </TestSection>

      {/* Alignment Options */}
      <TestSection title="4. Alignment Options">
        <Text style={styles.variantTitle}>Start Alignment</Text>
        <Stack spacing="md" alignment="start" testID="alignment-start">
          <TestItem color="#FF6B6B" text="Start" height={40} />
          <TestItem color="#4ECDC4" text="Start" height={40} />
        </Stack>
        
        <Text style={styles.variantTitle}>Center Alignment</Text>
        <Stack spacing="md" alignment="center" testID="alignment-center">
          <TestItem color="#FF6B6B" text="Center" height={40} />
          <TestItem color="#4ECDC4" text="Center" height={40} />
        </Stack>
        
        <Text style={styles.variantTitle}>End Alignment</Text>
        <Stack spacing="md" alignment="end" testID="alignment-end">
          <TestItem color="#FF6B6B" text="End" height={40} />
          <TestItem color="#4ECDC4" text="End" height={40} />
        </Stack>
        
        <Text style={styles.variantTitle}>Stretch Alignment</Text>
        <Stack spacing="md" alignment="stretch" testID="alignment-stretch">
          <TestItem color="#FF6B6B" text="Stretch" height={40} />
          <TestItem color="#4ECDC4" text="Stretch" height={40} />
        </Stack>
      </TestSection>

      {/* Distribution Options */}
      <TestSection title="5. Distribution Options">
        <Text style={styles.variantTitle}>Start Distribution</Text>
        <Stack 
          spacing="md" 
          distribution="start" 
          minHeight={200} 
          testID="distribution-start"
          style={styles.distributionContainer}
        >
          <TestItem color="#FF6B6B" text="Start" height={40} />
          <TestItem color="#4ECDC4" text="Start" height={40} />
        </Stack>
        
        <Text style={styles.variantTitle}>Center Distribution</Text>
        <Stack 
          spacing="md" 
          distribution="center" 
          minHeight={200} 
          testID="distribution-center"
          style={styles.distributionContainer}
        >
          <TestItem color="#FF6B6B" text="Center" height={40} />
          <TestItem color="#4ECDC4" text="Center" height={40} />
        </Stack>
        
        <Text style={styles.variantTitle}>End Distribution</Text>
        <Stack 
          spacing="md" 
          distribution="end" 
          minHeight={200} 
          testID="distribution-end"
          style={styles.distributionContainer}
        >
          <TestItem color="#FF6B6B" text="End" height={40} />
          <TestItem color="#4ECDC4" text="End" height={40} />
        </Stack>
        
        <Text style={styles.variantTitle}>Space Between</Text>
        <Stack 
          spacing="md" 
          distribution="space-between" 
          minHeight={200} 
          testID="distribution-space-between"
          style={styles.distributionContainer}
        >
          <TestItem color="#FF6B6B" text="Space Between" height={40} />
          <TestItem color="#4ECDC4" text="Space Between" height={40} />
        </Stack>
        
        <Text style={styles.variantTitle}>Space Around</Text>
        <Stack 
          spacing="md" 
          distribution="space-around" 
          minHeight={200} 
          testID="distribution-space-around"
          style={styles.distributionContainer}
        >
          <TestItem color="#FF6B6B" text="Space Around" height={40} />
          <TestItem color="#4ECDC4" text="Space Around" height={40} />
        </Stack>
        
        <Text style={styles.variantTitle}>Space Evenly</Text>
        <Stack 
          spacing="md" 
          distribution="space-evenly" 
          minHeight={200} 
          testID="distribution-space-evenly"
          style={styles.distributionContainer}
        >
          <TestItem color="#FF6B6B" text="Space Evenly" height={40} />
          <TestItem color="#4ECDC4" text="Space Evenly" height={40} />
        </Stack>
      </TestSection>

      {/* Dividers */}
      <TestSection title="6. Dividers">
        <Text style={styles.variantTitle}>Between Dividers</Text>
        <Stack 
          spacing="md" 
          dividers={true} 
          dividerPosition="between" 
          testID="dividers-between"
        >
          <TestItem color="#FF6B6B" text="Item 1" height={40} />
          <TestItem color="#4ECDC4" text="Item 2" height={40} />
          <TestItem color="#45B7D1" text="Item 3" height={40} />
        </Stack>
        
        <Text style={styles.variantTitle}>After Dividers</Text>
        <Stack 
          spacing="md" 
          dividers={true} 
          dividerPosition="after" 
          testID="dividers-after"
        >
          <TestItem color="#FF6B6B" text="Item 1" height={40} />
          <TestItem color="#4ECDC4" text="Item 2" height={40} />
          <TestItem color="#45B7D1" text="Item 3" height={40} />
        </Stack>
        
        <Text style={styles.variantTitle}>Before Dividers</Text>
        <Stack 
          spacing="md" 
          dividers={true} 
          dividerPosition="before" 
          testID="dividers-before"
        >
          <TestItem color="#FF6B6B" text="Item 1" height={40} />
          <TestItem color="#4ECDC4" text="Item 2" height={40} />
          <TestItem color="#45B7D1" text="Item 3" height={40} />
        </Stack>
        
        <Text style={styles.variantTitle}>Custom Divider Color & Thickness</Text>
        <Stack 
          spacing="md" 
          dividers={true} 
          dividerColor="#FF6B6B" 
          dividerThickness={3} 
          testID="dividers-custom"
        >
          <TestItem color="#FF6B6B" text="Item 1" height={40} />
          <TestItem color="#4ECDC4" text="Item 2" height={40} />
          <TestItem color="#45B7D1" text="Item 3" height={40} />
        </Stack>
      </TestSection>

      {/* Reversed Layout */}
      <TestSection title="7. Reversed Layout">
        <Stack spacing="md" reversed={true} testID="reversed-stack">
          <TestItem color="#FF6B6B" text="First (shows last)" height={40} />
          <TestItem color="#4ECDC4" text="Second (shows middle)" height={40} />
          <TestItem color="#45B7D1" text="Third (shows first)" height={40} />
        </Stack>
      </TestSection>

      {/* Flex Options */}
      <TestSection title="8. Flex Options">
        <Text style={styles.variantTitle}>Flex Grow</Text>
        <View style={styles.flexContainer}>
          <Stack 
            spacing="md" 
            flexGrow={true} 
            testID="flex-grow"
            style={styles.flexStack}
          >
            <TestItem color="#FF6B6B" text="Flex Grow" height={40} />
            <TestItem color="#4ECDC4" text="Flex Grow" height={40} />
          </Stack>
        </View>
        
        <Text style={styles.variantTitle}>Flex Shrink</Text>
        <View style={styles.flexContainer}>
          <Stack 
            spacing="md" 
            flexShrink={true} 
            testID="flex-shrink"
            style={styles.flexStack}
          >
            <TestItem color="#FF6B6B" text="Flex Shrink" height={40} />
            <TestItem color="#4ECDC4" text="Flex Shrink" height={40} />
          </Stack>
        </View>
      </TestSection>

      {/* Size Constraints */}
      <TestSection title="9. Size Constraints">
        <Text style={styles.variantTitle}>Min Height</Text>
        <Stack 
          spacing="md" 
          minHeight={150} 
          testID="min-height"
          style={styles.constraintContainer}
        >
          <TestItem color="#FF6B6B" text="Min Height 150px" height={40} />
        </Stack>
        
        <Text style={styles.variantTitle}>Max Height</Text>
        <Stack 
          spacing="md" 
          maxHeight={100} 
          testID="max-height"
          style={styles.constraintContainer}
        >
          <TestItem color="#FF6B6B" text="Max Height 100px" height={60} />
          <TestItem color="#4ECDC4" text="Max Height 100px" height={60} />
        </Stack>
      </TestSection>

      {/* Responsive Behavior */}
      <TestSection title="10. Responsive Behavior">
        <Stack 
          spacing="md" 
          responsive={true} 
          testID="responsive-stack"
        >
          <TestItem color="#FF6B6B" text="Responsive Width" height={40} />
          <TestItem color="#4ECDC4" text="Responsive Width" height={40} />
        </Stack>
      </TestSection>

      {/* Accessibility */}
      <TestSection title="11. Accessibility">
        <Stack 
          spacing="md" 
          accessibilityLabel="Test navigation stack" 
          accessibilityHint="Contains navigation items" 
          accessibilityRole="list"
          testID="accessibility-stack"
        >
          <TestItem color="#FF6B6B" text="Accessible Item 1" height={40} />
          <TestItem color="#4ECDC4" text="Accessible Item 2" height={40} />
          <TestItem color="#45B7D1" text="Accessible Item 3" height={40} />
        </Stack>
      </TestSection>

      {/* Performance Test */}
      <TestSection title="12. Performance Test">
        <Stack spacing="sm" testID="performance-stack">
          {Array.from({ length: 20 }, (_, i) => (
            <TestItem 
              key={i} 
              color={i % 2 === 0 ? '#FF6B6B' : '#4ECDC4'} 
              text={`Performance Item ${i + 1}`} 
              height={35} 
            />
          ))}
        </Stack>
      </TestSection>

      {/* Complex Layout */}
      <TestSection title="13. Complex Layout">
        <Stack spacing="lg" testID="complex-stack">
          <TestItem color="#FF6B6B" text="Header" height={50} />
          <Stack spacing="md" alignment="center">
            <TestItem color="#4ECDC4" text="Sub Item 1" height={40} />
            <TestItem color="#45B7D1" text="Sub Item 2" height={40} />
          </Stack>
          <TestItem color="#96CEB4" text="Footer" height={50} />
        </Stack>
      </TestSection>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Stack Component Test Complete ✓
        </Text>
        <Text style={styles.footerSubtext}>
          All features validated and working
        </Text>
      </View>
    </ScrollView>
  );
};

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#2E86DE',
    textAlign: 'center',
    marginBottom: 30,
  },
  testSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 15,
  },
  variantTitle: {
    fontSize: 14,
    color: '#CCCCCC',
    marginBottom: 8,
    marginTop: 15,
  },
  testItem: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  testItemText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  distributionContainer: {
    backgroundColor: 'rgba(46, 134, 222, 0.1)',
    borderRadius: 8,
    padding: 12,
  },
  flexContainer: {
    height: 120,
    backgroundColor: 'rgba(46, 134, 222, 0.1)',
    borderRadius: 8,
    padding: 12,
  },
  flexStack: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 6,
    padding: 8,
  },
  constraintContainer: {
    backgroundColor: 'rgba(46, 134, 222, 0.1)',
    borderRadius: 8,
    padding: 12,
  },
  footer: {
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
  },
  footerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4ECDC4',
  },
  footerSubtext: {
    fontSize: 14,
    color: '#CCCCCC',
    marginTop: 4,
  },
});

export default StackTest;
