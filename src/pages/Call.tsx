import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  Call: {
    listenerId: number;
    listenerName: string;
  };
};

type CallScreenRouteProp = RouteProp<RootStackParamList, 'Call'>;

const Call = () => {
  const route = useRoute<CallScreenRouteProp>();
  const { listenerId, listenerName } = route.params;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#47cfc8" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <Text style={styles.title}>Call with {listenerName}</Text>
          <Text style={styles.subtitle}>Call ID: {listenerId}</Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
});

export default Call; 