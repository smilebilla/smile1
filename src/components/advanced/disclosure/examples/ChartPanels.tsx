/**
 * Corp Astro UI Library - Chart Panels Example
 * 
 * Demonstrates panel usage for organizing birth chart information with cosmic theming.
 * 
 * @example
 * ```tsx
 * import { ChartPanels } from '@/advanced/disclosure/examples';
 * 
 * function ChartPage() {
 *   return <ChartPanels />;
 * }
 * ```
 */

import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Panel, PANEL_PRESETS } from '../index';

interface ChartSection {
  id: string;
  title: string;
  subtitle: string;
  content: React.ReactNode;
  defaultExpanded?: boolean;
}

export const ChartPanels: React.FC = () => {
  const chartSections: ChartSection[] = [
    {
      id: 'sun-moon-rising',
      title: 'Core Trinity',
      subtitle: 'Sun, Moon & Rising Signs',
      defaultExpanded: true,
      content: (
        <View style={{ gap: 16 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#FFFFFF' }}>☉ Sun in Sagittarius</Text>
            <Text style={{ fontSize: 14, color: '#9CA3AF' }}>9th House</Text>
          </View>
          <Text style={{ fontSize: 14, color: '#D1D5DB', lineHeight: 20 }}>
            Your core identity radiates Sagittarian energy - adventurous, philosophical, and truth-seeking.
          </Text>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#FFFFFF' }}>☽ Moon in Pisces</Text>
            <Text style={{ fontSize: 14, color: '#9CA3AF' }}>12th House</Text>
          </View>
          <Text style={{ fontSize: 14, color: '#D1D5DB', lineHeight: 20 }}>
            Your emotional nature is deeply intuitive, compassionate, and spiritually attuned.
          </Text>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#FFFFFF' }}>⬆ Leo Rising</Text>
            <Text style={{ fontSize: 14, color: '#9CA3AF' }}>1st House</Text>
          </View>
          <Text style={{ fontSize: 14, color: '#D1D5DB', lineHeight: 20 }}>
            You present yourself with Leo confidence - charismatic, creative, and naturally magnetic.
          </Text>
        </View>
      ),
    },
    {
      id: 'planetary-positions',
      title: 'Planetary Positions',
      subtitle: 'Where your planets call home',
      content: (
        <View style={{ gap: 12 }}>
          {[
            { planet: '☿ Mercury', sign: 'Scorpio', house: '8th House', degree: '15°32\'' },
            { planet: '♀ Venus', sign: 'Capricorn', house: '10th House', degree: '28°14\'' },
            { planet: '♂ Mars', sign: 'Virgo', house: '6th House', degree: '7°58\'' },
            { planet: '♃ Jupiter', sign: 'Gemini', house: '3rd House', degree: '22°41\'' },
            { planet: '♄ Saturn', sign: 'Aquarius', house: '11th House', degree: '3°27\'' },
          ].map((item, index) => (
            <View key={index} style={{ 
              flexDirection: 'row', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              paddingVertical: 8,
              borderBottomWidth: index < 4 ? 1 : 0,
              borderBottomColor: '#374151'
            }}>
              <Text style={{ fontSize: 14, fontWeight: '500', color: '#FFFFFF', flex: 1 }}>
                {item.planet}
              </Text>
              <Text style={{ fontSize: 14, color: '#9CA3AF', flex: 1, textAlign: 'center' }}>
                {item.sign}
              </Text>
              <Text style={{ fontSize: 14, color: '#6B7280', flex: 1, textAlign: 'center' }}>
                {item.house}
              </Text>
              <Text style={{ fontSize: 12, color: '#4B5563', textAlign: 'right' }}>
                {item.degree}
              </Text>
            </View>
          ))}
        </View>
      ),
    },
    {
      id: 'aspects',
      title: 'Major Aspects',
      subtitle: 'Planetary conversations in your chart',
      content: (
        <View style={{ gap: 12 }}>
          {[
            { aspect: 'Sun ⚹ Jupiter', type: 'Trine', orb: '3°12\'', meaning: 'Natural optimism and expansion' },
            { aspect: 'Moon ☌ Neptune', type: 'Conjunction', orb: '1°45\'', meaning: 'Psychic sensitivity and intuition' },
            { aspect: 'Venus ☐ Mars', type: 'Square', orb: '5°28\'', meaning: 'Dynamic tension in relationships' },
            { aspect: 'Mercury ⚺ Saturn', type: 'Sextile', orb: '2°33\'', meaning: 'Disciplined thinking and communication' },
          ].map((item, index) => (
            <View key={index} style={{ 
              padding: 12,
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              borderRadius: 8,
              borderLeftWidth: 3,
              borderLeftColor: getAspectColor(item.type)
            }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#FFFFFF' }}>
                  {item.aspect}
                </Text>
                <Text style={{ fontSize: 12, color: '#9CA3AF' }}>
                  {item.type} • {item.orb}
                </Text>
              </View>
              <Text style={{ fontSize: 13, color: '#D1D5DB', lineHeight: 18 }}>
                {item.meaning}
              </Text>
            </View>
          ))}
        </View>
      ),
    },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#0A0B14' }}>
      <View style={{ padding: 20 }}>
        <Text style={{ 
          fontSize: 28, 
          fontWeight: 'bold', 
          color: '#FFFFFF', 
          marginBottom: 8,
          textAlign: 'center' 
        }}>
          Your Birth Chart
        </Text>
        
        <Text style={{ 
          fontSize: 16, 
          color: '#9CA3AF', 
          marginBottom: 24,
          textAlign: 'center' 
        }}>
          December 15, 1990 • 3:42 PM • Los Angeles, CA
        </Text>

        <View style={{ gap: 16 }}>
          {chartSections.map((section) => (
            <Panel
              key={section.id}
              {...PANEL_PRESETS.cosmic}
              size="large"
              title={section.title}
              subtitle={section.subtitle}
              collapsed={!section.defaultExpanded}
              actions={[
                {
                  id: 'copy',
                  icon: '📋',
                  text: 'Copy',
                  onPress: () => console.log('Copy section:', section.id),
                },
                {
                  id: 'share',
                  icon: '📤',
                  text: 'Share',
                  onPress: () => console.log('Share section:', section.id),
                },
              ]}
            >
              {section.content}
            </Panel>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

function getAspectColor(aspectType: string): string {
  switch (aspectType) {
    case 'Conjunction':
      return '#F59E0B'; // Amber
    case 'Trine':
      return '#10B981'; // Emerald
    case 'Sextile':
      return '#3B82F6'; // Blue
    case 'Square':
      return '#EF4444'; // Red
    case 'Opposition':
      return '#8B5CF6'; // Violet
    default:
      return '#6B7280'; // Gray
  }
}

export default ChartPanels;
