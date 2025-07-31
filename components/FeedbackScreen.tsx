import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Animated,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Star,
  MessageCircle,
  Send,
  ThumbsUp,
  ThumbsDown,
  Heart,
  X,
  Sparkles,
  Moon,
  User,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface FeedbackScreenProps {
  onClose: () => void;
}

export default function FeedbackScreen({ onClose }: FeedbackScreenProps) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

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
    { id: 'app', name: 'App Experience', icon: MessageCircle },
    { id: 'accuracy', name: 'Prediction Accuracy', icon: Star },
    { id: 'support', name: 'Customer Support', icon: Heart },
    { id: 'features', name: 'Features', icon: ThumbsUp },
  ];

  const handleSubmit = () => {
    if (rating === 0 || !feedback.trim()) {
      Alert.alert('Error', 'Please provide rating and feedback');
      return;
    }
    Alert.alert('Thank You!', 'Your feedback has been submitted successfully');
    setRating(0);
    setFeedback('');
    setSelectedCategory('');
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
          <Text style={styles.title}>Feedback</Text>
          <View style={styles.placeholder} />
        </Animated.View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Rating Section */}
          <Animated.View
            style={[
              styles.ratingSection,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <LinearGradient
              colors={['#1e1b4b', '#312e81']}
              style={styles.ratingGradient}
            >
              <Text style={styles.ratingTitle}>How was your experience?</Text>
              <View style={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity
                    key={star}
                    onPress={() => setRating(star)}
                    style={styles.starButton}
                  >
                    <Star
                      size={40}
                      color={star <= rating ? '#ffd700' : '#6b7280'}
                      fill={star <= rating ? '#ffd700' : 'transparent'}
                    />
                  </TouchableOpacity>
                ))}
              </View>
              {rating > 0 && (
                <Text style={styles.ratingText}>
                  {rating === 5 ? 'Excellent!' : 
                   rating === 4 ? 'Very Good!' :
                   rating === 3 ? 'Good!' :
                   rating === 2 ? 'Fair' : 'Poor'}
                </Text>
              )}
            </LinearGradient>
          </Animated.View>

          {/* Category Selection */}
          <Animated.View
            style={[
              styles.categorySection,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.sectionTitle}>What would you like to feedback about?</Text>
            <View style={styles.categoryGrid}>
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <TouchableOpacity
                    key={category.id}
                    style={[
                      styles.categoryCard,
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
                      <IconComponent size={24} color="#ffffff" />
                      <Text style={styles.categoryName}>{category.name}</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                );
              })}
            </View>
          </Animated.View>

          {/* Feedback Form */}
          <Animated.View
            style={[
              styles.feedbackSection,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.sectionTitle}>Tell us more</Text>
            <LinearGradient
              colors={['#1e1b4b', '#312e81']}
              style={styles.feedbackGradient}
            >
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Share your thoughts, suggestions, or report issues..."
                  placeholderTextColor="#9ca3af"
                  value={feedback}
                  onChangeText={setFeedback}
                  multiline
                  numberOfLines={6}
                  textAlignVertical="top"
                />
              </View>

              <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <LinearGradient
                  colors={['#10b981', '#059669']}
                  style={styles.submitGradient}
                >
                  <Send size={20} color="#ffffff" />
                  <Text style={styles.submitText}>Submit Feedback</Text>
                </LinearGradient>
              </TouchableOpacity>
            </LinearGradient>
          </Animated.View>

          {/* Quick Feedback */}
          <Animated.View
            style={[
              styles.quickFeedbackSection,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.sectionTitle}>Quick Feedback</Text>
            <View style={styles.quickFeedbackGrid}>
              <TouchableOpacity style={styles.quickFeedbackCard}>
                <LinearGradient
                  colors={['#10b981', '#059669']}
                  style={styles.quickFeedbackGradient}
                >
                  <ThumbsUp size={32} color="#ffffff" />
                  <Text style={styles.quickFeedbackText}>Love it!</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity style={styles.quickFeedbackCard}>
                <LinearGradient
                  colors={['#ef4444', '#dc2626']}
                  style={styles.quickFeedbackGradient}
                >
                  <ThumbsDown size={32} color="#ffffff" />
                  <Text style={styles.quickFeedbackText}>Needs Work</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity style={styles.quickFeedbackCard}>
                <LinearGradient
                  colors={['#8b5cf6', '#7c3aed']}
                  style={styles.quickFeedbackGradient}
                >
                  <Heart size={32} color="#ffffff" />
                  <Text style={styles.quickFeedbackText}>Amazing!</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity style={styles.quickFeedbackCard}>
                <LinearGradient
                  colors={['#f59e0b', '#d97706']}
                  style={styles.quickFeedbackGradient}
                >
                  <Star size={32} color="#ffffff" />
                  <Text style={styles.quickFeedbackText}>Excellent!</Text>
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
  ratingSection: {
    marginBottom: 30,
    borderRadius: 15,
    overflow: 'hidden',
  },
  ratingGradient: {
    padding: 30,
    alignItems: 'center',
  },
  ratingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  starButton: {
    marginHorizontal: 5,
  },
  ratingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffd700',
  },
  categorySection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
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
    fontSize: 12,
    textAlign: 'center',
  },
  feedbackSection: {
    marginBottom: 30,
  },
  feedbackGradient: {
    padding: 20,
    borderRadius: 15,
  },
  inputContainer: {
    backgroundColor: '#374151',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  textInput: {
    color: '#ffffff',
    fontSize: 16,
    height: 120,
    textAlignVertical: 'top',
  },
  submitButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  submitGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  submitText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  quickFeedbackSection: {
    marginBottom: 30,
  },
  quickFeedbackGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickFeedbackCard: {
    width: (width - 50) / 2,
    marginBottom: 15,
    borderRadius: 12,
    overflow: 'hidden',
  },
  quickFeedbackGradient: {
    padding: 20,
    alignItems: 'center',
    minHeight: 100,
    justifyContent: 'center',
  },
  quickFeedbackText: {
    color: '#ffffff',
    fontWeight: '600',
    marginTop: 8,
    fontSize: 14,
  },
});