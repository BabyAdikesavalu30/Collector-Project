/**
 * Weak Areas UI i18n Bridge
 * Types the shared `weakAreas` section of config/i18n. Zero hardcoded UI
 * strings — every label resolves through here.
 */

import { SupportedLanguage, getTranslation } from '../../config/i18n';

export interface WeakAreasI18n {
  title: string;
  subtitle: string;
  intro: string;
  basedOnActivity: string;
  topicsNeedingPractice: string;
  topicsNeedingPracticeSub: string;
  overallSummary: string;
  focusAreasCount: string;
  improvingCount: string;
  strongCount: string;
  accuracy: string;
  practiceConfidence: string;
  yourFocusAreas: string;
  gettingStronger: string;
  keepGoing: string;
  keepExploring: string;
  strongTopics: string;
  recommendedNextStep: string;
  start: string;
  reasonAttempt: string;
  reasonRecentLower: string;
  reasonStrengthen: string;
  notEnoughData: string;
  notEnoughDataSub: string;
  emptyTitle: string;
  emptySub: string;
  exploreScience: string;
  startLearning: string;
  learnIn2Min: string;
  seeBigPicture: string;
  tryExperiment: string;
  practiceQuestions: string;
  continueLearning: string;
  reviewTopic: string;
  keepPracticing: string;
  trendImproving: string;
  trendStable: string;
  trendDeclining: string;
  trendInsufficient: string;
  subjects: Record<string, string>;
  statusNeedsPractice: string;
  statusBuildConfidence: string;
  statusPracticeSuggested: string;
  errorTitle: string;
  tryAgain: string;
  analyzedTopics: string;
  focusOn: string;
  focusOnCta: string;
  viewAllFocus: string;
  accessibility: {
    focusAreaCard: string;
    trendIndicator: string;
    progressBar: string;
    improvement: string;
  };
}

export function getWeakAreasI18n(language: SupportedLanguage): WeakAreasI18n {
  return getTranslation(language).weakAreas as unknown as WeakAreasI18n;
}

/** Substitutes {placeholder} tokens. */
export function interpolate(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? `{${key}}`);
}
