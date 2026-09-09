/**
 * SpinWheelScreen Component
 * Screen coordinator for Screen 24: Daily Spin Wheel.
 */

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../../theme';
import { SupportedLanguage, getTranslation } from '../../config/i18n';
import { useSpinWheel } from '../../features/spin-wheel';
import { SpinWheelHeader } from './SpinWheelHeader';
import { SpinWheelStatus } from './SpinWheelStatus';
import { SpinPointer } from './SpinPointer';
import { SpinWheel } from './SpinWheel';
import { SpinQuestionCard } from './SpinQuestionCard';
import { SpinOutcomeCard } from './SpinOutcomeCard';
import { SpinFeedback } from './SpinFeedback';
import { SpinCompletionCard } from './SpinCompletionCard';

interface SpinWheelScreenProps {
  language: SupportedLanguage;
  userPoints?: number;
  onBackToGames: () => void;
  onBackToHome: () => void;
}

export const SpinWheelScreen: React.FC<SpinWheelScreenProps> = ({
  language,
  userPoints = 0,
  onBackToGames,
  onBackToHome,
}) => {
  const insets = useSafeAreaInsets();
  const t = getTranslation(language).spinWheel;

  const {
    state,
    outcome,
    rotationAnim,
    selectedOptionId,
    answeredCorrectly,
    pointsEarned,
    isDailyCompleted,
    spinWheel,
    selectOption,
    submitAnswer,
    acknowledgeReward,
    finishSession,
  } = useSpinWheel();

  const isSpinning = state === 'spinning';
  const isWheelDisabled = isSpinning || isDailyCompleted || state !== 'ready';

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />

      {/* Header */}
      <SpinWheelHeader
        title={t.title}
        points={userPoints + pointsEarned}
        onBack={onBackToGames}
        backLabel={t.back}
        coinLabel={t.accessibility.coinLabel}
      />

      {/* Scrollable Body */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + theme.spacing.xl },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Daily Status Banner */}
        <SpinWheelStatus
          title={t.todaysSpin}
          subtitle={t.todaysSpinDesc}
          isCompleted={isDailyCompleted}
          availableLabel={t.availableBadge}
          completedLabel={t.completedBadge}
        />

        {/* Wheel Assembly */}
        <View style={styles.wheelAssembly}>
          <SpinPointer />
          <SpinWheel
            rotationAnim={rotationAnim}
            language={language}
            isSpinning={isSpinning}
            disabled={isWheelDisabled}
            onSpinPress={() => spinWheel()}
            spinButtonLabel={t.spinButton}
            spinHint={t.accessibility.spinHint}
          />
        </View>

        {/* Dynamic Lower Stage Area */}
        <View style={styles.stageArea}>
          {/* STATE C: Challenge */}
          {state === 'challenge' && outcome && (
            <>
              {outcome.payload.type === 'question' && (
                <SpinQuestionCard
                  question={outcome.payload.data}
                  language={language}
                  selectedOptionId={selectedOptionId}
                  onSelectOption={selectOption}
                  onSubmit={submitAnswer}
                  submitLabel={t.checkAnswer}
                />
              )}

              {(outcome.payload.type === 'fact' ||
                outcome.payload.type === 'bonus') && (
                <SpinOutcomeCard
                  payload={outcome.payload}
                  language={language}
                  onContinue={acknowledgeReward}
                  continueLabel={t.continue}
                />
              )}
            </>
          )}

          {/* STATE D: Answer Feedback */}
          {state === 'feedback' && outcome && outcome.payload.type === 'question' && (
            <SpinFeedback
              isCorrect={Boolean(answeredCorrectly)}
              question={outcome.payload.data}
              pointsEarned={pointsEarned}
              language={language}
              onDone={finishSession}
              t={t}
            />
          )}

          {/* STATE E: Completed */}
          {state === 'completed' && (
            <SpinCompletionCard
              pointsEarned={pointsEarned}
              onBackToGames={onBackToGames}
              onBackToHome={onBackToHome}
              t={t}
            />
          )}
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
  scroll: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
  },
  wheelAssembly: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.xs,
  },
  stageArea: {
    width: '100%',
    paddingHorizontal: theme.spacing.lg,
  },
});
