import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Dimensions,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Settings,
  Bell,
  Moon,
  Globe,
  Shield,
  Smartphone,
  Volume2,
  Eye,
  Download,
  Trash2,
  RefreshCw,
  X,
  ChevronRight,
  Star,
  Sparkles,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface SettingsScreenProps {
  onClose: () => void;
}

export default function SettingsScreen({ onClose }: SettingsScreenProps) {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: true,
    autoSync: true,
    soundEffects: true,
    biometric: false,
    dataSync: true,
    offlineMode: false,
    highContrast: false,
  });

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const sparkleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(sparkleAnim, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(sparkleAnim, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
          }),
        ])
      ),
    ]).start();
  }, []);

  const toggleSetting = (key: string) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  const settingSections = [
    {
      title: 'Notifications',
      items: [
        {
          key: 'notifications',
          icon: Bell,
          title: 'Push Notifications',
          subtitle: 'Receive daily horoscope and updates',
          type: 'toggle',
        },
        {
          key: 'soundEffects',
          icon: Volume2,
          title: 'Sound Effects',
          subtitle: 'App sounds and notification tones',
          type: 'toggle',
        },
      ],
    },
    {
      title: 'Appearance',
      items: [
        {
          key: 'darkMode',
          icon: Moon,
          title: 'Dark Mode',
          subtitle: 'Use dark theme throughout the app',
          type: 'toggle',
        },
        {
          key: 'highContrast',
          icon: Eye,
          title: 'High Contrast',
          subtitle: 'Improve text readability',
          type: 'toggle',
        },
      ],
    },
    {
      title: 'Data & Sync',
      items: [
        {
          key: 'autoSync',
          icon: RefreshCw,
          title: 'Auto Sync',
          subtitle: 'Automatically sync your data',
          type: 'toggle',
        },
        {
          key: 'offlineMode',
          icon: Download,
          title: 'Offline Mode',
          subtitle: 'Download content for offline use',
          type: 'toggle',
        },
      ],
    },
    {
      title: 'Security',
      items: [
        {
          key: 'biometric',
          icon: Shield,
          title: 'Biometric Lock',
          subtitle: 'Use fingerprint or face unlock',
          type: 'toggle',
        },
        {
          key: 'language',
          icon: Globe,
          title: 'Language',
          subtitle: 'English (US)',
          type: 'navigation',
        },
      ],
    },
    {
      title: 'Storage',
      items: [
        {
          key: 'clearCache',
          icon: Trash2,
          title: 'Clear Cache',
          subtitle: 'Free up storage space',
          type: 'action',
        },
        {
          key: 'dataUsage',
          icon: Smartphone,
          title: 'Data Usage',
          subtitle: 'View app data consumption',
          type: 'navigation',
        },
      ],
    },
  ];

  const sparkleOpacity = sparkleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.2, 0.8],
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0f0c29', '#24243e', '#302b63']}
        style={styles.gradient}
      >
        {/* Animated Background */}
        <Animated.View style={[styles.starsContainer, { opacity: sparkleOpacity }]}>
          <Sparkles size={16} color="#ffd700" style={[styles.star, styles.star1]} />
          <Star size={12} color="#8b5cf6" style={[styles.star, styles.star2]} />
          <Sparkles size={14} color="#c084fc" style={[styles.star, styles.star3]} />
        </Animated.View>

        {/* Header */}
        <Animated.View
          style={[
            styles.header,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.title}>Settings</Text>
          <View style={styles.placeholder} />
        </Animated.View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {settingSections.map((section, sectionIndex) => (
            <Animated.View
              key={section.title}
              style={[
                styles.section,
                {
                  opacity: fadeAnim,
                  transform: [{ 
                    translateY: Animated.multiply(slideAnim, sectionIndex * 0.3 + 1),
                  }],
                },
              ]}
            >
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <LinearGradient
                colors={['#1e1b4b', '#312e81']}
                style={styles.sectionGradient}
              >
                {section.items.map((item, itemIndex) => {
                  const IconComponent = item.icon;
                  return (
                    <View key={item.key}>
                      <TouchableOpacity
                        style={styles.settingItem}
                        onPress={() => {
                          if (item.type === 'toggle') {
                            toggleSetting(item.key);
                          }
                        }}
                      >
                        <View style={styles.settingIcon}>
                          <IconComponent size={20} color="#8b5cf6" />
                        </View>
                        <View style={styles.settingContent}>
                          <Text style={styles.settingTitle}>{item.title}</Text>
                          <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
                        </View>
                        <View style={styles.settingControl}>
                          {item.type === 'toggle' && (
                            <Switch
                              value={settings[item.key as keyof typeof settings] as boolean}
                              onValueChange={() => toggleSetting(item.key)}
                              trackColor={{ false: '#374151', true: '#7c3aed' }}
                              thumbColor={settings[item.key as keyof typeof settings] ? '#ffd700' : '#9ca3af'}
                            />
                          )}
                          {item.type === 'navigation' && (
                            <ChevronRight size={20} color="#8b5cf6" />
                          )}
                          {item.type === 'action' && (
                            <TouchableOpacity style={styles.actionButton}>
                              <Text style={styles.actionText}>Clear</Text>
                            </TouchableOpacity>
                          )}
                        </View>
                      </TouchableOpacity>
                      {itemIndex < section.items.length - 1 && (
                        <View style={styles.itemDivider} />
                      )}
                    </View>
                  );
                })}
              </LinearGradient>
            </Animated.View>
          ))}

          {/* App Info */}
          <Animated.View
            style={[
              styles.appInfoContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <LinearGradient
              colors={['#1e1b4b', '#312e81']}
              style={styles.appInfoGradient}
            >
              <Text style={styles.appInfoTitle}>CorpAstro</Text>
              <Text style={styles.appVersion}>Version 2.1.0</Text>
              <Text style={styles.appBuild}>Build 2024.01.15</Text>
              
              <View style={styles.appStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>4.8</Text>
                  <Text style={styles.statLabel}>Rating</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>50K+</Text>
                  <Text style={styles.statLabel}>Downloads</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>99.9%</Text>
                  <Text style={styles.statLabel}>Uptime</Text>
                </View>
              </View>
            </LinearGradient>
          </Animated.View>

          {/* Reset Button */}
          <Animated.View
            style={[
              styles.resetContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <TouchableOpacity style={styles.resetButton}>
              <LinearGradient
                colors={['#ef4444', '#dc2626']}
                style={styles.resetGradient}
              >
                <RefreshCw size={20} color="#ffffff" />
                <Text style={styles.resetText}>Reset All Settings</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  starsContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  star: {
    position: 'absolute',
  },
  star1: {
    top: '25%',
    left: '15%',
  },
  star2: {
    top: '40%',
    right: '20%',
  },
  star3: {
    bottom: '35%',
    left: '25%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  closeButton: {
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  sectionGradient: {
    borderRadius: 15,
    padding: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#374151',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  settingSubtitle: {
    fontSize: 12,
    color: '#c4b5fd',
    marginTop: 2,
  },
  settingControl: {
    alignItems: 'center',
  },
  actionButton: {
    backgroundColor: '#7c3aed',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  itemDivider: {
    height: 1,
    backgroundColor: '#374151',
    marginLeft: 55,
  },
  appInfoContainer: {
    marginBottom: 25,
  },
  appInfoGradient: {
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
  },
  appInfoTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffd700',
    marginBottom: 5,
  },
  appVersion: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 2,
  },
  appBuild: {
    fontSize: 12,
    color: '#c4b5fd',
    marginBottom: 20,
  },
  appStats: {
    flexDirection: 'row',
    width: '100%',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffd700',
  },
  statLabel: {
    fontSize: 12,
    color: '#c4b5fd',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#374151',
    marginHorizontal: 10,
  },
  resetContainer: {
    marginBottom: 30,
  },
  resetButton: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  resetGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  resetText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 10,
  },
});