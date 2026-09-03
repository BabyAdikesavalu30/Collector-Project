/**
 * GameCompletionModal Component
 * Celebratory result card when a puzzle level is completed.
 */

import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';

interface GameCompletionModalProps {
  visible: boolean;
  title?: string;
  subtitle?: string;
  levelName: string;
  elapsedSeconds: number;
  moves: number;
  stars?: 1 | 2 | 3;
  score?: number;
  hasNextLevel: boolean;
  onNextLevel: () => void;
  onReplay: () => void;
  onBackToGames: () => void;
  nextLevelLabel?: string;
  replayLabel?: string;
  backToGamesLabel?: string;
  timeLabel?: string;
  movesLabel?: string;
  pointsLabel?: string;
}

export const GameCompletionModal: React.FC<GameCompletionModalProps> = ({
  visible,
  title = 'Puzzle Complete!',
  subtitle = 'Great logic and clear thinking!',
  levelName,
  elapsedSeconds,
  moves,
  stars = 3,
  score = 100,
  hasNextLevel,
  onNextLevel,
  onReplay,
  onBackToGames,
  nextLevelLabel = 'Next Level',
  replayLabel = 'Replay',
  backToGamesLabel = 'Back to Games',
  timeLabel = 'Time',
  movesLabel = 'Moves',
  pointsLabel = 'Points',
}) => {
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.backdrop}>
        <View style={styles.card}>
          {/* Star Rating Banner */}
          <View style={styles.starsRow}>
            <Text style={[styles.starIcon, stars >= 1 ? styles.starActive : styles.starInactive]}>★</Text>
            <Text style={[styles.starIcon, styles.starCenter, stars >= 2 ? styles.starActive : styles.starInactive]}>★</Text>
            <Text style={[styles.starIcon, stars >= 3 ? styles.starActive : styles.starInactive]}>★</Text>
          </View>

          {/* Title & Subtitle */}
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>

          {/* Stats 2x2 Grid */}
          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{levelName}</Text>
              <Text style={styles.statLabel}>Level</Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statValue}>{formatTime(elapsedSeconds)}</Text>
              <Text style={styles.statLabel}>{timeLabel}</Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statValue}>{moves}</Text>
              <Text style={styles.statLabel}>{movesLabel}</Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statValue}>+{score}</Text>
              <Text style={styles.statLabel}>{pointsLabel}</Text>
            </View>
          </View>

          {/* CTAs */}
          {hasNextLevel && (
            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={onNextLevel}
              activeOpacity={0.8}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={nextLevelLabel}
            >
              <Text style={styles.primaryBtnText}>{nextLevelLabel} →</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={hasNextLevel ? styles.secondaryBtn : styles.primaryBtn}
            onPress={onReplay}
            activeOpacity={0.8}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={replayLabel}
          >
            <Text
              style={
                hasNextLevel ? styles.secondaryBtnText : styles.primaryBtnText
              }
            >
              {replayLabel}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tertiaryBtn}
            onPress={onBackToGames}
            activeOpacity={0.7}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={backToGamesLabel}
          >
            <Text style={styles.tertiaryBtnText}>{backToGamesLabel}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  card: {
    width: '100%',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    alignItems: 'center',
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 12,
  },
  starIcon: {
    fontSize: 32,
  },
  starCenter: {
    fontSize: 42,
    marginTop: -8,
  },
  starActive: {
    color: '#F59E0B',
  },
  starInactive: {
    color: '#CBD5E1',
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: theme.colors.green50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  icon: {
    fontSize: 32,
  },
  title: {
    ...theme.typography.h2,
    fontSize: 22,
    fontWeight: '900',
    color: theme.colors.navy900,
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    ...theme.typography.body,
    fontSize: 14,
    color: theme.colors.slate600,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  statsGrid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: theme.spacing.lg,
  },
  statBox: {
    width: '48%',
    backgroundColor: theme.colors.pearlWhite,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: 10,
    alignItems: 'center',
  },
  statValue: {
    ...theme.typography.h3,
    fontSize: 16,
    fontWeight: '800',
    color: theme.colors.navy900,
  },
  statLabel: {
    ...theme.typography.caption,
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.slate600,
    textTransform: 'uppercase',
    marginTop: 2,
  },
  primaryBtn: {
    width: '100%',
    height: 48,
    backgroundColor: theme.colors.actionPrimary,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  primaryBtnText: {
    ...theme.typography.button,
    color: theme.colors.textOnAction,
    fontSize: 14,
    fontWeight: '800',
  },
  secondaryBtn: {
    width: '100%',
    height: 44,
    backgroundColor: theme.colors.gray100,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  secondaryBtnText: {
    ...theme.typography.button,
    color: theme.colors.navy900,
    fontSize: 13.5,
    fontWeight: '700',
  },
  tertiaryBtn: {
    paddingVertical: 6,
    alignItems: 'center',
  },
  tertiaryBtnText: {
    ...theme.typography.caption,
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.slate600,
  },
});
