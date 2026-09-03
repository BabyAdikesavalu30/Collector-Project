/**
 * GamesHubScreen Component
 * Coordinator for Screen 25: Vigyaan Games Universe Hub (/games) with real persistence & progress.
 */

import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../theme';
import { SupportedLanguage, getTranslation } from '../../config/i18n';
import {
  GameDefinition,
  GameCategory,
  GameProgress,
  GameStreakInfo,
  DailyChallengeInfo,
  GameId,
} from '../../features/games/games.types';
import {
  getLastPlayedGame,
  getAllGamesProgress,
  getGamesStreak,
  getDailyChallenge,
  getFavoriteGames,
  toggleFavoriteGame,
  getUnlockedBadges,
  LastPlayedGameInfo,
} from '../../features/games/games.storage';
import { getGameById } from '../../features/games/games.registry';
import { GamesHeader } from './GamesHeader';
import { ContinueGameCard } from './ContinueGameCard';
import { DailyChallengeCard } from './DailyChallengeCard';
import { CollectionsCarousel } from './CollectionsCarousel';
import { BadgesCarousel } from './BadgesCarousel';
import { GameList } from './GameList';

interface GamesHubScreenProps {
  language: SupportedLanguage;
  points?: number;
  onBackToHome: () => void;
  onNavigateToGame: (route: string) => void;
}

export const GamesHubScreen: React.FC<GamesHubScreenProps> = ({
  language,
  points = 1250,
  onBackToHome,
  onNavigateToGame,
}) => {
  const insets = useSafeAreaInsets();
  const t = getTranslation(language).games;
  const isTamil = language === 'ta';

  const [lastPlayed, setLastPlayed] = useState<LastPlayedGameInfo | null>(null);
  const [progressMap, setProgressMap] = useState<Record<string, GameProgress>>({});
  const [streakInfo, setStreakInfo] = useState<GameStreakInfo>({
    currentStreak: 0,
    longestStreak: 0,
    lastPlayedDate: '',
    history: [],
  });
  const [dailyChallenge, setDailyChallenge] = useState<DailyChallengeInfo | null>(null);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>([]);

  const loadData = useCallback(async () => {
    const [info, allProgress, streak, challenge, favorites, badges] = await Promise.all([
      getLastPlayedGame(),
      getAllGamesProgress(),
      getGamesStreak(),
      getDailyChallenge(),
      getFavoriteGames(),
      getUnlockedBadges(),
    ]);
    setLastPlayed(info);
    setProgressMap(allProgress);
    setStreakInfo(streak);
    setDailyChallenge(challenge);
    setFavoriteIds(favorites);
    setUnlockedBadges(badges);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleToggleFavorite = async (gameId: string) => {
    await toggleFavoriteGame(gameId as GameId);
    const updatedFavorites = await getFavoriteGames();
    setFavoriteIds(updatedFavorites);
  };

  const lastGameDef = lastPlayed ? getGameById(lastPlayed.gameId) : undefined;
  const dailyGameDef = dailyChallenge ? getGameById(dailyChallenge.gameId) : undefined;

  const categories: { id: GameCategory; label: string }[] = [
    { id: 'all', label: t.catAll },
    { id: 'logic', label: t.catLogic },
    { id: 'words', label: t.catWords },
    { id: 'grid', label: t.catGrid },
    { id: 'numbers', label: t.catNumbers },
    { id: 'chemistry', label: t.catChemistry || 'Chemistry' },
    { id: 'physics', label: t.catPhysics || 'Physics' },
    { id: 'biology', label: t.catBiology || 'Biology' },
    { id: 'memory', label: t.catMemory || 'Memory' },
    { id: 'spatial', label: t.catSpatial || 'Spatial' },
    { id: 'patterns', label: t.catPatterns || 'Patterns' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />

      {/* Hub Header */}
      <GamesHeader
        title={t.title}
        subtitle={t.subtitle}
        points={points}
        onBack={onBackToHome}
        coinLabel={t.coinLabel}
        backLabel={t.backToHome}
      />

      {/* Main Body */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + theme.spacing.xl },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Streak Banner */}
        <View style={styles.streakCard}>
          <View style={styles.streakLeft}>
            <Text style={styles.streakFlame}>🔥</Text>
            <View>
              <Text style={styles.streakCount}>
                {streakInfo.currentStreak} {t.streakTitle}
              </Text>
              <Text style={styles.streakSubtext}>
                {isTamil
                  ? `நீண்ட சாதனை: ${streakInfo.longestStreak} நாட்கள்`
                  : `Longest streak: ${streakInfo.longestStreak} days`}
              </Text>
            </View>
          </View>
        </View>

        {/* Daily Challenge Card */}
        {dailyChallenge && dailyGameDef && (
          <DailyChallengeCard
            challenge={dailyChallenge}
            game={dailyGameDef}
            language={language}
            onPlay={() => onNavigateToGame(dailyGameDef.route)}
            titleLabel={t.todayChallenge}
            completedLabel={t.completedToday}
            playLabel={t.playDailyChallenge}
          />
        )}

        {/* Optional Last Played Card */}
        {lastGameDef && (
          <ContinueGameCard
            game={lastGameDef}
            levelIndex={lastPlayed?.levelIndex || 0}
            language={language}
            onResume={() => onNavigateToGame(lastGameDef.route)}
            continueLabel={t.continuePlaying}
            resumeLabel={t.resume}
          />
        )}

        {/* Mystery Lab Entry */}
        <TouchableOpacity
          style={mysteryStyles.card}
          onPress={() => onNavigateToGame('/mystery-lab')}
          activeOpacity={0.7}
        >
          <View style={mysteryStyles.iconContainer}>
            <Text style={mysteryStyles.icon}>🔬</Text>
          </View>
          <View style={mysteryStyles.info}>
            <Text style={mysteryStyles.title}>Mystery Lab</Text>
            <Text style={mysteryStyles.subtitle}>Investigate science. Solve the mystery.</Text>
          </View>
          <Text style={mysteryStyles.arrow}>›</Text>
        </TouchableOpacity>

        {/* Curated Game Collections Carousel */}
        <CollectionsCarousel
          language={language}
          sectionTitle={t.collectionsTitle}
        />

        {/* Badges Carousel */}
        <BadgesCarousel
          unlockedBadgeIds={unlockedBadges}
          language={language}
          sectionTitle={t.badgesTitle}
        />

        {/* 20 Games Universe List with Search & Multi-Filters */}
        <GameList
          language={language}
          progressMap={progressMap}
          favoriteGameIds={favoriteIds}
          onToggleFavorite={handleToggleFavorite}
          categories={categories}
          onSelectGame={(game: GameDefinition) => onNavigateToGame(game.route)}
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
    padding: theme.spacing.lg,
  },
  streakCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF7ED',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1.5,
    borderColor: '#FED7AA',
    marginBottom: 14,
  },
  streakLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  streakFlame: {
    fontSize: 26,
  },
  streakCount: {
    fontSize: 15,
    fontWeight: '800',
    color: '#9A3412',
  },
  streakSubtext: {
    fontSize: 12,
    color: '#C2410C',
    fontWeight: '500',
    marginTop: 1,
  },
});

const mysteryStyles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  icon: {
    fontSize: 24,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748B',
    lineHeight: 16,
  },
  arrow: {
    fontSize: 22,
    color: '#94A3B8',
    fontWeight: '600',
    marginLeft: 8,
  },
});
