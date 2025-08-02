import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../components/foundations/themes/useTheme';
import { CheckCircle } from 'lucide-react-native';

interface PremiumFeatureItemProps {
  text: string;
  highlight?: boolean;
}

const PremiumFeatureItem: React.FC<PremiumFeatureItemProps> = ({ text, highlight }) => {
  const { colors } = useTheme();
  return (
    <View style={styles.row}>
      <CheckCircle size={20} color={highlight ? colors.luxury.champagne : colors.neutral.medium} style={styles.icon} />
      <Text style={[styles.text, { color: highlight ? colors.luxury.champagne : colors.neutral.light }]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default PremiumFeatureItem;
