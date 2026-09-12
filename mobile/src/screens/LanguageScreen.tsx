import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../store/useAuthStore';
import { initI18n, supportedLocales } from '../i18n';
import { navigateRoot } from '../navigation/navigationRef';
import { Ionicons } from '@expo/vector-icons';
import type { SupportedLocale } from '@bharat-darshan/types';

export default function LanguageScreen() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<SupportedLocale>('en');
  const setOnboarded = useAuthStore((s) => s.setOnboarded);
  const user = useAuthStore((s) => s.user);

  const onContinue = async () => {
    await initI18n(selected);
    setOnboarded(true);
    navigateRoot(user ? 'Main' : 'Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('language.title')}</Text>
      <Text style={styles.subtitle}>{t('language.subtitle')}</Text>
      <View style={styles.picker}>
        {supportedLocales.map((locale) => (
          <TouchableOpacity
            key={locale}
            style={[styles.option, selected === locale && styles.optionSelected]}
            onPress={() => setSelected(locale)}
          >
            <Text style={[styles.label, selected === locale && styles.labelSelected]}>
              {locale === 'en' ? 'English' : 'हिन्दी'}
            </Text>
            {selected === locale && <Ionicons name="checkmark" size={18} color="#ffffff" />}
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={onContinue}>
        <Text style={styles.buttonText}>{t('language.continue')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#ffffff' },
  title: { fontSize: 26, fontWeight: 700, color: '#111827', marginBottom: 8 },
  subtitle: { fontSize: 15, color: '#6b7280', marginBottom: 24 },
  picker: { gap: 12, marginBottom: 24 },
  option: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#d1d5db',
  },
  optionSelected: { backgroundColor: '#1e3a8a', borderColor: '#1e3a8a' },
  label: { fontSize: 16, color: '#111827' },
  labelSelected: { color: '#ffffff', fontWeight: 600 },
  button: { backgroundColor: '#1e3a8a', padding: 16, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: 600 },
});
