/**
 * SpinPointer Component
 * Stationary downward indicator pointing to the active winning segment at 12 o'clock.
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../theme';

export const SpinPointer: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Outer Triangle Pointer */}
      <View style={styles.pointerTriangle} />
      {/* Inner Highlight Dot */}
      <View style={styles.pointerDot} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    marginBottom: -12, // Overlaps wheel top edge
  },
  pointerTriangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 14,
    borderRightWidth: 14,
    borderTopWidth: 24,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: theme.colors.navy900,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
  },
  pointerDot: {
    position: 'absolute',
    top: 4,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F59E0B', // Gold accent dot
  },
});
