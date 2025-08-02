import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../components/foundations/themes/useTheme';
import Section from './Section';

const reports = [
  {
    id: 'health',
    title: 'Health Report',
    icon: 'heart-pulse',
    gradient: ['#FDEFF9', '#E1F5C4'], // soft pink to mint
  },
  {
    id: 'wealth',
    title: 'Wealth Report',
    icon: 'cash-multiple',
    gradient: ['#FFF6E5', '#F9D976'], // beige to gold
  },
  {
    id: 'career',
    title: 'Career Report',
    icon: 'briefcase-variant',
    gradient: ['#E2F0FF', '#C1D9FF'], // sky blue
  },
  {
    id: 'relationships',
    title: 'Relationship Report',
    icon: 'account-heart',
    gradient: ['#FFE3EC', '#FFDEE9'], // blush tones
  },
];

const CARD_WIDTH = (Dimensions.get('window').width - 64) / 4;

const PersonalReports: React.FC = () => {
  const { colors } = useTheme();

  return (
    <Section title="📊 Your Personal Reports">
      <View style={styles.row}>
        {reports.map((item) => (
          <TouchableOpacity key={item.id} activeOpacity={0.9}>
            <LinearGradient
              colors={item.gradient as [string, string]}
              style={[styles.card, { borderColor: String(colors.brand.primary) + '30' }]}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  marginTop: -15,
                }}
              >
                <MaterialCommunityIcons
                  name={item.icon as any}
                  size={28}
                  color={'#333'} // dark gray for readability
                />
              </View>
              <Text style={[styles.title, { color: '#333', marginTop: 'auto', marginBottom: 6 }]}>
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
    paddingTop: 28,
  },
  title: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 6,
    textAlign: 'center',
  },
});

export default PersonalReports;
