import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Animated } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  AudioVerification: undefined;
  // Add other routes as needed
};

const FemaleProfileSetup = () => {
  const [displayName, setDisplayName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Predefined avatar collection
  const avatars = [
    '👩‍💼', '👩‍🎓', '👩‍⚕️', '👩‍🏫', '👩‍💻', 
    '👩‍🎨', '👩‍🔬', '👩‍🎤', '👩‍✈️', '👩‍🚀'
  ];

  const handleContinue = async () => {
    if (displayName.trim() && selectedAvatar) {
      try {
        await AsyncStorage.setItem('userProfile', JSON.stringify({
        name: displayName,
        avatar: selectedAvatar,
        gender: 'female'
      }));
        navigation.navigate('AudioVerification');
      } catch (error) {
        console.error('Error saving profile:', error);
      }
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const isValid = displayName.trim().length >= 2;

  return (
    <View style={styles.container}>
      {/* Animated background elements */}
      <View style={styles.backgroundElements}>
        <View style={[styles.backgroundCircle, styles.circle1]} />
        <View style={[styles.backgroundCircle, styles.circle2]} />
        <Ionicons name="heart" size={24} color="rgba(71, 207, 200, 0.3)" style={styles.icon1} />
        <Ionicons name="star" size={20} color="rgba(118, 207, 188, 0.3)" style={styles.icon2} />
        <Ionicons name="sparkles" size={18} color="rgba(166, 207, 177, 0.4)" style={styles.icon3} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={handleBack}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={20} color="#4b5563" />
            </TouchableOpacity>

            <View style={styles.avatarContainer}>
              <LinearGradient
                colors={['#47cfc8', '#76cfbc']}
                style={styles.avatarGradient}
              >
                <Ionicons name="person" size={32} color="white" />
              </LinearGradient>
            </View>

            <Text style={styles.title}>Create Your Identity</Text>
            <Text style={styles.subtitle}>Let others know how to connect with you</Text>
          </View>

          <View style={styles.content}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Display Name</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                value={displayName}
                  onChangeText={(text) => setDisplayName(text.slice(0, 30))}
                placeholder="Enter your beautiful name"
                maxLength={30}
                  style={[
                    styles.input,
                    isValid && styles.inputValid
                  ]}
                />
                <View style={[
                  styles.validationDot,
                  isValid ? styles.validationDotValid : styles.validationDotInvalid
                ]} />
              </View>
              
              <View style={styles.inputFooter}>
                <Text style={styles.characterCount}>
                {displayName.length}/30 characters
                </Text>
                <Text style={styles.validationText}>
                {isValid ? '✨ Perfect!' : 'Min 2 characters'}
                </Text>
              </View>
            </View>

            <View style={styles.avatarSelection}>
              <Text style={styles.label}>Choose Your Avatar</Text>
              <View style={styles.avatarGrid}>
              {avatars.map((avatar, index) => (
                  <TouchableOpacity
                  key={index}
                    onPress={() => setSelectedAvatar(avatar)}
                    style={[
                      styles.avatarButton,
                      selectedAvatar === avatar && styles.avatarButtonSelected
                    ]}
                  >
                    <Text style={styles.avatarEmoji}>{avatar}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            {selectedAvatar && (
                <Text style={styles.avatarSelectedText}>
                Great choice! {selectedAvatar}
                </Text>
              )}
            </View>

            <View style={styles.infoCard}>
              <LinearGradient
                colors={['rgba(71, 207, 200, 0.1)', 'rgba(118, 207, 188, 0.1)']}
                style={styles.infoGradient}
              >
                <View style={styles.infoContent}>
                  <View style={styles.infoIcon}>
                    <Ionicons name="heart" size={12} color="white" />
                  </View>
                  <View style={styles.infoText}>
                    <Text style={styles.infoTitle}>Welcome to LSNR!</Text>
                    <Text style={styles.infoDescription}>
                  Your profile helps users feel comfortable before connecting with you.
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            </View>

            <TouchableOpacity
              onPress={handleContinue}
            disabled={!isValid || !selectedAvatar}
              style={[
                styles.continueButton,
                (!isValid || !selectedAvatar) && styles.continueButtonDisabled
              ]}
            >
              <Text style={[
                styles.continueButtonText,
                (!isValid || !selectedAvatar) && styles.continueButtonTextDisabled
              ]}>
                {isValid && selectedAvatar ? 'Continue Your Journey' : 'Complete Your Profile'}
              </Text>
              {isValid && selectedAvatar && (
                <Ionicons name="sparkles" size={18} color="white" style={styles.sparklesIcon} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfcfc',
  },
  backgroundElements: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  backgroundCircle: {
    position: 'absolute',
    borderRadius: 9999,
  },
  circle1: {
    top: 80,
    right: 80,
    width: 128,
    height: 128,
    backgroundColor: 'rgba(71, 207, 200, 0.2)',
  },
  circle2: {
    bottom: 128,
    left: 64,
    width: 96,
    height: 96,
    backgroundColor: 'rgba(166, 207, 177, 0.2)',
  },
  icon1: {
    position: 'absolute',
    top: 128,
    left: 128,
  },
  icon2: {
    position: 'absolute',
    bottom: 160,
    right: 160,
  },
  icon3: {
    position: 'absolute',
    top: '50%',
    right: 80,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    padding: 24,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 16,
    top: 16,
    padding: 8,
    borderRadius: 20,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  avatarGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#47cfc8',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  content: {
    padding: 24,
    gap: 24,
  },
  inputContainer: {
    gap: 12,
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    color: '#374151',
  },
  inputWrapper: {
    position: 'relative',
  },
  input: {
    height: 56,
    fontSize: 18,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingRight: 48,
  },
  inputValid: {
    borderColor: '#47cfc8',
  },
  validationDot: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: -6 }],
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  validationDotValid: {
    backgroundColor: '#10b981',
  },
  validationDotInvalid: {
    backgroundColor: '#d1d5db',
  },
  inputFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  characterCount: {
    fontSize: 14,
    color: '#6b7280',
  },
  validationText: {
    fontSize: 12,
    color: '#9ca3af',
  },
  avatarSelection: {
    gap: 12,
  },
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  avatarButton: {
    width: '18%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    backgroundColor: 'white',
  },
  avatarButtonSelected: {
    borderColor: '#47cfc8',
    backgroundColor: 'rgba(118, 207, 188, 0.2)',
    transform: [{ scale: 1.05 }],
  },
  avatarEmoji: {
    fontSize: 24,
  },
  avatarSelectedText: {
    fontSize: 14,
    color: '#47cfc8',
    fontWeight: '500',
    textAlign: 'center',
  },
  infoCard: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  infoGradient: {
    padding: 16,
  },
  infoContent: {
    flexDirection: 'row',
    gap: 12,
  },
  infoIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#47cfc8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
  },
  infoDescription: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  continueButton: {
    height: 56,
    borderRadius: 12,
    backgroundColor: '#47cfc8',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  continueButtonDisabled: {
    backgroundColor: '#e5e7eb',
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  continueButtonTextDisabled: {
    color: '#9ca3af',
  },
  sparklesIcon: {
    marginLeft: 4,
  },
});

export default FemaleProfileSetup;
