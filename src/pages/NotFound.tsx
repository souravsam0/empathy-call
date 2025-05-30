import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NotFound = () => {
  const navigation = useNavigation();

  React.useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route');
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>404</Text>
        <Text style={styles.subtitle}>Oops! Page not found</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Index' as never)}
          style={styles.link}
        >
          <Text style={styles.linkText}>Return to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 20,
    color: '#4b5563',
    marginBottom: 16,
  },
  link: {
    padding: 8,
  },
  linkText: {
    color: '#3b82f6',
    textDecorationLine: 'underline',
  },
});

export default NotFound;
