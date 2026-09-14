import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from 'expo-vector-icons';
import { colors } from '../theme/colors';
import ThemedButton from '../components/ThemedButton';
import { navigateRoot } from '../navigation/navigationRef';

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Ionicons name="location-sharp" size={36} color={colors.teal} />
        <Text style={styles.logoT}>Tourousum</Text>
      </View>

      <View style={styles.inputGroup}>
        <View style={styles.inputWrap}>
          <Ionicons name="person-outline" size={20} color={colors.textSecondary} style={styles.icon} />
          <TextInput placeholder="Full name" value={name} onChangeText={setName} style={styles.input} />
        </View>
        <View style={styles.inputWrap}>
          <Ionicons name="mail-outline" size={20} color={colors.textSecondary} style={styles.icon} />
          <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" autoCapitalize="none" />
        </View>
        <View style={styles.inputWrap}>
          <Ionicons name="lock-closed-outline" size={20} color={colors.textSecondary} style={styles.icon} />
          <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry={!show} />
          <TouchableOpacity onPress={() => setShow(!show)}>
            <Ionicons name={show ? 'eye-off-outline' : 'eye-outline'} size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>

      <ThemedButton title="Create account" onPress={() => navigateRoot('Main')} />
      <TouchableOpacity onPress={() => navigateRoot('Login')}>
        <Text style={styles.link}>Already have an account? Sign in</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.beige, padding: 24, justifyContent: 'center' },
  logo: { flexDirection: 'row', alignItems: 'center', gap: 8, alignSelf: 'center', marginBottom: 32 },
  logoT: { fontSize: 24, fontWeight: 800, color: colors.teal },
  inputGroup: { gap: 12, marginBottom: 24 },
  inputWrap: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white,
    borderRadius: 16, paddingHorizontal: 12, borderWidth: 1, borderColor: colors.border,
  },
  icon: { marginRight: 8 },
  input: { flex: 1, paddingVertical: 12, fontSize: 15 },
  link: { color: colors.teal, fontSize: 14, textAlign: 'center', marginTop: 16 },
});
