import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

type MenuItem = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  action: string;
  color: string;
  value?: string;
};

const FemaleProfileSheet = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [userProfile, setUserProfile] = useState({ name: '', avatar: '' });
  const navigation = useNavigation();

  React.useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await AsyncStorage.getItem('userProfile');
        if (profile) {
          setUserProfile(JSON.parse(profile));
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    };
    loadProfile();
  }, []);

  const handleMenuClick = (action: string) => {
    switch (action) {
      case 'payment':
        console.log('Opening payment details...');
        break;
      case 'history':
        console.log('Opening call history...');
        break;
      case 'ledger':
        console.log('Opening ledger...');
        break;
      case 'language':
        console.log('Opening language settings...');
        break;
      case 'rate':
        console.log('Opening rating...');
        break;
      case 'share':
        console.log('Opening share...');
        break;
      case 'contact':
        console.log('Opening contact...');
        break;
      case 'settings':
        console.log('Opening more settings...');
        break;
      case 'edit':
        console.log('Opening edit profile...');
        break;
      default:
        break;
    }
  };

  const handleGoOnline = () => {
    console.log('Going online...');
    setIsVisible(false);
  };

  const menuItems: MenuItem[] = [
    {
      icon: 'card-outline',
      label: 'Payment Details',
      action: 'payment',
      color: '#3b82f6'
    },
    {
      icon: 'time-outline',
      label: 'Call History',
      action: 'history',
      color: '#a855f7'
    },
    {
      icon: 'swap-horizontal-outline',
      label: 'Ledger',
      action: 'ledger',
      color: '#22c55e'
    },
    {
      icon: 'globe-outline',
      label: 'Secondary Language',
      action: 'language',
      value: 'Not Set',
      color: '#6366f1'
    },
    {
      icon: 'star-outline',
      label: 'Love Connect? Rate us',
      action: 'rate',
      color: '#eab308'
    },
    {
      icon: 'share-social-outline',
      label: 'Share App',
      action: 'share',
      color: '#ec4899'
    },
    {
      icon: 'mail-outline',
      label: 'Contact Us',
      action: 'contact',
      color: '#14b8a6'
    },
    {
      icon: 'settings-outline',
      label: 'More Settings',
      action: 'settings',
      color: '#6b7280'
    }
  ];

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsVisible(true)}
        style={styles.triggerButton}
      >
        <LinearGradient
          colors={['#ec4899', '#a855f7']}
          style={styles.avatarGradient}
        >
          <Text style={styles.avatarText}>
              {userProfile.name ? userProfile.name[0].toUpperCase() : userProfile.avatar || '👩'}
          </Text>
        </LinearGradient>
      </TouchableOpacity>

      <Modal
        visible={isVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Header */}
            <LinearGradient
              colors={['#fbcfe8', '#e9d5ff']}
              style={styles.header}
            >
              <View style={styles.headerContent}>
                <TouchableOpacity
                  onPress={() => setIsVisible(false)}
                  style={styles.backButton}
                >
                  <Ionicons name="arrow-back" size={24} color="#4b5563" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Profile</Text>
              </View>
              <TouchableOpacity
                onPress={handleGoOnline}
                style={styles.onlineButton}
              >
                <Text style={styles.onlineButtonText}>Go Online</Text>
              </TouchableOpacity>
            </LinearGradient>

            <ScrollView style={styles.scrollContent}>
              {/* Verification Banner */}
              <View style={styles.verificationCard}>
                <View style={styles.verificationContent}>
                  <View style={styles.verificationIcon}>
                    <Ionicons name="time" size={24} color="#d97706" />
                  </View>
                  <View style={styles.verificationText}>
                    <Text style={styles.verificationTitle}>Verification in Progress</Text>
                    <Text style={styles.verificationSubtitle}>This may typically take 7 days</Text>
                  </View>
                </View>
              </View>

              {/* Profile Card */}
              <View style={styles.profileCard}>
                <View style={styles.profileContent}>
                  <View style={styles.profileInfo}>
                    <LinearGradient
                      colors={['#ec4899', '#a855f7']}
                      style={styles.profileAvatar}
                    >
                      <Text style={styles.profileAvatarText}>
                    {userProfile.name ? userProfile.name[0].toUpperCase() : userProfile.avatar || '👩'}
                      </Text>
                    </LinearGradient>
                    <View style={styles.profileDetails}>
                      <Text style={styles.profileName}>
                    {userProfile.name || 'Shailu'}
                      </Text>
                      <Text style={styles.profileAge}>25 Yrs</Text>
                      <Text style={styles.profileDate}>
                    Member since 27 May, 2025
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleMenuClick('edit')}
                    style={styles.editButton}
                  >
                    <Ionicons name="create-outline" size={24} color="#3b82f6" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Menu Items */}
              <View style={styles.menuContainer}>
            {menuItems.map((item, index) => (
                  <TouchableOpacity
                key={index}
                    onPress={() => handleMenuClick(item.action)}
                    style={styles.menuItem}
                  >
                    <View style={styles.menuItemContent}>
                      <View style={[styles.menuIcon, { backgroundColor: `${item.color}20` }]}>
                        <Ionicons name={item.icon} size={24} color={item.color} />
                      </View>
                      <Text style={styles.menuLabel}>{item.label}</Text>
                    </View>
                    <View style={styles.menuItemRight}>
                  {item.value && (
                        <Text style={styles.menuValue}>{item.value}</Text>
                      )}
                      <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
                    </View>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Safe & Private Badge */}
              <View style={styles.badgeContainer}>
                <View style={styles.badge}>
                  <Ionicons name="shield-checkmark" size={20} color="#16a34a" />
                  <Text style={styles.badgeText}>100% Safe and Private</Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  triggerButton: {
    padding: 12,
    borderRadius: 20,
  },
  avatarGradient: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    flex: 1,
    marginLeft: '20%',
    backgroundColor: '#fdf2f8',
  },
  header: {
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
  },
  onlineButton: {
    backgroundColor: '#9ca3af',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 9999,
  },
  onlineButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  scrollContent: {
    padding: 24,
    gap: 24,
  },
  verificationCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
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
    color: '#1f2937',
  },
  verificationSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  profileCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    borderWidth: 2,
    borderColor: '#bfdbfe',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  profileContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileAvatarText: {
    color: 'white',
    fontSize: 32,
  },
  profileDetails: {
    gap: 4,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
  },
  profileAge: {
    fontSize: 18,
    color: '#4b5563',
  },
  profileDate: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 8,
  },
  editButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    gap: 12,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  menuIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuLabel: {
    fontSize: 18,
    fontWeight: '500',
    color: '#1f2937',
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuValue: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '500',
  },
  badgeContainer: {
    paddingTop: 24,
    alignItems: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#dcfce7',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#bbf7d0',
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#16a34a',
  },
});

export default FemaleProfileSheet;
