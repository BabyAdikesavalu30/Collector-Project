/**
 * Escape Room Boundary Route (/escape-room)
 * Thin redirect alias to the full Lab Escape game at /games/lab-escape.
 * Kept as a route so existing links (Home quick actions, notifications,
 * deep links) continue to work without a separate, redundant experience.
 */

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { theme } from '../src/theme';

export default function EscapeRoomBoundary() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/games/lab-escape');
  }, [router]);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      <ActivityIndicator size="large" color={theme.colors.actionPrimary} />
      <Text style={styles.label}>Escape Room</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.pearlWhite,
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  label: {
    ...theme.typography.caption,
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.slate600,
  },
});