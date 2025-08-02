  import { CARD_GLASS_PRESET, createGlassMorphismStyle } from '@/src/components/foundations/effects/GlassMorphism';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ArrowLeft, Phone, RefreshCw, Shield } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { ButtonPrimary } from '../../components/buttons/ButtonPrimary';
import { useTheme } from '../../components/foundations/themes/useTheme';
import CodeInput from '../../components/inputs/CodeInput';
import CosmicBackground from '../../components/MobileApp/CosmicBackground';


interface RouteParams {
  contact: string;
}

const OtpScreen: React.FC = () => {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const contact = route.params?.contact || '+15551234567';
  const { colors } = useTheme();
  const glassCardStyle = createGlassMorphismStyle(CARD_GLASS_PRESET);
  // Format phone number for display
  const formatPhoneForDisplay = (phone: string) => {
    const cleaned = phone.replace(/[^\d+]/g, '');
    if (cleaned.startsWith('+1')) {
      const digits = cleaned.slice(2);
      return `+1 (***) ***-${digits.slice(-4)}`;
    }
    return `(***) ***-${cleaned.slice(-4)}`;
  };

  const maskedContact = formatPhoneForDisplay(contact);

  useEffect(() => {
    // Start countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCodeChange = (code: string, isComplete: boolean) => {
    setOtp(code);
    setError('');
  };

  const handleValidation = (valid: boolean, message: string) => {
    setIsValid(valid);
    setError(message);
  };

  const handleVerify = async () => {
    if (otp.length !== 4) {
      setError('Please enter all 4 digits');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API verification
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate success (in real app, check response)
    if (otp === '1234' || otp === '0000') {
      setIsLoading(false);
      // Navigate to UserProfile screen after successful verification
      navigation.navigate('UserProfile');
    } else {
      setIsLoading(false);
      setError('Invalid verification code. Please try again.');
      setOtp('');
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    setCanResend(false);
    setTimeLeft(60);
    setError('');
    
    // Simulate resend API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsResending(false);
    
    // Restart timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.cosmos.deep }}>
      <CosmicBackground />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 16 }}>
          {/* Header */}
          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            paddingTop: 5,
            paddingBottom: 16
          }}>
            <TouchableOpacity
              onPress={handleBack}
              style={{
                height: 36,
                width: 36,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 18,
                backgroundColor: 'rgba(148, 163, 184, 0.1)'
              }}
            >
              <ArrowLeft size={20} color="#CBD5E1" />
            </TouchableOpacity>
            <Text style={{ 
              fontSize: 20, 
              fontWeight: '600', 
              color: '#FFFFFF' 
            }}>
              Verification
            </Text>
            <View style={{ width: 36 }} />
          </View>

          {/* Content */}
          <View style={{ flex: 1, paddingBottom: 24 }}>
            <View style={{  alignItems: 'center', marginBottom: 24 }}>
              <View style={{
                width: 56,
                height: 56,
                backgroundColor: '#3B82F6',
                borderRadius: 14,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 16
              }}>
                <Shield size={28} color="white" />
              </View>
              <Text style={{ 
                fontSize: 20, 
                fontWeight: '700', 
                color: '#FFFFFF', 
                marginBottom: 6,
                textAlign: 'center'
              }}>
                Enter Verification Code
              </Text>
              <Text style={{ 
                fontSize: 13, 
                color: '#94A3B8', 
                marginBottom: 4,
                textAlign: 'center'
              }}>
                We've sent a 4-digit code to
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Phone size={12} color="#94A3B8" />
                <Text style={{ 
                  color: '#CBD5E1', 
                  fontWeight: '500', 
                  fontSize: 13 
                }}>
                  {maskedContact}
                </Text>
              </View>
            </View>

            {/* OTP Input Card */}
            <View style={{
              ...glassCardStyle,
              padding: 16,
              marginBottom: 16,
            }}>
              {/* OTP Input */}
              <View style={{ marginBottom: 12 }}>
                <CodeInput
                  length={4}
                  value={otp}
                  onCodeChange={handleCodeChange}
                  onValidation={handleValidation}
                  size="medium"
                  config={{
                    label: { text: 'Enter OTP', position: 'top', required: true },
                    validation: {
                      realTime: true,
                      minLength: 4,
                      maxLength: 4,
                      message: 'Please enter a valid 4-digit OTP',
                      pattern: /^\d{4}$/,
                    },
                    animation: {
                      focusAnimation: true,
                      errorShake: true,
                      successPulse: true,
                    },
                  }}
                />
              </View>

              {/* Error Message */}
              {error ? (
                <Text style={{ 
                  textAlign: 'center', 
                  marginBottom: 10, 
                  color: '#F87171', 
                  fontSize: 13 
                }}>
                  {error}
                </Text>
              ) : null}

              {/* Verify Button */}
              <ButtonPrimary
                onPress={handleVerify}
                config={{ size: 'medium', variant: 'wide' }}
                style={{ width: '100%' }}
                disabled={otp.length !== 4 || isLoading}
              >
                {isLoading ? 'Verifying...' : 'Verify & Continue'}
              </ButtonPrimary>
            </View>

            {/* Resend Section */}
            <View style={{ alignItems: 'center', gap: 10 }}>
              <Text style={{ 
                fontSize: 13, 
                color: '#94A3B8' 
              }}>
                Didn't receive the code?
              </Text>
              
              {canResend ? (
                <TouchableOpacity
                  onPress={handleResend}
                  disabled={isResending}
                  style={{
                    ...glassCardStyle,  
                    height: 36,
                    paddingHorizontal: 14,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {isResending ? (
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                      <RefreshCw size={12} color="#CBD5E1" />
                      <Text style={{ color: '#CBD5E1', fontSize: 13 }}>Sending...</Text>
                    </View>
                  ) : (
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                      <RefreshCw size={12} color="#CBD5E1" />
                      <Text style={{ color: '#CBD5E1', fontSize: 13 }}>Resend Code</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ) : (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <RefreshCw size={12} color="#94A3B8" />
                  <Text style={{ 
                    fontSize: 13, 
                    color: '#94A3B8' 
                  }}>
                    Resend available in {formatTime(timeLeft)}
                  </Text>
                </View>
              )}
            </View>

            {/* Help Section */}
            <View style={{
              ...glassCardStyle,
              padding: 14,
              marginTop: 20,
            }}>
              <View style={{ gap: 6 }}>
                <Text style={{ 
                  fontSize: 11, 
                  color: '#94A3B8', 
                  textAlign: 'center', 
                  fontWeight: '600' 
                }}>
                  Security Tips:
                </Text>
                <View style={{ gap: 3 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 6 }}>
                    <View style={{ 
                      width: 3, 
                      height: 3, 
                      backgroundColor: '#64748B', 
                      borderRadius: 1.5, 
                      marginTop: 5,
                      flexShrink: 0
                    }} />
                    <Text style={{ 
                      fontSize: 11, 
                      color: '#64748B', 
                      flex: 1,
                      lineHeight: 14
                    }}>
                      Code expires in 10 minutes for security
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 6 }}>
                    <View style={{ 
                      width: 3, 
                      height: 3, 
                      backgroundColor: '#64748B', 
                      borderRadius: 1.5, 
                      marginTop: 5,
                      flexShrink: 0
                    }} />
                    <Text style={{ 
                      fontSize: 11, 
                      color: '#64748B', 
                      flex: 1,
                      lineHeight: 14
                    }}>
                      Check your messages if code doesn't arrive
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 6 }}>
                    <View style={{ 
                      width: 3, 
                      height: 3, 
                      backgroundColor: '#64748B', 
                      borderRadius: 1.5, 
                      marginTop: 5,
                      flexShrink: 0
                    }} />
                    <Text style={{ 
                      fontSize: 11, 
                      color: '#64748B', 
                      flex: 1,
                      lineHeight: 14
                    }}>
                      Never share your verification code with anyone
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default OtpScreen;
