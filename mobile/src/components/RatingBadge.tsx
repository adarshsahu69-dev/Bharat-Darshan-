import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RatingBadge({ rating, count }: { rating: number; count: number }) {
  return (
    <View style={styles.row}>
      <Ionicons name="star" size={16} color="#f59e0b" />
      <Text style={styles.rating}>{rating.toFixed(1)}</Text>
      {count > 0 ? <Text style={styles.count}>({count})</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  rating: { fontSize: 13, fontWeight: 600, color: '#111827' },
  count: { fontSize: 12, color: '#6b7280' },
});
