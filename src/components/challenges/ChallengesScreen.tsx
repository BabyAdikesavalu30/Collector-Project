/**
 * ChallengesScreen Component (/challenges)
 * Focused single-question daily challenge. The question is picked
 * deterministically from the quiz bank using today's date as the seed, so
 * every student sees the same challenge on a given day. Completion is
 * stored locally and the points flow through the same quiz-result path.
 */

import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { AppBackButton } from '../navigation';
import {
  QuizQuestion,
  QuizQuestionCount,
  saveQuizResult,
  POINTS_PER_CORRECT_ANSWER,
  isOptionCorrect,
} from '../../features/quiz';
import {
  getChallengeDateString,
  pickDailyChallengeQuestion,
  getDailyChallengeState,
  markDailyChallengeCompleted,
  DailyChallengeState,
} from '../../features/challenges';

interface ChallengesScreenProps {
  language?: SupportedLanguage;
  onBack: () => void;
  onStartLearning: () => void;
}

export const ChallengesScreen: React.FC<ChallengesScreenProps> = ({
  language = 'en',
  onBack,
  onStartLearning,
}) => {
  const insets = useSafeAreaInsets();
  const isTamil = language === 'ta';

  const [question, setQuestion] = useState<QuizQuestion | null>(null);
  const [challengeState, setChallengeState] = useState<DailyChallengeState | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [justSubmitted, setJustSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const dateStr = getChallengeDateString();

  const loadChallenge = useCallback(async () => {
    try {
      const [state, picked] = await Promise.all([
        getDailyChallengeState(dateStr),
        Promise.resolve(pickDailyChallengeQuestion(dateStr)),
      ]);
      setChallengeState(state);
      setQuestion(picked);
      setSelectedOptionId(null);
      setJustSubmitted(false);
    } finally {
      setIsLoading(false);
    }
  }, [dateStr]);

  useEffect(() => {
    loadChallenge();
  }, [loadChallenge]);

  const handleSubmit = useCallback(async () => {
    if (!question || !selectedOptionId || challengeState?.completed) return;

    const isCorrect = isOptionCorrect(question, selectedOptionId);
    const completedAt = Date.now();
    const pointsEarned = isCorrect ? POINTS_PER_CORRECT_ANSWER : 0;

    // Same persistence path as regular quizzes — counts toward stats/badges
    await saveQuizResult(
      {
        config: {
          levelId: 'daily-challenge',
          subjectId: question.subjectId,
          pathwayId: question.pathwayId,
          difficulty: question.difficulty,
          // The challenge is a single question; the setup count type only allows
          // quiz-setup sizes, so cast the 1-question count explicitly.
          questionCount: 1 as unknown as QuizQuestionCount,
          timerEnabled: false,
          secondsPerQuestion: 60,
          showExplanation: true,
          soundEffects: false,
          confirmBeforeFinish: false,
        },
        totalQuestions: 1,
        correctAnswers: isCorrect ? 1 : 0,
        wrongAnswers: isCorrect ? 0 : 1,
        unansweredQuestions: 0,
        score: pointsEarned,
        percentage: isCorrect ? 100 : 0,
        bestStreak: isCorrect ? 1 : 0,
        completedAt,
      },
      { isDailyChallenge: true }
    ).catch((err) => {
      console.warn('[CHALLENGE] Failed to persist result:', err);
    });

    const state = await markDailyChallengeCompleted(question.id, {
      questionId: question.id,
      selectedOptionId,
      isCorrect,
      pointsEarned,
      answeredAt: completedAt,
    });
    setChallengeState(state);
    setJustSubmitted(true);
  }, [question, selectedOptionId, challengeState]);

  const isCompleted = Boolean(challengeState?.completed);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <AppBackButton onPress={onBack} language={language} style={styles.headerBackBtn} />
        <Text style={styles.headerTitle}>{isTamil ? 'தினசரி சவால்' : 'Daily Challenge'}</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollBody}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom + 24, 32) },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Date badge */}
        <View style={styles.datePill}>
          <Text style={styles.datePillText}>
            {isTamil ? 'இன்றைய கேள்வி · ' : "Today's Question · "}
            {dateStr}
          </Text>
        </View>

        {isLoading ? (
          <Text style={styles.loadingText}>{isTamil ? 'ஏற்றுகிறது...' : 'Loading...'}</Text>
        ) : !question ? (
          <View style={styles.card}>
            <Text style={styles.emptyIcon}>⚠️</Text>
            <Text style={styles.emptyTitle}>
              {isTamil ? 'இன்றைய சவால் இல்லை' : 'No Challenge Available'}
            </Text>
          </View>
        ) : isCompleted ? (
          /* ---- Completed state ---- */
          <View style={styles.completedCard}>
            <Text style={styles.completedIcon}>
              {challengeState?.result?.isCorrect ? '🎉' : '💪'}
            </Text>
            <Text style={styles.completedTitle}>
              {challengeState?.result?.isCorrect
                ? isTamil
                  ? 'சவால் நிறைவு!'
                  : 'Challenge Complete!'
                : isTamil
                  ? 'சவால் முடிந்தது'
                  : 'Challenge Attempted'}
            </Text>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>{isTamil ? 'உங்கள் மதிப்பெண்' : 'Your Result'}</Text>
              <Text
                style={[
                  styles.resultValue,
                  challengeState?.result?.isCorrect ? styles.resultCorrect : styles.resultWrong,
                ]}
              >
                {challengeState?.result?.isCorrect
                  ? `${isTamil ? 'சரியானது' : 'Correct'} +${challengeState?.result?.pointsEarned ?? 0} pts`
                  : isTamil
                    ? 'தவறானது'
                    : 'Incorrect'}
              </Text>
            </View>

            <View style={styles.answerBox}>
              <Text style={styles.answerLabel}>
                {isTamil ? 'சரியான விடை:' : 'Correct Answer:'}
              </Text>
              <Text style={styles.answerText}>
                {(() => {
                  const correctOption = question.options.find(
                    (o) => o.id === question.correctOptionId
                  );
                  return correctOption
                    ? isTamil
                      ? correctOption.text.ta
                      : correctOption.text.en
                    : '';
                })()}
              </Text>
              {question.explanation && (
                <Text style={styles.explanationText}>
                  {isTamil ? question.explanation.ta : question.explanation.en}
                </Text>
              )}
            </View>

            <Text style={styles.comeBackText}>
              {isTamil
                ? 'நாளை மீண்டும் புதிய சவாலுக்கு வாருங்கள்!'
                : 'Come back tomorrow for a fresh challenge!'}
            </Text>
          </View>
        ) : (
          /* ---- Active question state ---- */
          <>
            <View style={styles.card}>
              <Text style={styles.sectionLabel}>
                {isTamil ? 'கேள்வி' : 'QUESTION'}
              </Text>
              <Text style={styles.questionText}>
                {isTamil ? question.question.ta : question.question.en}
              </Text>
            </View>

            <View style={styles.optionsContainer}>
              {question.options.map((option) => {
                const isSelected = selectedOptionId === option.id;
                const isOptionCorrectAnswer = option.id === question.correctOptionId;
                const optionText = isTamil ? option.text.ta : option.text.en;

                let cardStyle = styles.optionCard;
                let textStyle = styles.optionText;
                let badgeStyle = styles.optionBadge;
                let badgeTextStyle = styles.optionBadgeText;

                if (justSubmitted) {
                  if (isOptionCorrectAnswer) {
                    cardStyle = styles.optionCardCorrect;
                    textStyle = styles.optionTextCorrect;
                    badgeStyle = styles.optionBadgeCorrect;
                    badgeTextStyle = styles.optionBadgeTextCorrect;
                  } else if (isSelected) {
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
                    onPress={() => setSelectedOptionId(option.id)}
                    disabled={justSubmitted}
                    activeOpacity={0.8}
                    accessible={true}
                    accessibilityRole="radio"
                    accessibilityState={{ selected: isSelected }}
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

            {!justSubmitted ? (
              <TouchableOpacity
                style={[styles.primaryButton, !selectedOptionId && styles.buttonDisabled]}
                onPress={handleSubmit}
                disabled={!selectedOptionId}
                activeOpacity={0.85}
                accessible={true}
                accessibilityRole="button"
              >
                <Text style={[styles.primaryButtonText, !selectedOptionId && styles.buttonDisabledText]}>
                  {isTamil ? 'விடையைச் சரிபார்க்கவும்' : 'Check Answer'}
                </Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.feedbackBox}>
                <Text
                  style={[
                    styles.feedbackTitle,
                    challengeState?.result?.isCorrect
                      ? styles.feedbackCorrect
                      : styles.feedbackWrong,
                  ]}
                >
                  {challengeState?.result?.isCorrect
                    ? isTamil
                      ? 'சரியானது! 🎉'
                      : 'Correct! 🎉'
                    : isTamil
                      ? 'சரியாக இல்லை'
                      : 'Not quite'}
                </Text>
                {question.explanation && (
                  <Text style={styles.feedbackExplanation}>
                    {isTamil ? question.explanation.ta : question.explanation.en}
                  </Text>
                )}
                <Text style={styles.comeBackText}>
                  {isTamil
                    ? 'நாளை மீண்டும் புதிய சவாலுக்கு வாருங்கள்!'
                    : 'Come back tomorrow for a fresh challenge!'}
                </Text>
              </View>
            )}
          </>
        )}

        {/* Always-available CTA to keep learning */}
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={onStartLearning}
          activeOpacity={0.85}
          accessible={true}
          accessibilityRole="button"
        >
          <Text style={styles.secondaryButtonText}>
            {isTamil ? 'மேலும் வினாடி வினாக்களை முயற்சிக்கவும் →' : 'Try More Quizzes →'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.pearlWhite,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.base,
    paddingBottom: theme.spacing.sm,
  },
  headerBackBtn: {},
  headerTitle: {
    ...theme.typography.h2,
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.navy900,
    flex: 1,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 44,
  },
  scrollBody: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.base,
    paddingBottom: 24,
  },
  datePill: {
    alignSelf: 'center',
    backgroundColor: theme.colors.purple100,
    borderWidth: 1,
    borderColor: theme.colors.purple200,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    marginBottom: theme.spacing.md,
  },
  datePillText: {
    ...theme.typography.caption,
    fontSize: 11.5,
    fontWeight: '800',
    color: theme.colors.brandPrimary,
  },
  loadingText: {
    ...theme.typography.body,
    color: theme.colors.slate600,
    textAlign: 'center',
    marginTop: 40,
  },
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionLabel: {
    ...theme.typography.overline,
    fontSize: 10.5,
    fontWeight: '800',
    color: theme.colors.brandPrimary,
    letterSpacing: 1,
    marginBottom: 6,
  },
  questionText: {
    ...theme.typography.h2,
    fontSize: 17,
    fontWeight: '700',
    color: theme.colors.navy900,
    lineHeight: 25,
  },
  optionsContainer: {
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
  optionCard: {},
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
  optionBadge: {},
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
  optionBadgeText: {},
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
  optionText: {},
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
  primaryButton: {
    height: 50,
    backgroundColor: theme.colors.actionPrimary,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.actionPrimary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  primaryButtonText: {
    ...theme.typography.button,
    fontSize: 15,
    fontWeight: '800',
    color: theme.colors.textOnAction,
  },
  buttonDisabled: {
    backgroundColor: theme.colors.gray200,
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonDisabledText: {
    color: theme.colors.slate400,
  },
  completedCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.green200,
    padding: theme.spacing.lg,
    alignItems: 'center',
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  completedIcon: {
    fontSize: 44,
    marginBottom: 4,
  },
  completedTitle: {
    ...theme.typography.h2,
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.navy900,
    marginBottom: theme.spacing.sm,
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: theme.spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.md,
  },
  resultLabel: {
    ...theme.typography.body,
    fontSize: 13.5,
    fontWeight: '700',
    color: theme.colors.slate600,
  },
  resultValue: {
    ...theme.typography.h3,
    fontSize: 15,
    fontWeight: '800',
  },
  resultCorrect: {
    color: theme.colors.success,
  },
  resultWrong: {
    color: theme.colors.error600,
  },
  answerBox: {
    width: '100%',
    backgroundColor: theme.colors.blue50,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  answerLabel: {
    ...theme.typography.caption,
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.brandPrimary,
    marginBottom: 2,
  },
  answerText: {
    ...theme.typography.body,
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.navy900,
    marginBottom: 4,
  },
  explanationText: {
    ...theme.typography.caption,
    fontSize: 12.5,
    color: theme.colors.slate600,
    lineHeight: 18,
  },
  feedbackBox: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  feedbackTitle: {
    ...theme.typography.h3,
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 4,
  },
  feedbackCorrect: {
    color: theme.colors.success,
  },
  feedbackWrong: {
    color: theme.colors.error600,
  },
  feedbackExplanation: {
    ...theme.typography.body,
    fontSize: 13,
    color: theme.colors.slate600,
    lineHeight: 19,
    marginBottom: theme.spacing.sm,
  },
  comeBackText: {
    ...theme.typography.caption,
    fontSize: 12.5,
    color: theme.colors.slate500,
    textAlign: 'center',
  },
  secondaryButton: {
    marginTop: theme.spacing.sm,
    height: 48,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButtonText: {
    ...theme.typography.button,
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.navy900,
  },
  emptyIcon: {
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 6,
  },
  emptyTitle: {
    ...theme.typography.h2,
    fontSize: 17,
    fontWeight: '800',
    color: theme.colors.navy900,
    textAlign: 'center',
  },
});