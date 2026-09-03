/**
 * Zip Game Deterministic Levels
 * 15 mathematically validated continuous path levels (3x3 to 5x5).
 */

import { ZipLevel } from './zip.types';

export const ZIP_LEVELS: ZipLevel[] = [
  // 3x3 Levels (1 to 4)
  {
    id: 'zip-01',
    name: 'Level 1',
    size: 3,
    targetLength: 9,
    checkpoints: [
      { number: 1, row: 0, col: 0 },
      { number: 2, row: 0, col: 2 },
      { number: 3, row: 2, col: 0 },
      { number: 4, row: 2, col: 2 },
    ],
  },
  {
    id: 'zip-02',
    name: 'Level 2',
    size: 3,
    targetLength: 9,
    checkpoints: [
      { number: 1, row: 0, col: 0 },
      { number: 2, row: 2, col: 0 },
      { number: 3, row: 0, col: 2 },
      { number: 4, row: 2, col: 2 },
    ],
  },
  {
    id: 'zip-03',
    name: 'Level 3',
    size: 3,
    targetLength: 9,
    checkpoints: [
      { number: 1, row: 0, col: 1 },
      { number: 2, row: 1, col: 0 },
      { number: 3, row: 2, col: 1 },
      { number: 4, row: 1, col: 2 },
    ],
  },
  {
    id: 'zip-04',
    name: 'Level 4',
    size: 3,
    targetLength: 9,
    checkpoints: [
      { number: 1, row: 2, col: 0 },
      { number: 2, row: 0, col: 0 },
      { number: 3, row: 0, col: 2 },
      { number: 4, row: 2, col: 2 },
    ],
  },

  // 4x4 Levels (5 to 10)
  {
    id: 'zip-05',
    name: 'Level 5',
    size: 4,
    targetLength: 16,
    checkpoints: [
      { number: 1, row: 0, col: 0 },
      { number: 2, row: 0, col: 3 },
      { number: 3, row: 1, col: 0 },
      { number: 4, row: 3, col: 0 },
      { number: 5, row: 3, col: 3 },
    ],
  },
  {
    id: 'zip-06',
    name: 'Level 6',
    size: 4,
    targetLength: 16,
    checkpoints: [
      { number: 1, row: 0, col: 0 },
      { number: 2, row: 3, col: 0 },
      { number: 3, row: 3, col: 1 },
      { number: 4, row: 0, col: 2 },
      { number: 5, row: 3, col: 3 },
    ],
  },
  {
    id: 'zip-07',
    name: 'Level 7',
    size: 4,
    targetLength: 16,
    checkpoints: [
      { number: 1, row: 0, col: 0 },
      { number: 2, row: 0, col: 3 },
      { number: 3, row: 3, col: 3 },
      { number: 4, row: 3, col: 0 },
      { number: 5, row: 2, col: 1 },
    ],
  },
  {
    id: 'zip-08',
    name: 'Level 8',
    size: 4,
    targetLength: 16,
    checkpoints: [
      { number: 1, row: 1, col: 0 },
      { number: 2, row: 0, col: 3 },
      { number: 3, row: 3, col: 3 },
      { number: 4, row: 3, col: 0 },
      { number: 5, row: 2, col: 1 },
    ],
  },
  {
    id: 'zip-09',
    name: 'Level 9',
    size: 4,
    targetLength: 16,
    checkpoints: [
      { number: 1, row: 0, col: 1 },
      { number: 2, row: 0, col: 3 },
      { number: 3, row: 3, col: 3 },
      { number: 4, row: 3, col: 1 },
      { number: 5, row: 1, col: 0 },
    ],
  },
  {
    id: 'zip-10',
    name: 'Level 10',
    size: 4,
    targetLength: 16,
    checkpoints: [
      { number: 1, row: 0, col: 0 },
      { number: 2, row: 1, col: 3 },
      { number: 3, row: 2, col: 0 },
      { number: 4, row: 3, col: 3 },
      { number: 5, row: 3, col: 0 },
    ],
  },

  // 5x5 Levels (11 to 15)
  {
    id: 'zip-11',
    name: 'Level 11',
    size: 5,
    targetLength: 25,
    checkpoints: [
      { number: 1, row: 0, col: 0 },
      { number: 2, row: 0, col: 4 },
      { number: 3, row: 2, col: 4 },
      { number: 4, row: 2, col: 0 },
      { number: 5, row: 4, col: 0 },
      { number: 6, row: 4, col: 4 },
    ],
  },
  {
    id: 'zip-12',
    name: 'Level 12',
    size: 5,
    targetLength: 25,
    checkpoints: [
      { number: 1, row: 0, col: 0 },
      { number: 2, row: 4, col: 0 },
      { number: 3, row: 4, col: 2 },
      { number: 4, row: 0, col: 2 },
      { number: 5, row: 0, col: 4 },
      { number: 6, row: 4, col: 4 },
    ],
  },
  {
    id: 'zip-13',
    name: 'Level 13',
    size: 5,
    targetLength: 25,
    checkpoints: [
      { number: 1, row: 0, col: 2 },
      { number: 2, row: 0, col: 0 },
      { number: 3, row: 4, col: 0 },
      { number: 4, row: 4, col: 4 },
      { number: 5, row: 0, col: 4 },
      { number: 6, row: 2, col: 2 },
    ],
  },
  {
    id: 'zip-14',
    name: 'Level 14',
    size: 5,
    targetLength: 25,
    checkpoints: [
      { number: 1, row: 0, col: 0 },
      { number: 2, row: 0, col: 4 },
      { number: 3, row: 4, col: 4 },
      { number: 4, row: 4, col: 0 },
      { number: 5, row: 2, col: 1 },
      { number: 6, row: 2, col: 3 },
    ],
  },
  {
    id: 'zip-15',
    name: 'Level 15',
    size: 5,
    targetLength: 25,
    checkpoints: [
      { number: 1, row: 2, col: 2 },
      { number: 2, row: 0, col: 0 },
      { number: 3, row: 0, col: 4 },
      { number: 4, row: 4, col: 4 },
      { number: 5, row: 4, col: 0 },
      { number: 6, row: 1, col: 2 },
    ],
  },
];
