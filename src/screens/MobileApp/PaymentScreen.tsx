import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, Trash2 } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { CARD_GLASS_PRESET, createGlassMorphismStyle } from '@/src/components/foundations/effects/GlassMorphism';
import AnimatedCard from '../../components/MobileApp/AnimatedCard';
import CosmicBackground from '../../components/MobileApp/CosmicBackground';
import Statusbar from '../../components/MobileApp/Statusbar';
import ButtonPrimary from '../../components/buttons/ButtonPrimary';
import { PrimaryHeader } from '../../components/composite/navigation/header/PrimaryHeader';
import { Badge } from '../../components/feedback';
import { useTheme } from '../../components/foundations/themes/useTheme';
import { BodyText, Heading } from '../../components/typography';



const savedCards = [
  { id: 'card1', brand: 'Visa', last4: '1234', expiry: '12/26' },
  { id: 'card2', brand: 'Mastercard', last4: '5678', expiry: '03/25' },
];

const recentTransactions = [
  { id: 'txn1', date: '2025-07-26', amount: '₹99', status: 'success' },
  { id: 'txn2', date: '2025-07-25', amount: '₹199', status: 'failed' },
  { id: 'txn3', date: '2025-07-24', amount: '₹299', status: 'pending' },
];

const previousTransactions = [
  { id: 'txn4', date: '2025-06-22', amount: '₹99', status: 'success' },
  { id: 'txn5', date: '2025-05-18', amount: '₹99', status: 'success' },
];

const PaymentScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { colors } = useTheme();
  const glassCardStyle = createGlassMorphismStyle(CARD_GLASS_PRESET);
  const [cards, setCards] = useState(savedCards);

  const removeCard = (cardId: string) => {
    setCards(cards.filter(card => card.id !== cardId));
  };
  
  return (
    <View style={[styles.container, { backgroundColor: colors.cosmos.deep }]}>
      <Statusbar />
      <CosmicBackground />

      <PrimaryHeader
        title={<Text style={{ fontSize: 20, fontWeight: '600', color: colors.brand.primary }}>Payments</Text>}
        leftButton={{
          id: 'back',
          icon: (
            <View style={styles.backButton}>
              <ArrowLeft size={22} color={colors.neutral.medium} />
            </View>
          ),
          onPress: () => navigation.goBack(),
          accessibilityLabel: 'Back',
        }}
        backgroundColor="transparent"
        shadow={false}
        blur={false}
        animated
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Saved Cards */}
        <Heading level="h3" style={styles.sectionHeading}>Saved Cards</Heading>
        <View style={styles.section}>
          {cards.map((card) => (
            <AnimatedCard key={card.id} style={[glassCardStyle,styles.card]}>
              <View style={styles.rowBetween}>
                <View style={styles.cardInfo}>
                  <BodyText style={styles.cardText}>
                    {card.brand} •••• {card.last4}
                  </BodyText>
                  <BodyText style={styles.cardSubText}>Exp {card.expiry}</BodyText>
                </View>
                <TouchableOpacity
                  onPress={() => removeCard(card.id)}
                  style={styles.removeButton}
                  accessibilityRole="button"
                  accessibilityLabel={`Remove ${card.brand} card`}
                >
                  <Trash2 size={16} color="#EF4444" />
                </TouchableOpacity>
              </View>
            </AnimatedCard>
          ))}
          <ButtonPrimary
            onPress={() => {}}
            config={{ size: 'small' }}
            style={styles.addButton}
          >
            Add New Card
          </ButtonPrimary>
        </View>

        {/* Recent Transactions */}
        <View style={styles.sectionHeaderRow}>
          <Heading level="h3" style={styles.sectionHeading}>Recent Transactions</Heading>
          <TouchableOpacity onPress={() => {}} accessibilityRole="button">
            <BodyText style={styles.viewAllText}>View All &gt;</BodyText>
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          {recentTransactions.map((txn) => (
            <AnimatedCard key={txn.id} style={[glassCardStyle,styles.card]}>
              <View style={styles.rowBetween}>
                                 <View>
                   <BodyText style={styles.cardText}>{txn.date}</BodyText>
                   <Badge
                     variant="text"
                     color={txn.status === 'success' ? 'success' : 
                            txn.status === 'failed' ? 'error' : 'warning'}
                     size="small"
                     animation="pulse"
                     showGlow={false}
                     style={styles.statusBadge}
                   >
                     {txn.status === 'success' ? 'Success' : 
                      txn.status === 'failed' ? 'Failed' : 'Pending'}
                   </Badge>
                 </View>
                <BodyText style={styles.amountText}>{txn.amount}</BodyText>
              </View>
            </AnimatedCard>
          ))}
        </View>

        {/* Transaction History */}
        <View style={styles.sectionHeaderRow}>
          <Heading level="h3" style={styles.sectionHeading}>Transaction History</Heading>
          <TouchableOpacity onPress={() => {}} accessibilityRole="button">
            <BodyText style={styles.viewAllText}>View All &gt;</BodyText>
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
                     {previousTransactions.map((txn) => (
             <AnimatedCard key={txn.id} style={[glassCardStyle,styles.card]}>
               <View style={styles.rowBetween}>
                 <View>
                   <BodyText style={styles.cardText}>{txn.date}</BodyText>
                   <Badge
                     variant="text"
                     color="success"
                     size="small"
                     animation="pulse"
                     showGlow={false}
                     style={styles.statusBadge}
                   >
                     Completed
                   </Badge>
                 </View>
                 <BodyText style={styles.amountText}>{txn.amount}</BodyText>
               </View>
             </AnimatedCard>
           ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(148, 163, 184, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 100,
  },
  sectionHeading: {
    marginBottom: 12,
    fontWeight: '700',
    fontSize: 18,
  },
  section: {
    marginBottom: 28,
  },
  card: {
    padding: 16,
      borderRadius: 21,
    marginBottom: 12,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  cardSubText: {
    fontSize: 14,
    color: '#9CA3AF', // Tailwind's gray-400
  },
  successText: {
    color: '#10B981', // green-500
  },
  failedText: {
    color: '#EF4444', // red-500
  },
  amountText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
  addButton: {
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  viewAllText: {
    color: '#E1B725',
    fontWeight: '600',
    fontSize: 14,
  },
  cardInfo: {
    flex: 1,
  },
  removeButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },

  pendingText: {
    color: '#F59E0B', // amber-500
  },
  statusBadge: {
    marginLeft: 0,
    left: 20,
    marginTop: 40,
  },
});

export default PaymentScreen;
