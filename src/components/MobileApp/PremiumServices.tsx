import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../components/foundations/themes/useTheme';
import Section from './Section';

const services = [
  {
    id: 'love-compatibility',
    title: 'Love Compatibility',
    icon: 'heart-multiple',
    gradient: ['#FFE4EC', '#C2F2FF'],
  },
  {
    id: 'career-guidance',
    title: 'Career Guidance',
    icon: 'briefcase-search',
    gradient: ['#4158D0', '#C850C0'],
  },
  {
    id: 'birth-chart',
    title: 'Birth Chart Analysis',
    icon: 'chart-arc',
    gradient: ['#FFD194', '#D1919C'],
  },
  {
    id: 'astro-advice',
    title: 'Astro Advice',
    icon: 'star-four-points',
    gradient: ['#3EECAC', '#EE74E1'],
  },
];

const CARD_WIDTH = (Dimensions.get('window').width - 64) / 4;

const PremiumServices: React.FC = () => {
  const { colors } = useTheme();

  return (
    <Section title="💎 Premium Services">
      <View style={styles.row}>
        {services.map((item) => (
          <TouchableOpacity key={item.id} style={styles.touchable} activeOpacity={0.95}>
            <LinearGradient
              colors={item.gradient as [string, string]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.card]}
            >
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <MaterialCommunityIcons
                  name={item.icon as any}
                  size={28}
                  color="#fff"
                />
              </View>
              <Text style={[styles.title, { color: '#fff', marginTop: 'auto', marginBottom: 6 }]}>
                {item.title}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>
    </Section>
  );
};

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    flexDirection: 'row',
  },
  touchable: {
    margin: 5,
  },
  card: {
    width: CARD_WIDTH,
    left: -32,
    height: 110,
    borderRadius: 14,
    padding: 8,
    justifyContent: 'flex-start',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
    marginTop: -5,
  },
  title: {
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default PremiumServices;
