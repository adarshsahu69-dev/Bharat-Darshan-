import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInAnonymously,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  getIdTokenResult,
  updateProfile,
  type User as FirebaseUser,
  type UserCredential,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import type { AppUser } from '@bharat-darshan/types';
import { auth, db } from '../firebase/config';

interface AuthState {
  user: AppUser | null;
  role: 'user' | 'admin' | null;
  hasBootstrap: boolean;
  isOnboarded: boolean;
  init: () => Promise<void>;
  setOnboarded: (onboarded: boolean) => void;
  setUser: (user: AppUser | null) => void;
  signup: (name: string, email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInAnonymous: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      role: null,
      hasBootstrap: false,
      isOnboarded: false,
      init: async () => {
        await new Promise<void>((resolve) => {
          const unsub = onAuthStateChanged(auth, async (fbUser: FirebaseUser | null) => {
            unsub();
            if (!fbUser) {
              set({ user: null, role: null, hasBootstrap: true });
              return resolve();
            }
            const snap = await getDoc(doc(db, 'users', fbUser.uid));
            let profile: AppUser;
            if (snap.exists()) {
              profile = (snap.data() as AppUser);
            } else {
              profile = {
                uid: fbUser.uid,
                email: fbUser.email ?? null,
                displayName: fbUser.displayName ?? null,
                photoURL: fbUser.photoURL ?? null,
                role: 'user',
                createdAt: new Date().toISOString(),
              };
              await setDoc(doc(db, 'users', fbUser.uid), profile, { merge: true });
            }
            try {
              const tokenResult = await getIdTokenResult(fbUser, true);
              const claimRole = (tokenResult.claims.role as 'user' | 'admin' | undefined) ?? undefined;
              set({
                user: profile,
                role: claimRole ?? profile.role,
                hasBootstrap: true,
              });
            } catch {
              set({ user: profile, role: profile.role, hasBootstrap: true });
            }
            resolve();
          });
        });
      },
      setOnboarded: (onboarded) => set({ isOnboarded: onboarded }),
      setUser: (user) => set({ user, role: user?.role ?? null }),
      signup: async (name, email, password) => {
        const cred: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(cred.user, { displayName: name });
        await setDoc(
          doc(db, 'users', cred.user.uid),
          { uid: cred.user.uid, email, displayName: name, role: 'user', createdAt: new Date().toISOString() },
          { merge: true },
        );
      },
      signIn: async (email, password) => {
        await signInWithEmailAndPassword(auth, email, password);
      },
      signInAnonymous: async () => {
        await signInAnonymously(auth);
      },
      signOut: async () => {
        await firebaseSignOut(auth);
      },
    }),
    {
      name: '@bharat-darshan/auth',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (s) => ({ user: s.user, isOnboarded: s.isOnboarded }),
    },
  ),
);
