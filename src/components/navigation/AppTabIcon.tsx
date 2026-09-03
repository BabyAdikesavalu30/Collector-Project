/**
 * AppTabIcon Component
 * Custom geometric outline vector icons for the 4 canonical tabs:
 * 1. Home (House with triangular roof and doorway)
 * 2. Learn (Open book with center spine and dual curved pages)
 * 3. Games (Gamepad controller with D-pad and dual action buttons)
 * 4. Profile (Person avatar with head and curved shoulders arc)
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppTab } from './navigation.types';

// ---------------------------------------------------------------------------
// 1. Home Vector Icon
// ---------------------------------------------------------------------------
export const HomeNavIcon: React.FC<{ color?: string }> = ({ color = '#0F4C81' }) => (
  <View style={styles.iconBox}>
    <View style={[styles.roofTriangle, { borderColor: color }]} />
    <View style={[styles.houseWalls, { borderColor: color }]}>
      <View style={[styles.houseDoor, { borderColor: color }]} />
    </View>
  </View>
);

// ---------------------------------------------------------------------------
// 2. Learn Vector Icon (Open Book)
// ---------------------------------------------------------------------------
export const LearnNavIcon: React.FC<{ color?: string }> = ({ color = '#0D5C3A' }) => (
  <View style={[styles.iconBox, styles.bookRow]}>
    <View style={[styles.bookPageLeft, { borderColor: color }]} />
    <View style={[styles.bookSpine, { backgroundColor: color }]} />
    <View style={[styles.bookPageRight, { borderColor: color }]} />
  </View>
);

// ---------------------------------------------------------------------------
// 3. Games Vector Icon (Gamepad Controller)
// ---------------------------------------------------------------------------
export const GamesNavIcon: React.FC<{ color?: string }> = ({ color = '#8B3A1C' }) => (
  <View style={[styles.controllerPill, { borderColor: color }]}>
    <View style={styles.dpadBox}>
      <View style={[styles.dpadHorizontal, { backgroundColor: color }]} />
      <View style={[styles.dpadVertical, { backgroundColor: color }]} />
    </View>
    <View style={styles.buttonBox}>
      <View style={[styles.actionCircle1, { borderColor: color }]} />
      <View style={[styles.actionCircle2, { borderColor: color }]} />
    </View>
  </View>
);

// ---------------------------------------------------------------------------
// 4. Profile Vector Icon (Person)
// ---------------------------------------------------------------------------
export const ProfileNavIcon: React.FC<{ color?: string }> = ({ color = '#782245' }) => (
  <View style={styles.profileBox}>
    <View style={[styles.profileHead, { borderColor: color }]} />
    <View style={[styles.profileShoulders, { borderColor: color }]}>
      <View style={styles.profileShouldersInner} />
    </View>
  </View>
);

// ---------------------------------------------------------------------------
// Unified AppTabIcon
// ---------------------------------------------------------------------------
export const AppTabIcon: React.FC<{ tab: AppTab; color: string }> = ({ tab, color }) => {
  switch (tab) {
    case 'home':
      return <HomeNavIcon color={color} />;
    case 'learn':
      return <LearnNavIcon color={color} />;
    case 'games':
      return <GamesNavIcon color={color} />;
    case 'profile':
      return <ProfileNavIcon color={color} />;
    default:
      return null;
  }
};

const styles = StyleSheet.create({
  iconBox: {
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  // Home
  roofTriangle: {
    width: 12,
    height: 12,
    borderTopWidth: 1.8,
    borderLeftWidth: 1.8,
    transform: [{ rotate: '45deg' }],
    position: 'absolute',
    top: 0,
  },
  houseWalls: {
    width: 11,
    height: 8,
    borderLeftWidth: 1.8,
    borderRightWidth: 1.8,
    borderBottomWidth: 1.8,
    position: 'absolute',
    bottom: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  houseDoor: {
    width: 4,
    height: 5,
    borderTopLeftRadius: 1.5,
    borderTopRightRadius: 1.5,
    borderWidth: 1.4,
    borderBottomWidth: 0,
  },
  // Learn (Open Book)
  bookRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookPageLeft: {
    width: 7.5,
    height: 12,
    borderWidth: 1.6,
    borderRightWidth: 0,
    borderTopLeftRadius: 1.5,
    borderTopRightRadius: 2.5,
    borderBottomLeftRadius: 1.5,
    borderBottomRightRadius: 2.5,
  },
  bookSpine: {
    width: 1.6,
    height: 12.5,
    borderRadius: 0.8,
  },
  bookPageRight: {
    width: 7.5,
    height: 12,
    borderWidth: 1.6,
    borderLeftWidth: 0,
    borderTopRightRadius: 1.5,
    borderTopLeftRadius: 2.5,
    borderBottomRightRadius: 1.5,
    borderBottomLeftRadius: 2.5,
  },
  // Games (Controller)
  controllerPill: {
    width: 22,
    height: 12.5,
    borderRadius: 6.5,
    borderWidth: 1.6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 2.5,
  },
  dpadBox: {
    width: 6,
    height: 6,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  dpadHorizontal: {
    width: 5.5,
    height: 1.6,
    position: 'absolute',
    borderRadius: 0.5,
  },
  dpadVertical: {
    width: 1.6,
    height: 5.5,
    position: 'absolute',
    borderRadius: 0.5,
  },
  buttonBox: {
    width: 6,
    height: 6,
    position: 'relative',
  },
  actionCircle1: {
    width: 2.5,
    height: 2.5,
    borderRadius: 1.25,
    borderWidth: 1.0,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  actionCircle2: {
    width: 2.5,
    height: 2.5,
    borderRadius: 1.25,
    borderWidth: 1.0,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  // Profile (Person)
  profileBox: {
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHead: {
    width: 8.5,
    height: 8.5,
    borderRadius: 4.25,
    borderWidth: 1.8,
    marginBottom: 1,
  },
  profileShoulders: {
    width: 15,
    height: 6.5,
    borderTopLeftRadius: 7.5,
    borderTopRightRadius: 7.5,
    borderTopWidth: 1.8,
    borderLeftWidth: 1.8,
    borderRightWidth: 1.8,
    borderBottomWidth: 0,
  },
  profileShouldersInner: {
    flex: 1,
  },
});
