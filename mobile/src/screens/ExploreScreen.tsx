import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, ListRenderItem, StyleSheet, Text, TextInput, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useFocusEffect } from '@react-navigation/native';
import { usePlacesStore } from '../store/usePlacesStore';
import { navigateRoot } from '../navigation/navigationRef';
import PlaceCard from '../components/PlaceCard';
import CategoryChip from '../components/CategoryChip';
import type { Place, Category } from '@bharat-darshan/types';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { MainTabParamList } from '../navigation/types';

type Props = BottomTabScreenProps<MainTabParamList, 'Explore'>;

export default function ExploreScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const categories = usePlacesStore((s) => s.categories);
  const places = usePlacesStore((s) => s.places);
  const loadPlaces = usePlacesStore((s) => s.loadPlaces);
  const loadReferenceData = usePlacesStore((s) => s.loadReferenceData);
  const searchPlaces = usePlacesStore((s) => s.searchPlaces);
  const [term, setTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      loadReferenceData();
      loadPlaces();
    }, [loadPlaces, loadReferenceData]),
  );

  useEffect(() => {
    if (term.length > 2) {
      searchPlaces(term).then((results) => {
        usePlacesStore.setState({ places: results });
      });
    }
  }, [term, searchPlaces]);

  const filtered = useMemo(() => {
    return activeCategory
      ? places.filter((p) => p.categoryId === activeCategory)
      : places;
  }, [places, activeCategory]);

  const renderItem: ListRenderItem<Place> = ({ item }) => (
    <PlaceCard place={item} onPress={() => navigation.navigate('Map')} />
  );

  const renderCategory: ListRenderItem<Category> = ({ item }) => (
    <CategoryChip category={item} selected={activeCategory === item.id} onPress={() => setActiveCategory(activeCategory === item.id ? null : item.id)} />
  );

  return (
    <View style={styles.container}>
      <TextInput placeholder={t('home.searchPlaceholder')} value={term} onChangeText={setTerm} style={styles.input} />
      <View>
        <FlatList
          data={[{ id: 'all', name: 'All', slug: 'all', icon: '', order: 0 }, ...categories]}
          keyExtractor={(item) => item.id}
          renderItem={renderCategory}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chips}
        />
      </View>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 24 }}
        ListEmptyComponent={<Text style={styles.empty}>{t('noResults')}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff', paddingHorizontal: 16, paddingTop: 12 },
  input: { borderWidth: 1, borderColor: '#d1d5db', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8, marginBottom: 8, fontSize: 15 },
  chips: { paddingVertical: 8 },
  empty: { textAlign: 'center', marginTop: 48, color: '#6b7280' },
});
