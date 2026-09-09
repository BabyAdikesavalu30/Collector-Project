/**
 * ActivityCalendar Component
 * Full visual month calendar with previous/next month navigation,
 * active day flame indicators, today highlight, and >=44x44 accessible touch targets.
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { getStreakI18n, interpolateText } from './streak.i18n';
import { CalendarDay } from '../../features/streaks/streaks.types';
import { formatDateLabel } from '../../features/streaks/streaks.engine';

interface ActivityCalendarProps {
  year: number;
  month: number;
  monthNameEn: string;
  monthNameTa: string;
  days: CalendarDay[];
  selectedDateKey: string;
  canGoNext: boolean;
  canGoPrev: boolean;
  onSelectDate: (dateKey: string) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onTodayPress: () => void;
  language?: SupportedLanguage;
}

export const ActivityCalendar: React.FC<ActivityCalendarProps> = ({
  year,
  month,
  monthNameEn,
  monthNameTa,
  days,
  selectedDateKey,
  canGoNext,
  canGoPrev,
  onSelectDate,
  onPrevMonth,
  onNextMonth,
  onTodayPress,
  language = 'en',
}) => {
  const t = getStreakI18n(language);
  const monthTitle = language === 'ta' ? `${monthNameTa} ${year}` : `${monthNameEn} ${year}`;

  const weekdayHeaders = [
    t.weekdaysShort.mon,
    t.weekdaysShort.tue,
    t.weekdaysShort.wed,
    t.weekdaysShort.thu,
    t.weekdaysShort.fri,
    t.weekdaysShort.sat,
    t.weekdaysShort.sun,
  ];

  return (
    <View style={styles.card}>
      {/* Calendar Header with Month & Controls */}
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.navButton, !canGoPrev && styles.navButtonDisabled]}
          onPress={onPrevMonth}
          disabled={!canGoPrev}
          accessibilityRole="button"
          accessibilityLabel={t.accessibility.prevMonth}
        >
          <Text style={[styles.navButtonText, !canGoPrev && styles.navButtonTextDisabled]}>←</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.monthTitleButton}
          onPress={onTodayPress}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel={t.accessibility.todayAction}
        >
          <Text style={styles.monthTitleText}>{monthTitle}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, !canGoNext && styles.navButtonDisabled]}
          onPress={onNextMonth}
          disabled={!canGoNext}
          accessibilityRole="button"
          accessibilityLabel={t.accessibility.nextMonth}
        >
          <Text style={[styles.navButtonText, !canGoNext && styles.navButtonTextDisabled]}>→</Text>
        </TouchableOpacity>
      </View>

      {/* Weekday Column Headers */}
      <View style={styles.weekdayRow}>
        {weekdayHeaders.map((dayLabel, index) => (
          <View key={`weekday-${index}`} style={styles.weekdayCell}>
            <Text style={styles.weekdayText}>{dayLabel}</Text>
          </View>
        ))}
      </View>

      {/* Calendar Days Grid */}
      <View style={styles.grid}>
        {days.map((day) => {
          const isSelected = day.dateKey === selectedDateKey;
          const formattedDate = formatDateLabel(day.dateKey, language);

          let a11yLabel = '';
          if (day.isActive) {
            a11yLabel = interpolateText(t.accessibility.dayCellActive, {
              date: formattedDate,
              count: day.activityCount,
            });
          } else {
            a11yLabel = interpolateText(t.accessibility.dayCellInactive, {
              date: formattedDate,
            });
          }
          if (day.isToday) {
            a11yLabel = interpolateText(t.accessibility.dayCellToday, {
              date: formattedDate,
              status: day.isActive ? t.activeDay : t.inactiveDay,
            });
          }

          return (
            <TouchableOpacity
              key={day.dateKey}
              style={[
                styles.dayCell,
                !day.isCurrentMonth && styles.dayCellOutsideMonth,
                day.isFuture && styles.dayCellFuture,
                day.isToday && styles.dayCellToday,
                isSelected && styles.dayCellSelected,
              ]}
              onPress={() => !day.isFuture && onSelectDate(day.dateKey)}
              disabled={day.isFuture}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel={a11yLabel}
              accessibilityState={{ selected: isSelected, disabled: day.isFuture }}
            >
              <Text
                style={[
                  styles.dayNumber,
                  !day.isCurrentMonth && styles.dayNumberOutside,
                  day.isFuture && styles.dayNumberFuture,
                  day.isToday && styles.dayNumberToday,
                  isSelected && styles.dayNumberSelected,
                ]}
              >
                {day.dayNumber}
              </Text>

              {/* Active Day Indicator */}
              <View style={styles.indicatorContainer}>
                {day.isActive ? (
                  <Text style={styles.flameIndicator}>🔥</Text>
                ) : (
                  <View
                    style={[
                      styles.dotEmpty,
                      day.isToday && styles.dotTodayPending,
                    ]}
                  />
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
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.gray200,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  monthTitleButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  monthTitleText: {
    fontSize: 17,
    fontWeight: '800',
    color: theme.colors.navy900,
  },
  navButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.gray100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButtonDisabled: {
    opacity: 0.3,
  },
  navButtonText: {
    fontSize: 24,
    fontWeight: '600',
    color: theme.colors.navy900,
    lineHeight: 26,
  },
  navButtonTextDisabled: {
    color: theme.colors.slate400,
  },
  weekdayRow: {
    flexDirection: 'row',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray200,
    paddingBottom: 6,
  },
  weekdayCell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekdayText: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.slate500,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%', // 7 days in a row
    height: 48, // Touch target >= 44
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingVertical: 2,
  },
  dayCellOutsideMonth: {
    opacity: 0.35,
  },
  dayCellFuture: {
    opacity: 0.25,
  },
  dayCellToday: {
    borderWidth: 1.5,
    borderColor: theme.colors.actionPrimary,
    backgroundColor: theme.colors.blue50,
  },
  dayCellSelected: {
    backgroundColor: theme.colors.purple100,
    borderColor: theme.colors.purple600,
    borderWidth: 1.5,
  },
  dayNumber: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.navy800,
  },
  dayNumberOutside: {
    color: theme.colors.slate400,
  },
  dayNumberFuture: {
    color: theme.colors.slate400,
  },
  dayNumberToday: {
    color: theme.colors.actionPrimary,
    fontWeight: '800',
  },
  dayNumberSelected: {
    color: theme.colors.purple900,
    fontWeight: '800',
  },
  indicatorContainer: {
    height: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 1,
  },
  flameIndicator: {
    fontSize: 10,
    lineHeight: 12,
  },
  dotEmpty: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'transparent',
  },
  dotTodayPending: {
    backgroundColor: theme.colors.actionPrimary,
  },
});
