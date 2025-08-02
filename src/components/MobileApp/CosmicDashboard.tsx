import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../components/foundations/themes/useTheme';
import CustomCard from './CustomCard';

const CosmicDashboard: React.FC = () => {
  const { colors } = useTheme();

  const dashboardData = [
    {
      title: "Planetary Influence",
      icon: "weather-night",
      value: "Strong",
      change: "+5.2%",
      gradient: ['#A18CD1', '#FBC2EB'], // soft violet to blush pink
      description: "Jupiter's blessing",
    },
    {
      title: "Your Mood",
      icon: "emoticon-happy-outline",
      value: "Optimistic",
      change: "-1.8%",
      gradient: ['#89F7FE', '#66A6FF'], // calm aqua to sky blue
      description: "Venus influence",
    },
    {
      title: "Energy Level",
      icon: "lightning-bolt",
      value: "High",
      change: "+12.5%",
      gradient: ['#FFB347', '#FFD194'], // soft orange to warm peach
      description: "Mars power",
    },
    {
      title: "Luck Factor",
      icon: "star-four-points",
      value: "Excellent",
      change: "+8.7%",
      gradient: ['#43CEA2', '#185A9D'], // champagne to soft coral
      description: "Mercury boost",
    },
  ];
  

  const DashboardCard: React.FC<typeof dashboardData[0]> = ({
    title,
    value,
    change,
    gradient,
    description,
  }) => (
    <LinearGradient colors={gradient as any} style={styles.card}>
      <View style={styles.emojiContainer}>
        <Text style={styles.emoji}>{getEmojiForTitle(title)}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.title]}>{title}</Text>
        <Text style={[styles.value]}>{value}</Text>
        <Text style={[styles.description]}>{description}</Text>
        <Text style={[styles.change, { color: change.startsWith('+') ? '#00C897' : '#FF6B6B' }]}>
          {change}
        </Text>
      </View>
    </LinearGradient>
  );

  function getEmojiForTitle(title: string) {
    switch (title) {
      case 'Planetary Influence':
        return '🪐';
      case 'Your Mood':
        return '😊';
      case 'Energy Level':
        return '⚡';
      case 'Luck Factor':
        return '⭐';
      default:
        return '✨';
    }
  }

  return (
    <CustomCard title="📊 Cosmic Dashboard">
      <View style={styles.grid}>
        {dashboardData.map((item, index) => (
          <DashboardCard key={index} {...item} />
        ))}
      </View>
    </CustomCard>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'column',
    gap: 0,
    justifyContent: 'flex-start',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    padding: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  emojiContainer: {
    width: 64,
    height: 64,
    borderRadius: 12,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  emoji: {
    fontSize: 32,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  description: {
    fontSize: 13,
    fontStyle: 'italic',
    color: '#f5f5f5',
    marginBottom: 2,
  },
  change: {
    fontSize: 13,
    fontWeight: 'bold',
  },
});

export default CosmicDashboard;
