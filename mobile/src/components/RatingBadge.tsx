import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

const AMBER = '#F59E0B';

export default function RatingBadge({ rating, count }: { rating: number; count?: number }) {
  const full = Math.round(rating);
  return (
    <View style={styles.row}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Ionicons key={i} name={i < full ? 'star' : 'star-outline'} size={14} color={AMBER} />
      ))}
      <Text style={styles.value}>{rating.toFixed(1)}</Text>
      {count ? <Text style={styles.count}>({count})</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  value: { fontSize: 13, fontWeight: 600, color: colors.text },
  count: { fontSize: 12, color: colors.textSecondary },
});
