/**
 * Production Quiz Setup Route (Screen 18 - /quiz-setup)
 * Configures difficulty, question count, 60s timer, and optional preferences.
 * Navigates forward to future Quiz Engine (/quiz) and back to /learn.
 */

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { QuizSetupScreen } from '../src/components/quiz-setup';
import {
  QuizDifficulty,
  QuizQuestionCount,
  QuizSetupConfig,
  resolveQuizContext,
  DEFAULT_QUIZ_CONFIG,
} from '../src/features/quiz';
import { settingsRepository } from '../src/features/settings';
import { SessionRepository } from '../src/features/auth';
import { storage, STORAGE_KEYS } from '../src/storage/asyncStorage';
import { SupportedLanguage } from '../src/config/i18n';

export default function QuizSetupPage() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    levelId?: string;
    subjectId?: string;
    pathwayId?: string;
  }>();

  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [difficulty, setDifficulty] = useState<QuizDifficulty>(DEFAULT_QUIZ_CONFIG.difficulty);
  const [questionCount, setQuestionCount] = useState<QuizQuestionCount>(
    DEFAULT_QUIZ_CONFIG.questionCount
  );
  const [timerEnabled, setTimerEnabled] = useState<boolean>(DEFAULT_QUIZ_CONFIG.timerEnabled);
  const [showExplanation, setShowExplanation] = useState<boolean>(
    DEFAULT_QUIZ_CONFIG.showExplanation
  );
  const [soundEffects, setSoundEffects] = useState<boolean>(DEFAULT_QUIZ_CONFIG.soundEffects);
  const [confirmBeforeFinish, setConfirmBeforeFinish] = useState<boolean>(
    DEFAULT_QUIZ_CONFIG.confirmBeforeFinish
  );

  // 1. Session Protection Guard & Preferences Initialization
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const [session, storedLang, settings] = await Promise.all([
          SessionRepository.getSession(),
          storage.getItem<SupportedLanguage>(STORAGE_KEYS.USER_LANGUAGE),
          settingsRepository.getSettings(),
        ]);

        if (isMounted) {
          if (!session || !session.isAuthenticated) {
            router.replace('/auth-welcome');
            return;
          }

          if (storedLang === 'en' || storedLang === 'ta') {
            setLanguage(storedLang);
          }

          // Initialize preferences from settings repository
          if (settings) {
            if (
              settings.difficulty === 'beginner' ||
              settings.difficulty === 'intermediate' ||
              settings.difficulty === 'advanced'
            ) {
              setDifficulty(settings.difficulty);
            }

            const validCounts: QuizQuestionCount[] = [5, 10, 15, 20, 30];
            if (validCounts.includes(settings.questionsPerQuiz as QuizQuestionCount)) {
              setQuestionCount(settings.questionsPerQuiz as QuizQuestionCount);
            }

            if (typeof settings.quizTimer === 'boolean') {
              setTimerEnabled(settings.quizTimer);
            }

            if (typeof settings.answerExplanation === 'boolean') {
              setShowExplanation(settings.answerExplanation);
            }

            if (typeof settings.soundEffects === 'boolean') {
              setSoundEffects(settings.soundEffects);
            } else if (typeof settings.quizSound === 'boolean') {
              setSoundEffects(settings.quizSound);
            }

            if (typeof settings.confirmBeforeFinish === 'boolean') {
              setConfirmBeforeFinish(settings.confirmBeforeFinish);
            }
          }
        }
      } catch (err) {
        console.warn('[QUIZ_SETUP] Error initializing preferences:', err);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [router]);

  // 2. Resolve Educational Pathway Context
  const context = resolveQuizContext(params.levelId, params.subjectId, params.pathwayId);

  // 3. Navigation Handlers
  const handleBack = useCallback(() => {
    try {
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace('/learn');
      }
    } catch {
      router.replace('/learn');
    }
  }, [router]);

  const handleStartQuiz = useCallback(
    (config: QuizSetupConfig) => {
      try {
        router.push({
          pathname: '/quiz',
          params: {
            levelId: config.levelId,
            subjectId: config.subjectId,
            pathwayId: config.pathwayId,
            difficulty: config.difficulty,
            questionCount: String(config.questionCount),
            timerEnabled: String(config.timerEnabled),
            secondsPerQuestion: String(config.secondsPerQuestion),
            showExplanation: String(config.showExplanation),
            soundEffects: String(config.soundEffects),
            confirmBeforeFinish: String(config.confirmBeforeFinish),
          },
        });
      } catch (err) {
        console.warn('[QUIZ_SETUP] Could not navigate to /quiz:', err);
      }
    },
    [router]
  );

  return (
    <QuizSetupScreen
      context={context}
      difficulty={difficulty}
      questionCount={questionCount}
      timerEnabled={timerEnabled}
      showExplanation={showExplanation}
      soundEffects={soundEffects}
      confirmBeforeFinish={confirmBeforeFinish}
      language={language}
      onSelectDifficulty={setDifficulty}
      onSelectQuestionCount={setQuestionCount}
      onToggleTimer={setTimerEnabled}
      onToggleExplanation={setShowExplanation}
      onToggleSound={setSoundEffects}
      onToggleConfirm={setConfirmBeforeFinish}
      onStartQuiz={handleStartQuiz}
      onBack={handleBack}
    />
  );
}
