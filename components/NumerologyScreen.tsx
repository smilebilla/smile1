import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Calculator,
  User,
  Calendar,
  Hash,
  Star,
  TrendingUp,
  Heart,
  Briefcase,
  X,
  Search,
} from 'lucide-react-native';

interface NumerologyScreenProps {
  onClose: () => void;
}

export default function NumerologyScreen({ onClose }: NumerologyScreenProps) {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [results, setResults] = useState<any>(null);

  const calculateNumerology = () => {
    if (!name.trim() || !birthDate.trim()) {
      Alert.alert('Error', 'Please enter both name and birth date');
      return;
    }

    // Simple numerology calculations (for demo purposes)
    const nameValue = name.toLowerCase().split('').reduce((sum, char) => {
      const charCode = char.charCodeAt(0);
      if (charCode >= 97 && charCode <= 122) {
        return sum + (charCode - 96);
      }
      return sum;
    }, 0);

    const lifePathNumber = birthDate.split('').reduce((sum, digit) => {
      return sum + (isNaN(parseInt(digit)) ? 0 : parseInt(digit));
    }, 0);

    const finalLifePath = reduceToSingleDigit(lifePathNumber);
    const finalName = reduceToSingleDigit(nameValue);

    setResults({
      lifePathNumber: finalLifePath,
      nameNumber: finalName,
      soulNumber: reduceToSingleDigit(nameValue + lifePathNumber),
      personalityNumber: reduceToSingleDigit(Math.abs(nameValue - lifePathNumber)),
    });
  };

  const reduceToSingleDigit = (num: number): number => {
    while (num > 9) {
      num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    }
    return num;
  };

  const getNumberMeaning = (number: number, type: string) => {
    const meanings: { [key: string]: { [key: number]: string } } = {
      lifePath: {
        1: "Natural leader, independent, pioneering spirit",
        2: "Cooperative, diplomatic, peacemaker",
        3: "Creative, expressive, optimistic",
        4: "Practical, organized, hardworking",
        5: "Adventurous, freedom-loving, versatile",
        6: "Nurturing, responsible, family-oriented",
        7: "Analytical, spiritual, introspective",
        8: "Ambitious, material success, business-minded",
        9: "Humanitarian, generous, idealistic"
      },
      name: {
        1: "Leadership qualities, originality",
        2: "Sensitivity, cooperation",
        3: "Artistic talents, communication",
        4: "Stability, reliability",
        5: "Freedom, adventure",
        6: "Caring, healing abilities",
        7: "Wisdom, research abilities",
        8: "Executive abilities, material success",
        9: "Universal love, service to others"
      }
    };

    return meanings[type]?.[number] || "Unique spiritual path";
  };

  const numerologyCards = [
    {
      title: 'Life Path Number',
      key: 'lifePathNumber',
      icon: TrendingUp,
      color: ['#7c3aed', '#a855f7'],
      description: 'Your life purpose and journey'
    },
    {
      title: 'Name Number',
      key: 'nameNumber',
      icon: User,
      color: ['#10b981', '#059669'],
      description: 'Your personality and talents'
    },
    {
      title: 'Soul Number',
      key: 'soulNumber',
      icon: Heart,
      color: ['#ef4444', '#dc2626'],
      description: 'Your inner desires and motivations'
    },
    {
      title: 'Personality Number',
      key: 'personalityNumber',
      icon: Star,
      color: ['#f59e0b', '#d97706'],
      description: 'How others perceive you'
    }
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1a1625', '#2d1b69', '#4c1d95']}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.title}>Numerology Calculator</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Input Section */}
          <View style={styles.inputSection}>
            <LinearGradient
              colors={['#1e1b4b', '#312e81']}
              style={styles.inputGradient}
            >
              <Text style={styles.inputTitle}>Enter Your Details</Text>
              
              <View style={styles.inputContainer}>
                <User size={20} color="#8b5cf6" />
                <TextInput
                  style={styles.textInput}
                  placeholder="Full Name"
                  placeholderTextColor="#9ca3af"
                  value={name}
                  onChangeText={setName}
                />
              </View>

              <View style={styles.inputContainer}>
                <Calendar size={20} color="#8b5cf6" />
                <TextInput
                  style={styles.textInput}
                  placeholder="Birth Date (DD/MM/YYYY)"
                  placeholderTextColor="#9ca3af"
                  value={birthDate}
                  onChangeText={setBirthDate}
                />
              </View>

              <TouchableOpacity style={styles.calculateButton} onPress={calculateNumerology}>
                <LinearGradient
                  colors={['#7c3aed', '#a855f7']}
                  style={styles.calculateGradient}
                >
                  <Calculator size={20} color="#ffffff" />
                  <Text style={styles.calculateText}>Calculate Numbers</Text>
                </LinearGradient>
              </TouchableOpacity>
            </LinearGradient>
          </View>

          {/* Results Section */}
          {results && (
            <View style={styles.resultsSection}>
              <Text style={styles.sectionTitle}>Your Numerology Profile</Text>
              
              {numerologyCards.map((card, index) => {
                const IconComponent = card.icon;
                const number = results[card.key];
                
                return (
                  <View key={index} style={styles.resultCard}>
                    <LinearGradient
                      colors={card.color}
                      style={styles.resultGradient}
                    >
                      <View style={styles.resultHeader}>
                        <View style={styles.resultIcon}>
                          <IconComponent size={24} color="#ffffff" />
                        </View>
                        <View style={styles.resultInfo}>
                          <Text style={styles.resultTitle}>{card.title}</Text>
                          <Text style={styles.resultDescription}>{card.description}</Text>
                        </View>
                        <View style={styles.numberBadge}>
                          <Text style={styles.numberText}>{number}</Text>
                        </View>
                      </View>
                      
                      <Text style={styles.meaningText}>
                        {getNumberMeaning(number, card.key === 'lifePathNumber' ? 'lifePath' : 'name')}
                      </Text>
                    </LinearGradient>
                  </View>
                );
              })}

              {/* Compatibility Section */}
              <View style={styles.compatibilitySection}>
                <Text style={styles.sectionTitle}>Number Compatibility</Text>
                <LinearGradient
                  colors={['#1e1b4b', '#312e81']}
                  style={styles.compatibilityGradient}
                >
                  <Text style={styles.compatibilityTitle}>Most Compatible Numbers</Text>
                  <View style={styles.compatibilityNumbers}>
                    {[1, 3, 5, 7, 9].map((num, index) => (
                      <View key={index} style={styles.compatibilityNumber}>
                        <Text style={styles.compatibilityText}>{num}</Text>
                      </View>
                    ))}
                  </View>
                  
                  <Text style={styles.compatibilityTitle}>Challenging Numbers</Text>
                  <View style={styles.compatibilityNumbers}>
                    {[2, 4, 6, 8].map((num, index) => (
                      <View key={index} style={[styles.compatibilityNumber, styles.challengingNumber]}>
                        <Text style={styles.compatibilityText}>{num}</Text>
                      </View>
                    ))}
                  </View>
                </LinearGradient>
              </View>

              {/* Lucky Elements */}
              <View style={styles.luckySection}>
                <Text style={styles.sectionTitle}>Lucky Elements</Text>
                <View style={styles.luckyGrid}>
                  <View style={styles.luckyItem}>
                    <Hash size={20} color="#ffd700" />
                    <Text style={styles.luckyLabel}>Lucky Day</Text>
                    <Text style={styles.luckyValue}>Sunday</Text>
                  </View>
                  <View style={styles.luckyItem}>
                    <Star size={20} color="#ffd700" />
                    <Text style={styles.luckyLabel}>Lucky Color</Text>
                    <Text style={styles.luckyValue}>Gold</Text>
                  </View>
                  <View style={styles.luckyItem}>
                    <TrendingUp size={20} color="#ffd700" />
                    <Text style={styles.luckyLabel}>Lucky Stone</Text>
                    <Text style={styles.luckyValue}>Ruby</Text>
                  </View>
                  <View style={styles.luckyItem}>
                    <Briefcase size={20} color="#ffd700" />
                    <Text style={styles.luckyLabel}>Career Field</Text>
                    <Text style={styles.luckyValue}>Leadership</Text>
                  </View>
                </View>
              </View>
            </View>
          )}
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
    fontSize: 20,
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
  inputSection: {
    marginBottom: 30,
    borderRadius: 15,
    overflow: 'hidden',
  },
  inputGradient: {
    padding: 20,
  },
  inputTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
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
  textInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
    marginLeft: 10,
  },
  calculateButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 10,
  },
  calculateGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  calculateText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  resultsSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  resultCard: {
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
  },
  resultGradient: {
    padding: 20,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  resultIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  resultInfo: {
    flex: 1,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  resultDescription: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  numberBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  meaningText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 20,
  },
  compatibilitySection: {
    marginBottom: 20,
  },
  compatibilityGradient: {
    padding: 20,
    borderRadius: 15,
  },
  compatibilityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  compatibilityNumbers: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  compatibilityNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#10b981',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginBottom: 10,
  },
  challengingNumber: {
    backgroundColor: '#ef4444',
  },
  compatibilityText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  luckySection: {
    marginBottom: 30,
  },
  luckyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  luckyItem: {
    width: '48%',
    backgroundColor: '#374151',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  luckyLabel: {
    fontSize: 12,
    color: '#8b5cf6',
    marginTop: 8,
    marginBottom: 5,
  },
  luckyValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});