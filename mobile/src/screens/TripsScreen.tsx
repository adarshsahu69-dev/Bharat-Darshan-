import React, { useCallback, useLayoutEffect, useState } from 'react';
import { FlatList, ListRenderItem, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useFocusEffect } from '@react-navigation/native';
import { useTripsStore } from '../store/useTripsStore';
import { useAuthStore } from '../store/useAuthStore';
import { navigateRoot } from '../navigation/navigationRef';
import { Ionicons } from '@expo/vector-icons';
import type { Trip } from '@bharat-darshan/types';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { MainTabParamList } from '../navigation/types';

type Props = BottomTabScreenProps<MainTabParamList, 'Trips'>;

export default function TripsScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const trips = useTripsStore((s) => s.trips);
  const load = useTripsStore((s) => s.load);
  const createTrip = useTripsStore((s) => s.createTrip);
  const uid = useAuthStore((s) => s.user?.uid);

  useFocusEffect(useCallback(() => { if (uid) load(); }, [load, uid]));

  useLayoutEffect(() => {
    navigation.setOptions?.({
      headerRight: () => (
        <TouchableOpacity
          accessibilityLabel="Add trip"
          onPress={async () => {
            const id = await createTrip('New Trip');
            navigateRoot('TripDetail', { tripId: id });
          }}
        >
          <Ionicons name="add" size={26} color="#1e3a8a" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, createTrip]);

  const renderItem: ListRenderItem<Trip> = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigateRoot('TripDetail', { tripId: item.id })}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.status}>{item.status}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={trips}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>{t('noResults')}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff', padding: 16 },
  card: { padding: 16, borderRadius: 12, backgroundColor: '#f9fafb', marginBottom: 12 },
  title: { fontSize: 17, fontWeight: 600, color: '#111827' },
  status: { fontSize: 13, color: '#6b7280', textTransform: 'capitalize', marginTop: 2 },
  empty: { textAlign: 'center', marginTop: 48, color: '#6b7280' },
});
