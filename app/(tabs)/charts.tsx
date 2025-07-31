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
import { Circle, Grid3x3 as Grid3X3, Compass, Target, Zap, Star, Moon, Sun } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function ChartsScreen() {
  const [selectedSystem, setSelectedSystem] = useState('lahiri');

  const chartSystems = [
    { id: 'lahiri', name: 'Lahiri', icon: Circle },
    { id: 'ramana', name: 'Ramana', icon: Compass },
    { id: 'kp', name: 'KP System', icon: Target },
  ];

  const lahiriCharts = {
    'Non-Divisional Charts': [
      'Birth Chart', 'Moon Chart', 'Navamsha', 'Bhava (Sripati)',
      'Sudharashana Chakra', 'Sun Chart', 'Bhava Planets'
    ],
    'Divisional Charts': [
      'Hora (D-2)', 'Dreshkana (D-3)', 'Chaturthamsha (D-4)',
      'Saptamsha (D-7)', 'Dashamsha (D-10)', 'Dwadashamsha (D-12)',
      'Shodashamsha (D-16)', 'Vimshamsha (D-20)', 'Chaturvimshamsha (D-24)',
      'Saptavimshamsha (D-27)', 'Trimshamsha (D-30)', 'Khavedamsha (D-40)',
      'Akshavedamsha (D-45)', 'Shashtiamsha (D-60)'
    ],
    'Lagna Charts': [
      'Arudha Lagna', 'Bhava Lagna', 'Hora Lagna', 'Ghatika Lagna',
      'KP Lagna', 'Equal Bhava Lagna', 'Karkamsha Birth Chart'
    ],
    'Ashtakavarga System': [
      'Bhinnashtakavarga', 'Sarvashtakavarga', 'Shodashvarga Summary',
      'Vimshopaka Bala'
    ],
    'Vimshottari Dashas': [
      'Maha Dasha', 'Antardasha', 'Pratyantardasha',
      'Sookshma Dasha', 'Prana Dasha'
    ]
  };

  const kpCharts = {
    'KP System Charts': [
      'Cuspal Chart', 'Significations of Planets', 'Significations of Houses',
      'Ruling Planets', 'Fortune Chart'
    ],
    'Bhava Details': [
      'Placidus System - Houses', 'Placidus System - Planets'
    ],
    'Relationship Charts': [
      'Naisargik Maitri Chakra', 'Tatkalik Maitri Chakra',
      'Panchadha Maitri Chakra'
    ],
    'Special Features': [
      'KP Horary', 'Shodashvarga Summary', 'Shad Bala', 'Bhava Bala'
    ],
    'Jaimini System': [
      'Chara Karaka', 'Pada Chart'
    ]
  };

  const getCurrentCharts = () => {
    switch (selectedSystem) {
      case 'lahiri':
      case 'ramana':
        return lahiriCharts;
      case 'kp':
        return kpCharts;
      default:
        return lahiriCharts;
    }
  };

  const getIconForChart = (chartName: string) => {
    if (chartName.includes('Birth') || chartName.includes('Lagna')) return Sun;
    if (chartName.includes('Moon')) return Moon;
    if (chartName.includes('Dasha')) return Zap;
    return Star;
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0f0c29', '#24243e', '#302b63']}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Astrology Charts</Text>
          <Text style={styles.subtitle}>Choose your preferred system</Text>
        </View>

        {/* Chart System Selector */}
        <View style={styles.systemSelector}>
          {chartSystems.map((system) => {
            const IconComponent = system.icon;
            return (
              <TouchableOpacity
                key={system.id}
                style={[
                  styles.systemCard,
                  selectedSystem === system.id && styles.selectedSystem
                ]}
                onPress={() => setSelectedSystem(system.id)}
              >
                <LinearGradient
                  colors={
                    selectedSystem === system.id
                      ? ['#7c3aed', '#a855f7']
                      : ['#374151', '#4b5563']
                  }
                  style={styles.systemGradient}
                >
                  <IconComponent size={24} color="#ffd700" />
                  <Text style={styles.systemName}>{system.name}</Text>
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {Object.entries(getCurrentCharts()).map(([category, charts]) => (
            <View key={category} style={styles.section}>
              <Text style={styles.sectionTitle}>{category}</Text>
              <View style={styles.chartsGrid}>
                {charts.map((chart, index) => {
                  const IconComponent = getIconForChart(chart);
                  return (
                    <TouchableOpacity key={index} style={styles.chartCard}>
                      <LinearGradient
                        colors={['#1e1b4b', '#312e81', '#4c1d95']}
                        style={styles.chartGradient}
                      >
                        <IconComponent size={20} color="#ffd700" />
                        <Text style={styles.chartName}>{chart}</Text>
                        <View style={styles.chartStatus}>
                          <View style={styles.statusDot} />
                          <Text style={styles.statusText}>Available</Text>
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          ))}

          {/* Chart Generation Button */}
          <TouchableOpacity style={styles.generateButton}>
            <LinearGradient
              colors={['#7c3aed', '#a855f7', '#c084fc']}
              style={styles.generateGradient}
            >
              <Grid3X3 size={24} color="#ffffff" />
              <Text style={styles.generateText}>Generate All Charts</Text>
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
  systemSelector: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  systemCard: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 15,
    overflow: 'hidden',
  },
  selectedSystem: {
    transform: [{ scale: 1.05 }],
  },
  systemGradient: {
    padding: 15,
    alignItems: 'center',
  },
  systemName: {
    color: '#ffffff',
    fontWeight: '600',
    marginTop: 8,
    fontSize: 12,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  chartsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  chartCard: {
    width: (width - 50) / 2,
    marginBottom: 15,
    borderRadius: 12,
    overflow: 'hidden',
  },
  chartGradient: {
    padding: 15,
    alignItems: 'center',
    minHeight: 100,
    justifyContent: 'center',
  },
  chartName: {
    color: '#ffffff',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 8,
    fontSize: 12,
    lineHeight: 16,
  },
  chartStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10b981',
    marginRight: 5,
  },
  statusText: {
    color: '#10b981',
    fontSize: 10,
  },
  generateButton: {
    marginVertical: 30,
    borderRadius: 20,
    overflow: 'hidden',
  },
  generateGradient: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  generateText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});