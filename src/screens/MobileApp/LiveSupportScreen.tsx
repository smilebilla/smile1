import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useTheme } from '../../components/foundations/themes/useTheme';
import CosmicBackground from '../../components/MobileApp/CosmicBackground';
import AnimatedCard from '../../components/MobileApp/AnimatedCard';
import { PrimaryHeader } from '../../components/composite/navigation/header/PrimaryHeader';

const LiveSupportScreen: React.FC = () => {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: colors.cosmos.deep }}>
      <CosmicBackground />
      <SafeAreaView style={{ flex: 1 }}>
        <PrimaryHeader
          title="💬 Live Support"
          backgroundColor="transparent"
          height="custom"
          customHeight={55}
          shadow={false}
          blur={false}
          animated
        />
        <AnimatedCard style={{ margin: 24 }}>
  <View style={[styles.card, { backgroundColor: String(colors.cosmos.deep) + 'CC' }]}> 
    <Text style={[styles.title, { color: colors.brand.accent }]}>Live Support</Text>
    <Text style={[styles.subtitle, { color: colors.neutral.medium, marginBottom: 16 }]}>Chat with an astrologer or support agent. This feature will soon be available in realtime!</Text>
    {/* Placeholder for future live chat or support */}
    <View style={{ width: '100%', alignItems: 'center', marginTop: 8 }}>
      <Text style={{ color: colors.neutral.medium, fontStyle: 'italic' }}>
        Live chat coming soon.
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

export default LiveSupportScreen;
