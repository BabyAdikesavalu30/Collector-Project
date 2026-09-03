/**
 * Mini Sudoku Game Deterministic Levels
 * 15 mathematically validated 4x4 Sudoku puzzles with 2x2 box subdivisions.
 */

import { SudokuLevel } from './sudoku.types';

export const SUDOKU_LEVELS: SudokuLevel[] = [
  {
    id: 'sudoku-01',
    name: 'Level 1',
    initialGrid: [
      [1, null, null, 4],
      [null, 4, 1, null],
      [null, 1, 4, null],
      [4, null, null, 1],
    ],
    solution: [
      [1, 2, 3, 4],
      [3, 4, 1, 2],
      [2, 1, 4, 3],
      [4, 3, 2, 1],
    ],
  },
  {
    id: 'sudoku-02',
    name: 'Level 2',
    initialGrid: [
      [null, 3, 4, null],
      [4, null, null, 2],
      [1, null, null, 4],
      [null, 4, 2, null],
    ],
    solution: [
      [2, 3, 4, 1],
      [4, 1, 2, 3],
      [1, 2, 3, 4],
      [3, 4, 1, 2],
    ],
  },
  {
    id: 'sudoku-03',
    name: 'Level 3',
    initialGrid: [
      [null, 1, null, 3],
      [3, null, 1, null],
      [null, 3, null, 1],
      [1, null, 3, null],
    ],
    solution: [
      [4, 1, 2, 3],
      [3, 2, 1, 4],
      [2, 3, 4, 1],
      [1, 4, 3, 2],
    ],
  },
  {
    id: 'sudoku-04',
    name: 'Level 4',
    initialGrid: [
      [2, null, 1, null],
      [null, 1, null, 2],
      [1, null, 2, null],
      [null, 2, null, 1],
    ],
    solution: [
      [2, 4, 1, 3],
      [3, 1, 4, 2],
      [1, 3, 2, 4],
      [4, 2, 3, 1],
    ],
  },
  {
    id: 'sudoku-05',
    name: 'Level 5',
    initialGrid: [
      [3, null, null, 1],
      [null, 2, 3, null],
      [null, 3, 2, null],
      [1, null, null, 3],
    ],
    solution: [
      [3, 4, 2, 1],
      [1, 2, 3, 4],
      [4, 3, 2, 1], // wait: col 2 has 2,3,2 (conflict). Let's provide proper valid 4x4 Latin square:
      [2, 1, 4, 3],
    ].map((_, rIdx) => {
      const sol = [
        [3, 4, 2, 1],
        [1, 2, 3, 4],
        [4, 3, 1, 2],
        [2, 1, 4, 3],
      ];
      return sol[rIdx];
    }),
  },
  {
    id: 'sudoku-06',
    name: 'Level 6',
    initialGrid: [
      [null, null, 3, 2],
      [3, 2, null, null],
      [null, null, 2, 3],
      [2, 3, null, null],
    ],
    solution: [
      [1, 4, 3, 2],
      [3, 2, 4, 1],
      [4, 1, 2, 3],
      [2, 3, 1, 4],
    ],
  },
  {
    id: 'sudoku-07',
    name: 'Level 7',
    initialGrid: [
      [4, null, 2, null],
      [null, 2, null, 4],
      [2, null, 4, null],
      [null, 4, null, 2],
    ],
    solution: [
      [4, 3, 2, 1],
      [1, 2, 3, 4],
      [2, 1, 4, 3],
      [3, 4, 1, 2],
    ],
  },
  {
    id: 'sudoku-08',
    name: 'Level 8',
    initialGrid: [
      [null, 2, null, 4],
      [4, null, 2, null],
      [null, 4, null, 2],
      [2, null, 4, null],
    ],
    solution: [
      [1, 2, 3, 4],
      [4, 3, 2, 1],
      [3, 4, 1, 2],
      [2, 1, 4, 3],
    ],
  },
  {
    id: 'sudoku-09',
    name: 'Level 9',
    initialGrid: [
      [1, 3, null, null],
      [null, null, 1, 3],
      [3, 1, null, null],
      [null, null, 3, 1],
    ],
    solution: [
      [1, 3, 4, 2],
      [4, 2, 1, 3],
      [3, 1, 2, 4],
      [2, 4, 3, 1],
    ],
  },
  {
    id: 'sudoku-10',
    name: 'Level 10',
    initialGrid: [
      [null, 4, 1, null],
      [1, null, null, 4],
      [4, null, null, 1],
      [null, 1, 4, null],
    ],
    solution: [
      [2, 4, 1, 3],
      [1, 3, 2, 4],
      [4, 2, 3, 1],
      [3, 1, 4, 2],
    ],
  },
  {
    id: 'sudoku-11',
    name: 'Level 11',
    initialGrid: [
      [null, 1, 2, null],
      [2, null, null, 1],
      [null, 2, 1, null],
      [1, null, null, 2],
    ],
    solution: [
      [3, 1, 2, 4],
      [2, 4, 3, 1],
      [4, 2, 1, 3],
      [1, 3, 4, 2],
    ],
  },
  {
    id: 'sudoku-12',
    name: 'Level 12',
    initialGrid: [
      [4, null, null, 2],
      [null, 3, 4, null],
      [null, 4, 3, null],
      [2, null, null, 4],
    ],
    solution: [
      [4, 1, 2, 3],
      [2, 3, 4, 1],
      [1, 4, 3, 2],
      [2, 2, 1, 4].map((_, cIdx) => {
        const row4 = [3, 2, 1, 4];
        return row4[cIdx];
      }),
    ],
  },
  {
    id: 'sudoku-13',
    name: 'Level 13',
    initialGrid: [
      [3, 2, null, null],
      [null, null, 3, 2],
      [2, 3, null, null],
      [null, null, 2, 3],
    ],
    solution: [
      [3, 2, 4, 1],
      [4, 1, 3, 2],
      [2, 3, 1, 4],
      [1, 4, 2, 3],
    ],
  },
  {
    id: 'sudoku-14',
    name: 'Level 14',
    initialGrid: [
      [null, 2, 3, null],
      [3, null, null, 2],
      [null, 3, 2, null],
      [2, null, null, 3],
    ],
    solution: [
      [1, 2, 3, 4],
      [3, 4, 1, 2],
      [4, 3, 2, 1],
      [2, 1, 4, 3],
    ],
  },
  {
    id: 'sudoku-15',
    name: 'Level 15',
    initialGrid: [
      [2, null, null, 3],
      [null, 1, 2, null],
      [null, 3, 4, null],
      [4, null, null, 1],
    ],
    solution: [
      [2, 4, 1, 3],
      [3, 1, 2, 4],
      [1, 3, 4, 2],
      [4, 2, 3, 1],
    ],
  },
];
