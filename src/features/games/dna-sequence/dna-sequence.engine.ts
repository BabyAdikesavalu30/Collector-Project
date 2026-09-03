import { DnaBase, DnaSequenceLevel } from './dna-sequence.types';

export function getComplementBase(template: DnaBase, mode: 'dna-pair' | 'rna-transcribe' | 'codon-match'): DnaBase {
  if (mode === 'rna-transcribe') {
    switch (template) {
      case 'T':
        return 'A';
      case 'A':
        return 'U';
      case 'C':
        return 'G';
      case 'G':
        return 'C';
      default:
        return 'A';
    }
  }

  // DNA pairing
  switch (template) {
    case 'A':
      return 'T';
    case 'T':
      return 'A';
    case 'C':
      return 'G';
    case 'G':
      return 'C';
    default:
      return 'A';
  }
}

export function isDnaSequenceComplete(
  playerStrand: (DnaBase | null)[],
  level: DnaSequenceLevel
): boolean {
  if (playerStrand.length !== level.templateStrand.length) return false;
  return level.templateStrand.every((base, idx) => {
    const expected = getComplementBase(base, level.mode);
    return playerStrand[idx] === expected;
  });
}

export function calculateDnaScore(
  mistakes: number,
  elapsedSeconds: number,
  baseCount: number
): { score: number; stars: 1 | 2 | 3; isPerfect: boolean } {
  const isPerfect = mistakes === 0;
  let stars: 1 | 2 | 3 = 1;
  if (mistakes === 0 && elapsedSeconds < baseCount * 4) {
    stars = 3;
  } else if (mistakes <= 1) {
    stars = 2;
  }
  const score = Math.max(50, baseCount * 50 - mistakes * 20 - elapsedSeconds);
  return { score, stars, isPerfect };
}
