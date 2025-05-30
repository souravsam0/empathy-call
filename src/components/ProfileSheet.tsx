import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView, Animated, Dimensions, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

type MenuItem = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  action: string;
  hasArrow: boolean;
  color: string;
  value?: string;
};

const { width } = Dimensions.get('window');

const ProfileSheet = () => {
  const [isOpen, setIsOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(width)).current;
  const [selectedLanguage, setSelectedLanguage] = useState('Hindi');
  const [userProfile, setUserProfile] = useState({ username: '' });
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

  const openSheet = () => {
    setIsOpen(true);
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
      tension: 65,
      friction: 11
    }).start();
  };

  const closeSheet = () => {
    Animated.timing(slideAnim, {
      toValue: width,
      duration: 250,
      useNativeDriver: true,
      easing: Easing.bezier(0.4, 0.0, 0.2, 1)
    }).start(() => setIsOpen(false));
  };

  const handleMenuClick = async (action: string) => {
    switch (action) {
      case 'recents':
        console.log('Opening recents...');
        // Navigate to recents page
        break;
      case 'transactions':
        navigation.navigate('Wallet' as never);
        break;
      case 'language':
        // Toggle language
        setSelectedLanguage(selectedLanguage === 'Hindi' ? 'English' : 'Hindi');
        break;
      case 'rate':
        console.log('Opening app store for rating...');
        // Open app store rating
        break;
      case 'share':
        console.log('Opening share dialog...');
        // Share app functionality
        break;
      case 'contact':
        console.log('Opening contact support...');
        // Contact support
        break;
      case 'settings':
        console.log('Opening settings...');
        // Navigate to settings
        break;
      case 'logout':
        try {
          await AsyncStorage.clear();
          navigation.navigate('Login' as never);
        } catch (error) {
          console.error('Error during logout:', error);
        }
        break;
      default:
        break;
    }
  };

  const menuItems: MenuItem[] = [
    { 
      icon: 'time-outline', 
      label: 'Recent Calls', 
      action: 'recents',
      hasArrow: true,
      color: '#3b82f6'
    },
    { 
      icon: 'swap-horizontal-outline', 
      label: 'Transaction History', 
      action: 'transactions',
      hasArrow: true,
      color: '#22c55e'
    },
    { 
      icon: 'globe-outline', 
      label: 'Language', 
      action: 'language',
      value: selectedLanguage, 
      hasArrow: false,
      color: '#a855f7'
    },
    { 
      icon: 'settings-outline', 
      label: 'Settings', 
      action: 'settings',
      hasArrow: true,
      color: '#6b7280'
    },
    { 
      icon: 'star-outline', 
      label: 'Rate LSNR', 
      action: 'rate',
      hasArrow: true,
      color: '#eab308'
    },
    { 
      icon: 'share-social-outline', 
      label: 'Share App', 
      action: 'share',
      hasArrow: true,
      color: '#6366f1'
    },
    { 
      icon: 'chatbubble-outline', 
      label: 'Help & Support', 
      action: 'contact',
      hasArrow: true,
      color: '#14b8a6'
    },
    { 
      icon: 'log-out-outline', 
      label: 'Logout', 
      action: 'logout',
      hasArrow: false,
      color: '#ef4444'
    },
  ];

  return (
    <>
      <TouchableOpacity
        onPress={openSheet}
        style={styles.triggerButton}
      >
        <LinearGradient
          colors={['#47cfc8', '#76cfbc']}
          style={styles.avatarGradient}
        >
          <Text style={styles.avatarText}>
              {userProfile.username ? userProfile.username[0].toUpperCase() : 'U'}
          </Text>
        </LinearGradient>
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent
        animationType="none"
        onRequestClose={closeSheet}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.backdrop}
            activeOpacity={1}
            onPress={closeSheet}
          />
          <Animated.View
            style={[
              styles.sheet,
              {
                transform: [{ translateX: slideAnim }],
              },
            ]}
          >
            <View style={styles.header}>
              <Text style={styles.title}>Profile</Text>
              <TouchableOpacity onPress={closeSheet} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollContent}>
          {/* Profile Card */}
              <View style={styles.profileCard}>
                <LinearGradient
                  colors={['rgba(71, 207, 200, 0.1)', 'rgba(118, 207, 188, 0.1)']}
                  style={styles.profileGradient}
                >
                  <View style={styles.profileContent}>
                    <LinearGradient
                      colors={['#47cfc8', '#76cfbc']}
                      style={styles.profileAvatar}
                    >
                      <Text style={styles.profileAvatarText}>
                  {userProfile.username ? userProfile.username[0].toUpperCase() : '👨‍💻'}
                      </Text>
                    </LinearGradient>
              
                    <Text style={styles.profileName}>
                  {userProfile.username || 'ConnectoUser'}
                    </Text>
                    <Text style={styles.profileSubtext}>Member since April 2025</Text>

                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() => handleMenuClick('settings')}
                    >
                      <Text style={styles.editButtonText}>Edit Profile</Text>
                    </TouchableOpacity>
                  </View>
                </LinearGradient>
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
                        <Ionicons name={item.icon} size={20} color={item.color} />
                      </View>
                      <Text style={styles.menuLabel}>{item.label}</Text>
                    </View>
                    <View style={styles.menuItemRight}>
                  {item.value && (
                        <Text style={styles.menuValue}>{item.value}</Text>
                      )}
                      {item.hasArrow && (
                        <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
                  )}
                    </View>
                  </TouchableOpacity>
            ))}
              </View>

          {/* Safe & Private Badge */}
              <View style={styles.badgeContainer}>
                <View style={styles.badge}>
                  <Ionicons name="shield-checkmark" size={16} color="#16a34a" />
                  <Text style={styles.badgeText}>100% Safe and Private</Text>
                </View>
              </View>
            </ScrollView>
          </Animated.View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  triggerButton: {
    padding: 8,
    borderRadius: 20,
  },
  avatarGradient: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sheet: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: '80%',
    backgroundColor: '#fcfcfc',
    borderTopLeftRadius: 24,
    borderBottomLeftRadius: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: -2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#47cfc8',
  },
  closeButton: {
    padding: 8,
  },
  scrollContent: {
    flex: 1,
    padding: 16,
  },
  profileCard: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(71, 207, 200, 0.2)',
  },
  profileGradient: {
    padding: 24,
  },
  profileContent: {
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
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
  },
  profileSubtext: {
    fontSize: 14,
    color: '#6b7280',
  },
  editButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#47cfc8',
  },
  editButtonText: {
    color: '#47cfc8',
    fontSize: 14,
    fontWeight: '500',
  },
  menuContainer: {
    marginTop: 24,
    gap: 8,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  menuValue: {
    fontSize: 14,
    color: '#47cfc8',
    fontWeight: '500',
  },
  badgeContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#dcfce7',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#bbf7d0',
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#16a34a',
  },
});

export default ProfileSheet;
