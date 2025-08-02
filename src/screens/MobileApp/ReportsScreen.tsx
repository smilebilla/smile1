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

const ReportsScreen: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

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

    // Pulse animation for featured report
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  const reports = [
    {
      id: 'health',
      title: 'Health & Wellness',
      description: 'Astrological insights for physical and mental well-being',
      icon: 'heart-pulse',
      color: colors.brand.primary,
      featured: true,
      duration: '15-20 min',
      accuracy: '98%',
    },
    {
      id: 'wealth',
      title: 'Wealth & Finance',
      description: 'Financial prosperity and abundance guidance',
      icon: 'cash-multiple',
      color: colors.luxury.pure,
      featured: false,
      duration: '12-18 min',
      accuracy: '95%',
    },
    {
      id: 'career',
      title: 'Career & Success',
      description: 'Professional growth and career advancement',
      icon: 'briefcase-variant',
      color: colors.brand.accent,
      featured: false,
      duration: '18-25 min',
      accuracy: '97%',
    },
    {
      id: 'relationships',
      title: 'Love & Relationships',
      description: 'Romantic compatibility and relationship dynamics',
      icon: 'account-heart',
      color: colors.mystical.royal,
      featured: false,
      duration: '20-30 min',
      accuracy: '99%',
    },
    {
      id: 'spiritual',
      title: 'Spiritual Growth',
      description: 'Soul evolution and spiritual development',
      icon: 'meditation',
      color: colors.mystical.light,
      featured: false,
      duration: '25-35 min',
      accuracy: '96%',
    },
    {
      id: 'family',
      title: 'Family & Home',
      description: 'Family dynamics and domestic harmony',
      icon: 'home-heart',
      color: colors.luxury.champagne,
      featured: false,
      duration: '15-20 min',
      accuracy: '94%',
    },
  ];

  const glassCardStyle = createGlassMorphismStyle(CARD_GLASS_PRESET);

  const renderReportCard = ({ item }: { item: any }) => (
    <AnimatedCard style={{ marginBottom: 20, marginTop: -10 }}>
      <View style={[glassCardStyle, { padding: 20, borderRadius: 20 }]}>
        <View style={styles.cardHeader}>
          <Animated.View
            style={[
              styles.iconContainer,
              {
                backgroundColor: String(item.color) + '20',
                transform: item.featured ? [{ scale: pulseAnim }] : undefined,
              },
            ]}
          >
            <MaterialCommunityIcons
              name={item.icon as any}
              size={28}
              color={item.color}
            />
          </Animated.View>
          <View style={styles.cardContent}>
            <Text style={[styles.cardTitle, { color: colors.neutral.light }]}>
              {item.title}
            </Text>
            <Text style={[styles.cardDescription, { color: colors.neutral.medium }]}>
              {item.description}
            </Text>
          </View>
          {item.featured && (
            <View style={styles.featuredBadge}>
              <Text style={styles.featuredText}>Featured</Text>
            </View>
          )}
        </View>
        
        <View style={styles.cardStats}>
          <View style={styles.statItem}>
            <MaterialCommunityIcons name="clock-outline" size={14} color={colors.neutral.medium} />
            <Text style={[styles.statText, { color: colors.neutral.medium }]}>{item.duration}</Text>
          </View>
          <View style={styles.statItem}>
            <MaterialCommunityIcons name="check-circle" size={14} color={colors.neutral.medium} />
            <Text style={[styles.statText, { color: colors.neutral.medium }]}>{item.accuracy} Accuracy</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.actionButton}>
          <LinearGradient
            colors={[item.color, String(item.color) + '80']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientButton}
          >
            <Text style={styles.buttonText}>Generate Report</Text>
            <MaterialCommunityIcons name="arrow-right" size={16} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </AnimatedCard>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.cosmos.deep }}>
      <Statusbar />
      <CosmicBackground />
      <SafeAreaView style={{ flex: 1 }}>
        <PrimaryHeader
          title={
            <Text style={{ fontSize: 20, fontWeight: '600', color: colors.brand.primary }}>
               Reports
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
              id: 'history',
              icon: (
                <ButtonIcon onPress={() => {}} style={{ marginRight: -8 }}>
                  <MaterialCommunityIcons 
                    name="history" 
                    size={20} 
                    color={colors.brand.primary} 
                  />
                </ButtonIcon>
              ),
              onPress: () => {},
              accessibilityLabel: 'History',
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
            data={reports}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 140, paddingTop: 20 }}
            renderItem={renderReportCard}
            ListHeaderComponent={
              <>
                {/* Hero Section */}
                <AnimatedCard style={{ marginBottom: 20, marginTop: -10 }}>
                  <View style={[glassCardStyle, { padding: 20, borderRadius: 20 }]}>
                    <View style={styles.heroHeader}>
                      <View style={styles.heroIconContainer}>
                        <MaterialCommunityIcons
                          name="chart-line"
                          size={40}
                          color={colors.brand.primary}
                        />
                      </View>
                      <View style={styles.heroContent}>
                        <Text style={[styles.heroTitle, { color: colors.brand.primary }]}>
                          📊 Personal Reports
                        </Text>
                        <Text style={[styles.heroSubtitle, { color: colors.neutral.medium }]}>
                          Get detailed astrological insights tailored to your birth chart. Each report provides comprehensive analysis and actionable guidance.
                        </Text>
                      </View>
                    </View>
                    
                    <View style={styles.heroStats}>
                      <View style={styles.heroStatItem}>
                        <Text style={[styles.statNumber, { color: colors.luxury.pure }]}>6</Text>
                        <Text style={[styles.statLabel, { color: colors.neutral.medium }]}>Reports</Text>
                      </View>
                      <View style={styles.heroStatItem}>
                        <Text style={[styles.statNumber, { color: colors.mystical.light }]}>98%</Text>
                        <Text style={[styles.statLabel, { color: colors.neutral.medium }]}>Accuracy</Text>
                      </View>
                      <View style={styles.heroStatItem}>
                        <Text style={[styles.statNumber, { color: colors.brand.accent }]}>∞</Text>
                        <Text style={[styles.statLabel, { color: colors.neutral.medium }]}>Insights</Text>
                      </View>
                    </View>
                  </View>
                </AnimatedCard>

                {/* Divider */}
                <View style={styles.divider}>
                  <View style={[styles.dividerLine, { backgroundColor: String(colors.brand.primary) + '30' }]} />
                  <Text style={[styles.dividerText, { color: colors.brand.primary }]}>
                    ✨ Available Reports
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
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
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
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  featuredBadge: {
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  featuredText: {
    color: '#FFD700',
    fontSize: 10,
    fontWeight: '600',
  },
  cardStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingHorizontal: 2,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 11,
    fontWeight: '500',
    marginLeft: 4,
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
    fontSize: 13,
    marginRight: 6,
  },
  heroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  heroIconContainer: {
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
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 6,
  },
  heroSubtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  heroStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  heroStatItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '500',
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
    fontSize: 14,
    fontWeight: '600',
    marginHorizontal: 12,
  },
});

export default ReportsScreen;