/**
 * ButtonLink Demo Screen
 * 
 * This screen demonstrates all functionalities of the ButtonLink component,
 * including different sizes, variants, states (disabled, loading), configurations 
 * (underline, glow, inline), event handlers, custom styles, and accessibility props.
 * It is designed to work on both iOS and Android.
 * 
 * @module ButtonLink
 * @version 1.0.0
 * @since 2024
 */

import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, Alert } from 'react-native';
import { ButtonLink, ButtonLinkProps } from '../../components/buttons/ButtonLink'; // Adjust path if necessary
import NextButton from '../../components/NextButton';
import ScreenHeading from '../../components/ScreenHeading';

const ButtonLinkScreen: React.FC = () => {
  const [loadingExample, setLoadingExample] = useState(false);

  const handlePress = (description: string) => {
    Alert.alert('Button Pressed', `Link button pressed: ${description}`);
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

  const handleLoadingPress = () => {
    setLoadingExample(true);
    setTimeout(() => setLoadingExample(false), 2000); // Simulate loading
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ScreenHeading title="ButtonLink Demo" />
      <Text style={styles.sectionTitle}>Sizes</Text>
      
      <ButtonLink onPress={() => handlePress('small')} size="small" style={styles.marginBottom}>
        Small Link
      </ButtonLink>
      
      <ButtonLink onPress={() => handlePress('medium')} size="medium" style={styles.marginBottom}>
        Medium Link
      </ButtonLink>
      
      <ButtonLink onPress={() => handlePress('large')} size="large" style={styles.marginBottom}>
        Large Link
      </ButtonLink>

      <Text style={styles.sectionTitle}>Variants</Text>
      
      <ButtonLink onPress={() => handlePress('default')} variant="default" style={styles.marginBottom}>
        Default Variant
      </ButtonLink>
      
      <ButtonLink onPress={() => handlePress('muted')} variant="muted" style={styles.marginBottom}>
        Muted Variant
      </ButtonLink>
      
      <ButtonLink onPress={() => handlePress('primary')} variant="primary" style={styles.marginBottom}>
        Primary Variant
      </ButtonLink>

      <Text style={styles.sectionTitle}>States</Text>
      
      <ButtonLink onPress={() => handlePress('disabled')} disabled style={styles.marginBottom}>
        Disabled Link
      </ButtonLink>
      
      <ButtonLink onPress={handleLoadingPress} loading={loadingExample} style={styles.marginBottom}>
        Loading Link
      </ButtonLink>

      <Text style={styles.sectionTitle}>Configurations</Text>
      
      <ButtonLink onPress={() => handlePress('underline')} showUnderline style={styles.marginBottom}>
        With Underline
      </ButtonLink>
      
      <ButtonLink onPress={() => handlePress('no glow')} enableGlow={false} style={styles.marginBottom}>
        No Glow
      </ButtonLink>
      
      <ButtonLink onPress={() => handlePress('not inline')} inline={false} style={styles.marginBottom}>
        Not Inline
      </ButtonLink>

      <Text style={styles.sectionTitle}>Event Handlers</Text>
      
      <ButtonLink 
        onPress={() => handlePress('all handlers')} 
        onLongPress={handleLongPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.marginBottom}
      >
        All Handlers Link
      </ButtonLink>

      <Text style={styles.sectionTitle}>Custom Styles</Text>
      
      <ButtonLink 
        onPress={() => handlePress('custom text')} 
        textStyle={{ fontStyle: 'italic', color: 'red' }} 
        style={{ ...styles.marginBottom, backgroundColor: 'lightblue' }}
      >
        Custom Styles Link
      </ButtonLink>

      <Text style={styles.sectionTitle}>Accessibility Props</Text>
      
      <ButtonLink
        onPress={() => handlePress('accessible')}
        accessibilityLabel="Accessible Link Button"
        accessibilityHint="Press to navigate"
        style={styles.marginBottom}
      >
        Accessible Link
      </ButtonLink>
      <NextButton nextScreen="ButtonPrimaryScreen" label="Next" />
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

export default ButtonLinkScreen;