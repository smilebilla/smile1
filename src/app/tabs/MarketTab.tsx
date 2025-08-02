import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CARD_GLASS_PRESET, createGlassMorphismStyle } from '../../components/foundations/effects/GlassMorphism';
import { useTheme } from '../../components/foundations/themes/useTheme';
import AnimatedCard from '../../components/MobileApp/AnimatedCard';
import CosmicBackground from '../../components/MobileApp/CosmicBackground';

// --- MarketAstroSection (refactored from MarketScreen) ---
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import { useState } from 'react';
import { Modal } from 'react-native';
import { PrimaryHeader } from '../../components/composite/navigation/header/PrimaryHeader';
import Statusbar from '../../components/MobileApp/Statusbar';

const MarketAstroSection: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const [selectedMarket, setSelectedMarket] = useState('Overall Market');
  const [showMarketSelector, setShowMarketSelector] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const marketData = {
    overall: 'bullish',
    confidence: 85,
    description: "Jupiter's favorable transit through Taurus suggests strong market optimism, particularly in technology and financial sectors. The current planetary alignment indicates a period of expansion and growth.",
    keyTransits: [
      { planet: 'Jupiter', sign: 'Taurus', aspect: 'Trine', influence: 'positive' },
      { planet: 'Saturn', sign: 'Pisces', aspect: 'Square', influence: 'negative' },
      { planet: 'Venus', sign: 'Gemini', aspect: 'Conjunction', influence: 'positive' },
      { planet: 'Mars', sign: 'Aries', aspect: 'Opposition', influence: 'neutral' },
      { planet: 'Mercury', sign: 'Virgo', aspect: 'Trine', influence: 'positive' },
    ],
    sectors: [
      {
        name: 'Technology',
        sentiment: 'bullish',
        description: "Mercury's strong position indicates innovation and growth potential. Tech stocks are expected to outperform.",
      },
      {
        name: 'Finance',
        sentiment: 'bullish',
        description: "Jupiter's influence suggests favorable conditions for financial markets. Banking sector shows strong momentum.",
      },
      {
        name: 'Healthcare',
        sentiment: 'neutral',
        description: 'Mixed planetary aspects indicate stable but cautious growth. Focus on biotech innovation.',
      },
      {
        name: 'Energy',
        sentiment: 'bullish',
        description: 'Mars in Aries driving aggressive trading in energy stocks. Oil and gas sector showing strength.',
      },
      {
        name: 'Real Estate',
        sentiment: 'bearish',
        description: "Saturn's restrictive influence affecting property markets. Residential sector facing headwinds.",
      },
      {
        name: 'Consumer Goods',
        sentiment: 'bullish',
        description: 'Venus transit supporting luxury goods sector. Retail spending expected to increase.',
      },
    ],
  };

  const markets = [
    'Overall Market',
    'Technology',
    'Finance',
    'Real Estate',
    'Healthcare',
    'Energy',
  ];

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish':
        return colors.brand.primary;
      case 'bearish':
        return colors.luxury.champagne;
      case 'neutral':
        return colors.mystical.light;
      default:
        return colors.neutral.medium;
    }
  };

  const getInfluenceColor = (influence: string) => {
    switch (influence) {
      case 'positive':
        return colors.brand.primary;
      case 'negative':
        return colors.luxury.champagne;
      case 'neutral':
        return colors.mystical.light;
      default:
        return colors.neutral.medium;
    }
  };

  const glassCardStyle = createGlassMorphismStyle(CARD_GLASS_PRESET);

  return (
    <View style={{ flex: 1, backgroundColor: colors.cosmos.deep }}>
      <Statusbar />
      <CosmicBackground />
      <SafeAreaView style={{ flex: 1 }}>
        <PrimaryHeader
          title={<Text style={{ fontSize: 20, fontWeight: '600', color: colors.brand.primary }}>Market Astro</Text>}
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
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingTop: 24, paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
          <View style={{ alignItems: 'center', marginBottom: 16 }}>
            <TouchableOpacity 
              style={[
                styles.marketSelector,
                { backgroundColor: colors.cosmos.dark, borderColor: String(colors.brand.primary) + '40' }
              ]}
              onPress={() => setShowMarketSelector(true)}
            >
              <Text style={{ color: colors.brand.primary, fontWeight: '600', fontSize: 16, marginRight: 8 }}>{selectedMarket}</Text>
              <MaterialIcons name="arrow-drop-down" size={24} color={colors.brand.primary} />
            </TouchableOpacity>
          </View>

          {/* Market Sentiment Card */}
          <AnimatedCard style={[glassCardStyle, { marginBottom: 16, padding: 18, borderRadius: 18 }]}> 
            <Text style={{ color: colors.brand.primary, fontWeight: '700', fontSize: 18, marginBottom: 8 }}>Overall Market Sentiment</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <View style={{ backgroundColor: String(getSentimentColor(marketData.overall)) + '22', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 4, marginRight: 8 }}>
                <Text style={{ color: getSentimentColor(marketData.overall), fontWeight: '700' }}>{marketData.overall.toUpperCase()}</Text>
              </View>
              <Text style={{ color: colors.neutral.light, fontWeight: '600' }}>Confidence: {marketData.confidence}%</Text>
            </View>
            <Text style={{ color: colors.neutral.medium, fontSize: 14 }}>{marketData.description}</Text>
          </AnimatedCard>

          {/* Key Planetary Transits */}
          <AnimatedCard style={[glassCardStyle, { marginBottom: 16, padding: 18, borderRadius: 18 }]}> 
            <Text style={{ color: colors.brand.primary, fontWeight: '700', fontSize: 16, marginBottom: 8 }}>Key Planetary Transits</Text>
            {marketData.keyTransits.map((transit, idx) => (
              <View key={idx} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, backgroundColor: colors.cosmos.dark, borderRadius: 10, padding: 8 }}>
                <Ionicons name="planet" size={22} color={getInfluenceColor(transit.influence)} style={{ marginRight: 8 }} />
                <Text style={{ color: getInfluenceColor(transit.influence), fontWeight: '700', marginRight: 8 }}>{transit.planet}</Text>
                <Text style={{ color: colors.neutral.light }}>{transit.sign} • {transit.aspect} • {transit.influence}</Text>
              </View>
            ))}
          </AnimatedCard>

          {/* Sector Analysis */}
          <AnimatedCard style={[glassCardStyle, { marginBottom: 16, padding: 18, borderRadius: 18 }]}> 
            <Text style={{ color: colors.brand.primary, fontWeight: '700', fontSize: 16, marginBottom: 8 }}>Sector Analysis</Text>
            {marketData.sectors.map((sector, idx) => (
              <View key={idx} style={{ marginBottom: 12, backgroundColor: colors.cosmos.dark, borderRadius: 10, padding: 8 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                  <Text style={{ color: colors.brand.primary, fontWeight: '700', marginRight: 8 }}>{sector.name}</Text>
                  <View style={{ backgroundColor: String(getSentimentColor(sector.sentiment)) + '22', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 2 }}>
                    <Text style={{ color: getSentimentColor(sector.sentiment), fontWeight: '700' }}>{sector.sentiment.toUpperCase()}</Text>
                  </View>
                </View>
                <Text style={{ color: colors.neutral.medium }}>{sector.description}</Text>
              </View>
            ))}
          </AnimatedCard>

          {/* Filter Button */}
          <TouchableOpacity 
            style={{ alignSelf: 'center', backgroundColor: colors.brand.primary, borderRadius: 24, paddingHorizontal: 28, paddingVertical: 10, marginTop: 8 }}
            onPress={() => setShowFilterModal(true)}
          >
            <Text style={{ color: '#fff', fontWeight: '700', fontSize: 15 }}>Filter</Text>
          </TouchableOpacity>
        </ScrollView>
        {/* Market Selector Modal */}
        <Modal
          visible={showMarketSelector}
          transparent
          animationType="slide"
          onRequestClose={() => setShowMarketSelector(false)}
        >
          <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.2)' }}>
            <View style={{ backgroundColor: colors.cosmos.dark, borderTopLeftRadius: 18, borderTopRightRadius: 18, padding: 24, maxHeight: '80%' }}>
              <Text style={{ color: colors.brand.primary, fontWeight: '700', fontSize: 18, marginBottom: 16, textAlign: 'center' }}>Select Market</Text>
              {markets.map((market, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={{ paddingVertical: 14, borderBottomWidth: idx !== markets.length - 1 ? 1 : 0, borderBottomColor: String(colors.neutral.medium) + '22' }}
                  onPress={() => {
                    setSelectedMarket(market);
                    setShowMarketSelector(false);
                  }}
                >
                  <Text style={{ color: colors.neutral.light, fontSize: 16 }}>{market}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>

        {/* Filter Modal */}
        <Modal
          visible={showFilterModal}
          transparent
          animationType="slide"
          onRequestClose={() => setShowFilterModal(false)}
        >
          <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.2)' }}>
            <View style={{ backgroundColor: colors.cosmos.dark, borderTopLeftRadius: 18, borderTopRightRadius: 18, padding: 24, maxHeight: '80%' }}>
              <Text style={{ color: colors.brand.primary, fontWeight: '700', fontSize: 18, marginBottom: 16, textAlign: 'center' }}>Filter Options</Text>
              {/* Add filter options here */}
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  marketSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 0,
  },
});

export default MarketAstroSection;