/**
 * ButtonIcon Demo Screen
 * 
 * This screen demonstrates all functionalities of the ButtonIcon component,
 * including different sizes, variants, states, disabled/loading, configurations 
 * (haptics, glass morphism, intensity), custom colors, event handlers, custom styles, 
 * and accessibility props. It is designed to work on both iOS and Android.
 * 
 * @module ButtonIcon
 * @version 1.0.0
 * @since 2024
 */

import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, Alert } from 'react-native';
import { ButtonIcon, ButtonIconProps } from '../../components/buttons/ButtonIcon'; // Adjust path if necessary
import NextButton from '../../components/NextButton';
import ScreenHeading from '../../components/ScreenHeading';

const ButtonIconScreen: React.FC = () => {
  const [loadingExample, setLoadingExample] = useState(false);

  const handlePress = (variant: string) => {
    Alert.alert('Button Pressed', `Icon button (${variant}) pressed.`);
  };

  const handleLoadingPress = () => {
    setLoadingExample(true);
    setTimeout(() => setLoadingExample(false), 2000); // Simulate loading
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ScreenHeading title="ButtonIcon Demo" />
      <Text style={styles.sectionTitle}>Sizes</Text>
      
      <ButtonIcon onPress={() => handlePress('small')} size="small" style={styles.marginBottom}>
        <Text style={styles.iconText}>+</Text>
      </ButtonIcon>
      
      <ButtonIcon onPress={() => handlePress('medium')} size="medium" style={styles.marginBottom}>
        <Text style={styles.iconMediumText}>+</Text>
      </ButtonIcon>
      
      <ButtonIcon onPress={() => handlePress('large')} size="large" style={styles.marginBottom}>
        <Text style={styles.iconLargeText}>+</Text>
      </ButtonIcon>

      <Text style={styles.sectionTitle}>Variants</Text>
      
      <ButtonIcon onPress={() => handlePress('default')} variant="default" style={styles.marginBottom}>
        <Text style={styles.iconMediumText}>+</Text>
      </ButtonIcon>
      
      <ButtonIcon onPress={() => handlePress('primary')} variant="primary" style={styles.marginBottom}>
        <Text style={styles.iconMediumText}>+</Text>
      </ButtonIcon>
      
      <ButtonIcon onPress={() => handlePress('secondary')} variant="secondary" style={styles.marginBottom}>
        <Text style={styles.iconMediumText}>+</Text>
      </ButtonIcon>
      
      <ButtonIcon onPress={() => handlePress('ghost')} variant="ghost" style={styles.marginBottom}>
        <Text style={styles.iconMediumText}>+</Text>
      </ButtonIcon>

      <Text style={styles.sectionTitle}>States</Text>
      
      <ButtonIcon onPress={() => handlePress('default state')} state="default" style={styles.marginBottom}>
        <Text style={styles.iconMediumText}>+</Text>
      </ButtonIcon>
      
      <ButtonIcon onPress={() => handlePress('loading state')} state="loading" style={styles.marginBottom}>
        <Text style={styles.iconMediumText}>+</Text>
      </ButtonIcon>
      
      <ButtonIcon onPress={() => handlePress('success state')} state="success" style={styles.marginBottom}>
        <Text style={styles.iconMediumText}>+</Text>
      </ButtonIcon>
      
      <ButtonIcon onPress={() => handlePress('error state')} state="error" style={styles.marginBottom}>
        <Text style={styles.iconMediumText}>+</Text>
      </ButtonIcon>

      <Text style={styles.sectionTitle}>Disabled & Loading</Text>
      
      <ButtonIcon onPress={() => handlePress('disabled')} disabled style={styles.marginBottom}>
        <Text style={styles.iconMediumText}>+</Text>
      </ButtonIcon>
      
      <ButtonIcon onPress={handleLoadingPress} loading={loadingExample} style={styles.marginBottom}>
        <Text style={styles.iconMediumText}>+</Text>
      </ButtonIcon>

      <Text style={styles.sectionTitle}>Configurations</Text>
      
      <ButtonIcon onPress={() => handlePress('no haptics')} enableHaptics={false} style={styles.marginBottom}>
        <Text style={styles.iconMediumText}>+</Text>
      </ButtonIcon>
      
      <ButtonIcon onPress={() => handlePress('no glass')} enableGlassMorphism={false} style={styles.marginBottom}>
        <Text style={styles.iconMediumText}>+</Text>
      </ButtonIcon>
      
      <ButtonIcon onPress={() => handlePress('intensity light')} glassMorphismIntensity="light" style={styles.marginBottom}>
        <Text style={styles.iconMediumText}>+</Text>
      </ButtonIcon>

      <Text style={styles.sectionTitle}>Custom Colors</Text>
      
      <ButtonIcon onPress={() => handlePress('custom bg')} backgroundColor="red" style={styles.marginBottom}>
        <Text style={styles.iconMediumText}>+</Text>
      </ButtonIcon>
      
      <ButtonIcon onPress={() => handlePress('custom border')} borderColor="green" style={styles.marginBottom}>
        <Text style={styles.iconMediumText}>+</Text>
      </ButtonIcon>
      
      <ButtonIcon onPress={() => handlePress('custom icon')} iconColor="blue" style={styles.marginBottom}>
        <Text style={[styles.iconMediumText, { color: 'blue' }]}>+</Text>
      </ButtonIcon>

      <Text style={styles.sectionTitle}>Custom Style</Text>
      
      <ButtonIcon onPress={() => handlePress('custom style')} style={{ ...styles.marginBottom, backgroundColor: 'purple', borderRadius: 10 }}>
        <Text style={styles.iconMediumText}>+</Text>
      </ButtonIcon>

      <Text style={styles.sectionTitle}>Accessibility Props</Text>
      
      <ButtonIcon
        onPress={() => handlePress('accessible')}
        accessibilityLabel="Accessible Icon Button"
        accessibilityHint="Press to perform action"
        style={styles.marginBottom}
      >
        <Text style={styles.iconMediumText}>+</Text>
      </ButtonIcon>
      <NextButton nextScreen="ButtonLinkScreen" label="Next" />
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
  marginBottom: {
    marginBottom: 10,
  },
  iconText: {
    color: 'white',
    fontSize: 16,
  },
  iconMediumText: {
    color: 'white',
    fontSize: 20,
  },
  iconLargeText: {
    color: 'white',
    fontSize: 24,
  },
});

export default ButtonIconScreen;