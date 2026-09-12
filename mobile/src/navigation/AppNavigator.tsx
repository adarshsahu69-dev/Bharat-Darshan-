import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from '../store/useAuthStore';
import OnboardingScreen from '../screens/OnboardingScreen';
import LanguageScreen from '../screens/LanguageScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import MainTabs from './MainTabs';
import LoadingScreen from '../components/LoadingScreen';
import PlaceDetailScreen from '../screens/PlaceDetailScreen';
import ReviewsScreen from '../screens/ReviewsScreen';
import AddReviewScreen from '../screens/AddReviewScreen';
import ContributeScreen from '../screens/ContributeScreen';
import TripDetailScreen from '../screens/TripDetailScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const user = useAuthStore((s) => s.user);
  const isOnboarded = useAuthStore((s) => s.isOnboarded);
  const hasBootstrap = useAuthStore((s) => s.hasBootstrap);

  if (!hasBootstrap) {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: 'fade' }}
      initialRouteName={!isOnboarded ? 'Onboarding' : user ? 'Main' : 'Login'}
    >
      {!isOnboarded && (
        <>
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Language" component={LanguageScreen} />
        </>
      )}
      {isOnboarded && !user && (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </>
      )}
      {isOnboarded && user && <Stack.Screen name="Main" component={MainTabs} />}
      {isOnboarded && user && (
        <>
          <Stack.Screen name="PlaceDetail" component={PlaceDetailScreen} />
          <Stack.Screen name="Reviews" component={ReviewsScreen} />
          <Stack.Screen name="AddReview" component={AddReviewScreen} />
          <Stack.Screen name="Contribute" component={ContributeScreen} />
          <Stack.Screen name="TripDetail" component={TripDetailScreen} />
          <Stack.Screen name="Notifications" component={NotificationsScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
