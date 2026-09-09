/**
 * useCelebration Hook
 * React hook for consuming celebration events in components.
 * Provides:
 * - Current celebration event
 * - Trigger methods
 * - Dismiss method
 * - Reduced-motion state
 * - Settings-aware behavior
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { AccessibilityInfo } from 'react-native';
import { CelebrationEvent, CelebrationType, CelebrationSource, RewardSummary } from './celebration.types';
import { celebrationService } from './celebration.service';
import { storage, STORAGE_KEYS } from '../../storage/asyncStorage';
import { AppSettings } from '../settings/settings.types';

interface UseCelebrationReturn {
  /** Currently displayed celebration event, or null. */
  currentEvent: CelebrationEvent | null;

  /** Whether a celebration is currently showing. */
  isShowing: boolean;

  /** Whether reduced motion is enabled on the device. */
  isReducedMotion: boolean;

  /** Current celebration level from settings. */
  celebrationLevel: 'on' | 'reduced' | 'off';

  /** Dismiss the current celebration. */
  dismiss: () => void;

  /** Trigger a celebration event. */
  trigger: (input: {
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
  }) => Promise<CelebrationEvent | null>;

  // Convenience methods
  triggerMicroLessonComplete: (title: string, xp: number) => Promise<CelebrationEvent | null>;
  triggerConceptMapComplete: (title: string, xp: number) => Promise<CelebrationEvent | null>;
  triggerExperimentComplete: (title: string, xp: number) => Promise<CelebrationEvent | null>;
  triggerMysterySolved: (title: string, score: number) => Promise<CelebrationEvent | null>;
  triggerRiddleSetComplete: (score: number) => Promise<CelebrationEvent | null>;
  triggerGameLevelComplete: (gameId: string, level: number) => Promise<CelebrationEvent | null>;
  triggerAchievementUnlocked: (id: string, title: string, icon: string, xp: number) => Promise<CelebrationEvent | null>;
  triggerCollectionUnlock: (itemId: string, itemTitle: string, collectionName: string) => Promise<CelebrationEvent | null>;
  triggerDailyGoalComplete: (xp: number, points: number) => Promise<CelebrationEvent | null>;
  triggerStreakMilestone: (days: number) => Promise<CelebrationEvent | null>;
  triggerCertificateEarned: (id: string, title: string) => Promise<CelebrationEvent | null>;
  triggerLevelUp: (level: number, title: string) => Promise<CelebrationEvent | null>;
  triggerPersonalBest: (category: string, value: number) => Promise<CelebrationEvent | null>;
}

export function useCelebration(): UseCelebrationReturn {
  const [currentEvent, setCurrentEvent] = useState<CelebrationEvent | null>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [celebrationLevel, setCelebrationLevel] = useState<'on' | 'reduced' | 'off'>('on');
  const mountedRef = useRef(true);

  // ─── Reduced Motion Detection ──────────────────────────────────────

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled()
      .then((enabled) => setIsReducedMotion(Boolean(enabled)))
      .catch(() => setIsReducedMotion(false));

    const subscription = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      (enabled) => setIsReducedMotion(Boolean(enabled))
    );

    return () => {
      subscription?.remove();
    };
  }, []);

  // ─── Settings Load ─────────────────────────────────────────────────

  useEffect(() => {
    let isMounted = true;

    const loadSettings = async () => {
      try {
        const settings = await storage.getItem<AppSettings>(STORAGE_KEYS.APP_SETTINGS);
        if (settings && isMounted) {
          const level = settings.reduceMotion ? 'reduced' : 'on';
          setCelebrationLevel(level);
          celebrationService.setCelebrationLevel(level);
        }
      } catch {
        // Default to 'on'
      }
    };

    loadSettings();
    return () => { isMounted = false; };
  }, []);

  // ─── Service Subscription ──────────────────────────────────────────

  useEffect(() => {
    mountedRef.current = true;

    const unsubscribe = celebrationService.subscribe((event) => {
      if (mountedRef.current) {
        setCurrentEvent(event);
      }
    });

    return () => {
      mountedRef.current = false;
      unsubscribe();
    };
  }, []);

  // ─── Dismiss ───────────────────────────────────────────────────────

  const dismiss = useCallback(() => {
    celebrationService.dismissCurrent();
  }, []);

  // ─── Trigger ───────────────────────────────────────────────────────

  const trigger = useCallback(
    async (input: Parameters<CelebrationServiceSingleton['trigger']>[0]) => {
      return celebrationService.trigger(input);
    },
    []
  );

  // ─── Convenience Methods ───────────────────────────────────────────

  const triggerMicroLessonComplete = useCallback(
    (title: string, xp: number) => celebrationService.triggerMicroLessonComplete(title, xp),
    []
  );

  const triggerConceptMapComplete = useCallback(
    (title: string, xp: number) => celebrationService.triggerConceptMapComplete(title, xp),
    []
  );

  const triggerExperimentComplete = useCallback(
    (title: string, xp: number) => celebrationService.triggerExperimentComplete(title, xp),
    []
  );

  const triggerMysterySolved = useCallback(
    (title: string, score: number) => celebrationService.triggerMysterySolved(title, score),
    []
  );

  const triggerRiddleSetComplete = useCallback(
    (score: number) => celebrationService.triggerRiddleSetComplete(score),
    []
  );

  const triggerGameLevelComplete = useCallback(
    (gameId: string, level: number) => celebrationService.triggerGameLevelComplete(gameId, level),
    []
  );

  const triggerAchievementUnlocked = useCallback(
    (id: string, title: string, icon: string, xp: number) =>
      celebrationService.triggerAchievementUnlocked(id, title, icon, xp),
    []
  );

  const triggerCollectionUnlock = useCallback(
    (itemId: string, itemTitle: string, collectionName: string) =>
      celebrationService.triggerCollectionUnlock(itemId, itemTitle, collectionName),
    []
  );

  const triggerDailyGoalComplete = useCallback(
    (xp: number, points: number) => celebrationService.triggerDailyGoalComplete(xp, points),
    []
  );

  const triggerStreakMilestone = useCallback(
    (days: number) => celebrationService.triggerStreakMilestone(days),
    []
  );

  const triggerCertificateEarned = useCallback(
    (id: string, title: string) => celebrationService.triggerCertificateEarned(id, title),
    []
  );

  const triggerLevelUp = useCallback(
    (level: number, title: string) => celebrationService.triggerLevelUp(level, title),
    []
  );

  const triggerPersonalBest = useCallback(
    (category: string, value: number) => celebrationService.triggerPersonalBest(category, value),
    []
  );

  return {
    currentEvent,
    isShowing: currentEvent !== null,
    isReducedMotion,
    celebrationLevel,
    dismiss,
    trigger,
    triggerMicroLessonComplete,
    triggerConceptMapComplete,
    triggerExperimentComplete,
    triggerMysterySolved,
    triggerRiddleSetComplete,
    triggerGameLevelComplete,
    triggerAchievementUnlocked,
    triggerCollectionUnlock,
    triggerDailyGoalComplete,
    triggerStreakMilestone,
    triggerCertificateEarned,
    triggerLevelUp,
    triggerPersonalBest,
  };
}

// Type helper for the service reference in the hook
type CelebrationServiceSingleton = typeof celebrationService;
