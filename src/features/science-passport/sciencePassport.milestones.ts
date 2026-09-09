/**
 * Science Passport Milestone Definitions
 * Defines the journey roadmap milestones.
 * Pure data — no evaluation logic (that lives in the service).
 */

import { PassportMilestone } from './sciencePassport.types';

export const PASSPORT_MILESTONE_DEFINITIONS: Array<
  Omit<PassportMilestone, 'status' | 'progress'>
> = [
  // Journey milestones
  {
    id: 'first-activity',
    title: { en: 'First Science Activity', ta: 'முதல் அறிவியல் செயல்பாடு' },
    description: { en: 'Complete your first activity', ta: 'உங்கள் முதல் செயல்பாட்டை முடிக்கவும்' },
    target: 1,
    category: 'journey',
    icon: '🌱',
    relatedRoute: '/learn',
  },
  {
    id: 'first-badge',
    title: { en: 'First Badge', ta: 'முதல் சாதனை' },
    description: { en: 'Earn your first achievement badge', ta: 'உங்கள் முதல் சாதனைப் பேட்ஜைப் பெறுங்கள்' },
    target: 1,
    category: 'achievements',
    icon: '🏅',
    relatedRoute: '/achievements',
  },
  {
    id: 'first-lesson',
    title: { en: 'First Micro Lesson', ta: 'முதல் சிறு பாடம்' },
    description: { en: 'Complete your first micro lesson', ta: 'உங்கள் முதல் சிறு பாடத்தை முடிக்கவும்' },
    target: 1,
    category: 'learning',
    icon: '📖',
    relatedRoute: '/micro-lessons',
  },
  {
    id: 'first-experiment',
    title: { en: 'First Experiment', ta: 'முதல் சோதனை' },
    description: { en: 'Complete your first experiment', ta: 'உங்கள் முதல் சோதனையை முடிக்கவும்' },
    target: 1,
    category: 'experiment',
    icon: '🧪',
    relatedRoute: '/experiment-lab',
  },
  {
    id: 'first-concept-map',
    title: { en: 'First Concept Map', ta: 'முதல் கருத்து வரைபடம்' },
    description: { en: 'Explore your first concept map', ta: 'உங்கள் முதல் கருத்து வரைபடத்தை ஆராயுங்கள்' },
    target: 1,
    category: 'learning',
    icon: '🗺️',
    relatedRoute: '/concept-maps',
  },
  {
    id: 'first-mystery',
    title: { en: 'First Mystery', ta: 'முதல் மர்மம்' },
    description: { en: 'Solve your first mystery case', ta: 'உங்கள் முதல் மர்ம வழக்கைத் தீர்க்கவும்' },
    target: 1,
    category: 'discovery',
    icon: '🕵️',
    relatedRoute: '/mystery-lab',
  },
  {
    id: 'first-riddle',
    title: { en: 'First Riddle', ta: 'முதல் புதிர்' },
    description: { en: 'Solve your first riddle', ta: 'உங்கள் முதல் புதிரைத் தீர்க்கவும்' },
    target: 1,
    category: 'games',
    icon: '🧩',
    relatedRoute: '/riddles',
  },
  {
    id: 'first-game',
    title: { en: 'First Game', ta: 'முதல் ஆட்டம்' },
    description: { en: 'Complete a level in any game', ta: 'எந்தவொரு ஆட்டத்திலும் ஒரு நிலையை முடிக்கவும்' },
    target: 1,
    category: 'games',
    icon: '🎮',
    relatedRoute: '/games',
  },
  // Streak milestones
  {
    id: 'streak-3',
    title: { en: '3-Day Streak', ta: '3 நாள் தொடர்ச்சி' },
    description: { en: 'Learn for 3 consecutive days', ta: 'தொடர்ந்து 3 நாட்கள் கற்கவும்' },
    target: 3,
    category: 'streak',
    icon: '🔥',
    relatedRoute: '/streak',
  },
  {
    id: 'streak-7',
    title: { en: '7-Day Streak', ta: '7 நாள் தொடர்ச்சி' },
    description: { en: 'Learn for 7 consecutive days', ta: 'தொடர்ந்து 7 நாட்கள் கற்கவும்' },
    target: 7,
    category: 'streak',
    icon: '🔥',
    relatedRoute: '/streak',
  },
  {
    id: 'streak-30',
    title: { en: '30-Day Streak', ta: '30 நாள் தொடர்ச்சி' },
    description: { en: 'Learn for 30 consecutive days', ta: 'தொடர்ந்து 30 நாட்கள் கற்கவும்' },
    target: 30,
    category: 'streak',
    icon: '⭐',
    relatedRoute: '/streak',
  },
  // Activity count milestones
  {
    id: 'activities-10',
    title: { en: '10 Activities', ta: '10 செயல்பாடுகள்' },
    description: { en: 'Complete 10 science activities', ta: '10 அறிவியல் செயல்பாடுகளை முடிக்கவும்' },
    target: 10,
    category: 'learning',
    icon: '📚',
  },
  {
    id: 'activities-25',
    title: { en: '25 Activities', ta: '25 செயல்பாடுகள்' },
    description: { en: 'Complete 25 science activities', ta: '25 அறிவியல் செயல்பாடுகளை முடிக்கவும்' },
    target: 25,
    category: 'learning',
    icon: '🌟',
  },
  {
    id: 'activities-50',
    title: { en: '50 Activities', ta: '50 செயல்பாடுகள்' },
    description: { en: 'Complete 50 science activities', ta: '50 அறிவியல் செயல்பாடுகளை முடிக்கவும்' },
    target: 50,
    category: 'learning',
    icon: '🎓',
  },
  // Collection milestones
  {
    id: 'first-collection',
    title: { en: 'First Collection', ta: 'முதல் தொகுப்பு' },
    description: { en: 'Complete your first collection', ta: 'உங்கள் முதல் தொகுப்பை நிறைவு செய்யுங்கள்' },
    target: 1,
    category: 'collections',
    icon: '📦',
  },
  {
    id: 'collections-3',
    title: { en: '3 Collections', ta: '3 தொகுப்புகள்' },
    description: { en: 'Complete 3 collections', ta: '3 தொகுப்புகளை நிறைவு செய்யுங்கள்' },
    target: 3,
    category: 'collections',
    icon: '📚',
  },
  // Certificate milestone
  {
    id: 'first-certificate',
    title: { en: 'First Certificate', ta: 'முதல் சான்றிதழ்' },
    description: { en: 'Earn your first certificate', ta: 'உங்கள் முதல் சான்றிதழைப் பெறுங்கள்' },
    target: 1,
    category: 'recognition',
    icon: '📜',
  },
  // Science Scholar (capstone)
  {
    id: 'science-scholar',
    title: { en: 'Science Scholar', ta: 'அறிவியல் அறிஞர்' },
    description: { en: 'Complete 25 science activities', ta: '25 அறிவியல் செயல்பாடுகளை முடிக்கவும்' },
    target: 25,
    category: 'achievements',
    icon: '🎓',
    relatedRoute: '/achievements',
  },
];
