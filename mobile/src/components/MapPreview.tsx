import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

export type MarkerColor = 'teal' | 'green' | 'coral';

const markerColor = (m: MarkerColor) =>
  m === 'teal' ? colors.teal : m === 'green' ? colors.green : colors.coral;

export default function MapPreview({
  markers = [],
}: {
  markers?: { color: MarkerColor; top: number; left: number }[];
}) {
  return (
    <View style={styles.map}>
      {markers.map((m, i) => (
        <Ionicons
          key={i}
          name="location"
          size={22}
          color={markerColor(m.color)}
          style={{ position: 'absolute', top: m.top, left: m.left }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: 160,
    borderRadius: 16,
    backgroundColor: colors.sand,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
});
