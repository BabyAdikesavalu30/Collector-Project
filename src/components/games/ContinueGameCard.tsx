/**
 * ContinueGameCard Component
 * Displays the student's last played puzzle with quick resume action.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { GameDefinition } from '../../features/games/games.types';
import { SupportedLanguage } from '../../config/i18n';

interface ContinueGameCardProps {
  game: GameDefinition;
  levelIndex: number;
  language: SupportedLanguage;
  onResume: () => void;
  continueLabel?: string;
  resumeLabel?: string;
}

export const ContinueGameCard: React.FC<ContinueGameCardProps> = ({
  game,
  levelIndex,
  language,
  onResume,
  continueLabel = 'Continue Playing',
  resumeLabel = 'Resume',
}) => {
  const isTamil = language === 'ta';
  const gameTitle = isTamil ? game.title.ta : game.title.en;

  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <View style={[styles.iconBox, { backgroundColor: game.bgGlow }]}>
          <Text style={styles.icon}>{game.icon}</Text>
        </View>
        <View>
          <Text style={styles.label}>{continueLabel}</Text>
          <Text style={styles.title}>
            {gameTitle} • Level {levelIndex + 1}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.resumeBtn}
        onPress={onResume}
        activeOpacity={0.8}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={`${resumeLabel} ${gameTitle}`}
      >
        <Text style={styles.resumeBtnText}>{resumeLabel} →</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EFF6FF', // Soft royal blue tint
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1.5,
    borderColor: '#BFDBFE',
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: theme.spacing.md,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  icon: {
    fontSize: 20,
  },
  label: {
    ...theme.typography.caption,
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.actionPrimary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  title: {
    ...theme.typography.h3,
    fontSize: 14.5,
    fontWeight: '800',
    color: theme.colors.navy900,
  },
  resumeBtn: {
    backgroundColor: theme.colors.actionPrimary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.md,
  },
  resumeBtnText: {
    ...theme.typography.button,
    color: theme.colors.textOnAction,
    fontSize: 12.5,
    fontWeight: '800',
  },
});
