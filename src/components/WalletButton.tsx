import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

type RootStackParamList = {
  WalletScreen: undefined;
};

type NavigationProp = {
  navigate: (screen: keyof RootStackParamList) => void;
};

const WalletButton = () => {
  const [balance] = useState(50.00);
  const navigation = useNavigation<NavigationProp>();

  const handleWalletClick = () => {
    navigation.navigate('WalletScreen');
  };

  return (
    <TouchableOpacity 
      onPress={handleWalletClick}
      style={styles.button}
    >
      <Text style={styles.balanceText}>₹{balance.toFixed(2)}</Text>
      <Ionicons name="add" size={16} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9999,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  balanceText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default WalletButton;
