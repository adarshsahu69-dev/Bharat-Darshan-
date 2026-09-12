import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RatingBadge from './RatingBadge';
import type { Place } from '@bharat-darshan/types';

export default function PlaceCard({
  place,
  onPress,
}: {
  place: Place;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <Image
        source={{ uri: place.images?.[0] ?? 'https://placehold.co/400x200' }}
        style={styles.image}
      />
      <View style={styles.body}>
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={1}>
            {place.name}
          </Text>
          <Ionicons name="heart-outline" size={20} color="#6b7280" />
        </View>
        <Text style={styles.city} numberOfLines={1}>
          {place.cityId}
        </Text>
        <View style={styles.row}>
          <RatingBadge rating={place.rating} count={place.reviewCount} />
          {place.isFeatured && (
            <View style={styles.badge}>
              <Ionicons name="star" size={12} color="#ffffff" />
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  image: { width: '100%', height: 140, borderTopLeftRadius: 12, borderTopRightRadius: 12 },
  body: { padding: 12 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 16, fontWeight: 600, color: '#111827' },
  city: { fontSize: 13, color: '#6b7280', marginTop: 2 },
  row: { marginTop: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  badge: { backgroundColor: '#f59e0b', borderRadius: 10, paddingHorizontal: 6, paddingVertical: 2 },
});
