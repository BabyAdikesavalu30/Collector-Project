/**
 * Verification Script for Screen 20: Quiz Results + Review Answers
 * Tests score calculation, accuracy percentage, streak tracking, review filters,
 * student personalization, localization completeness, and store lifecycle.
 */

import {
  QuizResult,
  QuizSession,
  ReviewedQuestion,
  calculateQuizResult,
  getPerformanceTier,
  filterReviewedQuestions,
  createFallbackResultFromParams,
  quizResultStore,
} from '../features/quiz';
import { getTranslation } from '../config/i18n';

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ ASSERTION FAILED: ${message}`);
    process.exit(1);
  } else {
    console.log(`✅ ${message}`);
  }
}

export function runQuizResultVerification() {
  console.log('\n--- STARTING SCREEN 20: QUIZ RESULTS + REVIEW ANSWERS VERIFICATION ---\n');

  // =========================================================================
  // 1. Result Scoring, Percentages, and Streak Calculations
  // =========================================================================
  console.log('[1] Verifying Result Calculations:');

  const mockSession: QuizSession = {
    config: {
      levelId: 'core',
      subjectId: 'physics',
      pathwayId: 'phy-c-1',
      difficulty: 'beginner',
      questionCount: 15,
      timerEnabled: true,
      secondsPerQuestion: 60,
      showExplanation: true,
      soundEffects: true,
      confirmBeforeFinish: true,
    },
    questions: [
      {
        id: 'q1',
        subjectId: 'physics',
        pathwayId: 'phy-c-1',
        difficulty: 'beginner',
        question: { en: 'Q1', ta: 'வி1' },
        options: [
          { id: 'a', label: 'A', text: { en: 'Opt A', ta: 'தே1' } },
          { id: 'b', label: 'B', text: { en: 'Opt B', ta: 'தே2' } },
        ],
        correctOptionId: 'b',
      },
      {
        id: 'q2',
        subjectId: 'physics',
        pathwayId: 'phy-c-1',
        difficulty: 'beginner',
        question: { en: 'Q2', ta: 'வி2' },
        options: [
          { id: 'a', label: 'A', text: { en: 'Opt A', ta: 'தே1' } },
          { id: 'b', label: 'B', text: { en: 'Opt B', ta: 'தே2' } },
        ],
        correctOptionId: 'a',
      },
      {
        id: 'q3',
        subjectId: 'physics',
        pathwayId: 'phy-c-1',
        difficulty: 'beginner',
        question: { en: 'Q3', ta: 'வி3' },
        options: [
          { id: 'a', label: 'A', text: { en: 'Opt A', ta: 'தே1' } },
          { id: 'b', label: 'B', text: { en: 'Opt B', ta: 'தே2' } },
        ],
        correctOptionId: 'a',
      },
    ],
    currentIndex: 2,
    answers: {
      q1: 'b', // Correct
      q2: 'b', // Wrong (correct is a)
      q3: null, // Unanswered (timed-out)
    },
    submitted: {
      q1: true,
      q2: true,
      q3: true,
    },
    timeRemaining: { q1: 45, q2: 30, q3: 0 },
    revealedHints: {},
    correctCount: 1,
    wrongCount: 2,
    score: 10,
    bestStreak: 1,
    currentStreak: 0,
    startedAt: 1000,
    completedAt: 2000,
  };

  const calculated = calculateQuizResult(mockSession);

  assert(calculated.totalQuestions === 3, 'Total questions matches 3');
  assert(calculated.correctAnswers === 1, 'Correct answers is 1');
  assert(calculated.wrongAnswers === 2, 'Wrong answers is 2 (1 incorrect + 1 unanswered)');
  assert(calculated.unansweredQuestions === 1, 'Unanswered questions is 1');
  assert(calculated.score === 10, 'Score is 10 points (+10 per correct)');
  assert(calculated.percentage === 33, 'Percentage is 33% (1/3 rounded)');
  assert(calculated.bestStreak === 1, 'Best streak is 1');

  // =========================================================================
  // 2. Performance Tier Categorization
  // =========================================================================
  console.log('\n[2] Verifying Performance Tiers:');

  assert(getPerformanceTier(100) === 'excellent', '100% maps to excellent');
  assert(getPerformanceTier(90) === 'excellent', '90% maps to excellent');
  assert(getPerformanceTier(86) === 'great', '86% maps to great');
  assert(getPerformanceTier(75) === 'great', '75% maps to great');
  assert(getPerformanceTier(60) === 'good', '60% maps to good');
  assert(getPerformanceTier(45) === 'practice', '45% maps to practice');

  // =========================================================================
  // 3. Review Questions Data Mapping & Filtering
  // =========================================================================
  console.log('\n[3] Verifying Review Questions Filtering:');

  const mockReviewedQuestions: ReviewedQuestion[] = [
    {
      questionId: 'q1',
      questionNumber: 1,
      question: { en: 'What is force?', ta: 'விசை என்றால் என்ன?' },
      selectedOptionId: 'b',
      correctOptionId: 'b',
      selectedOptionText: { en: 'Newton', ta: 'நியூட்டன்' },
      correctOptionText: { en: 'Newton', ta: 'நியூட்டன்' },
      isCorrect: true,
      isUnanswered: false,
      explanation: { en: 'Force unit is Newton', ta: 'விசையின் அலகு நியூட்டன்' },
    },
    {
      questionId: 'q2',
      questionNumber: 2,
      question: { en: 'What is work?', ta: 'வேலை என்றால் என்ன?' },
      selectedOptionId: 'a',
      correctOptionId: 'b',
      selectedOptionText: { en: 'Watt', ta: 'வாட்' },
      correctOptionText: { en: 'Joule', ta: 'ஜூல்' },
      isCorrect: false,
      isUnanswered: false,
      explanation: { en: 'Work unit is Joule', ta: 'வேலையின் அலகு ஜூல்' },
    },
    {
      questionId: 'q3',
      questionNumber: 3,
      question: { en: 'What is energy?', ta: 'ஆற்றல் என்றால் என்ன?' },
      selectedOptionId: undefined,
      correctOptionId: 'a',
      selectedOptionText: null,
      correctOptionText: { en: 'Joule', ta: 'ஜூல்' },
      isCorrect: false,
      isUnanswered: true,
    },
  ];

  const allFiltered = filterReviewedQuestions(mockReviewedQuestions, 'all');
  const correctFiltered = filterReviewedQuestions(mockReviewedQuestions, 'correct');
  const wrongFiltered = filterReviewedQuestions(mockReviewedQuestions, 'wrong');

  assert(allFiltered.length === 3, 'All filter returns 3 questions');
  assert(correctFiltered.length === 1, 'Correct filter returns 1 question');
  assert(wrongFiltered.length === 2, 'Wrong filter returns 2 questions (incorrect + unanswered)');
  assert(
    allFiltered.length === correctFiltered.length + wrongFiltered.length,
    'Filter consistency: All count === Correct count + Wrong count'
  );

  // =========================================================================
  // 4. Quiz Result In-Memory Store
  // =========================================================================
  console.log('\n[4] Verifying Quiz Result Store:');

  quizResultStore.setResult(calculated, mockReviewedQuestions);
  const storedResult = quizResultStore.getResult();
  const storedQuestions = quizResultStore.getReviewedQuestions();

  assert(storedResult !== null, 'Stored result is not null');
  assert(storedResult?.score === 10, 'Stored score is 10');
  assert(storedQuestions.length === 3, 'Stored reviewed questions count is 3');

  quizResultStore.clear();
  assert(quizResultStore.getResult() === null, 'Store clears result successfully');
  assert(quizResultStore.getReviewedQuestions().length === 0, 'Store clears reviewed questions');

  // =========================================================================
  // 5. Fallback Result from Query Parameters
  // =========================================================================
  console.log('\n[5] Verifying Fallback Result Parser:');

  const fallback = createFallbackResultFromParams({
    totalQuestions: '15',
    correctAnswers: '13',
    wrongAnswers: '2',
    unansweredQuestions: '0',
    score: '130',
    percentage: '87',
    bestStreak: '14',
    levelId: 'core',
    subjectId: 'physics',
    pathwayId: 'phy-c-1',
    difficulty: 'beginner',
  });

  assert(fallback !== null, 'Fallback result created successfully');
  assert(fallback?.totalQuestions === 15, 'Fallback total is 15');
  assert(fallback?.correctAnswers === 13, 'Fallback correct is 13');
  assert(fallback?.wrongAnswers === 2, 'Fallback wrong is 2');
  assert(fallback?.percentage === 87, 'Fallback percentage is 87');
  assert(fallback?.score === 130, 'Fallback score is 130');

  // =========================================================================
  // 6. Localization Completeness
  // =========================================================================
  console.log('\n[6] Verifying Localization Dictionaries:');

  const enResult = getTranslation('en').quizResult;
  const taResult = getTranslation('ta').quizResult;
  const enReview = getTranslation('en').quizReview;
  const taReview = getTranslation('ta').quizReview;

  assert(enResult.headerTitle === 'Quiz Results', 'English result headerTitle is Quiz Results');
  assert(taResult.headerTitle === 'வினாடி வினா முடிவுகள்', 'Tamil result headerTitle is localized');
  assert(enResult.reviewAnswers === 'Review Answers', 'English review CTA present');
  assert(taResult.reviewAnswers === 'பதில்களைப் பார்க்கவும்', 'Tamil review CTA present');
  assert(enResult.backToHome === 'Back to Home', 'English backToHome present');
  assert(taResult.backToHome === 'முகப்புக்குத் திரும்பவும்', 'Tamil backToHome present');

  assert(enReview.headerTitle === 'Review Answers', 'English review headerTitle present');
  assert(taReview.headerTitle === 'பதில்களை மதிப்பாய்வு செய்யவும்', 'Tamil review headerTitle present');
  assert(enReview.filterAll === 'All', 'English filterAll present');
  assert(taReview.filterAll === 'அனைத்தும்', 'Tamil filterAll present');
  assert(enReview.statusCorrect === 'Correct', 'English statusCorrect present');
  assert(taReview.statusCorrect === 'சரி', 'Tamil statusCorrect present');

  console.log('\n🎉 ALL SCREEN 20 QUIZ RESULTS & REVIEW VERIFICATIONS PASSED SUCCESSFULLY!\n');
}

runQuizResultVerification();
