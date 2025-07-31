import React, { useRef, useEffect, useState } from 'react';
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
  Menu,
  Bell,
  Star,
  Calendar,
  Users,
  TrendingUp,
  Zap,
  Moon,
  Sun,
  Sparkles,
  Sunrise,
  Sunset,
  MoonIcon,
  FileText,
  Bot,
  BarChart3,
  Building2,
  Clock,
  Activity,
  Target,
  Compass,
  ChevronRight,
} from 'lucide-react-native';
import HamburgerMenu from '@/components/HamburgerMenu';
import ProfileScreen from '@/components/ProfileScreen';
import HoroscopeScreen from '@/components/HoroscopeScreen';
import NumerologyScreen from '@/components/NumerologyScreen';
import SubscriptionScreen from '@/components/SubscriptionScreen';
import PaymentHistoryScreen from '@/components/PaymentHistoryScreen';
import SettingsScreen from '@/components/SettingsScreen';
import NotificationsScreen from '@/components/NotificationsScreen';
import PanchangScreen from '@/components/PanchangScreen';
import AstroLearningScreen from '@/components/AstroLearningScreen';
import MarketAnalysisScreen from '@/components/MarketAnalysisScreen';
import CustomReportsScreen from '@/components/CustomReportsScreen';
import ConsultationScreen from '@/components/ConsultationScreen';
import ContactUsScreen from '@/components/ContactUsScreen';
import FeedbackScreen from '@/components/FeedbackScreen';
import HelpFAQScreen from '@/components/HelpFAQScreen';
import PrivacyPolicyScreen from '@/components/PrivacyPolicyScreen';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [showMenu, setShowMenu] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<string | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const sparkleAnim = useRef(new Animated.Value(0)).current;
  const planetAnim = useRef(new Animated.Value(0)).current;
  const starAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(sparkleAnim, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(sparkleAnim, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
          }),
        ])
      ),
      Animated.loop(
        Animated.timing(planetAnim, {
          toValue: 1,
          duration: 8000,
          useNativeDriver: true,
        })
      ),
      Animated.loop(
        Animated.timing(starAnim, {
          toValue: 1,
          duration: 5000,
          useNativeDriver: true,
        })
      ),
    ]).start();
  }, []);

  const horoscopeData = {
    yesterday: { rating: 4.2, summary: 'A day of reflection and inner growth' },
    today: { rating: 4.5, summary: 'Excellent opportunities for new beginnings' },
    tomorrow: { rating: 4.8, summary: 'Success in professional endeavors awaits' },
  };

  const celestialData = {
    sunrise: '06:24 AM',
    sunset: '06:18 PM',
    moonrise: '08:45 PM',
    moonset: '07:30 AM',
    moonPhase: 'Waxing Crescent',
    lunarDay: 'Tritiya',
  };

  const handleMenuNavigation = (screen: string) => {
    setCurrentScreen(screen);
  };

  const handleCloseScreen = () => {
    setCurrentScreen(null);
  };

  // Render current screen
  if (currentScreen === 'profile') {
    return <ProfileScreen onClose={handleCloseScreen} />;
  }
  if (currentScreen === 'horoscope') {
    return <HoroscopeScreen onClose={handleCloseScreen} />;
  }
  if (currentScreen === 'numerology') {
    return <NumerologyScreen onClose={handleCloseScreen} />;
  }
  if (currentScreen === 'subscription') {
    return <SubscriptionScreen onClose={handleCloseScreen} />;
  }
  if (currentScreen === 'payment-history') {
    return <PaymentHistoryScreen onClose={handleCloseScreen} />;
  }
  if (currentScreen === 'settings') {
    return <SettingsScreen onClose={handleCloseScreen} />;
  }
  if (currentScreen === 'notifications') {
    return <NotificationsScreen onClose={handleCloseScreen} />;
  }
  if (currentScreen === 'panchang') {
    return <PanchangScreen onClose={handleCloseScreen} />;
  }
  if (currentScreen === 'astro-learning') {
    return <AstroLearningScreen onClose={handleCloseScreen} />;
  }
  if (currentScreen === 'market-analysis') {
    return <MarketAnalysisScreen onClose={handleCloseScreen} />;
  }
  if (currentScreen === 'custom-reports') {
    return <CustomReportsScreen onClose={handleCloseScreen} />;
  }
  if (currentScreen === 'consultation') {
    return <ConsultationScreen onClose={handleCloseScreen} />;
  }
  if (currentScreen === 'contact-us') {
    return <ContactUsScreen onClose={handleCloseScreen} />;
  }
  if (currentScreen === 'feedback') {
    return <FeedbackScreen onClose={handleCloseScreen} />;
  }
  if (currentScreen === 'help-faq') {
    return <HelpFAQScreen onClose={handleCloseScreen} />;
  }
  if (currentScreen === 'privacy-policy') {
    return <PrivacyPolicyScreen onClose={handleCloseScreen} />;
  }

  const sparkleOpacity = sparkleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });

  const planetRotation = planetAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const starTwinkle = starAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.4, 1, 0.4],
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0a0a0f', '#1a1625', '#2d1b69', '#1a1625']}
        style={styles.gradient}
      >
        {/* Animated Background Elements */}
        <Animated.View style={[styles.starsContainer, { opacity: starTwinkle }]}>
          <Sparkles size={16} color="#ffd700" style={[styles.star, styles.star1]} />
          <Star size={14} color="#8b5cf6" style={[styles.star, styles.star2]} />
          <Moon size={18} color="#c084fc" style={[styles.star, styles.star3]} />
          <Star size={12} color="#ffd700" style={[styles.star, styles.star4]} />
          <Sparkles size={20} color="#a855f7" style={[styles.star, styles.star5]} />
        </Animated.View>

        <Animated.View style={[styles.planetsContainer, { transform: [{ rotate: planetRotation }] }]}>
          <Sun size={24} color="#fbbf24" style={[styles.planet, styles.sun]} />
          <Moon size={20} color="#e5e7eb" style={[styles.planet, styles.moon]} />
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
          <TouchableOpacity style={styles.menuButton} onPress={() => setShowMenu(true)}>
            <LinearGradient colors={['#7c3aed', '#a855f7']} style={styles.iconGradient}>
              <Menu size={24} color="#ffffff" />
            </LinearGradient>
          </TouchableOpacity>
          <View style={styles.headerTitle}>
            <Text style={styles.title}>CorpAstro</Text>
            <Text style={styles.subtitle}>Professional Astrology</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton} onPress={() => handleMenuNavigation('notifications')}>
            <LinearGradient colors={['#ef4444', '#dc2626']} style={styles.iconGradient}>
              <Bell size={24} color="#ffffff" />
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Welcome Section */}
          <Animated.View
            style={[
              styles.welcomeSection,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <LinearGradient
              colors={['#1e1b4b', '#312e81', '#4c1d95']}
              style={styles.welcomeCard}
            >
              <View style={styles.welcomeContent}>
                <Animated.View style={{ opacity: sparkleOpacity }}>
                  <Sparkles size={32} color="#ffd700" />
                </Animated.View>
                <Text style={styles.welcomeText}>Welcome back, Seeker</Text>
                <Text style={styles.welcomeSubtext}>
                  Your cosmic journey continues today
                </Text>
                <Text style={styles.liveIndicator}>🔴 LIVE</Text>
              </View>
            </LinearGradient>
          </Animated.View>

          {/* Celestial Timings */}
          <Animated.View
            style={[
              styles.section,
              {
                opacity: fadeAnim,
                transform: [{ translateY: Animated.multiply(slideAnim, 1.2) }],
              },
            ]}
          >
            <Text style={styles.sectionTitle}>Celestial Timings</Text>
            <View style={styles.celestialGrid}>
              <LinearGradient colors={['#f59e0b', '#d97706']} style={styles.celestialCard}>
                <Sunrise size={24} color="#ffffff" />
                <Text style={styles.celestialLabel}>Sunrise</Text>
                <Text style={styles.celestialTime}>{celestialData.sunrise}</Text>
              </LinearGradient>
              <LinearGradient colors={['#ef4444', '#dc2626']} style={styles.celestialCard}>
                <Sunset size={24} color="#ffffff" />
                <Text style={styles.celestialLabel}>Sunset</Text>
                <Text style={styles.celestialTime}>{celestialData.sunset}</Text>
              </LinearGradient>
              <LinearGradient colors={['#8b5cf6', '#7c3aed']} style={styles.celestialCard}>
                <MoonIcon size={24} color="#ffffff" />
                <Text style={styles.celestialLabel}>Moonrise</Text>
                <Text style={styles.celestialTime}>{celestialData.moonrise}</Text>
              </LinearGradient>
              <LinearGradient colors={['#6366f1', '#4f46e5']} style={styles.celestialCard}>
                <Moon size={24} color="#ffffff" />
                <Text style={styles.celestialLabel}>Moonset</Text>
                <Text style={styles.celestialTime}>{celestialData.moonset}</Text>
              </LinearGradient>
            </View>
          </Animated.View>

          {/* Horoscope Timeline */}
          <Animated.View
            style={[
              styles.section,
              {
                opacity: fadeAnim,
                transform: [{ translateY: Animated.multiply(slideAnim, 1.4) }],
              },
            ]}
          >
            <Text style={styles.sectionTitle}>Horoscope Timeline</Text>
            <View style={styles.horoscopeTimeline}>
              {Object.entries(horoscopeData).map(([period, data], index) => (
                <TouchableOpacity key={period} style={styles.timelineCard}>
                  <LinearGradient
                    colors={
                      period === 'today'
                        ? ['#10b981', '#059669']
                        : period === 'tomorrow'
                        ? ['#3b82f6', '#2563eb']
                        : ['#6b7280', '#4b5563']
                    }
                    style={styles.timelineGradient}
                  >
                    <Text style={styles.timelinePeriod}>{period.toUpperCase()}</Text>
                    <View style={styles.ratingContainer}>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          color={i < Math.floor(data.rating) ? '#ffd700' : '#6b7280'}
                          fill={i < Math.floor(data.rating) ? '#ffd700' : 'transparent'}
                        />
                      ))}
                      <Text style={styles.ratingText}>{data.rating}</Text>
                    </View>
                    <Text style={styles.timelineSummary}>{data.summary}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>

          {/* Charts Section */}
          <Animated.View
            style={[
              styles.section,
              {
                opacity: fadeAnim,
                transform: [{ translateY: Animated.multiply(slideAnim, 1.6) }],
              },
            ]}
          >
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Astrology Charts</Text>
              <TouchableOpacity onPress={() => handleMenuNavigation('charts')}>
                <ChevronRight size={20} color="#8b5cf6" />
              </TouchableOpacity>
            </View>
            <View style={styles.chartsGrid}>
              <TouchableOpacity style={styles.chartCard}>
                <LinearGradient colors={['#7c3aed', '#a855f7']} style={styles.chartGradient}>
                  <Compass size={24} color="#ffffff" />
                  <Text style={styles.chartName}>Birth Chart</Text>
                  <Text style={styles.chartSubtext}>Lahiri System</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity style={styles.chartCard}>
                <LinearGradient colors={['#059669', '#10b981']} style={styles.chartGradient}>
                  <Target size={24} color="#ffffff" />
                  <Text style={styles.chartName}>KP Chart</Text>
                  <Text style={styles.chartSubtext}>Cuspal System</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity style={styles.chartCard}>
                <LinearGradient colors={['#dc2626', '#ef4444']} style={styles.chartGradient}>
                  <Star size={24} color="#ffffff" />
                  <Text style={styles.chartName}>Navamsha</Text>
                  <Text style={styles.chartSubtext}>D-9 Chart</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity style={styles.chartCard}>
                <LinearGradient colors={['#d97706', '#f59e0b']} style={styles.chartGradient}>
                  <Activity size={24} color="#ffffff" />
                  <Text style={styles.chartName}>Dashamsha</Text>
                  <Text style={styles.chartSubtext}>D-10 Career</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* Reports Section */}
          <Animated.View
            style={[
              styles.section,
              {
                opacity: fadeAnim,
                transform: [{ translateY: Animated.multiply(slideAnim, 1.8) }],
              },
            ]}
          >
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Astrology Reports</Text>
              <TouchableOpacity onPress={() => handleMenuNavigation('custom-reports')}>
                <ChevronRight size={20} color="#8b5cf6" />
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {[
                { name: 'Health Analysis', icon: Activity, color: ['#ef4444', '#dc2626'], price: '₹299' },
                { name: 'Career Report', icon: TrendingUp, color: ['#10b981', '#059669'], price: '₹399' },
                { name: 'Marriage Report', icon: Users, color: ['#8b5cf6', '#7c3aed'], price: '₹499' },
                { name: 'Wealth Analysis', icon: Target, color: ['#f59e0b', '#d97706'], price: '₹599' },
              ].map((report, index) => {
                const IconComponent = report.icon;
                return (
                  <TouchableOpacity key={index} style={styles.reportCard}>
                    <LinearGradient colors={report.color} style={styles.reportGradient}>
                      <IconComponent size={28} color="#ffffff" />
                      <Text style={styles.reportName}>{report.name}</Text>
                      <Text style={styles.reportPrice}>{report.price}</Text>
                      <View style={styles.reportBadge}>
                        <Text style={styles.reportBadgeText}>POPULAR</Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </Animated.View>

          {/* Astro Ratan AI Section */}
          <Animated.View
            style={[
              styles.section,
              {
                opacity: fadeAnim,
                transform: [{ translateY: Animated.multiply(slideAnim, 2.0) }],
              },
            ]}
          >
            <TouchableOpacity onPress={() => handleMenuNavigation('astro-ratan')}>
              <LinearGradient colors={['#1e1b4b', '#312e81']} style={styles.aiSection}>
                <View style={styles.aiHeader}>
                  <Bot size={32} color="#ffd700" />
                  <View style={styles.aiInfo}>
                    <Text style={styles.aiTitle}>Astro Ratan AI</Text>
                    <Text style={styles.aiSubtitle}>Your Personal AI Astrologer</Text>
                    <View style={styles.liveStatus}>
                      <View style={styles.liveDot} />
                      <Text style={styles.liveText}>Online Now</Text>
                    </View>
                  </View>
                  <ChevronRight size={24} color="#8b5cf6" />
                </View>
                <Text style={styles.aiDescription}>
                  Get instant answers to your astrological questions with our advanced AI guide
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>

          {/* Business Astrology Section */}
          <Animated.View
            style={[
              styles.section,
              {
                opacity: fadeAnim,
                transform: [{ translateY: Animated.multiply(slideAnim, 2.2) }],
              },
            ]}
          >
            <Text style={styles.sectionTitle}>Business Astrology</Text>
            <View style={styles.businessGrid}>
              <TouchableOpacity style={styles.businessCard} onPress={() => handleMenuNavigation('market-analysis')}>
                <LinearGradient colors={['#059669', '#10b981']} style={styles.businessGradient}>
                  <TrendingUp size={24} color="#ffffff" />
                  <Text style={styles.businessTitle}>Market Analysis</Text>
                  <Text style={styles.businessSubtext}>Live market predictions</Text>
                  <View style={styles.businessIndicator}>
                    <Text style={styles.businessStatus}>BULLISH</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity style={styles.businessCard}>
                <LinearGradient colors={['#7c3aed', '#a855f7']} style={styles.businessGradient}>
                  <Building2 size={24} color="#ffffff" />
                  <Text style={styles.businessTitle}>Corporate Reports</Text>
                  <Text style={styles.businessSubtext}>Business timing analysis</Text>
                  <View style={styles.businessIndicator}>
                    <Text style={styles.businessStatus}>ACTIVE</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity style={styles.businessCard}>
                <LinearGradient colors={['#dc2626', '#ef4444']} style={styles.businessGradient}>
                  <BarChart3 size={24} color="#ffffff" />
                  <Text style={styles.businessTitle}>Investment Timing</Text>
                  <Text style={styles.businessSubtext}>Planetary influences</Text>
                  <View style={styles.businessIndicator}>
                    <Text style={styles.businessStatus}>FAVORABLE</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity style={styles.businessCard}>
                <LinearGradient colors={['#d97706', '#f59e0b']} style={styles.businessGradient}>
                  <Users size={24} color="#ffffff" />
                  <Text style={styles.businessTitle}>Partnership</Text>
                  <Text style={styles.businessSubtext}>Business compatibility</Text>
                  <View style={styles.businessIndicator}>
                    <Text style={styles.businessStatus}>GOOD</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* Today's Cosmic Energy */}
          <Animated.View
            style={[
              styles.section,
              {
                opacity: fadeAnim,
                transform: [{ translateY: Animated.multiply(slideAnim, 2.4) }],
              },
            ]}
          >
            <Text style={styles.sectionTitle}>Today's Cosmic Energy</Text>
            <LinearGradient colors={['#1e1b4b', '#312e81']} style={styles.energyCard}>
              <View style={styles.energyHeader}>
                <Animated.View style={{ transform: [{ rotate: planetRotation }] }}>
                  <Sun size={28} color="#ffd700" />
                </Animated.View>
                <Text style={styles.energyTitle}>High Vibrational Day</Text>
              </View>
              <Text style={styles.energyDescription}>
                The planetary alignments favor new beginnings and creative ventures. Mercury in conjunction with Venus brings harmony to communication.
              </Text>
              <View style={styles.energyMeter}>
                <Text style={styles.energyLabel}>Energy Level</Text>
                <View style={styles.progressBar}>
                  <Animated.View style={[styles.progress, { width: '85%' }]} />
                </View>
                <Text style={styles.energyPercentage}>85%</Text>
              </View>
            </LinearGradient>
          </Animated.View>

          {/* Recent Activity */}
          <Animated.View
            style={[
              styles.section,
              {
                opacity: fadeAnim,
                transform: [{ translateY: Animated.multiply(slideAnim, 2.6) }],
              },
            ]}
          >
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <View style={styles.activityList}>
              <View style={styles.activityItem}>
                <LinearGradient colors={['#8b5cf6', '#7c3aed']} style={styles.activityIcon}>
                  <Moon size={16} color="#ffffff" />
                </LinearGradient>
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>Birth Chart Generated</Text>
                  <Text style={styles.activityTime}>2 hours ago</Text>
                </View>
                <View style={styles.activityStatus}>
                  <Text style={styles.statusText}>COMPLETED</Text>
                </View>
              </View>
              <View style={styles.activityItem}>
                <LinearGradient colors={['#ffd700', '#f59e0b']} style={styles.activityIcon}>
                  <Zap size={16} color="#ffffff" />
                </LinearGradient>
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>KP Chart Analysis Complete</Text>
                  <Text style={styles.activityTime}>1 day ago</Text>
                </View>
                <View style={styles.activityStatus}>
                  <Text style={styles.statusText}>READY</Text>
                </View>
              </View>
              <View style={styles.activityItem}>
                <LinearGradient colors={['#10b981', '#059669']} style={styles.activityIcon}>
                  <TrendingUp size={16} color="#ffffff" />
                </LinearGradient>
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>Business Report Downloaded</Text>
                  <Text style={styles.activityTime}>3 days ago</Text>
                </View>
                <View style={styles.activityStatus}>
                  <Text style={styles.statusText}>DOWNLOADED</Text>
                </View>
              </View>
            </View>
          </Animated.View>
        </ScrollView>
      </LinearGradient>

      {/* Hamburger Menu */}
      <HamburgerMenu
        isVisible={showMenu}
        onClose={() => setShowMenu(false)}
        onNavigate={handleMenuNavigation}
      />
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
  planetsContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  star: {
    position: 'absolute',
  },
  star1: {
    top: '15%',
    left: '10%',
  },
  star2: {
    top: '25%',
    right: '15%',
  },
  star3: {
    bottom: '40%',
    left: '20%',
  },
  star4: {
    bottom: '30%',
    right: '25%',
  },
  star5: {
    top: '35%',
    left: '50%',
  },
  planet: {
    position: 'absolute',
  },
  sun: {
    top: '20%',
    right: '10%',
  },
  moon: {
    bottom: '35%',
    left: '15%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  menuButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  notificationButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  iconGradient: {
    padding: 12,
  },
  headerTitle: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffd700',
  },
  subtitle: {
    fontSize: 12,
    color: '#c4b5fd',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  welcomeSection: {
    marginBottom: 30,
  },
  welcomeCard: {
    borderRadius: 20,
    padding: 25,
  },
  welcomeContent: {
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 10,
  },
  welcomeSubtext: {
    fontSize: 14,
    color: '#e0e7ff',
    marginTop: 5,
  },
  liveIndicator: {
    fontSize: 12,
    color: '#ef4444',
    fontWeight: 'bold',
    marginTop: 10,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  celestialGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  celestialCard: {
    width: (width - 50) / 2,
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  celestialLabel: {
    color: '#ffffff',
    fontSize: 12,
    marginTop: 8,
    fontWeight: '600',
  },
  celestialTime: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
  horoscopeTimeline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timelineCard: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 15,
    overflow: 'hidden',
  },
  timelineGradient: {
    padding: 15,
    alignItems: 'center',
  },
  timelinePeriod: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    color: '#ffffff',
    fontSize: 12,
    marginLeft: 5,
    fontWeight: '600',
  },
  timelineSummary: {
    color: '#ffffff',
    fontSize: 10,
    textAlign: 'center',
    lineHeight: 14,
  },
  chartsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  chartCard: {
    width: (width - 50) / 2,
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
  },
  chartGradient: {
    padding: 20,
    alignItems: 'center',
    minHeight: 100,
    justifyContent: 'center',
  },
  chartName: {
    color: '#ffffff',
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
  },
  chartSubtext: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
  reportCard: {
    width: 150,
    marginRight: 15,
    borderRadius: 15,
    overflow: 'hidden',
  },
  reportGradient: {
    padding: 20,
    alignItems: 'center',
    minHeight: 120,
    justifyContent: 'center',
    position: 'relative',
  },
  reportName: {
    color: '#ffffff',
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
    fontSize: 14,
  },
  reportPrice: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  reportBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  reportBadgeText: {
    color: '#ffffff',
    fontSize: 8,
    fontWeight: 'bold',
  },
  aiSection: {
    borderRadius: 20,
    padding: 20,
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  aiInfo: {
    flex: 1,
    marginLeft: 15,
  },
  aiTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  aiSubtitle: {
    fontSize: 12,
    color: '#c4b5fd',
    marginTop: 2,
  },
  liveStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10b981',
    marginRight: 5,
  },
  liveText: {
    fontSize: 10,
    color: '#10b981',
    fontWeight: '600',
  },
  aiDescription: {
    color: '#e0e7ff',
    lineHeight: 20,
  },
  businessGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  businessCard: {
    width: (width - 50) / 2,
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
  },
  businessGradient: {
    padding: 20,
    alignItems: 'center',
    minHeight: 120,
    justifyContent: 'center',
    position: 'relative',
  },
  businessTitle: {
    color: '#ffffff',
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
    fontSize: 14,
  },
  businessSubtext: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
  businessIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  businessStatus: {
    color: '#ffffff',
    fontSize: 8,
    fontWeight: 'bold',
  },
  energyCard: {
    borderRadius: 20,
    padding: 25,
  },
  energyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  energyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 10,
  },
  energyDescription: {
    color: '#e0e7ff',
    lineHeight: 22,
    marginBottom: 20,
  },
  energyMeter: {
    alignItems: 'center',
  },
  energyLabel: {
    color: '#c4b5fd',
    marginBottom: 8,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#374151',
    borderRadius: 4,
    marginBottom: 8,
  },
  progress: {
    height: '100%',
    backgroundColor: '#ffd700',
    borderRadius: 4,
  },
  energyPercentage: {
    color: '#ffd700',
    fontWeight: 'bold',
  },
  activityList: {
    backgroundColor: '#1e1b4b',
    borderRadius: 15,
    padding: 20,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    color: '#ffffff',
    fontWeight: '600',
  },
  activityTime: {
    color: '#9ca3af',
    fontSize: 12,
    marginTop: 2,
  },
  activityStatus: {
    backgroundColor: '#374151',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    color: '#10b981',
    fontSize: 10,
    fontWeight: 'bold',
  },
});