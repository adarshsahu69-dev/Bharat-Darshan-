import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import ThemedButton from '../components/ThemedButton';
import { navigateRoot } from '../navigation/navigationRef';

const { width } = Dimensions.get('window');

export default function OnboardingScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.illustration}>
        <View style={styles.traveler} />
        <View style={styles.backpack} />
      </View>
      <Text style={styles.headline}>Discover Your Adventure</Text>
      <View style={styles.footer}>
        <ThemedButton title="Get Started" onPress={() => navigateRoot('Login')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white, alignItems: 'center', paddingHorizontal: 24 },
  illustration: {
    width: width - 48,
    height: 260,
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  traveler: {
    width: 56, height: 56, borderRadius: 28, backgroundColor: '#CBD5E1', marginBottom: 12,
    alignSelf: 'flex-start', marginLeft: 16,
  },
  backpack: {
    width: 48, height: 48, borderRadius: 8, backgroundColor: '#94A3C4', alignSelf: 'flex-end', marginRight: 16,
  },
  headline: { fontSize: 28, fontWeight: 800, color: colors.text, textAlign: 'center', marginVertical: 24 },
  footer: { marginTop: 'auto', width: '100%', paddingBottom: 24 },
});
