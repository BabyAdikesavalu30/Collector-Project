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
  readAloud: true,
  speechRate: 1.0,
  focusMode: false,
  simplifiedView: false,
  largeTouchTargets: false,
  floatingButtonPositionX: -20, // Negative to snap to right edge, positive from left
  floatingButtonPositionY: -80, // Negative to snap to bottom edge, positive from top

  analyticsEnabled: false,
  personalizedRecommendations: true,
  usageDataSharing: false,
  downloadOverWifiOnly: true,
  autoDownloadLessons: false,
};
