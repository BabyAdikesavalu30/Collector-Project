import { MagnetMazeLevel } from './magnet-maze.types';

export const MAGNET_MAZE_LEVELS: MagnetMazeLevel[] = [
  {
    id: 'mag-01',
    name: 'Level 1: Magnetic Attraction (N ↔ S)',
    gridSize: { rows: 4, cols: 4 },
    start: { row: 0, col: 0, initialPole: 'N' },
    target: { row: 3, col: 3, targetPole: 'S' },
    walls: [{ row: 1, col: 1 }],
    emitters: [{ row: 0, col: 3, pole: 'S', strength: 1 }],
    maxSteps: 8,
    description: {
      en: 'Opposite poles attract: Guide North sphere towards South emitter and into target.',
      ta: 'எதிர் துருவங்கள் ஈர்க்கும்: வட துருவ துகளை தென் துருவ இலக்கு நோக்கி செலுத்தவும்.',
    },
  },
  {
    id: 'mag-02',
    name: 'Level 2: Repulsion Slingshot (N ↔ N)',
    gridSize: { rows: 4, cols: 4 },
    start: { row: 0, col: 0, initialPole: 'N' },
    target: { row: 3, col: 0, targetPole: 'S' },
    walls: [
      { row: 1, col: 1 },
      { row: 2, col: 1 },
    ],
    emitters: [{ row: 0, col: 2, pole: 'N', strength: 1 }],
    maxSteps: 8,
    description: {
      en: 'Same poles repel: Use North emitter repulsion to push particle around the central wall.',
      ta: 'ஒத்த துருவங்கள் விலக்கும்: வட துருவ விலக்கு விசையைப் பயன்படுத்தி சுவரை கடக்கவும்.',
    },
  },
  {
    id: 'mag-03',
    name: 'Level 3: Polarity Switch Chamber',
    gridSize: { rows: 5, cols: 5 },
    start: { row: 0, col: 0, initialPole: 'N' },
    target: { row: 4, col: 4, targetPole: 'N' },
    walls: [
      { row: 2, col: 1 },
      { row: 2, col: 2 },
      { row: 2, col: 3 },
    ],
    emitters: [
      { row: 0, col: 4, pole: 'S', strength: 1 },
      { row: 4, col: 0, pole: 'N', strength: 1 },
    ],
    maxSteps: 12,
    description: {
      en: 'Switch between North and South charges to navigate between barriers.',
      ta: 'துருவங்களை மாற்றி தடைகளுக்கு இடையே வழிநடத்தவும்.',
    },
  },
  {
    id: 'mag-04',
    name: 'Level 4: Magnetic Corridor',
    gridSize: { rows: 5, cols: 5 },
    start: { row: 2, col: 0, initialPole: 'S' },
    target: { row: 2, col: 4, targetPole: 'N' },
    walls: [
      { row: 1, col: 1 },
      { row: 1, col: 2 },
      { row: 1, col: 3 },
      { row: 3, col: 1 },
      { row: 3, col: 2 },
      { row: 3, col: 3 },
    ],
    emitters: [
      { row: 0, col: 2, pole: 'S', strength: 1 },
      { row: 4, col: 2, pole: 'S', strength: 1 },
    ],
    maxSteps: 10,
    description: {
      en: 'Channel the magnetic beam through the central straight corridor.',
      ta: 'மையப் பாதை வழியாக காந்தக் கற்றையை செலுத்தவும்.',
    },
  },
  {
    id: 'mag-05',
    name: 'Level 5: Dual Deflector Arena',
    gridSize: { rows: 5, cols: 5 },
    start: { row: 0, col: 2, initialPole: 'N' },
    target: { row: 4, col: 2, targetPole: 'S' },
    walls: [
      { row: 2, col: 1 },
      { row: 2, col: 3 },
    ],
    emitters: [
      { row: 2, col: 0, pole: 'N', strength: 1 },
      { row: 2, col: 4, pole: 'N', strength: 1 },
    ],
    maxSteps: 12,
    description: {
      en: 'Dual North deflectors funnel the particle straight down the center line.',
      ta: 'இருபுற வட துருவ விலக்கிகள் துகளை நேர்கோட்டில் செலுத்துகின்றன.',
    },
  },
  {
    id: 'mag-06',
    name: 'Level 6: Horseshoe Magnet Arc',
    gridSize: { rows: 5, cols: 5 },
    start: { row: 4, col: 0, initialPole: 'N' },
    target: { row: 4, col: 4, targetPole: 'N' },
    walls: [
      { row: 3, col: 2 },
      { row: 4, col: 2 },
      { row: 2, col: 2 },
    ],
    emitters: [{ row: 0, col: 2, pole: 'S', strength: 1 }],
    maxSteps: 14,
    description: {
      en: 'U-turn trajectory pulled upward by the top South attraction pole.',
      ta: 'மேல் உள்ள தென் துருவ ஈர்ப்பால் U-வடிவ வளைவில் பயணிக்கவும்.',
    },
  },
  {
    id: 'mag-07',
    name: 'Level 7: Quad Magnet Vortex',
    gridSize: { rows: 5, cols: 5 },
    start: { row: 0, col: 0, initialPole: 'N' },
    target: { row: 2, col: 2, targetPole: 'S' },
    walls: [
      { row: 1, col: 2 },
      { row: 3, col: 2 },
    ],
    emitters: [
      { row: 0, col: 4, pole: 'N', strength: 1 },
      { row: 4, col: 4, pole: 'S', strength: 1 },
      { row: 4, col: 0, pole: 'N', strength: 1 },
    ],
    maxSteps: 14,
    description: {
      en: 'Spiral into the center collector using multi-pole forces.',
      ta: 'சுழல் பாதையில் பயணித்து மைய இலக்கை அடையவும்.',
    },
  },
  {
    id: 'mag-08',
    name: 'Level 8: Zig-Zag Deflection Field',
    gridSize: { rows: 5, cols: 5 },
    start: { row: 0, col: 0, initialPole: 'S' },
    target: { row: 4, col: 4, targetPole: 'S' },
    walls: [
      { row: 1, col: 3 },
      { row: 3, col: 1 },
    ],
    emitters: [
      { row: 1, col: 1, pole: 'S', strength: 1 },
      { row: 3, col: 3, pole: 'S', strength: 1 },
    ],
    maxSteps: 14,
    description: {
      en: 'Zig-zag between repulsion nodes without hitting dead-ends.',
      ta: 'விலக்கு விசைகளுக்கு இடையே வளைந்து நெளிந்து பயணிக்கவும்.',
    },
  },
  {
    id: 'mag-09',
    name: 'Level 9: Superconducting Trap',
    gridSize: { rows: 5, cols: 5 },
    start: { row: 4, col: 0, initialPole: 'N' },
    target: { row: 0, col: 4, targetPole: 'S' },
    walls: [
      { row: 1, col: 1 },
      { row: 2, col: 2 },
      { row: 3, col: 3 },
    ],
    emitters: [
      { row: 0, col: 0, pole: 'N', strength: 1 },
      { row: 4, col: 4, pole: 'N', strength: 1 },
    ],
    maxSteps: 14,
    description: {
      en: 'Traverse the diagonal superconducting barrier to the exit port.',
      ta: 'மூலைவிட்ட தடையைத் தாண்டி இலக்கு முனையத்தை அடையவும்.',
    },
  },
  {
    id: 'mag-10',
    name: 'Level 10: Master Electromagnetic Maze',
    gridSize: { rows: 5, cols: 5 },
    start: { row: 2, col: 0, initialPole: 'N' },
    target: { row: 2, col: 4, targetPole: 'S' },
    walls: [
      { row: 0, col: 2 },
      { row: 1, col: 2 },
      { row: 3, col: 2 },
      { row: 4, col: 2 },
    ],
    emitters: [
      { row: 0, col: 0, pole: 'S', strength: 1 },
      { row: 4, col: 0, pole: 'S', strength: 1 },
      { row: 0, col: 4, pole: 'N', strength: 1 },
      { row: 4, col: 4, pole: 'N', strength: 1 },
    ],
    maxSteps: 16,
    description: {
      en: 'Pass through the single central aperture to master the magnetic maze.',
      ta: 'மைய திறப்பு வழியாக சென்று முதன்மை காந்த புதிரை வெல்லவும்.',
    },
  },
];
