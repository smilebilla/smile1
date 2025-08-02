import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PrimaryHeader } from '../../components/composite/navigation/header/PrimaryHeader';
import { useTheme } from '../../components/foundations/themes/useTheme';
import AnimatedCard from '../../components/MobileApp/AnimatedCard';
import CosmicBackground from '../../components/MobileApp/CosmicBackground';
import Statusbar from '../../components/MobileApp/Statusbar';
// Typography tokens
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import { fontSizes } from '../../components/foundations/tokens';

const daysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
const getToday = () => {
  const now = new Date();
  return { day: now.getDate(), month: now.getMonth(), year: now.getFullYear() };
};

const CalendarTab: React.FC = () => {
  const { colors } = useTheme();
  const today = getToday();
  const [selectedDate, setSelectedDate] = useState<{ day: number; month: number; year: number } | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [currentMonth, setCurrentMonth] = useState(today.month);
  const [currentYear, setCurrentYear] = useState(today.year);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const days = Array.from({ length: daysInMonth(currentMonth, currentYear) }, (_, i) => i + 1);

  const handleDayPress = (day: number) => {
    setSelectedDate({ day, month: currentMonth, year: currentYear });
    setModalVisible(true);
  };

  const closeModal = () => setModalVisible(false);

  const goToPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(y => y - 1);
    } else {
      setCurrentMonth(m => m - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(y => y + 1);
    } else {
      setCurrentMonth(m => m + 1);
    }
  };

  const navigation = useNavigation<any>();

  return (
    <View style={{ flex: 1, backgroundColor: colors.cosmos.deep }}>
      <Statusbar />
      <CosmicBackground />
      <SafeAreaView style={{ flex: 1 }}>
        <PrimaryHeader
          title={<Text style={{ fontSize: 20, fontWeight: '600', color: colors.brand.primary }}>Calendar</Text>}
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
                onPress={() => navigation.goBack()}
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
            onPress: () => navigation.goBack(),
            accessibilityLabel: 'Back',
          }}
        />

        <ScrollView contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
          <AnimatedCard style={{ margin: 16 }}>
            <View style={styles.headerRow}>
            <TouchableOpacity onPress={goToPrevMonth} style={styles.monthNavBtn}>
              <MaterialCommunityIcons name="chevron-left" size={28} color={colors.brand.primary} />
            </TouchableOpacity>
            <Text style={[styles.monthTitle, { color: colors.brand.primary }]}>
              {monthNames[currentMonth]} {currentYear}
            </Text>
            <TouchableOpacity onPress={goToNextMonth} style={styles.monthNavBtn}>
              <MaterialCommunityIcons name="chevron-right" size={28} color={colors.brand.primary} />
            </TouchableOpacity>
          </View>
          <View style={styles.weekRow}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
              <Text key={d} style={[styles.weekDay, { color: colors.neutral.medium }]}>{d}</Text>
            ))}
          </View>
          <View style={styles.calendarGrid}>
            {Array(new Date(currentYear, currentMonth, 1).getDay()).fill(0).map((_, i) => (
              <View key={i} style={styles.emptyDayCell} />
            ))}
            {days.map(day => {
              const isToday =
                day === today.day && currentMonth === today.month && currentYear === today.year;
              return (
                <TouchableOpacity
                  key={day}
                  style={[
                    styles.dayCell,
                    isToday && { borderColor: colors.brand.accent, borderWidth: 2 },
                  ]}
                  onPress={() => handleDayPress(day)}
                >
                  <Text style={[styles.dayNumber, isToday && { color: colors.brand.accent }]}> {day} </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </AnimatedCard>

        {/* --- Astrology Dashboard Content Below Calendar --- */}
        <AnimatedCard style={{ marginHorizontal: 16, marginBottom: 12 }}>
          <Text style={{ color: colors.brand.primary, fontWeight: 'bold', fontSize: fontSizes.h4.size, marginBottom: 6 }}>Today's Horoscope</Text>
          <Text style={{ color: colors.neutral.light, fontSize: fontSizes.body.size }}>
            You’re feeling energized and ready for new beginnings. Trust your instincts and embrace opportunities that come your way. ✨
          </Text>
        </AnimatedCard>

        <AnimatedCard style={{ marginHorizontal: 16, marginBottom: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons name="moon-waning-crescent" size={32} color={colors.brand.accent} />
            <Text style={{ color: colors.brand.accent, fontWeight: 'bold', fontSize: fontSizes.h4.size, marginLeft: 10 }}>Moon Phase</Text>
          </View>
          <Text style={{ color: colors.neutral.light, fontSize: fontSizes.body.size }}>Waxing Crescent</Text>
        </AnimatedCard>

        <AnimatedCard style={{ marginHorizontal: 16, marginBottom: 12 }}>
          <Text style={{ color: colors.brand.primary, fontWeight: 'bold', fontSize: fontSizes.h4.size, marginBottom: 6 }}>Today's Astro Events</Text>
          <Text style={{ color: colors.neutral.light, fontSize: fontSizes.body.size }}>• Venus enters Leo
• Sun trine Jupiter
• Full Moon in Aquarius tomorrow</Text>
        </AnimatedCard>

        <AnimatedCard style={{ marginHorizontal: 16, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 10 }}>
          <TouchableOpacity style={{ alignItems: 'center' }}>
            <MaterialCommunityIcons name="plus-circle-outline" size={28} color={colors.brand.primary} />
            <Text style={{ color: colors.brand.primary, fontSize: fontSizes.body.size }}>Add Event</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: 'center' }}>
            <MaterialCommunityIcons name="account-star-outline" size={28} color={colors.brand.primary} />
            <Text style={{ color: colors.brand.primary, fontSize: fontSizes.body.size }}>My Chart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: 'center' }}>
            <MaterialCommunityIcons name="weather-night" size={28} color={colors.brand.primary} />
            <Text style={{ color: colors.brand.primary, fontSize: fontSizes.body.size }}>Cosmic Weather</Text>
          </TouchableOpacity>
        </AnimatedCard>

        <AnimatedCard style={{ marginHorizontal: 16, marginBottom: 20 }}>
          <Text style={{ color: colors.brand.accent, fontWeight: 'bold', fontSize: fontSizes.h4.size, marginBottom: 4 }}>Affirmation</Text>
          <Text style={{ color: colors.neutral.light, fontSize: fontSizes.body.size, fontStyle: 'italic' }}>
            "I am aligned with the cosmic flow and ready for wonderful surprises."
          </Text>
        </AnimatedCard>

        </ScrollView>

        <Modal visible={modalVisible} transparent animationType="fade">
          <View style={styles.modalBackdrop}>
            <View style={[styles.modalContent, { backgroundColor: colors.cosmos.deep }]}> 
              <Text style={[styles.modalTitle, { color: colors.brand.primary }]}>Astro Snapshot</Text>
              <Text style={[styles.modalDate, { color: colors.neutral.medium }]}> 
                {selectedDate ? `${selectedDate.day} ${monthNames[selectedDate.month]}, ${selectedDate.year}` : ''}
              </Text>
              {/* Enhanced astrological info; structure for easy extension */}
              <View style={{ marginBottom: 16 }}>
                <Text style={[styles.astroInfo, { color: colors.neutral.light }]}>• Moon Phase: Waxing Crescent</Text>
                <Text style={[styles.astroInfo, { color: colors.neutral.light }]}>• Sun Sign: Leo</Text>
                <Text style={[styles.astroInfo, { color: colors.neutral.light }]}>• Major Aspect: Venus trine Jupiter</Text>
                <Text style={[styles.astroInfo, { color: colors.neutral.light }]}>• Lucky Color: Gold</Text>
                <Text style={[styles.astroInfo, { color: colors.neutral.light }]}>• Lucky Number: 7</Text>
                <Text style={[styles.astroInfo, { color: colors.neutral.light }]}>• Affirmation: "I embrace new beginnings with confidence and joy."</Text>
              </View>
              <TouchableOpacity onPress={closeModal} style={styles.closeBtn}>
                <LinearGradient
                  colors={[colors.brand.primary, colors.brand.accent]}
                  style={styles.closeGradient}
                >
                  <MaterialCommunityIcons name="close" size={20} color="#fff" />
                  <Text style={styles.closeBtnText}>Close</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  monthTitle: {
    fontSize: fontSizes.h4.size,
    fontWeight: '700',
  },
  monthNavBtn: {
    padding: 6,
    borderRadius: 16,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  weekDay: {
    flex: 1,
    textAlign: 'center',
    fontSize: fontSizes.small.size,
    fontWeight: '600',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  emptyDayCell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    backgroundColor: 'transparent',
  },
  dayNumber: {
    fontSize: fontSizes.body.size,
    fontWeight: '700',
    color: '#fff',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 320,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: fontSizes.h4.size,
    fontWeight: '700',
    marginBottom: 8,
  },
  modalDate: {
    fontSize: fontSizes.body.size,
    marginBottom: 12,
  },
  astroInfo: {
    fontSize: fontSizes.body.size,
    marginBottom: 24,
    textAlign: 'center',
  },
  closeBtn: {
    alignSelf: 'center',
  },
  closeGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 16,
  },
  closeBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: fontSizes.body.size,
    marginLeft: 8,
  },
});

export default CalendarTab;
