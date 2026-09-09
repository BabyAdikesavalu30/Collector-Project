/**
 * Achievements / Science Badge Gallery Bilingual Dictionary
 * English and Tamil strings with kid-friendly, non-deficit, encouraging tone.
 */

import { SupportedLanguage } from '../../config/i18n';
import { AchievementCategory, AchievementRarity, AchievementStatus } from '../../features/achievements';

export interface AchievementsI18nStrings {
  screenTitle: string;
  screenSubtitle: string;
  badgesEarned: string;
  totalBadges: string;
  completionRate: string;
  level: string;
  encouragement: {
    none: string;
    starter: string;
    intermediate: string;
    advanced: string;
    master: string;
  };
  nextBadgeTitle: string;
  nextBadgeSubtitle: string;
  continueBtn: string;
  allCompletedTitle: string;
  allCompletedDesc: string;
  recentUnlocksTitle: string;
  unlockedOn: string;
  statusFilters: Record<AchievementStatus | 'all', string>;
  categoryFilters: Record<AchievementCategory | 'all', string>;
  rarityLabels: Record<AchievementRarity, string>;
  modal: {
    title: string;
    criteriaHeading: string;
    progressHeading: string;
    rewardHeading: string;
    earnedOnHeading: string;
    categoryHeading: string;
    actionBtn: string;
    closeBtn: string;
  };
  empty: {
    title: string;
    subtitle: string;
    resetBtn: string;
  };
  accessibility: {
    badgeItem: string;
    filterByStatus: string;
    filterByCategory: string;
    nextBadgeCard: string;
    summaryCard: string;
    recentUnlocks: string;
  };
}

export const ACHIEVEMENTS_I18N: Record<SupportedLanguage, AchievementsI18nStrings> = {
  en: {
    screenTitle: 'Science Badge Gallery',
    screenSubtitle: 'Collect milestones on your science journey',
    badgesEarned: 'Badges Earned',
    totalBadges: 'Total Badges',
    completionRate: 'Completion',
    level: 'Badge Level',
    encouragement: {
      none: 'Every great journey starts with a first step! Complete quizzes or explore activities to begin.',
      starter: 'Great start! Keep exploring to unlock exciting new science badges.',
      intermediate: 'Fantastic momentum! You are uncovering science milestones at great pace.',
      advanced: 'Incredible dedication! You are becoming a true science explorer.',
      master: 'Master Scientist! You have collected nearly all science badges in the gallery.',
    },
    nextBadgeTitle: 'Next Milestone in Reach',
    nextBadgeSubtitle: 'You are closest to unlocking this badge next',
    continueBtn: 'Continue Activity',
    allCompletedTitle: 'All Milestones Achieved!',
    allCompletedDesc: 'Incredible! You have unlocked every single badge in the Science Gallery.',
    recentUnlocksTitle: 'Recent Unlocks',
    unlockedOn: 'Unlocked',
    statusFilters: {
      all: 'All',
      in_progress: 'In Progress',
      unlocked: 'Earned',
      locked: 'Locked',
    },
    categoryFilters: {
      all: 'All',
      learning: 'Learning',
      streak: 'Streak',
      games: 'Games',
      riddles: 'Riddles',
      mystery: 'Mystery Lab',
      experiments: 'Experiments',
      'micro-lessons': 'Micro Lessons',
      'concept-maps': 'Concept Maps',
      discovery: 'Discovery',
      special: 'Special',
      'experiment-lab': 'Experiments',
      mastery: 'Mastery',
    },
    rarityLabels: {
      common: 'Common',
      uncommon: 'Uncommon',
      rare: 'Rare',
      epic: 'Epic',
      legendary: 'Legendary',
    },
    modal: {
      title: 'Badge Details',
      criteriaHeading: 'How to Earn',
      progressHeading: 'Current Progress',
      rewardHeading: 'XP Reward',
      earnedOnHeading: 'Unlocked On',
      categoryHeading: 'Category',
      actionBtn: 'Launch Activity',
      closeBtn: 'Done',
    },
    empty: {
      title: 'No Badges Found',
      subtitle: 'Try choosing another status or category to view more badges.',
      resetBtn: 'Show All Badges',
    },
    accessibility: {
      badgeItem: 'Achievement badge',
      filterByStatus: 'Filter by unlock status',
      filterByCategory: 'Filter by category',
      nextBadgeCard: 'Next milestone recommendation',
      summaryCard: 'Gallery statistics overview',
      recentUnlocks: 'Recently earned badges list',
    },
  },
  ta: {
    screenTitle: 'அறிவியல் பேட்ஜ் கேலரி',
    screenSubtitle: 'உங்கள் அறிவியல் பயணத்தின் மைல்கற்களைச் சேகரியுங்கள்',
    badgesEarned: 'பெற்ற பேட்ஜ்கள்',
    totalBadges: 'மொத்த பேட்ஜ்கள்',
    completionRate: 'முழுமை',
    level: 'பேட்ஜ் நிலை',
    encouragement: {
      none: 'ஒவ்வொரு சிறந்த பயணமும் முதல் படியில் தொடங்குகிறது! தொடங்க வினாடி வினாக்கள் அல்லது செயல்பாடுகளை முடிக்கவும்.',
      starter: 'சிறந்த ஆரம்பம்! உற்சாகமான புதிய அறிவியல் பேட்ஜ்களைத் திறக்க தொடர்ந்து ஆராயுங்கள்.',
      intermediate: 'அருமையான வேகம்! நீங்கள் அறிவியல் மைல்கற்களை மிக விரைவாக வெளிப்படுத்தி வருகிறீர்கள்.',
      advanced: 'வியக்கத்தக்க ஈடுபாடு! நீங்கள் ஒரு உண்மையான அறிவியல் ஆராய்ச்சியாளராக மாறி வருகிறீர்கள்.',
      master: 'தலைசிறந்த விஞ்ஞானி! கேலரியில் உள்ள அனைத்து அறிவியல் பேட்ஜ்களையும் சேகரித்துவிட்டீர்கள்.',
    },
    nextBadgeTitle: 'அடுத்த இலக்கு மைல்கல்',
    nextBadgeSubtitle: 'இந்த பேட்ஜை அடுத்ததாகத் திறக்க மிக நெருக்கத்தில் உள்ளீர்கள்',
    continueBtn: 'செயல்பாட்டைத் தொடரவும்',
    allCompletedTitle: 'அனைத்து மைல்கற்களும் பெறப்பட்டன!',
    allCompletedDesc: 'அற்புதம்! அறிவியல் கேலரியில் உள்ள ஒவ்வொரு பேட்ஜையும் திறந்துவிட்டீர்கள்.',
    recentUnlocksTitle: 'சமீபத்தில் திறக்கப்பட்டவை',
    unlockedOn: 'திறக்கப்பட்டது',
    statusFilters: {
      all: 'அனைத்தும்',
      in_progress: 'நடப்பில்',
      unlocked: 'பெற்றவை',
      locked: 'பூட்டப்பட்டவை',
    },
    categoryFilters: {
      all: 'அனைத்தும்',
      learning: 'கற்றல்',
      streak: 'தொடர்ச்சி',
      games: 'விளையாட்டுகள்',
      riddles: 'புதிர்கள்',
      mystery: 'துப்பறியும் கூடம்',
      experiments: 'சோதனைகள்',
      'micro-lessons': 'குறு பாடங்கள்',
      'concept-maps': 'கருத்து வரைபடங்கள்',
      discovery: 'கண்டுபிடிப்பு',
      special: 'சிறப்பு',
      'experiment-lab': 'சோதனைகள்',
      mastery: 'தேர்ச்சி',
    },
    rarityLabels: {
      common: 'பொதுவானது',
      uncommon: 'அசாதாரணமானது',
      rare: 'அரிதானது',
      epic: 'புகழ்பெற்றது',
      legendary: 'புராணத்தன்மை',
    },
    modal: {
      title: 'பேட்ஜ் விவரங்கள்',
      criteriaHeading: 'பெறுவது எப்படி',
      progressHeading: 'தற்போதைய முன்னேற்றம்',
      rewardHeading: 'XP வெகுமதி',
      earnedOnHeading: 'திறக்கப்பட்ட தேதி',
      categoryHeading: 'பிரிவு',
      actionBtn: 'செயல்பாட்டைத் தொடங்கவும்',
      closeBtn: 'முடிந்தது',
    },
    empty: {
      title: 'பேட்ஜ்கள் எதுவும் இல்லை',
      subtitle: 'மேலும் பேட்ஜ்களைக் காண மற்றொரு நிலை அல்லது வகையைத் தேர்ந்தெடுக்கவும்.',
      resetBtn: 'அனைத்து பேட்ஜ்களையும் காட்டு',
    },
    accessibility: {
      badgeItem: 'சாதனை பேட்ஜ்',
      filterByStatus: 'நிலை அடிப்படையில் வடிகட்டவும்',
      filterByCategory: 'வகை அடிப்படையில் வடிகட்டவும்',
      nextBadgeCard: 'அடுத்த மைல்கல் பரிந்துரை',
      summaryCard: 'கேலரி புள்ளிவிவர மேலோட்டம்',
      recentUnlocks: 'சமீபத்தில் பெற்ற பேட்ஜ்கள் பட்டியல்',
    },
  },
};

export function getAchievementsI18n(language: SupportedLanguage = 'en'): AchievementsI18nStrings {
  return ACHIEVEMENTS_I18N[language] ?? ACHIEVEMENTS_I18N.en;
}
