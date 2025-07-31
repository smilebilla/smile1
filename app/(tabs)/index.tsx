import React, { useRef, useEffect } from 'react';
import { useState } from 'react';
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
} from 'lucide-react-native';
import HamburgerMenu from '@/components/HamburgerMenu';
import ProfileScreen from '@/components/ProfileScreen';
import HoroscopeScreen from '@/components/HoroscopeScreen';
import NumerologyScreen from '@/components/NumerologyScreen';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [showMenu, setShowMenu] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<string | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

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
    ]).start();
  }, []);

  const horoscopeData = [
    { sign: 'Aries', today: 'Excellent', rating: 4.5 },
    { sign: 'Taurus', today: 'Good', rating: 4.0 },
    { sign: 'Gemini', today: 'Average', rating: 3.5 },
    { sign: 'Cancer', today: 'Excellent', rating: 4.8 },
  ];

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

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1a1625', '#2d1b69', '#4c1d95']}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.menuButton} onPress={() => setShowMenu(true)}>
            <Menu size={24} color="#ffd700" />
          </TouchableOpacity>
          <View style={styles.headerTitle}>
            <Text style={styles.title}>CorpAstro</Text>
            <Text style={styles.subtitle}>Professional Astrology</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Bell size={24} color="#ffd700" />
          </TouchableOpacity>
        </View>

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
              colors={['#4c1d95', '#7c3aed', '#a855f7']}
              style={styles.welcomeCard}
            >
              <View style={styles.welcomeContent}>
                <Sparkles size={32} color="#ffd700" />
                <Text style={styles.welcomeText}>Welcome back, Seeker</Text>
                <Text style={styles.welcomeSubtext}>
                  Your cosmic journey continues today
                </Text>
              </View>
            </LinearGradient>
          </Animated.View>

          {/* Quick Actions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.actionGrid}>
              <TouchableOpacity style={styles.actionCard}>
                <LinearGradient
                  colors={['#581c87', '#7c2d12']}
                  style={styles.actionGradient}
                >
                  <Star size={24} color="#ffd700" />
                  <Text style={styles.actionText}>Daily Horoscope</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionCard}>
                <LinearGradient
                  colors={['#1e3a8a', '#1e40af']}
                  style={styles.actionGradient}
                >
                  <Calendar size={24} color="#ffd700" />
                  <Text style={styles.actionText}>Birth Chart</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionCard}>
                <LinearGradient
                  colors={['#065f46', '#047857']}
                  style={styles.actionGradient}
                >
                  <Users size={24} color="#ffd700" />
                  <Text style={styles.actionText}>Compatibility</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionCard}>
                <LinearGradient
                  colors={['#7c2d12', '#dc2626']}
                  style={styles.actionGradient}
                >
                  <TrendingUp size={24} color="#ffd700" />
                  <Text style={styles.actionText}>Business Astro</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

          {/* Today's Cosmic Energy */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Today's Cosmic Energy</Text>
            <LinearGradient
              colors={['#1e1b4b', '#312e81']}
              style={styles.energyCard}
            >
              <View style={styles.energyHeader}>
                <Sun size={28} color="#ffd700" />
                <Text style={styles.energyTitle}>High Vibrational Day</Text>
              </View>
              <Text style={styles.energyDescription}>
                The planetary alignments favor new beginnings and creative ventures. Mercury in conjunction with Venus brings harmony to communication.
              </Text>
              <View style={styles.energyMeter}>
                <Text style={styles.energyLabel}>Energy Level</Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progress, { width: '85%' }]} />
                </View>
                <Text style={styles.energyPercentage}>85%</Text>
              </View>
            </LinearGradient>
          </View>

          {/* Daily Horoscope Preview */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Daily Horoscope</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {horoscopeData.map((item, index) => (
                <TouchableOpacity key={index} style={styles.horoscopeCard}>
                  <LinearGradient
                    colors={['#374151', '#4b5563']}
                    style={styles.horoscopeGradient}
                  >
                    <Text style={styles.zodiacSign}>{item.sign}</Text>
                    <Text style={styles.horoscopeStatus}>{item.today}</Text>
                    <View style={styles.ratingContainer}>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          color={i < Math.floor(item.rating) ? '#ffd700' : '#6b7280'}
                          fill={i < Math.floor(item.rating) ? '#ffd700' : 'transparent'}
                        />
                      ))}
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Recent Activity */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <View style={styles.activityList}>
              <View style={styles.activityItem}>
                <Moon size={20} color="#8b5cf6" />
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>Birth Chart Generated</Text>
                  <Text style={styles.activityTime}>2 hours ago</Text>
                </View>
              </View>
              <View style={styles.activityItem}>
                <Zap size={20} color="#ffd700" />
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>KP Chart Analysis Complete</Text>
                  <Text style={styles.activityTime}>1 day ago</Text>
                </View>
              </View>
              <View style={styles.activityItem}>
                <TrendingUp size={20} color="#10b981" />
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>Business Report Downloaded</Text>
                  <Text style={styles.activityTime}>3 days ago</Text>
                </View>
              </View>
            </View>
          </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  menuButton: {
    padding: 8,
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
  notificationButton: {
    padding: 8,
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
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: (width - 50) / 2,
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
  },
  actionGradient: {
    padding: 20,
    alignItems: 'center',
    minHeight: 100,
    justifyContent: 'center',
  },
  actionText: {
    color: '#ffffff',
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
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
  horoscopeCard: {
    marginRight: 15,
    borderRadius: 15,
    overflow: 'hidden',
  },
  horoscopeGradient: {
    padding: 20,
    width: 140,
    alignItems: 'center',
  },
  zodiacSign: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  horoscopeStatus: {
    fontSize: 12,
    color: '#d1d5db',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
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
  activityContent: {
    marginLeft: 15,
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
});