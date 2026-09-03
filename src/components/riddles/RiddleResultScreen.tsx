/**
 * RiddleResultScreen Component
 * Full screen coordinator for Screen 23: Riddle Results.
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../../theme';
import { SupportedLanguage, getTranslation } from '../../config/i18n';
import { RiddleResult, getRiddlePerformanceTier } from '../../features/riddles';
import { RiddleResultHeader } from './RiddleResultHeader';
import { RiddleScoreRing } from './RiddleScoreRing';
import { RiddlePerformanceMessage } from './RiddlePerformanceMessage';
import { RiddleResultStats } from './RiddleResultStats';
import { RiddleDifficultySummary } from './RiddleDifficultySummary';
import { RiddleResultActions } from './RiddleResultActions';

interface RiddleResultScreenProps {
  result: RiddleResult | null;
  language: SupportedLanguage;
  onPlayAgain: () => void;
  onBackToRiddles: () => void;
  onBackToHome: () => void;
}

export const RiddleResultScreen: React.FC<RiddleResultScreenProps> = ({
  result,
  language,
  onPlayAgain,
  onBackToRiddles,
  onBackToHome,
}) => {
  const insets = useSafeAreaInsets();
  const t = getTranslation(language).riddles;

  // 1. Safe Fallback if result is missing/invalid
  if (!result) {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" translucent backgroundColor="transparent" />
        <RiddleResultHeader
          title={t.resultsHeaderTitle}
          onBack={onBackToRiddles}
          backLabel={t.back}
        />
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🧩</Text>
          <Text style={styles.emptyTitle}>{t.resultUnavailableTitle}</Text>
          <Text style={styles.emptySubtitle}>{t.resultUnavailableDesc}</Text>
          <TouchableOpacity
            style={styles.fallbackButton}
            onPress={onBackToRiddles}
            activeOpacity={0.8}
          >
            <Text style={styles.fallbackButtonText}>{t.backToRiddles}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const tier = getRiddlePerformanceTier(result.solvedRiddles, result.totalRiddles);
  const isPerfect = result.solvedRiddles === result.totalRiddles;

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />

      {/* Header */}
      <RiddleResultHeader
        title={t.resultsHeaderTitle}
        onBack={onBackToRiddles}
        backLabel={t.back}
      />

      {/* Scrollable Results Body */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + theme.spacing.xl },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Score Ring */}
        <RiddleScoreRing
          score={result.score}
          pointsLabel={t.pointsWord}
          isPerfect={isPerfect}
        />

        {/* Performance Message & Solved Count */}
        <RiddlePerformanceMessage
          tier={tier}
          solvedRiddles={result.solvedRiddles}
          totalRiddles={result.totalRiddles}
          skippedRiddles={result.skippedRiddles}
          t={t}
        />

        {/* 2x2 Metric Stats Grid */}
        <RiddleResultStats
          solvedRiddles={result.solvedRiddles}
          totalRiddles={result.totalRiddles}
          score={result.score}
          bestStreak={result.bestStreak}
          hintsUsed={result.hintsUsed}
          t={t}
        />

        {/* Challenge Level Badge */}
        <RiddleDifficultySummary
          difficulty={result.difficulty}
          language={language}
          label={t.difficultyLabel}
        />

        {/* Next Action Buttons */}
        <RiddleResultActions
          onPlayAgain={onPlayAgain}
          onBackToRiddles={onBackToRiddles}
          onBackToHome={onBackToHome}
          playAgainLabel={t.playAgain}
          backToRiddlesLabel={t.backToRiddles}
          backToHomeLabel={t.backToHome}
          playAgainHint={t.accessibility.playAgainHint}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.pearlWhite,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.sm,
    alignItems: 'center',
  },
  emptyContainer: {
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
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
  },
  emptySubtitle: {
    ...theme.typography.body,
    fontSize: 14,
    color: theme.colors.slate600,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
    lineHeight: 20,
  },
  fallbackButton: {
    backgroundColor: theme.colors.actionPrimary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: theme.borderRadius.md,
  },
  fallbackButtonText: {
    ...theme.typography.button,
    color: theme.colors.textOnAction,
    fontSize: 14,
    fontWeight: '800',
  },
});
