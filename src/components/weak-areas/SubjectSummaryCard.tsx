/**
 * SubjectSummaryCard — subject-level overview row.
 * "Strong overall" / "Not enough activity yet" states; never comparative.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { SubjectFocusSummary } from '../../features/weak-areas';
import { getSubjectTitle } from '../../features/weak-areas';
import { getWeakAreasI18n } from './weakAreas.i18n';

interface SubjectSummaryCardProps {
  summary: SubjectFocusSummary;
  language: SupportedLanguage;
}

export const SubjectSummaryCard: React.FC<SubjectSummaryCardProps> = ({
  summary,
  language,
}) => {
  const t = getWeakAreasI18n(language);
  const subjectTitle = getSubjectTitle(summary.subjectId);
  const subjectLabel = language === 'ta' ? subjectTitle.ta : subjectTitle.en;

  return (
    <View style={styles.row} accessible accessibilityRole="text">
      <View style={styles.iconBox}>
        <Text style={styles.icon}>
          {summary.insufficientData ? '🌱' : summary.strongOverall ? '🌟' : '🎯'}
        </Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{subjectLabel}</Text>
        <Text style={styles.meta}>
          {summary.insufficientData
            ? t.notEnoughData
            : summary.strongOverall
              ? t.keepExploring
              : `${summary.focusAreaCount} ${t.focusAreasCount.toLowerCase()}`}
        </Text>
      </View>
      <Text
        style={[
          styles.accuracy,
          { color: summary.strongOverall ? theme.colors.green700 : theme.colors.actionPrimary },
        ]}
      >
        {summary.averageAccuracy}%
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.border,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: theme.colors.blue50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.sm,
  },
  icon: {
    fontSize: 18,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.navy900,
  },
  meta: {
    fontSize: 11.5,
    color: theme.colors.slate600,
    marginTop: 1,
  },
  accuracy: {
    fontSize: 15,
    fontWeight: '800',
  },
});
