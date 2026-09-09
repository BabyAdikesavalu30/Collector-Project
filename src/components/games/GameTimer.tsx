/**
 * GameTimer Component
 * Isolated timer component that updates its own display every second without causing parent or game board re-renders.
 */

import React, { useState, useEffect, useRef } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { theme } from '../../theme';

interface GameTimerProps {
  isActive: boolean;
  initialSeconds?: number;
  onTimeUpdate?: (seconds: number) => void;
}

export const GameTimer: React.FC<GameTimerProps> = ({
  isActive,
  initialSeconds = 0,
  onTimeUpdate,
}) => {
  const [elapsed, setElapsed] = useState<number>(initialSeconds);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setElapsed(initialSeconds);
  }, [initialSeconds]);

  const onTimeUpdateRef = useRef(onTimeUpdate);
  onTimeUpdateRef.current = onTimeUpdate;

  useEffect(() => {
    if (!isActive) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setInterval(() => {
      setElapsed((prev) => {
        const next = prev + 1;
        if (onTimeUpdateRef.current) onTimeUpdateRef.current(next);
        return next;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isActive]);

  const m = Math.floor(elapsed / 60);
  const s = elapsed % 60;
  const formatted = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

  return (
    <View
      style={styles.container}
      accessible={true}
      accessibilityRole="text"
      accessibilityLabel={`Elapsed time ${m} minutes ${s} seconds`}
    >
      <Text style={styles.icon}>⏱️</Text>
      <Text style={styles.text}>{formatted}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 12,
    marginRight: 3,
  },
  text: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.slate600,
  },
});
