import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AstroAITab from './AstroAITab';
import CalendarTab from './CalendarTab';
import ChartsTab from './ChartsTab';
import HomeTab from './HomeTab';
import ReportsTab from './MarketTab';

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window');

const TABS = [
  { name: 'Home', icon: 'home-variant' },
  { name: 'Charts', icon: 'chart-donut' },
  { name: 'AstroAI', icon: 'robot-excited-outline' },
  { name: 'Market', icon: 'chart-box-outline' },
  { name: 'Calendar', icon: 'calendar-month' },
];

function MyTabBar({ state, descriptors, navigation }: { state: any, descriptors: any, navigation: any }) {
  const insets = useSafeAreaInsets();
  const translateX = useRef(new Animated.Value((width / TABS.length) * state.index)).current;

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: (width / TABS.length) * state.index,
      useNativeDriver: true,
      speed: 20,
      bounciness: 8,
    }).start();
  }, [state.index]);

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#0f172a',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingBottom: insets.bottom,
        paddingTop: 5,
        position: 'absolute',
        bottom: 0,
        width,
        justifyContent: 'space-around',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: -3 },
        overflow: 'hidden',
      }}
    >
      <Animated.View
            style={{
            position: 'absolute',
            bottom: insets.bottom + 5,
            left: 3,
            height: 50,
            width: (width / TABS.length),
            transform: [{ translateX }],
            alignItems: 'center',

            
            justifyContent: 'center',
  }}
>
        <View
          style={{
            backgroundColor: '#ffffff',
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderRadius: 50,
            flexDirection: 'row',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 5,
            shadowOffset: { width: 0, height: 2 },
          }}
        >
          <MaterialCommunityIcons
            name={TABS[state.index].icon as any}
            size={20}
            color="#000"
            style={{ marginRight: 6 }}
          />
          <Text style={{ fontWeight: 'bold', color: '#000' }}>
            {TABS[state.index].name}
          </Text>
        </View>
      </Animated.View>

      {state.routes.map((route: any, index: number) => {
        const icon = TABS.find(t => t.name === route.name)?.icon || 'circle';
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            onPress={onPress}
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: 60 }}
          >
            {!isFocused && (
              <MaterialCommunityIcons name={icon as any} size={24} color="#aaa" />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={(props) => <MyTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={HomeTab} />
      <Tab.Screen name="Charts" component={ChartsTab} />
      <Tab.Screen name="AstroAI" component={AstroAITab} />
      <Tab.Screen name="Market" component={ReportsTab} />
      <Tab.Screen name="Calendar" component={CalendarTab} />
    </Tab.Navigator>
  );
}
