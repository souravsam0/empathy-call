import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import GenderSelection from "./pages/GenderSelection";
import MaleUsername from "./pages/MaleUsername";
import FemaleProfileSetup from "./pages/FemaleProfileSetup";
import AudioVerification from "./pages/AudioVerification";
import MaleHome from "./pages/MaleHome";
import FemaleHome from "./pages/FemaleHome";
import WalletScreen from "./pages/WalletScreen";
import Call from "./pages/Call";

const Stack = createNativeStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Index" component={Index} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="GenderSelection" component={GenderSelection} />
      <Stack.Screen name="MaleUsername" component={MaleUsername} />
      <Stack.Screen name="FemaleProfileSetup" component={FemaleProfileSetup} />
      <Stack.Screen name="AudioVerification" component={AudioVerification} />
      <Stack.Screen name="MaleHome" component={MaleHome} />
      <Stack.Screen name="FemaleHome" component={FemaleHome} />
      <Stack.Screen name="WalletScreen" component={WalletScreen} />
      <Stack.Screen name="Call" component={Call} />
      <Stack.Screen name="NotFound" component={NotFound} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
