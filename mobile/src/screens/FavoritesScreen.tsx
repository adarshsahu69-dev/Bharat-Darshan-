import React, { useCallback, useState } from 'react';
import { FlatList, ListRenderItem, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useFocusEffect } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuthStore } from '../store/useAuthStore';
import { usePlacesStore } from '../store/usePlacesStore';
import { navigateRoot } from '../navigation/navigationRef';
import PlaceCard from '../components/PlaceCard';
import type { Place } from '@bharat-darshan/types';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { MainTabParamList } from '../navigation/types';

type Props = BottomTabScreenProps<MainTabParamList, 'Favorites'>;

export default function FavoritesScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const uid = useAuthStore((s) => s.user?.uid);
  const getPlace = usePlacesStore((s) => s.getPlace);
  const [favorites, setFavorites] = useState<Place[]>([]);

  useFocusEffect(
    useCallback(() => {
      if (!uid) return;
      (async () => {
        const snap = await getDocs(collection(db, `users/${uid}/favorites`));
        const places: Place[] = [];
        for (const d of snap.docs) {
          const p = await getPlace(d.id);
          if (p) places.push(p);
        }
        setFavorites(places);
      })();
    }, [uid]),
  );

  const renderItem: ListRenderItem<Place> = ({ item }) => (
    <PlaceCard place={item} onPress={() => navigateRoot('PlaceDetail', { placeId: item.id })} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>{t('noFavorites')}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  empty: { textAlign: 'center', marginTop: 48, color: '#6b7280' },
});
