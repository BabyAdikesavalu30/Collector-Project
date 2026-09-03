/**
 * GameList Component
 * Search, multi-category filters, sort tabs, and 20 game universe items.
 */

import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { theme } from '../../theme';
import { GAMES_REGISTRY } from '../../features/games/games.registry';
import { GameCategory, GameDefinition, GameProgress } from '../../features/games/games.types';
import { SupportedLanguage, getTranslation } from '../../config/i18n';
import { GameListItem } from './GameListItem';

interface GameListProps {
  language: SupportedLanguage;
  progressMap?: Record<string, GameProgress>;
  favoriteGameIds?: string[];
  onToggleFavorite?: (gameId: string) => void;
  onSelectGame: (game: GameDefinition) => void;
  categories: { id: GameCategory; label: string }[];
}

type FilterTab = 'all' | 'favorites' | 'completed' | 'in-progress';

export const GameList: React.FC<GameListProps> = ({
  language,
  progressMap,
  favoriteGameIds = [],
  onToggleFavorite,
  onSelectGame,
  categories,
}) => {
  const t = getTranslation(language).games;
  const isTamil = language === 'ta';

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<GameCategory>('all');
  const [activeTab, setActiveTab] = useState<FilterTab>('all');

  const getCompletedCount = (gameId: string) => {
    if (!progressMap || !progressMap[gameId]) return 0;
    const levels = progressMap[gameId].levels || {};
    // Count only canonical dataset level IDs; ignore legacy level-N aliases.
    return Object.entries(levels).filter(([key, lvl]) => !key.startsWith('level-') && lvl.completed).length;
  };

  const getStarCount = (gameId: string) => {
    if (!progressMap || !progressMap[gameId]) return 0;
    const levels = progressMap[gameId].levels || {};
    // Sum stars only for canonical dataset level IDs; ignore legacy aliases.
    return Object.entries(levels).reduce((sum, [key, lvl]) => {
      if (key.startsWith('level-')) return sum;
      return sum + (lvl.stars || 0);
    }, 0);
  };

  const filteredGames = useMemo(() => {
    return GAMES_REGISTRY.filter((game) => {
      // 1. Search Query Filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitleEn = game.title.en.toLowerCase().includes(query);
        const matchesTitleTa = game.title.ta.toLowerCase().includes(query);
        const matchesSubEn = game.subtitle.en.toLowerCase().includes(query);
        const matchesSubTa = game.subtitle.ta.toLowerCase().includes(query);
        const matchesTags = game.tags?.some((tag) => tag.toLowerCase().includes(query));
        const matchesCategory = game.category.toLowerCase().includes(query);

        if (!matchesTitleEn && !matchesTitleTa && !matchesSubEn && !matchesSubTa && !matchesTags && !matchesCategory) {
          return false;
        }
      }

      // 2. Category Filter
      if (activeCategory !== 'all' && game.category !== activeCategory) {
        return false;
      }

      // 3. Tab Filter
      if (activeTab === 'favorites') {
        if (!favoriteGameIds.includes(game.id)) return false;
      } else if (activeTab === 'completed') {
        const completed = getCompletedCount(game.id);
        if (completed < game.totalLevels) return false;
      } else if (activeTab === 'in-progress') {
        const completed = getCompletedCount(game.id);
        if (completed === 0 || completed >= game.totalLevels) return false;
      }

      return true;
    });
  }, [searchQuery, activeCategory, activeTab, favoriteGameIds, progressMap]);

  return (
    <View style={styles.container}>
      {/* Search Input Bar */}
      <View style={styles.searchBar}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder={t.searchPlaceholder || 'Search games, concepts...'}
          placeholderTextColor="#94A3B8"
          value={searchQuery}
          onChangeText={setSearchQuery}
          clearButtonMode="while-editing"
          accessible={true}
          accessibilityLabel="Search games and topics"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Text style={styles.clearSearchIcon}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Filter Tabs (All, Favorites, In Progress, Completed) */}
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'all' && styles.tabButtonActive]}
          onPress={() => setActiveTab('all')}
        >
          <Text style={[styles.tabText, activeTab === 'all' && styles.tabTextActive]}>
            {isTamil ? 'அனைத்தும்' : 'All Games'} ({GAMES_REGISTRY.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'favorites' && styles.tabButtonActive]}
          onPress={() => setActiveTab('favorites')}
        >
          <Text style={[styles.tabText, activeTab === 'favorites' && styles.tabTextActive]}>
            ❤️ {isTamil ? 'விருப்பங்கள்' : 'Favorites'} ({favoriteGameIds.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'in-progress' && styles.tabButtonActive]}
          onPress={() => setActiveTab('in-progress')}
        >
          <Text style={[styles.tabText, activeTab === 'in-progress' && styles.tabTextActive]}>
            ⏳ {isTamil ? 'நடப்பில்' : 'In Progress'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Category Filter Pills */}
      <View style={styles.filterRow}>
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <TouchableOpacity
              key={cat.id}
              style={[styles.filterPill, isActive && styles.filterPillActive]}
              onPress={() => setActiveCategory(cat.id)}
              activeOpacity={0.7}
              accessible={true}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
            >
              <Text style={[styles.filterText, isActive && styles.filterTextActive]}>
                {cat.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Game Cards List */}
      <View style={styles.list}>
        {filteredGames.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyTitle}>{t.noGamesFound || 'No games found'}</Text>
            <Text style={styles.emptySubtitle}>
              {t.noGamesFoundSubtitle || 'Try adjusting your search or category filter.'}
            </Text>
          </View>
        ) : (
          filteredGames.map((game) => (
            <GameListItem
              key={game.id}
              game={game}
              language={language}
              completedCount={getCompletedCount(game.id)}
              starCount={getStarCount(game.id)}
              isFavorite={favoriteGameIds.includes(game.id)}
              onToggleFavorite={() => onToggleFavorite?.(game.id)}
              onPress={() => onSelectGame(game)}
            />
          ))
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    marginBottom: 12,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1E293B',
    fontWeight: '500',
    padding: 0,
  },
  clearSearchIcon: {
    fontSize: 14,
    color: '#94A3B8',
    fontWeight: '700',
    paddingHorizontal: 4,
  },
  tabRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  tabButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
  },
  tabButtonActive: {
    backgroundColor: '#3B82F6',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: theme.spacing.md,
  },
  filterPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  filterPillActive: {
    backgroundColor: theme.colors.navy900,
    borderColor: theme.colors.navy900,
  },
  filterText: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.slate600,
  },
  filterTextActive: {
    color: theme.colors.white,
  },
  list: {
    gap: 8,
  },
  emptyContainer: {
    paddingVertical: 32,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  emptyIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
