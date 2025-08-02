import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../components/foundations/themes/useTheme';
import CustomCard from './CustomCard';

const TodaysWeather: React.FC = () => {
  const { colors } = useTheme();

  return (
    <CustomCard title="Today's Weather">
      <LinearGradient
        colors={['#B6FBFF', '#83A4D4']} // Soft celestial gradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View style={styles.row}>
          <MaterialCommunityIcons name="weather-sunset-up" size={24} color="#000" />
          <Text style={[styles.label, { color: '#000' }]}>Sunrise</Text>
          <Text style={[styles.value, { color: '#000' }]}>6:05 AM</Text>
        </View>

        <View style={styles.row}>
          <MaterialCommunityIcons name="weather-sunset-down" size={24} color="#000" />
          <Text style={[styles.label, { color: '#000' }]}>Sunset</Text>
          <Text style={[styles.value, { color: '#000' }]}>7:45 PM</Text>
        </View>

        <View style={styles.row}>
          <MaterialCommunityIcons name="moon-waxing-crescent" size={24} color="#000" />
          <Text style={[styles.label, { color: '#000' }]}>Moonrise</Text>
          <Text style={[styles.value, { color: '#000' }]}>8:30 PM</Text>
        </View>

        <View style={[styles.row, { borderBottomWidth: 0 }]}>
          <MaterialCommunityIcons name="moon-waning-crescent" size={24} color="#000" />
          <Text style={[styles.label, { color: '#000' }]}>Moonset</Text>
          <Text style={[styles.value, { color: '#000' }]}>7:15 AM</Text>
        </View>
      </LinearGradient>
    </CustomCard>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    padding: 18,
    marginTop: -10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#000', // Black divider line
  },
  label: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    fontWeight: '700',
  },
});

export default TodaysWeather;
