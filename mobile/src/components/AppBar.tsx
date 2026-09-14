import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from 'expo-vector-icons';
import { colors } from '../theme/colors';
import { goBack } from '../navigation/navigationRef';

export default function AppBar({
  title,
  right,
  showBack = true,
}: {
  title: string;
  right?: React.ReactNode;
  showBack?: boolean;
}) {
  return (
    <View style={styles.header}>
      {showBack ? (
        <TouchableOpacity onPress={goBack}>
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 32 }} />
      )}
      <Text style={styles.title}>{title}</Text>
      <View>{right}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.teal,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 56,
    borderRadius: 16,
    margin: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  title: { color: colors.white, fontSize: 19, fontWeight: 700, flex: 1, textAlign: 'center' },
});
