/**
 * Profile Aggregation Service
 * Composes the student science identity view from existing local data:
 * stored profile, XP ledger, activity history, quiz stats, game progress,
 * mystery progress, fun facts, achievements, and certificates.
 * Pure aggregation helpers are exported for unit tests.
 */

import { storage, STORAGE_KEYS } from '../../storage/asyncStorage';
import { AuthSession, SessionRepository } from '../auth';
import { calculateScienceLevel } from '../levels';
import { calculateStreak } from '../streaks';
import { countActivityTypes, getActivityHistory, getTotalXpBalance } from '../activity';
import { ActivityTypeCounts, ActivityHistoryItem } from '../activity';
import { getQuizStats } from '../quiz';
import { getAllGamesProgress, calculateMasteryPercent, getGameLevelCount } from '../games/games.storage';
import { getMysteryProgress } from '../mystery-lab/mystery.storage';
import { getMysteryCases } from '../mystery-lab/mystery.cases';
import { getFunFactsProgress } from '../fun-facts/fun-facts.storage';
import { FUN_FACTS } from '../fun-facts/fun-facts.mock';
import { getUnlockedAchievements } from '../achievements';
import { getCertificates } from '../certificates';
import { XP_MILESTONES } from '../xp';
import { Milestone } from '../xp';
import { UnlockedAchievement } from '../achievements';
import { Certificate } from '../certificates';
import { ActivitySummaryData, ProfileViewData, ScienceDomain, ScienceStrength } from './profile.types';

export const SCIENCE_DOMAIN_LABELS: Record<ScienceDomain, { label: string; labelTa: string; icon: string }> = {
  physics: { label: 'Physics', labelTa: 'இயற்பியல்', icon: '⚛️' },
  chemistry: { label: 'Chemistry', labelTa: 'வேதியியல்', icon: '🧪' },
  biology: { label: 'Biology', labelTa: 'உயிரியல்', icon: '🧬' },
  space: { label: 'Space', labelTa: 'விண்வெளி', icon: '🪐' },
  environment: { label: 'Environment', labelTa: 'சுற்றுச்சூழல்', icon: '🌿' },
  general: { label: 'General Science', labelTa: 'பொது அறிவியல்', icon: '🔬' },
};

// ─────────────────────────────────────────────────────────────────────────
// Pure helpers
// ─────────────────────────────────────────────────────────────────────────

export interface StrengthInput {
  quizAccuracyBySubject: Record<string, number>;
  gameMasteryByDomain: Record<string, number>;
  mysterySolvedRatioByDomain: Record<string, number>;
  factDiscoveredRatioByDomain: Record<string, number>;
}

/** Averages available signals; missing signals are excluded. Pure. */
export function computeScienceStrengths(input: StrengthInput): ScienceStrength[] {
  const domains: ScienceDomain[] = ['physics', 'chemistry', 'biology', 'space', 'environment', 'general'];

  return domains.map((domain) => {
    const signals: string[] = [];
    const values: number[] = [];

    const quiz = input.quizAccuracyBySubject[domain];
    if (quiz !== undefined) {
      values.push(clampPercent(quiz));
      signals.push('quiz');
    }
    const game = input.gameMasteryByDomain[domain];
    if (game !== undefined) {
      values.push(clampPercent(game));
      signals.push('games');
    }
    const mystery = input.mysterySolvedRatioByDomain[domain];
    if (mystery !== undefined) {
      values.push(clampPercent(mystery));
      signals.push('mystery');
    }
    const facts = input.factDiscoveredRatioByDomain[domain];
    if (facts !== undefined) {
      values.push(clampPercent(facts));
      signals.push('facts');
    }

    const percent = values.length > 0 ? Math.round(values.reduce((a, b) => a + b, 0) / values.length) : 0;
    const meta = SCIENCE_DOMAIN_LABELS[domain];
    return { domain, label: meta.label, labelTa: meta.labelTa, icon: meta.icon, percent, signals };
  });
}

function clampPercent(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(100, value));
}

/** Pure activity summary computation. */
export function computeActivitySummary(counts: ActivityTypeCounts): ActivitySummaryData {
  const total =
    (counts.quiz_completed || 0) +
    (counts.riddle_completed || 0) +
    (counts.game_completed || 0) +
    (counts.mystery_completed || 0) +
    (counts.fact_discovered || 0) +
    (counts.challenge_completed || 0) +
    (counts.micro_lesson_completed || 0) +
    (counts.concept_map_completed || 0) +
    (counts.experiment_completed || 0);
  return {
    quizzesCompleted: counts.quiz_completed || 0,
    riddlesSolved: counts.riddle_completed || 0,
    gamesPlayed: counts.game_completed || 0,
    mysteriesSolved: counts.mystery_completed || 0,
    factsDiscovered: counts.fact_discovered || 0,
    challengesCompleted: counts.challenge_completed || 0,
    microLessonsCompleted: counts.micro_lesson_completed || 0,
    conceptMapsCompleted: counts.concept_map_completed || 0,
    experimentsCompleted: counts.experiment_completed || 0,
    totalActivities: total,
  };
}

/** Pure milestone evaluation from total XP. */
export function computeReachedMilestones(totalXp: number): Milestone[] {
  return XP_MILESTONES.filter((m) => totalXp >= m.xpThreshold);
}

// ─────────────────────────────────────────────────────────────────────────
// Async aggregation
// ─────────────────────────────────────────────────────────────────────────

export async function loadProfileView(): Promise<ProfileViewData> {
  const [session, storedProfile, history, xpBalance, quizStats, gameProgress, mysteryProgress, factsProgress, unlockedBadges, certificates] =
    await Promise.all([
      SessionRepository.getSession(),
      storage.getItem<{ fullName?: string; grade?: string; section?: string; school?: string; city?: string; avatarId?: string }>(
        STORAGE_KEYS.STUDENT_PROFILE
      ),
      getActivityHistory(),
      getTotalXpBalance(),
      getQuizStats(),
      getAllGamesProgress(),
      getMysteryProgress(),
      getFunFactsProgress(),
      getUnlockedAchievements(),
      getCertificates(),
    ]);

  const level = calculateScienceLevel(xpBalance);
  const streak = calculateStreak(history.map((h) => h.timestamp));
  const counts = countActivityTypes(history);

  const isDemo = session?.authMode === 'demo';
  const name = storedProfile?.fullName || session?.fullName || (isDemo ? 'Anu' : '—');
  const initials =
    name && name !== '—'
      ? name
          .split(' ')
          .map((part) => part[0])
          .filter(Boolean)
          .slice(0, 2)
          .join('')
          .toUpperCase() || '—'
      : '—';

  const strengths = computeScienceStrengths({
    quizAccuracyBySubject: subjectAccuracyMap(quizStats.subjectStats),
    gameMasteryByDomain: gameMasteryByDomain(gameProgress),
    mysterySolvedRatioByDomain: mysteryRatioByDomain(mysteryProgress.completedCases, history),
    factDiscoveredRatioByDomain: factsRatioByDomain(factsProgress.factsDiscovered),
  });

  const unlockedList: UnlockedAchievement[] = Object.entries(unlockedBadges)
    .map(([badgeId, unlockedAt]) => ({ badgeId: badgeId as UnlockedAchievement['badgeId'], unlockedAt }))
    .sort((a, b) => b.unlockedAt - a.unlockedAt);

  const recentActivity = history.slice(0, 15).map((h) => ({
    id: h.id,
    type: h.type,
    title: h.title,
    titleTa: h.titleTa,
    timestamp: h.timestamp,
    xpEarned: h.xpEarned,
  }));

  return {
    profile: {
      name,
      grade: storedProfile?.grade || (isDemo ? 'Grade 8' : '—'),
      section: storedProfile?.section || (isDemo ? 'A' : '—'),
      school: storedProfile?.school || (isDemo ? 'R.M.K. School' : '—'),
      city: storedProfile?.city || '',
      avatarId: storedProfile?.avatarId,
      initials,
      isDemo,
    },
    level,
    totalXp: xpBalance,
    streak,
    counts,
    activitySummary: computeActivitySummary(counts),
    strengths,
    recognition: {
      achievements: unlockedList,
      certificates,
      milestonesReached: computeReachedMilestones(xpBalance),
    },
    recentActivity,
  };
}

function subjectAccuracyMap(subjectStats: { subjectId: string; accuracy: number }[]): Record<string, number> {
  const map: Record<string, number> = {};
  for (const stat of subjectStats) {
    map[stat.subjectId] = stat.accuracy;
  }
  return map;
}

/** Game category mastery mapped onto the six science domains. */
function gameMasteryByDomain(
  progress: Record<string, { levels: Record<string, { completed?: boolean; stars?: number }> }>
): Record<string, number> {
  const domainByGame: Record<string, ScienceDomain> = {
    'circuit-lab': 'physics',
    'gravity-path': 'physics',
    'magnet-maze': 'physics',
    'element-match': 'chemistry',
    'molecule-builder': 'chemistry',
    'reaction-sort': 'chemistry',
    'dna-sequence': 'biology',
    orbit: 'space',
    'time-machine': 'space',
    'lab-escape': 'general',
    'memory-matrix': 'general',
    'pattern-lab': 'general',
    'logic-lock': 'general',
    'mini-sudoku': 'general',
    queens: 'general',
    tango: 'general',
    zip: 'general',
    patches: 'general',
    wend: 'general',
    'science-word-grid': 'general',
  };

  const totals: Record<string, { earned: number; max: number }> = {};
  for (const [gameId, gameProgress] of Object.entries(progress)) {
    const domain = domainByGame[gameId];
    if (!domain || !gameProgress?.levels) continue;
    const totalLevels = getGameLevelCount(gameId as never);
    const mastery = calculateMasteryPercent(gameProgress.levels as never, totalLevels);
    const bucket = totals[domain] || { earned: 0, max: 0 };
    bucket.earned += mastery;
    bucket.max += 100;
    totals[domain] = bucket;
  }

  const result: Record<string, number> = {};
  for (const [domain, bucket] of Object.entries(totals)) {
    if (bucket.max > 0) result[domain] = Math.round((bucket.earned / bucket.max) * 100);
  }
  return result;
}

/** Mystery solved ratio per domain. */
function mysteryRatioByDomain(
  completedCases: string[],
  history: ActivityHistoryItem[]
): Record<string, number> {
  const cases = getMysteryCases();
  const completed = new Set(completedCases);

  const totals: Record<string, { solved: number; total: number }> = {};
  for (const mysteryCase of cases) {
    const bucket = totals[mysteryCase.category] || { solved: 0, total: 0 };
    bucket.total += 1;
    if (completed.has(mysteryCase.id)) bucket.solved += 1;
    totals[mysteryCase.category] = bucket;
  }

  const domainMap: Record<string, ScienceDomain> = {
    physics: 'physics',
    chemistry: 'chemistry',
    biology: 'biology',
    'human-body': 'biology',
    space: 'space',
    environment: 'environment',
    'everyday-science': 'general',
    'scientific-history': 'general',
  };

  const result: Record<string, number> = {};
  for (const [category, bucket] of Object.entries(totals)) {
    const domain = domainMap[category];
    if (domain && bucket.total > 0) {
      result[domain] = Math.round((bucket.solved / bucket.total) * 100);
    }
  }
  void history;
  return result;
}

/** Fun fact discovered ratio per domain. */
function factsRatioByDomain(discoveredFactIds: string[]): Record<string, number> {
  const discovered = new Set(discoveredFactIds);

  const totals: Record<string, { found: number; total: number }> = {};
  for (const fact of FUN_FACTS) {
    const bucket = totals[fact.category] || { found: 0, total: 0 };
    bucket.total += 1;
    if (discovered.has(fact.id)) bucket.found += 1;
    totals[fact.category] = bucket;
  }

  const domainMap: Record<string, ScienceDomain> = {
    physics: 'physics',
    chemistry: 'chemistry',
    biology: 'biology',
    'human-body': 'biology',
    space: 'space',
    environment: 'environment',
    'science-history': 'general',
  };

  const result: Record<string, number> = {};
  for (const [category, bucket] of Object.entries(totals)) {
    const domain = domainMap[category];
    if (domain && bucket.total > 0) {
      result[domain] = Math.round((bucket.found / bucket.total) * 100);
    }
  }
  return result;
}

export async function getProfileForView(): Promise<ProfileViewData> {
  return loadProfileView();
}