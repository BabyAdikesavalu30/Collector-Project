/**
 * QuizResultScreen Component
 * Full screen coordinator for Screen 20: Quiz Results.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../../theme';
import { SupportedLanguage, getTranslation } from '../../config/i18n';
import { AppBackButton } from '../navigation';
import { QuizResult, resolveQuizContext } from '../../features/quiz';
import { ScoreRing } from './ScoreRing';
import { PerformanceMessage } from './PerformanceMessage';
import { ResultStatsGrid } from './ResultStatsGrid';
import { PointsSummary } from './PointsSummary';
import { QuizContextSummary } from './QuizContextSummary';

interface QuizResultScreenProps {
  result: QuizResult | null;
  studentName?: string | null;
  language: SupportedLanguage;
  onReviewAnswers: () => void;
  onBackToHome: () => void;
  onContinueLearning: () => void;
}

export const QuizResultScreen: React.FC<QuizResultScreenProps> = ({
  result,
  studentName,
  language,
  onReviewAnswers,
  onBackToHome,
  onContinueLearning,
}) => {
  const insets = useSafeAreaInsets();
  const t = getTranslation(language).quizResult;

  if (!result) {
    return (
      <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <StatusBar style="dark" translucent backgroundColor="transparent" />
        <View style={styles.fallbackCard}>
          <Text style={styles.fallbackIcon}>📊</Text>
          <Text style={styles.fallbackTitle}>{t.resultUnavailable}</Text>
          <Text style={styles.fallbackSub}>{t.resultUnavailableSub}</Text>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={onBackToHome}
            activeOpacity={0.8}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={t.backToHome}
          >
            <Text style={styles.primaryButtonText}>{t.backToHome}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const context = resolveQuizContext(
    result.config.levelId,
    result.config.subjectId,
    result.config.pathwayId
  );

  const scoreLabel = t.accessibility.scoreLabel.replace(
    '{percentage}',
    String(result.percentage)
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />

      {/* Screen Header */}
      <View style={[styles.header, { paddingTop: insets.top + theme.spacing.sm }]}>
        <AppBackButton
          onPress={onBackToHome}
          language={language}
          accessibilityLabel={t.backToHome}
          accessibilityHint={t.accessibility.homeHint}
          style={styles.backButton}
        />

        <Text style={styles.headerTitle}>{t.headerTitle}</Text>

        {/* Balance layout spacer */}
        <View style={styles.headerSpacer} />
      </View>

      {/* Scrollable Body */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + theme.spacing.xl },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Score Ring */}
        <ScoreRing percentage={result.percentage} accessibilityLabel={scoreLabel} />

        {/* 2. Performance Message */}
        <PerformanceMessage
          percentage={result.percentage}
          studentName={studentName}
          t={t}
        />

        {/* 3. Stats Grid */}
        <ResultStatsGrid
          total={result.totalQuestions}
          correct={result.correctAnswers}
          wrong={result.wrongAnswers}
          unanswered={result.unansweredQuestions}
          t={t}
        />

        {/* 4. Points & Best Streak */}
        <PointsSummary
          score={result.score}
          bestStreak={result.bestStreak}
          t={t}
        />

        {/* 5. Educational Context */}
        <QuizContextSummary
          context={context}
          difficulty={result.config.difficulty}
          totalQuestions={result.totalQuestions}
        />

        {/* 6. Action Buttons */}
        <View style={styles.actionGroup}>
          {/* Primary: Review Answers */}
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={onReviewAnswers}
            activeOpacity={0.8}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={t.reviewAnswers}
            accessibilityHint={t.accessibility.reviewHint}
          >
            <Text style={styles.primaryButtonText}>{t.reviewAnswers}</Text>
          </TouchableOpacity>

          {/* Secondary: Back to Home */}
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={onBackToHome}
            activeOpacity={0.8}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={t.backToHome}
            accessibilityHint={t.accessibility.homeHint}
          >
            <Text style={styles.secondaryButtonText}>{t.backToHome}</Text>
          </TouchableOpacity>

          {/* Tertiary: Continue Learning */}
          <TouchableOpacity
            style={styles.tertiaryButton}
            onPress={onContinueLearning}
            activeOpacity={0.7}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={t.continueLearning}
            accessibilityHint={t.accessibility.continueHint}
          >
            <Text style={styles.tertiaryButtonText}>{t.continueLearning}</Text>
          </TouchableOpacity>
        </View>
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
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.navy900,
  },
  headerSpacer: {
    width: 44,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    alignItems: 'center',
  },
  actionGroup: {
    width: '100%',
    marginTop: theme.spacing.xs,
  },
  primaryButton: {
    width: '100%',
    height: 50,
    backgroundColor: theme.colors.actionPrimary,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
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
  secondaryButton: {
    width: '100%',
    height: 48,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  secondaryButtonText: {
    ...theme.typography.button,
    color: theme.colors.navy900,
    fontSize: 14,
    fontWeight: '700',
  },
  tertiaryButton: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tertiaryButtonText: {
    ...theme.typography.caption,
    color: theme.colors.brandPrimary,
    fontSize: 13,
    fontWeight: '700',
  },
  fallbackCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  fallbackIcon: {
    fontSize: 48,
    marginBottom: theme.spacing.md,
  },
  fallbackTitle: {
    ...theme.typography.h2,
    fontSize: 20,
    fontWeight: '800',
    color: theme.colors.navy900,
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
  },
  fallbackSub: {
    ...theme.typography.body,
    fontSize: 14,
    color: theme.colors.slate600,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
});
