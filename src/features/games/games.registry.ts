/**
 * Games Suite Registry - Vigyaan Games Universe
 * Metadata, routing, categories, collections, badges, and recommendations for all 20 games.
 */

import { GameDefinition, GameId, GameCollection, GameBadge, GameRecommendation } from './games.types';

export const TOTAL_LEVELS_PER_GAME = 15;

export const GAMES_REGISTRY: GameDefinition[] = [
  // 1. Zip
  {
    id: 'zip',
    title: { en: 'Zip', ta: 'ஜிப்' },
    subtitle: { en: 'Complete the path', ta: 'பாதையை நிறைவுசெய்' },
    description: {
      en: 'Connect numbered checkpoints sequentially to fill the entire grid in one continuous path.',
      ta: 'எண் வரிசைப்படி சோதனைச் சாவடிகளை இணைத்து தொடர்ச்சியான பாதையை உருவாக்கவும்.',
    },
    category: 'logic',
    tags: ['path', 'grid', 'sequence'],
    icon: '⚡',
    badgeNumber: 534,
    route: '/games/zip',
    bgGlow: '#EFF6FF',
    accentColor: '#2563EB',
    totalLevels: 15,
    supportedModes: ['classic', 'daily', 'zen'],
    supportsHints: true,
  },
  // 2. Wend
  {
    id: 'wend',
    title: { en: 'Wend', ta: 'வெண்ட்' },
    subtitle: { en: 'Weave through words', ta: 'சொற்களைப் பின்னுங்கள்' },
    description: {
      en: 'Connect adjacent letters on the grid to discover and spell essential science vocabulary.',
      ta: 'கட்டத்தில் உள்ள அருகிலுள்ள எழுத்துக்களை இணைத்து அறிவியல் சொற்களைக் கண்டறியவும்.',
    },
    category: 'words',
    tags: ['vocabulary', 'letters', 'science'],
    icon: '🔤',
    badgeNumber: 86,
    route: '/games/wend',
    bgGlow: '#FAF5FF',
    accentColor: '#7E22CE',
    totalLevels: 15,
    supportedModes: ['classic', 'daily', 'timed'],
    supportsHints: true,
  },
  // 3. Patches
  {
    id: 'patches',
    title: { en: 'Patches', ta: 'பேட்சஸ்' },
    subtitle: { en: 'Piece it together', ta: 'துண்டுகளை இணையுங்கள்' },
    description: {
      en: 'Fit geometric tile pieces into the target board without overlapping.',
      ta: 'வடிவத் துண்டுகளை பலகையில் சரியாகப் பொருத்தி இலக்கு வடிவத்தை உருவாக்கவும்.',
    },
    category: 'grid',
    tags: ['polyomino', 'geometry', 'spatial'],
    icon: '🧩',
    badgeNumber: 169,
    route: '/games/patches',
    bgGlow: '#F0FDF4',
    accentColor: '#16A34A',
    totalLevels: 15,
    supportedModes: ['classic', 'zen'],
    supportsHints: true,
  },
  // 4. Mini Sudoku
  {
    id: 'mini-sudoku',
    title: { en: 'Mini Sudoku', ta: 'மினி சுடோகு' },
    subtitle: { en: 'The classic game, made mini', ta: 'கிளாசிக் சுடோகு, மினியாக' },
    description: {
      en: 'Place digits 1 to 4 so every row, column, and 2x2 box has unique numbers.',
      ta: 'ஒவ்வொரு வரிசை, நெடுவரிசை மற்றும் 2x2 பெட்டியில் 1–4 எண்களை நிரப்பவும்.',
    },
    category: 'numbers',
    tags: ['numbers', 'sudoku', 'deduction'],
    icon: '🔢',
    badgeNumber: 387,
    route: '/games/mini-sudoku',
    bgGlow: '#EFF6FF',
    accentColor: '#2563EB',
    totalLevels: 15,
    supportedModes: ['classic', 'daily', 'challenge'],
    supportsHints: true,
  },
  // 5. Tango
  {
    id: 'tango',
    title: { en: 'Tango', ta: 'டாங்கோ' },
    subtitle: { en: 'Harmonize the grid', ta: 'கட்டத்தை சமன்செய்' },
    description: {
      en: 'Balance Suns and Moons with no 3-in-a-row and satisfy all equal/opposite clues.',
      ta: 'சூரியன் மற்றும் சந்திரன் சின்னங்களை சமன் செய்து குறிப்புகளைப் பூர்த்தி செய்யவும்.',
    },
    category: 'logic',
    tags: ['balance', 'sun-moon', 'constraint'],
    icon: '☯️',
    badgeNumber: 204,
    route: '/games/tango',
    bgGlow: '#FFFBEB',
    accentColor: '#D97706',
    totalLevels: 15,
    supportedModes: ['classic', 'zen', 'daily'],
    supportsHints: true,
  },
  // 6. Queens
  {
    id: 'queens',
    title: { en: 'Queens', ta: 'குயின்ஸ்' },
    subtitle: { en: 'Crown each region', ta: 'பகுதிகளை மகுடம் சூட்டு' },
    description: {
      en: 'Place exactly one Queen in each row, column, and colored region without touching.',
      ta: 'ஒவ்வொரு வரிசை, நெடுவரிசை மற்றும் வண்ணப் பகுதியில் சரியாக ஒரு ராணியை வைக்கவும்.',
    },
    category: 'logic',
    tags: ['queens', 'regions', 'chess-logic'],
    icon: '👑',
    badgeNumber: 412,
    route: '/games/queens',
    bgGlow: '#FDF2F8',
    accentColor: '#DB2777',
    totalLevels: 15,
    supportedModes: ['classic', 'daily', 'challenge'],
    supportsHints: true,
  },
  // 7. Element Match
  {
    id: 'element-match',
    title: { en: 'Element Match', ta: 'தனிமங்கள் பொருத்துதல்' },
    subtitle: { en: 'Match the elements', ta: 'தனிமங்களை இணையுங்கள்' },
    description: {
      en: 'Match chemical element symbols with names, atomic numbers, and periodic families.',
      ta: 'வேதியியல் குறியீடுகள், பெயர்கள் மற்றும் அணு எண்களை இணைக்கவும்.',
    },
    category: 'chemistry',
    tags: ['chemistry', 'periodic-table', 'elements'],
    icon: '🧪',
    badgeNumber: 120,
    route: '/games/element-match',
    bgGlow: '#FDF4FF',
    accentColor: '#A855F7',
    totalLevels: 10,
    supportedModes: ['classic', 'timed', 'daily'],
    supportsHints: true,
  },
  // 8. Molecule Builder
  {
    id: 'molecule-builder',
    title: { en: 'Molecule Builder', ta: 'மூலக்கூறு உருவாக்குநர்' },
    subtitle: { en: 'Build the molecule', ta: 'மூலக்கூறை உருவாக்குங்கள்' },
    description: {
      en: 'Select and assemble atoms with valid valence bonds to form target compounds.',
      ta: 'அணுக்களை இணைத்து சரியான வேதி மூலக்கூறுகளை உருவாக்கவும்.',
    },
    category: 'chemistry',
    tags: ['chemistry', 'molecules', 'bonds'],
    icon: '🔬',
    badgeNumber: 94,
    route: '/games/molecule-builder',
    bgGlow: '#EFF6FF',
    accentColor: '#0284C7',
    totalLevels: 10,
    supportedModes: ['classic', 'zen', 'daily'],
    supportsHints: true,
  },
  // 9. Circuit Lab
  {
    id: 'circuit-lab',
    title: { en: 'Circuit Lab', ta: 'மின்சுற்று ஆய்வகம்' },
    subtitle: { en: 'Build the circuit', ta: 'மின்சுற்றை உருவாக்குங்கள்' },
    description: {
      en: 'Connect wires, switches, batteries, and bulbs to create working closed circuits.',
      ta: 'மின்சுற்று உதிரிபாகங்களை இணைத்து மின்விளக்கை எரிய வைக்கவும்.',
    },
    category: 'physics',
    tags: ['physics', 'electricity', 'circuits'],
    icon: '💡',
    badgeNumber: 156,
    route: '/games/circuit-lab',
    bgGlow: '#FFFBEB',
    accentColor: '#F59E0B',
    totalLevels: 10,
    supportedModes: ['classic', 'daily', 'challenge'],
    supportsHints: true,
  },
  // 10. Memory Matrix
  {
    id: 'memory-matrix',
    title: { en: 'Memory Matrix', ta: 'நினைவு மேட்ரிக்ஸ்' },
    subtitle: { en: 'Remember science', ta: 'அறிவியலை நினைவில் கொள்' },
    description: {
      en: 'Flip and match pairs of scientists, discoveries, human organs, and physics units.',
      ta: 'விஞ்ஞானிகள், கண்டுபிடிப்புகள் மற்றும் அறிவியல் இணைகளை கண்டறியவும்.',
    },
    category: 'memory',
    tags: ['memory', 'card-flip', 'facts'],
    icon: '🧠',
    badgeNumber: 218,
    route: '/games/memory-matrix',
    bgGlow: '#ECFDF5',
    accentColor: '#059669',
    totalLevels: 10,
    supportedModes: ['classic', 'timed', 'daily'],
    supportsHints: false,
  },
  // 11. Orbit
  {
    id: 'orbit',
    title: { en: 'Orbit', ta: 'சுற்றுப்பாதை' },
    subtitle: { en: 'Guide the mission', ta: 'விண்கலத்தை வழிகாட்டுக' },
    description: {
      en: 'Chart spacecraft trajectories around asteroids, black holes, and space debris to target orbit.',
      ta: 'விண்கலத்தின் பாதையை எரிகற்கள் மற்றும் தடைகளை தவிர்த்து இயக்கவும்.',
    },
    category: 'spatial',
    tags: ['space', 'trajectory', 'physics'],
    icon: '🪐',
    badgeNumber: 145,
    route: '/games/orbit',
    bgGlow: '#EEF2FF',
    accentColor: '#4F46E5',
    totalLevels: 10,
    supportedModes: ['classic', 'daily', 'challenge'],
    supportsHints: true,
  },
  // 12. Reaction Sort
  {
    id: 'reaction-sort',
    title: { en: 'Reaction Sort', ta: 'வினை வரிசையாக்கம்' },
    subtitle: { en: 'Sort the science', ta: 'அறிவியலை பிரித்தறிக' },
    description: {
      en: 'Sort substances into Acids/Bases, Metals/Non-metals, and Physical/Chemical changes.',
      ta: 'பொருட்களை அமிலங்கள், காரங்கள், மாற்றங்களின் அடிப்படையில் வகைப்படுத்தவும்.',
    },
    category: 'chemistry',
    tags: ['chemistry', 'sorting', 'categories'],
    icon: '⚖️',
    badgeNumber: 180,
    route: '/games/reaction-sort',
    bgGlow: '#FEF2F2',
    accentColor: '#DC2626',
    totalLevels: 10,
    supportedModes: ['classic', 'timed', 'daily'],
    supportsHints: true,
  },
  // 13. Science Word Grid
  {
    id: 'science-word-grid',
    title: { en: 'Science Word Grid', ta: 'அறிவியல் சொல் கட்டம்' },
    subtitle: { en: 'Find the science words', ta: 'அறிவியல் சொற்களைக் கண்டறி' },
    description: {
      en: 'Locate essential science vocabulary terms hidden inside English and Tamil grids.',
      ta: 'கட்டத்தில் மறைந்துள்ள அறிவியல் கலைச்சொற்களைக் கண்டறியவும்.',
    },
    category: 'words',
    tags: ['words', 'search', 'bilingual'],
    icon: '🔍',
    badgeNumber: 260,
    route: '/games/science-word-grid',
    bgGlow: '#F0FDF4',
    accentColor: '#16A34A',
    totalLevels: 10,
    supportedModes: ['classic', 'daily', 'timed'],
    supportsHints: true,
  },
  // 14. Pattern Lab
  {
    id: 'pattern-lab',
    title: { en: 'Pattern Lab', ta: 'வடிவமைப்பு ஆய்வகம்' },
    subtitle: { en: 'Solve the pattern', ta: 'வரிசை முறையை கண்டறி' },
    description: {
      en: 'Identify the next element in scientific sequences, orbital laws, and mathematical trends.',
      ta: 'அறிவியல் வரிசைகள் மற்றும் கணித விதிகளின் அடுத்த உறுப்பைக் கண்டறியவும்.',
    },
    category: 'patterns',
    tags: ['patterns', 'sequences', 'math'],
    icon: '📈',
    badgeNumber: 175,
    route: '/games/pattern-lab',
    bgGlow: '#FAF5FF',
    accentColor: '#9333EA',
    totalLevels: 10,
    supportedModes: ['classic', 'daily', 'challenge'],
    supportsHints: true,
  },
  // 15. Logic Lock
  {
    id: 'logic-lock',
    title: { en: 'Logic Lock', ta: 'தருக்கப் பூட்டு' },
    subtitle: { en: 'Crack the science lock', ta: 'அறிவியல் பூட்டை திற' },
    description: {
      en: 'Deduce multi-dial vault code combinations using precise scientific and logical clues.',
      ta: 'தர்க்கக் குறிப்புகளைக் கொண்டு ஆய்வக பாதுகாப்பு பூட்டின் கடவுச்சொல்லைக் கண்டறியவும்.',
    },
    category: 'logic',
    tags: ['logic', 'deduction', 'numbers'],
    icon: '🔐',
    badgeNumber: 310,
    route: '/games/logic-lock',
    bgGlow: '#FFF7ED',
    accentColor: '#EA580C',
    totalLevels: 10,
    supportedModes: ['classic', 'daily', 'challenge'],
    supportsHints: true,
  },
  // 16. Gravity Path
  {
    id: 'gravity-path',
    title: { en: 'Gravity Path', ta: 'ஈர்ப்புப் பாதை' },
    subtitle: { en: 'Control the path', ta: 'பாதையைக் கட்டுப்படுத்து' },
    description: {
      en: 'Shift gravity direction to roll experimental particles across obstacles and portals.',
      ta: 'ஈர்ப்பு விசையின் திசையை மாற்றி துகளை போர்டல்கள் வழியே செலுத்துங்கள்.',
    },
    category: 'physics',
    tags: ['physics', 'gravity', 'sliding'],
    icon: '🌌',
    badgeNumber: 195,
    route: '/games/gravity-path',
    bgGlow: '#F0FDF4',
    accentColor: '#0D9488',
    totalLevels: 10,
    supportedModes: ['classic', 'zen', 'daily'],
    supportsHints: true,
  },
  // 17. Lab Escape
  {
    id: 'lab-escape',
    title: { en: 'Lab Escape', ta: 'ஆய்வக தப்பித்தல்' },
    subtitle: { en: 'Escape through science', ta: 'அறிவியல் வழியே தப்பியிரு' },
    description: {
      en: 'Solve multi-stage science sequences: neutralize reagents, flip circuits, and crack airlocks.',
      ta: 'பல கட்ட அறிவியல் புதிர்களை விடுவித்து ஆய்வக கதவை திறந்து வெளியேறுங்கள்.',
    },
    category: 'science',
    tags: ['escape-room', 'multi-stage', 'science'],
    icon: '🚪',
    badgeNumber: 240,
    route: '/games/lab-escape',
    bgGlow: '#FEF2F2',
    accentColor: '#E11D48',
    totalLevels: 10,
    supportedModes: ['classic', 'daily', 'challenge'],
    supportsHints: true,
  },
  // 18. Time Machine
  {
    id: 'time-machine',
    title: { en: 'Time Machine', ta: 'கால இயந்திரம்' },
    subtitle: { en: 'Order scientific history', ta: 'அறிவியல் வரலாற்றை வரிசைப்படுத்து' },
    description: {
      en: 'Place landmark discoveries, inventions, and space missions in chronological order.',
      ta: 'வரலாற்று சிறப்புமிக்க அறிவியல் நிகழ்வுகளை சரியான காலவரிசையில் அடுக்கவும்.',
    },
    category: 'memory',
    tags: ['history', 'timeline', 'inventions'],
    icon: '⏳',
    badgeNumber: 130,
    route: '/games/time-machine',
    bgGlow: '#FDF4FF',
    accentColor: '#C026D3',
    totalLevels: 10,
    supportedModes: ['classic', 'daily', 'zen'],
    supportsHints: true,
  },
  // 19. DNA Sequence
  {
    id: 'dna-sequence',
    title: { en: 'DNA Sequence', ta: 'டி.என்.ஏ வரிசை' },
    subtitle: { en: 'Match the sequence', ta: 'மரபணுவை இணையுங்கள்' },
    description: {
      en: 'Match base pairs (A-T, C-G) and transcribe mRNA to synthesize essential proteins.',
      ta: 'கார இணைகளை (A-T, C-G) இணைத்து புரத உற்பத்திக்கான mRNA வரிசையை உருவாக்குக.',
    },
    category: 'biology',
    tags: ['biology', 'dna', 'genetics'],
    icon: '🧬',
    badgeNumber: 280,
    route: '/games/dna-sequence',
    bgGlow: '#EFF6FF',
    accentColor: '#2563EB',
    totalLevels: 10,
    supportedModes: ['classic', 'daily', 'practice'],
    supportsHints: true,
  },
  // 21. Fun Facts
  {
    id: 'fun-facts',
    title: { en: 'Fun Facts', ta: 'சுவாரஸ்ய தகவல்கள்' },
    subtitle: { en: 'Discover amazing science', ta: 'ஆச்சரியமான அறிவியலை கண்டறியுங்கள்' },
    description: {
      en: 'Explore quick science facts, test yourself with quizzes, and discover amazing knowledge.',
      ta: 'விரைவான அறிவியல் உண்மைகளை ஆராயுங்கள், வினாடி வினாக்களுடன் உங்களை சோதித்துக்கொள்ளுங்கள்.',
    },
    category: 'science',
    tags: ['science', 'facts', 'discovery', 'quiz'],
    icon: '🔬',
    badgeNumber: 0,
    route: '/fun-facts',
    bgGlow: '#EFF6FF',
    accentColor: '#2563EB',
    totalLevels: 1,
    supportedModes: ['daily', 'classic'],
    supportsHints: false,
  },
  // 20. Magnet Maze
  {
    id: 'magnet-maze',
    title: { en: 'Magnet Maze', ta: 'காந்த புதிர்' },
    subtitle: { en: 'Master attraction and repulsion', ta: 'ஈர்ப்பு மற்றும் விலக்கு' },
    description: {
      en: 'Navigate magnetic particles using North/South pole attraction and repulsion fields.',
      ta: 'வட, தென் துருவங்களின் ஈர்ப்பு மற்றும் விலக்கு விசைகளால் துகளை வழிநடத்துங்கள்.',
    },
    category: 'physics',
    tags: ['physics', 'magnetism', 'maze'],
    icon: '🧲',
    badgeNumber: 225,
    route: '/games/magnet-maze',
    bgGlow: '#FFFBEB',
    accentColor: '#D97706',
    totalLevels: 10,
    supportedModes: ['classic', 'daily', 'challenge'],
    supportsHints: true,
  },
];

export function getGameById(id: GameId | string): GameDefinition | undefined {
  return GAMES_REGISTRY.find((game) => game.id === id);
}

// =========================================================================
// Collections Registry
// =========================================================================

export const GAME_COLLECTIONS: GameCollection[] = [
  {
    id: 'col-logic-masters',
    title: { en: 'Logic Masters', ta: 'தருக்க மேதைகள்' },
    description: {
      en: 'Sharpen deduction, grid reasoning, and spatial constraints.',
      ta: 'தருக்க சிந்தனை மற்றும் கட்ட விதிகளை கூர்மையாக்குங்கள்.',
    },
    icon: '👑',
    accentColor: '#DB2777',
    gameIds: ['zip', 'queens', 'tango', 'logic-lock', 'lab-escape'],
  },
  {
    id: 'col-science-thinkers',
    title: { en: 'Science Thinkers', ta: 'அறிவியல் சிந்தனையாளர்கள்' },
    description: {
      en: 'Explore chemical reactions, molecules, circuits, and genetic blueprints.',
      ta: 'வேதியியல், மூலக்கூறுகள், மின்சுற்றுகள் மற்றும் மரபியலை ஆராயுங்கள்.',
    },
    icon: '🧪',
    accentColor: '#0284C7',
    gameIds: ['element-match', 'molecule-builder', 'circuit-lab', 'dna-sequence', 'reaction-sort'],
  },
  {
    id: 'col-word-explorers',
    title: { en: 'Word Explorers', ta: 'சொல் ஆராய்ச்சியாளர்கள்' },
    description: {
      en: 'Master scientific vocabulary in bilingual Tamil & English word grids.',
      ta: 'தமிழ் மற்றும் ஆங்கில கட்டங்களில் அறிவியல் கலைச்சொற்களை வெல்லுங்கள்.',
    },
    icon: '🔤',
    accentColor: '#7E22CE',
    gameIds: ['wend', 'science-word-grid'],
  },
  {
    id: 'col-space-puzzles',
    title: { en: 'Space Puzzles', ta: 'விண்வெளி சாகசங்கள்' },
    description: {
      en: 'Plan interplanetary orbits, navigate zero-g gravity, and explore cosmos history.',
      ta: 'சுற்றுப்பாதைகள், ஈர்ப்பு விசை மற்றும் விண்வெளி வரலாற்றை ஆராயுங்கள்.',
    },
    icon: '🪐',
    accentColor: '#4F46E5',
    gameIds: ['orbit', 'gravity-path', 'time-machine', 'magnet-maze'],
  },
  {
    id: 'col-number-ninjas',
    title: { en: 'Number Ninjas', ta: 'எண் வீரர்கள்' },
    description: {
      en: 'Mini Sudoku, arithmetic patterns, and multi-dial safe code cracking.',
      ta: 'மினி சுடோகு, கணித வடிவங்கள் மற்றும் பூட்டு குறியீடுகளை வெல்லுங்கள்.',
    },
    icon: '🔢',
    accentColor: '#2563EB',
    gameIds: ['mini-sudoku', 'pattern-lab', 'logic-lock'],
  },
];

// =========================================================================
// Badges Registry
// =========================================================================

export const GAME_BADGES: GameBadge[] = [
  {
    id: 'badge-first-win',
    title: { en: 'First Victory', ta: 'முதல் வெற்றி' },
    description: { en: 'Completed your very first game level!', ta: 'உங்கள் முதல் விளையாட்டு நிலையை முடித்தீர்கள்!' },
    icon: '🌱',
    category: 'completion',
    requirement: { type: 'levelsCompleted', value: 1 },
    requirementDescription: 'Complete 1 level in any game',
  },
  {
    id: 'badge-puzzle-solver',
    title: { en: 'Puzzle Solver', ta: 'புதிர் தீர்ப்பாளர்' },
    description: { en: 'Completed 10 puzzle levels across the universe.', ta: '10 விளையாட்டு நிலைகளை வெற்றிகரமாக முடித்தீர்கள்.' },
    icon: '🧩',
    category: 'completion',
    requirement: { type: 'levelsCompleted', value: 10 },
    requirementDescription: 'Complete 10 total levels',
  },
  {
    id: 'badge-speed-thinker',
    title: { en: 'Speed Thinker', ta: 'மின்னல் சிந்தனையாளர்' },
    description: { en: 'Completed a puzzle in under 20 seconds!', ta: '20 வினாடிகளுக்குள் ஒரு புதிரை முடித்தீர்கள்!' },
    icon: '⚡',
    category: 'special',
    requirement: { type: 'speedTime', seconds: 20 },
    requirementDescription: 'Solve any level in < 20s',
  },
  {
    id: 'badge-perfect-player',
    title: { en: 'Perfect Player', ta: 'துல்லிய மேதை' },
    description: { en: 'Achieved a 3-star rating with zero mistakes.', ta: 'பூஜ்ஜிய தவறுகளுடன் 3-நட்சத்திர வெற்றியைப் பெற்றீர்கள்.' },
    icon: '⭐',
    category: 'mastery',
    requirement: { type: 'perfectLevel' },
    requirementDescription: 'Achieve 3 stars on any puzzle',
  },
  {
    id: 'badge-7-day-streak',
    title: { en: '7 Day Streak', ta: '7 நாள் தொடர்ச்சி' },
    description: { en: 'Maintained a 7-day daily game streak!', ta: 'தொடர்ந்து 7 நாட்கள் விளையாட்டுகளை விளையாடினீர்கள்!' },
    icon: '🔥',
    category: 'streak',
    requirement: { type: 'streak', value: 7 },
    requirementDescription: 'Reach 7-day games streak',
  },
  {
    id: 'badge-game-explorer',
    title: { en: 'Game Explorer', ta: 'விளையாட்டு ஆய்வாளர்' },
    description: { en: 'Played at least 5 different games in the universe.', ta: '5 வெவ்வேறு விளையாட்டுகளை விளையாடினீர்கள்.' },
    icon: '🗺️',
    category: 'special',
    requirement: { type: 'gamesPlayed', value: 5 },
    requirementDescription: 'Play 5 different games',
  },
  {
    id: 'badge-logic-master',
    title: { en: 'Logic Master', ta: 'தருக்க தலைவர்' },
    description: { en: 'Achieved high mastery across logic puzzles.', ta: 'தருக்க விளையாட்டுகளில் சிறந்த தேர்ச்சி பெற்றீர்கள்.' },
    icon: '👑',
    category: 'mastery',
    requirement: { type: 'mastery', category: 'logic', value: 50 },
    requirementDescription: 'Score >50% mastery in Logic category',
  },
  {
    id: 'badge-science-strategist',
    title: { en: 'Science Strategist', ta: 'அறிவியல் வியூகவாதி' },
    description: { en: 'Solved advanced chemical, physical and biological challenges.', ta: 'அறிவியல் சவால்களில் வெற்றி பெற்றீர்கள்.' },
    icon: '🔬',
    category: 'mastery',
    requirement: { type: 'mastery', category: 'science', value: 50 },
    requirementDescription: 'Score >50% mastery in Science games',
  },
  {
    id: 'badge-universe-master',
    title: { en: 'Universe Master', ta: 'பிரபஞ்ச தலைவர்' },
    description: { en: 'Completed 25 levels across the Vigyaan Universe.', ta: '25 விளையாட்டு நிலைகளை முடித்தீர்கள்.' },
    icon: '🌌',
    category: 'completion',
    requirement: { type: 'levelsCompleted', value: 25 },
    requirementDescription: 'Complete 25 total levels',
  },
  {
    id: 'badge-daily-champion',
    title: { en: 'Daily Champion', ta: 'தினசரி வெற்றியாளர்' },
    description: { en: 'Kept the fire burning with a 3-day streak!', ta: 'தொடர்ந்து 3 நாட்கள் தினசரி சவால்களை வென்றீர்கள்!' },
    icon: '🏆',
    category: 'streak',
    requirement: { type: 'streak', value: 3 },
    requirementDescription: 'Reach 3-day games streak',
  },
  {
    id: 'badge-chemistry-expert',
    title: { en: 'Chemistry Expert', ta: 'வேதியியல் நிபுணர்' },
    description: { en: 'Mastered element matching and molecule building.', ta: 'வேதியியல் புதிர்களில் சிறந்த தேர்ச்சி பெற்றீர்கள்.' },
    icon: '⚗️',
    category: 'mastery',
    requirement: { type: 'mastery', category: 'chemistry', value: 50 },
    requirementDescription: 'Score >50% mastery in Chemistry games',
  },
  {
    id: 'badge-physics-pioneer',
    title: { en: 'Physics Pioneer', ta: 'இயற்பியல் முன்னோடி' },
    description: { en: 'Mastered circuits, gravity, and magnetic fields.', ta: 'இயற்பியல் புதிர்களில் சிறந்த தேர்ச்சி பெற்றீர்கள்.' },
    icon: '🧲',
    category: 'mastery',
    requirement: { type: 'mastery', category: 'physics', value: 50 },
    requirementDescription: 'Score >50% mastery in Physics games',
  },
];

// =========================================================================
// Deterministic Recommendations
// =========================================================================

export function getRecommendedGames(
  lastPlayedGameId?: GameId,
  playedGameIds: GameId[] = []
): GameRecommendation[] {
  const recommendations: GameRecommendation[] = [];

  if (lastPlayedGameId === 'mini-sudoku' || lastPlayedGameId === 'zip') {
    recommendations.push({
      gameId: 'tango',
      reason: {
        en: 'Since you enjoy grid logic, try balancing Suns and Moons in Tango!',
        ta: 'நீங்கள் கட்ட தர்க்கத்தை விரும்புவதால், டாங்கோ விளையாட்டை முயற்சிக்கவும்!',
      },
    });
    recommendations.push({
      gameId: 'logic-lock',
      reason: {
        en: 'Test your deduction skills with the multi-dial Logic Lock!',
        ta: 'தருக்கப் பூட்டின் கடவுச்சொல்லைக் கண்டறியுங்கள்!',
      },
    });
  } else if (lastPlayedGameId === 'wend') {
    recommendations.push({
      gameId: 'science-word-grid',
      reason: {
        en: 'Since you like word games, explore hidden terms in Science Word Grid!',
        ta: 'சொல் விளையாட்டுகளை விரும்புவதால், அறிவியல் சொல் கட்டத்தை முயற்சிக்கவும்!',
      },
    });
  } else if (lastPlayedGameId === 'element-match' || lastPlayedGameId === 'molecule-builder') {
    recommendations.push({
      gameId: 'reaction-sort',
      reason: {
        en: 'Continue your chemistry journey by sorting Acids, Bases and Reactions!',
        ta: 'அமிலங்கள் மற்றும் காரங்களை வகைப்படுத்தி வேதியியலில் சிறந்து விளங்குங்கள்!',
      },
    });
  } else {
    // Default recommendations
    recommendations.push({
      gameId: 'circuit-lab',
      reason: {
        en: 'Popular today: Build closed electrical circuits and light the bulb!',
        ta: 'இன்றைய சிறப்பு: மின்சுற்றுகளை இணைத்து மின்விளக்கை எரிய வையுங்கள்!',
      },
    });
    recommendations.push({
      gameId: 'element-match',
      reason: {
        en: 'Match essential chemical elements with their atomic symbols!',
        ta: 'வேதியியல் தனிமங்களை அவற்றின் குறியீடுகளுடன் இணையுங்கள்!',
      },
    });
    recommendations.push({
      gameId: 'gravity-path',
      reason: {
        en: 'Experience zero-g directional physics in Gravity Path!',
        ta: 'ஈர்ப்பு விசையின் திசையை மாற்றி துகளை செலுத்துங்கள்!',
      },
    });
  }

  return recommendations;
}
