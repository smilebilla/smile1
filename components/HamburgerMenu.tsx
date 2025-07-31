import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { User, Settings, CreditCard, Bell, CircleHelp as HelpCircle, Star, Calendar, FileText, TrendingUp, Users, Shield, LogOut, X, Crown, Calculator, BookOpen, Phone, Mail } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

interface HamburgerMenuProps {
  isVisible: boolean;
  onClose: () => void;
  onNavigate: (screen: string) => void;
}

export default function HamburgerMenu({ isVisible, onClose, onNavigate }: HamburgerMenuProps) {
  const slideAnim = useRef(new Animated.Value(-width)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -width,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isVisible]);

  const menuSections = [
    {
      title: 'Profile & Account',
      items: [
        { icon: User, label: 'My Profile', screen: 'profile', color: '#7c3aed' },
        { icon: Crown, label: 'Subscription', screen: 'subscription', color: '#ffd700' },
        { icon: CreditCard, label: 'Payment History', screen: 'payments', color: '#10b981' },
        { icon: Settings, label: 'Settings', screen: 'settings', color: '#6b7280' },
      ],
    },
    {
      title: 'Astrology Services',
      items: [
        { icon: Star, label: 'Daily Horoscope', screen: 'horoscope', color: '#f59e0b' },
        { icon: Calculator, label: 'Numerology', screen: 'numerology', color: '#8b5cf6' },
        { icon: Calendar, label: 'Panchang', screen: 'panchang', color: '#ef4444' },
        { icon: BookOpen, label: 'Astro Learning', screen: 'learning', color: '#06b6d4' },
      ],
    },
    {
      title: 'Business & Reports',
      items: [
        { icon: TrendingUp, label: 'Market Analysis', screen: 'market-analysis', color: '#059669' },
        { icon: FileText, label: 'Custom Reports', screen: 'custom-reports', color: '#dc2626' },
        { icon: Users, label: 'Consultation', screen: 'consultation', color: '#7c2d12' },
      ],
    },
    {
      title: 'Support & Help',
      items: [
        { icon: Bell, label: 'Notifications', screen: 'notifications', color: '#f59e0b' },
        { icon: HelpCircle, label: 'Help & FAQ', screen: 'help', color: '#6366f1' },
        { icon: Phone, label: 'Contact Us', screen: 'contact', color: '#10b981' },
        { icon: Mail, label: 'Feedback', screen: 'feedback', color: '#8b5cf6' },
        { icon: Shield, label: 'Privacy Policy', screen: 'privacy', color: '#6b7280' },
      ],
    },
  ];

  const handleItemPress = (screen: string) => {
    onNavigate(screen);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <View style={styles.overlay}>
      <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]}>
        <TouchableOpacity style={styles.backdropTouch} onPress={onClose} />
      </Animated.View>
      
      <Animated.View style={[styles.menu, { transform: [{ translateX: slideAnim }] }]}>
        <LinearGradient
          colors={['#1a1625', '#2d1b69', '#4c1d95']}
          style={styles.menuGradient}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <View style={styles.userAvatar}>
                <LinearGradient
                  colors={['#7c3aed', '#a855f7']}
                  style={styles.avatarGradient}
                >
                  <User size={24} color="#ffffff" />
                </LinearGradient>
              </View>
              <View style={styles.userInfo}>
                <Text style={styles.userName}>Rajesh Kumar</Text>
                <Text style={styles.userEmail}>rajesh@example.com</Text>
                <View style={styles.premiumBadge}>
                  <Crown size={12} color="#ffd700" />
                  <Text style={styles.premiumText}>Premium Member</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <X size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {menuSections.map((section, sectionIndex) => (
              <View key={sectionIndex} style={styles.section}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                {section.items.map((item, itemIndex) => {
                  const IconComponent = item.icon;
                  return (
                    <TouchableOpacity
                      key={itemIndex}
                      style={styles.menuItem}
                      onPress={() => handleItemPress(item.screen)}
                    >
                      <View style={[styles.iconContainer, { backgroundColor: `${item.color}20` }]}>
                        <IconComponent size={20} color={item.color} />
                      </View>
                      <Text style={styles.menuItemText}>{item.label}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}

            {/* Logout */}
            <TouchableOpacity style={styles.logoutButton} onPress={() => handleItemPress('logout')}>
              <LinearGradient
                colors={['#dc2626', '#ef4444']}
                style={styles.logoutGradient}
              >
                <LogOut size={20} color="#ffffff" />
                <Text style={styles.logoutText}>Logout</Text>
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>
        </LinearGradient>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backdropTouch: {
    flex: 1,
  },
  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: width * 0.85,
    maxWidth: 320,
  },
  menuGradient: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  userAvatar: {
    borderRadius: 25,
    overflow: 'hidden',
    marginRight: 15,
  },
  avatarGradient: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  userEmail: {
    fontSize: 12,
    color: '#c4b5fd',
    marginTop: 2,
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  premiumText: {
    fontSize: 10,
    color: '#ffd700',
    marginLeft: 4,
    fontWeight: '600',
  },
  closeButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#8b5cf6',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 5,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  menuItemText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
  },
  logoutButton: {
    margin: 20,
    borderRadius: 15,
    overflow: 'hidden',
  },
  logoutGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  logoutText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});