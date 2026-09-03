import { AtomToken, MoleculeLevel } from './molecule-builder.types';

export function isMoleculeComplete(
  selectedAtoms: AtomToken[],
  level: MoleculeLevel
): boolean {
  const counts: Record<string, number> = {};
  selectedAtoms.forEach((atom) => {
    counts[atom.symbol] = (counts[atom.symbol] || 0) + 1;
  });

  const reqEntries = Object.entries(level.requiredAtoms);
  if (selectedAtoms.length !== reqEntries.reduce((sum, [, count]) => sum + count, 0)) {
    return false;
  }

  return reqEntries.every(([sym, count]) => counts[sym] === count);
}

export function calculateMoleculeScore(
  moves: number,
  elapsedSeconds: number,
  targetAtomCount: number
): { score: number; stars: 1 | 2 | 3; isPerfect: boolean } {
  const isPerfect = moves === targetAtomCount;
  let stars: 1 | 2 | 3 = 1;
  if (isPerfect && elapsedSeconds < targetAtomCount * 6) {
    stars = 3;
  } else if (moves <= targetAtomCount + 2) {
    stars = 2;
  }
  const score = Math.max(50, 300 - (moves - targetAtomCount) * 30 - elapsedSeconds * 2);
  return { score, stars, isPerfect };
}
