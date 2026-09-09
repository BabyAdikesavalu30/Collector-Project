/**
 * Celebration Service
 * Centralized orchestration for the Celebration & Micro-interaction System.
 *
 * Architecture:
 *   Feature triggers → CelebrationService → Queue → UI Components
 *
 * Handles:
 * - Event creation and validation
 * - Priority-based queue ordering
 * - Idempotency (no duplicate celebrations)
 * - Reduced-motion awareness
 * - Settings-aware behavior
 * - Safe cleanup on unmount
 */

import {
  CelebrationEvent,
  CelebrationType,
  CelebrationSource,
  CelebrationStorageState,
  CelebrationIntensity,
  RewardSummary,
} from './celebration.types';
import {
  CELEBRATION_REGISTRY,
  STREAK_MILESTONES,
  isStreakMilestone,
} from './celebration.config';
import {
  createCelebrationEvent,
  compareEventPriority,
  isValidEvent,
  shouldSkipCelebration,
  buildUniqueKey,
} from './celebration.utils';
import { isKeyHandled, markKeyHandled } from './celebration.store';

// ============================================================================
// Event Listener Types
// ============================================================================

type CelebrationListener = (event: CelebrationEvent | null) => void;

// ============================================================================
// Service Singleton
// ============================================================================

class CelebrationServiceSingleton {
  private queue: CelebrationEvent[] = [];
  private currentEvent: CelebrationEvent | null = null;
  private listeners: Set<CelebrationListener> = new Set();
  private processedKeys: Set<string> = new Set();
  private celebrationLevel: 'on' | 'reduced' | 'off' = 'on';
  private isProcessing = false;
  private dismissTimer: ReturnType<typeof setTimeout> | null = null;
  private initialized = false;

  // ─── Initialization ────────────────────────────────────────────────

  async initialize(): Promise<void> {
    if (this.initialized) return;
    // Load previously handled keys
    try {
      const handled = await isKeyHandled('__probe__');
      void handled; // Just probe to ensure store is loaded
    } catch {
      // Store not available, continue with empty state
    }
    this.initialized = true;
  }

  // ─── Settings ──────────────────────────────────────────────────────

  setCelebrationLevel(level: 'on' | 'reduced' | 'off'): void {
    this.celebrationLevel = level;
  }

  getCelebrationLevel(): 'on' | 'reduced' | 'off' {
    return this.celebrationLevel;
  }

  // ─── Event Triggering ──────────────────────────────────────────────

  /**
   * Triggers a celebration event. This is the main API for features.
   * Returns the event if it was queued, or null if skipped (duplicate, disabled, etc.).
   */
  async trigger(input: {
    type: CelebrationType;
    source: CelebrationSource;
    identifier: string;
    titleKey: string;
    descriptionKey?: string;
    icon?: string;
    reward?: RewardSummary;
    milestone?: number;
    continueRoute?: string;
    continueLabel?: string;
    secondaryActionRoute?: string;
    secondaryActionLabel?: string;
    intensity?: CelebrationIntensity;
  }): Promise<CelebrationEvent | null> {
    await this.initialize();

    // Create event
    const event = createCelebrationEvent(input);

    // Validate
    if (!isValidEvent(event)) {
      console.warn('[CelebrationService] Invalid event rejected:', event);
      return null;
    }

    // Idempotency check — in-memory
    if (this.processedKeys.has(event.uniqueKey)) {
      return null;
    }

    // Idempotency check — persistent
    const alreadyHandled = await isKeyHandled(event.uniqueKey);
    if (alreadyHandled) {
      this.processedKeys.add(event.uniqueKey);
      return null;
    }

    // Settings check
    if (shouldSkipCelebration(this.celebrationLevel, event.intensity)) {
      // Still mark as handled so it doesn't replay
      await markKeyHandled(event.uniqueKey);
      this.processedKeys.add(event.uniqueKey);
      return null;
    }

    // Mark as handled immediately (prevents race conditions)
    await markKeyHandled(event.uniqueKey);
    this.processedKeys.add(event.uniqueKey);

    // Add to queue
    this.enqueue(event);

    // Process queue
    this.processQueue();

    return event;
  }

  // ─── Queue Management ──────────────────────────────────────────────

  private enqueue(event: CelebrationEvent): void {
    this.queue.push(event);
    // Sort by priority (lower number = higher priority)
    this.queue.sort(compareEventPriority);
  }

  private processQueue(): void {
    if (this.isProcessing) return;
    if (this.queue.length === 0) return;

    // If already showing an event, wait for dismissal
    if (this.currentEvent) return;

    const nextEvent = this.queue.shift();
    if (!nextEvent) return;

    this.isProcessing = true;
    this.currentEvent = nextEvent;
    this.notifyListeners();

    // Auto-dismiss after max duration
    const maxDuration = CELEBRATION_REGISTRY[nextEvent.type]?.maxDurationMs ?? 3000;
    this.dismissTimer = setTimeout(() => {
      this.dismissCurrent();
    }, maxDuration);
    if (typeof this.dismissTimer === 'object' && this.dismissTimer && 'unref' in this.dismissTimer) {
      // Node-style Timeout unref; safe no-op on platforms where setTimeout returns a number.
      ;(this.dismissTimer as NodeJS.Timeout).unref();
    }
  }

  /**
   * Dismisses the current celebration and processes the next in queue.
   */
  dismissCurrent(): void {
    if (this.dismissTimer) {
      clearTimeout(this.dismissTimer);
      this.dismissTimer = null;
    }

    this.currentEvent = null;
    this.isProcessing = false;
    this.notifyListeners();

    // Process next event in queue (with a small delay for visual transition)
    setTimeout(() => {
      this.processQueue();
    }, 100);
  }

  // ─── State Access ──────────────────────────────────────────────────

  getCurrentEvent(): CelebrationEvent | null {
    return this.currentEvent;
  }

  getQueueLength(): number {
    return this.queue.length;
  }

  // ─── Listeners ─────────────────────────────────────────────────────

  subscribe(listener: CelebrationListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners(): void {
    for (const listener of this.listeners) {
      try {
        listener(this.currentEvent);
      } catch {
        // Listener error should not crash the service
      }
    }
  }

  // ─── Cleanup ───────────────────────────────────────────────────────

  /**
   * Cleans up timers and listeners. Call on app-level unmount if needed.
   */
  cleanup(): void {
    if (this.dismissTimer) {
      clearTimeout(this.dismissTimer);
      this.dismissTimer = null;
    }
    this.currentEvent = null;
    this.isProcessing = false;
    this.queue = [];
    this.listeners.clear();
  }

  // ─── Convenience Trigger Methods ───────────────────────────────────

  /**
   * Triggers a micro-lesson completion celebration.
   */
  async triggerMicroLessonComplete(lessonTitle: string, xp: number): Promise<CelebrationEvent | null> {
    return this.trigger({
      type: 'micro_lesson_complete',
      source: 'micro-lesson',
      identifier: lessonTitle,
      titleKey: 'celebration.lessonComplete',
      descriptionKey: 'celebration.lessonCompleteDesc',
      icon: '📖',
      reward: { xp },
      intensity: 'subtle',
      continueRoute: '/micro-lessons',
    });
  }

  /**
   * Triggers a concept map completion celebration.
   */
  async triggerConceptMapComplete(mapTitle: string, xp: number): Promise<CelebrationEvent | null> {
    return this.trigger({
      type: 'concept_map_complete',
      source: 'concept-map',
      identifier: mapTitle,
      titleKey: 'celebration.conceptMapComplete',
      descriptionKey: 'celebration.conceptMapCompleteDesc',
      icon: '🗺️',
      reward: { xp },
      intensity: 'standard',
      continueRoute: '/concept-maps',
    });
  }

  /**
   * Triggers an experiment completion celebration.
   */
  async triggerExperimentComplete(experimentTitle: string, xp: number): Promise<CelebrationEvent | null> {
    return this.trigger({
      type: 'experiment_complete',
      source: 'experiment-lab',
      identifier: experimentTitle,
      titleKey: 'celebration.experimentComplete',
      descriptionKey: 'celebration.experimentCompleteDesc',
      icon: '🧪',
      reward: { xp },
      intensity: 'standard',
      continueRoute: '/experiment-lab',
    });
  }

  /**
   * Triggers a mystery case solved celebration.
   */
  async triggerMysterySolved(caseTitle: string, score: number): Promise<CelebrationEvent | null> {
    return this.trigger({
      type: 'mystery_solved',
      source: 'mystery-lab',
      identifier: caseTitle,
      titleKey: 'celebration.mysterySolved',
      descriptionKey: 'celebration.mysterySolvedDesc',
      icon: '🕵️',
      intensity: 'standard',
      continueRoute: '/mystery-lab',
    });
  }

  /**
   * Triggers a riddle set completion celebration.
   */
  async triggerRiddleSetComplete(score: number): Promise<CelebrationEvent | null> {
    return this.trigger({
      type: 'riddle_set_complete',
      source: 'riddles',
      identifier: `riddle-set-${Date.now()}`,
      titleKey: 'celebration.riddleSetComplete',
      descriptionKey: 'celebration.riddleSetCompleteDesc',
      icon: '🧩',
      intensity: 'standard',
      continueRoute: '/riddles',
    });
  }

  /**
   * Triggers a game level completion celebration.
   */
  async triggerGameLevelComplete(gameId: string, levelIndex: number): Promise<CelebrationEvent | null> {
    return this.trigger({
      type: 'game_level_complete',
      source: 'games',
      identifier: `${gameId}-level-${levelIndex}`,
      titleKey: 'celebration.gameLevelComplete',
      descriptionKey: 'celebration.gameLevelCompleteDesc',
      icon: '🎮',
      intensity: 'subtle',
    });
  }

  /**
   * Triggers a game milestone celebration (e.g., 25 levels cleared).
   */
  async triggerGameMilestone(milestoneLabel: string): Promise<CelebrationEvent | null> {
    return this.trigger({
      type: 'game_milestone',
      source: 'games',
      identifier: `game-milestone-${milestoneLabel}`,
      titleKey: 'celebration.gameMilestone',
      descriptionKey: 'celebration.gameMilestoneDesc',
      icon: '🎮',
      intensity: 'standard',
      continueRoute: '/games',
    });
  }

  /**
   * Triggers an achievement unlock celebration.
   */
  async triggerAchievementUnlocked(
    badgeId: string,
    badgeTitle: string,
    badgeIcon: string,
    xp: number
  ): Promise<CelebrationEvent | null> {
    return this.trigger({
      type: 'achievement_unlocked',
      source: 'achievements',
      identifier: badgeId,
      titleKey: 'celebration.achievementUnlocked',
      descriptionKey: 'celebration.achievementUnlockedDesc',
      icon: badgeIcon,
      reward: { xp, badgeIcon },
      intensity: 'standard',
      continueRoute: '/achievements',
    });
  }

  /**
   * Triggers a collection item unlock celebration.
   */
  async triggerCollectionUnlock(
    itemId: string,
    itemTitle: string,
    collectionName: string
  ): Promise<CelebrationEvent | null> {
    return this.trigger({
      type: 'collection_unlocked',
      source: 'collections',
      identifier: itemId,
      titleKey: 'celebration.collectionUnlocked',
      descriptionKey: 'celebration.collectionUnlockedDesc',
      icon: '📦',
      reward: { collectionName },
      intensity: 'standard',
    });
  }

  /**
   * Triggers a daily goal completion celebration.
   */
  async triggerDailyGoalComplete(xp: number, points: number): Promise<CelebrationEvent | null> {
    const today = new Date().toISOString().split('T')[0];
    return this.trigger({
      type: 'daily_goal_complete',
      source: 'daily-goal',
      identifier: today,
      titleKey: 'celebration.dailyGoalComplete',
      descriptionKey: 'celebration.dailyGoalCompleteDesc',
      icon: '🎯',
      reward: { xp, points },
      intensity: 'standard',
      continueRoute: '/home',
    });
  }

  /**
   * Triggers a streak milestone celebration.
   */
  async triggerStreakMilestone(days: number): Promise<CelebrationEvent | null> {
    if (!isStreakMilestone(days)) return null;
    const today = new Date().toISOString().split('T')[0];
    return this.trigger({
      type: 'streak_milestone',
      source: 'streak',
      identifier: `streak-${days}-${today}`,
      titleKey: 'celebration.streakMilestone',
      descriptionKey: 'celebration.streakMilestoneDesc',
      icon: '🔥',
      milestone: days,
      intensity: days >= 14 ? 'major' : 'standard',
      continueRoute: '/streak',
    });
  }

  /**
   * Triggers a certificate earned celebration (major).
   */
  async triggerCertificateEarned(
    certificateId: string,
    certificateTitle: string
  ): Promise<CelebrationEvent | null> {
    return this.trigger({
      type: 'certificate_earned',
      source: 'certificates',
      identifier: certificateId,
      titleKey: 'celebration.certificateEarned',
      descriptionKey: 'celebration.certificateEarnedDesc',
      icon: '📜',
      reward: { certificateTitle },
      intensity: 'major',
      continueRoute: `/certificate/${certificateId}`,
      secondaryActionRoute: '/certificates',
      secondaryActionLabel: 'celebration.viewCertificates',
    });
  }

  /**
   * Triggers a level up celebration.
   */
  async triggerLevelUp(newLevel: number, levelTitle: string): Promise<CelebrationEvent | null> {
    const today = new Date().toISOString().split('T')[0];
    return this.trigger({
      type: 'level_up',
      source: 'rewards',
      identifier: `level-${newLevel}-${today}`,
      titleKey: 'celebration.levelUp',
      descriptionKey: 'celebration.levelUpDesc',
      icon: '⬆️',
      milestone: newLevel,
      intensity: 'standard',
      continueRoute: '/rewards',
    });
  }

  /**
   * Triggers a personal best celebration.
   */
  async triggerPersonalBest(
    category: string,
    value: number
  ): Promise<CelebrationEvent | null> {
    return this.trigger({
      type: 'personal_best',
      source: 'general',
      identifier: `best-${category}-${value}`,
      titleKey: 'celebration.personalBest',
      descriptionKey: 'celebration.personalBestDesc',
      icon: '⭐',
      intensity: 'standard',
    });
  }

  /**
   * Resets internal state and cancels any pending timers (used for unit & integration testing).
   */
  resetForTesting(): void {
    if (this.dismissTimer) {
      clearTimeout(this.dismissTimer);
      this.dismissTimer = null;
    }
    this.queue = [];
    this.currentEvent = null;
    this.isProcessing = false;
    this.processedKeys.clear();
    this.listeners.clear();
  }
}

// ============================================================================
// Singleton Export
// ============================================================================

export const celebrationService = new CelebrationServiceSingleton();
