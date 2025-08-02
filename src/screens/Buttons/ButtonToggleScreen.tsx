/**
 * ButtonToggle Demo Screen
 * 
 * This screen demonstrates all functionalities of the ButtonToggle component,
 * including different sizes, variants, states (active/inactive, disabled, loading), 
 * configurations (haptics, glow, glass morphism, shadow effects, custom colors), 
 * event handlers, custom styles, and accessibility props. It is designed to work on both iOS and Android.
 * 
 * @module ButtonToggle
 * @version 1.0.0
 * @since 2024
 */

import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, Alert } from 'react-native';
import { ButtonToggle, ButtonToggleProps } from '../../components/buttons/ButtonToggle'; // Adjust path if necessary
import NextButton from '../../components/NextButton';
import ScreenHeading from '../../components/ScreenHeading';

const ButtonToggleScreen: React.FC = () => {
  const [activeExample, setActiveExample] = useState(false);
  const [loadingExample, setLoadingExample] = useState(false);

  const handleToggle = (newActive: boolean) => {
    setActiveExample(newActive);
    Alert.alert('Toggled', `New state: ${newActive}`);
  };

  const handleLongPress = () => {
    Alert.alert('Long Press', 'Long press event triggered.');
  };

  const handlePressIn = () => {
    console.log('Press In');
  };

  const handlePressOut = () => {
    console.log('Press Out');
  };

  const handleLoadingToggle = (newActive: boolean) => {
    setLoadingExample(true);
    setTimeout(() => {
      setLoadingExample(false);
      setActiveExample(newActive);
    }, 2000); // Simulate loading
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ScreenHeading title="ButtonToggle Demo" />
      <Text style={styles.sectionTitle}>Sizes</Text>
      
      <ButtonToggle active={activeExample} onPress={handleToggle} size="small" containerStyle={{ marginBottom: 10 }}>
        Small Toggle
      </ButtonToggle>
      
      <ButtonToggle active={activeExample} onPress={handleToggle} size="medium" containerStyle={{ marginBottom: 10 }}>
        Medium Toggle
      </ButtonToggle>
      
      <ButtonToggle active={activeExample} onPress={handleToggle} size="large" containerStyle={{ marginBottom: 10 }}>
        Large Toggle
      </ButtonToggle>

      <Text style={styles.sectionTitle}>Variants</Text>
      
      <ButtonToggle active={activeExample} onPress={handleToggle} variant="default" containerStyle={styles.marginBottom}>
        Default Variant
      </ButtonToggle>
      
      <ButtonToggle active={activeExample} onPress={handleToggle} variant="compact" containerStyle={styles.marginBottom}>
        Compact Variant
      </ButtonToggle>
      
      <ButtonToggle active={activeExample} onPress={handleToggle} variant="pill" containerStyle={styles.marginBottom}>
        Pill Variant
      </ButtonToggle>

      <Text style={styles.sectionTitle}>States</Text>
      
      <ButtonToggle active={false} onPress={handleToggle} containerStyle={styles.marginBottom}>
        Inactive
      </ButtonToggle>
      
      <ButtonToggle active={true} onPress={handleToggle} containerStyle={styles.marginBottom}>
        Active
      </ButtonToggle>
      
      <ButtonToggle active={activeExample} onPress={handleToggle} disabled containerStyle={styles.marginBottom}>
        Disabled
      </ButtonToggle>
      
      <ButtonToggle active={activeExample} onPress={handleLoadingToggle} loading={loadingExample} containerStyle={styles.marginBottom}>
        Loading Toggle
      </ButtonToggle>

      <Text style={styles.sectionTitle}>Configurations</Text>
      
      <ButtonToggle active={activeExample} onPress={handleToggle} enableHaptics={false} containerStyle={styles.marginBottom}>
        No Haptics
      </ButtonToggle>
      
      <ButtonToggle active={activeExample} onPress={handleToggle} enableGlow={false} containerStyle={styles.marginBottom}>
        No Glow
      </ButtonToggle>
      
      <ButtonToggle active={activeExample} onPress={handleToggle} enableGlassMorphism={false} containerStyle={styles.marginBottom}>
        No Glass Morphism
      </ButtonToggle>
      
      <ButtonToggle active={activeExample} onPress={handleToggle} enableShadowEffects={false} containerStyle={styles.marginBottom}>
        No Shadow Effects
      </ButtonToggle>
      
      <ButtonToggle active={activeExample} onPress={handleToggle} activeColors={['#FF0000', '#00FF00']} inactiveColor="#0000FF" containerStyle={styles.marginBottom}>
        Custom Colors
      </ButtonToggle>

      <Text style={styles.sectionTitle}>Event Handlers</Text>
      
      <ButtonToggle 
        active={activeExample} 
        onPress={handleToggle}
        onLongPress={handleLongPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        containerStyle={styles.marginBottom}
      >
        All Handlers Toggle
      </ButtonToggle>

      <Text style={styles.sectionTitle}>Custom Styles</Text>
      
      <ButtonToggle 
        active={activeExample} 
        onPress={handleToggle}
        buttonStyle={{ borderWidth: 2 }}
        textStyle={{ fontStyle: 'italic' }}
        containerStyle={{ ...styles.marginBottom, backgroundColor: 'lightgray' }}
      >
        Custom Styles Toggle
      </ButtonToggle>

      <Text style={styles.sectionTitle}>Accessibility Props</Text>
      
      <ButtonToggle
        active={activeExample}
        onPress={handleToggle}
        accessibilityLabel="Accessible Toggle Button"
        accessibilityHint="Toggle to change state"
        containerStyle={styles.marginBottom}
      >
        Accessible Toggle
      </ButtonToggle>
      <NextButton nextScreen="HomeScreen" label="Next" />
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
});

export default ButtonToggleScreen;