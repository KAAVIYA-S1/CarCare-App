import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './services/AuthContext';
import { AppProvider } from './services/AppContext';
import { CartProvider } from './services/CartContext';
import AuthStack from './navigation/AuthStack';
import MainStack from './navigation/MainStack';
import { useAuth } from './services/AuthContext';
import { View, ActivityIndicator } from 'react-native';

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const { isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return user ? <MainStack /> : <AuthStack />;
}

function ThemeWrapper(){
  const { darkMode } = require('./services/AppContext').useApp();
  return (
    <NavigationContainer theme={darkMode? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <CartProvider>
          <ThemeWrapper />
        </CartProvider>
      </AppProvider>
    </AuthProvider>
  );
}
