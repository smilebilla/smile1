// All imports remain the same...
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, FlatList, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ButtonIcon from '../../components/buttons/ButtonIcon';
import { PrimaryHeader } from '../../components/composite/navigation/header/PrimaryHeader';
import { CARD_GLASS_PRESET, createGlassMorphismStyle } from '../../components/foundations/effects/GlassMorphism';
import { useTheme } from '../../components/foundations/themes/useTheme';
import AnimatedCard from '../../components/MobileApp/AnimatedCard';
import CosmicBackground from '../../components/MobileApp/CosmicBackground';

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  type: 'text' | 'chart' | 'insight';
  chartData?: any;
}

const AIChartScreen: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const typingAnim = useRef(new Animated.Value(0)).current;

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Hello! I'm Astro Ratan AI, your personal astrological assistant. I can help you with birth charts, compatibility analysis, daily horoscopes, and cosmic guidance. What would you like to explore today? ⭐",
      isUser: false,
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(true);

  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const quickReplies = [
    "Generate my birth chart",
    "Compatibility analysis",
    "Daily horoscope",
    "Career guidance"
  ];

  const generateAIResponse = async (userMessage: string) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 2000));

    let aiResponse = '';
    let responseType: 'text' | 'chart' | 'insight' = 'text';
    let chartData = null;

    if (userMessage.toLowerCase().includes('birth chart') || userMessage.toLowerCase().includes('natal')) {
      aiResponse = "I'll generate your birth chart! Based on your birth details, here's your cosmic blueprint:";
      responseType = 'chart';
      chartData = {
        sunSign: 'Leo',
        moonSign: 'Cancer',
        risingSign: 'Virgo',
        dominantElement: 'Fire',
        keyPlanets: ['Sun in Leo', 'Moon in Cancer', 'Mercury in Virgo'],
        houses: '1st House: Virgo, 2nd House: Libra, 3rd House: Scorpio'
      };
    } else if (userMessage.toLowerCase().includes('compatibility') || userMessage.toLowerCase().includes('love')) {
      aiResponse = "Let me analyze your compatibility! Here's what the stars reveal about your relationship dynamics:";
      responseType = 'insight';
      chartData = {
        compatibility: '85%',
        strengths: ['Emotional connection', 'Shared values', 'Communication'],
        challenges: ['Different communication styles'],
        advice: 'Focus on open communication and understanding each other\'s needs.'
      };
    } else if (userMessage.toLowerCase().includes('horoscope') || userMessage.toLowerCase().includes('daily')) {
      aiResponse = "Here's your daily cosmic forecast: Today is perfect for new beginnings! The Moon in Aries brings courage and initiative.";
    } else if (userMessage.toLowerCase().includes('career') || userMessage.toLowerCase().includes('job')) {
      aiResponse = "Based on your astrological profile, your career path is influenced by your strong Leo Sun and Virgo Rising.";
    } else if (userMessage.toLowerCase().includes('transit') || userMessage.toLowerCase().includes('planetary')) {
      aiResponse = "Current planetary transits affecting you: Jupiter is transiting your 10th house, bringing career opportunities.";
    } else {
      aiResponse = "I understand you're asking about " + userMessage + ". Let me provide you with personalized astrological insights.";
    }

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text: aiResponse,
      isUser: false,
      timestamp: new Date(),
      type: responseType,
      chartData
    };

    setMessages(prev => [...prev, newMessage]);
    setIsTyping(false);
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    await generateAIResponse(inputText);
  };

  const renderMessage = ({ item }: { item: ChatMessage }) => (
    <AnimatedCard style={{ marginBottom: 12 }}>
      <View style={[
        glassCardStyle,
        {
          padding: 16,
          borderRadius: 16,
          marginLeft: item.isUser ? 40 : 0,
          marginRight: item.isUser ? 0 : 40,
          backgroundColor: item.isUser ? String(colors.brand.primary) + '20' : 'rgba(255, 255, 255, 0.05)',
        }
      ]}>
        <View style={styles.messageHeader}>
          <View style={styles.messageIcon}>
            <MaterialCommunityIcons
              name={item.isUser ? 'account' : 'robot'}
              size={20}
              color={item.isUser ? colors.brand.primary : colors.mystical.royal}
            />
          </View>
          <Text style={[styles.messageTime, { color: colors.neutral.medium }]}>
            {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>
        <Text style={[styles.messageText, { color: colors.neutral.light }]}>
          {item.text}
        </Text>
      </View>
    </AnimatedCard>
  );

  const glassCardStyle = createGlassMorphismStyle(CARD_GLASS_PRESET);

  return (
    <View style={{ flex: 1, backgroundColor: colors.cosmos.deep }}>
      <CosmicBackground />
      <SafeAreaView style={{ flex: 1 }}>
        <PrimaryHeader
          title="🤖 Astro Ratan AI"
          backgroundColor="transparent"
          height="custom"
          customHeight={55}
          shadow={false}
          blur={false}
          animated
          leftButton={{
            id: 'back',
            icon: (
              <ButtonIcon onPress={() => navigation.goBack()} style={{ marginLeft: -15 }}>
                <Text style={{ fontSize: 25, marginTop: -7, color: colors.brand.primary }}>←</Text>
              </ButtonIcon>
            ),
            onPress: () => navigation.goBack(),
            accessibilityLabel: 'Back',
          }}
          rightButtons={[
            {
              id: 'menu',
              icon: (
                <ButtonIcon onPress={() => {}} style={{ marginRight: -8 }}>
                  <MaterialCommunityIcons
                    name="dots-horizontal"
                    size={24}
                    color={colors.brand.primary}
                  />
                </ButtonIcon>
              ),
              onPress: () => {},
              accessibilityLabel: 'Menu',
            },
          ]}
        />

        <Animated.View style={{ flex: 1, opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <FlatList
              ref={flatListRef}
              data={messages}
              keyExtractor={item => item.id}
              renderItem={renderMessage}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: messages.length === 1 ? 220 : 140, paddingTop: 20 }}
              onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
              ListFooterComponent={
                isTyping ? (
                  <AnimatedCard style={{ marginBottom: 12 }}>
                    <View style={[glassCardStyle, { padding: 16, borderRadius: 16, marginRight: 40 }]}>
                      <View style={styles.typingIndicator}>
                        <Animated.View style={styles.typingDot} />
                        <Animated.View style={styles.typingDot} />
                        <Animated.View style={styles.typingDot} />
                      </View>
                      <Text style={[styles.typingText, { color: colors.neutral.medium }]}>
                        Astro Ratan AI is typing...
                      </Text>
                    </View>
                  </AnimatedCard>
                ) : null
              }
            />

            {/* QUICK START SECTION FIXED BELOW */}
            {messages.length === 1 && (
              <View style={{ paddingHorizontal: 16, paddingTop: 10, marginBottom: 90 }}>
                <Text style={[styles.quickRepliesTitle, { color: colors.brand.primary }]}>
                  Quick Start:
                </Text>
                <View style={styles.quickRepliesGrid}>
                  {quickReplies.map((reply) => (
                    <TouchableOpacity
                      key={reply}
                      style={styles.quickReplyButton}
                      onPress={() => {
                        setInputText(reply);
                        setTimeout(() => sendMessage(), 100);
                      }}
                    >
                      <Text style={[styles.quickReplyText, { color: colors.brand.primary }]}>
                        {reply}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            <View style={styles.inputContainer}>
              <View style={[glassCardStyle, { padding: 16, borderRadius: 20 }]}>
                <View style={styles.inputRow}>
                  <TextInput
                    style={[styles.textInput, { color: colors.neutral.light }]}
                    placeholder="Ask Astro Ratan AI anything..."
                    placeholderTextColor={colors.neutral.medium}
                    value={inputText}
                    onChangeText={setInputText}
                    multiline
                    maxLength={500}
                  />
                  <TouchableOpacity
                    style={[
                      styles.sendButton,
                      { backgroundColor: inputText.trim() ? colors.brand.primary : colors.cosmos.medium },
                    ]}
                    onPress={sendMessage}
                    disabled={!inputText.trim()}
                  >
                    <MaterialCommunityIcons
                      name="send"
                      size={20}
                      color={inputText.trim() ? "#fff" : colors.neutral.medium}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  messageHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  messageIcon: { width: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 8 },
  messageTime: { fontSize: 12 },
  messageText: { fontSize: 16, lineHeight: 22 },
  typingIndicator: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  typingDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#fff', marginRight: 4 },
  typingText: { fontSize: 14, fontStyle: 'italic' },
  inputContainer: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 16, paddingBottom: 24 },
  inputRow: { flexDirection: 'row', alignItems: 'flex-end' },
  textInput: { flex: 1, fontSize: 16, maxHeight: 100, paddingVertical: 8, paddingHorizontal: 12 },
  sendButton: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginLeft: 8 },
  quickRepliesTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 8 },
  quickRepliesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  quickReplyButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    minWidth: '45%',
    marginBottom: 8,
  },
  quickReplyText: { fontSize: 14 },
});

export default AIChartScreen;