import React from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLayoutEffect } from 'react';
import { Ionicons } from 'expo-vector-icons';
import { colors } from '../theme/colors';
import PlaceCard from '../components/PlaceCard';
import RatingBadge from '../components/RatingBadge';
import { navigateRoot } from '../navigation/navigationRef';
import type { PlacePreview, TripPreview } from '../components/types';

const featured: PlacePreview[] = [
  { id: '1', name: 'Eiffel Tower', image: 'https://images.unsplash.com/eiffel', city: 'Paris, France', rating: 4.8, reviewCount: 1280 },
  { id: '2', name: 'Kyoto Shrines', image: 'https://images.unsplash.com/kyoto', city: 'Kyoto, Japan', rating: 4.9, reviewCount: 980 },
];

const recent: TripPreview[] = [
  { id: 't1', name: 'Tokyo Explorer', image: 'https://images.unsplash.com/tokyo', location: 'Tokyo, Japan', price: '$1,299', duration: '5 days' },
  { id: 't2', name: 'Parisian Escape', image: 'https://images.unsplash.com/paris', location: 'Paris, France', price: '$1,599', duration: '7 days' },
];

const categories = [
  { id: 'paris', name: 'Paris', icon: 'location' },
  { id: 'tokyo', name: 'Tokyo', icon: 'location' },
  { id: 'beach', name: 'Beaches', icon: 'water' },
  { id: 'mountains', name: 'Mountains', icon: 'triangle' },
  { id: 'heritage', name: 'Heritage', icon: 'library' },
  { id: 'adventure', name: 'Adventure', icon: 'trailtrack' as any },
];

export default function HomeScreen({ navigation }: any) {
  const { t } = useTranslation();

  useLayoutEffect(() => {
    navigation?.setOptions?.({ headerShown: false });
  }, [navigation]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.banner}>
        <View style={styles.bannerTop}>
          <Text style={styles.title}>Explore the World!</Text>
          <TouchableOpacity onPress={() => navigation?.navigate('Profile')}>
            <Image source={{ uri: 'https://i.pravatar.cc/80' }} style={styles.avatar} />
          </TouchableOpacity>
        </View>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color={colors.textSecondary} />
          <Text style={styles.searchPlaceholder}>{t('home.searchPlaceholder', 'Search destinations, trips…')}</Text>
          <Ionicons name="mic-circle" size={22} color={colors.textSecondary} />
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Featured Trips</Text>
        <TouchableOpacity onPress={() => navigation?.navigate('Explore')}>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={featured}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <PlaceCard place={item} onPress={() => navigateRoot('Destination', { placeId: item.id })} onFav={() => {}} />
        )}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 8 }}
      />

      <View style={styles.categories}>
        {categories.map((c) => (
          <View key={c.id} style={styles.category}>
            <View style={styles.categoryIcon}>
              <Ionicons name={c.icon} size={24} color={colors.teal} />
            </View>
            <Text style={styles.categoryName}>{c.name}</Text>
          </View>
        ))}
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent Bookings</Text>
      </View>
      <FlatList
        data={recent}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.tripCard}>
            <Image source={{ uri: item.image }} style={styles.tripImage} />
            <View style={styles.tripBody}>
              <Text style={styles.tripName}>{item.name}</Text>
              <Text style={styles.tripMeta}>{item.location} · {item.duration}</Text>
              <Text style={styles.tripPrice}>{item.price}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  banner: { backgroundColor: colors.teal, paddingTop: 16, paddingBottom: 28, paddingHorizontal: 16, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  bannerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 26, fontWeight: 800, color: colors.white },
  avatar: { width: 44, height: 44, borderRadius: 22, borderWidth: 2, borderColor: colors.white },
  searchBox: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, borderRadius: 16, paddingHorizontal: 12, marginTop: 16, elevation: 4, shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 8, shadowOffset: { width: 0, height: 4 },
  },
  searchPlaceholder: { flex: 1, fontSize: 14, color: colors.text, marginHorizontal: 8 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 16, marginTop: 16, marginBottom: 8 },
  sectionTitle: { fontSize: 18, fontWeight: 700, color: colors.text },
  seeAll: { fontSize: 13, color: colors.tealDark },
  categories: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', paddingHorizontal: 8, gap: 4 },
  category: { alignItems: 'center', width: 72, marginVertical: 8 },
  categoryIcon: { width: 56, height: 56, borderRadius: 28, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, justifyContent: 'center', alignItems: 'center', elevation: 1 },
  categoryName: { fontSize: 11, color: colors.text, marginTop: 4, textAlign: 'center' },
  tripCard: { flexDirection: 'row', width: 240, backgroundColor: colors.beige, borderRadius: 16, overflow: 'hidden', elevation: 2, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6, shadowOffset: { width: 0, height: 2 } },
  tripImage: { width: 72, height: 72 },
  tripBody: { flex: 1, padding: 10 },
  tripName: { fontSize: 15, fontWeight: 700, color: colors.text },
  tripMeta: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  tripPrice: { fontSize: 13, fontWeight: 700, color: colors.teal, marginTop: 2 },
});
