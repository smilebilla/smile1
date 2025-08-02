import { CARD_GLASS_PRESET, createGlassMorphismStyle } from '@/src/components/foundations/effects/GlassMorphism';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, Mail, MapPin, Phone } from 'lucide-react-native';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { PrimaryHeader } from '../../components/composite/navigation/header/PrimaryHeader';
import { useTheme } from '../../components/foundations/themes/useTheme';
import { fontSizes } from '../../components/foundations/tokens';
import AnimatedCard from '../../components/MobileApp/AnimatedCard';
import CosmicBackground from '../../components/MobileApp/CosmicBackground';
import Statusbar from '../../components/MobileApp/Statusbar';
import { BodyText, Heading } from '../../components/typography';

const AboutScreen: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const glassCardStyle = createGlassMorphismStyle(CARD_GLASS_PRESET);

  const renderSection = (title: string, content: string, icon?: React.ReactNode) => (
    <AnimatedCard style={[glassCardStyle, { margin: 16, marginBottom: 0 ,borderRadius: 21}]}>
      <View style={styles.section}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <Heading level="h4" style={[styles.sectionTitle, { color: colors.brand.primary }] as any}>
          {title}
        </Heading>
        <BodyText style={[styles.sectionText, { color: colors.neutral.light }] as any}>
          {content}
        </BodyText>
      </View>
    </AnimatedCard>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.cosmos.deep }}>
      <Statusbar />
      <CosmicBackground />
      <SafeAreaView style={{ flex: 1 }}>
        <PrimaryHeader
          title={<Text style={{ fontSize: 20, fontWeight: '600', color: colors.brand.primary }}>About Us</Text>}
          backgroundColor="transparent"
          height="custom"
          customHeight={55}
          shadow={false}
          blur={false}
          animated
          leftButton={{
            id: 'back',
            icon: (
              <View style={styles.backButton}>
                <ArrowLeft size={20} color={colors.neutral.medium} />
              </View>
            ),
            onPress: () => navigation.goBack(),
            accessibilityLabel: 'Back',
          }}
        />
        
        <ScrollView 
          contentContainerStyle={{ paddingBottom: 100, paddingTop: 20 ,gap: 20}} 
          showsVerticalScrollIndicator={false}
        >
          {renderSection(
            'Our Mission',
            'At CorpAstro, we are dedicated to providing accurate and insightful astrological guidance to help individuals and businesses make informed decisions. Our team of experienced astrologers combines traditional wisdom with modern technology to deliver personalized readings and forecasts.'
          )}

          {renderSection(
            'Our Vision',
            'We envision a world where astrological insights are accessible to everyone, helping them navigate life\'s challenges and opportunities with confidence and clarity.'
          )}

          {renderSection(
            'Our Values',
            '• Accuracy and Authenticity\n• Professional Excellence\n• Customer Satisfaction\n• Ethical Practices\n• Continuous Innovation'
          )}

          {renderSection(
            'Contact Us',
            'Email: support@corpastro.com\nPhone: +91 9876543210\nAddress: 123 Astro Street, Bangalore, India',
            <View style={styles.contactIcons}>
              <Mail size={20} color={colors.brand.primary} />
              <Phone size={20} color={colors.brand.primary} />
              <MapPin size={20} color={colors.brand.primary} />
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    height: 36,
    width: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    backgroundColor: 'rgba(148, 163, 184, 0.1)',
    marginLeft: -15
  },
  section: {
    padding: 24,    
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  contactIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 5,
    gap: 20
  },
  sectionTitle: {
    fontSize: fontSizes.h4.size,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  sectionText: {
    fontSize: fontSizes.body.size,
    lineHeight: fontSizes.body.size * 1.5,
    textAlign: 'center',
  },
});

export default AboutScreen;
