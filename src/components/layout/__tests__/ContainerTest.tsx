/**
 * ContainerTest.tsx
 * 
 * Test component for Container primitive
 * Validates all container variants, sizes, backgrounds, and responsive behavior
 */

import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { Container, ContainerSize, ContainerBackground, ContainerAlignment, ContainerPadding, containerPresets } from '../Container';

// Test data for container variants
const containerSizes: ContainerSize[] = ['sm', 'md', 'lg', 'xl', 'full'];
const containerBackgrounds: ContainerBackground[] = ['none', 'subtle', 'glass', 'card', 'elevated'];
const containerAlignments: ContainerAlignment[] = ['left', 'center', 'right'];
const containerPaddings: ContainerPadding[] = ['none', 'sm', 'md', 'lg', 'xl'];

// Sample content for testing
const SampleContent: React.FC<{ title: string }> = ({ title }) => (
  <View style={styles.sampleContent}>
    <Text style={styles.sampleTitle}>{title}</Text>
    <Text style={styles.sampleText}>
      This is sample content to demonstrate the container layout and behavior.
      The container should properly constrain and style this content according to its configuration.
    </Text>
  </View>
);

/**
 * Container Test Component
 * Comprehensive test suite for Container primitive
 */
export const ContainerTest: React.FC = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Container Primitive Test</Text>
        <Text style={styles.headerSubtitle}>Layout System - Module 82</Text>
      </View>

      {/* Size Variants */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Size Variants</Text>
        {containerSizes.map((size) => (
          <Container
            key={size}
            size={size}
            background="glass"
            padding="md"
            style={styles.testContainer}
          >
            <SampleContent title={`Container Size: ${size}`} />
          </Container>
        ))}
      </View>

      {/* Background Variants */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Background Variants</Text>
        {containerBackgrounds.map((background) => (
          <Container
            key={background}
            size="md"
            background={background}
            padding="md"
            style={styles.testContainer}
          >
            <SampleContent title={`Background: ${background}`} />
          </Container>
        ))}
      </View>

      {/* Alignment Variants */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Alignment Variants</Text>
        {containerAlignments.map((alignment) => (
          <Container
            key={alignment}
            size="sm"
            background="card"
            alignment={alignment}
            padding="md"
            style={styles.testContainer}
          >
            <SampleContent title={`Alignment: ${alignment}`} />
          </Container>
        ))}
      </View>

      {/* Padding Variants */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Padding Variants</Text>
        {containerPaddings.map((padding) => (
          <Container
            key={padding}
            size="md"
            background="subtle"
            padding={padding}
            style={styles.testContainer}
          >
            <SampleContent title={`Padding: ${padding}`} />
          </Container>
        ))}
      </View>

      {/* Glass Morphism Effect */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Glass Morphism Effect</Text>
        <Container
          size="md"
          background="glass"
          enableGlassMorphism={true}
          borderRadius="xl"
          padding="lg"
          style={styles.testContainer}
        >
          <SampleContent title="Glass Morphism Enabled" />
        </Container>
      </View>

      {/* Shadow Effect */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Shadow Effect</Text>
        <Container
          size="md"
          background="elevated"
          enableShadow={true}
          shadowVariant="lg"
          borderRadius="lg"
          padding="lg"
          style={styles.testContainer}
        >
          <SampleContent title="Shadow Effect Enabled" />
        </Container>
      </View>

      {/* Custom Padding */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Padding</Text>
        <Container
          size="md"
          background="card"
          customPadding={{ top: 32, right: 16, bottom: 32, left: 16 }}
          style={styles.testContainer}
        >
          <SampleContent title="Custom Padding Applied" />
        </Container>
      </View>

      {/* Preset Configurations */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preset Configurations</Text>
        
        {/* Page Preset */}
        <Container
          {...containerPresets.page}
          style={styles.testContainer}
        >
          <SampleContent title="Page Preset" />
        </Container>

        {/* Card Preset */}
        <Container
          {...containerPresets.card}
          style={styles.testContainer}
        >
          <SampleContent title="Card Preset" />
        </Container>

        {/* Modal Preset */}
        <Container
          {...containerPresets.modal}
          style={styles.testContainer}
        >
          <SampleContent title="Modal Preset" />
        </Container>
      </View>

      {/* Responsive Behavior */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Responsive Behavior</Text>
        <Container
          size="lg"
          background="glass"
          padding="md"
          responsive={true}
          style={styles.testContainer}
        >
          <SampleContent title="Responsive Container" />
        </Container>

        <Container
          size="lg"
          background="card"
          padding="md"
          responsive={false}
          style={styles.testContainer}
        >
          <SampleContent title="Fixed Container" />
        </Container>
      </View>

      {/* Border Radius Variants */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Border Radius Variants</Text>
        {(['sm', 'md', 'lg', 'xl', 'xxl'] as const).map((radius) => (
          <Container
            key={radius}
            size="md"
            background="elevated"
            borderRadius={radius}
            padding="md"
            style={styles.testContainer}
          >
            <SampleContent title={`Border Radius: ${radius}`} />
          </Container>
        ))}
      </View>

      {/* Accessibility Test */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Accessibility Features</Text>
        <Container
          size="md"
          background="card"
          padding="md"
          accessibilityLabel="Test container with custom accessibility"
          accessibilityHint="This container demonstrates accessibility features"
          accessibilityRole="text"
          testID="accessibility-test-container"
          style={styles.testContainer}
        >
          <SampleContent title="Accessibility Test Container" />
        </Container>
      </View>

      {/* Performance Test */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Performance Test</Text>
        <Text style={styles.sectionDescription}>
          Multiple containers to test rendering performance
        </Text>
        {Array.from({ length: 10 }, (_, index) => (
          <Container
            key={index}
            size="md"
            background="glass"
            padding="sm"
            style={styles.performanceContainer}
          >
            <Text style={styles.performanceText}>Container {index + 1}</Text>
          </Container>
        ))}
      </View>

      {/* Bottom spacing */}
      <View style={styles.bottom} />
    </ScrollView>
  );
};

// Styles for the test component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#08080F',
    padding: 24,
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#54A0FF',
    textAlign: 'center',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#B8B8C0',
    marginBottom: 12,
  },
  testContainer: {
    marginBottom: 16,
  },
  performanceContainer: {
    marginBottom: 8,
  },
  sampleContent: {
    padding: 4,
  },
  sampleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  sampleText: {
    fontSize: 14,
    color: '#B8B8C0',
    lineHeight: 20,
  },
  performanceText: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  bottom: {
    height: 32,
  },
});

export default ContainerTest;
