import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { CARD_GLASS_PRESET, createGlassMorphismStyle } from '../../components/foundations/effects/GlassMorphism';
import { useTheme } from '../../components/foundations/themes/useTheme';

interface HeroSectionProps {
  userName: string;
  sunSign: string;
  moonSign: string;
  ascendantSign: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ userName, sunSign, moonSign, ascendantSign }) => {
  const { colors } = useTheme();
  const glassCardStyle = createGlassMorphismStyle(CARD_GLASS_PRESET);

  return (
    <LinearGradient
      colors={['#FFDEE9', '#B5FFFC']} // Cosmic Rose to Aqua Glow
      start={{ x: 0.0, y: 0.2 }}
      end={{ x: 1, y: 1 }}
      style={{
        borderRadius: 28,
        padding: 3,
        marginHorizontal: 16,
        marginTop: 4,
        marginBottom: 16,
      }}
    >
      <View style={[ { padding: 20, borderRadius: 24 }]}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Left Section - Greeting */}
          <View style={{ flex: 1, marginRight: 14 }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#000', marginBottom: 8 }}>
              🔮 Welcome, {userName}!
            </Text>
            <Text style={{ color: '#000', fontSize: 14, fontWeight: '500' }}>
              Here's your cosmic snapshot ✨
            </Text>
          </View>

          {/* Right Section - Sun Sign */}
          <View
            style={{
              borderRadius: 16,
              paddingVertical: 14,
              paddingHorizontal: 12,
              alignItems: 'center',
              width: 88,
              height: 95,
              shadowColor: colors.brand.primary,
              shadowOpacity: 0.3,
              shadowRadius: 6,
              shadowOffset: { width: 0, height: 2 },
            }}
          >
          <View
               style={{
                 width: 46,
                 height: 46,
                 borderRadius: 23,
                 justifyContent: 'center',
                 alignItems: 'center',
                 marginBottom: -15,

               }}
             >
               <Image
                 source={require('../../../assets/images/leo.png')}
                 style={{ width: 32, height: 32,marginTop:-30, }}
                 resizeMode="contain"
                
               />
             </View>
            <Text style={{ color: '#000', fontWeight: '600', fontSize: 14 }}>{sunSign}</Text>
            <Text style={{ color: '#000', fontSize: 11 }}>Sun Sign</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default HeroSection;
