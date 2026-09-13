import 'dotenv/config';

const isProd = process.env.NODE_ENV === 'production';

export default ({ config }) => ({
  ...config,
  name: 'Tourousum',
  slug: 'tourousum',
  version: '1.0.0',
  extra: {
    env: isProd ? 'production' : 'development',
    defaultLocale: process.env.EXPO_PUBLIC_DEFAULT_LOCALE || 'en',
    routeApiBase: process.env.EXPO_PUBLIC_ROUTE_API_URL || 'https://api.openrouteservice.org',
  },
});
