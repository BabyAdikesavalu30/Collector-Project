/**
 * Home 2.0 Service
 * Deterministic aggregation and recommendation layer for the upgraded Home Dashboard.
 * Reads from ALL existing canonical feature stores.
 * Never creates new sources of truth.
 *
 * Architecture:
 *   Existing Sources → Home2Service → HomeViewModel → Home UI
 */

import { storage, STORAGE_KEYS } from '../../storage/asyncStorage';
import { AuthSession, SessionRepository } from '../auth';
import { calculateScienceLevel } from '../levels';
import { StreakService, StreakInfo } from '../streaks';
import { getActivityHistory, countActivityTypes } from '../activity';
import { ActivityHistoryItem, ActivityTypeCounts } from '../activity/activity.types';
import { getUnlockedAchievements } from '../achievements/achievements.storage';
import { getBadgeDefinition } from '../achievements/achievements.engine';
import { getCertificates } from '../certificates/certificates.storage';
import { loadOrInitializeDailyGoal, DailyGoalWithProgress } from '../daily-goal';
import { microLessonRepository } from '../micro-lessons/microLessons.repository';
import { getAllProgress as getMicroLessonsProgress } from '../micro-lessons/microLessons.storage';
import { conceptMapRepository } from '../concept-maps/conceptMaps.repository';
import { getAllConceptMapProgress } from '../concept-maps/conceptMaps.storage';
import { experimentRepository } from '../experiment-lab/experiment.repository';
import { getAllExperimentProgress } from '../experiment-lab/experiment.storage';
import { getMysteryProgress } from '../mystery-lab/mystery.storage';
import { getMysteryCases } from '../mystery-lab/mystery.cases';
import { getAllGamesProgress, getGameLevelCount } from '../games/games.storage';
import { getMostRecentAchievement } from '../achievements/achievements.storage';
import { getFunFactsProgress } from '../fun-facts/fun-facts.storage';
import { getAllCollectionProgress } from '../science-passport/sciencePassport.collectionHelpers';
import { focusAreaService } from '../weak-areas';
import { getQuizStats } from '../quiz/quiz-history.storage';
import { QuizStats } from '../quiz/quiz-history.types';
import {
  HomeViewModel,
  HomeStudent,
  TodayOverview,
  HomeDailyGoal,
  ContinueLearningItem,
  HomeFocusArea,
  HomeProgressSnapshot,
  HomeAchievementPreview,
  HomeDiscoveryPreview,
  HomeCertificatePreview,
  HomePassportPreview,
  HomeDailyChallenge,
  HomeExploreItem,
  HomeRecentActivity,
  HomeRecommendation,
} from './home2.types';
import { buildDailyChallengePreview, getChallengeDateString } from '../challenges';

// ============================================================================
// Date Utilities
// ============================================================================

function getTodayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function getGreetingKey(): 'morning' | 'afternoon' | 'evening' {
  const hours = new Date().getHours();
  if (hours < 12) return 'morning';
  if (hours < 17) return 'afternoon';
  return 'evening';
}

// ============================================================================
// Main Aggregation
// ============================================================================

export async function getHomeViewModel(): Promise<HomeViewModel> {
  const [
    session,
    storedProfile,
    history,
    achievements,
    certificates,
    dailyGoal,
    microLessonsProgress,
    conceptMapsProgress,
    experimentsProgress,
    mysteryProgress,
    gamesProgress,
    collectionProgress,
    quizStats,
    streakInfo,
  ] = await Promise.all([
    loadSession(),
    loadProfile(),
    getActivityHistory().catch(() => [] as ActivityHistoryItem[]),
    getUnlockedAchievements().catch(() => ({} as Record<string, number>)),
    getCertificates().catch(() => []),
    loadDailyGoal(),
    getMicroLessonsProgress().catch(() => ({})),
    getAllConceptMapProgress().catch(() => ({})),
    getAllExperimentProgress().catch(() => ({})),
    getMysteryProgress().catch(() => ({ completedCases: [] as string[] })),
    getAllGamesProgress().catch(() => ({})),
    getAllCollectionProgress().catch(() => ({ completedCount: 0, totalCount: 10 })),
    getQuizStats().catch(() => null),
    StreakService.getUnifiedStreak().catch(() => null),
  ]);

  // Derive student identity
  const student = buildStudent(session, storedProfile);

  // Derive today overview
  const today = buildTodayOverview(history, streakInfo);

  // Derive progress snapshot
  const progress = buildProgressSnapshot(history, quizStats);

  // Derive continue learning
  const continueLearning = await buildContinueLearning(
    microLessonsProgress,
    conceptMapsProgress,
    experimentsProgress,
    mysteryProgress
  );

  // Derive focus area
  const focusArea = await buildFocusArea();

  // Derive recent achievement
  const recentAchievement = await buildRecentAchievement();

  // Derive discovery preview
  const discovery = buildDiscoveryPreview(collectionProgress);

  // Derive certificate preview
  const certificate = buildCertificatePreview(certificates);

  // Derive passport preview
  const passport = buildPassportPreview(
    progress,
    achievements,
    collectionProgress,
    experimentsProgress
  );

  // Derive daily challenge (from existing mock/service)
  const dailyChallenge = buildDailyChallenge();

  // Derive explore items
  const exploreItems = buildExploreItems();

  // Derive recent activity
  const recentActivity = buildRecentActivity(history);

  // Derive quick actions
  const quickActions = buildQuickActions();

  // Determine primary recommendation
  const primaryRecommendation = determinePrimaryRecommendation(
    dailyGoal,
    continueLearning,
    focusArea,
    today,
    recentAchievement
  );

  return {
    student,
    today,
    dailyGoal,
    primaryRecommendation,
    continueLearning,
    focusArea,
    progress,
    recentAchievement,
    discovery,
    certificate,
    passport,
    dailyChallenge,
    exploreItems,
    recentActivity,
    quickActions,
    isLoading: false,
    isOffline: false,
    error: null,
  };
}

// ============================================================================
// Builder Functions
// ============================================================================

function buildStudent(
  session: AuthSession | null,
  profile: { fullName?: string; grade?: string; school?: string } | null
): HomeStudent {
  const isDemo = session?.authMode === 'demo';
  const name = session?.fullName || profile?.fullName || (isDemo ? 'Anu' : 'Young Scientist');
  const initials = name
    .split(' ')
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'YS';

  return {
    name,
    initials,
    grade: profile?.grade || (isDemo ? 'Grade 8' : '—'),
    school: profile?.school || (isDemo ? 'R.M.K. School' : ''),
    unreadNotifications: 0, // Will be set by notification system
  };
}

export function buildTodayOverview(
  history: ActivityHistoryItem[],
  streakInfo?: StreakInfo | null
): TodayOverview {
  const todayKey = getTodayKey();
  const todayActivities = history.filter(
    (h) => new Date(h.timestamp).toISOString().split('T')[0] === todayKey
  );
  const xpToday = todayActivities.reduce((sum, h) => sum + (h.xpEarned || 0), 0);

  return {
    dateKey: todayKey,
    greeting: getGreetingKey(),
    xpToday,
    activitiesToday: todayActivities.length,
    streakDays: streakInfo?.currentStreak ?? 0,
  };
}

export function buildProgressSnapshot(
  history: ActivityHistoryItem[],
  quizStats?: QuizStats | null
): HomeProgressSnapshot {
  const totalActivities = history.length;
  const topicsExplored = new Set(
    history
      .map((h) => h.metadata?.subjectId)
      .filter(Boolean)
  ).size;

  // Compute accuracy from quiz analytics or quiz completed activities
  let practiceAccuracy: number | null = null;
  if (quizStats && quizStats.totalQuestionsAttempted > 0) {
    practiceAccuracy = quizStats.overallAccuracy;
  } else {
    const quizActivities = history.filter((h) => h.type === 'quiz_completed');
    if (quizActivities.length > 0) {
      const percentages = quizActivities
        .map((h) => h.metadata?.percentage)
        .filter((p): p is number => typeof p === 'number' && !isNaN(p));
      if (percentages.length > 0) {
        practiceAccuracy = Math.round(percentages.reduce((a, b) => a + b, 0) / percentages.length);
      }
    }
  }

  const totalXp = history.reduce((sum, h) => sum + (h.xpEarned || 0), 0);
  const scienceLevel = calculateScienceLevel(totalXp);

  return {
    totalActivities,
    topicsExplored,
    practiceAccuracy,
    overallProgress: Math.min(100, Math.round((totalActivities / 50) * 100)),
    scienceLevel: {
      level: scienceLevel.level,
      title: scienceLevel.title,
      titleTa: scienceLevel.titleTa,
      icon: scienceLevel.icon,
      progressPercent: scienceLevel.progressPercent,
      totalXp: scienceLevel.totalXp,
    },
  };
}

async function buildContinueLearning(
  microLessonsProgress: Record<string, { status?: string; progressPercent?: number; lastSectionIndex?: number }>,
  conceptMapsProgress: Record<string, { status?: string; progressPercent?: number; exploredNodeIds?: string[] }>,
  experimentsProgress: Record<string, { completed?: boolean; runCount?: number; reflectionAnswered?: boolean }>,
  mysteryProgress: { completedCases: string[] }
): Promise<ContinueLearningItem | null> {
  // Priority 1: In-progress micro lesson
  const inProgressLesson = Object.entries(microLessonsProgress).find(
    ([, p]) => p?.status === 'in_progress'
  );
  if (inProgressLesson) {
    try {
      const lesson = await microLessonRepository.getLessonById(inProgressLesson[0]);
      if (lesson) {
        const record = inProgressLesson[1];
        const progressPercent = typeof record?.progressPercent === 'number'
          ? record.progressPercent
          : record?.lastSectionIndex && lesson.sections?.length
          ? Math.min(95, Math.max(10, Math.round((record.lastSectionIndex / lesson.sections.length) * 100)))
          : 50;

        return {
          source: 'micro-lesson',
          title: lesson.title.en,
          titleTa: lesson.title.ta,
          subtitle: lesson.subject,
          subtitleTa: lesson.subject,
          subject: lesson.subject,
          progressPercent,
          route: `/micro-lesson/${lesson.id}`,
          icon: lesson.icon,
        } as ContinueLearningItem;
      }
    } catch { /* continue to next priority */ }
  }

  // Priority 2: In-progress concept map
  const inProgressMap = Object.entries(conceptMapsProgress).find(
    ([, p]) => p?.status === 'in_progress'
  );
  if (inProgressMap) {
    try {
      const map = await conceptMapRepository.getMapById(inProgressMap[0]);
      if (map) {
        const record = inProgressMap[1];
        const progressPercent = typeof record?.progressPercent === 'number'
          ? record.progressPercent
          : record?.exploredNodeIds && map.nodes?.length
          ? Math.min(95, Math.max(10, Math.round((record.exploredNodeIds.length / map.nodes.length) * 100)))
          : 40;

        return {
          source: 'concept-map',
          title: map.title.en,
          titleTa: map.title.ta,
          subtitle: map.subject,
          subtitleTa: map.subject,
          subject: map.subject,
          progressPercent,
          route: `/concept-map/${map.id}`,
          icon: map.icon || '🗺️',
        } as ContinueLearningItem;
      }
    } catch { /* continue */ }
  }

  // Priority 3: Incomplete experiment
  const incompleteExperiment = Object.entries(experimentsProgress).find(
    ([, p]) => p && !p.completed
  );
  if (incompleteExperiment) {
    try {
      const exp = await experimentRepository.getExperimentById(incompleteExperiment[0]);
      if (exp) {
        const record = incompleteExperiment[1];
        const progressPercent = record?.completed
          ? 100
          : record?.reflectionAnswered
          ? 75
          : (record?.runCount || 0) > 0
          ? 50
          : 25;

        return {
          source: 'experiment',
          title: exp.title.en,
          titleTa: exp.title.ta,
          subtitle: exp.subject,
          subtitleTa: exp.subject,
          subject: exp.subject,
          progressPercent,
          route: `/experiment/${exp.id}`,
          icon: exp.heroAsset || '🧪',
        } as ContinueLearningItem;
      }
    } catch { /* continue */ }
  }

  return null;
}

async function buildFocusArea(): Promise<HomeFocusArea | null> {
  try {
    const snapshot = await focusAreaService.getFocusAreasSnapshot();
    if (snapshot.focusAreas.length > 0) {
      const top = snapshot.focusAreas[0];
      return {
        topic: top.title.en,
        topicTa: top.title.ta,
        subject: top.subjectId,
        subjectTa: top.subjectId,
        accuracy: top.accuracy,
        action: {
          label: 'Practice',
          labelTa: 'பயிற்சி',
          route: top.action.route,
        },
      };
    }
  } catch { /* no focus areas */ }
  return null;
}

async function buildRecentAchievement(): Promise<HomeAchievementPreview | null> {
  try {
    const recent = await getMostRecentAchievement();
    if (recent) {
      const def = getBadgeDefinition(recent.badgeId);
      return {
        id: recent.badgeId,
        title: def.title.en,
        titleTa: def.title.ta,
        icon: def.icon,
        unlockedLabel: 'Unlocked recently',
        unlockedLabelTa: 'சமீபத்தில் திறக்கப்பட்டது',
      };
    }
  } catch { /* no achievements */ }
  return null;
}

function buildDiscoveryPreview(
  collectionProgress: { completedCount: number; totalCount: number }
): HomeDiscoveryPreview | null {
  if (collectionProgress.totalCount > 0) {
    return {
      title: 'Science Collections',
      titleTa: 'அறிவியல் தொகுப்புகள்',
      subtitle: `${collectionProgress.completedCount} of ${collectionProgress.totalCount} complete`,
      subtitleTa: `${collectionProgress.completedCount} / ${collectionProgress.totalCount} நிறைவடைந்தது`,
      icon: '📦',
      completedCount: collectionProgress.completedCount,
      totalCount: collectionProgress.totalCount,
      route: '/explore',
    };
  }
  return null;
}

function buildCertificatePreview(
  certificates: Array<{ title: { en: string; ta: string } }>
): HomeCertificatePreview | null {
  if (certificates.length > 0) {
    return {
      count: certificates.length,
      latestTitle: certificates[0].title.en,
      latestTitleTa: certificates[0].title.ta,
      route: '/certificates',
    };
  }
  return null;
}

function buildPassportPreview(
  progress: HomeProgressSnapshot,
  achievements: Record<string, number>,
  collectionProgress: { completedCount: number },
  experimentsProgress: Record<string, unknown>
): HomePassportPreview | null {
  const level = progress.scienceLevel;
  if (!level) return null;

  return {
    level: level.level,
    levelTitle: level.title,
    levelTitleTa: level.titleTa,
    badgeCount: Object.keys(achievements).length,
    collectionCount: collectionProgress.completedCount,
    experimentCount: Object.keys(experimentsProgress).length,
    route: '/science-passport',
  };
}

function buildDailyChallenge(): HomeDailyChallenge | null {
  try {
    const preview = buildDailyChallengePreview(getChallengeDateString());
    if (preview) {
      return {
        id: preview.id,
        title: preview.title.en,
        titleTa: preview.title.ta,
        questionPreview: preview.questionPreview.en,
        questionPreviewTa: preview.questionPreview.ta,
        durationMinutes: preview.durationMinutes,
        xpReward: preview.xpReward,
      };
    }
  } catch {
    // Fallback if challenge question bank unavailable
  }
  return null;
}

function buildExploreItems(): HomeExploreItem[] {
  return [
    {
      id: 'mystery',
      icon: '🕵️',
      title: 'Mystery Lab',
      titleTa: 'மர்ம ஆய்வகம்',
      subtitle: 'Solve science mysteries',
      subtitleTa: 'அறிவியல் மர்மங்களைத் தீர்க்கவும்',
      route: '/mystery-lab',
      accentColor: '#7E22CE',
      bgColor: '#FAF5FF',
    },
    {
      id: 'experiments',
      icon: '🧪',
      title: 'Experiment Lab',
      titleTa: 'சோதனை ஆய்வகம்',
      subtitle: 'Virtual simulations',
      subtitleTa: 'மெய்நிகர் சிமுலேஷன்கள்',
      route: '/experiment-lab',
      accentColor: '#16A34A',
      bgColor: '#F0FDF4',
    },
    {
      id: 'games',
      icon: '🎮',
      title: 'Games',
      titleTa: 'ஆட்டங்கள்',
      subtitle: 'Play & discover',
      subtitleTa: 'விளையாடுங்கள் & கண்டறியுங்கள்',
      route: '/games',
      accentColor: '#2563EB',
      bgColor: '#EFF6FF',
    },
    {
      id: 'riddles',
      icon: '🧩',
      title: 'Riddles',
      titleTa: 'புதிர்கள்',
      subtitle: 'Brain teasers',
      subtitleTa: 'மூளைச் சவால்கள்',
      route: '/riddles',
      accentColor: '#D97706',
      bgColor: '#FFFBEB',
    },
    {
      id: 'fun-facts',
      icon: '✨',
      title: 'Fun Facts',
      titleTa: 'சுவாரஸ்ய தகவல்கள்',
      subtitle: 'Daily discoveries',
      subtitleTa: 'தினசரி கண்டுபிடிப்புகள்',
      route: '/fun-facts',
      accentColor: '#059669',
      bgColor: '#ECFDF5',
    },
    {
      id: 'passport',
      icon: '📘',
      title: 'Science Passport',
      titleTa: 'அறிவியல் கடவுச்சீட்டு',
      subtitle: 'Your journey',
      subtitleTa: 'உங்கள் பயணம்',
      route: '/science-passport',
      accentColor: '#7E22CE',
      bgColor: '#FAF5FF',
    },
  ];
}

function buildRecentActivity(history: ActivityHistoryItem[]): HomeRecentActivity[] {
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

  return history.slice(0, 5).map((item) => ({
    id: item.id,
    type: item.type,
    title: item.title,
    titleTa: item.titleTa,
    timestamp: item.timestamp,
    xpEarned: item.xpEarned,
    icon: iconMap[item.type] || '📌',
  }));
}

function buildQuickActions() {
  return [
    { id: 'learn', icon: '📚', label: 'Learn', labelTa: 'கற்றல்', route: '/learn' },
    { id: 'quizzes', icon: '🧠', label: 'Quizzes', labelTa: 'வினாடி வினா', route: '/learn' },
    { id: 'games', icon: '🎮', label: 'Games', labelTa: 'ஆட்டங்கள்', route: '/games' },
    { id: 'riddles', icon: '🧩', label: 'Riddles', labelTa: 'புதிர்கள்', route: '/riddles' },
    { id: 'experiments', icon: '🧪', label: 'Experiments', labelTa: 'சோதனைகள்', route: '/experiment-lab' },
    { id: 'mystery', icon: '🕵️', label: 'Mystery', labelTa: 'மர்மம்', route: '/mystery-lab' },
  ];
}

// ============================================================================
// Primary Recommendation Engine (Deterministic Priority)
// ============================================================================

function determinePrimaryRecommendation(
  dailyGoal: HomeDailyGoal | null,
  continueLearning: ContinueLearningItem | null,
  focusArea: HomeFocusArea | null,
  today: TodayOverview,
  recentAchievement: HomeAchievementPreview | null
): HomeRecommendation | null {
  // P1: Daily Goal requiring one final action
  if (dailyGoal && dailyGoal.status === 'active' && dailyGoal.current < dailyGoal.target) {
    const remaining = dailyGoal.target - dailyGoal.current;
    return {
      reason: 'daily_goal',
      title: `${remaining} more activit${remaining === 1 ? 'y' : 'ies'} to reach your goal`,
      titleTa: `இலக்கை அடைய ${remaining} செயல்பாட${remaining === 1 ? 'ு' : 'ுகள்'}`,
      subtitle: 'Complete your daily science goal',
      subtitleTa: 'உங்கள் தினசரி அறிவியல் இலக்கை நிறைவு செய்யுங்கள்',
      icon: '🎯',
      route: '/daily-goal',
    };
  }

  // P2: Unfinished learning activity
  if (continueLearning) {
    return {
      reason: 'continue_learning',
      title: continueLearning.title,
      titleTa: continueLearning.titleTa,
      subtitle: `${continueLearning.subject} · ${continueLearning.progressPercent}% complete`,
      subtitleTa: `${continueLearning.subject} · ${continueLearning.progressPercent}% நிறைவடைந்தது`,
      icon: continueLearning.icon,
      route: continueLearning.route,
    };
  }

  // P3: Focus area
  if (focusArea) {
    return {
      reason: 'focus_area',
      title: `Strengthen: ${focusArea.topic}`,
      titleTa: `வலுப்படுத்து: ${focusArea.topicTa}`,
      subtitle: `Practice confidence: ${focusArea.accuracy}%`,
      subtitleTa: `பயிற்சி நம்பிக்கை: ${focusArea.accuracy}%`,
      icon: '🎯',
      route: focusArea.action.route,
    };
  }

  // P4: Daily challenge
  return {
    reason: 'daily_challenge',
    title: "Today's Science Challenge",
    titleTa: 'இன்றைய அறிவியல் சவால்',
    subtitle: 'Test your knowledge',
    subtitleTa: 'உங்கள் அறிவைச் சோதியுங்கள்',
    icon: '⚡',
    route: '/challenges',
  };
}

// ============================================================================
// Data Loading Helpers
// ============================================================================

async function loadSession(): Promise<AuthSession | null> {
  try { return await SessionRepository.getSession(); } catch { return null; }
}

interface StoredProfile {
  fullName?: string;
  grade?: string;
  school?: string;
}

async function loadProfile(): Promise<StoredProfile | null> {
  try { return await storage.getItem<StoredProfile>(STORAGE_KEYS.STUDENT_PROFILE); } catch { return null; }
}

async function loadDailyGoal(): Promise<HomeDailyGoal | null> {
  try {
    const history = await getActivityHistory();
    const goal = await loadOrInitializeDailyGoal(history);
    if (goal) {
      return {
        title: goal.definition.title,
        titleTa: goal.definition.titleTa,
        current: goal.progress.current,
        target: goal.progress.target,
        status: goal.status,
        rewardPoints: goal.definition.reward.points,
        rewardXp: goal.definition.reward.xp,
      };
    }
  } catch { /* no daily goal */ }
  return null;
}

// Re-export types for consumers
export type { HomeViewModel } from './home2.types';
