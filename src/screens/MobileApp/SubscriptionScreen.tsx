import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, Check } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import Toast from 'react-native-toast-message';
import ButtonPrimary from '../../components/buttons/ButtonPrimary';
import { Card } from '../../components/cards/Card';
import { PrimaryHeader } from '../../components/composite/navigation/header/PrimaryHeader';
import { Badge } from '../../components/feedback';
import { CARD_GLASS_PRESET, createGlassMorphismStyle } from '../../components/foundations/effects/GlassMorphism';
import { useTheme } from '../../components/foundations/themes/useTheme';
import CosmicBackground from '../../components/MobileApp/CosmicBackground';
import Statusbar from '../../components/MobileApp/Statusbar';
import { ToggleButton } from '../../components/toggles';
import { BodyText, Heading } from '../../components/typography';


interface Plan {
  id: string;
  title: string;
  price: string;
  period: string;
  features: string[];
  badge?: string;
  isPopular?: boolean;
}

const plans: Plan[] = [
  {
    id: 'free',
    title: 'Free',
    price: 'Free',
    period: '',
    features: [
      'Basic Daily Horoscope',
      'Zodiac Sign Compatibility',
      'Birth Chart Calculator',
      'Community Astrology Forum',
    ],
  },
  {
    id: 'premium',
    title: 'Premium',
    price: '$99',
    period: '/Month',
    features: [
      'Advanced Birth Chart Analysis',
      'Personalized Astrology Reports',
      'Planetary Transit Alerts',
      'One-on-One Astrology Consultations',
    ],
  },
  {
    id: 'pro',
    title: 'Pro',
    price: '$200',
    period: '/Month',
    features: [
      'Complete Astrological Profile',
      'Business & Career Predictions',
      'Relationship Compatibility Deep Dive',
      'Custom Astrology Coaching Sessions',
    ],
    isPopular: true,
    badge: 'Most Popular',
  },
];

const SubscriptionScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { colors } = useTheme();
  const [selectedPeriod, setSelectedPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string>('premium');
  const [isSubscribing, setIsSubscribing] = useState<boolean>(false);
  const glassCardStyle = createGlassMorphismStyle(CARD_GLASS_PRESET);


  const handleSubscribe = async (planId: string) => {
    setIsSubscribing(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const plan = plans.find(p => p.id === planId);
      Toast.show({
        type: 'success',
        text1: `${plan?.title} Subscription Successful!`,
        text2: `You now have access to ${plan?.title.toLowerCase()} features.`,
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Subscription Failed',
        text2: 'Please try again later.',
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.cosmos.deep }]}>
      <Statusbar />
      <CosmicBackground />
      <PrimaryHeader
        title={<Text style={{ fontSize: 20, fontWeight: '600', color: colors.brand.primary }}>Subscription</Text>}
        leftButton={{
          id: 'back',
          icon: (
            <View style={styles.backButton}>
              <ArrowLeft size={22} color={colors.neutral.light} />
            </View>
          ),
          onPress: () => navigation.goBack(),
          accessibilityLabel: 'Back',
        }}
        backgroundColor="transparent"
        shadow={false}
        blur={false}
        animated
      />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeIn} exiting={FadeOut}>
          {/* Header Section */}
          <View style={styles.headerSection}>
            <BodyText style={styles.subtitle}>
              Unlock Pro Create Without Limits
            </BodyText>
          </View>

          {/* Period Toggle */}
          <View style={styles.toggleContainer}>
            <ToggleButton
              toggled={selectedPeriod === 'monthly'}
              onToggle={() => setSelectedPeriod('monthly')}
              size="medium"
              style={styles.toggleButton}
            >
              Monthly
            </ToggleButton>
            <ToggleButton
              toggled={selectedPeriod === 'yearly'}
              onToggle={() => setSelectedPeriod('yearly')}
              size="medium"
              style={styles.toggleButton}
            >
              Yearly
            </ToggleButton>
          </View>

          {/* Plans Container */}
          <View style={styles.plansContainer}>
            {plans.map((plan) => (
              <TouchableOpacity
                key={plan.id}
                onPress={() => setSelectedPlan(plan.id)}
                style={styles.planTouchable}
              >
                <Card style={{
                  ...glassCardStyle,
                  ...(selectedPlan === plan.id ? styles.selectedPlanCard : {})
                }}>
                  <View style={styles.cardContent}>
                    <View style={styles.cardHeader}>
                      <View>
                        <Heading level="h3" style={styles.planTitle}>
                          {plan.title}
                        </Heading>
                        <View style={styles.priceContainer}>
                          <Heading level="h2" style={styles.price}>
                            {plan.price}
                          </Heading>
                          <BodyText style={styles.period}>
                            {plan.period}
                          </BodyText>
                        </View>
                      </View>
                      {plan.badge && (
                        <View style={styles.badgeContainer}>
                          <Badge 
                            variant="text" 
                            color="gold" 
                            size="medium" 
                            animation="pulse"
                            showGlow={true}
                            style={styles.animatedBadge}
                          >
                            {plan.badge}
                          </Badge>
                        </View>
                      )}
                    </View>

                    <ButtonPrimary
                      onPress={() => handleSubscribe(plan.id)}
                      config={{ size: 'medium' }}
                      style={styles.upgradeButton}
                      disabled={isSubscribing}
                      loading={{
                        isLoading: isSubscribing && selectedPlan === plan.id,
                        loadingText: 'Upgrading...',
                        showSpinner: true,
                        showShimmer: false,
                      }}
                    >
                      {plan.id === 'free' ? 'Get Started' : 'Upgrade Plan'}
                    </ButtonPrimary>

                    <View style={styles.featuresList}>
                      {plan.features.map((feature, index) => (
                        <View key={index} style={styles.featureItem}>
                          <View style={styles.checkIcon}>
                            <Check size={12} color="#4ECDC4" />
                          </View>
                          <BodyText style={styles.featureText}>
                            {feature}
                          </BodyText>
                        </View>
                      ))}
                    </View>
                  </View>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
        <Toast />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(22,33,62,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    padding: 12,
    paddingBottom: 40,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(22,33,62,0.3)',
    borderRadius: 20,
    padding: 3,
    marginBottom: 24,
    gap: 3,
  },
  toggleButton: {
    flex: 1,
  },
  plansContainer: {
    gap: 12,
  },
  planTouchable: {
    marginBottom: 6,
  },
    planCard: {
    padding: 16,
    borderRadius: 12,
    overflow: 'hidden',
    minHeight: 200,
    maxWidth: '95%',
    alignSelf: 'center',
  },
  selectedPlanCard: {
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#4A90E2',
  },
  cardContent: {
    position: 'relative',
    zIndex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 0,
  },
  planTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  period: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    marginLeft: 4,
  },
  getProBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4A90E2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  popularBadge: {
    backgroundColor: '#FF6B6B',
  },
  getProText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  upgradeButton: {
    width: '100%',
    marginBottom: 10,
  },
  featuresList: {
    gap: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkIcon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(74, 144, 226, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: {
    fontSize: 12,
    color: '#FFFFFF',
    flex: 1,
  },
  badgeContainer: {
    position: 'absolute',
    top: -8,
    right: -6,
    zIndex: 10,
  },
  animatedBadge: {
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
});

export default SubscriptionScreen;
