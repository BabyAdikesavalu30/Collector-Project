/**
 * Wend Game Deterministic Levels
 * 15 science vocabulary levels with English and Tamil letter grids.
 */

import { WendLevel } from './wend.types';

export const WEND_LEVELS: WendLevel[] = [
  {
    id: 'wend-01',
    name: 'Level 1',
    targetWord: { en: 'ATOM', ta: 'அணு' },
    hint: {
      en: 'The basic building block of all chemical elements.',
      ta: 'அனைத்து வேதியியல் கூறுகளின் அடிப்படை அலகு.',
    },
    grid: [
      ['A', 'T', 'X'],
      ['B', 'O', 'M'],
      ['P', 'K', 'R'],
    ],
    taGrid: [
      ['அ', 'ணு', 'க'],
      ['ம', 'ர', 'ம்'],
      ['ப', 'ட', 'ம்'],
    ],
  },
  {
    id: 'wend-02',
    name: 'Level 2',
    targetWord: { en: 'CELL', ta: 'செல்' },
    hint: {
      en: 'The smallest structural and functional unit of life.',
      ta: 'உயிரினங்களின் மிகச்சிறிய கட்டமைப்பு மற்றும் செயல்பாட்டு அலகு.',
    },
    grid: [
      ['C', 'E', 'Z'],
      ['Q', 'L', 'L'],
      ['W', 'R', 'T'],
    ],
    taGrid: [
      ['செ', 'ல்', 'வ'],
      ['ம', 'ர', 'ம்'],
      ['ப', 'ற', 'வை'],
    ],
  },
  {
    id: 'wend-03',
    name: 'Level 3',
    targetWord: { en: 'WAVE', ta: 'அலை' },
    hint: {
      en: 'An oscillation accompanied by a transfer of energy.',
      ta: 'ஆற்றலை ஒரு இடத்திலிருந்து மற்றொரு இடத்திற்கு கடத்தும் அதிர்வு.',
    },
    grid: [
      ['W', 'A', 'K'],
      ['P', 'V', 'E'],
      ['S', 'L', 'M'],
    ],
    taGrid: [
      ['அ', 'லை', 'ம'],
      ['க', 'ட', 'ல்'],
      ['நீ', 'ர்', 'க'],
    ],
  },
  {
    id: 'wend-04',
    name: 'Level 4',
    targetWord: { en: 'FORCE', ta: 'விசை' },
    hint: {
      en: 'A push or pull upon an object resulting from interaction.',
      ta: 'பொருளின் மீது செலுத்தப்படும் தள்ளுதல் அல்லது இழுத்தல் செயல்.',
    },
    grid: [
      ['F', 'O', 'R'],
      ['B', 'E', 'C'],
      ['X', 'T', 'Y'],
    ],
    taGrid: [
      ['வி', 'சை', 'க'],
      ['ஈ', 'ர்', 'ப்பு'],
      ['வே', 'க', 'ம்'],
    ],
  },
  {
    id: 'wend-05',
    name: 'Level 5',
    targetWord: { en: 'LIGHT', ta: 'ஒளி' },
    hint: {
      en: 'Electromagnetic radiation visible to the human eye.',
      ta: 'கண்களுக்குப் புலப்படும் மின்காந்தக் கதிர்வீச்சு.',
    },
    grid: [
      ['L', 'I', 'G'],
      ['P', 'T', 'H'],
      ['M', 'K', 'S'],
    ],
    taGrid: [
      ['ஒ', 'ளி', 'க'],
      ['சு', 'ட', 'ர்'],
      ['நி', 'ழ', 'ல்'],
    ],
  },
  {
    id: 'wend-06',
    name: 'Level 6',
    targetWord: { en: 'PLANT', ta: 'தாவரம்' },
    hint: {
      en: 'Living organism that produces oxygen via photosynthesis.',
      ta: 'ஒளிச்சேர்க்கை மூலம் உணவு மற்றும் ஆக்சிஜன் தயாரிக்கும் உயிரினம்.',
    },
    grid: [
      ['P', 'L', 'A'],
      ['Z', 'T', 'N'],
      ['W', 'R', 'K'],
    ],
    taGrid: [
      ['தா', 'வ', 'ர'],
      ['ம', 'ர', 'ம்'],
      ['இ', 'லை', 'பூ'],
    ],
  },
  {
    id: 'wend-07',
    name: 'Level 7',
    targetWord: { en: 'SOLAR', ta: 'சூரிய' },
    hint: {
      en: 'Relating to or determined by the Sun.',
      ta: 'சூரியன் தொடர்பான அல்லது சூரியனிலிருந்து பெறப்படும் ஆற்றல்.',
    },
    grid: [
      ['S', 'O', 'L'],
      ['B', 'R', 'A'],
      ['N', 'M', 'Q'],
    ],
    taGrid: [
      ['சூ', 'ரி', 'ய'],
      ['க', 'தி', 'ர்'],
      ['ஒ', 'ளி', 'ம'],
    ],
  },
  {
    id: 'wend-08',
    name: 'Level 8',
    targetWord: { en: 'SPACE', ta: 'விண்' },
    hint: {
      en: 'The boundless three-dimensional expanse beyond Earth.',
      ta: 'பூமியின் வளிமண்டலத்திற்கு அப்பால் உள்ள எல்லையற்ற வெளி.',
    },
    grid: [
      ['S', 'P', 'A'],
      ['K', 'E', 'C'],
      ['L', 'M', 'T'],
    ],
    taGrid: [
      ['வி', 'ண்', 'ண'],
      ['கோ', 'ள்', 'க'],
      ['வி', 'ண்', 'மீ'],
    ],
  },
  {
    id: 'wend-09',
    name: 'Level 9',
    targetWord: { en: 'OZONE', ta: 'ஓசோன்' },
    hint: {
      en: 'Trioxygen gas protecting Earth from ultraviolet rays.',
      ta: 'பூமியை புற ஊதாக் கதிர்களிலிருந்து பாதுகாக்கும் வாயு அடுக்கு.',
    },
    grid: [
      ['O', 'Z', 'O'],
      ['K', 'E', 'N'],
      ['X', 'W', 'P'],
    ],
    taGrid: [
      ['ஓ', 'சோ', 'ன்'],
      ['வா', 'யு', 'க'],
      ['பு', 'வி', 'ம'],
    ],
  },
  {
    id: 'wend-10',
    name: 'Level 10',
    targetWord: { en: 'ENERGY', ta: 'ஆற்றல்' },
    hint: {
      en: 'The quantitative property that must be transferred to do work.',
      ta: 'வேலை செய்வதற்குத் தேவையான அடிப்படை திறன் அல்லது சக்தி.',
    },
    grid: [
      ['E', 'N', 'E'],
      ['G', 'R', 'R'],
      ['Y', 'M', 'S'],
    ],
    taGrid: [
      ['ஆ', 'ற்', 'ற'],
      ['ல்', 'வி', 'சை'],
      ['வெ', 'ப்ப', 'ம்'],
    ],
  },
  {
    id: 'wend-11',
    name: 'Level 11',
    targetWord: { en: 'MAGNET', ta: 'காந்தம்' },
    hint: {
      en: 'An object that produces a magnetic field attracting metals.',
      ta: 'இரும்பு போன்ற உலோகங்களை ஈர்க்கும் காந்தப்புலத்தை உருவாக்கும் பொருள்.',
    },
    grid: [
      ['M', 'A', 'G'],
      ['T', 'E', 'N'],
      ['K', 'L', 'P'],
    ],
    taGrid: [
      ['கா', 'ந்', 'த'],
      ['ம்', 'ஈ', 'ர்'],
      ['பு', 'லம்', 'ம'],
    ],
  },
  {
    id: 'wend-12',
    name: 'Level 12',
    targetWord: { en: 'PRISM', ta: 'முப்பட்டகம்' },
    hint: {
      en: 'Transparent optical element with flat polished surfaces that refracts light.',
      ta: 'வெள்ளை ஒளியை வானவில் நிறங்களாகப் பிரிக்கும் முக்கோண கண்ணாடி பொருள்.',
    },
    grid: [
      ['P', 'R', 'I'],
      ['Z', 'M', 'S'],
      ['Q', 'W', 'K'],
    ],
    taGrid: [
      ['மு', 'ப்ப', 'ட்'],
      ['ட', 'க', 'ம்'],
      ['ஒ', 'ளி', 'க'],
    ],
  },
  {
    id: 'wend-13',
    name: 'Level 13',
    targetWord: { en: 'ACID', ta: 'அமிலம்' },
    hint: {
      en: 'A chemical substance with a pH less than 7 that tastes sour.',
      ta: 'pH மதிப்பு 7-க்கு குறைவாக உள்ள புளிப்புச் சுவை கொண்ட வேதிப்பொருள்.',
    },
    grid: [
      ['A', 'C', 'X'],
      ['B', 'I', 'D'],
      ['M', 'K', 'L'],
    ],
    taGrid: [
      ['அ', 'மி', 'ல'],
      ['ம்', 'நீ', 'ர்'],
      ['வே', 'தி', 'ய'],
    ],
  },
  {
    id: 'wend-14',
    name: 'Level 14',
    targetWord: { en: 'HEAT', ta: 'வெப்பம்' },
    hint: {
      en: 'Form of energy that transfers between bodies due to temperature difference.',
      ta: 'வெப்பநிலை வேறுபாடு காரணமாக ஒரு பொருளிலிருந்து மற்றொன்றுக்கு மாறும் ஆற்றல்.',
    },
    grid: [
      ['H', 'E', 'Z'],
      ['P', 'A', 'T'],
      ['K', 'L', 'M'],
    ],
    taGrid: [
      ['வெ', 'ப்ப', 'ம்'],
      ['சூ', 'டு', 'க'],
      ['அ', 'ன', 'ல்'],
    ],
  },
  {
    id: 'wend-15',
    name: 'Level 15',
    targetWord: { en: 'MOTION', ta: 'இயக்கம்' },
    hint: {
      en: 'The phenomenon in which an object changes its position over time.',
      ta: 'காலத்தைப் பொருத்து ஒரு பொருள் தனது நிலையை மாற்றும் நிகழ்வு.',
    },
    grid: [
      ['M', 'O', 'T'],
      ['Z', 'N', 'I'],
      ['P', 'O', 'K'],
    ],
    taGrid: [
      ['இ', 'ய', 'க்'],
      ['க', 'ம்', 'வே'],
      ['க', 'மு', 'ட'],
    ],
  },
];
