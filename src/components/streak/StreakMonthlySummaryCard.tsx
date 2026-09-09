/**
 * StreakMonthlySummaryCard Component
 * Displays monthly progress statistics and learning consistency insights.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { getStreakI18n } from './streak.i18n';
import { MonthlySummary, ConsistencyInsight } from '../../features/streaks/streaks.types';

interface StreakMonthlySummaryCardProps {
  summary: MonthlySummary;
  consistency: ConsistencyInsight;
  language?: SupportedLanguage;
}

export const StreakMonthlySummaryCard: React.FC<StreakMonthlySummaryCardProps> = ({
  summary,
  consistency,
  language = 'en',
}) => {
  const t = getStreakI18n(language);
  const consistencyMessage = language === 'ta' ? consistency.messageTa : consistency.messageEn;

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{t.monthlySummary.toUpperCase()}</Text>
        <Text style={styles.monthTag}>
          {language === 'ta' ? summary.monthNameTa : summary.monthNameEn} {summary.year}
        </Text>
      </View>

      {/* 3 Metric Summary Blocks */}
      <View style={styles.metricsRow}>
        <View style={styles.metricBlock}>
          <Text style={styles.metricIcon}>📅</Text>
          <Text style={styles.metricValue}>{summary.activeDaysCount}</Text>
          <Text style={styles.metricLabel}>{t.activeDaysLabel}</Text>
        </View>

        <View style={styles.metricDivider} />

        <View style={styles.metricBlock}>
          <Text style={styles.metricIcon}>⚡</Text>
          <Text style={styles.metricValue}>{summary.totalActivitiesCount}</Text>
          <Text style={styles.metricLabel}>{t.activitiesCompletedLabel}</Text>
        </View>

        <View style={styles.metricDivider} />

        <View style={styles.metricBlock}>
          <Text style={styles.metricIcon}>🔥</Text>
          <Text style={styles.metricValue}>{summary.bestStreakInMonth}</Text>
          <Text style={styles.metricLabel}>{t.bestStreakLabel}</Text>
        </View>
      </View>

      {/* Consistency Insight Banner */}
      <View style={styles.consistencyBanner}>
        <Text style={styles.consistencyIcon}>💡</Text>
        <View style={styles.consistencyContent}>
          <Text style={styles.consistencyTitle}>{t.consistencyTitle}</Text>
          <Text style={styles.consistencyMessage}>{consistencyMessage}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surfaceCardLight,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.gray200,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  title: {
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.slate500,
    letterSpacing: 0.5,
  },
  monthTag: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.actionPrimary,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.gray50,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: theme.colors.gray200,
  },
  metricBlock: {
    flex: 1,
    alignItems: 'center',
  },
  metricIcon: {
    fontSize: 18,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 22,
    fontWeight: '800',
    color: theme.colors.navy900,
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: theme.colors.slate500,
    marginTop: 2,
    textAlign: 'center',
  },
  metricDivider: {
    width: 1,
    height: 36,
    backgroundColor: theme.colors.gray200,
  },
  consistencyBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.blue50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.blue200,
    padding: 12,
    marginTop: 12,
  },
  consistencyIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  consistencyContent: {
    flex: 1,
  },
  consistencyTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.actionPrimary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  consistencyMessage: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.navy900,
    marginTop: 2,
    lineHeight: 18,
  },
});
