/**
 * Corp Astro UI Library - ButtonLink Component Test
 * 
 * Basic functionality test for ButtonLink component.
 * 
 * @module ButtonLinkTest
 * @version 1.0.0
 * @since 2024
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ButtonLink } from '../ButtonLink';

/**
 * ButtonLink Test Component
 */
export const ButtonLinkTest: React.FC = () => {
  const handlePress = () => {
    console.log('ButtonLink pressed');
  };

  return (
    <View style={styles.container}>
      {/* Default link button */}
      <ButtonLink onPress={handlePress}>
        Default Link
      </ButtonLink>
      
      {/* Primary variant */}
      <ButtonLink 
        variant="primary" 
        onPress={handlePress}
        style={styles.spacing}
      >
        Primary Link
      </ButtonLink>
      
      {/* Muted variant */}
      <ButtonLink 
        variant="muted" 
        onPress={handlePress}
        style={styles.spacing}
      >
        Muted Link
      </ButtonLink>
      
      {/* With underline */}
      <ButtonLink 
        showUnderline={true}
        onPress={handlePress}
        style={styles.spacing}
      >
        Link with Underline
      </ButtonLink>
      
      {/* Different sizes */}
      <ButtonLink 
        size="small" 
        onPress={handlePress}
        style={styles.spacing}
      >
        Small Link
      </ButtonLink>
      
      <ButtonLink 
        size="large" 
        onPress={handlePress}
        style={styles.spacing}
      >
        Large Link
      </ButtonLink>
      
      {/* Disabled state */}
      <ButtonLink 
        disabled={true}
        onPress={handlePress}
        style={styles.spacing}
      >
        Disabled Link
      </ButtonLink>
      
      {/* Loading state */}
      <ButtonLink 
        loading={true}
        onPress={handlePress}
        style={styles.spacing}
      >
        Loading Link
      </ButtonLink>
    </View>
  );
};

/**
 * Component styles
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#08080F', // Deep space background
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  spacing: {
    marginTop: 16,
  },
});

/**
 * Default export
 */
export default ButtonLinkTest;
