/**
 * QuizSetupScreen Component (Screen 18)
 * Full interactive configuration for educational science quizzes.
 * Allows student to select Difficulty, Question count, Timer, and Optional Preferences.
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../../theme';
import { SupportedLanguage, getTranslation } from '../../config/i18n';
import { AppBackButton } from '../navigation';
import {
  QuizContextResolved,
  QuizDifficulty,
  QuizQuestionCount,
  QuizSetupConfig,
  validateQuizConfig,
} from '../../features/quiz';
import { QuizContextCard } from './QuizContextCard';
import { DifficultySelector } from './DifficultySelector';
import { QuestionCountSelector } from './QuestionCountSelector';
import { QuizTimerSetting } from './QuizTimerSetting';
import { QuizPreferenceSection } from './QuizPreferenceSection';
import { QuizSummaryCard } from './QuizSummaryCard';
import { StartQuizButton } from './StartQuizButton';

interface QuizSetupScreenProps {
  context: QuizContextResolved;
  difficulty: QuizDifficulty;
  questionCount: QuizQuestionCount;
  timerEnabled: boolean;
  showExplanation: boolean;
  soundEffects: boolean;
  confirmBeforeFinish: boolean;
  language?: SupportedLanguage;
  onSelectDifficulty: (difficulty: QuizDifficulty) => void;
  onSelectQuestionCount: (count: QuizQuestionCount) => void;
  onToggleTimer: (enabled: boolean) => void;
  onToggleExplanation: (enabled: boolean) => void;
  onToggleSound: (enabled: boolean) => void;
  onToggleConfirm: (enabled: boolean) => void;
  onStartQuiz: (config: QuizSetupConfig) => void;
  onBack: () => void;
}

export const QuizSetupScreen: React.FC<QuizSetupScreenProps> = ({
  context,
  difficulty,
  questionCount,
  timerEnabled,
  showExplanation,
  soundEffects,
  confirmBeforeFinish,
  language = 'en',
  onSelectDifficulty,
  onSelectQuestionCount,
  onToggleTimer,
  onToggleExplanation,
  onToggleSound,
  onToggleConfirm,
  onStartQuiz,
  onBack,
}) => {
  const insets = useSafeAreaInsets();
  const t = getTranslation(language).quizSetup;

  const currentConfig: QuizSetupConfig = {
    levelId: context.levelId,
    subjectId: context.subjectId,
    pathwayId: context.pathwayId,
    difficulty,
    questionCount,
    timerEnabled,
    secondsPerQuestion: 60,
    showExplanation,
    soundEffects,
    confirmBeforeFinish,
  };

  const isConfigValid = context.isValid && validateQuizConfig(currentConfig);

  const handleStart = () => {
    if (isConfigValid) {
      onStartQuiz(currentConfig);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />

      {/* Screen Header */}
      <View
        style={[
          styles.header,
          {
            paddingTop: Math.max(insets.top, Platform.OS === 'android' ? 24 : 16),
          },
        ]}
      >
        <AppBackButton
          onPress={onBack}
          language={language}
          accessibilityLabel={language === 'ta' ? 'பின்செல்க' : 'Back'}
          accessibilityHint={t.accessibility.backHint}
          style={styles.backButton}
        />

        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {t.headerTitle}
          </Text>
        </View>

        <View style={styles.headerRightPlaceholder} />
      </View>

      {/* Main Content Body */}
      {context.isValid ? (
        <ScrollView
          style={styles.scrollBody}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: Math.max(insets.bottom, 24) + 16 },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Top Context Summary */}
          <QuizContextCard context={context} />

          {/* Intro Heading */}
          <View style={styles.introContainer}>
            <Text style={styles.introTitle}>{t.introTitle}</Text>
            <Text style={styles.introSubtitle}>{t.introSubtitle}</Text>
          </View>

          {/* 1. Difficulty Selector */}
          <DifficultySelector
            selectedDifficulty={difficulty}
            onSelectDifficulty={onSelectDifficulty}
            language={language}
          />

          {/* 2. Question Count Selector */}
          <QuestionCountSelector
            selectedCount={questionCount}
            onSelectCount={onSelectQuestionCount}
            language={language}
          />

          {/* 3. Quiz Timer */}
          <QuizTimerSetting
            timerEnabled={timerEnabled}
            onToggleTimer={onToggleTimer}
            language={language}
          />

          {/* 4. Optional Preferences */}
          <QuizPreferenceSection
            showExplanation={showExplanation}
            soundEffects={soundEffects}
            confirmBeforeFinish={confirmBeforeFinish}
            onToggleExplanation={onToggleExplanation}
            onToggleSound={onToggleSound}
            onToggleConfirm={onToggleConfirm}
            language={language}
          />

          {/* 5. Concise Quiz Summary */}
          <QuizSummaryCard
            subjectTitle={context.subjectTitle}
            pathwayTitle={context.pathwayTitle}
            difficulty={difficulty}
            questionCount={questionCount}
            timerEnabled={timerEnabled}
            language={language}
          />

          {/* 6. Primary Action CTA */}
          <StartQuizButton
            onPress={handleStart}
            disabled={!isConfigValid}
            language={language}
          />
        </ScrollView>
      ) : (
        /* Fallback Safe State when pathway is missing or invalid */
        <View style={styles.fallbackContainer}>
          <View style={styles.fallbackCard}>
            <Text style={styles.fallbackIcon}>⚠️</Text>
            <Text style={styles.fallbackTitle}>{t.learningPathUnavailable}</Text>
            <Text style={styles.fallbackDescription}>{t.learningPathUnavailableSub}</Text>

            <TouchableOpacity
              style={styles.fallbackButton}
              onPress={onBack}
              activeOpacity={0.8}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={t.backToLearning}
            >
              <Text style={styles.fallbackButtonText}>{`← ${t.backToLearning}`}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
    paddingHorizontal: theme.spacing.base,
    paddingBottom: theme.spacing.sm,
    backgroundColor: theme.colors.pearlWhite,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  backButton: {
    minWidth: 44,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  backButtonGlyph: {
    fontSize: 22,
    fontWeight: '700',
    color: theme.colors.navy900,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    ...theme.typography.h2,
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.navy900,
  },
  headerRightPlaceholder: {
    minWidth: 44,
  },
  scrollBody: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.base,
    paddingTop: theme.spacing.base,
  },
  introContainer: {
    marginBottom: theme.spacing.lg,
  },
  introTitle: {
    ...theme.typography.h2,
    fontSize: 22,
    lineHeight: 28,
    color: theme.colors.navy900,
    fontWeight: '800',
    marginBottom: 4,
  },
  introSubtitle: {
    ...theme.typography.body,
    fontSize: 14,
    lineHeight: 20,
    color: theme.colors.slate600,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  fallbackCard: {
    width: '100%',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.xl,
    alignItems: 'center',
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  fallbackIcon: {
    fontSize: 36,
    marginBottom: theme.spacing.sm,
  },
  fallbackTitle: {
    ...theme.typography.h2,
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.navy900,
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
  },
  fallbackDescription: {
    ...theme.typography.body,
    fontSize: 13.5,
    lineHeight: 20,
    color: theme.colors.slate600,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
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
