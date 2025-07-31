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
  BookOpen,
  Play,
  Star,
  Clock,
  Users,
  Award,
  X,
  ChevronRight,
  Sparkles,
  Target,
  Zap,
  Moon,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface AstroLearningScreenProps {
  onClose: () => void;
}

export default function AstroLearningScreen({ onClose }: AstroLearningScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState('beginner');
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

  const categories = [
    { id: 'beginner', name: 'Beginner', icon: BookOpen, color: '#10b981' },
    { id: 'intermediate', name: 'Intermediate', icon: Target, color: '#f59e0b' },
    { id: 'advanced', name: 'Advanced', icon: Zap, color: '#ef4444' },
    { id: 'master', name: 'Master', icon: Award, color: '#8b5cf6' },
  ];

  const courses = {
    beginner: [
      {
        title: 'Introduction to Astrology',
        duration: '2 hours',
        lessons: 12,
        students: 1250,
        rating: 4.8,
        progress: 0,
        description: 'Learn the basics of astrology and chart reading',
      },
      {
        title: 'Understanding Zodiac Signs',
        duration: '1.5 hours',
        lessons: 8,
        students: 980,
        rating: 4.6,
        progress: 25,
        description: 'Deep dive into the 12 zodiac signs and their characteristics',
      },
    ],
    intermediate: [
      {
        title: 'Planetary Aspects & Transits',
        duration: '3 hours',
        lessons: 15,
        students: 750,
        rating: 4.9,
        progress: 60,
        description: 'Master planetary aspects and their interpretations',
      },
      {
        title: 'Houses in Astrology',
        duration: '2.5 hours',
        lessons: 12,
        students: 650,
        rating: 4.7,
        progress: 0,
        description: 'Complete guide to the 12 houses and their meanings',
      },
    ],
    advanced: [
      {
        title: 'Divisional Charts (Vargas)',
        duration: '4 hours',
        lessons: 20,
        students: 450,
        rating: 4.9,
        progress: 80,
        description: 'Advanced study of divisional charts and their applications',
      },
      {
        title: 'Predictive Techniques',
        duration: '5 hours',
        lessons: 25,
        students: 380,
        rating: 4.8,
        progress: 40,
        description: 'Learn various predictive methods in Vedic astrology',
      },
    ],
    master: [
      {
        title: 'Professional Consultation Skills',
        duration: '6 hours',
        lessons: 30,
        students: 200,
        rating: 5.0,
        progress: 0,
        description: 'Become a professional astrologer with consultation skills',
      },
      {
        title: 'Research in Astrology',
        duration: '8 hours',
        lessons: 40,
        students: 150,
        rating: 4.9,
        progress: 0,
        description: 'Advanced research methods and statistical astrology',
      },
    ],
  };

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
          <Text style={styles.title}>Astro Learning</Text>
          <View style={styles.placeholder} />
        </Animated.View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Progress Overview */}
          <Animated.View
            style={[
              styles.progressSection,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <LinearGradient
              colors={['#1e1b4b', '#312e81']}
              style={styles.progressGradient}
            >
              <Text style={styles.progressTitle}>Your Learning Journey</Text>
              <View style={styles.progressStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>8</Text>
                  <Text style={styles.statLabel}>Courses Completed</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>45h</Text>
                  <Text style={styles.statLabel}>Hours Learned</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>92%</Text>
                  <Text style={styles.statLabel}>Average Score</Text>
                </View>
              </View>
            </LinearGradient>
          </Animated.View>

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
            <Text style={styles.sectionTitle}>Learning Levels</Text>
            <View style={styles.categoryGrid}>
              {categories.map((category) => {
                const IconComponent = category.icon;
                const isSelected = selectedCategory === category.id;
                return (
                  <TouchableOpacity
                    key={category.id}
                    style={[styles.categoryCard, isSelected && styles.selectedCategory]}
                    onPress={() => setSelectedCategory(category.id)}
                  >
                    <LinearGradient
                      colors={isSelected ? [category.color, category.color + '80'] : ['#374151', '#4b5563']}
                      style={styles.categoryGradient}
                    >
                      <IconComponent size={24} color="#ffffff" />
                      <Text style={styles.categoryName}>{category.name}</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                );
              })}
            </View>
          </Animated.View>

          {/* Courses */}
          <Animated.View
            style={[
              styles.coursesSection,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.sectionTitle}>
              {categories.find(c => c.id === selectedCategory)?.name} Courses
            </Text>
            {courses[selectedCategory as keyof typeof courses].map((course, index) => (
              <TouchableOpacity key={index} style={styles.courseCard}>
                <LinearGradient
                  colors={['#1e1b4b', '#312e81']}
                  style={styles.courseGradient}
                >
                  <View style={styles.courseHeader}>
                    <View style={styles.courseInfo}>
                      <Text style={styles.courseTitle}>{course.title}</Text>
                      <Text style={styles.courseDescription}>{course.description}</Text>
                    </View>
                    <TouchableOpacity style={styles.playButton}>
                      <LinearGradient
                        colors={['#10b981', '#059669']}
                        style={styles.playGradient}
                      >
                        <Play size={16} color="#ffffff" />
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.courseStats}>
                    <View style={styles.courseStat}>
                      <Clock size={14} color="#8b5cf6" />
                      <Text style={styles.courseStatText}>{course.duration}</Text>
                    </View>
                    <View style={styles.courseStat}>
                      <BookOpen size={14} color="#8b5cf6" />
                      <Text style={styles.courseStatText}>{course.lessons} lessons</Text>
                    </View>
                    <View style={styles.courseStat}>
                      <Users size={14} color="#8b5cf6" />
                      <Text style={styles.courseStatText}>{course.students}</Text>
                    </View>
                    <View style={styles.courseStat}>
                      <Star size={14} color="#ffd700" />
                      <Text style={styles.courseStatText}>{course.rating}</Text>
                    </View>
                  </View>

                  {course.progress > 0 && (
                    <View style={styles.progressContainer}>
                      <Text style={styles.progressLabel}>Progress: {course.progress}%</Text>
                      <View style={styles.progressBar}>
                        <View style={[styles.progress, { width: `${course.progress}%` }]} />
                      </View>
                    </View>
                  )}

                  <TouchableOpacity style={styles.continueButton}>
                    <Text style={styles.continueText}>
                      {course.progress > 0 ? 'Continue Learning' : 'Start Course'}
                    </Text>
                    <ChevronRight size={16} color="#8b5cf6" />
                  </TouchableOpacity>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </Animated.View>

          {/* Achievements */}
          <Animated.View
            style={[
              styles.achievementsSection,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.sectionTitle}>Achievements</Text>
            <View style={styles.achievementsGrid}>
              {[
                { name: 'First Steps', icon: BookOpen, earned: true, color: '#10b981' },
                { name: 'Chart Master', icon: Target, earned: true, color: '#f59e0b' },
                { name: 'Prediction Pro', icon: Zap, earned: false, color: '#6b7280' },
                { name: 'Astro Expert', icon: Award, earned: false, color: '#6b7280' },
              ].map((achievement, index) => {
                const IconComponent = achievement.icon;
                return (
                  <View key={index} style={styles.achievementCard}>
                    <LinearGradient
                      colors={achievement.earned ? [achievement.color, achievement.color + '80'] : ['#374151', '#4b5563']}
                      style={styles.achievementGradient}
                    >
                      <IconComponent size={24} color="#ffffff" />
                      <Text style={styles.achievementName}>{achievement.name}</Text>
                      {achievement.earned && (
                        <View style={styles.earnedBadge}>
                          <Text style={styles.earnedText}>✓</Text>
                        </View>
                      )}
                    </LinearGradient>
                  </View>
                );
              })}
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
  progressSection: {
    marginBottom: 30,
    borderRadius: 15,
    overflow: 'hidden',
  },
  progressGradient: {
    padding: 20,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
    textAlign: 'center',
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffd700',
  },
  statLabel: {
    fontSize: 12,
    color: '#c4b5fd',
    marginTop: 5,
    textAlign: 'center',
  },
  categorySection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: (width - 50) / 2,
    marginBottom: 10,
    borderRadius: 12,
    overflow: 'hidden',
  },
  selectedCategory: {
    borderWidth: 2,
    borderColor: '#ffd700',
  },
  categoryGradient: {
    padding: 15,
    alignItems: 'center',
    minHeight: 80,
    justifyContent: 'center',
  },
  categoryName: {
    color: '#ffffff',
    fontWeight: '600',
    marginTop: 8,
    fontSize: 14,
  },
  coursesSection: {
    marginBottom: 30,
  },
  courseCard: {
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
  },
  courseGradient: {
    padding: 20,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  courseInfo: {
    flex: 1,
    marginRight: 15,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  courseDescription: {
    fontSize: 14,
    color: '#c4b5fd',
    lineHeight: 20,
  },
  playButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  playGradient: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  courseStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  courseStat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  courseStatText: {
    fontSize: 12,
    color: '#c4b5fd',
    marginLeft: 5,
  },
  progressContainer: {
    marginBottom: 15,
  },
  progressLabel: {
    fontSize: 12,
    color: '#8b5cf6',
    marginBottom: 5,
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: '#374151',
    borderRadius: 3,
  },
  progress: {
    height: '100%',
    backgroundColor: '#10b981',
    borderRadius: 3,
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#374151',
    padding: 12,
    borderRadius: 10,
  },
  continueText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  achievementsSection: {
    marginBottom: 30,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  achievementCard: {
    width: (width - 50) / 2,
    marginBottom: 10,
    borderRadius: 12,
    overflow: 'hidden',
  },
  achievementGradient: {
    padding: 15,
    alignItems: 'center',
    minHeight: 80,
    justifyContent: 'center',
    position: 'relative',
  },
  achievementName: {
    color: '#ffffff',
    fontWeight: '600',
    marginTop: 8,
    fontSize: 12,
    textAlign: 'center',
  },
  earnedBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#10b981',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  earnedText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});