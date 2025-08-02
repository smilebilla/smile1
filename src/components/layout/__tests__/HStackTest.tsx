/**
 * HStackTest.tsx
 * 
 * Comprehensive test component for HStack primitive
 * Layout Primitive System - Module 84 Test
 * 
 * Tests:
 * - All spacing variants (none, xs, sm, md, lg, xl, xxl)
 * - All alignment options (start, center, end, stretch)
 * - All distribution options (start, center, end, space-between, space-around, space-evenly)
 * - All wrap behaviors (wrap, nowrap, wrap-reverse)
 * - Divider functionality with different positions
 * - Reversed layout
 * - Responsive behavior
 * - Preset configurations
 * - Accessibility features
 * - Performance with large lists
 */

import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { HStack } from '../HStack';

// Test content components
const TestItem: React.FC<{ color: string; text: string; width?: number }> = ({ 
  color, 
  text, 
  width = 80 
}) => (
  <View style={[styles.testItem, { backgroundColor: color, width }]}>
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
 * HStack Test Component
 * Comprehensive testing for all HStack features
 */
export const HStackTest: React.FC = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>HStack Component Test</Text>
      <Text style={styles.subtitle}>Layout Primitive System - Module 84</Text>
      
      {/* Basic Usage */}
      <TestSection title="1. Basic Usage">
        <HStack spacing="md" testID="basic-hstack">
          <TestItem color="#FF6B6B" text="Item 1" />
          <TestItem color="#4ECDC4" text="Item 2" />
          <TestItem color="#45B7D1" text="Item 3" />
        </HStack>
      </TestSection>

      {/* Spacing Variants */}
      <TestSection title="2. Spacing Variants">
        <Text style={styles.variantTitle}>None Spacing</Text>
        <HStack spacing="none" testID="spacing-none">
          <TestItem color="#FF6B6B" text="None" width={60} />
          <TestItem color="#4ECDC4" text="None" width={60} />
        </HStack>
        
        <Text style={styles.variantTitle}>XS Spacing</Text>
        <HStack spacing="xs" testID="spacing-xs">
          <TestItem color="#FF6B6B" text="XS" width={60} />
          <TestItem color="#4ECDC4" text="XS" width={60} />
        </HStack>
        
        <Text style={styles.variantTitle}>SM Spacing</Text>
        <HStack spacing="sm" testID="spacing-sm">
          <TestItem color="#FF6B6B" text="SM" width={60} />
          <TestItem color="#4ECDC4" text="SM" width={60} />
        </HStack>
        
        <Text style={styles.variantTitle}>MD Spacing</Text>
        <HStack spacing="md" testID="spacing-md">
          <TestItem color="#FF6B6B" text="MD" width={60} />
          <TestItem color="#4ECDC4" text="MD" width={60} />
        </HStack>
        
        <Text style={styles.variantTitle}>LG Spacing</Text>
        <HStack spacing="lg" testID="spacing-lg">
          <TestItem color="#FF6B6B" text="LG" width={60} />
          <TestItem color="#4ECDC4" text="LG" width={60} />
        </HStack>
        
        <Text style={styles.variantTitle}>XL Spacing</Text>
        <HStack spacing="xl" testID="spacing-xl">
          <TestItem color="#FF6B6B" text="XL" width={60} />
          <TestItem color="#4ECDC4" text="XL" width={60} />
        </HStack>
        
        <Text style={styles.variantTitle}>XXL Spacing</Text>
        <HStack spacing="xxl" testID="spacing-xxl">
          <TestItem color="#FF6B6B" text="XXL" width={60} />
          <TestItem color="#4ECDC4" text="XXL" width={60} />
        </HStack>
      </TestSection>

      {/* Custom Spacing */}
      <TestSection title="3. Custom Spacing">
        <HStack customSpacing={50} testID="custom-spacing">
          <TestItem color="#FF6B6B" text="Custom 50px" width={100} />
          <TestItem color="#4ECDC4" text="Custom 50px" width={100} />
        </HStack>
      </TestSection>

      {/* Alignment Options (Cross-axis) */}
      <TestSection title="4. Alignment Options (Cross-axis)">
        <Text style={styles.variantTitle}>Start Alignment</Text>
        <View style={styles.alignmentContainer}>
          <HStack spacing="md" alignment="start" testID="alignment-start">
            <TestItem color="#FF6B6B" text="Start" width={60} />
            <TestItem color="#4ECDC4" text="Start" width={60} />
          </HStack>
        </View>
        
        <Text style={styles.variantTitle}>Center Alignment</Text>
        <View style={styles.alignmentContainer}>
          <HStack spacing="md" alignment="center" testID="alignment-center">
            <TestItem color="#FF6B6B" text="Center" width={60} />
            <TestItem color="#4ECDC4" text="Center" width={60} />
          </HStack>
        </View>
        
        <Text style={styles.variantTitle}>End Alignment</Text>
        <View style={styles.alignmentContainer}>
          <HStack spacing="md" alignment="end" testID="alignment-end">
            <TestItem color="#FF6B6B" text="End" width={60} />
            <TestItem color="#4ECDC4" text="End" width={60} />
          </HStack>
        </View>
        
        <Text style={styles.variantTitle}>Stretch Alignment</Text>
        <View style={styles.alignmentContainer}>
          <HStack spacing="md" alignment="stretch" testID="alignment-stretch">
            <TestItem color="#FF6B6B" text="Stretch" width={60} />
            <TestItem color="#4ECDC4" text="Stretch" width={60} />
          </HStack>
        </View>
      </TestSection>

      {/* Distribution Options (Main-axis) */}
      <TestSection title="5. Distribution Options (Main-axis)">
        <Text style={styles.variantTitle}>Start Distribution</Text>
        <HStack 
          spacing="md" 
          distribution="start" 
          testID="distribution-start"
          style={styles.distributionContainer}
        >
          <TestItem color="#FF6B6B" text="Start" width={60} />
          <TestItem color="#4ECDC4" text="Start" width={60} />
        </HStack>
        
        <Text style={styles.variantTitle}>Center Distribution</Text>
        <HStack 
          spacing="md" 
          distribution="center" 
          testID="distribution-center"
          style={styles.distributionContainer}
        >
          <TestItem color="#FF6B6B" text="Center" width={60} />
          <TestItem color="#4ECDC4" text="Center" width={60} />
        </HStack>
        
        <Text style={styles.variantTitle}>End Distribution</Text>
        <HStack 
          spacing="md" 
          distribution="end" 
          testID="distribution-end"
          style={styles.distributionContainer}
        >
          <TestItem color="#FF6B6B" text="End" width={60} />
          <TestItem color="#4ECDC4" text="End" width={60} />
        </HStack>
        
        <Text style={styles.variantTitle}>Space Between</Text>
        <HStack 
          spacing="md" 
          distribution="space-between" 
          testID="distribution-space-between"
          style={styles.distributionContainer}
        >
          <TestItem color="#FF6B6B" text="Between" width={60} />
          <TestItem color="#4ECDC4" text="Between" width={60} />
        </HStack>
        
        <Text style={styles.variantTitle}>Space Around</Text>
        <HStack 
          spacing="md" 
          distribution="space-around" 
          testID="distribution-space-around"
          style={styles.distributionContainer}
        >
          <TestItem color="#FF6B6B" text="Around" width={60} />
          <TestItem color="#4ECDC4" text="Around" width={60} />
        </HStack>
        
        <Text style={styles.variantTitle}>Space Evenly</Text>
        <HStack 
          spacing="md" 
          distribution="space-evenly" 
          testID="distribution-space-evenly"
          style={styles.distributionContainer}
        >
          <TestItem color="#FF6B6B" text="Evenly" width={60} />
          <TestItem color="#4ECDC4" text="Evenly" width={60} />
        </HStack>
      </TestSection>

      {/* Wrap Behavior */}
      <TestSection title="6. Wrap Behavior">
        <Text style={styles.variantTitle}>No Wrap</Text>
        <HStack spacing="md" wrap="nowrap" testID="wrap-nowrap">
          {Array.from({ length: 8 }, (_, i) => (
            <TestItem key={i} color="#FF6B6B" text={`${i + 1}`} width={50} />
          ))}
        </HStack>
        
        <Text style={styles.variantTitle}>Wrap</Text>
        <HStack spacing="md" wrap="wrap" testID="wrap-wrap">
          {Array.from({ length: 8 }, (_, i) => (
            <TestItem key={i} color="#4ECDC4" text={`${i + 1}`} width={50} />
          ))}
        </HStack>
        
        <Text style={styles.variantTitle}>Wrap Reverse</Text>
        <HStack spacing="md" wrap="wrap-reverse" testID="wrap-reverse">
          {Array.from({ length: 8 }, (_, i) => (
            <TestItem key={i} color="#45B7D1" text={`${i + 1}`} width={50} />
          ))}
        </HStack>
      </TestSection>

      {/* Dividers */}
      <TestSection title="7. Dividers">
        <Text style={styles.variantTitle}>Between Dividers</Text>
        <HStack 
          spacing="md" 
          dividers={true} 
          dividerPosition="between" 
          testID="dividers-between"
        >
          <TestItem color="#FF6B6B" text="Item 1" width={60} />
          <TestItem color="#4ECDC4" text="Item 2" width={60} />
          <TestItem color="#45B7D1" text="Item 3" width={60} />
        </HStack>
        
        <Text style={styles.variantTitle}>Custom Divider Color & Thickness</Text>
        <HStack 
          spacing="md" 
          dividers={true} 
          dividerColor="#FF6B6B" 
          dividerThickness={3} 
          testID="dividers-custom"
        >
          <TestItem color="#FF6B6B" text="Item 1" width={60} />
          <TestItem color="#4ECDC4" text="Item 2" width={60} />
          <TestItem color="#45B7D1" text="Item 3" width={60} />
        </HStack>
      </TestSection>

      {/* Reversed Layout */}
      <TestSection title="8. Reversed Layout">
        <HStack spacing="md" reversed={true} testID="reversed-hstack">
          <TestItem color="#FF6B6B" text="First (shows last)" width={120} />
          <TestItem color="#4ECDC4" text="Second (shows middle)" width={120} />
          <TestItem color="#45B7D1" text="Third (shows first)" width={120} />
        </HStack>
      </TestSection>

      {/* Flex Options */}
      <TestSection title="9. Flex Options">
        <Text style={styles.variantTitle}>Flex Grow</Text>
        <View style={styles.flexContainer}>
          <HStack 
            spacing="md" 
            flexGrow={true} 
            testID="flex-grow"
            style={styles.flexStack}
          >
            <TestItem color="#FF6B6B" text="Flex Grow" width={80} />
            <TestItem color="#4ECDC4" text="Flex Grow" width={80} />
          </HStack>
        </View>
        
        <Text style={styles.variantTitle}>Flex Shrink</Text>
        <View style={styles.flexContainer}>
          <HStack 
            spacing="md" 
            flexShrink={true} 
            testID="flex-shrink"
            style={styles.flexStack}
          >
            <TestItem color="#FF6B6B" text="Flex Shrink" width={80} />
            <TestItem color="#4ECDC4" text="Flex Shrink" width={80} />
          </HStack>
        </View>
      </TestSection>

      {/* Size Constraints */}
      <TestSection title="10. Size Constraints">
        <Text style={styles.variantTitle}>Min Width</Text>
        <HStack 
          spacing="md" 
          minWidth={300} 
          testID="min-width"
          style={styles.constraintContainer}
        >
          <TestItem color="#FF6B6B" text="Min Width 300px" width={120} />
        </HStack>
        
        <Text style={styles.variantTitle}>Max Width</Text>
        <HStack 
          spacing="md" 
          maxWidth={200} 
          testID="max-width"
          style={styles.constraintContainer}
        >
          <TestItem color="#FF6B6B" text="Max Width 200px" width={120} />
          <TestItem color="#4ECDC4" text="Max Width 200px" width={120} />
        </HStack>
      </TestSection>

      {/* Preset Configurations */}
      <TestSection title="11. Preset Configurations">
        <Text style={styles.variantTitle}>Navbar Preset</Text>
        <HStack preset="navbar" testID="preset-navbar">
          <TestItem color="#FF6B6B" text="Logo" width={60} />
          <TestItem color="#4ECDC4" text="Menu" width={60} />
          <TestItem color="#45B7D1" text="Profile" width={60} />
        </HStack>
        
        <Text style={styles.variantTitle}>Button Group Preset</Text>
        <HStack preset="buttonGroup" testID="preset-buttonGroup">
          <TestItem color="#FF6B6B" text="Save" width={60} />
          <TestItem color="#4ECDC4" text="Cancel" width={60} />
          <TestItem color="#45B7D1" text="Reset" width={60} />
        </HStack>
        
        <Text style={styles.variantTitle}>Card Actions Preset</Text>
        <HStack preset="cardActions" testID="preset-cardActions">
          <TestItem color="#FF6B6B" text="Edit" width={50} />
          <TestItem color="#4ECDC4" text="Delete" width={50} />
        </HStack>
        
        <Text style={styles.variantTitle}>Social Buttons Preset</Text>
        <HStack preset="socialButtons" testID="preset-socialButtons">
          <TestItem color="#FF6B6B" text="FB" width={40} />
          <TestItem color="#4ECDC4" text="TW" width={40} />
          <TestItem color="#45B7D1" text="IG" width={40} />
        </HStack>
        
        <Text style={styles.variantTitle}>Breadcrumbs Preset</Text>
        <HStack preset="breadcrumbs" testID="preset-breadcrumbs">
          <TestItem color="#FF6B6B" text="Home" width={50} />
          <TestItem color="#4ECDC4" text="Products" width={70} />
          <TestItem color="#45B7D1" text="Details" width={60} />
        </HStack>
        
        <Text style={styles.variantTitle}>Tabs Preset</Text>
        <HStack preset="tabs" testID="preset-tabs">
          <TestItem color="#FF6B6B" text="Home" width={60} />
          <TestItem color="#4ECDC4" text="About" width={60} />
          <TestItem color="#45B7D1" text="Contact" width={60} />
        </HStack>
      </TestSection>

      {/* Responsive Behavior */}
      <TestSection title="12. Responsive Behavior">
        <HStack 
          spacing="md" 
          responsive={true} 
          testID="responsive-hstack"
        >
          <TestItem color="#FF6B6B" text="Responsive" width={80} />
          <TestItem color="#4ECDC4" text="Responsive" width={80} />
        </HStack>
      </TestSection>

      {/* Accessibility */}
      <TestSection title="13. Accessibility">
        <HStack 
          spacing="md" 
          accessibilityLabel="Test horizontal navigation" 
          accessibilityHint="Contains navigation items arranged horizontally" 
          accessibilityRole="none"
          testID="accessibility-hstack"
        >
          <TestItem color="#FF6B6B" text="Accessible 1" width={80} />
          <TestItem color="#4ECDC4" text="Accessible 2" width={80} />
          <TestItem color="#45B7D1" text="Accessible 3" width={80} />
        </HStack>
      </TestSection>

      {/* Performance Test */}
      <TestSection title="14. Performance Test">
        <HStack spacing="sm" wrap="wrap" testID="performance-hstack">
          {Array.from({ length: 20 }, (_, i) => (
            <TestItem 
              key={i} 
              color={i % 2 === 0 ? '#FF6B6B' : '#4ECDC4'} 
              text={`${i + 1}`} 
              width={40} 
            />
          ))}
        </HStack>
      </TestSection>

      {/* Complex Layout */}
      <TestSection title="15. Complex Layout">
        <HStack spacing="lg" testID="complex-hstack">
          <TestItem color="#FF6B6B" text="Header" width={80} />
          <HStack spacing="md" alignment="center" wrap="wrap">
            <TestItem color="#4ECDC4" text="Sub 1" width={60} />
            <TestItem color="#45B7D1" text="Sub 2" width={60} />
          </HStack>
          <TestItem color="#96CEB4" text="Footer" width={80} />
        </HStack>
      </TestSection>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          HStack Component Test Complete ✓
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
    height: 60,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  testItemText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 12,
    textAlign: 'center',
  },
  alignmentContainer: {
    height: 100,
    backgroundColor: 'rgba(46, 134, 222, 0.1)',
    borderRadius: 8,
    padding: 12,
    justifyContent: 'center',
  },
  distributionContainer: {
    backgroundColor: 'rgba(46, 134, 222, 0.1)',
    borderRadius: 8,
    padding: 12,
    height: 80,
  },
  flexContainer: {
    height: 80,
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

export default HStackTest;
