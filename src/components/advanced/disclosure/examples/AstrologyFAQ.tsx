/**
 * Corp Astro UI Library - Astrology FAQ Example
 * 
 * Demonstrates accordion usage for astrology FAQ sections with cosmic theming.
 * 
 * @example
 * ```tsx
 * import { AstrologyFAQ } from '@/advanced/disclosure/examples';
 * 
 * function HelpPage() {
 *   return <AstrologyFAQ />;
 * }
 * ```
 */

import React from 'react';
import { View, Text } from 'react-native';
import { Accordion, AccordionItem, ACCORDION_PRESETS } from '../index';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'charts' | 'compatibility' | 'readings';
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 'birth-chart',
    question: 'How accurate is my birth chart?',
    answer: 'Your birth chart accuracy depends on the precision of your birth time, date, and location. We use advanced astronomical calculations to ensure the highest accuracy possible.',
    category: 'charts',
  },
  {
    id: 'compatibility',
    question: 'How do compatibility readings work?',
    answer: 'Compatibility readings analyze the synastry between two birth charts, examining planetary aspects, house overlays, and elemental harmony to provide insights into relationship dynamics.',
    category: 'compatibility',
  },
  {
    id: 'daily-horoscope',
    question: 'Are daily horoscopes personalized?',
    answer: 'Yes! Our daily horoscopes are generated based on your complete birth chart, not just your sun sign, providing personalized insights for your unique cosmic blueprint.',
    category: 'readings',
  },
  {
    id: 'transits',
    question: 'What are planetary transits?',
    answer: 'Transits are the current movements of planets in the sky and how they interact with your natal chart. They help predict timing for important life events and personal growth opportunities.',
    category: 'general',
  },
  {
    id: 'houses',
    question: 'What do the 12 houses represent?',
    answer: 'Each of the 12 astrological houses represents different life areas: identity, possessions, communication, home, creativity, health, relationships, transformation, philosophy, career, friendships, and spirituality.',
    category: 'charts',
  },
];

export const AstrologyFAQ: React.FC = () => {
  return (
    <View style={{ padding: 20, backgroundColor: '#0A0B14' }}>
      <Text style={{ 
        fontSize: 28, 
        fontWeight: 'bold', 
        color: '#FFFFFF', 
        marginBottom: 8,
        textAlign: 'center' 
      }}>
        Frequently Asked Questions
      </Text>
      
      <Text style={{ 
        fontSize: 16, 
        color: '#9CA3AF', 
        marginBottom: 24,
        textAlign: 'center' 
      }}>
        Everything you need to know about astrology and cosmic insights
      </Text>

      <Accordion
        {...ACCORDION_PRESETS.faq}
        variant="cosmic"
        items={FAQ_DATA.map(item => ({
          id: item.id,
          title: item.question,
          content: (
            <View style={{ flexDirection: 'column' }}>
              <View style={{
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 12,
                backgroundColor: getCategoryColor(item.category),
                alignSelf: 'flex-start',
                marginBottom: 12,
              }}>
                <Text style={{ 
                  fontSize: 12, 
                  fontWeight: '500', 
                  color: '#FFFFFF',
                  textTransform: 'capitalize' 
                }}>
                  {item.category}
                </Text>
              </View>
              <Text style={{ 
                fontSize: 14, 
                color: '#D1D5DB', 
                lineHeight: 20 
              }}>
                {item.answer}
              </Text>
            </View>
          ),
        }))}
      />
    </View>
  );
};

function getCategoryColor(category: FAQItem['category']): string {
  switch (category) {
    case 'general':
      return '#6366F1'; // Indigo
    case 'charts':
      return '#8B5CF6'; // Violet  
    case 'compatibility':
      return '#EC4899'; // Pink
    case 'readings':
      return '#06B6D4'; // Cyan
    default:
      return '#6B7280'; // Gray
  }
}

export default AstrologyFAQ;
