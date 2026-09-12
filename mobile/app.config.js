import 'dotenv/config';

const isProd = process.env.NODE_ENV === 'production';

export default ({ config }) => ({
  ...config,
  name: 'Bharat Darshan',
  slug: 'bharat-darshan',
  version: '1.0.0',
  extra: {
    env: isProd ? 'production' : 'development',
    firebase: {
      apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
    },
    routeApiBase:
      process.env.EXPO_PUBLIC_ROUTE_API_URL || 'https://api.openrouteservice.org',
    defaultLocale: process.env.EXPO_PUBLIC_DEFAULT_LOCALE || 'en',
    posthogApiKey: process.env.EXPO_PUBLIC_POSTHOG_KEY || '',
  },
});
