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
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  User,
  X,
  Sparkles,
  Star,
  Moon,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface ContactUsScreenProps {
  onClose: () => void;
}

export default function ContactUsScreen({ onClose }: ContactUsScreenProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

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

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    Alert.alert('Success', 'Your message has been sent successfully!');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      value: '+91 98765 43210',
      description: 'Available 24/7 for support',
      color: '#10b981',
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'support@corpastro.com',
      description: 'We reply within 2 hours',
      color: '#3b82f6',
    },
    {
      icon: MapPin,
      title: 'Address',
      value: 'Mumbai, Maharashtra, India',
      description: 'Visit our office',
      color: '#ef4444',
    },
    {
      icon: Clock,
      title: 'Working Hours',
      value: '24/7 Available',
      description: 'Round the clock support',
      color: '#f59e0b',
    },
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
          <Text style={styles.title}>Contact Us</Text>
          <View style={styles.placeholder} />
        </Animated.View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Contact Information */}
          <Animated.View
            style={[
              styles.contactInfoSection,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.sectionTitle}>Get in Touch</Text>
            <View style={styles.contactGrid}>
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <View key={index} style={styles.contactCard}>
                    <LinearGradient
                      colors={['#1e1b4b', '#312e81']}
                      style={styles.contactGradient}
                    >
                      <View style={[styles.contactIcon, { backgroundColor: `${info.color}20` }]}>
                        <IconComponent size={24} color={info.color} />
                      </View>
                      <Text style={styles.contactTitle}>{info.title}</Text>
                      <Text style={styles.contactValue}>{info.value}</Text>
                      <Text style={styles.contactDescription}>{info.description}</Text>
                    </LinearGradient>
                  </View>
                );
              })}
            </View>
          </Animated.View>

          {/* Contact Form */}
          <Animated.View
            style={[
              styles.formSection,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.sectionTitle}>Send us a Message</Text>
            <LinearGradient
              colors={['#1e1b4b', '#312e81']}
              style={styles.formGradient}
            >
              <View style={styles.inputContainer}>
                <User size={20} color="#8b5cf6" />
                <TextInput
                  style={styles.textInput}
                  placeholder="Full Name *"
                  placeholderTextColor="#9ca3af"
                  value={formData.name}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
                />
              </View>

              <View style={styles.inputContainer}>
                <Mail size={20} color="#8b5cf6" />
                <TextInput
                  style={styles.textInput}
                  placeholder="Email Address *"
                  placeholderTextColor="#9ca3af"
                  value={formData.email}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
                  keyboardType="email-address"
                />
              </View>

              <View style={styles.inputContainer}>
                <Phone size={20} color="#8b5cf6" />
                <TextInput
                  style={styles.textInput}
                  placeholder="Phone Number"
                  placeholderTextColor="#9ca3af"
                  value={formData.phone}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, phone: text }))}
                  keyboardType="phone-pad"
                />
              </View>

              <View style={styles.inputContainer}>
                <MessageCircle size={20} color="#8b5cf6" />
                <TextInput
                  style={styles.textInput}
                  placeholder="Subject"
                  placeholderTextColor="#9ca3af"
                  value={formData.subject}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, subject: text }))}
                />
              </View>

              <View style={[styles.inputContainer, styles.messageContainer]}>
                <TextInput
                  style={[styles.textInput, styles.messageInput]}
                  placeholder="Your Message *"
                  placeholderTextColor="#9ca3af"
                  value={formData.message}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, message: text }))}
                  multiline
                  numberOfLines={5}
                  textAlignVertical="top"
                />
              </View>

              <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <LinearGradient
                  colors={['#7c3aed', '#a855f7']}
                  style={styles.submitGradient}
                >
                  <Send size={20} color="#ffffff" />
                  <Text style={styles.submitText}>Send Message</Text>
                </LinearGradient>
              </TouchableOpacity>
            </LinearGradient>
          </Animated.View>

          {/* FAQ Section */}
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
            <LinearGradient
              colors={['#1e1b4b', '#312e81']}
              style={styles.faqGradient}
            >
              {[
                {
                  question: 'How accurate are your predictions?',
                  answer: 'Our predictions are based on ancient Vedic astrology principles with 85-90% accuracy rate.',
                },
                {
                  question: 'Do you offer refunds?',
                  answer: 'Yes, we offer 100% money-back guarantee if you are not satisfied with our services.',
                },
                {
                  question: 'How long does it take to get a report?',
                  answer: 'Standard reports are delivered within 24 hours, while premium reports take 2-3 days.',
                },
                {
                  question: 'Can I get consultation in my language?',
                  answer: 'Yes, our experts speak Hindi, English, and several regional languages.',
                },
              ].map((faq, index) => (
                <View key={index} style={styles.faqItem}>
                  <Text style={styles.faqQuestion}>{faq.question}</Text>
                  <Text style={styles.faqAnswer}>{faq.answer}</Text>
                </View>
              ))}
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
  contactInfoSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  contactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  contactCard: {
    width: (width - 50) / 2,
    marginBottom: 15,
    borderRadius: 12,
    overflow: 'hidden',
  },
  contactGradient: {
    padding: 15,
    alignItems: 'center',
    minHeight: 120,
    justifyContent: 'center',
  },
  contactIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  contactTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  contactValue: {
    fontSize: 12,
    color: '#ffd700',
    marginBottom: 5,
    textAlign: 'center',
  },
  contactDescription: {
    fontSize: 10,
    color: '#c4b5fd',
    textAlign: 'center',
  },
  formSection: {
    marginBottom: 30,
  },
  formGradient: {
    padding: 20,
    borderRadius: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#374151',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
  },
  messageContainer: {
    alignItems: 'flex-start',
    paddingTop: 15,
  },
  textInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
    marginLeft: 10,
  },
  messageInput: {
    height: 100,
    marginLeft: 0,
  },
  submitButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 10,
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
  faqSection: {
    marginBottom: 30,
  },
  faqGradient: {
    padding: 20,
    borderRadius: 15,
  },
  faqItem: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#c4b5fd',
    lineHeight: 20,
  },
});