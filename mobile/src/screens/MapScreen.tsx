import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';

export default function MapScreen() {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Ionicons name="map-outline" size={64} color="#9ca3af" />
      <Text style={styles.title}>{t('map')}</Text>
      <Text style={styles.subtitle}>
        A map view is coming soon. In the meantime, browse and discover places from the list.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9fafb' },
  title: { fontSize: 20, fontWeight: 700, color: '#111827', marginTop: 16 },
  subtitle: { fontSize: 13, color: '#6b7280', textAlign: 'center', marginTop: 8, paddingHorizontal: 24 },
});
