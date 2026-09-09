/**
 * DailyGoalActivityList Component
 * Shows countable activities with their completion status.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { ActivityHistoryItem } from '../../features/activity';
import { getActivityIdentityKey } from '../../features/daily-goal';

interface DailyGoalActivityListProps {
  completedActivityIds: string[];
  history: ActivityHistoryItem[];
  language: SupportedLanguage;
}

const ACTIVITY_DISPLAY_CONFIG: Record<string, { icon: string; label: string; labelTa: string }> = {
  quiz_completed: { icon: '🔬', label: 'Quiz', labelTa: 'வினாடி வினா' },
  riddle_completed: { icon: '💡', label: 'Riddle', labelTa: 'புதிர்' },
  game_completed: { icon: '🎮', label: 'Game', labelTa: 'விளையாட்டு' },
  mystery_completed: { icon: '🕵️', label: 'Mystery', labelTa: 'மர்மம்' },
  fact_discovered: { icon: '✨', label: 'Fun Fact', labelTa: 'சுவாரஸ்ய தகவல்' },
  challenge_completed: { icon: '🎯', label: 'Challenge', labelTa: 'சவால்' },
};

export const DailyGoalActivityList: React.FC<DailyGoalActivityListProps> = ({
  completedActivityIds,
  history,
  language,
}) => {
  const isTamil = language === 'ta';
  const completedSet = new Set(completedActivityIds);

  const activityTypes = [
    'quiz_completed',
    'riddle_completed',
    'game_completed',
    'mystery_completed',
    'fact_discovered',
    'challenge_completed',
  ] as const;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isTamil ? 'இன்றைய செயல்பாடுகள்' : "Today's Activities"}</Text>
      <View style={styles.list}>
        {activityTypes.map((type) => {
          const config = ACTIVITY_DISPLAY_CONFIG[type];
          const items = history.filter((h) => h.type === type);
          const completedCount = items.filter((item) => completedSet.has(getActivityIdentityKey(item))).length;
          const isCompleted = completedCount > 0;

          return (
            <View key={type} style={styles.item}>
              <View style={styles.itemLeft}>
                <Text style={[styles.icon, { opacity: isCompleted ? 1 : 0.4 }]}>{config.icon}</Text>
                <View style={styles.itemText}>
                  <Text style={[styles.itemLabel, { color: isCompleted ? theme.colors.success : theme.colors.navy900 }]}>
                    {isTamil ? config.labelTa : config.label}
                  </Text>
                  <Text style={styles.itemCount}>
                    {isTamil
                      ? `முடிந்தது: {completedCount}`
                      : `Completed: {completedCount}`}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: isCompleted ? theme.colors.successSurface : theme.colors.gray100 },
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    { color: isCompleted ? theme.colors.success : theme.colors.slate400 },
                  ]}
                >
                  {isCompleted ? (isTamil ? 'முடிந்தது' : 'Done') : (isTamil ? 'இன்னமுடியாது' : 'Pending')}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.sm,
  },
  title: {
    ...theme.typography.h3,
    fontSize: 16,
    fontWeight: '800',
    color: theme.colors.navy900,
    marginBottom: theme.spacing.xs,
  },
  list: {
    gap: theme.spacing.xs,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    flex: 1,
  },
  icon: {
    fontSize: 20,
  },
  itemText: {
    gap: 2,
  },
  itemLabel: {
    ...theme.typography.body,
    fontSize: 13,
    fontWeight: '700',
  },
  itemCount: {
    ...theme.typography.caption,
    fontSize: 11,
    color: theme.colors.slate500,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    ...theme.typography.caption,
    fontSize: 10,
    fontWeight: '800',
  },
});