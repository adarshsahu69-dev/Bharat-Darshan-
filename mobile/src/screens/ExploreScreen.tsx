import React, { useEffect, useLayoutEffect, useState } from 'react';
import { FlatList, Image, ListRenderItem, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from 'expo-vector-icons';
import { colors } from '../theme/colors';
import CategoryChip from '../components/CategoryChip';
import MapPreview from '../components/MapPreview';
import RatingBadge from '../components/RatingBadge';
import { navigateRoot } from '../navigation/navigationRef';
import type { PlacePreview } from '../components/types';

const destinations: PlacePreview[] = [
  { id: 'p1', name: 'Eiffel Tower', image: 'https://images.unsplash.com/eiffel', city: 'Paris, France', rating: 4.8, reviewCount: 1280 },
  { id: 'p2', name: 'Kyoto Golden Pavilion', image: 'https://images.unsplash.com/kyoto', city: 'Kyoto, Japan', rating: 4.9, reviewCount: 980 },
  { id: 'p3', name: 'Santorini Sunset', image: 'https://images.unsplash.com/santorini', city: 'Santorini, Greece', rating: 4.7, reviewCount: 720 },
  { id: 'p4', name: 'Machu Picchu', image: 'https://images.unsplash.com/machu', city: 'Cusco, Peru', rating: 4.85, reviewCount: 640 },
];

const filterChips = ['Price', 'Dates', 'Type'];

export default function ExploreScreen({ navigation }: any) {
  const { t } = useTranslation();
  const [active, setActive] = useState<string | null>(null);

  useLayoutEffect(() => {
    navigation?.setOptions?.({ headerShown: false });
  }, [navigation]);

  const renderItem: ListRenderItem<PlacePreview> = ({ item }) => (
    <TouchableOpacity style={styles.destCard} onPress={() => navigateRoot('Destination', { placeId: item.id })}>
      <Image source={{ uri: item.image }} style={styles.destImage} />
      <View style={styles.destBody}>
        <Text style={styles.destName}>{item.name}</Text>
        <Text style={styles.destCity}>{item.city}</Text>
        <View style={styles.destRow}>
          <RatingBadge rating={item.rating} count={item.reviewCount} />
          <View style={[styles.tag, { backgroundColor: item.id === 'p1' ? '#EF4444' : colors.teal }]}>
            <Text style={styles.tagText}>Featured</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.mapWrap}>
        <MapPreview
          markers={[
            { color: 'green', top: 40, left: 60 },
            { color: 'teal', top: 90, left: 140 },
            { color: 'coral', top: 120, left: 200 },
          ]}
        />
        <View style={styles.chipRow}>
          {filterChips.map((chip) => (
            <CategoryChip key={chip} label={chip} selected={active === chip} onPress={() => setActive(active === chip ? null : chip)} style={{ marginHorizontal: 6 }} />
          ))}
        </View>
      </View>
      <Text style={styles.sectionTitle}>{t('noResults', 'Destinations')}</Text>
      <FlatList
        data={destinations}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 40 }}
        ListEmptyComponent={<Text style={styles.empty}>{t('noResults')}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white, paddingTop: 8 },
  mapWrap: { marginHorizontal: 16, marginBottom: 16 },
  chipRow: { flexDirection: 'row', marginTop: 10 },
  sectionTitle: { fontSize: 16, fontWeight: 700, color: colors.text, marginHorizontal: 16, marginBottom: 8 },
  destCard: { flexDirection: 'row', marginHorizontal: 16, marginBottom: 12, backgroundColor: colors.white, borderRadius: 16, elevation: 2, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, overflow: 'hidden' },
  destImage: { width: 110, height: 110 },
  destBody: { flex: 1, padding: 12 },
  destName: { fontSize: 15, fontWeight: 700, color: colors.text },
  destCity: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  destRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 },
  tag: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10, backgroundColor: colors.sand },
  tagText: { fontSize: 10, fontWeight: 600, color: colors.teal },
  empty: { textAlign: 'center', marginTop: 48, color: colors.textSecondary },
});
