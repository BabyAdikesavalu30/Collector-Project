/**
 * Tango Game Deterministic Levels
 * 15 mathematically validated 4x4 Sun ☀️ and Moon 🌙 balance puzzles with equality/opposite clues.
 */

import { TangoLevel } from './tango.types';

export const TANGO_LEVELS: TangoLevel[] = [
  {
    id: 'tango-01',
    name: 'Level 1',
    initialGrid: [
      ['sun', null, null, 'moon'],
      [null, 'sun', null, null],
      [null, null, 'sun', null],
      ['moon', null, null, 'sun'],
    ],
    clues: [
      { type: 'opposite', cell1: { row: 0, col: 0 }, cell2: { row: 0, col: 1 } },
      { type: 'equal', cell1: { row: 1, col: 1 }, cell2: { row: 1, col: 3 } },
    ],
    solution: [
      ['sun', 'moon', 'sun', 'moon'],
      ['moon', 'sun', 'moon', 'sun'],
      ['sun', 'moon', 'sun', 'moon'],
      ['moon', 'sun', 'moon', 'sun'],
    ],
  },
  {
    id: 'tango-02',
    name: 'Level 2',
    initialGrid: [
      ['sun', 'sun', null, null],
      [null, null, 'sun', 'sun'],
      ['sun', null, null, 'moon'],
      [null, 'sun', 'moon', null],
    ],
    clues: [
      { type: 'equal', cell1: { row: 0, col: 2 }, cell2: { row: 0, col: 3 } },
      { type: 'opposite', cell1: { row: 2, col: 0 }, cell2: { row: 3, col: 0 } },
    ],
    solution: [
      ['sun', 'sun', 'moon', 'moon'],
      ['moon', 'moon', 'sun', 'sun'],
      ['sun', 'moon', 'sun', 'moon'],
      ['moon', 'sun', 'moon', 'sun'],
    ],
  },
  {
    id: 'tango-03',
    name: 'Level 3',
    initialGrid: [
      ['moon', null, null, 'moon'],
      [null, 'moon', null, null],
      [null, null, 'sun', null],
      ['sun', null, null, 'sun'],
    ],
    clues: [
      { type: 'equal', cell1: { row: 0, col: 1 }, cell2: { row: 0, col: 2 } },
      { type: 'opposite', cell1: { row: 1, col: 0 }, cell2: { row: 2, col: 0 } },
    ],
    solution: [
      ['moon', 'sun', 'sun', 'moon'],
      ['sun', 'moon', 'moon', 'sun'],
      ['moon', 'sun', 'sun', 'moon'],
      ['sun', 'moon', 'moon', 'sun'],
    ],
  },
  {
    id: 'tango-04',
    name: 'Level 4',
    initialGrid: [
      [null, 'moon', 'moon', null],
      ['moon', null, null, 'moon'],
      ['sun', 'sun', null, null],
      [null, null, 'sun', 'sun'],
    ],
    clues: [
      { type: 'equal', cell1: { row: 0, col: 0 }, cell2: { row: 0, col: 3 } },
      { type: 'opposite', cell1: { row: 0, col: 1 }, cell2: { row: 1, col: 1 } },
    ],
    solution: [
      ['sun', 'moon', 'moon', 'sun'],
      ['moon', 'sun', 'sun', 'moon'],
      ['sun', 'sun', 'moon', 'moon'],
      ['moon', 'moon', 'sun', 'sun'],
    ],
  },
  {
    id: 'tango-05',
    name: 'Level 5',
    initialGrid: [
      ['moon', 'sun', null, null],
      [null, null, 'moon', 'moon'],
      [null, 'moon', 'sun', null],
      ['sun', null, null, 'moon'],
    ],
    clues: [
      { type: 'opposite', cell1: { row: 0, col: 2 }, cell2: { row: 0, col: 3 } },
      { type: 'equal', cell1: { row: 1, col: 0 }, cell2: { row: 1, col: 1 } },
    ],
    solution: [
      ['moon', 'sun', 'moon', 'sun'],
      ['sun', 'sun', 'moon', 'moon'],
      ['moon', 'moon', 'sun', 'sun'],
      ['sun', 'moon', 'sun', 'moon'],
    ],
  },
  {
    id: 'tango-06',
    name: 'Level 6',
    initialGrid: [
      ['sun', null, 'sun', null],
      ['sun', 'moon', null, null],
      [null, null, 'sun', 'moon'],
      [null, 'sun', null, 'sun'],
    ],
    clues: [
      { type: 'opposite', cell1: { row: 0, col: 0 }, cell2: { row: 0, col: 1 } },
      { type: 'equal', cell1: { row: 1, col: 1 }, cell2: { row: 1, col: 2 } },
    ],
    solution: [
      ['sun', 'moon', 'sun', 'moon'],
      ['sun', 'moon', 'moon', 'sun'],
      ['moon', 'sun', 'sun', 'moon'],
      ['moon', 'sun', 'moon', 'sun'],
    ],
  },
  {
    id: 'tango-07',
    name: 'Level 7',
    initialGrid: [
      ['moon', 'moon', null, null],
      ['sun', null, 'sun', null],
      [null, 'sun', null, 'sun'],
      [null, null, 'moon', 'moon'],
    ],
    clues: [
      { type: 'equal', cell1: { row: 0, col: 0 }, cell2: { row: 0, col: 1 } },
      { type: 'equal', cell1: { row: 3, col: 0 }, cell2: { row: 3, col: 1 } },
    ],
    solution: [
      ['moon', 'moon', 'sun', 'sun'],
      ['sun', 'moon', 'sun', 'moon'],
      ['moon', 'sun', 'moon', 'sun'],
      ['sun', 'sun', 'moon', 'moon'],
    ],
  },
  {
    id: 'tango-08',
    name: 'Level 8',
    initialGrid: [
      [null, 'sun', 'moon', null],
      ['moon', null, null, 'moon'],
      ['sun', null, null, 'sun'],
      [null, 'moon', 'sun', null],
    ],
    clues: [
      { type: 'equal', cell1: { row: 0, col: 0 }, cell2: { row: 0, col: 1 } },
      { type: 'equal', cell1: { row: 3, col: 0 }, cell2: { row: 3, col: 1 } },
    ],
    solution: [
      ['sun', 'sun', 'moon', 'moon'],
      ['moon', 'sun', 'sun', 'moon'],
      ['sun', 'moon', 'moon', 'sun'],
      ['moon', 'moon', 'sun', 'sun'],
    ],
  },
  {
    id: 'tango-09',
    name: 'Level 9',
    initialGrid: [
      ['moon', null, null, 'moon'],
      [null, 'sun', 'moon', null],
      [null, 'moon', 'sun', null],
      ['sun', null, null, 'sun'],
    ],
    clues: [
      { type: 'equal', cell1: { row: 0, col: 1 }, cell2: { row: 0, col: 2 } },
      { type: 'equal', cell1: { row: 1, col: 0 }, cell2: { row: 1, col: 1 } },
    ],
    solution: [
      ['moon', 'sun', 'sun', 'moon'],
      ['sun', 'sun', 'moon', 'moon'],
      ['moon', 'moon', 'sun', 'sun'],
      ['sun', 'moon', 'moon', 'sun'],
    ],
  },
  {
    id: 'tango-10',
    name: 'Level 10',
    initialGrid: [
      ['sun', null, null, 'sun'],
      ['moon', null, null, 'moon'],
      [null, 'sun', 'moon', null],
      [null, 'moon', 'sun', null],
    ],
    clues: [
      { type: 'equal', cell1: { row: 0, col: 1 }, cell2: { row: 0, col: 2 } },
      { type: 'equal', cell1: { row: 1, col: 1 }, cell2: { row: 1, col: 2 } },
    ],
    solution: [
      ['sun', 'moon', 'moon', 'sun'],
      ['moon', 'sun', 'sun', 'moon'],
      ['moon', 'sun', 'moon', 'sun'],
      ['sun', 'moon', 'sun', 'moon'],
    ],
  },
  {
    id: 'tango-11',
    name: 'Level 11',
    initialGrid: [
      [null, 'sun', 'moon', null],
      ['sun', null, null, 'moon'],
      ['moon', null, null, 'sun'],
      [null, 'moon', 'sun', null],
    ],
    clues: [
      { type: 'equal', cell1: { row: 0, col: 0 }, cell2: { row: 0, col: 1 } },
      { type: 'opposite', cell1: { row: 0, col: 1 }, cell2: { row: 0, col: 2 } },
    ],
    solution: [
      ['sun', 'sun', 'moon', 'moon'],
      ['sun', 'moon', 'sun', 'moon'],
      ['moon', 'sun', 'moon', 'sun'],
      ['moon', 'moon', 'sun', 'sun'],
    ],
  },
  {
    id: 'tango-12',
    name: 'Level 12',
    initialGrid: [
      ['moon', null, 'sun', null],
      [null, 'sun', null, 'moon'],
      [null, 'moon', null, 'sun'],
      ['sun', null, 'moon', null],
    ],
    clues: [
      { type: 'opposite', cell1: { row: 0, col: 0 }, cell2: { row: 0, col: 1 } },
      { type: 'equal', cell1: { row: 1, col: 0 }, cell2: { row: 1, col: 1 } },
    ],
    solution: [
      ['moon', 'sun', 'sun', 'moon'],
      ['sun', 'sun', 'moon', 'moon'],
      ['moon', 'moon', 'sun', 'sun'],
      ['sun', 'moon', 'moon', 'sun'],
    ],
  },
  {
    id: 'tango-13',
    name: 'Level 13',
    initialGrid: [
      ['sun', 'moon', null, null],
      [null, null, 'moon', 'sun'],
      ['moon', 'sun', null, null],
      [null, null, 'sun', 'moon'],
    ],
    clues: [
      { type: 'opposite', cell1: { row: 0, col: 0 }, cell2: { row: 0, col: 1 } },
      { type: 'equal', cell1: { row: 1, col: 0 }, cell2: { row: 2, col: 0 } },
    ],
    solution: [
      ['sun', 'moon', 'sun', 'moon'],
      ['moon', 'sun', 'moon', 'sun'],
      ['moon', 'sun', 'moon', 'sun'],
      ['sun', 'moon', 'sun', 'moon'],
    ],
  },
  {
    id: 'tango-14',
    name: 'Level 14',
    initialGrid: [
      [null, 'moon', 'sun', null],
      ['sun', null, null, 'moon'],
      ['moon', null, null, 'sun'],
      [null, 'sun', 'moon', null],
    ],
    clues: [
      { type: 'equal', cell1: { row: 0, col: 0 }, cell2: { row: 0, col: 1 } },
      { type: 'equal', cell1: { row: 3, col: 0 }, cell2: { row: 3, col: 1 } },
    ],
    solution: [
      ['moon', 'moon', 'sun', 'sun'],
      ['sun', 'sun', 'moon', 'moon'],
      ['moon', 'moon', 'sun', 'sun'],
      ['sun', 'sun', 'moon', 'moon'],
    ],
  },
  {
    id: 'tango-15',
    name: 'Level 15',
    initialGrid: [
      ['sun', null, null, 'sun'],
      [null, 'moon', 'sun', null],
      [null, 'sun', 'moon', null],
      ['moon', null, null, 'moon'],
    ],
    clues: [
      { type: 'equal', cell1: { row: 0, col: 1 }, cell2: { row: 0, col: 2 } },
      { type: 'equal', cell1: { row: 1, col: 0 }, cell2: { row: 1, col: 1 } },
    ],
    solution: [
      ['sun', 'moon', 'moon', 'sun'],
      ['moon', 'moon', 'sun', 'sun'],
      ['sun', 'sun', 'moon', 'moon'],
      ['moon', 'sun', 'sun', 'moon'],
    ],
  },
];
