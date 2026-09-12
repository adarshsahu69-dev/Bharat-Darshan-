export type UserRole = 'user' | 'admin';

export interface AppUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: UserRole;
  createdAt: string;
  updatedAt?: string;
  favoriteCityId?: string | null;
  language?: string;
}

export type PlaceStatus = 'draft' | 'pending' | 'published';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface OpeningHours {
  open: string;
  close: string;
}

export interface Place {
  id: string;
  name: string;
  slug: string;
  description: string;
  cityId: string;
  categoryId: string;
  status: PlaceStatus;
  coordinates: Coordinates;
  address: string;
  phone?: string;
  website?: string;
  hours?: Record<string, OpeningHours>;
  images: string[];
  tags: string[];
  rating: number;
  reviewCount: number;
  priceTier?: 1 | 2 | 3 | 4;
  createdAt: string;
  updatedAt: string;
  isFeatured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  order: number;
}

export interface City {
  id: string;
  name: string;
  slug: string;
  state: string;
  coordinates: Coordinates;
  coverImage: string;
}

export interface Review {
  id: string;
  placeId: string;
  authorId: string;
  authorName?: string;
  rating: number;
  text: string;
  photos: string[];
  status: 'pending' | 'approved';
  createdAt: string;
  updatedAt: string;
}

export interface Favorite {
  placeId: string;
  addedAt: string;
}

export type TripStatus = 'planning' | 'in_progress' | 'completed';

export interface TripItem {
  placeId: string;
  name: string;
  coordinates: Coordinates;
  order: number;
  plannedAt?: string;
}

export interface Trip {
  id: string;
  title: string;
  description?: string;
  status: TripStatus;
  items: TripItem[];
  startDate?: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}

export type ContributionType = 'edit_place' | 'add_place' | 'add_photo' | 'add_review';

export interface Contribution {
  id: string;
  type: ContributionType;
  entityId: string;
  authorId: string;
  status: 'pending' | 'approved' | 'rejected';
  changes: Record<string, unknown>;
  createdAt: string;
  resolvedAt?: string;
}

export type NotificationType = 'review' | 'contribution' | 'system';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  data?: Record<string, unknown>;
  read: boolean;
  createdAt: string;
}

export type RootStackParamList = {
  Loading: undefined;
  Onboarding: undefined;
  Language: undefined;
  Login: undefined;
  Signup: undefined;
  Main: undefined;
  Map: { placeId?: string };
  PlaceDetail: { placeId: string };
  Reviews: { placeId: string };
  AddReview: { placeId: string };
  Contribute: { placeId?: string };
  Favorites: undefined;
  TripDetail: { tripId: string };
  Notifications: undefined;
  Profile: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Explore: undefined;
  Map: undefined;
  Favorites: undefined;
  Trips: undefined;
  Profile: undefined;
  Settings: undefined;
};

export const SUPPORTED_LOCALES = ['en', 'hi'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];
