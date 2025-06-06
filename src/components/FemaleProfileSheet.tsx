import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from 'react-native';

type RootStackParamList = {
  FemaleProfile: undefined;
};

interface FemaleProfileSheetProps {
  userAvatar?: string;
}

const FemaleProfileSheet: React.FC<FemaleProfileSheetProps> = ({ userAvatar }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('FemaleProfile')}
      style={styles.triggerButton}
    >
      <LinearGradient
        colors={['#ec4899', '#a855f7']}
        style={styles.avatarGradient}
      >
        <Text style={styles.avatarText}>
          {userAvatar || '👩'}
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

export default FemaleProfileSheet;
