import { CircuitLabLevel } from './circuit-lab.types';

export const CIRCUIT_LAB_LEVELS: CircuitLabLevel[] = [
  {
    id: 'circuit-01',
    name: 'Level 1: Simple Loop',
    gridSize: { rows: 3, cols: 3 },
    description: {
      en: 'Complete the loop between battery and light bulb.',
      ta: 'மின்கலத்திற்கும் மின்விளக்கிற்கும் இடையே மின்சுற்றை நிறைவுசெய்க.',
    },
    fixedCells: [
      { row: 0, col: 0 },
      { row: 2, col: 2 },
    ],
    initialGrid: [
      ['corner-tl', 'empty', 'corner-tr'],
      ['empty', 'bulb', 'empty'],
      ['corner-bl', 'empty', 'corner-br'],
    ],
    targetComponents: ['wire-horizontal', 'wire-vertical', 'bulb', 'battery'],
  },
  {
    id: 'circuit-02',
    name: 'Level 2: Switch It On',
    gridSize: { rows: 3, cols: 3 },
    description: {
      en: 'Include a closed switch to allow electrons to flow.',
      ta: 'மின்சாரம் பாய மூடிய மின் இணைப்பை ஏற்படுத்தவும்.',
    },
    fixedCells: [
      { row: 0, col: 0 },
      { row: 0, col: 2 },
    ],
    initialGrid: [
      ['corner-tl', 'switch-closed', 'corner-tr'],
      ['wire-vertical', 'empty', 'bulb'],
      ['corner-bl', 'empty', 'corner-br'],
    ],
    targetComponents: ['wire-horizontal', 'switch-closed'],
  },
  {
    id: 'circuit-03',
    name: 'Level 3: Dual Bulbs',
    gridSize: { rows: 3, cols: 3 },
    description: {
      en: 'Wire two bulbs in series along the conductive path.',
      ta: 'தொடர் இணைப்பில் இரண்டு மின்விளக்குகளை இணைக்கவும்.',
    },
    fixedCells: [
      { row: 0, col: 1 },
      { row: 2, col: 1 },
    ],
    initialGrid: [
      ['corner-tl', 'bulb', 'corner-tr'],
      ['empty', 'empty', 'empty'],
      ['corner-bl', 'bulb', 'corner-br'],
    ],
    targetComponents: ['wire-vertical'],
  },
  {
    id: 'circuit-04',
    name: 'Level 4: Resistor Guard',
    gridSize: { rows: 3, cols: 3 },
    description: {
      en: 'Protect the circuit with a current-limiting resistor.',
      ta: 'மின்னோட்டத்தை ஒழுங்குபடுத்த மின்தடையை சேர்க்கவும்.',
    },
    fixedCells: [
      { row: 0, col: 0 },
      { row: 2, col: 0 },
    ],
    initialGrid: [
      ['corner-tl', 'resistor', 'corner-tr'],
      ['empty', 'empty', 'bulb'],
      ['corner-bl', 'empty', 'corner-br'],
    ],
    targetComponents: ['wire-horizontal', 'wire-vertical'],
  },
  {
    id: 'circuit-05',
    name: 'Level 5: Master Grid 3x3',
    gridSize: { rows: 3, cols: 3 },
    description: {
      en: 'Route all 4 corners and complete the closed loop.',
      ta: 'அனைத்து மூலைகளையும் இணைத்து மின்சுற்றை நிறைவுசெய்க.',
    },
    fixedCells: [{ row: 1, col: 0 }],
    initialGrid: [
      ['corner-tl', 'empty', 'corner-tr'],
      ['bulb', 'empty', 'resistor'],
      ['corner-bl', 'empty', 'corner-br'],
    ],
    targetComponents: ['wire-horizontal', 'wire-vertical'],
  },
  {
    id: 'circuit-06',
    name: 'Level 6: Parallel Loop 4x3',
    gridSize: { rows: 4, cols: 3 },
    description: {
      en: 'Extended 4-row circuit loop with central power.',
      ta: 'நீட்டிக்கப்பட்ட 4-வரிசை மின்சுற்று இணைப்பு.',
    },
    fixedCells: [
      { row: 0, col: 0 },
      { row: 3, col: 2 },
    ],
    initialGrid: [
      ['corner-tl', 'wire-horizontal', 'corner-tr'],
      ['empty', 'empty', 'wire-vertical'],
      ['bulb', 'empty', 'empty'],
      ['corner-bl', 'wire-horizontal', 'corner-br'],
    ],
    targetComponents: ['wire-vertical'],
  },
  {
    id: 'circuit-07',
    name: 'Level 7: Precision Resistor',
    gridSize: { rows: 4, cols: 3 },
    description: {
      en: 'Balance two bulbs with a central protective resistor.',
      ta: 'இரண்டு விளக்குகள் மற்றும் ஒரு மின்தடையை இணைக்கவும்.',
    },
    fixedCells: [
      { row: 1, col: 1 },
      { row: 2, col: 1 },
    ],
    initialGrid: [
      ['corner-tl', 'empty', 'corner-tr'],
      ['bulb', 'resistor', 'bulb'],
      ['wire-vertical', 'empty', 'wire-vertical'],
      ['corner-bl', 'empty', 'corner-br'],
    ],
    targetComponents: ['wire-horizontal'],
  },
  {
    id: 'circuit-08',
    name: 'Level 8: 4x4 Circuit Board',
    gridSize: { rows: 4, cols: 4 },
    description: {
      en: 'Navigate a 4x4 circuit grid around central insulation.',
      ta: '4x4 பலகையில் முழு மின்சுற்றை உருவாக்கவும்.',
    },
    fixedCells: [
      { row: 0, col: 0 },
      { row: 0, col: 3 },
      { row: 3, col: 0 },
      { row: 3, col: 3 },
    ],
    initialGrid: [
      ['corner-tl', 'empty', 'empty', 'corner-tr'],
      ['wire-vertical', 'empty', 'empty', 'bulb'],
      ['empty', 'empty', 'empty', 'wire-vertical'],
      ['corner-bl', 'empty', 'empty', 'corner-br'],
    ],
    targetComponents: ['wire-horizontal', 'wire-vertical'],
  },
  {
    id: 'circuit-09',
    name: 'Level 9: High Voltage Loop',
    gridSize: { rows: 4, cols: 4 },
    description: {
      en: 'Multiple bulbs and switches in a comprehensive circuit.',
      ta: 'பல விளக்குகள் மற்றும் இணைப்புகளைக் கொண்ட மின்சுற்று.',
    },
    fixedCells: [
      { row: 0, col: 1 },
      { row: 3, col: 2 },
    ],
    initialGrid: [
      ['corner-tl', 'bulb', 'empty', 'corner-tr'],
      ['wire-vertical', 'empty', 'empty', 'switch-closed'],
      ['switch-closed', 'empty', 'empty', 'bulb'],
      ['corner-bl', 'empty', 'resistor', 'corner-br'],
    ],
    targetComponents: ['wire-horizontal', 'wire-vertical'],
  },
  {
    id: 'circuit-10',
    name: 'Level 10: Power Substation',
    gridSize: { rows: 4, cols: 4 },
    description: {
      en: 'Complete the master circuit powering all 3 science indicators.',
      ta: 'அனைத்து அறிவியல் கருவிகளையும் இயக்கும் முதன்மை மின்சுற்று.',
    },
    fixedCells: [
      { row: 0, col: 0 },
      { row: 1, col: 3 },
      { row: 2, col: 0 },
      { row: 3, col: 3 },
    ],
    initialGrid: [
      ['corner-tl', 'empty', 'empty', 'corner-tr'],
      ['bulb', 'empty', 'empty', 'bulb'],
      ['bulb', 'empty', 'empty', 'resistor'],
      ['corner-bl', 'empty', 'empty', 'corner-br'],
    ],
    targetComponents: ['wire-horizontal', 'wire-vertical', 'switch-closed'],
  },
];
