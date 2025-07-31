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
  FileText,
  Heart,
  Briefcase,
  DollarSign,
  Home,
  Users,
  Star,
  Download,
  Share,
  Eye,
  X,
  Sparkles,
  Moon,
  Crown,
  Zap,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface CustomReportsScreenProps {
  onClose: () => void;
}

export default function CustomReportsScreen({ onClose }: CustomReportsScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
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

  const reportCategories = [
    { id: 'all', name: 'All Reports', icon: FileText },
    { id: 'health', name: 'Health', icon: Heart },
    { id: 'career', name: 'Career', icon: Briefcase },
    { id: 'wealth', name: 'Wealth', icon: DollarSign },
    { id: 'relationship', name: 'Love', icon: Users },
    { id: 'property', name: 'Property', icon: Home },
  ];

  const reports = [
    {
      id: '1',
      title: 'Comprehensive Health Analysis',
      category: 'health',
      description: 'Complete health prediction with remedies and timing',
      type: 'Premium',
      pages: 35,
      price: '₹1299',
      rating: 4.9,
      downloads: 2150,
      color: ['#ef4444', '#dc2626'],
    },
    {
      id: '2',
      title: 'Career Growth & Success',
      category: 'career',
      description: 'Detailed career analysis with promotion timing',
      type: 'Standard',
      pages: 28,
      price: '₹899',
      rating: 4.7,
      downloads: 3200,
      color: ['#10b981', '#059669'],
    },
    {
      id: '3',
      title: 'Wealth & Investment Guide',
      category: 'wealth',
      description: 'Financial planning with investment timing',
      type: 'Premium',
      pages: 42,
      price: '₹1599',
      rating: 4.8,
      downloads: 1890,
      color: ['#f59e0b', '#d97706'],
    },
    {
      id: '4',
      title: 'Love & Marriage Compatibility',
      category: 'relationship',
      description: 'Complete relationship analysis and timing',
      type: 'Premium',
      pages: 30,
      price: '₹1199',
      rating: 4.6,
      downloads: 2750,
      color: ['#8b5cf6', '#7c3aed'],
    },
    {
      id: '5',
      title: 'Property & Real Estate',
      category: 'property',
      description: 'Best timing for property investments',
      type: 'Standard',
      pages: 22,
      price: '₹799',
      rating: 4.5,
      downloads: 1450,
      color: ['#06b6d4', '#0891b2'],
    },
  ];

  const filteredReports = selectedCategory === 'all' 
    ? reports 
    : reports.filter(report => report.category === selectedCategory);

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
          <Text style={styles.title}>Custom Reports</Text>
          <View style={styles.placeholder} />
        </Animated.View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Category Selector */}
          <Animated.View
            style={[
              styles.categorySection,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {reportCategories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <TouchableOpacity
                    key={category.id}
                    style={[
                      styles.categoryButton,
                      selectedCategory === category.id && styles.selectedCategory
                    ]}
                    onPress={() => setSelectedCategory(category.id)}
                  >
                    <LinearGradient
                      colors={
                        selectedCategory === category.id
                          ? ['#7c3aed', '#a855f7']
                          : ['#374151', '#4b5563']
                      }
                      style={styles.categoryGradient}
                    >
                      <IconComponent size={18} color="#ffd700" />
                      <Text style={styles.categoryText}>{category.name}</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </Animated.View>

          {/* Reports List */}
          <Animated.View
            style={[
              styles.reportsSection,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            {filteredReports.map((report, index) => (
              <View key={report.id} style={styles.reportCard}>
                <LinearGradient
                  colors={['#1e1b4b', '#312e81']}
                  style={styles.reportGradient}
                >
                  <View style={styles.reportHeader}>
                    <LinearGradient
                      colors={report.color}
                      style={styles.reportIcon}
                    >
                      <FileText size={20} color="#ffffff" />
                    </LinearGradient>
                    <View style={styles.reportInfo}>
                      <Text style={styles.reportTitle}>{report.title}</Text>
                      <Text style={styles.reportDescription}>{report.description}</Text>
                    </View>
                    <View style={styles.typeBadge}>
                      {report.type === 'Premium' && <Crown size={12} color="#ffd700" />}
                      <Text style={[
                        styles.typeText,
                        { color: report.type === 'Premium' ? '#ffd700' : '#10b981' }
                      ]}>
                        {report.type}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.reportStats}>
                    <View style={styles.statItem}>
                      <FileText size={14} color="#8b5cf6" />
                      <Text style={styles.statText}>{report.pages} pages</Text>
                    </View>
                    <View style={styles.statItem}>
                      <Star size={14} color="#ffd700" />
                      <Text style={styles.statText}>{report.rating}</Text>
                    </View>
                    <View style={styles.statItem}>
                      <Download size={14} color="#10b981" />
                      <Text style={styles.statText}>{report.downloads}</Text>
                    </View>
                  </View>

                  <View style={styles.reportFooter}>
                    <View style={styles.priceContainer}>
                      <Text style={styles.price}>{report.price}</Text>
                      <Text style={styles.priceLabel}>One-time payment</Text>
                    </View>
                    <View style={styles.actionButtons}>
                      <TouchableOpacity style={styles.actionButton}>
                        <Eye size={16} color="#8b5cf6" />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.actionButton}>
                        <Share size={16} color="#8b5cf6" />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.downloadButton}>
                        <LinearGradient
                          colors={['#7c3aed', '#a855f7']}
                          style={styles.downloadGradient}
                        >
                          <Download size={16} color="#ffffff" />
                          <Text style={styles.downloadText}>Get Report</Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    </View>
                  </View>
                </LinearGradient>
              </View>
            ))}
          </Animated.View>

          {/* Quick Actions */}
          <Animated.View
            style={[
              styles.quickActionsSection,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.actionGrid}>
              <TouchableOpacity style={styles.quickActionCard}>
                <LinearGradient
                  colors={['#7c3aed', '#a855f7']}
                  style={styles.quickActionGradient}
                >
                  <Zap size={24} color="#ffffff" />
                  <Text style={styles.quickActionText}>Instant Report</Text>
                  <Text style={styles.quickActionSubtext}>Get report in 5 mins</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity style={styles.quickActionCard}>
                <LinearGradient
                  colors={['#059669', '#10b981']}
                  style={styles.quickActionGradient}
                >
                  <Users size={24} color="#ffffff" />
                  <Text style={styles.quickActionText}>Consultation</Text>
                  <Text style={styles.quickActionSubtext}>Talk to expert</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity style={styles.quickActionCard}>
                <LinearGradient
                  colors={['#dc2626', '#ef4444']}
                  style={styles.quickActionGradient}
                >
                  <Crown size={24} color="#ffffff" />
                  <Text style={styles.quickActionText}>Premium Plans</Text>
                  <Text style={styles.quickActionSubtext}>Unlimited reports</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity style={styles.quickActionCard}>
                <LinearGradient
                  colors={['#d97706', '#f59e0b']}
                  style={styles.quickActionGradient}
                >
                  <Star size={24} color="#ffffff" />
                  <Text style={styles.quickActionText}>Bundle Offer</Text>
                  <Text style={styles.quickActionSubtext}>Save 40% today</Text>
                </LinearGradient>
              </TouchableOpacity>
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
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  categorySection: {
    marginBottom: 30,
  },
  categoryButton: {
    marginRight: 10,
    borderRadius: 20,
    overflow: 'hidden',
  },
  selectedCategory: {
    transform: [{ scale: 1.05 }],
  },
  categoryGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  categoryText: {
    color: '#ffffff',
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 12,
  },
  reportsSection: {
    marginBottom: 30,
  },
  reportCard: {
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
  },
  reportGradient: {
    padding: 20,
  },
  reportHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  reportIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  reportInfo: {
    flex: 1,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  reportDescription: {
    fontSize: 12,
    color: '#c4b5fd',
    lineHeight: 16,
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#374151',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeText: {
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 4,
  },
  reportStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    color: '#d1d5db',
    fontSize: 12,
    marginLeft: 5,
  },
  reportFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flex: 1,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffd700',
  },
  priceLabel: {
    fontSize: 10,
    color: '#9ca3af',
    marginTop: 2,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: '#374151',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  downloadButton: {
    borderRadius: 20,
    overflow: 'hidden',
    marginLeft: 8,
  },
  downloadGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  downloadText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 5,
  },
  quickActionsSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: (width - 50) / 2,
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
  },
  quickActionGradient: {
    padding: 20,
    alignItems: 'center',
    minHeight: 100,
    justifyContent: 'center',
  },
  quickActionText: {
    color: '#ffffff',
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
    fontSize: 14,
  },
  quickActionSubtext: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 10,
    marginTop: 4,
    textAlign: 'center',
  },
});