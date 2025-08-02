import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Card } from '../../components/cards/Card';

const pages = [
  { name: 'Tabs', label: 'Home Screen' },
  { name: 'DemoHomePage', label: 'Demo Home Page' },
  { name: 'AnimationsDemoPage', label: 'Animations Demo Page' },
  { name: 'BackgroundScreen', label: 'Background Screen' },
  { name: 'SegmentControls', label: 'Segment Controls' },
  { name: 'TabsDemo', label: 'Tabs Demo' },
  { name: 'BlurEffectsScreen', label: 'Blur Effects Screen' },
  { name: 'LoginScreen', label: 'Login Screen' },
  {name: 'NorthIndianChartScreen', label: 'North Indian Chart Screen'}
];

// Define the navigation stack param list for type safety
// You can move this to a separate types file if you have more screens

type RootStackParamList = {
  HomeScreen: undefined;
  DemoHomePage: undefined;
  AnimationsDemoPage: undefined;
  BackgroundScreen: undefined;
  SegmentControls: undefined;
  TabsDemo: undefined;
  LoginScreen: undefined;
  OtpScreen: undefined;
  BeautifulHomeScreen: undefined;
};

import { StackNavigationProp } from '@react-navigation/stack';

const MainDemo = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Demo Navigation Cards</Text>
      {pages.map(page => (
        <TouchableOpacity key={page.name} onPress={() => navigation.navigate(page.name as keyof RootStackParamList)}>
          <Card style={styles.card}>
            <Text style={styles.cardText}>{page.label}</Text>
          </Card>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#12172b',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 32,
  },
  card: {
    width: 300,
    padding: 24,
    marginVertical: 14,
    borderRadius: 18,
    backgroundColor: '#232952',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  cardText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
  },
});

export default MainDemo;