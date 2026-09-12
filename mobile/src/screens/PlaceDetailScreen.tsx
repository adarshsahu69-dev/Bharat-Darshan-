import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { RouteProp } from '@react-navigation/native';
import { usePlacesStore } from '../store/usePlacesStore';
import { useFavoritesStore } from '../store/useFavoritesStore';
import { navigateRoot } from '../navigation/navigationRef';
import { Ionicons } from '@expo/vector-icons';
import RatingBadge from '../components/RatingBadge';
import type { RootStackParamList } from '../navigation/types';
import type { Place } from '@bharat-darshan/types';

type Props = {
  route: RouteProp<RootStackParamList, 'PlaceDetail'>;
  navigation: any;
};

export default function PlaceDetailScreen({ route, navigation }: Props) {
  const { t } = useTranslation();
  const { placeId } = route.params;
  const cached = usePlacesStore((s) => s.places.find((p) => p.id === placeId));
  const getPlace = usePlacesStore((s) => s.getPlace);
  const [place, setPlace] = useState<Place | null>(cached ?? null);
  const hasFav = useFavoritesStore((s) => s.has);
  const toggleFav = useFavoritesStore((s) => s.toggle);

  useEffect(() => {
    getPlace(placeId).then((p) => p && setPlace(p));
  }, [placeId]);

  useLayoutEffect(() => {
    navigation.setOptions?.({ title: place?.name ?? '' });
  }, [navigation, place]);

  if (!place) return null;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: place.images?.[0] ?? 'https://placehold.co/400x240' }} style={styles.image} />
      <View style={styles.body}>
        <View style={styles.header}>
          <Text style={styles.name}>{place.name}</Text>
          <TouchableOpacity onPress={() => toggleFav(place.id)}>
            <Ionicons name={hasFav(place.id) ? 'heart' : 'heart-outline'} size={24} color={hasFav(place.id) ? '#ef4444' : '#6b7280'} />
          </TouchableOpacity>
        </View>
        <RatingBadge rating={place.rating} count={place.reviewCount} />
        <Text style={styles.address}>{place.address}</Text>
        <Text style={styles.description}>{place.description}</Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={() => navigateRoot('AddReview', { placeId: place.id })}>
            <Ionicons name="create-outline" size={18} color="#1e3a8a" />
            <Text style={styles.actionLabel}>{t('writeReview')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action} onPress={() => navigateRoot('Reviews', { placeId: place.id })}>
            <Ionicons name="chatbubble-outline" size={18} color="#1e3a8a" />
            <Text style={styles.actionLabel}>{t('reviews')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action} onPress={() => navigateRoot('Contribute', { placeId: place.id })}>
            <Ionicons name="flag-outline" size={18} color="#1e3a8a" />
            <Text style={styles.actionLabel}>{t('contribute')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  image: { width: '100%', height: 220 },
  body: { padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 22, fontWeight: 700, color: '#111827' },
  address: { fontSize: 13, color: '#6b7280', marginTop: 4 },
  description: { fontSize: 14, color: '#374151', marginTop: 12, lineHeight: 20 },
  actions: { flexDirection: 'row', gap: 16, marginTop: 16 },
  action: { alignItems: 'center', gap: 4 },
  actionLabel: { fontSize: 12, color: '#1e3a8a', marginTop: 2 },
});
