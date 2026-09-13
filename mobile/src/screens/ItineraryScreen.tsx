import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors } from '../theme/colors';
import Fab from '../components/Fab';
import { navigateRoot } from '../navigation/navigationRef';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/types';

type Props = { route: RouteProp<RootStackParamList, 'Itinerary'>; navigation: any };

type Activity = { id: string; time: string; place: string; note: string };

const schedule: Record<number, Activity[]> = {
  1: [
    { id: '1', time: '09:00', place: 'Eiffel Tower', note: 'Morning visit and photos' },
    { id: '2', time: '13:00', place: 'Seine River Cruise', note: 'Lunch cruise' },
    { id: '3', time: '18:00', place: 'Trocadéro Gardens', note: 'Sunset views' },
  ],
  2: [
    { id: '4', time: '09:30', place: 'Louvre Museum', note: 'Guided tour' },
    { id: '5', time: '14:00', place: 'Le Marais', note: 'Lunch & stroll' },
  ],
  3: [
    { id: '6', time: '08:00', place: 'Montmartre', note: 'Morning art walk' },
    { id: '7', time: '12:00', place: 'Sacré-Cœur', note: 'Brunch' },
    { id: '8', time: '15:00', place: 'Departure', note: 'Head to airport' },
  ],
};

export default function ItineraryScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const [day, setDay] = useState(1);
  const activities = schedule[day] ?? [];
  const days = Object.keys(schedule).map(Number);

  const renderItem = ({ item, index }: { item: Activity; index: number }) => {
    const isLast = index === activities.length - 1;
    const nodeColor = index % 2 === 0 ? colors.teal : colors.coral;
    return (
      <View style={styles.step}>
        <View style={[styles.node, { backgroundColor: nodeColor }]}>
          <Text style={styles.nodeNum}>{index + 1}</Text>
        </View>
        <View style={styles.line} />
        <View style={[styles.card, isLast && { borderBottomWidth: 0 }]}>
          <Text style={styles.time}>{item.time}</Text>
          <Text style={styles.place}>{item.place}</Text>
          <Text style={styles.note}>{item.note}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.dayTabs}>
        {days.map((d) => (
          <TouchableOpacity key={d} style={[styles.dayTab, day === d && styles.dayTabActive]} onPress={() => setDay(d)}>
            <Text style={[styles.dayLabel, day === d && styles.dayLabelActive]}>{`Day ${d}`}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList data={activities} keyExtractor={(item) => item.id} renderItem={renderItem} contentContainerStyle={{ paddingBottom: 80 }} />
      <Fab icon="add" onPress={() => navigateRoot('ActiveTrip')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white, paddingTop: 8 },
  dayTabs: { flexDirection: 'row', gap: 8, paddingHorizontal: 16, marginBottom: 8 },
  dayTab: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.white },
  dayTabActive: { backgroundColor: colors.teal },
  dayLabel: { fontSize: 13, fontWeight: 600, color: colors.text },
  dayLabelActive: { color: colors.white },
  step: { flexDirection: 'row', alignItems: 'flex-start', marginHorizontal: 16, position: 'relative' },
  node: { width: 26, height: 26, borderRadius: 13, justifyContent: 'center', alignItems: 'center', zIndex: 2 },
  nodeNum: { color: colors.white, fontSize: 12, fontWeight: 800 },
  line: { position: 'absolute', left: 12, top: 26, width: 2, height: 48, backgroundColor: colors.border, zIndex: 1 },
  card: { flex: 1, backgroundColor: colors.beige, borderRadius: 12, padding: 12, marginLeft: 20, borderBottomWidth: 1, borderBottomColor: colors.border },
  time: { fontSize: 13, fontWeight: 700, color: colors.teal },
  place: { fontSize: 15, fontWeight: 700, color: colors.text, marginTop: 2 },
  note: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
});
