/**
 * Quiz Results Route (/quiz-result)
 * Screen 20: Quiz Results Screen.
 * Displays score percentage, performance message, metrics grid, points/streak, and review CTAs.
 */

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { storage, STORAGE_KEYS } from '../src/storage/asyncStorage';
import { SupportedLanguage } from '../src/config/i18n';
import {
  QuizResult,
  quizResultStore,
  createFallbackResultFromParams,
} from '../src/features/quiz';
import { useLanguage } from '../src/context';
import { QuizResultScreen } from '../src/components/quiz-result';

export default function QuizResultRoute() {
  const router = useRouter();
  const rawParams = useLocalSearchParams<{
    totalQuestions?: string;
    correctAnswers?: string;
    wrongAnswers?: string;
    unansweredQuestions?: string;
    score?: string;
    percentage?: string;
    bestStreak?: string;
    levelId?: string;
    subjectId?: string;
    pathwayId?: string;
    difficulty?: string;
    showExplanation?: string;
  }>();

  const { language } = useLanguage();
  const [studentName, setStudentName] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      // 1. Student profile name
      const profile = await storage.getItem<{ fullName?: string; name?: string }>(
        STORAGE_KEYS.STUDENT_PROFILE
      );
      if (profile) {
        const name = profile.fullName || profile.name || null;
        if (name) setStudentName(name);
      }
    })();
  }, []);

  // Retrieve result from shared in-memory store or reconstruct from query params
  const result: QuizResult | null = useMemo(() => {
    const fromStore = quizResultStore.getResult();
    if (fromStore) return fromStore;
    return createFallbackResultFromParams(rawParams);
  }, [rawParams]);

  const handleReviewAnswers = useCallback(() => {
    router.push('/quiz-review');
  }, [router]);

  const handleBackToHome = useCallback(() => {
    router.replace('/home');
  }, [router]);

  const handleContinueLearning = useCallback(() => {
    router.replace('/learn');
  }, [router]);

  return (
    <QuizResultScreen
      result={result}
      studentName={studentName}
      language={language}
      onReviewAnswers={handleReviewAnswers}
      onBackToHome={handleBackToHome}
      onContinueLearning={handleContinueLearning}
    />
  );
}
