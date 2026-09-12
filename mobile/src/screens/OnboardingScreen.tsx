import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { navigateRoot } from '../navigation/navigationRef';

export default function OnboardingScreen() {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Ionicons name="map" size={84} color="#1e3a8a" />
      <Text style={styles.title}>{t('onboarding.title')}</Text>
      <Text style={styles.subtitle}>{t('onboarding.subtitle')}</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigateRoot('Language')}>
        <Text style={styles.buttonText}>{t('language.continue')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', paddingHorizontal: 24 },
  title: { fontSize: 26, fontWeight: 700, color: '#111827', marginTop: 16 },
  subtitle: { fontSize: 15, color: '#6b7280', textAlign: 'center', marginVertical: 24 },
  button: { backgroundColor: '#1e3a8a', paddingHorizontal: 32, paddingVertical: 14, borderRadius: 12 },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: 600 },
});
