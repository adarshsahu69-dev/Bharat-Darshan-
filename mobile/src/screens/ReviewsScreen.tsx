import React, { useEffect, useState } from 'react';
import { FlatList, ListRenderItem, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { RouteProp } from '@react-navigation/native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';
import RatingBadge from '../components/RatingBadge';
import type { RootStackParamList } from '../navigation/types';
import type { Review } from '@bharat-darshan/types';

type Props = {
  route: RouteProp<RootStackParamList, 'Reviews'>;
  navigation: any;
};

export default function ReviewsScreen({ route }: Props) {
  const { t } = useTranslation();
  const { placeId } = route.params;
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    getDocs(
      query(collection(db, 'reviews'), where('placeId', '==', placeId), where('status', '==', 'approved')),
    ).then((snap) => setReviews(snap.docs.map((d) => d.data() as Review)));
  }, [placeId]);

  const renderItem: ListRenderItem<Review> = ({ item }) => (
    <View style={styles.review}>
      <RatingBadge rating={item.rating} count={0} />
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>{t('noResults')}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff', padding: 16 },
  review: { marginBottom: 16 },
  text: { fontSize: 14, color: '#374151', marginTop: 4 },
  empty: { textAlign: 'center', marginTop: 48, color: '#6b7280' },
});
