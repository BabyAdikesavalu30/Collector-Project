/**
 * Science Passport Service
 * Aggregation layer that reads from ALL existing canonical feature stores
 * and builds the unified "My Science Journey" passport summary.
 *
 * Architecture:
 *   Existing Sources → SciencePassportService → Passport UI
 *
 * Never creates new XP, streak, achievements, or progress systems.
 */

import { storage, STORAGE_KEYS } from '../../storage/asyncStorage';
import { AuthSession, SessionRepository } from '../auth';
import { calculateScienceLevel } from '../levels';
import { StreakService } from '../streaks';
import { calculateStreak } from '../streaks/streaks.engine';
import {
  getActivityHistory,
  getTotalXpBalance,
  countActivityTypes,
} from '../activity';
import { ActivityHistoryItem, ActivityTypeCounts } from '../activity/activity.types';
import { getUnlockedAchievements } from '../achievements/achievements.storage';
import { AchievementBadgeId, UnlockedAchievement } from '../achievements/achievements.types';
import { getCertificates } from '../certificates/certificates.storage';
import { Certificate } from '../certificates/certificates.types';
import { getAllGamesProgress, getGameLevelCount } from '../games/games.storage';
import { GameId } from '../games/games.types';
import { getMysteryProgress } from '../mystery-lab/mystery.storage';
import { getMysteryCases } from '../mystery-lab/mystery.cases';
import { getAllProgress as getMicroLessonsProgress } from '../micro-lessons/microLessons.storage';
import { getAllConceptMapProgress } from '../concept-maps/conceptMaps.storage';
import { getAllExperimentProgress } from '../experiment-lab/experiment.storage';
import { getAllCollectionProgress } from './sciencePassport.collectionHelpers';
import {
  SciencePassportSummary,
  PassportActivityStats,
  PassportFeatureCounts,
  PassportMilestone,
  PassportHighlight,
  PassportPersonalBests,
  JourneyTimelineEntry,
} from './sciencePassport.types';
import { PASSPORT_MILESTONE_DEFINITIONS } from './sciencePassport.milestones';

// ============================================================================
// Total collection items
// ============================================================================

const TOTAL_COLLECTIONS = 10;

// ============================================================================
// Main Aggregation
// ============================================================================

/**
 * Builds the complete passport summary from all canonical data sources.
 * Handles errors per-source so a single broken store doesn't crash the passport.
 */
export async function getPassportSummary(
  now: Date = new Date()
): Promise<SciencePassportSummary> {
  // Load all data sources in parallel
  const [
    session,
    storedProfile,
    history,
    xpBalance,
    achievements,
    certificates,
    gamesProgress,
    mysteryProgress,
    microLessonsProgress,
    conceptMapsProgress,
    experimentsProgress,
    collectionProgress,
    streakInfo,
  ] = await Promise.all([
    loadSession(),
    loadProfile(),
    getActivityHistory().catch(() => [] as ActivityHistoryItem[]),
    getTotalXpBalance().catch(() => 0),
    getUnlockedAchievements().catch(() => ({} as Record<string, number>)),
    getCertificates().catch(() => [] as Certificate[]),
    getAllGamesProgress().catch(() => ({} as Record<string, { levels: Record<string, { completed?: boolean }> }>)),
    getMysteryProgress().catch(() => ({ completedCases: [] as string[] })),
    getMicroLessonsProgress().catch(() => ({} as Record<string, { status?: string }>)),
    getAllConceptMapProgress().catch(() => ({} as Record<string, { status?: string }>)),
    getAllExperimentProgress().catch(() => ({} as Record<string, { completed?: boolean }>)),
    getAllCollectionProgress().catch(() => ({ completedCount: 0, totalCount: TOTAL_COLLECTIONS })),
    StreakService.getUnifiedStreak(now).catch(() => ({
      currentStreak: 0,
      longestStreak: 0,
      lastActiveDate: null,
      activeDates: [] as string[],
    })),
  ]);

  // Derive level from XP (canonical)
  const level = calculateScienceLevel(xpBalance);

  // Derive activity stats from activity history
  const counts = countActivityTypes(history);
  const activityStats = computeActivityStats(counts, history);

  // Derive feature counts
  const featureCounts = computeFeatureCounts(
    achievements,
    certificates,
    gamesProgress,
    mysteryProgress,
    collectionProgress
  );

  // Compute milestones
  const milestones = computeMilestones(
    activityStats,
    featureCounts,
    streakInfo.currentStreak,
    achievements
  );

  // Compute highlights
  const highlights = computeHighlights(
    streakInfo.currentStreak,
    featureCounts,
    activityStats,
    level
  );

  // Compute personal bests
  const personalBests = computePersonalBests(
    streakInfo,
    gamesProgress,
    activityStats,
    experimentsProgress,
    collectionProgress
  );

  // Recent timeline
  const recentTimeline = buildTimeline(history.slice(0, 10));

  // Recent achievements
  const recentAchievements = Object.entries(achievements)
    .map(([badgeId, unlockedAt]) => ({
      badgeId: badgeId as AchievementBadgeId,
      unlockedAt,
    }))
    .sort((a, b) => b.unlockedAt - a.unlockedAt)
    .slice(0, 6);

  // Latest certificate
  const latestCertificate = certificates.length > 0 ? certificates[0] : null;

  return {
    student: {
      name: session?.fullName || storedProfile?.fullName || 'Vigyaan Student',
      initials: computeInitials(session?.fullName || storedProfile?.fullName || 'Vigyaan Student'),
      grade: storedProfile?.grade || 'Grade 8',
      school: storedProfile?.school || '',
      avatarId: storedProfile?.avatarId,
    },
    level,
    totalXp: xpBalance,
    streak: {
      current: streakInfo.currentStreak,
      longest: streakInfo.longestStreak,
    },
    activityStats,
    featureCounts,
    milestones,
    highlights,
    personalBests,
    recentTimeline,
    recentAchievements,
    latestCertificate,
  };
}

// ============================================================================
// Pure computation helpers
// ============================================================================

function computeActivityStats(
  counts: ActivityTypeCounts,
  history: ActivityHistoryItem[]
): PassportActivityStats {
  return {
    totalActivities: history.length,
    quizzesCompleted: counts.quiz_completed || 0,
    microLessonsCompleted: counts.micro_lesson_completed || 0,
    conceptMapsCompleted: counts.concept_map_completed || 0,
    experimentsCompleted: counts.experiment_completed || 0,
    mysteriesSolved: counts.mystery_completed || 0,
    riddlesSolved: counts.riddle_completed || 0,
    gamesCompleted: counts.game_completed || 0,
    factsDiscovered: counts.fact_discovered || 0,
  };
}

function computeFeatureCounts(
  achievements: Record<string, number>,
  certificates: Certificate[],
  gamesProgress: Record<string, { levels: Record<string, { completed?: boolean }> }>,
  mysteryProgress: { completedCases: string[] },
  collectionProgress: { completedCount: number; totalCount: number }
): PassportFeatureCounts {
  // Count completed game levels
  let totalGameLevelsCompleted = 0;
  Object.values(gamesProgress).forEach((gp) => {
    if (gp?.levels) {
      Object.entries(gp.levels).forEach(([, lvl]) => {
        if (lvl.completed) totalGameLevelsCompleted++;
      });
    }
  });

  return {
    badges: {
      earned: Object.keys(achievements).length,
      total: 43, // canonical total from achievements.engine.ts
    },
    collections: {
      completed: collectionProgress.completedCount,
      total: collectionProgress.totalCount,
    },
    certificates: {
      earned: certificates.length,
      total: certificates.length, // dynamically determined by eligibility
    },
  };
}

function computeMilestones(
  activityStats: PassportActivityStats,
  featureCounts: PassportFeatureCounts,
  currentStreak: number,
  achievements: Record<string, number>
): PassportMilestone[] {
  return PASSPORT_MILESTONE_DEFINITIONS.map((def) => {
    let progress = 0;
    let target = def.target;
    let status: 'locked' | 'in_progress' | 'completed' = 'locked';

    switch (def.id) {
      case 'first-activity':
        progress = Math.min(activityStats.totalActivities, 1);
        target = 1;
        break;
      case 'first-badge':
        progress = featureCounts.badges.earned > 0 ? 1 : 0;
        target = 1;
        break;
      case 'first-lesson':
        progress = activityStats.microLessonsCompleted > 0 ? 1 : 0;
        target = 1;
        break;
      case 'first-experiment':
        progress = activityStats.experimentsCompleted > 0 ? 1 : 0;
        target = 1;
        break;
      case 'first-concept-map':
        progress = activityStats.conceptMapsCompleted > 0 ? 1 : 0;
        target = 1;
        break;
      case 'first-mystery':
        progress = activityStats.mysteriesSolved > 0 ? 1 : 0;
        target = 1;
        break;
      case 'first-riddle':
        progress = activityStats.riddlesSolved > 0 ? 1 : 0;
        target = 1;
        break;
      case 'first-game':
        progress = activityStats.gamesCompleted > 0 ? 1 : 0;
        target = 1;
        break;
      case 'streak-3':
        progress = Math.min(currentStreak, 3);
        target = 3;
        break;
      case 'streak-7':
        progress = Math.min(currentStreak, 7);
        target = 7;
        break;
      case 'streak-30':
        progress = Math.min(currentStreak, 30);
        target = 30;
        break;
      case 'activities-10':
        progress = Math.min(activityStats.totalActivities, 10);
        target = 10;
        break;
      case 'activities-25':
        progress = Math.min(activityStats.totalActivities, 25);
        target = 25;
        break;
      case 'activities-50':
        progress = Math.min(activityStats.totalActivities, 50);
        target = 50;
        break;
      case 'first-collection':
        progress = featureCounts.collections.completed > 0 ? 1 : 0;
        target = 1;
        break;
      case 'collections-3':
        progress = Math.min(featureCounts.collections.completed, 3);
        target = 3;
        break;
      case 'first-certificate':
        progress = featureCounts.certificates.earned > 0 ? 1 : 0;
        target = 1;
        break;
      case 'science-scholar':
        progress = activityStats.totalActivities;
        target = 25;
        break;
    }

    if (progress >= target) {
      status = 'completed';
    } else if (progress > 0) {
      status = 'in_progress';
    } else {
      status = 'locked';
    }

    return {
      ...def,
      progress,
      target,
      status,
    };
  });
}

function computeHighlights(
  currentStreak: number,
  featureCounts: PassportFeatureCounts,
  activityStats: PassportActivityStats,
  level: { level: number; title: string }
): PassportHighlight[] {
  const highlights: PassportHighlight[] = [];

  // Deterministic highlight selection based on actual data
  if (currentStreak >= 3) {
    highlights.push({
      id: 'streak',
      icon: '🔥',
      text: {
        en: `${currentStreak}-day streak`,
        ta: `${currentStreak} நாள் தொடர்ச்சி`,
      },
      relatedRoute: '/streak',
    });
  }

  if (featureCounts.badges.earned >= 1) {
    highlights.push({
      id: 'badges',
      icon: '🏆',
      text: {
        en: `${featureCounts.badges.earned} badge${featureCounts.badges.earned > 1 ? 's' : ''} earned`,
        ta: `${featureCounts.badges.earned} சாதனை பெறப்பட்டது`,
      },
      relatedRoute: '/achievements',
    });
  }

  if (activityStats.experimentsCompleted >= 1) {
    highlights.push({
      id: 'experiments',
      icon: '🧪',
      text: {
        en: `${activityStats.experimentsCompleted} experiment${activityStats.experimentsCompleted > 1 ? 's' : ''} completed`,
        ta: `${activityStats.experimentsCompleted} சோதனை முடிக்கப்பட்டது`,
      },
      relatedRoute: '/experiment-lab',
    });
  }

  if (featureCounts.collections.completed >= 1) {
    highlights.push({
      id: 'collections',
      icon: '🌍',
      text: {
        en: `${featureCounts.collections.completed} collection${featureCounts.collections.completed > 1 ? 's' : ''} complete`,
        ta: `${featureCounts.collections.completed} தொகுப்பு நிறைவடைந்தது`,
      },
    });
  }

  if (level.level >= 5) {
    highlights.push({
      id: 'level',
      icon: '⭐',
      text: {
        en: `Level ${level.level} — ${level.title}`,
        ta: `நிலை ${level.level} — ${level.title}`,
      },
    });
  }

  if (activityStats.conceptMapsCompleted >= 1) {
    highlights.push({
      id: 'concept-maps',
      icon: '🗺️',
      text: {
        en: `${activityStats.conceptMapsCompleted} concept map${activityStats.conceptMapsCompleted > 1 ? 's' : ''} explored`,
        ta: `${activityStats.conceptMapsCompleted} கருத்து வரைபடம் ஆராயப்பட்டது`,
      },
      relatedRoute: '/concept-maps',
    });
  }

  // Return max 4 highlights
  return highlights.slice(0, 4);
}

function computePersonalBests(
  streakInfo: { longestStreak: number },
  gamesProgress: Record<string, { levels: Record<string, { completed?: boolean }> }>,
  activityStats: PassportActivityStats,
  experimentsProgress: Record<string, { completed?: boolean }>,
  collectionProgress: { completedCount: number }
): PassportPersonalBests {
  let totalGameLevelsCompleted = 0;
  Object.values(gamesProgress).forEach((gp) => {
    if (gp?.levels) {
      Object.entries(gp.levels).forEach(([, lvl]) => {
        if (lvl.completed) totalGameLevelsCompleted++;
      });
    }
  });

  return {
    longestStreak: streakInfo.longestStreak,
    highestGameLevels: totalGameLevelsCompleted,
    mostRiddlesSolved: activityStats.riddlesSolved,
    mostExperiments: activityStats.experimentsCompleted,
    mostCollections: collectionProgress.completedCount,
  };
}

function buildTimeline(history: ActivityHistoryItem[]): JourneyTimelineEntry[] {
  const iconMap: Record<string, string> = {
    quiz_completed: '📝',
    riddle_completed: '🧩',
    game_completed: '🎮',
    mystery_completed: '🕵️',
    fact_discovered: '✨',
    challenge_completed: '🎯',
    mission_completed: '📋',
    achievement_unlocked: '🏆',
    certificate_earned: '📜',
    micro_lesson_completed: '📖',
    concept_map_completed: '🗺️',
    experiment_completed: '🧪',
  };

  return history.map((item) => ({
    id: item.id,
    type: item.type,
    title: { en: item.title, ta: item.titleTa },
    xpEarned: item.xpEarned,
    timestamp: item.timestamp,
    icon: iconMap[item.type] || '📌',
  }));
}

// ============================================================================
// Data Loading Helpers
// ============================================================================

async function loadSession(): Promise<AuthSession | null> {
  try {
    return await SessionRepository.getSession();
  } catch {
    return null;
  }
}

interface StoredProfile {
  fullName?: string;
  grade?: string;
  school?: string;
  avatarId?: string;
}

async function loadProfile(): Promise<StoredProfile | null> {
  try {
    return await storage.getItem<StoredProfile>(STORAGE_KEYS.STUDENT_PROFILE);
  } catch {
    return null;
  }
}

function computeInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'VS';
}

// ============================================================================
// Convenience Methods
// ============================================================================

/**
 * Returns just the milestone list for the journey visualization.
 */
export async function getMilestones(
  now: Date = new Date()
): Promise<PassportMilestone[]> {
  const summary = await getPassportSummary(now);
  return summary.milestones;
}

/**
 * Returns highlights for the passport.
 */
export async function getHighlights(
  now: Date = new Date()
): Promise<PassportHighlight[]> {
  const summary = await getPassportSummary(now);
  return summary.highlights;
}

/**
 * Returns journey stats (compact aggregate).
 */
export async function getJourneyStats(
  now: Date = new Date()
): Promise<PassportActivityStats> {
  const summary = await getPassportSummary(now);
  return summary.activityStats;
}
