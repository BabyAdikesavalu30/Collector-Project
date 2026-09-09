/**
 * Explore 2.0 — Service Layer
 * Aggregates data from all existing canonical sources.
 * Never creates new sources of truth — reads from existing stores.
 *
 * Architecture:
 *   Existing Sources → ExploreService → ExploreViewModel → Explore UI
 */

import { storage, STORAGE_KEYS } from '../../storage/asyncStorage';
import { SupportedLanguage } from '../../config/i18n';
import { MICRO_LESSONS } from '../micro-lessons';
import { CONCEPT_MAPS } from '../concept-maps';
import { EXPERIMENTS } from '../experiment-lab/experiment.data';
import { getMysteryCases } from '../mystery-lab/mystery.cases';
import { GAMES_REGISTRY, GAME_COLLECTIONS } from '../games/games.registry';
import { RIDDLE_CATEGORIES } from '../riddles/riddle.mock';
import { FUN_FACTS } from '../fun-facts/fun-facts.mock';
import { getDailyFact } from '../fun-facts/fun-facts.engine';
import { getAllCollectionProgress } from '../science-passport/sciencePassport.collectionHelpers';
import { getActivityHistory } from '../activity/activity.storage';
import { getAllProgress as getAllMicroLessonsProgress } from '../micro-lessons/microLessons.storage';
import { getAllConceptMapProgress } from '../concept-maps/conceptMaps.storage';
import { getAllExperimentProgress } from '../experiment-lab/experiment.storage';

import {
  ExploreViewModel,
  DiscoveryItem,
  DiscoveryType,
  DiscoveryTopicId,
  EverydayScienceItem,
  RecentlyViewedEntry,
  FavoriteEntry,
  ExploreRecommendation,
  RecommendationReason,
  DailyDiscoveryEntry,
  ExploreFilterState,
  SortOption,
  ActivityTypeFilter,
} from './explore.types';
import { SCIENTISTS, getScientistById } from './explore.scientists';
import { INVENTIONS, getInventionById } from './explore.inventions';
import { EVERYDAY_SCIENCE } from './explore.everydayScience';
import { DISCOVERY_TOPICS, getDailyDiscovery, getTodayKey } from './explore.discoveryData';
import { getFavorites, getRecentlyViewed } from './explore.storage';

// ============================================================================
// Discovery Item Builders
// ============================================================================

function buildMicroLessonItems(): DiscoveryItem[] {
  return MICRO_LESSONS.map((ml) => ({
    id: ml.id,
    type: 'micro_lesson' as DiscoveryType,
    title: ml.title,
    description: ml.description,
    topicId: ml.subject as DiscoveryTopicId,
    tags: [ml.subject, ml.category, 'micro lesson'],
    route: `/micro-lesson/${ml.id}`,
    durationMinutes: ml.durationMinutes,
    isSaveable: true,
    icon: ml.icon,
    meta: { en: `${ml.durationMinutes} min · ${ml.subject}`, ta: `${ml.durationMinutes} நிமிடம் · ${ml.subject}` },
  }));
}

function buildConceptMapItems(): DiscoveryItem[] {
  return CONCEPT_MAPS.map((cm) => ({
    id: cm.id,
    type: 'concept_map' as DiscoveryType,
    title: cm.title,
    description: cm.description,
    topicId: cm.subject as DiscoveryTopicId,
    tags: [cm.subject, cm.category, 'concept map', ...cm.tags],
    route: `/concept-map/${cm.id}`,
    durationMinutes: cm.estimatedMinutes,
    isSaveable: true,
    icon: cm.icon,
    meta: { en: `${cm.nodes.length} concepts · ${cm.estimatedMinutes} min`, ta: `${cm.nodes.length} கருத்துகள் · ${cm.estimatedMinutes} நிமிடம்` },
  }));
}

function buildExperimentItems(): DiscoveryItem[] {
  return EXPERIMENTS.map((exp) => ({
    id: exp.id,
    type: 'experiment' as DiscoveryType,
    title: exp.title,
    description: exp.description,
    topicId: exp.subject as DiscoveryTopicId,
    tags: [exp.subject, 'experiment', 'simulation', ...exp.tags],
    route: `/experiment/${exp.id}`,
    durationMinutes: exp.durationMinutes,
    isSaveable: true,
    icon: exp.heroAsset || '🧪',
    meta: { en: `${exp.durationMinutes} min · ${exp.difficulty}`, ta: `${exp.durationMinutes} நிமிடம் · ${exp.difficulty}` },
  }));
}

function buildMysteryItems(): DiscoveryItem[] {
  return getMysteryCases().map((mc) => ({
    id: mc.id,
    type: 'mystery' as DiscoveryType,
    title: mc.title,
    description: mc.description,
    topicId: mc.category as DiscoveryTopicId,
    tags: [mc.category, 'mystery'],
    route: '/mystery-lab',
    params: { caseId: mc.id },
    durationMinutes: mc.estimatedMinutes,
    isSaveable: true,
    icon: '🕵️',
    meta: { en: mc.difficulty, ta: mc.difficulty },
  }));
}

function buildGameItems(): DiscoveryItem[] {
  return GAMES_REGISTRY.map((g) => ({
    id: g.id,
    type: 'game' as DiscoveryType,
    title: g.title,
    description: g.subtitle,
    topicId: 'physics' as DiscoveryTopicId, // games span multiple topics
    tags: [g.category, 'game', ...(g.tags || [])],
    route: g.route,
    isSaveable: true,
    icon: g.icon,
    accentColor: g.accentColor,
    meta: g.subtitle,
  }));
}

function buildRiddleItems(): DiscoveryItem[] {
  return RIDDLE_CATEGORIES.map((rc) => ({
    id: rc.id,
    type: 'riddle' as DiscoveryType,
    title: rc.title,
    description: rc.description,
    topicId: 'physics' as DiscoveryTopicId,
    tags: ['riddle', 'brain teaser'],
    route: '/riddles',
    params: { difficulty: rc.id },
    isSaveable: true,
    icon: rc.icon,
  }));
}

function buildFunFactItems(): DiscoveryItem[] {
  return FUN_FACTS.slice(0, 30).map((ff) => ({
    id: ff.id,
    type: 'fun_fact' as DiscoveryType,
    title: { en: ff.fact.en.slice(0, 80), ta: ff.fact.ta.slice(0, 80) },
    description: { en: ff.fact.en, ta: ff.fact.ta },
    topicId: 'physics' as DiscoveryTopicId,
    tags: [...ff.tags, ff.category],
    route: '/fun-facts',
    isSaveable: true,
    icon: ff.icon || '✨',
    meta: { en: ff.category, ta: ff.category },
  }));
}

function buildScientistItems(): DiscoveryItem[] {
  return SCIENTISTS.map((s) => ({
    id: s.id,
    type: 'scientist' as DiscoveryType,
    title: s.name,
    description: s.shortBio,
    topicId: s.field,
    tags: [s.field, 'scientist', ...s.relatedTopics],
    route: `/explore/scientist/${s.id}`,
    isSaveable: true,
    icon: s.icon,
    accentColor: s.accentColor,
    meta: { en: s.keyContribution.en.slice(0, 60), ta: s.keyContribution.ta.slice(0, 60) },
  }));
}

function buildInventionItems(): DiscoveryItem[] {
  return INVENTIONS.map((i) => ({
    id: i.id,
    type: 'invention' as DiscoveryType,
    title: i.name,
    description: i.description,
    topicId: i.field,
    tags: [i.field, 'invention', ...i.relatedTopics],
    route: `/explore/invention/${i.id}`,
    isSaveable: true,
    icon: i.icon,
    accentColor: i.accentColor,
    meta: { en: i.inventor.en, ta: i.inventor.ta },
  }));
}

function buildEverydayScienceItems(): DiscoveryItem[] {
  return EVERYDAY_SCIENCE.map((es) => ({
    id: es.id,
    type: 'everyday_science' as DiscoveryType,
    title: es.title,
    description: es.description,
    topicId: es.field,
    tags: es.tags,
    route: '/fun-facts',
    isSaveable: true,
    icon: es.icon,
    meta: es.sciencePrinciple,
  }));
}

// ============================================================================
// All Discovery Items
// ============================================================================

let cachedDiscoveryItems: DiscoveryItem[] | null = null;

export function clearDiscoveryItemsCacheForTesting(): void {
  cachedDiscoveryItems = null;
}

export function getAllDiscoveryItems(): DiscoveryItem[] {
  if (cachedDiscoveryItems) {
    return cachedDiscoveryItems;
  }
  const rawItems = [
    ...buildMicroLessonItems(),
    ...buildConceptMapItems(),
    ...buildExperimentItems(),
    ...buildMysteryItems(),
    ...buildGameItems(),
    ...buildRiddleItems(),
    ...buildFunFactItems(),
    ...buildScientistItems(),
    ...buildInventionItems(),
    ...buildEverydayScienceItems(),
  ];

  cachedDiscoveryItems = rawItems.map((item) =>
    Object.assign(item, {
      _titleEnLower: item.title.en.toLowerCase(),
      _titleTaLower: item.title.ta.toLowerCase(),
      _descEnLower: item.description.en.toLowerCase(),
      _descTaLower: item.description.ta.toLowerCase(),
      _tagsLower: item.tags.map((t) => t.toLowerCase()),
    })
  );

  return cachedDiscoveryItems;
}

// ============================================================================
// Continue Discovering
// ============================================================================

async function buildContinueDiscovering(): Promise<DiscoveryItem[]> {
  const allItems = getAllDiscoveryItems();
  const results: DiscoveryItem[] = [];

  try {
    const [mlProgress, cmProgress, expProgress] = await Promise.all([
      getAllMicroLessonsProgress(),
      getAllConceptMapProgress(),
      getAllExperimentProgress(),
    ]);

    // In-progress micro lessons
    for (const [id, progress] of Object.entries(mlProgress)) {
      if (progress && typeof progress === 'object' && 'status' in progress && (progress as { status?: string }).status === 'in_progress') {
        const item = allItems.find((i) => i.id === id && i.type === 'micro_lesson');
        if (item) results.push(item);
      }
    }

    // In-progress concept maps
    for (const [id, progress] of Object.entries(cmProgress)) {
      if (progress && typeof progress === 'object' && 'status' in progress && (progress as { status?: string }).status === 'in_progress') {
        const item = allItems.find((i) => i.id === id && i.type === 'concept_map');
        if (item) results.push(item);
      }
    }

    // Incomplete experiments
    for (const [id, progress] of Object.entries(expProgress)) {
      if (progress && typeof progress === 'object' && 'completed' in progress && !(progress as { completed?: boolean }).completed) {
        const item = allItems.find((i) => i.id === id && i.type === 'experiment');
        if (item) results.push(item);
      }
    }
  } catch {
    // Graceful fallback — return empty continue list
  }

  return results.slice(0, 5);
}

// ============================================================================
// Recommendations
// ============================================================================

function buildExploreRecommendations(
  allItems: DiscoveryItem[],
  recentActivity: Array<{ type: string }>,
  continueItems: DiscoveryItem[]
): ExploreRecommendation[] {
  const recs: ExploreRecommendation[] = [];

  // Priority 1: Continue items
  for (const item of continueItems.slice(0, 2)) {
    recs.push({
      item,
      reason: 'continue',
      reasonText: { en: 'Continue exploring', ta: 'ஆராய்வதைத் தொடருங்கள்' },
    });
  }

  // Priority 2: Related topic based on recent activity
  const activityTypes = recentActivity.map((a) => a.type);
  if (activityTypes.includes('quiz_completed')) {
    const physicsItems = allItems.filter((i) => i.topicId === 'physics' && i.type === 'concept_map');
    if (physicsItems.length > 0) {
      recs.push({
        item: physicsItems[0],
        reason: 'related',
        reasonText: { en: 'Because you practiced Physics', ta: 'இயற்பியலை பயிற்சி செய்ததால்' },
      });
    }
  }

  // Priority 3: New topic suggestion
  const exploredTopics = new Set(allItems.filter((i) => continueItems.some((c) => c.topicId === i.topicId)).map((i) => i.topicId));
  const unexploredTopics = DISCOVERY_TOPICS.filter((t) => !exploredTopics.has(t.id));
  if (unexploredTopics.length > 0) {
    const topic = unexploredTopics[0];
    const topicItem = allItems.find((i) => i.topicId === topic.id);
    if (topicItem) {
      recs.push({
        item: topicItem,
        reason: 'new_topic',
        reasonText: { en: `Try ${topic.title.en}`, ta: `${topic.title.ta} முயற்சிக்கவும்` },
      });
    }
  }

  // Priority 4: Daily discovery
  const daily = getDailyDiscovery();
  recs.push({
    item: {
      id: daily.id,
      type: daily.type as DiscoveryType,
      title: daily.title,
      description: daily.description,
      topicId: daily.topicId,
      tags: ['daily'],
      route: daily.route,
      params: daily.params,
      isSaveable: false,
      icon: daily.icon,
    },
    reason: 'daily',
    reasonText: { en: "Today's discovery", ta: 'இன்றைய கண்டுபிடிப்பு' },
  });

  return recs.slice(0, 6);
}

// ============================================================================
// Topic Groups with counts
// ============================================================================

function buildTopicGroups(allItems: DiscoveryItem[]) {
  return DISCOVERY_TOPICS.map((topic) => ({
    ...topic,
    discoveryCount: allItems.filter((i) => i.topicId === topic.id).length,
  }));
}

// ============================================================================
// Activity Groups
// ============================================================================

function buildActivityGroups(allItems: DiscoveryItem[]) {
  const groups: Array<{
    id: string;
    title: { en: string; ta: string };
    icon: string;
    items: DiscoveryItem[];
  }> = [
    { id: 'learn', title: { en: 'Lessons & Maps', ta: 'பாடங்கள் & வரைபடங்கள்' }, icon: '📖', items: [] },
    { id: 'experiments', title: { en: 'Experiments', ta: 'சோதனைகள்' }, icon: '🧪', items: [] },
    { id: 'facts', title: { en: 'Fun Facts', ta: 'சுவாரஸ்ய தகவல்கள்' }, icon: '✨', items: [] },
    { id: 'mysteries', title: { en: 'Mysteries', ta: 'மர்மங்கள்' }, icon: '🕵️', items: [] },
    { id: 'games', title: { en: 'Games', ta: 'ஆட்டங்கள்' }, icon: '🎮', items: [] },
    { id: 'riddles', title: { en: 'Riddles', ta: 'புதிர்கள்' }, icon: '🧩', items: [] },
    { id: 'scientists', title: { en: 'Scientists', ta: 'விஞ்ஞானிகள்' }, icon: '👩‍🔬', items: [] },
    { id: 'inventions', title: { en: 'Inventions', ta: 'கண்டுபிடிப்புகள்' }, icon: '💡', items: [] },
    { id: 'everyday_science', title: { en: 'Everyday Science', ta: 'தினசரி அறிவியல்' }, icon: '🔍', items: [] },
  ];

  for (const item of allItems) {
    const group = groups.find((g) => g.id === item.type);
    if (group) {
      group.items.push(item);
    }
  }

  return groups.filter((g) => g.items.length > 0);
}

// ============================================================================
// Collection Integration
// ============================================================================

async function buildCollections() {
  try {
    const progress = await getAllCollectionProgress();
    return GAME_COLLECTIONS.map((c) => ({
      id: c.id,
      title: c.title,
      icon: c.icon,
      progress: 0,
      totalItems: 10,
    }));
  } catch {
    return [];
  }
}

// ============================================================================
// Main ViewModel Builder
// ============================================================================

export async function getExploreViewModel(): Promise<ExploreViewModel> {
  try {
    const allItems = getAllDiscoveryItems();
    const [continueItems, recentViewed, favorites, activityHistory] = await Promise.all([
      buildContinueDiscovering(),
      getRecentlyViewed(),
      getFavorites(),
      getActivityHistory().catch(() => []),
    ]);

    const collections = await buildCollections();

    // Build view model sections
    const dailyDiscovery = getDailyDiscovery();
    const featured = allItems.find((i) => i.id === dailyDiscovery.id) || allItems[0] || null;
    const topicGroups = buildTopicGroups(allItems);
    const activityGroups = buildActivityGroups(allItems);
    const funFact = getDailyFact() as unknown as EverydayScienceItem;
    const recommendations = buildExploreRecommendations(allItems, activityHistory, continueItems);

    return {
      featured,
      dailyDiscovery,
      continueDiscovering: continueItems,
      topicGroups,
      activityGroups,
      collections,
      recentlyViewed: recentViewed,
      favorites,
      recommendations,
      funFact: { ...funFact, field: 'physics' as DiscoveryTopicId },
      scientists: SCIENTISTS,
      inventions: INVENTIONS,
      everydayScience: EVERYDAY_SCIENCE,
      searchResults: [],
      loading: false,
      empty: false,
      error: null,
    };
  } catch (error) {
    return {
      featured: null,
      dailyDiscovery: null,
      continueDiscovering: [],
      topicGroups: DISCOVERY_TOPICS,
      activityGroups: [],
      collections: [],
      recentlyViewed: [],
      favorites: [],
      recommendations: [],
      funFact: null,
      scientists: SCIENTISTS,
      inventions: INVENTIONS,
      everydayScience: EVERYDAY_SCIENCE,
      searchResults: [],
      loading: false,
      empty: false,
      error: error instanceof Error ? error.message : 'Failed to load explore data',
    };
  }
}

// ============================================================================
// Search Integration
// ============================================================================

/**
 * Search across all discovery items. Uses existing search engine.
 */
export function searchDiscoveries(
  query: string,
  items: DiscoveryItem[],
  language: SupportedLanguage = 'en',
  limit: number = 50
): DiscoveryItem[] {
  if (!query.trim()) return [];

  const q = query.toLowerCase().trim();

  const scored = items
    .map((item) => {
      const enriched = item as DiscoveryItem & {
        _titleEnLower?: string;
        _titleTaLower?: string;
        _descEnLower?: string;
        _descTaLower?: string;
        _tagsLower?: string[];
      };
      const titleLower = language === 'ta'
        ? (enriched._titleTaLower ?? item.title.ta.toLowerCase())
        : (enriched._titleEnLower ?? item.title.en.toLowerCase());
      const descLower = language === 'ta'
        ? (enriched._descTaLower ?? item.description.ta.toLowerCase())
        : (enriched._descEnLower ?? item.description.en.toLowerCase());
      const tagsLower: string[] = enriched._tagsLower ?? item.tags.map((t) => t.toLowerCase());

      let score = 0;

      // Exact title match
      if (titleLower === q) score = 100;
      // Title prefix
      else if (titleLower.startsWith(q)) score = 80;
      // Title contains
      else if (titleLower.includes(q)) score = 60;
      // Tag exact
      else if (tagsLower.some((t) => t === q)) score = 50;
      // Tag prefix
      else if (tagsLower.some((t) => t.startsWith(q))) score = 40;
      // Tag contains
      else if (tagsLower.some((t) => t.includes(q))) score = 30;
      // Description contains
      else if (descLower.includes(q)) score = 20;

      return { item, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score || a.item.title.en.localeCompare(b.item.title.en));

  return scored.slice(0, limit).map((s) => s.item);
}

// ============================================================================
// Filter & Sort
// ============================================================================

export function filterDiscoveries(
  items: DiscoveryItem[],
  filter: ExploreFilterState
): DiscoveryItem[] {
  let result = items;

  // Topic filter
  if (filter.topicFilter !== 'all') {
    result = result.filter((i) => i.topicId === filter.topicFilter);
  }

  // Activity type filter
  if (filter.activityFilter !== 'all') {
    const typeMap: Record<string, DiscoveryType[]> = {
      learn: ['micro_lesson', 'concept_map'],
      experiments: ['experiment'],
      facts: ['fun_fact'],
      mysteries: ['mystery'],
      games: ['game'],
      riddles: ['riddle'],
      collections: ['collection'],
      scientists: ['scientist'],
      inventions: ['invention'],
    };
    const types = typeMap[filter.activityFilter];
    if (types) {
      result = result.filter((i) => types.includes(i.type));
    }
  }

  // Search query
  if (filter.query.trim()) {
    result = searchDiscoveries(filter.query, result);
  }

  // Sort
  result = sortDiscoveries(result, filter.sortOption);

  return result;
}

function sortDiscoveries(items: DiscoveryItem[], sort: SortOption): DiscoveryItem[] {
  const sorted = [...items];
  switch (sort) {
    case 'alpha':
      return sorted.sort((a, b) => a.title.en.localeCompare(b.title.en));
    case 'newest':
      // Deterministic: use ID-based stable sort
      return sorted.sort((a, b) => a.id.localeCompare(b.id));
    case 'recommended':
    default:
      // Keep natural order (from source arrays = deterministic)
      return sorted;
  }
}
