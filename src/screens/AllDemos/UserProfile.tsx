import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

// Buttons
import { CARD_GLASS_PRESET, createGlassMorphismStyle } from '@/src/components/foundations/effects/GlassMorphism';
import ButtonPrimary from '../../components/buttons/ButtonPrimary';
// Inputs
import { DateInput } from '../../components/inputs/DateInput';
import EmailInput from '../../components/inputs/EmailInput';
import { SearchInput } from '../../components/inputs/SearchInput';
import { SelectInput } from '../../components/inputs/SelectInput';
import { TimeInput } from '../../components/inputs/TimeInput';


// Typography

// Layout

// Feedback Components

// Foundations
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useTheme } from '../../components/foundations/themes/useTheme';
import CosmicBackground from '../../components/MobileApp/CosmicBackground';
import Statusbar from '../../components/MobileApp/Statusbar';

const UserProfile: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  // Form state
  const [formData, setFormData] = useState({
    email: '',
    gender: '',
    dateOfBirth: null as Date | null,
    timeOfBirth: null as any,
    birthLocation: '',
  });

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const { colors } = useTheme();
  const glassCardStyle = createGlassMorphismStyle(CARD_GLASS_PRESET);
  
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
    { id: '6', text: 'Hyderabad, India', secondary: 'Telangana, India' },
    { id: '7', text: 'Pune, India', secondary: 'Maharashtra, India' },
    { id: '8', text: 'Ahmedabad, India', secondary: 'Gujarat, India' },
  ];
  
  // Update form data
  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  // Calculate profile completion percentage
  const calculateProfileComplete = () => {
    const fields = ['email', 'gender', 'dateOfBirth', 'timeOfBirth', 'birthLocation'];
    const filledFields = fields.filter(field => {
      const value = formData[field as keyof typeof formData];
      if (field === 'dateOfBirth') return value !== null;
      if (field === 'timeOfBirth') return value !== null;
      return value !== '';
    });
    const percentage = Math.round((filledFields.length / fields.length) * 100);
    return percentage;
  };

  // Handle form submission
  const handleSubmit = async () => {
      navigation.navigate('Tabs');
    const completion = calculateProfileComplete();
    if (completion < 100) {
      setShowErrorAlert(true);
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccessAlert(true);
    }, 2000);
  };

  // Handle form reset
  const handleReset = () => {
    setFormData({
      email: '',
      gender: '',
      dateOfBirth: null,
      timeOfBirth: null,
      birthLocation: '',
    });
  };

  // Handle alert dismiss
  const handleAlertDismiss = () => {
    setShowSuccessAlert(false);
    setShowErrorAlert(false);
  };

  const profileComplete = calculateProfileComplete();

  return (
    <View style={{ flex: 1, backgroundColor: colors.cosmos.deep }}>
      <Statusbar />
      <CosmicBackground />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView 
          style={{ flex: 1 }} 
          contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={{ alignItems: 'center', paddingTop: 24, paddingBottom: 32 }}>
            <View style={{
              width: 60,
              height: 60,
              backgroundColor: '#3B82F6',
              borderRadius: 16,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16
            }}>
              <Text style={{ fontSize: 24, color: '#FFFFFF' }}>👤</Text>
            </View>
            <Text style={{ 
              fontSize: 24, 
              fontWeight: '700', 
              color: '#FFFFFF', 
              marginBottom: 6,
              textAlign: 'center'
            }}>
              Complete Your Profile
            </Text>
            <Text style={{ 
              fontSize: 14, 
              color: '#94A3B8', 
              textAlign: 'center',
              lineHeight: 20
            }}>
              Help us personalize your experience
            </Text>
          </View>

          {/* Profile Completion Progress */}
          <View style={{
            ...glassCardStyle,
            padding: 16,
            marginBottom: 16,
          }}>
            <View style={{ 
              flexDirection: 'row', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: 10 
            }}>
              <Text style={{ 
                fontSize: 14, 
                fontWeight: '600', 
                color: '#FFFFFF' 
              }}>
                Profile Completion
              </Text>
              <View style={{
                backgroundColor: '#3B82F6',
                paddingHorizontal: 8,
                paddingVertical: 2,
                borderRadius: 8
              }}>
                <Text style={{ 
                  fontSize: 12, 
                  fontWeight: '600', 
                  color: '#FFFFFF' 
                }}>
                  {profileComplete}%
                </Text>
              </View>
            </View>
            <View style={{
              height: 6,
              backgroundColor: 'rgba(148, 163, 184, 0.2)',
              borderRadius: 3,
              overflow: 'hidden'
            }}>
              <View style={{
                height: '100%',
                backgroundColor: '#3B82F6',
                width: `${profileComplete}%`,
                borderRadius: 3
              }} />
            </View>
            {isLoading && (
              <View style={{ alignItems: 'center', marginTop: 10 }}>
                <Text style={{ 
                  fontSize: 12, 
                  color: '#94A3B8',
                  textAlign: 'center'
                }}>
                  Saving your profile...
                </Text>
              </View>
            )}
          </View>

          {/* Profile Fields Section */}
          <View style={{
            ...glassCardStyle,
            padding: 16,
            marginBottom: 16,
          }}>
            <Text style={{ 
              fontSize: 16, 
              fontWeight: '600', 
              color: '#FFFFFF', 
              marginBottom: 12 
            }}>
              Profile Information
            </Text>
            <View style={{ gap: 16 }}>
              {/* Email Field */}
              <View>
                <Text style={{ 
                  fontSize: 13, 
                  fontWeight: '500', 
                  color: '#CBD5E1', 
                  marginBottom: 6 
                }}>
                  Email Address *
                </Text>
                <EmailInput
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChangeText={(text: string) => updateFormData('email', text)}
                  config={{ size: 'small' }}
                />
              </View>
              {/* Gender Field */}
              <View>
                <Text style={{ 
                  fontSize: 13, 
                  fontWeight: '500', 
                  color: '#CBD5E1', 
                  marginBottom: 6 
                }}>
                  Gender *
                </Text>
                <SelectInput
                  value={formData.gender}
                  onValueChange={(value) => updateFormData('gender', value)}
                  placeholder="Select gender"
                  options={genderOptions}
                />
              </View>
              
            </View>
          </View>

          {/* Birth Information Section */}
          <View style={{
            ...glassCardStyle,
            padding: 16,
            marginBottom: 20,
          }}>
            <Text style={{ 
              fontSize: 16, 
              fontWeight: '600', 
              color: '#FFFFFF', 
              marginBottom: 12 
            }}>
              Birth Information
            </Text>
                         <View style={{ gap: 16 }}>
               {/* Date of Birth */}
               <View>
                 <DateInput
                   value={formData.dateOfBirth || undefined}
                   onDateChange={(date) => updateFormData('dateOfBirth', date)}
                   placeholder="Select date of birth"
                   label="Date of Birth"
                 />
               </View>
               {/* Time of Birth */}
               <View>
                 <TimeInput
                   value={formData.timeOfBirth || undefined}
                   onTimeChange={(time) => updateFormData('timeOfBirth', time)}
                   placeholder="Select time of birth"
                   label="Time of Birth"
                 />
               </View>
               {/* Birth Location Field */}
               <View>
                 <Text style={{ 
                   fontSize: 13, 
                   fontWeight: '500', 
                   color: '#CBD5E1', 
                   marginBottom: 6 
                 }}>
                   Birth Location *
                 </Text>
                                   <SearchInput
                    value={formData.birthLocation}
                    onSearchChange={(location) => updateFormData('birthLocation', location)}
                    placeholder="Enter birth location"
                    suggestions={locationSuggestions}
                    onSuggestionSelect={(suggestion) => updateFormData('birthLocation', suggestion.text)}
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
             </View>
          </View>

          {/* Action Buttons Section */}
          <View style={{ marginBottom: 20 }}>
            <ButtonPrimary 
              onPress={handleSubmit} 
              config={{ size: 'medium', variant: 'wide' }}
              style={{ width: '100%' }}
              disabled={isLoading}
            >
              {isLoading ? 'Saving Profile...' : 'Save Profile'}
            </ButtonPrimary>
          </View>

          {/* Alerts */}
          {showSuccessAlert && (
            <View style={{
              ...glassCardStyle,
              padding: 12,
              marginBottom: 16
            }}>
              <Text style={{ 
                fontSize: 14, 
                fontWeight: '600', 
                color: '#22C55E',
                marginBottom: 4
              }}>
                Success
              </Text>
              <Text style={{ 
                fontSize: 13, 
                color: '#86EFAC' 
              }}>
                Profile updated successfully.
              </Text>
            </View>
          )}
          {showErrorAlert && (
            <View style={{
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              borderWidth: 1,
              borderColor: 'rgba(239, 68, 68, 0.3)',
              borderRadius: 12,
              padding: 12,
              marginBottom: 16
            }}>
              <Text style={{ 
                fontSize: 14, 
                fontWeight: '600', 
                color: '#EF4444',
                marginBottom: 4
              }}>
                Incomplete
              </Text>
              <Text style={{ 
                fontSize: 13, 
                color: '#FCA5A5' 
              }}>
                Please complete all required fields.
              </Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default UserProfile; 