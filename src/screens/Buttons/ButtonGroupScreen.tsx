/**
 * ButtonGroup Demo Screen
 * 
 * This screen demonstrates all functionalities of the ButtonGroup component,
 * including different directions, alignments, spacings, variants, responsive behavior,
 * equal width, border radius adjustment, custom styles, accessibility props, and utility functions.
 * It is designed to work on both iOS and Android.
 * 
 * @module ButtonGroup
 * @version 1.0.0
 * @since 2024
 */

import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, Alert, View } from 'react-native';
import { ButtonGroup, ButtonGroupConfig, ButtonGroupProps, ButtonGroupUtils } from '../../components/buttons/ButtonGroup'; // Adjust path if necessary
import NextButton from '../../components/NextButton';
import ScreenHeading from '../../components/ScreenHeading';

const ButtonGroupScreen: React.FC = () => {
  const handleButtonPress = (label: string) => {
    Alert.alert('Button Pressed', `${label} button pressed.`);
  };

  // Utility configs
  const responsiveConfig = ButtonGroupUtils.createResponsiveConfig({ direction: 'horizontal' });
  const connectedConfig = ButtonGroupUtils.createConnectedConfig('horizontal');
  const segmentedConfig = ButtonGroupUtils.createSegmentedConfig('horizontal');

  // Sample button component
  const SampleButton = ({ label, style }: { label: string; style?: any }) => (
    <TouchableOpacity 
      onPress={() => handleButtonPress(label)} 
      style={[styles.sampleButton, style]}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ScreenHeading title="ButtonGroup Demo" />
      <Text style={styles.sectionTitle}>Directions</Text>
      
      <ButtonGroup direction="horizontal" style={styles.groupBorder}>
        <SampleButton label="Button 1" />
        <SampleButton label="Button 2" />
        <SampleButton label="Button 3" />
      </ButtonGroup>
      
      <ButtonGroup direction="vertical" style={{ ...styles.groupBorder, ...styles.marginBottom }}>
        <SampleButton label="Button 1" />
        <SampleButton label="Button 2" />
        <SampleButton label="Button 3" />
      </ButtonGroup>

      <Text style={styles.sectionTitle}>Alignments</Text>
      
      <ButtonGroup alignment="start" style={styles.groupBorder}>
        <SampleButton label="Start 1" />
        <SampleButton label="Start 2" />
      </ButtonGroup>
      
      <ButtonGroup alignment="center" style={{ ...styles.groupBorder, ...styles.marginBottom }}>
        <SampleButton label="Center 1" />
        <SampleButton label="Center 2" />
      </ButtonGroup>
      
      <ButtonGroup alignment="end" style={styles.groupBorder}>
        <SampleButton label="End 1" />
        <SampleButton label="End 2" />
      </ButtonGroup>
      
      <ButtonGroup alignment="stretch" style={{ ...styles.groupBorder, ...styles.marginBottom }}>
        <SampleButton label="Stretch 1" />
        <SampleButton label="Stretch 2" />
      </ButtonGroup>

      <Text style={styles.sectionTitle}>Spacings</Text>
      
      <ButtonGroup spacing="tight" style={styles.groupBorder}>
        <SampleButton label="Tight 1" />
        <SampleButton label="Tight 2" />
      </ButtonGroup>
      
      <ButtonGroup spacing="normal" style={{ ...styles.groupBorder, ...styles.marginBottom }}>
        <SampleButton label="Normal 1" />
        <SampleButton label="Normal 2" />
      </ButtonGroup>
      
      <ButtonGroup spacing="loose" style={styles.groupBorder}>
        <SampleButton label="Loose 1" />
        <SampleButton label="Loose 2" />
      </ButtonGroup>

      <Text style={styles.sectionTitle}>Variants</Text>
      
      <ButtonGroup variant="default" style={styles.groupBorder}>
        <SampleButton label="Default 1" />
        <SampleButton label="Default 2" />
      </ButtonGroup>
      
      <ButtonGroup variant="connected" style={{ ...styles.groupBorder, ...styles.marginBottom }}>
        <SampleButton label="Connected 1" />
        <SampleButton label="Connected 2" />
      </ButtonGroup>
      
      <ButtonGroup variant="segmented" style={styles.groupBorder}>
        <SampleButton label="Segmented 1" />
        <SampleButton label="Segmented 2" />
      </ButtonGroup>

      <Text style={styles.sectionTitle}>Responsive & Equal Width</Text>
      
      <ButtonGroup responsive={true} equalWidth={true} style={styles.groupBorder}>
        <SampleButton label="Responsive Equal 1" />
        <SampleButton label="Responsive Equal 2" />
      </ButtonGroup>
      
      <ButtonGroup responsive={false} equalWidth={false} style={{ ...styles.groupBorder, ...styles.marginBottom }}>
        <SampleButton label="Non-Responsive 1" />
        <SampleButton label="Non-Responsive 2" />
      </ButtonGroup>

      <Text style={styles.sectionTitle}>Adjust Border Radius</Text>
      
      <ButtonGroup variant="connected" adjustBorderRadius={true} style={styles.groupBorder}>
        <SampleButton label="Adjust Radius 1" style={{ borderRadius: 10 }} />
        <SampleButton label="Adjust Radius 2" style={{ borderRadius: 10 }} />
        <SampleButton label="Adjust Radius 3" style={{ borderRadius: 10 }} />
      </ButtonGroup>

      <Text style={styles.sectionTitle}>Custom Style</Text>
      
      <ButtonGroup style={{ ...styles.groupBorder, backgroundColor: 'lightblue' }}>
        <SampleButton label="Custom Style 1" />
        <SampleButton label="Custom Style 2" />
      </ButtonGroup>

      <Text style={styles.sectionTitle}>Accessibility Props</Text>
      
      <ButtonGroup 
        accessibilityLabel="Accessible Button Group"
        accessibilityHint="Group of buttons for demonstration"
        style={styles.groupBorder}
      >
        <SampleButton label="Accessible 1" />
        <SampleButton label="Accessible 2" />
      </ButtonGroup>

      <Text style={styles.sectionTitle}>Utility Functions</Text>
      
      <ButtonGroup {...responsiveConfig} style={styles.groupBorder}>
        <SampleButton label="Responsive Util 1" />
        <SampleButton label="Responsive Util 2" />
      </ButtonGroup>
      
      <ButtonGroup {...connectedConfig} style={{ ...styles.groupBorder, ...styles.marginBottom }}>
        <SampleButton label="Connected Util 1" />
        <SampleButton label="Connected Util 2" />
      </ButtonGroup>
      
      <ButtonGroup {...segmentedConfig} style={styles.groupBorder}>
        <SampleButton label="Segmented Util 1" />
        <SampleButton label="Segmented Util 2" />
      </ButtonGroup>
      <NextButton nextScreen="ButtonIconScreen" label="Next" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  sampleButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    minWidth: 80,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  groupBorder: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
    width: '100%',
  },
  marginBottom: {
    marginBottom: 10,
  },
});

export default ButtonGroupScreen;