import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ZodiacSign } from '../../components/astrology/ZodiacCard';
import { CARD_GLASS_PRESET, createGlassMorphismStyle } from '../../components/foundations/effects/GlassMorphism';

interface ModernHoroscopeCardProps {
  sign: ZodiacSign;
  horoscope: {
    content: string;
    mood: 'excellent' | 'good' | 'average' | 'bad';
  };
}

const zodiacSymbols: Record<ZodiacSign, string> = {
  aries: '♈', taurus: '♉', gemini: '♊', cancer: '♋', leo: '♌', virgo: '♍',
  libra: '♎', scorpio: '♏', sagittarius: '♐', capricorn: '♑', aquarius: '♒', pisces: '♓',
};

const moodColors = {
  excellent: '#43E97B',
  good: '#38BDF8',
  average: '#FACC15',
  bad: '#EF4444',
};

const ModernHoroscopeCard: React.FC<ModernHoroscopeCardProps> = ({ sign, horoscope }) => {
  const glassCardStyle = createGlassMorphismStyle(CARD_GLASS_PRESET);
  const [activeTab, setActiveTab] = useState<'yesterday' | 'today' | 'tomorrow'>('today');

  const getMoodEmoji = (mood: string) => {
    switch (mood) {
      case 'excellent': return '🌟';
      case 'good': return '😊';
      case 'average': return '😐';
      case 'bad': return '😔';
      default: return '✨';
    }
  };

  const tabs = [
    { key: 'yesterday', label: 'Yesterday' },
    { key: 'today', label: 'Today' },
    { key: 'tomorrow', label: 'Tomorrow' },
  ] as const;

  return (
    <View className="my-8 px-4">
      {/* Tab Selector */}
      <View
        className="flex-row rounded-xl p-1 mx-auto border"
        style={{
          backgroundColor: '#ffffff22',
          borderColor: '#ffffff44',
          width: 350,
        }}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              onPress={() => setActiveTab(tab.key)}
              className="flex-1 py-2 rounded-lg items-center justify-center"
              style={{
                backgroundColor: isActive ? '#ffffff33' : 'transparent',
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: isActive ? 'bold' : '500',
                  color: isActive ? '#fff' : '#f5f5f5',
                  opacity: isActive ? 1 : 0.85,
                }}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Horoscope Card */}
      <LinearGradient
        // Light, bright, cosmic-inspired gradient
        colors={['#43C6AC', '#F8FFAE']} // Updated to Celestial Citrus
        start={{ x: 0, y: 0}}
        end={{ x: 1, y: 1 }}
        style={[
          glassCardStyle,
          {
            borderRadius: 28,
            padding: 24,
            marginTop: 16,
            borderWidth: 1,
            borderColor: '#ffffff33',
            width: 350,
            alignSelf: 'center',
            shadowColor: '#ff9a9e',
            shadowOpacity: 0.2,
            shadowRadius: 10,
          },
        ]}
      >
        {/* Header */}
        <View className="flex-row items-center mb-5">
          <View
            className="w-[52px] h-[52px] rounded-2xl justify-center items-center mr-4"
            style={{
              backgroundColor: '#ffffff33',
              borderColor: '#ffffff44',
              borderWidth: 2,
              shadowColor: '#fff',
              shadowOpacity: 0.3,
              shadowRadius: 6,
            }}
          >
            <Text style={{ fontSize: 30, color: '#000' }}>
              {zodiacSymbols[sign]}
            </Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }}>
              {tabs.find(tab => tab.key === activeTab)?.label} Horoscope
            </Text>
            <Text style={{ fontSize: 14, color: '#000' }}>
              for {sign.charAt(0).toUpperCase() + sign.slice(1)} {getMoodEmoji(horoscope.mood)}
            </Text>
          </View>
        </View>

        {/* Content */}
        <Text
          style={{
            color: '#000',
            fontSize: 15,
            lineHeight: 22,
            fontStyle: 'normal',
          }}
        >
          “{horoscope.content}”
        </Text>
      </LinearGradient>
    </View>
  );
};

export default ModernHoroscopeCard;
