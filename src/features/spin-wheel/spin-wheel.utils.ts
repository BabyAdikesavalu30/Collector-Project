/**
 * Spin Wheel Utility Helpers
 */

import { SpinWheelSegment } from './spin-wheel.types';
import { SPIN_WHEEL_SEGMENTS } from './spin-wheel.mock';

export function getSegmentById(id: string): SpinWheelSegment | undefined {
  return SPIN_WHEEL_SEGMENTS.find((s) => s.id === id);
}
