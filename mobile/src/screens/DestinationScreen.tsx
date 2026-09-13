import React, { useLayoutEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { RouteProp } from '@react-navigation/native';
import { colors } from '../theme/colors';
import Card from '../components/Card';
import RatingBadge from '../components/RatingBadge';
import MapPreview from '../components/MapPreview';
import ThemedButton from '../components/ThemedButton';
import { navigateRoot } from '../navigation/navigationRef';
import type { RootStackParamList } from '../navigation/types';

type Props = { route: RouteProp<RootStackParamList, 'Destination'>; navigation: any };

const detail = {
  name: 'Eiffel Tower',
  image: 'https://images.unsplash.com/eiffel',
  city: 'Paris, France',
  rating: 4.8,
  reviewCount: 1280,
  overview:
    'The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France. Built in 1889, it is named after engineer Gustave Eiffel and is one of the most visited monuments in the world.',
  images: [
    'https://images.unsplash.com/eiffel-1',
    'https://images.unsplash.com/eiffel-2',
    'https://images.unsplash.com/eiffel-3',
  ],
};

export default function DestinationScreen({ route, navigation }: Props) {
  const { t } = useTranslation();
  const { placeId } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions?.({ headerShown: false });
  }, [navigation]);

  void placeId; // mock uses a fixed detail

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Image source={{ uri: detail.image }} style={styles.hero} />
      <View style={styles.summary}>
        <Card>
          <Text style={styles.name}>{detail.name}</Text>
          <RatingBadge rating={detail.rating} count={detail.reviewCount} />
          <Text style={styles.city}>{detail.city}</Text>
          <Text style={styles.overview}>{detail.overview}</Text>
          <Text style={styles.galleryTitle}>Gallery</Text>
          <View style={styles.gallery}>
            {detail.images.map((u, i) => (
              <Image key={i} source={{ uri: u }} style={styles.galleryImg} />
            ))}
          </View>
        </Card>
      </View>
      <MapPreview
        markers={[
          { color: 'teal', top: 50, left: 100 },
          { color: 'coral', top: 98, left: 190 },
        ]}
      />
      <ThemedButton
        title="Book Now"
        variant="teal"
        onPress={() => navigateRoot('Booking', { placeId })}
        style={{ marginTop: 16 }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  hero: { width: '100%', height: 240 },
  summary: { marginTop: -40 },
  name: { fontSize: 22, fontWeight: 800, color: colors.text },
  city: { fontSize: 13, color: colors.textSecondary, marginTop: 4 },
  overview: { fontSize: 14, color: colors.text, marginTop: 12, lineHeight: 20 },
  galleryTitle: { fontSize: 14, fontWeight: 700, color: colors.text, marginTop: 16 },
  gallery: { flexDirection: 'row', gap: 10, marginTop: 8 },
  galleryImg: { width: 80, height: 80, borderRadius: 12 },
});
