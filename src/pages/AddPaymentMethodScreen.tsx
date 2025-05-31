import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Platform, StatusBar, Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type RootStackParamList = {
  PaymentDetails: undefined;
};

type PaymentType = 'bank' | 'upi';

const AddPaymentMethodScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();
  const [selectedType, setSelectedType] = useState<PaymentType>('bank');

  // Bank Account States
  const [accountHolder, setAccountHolder] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [confirmAccountNumber, setConfirmAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [bankName, setBankName] = useState('');

  // UPI States
  const [upiId, setUpiId] = useState('');

  const validateBankDetails = () => {
    if (!accountHolder.trim()) {
      Alert.alert('Error', 'Please enter account holder name');
      return false;
    }
    if (!accountNumber || accountNumber.length < 9) {
      Alert.alert('Error', 'Please enter a valid account number');
      return false;
    }
    if (accountNumber !== confirmAccountNumber) {
      Alert.alert('Error', 'Account numbers do not match');
      return false;
    }
    if (!ifscCode || ifscCode.length !== 11) {
      Alert.alert('Error', 'Please enter a valid IFSC code');
      return false;
    }
    if (!bankName.trim()) {
      Alert.alert('Error', 'Please enter bank name');
      return false;
    }
    return true;
  };

  const validateUpiId = () => {
    const upiRegex = /^[\w.-]+@[\w.-]+$/;
    if (!upiId.trim() || !upiRegex.test(upiId)) {
      Alert.alert('Error', 'Please enter a valid UPI ID');
      return false;
    }
    return true;
  };

  const handleSave = () => {
    const isValid = selectedType === 'bank' ? validateBankDetails() : validateUpiId();
    
    if (isValid) {
      // Here you would typically save to API/storage
      Alert.alert(
        'Success',
        'Payment method added successfully',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack()
          }
        ]
      );
    }
  };

  const renderBankForm = () => (
    <View style={styles.formContainer}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Account Holder Name</Text>
        <TextInput
          style={styles.input}
          value={accountHolder}
          onChangeText={setAccountHolder}
          placeholder="Enter account holder name"
          placeholderTextColor="#9ca3af"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Account Number</Text>
        <TextInput
          style={styles.input}
          value={accountNumber}
          onChangeText={setAccountNumber}
          placeholder="Enter account number"
          placeholderTextColor="#9ca3af"
          keyboardType="numeric"
          secureTextEntry
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Confirm Account Number</Text>
        <TextInput
          style={styles.input}
          value={confirmAccountNumber}
          onChangeText={setConfirmAccountNumber}
          placeholder="Confirm account number"
          placeholderTextColor="#9ca3af"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>IFSC Code</Text>
        <TextInput
          style={styles.input}
          value={ifscCode}
          onChangeText={text => setIfscCode(text.toUpperCase())}
          placeholder="Enter IFSC code"
          placeholderTextColor="#9ca3af"
          autoCapitalize="characters"
          maxLength={11}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Bank Name</Text>
        <TextInput
          style={styles.input}
          value={bankName}
          onChangeText={setBankName}
          placeholder="Enter bank name"
          placeholderTextColor="#9ca3af"
        />
      </View>
    </View>
  );

  const renderUpiForm = () => (
    <View style={styles.formContainer}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>UPI ID</Text>
        <TextInput
          style={styles.input}
          value={upiId}
          onChangeText={setUpiId}
          placeholder="Enter UPI ID (e.g., name@upi)"
          placeholderTextColor="#9ca3af"
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="information-circle-outline" size={24} color="#6b7280" />
        <Text style={styles.infoText}>
          Please ensure you enter a valid UPI ID. This will be used for all future withdrawals unless changed.
        </Text>
      </View>
    </View>
  );

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
          <Text style={styles.headerTitle}>Add Payment Method</Text>
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Payment Type Selector */}
        <View style={styles.segmentContainer}>
          <TouchableOpacity
            style={[
              styles.segmentButton,
              selectedType === 'bank' && styles.segmentButtonActive
            ]}
            onPress={() => setSelectedType('bank')}
          >
            <Ionicons 
              name="card-outline" 
              size={24} 
              color={selectedType === 'bank' ? '#47cfc8' : '#6b7280'} 
            />
            <Text style={[
              styles.segmentButtonText,
              selectedType === 'bank' && styles.segmentButtonTextActive
            ]}>Bank Account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.segmentButton,
              selectedType === 'upi' && styles.segmentButtonActive
            ]}
            onPress={() => setSelectedType('upi')}
          >
            <Ionicons 
              name="phone-portrait-outline" 
              size={24} 
              color={selectedType === 'upi' ? '#47cfc8' : '#6b7280'} 
            />
            <Text style={[
              styles.segmentButtonText,
              selectedType === 'upi' && styles.segmentButtonTextActive
            ]}>UPI</Text>
          </TouchableOpacity>
        </View>

        {selectedType === 'bank' ? renderBankForm() : renderUpiForm()}

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save Payment Method</Text>
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
  },
  scrollContent: {
    padding: 16,
    gap: 16,
  },
  segmentContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 4,
    gap: 4,
  },
  segmentButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 12,
  },
  segmentButtonActive: {
    backgroundColor: '#f0fdfa',
  },
  segmentButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6b7280',
  },
  segmentButtonTextActive: {
    color: '#47cfc8',
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4b5563',
  },
  input: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: '#1f2937',
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 12,
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  saveButton: {
    backgroundColor: '#47cfc8',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
});

export default AddPaymentMethodScreen; 