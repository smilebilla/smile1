import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TrendingUp, TrendingDown, DollarSign, Building, Users, Calendar, Target, ChartBar as BarChart3, ChartPie as PieChart, Activity } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function MarketScreen() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('daily');

  const marketData = [
    {
      sector: 'Technology',
      prediction: 'Bullish',
      confidence: 85,
      change: '+12.5%',
      icon: Building,
      color: ['#10b981', '#059669'],
    },
    {
      sector: 'Healthcare',
      prediction: 'Bearish',
      confidence: 72,
      change: '-8.3%',
      icon: Activity,
      color: ['#ef4444', '#dc2626'],
    },
    {
      sector: 'Finance',
      prediction: 'Bullish',
      confidence: 91,
      change: '+15.7%',
      icon: DollarSign,
      color: ['#10b981', '#059669'],
    },
    {
      sector: 'Energy',
      prediction: 'Neutral',
      confidence: 68,
      change: '+2.1%',
      icon: Target,
      color: ['#f59e0b', '#d97706'],
    },
  ];

  const astroInfluences = [
    {
      planet: 'Jupiter',
      influence: 'Expansion in tech sector',
      strength: 'Strong',
      duration: '2 weeks',
    },
    {
      planet: 'Mars',
      influence: 'Volatility in energy markets',
      strength: 'Moderate',
      duration: '1 week',
    },
    {
      planet: 'Venus',
      influence: 'Growth in luxury goods',
      strength: 'Strong',
      duration: '3 weeks',
    },
    {
      planet: 'Mercury',
      influence: 'Communication sector boost',
      strength: 'Weak',
      duration: '4 days',
    },
  ];

  const timeframes = ['Daily', 'Weekly', 'Monthly', 'Quarterly'];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0f0c29', '#24243e', '#302b63']}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Business Astrology</Text>
          <Text style={styles.subtitle}>Market Predictions & Analysis</Text>
        </View>

        {/* Timeframe Selector */}
        <View style={styles.timeframeSelector}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {timeframes.map((timeframe) => (
              <TouchableOpacity
                key={timeframe}
                style={[
                  styles.timeframeButton,
                  selectedTimeframe === timeframe.toLowerCase() && styles.selectedTimeframe
                ]}
                onPress={() => setSelectedTimeframe(timeframe.toLowerCase())}
              >
                <Text style={[
                  styles.timeframeText,
                  selectedTimeframe === timeframe.toLowerCase() && styles.selectedTimeframeText
                ]}>
                  {timeframe}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Market Overview */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Market Predictions</Text>
            <View style={styles.marketGrid}>
              {marketData.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <TouchableOpacity key={index} style={styles.marketCard}>
                    <LinearGradient
                      colors={['#1e1b4b', '#312e81']}
                      style={styles.marketGradient}
                    >
                      <View style={styles.marketHeader}>
                        <IconComponent size={24} color="#ffd700" />
                        <Text style={styles.sectorName}>{item.sector}</Text>
                      </View>
                      
                      <View style={styles.predictionContainer}>
                        <Text style={[
                          styles.prediction,
                          { color: item.prediction === 'Bullish' ? '#10b981' : 
                                   item.prediction === 'Bearish' ? '#ef4444' : '#f59e0b' }
                        ]}>
                          {item.prediction}
                        </Text>
                        <Text style={styles.change}>{item.change}</Text>
                      </View>

                      <View style={styles.confidenceContainer}>
                        <Text style={styles.confidenceLabel}>Confidence</Text>
                        <View style={styles.confidenceBar}>
                          <View style={[
                            styles.confidenceProgress,
                            { width: `${item.confidence}%` }
                          ]} />
                        </View>
                        <Text style={styles.confidenceText}>{item.confidence}%</Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Astrological Influences */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Planetary Influences</Text>
            <LinearGradient
              colors={['#1e1b4b', '#312e81']}
              style={styles.influencesCard}
            >
              {astroInfluences.map((influence, index) => (
                <View key={index} style={styles.influenceItem}>
                  <View style={styles.influenceHeader}>
                    <Text style={styles.planetName}>{influence.planet}</Text>
                    <Text style={[
                      styles.strengthBadge,
                      { 
                        backgroundColor: influence.strength === 'Strong' ? '#10b981' :
                                          influence.strength === 'Moderate' ? '#f59e0b' : '#6b7280'
                      }
                    ]}>
                      {influence.strength}
                    </Text>
                  </View>
                  <Text style={styles.influenceDescription}>{influence.influence}</Text>
                  <Text style={styles.duration}>Duration: {influence.duration}</Text>
                </View>
              ))}
            </LinearGradient>
          </View>

          {/* Market Charts */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Analysis Tools</Text>
            <View style={styles.toolsGrid}>
              <TouchableOpacity style={styles.toolCard}>
                <LinearGradient
                  colors={['#7c3aed', '#a855f7']}
                  style={styles.toolGradient}
                >
                  <BarChart3 size={32} color="#ffffff" />
                  <Text style={styles.toolTitle}>Market Trends</Text>
                  <Text style={styles.toolDescription}>Detailed sector analysis</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity style={styles.toolCard}>
                <LinearGradient
                  colors={['#059669', '#10b981']}
                  style={styles.toolGradient}
                >
                  <PieChart size={32} color="#ffffff" />
                  <Text style={styles.toolTitle}>Portfolio Analysis</Text>
                  <Text style={styles.toolDescription}>Astrological optimization</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity style={styles.toolCard}>
                <LinearGradient
                  colors={['#dc2626', '#ef4444']}
                  style={styles.toolGradient}
                >
                  <TrendingUp size={32} color="#ffffff" />
                  <Text style={styles.toolTitle}>Risk Assessment</Text>
                  <Text style={styles.toolDescription}>Planetary risk factors</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity style={styles.toolCard}>
                <LinearGradient
                  colors={['#d97706', '#f59e0b']}
                  style={styles.toolGradient}
                >
                  <Calendar size={32} color="#ffffff" />
                  <Text style={styles.toolTitle}>Timing Analysis</Text>
                  <Text style={styles.toolDescription}>Optimal trading windows</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

          {/* Generate Report Button */}
          <TouchableOpacity style={styles.reportButton}>
            <LinearGradient
              colors={['#7c3aed', '#a855f7', '#c084fc']}
              style={styles.reportGradient}
            >
              <Users size={24} color="#ffffff" />
              <Text style={styles.reportText}>Generate Business Report</Text>
            </LinearGradient>
          </TouchableOpacity>
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
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffd700',
  },
  subtitle: {
    fontSize: 14,
    color: '#c4b5fd',
    marginTop: 5,
  },
  timeframeSelector: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  timeframeButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#374151',
  },
  selectedTimeframe: {
    backgroundColor: '#7c3aed',
  },
  timeframeText: {
    color: '#d1d5db',
    fontWeight: '600',
  },
  selectedTimeframeText: {
    color: '#ffffff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
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
  marketGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  marketCard: {
    width: (width - 50) / 2,
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
  },
  marketGradient: {
    padding: 15,
  },
  marketHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectorName: {
    color: '#ffffff',
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 14,
  },
  predictionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  prediction: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  change: {
    color: '#ffffff',
    fontWeight: '600',
  },
  confidenceContainer: {
    alignItems: 'center',
  },
  confidenceLabel: {
    color: '#c4b5fd',
    fontSize: 12,
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
    color: '#ffd700',
    fontSize: 12,
    fontWeight: '600',
  },
  influencesCard: {
    borderRadius: 15,
    padding: 20,
  },
  influenceItem: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  influenceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  planetName: {
    color: '#ffd700',
    fontSize: 16,
    fontWeight: 'bold',
  },
  strengthBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 10,
    color: '#ffffff',
    fontWeight: '600',
  },
  influenceDescription: {
    color: '#ffffff',
    lineHeight: 20,
    marginBottom: 5,
  },
  duration: {
    color: '#c4b5fd',
    fontSize: 12,
  },
  toolsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  toolCard: {
    width: (width - 50) / 2,
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
  },
  toolGradient: {
    padding: 20,
    alignItems: 'center',
    minHeight: 120,
    justifyContent: 'center',
  },
  toolTitle: {
    color: '#ffffff',
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  toolDescription: {
    color: '#ffffff',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
    opacity: 0.8,
  },
  reportButton: {
    marginVertical: 30,
    borderRadius: 20,
    overflow: 'hidden',
  },
  reportGradient: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reportText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});