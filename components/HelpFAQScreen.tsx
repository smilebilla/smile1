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
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  CircleHelp as HelpCircle,
  Search,
  ChevronDown,
  ChevronUp,
  BookOpen,
  MessageCircle,
  Phone,
  Mail,
  X,
  Sparkles,
  Star,
  Moon,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface HelpFAQScreenProps {
  onClose: () => void;
}

export default function HelpFAQScreen({ onClose }: HelpFAQScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('general');

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
    { id: 'general', name: 'General', icon: HelpCircle },
    { id: 'reports', name: 'Reports', icon: BookOpen },
    { id: 'payments', name: 'Payments', icon: MessageCircle },
    { id: 'technical', name: 'Technical', icon: Phone },
  ];

  const faqs = {
    general: [
      {
        id: '1',
        question: 'What is CorpAstro?',
        answer: 'CorpAstro is a comprehensive astrology app that provides personalized horoscopes, birth chart analysis, business astrology, and expert consultations using ancient Vedic astrology principles.',
      },
      {
        id: '2',
        question: 'How accurate are your predictions?',
        answer: 'Our predictions are based on authentic Vedic astrology calculations with an accuracy rate of 85-90%. However, astrology is a guidance tool and should be used alongside practical decision-making.',
      },
      {
        id: '3',
        question: 'Do I need to provide exact birth time?',
        answer: 'Yes, exact birth time is crucial for accurate chart calculations. Even a few minutes difference can change your ascendant and house positions, affecting the accuracy of predictions.',
      },
    ],
    reports: [
      {
        id: '4',
        question: 'How long does it take to generate a report?',
        answer: 'Standard reports are generated instantly, while premium detailed reports take 24-48 hours as they are personally reviewed by our expert astrologers.',
      },
      {
        id: '5',
        question: 'Can I download my reports?',
        answer: 'Yes, all reports can be downloaded as PDF files and are stored in your account for lifetime access.',
      },
      {
        id: '6',
        question: 'What\'s the difference between standard and premium reports?',
        answer: 'Premium reports include detailed analysis, remedies, gemstone recommendations, and are personally reviewed by expert astrologers. Standard reports are computer-generated with basic interpretations.',
      },
    ],
    payments: [
      {
        id: '7',
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit/debit cards, UPI, net banking, and digital wallets. All payments are processed securely through encrypted gateways.',
      },
      {
        id: '8',
        question: 'Do you offer refunds?',
        answer: 'Yes, we offer a 100% money-back guarantee within 7 days if you\'re not satisfied with our services. Refunds are processed within 5-7 business days.',
      },
      {
        id: '9',
        question: 'Are there any hidden charges?',
        answer: 'No, we believe in transparent pricing. All charges are clearly mentioned upfront with no hidden fees or automatic renewals without consent.',
      },
    ],
    technical: [
      {
        id: '10',
        question: 'Is my data secure?',
        answer: 'Yes, we use bank-grade encryption to protect your personal information. Your birth details and personal data are stored securely and never shared with third parties.',
      },
      {
        id: '11',
        question: 'Can I use the app offline?',
        answer: 'Some features like viewing downloaded reports work offline, but most features require internet connection for real-time calculations and updates.',
      },
      {
        id: '12',
        question: 'Which devices are supported?',
        answer: 'CorpAstro works on iOS, Android, and web browsers. We regularly update the app to support the latest operating system versions.',
      },
    ],
  };

  const filteredFAQs = faqs[selectedCategory as keyof typeof faqs].filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <Text style={styles.title}>Help & FAQ</Text>
          <View style={styles.placeholder} />
        </Animated.View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Search Bar */}
          <Animated.View
            style={[
              styles.searchSection,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <LinearGradient
              colors={['#1e1b4b', '#312e81']}
              style={styles.searchGradient}
            >
              <Search size={20} color="#8b5cf6" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search for help..."
                placeholderTextColor="#9ca3af"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </LinearGradient>
          </Animated.View>

          {/* Categories */}
          <Animated.View
            style={[
              styles.categoriesSection,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {categories.map((category) => {
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
                      <IconComponent size={18} color="#ffffff" />
                      <Text style={styles.categoryText}>{category.name}</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </Animated.View>

          {/* FAQ List */}
          <Animated.View
            style={[
              styles.faqSection,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
            {filteredFAQs.map((faq) => (
              <View key={faq.id} style={styles.faqCard}>
                <LinearGradient
                  colors={['#1e1b4b', '#312e81']}
                  style={styles.faqGradient}
                >
                  <TouchableOpacity
                    style={styles.faqHeader}
                    onPress={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                  >
                    <Text style={styles.faqQuestion}>{faq.question}</Text>
                    {expandedFAQ === faq.id ? (
                      <ChevronUp size={20} color="#8b5cf6" />
                    ) : (
                      <ChevronDown size={20} color="#8b5cf6" />
                    )}
                  </TouchableOpacity>
                  {expandedFAQ === faq.id && (
                    <View style={styles.faqAnswer}>
                      <Text style={styles.faqAnswerText}>{faq.answer}</Text>
                    </View>
                  )}
                </LinearGradient>
              </View>
            ))}
          </Animated.View>

          {/* Contact Support */}
          <Animated.View
            style={[
              styles.supportSection,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.sectionTitle}>Still Need Help?</Text>
            <View style={styles.supportGrid}>
              <TouchableOpacity style={styles.supportCard}>
                <LinearGradient
                  colors={['#10b981', '#059669']}
                  style={styles.supportGradient}
                >
                  <MessageCircle size={24} color="#ffffff" />
                  <Text style={styles.supportTitle}>Live Chat</Text>
                  <Text style={styles.supportSubtitle}>Chat with our support team</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity style={styles.supportCard}>
                <LinearGradient
                  colors={['#3b82f6', '#2563eb']}
                  style={styles.supportGradient}
                >
                  <Mail size={24} color="#ffffff" />
                  <Text style={styles.supportTitle}>Email Support</Text>
                  <Text style={styles.supportSubtitle}>Get help via email</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity style={styles.supportCard}>
                <LinearGradient
                  colors={['#ef4444', '#dc2626']}
                  style={styles.supportGradient}
                >
                  <Phone size={24} color="#ffffff" />
                  <Text style={styles.supportTitle}>Phone Support</Text>
                  <Text style={styles.supportSubtitle}>Call our helpline</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity style={styles.supportCard}>
                <LinearGradient
                  colors={['#8b5cf6', '#7c3aed']}
                  style={styles.supportGradient}
                >
                  <BookOpen size={24} color="#ffffff" />
                  <Text style={styles.supportTitle}>User Guide</Text>
                  <Text style={styles.supportSubtitle}>Browse our documentation</Text>
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
  searchSection: {
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  searchGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
    marginLeft: 10,
  },
  categoriesSection: {
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
  faqSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  faqCard: {
    marginBottom: 15,
    borderRadius: 12,
    overflow: 'hidden',
  },
  faqGradient: {
    padding: 15,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    flex: 1,
    marginRight: 10,
  },
  faqAnswer: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#374151',
  },
  faqAnswerText: {
    fontSize: 14,
    color: '#c4b5fd',
    lineHeight: 20,
  },
  supportSection: {
    marginBottom: 30,
  },
  supportGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  supportCard: {
    width: (width - 50) / 2,
    marginBottom: 15,
    borderRadius: 12,
    overflow: 'hidden',
  },
  supportGradient: {
    padding: 20,
    alignItems: 'center',
    minHeight: 100,
    justifyContent: 'center',
  },
  supportTitle: {
    color: '#ffffff',
    fontWeight: '600',
    marginTop: 8,
    fontSize: 14,
  },
  supportSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 10,
    marginTop: 4,
    textAlign: 'center',
  },
});