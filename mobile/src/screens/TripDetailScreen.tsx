import React, { useEffect, useLayoutEffect, useState } from 'react';
import { FlatList, ListRenderItem, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { useTripsStore } from '../store/useTripsStore';
import { Ionicons } from '@expo/vector-icons';
import type { RootStackParamList } from '../navigation/types';
import type { TripItem } from '@bharat-darshan/types';

type Props = {
  route: RouteProp<RootStackParamList, 'TripDetail'>;
  navigation: any;
};

export default function TripDetailScreen({ route, navigation }: Props) {
  const { tripId } = route.params;
  const loadTrip = useTripsStore((s) => s.loadTrip);
  const removeItem = useTripsStore((s) => s.removeItem);
  const [items, setItems] = useState<TripItem[]>([]);
  const [title, setTitle] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions?.({ title });
  }, [navigation, title]);

  useEffect(() => {
    loadTrip(tripId).then((trip) => {
      if (trip) {
        setItems(trip.items ?? []);
        setTitle(trip.title);
      }
    });
  }, [tripId]);

  const renderItem: ListRenderItem<TripItem> = ({ item, index }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>
        {index + 1}. {item.name}
      </Text>
      <TouchableOpacity onPress={() => removeItem(tripId, item.placeId)}>
        <Ionicons name="trash-outline" size={18} color="#ef4444" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{title || 'Trip'}</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.placeId}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>No stops added yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff', padding: 16 },
  heading: { fontSize: 20, fontWeight: 700, color: '#111827', marginBottom: 12 },
  item: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  itemText: { fontSize: 15, color: '#111827' },
  empty: { textAlign: 'center', marginTop: 48, color: '#6b7280' },
});
