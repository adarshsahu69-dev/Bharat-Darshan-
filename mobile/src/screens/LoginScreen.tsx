import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../store/useAuthStore';
import { navigateRoot } from '../navigation/navigationRef';

export default function LoginScreen({ navigation }: { navigation: any }) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const signIn = useAuthStore((s) => s.signIn);
  const signInAnonymous = useAuthStore((s) => s.signInAnonymous);

  const handleLogin = async () => {
    try {
      await signIn(email, password);
      navigateRoot('Main');
    } catch (e: any) {
      alert(e.message);
    }
  };

  const handleGuest = async () => {
    try {
      await signInAnonymous();
      navigateRoot('Main');
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder={t('auth.email')} value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" style={styles.input} />
      <TextInput placeholder={t('auth.password')} value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>{t('auth.login')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={handleGuest}>
        <Text style={styles.linkText}>{t('auth.guest')}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.linkText}>{t('auth.noAccount')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#ffffff' },
  input: { borderWidth: 1, borderColor: '#d1d5db', borderRadius: 10, padding: 12, marginBottom: 12, fontSize: 15 },
  button: { backgroundColor: '#1e3a8a', padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 4 },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: 600 },
  link: { alignItems: 'center', marginVertical: 10 },
  linkText: { color: '#1e3a8a', fontSize: 14 },
});
