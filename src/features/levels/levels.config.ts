/**
 * Science Levels Feature Configuration
 * Single data-driven definition of the 10 science levels. All level
 * calculations read from this one table — never hardcode thresholds
 * or titles elsewhere.
 */

import { ScienceLevelConfig } from './levels.types';

export const SCIENCE_LEVELS: ScienceLevelConfig[] = [
  { level: 1, xpThreshold: 0, title: 'Curious Explorer', titleTa: 'ஆர்வமுள்ள ஆய்வாளர்', icon: '🌱' },
  { level: 2, xpThreshold: 100, title: 'Science Starter', titleTa: 'அறிவியல் தொடக்கநிலையாளர்', icon: '🌿' },
  { level: 3, xpThreshold: 250, title: 'Lab Learner', titleTa: 'ஆய்வக மாணவர்', icon: '🔬' },
  { level: 4, xpThreshold: 450, title: 'Science Thinker', titleTa: 'அறிவியல் சிந்தனையாளர்', icon: '🧠' },
  { level: 5, xpThreshold: 700, title: 'Discovery Seeker', titleTa: 'கண்டுபிடிப்பு தேடுபவர்', icon: '🔍' },
  { level: 6, xpThreshold: 1000, title: 'Young Scientist', titleTa: 'இளம் விஞ்ஞானி', icon: '👨‍🔬' },
  { level: 7, xpThreshold: 1400, title: 'Science Scholar', titleTa: 'அறிவியல் அறிஞர்', icon: '📚' },
  { level: 8, xpThreshold: 1900, title: 'Science Explorer', titleTa: 'அறிவியல் ஆய்வாளர்', icon: '🚀' },
  { level: 9, xpThreshold: 2500, title: 'Science Master', titleTa: 'அறிவியல் மேதை', icon: '🏆' },
  { level: 10, xpThreshold: 3200, title: 'Future Innovator', titleTa: 'எதிர்கால கண்டுபிடிப்பாளர்', icon: '🌟' },
];

export const MAX_SCIENCE_LEVEL = SCIENCE_LEVELS[SCIENCE_LEVELS.length - 1].level;