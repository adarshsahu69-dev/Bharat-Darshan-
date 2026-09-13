export interface PlacePreview {
  id: string;
  name: string;
  image: string;
  city: string;
  rating: number;
  reviewCount: number;
}

export interface TripPreview {
  id: string;
  name: string;
  image: string;
  location: string;
  price: string;
  duration: string;
}

export interface BookingPreview {
  id: string;
  name: string;
  image: string;
  from: string;
  to: string;
  status: 'upcoming' | 'past';
}
