import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Building,
  BarChart3,
  Target,
  Zap,
  X,
  Sparkles,
  Star,
  Moon,
  Activity,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface MarketAnalysisScreenProps {
  onClose: () => void;
}

export default function MarketAnalysisScreen({ onClose }: MarketAnalysisScreenProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const sparkleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(sparkleAnim, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(sparkleAnim, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
          }),
        ])
      ),
    ]).start();
  }, []);

  const marketData = [
    {
      sector: 'Technology',
      prediction: 'Bullish',
      confidence: 92,
      change: '+15.7%',
      influence: 'Jupiter Transit',
      color: ['#10b981', '#059669'],
    },
    {
      sector: 'Healthcare',
      prediction: 'Bearish',
      confidence: 78,
      change: '-8.3%',
      influence: 'Mars Retrograde',
      color: ['#ef4444', '#dc2626'],
    },
    {
      sector: 'Finance',
      prediction: 'Bullish',
      confidence: 88,
      change: '+12.4%',
      influence: 'Venus Conjunction',
      color: ['#10b981', '#059669'],
    },
    {
      sector: 'Energy',
      prediction: 'Neutral',
      confidence: 65,
      change: '+2.1%',
      influence: 'Mercury Transit',
      color: ['#f59e0b', '#d97706'],
    },
  ];

  const planetaryInfluences = [
    {
      planet: 'Jupiter',
      influence: 'Expansion in tech sector',
      strength: 'Strong',
      duration: '2 weeks',
      color: '#ffd700',
    },
    {
      planet: 'Mars',
      influence: 'Volatility in energy markets',
      strength: 'Moderate',
      duration: '1 week',
      color: '#ef4444',
    },
    {
      planet: 'Venus',
      influence: 'Growth in luxury goods',
      strength: 'Strong',
      duration: '3 weeks',
      color: '#8b5cf6',
    },
  ];

  const sparkleOpacity = sparkleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0a0a0f', '#1a1625', '#2d1b69']}
        style={styles.gradient}
      >
        {/* Animated Background */}
        <Animated.View style={[styles.starsContainer, { opacity: sparkleOpacity }]}>
          <Sparkles size={16} color="#ffd700" style={[styles.star, styles.star1]} />
          <Star size={14} color="#8b5cf6" style={[styles.star, styles.star2]} />
          <Moon size={18} color="#c084fc" style={[styles.star, styles.star3]} />
        </Animated.View>

        {/* Header */}
        <Animated.View
          style={[
            styles.header,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.title}>Market Analysis</Text>
          <View style={styles.liveIndicator}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
        </Animated.View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Market Overview */}
          <Animated.View
            style={[
              styles.overviewSection,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <LinearGradient
              colors={['#1e1b4b', '#312e81']}
              style={styles.overviewGradient}
            >
              <Text style={styles.overviewTitle}>Market Sentiment</Text>
              <View style={styles.sentimentContainer}>
                <View style={styles.sentimentItem}>
                  <TrendingUp size={32} color="#10b981" />
                  <Text style={styles.sentimentLabel}>Bullish</Text>
                  <Text style={styles.sentimentValue}>68%</Text>
                </View>
                <View style={styles.sentimentItem}>
                  <Activity size={32} color="#f59e0b" />
                  <Text style={styles.sentimentLabel}>Neutral</Text>
                  <Text style={styles.sentimentValue}>20%</Text>
                </View>
                <View style={styles.sentimentItem}>
                  <TrendingDown size={32} color="#ef4444" />
                  <Text style={styles.sentimentLabel}>Bearish</Text>
                  <Text style={styles.sentimentValue}>12%</Text>
                </View>
              </View>
            </LinearGradient>
          </Animated.View>

          {/* Sector Analysis */}
          <Animated.View
            style={[
              styles.section,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.sectionTitle}>Sector Predictions</Text>
            {marketData.map((sector, index) => (
              <View key={index} style={styles.sectorCard}>
                <LinearGradient
                  colors={['#1e1b4b', '#312e81']}
                  style={styles.sectorGradient}
                >
                  <View style={styles.sectorHeader}>
                    <View style={styles.sectorInfo}>
                      <Text style={styles.sectorName}>{sector.sector}</Text>
                      <Text style={styles.sectorInfluence}>{sector.influence}</Text>
                    </View>
                    <View style={styles.sectorPrediction}>
                      <Text style={[
                        styles.predictionText,
                        { color: sector.prediction === 'Bullish' ? '#10b981' : 
                                 sector.prediction === 'Bearish' ? '#ef4444' : '#f59e0b' }
                      ]}>
                        {sector.prediction}
                      </Text>
                      <Text style={styles.changeText}>{sector.change}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.confidenceContainer}>
                    <Text style={styles.confidenceLabel}>Confidence Level</Text>
                    <View style={styles.confidenceBar}>
                      <View style={[
                        styles.confidenceProgress,
                        { width: `${sector.confidence}%` }
                      ]} />
                    </View>
                    <Text style={styles.confidenceText}>{sector.confidence}%</Text>
                  </View>
                </LinearGradient>
              </View>
            ))}
          </Animated.View>

          {/* Planetary Influences */}
          <Animated.View
            style={[
              styles.section,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.sectionTitle}>Planetary Influences</Text>
            {planetaryInfluences.map((planet, index) => (
              <View key={index} style={styles.planetCard}>
                <LinearGradient
                  colors={['#1e1b4b', '#312e81']}
                  style={styles.planetGradient}
                >
                  <View style={styles.planetHeader}>
                    <Text style={[styles.planetName, { color: planet.color }]}>
                      {planet.planet}
                    </Text>
                    <View style={[
                      styles.strengthBadge,
                      { backgroundColor: planet.strength === 'Strong' ? '#10b981' : '#f59e0b' }
                    ]}>
                      <Text style={styles.strengthText}>{planet.strength}</Text>
                    </View>
                  </View>
                  <Text style={styles.planetInfluence}>{planet.influence}</Text>
                  <Text style={styles.planetDuration}>Duration: {planet.duration}</Text>
                </LinearGradient>
              </View>
            ))}
          </Animated.View>

          {/* Trading Recommendations */}
          <Animated.View
            style={[
              styles.section,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.sectionTitle}>Trading Recommendations</Text>
            <View style={styles.recommendationsGrid}>
              <LinearGradient colors={['#10b981', '#059669']} style={styles.recommendationCard}>
                <Target size={24} color="#ffffff" />
                <Text style={styles.recommendationTitle}>BUY</Text>
                <Text style={styles.recommendationSubtitle}>Tech Stocks</Text>
                <Text style={styles.recommendationTiming}>Best Time: 10 AM - 2 PM</Text>
              </LinearGradient>
              
              <LinearGradient colors={['#ef4444', '#dc2626']} style={styles.recommendationCard}>
                <Zap size={24} color="#ffffff" />
                <Text style={styles.recommendationTitle}>SELL</Text>
                <Text style={styles.recommendationSubtitle}>Healthcare</Text>
                <Text style={styles.recommendationTiming}>Best Time: 2 PM - 4 PM</Text>
              </LinearGradient>
              
              <LinearGradient colors={['#f59e0b', '#d97706']} style={styles.recommendationCard}>
                <Building size={24} color="#ffffff" />
                <Text style={styles.recommendationTitle}>HOLD</Text>
                <Text style={styles.recommendationSubtitle}>Real Estate</Text>
                <Text style={styles.recommendationTiming}>Review in 1 week</Text>
              </LinearGradient>
              
              <LinearGradient colors={['#8b5cf6', '#7c3aed']} style={styles.recommendationCard}>
                <DollarSign size={24} color="#ffffff" />
                <Text style={styles.recommendationTitle}>WATCH</Text>
                <Text style={styles.recommendationSubtitle}>Commodities</Text>
                <Text style={styles.recommendationTiming}>Monitor closely</Text>
              </LinearGradient>
            </View>
          </Animated.View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  starsContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  star: {
    position: 'absolute',
  },
  star1: {
    top: '20%',
    left: '15%',
  },
  star2: {
    top: '35%',
    right: '20%',
  },
  star3: {
    bottom: '40%',
    left: '25%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  closeButton: {
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ef4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ffffff',
    marginRight: 5,
  },
  liveText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  overviewSection: {
    marginBottom: 30,
    borderRadius: 15,
    overflow: 'hidden',
  },
  overviewGradient: {
    padding: 20,
  },
  overviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  sentimentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  sentimentItem: {
    alignItems: 'center',
  },
  sentimentLabel: {
    fontSize: 12,
    color: '#c4b5fd',
    marginTop: 8,
  },
  sentimentValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 4,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  sectorCard: {
    marginBottom: 15,
    borderRadius: 12,
    overflow: 'hidden',
  },
  sectorGradient: {
    padding: 15,
  },
  sectorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  sectorInfo: {
    flex: 1,
  },
  sectorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  sectorInfluence: {
    fontSize: 12,
    color: '#c4b5fd',
    marginTop: 2,
  },
  sectorPrediction: {
    alignItems: 'flex-end',
  },
  predictionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  changeText: {
    fontSize: 14,
    color: '#ffffff',
    marginTop: 2,
  },
  confidenceContainer: {
    alignItems: 'center',
  },
  confidenceLabel: {
    fontSize: 12,
    color: '#8b5cf6',
    marginBottom: 5,
  },
  confidenceBar: {
    width: '100%',
    height: 6,
    backgroundColor: '#374151',
    borderRadius: 3,
    marginBottom: 5,
  },
  confidenceProgress: {
    height: '100%',
    backgroundColor: '#ffd700',
    borderRadius: 3,
  },
  confidenceText: {
    fontSize: 12,
    color: '#ffd700',
    fontWeight: '600',
  },
  planetCard: {
    marginBottom: 15,
    borderRadius: 12,
    overflow: 'hidden',
  },
  planetGradient: {
    padding: 15,
  },
  planetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  planetName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  strengthBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  strengthText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  planetInfluence: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 5,
  },
  planetDuration: {
    fontSize: 12,
    color: '#c4b5fd',
  },
  recommendationsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  recommendationCard: {
    width: (width - 50) / 2,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 8,
  },
  recommendationSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  recommendationTiming: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 8,
    textAlign: 'center',
  },
});