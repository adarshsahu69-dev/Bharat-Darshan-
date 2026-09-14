import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRoute, RouteProp } from '@react-navigation/native';
import { colors } from '../theme/colors';
import Card from '../components/Card';
import ThemedButton from '../components/ThemedButton';
import { Ionicons } from '@expo/vector-icons';
import type { RootStackParamList } from '../navigation/types';

const tripImage = 'https://images.unsplash.com/tokyo';

export default function BookingScreen() {
  const { t } = useTranslation();
  const route = useRoute<RouteProp<RootStackParamList, 'Booking'>>();
  const placeId = route?.params?.placeId ?? '';
  void placeId;

  const [method, setMethod] = useState<'card' | 'apple' | 'paypal'>('card');

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        <Card style={{ marginBottom: 16 }}>
          <Image source={{ uri: tripImage }} style={styles.tripImage} />
          <Text style={styles.tripName}>Tokyo Explorer — 5 Days</Text>
          <Text style={styles.tripMeta}>Tokyo, Japan · 12 Sep – 16 Sep 2026</Text>
        </Card>

        <Card style={{ marginBottom: 16 }}>
          <Text style={styles.section}>Select Dates</Text>
          <TouchableOpacity style={styles.picker}>
            <Ionicons name="calendar-outline" size={18} color={colors.teal} />
            <Text style={styles.pickerText}>12 Sep 2026 → 16 Sep 2026</Text>
          </TouchableOpacity>
        </Card>

        <Card style={{ marginBottom: 16 }}>
          <Text style={styles.section}>Traveler Details</Text>
          <TextInput placeholder="Full name" style={styles.input} />
          <TextInput placeholder="Passport number" style={styles.input} />
          <TextInput placeholder="Phone number" style={styles.input} keyboardType="phone-pad" />
        </Card>

        <Card style={{ marginBottom: 16 }}>
          <Text style={styles.section}>Payment Method</Text>
          <TouchableOpacity style={styles.radioRow} onPress={() => setMethod('card')}>
            <Ionicons name={method === 'card' ? 'radio-button' : 'ellipse-outline'} size={22} color={colors.teal} />
            <Ionicons name=" card-outline" size={20} color={colors.text} />
            <Text style={styles.radioLabel}>Credit Card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.radioRow} onPress={() => setMethod('apple')}>
            <Ionicons name={method === 'apple' ? 'radio-button' : 'ellipse-outline'} size={22} color={colors.teal} />
            <Ionicons name="logo-apple" size={20} color={colors.text} />
            <Text style={styles.radioLabel}>Apple Pay</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.radioRow} onPress={() => setMethod('paypal')}>
            <Ionicons name={method === 'paypal' ? 'radio-button' : 'ellipse-outline'} size={22} color={colors.teal} />
            <Ionicons name="logo-paypal" size={20} color="#003087" />
            <Text style={styles.radioLabel}>PayPal</Text>
          </TouchableOpacity>
        </Card>
      </ScrollView>

      <View style={styles.footer}>
        <View><Text style={styles.totalLabel}>Total Price</Text><Text style={styles.total}>$14,900</Text></View>
        <ThemedButton title="Confirm & Pay" variant="teal" onPress={() => {}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: colors.beige },
  container: { flex: 1, padding: 16 },
  tripImage: { width: '100%', height: 120, borderRadius: 12 },
  tripName: { fontSize: 16, fontWeight: 800, color: colors.text, marginTop: 8 },
  tripMeta: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  section: { fontSize: 14, fontWeight: 700, color: colors.text, marginBottom: 10 },
  picker: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 10 },
  pickerText: { fontSize: 14, color: colors.text },
  input: { borderWidth: 1, borderColor: colors.border, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 10, fontSize: 15, backgroundColor: colors.white },
  radioRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 10 },
  radioLabel: { fontSize: 14, color: colors.text, marginLeft: 4 },
  footer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: colors.white, padding: 16, borderTopWidth: 1, borderTopColor: colors.border, elevation: 6,
  },
  totalLabel: { fontSize: 12, color: colors.textSecondary },
  total: { fontSize: 20, fontWeight: 800, color: colors.teal },
});
