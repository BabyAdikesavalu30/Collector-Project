/**
 * Spin Wheel Scoring Utilities
 * Local session point rewards for all 6 wheel outcomes.
 */

import { SpinOutcomeType } from './spin-wheel.types';

export const SPIN_BASE_POINTS: Record<SpinOutcomeType, number> = {
  scientist: 20,
  invention: 20,
  scienceFact: 10,
  thinkFast: 15,
  bonus: 25,
  challenge: 30,
};

export function calculateSpinPoints(
  outcome: SpinOutcomeType,
  answeredCorrectly?: boolean
): number {
  switch (outcome) {
    case 'bonus':
      return SPIN_BASE_POINTS.bonus;
    case 'scienceFact':
      return SPIN_BASE_POINTS.scienceFact;
    case 'scientist':
    case 'invention':
    case 'thinkFast':
    case 'challenge':
      return answeredCorrectly ? SPIN_BASE_POINTS[outcome] : 0;
    default:
      return 0;
  }
}
