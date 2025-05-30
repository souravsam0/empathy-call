import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Animated, Alert, SafeAreaView, StatusBar } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import FemaleProfileSheet from "../components/FemaleProfileSheet";

// Define types
type RootStackParamList = {
  AudioVerification: undefined;
  ProfileSetup: undefined;
  FemaleHome: undefined;
  CallHistory: undefined;
  Earnings: undefined;
};

type VerificationStatus = 'pending' | 'approved' | 'rejected';

type CallHistory = {
  id: number;
  callerName: string;
  date: string;
  time: string;
  duration: string;
  earned: number;
};

type Earnings = {
  lifetime: number;
  today: number;
  thisWeek: number;
  thisMonth: number;
};

const FemaleHome = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'history' | 'earnings'>('home');
  const [isLive, setIsLive] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>('pending');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Mock earnings data
  const earnings: Earnings = {
    lifetime: 15750,
    today: 850,
    thisWeek: 3250,
    thisMonth: 12400
  };

  // Mock call history
  const callHistory: CallHistory[] = [
    {
      id: 1,
      callerName: 'Anonymous User',
      date: '2025-05-27',
      time: '14:30',
      duration: '15 min',
      earned: 375
    },
    {
      id: 2,
      callerName: 'Anonymous User',
      date: '2025-05-26',
      time: '19:45',
      duration: '28 min',
      earned: 700
    }
  ];

  // Safety tips banners
  const safetyTips = [
    "Remember: Never share personal information during calls",
    "Take breaks between calls to maintain your well-being",
    "You can end any call that makes you uncomfortable",
    "Report any inappropriate behavior immediately"
  ];

  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const fadeAnim = new Animated.Value(0);

  const toggleLiveStatus = async () => {
    try {
      if (verificationStatus !== 'approved') {
        Alert.alert(
          'Not Verified',
          'Please complete verification before going live.',
          [
            {
              text: 'Go to Verification',
              onPress: () => navigation.navigate('AudioVerification')
            },
            {
              text: 'Cancel',
              style: 'cancel'
            }
          ]
        );
        return;
      }

      setIsLoading(true);
      // Here you would typically make an API call to update live status
      setIsLive(!isLive);
      console.log(isLive ? 'Going offline' : 'Going live');
    } catch (error) {
      Alert.alert('Error', 'Failed to update live status. Please try again.');
      console.error('Live status error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = (tab: 'home' | 'history' | 'earnings') => {
    setActiveTab(tab);
  };

  // Rotate safety tips every few seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % safetyTips.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const renderHomeTab = () => (
    <View style={styles.tabContent}>
            {/* Verification Status Banner */}
            {verificationStatus === 'pending' && (
        <View style={styles.verificationCard}>
          <LinearGradient
            colors={['#fef3c7', '#fde68a']}
            style={styles.verificationGradient}
          >
            <View style={styles.verificationContent}>
              <View style={styles.verificationIcon}>
                <Ionicons name="time" size={24} color="#92400e" />
              </View>
              <View style={styles.verificationText}>
                <Text style={styles.verificationTitle}>Verification in Progress</Text>
                <Text style={styles.verificationSubtitle}>
                        Your audio verification is being reviewed. You'll be able to go live once approved.
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>
            )}

            {verificationStatus === 'approved' && (
        <View style={styles.verificationCard}>
          <LinearGradient
            colors={['#dcfce7', '#bbf7d0']}
            style={styles.verificationGradient}
          >
            <View style={styles.verificationContent}>
              <View style={[styles.verificationIcon, { backgroundColor: '#bbf7d0' }]}>
                <Ionicons name="checkmark-circle" size={24} color="#166534" />
              </View>
              <View style={styles.verificationText}>
                <Text style={[styles.verificationTitle, { color: '#166534' }]}>Verification Complete</Text>
                <Text style={[styles.verificationSubtitle, { color: '#166534' }]}>
                        You're verified and ready to help users!
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>
      )}

      {/* Earnings Summary */}
      <View style={styles.earningsGrid}>
        <View style={styles.earningsCard}>
          <LinearGradient
            colors={['rgba(118, 207, 188, 0.1)', 'rgba(166, 207, 177, 0.1)']}
            style={styles.earningsGradient}
          >
            <Text style={styles.earningsLabel}>Today's Earnings</Text>
            <Text style={styles.earningsAmount}>₹{earnings.today}</Text>
          </LinearGradient>
        </View>

        <View style={styles.earningsCard}>
          <LinearGradient
            colors={['rgba(166, 207, 177, 0.1)', 'rgba(214, 207, 166, 0.1)']}
            style={styles.earningsGradient}
          >
            <Text style={styles.earningsLabel}>Total Earnings</Text>
            <Text style={styles.earningsAmount}>₹{earnings.lifetime}</Text>
          </LinearGradient>
        </View>
      </View>

      {/* Go Live Button */}
      <View style={styles.liveCard}>
        <View style={styles.liveContent}>
          <View style={[
            styles.liveIconContainer,
            isLive && styles.liveIconContainerActive
          ]}>
            <Ionicons
              name={isLive ? 'mic' : 'mic-off'}
              size={36}
              color={isLive ? 'white' : '#6b7280'}
            />
          </View>

          <View style={styles.liveTextContainer}>
            <Text style={styles.liveTitle}>
                      {isLive ? 'You are Live!' : 'Ready to Help?'}
            </Text>
            <Text style={styles.liveSubtitle}>
                      {isLive ? 'Users can now call you' : verificationStatus === 'pending' ? 'Complete verification to go live' : 'Go live to start receiving calls'}
            </Text>
          </View>
                  
          <TouchableOpacity
            onPress={toggleLiveStatus}
                    disabled={verificationStatus !== 'approved'}
            style={[
              styles.liveButton,
              isLive ? styles.liveButtonOffline : styles.liveButtonOnline,
              verificationStatus !== 'approved' && styles.liveButtonDisabled
            ]}
          >
            <Text style={styles.liveButtonText}>
                    {isLive ? 'Go Offline' : 'Go Live'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Safety Banner */}
      <View style={styles.safetyCard}>
        <LinearGradient
          colors={['rgba(214, 207, 166, 0.2)', 'rgba(166, 207, 177, 0.2)']}
          style={styles.safetyGradient}
        >
          <View style={styles.safetyContent}>
            <View style={styles.safetyDot} />
            <View style={styles.safetyText}>
              <Text style={styles.safetyTitle}>Safety Tip</Text>
              <Text style={styles.safetyTip}>{safetyTips[currentTipIndex]}</Text>
            </View>
          </View>
        </LinearGradient>
      </View>
    </View>
  );

  const renderHistoryTab = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Call History</Text>
            {callHistory.map((call) => (
        <View key={call.id} style={styles.historyCard}>
          <View style={styles.historyContent}>
            <View style={styles.historyInfo}>
              <Text style={styles.historyName}>{call.callerName}</Text>
              <Text style={styles.historyDateTime}>{call.date} at {call.time}</Text>
              <Text style={styles.historyDuration}>Duration: {call.duration}</Text>
            </View>
            <View style={styles.historyEarnings}>
              <Text style={styles.earningsText}>+₹{call.earned}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );

  const renderEarningsTab = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Earnings Overview</Text>
      
      <View style={styles.earningsOverview}>
        <View style={styles.earningsOverviewCard}>
          <LinearGradient
            colors={['#dcfce7', '#bbf7d0']}
            style={styles.earningsOverviewGradient}
          >
            <View style={styles.earningsOverviewContent}>
              <View>
                <Text style={styles.earningsOverviewLabel}>This Month</Text>
                <Text style={styles.earningsOverviewAmount}>₹{earnings.thisMonth}</Text>
              </View>
              <Ionicons name="trending-up" size={32} color="#166534" />
            </View>
          </LinearGradient>
        </View>

        <View style={styles.earningsOverviewCard}>
          <LinearGradient
            colors={['#dbeafe', '#bfdbfe']}
            style={styles.earningsOverviewGradient}
          >
            <View style={styles.earningsOverviewContent}>
              <View>
                <Text style={[styles.earningsOverviewLabel, { color: '#1e40af' }]}>This Week</Text>
                <Text style={[styles.earningsOverviewAmount, { color: '#1e40af' }]}>₹{earnings.thisWeek}</Text>
              </View>
              <Ionicons name="trending-up" size={32} color="#1e40af" />
            </View>
          </LinearGradient>
        </View>

        <View style={styles.earningsOverviewCard}>
          <LinearGradient
            colors={['#f3e8ff', '#e9d5ff']}
            style={styles.earningsOverviewGradient}
          >
            <View style={styles.earningsOverviewContent}>
              <View>
                <Text style={[styles.earningsOverviewLabel, { color: '#6b21a8' }]}>Total Lifetime</Text>
                <Text style={[styles.earningsOverviewAmount, { color: '#6b21a8' }]}>₹{earnings.lifetime}</Text>
              </View>
              <Ionicons name="trending-up" size={32} color="#6b21a8" />
            </View>
          </LinearGradient>
        </View>
      </View>
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
            <View>
              <Text style={styles.headerTitle}>LSNR</Text>
              <Text style={styles.headerSubtitle}>Welcome back, Shailu 👋</Text>
            </View>
            <FemaleProfileSheet />
          </LinearGradient>
        </View>

        {/* Content */}
        <ScrollView style={styles.content}>
          {activeTab === 'home' ? renderHomeTab() :
           activeTab === 'history' ? renderHistoryTab() :
           renderEarningsTab()}
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity
            onPress={() => handleTabChange('home')}
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
            onPress={() => handleTabChange('history')}
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

          <TouchableOpacity
            onPress={() => handleTabChange('earnings')}
            style={[
              styles.navButton,
              activeTab === 'earnings' && styles.navButtonActive
            ]}
          >
            <Ionicons
              name="wallet"
              size={24}
              color={activeTab === 'earnings' ? '#47cfc8' : '#6b7280'}
            />
            <Text style={[
              styles.navText,
              activeTab === 'earnings' && styles.navTextActive
            ]}>Earnings</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  tabContent: {
    gap: 16,
  },
  verificationCard: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  verificationGradient: {
    padding: 16,
  },
  verificationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  verificationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fef3c7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  verificationText: {
    flex: 1,
  },
  verificationTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#92400e',
    marginBottom: 4,
  },
  verificationSubtitle: {
    fontSize: 14,
    color: '#92400e',
  },
  earningsGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  earningsCard: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  earningsGradient: {
    padding: 16,
    alignItems: 'center',
  },
  earningsLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  earningsAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#47cfc8',
  },
  liveCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  liveContent: {
    padding: 32,
    alignItems: 'center',
    gap: 24,
  },
  liveIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  liveIconContainerActive: {
    backgroundColor: '#10b981',
  },
  liveTextContainer: {
    alignItems: 'center',
    gap: 8,
  },
  liveTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
  },
  liveSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  liveButton: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  liveButtonOnline: {
    backgroundColor: '#47cfc8',
  },
  liveButtonOffline: {
    backgroundColor: '#ef4444',
  },
  liveButtonDisabled: {
    opacity: 0.5,
  },
  liveButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  safetyCard: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  safetyGradient: {
    padding: 20,
  },
  safetyContent: {
    flexDirection: 'row',
    gap: 12,
  },
  safetyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#47cfc8',
    marginTop: 8,
  },
  safetyText: {
    flex: 1,
  },
  safetyTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 4,
  },
  safetyTip: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
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
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  historyInfo: {
    flex: 1,
  },
  historyName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  historyDateTime: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  historyDuration: {
    fontSize: 14,
    color: '#6b7280',
  },
  historyEarnings: {
    alignItems: 'flex-end',
  },
  earningsText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#47cfc8',
  },
  earningsOverview: {
    gap: 16,
  },
  earningsOverviewCard: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  earningsOverviewGradient: {
    padding: 24,
  },
  earningsOverviewContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  earningsOverviewLabel: {
    fontSize: 14,
    color: '#166534',
    marginBottom: 4,
  },
  earningsOverviewAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#166534',
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

export default FemaleHome;
