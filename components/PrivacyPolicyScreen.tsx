import React, { useRef, useEffect } from 'react';
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
  Shield,
  Lock,
  Eye,
  Database,
  Users,
  FileText,
  X,
  Sparkles,
  Star,
  Moon,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface PrivacyPolicyScreenProps {
  onClose: () => void;
}

export default function PrivacyPolicyScreen({ onClose }: PrivacyPolicyScreenProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
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
    ]).start();
  }, []);

  const privacySections = [
    {
      icon: Database,
      title: 'Information We Collect',
      content: 'We collect information you provide directly to us, such as your birth details, contact information, and preferences. We also collect usage data to improve our services.',
    },
    {
      icon: Eye,
      title: 'How We Use Your Information',
      content: 'Your information is used to provide personalized astrological services, generate reports, and improve our app functionality. We never use your data for unauthorized purposes.',
    },
    {
      icon: Shield,
      title: 'Data Security',
      content: 'We implement industry-standard security measures including encryption, secure servers, and regular security audits to protect your personal information.',
    },
    {
      icon: Users,
      title: 'Information Sharing',
      content: 'We do not sell, trade, or share your personal information with third parties except as described in this policy or with your explicit consent.',
    },
    {
      icon: Lock,
      title: 'Data Retention',
      content: 'We retain your information only as long as necessary to provide our services or as required by law. You can request deletion of your data at any time.',
    },
    {
      icon: FileText,
      title: 'Your Rights',
      content: 'You have the right to access, update, or delete your personal information. You can also opt-out of certain communications and data processing activities.',
    },
  ];

  const sparkleOpacity = sparkleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0a0a0f', '#1a1625', '#2d1b69']}
        style={styles.gradient}
      >
        {/* Animated Background */}
        <Animated.View style={[styles.starsContainer, { opacity: sparkleOpacity }]}>
          <Sparkles size={16} color="#ffd700" style={[styles.star, styles.star1]} />
          <Star size={14} color="#8b5cf6" style={[styles.star, styles.star2]} />
          <Moon size={18} color="#c084fc" style={[styles.star, styles.star3]} />
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
          <Text style={styles.title}>Privacy Policy</Text>
          <View style={styles.placeholder} />
        </Animated.View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Introduction */}
          <Animated.View
            style={[
              styles.introSection,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <LinearGradient
              colors={['#1e1b4b', '#312e81']}
              style={styles.introGradient}
            >
              <Shield size={40} color="#ffd700" />
              <Text style={styles.introTitle}>Your Privacy Matters</Text>
              <Text style={styles.introText}>
                At CorpAstro, we are committed to protecting your privacy and ensuring the security of your personal information. This policy explains how we collect, use, and safeguard your data.
              </Text>
              <Text style={styles.lastUpdated}>Last updated: January 15, 2024</Text>
            </LinearGradient>
          </Animated.View>

          {/* Privacy Sections */}
          {privacySections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <Animated.View
                key={index}
                style={[
                  styles.section,
                  {
                    opacity: fadeAnim,
                    transform: [{ translateY: Animated.multiply(slideAnim, index * 0.3 + 1) }],
                  },
                ]}
              >
                <LinearGradient
                  colors={['#1e1b4b', '#312e81']}
                  style={styles.sectionGradient}
                >
                  <View style={styles.sectionHeader}>
                    <IconComponent size={24} color="#ffd700" />
                    <Text style={styles.sectionTitle}>{section.title}</Text>
                  </View>
                  <Text style={styles.sectionContent}>{section.content}</Text>
                </LinearGradient>
              </Animated.View>
            );
          })}

          {/* Contact Information */}
          <Animated.View
            style={[
              styles.contactSection,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <LinearGradient
              colors={['#1e1b4b', '#312e81']}
              style={styles.contactGradient}
            >
              <Text style={styles.contactTitle}>Questions About Privacy?</Text>
              <Text style={styles.contactText}>
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </Text>
              <View style={styles.contactDetails}>
                <Text style={styles.contactDetail}>📧 privacy@corpastro.com</Text>
                <Text style={styles.contactDetail}>📞 +91 98765 43210</Text>
                <Text style={styles.contactDetail}>📍 Mumbai, Maharashtra, India</Text>
              </View>
            </LinearGradient>
          </Animated.View>

          {/* Key Points */}
          <Animated.View
            style={[
              styles.keyPointsSection,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.keyPointsTitle}>Key Privacy Commitments</Text>
            <View style={styles.keyPointsGrid}>
              <View style={styles.keyPointCard}>
                <LinearGradient
                  colors={['#10b981', '#059669']}
                  style={styles.keyPointGradient}
                >
                  <Shield size={24} color="#ffffff" />
                  <Text style={styles.keyPointText}>Bank-Grade Security</Text>
                </LinearGradient>
              </View>
              
              <View style={styles.keyPointCard}>
                <LinearGradient
                  colors={['#3b82f6', '#2563eb']}
                  style={styles.keyPointGradient}
                >
                  <Lock size={24} color="#ffffff" />
                  <Text style={styles.keyPointText}>No Data Selling</Text>
                </LinearGradient>
              </View>
              
              <View style={styles.keyPointCard}>
                <LinearGradient
                  colors={['#8b5cf6', '#7c3aed']}
                  style={styles.keyPointGradient}
                >
                  <Users size={24} color="#ffffff" />
                  <Text style={styles.keyPointText}>Full Control</Text>
                </LinearGradient>
              </View>
              
              <View style={styles.keyPointCard}>
                <LinearGradient
                  colors={['#ef4444', '#dc2626']}
                  style={styles.keyPointGradient}
                >
                  <Eye size={24} color="#ffffff" />
                  <Text style={styles.keyPointText}>Transparency</Text>
                </LinearGradient>
              </View>
            </View>
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
    left: '15%',
  },
  star2: {
    top: '35%',
    right: '20%',
  },
  star3: {
    bottom: '40%',
    left: '25%',
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
  introSection: {
    marginBottom: 30,
    borderRadius: 15,
    overflow: 'hidden',
  },
  introGradient: {
    padding: 25,
    alignItems: 'center',
  },
  introTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 15,
    marginBottom: 15,
  },
  introText: {
    fontSize: 16,
    color: '#c4b5fd',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 15,
  },
  lastUpdated: {
    fontSize: 12,
    color: '#8b5cf6',
    fontStyle: 'italic',
  },
  section: {
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  sectionGradient: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 12,
  },
  sectionContent: {
    fontSize: 14,
    color: '#c4b5fd',
    lineHeight: 22,
  },
  contactSection: {
    marginBottom: 30,
    borderRadius: 15,
    overflow: 'hidden',
  },
  contactGradient: {
    padding: 20,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  contactText: {
    fontSize: 14,
    color: '#c4b5fd',
    lineHeight: 20,
    marginBottom: 15,
  },
  contactDetails: {
    marginTop: 10,
  },
  contactDetail: {
    fontSize: 14,
    color: '#ffd700',
    marginBottom: 8,
  },
  keyPointsSection: {
    marginBottom: 30,
  },
  keyPointsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  keyPointsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  keyPointCard: {
    width: (width - 50) / 2,
    marginBottom: 15,
    borderRadius: 12,
    overflow: 'hidden',
  },
  keyPointGradient: {
    padding: 20,
    alignItems: 'center',
    minHeight: 100,
    justifyContent: 'center',
  },
  keyPointText: {
    color: '#ffffff',
    fontWeight: '600',
    marginTop: 8,
    fontSize: 12,
    textAlign: 'center',
  },
});