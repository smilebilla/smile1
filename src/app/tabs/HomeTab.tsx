// Same imports as before
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  FlatList,
  Image as RNImage,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { ZodiacSign } from '../../components/astrology/ZodiacCard';
import ButtonIcon from '../../components/buttons/ButtonIcon';
import { PrimaryHeader } from '../../components/composite/navigation/header/PrimaryHeader';
import { Badge } from '../../components/feedback';
import { useTheme } from '../../components/foundations/themes/useTheme';

// Feature imports
import { fontSizes } from '../../components/foundations/tokens';
import AnimatedCard from '../../components/MobileApp/AnimatedCard';
import AstroRatanAISection from '../../components/MobileApp/AstroRatanAISection';
import BusinessAndNumerology from '../../components/MobileApp/BusinessAndNumerology';
import ChartExplorer from '../../components/MobileApp/ChartExplorer';
import CosmicBackground from '../../components/MobileApp/CosmicBackground';
import CosmicDashboard from '../../components/MobileApp/CosmicDashboard';
import CosmicWeather from '../../components/MobileApp/CosmicWeather';
import FreeServices from '../../components/MobileApp/FreeServices';
import HeroSection from '../../components/MobileApp/HeroSection';
import ModernHoroscopeCard from '../../components/MobileApp/ModernHoroscopeCard';
import PersonalReports from '../../components/MobileApp/PersonalReports';
import PremiumServices from '../../components/MobileApp/PremiumServices';
import QuickActions from '../../components/MobileApp/QuickActions';
import Statusbar from '../../components/MobileApp/Statusbar';
import TodaysWeather from '../../components/MobileApp/TodaysWeather';
import { Label } from '../../components/typography';

// Typography tokens

const horoscopeData = {
  content:
    'Today is a day for new beginnings.Trust your intuition and embrace opportunities that come your way.',
  mood: 'excellent' as 'excellent',
};

const HomeTab: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();

  const mainListData = [{ key: 'content' }];

  return (
    <View style={{ flex: 1, backgroundColor: colors.cosmos.deep }}>
      <Statusbar />
      <CosmicBackground />
      <SafeAreaView style={{ flex: 1 }}>
        <PrimaryHeader
          title={
            <RNImage
              source={require('../../../assets/images/CorpAstro.png')}
              style={{ width: 160, height: 50, alignSelf: 'center' }}
              resizeMode="contain"
            />
          }
          backgroundColor="transparent"
          height="custom"
          customHeight={55}
          shadow={false}
          blur={false}
          animated
          leftButton={{
            id: 'menu',
            icon: (
              <ButtonIcon onPress={() => navigation.navigate('MenuScreen')} style={{ marginLeft: -15 }}>
                <Text style={{ fontSize: fontSizes.h3.size, marginTop: -7, color: colors.brand.primary }}>☰</Text>
              </ButtonIcon>
            ),
            onPress: () => navigation.navigate('MenuScreen'),
            accessibilityLabel: 'Menu',
          }}
          rightButtons={[
            {
              id: 'notifications',
              icon: (
                <View style={{ position: 'relative', marginRight: -8 }}>
                  <ButtonIcon onPress={() => {}}>
                    <Text style={{ fontSize: fontSizes.h4.size, marginTop: -7, marginLeft: -3, color: colors.brand.primary }}>🔔</Text>
                  </ButtonIcon>
                  <Badge
                    variant="number"
                    count={9}
                    color="primary"
                    size="small"
                    style={{ position: 'absolute', top: -4, right: -6 }}
                  />
                </View>
              ),
              onPress: () => navigation.navigate('NotificationsScreen'),
              accessibilityLabel: 'Notifications',
            },
          ]}
        />

        <FlatList
          data={mainListData}
          keyExtractor={item => item.key}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 140, paddingTop: 20 }}
          renderItem={undefined}
          ListHeaderComponent={
            <>
              {/* Hero + Horoscope */}
              <AnimatedCard>
                <HeroSection userName="Ismail" sunSign="Leo" moonSign="Taurus" ascendantSign="Aries" />
              </AnimatedCard>

              <AnimatedCard>
                <ModernHoroscopeCard sign={'leo' as ZodiacSign} horoscope={horoscopeData} />
              </AnimatedCard>

              <AnimatedCard style={{ marginBottom: 20, marginTop: -10 }}>
                <AstroRatanAISection />
              </AnimatedCard>

              {/* Services */}
              <AnimatedCard style={{ marginBottom: 20, marginTop: -50 }}>
                <FreeServices />
              </AnimatedCard>

              <AnimatedCard style={{ marginBottom: 0, marginTop: -55 }}>
                <PremiumServices />
              </AnimatedCard>

              {/* Reports */}
        
              <AnimatedCard style={{ marginBottom: 20, marginTop: -50 }}>
                <PersonalReports />
              </AnimatedCard>

              <AnimatedCard style={{ marginBottom: 20, marginTop: -60 }}>
                <CosmicDashboard />
              </AnimatedCard>

              <AnimatedCard style={{ marginBottom: 20, marginTop: -30 }}>
                <BusinessAndNumerology />
              </AnimatedCard>

              <AnimatedCard style={{ marginBottom: 20, marginTop: -60 }}>
                <CosmicWeather />
              </AnimatedCard>

  

              <AnimatedCard style={{ marginBottom: 20, marginTop: -20 }}>
                <TodaysWeather />
              </AnimatedCard>
 
 
              <AnimatedCard style={{ marginBottom: 20, marginTop: -10 }}>
                <QuickActions />
              </AnimatedCard>
             

              <AnimatedCard style={{ marginBottom: 20, marginTop: -40 }}>
                <ChartExplorer />
              </AnimatedCard>
           

              <View style={{ height: 40 }} />
            </>
          }
        />
      </SafeAreaView>

    </View>
  );
};

// Custom reusable divider
const Divider = ({ label, color, style }: { label: string; color: string; style?: object }) => (
  <View style={[styles.sectionDivider, style]}>
    <View style={[styles.dividerLine, { backgroundColor: color + '30' }]} />
    <Label color="primary" weight="semibold" style={StyleSheet.flatten([styles.dividerText, { color }])}>{label}</Label>
    <View style={[styles.dividerLine, { backgroundColor: color + '30' }]} />
  </View>
);

const styles = StyleSheet.create({
  sectionDivider: {
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
});

export default HomeTab;
