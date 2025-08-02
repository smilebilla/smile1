/**
 * Corp Astro UI Library - ButtonGroup Component Test
 * 
 * Comprehensive test for ButtonGroup component with various configurations.
 * 
 * @module ButtonGroupTest
 * @version 1.0.0
 * @since 2024
 */

import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { ButtonGroup, ButtonGroupUtils } from '../ButtonGroup';
import { ButtonPrimary } from '../ButtonPrimary';
import { ButtonSecondary } from '../ButtonSecondary';
import { ButtonGhost } from '../ButtonGhost';
import { ButtonLink } from '../ButtonLink';

/**
 * ButtonGroup Test Component
 */
export const ButtonGroupTest: React.FC = () => {
  const handlePress = (label: string) => {
    console.log(`${label} pressed`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Button Group Tests</Text>
        
        {/* Horizontal Button Group - Default */}
        <View style={styles.testCase}>
          <Text style={styles.label}>Horizontal Group - Default</Text>
          <ButtonGroup direction="horizontal">
            <ButtonPrimary onPress={() => handlePress('Primary')}>
              Primary
            </ButtonPrimary>
            <ButtonSecondary onPress={() => handlePress('Secondary')}>
              Secondary
            </ButtonSecondary>
            <ButtonGhost onPress={() => handlePress('Ghost')}>
              Ghost
            </ButtonGhost>
          </ButtonGroup>
        </View>

        {/* Vertical Button Group */}
        <View style={styles.testCase}>
          <Text style={styles.label}>Vertical Group</Text>
          <ButtonGroup direction="vertical">
            <ButtonPrimary onPress={() => handlePress('Primary')}>
              Primary Button
            </ButtonPrimary>
            <ButtonSecondary onPress={() => handlePress('Secondary')}>
              Secondary Button
            </ButtonSecondary>
            <ButtonGhost onPress={() => handlePress('Ghost')}>
              Ghost Button
            </ButtonGhost>
          </ButtonGroup>
        </View>

        {/* Connected Button Group */}
        <View style={styles.testCase}>
          <Text style={styles.label}>Connected Group</Text>
          <ButtonGroup 
            variant="connected" 
            adjustBorderRadius={true}
            direction="horizontal"
          >
            <ButtonSecondary onPress={() => handlePress('Left')}>
              Left
            </ButtonSecondary>
            <ButtonSecondary onPress={() => handlePress('Middle')}>
              Middle
            </ButtonSecondary>
            <ButtonSecondary onPress={() => handlePress('Right')}>
              Right
            </ButtonSecondary>
          </ButtonGroup>
        </View>

        {/* Segmented Button Group */}
        <View style={styles.testCase}>
          <Text style={styles.label}>Segmented Group</Text>
          <ButtonGroup 
            variant="segmented"
            equalWidth={true}
            alignment="stretch"
          >
            <ButtonGhost onPress={() => handlePress('Option 1')}>
              Option 1
            </ButtonGhost>
            <ButtonGhost onPress={() => handlePress('Option 2')}>
              Option 2
            </ButtonGhost>
            <ButtonGhost onPress={() => handlePress('Option 3')}>
              Option 3
            </ButtonGhost>
          </ButtonGroup>
        </View>

        {/* Center Aligned Group */}
        <View style={styles.testCase}>
          <Text style={styles.label}>Center Aligned</Text>
          <ButtonGroup 
            direction="horizontal"
            alignment="center"
            spacing="loose"
          >
            <ButtonPrimary onPress={() => handlePress('Save')}>
              Save
            </ButtonPrimary>
            <ButtonSecondary onPress={() => handlePress('Cancel')}>
              Cancel
            </ButtonSecondary>
          </ButtonGroup>
        </View>

        {/* End Aligned Group */}
        <View style={styles.testCase}>
          <Text style={styles.label}>End Aligned</Text>
          <ButtonGroup 
            direction="horizontal"
            alignment="end"
            spacing="tight"
          >
            <ButtonGhost onPress={() => handlePress('Skip')}>
              Skip
            </ButtonGhost>
            <ButtonPrimary onPress={() => handlePress('Next')}>
              Next
            </ButtonPrimary>
          </ButtonGroup>
        </View>

        {/* Equal Width Group */}
        <View style={styles.testCase}>
          <Text style={styles.label}>Equal Width</Text>
          <ButtonGroup 
            direction="horizontal"
            equalWidth={true}
            spacing="normal"
          >
            <ButtonSecondary onPress={() => handlePress('Short')}>
              Short
            </ButtonSecondary>
            <ButtonSecondary onPress={() => handlePress('Medium Length')}>
              Medium Length
            </ButtonSecondary>
            <ButtonSecondary onPress={() => handlePress('Very Long Button Text')}>
              Very Long Button Text
            </ButtonSecondary>
          </ButtonGroup>
        </View>

        {/* Mixed Button Types */}
        <View style={styles.testCase}>
          <Text style={styles.label}>Mixed Button Types</Text>
          <ButtonGroup 
            direction="horizontal"
            spacing="normal"
            alignment="center"
          >
            <ButtonPrimary onPress={() => handlePress('Primary')}>
              Primary
            </ButtonPrimary>
            <ButtonSecondary onPress={() => handlePress('Secondary')}>
              Secondary
            </ButtonSecondary>
            <ButtonGhost onPress={() => handlePress('Ghost')}>
              Ghost
            </ButtonGhost>
            <ButtonLink onPress={() => handlePress('Link')}>
              Link
            </ButtonLink>
          </ButtonGroup>
        </View>

        {/* Responsive Group */}
        <View style={styles.testCase}>
          <Text style={styles.label}>Responsive Group</Text>
          <ButtonGroup 
            direction="horizontal"
            responsive={true}
            spacing="normal"
          >
            <ButtonPrimary onPress={() => handlePress('Button 1')}>
              Button 1
            </ButtonPrimary>
            <ButtonSecondary onPress={() => handlePress('Button 2')}>
              Button 2
            </ButtonSecondary>
            <ButtonGhost onPress={() => handlePress('Button 3')}>
              Button 3
            </ButtonGhost>
            <ButtonSecondary onPress={() => handlePress('Button 4')}>
              Button 4
            </ButtonSecondary>
            <ButtonGhost onPress={() => handlePress('Button 5')}>
              Button 5
            </ButtonGhost>
          </ButtonGroup>
        </View>

        {/* Utility Functions Test */}
        <View style={styles.testCase}>
          <Text style={styles.label}>Connected Config (Utility)</Text>
          <ButtonGroup {...ButtonGroupUtils.createConnectedConfig('horizontal')}>
            <ButtonSecondary onPress={() => handlePress('First')}>
              First
            </ButtonSecondary>
            <ButtonSecondary onPress={() => handlePress('Second')}>
              Second
            </ButtonSecondary>
            <ButtonSecondary onPress={() => handlePress('Third')}>
              Third
            </ButtonSecondary>
          </ButtonGroup>
        </View>

        <View style={styles.testCase}>
          <Text style={styles.label}>Segmented Config (Utility)</Text>
          <ButtonGroup {...ButtonGroupUtils.createSegmentedConfig('horizontal')}>
            <ButtonGhost onPress={() => handlePress('Tab 1')}>
              Tab 1
            </ButtonGhost>
            <ButtonGhost onPress={() => handlePress('Tab 2')}>
              Tab 2
            </ButtonGhost>
            <ButtonGhost onPress={() => handlePress('Tab 3')}>
              Tab 3
            </ButtonGhost>
          </ButtonGroup>
        </View>
      </View>
    </ScrollView>
  );
};

/**
 * Component styles
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#08080F', // Deep space background
  },
  section: {
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 32,
    textAlign: 'center',
  },
  testCase: {
    marginBottom: 32,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#B8B8C0',
    marginBottom: 12,
  },
});

/**
 * Default export
 */
export default ButtonGroupTest;
