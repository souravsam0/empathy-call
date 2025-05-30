// src/pages/AudioVerification.tsx
import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const AudioVerification = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [recordingUri, setRecordingUri] = useState<string | null>(null);
  const navigation = useNavigation();
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = async () => {
    try {
      // Request permissions
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Audio recording permission is required');
        return;
      }

      // Configure audio mode
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      // Start recording
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(recording);
      setIsRecording(true);

      // Auto-stop after 30 seconds
      recordingTimerRef.current = setTimeout(() => {
        stopRecording();
      }, 30000);
    } catch (error) {
      console.error('Error starting recording:', error);
      Alert.alert('Error', 'Failed to start recording');
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    try {
      // Clear the timer
      if (recordingTimerRef.current) {
        clearTimeout(recordingTimerRef.current);
      }

      setIsRecording(false);
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      
      if (uri) {
        setRecordingUri(uri);
      setHasRecording(true);
      }
      
      setRecording(null);

      // Reset audio mode
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });
    } catch (error) {
      console.error('Error stopping recording:', error);
    }
  };

  const playRecording = async () => {
    if (!recordingUri) return;

    try {
    setIsPlaying(true);

      // Create a new sound object
      const { sound } = await Audio.Sound.createAsync(
        { uri: recordingUri },
        { shouldPlay: true }
      );
      
      setSound(sound);

      // Set up playback status update
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
        setIsPlaying(false);
      }
    });
    } catch (error) {
      console.error('Error playing recording:', error);
      setIsPlaying(false);
    }
  };

  const resetRecording = async () => {
    // Unload sound if it exists
    if (sound) {
      await sound.unloadAsync();
      setSound(null);
    }
    
    setHasRecording(false);
    setIsPlaying(false);
    setRecordingUri(null);
  };

  const submitVerification = () => {
    // TODO: Submit audio for verification
    console.log('Audio submitted for verification');
    // Navigate to female home screen
    navigation.navigate('FemaleHome' as never);
  };

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
      if (recording) {
        recording.stopAndUnloadAsync();
      }
      if (recordingTimerRef.current) {
        clearTimeout(recordingTimerRef.current);
      }
    };
  }, [sound, recording]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>Voice Verification</Text>
            <Text style={styles.description}>
          Record a short voice message to verify your identity and help build trust with users
        </Text>
          </View>

          <View style={styles.cardContent}>
            <View style={styles.instructionBox}>
              <Text style={styles.instructionText}>
            Please say: "Hi, I'm here to listen and support you. You can trust me to be a caring and empathetic listener."
          </Text>
        </View>

            <View style={styles.controlsContainer}>
          {!hasRecording && (
            <TouchableOpacity
                  onPress={isRecording ? stopRecording : startRecording}
                  style={[
                    styles.recordButton,
                    isRecording ? styles.stopButton : styles.startButton
                  ]}
                  activeOpacity={0.8}
                >
                  <Ionicons 
                    name={isRecording ? "stop" : "mic"} 
                    size={32} 
                    color="white" 
                  />
            </TouchableOpacity>
          )}

              {isRecording && (
                <View style={styles.recordingStatus}>
                  <Text style={styles.recordingText}>Recording...</Text>
                  <Text style={styles.recordingSubtext}>Tap to stop (max 30 seconds)</Text>
            </View>
          )}

          {hasRecording && (
                <View style={styles.playbackControls}>
              <TouchableOpacity
                onPress={playRecording}
                disabled={isPlaying}
                    style={[styles.button, styles.playButton]}
              >
                    <Ionicons name="play" size={20} color="white" style={styles.buttonIcon} />
                    <Text style={styles.buttonText}>
                      {isPlaying ? 'Playing...' : 'Play'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                    onPress={resetRecording}
                    style={[styles.button, styles.resetButton]}
                  >
                    <Text style={styles.resetButtonText}>Re-record</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {hasRecording && (
          <TouchableOpacity
            onPress={submitVerification}
                style={styles.submitButton}
          >
                <Text style={styles.submitButtonText}>Submit for Verification</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfcfc',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    minHeight: '100%',
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#47cfc8',
    marginBottom: 8,
  },
  description: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 16,
  },
  cardContent: {
    gap: 24,
  },
  instructionBox: {
    backgroundColor: 'rgba(214, 207, 166, 0.2)',
    padding: 16,
    borderRadius: 8,
  },
  instructionText: {
    fontSize: 14,
    color: '#374151',
  },
  controlsContainer: {
    alignItems: 'center',
    gap: 16,
  },
  recordButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#47cfc8',
  },
  stopButton: {
    backgroundColor: '#ef4444',
  },
  recordingStatus: {
    alignItems: 'center',
    marginTop: 16,
  },
  recordingText: {
    color: '#ef4444',
    fontWeight: '600',
  },
  recordingSubtext: {
    fontSize: 14,
    color: '#666',
  },
  playbackControls: {
    flexDirection: 'row',
    gap: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  playButton: {
    backgroundColor: '#76cfbc',
  },
  resetButton: {
    borderWidth: 1,
    borderColor: '#9ca3af',
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: 'white',
  },
  resetButtonText: {
    color: '#374151',
  },
  submitButton: {
    backgroundColor: '#47cfc8',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default AudioVerification;