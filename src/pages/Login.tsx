import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const Login = () => {
  const navigation = useNavigation();
  const swiperRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth integration
    navigation.navigate('GenderSelection' as never);
  };

  // Custom pagination dots
  const Pagination = () => (
    <View style={styles.paginationContainer}>
      <View style={[styles.dotIndicator, currentIndex === 0 && styles.dotActive]} />
      <View style={[styles.dotIndicator, currentIndex === 1 && styles.dotActive]} />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fcfcfc" />
      <LinearGradient colors={['#fcfcfc', '#f3f4f6']} style={styles.background}>
        <View style={styles.fullScreenContent}>
          <View style={styles.swiperContainer}>
            <Swiper
              ref={swiperRef}
              loop={false}
              autoplay={true}
              autoplayTimeout={3.5}
              showsPagination={false}
              onIndexChanged={setCurrentIndex}
              height={500}
            >
              {/* Slide 1: Anonymous Onboarding */}
              <View style={styles.slideContent}>
                <View style={styles.iconContainer}>
                  <View style={styles.bubble}>
                    <View style={[styles.dot, { left: 38, backgroundColor: '#fbbf24' }]} />
                    <View style={[styles.dot, { right: 38, backgroundColor: '#a78bfa' }]} />
                  </View>
                  <View style={styles.hatBrim} />
                  <View style={styles.hatTop} />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.title}>
                    Always stay{"\n"}anonymous
                  </Text>
                  <Text style={styles.subtitle}>Talk freely without sharing your identity</Text>
                </View>
              </View>
              {/* Slide 2: Infographic and CTA */}
              <View style={[styles.slideContent, { justifyContent: 'flex-start' }]}>
                <View style={styles.infographicContainer}>
                  <View style={styles.infographicRow}>
                    <View style={styles.infographicPerson}>
                      <View style={[styles.infographicAvatar, { backgroundColor: '#60a5fa' }]}> 
                        <Text style={{ fontSize: 40 }}>👨</Text>
                      </View>
                      <View style={[styles.infographicSpeech, styles.infographicSpeechBoy]}>
                        <Text style={{ color: '#1f2937', fontWeight: 'bold', fontSize: 16 }}>Hi there!</Text>
                      </View>
                    </View>
                    <View style={styles.infographicPerson}>
                      <View style={[styles.infographicAvatar, { backgroundColor: '#f472b6' }]}> 
                        <Text style={{ fontSize: 40 }}>👩</Text>
                      </View>
                      <View style={[styles.infographicSpeech, styles.infographicSpeechGirl]}>
                        <Text style={{ color: '#1f2937', fontWeight: 'bold', fontSize: 16 }}>Hello! 👋</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.title}>
                    Talk to anyone,{"\n"}freely
                  </Text>
                  <Text style={styles.subtitle}>Connect with people who understand you</Text>
                </View>
              </View>
            </Swiper>
          </View>
          <Pagination />
          {/* Log In button always visible */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.loginButton} onPress={handleGoogleLogin} activeOpacity={0.8}>
              <FontAwesome name="google" size={20} color="#fff" style={{ marginRight: 15 }} />
              <Text style={styles.loginButtonText}>Continue with Google</Text>
            </TouchableOpacity>
          </View>
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
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  fullScreenContent: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 0,
    paddingBottom: 0,
  },
  swiperContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 0,
    paddingBottom: 0,
  },
  slideContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 8,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 48,
    marginTop: 8,
  },
  bubble: {
    width: 180,
    height: 180,
    backgroundColor: '#4b2676',
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  dot: {
    position: 'absolute',
    top: 70,
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  hatBrim: {
    position: 'absolute',
    top: 32,
    left: 0,
    width: 180,
    height: 12,
    backgroundColor: '#222',
    borderRadius: 6,
    zIndex: 2,
  },
  hatTop: {
    position: 'absolute',
    top: 0,
    left: 30,
    width: 120,
    height: 48,
    backgroundColor: '#222',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    borderWidth: 4,
    borderColor: '#fff',
    zIndex: 3,
  },
  textContainer: {
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 32,
  },
  title: {
    color: '#1f2937',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    lineHeight: 34,
  },
  subtitle: {
    color: '#6b7280',
    fontSize: 16,
    marginBottom: 8,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
    gap: 8,
  },
  dotIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#a78bfa',
    marginHorizontal: 4,
    opacity: 0.5,
  },
  dotActive: {
    backgroundColor: '#47cfc8',
    opacity: 1,
  },
  loginButton: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#47cfc8',
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
    marginTop: 0,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  infographicContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  infographicRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    minHeight: 180,
  },
  infographicPerson: {
    alignItems: 'center',
    width: '45%',
  },
  infographicAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  infographicSpeech: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderWidth: 2,
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    minWidth: 80,
    alignItems: 'center',
  },
  infographicSpeechBoy: {
    borderColor: '#47cfc8',
    backgroundColor: 'rgba(71, 207, 200, 0.1)',
  },
  infographicSpeechGirl: {
    borderColor: '#a78bfa',
    backgroundColor: 'rgba(167, 139, 250, 0.1)',
  },
});

export default Login;
