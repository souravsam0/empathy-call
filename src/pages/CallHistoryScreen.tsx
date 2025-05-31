import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform, StatusBar } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type RootStackParamList = {
  FemaleProfile: undefined;
  MaleProfile: undefined;
};

// Mock call history data
const mockCallHistory = [
  {
    id: '1',
    type: 'outgoing',
    name: 'Anonymous User',
    date: '2024-03-15',
    time: '14:30',
    duration: '15 min',
    amount: 375,
    status: 'completed'
  },
  {
    id: '2',
    type: 'incoming',
    name: 'Anonymous User',
    date: '2024-03-14',
    time: '19:45',
    duration: '28 min',
    amount: 700,
    status: 'completed'
  },
  {
    id: '3',
    type: 'missed',
    name: 'Anonymous User',
    date: '2024-03-14',
    time: '15:20',
    duration: '0 min',
    amount: 0,
    status: 'missed'
  }
];

const CallHistoryScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();

  const getCallIcon = (type: string) => {
    switch (type) {
      case 'outgoing':
        return 'call-outline';
      case 'incoming':
        return 'call';
      case 'missed':
        return 'call-sharp';
      default:
        return 'call-outline';
    }
  };

  const getCallColor = (type: string) => {
    switch (type) {
      case 'outgoing':
        return '#47cfc8';
      case 'incoming':
        return '#22c55e';
      case 'missed':
        return '#ef4444';
      default:
        return '#6b7280';
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
          <Text style={styles.headerTitle}>Call History</Text>
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {mockCallHistory.map((call) => (
          <View key={call.id} style={styles.callCard}>
            <View style={styles.callContent}>
              <View style={[styles.callIconContainer, { backgroundColor: `${getCallColor(call.type)}20` }]}>
                <Ionicons 
                  name={getCallIcon(call.type)} 
                  size={24} 
                  color={getCallColor(call.type)}
                  style={[
                    styles.callIcon,
                    call.type === 'missed' && { transform: [{ rotate: '135deg' }] }
                  ]}
                />
              </View>
              
              <View style={styles.callInfo}>
                <Text style={styles.callName}>{call.name}</Text>
                <Text style={styles.callDateTime}>{call.date} at {call.time}</Text>
                <Text style={styles.callDuration}>Duration: {call.duration}</Text>
              </View>

              {call.type !== 'missed' && (
                <View style={styles.callAmount}>
                  <Text style={[
                    styles.amountText,
                    { color: call.type === 'incoming' ? '#22c55e' : '#47cfc8' }
                  ]}>
                    {call.type === 'incoming' ? '+' : '-'}₹{call.amount}
                  </Text>
                </View>
              )}
            </View>
          </View>
        ))}
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
  callCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  callContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  callIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  callIcon: {},
  callInfo: {
    flex: 1,
    gap: 4,
  },
  callName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  callDateTime: {
    fontSize: 14,
    color: '#6b7280',
  },
  callDuration: {
    fontSize: 14,
    color: '#6b7280',
  },
  callAmount: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CallHistoryScreen; 