import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { navigateRoot } from '../navigation/navigationRef';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import type { MainTabParamList } from '../navigation/types';

const icons: Record<MainTabParamList[keyof MainTabParamList], keyof typeof Ionicons.glyphMap> = {
  Home: 'home',
  Explore: 'search',
  Itinerary: 'calendar',
  Bookings: 'ticket-outline',
  Profile: 'person',
};

export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.bar}>
        {state.routes.map((route, idx) => {
          const isFocused = state.index === idx;
          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              onPress={() => navigation.navigate(route.name as any, route.params as any)}
              style={styles.tab}
            >
              <Ionicons
                name={icons[route.name as keyof MainTabParamList]}
                size={isFocused ? 24 : 20}
                color={isFocused ? colors.teal : colors.textSecondary}
              />
              <Text style={[styles.label, { color: isFocused ? colors.teal : colors.textSecondary }]}>
                {route.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigateRoot('ActiveTrip')}
        accessibilityRole="button"
        accessibilityLabel="Active trip"
      >
        <Ionicons name="airplane" size={26} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    backgroundColor: colors.white,
    borderTopColor: colors.border,
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingBottom: 4,
  },
  bar: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', height: 56 },
  tab: { alignItems: 'center', gap: 2 },
  label: { fontSize: 11, fontWeight: 600, marginTop: 2 },
  fab: {
    position: 'absolute',
    top: -28,
    alignSelf: 'center',
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
