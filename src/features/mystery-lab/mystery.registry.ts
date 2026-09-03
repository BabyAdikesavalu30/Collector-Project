/**
 * Vigyaan Mystery Lab — Registry
 * Collections, badges, recommendations, and metadata for the Mystery Lab feature.
 */

import {
  MysteryCollection,
  MysteryBadge,
  MysteryRecommendation,
  MysteryCategory,
} from './mystery.types';

// ============================================================================
// Collections
// ============================================================================

export const MYSTERY_COLLECTIONS: MysteryCollection[] = [
  {
    id: 'col-physics-mysteries',
    title: { en: 'Physics Mysteries', ta: 'இயற்பியல் மர்மங்கள்' },
    description: { en: 'Investigate circuits, forces, motion, light, and energy.', ta: 'மின்சுற்றுகள், விசைகள், இயக்கம், ஒளி மற்றும் ஆற்றலை ஆய்வு செய்யுங்கள்.' },
    icon: '⚡',
    accentColor: '#2563EB',
    category: 'physics',
  },
  {
    id: 'col-chemistry-mysteries',
    title: { en: 'Chemistry Mysteries', ta: 'வேதியியல் மர்மங்கள்' },
    description: { en: 'Explore acids, bases, reactions, and matter.', ta: 'அமிலங்கள், காரங்கள், வினைகள் மற்றும் பொருளை ஆராயுங்கள்.' },
    icon: '🧪',
    accentColor: '#7E22CE',
    category: 'chemistry',
  },
  {
    id: 'col-biology-mysteries',
    title: { en: 'Biology Mysteries', ta: 'உயிரியல் மர்மங்கள்' },
    description: { en: 'Discover cells, plants, ecosystems, and genetics.', ta: 'உயிரணுகள், தாவரங்கள், சுற்றுச்சூழல் அமைப்புகள் மற்றும் மரபியலை கண்டறியுங்கள்.' },
    icon: '🧬',
    accentColor: '#16A34A',
    category: 'biology',
  },
  {
    id: 'col-space-mysteries',
    title: { en: 'Space Mysteries', ta: 'விண்வெளி மர்மங்கள்' },
    description: { en: 'Explore planets, stars, orbits, and cosmic phenomena.', ta: 'கிரகங்கள், நட்சத்திரங்கள், சுற்றுப்பாதைகள் மற்றும் பிரபஞ்ச நிகழ்வுகளை ஆராயுங்கள்.' },
    icon: '🪐',
    accentColor: '#4F46E5',
    category: 'space',
  },
  {
    id: 'col-environment-mysteries',
    title: { en: 'Environmental Investigations', ta: 'சுற்றுச்சூழல் விசாரணைகள்' },
    description: { en: 'Investigate water, pollution, climate, and ecosystems.', ta: 'நீர், மாசுபாடு, காலநிலை மற்றும் சுற்றுச்சூழல் அமைப்புகளை ஆய்வு செய்யுங்கள்.' },
    icon: '🌿',
    accentColor: '#0D9488',
    category: 'environment',
  },
  {
    id: 'col-human-body-mysteries',
    title: { en: 'Human Body Mysteries', ta: 'மனித உடல் மர்மங்கள்' },
    description: { en: 'Explore the heart, brain, muscles, and body systems.', ta: 'இதயம், மூளை, தசைகள் மற்றும் உடல் அமைப்புகளை ஆராயுங்கள்.' },
    icon: '🫀',
    accentColor: '#DC2626',
    category: 'human-body',
  },
  {
    id: 'col-everyday-science',
    title: { en: 'Everyday Science', ta: 'தினசரி அறிவியல்' },
    description: { en: 'Investigate everyday phenomena through science.', ta: 'அறிவியல் மூலம் தினசரி நிகழ்வுகளை ஆய்வு செய்யுங்கள்.' },
    icon: '🔬',
    accentColor: '#D97706',
    category: 'everyday-science',
  },
];

// ============================================================================
// Badges (Future-ready)
// ============================================================================

export const MYSTERY_BADGES: MysteryBadge[] = [
  {
    id: 'mystery-first-case',
    title: { en: 'First Case Solved', ta: 'முதல் வழக்கு தீர்க்கப்பட்டது' },
    description: { en: 'Solved your first mystery case.', ta: 'உங்கள் முதல் மர்ம வழக்கை தீர்த்தீர்கள்.' },
    icon: '🔍',
    category: 'completion',
    requirement: 'solved_1_case',
    requirementDescription: { en: 'Solve 1 mystery case', ta: '1 மர்ம வழக்கை தீர்க்கவும்' },
  },
  {
    id: 'mystery-three-cases',
    title: { en: 'Three Cases Solved', ta: 'மூன்று வழக்குகள் தீர்க்கப்பட்டன' },
    description: { en: 'Solved three mystery cases.', ta: 'மூன்று மர்ம வழக்குகளை தீர்த்தீர்கள்.' },
    icon: '🔎',
    category: 'completion',
    requirement: 'solved_3_cases',
    requirementDescription: { en: 'Solve 3 mystery cases', ta: '3 மர்ம வழக்குகளை தீர்க்கவும்' },
  },
  {
    id: 'mystery-perfect',
    title: { en: 'Perfect Investigation', ta: 'துல்லியமான விசாரணை' },
    description: { en: 'Scored 100 with no hints on a case.', ta: 'குறிப்புகள் இல்லாமல் ஒரு வழக்கில் 100 பெற்றீர்கள்.' },
    icon: '⭐',
    category: 'mastery',
    requirement: 'perfect_investigation',
    requirementDescription: { en: 'Score 100 with no hints', ta: 'குறிப்புகள் இல்லாமல் 100 பெறுங்கள்' },
  },
  {
    id: 'mystery-detective',
    title: { en: 'Science Detective', ta: 'அறிவியல் கண்டுபிடிப்பாளர்' },
    description: { en: 'Solved 10 mystery cases.', ta: '10 மர்ம வழக்குகளை தீர்த்தீர்கள்.' },
    icon: '🕵️',
    category: 'completion',
    requirement: 'solved_10_cases',
    requirementDescription: { en: 'Solve 10 mystery cases', ta: '10 மர்ம வழக்குகளை தீர்க்கவும்' },
  },
  {
    id: 'mystery-evidence-expert',
    title: { en: 'Evidence Expert', ta: 'ஆதார நிபுணர்' },
    description: { en: 'Selected all essential evidence correctly in a case.', ta: 'ஒரு வழக்கில் அனைத்து அத்தியாவசிய ஆதாரங்களையும் சரியாகத் தேர்ந்தெடுத்தீர்கள்.' },
    icon: '📋',
    category: 'mastery',
    requirement: 'perfect_evidence',
    requirementDescription: { en: 'Select all essential evidence correctly', ta: 'அனைத்து அத்தியாவசிய ஆதாரங்களையும் சரியாகத் தேர்ந்தெடுக்கவும்' },
  },
  {
    id: 'mystery-streak-7',
    title: { en: 'Seven Day Streak', ta: '7 நாள் தொடர்ச்சி' },
    description: { en: 'Maintained a 7-day investigation streak.', ta: '7 நாள் விசாரணை தொடர்ச்சியை பராமரித்தீர்கள்.' },
    icon: '🔥',
    category: 'streak',
    requirement: '7_day_streak',
    requirementDescription: { en: 'Maintain 7-day investigation streak', ta: '7 நாள் விசாரணை தொடர்ச்சியை பராமரிக்கவும்' },
  },
  {
    id: 'mystery-physics',
    title: { en: 'Physics Investigator', ta: 'இயற்பியல் விசாரணையாளர்' },
    description: { en: 'Solved 5 physics mystery cases.', ta: '5 இயற்பியல் மர்ம வழக்குகளை தீர்த்தீர்கள்.' },
    icon: '⚡',
    category: 'mastery',
    requirement: 'solved_5_physics',
    requirementDescription: { en: 'Solve 5 physics cases', ta: '5 இயற்பியல் வழக்குகளை தீர்க்கவும்' },
  },
  {
    id: 'mystery-chemistry',
    title: { en: 'Chemistry Investigator', ta: 'வேதியியல் விசாரணையாளர்' },
    description: { en: 'Solved 5 chemistry mystery cases.', ta: '5 வேதியியல் மர்ம வழக்குகளை தீர்த்தீர்கள்.' },
    icon: '🧪',
    category: 'mastery',
    requirement: 'solved_5_chemistry',
    requirementDescription: { en: 'Solve 5 chemistry cases', ta: '5 வேதியியல் வழக்குகளை தீர்க்கவும்' },
  },
  {
    id: 'mystery-biology',
    title: { en: 'Biology Investigator', ta: 'உயிரியல் விசாரணையாளர்' },
    description: { en: 'Solved 5 biology mystery cases.', ta: '5 உயிரியல் மர்ம வழக்குகளை தீர்த்தீர்கள்.' },
    icon: '🧬',
    category: 'mastery',
    requirement: 'solved_5_biology',
    requirementDescription: { en: 'Solve 5 biology cases', ta: '5 உயிரியல் வழக்குகளை தீர்க்கவும்' },
  },
  {
    id: 'mystery-space',
    title: { en: 'Space Detective', ta: 'விண்வெளி கண்டுபிடிப்பாளர்' },
    description: { en: 'Solved 5 space mystery cases.', ta: '5 விண்வெளி மர்ம வழக்குகளை தீர்த்தீர்கள்.' },
    icon: '🚀',
    category: 'mastery',
    requirement: 'solved_5_space',
    requirementDescription: { en: 'Solve 5 space cases', ta: '5 விண்வெளி வழக்குகளை தீர்க்கவும்' },
  },
  {
    id: 'mystery-master',
    title: { en: 'Mystery Master', ta: 'மர்ம மாஸ்டர்' },
    description: { en: 'Solved 25 mystery cases across all categories.', ta: 'அனைத்து வகைகளிலும் 25 மர்ம வழக்குகளை தீர்த்தீர்கள்.' },
    icon: '🏆',
    category: 'special',
    requirement: 'solved_25_cases',
    requirementDescription: { en: 'Solve 25 mystery cases total', ta: 'மொத்தம் 25 மர்ம வழக்குகளை தீர்க்கவும்' },
  },
];

// ============================================================================
// Deterministic Recommendations
// ============================================================================

export function getMysteryRecommendations(
  completedCaseIds: string[],
  lastCategory?: MysteryCategory
): MysteryRecommendation[] {
  const recommendations: MysteryRecommendation[] = [];

  // Rule-based recommendations (not AI)
  if (lastCategory === 'physics') {
    recommendations.push({
      caseId: 'physics-force-001',
      reason: { en: 'Since you enjoyed circuit mysteries, try investigating forces!', ta: 'மின்சுற்று மர்மங்களை ரசித்ததால், விசைகளை ஆய்வு செய்ய முயற்சிக்கவும்!' },
    });
  } else if (lastCategory === 'chemistry') {
    recommendations.push({
      caseId: 'chemistry-density-001',
      reason: { en: 'Continue your chemistry investigation with density!', ta: 'அடர்த்தியுடன் உங்கள் வேதியியல் விசாரணையைத் தொடருங்கள்!' },
    });
  } else {
    // Default recommendations
    recommendations.push({
      caseId: 'physics-circuit-001',
      reason: { en: 'Start with a classic: The Missing Battery.', ta: 'ஒரு கிளாசிக்கில் தொடங்குங்கள்: மறந்துபோன மின்கலம்.' },
    });
    recommendations.push({
      caseId: 'biology-plant-001',
      reason: { en: 'Explore biology: Why Did the Plant Wilt?', ta: 'உயிரியலை ஆராயுங்கள்: தாவரம் ஏன் வாடியது?' },
    });
    recommendations.push({
      caseId: 'space-planet-001',
      reason: { en: 'Discover space: The Red Planet Mystery.', ta: 'விண்வெளியை கண்டறியுங்கள்: சிவப்பு கிரக மர்மம்.' },
    });
  }

  return recommendations.filter((r) => !completedCaseIds.includes(r.caseId));
}

// ============================================================================
// Learning Concept to Category Mapping (for recommendations)
// ============================================================================

export const CONCEPT_TO_CATEGORY: Record<string, MysteryCategory> = {
  'circuit-completion': 'physics',
  'conductors': 'physics',
  'electrical-path': 'physics',
  'friction': 'physics',
  'force': 'physics',
  'gravity': 'physics',
  'sound-production': 'physics',
  'vibration': 'physics',
  'earth-rotation': 'physics',
  'shadows': 'physics',
  'acids-bases': 'chemistry',
  'pH': 'chemistry',
  'neutralization': 'chemistry',
  'density': 'chemistry',
  'buoyancy': 'chemistry',
  'photosynthesis': 'biology',
  'plant-water': 'biology',
  'cell-structure': 'biology',
  'plant-cells': 'biology',
  'pulsars': 'space',
  'neutron-stars': 'space',
  'mars': 'space',
  'planets': 'space',
  'water-pollution': 'environment',
  'acidity': 'environment',
  'ecosystem-health': 'environment',
  'circulatory-system': 'human-body',
  'heart-rate': 'human-body',
  'oxygen-transport': 'human-body',
  'bacteria-growth': 'everyday-science',
  'fermentation': 'everyday-science',
  'history-of-electricity': 'scientific-history',
};
