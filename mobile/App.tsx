import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useAuthStore } from './src/store/useAuthStore';
import { navigationRef } from './src/navigation/navigationRef';
import AppNavigator from './src/navigation/AppNavigator';
import LoadingScreen from './src/components/LoadingScreen';
import './src/i18n';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const init = useAuthStore((s) => s.init);
  const hasBootstrap = useAuthStore((s) => s.hasBootstrap);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    init().then(async () => {
      await SplashScreen.hideAsync();
      setReady(true);
    });
  }, [init]);

  if (!ready || !hasBootstrap) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef} theme={DefaultTheme}>
        <StatusBar style="auto" />
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
