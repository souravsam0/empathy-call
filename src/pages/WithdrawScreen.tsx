import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, Platform, StatusBar } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type RootStackParamList = {
  FemaleHome: undefined;
  PaymentDetails: {
    type: 'bank' | 'upi';
  };
  WithdrawSuccess: undefined;
  PaymentHistory: undefined;
};

type PaymentMethod = 'bank' | 'upi' | null;

type BankDetails = {
  accountNumber: string;
  bankName: string;
  accountHolder: string;
} | null;

type UPIDetails = {
  id: string;
} | null;

// Mock saved payment methods - in real app, this would come from API/storage
const mockSavedMethods: {
  bank: BankDetails;
  upi: UPIDetails;
} = {
  bank: null, // Set to null to simulate no saved bank account
  upi: {
    id: 'user@upi'
  }
};

const WithdrawScreen = () => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null);
  const [useExistingMethod, setUseExistingMethod] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();

  // Mock data
  const totalEarnings = 15750;
  const withdrawnAmount = 12000;
  const eligibleAmount = totalEarnings - withdrawnAmount;
  const minimumWithdraw = 100;

  const handleAddNewMethod = () => {
    navigation.navigate('PaymentDetails', {
      type: selectedMethod as 'bank' | 'upi'
    });
  };

  const handleWithdraw = () => {
    if (eligibleAmount < minimumWithdraw) {
      Alert.alert(
        'Insufficient Balance',
        `Minimum withdrawal amount is ₹${minimumWithdraw}. Please earn more to withdraw.`
      );
      return;
    }

    if (!useExistingMethod) {
      handleAddNewMethod();
      return;
    }

    Alert.alert(
      'Confirm Withdrawal',
      `Are you sure you want to withdraw ₹${eligibleAmount} to your ${
        selectedMethod === 'bank' 
          ? `bank account (${mockSavedMethods.bank?.accountNumber})` 
          : `UPI ID (${mockSavedMethods.upi?.id})`
      }?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Withdraw',
          onPress: () => {
            navigation.navigate('WithdrawSuccess');
          },
        },
      ]
    );
  };

  const renderPaymentOptions = () => {
    if (selectedMethod === 'bank') {
      return (
        <View style={styles.paymentOptionsContainer}>
          <View style={styles.treeLineContainer}>
            <View style={styles.treeLine} />
            <View style={styles.paymentOptionsWrapper}>
              {mockSavedMethods.bank && (
                <TouchableOpacity
                  style={[
                    styles.paymentOptionCard,
                    useExistingMethod && styles.paymentOptionCardActive
                  ]}
                  onPress={() => setUseExistingMethod(true)}
                >
                  <View style={styles.paymentOptionContent}>
                    <View style={styles.paymentOptionInfo}>
                      <Text style={styles.paymentOptionTitle}>
                        {mockSavedMethods.bank.bankName}
                      </Text>
                      <Text style={styles.paymentOptionSubtitle}>
                        A/C: {mockSavedMethods.bank.accountNumber}
                      </Text>
                      <Text style={styles.paymentOptionSubtitle}>
                        {mockSavedMethods.bank.accountHolder}
                      </Text>
                    </View>
                    {useExistingMethod && (
                      <Ionicons name="checkmark-circle" size={24} color="#47cfc8" />
                    )}
                  </View>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={[
                  styles.paymentOptionCard,
                  (!mockSavedMethods.bank || !useExistingMethod) && styles.paymentOptionCardActive
                ]}
                onPress={() => setUseExistingMethod(false)}
              >
                <View style={styles.paymentOptionContent}>
                  <View style={styles.paymentOptionInfo}>
                    <Text style={styles.paymentOptionTitle}>
                      {mockSavedMethods.bank ? 'Add New Bank Account' : 'Add Bank Account'}
                    </Text>
                    <Text style={styles.paymentOptionSubtitle}>
                      Set up a bank account for withdrawals
                    </Text>
                  </View>
                  {(!mockSavedMethods.bank || !useExistingMethod) && (
                    <Ionicons name="checkmark-circle" size={24} color="#47cfc8" />
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    } else if (selectedMethod === 'upi') {
      return (
        <View style={styles.paymentOptionsContainer}>
          <View style={styles.treeLineContainer}>
            <View style={styles.treeLine} />
            <View style={styles.paymentOptionsWrapper}>
              {mockSavedMethods.upi && (
                <TouchableOpacity
                  style={[
                    styles.paymentOptionCard,
                    useExistingMethod && styles.paymentOptionCardActive
                  ]}
                  onPress={() => setUseExistingMethod(true)}
                >
                  <View style={styles.paymentOptionContent}>
                    <View style={styles.paymentOptionInfo}>
                      <Text style={styles.paymentOptionTitle}>
                        Existing UPI ID
                      </Text>
                      <Text style={styles.paymentOptionSubtitle}>
                        {mockSavedMethods.upi.id}
                      </Text>
                    </View>
                    {useExistingMethod && (
                      <Ionicons name="checkmark-circle" size={24} color="#47cfc8" />
                    )}
                  </View>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={[
                  styles.paymentOptionCard,
                  (!mockSavedMethods.upi || !useExistingMethod) && styles.paymentOptionCardActive
                ]}
                onPress={() => setUseExistingMethod(false)}
              >
                <View style={styles.paymentOptionContent}>
                  <View style={styles.paymentOptionInfo}>
                    <Text style={styles.paymentOptionTitle}>
                      {mockSavedMethods.upi ? 'Add New UPI ID' : 'Add UPI ID'}
                    </Text>
                    <Text style={styles.paymentOptionSubtitle}>
                      Set up a UPI ID for withdrawals
                    </Text>
                  </View>
                  {(!mockSavedMethods.upi || !useExistingMethod) && (
                    <Ionicons name="checkmark-circle" size={24} color="#47cfc8" />
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
    return null;
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
          <Text style={styles.headerTitle}>Withdraw Earnings</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Summary Cards */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total Withdrawn</Text>
            <Text style={styles.summaryAmount}>₹{withdrawnAmount}</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Available to Withdraw</Text>
            <Text style={[styles.summaryAmount, { color: '#47cfc8' }]}>₹{eligibleAmount}</Text>
          </View>
        </View>

        {/* Payment History Link */}
        <TouchableOpacity
          style={styles.historyLink}
          onPress={() => navigation.navigate('PaymentHistory')}
        >
          <View style={styles.historyLinkContent}>
            <Ionicons name="time-outline" size={20} color="#6b7280" />
            <Text style={styles.historyLinkText}>View Payment History</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#6b7280" />
        </TouchableOpacity>

        {/* Minimum Withdrawal Notice */}
        <View style={styles.noticeCard}>
          <Ionicons name="information-circle" size={20} color="#6b7280" />
          <Text style={styles.noticeText}>
            Minimum withdrawal amount is ₹{minimumWithdraw}
          </Text>
        </View>

        {/* Payment Method Selection */}
        <Text style={styles.sectionTitle}>Select Payment Method</Text>
        <View style={styles.methodContainer}>
          <TouchableOpacity
            style={[
              styles.methodCard,
              selectedMethod === 'bank' && styles.methodCardActive
            ]}
            onPress={() => {
              setSelectedMethod('bank');
              setUseExistingMethod(false);
            }}
          >
            <View style={styles.methodContent}>
              <Ionicons
                name="card"
                size={24}
                color={selectedMethod === 'bank' ? '#47cfc8' : '#6b7280'}
              />
              <View style={styles.methodInfo}>
                <Text style={[
                  styles.methodTitle,
                  selectedMethod === 'bank' && styles.methodTitleActive
                ]}>Bank Account</Text>
                <Text style={styles.methodSubtitle}>2-3 business days</Text>
              </View>
            </View>
            {selectedMethod === 'bank' && (
              <View style={styles.methodSelected}>
                <Ionicons name="checkmark-circle" size={24} color="#47cfc8" />
              </View>
            )}
          </TouchableOpacity>

          {selectedMethod === 'bank' && renderPaymentOptions()}

          <TouchableOpacity
            style={[
              styles.methodCard,
              selectedMethod === 'upi' && styles.methodCardActive
            ]}
            onPress={() => {
              setSelectedMethod('upi');
              setUseExistingMethod(false);
            }}
          >
            <View style={styles.methodContent}>
              <Ionicons
                name="phone-portrait"
                size={24}
                color={selectedMethod === 'upi' ? '#47cfc8' : '#6b7280'}
              />
              <View style={styles.methodInfo}>
                <Text style={[
                  styles.methodTitle,
                  selectedMethod === 'upi' && styles.methodTitleActive
                ]}>UPI</Text>
                <Text style={styles.methodSubtitle}>Instant transfer</Text>
              </View>
            </View>
            {selectedMethod === 'upi' && (
              <View style={styles.methodSelected}>
                <Ionicons name="checkmark-circle" size={24} color="#47cfc8" />
              </View>
            )}
          </TouchableOpacity>

          {selectedMethod === 'upi' && renderPaymentOptions()}
        </View>

        {/* Withdraw Button */}
        <TouchableOpacity
          style={[
            styles.withdrawButton,
            eligibleAmount < minimumWithdraw && styles.withdrawButtonDisabled
          ]}
          onPress={handleWithdraw}
          disabled={eligibleAmount < minimumWithdraw}
        >
          <Text style={styles.withdrawButtonText}>
            {!useExistingMethod ? 'Add Payment Method' : `Withdraw ₹${eligibleAmount}`}
          </Text>
        </TouchableOpacity>
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
    padding: 16,
  },
  summaryContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  summaryAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  noticeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 12,
    marginBottom: 24,
  },
  noticeText: {
    fontSize: 14,
    color: '#6b7280',
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  methodContainer: {
    gap: 16,
    marginBottom: 24,
  },
  methodCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  methodCardActive: {
    borderWidth: 2,
    borderColor: '#47cfc8',
  },
  methodContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  methodInfo: {
    gap: 4,
  },
  methodTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
  },
  methodTitleActive: {
    color: '#47cfc8',
  },
  methodSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  methodSelected: {
    width: 24,
    height: 24,
  },
  paymentOptionsContainer: {
    paddingLeft: 40,
  },
  treeLineContainer: {
    flexDirection: 'row',
  },
  treeLine: {
    width: 2,
    backgroundColor: '#e5e7eb',
    marginRight: 16,
  },
  paymentOptionsWrapper: {
    flex: 1,
    gap: 16,
  },
  paymentOptionCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  paymentOptionCardActive: {
    borderWidth: 2,
    borderColor: '#47cfc8',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  paymentOptionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentOptionInfo: {
    flex: 1,
    gap: 4,
  },
  paymentOptionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
  },
  paymentOptionSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  withdrawButton: {
    backgroundColor: '#47cfc8',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  withdrawButtonDisabled: {
    backgroundColor: '#e5e7eb',
  },
  withdrawButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  historyLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  historyLinkContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  historyLinkText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4b5563',
  },
});

export default WithdrawScreen; 