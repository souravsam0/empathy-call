import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  Login: undefined;
  GenderSelection: undefined;
  FemaleNameSetup: undefined;
  FemaleAvatarSetup: undefined;
};

const FemaleNameSetup = () => {
  const [username, setUsername] = useState('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const isValid = username.length >= 3;

  const handleBack = () => {
    navigation.goBack();
  };

  const handleContinue = async () => {
    if (!isValid) return;
    try {
      await AsyncStorage.setItem('@user_name', username);
      navigation.navigate('FemaleAvatarSetup');
    } catch (error) {
      console.error('Error saving name:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#47cfc8" />
      <LinearGradient colors={['#47cfc8', '#76cfbc']} style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.illustrationContainer}>
            <View style={styles.welcomeEmoji}>
              <Text style={styles.welcomeEmojiText}>👋</Text>
            </View>
          </View>

          <Text style={styles.title}>What's your name?</Text>
          <Text style={styles.subtitle}>This is how others will know you</Text>
          
          <View style={styles.inputContainer}>
            <TextInput
              value={username}
              onChangeText={setUsername}
              placeholder="Enter your name"
              placeholderTextColor="#94a3b8"
              style={[
                styles.input,
                username.length > 0 && styles.inputActive
              ]}
              maxLength={20}
            />
          </View>

          <TouchableOpacity
            onPress={handleContinue}
            disabled={!isValid}
            style={[
              styles.nextButton,
              isValid && styles.nextButtonActive
            ]}
          >
            <Text style={[
              styles.nextButtonText,
              isValid && styles.nextButtonTextActive
            ]}>Continue</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#47cfc8',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  backButton: {
    padding: 8,
  },
  backText: {
    color: '#fff',
    fontSize: 16,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  illustrationContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  welcomeEmoji: {
    width: 120,
    height: 120,
    backgroundColor: '#fff',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  welcomeEmojiText: {
    fontSize: 48,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 32,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 20,
  },
  input: {
    width: '100%',
    height: 56,
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 20,
    fontSize: 18,
    color: '#1f2937',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  inputActive: {
    borderWidth: 2,
    borderColor: '#fff',
  },
  nextButton: {
    width: '100%',
    height: 56,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  nextButtonActive: {
    backgroundColor: '#fff',
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 0.5)',
  },
  nextButtonTextActive: {
    color: '#47cfc8',
  },
});

export default FemaleNameSetup; 