/**
 * GameHeader Component
 * Safe-area header for individual game screens with canonical AppBackButton,
 * Title, Level Selector Trigger, Isolated Timer, and info buttons.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../theme';
import { GameTimer } from './GameTimer';
import { AppBackButton } from '../navigation';
import { LanguageToggle } from '../language/LanguageToggle';
import { useLanguage } from '../../context/LanguageContext';

interface GameHeaderProps {
  title: string;
  levelName: string;
  isTimerActive: boolean;
  initialSeconds?: number;
  onTimeUpdate?: (seconds: number) => void;
  onBack: () => void;
  onHowToPlay: () => void;
  onReset?: () => void;
  onOpenLevelSelect?: () => void;
  howToPlayLabel?: string;
  resetLabel?: string;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  title,
  levelName,
  isTimerActive,
  initialSeconds = 0,
  onTimeUpdate,
  onBack,
  onHowToPlay,
  onReset,
  onOpenLevelSelect,
  howToPlayLabel,
  resetLabel,
}) => {
  const insets = useSafeAreaInsets();
  const { language } = useLanguage();
  const isTamil = language === 'ta';

  const resolvedHowToPlay = howToPlayLabel || (isTamil ? 'எப்படி விளையாடுவது' : 'How to Play');
  const resolvedReset = resetLabel || (isTamil ? 'மீட்டமை' : 'Reset');
  const backLabel = isTamil ? 'விளையாட்டுகளுக்குத் திரும்பு' : 'Back to Games';

  return (
    <View style={[styles.container, { paddingTop: insets.top + theme.spacing.xs }]}>
      {/* Left Back Action */}
      <AppBackButton
        onPress={onBack}
        accessibilityLabel={backLabel}
        style={styles.backButton}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      />

      {/* Center Title & Clickable Level / Timer */}
      <View style={styles.centerContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <View style={styles.metaRow}>
          <TouchableOpacity
            style={styles.levelBadge}
            onPress={onOpenLevelSelect}
            activeOpacity={onOpenLevelSelect ? 0.7 : 1}
            disabled={!onOpenLevelSelect}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={`${levelName}, ${isTamil ? 'நிலையை மாற்ற தட்டவும்' : 'tap to select level'}`}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={styles.levelText}>{levelName} ▾</Text>
          </TouchableOpacity>

          <Text style={styles.dotSeparator}>•</Text>

          {/* Isolated Timer Component */}
          <GameTimer
            isActive={isTimerActive}
            initialSeconds={initialSeconds}
            onTimeUpdate={onTimeUpdate}
          />
        </View>
      </View>

      {/* Right Controls: Language Toggle, Reset, How-to-Play */}
      <View style={styles.rightActions}>
        <LanguageToggle />
        {onReset && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onReset}
            activeOpacity={0.7}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={resolvedReset}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={styles.controlIcon}>🔄</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.iconButton}
          onPress={onHowToPlay}
          activeOpacity={0.7}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={resolvedHowToPlay}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={styles.controlIcon}>ℹ️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.base,
    paddingBottom: theme.spacing.sm,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  backButton: {},
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: theme.spacing.xs,
  },
  title: {
    ...theme.typography.h3,
    fontSize: 17,
    fontWeight: '800',
    color: theme.colors.navy900,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  levelBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.blue50,
  },
  levelText: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.actionPrimary,
  },
  dotSeparator: {
    fontSize: 12,
    color: theme.colors.slate400,
    marginHorizontal: 6,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.gray100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlIcon: {
    fontSize: 16,
  },
});
