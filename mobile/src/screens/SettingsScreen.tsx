import React, { useState } from 'react';
import { Alert, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../store/useAuthStore';
import { initI18n, supportedLocales } from '../i18n';
import { navigateRoot } from '../navigation/navigationRef';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const { t, i18n } = useTranslation();
  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);
  const [locale, setLocale] = useState<'en' | 'hi'>('en');

  const handleLocale = async (value: 'en' | 'hi') => {
    setLocale(value);
    await initI18n(value);
    i18n.changeLanguage(value);
  };

  const handleSignOut = () => {
    Alert.alert(t('auth.logout'), t('auth.logoutConfirm'), [
      { text: t('no'), style: 'cancel' },
      { text: t('yes'), style: 'destructive', onPress: async () => { await signOut(); navigateRoot('Login'); } },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.section}>{t('settings')}</Text>
      <View style={styles.row}>
        <Text style={styles.label}>{t('language.title')}</Text>
        {supportedLocales.map((loc) => (
          <TouchableOpacity key={loc} style={[styles.langBtn, locale === loc && styles.langBtnActive]} onPress={() => handleLocale(loc as 'en' | 'hi')}>
            <Text style={[styles.langLabel, locale === loc && styles.langLabelActive]}>{loc === 'en' ? 'English' : 'हिन्दी'}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.row} onPress={() => navigateRoot('Notifications')}>
        <Ionicons name="notifications-outline" size={20} color="#111827" />
        <Text style={styles.link}>{t('notifications')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.row} onPress={handleSignOut}>
        <Ionicons name="log-out-outline" size={20} color="#ef4444" />
        <Text style={[styles.link, { color: '#ef4444' }]}>{t('auth.logout')}</Text>
      </TouchableOpacity>
      {user ? <Text style={styles.user}>{user.email}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff', padding: 16 },
  section: { fontSize: 13, fontWeight: 600, color: '#6b7280', marginBottom: 8 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  label: { flex: 1, fontSize: 16, color: '#111827' },
  langBtn: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, borderWidth: 1, borderColor: '#d1d5db' },
  langBtnActive: { backgroundColor: '#1e3a8a', borderColor: '#1e3a8a' },
  langLabel: { fontSize: 13, color: '#111827' },
  langLabelActive: { color: '#ffffff' },
  link: { flex: 1, fontSize: 16, color: '#1e3a8a', marginLeft: 8 },
  user: { marginTop: 24, fontSize: 12, color: '#6b7280' },
});
