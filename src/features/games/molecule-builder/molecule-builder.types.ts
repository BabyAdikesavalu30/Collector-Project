export interface AtomToken {
  id: string;
  symbol: string;
  name: { en: string; ta: string };
  valence: number;
  color: string;
}

export interface MoleculeLevel {
  id: string;
  name: string;
  targetFormula: string;
  targetName: { en: string; ta: string };
  description: { en: string; ta: string };
  requiredAtoms: Record<string, number>; // e.g. { H: 2, O: 1 }
  availableAtoms: AtomToken[];
}

export interface MoleculeBuilderState {
  levelIndex: number;
  level: MoleculeLevel;
  selectedAtoms: AtomToken[];
  isCompleted: boolean;
  moves: number;
  score: number;
}
