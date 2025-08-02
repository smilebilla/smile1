import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../components/foundations/themes/useTheme';
import Section from './Section';

const CARD_WIDTH = (Dimensions.get('window').width - 64) / 4;

const businessFeatures = [
  {
    id: 'name-numerology',
    title: 'Name Numerology',
    icon: 'format-letter-case',
    gradient: ['#B2FEFA', '#0ED2F7'], // Aqua clarity
  },
  {
    id: 'tagline-analysis',
    title: 'Tagline Analysis',
    icon: 'text-search',
    gradient: ['#FFDEE9', '#1D2671'], // Creative branding feel
  },
  {
    id: 'business-insights',
    title: 'Business Insights',
    icon: 'lightbulb-on-outline',
    gradient: ['#FCE38A', '#F38181'], // Innovative and warm
  },
  {
    id: 'startup-muhurta',
    title: 'Startup Muhurta',
    icon: 'calendar-clock',
    gradient: ['#E0C3FC', '#8EC5FC'], // Spiritual and time-aligned
  },
];

const BusinessAndNumerology: React.FC = () => {
  const { colors } = useTheme();

  return (
    <Section title="🔢 Business & Numerology">
      <View style={styles.row}>
        {businessFeatures.map(item => (
          <TouchableOpacity key={item.id} activeOpacity={0.9}>
            <LinearGradient
              colors={item.gradient as any}
              style={[styles.card, { borderColor: String(colors.brand.primary) + '40' }]}
            >
              <MaterialCommunityIcons
                name={item.icon as any}
                size={28}
                color={colors.brand.primary}
              />
              <Text style={[styles.title, { color: colors.neutral.light }]}>
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
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  card: {
    width: CARD_WIDTH,
    left: -32,
    height: 110,
    margin: 5,
    borderRadius: 14,
    borderWidth: 1,
    padding: 8,
    justifyContent: 'flex-start',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
    paddingTop: 18,
    marginTop: -5,
  },
  title: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 6,
    textAlign: 'center',
  },
});

export default BusinessAndNumerology;
