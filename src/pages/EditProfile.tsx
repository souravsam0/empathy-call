import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const FEMALE_AVATARS = [
  '👩', '👩‍💼', '👩‍⚕️', '👩‍🎓', '👩‍🏫', '👩‍⚖️', 
  '👩‍🌾', '👩‍🍳', '👩‍🔧', '👩‍🏭', '👩‍💻', '👩‍🎨'
];

const EditProfile = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [avatar, setAvatar] = useState('');
  const [gender, setGender] = useState('male');
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      // Load the main profile data
      const profile = await AsyncStorage.getItem('@user_profile');
      const userGender = await AsyncStorage.getItem('userGender');
      const userName = await AsyncStorage.getItem('@user_name');
      
      if (profile) {
        const profileData = JSON.parse(profile);
        setName(userName || profileData.name || '');
        setAge(profileData.age?.toString() || '');
        setGender(userGender || profileData.gender || 'male');
        
        // If it's a female user, load the avatar from the specific storage key
        if (userGender === 'female' || profileData.gender === 'female') {
          const savedAvatar = await AsyncStorage.getItem('@user_avatar');
          if (savedAvatar) {
            setAvatar(savedAvatar);
          } else {
            setAvatar(FEMALE_AVATARS[0]); // Default female avatar
          }
        } else {
          setAvatar(''); // For male users, we'll use initials
        }
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const handleSave = async () => {
    try {
      const profile = await AsyncStorage.getItem('@user_profile');
      const existingProfile = profile ? JSON.parse(profile) : {};
      
      const updatedProfile = {
        ...existingProfile,
        name: name.trim(),
        age: age.trim() ? parseInt(age.trim()) : undefined,
        gender,
      };

      await AsyncStorage.setItem('@user_profile', JSON.stringify(updatedProfile));
      await AsyncStorage.setItem('@user_name', name.trim());
      
      // For female users, also save the avatar separately
      if (gender === 'female' && avatar) {
        await AsyncStorage.setItem('@user_avatar', avatar);
      }
      
      navigation.goBack();
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const getAvatarGradientColors = () => {
    return gender === 'female' 
      ? ['#ec4899', '#a855f7'] as const
      : ['#60a5fa', '#a855f7'] as const;
  };

  const getAvatarDisplay = () => {
    if (gender === 'female' && avatar) {
      return avatar;
    }
    return name ? name[0].toUpperCase() : (gender === 'female' ? '👩' : '👨');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#47cfc8" />
      <View style={[styles.safeArea, { paddingTop: Platform.OS === 'ios' ? insets.top : StatusBar.currentHeight }]}>
        <LinearGradient
          colors={['#47cfc8', '#76cfbc']}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color="#4b5563" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Edit Profile</Text>
          </View>
        </LinearGradient>

        <View style={styles.content}>
          <View style={styles.avatarContainer}>
            <LinearGradient
              colors={getAvatarGradientColors()}
              style={styles.avatar}
            >
              <Text style={styles.avatarText}>
                {getAvatarDisplay()}
              </Text>
            </LinearGradient>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              style={styles.input}
              placeholder="Enter your name"
              placeholderTextColor="#9ca3af"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Age (Optional)</Text>
            <TextInput
              value={age}
              onChangeText={(text) => {
                // Only allow numbers
                if (/^\d*$/.test(text)) {
                  setAge(text);
                }
              }}
              style={styles.input}
              placeholder="Enter your age"
              placeholderTextColor="#9ca3af"
              keyboardType="numeric"
              maxLength={2}
            />
          </View>

          <TouchableOpacity
            style={[
              styles.saveButton,
              !name.trim() && styles.saveButtonDisabled
            ]}
            onPress={handleSave}
            disabled={!name.trim()}
          >
            <Text style={[
              styles.saveButtonText,
              !name.trim() && styles.saveButtonTextDisabled
            ]}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  header: {
    padding: 16,
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
    padding: 16,
    gap: 24,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 40,
    color: 'white',
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4b5563',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1f2937',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  saveButton: {
    backgroundColor: '#47cfc8',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: '#e5e7eb',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButtonTextDisabled: {
    color: '#9ca3af',
  },
});

export default EditProfile; 