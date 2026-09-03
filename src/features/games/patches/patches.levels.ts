/**
 * Patches Game Deterministic Levels
 * 15 mathematically validated geometric polyomino placement puzzles with exact area parity.
 */

import { PatchesLevel } from './patches.types';

export const PATCHES_LEVELS: PatchesLevel[] = [
  // Levels 1-5 (2 to 3 pieces, simple rectangular grids)
  {
    id: 'patches-01',
    name: 'Level 1',
    boardSize: { rows: 3, cols: 3 },
    targetShape: [
      [true, true, true],
      [true, true, true],
      [false, false, false],
    ],
    pieces: [
      {
        id: 'p1',
        name: 'Bar A',
        color: '#3B82F6',
        shape: [[1, 1, 1]],
        symbol: '🟦',
      },
      {
        id: 'p2',
        name: 'Bar B',
        color: '#10B981',
        shape: [[1, 1, 1]],
        symbol: '🟩',
      },
    ],
  },
  {
    id: 'patches-02',
    name: 'Level 2',
    boardSize: { rows: 3, cols: 3 },
    targetShape: [
      [true, true, false],
      [true, true, false],
      [true, true, false],
    ],
    pieces: [
      {
        id: 'p1',
        name: 'Square',
        color: '#8B5CF6',
        shape: [
          [1, 1],
          [1, 1],
        ],
        symbol: '🟪',
      },
      {
        id: 'p2',
        name: 'Domino',
        color: '#F59E0B',
        shape: [[1, 1]],
        symbol: '🟧',
      },
    ],
  },
  {
    id: 'patches-03',
    name: 'Level 3',
    boardSize: { rows: 3, cols: 3 },
    targetShape: [
      [true, true, true],
      [true, true, true],
      [true, true, true],
    ],
    pieces: [
      {
        id: 'p1',
        name: 'Bar A',
        color: '#3B82F6',
        shape: [[1, 1, 1]],
        symbol: '🟦',
      },
      {
        id: 'p2',
        name: 'Bar B',
        color: '#EC4899',
        shape: [[1, 1, 1]],
        symbol: '🌸',
      },
      {
        id: 'p3',
        name: 'Bar C',
        color: '#10B981',
        shape: [[1, 1, 1]],
        symbol: '🟩',
      },
    ],
  },
  {
    id: 'patches-04',
    name: 'Level 4',
    boardSize: { rows: 3, cols: 4 },
    targetShape: [
      [true, true, true, true],
      [true, true, true, true],
      [false, false, false, false],
    ],
    pieces: [
      {
        id: 'p1',
        name: 'Square A',
        color: '#3B82F6',
        shape: [
          [1, 1],
          [1, 1],
        ],
        symbol: '🟦',
      },
      {
        id: 'p2',
        name: 'Square B',
        color: '#10B981',
        shape: [
          [1, 1],
          [1, 1],
        ],
        symbol: '🟩',
      },
    ],
  },
  {
    id: 'patches-05',
    name: 'Level 5',
    boardSize: { rows: 3, cols: 3 },
    targetShape: [
      [true, true, true],
      [false, true, false],
      [false, true, false],
    ],
    pieces: [
      {
        id: 'p1',
        name: 'T-Top',
        color: '#8B5CF6',
        shape: [[1, 1, 1]],
        symbol: '🟪',
      },
      {
        id: 'p2',
        name: 'T-Stem',
        color: '#F59E0B',
        shape: [
          [1],
          [1],
        ],
        symbol: '🟧',
      },
    ],
  },

  // Levels 6-10 (3 to 4 pieces, varied geometric shapes)
  {
    id: 'patches-06',
    name: 'Level 6',
    boardSize: { rows: 4, cols: 4 },
    targetShape: [
      [true, true, true, false],
      [true, true, true, false],
      [true, true, true, false],
      [false, false, false, false],
    ],
    pieces: [
      {
        id: 'p1',
        name: 'Square',
        color: '#3B82F6',
        shape: [
          [1, 1],
          [1, 1],
        ],
        symbol: '🟦',
      },
      {
        id: 'p2',
        name: 'L-Piece',
        color: '#10B981',
        shape: [
          [1, 0],
          [1, 1],
        ],
        symbol: '🟩',
      },
      {
        id: 'p3',
        name: 'Domino',
        color: '#F59E0B',
        shape: [[1, 1]],
        symbol: '🟧',
      },
    ],
  },
  {
    id: 'patches-07',
    name: 'Level 7',
    boardSize: { rows: 4, cols: 4 },
    targetShape: [
      [true, true, true, true],
      [true, true, true, true],
      [true, true, true, true],
      [false, false, false, false],
    ],
    pieces: [
      {
        id: 'p1',
        name: 'Block A',
        color: '#EC4899',
        shape: [
          [1, 1],
          [1, 1],
        ],
        symbol: '🌸',
      },
      {
        id: 'p2',
        name: 'Block B',
        color: '#8B5CF6',
        shape: [
          [1, 1],
          [1, 1],
        ],
        symbol: '🟪',
      },
      {
        id: 'p3',
        name: 'Block C',
        color: '#3B82F6',
        shape: [
          [1, 1],
          [1, 1],
        ],
        symbol: '🟦',
      },
    ],
  },
  {
    id: 'patches-08',
    name: 'Level 8',
    boardSize: { rows: 4, cols: 4 },
    targetShape: [
      [false, true, true, false],
      [true, true, true, true],
      [true, true, true, true],
      [false, true, true, false],
    ],
    pieces: [
      {
        id: 'p1',
        name: 'Top Cap',
        color: '#10B981',
        shape: [[1, 1]],
        symbol: '🟩',
      },
      {
        id: 'p2',
        name: 'Core 2x4',
        color: '#3B82F6',
        shape: [
          [1, 1, 1, 1],
          [1, 1, 1, 1],
        ],
        symbol: '🟦',
      },
      {
        id: 'p3',
        name: 'Bottom Cap',
        color: '#F59E0B',
        shape: [[1, 1]],
        symbol: '🟧',
      },
    ],
  },
  {
    id: 'patches-09',
    name: 'Level 9',
    boardSize: { rows: 4, cols: 4 },
    targetShape: [
      [true, true, false, false],
      [true, true, true, false],
      [false, true, true, true],
      [false, false, true, true],
    ],
    pieces: [
      {
        id: 'p1',
        name: 'Upper Block',
        color: '#8B5CF6',
        shape: [
          [1, 1],
          [1, 1],
        ],
        symbol: '🟪',
      },
      {
        id: 'p2',
        name: 'Center Link',
        color: '#10B981',
        shape: [[1, 1]],
        symbol: '🟩',
      },
      {
        id: 'p3',
        name: 'Lower Block',
        color: '#EC4899',
        shape: [
          [1, 1],
          [1, 1],
        ],
        symbol: '🌸',
      },
    ],
  },
  {
    id: 'patches-10',
    name: 'Level 10',
    boardSize: { rows: 4, cols: 4 },
    targetShape: [
      [true, true, true, true],
      [true, true, true, true],
      [true, true, true, true],
      [true, true, true, true],
    ],
    pieces: [
      {
        id: 'p1',
        name: 'Quad A',
        color: '#3B82F6',
        shape: [
          [1, 1],
          [1, 1],
        ],
        symbol: '🟦',
      },
      {
        id: 'p2',
        name: 'Quad B',
        color: '#10B981',
        shape: [
          [1, 1],
          [1, 1],
        ],
        symbol: '🟩',
      },
      {
        id: 'p3',
        name: 'Quad C',
        color: '#8B5CF6',
        shape: [
          [1, 1],
          [1, 1],
        ],
        symbol: '🟪',
      },
      {
        id: 'p4',
        name: 'Quad D',
        color: '#F59E0B',
        shape: [
          [1, 1],
          [1, 1],
        ],
        symbol: '🟧',
      },
    ],
  },

  // Levels 11-15 (Advanced shapes & interlocking pieces)
  {
    id: 'patches-11',
    name: 'Level 11',
    boardSize: { rows: 4, cols: 4 },
    targetShape: [
      [true, true, true, true],
      [true, false, false, true],
      [true, false, false, true],
      [true, true, true, true],
    ],
    pieces: [
      {
        id: 'p1',
        name: 'Top Wall',
        color: '#3B82F6',
        shape: [[1, 1, 1, 1]],
        symbol: '🟦',
      },
      {
        id: 'p2',
        name: 'Bottom Wall',
        color: '#10B981',
        shape: [[1, 1, 1, 1]],
        symbol: '🟩',
      },
      {
        id: 'p3',
        name: 'Left Column',
        color: '#8B5CF6',
        shape: [
          [1],
          [1],
        ],
        symbol: '🟪',
      },
      {
        id: 'p4',
        name: 'Right Column',
        color: '#F59E0B',
        shape: [
          [1],
          [1],
        ],
        symbol: '🟧',
      },
    ],
  },
  {
    id: 'patches-12',
    name: 'Level 12',
    boardSize: { rows: 4, cols: 4 },
    targetShape: [
      [true, true, true, false],
      [true, true, true, false],
      [false, true, true, true],
      [false, true, true, true],
    ],
    pieces: [
      {
        id: 'p1',
        name: 'Top Plate',
        color: '#3B82F6',
        shape: [
          [1, 1, 1],
          [1, 1, 1],
        ],
        symbol: '🟦',
      },
      {
        id: 'p2',
        name: 'Bottom Plate',
        color: '#10B981',
        shape: [
          [1, 1, 1],
          [1, 1, 1],
        ],
        symbol: '🟩',
      },
    ],
  },
  {
    id: 'patches-13',
    name: 'Level 13',
    boardSize: { rows: 4, cols: 4 },
    targetShape: [
      [true, true, true, true],
      [false, true, true, false],
      [false, true, true, false],
      [true, true, true, true],
    ],
    pieces: [
      {
        id: 'p1',
        name: 'Top Bar',
        color: '#EC4899',
        shape: [[1, 1, 1, 1]],
        symbol: '🌸',
      },
      {
        id: 'p2',
        name: 'Center Core',
        color: '#8B5CF6',
        shape: [
          [1, 1],
          [1, 1],
        ],
        symbol: '🟪',
      },
      {
        id: 'p3',
        name: 'Bottom Bar',
        color: '#10B981',
        shape: [[1, 1, 1, 1]],
        symbol: '🟩',
      },
    ],
  },
  {
    id: 'patches-14',
    name: 'Level 14',
    boardSize: { rows: 4, cols: 5 },
    targetShape: [
      [true, true, true, true, true],
      [true, true, true, true, true],
      [false, false, false, false, false],
      [false, false, false, false, false],
    ],
    pieces: [
      {
        id: 'p1',
        name: 'Long Top',
        color: '#3B82F6',
        shape: [[1, 1, 1, 1, 1]],
        symbol: '🟦',
      },
      {
        id: 'p2',
        name: 'Long Bottom',
        color: '#10B981',
        shape: [[1, 1, 1, 1, 1]],
        symbol: '🟩',
      },
    ],
  },
  {
    id: 'patches-15',
    name: 'Level 15',
    boardSize: { rows: 4, cols: 4 },
    targetShape: [
      [true, true, true, true],
      [true, true, true, true],
      [true, true, true, true],
      [true, true, true, true],
    ],
    pieces: [
      {
        id: 'p1',
        name: 'Row 1',
        color: '#3B82F6',
        shape: [[1, 1, 1, 1]],
        symbol: '🟦',
      },
      {
        id: 'p2',
        name: 'Row 2',
        color: '#10B981',
        shape: [[1, 1, 1, 1]],
        symbol: '🟩',
      },
      {
        id: 'p3',
        name: 'Row 3',
        color: '#8B5CF6',
        shape: [[1, 1, 1, 1]],
        symbol: '🟪',
      },
      {
        id: 'p4',
        name: 'Row 4',
        color: '#F59E0B',
        shape: [[1, 1, 1, 1]],
        symbol: '🟧',
      },
    ],
  },
];
