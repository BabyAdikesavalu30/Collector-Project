/**
 * LessonQuickCheckCoach Component
 * Additive educational feedback wrapper for the existing MicroLessonQuickCheck.
 * BEFORE answering: progressive authored hints (one per tap).
 * AFTER an incorrect answer: IncorrectAnswerCoach with explanation, takeaway,
 * and a guided retry that re-enables the same quick check in place.
 * The completion contract stays untouched: onComplete still fires exactly once,
 * on the first answer, exactly as before. The coach never awards XP and never
 * duplicates completion.
 */

import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { QuickCheckQuestion } from '../../features/micro-lessons/microLessons.types';
import {
  useHintEngine,
  useFeedbackReference,
} from '../../features/feedback/feedback.hooks';
import { useAnswerCoach } from '../../features/feedback/feedback.hooks';
import { FeedbackPanel } from './AnswerFeedbackCard';
import { HintPanel } from './HintPanel';

interface LessonQuickCheckCoachProps {
  /** Lesson id — keys the hint + feedback libraries. */
  lessonId: string;
  question: QuickCheckQuestion;
  onComplete: (isCorrect: boolean) => void;
  language?: SupportedLanguage;
}

interface ResolvedOption {
  id: string;
  text: { en: string; ta: string };
  isCorrect: boolean;
  explanation: { en: string; ta: string };
}

export const LessonQuickCheckCoach: React.FC<LessonQuickCheckCoachProps> = ({
  lessonId,
  question,
  onComplete,
  language = 'en',
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [attemptNumber, setAttemptNumber] = useState(0);
  const [isPracticing, setIsPracticing] = useState(false);

  const feedbackId = useFeedbackReference(lessonId, 'micro_lesson');

  // Hints are keyed by the lesson id (same key as the feedback library).
  const hintEngine = useHintEngine({
    questionKey: lessonId,
    language,
    resetKey: lessonId,
  });

  const options: ResolvedOption[] = useMemo(
    () => question.options as ResolvedOption[],
    [question]
  );

  const selectedOption = options.find((o) => o.id === selectedOptionId) || null;
  const isCorrect = selectedOption?.isCorrect ?? false;

  // Coach resolves only after a wrong answer.
  const coachState = useAnswerCoach({
    feedbackId,
    questionKey: lessonId,
    activityType: 'micro_lesson',
    isCorrect,
    studentAnswer: selectedOption
      ? language === 'ta'
        ? selectedOption.text.ta
        : selectedOption.text.en
      : null,
    correctAnswer: options.find((o) => o.isCorrect)
      ? language === 'ta'
        ? (options.find((o) => o.isCorrect)!.text.ta)
        : (options.find((o) => o.isCorrect)!.text.en)
      : null,
    attemptNumber: Math.max(1, attemptNumber),
    language,
    enabled: hasSubmitted && !isCorrect,
    resetKey: lessonId,
  });

  const handleSelectOption = useCallback(
    (option: ResolvedOption) => {
      if (hasSubmitted) return; // one answer per attempt — rapid-tap safe
      setSelectedOptionId(option.id);
      setHasSubmitted(true);
      setAttemptNumber((prev) => prev + 1);
      // Original contract preserved: fire exactly once, on first answer.
      onComplete(option.isCorrect);
    },
    [hasSubmitted, onComplete]
  );

  // Guided retry: re-enable the same question without any re-completion.
  const handleRetry = useCallback(() => {
    setIsPracticing(true);
    setHasSubmitted(false);
    setSelectedOptionId(null);
    hintEngine.resetHints();
    coachState.resetCoach();
  }, [hintEngine, coachState]);

  const handlePracticeSimilar = useCallback(() => {
    // Parent activities own navigation; the micro lesson simply re-enables
    // the check for in-place practice. No second activity system is created.
    handleRetry();
  }, [handleRetry]);

  const correctOption = options.find((o) => o.isCorrect);

  return (
    <View style={styles.container}>
      {/* Original quick check rendering, with feedback swapped for the coach */}
      <QuickCheckWithFeedback
        question={question}
        options={options}
        selectedOptionId={selectedOptionId}
        hasSubmitted={hasSubmitted}
        language={language}
        onSelect={handleSelectOption}
        showHints={!hasSubmitted && hintEngine.availableHints.length > 0}
        hintPanel={
          !hasSubmitted && hintEngine.availableHints.length > 0 ? (
            <HintPanel
              hints={hintEngine.revealedHints}
              language={language}
              onRevealNext={hintEngine.revealNextHint}
              maxHints={3}
            />
          ) : null
        }
        coachPanel={
          hasSubmitted && !isCorrect ? (
            <FeedbackPanel
              coach={coachState.coach!}
              language={language}
              onRetry={handleRetry}
              onPractice={handlePracticeSimilar}
            />
          ) : null
        }
        correctOptionText={
          correctOption
            ? language === 'ta'
              ? correctOption.text.ta
              : correctOption.text.en
            : ''
        }
      />
    </View>
  );
};

// ─────────── Internal renderer that mirrors the original quick check ───────────

import { QuickCheckOption } from '../../features/micro-lessons/microLessons.types';

interface QuickCheckWithFeedbackProps {
  question: QuickCheckQuestion;
  options: ResolvedOption[];
  selectedOptionId: string | null;
  hasSubmitted: boolean;
  language: SupportedLanguage;
  onSelect: (option: ResolvedOption) => void;
  showHints: boolean;
  hintPanel: React.ReactNode;
  coachPanel: React.ReactNode;
  correctOptionText: string;
}

const OPTION_LETTERS_LOCAL = ['A', 'B', 'C', 'D'];

const QuickCheckWithFeedback: React.FC<QuickCheckWithFeedbackProps> = ({
  question,
  options,
  selectedOptionId,
  hasSubmitted,
  language,
  onSelect,
  showHints,
  hintPanel,
  coachPanel,
  correctOptionText,
}) => {
  const isTamil = language === 'ta';
  const selectedOption = options.find((o) => o.id === selectedOptionId);
  const isSelectedCorrect = selectedOption?.isCorrect ?? false;
  const questionText = isTamil ? question.question.ta : question.question.en;

  return (
    <View
      style={qbStyles.container}
      accessible={true}
      accessibilityRole="none"
      accessibilityLabel={isTamil ? 'விரைவு சோதனை வினா' : 'Quick check question'}
    >
      <View style={qbStyles.headerRow}>
        <Text style={qbStyles.headerIcon}>🎯</Text>
        <Text style={qbStyles.headerTitle}>
          {isTamil ? 'விரைவு சோதனை' : 'QUICK CHECK'}
        </Text>
      </View>

      <Text style={qbStyles.questionText}>{questionText}</Text>

      <View style={qbStyles.optionsList}>
        {options.map((option, idx) => {
          const isSelected = selectedOptionId === option.id;
          const showAsCorrect = hasSubmitted && option.isCorrect;
          const showAsIncorrect = hasSubmitted && isSelected && !option.isCorrect;
          const optionText = isTamil ? option.text.ta : option.text.en;
          const letter = OPTION_LETTERS_LOCAL[idx] || `${idx + 1}`;

          return (
            <TouchableOpacity
              key={option.id}
              style={[
                qbStyles.optionRow,
                isSelected && qbStyles.optionRowSelected,
                showAsCorrect && qbStyles.optionRowCorrect,
                showAsIncorrect && qbStyles.optionRowIncorrect,
              ]}
              onPress={() => onSelect(option)}
              disabled={hasSubmitted}
              activeOpacity={0.8}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={`${letter}. ${optionText}`}
            >
              <View
                style={[
                  qbStyles.letterBadge,
                  isSelected && qbStyles.letterBadgeSelected,
                  showAsCorrect && qbStyles.letterBadgeCorrect,
                  showAsIncorrect && qbStyles.letterBadgeIncorrect,
                ]}
              >
                <Text
                  style={[
                    qbStyles.letterText,
                    (isSelected || showAsCorrect || showAsIncorrect) && qbStyles.letterTextWhite,
                  ]}
                >
                  {letter}
                </Text>
              </View>
              <Text style={[qbStyles.optionText, isSelected && qbStyles.optionTextSelected]}>
                {optionText}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Progressive hints before answering */}
      {showHints && hintPanel}

      {/* Correct: original lightweight positive feedback */}
      {hasSubmitted && isSelectedCorrect && selectedOption && (
        <View style={[qbStyles.feedbackCard, qbStyles.feedbackCorrect]} accessibilityRole="alert">
          <Text style={qbStyles.feedbackTitleCorrect}>
            ✓ {isTamil ? 'அருமை! சரியாகப் புரிந்தீர்கள்.' : 'Nice! You understood it.'}
          </Text>
          <Text style={qbStyles.explanationText}>
            {isTamil ? selectedOption.explanation.ta : selectedOption.explanation.en}
          </Text>
        </View>
      )}

      {/* Incorrect: full coached feedback */}
      {coachPanel}
    </View>
  );
};

const qbStyles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    padding: theme.spacing.md,
    marginVertical: theme.spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: theme.spacing.sm,
  },
  headerIcon: { fontSize: 16 },
  headerTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.actionPrimary,
    letterSpacing: 1,
  },
  questionText: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.navy900,
    lineHeight: 22,
    marginBottom: theme.spacing.md,
  },
  optionsList: { gap: 10 },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 10,
    minHeight: 48,
  },
  optionRowSelected: {
    borderColor: theme.colors.actionPrimary,
    backgroundColor: '#EFF6FF',
  },
  optionRowCorrect: {
    borderColor: '#16A34A',
    backgroundColor: '#F0FDF4',
  },
  optionRowIncorrect: {
    borderColor: theme.colors.purple300,
    backgroundColor: theme.colors.purple50,
  },
  letterBadge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  letterBadgeSelected: { backgroundColor: theme.colors.actionPrimary },
  letterBadgeCorrect: { backgroundColor: '#16A34A' },
  letterBadgeIncorrect: { backgroundColor: theme.colors.purple600 },
  letterText: {
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.navy800,
  },
  letterTextWhite: { color: '#FFFFFF' },
  optionText: {
    fontSize: 13,
    color: theme.colors.navy800,
    lineHeight: 18,
    flex: 1,
    fontWeight: '500',
  },
  optionTextSelected: {
    fontWeight: '700',
    color: theme.colors.navy900,
  },
  feedbackCard: {
    marginTop: theme.spacing.md,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
  },
  feedbackCorrect: {
    backgroundColor: '#F0FDF4',
    borderColor: '#BBF7D0',
  },
  feedbackTitleCorrect: {
    fontSize: 13,
    fontWeight: '700',
    color: '#15803D',
    marginBottom: 4,
  },
  explanationText: {
    fontSize: 12,
    color: theme.colors.slate600,
    lineHeight: 18,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
