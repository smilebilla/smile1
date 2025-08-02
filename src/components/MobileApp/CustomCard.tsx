import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../components/foundations/themes/useTheme';

interface CustomCardProps {
  title: string;
  children: React.ReactNode;
}

const CustomCard: React.FC<CustomCardProps> = ({ title, children }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.brand.primary }]}>{title}</Text>
      <View style={[styles.card, {  }]}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  card: {
    borderRadius: 18,
    marginTop: 15,
    padding: 0,
    width: 350,
    alignSelf:'flex-start',
    marginLeft: -10,
  },
});

export default CustomCard;