/**
 * Quiz Review Answers Route (/quiz-review)
 * Screen 20: Detailed Question-by-Question Review Screen.
 * Displays interactive category filters (All, Correct, Wrong), student's answers, correct answers, and explanations.
 */

import React, { useMemo, useCallback } from 'react';
import { useRouter } from 'expo-router';
import { useLanguage } from '../src/context';
import {
  ReviewedQuestion,
  quizResultStore,
} from '../src/features/quiz';
import { QuizReviewScreen } from '../src/components/quiz-review';

export default function QuizReviewRoute() {
  const router = useRouter();
  const { language } = useLanguage();

  const result = quizResultStore.getResult();
  const showExplanation = result?.config.showExplanation ?? true;

  const questions: ReviewedQuestion[] = useMemo(() => {
    return quizResultStore.getReviewedQuestions();
  }, []);

  const handleBackToResults = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <QuizReviewScreen
      questions={questions}
      showExplanation={showExplanation}
      language={language}
      onBackToResults={handleBackToResults}
    />
  );
}
