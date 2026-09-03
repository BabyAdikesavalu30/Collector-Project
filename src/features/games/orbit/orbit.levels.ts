import { OrbitLevel } from './orbit.types';

export const ORBIT_LEVELS: OrbitLevel[] = [
  {
    id: 'orbit-01',
    name: 'Level 1: Moon Landing',
    gridSize: { rows: 4, cols: 4 },
    start: { row: 0, col: 0 },
    target: { row: 3, col: 3 },
    waypoints: [{ order: 1, row: 1, col: 2 }],
    obstacles: [{ row: 1, col: 1, type: 'asteroid' }],
    maxFuelMoves: 10,
    description: {
      en: 'Guide the lunar lander past the asteroid field.',
      ta: 'எரிகல் மண்டலத்தைத் தாண்டி சந்திரனில் தரையிறங்கவும்.',
    },
  },
  {
    id: 'orbit-02',
    name: 'Level 2: Mars Relay',
    gridSize: { rows: 4, cols: 4 },
    start: { row: 0, col: 0 },
    target: { row: 3, col: 0 },
    waypoints: [
      { order: 1, row: 0, col: 3 },
      { order: 2, row: 3, col: 3 },
    ],
    obstacles: [
      { row: 1, col: 1, type: 'asteroid' },
      { row: 2, col: 1, type: 'asteroid' },
    ],
    maxFuelMoves: 12,
    description: {
      en: 'Relay telemetry through both orbital satellites.',
      ta: 'இரண்டு செயற்கைக்கோள்கள் வழியாக சமிக்ஞை அனுப்பவும்.',
    },
  },
  {
    id: 'orbit-03',
    name: 'Level 3: Asteroid Belt',
    gridSize: { rows: 5, cols: 5 },
    start: { row: 0, col: 0 },
    target: { row: 4, col: 4 },
    waypoints: [
      { order: 1, row: 0, col: 4 },
      { order: 2, row: 4, col: 0 },
    ],
    obstacles: [
      { row: 2, col: 2, type: 'black-hole' },
      { row: 1, col: 2, type: 'asteroid' },
      { row: 3, col: 2, type: 'asteroid' },
    ],
    maxFuelMoves: 16,
    description: {
      en: 'Slingshot around the gravitational singularity.',
      ta: 'கருந்துளையின் ஈர்ப்பு விசையைச் சுற்றி பயணிக்கவும்.',
    },
  },
  {
    id: 'orbit-04',
    name: 'Level 4: Jupiter Slingshot',
    gridSize: { rows: 5, cols: 5 },
    start: { row: 2, col: 0 },
    target: { row: 2, col: 4 },
    waypoints: [
      { order: 1, row: 0, col: 2 },
      { order: 2, row: 4, col: 2 },
    ],
    obstacles: [
      { row: 2, col: 1, type: 'asteroid' },
      { row: 2, col: 2, type: 'space-debris' },
      { row: 2, col: 3, type: 'asteroid' },
    ],
    maxFuelMoves: 16,
    description: {
      en: 'Weave through the radiation belt to reach orbit.',
      ta: 'கதிர்வீச்சு வளையத்தை கடந்து இலக்கை அடையவும்.',
    },
  },
  {
    id: 'orbit-05',
    name: 'Level 5: Saturn Rings',
    gridSize: { rows: 5, cols: 5 },
    start: { row: 0, col: 2 },
    target: { row: 4, col: 2 },
    waypoints: [
      { order: 1, row: 2, col: 0 },
      { order: 2, row: 2, col: 4 },
    ],
    obstacles: [
      { row: 1, col: 2, type: 'asteroid' },
      { row: 3, col: 2, type: 'asteroid' },
      { row: 2, col: 2, type: 'black-hole' },
    ],
    maxFuelMoves: 16,
    description: {
      en: 'Navigate the ring gaps without collision.',
      ta: 'சனி கிரகத்தின் வளைய இடைவெளிகளில் பயணிக்கவும்.',
    },
  },
  {
    id: 'orbit-06',
    name: 'Level 6: Deep Space Comet',
    gridSize: { rows: 5, cols: 5 },
    start: { row: 0, col: 0 },
    target: { row: 0, col: 4 },
    waypoints: [
      { order: 1, row: 4, col: 0 },
      { order: 2, row: 4, col: 4 },
      { order: 3, row: 2, col: 2 },
    ],
    obstacles: [
      { row: 1, col: 1, type: 'space-debris' },
      { row: 1, col: 3, type: 'space-debris' },
      { row: 3, col: 1, type: 'space-debris' },
      { row: 3, col: 3, type: 'space-debris' },
    ],
    maxFuelMoves: 20,
    description: {
      en: 'Intercept comet trajectory across 3 deep space probes.',
      ta: 'வால்மீனின் பாதையை மூன்று சோதனை முனைகளில் கண்காணிக்கவும்.',
    },
  },
  {
    id: 'orbit-07',
    name: 'Level 7: Gravitational Corridor',
    gridSize: { rows: 5, cols: 5 },
    start: { row: 4, col: 0 },
    target: { row: 0, col: 4 },
    waypoints: [
      { order: 1, row: 0, col: 0 },
      { order: 2, row: 4, col: 4 },
    ],
    obstacles: [
      { row: 2, col: 1, type: 'black-hole' },
      { row: 2, col: 3, type: 'black-hole' },
    ],
    maxFuelMoves: 18,
    description: {
      en: 'Pass through the narrow safe channel between two black holes.',
      ta: 'இரண்டு கருந்துளைகளுக்கு இடையே உள்ள குறுகிய பாதையில் செல்லவும்.',
    },
  },
  {
    id: 'orbit-08',
    name: 'Level 8: Nebula Crossing',
    gridSize: { rows: 5, cols: 5 },
    start: { row: 0, col: 2 },
    target: { row: 4, col: 2 },
    waypoints: [
      { order: 1, row: 0, col: 0 },
      { order: 2, row: 4, col: 0 },
      { order: 3, row: 4, col: 4 },
      { order: 4, row: 0, col: 4 },
    ],
    obstacles: [
      { row: 2, col: 1, type: 'space-debris' },
      { row: 2, col: 2, type: 'space-debris' },
      { row: 2, col: 3, type: 'space-debris' },
    ],
    maxFuelMoves: 24,
    description: {
      en: 'Full diamond perimeter trajectory around dense nebula dust.',
      ta: 'நெபுலா தூசு மண்டலத்தைச் சுற்றி வைர வடிவ பாதையை அமைக்கவும்.',
    },
  },
  {
    id: 'orbit-09',
    name: 'Level 9: Solar Flare Defense',
    gridSize: { rows: 5, cols: 5 },
    start: { row: 4, col: 4 },
    target: { row: 0, col: 0 },
    waypoints: [
      { order: 1, row: 4, col: 1 },
      { order: 2, row: 1, col: 4 },
    ],
    obstacles: [
      { row: 2, col: 2, type: 'black-hole' },
      { row: 3, col: 2, type: 'asteroid' },
      { row: 1, col: 2, type: 'asteroid' },
    ],
    maxFuelMoves: 16,
    description: {
      en: 'Avoid solar flares and return to command module safely.',
      ta: 'சூரியப் புயல்களைத் தவிர்த்து கட்டுப்பாட்டு அறைக்குத் திரும்பவும்.',
    },
  },
  {
    id: 'orbit-10',
    name: 'Level 10: Interstellar Voyage',
    gridSize: { rows: 5, cols: 5 },
    start: { row: 0, col: 0 },
    target: { row: 4, col: 4 },
    waypoints: [
      { order: 1, row: 0, col: 4 },
      { order: 2, row: 2, col: 2 },
      { order: 3, row: 4, col: 0 },
    ],
    obstacles: [
      { row: 1, col: 2, type: 'asteroid' },
      { row: 3, col: 2, type: 'asteroid' },
      { row: 2, col: 1, type: 'space-debris' },
      { row: 2, col: 3, type: 'space-debris' },
    ],
    maxFuelMoves: 22,
    description: {
      en: 'Master navigation through the dense interstellar debris field.',
      ta: 'விண்வெளி குப்பைகள் நிறைந்த சிக்கலான பாதையில் வழிகாட்டவும்.',
    },
  },
];
