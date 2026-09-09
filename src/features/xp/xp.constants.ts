/**
 * XP Feature Constants
 * Single source of truth for deterministic XP amounts and milestone goals.
 * Every activity source maps to one fixed XP value.
 */

import { XPSource, Milestone } from './xp.types';

/** Default XP granted per activity completion (overridable per event). */
export const XP_AMOUNTS: Record<XPSource, number> = {
  quiz_completion: 25,
  riddle_completion: 15,
  game_completion: 20,
  mystery_completion: 30,
  fact_discovery: 5,
  challenge_completion: 15,
  daily_mission: 100,
  weekly_mission: 500,
  achievement: 40,
  certificate: 60,
  profile_setup_bonus: 50,
  micro_lesson_completion: 20,
  concept_map_completion: 10,
  experiment_completion: 25,
  spin_wheel: 15,
};

export const XP_SOURCE_ICONS: Record<XPSource, string> = {
  quiz_completion: '🔬',
  riddle_completion: '💡',
  game_completion: '🎮',
  mystery_completion: '🕵️',
  fact_discovery: '✨',
  challenge_completion: '🎯',
  daily_mission: '📅',
  weekly_mission: '🗓️',
  achievement: '🏆',
  certificate: '📜',
  profile_setup_bonus: '🎁',
  micro_lesson_completion: '📖',
  concept_map_completion: '🗺️',
  experiment_completion: '🧪',
  spin_wheel: '🎡',
};

/** Rewards milestones — data-driven, referenced by the Rewards center. */
export const XP_MILESTONES: Milestone[] = [
  {
    id: 'milestone-100',
    xpThreshold: 100,
    title: 'First Steps',
    titleTa: 'முதல் படிகள்',
    icon: '🌱',
    badgeLabel: 'Starter Badge',
    badgeLabelTa: 'தொடக்க பதக்கம்',
  },
  {
    id: 'milestone-500',
    xpThreshold: 500,
    title: 'Curious Mind',
    titleTa: 'ஆர்வமுள்ள மனம்',
    icon: '🔍',
    badgeLabel: 'Curious Mind Badge',
    badgeLabelTa: 'ஆர்வமுள்ள மனம் பதக்கம்',
  },
  {
    id: 'milestone-1000',
    xpThreshold: 1000,
    title: 'Science Explorer',
    titleTa: 'அறிவியல் ஆய்வாளர்',
    icon: '🚀',
    badgeLabel: 'Explorer Badge',
    badgeLabelTa: 'ஆய்வாளர் பதக்கம்',
  },
  {
    id: 'milestone-2500',
    xpThreshold: 2500,
    title: 'Science Scholar',
    titleTa: 'அறிவியல் அறிஞர்',
    icon: '🎓',
    badgeLabel: 'Scholar Badge',
    badgeLabelTa: 'அறிஞர் பதக்கம்',
  },
  {
    id: 'milestone-5000',
    xpThreshold: 5000,
    title: 'Science Master',
    titleTa: 'அறிவியல் மேதை',
    icon: '🏅',
    badgeLabel: 'Master Badge',
    badgeLabelTa: 'மேதை பதக்கம்',
  },
  {
    id: 'milestone-10000',
    xpThreshold: 10000,
    title: 'Future Innovator',
    titleTa: 'எதிர்கால கண்டுபிடிப்பாளர்',
    icon: '🌟',
    badgeLabel: 'Innovator Badge',
    badgeLabelTa: 'கண்டுபிடிப்பாளர் பதக்கம்',
  },
];

/** Starter bonus awarded once after profile setup completes. */
export const PROFILE_SETUP_BONUS_XP = XP_AMOUNTS.profile_setup_bonus;
export const PROFILE_SETUP_BONUS_KEY = 'xp-profile-setup-bonus';
export const PROFILE_SETUP_BONUS_ICON = XP_SOURCE_ICONS.profile_setup_bonus;