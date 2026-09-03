/**
 * useFunFacts Hook
 * State management for the Fun Facts feature.
 */

import { useState, useCallback, useEffect } from 'react';
import { FunFact, FunFactCategory, FactQuestion, FunFactMode, FunFactsResult, FunFactsProgress } from './fun-facts.types';
import {
  getDailyFact,
  getFactsByCategory,
  searchFacts,
  getSwipeFacts,
  getTrueFalseQuestions,
  getMultipleChoiceQuestions,
  getQuizQuestions,
  validateTrueFalse,
  validateMultipleChoice,
  calculateQuizResult,
  getTodayString,
} from './fun-facts.engine';
import {
  getFunFactsProgress,
  markFactDiscovered,
  toggleFactSaved,
  markDailyFactViewed,
  updateTrueFalseStats,
  updateQuizStats,
} from './fun-facts.storage';

export function useFunFacts() {
  const [progress, setProgress] = useState<FunFactsProgress | null>(null);
  const [currentFact, setCurrentFact] = useState<FunFact | null>(null);
  const [swipeFacts, setSwipeFacts] = useState<FunFact[]>([]);
  const [currentSwipeIndex, setCurrentSwipeIndex] = useState(0);
  const [questions, setQuestions] = useState<FactQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizResult, setQuizResult] = useState<FunFactsResult | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFacts, setFilteredFacts] = useState<FunFact[]>([]);
  const [activeCategory, setActiveCategory] = useState<FunFactCategory | 'all'>('all');
  const [loading, setLoading] = useState(true);

  // Load initial data
  useEffect(() => {
    loadProgress();
    loadDailyFact();
  }, []);

  const loadProgress = useCallback(async () => {
    setLoading(true);
    const p = await getFunFactsProgress();
    setProgress(p);
    setLoading(false);
  }, []);

  const loadDailyFact = useCallback(() => {
    const fact = getDailyFact();
    setCurrentFact(fact);
  }, []);

  const discoverFact = useCallback(async (factId: string) => {
    const p = await markFactDiscovered(factId);
    setProgress(p);
  }, []);

  const saveFact = useCallback(async (factId: string) => {
    const p = await toggleFactSaved(factId);
    setProgress(p);
  }, []);

  const viewDailyFact = useCallback(async () => {
    const p = await markDailyFactViewed();
    setProgress(p);
  }, []);

  // Swipe mode
  const startSwipe = useCallback((count: number = 20) => {
    const facts = getSwipeFacts(count);
    setSwipeFacts(facts);
    setCurrentSwipeIndex(0);
  }, []);

  const nextSwipe = useCallback(() => {
    if (currentSwipeIndex < swipeFacts.length - 1) {
      setCurrentSwipeIndex((i) => i + 1);
    }
  }, [currentSwipeIndex, swipeFacts.length]);

  const prevSwipe = useCallback(() => {
    if (currentSwipeIndex > 0) {
      setCurrentSwipeIndex((i) => i - 1);
    }
  }, [currentSwipeIndex]);

  // True/False mode
  const startTrueFalse = useCallback((count: number = 10) => {
    const qs = getTrueFalseQuestions(count);
    setQuestions(qs);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setHasAnswered(false);
    setIsCorrect(false);
    setQuizResult(null);
  }, []);

  // Quiz mode
  const startQuiz = useCallback((count: number = 5) => {
    const qs = getQuizQuestions(count);
    setQuestions(qs);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setHasAnswered(false);
    setIsCorrect(false);
    setQuizResult(null);
  }, []);

  // Multiple choice mode
  const startGuessFact = useCallback((count: number = 10) => {
    const qs = getMultipleChoiceQuestions(count);
    setQuestions(qs);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setHasAnswered(false);
    setIsCorrect(false);
    setQuizResult(null);
  }, []);

  const submitAnswer = useCallback(async (answer: string) => {
    if (hasAnswered || !questions[currentQuestionIndex]) return;
    setSelectedAnswer(answer);
    setHasAnswered(true);
    const q = questions[currentQuestionIndex];
    const correct = q.type === 'true-false'
      ? validateTrueFalse(q, answer)
      : validateMultipleChoice(q, answer);
    setIsCorrect(correct);
    setAnswers((prev) => [...prev, answer]);

    if (q.type === 'true-false') {
      await updateTrueFalseStats(correct);
    }
  }, [hasAnswered, questions, currentQuestionIndex]);

  const nextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((i) => i + 1);
      setSelectedAnswer(null);
      setHasAnswered(false);
      setIsCorrect(false);
    }
  }, [currentQuestionIndex, questions.length]);

  const finishQuiz = useCallback(async () => {
    const mode: FunFactMode = questions[0]?.type === 'true-false' ? 'true-false' : 'quiz';
    const result = calculateQuizResult(questions, answers, mode);
    setQuizResult(result);
    await updateQuizStats(result.correctAnswers, result.totalQuestions);
    return result;
  }, [questions, answers]);

  // Search & filter
  const filterByCategory = useCallback((category: FunFactCategory | 'all') => {
    setActiveCategory(category);
    const facts = getFactsByCategory(category);
    setFilteredFacts(facts);
  }, []);

  const search = useCallback((query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const results = searchFacts(query);
      setFilteredFacts(results);
    } else {
      filterByCategory(activeCategory);
    }
  }, [activeCategory, filterByCategory]);

  const isDailyFactViewed = progress?.dailyFactViewedDate === getTodayString();
  const isFactSaved = progress?.savedFactIds.includes(currentFact?.id || '') || false;

  return {
    // State
    progress,
    currentFact,
    swipeFacts,
    currentSwipeIndex,
    questions,
    currentQuestionIndex,
    selectedAnswer,
    hasAnswered,
    isCorrect,
    quizResult,
    searchQuery,
    filteredFacts,
    activeCategory,
    loading,
    isDailyFactViewed,
    isFactSaved,

    // Actions
    loadProgress,
    discoverFact,
    saveFact,
    viewDailyFact,
    startSwipe,
    nextSwipe,
    prevSwipe,
    startTrueFalse,
    startQuiz,
    startGuessFact,
    submitAnswer,
    nextQuestion,
    finishQuiz,
    filterByCategory,
    search,
    setSelectedAnswer,
    setCurrentSwipeIndex,
  };
}
