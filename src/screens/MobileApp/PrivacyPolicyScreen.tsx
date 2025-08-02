import { CARD_GLASS_PRESET, createGlassMorphismStyle } from '@/src/components/foundations/effects/GlassMorphism';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { PrimaryHeader } from '../../components/composite/navigation/header/PrimaryHeader';
import { useTheme } from '../../components/foundations/themes/useTheme';
import { fontSizes } from '../../components/foundations/tokens';
import AnimatedCard from '../../components/MobileApp/AnimatedCard';
import CosmicBackground from '../../components/MobileApp/CosmicBackground';
import Statusbar from '../../components/MobileApp/Statusbar';
import { BodyText, Heading } from '../../components/typography';


const sections = [
  {
    title: 'Information We Collect',
    content: `We collect information that you provide directly to us, including:\n\n• Personal information (name, email, phone number)\n• Birth details (date, time, place)\n• Payment information\n• Communication preferences`,
  },
  {
    title: 'How We Use Your Information',
    content: `We use the collected information to:\n\n• Provide astrological services and readings\n• Process payments and manage subscriptions\n• Send important updates and notifications\n• Improve our services and user experience\n• Respond to your inquiries and support requests`,
  },
  {
    title: 'Data Security',
    content: `We implement appropriate security measures to protect your personal information. This includes:\n\n• Encryption of sensitive data\n• Secure payment processing\n• Regular security audits\n• Access controls and authentication`,
  },
  {
    title: 'Your Rights',
    content: `You have the right to:\n\n• Access your personal information\n• Correct inaccurate data\n• Request deletion of your data\n• Opt-out of marketing communications\n• Withdraw consent for data processing`,
  },
  {
    title: 'Contact Us',
    content: `For any privacy-related concerns or questions, please contact us at:\n\nEmail: privacy@corpastro.com\nPhone: +91 9876543210`,
  },
];

const PrivacyPolicyScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { colors } = useTheme();
  const glassCardStyle = createGlassMorphismStyle(CARD_GLASS_PRESET);
  return (
    <View style={{ flex: 1, backgroundColor: colors.cosmos.deep }}>
      <Statusbar />
      <CosmicBackground />
      <SafeAreaView style={{ flex: 1 }}>
        <PrimaryHeader
          title={<Text style={{ fontSize: 20, fontWeight: '600', color: colors.brand.primary }}>Privacy Policy</Text>}
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
                <MaterialIcons name="arrow-back" size={20} color={colors.neutral.medium} />
              </View>
            ),
            onPress: () => navigation.goBack(),
            accessibilityLabel: 'Back',
          }}
        />
        <ScrollView contentContainerStyle={{ paddingBottom: 100, paddingTop: 20, gap: 20 }} showsVerticalScrollIndicator={false}>
          {sections.map((section, idx) => (
            <AnimatedCard key={idx} style={[glassCardStyle, { margin: 0, marginBottom: 0 ,borderRadius: 21}]}>
              <Heading level="h4" style={[styles.sectionTitle, { color: colors.brand.primary }] as any}>
                {section.title}
              </Heading>
              <BodyText style={[styles.sectionText, { color: colors.neutral.light }] as any}>
                {section.content}
              </BodyText>
            </AnimatedCard>
          ))}
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
    marginBottom: 0,
  },
});

export default PrivacyPolicyScreen;
