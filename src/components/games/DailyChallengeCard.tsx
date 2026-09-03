/**
 * DailyChallengeCard Component
 * Highlights the daily deterministic challenge game and level.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { DailyChallengeInfo, GameDefinition } from '../../features/games/games.types';
import { SupportedLanguage } from '../../config/i18n';

interface DailyChallengeCardProps {
  challenge: DailyChallengeInfo;
  game: GameDefinition;
  language: SupportedLanguage;
  onPlay: () => void;
  titleLabel?: string;
  completedLabel?: string;
  playLabel?: string;
}

export const DailyChallengeCard: React.FC<DailyChallengeCardProps> = ({
  challenge,
  game,
  language,
  onPlay,
  titleLabel = "Today's Daily Challenge",
  completedLabel = 'Completed Today ✓',
  playLabel = 'Play Challenge',
}) => {
  const isTamil = language === 'ta';
  const gameTitle = isTamil ? game.title.ta : game.title.en;

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.badgeRow}>
          <Text style={styles.dailyBadge}>⭐ DAILY</Text>
          {challenge.completed && (
            <View style={styles.completedBadge}>
              <Text style={styles.completedBadgeText}>{completedLabel}</Text>
            </View>
          )}
        </View>
        <Text style={styles.bonusPoints}>+50 Pts</Text>
      </View>

      <View style={styles.bodyRow}>
        <View style={[styles.iconBox, { backgroundColor: game.bgGlow }]}>
          <Text style={styles.icon}>{game.icon}</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.titleLabel}>{titleLabel}</Text>
          <Text style={styles.gameTitle}>{gameTitle}</Text>
          <Text style={styles.levelSubtitle}>
            Level {challenge.levelIndex + 1} • {isTamil ? game.subtitle.ta : game.subtitle.en}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.playButton, challenge.completed && styles.playButtonCompleted]}
        onPress={onPlay}
        activeOpacity={0.8}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={`Play daily challenge ${gameTitle} level ${challenge.levelIndex + 1}`}
      >
        <Text style={styles.playButtonText}>
          {challenge.completed ? 'Replay Challenge' : `${playLabel} →`}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E1B4B',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: '#4338CA',
    shadowColor: '#312E81',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dailyBadge: {
    backgroundColor: '#F59E0B',
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    letterSpacing: 0.5,
  },
  completedBadge: {
    backgroundColor: '#059669',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  completedBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  bonusPoints: {
    fontSize: 12,
    fontWeight: '900',
    color: '#38BDF8',
  },
  bodyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  icon: {
    fontSize: 26,
  },
  content: {
    flex: 1,
  },
  titleLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#A5B4FC',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  gameTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 2,
  },
  levelSubtitle: {
    fontSize: 12,
    color: '#C7D2FE',
    marginTop: 2,
  },
  playButton: {
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  playButtonCompleted: {
    backgroundColor: '#3730A3',
  },
  playButtonText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
});
