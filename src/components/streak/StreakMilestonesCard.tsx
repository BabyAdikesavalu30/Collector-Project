/**
 * StreakMilestonesCard Component
 * Displays the student's streak milestone achievements and next upcoming targets.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { getStreakI18n, interpolateText } from './streak.i18n';
import { MilestoneStatus } from '../../features/streaks/streaks.types';

interface StreakMilestonesCardProps {
  milestones: MilestoneStatus[];
  currentStreak: number;
  language?: SupportedLanguage;
}

export const StreakMilestonesCard: React.FC<StreakMilestonesCardProps> = ({
  milestones,
  currentStreak,
  language = 'en',
}) => {
  const t = getStreakI18n(language);

  // Find the next upcoming milestone to highlight
  const nextMilestone = milestones.find((m) => m.isNext);

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{t.milestonesTitle.toUpperCase()}</Text>
      </View>

      {/* Next Milestone Highlight Banner */}
      {nextMilestone && (
        <View style={styles.nextBanner}>
          <View style={styles.nextHeader}>
            <Text style={styles.nextTitle}>
              {language === 'ta'
                ? nextMilestone.milestone.titleTa
                : nextMilestone.milestone.titleEn}
            </Text>
            <Text style={styles.nextDaysRemaining}>
              {nextMilestone.daysRemaining} {t.daysRemaining}
            </Text>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: `${nextMilestone.progressPct}%` },
              ]}
            />
          </View>
        </View>
      )}

      {/* Horizontal / Grid list of milestone chips */}
      <View style={styles.chipsContainer}>
        {milestones.map((item) => {
          const title =
            language === 'ta' ? item.milestone.titleTa : item.milestone.titleEn;

          return (
            <View
              key={item.milestone.days}
              style={[
                styles.chip,
                item.isReached && styles.chipReached,
                item.isNext && styles.chipNext,
              ]}
              accessible={true}
              accessibilityRole="text"
              accessibilityLabel={`${title}, ${
                item.isReached ? t.milestoneReached : `${item.daysRemaining} ${t.daysRemaining}`
              }`}
            >
              <Text style={styles.chipIcon}>
                {item.isReached ? '🔥' : item.milestone.icon}
              </Text>
              <Text
                style={[
                  styles.chipDays,
                  item.isReached && styles.chipDaysReached,
                  item.isNext && styles.chipDaysNext,
                ]}
              >
                {item.milestone.days}D
              </Text>
              {item.isReached && (
                <View style={styles.checkmarkBadge}>
                  <Text style={styles.checkmarkText}>✓</Text>
                </View>
              )}
            </View>
          );
        })}
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
    marginBottom: 12,
  },
  title: {
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.slate500,
    letterSpacing: 0.5,
  },
  nextBanner: {
    backgroundColor: theme.colors.purple50,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: theme.colors.purple200,
    padding: 12,
    marginBottom: 14,
  },
  nextHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  nextTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.purple900,
  },
  nextDaysRemaining: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.purple700,
  },
  progressTrack: {
    height: 6,
    backgroundColor: theme.colors.purple200,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.purple600,
    borderRadius: 3,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'flex-start',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.gray100,
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: theme.colors.gray200,
    opacity: 0.75,
  },
  chipReached: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FDE68A',
    opacity: 1,
  },
  chipNext: {
    backgroundColor: theme.colors.blue50,
    borderColor: theme.colors.blue300,
    opacity: 1,
  },
  chipIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  chipDays: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.slate600,
  },
  chipDaysReached: {
    color: '#B45309',
  },
  chipDaysNext: {
    color: theme.colors.actionPrimary,
  },
  checkmarkBadge: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: theme.colors.green600,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
  checkmarkText: {
    fontSize: 9,
    color: theme.colors.white,
    fontWeight: '800',
    lineHeight: 10,
  },
});
