/**
 * Gravity Path Game Screen (/games/gravity-path)
 * Game 16: Slide experimental particles with directional gravity shifts.
 */

import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../../src/theme';
import { storage, STORAGE_KEYS } from '../../src/storage/asyncStorage';
import { SupportedLanguage, getTranslation } from '../../src/config/i18n';
import { useGravityPathGame } from '../../src/features/games/gravity-path';
import { getGameProgress } from '../../src/features/games/games.storage';
import { GameProgress } from '../../src/features/games/games.types';
import {
  GameHeader,
  GravityPathBoard,
  LevelSelectModal,
  HowToPlayModal,
  GameCompletionModal,
  GameExitDialog,
} from '../../src/components/games';

export default function GravityPathGameRoute() {
  const router = useRouter();
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [showHowToPlay, setShowHowToPlay] = useState<boolean>(false);
  const [showLevelSelect, setShowLevelSelect] = useState<boolean>(false);
  const [showExitDialog, setShowExitDialog] = useState<boolean>(false);
  const [progress, setProgress] = useState<GameProgress | undefined>(undefined);

  const loadProgress = useCallback(async () => {
    const p = await getGameProgress('gravity-path');
    setProgress(p);
  }, []);

  useEffect(() => {
    (async () => {
      const stored = await storage.getItem<SupportedLanguage>(STORAGE_KEYS.USER_LANGUAGE);
      if (stored === 'en' || stored === 'ta') setLanguage(stored);
      await loadProgress();
    })();
  }, [loadProgress]);

  const t = getTranslation(language).games;
  const gameT = t.gravityPath;

  const {
    level,
    levelIndex,
    currentPos,
    remainingMoves,
    status,
    moves,
    score,
    stars,
    isCompleted,
    isFailed,
    totalLevels,
    handleApplyGravity,
    handleTimeUpdate,
    resetGame,
    nextLevel,
    loadLevel,
  } = useGravityPathGame();

  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  const onTimeUpdate = useCallback(
    (secs: number) => {
      setElapsedSeconds(secs);
      handleTimeUpdate(secs);
    },
    [handleTimeUpdate]
  );

  const handleReset = useCallback(() => {
    setElapsedSeconds(0);
    resetGame();
  }, [resetGame]);

  const handleLoadLevel = useCallback(
    (idx: number) => {
      setElapsedSeconds(0);
      loadLevel(idx);
    },
    [loadLevel]
  );

  const handleNextLevel = useCallback(() => {
    setElapsedSeconds(0);
    nextLevel();
    loadProgress();
  }, [nextLevel, loadProgress]);

  const handleBack = useCallback(() => {
    if (moves > 0 && !isCompleted) {
      setShowExitDialog(true);
    } else {
      router.back();
    }
  }, [moves, isCompleted, router]);

  const handleConfirmExit = useCallback(() => {
    setShowExitDialog(false);
    router.back();
  }, [router]);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />

      {/* Game Header */}
      <GameHeader
        title={gameT.title}
        levelName={level.name}
        isTimerActive={status === 'playing'}
        onTimeUpdate={onTimeUpdate}
        onBack={handleBack}
        onHowToPlay={() => setShowHowToPlay(true)}
        onReset={handleReset}
        onOpenLevelSelect={() => setShowLevelSelect(true)}
        howToPlayLabel={t.howToPlay}
        resetLabel={t.reset}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <GravityPathBoard
          level={level}
          currentPos={currentPos}
          remainingMoves={remainingMoves}
          onApplyGravity={handleApplyGravity}
          language={language}
          movesLeftLabel={gameT.movesLeft}
        />
      </ScrollView>

      {/* Level Select Modal */}
      <LevelSelectModal
        visible={showLevelSelect}
        gameTitle={gameT.title}
        totalLevels={totalLevels}
        currentLevelIndex={levelIndex}
        progress={progress}
        onSelectLevel={handleLoadLevel}
        onClose={() => {
          setShowLevelSelect(false);
          loadProgress();
        }}
      />

      {/* How to Play Modal */}
      <HowToPlayModal
        visible={showHowToPlay}
        gameTitle={gameT.title}
        goal={gameT.goal}
        rules={gameT.rules}
        controls={gameT.controls}
        onClose={() => setShowHowToPlay(false)}
        closeLabel={t.gotIt}
        howToPlayTitle={t.howToPlay}
        goalTitle={t.goal}
        rulesTitle={t.rules}
        controlsTitle={t.controls}
      />

      {/* Completion Modal */}
      <GameCompletionModal
        visible={isCompleted}
        title={t.puzzleComplete}
        subtitle={t.winSubtitle}
        levelName={level.name}
        elapsedSeconds={elapsedSeconds}
        moves={moves}
        stars={stars}
        score={score}
        hasNextLevel={levelIndex < totalLevels - 1}
        onNextLevel={handleNextLevel}
        onReplay={handleReset}
        onBackToGames={() => router.back()}
        nextLevelLabel={t.nextLevel}
        replayLabel={t.replay}
        backToGamesLabel={t.backToGames}
        timeLabel={t.time}
        movesLabel={t.moves}
      />

      {/* Exit Confirmation Dialog */}
      <GameExitDialog
        visible={showExitDialog}
        onStay={() => setShowExitDialog(false)}
        onLeave={handleConfirmExit}
        title={t.leaveGame}
        message={t.leaveGameMessage}
        stayLabel={t.stay}
        leaveLabel={t.leave}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.pearlWhite,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: theme.spacing.lg,
    alignItems: 'center',
  },
});
