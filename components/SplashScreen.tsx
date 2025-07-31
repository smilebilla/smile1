import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Sparkles, Star, Moon } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animations = Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        })
      ),
    ]);

    animations.start();

    const timer = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0f0c29', '#24243e', '#302b63']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <Animated.View
            style={[
              styles.logoContainer,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }, { rotate: spin }],
              },
            ]}
          >
            <Sparkles size={80} color="#ffd700" />
          </Animated.View>

          <Animated.View
            style={[
              styles.textContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: Animated.multiply(fadeAnim, -20) }],
              },
            ]}
          >
            <Text style={styles.title}>CorpAstro</Text>
            <Text style={styles.subtitle}>Professional Astrology & Business Insights</Text>
          </Animated.View>

          <Animated.View
            style={[
              styles.starsContainer,
              { opacity: fadeAnim },
            ]}
          >
            <Star size={20} color="#ffd700" style={[styles.star, styles.star1]} />
            <Moon size={24} color="#c4b5fd" style={[styles.star, styles.star2]} />
            <Star size={16} color="#8b5cf6" style={[styles.star, styles.star3]} />
            <Star size={18} color="#ffd700" style={[styles.star, styles.star4]} />
          </Animated.View>
        </View>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    marginBottom: 40,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffd700',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#c4b5fd',
    textAlign: 'center',
    maxWidth: width * 0.8,
    lineHeight: 24,
  },
  starsContainer: {
    position: 'absolute',
    width: width,
    height: height,
  },
  star: {
    position: 'absolute',
  },
  star1: {
    top: height * 0.2,
    left: width * 0.2,
  },
  star2: {
    top: height * 0.15,
    right: width * 0.2,
  },
  star3: {
    bottom: height * 0.3,
    left: width * 0.15,
  },
  star4: {
    bottom: height * 0.25,
    right: width * 0.25,
  },
});