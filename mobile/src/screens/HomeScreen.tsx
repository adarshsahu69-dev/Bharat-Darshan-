import React, { useCallback, useLayoutEffect } from 'react';
import { FlatList, ListRenderItem, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useFocusEffect } from '@react-navigation/native';
import { usePlacesStore } from '../store/usePlacesStore';
import { useFavoritesStore } from '../store/useFavoritesStore';
import { navigateRoot } from '../navigation/navigationRef';
import { Ionicons } from '@expo/vector-icons';
import PlaceCard from '../components/PlaceCard';
import type { Place } from '@bharat-darshan/types';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { MainTabParamList } from '../navigation/types';

type Props = BottomTabScreenProps<MainTabParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const places = usePlacesStore((s) => s.places);
  const loadPlaces = usePlacesStore((s) => s.loadPlaces);
  const loadReferenceData = usePlacesStore((s) => s.loadReferenceData);
  const loadFavs = useFavoritesStore((s) => s.load);

  useFocusEffect(
    useCallback(() => {
      loadReferenceData();
      loadPlaces();
      loadFavs();
    }, [loadPlaces, loadReferenceData, loadFavs]),
  );

  useLayoutEffect(() => {
    navigation.setOptions?.({
      headerRight: () => (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
            <Ionicons name="heart-outline" size={22} color="#111827" style={{ marginRight: 12 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Ionicons name="person-circle-outline" size={22} color="#111827" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const renderItem: ListRenderItem<Place> = ({ item }) => (
    <PlaceCard place={item} onPress={() => navigateRoot('PlaceDetail', { placeId: item.id })} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={places}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 24 }}
        ListEmptyComponent={<Text style={styles.empty}>{t('noResults')}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  empty: { textAlign: 'center', marginTop: 48, color: '#6b7280' },
});
