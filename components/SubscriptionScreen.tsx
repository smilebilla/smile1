import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Crown,
  Star,
  Check,
  X,
  Zap,
  Shield,
  Infinity,
  Calendar,
  Users,
  FileText,
  TrendingUp,
  Sparkles,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface SubscriptionScreenProps {
  onClose: () => void;
}

export default function SubscriptionScreen({ onClose }: SubscriptionScreenProps) {
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const sparkleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(sparkleAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(sparkleAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ),
    ]).start();
  }, []);

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: '₹299',
      period: '/month',
      icon: Star,
      color: ['#6b7280', '#9ca3af'],
      features: [
        'Daily Horoscope',
        'Basic Birth Chart',
        '5 Reports per month',
        'Email Support',
        'Basic Compatibility',
      ],
      popular: false,
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '₹599',
      period: '/month',
      icon: Crown,
      color: ['#7c3aed', '#a855f7'],
      features: [
        'Everything in Basic',
        'All Chart Systems (Lahiri, KP)',
        'Unlimited Reports',
        'AI Astro Ratan Chat',
        'Business Astrology',
        'Priority Support',
        'Advanced Compatibility',
        'Custom Predictions',
      ],
      popular: true,
    },
    {
      id: 'lifetime',
      name: 'Lifetime',
      price: '₹4,999',
      period: '/one-time',
      icon: Infinity,
      color: ['#ffd700', '#f59e0b'],
      features: [
        'Everything in Premium',
        'Lifetime Access',
        'Personal Astrologer',
        'Live Consultations',
        'Premium Reports',
        'Market Predictions',
        'VIP Support',
        'Early Access Features',
      ],
      popular: false,
    },
  ];

  const sparkleOpacity = sparkleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0f0c29', '#24243e', '#302b63']}
        style={styles.gradient}
      >
        {/* Animated Background Stars */}
        <Animated.View style={[styles.starsContainer, { opacity: sparkleOpacity }]}>
          <Sparkles size={20} color="#ffd700" style={[styles.star, styles.star1]} />
          <Star size={16} color="#8b5cf6" style={[styles.star, styles.star2]} />
          <Sparkles size={18} color="#c084fc" style={[styles.star, styles.star3]} />
          <Star size={14} color="#ffd700" style={[styles.star, styles.star4]} />
        </Animated.View>

        {/* Header */}
        <Animated.View
          style={[
            styles.header,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.title}>Choose Your Plan</Text>
          <View style={styles.placeholder} />
        </Animated.View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Current Plan Status */}
          <Animated.View
            style={[
              styles.currentPlanContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <LinearGradient
              colors={['#1e1b4b', '#312e81']}
              style={styles.currentPlanGradient}
            >
              <Crown size={24} color="#ffd700" />
              <Text style={styles.currentPlanText}>Current Plan: Premium</Text>
              <Text style={styles.currentPlanExpiry}>Expires: Dec 31, 2024</Text>
            </LinearGradient>
          </Animated.View>

          {/* Plans */}
          <View style={styles.plansContainer}>
            {plans.map((plan, index) => {
              const IconComponent = plan.icon;
              const isSelected = selectedPlan === plan.id;
              
              return (
                <Animated.View
                  key={plan.id}
                  style={[
                    styles.planCard,
                    isSelected && styles.selectedPlan,
                    {
                      opacity: fadeAnim,
                      transform: [{ 
                        translateY: Animated.multiply(slideAnim, index + 1),
                        scale: isSelected ? 1.05 : 1,
                      }],
                    },
                  ]}
                >
                  <TouchableOpacity onPress={() => setSelectedPlan(plan.id)}>
                    <LinearGradient
                      colors={isSelected ? plan.color : ['#1e1b4b', '#312e81']}
                      style={styles.planGradient}
                    >
                      {plan.popular && (
                        <View style={styles.popularBadge}>
                          <Text style={styles.popularText}>Most Popular</Text>
                        </View>
                      )}
                      
                      <View style={styles.planHeader}>
                        <IconComponent size={32} color="#ffd700" />
                        <Text style={styles.planName}>{plan.name}</Text>
                      </View>

                      <View style={styles.priceContainer}>
                        <Text style={styles.price}>{plan.price}</Text>
                        <Text style={styles.period}>{plan.period}</Text>
                      </View>

                      <View style={styles.featuresContainer}>
                        {plan.features.map((feature, featureIndex) => (
                          <View key={featureIndex} style={styles.featureItem}>
                            <Check size={16} color="#10b981" />
                            <Text style={styles.featureText}>{feature}</Text>
                          </View>
                        ))}
                      </View>

                      <TouchableOpacity style={styles.selectButton}>
                        <LinearGradient
                          colors={isSelected ? ['#10b981', '#059669'] : ['#374151', '#4b5563']}
                          style={styles.selectGradient}
                        >
                          <Text style={styles.selectText}>
                            {isSelected ? 'Selected' : 'Select Plan'}
                          </Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    </LinearGradient>
                  </TouchableOpacity>
                </Animated.View>
              );
            })}
          </View>

          {/* Features Comparison */}
          <Animated.View
            style={[
              styles.comparisonContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.sectionTitle}>Why Choose Premium?</Text>
            <LinearGradient
              colors={['#1e1b4b', '#312e81']}
              style={styles.comparisonGradient}
            >
              {[
                { icon: Zap, title: 'AI Powered Insights', desc: 'Get instant answers from Astro Ratan' },
                { icon: Shield, title: 'Accurate Predictions', desc: 'Professional-grade calculations' },
                { icon: TrendingUp, title: 'Business Astrology', desc: 'Market timing and analysis' },
                { icon: Users, title: 'Expert Support', desc: '24/7 priority assistance' },
              ].map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <View key={index} style={styles.comparisonItem}>
                    <IconComponent size={24} color="#ffd700" />
                    <View style={styles.comparisonContent}>
                      <Text style={styles.comparisonTitle}>{item.title}</Text>
                      <Text style={styles.comparisonDesc}>{item.desc}</Text>
                    </View>
                  </View>
                );
              })}
            </LinearGradient>
          </Animated.View>

          {/* Upgrade Button */}
          <Animated.View
            style={[
              styles.upgradeContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <TouchableOpacity style={styles.upgradeButton}>
              <LinearGradient
                colors={['#7c3aed', '#a855f7', '#c084fc']}
                style={styles.upgradeGradient}
              >
                <Crown size={24} color="#ffffff" />
                <Text style={styles.upgradeText}>Upgrade Now</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  starsContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  star: {
    position: 'absolute',
  },
  star1: {
    top: '20%',
    left: '10%',
  },
  star2: {
    top: '30%',
    right: '15%',
  },
  star3: {
    bottom: '40%',
    left: '20%',
  },
  star4: {
    bottom: '30%',
    right: '10%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  closeButton: {
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  currentPlanContainer: {
    marginBottom: 30,
    borderRadius: 15,
    overflow: 'hidden',
  },
  currentPlanGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  currentPlanText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 10,
    flex: 1,
  },
  currentPlanExpiry: {
    fontSize: 12,
    color: '#c4b5fd',
  },
  plansContainer: {
    marginBottom: 30,
  },
  planCard: {
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  selectedPlan: {
    borderWidth: 2,
    borderColor: '#ffd700',
  },
  planGradient: {
    padding: 25,
    position: 'relative',
  },
  popularBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#ffd700',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderBottomLeftRadius: 15,
  },
  popularText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000000',
  },
  planHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  planName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 10,
  },
  priceContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  price: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffd700',
  },
  period: {
    fontSize: 14,
    color: '#c4b5fd',
    marginTop: 5,
  },
  featuresContainer: {
    marginBottom: 25,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  featureText: {
    fontSize: 14,
    color: '#ffffff',
    marginLeft: 10,
  },
  selectButton: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  selectGradient: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  selectText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  comparisonContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  comparisonGradient: {
    padding: 20,
    borderRadius: 15,
  },
  comparisonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  comparisonContent: {
    marginLeft: 15,
    flex: 1,
  },
  comparisonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  comparisonDesc: {
    fontSize: 14,
    color: '#c4b5fd',
    marginTop: 2,
  },
  upgradeContainer: {
    marginBottom: 30,
  },
  upgradeButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  upgradeGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  upgradeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 10,
  },
});