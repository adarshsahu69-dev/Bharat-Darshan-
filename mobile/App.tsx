import { DefaultTheme, NavigationContainer, type Theme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { colors } from './src/theme/colors';
import { navigationRef } from './src/navigation/navigationRef';
import AppNavigator from './src/navigation/AppNavigator';

const TourousumTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.beige,
    card: colors.beige,
    primary: colors.teal,
    text: colors.text,
    border: colors.border,
    notification: colors.coral,
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef} theme={TourousumTheme}>
        <StatusBar style="dark" backgroundColor={colors.beige} />
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
