import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CreditCard, Download, CircleCheck as CheckCircle, Clock, Circle as XCircle, Calendar, DollarSign, Receipt, X, Star, Sparkles } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface PaymentHistoryScreenProps {
  onClose: () => void;
}

export default function PaymentHistoryScreen({ onClose }: PaymentHistoryScreenProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

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
    ]).start();
  }, []);

  const payments = [
    {
      id: '1',
      type: 'Premium Subscription',
      amount: '₹599',
      date: '2024-01-15',
      status: 'completed',
      method: 'UPI',
      transactionId: 'TXN123456789',
      description: 'Monthly Premium Plan',
    },
    {
      id: '2',
      type: 'Business Report',
      amount: '₹299',
      date: '2024-01-10',
      status: 'completed',
      method: 'Credit Card',
      transactionId: 'TXN123456788',
      description: 'Market Analysis Report',
    },
    {
      id: '3',
      type: 'Consultation',
      amount: '₹999',
      date: '2024-01-05',
      status: 'pending',
      method: 'Net Banking',
      transactionId: 'TXN123456787',
      description: 'Personal Astrology Session',
    },
    {
      id: '4',
      type: 'Premium Subscription',
      amount: '₹599',
      date: '2023-12-15',
      status: 'completed',
      method: 'UPI',
      transactionId: 'TXN123456786',
      description: 'Monthly Premium Plan',
    },
    {
      id: '5',
      type: 'Custom Report',
      amount: '₹199',
      date: '2023-12-10',
      status: 'failed',
      method: 'Credit Card',
      transactionId: 'TXN123456785',
      description: 'Health Prediction Report',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={20} color="#10b981" />;
      case 'pending':
        return <Clock size={20} color="#f59e0b" />;
      case 'failed':
        return <XCircle size={20} color="#ef4444" />;
      default:
        return <Clock size={20} color="#6b7280" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#10b981';
      case 'pending':
        return '#f59e0b';
      case 'failed':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const totalSpent = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + parseInt(p.amount.replace('₹', '')), 0);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0f0c29', '#24243e', '#302b63']}
        style={styles.gradient}
      >
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
          <Text style={styles.title}>Payment History</Text>
          <TouchableOpacity style={styles.downloadButton}>
            <Download size={24} color="#ffd700" />
          </TouchableOpacity>
        </Animated.View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Summary Cards */}
          <Animated.View
            style={[
              styles.summaryContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <View style={styles.summaryGrid}>
              <LinearGradient
                colors={['#7c3aed', '#a855f7']}
                style={styles.summaryCard}
              >
                <DollarSign size={24} color="#ffffff" />
                <Text style={styles.summaryAmount}>₹{totalSpent}</Text>
                <Text style={styles.summaryLabel}>Total Spent</Text>
              </LinearGradient>

              <LinearGradient
                colors={['#10b981', '#059669']}
                style={styles.summaryCard}
              >
                <Receipt size={24} color="#ffffff" />
                <Text style={styles.summaryAmount}>{payments.length}</Text>
                <Text style={styles.summaryLabel}>Transactions</Text>
              </LinearGradient>
            </View>
          </Animated.View>

          {/* Payment List */}
          <View style={styles.paymentsContainer}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            {payments.map((payment, index) => (
              <Animated.View
                key={payment.id}
                style={[
                  styles.paymentCard,
                  {
                    opacity: fadeAnim,
                    transform: [{ 
                      translateY: Animated.multiply(slideAnim, index * 0.5 + 1),
                    }],
                  },
                ]}
              >
                <LinearGradient
                  colors={['#1e1b4b', '#312e81']}
                  style={styles.paymentGradient}
                >
                  <View style={styles.paymentHeader}>
                    <View style={styles.paymentInfo}>
                      <Text style={styles.paymentType}>{payment.type}</Text>
                      <Text style={styles.paymentDescription}>{payment.description}</Text>
                    </View>
                    <View style={styles.paymentAmount}>
                      <Text style={styles.amount}>{payment.amount}</Text>
                      {getStatusIcon(payment.status)}
                    </View>
                  </View>

                  <View style={styles.paymentDetails}>
                    <View style={styles.detailItem}>
                      <Calendar size={16} color="#8b5cf6" />
                      <Text style={styles.detailText}>{payment.date}</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <CreditCard size={16} color="#8b5cf6" />
                      <Text style={styles.detailText}>{payment.method}</Text>
                    </View>
                  </View>

                  <View style={styles.paymentFooter}>
                    <Text style={styles.transactionId}>ID: {payment.transactionId}</Text>
                    <Text style={[
                      styles.status,
                      { color: getStatusColor(payment.status) }
                    ]}>
                      {payment.status.toUpperCase()}
                    </Text>
                  </View>

                  <TouchableOpacity style={styles.downloadReceipt}>
                    <LinearGradient
                      colors={['#374151', '#4b5563']}
                      style={styles.receiptGradient}
                    >
                      <Download size={16} color="#ffffff" />
                      <Text style={styles.receiptText}>Download Receipt</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </LinearGradient>
              </Animated.View>
            ))}
          </View>

          {/* Payment Methods */}
          <Animated.View
            style={[
              styles.methodsContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.sectionTitle}>Saved Payment Methods</Text>
            <LinearGradient
              colors={['#1e1b4b', '#312e81']}
              style={styles.methodsGradient}
            >
              <View style={styles.methodItem}>
                <CreditCard size={24} color="#ffd700" />
                <View style={styles.methodInfo}>
                  <Text style={styles.methodName}>Visa •••• 4532</Text>
                  <Text style={styles.methodExpiry}>Expires 12/26</Text>
                </View>
                <Star size={20} color="#ffd700" />
              </View>
              
              <View style={styles.methodDivider} />
              
              <View style={styles.methodItem}>
                <View style={styles.upiIcon}>
                  <Text style={styles.upiText}>UPI</Text>
                </View>
                <View style={styles.methodInfo}>
                  <Text style={styles.methodName}>rajesh@paytm</Text>
                  <Text style={styles.methodExpiry}>Primary UPI ID</Text>
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
  downloadButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  summaryContainer: {
    marginBottom: 30,
  },
  summaryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryCard: {
    width: (width - 50) / 2,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  summaryAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 10,
  },
  summaryLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 5,
  },
  paymentsContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  paymentCard: {
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
  },
  paymentGradient: {
    padding: 20,
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  paymentDescription: {
    fontSize: 12,
    color: '#c4b5fd',
    marginTop: 2,
  },
  paymentAmount: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffd700',
    marginBottom: 5,
  },
  paymentDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 12,
    color: '#c4b5fd',
    marginLeft: 5,
  },
  paymentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  transactionId: {
    fontSize: 10,
    color: '#9ca3af',
  },
  status: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  downloadReceipt: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  receiptGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  receiptText: {
    fontSize: 12,
    color: '#ffffff',
    marginLeft: 5,
  },
  methodsContainer: {
    marginBottom: 30,
  },
  methodsGradient: {
    padding: 20,
    borderRadius: 15,
  },
  methodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  methodInfo: {
    flex: 1,
    marginLeft: 15,
  },
  methodName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  methodExpiry: {
    fontSize: 12,
    color: '#c4b5fd',
    marginTop: 2,
  },
  methodDivider: {
    height: 1,
    backgroundColor: '#374151',
    marginVertical: 10,
  },
  upiIcon: {
    width: 40,
    height: 24,
    backgroundColor: '#10b981',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  upiText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});