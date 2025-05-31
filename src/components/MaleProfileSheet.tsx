import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from 'react-native';

type RootStackParamList = {
  MaleProfile: undefined;
};

interface MaleProfileSheetProps {
  userAvatar?: string;
}

const MaleProfileSheet: React.FC<MaleProfileSheetProps> = ({ userAvatar }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('MaleProfile')}
      style={styles.triggerButton}
    >
      <LinearGradient
        colors={['#60a5fa', '#a855f7']}
        style={styles.avatarGradient}
      >
        <Text style={styles.avatarText}>
          {userAvatar || '👨'}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  triggerButton: {
    padding: 12,
    borderRadius: 20,
  },
  avatarGradient: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 18,
  },
});

export default MaleProfileSheet; 