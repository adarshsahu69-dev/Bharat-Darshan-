import { create } from 'zustand';
import {
  arrayUnion,
  arrayRemove,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import type { Trip, TripItem } from '@bharat-darshan/types';
import { db } from '../firebase/config';
import { useAuthStore } from './useAuthStore';

interface TripsState {
  trips: Trip[];
  load: () => Promise<void>;
  createTrip: (title: string, description?: string) => Promise<string>;
  loadTrip: (tripId: string) => Promise<Trip | null>;
  addItem: (tripId: string, item: TripItem) => Promise<void>;
  removeItem: (tripId: string, placeId: string) => Promise<void>;
  updateTrip: (tripId: string, data: Partial<Trip>) => Promise<void>;
}

export const useTripsStore = create<TripsState>((set, get) => ({
  trips: [],
  load: async () => {
    const uid = useAuthStore.getState().user?.uid;
    if (!uid) return set({ trips: [] });
    const snap = await getDocs(collection(db, `users/${uid}/trips`));
    set({ trips: snap.docs.map((d) => d.data() as Trip) });
  },
  createTrip: async (title, description) => {
    const uid = useAuthStore.getState().user?.uid;
    if (!uid) throw new Error('auth-required');
    const ref = doc(collection(db, `users/${uid}/trips`));
    const now = new Date().toISOString();
    const trip: Trip = {
      id: ref.id,
      title,
      description,
      status: 'planning',
      items: [],
      createdAt: now,
      updatedAt: now,
    };
    await setDoc(ref, trip);
    set((s) => ({ trips: [...s.trips, trip] }));
    return ref.id;
  },
  loadTrip: async (tripId) => {
    const uid = useAuthStore.getState().user?.uid;
    if (!uid) return null;
    const snap = await getDoc(doc(db, `users/${uid}/trips/${tripId}`));
    return snap.exists() ? (snap.data() as Trip) : null;
  },
  addItem: async (tripId, item) => {
    const uid = useAuthStore.getState().user?.uid;
    if (!uid) throw new Error('auth-required');
    const ordered: TripItem = { ...item, order: get().trips.find((t) => t.id === tripId)?.items.length ?? 0 };
    await updateDoc(doc(db, `users/${uid}/trips/${tripId}`), { items: arrayUnion(ordered) });
  },
  removeItem: async (tripId, placeId) => {
    const uid = useAuthStore.getState().user?.uid;
    if (!uid) throw new Error('auth-required');
    const trip = await get().loadTrip(tripId);
    const items = (trip?.items ?? []).filter((i) => i.placeId !== placeId);
    await updateDoc(doc(db, `users/${uid}/trips/${tripId}`), { items });
  },
  updateTrip: async (tripId, data) => {
    const uid = useAuthStore.getState().user?.uid;
    if (!uid) throw new Error('auth-required');
    await updateDoc(doc(db, `users/${uid}/trips/${tripId}`), data);
  },
}));
