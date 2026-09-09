/**
 * Explore 2.0 Route (/explore)
 * Discovery layer built from deterministic local data:
 * featured discovery, daily discovery, continue discovering,
 * topic browsing, activity browsing, scientists, inventions,
 * fun facts, and rule-based recommendations.
 *
 * All data is DERIVED from canonical sources — never duplicated.
 */

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useRouter } from 'expo-router';
import { ExploreScreen, ExploreSection, ExploreCardItem } from '../src/components/explore';
import { storage, STORAGE_KEYS } from '../src/storage/asyncStorage';
import { SupportedLanguage, getTranslation } from '../src/config/i18n';
import { GAMES_REGISTRY, GAME_COLLECTIONS, getGameById } from '../src/features/games/games.registry';
import { getRecentGames, getLastPlayedGame, getGamesStreak, getUnlockedBadges } from '../src/features/games/games.storage';
import { RIDDLE_CATEGORIES } from '../src/features/riddles/riddle.mock';
import { getDailyFact } from '../src/features/fun-facts/fun-facts.engine';
import { getMysteryCases, getMysteryRecommendations } from '../src/features/mystery-lab';
import { getActivityHistory, getTotalXpBalance } from '../src/features/activity';
import { buildRecommendations } from '../src/features/recommendations';
import { computeScienceStrengths } from '../src/features/profile';
import { SessionRepository } from '../src/features/auth';
import { MICRO_LESSONS, MicroLesson } from '../src/features/micro-lessons';
import { CONCEPT_MAPS, ConceptMap } from '../src/features/concept-maps';
import { EXPERIMENTS, Experiment } from '../src/features/experiment-lab';
import {
  getExploreViewModel,
  searchDiscoveries,
  getAllDiscoveryItems,
} from '../src/features/explore/explore.service';
import {
  getFeaturedDiscovery,
  DISCOVERY_TOPICS,
} from '../src/features/explore/explore.discoveryData';
import { SCIENTISTS } from '../src/features/explore/explore.scientists';
import { INVENTIONS } from '../src/features/explore/explore.inventions';
import { EVERYDAY_SCIENCE } from '../src/features/explore/explore.everydayScience';
import {
  getFavorites,
  getRecentlyViewed,
  addRecentlyViewed,
} from '../src/features/explore/explore.storage';
import { useLanguage } from '../src/context';
import {
  DiscoveryItem,
  DiscoveryTopicId,
  ActivityTypeFilter,
  ExploreFilterState,
} from '../src/features/explore/explore.types';

export default function ExplorePage() {
  const router = useRouter();
  const { language } = useLanguage();
  const [sections, setSections] = useState<ExploreSection[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Explore 2.0 state
  const [featured, setFeatured] = useState<DiscoveryItem | null>(null);
  const [dailyDiscovery, setDailyDiscovery] = useState<ReturnType<typeof getFeaturedDiscovery> | null>(null);
  const [continueDiscovering, setContinueDiscovering] = useState<DiscoveryItem[]>([]);
  const [recentViewed, setRecentViewed] = useState<ReturnType<typeof getRecentlyViewed> extends Promise<infer R> ? R : never>([]);
  const [favorites, setFavorites] = useState<ReturnType<typeof getFavorites> extends Promise<infer R> ? R : never>([]);
  const [funFact, setFunFact] = useState<typeof EVERYDAY_SCIENCE[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<DiscoveryItem[]>([]);
  const [activeTopicFilter, setActiveTopicFilter] = useState<DiscoveryTopicId | 'all'>('all');
  const [activeActivityFilter, setActiveActivityFilter] = useState<ActivityTypeFilter>('all');

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const session = await SessionRepository.getSession();
      if (!session || !session.isAuthenticated) {
        router.replace('/auth-welcome');
        return;
      }

      // Load Explore 2.0 data
      const [
        recentGames, lastPlayed, streak, history, xpBalance, badges,
        favs, recent,
      ] = await Promise.all([
        getRecentGames(),
        getLastPlayedGame(),
        getGamesStreak(),
        getActivityHistory(),
        getTotalXpBalance(),
        getUnlockedBadges(),
        getFavorites(),
        getRecentlyViewed(),
      ]);

      if (isMounted) {
        setFavorites(favs);
        setRecentViewed(recent);
        setFunFact(EVERYDAY_SCIENCE[0] || null);
        setFeatured(getFeaturedDiscovery() as unknown as DiscoveryItem);
        setDailyDiscovery(getFeaturedDiscovery());
      }

      // Build legacy sections
      const gameItem = (id: string): ExploreCardItem | null => {
        const game = getGameById(id);
        if (!game) return null;
        return {
          id: game.id,
          title: game.title.en,
          titleTa: game.title.ta,
          subtitle: game.subtitle.en,
          subtitleTa: game.subtitle.ta,
          icon: game.icon,
          route: game.route,
          accentColor: game.accentColor,
        };
      };

      const built: ExploreSection[] = [];

      // Continue Playing
      const continueItem = lastPlayed ? gameItem(lastPlayed.gameId) : null;
      if (continueItem && lastPlayed) {
        built.push({
          id: 'continue',
          title: getTranslation(language).progress.explore.continuePlaying,
          icon: '▶️',
          items: [{ ...continueItem, subtitle: `Level ${lastPlayed.levelIndex + 1}`, subtitleTa: `நிலை ${lastPlayed.levelIndex + 1}` }],
        });
      }

      // Popular games — deterministic
      const popularIds = GAMES_REGISTRY.slice(0, 8).map((g) => g.id);
      built.push({
        id: 'popular',
        title: getTranslation(language).progress.explore.popularGames,
        icon: '🎮',
        items: popularIds.map((id) => gameItem(id)).filter((item): item is ExploreCardItem => Boolean(item)),
      });

      // Micro Lessons
      built.push({
        id: 'micro-lessons',
        title: language === 'ta' ? 'விரைவு கற்றல்' : 'Quick Learning',
        icon: '⚡',
        items: [
          {
            id: 'ml-hub',
            title: 'All Micro Lessons',
            titleTa: 'அனைத்து பாடங்கள்',
            subtitle: `${MICRO_LESSONS.length} bite-sized science lessons`,
            subtitleTa: `${MICRO_LESSONS.length} சிறிய அறிவியல் பாடங்கள்`,
            icon: '📖',
            route: '/micro-lessons',
          },
          ...MICRO_LESSONS.slice(0, 5).map((ml: MicroLesson) => ({
            id: ml.id,
            title: ml.title.en,
            titleTa: ml.title.ta,
            subtitle: `${ml.durationMinutes} min · ${ml.subject.toUpperCase()}`,
            subtitleTa: `${ml.durationMinutes} நிமிடம்`,
            icon: ml.icon,
            route: `/micro-lesson/${ml.id}`,
          })),
        ],
      });

      // Concept Maps
      built.push({
        id: 'concept-maps',
        title: language === 'ta' ? 'கருத்து வரைபடங்கள்' : 'Concept Maps',
        icon: '🗺️',
        items: [
          {
            id: 'cm-hub',
            title: 'All Concept Maps',
            titleTa: 'அனைத்து வரைபடங்கள்',
            subtitle: `${CONCEPT_MAPS.length} interactive concept maps`,
            subtitleTa: `${CONCEPT_MAPS.length} ஊடாடும் கருத்து வரைபடங்கள்`,
            icon: '🗺️',
            route: '/concept-maps',
          },
          ...CONCEPT_MAPS.slice(0, 5).map((cm: ConceptMap) => ({
            id: cm.id,
            title: cm.title.en,
            titleTa: cm.title.ta,
            subtitle: `${cm.nodes.length} nodes · ${cm.subject.toUpperCase()}`,
            subtitleTa: `${cm.nodes.length} கருத்துகள்`,
            icon: cm.icon,
            route: `/concept-map/${cm.id}`,
          })),
        ],
      });

      // Experiment Lab
      built.push({
        id: 'experiment-lab',
        title: language === 'ta' ? 'சோதனை ஆய்வகம்' : 'Experiment Lab',
        icon: '🧪',
        items: [
          {
            id: 'exp-hub',
            title: 'All Experiments',
            titleTa: 'அனைத்து பரிசோதனைகள்',
            subtitle: `${EXPERIMENTS.length} interactive simulations`,
            subtitleTa: `${EXPERIMENTS.length} ஊடாடும் உருவகப்படுத்துதல்கள்`,
            icon: '🧪',
            route: '/experiment-lab',
          },
          ...EXPERIMENTS.slice(0, 5).map((exp: Experiment) => ({
            id: exp.id,
            title: exp.title.en,
            titleTa: exp.title.ta,
            subtitle: `${exp.durationMinutes} min · ${exp.subject.toUpperCase()}`,
            subtitleTa: `${exp.durationMinutes} நிமிடம்`,
            icon: exp.heroAsset || '🧪',
            route: `/experiment/${exp.id}`,
          })),
        ],
      });

      // Mystery cases
      const mysteryRecs = getMysteryRecommendations([]);
      const mysteryCases = getMysteryCases();
      built.push({
        id: 'mystery',
        title: getTranslation(language).progress.explore.mysteryCases,
        icon: '🕵️',
        items: mysteryRecs
          .map((rec) => mysteryCases.find((c) => c.id === rec.caseId))
          .filter((c): c is NonNullable<typeof c> => Boolean(c))
          .map((c) => ({
            id: c.id,
            title: c.title.en,
            titleTa: c.title.ta,
            subtitle: c.category,
            subtitleTa: c.category,
            icon: '🕵️',
            route: '/mystery-lab',
            params: { caseId: c.id },
          })),
      });

      // Riddles
      built.push({
        id: 'riddles',
        title: getTranslation(language).progress.explore.riddles,
        icon: '💡',
        items: RIDDLE_CATEGORIES.map((category) => ({
          id: category.id,
          title: category.title.en,
          titleTa: category.title.ta,
          subtitle: category.description.en,
          subtitleTa: category.description.ta,
          icon: category.icon,
          route: '/riddles',
          params: { difficulty: category.id },
        })),
      });

      // Fun facts + spin wheel
      built.push({
        id: 'facts',
        title: getTranslation(language).progress.explore.funFacts,
        icon: '✨',
        items: [
          {
            id: 'facts-entry',
            title: 'Discover Fun Facts',
            titleTa: 'சுவாரஸ்ய தகவல்களை கண்டறியுங்கள்',
            subtitle: '150+ bilingual science facts',
            subtitleTa: '150+ இருமொழி அறிவியல் தகவல்கள்',
            icon: '✨',
            route: '/fun-facts',
          },
          {
            id: 'spin-entry',
            title: 'Daily Spin Wheel',
            titleTa: 'தினசரி சுழல் சக்கரம்',
            subtitle: 'Spin for a science challenge',
            subtitleTa: 'அறிவியல் சவாலுக்காக சுழற்றுங்கள்',
            icon: '🎡',
            route: '/spin-wheel',
          },
        ],
      });

      // Collections
      built.push({
        id: 'collections',
        title: getTranslation(language).progress.explore.collections,
        icon: '📚',
        items: GAME_COLLECTIONS.map((collection) => ({
          id: collection.id,
          title: collection.title.en,
          titleTa: collection.title.ta,
          subtitle: collection.description.en,
          subtitleTa: collection.description.ta,
          icon: collection.icon,
          route: '/games',
          accentColor: collection.accentColor,
        })),
      });

      // Recently played
      const recentItems = recentGames.map((r) => gameItem(r.gameId)).filter((item): item is ExploreCardItem => Boolean(item));
      if (recentItems.length > 0) {
        built.push({
          id: 'recent',
          title: getTranslation(language).progress.explore.recentlyPlayed,
          icon: '🕘',
          items: recentItems,
        });
      }

      if (isMounted) {
        setSections(built);
        setIsLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [router, language]);

  // ============================================================================
  // Handlers
  // ============================================================================

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/home');
    }
  }, [router]);

  const handleNavigate = useCallback(
    (route: string, params?: Record<string, string>) => {
      try {
        router.push(params ? { pathname: route, params } : route);
      } catch {
        // Invalid destination — stay on screen
      }
    },
    [router]
  );

  const handleOpenSearch = useCallback(() => {
    router.push('/search');
  }, [router]);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const allItems = getAllDiscoveryItems ? getAllDiscoveryItems() : [];
      const results = searchDiscoveries ? searchDiscoveries(query, allItems, language) : [];
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [language]);

  const handleTopicFilter = useCallback((topic: DiscoveryTopicId | 'all') => {
    setActiveTopicFilter(topic);
  }, []);

  const handleActivityFilter = useCallback((filter: ActivityTypeFilter) => {
    setActiveActivityFilter(filter);
  }, []);

  return (
    <ExploreScreen
      language={language}
      sections={sections}
      isLoading={isLoading}
      onBack={handleBack}
      onNavigate={handleNavigate}
      onOpenSearch={handleOpenSearch}
      featured={featured}
      dailyDiscovery={dailyDiscovery}
      continueDiscovering={continueDiscovering}
      topicGroups={DISCOVERY_TOPICS}
      recentViewed={recentViewed}
      favorites={favorites}
      funFact={funFact}
      scientists={SCIENTISTS}
      inventions={INVENTIONS}
      searchQuery={searchQuery}
      onSearchChange={handleSearchChange}
      activeTopicFilter={activeTopicFilter}
      onTopicFilter={handleTopicFilter}
      activeActivityFilter={activeActivityFilter}
      onActivityFilter={handleActivityFilter}
    />
  );
}
