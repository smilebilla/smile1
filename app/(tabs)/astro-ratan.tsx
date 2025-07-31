import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Send,
  Bot,
  User,
  Sparkles,
  MessageCircle,
  Star,
  Moon,
  Zap,
} from 'lucide-react-native';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function AstroRatanScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "🌟 Namaste! I'm Astro Ratan, your AI astrology guide. I can help you understand your birth chart, planetary influences, and provide personalized astrological insights. What would you like to explore today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const sendMessage = () => {
    if (inputText.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: inputText,
        isUser: true,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, userMessage]);
      setInputText('');

      // Simulate AI response
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: getAIResponse(inputText),
          isUser: false,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1500);

      // Scroll to bottom
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const getAIResponse = (input: string): string => {
    const responses = [
      "🌙 Based on your query, I sense strong lunar influences in your chart. The Moon's position suggests heightened intuition during this period. Would you like a detailed lunar analysis?",
      "⭐ The planetary alignments indicate favorable times for new ventures. Jupiter's benefic influence is particularly strong in your career sector. Shall we explore your professional prospects?",
      "🔮 Your birth chart reveals interesting patterns in the 7th house of relationships. Venus is well-positioned, suggesting harmonious partnerships ahead. Would you like relationship guidance?",
      "💫 The current Mercury retrograde affects your communication sector. It's an excellent time for reflection and revisiting past projects. How can I help you navigate this period?",
      "🌟 Your sun sign's ruling planet is creating powerful opportunities for personal growth. The upcoming full moon will amplify these energies. Shall we discuss timing strategies?",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const quickQuestions = [
    "What's my lucky number today?",
    "Tell me about my career prospects",
    "Relationship compatibility analysis",
    "Today's planetary influences",
    "Best time for important decisions",
    "Health predictions this month",
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0f0c29', '#24243e', '#302b63']}
        style={styles.gradient}
      >
        {/* Header */}
        <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
          <View style={styles.headerContent}>
            <View style={styles.botAvatar}>
              <LinearGradient
                colors={['#7c3aed', '#a855f7']}
                style={styles.avatarGradient}
              >
                <Bot size={24} color="#ffffff" />
              </LinearGradient>
            </View>
            <View>
              <Text style={styles.title}>Astro Ratan AI</Text>
              <View style={styles.statusContainer}>
                <View style={styles.onlineIndicator} />
                <Text style={styles.status}>Online • Ready to help</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.sparkleButton}>
            <Sparkles size={20} color="#ffd700" />
          </TouchableOpacity>
        </Animated.View>

        {/* Chat Messages */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((message, index) => (
            <View
              key={message.id}
              style={[
                styles.messageWrapper,
                message.isUser ? styles.userMessageWrapper : styles.aiMessageWrapper,
              ]}
            >
              {!message.isUser && (
                <View style={styles.aiAvatar}>
                  <Bot size={16} color="#7c3aed" />
                </View>
              )}
              <View
                style={[
                  styles.messageBubble,
                  message.isUser ? styles.userMessage : styles.aiMessage,
                ]}
              >
                <Text style={[
                  styles.messageText,
                  message.isUser ? styles.userMessageText : styles.aiMessageText,
                ]}>
                  {message.text}
                </Text>
                <Text style={styles.timestamp}>
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </Text>
              </View>
              {message.isUser && (
                <View style={styles.userAvatar}>
                  <User size={16} color="#ffd700" />
                </View>
              )}
            </View>
          ))}
        </ScrollView>

        {/* Quick Questions */}
        <View style={styles.quickQuestionsContainer}>
          <Text style={styles.quickQuestionsTitle}>Quick Questions</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {quickQuestions.map((question, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickQuestionChip}
                onPress={() => setInputText(question)}
              >
                <LinearGradient
                  colors={['#374151', '#4b5563']}
                  style={styles.chipGradient}
                >
                  <Text style={styles.chipText}>{question}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Input Section */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.inputContainer}
        >
          <View style={styles.inputWrapper}>
            <LinearGradient
              colors={['#1e1b4b', '#312e81']}
              style={styles.inputGradient}
            >
              <MessageCircle size={20} color="#8b5cf6" />
              <TextInput
                style={styles.textInput}
                placeholder="Ask Astro Ratan anything..."
                placeholderTextColor="#9ca3af"
                value={inputText}
                onChangeText={setInputText}
                multiline
                maxLength={500}
              />
              <TouchableOpacity
                style={styles.sendButton}
                onPress={sendMessage}
                disabled={!inputText.trim()}
              >
                <LinearGradient
                  colors={inputText.trim() ? ['#7c3aed', '#a855f7'] : ['#374151', '#4b5563']}
                  style={styles.sendGradient}
                >
                  <Send size={18} color="#ffffff" />
                </LinearGradient>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </KeyboardAvoidingView>
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
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  botAvatar: {
    marginRight: 12,
    borderRadius: 25,
    overflow: 'hidden',
  },
  avatarGradient: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  onlineIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10b981',
    marginRight: 6,
  },
  status: {
    fontSize: 12,
    color: '#10b981',
  },
  sparkleButton: {
    padding: 10,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  messageWrapper: {
    flexDirection: 'row',
    marginVertical: 8,
    alignItems: 'flex-end',
  },
  userMessageWrapper: {
    justifyContent: 'flex-end',
  },
  aiMessageWrapper: {
    justifyContent: 'flex-start',
  },
  aiAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#e0e7ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  userAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#fbbf24',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 15,
    borderRadius: 20,
  },
  userMessage: {
    backgroundColor: '#7c3aed',
    borderBottomRightRadius: 5,
  },
  aiMessage: {
    backgroundColor: '#374151',
    borderBottomLeftRadius: 5,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userMessageText: {
    color: '#ffffff',
  },
  aiMessageText: {
    color: '#ffffff',
  },
  timestamp: {
    fontSize: 11,
    color: '#9ca3af',
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  quickQuestionsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#374151',
  },
  quickQuestionsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#c4b5fd',
    marginBottom: 10,
  },
  quickQuestionChip: {
    marginRight: 10,
    borderRadius: 20,
    overflow: 'hidden',
  },
  chipGradient: {
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  chipText: {
    color: '#ffffff',
    fontSize: 12,
  },
  inputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  inputWrapper: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  inputGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  textInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
    marginHorizontal: 10,
    maxHeight: 100,
  },
  sendButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  sendGradient: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});