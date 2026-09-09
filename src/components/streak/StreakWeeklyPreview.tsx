/**
 * StreakWeeklyPreview Component
 * Compact horizontal strip displaying the 7 days of the current week (Mon-Sun)
 * with active day indicators and today's highlight.
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { getStreakI18n } from './streak.i18n';
import { WeeklyDayInfo } from '../../features/streaks/streaks.types';

interface StreakWeeklyPreviewProps {
  days: WeeklyDayInfo[];
  selectedDateKey: string;
  onSelectDate: (dateKey: string) => void;
  language?: SupportedLanguage;
}

export const StreakWeeklyPreview: React.FC<StreakWeeklyPreviewProps> = ({
  days,
  selectedDateKey,
  onSelectDate,
  language = 'en',
}) => {
  const t = getStreakI18n(language);

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>{t.thisWeek.toUpperCase()}</Text>
      </View>

      <View style={styles.stripRow}>
        {days.map((day) => {
          const isSelected = day.dateKey === selectedDateKey;
          const shortName = language === 'ta' ? day.dayShortTa : day.dayShortEn;

          return (
            <TouchableOpacity
              key={day.dateKey}
              style={[
                styles.dayColumn,
                day.isToday && styles.todayColumn,
                isSelected && styles.selectedColumn,
              ]}
              onPress={() => onSelectDate(day.dateKey)}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel={`${day.dayNameEn} ${day.dayNumber}, ${
                day.isActive ? t.activeDay : t.inactiveDay
              }`}
            >
              <Text
                style={[
                  styles.dayShortName,
                  day.isToday && styles.todayText,
                  isSelected && styles.selectedText,
                ]}
              >
                {shortName}
              </Text>

              <View
                style={[
                  styles.indicatorCircle,
                  day.isActive && styles.indicatorActive,
                  day.isToday && !day.isActive && styles.indicatorTodayPending,
                ]}
              >
                {day.isActive ? (
                  <Text style={styles.flameMini}>🔥</Text>
                ) : (
                  <Text
                    style={[
                      styles.dayNumberText,
                      day.isToday && styles.todayNumberText,
                      isSelected && styles.selectedNumberText,
                    ]}
                  >
                    {day.dayNumber}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surfaceCardLight,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: theme.colors.gray200,
    padding: 14,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  headerRow: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.slate500,
    letterSpacing: 0.5,
  },
  stripRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dayColumn: {
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderRadius: 12,
    flex: 1,
    minHeight: 52,
    justifyContent: 'center',
  },
  todayColumn: {
    backgroundColor: theme.colors.blue50,
  },
  selectedColumn: {
    borderColor: theme.colors.actionPrimary,
    borderWidth: 1.5,
  },
  dayShortName: {
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.slate600,
    marginBottom: 4,
  },
  todayText: {
    color: theme.colors.actionPrimary,
    fontWeight: '800',
  },
  selectedText: {
    color: theme.colors.navy900,
    fontWeight: '800',
  },
  indicatorCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.colors.gray100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorActive: {
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  indicatorTodayPending: {
    borderColor: theme.colors.actionPrimary,
    borderWidth: 1.5,
    backgroundColor: theme.colors.white,
  },
  flameMini: {
    fontSize: 14,
  },
  dayNumberText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.navy800,
  },
  todayNumberText: {
    color: theme.colors.actionPrimary,
    fontWeight: '800',
  },
  selectedNumberText: {
    color: theme.colors.navy900,
    fontWeight: '800',
  },
});
