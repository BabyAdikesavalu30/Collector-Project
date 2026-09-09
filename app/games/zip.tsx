/**
 * Zip Game Screen (/games/zip)
 * Game 1: Complete the path with 15 levels and level selection.
 */

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../../src/theme';
import { getTranslation } from '../../src/config/i18n';
import { useLanguage } from '../../src/context';
import { useZipGame } from '../../src/features/games/zip';
import { getGameProgress } from '../../src/features/games/games.storage';
import { GameProgress } from '../../src/features/games/games.types';
import {
  GameHeader,
  ZipBoard,
  LevelSelectModal,
  HowToPlayModal,
  GameCompletionModal,
  GameExitDialog,
} from '../../src/components/games';

export default function ZipGameRoute() {
  const router = useRouter();
  const { language } = useLanguage();
  const [showHowToPlay, setShowHowToPlay] = useState<boolean>(false);
  const [showLevelSelect, setShowLevelSelect] = useState<boolean>(false);
  const [showExitDialog, setShowExitDialog] = useState<boolean>(false);
  const [progress, setProgress] = useState<GameProgress | undefined>(undefined);

  const loadProgress = useCallback(async () => {
    const p = await getGameProgress('zip');
    setProgress(p);
  }, []);

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  const t = getTranslation(language).games;
  const gameT = t.zip;

  const {
    level,
    levelIndex,
    path,
    status,
    moves,
    isCompleted,
    totalLevels,
    handleCellPress,
    handleTimeUpdate,
    resetGame,
    nextLevel,
    loadLevel,
  } = useZipGame();

  const elapsedSecondsRef = useRef<number>(0);
  const [finalElapsedSeconds, setFinalElapsedSeconds] = useState<number>(0);

  const onTimeUpdate = useCallback(
    (secs: number) => {
      elapsedSecondsRef.current = secs;
      handleTimeUpdate(secs);
    },
    [handleTimeUpdate]
  );

  useEffect(() => {
    if (isCompleted) {
      setFinalElapsedSeconds(elapsedSecondsRef.current);
    }
  }, [isCompleted]);

  const handleReset = useCallback(() => {
    elapsedSecondsRef.current = 0;
    setFinalElapsedSeconds(0);
    resetGame();
  }, [resetGame]);

  const handleLoadLevel = useCallback(
    (idx: number) => {
      elapsedSecondsRef.current = 0;
      setFinalElapsedSeconds(0);
      loadLevel(idx);
    },
    [loadLevel]
  );

  const handleNextLevel = useCallback(() => {
    elapsedSecondsRef.current = 0;
    setFinalElapsedSeconds(0);
    nextLevel();
    loadProgress();
  }, [nextLevel, loadProgress]);

  const handleBack = useCallback(() => {
    if (path.length > 1 && !isCompleted) {
      setShowExitDialog(true);
    } else {
      router.back();
    }
  }, [path.length, isCompleted, router]);

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
        <ZipBoard
          level={level}
          path={path}
          onCellPress={handleCellPress}
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
        title={t.pathComplete}
        subtitle={t.winSubtitle}
        levelName={level.name}
        elapsedSeconds={finalElapsedSeconds}
        moves={moves}
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
