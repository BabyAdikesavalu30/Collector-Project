export interface SortItem {
  id: string;
  name: { en: string; ta: string };
  categoryKey: string;
  hint?: { en: string; ta: string };
  icon: string;
}

export interface SortCategory {
  key: string;
  label: { en: string; ta: string };
  color: string;
}

export interface ReactionSortLevel {
  id: string;
  name: string;
  topic: { en: string; ta: string };
  categories: SortCategory[];
  items: SortItem[];
}

export interface ReactionSortState {
  levelIndex: number;
  level: ReactionSortLevel;
  sortedItems: Record<string, string[]>; // categoryKey -> itemIds
  currentItemIndex: number;
  mistakes: number;
  moves: number;
  isCompleted: boolean;
  score: number;
}
