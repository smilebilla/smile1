import { CARD_GLASS_PRESET, createGlassMorphismStyle } from '@/src/components/foundations/effects/GlassMorphism';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, SafeAreaView, Text, View } from 'react-native';
import { ButtonPrimary } from '../../components/buttons/ButtonPrimary';
import { useTheme } from '../../components/foundations/themes/useTheme';
import PhoneInput from '../../components/inputs/PhoneInput';
import CosmicBackground from '../../components/MobileApp/CosmicBackground';



const LoginScreen: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigation = useNavigation<any>();
  const { colors } = useTheme();
  const glassCardStyle = createGlassMorphismStyle(CARD_GLASS_PRESET);


  const handlePhoneChange = (value: string, countryCode: string, formattedValue: string) => {
    setPhoneNumber(value)
    setError('')
    setIsValid(value.length >= 10)
  }

  const handleValidation = (isValid: boolean, message: string) => {
    setIsValid(isValid)
    setError(message)
  }

  const handleLogin = async () => {
    if (!phoneNumber) {
      setError('Please enter your mobile number')
      return
    }
    
    if (!isValid) {
      setError('Please enter a valid mobile number')
      return
    }
    
    setIsLoading(true)
    setError('')
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsLoading(false)
    
    // Navigate to OTP screen with the phone number
    navigation.navigate('OtpScreen', { contact: phoneNumber });
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.cosmos.deep }}>
      <CosmicBackground />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 16 }}>
          {/* Header */}
          <View style={{ alignItems: 'center', paddingTop: 24, paddingBottom: 32 }}>
            <Image 
              source={require('../../../assets/images/Logo.png')} 
              style={{ width: 60, height: 60, resizeMode: 'contain', marginBottom: 16 }}
            />
            <Text style={{ 
              fontSize: 24, 
              fontWeight: '700', 
              color: '#FFFFFF', 
              marginBottom: 6,
              textAlign: 'center'
            }}>
              CorpAstro
            </Text>
            <Text style={{ 
              fontSize: 14, 
              color: '#94A3B8', 
              textAlign: 'center',
              lineHeight: 20
            }}>
              Enter your mobile number to continue
            </Text>
          </View>

          {/* Main Content */}
          <View style={{ flex: 1 }}>
            {/* Phone Input Card */}
            <View style={{
              ...glassCardStyle,
              padding: 20,
              marginBottom: 20,
            }}>
              <View style={{ gap: 20 }}>
                {/* Phone Input */}
                <PhoneInput
                  value={phoneNumber}
                  onValueChange={handlePhoneChange}
                  onValidation={handleValidation}
                  placeholder="Enter phone number"
                  size="medium"
                  config={{
                    label: { text: 'Mobile Number', position: 'top', required: true },
                    validation: {
                      realTime: true,
                      message: 'Please enter a valid mobile number',
                    },
                    formatting: {
                      enabled: true,
                    },
                  }}
                />
                {error ? (
                  <Text style={{ 
                    color: '#F87171', 
                    fontSize: 13, 
                    marginTop: 6,
                    textAlign: 'center'
                  }}>
                    {error}
                  </Text>
                ) : null}

                {/* Send OTP Button */}
                <ButtonPrimary
                  onPress={handleLogin}
                  config={{ size: 'medium', variant: 'wide' }}
                  style={{ 
                    width: '100%', 
                    opacity: isValid && !isLoading ? 1 : 0.6,
                    marginTop: 6
                  }}
                  disabled={!isValid || isLoading}
                >
                  {isLoading ? 'Sending OTP...' : 'Send OTP'}
                </ButtonPrimary>
              </View>
            </View>

            {/* Benefits Section */}
            <View style={{
              ...glassCardStyle,
              padding: 20,
              marginTop: 24,
            }}>
              <Text style={{ 
                fontSize: 16, 
                fontWeight: '600', 
                color: '#FFFFFF', 
                marginBottom: 12,
                textAlign: 'center'
              }}>
                Why use mobile login?
              </Text>
              <View style={{ gap: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 10 }}>
                  <View style={{ 
                    width: 5, 
                    height: 5, 
                    backgroundColor: '#3B82F6', 
                    borderRadius: 2.5, 
                    marginTop: 6,
                    flexShrink: 0
                  }} />
                  <Text style={{ 
                    fontSize: 13, 
                    color: '#CBD5E1', 
                    flex: 1,
                    lineHeight: 18
                  }}>
                    Quick and secure access with OTP verification
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 10 }}>
                  <View style={{ 
                    width: 5, 
                    height: 5, 
                    backgroundColor: '#3B82F6', 
                    borderRadius: 2.5, 
                    marginTop: 6,
                    flexShrink: 0
                  }} />
                  <Text style={{ 
                    fontSize: 13, 
                    color: '#CBD5E1', 
                    flex: 1,
                    lineHeight: 18
                  }}>
                    No need to remember passwords
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 10 }}>
                  <View style={{ 
                    width: 5, 
                    height: 5, 
                    backgroundColor: '#3B82F6', 
                    borderRadius: 2.5, 
                    marginTop: 6,
                    flexShrink: 0
                  }} />
                  <Text style={{ 
                    fontSize: 13, 
                    color: '#CBD5E1', 
                    flex: 1,
                    lineHeight: 18
                  }}>
                    Enhanced security for corporate data
                  </Text>
                </View>
              </View>
            </View>

            {/* Footer */}
            <View style={{ marginTop: 24, alignItems: 'center' }}>
              <Text style={{ 
                fontSize: 11, 
                color: '#64748B', 
                textAlign: 'center',
                lineHeight: 16
              }}>
                By continuing, you agree to our Terms of Service and Privacy Policy.
               
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default LoginScreen;
