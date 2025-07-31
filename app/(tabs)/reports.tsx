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
import { FileText, Heart, Briefcase, DollarSign, Chrome as Home, Users, Book, Star, Download, Share, Eye, Calendar } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function ReportsScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const reportCategories = [
    { id: 'all', name: 'All Reports', icon: FileText },
    { id: 'health', name: 'Health', icon: Heart },
    { id: 'career', name: 'Career', icon: Briefcase },
    { id: 'wealth', name: 'Wealth', icon: DollarSign },
    { id: 'relationship', name: 'Relationship', icon: Users },
    { id: 'property', name: 'Property', icon: Home },
  ];

  const reports = [
    {
      id: '1',
      title: 'Comprehensive Health Analysis',
      category: 'health',
      description: 'Complete health prediction based on planetary positions and divisional charts',
      type: 'Premium',
      pages: 25,
      price: '₹999',
      rating: 4.8,
      downloads: 1250,
      lastUpdated: '2 days ago',
    },
    {
      id: '2',
      title: 'Career Growth & Opportunities',
      category: 'career',
      description: 'Detailed career analysis with timing for job changes and promotions',
      type: 'Standard',
      pages: 18,
      price: '₹699',
      rating: 4.6,
      downloads: 2100,
      lastUpdated: '1 week ago',
    },
    {
      id: '3',
      title: 'Wealth & Financial Prosperity',
      category: 'wealth',
      description: 'Investment timing, wealth accumulation periods, and financial planning',
      type: 'Premium',
      pages: 30,
      price: '₹1299',
      rating: 4.9,
      downloads: 890,
      lastUpdated: '3 days ago',
    },
    {
      id: '4',
      title: 'Marriage & Relationship Compatibility',
      category: 'relationship',
      description: 'Complete relationship analysis with compatibility scores and timing',
      type: 'Premium',
      pages: 22,
      price: '₹899',
      rating: 4.7,
      downloads: 1650,
      lastUpdated: '5 days ago',
    },
    {
      id: '5',
      title: 'Property & Real Estate Analysis',
      category: 'property',
      description: 'Best timing for property purchase, location analysis, and investment tips',
      type: 'Standard',
      pages: 15,
      price: '₹599',
      rating: 4.5,
      downloads: 780,
      lastUpdated: '1 week ago',
    },
    {
      id: '6',
      title: 'Annual Horoscope 2024',
      category: 'all',
      description: 'Complete yearly predictions covering all life aspects with monthly breakdowns',
      type: 'Premium',
      pages: 45,
      price: '₹1599',
      rating: 4.9,
      downloads: 3200,
      lastUpdated: '1 day ago',
    },
  ];

  const filteredReports = selectedCategory === 'all' 
    ? reports 
    : reports.filter(report => report.category === selectedCategory);

  const getIconForCategory = (category: string) => {
    const categoryObj = reportCategories.find(cat => cat.id === category);
    return categoryObj ? categoryObj.icon : FileText;
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1a1625', '#2d1b69', '#4c1d95']}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Astrology Reports</Text>
          <Text style={styles.subtitle}>Detailed life predictions & analysis</Text>
        </View>

        {/* Category Selector */}
        <View style={styles.categorySelector}>
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
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Reports Grid */}
          <View style={styles.reportsGrid}>
            {filteredReports.map((report) => {
              const IconComponent = getIconForCategory(report.category);
              return (
                <TouchableOpacity key={report.id} style={styles.reportCard}>
                  <LinearGradient
                    colors={['#1e1b4b', '#312e81']}
                    style={styles.reportGradient}
                  >
                    <View style={styles.reportHeader}>
                      <View style={styles.reportIcon}>
                        <IconComponent size={20} color="#ffd700" />
                      </View>
                      <View style={styles.typeBadge}>
                        <Text style={[
                          styles.typeText,
                          { color: report.type === 'Premium' ? '#ffd700' : '#10b981' }
                        ]}>
                          {report.type}
                        </Text>
                      </View>
                    </View>

                    <Text style={styles.reportTitle}>{report.title}</Text>
                    <Text style={styles.reportDescription}>{report.description}</Text>

                    <View style={styles.reportStats}>
                      <View style={styles.statItem}>
                        <Book size={14} color="#8b5cf6" />
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
                        <Text style={styles.lastUpdated}>Updated {report.lastUpdated}</Text>
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
                          </LinearGradient>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Quick Actions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.actionGrid}>
              <TouchableOpacity style={styles.quickActionCard}>
                <LinearGradient
                  colors={['#7c3aed', '#a855f7']}
                  style={styles.quickActionGradient}
                >
                  <FileText size={24} color="#ffffff" />
                  <Text style={styles.quickActionText}>Custom Report</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity style={styles.quickActionCard}>
                <LinearGradient
                  colors={['#059669', '#10b981']}
                  style={styles.quickActionGradient}
                >
                  <Calendar size={24} color="#ffffff" />
                  <Text style={styles.quickActionText}>Schedule Reading</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity style={styles.quickActionCard}>
                <LinearGradient
                  colors={['#dc2626', '#ef4444']}
                  style={styles.quickActionGradient}
                >
                  <Users size={24} color="#ffffff" />
                  <Text style={styles.quickActionText}>Consultation</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity style={styles.quickActionCard}>
                <LinearGradient
                  colors={['#d97706', '#f59e0b']}
                  style={styles.quickActionGradient}
                >
                  <Star size={24} color="#ffffff" />
                  <Text style={styles.quickActionText}>Premium Plans</Text>
                </LinearGradient>
              </TouchableOpacity>
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
  categorySelector: {
    paddingHorizontal: 20,
    marginBottom: 20,
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  reportsGrid: {
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  reportIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#374151',
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#374151',
  },
  typeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  reportDescription: {
    color: '#c4b5fd',
    lineHeight: 20,
    marginBottom: 15,
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
  lastUpdated: {
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
    borderRadius: 17.5,
    overflow: 'hidden',
    marginLeft: 8,
  },
  downloadGradient: {
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
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
  },
});