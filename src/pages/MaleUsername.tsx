import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

type RootStackParamList = {
  Login: undefined;
  GenderSelection: undefined;
  MaleUsername: undefined;
  MaleHome: undefined;
};

const MaleUsername = () => {
  const [username, setUsername] = useState('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const isValid = username.length >= 3;

  const handleBack = () => {
    navigation.goBack();
  };

  const handleContinue = async () => {
    if (!isValid) return;
    try {
      await AsyncStorage.setItem('@user_username', username);
      navigation.navigate('MaleHome');
    } catch (error) {
      console.error('Error saving username:', error);
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
          <TouchableOpacity onPress={handleContinue} style={styles.skipButton}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.illustrationContainer}>
            <View style={styles.circle}>
              <View style={styles.chatBubble}>
                <Text style={styles.bubbleText}>•••</Text>
              </View>
              <View style={styles.smallCircle} />
            </View>
          </View>

          <Text style={styles.title}>Tell us your name</Text>
          
          <View style={styles.inputContainer}>
            <TextInput
              value={username}
              onChangeText={setUsername}
              placeholder="Name"
              placeholderTextColor="#94a3b8"
              style={[
                styles.input,
                username.length > 0 && styles.inputActive
              ]}
              maxLength={20}
            />
            <View style={styles.progressDots}>
              <View style={[styles.dot, username.length >= 1 && styles.dotActive]} />
              <View style={[styles.dot, username.length >= 2 && styles.dotActive]} />
              <View style={[styles.dot, username.length >= 3 && styles.dotActive]} />
              <View style={[styles.dot, username.length >= 4 && styles.dotActive]} />
            </View>
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
            ]}>Next</Text>
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
  skipButton: {
    padding: 8,
  },
  skipText: {
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
  circle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  chatBubble: {
    position: 'absolute',
    top: 20,
    right: -30,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  bubbleText: {
    color: '#47cfc8',
    fontSize: 20,
    fontWeight: 'bold',
  },
  smallCircle: {
    position: 'absolute',
    bottom: 10,
    right: -10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#76cfbc',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
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
  progressDots: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  dotActive: {
    backgroundColor: '#fff',
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

export default MaleUsername;
