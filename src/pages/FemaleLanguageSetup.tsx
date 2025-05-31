import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  FemaleAvatarSetup: undefined;
  AudioVerification: undefined;
};

type Language = {
  code: string;
  name: string;
  nativeName: string;
};

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' }
];

const FemaleLanguageSetup = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');

  const handleContinue = async () => {
    try {
      await AsyncStorage.setItem('@user_language', selectedLanguage);
      navigation.navigate('AudioVerification');
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  return (
    <LinearGradient 
      colors={['#47cfc8', '#47cfc8']} 
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor="#47cfc8" />
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={styles.iconText}>🌍</Text>
        </View>

        <Text style={styles.title}>Choose your language</Text>
        <Text style={styles.subtitle}>This is how you'll communicate</Text>

        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {languages.map((language) => (
            <TouchableOpacity
              key={language.code}
              style={[
                styles.languageOption,
                selectedLanguage === language.code && styles.selectedLanguage
              ]}
              onPress={() => setSelectedLanguage(language.code)}
            >
              <View>
                <Text style={[
                  styles.languageName,
                  selectedLanguage === language.code && styles.selectedText
                ]}>
                  {language.name}
                </Text>
                <Text style={[
                  styles.nativeName,
                  selectedLanguage === language.code && styles.selectedText
                ]}>
                  {language.nativeName}
                </Text>
              </View>
              {selectedLanguage === language.code && (
                <Ionicons name="checkmark-circle" size={24} color="#47cfc8" />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>

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
  scrollView: {
    width: '100%',
    marginBottom: 20,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  languageOption: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedLanguage: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  languageName: {
    fontSize: 18,
    color: '#333',
    marginBottom: 4,
  },
  nativeName: {
    fontSize: 16,
    color: '#666',
  },
  selectedText: {
    color: '#47cfc8',
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

export default FemaleLanguageSetup; 