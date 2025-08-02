import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft } from 'lucide-react-native';
import React, { useEffect, useRef } from 'react';
import { Animated, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PrimaryHeader } from '../../components/composite/navigation/header/PrimaryHeader';
import { CARD_GLASS_PRESET, createGlassMorphismStyle } from '../../components/foundations/effects/GlassMorphism';
import { useTheme } from '../../components/foundations/themes/useTheme';
import { fontSizes } from '../../components/foundations/tokens';
import AnimatedCard from '../../components/MobileApp/AnimatedCard';
import CosmicBackground from '../../components/MobileApp/CosmicBackground';
import Statusbar from '../../components/MobileApp/Statusbar';

const ChartsTab: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Entrance animation
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
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  const astrologyCategories = [
    {
      id: 'Lahari',
      title: 'Lahari',
      description: 'Your astrological portrait revealing your talents, strengths and weaknesses',
      icon: 'zodiac-sagittarius',
      gradientColors: ['#43BBFF','#735DC7'],
      image: require('../../../assets/images/horoscope.png'),
    },
    {
      id: 'Ramana',
      title: 'Ramana',
      description: 'Find out your past, future and present by the lines on your palm',
      icon: 'hand-extended',
      gradientColors: ['#800080','#ffc0cb'],
      image: require('../../../assets/images/astrology.png'),
    },
    {
      id: 'KP',
      title: 'KP',
      description: 'Increase your knowledge about yourself by reading articles and taking tests',
      icon: 'meditation',
      gradientColors: ['#16C5C5','#2DA3FF'],
      image: require('../../../assets/images/chiromancy.png'),
    },
    {
      id: 'Numerology',
      title: 'Numerology',
      description: 'Find out is close your compatibility with other zodiac signs',
      icon: 'heart-multiple',
      gradientColors: ['#8F00FF','#FFF'],
      image: require('../../../assets/images/numerology.png'),
    },
  ];

  const glassCardStyle = createGlassMorphismStyle(CARD_GLASS_PRESET);

  const renderCategoryCard = ({ item, index }: { item: any; index: number }) => (
    <AnimatedCard style={{ marginBottom: 20 }}>
      <TouchableOpacity 
        style={[styles.categoryCard]}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={item.gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.gradientCard, glassCardStyle]}
        >
          <View style={styles.cardContent}>
            <View style={styles.textSection}>
              <Text style={styles.categoryTitle}>
                {item.title}
              </Text>
              <Text style={styles.categoryDescription}>
                {item.description}
              </Text>
            </View>
            
                         <View style={styles.illustrationSection}>
               <View style={styles.illustrationContainer}>
                 {item.image ? (
                   <Image 
                     source={item.image} 
                     style={styles.illustrationImage}
                     resizeMode="contain"
                   />
                 ) : (
                   <Text style={styles.illustrationText}>
                     {item.illustration}
                   </Text>
                 )}
               </View>
             </View>
          </View>
          
                     <View style={styles.cardFooter}>
             <View style={styles.arrowContainer}>
               <MaterialCommunityIcons 
                 name="arrow-right" 
                 size={20} 
                 color="rgba(255, 255, 255, 0.9)" 
               />
             </View>
           </View>
        </LinearGradient>
      </TouchableOpacity>
    </AnimatedCard>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.cosmos.deep }}>
      <Statusbar />
      <CosmicBackground />
      <SafeAreaView style={{ flex: 1 }}>
        <PrimaryHeader
          title={
            <Text style={{ fontSize: fontSizes.h3.size, fontWeight: '600', color: '#FFFFFF' }}>
              Astrology
            </Text>
          }
          backgroundColor="transparent"
          height="custom"
          customHeight={55}
          shadow={false}
          blur={false}
          animated
          leftButton={{
            id: 'back',
            icon: (
              <TouchableOpacity
                onPress={handleBack}
                style={{
                  height: 36,
                  width: 36,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 18,
                  backgroundColor: 'rgba(148, 163, 184, 0.1)',
                  marginLeft: -15
                }}
              >
                <ArrowLeft size={24} color="#CBD5E1" />
              </TouchableOpacity>
            ),
            onPress: handleBack,
            accessibilityLabel: 'Back',
          }}
        />

        <Animated.View
          style={[
            { flex: 1 },
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <FlatList
            data={astrologyCategories}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 100 }}
            renderItem={renderCategoryCard}
          />
        </Animated.View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryCard: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  gradientCard: {
    padding: 24,
    minHeight: 140,
    justifyContent: 'space-between',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  textSection: {
    flex: 1,
    paddingRight: 16,
  },
  categoryTitle: {
    fontSize: fontSizes.h4.size,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  categoryDescription: {
    fontSize: fontSizes.small.size,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: fontSizes.small.lineHeight * fontSizes.small.size,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  illustrationSection: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustrationContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustrationText: {
    fontSize: 32,
    textAlign: 'center',
  },
  illustrationImage: {
    width:110,
    height: 140,
    borderRadius: 50,
    marginTop: 50,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 16,
  },
  arrowContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChartsTab;