/**
 * ContinueLearningCard Component
 * Displays the current in-progress science topic, active progression, and quick resume action.
 * Clean White card on Pearl White base.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { ContinueTopic } from '../../features/home/home.types';
import { SupportedLanguage, getTranslation } from '../../config/i18n';

interface ContinueLearningCardProps {
  topic: ContinueTopic;
  language?: SupportedLanguage;
  onPress: () => void;
}

export const ContinueLearningCard: React.FC<ContinueLearningCardProps> = ({
  topic,
  language = 'en',
  onPress,
}) => {
  const t = getTranslation(language).home;
  const clampedProgress = Math.min(100, Math.max(0, topic.progressPercentage));

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.85}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`${t.continueLearning}: ${topic.topicTitle}. ${topic.subject}. ${clampedProgress} percent complete.`}
      accessibilityHint={t.accessibility.continueLearningHint}
    >
      {/* Header Row: Subject Badge + Section Label */}
      <View style={styles.topRow}>
        <Text style={styles.sectionHeader}>{t.continueLearning}</Text>
        <View style={styles.subjectBadge}>
          <Text style={styles.subjectBadgeText}>{topic.subject}</Text>
        </View>
      </View>

      {/* Topic Title */}
      <Text style={styles.topicTitle} numberOfLines={2}>
        {topic.topicTitle}
      </Text>

      {/* Progress Track (Active Learning Progress: Blue) */}
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${clampedProgress}%` }]} />
      </View>

      {/* Bottom Info Row */}
      <View style={styles.bottomRow}>
        <Text style={styles.progressDetail}>
          {clampedProgress}% {t.completed}
        </Text>

        <View style={styles.actionPill}>
          <Text style={styles.actionText}>{t.continueAction}</Text>
          <Text style={styles.actionArrow}>→</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.base,
    marginVertical: theme.spacing.xs,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  sectionHeader: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.navy900,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  subjectBadge: {
    backgroundColor: theme.colors.purple100,
    borderWidth: 1,
    borderColor: theme.colors.purple200,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.full,
  },
  subjectBadgeText: {
    ...theme.typography.caption,
    fontSize: 10.5,
    fontWeight: '700',
    color: theme.colors.brandPrimary,
  },
  topicTitle: {
    ...theme.typography.h3,
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.navy900,
    marginVertical: 4,
  },
  track: {
    width: '100%',
    height: 6,
    backgroundColor: theme.colors.gray100,
    borderRadius: 3,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginTop: 4,
    marginBottom: 8,
  },
  fill: {
    height: '100%',
    backgroundColor: theme.colors.actionPrimary,
    borderRadius: 3,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressDetail: {
    ...theme.typography.caption,
    fontSize: 11.5,
    color: theme.colors.slate600,
  },
  actionPill: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    ...theme.typography.caption,
    fontSize: 13,
    fontWeight: '800',
    color: theme.colors.actionPrimary,
    marginRight: 4,
  },
  actionArrow: {
    fontSize: 14,
    color: theme.colors.actionPrimary,
    fontWeight: '800',
  },
});
