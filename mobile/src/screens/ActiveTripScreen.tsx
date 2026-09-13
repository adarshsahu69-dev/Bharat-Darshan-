import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors } from '../theme/colors';
import MapPreview from '../components/MapPreview';
import Card from '../components/Card';
import { Ionicons } from '@expo/vector-icons';

type Step = { id: string; title: string; location: string };
const steps: Step[] = [
  { id: '1', title: 'Eiffel Tower', location: '1235 Avenue Anatole, Paris' },
  { id: '2', title: 'Trocadéro', location: 'Place du Trocadéro, Paris' },
  { id: '3', title: 'Seine River', location: 'Pont Neuf, Paris' },
];

export default function ActiveTripScreen() {
  const { t } = useTranslation();
  const [sos, setSos] = useState(false);

  return (
    <View style={styles.container}>
      <MapPreview
        markers={[
          { color: 'teal', top: 80, left: 90 },
          { color: 'green', top: 120, left: 160 },
          { color: 'coral', top: 170, left: 210 },
        ]}
      />
      <TouchableOpacity
        style={[styles.sos, sos && styles.sosActive]}
        onPress={() => setSos(!sos)}
        activeOpacity={0.9}
      >
        <Ionicons name="alarm" size={20} color={colors.white} />
        <Text style={styles.sosText}>SOS</Text>
      </TouchableOpacity>

      <View style={styles.panels}>
        <Card style={{ marginBottom: 12 }}>
          <Text style={styles.panelTitle}>Current Weather</Text>
          <Text style={styles.panelValue}>22° · Partly cloudy · Wind 12 km/h</Text>
        </Card>

        <Card style={{ marginBottom: 12 }}>
          <Text style={styles.panelTitle}>Next steps</Text>
          <FlatList
            data={steps}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <View style={styles.step}>
                <View style={[styles.node, { backgroundColor: index === 0 ? colors.coral : colors.teal }]}>
                  <Text style={styles.nodeNum}>{Number(item.id)}</Text>
                </View>
                <View style={{ marginLeft: 12 }}>
                  <Text style={styles.stepTitle}>{item.title}</Text>
                  <Text style={styles.stepLoc}>{item.location}</Text>
                </View>
              </View>
            )}
          />
        </Card>

        <Card>
          <Text style={styles.panelTitle}>Safety tips</Text>
          <Text style={styles.tip}>• Keep your passport in a hotel safe.</Text>
          <Text style={styles.tip}>• Save local emergency numbers (112).</Text>
          <Text style={styles.tip}>• Stay hydrated and wear sunscreen.</Text>
          <Text style={styles.tip}>• Check visa & entry requirements.</Text>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  sos: {
    alignSelf: 'center', marginTop: -20, flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: '#EF4444', paddingHorizontal: 18, paddingVertical: 10, borderRadius: 24, elevation: 5,
  },
  sosActive: { backgroundColor: colors.coral },
  sosText: { color: colors.white, fontWeight: 800, fontSize: 13 },
  panels: { padding: 16 },
  panelTitle: { fontSize: 14, fontWeight: 700, color: colors.text, marginBottom: 6 },
  panelValue: { fontSize: 14, color: colors.textSecondary },
  step: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  node: { width: 26, height: 26, borderRadius: 13, justifyContent: 'center', alignItems: 'center' },
  nodeNum: { color: colors.white, fontSize: 12, fontWeight: 800 },
  stepTitle: { fontSize: 14, fontWeight: 700, color: colors.text },
  stepLoc: { fontSize: 12, color: colors.textSecondary },
  tip: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
});
