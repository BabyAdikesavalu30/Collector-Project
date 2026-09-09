/**
 * Search Feature Indexer
 * Builds the searchable catalog from every product content source. All
 * sources are static registries except certificates, which are passed in
 * (they come from local storage). Indexing is deterministic.
 */

import { GAMES_REGISTRY, GAME_COLLECTIONS } from '../games/games.registry';
import { RIDDLE_CATEGORIES } from '../riddles/riddle.mock';
import { FUN_FACTS, FACT_COLLECTIONS } from '../fun-facts/fun-facts.mock';
import { getMysteryCases } from '../mystery-lab/mystery.cases';
import { MYSTERY_COLLECTIONS } from '../mystery-lab/mystery.registry';
import { ACHIEVEMENT_BADGES } from '../achievements';
import { Certificate } from '../certificates';
import { MICRO_LESSONS } from '../micro-lessons';
import { CONCEPT_MAPS } from '../concept-maps';
import { EXPERIMENTS } from '../experiment-lab/experiment.data';
import { SCIENTISTS } from '../explore/explore.scientists';
import { INVENTIONS } from '../explore/explore.inventions';
import { EVERYDAY_SCIENCE } from '../explore/explore.everydayScience';
import { SearchCategory, SearchIndex, SearchItem } from './search.types';
import { normalizeText } from './search.engine';

/** Fact catalog is huge (150+); index a deterministic subset for snappy search. */
const FACT_INDEX_LIMIT = 60;

const CATEGORY_LABELS: Record<SearchCategory, { en: string; ta: string }> = {
  game: { en: 'Game', ta: 'விளையாட்டு' },
  riddle: { en: 'Riddle', ta: 'புதிர்' },
  fact: { en: 'Fun Fact', ta: 'சுவாரஸ்ய தகவல்' },
  mystery: { en: 'Mystery', ta: 'மர்மம்' },
  achievement: { en: 'Achievement', ta: 'சாதனை' },
  certificate: { en: 'Certificate', ta: 'சான்றிதழ்' },
  collection: { en: 'Collection', ta: 'தொகுப்பு' },
  explore: { en: 'Explore', ta: 'ஆராய்க' },
  micro_lesson: { en: 'Micro Lesson', ta: 'நுண்ணிய பாடம்' },
  concept_map: { en: 'Concept Map', ta: 'கருத்து வரைபடம்' },
  experiment: { en: 'Experiment', ta: 'பரிசோதனை' },
  scientist: { en: 'Scientist', ta: 'விஞ்ஞானி' },
  invention: { en: 'Invention', ta: 'கண்டுபிடிப்பு' },
  everyday_science: { en: 'Everyday Science', ta: 'தினசரி அறிவியல்' },
};

function enrichSearchItem(item: SearchItem): SearchItem {
  item._normTitleEn = normalizeText(item.title);
  item._normTitleTa = normalizeText(item.titleTa);
  item._normSubtitleEn = normalizeText(item.subtitle);
  item._normSubtitleTa = normalizeText(item.subtitleTa);
  item._normTags = normalizeText(item.tags.join(' '));
  item._normCategoryEn = normalizeText(item.categoryLabel);
  item._normCategoryTa = normalizeText(item.categoryLabelTa);
  return item;
}

let cachedStaticSearchItems: SearchItem[] | null = null;

export function clearStaticSearchIndexCacheForTesting(): void {
  cachedStaticSearchItems = null;
}

function buildStaticSearchItems(): SearchItem[] {
  const items: SearchItem[] = [];

  // ── Games ──────────────────────────────────────────────────────────────
  for (const game of GAMES_REGISTRY) {
    items.push({
      id: `game-${game.id}`,
      category: 'game',
      title: game.title.en,
      titleTa: game.title.ta,
      subtitle: game.subtitle.en,
      subtitleTa: game.subtitle.ta,
      route: game.route,
      icon: game.icon,
      tags: [...(game.tags || []), game.category],
      categoryLabel: CATEGORY_LABELS.game.en,
      categoryLabelTa: CATEGORY_LABELS.game.ta,
    });
  }

  // ── Riddles (categories) ───────────────────────────────────────────────
  for (const category of RIDDLE_CATEGORIES) {
    items.push({
      id: `riddle-${category.id}`,
      category: 'riddle',
      title: category.title.en,
      titleTa: category.title.ta,
      subtitle: category.description.en,
      subtitleTa: category.description.ta,
      route: '/riddles',
      params: { difficulty: category.id },
      icon: category.icon,
      tags: ['riddle', 'brain teaser', category.id],
      categoryLabel: CATEGORY_LABELS.riddle.en,
      categoryLabelTa: CATEGORY_LABELS.riddle.ta,
    });
  }

  // ── Fun Facts (deterministic subset) ───────────────────────────────────
  for (const fact of FUN_FACTS.slice(0, FACT_INDEX_LIMIT)) {
    items.push({
      id: `fact-${fact.id}`,
      category: 'fact',
      title: fact.fact.en.slice(0, 80),
      titleTa: fact.fact.ta.slice(0, 80),
      subtitle: fact.category,
      subtitleTa: fact.category,
      route: '/fun-facts',
      icon: fact.icon || '✨',
      tags: [...fact.tags, fact.category],
      categoryLabel: CATEGORY_LABELS.fact.en,
      categoryLabelTa: CATEGORY_LABELS.fact.ta,
    });
  }

  // ── Mystery Lab cases ──────────────────────────────────────────────────
  const cases = getMysteryCases();
  for (const mysteryCase of cases) {
    items.push({
      id: `mystery-${mysteryCase.id}`,
      category: 'mystery',
      title: mysteryCase.title.en,
      titleTa: mysteryCase.title.ta,
      subtitle: mysteryCase.description.en,
      subtitleTa: mysteryCase.description.ta,
      route: '/mystery-lab',
      params: { caseId: mysteryCase.id },
      icon: '🕵️',
      tags: [mysteryCase.category, 'mystery', 'case'],
      categoryLabel: CATEGORY_LABELS.mystery.en,
      categoryLabelTa: CATEGORY_LABELS.mystery.ta,
    });
  }

  // ── Achievements ───────────────────────────────────────────────────────
  for (const badge of ACHIEVEMENT_BADGES) {
    items.push({
      id: `achievement-${badge.id}`,
      category: 'achievement',
      title: badge.title.en,
      titleTa: badge.title.ta,
      subtitle: badge.hint.en,
      subtitleTa: badge.hint.ta,
      route: '/achievements',
      icon: badge.icon,
      tags: ['achievement', 'badge', badge.category],
      categoryLabel: CATEGORY_LABELS.achievement.en,
      categoryLabelTa: CATEGORY_LABELS.achievement.ta,
    });
  }


  // ── Collections ────────────────────────────────────────────────────────
  for (const collection of GAME_COLLECTIONS) {
    items.push({
      id: `collection-${collection.id}`,
      category: 'collection',
      title: collection.title.en,
      titleTa: collection.title.ta,
      subtitle: collection.description.en,
      subtitleTa: collection.description.ta,
      route: '/games',
      icon: collection.icon,
      tags: ['collection', 'games'],
      categoryLabel: CATEGORY_LABELS.collection.en,
      categoryLabelTa: CATEGORY_LABELS.collection.ta,
    });
  }
  for (const collection of MYSTERY_COLLECTIONS) {
    items.push({
      id: `collection-${collection.id}`,
      category: 'collection',
      title: collection.title.en,
      titleTa: collection.title.ta,
      subtitle: collection.description.en,
      subtitleTa: collection.description.ta,
      route: '/mystery-lab',
      icon: collection.icon,
      tags: ['collection', 'mystery', collection.category],
      categoryLabel: CATEGORY_LABELS.collection.en,
      categoryLabelTa: CATEGORY_LABELS.collection.ta,
    });
  }
  for (const collection of FACT_COLLECTIONS) {
    items.push({
      id: `collection-${collection.id}`,
      category: 'collection',
      title: collection.title.en,
      titleTa: collection.title.ta,
      subtitle: collection.description.en,
      subtitleTa: collection.description.ta,
      route: '/fun-facts',
      icon: collection.icon,
      tags: ['collection', 'facts'],
      categoryLabel: CATEGORY_LABELS.collection.en,
      categoryLabelTa: CATEGORY_LABELS.collection.ta,
    });
  }

  // ── Micro Lessons ──────────────────────────────────────────────────────
  for (const lesson of MICRO_LESSONS) {
    items.push({
      id: `micro-${lesson.id}`,
      category: 'micro_lesson',
      title: lesson.title.en,
      titleTa: lesson.title.ta,
      subtitle: `${lesson.durationMinutes} min · ${lesson.category}`,
      subtitleTa: `${lesson.durationMinutes} நிமிடம் · ${lesson.category}`,
      route: `/micro-lesson/${lesson.id}`,
      icon: lesson.icon,
      tags: ['micro lesson', 'quick learn', lesson.subject, lesson.category],
      categoryLabel: CATEGORY_LABELS.micro_lesson.en,
      categoryLabelTa: CATEGORY_LABELS.micro_lesson.ta,
    });
  }

  // ── Concept Maps ────────────────────────────────────────────────────────
  for (const map of CONCEPT_MAPS) {
    items.push({
      id: `concept-map-${map.id}`,
      category: 'concept_map',
      title: map.title.en,
      titleTa: map.title.ta,
      subtitle: `${map.nodes.length} concepts · ${map.estimatedMinutes} min`,
      subtitleTa: `${map.nodes.length} கருத்துக்கள் · ${map.estimatedMinutes} நிமிடம்`,
      route: `/concept-map/${map.id}`,
      icon: map.icon,
      tags: ['concept map', 'visual science', map.subject, map.category, ...map.tags],
      categoryLabel: CATEGORY_LABELS.concept_map.en,
      categoryLabelTa: CATEGORY_LABELS.concept_map.ta,
    });
  }

  // ── Experiments ─────────────────────────────────────────────────────────
  for (const exp of EXPERIMENTS) {
    items.push({
      id: `exp-${exp.id}`,
      category: 'experiment',
      title: exp.title.en,
      titleTa: exp.title.ta,
      subtitle: `${exp.durationMinutes} min · ${exp.subject.toUpperCase()} simulation`,
      subtitleTa: `${exp.durationMinutes} நிமிடம் · ${exp.subject.toUpperCase()} மாதிரி`,
      route: `/experiment/${exp.id}`,
      icon: exp.heroAsset || '🧪',
      tags: ['experiment', 'simulation', 'virtual lab', exp.subject, ...exp.tags],
      categoryLabel: CATEGORY_LABELS.experiment.en,
      categoryLabelTa: CATEGORY_LABELS.experiment.ta,
    });
  }

  // ── Scientists ──────────────────────────────────────────────────────────
  for (const scientist of SCIENTISTS) {
    items.push({
      id: `scientist-${scientist.id}`,
      category: 'scientist',
      title: scientist.name.en,
      titleTa: scientist.name.ta,
      subtitle: scientist.keyContribution.en,
      subtitleTa: scientist.keyContribution.ta,
      route: `/explore/scientist/${scientist.id}`,
      icon: scientist.icon,
      tags: ['scientist', scientist.field, ...scientist.relatedTopics],
      categoryLabel: CATEGORY_LABELS.scientist.en,
      categoryLabelTa: CATEGORY_LABELS.scientist.ta,
    });
  }

  // ── Inventions ──────────────────────────────────────────────────────────
  for (const invention of INVENTIONS) {
    items.push({
      id: `invention-${invention.id}`,
      category: 'invention',
      title: invention.name.en,
      titleTa: invention.name.ta,
      subtitle: invention.description.en.slice(0, 80),
      subtitleTa: invention.description.ta.slice(0, 80),
      route: `/explore/invention/${invention.id}`,
      icon: invention.icon,
      tags: ['invention', invention.field, ...invention.relatedTopics],
      categoryLabel: CATEGORY_LABELS.invention.en,
      categoryLabelTa: CATEGORY_LABELS.invention.ta,
    });
  }

  // ── Everyday Science ────────────────────────────────────────────────────
  for (const es of EVERYDAY_SCIENCE) {
    items.push({
      id: `everyday-${es.id}`,
      category: 'everyday_science',
      title: es.title.en,
      titleTa: es.title.ta,
      subtitle: es.description.en,
      subtitleTa: es.description.ta,
      route: '/fun-facts',
      icon: es.icon,
      tags: ['everyday science', es.field, ...es.tags],
      categoryLabel: CATEGORY_LABELS.everyday_science.en,
      categoryLabelTa: CATEGORY_LABELS.everyday_science.ta,
    });
  }

  return items.map(enrichSearchItem);
}

export function buildSearchIndex(certificates: Certificate[] = []): SearchIndex {
  if (!cachedStaticSearchItems) {
    cachedStaticSearchItems = buildStaticSearchItems();
  }

  const certItems: SearchItem[] = certificates.map((certificate) =>
    enrichSearchItem({
      id: `certificate-${certificate.id}`,
      category: 'certificate',
      title: certificate.title.en,
      titleTa: certificate.title.ta,
      subtitle: certificate.subtitle.en,
      subtitleTa: certificate.subtitle.ta,
      route: `/certificate/${certificate.id}`,
      icon: '📜',
      tags: ['certificate', certificate.kind, certificate.subjectId || 'milestone'],
      categoryLabel: CATEGORY_LABELS.certificate.en,
      categoryLabelTa: CATEGORY_LABELS.certificate.ta,
    })
  );

  return {
    items: [...cachedStaticSearchItems, ...certItems],
    suggestedQueries: ['Physics', 'Chemistry', 'Space', 'Circuit', 'DNA', 'Quiz', 'Newton', 'Photosynthesis', 'Ohm'],
  };
}