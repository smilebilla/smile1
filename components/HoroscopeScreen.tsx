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
import {
  Star,
  Heart,
  Briefcase,
  DollarSign,
  Users,
  Zap,
  TrendingUp,
  Calendar,
  X,
  Sun,
  Moon,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface HoroscopeScreenProps {
  onClose: () => void;
}

export default function HoroscopeScreen({ onClose }: HoroscopeScreenProps) {
  const [selectedSign, setSelectedSign] = useState('aries');

  const zodiacSigns = [
    { id: 'aries', name: 'Aries', symbol: '♈', dates: 'Mar 21 - Apr 19', element: 'Fire' },
    { id: 'taurus', name: 'Taurus', symbol: '♉', dates: 'Apr 20 - May 20', element: 'Earth' },
    { id: 'gemini', name: 'Gemini', symbol: '♊', dates: 'May 21 - Jun 20', element: 'Air' },
    { id: 'cancer', name: 'Cancer', symbol: '♋', dates: 'Jun 21 - Jul 22', element: 'Water' },
    { id: 'leo', name: 'Leo', symbol: '♌', dates: 'Jul 23 - Aug 22', element: 'Fire' },
    { id: 'virgo', name: 'Virgo', symbol: '♍', dates: 'Aug 23 - Sep 22', element: 'Earth' },
    { id: 'libra', name: 'Libra', symbol: '♎', dates: 'Sep 23 - Oct 22', element: 'Air' },
    { id: 'scorpio', name: 'Scorpio', symbol: '♏', dates: 'Oct 23 - Nov 21', element: 'Water' },
    { id: 'sagittarius', name: 'Sagittarius', symbol: '♐', dates: 'Nov 22 - Dec 21', element: 'Fire' },
    { id: 'capricorn', name: 'Capricorn', symbol: '♑', dates: 'Dec 22 - Jan 19', element: 'Earth' },
    { id: 'aquarius', name: 'Aquarius', symbol: '♒', dates: 'Jan 20 - Feb 18', element: 'Air' },
    { id: 'pisces', name: 'Pisces', symbol: '♓', dates: 'Feb 19 - Mar 20', element: 'Water' },
  ];

  const horoscopeData = {
    overall: {
      rating: 4.5,
      description: "Today brings excellent opportunities for personal growth and new beginnings. The planetary alignments favor your natural leadership qualities.",
      advice: "Trust your instincts and take bold action on important decisions."
    },
    love: {
      rating: 4.0,
      description: "Venus brings harmony to your relationships. Single Aries may encounter someone special through work connections.",
      advice: "Express your feelings openly and honestly."
    },
    career: {
      rating: 4.8,
      description: "Mars energizes your professional sector. Expect recognition for past efforts and new project opportunities.",
      advice: "Network actively and showcase your innovative ideas."
    },
    health: {
      rating: 3.5,
      description: "Energy levels are moderate. Focus on maintaining balance between work and rest.",
      advice: "Include meditation or yoga in your daily routine."
    },
    finance: {
      rating: 4.2,
      description: "Jupiter's influence brings positive financial developments. Good time for investments and planning.",
      advice: "Review your budget and consider long-term savings goals."
    }
  };

  const categories = [
    { key: 'overall', name: 'Overall', icon: Star, color: '#ffd700' },
    { key: 'love', name: 'Love', icon: Heart, color: '#ef4444' },
    { key: 'career', name: 'Career', icon: Briefcase, color: '#10b981' },
    { key: 'health', name: 'Health', icon: Zap, color: '#f59e0b' },
    { key: 'finance', name: 'Finance', icon: DollarSign, color: '#8b5cf6' },
  ];

  const [selectedCategory, setSelectedCategory] = useState('overall');

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        color={index < Math.floor(rating) ? '#ffd700' : '#6b7280'}
        fill={index < Math.floor(rating) ? '#ffd700' : 'transparent'}
      />
    ));
  };

  const selectedSignData = zodiacSigns.find(sign => sign.id === selectedSign);
  const categoryData = horoscopeData[selectedCategory as keyof typeof horoscopeData];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1a1625', '#2d1b69', '#4c1d95']}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.title}>Daily Horoscope</Text>
          <TouchableOpacity style={styles.calendarButton}>
            <Calendar size={24} color="#ffd700" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Date */}
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>Today, {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</Text>
          </View>

          {/* Zodiac Sign Selector */}
          <View style={styles.signSelector}>
            <Text style={styles.sectionTitle}>Select Your Sign</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {zodiacSigns.map((sign) => (
                <TouchableOpacity
                  key={sign.id}
                  style={[
                    styles.signCard,
                    selectedSign === sign.id && styles.selectedSign
                  ]}
                  onPress={() => setSelectedSign(sign.id)}
                >
                  <LinearGradient
                    colors={
                      selectedSign === sign.id
                        ? ['#7c3aed', '#a855f7']
                        : ['#374151', '#4b5563']
                    }
                    style={styles.signGradient}
                  >
                    <Text style={styles.signSymbol}>{sign.symbol}</Text>
                    <Text style={styles.signName}>{sign.name}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Selected Sign Info */}
          {selectedSignData && (
            <View style={styles.signInfo}>
              <LinearGradient
                colors={['#1e1b4b', '#312e81']}
                style={styles.signInfoGradient}
              >
                <View style={styles.signHeader}>
                  <Text style={styles.signTitle}>{selectedSignData.name} {selectedSignData.symbol}</Text>
                  <Text style={styles.signDates}>{selectedSignData.dates}</Text>
                  <Text style={styles.signElement}>Element: {selectedSignData.element}</Text>
                </View>
              </LinearGradient>
            </View>
          )}

          {/* Category Selector */}
          <View style={styles.categorySelector}>
            <Text style={styles.sectionTitle}>Horoscope Categories</Text>
            <View style={styles.categoryGrid}>
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <TouchableOpacity
                    key={category.key}
                    style={[
                      styles.categoryCard,
                      selectedCategory === category.key && styles.selectedCategory
                    ]}
                    onPress={() => setSelectedCategory(category.key)}
                  >
                    <LinearGradient
                      colors={
                        selectedCategory === category.key
                          ? ['#7c3aed', '#a855f7']
                          : ['#374151', '#4b5563']
                      }
                      style={styles.categoryGradient}
                    >
                      <IconComponent size={24} color={category.color} />
                      <Text style={styles.categoryName}>{category.name}</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Horoscope Content */}
          <View style={styles.horoscopeContent}>
            <LinearGradient
              colors={['#1e1b4b', '#312e81']}
              style={styles.contentGradient}
            >
              <View style={styles.contentHeader}>
                <Text style={styles.contentTitle}>
                  {categories.find(c => c.key === selectedCategory)?.name} Prediction
                </Text>
                <View style={styles.rating}>
                  {renderStars(categoryData.rating)}
                  <Text style={styles.ratingText}>{categoryData.rating}/5</Text>
                </View>
              </View>
              
              <Text style={styles.description}>{categoryData.description}</Text>
              
              <View style={styles.adviceContainer}>
                <Text style={styles.adviceTitle}>Today's Advice:</Text>
                <Text style={styles.advice}>{categoryData.advice}</Text>
              </View>
            </LinearGradient>
          </View>

          {/* Lucky Elements */}
          <View style={styles.luckyElements}>
            <Text style={styles.sectionTitle}>Lucky Elements</Text>
            <View style={styles.luckyGrid}>
              <View style={styles.luckyItem}>
                <Text style={styles.luckyLabel}>Lucky Number</Text>
                <Text style={styles.luckyValue}>7</Text>
              </View>
              <View style={styles.luckyItem}>
                <Text style={styles.luckyLabel}>Lucky Color</Text>
                <Text style={styles.luckyValue}>Red</Text>
              </View>
              <View style={styles.luckyItem}>
                <Text style={styles.luckyLabel}>Lucky Time</Text>
                <Text style={styles.luckyValue}>2-4 PM</Text>
              </View>
              <View style={styles.luckyItem}>
                <Text style={styles.luckyLabel}>Lucky Direction</Text>
                <Text style={styles.luckyValue}>East</Text>
              </View>
            </View>
          </View>
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  calendarButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  dateContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  dateText: {
    fontSize: 16,
    color: '#c4b5fd',
    fontWeight: '500',
  },
  signSelector: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  signCard: {
    marginRight: 10,
    borderRadius: 15,
    overflow: 'hidden',
  },
  selectedSign: {
    transform: [{ scale: 1.05 }],
  },
  signGradient: {
    padding: 15,
    alignItems: 'center',
    minWidth: 80,
  },
  signSymbol: {
    fontSize: 24,
    color: '#ffd700',
    marginBottom: 5,
  },
  signName: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '600',
  },
  signInfo: {
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
  },
  signInfoGradient: {
    padding: 20,
  },
  signHeader: {
    alignItems: 'center',
  },
  signTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffd700',
    marginBottom: 5,
  },
  signDates: {
    fontSize: 14,
    color: '#c4b5fd',
    marginBottom: 5,
  },
  signElement: {
    fontSize: 12,
    color: '#8b5cf6',
  },
  categorySelector: {
    marginBottom: 20,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: (width - 60) / 3,
    marginBottom: 10,
    borderRadius: 12,
    overflow: 'hidden',
  },
  selectedCategory: {
    transform: [{ scale: 1.05 }],
  },
  categoryGradient: {
    padding: 15,
    alignItems: 'center',
    minHeight: 80,
    justifyContent: 'center',
  },
  categoryName: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
  horoscopeContent: {
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
  },
  contentGradient: {
    padding: 20,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  contentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    flex: 1,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: '#ffd700',
    marginLeft: 8,
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    color: '#e0e7ff',
    lineHeight: 24,
    marginBottom: 15,
  },
  adviceContainer: {
    backgroundColor: '#374151',
    padding: 15,
    borderRadius: 10,
  },
  adviceTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffd700',
    marginBottom: 8,
  },
  advice: {
    fontSize: 14,
    color: '#ffffff',
    lineHeight: 20,
  },
  luckyElements: {
    marginBottom: 30,
  },
  luckyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  luckyItem: {
    width: (width - 60) / 2,
    backgroundColor: '#374151',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  luckyLabel: {
    fontSize: 12,
    color: '#8b5cf6',
    marginBottom: 5,
  },
  luckyValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffd700',
  },
});