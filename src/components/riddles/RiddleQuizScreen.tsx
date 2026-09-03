/**
 * RiddleQuizScreen Component
 * Full screen coordinator for Screen 22: Riddle Question / Solving Experience.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../../theme';
import { SupportedLanguage, getTranslation } from '../../config/i18n';
import { RiddleDifficulty, RiddleResult } from '../../features/riddles';
import { useRiddleEngine } from '../../features/riddles/useRiddleEngine';
import { RiddleQuizHeader } from './RiddleQuizHeader';
import { RiddleProgress } from './RiddleProgress';
import { RiddleQuestionCard } from './RiddleQuestionCard';
import { RiddleAnswerInput } from './RiddleAnswerInput';
import { RiddleHintCard } from './RiddleHintCard';
import { RiddleFeedback } from './RiddleFeedback';
import { RiddleExitDialog } from './RiddleExitDialog';

interface RiddleQuizScreenProps {
  difficulty?: RiddleDifficulty | string | null;
  language: SupportedLanguage;
  onExitToCategories: () => void;
  onFinishQuiz: (result: RiddleResult) => void;
}

export const RiddleQuizScreen: React.FC<RiddleQuizScreenProps> = ({
  difficulty,
  language,
  onExitToCategories,
  onFinishQuiz,
}) => {
  const insets = useSafeAreaInsets();
  const t = getTranslation(language).riddles;

  const [exitModalVisible, setExitModalVisible] = useState(false);

  const engine = useRiddleEngine({
    difficulty,
    language,
    onComplete: onFinishQuiz,
  });

  // Handle Invalid / Empty state safely
  if (!engine.currentRiddle || engine.totalCount === 0) {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" translucent backgroundColor="transparent" />
        <RiddleQuizHeader
          title={t.headerTitle}
          points={engine.baseCoinBalance}
          onExit={onExitToCategories}
          backLabel={t.back}
          coinLabel={t.accessibility.coinLabel.replace('{points}', String(engine.baseCoinBalance))}
        />
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🧩</Text>
          <Text style={styles.emptyTitle}>{t.noRiddlesTitle}</Text>
          <Text style={styles.emptySubtitle}>{t.noRiddlesDesc}</Text>
          <TouchableOpacity
            style={styles.fallbackButton}
            onPress={onExitToCategories}
            activeOpacity={0.8}
          >
            <Text style={styles.fallbackButtonText}>{t.backToCategories}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const riddleTag = t.riddleNumber.replace('{current}', String(engine.currentIndex + 1));
  const progressText = t.riddleOf
    .replace('{current}', String(engine.currentIndex + 1))
    .replace('{total}', String(engine.totalCount));

  const coinLabel = t.accessibility.coinLabel.replace(
    '{points}',
    String(engine.baseCoinBalance)
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />

      {/* 1. Top Header */}
      <RiddleQuizHeader
        title={t.headerTitle}
        points={engine.baseCoinBalance}
        onExit={() => setExitModalVisible(true)}
        backLabel={t.back}
        coinLabel={coinLabel}
      />

      {/* 2. Progress Tracker */}
      <RiddleProgress
        currentIndex={engine.currentIndex}
        totalCount={engine.totalCount}
        progressText={progressText}
      />

      {/* 3. Main Content with Keyboard Handling */}
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: insets.bottom + theme.spacing.xl },
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Riddle Prompt Card */}
          <RiddleQuestionCard
            riddle={engine.currentRiddle}
            language={language}
            riddleTag={riddleTag}
          />

          {/* Answer Input Section (Hidden/Disabled when answered) */}
          {engine.status === 'unanswered' && (
            <RiddleAnswerInput
              value={engine.inputText}
              onChangeText={engine.setInputText}
              onSubmit={engine.submitAnswer}
              disabled={engine.isQuestionResolved}
              label={t.yourAnswer}
              placeholder={t.typeAnswerPlaceholder}
              buttonLabel={t.checkAnswer}
              inputAccessibilityLabel={t.accessibility.inputLabel}
              buttonAccessibilityHint={t.accessibility.checkHint}
            />
          )}

          {/* Optional Hint Card */}
          <RiddleHintCard
            riddle={engine.currentRiddle}
            hintRevealed={engine.hintRevealed}
            onRevealHint={engine.revealHint}
            language={language}
            t={t}
          />

          {/* Feedback & Result State */}
          <RiddleFeedback
            status={engine.status}
            isExhausted={engine.isExhausted}
            pointsAwarded={engine.pointsAwarded}
            attemptsUsed={engine.attemptsUsed}
            maxAttempts={engine.maxAttempts}
            riddle={engine.currentRiddle}
            isLastRiddle={engine.isLastRiddle}
            language={language}
            onRetry={engine.retryQuestion}
            onNext={engine.nextRiddle}
            t={t}
          />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* 4. Exit Confirmation Dialog */}
      <RiddleExitDialog
        visible={exitModalVisible}
        onCancel={() => setExitModalVisible(false)}
        onConfirmExit={() => {
          setExitModalVisible(false);
          onExitToCategories();
        }}
        title={t.exitTitle}
        message={t.exitMessage}
        cancelLabel={t.cancel}
        exitLabel={t.exit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.pearlWhite,
  },
  keyboardView: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
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
