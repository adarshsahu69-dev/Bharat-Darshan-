import type { NavigationProp } from '@react-navigation/native';

export type MainTabParamList = {
  Home: undefined;
  Explore: undefined;
  Itinerary: undefined;
  Bookings: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Signup: undefined;
  Main: undefined;
  Destination: { placeId: string };
  Itinerary: { tripId?: string };
  Booking: { placeId: string };
  ActiveTrip: undefined;
};

export type RootNavigationProp = NavigationProp<RootStackParamList>;
export type TabNavigationProp = NavigationProp<MainTabParamList>;
