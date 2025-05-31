import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, StatusBar, Platform } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type RootStackParamList = {
  MaleHome: undefined;
  Settings: undefined;
  Transactions: undefined;
  EditProfile: undefined;
};

type MenuItem = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  action: string;
  color: string;
  value?: string;
};

const MaleProfile = () => {
  const [userProfile, setUserProfile] = useState({ name: '', avatar: '' });
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await AsyncStorage.getItem('@user_profile');
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
      case 'transactions':
        navigation.navigate('Transactions');
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
        navigation.navigate('Settings');
        break;
      case 'edit':
        navigation.navigate('EditProfile');
        break;
      default:
        break;
    }
  };

  const menuItems: MenuItem[] = [
    {
      icon: 'wallet-outline',
      label: 'Transactions',
      action: 'transactions',
      color: '#3b82f6'
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
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#47cfc8" />
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
          <Text style={styles.headerTitle}>My Profile</Text>
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.scrollContent}
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileContent}>
            <View style={styles.profileInfo}>
              <LinearGradient
                colors={['#60a5fa', '#a855f7']}
                style={styles.profileAvatar}
              >
                <Text style={styles.profileAvatarText}>
                  {userProfile.avatar || (userProfile.name ? userProfile.name[0].toUpperCase() : '👨')}
                </Text>
              </LinearGradient>
              <View style={styles.profileDetails}>
                <Text style={styles.profileName}>
                  {userProfile.name || 'John'}
                </Text>
                <Text style={styles.profileAge}>28 Yrs</Text>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    padding: 24,
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#47cfc8',
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
  scrollContent: {
    flex: 1,
  },
  scrollContentContainer: {
    padding: 16,
    gap: 16,
  },
  profileCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: '#bfdbfe',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
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
    marginTop: 4,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
  },
  menuContainer: {
    gap: 12,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
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
    fontSize: 16,
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
    paddingTop: 8,
    paddingBottom: 24,
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

export default MaleProfile; 