import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform, StatusBar } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type RootStackParamList = {
  Withdraw: undefined;
  PaymentDetails: undefined;
};

// Mock payment history data
const mockPaymentHistory = [
  {
    id: '1',
    type: 'withdrawal',
    amount: 3500,
    status: 'completed',
    date: '2024-03-15',
    method: {
      type: 'bank',
      details: 'HDFC Bank ••••7890'
    }
  },
  {
    id: '2',
    type: 'withdrawal',
    amount: 2000,
    status: 'pending',
    date: '2024-03-14',
    method: {
      type: 'upi',
      details: 'shailu@upi'
    }
  },
  {
    id: '3',
    type: 'withdrawal',
    amount: 5000,
    status: 'completed',
    date: '2024-03-10',
    method: {
      type: 'bank',
      details: 'HDFC Bank ••••7890'
    }
  }
];

const PaymentHistoryScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          bg: '#dcfce7',
          text: '#166534'
        };
      case 'pending':
        return {
          bg: '#fef3c7',
          text: '#92400e'
        };
      case 'failed':
        return {
          bg: '#fee2e2',
          text: '#991b1b'
        };
      default:
        return {
          bg: '#f3f4f6',
          text: '#4b5563'
        };
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#47cfc8" translucent />
      <LinearGradient
        colors={['#47cfc8', '#76cfbc']}
        style={[styles.header, { paddingTop: Platform.OS === 'ios' ? insets.top : StatusBar.currentHeight }]}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#4b5563" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Payment History</Text>
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {mockPaymentHistory.map((payment) => {
          const statusColor = getStatusColor(payment.status);
          return (
            <View key={payment.id} style={styles.paymentCard}>
              <View style={styles.paymentHeader}>
                <View style={styles.paymentInfo}>
                  <Text style={styles.paymentAmount}>₹{payment.amount}</Text>
                  <Text style={styles.paymentDate}>{formatDate(payment.date)}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: statusColor.bg }]}>
                  <Text style={[styles.statusText, { color: statusColor.text }]}>
                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                  </Text>
                </View>
              </View>
              
              <View style={styles.paymentDetails}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Payment Method</Text>
                  <View style={styles.methodContainer}>
                    <Ionicons 
                      name={payment.method.type === 'bank' ? 'card-outline' : 'phone-portrait-outline'} 
                      size={16} 
                      color="#6b7280" 
                    />
                    <Text style={styles.detailValue}>{payment.method.details}</Text>
                  </View>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Transaction ID</Text>
                  <Text style={styles.detailValue}>#{payment.id}</Text>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    padding: 16,
    paddingBottom: 24,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 16,
  },
  paymentCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  paymentInfo: {
    gap: 4,
  },
  paymentAmount: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
  },
  paymentDate: {
    fontSize: 14,
    color: '#6b7280',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  paymentDetails: {
    gap: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  methodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4b5563',
  },
});

export default PaymentHistoryScreen; 