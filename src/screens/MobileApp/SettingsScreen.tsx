import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, FlatList, SafeAreaView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import ButtonIcon from '../../components/buttons/ButtonIcon';
import { PrimaryHeader } from '../../components/composite/navigation/header/PrimaryHeader';
import { CARD_GLASS_PRESET, createGlassMorphismStyle } from '../../components/foundations/effects/GlassMorphism';
import { useTheme } from '../../components/foundations/themes/useTheme';
import AnimatedCard from '../../components/MobileApp/AnimatedCard';
import CosmicBackground from '../../components/MobileApp/CosmicBackground';
import Statusbar from '../../components/MobileApp/Statusbar';
// Typography tokens
import { fontSizes } from '../../components/foundations/tokens';

const SettingsScreen: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  // MOCK: Replace with real user/settings context
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [hapticFeedback, setHapticFeedback] = useState(true);
  const [autoSync, setAutoSync] = useState(true);
  const [privacyMode, setPrivacyMode] = useState(false);
  const [language, setLanguage] = useState('English');
  const [accountSecure, setAccountSecure] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const handleLogout = () => {
    setLogoutLoading(true);
    setTimeout(() => {
      setLogoutLoading(false);
      // navigation.replace('LoginScreen'); // Uncomment for real navigation
    }, 1500);
  };

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const settingsSections = [
    {
      id: 'notifications',
      title: 'Notifications',
      icon: 'bell',
      color: colors.brand.primary,
      settings: [
        {
          id: 'notifications_enabled',
          label: 'Push Notifications',
          description: 'Receive alerts and updates',
          value: notificationsEnabled,
          onValueChange: setNotificationsEnabled,
          type: 'switch',
        },
        {
          id: 'sound_enabled',
          label: 'Sound Alerts',
          description: 'Play sounds for notifications',
          value: soundEnabled,
          onValueChange: setSoundEnabled,
          type: 'switch',
        },
      ],
    },
    {
      id: 'appearance',
      title: 'Appearance',
      icon: 'palette',
      color: colors.mystical.royal,
      settings: [
        {
          id: 'dark_mode',
          label: 'Dark Mode',
          description: 'Use dark theme',
          value: darkMode,
          onValueChange: setDarkMode,
          type: 'switch',
        },
        {
          id: 'privacy_mode',
          label: 'Privacy Mode',
          description: 'Hide sensitive information',
          value: privacyMode,
          onValueChange: setPrivacyMode,
          type: 'switch',
        },
        {
          id: 'language',
          label: 'Language',
          description: `App language: ${language}`,
          value: language === 'English',
          onValueChange: (v: boolean) => setLanguage(v ? 'English' : 'Hindi'),
          type: 'switch',
          color: colors.brand.accent,
        },
      ],
    },
    {
      id: 'interaction',
      title: 'Interaction',
      icon: 'hand-pointing-up',
      color: colors.luxury.champagne,
      settings: [
        {
          id: 'haptic_feedback',
          label: 'Haptic Feedback',
          description: 'Vibrate on interactions',
          value: hapticFeedback,
          onValueChange: setHapticFeedback,
          type: 'switch',
        },
        {
          id: 'auto_sync',
          label: 'Auto Sync',
          description: 'Automatically sync data',
          value: autoSync,
          onValueChange: setAutoSync,
          type: 'switch',
        },
      ],
    },
    {
      id: 'account',
      title: 'Account',
      icon: 'account-lock',
      color: colors.brand.accent,
      settings: [
        {
          id: 'account_secure',
          label: 'Account Security',
          description: '2FA and secure login enabled',
          value: accountSecure,
          onValueChange: setAccountSecure,
          type: 'switch',
          color: colors.brand.accent,
        },
      ],
    },
    {
      id: 'sync',
      title: 'Data Sync',
      icon: 'cloud-sync',
      color: colors.mystical.light,
      settings: [
        {
          id: 'manual_sync',
          label: 'Manual Sync',
          description: 'Tap to sync astrology data now',
          value: false,
          onValueChange: () => {},
          type: 'button',
          color: colors.mystical.light,
        },
      ],
    },
  ];

  const glassCardStyle = createGlassMorphismStyle(CARD_GLASS_PRESET);

  const renderSettingItem = ({ item }: { item: any }) => (
    <View style={styles.settingItem}>
      <View style={styles.settingContent}>
        <Text style={[styles.settingLabel, { color: colors.neutral.light }]}>
          {item.label}
        </Text>
        <Text style={[styles.settingDescription, { color: colors.neutral.medium }]}>
          {item.description}
        </Text>
      </View>
      {item.type === 'switch' ? (
        <Switch
          value={item.value}
          onValueChange={item.onValueChange}
          trackColor={{ false: String(colors.cosmos.medium) + '50', true: String(item.color || colors.brand.primary) + '50' }}
          thumbColor={item.value ? (item.color || colors.brand.primary) : colors.neutral.medium}
          ios_backgroundColor={String(colors.cosmos.medium) + '50'}
        />
      ) : item.type === 'button' ? (
        <TouchableOpacity
          onPress={item.onValueChange}
          style={{ backgroundColor: item.color, paddingHorizontal: 18, paddingVertical: 7, borderRadius: 12 }}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 14 }}>Sync Now</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );

  const renderSettingsSection = ({ item }: { item: any }) => (
    <AnimatedCard style={{ marginBottom: 16 }}>
      <View style={[glassCardStyle, { padding: 20, borderRadius: 20 }]}>
        <View style={styles.sectionHeader}>
          <View style={[styles.sectionIcon, { backgroundColor: String(item.color) + '20' }]}>
            <MaterialCommunityIcons
              name={item.icon as any}
              size={24}
              color={item.color}
            />
          </View>
          <Text style={[styles.sectionTitle, { color: colors.neutral.light }]}>
            {item.title}
          </Text>
        </View>
        
        <View style={styles.settingsList}>
          {item.settings.map((setting: any) => (
            <View key={setting.id}>
              {renderSettingItem({ item: setting })}
            </View>
          ))}
        </View>
      </View>
    </AnimatedCard>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.cosmos.deep }}>
      <Statusbar />
        <CosmicBackground />
      <SafeAreaView style={{ flex: 1 }}>
        <PrimaryHeader
          title={<Text style={{ fontSize: 20, fontWeight: '600', color: colors.brand.primary }}>Settings</Text>}
          backgroundColor="transparent"
          height="custom"
          customHeight={55}
          shadow={false}
          blur={false}
          animated
          leftButton={{
            id: 'back',
            icon: (
              <ButtonIcon onPress={() => navigation.goBack()} style={{ marginLeft: -15 }}>
                <Text style={{ fontSize: 25, marginTop: -7, color: colors.brand.primary }}>←</Text>
              </ButtonIcon>
            ),
            onPress: () => navigation.goBack(),
            accessibilityLabel: 'Back',
          }}
          rightButtons={[
            {
              id: 'save',
              icon: (
                <ButtonIcon onPress={() => {}} style={{ marginRight: -8 }}>
                  <MaterialCommunityIcons 
                    name="content-save" 
                    size={24} 
                    color={colors.brand.primary} 
                  />
                </ButtonIcon>
              ),
              onPress: () => {},
              accessibilityLabel: 'Save',
            },
          ]}
        />

        <Animated.View
          style={[
            { flex: 1 },
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <FlatList
            data={settingsSections}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 140, paddingTop: 20 }}
            renderItem={renderSettingsSection}
            ListHeaderComponent={
              <>
                {/* Hero Settings Section */}
                <AnimatedCard>
                  <View style={[glassCardStyle, { padding: 24, borderRadius: 24 }]}>
                    <View style={styles.heroHeader}>
                      <View style={[styles.heroIconContainer, { backgroundColor: String(colors.brand.primary) + '20' }]}>
                        <MaterialCommunityIcons
                          name="cog"
                          size={48}
                          color={colors.brand.primary}
                        />
                      </View>
                      <View style={styles.heroContent}>
                        <Text style={[styles.heroTitle, { color: colors.brand.primary }]}>
                          Settings  
                        </Text>
                        <Text style={[styles.heroSubtitle, { color: colors.neutral.medium }]}>
                          Customize your app experience and manage your preferences to get the most out of your astrological journey.
                        </Text>
                      </View>
                    </View>
                    
                    <View style={styles.heroStats}>
                      <View style={styles.statItem}>
                        <Text style={[styles.statNumber, { color: colors.luxury.pure }]}>3</Text>
                        <Text style={[styles.statLabel, { color: colors.neutral.medium }]}>Categories</Text>
                      </View>
                      <View style={styles.statItem}>
                        <Text style={[styles.statNumber, { color: colors.mystical.light }]}>6</Text>
                        <Text style={[styles.statLabel, { color: colors.neutral.medium }]}>Settings</Text>
                      </View>
                      <View style={styles.statItem}>
                        <Text style={[styles.statNumber, { color: colors.brand.accent }]}>∞</Text>
                        <Text style={[styles.statLabel, { color: colors.neutral.medium }]}>Customization</Text>
                      </View>
                    </View>
                  </View>
                </AnimatedCard>

                {/* Divider */}
                <View style={styles.divider}>
                  <View style={[styles.dividerLine, { backgroundColor: String(colors.brand.primary) + '30' }]} />
                  <Text style={[styles.dividerText, { color: colors.brand.primary }]}>
                    ✨ Settings Categories
                  </Text>
                  <View style={[styles.dividerLine, { backgroundColor: String(colors.brand.primary) + '30' }]} />
                </View>
              </>
            }
           
          />
        </Animated.View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  settingsList: {
    gap: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  settingContent: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    fontSize: fontSizes.body.size,
    fontWeight: '600',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: fontSizes.small.size,
    lineHeight: fontSizes.small.lineHeight * fontSizes.small.size,
  },
  heroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  heroIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  heroContent: {
    flex: 1,
  },
  heroTitle: {
    fontSize: fontSizes.h4.size,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: fontSizes.small.size,
    lineHeight: fontSizes.small.lineHeight * fontSizes.small.size,
  },
  heroStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: fontSizes.h4.size,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: fontSizes.micro.size,
    fontWeight: '500',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 24,
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontSize: fontSizes.h5.size,
    fontWeight: '600',
    marginHorizontal: 16,
  },
  logoutButton: {
    alignSelf: 'center',
  },  
  logoutGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: fontSizes.small.size,
    marginLeft: 8,
  },
});

export default SettingsScreen;