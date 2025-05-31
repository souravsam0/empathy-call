// src/pages/AudioVerification.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  FemaleLanguageSetup: undefined;
  FemaleHome: undefined;
};

const AudioVerification = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);

  const handleStartRecording = () => {
    // TODO: Implement actual audio recording
    setIsRecording(true);
    setRecordingDuration(0);
    const interval = setInterval(() => {
      setRecordingDuration(prev => {
        if (prev >= 10) {
          clearInterval(interval);
          handleStopRecording();
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setHasRecorded(true);
  };

  const handlePlayback = () => {
    Alert.alert('Playing Recording', 'Your recorded audio is playing...');
  };

  const handleContinue = async () => {
    try {
      await AsyncStorage.setItem('@voice_verified', 'true');
      navigation.reset({
        index: 0,
        routes: [{ name: 'FemaleHome' }],
      });
    } catch (error) {
      console.error('Error saving voice verification:', error);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
          <Text style={styles.iconText}>👋</Text>
        </View>

        <Text style={styles.title}>Record your voice</Text>
        <Text style={styles.subtitle}>This helps us verify your identity</Text>

        <View style={styles.sampleTextCard}>
          <Text style={styles.sampleText}>
            "Hello, I'm excited to be part of this community. I'm looking forward to having meaningful conversations and making new connections."
          </Text>
        </View>

        <View style={styles.recordingContainer}>
          {isRecording ? (
            <View style={styles.recordingStatus}>
              <View style={styles.recordingIndicator} />
              <Text style={styles.recordingTime}>{formatTime(recordingDuration)}</Text>
            </View>
          ) : hasRecorded ? (
            <View style={styles.recordingComplete}>
              <TouchableOpacity 
                style={styles.playButton}
                onPress={handlePlayback}
              >
                <Ionicons name="play" size={24} color="#47cfc8" />
              </TouchableOpacity>
              <Text style={styles.recordingCompleteText}>Recording Complete</Text>
              <TouchableOpacity 
                style={styles.retryButton}
                onPress={handleStartRecording}
              >
                <Ionicons name="refresh" size={24} color="#47cfc8" />
              </TouchableOpacity>
            </View>
          ) : (
            <Text style={styles.recordingInstructions}>
              Tap the microphone to start recording
            </Text>
          )}
        </View>

        <TouchableOpacity
          style={[
            styles.recordButton,
            isRecording && styles.recordingActive
          ]}
          onPress={isRecording ? handleStopRecording : handleStartRecording}
        >
          <Ionicons
            name={isRecording ? "stop" : "mic"}
            size={32}
            color={isRecording ? "white" : "#47cfc8"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.continueButton,
            !hasRecorded && styles.continueButtonDisabled
          ]}
          onPress={handleContinue}
          disabled={!hasRecorded}
        >
          <Text style={[
            styles.continueText,
            !hasRecorded && styles.continueTextDisabled
          ]}>Continue</Text>
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
  sampleTextCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 40,
  },
  sampleText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  recordingContainer: {
    alignItems: 'center',
    marginBottom: 40,
    minHeight: 60,
  },
  recordingStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  recordingIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ef4444',
  },
  recordingTime: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
  },
  recordingComplete: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  retryButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordingCompleteText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '500',
  },
  recordingInstructions: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  recordButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  recordingActive: {
    backgroundColor: '#ef4444',
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
  continueButtonDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  continueText: {
    color: '#47cfc8',
    fontSize: 18,
    fontWeight: '600',
  },
  continueTextDisabled: {
    color: 'rgba(71, 207, 200, 0.5)',
  },
  iconText: {
    fontSize: 50,
  },
});

export default AudioVerification;