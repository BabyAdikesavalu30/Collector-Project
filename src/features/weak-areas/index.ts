/**
 * Weak Areas Feature Public API
 */

export * from './weakAreas.types';
export {
  calculateAccuracy,
  calculateRecentAccuracy,
  calculateConfidence,
  calculateFocusPriority,
  calculateTrend,
  hasEnoughEvidence,
  getFocusStatus,
  selectFocusAreas,
} from './weakAreas.engine';
export {
  FocusAreaService,
  focusAreaService,
} from './weakAreas.service';
export {
  getTopicDescriptorForLesson,
  getTopicDescriptorForPathway,
  resolveRecommendedAction,
  getSubjectTitle,
} from './weakAreas.topics';
export {
  useFocusAreas,
  useTopFocusArea,
} from './weakAreas.hooks';
