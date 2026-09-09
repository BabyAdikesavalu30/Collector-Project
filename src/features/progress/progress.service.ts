/**
 * ProgressService
 * Unifies educational activity across Quizzes, Micro Lessons, Concept Maps,
 * Experiments, Riddles, and Activities into a single understandable view.
 *
 * Reads through the existing local repositories — no parallel storage,
 * no remote network calls, no fake data.
 */

import { storage, STORAGE_KEYS } from '../../storage/asyncStorage';
import { getQuizHistory } from '../quiz/quiz-history.storage';
import { QuizHistoryEntry } from '../quiz/quiz-history.types';
import { getAllProgress as getAllMicroLessonProgress } from '../micro-lessons/microLessons.storage';
import { MicroLessonProgress } from '../micro-lessons/microLessons.types';
import { getAllConceptMapProgress } from '../concept-maps/conceptMaps.storage';
import { ConceptMapProgress } from '../concept-maps/conceptMaps.types';
import { getAllExperimentProgress } from '../experiment-lab/experiment.storage';
import { ExperimentProgress } from '../experiment-lab/experiment.types';
import {
  getRecentActivity,
  getTotalXpBalance,
  getUnifiedStreak,
} from '../activity/activity.repository';
import { ActivityHistoryItem } from '../activity/activity.types';
import { getUnlockedAchievements } from '../achievements/achievements.storage';
import { getCertificates } from '../certificates/certificates.storage';
import { focusAreaService } from '../weak-areas';
import { FocusArea, FocusAreasSnapshot } from '../weak-areas/weakAreas.types';
import {
  calculateAccuracy,
  calculateRecentAccuracy,
  calculateSubjectProgress,
  calculateStrengthLevel,
  calculateTopicProgress,
  calculateTopicStatus,
  calculateTrend,
} from './progress.engine';
import {
  ORDERED_SUBJECT_IDS,
  SUBJECT_METAS,
  TOPIC_CATALOG,
  getTopicsForSubject,
  resolveGradeContext,
} from './progress.catalog';
import {
  GradeContext,
  OverallProgress,
  PerformanceTrend,
  RecentProgressActivity,
  SubjectId,
  SubjectProgress,
  SubjectStrength,
  TopicProgress,
} from './progress.types';

export class ProgressService {
  /**
   * Resolves the current learner's grade context from their saved profile.
   */
  async getGradeContext(): Promise<GradeContext> {
    try {
      const profile = await storage.getItem<{ grade?: unknown }>(
        STORAGE_KEYS.STUDENT_PROFILE
      );
      return resolveGradeContext(profile?.grade);
    } catch {
      return 'grade_8_10';
    }
  }

  /**
   * Loads the complete SubjectProgress list across all 7 science subjects.
   */
  async getAllSubjectProgress(): Promise<SubjectProgress[]> {
    const gradeContext = await this.getGradeContext();
    const [
      quizHistory,
      mlProgress,
      cmapProgress,
      expProgress,
      focusSnapshot,
    ] = await Promise.all([
      getQuizHistory().catch(() => [] as QuizHistoryEntry[]),
      getAllMicroLessonProgress().catch(() => ({} as Record<string, MicroLessonProgress>)),
      getAllConceptMapProgress().catch(() => ({} as Record<string, ConceptMapProgress>)),
      getAllExperimentProgress().catch(() => ({} as Record<string, ExperimentProgress>)),
      focusAreaService.getFocusAreasSnapshot().catch(() => null),
    ]);

    const results: SubjectProgress[] = [];
    for (const subjectId of ORDERED_SUBJECT_IDS) {
      const sp = this.computeSubjectProgress({
        subjectId,
        gradeContext,
        quizHistory,
        mlProgress,
        cmapProgress,
        expProgress,
        focusSnapshot,
      });
      results.push(sp);
    }
    return results;
  }

  /**
   * Loads SubjectProgress for a single subject.
   */
  async getSubjectProgress(subjectId: string): Promise<SubjectProgress | null> {
    const list = await this.getAllSubjectProgress();
    return list.find((s) => s.subjectId === subjectId) || null;
  }

  /**
   * Loads detailed TopicProgress array for a single subject.
   */
  async getTopicProgressForSubject(subjectId: string): Promise<TopicProgress[]> {
    const gradeContext = await this.getGradeContext();
    const [
      quizHistory,
      mlProgress,
      cmapProgress,
      expProgress,
      focusSnapshot,
    ] = await Promise.all([
      getQuizHistory().catch(() => [] as QuizHistoryEntry[]),
      getAllMicroLessonProgress().catch(() => ({} as Record<string, MicroLessonProgress>)),
      getAllConceptMapProgress().catch(() => ({} as Record<string, ConceptMapProgress>)),
      getAllExperimentProgress().catch(() => ({} as Record<string, ExperimentProgress>)),
      focusAreaService.getFocusAreasSnapshot().catch(() => null),
    ]);

    return this.computeTopicsForSubject({
      subjectId: subjectId as SubjectId,
      gradeContext,
      quizHistory,
      mlProgress,
      cmapProgress,
      expProgress,
      focusSnapshot,
    });
  }

  /**
   * Computes overall aggregated journey progress.
   */
  async getOverallProgress(): Promise<OverallProgress> {
    const [
      subjectProgressList,
      streakResult,
      totalXp,
      unlockedBadges,
      certificates,
      focusSnapshot,
    ] = await Promise.all([
      this.getAllSubjectProgress(),
      getUnifiedStreak().catch(() => ({ currentStreak: 0, longestStreak: 0 })),
      getTotalXpBalance().catch(() => 0),
      getUnlockedAchievements().catch(() => ({})),
      getCertificates().catch(() => []),
      focusAreaService.getFocusAreasSnapshot().catch(() => null),
    ]);

    const totalSubjects = ORDERED_SUBJECT_IDS.length;
    let subjectsExplored = 0;
    let totalTopics = 0;
    let topicsExplored = 0;
    let totalProgressSum = 0;
    let totalActivitiesCompleted = 0;
    let latestActivityAt: number | null = null;

    for (const sp of subjectProgressList) {
      totalTopics += sp.topicCount;
      topicsExplored += sp.topicsStarted;
      totalActivitiesCompleted += sp.completedActivities;
      totalProgressSum += sp.overallProgress;
      if (sp.topicsStarted > 0 || sp.completedActivities > 0) {
        subjectsExplored++;
      }
      if (sp.lastActivityAt && (latestActivityAt === null || sp.lastActivityAt > latestActivityAt)) {
        latestActivityAt = sp.lastActivityAt;
      }
    }

    const overallProgress =
      totalSubjects > 0 ? Math.round(totalProgressSum / totalSubjects) : 0;

    return {
      overallProgress,
      streakDays: streakResult.currentStreak,
      totalXp,
      achievementsCount: Object.keys(unlockedBadges).length,
      certificatesCount: certificates.length,
      subjectsExplored,
      totalSubjects,
      topicsExplored,
      totalTopics,
      activitiesCompleted: totalActivitiesCompleted,
      focusAreasCount: focusSnapshot?.focusAreas.length ?? 0,
      lastActivityAt: latestActivityAt,
    };
  }

  /**
   * Returns evidence-based subject strengths.
   * A subject is only a strength if the student has explored topics and maintained high accuracy/progress.
   */
  async getStrengths(): Promise<SubjectStrength[]> {
    const list = await this.getAllSubjectProgress();
    const candidates: SubjectStrength[] = [];

    for (const sp of list) {
      // Evidence requirement: at least 1 topic started and overall progress >= 60% OR accuracy >= 70%
      if (
        sp.topicsStarted >= 1 &&
        (sp.overallProgress >= 60 || (sp.activityCount >= 2 && sp.averageAccuracy >= 70))
      ) {
        candidates.push({
          subjectId: sp.subjectId as SubjectId,
          title: sp.title,
          progress: sp.overallProgress,
          accuracy: sp.averageAccuracy,
          strengthLevel: sp.strengthLevel,
        });
      }
    }

    // Sort by progress descending, then accuracy descending
    candidates.sort((a, b) => b.progress - a.progress || b.accuracy - a.accuracy);
    return candidates;
  }

  /**
   * Returns recent activities filtered optionally by subject.
   */
  async getRecentActivities(
    subjectId?: string,
    limit: number = 8
  ): Promise<RecentProgressActivity[]> {
    const history: ActivityHistoryItem[] = await getRecentActivity(50).catch(() => []);
    const items: RecentProgressActivity[] = [];
    const seenDedupe = new Set<string>();

    for (const h of history) {
      if (!h || !h.id) continue;
      const dedupe = `${h.type}::${h.id}`;
      if (seenDedupe.has(dedupe)) continue;
      seenDedupe.add(dedupe);

      const targetSubject = (h.metadata?.subjectId as string) || this.inferSubjectFromTitle(h.title);
      if (subjectId && targetSubject !== subjectId) {
        continue;
      }

      let activityType: RecentProgressActivity['activityType'] = 'general';
      if (h.type === 'quiz_completed') activityType = 'quiz';
      else if (h.type === 'micro_lesson_completed') activityType = 'micro_lesson';
      else if (h.type === 'concept_map_completed' || h.type === 'concept_node_explored') activityType = 'concept_map';
      else if (h.type === 'experiment_completed') activityType = 'experiment';
      else if (h.type === 'riddle_completed') activityType = 'riddle';
      else if (h.type === 'mystery_completed') activityType = 'mystery';

      items.push({
        id: h.id,
        title: h.title,
        titleTa: h.titleTa,
        subjectId: targetSubject,
        topicTitle: (h.metadata?.topicTitle as string) || undefined,
        activityType,
        timestamp: h.timestamp,
        route: (h.metadata?.route as string) || undefined,
      });

      if (items.length >= limit) break;
    }

    return items;
  }

  // -------------------------------------------------------------------------
  // Pure internal aggregation & calculation helpers
  // -------------------------------------------------------------------------

  private inferSubjectFromTitle(title: string): string {
    const lower = (title || '').toLowerCase();
    if (lower.includes('physic') || lower.includes('motion') || lower.includes('force') || lower.includes('light')) return 'physics';
    if (lower.includes('chem') || lower.includes('acid') || lower.includes('atom') || lower.includes('element')) return 'chemistry';
    if (lower.includes('bio') || lower.includes('cell') || lower.includes('plant') || lower.includes('gene')) return 'biology';
    if (lower.includes('space') || lower.includes('planet') || lower.includes('moon') || lower.includes('star')) return 'space';
    if (lower.includes('environ') || lower.includes('ecosystem') || lower.includes('climate') || lower.includes('water')) return 'environment';
    if (lower.includes('body') || lower.includes('heart') || lower.includes('brain') || lower.includes('breath')) return 'human-body';
    if (lower.includes('ice') || lower.includes('soap') || lower.includes('batter') || lower.includes('phenomenon')) return 'everyday-science';
    return 'physics';
  }

  private computeTopicsForSubject(args: {
    subjectId: SubjectId;
    gradeContext: GradeContext;
    quizHistory: QuizHistoryEntry[];
    mlProgress: Record<string, MicroLessonProgress>;
    cmapProgress: Record<string, ConceptMapProgress>;
    expProgress: Record<string, ExperimentProgress>;
    focusSnapshot: FocusAreasSnapshot | null;
  }): TopicProgress[] {
    const {
      subjectId,
      gradeContext,
      quizHistory,
      mlProgress,
      cmapProgress,
      expProgress,
      focusSnapshot,
    } = args;

    const catalogTopics = getTopicsForSubject(subjectId, gradeContext);
    const focusTopicIds = new Set(
      (focusSnapshot?.focusAreas || []).map((f) => f.topicId)
    );

    // Index quiz entries by pathwayId
    const quizzesByPathway = new Map<string, QuizHistoryEntry[]>();
    for (const q of quizHistory) {
      if (!q.pathwayId) continue;
      const list = quizzesByPathway.get(q.pathwayId) || [];
      list.push(q);
      quizzesByPathway.set(q.pathwayId, list);
    }

    return catalogTopics.map((cat) => {
      // 1. Gather all activity completions for this topic
      let totalActivities = 0;
      let completedActivities = 0;
      let lastActivityAt: number | null = null;

      // Micro lesson check
      if (cat.microLessonId) {
        totalActivities++;
        const p = mlProgress[cat.microLessonId];
        if (p?.status === 'completed' || p?.quickCheckCompleted) {
          completedActivities++;
          if (p.completedAt && (lastActivityAt === null || p.completedAt > lastActivityAt)) {
            lastActivityAt = p.completedAt;
          }
        }
      }

      // Concept map check
      if (cat.conceptMapId) {
        totalActivities++;
        const p = cmapProgress[cat.conceptMapId];
        if (p?.status === 'completed' || p?.completed) {
          completedActivities++;
          if (p.completedAt && (lastActivityAt === null || p.completedAt > lastActivityAt)) {
            lastActivityAt = p.completedAt;
          }
        }
      }

      // Experiment check
      if (cat.experimentId) {
        totalActivities++;
        const p = expProgress[cat.experimentId];
        if (p?.completed) {
          completedActivities++;
          if (p.completedAt && (lastActivityAt === null || p.completedAt > lastActivityAt)) {
            lastActivityAt = p.completedAt;
          }
        }
      }

      // Fallback total if no sub-activities are configured
      if (totalActivities === 0) totalActivities = 1;

      // 2. Gather quiz questions attempted and correct
      const pathwayId = cat.quizReference?.pathwayId || cat.learnPathwayId;
      const matchingQuizzes = pathwayId ? quizzesByPathway.get(pathwayId) || [] : [];
      matchingQuizzes.sort((a, b) => a.completedAt - b.completedAt);

      let attempts = 0;
      let correct = 0;
      const orderedQuestionResults: boolean[] = [];

      for (const q of matchingQuizzes) {
        const qTotal = Math.max(0, Math.floor(q.totalQuestions || 0));
        const qCorrect = Math.min(qTotal, Math.max(0, Math.floor(q.correctAnswers || 0)));
        attempts += qTotal;
        correct += qCorrect;
        for (let i = 0; i < qTotal; i++) {
          orderedQuestionResults.push(i < qCorrect);
        }
        if (q.completedAt && (lastActivityAt === null || q.completedAt > lastActivityAt)) {
          lastActivityAt = q.completedAt;
        }
      }

      const accuracy = calculateAccuracy(correct, attempts);
      const recent = calculateRecentAccuracy(orderedQuestionResults, 5);
      const trend = calculateTrend(orderedQuestionResults, 4);

      const progressPercent = calculateTopicProgress(
        { completed: completedActivities, total: totalActivities },
        attempts > 0 ? { attempts, correct } : undefined
      );

      // Check if this topic or its pathway/lesson is in Phase 41 focus areas
      const isFocusArea =
        focusTopicIds.has(cat.id) ||
        (cat.learnPathwayId ? focusTopicIds.has(`pathway:${cat.learnPathwayId}`) : false) ||
        (cat.microLessonId ? focusTopicIds.has(`lesson:${cat.microLessonId}`) : false);

      const status = calculateTopicStatus({
        progressPercent,
        attempts,
        accuracy,
        trend,
        isFocusArea,
        completedAllActivities: completedActivities === totalActivities && totalActivities > 0,
      });

      return {
        topicId: cat.id,
        subjectId: cat.subjectId,
        title: cat.title.en,
        progressPercent,
        attempts,
        correct,
        incorrect: Math.max(0, attempts - correct),
        accuracy,
        recentAccuracy: recent.accuracy,
        status,
        trend,
        lastActivityAt,
        microLessonId: cat.microLessonId,
        conceptMapId: cat.conceptMapId,
        experimentId: cat.experimentId,
        learnReference: cat.learnPathwayId ? `/learn` : undefined,
        quizReference: cat.quizReference,
      };
    });
  }

  private computeSubjectProgress(args: {
    subjectId: SubjectId;
    gradeContext: GradeContext;
    quizHistory: QuizHistoryEntry[];
    mlProgress: Record<string, MicroLessonProgress>;
    cmapProgress: Record<string, ConceptMapProgress>;
    expProgress: Record<string, ExperimentProgress>;
    focusSnapshot: FocusAreasSnapshot | null;
  }): SubjectProgress {
    const { subjectId } = args;
    const meta = SUBJECT_METAS[subjectId] || {
      id: subjectId,
      title: { en: subjectId, ta: subjectId },
      subtitle: { en: '', ta: '' },
      icon: '🔬',
      color: '#2563EB',
      accentBg: '#EFF6FF',
    };

    const topics = this.computeTopicsForSubject(args);

    let totalActivities = 0;
    let completedActivities = 0;
    let totalAttempts = 0;
    let totalCorrect = 0;
    let improvingTopicCount = 0;
    let focusAreaCount = 0;
    let topicsStarted = 0;
    let topicsCompleted = 0;
    let lastActivityAt: number | null = null;
    const allOrderedResults: boolean[] = [];

    for (const t of topics) {
      if (t.status !== 'not_started') {
        topicsStarted++;
      }
      if (t.status === 'completed') {
        topicsCompleted++;
      }
      if (t.status === 'improving' || t.trend === 'improving') {
        improvingTopicCount++;
      }
      if (t.status === 'focus_area') {
        focusAreaCount++;
      }

      totalAttempts += t.attempts;
      totalCorrect += t.correct;

      // Count configured sub-activities
      if (t.microLessonId) totalActivities++;
      if (t.conceptMapId) totalActivities++;
      if (t.experimentId) totalActivities++;

      if (t.lastActivityAt && (lastActivityAt === null || t.lastActivityAt > lastActivityAt)) {
        lastActivityAt = t.lastActivityAt;
      }
    }

    // Tally actual completed sub-activities in this subject
    const { mlProgress, cmapProgress, expProgress } = args;
    for (const t of topics) {
      if (t.microLessonId && (mlProgress[t.microLessonId]?.status === 'completed' || mlProgress[t.microLessonId]?.quickCheckCompleted)) {
        completedActivities++;
      }
      if (t.conceptMapId && (cmapProgress[t.conceptMapId]?.status === 'completed' || cmapProgress[t.conceptMapId]?.completed)) {
        completedActivities++;
      }
      if (t.experimentId && expProgress[t.experimentId]?.completed) {
        completedActivities++;
      }
    }

    if (totalActivities === 0) totalActivities = Math.max(1, topics.length);

    const averageAccuracy = calculateAccuracy(totalCorrect, totalAttempts);
    const recentAccuracy = calculateRecentAccuracy(allOrderedResults, 5).accuracy;
    const trend: PerformanceTrend =
      improvingTopicCount > 0 ? 'improving' : totalAttempts >= 4 ? 'stable' : 'insufficientData';

    const overallProgress = calculateSubjectProgress(
      topics,
      completedActivities,
      totalActivities
    );

    const strengthLevel = calculateStrengthLevel(
      overallProgress,
      averageAccuracy,
      topicsCompleted,
      topics.length
    );

    // Practice confidence: heuristic blend of attempts and accuracy
    const confidence =
      totalAttempts === 0
        ? 0
        : Math.min(100, Math.max(0, Math.round(averageAccuracy * 0.7 + Math.min(30, totalAttempts * 5))));

    return {
      subjectId,
      title: meta.title.en,
      overallProgress,
      activityCount: totalActivities,
      completedActivities,
      topicCount: topics.length,
      topicsStarted,
      topicsCompleted,
      averageAccuracy,
      recentAccuracy,
      improvingTopicCount,
      focusAreaCount,
      lastActivityAt,
      trend,
      confidence,
      strengthLevel,
    };
  }
}

export const progressService = new ProgressService();
