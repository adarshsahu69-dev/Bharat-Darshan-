import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';

export default function ThemedButton({
  title,
  onPress,
  variant = 'coral',
  style,
  textStyle,
}: {
  title: string;
  onPress?: () => void;
  variant?: 'coral' | 'teal' | 'ghost';
  style?: object;
  textStyle?: object;
}) {
  const bg =
    variant === 'teal' ? colors.teal : variant === 'coral' ? colors.coral : 'transparent';
  const color = variant === 'ghost' ? colors.teal : colors.white;
  return (
    <TouchableOpacity
      style={[
        styles.btn,
        { backgroundColor: bg, borderColor: variant === 'ghost' ? colors.teal : bg },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Text style={[styles.label, { color }, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
  },
  label: { fontSize: 16, fontWeight: 700 },
});
