import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from 'expo-vector-icons';
import { colors } from '../theme/colors';
import ThemedButton from '../components/ThemedButton';
import { navigateRoot } from '../navigation/navigationRef';

export default function LoginScreen() {
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

      <View style={styles.social}>
        <TouchableOpacity style={[styles.socialBtn, styles.googleBadge]}>
          <Ionicons name="logo-google" size={18} color="#111827" />
          <Text style={styles.socialLabel}>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.socialBtn, styles.facebookBadge]}>
          <Ionicons name="logo-facebook" size={20} color={colors.white} />
          <Text style={styles.socialLabelWhite}>Facebook</Text>
        </TouchableOpacity>
      </View>

      <ThemedButton title="Sign Up" onPress={() => navigateRoot('Main')} />
      <TouchableOpacity onPress={() => navigateRoot('Signup')}>
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
  social: { flexDirection: 'row', gap: 12, justifyContent: 'center', marginBottom: 24 },
  socialBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 10, paddingHorizontal: 18, borderRadius: 24, borderWidth: 1, borderColor: colors.border },
  googleBadge: { backgroundColor: colors.white },
  facebookBadge: { backgroundColor: '#1877F2' },
  socialLabel: { fontSize: 13, color: colors.text, fontWeight: 600 },
  socialLabelWhite: { fontSize: 13, color: colors.white, fontWeight: 600 },
  link: { color: colors.teal, fontSize: 14, textAlign: 'center', marginTop: 16 },
});
