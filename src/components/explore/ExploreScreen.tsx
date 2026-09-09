/**
 * ExploreScreen 2.0 — Upgraded science discovery hub.
 * Renders a polished discovery-oriented experience with:
 * - Header with search
 * - Featured Discovery / Daily Discovery
 * - Continue Discovering
 * - Explore by Topic
 * - Explore by Activity
 * - Science Collections
 * - Did You Know? (Fun Facts)
 * - Scientists Discovery
 * - Inventions Discovery
 * - Recently Viewed
 * - Favorites
 *
 * All horizontal rails rendered inside a single vertical FlatList
 * (no nested vertical scrolling).
 */

import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../../theme';
import { SupportedLanguage, getTranslation } from '../../config/i18n';
import { ScreenHeader, SectionHeader } from '../shared';
import {
  DiscoveryItem,
  DiscoveryTopic,
  DailyDiscoveryEntry,
  RecentlyViewedEntry,
  FavoriteEntry,
  EverydayScienceItem,
  Scientist,
  Invention,
  ActivityTypeFilter,
  DiscoveryTopicId,
} from '../../features/explore/explore.types';

// ============================================================================
// Types
// ============================================================================

export interface ExploreCardItem {
  id: string;
  title: string;
  titleTa: string;
  subtitle: string;
  subtitleTa: string;
  icon: string;
  route: string;
  params?: Record<string, string>;
  accentColor?: string;
}

export interface ExploreSection {
  id: string;
  title: string;
  icon?: string;
  items: ExploreCardItem[];
  hideWhenEmpty?: boolean;
}

interface ExploreScreenProps {
  language: SupportedLanguage;
  sections: ExploreSection[];
  isLoading: boolean;
  onBack: () => void;
  onNavigate: (route: string, params?: Record<string, string>) => void;
  onOpenSearch: () => void;
  // Explore 2.0 props
  featured?: DiscoveryItem | null;
  dailyDiscovery?: DailyDiscoveryEntry | null;
  continueDiscovering?: DiscoveryItem[];
  topicGroups?: DiscoveryTopic[];
  recentViewed?: RecentlyViewedEntry[];
  favorites?: FavoriteEntry[];
  funFact?: EverydayScienceItem | null;
  scientists?: Scientist[];
  inventions?: Invention[];
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  activeTopicFilter?: DiscoveryTopicId | 'all';
  onTopicFilter?: (topic: DiscoveryTopicId | 'all') => void;
  activeActivityFilter?: ActivityTypeFilter;
  onActivityFilter?: (filter: ActivityTypeFilter) => void;
}

// ============================================================================
// Component
// ============================================================================

export const ExploreScreen: React.FC<ExploreScreenProps> = ({
  language,
  sections,
  isLoading,
  onBack,
  onNavigate,
  onOpenSearch,
  featured,
  dailyDiscovery,
  continueDiscovering = [],
  topicGroups = [],
  recentViewed = [],
  favorites = [],
  funFact,
  scientists = [],
  inventions = [],
  searchQuery = '',
  onSearchChange,
  activeTopicFilter = 'all',
  onTopicFilter,
  activeActivityFilter = 'all',
  onActivityFilter,
}) => {
  const insets = useSafeAreaInsets();
  const t = getTranslation(language).progress.explore;
  const isTamil = language === 'ta';

  // ============================================================================
  // Local search state (inline)
  // ============================================================================
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const handleSearchChange = useCallback(
    (text: string) => {
      setLocalQuery(text);
      onSearchChange?.(text);
    },
    [onSearchChange]
  );

  const handleSearchSubmit = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  // ============================================================================
  // Section data
  // ============================================================================

  const visibleSections = useMemo(
    () => sections.filter((section) => !section.hideWhenEmpty || section.items.length > 0),
    [sections]
  );

  // Activity filter chips
  const activityFilters: Array<{ id: ActivityTypeFilter; label: string; icon: string }> = useMemo(
    () => [
      { id: 'all', label: isTamil ? 'அனைத்தும்' : 'All', icon: '📋' },
      { id: 'learn', label: isTamil ? 'கற்றல்' : 'Lessons', icon: '📖' },
      { id: 'experiments', label: isTamil ? 'சோதனைகள்' : 'Experiments', icon: '🧪' },
      { id: 'facts', label: isTamil ? 'தகவல்கள்' : 'Facts', icon: '✨' },
      { id: 'mysteries', label: isTamil ? 'மர்மங்கள்' : 'Mysteries', icon: '🕵️' },
      { id: 'games', label: isTamil ? 'ஆட்டங்கள்' : 'Games', icon: '🎮' },
      { id: 'scientists', label: isTamil ? 'விஞ்ஞானிகள்' : 'Scientists', icon: '👩‍🔬' },
      { id: 'inventions', label: isTamil ? 'கண்டுபிடிப்புகள்' : 'Inventions', icon: '💡' },
    ],
    [isTamil]
  );

  // ============================================================================
  // Render helpers
  // ============================================================================

  const renderDiscoveryCard = useCallback(
    (item: DiscoveryItem, sectionId?: string) => (
      <TouchableOpacity
        key={`${sectionId || ''}-${item.id}`}
        style={styles.card}
        onPress={() => onNavigate(item.route, item.params)}
        accessibilityRole="button"
        accessibilityLabel={isTamil ? item.title.ta : item.title.en}
        activeOpacity={0.85}
      >
        <View
          style={[
            styles.cardIconCircle,
            item.accentColor ? { backgroundColor: `${item.accentColor}1A` } : null,
          ]}
        >
          <Text style={styles.cardIcon}>{item.icon}</Text>
        </View>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {isTamil ? item.title.ta : item.title.en}
        </Text>
        <Text style={styles.cardSubtitle} numberOfLines={2}>
          {item.meta
            ? isTamil
              ? item.meta.ta
              : item.meta.en
            : isTamil
            ? item.description.ta
            : item.description.en}
        </Text>
      </TouchableOpacity>
    ),
    [onNavigate, isTamil]
  );

  const renderTopicCard = useCallback(
    (topic: DiscoveryTopic) => (
      <TouchableOpacity
        key={`topic-${topic.id}`}
        style={[styles.topicCard, { borderLeftColor: topic.accentColor }]}
        onPress={() => onNavigate('/explore', { topic: topic.id })}
        accessibilityRole="button"
        accessibilityLabel={`${isTamil ? topic.title.ta : topic.title.en}, ${topic.discoveryCount} discoveries`}
        activeOpacity={0.85}
      >
        <Text style={styles.topicIcon}>{topic.icon}</Text>
        <View style={styles.topicTextCol}>
          <Text style={styles.topicTitle} numberOfLines={1}>
            {isTamil ? topic.title.ta : topic.title.en}
          </Text>
          <Text style={styles.topicCount}>
            {topic.discoveryCount} {isTamil ? 'கண்டுபிடிப்புகள்' : 'discoveries'}
          </Text>
        </View>
        <Text style={styles.topicArrow}>→</Text>
      </TouchableOpacity>
    ),
    [onNavigate, isTamil]
  );

  const renderHorizontalRail = useCallback(
    (section: ExploreSection) => (
      <View style={styles.section}>
        <SectionHeader title={section.title} icon={section.icon} />
        <FlatList
          horizontal
          data={section.items}
          keyExtractor={(item) => `${section.id}-${item.id}`}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.rail}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => onNavigate(item.route, item.params)}
              accessibilityRole="button"
              accessibilityLabel={isTamil ? item.titleTa : item.title}
              activeOpacity={0.85}
            >
              <View
                style={[
                  styles.cardIconCircle,
                  item.accentColor ? { backgroundColor: `${item.accentColor}1A` } : null,
                ]}
              >
                <Text style={styles.cardIcon}>{item.icon}</Text>
              </View>
              <Text style={styles.cardTitle} numberOfLines={1}>
                {isTamil ? item.titleTa : item.title}
              </Text>
              <Text style={styles.cardSubtitle} numberOfLines={2}>
                {isTamil ? item.subtitleTa : item.subtitle}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    ),
    [onNavigate, isTamil]
  );

  // ============================================================================
  // Main list data assembly (FlatList sections)
  // ============================================================================

  interface ListItem {
    key: string;
    type:
      | 'search'
      | 'featured'
      | 'daily'
      | 'continue'
      | 'activity_filters'
      | 'topic'
      | 'section'
      | 'scientists'
      | 'inventions'
      | 'fun_fact'
      | 'recent'
      | 'favorites'
      | 'legacy'
      | 'footer';
    data?: unknown;
  }

  const listData = useMemo<ListItem[]>(() => {
    const items: ListItem[] = [];

    // Search bar
    items.push({ key: 'search', type: 'search' });

    // Featured Discovery
    if (featured) {
      items.push({ key: 'featured', type: 'featured', data: featured });
    }

    // Daily Discovery
    if (dailyDiscovery) {
      items.push({ key: 'daily', type: 'daily', data: dailyDiscovery });
    }

    // Continue Discovering
    if (continueDiscovering.length > 0) {
      items.push({ key: 'continue', type: 'continue', data: continueDiscovering });
    }

    // Activity Filters
    items.push({ key: 'activity-filters', type: 'activity_filters' });

    // Topic Groups
    if (topicGroups.length > 0) {
      items.push({ key: 'topics', type: 'topic', data: topicGroups });
    }

    // Fun Fact
    if (funFact) {
      items.push({ key: 'fun-fact', type: 'fun_fact', data: funFact });
    }

    // Scientists
    if (scientists.length > 0) {
      items.push({ key: 'scientists', type: 'scientists', data: scientists.slice(0, 10) });
    }

    // Inventions
    if (inventions.length > 0) {
      items.push({ key: 'inventions', type: 'inventions', data: inventions.slice(0, 10) });
    }

    // Legacy sections (from existing architecture)
    for (const section of visibleSections) {
      items.push({ key: `legacy-${section.id}`, type: 'legacy', data: section });
    }

    // Recently Viewed
    if (recentViewed.length > 0) {
      items.push({ key: 'recent', type: 'recent', data: recentViewed });
    }

    // Favorites
    if (favorites.length > 0) {
      items.push({ key: 'favorites', type: 'favorites', data: favorites });
    }

    // Footer
    items.push({ key: 'footer', type: 'footer' });

    return items;
  }, [
    featured,
    dailyDiscovery,
    continueDiscovering,
    topicGroups,
    funFact,
    scientists,
    inventions,
    visibleSections,
    recentViewed,
    favorites,
  ]);

  // ============================================================================
  // Render item
  // ============================================================================

  const renderItem = useCallback(
    ({ item }: { item: ListItem }) => {
      switch (item.type) {
        // ── Search Bar ──
        case 'search':
          return (
            <View style={styles.searchContainer}>
              <View style={styles.searchBar}>
                <Text style={styles.searchIcon}>🔍</Text>
                <TextInput
                  style={styles.searchInput}
                  placeholder={t.searchPlaceholder}
                  placeholderTextColor={theme.colors.slate400}
                  value={localQuery}
                  onChangeText={handleSearchChange}
                  onSubmitEditing={handleSearchSubmit}
                  returnKeyType="search"
                  accessibilityLabel={t.searchPlaceholder}
                  autoCorrect={false}
                />
                {localQuery.length > 0 && (
                  <TouchableOpacity onPress={() => handleSearchChange('')} accessibilityLabel="Clear search">
                    <Text style={styles.clearIcon}>✕</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );

        // ── Featured Discovery ──
        case 'featured': {
          const f = item.data as DiscoveryItem;
          return (
            <View style={styles.featuredContainer}>
              <SectionHeader title={isTamil ? 'சிறப்பு கண்டுபிடிப்பு' : 'Featured Discovery'} icon="✨" />
              <TouchableOpacity
                style={styles.featuredCard}
                onPress={() => onNavigate(f.route, f.params)}
                accessibilityRole="button"
                accessibilityLabel={isTamil ? f.title.ta : f.title.en}
                activeOpacity={0.85}
              >
                <View style={styles.featuredIconRow}>
                  <View style={[styles.featuredIconCircle, { backgroundColor: `${f.accentColor || '#2563EB'}15` }]}>
                    <Text style={styles.featuredIcon}>{f.icon}</Text>
                  </View>
                  <View style={styles.featuredTextCol}>
                    <Text style={styles.featuredType}>{f.type.replace('_', ' ').toUpperCase()}</Text>
                    <Text style={styles.featuredTitle} numberOfLines={1}>
                      {isTamil ? f.title.ta : f.title.en}
                    </Text>
                    <Text style={styles.featuredSubtitle} numberOfLines={2}>
                      {isTamil ? f.description.ta : f.description.en}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          );
        }

        // ── Daily Discovery ──
        case 'daily': {
          const dd = item.data as DailyDiscoveryEntry;
          return (
            <View style={styles.section}>
              <SectionHeader title={isTamil ? 'இன்றைய கண்டுபிடிப்பு' : 'Daily Discovery'} icon="📅" />
              <TouchableOpacity
                style={styles.dailyCard}
                onPress={() => onNavigate(dd.route, dd.params)}
                accessibilityRole="button"
                accessibilityLabel={isTamil ? dd.title.ta : dd.title.en}
                activeOpacity={0.85}
              >
                <View style={styles.dailyIconCircle}>
                  <Text style={styles.dailyIcon}>{dd.icon}</Text>
                </View>
                <View style={styles.dailyTextCol}>
                  <Text style={styles.dailyTitle} numberOfLines={1}>
                    {isTamil ? dd.title.ta : dd.title.en}
                  </Text>
                  <Text style={styles.dailySubtitle} numberOfLines={2}>
                    {isTamil ? dd.description.ta : dd.description.en}
                  </Text>
                </View>
                <Text style={styles.dailyArrow}>→</Text>
              </TouchableOpacity>
            </View>
          );
        }

        // ── Continue Discovering ──
        case 'continue': {
          const items = item.data as DiscoveryItem[];
          return (
            <View style={styles.section}>
              <SectionHeader
                title={isTamil ? 'கண்டுபிடிப்பைத் தொடருங்கள்' : 'Continue Discovering'}
                icon="▶️"
              />
              {items.map((di) => (
                <TouchableOpacity
                  key={`continue-${di.id}`}
                  style={styles.continueItem}
                  onPress={() => onNavigate(di.route, di.params)}
                  accessibilityRole="button"
                  activeOpacity={0.85}
                >
                  <Text style={styles.continueIcon}>{di.icon}</Text>
                  <View style={styles.continueTextCol}>
                    <Text style={styles.continueTitle} numberOfLines={1}>
                      {isTamil ? di.title.ta : di.title.en}
                    </Text>
                    <Text style={styles.continueMeta} numberOfLines={1}>
                      {di.meta ? (isTamil ? di.meta.ta : di.meta.en) : di.type.replace('_', ' ')}
                    </Text>
                  </View>
                  <Text style={styles.continueArrow}>→</Text>
                </TouchableOpacity>
              ))}
            </View>
          );
        }

        // ── Activity Filters ──
        case 'activity_filters':
          return (
            <View style={styles.filterContainer}>
              <FlatList
                horizontal
                data={activityFilters}
                keyExtractor={(f) => f.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.filterRail}
                renderItem={({ item: f }) => (
                  <TouchableOpacity
                    style={[
                      styles.filterChip,
                      activeActivityFilter === f.id && styles.filterChipActive,
                    ]}
                    onPress={() => onActivityFilter?.(f.id)}
                    accessibilityRole="button"
                    accessibilityState={{ selected: activeActivityFilter === f.id }}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.filterChipIcon}>{f.icon}</Text>
                    <Text
                      style={[
                        styles.filterChipText,
                        activeActivityFilter === f.id && styles.filterChipTextActive,
                      ]}
                    >
                      {f.label}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          );

        // ── Topic Groups ──
        case 'topic': {
          const topics = item.data as DiscoveryTopic[];
          return (
            <View style={styles.section}>
              <SectionHeader
                title={isTamil ? 'தலைப்பு வாரியாக ஆராயுங்கள்' : 'Explore by Topic'}
                icon="🗂️"
              />
              {topics.map((topic) => renderTopicCard(topic))}
            </View>
          );
        }

        // ── Fun Fact ──
        case 'fun_fact': {
          const ff = item.data as EverydayScienceItem;
          return (
            <View style={styles.section}>
              <SectionHeader title={isTamil ? 'தெரியுமா?' : 'Did You Know?'} icon="💡" />
              <TouchableOpacity
                style={styles.funFactCard}
                onPress={() => onNavigate('/fun-facts')}
                accessibilityRole="button"
                activeOpacity={0.85}
              >
                <Text style={styles.funFactTitle} numberOfLines={2}>
                  {isTamil ? ff.title.ta : ff.title.en}
                </Text>
                <Text style={styles.funFactDescription} numberOfLines={3}>
                  {isTamil ? ff.description.ta : ff.description.en}
                </Text>
                <Text style={styles.funFactCTA}>
                  {isTamil ? 'மேலும் படிக்க →' : 'Read More →'}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }

        // ── Scientists ──
        case 'scientists': {
          const sc = item.data as Scientist[];
          return (
            <View style={styles.section}>
              <SectionHeader
                title={isTamil ? 'விஞ்ஞானிகளை கண்டறியுங்கள்' : 'Discover Scientists'}
                icon="👩‍🔬"
              />
              <FlatList
                horizontal
                data={sc}
                keyExtractor={(s) => s.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.rail}
                renderItem={({ item: scientist }) => (
                  <TouchableOpacity
                    style={styles.card}
                    onPress={() => onNavigate(`/explore/scientist/${scientist.id}`)}
                    accessibilityRole="button"
                    accessibilityLabel={isTamil ? scientist.name.ta : scientist.name.en}
                    activeOpacity={0.85}
                  >
                    <View
                      style={[
                        styles.cardIconCircle,
                        { backgroundColor: `${scientist.accentColor}1A` },
                      ]}
                    >
                      <Text style={styles.cardIcon}>{scientist.icon}</Text>
                    </View>
                    <Text style={styles.cardTitle} numberOfLines={1}>
                      {isTamil ? scientist.name.ta : scientist.name.en}
                    </Text>
                    <Text style={styles.cardSubtitle} numberOfLines={2}>
                      {isTamil ? scientist.keyContribution.ta : scientist.keyContribution.en}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          );
        }

        // ── Inventions ──
        case 'inventions': {
          const inv = item.data as Invention[];
          return (
            <View style={styles.section}>
              <SectionHeader
                title={isTamil ? 'கண்டுபிடிப்புகளை ஆராயுங்கள்' : 'Discover Inventions'}
                icon="💡"
              />
              <FlatList
                horizontal
                data={inv}
                keyExtractor={(i) => i.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.rail}
                renderItem={({ item: invention }) => (
                  <TouchableOpacity
                    style={styles.card}
                    onPress={() => onNavigate(`/explore/invention/${invention.id}`)}
                    accessibilityRole="button"
                    accessibilityLabel={isTamil ? invention.name.ta : invention.name.en}
                    activeOpacity={0.85}
                  >
                    <View
                      style={[
                        styles.cardIconCircle,
                        { backgroundColor: `${invention.accentColor}1A` },
                      ]}
                    >
                      <Text style={styles.cardIcon}>{invention.icon}</Text>
                    </View>
                    <Text style={styles.cardTitle} numberOfLines={1}>
                      {isTamil ? invention.name.ta : invention.name.en}
                    </Text>
                    <Text style={styles.cardSubtitle} numberOfLines={2}>
                      {isTamil ? invention.inventor.ta : invention.inventor.en}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          );
        }

        // ── Legacy Section (existing horizontal rails) ──
        case 'legacy': {
          const section = item.data as ExploreSection;
          return renderHorizontalRail(section);
        }

        // ── Recently Viewed ──
        case 'recent': {
          const entries = item.data as RecentlyViewedEntry[];
          return (
            <View style={styles.section}>
              <SectionHeader title={isTamil ? 'சமீபத்தில் பார்த்தவை' : 'Recently Viewed'} icon="🕘" />
              {entries.slice(0, 5).map((entry) => (
                <TouchableOpacity
                  key={`recent-${entry.id}`}
                  style={styles.recentItem}
                  onPress={() => onNavigate(entry.route, entry.params)}
                  accessibilityRole="button"
                  activeOpacity={0.85}
                >
                  <Text style={styles.recentIcon}>{entry.icon}</Text>
                  <Text style={styles.recentTitle} numberOfLines={1}>
                    {isTamil ? entry.title.ta : entry.title.en}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          );
        }

        // ── Favorites ──
        case 'favorites': {
          const favs = item.data as FavoriteEntry[];
          return (
            <View style={styles.section}>
              <SectionHeader title={isTamil ? 'சேமிப்புகள்' : 'Saved Discoveries'} icon="⭐" />
              <FlatList
                horizontal
                data={favs}
                keyExtractor={(f) => f.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.rail}
                renderItem={({ item: fav }) => (
                  <TouchableOpacity
                    style={styles.card}
                    onPress={() => onNavigate(fav.route, fav.params)}
                    accessibilityRole="button"
                    activeOpacity={0.85}
                  >
                    <View style={styles.cardIconCircle}>
                      <Text style={styles.cardIcon}>{fav.icon}</Text>
                    </View>
                    <Text style={styles.cardTitle} numberOfLines={1}>
                      {isTamil ? fav.title.ta : fav.title.en}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          );
        }

        // ── Loading ──
        default:
          return null;
      }
    },
    [
      t,
      isTamil,
      localQuery,
      handleSearchChange,
      handleSearchSubmit,
      onNavigate,
      onActivityFilter,
      activeActivityFilter,
      activityFilters,
      renderTopicCard,
      renderHorizontalRail,
    ]
  );

  // ============================================================================
  // Main render
  // ============================================================================

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      <ScreenHeader title={t.title} language={language} onBack={onBack} subtitle={t.subtitle} />

      {isLoading ? (
        <View style={styles.loadingWrap}>
          <Text style={styles.loadingText}>{getTranslation(language).progress.loading}</Text>
        </View>
      ) : (
        <FlatList
          data={listData}
          keyExtractor={(item) => item.key}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.listContent,
            { paddingBottom: Math.max(insets.bottom + 24, 32) },
          ]}
          renderItem={renderItem}
          ListFooterComponent={
            <Text style={styles.demoNote}>ℹ️ {t.demoNote}</Text>
          }
        />
      )}
    </View>
  );
};

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.pearlWhite,
  },
  loadingWrap: {
    flex: 1,
    alignItems: 'center',
    paddingTop: theme.spacing.xxxl,
  },
  loadingText: {
    ...theme.typography.body,
    color: theme.colors.slate500,
  },
  listContent: {
    paddingBottom: theme.spacing.xl,
  },

  // ── Search ──
  searchContainer: {
    paddingHorizontal: theme.spacing.base,
    paddingVertical: theme.spacing.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.spacing.base,
    paddingVertical: 10,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    ...theme.typography.body,
    fontSize: 13.5,
    color: theme.colors.navy900,
    paddingVertical: 0,
  },
  clearIcon: {
    fontSize: 16,
    color: theme.colors.slate400,
    paddingLeft: theme.spacing.sm,
  },

  // ── Sections ──
  section: {
    marginBottom: theme.spacing.sm,
  },
  rail: {
    paddingHorizontal: theme.spacing.base,
    gap: theme.spacing.sm,
  },

  // ── Card ──
  card: {
    width: 148,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.base,
  },
  cardIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.blue50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
  },
  cardIcon: {
    fontSize: 20,
  },
  cardTitle: {
    ...theme.typography.body,
    fontSize: 13,
    fontWeight: '800',
    color: theme.colors.navy900,
  },
  cardSubtitle: {
    ...theme.typography.caption,
    fontSize: 11,
    color: theme.colors.slate500,
    marginTop: 2,
    lineHeight: 15,
  },

  // ── Featured ──
  featuredContainer: {
    paddingHorizontal: theme.spacing.base,
    marginBottom: theme.spacing.sm,
  },
  featuredCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.blue200,
    padding: theme.spacing.base,
    borderLeftWidth: 3,
    borderLeftColor: theme.colors.actionPrimary,
  },
  featuredIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  featuredIcon: {
    fontSize: 24,
  },
  featuredTextCol: {
    flex: 1,
  },
  featuredType: {
    ...theme.typography.overline,
    fontSize: 9.5,
    color: theme.colors.actionPrimary,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  featuredTitle: {
    ...theme.typography.h3,
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.navy900,
    marginBottom: 2,
  },
  featuredSubtitle: {
    ...theme.typography.caption,
    fontSize: 12,
    color: theme.colors.slate600,
  },

  // ── Daily Discovery ──
  dailyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginHorizontal: theme.spacing.base,
    padding: theme.spacing.base,
  },
  dailyIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.purple50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  dailyIcon: {
    fontSize: 22,
  },
  dailyTextCol: {
    flex: 1,
  },
  dailyTitle: {
    ...theme.typography.body,
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.navy900,
  },
  dailySubtitle: {
    ...theme.typography.caption,
    fontSize: 12,
    color: theme.colors.slate600,
    marginTop: 2,
  },
  dailyArrow: {
    fontSize: 18,
    color: theme.colors.brandPrimary,
    fontWeight: '700',
    marginLeft: 8,
  },

  // ── Continue Discovering ──
  continueItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginHorizontal: theme.spacing.base,
    paddingHorizontal: theme.spacing.base,
    paddingVertical: 10,
    marginBottom: 6,
  },
  continueIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  continueTextCol: {
    flex: 1,
  },
  continueTitle: {
    ...theme.typography.body,
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.navy900,
  },
  continueMeta: {
    ...theme.typography.caption,
    fontSize: 11,
    color: theme.colors.slate500,
    marginTop: 1,
    textTransform: 'capitalize',
  },
  continueArrow: {
    fontSize: 16,
    color: theme.colors.actionPrimary,
    fontWeight: '700',
    marginLeft: 8,
  },

  // ── Activity Filters ──
  filterContainer: {
    marginBottom: theme.spacing.sm,
  },
  filterRail: {
    paddingHorizontal: theme.spacing.base,
    gap: 8,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: 12,
    paddingVertical: 7,
    gap: 5,
  },
  filterChipActive: {
    backgroundColor: theme.colors.blue50,
    borderColor: theme.colors.actionPrimary,
  },
  filterChipIcon: {
    fontSize: 13,
  },
  filterChipText: {
    ...theme.typography.caption,
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.slate600,
  },
  filterChipTextActive: {
    color: theme.colors.actionPrimary,
    fontWeight: '700',
  },

  // ── Topic Card ──
  topicCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderLeftWidth: 3,
    marginHorizontal: theme.spacing.base,
    paddingHorizontal: theme.spacing.base,
    paddingVertical: 10,
    marginBottom: 6,
  },
  topicIcon: {
    fontSize: 22,
    marginRight: 12,
  },
  topicTextCol: {
    flex: 1,
  },
  topicTitle: {
    ...theme.typography.body,
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.navy900,
  },
  topicCount: {
    ...theme.typography.caption,
    fontSize: 11,
    color: theme.colors.slate500,
    marginTop: 1,
  },
  topicArrow: {
    fontSize: 16,
    color: theme.colors.actionPrimary,
    fontWeight: '700',
    marginLeft: 8,
  },

  // ── Fun Fact ──
  funFactCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.green200,
    marginHorizontal: theme.spacing.base,
    padding: theme.spacing.base,
  },
  funFactTitle: {
    ...theme.typography.h3,
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.navy900,
    marginBottom: 4,
  },
  funFactDescription: {
    ...theme.typography.body,
    fontSize: 12.5,
    color: theme.colors.slate600,
    lineHeight: 18,
    marginBottom: 8,
  },
  funFactCTA: {
    ...theme.typography.body,
    fontSize: 13,
    fontWeight: '800',
    color: theme.colors.success,
  },

  // ── Recently Viewed ──
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginHorizontal: theme.spacing.base,
    paddingHorizontal: theme.spacing.base,
    paddingVertical: 10,
    marginBottom: 4,
  },
  recentIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  recentTitle: {
    ...theme.typography.body,
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.navy900,
    flex: 1,
  },

  // ── Demo Note ──
  demoNote: {
    ...theme.typography.caption,
    fontSize: 11,
    color: theme.colors.slate400,
    textAlign: 'center',
    marginTop: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xl,
  },
});
