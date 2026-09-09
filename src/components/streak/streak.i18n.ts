/**
 * Streak & Activity Calendar Bilingual i18n Bridge
 * 100% key parity between English and Tamil. Zero deficit language.
 */

import { SupportedLanguage } from '../../config/i18n';
import { ActivityEventType } from '../../features/activity/activity.types';

export interface StreakI18n {
  title: string;
  subtitle: string;
  currentStreak: string;
  longestStreak: string;
  best: string;
  days: string;
  daySingular: string;
  activeDay: string;
  inactiveDay: string;
  today: string;
  activeToday: string;
  notStartedToday: string;
  thisWeek: string;
  thisMonth: string;
  activities: string;
  activitySingular: string;
  xpEarned: string;
  noActivityRecorded: string;
  readyToStart: string;
  keepStreakGoing: string;
  keepStreakPrompt: string;
  startActivity: string;
  exploreScience: string;
  greatStart: string;
  amazingConsistency: string;
  startYourStreak: string;
  freshUserPrompt: string;
  activityCalendar: string;
  monthlySummary: string;
  activeDaysLabel: string;
  activitiesCompletedLabel: string;
  bestStreakLabel: string;
  consistencyTitle: string;
  milestonesTitle: string;
  milestoneReached: string;
  daysRemaining: string;
  recentActivity: string;
  dailyGoalProgress: string;
  viewDailyGoal: string;
  weekdaysShort: {
    mon: string;
    tue: string;
    wed: string;
    thu: string;
    fri: string;
    sat: string;
    sun: string;
  };
  activityTypeNames: Record<ActivityEventType, string>;
  accessibility: {
    backButton: string;
    prevMonth: string;
    nextMonth: string;
    todayAction: string;
    dayCellActive: string;
    dayCellInactive: string;
    dayCellToday: string;
    heroSummary: string;
  };
}

export const STREAK_I18N: Record<SupportedLanguage, StreakI18n> = {
  en: {
    title: 'Streak & Activity',
    subtitle: 'Track your daily science consistency and achievements',
    currentStreak: 'Current Streak',
    longestStreak: 'Longest Streak',
    best: 'Best',
    days: 'Days',
    daySingular: 'Day',
    activeDay: 'Active Day',
    inactiveDay: 'No Activity',
    today: 'Today',
    activeToday: 'Active Today! You explored science today.',
    notStartedToday: 'Complete one activity today to keep your streak alive.',
    thisWeek: 'This Week',
    thisMonth: 'This Month',
    activities: 'Activities',
    activitySingular: 'Activity',
    xpEarned: 'XP Earned',
    noActivityRecorded: 'No activity recorded for this day',
    readyToStart: 'Ready to start another science day? Pick any topic or game!',
    keepStreakGoing: 'Keep Your Streak Going',
    keepStreakPrompt: 'Complete one science activity today to keep learning consistent.',
    startActivity: 'Start Science Activity',
    exploreScience: 'Explore Science',
    greatStart: 'Great start! Keep your science journey going!',
    amazingConsistency: 'Amazing consistency! You are building a powerful habit.',
    startYourStreak: 'Start Your Science Streak',
    freshUserPrompt: 'Complete your first quiz, experiment, or game to begin your daily streak!',
    activityCalendar: 'Activity Calendar',
    monthlySummary: 'Monthly Summary',
    activeDaysLabel: 'Active Days',
    activitiesCompletedLabel: 'Activities Finished',
    bestStreakLabel: 'Best Streak in Month',
    consistencyTitle: 'Learning Consistency',
    milestonesTitle: 'Streak Milestones',
    milestoneReached: 'Reached!',
    daysRemaining: 'days to go',
    recentActivity: 'Recent Science Activities',
    dailyGoalProgress: "Today's Goal",
    viewDailyGoal: 'View Goal',
    weekdaysShort: {
      mon: 'Mon',
      tue: 'Tue',
      wed: 'Wed',
      thu: 'Thu',
      fri: 'Fri',
      sat: 'Sat',
      sun: 'Sun',
    },
    activityTypeNames: {
      quiz_completed: 'Science Quiz',
      riddle_completed: 'Science Riddle',
      game_completed: 'Mini Game',
      mystery_completed: 'Mystery Lab Case',
      fact_discovered: 'Fun Fact',
      challenge_completed: 'Science Challenge',
      mission_completed: 'Daily Mission',
      achievement_unlocked: 'Achievement',
      certificate_earned: 'Certificate',
      micro_lesson_completed: 'Micro Lesson',
      concept_map_completed: 'Concept Map',
      concept_node_explored: 'Concept Node',
      experiment_completed: 'Lab Experiment',
    },
    accessibility: {
      backButton: 'Go back',
      prevMonth: 'Previous month',
      nextMonth: 'Next month',
      todayAction: 'Jump to today',
      dayCellActive: '{date}, active day, {count} activities completed.',
      dayCellInactive: '{date}, no activity recorded.',
      dayCellToday: '{date}, today, {status}.',
      heroSummary: 'Current streak {current} days. Longest streak {longest} days.',
    },
  },
  ta: {
    title: 'தொடர்ச்சி & செயல்பாடு',
    subtitle: 'உங்கள் தினசரி அறிவியல் நிலைத்தன்மை மற்றும் சாதனைகளைக் கண்காணிக்கவும்',
    currentStreak: 'தற்போதைய தொடர்ச்சி',
    longestStreak: 'நீண்ட தொடர்ச்சி',
    best: 'சிறந்த சாதனை',
    days: 'நாட்கள்',
    daySingular: 'நாள்',
    activeDay: 'செயலில் உள்ள நாள்',
    inactiveDay: 'செயல்பாடு இல்லை',
    today: 'இன்று',
    activeToday: 'இன்று செயல்பாடு நிறைவு! அறிவியல் பயணம் தொடர்கிறது.',
    notStartedToday: 'தொடர்ச்சியைத் தக்கவைக்க இன்று ஒரு செயல்பாட்டை முடிக்கவும்.',
    thisWeek: 'இந்த வாரம்',
    thisMonth: 'இந்த மாதம்',
    activities: 'செயல்பாடுகள்',
    activitySingular: 'செயல்பாடு',
    xpEarned: 'பெற்ற XP',
    noActivityRecorded: 'இந்த நாளில் செயல்பாடு எதுவும் பதிவு செய்யப்படவில்லை',
    readyToStart: 'மற்றொரு அறிவியல் நாளைத் தொடங்கத் தயாரா? தலைப்பைத் தேர்ந்தெடுங்கள்!',
    keepStreakGoing: 'உங்கள் தொடர்ச்சியைத் தொடருங்கள்',
    keepStreakPrompt: 'தொடர்ச்சியைத் தக்கவைக்க இன்று ஒரு அறிவியல் செயல்பாட்டை முடிக்கவும்.',
    startActivity: 'செயல்பாட்டைத் தொடங்கு',
    exploreScience: 'அறிவியலை ஆராய்க',
    greatStart: 'சிறந்த தொடக்கம்! உங்கள் அறிவியல் பயணத்தைத் தொடருங்கள்!',
    amazingConsistency: 'அற்புதமான நிலைத்தன்மை! நீங்கள் சிறந்த பழக்கத்தை உருவாக்குகிறீர்கள்.',
    startYourStreak: 'உங்கள் அறிவியல் தொடர்ச்சியைத் தொடங்குங்கள்',
    freshUserPrompt: 'தினசரி தொடர்ச்சியைத் தொடங்க உங்கள் முதல் வினாடி வினா அல்லது விளையாட்டை முடிக்கவும்!',
    activityCalendar: 'செயல்பாட்டு நாட்காட்டி',
    monthlySummary: 'மாதாந்திர சுருக்கம்',
    activeDaysLabel: 'செயலில் உள்ள நாட்கள்',
    activitiesCompletedLabel: 'முடிக்கப்பட்ட செயல்பாடுகள்',
    bestStreakLabel: 'மாதத்தின் சிறந்த தொடர்ச்சி',
    consistencyTitle: 'கற்றல் நிலைத்தன்மை',
    milestonesTitle: 'தொடர்ச்சி மைல்கற்கள்',
    milestoneReached: 'அடைந்தது!',
    daysRemaining: 'நாட்கள் மீதம்',
    recentActivity: 'சமீபத்திய அறிவியல் செயல்பாடுகள்',
    dailyGoalProgress: 'இன்றைய இலக்கு',
    viewDailyGoal: 'இலக்கைப் பார்',
    weekdaysShort: {
      mon: 'திங்',
      tue: 'செவ்',
      wed: 'புத',
      thu: 'வியா',
      fri: 'வெள்',
      sat: 'சனி',
      sun: 'ஞாயி',
    },
    activityTypeNames: {
      quiz_completed: 'அறிவியல் வினாடி வினா',
      riddle_completed: 'அறிவியல் புதிர்',
      game_completed: 'மினி விளையாட்டு',
      mystery_completed: 'புதிர் ஆய்வு வழக்கு',
      fact_discovered: 'சுவாரஸ்ய தகவல்',
      challenge_completed: 'அறிவியல் சவால்',
      mission_completed: 'தினசரி பணி',
      achievement_unlocked: 'சாதனை',
      certificate_earned: 'சான்றிதழ்',
      micro_lesson_completed: 'குறு பாடம்',
      concept_map_completed: 'கருத்து வரைபடம்',
      concept_node_explored: 'கருத்து முனை',
      experiment_completed: 'ஆய்வகப் பரிசோதனை',
    },
    accessibility: {
      backButton: 'பின்னே செல்',
      prevMonth: 'முந்தைய மாதம்',
      nextMonth: 'அடுத்த மாதம்',
      todayAction: 'இன்றைய நாளுக்குச் செல்',
      dayCellActive: '{date}, செயலில் உள்ள நாள், {count} செயல்பாடுகள் முடிக்கப்பட்டன.',
      dayCellInactive: '{date}, செயல்பாடு எதுவும் பதிவு செய்யப்படவில்லை.',
      dayCellToday: '{date}, இன்று, {status}.',
      heroSummary: 'தற்போதைய தொடர்ச்சி {current} நாட்கள். நீண்ட தொடர்ச்சி {longest} நாட்கள்.',
    },
  },
};

export function getStreakI18n(lang: SupportedLanguage = 'en'): StreakI18n {
  return STREAK_I18N[lang] || STREAK_I18N.en;
}

export function interpolateText(template: string, params: Record<string, string | number>): string {
  let result = template;
  for (const [key, value] of Object.entries(params)) {
    result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), String(value));
  }
  return result;
}
