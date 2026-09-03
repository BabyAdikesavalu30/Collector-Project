/**
 * Quiz Engine Route (/quiz)
 * Screen 19 Question-Answering Experience.
 * Manages active quiz session, per-question timer, answer submission, feedback, and result packaging.
 */

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { theme } from '../src/theme';
import { storage, STORAGE_KEYS } from '../src/storage/asyncStorage';
import { SupportedLanguage, getTranslation } from '../src/config/i18n';
import { AppBackButton } from '../src/components/navigation';
import {
  QuizDifficulty,
  QuizQuestionCount,
  QuizSetupConfig,
  getQuestionsForQuiz,
  useQuizEngine,
  resolveQuizContext,
  isOptionCorrect,
  quizResultStore,
  saveQuizResult,
  ReviewedQuestion,
} from '../src/features/quiz';

export default function QuizEngineScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    levelId?: string;
    subjectId?: string;
    pathwayId?: string;
    difficulty?: string;
    questionCount?: string;
    timerEnabled?: string;
    secondsPerQuestion?: string;
    showExplanation?: string;
    soundEffects?: string;
    confirmBeforeFinish?: string;
  }>();

  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [showExitModal, setShowExitModal] = useState<boolean>(false);
  const [showFinishModal, setShowFinishModal] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const storedLang = await storage.getItem<SupportedLanguage>(STORAGE_KEYS.USER_LANGUAGE);
      if (storedLang === 'en' || storedLang === 'ta') setLanguage(storedLang);
    })();
  }, []);

  const isTamil = language === 'ta';
  const t = getTranslation(language).quizEngine;

  // Build typed config from parameters with safe fallbacks
  const config: QuizSetupConfig = useMemo(() => {
    const rawCount = parseInt(params.questionCount || '10', 10);
    const validCounts: QuizQuestionCount[] = [5, 10, 15, 20, 30];
    const questionCount: QuizQuestionCount = validCounts.includes(rawCount as QuizQuestionCount)
      ? (rawCount as QuizQuestionCount)
      : 10;

    const validDifficulties: QuizDifficulty[] = ['beginner', 'intermediate', 'advanced'];
    const difficulty: QuizDifficulty = validDifficulties.includes(params.difficulty as QuizDifficulty)
      ? (params.difficulty as QuizDifficulty)
      : 'beginner';

    return {
      levelId: params.levelId || 'core',
      subjectId: params.subjectId || 'physics',
      pathwayId: params.pathwayId || 'phy-c-1',
      difficulty,
      questionCount,
      timerEnabled: params.timerEnabled !== 'false',
      secondsPerQuestion: 60,
      showExplanation: params.showExplanation !== 'false',
      soundEffects: params.soundEffects !== 'false',
      confirmBeforeFinish: params.confirmBeforeFinish !== 'false',
    };
  }, [params]);

  // Load deterministic questions
  const questions = useMemo(() => {
    return getQuestionsForQuiz(
      config.subjectId,
      config.pathwayId,
      config.difficulty,
      config.questionCount
    );
  }, [config]);

  // Resolved context for subject header
  const context = useMemo(() => {
    return resolveQuizContext(config.levelId, config.subjectId, config.pathwayId);
  }, [config]);

  // Initialize engine hook
  const {
    session,
    currentQuestion,
    currentIndex,
    totalQuestions,
    selectedOptionId,
    isSubmitted,
    isCorrect,
    isHintRevealed,
    timeRemaining,
    isTimerWarning,
    isTimeExpired,
    isFirstQuestion,
    isLastQuestion,
    score,
    selectOption,
    submitAnswer,
    revealHint,
    nextQuestion,
    prevQuestion,
    finishQuiz,
  } = useQuizEngine({ config, questions });

  // Complete and navigate to Results screen
  const handleProceedToResults = useCallback(() => {
    const result = finishQuiz();

    // Map questions into reviewable model
    const reviewedQuestions: ReviewedQuestion[] = session.questions.map((q, idx) => {
      const chosenOptionId = session.answers[q.id];
      const isAnswered = chosenOptionId !== null && chosenOptionId !== undefined;
      const correct = isAnswered && isOptionCorrect(q, chosenOptionId);
      const chosenOption = q.options.find((o) => o.id === chosenOptionId);
      const correctOption = q.options.find((o) => o.id === q.correctOptionId);

      return {
        questionId: q.id,
        questionNumber: idx + 1,
        question: q.question,
        selectedOptionId: chosenOptionId || undefined,
        correctOptionId: q.correctOptionId,
        selectedOptionText: chosenOption?.text || null,
        correctOptionText: correctOption?.text || { en: '', ta: '' },
        isCorrect: correct,
        isUnanswered: !isAnswered,
        explanation: q.explanation,
      };
    });

    // Populate shared in-memory store
    quizResultStore.setResult(result, reviewedQuestions);

    // Persist attempt to quiz history (counts toward points, streaks, accuracy)
    void saveQuizResult(result).catch((err) => {
      console.warn('[QUIZ] Failed to persist quiz result:', err);
    });

    // Navigate to /quiz-result
    router.replace({
      pathname: '/quiz-result',
      params: {
        totalQuestions: String(result.totalQuestions),
        correctAnswers: String(result.correctAnswers),
        wrongAnswers: String(result.wrongAnswers),
        unansweredQuestions: String(result.unansweredQuestions),
        score: String(result.score),
        percentage: String(result.percentage),
        bestStreak: String(result.bestStreak),
        levelId: result.config.levelId,
        subjectId: result.config.subjectId,
        pathwayId: result.config.pathwayId,
        difficulty: result.config.difficulty,
        showExplanation: String(result.config.showExplanation),
      },
    });
  }, [finishQuiz, session, router]);

  // Handle final finish action
  const handleFinishPress = useCallback(() => {
    if (config.confirmBeforeFinish) {
      setShowFinishModal(true);
    } else {
      handleProceedToResults();
    }
  }, [config.confirmBeforeFinish, handleProceedToResults]);

  // Handle exit confirmation
  const handleConfirmExit = useCallback(() => {
    setShowExitModal(false);
    router.back();
  }, [router]);

  // If no questions found (fallback safe state)
  if (!currentQuestion) {
    return (
      <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <StatusBar style="dark" translucent backgroundColor="transparent" />
        <View style={styles.emptyCard}>
          <Text style={styles.emptyIcon}>⚠️</Text>
          <Text style={styles.emptyTitle}>{t.noQuestionsAvailable}</Text>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>{t.backToQuizSetup}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const questionText = isTamil ? currentQuestion.question.ta : currentQuestion.question.en;
  const hintText = currentQuestion.hint
    ? isTamil
      ? currentQuestion.hint.ta
      : currentQuestion.hint.en
    : null;
  const explanationText = currentQuestion.explanation
    ? isTamil
      ? currentQuestion.explanation.ta
      : currentQuestion.explanation.en
    : null;

  const correctOption = currentQuestion.options.find(
    (o) => o.id === currentQuestion.correctOptionId
  );
  const correctOptionText = correctOption
    ? isTamil
      ? correctOption.text.ta
      : correctOption.text.en
    : '';

  const progressPercentage = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />

      {/* 1. Header */}
      <View style={[styles.header, { paddingTop: insets.top + theme.spacing.sm }]}>
        <AppBackButton
          onPress={() => setShowExitModal(true)}
          language={language}
          accessibilityLabel={t.exitQuiz}
          accessibilityHint={t.accessibility.exitHint}
          style={styles.backButton}
        />

        <Text style={styles.headerTitle} numberOfLines={1}>
          {context.subjectTitle} {t.quiz}
        </Text>

        <View style={styles.scoreBadge}>
          <Text style={styles.scoreBadgeText}>⭐ {score}</Text>
        </View>
      </View>

      {/* 2. Progress & Timer Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressTextRow}>
          <Text style={styles.progressLabel}>
            {t.question} {currentIndex + 1} {t.of} {totalQuestions}
          </Text>
          <View style={[styles.timerBadge, isTimerWarning && styles.timerWarningBadge]}>
            <Text style={[styles.timerText, isTimerWarning && styles.timerWarningText]}>
              {config.timerEnabled
                ? `⏱ 00:${timeRemaining.toString().padStart(2, '0')}`
                : t.timerOff}
            </Text>
          </View>
        </View>

        {/* Horizontal Progress Bar */}
        <View style={styles.progressBarTrack}>
          <View style={[styles.progressBarFill, { width: `${progressPercentage}%` }]} />
        </View>
      </View>

      {/* 3. Scrollable Question Body */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 90 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Question Card */}
        <View style={styles.questionCard}>
          <Text style={styles.questionText}>{questionText}</Text>
        </View>

        {/* Answer Options */}
        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option) => {
            const isSelected = selectedOptionId === option.id;
            const isOptionCorrectAnswer = option.id === currentQuestion.correctOptionId;
            const optionText = isTamil ? option.text.ta : option.text.en;

            let cardStyle: StyleProp<ViewStyle> = styles.optionCard;
            let textStyle: StyleProp<TextStyle> = styles.optionText;
            let badgeStyle: StyleProp<ViewStyle> = styles.optionBadge;
            let badgeTextStyle: StyleProp<TextStyle> = styles.optionBadgeText;

            if (isSubmitted) {
              if (isOptionCorrectAnswer) {
                cardStyle = styles.optionCardCorrect;
                textStyle = styles.optionTextCorrect;
                badgeStyle = styles.optionBadgeCorrect;
                badgeTextStyle = styles.optionBadgeTextCorrect;
              } else if (isSelected && !isOptionCorrectAnswer) {
                cardStyle = styles.optionCardIncorrect;
                textStyle = styles.optionTextIncorrect;
                badgeStyle = styles.optionBadgeIncorrect;
                badgeTextStyle = styles.optionBadgeTextIncorrect;
              }
            } else if (isSelected) {
              cardStyle = styles.optionCardSelected;
              textStyle = styles.optionTextSelected;
              badgeStyle = styles.optionBadgeSelected;
              badgeTextStyle = styles.optionBadgeTextSelected;
            }

            return (
              <TouchableOpacity
                key={option.id}
                style={[styles.optionBase, cardStyle]}
                onPress={() => selectOption(option.id)}
                disabled={isSubmitted}
                activeOpacity={0.8}
                accessible={true}
                accessibilityRole="radio"
                accessibilityState={{ selected: isSelected }}
                accessibilityLabel={`${option.label}. ${optionText}`}
              >
                <View style={[styles.optionBadgeBase, badgeStyle]}>
                  <Text style={[styles.optionBadgeTextBase, badgeTextStyle]}>
                    {option.label}
                  </Text>
                </View>

                <Text style={[styles.optionTextBase, textStyle]}>{optionText}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Hint Accordion Card (if unsubmitted and hint available) */}
        {Boolean(hintText) && !isSubmitted && (
          <View style={styles.hintContainer}>
            {!isHintRevealed ? (
              <TouchableOpacity
                style={styles.hintTrigger}
                onPress={revealHint}
                activeOpacity={0.7}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel={t.accessibility.hintButton}
              >
                <Text style={styles.hintIcon}>💡</Text>
                <View style={styles.hintTextGroup}>
                  <Text style={styles.hintTitle}>{t.needHint}</Text>
                  <Text style={styles.hintSubtitle}>{t.tapToRevealHint}</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <View style={styles.hintBox}>
                <Text style={styles.hintRevealedTitle}>💡 {t.hint}</Text>
                <Text style={styles.hintRevealedText}>{hintText}</Text>
              </View>
            )}
          </View>
        )}

        {/* Post-Submission Feedback Banner */}
        {isSubmitted && (
          <View
            style={[
              styles.feedbackBanner,
              isCorrect ? styles.feedbackBannerCorrect : styles.feedbackBannerIncorrect,
            ]}
          >
            <View style={styles.feedbackHeaderRow}>
              <Text style={styles.feedbackIcon}>{isCorrect ? '✓' : '✕'}</Text>
              <Text
                style={[
                  styles.feedbackTitle,
                  isCorrect ? styles.feedbackTitleCorrect : styles.feedbackTitleIncorrect,
                ]}
              >
                {isTimeExpired ? t.timeExpired : isCorrect ? t.correct : t.incorrect}
              </Text>
              {isCorrect && <Text style={styles.pointsBadge}>{t.pointsAwarded}</Text>}
            </View>

            {!isCorrect && (
              <Text style={styles.correctAnswerText}>
                {t.correctAnswer} <Text style={styles.correctAnswerBold}>{correctOptionText}</Text>
              </Text>
            )}

            {/* Explanation (if enabled) */}
            {config.showExplanation && Boolean(explanationText) && (
              <View style={styles.explanationContainer}>
                <Text style={styles.explanationLabel}>💡 {t.explanation}:</Text>
                <Text style={styles.explanationBody}>{explanationText}</Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>

      {/* 4. Bottom Navigation Control Bar */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + theme.spacing.sm }]}>
        {!isSubmitted ? (
          // Submit Answer CTA
          <TouchableOpacity
            style={[
              styles.primaryButton,
              !selectedOptionId && styles.buttonDisabled,
            ]}
            onPress={submitAnswer}
            disabled={!selectedOptionId}
            activeOpacity={0.8}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={t.submitAnswer}
            accessibilityHint={t.accessibility.submitHint}
          >
            <Text
              style={[
                styles.primaryButtonText,
                !selectedOptionId && styles.buttonDisabledText,
              ]}
            >
              {t.submitAnswer}
            </Text>
          </TouchableOpacity>
        ) : (
          // Navigation: Previous & Next / Finish
          <View style={styles.navButtonGroup}>
            {!isFirstQuestion && (
              <TouchableOpacity
                style={styles.navSecondaryButton}
                onPress={prevQuestion}
                activeOpacity={0.8}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel={t.previous}
                accessibilityHint={t.accessibility.prevHint}
              >
                <Text style={styles.navSecondaryButtonText}>← {t.previous}</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[styles.primaryButton, styles.navPrimaryButton]}
              onPress={isLastQuestion ? handleFinishPress : nextQuestion}
              activeOpacity={0.8}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={isLastQuestion ? t.finishQuiz : t.nextQuestion}
              accessibilityHint={
                isLastQuestion ? t.accessibility.finishHint : t.accessibility.nextHint
              }
            >
              <Text style={styles.primaryButtonText}>
                {isLastQuestion ? t.finishQuiz : `${t.nextQuestion} →`}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Exit Confirmation Modal */}
      <Modal visible={showExitModal} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalDialog}>
            <Text style={styles.modalTitle}>{t.exitConfirmTitle}</Text>
            <Text style={styles.modalBody}>{t.exitConfirmBody}</Text>
            <View style={styles.modalButtonGroup}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => setShowExitModal(false)}
                activeOpacity={0.8}
              >
                <Text style={styles.modalCancelButtonText}>{t.cancel}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalDestructiveButton}
                onPress={handleConfirmExit}
                activeOpacity={0.8}
              >
                <Text style={styles.modalDestructiveButtonText}>{t.confirmExit}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Finish Confirmation Modal */}
      <Modal visible={showFinishModal} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalDialog}>
            <Text style={styles.modalTitle}>{t.finishConfirmTitle}</Text>
            <Text style={styles.modalBody}>{t.finishConfirmBody}</Text>
            <View style={styles.modalButtonGroup}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => setShowFinishModal(false)}
                activeOpacity={0.8}
              >
                <Text style={styles.modalCancelButtonText}>{t.cancel}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => {
                  setShowFinishModal(false);
                  handleProceedToResults();
                }}
                activeOpacity={0.8}
              >
                <Text style={styles.primaryButtonText}>{t.confirmFinish}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.pearlWhite,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.sm,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
  },
  backIcon: {
    fontSize: 22,
    color: theme.colors.navy900,
    fontWeight: '700',
  },
  headerTitle: {
    ...theme.typography.h2,
    fontSize: 17,
    fontWeight: '800',
    color: theme.colors.navy900,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: theme.spacing.xs,
  },
  scoreBadge: {
    backgroundColor: theme.colors.warningBackground,
    borderWidth: 1,
    borderColor: theme.colors.warningBorder,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
  },
  scoreBadgeText: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.warning,
  },
  progressContainer: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  progressTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  progressLabel: {
    ...theme.typography.caption,
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.navy900,
  },
  timerBadge: {
    backgroundColor: theme.colors.blue50,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: theme.borderRadius.sm,
  },
  timerWarningBadge: {
    backgroundColor: theme.colors.error50,
  },
  timerText: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.brandPrimary,
  },
  timerWarningText: {
    color: theme.colors.error600,
  },
  progressBarTrack: {
    height: 6,
    backgroundColor: theme.colors.gray100,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: theme.colors.actionPrimary,
    borderRadius: 3,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: theme.spacing.lg,
  },
  questionCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  questionText: {
    ...theme.typography.h2,
    fontSize: 17,
    fontWeight: '700',
    color: theme.colors.navy900,
    lineHeight: 25,
  },
  optionsContainer: {
    width: '100%',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  optionBase: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.white,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    minHeight: 52,
  },
  optionCard: {
    borderColor: theme.colors.border,
  },
  optionCardSelected: {
    borderColor: theme.colors.actionPrimary,
    backgroundColor: theme.colors.blue50,
  },
  optionCardCorrect: {
    borderColor: theme.colors.green600,
    backgroundColor: theme.colors.green50,
  },
  optionCardIncorrect: {
    borderColor: theme.colors.error600,
    backgroundColor: theme.colors.error50,
  },
  optionBadgeBase: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.colors.gray100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.sm,
  },
  optionBadge: {
    backgroundColor: theme.colors.gray100,
  },
  optionBadgeSelected: {
    backgroundColor: theme.colors.actionPrimary,
  },
  optionBadgeCorrect: {
    backgroundColor: theme.colors.green600,
  },
  optionBadgeIncorrect: {
    backgroundColor: theme.colors.error600,
  },
  optionBadgeTextBase: {
    ...theme.typography.caption,
    fontSize: 13,
    fontWeight: '800',
    color: theme.colors.slate600,
  },
  optionBadgeText: {
    color: theme.colors.slate600,
  },
  optionBadgeTextSelected: {
    color: theme.colors.textOnAction,
  },
  optionBadgeTextCorrect: {
    color: theme.colors.textOnAction,
  },
  optionBadgeTextIncorrect: {
    color: theme.colors.textOnAction,
  },
  optionTextBase: {
    ...theme.typography.body,
    fontSize: 14.5,
    fontWeight: '600',
    color: theme.colors.navy900,
    flex: 1,
  },
  optionText: {
    color: theme.colors.navy900,
  },
  optionTextSelected: {
    color: theme.colors.brandPrimary,
    fontWeight: '700',
  },
  optionTextCorrect: {
    color: theme.colors.green600,
    fontWeight: '700',
  },
  optionTextIncorrect: {
    color: theme.colors.error600,
    fontWeight: '700',
  },
  hintContainer: {
    width: '100%',
    marginBottom: theme.spacing.md,
  },
  hintTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.warningBackground,
    borderWidth: 1,
    borderColor: theme.colors.warningBorder,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
  },
  hintIcon: {
    fontSize: 20,
    marginRight: theme.spacing.sm,
  },
  hintTextGroup: {
    flex: 1,
  },
  hintTitle: {
    ...theme.typography.caption,
    fontSize: 12.5,
    fontWeight: '700',
    color: theme.colors.warning,
  },
  hintSubtitle: {
    ...theme.typography.caption,
    fontSize: 11,
    color: theme.colors.warning,
  },
  hintBox: {
    backgroundColor: theme.colors.warningBackground,
    borderWidth: 1,
    borderColor: theme.colors.warningBorder,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  hintRevealedTitle: {
    ...theme.typography.caption,
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.warning,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  hintRevealedText: {
    ...theme.typography.caption,
    fontSize: 13,
    color: theme.colors.navy900,
    lineHeight: 18,
  },
  feedbackBanner: {
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
  },
  feedbackBannerCorrect: {
    backgroundColor: theme.colors.green50,
    borderColor: theme.colors.green100,
  },
  feedbackBannerIncorrect: {
    backgroundColor: theme.colors.error50,
    borderColor: theme.colors.error100,
  },
  feedbackHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  feedbackIcon: {
    fontSize: 16,
    fontWeight: '900',
    marginRight: 6,
  },
  feedbackTitle: {
    ...theme.typography.h3,
    fontSize: 15,
    fontWeight: '800',
    flex: 1,
  },
  feedbackTitleCorrect: {
    color: theme.colors.green600,
  },
  feedbackTitleIncorrect: {
    color: theme.colors.error600,
  },
  pointsBadge: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.green600,
    backgroundColor: theme.colors.green100,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
  },
  correctAnswerText: {
    ...theme.typography.caption,
    fontSize: 13,
    color: theme.colors.error600,
    marginBottom: theme.spacing.xs,
  },
  correctAnswerBold: {
    fontWeight: '800',
    color: theme.colors.green600,
  },
  explanationContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.sm,
    marginTop: theme.spacing.xs,
  },
  explanationLabel: {
    ...theme.typography.caption,
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.brandPrimary,
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  explanationBody: {
    ...theme.typography.caption,
    fontSize: 12.5,
    color: theme.colors.slate600,
    lineHeight: 18,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.sm,
  },
  primaryButton: {
    height: 50,
    backgroundColor: theme.colors.actionPrimary,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.brandPrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  primaryButtonText: {
    ...theme.typography.button,
    color: theme.colors.textOnAction,
    fontSize: 15,
    fontWeight: '800',
  },
  buttonDisabled: {
    backgroundColor: theme.colors.gray200,
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonDisabledText: {
    color: theme.colors.slate400,
  },
  navButtonGroup: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  navSecondaryButton: {
    flex: 1,
    height: 50,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navSecondaryButtonText: {
    ...theme.typography.button,
    color: theme.colors.navy900,
    fontSize: 14,
    fontWeight: '700',
  },
  navPrimaryButton: {
    flex: 1.5,
  },
  emptyCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: theme.spacing.md,
  },
  emptyTitle: {
    ...theme.typography.h2,
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.navy900,
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  modalDialog: {
    width: '100%',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 5,
  },
  modalTitle: {
    ...theme.typography.h2,
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.navy900,
    marginBottom: theme.spacing.xs,
  },
  modalBody: {
    ...theme.typography.body,
    fontSize: 14,
    color: theme.colors.slate600,
    lineHeight: 20,
    marginBottom: theme.spacing.lg,
  },
  modalButtonGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: theme.spacing.sm,
  },
  modalCancelButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  modalCancelButtonText: {
    ...theme.typography.button,
    color: theme.colors.slate600,
    fontSize: 13,
    fontWeight: '700',
  },
  modalDestructiveButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.error600,
  },
  modalDestructiveButtonText: {
    ...theme.typography.button,
    color: theme.colors.white,
    fontSize: 13,
    fontWeight: '800',
  },
});
