import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PrimaryHeader } from '../../components/composite/navigation/header/PrimaryHeader';
import { useTheme } from '../../components/foundations/themes/useTheme';
import AnimatedCard from '../../components/MobileApp/AnimatedCard';
import CosmicBackground from '../../components/MobileApp/CosmicBackground';
import Statusbar from '../../components/MobileApp/Statusbar';

// Import input components
import { DateInput } from '../../components/inputs/DateInput';
import { EmailInput } from '../../components/inputs/EmailInput';
import { SearchInput } from '../../components/inputs/SearchInput';
import { SelectInput } from '../../components/inputs/SelectInput';
import { TextInput } from '../../components/inputs/TextInput';
import { TimeInput } from '../../components/inputs/TimeInput';

// Typography tokens
import { CARD_GLASS_PRESET, createGlassMorphismStyle } from '@/src/components/foundations/effects/GlassMorphism';
import ButtonPrimary from '../../components/buttons/ButtonPrimary';
import { fontSizes } from '../../components/foundations/tokens';

const ProfileScreen: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const glassCardStyle = createGlassMorphismStyle(CARD_GLASS_PRESET);
  // Form state
  const [formData, setFormData] = React.useState({
    name: 'Ismail Ahmed',
    email: 'ismail.astro@email.com',
    dateOfBirth: new Date('1995-08-15'),
    timeOfBirth: { hours: 14, minutes: 30, period: 'PM' as 'PM' | 'AM' },
    gender: 'male',
    birthLocation: 'Mumbai, India',
  });

  const [isUpdating, setIsUpdating] = useState(false);

  // Gender options for SelectInput
  const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
    { label: 'Prefer not to say', value: 'prefer-not-to-say' },
  ];

  // Birth location suggestions for SearchInput
  const locationSuggestions = [
    { id: '1', text: 'Mumbai, India', secondary: 'Maharashtra, India' },
    { id: '2', text: 'Delhi, India', secondary: 'Delhi, India' },
    { id: '3', text: 'Bangalore, India', secondary: 'Karnataka, India' },
    { id: '4', text: 'Chennai, India', secondary: 'Tamil Nadu, India' },
    { id: '5', text: 'Kolkata, India', secondary: 'West Bengal, India' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.cosmos.deep }}>
      <Statusbar />
      <CosmicBackground />
      <SafeAreaView style={{ flex: 1 }}>
        <PrimaryHeader
          title="Profile"
          backgroundColor="transparent"
          height="custom"
          customHeight={55}
          shadow={false}
          blur={false}
          animated
          leftButton={{
            id: 'back',
            icon: (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  height: 36,
                  width: 36,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 18,
                  backgroundColor: 'rgba(148, 163, 184, 0.1)',
                  marginLeft: -15
                }}
              >
                <ArrowLeft size={20} color="#CBD5E1" />
              </TouchableOpacity>
            ),
            onPress: () => navigation.goBack(),
            accessibilityLabel: 'Back',
          }}
        />

        <ScrollView 
          contentContainerStyle={{ paddingBottom: 32 }} 
          showsVerticalScrollIndicator={false}
        >
          {/* Profile Header */}
          <AnimatedCard style={{ margin: 16, alignItems: 'center' }}>
            <View style={[styles.avatar, { backgroundColor: String(colors.brand.primary) + '22' }]}> 
              <Text style={{ fontSize: 48, color: colors.brand.primary }}>👤</Text>
            </View>
            <Text style={[styles.profileName, { color: colors.brand.primary }]}>
              {formData.name}
            </Text>
            <Text style={[styles.profileEmail, { color: colors.neutral.medium }]}>
              {formData.email}
            </Text>
          </AnimatedCard>

          {/* Profile Form */}
          <AnimatedCard style={{ margin: 16 }}>
            <Text style={[styles.sectionTitle, { color: colors.brand.primary }]}>
              Personal Information
            </Text>

            {/* Name Field */}
            <View style={styles.inputContainer}>
              <Text style={[styles.fieldLabel, { color: colors.neutral.light }]}>
                Full Name
              </Text>
              <TextInput
                value={formData.name}
                onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
                placeholder="Enter your full name"
                config={{
                  enableFloatingLabel: false,
                  enableCharacterCounter: false,
                }}
              />
            </View>

            {/* Email Field */}
            <View style={styles.inputContainer}>
              <Text style={[styles.fieldLabel, { color: colors.neutral.light }]}>
                Email Address
              </Text>
              <EmailInput
                value={formData.email}
                onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
                placeholder="Enter your email"
                config={{
                  enableFloatingLabel: false,
                  enableCharacterCounter: false,
                }}
              />
            </View>

            {/* Date of Birth Field */}
            <View style={styles.inputContainer}>
              <Text style={[styles.fieldLabel, { color: colors.neutral.light }]}>
                Date of Birth
              </Text>
              <DateInput
                value={formData.dateOfBirth}
                onDateChange={(date) => setFormData(prev => ({ ...prev, dateOfBirth: date || new Date() }))}
                placeholder="Select date of birth"
                format="MM/DD/YYYY"
                maxDate={new Date()}
              />
            </View>

            {/* Time of Birth Field */}
            <View style={styles.inputContainer}>
              <Text style={[styles.fieldLabel, { color: colors.neutral.light }]}>
                Time of Birth
              </Text>
              <TimeInput
                value={formData.timeOfBirth}
                onTimeChange={(time) => {
                  if (time) {
                    setFormData(prev => ({ 
                      ...prev, 
                      timeOfBirth: {
                        hours: time.hours,
                        minutes: time.minutes,
                        period: time.period || 'PM'
                      }
                    }));
                  }
                }}
                placeholder="Select time of birth"
                format="12h"
              />
            </View>

            {/* Gender Field */}
            <View style={styles.inputContainer}>
              <Text style={[styles.fieldLabel, { color: colors.neutral.light }]}>
                Gender
              </Text>
              <SelectInput
                value={formData.gender}
                onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value as string }))}
                placeholder="Select gender"
                options={genderOptions}
              />
            </View>

            {/* Birth Location Field */}
            <View style={styles.inputContainer}>
              <Text style={[styles.fieldLabel, { color: colors.neutral.light }]}>
                Birth Location
              </Text>
              <SearchInput
                value={formData.birthLocation}
                onSearchChange={(location) => setFormData(prev => ({ ...prev, birthLocation: location }))}
                placeholder="Enter birth location"
                suggestions={locationSuggestions}
                onSuggestionSelect={(suggestion) => setFormData(prev => ({ ...prev, birthLocation: suggestion.text }))}
                search={{
                  debounceDelay: 300,
                  minLength: 1,
                  maxSuggestions: 5,
                  enableSuggestions: true,
                  showSearchIcon: true,
                  showClearButton: true,
                }}
                size="medium"
                variant="default"
              />
            </View>

            {/* Update Button */}
            <View style={styles.updateButtonContainer}>
              <ButtonPrimary
                onPress={() => {
                  setIsUpdating(true);
                  // Simulate API call
                  setTimeout(() => {
                    setIsUpdating(false);
                    // Handle successful update
                  }, 2000);
                }}
                loading={{
                  isLoading: isUpdating,
                  loadingText: 'Updating...',
                  showSpinner: true,
                  showShimmer: true,
                }}
                config={{
                  size: 'medium',
                  variant: 'default',
                  enableHaptics: true,
                  enableGradientAnimation: true,
                  enableHoverEffects: true,
                  enableShadowEffects: true,
                }}
                style={{
                  width: 200,
                }}
              >
                Update
              </ButtonPrimary>
            </View>

          </AnimatedCard>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    marginTop: 8,
  },
  profileName: {
    fontSize: fontSizes.h4.size,
    fontWeight: '600',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: fontSizes.body.size,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: fontSizes.h5.size,
    fontWeight: '600',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: fontSizes.small.size,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    marginBottom: 0,
  },
  editButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  updateButtonContainer: {
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 16,
  },
});

export default ProfileScreen;

