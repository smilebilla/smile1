import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import React, { useEffect, useRef } from 'react';
import { Animated, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PrimaryHeader } from '../../components/composite/navigation/header/PrimaryHeader';
import { CARD_GLASS_PRESET, createGlassMorphismStyle } from '../../components/foundations/effects/GlassMorphism';
import { useTheme } from '../../components/foundations/themes/useTheme';
import AnimatedCard from '../../components/MobileApp/AnimatedCard';
import CosmicBackground from '../../components/MobileApp/CosmicBackground';
import Statusbar from '../../components/MobileApp/Statusbar';
// Typography tokens
import { fontSizes } from '../../components/foundations/tokens';

const MenuScreen: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // MOCK: Replace with real user context/provider
  const user = {
    name: 'Ismail Ahmed',
    sign: 'Leo',
    status: 'Premium Member',
    isPremium: true,
    notifications: 5,
    language: 'English',
    theme: 'Dark',
  };
  const [logoutLoading, setLogoutLoading] = React.useState(false);
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

    // Pulse animation for user avatar
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  const menuItems = [
    {
      id: 'profile',
      label: 'Profile',
      description: 'Manage your personal information',
      icon: 'account-circle',
      color: colors.brand.primary,
      onPress: () => navigation.navigate('ProfileScreen'),
      badge: null,
    },
    {
      id:'reports',
      label:'Reports',
      description:'View your reports',
      icon:'file-document',
      color:colors.brand.primary,
      onPress:()=>navigation.navigate('ReportsScreen'),
      badge:null,
    },
    {
      id: 'subscription',
      label: 'Subscriptions',
      description: 'Manage your subscription',
      icon: 'credit-card',
      color: colors.luxury.pure,
      onPress: () => navigation.navigate('SubscriptionScreen'),
      badge: user.isPremium ? 'PRO' : null,
    },
    {
      id:'payment',
      label:'Payment',
      description:'Manage your payment',
      icon:'credit-card',
      color:colors.brand.primary,
      onPress:()=>navigation.navigate('PaymentScreen'),
      badge:null,
    },
    {
      id: 'about',
      label: 'About',
      description: 'App information and version details',
      icon: 'information',
      color: colors.mystical.light,
      onPress: () => navigation.navigate('AboutScreen'),
      badge: null,
    },
    {
      id: 'help',
      label: 'Help & Support',
      description: 'Get assistance and learn more',
      icon: 'help-circle',
      color: colors.brand.accent,
      onPress: () => navigation.navigate('HelpSupportScreen'),
      badge: null,
    },
    {
      id:'Share us',
      label:'Share us',
      description:'Share us with your friends',
      icon:'share',
      color:colors.brand.primary,
      onPress:()=>navigation.navigate('ShareUsScreen'),
      badge:null,
    },
    {
      id: 'settings',
      label: 'Settings',
      description: 'App preferences and configuration',
      icon: 'cog',
      color: colors.mystical.royal,
      onPress: () => navigation.navigate('SettingsScreen'),
      badge: null,
    },
    {
      id:'Privacy Policy',
      label:'Privacy Policy',
      description:'Read our privacy policy',
      icon:'shield-lock',
      color:colors.brand.primary,
      onPress:()=>navigation.navigate('PrivacyPolicyScreen'),
      badge:null,
    },
    // Logout item directly after Privacy Policy
    {
      id: 'logout',
      label: logoutLoading ? 'Logging out...' : 'Log out',
      description: 'Sign out of your account',
      icon: 'logout',
      color: '#FF0000', // Red color for logout
      onPress: handleLogout,
      badge: null,
      disabled: logoutLoading,
    },
  ];

  const glassCardStyle = createGlassMorphismStyle(CARD_GLASS_PRESET);

  const renderMenuItem = ({ item }: { item: any }) => (
    <AnimatedCard style={{ marginBottom: 12, marginTop: -10 }}>
      <TouchableOpacity
        onPress={item.onPress}
        activeOpacity={0.8}
        disabled={item.disabled}
      >
        <View style={[glassCardStyle, { padding: 20, borderRadius: 20 }]}>
          <View style={styles.menuItemHeader}>
            <View style={[styles.menuIcon, { backgroundColor: String(item.color) + '20' }]}>
              <MaterialCommunityIcons
                name={item.icon as any}
                size={20}
                color={item.color}
              />
            </View>
            <View style={styles.menuContent}>
              <Text
                style={[
                  styles.menuTitle,
                  item.id === 'logout'
                    ? { color: '#FF0000' }
                    : { color: colors.neutral.light },
                ]}
              >
                {item.label}
              </Text>
              <Text style={[styles.menuDescription, { color: colors.neutral.medium }]}> 
                {item.description}
              </Text>
            </View>
            {item.badge && (
              <View style={[
                styles.badge,
                { 
                  backgroundColor: typeof item.badge === 'number' 
                    ? colors.brand.accent 
                    : colors.luxury.pure 
                }
              ]}>
                <Text style={styles.badgeText}>
                  {typeof item.badge === 'number' ? item.badge.toString() : item.badge}
                </Text>
              </View>
            )}
            {item.id !== 'logout' && (
              <MaterialCommunityIcons 
                name="chevron-right" 
                size={16} 
                color={colors.neutral.medium} 
              />
            )}
          </View>
        </View>
      </TouchableOpacity>
    </AnimatedCard>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.cosmos.deep }}>
      <Statusbar />
      <CosmicBackground />
      <SafeAreaView style={{ flex: 1 }}>
        <PrimaryHeader
          backgroundColor="transparent"
          height="custom"
          customHeight={55}
          shadow={false}
          blur={false}
          animated
          leftButton={{
            id: 'back',
            icon: (
              <TouchableOpacity
                onPress={handleBack}
                style={{
                  height: 36,
                  width: 36,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 18,
                  backgroundColor: 'rgba(148, 163, 184, 0.1)',
                  marginLeft: -15
                }}
              >
                <ArrowLeft size={20} color="#CBD5E1" />
              </TouchableOpacity>
            ),
            onPress: handleBack,
            accessibilityLabel: 'Back',
          }}
          rightButtons={[
            {
              id: 'close',
              icon: (
                <TouchableOpacity
                  onPress={handleBack}
                  style={{
                    height: 36,
                    width: 36,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 18,
                    backgroundColor: 'rgba(148, 163, 184, 0.1)',
                    marginRight: -8
                  }}
                >
                  <MaterialCommunityIcons
                    name="close"
                    size={20}
                    color={colors.brand.primary}
                  />
                </TouchableOpacity>
              ),
              onPress: handleBack,
              accessibilityLabel: 'Close',
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
            data={menuItems}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 140, paddingTop: 20 }}
            renderItem={renderMenuItem}
            ListHeaderComponent={
              <>
                {/* Hero User Section */}
                <AnimatedCard style={{ marginBottom: 20, marginTop: -10 }}>
                  <View style={[glassCardStyle, { padding: 20, borderRadius: 20 }]}>
                    <View style={styles.heroHeader}>
                      <Animated.View
                        style={[
                          styles.userAvatar,
                          {
                            backgroundColor: String(colors.brand.primary) + '20',
                            transform: [{ scale: pulseAnim }],
                          },
                        ]}
                      >
                        <MaterialCommunityIcons
                          name="account-circle"
                          size={64}
                          color={colors.brand.primary}
                        />
                      </Animated.View>
                      <View style={styles.heroContent}>
                        <Text style={[styles.heroTitle, { color: colors.brand.primary }]}>
                          {user.name}
                        </Text>
                        <Text style={[styles.heroSubtitle, { color: colors.neutral.medium }]}>
                          {user.sign} • {user.status}
                        </Text>
                        <Text style={[styles.heroDescription, { color: colors.neutral.medium }]}>
                          Manage your account and app preferences
                        </Text>
                      </View>
                    </View>
                    
                    <View style={styles.heroStats}>
                      <View style={styles.statItem}>
                        <Text style={[styles.statNumber, { color: colors.luxury.pure }]}>7</Text>
                        <Text style={[styles.statLabel, { color: colors.neutral.medium }]}>Options</Text>
                      </View>
                      <View style={styles.statItem}>
                        <Text style={[styles.statNumber, { color: colors.mystical.light }]}>PRO</Text>
                        <Text style={[styles.statLabel, { color: colors.neutral.medium }]}>Status</Text>
                      </View>
                      <View style={styles.statItem}>
                        <Text style={[styles.statNumber, { color: colors.brand.accent }]}>∞</Text>
                        <Text style={[styles.statLabel, { color: colors.neutral.medium }]}>Features</Text>
                      </View>
                    </View>
                  </View>
                </AnimatedCard>

              
              </>
            }
          />
        </Animated.View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  menuItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: fontSizes.small.size,
    fontWeight: '600',
    marginBottom: 2,
  },
  menuDescription: {
    fontSize: fontSizes.caption.size,
    lineHeight: fontSizes.caption.lineHeight * fontSizes.caption.size,
  },
  badge: {
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 8,
  },
  badgeText: {
    color: '#fff',
    fontSize: fontSizes.micro.size,
    fontWeight: '600',
  },
  heroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  userAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  heroContent: {
    flex: 1,
  },
  heroTitle: {
    fontSize: fontSizes.h4.size,
    fontWeight: '600',
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: fontSizes.small.size,
    fontWeight: '500',
    marginBottom: 6,
  },
  heroDescription: {
    fontSize: fontSizes.caption.size,
    lineHeight: fontSizes.caption.lineHeight * fontSizes.caption.size,
  },
  heroStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: fontSizes.h5.size,
    fontWeight: '600',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: fontSizes.micro.size,
    fontWeight: '500',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 24,
    marginVertical: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontSize: fontSizes.small.size,
    fontWeight: '600',
    marginHorizontal: 12,
  },
});

export default MenuScreen;