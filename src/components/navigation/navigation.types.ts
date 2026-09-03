/**
 * Navigation Types
 * Defines the canonical 4 app tabs, tab item configurations, and navigation visibility states.
 */

import { SupportedLanguage } from '../../config/i18n';

export type AppTab = 'home' | 'learn' | 'games' | 'profile';

export interface AppTabConfig {
  id: AppTab;
  route: string;
  bgColor: string;
  borderColor: string;
  iconColor: string;
  labelKey: string;
}

export interface AppTabItemProps {
  id: AppTab;
  label: string;
  isActive: boolean;
  bgColor: string;
  borderColor: string;
  iconColor: string;
  onPress: () => void;
  accessibilityLabel: string;
}

export interface AppTabBarProps {
  activeTab: AppTab;
  language?: SupportedLanguage;
  onTabPress: (tab: AppTab) => void;
  isVisible?: boolean;
}
