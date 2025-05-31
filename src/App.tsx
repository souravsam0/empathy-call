import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import GenderSelection from "./pages/GenderSelection";
import MaleUsername from "./pages/MaleUsername";
import FemaleNameSetup from "./pages/FemaleNameSetup";
import FemaleAvatarSetup from "./pages/FemaleAvatarSetup";
import FemaleLanguageSetup from "./pages/FemaleLanguageSetup";
import AudioVerification from "./pages/AudioVerification";
import MaleHome from "./pages/MaleHome";
import FemaleHome from "./pages/FemaleHome";
import FemaleProfile from "./pages/FemaleProfile";
import MaleProfile from "./pages/MaleProfile";
import WalletScreen from "./pages/WalletScreen";
import Call from "./pages/Call";
import WithdrawScreen from "./pages/WithdrawScreen";
import WithdrawSuccessScreen from "./pages/WithdrawSuccessScreen";
import PaymentDetailsScreen from "./pages/PaymentDetailsScreen";
import AddPaymentMethodScreen from "./pages/AddPaymentMethodScreen";
import PaymentHistoryScreen from "./pages/PaymentHistoryScreen";
import CallHistoryScreen from "./pages/CallHistoryScreen";
import TransactionsScreen from "./pages/TransactionsScreen";
import SettingsScreen from "./pages/SettingsScreen";
import EditProfile from "./pages/EditProfile";

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
      <Stack.Screen name="FemaleNameSetup" component={FemaleNameSetup} />
      <Stack.Screen name="FemaleAvatarSetup" component={FemaleAvatarSetup} />
      <Stack.Screen name="FemaleLanguageSetup" component={FemaleLanguageSetup} />
      <Stack.Screen name="AudioVerification" component={AudioVerification} />
      <Stack.Screen name="FemaleHome" component={FemaleHome} />
      <Stack.Screen name="MaleHome" component={MaleHome} />
      <Stack.Screen name="FemaleProfile" component={FemaleProfile} />
      <Stack.Screen name="MaleProfile" component={MaleProfile} />
      <Stack.Screen name="WalletScreen" component={WalletScreen} />
      <Stack.Screen name="Call" component={Call} />
      <Stack.Screen name="Withdraw" component={WithdrawScreen} />
      <Stack.Screen name="WithdrawSuccess" component={WithdrawSuccessScreen} />
      <Stack.Screen name="PaymentDetails" component={PaymentDetailsScreen} />
      <Stack.Screen name="AddPaymentMethod" component={AddPaymentMethodScreen} />
      <Stack.Screen name="PaymentHistory" component={PaymentHistoryScreen} />
      <Stack.Screen name="Transactions" component={TransactionsScreen} />
      <Stack.Screen name="CallHistory" component={CallHistoryScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="NotFound" component={NotFound} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
