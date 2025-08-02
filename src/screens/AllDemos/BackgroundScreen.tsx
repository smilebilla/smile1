import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../../components/foundations/themes/useTheme';
import { themeColors } from '../../components/foundations/themes/DarkTheme';

const colorTokenList = [
  // Cosmos
  { label: 'Cosmos Void', path: 'cosmos.void' },
  { label: 'Cosmos Deep', path: 'cosmos.deep' },
  { label: 'Cosmos Dark', path: 'cosmos.dark' },
  { label: 'Cosmos Medium', path: 'cosmos.medium' },
  // Brand
  { label: 'Brand Primary', path: 'brand.primary' },
  { label: 'Brand Light', path: 'brand.light' },
  { label: 'Brand Glow', path: 'brand.glow' },
  { label: 'Brand Accent', path: 'brand.accent' },
  // Mystical
  { label: 'Mystical Deep', path: 'mystical.deep' },
  { label: 'Mystical Royal', path: 'mystical.royal' },
  { label: 'Mystical Light', path: 'mystical.light' },
  { label: 'Mystical Glow', path: 'mystical.glow' },
  // Luxury
  { label: 'Luxury Pure', path: 'luxury.pure' },
  { label: 'Luxury Champagne', path: 'luxury.champagne' },
  { label: 'Luxury Bronze', path: 'luxury.bronze' },
  { label: 'Luxury Shimmer', path: 'luxury.shimmer' },
  // Neutral
  { label: 'Neutral Light', path: 'neutral.light' },
  { label: 'Neutral Medium', path: 'neutral.medium' },
  { label: 'Neutral Text', path: 'neutral.text' },
  { label: 'Neutral Muted', path: 'neutral.muted' },
];

export default function BackgroundScreen() {
  const { colors } = useTheme();
  const [bg, setBg] = useState(colors.cosmos.deep);

  // Helper to get color value from path string
  function getColor(path: string) {
    const [group, key] = path.split('.') as [keyof typeof colors, string];
    return (colors[group] as any)[key];
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: bg }}>
      <View style={{ padding: 24 }}>
        <Text style={{ color: '#fff', fontSize: 22, fontWeight: 'bold', marginBottom: 24 }}>
          Tap a theme color to change background
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: themeColors.cosmos.void,
            padding: 16,
            borderRadius: 8,
            marginBottom: 12,
            borderWidth: bg === themeColors.cosmos.void ? 2 : 0,
            borderColor: '#fff',
          }}
          onPress={() => setBg(themeColors.cosmos.void)}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>themeColors.cosmos.void (from DarkTheme.ts)</Text>
        </TouchableOpacity>
        {colorTokenList.map(token => (
          <TouchableOpacity
            key={token.path}
            style={{
              backgroundColor: getColor(token.path),
              padding: 16,
              borderRadius: 8,
              marginBottom: 12,
              borderWidth: bg === getColor(token.path) ? 2 : 0,
              borderColor: '#fff',
            }}
            onPress={() => setBg(getColor(token.path))}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>{token.label}</Text>
            <Text style={{ color: '#fff', fontSize: 12 }}>{token.path}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
} 