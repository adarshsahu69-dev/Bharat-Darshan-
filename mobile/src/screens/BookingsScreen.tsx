import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors } from '../theme/colors';
import Card from '../components/Card';
import RatingBadge from '../components/RatingBadge';
import { navigateRoot } from '../navigation/navigationRef';
import type { BookingPreview } from '../components/types';

const upcoming: BookingPreview[] = [
  { id: 'b1', name: 'Tokyo Explorer', image: 'https://images.unsplash.com/tokyo', from: '2026-09-12', to: '2026-09-16', status: 'upcoming' },
  { id: 'b2', name: 'Parisian Escape', image: 'https://images.unsplash.com/paris', from: '2026-10-05', to: '2026-10-12', status: 'upcoming' },
];

const past: BookingPreview[] = [
  { id: 'b3', name: 'Santorini Sunset', image: 'https://images.unsplash.com/santorini', from: '2026-06-01', to: '2026-06-05', status: 'past' },
];

export default function BookingsScreen() {
  const { t } = useTranslation();
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');
  const list = tab === 'upcoming' ? upcoming : past;

  return (
    <View style={styles.container}>
      <View style={styles.segment}>
        <TouchableOpacity style={[styles.segmentBtn, tab === 'upcoming' && styles.segmentActive]} onPress={() => setTab('upcoming')}>
          <Text style={[styles.segmentLabel, tab === 'upcoming' && styles.segmentLabelActive]}>{t('favorite', 'Upcoming')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.segmentBtn, tab === 'past' && styles.segmentActive]} onPress={() => setTab('past')}>
          <Text style={[styles.segmentLabel, tab === 'past' && styles.segmentLabelActive]}>{t('trips', 'Past')}</Text>
        </TouchableOpacity>
        <View style={styles.indicator} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {list.map((b) => (
          <Card key={b.id} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <Image source={{ uri: b.image }} style={styles.thumb} />
            <View style={styles.info}>
              <Text style={styles.name}>{b.name}</Text>
              <Text style={styles.dates}>{b.from} → {b.to}</Text>
              <View style={[styles.status, { backgroundColor: b.status === 'upcoming' ? colors.teal : colors.textSecondary }]}>
                <Text style={styles.statusText}>{b.status}</Text>
              </View>
            </View>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white, padding: 16 },
  segment: {
    flexDirection: 'row', backgroundColor: colors.sand, borderRadius: 24, padding: 4, marginBottom: 16, position: 'relative',
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4, shadowOffset: { width: 0, height: 2 },
  },
  segmentBtn: { flex: 1, alignItems: 'center', paddingVertical: 8, borderRadius: 22, zIndex: 1 },
  segmentActive: { backgroundColor: colors.teal, elevation: 2 },
  segmentLabel: { fontSize: 13, fontWeight: 600, color: colors.text, zIndex: 2 },
  segmentLabelActive: { color: colors.white, fontWeight: 800, zIndex: 2 },
  indicator: { position: 'absolute', top: 8, width: '50%', height: 28, borderRadius: 22, backgroundColor: colors.white, transform: [{ translateX: 0 }] },
  thumb: { width: 72, height: 72, borderRadius: 12, marginRight: 12 },
  info: { flex: 1 },
  name: { fontSize: 15, fontWeight: 700, color: colors.text },
  dates: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  status: { alignSelf: 'flex-start', marginTop: 4, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 },
  statusText: { fontSize: 11, fontWeight: 700, color: colors.white, textTransform: 'capitalize' },
});
