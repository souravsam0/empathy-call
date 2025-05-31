import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type RootStackParamList = {
  FemaleHome: undefined;
};

const WithdrawSuccessScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#47cfc8" translucent />
      <LinearGradient
        colors={['#47cfc8', '#76cfbc']}
        style={[styles.header, { paddingTop: Platform.OS === 'ios' ? insets.top : StatusBar.currentHeight }]}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Withdrawal Success</Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.successIconContainer}>
          <LinearGradient
            colors={['#dcfce7', '#bbf7d0']}
            style={styles.successIconGradient}
          >
            <Ionicons name="checkmark-circle" size={64} color="#166534" />
          </LinearGradient>
        </View>

        <Text style={styles.successTitle}>Withdrawal Request Successful!</Text>
        <Text style={styles.successMessage}>
          Your withdrawal request has been received and is being processed. The amount will be credited to your account within 2-3 working days.
        </Text>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>What's Next?</Text>
          <View style={styles.infoItem}>
            <Ionicons name="time-outline" size={24} color="#6b7280" />
            <Text style={styles.infoText}>Processing time: 2-3 working days</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="notifications-outline" size={24} color="#6b7280" />
            <Text style={styles.infoText}>You'll receive a notification once the amount is credited</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('FemaleHome')}
        >
          <Text style={styles.buttonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
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
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  content: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
  successIconContainer: {
    marginVertical: 32,
  },
  successIconGradient: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#47cfc8',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    marginTop: 32,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
});

export default WithdrawSuccessScreen; 