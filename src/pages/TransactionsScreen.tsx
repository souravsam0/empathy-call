import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform, StatusBar } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type RootStackParamList = {
  MaleProfile: undefined;
};

// Mock transactions data
const mockTransactions = [
  {
    id: '1',
    type: 'recharge',
    amount: 1000,
    status: 'completed',
    date: '2024-03-15',
    time: '14:30',
    method: 'UPI',
    reference: 'TXN123456789'
  },
  {
    id: '2',
    type: 'recharge',
    amount: 500,
    status: 'completed',
    date: '2024-03-14',
    time: '19:45',
    method: 'Card',
    reference: 'TXN987654321'
  },
  {
    id: '3',
    type: 'recharge',
    amount: 2000,
    status: 'failed',
    date: '2024-03-14',
    time: '15:20',
    method: 'UPI',
    reference: 'TXN456789123'
  }
];

const TransactionsScreen = () => {
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

  const getMethodIcon = (method: string) => {
    switch (method.toLowerCase()) {
      case 'upi':
        return 'phone-portrait-outline';
      case 'card':
        return 'card-outline';
      default:
        return 'wallet-outline';
    }
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
          <Text style={styles.headerTitle}>Transactions</Text>
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {mockTransactions.map((transaction) => {
          const statusColor = getStatusColor(transaction.status);
          return (
            <View key={transaction.id} style={styles.transactionCard}>
              <View style={styles.transactionContent}>
                <View style={styles.transactionHeader}>
                  <View style={styles.transactionInfo}>
                    <Text style={styles.transactionAmount}>₹{transaction.amount}</Text>
                    <Text style={styles.transactionDateTime}>{transaction.date} at {transaction.time}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: statusColor.bg }]}>
                    <Text style={[styles.statusText, { color: statusColor.text }]}>
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.transactionDetails}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Payment Method</Text>
                    <View style={styles.methodContainer}>
                      <Ionicons 
                        name={getMethodIcon(transaction.method)} 
                        size={16} 
                        color="#6b7280" 
                      />
                      <Text style={styles.detailValue}>{transaction.method}</Text>
                    </View>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Reference ID</Text>
                    <Text style={styles.detailValue}>{transaction.reference}</Text>
                  </View>
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
  contentContainer: {
    padding: 16,
    gap: 16,
  },
  transactionCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  transactionContent: {
    gap: 16,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  transactionInfo: {
    gap: 4,
  },
  transactionAmount: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
  },
  transactionDateTime: {
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
  transactionDetails: {
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

export default TransactionsScreen; 