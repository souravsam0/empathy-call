import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform, StatusBar, Alert, Modal } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type RootStackParamList = {
  Withdraw: undefined;
  PaymentDetails: undefined;
  AddPaymentMethod: undefined;
};

type PaymentMethod = {
  id: string;
  type: 'bank' | 'upi';
  details: {
    accountNumber?: string;
    bankName?: string;
    accountHolder?: string;
    ifscCode?: string;
    upiId?: string;
  };
  isDefault: boolean;
  lastUsed?: string;
};

const PaymentDetailsScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();

  // Mock saved payment methods - in real app, this would come from API/storage
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'bank',
      details: {
        accountNumber: '••••••7890',
        bankName: 'HDFC Bank',
        accountHolder: 'Shailu',
        ifscCode: 'HDFC0001234'
      },
      isDefault: true,
      lastUsed: '2024-03-15'
    },
    {
      id: '2',
      type: 'upi',
      details: {
        upiId: 'shailu@upi'
      },
      isDefault: false,
      lastUsed: '2024-03-10'
    }
  ]);

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleEdit = (method: PaymentMethod) => {
    // Navigate to edit form with method details
    Alert.alert('Edit', 'Opening edit form...');
  };

  const handleDelete = (method: PaymentMethod) => {
    setSelectedMethod(method);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (selectedMethod) {
      setPaymentMethods(prev => prev.filter(m => m.id !== selectedMethod.id));
      setShowDeleteConfirm(false);
      setSelectedMethod(null);
    }
  };

  const handleSetDefault = (method: PaymentMethod) => {
    setPaymentMethods(prev => 
      prev.map(m => ({
        ...m,
        isDefault: m.id === method.id
      }))
    );
  };

  const renderPaymentMethodCard = (method: PaymentMethod) => {
    const isBank = method.type === 'bank';
    const gradientColors = isBank 
      ? ['#3b82f6', '#60a5fa'] as const
      : ['#8b5cf6', '#a78bfa'] as const;

    return (
      <View style={styles.methodCard} key={method.id}>
        <LinearGradient
          colors={gradientColors}
          style={styles.methodCardGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.methodCardHeader}>
            <View style={styles.methodTypeContainer}>
              <View style={styles.methodIconContainer}>
                <Ionicons 
                  name={isBank ? 'card' : 'phone-portrait'} 
                  size={24} 
                  color="white" 
                />
              </View>
              <Text style={styles.methodType}>
                {isBank ? 'Bank Account' : 'UPI ID'}
              </Text>
            </View>
            {method.isDefault && (
              <View style={styles.defaultBadge}>
                <Text style={styles.defaultBadgeText}>Default</Text>
              </View>
            )}
          </View>

          <View style={styles.methodDetails}>
            {isBank ? (
              <>
                <Text style={styles.methodMainText}>{method.details.bankName}</Text>
                <Text style={styles.methodSubText}>
                  A/C: {method.details.accountNumber}
                </Text>
                <Text style={styles.methodSubText}>
                  {method.details.accountHolder}
                </Text>
                <Text style={styles.methodSubText}>
                  IFSC: {method.details.ifscCode}
                </Text>
              </>
            ) : (
              <Text style={styles.methodMainText}>
                {method.details.upiId}
              </Text>
            )}
          </View>

          <View style={styles.methodFooter}>
            <Text style={styles.lastUsedText}>
              Last used: {method.lastUsed}
            </Text>
            <View style={styles.actionButtons}>
              {!method.isDefault && (
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => handleSetDefault(method)}
                >
                  <Ionicons name="star-outline" size={20} color="white" />
                </TouchableOpacity>
              )}
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => handleEdit(method)}
              >
                <Ionicons name="create-outline" size={20} color="white" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => handleDelete(method)}
              >
                <Ionicons name="trash-outline" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
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
          <Text style={styles.headerTitle}>Payment Methods</Text>
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {paymentMethods.length > 0 ? (
          <View style={styles.methodsContainer}>
            {paymentMethods.map(renderPaymentMethodCard)}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="wallet-outline" size={64} color="#9ca3af" />
            <Text style={styles.emptyStateTitle}>No Payment Methods</Text>
            <Text style={styles.emptyStateText}>
              Add your first payment method to start receiving payments
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddPaymentMethod')}
        >
          <Ionicons name="add-circle-outline" size={24} color="white" />
          <Text style={styles.addButtonText}>Add New Payment Method</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Delete Confirmation Modal */}
      <Modal
        visible={showDeleteConfirm}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDeleteConfirm(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Ionicons name="warning-outline" size={32} color="#ef4444" />
              <Text style={styles.modalTitle}>Delete Payment Method?</Text>
            </View>
            <Text style={styles.modalText}>
              Are you sure you want to delete this payment method? This action cannot be undone.
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalCancelButton]}
                onPress={() => setShowDeleteConfirm(false)}
              >
                <Text style={styles.modalCancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalDeleteButton]}
                onPress={confirmDelete}
              >
                <Text style={styles.modalDeleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  methodsContainer: {
    gap: 16,
  },
  methodCard: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  methodCardGradient: {
    padding: 12,
  },
  methodCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  methodTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  methodIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  methodType: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  defaultBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  defaultBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  methodDetails: {
    marginBottom: 12,
  },
  methodMainText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    marginBottom: 6,
  },
  methodSubText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 4,
  },
  methodFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
    paddingTop: 16,
  },
  lastUsedText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    gap: 16,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4b5563',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#47cfc8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 16,
    gap: 8,
    marginTop: 8,
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  modalHeader: {
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
  },
  modalText: {
    fontSize: 16,
    color: '#4b5563',
    textAlign: 'center',
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalCancelButton: {
    backgroundColor: '#f3f4f6',
  },
  modalCancelButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4b5563',
  },
  modalDeleteButton: {
    backgroundColor: '#ef4444',
  },
  modalDeleteButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
});

export default PaymentDetailsScreen; 