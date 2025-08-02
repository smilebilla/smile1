import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { createStaticGlow } from '../../components/foundations/effects/GlowEffects';
import { useTheme } from '../../components/foundations/themes/useTheme';

const actions = [
  {
    id: 'new-chart',
    title: 'New Chart',
    icon: 'plus-network',
    gradient: ['#A18CD1', '#FBC2EB'], // Mystic violet-pink
  },
  {
    id: 'run-report',
    title: 'Run Report',
    icon: 'file-chart',
    gradient: ['#FDCB82', '#F37335'], // Warm earthy orange
  },
  {
    id: 'ask-ai',
    title: 'Ask AI',
    icon: 'robot',
    gradient: ['#B7F8DB', '#50A7C2'], // Calm teal
  },
  {
    id: 'compatibility',
    title: 'Compatibility',
    icon: 'heart-multiple',
    gradient: ['#FBC2EB', '#A6C1EE'], // Romantic soft purple-pink
  },
];

const QuickActions: React.FC = () => {
  const { colors } = useTheme();

  return (
    <View className="px-[21px] pt-[13px] mb-[21px]">
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: colors.brand.primary,
          marginBottom: 16,
        }}
      >
        ⚡ Quick Actions
      </Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderRadius: 24,
          paddingVertical: 16,
        }}
      >
        {actions.map((item) => {
          const glowEffect = createStaticGlow({
            color: String(colors.brand.primary),
            blur: 20,
            opacity: 0.3,
          });

          return (
            <TouchableOpacity
              key={item.id}
              style={{
                alignItems: 'center',
                width: 70,
              }}
            >
              <View style={glowEffect.style}>
                <LinearGradient
                  colors={item.gradient as any}
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 32,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 2,
                    borderColor: String(colors.brand.primary) + '40',
                    shadowColor: colors.brand.primary,
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 8,
                    elevation: 5,
                  }}
                >
                  <MaterialCommunityIcons
                    name={item.icon as any}
                    size={26}
                    color={colors.brand.primary}
                  />
                </LinearGradient>
              </View>
              <Text
                style={{
                  color: colors.neutral.light,
                  fontWeight: '600',
                  fontSize: 12,
                  marginTop: 8,
                  textAlign: 'center',
                  lineHeight: 16,
                }}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default QuickActions;
