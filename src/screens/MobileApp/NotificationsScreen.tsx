import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useTheme } from '../../components/foundations/themes/useTheme';
import CosmicBackground from '../../components/MobileApp/CosmicBackground';
import AnimatedCard from '../../components/MobileApp/AnimatedCard';
import { PrimaryHeader } from '../../components/composite/navigation/header/PrimaryHeader';

const NotificationsScreen: React.FC = () => {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: colors.cosmos.deep }}>
      <CosmicBackground />
      <SafeAreaView style={{ flex: 1 }}>
        <PrimaryHeader
          title="🔔 Notifications"
          backgroundColor="transparent"
          height="custom"
          customHeight={55}
          shadow={false}
          blur={false}
          animated
        />
        <AnimatedCard style={{ margin: 24 }}>
  <View style={[styles.card, { backgroundColor: String(colors.cosmos.deep) + 'CC' }]}> 
    <Text style={[styles.title, { color: colors.brand.primary }]}>Notifications</Text>
    <Text style={[styles.subtitle, { color: colors.neutral.medium, marginBottom: 16 }]}>Your recent alerts and updates will appear here soon.</Text>
    {/* Placeholder for future notifications list */}
    <View style={{ width: '100%', alignItems: 'center', marginTop: 8 }}>
      <Text style={{ color: colors.neutral.medium, fontStyle: 'italic' }}>
        No notifications yet.
      </Text>
    </View>
  </View>
</AnimatedCard>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default NotificationsScreen;
