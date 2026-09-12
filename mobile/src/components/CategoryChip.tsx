import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import type { Category } from '@bharat-darshan/types';

export default function CategoryChip({
  category,
  selected,
  onPress,
}: {
  category: Category;
  selected?: boolean;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.chip, selected && styles.selected]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.label, selected && styles.selectedLabel]}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    marginHorizontal: 6,
  },
  selected: { backgroundColor: '#1e3a8a' },
  label: { fontSize: 13, color: '#374151', fontWeight: 500 },
  selectedLabel: { color: '#ffffff' },
});
