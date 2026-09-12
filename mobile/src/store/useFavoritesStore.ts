import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, setDoc, deleteDoc, getDocs, collection } from 'firebase/firestore';
import type { Favorite } from '@bharat-darshan/types';
import { db } from '../firebase/config';
import { useAuthStore } from './useAuthStore';

const LOCAL_KEY = '@bharat-darshan:favorites';

interface FavoritesState {
  favorites: Set<string>;
  load: () => Promise<void>;
  toggle: (placeId: string) => Promise<void>;
  has: (placeId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: new Set<string>(),
  load: async () => {
    const uid = useAuthStore.getState().user?.uid;
    if (!uid) {
      const raw = await AsyncStorage.getItem(LOCAL_KEY);
      set({ favorites: new Set<string>(raw ? JSON.parse(raw) : []) });
      return;
    }
    const snap = await getDocs(collection(db, `users/${uid}/favorites`));
    set({ favorites: new Set<string>(snap.docs.map((d) => d.id)) });
  },
  toggle: async (placeId: string) => {
    const uid = useAuthStore.getState().user?.uid;
    const next = new Set(get().favorites);
    if (next.has(placeId)) {
      next.delete(placeId);
      if (uid) {
        await deleteDoc(doc(db, `users/${uid}/favorites/${placeId}`));
      } else {
        const cur: string[] = JSON.parse((await AsyncStorage.getItem(LOCAL_KEY)) ?? '[]');
        await AsyncStorage.setItem(LOCAL_KEY, JSON.stringify(cur.filter((id) => id !== placeId)));
      }
    } else {
      next.add(placeId);
      const fav: Favorite = { placeId, addedAt: new Date().toISOString() };
      if (uid) {
        await setDoc(doc(db, `users/${uid}/favorites/${placeId}`), fav);
      } else {
        const cur: string[] = JSON.parse((await AsyncStorage.getItem(LOCAL_KEY)) ?? '[]');
        cur.push(placeId);
        await AsyncStorage.setItem(LOCAL_KEY, JSON.stringify(cur));
      }
    }
    set({ favorites: next });
  },
  has: (placeId: string) => get().favorites.has(placeId),
}));
