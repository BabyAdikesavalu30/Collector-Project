/**
 * LevelSelectModal Component
 * Modal allowing students to browse, select, and replay any of the 15 levels.
 */

import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { theme } from '../../theme';
import { GameProgress } from '../../features/games/games.types';
import { getGameLevelId } from '../../features/games/games.storage';

interface LevelSelectModalProps {
  visible: boolean;
  gameTitle: string;
  totalLevels: number;
  currentLevelIndex: number;
  progress?: GameProgress;
  onSelectLevel: (index: number) => void;
  onClose: () => void;
  selectLevelTitle?: string;
  levelLabel?: string;
  closeLabel?: string;
}

export const LevelSelectModal: React.FC<LevelSelectModalProps> = ({
  visible,
  gameTitle,
  totalLevels,
  currentLevelIndex,
  progress,
  onSelectLevel,
  onClose,
  selectLevelTitle = 'Select Level',
  levelLabel = 'Level',
  closeLabel = 'Close',
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.title}>{selectLevelTitle}</Text>
              <Text style={styles.subtitle}>{gameTitle} • {totalLevels} Levels</Text>
            </View>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={onClose}
              activeOpacity={0.7}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={closeLabel}
            >
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Level Grid */}
          <ScrollView contentContainerStyle={styles.gridContainer} showsVerticalScrollIndicator={false}>
            {Array.from({ length: totalLevels }).map((_, idx) => {
              // Real canonical dataset level ID for this game + index (e.g. zip-01, elem-03).
              const canonicalKey = progress?.gameId ? getGameLevelId(progress.gameId, idx) : undefined;
              const isCurrent = idx === currentLevelIndex;
              const levelData = canonicalKey ? progress?.levels[canonicalKey] : undefined;
              const isCompleted = levelData?.completed || false;
              const stars = levelData?.stars || 0;
              // Level 0 is always unlocked; level N is unlocked if level N-1 completed or highestUnlocked >= idx
              const isUnlocked =
                idx === 0 ||
                (progress?.highestUnlockedLevel !== undefined && progress.highestUnlockedLevel >= idx) ||
                levelData?.unlocked ||
                isCompleted;

              return (
                <TouchableOpacity
                  key={`lvl-btn-${idx}`}
                  style={[
                    styles.levelBtn,
                    isUnlocked && styles.levelBtnUnlocked,
                    isCompleted && styles.levelBtnCompleted,
                    isCurrent && styles.levelBtnCurrent,
                  ]}
                  onPress={() => {
                    if (isUnlocked) {
                      onSelectLevel(idx);
                      onClose();
                    }
                  }}
                  disabled={!isUnlocked}
                  activeOpacity={0.75}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel={`${levelLabel} ${idx + 1}${
                    isCompleted ? `, completed, ${stars} stars` : isUnlocked ? ', unlocked' : ', locked'
                  }`}
                >
                  <Text
                    style={[
                      styles.levelNum,
                      isUnlocked && styles.levelNumUnlocked,
                      isCurrent && styles.levelNumCurrent,
                    ]}
                  >
                    {idx + 1}
                  </Text>
                  {isCompleted && stars > 0 ? (
                    <Text style={styles.starRatingText}>
                      {'★'.repeat(stars)}
                    </Text>
                  ) : (
                    <Text style={styles.levelStatus}>
                      {isCompleted ? '✓' : isUnlocked ? '▶' : '🔒'}
                    </Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
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
    maxHeight: '80%',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    paddingBottom: theme.spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  title: {
    ...theme.typography.h3,
    fontSize: 18,
    fontWeight: '900',
    color: theme.colors.navy900,
  },
  subtitle: {
    ...theme.typography.caption,
    fontSize: 12,
    color: theme.colors.slate600,
    marginTop: 2,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.gray100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    fontSize: 14,
    color: theme.colors.slate600,
    fontWeight: '800',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
    paddingVertical: 4,
  },
  levelBtn: {
    width: '30%',
    height: 64,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.gray100,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelBtnUnlocked: {
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.border,
  },
  levelBtnCompleted: {
    backgroundColor: '#F0FDF4',
    borderColor: '#86EFAC',
  },
  levelBtnCurrent: {
    borderColor: theme.colors.actionPrimary,
    borderWidth: 2,
    backgroundColor: '#EFF6FF',
  },
  levelNum: {
    ...theme.typography.h3,
    fontSize: 18,
    fontWeight: '900',
    color: theme.colors.slate400,
  },
  levelNumUnlocked: {
    color: theme.colors.navy900,
  },
  levelNumCurrent: {
    color: theme.colors.actionPrimary,
  },
  levelStatus: {
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.slate500,
    marginTop: 2,
  },
  starRatingText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#F59E0B',
    marginTop: 2,
    letterSpacing: 1,
  },
});
