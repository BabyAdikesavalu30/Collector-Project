/**
 * Mock Dashboard Data Adapter
 * Isolated mock data for the Vigyaan Student Home Dashboard.
 */

import { DashboardData } from './home.types';

export const MOCK_ACTIVE_DASHBOARD: DashboardData = {
  student: {
    name: 'Anu',
    grade: 'Grade 8',
    schoolName: 'R.M.K. Matriculation School',
    unreadNotificationsCount: 2,
  },
  overallProgressPercentage: 72,
  streakDays: 5,
  points: 840,
  rank: 12,
  continueTopic: {
    subject: 'Physics',
    topicTitle: 'Force & Laws of Motion',
    progressPercentage: 72,
    remainingTimeMinutes: 8,
  },
  dailyChallenge: {
    id: 'dc-101',
    title: "Today's Science Challenge",
    questionPreview: 'Why does a metal spoon feel colder than a wooden spoon at room temperature?',
    durationMinutes: 2,
    xpReward: 50,
  },
  recentAchievement: {
    id: 'ach-01',
    title: 'Concept Explorer',
    unlockedLabel: 'Unlocked recently',
    icon: '🏅',
  },
  isNewStudent: false,
};

export const MOCK_EMPTY_DASHBOARD: DashboardData = {
  student: {
    name: 'Young Scientist',
    grade: 'Grade 8',
    schoolName: 'R.M.K. School',
    unreadNotificationsCount: 0,
  },
  overallProgressPercentage: 0,
  streakDays: 0,
  points: 0,
  continueTopic: null,
  dailyChallenge: {
    id: 'dc-starter',
    title: 'First Discovery Challenge',
    questionPreview: 'Explore fundamental atoms and molecular bonds in your first interactive quiz!',
    durationMinutes: 3,
    xpReward: 100,
  },
  recentAchievement: null,
  isNewStudent: true,
};
