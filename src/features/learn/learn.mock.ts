/**
 * Learn Feature Mock Data & Helpers
 * Deterministic educational levels, subjects, and pathways for Tamil Nadu Grades 6–12.
 */

import { LearningLevel, LearningSubject, LearningPathway } from './learn.types';

export const LEARNING_LEVELS: LearningLevel[] = [
  {
    id: 'foundation',
    title: 'Classes 6–7',
    subtitle: 'Foundation',
    badge: 'Classes 6–7',
    grades: [6, 7],
  },
  {
    id: 'core',
    title: 'Classes 8–10',
    subtitle: 'Core Learning',
    badge: 'Classes 8–10',
    grades: [8, 9, 10],
  },
  {
    id: 'advanced',
    title: 'Classes 11–12',
    subtitle: 'Advanced',
    badge: 'Classes 11–12',
    grades: [11, 12],
  },
];

export const LEARNING_SUBJECTS: LearningSubject[] = [
  {
    id: 'physics',
    title: 'Physics',
    subtitle: 'Explore motion, force, energy and matter',
    icon: '⚛️',
    supportedLevelIds: ['foundation', 'core', 'advanced'],
  },
  {
    id: 'chemistry',
    title: 'Chemistry',
    subtitle: 'Explore atoms, reactions and materials',
    icon: '🧪',
    supportedLevelIds: ['foundation', 'core', 'advanced'],
  },
  {
    id: 'biology',
    title: 'Biology',
    subtitle: 'Explore life, systems and organisms',
    icon: '🧬',
    supportedLevelIds: ['foundation', 'core', 'advanced'],
    subspecialties: 'Botany & Zoology',
  },
];

export const LEARNING_PATHWAYS: LearningPathway[] = [
  // --- Physics Foundation (Classes 6–7) ---
  {
    id: 'phy-f-1',
    subjectId: 'physics',
    levelId: 'foundation',
    title: 'Force & Motion',
    description: 'Explore pushes, pulls, speed, velocity, and gravity',
    topicCount: 4,
    estimatedMinutes: 15,
  },
  {
    id: 'phy-f-2',
    subjectId: 'physics',
    levelId: 'foundation',
    title: 'Light & Shadows',
    description: 'Reflection, transparent bodies, and mirrors in nature',
    topicCount: 3,
    estimatedMinutes: 12,
  },
  {
    id: 'phy-f-3',
    subjectId: 'physics',
    levelId: 'foundation',
    title: 'Matter & Measurement',
    description: 'Standard SI units, length, mass, and volume basics',
    topicCount: 3,
    estimatedMinutes: 10,
  },

  // --- Physics Core (Classes 8–10) ---
  {
    id: 'phy-c-1',
    subjectId: 'physics',
    levelId: 'core',
    title: 'Force & Laws of Motion',
    description: "Newton's laws of motion, inertia, momentum, and friction",
    topicCount: 5,
    estimatedMinutes: 20,
  },
  {
    id: 'phy-c-2',
    subjectId: 'physics',
    levelId: 'core',
    title: 'Energy, Work & Power',
    description: 'Kinetic & potential energy, mechanical work, and power',
    topicCount: 4,
    estimatedMinutes: 18,
  },
  {
    id: 'phy-c-3',
    subjectId: 'physics',
    levelId: 'core',
    title: 'Electricity & Magnetism',
    description: 'Electric current, circuits, resistance, and magnetic fields',
    topicCount: 5,
    estimatedMinutes: 22,
  },

  // --- Physics Advanced (Classes 11–12) ---
  {
    id: 'phy-a-1',
    subjectId: 'physics',
    levelId: 'advanced',
    title: 'Kinematics & Dynamics',
    description: 'Vectors, projectile motion, circular motion, and friction',
    topicCount: 6,
    estimatedMinutes: 25,
  },
  {
    id: 'phy-a-2',
    subjectId: 'physics',
    levelId: 'advanced',
    title: 'Thermodynamics & Waves',
    description: 'Heat engines, entropy, wave optics, and oscillations',
    topicCount: 6,
    estimatedMinutes: 25,
  },
  {
    id: 'phy-a-3',
    subjectId: 'physics',
    levelId: 'advanced',
    title: 'Electromagnetism & Modern Physics',
    description: 'Electrostatics, induction, photons, and atomic models',
    topicCount: 7,
    estimatedMinutes: 30,
  },

  // --- Chemistry Foundation (Classes 6–7) ---
  {
    id: 'chem-f-1',
    subjectId: 'chemistry',
    levelId: 'foundation',
    title: 'Matter & Materials',
    description: 'Solids, liquids, gases, and simple everyday mixtures',
    topicCount: 3,
    estimatedMinutes: 12,
  },
  {
    id: 'chem-f-2',
    subjectId: 'chemistry',
    levelId: 'foundation',
    title: 'Acids, Bases & Salts',
    description: 'Natural indicators, litmus tests, and chemical properties',
    topicCount: 4,
    estimatedMinutes: 15,
  },
  {
    id: 'chem-f-3',
    subjectId: 'chemistry',
    levelId: 'foundation',
    title: 'Air & Water Resources',
    description: 'Atmospheric composition, water purification, and solutions',
    topicCount: 3,
    estimatedMinutes: 10,
  },

  // --- Chemistry Core (Classes 8–10) ---
  {
    id: 'chem-c-1',
    subjectId: 'chemistry',
    levelId: 'core',
    title: 'Atoms & Elements',
    description: 'Atomic structure, periodic table classification, and symbols',
    topicCount: 5,
    estimatedMinutes: 20,
  },
  {
    id: 'chem-c-2',
    subjectId: 'chemistry',
    levelId: 'core',
    title: 'Chemical Reactions & Equations',
    description: 'Combination, displacement, redox reactions, and balancing',
    topicCount: 5,
    estimatedMinutes: 22,
  },
  {
    id: 'chem-c-3',
    subjectId: 'chemistry',
    levelId: 'core',
    title: 'Metals & Non-Metals',
    description: 'Reactivity series, extraction, corrosion, and alloys',
    topicCount: 4,
    estimatedMinutes: 18,
  },

  // --- Chemistry Advanced (Classes 11–12) ---
  {
    id: 'chem-a-1',
    subjectId: 'chemistry',
    levelId: 'advanced',
    title: 'Organic Chemistry & Hydrocarbons',
    description: 'Alkanes, functional groups, isomerism, and reaction mechanisms',
    topicCount: 6,
    estimatedMinutes: 25,
  },
  {
    id: 'chem-a-2',
    subjectId: 'chemistry',
    levelId: 'advanced',
    title: 'Physical Chemistry & Equilibrium',
    description: 'Mole concepts, thermodynamics, chemical kinetics, and solutions',
    topicCount: 6,
    estimatedMinutes: 28,
  },
  {
    id: 'chem-a-3',
    subjectId: 'chemistry',
    levelId: 'advanced',
    title: 'Inorganic Chemistry & Coordination',
    description: 'd-block elements, chemical bonding, and coordination complexes',
    topicCount: 5,
    estimatedMinutes: 24,
  },

  // --- Biology Foundation (Classes 6–7) ---
  {
    id: 'bio-f-1',
    subjectId: 'biology',
    levelId: 'foundation',
    title: 'Living Organisms & Habitat',
    description: 'Adaptations, ecosystems, terrestrial and aquatic organisms',
    topicCount: 4,
    estimatedMinutes: 15,
  },
  {
    id: 'bio-f-2',
    subjectId: 'biology',
    levelId: 'foundation',
    title: 'Plants & Nutrition',
    description: 'Photosynthesis, root systems, leaf veins, and transpiration',
    topicCount: 4,
    estimatedMinutes: 15,
  },
  {
    id: 'bio-f-3',
    subjectId: 'biology',
    levelId: 'foundation',
    title: 'Human Body & Health',
    description: 'Digestive tract, skeletal system, and balanced nutrition',
    topicCount: 3,
    estimatedMinutes: 12,
  },

  // --- Biology Core (Classes 8–10) ---
  {
    id: 'bio-c-1',
    subjectId: 'biology',
    levelId: 'core',
    title: 'Cell Biology & Genetics',
    description: 'Cell organelles, mitosis, DNA, and fundamental inheritance',
    topicCount: 5,
    estimatedMinutes: 20,
  },
  {
    id: 'bio-c-2',
    subjectId: 'biology',
    levelId: 'core',
    title: 'Life Processes in Organisms',
    description: 'Respiration, circulation, vascular transport, and excretion',
    topicCount: 5,
    estimatedMinutes: 22,
  },
  {
    id: 'bio-c-3',
    subjectId: 'biology',
    levelId: 'core',
    title: 'Ecology & Environment',
    description: 'Food chains, trophic levels, biodiversity, and conservation',
    topicCount: 4,
    estimatedMinutes: 18,
  },

  // --- Biology Advanced (Classes 11–12) ---
  {
    id: 'bio-a-1',
    subjectId: 'biology',
    levelId: 'advanced',
    title: 'Botany & Plant Physiology',
    description: 'Plant anatomy, mineral nutrition, respiration, and phytohormones',
    topicCount: 6,
    estimatedMinutes: 25,
  },
  {
    id: 'bio-a-2',
    subjectId: 'biology',
    levelId: 'advanced',
    title: 'Zoology & Human Physiology',
    description: 'Neural control, endocrine glands, immunology, and organ systems',
    topicCount: 6,
    estimatedMinutes: 28,
  },
  {
    id: 'bio-a-3',
    subjectId: 'biology',
    levelId: 'advanced',
    title: 'Genetics & Biotechnology',
    description: 'Mendelian inheritance, recombinant DNA technology, and evolution',
    topicCount: 6,
    estimatedMinutes: 26,
  },
];

/**
 * Maps a profile grade string (e.g. "Grade 8", "8", "Class 11") to an internal Level ID.
 */
export function mapGradeToLevelId(gradeStr?: string | null): string | null {
  if (!gradeStr) return null;
  const match = gradeStr.match(/\d+/);
  if (!match) return null;
  const grade = parseInt(match[0], 10);
  if (grade >= 6 && grade <= 7) return 'foundation';
  if (grade >= 8 && grade <= 10) return 'core';
  if (grade >= 11 && grade <= 12) return 'advanced';
  return null;
}

/**
 * Filter learning pathways by selected subject and level.
 */
export function getPathwaysForSelection(subjectId: string, levelId: string): LearningPathway[] {
  return LEARNING_PATHWAYS.filter(
    (p) => p.subjectId === subjectId && p.levelId === levelId
  );
}
