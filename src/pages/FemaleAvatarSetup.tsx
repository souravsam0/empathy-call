import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, TextInput } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  Login: undefined;
  GenderSelection: undefined;
  FemaleNameSetup: undefined;
  FemaleAvatarSetup: undefined;
  AudioVerification: undefined;
  FemaleLanguageSetup: undefined;
};

const AVATARS = [
  '👩', '👩‍💼', '👩‍⚕️', '👩‍🎓', '👩‍🏫', '👩‍⚖️', 
  '👩‍🌾', '👩‍🍳', '👩‍🔧', '👩‍🏭', '👩‍💻', '👩‍🎨'
];

const FemaleAvatarSetup = () => {
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0]);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleContinue = async () => {
    try {
      await AsyncStorage.setItem('@user_avatar', selectedAvatar);
      navigation.navigate('FemaleLanguageSetup');
    } catch (error) {
      console.error('Error saving avatar:', error);
    }
  };

  return (
    <LinearGradient 
      colors={['#47cfc8', '#47cfc8']} 
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor="#47cfc8" />
      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={styles.iconText}>{selectedAvatar}</Text>
        </View>

        <Text style={styles.title}>Choose your avatar</Text>
        <Text style={styles.subtitle}>This is how others will see you</Text>

        <View style={styles.inputContainer}>
          <View style={styles.avatarGrid}>
            {AVATARS.map((avatar, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedAvatar(avatar)}
                style={[
                  styles.avatarOption,
                  selectedAvatar === avatar && styles.selectedAvatar
                ]}
              >
                <Text style={styles.avatarText}>{avatar}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#47cfc8',
  },
  backButton: {
    padding: 20,
  },
  backText: {
    color: 'white',
    fontSize: 18,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  iconContainer: {
    width: 120,
    height: 120,
    backgroundColor: 'white',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  iconText: {
    fontSize: 50,
  },
  title: {
    fontSize: 32,
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 40,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 15,
  },
  avatarOption: {
    width: 60,
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  selectedAvatar: {
    backgroundColor: 'white',
  },
  avatarText: {
    fontSize: 30,
  },
  continueButton: {
    width: '100%',
    height: 60,
    backgroundColor: 'white',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 20,
  },
  continueText: {
    color: '#47cfc8',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default FemaleAvatarSetup; 