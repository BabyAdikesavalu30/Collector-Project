export type DnaBase = 'A' | 'T' | 'C' | 'G' | 'U';

export interface DnaSequenceLevel {
  id: string;
  name: string;
  templateStrand: DnaBase[];
  mode: 'dna-pair' | 'rna-transcribe' | 'codon-match';
  targetProtein?: { en: string; ta: string };
  description: { en: string; ta: string };
}

export interface DnaSequenceState {
  levelIndex: number;
  level: DnaSequenceLevel;
  playerStrand: (DnaBase | null)[];
  activeSlotIndex: number;
  mistakes: number;
  moves: number;
  isCompleted: boolean;
  score: number;
}
