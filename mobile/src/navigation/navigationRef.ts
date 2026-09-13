import { createNavigationContainerRef } from '@react-navigation/native';
import type { RootStackParamList } from './types';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate(name: keyof RootStackParamList, params?: Record<string, unknown>) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params as any);
  }
}

export function navigateRoot(name: keyof RootStackParamList, params?: Record<string, unknown>) {
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: 0,
      routes: [{ name, params: params as any }],
    });
  }
}

export function replaceRoot(name: keyof RootStackParamList, params?: Record<string, unknown>) {
  if (navigationRef.isReady()) {
    navigationRef.replace(name, params as any);
  }
}

export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}
