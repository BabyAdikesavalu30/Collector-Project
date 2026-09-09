/**
 * Missions Feature Configuration
 * Data-driven mission definitions. Every mission references functionality
 * that already exists in the app — no fake tasks.
 */

import { MissionDefinition } from './missions.types';

export const DAILY_MISSIONS: MissionDefinition[] = [
  {
    id: 'daily-play-game',
    kind: 'daily',
    title: 'Play a Science Game',
    titleTa: 'அறிவியல் ஆட்டம் விளையாடு',
    description: 'Complete 1 science game level today.',
    descriptionTa: 'இன்று 1 அறிவியல் விளையாட்டு நிலையை முடிக்கவும்.',
    icon: '🎮',
    requirement: { kind: 'playGame', target: 1 },
    reward: { xp: 100, points: 25 },
  },
  {
    id: 'daily-solve-riddle',
    kind: 'daily',
    title: 'Solve a Riddle',
    titleTa: 'ஒரு புதிரை தீர்க்கவும்',
    description: 'Solve 1 science riddle today.',
    descriptionTa: 'இன்று 1 அறிவியல் புதிரை தீர்க்கவும்.',
    icon: '💡',
    requirement: { kind: 'solveRiddle', target: 1 },
    reward: { xp: 100, points: 25 },
  },
  {
    id: 'daily-discover-facts',
    kind: 'daily',
    title: 'Discover 3 Facts',
    titleTa: '3 தகவல்களை கண்டறியவும்',
    description: 'Discover 3 fun science facts today.',
    descriptionTa: 'இன்று 3 சுவாரஸ்ய அறிவியல் தகவல்களை கண்டறியவும்.',
    icon: '✨',
    requirement: { kind: 'discoverFact', target: 3 },
    reward: { xp: 100, points: 25 },
  },
  {
    id: 'daily-solve-mystery',
    kind: 'daily',
    title: 'Solve a Mystery',
    titleTa: 'ஒரு மர்மத்தை தீர்க்கவும்',
    description: 'Solve 1 mystery lab case today.',
    descriptionTa: 'இன்று 1 மர்ம ஆய்வக வழக்கை தீர்க்கவும்.',
    icon: '🕵️',
    requirement: { kind: 'solveMystery', target: 1 },
    reward: { xp: 100, points: 25 },
  },
  {
    id: 'daily-complete-quiz',
    kind: 'daily',
    title: 'Complete a Quiz',
    titleTa: 'வினாடி வினாவை முடிக்கவும்',
    description: 'Complete 1 science quiz today.',
    descriptionTa: 'இன்று 1 அறிவியல் வினாடி வினாவை முடிக்கவும்.',
    icon: '🔬',
    requirement: { kind: 'completeQuiz', target: 1 },
    reward: { xp: 100, points: 25 },
  },
];

export const WEEKLY_MISSIONS: MissionDefinition[] = [
  {
    id: 'weekly-five-activities',
    kind: 'weekly',
    title: 'Complete 5 Activities',
    titleTa: '5 செயல்பாடுகளை முடிக்கவும்',
    description: 'Complete any 5 science activities this week.',
    descriptionTa: 'இந்த வாரம் ஏதேனும் 5 அறிவியல் செயல்பாடுகளை முடிக்கவும்.',
    icon: '📊',
    requirement: { kind: 'completeActivity', target: 5 },
    reward: { xp: 500, points: 100, badgeLabel: 'Weekly Achiever', badgeLabelTa: 'வார சாதனையாளர்' },
  },
  {
    id: 'weekly-three-games',
    kind: 'weekly',
    title: 'Play 3 Different Games',
    titleTa: '3 வெவ்வேறு ஆட்டங்கள் விளையாடு',
    description: 'Play 3 different science games this week.',
    descriptionTa: 'இந்த வாரம் 3 வெவ்வேறு அறிவியல் விளையாட்டுகளை விளையாடவும்.',
    icon: '🎮',
    requirement: { kind: 'playDifferentGames', target: 3 },
    reward: { xp: 500, points: 100 },
  },
  {
    id: 'weekly-solve-riddles',
    kind: 'weekly',
    title: 'Solve 3 Riddles',
    titleTa: '3 புதிர்களை தீர்க்கவும்',
    description: 'Solve 3 science riddles this week.',
    descriptionTa: 'இந்த வாரம் 3 அறிவியல் புதிர்களை தீர்க்கவும்.',
    icon: '💡',
    requirement: { kind: 'solveRiddle', target: 3 },
    reward: { xp: 500, points: 100 },
  },
  {
    id: 'weekly-discover-facts',
    kind: 'weekly',
    title: 'Discover 10 Facts',
    titleTa: '10 தகவல்களை கண்டறியவும்',
    description: 'Discover 10 fun science facts this week.',
    descriptionTa: 'இந்த வாரம் 10 சுவாரஸ்ய அறிவியல் தகவல்களை கண்டறியவும்.',
    icon: '✨',
    requirement: { kind: 'discoverFact', target: 10 },
    reward: { xp: 500, points: 100 },
  },
  {
    id: 'weekly-five-day-streak',
    kind: 'weekly',
    title: 'Maintain a 5-Day Streak',
    titleTa: '5 நாள் தொடர்ச்சியை பராமரிக்கவும்',
    description: 'Keep your science streak alive for 5 days.',
    descriptionTa: '5 நாட்களுக்கு உங்கள் அறிவியல் தொடர்ச்சியை பராமரிக்கவும்.',
    icon: '🔥',
    requirement: { kind: 'maintainStreak', target: 5 },
    reward: { xp: 500, points: 100 },
  },
];

export const ALL_MISSIONS: MissionDefinition[] = [...DAILY_MISSIONS, ...WEEKLY_MISSIONS];