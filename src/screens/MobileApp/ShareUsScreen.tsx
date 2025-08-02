import { CARD_GLASS_PRESET, createGlassMorphismStyle } from '@/src/components/foundations/effects/GlassMorphism';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Linking, SafeAreaView, ScrollView, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PrimaryHeader } from '../../components/composite/navigation/header/PrimaryHeader';
import { useTheme } from '../../components/foundations/themes/useTheme';
import { fontSizes } from '../../components/foundations/tokens';
import AnimatedCard from '../../components/MobileApp/AnimatedCard';
import CosmicBackground from '../../components/MobileApp/CosmicBackground';
import Statusbar from '../../components/MobileApp/Statusbar';
import { BodyText, Heading } from '../../components/typography';

const ShareUsScreen = () => {
  const navigation = useNavigation<any>();
  const { colors } = useTheme();
  const glassCardStyle = createGlassMorphismStyle(CARD_GLASS_PRESET);

  const shareApp = async () => {
    try {
      const message = 'Check out CorpAstro - Your Business Astrology Companion!';
      const url = 'https://play.google.com/store/apps/details?id=com.corpastro';
      await Share.share({
        message: `${message}\n\n${url}`,
        title: 'Share CorpAstro',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleSocialShare = (platform: string) => {
    let url = '';
    const message = 'Check out CorpAstro - Your Business Astrology Companion!';
    const appUrl = 'https://play.google.com/store/apps/details?id=com.corpastro';
    switch (platform) {
      case 'whatsapp':
        url = `whatsapp://send?text=${encodeURIComponent(`${message}\n${appUrl}`)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(appUrl)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${message}\n${appUrl}`)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(appUrl)}`;
        break;
      default:
        return;
    }
    Linking.openURL(url).catch(err => {
      if (platform === 'whatsapp') {
        Linking.openURL(`https://web.whatsapp.com/send?text=${encodeURIComponent(`${message}\n${appUrl}`)}`);
      }
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.cosmos.deep }}>
      <Statusbar />
      <CosmicBackground />
      <SafeAreaView style={{ flex: 1 }}>
        <PrimaryHeader
          title={<Text style={{ fontSize: 20, fontWeight: '600', color: colors.brand.primary }}>Share App</Text>}
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
          <AnimatedCard style={[glassCardStyle, { margin: 0, marginBottom: 0 ,borderRadius: 21}]}>
            <Image
              source={require('../../../assets/images/CorpAstro.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Heading level="h3" style={[styles.appName, { color: colors.brand.accent }] as any}>
              CorpAstro
            </Heading>
            <BodyText style={[styles.appDescription, { color: colors.neutral.light }] as any}>
              Your Business Astrology Companion
            </BodyText>
          </AnimatedCard>
          <AnimatedCard style={[glassCardStyle, { margin: 0, marginBottom: 0 ,borderRadius: 21}]}>
            <Heading level="h4" style={[styles.sectionTitle, { color: colors.brand.primary }] as any}>
              Share via
            </Heading>
            <TouchableOpacity style={[glassCardStyle, styles.shareButton, { borderRadius: 21 }]} onPress={shareApp}>
              <MaterialIcons name="share" size={24} color={colors.brand.accent} />
              <BodyText style={styles.shareButtonText}>Share App</BodyText>
            </TouchableOpacity>
            <View style={styles.socialButtons}>
              <TouchableOpacity style={[glassCardStyle, styles.socialButton, { borderRadius: 21 }]} onPress={() => handleSocialShare('whatsapp')}>
                <Ionicons name="logo-whatsapp" size={24} color="#25D366" />
                <BodyText style={styles.socialButtonText}>WhatsApp</BodyText>
              </TouchableOpacity>
              <TouchableOpacity style={[glassCardStyle, styles.socialButton, { borderRadius: 21 }]} onPress={() => handleSocialShare('facebook')}>
                <Ionicons name="logo-facebook" size={24} color="#1877F2" />
                <BodyText style={styles.socialButtonText}>Facebook</BodyText>
              </TouchableOpacity>
              <TouchableOpacity style={[glassCardStyle, styles.socialButton, { borderRadius: 21 }]} onPress={() => handleSocialShare('twitter')}>
                <Ionicons name="logo-twitter" size={24} color="#1DA1F2" />
                <BodyText style={styles.socialButtonText}>Twitter</BodyText>
              </TouchableOpacity>
              <TouchableOpacity style={[glassCardStyle, styles.socialButton, { borderRadius: 21 }]} onPress={() => handleSocialShare('linkedin')}>
                <Ionicons name="logo-linkedin" size={24} color="#0077B5" />
                <BodyText style={styles.socialButtonText}>LinkedIn</BodyText>
              </TouchableOpacity>
            </View>
          </AnimatedCard>
            <AnimatedCard style={[glassCardStyle, { margin: 0, marginBottom: 0 ,borderRadius: 21}]}>
            <Heading level="h4" style={[styles.sectionTitle, { color: colors.brand.primary }] as any}>
              Refer & Earn
            </Heading>
            <BodyText style={[styles.referralText, { color: colors.neutral.light }] as any}>
              Share your referral code with friends and family. When they sign up using your code, both of you will receive premium features for free!
            </BodyText>
            <View style={[glassCardStyle, styles.referralCodeContainer, { borderRadius: 21 }]}>
              <BodyText style={[styles.referralCode, { color: colors.brand.accent }] as any}>CORP2025</BodyText>
              <TouchableOpacity style={[glassCardStyle, styles.copyButton, { borderRadius: 21 }]}>
                <MaterialIcons name="content-copy" size={20} color={colors.brand.accent} />
              </TouchableOpacity>
            </View>
          </AnimatedCard>
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
  logo: {
    width: 80,
    height: 80,
    marginBottom: 16,
    alignSelf: 'center',
  },
  appName: {
    fontSize: fontSizes.h3.size,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  appDescription: {
    fontSize: fontSizes.body.size,
    textAlign: 'center',
    opacity: 0.8,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: fontSizes.h4.size,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    marginBottom: 16,
    borderRadius: 21,
  },
  shareButtonText: {
    fontSize: fontSizes.body.size,
    color: '#E1B725',
    marginLeft: 10,
    fontWeight: '600',
  },
  socialButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  socialButton: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    marginBottom: 12,
    borderRadius: 21,
    justifyContent: 'center',
  },
  socialButtonText: {
    fontSize: fontSizes.body.size,
    color: '#fff',
    marginLeft: 10,
    fontWeight: '600',
  },
  referralText: {
    fontSize: fontSizes.body.size,
    color: '#fff',
    marginBottom: 12,
    opacity: 0.8,
    textAlign: 'center',
    lineHeight: fontSizes.body.size * 1.5,
  },
  referralCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 21,
    marginTop: 8,
  },
  referralCode: {
    flex: 1,
    fontSize: fontSizes.h4.size,
    fontWeight: '700',
    textAlign: 'center',
  },
  copyButton: {
    padding: 8,
  },
});

export default ShareUsScreen;
