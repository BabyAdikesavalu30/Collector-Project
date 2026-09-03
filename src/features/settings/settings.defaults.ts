/**
 * Settings Default Configurations
 * Safe, student-friendly default values for all preference domains.
 */

import { AppSettings } from './settings.types';

export const DEFAULT_APP_SETTINGS: AppSettings = {
  language: 'en',
  theme: 'system',
  textScale: 'default',
  reduceMotion: false,

  dailyChallengeNotifications: true,
  quizReminders: true,
  achievementNotifications: true,
  streakReminders: true,
  leaderboardNotifications: true,
  learningRecommendations: true,
  generalNotifications: true,

  preferredSubject: 'physics',
  preferredLevel: 'core',
  dailyLearningGoal: 10,
  difficulty: 'beginner',

  questionsPerQuiz: 10,
  quizTimer: true,
  quizSound: true,
  answerExplanation: true,
  autoAdvance: false,
  confirmBeforeFinish: true,

  soundEffects: true,
  successSounds: true,
  errorSounds: true,
  haptics: true,

  highContrast: false,
  screenReaderFriendly: false,

  analyticsEnabled: false,
  personalizedRecommendations: true,
  usageDataSharing: false,
  downloadOverWifiOnly: true,
  autoDownloadLessons: false,
};
