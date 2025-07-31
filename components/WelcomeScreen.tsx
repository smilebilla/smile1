import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Star,
  ArrowRight,
  Sparkles,
  Moon,
  Sun,
  Zap,
} from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

export default function WelcomeScreen({ onGetStarted }: WelcomeScreenProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const features = [
    {
      icon: Star,
      title: 'Comprehensive Charts',
      description: 'Lahiri, Ramana & KP chart systems with all divisional charts',
    },
    {
      icon: Zap,
      title: 'AI Astrology Guide',
      description: 'Get instant answers from Astro Ratan AI chatbot',
    },
    {
      icon: Sun,
      title: 'Business Astrology',
      description: 'Market predictions and business timing analysis',
    },
    {
      icon: Moon,
      title: 'Detailed Reports',
      description: 'Health, career, wealth, and relationship predictions',
    },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1a1625', '#2d1b69', '#4c1d95', '#7c3aed']}
        style={styles.gradient}
      >
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Sparkles size={60} color="#ffd700" />
            </View>
            <Text style={styles.title}>Welcome to CorpAstro</Text>
            <Text style={styles.subtitle}>
              Your complete astrology companion for personal and business insights
            </Text>
          </View>

          {/* Features */}
          <View style={styles.featuresContainer}>
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Animated.View
                  key={index}
                  style={[
                    styles.featureCard,
                    {
                      opacity: fadeAnim,
                      transform: [{
                        translateX: Animated.multiply(
                          slideAnim,
                          index % 2 === 0 ? -1 : 1
                        )
                      }],
                    },
                  ]}
                >
                  <LinearGradient
                    colors={['#1e1b4b', '#312e81']}
                    style={styles.featureGradient}
                  >
                    <IconComponent size={32} color="#ffd700" />
                    <Text style={styles.featureTitle}>{feature.title}</Text>
                    <Text style={styles.featureDescription}>{feature.description}</Text>
                  </LinearGradient>
                </Animated.View>
              );
            })}
          </View>

          {/* Get Started Button */}
          <Animated.View
            style={[
              styles.buttonContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <TouchableOpacity style={styles.getStartedButton} onPress={onGetStarted}>
              <LinearGradient
                colors={['#7c3aed', '#a855f7', '#c084fc']}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>Get Started</Text>
                <ArrowRight size={24} color="#ffffff" />
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>

          {/* Bottom Text */}
          <Animated.View
            style={[
              styles.bottomText,
              { opacity: fadeAnim },
            ]}
          >
            <Text style={styles.disclaimer}>
              Unlock the secrets of the cosmos and make informed decisions
            </Text>
          </Animated.View>
        </Animated.View>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#c4b5fd',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: width * 0.8,
  },
  featuresContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  featureCard: {
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
  },
  featureGradient: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 15,
    marginBottom: 5,
    flex: 1,
  },
  featureDescription: {
    fontSize: 14,
    color: '#c4b5fd',
    marginLeft: 15,
    flex: 2,
    lineHeight: 20,
  },
  buttonContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  getStartedButton: {
    width: '100%',
    borderRadius: 25,
    overflow: 'hidden',
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 30,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginRight: 10,
  },
  bottomText: {
    alignItems: 'center',
    marginTop: 20,
  },
  disclaimer: {
    fontSize: 14,
    color: '#8b5cf6',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});