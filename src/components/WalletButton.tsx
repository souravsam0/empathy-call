import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
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
      <Ionicons name="wallet-outline" size={16} color="white" />
      <Text style={styles.balanceText}>₹{balance.toFixed(2)}</Text>
      <View style={styles.addContainer}>
        <Ionicons name="add-circle" size={18} color="white" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#8b5cf6',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  balanceText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  addContainer: {
    marginLeft: 2,
  },
});

export default WalletButton;
