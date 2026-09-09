/**
 * Feedback Feature Public API
 * Shared Hint System + Incorrect Answer Coach layer consumable by
 * Quiz, Riddles, Micro Lessons, Experiment Lab, Mystery Lab, and Games.
 * The feedback layer never owns sessions, scoring, XP, or navigation.
 */

export * from './feedback.types';
export * from './feedback.utils';
export * from './feedback.data';
export * from './feedback.hintData';
export * from './feedback.engine';
export * from './feedback.repository';
export * from './feedback.validator';
export * from './feedback.hooks';
