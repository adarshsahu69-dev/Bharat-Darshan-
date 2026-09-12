import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../store/useAuthStore';
import { navigateRoot } from '../navigation/navigationRef';

export default function SignupScreen({ navigation }: { navigation: any }) {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const signup = useAuthStore((s) => s.signup);

  const handleSignup = async () => {
    try {
      await signup(name, email, password);
      navigateRoot('Main');
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder={t('auth.name')} value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder={t('auth.email')} value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" style={styles.input} />
      <TextInput placeholder={t('auth.password')} value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>{t('auth.signup')}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>{t('auth.haveAccount')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#ffffff' },
  input: { borderWidth: 1, borderColor: '#d1d5db', borderRadius: 10, padding: 12, marginBottom: 12, fontSize: 15 },
  button: { backgroundColor: '#1e3a8a', padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 4 },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: 600 },
  linkText: { color: '#1e3a8a', fontSize: 14, marginTop: 10 },
});
