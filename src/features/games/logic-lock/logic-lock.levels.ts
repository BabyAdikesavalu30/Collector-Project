import { LogicLockLevel } from './logic-lock.types';

export const LOGIC_LOCK_LEVELS: LogicLockLevel[] = [
  {
    id: 'lock-01',
    name: 'Level 1: Laboratory Vault',
    codeLength: 3,
    digitsRange: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    solution: ['0', '4', '2'],
    description: {
      en: 'Crack the 3-digit laboratory vault code from the clue panel.',
      ta: 'குறிப்புகளைப் பயன்படுத்தி 3-இலக்க ஆய்வக பூட்டைத் திறக்கவும்.',
    },
    clues: [
      {
        guess: ['6', '8', '2'],
        hint: { en: 'One number is correct and well placed.', ta: 'ஒரு எண் சரி மற்றும் சரியான இடத்தில் உள்ளது.' },
        badge: { en: '1 Correct & Well Placed', ta: '1 சரி & சரியான இடம்' },
      },
      {
        guess: ['6', '1', '4'],
        hint: { en: 'One number is correct but wrongly placed.', ta: 'ஒரு எண் சரி ஆனால் தவறான இடத்தில் உள்ளது.' },
        badge: { en: '1 Correct & Wrong Place', ta: '1 சரி & தவறான இடம்' },
      },
      {
        guess: ['2', '0', '6'],
        hint: { en: 'Two numbers are correct but wrongly placed.', ta: 'இரண்டு எண்கள் சரி ஆனால் தவறான இடத்தில் உள்ளன.' },
        badge: { en: '2 Correct & Wrong Place', ta: '2 சரி & தவறான இடம்' },
      },
      {
        guess: ['7', '3', '8'],
        hint: { en: 'Nothing is correct.', ta: 'எந்த எண்ணும் சரியில்லை.' },
        badge: { en: 'All Wrong', ta: 'அனைத்தும் தவறு' },
      },
      {
        guess: ['7', '8', '0'],
        hint: { en: 'One number is correct but wrongly placed.', ta: 'ஒரு எண் சரி ஆனால் தவறான இடத்தில் உள்ளது.' },
        badge: { en: '1 Correct & Wrong Place', ta: '1 சரி & தவறான இடம்' },
      },
    ],
  },
  {
    id: 'lock-02',
    name: 'Level 2: Cryo Chamber',
    codeLength: 3,
    digitsRange: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    solution: ['3', '5', '8'],
    description: {
      en: 'Decode the cryo chamber temperature lock.',
      ta: 'குளிர்சாதன பெட்டகத்தின் 3-இலக்க கடவுச்சொல்லைக் கண்டறியவும்.',
    },
    clues: [
      {
        guess: ['1', '5', '9'],
        hint: { en: 'One number is correct and well placed.', ta: 'ஒரு எண் சரி மற்றும் சரியான இடத்தில் உள்ளது.' },
        badge: { en: '1 Correct & Well Placed', ta: '1 சரி & சரியான இடம்' },
      },
      {
        guess: ['8', '1', '3'],
        hint: { en: 'Two numbers are correct but wrongly placed.', ta: 'இரண்டு எண்கள் சரி ஆனால் தவறான இடத்தில் உள்ளன.' },
        badge: { en: '2 Correct & Wrong Place', ta: '2 சரி & தவறான இடம்' },
      },
      {
        guess: ['2', '4', '6'],
        hint: { en: 'Nothing is correct.', ta: 'எந்த எண்ணும் சரியில்லை.' },
        badge: { en: 'All Wrong', ta: 'அனைத்தும் தவறு' },
      },
      {
        guess: ['9', '7', '8'],
        hint: { en: 'One number is correct and well placed.', ta: 'ஒரு எண் சரி மற்றும் சரியான இடத்தில் உள்ளது.' },
        badge: { en: '1 Correct & Well Placed', ta: '1 சரி & சரியான இடம்' },
      },
    ],
  },
  {
    id: 'lock-03',
    name: 'Level 3: Genetic Archive',
    codeLength: 3,
    digitsRange: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    solution: ['7', '1', '2'],
    description: {
      en: 'Unlock the genetic sample archive safe.',
      ta: 'மரபியல் மாதிரிகள் காப்பக பெட்டகத்தைத் திறக்கவும்.',
    },
    clues: [
      {
        guess: ['4', '1', '9'],
        hint: { en: 'One number is correct and well placed.', ta: 'ஒரு எண் சரி மற்றும் சரியான இடத்தில் உள்ளது.' },
        badge: { en: '1 Correct & Well Placed', ta: '1 சரி & சரியான இடம்' },
      },
      {
        guess: ['2', '7', '5'],
        hint: { en: 'Two numbers are correct but wrongly placed.', ta: 'இரண்டு எண்கள் சரி ஆனால் தவறான இடத்தில் உள்ளன.' },
        badge: { en: '2 Correct & Wrong Place', ta: '2 சரி & தவறான இடம்' },
      },
      {
        guess: ['3', '6', '8'],
        hint: { en: 'Nothing is correct.', ta: 'எந்த எண்ணும் சரியில்லை.' },
        badge: { en: 'All Wrong', ta: 'அனைத்தும் தவறு' },
      },
      {
        guess: ['7', '9', '0'],
        hint: { en: 'One number is correct and well placed.', ta: 'ஒரு எண் சரி மற்றும் சரியான இடத்தில் உள்ளது.' },
        badge: { en: '1 Correct & Well Placed', ta: '1 சரி & சரியான இடம்' },
      },
    ],
  },
  {
    id: 'lock-04',
    name: 'Level 4: Particle Accelerator',
    codeLength: 3,
    digitsRange: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    solution: ['1', '9', '6'],
    description: {
      en: 'Determine the beam frequency override lock.',
      ta: 'துகள் முடுக்கியின் அலைவரிசை பூட்டை திறக்கவும்.',
    },
    clues: [
      {
        guess: ['1', '4', '7'],
        hint: { en: 'One number is correct and well placed.', ta: 'ஒரு எண் சரி மற்றும் சரியான இடத்தில் உள்ளது.' },
        badge: { en: '1 Correct & Well Placed', ta: '1 சரி & சரியான இடம்' },
      },
      {
        guess: ['6', '1', '2'],
        hint: { en: 'Two numbers are correct but wrongly placed.', ta: 'இரண்டு எண்கள் சரி ஆனால் தவறான இடத்தில் உள்ளன.' },
        badge: { en: '2 Correct & Wrong Place', ta: '2 சரி & தவறான இடம்' },
      },
      {
        guess: ['8', '5', '3'],
        hint: { en: 'Nothing is correct.', ta: 'எந்த எண்ணும் சரியில்லை.' },
        badge: { en: 'All Wrong', ta: 'அனைத்தும் தவறு' },
      },
      {
        guess: ['9', '0', '6'],
        hint: { en: 'Two numbers are correct: one in place, one wrongly placed.', ta: 'இரண்டு எண்கள் சரி: ஒன்று சரியான இடத்தில், ஒன்று தவறான இடத்தில் உள்ளது.' },
        badge: { en: '2 Correct', ta: '2 சரி' },
      },
    ],
  },
  {
    id: 'lock-05',
    name: 'Level 5: Space Station Airlock',
    codeLength: 3,
    digitsRange: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    solution: ['8', '2', '4'],
    description: {
      en: 'Release the airlock docking clamp mechanism.',
      ta: 'விண்வெளி நிலையத்தின் காற்று பூட்டு விசைப்பலகையை இயக்கவும்.',
    },
    clues: [
      {
        guess: ['8', '1', '9'],
        hint: { en: 'One number is correct and well placed.', ta: 'ஒரு எண் சரி மற்றும் சரியான இடத்தில் உள்ளது.' },
        badge: { en: '1 Correct & Well Placed', ta: '1 சரி & சரியான இடம்' },
      },
      {
        guess: ['4', '8', '3'],
        hint: { en: 'Two numbers are correct but wrongly placed.', ta: 'இரண்டு எண்கள் சரி ஆனால் தவறான இடத்தில் உள்ளன.' },
        badge: { en: '2 Correct & Wrong Place', ta: '2 சரி & தவறான இடம்' },
      },
      {
        guess: ['5', '7', '0'],
        hint: { en: 'Nothing is correct.', ta: 'எந்த எண்ணும் சரியில்லை.' },
        badge: { en: 'All Wrong', ta: 'அனைத்தும் தவறு' },
      },
      {
        guess: ['2', '6', '4'],
        hint: { en: 'Two numbers are correct: one in place, one wrongly placed.', ta: 'இரண்டு எண்கள் சரி.' },
        badge: { en: '2 Correct', ta: '2 சரி' },
      },
    ],
  },
  {
    id: 'lock-06',
    name: 'Level 6: Observatory Dome',
    codeLength: 3,
    digitsRange: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    solution: ['5', '3', '7'],
    description: {
      en: 'Align the giant optical mirror rotation locks.',
      ta: 'வானியல் தொலைநோக்கியின் கண்ணாடிக் கோணத்தை சீரமைக்கவும்.',
    },
    clues: [
      {
        guess: ['5', '0', '2'],
        hint: { en: 'One number is correct and well placed.', ta: 'ஒரு எண் சரி மற்றும் சரியான இடத்தில் உள்ளது.' },
        badge: { en: '1 Correct & Well Placed', ta: '1 சரி & சரியான இடம்' },
      },
      {
        guess: ['7', '5', '8'],
        hint: { en: 'Two numbers are correct but wrongly placed.', ta: 'இரண்டு எண்கள் சரி ஆனால் தவறான இடத்தில் உள்ளன.' },
        badge: { en: '2 Correct & Wrong Place', ta: '2 சரி & தவறான இடம்' },
      },
      {
        guess: ['1', '4', '6'],
        hint: { en: 'Nothing is correct.', ta: 'எந்த எண்ணும் சரியில்லை.' },
        badge: { en: 'All Wrong', ta: 'அனைத்தும் தவறு' },
      },
      {
        guess: ['9', '3', '7'],
        hint: { en: 'Two numbers are correct and well placed.', ta: 'இரண்டு எண்கள் சரி மற்றும் சரியான இடத்தில் உள்ளன.' },
        badge: { en: '2 Correct & Well Placed', ta: '2 சரி & சரியான இடம்' },
      },
    ],
  },
  {
    id: 'lock-07',
    name: 'Level 7: Nuclear Reactor Core',
    codeLength: 3,
    digitsRange: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    solution: ['2', '6', '9'],
    description: {
      en: 'Activate the control rod safety interlock system.',
      ta: 'அணு உலை கட்டுப்பாட்டு தண்டுகளின் பாதுகாப்பு பூட்டைத் திறக்கவும்.',
    },
    clues: [
      {
        guess: ['2', '8', '1'],
        hint: { en: 'One number is correct and well placed.', ta: 'ஒரு எண் சரி மற்றும் சரியான இடத்தில் உள்ளது.' },
        badge: { en: '1 Correct & Well Placed', ta: '1 சரி & சரியான இடம்' },
      },
      {
        guess: ['9', '2', '5'],
        hint: { en: 'Two numbers are correct but wrongly placed.', ta: 'இரண்டு எண்கள் சரி ஆனால் தவறான இடத்தில் உள்ளன.' },
        badge: { en: '2 Correct & Wrong Place', ta: '2 சரி & தவறான இடம்' },
      },
      {
        guess: ['3', '4', '7'],
        hint: { en: 'Nothing is correct.', ta: 'எந்த எண்ணும் சரியில்லை.' },
        badge: { en: 'All Wrong', ta: 'அனைத்தும் தவறு' },
      },
      {
        guess: ['0', '6', '9'],
        hint: { en: 'Two numbers are correct and well placed.', ta: 'இரண்டு எண்கள் சரி மற்றும் சரியான இடத்தில் உள்ளன.' },
        badge: { en: '2 Correct & Well Placed', ta: '2 சரி & சரியான இடம்' },
      },
    ],
  },
  {
    id: 'lock-08',
    name: 'Level 8: Quantum Key Safe',
    codeLength: 3,
    digitsRange: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    solution: ['4', '0', '5'],
    description: {
      en: 'Decode the quantum entanglement encryption pin.',
      ta: 'குவாண்டம் குறியாக்க பெட்டகத்தின் 3-இலக்க கடவுச்சொல்.',
    },
    clues: [
      {
        guess: ['4', '1', '7'],
        hint: { en: 'One number is correct and well placed.', ta: 'ஒரு எண் சரி மற்றும் சரியான இடத்தில் உள்ளது.' },
        badge: { en: '1 Correct & Well Placed', ta: '1 சரி & சரியான இடம்' },
      },
      {
        guess: ['5', '4', '2'],
        hint: { en: 'Two numbers are correct but wrongly placed.', ta: 'இரண்டு எண்கள் சரி ஆனால் தவறான இடத்தில் உள்ளன.' },
        badge: { en: '2 Correct & Wrong Place', ta: '2 சரி & தவறான இடம்' },
      },
      {
        guess: ['8', '3', '9'],
        hint: { en: 'Nothing is correct.', ta: 'எந்த எண்ணும் சரியில்லை.' },
        badge: { en: 'All Wrong', ta: 'அனைத்தும் தவறு' },
      },
      {
        guess: ['6', '0', '5'],
        hint: { en: 'Two numbers are correct and well placed.', ta: 'இரண்டு எண்கள் சரி மற்றும் சரியான இடத்தில் உள்ளன.' },
        badge: { en: '2 Correct & Well Placed', ta: '2 சரி & சரியான இடம்' },
      },
    ],
  },
  {
    id: 'lock-09',
    name: 'Level 9: Deep Sea Bathyscaphe',
    codeLength: 3,
    digitsRange: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    solution: ['9', '7', '1'],
    description: {
      en: 'Equalize the submersible pressure valve hatch.',
      ta: 'ஆழ்கடல் ஆய்வு படகின் அழுத்த சமன்செய்யும் வால்வை இயக்கவும்.',
    },
    clues: [
      {
        guess: ['9', '3', '4'],
        hint: { en: 'One number is correct and well placed.', ta: 'ஒரு எண் சரி மற்றும் சரியான இடத்தில் உள்ளது.' },
        badge: { en: '1 Correct & Well Placed', ta: '1 சரி & சரியான இடம்' },
      },
      {
        guess: ['1', '9', '8'],
        hint: { en: 'Two numbers are correct but wrongly placed.', ta: 'இரண்டு எண்கள் சரி ஆனால் தவறான இடத்தில் உள்ளன.' },
        badge: { en: '2 Correct & Wrong Place', ta: '2 சரி & தவறான இடம்' },
      },
      {
        guess: ['5', '2', '6'],
        hint: { en: 'Nothing is correct.', ta: 'எந்த எண்ணும் சரியில்லை.' },
        badge: { en: 'All Wrong', ta: 'அனைத்தும் தவறு' },
      },
      {
        guess: ['0', '7', '1'],
        hint: { en: 'Two numbers are correct and well placed.', ta: 'இரண்டு எண்கள் சரி மற்றும் சரியான இடத்தில் உள்ளன.' },
        badge: { en: '2 Correct & Well Placed', ta: '2 சரி & சரியான இடம்' },
      },
    ],
  },
  {
    id: 'lock-10',
    name: 'Level 10: Master Science Vault',
    codeLength: 3,
    digitsRange: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    solution: ['6', '3', '8'],
    description: {
      en: 'Crack the grand master science safe combinations.',
      ta: 'முதன்மை அறிவியல் களஞ்சியத்தின் பூட்டை திறக்கவும்.',
    },
    clues: [
      {
        guess: ['6', '1', '5'],
        hint: { en: 'One number is correct and well placed.', ta: 'ஒரு எண் சரி மற்றும் சரியான இடத்தில் உள்ளது.' },
        badge: { en: '1 Correct & Well Placed', ta: '1 சரி & சரியான இடம்' },
      },
      {
        guess: ['8', '6', '2'],
        hint: { en: 'Two numbers are correct but wrongly placed.', ta: 'இரண்டு எண்கள் சரி ஆனால் தவறான இடத்தில் உள்ளன.' },
        badge: { en: '2 Correct & Wrong Place', ta: '2 சரி & தவறான இடம்' },
      },
      {
        guess: ['7', '4', '9'],
        hint: { en: 'Nothing is correct.', ta: 'எந்த எண்ணும் சரியில்லை.' },
        badge: { en: 'All Wrong', ta: 'அனைத்தும் தவறு' },
      },
      {
        guess: ['0', '3', '8'],
        hint: { en: 'Two numbers are correct and well placed.', ta: 'இரண்டு எண்கள் சரி மற்றும் சரியான இடத்தில் உள்ளன.' },
        badge: { en: '2 Correct & Well Placed', ta: '2 சரி & சரியான இடம்' },
      },
    ],
  },
];
