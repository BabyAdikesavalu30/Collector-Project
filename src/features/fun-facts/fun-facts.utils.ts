/**
 * Fun Facts Utilities
 * Helper functions for formatting, localization, and display.
 */

import { LocalizedText, FunFactCategory } from './fun-facts.types';

/**
 * Get localized text from a LocalizedText object.
 */
export function getLocalizedText(text: LocalizedText, lang: 'en' | 'ta'): string {
  return text[lang] || text.en;
}

/**
 * Get category display name.
 */
export function getCategoryName(category: FunFactCategory, lang: 'en' | 'ta'): string {
  const names: Record<FunFactCategory, LocalizedText> = {
    physics: { en: 'Physics', ta: 'இயற்பியல்' },
    chemistry: { en: 'Chemistry', ta: 'வேதியியல்' },
    biology: { en: 'Biology', ta: 'உயிரியல்' },
    space: { en: 'Space', ta: 'விண்வெளி' },
    environment: { en: 'Environment', ta: 'சுற்றுச்சூழல்' },
    'human-body': { en: 'Human Body', ta: 'மனித உடல்' },
    'science-history': { en: 'Science History', ta: 'அறிவியல் வரலாறு' },
  };
  return getLocalizedText(names[category], lang);
}

/**
 * Get category icon.
 */
export function getCategoryIcon(category: FunFactCategory): string {
  const icons: Record<FunFactCategory, string> = {
    physics: '⚡',
    chemistry: '🧪',
    biology: '🧬',
    space: '🌍',
    environment: '🌿',
    'human-body': '🫀',
    'science-history': '📜',
  };
  return icons[category];
}

/**
 * Get category accent color.
 */
export function getCategoryColor(category: FunFactCategory): string {
  const colors: Record<FunFactCategory, string> = {
    physics: '#2563EB',
    chemistry: '#7E22CE',
    biology: '#16A34A',
    space: '#4F46E5',
    environment: '#059669',
    'human-body': '#DC2626',
    'science-history': '#D97706',
  };
  return colors[category];
}

/**
 * Format points display.
 */
export function formatPoints(points: number): string {
  if (points >= 1000) {
    return `${(points / 1000).toFixed(1)}k`;
  }
  return String(points);
}

/**
 * Get all unique categories from facts.
 */
export function getAllCategories(): FunFactCategory[] {
  return ['physics', 'chemistry', 'biology', 'space', 'environment', 'human-body', 'science-history'];
}

/**
 * Format streak display text.
 */
export function formatStreakText(streak: number, lang: 'en' | 'ta'): string {
  if (lang === 'ta') {
    return `🔥 ${streak} நாள் தகவல் தொடர்ச்சி`;
  }
  return `🔥 ${streak} Day Fact Streak`;
}
