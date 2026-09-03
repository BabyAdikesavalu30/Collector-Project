/**
 * Spin Wheel Mock Data & Question Repository
 * Curated Grade 6-12 bilingual questions for Scientists, Inventions, Science Facts, Think Fast, and Challenges.
 */

import {
  SpinWheelSegment,
  SpinWheelQuestion,
  SpinWheelFact,
  SpinWheelBonus,
} from './spin-wheel.types';

// ===========================================================================
// 1. Six Balanced Wheel Segments (clockwise arrangement)
// ===========================================================================
export const SPIN_WHEEL_SEGMENTS: SpinWheelSegment[] = [
  {
    id: 'scientist',
    label: { en: 'Scientist', ta: 'அறிவியலாளர்' },
    icon: '👨‍🔬',
    bgColor: '#EFF6FF', // Pale Blue
    textColor: '#1E40AF',
    accentColor: '#2563EB',
  },
  {
    id: 'invention',
    label: { en: 'Invention', ta: 'கண்டுபிடிப்பு' },
    icon: '💡',
    bgColor: '#FAF5FF', // Pale Purple
    textColor: '#6B21A8',
    accentColor: '#7E22CE',
  },
  {
    id: 'scienceFact',
    label: { en: 'Science Fact', ta: 'அறிவியல் உண்மை' },
    icon: '🌍',
    bgColor: '#F0FDF4', // Pale Green
    textColor: '#166534',
    accentColor: '#16A34A',
  },
  {
    id: 'thinkFast',
    label: { en: 'Think Fast', ta: 'விரைவுச் சிந்தனை' },
    icon: '⚡',
    bgColor: '#FFFBEB', // Pale Amber
    textColor: '#92400E',
    accentColor: '#D97706',
  },
  {
    id: 'bonus',
    label: { en: 'Bonus Points', ta: 'கூடுதல் புள்ளிகள்' },
    icon: '🎁',
    bgColor: '#FEF2F2', // Pale Rose
    textColor: '#991B1B',
    accentColor: '#DC2626',
  },
  {
    id: 'challenge',
    label: { en: 'Challenge', ta: 'அறிவியல் சவால்' },
    icon: '🚀',
    bgColor: '#EEF2FF', // Pale Indigo
    textColor: '#3730A3',
    accentColor: '#4F46E5',
  },
];

// ===========================================================================
// 2. Curated Questions (Scientists & Inventions)
// ===========================================================================
export const SCIENTIST_QUESTIONS: SpinWheelQuestion[] = [
  {
    id: 'sc-01',
    category: 'scientist',
    badge: { en: 'Scientist Spotlight', ta: 'அறிவியலாளர் அரங்கம்' },
    question: {
      en: 'Which scientist formulated the Three Laws of Motion and Universal Gravitation?',
      ta: 'மூன்று இயக்க விதிகள் மற்றும் ஈர்ப்பு விதியை வகுத்த அறிவியலாளர் யார்?',
    },
    options: [
      { id: 'opt-a', text: { en: 'Sir Isaac Newton', ta: 'சர் ஐசக் நியூட்டன்' } },
      { id: 'opt-b', text: { en: 'Albert Einstein', ta: 'ஆல்பர்ட் ஐன்ஸ்டீன்' } },
      { id: 'opt-c', text: { en: 'Galileo Galilei', ta: 'கலிலியோ கலிலி' } },
      { id: 'opt-d', text: { en: 'Charles Darwin', ta: 'சார்லஸ் டார்வின்' } },
    ],
    correctOptionId: 'opt-a',
    explanation: {
      en: 'Sir Isaac Newton published the three fundamental laws of motion in 1687.',
      ta: 'சர் ஐசக் நியூட்டன் 1687-ல் இயக்கத்தின் மூன்று முக்கிய விதிகளை வெளியிட்டார்.',
    },
    points: 20,
  },
  {
    id: 'sc-02',
    category: 'scientist',
    badge: { en: 'Scientist Spotlight', ta: 'அறிவியலாளர் அரங்கம்' },
    question: {
      en: 'Which Indian physicist won the Nobel Prize for the discovery of the Scattering of Light?',
      ta: 'ஒளிச்சிதறல் கண்டுபிடிப்பிற்காக நோபல் பரிசு பெற்ற இந்திய இயற்பியலாளர் யார்?',
    },
    options: [
      { id: 'opt-a', text: { en: 'Sir C. V. Raman', ta: 'சர் சி. வி. ராமன்' } },
      { id: 'opt-b', text: { en: 'Dr. Homi Bhabha', ta: 'டாக்டர் ஹோமி பாபா' } },
      { id: 'opt-c', text: { en: 'Satyendra Nath Bose', ta: 'சத்யேந்திர நாத் போஸ்' } },
      { id: 'opt-d', text: { en: 'Vikram Sarabhai', ta: 'விக்ரம் சாராபாய்' } },
    ],
    correctOptionId: 'opt-a',
    explanation: {
      en: 'Sir C. V. Raman discovered the Raman Effect in 1928 and won the Nobel Prize in Physics in 1930.',
      ta: 'சர் சி. வி. ராமன் 1928-ல் ராமன் விளைவைக் கண்டுபிடித்து 1930-ல் இயற்பியலுக்கான நோபல் பரிசை வென்றார்.',
    },
    points: 20,
  },
];

export const INVENTION_QUESTIONS: SpinWheelQuestion[] = [
  {
    id: 'inv-01',
    category: 'invention',
    badge: { en: 'Invention Hub', ta: 'கண்டுபிடிப்பு களம்' },
    question: {
      en: 'Who is widely credited with the invention of the electric light bulb for practical commercial use?',
      ta: 'வணிகப் பயன்பாட்டிற்கான மின்விளக்கைக் கண்டுபிடித்தவராகப் போற்றப்படுபவர் யார்?',
    },
    options: [
      { id: 'opt-a', text: { en: 'Thomas Edison', ta: 'தாமஸ் எடிசன்' } },
      { id: 'opt-b', text: { en: 'Nikola Tesla', ta: 'நிகோலா டெஸ்லா' } },
      { id: 'opt-c', text: { en: 'Michael Faraday', ta: 'மைக்கேல் ஃபாரடே' } },
      { id: 'opt-d', text: { en: 'Alexander Graham Bell', ta: 'அலெக்சாண்டர் கிரஹாம் பெல்' } },
    ],
    correctOptionId: 'opt-a',
    explanation: {
      en: 'Thomas Edison developed a commercially viable incandescent light bulb in 1879.',
      ta: 'தாமஸ் எடிசன் 1879-ல் நீண்ட நேரம் எரியும் மின்விளக்கை உருவாக்கினார்.',
    },
    points: 20,
  },
  {
    id: 'inv-02',
    category: 'invention',
    badge: { en: 'Invention Hub', ta: 'கண்டுபிடிப்பு களம்' },
    question: {
      en: 'Which instrument uses lenses to magnify extremely small biological specimens?',
      ta: 'மிக நுண்ணிய உயிரினங்களை பெரிதாக்கிக் காட்ட உதவும் கருவி எது?',
    },
    options: [
      { id: 'opt-a', text: { en: 'Microscope', ta: 'நுண்ணோக்கி' } },
      { id: 'opt-b', text: { en: 'Telescope', ta: 'தொலைநோக்கி' } },
      { id: 'opt-c', text: { en: 'Periscope', ta: 'பெரிஸ்கோப்' } },
      { id: 'opt-d', text: { en: 'Stethoscope', ta: 'ஸ்டெதாஸ்கோப்' } },
    ],
    correctOptionId: 'opt-a',
    explanation: {
      en: 'The optical microscope uses compound lenses to magnify microscopic cellular specimens.',
      ta: 'கூட்டு நுண்ணோக்கி லென்ஸ்களைப் பயன்படுத்தி மிகச் சிறிய செல்களைப் பெரிதாக்கிக் காட்டுகிறது.',
    },
    points: 20,
  },
];

export const THINK_FAST_QUESTIONS: SpinWheelQuestion[] = [
  {
    id: 'tf-01',
    category: 'thinkFast',
    badge: { en: 'Think Fast Challenge', ta: 'விரைவுச் சிந்தனை சவால்' },
    question: {
      en: 'What is the closest planet to the Sun in our solar system?',
      ta: 'சூரிய குடும்பத்தில் சூரியனுக்கு மிக அருகில் உள்ள கோள் எது?',
    },
    options: [
      { id: 'opt-a', text: { en: 'Mercury', ta: 'புதன்' } },
      { id: 'opt-b', text: { en: 'Venus', ta: 'வெள்ளி' } },
      { id: 'opt-c', text: { en: 'Mars', ta: 'செவ்வாய்' } },
      { id: 'opt-d', text: { en: 'Earth', ta: 'பூமி' } },
    ],
    correctOptionId: 'opt-a',
    explanation: {
      en: 'Mercury is the smallest and innermost planet in the Solar System.',
      ta: 'புதன் சூரிய குடும்பத்தில் மிகச்சிறிய மற்றும் சூரியனுக்கு மிக அருகில் உள்ள கோளாகும்.',
    },
    points: 15,
  },
];

export const CHALLENGE_QUESTIONS: SpinWheelQuestion[] = [
  {
    id: 'ch-01',
    category: 'challenge',
    badge: { en: 'Master Challenge', ta: 'மேம்பட்ட அறிவியல் சவால்' },
    question: {
      en: 'Which organelle is universally known as the powerhouse of the cell?',
      ta: 'செல்லின் ஆற்றல் மையம் என்று அழைக்கப்படும் நுண்ணுறுப்பு எது?',
    },
    options: [
      { id: 'opt-a', text: { en: 'Mitochondria', ta: 'மைட்டோகாண்ட்ரியா' } },
      { id: 'opt-b', text: { en: 'Ribosome', ta: 'ரைபோசோம்' } },
      { id: 'opt-c', text: { en: 'Nucleus', ta: 'உட்கரு' } },
      { id: 'opt-d', text: { en: 'Golgi Apparatus', ta: 'கோல்கை உறுப்புகள்' } },
    ],
    correctOptionId: 'opt-a',
    explanation: {
      en: 'Mitochondria produce ATP through cellular respiration, powering cellular activities.',
      ta: 'மைட்டோகாண்ட்ரியா செல்கள் சுவாசித்தலின் மூலம் ஏடிபி (ATP) ஆற்றலை உற்பத்தி செய்கிறது.',
    },
    points: 30,
  },
];

// ===========================================================================
// 3. Science Facts & Bonus Data
// ===========================================================================
export const SCIENCE_FACTS: SpinWheelFact[] = [
  {
    id: 'fact-01',
    badge: { en: 'Did You Know?', ta: 'உங்களுக்குத் தெரியுமா?' },
    title: { en: 'The Speed of Light', ta: 'ஒளியின் வேகம்' },
    fact: {
      en: 'Light travels through a vacuum at an incredible speed of approximately 300,000 kilometers per second!',
      ta: 'வெற்றிடத்தில் ஒளி வினாடிக்கு சுமார் 3,00,000 கிலோமீட்டர் என்ற வியக்கத்தக்க வேகத்தில் பயணிக்கிறது!',
    },
    points: 10,
  },
  {
    id: 'fact-02',
    badge: { en: 'Did You Know?', ta: 'உங்களுக்குத் தெரியுமா?' },
    title: { en: 'Hotter than the Sun', ta: 'சூரியனை விட அதிக வெப்பம்' },
    fact: {
      en: 'A single flash of lightning can heat the surrounding air to around 30,000°C — 5 times hotter than the surface of the Sun!',
      ta: 'ஒரு மின்னல் அதைச் சுற்றியுள்ள காற்றை சுமார் 30,000°C வரை வெப்பமாக்கும் — இது சூரியனின் மேற்பரப்பை விட 5 மடங்கு அதிகம்!',
    },
    points: 10,
  },
];

export const BONUS_REWARD: SpinWheelBonus = {
  id: 'bonus-01',
  badge: { en: 'Daily Bonus Reward', ta: 'தினசரி கூடுதல் பரிசு' },
  title: { en: 'Lucky Star Spin!', ta: 'அதிர்ஷ்ட சுழல் பரிசு!' },
  message: {
    en: 'Congratulations! You landed on the Daily Bonus and earned instant science reward points.',
    ta: 'வாழ்த்துகள்! நீங்கள் கூடுதல் பரிசுப் பிரிவைப் பெற்று உடனடி அறிவியல் புள்ளிகளை வென்றுள்ளீர்கள்.',
  },
  points: 25,
};
