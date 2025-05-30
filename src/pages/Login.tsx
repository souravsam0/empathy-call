import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Animated, SafeAreaView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const Login = () => {
  const navigation = useNavigation();
  const pulseAnim = new Animated.Value(1);

  React.useEffect(() => {
    const pulse = Animated.sequence([
      Animated.timing(pulseAnim, {
        toValue: 1.1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]);

    Animated.loop(pulse).start();
  }, []);

  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth integration
    console.log('Google login clicked');
    // For now, navigate to gender selection
    navigation.navigate('GenderSelection' as never);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fcfcfc" />
      <SafeAreaView style={styles.safeArea}>
        <LinearGradient
          colors={['#fcfcfc', '#f3f4f6']}
          style={styles.background}
        >
          <View style={styles.backgroundElements}>
            <Animated.View
              style={[
                styles.circle,
                styles.circle1,
                { transform: [{ scale: pulseAnim }] }
              ]}
            />
            <View style={[styles.circle, styles.circle2]} />
            <View style={[styles.circle, styles.circle3]} />
          </View>

          <View style={styles.card}>
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <Text style={styles.logoEmoji}>👂</Text>
              </View>
              <Text style={styles.title}>LSNR</Text>
              <Text style={styles.subtitle}>Listen & Connect</Text>
            </View>

            <View style={styles.content}>
              <View style={styles.welcomeContainer}>
                <Text style={styles.welcomeTitle}>Welcome Back</Text>
                <Text style={styles.welcomeSubtitle}>Sign in to start your journey</Text>
              </View>

              <TouchableOpacity
                onPress={handleGoogleLogin}
                style={styles.googleButton}
              >
                <View style={styles.googleButtonContent}>
                  <View style={styles.googleIcon}>
                    <Text style={styles.googleIconText}>G</Text>
                  </View>
                  <Text style={styles.googleButtonText}>Continue with Google</Text>
                </View>
              </TouchableOpacity>

              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>Secure & Fast</Text>
              </View>

              <Text style={styles.termsText}>
            By continuing, you agree to our{' '}
                <Text style={styles.termsLink}>Terms of Service</Text>{' '}
            and{' '}
                <Text style={styles.termsLink}>Privacy Policy</Text>
              </Text>
            </View>
          </View>
        </LinearGradient>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfcfc',
  },
  safeArea: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  backgroundElements: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  circle: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 1000,
  },
  circle1: {
    width: 320,
    height: 320,
    top: -160,
    right: -160,
  },
  circle2: {
    width: 320,
    height: 320,
    bottom: -160,
    left: -160,
  },
  circle3: {
    width: 240,
    height: 240,
    top: '50%',
    left: '50%',
    marginLeft: -120,
    marginTop: -120,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  logoContainer: {
    width: 96,
    height: 96,
    backgroundColor: '#47cfc8',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  logoEmoji: {
    fontSize: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#47cfc8',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
  },
  content: {
    gap: 24,
  },
  welcomeContainer: {
    alignItems: 'center',
    gap: 8,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  googleButton: {
    backgroundColor: '#47cfc8',
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  googleButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  googleIcon: {
    width: 24,
    height: 24,
    backgroundColor: 'white',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleIconText: {
    color: '#47cfc8',
    fontWeight: 'bold',
  },
  googleButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  dividerText: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    color: '#666',
    fontSize: 14,
  },
  termsText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 18,
  },
  termsLink: {
    color: '#47cfc8',
    fontWeight: '500',
  },
});

export default Login;
