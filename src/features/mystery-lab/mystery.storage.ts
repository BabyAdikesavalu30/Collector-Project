/**
 * Vigyaan Mystery Lab — Local Storage & Progression Service
 * Manages investigation progress, streaks, scores, favorites, and daily completion.
 */

import { storage, STORAGE_KEYS } from '../../storage/asyncStorage';
import { recordActivity } from '../activity';
import { getMysteryCaseById } from './mystery.cases';
import {
  MysteryProgress,
  MysteryCaseProgress,
  InvestigationState,
  MysteryResultPayload,
} from './mystery.types';
import { getTodayDateString, getDaysDifference, getYesterdayDateString } from './mystery.utils';

// ============================================================================
// Storage Key
// ============================================================================

const MYSTERY_PROGRESS_KEY = STORAGE_KEYS.MYSTERY_LAB_PROGRESS;
const MYSTERY_ACTIVE_SESSION_KEY = STORAGE_KEYS.MYSTERY_LAB_ACTIVE_SESSION;

// ============================================================================
// Default State
// ============================================================================

function createDefaultProgress(): MysteryProgress {
  return {
    completedCases: [],
    attemptedCases: [],
    caseProgress: {},
    bestScores: {},
    mysteryStreak: {
      currentStreak: 0,
      longestStreak: 0,
      lastPlayedDate: '',
      history: [],
    },
    favorites: [],
    recentCases: [],
    dailyMysteryCompletion: {},
    totalCasesSolved: 0,
    averageScore: 0,
    bestScore: 0,
  };
}

function createDefaultCaseProgress(): MysteryCaseProgress {
  return {
    attempted: false,
    completed: false,
    bestScore: 0,
    bestStars: 0,
    timesAttempted: 0,
  };
}

// ============================================================================
// Progress CRUD
// ============================================================================

export async function getMysteryProgress(): Promise<MysteryProgress> {
  try {
    const data = await storage.getItem<MysteryProgress>(MYSTERY_PROGRESS_KEY);
    if (data && typeof data === 'object' && 'completedCases' in data) {
      return data;
    }
    return createDefaultProgress();
  } catch {
    return createDefaultProgress();
  }
}

export async function saveMysteryProgress(progress: MysteryProgress): Promise<void> {
  try {
    await storage.setItem(MYSTERY_PROGRESS_KEY, progress);
  } catch (err) {
    console.error('[MysteryLab] Failed to save progress:', err);
  }
}

// ============================================================================
// Case Progress
// ============================================================================

export async function getCaseProgress(caseId: string): Promise<MysteryCaseProgress> {
  const progress = await getMysteryProgress();
  return progress.caseProgress[caseId] || createDefaultCaseProgress();
}

export async function saveCaseCompletion(
  caseId: string,
  result: MysteryResultPayload
): Promise<MysteryProgress> {
  const progress = await getMysteryProgress();
  const today = getTodayDateString();

  // Update case-specific progress
  const existing = progress.caseProgress[caseId] || createDefaultCaseProgress();
  const isNewBest = result.score.totalScore > existing.bestScore;
  const bestStars = isNewBest ? result.score.stars : existing.bestStars;

  progress.caseProgress[caseId] = {
    attempted: true,
    completed: true,
    bestScore: isNewBest ? result.score.totalScore : existing.bestScore,
    bestStars,
    timesAttempted: existing.timesAttempted + 1,
    completedAt: result.completedAt,
  };

  // Update completed cases list
  if (!progress.completedCases.includes(caseId)) {
    progress.completedCases.push(caseId);
  }

  // Update attempted cases
  if (!progress.attemptedCases.includes(caseId)) {
    progress.attemptedCases.push(caseId);
  }

  // Update best scores
  const prevBest = progress.bestScores[caseId] || 0;
  progress.bestScores[caseId] = Math.max(prevBest, result.score.totalScore);

  // Update recent cases (keep last 10)
  progress.recentCases = [caseId, ...progress.recentCases.filter((id) => id !== caseId)].slice(0, 10);

  // Update daily mystery completion
  if (!progress.dailyMysteryCompletion[today]) {
    progress.dailyMysteryCompletion[today] = caseId;
  }

  // Update streak
  progress.mysteryStreak = updateStreak(progress.mysteryStreak, today);

  // Update totals
  progress.totalCasesSolved = progress.completedCases.length;
  progress.bestScore = Math.max(progress.bestScore, result.score.totalScore);

  // Calculate average score
  const allScores = Object.values(progress.bestScores);
  progress.averageScore = allScores.length > 0
    ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length)
    : 0;

  await saveMysteryProgress(progress);

  // Safe, additive shared integration: feed the unified activity/XP layer.
  // Stable dedupeKey prevents duplicate completion / XP on reopening solved cases.
  const mysteryCase = getMysteryCaseById(caseId);
  await recordActivity({
    type: 'mystery_completed',
    dedupeKey: `mystery:${caseId}`,
    title: mysteryCase?.title.en || 'Mystery Solved',
    titleTa: mysteryCase?.title.ta || 'மர்மம் தீர்க்கப்பட்டது',
    subtitle: `Score ${result.score.totalScore}`,
    subtitleTa: `மதிப்பெண் ${result.score.totalScore}`,
    xpEarned: 30,
    timestamp: result.completedAt,
    metadata: {
      caseId,
      score: result.score.totalScore,
      icon: '🕵️',
    },
  });

  return progress;
}

// ============================================================================
// Streak Management
// ============================================================================

function updateStreak(
  streak: MysteryProgress['mysteryStreak'],
  today: string
): MysteryProgress['mysteryStreak'] {
  const { currentStreak, longestStreak, lastPlayedDate, history } = streak;

  // Already played today
  if (lastPlayedDate === today) {
    return streak;
  }

  const yesterday = getYesterdayDateString();
  const isConsecutive = lastPlayedDate === yesterday;

  const newCurrentStreak = isConsecutive ? currentStreak + 1 : 1;
  const newLongestStreak = Math.max(longestStreak, newCurrentStreak);
  const newHistory = [today, ...history.filter((d) => d !== today)].slice(0, 30);

  return {
    currentStreak: newCurrentStreak,
    longestStreak: newLongestStreak,
    lastPlayedDate: today,
    history: newHistory,
  };
}

// ============================================================================
// Daily Mystery
// ============================================================================

export async function isDailyMysteryCompleted(dateStr?: string): Promise<boolean> {
  const date = dateStr || getTodayDateString();
  const progress = await getMysteryProgress();
  return Boolean(progress.dailyMysteryCompletion[date]);
}

// ============================================================================
// Favorites
// ============================================================================

export async function toggleFavoriteCase(caseId: string): Promise<string[]> {
  const progress = await getMysteryProgress();
  const idx = progress.favorites.indexOf(caseId);
  if (idx >= 0) {
    progress.favorites.splice(idx, 1);
  } else {
    progress.favorites.push(caseId);
  }
  await saveMysteryProgress(progress);
  return progress.favorites;
}

export async function getFavoriteCases(): Promise<string[]> {
  const progress = await getMysteryProgress();
  return progress.favorites;
}

// ============================================================================
// Active Session Management
// ============================================================================

export async function saveActiveSession(state: InvestigationState): Promise<void> {
  try {
    await storage.setItem(MYSTERY_ACTIVE_SESSION_KEY, state);
  } catch {
    // Silent fail for session persistence
  }
}

export async function getActiveSession(caseId: string): Promise<InvestigationState | null> {
  try {
    const data = await storage.getItem<InvestigationState>(MYSTERY_ACTIVE_SESSION_KEY);
    if (data && data.caseId === caseId && !data.completedAt) {
      return data;
    }
    return null;
  } catch {
    return null;
  }
}

export async function clearActiveSession(): Promise<void> {
  try {
    await storage.removeItem(MYSTERY_ACTIVE_SESSION_KEY);
  } catch {
    // Silent fail
  }
}

// ============================================================================
// Data Repair
// ============================================================================

export async function repairMysteryProgress(): Promise<boolean> {
  try {
    const progress = await getMysteryProgress();
    // Validate core structure
    if (!Array.isArray(progress.completedCases)) {
      progress.completedCases = [];
    }
    if (!Array.isArray(progress.attemptedCases)) {
      progress.attemptedCases = [];
    }
    if (!Array.isArray(progress.favorites)) {
      progress.favorites = [];
    }
    if (!Array.isArray(progress.recentCases)) {
      progress.recentCases = [];
    }
    if (typeof progress.caseProgress !== 'object' || progress.caseProgress === null) {
      progress.caseProgress = {};
    }
    if (typeof progress.bestScores !== 'object' || progress.bestScores === null) {
      progress.bestScores = {};
    }
    if (typeof progress.dailyMysteryCompletion !== 'object' || progress.dailyMysteryCompletion === null) {
      progress.dailyMysteryCompletion = {};
    }
    if (!progress.mysteryStreak || typeof progress.mysteryStreak !== 'object') {
      progress.mysteryStreak = {
        currentStreak: 0,
        longestStreak: 0,
        lastPlayedDate: '',
        history: [],
      };
    }
    await saveMysteryProgress(progress);
    return true;
  } catch {
    return false;
  }
}
