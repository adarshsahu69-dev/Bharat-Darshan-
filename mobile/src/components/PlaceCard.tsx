import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from 'expo-vector-icons';
import RatingBadge from './RatingBadge';
import { colors } from '../theme/colors';
import type { PlacePreview } from './types';

export default function PlaceCard({
  place,
  onPress,
  onFav,
  favorited,
}: {
  place: PlacePreview;
  onPress?: () => void;
  onFav?: () => void;
  favorited?: boolean;
}) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <Image source={{ uri: place.image }} style={styles.image} />
      <View style={styles.body}>
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={1}>
            {place.name}
          </Text>
          <TouchableOpacity onPress={onFav}>
            <Ionicons
              name={favorited ? 'heart' : 'heart-outline'}
              size={20}
              color={favorited ? '#EF4444' : colors.textSecondary}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.city} numberOfLines={1}>
          {place.city}
        </Text>
        <RatingBadge rating={place.rating} count={place.reviewCount} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 4,
    marginVertical: 6,
    borderRadius: 16,
    backgroundColor: colors.white,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    overflow: 'hidden',
  },
  image: { width: 200, height: 120 },
  body: { padding: 12 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 15, fontWeight: 700, color: colors.text, flex: 1 },
  city: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
});
