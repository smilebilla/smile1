import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../components/foundations/themes/useTheme';
import CustomCard from './CustomCard';

const SCREEN_WIDTH = Dimensions.get('window').width;

const CosmicWeather: React.FC = () => {
  const { colors } = useTheme();

  return (
    <CustomCard title="🌤️ Weather">
      <LinearGradient
        colors={['#D8B5FF', '#1EAE98']} // dreamy lavender to cosmic teal
        style={styles.gradientCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.row}>
          <Image
            source={require('../../../assets/images/moon.png')}
            style={styles.image}
            resizeMode="cover"
          />

          <View style={styles.textContainer}>
            <Text style={[styles.title, { color: colors.neutral.light }]}>Cosmic Weather</Text>

            <Text style={[styles.moodLine, { color: colors.neutral.light }]}>
              Today's Mood: <Text style={styles.emoji}>😊</Text> Excellent
            </Text>

            <Text style={[styles.quote, { color: colors.neutral.light }]}>
              "Today is a day for new beginnings.{"\n"}Let your intuition and emotions guide the way."
            </Text>
          </View>
        </View>
      </LinearGradient>
    </CustomCard>
  );
};

const styles = StyleSheet.create({
  gradientCard: {
    borderRadius: 18,
    padding: 10,
    marginTop: -10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 12,
    marginRight: 10,
    marginTop: 4,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  moodLine: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 6,
    flexWrap: 'wrap',
  },
  emoji: {
    fontSize: 15,
  },
  quote: {
    fontSize: 13,
    fontStyle: 'normal',
    lineHeight: 18,
  },
});

export default CosmicWeather;
