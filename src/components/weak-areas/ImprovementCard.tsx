/**
 * ImprovementCard — "GETTING STRONGER" card shown only when reliable data
 * shows a topic improving. Green semantics; never declares a topic "fixed".
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { FocusArea } from '../../features/weak-areas';
import { getWeakAreasI18n, interpolate } from './weakAreas.i18n';

interface ImprovementCardProps {
  area: FocusArea;
  language: SupportedLanguage;
  onKeepPracticing: (area: FocusArea) => void;
}

export const ImprovementCard: React.FC<ImprovementCardProps> = ({
  area,
  language,
  onKeepPracticing,
}) => {
  const t = getWeakAreasI18n(language);
  const topicLabel = language === 'ta' ? area.title.ta : area.title.en;
  const before = area.previousAccuracy ?? area.confidence;
  const after = area.confidence;

  const actionLabels: Record<string, string> = {
    learnIn2Min: t.learnIn2Min,
    continueLearning: t.continueLearning,
    seeBigPicture: t.seeBigPicture,
    tryExperiment: t.tryExperiment,
    practiceQuestions: t.practiceQuestions,
  };

  return (
    <View style={styles.card}>
      <Text style={styles.badge}>{t.gettingStronger}</Text>
      <Text style={styles.topic}>{topicLabel}</Text>
      <View style={styles.trendRow}>
        <Text style={styles.beforeText}>{before}%</Text>
        <Text style={styles.arrow}> → </Text>
        <Text style={styles.afterText}>{after}%</Text>
      </View>
      <Text style={styles.keepGoing}>{t.keepGoing}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => onKeepPracticing(area)}
        accessibilityRole="button"
        accessibilityLabel={`${t.keepPracticing}: ${topicLabel}`}
        activeOpacity={0.85}
      >
        <Text style={styles.buttonText}>
          {actionLabels[area.action.labelKey] ?? t.keepPracticing}
        </Text>
      </TouchableOpacity>
      {/* Screen-reader improvement summary */}
      <Text
        style={styles.hidden}
        accessible
        accessibilityLabel={interpolate(t.accessibility.improvement, {
          topic: topicLabel,
          before: String(before),
          after: String(after),
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.green200,
    padding: theme.spacing.base,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.green100,
    color: theme.colors.green800,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
  },
  topic: {
    ...theme.typography.h3,
    fontSize: 15,
    fontWeight: '800',
    color: theme.colors.navy900,
    marginTop: theme.spacing.xs,
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  beforeText: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.slate500,
  },
  arrow: {
    fontSize: 14,
    color: theme.colors.slate400,
  },
  afterText: {
    fontSize: 17,
    fontWeight: '800',
    color: theme.colors.green700,
  },
  keepGoing: {
    ...theme.typography.caption,
    fontSize: 12.5,
    color: theme.colors.slate600,
    marginTop: 4,
  },
  button: {
    marginTop: theme.spacing.md,
    backgroundColor: theme.colors.green50,
    borderWidth: 1,
    borderColor: theme.colors.green300,
    minHeight: 44,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.base,
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 13.5,
    fontWeight: '800',
    color: theme.colors.green800,
  },
  hidden: {
    height: 0,
    opacity: 0,
  },
});
