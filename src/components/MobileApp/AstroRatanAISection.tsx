import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from '../../components/foundations/themes/useTheme';
import Section from './Section';

const SCREEN_WIDTH = Dimensions.get('window').width;

const AstroRatanAISection: React.FC = () => {
  const { colors } = useTheme();
  const aiGlowAnim = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(aiGlowAnim, {
          toValue: 1.15,
          duration: 900,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(aiGlowAnim, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
      ])
    ).start();
  }, []);

  return (
    <Section title="✨ Meet Our AstroRatan">
    <View style={styles.wrapper}>
      <LinearGradient
        colors={['#4C51BF', '#667EEA', '#764BA2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBox}
      >
        <View style={styles.headerRow}>
          <Animated.View style={[styles.iconContainer, { transform: [{ scale: aiGlowAnim }] }]}>
            <MaterialCommunityIcons name="robot-excited-outline" size={36} color="#fff" />
          </Animated.View>

          <View style={{ flex: 1 }}>
            <Text style={styles.title}>Astro Ratan AI</Text>
            <Text style={styles.subtitle}>
              Get instant astrological guidance & personalized insights!
            </Text>
          </View>
        </View>

        <View style={styles.bottomRow}>
          <TouchableOpacity style={styles.chatButton}>
            <MaterialCommunityIcons name="chat" size={16} color="#6366F1" style={styles.chatIcon} />
            <Text style={styles.chatText}>Chat Now</Text>
          </TouchableOpacity>

          <View style={styles.availabilityBadge}>
            <Text style={styles.availabilityText}>24/7 Available</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
    </Section>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 12,
  },
  gradientBox: {
    borderRadius: 20,
    padding: 18,
    width: SCREEN_WIDTH - 32,
    alignSelf: 'center',

  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    marginRight: 12,
    borderRadius: 25,
    padding: 8,
  },
  title: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    color: '#fff',
    opacity: 0.95,
    fontSize: 12,
    lineHeight: 17,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 9,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 6,
  },
  chatIcon: {
    marginRight: 6,
  },
  chatText: {
    color: '#6366F1',
    fontWeight: 'bold',
    fontSize: 13,
  },
  availabilityBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  availabilityText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
});

export default AstroRatanAISection;
