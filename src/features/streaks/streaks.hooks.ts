/**
 * Streaks Feature Hooks
 * React hook providing stateful calendar navigation, day selection, and data refreshing.
 */

import { useState, useEffect, useCallback } from 'react';
import { StreakService } from './streaks.service';
import { StreakHubData } from './streaks.types';
import { getTodayKey } from './streaks.engine';

export function useStreakCalendar() {
  const [data, setData] = useState<StreakHubData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedDateKey, setSelectedDateKey] = useState<string>(() => getTodayKey());

  const now = new Date();
  const [calendarYear, setCalendarYear] = useState<number>(now.getFullYear());
  const [calendarMonth, setCalendarMonth] = useState<number>(now.getMonth() + 1);

  const loadData = useCallback(
    async (year: number, month: number, targetDateKey: string) => {
      try {
        const hubData = await StreakService.getStreakHubData(targetDateKey, year, month);
        setData(hubData);
      } catch (error) {
        console.warn('[useStreakCalendar] Failed to load hub data:', error);
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    []
  );

  useEffect(() => {
    loadData(calendarYear, calendarMonth, selectedDateKey);
  }, [calendarYear, calendarMonth, selectedDateKey, loadData]);

  const selectDate = useCallback((dateKey: string) => {
    setSelectedDateKey(dateKey);
  }, []);

  const prevMonth = useCallback(() => {
    setCalendarMonth((prevM) => {
      if (prevM === 1) {
        setCalendarYear((prevY) => prevY - 1);
        return 12;
      }
      return prevM - 1;
    });
  }, []);

  const nextMonth = useCallback(() => {
    const nowDate = new Date();
    const currentMaxYear = nowDate.getFullYear();
    const currentMaxMonth = nowDate.getMonth() + 1;

    setCalendarMonth((prevM) => {
      const nextY = prevM === 12 ? calendarYear + 1 : calendarYear;
      const nextM = prevM === 12 ? 1 : prevM + 1;

      // Prevent navigating past the current real-world month
      if (nextY > currentMaxYear || (nextY === currentMaxYear && nextM > currentMaxMonth)) {
        return prevM;
      }

      if (prevM === 12) {
        setCalendarYear((prevY) => prevY + 1);
        return 1;
      }
      return prevM + 1;
    });
  }, [calendarYear]);

  const goToToday = useCallback(() => {
    const nowDate = new Date();
    const today = getTodayKey(nowDate);
    setCalendarYear(nowDate.getFullYear());
    setCalendarMonth(nowDate.getMonth() + 1);
    setSelectedDateKey(today);
  }, []);

  const refresh = useCallback(async () => {
    setIsRefreshing(true);
    await loadData(calendarYear, calendarMonth, selectedDateKey);
  }, [calendarYear, calendarMonth, selectedDateKey, loadData]);

  return {
    data,
    isLoading,
    isRefreshing,
    selectedDateKey,
    calendarYear,
    calendarMonth,
    selectDate,
    prevMonth,
    nextMonth,
    goToToday,
    refresh,
  };
}
