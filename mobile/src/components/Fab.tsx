import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from 'expo-vector-icons';
import { colors } from '../theme/colors';

export default function Fab({
  icon = 'add',
  onPress,
  style,
}: {
  icon?: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  style?: object;
}) {
  return (
    <TouchableOpacity style={[styles.fab, style]} onPress={onPress} activeOpacity={0.85}>
      <Ionicons name={icon} size={26} color={colors.white} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.coral,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
});
