/**
 * GameListItem Component
 * Compact row for each game showing icon, title, category, level progress, stars, favorite toggle, and chevron.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { GameDefinition } from '../../features/games/games.types';
import { SupportedLanguage } from '../../config/i18n';

interface GameListItemProps {
  game: GameDefinition;
  language: SupportedLanguage;
  completedCount?: number;
  starCount?: number;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  onPress: () => void;
}

export const GameListItem: React.FC<GameListItemProps> = ({
  game,
  language,
  completedCount = 0,
  starCount = 0,
  isFavorite = false,
  onToggleFavorite,
  onPress,
}) => {
  const isTamil = language === 'ta';
  const title = isTamil ? game.title.ta : game.title.en;
  const subtitle = isTamil ? game.subtitle.ta : game.subtitle.en;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`${title}, ${subtitle}, ${completedCount} of ${game.totalLevels} levels completed, ${starCount} stars`}
    >
      {/* Left Icon Block */}
      <View style={[styles.iconBox, { backgroundColor: game.bgGlow }]}>
        <Text style={styles.icon}>{game.icon}</Text>
      </View>

      {/* Middle Text Details */}
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{title}</Text>
          <View style={[styles.categoryTag, { backgroundColor: `${game.accentColor}15` }]}>
            <Text style={[styles.categoryTagText, { color: game.accentColor }]}>
              {game.category}
            </Text>
          </View>
        </View>

        <Text style={styles.subtitle} numberOfLines={1}>
          {subtitle}
        </Text>

        {/* Level Progress & Stars Row */}
        <View style={styles.progressRow}>
          <Text style={styles.progressText}>
            {completedCount > 0
              ? `${completedCount} / ${game.totalLevels} ${isTamil ? 'முடிந்தது' : 'completed'}`
              : `${game.totalLevels} ${isTamil ? 'நிலைகள்' : 'Levels'}`}
          </Text>
          {starCount > 0 && (
            <View style={styles.starsBadge}>
              <Text style={styles.starsText}>⭐ {starCount}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Right Favorite Toggle & Chevron */}
      <View style={styles.rightActions}>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={(e) => {
            e.stopPropagation();
            onToggleFavorite?.();
          }}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Text style={styles.favoriteIcon}>{isFavorite ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
        <Text style={styles.chevron}>›</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 8,
    shadowColor: theme.colors.navy900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 2,
  },
  title: {
    ...theme.typography.h3,
    fontSize: 15,
    fontWeight: '800',
    color: theme.colors.navy900,
  },
  categoryTag: {
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 6,
  },
  categoryTagText: {
    fontSize: 9,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  subtitle: {
    ...theme.typography.caption,
    fontSize: 12,
    color: theme.colors.slate500,
    marginBottom: 4,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressText: {
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.slate600,
  },
  starsBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 6,
  },
  starsText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#D97706',
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingLeft: 6,
  },
  favoriteButton: {
    padding: 4,
  },
  favoriteIcon: {
    fontSize: 16,
  },
  chevron: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.slate400,
  },
});
