/**
 * DailyGoalProgress Component
 * Visual progress bar showing completion status.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { DailyGoalProgress as DailyGoalProgressType } from '../../features/daily-goal';

interface DailyGoalProgressProps {
  progress: DailyGoalProgressType;
  status: 'active' | 'completed' | 'claimed';
  language: SupportedLanguage;
}

export const DailyGoalProgress: React.FC<DailyGoalProgressProps> = ({
  progress,
  status,
  language,
}) => {
  const isTamil = language === 'ta';
  const percent = progress.target > 0 ? (progress.current / progress.target) * 100 : 0;
  const isComplete = status === 'completed' || status === 'claimed';

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>
          {isTamil
            ? `முடிந்தது: {progress.current} / {progress.target}`
            : `Progress: {progress.current} / {progress.target}`}
        </Text>
        <Text style={[styles.percent, { color: isComplete ? theme.colors.success : theme.colors.actionPrimary }]}>
          {Math.round(percent)}%
        </Text>
      </View>
      <View style={styles.track}>
        <View
          style={[
            styles.fill,
            {
              width: `${Math.min(100, percent)}%`,
              backgroundColor: isComplete ? theme.colors.success : theme.colors.actionPrimary,
            },
          ]}
        />
      </View>
      <Text style={[styles.motivation, { color: isComplete ? theme.colors.success : theme.colors.slate500 }]}>
        {isComplete
          ? isTamil
            ? 'நல்ல வேலை! இலக்கு நிறைவேற்றப்பட்டது!'
            : 'Great work! Goal completed!'
          : isTamil
          ? `மேலும் {progress.target - progress.current} செயல்பாடு{progress.target - progress.current > 1 ? '்கள்' : ''} வேண்டும்`
          : `${progress.target - progress.current} more activit${progress.target - progress.current === 1 ? 'y' : 'ies'} to go`}
        </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    ...theme.typography.body,
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.navy900,
  },
  percent: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '800',
  },
  track: {
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.gray200,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 5,
  },
  motivation: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
});