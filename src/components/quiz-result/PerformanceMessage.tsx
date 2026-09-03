/**
 * PerformanceMessage Component
 * Displays adaptive motivational title (with personalized student name) and supporting copy.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import { getPerformanceTier } from '../../features/quiz';

interface PerformanceMessageProps {
  percentage: number;
  studentName?: string | null;
  t: {
    greatJob: string;
    greatJobName: string;
    excellentWork: string;
    goodEffort: string;
    keepPracticing: string;
    completedSubtitle: string;
  };
}

export const PerformanceMessage: React.FC<PerformanceMessageProps> = ({
  percentage,
  studentName,
  t,
}) => {
  const tier = getPerformanceTier(percentage);

  let title = t.greatJob;
  if (studentName && studentName.trim().length > 0) {
    const firstName = studentName.trim().split(' ')[0];
    title = t.greatJobName.replace('{name}', firstName);
  } else {
    if (tier === 'excellent') title = t.excellentWork;
    else if (tier === 'great') title = t.greatJob;
    else if (tier === 'good') title = t.goodEffort;
    else title = t.keepPracticing;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.subtitleText}>{t.completedSubtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
  },
  titleText: {
    ...theme.typography.h2,
    fontSize: 22,
    fontWeight: '800',
    color: theme.colors.navy900,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  subtitleText: {
    ...theme.typography.body,
    fontSize: 14,
    color: theme.colors.slate600,
    textAlign: 'center',
  },
});
