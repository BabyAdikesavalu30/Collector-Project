/**
 * Progress Feature Catalog
 * Definitive catalog mapping the 7 science subjects to standard curriculum topics,
 * grade context scopes, and cross-feature links (Micro Lessons, Concept Maps,
 * Experiments, Learn Pathways, and Quizzes).
 */

import {
  GradeContext,
  SubjectId,
  SubjectMeta,
  TopicCatalogEntry,
} from './progress.types';

export const SUBJECT_METAS: Record<SubjectId, SubjectMeta> = {
  physics: {
    id: 'physics',
    title: { en: 'Physics', ta: 'இயற்பியல்' },
    subtitle: {
      en: 'Forces, motion, light and energy',
      ta: 'விசைகள், இயக்கம், ஒளி மற்றும் ஆற்றல்',
    },
    icon: '⚛️',
    color: '#2563EB',
    accentBg: '#EFF6FF',
  },
  chemistry: {
    id: 'chemistry',
    title: { en: 'Chemistry', ta: 'வேதியியல்' },
    subtitle: {
      en: 'Atoms, molecules, reactions and matter',
      ta: 'அணுக்கள், மூலக்கூறுகள் மற்றும் மாற்றங்கள்',
    },
    icon: '🧪',
    color: '#7E22CE',
    accentBg: '#FAF5FF',
  },
  biology: {
    id: 'biology',
    title: { en: 'Biology', ta: 'உயிரியல்' },
    subtitle: {
      en: 'Cells, genetics, plants and ecosystems',
      ta: 'செல்கள், மரபியல், தாவரங்கள் மற்றும் சூழல்',
    },
    icon: '🧬',
    color: '#16A34A',
    accentBg: '#F0FDF4',
  },
  space: {
    id: 'space',
    title: { en: 'Space', ta: 'விண்வெளி' },
    subtitle: {
      en: 'Planets, stars, orbits and the cosmos',
      ta: 'கோள்கள், விண்மீன்கள் மற்றும் அண்டம்',
    },
    icon: '🪐',
    color: '#D97706',
    accentBg: '#FFFBEB',
  },
  environment: {
    id: 'environment',
    title: { en: 'Environment', ta: 'சுற்றுச்சூழல்' },
    subtitle: {
      en: 'Ecosystems, climate, water and energy',
      ta: 'சுற்றுச்சூழல், காலநிலை, நீர் மற்றும் ஆற்றல்',
    },
    icon: '🌿',
    color: '#059669',
    accentBg: '#ECFDF5',
  },
  'human-body': {
    id: 'human-body',
    title: { en: 'Human Body', ta: 'மனித உடல்' },
    subtitle: {
      en: 'Organs, circulation, brain and reflexes',
      ta: 'உறுப்புகள், இரத்த ஓட்டம் மற்றும் மூளை',
    },
    icon: '🫀',
    color: '#E11D48',
    accentBg: '#FFF1F2',
  },
  'everyday-science': {
    id: 'everyday-science',
    title: { en: 'Everyday Science', ta: 'அன்றாட அறிவியல்' },
    subtitle: {
      en: 'Phenomena, household tech and cool science',
      ta: 'அன்றாட நிகழ்வுகள் மற்றும் அறிவியல் உண்மைகள்',
    },
    icon: '💡',
    color: '#0891B2',
    accentBg: '#ECFEFF',
  },
};

export const ORDERED_SUBJECT_IDS: SubjectId[] = [
  'physics',
  'chemistry',
  'biology',
  'space',
  'environment',
  'human-body',
  'everyday-science',
];

export const TOPIC_CATALOG: TopicCatalogEntry[] = [
  // -------------------------------------------------------------------------
  // Physics Topics
  // -------------------------------------------------------------------------
  {
    id: 'phy-force-motion',
    subjectId: 'physics',
    title: { en: 'Forces & Motion', ta: 'விசைகள் மற்றும் இயக்கம்' },
    gradeGroups: ['grade_6_7', 'grade_8_10', 'grade_11_12'],
    microLessonId: 'micro-newtons-first-law',
    conceptMapId: 'map-force-and-motion',
    experimentId: 'exp-pendulum',
    learnPathwayId: 'path-phy-forces-fnd',
    quizReference: { levelId: 'foundation', subjectId: 'physics', pathwayId: 'path-phy-forces-fnd' },
  },
  {
    id: 'phy-light-optics',
    subjectId: 'physics',
    title: { en: 'Light & Optics', ta: 'ஒளி மற்றும் ஒளியியல்' },
    gradeGroups: ['grade_6_7', 'grade_8_10', 'grade_11_12'],
    microLessonId: 'micro-light-reflection',
    conceptMapId: 'map-light-and-optics',
    experimentId: 'exp-reflection',
    learnPathwayId: 'path-phy-light-core',
    quizReference: { levelId: 'core', subjectId: 'physics', pathwayId: 'path-phy-light-core' },
  },
  {
    id: 'phy-electricity',
    subjectId: 'physics',
    title: { en: 'Electricity & Circuits', ta: 'மின்னியல் மற்றும் சுற்றுகள்' },
    gradeGroups: ['grade_6_7', 'grade_8_10', 'grade_11_12'],
    microLessonId: 'micro-electric-circuits',
    conceptMapId: 'map-electric-circuits',
    experimentId: 'exp-ohms-law',
    learnPathwayId: 'path-phy-energy-fnd',
    quizReference: { levelId: 'foundation', subjectId: 'physics', pathwayId: 'path-phy-energy-fnd' },
  },
  {
    id: 'phy-sound-waves',
    subjectId: 'physics',
    title: { en: 'Sound & Waves', ta: 'ஒலி மற்றும் அலைகள்' },
    gradeGroups: ['grade_6_7', 'grade_8_10', 'grade_11_12'],
    microLessonId: 'micro-sound-waves',
    conceptMapId: 'map-sound-waves',
    learnPathwayId: 'path-phy-forces-fnd',
    quizReference: { levelId: 'foundation', subjectId: 'physics', pathwayId: 'path-phy-forces-fnd' },
  },
  {
    id: 'phy-simple-machines',
    subjectId: 'physics',
    title: { en: 'Simple Machines', ta: 'எளிய எந்திரங்கள்' },
    gradeGroups: ['grade_6_7', 'grade_8_10'],
    microLessonId: 'micro-newtons-third-law',
    learnPathwayId: 'path-phy-forces-fnd',
    quizReference: { levelId: 'foundation', subjectId: 'physics', pathwayId: 'path-phy-forces-fnd' },
  },
  {
    id: 'phy-heat-transfer',
    subjectId: 'physics',
    title: { en: 'Heat & Thermodynamics', ta: 'வெப்பம் மற்றும் பரிமாற்றம்' },
    gradeGroups: ['grade_8_10', 'grade_11_12'],
    microLessonId: 'micro-heat-transfer',
    conceptMapId: 'map-energy-and-conservation',
    experimentId: 'exp-free-fall',
    learnPathwayId: 'path-phy-energy-fnd',
    quizReference: { levelId: 'foundation', subjectId: 'physics', pathwayId: 'path-phy-energy-fnd' },
  },

  // -------------------------------------------------------------------------
  // Chemistry Topics
  // -------------------------------------------------------------------------
  {
    id: 'chem-states-matter',
    subjectId: 'chemistry',
    title: { en: 'States of Matter', ta: 'பொருளின் நிலைகள்' },
    gradeGroups: ['grade_6_7', 'grade_8_10', 'grade_11_12'],
    microLessonId: 'micro-states-of-matter',
    conceptMapId: 'map-states-of-matter',
    experimentId: 'exp-density',
    learnPathwayId: 'path-chem-matter-fnd',
    quizReference: { levelId: 'foundation', subjectId: 'chemistry', pathwayId: 'path-chem-matter-fnd' },
  },
  {
    id: 'chem-acids-bases',
    subjectId: 'chemistry',
    title: { en: 'Acids, Bases & pH', ta: 'அமிலங்கள், காரங்கள் மற்றும் pH' },
    gradeGroups: ['grade_6_7', 'grade_8_10', 'grade_11_12'],
    microLessonId: 'micro-acids-bases-ph',
    conceptMapId: 'map-acids-and-bases',
    experimentId: 'exp-ph-explorer',
    learnPathwayId: 'path-chem-matter-fnd',
    quizReference: { levelId: 'foundation', subjectId: 'chemistry', pathwayId: 'path-chem-matter-fnd' },
  },
  {
    id: 'chem-atoms-elements',
    subjectId: 'chemistry',
    title: { en: 'Atoms & Elements', ta: 'அணுக்கள் மற்றும் தனிமங்கள்' },
    gradeGroups: ['grade_8_10', 'grade_11_12'],
    microLessonId: 'micro-atomic-structure',
    conceptMapId: 'map-atoms-and-elements',
    experimentId: 'exp-solubility',
    learnPathwayId: 'path-chem-reactions-core',
    quizReference: { levelId: 'core', subjectId: 'chemistry', pathwayId: 'path-chem-reactions-core' },
  },
  {
    id: 'chem-reactions',
    subjectId: 'chemistry',
    title: { en: 'Chemical Reactions', ta: 'வேதி வினைகள்' },
    gradeGroups: ['grade_8_10', 'grade_11_12'],
    microLessonId: 'micro-chemical-reactions',
    conceptMapId: 'map-chemical-reactions',
    experimentId: 'exp-reaction-rate',
    learnPathwayId: 'path-chem-reactions-core',
    quizReference: { levelId: 'core', subjectId: 'chemistry', pathwayId: 'path-chem-reactions-core' },
  },

  // -------------------------------------------------------------------------
  // Biology Topics
  // -------------------------------------------------------------------------
  {
    id: 'bio-cell-structure',
    subjectId: 'biology',
    title: { en: 'Cell Structure & Function', ta: 'செல் அமைப்பு மற்றும் செயல்பாடு' },
    gradeGroups: ['grade_6_7', 'grade_8_10', 'grade_11_12'],
    microLessonId: 'micro-cell-structure',
    conceptMapId: 'map-cell-structure',
    learnPathwayId: 'path-bio-cells-core',
    quizReference: { levelId: 'core', subjectId: 'biology', pathwayId: 'path-bio-cells-core' },
  },
  {
    id: 'bio-photosynthesis',
    subjectId: 'biology',
    title: { en: 'Photosynthesis & Plants', ta: 'ஒளிச்சேர்க்கை மற்றும் தாவரங்கள்' },
    gradeGroups: ['grade_6_7', 'grade_8_10', 'grade_11_12'],
    microLessonId: 'micro-photosynthesis',
    conceptMapId: 'map-photosynthesis',
    experimentId: 'exp-photosynthesis',
    learnPathwayId: 'path-bio-living-fnd',
    quizReference: { levelId: 'foundation', subjectId: 'biology', pathwayId: 'path-bio-living-fnd' },
  },
  {
    id: 'bio-dna-genetics',
    subjectId: 'biology',
    title: { en: 'Genetics & DNA', ta: 'மரபியல் மற்றும் DNA' },
    gradeGroups: ['grade_8_10', 'grade_11_12'],
    microLessonId: 'micro-dna-genetics',
    conceptMapId: 'map-food-chain-and-ecology',
    learnPathwayId: 'path-bio-genetics-adv',
    quizReference: { levelId: 'advanced', subjectId: 'biology', pathwayId: 'path-bio-genetics-adv' },
  },
  {
    id: 'bio-microorganisms',
    subjectId: 'biology',
    title: { en: 'Microorganisms', ta: 'நுண்ணுயிரிகள்' },
    gradeGroups: ['grade_6_7', 'grade_8_10'],
    microLessonId: 'micro-microorganisms-bacteria',
    learnPathwayId: 'path-bio-living-fnd',
    quizReference: { levelId: 'foundation', subjectId: 'biology', pathwayId: 'path-bio-living-fnd' },
  },

  // -------------------------------------------------------------------------
  // Space Topics
  // -------------------------------------------------------------------------
  {
    id: 'space-solar-system',
    subjectId: 'space',
    title: { en: 'Solar System & Planets', ta: 'சூரிய குடும்பம் மற்றும் கோள்கள்' },
    gradeGroups: ['grade_6_7', 'grade_8_10', 'grade_11_12'],
    microLessonId: 'micro-solar-system-orbits',
    conceptMapId: 'map-solar-system',
    experimentId: 'exp-moon-phases',
    learnPathwayId: 'path-phy-forces-fnd',
    quizReference: { levelId: 'foundation', subjectId: 'physics', pathwayId: 'path-phy-forces-fnd' },
  },
  {
    id: 'space-moon-phases',
    subjectId: 'space',
    title: { en: 'Moon Phases & Eclipses', ta: 'நிலவின் நிலைகள் மற்றும் கிரகணங்கள்' },
    gradeGroups: ['grade_6_7', 'grade_8_10'],
    microLessonId: 'micro-moon-phases',
    conceptMapId: 'map-solar-system',
    experimentId: 'exp-moon-phases',
    learnPathwayId: 'path-phy-forces-fnd',
    quizReference: { levelId: 'foundation', subjectId: 'physics', pathwayId: 'path-phy-forces-fnd' },
  },
  {
    id: 'space-gravity-orbits',
    subjectId: 'space',
    title: { en: 'Gravity & Orbits', ta: 'ஈர்ப்பு விசை மற்றும் பாதைகள்' },
    gradeGroups: ['grade_8_10', 'grade_11_12'],
    microLessonId: 'micro-gravity-weightlessness',
    learnPathwayId: 'path-phy-forces-fnd',
    quizReference: { levelId: 'foundation', subjectId: 'physics', pathwayId: 'path-phy-forces-fnd' },
  },
  {
    id: 'space-stars-universe',
    subjectId: 'space',
    title: { en: 'Stars & the Universe', ta: 'விண்மீன்கள் மற்றும் பேரண்டம்' },
    gradeGroups: ['grade_8_10', 'grade_11_12'],
    microLessonId: 'micro-stars-black-holes',
    learnPathwayId: 'path-phy-forces-fnd',
    quizReference: { levelId: 'foundation', subjectId: 'physics', pathwayId: 'path-phy-forces-fnd' },
  },

  // -------------------------------------------------------------------------
  // Environment Topics
  // -------------------------------------------------------------------------
  {
    id: 'env-water-cycle',
    subjectId: 'environment',
    title: { en: 'Water Cycle & Conservation', ta: 'நீர் சுழற்சி மற்றும் சேமிப்பு' },
    gradeGroups: ['grade_6_7', 'grade_8_10', 'grade_11_12'],
    microLessonId: 'micro-water-cycle',
    conceptMapId: 'map-water-cycle',
    experimentId: 'exp-water-cycle',
    learnPathwayId: 'path-bio-living-fnd',
    quizReference: { levelId: 'foundation', subjectId: 'biology', pathwayId: 'path-bio-living-fnd' },
  },
  {
    id: 'env-ecosystems',
    subjectId: 'environment',
    title: { en: 'Ecosystems & Food Webs', ta: 'சூழல் மண்டலங்கள் மற்றும் உணவு வலை' },
    gradeGroups: ['grade_6_7', 'grade_8_10', 'grade_11_12'],
    microLessonId: 'micro-food-chains',
    conceptMapId: 'map-food-chain-and-ecology',
    learnPathwayId: 'path-bio-living-fnd',
    quizReference: { levelId: 'foundation', subjectId: 'biology', pathwayId: 'path-bio-living-fnd' },
  },
  {
    id: 'env-climate-change',
    subjectId: 'environment',
    title: { en: 'Climate Change & Atmosphere', ta: 'காலநிலை மாற்றம் மற்றும் வளிமண்டலம்' },
    gradeGroups: ['grade_8_10', 'grade_11_12'],
    microLessonId: 'micro-greenhouse-effect',
    experimentId: 'exp-greenhouse-effect',
    learnPathwayId: 'path-bio-living-fnd',
    quizReference: { levelId: 'foundation', subjectId: 'biology', pathwayId: 'path-bio-living-fnd' },
  },
  {
    id: 'env-renewable-energy',
    subjectId: 'environment',
    title: { en: 'Renewable Energy', ta: 'புதுப்பிக்கத்தக்க ஆற்றல்' },
    gradeGroups: ['grade_6_7', 'grade_8_10', 'grade_11_12'],
    microLessonId: 'micro-renewable-energy',
    learnPathwayId: 'path-phy-energy-fnd',
    quizReference: { levelId: 'foundation', subjectId: 'physics', pathwayId: 'path-phy-energy-fnd' },
  },

  // -------------------------------------------------------------------------
  // Human Body Topics
  // -------------------------------------------------------------------------
  {
    id: 'body-circulation',
    subjectId: 'human-body',
    title: { en: 'Circulatory System & Heart', ta: 'இரத்த ஓட்ட மண்டலம் மற்றும் இதயம்' },
    gradeGroups: ['grade_6_7', 'grade_8_10', 'grade_11_12'],
    microLessonId: 'micro-human-heart',
    conceptMapId: 'map-circulatory-system',
    experimentId: 'exp-heart-rate',
    learnPathwayId: 'path-bio-living-fnd',
    quizReference: { levelId: 'foundation', subjectId: 'biology', pathwayId: 'path-bio-living-fnd' },
  },
  {
    id: 'body-respiration',
    subjectId: 'human-body',
    title: { en: 'Lungs & Breathing', ta: 'சுவாச மண்டலம் மற்றும் சுவாசம்' },
    gradeGroups: ['grade_6_7', 'grade_8_10', 'grade_11_12'],
    microLessonId: 'micro-human-heart',
    learnPathwayId: 'path-bio-living-fnd',
    quizReference: { levelId: 'foundation', subjectId: 'biology', pathwayId: 'path-bio-living-fnd' },
  },
  {
    id: 'body-nervous-system',
    subjectId: 'human-body',
    title: { en: 'Brain & Nervous System', ta: 'மூளை மற்றும் நரம்பு மண்டலம்' },
    gradeGroups: ['grade_8_10', 'grade_11_12'],
    microLessonId: 'micro-human-brain-reflexes',
    learnPathwayId: 'path-bio-living-fnd',
    quizReference: { levelId: 'foundation', subjectId: 'biology', pathwayId: 'path-bio-living-fnd' },
  },
  {
    id: 'body-digestion',
    subjectId: 'human-body',
    title: { en: 'Digestion & Nutrition', ta: 'செரிமான மண்டலம் மற்றும் ஊட்டச்சத்து' },
    gradeGroups: ['grade_6_7', 'grade_8_10'],
    conceptMapId: 'map-human-digestive-system',
    learnPathwayId: 'path-bio-living-fnd',
    quizReference: { levelId: 'foundation', subjectId: 'biology', pathwayId: 'path-bio-living-fnd' },
  },

  // -------------------------------------------------------------------------
  // Everyday Science Topics
  // -------------------------------------------------------------------------
  {
    id: 'es-density-floating',
    subjectId: 'everyday-science',
    title: { en: 'Why Does Ice Float?', ta: 'பனிக்கட்டி ஏன் மிதக்கிறது?' },
    gradeGroups: ['grade_6_7', 'grade_8_10', 'grade_11_12'],
    microLessonId: 'micro-why-ice-floats',
    experimentId: 'exp-density',
    learnPathwayId: 'path-chem-matter-fnd',
    quizReference: { levelId: 'foundation', subjectId: 'chemistry', pathwayId: 'path-chem-matter-fnd' },
  },
  {
    id: 'es-surfactants-soap',
    subjectId: 'everyday-science',
    title: { en: 'How Soap Cleans', ta: 'சோப்பு எவ்வாறு அழுக்கை நீக்குகிறது?' },
    gradeGroups: ['grade_6_7', 'grade_8_10', 'grade_11_12'],
    microLessonId: 'micro-solutions-solvents',
    experimentId: 'exp-solubility',
    learnPathwayId: 'path-chem-matter-fnd',
    quizReference: { levelId: 'foundation', subjectId: 'chemistry', pathwayId: 'path-chem-matter-fnd' },
  },
  {
    id: 'es-static-electricity',
    subjectId: 'everyday-science',
    title: { en: 'Static Electricity', ta: 'நிலை மின்னியல்' },
    gradeGroups: ['grade_6_7', 'grade_8_10'],
    microLessonId: 'micro-electric-circuits',
    conceptMapId: 'map-electric-circuits',
    learnPathwayId: 'path-phy-energy-fnd',
    quizReference: { levelId: 'foundation', subjectId: 'physics', pathwayId: 'path-phy-energy-fnd' },
  },
  {
    id: 'es-batteries-energy',
    subjectId: 'everyday-science',
    title: { en: 'How Batteries Work', ta: 'மின்கலங்கள் எவ்வாறு இயங்குகின்றன?' },
    gradeGroups: ['grade_8_10', 'grade_11_12'],
    microLessonId: 'micro-battery-chemistry',
    conceptMapId: 'map-electric-circuits',
    experimentId: 'exp-ohms-law',
    learnPathwayId: 'path-phy-energy-fnd',
    quizReference: { levelId: 'foundation', subjectId: 'physics', pathwayId: 'path-phy-energy-fnd' },
  },
];

/**
 * Returns all topics for a given subject scoped to the learner's grade context.
 */
export function getTopicsForSubject(
  subjectId: SubjectId,
  gradeContext: GradeContext = 'grade_8_10'
): TopicCatalogEntry[] {
  return TOPIC_CATALOG.filter(
    (t) => t.subjectId === subjectId && t.gradeGroups.includes(gradeContext)
  );
}

/**
 * Maps a raw student grade string (e.g. "Grade 8", "Class 6", 8) to a GradeContext.
 */
export function resolveGradeContext(gradeValue: unknown): GradeContext {
  if (typeof gradeValue === 'number') {
    if (gradeValue <= 7) return 'grade_6_7';
    if (gradeValue <= 10) return 'grade_8_10';
    return 'grade_11_12';
  }

  if (typeof gradeValue === 'string') {
    const numMatch = gradeValue.match(/\d+/);
    if (numMatch) {
      const num = parseInt(numMatch[0], 10);
      if (num <= 7) return 'grade_6_7';
      if (num <= 10) return 'grade_8_10';
      return 'grade_11_12';
    }
    const lower = gradeValue.toLowerCase();
    if (lower.includes('foundation') || lower.includes('6') || lower.includes('7')) {
      return 'grade_6_7';
    }
    if (lower.includes('advanced') || lower.includes('11') || lower.includes('12')) {
      return 'grade_11_12';
    }
  }

  return 'grade_8_10'; // default core
}

/**
 * Finds a topic catalog entry by matching either its own ID, a microLessonId,
 * conceptMapId, experimentId, or quiz pathwayId.
 */
export function findTopicForActivity(referenceId: string): TopicCatalogEntry | undefined {
  if (!referenceId) return undefined;
  return TOPIC_CATALOG.find(
    (t) =>
      t.id === referenceId ||
      t.microLessonId === referenceId ||
      t.conceptMapId === referenceId ||
      t.experimentId === referenceId ||
      t.learnPathwayId === referenceId ||
      t.quizReference?.pathwayId === referenceId
  );
}
