import { create } from 'zustand';
import {
  getDocs,
  collection,
  query,
  where,
  doc,
  getDoc,
  limit,
} from 'firebase/firestore';
import type { Place, Category, City } from '@bharat-darshan/types';
import { db } from '../firebase/config';

interface PlacesState {
  places: Place[];
  categories: Category[];
  cities: City[];
  loading: boolean;
  error?: string;
  loadReferenceData: () => Promise<void>;
  loadPlaces: (cityId?: string, categoryId?: string) => Promise<void>;
  getPlace: (id: string) => Promise<Place | null>;
  searchPlaces: (term: string) => Promise<Place[]>;
}

export const usePlacesStore = create<PlacesState>((set) => ({
  places: [],
  categories: [],
  cities: [],
  loading: false,
  error: undefined,
  loadReferenceData: async () => {
    set({ loading: true });
    try {
      const [cats, cities] = await Promise.all([
        getDocs(collection(db, 'categories')),
        getDocs(collection(db, 'cities')),
      ]);
      set({
        categories: cats.docs.map((d) => d.data() as Category),
        cities: cities.docs.map((d) => d.data() as City),
      });
    } catch (e: any) {
      set({ error: e.message });
    } finally {
      set({ loading: false });
    }
  },
  loadPlaces: async (cityId, categoryId) => {
    set({ loading: true });
    try {
      let q = query(collection(db, 'places'), where('status', '==', 'published'));
      if (cityId) q = query(q, where('cityId', '==', cityId));
      if (categoryId) q = query(q, where('categoryId', '==', categoryId));
      q = query(q, limit(60));
      const snap = await getDocs(q);
      set({ places: snap.docs.map((d) => d.data() as Place) });
    } catch (e: any) {
      set({ error: e.message });
    } finally {
      set({ loading: false });
    }
  },
  getPlace: async (id: string) => {
    const snap = await getDoc(doc(db, 'places', id));
    if (!snap.exists()) return null;
    const place = snap.data() as Place;
    return place.status === 'published' ? place : null;
  },
  searchPlaces: async (term: string) => {
    const snap = await getDocs(
      query(collection(db, 'places'), where('status', '==', 'published'), limit(100)),
    );
    const all = snap.docs.map((d) => d.data() as Place);
    const t = term.toLowerCase();
    return all.filter(
      (p) =>
        p.name.toLowerCase().includes(t) ||
        p.tags.some((tg) => tg.toLowerCase().includes(t)),
    );
  },
}));
