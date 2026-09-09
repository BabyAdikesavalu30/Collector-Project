/**
 * Feedback Component Exports
 * Reusable educational feedback UI layer.
 */

export { LearningTakeawayCard } from './LearningTakeawayCard';
export { HintButton, HintCard, HintPanel } from './HintPanel';
export { ExplanationAccordion } from './ExplanationAccordion';
export { RetryPrompt, SimilarQuestionCard } from './RetryPrompt';
export {
  CorrectAnswerFeedback,
  IncorrectAnswerCoach,
  FeedbackPanel,
} from './AnswerFeedbackCard';
export { getFeedbackI18n, interpolate, getHintLevelLabel } from './feedback.i18n';
export type { FeedbackI18n } from './feedback.i18n';
