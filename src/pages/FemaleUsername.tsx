import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

type RootStackParamList = {
  Login: undefined;
  GenderSelection: undefined;
  FemaleUsername: undefined;
  FemaleHome: undefined;
};

const AVATARS = [
  '👩', '👩‍💼', '👩‍⚕️', '👩‍🎓', '👩‍🏫', '👩‍⚖️', 
  '👩‍🌾', '👩‍🍳', '👩‍🔧', '👩‍🏭', '👩‍💻', '👩‍🎨'
];

const FemaleUsername = () => {
  const [username, setUsername] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0]);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const isValid = username.length >= 3;

  const handleBack = () => {
    navigation.goBack();
  };

  const handleContinue = async () => {
    if (!isValid) return;
    try {
      await AsyncStorage.setItem('@user_profile', JSON.stringify({
        username,
        avatar: selectedAvatar,
        gender: 'female'
      }));
      navigation.navigate('FemaleHome');
    } catch (error) {
      console.error('Error saving profile:', error);
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
            <View style={styles.selectedAvatarContainer}>
              <View style={styles.selectedAvatar}>
                <Text style={styles.selectedAvatarText}>{selectedAvatar}</Text>
              </View>
              <View style={styles.chatBubble}>
                <Text style={styles.bubbleText}>•••</Text>
              </View>
            </View>
          </View>

          <Text style={styles.title}>Choose your avatar</Text>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.avatarList}
          >
            {AVATARS.map((avatar, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedAvatar(avatar)}
                style={[
                  styles.avatarOption,
                  selectedAvatar === avatar && styles.avatarOptionSelected
                ]}
              >
                <Text style={styles.avatarOptionText}>{avatar}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={[styles.title, { marginTop: 32 }]}>Tell us your name</Text>
          
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
  selectedAvatarContainer: {
    position: 'relative',
  },
  selectedAvatar: {
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
  selectedAvatarText: {
    fontSize: 48,
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 24,
    textAlign: 'center',
  },
  avatarList: {
    paddingHorizontal: 20,
    gap: 16,
    flexDirection: 'row',
  },
  avatarOption: {
    width: 56,
    height: 56,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  avatarOptionSelected: {
    backgroundColor: '#fff',
    borderColor: '#47cfc8',
  },
  avatarOptionText: {
    fontSize: 24,
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

export default FemaleUsername; 