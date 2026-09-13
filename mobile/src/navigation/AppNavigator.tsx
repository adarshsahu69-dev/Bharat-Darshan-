import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import MainTabs from './MainTabs';
import DestinationScreen from '../screens/DestinationScreen';
import ItineraryScreen from '../screens/ItineraryScreen';
import BookingScreen from '../screens/BookingScreen';
import ActiveTripScreen from '../screens/ActiveTripScreen';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: '#ffffff' },
      }}
      initialRouteName="Onboarding"
    >
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Main" component={MainTabs} />
      <Stack.Screen name="Destination" component={DestinationScreen} />
      <Stack.Screen name="Itinerary" component={ItineraryScreen} />
      <Stack.Screen name="Booking" component={BookingScreen} />
      <Stack.Screen name="ActiveTrip" component={ActiveTripScreen} />
    </Stack.Navigator>
  );
}
