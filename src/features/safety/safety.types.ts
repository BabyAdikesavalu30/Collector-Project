/**
 * Safety & Trust Layer — Types
 */

export type SafetySectionId =
  | 'privacy'
  | 'account-safety'
  | 'safe-science'
  | 'help-support'
  | 'data-storage'
  | 'notifications'
  | 'legal';

export interface SafetySection {
  id: SafetySectionId;
  icon: string;
  title: { en: string; ta: string };
  subtitle: { en: string; ta: string };
  route: string;
}

export interface PrivacyInfoItem {
  id: string;
  icon: string;
  title: { en: string; ta: string };
  content: { en: string; ta: string };
  bullets?: Array<{ en: string; ta: string }>;
}

export interface AccountSafetyTip {
  id: string;
  icon: string;
  title: { en: string; ta: string };
  content: { en: string; ta: string };
}

export interface SafeScienceRule {
  id: string;
  icon: string;
  title: { en: string; ta: string };
  description: { en: string; ta: string };
}

export interface HelpCategory {
  id: string;
  icon: string;
  title: { en: string; ta: string };
  items: Array<{
    question: { en: string; ta: string };
    answer: { en: string; ta: string };
  }>;
}

export interface ReportReason {
  id: string;
  label: { en: string; ta: string };
}
