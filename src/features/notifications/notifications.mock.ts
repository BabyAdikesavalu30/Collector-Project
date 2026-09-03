/**
 * Notifications Mock Data
 * Deterministic local notification data with bilingual support.
 */

import { AppNotification, NotificationType } from './notifications.types';
import { getTodayString } from '../fun-facts/fun-facts.engine';

function hoursAgo(hours: number): number {
  return Date.now() - hours * 60 * 60 * 1000;
}

function daysAgo(days: number): number {
  return Date.now() - days * 24 * 60 * 60 * 1000;
}

export const MOCK_NOTIFICATIONS: AppNotification[] = [
  // ── TODAY ─────────────────────────────────────────────────────────
  {
    id: 'notif-001',
    type: 'achievement',
    title: { en: 'Achievement Unlocked!', ta: 'சாதனை திறக்கப்பட்டது!' },
    body: { en: 'You earned the "Perfect Score" badge.', ta: '"சரியான மதிப்பெண்" பேஜ்ஜை நீங்கள் பெற்றீர்கள்.' },
    createdAt: hoursAgo(0.2),
    isRead: false,
    action: { route: '/achievements' },
    priority: 'important',
  },
  {
    id: 'notif-002',
    type: 'quiz_completed',
    title: { en: 'Quiz Completed!', ta: 'வினாடி வினா முடிந்தது!' },
    body: { en: 'You scored 86% in Physics.', ta: 'இயற்பியலில் 86% மதிப்பெண் பெற்றீர்கள்.' },
    createdAt: hoursAgo(0.5),
    isRead: false,
    action: { route: '/quiz-result' },
  },
  {
    id: 'notif-003',
    type: 'spin_wheel',
    title: { en: 'Daily Spin Ready', ta: 'தினசரி சுழல் தயார்' },
    body: { en: 'Your daily science spin is available.', ta: 'உங்கள் தினசரி அறிவியல் சுழல் கிடைக்கிறது.' },
    createdAt: hoursAgo(1),
    isRead: false,
    action: { route: '/spin-wheel' },
  },
  {
    id: 'notif-004',
    type: 'daily_challenge',
    title: { en: 'Daily Science Challenge', ta: 'தினசரி அறிவியல் சவால்' },
    body: { en: 'Your daily science challenge is ready.', ta: 'உங்கள் தினசரி அறிவியல் சவால் தயார்.' },
    createdAt: hoursAgo(2),
    isRead: true,
    action: { route: '/challenges' },
  },
  {
    id: 'notif-005',
    type: 'game',
    title: { en: 'New Game Available', ta: 'புதிய விளையாட்டு கிடைக்கிறது' },
    body: { en: 'Try the new Circuit Lab game.', ta: 'புதிய மின்சுற்று ஆய்வக விளையாட்டை முயற்சிக்கவும்.' },
    createdAt: hoursAgo(3),
    isRead: true,
    action: { route: '/games/circuit-lab' },
  },

  // ── YESTERDAY ─────────────────────────────────────────────────────
  {
    id: 'notif-006',
    type: 'streak',
    title: { en: 'Keep Your Streak Going!', ta: 'உங்கள் தொடர்ச்சியைத் தொடருங்கள்!' },
    body: { en: 'Complete one more activity today to protect your streak.', ta: 'உங்கள் தொடர்ச்சியைப் பாதுகாக்க இன்று இன்னும் ஒரு செயல்பாட்டை முடியுங்கள்.' },
    createdAt: daysAgo(1),
    isRead: true,
    action: { route: '/home' },
  },
  {
    id: 'notif-007',
    type: 'riddle',
    title: { en: 'New Riddle Challenge', ta: 'புதிய புதிர் சவால்' },
    body: { en: 'A new brain teaser is ready for you.', ta: 'உங்களுக்காக ஒரு புதிய மூளை சவால் தயார்.' },
    createdAt: daysAgo(1),
    isRead: true,
    action: { route: '/riddles' },
  },
  {
    id: 'notif-008',
    type: 'learning_reminder',
    title: { en: 'Continue Learning', ta: 'கற்றலைத் தொடருங்கள்' },
    body: { en: 'You are close to completing Force & Laws of Motion.', ta: 'விசை மற்றும் இயக்க விதிகளை முடிப்பதற்கு நெருக்கமாக உள்ளீர்கள்.' },
    createdAt: daysAgo(1),
    isRead: true,
    action: { route: '/learn' },
  },

  // ── EARLIER ───────────────────────────────────────────────────────
  {
    id: 'notif-009',
    type: 'certificate',
    title: { en: 'Certificate Ready', ta: 'சான்றிதழ் தயார்' },
    body: { en: 'Your Science Quiz certificate is ready to view.', ta: 'உங்கள் அறிவியல் வினாடி வினா சான்றிதழ் பார்க்க தயார்.' },
    createdAt: daysAgo(3),
    isRead: true,
    action: { route: '/certificates' },
  },
  {
    id: 'notif-010',
    type: 'progress',
    title: { en: 'Learning Milestone', ta: 'கற்றல் மைல்கல்' },
    body: { en: 'You completed 80% of your Physics learning path.', ta: 'உங்கள் இயற்பியல் கற்றல் பாதையில் 80% முடித்தீர்கள்.' },
    createdAt: daysAgo(5),
    isRead: true,
    action: { route: '/learn' },
  },
  {
    id: 'notif-011',
    type: 'game',
    title: { en: 'Game Milestone', ta: 'விளையாட்டு மைல்கல்' },
    body: { en: 'Your Zip Level 5 is waiting for you.', ta: 'உங்கள் ஜிப் நிலை 5 உங்களை எதிர்நோக்குகிறது.' },
    createdAt: daysAgo(7),
    isRead: true,
    action: { route: '/games/zip' },
  },
  {
    id: 'notif-012',
    type: 'new_content',
    title: { en: 'New Learning Content', ta: 'புதிய கற்றல் உள்ளடக்கம்' },
    body: { en: 'New topics added to Chemistry learning path.', ta: 'வேதியியல் கற்றல் பாதையில் புதிய தலைப்புகள் சேர்க்கப்பட்டன.' },
    createdAt: daysAgo(10),
    isRead: true,
    action: { route: '/learn' },
  },
  {
    id: 'notif-013',
    type: 'system',
    title: { en: 'Welcome to Vigyaan', ta: 'விஞ்ஞானுக்கு வரவேற்கிறோம்' },
    body: { en: 'Start your science learning journey today.', ta: 'இன்று உங்கள் அறிவியல் கற்றல் பயணத்தைத் தொடங்குங்கள்.' },
    createdAt: daysAgo(30),
    isRead: true,
    action: { route: '/home' },
  },
  {
    id: 'notif-014',
    type: 'achievement',
    title: { en: 'First Win!', ta: 'முதல் வெற்றி!' },
    body: { en: 'You completed your first game level!', ta: 'உங்கள் முதல் விளையாட்டு நிலையை முடித்தீர்கள்!' },
    createdAt: daysAgo(15),
    isRead: true,
    action: { route: '/achievements' },
    priority: 'important',
  },
  {
    id: 'notif-015',
    type: 'learning_reminder',
    title: { en: 'Daily Learning Goal', ta: 'தினசரி கற்றல் இலக்கு' },
    body: { en: 'Your daily learning goal is waiting.', ta: 'உங்கள் தினசரி கற்றல் இலக்கு காத்திருக்கிறது.' },
    createdAt: daysAgo(20),
    isRead: true,
    action: { route: '/learn' },
  },
  {
    id: 'notif-016',
    type: 'quiz_completed',
    title: { en: 'Great Score!', ta: 'சிறந்த மதிப்பெண்!' },
    body: { en: 'You scored 92% in Biology.', ta: 'உயிரியலில் 92% மதிப்பெண் பெற்றீர்கள்.' },
    createdAt: daysAgo(8),
    isRead: true,
    action: { route: '/quiz-result' },
  },
  {
    id: 'notif-017',
    type: 'daily_challenge',
    title: { en: 'Challenge Complete', ta: 'சவால் முடிந்தது' },
    body: { en: 'You completed today\'s science challenge!', ta: 'இன்றைய அறிவியல் சவாலை முடித்தீர்கள்!' },
    createdAt: daysAgo(4),
    isRead: true,
    action: { route: '/challenges' },
  },
  {
    id: 'notif-018',
    type: 'spin_wheel',
    title: { en: 'Spin Reward', ta: 'சுழல் வெகுமதி' },
    body: { en: 'You won +50 bonus points!', ta: '+50 போனஸ் புள்ளிகளை வென்றீர்கள்!' },
    createdAt: daysAgo(6),
    isRead: true,
    action: { route: '/spin-wheel' },
  },
];

/**
 * Deterministic daily notification IDs.
 */
export function getDailyNotificationId(type: string): string {
  const today = getTodayString();
  return `daily-${type}-${today}`;
}

/**
 * Generate deterministic daily notifications.
 */
export function getDailyNotifications(): AppNotification[] {
  const today = getTodayString();
  const now = Date.now();
  return [
    {
      id: getDailyNotificationId('challenge'),
      type: 'daily_challenge',
      title: { en: 'Daily Science Challenge', ta: 'தினசரி அறிவியல் சவால்' },
      body: { en: 'Your daily science challenge is ready.', ta: 'உங்கள் தினசரி அறிவியல் சவால் தயார்.' },
      createdAt: now,
      isRead: false,
      action: { route: '/challenges' },
    },
    {
      id: getDailyNotificationId('fact'),
      type: 'new_content',
      title: { en: 'Daily Science Fact', ta: 'தினசரி அறிவியல் தகவல்' },
      body: { en: 'Discover today\'s science fact.', ta: 'இன்றைய அறிவியல் தகவலை கண்டறியுங்கள்.' },
      createdAt: now,
      isRead: false,
      action: { route: '/fun-facts' },
    },
  ];
}

/**
 * Get all notifications including daily ones.
 */
export function getAllNotifications(): AppNotification[] {
  const daily = getDailyNotifications();
  const existingIds = new Set(MOCK_NOTIFICATIONS.map((n) => n.id));
  const newDaily = daily.filter((d) => !existingIds.has(d.id));
  return [...newDaily, ...MOCK_NOTIFICATIONS].sort((a, b) => b.createdAt - a.createdAt);
}
