/**
 * StreakService Integration Tests
 * Tests StreakService data retrieval, filtering by qualifying activity types,
 * fresh user empty states, and hub data generation.
 */

import { StreakService } from '../streaks.service';
import { storage, STORAGE_KEYS } from '../../../storage/asyncStorage';
import { ActivityHistoryItem } from '../../activity/activity.types';
import AsyncStorage from '@react-native-async-storage/async-storage';

describe('StreakService', () => {
  beforeEach(async () => {
    await storage.removeItem(STORAGE_KEYS.ACTIVITY_HISTORY);
  });

  it('returns clean zero streak and empty state for a fresh student', async () => {
    const info = await StreakService.getUnifiedStreak();
    expect(info.currentStreak).toBe(0);
    expect(info.longestStreak).toBe(0);
    expect(info.lastActiveDate).toBeNull();
    expect(info.activeDates).toEqual([]);

    const hubData = await StreakService.getStreakHubData();
    expect(hubData.streak.currentStreak).toBe(0);
    expect(hubData.isTodayActive).toBe(false);
    expect(hubData.calendarMonth.days.length).toBeGreaterThan(0);
    expect(hubData.milestones.length).toBe(7);
  });

  it('filters out non-qualifying activity types like achievement claims', async () => {
    const today = new Date();
    const timestamp = today.getTime();

    // Store a non-qualifying achievement unlock event
    const nonQualifyingItem: ActivityHistoryItem = {
      id: 'act-achieve-1',
      type: 'achievement_unlocked',
      title: 'Badge',
      titleTa: 'பதக்கம்',
      timestamp,
      xpEarned: 50,
      pointsEarned: 0,
    };

    await storage.setItem(STORAGE_KEYS.ACTIVITY_HISTORY, [nonQualifyingItem]);

    const info = await StreakService.getUnifiedStreak(today);
    // Should NOT count as an active day
    expect(info.currentStreak).toBe(0);
    expect(info.activeDates.length).toBe(0);
  });

  it('correctly aggregates qualifying learning activities into active streak', async () => {
    const day1 = new Date(2026, 8, 3, 10).getTime();
    const day2 = new Date(2026, 8, 4, 10).getTime();
    const day3 = new Date(2026, 8, 5, 10).getTime();

    const items: ActivityHistoryItem[] = [
      {
        id: 'act-quiz-1',
        type: 'quiz_completed',
        title: 'Quiz 1',
        titleTa: 'வினாடி வினா 1',
        timestamp: day1,
        xpEarned: 25,
        pointsEarned: 0,
      },
      {
        id: 'act-game-1',
        type: 'game_completed',
        title: 'Game 1',
        titleTa: 'விளையாட்டு 1',
        timestamp: day2,
        xpEarned: 20,
        pointsEarned: 0,
      },
      {
        id: 'act-exp-1',
        type: 'experiment_completed',
        title: 'Lab 1',
        titleTa: 'ஆய்வகம் 1',
        timestamp: day3,
        xpEarned: 35,
        pointsEarned: 0,
      },
    ];

    await storage.setItem(STORAGE_KEYS.ACTIVITY_HISTORY, items);

    const now = new Date(2026, 8, 5, 12);
    const info = await StreakService.getUnifiedStreak(now);

    expect(info.currentStreak).toBe(3);
    expect(info.longestStreak).toBe(3);
    expect(info.activeDates).toEqual(['2026-09-03', '2026-09-04', '2026-09-05']);
  });

  it('recovers gracefully from corrupted storage', async () => {
    await AsyncStorage.setItem(STORAGE_KEYS.ACTIVITY_HISTORY, '{not_valid_json');

    const streak = await StreakService.getUnifiedStreak();
    expect(streak.currentStreak).toBe(0);
    expect(streak.longestStreak).toBe(0);

    const hubData = await StreakService.getStreakHubData();
    expect(hubData.streak.currentStreak).toBe(0);
  });

  it('returns day activities filtered by target date', async () => {
    const targetDate = '2026-09-05';
    const day5Ts = new Date(2026, 8, 5, 10).getTime();
    const day4Ts = new Date(2026, 8, 4, 10).getTime();

    const items: ActivityHistoryItem[] = [
      {
        id: 'act-1',
        type: 'micro_lesson_completed',
        title: 'Lesson 1',
        titleTa: 'பாடம் 1',
        timestamp: day5Ts,
        xpEarned: 30,
        pointsEarned: 0,
      },
      {
        id: 'act-2',
        type: 'riddle_completed',
        title: 'Riddle 1',
        titleTa: 'புதிர் 1',
        timestamp: day4Ts,
        xpEarned: 15,
        pointsEarned: 0,
      },
    ];

    await storage.setItem(STORAGE_KEYS.ACTIVITY_HISTORY, items);

    const dayActivities = await StreakService.getDayActivities(targetDate);
    expect(dayActivities.length).toBe(1);
    expect(dayActivities[0].id).toBe('act-1');
  });
});
