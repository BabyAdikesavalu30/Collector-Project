/**
 * AnswerFeedbackCard / CorrectAnswerFeedback / IncorrectAnswerCoach / FeedbackPanel
 * The complete coached feedback experience:
 *   NOT QUITE → Your answer → Correct answer → WHY? → REMEMBER → Try Again
 * Progressive disclosure keeps the first screen calm; severity tones are
 * educational (purple/blue), never alarm-red. The component awards no XP and
 * owns no navigation — parents handle retry/continue/practice.
 */

import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, AccessibilityInfo } from 'react-native';
import { theme } from '../../theme';
import { SupportedLanguage } from '../../config/i18n';
import { CoachResult, FeedbackHint } from '../../features/feedback/feedback.types';
import { getFeedbackSeverityTone, isPresentableAnswer } from '../../features/feedback/feedback.utils';
import { getFeedbackI18n, interpolate } from './feedback.i18n';
import { LearningTakeawayCard } from './LearningTakeawayCard';
import { ExplanationAccordion } from './ExplanationAccordion';
import { RetryPrompt, SimilarQuestionCard } from './RetryPrompt';
import { HintPanel } from './HintPanel';

// ─────────────────────── CorrectAnswerFeedback ───────────────────────

interface CorrectAnswerFeedbackProps {
  coach: CoachResult;
  language: SupportedLanguage;
  /** XP display only — the parent activity already awarded it. */
  xpEarned?: number;
  onContinue?: () => void;
}

export const CorrectAnswerFeedback: React.FC<CorrectAnswerFeedbackProps> = ({
  coach,
  language,
  xpEarned,
  onContinue,
}) => {
  const t = getFeedbackI18n(language);
  const tone = getFeedbackSeverityTone('correct');

  return (
    <View style={[styles.container, { backgroundColor: tone.background, borderColor: tone.border }]}>
      <View style={styles.headerRow}>
        <Text style={[styles.headerIcon, { color: tone.title }]}>✓</Text>
        <Text style={[styles.headerTitle, { color: tone.title }]}>{t.niceWork}</Text>
      </View>

      <Text style={styles.bodyText}>{t.wellUnderstood}</Text>

      {coach.takeaway && <LearningTakeawayCard takeaway={coach.takeaway} language={language} />}

      {typeof xpEarned === 'number' && xpEarned > 0 && (
        <View style={styles.xpBadge}>
          <Text style={styles.xpText}>+{xpEarned} XP</Text>
        </View>
      )}

      {onContinue && (
        <TouchableOpacity
          style={styles.continueButton}
          onPress={onContinue}
          activeOpacity={0.85}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={t.continue}
        >
          <Text style={styles.continueText}>{t.continue}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// ─────────────────────── IncorrectAnswerCoach ───────────────────────

interface IncorrectAnswerCoachProps {
  coach: CoachResult;
  language: SupportedLanguage;
  /** Revealed hints to render inside the coach (level order). */
  hints?: FeedbackHint[];
  onRevealNextHint?: () => void;
  maxHints?: number;
  onRetry?: () => void;
  onPractice?: () => void;
}

export const IncorrectAnswerCoach: React.FC<IncorrectAnswerCoachProps> = ({
  coach,
  language,
  hints = [],
  onRevealNextHint,
  maxHints = 3,
  onRetry,
  onPractice,
}) => {
  const t = getFeedbackI18n(language);
  const tone = getFeedbackSeverityTone(coach.result);
  const announcedRef = useRef(false);

  // Screen-reader announcement — fired once per coach instance.
  useEffect(() => {
    if (announcedRef.current) return;
    announcedRef.current = true;
    const template = t.accessibility.feedbackAlert;
    const message = interpolate(template, {
      student: coach.studentAnswer || t.unanswered,
      correct: coach.correctAnswer || '—',
    });
    AccessibilityInfo.announceForAccessibility(message);
  }, [coach, t]);

  const showAnswers =
    isPresentableAnswer(coach.studentAnswer) || isPresentableAnswer(coach.correctAnswer);

  return (
    <View style={[styles.container, { backgroundColor: tone.background, borderColor: tone.border }]}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.headerIconCalm}>{tone.icon}</Text>
        <View style={styles.headerTitleGroup}>
          <Text style={[styles.headerTitle, { color: tone.title }]}>{coach.greeting}</Text>
          <Text style={styles.headerSubtitle}>{t.letsUnderstand}</Text>
        </View>
      </View>

      {/* Answers (only when both sides are presentable) */}
      {showAnswers && (
        <View style={styles.answersBlock}>
          {isPresentableAnswer(coach.studentAnswer) && (
            <View style={styles.answerRow}>
              <Text style={styles.answerLabel}>{t.yourAnswer}:</Text>
              <Text style={styles.answerValueStudent} numberOfLines={3}>
                {coach.studentAnswer}
              </Text>
            </View>
          )}
          {isPresentableAnswer(coach.correctAnswer) && (
            <View style={[styles.answerRow, styles.answerRowCorrect]}>
              <Text style={styles.answerLabel}>{t.correctAnswer}:</Text>
              <Text style={styles.answerValueCorrect} numberOfLines={3}>
                {coach.correctAnswer}
              </Text>
            </View>
          )}
        </View>
      )}

      {/* Progressive WHY? disclosure */}
      {Boolean(coach.explanation) && (
        <ExplanationAccordion
          explanation={coach.explanation}
          language={language}
          defaultOpen={coach.attemptNumber >= 2}
        />
      )}

      {/* Learning takeaway */}
      {coach.takeaway && <LearningTakeawayCard takeaway={coach.takeaway} language={language} />}

      {/* Attempt-aware hint (attempt 2+) */}
      {Boolean(coach.hint) && (
        <View style={styles.coachHintBox}>
          <Text style={styles.coachHintLabel}>💡 {t.hint}</Text>
          <Text style={styles.coachHintText}>{coach.hint}</Text>
        </View>
      )}

      {/* Progressive hints (before retry, authored levels) */}
      {hints.length > 0 && onRevealNextHint && (
        <HintPanel
          hints={hints}
          language={language}
          onRevealNext={onRevealNextHint}
          maxHints={maxHints}
        />
      )}

      {/* Actions — parent owns the actual navigation/retry */}
      <View style={styles.actionsRow}>
        {coach.retryAvailable && onRetry && (
          <RetryPrompt onRetry={onRetry} language={language} />
        )}
        {coach.similarQuestionAvailable && onPractice && (
          <SimilarQuestionCard onPractice={onPractice} language={language} />
        )}
      </View>
    </View>
  );
};

// ───────────────────────── FeedbackPanel ─────────────────────────

interface FeedbackPanelProps {
  coach: CoachResult;
  language: SupportedLanguage;
  hints?: FeedbackHint[];
  onRevealNextHint?: () => void;
  maxHints?: number;
  onRetry?: () => void;
  onPractice?: () => void;
  onContinue?: () => void;
  xpEarned?: number;
}

/**
 * Inline feedback panel: picks the correct variant from the coach result.
 * Inline by default; a parent that already uses modal feedback can host
 * this same component inside its modal.
 */
export const FeedbackPanel: React.FC<FeedbackPanelProps> = (props) => {
  const { coach, language } = props;
  if (coach.result === 'correct') {
    return (
      <CorrectAnswerFeedback
        coach={coach}
        language={language}
        xpEarned={props.xpEarned}
        onContinue={props.onContinue}
      />
    );
  }
  return (
    <IncorrectAnswerCoach
      coach={coach}
      language={language}
      hints={props.hints}
      onRevealNextHint={props.onRevealNextHint}
      maxHints={props.maxHints}
      onRetry={props.onRetry}
      onPractice={props.onPractice}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1.5,
    padding: theme.spacing.md,
    marginTop: theme.spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: theme.spacing.sm,
  },
  headerIcon: {
    fontSize: 22,
    fontWeight: '900',
  },
  headerIconCalm: {
    fontSize: 18,
  },
  headerTitleGroup: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  headerSubtitle: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.slate600,
    marginTop: 1,
  },
  bodyText: {
    fontSize: 13.5,
    color: theme.colors.navy800,
    lineHeight: 20,
    marginBottom: theme.spacing.xs,
  },
  answersBlock: {
    gap: 6,
    marginBottom: theme.spacing.sm,
  },
  answerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.purple200,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
    gap: 8,
  },
  answerRowCorrect: {
    borderColor: theme.colors.green200,
    backgroundColor: theme.colors.white,
  },
  answerLabel: {
    fontSize: 11.5,
    fontWeight: '700',
    color: theme.colors.slate600,
    textTransform: 'uppercase',
    marginTop: 1,
  },
  answerValueStudent: {
    flex: 1,
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.purple700,
    lineHeight: 18,
  },
  answerValueCorrect: {
    flex: 1,
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.green700,
    lineHeight: 18,
  },
  coachHintBox: {
    backgroundColor: theme.colors.purple50,
    borderWidth: 1,
    borderColor: theme.colors.purple200,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm + 2,
    marginTop: theme.spacing.sm,
  },
  coachHintLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.purple700,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  coachHintText: {
    fontSize: 13,
    color: theme.colors.navy900,
    lineHeight: 19,
  },
  actionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.md,
  },
  xpBadge: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.green100,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
    marginTop: theme.spacing.xs,
  },
  xpText: {
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.green700,
  },
  continueButton: {
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.success,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.sm + 2,
    marginTop: theme.spacing.sm,
  },
  continueText: {
    fontSize: 14,
    fontWeight: '800',
    color: theme.colors.textOnAction,
  },
});
