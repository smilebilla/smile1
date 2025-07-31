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
  Users,
  Star,
  Clock,
  Calendar,
  Video,
  Phone,
  MessageCircle,
  Award,
  X,
  Sparkles,
  Moon,
  Crown,
  Zap,
  CheckCircle,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface ConsultationScreenProps {
  onClose: () => void;
}

export default function ConsultationScreen({ onClose }: ConsultationScreenProps) {
  const [selectedExpert, setSelectedExpert] = useState<string | null>(null);
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

  const experts = [
    {
      id: '1',
      name: 'Pandit Rajesh Sharma',
      specialization: 'Vedic Astrology & KP System',
      experience: '25+ years',
      rating: 4.9,
      reviews: 2450,
      languages: ['Hindi', 'English', 'Sanskrit'],
      price: '₹999/hour',
      availability: 'Available Now',
      status: 'online',
      expertise: ['Birth Chart', 'Career', 'Marriage', 'Health'],
    },
    {
      id: '2',
      name: 'Dr. Priya Agarwal',
      specialization: 'Numerology & Tarot',
      experience: '15+ years',
      rating: 4.8,
      reviews: 1890,
      languages: ['English', 'Hindi'],
      price: '₹799/hour',
      availability: 'Available in 30 mins',
      status: 'busy',
      expertise: ['Numerology', 'Tarot', 'Love Life', 'Finance'],
    },
    {
      id: '3',
      name: 'Acharya Vikram Singh',
      specialization: 'Business Astrology',
      experience: '30+ years',
      rating: 5.0,
      reviews: 3200,
      languages: ['Hindi', 'English', 'Punjabi'],
      price: '₹1299/hour',
      availability: 'Available Tomorrow',
      status: 'offline',
      expertise: ['Business', 'Investment', 'Property', 'Partnership'],
    },
  ];

  const consultationTypes = [
    {
      type: 'Video Call',
      icon: Video,
      duration: '60 mins',
      description: 'Face-to-face consultation with screen sharing',
      color: ['#10b981', '#059669'],
    },
    {
      type: 'Voice Call',
      icon: Phone,
      duration: '45 mins',
      description: 'Audio consultation for detailed discussion',
      color: ['#3b82f6', '#2563eb'],
    },
    {
      type: 'Chat Session',
      icon: MessageCircle,
      duration: '30 mins',
      description: 'Text-based consultation with instant responses',
      color: ['#8b5cf6', '#7c3aed'],
    },
  ];

  const sparkleOpacity = sparkleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return '#10b981';
      case 'busy': return '#f59e0b';
      case 'offline': return '#6b7280';
      default: return '#6b7280';
    }
  };

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
          <Text style={styles.title}>Expert Consultation</Text>
          <View style={styles.placeholder} />
        </Animated.View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Consultation Types */}
          <Animated.View
            style={[
              styles.typesSection,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.sectionTitle}>Choose Consultation Type</Text>
            {consultationTypes.map((type, index) => {
              const IconComponent = type.icon;
              return (
                <TouchableOpacity key={index} style={styles.typeCard}>
                  <LinearGradient
                    colors={['#1e1b4b', '#312e81']}
                    style={styles.typeGradient}
                  >
                    <LinearGradient
                      colors={type.color}
                      style={styles.typeIcon}
                    >
                      <IconComponent size={24} color="#ffffff" />
                    </LinearGradient>
                    <View style={styles.typeInfo}>
                      <Text style={styles.typeName}>{type.type}</Text>
                      <Text style={styles.typeDescription}>{type.description}</Text>
                    </View>
                    <View style={styles.typeDuration}>
                      <Clock size={16} color="#8b5cf6" />
                      <Text style={styles.durationText}>{type.duration}</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              );
            })}
          </Animated.View>

          {/* Expert List */}
          <Animated.View
            style={[
              styles.expertsSection,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.sectionTitle}>Choose Your Expert</Text>
            {experts.map((expert, index) => (
              <TouchableOpacity
                key={expert.id}
                style={[
                  styles.expertCard,
                  selectedExpert === expert.id && styles.selectedExpert
                ]}
                onPress={() => setSelectedExpert(expert.id)}
              >
                <LinearGradient
                  colors={['#1e1b4b', '#312e81']}
                  style={styles.expertGradient}
                >
                  <View style={styles.expertHeader}>
                    <View style={styles.expertAvatar}>
                      <Users size={24} color="#ffd700" />
                      <View style={[
                        styles.statusDot,
                        { backgroundColor: getStatusColor(expert.status) }
                      ]} />
                    </View>
                    <View style={styles.expertInfo}>
                      <Text style={styles.expertName}>{expert.name}</Text>
                      <Text style={styles.expertSpecialization}>{expert.specialization}</Text>
                      <Text style={styles.expertExperience}>{expert.experience} experience</Text>
                    </View>
                    <View style={styles.expertRating}>
                      <Star size={16} color="#ffd700" fill="#ffd700" />
                      <Text style={styles.ratingText}>{expert.rating}</Text>
                      <Text style={styles.reviewsText}>({expert.reviews})</Text>
                    </View>
                  </View>

                  <View style={styles.expertDetails}>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Languages:</Text>
                      <Text style={styles.detailValue}>{expert.languages.join(', ')}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Expertise:</Text>
                      <View style={styles.expertiseContainer}>
                        {expert.expertise.map((skill, skillIndex) => (
                          <View key={skillIndex} style={styles.expertiseTag}>
                            <Text style={styles.expertiseText}>{skill}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  </View>

                  <View style={styles.expertFooter}>
                    <View style={styles.priceContainer}>
                      <Text style={styles.price}>{expert.price}</Text>
                      <Text style={styles.availability}>{expert.availability}</Text>
                    </View>
                    <TouchableOpacity style={styles.bookButton}>
                      <LinearGradient
                        colors={['#7c3aed', '#a855f7']}
                        style={styles.bookGradient}
                      >
                        <Calendar size={16} color="#ffffff" />
                        <Text style={styles.bookText}>Book Now</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </Animated.View>

          {/* Features */}
          <Animated.View
            style={[
              styles.featuresSection,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.sectionTitle}>Why Choose Our Experts?</Text>
            <LinearGradient
              colors={['#1e1b4b', '#312e81']}
              style={styles.featuresGradient}
            >
              {[
                { icon: Award, title: 'Certified Experts', desc: 'All experts are verified and certified' },
                { icon: CheckCircle, title: '100% Satisfaction', desc: 'Money-back guarantee if not satisfied' },
                { icon: Crown, title: 'Premium Quality', desc: 'High-quality consultations with detailed analysis' },
                { icon: Zap, title: 'Instant Booking', desc: 'Book consultations instantly with flexible timing' },
              ].map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <View key={index} style={styles.featureItem}>
                    <IconComponent size={24} color="#ffd700" />
                    <View style={styles.featureContent}>
                      <Text style={styles.featureTitle}>{feature.title}</Text>
                      <Text style={styles.featureDesc}>{feature.desc}</Text>
                    </View>
                  </View>
                );
              })}
            </LinearGradient>
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
  typesSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  typeCard: {
    marginBottom: 15,
    borderRadius: 12,
    overflow: 'hidden',
  },
  typeGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  typeIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  typeInfo: {
    flex: 1,
  },
  typeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  typeDescription: {
    fontSize: 12,
    color: '#c4b5fd',
    marginTop: 2,
  },
  typeDuration: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationText: {
    fontSize: 12,
    color: '#8b5cf6',
    marginLeft: 5,
  },
  expertsSection: {
    marginBottom: 30,
  },
  expertCard: {
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
  },
  selectedExpert: {
    borderWidth: 2,
    borderColor: '#ffd700',
  },
  expertGradient: {
    padding: 20,
  },
  expertHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  expertAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#374151',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
    position: 'relative',
  },
  statusDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#1e1b4b',
  },
  expertInfo: {
    flex: 1,
  },
  expertName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  expertSpecialization: {
    fontSize: 12,
    color: '#c4b5fd',
    marginTop: 2,
  },
  expertExperience: {
    fontSize: 10,
    color: '#8b5cf6',
    marginTop: 2,
  },
  expertRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 5,
  },
  reviewsText: {
    fontSize: 10,
    color: '#9ca3af',
    marginLeft: 2,
  },
  expertDetails: {
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 12,
    color: '#8b5cf6',
    width: 80,
  },
  detailValue: {
    fontSize: 12,
    color: '#ffffff',
    flex: 1,
  },
  expertiseContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
  },
  expertiseTag: {
    backgroundColor: '#374151',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 5,
    marginBottom: 5,
  },
  expertiseText: {
    fontSize: 10,
    color: '#ffffff',
  },
  expertFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flex: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffd700',
  },
  availability: {
    fontSize: 10,
    color: '#10b981',
    marginTop: 2,
  },
  bookButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  bookGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  bookText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 5,
  },
  featuresSection: {
    marginBottom: 30,
  },
  featuresGradient: {
    padding: 20,
    borderRadius: 15,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  featureContent: {
    marginLeft: 15,
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  featureDesc: {
    fontSize: 12,
    color: '#c4b5fd',
    marginTop: 2,
  },
});