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
  Bell,
  Star,
  TrendingUp,
  Users,
  Calendar,
  MessageCircle,
  Shield,
  Volume2,
  Smartphone,
  Clock,
  X,
  Sparkles,
  Moon,
  CheckCircle,
  AlertCircle,
  Info,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface NotificationsScreenProps {
  onClose: () => void;
}

export default function NotificationsScreen({ onClose }: NotificationsScreenProps) {
  const [notificationSettings, setNotificationSettings] = useState({
    dailyHoroscope: true,
    marketUpdates: true,
    consultationReminders: true,
    reportReady: true,
    promotions: false,
    systemUpdates: true,
    soundEnabled: true,
    vibrationEnabled: true,
    quietHours: true,
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
    setNotificationSettings(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  const recentNotifications = [
    {
      id: '1',
      type: 'horoscope',
      title: 'Daily Horoscope Ready',
      message: 'Your personalized horoscope for today is now available',
      time: '2 hours ago',
      read: false,
      icon: Star,
      color: '#f59e0b',
    },
    {
      id: '2',
      type: 'market',
      title: 'Market Alert',
      message: 'Jupiter transit indicates favorable time for investments',
      time: '4 hours ago',
      read: true,
      icon: TrendingUp,
      color: '#10b981',
    },
    {
      id: '3',
      type: 'consultation',
      title: 'Consultation Reminder',
      message: 'Your session with Astro Ratan starts in 30 minutes',
      time: '1 day ago',
      read: true,
      icon: Users,
      color: '#8b5cf6',
    },
    {
      id: '4',
      type: 'report',
      title: 'Report Generated',
      message: 'Your comprehensive health analysis report is ready',
      time: '2 days ago',
      read: true,
      icon: CheckCircle,
      color: '#06b6d4',
    },
    {
      id: '5',
      type: 'system',
      title: 'App Update Available',
      message: 'New features and improvements are now available',
      time: '3 days ago',
      read: true,
      icon: Info,
      color: '#6b7280',
    },
  ];

  const notificationCategories = [
    {
      title: 'Astrology Notifications',
      items: [
        {
          key: 'dailyHoroscope',
          icon: Star,
          title: 'Daily Horoscope',
          subtitle: 'Get your daily predictions every morning',
          color: '#f59e0b',
        },
        {
          key: 'marketUpdates',
          icon: TrendingUp,
          title: 'Market Updates',
          subtitle: 'Business astrology and market predictions',
          color: '#10b981',
        },
        {
          key: 'consultationReminders',
          icon: Users,
          title: 'Consultation Reminders',
          subtitle: 'Reminders for scheduled sessions',
          color: '#8b5cf6',
        },
      ],
    },
    {
      title: 'App Notifications',
      items: [
        {
          key: 'reportReady',
          icon: CheckCircle,
          title: 'Report Ready',
          subtitle: 'When your custom reports are generated',
          color: '#06b6d4',
        },
        {
          key: 'promotions',
          icon: Shield,
          title: 'Promotions & Offers',
          subtitle: 'Special deals and premium offers',
          color: '#ef4444',
        },
        {
          key: 'systemUpdates',
          icon: Info,
          title: 'System Updates',
          subtitle: 'App updates and maintenance notices',
          color: '#6b7280',
        },
      ],
    },
    {
      title: 'Notification Settings',
      items: [
        {
          key: 'soundEnabled',
          icon: Volume2,
          title: 'Sound',
          subtitle: 'Play notification sounds',
          color: '#7c3aed',
        },
        {
          key: 'vibrationEnabled',
          icon: Smartphone,
          title: 'Vibration',
          subtitle: 'Vibrate for notifications',
          color: '#dc2626',
        },
        {
          key: 'quietHours',
          icon: Moon,
          title: 'Quiet Hours (10 PM - 7 AM)',
          subtitle: 'Silence notifications during night',
          color: '#4c1d95',
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
          <Star size={14} color="#8b5cf6" style={[styles.star, styles.star2]} />
          <Moon size={18} color="#c084fc" style={[styles.star, styles.star3]} />
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
          <Text style={styles.title}>Notifications</Text>
          <TouchableOpacity style={styles.markAllButton}>
            <Text style={styles.markAllText}>Mark All Read</Text>
          </TouchableOpacity>
        </Animated.View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Recent Notifications */}
          <Animated.View
            style={[
              styles.section,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.sectionTitle}>Recent Notifications</Text>
            {recentNotifications.map((notification, index) => {
              const IconComponent = notification.icon;
              return (
                <TouchableOpacity
                  key={notification.id}
                  style={[
                    styles.notificationCard,
                    !notification.read && styles.unreadNotification,
                  ]}
                >
                  <LinearGradient
                    colors={['#1e1b4b', '#312e81']}
                    style={styles.notificationGradient}
                  >
                    <View style={styles.notificationHeader}>
                      <View style={[styles.notificationIcon, { backgroundColor: `${notification.color}20` }]}>
                        <IconComponent size={20} color={notification.color} />
                      </View>
                      <View style={styles.notificationContent}>
                        <Text style={styles.notificationTitle}>{notification.title}</Text>
                        <Text style={styles.notificationMessage}>{notification.message}</Text>
                        <Text style={styles.notificationTime}>{notification.time}</Text>
                      </View>
                      {!notification.read && <View style={styles.unreadDot} />}
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              );
            })}
          </Animated.View>

          {/* Notification Settings */}
          {notificationCategories.map((category, categoryIndex) => (
            <Animated.View
              key={category.title}
              style={[
                styles.section,
                {
                  opacity: fadeAnim,
                  transform: [{ 
                    translateY: Animated.multiply(slideAnim, categoryIndex * 0.3 + 1),
                  }],
                },
              ]}
            >
              <Text style={styles.sectionTitle}>{category.title}</Text>
              <LinearGradient
                colors={['#1e1b4b', '#312e81']}
                style={styles.settingsGradient}
              >
                {category.items.map((item, itemIndex) => {
                  const IconComponent = item.icon;
                  return (
                    <View key={item.key}>
                      <View style={styles.settingItem}>
                        <View style={[styles.settingIcon, { backgroundColor: `${item.color}20` }]}>
                          <IconComponent size={20} color={item.color} />
                        </View>
                        <View style={styles.settingContent}>
                          <Text style={styles.settingTitle}>{item.title}</Text>
                          <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
                        </View>
                        <Switch
                          value={notificationSettings[item.key as keyof typeof notificationSettings]}
                          onValueChange={() => toggleSetting(item.key)}
                          trackColor={{ false: '#374151', true: '#7c3aed' }}
                          thumbColor={notificationSettings[item.key as keyof typeof notificationSettings] ? '#ffd700' : '#9ca3af'}
                        />
                      </View>
                      {itemIndex < category.items.length - 1 && (
                        <View style={styles.itemDivider} />
                      )}
                    </View>
                  );
                })}
              </LinearGradient>
            </Animated.View>
          ))}

          {/* Quiet Hours Settings */}
          <Animated.View
            style={[
              styles.quietHoursContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <LinearGradient
              colors={['#1e1b4b', '#312e81']}
              style={styles.quietHoursGradient}
            >
              <View style={styles.quietHoursHeader}>
                <Clock size={24} color="#ffd700" />
                <Text style={styles.quietHoursTitle}>Quiet Hours Schedule</Text>
              </View>
              <Text style={styles.quietHoursDescription}>
                Notifications will be silenced during these hours to ensure peaceful rest
              </Text>
              <View style={styles.timeRange}>
                <View style={styles.timeItem}>
                  <Text style={styles.timeLabel}>From</Text>
                  <Text style={styles.timeValue}>10:00 PM</Text>
                </View>
                <View style={styles.timeItem}>
                  <Text style={styles.timeLabel}>To</Text>
                  <Text style={styles.timeValue}>7:00 AM</Text>
                </View>
              </View>
            </LinearGradient>
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
    top: '20%',
    left: '15%',
  },
  star2: {
    top: '35%',
    right: '20%',
  },
  star3: {
    bottom: '40%',
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
  markAllButton: {
    padding: 8,
  },
  markAllText: {
    fontSize: 14,
    color: '#8b5cf6',
    fontWeight: '600',
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
    marginBottom: 15,
  },
  notificationCard: {
    marginBottom: 10,
    borderRadius: 12,
    overflow: 'hidden',
  },
  unreadNotification: {
    borderLeftWidth: 3,
    borderLeftColor: '#ffd700',
  },
  notificationGradient: {
    padding: 15,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#c4b5fd',
    lineHeight: 20,
    marginBottom: 6,
  },
  notificationTime: {
    fontSize: 12,
    color: '#9ca3af',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ffd700',
    marginTop: 5,
  },
  settingsGradient: {
    borderRadius: 15,
    padding: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
  itemDivider: {
    height: 1,
    backgroundColor: '#374151',
    marginLeft: 55,
  },
  quietHoursContainer: {
    marginBottom: 30,
  },
  quietHoursGradient: {
    borderRadius: 15,
    padding: 20,
  },
  quietHoursHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  quietHoursTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 10,
  },
  quietHoursDescription: {
    fontSize: 14,
    color: '#c4b5fd',
    lineHeight: 20,
    marginBottom: 20,
  },
  timeRange: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  timeItem: {
    alignItems: 'center',
  },
  timeLabel: {
    fontSize: 12,
    color: '#8b5cf6',
    marginBottom: 5,
  },
  timeValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffd700',
  },
});