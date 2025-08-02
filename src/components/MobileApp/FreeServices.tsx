import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';
import { useTheme } from '../../components/foundations/themes/useTheme';
import Section from './Section';

const services = [
  { id: 'daily-horoscope', title: 'Daily Horoscope', icon: 'weather-night', gradient: ['#FFD3A5', '#FD6585'] },
  { id: 'numerology', title: 'Numerology', icon: 'numeric', gradient: ['#89F7FE', '#66A6FF'] },
  { id: 'tarot-reading', title: 'Tarot Reading', icon: 'cards', gradient: ['#FBD3E9', '#BB377D'] },
  { id: 'match-making', title: 'Match Making', icon: 'heart', gradient: ['#FBD6F2', '#A18CD1'] },
];

const CARD_WIDTH = (Dimensions.get('window').width - 64) / 4;

const FreeServices: React.FC = () => {
  const { colors } = useTheme();

  return (
    <Section title="🔮 Free Services">
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        numColumns={4}
        scrollEnabled={false}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <LinearGradient
            colors={item.gradient as [string, string]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.card]}
          >
            <TouchableOpacity
              activeOpacity={0.9}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <MaterialCommunityIcons
                name={item.icon as any}
                size={28}
                color={'white'}
              />
              <Text
                style={[
                  styles.title,
                  {
                    color: 'white',
                    marginTop: 'auto',
                    marginBottom: 6,
                  },
                ]}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        )}
      />
    </Section>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 10,
    paddingBottom: 12,
  },
  card: {
    width: CARD_WIDTH,
    height: 110,
    margin: 5,
    marginTop: 0,
    left: -15,
    borderRadius: 14,
    borderWidth: 0,
    padding: 8,
    justifyContent: 'flex-start',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    paddingTop: 18,
    overflow: 'hidden',
  },
  title: {
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default FreeServices;
