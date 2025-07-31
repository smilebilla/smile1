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
  Calendar,
  Sun,
  Moon,
  Star,
  Clock,
  Compass,
  Target,
  Zap,
  X,
  Sparkles,
  Sunrise,
  Sunset,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface PanchangScreenProps {
  onClose: () => void;
}

export default function PanchangScreen({ onClose }: PanchangScreenProps) {
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

  const panchangData = {
    tithi: { name: 'Tritiya', lord: 'Ganesha', percentage: 75 },
    nakshatra: { name: 'Rohini', lord: 'Brahma', percentage: 60 },
    yoga: { name: 'Siddha', lord: 'Ganesha', percentage: 85 },
    karana: { name: 'Bava', lord: 'Indra', percentage: 40 },
    vara: { name: 'Mangalwar', lord: 'Mars', percentage: 90 },
  };

  const muhurat = [
    { name: 'Abhijit Muhurat', time: '11:47 AM - 12:35 PM', type: 'Auspicious', color: '#10b981' },
    { name: 'Rahu Kaal', time: '01:30 PM - 03:00 PM', type: 'Inauspicious', color: '#ef4444' },
    { name: 'Gulika Kaal', time: '10:30 AM - 12:00 PM', type: 'Inauspicious', color: '#f59e0b' },
    { name: 'Yamaganda', time: '07:30 AM - 09:00 AM', type: 'Inauspicious', color: '#8b5cf6' },
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
          <Text style={styles.title}>Panchang</Text>
          <TouchableOpacity style={styles.calendarButton}>
            <Calendar size={24} color="#ffd700" />
          </TouchableOpacity>
        </Animated.View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Date Section */}
          <Animated.View
            style={[
              styles.dateSection,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <LinearGradient
              colors={['#1e1b4b', '#312e81']}
              style={styles.dateGradient}
            >
              <Text style={styles.dateText}>Today, {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</Text>
              <Text style={styles.hinduDate}>Vikram Samvat 2081, Paush Krishna Paksha</Text>
            </LinearGradient>
          </Animated.View>

          {/* Panchang Elements */}
          <Animated.View
            style={[
              styles.section,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.sectionTitle}>Panchang Elements</Text>
            {Object.entries(panchangData).map(([key, data], index) => (
              <View key={key} style={styles.panchangCard}>
                <LinearGradient
                  colors={['#1e1b4b', '#312e81']}
                  style={styles.panchangGradient}
                >
                  <View style={styles.panchangHeader}>
                    <Text style={styles.panchangName}>{key.toUpperCase()}</Text>
                    <Text style={styles.panchangValue}>{data.name}</Text>
                  </View>
                  <View style={styles.panchangDetails}>
                    <Text style={styles.panchangLord}>Lord: {data.lord}</Text>
                    <View style={styles.progressContainer}>
                      <View style={styles.progressBar}>
                        <View style={[styles.progress, { width: `${data.percentage}%` }]} />
                      </View>
                      <Text style={styles.progressText}>{data.percentage}%</Text>
                    </View>
                  </View>
                </LinearGradient>
              </View>
            ))}
          </Animated.View>

          {/* Muhurat Section */}
          <Animated.View
            style={[
              styles.section,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.sectionTitle}>Today's Muhurat</Text>
            {muhurat.map((item, index) => (
              <View key={index} style={styles.muhuratCard}>
                <LinearGradient
                  colors={['#1e1b4b', '#312e81']}
                  style={styles.muhuratGradient}
                >
                  <View style={styles.muhuratHeader}>
                    <Text style={styles.muhuratName}>{item.name}</Text>
                    <View style={[styles.muhuratBadge, { backgroundColor: item.color }]}>
                      <Text style={styles.muhuratType}>{item.type}</Text>
                    </View>
                  </View>
                  <View style={styles.muhuratTime}>
                    <Clock size={16} color="#8b5cf6" />
                    <Text style={styles.timeText}>{item.time}</Text>
                  </View>
                </LinearGradient>
              </View>
            ))}
          </Animated.View>

          {/* Celestial Information */}
          <Animated.View
            style={[
              styles.section,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.sectionTitle}>Celestial Information</Text>
            <View style={styles.celestialGrid}>
              <LinearGradient colors={['#f59e0b', '#d97706']} style={styles.celestialCard}>
                <Sunrise size={24} color="#ffffff" />
                <Text style={styles.celestialLabel}>Sunrise</Text>
                <Text style={styles.celestialTime}>06:24 AM</Text>
              </LinearGradient>
              <LinearGradient colors={['#ef4444', '#dc2626']} style={styles.celestialCard}>
                <Sunset size={24} color="#ffffff" />
                <Text style={styles.celestialLabel}>Sunset</Text>
                <Text style={styles.celestialTime}>06:18 PM</Text>
              </LinearGradient>
              <LinearGradient colors={['#8b5cf6', '#7c3aed']} style={styles.celestialCard}>
                <Moon size={24} color="#ffffff" />
                <Text style={styles.celestialLabel}>Moonrise</Text>
                <Text style={styles.celestialTime}>08:45 PM</Text>
              </LinearGradient>
              <LinearGradient colors={['#6366f1', '#4f46e5']} style={styles.celestialCard}>
                <Moon size={24} color="#ffffff" />
                <Text style={styles.celestialLabel}>Moonset</Text>
                <Text style={styles.celestialTime}>07:30 AM</Text>
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
  calendarButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  dateSection: {
    marginBottom: 30,
    borderRadius: 15,
    overflow: 'hidden',
  },
  dateGradient: {
    padding: 20,
    alignItems: 'center',
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  hinduDate: {
    fontSize: 14,
    color: '#c4b5fd',
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
  panchangCard: {
    marginBottom: 15,
    borderRadius: 12,
    overflow: 'hidden',
  },
  panchangGradient: {
    padding: 15,
  },
  panchangHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  panchangName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#8b5cf6',
  },
  panchangValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  panchangDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  panchangLord: {
    fontSize: 12,
    color: '#c4b5fd',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    width: 60,
    height: 6,
    backgroundColor: '#374151',
    borderRadius: 3,
    marginRight: 8,
  },
  progress: {
    height: '100%',
    backgroundColor: '#ffd700',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#ffd700',
    fontWeight: '600',
  },
  muhuratCard: {
    marginBottom: 15,
    borderRadius: 12,
    overflow: 'hidden',
  },
  muhuratGradient: {
    padding: 15,
  },
  muhuratHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  muhuratName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  muhuratBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  muhuratType: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  muhuratTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 14,
    color: '#c4b5fd',
    marginLeft: 8,
  },
  celestialGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  celestialCard: {
    width: (width - 50) / 2,
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  celestialLabel: {
    color: '#ffffff',
    fontSize: 12,
    marginTop: 8,
    fontWeight: '600',
  },
  celestialTime: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
});