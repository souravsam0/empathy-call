import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Index = () => {
  const navigation = useNavigation();

  React.useEffect(() => {
    // Redirect to login page on app start
    navigation.navigate('Login' as never);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>LSNR</Text>
        <Text style={styles.subtitle}>Loading...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfcfc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#47cfc8',
    marginBottom: 16,
  },
  subtitle: {
    color: '#666',
  },
});

export default Index;
