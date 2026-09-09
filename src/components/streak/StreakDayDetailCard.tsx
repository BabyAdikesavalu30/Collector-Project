/**
 * StreakDayDetailCard Component
 * Displays the activity history for the currently selected calendar day.
 * Presents list of completed activities with XP earned, or a warm encouraging
 * empty message for inactive days.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { getStreakI18n, interpolateText } from './streak.i18n';
import { DayActivityDetail } from '../../features/streaks/streaks.types';
import { ActivityEventType } from '../../features/activity/activity.types';

interface StreakDayDetailCardProps {
  detail: DayActivityDetail;
  language?: SupportedLanguage;
}

const ACTIVITY_ICONS: Record<ActivityEventType, string> = {
  quiz_completed: '🧪',
  riddle_completed: '🧩',
  game_completed: '🎮',
  mystery_completed: '🔍',
  fact_discovered: '💡',
  challenge_completed: '🏆',
  mission_completed: '🎯',
  achievement_unlocked: '⭐',
  certificate_earned: '📜',
  micro_lesson_completed: '📖',
  concept_map_completed: '🗺️',
  concept_node_explored: '🪐',
  experiment_completed: '🔬',
};

export const StreakDayDetailCard: React.FC<StreakDayDetailCardProps> = ({
  detail,
  language = 'en',
}) => {
  const t = getStreakI18n(language);
  const formattedDate = language === 'ta' ? detail.formattedDateTa : detail.formattedDateEn;

  return (
    <View style={styles.card} accessible={true} accessibilityRole="summary">
      {/* Date & Activity Header */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.dateLabel}>{formattedDate}</Text>
          <Text style={styles.subStatus}>
            {detail.isActive
              ? `${detail.totalActivities} ${
                  detail.totalActivities === 1 ? t.activitySingular : t.activities
                }`
              : t.inactiveDay}
          </Text>
        </View>

        {detail.isActive && detail.totalXp > 0 && (
          <View style={styles.xpPill}>
            <Text style={styles.xpPillText}>+{detail.totalXp} XP</Text>
          </View>
        )}
      </View>

      {/* Activity Breakdown List or Encouraging Inactive Message */}
      {detail.isActive && detail.activities.length > 0 ? (
        <View style={styles.activityList}>
          {detail.activities.map((act, index) => {
            const icon = ACTIVITY_ICONS[act.type] || '🔬';
            const typeLabel = t.activityTypeNames[act.type] || act.type;
            const title = language === 'ta' && act.titleTa ? act.titleTa : act.title;

            return (
              <View
                key={`${act.id || index}`}
                style={styles.activityItem}
                accessible={true}
                accessibilityRole="text"
                accessibilityLabel={`${typeLabel}: ${title}. +${act.xpEarned || 0} XP.`}
              >
                <View style={styles.activityIconBox}>
                  <Text style={styles.activityIcon}>{icon}</Text>
                </View>

                <View style={styles.activityInfo}>
                  <Text style={styles.activityTypeBadge}>{typeLabel}</Text>
                  <Text style={styles.activityTitle} numberOfLines={1}>
                    {title}
                  </Text>
                </View>

                {act.xpEarned > 0 && (
                  <Text style={styles.activityXp}>+{act.xpEarned} XP</Text>
                )}
              </View>
            );
          })}
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🌱</Text>
          <Text style={styles.emptyTitle}>{t.noActivityRecorded}</Text>
          <Text style={styles.emptySubtitle}>{t.readyToStart}</Text>
        </View>
      )}
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
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray100,
    paddingBottom: 10,
  },
  dateLabel: {
    fontSize: 17,
    fontWeight: '800',
    color: theme.colors.navy900,
  },
  subStatus: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.slate500,
    marginTop: 2,
  },
  xpPill: {
    backgroundColor: theme.colors.green50,
    borderColor: theme.colors.green200,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  xpPillText: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.green700,
  },
  activityList: {
    gap: 8,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.gray50,
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: theme.colors.gray200,
  },
  activityIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  activityIcon: {
    fontSize: 18,
  },
  activityInfo: {
    flex: 1,
  },
  activityTypeBadge: {
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.actionPrimary,
    textTransform: 'uppercase',
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.navy900,
    marginTop: 2,
  },
  activityXp: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.green700,
    marginLeft: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  emptyIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.navy900,
    marginBottom: 4,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 13,
    color: theme.colors.slate600,
    textAlign: 'center',
    lineHeight: 18,
  },
});
