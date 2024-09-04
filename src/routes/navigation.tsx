// In App.js in a new project

import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Colors } from 'react-native-ui-lib';
import CallScreen from '../screens/CallScreen';
import CallingScreen from '../screens/CallingScreen';
import HomeScreen from '../screens/HomeScreen';
import IncomingCall from '../screens/IncammingCall';
import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();

function AppRoutes() {
  
  return (
    <GestureHandlerRootView>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false,
        statusBarColor : Colors.green10
      }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Calling" component={CallingScreen} />
        <Stack.Screen name="IncomingCall" component={IncomingCall} />
        <Stack.Screen name="Call" component={CallScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default AppRoutes;