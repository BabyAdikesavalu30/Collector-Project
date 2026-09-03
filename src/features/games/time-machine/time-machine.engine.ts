import { TimelineEvent, TimeMachineLevel } from './time-machine.types';

export function isTimelineCorrect(
  orderedEventIds: string[],
  level: TimeMachineLevel
): boolean {
  if (orderedEventIds.length !== level.events.length) return false;

  const eventMap = new Map(level.events.map((e) => [e.id, e]));

  for (let i = 0; i < orderedEventIds.length - 1; i++) {
    const eventA = eventMap.get(orderedEventIds[i]);
    const eventB = eventMap.get(orderedEventIds[i + 1]);
    if (!eventA || !eventB) return false;
    if (eventA.year > eventB.year) return false;
  }

  return true;
}

export function calculateTimeMachineScore(
  mistakes: number,
  elapsedSeconds: number
): { score: number; stars: 1 | 2 | 3; isPerfect: boolean } {
  const isPerfect = mistakes === 0;
  let stars: 1 | 2 | 3 = 1;
  if (mistakes === 0 && elapsedSeconds < 25) {
    stars = 3;
  } else if (mistakes <= 1) {
    stars = 2;
  }
  const score = Math.max(50, 200 - mistakes * 30 - elapsedSeconds);
  return { score, stars, isPerfect };
}
