
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../components/foundations/themes/useTheme';

const chartTypes = [
  {
    id: 'lahiri',
    title: 'Lahiri',
    icon: 'chart-arc',
    gradient: ['#8EC5FC', '#E0C3FC'], // Soft cosmic Vedic
  },
  {
    id: 'ramana',
    title: 'Ramana',
    icon: 'chart-donut',
    gradient: ['#FFDEE9', '#B5FFFC'], // Spiritual Ramana tone
  },
  {
    id: 'kp',
    title: 'KP',
    icon: 'chart-gantt',
    gradient: ['#C2FFD8', '#465EFB'], // Rational KP system
  },
  {
    id: 'divisional',
    title: 'Divisional',
    icon: 'chart-pie',
    gradient: ['#F6D365', '#FDA085'], // Layered insight
  },
  {
    id: 'composite',
    title: 'Composite',
    icon: 'chart-multiline',
    gradient: ['#89F7FE', '#66A6FF'], // Balanced fusion
  },
  {
    id: 'transit',
    title: 'Transit',
    icon: 'chart-timeline-variant',
    gradient: ['#FDCB82', '#A1C4FD'], // Planetary movement
  },
];

const ChartExplorer: React.FC = () => {
  const { colors } = useTheme();

  return (
    <View style={{ marginHorizontal: 16, marginTop: 24 }}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: colors.brand.primary,
          marginBottom: 12,
        }}
      >
        Chart Explorer
      </Text>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {chartTypes.map((item) => (
          <View key={item.id} style={{ width: '48%', marginBottom: 16 }}>
            <TouchableOpacity>
              <LinearGradient
                colors={item.gradient as any}
                style={{
                  borderRadius: 18,
                  padding: 16,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: String(colors.brand.primary) + '40',
                  height: 120,
                }}
              >
                <MaterialCommunityIcons
                  name={item.icon as any}
                  size={32}
                  color={colors.brand.primary}
                />
                <Text
                  style={{
                    color: colors.neutral.light,
                    fontWeight: 'bold',
                    fontSize: 14,
                    marginTop: 8,
                    textAlign: 'center',
                  }}
                >
                  {item.title}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

export default ChartExplorer;
