import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { RouteProp } from '@react-navigation/native';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuthStore } from '../store/useAuthStore';
import { navigateRoot } from '../navigation/navigationRef';
import { Ionicons } from '@expo/vector-icons';
import type { RootStackParamList } from '../navigation/types';

type Props = {
  route: RouteProp<RootStackParamList, 'AddReview'>;
  navigation: any;
};

export default function AddReviewScreen({ route, navigation }: Props) {
  const { t } = useTranslation();
  const { placeId } = route.params;
  const uid = useAuthStore((s) => s.user?.uid);
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');

  const submit = async () => {
    if (!uid) {
      navigation.navigate('Login');
      return;
    }
    if (!text.trim()) return;
    await addDoc(collection(db, 'reviews'), {
      placeId,
      authorId: uid,
      rating,
      text,
      photos: [],
      status: 'pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    navigateRoot('Reviews', { placeId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{t('rating')}</Text>
      <View style={styles.stars}>
        {[1, 2, 3, 4, 5].map((i) => (
          <TouchableOpacity key={i} onPress={() => setRating(i)}>
            <Ionicons name={i <= rating ? 'star' : 'star-outline'} size={28} color="#f59e0b" />
          </TouchableOpacity>
        ))}
      </View>
      <TextInput
        placeholder={t('writeReview')}
        value={text}
        onChangeText={setText}
        multiline
        style={styles.textarea}
        textAlignVertical="top"
      />
      <TouchableOpacity style={styles.button} onPress={submit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff', padding: 16 },
  label: { fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 8 },
  stars: { flexDirection: 'row', gap: 4, marginBottom: 16 },
  textarea: { borderWidth: 1, borderColor: '#d1d5db', borderRadius: 10, padding: 12, fontSize: 15, minHeight: 120 },
  button: { backgroundColor: '#1e3a8a', padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 16 },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: 600 },
});
