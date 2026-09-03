/**
 * useQuizEngine Hook
 * Complete quiz state management, per-question timer countdown, answer submission,
 * feedback locking, scoring, and navigation.
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { QuizQuestion, QuizSetupConfig, QuizSession, QuizResult } from './quiz.types';
import { calculateQuizResult, isOptionCorrect, POINTS_PER_CORRECT_ANSWER } from './quiz.scoring';

interface UseQuizEngineParams {
  config: QuizSetupConfig;
  questions: QuizQuestion[];
}

export function useQuizEngine({ config, questions }: UseQuizEngineParams) {
  const [session, setSession] = useState<QuizSession>(() => ({
    config,
    questions,
    currentIndex: 0,
    answers: {},
    submitted: {},
    timeRemaining: {},
    revealedHints: {},
    correctCount: 0,
    wrongCount: 0,
    score: 0,
    bestStreak: 0,
    currentStreak: 0,
    startedAt: Date.now(),
  }));

  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentQuestion: QuizQuestion | undefined = session.questions[session.currentIndex];
  const currentQuestionId = currentQuestion?.id || '';

  const isSubmitted = Boolean(session.submitted[currentQuestionId]);
  const selectedOptionId = session.answers[currentQuestionId] ?? null;
  const isHintRevealed = Boolean(session.revealedHints[currentQuestionId]);
  const isCorrect = currentQuestion
    ? isOptionCorrect(currentQuestion, selectedOptionId)
    : false;

  const currentSeconds = session.timeRemaining[currentQuestionId] ?? config.secondsPerQuestion;
  const isTimerWarning = config.timerEnabled && currentSeconds <= 10 && currentSeconds > 0;
  const isTimeExpired = config.timerEnabled && currentSeconds === 0 && isSubmitted;

  const isFirstQuestion = session.currentIndex === 0;
  const isLastQuestion = session.currentIndex === session.questions.length - 1;

  // Clear timer helper
  const clearTimer = useCallback(() => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
  }, []);

  // Answer submission handler
  const submitAnswer = useCallback(() => {
    if (!currentQuestion || isSubmitted) return;

    clearTimer();

    setSession((prev) => {
      const qId = currentQuestion.id;
      const chosenOption = prev.answers[qId] || null;
      const correct = isOptionCorrect(currentQuestion, chosenOption);

      const nextCorrect = correct ? prev.correctCount + 1 : prev.correctCount;
      const nextWrong = !correct ? prev.wrongCount + 1 : prev.wrongCount;
      const nextStreak = correct ? prev.currentStreak + 1 : 0;
      const nextBestStreak = Math.max(prev.bestStreak, nextStreak);
      const nextScore = correct ? prev.score + POINTS_PER_CORRECT_ANSWER : prev.score;

      return {
        ...prev,
        submitted: { ...prev.submitted, [qId]: true },
        correctCount: nextCorrect,
        wrongCount: nextWrong,
        score: nextScore,
        currentStreak: nextStreak,
        bestStreak: nextBestStreak,
      };
    });
  }, [currentQuestion, isSubmitted, clearTimer]);

  // Handle timeout (auto-submit)
  const handleTimeout = useCallback(() => {
    if (!currentQuestion || isSubmitted) return;
    clearTimer();

    setSession((prev) => {
      const qId = currentQuestion.id;
      return {
        ...prev,
        answers: { ...prev.answers, [qId]: null },
        submitted: { ...prev.submitted, [qId]: true },
        timeRemaining: { ...prev.timeRemaining, [qId]: 0 },
        wrongCount: prev.wrongCount + 1,
        currentStreak: 0,
      };
    });
  }, [currentQuestion, isSubmitted, clearTimer]);

  // Per-question countdown timer effect
  useEffect(() => {
    if (!config.timerEnabled || isSubmitted || !currentQuestion) {
      clearTimer();
      return;
    }

    // Initialize timer for current question if not yet set
    setSession((prev) => {
      if (prev.timeRemaining[currentQuestionId] === undefined) {
        return {
          ...prev,
          timeRemaining: {
            ...prev.timeRemaining,
            [currentQuestionId]: config.secondsPerQuestion,
          },
        };
      }
      return prev;
    });

    clearTimer();
    timerIntervalRef.current = setInterval(() => {
      setSession((prev) => {
        const remaining = prev.timeRemaining[currentQuestionId] ?? config.secondsPerQuestion;

        if (remaining <= 1) {
          clearTimer();
          // Trigger timeout submission
          setTimeout(() => handleTimeout(), 0);
          return {
            ...prev,
            timeRemaining: { ...prev.timeRemaining, [currentQuestionId]: 0 },
          };
        }

        return {
          ...prev,
          timeRemaining: { ...prev.timeRemaining, [currentQuestionId]: remaining - 1 },
        };
      });
    }, 1000);

    return () => {
      clearTimer();
    };
  }, [
    config.timerEnabled,
    config.secondsPerQuestion,
    currentQuestionId,
    isSubmitted,
    currentQuestion,
    clearTimer,
    handleTimeout,
  ]);

  // Select an answer candidate before submission
  const selectOption = useCallback(
    (optionId: string) => {
      if (isSubmitted || !currentQuestionId) return;

      setSession((prev) => ({
        ...prev,
        answers: {
          ...prev.answers,
          [currentQuestionId]: optionId,
        },
      }));
    },
    [isSubmitted, currentQuestionId]
  );

  // Toggle hint reveal
  const revealHint = useCallback(() => {
    if (!currentQuestionId) return;

    setSession((prev) => ({
      ...prev,
      revealedHints: {
        ...prev.revealedHints,
        [currentQuestionId]: true,
      },
    }));
  }, [currentQuestionId]);

  // Navigate to Next Question
  const nextQuestion = useCallback(() => {
    if (isLastQuestion) return;

    clearTimer();
    setSession((prev) => ({
      ...prev,
      currentIndex: prev.currentIndex + 1,
    }));
  }, [isLastQuestion, clearTimer]);

  // Navigate to Previous Question
  const prevQuestion = useCallback(() => {
    if (isFirstQuestion) return;

    clearTimer();
    setSession((prev) => ({
      ...prev,
      currentIndex: prev.currentIndex - 1,
    }));
  }, [isFirstQuestion, clearTimer]);

  // Package final quiz result
  const finishQuiz = useCallback((): QuizResult => {
    clearTimer();
    const completedSession: QuizSession = {
      ...session,
      completedAt: Date.now(),
    };
    return calculateQuizResult(completedSession);
  }, [session, clearTimer]);

  return {
    session,
    currentQuestion,
    currentIndex: session.currentIndex,
    totalQuestions: session.questions.length,
    selectedOptionId,
    isSubmitted,
    isCorrect,
    isHintRevealed,
    timeRemaining: currentSeconds,
    isTimerWarning,
    isTimeExpired,
    isFirstQuestion,
    isLastQuestion,
    correctCount: session.correctCount,
    wrongCount: session.wrongCount,
    score: session.score,
    selectOption,
    submitAnswer,
    revealHint,
    nextQuestion,
    prevQuestion,
    finishQuiz,
  };
}
