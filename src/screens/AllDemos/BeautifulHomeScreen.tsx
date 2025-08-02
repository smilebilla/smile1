import React, { useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';

// Astrology Components
import { CompatibilityChart } from '../../components/astrology/CompatibilityChart';
import { HoroscopeCard } from '../../components/astrology/HoroscopeCard';
import { LunarPhase } from '../../components/astrology/LunarPhase';
import { PlanetIndicator } from '../../components/astrology/PlanetIndicator';
import { RetrogradeBadge } from '../../components/astrology/RetrogradeBadge';
import { StarMap } from '../../components/astrology/StarMap';
import { ZodiacCard } from '../../components/astrology/ZodiacCard';

// UI Primitives
import { ButtonPrimary } from '../../components/buttons/ButtonPrimary';

// Navigation Components
import { HeaderBase } from '../../components/composite/navigation/header/HeaderBase';
import { HeaderOverlay } from '../../components/composite/navigation/header/HeaderOverlay';
import { PrimaryHeader } from '../../components/composite/navigation/header/PrimaryHeader';
import { SearchHeader } from '../../components/composite/navigation/header/SearchHeader';
import { SectionHeader } from '../../components/composite/navigation/header/SectionHeader';
import { StatusBarBlur } from '../../components/composite/navigation/statusbar/StatusBarBlur';
import { SegmentedTabs, SegmentedTabsAnimation, SegmentedTabsSize, SegmentedTabsVariant } from '../../components/composite/navigation/tab/SegmentedTabs';

const zodiacList = [
  { sign: 'aries', name: 'Aries', symbol: '♈', element: 'fire', dateRange: 'Mar 21 - Apr 19' },
  { sign: 'taurus', name: 'Taurus', symbol: '♉', element: 'earth', dateRange: 'Apr 20 - May 20' },
  { sign: 'gemini', name: 'Gemini', symbol: '♊', element: 'air', dateRange: 'May 21 - Jun 20' },
  { sign: 'cancer', name: 'Cancer', symbol: '♋', element: 'water', dateRange: 'Jun 21 - Jul 22' },
  { sign: 'leo', name: 'Leo', symbol: '♌', element: 'fire', dateRange: 'Jul 23 - Aug 22' },
  { sign: 'virgo', name: 'Virgo', symbol: '♍', element: 'earth', dateRange: 'Aug 23 - Sep 22' },
  { sign: 'libra', name: 'Libra', symbol: '♎', element: 'air', dateRange: 'Sep 23 - Oct 22' },
  { sign: 'scorpio', name: 'Scorpio', symbol: '♏', element: 'water', dateRange: 'Oct 23 - Nov 21' },
  { sign: 'sagittarius', name: 'Sagittarius', symbol: '♐', element: 'fire', dateRange: 'Nov 22 - Dec 21' },
  { sign: 'capricorn', name: 'Capricorn', symbol: '♑', element: 'earth', dateRange: 'Dec 22 - Jan 19' },
  { sign: 'aquarius', name: 'Aquarius', symbol: '♒', element: 'air', dateRange: 'Jan 20 - Feb 18' },
  { sign: 'pisces', name: 'Pisces', symbol: '♓', element: 'water', dateRange: 'Feb 19 - Mar 20' },
];

const horoscopeData = {
  content: 'Today is a day for new beginnings. Trust your intuition and embrace opportunities that come your way. The stars are aligned in your favor!',
  period: 'daily' as const,
  dateRange: 'Mar 21 - Apr 19',
  luckRating: 4,
  luckyNumbers: [7, 14, 21],
  luckyColors: ['Red', 'Gold'],
  mood: 'good' as const,
  themes: ['Courage', 'Action'],
};

const compatibilityData = {
  sign1: 'aries' as const,
  sign2: 'leo' as const,
  overallScore: 88,
  scores: [
    { aspect: 'love' as const, score: 95, description: 'Passionate and exciting.' },
    { aspect: 'friendship' as const, score: 90, description: 'Loyal and fun.' },
    { aspect: 'communication' as const, score: 80, description: 'Direct and honest.' },
    { aspect: 'trust' as const, score: 85, description: 'Mutual respect.' },
    { aspect: 'values' as const, score: 75, description: 'Similar ambitions.' },
    { aspect: 'overall' as const, score: 88, description: 'A fiery match.' },
  ],
  strengths: ['Passion', 'Energy', 'Loyalty'],
  challenges: ['Stubbornness', 'Ego'],
  description: 'Aries and Leo are a dynamic duo, full of energy and excitement. Their relationship is marked by passion and mutual admiration.',
};

const planetData = [
  { planet: 'sun' as const, position: 10, sign: 'aries' as const, house: 1, retrograde: false, influence: 90 },
  { planet: 'moon' as const, position: 120, sign: 'cancer' as const, house: 4, retrograde: false, influence: 80 },
  { planet: 'mercury' as const, position: 45, sign: 'taurus' as const, house: 2, retrograde: true, influence: 70 },
];

const lunarPhaseData = {
  phase: 'full_moon' as const,
  illumination: 100,
  date: '2024-05-23',
  nextPhase: 'waning_gibbous' as const,
  daysUntilNext: 3,
  significance: 'Culmination, completion, heightened energy',
  activities: ['Celebrate achievements', 'Express gratitude'],
};

const retrogradeData = {
  planet: 'mercury' as const,
  status: 'retrograde' as const,
  startDate: '2024-05-10',
  endDate: '2024-06-03',
  duration: 24,
  daysRemaining: 10,
  influence: 80,
  effects: 'Communication delays, tech issues, revisit old projects.',
};

const starMapData = {
  stars: [
    { id: '1', x: 0.2, y: 0.3, magnitude: 1.2, name: 'Sirius', color: '#fff' },
    { id: '2', x: 0.5, y: 0.5, magnitude: 2.0, name: 'Betelgeuse', color: '#ffe066' },
    { id: '3', x: 0.7, y: 0.2, magnitude: 1.8, name: 'Rigel', color: '#b2f7ef' },
  ],
  constellations: [
    { id: 'orion', name: 'Orion', connections: [['1', '2'], ['2', '3']], description: 'The Hunter' },
  ],
  title: 'Night Sky',
  datetime: '2024-05-23T22:00:00Z',
  location: 'Earth',
};

const BeautifulHomeScreen: React.FC = () => {
  const [isHeaderOverlayVisible, setIsHeaderOverlayVisible] = useState(true);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  


  return (
    <View style={styles.screenContainer}>
      <ScrollView 
        contentContainerStyle={styles.container}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Status Bar Blur - Top Layer */}
        <StatusBarBlur 
          variant="scroll"
          intensity="medium"
          animation="fade"
          scrollThreshold={30}
          backgroundColor="rgba(15, 23, 42, 0.85)"
          style={styles.statusBarBlur}
        />
        
        {/* Header Base - Below Status Bar */}
        <HeaderBase
          variant="transparent"
          size="medium"
          position="static"
          animation="fade"
          config={{
            shadow: true,
            blur: true,
          }}
          slots={{
            left: <Text style={styles.headerTitle}>✨ Astro</Text>,
            right: (
              <View style={styles.headerActions}>
                <Text style={styles.headerIcon}>🌙</Text>
                <Text style={styles.headerIcon}>⭐</Text>
              </View>
            ),
          }}
          backgroundColor="rgba(15, 23, 42, 0.9)"
          style={styles.headerBase}
        />
        
        {/* Header Overlay - Floating Below Header */}
        <HeaderOverlay
          variant="blur"
          position="top"
          visible={true}
          trigger="manual"
          scrollThreshold={150}
          height={100}
          animation="slide"
          animationDuration={400}
          backgroundColor="rgba(15, 23, 42, 0.95)"
          borderRadius={16}
          shadow={true}
          shadowConfig={{
            color: '#000',
            opacity: 0.3,
            radius: 12,
            elevation: 8,
          }}
          style={styles.headerOverlay}
          content={
            <View style={styles.overlayContent}>
              <Text style={styles.overlayTitle}>Quick Actions</Text>
              <View style={styles.overlayActions}>
                <Text style={styles.overlayAction}>📊 Charts</Text>
                <Text style={styles.overlayAction}>🔮 Reading</Text>
                <Text style={styles.overlayAction}>⚡ Insights</Text>
              </View>
            </View>
          }
        />
        
        {/* Primary Header - Main Navigation */}
        <PrimaryHeader
          variant="default"
          height="standard"
          title="🌟 Astro Dashboard"
          subtitle="Your cosmic journey awaits"
          leftButton={{
            id: 'menu',
            icon: '☰',
            onPress: () => {},
            accessibilityLabel: 'Menu',
          }}
          rightButtons={[
            {
              id: 'search',
              icon: '🔍',
              onPress: () => {},
              accessibilityLabel: 'Search',
            },
            {
              id: 'profile',
              icon: '👤',
              onPress: () => {},
              accessibilityLabel: 'Profile',
            },
          ]}
          backgroundColor="rgba(15, 23, 42, 0.98)"
          shadow={true}
          blur={true}
          animated={true}
          style={styles.primaryHeader}
        />
        
        {/* Search Header - Advanced Search */}
        <SearchHeader
          variant="default"
          size="medium"
          placeholder="Search astrology, horoscopes, signs..."
          showSuggestions={true}
          showFilters={true}
          enableVoiceSearch={true}
          enableHistory={true}
          suggestions={[
            {
              id: '1',
              text: 'Aries horoscope',
              type: 'suggestion',
              icon: '♈',
              metadata: 'Zodiac sign',
            },
            {
              id: '2',
              text: 'Mercury retrograde',
              type: 'suggestion',
              icon: '☿',
              metadata: 'Planet movement',
            },
            {
              id: '3',
              text: 'Love compatibility',
              type: 'history',
              icon: '❤️',
              metadata: 'Recent search',
            },
          ]}
          filters={[
            {
              id: 'signs',
              label: 'Signs',
              value: 'zodiac-signs',
              icon: '✨',
              active: false,
            },
            {
              id: 'planets',
              label: 'Planets',
              value: 'planets',
              icon: '🪐',
              active: false,
            },
            {
              id: 'readings',
              label: 'Readings',
              value: 'horoscope-readings',
              icon: '🔮',
              active: true,
            },
          ]}
          actions={[
            {
              id: 'filter',
              icon: '⚙️',
              onPress: () => {},
              accessibilityLabel: 'Search filters',
            },
          ]}
          backgroundColor="rgba(15, 23, 42, 0.96)"
          shadow={true}
          animated={true}
          style={styles.searchHeader}
          onChangeText={(text) => console.log('Search:', text)}
          onSubmit={(text) => console.log('Submit:', text)}
        />
        
        {/* Section Header - Content Organization */}
        <SectionHeader
          variant="prominent"
          size="medium"
          title="Cosmic Insights"
          subtitle="Explore your celestial journey"
          description="Discover personalized horoscopes, zodiac compatibility, and planetary influences tailored to your cosmic profile."
          icon="🌌"
          collapsible={true}
          collapsed={false}
          breadcrumbs={[
            {
              id: 'home',
              text: 'Home',
              onPress: () => {},
              isActive: false,
            },
            {
              id: 'dashboard',
              text: 'Dashboard',
              onPress: () => {},
              isActive: false,
            },
            {
              id: 'insights',
              text: 'Cosmic Insights',
              isActive: true,
            },
          ]}
          actions={[
            {
              id: 'refresh',
              icon: '🔄',
              onPress: () => {},
              accessibilityLabel: 'Refresh insights',
            },
            {
              id: 'settings',
              icon: '⚙️',
              onPress: () => {},
              accessibilityLabel: 'Section settings',
            },
            {
              id: 'share',
              icon: '📤',
              onPress: () => {},
              accessibilityLabel: 'Share insights',
            },
          ]}
          backgroundColor="rgba(15, 23, 42, 0.94)"
          shadow={true}
          animated={true}
          style={styles.sectionHeader}
          onCollapseToggle={(collapsed) => console.log('Section collapsed:', collapsed)}
        />
        <Text style={styles.subtitle}>Your daily cosmic insights await ✨</Text>
        {/* Zodiac Section */}
        <Text style={styles.sectionTitle}>Zodiac Signs</Text>
        <FlatList
          data={zodiacList}
          keyExtractor={item => item.sign}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.zodiacList}
          renderItem={({ item }) => (
            <ZodiacCard
              sign={item.sign as any}
              name={item.name}
              symbol={item.symbol}
              element={item.element as any}
              dateRange={item.dateRange}
              style={styles.zodiacCard}
              pressable={false}
            />
          )}
        />
        {/* Daily Horoscope */}
        <Text style={styles.sectionTitle}>Daily Horoscope</Text>
        <HoroscopeCard sign="aries" horoscope={horoscopeData} />
        {/* Compatibility */}
        <Text style={styles.sectionTitle}>Compatibility</Text>
        <CompatibilityChart data={compatibilityData} size="medium" />
        {/* Planets */}
        <Text style={styles.sectionTitle}>Planets</Text>
        <View style={styles.planetRow}>
          {planetData.map((planet, idx) => (
            <PlanetIndicator key={planet.planet} data={planet} size="medium" />
          ))}
        </View>
        {/* Lunar Phase */}
        <Text style={styles.sectionTitle}>Lunar Phase</Text>
        <LunarPhase data={lunarPhaseData} size="medium" />
        {/* Retrograde */}
        <Text style={styles.sectionTitle}>Retrograde</Text>
        <RetrogradeBadge data={retrogradeData} size="medium" />
        {/* Star Map */}
        <Text style={styles.sectionTitle}>Star Map</Text>
        <StarMap data={starMapData} size="small" />
        {/* Navigation Buttons */}
        <View style={styles.buttonRow}>
          <ButtonPrimary
            onPress={() => {}}
            config={{ size: 'medium', variant: 'wide' }}
            style={styles.button}
          >
            Profile
          </ButtonPrimary>
          <ButtonPrimary
            onPress={() => {}}
            config={{ size: 'medium', variant: 'wide' }}
            style={styles.button}
          >
            Horoscope
          </ButtonPrimary>
          <ButtonPrimary
            onPress={() => {}}
            config={{ size: 'medium', variant: 'wide' }}
            style={styles.button}
          >
            Settings
          </ButtonPrimary>
        </View>
        <View style={styles.contentSection}>
          <Text style={styles.contentText}>Your cosmic journey continues...</Text>
        </View>
      </ScrollView>
      
      {/* SegmentedTabs - Fixed Bottom Navigation */}
      <View style={styles.segmentedTabsContainer}>
        <SegmentedTabs
          segments={[
            {
              id: 'horoscope',
              label: 'Horoscope',
              icon: <Text style={styles.tabIcon}>🔮</Text>,
              badge: {
                count: 3,
                color: '#fbbf24',
                textColor: '#1f2937',
                variant: 'count',
              },
            },
            {
              id: 'compatibility',
              label: 'Love',
              icon: <Text style={styles.tabIcon}>💕</Text>,
            },
            {
              id: 'planets',
              label: 'Planets',
              icon: <Text style={styles.tabIcon}>🪐</Text>,
              badge: {
                variant: 'dot',
                color: '#38bdf8',
              },
            },
            {
              id: 'lunar',
              label: 'Lunar',
              icon: <Text style={styles.tabIcon}>🌙</Text>,
            },
            {
              id: 'insights',
              label: 'Insights',
              icon: <Text style={styles.tabIcon}>✨</Text>,
              badge: {
                count: 12,
                color: '#a855f7',
                textColor: '#ffffff',
                variant: 'count',
              },
            },
          ]}
          selectedIndex={selectedTabIndex}
          onSelectionChange={(index, segment) => {
            setSelectedTabIndex(index);
            console.log('Selected tab:', segment.label);
          }}
          variant={SegmentedTabsVariant.PILLS}
          size={SegmentedTabsSize.MEDIUM}
          animation={SegmentedTabsAnimation.SMOOTH}
          styleConfig={{
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            selectedBackgroundColor: 'rgba(59, 130, 246, 0.3)',
            borderColor: 'rgba(59, 130, 246, 0.3)',
            selectedBorderColor: '#38bdf8',
            textColor: '#e2e8f0',
            selectedTextColor: '#38bdf8',
            borderRadius: 12,
            borderWidth: 1,
            shadow: false,
            elevation: 4,
          }}
          animationConfig={{
            duration: 300,
            useNativeDriver: false,
            damping: 20,
            stiffness: 200,
          }}
          gestureConfig={{
            enabled: true,
            swipeEnabled: true,
            hapticFeedback: true,
          }}
          accessibilityLabel="Astrology navigation tabs"
          accessibilityHint="Navigate between different astrology sections"
          testID="astrology-segmented-tabs"
        />
        
        {/* Simple Tab Indicator - No animation conflicts */}
        <View style={styles.simpleTabIndicator}>
          <View 
            style={[
              styles.indicatorDot,
              { left: `${selectedTabIndex * 20}%` }
            ]} 
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 16,
  },
  subtitle: {
    color: '#38bdf8',
    fontSize: 18,
    marginBottom: 24,
    textAlign: 'center',
  },
  sectionTitle: {
    color: '#fbbf24',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 32,
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  zodiacList: {
    paddingBottom: 8,
    paddingLeft: 2,
    paddingRight: 2,
  },
  zodiacCard: {
    marginRight: 12,
  },
  planetRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    gap: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
    width: '100%',
    gap: 12,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
  headerTitle: {
    color: '#fbbf24',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerIcon: {
    fontSize: 18,
  },
  overlayContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  overlayTitle: {
    color: '#fbbf24',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  overlayActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
  },
  overlayAction: {
    color: '#38bdf8',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  // Navigation Component Styles - Now scrollable
  statusBarBlur: {
    marginBottom: 5,
  },
  headerBase: {
    marginBottom: 17,
  },
  headerOverlay: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  scrollView: {
    flex: 1,
  },
  primaryHeader: {
    marginHorizontal: 0,
    marginBottom: 16,
  },
  searchHeader: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  sectionHeader: {
    marginHorizontal: 0,
    marginBottom: 16,
  },
  // SegmentedTabs Styles - Fixed Bottom Navigation
  segmentedTabsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
    padding: 16,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
  },
  contentSection: {
    marginBottom: 100, // Add space for fixed bottom tabs
  },
  contentText: {
    color: '#e2e8f0',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  tabIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  // Simple Tab Indicator Styles
  simpleTabIndicator: {
    position: 'absolute',
    bottom: 8,
    left: 16,
    right: 16,
    height: 3,
    backgroundColor: 'transparent',
  },
  indicatorDot: {
    position: 'absolute',
    bottom: 0,
    width: '20%',
    height: 3,
    backgroundColor: '#38bdf8',
    borderRadius: 2,
    shadowColor: '#38bdf8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
});

export default BeautifulHomeScreen;