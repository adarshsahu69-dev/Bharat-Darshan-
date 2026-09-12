import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../store/useAuthStore';
import { Ionicons } from '@expo/vector-icons';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { MainTabParamList } from '../navigation/types';

type Props = BottomTabScreenProps<MainTabParamList, 'Profile'>;

export default function ProfileScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Ionicons name="person-circle" size={48} color="#9ca3af" />
        <View style={styles.info}>
          <Text style={styles.name}>{user?.displayName ?? user?.email ?? '—'}</Text>
          <Text style={styles.email}>{user?.role ?? ''}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Notifications')}>
        <Ionicons name="notifications-outline" size={20} color="#374151" />
        <Text style={styles.itemLabel}>{t('notifications')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={async () => { await signOut(); navigation.navigate('Login' as never); }}>
        <Ionicons name="log-out-outline" size={20} color="#ef4444" />
        <Text style={[styles.itemLabel, { color: '#ef4444' }]}>{t('auth.logout')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff', padding: 16 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  info: { marginLeft: 12 },
  name: { fontSize: 18, fontWeight: 700, color: '#111827' },
  email: { fontSize: 13, color: '#6b7280' },
  item: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  itemLabel: { fontSize: 16, color: '#111827', marginLeft: 12 },
});
