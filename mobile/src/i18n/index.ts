import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import type { SupportedLocale } from '@bharat-darshan/types';
import en from './translations/en';
import hi from './translations/hi';

export const resources = {
  en: { translation: en },
  hi: { translation: hi },
};

export const supportedLocales: SupportedLocale[] = ['en', 'hi'];
export const defaultLocale: SupportedLocale = 'en';

let initialized = false;

export function resolveLocale(input?: SupportedLocale): SupportedLocale {
  if (input && supportedLocales.includes(input)) return input;
  let code: string | undefined;
  try {
    code = Localization.getLocales?.()[0]?.languageCode ?? undefined;
  } catch {
    code = undefined;
  }
  const resolved = (code as SupportedLocale | undefined) ?? defaultLocale;
  return supportedLocales.includes(resolved) ? resolved : defaultLocale;
}

export async function initI18n(locale?: SupportedLocale): Promise<typeof i18n> {
  if (initialized) return i18n;
  const resolved = resolveLocale(locale);

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: resolved,
      fallbackLng: defaultLocale,
      defaultNS: 'translation',
      ns: ['translation'],
      interpolation: { escapeValue: false },
      returnNull: false,
      react: { useSuspense: false },
    });

  initialized = true;
  return i18n;
}

export default i18n;
