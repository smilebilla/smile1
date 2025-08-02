import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../components/foundations/themes/useTheme';

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.wrapper}>
      <Text style={[styles.title, { color: colors.brand.primary }]}>
        {title}
      </Text>
      <View style={[styles.content, { backgroundColor: String(colors.cosmos.medium) + '10' }]}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 28,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  content: {
    borderRadius: 16,
    padding: 12,
    overflow: 'hidden',
  },
});

export default Section;
