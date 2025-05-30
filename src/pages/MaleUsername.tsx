import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, SafeAreaView } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

type RootStackParamList = {
  Login: undefined;
  GenderSelection: undefined;
  MaleUsername: undefined;
  FemaleProfileSetup: undefined;
  MaleHome: undefined;
  FemaleHome: undefined;
  AudioVerification: undefined;
  WalletScreen: undefined;
  Call: undefined;
  NotFound: undefined;
};

const MaleUsername = () => {
  const [username, setUsername] = useState('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const fadeAnim = new Animated.Value(0);

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleContinue = async () => {
    if (username.trim()) {
      try {
        await AsyncStorage.setItem('userProfile', JSON.stringify({
          username: username,
          gender: 'male'
        }));
        navigation.navigate('MaleHome');
      } catch (error) {
        console.error('Error saving profile:', error);
      }
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const isValid = username.trim().length >= 3;

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#fcfcfc', 'rgba(214, 207, 166, 0.3)']}
        style={styles.container}
      >
        <View style={styles.content}>
          <TouchableOpacity
            onPress={handleBack}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#666" />
          </TouchableOpacity>

          <View style={styles.header}>
            <View style={styles.avatarContainer}>
              <LinearGradient
                colors={['#47cfc8', '#76cfbc']}
                style={styles.avatarGradient}
              >
                <Ionicons name="person" size={32} color="white" />
              </LinearGradient>
            </View>

            <Text style={styles.title}>Create Your Identity</Text>
            <Text style={styles.subtitle}>Choose a username that represents you</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Username</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                value={username}
                onChangeText={(text) => setUsername(text.slice(0, 20))}
                placeholder="Enter your unique username"
                maxLength={20}
                style={[
                  styles.input,
                  isValid && styles.inputValid
                ]}
              />
              <View style={[
                styles.validIndicator,
                isValid ? styles.validIndicatorActive : {}
              ]} />
            </View>

            <View style={styles.inputFooter}>
              <Text style={styles.charCount}>{username.length}/20 characters</Text>
              <Text style={styles.validationText}>
                {isValid ? '✓ Looks good!' : 'Min 3 characters'}
              </Text>
            </View>
          </View>

          <View style={styles.tipContainer}>
            <View style={styles.tipIcon}>
              <Text style={styles.tipEmoji}>💡</Text>
            </View>
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Pro Tip</Text>
              <Text style={styles.tipText}>
                Choose something memorable and unique. You can't change it later!
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={handleContinue}
            disabled={!isValid}
            style={[
              styles.continueButton,
              !isValid && styles.continueButtonDisabled
            ]}
          >
            <LinearGradient
              colors={isValid ? ['#47cfc8', '#76cfbc'] : ['#e5e7eb', '#e5e7eb']}
              style={styles.buttonGradient}
            >
              <Text style={[
                styles.buttonText,
                !isValid && styles.buttonTextDisabled
              ]}>
                {isValid ? 'Continue Your Journey' : 'Enter Username'}
              </Text>
              {isValid && (
                <Ionicons name="sparkles" size={18} color="white" style={styles.buttonIcon} />
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fcfcfc',
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    marginBottom: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatarGradient: {
    width: 80,
    height: 80,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#47cfc8',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
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
    backgroundColor: 'white',
  },
  inputValid: {
    borderColor: '#47cfc8',
  },
  validIndicator: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: -6 }],
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#e5e7eb',
  },
  validIndicatorActive: {
    backgroundColor: '#10b981',
  },
  inputFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  charCount: {
    fontSize: 14,
    color: '#6b7280',
  },
  validationText: {
    fontSize: 12,
    color: '#9ca3af',
  },
  tipContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(71, 207, 200, 0.1)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(71, 207, 200, 0.2)',
    marginBottom: 24,
  },
  tipIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#47cfc8',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  tipEmoji: {
    fontSize: 12,
    color: 'white',
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 4,
  },
  tipText: {
    fontSize: 12,
    color: '#4b5563',
  },
  continueButton: {
    height: 56,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#47cfc8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  continueButtonDisabled: {
    opacity: 0.7,
  },
  buttonGradient: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  buttonTextDisabled: {
    color: '#9ca3af',
  },
  buttonIcon: {
    marginLeft: 8,
  },
});

export default MaleUsername;
