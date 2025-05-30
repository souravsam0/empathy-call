import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const WalletScreen = () => {
  const [balance, setBalance] = useState(50.00);
  const [rechargeAmount, setRechargeAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleRecharge = () => {
    const amount = parseFloat(rechargeAmount);
    if (amount > 0 && selectedMethod) {
      setBalance(prev => prev + amount);
      setRechargeAmount('');
      setSelectedMethod('');
      // Here you would integrate with actual payment gateway
      console.log(`Recharging ₹${amount} via ${selectedMethod}`);
    }
  };

  const quickAmounts = [100, 200, 500, 1000];

  const paymentMethods = [
    { id: 'upi', name: 'UPI', icon: 'phone-portrait-outline' as const, desc: 'Pay using UPI apps' },
    { id: 'card', name: 'Card', icon: 'card-outline' as const, desc: 'Debit/Credit Card' },
    { id: 'netbanking', name: 'Net Banking', icon: 'business-outline' as const, desc: 'Internet Banking' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#47cfc8" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContainer}>
          <LinearGradient
            colors={['#47cfc8', '#76cfbc']}
            style={styles.header}
          >
            <View style={styles.headerContent}>
              <TouchableOpacity
                onPress={handleBack}
                style={styles.backButton}
              >
                <Ionicons name="arrow-back" size={20} color="white" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>My Wallet</Text>
            </View>
          </LinearGradient>
        </View>

        <ScrollView style={styles.content}>
        {/* Balance Card */}
          <View style={styles.balanceCard}>
            <LinearGradient
              colors={['#3b82f6', '#8b5cf6']}
              style={styles.balanceGradient}
            >
              <View style={styles.balanceContent}>
                <View style={styles.balanceHeader}>
                  <Ionicons name="wallet" size={24} color="rgba(255, 255, 255, 0.9)" />
                  <Text style={styles.balanceLabel}>Current Balance</Text>
                </View>
                <Text style={styles.balanceAmount}>₹{balance.toFixed(2)}</Text>
                <Text style={styles.balanceSubtext}>Available for calls</Text>
              </View>
            </LinearGradient>
          </View>

        {/* Quick Recharge */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Quick Recharge</Text>
            <View style={styles.quickAmounts}>
              {quickAmounts.map(amount => (
                <TouchableOpacity
                  key={amount}
                  onPress={() => setRechargeAmount(amount.toString())}
                  style={[
                    styles.amountButton,
                    rechargeAmount === amount.toString() && styles.amountButtonSelected
                  ]}
                >
                  <Text style={[
                    styles.amountButtonText,
                    rechargeAmount === amount.toString() && styles.amountButtonTextSelected
                  ]}>
                  ₹{amount}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.customAmount}>
              <TextInput
                value={rechargeAmount}
                onChangeText={setRechargeAmount}
                placeholder="Enter custom amount"
                keyboardType="numeric"
                style={styles.amountInput}
              />
            </View>
          </View>

        {/* Payment Methods */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Payment Method</Text>
            <View style={styles.paymentMethods}>
            {paymentMethods.map((method) => (
                <TouchableOpacity
                key={method.id}
                  onPress={() => setSelectedMethod(method.id)}
                  style={[
                    styles.paymentMethod,
                    selectedMethod === method.id && styles.paymentMethodSelected
                  ]}
                >
                  <View style={styles.paymentMethodContent}>
                    <View style={[
                      styles.paymentMethodIcon,
                      selectedMethod === method.id && styles.paymentMethodIconSelected
                    ]}>
                      <Ionicons
                        name={method.icon}
                        size={20} 
                        color={selectedMethod === method.id ? 'white' : '#4b5563'}
                      />
                    </View>
                    <View style={styles.paymentMethodInfo}>
                      <Text style={styles.paymentMethodName}>{method.name}</Text>
                      <Text style={styles.paymentMethodDesc}>{method.desc}</Text>
                    </View>
                  {selectedMethod === method.id && (
                      <Ionicons name="checkmark-circle" size={20} color="#47cfc8" />
                  )}
                  </View>
                </TouchableOpacity>
            ))}
            </View>
          </View>

        {/* Recharge Button */}
          <TouchableOpacity
            onPress={handleRecharge}
          disabled={!rechargeAmount || parseFloat(rechargeAmount) <= 0 || !selectedMethod}
            style={[
              styles.rechargeButton,
              (!rechargeAmount || parseFloat(rechargeAmount) <= 0 || !selectedMethod) && styles.rechargeButtonDisabled
            ]}
          >
            <View style={styles.rechargeButtonContent}>
          {rechargeAmount && selectedMethod ? (
                <>
                  <Ionicons name="add" size={18} color="white" />
                  <Text style={styles.rechargeButtonText}>Add ₹{rechargeAmount}</Text>
                </>
              ) : (
                <Text style={styles.rechargeButtonTextDisabled}>Select Amount & Method</Text>
              )}
            </View>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfcfc',
  },
  safeArea: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: '#47cfc8',
  },
  header: {
    padding: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    padding: 16,
    gap: 24,
  },
  balanceCard: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  balanceGradient: {
    padding: 24,
  },
  balanceContent: {
    alignItems: 'center',
  },
  balanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  balanceLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
  },
  balanceSubtext: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.75)',
    marginTop: 8,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  quickAmounts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  amountButton: {
    flex: 1,
    minWidth: '45%',
    height: 48,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  amountButtonSelected: {
    borderColor: '#47cfc8',
    backgroundColor: 'rgba(71, 207, 200, 0.1)',
  },
  amountButtonText: {
    fontSize: 16,
    color: '#4b5563',
  },
  amountButtonTextSelected: {
    color: '#47cfc8',
  },
  customAmount: {
    marginTop: 8,
  },
  amountInput: {
    height: 48,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  paymentMethods: {
    gap: 12,
  },
  paymentMethod: {
    padding: 16,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 12,
  },
  paymentMethodSelected: {
    borderColor: '#47cfc8',
    backgroundColor: 'rgba(71, 207, 200, 0.1)',
  },
  paymentMethodContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  paymentMethodIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentMethodIconSelected: {
    backgroundColor: '#47cfc8',
  },
  paymentMethodInfo: {
    flex: 1,
    marginLeft: 12,
  },
  paymentMethodName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
  },
  paymentMethodDesc: {
    fontSize: 14,
    color: '#6b7280',
  },
  rechargeButton: {
    height: 56,
    borderRadius: 12,
    backgroundColor: '#47cfc8',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  rechargeButtonDisabled: {
    backgroundColor: '#e5e7eb',
  },
  rechargeButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rechargeButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  rechargeButtonTextDisabled: {
    fontSize: 18,
    fontWeight: '600',
    color: '#9ca3af',
  },
});

export default WalletScreen;
