import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../components/foundations/themes/useTheme';

interface PremiumOverviewCardProps {
  name: string;
  email: string;
  isPremium: boolean;
  joined: string;
}

const PremiumOverviewCard: React.FC<PremiumOverviewCardProps> = ({ name, email, isPremium, joined }) => {
  const { colors } = useTheme();
  return (
    <View style={[styles.card, { backgroundColor: String(colors.cosmos.deep) + 'F6' }]}> 
      <Text style={styles.heading}>Project Overview</Text>
      <View style={styles.row}>
        <View style={[styles.avatar, { backgroundColor: String(colors.brand.primary) + 'BB' }] }>
          <Text style={styles.avatarText}>{name[0]}</Text>
        </View>
        <View>
          <Text style={[styles.name, { color: colors.neutral.light }]}>{name}</Text>
          <Text style={[styles.email, { color: colors.neutral.medium }]}>{email}</Text>
        </View>
        <View style={styles.statusCol}>
          <Text style={{ color: isPremium ? colors.luxury.pure : colors.neutral.medium, fontWeight: 'bold', fontSize: 15 }}>{isPremium ? 'Premium' : 'Free'}</Text>
          <Text style={{ color: colors.neutral.medium, fontSize: 12 }}>Joined {joined}</Text>
        </View>
      </View>
      <Text style={[styles.summary, { color: colors.neutral.medium }] }>
        {isPremium
          ? 'You have access to all premium astrology features and exclusive content.'
          : 'Upgrade to premium to unlock advanced astrology tools, daily insights, and more.'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    padding: 22,
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 0,
    gap: 10,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.13,
    shadowRadius: 12,
    elevation: 3,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 2,
    gap: 10,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  avatarText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  email: {
    fontSize: 14,
  },
  statusCol: {
    marginLeft: 'auto',
    alignItems: 'center',
  },
  summary: {
    fontSize: 15,
    marginTop: 2,
  },
});

export default PremiumOverviewCard;
