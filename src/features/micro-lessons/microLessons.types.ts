/**
 * Micro Lessons Feature Types
 * Strongly typed models for Vigyaan's lightweight 1–3 minute science learning layer.
 * Strictly no 'any'.
 */

export type MicroLessonSubjectId =
  | 'physics'
  | 'chemistry'
  | 'biology'
  | 'space'
  | 'environment'
  | 'human-body'
  | 'everyday-science';

export type GradeGroup = 'junior' | 'secondary' | 'senior';

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export type SectionKind =
  | 'idea'
  | 'why_it_matters'
  | 'visual_diagram'
  | 'think_about_it'
  | 'key_points'
  | 'quick_check'
  | 'remember';

export type VisualDiagramType =
  | 'newtons_first_law'
  | 'newtons_third_law'
  | 'light_reflection'
  | 'electric_circuit'
  | 'sound_vibrations'
  | 'gravity_orbit'
  | 'heat_transfer'
  | 'states_of_matter'
  | 'atom_structure'
  | 'ph_scale'
  | 'chemical_reaction'
  | 'periodic_table'
  | 'solution_dissolve'
  | 'photosynthesis'
  | 'cell_structure'
  | 'dna_helix'
  | 'food_chain'
  | 'plant_stomata'
  | 'microorganism'
  | 'solar_system'
  | 'sky_scattering'
  | 'moon_phases'
  | 'star_lifecycle'
  | 'water_cycle'
  | 'greenhouse_effect'
  | 'renewable_energy'
  | 'human_heart'
  | 'human_brain'
  | 'ice_floating'
  | 'battery_circuit';

export interface LocalizedText {
  en: string;
  ta: string;
}

export interface QuickCheckOption {
  id: string;
  text: LocalizedText;
  isCorrect: boolean;
  explanation: LocalizedText;
}

export interface QuickCheckQuestion {
  question: LocalizedText;
  options: QuickCheckOption[];
}

export interface MicroLessonSection {
  kind: SectionKind;
  title?: LocalizedText;
  content: LocalizedText;
  example?: LocalizedText;
  visualType?: VisualDiagramType;
  visualCaption?: LocalizedText;
  thinkQuestion?: LocalizedText;
  thinkAnswer?: LocalizedText;
  keyPoints?: LocalizedText[];
  quickCheck?: QuickCheckQuestion;
  rememberStatement?: LocalizedText;
}

export interface MicroLesson {
  id: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
  subject: MicroLessonSubjectId;
  category: string;
  gradeRange: string;
  gradeGroup: GradeGroup;
  durationMinutes: number;
  difficulty: DifficultyLevel;
  icon: string;
  thumbnail?: string;
  heroImage?: string;
  visualType: VisualDiagramType;
  sections: MicroLessonSection[];
  keyPoints: LocalizedText[];
  quickCheck: QuickCheckQuestion;
  rememberStatement: LocalizedText;
  relatedLessons?: string[];
  relatedConceptMapId?: string;
  relatedExperimentId?: string;
  learnRoute?: string;
  quizRoute?: string;
  xpReward: number;
}

export type MicroLessonStatus = 'not_started' | 'in_progress' | 'completed';

export interface MicroLessonProgress {
  lessonId: string;
  status: MicroLessonStatus;
  progressPercent: number;
  startedAt?: number;
  completedAt?: number;
  lastSectionIndex?: number;
  quickCheckCompleted?: boolean;
  bookmarked?: boolean;
}

export interface MicroLessonCollection {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  icon: string;
  lessonIds: string[];
}

export interface MicroLessonSubjectMeta {
  id: MicroLessonSubjectId;
  title: LocalizedText;
  subtitle: LocalizedText;
  icon: string;
  accentColor: string;
  badgeBg: string;
}

export type MicroLessonFilterStatus = 'all' | 'not_started' | 'in_progress' | 'completed' | 'bookmarked';

export interface MicroLessonFilterState {
  status: MicroLessonFilterStatus;
  subjectId: MicroLessonSubjectId | 'all';
  searchQuery: string;
}
