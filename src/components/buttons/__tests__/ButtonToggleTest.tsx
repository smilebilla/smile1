/**
 * Corp Astro UI Library - Button Toggle Test Component
 * 
 * Comprehensive test component demonstrating ButtonToggle functionality,
 * variants, states, and interactive behaviors.
 * 
 * @module ButtonToggleTest
 * @version 1.0.0
 * @since 2024
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { ButtonToggle } from '../ButtonToggle';
import { deepSpaceColors } from '../../../foundations/tokens/colors/DeepSpaceColors';
import { ProfessionalGrays } from '../../../foundations/tokens/colors/ProfessionalGrays';

/**
 * ButtonToggle test component
 */
export const ButtonToggleTest: React.FC = () => {
  const [basicToggle, setBasicToggle] = useState(false);
  const [favoritesToggle, setFavoritesToggle] = useState(true);
  const [notificationToggle, setNotificationToggle] = useState(false);
  const [darkModeToggle, setDarkModeToggle] = useState(true);
  const [compactToggles, setCompactToggles] = useState({
    wifi: true,
    bluetooth: false,
    location: true,
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={deepSpaceColors.void} />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>ButtonToggle Component Test</Text>
          <Text style={styles.subtitle}>Interactive toggle button variations</Text>
        </View>

        {/* Basic Toggle */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Toggle</Text>
          <View style={styles.row}>
            <ButtonToggle 
              active={basicToggle}
              onPress={(active) => setBasicToggle(active)}
            >
              Toggle Me
            </ButtonToggle>
          </View>
          <Text style={styles.stateText}>State: {basicToggle ? 'Active' : 'Inactive'}</Text>
        </View>

        {/* Size Variants */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Size Variants</Text>
          <View style={styles.column}>
            <View style={styles.row}>
              <ButtonToggle 
                size="small"
                active={false}
                onPress={() => {}}
              >
                Small Toggle
              </ButtonToggle>
            </View>
            <View style={styles.row}>
              <ButtonToggle 
                size="medium"
                active={true}
                onPress={() => {}}
              >
                Medium Toggle
              </ButtonToggle>
            </View>
            <View style={styles.row}>
              <ButtonToggle 
                size="large"
                active={false}
                onPress={() => {}}
              >
                Large Toggle
              </ButtonToggle>
            </View>
          </View>
        </View>

        {/* Variant Types */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Variant Types</Text>
          <View style={styles.column}>
            <View style={styles.row}>
              <ButtonToggle 
                variant="default"
                active={true}
                onPress={() => {}}
              >
                Default
              </ButtonToggle>
            </View>
            <View style={styles.row}>
              <ButtonToggle 
                variant="compact"
                active={false}
                onPress={() => {}}
              >
                Compact
              </ButtonToggle>
            </View>
            <View style={styles.row}>
              <ButtonToggle 
                variant="pill"
                active={true}
                onPress={() => {}}
              >
                Pill Shape
              </ButtonToggle>
            </View>
          </View>
        </View>

        {/* Interactive Examples */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interactive Examples</Text>
          <View style={styles.column}>
            <View style={styles.interactiveRow}>
              <Text style={styles.label}>Favorites:</Text>
              <ButtonToggle 
                active={favoritesToggle}
                onPress={(active) => setFavoritesToggle(active)}
                size="small"
              >
                {favoritesToggle ? 'Enabled' : 'Disabled'}
              </ButtonToggle>
            </View>
            
            <View style={styles.interactiveRow}>
              <Text style={styles.label}>Notifications:</Text>
              <ButtonToggle 
                active={notificationToggle}
                onPress={(active) => setNotificationToggle(active)}
                size="small"
              >
                {notificationToggle ? 'On' : 'Off'}
              </ButtonToggle>
            </View>
            
            <View style={styles.interactiveRow}>
              <Text style={styles.label}>Dark Mode:</Text>
              <ButtonToggle 
                active={darkModeToggle}
                onPress={(active) => setDarkModeToggle(active)}
                size="small"
              >
                {darkModeToggle ? 'Dark' : 'Light'}
              </ButtonToggle>
            </View>
          </View>
        </View>

        {/* Compact Settings Panel */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings Panel</Text>
          <View style={styles.settingsPanel}>
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Wi-Fi</Text>
              <ButtonToggle 
                variant="compact"
                size="small"
                active={compactToggles.wifi}
                onPress={(active) => setCompactToggles(prev => ({ ...prev, wifi: active }))}
              >
                {compactToggles.wifi ? 'On' : 'Off'}
              </ButtonToggle>
            </View>
            
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Bluetooth</Text>
              <ButtonToggle 
                variant="compact"
                size="small"
                active={compactToggles.bluetooth}
                onPress={(active) => setCompactToggles(prev => ({ ...prev, bluetooth: active }))}
              >
                {compactToggles.bluetooth ? 'On' : 'Off'}
              </ButtonToggle>
            </View>
            
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Location</Text>
              <ButtonToggle 
                variant="compact"
                size="small"
                active={compactToggles.location}
                onPress={(active) => setCompactToggles(prev => ({ ...prev, location: active }))}
              >
                {compactToggles.location ? 'On' : 'Off'}
              </ButtonToggle>
            </View>
          </View>
        </View>

        {/* Disabled State */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Disabled State</Text>
          <View style={styles.row}>
            <ButtonToggle 
              active={false}
              disabled={true}
              onPress={() => {}}
            >
              Disabled Off
            </ButtonToggle>
          </View>
          <View style={styles.row}>
            <ButtonToggle 
              active={true}
              disabled={true}
              onPress={() => {}}
            >
              Disabled On
            </ButtonToggle>
          </View>
        </View>

        {/* Loading State */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Loading State</Text>
          <View style={styles.row}>
            <ButtonToggle 
              active={false}
              loading={true}
              onPress={() => {}}
            >
              Loading Toggle
            </ButtonToggle>
          </View>
        </View>

        {/* Feature Toggles */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Feature Toggles</Text>
          <View style={styles.column}>
            <View style={styles.row}>
              <ButtonToggle 
                active={false}
                enableGlow={false}
                onPress={() => {}}
              >
                No Glow
              </ButtonToggle>
            </View>
            <View style={styles.row}>
              <ButtonToggle 
                active={true}
                enableGlassMorphism={false}
                onPress={() => {}}
              >
                No Glass
              </ButtonToggle>
            </View>
            <View style={styles.row}>
              <ButtonToggle 
                active={false}
                enableShadowEffects={false}
                onPress={() => {}}
              >
                No Shadow
              </ButtonToggle>
            </View>
          </View>
        </View>

        {/* Custom Colors */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Custom Colors</Text>
          <View style={styles.column}>
            <View style={styles.row}>
              <ButtonToggle 
                active={true}
                activeColors={['#6C5CE7', '#A29BFE']}
                onPress={() => {}}
              >
                Purple Theme
              </ButtonToggle>
            </View>
            <View style={styles.row}>
              <ButtonToggle 
                active={false}
                activeColors={['#FFD700', '#F7DC6F']}
                inactiveColor="rgba(255,215,0,0.1)"
                onPress={() => {}}
              >
                Gold Theme
              </ButtonToggle>
            </View>
          </View>
        </View>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 * Component styles
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: deepSpaceColors.void,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: ProfessionalGrays.light,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: ProfessionalGrays.text,
    textAlign: 'center',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: ProfessionalGrays.light,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
  },
  column: {
    gap: 12,
  },
  interactiveRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: ProfessionalGrays.text,
    fontWeight: '500',
  },
  stateText: {
    fontSize: 14,
    color: ProfessionalGrays.text,
    textAlign: 'center',
    marginTop: 8,
  },
  settingsPanel: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 16,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  settingLabel: {
    fontSize: 16,
    color: ProfessionalGrays.light,
    fontWeight: '500',
  },
  bottomSpacing: {
    height: 40,
  },
});

export default ButtonToggleTest;
