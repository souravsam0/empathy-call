import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  Login: undefined;
  GenderSelection: undefined;
  MaleUsername: undefined;
  FemaleNameSetup: undefined;
  FemaleAvatarSetup: undefined;
  MaleHome: undefined;
  FemaleHome: undefined;
  AudioVerification: undefined;
  WalletScreen: undefined;
  Call: undefined;
  NotFound: undefined;
};

const GenderSelection = () => {
  const [selectedGender, setSelectedGender] = useState('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const pulseAnim = new Animated.Value(1);

  React.useEffect(() => {
    if (selectedGender) {
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [selectedGender]);

  const handleGenderSelect = (gender: string) => {
    setSelectedGender(gender);
  };

  const handleProceed = async () => {
    if (selectedGender) {
      try {
        await AsyncStorage.setItem('userGender', selectedGender);
        if (selectedGender === 'male') {
          navigation.navigate('MaleUsername');
        } else {
          navigation.navigate('FemaleNameSetup');
        }
      } catch (error) {
        console.error('Error saving gender:', error);
      }
    }
  };

  return (
    <LinearGradient
      colors={['#fcfcfc', 'rgba(214, 207, 166, 0.2)']}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Your</Text>
          <Text style={styles.headerSubtitle}>Gender</Text>
        </View>

        <View style={styles.optionsContainer}>
          {/* Male Option */}
          <Animated.View
            style={[
              styles.optionWrapper,
              selectedGender === 'male' && { transform: [{ scale: pulseAnim }] }
            ]}
          >
            <TouchableOpacity
              onPress={() => handleGenderSelect('male')}
              style={[
                styles.optionCard,
                selectedGender === 'male' && styles.selectedCard
              ]}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#60a5fa', '#a855f7']}
                style={styles.avatarContainer}
              >
                <Text style={styles.avatarEmoji}>👨‍💻</Text>
              </LinearGradient>
              <Text style={styles.optionTitle}>Male</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Female Option */}
          <Animated.View
            style={[
              styles.optionWrapper,
              selectedGender === 'female' && { transform: [{ scale: pulseAnim }] }
            ]}
          >
            <TouchableOpacity
              onPress={() => handleGenderSelect('female')}
              style={[
                styles.optionCard,
                selectedGender === 'female' && styles.selectedCard
              ]}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#f472b6', '#ec4899']}
                style={styles.avatarContainer}
              >
                <Text style={styles.avatarEmoji}>👩‍💻</Text>
              </LinearGradient>
              <Text style={styles.optionTitle}>Female</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

        <TouchableOpacity
          onPress={handleProceed}
          disabled={!selectedGender}
          style={[
            styles.continueButton,
            !selectedGender && styles.continueButtonDisabled
          ]}
        >
          <LinearGradient
            colors={selectedGender ? ['#47cfc8', '#76cfbc'] : ['#e5e7eb', '#e5e7eb']}
            style={styles.buttonGradient}
          >
            <Text style={[
              styles.buttonText,
              !selectedGender && styles.buttonTextDisabled
            ]}>
              {selectedGender ? 'Continue' : 'Select Gender'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  headerSubtitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#47cfc8',
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 48,
  },
  optionWrapper: {
    width: 160,
  },
  optionCard: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: '#47cfc8',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarEmoji: {
    fontSize: 32,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  continueButton: {
    height: 56,
    width: '100%',
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
});

export default GenderSelection;
