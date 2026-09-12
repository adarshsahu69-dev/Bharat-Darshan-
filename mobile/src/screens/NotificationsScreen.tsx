import React, { useEffect, useState } from 'react';
import { FlatList, ListRenderItem, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuthStore } from '../store/useAuthStore';
import { Ionicons } from '@expo/vector-icons';
import type { Notification as Notif } from '@bharat-darshan/types';

export default function NotificationsScreen() {
  const { t } = useTranslation();
  const uid = useAuthStore((s) => s.user?.uid);
  const [items, setItems] = useState<Notif[]>([]);

  useEffect(() => {
    if (!uid) return;
    getDocs(query(collection(db, `users/${uid}/notifications`), orderBy('createdAt', 'desc')))
      .then((snap) => setItems(snap.docs.map((d) => d.data() as Notif)))
      .catch(() => setItems([]));
  }, [uid]);

  const renderItem: ListRenderItem<Notif> = ({ item }) => (
    <View style={[styles.item, item.read && styles.read]}>
      <Ionicons name="notifications" size={20} color="#1e3a8a" />
      <View style={{ flex: 1, marginLeft: 8 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.body}>{item.body}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>{t('noResults')}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff', padding: 16 },
  item: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  read: { opacity: 0.5 },
  title: { fontSize: 14, fontWeight: 600, color: '#111827' },
  body: { fontSize: 12, color: '#6b7280' },
  empty: { textAlign: 'center', marginTop: 48, color: '#6b7280' },
});
