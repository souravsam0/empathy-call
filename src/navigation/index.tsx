// src/navigation/index.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import Login from '../pages/Login';
import MaleHome from '../pages/MaleHome';
import FemaleHome from '../pages/FemaleHome';
import GenderSelection from '../pages/GenderSelection';
import MaleUsername from '../pages/MaleUsername';
import FemaleProfileSetup from '../pages/FemaleProfileSetup';
import WalletScreen from '../pages/WalletScreen';
import AudioVerification from '../pages/AudioVerification';
import NotFound from '../pages/NotFound';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }} // Optional: hide header
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="GenderSelection" component={GenderSelection} />
        <Stack.Screen name="MaleUsername" component={MaleUsername} />
        <Stack.Screen name="FemaleProfileSetup" component={FemaleProfileSetup} />
        <Stack.Screen name="WalletScreen" component={WalletScreen} />
        <Stack.Screen name="AudioVerification" component={AudioVerification} />
        <Stack.Screen name="MaleHome" component={MaleHome} />
        <Stack.Screen name="FemaleHome" component={FemaleHome} />
        <Stack.Screen name="NotFound" component={NotFound} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
