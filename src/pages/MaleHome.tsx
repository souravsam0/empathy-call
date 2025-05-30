import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, Alert, SafeAreaView, Platform, StatusBar } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import WalletButton from "../components/WalletButton";
import ProfileSheet from "../components/ProfileSheet";

// Define types
type RootStackParamList = {
  Call: { listenerId: number; listenerName: string };
  WalletScreen: undefined;
};

type Listener = {
  id: number;
  name: string;
  avatar: string;
  location: string;
  rate: number;
  languages: string[];
  status: 'online' | 'busy' | 'offline';
  rating: number;
  totalCalls: number;
};

type CallHistory = {
  id: number;
  listenerName: string;
  avatar: string;
  date: string;
  time: string;
  duration: string;
  cost: number;
};

const MaleHome = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Mock data for female listeners
  const listeners: Listener[] = [
    {
      id: 1,
      name: 'Priya',
      avatar: '👩‍💼',
      location: 'Mumbai, India',
      rate: 25,
      languages: ['Hindi', 'English'],
      status: 'online',
      rating: 4.8,
      totalCalls: 150
    },
    {
      id: 2,
      name: 'Sneha',
      avatar: '👩‍🎓',
      location: 'Delhi, India',
      rate: 30,
      languages: ['Hindi', 'English', 'Punjabi'],
      status: 'busy',
      rating: 4.9,
      totalCalls: 200
    },
    {
      id: 3,
      name: 'Anita',
      avatar: '👩‍⚕️',
      location: 'Bangalore, India',
      rate: 35,
      languages: ['English', 'Tamil'],
      status: 'online',
      rating: 4.7,
      totalCalls: 120
    }
  ];

  // Mock call history
  const callHistory: CallHistory[] = [
    {
      id: 1,
      listenerName: 'Priya',
      avatar: '👩‍💼',
      date: '2025-05-27',
      time: '14:30',
      duration: '15 min',
      cost: 375
    },
    {
      id: 2,
      listenerName: 'Sneha',
      avatar: '👩‍🎓',
      date: '2025-05-26',
      time: '19:45',
      duration: '28 min',
      cost: 840
    }
  ];

  const getStatusColor = (status: Listener['status']) => {
    switch (status) {
      case 'online': return '#10b981';
      case 'busy': return '#f59e0b';
      case 'offline': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status: Listener['status']) => {
    switch (status) {
      case 'online': return 'Available';
      case 'busy': return 'On Call';
      case 'offline': return 'Offline';
      default: return 'Unknown';
    }
  };

  const handleCall = async (listener: Listener) => {
    try {
      if (listener.status !== 'online') {
        Alert.alert('Not Available', 'This listener is currently not available.');
        return;
      }

      setIsLoading(true);
      // Here you would typically make an API call to initiate the call
      console.log(`Calling ${listener.name}...`);
      
      // Navigate to call screen
      navigation.navigate('Call', {
        listenerId: listener.id,
        listenerName: listener.name
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to initiate call. Please try again.');
      console.error('Call error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderHomeTab = () => (
    <View style={styles.tabContent}>
            {/* Welcome Banner */}
      <View style={styles.welcomeCard}>
        <Text style={styles.welcomeTitle}>Welcome back!</Text>
        <Text style={styles.welcomeSubtitle}>Find someone to talk to right now</Text>
        <View style={styles.availabilityContainer}>
          <View style={styles.availabilityDot} />
          <Text style={styles.availabilityText}>
                    {listeners.filter(l => l.status === 'online').length} listeners available
          </Text>
        </View>
      </View>

            {/* Available Listeners Title */}
      <Text style={styles.sectionTitle}>Available Listeners</Text>

            {/* Listeners List */}
      <View style={styles.listenersList}>
              {listeners.map((listener) => (
          <View key={listener.id} style={styles.listenerCard}>
            <View style={styles.listenerContent}>
                      {/* Avatar */}
              <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{listener.avatar}</Text>
                </View>
                <View style={[styles.statusDot, { backgroundColor: getStatusColor(listener.status) }]} />
              </View>
                      
                      {/* Content */}
              <View style={styles.listenerInfo}>
                        {/* Name and Rating */}
                <View style={styles.nameRatingContainer}>
                  <Text style={styles.listenerName}>{listener.name}</Text>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={14} color="#fbbf24" />
                    <Text style={styles.ratingText}>{listener.rating}</Text>
                  </View>
                </View>
                        
                        {/* Location */}
                <View style={styles.locationContainer}>
                  <Ionicons name="location" size={12} color="#9ca3af" />
                  <Text style={styles.locationText}>{listener.location}</Text>
                </View>
                        
                        {/* Languages and Calls */}
                <View style={styles.languagesContainer}>
                  <View style={styles.languageTags}>
                            {listener.languages.slice(0, 2).map((lang, index) => (
                      <View key={index} style={styles.languageTag}>
                        <Text style={styles.languageText}>{lang}</Text>
                      </View>
                    ))}
                  </View>
                  <Text style={styles.callsText}>{listener.totalCalls} calls</Text>
                </View>
                        
                        {/* Rate and Button */}
                <View style={styles.rateButtonContainer}>
                  <View>
                    <Text style={styles.rateText}>₹{listener.rate}</Text>
                    <Text style={styles.rateSubtext}>per minute</Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => handleCall(listener)}
                            disabled={listener.status !== 'online'}
                    style={[
                      styles.callButton,
                      listener.status !== 'online' && styles.callButtonDisabled
                    ]}
                  >
                    <View style={styles.callButtonContent}>
                      <Ionicons
                        name={listener.status === 'online' ? 'call' : 'time'}
                        size={14}
                        color={listener.status === 'online' ? 'white' : '#9ca3af'}
                      />
                      <Text style={[
                        styles.callButtonText,
                        listener.status !== 'online' && styles.callButtonTextDisabled
                      ]}>
                        {listener.status === 'online' ? 'Call Now' : 'On Call'}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderHistoryTab = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Call History</Text>
            {callHistory.map((call) => (
        <View key={call.id} style={styles.historyCard}>
          <View style={styles.historyContent}>
            <View style={styles.historyAvatar}>
              <Text style={styles.historyAvatarText}>{call.avatar}</Text>
            </View>
            <View style={styles.historyInfo}>
              <Text style={styles.historyName}>{call.listenerName}</Text>
              <Text style={styles.historyDateTime}>{call.date} at {call.time}</Text>
              <Text style={styles.historyDuration}>Duration: {call.duration}</Text>
            </View>
            <View style={styles.historyCost}>
              <Text style={styles.costText}>-₹{call.cost}</Text>
              <Text style={styles.costStatus}>Completed</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#47cfc8" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContainer}>
          <LinearGradient
            colors={['#47cfc8', '#76cfbc']}
            style={styles.header}
          >
            <Text style={styles.headerTitle}>LSNR</Text>
            <View style={styles.headerButtons}>
              <WalletButton />
              <ProfileSheet />
            </View>
          </LinearGradient>
        </View>

        {/* Content */}
        <ScrollView style={styles.content}>
          {activeTab === 'home' ? renderHomeTab() : renderHistoryTab()}
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity
            onPress={() => setActiveTab('home')}
            style={[
              styles.navButton,
              activeTab === 'home' && styles.navButtonActive
            ]}
          >
            <Ionicons
              name="home"
              size={24}
              color={activeTab === 'home' ? '#47cfc8' : '#6b7280'}
            />
            <Text style={[
              styles.navText,
              activeTab === 'home' && styles.navTextActive
            ]}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab('history')}
            style={[
              styles.navButton,
              activeTab === 'history' && styles.navButtonActive
            ]}
          >
            <Ionicons
              name="time"
              size={24}
              color={activeTab === 'history' ? '#47cfc8' : '#6b7280'}
            />
            <Text style={[
              styles.navText,
              activeTab === 'history' && styles.navTextActive
            ]}>History</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  safeArea: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: '#47cfc8',
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  tabContent: {
    gap: 16,
  },
  welcomeCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  availabilityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10b981',
  },
  availabilityText: {
    fontSize: 14,
    color: '#059669',
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    paddingHorizontal: 8,
  },
  listenersList: {
    gap: 12,
  },
  listenerCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  listenerContent: {
    padding: 16,
    flexDirection: 'row',
    gap: 16,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 64,
    height: 64,
    backgroundColor: '#f3f4f6',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 24,
  },
  statusDot: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'white',
  },
  listenerInfo: {
    flex: 1,
    minWidth: 0,
  },
  nameRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  listenerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    color: '#6b7280',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  locationText: {
    fontSize: 14,
    color: '#6b7280',
  },
  languagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  languageTags: {
    flexDirection: 'row',
    gap: 4,
  },
  languageTag: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  languageText: {
    fontSize: 12,
    color: '#6b7280',
  },
  callsText: {
    fontSize: 12,
    color: '#6b7280',
  },
  rateButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rateText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#47cfc8',
  },
  rateSubtext: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 4,
  },
  callButton: {
    backgroundColor: '#47cfc8',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    minHeight: 36,
  },
  callButtonDisabled: {
    backgroundColor: '#e5e7eb',
  },
  callButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  callButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
  },
  callButtonTextDisabled: {
    color: '#9ca3af',
  },
  historyCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  historyContent: {
    padding: 16,
    flexDirection: 'row',
    gap: 16,
  },
  historyAvatar: {
    width: 48,
    height: 48,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  historyAvatarText: {
    fontSize: 18,
  },
  historyInfo: {
    flex: 1,
    minWidth: 0,
  },
  historyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  historyDateTime: {
    fontSize: 14,
    color: '#6b7280',
  },
  historyDuration: {
    fontSize: 14,
    color: '#6b7280',
  },
  historyCost: {
    alignItems: 'flex-end',
  },
  costText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ef4444',
  },
  costStatus: {
    fontSize: 12,
    color: '#6b7280',
  },
  bottomNav: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 4,
  },
  navButton: {
    alignItems: 'center',
    gap: 2,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    minHeight: 40,
  },
  navButtonActive: {
    backgroundColor: 'rgba(71, 207, 200, 0.1)',
  },
  navText: {
    fontSize: 12,
    color: '#6b7280',
  },
  navTextActive: {
    color: '#47cfc8',
  },
});

export default MaleHome;
