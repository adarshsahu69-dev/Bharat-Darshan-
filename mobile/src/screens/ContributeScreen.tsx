import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuthStore } from '../store/useAuthStore';
import { Ionicons } from '@expo/vector-icons';

export default function ContributeScreen({ route, navigation }: { route: any; navigation: any }) {
  const { t } = useTranslation();
  const uid = useAuthStore((s) => s.user?.uid);
  const placeId = route?.params?.placeId ?? null;
  const [note, setNote] = useState('');

  const submit = async () => {
    if (!uid) {
      navigation.navigate('Login');
      return;
    }
    await addDoc(collection(db, 'contributions'), {
      type: 'edit_place',
      entityId: placeId ?? '',
      authorId: uid,
      status: 'pending',
      changes: { note },
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    Alert.alert(t('contribute'), 'Thanks for your contribution!');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('contribute')}</Text>
      <Text style={styles.label}>Note</Text>
      <TextInput
        placeholder="Describe the change, correction, or new photo..."
        value={note}
        onChangeText={setNote}
        multiline
        style={styles.textarea}
        textAlignVertical="top"
      />
      <TouchableOpacity style={styles.button} onPress={submit}>
        <Ionicons name="send" size={18} color="#ffffff" />
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff', padding: 16 },
  title: { fontSize: 22, fontWeight: 700, color: '#111827', marginBottom: 12 },
  label: { fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 6 },
  textarea: { borderWidth: 1, borderColor: '#d1d5db', borderRadius: 10, padding: 12, fontSize: 15, minHeight: 140 },
  button: { flexDirection: 'row', gap: 6, backgroundColor: '#1e3a8a', padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 16 },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: 600 },
});
