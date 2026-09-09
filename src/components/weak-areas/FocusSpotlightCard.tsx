/**
 * FocusSpotlightCard — compact Home "FOCUS ON" card.
 * Rendered only when a real focus area exists; otherwise the Home screen
 * shows its normal discovery recommendation.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { FocusArea } from '../../features/weak-areas';
import { getWeakAreasI18n } from './weakAreas.i18n';
import { getSubjectTitle } from '../../features/weak-areas';

interface FocusSpotlightCardProps {
  area: FocusArea;
  language: SupportedLanguage;
  onPractice: (area: FocusArea) => void;
}

export const FocusSpotlightCard: React.FC<FocusSpotlightCardProps> = ({
  area,
  language,
  onPractice,
}) => {
  const t = getWeakAreasI18n(language);
  const topicLabel = language === 'ta' ? area.title.ta : area.title.en;
  const subjectTitle = getSubjectTitle(area.subjectId);
  const subjectLabel = language === 'ta' ? subjectTitle.ta : subjectTitle.en;

  return (
    <View style={styles.card}>
      <Text style={styles.badge}>{t.focusOn}</Text>
      <Text style={styles.topic} numberOfLines={2}>
        {topicLabel}
      </Text>
      <View style={styles.metaRow}>
        <Text style={styles.subject}>{subjectLabel}</Text>
        <Text style={styles.confidence}>{area.confidence}%</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => onPractice(area)}
        accessibilityRole="button"
        accessibilityLabel={`${t.focusOnCta}: ${topicLabel}, ${area.confidence}%`}
        activeOpacity={0.85}
      >
        <Text style={styles.buttonText}>{t.focusOnCta}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.purple200,
    padding: theme.spacing.base,
    marginVertical: theme.spacing.xs,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  badge: {
    alignSelf: 'flex-start',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    color: theme.colors.brandPrimary,
    backgroundColor: theme.colors.purple100,
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
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  subject: {
    fontSize: 12,
    color: theme.colors.slate600,
    fontWeight: '600',
  },
  confidence: {
    fontSize: 15,
    fontWeight: '800',
    color: theme.colors.actionPrimary,
  },
  button: {
    marginTop: theme.spacing.sm,
    backgroundColor: theme.colors.actionPrimary,
    minHeight: 44,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 13,
    fontWeight: '800',
    color: theme.colors.textOnAction,
  },
});
