import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const { t } = useTranslation();
  const rows = [
    { id: 'notifications', icon: 'notifications-outline', label: t('notifications'), iconColor: colors.teal },
    { id: 'prefs', icon: 'options-outline', label: 'Travel Preferences', iconColor: colors.teal },
    { id: 'credits', icon: 'card-outline', label: 'Credits', iconColor: colors.teal },
    { id: 'settings', icon: 'settings-outline', label: t('settings'), iconColor: colors.teal },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Image source={{ uri: 'https://i.pravatar.cc/96' }} style={styles.avatar} />
        <Text style={styles.name}>Adarsh Sahu</Text>
        <Text style={styles.email}>adarsh@example.com</Text>
      </View>
      <View style={styles.list}>
        {rows.map((r) => (
          <TouchableOpacity key={r.id} style={styles.row} onPress={() => {}}>
            <Ionicons name={r.icon} size={20} color={r.iconColor} style={styles.rowIcon} />
            <Text style={styles.rowLabel}>{r.label}</Text>
            <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  banner: { backgroundColor: colors.teal, alignItems: 'center', paddingTop: 48, paddingBottom: 28 },
  avatar: { width: 96, height: 96, borderRadius: 48, borderWidth: 4, borderColor: colors.white, marginBottom: 8 },
  name: { fontSize: 19, fontWeight: 800, color: colors.white },
  email: { fontSize: 13, color: colors.white, opacity: 0.9, marginTop: 2 },
  list: { backgroundColor: colors.beige, borderRadius: 16, margin: 16 },
  row: { flexDirection: 'row', alignItems: 'center', padding: 14, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
  rowIcon: { marginRight: 12 },
  rowLabel: { fontSize: 15, color: colors.text, flex: 1 },
});
