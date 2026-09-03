/**
 * Achievements Feature Engine
 * Pure, testable badge rule definitions and evaluator.
 *
 * RULE SET (8 badges — extend by adding to ACHIEVEMENT_BADGES + evaluate):
 *  1. first-quiz     Concept Explorer  — complete any quiz
 *  2. perfect-score  Perfect Score     — score 100% on any quiz
 *  3. streak-3       3-Day Streak      — quiz on 3 consecutive days
 *  4. streak-5       5-Day Streak      — quiz on 5 consecutive days
 *  5. quiz-10        Quiz Regular      — complete 10 quizzes
 *  6. subject-master Subject Master    — 10+ quizzes in one subject at 80%+ accuracy
 *  7. game-explorer  Game Explorer     — play 5+ different games
 *  8. level-50       Level Crusher     — clear 50+ game levels
 */

import {
  AchievementBadgeDefinition,
  AchievementBadgeId,
  AchievementInput,
} from './achievements.types';

export const ACHIEVEMENT_BADGES: AchievementBadgeDefinition[] = [
  {
    id: 'first-quiz',
    title: { en: 'Concept Explorer', ta: 'கருத்து ஆய்வாளர்' },
    hint: {
      en: 'Complete your first science quiz.',
      ta: 'உங்கள் முதல் அறிவியல் வினாடி வினாவை முடிக்கவும்.',
    },
    icon: '🧠',
    category: 'learning',
  },
  {
    id: 'perfect-score',
    title: { en: 'Perfect Score', ta: 'முழு மதிப்பெண்' },
    hint: {
      en: 'Score 100% on any quiz.',
      ta: 'எந்த ஒரு வினாடி வினாவிலும் 100% மதிப்பெண் பெறவும்.',
    },
    icon: '💯',
    category: 'learning',
  },
  {
    id: 'streak-3',
    title: { en: '3-Day Streak', ta: '3 நாள் தொடர்ச்சி' },
    hint: {
      en: 'Take quizzes on 3 consecutive days.',
      ta: 'தொடர்ந்து 3 நாட்கள் வினாடி வினா எடுக்கவும்.',
    },
    icon: '🔥',
    category: 'streak',
  },
  {
    id: 'streak-5',
    title: { en: '5-Day Streak', ta: '5 நாள் தொடர்ச்சி' },
    hint: {
      en: 'Take quizzes on 5 consecutive days.',
      ta: 'தொடர்ந்து 5 நாட்கள் வினாடி வினா எடுக்கவும்.',
    },
    icon: '⚡',
    category: 'streak',
  },
  {
    id: 'quiz-10',
    title: { en: 'Quiz Regular', ta: 'வினாடி வினா வழக்கமானவர்' },
    hint: {
      en: 'Complete 10 quizzes in total.',
      ta: 'மொத்தம் 10 வினாடி வினாக்களை முடிக்கவும்.',
    },
    icon: '📚',
    category: 'learning',
  },
  {
    id: 'subject-master',
    title: { en: 'Subject Master', ta: 'பாட மேதை' },
    hint: {
      en: 'Complete 10+ quizzes in one subject at 80%+ accuracy.',
      ta: 'ஒரு பாடத்தில் 80%+ துல்லியத்துடன் 10+ வினாடி வினாக்களை முடிக்கவும்.',
    },
    icon: '🏆',
    category: 'mastery',
  },
  {
    id: 'game-explorer',
    title: { en: 'Game Explorer', ta: 'ஆட்ட ஆய்வாளர்' },
    hint: {
      en: 'Play 5 different science games.',
      ta: '5 வெவ்வேறு அறிவியல் ஆட்டங்களை விளையாடவும்.',
    },
    icon: '🎮',
    category: 'games',
  },
  {
    id: 'level-50',
    title: { en: 'Level Crusher', ta: 'நிலை வெற்றியாளர்' },
    hint: {
      en: 'Clear 50 game levels in total.',
      ta: 'மொத்தம் 50 ஆட்ட நிலைகளை நிறைவு செய்யவும்.',
    },
    icon: '🕹️',
    category: 'games',
  },
];

const BADGE_MAP: Record<AchievementBadgeId, AchievementBadgeDefinition> =
  ACHIEVEMENT_BADGES.reduce(
    (acc, badge) => {
      acc[badge.id] = badge;
      return acc;
    },
    {} as Record<AchievementBadgeId, AchievementBadgeDefinition>
  );

export function getBadgeDefinition(id: AchievementBadgeId): AchievementBadgeDefinition {
  return BADGE_MAP[id];
}

/**
 * Pure evaluation: returns every badge whose rule is satisfied by the input.
 * Called on screen load so badges unlock retroactively from existing history.
 */
export function evaluateUnlockedBadges(input: AchievementInput): AchievementBadgeId[] {
  const unlocked: AchievementBadgeId[] = [];
  const { quizHistory, quizStats, gamesPlayedCount, totalLevelsCleared } = input;

  // 1. Concept Explorer — first quiz completed
  if (quizHistory.length >= 1) unlocked.push('first-quiz');

  // 2. Perfect Score — 100% on any quiz
  if (quizHistory.some((e) => e.percentage === 100)) unlocked.push('perfect-score');

  // 3 & 4. Streaks — consecutive quiz days (current or longest)
  const bestStreak = Math.max(quizStats.currentStreakDays, quizStats.longestStreakDays);
  if (bestStreak >= 3) unlocked.push('streak-3');
  if (bestStreak >= 5) unlocked.push('streak-5');

  // 5. Quiz Regular — 10 quizzes completed
  if (quizStats.quizzesCompleted >= 10) unlocked.push('quiz-10');

  // 6. Subject Master — 10+ quizzes in one subject at 80%+ accuracy
  const hasSubjectMaster = quizStats.subjectStats.some(
    (s) => s.quizzesCompleted >= 10 && s.accuracy >= 80
  );
  if (hasSubjectMaster) unlocked.push('subject-master');

  // 7. Game Explorer — played 5+ different games
  if (gamesPlayedCount >= 5) unlocked.push('game-explorer');

  // 8. Level Crusher — cleared 50+ levels
  if (totalLevelsCleared >= 50) unlocked.push('level-50');

  return unlocked;
}