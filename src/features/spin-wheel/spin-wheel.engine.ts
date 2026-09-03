/**
 * Spin Wheel Engine
 * Randomization, rotation geometry math, and outcome payload resolution.
 */

import {
  SpinOutcomeType,
  SpinWheelOutcome,
  SpinWheelSegment,
} from './spin-wheel.types';
import {
  SPIN_WHEEL_SEGMENTS,
  SCIENTIST_QUESTIONS,
  INVENTION_QUESTIONS,
  THINK_FAST_QUESTIONS,
  CHALLENGE_QUESTIONS,
  SCIENCE_FACTS,
  BONUS_REWARD,
} from './spin-wheel.mock';

export const ALL_OUTCOME_TYPES: SpinOutcomeType[] = [
  'scientist',
  'invention',
  'scienceFact',
  'thinkFast',
  'bonus',
  'challenge',
];

export function isValidOutcomeType(value: unknown): value is SpinOutcomeType {
  return (
    typeof value === 'string' &&
    ALL_OUTCOME_TYPES.includes(value as SpinOutcomeType)
  );
}

/**
 * Deterministically or pseudo-randomly selects an outcome.
 */
export function selectWheelOutcome(seed?: string): SpinOutcomeType {
  if (seed && isValidOutcomeType(seed)) {
    return seed;
  }
  const randomIndex = Math.floor(Math.random() * ALL_OUTCOME_TYPES.length);
  return ALL_OUTCOME_TYPES[randomIndex];
}

/**
 * Finds the segment index for a given outcome type.
 */
export function getSegmentIndex(outcome: SpinOutcomeType): number {
  const index = SPIN_WHEEL_SEGMENTS.findIndex((seg) => seg.id === outcome);
  return index >= 0 ? index : 0;
}

/**
 * Computes rotation angle in degrees so segment center lands directly at 12 o'clock under the top pointer.
 * Each segment spans 60 degrees. Segment i center is at: (i * 60 + 30) degrees.
 */
export function calculateTargetRotation(
  segmentIndex: number,
  currentRotation: number = 0,
  fullSpins: number = 3
): number {
  const segmentArc = 360 / SPIN_WHEEL_SEGMENTS.length; // 60 deg
  const segmentCenter = segmentIndex * segmentArc + segmentArc / 2; // e.g. 30, 90, 150...
  const landingAngle = (360 - segmentCenter) % 360;

  // Calculate current normalized angle
  const currentNormalized = ((currentRotation % 360) + 360) % 360;
  let angleDelta = landingAngle - currentNormalized;
  if (angleDelta <= 0) {
    angleDelta += 360;
  }

  // Add full rotations
  return currentRotation + angleDelta + fullSpins * 360;
}

/**
 * Resolves the question, fact, or bonus payload for the winning outcome.
 */
export function resolveOutcomePayload(type: SpinOutcomeType): SpinWheelOutcome {
  const segment: SpinWheelSegment =
    SPIN_WHEEL_SEGMENTS.find((s) => s.id === type) || SPIN_WHEEL_SEGMENTS[0];

  switch (type) {
    case 'scientist': {
      const q = SCIENTIST_QUESTIONS[0];
      return { type, segment, payload: { type: 'question', data: q } };
    }
    case 'invention': {
      const q = INVENTION_QUESTIONS[0];
      return { type, segment, payload: { type: 'question', data: q } };
    }
    case 'thinkFast': {
      const q = THINK_FAST_QUESTIONS[0];
      return { type, segment, payload: { type: 'question', data: q } };
    }
    case 'challenge': {
      const q = CHALLENGE_QUESTIONS[0];
      return { type, segment, payload: { type: 'question', data: q } };
    }
    case 'scienceFact': {
      const fact = SCIENCE_FACTS[0];
      return { type, segment, payload: { type: 'fact', data: fact } };
    }
    case 'bonus': {
      return { type, segment, payload: { type: 'bonus', data: BONUS_REWARD } };
    }
  }
}
