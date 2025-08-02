import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft } from 'lucide-react-native';
import React, { useEffect, useRef } from 'react';
import { Animated, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ButtonIcon from '../../components/buttons/ButtonIcon';
import { PrimaryHeader } from '../../components/composite/navigation/header/PrimaryHeader';
import { CARD_GLASS_PRESET, createGlassMorphismStyle } from '../../components/foundations/effects/GlassMorphism';
import { useTheme } from '../../components/foundations/themes/useTheme';
import AnimatedCard from '../../components/MobileApp/AnimatedCard';
import CosmicBackground from '../../components/MobileApp/CosmicBackground';
import Statusbar from '../../components/MobileApp/Statusbar';
// Typography tokens
import { fontSizes } from '../../components/foundations/tokens';

const AstroAITab: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const aiGlowAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // AI glow animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(aiGlowAnim, {
          toValue: 1.15,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(aiGlowAnim, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  const aiFeatures = [
    {
      id: '1',
      title: 'Personalized Horoscopes',
      description: 'Get daily insights tailored to your birth chart',
      icon: 'zodiac-libra',
      color: colors.brand.primary,
    },
    {
      id: '2',
      title: 'Compatibility Analysis',
      description: 'Deep dive into relationship dynamics',
      icon: 'heart-multiple',
      color: colors.mystical.royal,
    },
    {
      id: '3',
      title: 'Career Guidance',
      description: 'Astrological insights for professional growth',
      icon: 'briefcase',
      color: colors.luxury.champagne,
    },
    {
      id: '4',
      title: 'Life Path Reading',
      description: 'Discover your soul\'s journey and purpose',
      icon: 'map-marker-path',
      color: colors.brand.accent,
    },
  ];

  const glassCardStyle = createGlassMorphismStyle(CARD_GLASS_PRESET);

  return (
    <View style={{ flex: 1, backgroundColor: colors.cosmos.deep }}>
      <Statusbar />
      <CosmicBackground />
      <SafeAreaView style={{ flex: 1 }}>
        <PrimaryHeader
          title={
            <Text style={{ fontSize: fontSizes.h4.size, fontWeight: '600', color: colors.brand.primary }}>
             Astro Ratan AI
            </Text>
          }
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
                onPress={handleBack}
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
            onPress: handleBack,
            accessibilityLabel: 'Back',
          }}
          rightButtons={[
            {
              id: 'settings',
              icon: (
                <ButtonIcon onPress={() => {}} style={{ marginRight: -8 }}>
                  <MaterialCommunityIcons 
                    name="cog" 
                    size={20} 
                    color={colors.brand.primary} 
                  />
                </ButtonIcon>
              ),
              onPress: () => {},
              accessibilityLabel: 'Settings',
            },
          ]}
        />

        <Animated.View
          style={[
            { flex: 1 },
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <FlatList
            data={aiFeatures}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 140, paddingTop: 20 }}
            renderItem={({ item }) => (
              <AnimatedCard style={{ marginBottom: 20, marginTop: -10 }}>
                <View style={[glassCardStyle, { padding: 20, borderRadius: 20 }]}>
                  <View style={styles.featureHeader}>
                    <Animated.View
                      style={[
                        styles.iconContainer,
                        {
                          backgroundColor: String(item.color) + '20',
                          transform: [{ scale: aiGlowAnim }],
                        },
                      ]}
                    >
                      <MaterialCommunityIcons
                        name={item.icon as any}
                        size={28}
                        color={item.color}
                      />
                    </Animated.View>
                    <View style={styles.featureContent}>
                      <Text style={[styles.featureTitle, { color: colors.neutral.light }]}>
                        {item.title}
                      </Text>
                      <Text style={[styles.featureDescription, { color: colors.neutral.medium }]}>
                        {item.description}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => navigation.navigate('AIChartScreen', { chartType: item.title })}
                  >
                    <LinearGradient
                      colors={[item.color, String(item.color) + '80']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.gradientButton}
                    >
                      <Text style={styles.buttonText}>Explore</Text>
                      <MaterialCommunityIcons name="arrow-right" size={16} color="#fff" />
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </AnimatedCard>
            )}
            ListHeaderComponent={
              <>
                {/* Hero AI Section */}
                <AnimatedCard style={{ marginBottom: 20, marginTop: -10 }}>
                  <View style={[glassCardStyle, { padding: 20, borderRadius: 20 }]}>
                    <View style={styles.heroHeader}>
                      <Animated.View
                        style={[
                          styles.aiIconContainer,
                          {
                            backgroundColor: String(colors.brand.primary) + '20',
                            transform: [{ scale: aiGlowAnim }],
                          },
                        ]}
                      >
                        <MaterialCommunityIcons
                          name="robot-excited-outline"
                          size={40}
                          color={colors.brand.primary}
                        />
                      </Animated.View>
                      <View style={styles.heroContent}>
                        <Text style={[styles.heroTitle, { color: colors.brand.primary }]}>
                          🤖 Astro Ratan AI
                        </Text>
                        <Text style={[styles.heroSubtitle, { color: colors.neutral.medium }]}>
                          Your personal astrological AI assistant, available 24/7 to provide cosmic insights and guidance.
                        </Text>
                      </View>
                    </View>
                    
                    <View style={styles.heroStats}>
                      <View style={styles.statItem}>
                        <Text style={[styles.statNumber, { color: colors.luxury.pure }]}>24/7</Text>
                        <Text style={[styles.statLabel, { color: colors.neutral.medium }]}>Available</Text>
                      </View>
                      <View style={styles.statItem}>
                        <Text style={[styles.statNumber, { color: colors.mystical.light }]}>99%</Text>
                        <Text style={[styles.statLabel, { color: colors.neutral.medium }]}>Accuracy</Text>
                      </View>
                      <View style={styles.statItem}>
                        <Text style={[styles.statNumber, { color: colors.brand.accent }]}>∞</Text>
                        <Text style={[styles.statLabel, { color: colors.neutral.medium }]}>Insights</Text>
                      </View>
                    </View>

                    <TouchableOpacity 
                      style={styles.chatButton}
                      onPress={() => navigation.navigate('AIChartScreen', { chartType: 'AI Chat' })}
                    >
                      <LinearGradient
                        colors={[colors.brand.primary, colors.brand.accent]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.chatGradient}
                      >
                        <MaterialCommunityIcons name="chat" size={18} color="#fff" />
                        <Text style={styles.chatButtonText}>Start Chat Now</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </AnimatedCard>

                {/* Divider */}
                <View style={styles.divider}>
                  <View style={[styles.dividerLine, { backgroundColor: String(colors.brand.primary) + '30' }]} />
                  <Text style={[styles.dividerText, { color: colors.brand.primary }]}>
                    ✨ AI-Powered Features
                  </Text>
                  <View style={[styles.dividerLine, { backgroundColor: String(colors.brand.primary) + '30' }]} />
                </View>
              </>
            }
          />
        </Animated.View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  featureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: fontSizes.body.size,
    fontWeight: '600',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: fontSizes.caption.size,
    lineHeight: fontSizes.caption.lineHeight * fontSizes.caption.size,
  },
  actionButton: {
    alignSelf: 'flex-end',
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: fontSizes.caption.size,
    marginRight: 6,
  },
  heroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  aiIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  heroContent: {
    flex: 1,
  },
  heroTitle: {
    fontSize: fontSizes.h4.size,
    fontWeight: '600',
    marginBottom: 6,
  },
  heroSubtitle: {
    fontSize: fontSizes.small.size,
    lineHeight: fontSizes.small.lineHeight * fontSizes.small.size,
  },
  heroStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: fontSizes.h5.size,
    fontWeight: '600',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: fontSizes.micro.size,
    fontWeight: '500',
  },
  chatButton: {
    alignSelf: 'center',
  },
  chatGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  chatButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: fontSizes.small.size,
    marginLeft: 6,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 24,
    marginVertical: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontSize: fontSizes.small.size,
    fontWeight: '600',
    marginHorizontal: 12,
  },
});

export default AstroAITab;