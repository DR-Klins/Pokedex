import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen/DetailsScreen';

// Route params for stack navigation
export type RootStackParamList = {
  Home: undefined;
  Details: {
    name: string;
    types: string[];
    stats: { name: string; base_stat: number }[];
    image: string;
  };
};

// Create a typed native stack navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

// AppNavigator sets up and configures the navigation stack
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Details" 
          component={DetailsScreen} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
